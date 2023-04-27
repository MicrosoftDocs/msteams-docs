---
title: CI/CD templates v4
author: MuyangAmigo
description:  In this module, learn how to use CI/CD pipeline templates in GitHub, Azure DevOps, and Jenkins for Teams Application DevelopersCI/CD templates using Teams toolkit v4.
ms.author: ruhe
ms.localizationpriority: medium
ms.topic: overview
ms.date: 04/20/2022
---

# Set up CI/CD pipelines v4

TeamsFx helps to automate your development workflow while building Teams application. The following are the tools and templates you can use to set up CI/CD pipelines, create workflow templates, and customize CI/CD workflow with GitHub, Azure DevOps, Jenkins, and other platforms. To provision and deploy resources, you can create Azure service principals and publish the Teams app using Teams Developer Portal. To publish Teams app manually, you may leverage [Developer Portal for Teams](https://dev.teams.microsoft.com/home).

|Tools and Templates | Description |
|---|---|
|[TeamsFx-CLI-Action](https://github.com/OfficeDev/teamsfx-cli-action)|GitHub action that integrates with TeamsFx CLI.|
|[Teams Toolkit in Visual Studio Code](https://marketplace.visualstudio.com/items?itemName=TeamsDevApp.ms-teams-vscode-extension)| Visual Studio Code extension that helps you to develop Teams app and automation workflows for GitHub, Azure DevOps, and Jenkins. |
|[TeamsFx CLI](https://www.npmjs.com/package/@microsoft/teamsfx-cli) | Command Line tool that helps you to develop Teams app and automation workflows for GitHub, Azure DevOps, and Jenkins.|
|[script-ci-template.sh](https://github.com/OfficeDev/TeamsFx/blob/main/docs/cicd_insider/others-script-ci-template.sh) and [script-cd-template.sh](https://github.com/OfficeDev/TeamsFx/blob/main/docs/cicd_insider/others-script-cd-template.sh)| Script templates for automation outside of GitHub, Azure DevOps, or Jenkins. |

## Set up pipelines

You can set up pipelines with the following platforms:

1. [Set up pipelines with GitHub](#set-up-pipelines-with-github)
1. [Set up pipelines with Azure DevOps](#set-up-pipelines-with-azure-devops)
1. [Set up pipelines with Jenkins](#set-up-pipelines-with-jenkins)
1. [Set up pipelines for other platforms](#set-up-pipelines-for-other-platforms)

## Set up pipelines with GitHub

To set up pipelines with GitHub for CI/CD:

* Create workflow templates.

  * Visual Studio Code
  * TeamsFx CLI

* Customize CI/CD workflow.

### Create workflow templates

You can create the following workflow templates with GitHub:

**Teams Toolkit in Visual Studio Code**

1. Create a new Teams app project using Teams Toolkit.

1. Select **Teams Toolkit** icon :::image type="icon" source="images/api-add-icon-v4.PNG"::: from the left pane.

1. Select **Add features**

   :::image type="content" source="images/add-feature-v4.png" alt-text="Adding feature":::

1. Select **Add CI/CD Workflows**.

   :::image type="content" source="images/toolkit-ci-cd-workflow-v4.png" alt-text="Select CI/CD workflow":::

1. Select an environment from the command prompt.
1. Select **GitHub** as the CI/CD provider.
1. Select at least one template from these options: CI, CD, Provision, or Publish to Teams.
1. Open the template and customize the workflows that fit into your scenarios.
1. Follow the README files under `.github/workflows` to set up the workflow in GitHub.

**TeamsFx CLI**

1. Enter `cd` to your Teams app project directory.
2. Enter `teamsfx add cicd` command to start the interactive command process.
3. Select an environment from the command prompt.
4. Select **GitHub** as the CI/CD provider.
5. Select at least one template from these options: CI, CD, Provision, or Publish to Teams.
7. Open the template and customize the workflows that fit into your scenarios.
8. Follow the README files under `.github/workflows` to set up the workflow in GitHub.

> [!NOTE]
> If you need to add additional workflow templates, you can follow the same procedure to create workflow template in Visual Studio Code or TeamsFx CLI.

### Customize CI/CD workflow

You can change or remove the test scripts to customize CI/CD workflow:

1. By default, the CD workflow is triggered, when new commits are made to the `main` branch.
1. Change the build scripts if necessary.
1. Remove the test scripts as required.

## Set up pipelines with Azure DevOps

To set up pipelines with Azure DevOps for CI/CD:

* Create workflow templates.

  * Visual Studio Code
  * TeamsFx CLI

* Customize CI/CD workflow.

### Create workflow templates

You can create the following workflow templates with Azure DevOps:

**Teams Toolkit in Visual Studio Code**

1. Create a new Teams app project using Teams Toolkit.
1. Select **Teams Toolkit** icon :::image type="icon" source="images/api-add-icon-v4.PNG"::: from the left pane.
1. Select **Add CI/CD Workflows**.
1. Select an environment from the command prompt.
1. Select **Azure DevOps** as CI/CD provider.
1. Select at least one template from these options: CI, CD, Provision, and Publish to Teams.
1. Open the template and customize the workflows that fit into your scenarios.
1. Follow the README files under `.azure/pipelines` to set up the workflow in Azure DevOps.

**TeamsFx CLI**

1. Enter `cd` to your Teams app project directory.
2. Enter `teamsfx add cicd` command to start the interactive command process.
3. Select an environment from the command prompt.
4. Select **Azure DevOps** as CI/CD provider.
5. Select at least one template from these options: CI, CD, Provision, or Publish to Teams.
7. Open the template and customize the workflows that fit into your scenarios.
8. Follow the README files under `.azure/pipelines` to set up the workflow in Azure DevOps.

> [!NOTE]
> If you need to add additional workflow templates, you can follow the same procedure to create workflow template in Visual Studio Code or TeamsFx CLI.

### Customize CI workflow

You can make the following changes for the script or workflow definition:

1. Use npm build script or customize the way you build in the automation code.
1. Use npm test script, which returns zero for success, and change the test commands.

### Customize CD workflow

You can make the following changes for the script or workflow definition:

1. Ensure you have an npm build script or customize the way you build in the automation code.
1. Ensure you have an npm test script, which returns zero for success or change the test commands.

## Set up pipelines with Jenkins

To set up pipelines with Jenkins for CI/CD:

* Create workflow templates.

  * Visual Studio Code
  * TeamsFx CLI

* Customize CI/CD workflow.

### Create workflow templates

You can create the following workflow templates with Jenkins:

**Teams Toolkit in Visual Studio Code**

1. Create a new Teams app project using Teams Toolkit.
1. Select **Teams Toolkit** icon :::image type="icon" source="images/api-add-icon-v4.PNG"::: from the left pane.
1. Select **Add CI/CD Workflows**.
1. Select an environment from the command prompt.
1. Select **Jenkins** as CI/CD provider.
1. Select at least one template from these options: CI, CD, Provision, or Publish to Teams.
1. Open the template and customize the workflows that fit into your scenarios.
1. Follow the README files under `.jenkins/pipelines` to set up the workflow with Jenkins.

**TeamsFx CLI**

1. Enter `cd` to your Teams app project directory.
2. Enter `teamsfx add cicd` command to start the interactive command process.
3. Select an environment from the command prompt.
4. Select **Jenkins** as CI/CD provider.
5. Select at least one template from these options: CI, CD, Provision, or Publish to Teams.
7. Open the template and customize the workflows that fit into your scenarios.
8. Follow the README files under `.jenkins/pipelines` to set up the workflow with Jenkins.

> [!NOTE]
> If you need to add additional workflow templates, you can follow the same procedure to create workflow template in Visual Studio Code or TeamsFx CLI.

### Customize CI workflow

You can make the following changes to your project:

1. Change how the CI flow is triggered. The default is to use the triggers of **pollSCM** when a new change is pushed into the **dev** branch.
1. Ensure you have an npm build script or customize the way you build in the automation code.
1. Ensure you have an npm test script, which returns zero for success or change the test commands.

### Customize CD workflow

Perform the following steps to customize the CD pipeline:

1. Change the CD flow. The default is to use the triggers of `pollSCM` when a new change is pushed into the `main` branch.
1. Change the build scripts if necessary.
1. Remove the test scripts if you don't have tests.

## Set up pipelines for other platforms

You can follow the predefined listed example bash scripts to build and customize CI/CD pipelines on the other platforms:

* [CI Scripts](https://github.com/OfficeDev/TeamsFx/blob/main/docs/cicd_insider/others-script-ci-template.sh)
* [CD Scripts](https://github.com/OfficeDev/TeamsFx/blob/main/docs/cicd_insider/others-script-cd-template.sh)

The scripts are based on a cross-platform TeamsFx command line tool [TeamsFx-CLI](https://www.npmjs.com/package/@microsoft/teamsfx-cli). You can install it with `npm install -g @microsoft/teamsfx-cli` and follow the [documentation](https://github.com/OfficeDev/TeamsFx/blob/dev/docs/cli/user-manual.md) to customize the scripts.

> [!NOTE]
>
> * To enable `@microsoft/teamsfx-cli` running in CI mode, turn on `CI_ENABLED` by `export CI_ENABLED=true`. In CI mode, `@microsoft/teamsfx-cli` is friendly for CI/CD.
> * To enable `@microsoft/teamsfx-cli` running in the non-interactive mode, set a global config with command: `teamsfx config set -g interactive false`. In the non-interactive mode, `@microsoft/teamsfx-cli` does not prompt for inputs.

Ensure to set up Azure and Microsoft 365 credentials in your environment variables safely. For example, if you're using GitHub as your source code repository, see [GitHub Secrets](https://docs.github.com/en/actions/reference/encrypted-secrets).

## Provision and deploy resources

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
4. Publish your app, select `Publish -> Publish to your org`.

## See also

* [Teams Toolkit Overview](teams-toolkit-fundamentals.md)
* [Quick Start for GitHub Actions](https://docs.github.com/en/actions/quickstart#creating-your-first-workflow)
* [Create your first Azure DevOps Pipeline](/azure/devops/pipelines/create-first-pipeline)
* [Create your first Jenkins Pipeline](https://www.jenkins.io/doc/pipeline/tour/hello-world/)
* [Manage your apps with the Developer Portal for Microsoft Teams](../concepts/build-and-test/teams-developer-portal.md)
