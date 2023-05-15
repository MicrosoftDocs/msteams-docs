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

TeamsFx helps to automate your development workflow while building Teams application. The following are the tools and templates you can use to set up CI/CD pipelines, create workflow templates, and customize CI/CD workflow with GitHub, Azure DevOps, Jenkins, and other platforms. To provision resources, you can create Azure service principals and use the Provision pipeline or do it manually by leveraging bicep files. To publish Teams app, you can use the Publish pipeline or do it manually by leveraging [Developer Portal for Teams](https://dev.teams.microsoft.com/home).

## Tools and Templates

|Tools and Templates | Description |
|---|---|
|[TeamsFx-CLI-Action](https://github.com/OfficeDev/teamsfx-cli-action)|GitHub action that integrates with TeamsFx CLI.|
|[Teams Toolkit for Visual Studio Code](https://marketplace.visualstudio.com/items?itemName=TeamsDevApp.ms-teams-vscode-extension)| Visual Studio Code extension that helps you to develop Teams app and automation workflows for GitHub, Azure DevOps, and Jenkins. |
|[Teams Toolkit for CLI](https://www.npmjs.com/package/@microsoft/teamsfx-cli) | Command Line tool that helps you to develop Teams app and automation workflows for GitHub, Azure DevOps, and Jenkins.|
|[github/ci.yml](https://github.com/OfficeDev/TeamsFx/blob/main/docs/cicd/github/ci.yml) <br> [github/cd.azure.yml](https://github.com/OfficeDev/TeamsFx/blob/main/docs/cicd/github/cd.azure.yml) <br> [github/cd.spfx.yml](https://github.com/OfficeDev/TeamsFx/blob/main/docs/cicd/github/cd.spfx.yml) <br> [github/provision.azure.yml](https://github.com/OfficeDev/TeamsFx/blob/main/docs/cicd/github/provision.azure.yml) <br> [github/provision.spfx.yml](https://github.com/OfficeDev/TeamsFx/blob/main/docs/cicd/github/provision.spfx.yml) <br> [github/publish.yml](https://github.com/OfficeDev/TeamsFx/blob/main/docs/cicd/github/publish.yml) | Templates for automation on GitHub.|
|[azdo/ci.yml](https://github.com/OfficeDev/TeamsFx/blob/main/docs/cicd/azdo/ci.yml) <br> [azdo/cd.azure.yml](https://github.com/OfficeDev/TeamsFx/blob/main/docs/cicd/azdo/cd.azure.yml) <br> [azdo/cd.spfx.yml](https://github.com/OfficeDev/TeamsFx/blob/main/docs/cicd/azdo/cd.spfx.yml) <br> [azdo/provision.azure.yml](https://github.com/OfficeDev/TeamsFx/blob/main/docs/cicd/azdo/provision.azure.yml) <br> [azdo/provision.spfx.yml](https://github.com/OfficeDev/TeamsFx/blob/main/docs/cicd/azdo/provision.spfx.yml) <br> [azdo/publish.yml](https://github.com/OfficeDev/TeamsFx/blob/main/docs/cicd/azdo/publish.yml)| Templates for automation on Azure DevOps.|
|[jenkins/Jenkinsfile.ci](https://github.com/OfficeDev/TeamsFx/blob/main/docs/cicd/jenkins/Jenkinsfile.ci) <br> [jenkins/Jenkinsfile.azure.cd](https://github.com/OfficeDev/TeamsFx/blob/main/docs/cicd/jenkins/Jenkinsfile.azure.cd) <br> [jenkins/Jenkinsfile.spfx.cd](https://github.com/OfficeDev/TeamsFx/blob/main/docs/cicd/jenkins/Jenkinsfile.spfx.cd) <br> [jenkins/Jenkinsfile.azure.provision](https://github.com/OfficeDev/TeamsFx/blob/main/docs/cicd/jenkins/Jenkinsfile.azure.provision) <br> [jenkins/Jenkinsfile.spfx.provision](https://github.com/OfficeDev/TeamsFx/blob/main/docs/cicd/jenkins/Jenkinsfile.spfx.provision) <br> [jenkins/Jenkinsfile.publish](https://github.com/OfficeDev/TeamsFx/blob/main/docs/cicd/jenkins/Jenkinsfile.publish) | Templates for automation on Jenkins.|
|[others/ci.sh](https://github.com/OfficeDev/TeamsFx/blob/main/docs/cicd/others/ci.sh) <br> [others/cd.azure.sh](https://github.com/OfficeDev/TeamsFx/blob/main/docs/cicd/others/cd.azure.sh) <br> [others/cd.spfx.sh](https://github.com/OfficeDev/TeamsFx/blob/main/docs/cicd/others/cd.spfx.sh) <br> [others/provision.azure.sh](https://github.com/OfficeDev/TeamsFx/blob/main/docs/cicd/others/provision.azure.sh) <br> [others/provision.spfx.sh](https://github.com/OfficeDev/TeamsFx/blob/main/docs/cicd/others/provision.spfx.sh) <br> [others/publish.sh](https://github.com/OfficeDev/TeamsFx/blob/main/docs/cicd/others/publish.sh) | Script templates for automation outside of GitHub, Azure DevOps, or Jenkins. |

## Set up pipelines

You can set up pipelines with the following platforms:

1. [Set up workflows with GitHub](#set-up-workflows-with-github)
1. [Set up pipelines with Azure DevOps](#set-up-pipelines-with-azure-devops)
1. [Set up pipelines with Jenkins](#set-up-pipelines-with-jenkins)
1. [Set up pipelines for other platforms](#set-up-pipelines-for-other-platforms)

## Workflow template types

TeamsFx supports four types of workflow templates:

1. **CI**: Help checkout code, build, and run test.
1. **CD**: Help checkout code, build, test, and deploy to cloud.
1. **Provision**: Help create or update resources in cloud and Teams app registrations.
1. **Publish**: Help publish Teams app to tenants.

## Prepare credentials

Two categories of sign in credentials are involved in CI/CD workflows:

1. **M365**: M365 credentials are required for running Provision, Publish, and SPFx based projects' CD workflows.
2. **Azure**: Azure credentials are required for running Azure hosted projects' Provision and CD workflows.

> [!NOTE]
> Azure subscription id is required to be set in environment variable or `env/.env.*` files before running Provision workflows. The variable name used is `AZURE_SUBSCRIPTION_ID`. Also, please don't forget to commit and push files `env/.env.*` into Git repositories or set pipelines' environment variables as they're ignored by `.gitignore` file by default.

|Name | Description |
|---|---|
|AZURE_SERVICE_PRINCIPAL_NAME |The service principal name of Azure used to provision resources.|
|AZURE_SERVICE_PRINCIPAL_PASSWORD |The password of Azure service principal.|
|AZURE_SUBSCRIPTION_ID |To identify the subscription in which the resources are to be provisioned.|
|AZURE_TENANT_ID |To identify the tenant in which the subscription resides.|
|M365_ACCOUNT_NAME |The Microsoft 365 account for creating and publishing the Teams App.|
|M365_ACCOUNT_PASSWORD |The password of the Microsoft 365 account.|
|M365_TENANT_ID |To identify the tenant in which the Teams App gets created or published. This value is optional unless you have a multi-tenant account and you want to use another tenant. Read more on how to find your Microsoft 365 tenant ID.|

> [!NOTE]
>
> * Currently, a non-interactive authentication style for Microsoft 365 is used in CI/CD workflows, so please ensure that your Microsoft 365 account has sufficient privileges in your tenant and doesn't have multi-factor authentication or other advanced security features enabled. Please refer to the [Configure Microsoft 365 Credentials](https://github.com/OfficeDev/teamsfx-cli-action/blob/main/README.md#configure-m365azure-credentials-as-github-secret) to make sure you have disabled Multi-factor Authentication and Security Defaults for the credentials used in the workflow.
> * Currently, service principal for Azure is used in CI/CD workflows, and to create Azure service principals for use, refer to [here](https://github.com/devdiv-azure-service-dmitryr/teamsfx-docs/blob/main/V5-doc-update/cicd.md#how-to-create-azure-service-principals-for-use).

## Host types

Templates vary in host types (Azure or SPFx) by which Provision and CD workflow templates are splited into copies. CI, Publish workflow templates are host-type independent. If you're working on Azure hosted projects, please download those templates with file name of `azure` infixes. If you're working on SPFx hosted projects, please download those templates with file name of `spfx` infixes.

## Set up workflows with GitHub

To set up pipelines with GitHub for CI/CD:

* Create CI/CD workflows.
* Customize CI/CD workflows.

### Create CI/CD workflows

1. Download the corresponding template files from [Tools and Templates](#tools-and-templates).
1. Rename the downloaded template files by your needs.
1. Put them under `.github/workflows` which is the designated folder for GitHub Actions.
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
1. Change the value of environment variable `TEAMSFX_CLI_VERSION`: By default, the value is `1.*`.
1. Add scripts to build the project: By default, the `Build the project` step is commented.
1. Add scripts to run unit test: By default, the `Run unit test` step is commented.

### Customize Provision and Publish workflow

To customize the Provision and Publish workflow, you can do the following:

1. Change the trigger: By default, the workflow is triggered manually.
1. Change the value of environment variable `TEAMSFX_ENV_NAME`: By default, the value is `dev`.
1. Change the value of environment variable `TEAMSFX_CLI_VERSION`: By default, the value is `1.*`.

## Set up pipelines with Azure DevOps

To set up pipelines with Azure DevOps for CI/CD:

* Create CI/CD pipelines.
* Customize CI/CD pipelines.

### Create CI/CD pipelines

1. Download the corresponding template files from [Tools and Templates](#tools-and-templates).
1. Rename the downloaded template files by your needs.
1. Put them under `.azure/pipelines` which is the conventional folder for Azure Pipelines.
1. Commit and push these template files into remote repositories.
1. Create corresponding Azure DevOps pipelines by following [Create your first Azure DevOps Pipeline](/azure/devops/pipelines/create-first-pipeline).
1. Add necessary [Azure DevOps Pipeline variables](/azure/devops/pipelines/process/variables) for your pipelines.
1. Trigger your pipelines automatically, manually, or do customization (Check the `trigger:` or `pr:` section in yml files to find the triggers). More about triggers in Azure DevOps, refer to [Triggers in Azure pipelines](/azure/devops/pipelines/build/triggers).

### Customize CI pipeline

To customize the CI pipeline, you can do the following:

1. Change the trigger: By default, the CI pipeline is triggered when a new pull request is created against `dev` branch.
1. Add scripts to build the project: By default, the `Build the project` step is commented.
1. Add scripts to run unit test: By default, the `Run unit test` step is commented.

### Customize CD pipeline

To customize the CD pipeline, you can do the following:

1. Change the trigger: By default, the CD pipeline is triggered when new commits are pushed into `main` branch.
1. Change the value of environment variable `TEAMSFX_ENV_NAME`: By default, the value is `dev`.
1. Change the value of environment variable `TEAMSFX_CLI_VERSION`: By default, the value is `1.*`.
1. Add scripts to build the project: By default, the `Build the project` step is commented.
1. Add scripts to run unit test: By default, the `Run unit test` step is commented.

### Customize Provision and Publish pipelines

To customize the Provision and Publish pipeline, you can do the following:

1. Change the trigger: By default, the workflow is triggered manually.
1. Change the value of environment variable `TEAMSFX_ENV_NAME`: By default, the value is `dev`.
1. Change the value of environment variable `TEAMSFX_CLI_VERSION`: By default, the value is `1.*`.

## Set up pipelines with Jenkins

To set up pipelines with Jenkins for CI/CD:

* Create CI/CD pipelines.
* Customize CI/CD pipelines.

### Create CI/CD pipelines

1. Download the corresponding template files from [Tools and Templates](#tools-and-templates).
1. Rename the downloaded template files by your needs.
1. Put them under `.jenkins/pipelines` which can be a conventional folder for Jenkins Pipelines.

### Customize CI pipeline

To customize the CI pipeline, you can do the following:

1. Change the trigger: By default, the CI pipeline is triggered periodically.
1. Add scripts to build the project: By default, the `Build the project` step is commented.
1. Add scripts to run unit test: By default, the `Run unit test` step is commented.

### Customize CD pipeline

To customize the CD pipeline, you can do the following:

1. Change the trigger: By default, the CD pipeline is triggered periodically.
1. Change the value of environment variable `TEAMSFX_ENV_NAME`: By default, the value is `dev`.
1. Change the value of environment variable `TEAMSFX_CLI_VERSION`: By default, the value is `1.*`.
1. Add scripts to build the project: By default, the `Build the project` step is commented.
1. Add scripts to run unit test: By default, the `Run unit test` step is commented.

### Customize Provision and Publish pipelines

To customize the Provision and Publish pipeline, you can do the following:

1. Change the trigger: By default, the pipeline is triggered periodically.
1. Change the value of environment variable `TEAMSFX_ENV_NAME`: By default, the value is `dev`.
1. Change the value of environment variable `TEAMSFX_CLI_VERSION`: By default, the value is `1.*`.

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

1. Register an Microsoft Azure Active Directory (Azure AD) application in single tenant.
2. Assign a role to your Azure AD application to access your Azure subscription. The `Contributor` role is recommended.
3. Create a new Azure AD application secret.

> [!TIP]
> Save your tenant id, application id (AZURE_SERVICE_PRINCIPAL_NAME), and the secret (AZURE_SERVICE_PRINCIPAL_PASSWORD) for future use.

For more information, see [Azure service principals guidelines](/azure/active-directory/develop/howto-create-service-principal-portal). The following are the three ways to create service principals:

* [Microsoft Azure portal](/azure/active-directory/develop/howto-create-service-principal-portal)
* [Windows PowerShell](/azure/active-directory/develop/howto-authenticate-service-principal-powershell)
* [Microsoft Azure CLI](/cli/azure/create-an-azure-service-principal-azure-cli)

## Publish Teams app using Teams Developer Portal

If there are any changes related to Teams app's manifest file, you can update the manifest and publish the Teams app again. To publish Teams app manually, you may leverage [Developer Portal for Teams](https://dev.teams.microsoft.com/home).

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
