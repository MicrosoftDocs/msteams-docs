---
title: Get started - Hello World
author: adrianhall
description: Quickly create a Microsoft Teams tab app using the Microsoft Teams Toolkit and JavaScript.
ms.author: adhal
ms.date: 05/27/2021
ms.topic: quickstart
ms.localizationpriority: none
---

# Create your first Microsoft Teams app

Start Microsoft Teams app development by creating your first app, "Hello World!". This app uses the Tab capability.

:::image type="content" source="../assets/images/get-started/app-roadmap/roadmap-p2.png" alt-text="Image showing phase 2 of building an app." border="false":::

In this page, you'll learn:
- [How to set up a new project with Teams Toolkit](#create-your-tab-project)
- [About the directory structure of your app](#take-a-tour-of-the-source-code)

## Create your tab project

If the prerequisites are in place, let's begin!

> [!NOTE]
> The Visual Studio Code UI shown is from Mac. It may differ depending on whether your operating system is Windows or Linux.

# [Visual Studio Code](#tab/vsc)

1. Open Visual Studio Code.
1. Select the Teams Toolkit :::image type="icon" source="../assets/images/teams-toolkit-v2/teams-toolkit-sidebar-icon.png"::: icon in the Visual Studio Code sidebar.

1. Select **Create a new Teams app**.

   :::image type="content" source="../assets/images/teams-toolkit-v2/first-tab/create-project.png" alt-text="Location of the Create New Project link in the Teams Toolkit sidebar." border="false":::

1. Select **Create a new Teams app** to create an app using the Teams Toolkit.

    :::image type="content" source="../assets/images/teams-toolkit-v2/first-bot/create-new-app.png" alt-text="Wizard start for Create New Project" border="false":::

1. Ensure that **Tab UI-based app** is selected as the capability that you want to build in your app, and select **OK**.

    :::image type="content" source="../assets/images/teams-toolkit-v2/first-tab/select-capabilities-tab.png" alt-text="Select App Capability" border="false":::

1. Select **Azure** as the Frontend hosting type.

    :::image type="content" source="../assets/images/teams-toolkit-v2/first-tab/create-project-hosting.png" alt-text="Select Hosting Type" border="false":::

    If you want to host your app on SharePoint, you can select SharePoint Framework (SPFx) in this option.

1. Select **OK** to continue. You don't need other cloud resources for this tutorial.

    :::image type="content" source="../assets/images/teams-toolkit-v2/first-tab/create-project-cloud-resources.png" alt-text="Cloud Resources" border="false":::

1. Select **JavaScript** as the programming language.

    :::image type="content" source="../assets/images/teams-toolkit-v2/first-bot/select-language.png" alt-text="Screenshot showing how to select the programming language." border="false":::

1. Select a workspace folder for the app. Teams Toolkit creates the app's directory structure in this workspace for your project.

1. Enter `HelloWorld` as the application name. Ensure that you use only alphanumeric characters. Select **Enter** to continue.

    :::image type="content" source="../assets/images/teams-toolkit-v2/first-tab/create-project-name.png" alt-text="Screenshot showing where to enter the app name." border="false":::

    The Teams app is created in a few seconds.

    :::image type="content" source="../assets/images/teams-toolkit-v2/app-created.png" alt-text="Screenshot showing the app created." border="false":::

<details>
<summary>A quick recap of creating a Teams app.</summary>
Watch this short video for a quick recap of creating a Teams app.

![Create a Teams app](~/assets/videos/react-sample-video.gif)
</details>

# [Command line](#tab/cli)

Use the `teamsfx` CLI to create your first project. Start from the folder where you want to create the project folder.

``` bash
teamsfx new
```

You can use the CLI to create a new Teams app. The CLI leads you through a series of questions. Every question includes an instruction on answering it.

For example, use arrow keys to select an option. After you make the choice, select **Enter** to confirm it.

1. Select **Create a new Teams app**.
1. Select the **Tab** capability.
1. Select **Azure** frontend hosting.
1. Don't select any cloud resources.
1. Select **JavaScript** as the programming language.
1. Press **Enter** to select the default workspace folder.
1. Enter `helloworld` as the name for your app. The name of the app must have only alphanumeric characters.

   After you've answered all the questions, your project is created.

---

## Take a tour of the source code

Teams Toolkit provides all components for building an app. After creating the project, you can view the project folders and files in the Explorer area of Visual Studio Code.

:::image type="content" source="../assets/images/teams-toolkit-v2/hw-folder-structure.png" alt-text="Project files scaffolded for the app with Tab capability in Visual Studio Code.":::

Although you're free to choose any UI framework you want (or not to use any), this sample template code provides a scaffolding with React components.

Among other items in this directory structure, the Toolkit maintains:

- `.fx`: The state for your app in this folder.
- `appPackage`: The app icons in the `appPackage` folder. The icons are `color.png` and `outline.png`.
- `manifest.source.json`: The app manifest for publishing to the Developer Portal for Teams in `manifest.source.json`.
- `settings.json`: The app settings, which you selected during project creation, in `settings.json`.
- The code for the Tab capability in the `Tabs` folder. Some of the important files in this folder are:

  - `tabs/src/index.jsx` is the front-end app's entry point, where the main `App` component is rendered with `ReactDOM.render()`.
  - `tabs/src/components/App.jsx` handles URL routing in the app. It calls the [Microsoft Teams JavaScript client SDK](../tabs/how-to/using-teams-client-sdk.md) to establish communication between the app and Teams.
  - `tabs/src/components/Tab.jsx` contains the code to implement the UI of your app.
  - `tabs/src/components/TabConfig.jsx` contains the code to implement the UI that configures your app.
  - This folder also holds the code for tabs needed at runtime. Some of them are the privacy notice, terms of use, and configuration tabs.

When you add the cloud functionality, Teams Toolkit adds the necessary folders to the project. The `api` folder holds the code to any Azure Functions you write.

| **<<** | **>>** |
|:--- | ---:|
| **Back** : [1. Prepare to build your app](prerequisites.md) | [3. Build your first tab app](build-javascript-tab-app.md) : **Next**|
|

## See also

- [Tutorials Overview](code-samples.md)
- [Create a conversational bot app](first-app-bot.md)
- [Create a messaging extension](first-message-extension.md)
- [Code Samples](https://github.com/OfficeDev/Microsoft-Teams-Samples)
