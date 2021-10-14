---
title: Create your first Teams bot app
author: adrianhall
description: Create a bot for Microsoft Teams using the Teams Toolkit.
ms.author: adhal
ms.date: 05/27/2021
ms.topic: quickstart
ms.localizationpriority: none
---

# Create your first Teams bot app

You've built your tab app. Now let's create your first bot app.
 
The bot capability of a Teams app creates a chatbot or a conversational bot. You use it to run simple and automated tasks, like providing customer service. A bot talks with a web service and helps you use its offerings. You can get weather forecast, make reservations, or any other service offered using a conversational bot.

As you've already prepared for creating these apps, you can set up a new Teams project for creating the bot app.

:::image type="content" source="../assets/images/get-started/app-roadmap/roadmap-p2.png" alt-text="Image showing phase 2 of building an app." border="false":::

In this tutorial, you'll learn:

1. [How to set up a new Bot project with Teams Toolkit.](#create-your-bot-project)
1. [About the directory structure of your app project.](#take-a-tour-of-the-source-code)

> [!IMPORTANT]
> Currently, bots are available in Government Community Cloud (GCC) but not available in GCC-High and Department of Defense (DOD).

## Create your bot project

If the prerequisites are in place, let's begin!

> [!NOTE]
> The Visual Studio Code UI shown is from Mac. It may differ depending on whether your operating system is Windows or Linux.

# [Visual Studio Code](#tab/vscode)

1. Open Visual Studio Code.
1. Select the Teams Toolkit :::image type="icon" source="../assets/images/teams-toolkit-v2/teams-toolkit-sidebar-icon.png"::: icon in the Visual Studio Code sidebar.

1. Select **Create a new Teams app**. The UI may look different, depending on your operating system.

   :::image type="content" source="../assets/images/teams-toolkit-v2/first-tab/create-project.png" alt-text="Location of the Create New Project link in the Teams Toolkit sidebar." border="false":::

1. Select **Create a new Teams app** to create an app using the Teams Toolkit.

   :::image type="content" source="../assets/images/teams-toolkit-v2/first-bot/create-new-app.png" alt-text="Wizard start for Create New Project" border="false":::

1. Select **Bot**, deselect **Tab**, and select **OK**.

   :::image type="content" source="../assets/images/teams-toolkit-v2/first-bot/select-capabilities.png" alt-text="Screenshot showing how to add capabilities to your new app." border="false":::

1. Select **Create a new bot registration** in the **Bot registration** section.

   :::image type="content" source="../assets/images/teams-toolkit-v2/first-bot/create-bot-registration.png" alt-text="Select create a new bot registration" border="false":::

1. Select **JavaScript** in the **Programming Language** section.

    :::image type="content" source="../assets/images/teams-toolkit-v2/first-bot/select-language.png" alt-text="Screenshot showing how to select the programming language." border="false":::

1. Select a workspace folder. Teams Toolkit creates a folder in your workspace folder for the app project.

1. Enter a suitable name for your app, like `hellobot`. Ensure that your app's name is alphanumeric. Select **Enter** to continue.

   :::image type="content" source="../assets/images/teams-toolkit-v2/first-bot/enter-name.png" alt-text="Screenshot showing where to enter the app name." border="false":::

    Your Teams app with a Bot capability is created in a few seconds.

    :::image type="content" source="../assets/images/teams-toolkit-v2/bot-app-created-r.png" alt-text="Screenshot showing the app created." border="false":::

# [Command line](#tab/cli)

Use the `teamsfx` CLI to create your first project.  Start from the folder where you want to create the project folder.

``` bash
teamsfx new
```

You can use the CLI to create a new Teams app. The CLI leads you through a series of questions. Every question includes an instruction on answering it.

For example, use arrow keys to select an option. After you make the choice, select **Enter** to confirm it.

1. Select **Create a new Teams app**.
1. Select **Bot** and deselect **Tab**.
1. Select **Create a new bot registration**.
1. Select **JavaScript** as the programming language.
1. Select **Enter** to select the default workspace folder.
1. Enter a suitable name for your app, like `HelloBot`.  The name of the app must consist only of alphanumeric characters.

After you've answered all questions, your project is created.

---

## Take a tour of the source code

After scaffolding is done, view the project directories and files in the Explorer area of Visual Studio Code.

:::image type="content" source="../assets/images/teams-toolkit-v2/first-bot/bot-code-tree.png" alt-text="Project files scaffolded for bot in Visual Studio Code." border="false":::

Among other items in this directory structure, the Toolkit maintains:
- `bot`: The bot code is stored in the `bot` directory.
-  `bot/teamsBot.js`: The `bot/teamsBot.js` is the main entry point for the bot.

> [!Tip]
> Familiarize yourself with bots outside of Teams before you integrate your first bot within Teams.  For more information about bots, see the [Azure Bot Service](/azure/bot-service/bot-builder-basics?view=azure-bot-service-4.0&preserve-view=true) tutorials.

| &nbsp; | &nbsp; |
|:--- | ---:|
|[:::image type="icon" source="../assets/images/get-started/app-roadmap/back.png":::](build-javascript-tab-app.md) | [:::image type="icon" source="../assets/images/get-started/app-roadmap/next-build.png":::](build-javascript-bot-app.md)|
|