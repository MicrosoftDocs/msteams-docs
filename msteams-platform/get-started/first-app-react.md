---
title: Get started - Build your first Teams app with React
author: adrianhall
description: Quickly create a Microsoft Teams app that displays a "Hello, World!" message using the Microsoft Teams Toolkit and React.
ms.author: adhal
ms.date: 05/27/2021
ms.topic: quickstart
ms.localizationpriority: none
---

# Build your first Microsoft Teams app - Hello world

Start Microsoft Teams development by building your first app - "Hello, world!" with a tab, a bot, and a message extension capability.  

In this tutorial, you'll learn: 

- how to set up a new project with Teams Toolkit.
- the structure of a basic tab app and how it's built with JavaScript using React.


## Create your project

If the [prerequisites](prerequisites.md) are in place, let's begin!

# [Visual Studio Code](#tab/vsc)

1. Select the Teams Toolkit :::image type="icon" source="../assets/images/teams-toolkit-v2/teams-toolkit-sidebar-icon.png"::: icon in the Visual Studio Code sidebar.

1. Select **Create a new Teams app**. The UI may look different, depending on your operating system.
   :::image type="content" source="../assets/images/teams-toolkit-v2/all-capabilities/hwa-create-app.png" alt-text="Location of the Create New Project link in the Teams Toolkit sidebar." border="false":::

1. Select **Create a new Teams app** from the dropdown menu to create an app using the Teams Toolkit.

    :::image type="content" source="../assets/images/teams-toolkit-v2/all-capabilities/hwa-create-new-app.png" alt-text="Wizard start for Create New Project" border="false":::

    >If you build an app with only Tab capability, Teams Toolkit asks for your Frontend Hosting options. You can choose between Azure and SharePoint (SPFx).

1. Select all capabilities, and select **OK**.

    :::image type="content" source="../assets/images/teams-toolkit-v2/all-capabilities/hwa-select-capabilities.png" alt-text="Select App Capability" border="false":::

1. Select **OK** to continue. You don't need other cloud resources for this tutorial.
    :::image type="content" source="../assets/images/teams-toolkit-v2/all-capabilities/hwa-cloud-resources.png" alt-text="Cloud Resources" border="false":::

1. Select **Create a new bot registration** in the **Bot registration** section.
    :::image type="content" source="../assets/images/teams-toolkit-v2/all-capabilities/hwa-bot-registration.png" alt-text="Create bot registration" border="false":::
    
    > [!NOTE] 
    > This step appears only when you select the Bot and Message Extension capability.

1. Select **JavaScript** as the programming language.

    :::image type="content" source="../assets/images/teams-toolkit-v2/all-capabilities/hwa-programming-language.png" alt-text="Screenshot showing how to select the programming language." border="false":::

1. Select a workspace folder for the app. The Toolkit creates a folder in this workspace for your project.

1. Enter `HelloWorld` as the application name. Ensure that you use only alphanumeric characters. Select **Enter** to continue.

    :::image type="content" source="../assets/images/teams-toolkit-v2/all-capabilities/hwa-app-name.png" alt-text="Screenshot showing where to enter the app name." border="false":::

    The Teams app is created in a few seconds.

    

# [Command line](#tab/cli)

Use the `teamsfx` CLI to create your first project. Start from the folder where you want to create the project folder.

``` bash
teamsfx new
```

You can use the CLI to create a new Teams app. The CLI leads you through a series of questions. Every question includes an instruction on answering it.

For example, Use arrow keys to select an option. After you make the choice, select **Enter** to confirm it.

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

After project creation, you have the components to build a basic personal app. You can view the project directories and files in the Explorer area of Visual Studio Code.

:::image type="content" source="../assets/images/teams-toolkit-v2/all-capabilities/hwa-folders.png" alt-text="Project files scaffolded for the app with Tab capability in Visual Studio Code.":::

You can find the code for the tab capability scaffolded in the **Tab** folder. Although you're free to choose any UI framework you want (or not to use any), this sample template code provides scaffolding with React components.

Among other items in this directory, the Toolkit maintains:

- The state for your app in the `.fx` directory. 
- The app icons in the `appPackage` directory. The icons are `color.png` and `outline.png`.
- The app manifest for publishing to the Developer Portal for Teams in `manifest.source.json`.
- The app settings, which you selected during project creation, in `settings.json`.
- The code for the Tab capability in the `tabs` directory. The important files in this directory are:

  - `tabs/src/index.jsx` is the front-end app's entry point, where the main `App` component is rendered with `ReactDOM.render()`.
  - `tabs/src/components/App.jsx` handles URL routing in the app. It calls the [Microsoft Teams JavaScript client SDK](../tabs/how-to/using-teams-client-sdk.md) to establish communication between the app and Teams.
  - `tabs/src/components/Tab.jsx` contains the code to implement the UI of your app.
  - `tabs/src/components/TabConfig.jsx` contains the code to implement the UI that configures your app.
  - This directory also holds the code for tabs needed at runtime. Some of them are the privacy notice, terms of use, and configuration tabs.
  - The bot code is stored in the bot directory. The bot/teamsBot.js is the main entry point for the bot.

When you add the cloud functionality, the Teams Toolkit adds the necessary directories to the project. The `api` directory holds the code to any Azure Functions you write.




## Next step

> [!div class="nextstepaction"]
> [Build and test your app](../get-started/build-and-test-app.md)


## See also

* [Tutorials Overview](code-samples.md)
* [Create a conversational bot app](first-app-bot.md)
* [Create a messaging extension](first-message-extension.md)
* [Code Samples](https://github.com/OfficeDev/Microsoft-Teams-Samples)