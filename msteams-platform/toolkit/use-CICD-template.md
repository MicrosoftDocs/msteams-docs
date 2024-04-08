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

Building the project involves compiling the source code and creating the necessary artifacts for deployment. For the deployment process, it is recommended to use the Teams Toolkit CLI. For more information, please refer to Set up CI/CD pipelines with Teams Toolkit CLI. If you prefer not to use the Teams Toolkit CLI for deployment or would like to customize your pipeline, you can refer to Set up CI/CD pipelines using your own workflow. The final step, generating the Teams app package, helps you test your Teams app after deployment by distributing your app.

Project construction involves source code compilation and the creation of necessary deployment artifacts:

1. It's recommended to use the Teams Toolkit CLI for the deployment process. For more information, see [Set up CI/CD pipelines with Teams Toolkit CLI](#set-up-cicd-pipelines-with-teams-toolkit-cli).
1. If you opt not to use the Teams Toolkit CLI for deployment or wish to customize your pipeline. For more information, see Set up CI/CD pipelines using your own workflow.
1. Create the Teams app package enables you to evaluate your Teams app post-deployment through [Distribute your Microsoft Teams app.](../concepts/deploy-and-publish/apps-publish-overview.md)

## Set up CI/CD pipelines with Teams Toolkit CLI

You can use [Teams Toolkit command line interface](Teams-Toolkit-CLI.md) to automate the following procedures:

1. Building and deploying code to Microsoft Entra.
1. Generating a Teams app's appPackage, which is used for [Distribute your Microsoft Teams app](../concepts/deploy-and-publish/apps-publish-overview.md).

> [!NOTE]
> To create a project, use Teams Toolkit version 5.6.0 or a later version.

## Prerequisites

1. Set up required resources for Teams app.

    You have two options to set up the necessary resources such as Teams app ID, bot ID, and others:

    1. You can either manually locate these resources in the manifest file found in the appPackage folder.
    1. You can execute the `Provision` command in the Teams Toolkit to generate them automatically.

1. To configure Azure resources, you've two options:

    1. You can manually prepare these resources by examining the Bicep files located in the infra folder.
    1. You can run Teams Toolkit `Provision` command to prepare these Azure resources automatically.

1. Set up a service principal. Make sure you have a service principal and its access policies on resources are properly configured. For more information, see [create service principal using Entra portal](/entra/identity-platform/howto-create-service-principal-portal) and [create service principal using Entra CLI.](/cli/azure/azure-cli-sp-tutorial-1?tabs=bash)

The Teamsapp command-line interface (CLI) supports Azure login using a service principal secret. To proceed, [create a secret](/entra/identity-platform/howto-create-service-principal-portal) and save the service principal's client ID, client secret, and tenant ID. You'll need these details for the following steps:

1. Prepare a GitHub or Azure repository.

## Set up pipeline with GitHub

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

2. Set variables or secrets in the repository.

The following variables and secrets are needed for the pipeline:

* AZURE_SERVICE_PRINCIPAL_CLIENT_ID, AZURE_TENANT_ID, and AZURE_SERVICE_PRINCIPAL_CLIENT_SECRET.

* Go to the `teamsapp.yml` file. In the `deploy` stage, the keys for the required variables are enclosed in ${{}}. If you've used the `provision` command from Teams Toolkit, you can locate the values in the environment files in the env folder.

    Below is an example of teamsapp.yml, the "BOT_AZURE_APP_SERVICE_RESOURCE_ID" needs to be set in the repo variable.

* Go to the appPackage/manifest.json file. The keys for the required variables are enclosed in ${{}} placeholders. If you've used the `provision` command from Teams Toolkit, you can locate the values in the environment files in the env folder.

    Below is an example of `manifest.json` snippet, the "TEAMS_APP_ID" needs to be set in the repo variable.

You need to set the following key name variables in the repo:

* AZURE_SERVICE_PRINCIPAL_CLIENT_ID
* AZURE_TENANT_ID
* AZURE_SERVICE_PRINCIPAL_CLIENT_SECRET
* BOT_AZURE_APP_SERVICE_RESOURCE_ID
* TEAMS_APP_ID

You can set variables or secrets in repo's "Settings"->"Secrets and variables"->"Actions".

> [!NOTE]
> The AZURE_SERVICE_PRINCIPAL_CLIENT_SECRET to be set as secret.
> You can use [GitHub environment](https://docs.github.com/en/actions/deployment/targeting-different-environments/using-environments-for-deployment#environment-variables) if you want to use different sets of variables.

You need to add variables set in repository explicitly into your yml file except these 3: AZURE_SERVICE_PRINCIPAL_CLIENT_ID, AZURE_TENANT_ID, and AZURE_SERVICE_PRINCIPAL_CLIENT_SECRET.

Taking above as an example, you need to modify your pipeline's yml file as:

[Modification image placeholder]

4. Run the pipeline

Push code to the repo to trigger pipeline.

> [!NOTE]
> You don't need to commit env files under env/ folder into the repo. The env needed for running CI/CD pipeline are already set in the repo variables.

After the pipeline runs successfully you should see from the log that code has been deployed to Azure and the appPackage has been generated in artifacts.

## Set up pipeline with Azure DevOps

1. Create a cd.yml under .github workflow folder and add the following code to the file:

    ```yml
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
    
      - script: |
          npx teamsapp package
        displayName: "Package app"
    
      - publish: $(System.DefaultWorkingDirectory)/appPackage/build/appPackage.zip
        artifact: artifact
    ```

> [!NOTE]
> The default pipeline will be triggered when push events happen on main branch, you can modify it to meet your own needs.

1. Setup Azure pipeline.

After pushing your code to repo. Go to Pipelines, and then select New pipeline. Select your repo and select your existing yml file to configure your pipeline.

1. Set variables or secrets in the repository.

The following variables and secrets are needed for the pipeline:

AZURE_SERVICE_PRINCIPAL_CLIENT_ID, AZURE_TENANT_ID, and AZURE_SERVICE_PRINCIPAL_CLIENT_SECRET.

* Go to teamsapp.yml file, in deploy stage, the placeholders wrapped in ${{}} are the needed variables' keys. If you used Teams Toolkit's "provision" command, you can find the values in /env files.

Below is an example of teamsapp.yml, the "BOT_AZURE_APP_SERVICE_RESOURCE_ID" needs to be set in the repo variable.

* Go to appPackage/manifest.json file, the placeholders wrapped in ${{}} are the needed variables' keys. If you used Teams Toolkit's "provision" command, you can find the values in /env files.

Below is an example of manifest.json snippet, the "TEAMS_APP_ID" needs to be set in the repo variable.

> [!NOTE]
> If you used Teams Toolkit's "provision" command to create Azure resources and Teams app resources, you can find the values of these variables in your project's /env files.

You need to set the following key name variables in the repo:

* AZURE_SERVICE_PRINCIPAL_CLIENT_ID
* AZURE_TENANT_ID
* AZURE_SERVICE_PRINCIPAL_CLIENT_SECRET
* BOT_AZURE_APP_SERVICE_RESOURCE_ID
* TEAMS_APP_ID

For setting variables in your pipeline, go to your pipeline and click Edit-> Variables.

1. Run the pipeline

Push code to the repo to trigger pipeline.

> [!NOTE]
> You don't need to commit env files under env/ folder into the repo. The env needed for running CI/CD pipeline are already set in the pipeline variables.

After the pipeline runs successfully you should see from the log that code deployed to Azure and the appPackage has been generated in artifacts. [Image].

## Set up CI/CD pipelines using your own workflow

If you're unable to leverage the Teams App CLI within your pipeline, you can create a custom deployment process tailored to your needs. This section offers guidance on how to deploy to Azure using custom methods. If you are using a different cloud platform, you can also refer to this section for guidance.

> [!NOTE]
> If you already have a complete CI/CD pipeline in place for deploying to your Azure resource, your Teams app requires reading environment variables during runtime, you need to configure these environment variables in your Azure resource's settings. You can refer directly to Generate app package section for testing after deployment.

The teamsapp deploy command executes the actions in teamsapp.yml's "deploy" stage. Most of the "deploy" stages consist of "build" and "deploy" actions. To create a custom deployment method, you need to rewrite these actions according to your requirements and preferences.

Taking basic bot typescript project as an example, its teamsapp.yml's deploy stage is as following:

```yml
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
  # For additional details, refer to https://aka.ms/zip-deploy-to-app-services.
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

These actions do the following things:

* run `npm install` and `npm build` to build the project.
* deploy code to Azure app service.

You can rewrite these actions in your CI/CD pipeline in your own way. Below is an example of using GitHub official actions:

```yml
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

Currently, the Teams Toolkit supports Teams app projects written in different programming languages and suitable to be hosted on different Azure services. Below lists some official actions for build and deploy. You can refer to these actions when setting up CI/CD deployment pipelines.

Build:

| Language | GitHub | Azure Pipeline |
|---|---|---|
|JS/TS |[actions/setup-node](https://github.com/actions/setup-node) |[NodeTool@0](/azure/devops/pipelines/tasks/reference/node-tool-v0?view=azure-pipelines) |
|C# |[actions/setup-dotnet](https://github.com/actions/setup-dotnet) |[DotNetCoreCLI@2](/azure/devops/pipelines/tasks/reference/dotnet-core-cli-v2?view=azure-pipelines) |

Deploy:

| Resource | GitHub | Azure Pipeline |
|---|---|---|
|Azure App Service |[azure/webapps-deploy](https://github.com/Azure/webapps-deploy) |[AzureWebApp@1](/azure/devops/pipelines/tasks/reference/azure-web-app-v1?view=azure-pipelines) |
|Azure Functions |[Azure/functions-action](https://github.com/Azure/functions-action) |[AzureFunctionApp@2](/azure/devops/pipelines/tasks/reference/azure-function-app-v2?view=azure-pipelines) |
|Azure Static Web Apps |[Azure/static-web-apps-deploy](https://github.com/Azure/static-web-apps-deploy)|[AzureStaticWebApp@0](/azure/devops/pipelines/tasks/reference/azure-static-web-app-v0?view=azure-pipelines) |

### Credential needed for login to Azure

If you are using CI/CD to deploy app code to Azure app service, Azure functions or Azure container app, you need a service principal to login to Azure. There are 2 ways of login to Azure using service principal: using OpenID Connect(OIDC) or secret.

Currently teamsapp CLI supports login using service principal with secret. If you want to use OIDC, for GitHub action please refer to [use Azure login action with OpenID Connect](/azure/developer/github/connect-from-azure?tabs=azure-portal%2Cwindows); for Azure pipeline please refer to [create a Azure resource manager service connection that uses workload identity federation](/azure/devops/pipelines/library/connect-to-azure?view=azure-devops).

### Generate the appPackage for the teams app

You will need the `appPackage` to distribute your Teams app. Teamsapp CLI's command "teamsapp package" can help you create the `appPackage`.zip automatically. If you cannot leverage teamsapp CLI to do this, you can follow below steps to create the appPackage by hand:

1. prepare a `appPackage`/ folder.
1. put mainfest.json in appPackage folder. The default manifest.json in Teams Toolkit project has placeholders (wrapped in ${{}}). You should replace these placeholders with true values.
1. put app icons in appPackage folder. Follow the guide to prepare [App icons](../concepts/build-and-test/apps-package.md#app-icons). You should have 2 .png files as output.
1. zip the appPackage folder. Zip the appPackage/ folder into appPackage.zip.

## See also

* [Quick Start for GitHub Actions](https://docs.github.com/en/actions/quickstart#creating-your-first-workflow)
* [Create your first Azure DevOps Pipeline](/azure/devops/pipelines/create-first-pipeline)
* [Create your first Jenkins Pipeline](https://www.jenkins.io/doc/pipeline/tour/hello-world/)
* [Manage your apps with the Developer Portal for Microsoft Teams](../concepts/build-and-test/teams-developer-portal.md)
