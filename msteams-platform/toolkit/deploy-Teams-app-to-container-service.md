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

You'll need an Azure account and the Azure CLI (command line interfaces) for Azure Container Apps or Azure Kubernetes Service deployment.

> [!NOTE]
> The commands in this article are based on Bash. You might need to modify them to work in other CLI.

## Deploying to Azure Container Apps

Azure Container Apps is a fully managed service that lets you to operate containerized apps in the cloud. It serves as an optimal selection if you don't require direct access to all native Kubernetes APIs and cluster management, and prefer a fully managed experience based on best practices.

Using the sample applications, you can execute the provision and deploy commands in Teams Toolkit. The Teams Toolkit creates an Azure Container Registry and Azure Container Apps for you. It then builds your app into a container image and deploys it to Azure Container Apps.

The `provision` command creates and configures the following resources:

* A Teams app with tab or bot capability.
* An Azure Container Registry to host your container image.
* An Azure Container App environment and an Azure Container Apps to host your bot app.
* An Azure Entra App for authentication.

In the sample Teams bot, the `provision` command also creates an Azure Bot Service to channel Teams client and Azure Container Apps.

The `deploy` command executes the following actions:

* Builds the appl into a container image.
* Pushes the container image to Azure Container Registry.
* Deploys the image to Azure Container Apps.

## Deploying Teams bot to Azure Kubernetes Service

Azure Kubernetes Service (AKS) is a managed container orchestration service provided by Azure. For a fully managed Kubernetes experience within Azure, consider AKS is an ideal choice.

### Architecture

:::image type="content" source="../assets/images/teams-toolkit-v2/architecture.png" alt-text="Screenshot shows the Teams bot to Azure Kubernetes Service architecture.":::

The Teams backend server interacts with your bot through the Azure Bot Service, which requires that your bot is accessible through a public HTTPS endpoint. To establish this, deploy an ingress controller on your Kubernetes cluster and secure it with a TLS certificate.

For bot authentication with the Azure Bot Service, use Entra ID. You’ll need to create a Kubernetes secret containing the App ID and password. Once created, incorporate this secret into your container’s runtime configuration to facilitate authentication.

### Setup ingress with HTTPS on AKS

Confirm that your Azure Kubernetes Service is already connected to your Azure Container Registry, where your container images are hosted.

1. Ensure that you've an existing Azure Kubernetes Service connected to your Azure Container Registry, where your container images are hosted. For more information, see [use the Azure CLI](/azure/aks/learn/quick-kubernetes-deploy-cli/).

1. Execute the commands to install the ingress controller and certificate manager. This is not the only way to set up ingress and TLS certificates on your Kubernetes cluster. For more information, see [create an unmanaged ingress controller](/azure/aks/ingress-basic?tabs=azure-cli) and [use TLS with Let's encrypt certificates](/azure/aks/ingress-tls#use-tls-with-lets-encrypt-certificates).

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

You can use the provision command in Teams Toolkit to create a Teams app with bot capability, the Azure Bot Service and the Entra ID for authentication. Update the sample code to ensure compatibile with your Azure Kubernetes Service.

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

1. To create a Kubernetes secret that contains `BOT_ID` and `BOT_PASSWORD`, first store the key-value pair in the `./deploy/.env.dev-secrets`and execute the command below to provision the secret.

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

1. In the Run and Debug panel, select the Launch Remote configuration. To preview the Teams bot application deployed on Azure Kubernetes Service (AKS), press F5.

## Deploying Teams bot to an On-Premise Kubernetes Cluster

Deploy a Teams bot to your personal Kubernetes cluster or a Kubernetes service from different cloud services, which involves similar steps to those used when deploying on Azure Kubernetes Service.

### Architecture

image

Teams backend server communicates with your bot via the Azure Bot Service, so the bot definitely needs a public HTTPS address. You need to deploy an ingress controller and provision a TLS certificate on your Kubernetes.

The bot needs to authenticate to Azure Bot Service by Microsoft Entra ID, so you should provision a secret that contains the App ID and password on your Kubernetes and refer to it in your container runtime.

## Provision resources with Teams Toolkit

You can leverage the provision command in Teams Toolkit to create the Teams app with bot capability, the Azure Bot Service and the Microsoft Entra ID for authentication.

You can make some updates to the sample code to make it works with your Kubernetes Service.

Fill the BOT_DOMAIN value in env/.env.${envName} with your FQDN.

Update the arm/deploy action in teamsapp.yml so that Teams Toolkit will provision an Azure Bot Service when running provision command.

* uses: arm/deploy
  with:
    subscriptionId: ${{AZURE_SUBSCRIPTION_ID}}
    resourceGroupName: ${{AZURE_RESOURCE_GROUP_NAME}}
    templates:
      - path: ./infra/botRegistration/azurebot.bicep
        parameters: ./infra/botRegistration/azurebot.parameters.json
        deploymentName: Create-resources-for-bot
    bicepCliVersion: v0.9.1
It is recommended to use Azure Bot Service for channeling. If you don't have an Azure account and cannot create Azure Bot Service, you can create a bot registration as an alternative. Add the botFramework/create action in the provision stage in teamsapp.yml to leverage Teams Toolkit to create a bot registration with the correct messaging endpoint.

* uses: botFramework/create
    with:
    botId: ${{BOT_ID}}
    name: <Bot display name>
    messagingEndpoint: https://${{BOT_DOMAIN}}/api/messages
    description: ""
    channels:
        - name: msteams
You can remove the arm/deploy action in teamsapp.yml file since we do not need any Azure resources.

Run the provision command in Teams Toolkit.

After provisioning, you can find the BOT_ID in env/.env.${envName} file and the encrypted SECRET_BOT_PASSWORD in env/.env.${envName}.user file. Click the Decrypt secret annotation to get the real value of BOT_PASSWORD.

Create a Kubernetes secret that contains BOT_ID and BOT_PASSWORD. You can store the key-value pair in the ./deploy/.env.dev-secrets first and run the following command to provision the secret.

kubectl create secret generic dev-secrets --from-env-file ./deploy/.env.dev-secrets -n $NAMESPACE

## Apply the deployment

The sample contains an example deployment file deploy/sso-bot.yaml for your reference. You need to update the placeholders before applying it.

Update the <image> placeholder with your image. For example, myacr.azurecr.io/sso-bot:latest.

Update the <hostname> with your ingress FQDN

Apply deploy/sso-bot.yaml.

kubectl apply -f deploy/sso-bot.yaml -n $NAMESPACE
In VS Code Run and Debug panel, select the Launch Remote configuration and press F5 to preview the Teams bot application that deployed on AKS.

## Deploying Teams tab app to Kubernetes

Azure Kubernetes Service (AKS) is a managed container orchestration service provided by Azure. If you're looking for a fully managed version of Kubernetes in Azure, AKS is an ideal choice.

Deploying a Teams tab app to AKS is not more complicated than deploying a web app to AKS. While Teams tab app requires HTTPS connection, you must have an owned domain and setup TLS ingress in your AKS.

You can also deploy a Teams tab app to your own Kubernetes cluster or Kubernetes service in other Cloud services, which involves similar steps to deploying on Azure Kubernetes Service.

## Setup ingress with HTTPS on AKS

Ensure you have an existing Azure Kubernetes Service connected to your Azure Container Registry, which hosts your container images. If you do not have one, please refer to this tutorial: AKS Tutorials.
Run the following commands to install ingress controller and certificate manager. This is not the only way to set up ingress and TLS certificates on your Kubernetes cluster. For more information, refer to Create an ingress controller and Use TLS with Let's Encrypt certificates.
NAMESPACE=teams-tab

helm repo add ingress-nginx <https://kubernetes.github.io/ingress-nginx>
helm repo update
helm install ingress-nginx ingress-nginx/ingress-nginx --create-namespace --namespace $NAMESPACE \
    --set controller.nodeSelector."kubernetes\.io/os"=linux  \
    --set defaultBackend.nodeSelector."kubernetes\.io/os"=linux  \
    --set controller.healthStatus=true \
    --set controller.service.externalTrafficPolicy=Local \
    --set controller.service.annotations."service\.beta\.kubernetes\.io/azure-load-balancer-health-probe-request-path"=/healthz

helm repo add jetstack <https://charts.jetstack.io>
helm repo update
helm install cert-manager jetstack/cert-manager --namespace $NAMESPACE --set installCRDs=true --set nodeSelector."kubernetes\.io/os"=linux
Update the DNS for the ingress public IP and get the ingress endpoint.
> kubectl get services --namespace $NAMESPACE -w ingress-nginx-controller

NAME TYPE CLUSTER-IP EXTERNAL-IP PORT(S)
ingress-nginx-controller LoadBalancer $CLUSTER_IP $EXTERNAL_IP 80:32514/TCP,443:32226/TCP

> PUBLICIPID=$(az network public-ip list --query "[?ipAddress!=null]|[?contains(ipAddress, '$EXTERNAL_IP')].[id]" --output tsv)
> az network public-ip update --ids $PUBLICIPID --dns-name $DNSLABEL
> az network public-ip show --ids $PUBLICIPID --query "[dnsSettings.fqdn]" --output tsv

$DNSLABEL.$REGION.cloudapp.azure.com

## Provision resources with Teams Toolkit

You can leverage the provision command in Teams Toolkit to create the Teams app with tab capability and the Microsoft Entra ID for authentication if necessary. You can make some updates to the sample code to make it works with your Azure Kubernetes Service.

Fill the TAB_DOMAIN value in env/.env.${envName} with your FQDN.

Remove the arm/deploy action in teamsapp.yml since there is no more Azure resources is needed.

Run the provision command in Teams Toolkit.

If you leverage Teams Toolkit to create a Microsoft Entra ID, you may want to configure Entra ID as environment variables of your applications. After provisioning, you can find the AAD_APP_CLIENT_ID in env/.env.${envName} file and the encrypted SECRET_AAD_APP_CLIENT_SECRET in env/.env.${envName}.user file. Click the Decrypt secret annotation to get the real value of SECRET_AAD_APP_CLIENT_SECRET.

## Apply the deployment

The sample contains an example deployment file deploy/tab.yaml for your reference. You need to update the placeholders before applying it.

Update the <tab-image> placeholder with your image. For example, myacr.azurecr.io/tab:latest.

Update the <api-image> placeholder with your api image. If you do not have an api, remove the hello-world-api service and deployment from the yaml file.

Update the <hostname> with your ingress FQDN

Apply deploy/tab.yaml.

kubectl apply -f deploy/tab.yaml -n $NAMESPACE
In VS Code Run and Debug panel, select the Launch Remote configuration and press F5 to preview the Teams tab application that deployed on AKS.
