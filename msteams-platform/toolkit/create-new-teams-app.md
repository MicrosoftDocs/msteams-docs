---
title: Create a new Teams app
author: zyxiaoyuer
description:  Create new Teams app using Toolkit
ms.author: surbhigupta
ms.localizationpriority: high
ms.topic: overview
ms.date: 03/30/2022
---

# Teams Toolkit in Integrated Development Environments

Teams Toolkit brings together all the tools needed for building a Teams app in one place. You can use the Teams Toolkit extension in Visual Studio Code, Visual Studio, or Teams CLI to create apps in Teams.

> [!NOTE]
> Currently, this feature is available in **public developer preview** only.

# [Visual Studio Code](#tab/VisualStudioCode)

#### Create a new Teams app using Toolkit**

Install Teams Toolkit extension in Visual Studio Code and to view the Teams Toolkit icon in the sidebar :::image type="icon" source="../assets/images/teams-toolkit-v2/manual/toolkit-icon.png" border="false":::. To start creating a new app select from any one of the following options:

* [Create a new Teams app](create-new-project.md#create-a-new-teams-app)
* [View samples](create-new-project.md#create-a-new-teams-app-using-view-samples)

#### Steps to create a new Teams app

1. Open latest version of Visual Studio Code.
1. Select Teams Toolkit icon in the Visual Studio Code sidebar and select any one option.
1. Select **Create a new Teams app**.
1. Select from the available capabilities tab, bot, messaging extension, or a tab using SharePoint Framework (SPFx).
1. Select at least one option to start creating the Teams app.

   :::image type="content" source="../assets/images/teams-toolkit-v2/manual/create-new-teams-app.png" alt-text="Create a new Teams app":::

#### Steps to create a new Teams app using samples

You can create a new app by exploring **View samples** and selecting an existing sample. The selected sample may already have some functionality, for example a to-do list with an Azure backend, or an integration with the Microsoft Graph Toolkit.

 1. Open **Teams Toolkit** from Visual Studio Code.
 1. Select **DEVELOPMENT** section in Treeview.
 1. Select **View samples**. The sample gallery appears as shown in the following image:

    :::image type="content" source="../assets/images/teams-toolkit-v2/view-samples.png" alt-text="View samples":::

    :::image type="content" source="../assets/images/teams-toolkit-v2/manual/view-samples.png" alt-text="View sample gallary":::

You can explore and download samples and either run your app locally or remotely to preview in Teams web client. Follow the instructions for each sample, or select **View on GitHub** to open the sample within the `TeamsFx Samples repository` and browse the source code.

For more information, see [Create a new Teams Tab app (React)](/microsoftteams/platform/sbs-gs-javascript?tabs=vscode%2Cvsc%2Cviscode%2Cvcode&tutorial-step=2).

# [Visual Studio](#tab/VisualStudio)

#### Teams Toolkit for Visual Studio

Teams Toolkit's extension for Visual Studio makes it easy to create new projects for Teams, automatically setup apps in Teams Developer Portal, run and debug in Teams, configure cloud hosting, and use [TeamsFx](https://github.com/OfficeDev/teamsfx) from your IDE.

### Install Teams Toolkit for Visual Studio

>[!NOTE]
> As a prerequisite, ensure you use Visual Studio 2022 17.2 or newer versions to follow the instructions below.

1. If you have Visual Studio 2022 17.2 Preview 2 installed, skip to the next step.
2. Open the Visual Studio Installer.
3. Select **Modify** for your existing VS 2022 Preview installation.
4. Select the **ASP.NET and web development** workload.
5. On the right, expand the **ASP.NET and web development** section and select **Microsoft Teams development tools** in the Optional list of components.
6. Select **Install** or **Modify** in the Visual Studio Installer to complete the installation process.

:::image type="content" source="../assets/images/teams-toolkit-v2/manual/visual-studio-create-project/modify-vs-installer.PNG" alt-text="modify vs 2022 to add ms teams":::

## Get started with a new project

Teams Toolkit project templates provide all code, files, and configuration you need to get started with a Teams app project.

The Microsoft Teams App project template allows you to specify a Microsoft 365 account that is required to automatically register and configure your new Teams app.

> [!NOTE]
> If you do not have a Microsoft 365 account, you can sign up for a [Microsoft 365 Developer Program](https://developer.microsoft.com/microsoft-365/dev-program) subscription. It's free for 90 days and renews as long as you are using it for development activity. If you have a Visual Studio Enterprise or Professional subscription, both programs include a free Microsoft 365 [developer subscription](https://aka.ms/MyVisualStudioBenefits), active for the life of your Visual Studio subscription. For more information, see [set up a Microsoft 365 developer subscription](/office/developer-program/office-365-developer-program-get-started).

1. Open the latest version Visual Studio.
1. In the start window, choose **Create a new project**. 
     
    :::image type="content" source="../assets/images/teams-toolkit-v2/manual/visual-studio-create-project/create-new-project.png" alt-text="Create project using Visual Studio" border="true":::
 
1. In the **Search for templates** box, enter Microsoft Teams App.
1. Select the **Microsoft Teams App** template and select **Next**.
1. In the **Configure your new project** window, type or enter _HelloWorld_ in the **Project name** box. Then, select **Create**.
1. In the **Create a new Teams application** window, choose or sign in to a Microsoft 365 account using the **Choose an account** selector. Then, select **Create**.

Use Teams Toolkit to create your first project. The toolkit takes you through a series of pages to create and configure your Teams app project:

Creating a new project page: You select the project type.
Configure your new project page: You enter the project details.
Create a new Teams application page: You select the Teams app capabilities and the Microsoft 365 credentials.
![Creating a new Microsoft Teams App project in Visual Studio.](images/teams-toolkit-vs-new-project.png)

Visual Studio opens up the new project and Teams Toolkit setup you new project in Teams Developer Portal. The project will be added for the Teams organization linked to the Microsoft 365 account you chose in the steps above and create a new Azure Active Directory registration. This is required for the app to run in Teams.

 For Teams app development, similar to Teams Toolkit for Visual Studio, you can use [CLI tool](https://github.com/OfficeDev/TeamsFx/blob/dev/docs/cli/user-manual.md), which consists of Toolkit `teamsfx`.

# [TeamsFx Command Line Interface](#tab/TeamsFxCommandlineinterface)

## TeamsFx command line interface

TeamsFx CLI is a text-based command line interface that accelerates Teams application development. It aims to provide keyboard centric experience while building Teams applications. 

## Get Started

Install `teamsfx-cli` from `npm` and run `teamsfx -h` to check all available commands:

```bash
  npm install -g @microsoft/teamsfx-cli
  teamsfx -h
```

## Supported commands

| Command | Description |
|----------------|-------------|
| `teamsfx new`| Create new Teams application.|
| `teamsfx account`| Manage cloud service accounts. The supported cloud services are 'Azure' and 'Microsoft 365'. |
| `teamsfx env` | Manage environments. |
| `teamsfx capability`| Add new capabilities to the current application.|
| `teamsfx resource`  | Manage the resources in the current application.|
| `teamsfx provision` | Provision cloud resources in the current application.|
| `teamsfx deploy` | Deploy the current application.  |
| `teamsfx package` | Build your Teams app into package for publishing.|
| `teamsfx validate` | Validate the current application.|
| `teamsfx publish` | Publish the app to Teams.|
| `teamsfx preview` | Preview the current application. |
| `teamsfx config`  | Manage the configuration data. |
| `teamsfx permission`| Collaborate with other developers in same project.|

## `teamsfx new`

By default, `teamsfx new` goes into interactive mode and guides you through the process of creating a new Teams application. You can also work with non-interactive mode by setting `--interactive` flag to `false`.

| `teamsFx new` Command | Description |
|:----------------  |:-------------|
| `teamsfx new template <template-name>`     | Create an app from an existing template |
| `teamsfx new template list`     | List all the available templates |

### Parameters for `teamsfx new`

| Parameter | Requirement | Description |
|:---------------- |:-------------|:-------------|
|`--app-name` | Yes| Name of your Teams application.|
|`--interactive`| No | Select the options interactively. The options are `true` and `false` and default value is `true`.|
|`--capabilities`| No| Choose Teams application capabilities, the multiple options are `tab`, `bot`, `messaging-extension` and `tab-spfx`. The default value is `tab`.|
|`--programming-language`| No| Programming language for the project. The options are `javascript` or `typescript` and default value is `javascript`.|
|`--folder`| No | Project directory. A sub folder with your app name is created under this directory. The default value is `./`.|
|`--spfx-framework-type`| No| Applicable if `Tab(SPfx)` capability is selected. Frontend Framework. The options are `none` and `react`, and default value is `none`.|
|`--spfx-web part-name`| No | Applicable if `Tab(SPfx)` capability is selected. The default value is "helloworld".|
|`--spfx-web part-desp`| No | Applicable if `Tab(SPfx)` capability is selected. The default value is "helloworld description". |
|`--azure-resources`| No| Applicable if contains `tab` capability. Add Azure resources to your project. The multiple options are `sql` (Azure SQL Database) and `function` (Azure Functions). |



## See also

* [Provision cloud resources](provision.md)
* [Deploy Teams app to the cloud](deploy.md)
* [Publish your Teams app](TeamsFx-collaboration.md)
* [Manage multiple environments](TeamsFx-multi-env.md)
* [Collaborate with other developers on Teams project](TeamsFx-collaboration.md)