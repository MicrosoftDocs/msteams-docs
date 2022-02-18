---
title: CI or CD Support for Teams Application Developers
author: MuyangAmigo
description:  CICD templates
ms.author: ruhe
ms.localizationpriority: medium
ms.topic: overview
ms.date: 11/29/2021
---

# CI/CD guide

TeamsFx helps to automate your development workflow while building Teams application. The document provides tools and templates for you to get started with setting up CI or CD pipelines with GitHub, Azure Devops and Jenkins.

|Tools and Templates|Description|
|---|---|
|[teamsfx-cli-action](https://github.com/OfficeDev/teamsfx-cli-action)|GitHub Action that integrates with TeamsFx CLI.|
|[github-ci-template.yml](https://github.com/OfficeDev/TeamsFx/blob/main/docs/cicd_insider/github-ci-template.yml) and [github-cd-template.yml](https://github.com/OfficeDev/TeamsFx/blob/main/docs/cicd_insider/github-cd-template.yml)| GitHub CI or CD templates for Teams app. |
|[jenkins-ci-template.Jenkinsfile](https://github.com/OfficeDev/TeamsFx/blob/main/docs/cicd_insider/jenkins-ci-template.Jenkinsfile) and [jenkins-cd-template.Jenkinsfile](https://github.com/OfficeDev/TeamsFx/blob/main/docs/cicd_insider/jenkins-cd-template.Jenkinsfile)|Jenkins CI or CD templates for a Teams app.|
|[script-ci-template.sh](https://github.com/OfficeDev/TeamsFx/blob/main/docs/cicd_insider/others-script-ci-template.sh) and [script-cd-template.sh](https://github.com/OfficeDev/TeamsFx/blob/main/docs/cicd_insider/others-script-cd-template.sh)| Script templates for automation outside of GitHub. |

## CI or CD workflow templates in GitHub

**To include CI or CD workflows to automate Teams app development process in GitHub**:

1. Create folder under `.github/workflows`
1. Copy an one of the following template files:
    * [github-ci-template.yml](https://github.com/OfficeDev/TeamsFx/blob/main/docs/cicd_insider/github-ci-template.yml) for CI workflow.
    * [github-cd-template.yml](https://github.com/OfficeDev/TeamsFx/blob/main/docs/cicd_insider/github-cd-template.yml) for CD workflow.
1. Customize the workflows that fit your scenarios.

### Customize CI workflow

Perform the following steps to adapt the workflow for your project:

1. Change the CI flow.
1. Use npm build script, or customize the way you build the project in automation code.
1. Use npm test script which returns zero for success, and change the test commands.

### Customize CD workflow

Perform the following the steps to customize CD workflow:

1. By default, the CD workflow is triggered, when new commits are made to the `main` branch.
1. Create GitHub [repository secrets](https://docs.github.com/en/actions/reference/encrypted-secrets) by environment to hold Azure service principal and Microsoft 365 account login credentials. For more information,see [GitHub Actions](https://github.com/OfficeDev/teamsfx-cli-action/blob/main/README.md).
1. Change the build scripts if necessary.
1. Remove the test scripts as required.

> [!NOTE]
> The provision step is not included in the CD template as it's usually executed only once. You can either execute provision within Teams Toolkit, TeamsFx CLI, or using a separate workflow. Ensure to commit after provisioning. The results of provisioning are deposited in `.fx` folder.

### Github secrets

The following table lists all the secrets you need to create environment in GitHub:

1. Select **Settings**.
1. Go to **Environments** section.
1. Select **New environment**.
1. Enter a name for your environment. The default environment name provided in the template is `test_environment`.
1. Select **Configure environment**.
1. Select **Add Secret**.

The following table lists all the secrets required to create environment:

|Name|Description|
|---|---|
|`AZURE_SERVICE_PRINCIPAL_NAME`|The service principal name of Azure used to provision resources.|
|`AZURE_SERVICE_PRINCIPAL_PASSWORD`|The password of Azure service principal.|
|`AZURE_SUBSCRIPTION_ID`|To identify the subscription in which the resources will be provisioned.|
|`AZURE_TENANT_ID`|To identify the tenant in which the subscription resides.|
|`M365_ACCOUNT_NAME`|The Microsoft 365 account to create and publish Teams app.|
|`M365_ACCOUNT_PASSWORD`|The password of the Microsoft 365 account.|
|`M365_TENANT_ID`|To identify the tenant in which the Teams App will be created/published. This value is optional unless you have a multi-tenant account and you want to use another tenant. For more information, see [how to find your Microsoft 365 tenant ID](/azure/active-directory/fundamentals/active-directory-how-to-find-tenant).|

> [!NOTE]
> Currently, service principal for Azure is used in CI/CD workflows. For more information, see [create Azure service principles](#create-azure-service-principals).

## Set up CI or CD pipelines with Azure DevOps

You can set up automated pipelines in Azure DevOps, and make a reference on the scripts.

Perform the following steps to get started:

* [CI Scripts](https://github.com/OfficeDev/TeamsFx/blob/main/docs/cicd_insider/others-script-ci-template.sh)
* [CD Scripts](https://github.com/OfficeDev/TeamsFx/blob/main/docs/cicd_insider/others-script-cd-template.sh)

### Set up CI pipeline

1. Add [CI Scripts](https://github.com/OfficeDev/TeamsFx/blob/main/docs/cicd_insider/others-script-ci-template.sh) to your Azure DevOps repository, and do necessary customizations as you may infer from the comments in the script file.
1. Follow the [steps to create your Azure DevOps Pipeline for CI](/azure/devops/pipelines/create-first-pipeline).
Here is an scenario of a common CI pipeline scripts:

```yml
trigger:
- dev 

pool:
  vmImage: ubuntu-latest

steps:
- task: NodeTool@0
  inputs:
    versionSpec: '14.17.0'
    checkLatest: true
  
- task: Bash@3
  inputs:
    filePath: './others-script-ci-template.sh'
```

The following are the changes you can make for the script or workflow definition:

1. Change the CI flow. We default to when a new commit is pushed into the `dev` branch.
1. Change the way of how to install node and npm.
1. Use npm build script, or customize the way you build in the automation code.
1. Use npm test script which returns zero for success, and change the test commands.

### Set up CD pipeline

1. Add [CD Scripts](https://github.com/OfficeDev/TeamsFx/blob/main/docs/cicd_insider/others-script-cd-template.sh) into your Azure DevOps repository, and do necessary customizations as you may infer from the comments in the script file.
1. Create your Azure DevOps pipeline for CD. For more information,see [create first pipeline](/azure/devops/pipelines/create-first-pipeline). The Pipeline's definition can be referred to the following example definition for CI Pipeline.
1. Add necessary variables by [Define variables](/azure/devops/pipelines/process/variables), and make them as secrets if necessary.

```yml
trigger:
- main 

pool:
  vmImage: ubuntu-latest

steps:
- task: NodeTool@0
  inputs:
    versionSpec: '14.17.0'
    checkLatest: true
  
- task: Bash@3
  env:
    SP_NAME: $(AZURE_SERVICE_PRINCIPAL_NAME)
    SP_PASSWORD: $(AZURE_SERVICE_PRINCIPAL_PASSWORD)
    TENANT_ID: $(AZURE_TENANT_ID)
    AZURE_SUBSCRIPTION_ID: $(AZURE_SUBSCRIPTION_ID)
    M365_ACCOUNT_NAME: $(M365_ACCOUNT_NAME)
    M365_ACCOUNT_PASSWORD: $(M365_ACCOUNT_PASSWORD)
  inputs:
    filePath: './others-script-cd-template.sh'
```

The following are the changes you can make for the script or workflow definition:

1. How the CD flow is triggered. By default it happens when new commits are made to the **main** branch.
1. Change the way of how to install node and npm.
1. Change the environment name, by default its **staging**.
1. Ensure you have a npm build script, or customize the way you build in the automation code.
1. Ensure you have a npm test script which returns zero for success, and/or change the test commands.

### Pipeline variables for Azure DevOps

Perform the following steps to create Pipeline variables in Azure DevOps:

1. In the Pipeline editing page, select **Variables** and select **New variable**.
1. Enter Name or Value pair for your variable.
1. Toggle the checkbox of **Keep this value secret** if necessary.
1. Select **OK** to create the variable.

|Name|Description|
|---|---|
|`AZURE_SERVICE_PRINCIPAL_NAME`|The service principal name of Azure used to provision resources.|
|`AZURE_SERVICE_PRINCIPAL_PASSWORD`|The password of Azure service principal.|
|`AZURE_SUBSCRIPTION_ID`|To identify the subscription in which the resources are provisioned.|
|`AZURE_TENANT_ID`|To identify the tenant in which the subscription resides.|
|`M365_ACCOUNT_NAME`|The Microsoft 365 account for creating and publishing the Teams App.|
|`M365_ACCOUNT_PASSWORD`|The password of the Microsoft 365 account.|
|`M365_TENANT_ID`|To identify the tenant in which the Teams App is created or published. This value is optional unless you have a multi-tenant account and you want to use another tenant. Read more on [how to find your Microsoft 365 tenant ID](/azure/active-directory/fundamentals/active-directory-how-to-find-tenant).|

## CI or CD pipeline templates in Jenkins

To add these templates to your repository, you require the versions of [jenkins-ci-template.Jenkinsfile](https://github.com/OfficeDev/TeamsFx/blob/main/docs/cicd_insider/jenkins-ci-template.Jenkinsfile) and  [jenkins-cd-template.Jenkinsfile](https://github.com/OfficeDev/TeamsFx/blob/main/docs/cicd_insider/jenkins-cd-template.Jenkinsfile) to be located in your repository by branch.

Also, you need to create CI or CD pipelines in Jenkins which point to the specific `Jenkinsfile` correspondingly.

Follow the steps to check how to connect Jenkins with different SCM platforms:

1. [Jenkins with GitHub](https://www.jenkins.io/solutions/github/)
2. [Jenkins with Azure DevOps](https://www.dragonspears.com/blog/ci-cd-with-jenkins-and-azure-devops-services)
3. [Jenkins with GitLab](https://docs.gitlab.com/ee/integration/jenkins.html)
4. [Jenkins with Bitbucket](https://medium.com/ampersand-academy/integrate-bitbucket-jenkins-c6e51103d0fe)

### Customize CI pipeline

The following are some of the changes you can make to adapt your project:

1. Rename the template file to **Jenkinsfile**, and place it under the target branch, for example, the **dev** branch.
1. Change how the CI flow is triggered. We default to use the triggers of **pollSCM** when a new change is pushed into the **dev** branch.
1. Ensure you have a npm build script, or customize the way you build in the automation code.
1. Ensure you have a npm test script which returns zero for success, and/or change the test commands.

### Customize CD pipeline

Perform the following steps to customize the CD pipeline:

1. Rename the template file to `Jenkinsfile`, and place it in the target branch, for example, the `main` branch.
1. Change the CD flow. We default to use the triggers of `pollSCM` when a new change is pushed into the `main` branch.
1. Create Jenkins [pipeline credentials](https://www.jenkins.io/doc/book/using/using-credentials/) to hold Azure service principal and Microsoft 365 account login credentials.
1. Change the build scripts if necessary.
1. Remove the test scripts if you don't have tests.

### Credentials for Jenkins

Follow [using-credentials](https://www.jenkins.io/doc/book/using/using-credentials/) to create credentials on Jenkins.

|Name|Description|
|---|---|
|`AZURE_SERVICE_PRINCIPAL_NAME`|The service principal name of Azure used to provision resources.|
|`AZURE_SERVICE_PRINCIPAL_PASSWORD`|The password of Azure service principal.|
|`AZURE_SUBSCRIPTION_ID`|To identify the subscription in which the resources will be provisioned.|
|`AZURE_TENANT_ID`|To identify the tenant in which the subscription resides.|
|`M365_ACCOUNT_NAME`|The Microsoft 365 account for creating and publishing the Teams App.|
|`M365_ACCOUNT_PASSWORD`|The password of the Microsoft 365 account.|
|`M365_TENANT_ID`|To identify the tenant in which the Teams App is created or published. The value is optional unless you have a multi-tenant account and you want to use another tenant. Read more on [how to find your Microsoft 365 tenant ID](/azure/active-directory/fundamentals/active-directory-how-to-find-tenant).|

## Get started guide for other platforms

You can follow the listed pre-defined example bash scripts to build and customize CI or CD pipelines on other platforms:

* [CI Scripts](https://github.com/OfficeDev/TeamsFx/blob/main/docs/cicd_insider/others-script-ci-template.sh)
* [CD Scripts](https://github.com/OfficeDev/TeamsFx/blob/main/docs/cicd_insider/others-script-cd-template.sh)

The scripts are based on a cross-platform TeamsFx command line tool [TeamsFx-CLI](https://www.npmjs.com/package/@microsoft/teamsfx-cli). You can install it with `npm install -g @microsoft/teamsfx-cli` and follow the [documentation](https://github.com/OfficeDev/TeamsFx/blob/dev/docs/cli/user-manual.md) to customize the scripts.

> [!NOTE]
> * To enable `@microsoft/teamsfx-cli` running in CI mode, turn on `CI_ENABLED` by `export CI_ENABLED=true`. In CI mode, `@microsoft/teamsfx-cli` is friendly for CI or CD.
> * To enable `@microsoft/teamsfx-cli` running in the non-interactive mode, set a global config with command: `teamsfx config set -g interactive false`. In the non-interactive mode, `@microsoft/teamsfx-cli` does not prompt for inputs.

Ensure to set Azure and Microsoft 365 credentials in your environment variables safely. For example if you are using GitHub as your source code repository. For more information, see [Github Secrets](https://docs.github.com/en/actions/reference/encrypted-secrets).

## Create Azure service principals

To provision and deploy resources targeting Azure inside CI/CD, you must create an Azure service principal for use.

Perform the following steps to create Azure service principals:

1. Register an Microsoft Azure Active Directory (Azure AD) application in single tenant.
2. Assign a role to your Azure AD application to access your Azure subscription, and `Contributor` role is recommended.
3. Create a new Azure AD application secret.

> [!TIP]
> Save your tenant id, application id(AZURE_SERVICE_PRINCIPAL_NAME), and the secret(AZURE_SERVICE_PRINCIPAL_PASSWORD) for future use.

For more information, see [Azure service principals guidelines](/azure/active-directory/develop/howto-create-service-principal-portal). The following are the three ways to create service principal:

* [Microsoft Azure portal](/azure/active-directory/develop/howto-create-service-principal-portal)
* [Windows PowerShell](/azure/active-directory/develop/howto-authenticate-service-principal-powershell)
* [Microsoft Azure CLI](/cli/azure/create-an-azure-service-principal-azure-cli)

## Publish Teams app using Teams Developer Portal

If there's any changes related to Teams app's manifest file, you may want to publish the Teams app again to update the manifest.

To publish Teams app manually, you may leverage [Developer Portal for Teams](https://dev.teams.microsoft.com/home).

Perform the following steps to publish your app:

1. Sign in to [Developer portal for Teams](https://dev.teams.microsoft.com) using the corresponding account.
2. Import your app package in zip by selecting `App -> Import app -> Replace`.
3. Select the target app in app list.
4. Publish your app by selecting `Publish -> Publish to your org`

### See also

* [Quick Start for GitHub Actions](https://docs.github.com/en/actions/quickstart#creating-your-first-workflow)
* [Create your first Azure DevOps Pipeline](/azure/devops/pipelines/create-first-pipeline)
* [Create your first Jenkins Pipeline](https://www.jenkins.io/doc/pipeline/tour/hello-world/)
* [Manage your apps with the Developer Portal for Microsoft Teams](/concepts/build-and-test/teams-developer-portal)
