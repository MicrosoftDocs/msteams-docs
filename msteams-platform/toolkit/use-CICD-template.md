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
> Before creating a pipeline for a Teams app, it is essential to prepare the necessary cloud resources, such as Azure Web App, Azure Functions, or Azure Static Web App, and configure the app settings.

Building the project involves compiling the source code and creating the necessary artifacts for deployment. For the deployment process, it is recommended to use the Teams Toolkit CLI. For more information, please refer to Set up CI/CD pipelines with Teams Toolkit CLI. If you prefer not to use the Teams Toolkit CLI for deployment or would like to customize your pipeline, you can refer to Set up CI/CD pipelines using your own workflow. The final step, generating the Teams app package, helps you test your Teams app after deployment by distributing your app.

## Set up CI/CD pipelines with Teams Toolkit CLI

You can use Teams Toolkit CLI to automate the following procedures:

1. Building and deploying code to Azure.
1. Generating a Teams app's appPackage, which can be used for app distribution.

> [!NOTE]
> For creating project, we recommend using Teams Toolkit version 5.6.0 or later.

## Prerequisites

1. Prepare Teams app needed resources.

You can manually prepare the resources (teams app id, bot id, etc) by looking into manifest file under appPackage/ folder, or you can run Teams Toolkit’s “provision” command to create them automatically.

1. Prepare and config Azure resources.

You can manually prepare these resources by looking into biceps files under infra/ folder, , or you can run Teams Toolkit’s “provision” command to prepare these Azure resources automatically.

1. Prepare service principal.

You should have a service principal and configure its access policies on resources. Below are some docs that you can refer to:

Create service principal using Azure portal.
Create service principal using Azure CLI.

Teamsapp cli currently supports login to Azure using service principal secret. Create a secret and save service principal’s client id, client secret, tenant id for following steps.

1. Prepare a GitHub/Azure repository.

After you meet the above prerequisites, you can follow the steps below to setup the pipeline. This section provides tutorial for GitHub and Azure DevOps, if you wish to use other platforms, you can also refer to this section for guidance.

## Set up pipeline with GitHub

1. Create a CD yml in your project

Create a cd.yml file under .github/workflows/ folder. Write the following content into this yml file.

> [!NOTE]
> The default pipeline will be triggered when push events happen on main branch, you can modify it to meet your own needs.

2. Set variables/secrets in the repository.

The following variables and secrets are needed for the pipeline:

* AZURE_SERVICE_PRINCIPAL_CLIENT_ID, AZURE_TENANT_ID, AZURE_SERVICE_PRINCIPAL_CLIENT_SECRET.

* Go to teamsapp.yml file, in deploy stage, the placeholders wrapped in ${{}} are the needed variables' keys. If you used Teams Toolkit's "provision" command, you can find the values in /env files.

Below is an example of teamsapp.yml, the "BOT_AZURE_APP_SERVICE_RESOURCE_ID" needs to be set in the repo variable.

* Go to appPackage/manifest.json file, the placeholders wrapped in ${{}} are the needed variables' keys. If you used Teams Toolkit's "provision" command, you can find the values in /env files.

Below is an example of manifest.json snippet, the "TEAMS_APP_ID" needs to be set in the repo variable.

Therefore for the above example, you need to set the following variables in the repo.

key name
AZURE_SERVICE_PRINCIPAL_CLIENT_ID
AZURE_TENANT_ID
AZURE_SERVICE_PRINCIPAL_CLIENT_SECRET
BOT_AZURE_APP_SERVICE_RESOURCE_ID
TEAMS_APP_ID

You can set variables/secrets in repo's "Settings"->"Secrets and variables"->"Actions".


> [!NOTE]
> The AZURE_SERVICE_PRINCIPAL_CLIENT_SECRET should be set as secret.
> You can leverage GitHub environment if you want to use different sets of variables.

You need to add variables set in repository explicitly into your yml file except these 3: AZURE_SERVICE_PRINCIPAL_CLIENT_ID, AZURE_TENANT_ID, AZURE_SERVICE_PRINCIPAL_CLIENT_SECRET.

Taking above as an example, you need to modify your pipeline's yml file as:

4. Run the pipeline

Push code to the repo to trigger pipeline.

> [!NOTE]
> You don't need to commit env files under env/ folder into the repo. The env needed for running CI/CD pipeline are already set in the repo variables.

After the pipeline runs successfully you should see from the log that code has been deployed to Azure and the appPackage has been generated in artifacts.

## Set up pipeline with Azure DevOps

1. Create a CD yml in your project.
Create a yml file under your project. Write the following content into this yml file.

> [!NOTE]
> The default pipeline will be triggered when push events happen on main branch, you can modify it to meet your own needs.

1. Setup Azure pipeline.

After pushing your code to repo. Go to Pipelines, and then select New pipeline. Select your repo and select your existing yml file to configure your pipeline.

1. Set variables/secrets in the repository.

The following variables and secrets are needed for the pipeline:

AZURE_SERVICE_PRINCIPAL_CLIENT_ID, AZURE_TENANT_ID, AZURE_SERVICE_PRINCIPAL_CLIENT_SECRET.

* Go to teamsapp.yml file, in deploy stage, the placeholders wrapped in ${{}} are the needed variables' keys. If you used Teams Toolkit's "provision" command, you can find the values in /env files.

Below is an example of teamsapp.yml, the "BOT_AZURE_APP_SERVICE_RESOURCE_ID" needs to be set in the repo variable.

* Go to appPackage/manifest.json file, the placeholders wrapped in ${{}} are the needed variables' keys. If you used Teams Toolkit's "provision" command, you can find the values in /env files.

Below is an example of manifest.json snippet, the "TEAMS_APP_ID" needs to be set in the repo variable.



## Set up pipelines

You can set up pipelines with the following platforms:

1. [Set up workflows with GitHub](#set-up-workflows-with-github)
1. [Set up pipelines with Azure DevOps](#set-up-pipelines-with-azure-devops)
1. [Set up pipelines with Jenkins](#set-up-pipelines-with-jenkins)
1. [Set up pipelines for other platforms](#set-up-pipelines-for-other-platforms)

## Workflow template types

TeamsFx supports four types of workflow templates:

* **CI**: Help checkout code, build, and run test.
* **CD**: Help checkout code, build, test, and deploy to cloud.
* **Provision**: Help create or update resources in cloud and Teams app registrations.
* **Publish**: Help publish Teams app to tenants.

## Prepare credentials

Two categories of sign in credentials are involved in CI/CD workflows:

* **Microsoft 365**: Microsoft 365 credentials are required for running Provision, Publish, and SPFx based projects' CD workflows.
* **Azure**: Azure credentials are required for running Azure hosted projects' Provision and CD workflows.

> [!NOTE]
> Azure subscription id is required to be set in environment variable or `env/.env.*` files before running Provision workflows. The variable name used is `AZURE_SUBSCRIPTION_ID`. Also, don't forget to commit and push files `env/.env.*` into Git repositories or set pipelines' environment variables as they're ignored by `.gitignore` file by default.

|Name | Description |
|---|---|
|AZURE_SERVICE_PRINCIPAL_NAME |The service principal name of Azure used to provision resources.|
|AZURE_SERVICE_PRINCIPAL_PASSWORD |The password of Azure service principal.|
|AZURE_SUBSCRIPTION_ID |To identify the subscription in which the resources are to be provisioned.|
|AZURE_TENANT_ID |To identify the tenant in which the subscription resides.|
|M365_ACCOUNT_NAME |The Microsoft 365 account for creating and publishing the Teams App.|
|M365_ACCOUNT_PASSWORD |The password of the Microsoft 365 account.|
|M365_TENANT_ID |To identify the tenant in which the Teams App gets created or published. This value is optional unless you have a multitenant account and you want to use another tenant. Read more on how to find your Microsoft 365 tenant ID.|

> [!NOTE]
>
> * Currently, a non-interactive authentication style for Microsoft 365 is used in CI/CD workflows, so ensure that your Microsoft 365 account has sufficient privileges in your tenant and doesn't have multi-factor authentication or other advanced security features enabled. Refer to the [Configure Microsoft 365 Credentials](https://github.com/OfficeDev/teamsfx-cli-action/blob/main/README.md#configure-m365azure-credentials-as-github-secret) to make sure you have disabled Multi-factor Authentication and Security Defaults for the credentials used in the workflow.
> * Currently, service principal for Azure is used in CI/CD workflows, and to create Azure service principals for use, refer to [here](#how-to-create-azure-service-principals-for-use).

## Host types

Templates vary in host types (Azure or SPFx) by which Provision and CD workflow templates are split into copies. CI, Publish workflow templates are host-type independent. If you're working on Azure hosted projects, download those templates with file name of `azure` infixes. If you're working on SPFx hosted projects, download those templates with file name of `spfx` infixes.

## Set up workflows with GitHub

To set up pipelines with GitHub for CI/CD:

* Create CI/CD workflows.
* Customize CI/CD workflows.

### Create CI/CD workflows

1. Download the corresponding template files from [Tools and Templates](#tools-and-templates).
1. Rename the downloaded template files by your needs.
1. Put them under `.github/workflows`, which is the designated folder for GitHub Actions.
1. Commit and push these template files into remote repositories.
1. Add necessary [encrypted secrets](https://docs.github.com/en/actions/security-guides/encrypted-secrets) for your workflows.
1. Trigger your workflows. Check more [details](https://docs.github.com/en/actions/using-workflows/triggering-a-workflow) about how to trigger a workflow on GitHub.

### Customize CI workflow

To customize the CI workflow, you can do the following:

1. Change the trigger: By default, the CI workflow is triggered when a new pull request is created against `dev` branch.
1. Add scripts to build the project: By default, the `Build the project` step is commented.
1. Add scripts to run unit test: By default, the `Run unit test` step is commented.

### Customize CD workflow

To customize the CD workflow, you can do the following:

1. Change the trigger: By default, the CD workflow is triggered when new commits are pushed into `main` branch.
1. Change the value of environment variable `TEAMSFX_ENV_NAME`: By default, the value is `dev`.
1. Change the value of environment variable `TEAMSFX_CLI_VERSION`: By default, the value is `2.*`.
1. Add scripts to build the project: By default, the `Build the project` step is commented.
1. Add scripts to run unit test: By default, the `Run unit test` step is commented.

### Customize Provision and Publish workflow

To customize the Provision and Publish workflow, you can do the following:

1. Change the trigger: By default, the workflow is triggered manually.
1. Change the value of environment variable `TEAMSFX_ENV_NAME`: By default, the value is `dev`.
1. Change the value of environment variable `TEAMSFX_CLI_VERSION`: By default, the value is `2.*`.

## Set up pipelines with Azure DevOps

To set up pipelines with Azure DevOps for CI/CD:

* Create CI/CD pipelines.
* Customize CI/CD pipelines.

### Create CI/CD pipelines

1. Download the corresponding template files from [Tools and Templates](#tools-and-templates).
1. Rename the downloaded template files by your needs.
1. Put them under `.azure/pipelines`, which is the conventional folder for Azure Pipelines.
1. Commit and push these template files into remote repositories.
1. Create corresponding Azure DevOps pipelines by following [Create your first Azure DevOps Pipeline](/azure/devops/pipelines/create-first-pipeline).
1. Add necessary [Azure DevOps Pipeline variables](/azure/devops/pipelines/process/variables) for your pipelines.
1. Trigger your pipelines automatically, manually, or customize (Check the `trigger:` or `pr:` section in yml files to find the triggers). For more information about triggers in Azure DevOps, see [Triggers in Azure pipelines](/azure/devops/pipelines/build/triggers).

### Customize CI pipeline

To customize the CI pipeline, you can do the following:

1. Change the trigger: By default, the CI pipeline is triggered when a new pull request is created against `dev` branch.
1. Add scripts to build the project: By default, the `Build the project` step is commented.
1. Add scripts to run unit test: By default, the `Run unit test` step is commented.

### Customize CD pipeline

To customize the CD pipeline, you can do the following:

1. Change the trigger: By default, the CD pipeline is triggered when new commits are pushed into `main` branch.
1. Change the value of environment variable `TEAMSFX_ENV_NAME`: By default, the value is `dev`.
1. Change the value of environment variable `TEAMSFX_CLI_VERSION`: By default, the value is `2.*`.
1. Add scripts to build the project: By default, the `Build the project` step is commented.
1. Add scripts to run unit test: By default, the `Run unit test` step is commented.

### Customize Provision and Publish pipelines

To customize the Provision and Publish pipeline, you can do the following:

1. Change the trigger: By default, the workflow is triggered manually.
1. Change the value of environment variable `TEAMSFX_ENV_NAME`: By default, the value is `dev`.
1. Change the value of environment variable `TEAMSFX_CLI_VERSION`: By default, the value is `2.*`.

## Set up pipelines with Jenkins

To set up pipelines with Jenkins for CI/CD:

* Create CI/CD pipelines.
* Customize CI/CD pipelines.

### Create CI/CD pipelines

1. Download the corresponding template files from [Tools and Templates](#tools-and-templates).
1. Rename the downloaded template files by your needs.
1. Put them under `.jenkins/pipelines`, which can be a conventional folder for Jenkins Pipelines.

### Customize CI pipeline

To customize the CI pipeline, you can do the following:

1. Change the trigger: By default, the CI pipeline is triggered periodically.
1. Add scripts to build the project: By default, the `Build the project` step is commented.
1. Add scripts to run unit test: By default, the `Run unit test` step is commented.

### Customize CD pipeline

To customize the CD pipeline, you can do the following:

1. Change the trigger: By default, the CD pipeline is triggered periodically.
1. Change the value of environment variable `TEAMSFX_ENV_NAME`: By default, the value is `dev`.
1. Change the value of environment variable `TEAMSFX_CLI_VERSION`: By default, the value is `2.*`.
1. Add scripts to build the project: By default, the `Build the project` step is commented.
1. Add scripts to run unit test: By default, the `Run unit test` step is commented.

### Customize Provision and Publish pipelines

To customize the Provision and Publish pipeline, you can do the following:

1. Change the trigger: By default, the pipeline is triggered periodically.
1. Change the value of environment variable `TEAMSFX_ENV_NAME`: By default, the value is `dev`.
1. Change the value of environment variable `TEAMSFX_CLI_VERSION`: By default, the value is `2.*`.

## Set up pipelines for other platforms

You can follow the predefined listed example bash scripts from [Tools and Templates](#tools-and-templates) to build and customize CI/CD pipelines on the other platforms:

The scripts are based on a cross-platform TeamsFx command line tool [TeamsFx-CLI](https://www.npmjs.com/package/@microsoft/teamsfx-cli). You can install it with `npm install -g @microsoft/teamsfx-cli` and follow the [documentation](https://github.com/OfficeDev/TeamsFx/blob/dev/docs/cli/user-manual.md) to customize the scripts.

> [!NOTE]
>
> * To enable `@microsoft/teamsfx-cli` running in CI mode, turn on `CI_ENABLED` by `export CI_ENABLED=true`. In CI mode, `@microsoft/teamsfx-cli` is friendly for CI/CD.
> * To enable `@microsoft/teamsfx-cli` running in the non-interactive mode, set a global config with command: `teamsfx config set -g interactive false`. In the non-interactive mode, `@microsoft/teamsfx-cli` doesn't prompt for inputs.

Ensure to set up Azure and Microsoft 365 credentials in your environment variables safely. For example, if you're using GitHub as your source code repository, see [GitHub Secrets](https://docs.github.com/en/actions/reference/encrypted-secrets).

## How to create Azure service principals for use?

To provision and deploy resources targeting Azure inside CI/CD, you must create an Azure service principal for use.

Perform the following steps to create Azure service principals:

1. Register a Microsoft Entra application in single tenant.
2. Assign a role to your Microsoft Entra application to access your Azure subscription. The `Contributor` role is recommended.
3. Create a new Microsoft Entra application secret.

> [!TIP]
> Save your tenant id, application id (AZURE_SERVICE_PRINCIPAL_NAME), and the secret (AZURE_SERVICE_PRINCIPAL_PASSWORD) for future use.

For more information, see [Azure service principals guidelines](/azure/active-directory/develop/howto-create-service-principal-portal). The following are the three ways to create service principals:

* [Microsoft Azure portal](/azure/active-directory/develop/howto-create-service-principal-portal)
* [Windows PowerShell](/azure/active-directory/develop/howto-authenticate-service-principal-powershell)
* [Microsoft Azure CLI](/cli/azure/create-an-azure-service-principal-azure-cli)

## Publish Teams app using Teams Developer Portal

If there are any changes related to Teams app's manifest file, you can update the manifest and publish the Teams app again. To publish Teams app manually, you may use [Developer Portal for Teams](https://dev.teams.microsoft.com/home).

Perform the following steps to publish your app:

1. Sign in to [Developer portal for Teams](https://dev.teams.microsoft.com) using the corresponding account.
2. Import your app package in zip, select **App** > **Import app** > **Replace**.
3. Select the target app in app list.
4. To publish your app, select **Publish** > **Publish to your org**.

## See also

* [Quick Start for GitHub Actions](https://docs.github.com/en/actions/quickstart#creating-your-first-workflow)
* [Create your first Azure DevOps Pipeline](/azure/devops/pipelines/create-first-pipeline)
* [Create your first Jenkins Pipeline](https://www.jenkins.io/doc/pipeline/tour/hello-world/)
* [Manage your apps with the Developer Portal for Microsoft Teams](../concepts/build-and-test/teams-developer-portal.md)
