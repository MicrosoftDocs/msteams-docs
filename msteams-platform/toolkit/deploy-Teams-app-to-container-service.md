---
title: Deploying a Teams App to a Container Service
author: MuyangAmigo
description:  In this module, learn how to deploy a Teams App to a Container Service.
ms.author: ruhe
ms.localizationpriority: medium
ms.topic: overview
ms.date: 04/16/2024
---

# Deploying a Teams App to a Container Service

Deploy a Teams bot or a Teams tab app to a container service. The deployment process consists of three parts:

* Azure Container Apps.
* Azure Kubernetes Service.
* On-Premise Kubernetes Cluster.

## Prerequisites

You can download the [sample Teams bot](https://github.com/OfficeDev/TeamsFx-Samples/tree/dev/bot-sso-docker) or the [sample Teams tab app](https://github.com/OfficeDev/TeamsFx-Samples/tree/dev/hello-world-tab-docker) from the Teams Toolkit sample gallery. This sample offers a ready-to-use experience for Azure Container Apps development. After making a few configuration changes, you can deploy it to Azure Kubernetes Service or an on-premise Kubernetes cluster.

You need an Azure account and the Azure CLI (command line interfaces) for Azure Container Apps or Azure Kubernetes Service deployment.

> [!NOTE]
> The commands in this article are based on bash. You might need to modify them to work in other CLI.

## Deploy to Azure Container Apps

Azure Container Apps is a fully managed service that enables you to run containerized applications in the cloud. It's an ideal choice if you don't need direct access to all native Kubernetes APIs and cluster management, and you prefer a fully managed experience grounded on best practices.

With the help of sample applications, you've the ability to run the provision and deploy commands in Teams Toolkit. The Teams Toolkit creates an Azure Container Registry and Azure Container Apps for you. It constructs your app into a container image and deploys it to Azure Container Apps.

The `provision` command creates and configures the following resources:

* A Teams app with tab or bot capability.
* An Azure Container Registry to host your container image.
* An Azure Container App environment and an Azure Container Apps to host your bot app.
* An Azure Entra App for authentication.

In the sample Teams bot, the `provision` command also creates an Azure Bot Service to channel Teams client and Azure Container Apps.

The `deploy` command executes the following actions:

* Builds the app into a container image.
* Pushes the container image to Azure Container Registry.
* Deploys the image to Azure Container Apps.

## Deploy Teams bot to Azure Kubernetes Service

Azure Kubernetes Service (AKS) is a managed container orchestration service provided by Azure. If you're seeking a fully managed Kubernetes experience within Azure, AKS serves as an ideal choice.

### Architecture

:::image type="content" source="../assets/images/teams-toolkit-v2/architecture.png" alt-text="Screenshot shows the Teams bot to Azure Kubernetes Service architecture.":::

The Teams backend server interacts with your bot through the Azure Bot Service. This service requires that your bot is reachable through a public HTTPS endpoint. To set up, deploy an ingress controller on your Kubernetes cluster and secure it with a TLS certificate.

To authenticate your bot with Azure Bot Service, utilize Entra ID. You need to create a Kubernetes secret that includes the App ID and password. After creation, integrate this secret into your container's runtime configuration to enable authentication.

### Setup ingress with HTTPS on AKS

1. Ensure that your Azure Kubernetes Service is connected to your Azure Container Registry, which hosts your container images. For more information, see [use the Azure CLI](/azure/aks/learn/quick-kubernetes-deploy-cli/).

1. Run the commands to install the ingress controller and certificate manager. This isn't the only way to set up ingress and TLS certificates on your Kubernetes cluster. For more information, see [create an unmanaged ingress controller](/azure/aks/ingress-basic?tabs=azure-cli) and [use TLS with Let's encrypt certificates](/azure/aks/ingress-tls#use-tls-with-lets-encrypt-certificates).

    ```bash
    NAMESPACE=teams-bot
    
    helm repo add ingress-nginx https://kubernetes.github.io/ingress-nginx
    helm repo update
    helm install ingress-nginx ingress-nginx/ingress-nginx --create-namespace --namespace $NAMESPACE \
        --set controller.nodeSelector."kubernetes\.io/os"=linux  \
        --set defaultBackend.nodeSelector."kubernetes\.io/os"=linux  \
        --set controller.healthStatus=true \
        --set controller.service.externalTrafficPolicy=Local \
        --set controller.service.annotations."service\.beta\.kubernetes\.io/azure-load-balancer-health-probe-request-path"=/healthz 
    
    helm repo add jetstack https://charts.jetstack.io
    helm repo update
    helm install cert-manager jetstack/cert-manager --namespace $NAMESPACE --set installCRDs=true --set nodeSelector."kubernetes\.io/os"=linux
    ```

1. Update the DNS for the ingress public IP and get the ingress endpoint.

    ```bash
    > kubectl get services --namespace $NAMESPACE -w ingress-nginx-controller
    
    NAME TYPE CLUSTER-IP EXTERNAL-IP PORT(S)
    ingress-nginx-controller LoadBalancer $CLUSTER_IP $EXTERNAL_IP 80:32514/TCP,443:32226/TCP
    
    > PUBLICIPID=$(az network public-ip list --query "[?ipAddress!=null]|[?contains(ipAddress, '$EXTERNAL_IP')].[id]" --output tsv)
    > az network public-ip update --ids $PUBLICIPID --dns-name $DNSLABEL
    > az network public-ip show --ids $PUBLICIPID --query "[dnsSettings.fqdn]" --output tsv
    
    $DNSLABEL.$REGION.cloudapp.azure.com
    ```

### Provision resources with Teams Toolkit

You can use the provision command in Teams Toolkit to create a Teams app with bot capability, incorporating the Azure Bot Service and the Entra ID for authentication. Update the sample code to ensure compatibility with your Azure Kubernetes Service.

1. Update the `BOT_DOMAIN` value in `env/.env.${envName}` with your FQDN.

1. Update the `arm/deploy` action within `teamsapp.yml` to ensure that Teams Toolkit provision an Azure Bot Service during the execution of the `provision` command.

    ```bash
    - uses: arm/deploy 
      with:
        subscriptionId: ${{AZURE_SUBSCRIPTION_ID}} 
        resourceGroupName: ${{AZURE_RESOURCE_GROUP_NAME}} 
        templates:
          - path: ./infra/botRegistration/azurebot.bicep
            parameters: ./infra/botRegistration/azurebot.parameters.json
            deploymentName: Create-resources-for-bot
        bicepCliVersion: v0.9.1
    ```

1. Run the `provision` command in Teams Toolkit.

1. After provisioning, locate the `BOT_ID` in `env/.env.${envName}` file and the encrypted `SECRET_BOT_PASSWORD` in `env/.env.${envName}.user` file. To obtain the actual value of `BOT_PASSWORD`, select the Decrypt secret annotation.

1. To create a Kubernetes secret that contains `BOT_ID` and `BOT_PASSWORD`, save the key value pair in the `./deploy/.env.dev-secrets`file and execute the command to provision the secret.

```bash
kubectl create secret generic dev-secrets --from-env-file ./deploy/.env.dev-secrets -n $NAMESPACE
```

### Apply the deployment

The sample includes a deployment file, `deploy/sso-bot.yaml`, for your reference. Update the placeholders in this file before you apply it:

1. Update the `<image>` placeholder with your image. For example, `myacr.azurecr.io/sso-bot:latest`.

1. Update the `<hostname>` with your ingress FQDN.

1. Update the `<email>` with your email address for generating TLS certificate.

1. Apply `deploy/sso-bot.yaml`.

```bash
kubectl apply -f deploy/sso-bot.yaml -n $NAMESPACE
```

1. Go to Visual Studio Code.

1. In the **Run and Debug** panel, select the **Launch Remote** configuration. To preview the Teams bot application deployed on Azure Kubernetes Service (AKS), press F5.

## Deploy Teams bot to an On-Premise Kubernetes Cluster

Deploy a Teams bot to your personal Kubernetes cluster or a Kubernetes service from different cloud services, which involves similar steps to those used when deploying on Azure Kubernetes Service.

### Architecture

:::image type="content" source="../assets/images/teams-toolkit-v2/on-premise-kubernetes-cluster-architecture.png" alt-text="Screenshot shows the on-premise kubernetes cluster architecture.":::

The Teams backend server communicates with your bot through the Azure Bot Service, which requires a public HTTPS address for your bot. To accomplish this, deploy an ingress controller and supply a TLS certificate on your Kubernetes.

To authenticate your bot with Azure Bot Service, create a secret in Kubernetes that includes the App ID and password from Entra ID. Then, reference this secret in your container runtime.

### Provision resources with Teams Toolkit

You can use the `provision` command in Teams Toolkit to create the Teams app with bot capability, the Azure Bot Service and the Entra ID for authentication.

You can modify the sample code to ensure compatibility with your Kubernetes Service.

1. Update the `BOT_DOMAIN` value in `env/.env.${envName}` file with your FQDN.

1. To enable Teams Toolkit to provision an Azure Bot Service when executing the `provision` command, update the `arm/deploy` action in the `teamsapp.yml` file.

    ```yml
    - uses: arm/deploy 
      with:
        subscriptionId: ${{AZURE_SUBSCRIPTION_ID}} 
        resourceGroupName: ${{AZURE_RESOURCE_GROUP_NAME}} 
        templates:
          - path: ./infra/botRegistration/azurebot.bicep
            parameters: ./infra/botRegistration/azurebot.parameters.json
            deploymentName: Create-resources-for-bot
        bicepCliVersion: v0.9.1
    ```

1. We recommend using Azure Bot Service for channeling. If you don't have an Azure account and can't create Azure Bot Service, consider creating a bot registration as an alternative. Add the `botFramework/create` action during the provision stage in `teamsapp.yml` file. This action enables the Teams Toolkit to create a bot registration with the appropriate messaging endpoint.

    ```yml
    - uses: botFramework/create
        with:
        botId: ${{BOT_ID}}
        name: <Bot display name>
        messagingEndpoint: https://${{BOT_DOMAIN}}/api/messages
        description: ""
        channels:
            - name: msteams
    ```

  You can remove the `arm/deploy` action in `teamsapp.yml` file, as we don't need any Azure resources.

1. Run the `provision` command in Teams Toolkit.

1. After the provisioning process, locate the `BOT_ID` in the `env/.env.${envName}` file and the encrypted `SECRET_BOT_PASSWORD` in the `env/.env.${envName}.user` file. To get the real value of `BOT_PASSWORD`, select the Decrypt secret annotation.

1. To create a Kubernetes secret containing `BOT_ID` and `BOT_PASSWORD`, save the key-value pair in the `./deploy/.env.dev-secrets` file. Run the command to provision the secret.

```bash
kubectl create secret generic dev-secrets --from-env-file ./deploy/.env.dev-secrets -n $NAMESPACE
```

### Apply the deployment

The sample includes a deployment file, `deploy/sso-bot.yaml`, for your guidance. Update the placeholders in this file before you apply it.

1. Update the <image> placeholder with your image. For example, `myacr.azurecr.io/sso-bot:latest`.

1. Update the <hostname> with your ingress FQDN.

1. Apply `deploy/sso-bot.yaml`.

    ```bash
    kubectl apply -f deploy/sso-bot.yaml -n $NAMESPACE
    ```

1. Go to Visual Studio Code.

1. In the **Run and Debug** panel, select the **Launch Remote** configuration. To preview the Teams bot application deployed on Azure Kubernetes Service (AKS), press F5.

## Deploy Teams tab app to Kubernetes

Azure Kubernetes Service (AKS) serves as a managed container orchestration service offered by Azure. If you seek a fully managed Kubernetes version within Azure, consider AKS as your optimal choice.

Deploying a Teams tab app to AKS is as straightforward as deploying a web app to AKS. However, since a Teams tab app requires an HTTPS connection, you need to own a domain and setup TLS ingress in your AKS.

You can also deploy a Teams tab app to your personal Kubernetes cluster or a Kubernetes service on different cloud platforms. This involves steps similar to those used when deploying on Azure Kubernetes Service.

### Setup ingress with HTTPS on AKS

1. Ensure that your Azure Kubernetes Service is already connected to your Azure Container Registry, where your container images are hosted. For more information, see [Azure CLI](/azure/aks/learn/quick-kubernetes-deploy-cli).

1. Run the commands to install the ingress controller and certificate manager. This isn't the only way to set up ingress and TLS certificates on your Kubernetes cluster. For more information, see [create an unmanaged ingress controller](/azure/aks/ingress-basic?tabs=azure-cli) and [use TLS with Let's encrypt certificates](/azure/aks/ingress-tls#use-tls-with-lets-encrypt-certificates).

    ```yml
    NAMESPACE=teams-tab
    
    helm repo add ingress-nginx https://kubernetes.github.io/ingress-nginx
    helm repo update
    helm install ingress-nginx ingress-nginx/ingress-nginx --create-namespace --namespace $NAMESPACE \
        --set controller.nodeSelector."kubernetes\.io/os"=linux  \
        --set defaultBackend.nodeSelector."kubernetes\.io/os"=linux  \
        --set controller.healthStatus=true \
        --set controller.service.externalTrafficPolicy=Local \
        --set controller.service.annotations."service\.beta\.kubernetes\.io/azure-load-balancer-health-probe-request-path"=/healthz 
    
    helm repo add jetstack https://charts.jetstack.io
    helm repo update
    helm install cert-manager jetstack/cert-manager --namespace $NAMESPACE --set installCRDs=true --set nodeSelector."kubernetes\.io/os"=linux
    ```

1. Update the DNS for the ingress public IP and get the ingress endpoint.

    ```bash
    > kubectl get services --namespace $NAMESPACE -w ingress-nginx-controller
    
    NAME TYPE CLUSTER-IP EXTERNAL-IP PORT(S)
    ingress-nginx-controller LoadBalancer $CLUSTER_IP $EXTERNAL_IP 80:32514/TCP,443:32226/TCP
    
    > PUBLICIPID=$(az network public-ip list --query "[?ipAddress!=null]|[?contains(ipAddress, '$EXTERNAL_IP')].[id]" --output tsv)
    > az network public-ip update --ids $PUBLICIPID --dns-name $DNSLABEL
    > az network public-ip show --ids $PUBLICIPID --query "[dnsSettings.fqdn]" --output tsv
    
    $DNSLABEL.$REGION.cloudapp.azure.com
    ```

### Provision resources with Teams Toolkit

Use the provision command in the Teams Toolkit to create a Teams app with tab functionality. If necessary, you can also incorporate Entra ID for authentication. Update the sample code as needed to ensure compatibility with your Azure Kubernetes Service.

1. Fill the `TAB_DOMAIN` value in `env/.env.${envName}` file with your FQDN.

1. Remove the `arm/deploy` action from the `teamsapp.yml` file, as no additional Azure resources are required.

1. Run the `provision` command in Teams Toolkit.

1. Use the Teams Toolkit to create an Entra ID, which you might want to set as your apps environment variables. After the provisioning, locate the `AAD_APP_CLIENT_ID` in the `env/.env.${envName}` file and the encrypted `SECRET_AAD_APP_CLIENT_SECRET` in the `env/.env.${envName}.user` file.

1. To get the actual value of `SECRET_AAD_APP_CLIENT_SECRET`, select the Decrypt secret annotation.

### Apply the deployment

The sample includes a deployment file, `deploy/tab.yaml`, for your reference. Update the placeholders in this file before you apply it.

1. Update the <tab-image> placeholder with your image. For example, `myacr.azurecr.io/tab:latest`.

1. Update the <api-image> placeholder with your API image. If you don't have an API, remove the `hello-world-api`service and deployment from the yaml file.

1. Update the <hostname> with your ingress FQDN.

1. Apply `deploy/tab.yaml`.

    ```bash
    kubectl apply -f deploy/tab.yaml -n $NAMESPACE
    ```

1. Go to Visual Studio Code.

1. In the **Run and Debug** panel, select the **Launch Remote** configuration. To preview the Teams bot application deployed on Azure Kubernetes Service (AKS), press F5.
