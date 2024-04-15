---
title: CI/CD templates
author: MuyangAmigo
description:  In this module, learn how to use CI/CD pipeline templates in GitHub, Azure DevOps, and Jenkins for Teams Application DevelopersCI/CD templates.
ms.author: ruhe
ms.localizationpriority: medium
ms.topic: overview
ms.date: 04/20/2022
---

# Set up CI/CD pipelines

You can set up a Continuous Integration and Continuous Deployment (CI/CD) pipeline for Microsoft Teams apps created with the Teams Toolkit. A Teams app CI/CD pipeline typically consists of three parts:

1. Building the project.
1. Deploying the project to cloud resources.
1. Generating the Teams app package.

> [!NOTE]
> To create a pipeline for a Teams app, it's required to prepare the necessary cloud resources, such as Azure Web App, Azure Functions, or Azure Static Web App, and configure the app settings.

## Building the project

Building the project involves source code compilation and the creation of necessary deployment artifacts:

 1. It's recommended to use the Teams Toolkit CLI for the deployment process. For more information, see [set up CI/CD pipelines with Teams Toolkit CLI](#set-up-cicd-pipelines-with-teams-toolkit-cli).
 1. If you opt not to use the Teams Toolkit CLI for deployment or wish to customize your pipeline. For more information, see [set up CI/CD pipelines using your own workflow](#set-up-cicd-pipelines-using-your-own-workflow).
 1. Create the Teams app package enables you to evaluate your Teams app post-deployment through [distribute your Microsoft Teams app](../concepts/deploy-and-publish/apps-publish-overview.md).

### Set up CI/CD pipelines with Teams Toolkit CLI

You can use [Teams Toolkit command line interface](Teams-Toolkit-CLI.md) to automate the following procedures:

1. Build and deploy code to Microsoft Entra.
1. Create a Teams app appPackage, which is used for [distribute your Microsoft Teams app](../concepts/deploy-and-publish/apps-publish-overview.md).

> [!NOTE]
> To create a project, use Teams Toolkit version 5.6.0 or a later version.

#### Prerequisites

1. Set up required resources for your Teams app, You've two options to set up the resources such as Teams app ID, bot ID, and others:

    1. You can either manually extract these details from the manifest file under the appPackage  folder.
    1. You can run the `Provision` command in Teams Toolkit to generate them automatically.

1. To configure Azure resources, you've two options:

    1. You can manually prepare these resources by examining the Bicep files under the infra folder.
    1. You can run the `Provision` command in Teams Toolkit to prepare these Azure resources automatically.

1. Set up a service principal. Ensure that you've a ervice principal and its access policies on resources are properly configured. For more information, see

    * [create service principal using Entra portal](/entra/identity-platform/howto-create-service-principal-portal)
    * [create service principal using Entra CLI](/cli/azure/azure-cli-sp-tutorial-1?tabs=bash).

 The Teamsapp command-line interface (CLI) supports Azure login with a service principal secret. To proceed, [create a secret](/entra/identity-platform/howto-create-service-principal-portal) and save the client ID, client secret, and tenant ID of the service principal:

    :::image type="content" source="../assets/images/teams-toolkit-v2/service-principal.png" alt-text="Screenshot shows the service principal secret.":::

1. Prepare a GitHub or Azure repository.

#### Set up pipeline with GitHub

To set up the pipeline with GitHub, follow these steps:

1. Create a cd.yml under .github workflow folder and add the following code to the file:

    ```yaml
    on:
      push:
        branches:
          - main
    jobs:
      build:
        runs-on: ubuntu-latest
        env:
          TEAMSAPP_CLI_VERSION: "3.0.0"
          # Add extra environment variables here so that teamsapp cli can use them.
    
        steps:
          - name: "Checkout Github Action"
            uses: actions/checkout@master
    
          - name: Setup Node 20.x
            uses: actions/setup-node@v1
            with:
              node-version: "20.x"
    
          - name: install cli
            run: |
              npm install @microsoft/teamsapp-cli@${{env.TEAMSAPP_CLI_VERSION}}
    
          - name: Login Azure by service principal
            run: |
              npx teamsapp account login azure --username ${{vars.AZURE_SERVICE_PRINCIPAL_CLIENT_ID}}  \
              --service-principal true \
              --tenant ${{vars.AZURE_TENANT_ID}} \
              --password ${{secrets.AZURE_SERVICE_PRINCIPAL_CLIENT_SECRET }} \
              --interactive false
    
          - name: Deploy to hosting environment
            run: |
              npx teamsapp deploy --ignore-env-file true \
              --interactive false
    
          - name: Package app
            run: |
              npx teamsapp package
    
          - name: upload appPackage
            uses: actions/upload-artifact@v4
            with:
              name: artifact
              path: appPackage/build/appPackage.zip
    ```

    > [!NOTE]
    > The default pipeline triggers when push events occur on the main branch. You've the option to modify it to suit your specific requirements.

1. Set variables or secrets in the repository.

    The following variables and secrets are needed for the pipeline:

    * `AZURE_SERVICE_PRINCIPAL_CLIENT_ID`, `AZURE_TENANT_ID`, and `AZURE_SERVICE_PRINCIPAL_CLIENT_SECRET`.

    * Go to the `teamsapp.yml` file. In the `deploy` stage, the keys for the required variables are enclosed in ${{}}. If you've used the `provision` command from Teams Toolkit, you can locate the values in the environment files in the env folder.

    The following image shows the `BOT_AZURE_APP_SERVICE_RESOURCE_ID` in `teamsapp.yml` file:

    :::image type="content" source="../assets/images/teams-toolkit-v2/teamsappyml.png" alt-text="Screenshot shows the bot azure app service resource id in teamsapp.yml file.":::

    * Go to the `appPackage/manifest.json` file. The keys for the required variables are enclosed in ${{}} placeholders. If you've used the `provision` command from Teams Toolkit, you can locate the values in the environment files in the env folder.

    The following image shows the `TEAMS_APP_ID` in `manifest.json` file:

    :::image type="content" source="../assets/images/teams-toolkit-v2/manifest.png" alt-text="Screenshot shows the Teasm app id in manifest file.":::

    You need to set the following key name variables in the repo:

    * `AZURE_SERVICE_PRINCIPAL_CLIENT_ID`.
    * `AZURE_TENANT_ID`.
    * `AZURE_SERVICE_PRINCIPAL_CLIENT_SECRET`.
    * `BOT_AZURE_APP_SERVICE_RESOURCE_ID`.
    * `TEAMS_APP_ID`.

    To set variables or secrets, navigate to the **Settings** of your repository, then select **Secrets and variables** > **Actions**.

    > [!NOTE]
    > The `AZURE_SERVICE_PRINCIPAL_CLIENT_SECRET` to be set as secret.
    > Utilize the [gitHub environment](https://docs.github.com/en/actions/deployment/targeting-different-environments/using-environments-for-deployment#environment-variables) to use different sets of variables.

    You need to add the variables defined in your repo directly into your yml file, excluding the following three variables:

    * `AZURE_SERVICE_PRINCIPAL_CLIENT_ID`.
    * `AZURE_TENANT_ID`.
    * `AZURE_SERVICE_PRINCIPAL_CLIENT_SECRET`.

    :::image type="content" source="../assets/images/teams-toolkit-v2/modification.png" alt-text="Screenshot shows the modified pipeline yml.":::

1. Run the pipeline.

    Push code to the repo to trigger pipeline.

    > [!NOTE]
    > You don't need to commit env files under env folder to the repo. The env variables required for executing the CI/CD pipeline are already set in the repo variables.

    After the pipeline executes successfully, the log displays that the code is deployed to Azure and the appPackage is generated in the artifacts.

    :::image type="content" source="../assets/images/teams-toolkit-v2/published.png" alt-text="Screenshot shows the pipeline runs successfully.":::

#### Set up pipeline with Azure DevOps

1. Create a cd.yml under .github workflow folder and add the following code to the file:

    ```yaml
    trigger:
      - main
    
    pool:
      vmImage: ubuntu-latest
    
    variables:
      TEAMSAPP_CLI_VERSION: 3.0.0
    
    steps:
      - task: NodeTool@0
        inputs:
          versionSpec: "20"
          checkLatest: true
    
      - script: |
          npm install @microsoft/teamsapp-cli@$(TEAMSAPP_CLI_VERSION)
        displayName: "Install CLI"
    
      - script: |
          npx teamsapp account login azure --username $(AZURE_SERVICE_PRINCIPAL_CLIENT_ID) --service-principal true --tenant $(AZURE_TENANT_ID) --password $(AZURE_SERVICE_PRINCIPAL_CLIENT_SECRET) --interactive false
        displayName: "Login Azure by service principal"
    
      - script: |
          npx teamsapp deploy --ignore-env-file true --interactive false
        displayName: "Deploy to Azure"
        workingDirectory: $(System.DefaultWorkingDirectory)
    
      - script: |
          npx teamsapp package
        displayName: "Package app"
        workingDirectory: $(System.DefaultWorkingDirectory)
    
      - publish: $(System.DefaultWorkingDirectory)/appPackage/build/appPackage.zip
        artifact: artifact
    ```

    > [!NOTE]
    > The default pipeline triggers when push events occur on the main branch. You can modify it to meet your specific requirements.

1. Setup Azure pipeline.

    After you push your code to the repo, navigate to **Pipelines** and select **New pipeline**. Then, select your repo and the existing yml file to configure your pipeline.

1. Set variables or secrets in pipeline.

    The following variables and secrets are needed for the pipeline:

    * `AZURE_SERVICE_PRINCIPAL_CLIENT_ID`, `AZURE_TENANT_ID`, and `AZURE_SERVICE_PRINCIPAL_CLIENT_SECRET`.

    * Go to the `teamsapp.yml` file. In the `deploy` stage, the keys for the required variables are enclosed in ${{}}. If you've used the `provision` command from Teams Toolkit, you can locate the values in the environment files in the env folder.

    The following image shows the `BOT_AZURE_APP_SERVICE_RESOURCE_ID` in `teamsapp.yml` file:

    :::image type="content" source="../assets/images/teams-toolkit-v2/teamsappyml.png" alt-text="Screenshot shows the bot azure app service resource id in teamsapp.yml file.":::

    * Go to the `appPackage/manifest.json` file. The keys for the required variables are enclosed in ${{}} placeholders. If you've used the `provision` command from Teams Toolkit, you can locate the values in the environment files in the env folder.

    The following image shows the `TEAMS_APP_ID` in `manifest.json` file:

    :::image type="content" source="../assets/images/teams-toolkit-v2/manifest.png" alt-text="Screenshot shows the Teasm app id in manifest file.":::

    You need to set the following key name variables in the repo:

    * `AZURE_SERVICE_PRINCIPAL_CLIENT_ID`.
    * `AZURE_TENANT_ID`.
    * `AZURE_SERVICE_PRINCIPAL_CLIENT_SECRET`.
    * `BOT_AZURE_APP_SERVICE_RESOURCE_ID`.
    * `TEAMS_APP_ID`.

    To set variables in your pipeline, go to your pipeline and select Edit > Variables.

    > [!NOTE]
    > For security purposes, select the **Keep this value secret** checkbox if it's necessary.

    :::image type="content" source="../assets/images/teams-toolkit-v2/secret.png" alt-text="Screenshot shows the keep this value secret in new variable page.":::

1. Run the pipeline.

    Push code to the repo to trigger pipeline.

    > [!NOTE]
    > There's no need to commit env files under env/ folder to the repo. The env variables required for executing the CI/CD pipeline are already established in the pipeline variables.

    After the pipeline executes successfully, the log displays that the code is deployed to Azure and the appPackage is generated in the artifacts.

    :::image type="content" source="../assets/images/teams-toolkit-v2/published.png" alt-text="Screenshot shows the pipeline runs successfully.":::

### Set up CI/CD pipelines using your own workflow

If the Teams App CLI doesn't meet your pipeline requirements, you can develop a custom deployment process that suits your needs. This section provides guidance on deploying to Azure with custom methods. If you're using a different cloud platform.

> [!NOTE]
> If you already have a complete CI/CD pipeline for deploying to your Azure resource, and your Teams app needs to read environment variables during runtime, configure these environment variables in the settings of your Azure resource. For testing post-deployment, see [generate the appPackage for the teams app](#generate-the-apppackage-for-the-teams-app).

The `teamsapp deploy` command executes the actions defined in the `deploy` stage of the `teamsapp.yml` file. The `deploy` stage consist of `build` and `deploy` actions. To create a custom deployment method, rewrite these actions based on your specific requirements and preferences.

A basic bot TypeScript project as an example, the deploy stage in its `teamsapp.yml` is as follows:

```yaml
deploy:
  # Run npm command
  - uses: cli/runNpmCommand
    name: install dependencies
    with:
      args: install
  - uses: cli/runNpmCommand
    name: build app
    with:
      args: run build --if-present
  # Deploy your application to Azure App Service using the zip deploy feature.
  # For additional details, refer to this link.
  - uses: azureAppService/zipDeploy
    with:
      # Deploy base folder
      artifactFolder: .
      # Ignore file location, leave blank will ignore nothing
      ignoreFile: .webappignore
      # The resource id of the cloud resource to be deployed to.
      # This key will be generated by arm/deploy action automatically.
      # You can replace it with your existing Azure Resource id
      # or add it to your environment variable file.
      resourceId: ${{BOT_AZURE_APP_SERVICE_RESOURCE_ID}}
```

These actions perform the following tasks:

* Run `npm install` and `npm build` to build the project.
* Deploy code to Azure app service.

You can customize these actions in your CI/CD pipeline. Here's an example that utilizes GitHub's official actions:

```yaml
# build
- name: Setup Node 20.x
  uses: actions/setup-node@v1
  with:
    node-version: '20.x'
- name: 'npm install, build'
  run: |
    npm install
    npm run build --if-present

- name: 'zip artifact for deployment'
  run: |
    zip -r deploy.zip . --include 'node_modules/*' 'lib/*' 'web.config'

# deploy
- name: 'Login via Azure CLI'
  uses: azure/login@v1
  with:
    client-id: ${{ vars.CLIENT_ID }}
    tenant-id: ${{ vars.TENANT_ID }}
    subscription-id: ${{ vars.SUBSCRIPTION_ID }}

- name: 'Run Azure webapp deploy action using azure RBAC'
  uses: azure/webapps-deploy@v2
  with:
    app-name: ${{ vars.AZURE_WEBAPP_NAME }}
    package: deploy.zip
```

The Teams Toolkit currently supports Teams app projects, written in various programming languages and designed for hosting on different Azure services. The following actions for building and deploying. Use these actions when setting CI/CD deployment pipelines.

Build:

| Language | GitHub | Azure Pipeline |
|---|---|---|
|JS or TS |[actions/setup-node](https://github.com/actions/setup-node) |[NodeTool@0](/azure/devops/pipelines/tasks/reference/node-tool-v0?view=azure-pipelines) |
|C# |[actions/setup-dotnet](https://github.com/actions/setup-dotnet) |[DotNetCoreCLI@2](/azure/devops/pipelines/tasks/reference/dotnet-core-cli-v2?view=azure-pipelines) |

Deploy:

| Resource | GitHub | Azure Pipeline |
|---|---|---|
|Azure App Service |[azure/webapps-deploy](https://github.com/Azure/webapps-deploy) |[AzureWebApp@1](/azure/devops/pipelines/tasks/reference/azure-web-app-v1?view=azure-pipelines) |
|Azure Functions |[Azure/functions-action](https://github.com/Azure/functions-action) |[AzureFunctionApp@2](/azure/devops/pipelines/tasks/reference/azure-function-app-v2?view=azure-pipelines) |
|Azure Static Web Apps |[Azure/static-web-apps-deploy](https://github.com/Azure/static-web-apps-deploy)|[AzureStaticWebApp@0](/azure/devops/pipelines/tasks/reference/azure-static-web-app-v0?view=azure-pipelines) |

#### Credential needed for login to Azure

When deploying app code to Azure App Service, Azure Functions, or Azure Container App through CI/CD, a service principal is required for Azure login. Two methods exist for Azure login using a service principal:

* OpenID Connect (OIDC).
* secret.

The TeamsApp CLI currently supports sign-in using a service principal with a secret. If you wish to use OIDC, follow these steps:

* For GitHub action, see how to [Use the Azure login action with OpenID Connect](/azure/developer/github/connect-from-azure?tabs=azure-portal%2Cwindows).

* For Azure pipeline, see how to [Create an Azure Resource Manager service connection that uses workload identity federation](/azure/devops/pipelines/library/connect-to-azure?view=azure-devops).

#### Generate the appPackage for the teams app

To distribute your Teams app, the `appPackage` is required. You can automatically create the `appPackage.zip` using the `teamsapp package` command in Teamsapp CLI. If you're unable to use Teamsapp CLI, follow these steps to manually create the appPackage:

1. Prepare a `appPackage` folder.
1. Place the `manifest.json` file in the `appPackage` folder. The default `manifest.json` file in the Teams Toolkit project contains placeholders, denoted by ${{}}. Replace these placeholders with the correct values.
1. Place your app icons in the `appPackage` folder. To prepare your app icon, see [app icons](../concepts/build-and-test/apps-package.md#app-icons).
1. Zip the `appPackage` folder into `appPackage.zip`.

## See also

* [Quick Start for GitHub Actions](https://docs.github.com/en/actions/quickstart#creating-your-first-workflow)
* [Create your first Azure DevOps Pipeline](/azure/devops/pipelines/create-first-pipeline)
* [Create your first Jenkins Pipeline](https://www.jenkins.io/doc/pipeline/tour/hello-world/)
* [Manage your apps with the Developer Portal for Microsoft Teams](../concepts/build-and-test/teams-developer-portal.md)
