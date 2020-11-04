---
title: Get started - Build a bot
author: heath-hamilton
description: Quickly create a Microsoft Teams bot using the Microsoft Teams Toolkit.
ms.author: lajanuar
ms.date: 10/09/2020
ms.topic: tutorial
---
# Build a bot for Microsoft Teams

You'll build a basic *bot* app in this tutorial. A bot acts as an intermediary between Teams users and your web service. People can chat with a bot to quickly get information or initiate workflows and tasks performed by your service.

## Your assignment

Your workplace created a Teams app that uses [tabs](../build-your-first-app/build-personal-tab.md) to surface important contact information. For example, colleagues have quick access to the help desk phone number. But instead of calling, what if people could contact the help desk using a chatbot? Your boss asks you to look at how quickly you can get a basic conversational bot up and running in Teams.

## What you'll learn

> [!div class="checklist"]
>
> * Create an app project and bot using the Microsoft Teams Toolkit for Visual Studio Code
> * Identify some of the app configurations and scaffolding relevant to bots
> * Host an app locally
> * Configure a bot for Teams
> * Sideload and test a bot in Teams

## Before you begin

If you haven't yet, make sure you [understand and install the Teams development prerequisites](build-first-app-overview.md#get-prerequisites).

## 1. Create your app project

The Microsoft Teams Toolkit helps you set up the following components for your app:

* **App configurations and scaffolding** relevant to bots
* **Bot** that's automatically registered with the Microsoft Azure Bot Service

> [!TIP]
> If you haven't created a Teams app project before, you might find it helpful to follow [these instructions](../build-your-first-app/build-and-run.md) that explain projects in more detail.

1. In Visual Studio Code, select **Microsoft Teams** :::image type="icon" source="../assets/icons/vsc-toolkit.png"::: on the left Activity Bar and choose **Create a new Teams app**.
1. When prompted, sign in with your Microsoft 365 development account.
1. On the **Add capabilities** screen, select **Bot** then **Next**.
1. Enter a name for your Teams app. (This is the default name for your app and also the name of the app project directory on your local machine.)
1. Go to **Configure bot** and select **Create a new Bot** then **Create Bot Registration**. If successful, your new bot will have a a **Registered** status.
1. Select **Finish** at the bottom of the screen and choose a location to create your project.

## 2. Identify relevant app project components

Much of the app manifest and scaffolding are set up automatically when you create your project with the Teams Toolkit. Let's look at the main components for building a bot.

### App configurations

To see or update your bot's configurations, select **App Studio** in the toolkit and go to **Bots**.

### App scaffolding

The app scaffolding provides a `botActivityHandler.js` file, located in the root directory of your project, for handling how your bot processes activities in Teams (for example, how the bot responds to specific messages such as "Hello").

The `.env` file, also in the root directory, stores your bot ID and password.

## 3. Set up a secure tunnel to your app

For testing purposes, let's host your app on a local web server (port 3978).

1. If you haven't already, install [ngrok](https://ngrok.com/download).
1. In a terminal, run `ngrok http -host-header=rewrite 3978`.
1. Copy the HTTPS URL in the output (for example, `https://468b9ab725e9.ngrok.io`) since Teams requires HTTPS connections.

With this URL, Teams (which requires HTTPS connections) will be able tunnel to where you're hosting your app (`localhost` on port 3978).

## 4. Configure your bot

To use a bot in Teams, you must register it with the Azure Bot Service. Lucky for you, this is done automatically when you set up your app using the Teams Toolkit.

You still must specify an endpoint address to receive and process user messages (i.e., requests) sent to the bot. Typically, the URL looks like `https://HOST_URL/api/messages`. You can configure this quickly in the Teams Toolkit.

1. In Visual Studio Code, select **Microsoft Teams** :::image type="icon" source="../assets/icons/vsc-toolkit.png"::: on the left Activity Bar and choose **Open Microsoft Teams Toolkit**.
1. Go to **Bots > Existing bot registrations** and select the bot you created during setup.
1. In the **Bot endpoint address** field, enter the ngrok URL (for example, `https://468b9ab725e9.ngrok.io`) where you're hosting the bot and append `/api/messages` to it.

    :::image type="content" source="../assets/images/build-your-first-app/bot-config-endpoint-url.png" alt-text="Illustration showing where you can configure the bot endpoint URL in the Teams Toolkit.":::

Your bot will be able to respond to messages in Teams.

## 5. Build and run your app

You've set up a URL to host your bot and configured it to handle messages. It's time to get your bot up and running.

1. In a terminal, go to the root directory of your app project and run `npm install`.
1. Run `npm start`.

If successful, you see the following message indicating your bot is listening for activity at your `localhost`:

`Bot/ME service listening at http://localhost:3978`

## 6. Sideload your bot in Teams

With your bot running, you can install it in Teams.

> [!TIP]
> If you haven't sideloaded a Teams app before and run into issues, follow these [instructions](../build-your-first-app/build-and-run.md#5-sideload-your-app-in-teams).

1. Press the **F5** key to launch a Teams web client.
1. In the install dialog, select **Add for me** to install your app. (You could add the bot to a channel or chat, but it's less intrusive to others to test a bot in a one-on-one chat.)

## 7. Test your bot

Now for the fun part: Let's say "Hello" to your bot.

1. In the compose box, send a `Hello` message.

Your bot replies with something like the following message.

:::image type="content" source="../assets/images/build-your-first-app/contoso-chatbot.png" alt-text="A screenshot showing a user say 'Hello' to a Teams bot and getting a response.":::

## Well done

Congratulations! You have a basic Teams bot that can communicate with users one-on-one or in group settings (channels and chats).

## Troubleshooting

The following information may help if you had issues completing this tutorial.

### Toolkit setup fails

While setting up your app project with the Teams Toolkit, you get an error after selecting the **Create a new Bot** option and logging in with your Microsoft 365 development account.

This could be an authentication issue. Follow these steps to finish setting up your project.

1. In Visual Studio Code, select **Microsoft Teams** :::image type="icon" source="../assets/icons/vsc-toolkit.png"::: on the left Activity Bar and choose **Sign out**.
1. Go through the setup process again by logging in with the same account and creating a new bot.

### Bot isn't connected to Teams

If you installed your app but the bot isn't working, make sure the bot is [connected to the Azure Bot Service's Teams *channel*](https://docs.microsoft.com/azure/bot-service/channel-connect-teams?view=azure-bot-service-4.0&preserve-view=true).

It's important to understand that this isn't the same as a channel in Teams. In this case, a channel is how the Azure Bot Service connects your bot to Teams or another [supported Microsoft or third-party communications app](https://docs.microsoft.com/azure/bot-service/bot-service-channels-reference?view=azure-bot-service-4.0&preserve-view=true).

## Learn more

* [See what else Teams bots can do with one of our samples](https://github.com/microsoft/BotBuilder-Samples#teams-samples)
* [Bot conversation basics](../bots/how-to/conversations/conversation-basics.md)
* [Bot authentication in Teams](../bots/how-to/authentication/auth-flow-bot.md)
* [Microsoft Bot Framework](https://dev.botframework.com/)
* [Create a bot without the toolkit](../bots/how-to/create-a-bot-for-teams.md)
