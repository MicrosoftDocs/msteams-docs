---
title: Get started - Build a messaging extension
author: girliemac
description: Quickly create a Microsoft Teams messaging extension using the Microsoft Teams Toolkit.
ms.author: timura
ms.date: 03/25/2021
ms.topic: tutorial
---
# Build a messaging extension for Microsoft Teams

There are two types of Teams *messaging extensions*: [Search commands](../messaging-extensions/how-to/search-commands/define-search-command.md) and [action commands](../messaging-extensions/how-to/action-commands/define-action-command.md).

This tutorial teaches you to create a *search command* (also known as a *search-based messaging extension*), which is a shortcut for finding external content and sharing it in Teams. Users can access search commands from the Teams compose or command box.

**This tutorial teaches you to:**

* Create an app project and messaging extension bot using the Microsoft Teams Toolkit for Visual Studio Code.
* Understand the app configurations and the scaffolding relevant to messaging extensions.
* Host an app locally.
* Configure the bot for your messaging extension.
* Sideload and test a messaging extension in Teams.

## Prerequisites

Ensure that you understand how to set up and build Teams app before you begin to build a channel or group tab. For more information, see [Create your first Microsoft Teams Hello World app](../build-your-first-app/build-and-run.md).

## 1. Create your app project

The Microsoft Teams Toolkit helps you set up the following components for your messaging extension:

* **App configurations and scaffolding** relevant to messaging extensions
* **Bot** for your messaging extension that's automatically registered with the Microsoft Azure Bot Service

**To create your app project:**

1. In Visual Studio Code, select **Microsoft Teams** :::image type="icon" source="../assets/icons/vsc-toolkit.png"::: on the left Activity Bar and choose **Create a new Teams app**.
1. When prompted, sign in with your Microsoft 365 development account.
1. On the **Select project** screen, at **Messaging Extensions** > **Search**, click **JS (JavaScript)**. 
1. Enter a name for your Teams app. This is the default name for your app and also the name of the app project directory on your local machine.
1. Select **Create a new Bot** then click **Create Bot Registration** button. If successful, your new bot will have a *Registered* status. Now your bot is automatically registered with the Microsoft Azure Bot Service. 
1. Select **Finish** at the bottom of the screen to configure your project and save your project on your local machine.

## 2. Understand your app project components

Much of the app configurations and scaffolding are set up automatically when you create your project with the Teams Toolkit.

* App configurations: To view or update your messaging extension's configurations, select **App Studio** in the toolkit and go to **Messaging extensions**.
* App scaffolding: The app scaffolding provides a `botActivityHandler.js` file, located in the root directory of your project, for handling how your messaging extension (or technically, the [messaging extension's bot](#4-configure-the-bot-for-your-messaging-extension)) responds to search queries in Teams.

## 3. Set up a secure tunnel to your app

For testing purposes, let's host your messaging extension on a local web server (port 3978). You are going to use [ngrok](https://ngrok.com/download) to set up a secure localhost tunneling. Read [Build a bot for Microsoft Teams](../build-your-first-app/build-bot.md#3-set-up-a-secure-tunnel-to-your-app) for details. 

1. If you haven't already, install [ngrok](https://ngrok.com/download).
1. In a terminal, run `ngrok http -host-header=rewrite 3978`.
1. Copy the HTTPS URL in the output (for example, `https://468b9ab725e9.ngrok.io`) since Teams requires HTTPS connections.

   With this URL, Teams (which requires HTTPS connections) will be able tunnel to where you're hosting your app (`localhost` on port 3978).

## 4. Configure the bot for your messaging extension

Messaging extensions rely on bots to send and process user requests from Teams to your hosted service. The bot must be registered with the Azure Bot Service, which was done when you set up your app using the Teams Toolkit.

You still must specify a bot endpoint URL to receive and process search queries in your messaging extension. Typically, the URL looks like `https://HOST_URL/api/messages`. You can configure this quickly in the toolkit.

1. In Visual Studio Code, select **Microsoft Teams** :::image type="icon" source="../assets/icons/vsc-toolkit.png"::: on the left Activity Bar and choose **Open Microsoft Teams Toolkit**.
1. Go to **Bots > Existing bot registrations** and select the bot you created during setup.
1. In the **Bot endpoint address** field, enter the ngrok URL (for example, `https://468b9ab725e9.ngrok.io`) where you're hosting the bot and append `/api/messages` to it.

   Your bot will be able to handle queries in your messaging extension.

## 5. Build and run your app

You've set up a URL to host your messaging extension and configured it to handle searches. It's time to get your app up and running.

1. Open terminal and go to the root directory of your app project
1. Run `npm install`.
1. Run `npm start`.

   If successful, you see the following message indicating your messaging extension service is listening for activity at your `localhost`:

   `Bot/ME service listening at http://localhost:3978`

## 6. Sideload your messaging extension in Teams

With your messaging extension running, you can install it in Teams.

> [!TIP]
> If you haven't sideloaded a Teams app before and run into issues, follow these [instructions](../build-your-first-app/build-and-run.md#4-sideload-your-app-in-teams).

1. In Visual Studio Code, select the **F5** key to launch a Teams web client.
1. In the app install dialog, select **Add for me**.

## 7. Test your messaging extension

Learn how messaging extensions work in a Teams chat.

1. Start a new chat. In the compose box, select **More** :::image type="icon" source="../assets/icons/teams-client-more.png"::: and choose the messaging extension app you just sideloaded.
1. Try searching for something (for example, **Tickets**). If your app is working, you'll see sample search results (you can add your own later).

   :::image type="content" source="../assets/images/build-your-first-app/me-teams-test.png" alt-text="A screenshot showing how a search-based messaging extension is used in the Teams compose box.":::

## Troubleshooting

The following information may help if you had issues completing this tutorial.

**Bot isn't connected to Teams**

If you installed your app but it isn't working, make sure the messaging extension's bot is [connected to the Azure Bot Service's Teams *channel*](https://docs.microsoft.com/azure/bot-service/channel-connect-teams?view=azure-bot-service-4.0&preserve-view=true).

It's important to understand that this isn't the same as a channel in Teams. In this case, a channel is how the Azure Bot Service connects your bot to Teams or another [supported Microsoft or third-party communications app](https://docs.microsoft.com/azure/bot-service/bot-service-channels-reference?view=azure-bot-service-4.0&preserve-view=true).

## See also

* [Teams compose or command box](../messaging-extensions/what-are-messaging-extensions.md) 
* [Include a link unfurling feature](../messaging-extensions/how-to/link-unfurling.md)
* [Design guidelines](../messaging-extensions/design/messaging-extension-design.md) 
* [production-ready UI templates](../concepts/design/design-teams-app-ui-templates.md) 
* [Add authentication](../messaging-extensions/how-to/add-authentication.md)
* [Create an action-based messaging extension](../messaging-extensions/how-to/action-commands/define-action-command.md)
* [Microsoft Bot Framework](https://dev.botframework.com/)

## Next steps

> [!div class="nextstepaction"]
> [Define search commands](../messaging-extensions/how-to/search-commands/define-search-command.md)

> [!div class="nextstepaction"]
> [Respond to users' searches](../messaging-extensions/how-to/search-commands/respond-to-search.md)