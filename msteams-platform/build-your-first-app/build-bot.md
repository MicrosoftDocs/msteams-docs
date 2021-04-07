---
title: Get started - Build a bot
author: heath-hamilton
description: Quickly create a Microsoft Teams bot using the Microsoft Teams Toolkit.
ms.author: lajanuar
ms.date: 11/04/2020
ms.topic: tutorial
---
# Build a bot for Microsoft Teams

This tutorial teaches you to build a basic *bot* app. A bot acts as an intermediary between Teams users and your web service. People can chat with a bot to quickly get information or initiate workflows and tasks performed by your service.

Your workplace created a Teams app that uses tabs to surface important contact information. For example, colleagues have quick access to the help desk phone number. But instead of calling, what if people could contact the help desk using a chatbot? Your boss asks you to look at how quickly you can get a basic conversational bot up and running in Teams.

In this tutorial you will learn how to create an app project and bot using the Microsoft Teams Toolkit for Visual Studio Code. You will also understand some of the app configurations and scaffolding relevant to bots. You will learn to host an app locally, configure a bot for Teams, and sideload and test a bot in Teams.

## Prerequisites

You should have set up your development tenant and have installed the development tools.

## 1. Create your app project

The Microsoft Teams Toolkit helps you to set up the following components for your app:

* **App configurations and scaffolding** relevant to bots
* **Bot** that's automatically registered with the Microsoft Azure Bot Service

> [!TIP]
> If you haven't created a Teams app project before, you might find it helpful build your first teams app before going ahead.

1. In Visual Studio Code, select **Microsoft Teams** :::image type="icon" source="../assets/icons/vsc-toolkit.png"::: on the left Activity Bar and select **Create a new Teams app**.
1. When prompted, sign in with your Microsoft 365 development account.
1. On the **Add capabilities** screen, select **Bot** > **Next**.
1. Enter a name for your Teams app. (This is the default name for your app and also the name of the app project directory on your local machine.)
1. Go to **Configure bot** and select **Create a new Bot** then **Create Bot Registration**. If successful, your new bot will have a **Registered** status.
1. Select **Finish** at the bottom of the screen and choose a location to create your project.

## 2. Understand your app project components

Much of the app configurations and scaffolding are set up automatically when you create your project with the Teams Toolkit. Let's look at the main components for building a bot.

### App configurations

To view or update your bot's configurations, select **App Studio** in the toolkit and go to **Bots**.

### App scaffolding

The app scaffolding provides a `botActivityHandler.js` file, located in the root directory of your project, for handling how your bot processes activities in Teams (for example, how the bot responds to specific messages such as "Hello").

## 3. Set up a secure tunnel to your app

For testing purposes, let's host your app on a local web server (port 3978).

1. If you haven't already, install [ngrok](https://ngrok.com/download).
1. In a terminal, run `ngrok http -host-header=rewrite 3978`.
1. Copy the HTTPS URL in the output (for example, `https://468b9ab725e9.ngrok.io`) since Teams requires HTTPS connections.

With this URL, Teams (which requires HTTPS connections) will be able tunnel to where you're hosting your app (`localhost` on port 3978).

## 4. Configure your bot

To use a bot in Teams, you must register it with the Azure Bot Service. This is done automatically when you set up your app using the Teams Toolkit.

You must still specify an endpoint address to receive and process user messages (i.e., requests) sent to the bot. Typically, the URL looks like `https://HOST_URL/api/messages`. You can configure this quickly in the toolkit.

1. In Visual Studio Code, select **Microsoft Teams** :::image type="icon" source="../assets/icons/vsc-toolkit.png"::: on the left Activity Bar and select **Open Microsoft Teams Toolkit**.
1. Go to **Bots** > **Existing bot registrations** and select the bot you created during setup.
1. In the **Bot endpoint address** field, enter the ngrok URL (for example, `https://468b9ab725e9.ngrok.io`) where you're hosting the bot and append `/api/messages` to it.<br/>
    :::image type="content" source="../assets/images/build-your-first-app/bot-config-endpoint-url.png" alt-text="Illustration showing where you can configure the bot endpoint URL in the Teams Toolkit.":::

Your bot will be able to respond to messages in Teams.

## 5. Build and run your app

You've set up a URL to host your bot and configured it to handle messages. It's time to get your app up and running.

1. In a terminal, go to the root directory of your app project and run `npm install`.
1. Run `npm start`.

If successful, the following message appears indicating your bot is listening for activity at your `localhost`:

`Bot/ME service listening at http://localhost:3978`

## 6. Sideload your bot in Teams

With your bot running, you can install it in Teams.

> [!TIP]
> If you haven't sideloaded a Teams app before and run into issues, follow these [instructions](../build-your-first-app/build-and-run.md#sideload-your-app-in-teams).

1. In Visual Studio Code, select the **F5** key to launch a Teams web client.
1. In the app install dialog, select **Add for me**. (You could add the bot to a channel or chat, but it's less intrusive to others to test a bot in a one-on-one chat.)

## 7. Test your bot

Now for the fun part: Let's say "Hello" to your bot.

* In the compose box, send a `Hello` message.

Your bot replies with something like the following message.

:::image type="content" source="../assets/images/build-your-first-app/contoso-chatbot.png" alt-text="A screenshot showing a user say 'Hello' to a Teams bot and getting a response.":::

You now have a basic Teams bot that can communicate with users one-on-one or in group settings (channels and chats).

## 8. Troubleshooting your bot

The following information may help if you had issues completing this tutorial.

### Bot isn't connected to Teams

If you installed your app but the bot isn't working, make sure the bot is [connected to the Azure Bot Service's Teams *channel*](https://docs.microsoft.com/azure/bot-service/channel-connect-teams?view=azure-bot-service-4.0&preserve-view=true).

It's important to understand that this isn't the same as a channel in Teams. In this case, a channel is how the Azure Bot Service connects your bot to Teams or another [supported Microsoft or third-party communications app](https://docs.microsoft.com/azure/bot-service/bot-service-channels-reference?view=azure-bot-service-4.0&preserve-view=true).

## See also

* [Build and Run your first Microsoft Teams app](../build-your-first-app/build-and-run.md)  
* [Build a personal tab for Microsoft Teams](../build-your-first-app/build-personal-tab.md)
* [See what else Teams bots can do with one of our samples](https://github.com/microsoft/BotBuilder-Samples#teams-samples)
* [Bot conversation basics](../bots/how-to/conversations/conversation-basics.md)
* Follow our [design guidelines](../bots/design/bots.md) and build with [production-ready UI templates](../concepts/design/design-teams-app-ui-templates.md) to create a seamless experience.
* [Bot authentication in Teams](../bots/how-to/authentication/auth-flow-bot.md)
* [Microsoft Bot Framework](https://dev.botframework.com/)
* [Create a bot without the toolkit](../resources/bot-v3/bots-create.md)

## Next lesson

Let's try building a real-world bot.

> [!div class="nextstepaction"]
> [Build a bot](../bots/bot-basics.md)