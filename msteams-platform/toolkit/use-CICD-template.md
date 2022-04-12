---
title: Learn how to use CI or CD pipeline templates in GitHub, Azure DevOps, and Jenkins for Teams Application Developers
author: MuyangAmigo
description:  CICD templates
ms.author: ruhe
ms.localizationpriority: medium
ms.topic: overview
ms.date: 11/29/2021
---

# CI/CD guide

TeamsFx helps to automate your development workflow while building Teams application. The document provides tools and templates for you to get started with setting up CI or CD pipelines with GitHub, Azure Devops and Jenkins.

|Tools and Templates |Description|
|---|---|
|[teamsfx-cli-action](https://github.com/OfficeDev/teamsfx-cli-action)|GitHub Action that integrates with TeamsFx CLI.|
|[Teams Toolkit in Visual Studio Code](https://marketplace.visualstudio.com/items?itemName=TeamsDevApp.ms-teams-vscode-extension)| Visual Studio Code extension that helps you develop Teams app as well as automation workflows for Github, Azure DevOps and Jenkins. |
|[TeamsFx CLI](https://www.npmjs.com/package/@microsoft/teamsfx-cli) | Command Line tool that helps you develop Teams app as well as automation workflows for Github, Azure DevOps and Jenkins. |
|[script-ci-template.sh](https://github.com/OfficeDev/TeamsFx/blob/main/docs/cicd_insider/others-script-ci-template.sh) and [script-cd-template.sh](https://github.com/OfficeDev/TeamsFx/blob/main/docs/cicd_insider/others-script-cd-template.sh)| Script templates for automation outside of GitHub, Azure DevOps or Jenkins. |

## Set up pipelines with GitHub

**To include workflows to automate Teams app development process in GitHub**:

### Create workflow templates using Teams Toolkit in Visual Studio Code

1. Open a Teams app project created using Teams Toolkit or follow this [tutorial](https://docs.microsoft.com/en-us/microsoftteams/platform/sbs-gs-javascript?tabs=vscode%2Cvsc%2Cviscode%2Cvcode) create a new project.
2. Select Teams Toolkit icon in the Visual Studio Code sidebar.
3. Select **Add CI/CD Workflows**
4. Select an environment from the command prompt.
5. Select **GitHub** as CI/CD provider.
6. Select at least one template from these options: CI, CD, Provison and Publish to Teams.
7. Open the template and customize the workflows that fit your scenarios.
8. Follow the README files under `.github/workflows` to set up the workflow in GitHub.

### Create workflow templates using TeamsFx CLI

1. `cd` to your Teams app project directory.
2. Type `teamsfx add cicd` command and it will start the interactive command process.
3. Select an environment from the command prompt.
4. Select **GitHub** as CI/CD provider.
5. Select at least one template from these options: CI, CD, Provison and Publish to Teams.
7. Open the template and customize the workflows that fit your scenarios.
8. Follow the README files under `.github/workflows` to set up the workflow in GitHub.

> [!NOTE]
> If you need to add additional workflow templates, you can follow the same process again. 

### Customize CI workflow

Perform the following steps to adapt the workflow for your project:

1. Change the CI flow.
1. Use npm build script, or customize the way you build the project in automation code.
1. Use npm test script which returns zero for success, and change the test commands.

### Customize CD workflow

Perform the following the steps to customize CD workflow:

1. By default, the CD workflow is triggered, when new commits are made to the `main` branch.
1. Change the build scripts if necessary.
1. Remove the test scripts as required.

## Set up pipelines with Azure DevOps

**To include workflows to automate Teams app development process in Azure DevOps**:

### Create workflow templates using Teams Toolkit in Visual Studio Code

1. Open a Teams app project created using Teams Toolkit or follow this [tutorial](https://docs.microsoft.com/en-us/microsoftteams/platform/sbs-gs-javascript?tabs=vscode%2Cvsc%2Cviscode%2Cvcode) create a new project.
2. Select Teams Toolkit icon in the Visual Studio Code sidebar.
3. Select **Add CI/CD Workflows**
4. Select an environment from the command prompt.
5. Select **Azure DevOps** as CI/CD provider.
6. Select at least one template from these options: CI, CD, Provison and Publish to Teams.
7. Open the template and customize the workflows that fit your scenarios.
8. Follow the README files under `.azure/pipelines` to set up the workflow in Azure DevOps.

### Create workflow templates using TeamsFx CLI

1. `cd` to your Teams app project directory.
2. Type `teamsfx add cicd` command and it will start the interactive command process.
3. Select an environment from the command prompt.
4. Select **Azure DevOps** as CI/CD provider.
5. Select at least one template from these options: CI, CD, Provison and Publish to Teams.
7. Open the template and customize the workflows that fit your scenarios.
8. Follow the README files under `.azure/pipelines` to set up the workflow in Azure DevOps.

> [!NOTE]
> If you need to add additional workflow templates, you can follow the same process again. 


### Customize CI workflow

The following are the changes you can make for the script or workflow definition:

1. Change the CI flow. We default to when a new commit is pushed into the `dev` branch.
1. Change the way of how to install node and npm.
1. Use npm build script, or customize the way you build in the automation code.
1. Use npm test script which returns zero for success, and change the test commands.

### Customize CD workflow

The following are the changes you can make for the script or workflow definition:

1. How the CD flow is triggered. By default it happens when new commits are made to the **main** branch.
1. Change the way of how to install node and npm.
1. Change the environment name, by default its **staging**.
1. Ensure you have a npm build script, or customize the way you build in the automation code.
1. Ensure you have a npm test script which returns zero for success, and/or change the test commands.


## Set up pipelines with Jenkins

**To include workflows to automate Teams app development process with Jenkins**:

### Create workflow templates using Teams Toolkit in Visual Studio Code

1. Open a Teams app project created using Teams Toolkit or follow this [tutorial](https://docs.microsoft.com/en-us/microsoftteams/platform/sbs-gs-javascript?tabs=vscode%2Cvsc%2Cviscode%2Cvcode) create a new project.
2. Select Teams Toolkit icon in the Visual Studio Code sidebar.
3. Select **Add CI/CD Workflows**
4. Select an environment from the command prompt.
5. Select **Jenkins** as CI/CD provider.
6. Select at least one template from these options: CI, CD, Provison and Publish to Teams.
7. Open the template and customize the workflows that fit your scenarios.
8. Follow the README files under `.jenkins/pipelines` to set up the workflow with Jenkins.

### Create workflow templates using TeamsFx CLI

1. `cd` to your Teams app project directory.
2. Type `teamsfx add cicd` command and it will start the interactive command process.
3. Select an environment from the command prompt.
4. Select **Jenkins** as CI/CD provider.
5. Select at least one template from these options: CI, CD, Provison and Publish to Teams.
7. Open the template and customize the workflows that fit your scenarios.
8. Follow the README files under `.jenkins/pipelines` to set up the workflow with Jenkins.

> [!NOTE]
> If you need to add additional workflow templates, you can follow the same process again. 

Follow the steps to check how to connect Jenkins with different SCM platforms:

1. [Jenkins with GitHub](https://www.jenkins.io/solutions/github/)
2. [Jenkins with Azure DevOps](https://www.dragonspears.com/blog/ci-cd-with-jenkins-and-azure-devops-services)
3. [Jenkins with GitLab](https://docs.gitlab.com/ee/integration/jenkins.html)
4. [Jenkins with Bitbucket](https://medium.com/ampersand-academy/integrate-bitbucket-jenkins-c6e51103d0fe)

### Customize CI pipeline

The following are some of the changes you can make to adapt your project:

1. Change how the CI flow is triggered. We default to use the triggers of **pollSCM** when a new change is pushed into the **dev** branch.
1. Ensure you have a npm build script, or customize the way you build in the automation code.
1. Ensure you have a npm test script which returns zero for success, and/or change the test commands.

### Customize CD pipeline

Perform the following steps to customize the CD pipeline:

1. Change the CD flow. We default to use the triggers of `pollSCM` when a new change is pushed into the `main` branch.
1. Change the build scripts if necessary.
1. Remove the test scripts if you don't have tests.

## Get started guide for other platforms

You can follow the listed pre-defined example bash scripts to build and customize CI or CD pipelines on other platforms:

* [CI Scripts](https://github.com/OfficeDev/TeamsFx/blob/main/docs/cicd_insider/others-script-ci-template.sh)
* [CD Scripts](https://github.com/OfficeDev/TeamsFx/blob/main/docs/cicd_insider/others-script-cd-template.sh)

The scripts are based on a cross-platform TeamsFx command line tool [TeamsFx-CLI](https://www.npmjs.com/package/@microsoft/teamsfx-cli). You can install it with `npm install -g @microsoft/teamsfx-cli` and follow the [documentation](https://github.com/OfficeDev/TeamsFx/blob/dev/docs/cli/user-manual.md) to customize the scripts.

> [!NOTE]
>
> * To enable `@microsoft/teamsfx-cli` running in CI mode, turn on `CI_ENABLED` by `export CI_ENABLED=true`. In CI mode, `@microsoft/teamsfx-cli` is friendly for CI or CD.
> * To enable `@microsoft/teamsfx-cli` running in the non-interactive mode, set a global config with command: `teamsfx config set -g interactive false`. In the non-interactive mode, `@microsoft/teamsfx-cli` does not prompt for inputs.

Ensure to set Azure and Microsoft 365 credentials in your environment variables safely. For example if you are using GitHub as your source code repository. For more information, see [Github Secrets](https://docs.github.com/en/actions/reference/encrypted-secrets).

## Other tips and guides
### Create Azure service principals

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

### Publish Teams app using Teams Developer Portal

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
