---
title: Create your first Teams messaging extension app
author: adrianhall
description: Create a messaging extension for Microsoft Teams using the Teams Toolkit.
ms.author: adhal
ms.date: 05/20/2021
ms.topic: quickstart
ms.localizationpriority: none
---

# Create your first Teams message extension app

You've built your bot app. Now, let's create your first message extension app.

Message Extension capability lets you interact with a web service. Use the compose area, command box, or a message in Teams client to search and initiate actions in an external system.

There are two types of Teams **messaging extensions**:

- [Search commands](../messaging-extensions/how-to/search-commands/define-search-command.md): You can search external systems. Then, you can insert its results into a message in the form of a card.
- [Action commands](../messaging-extensions/how-to/action-commands/define-action-command.md): You can present your users with a modal popup to collect or display information. Then, you can process their interaction and send information back to Teams.

For this tutorial, we will create a message extension app with a *search command*. You use it to search for external data and insert the results into a message within Teams client.

As you've already prepared for creating these apps, you can set up a new Teams project for creating the message extension app.

:::image type="content" source="../assets/images/get-started/app-roadmap/roadmap-p2.png" alt-text="Image showing phase 2 of building an app." border="false":::

In this tutorial, you'll learn:

1. [How to set up a new Message Extension project with Teams Toolkit.](#create-your-message-extension-project)
1. [About the directory structure of your app project.](#take-a-tour-of-the-source-code)

## Create your Message Extension project

If the prerequisites are in place, let's begin!

> [!NOTE]
> The Visual Studio Code UI shown is from Mac. It may differ depending on whether your operating system is Windows or Linux.

# [Visual Studio Code](#tab/vsc)

1. Open Visual Studio Code.
1. Select the Teams Toolkit :::image type="icon" source="../assets/images/teams-toolkit-v2/teams-toolkit-sidebar-icon.png"::: icon in the Visual Studio Code sidebar.

1. Select **Create New Project** from the left-hand side of the Toolkit.

   :::image type="content" source="../assets/images/teams-toolkit-v2/first-tab/create-project.png" alt-text="Location of the Create New Project link in the Teams Toolkit sidebar." border="false":::

1. Select **Create New Project** to create an app using the Teams Toolkit.

   :::image type="content" source="../assets/images/teams-toolkit-v2/first-bot/create-new-app.png" alt-text="Wizard start for Create New Project" border="false":::

1. Select **Message Extension**, deselect **Tab**, and select **OK**.

   :::image type="content" source="../assets/images/teams-toolkit-v2/first-msgext/select-capabilities-msgext.png" alt-text="Screenshot showing how to add capabilities to your new app." border="false":::

1. Select **Create a new bot registration** in the **Bot registration** section.

   :::image type="content" source="../assets/images/teams-toolkit-v2/first-bot/create-bot-registration.png" alt-text="Select create a new bot registration" border="false":::

   > [!NOTE]
   > Messaging extensions rely on bots to provide a dialog between the user and your code.

1. Select **JavaScript** as the programming language.

    :::image type="content" source="../assets/images/teams-toolkit-v2/first-bot/select-language.png" alt-text="Screenshot showing how to select the programming language." border="false":::

1. Select a workspace folder. A folder is created in your workspace folder for the project.

1. Enter a suitable name for your app. Ensure that the app's name is alphanumeric. Select **Enter** to continue.

   Teams Toolkit creates the app in a few seconds.

    :::image type="content" source="../assets/images/teams-toolkit-v2/first-msgext/hmx-app-created.png" alt-text="Screenshot showing the app created." border="false":::

# [Command line](#tab/cli)

Use the `teamsfx` CLI to create your first project.  Start from the folder where you want to create the project folder.

``` bash
teamsfx new
```

You can use the CLI to create a new Teams app. The CLI leads you through a series of questions. Every question includes an instruction on answering it.

For example, Use arrow keys to select an option. After you make the choice, select **Enter** to confirm it.


1. Select **Create a new Teams app**.
1. Select the **Message Extension** and deselect **Tab**.
1. Select **Create a new bot registration**.
1. Select **JavaScript** as the programming language.
1. Select **Enter** to select the default workspace folder.
1. Enter a suitable name for your app, like `HelloMsgExtn`.  The name of the app must consist only of alphanumeric characters.

   After all the questions have been answered, your project is created.

---

## Take a tour of the source code

A message extension uses the [Bot Framework](https://docs.botframework.com). You use it to interact with your service via a conversation. After scaffolding is done, view the project directories and files in the Explorer area of Visual Studio Code.

:::image type="content" source="../assets/images/teams-toolkit-v2/first-msgext/code-tree.png" alt-text="File layout of a bot project" border="false":::

- `bot`: The bot code is stored in the `bot` directory. 
    - The `bot/messageExtensionBot.js` is the main entry point for the messaging extension.

> [!Tip]
> Familiarize yourself with bots outside of Teams before you integrate your first bot within Teams.  You can find more information about bots by reviewing the [Azure Bot Service](/azure/bot-service/bot-builder-basics?view=azure-bot-service-4.0&preserve-view=true) tutorials.

| **<<** | **>>** |
|:--- | ---:|
| **Back** : [3. Build your first bot app](build-javascript-bot-app.md) | [3. Build your first message extension app](build-javascript-msgex-app.md) : **Next**|
|

## See also

* [Tutorials Overview](code-samples.md) 
* [Create an app using React](first-app-react.md)
* [Create an app using Blazor](first-app-blazor.md)
* [Create an app using SPFx](first-app-spfx.md)
* [Create an app using C# or .NET](get-started-dotnet-app-studio.md)
* [Create an app using Node.js](get-started-nodejs-app-studio.md)
* [Create an app using Yeoman generator](get-started-yeoman.md)
* [Create a conversational bot app](first-app-bot.md)
* [Code Samples](https://github.com/OfficeDev/Microsoft-Teams-Samples)
