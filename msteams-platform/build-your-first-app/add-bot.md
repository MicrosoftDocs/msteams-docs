---
title: Create a bot for Teams
author: heath-hamilton
description: Learn how to build a bot in your first Microsoft Teams app.
ms.author: heath-hamilton
ms.date: 08/31/2020
ms.topic: tutorial
---
# Create a bot for Teams

You'll build a basic *bot* in this tutorial. Bots act as an intermediary between Teams users and your web service. People can chat with a bot to quickly get information or initiate workflows and tasks performed by your service.

## Your assignment

Your workplace has been using Teams tabs to surface important contact information. For example, colleagues have quick access to the help desk phone number. But instead of calling, what if people could contact the help desk using a chatbot? Your boss asks you to look at how quickly you can get a basic conversational bot up and running in Teams.

## What you'll learn

> [!div class="checklist"]
>
> * Identify the app manifest and scaffolding components relevant to bots
> * Host your bot locally
> * Configure your bot for Teams
> * Sideload and test your bot

## Before you begin

If you haven't yet, set up your Microsoft 365 development [account](building-real-world-app.md#set-up-your-development-account) and [tools](building-real-world-app.md#install-your-development-tools).

## Create your app project

Use the Microsoft Teams Toolkit in Visual Studio Code to set up the app project for your bot.

> [!TIP]
> If you haven't created a Teams app project before, you might find it helpful to follow [these instructions](../build-your-first-app/build-and-run.md), which explain projects in more detail.

1. In Visual Studio Code, select **Microsoft Teams** :::image type="icon" source="../assets/icons/vsc-toolkit.png"::: on the left Activity Bar and choose **Create a new Teams app**.
1. When you create your app project, choose the **Bot** option and select **Next**.
1. Select **Create a new bot** and **Login** to sign in with your Microsoft development account.
1. Enter a name for your bot and select **Create**.
1. If successful, select **Finish** at the bottom of the screen to finish configuring your project.

## Identify relevant app project components

Much of the app scaffolding and manifest are set up automatically when you create your project with the Teams Toolkit. Let's look at the main components for building a bot.

### App manifest

The following snippet from the app manifest (the `manifest.json` file in your project's `.publish` directory) shows the properties and default values relevant to bots.

```JSON
    "bots": [
        {
            "botId": "{botId0}",
            "scopes": [
                "personal",
                "groupchat",
                "team"
            ],
            "supportsFiles": false,
            "isNotificationOnly": false,
            "commandLists": [
                {
                    "scopes": [
                        "personal",
                        "groupchat",
                        "team"
                    ],
                    "commands": [
                        {
                            "title": "Hello",
                            "description": "Sends a hello message and @mention the sender"
                        }
                    ]
                }
            ]
        }
    ],
```

For now, let's just focus on the following required properties. (See the full list of supported [`bots`](../resources/schema/manifest-schema.md#bots) properties.)

* `botId`: The ID of the bot you created setting up your project.
* `scopes`: Specifies if your bot is available in `personal`, `groupchat`, or `team` (i.e., channel) contexts.
* `commands`: Available commands users can send to your bot.
* `title`: A bot command name users see.
* `description`: A short description or example of the syntax and arguments to help users understand what a command does.

### App scaffolding

The app scaffolding provides a `botActivityHandler.js` file, located in the root directory of your project, for handling how your bot processes activities in Teams (for example, how the bot responds to specific messages).

## Set up a secure tunnel to your app

For testing purposes, host your bot on a local web server (port 3978).

1. In a terminal, run `ngrok http -host-header=rewrite 3978`.
1. Copy the HTTPS URL you're provided.
1. In your `.publish` directory, open `Development.env`.
1. Replace the `baseUrl0` value with the copied URL. (For example, change `baseUrl0=http://localhost:3000` to `baseUrl0=https://85528b2b3ba5.ngrok.io`.)

Your app manifest now points to where you're hosting the bot.

## Configuring your bot

To use a bot in Teams, you must register it with the Microsoft Azure Bot Service. Lucky for you, this is done automatically when you create an app project using the Teams Toolkit.

### Add the bot endpoint address

You must specify an endpoint URL to receive and process user messages (i.e., requests) sent to the bot. Typically, the URL looks like `https://HOST_URL/api/messages`. You can configure this quickly in the Teams Toolkit.

1. In Visual Studio Code, select **Microsoft Teams** :::image type="icon" source="../assets/icons/vsc-toolkit.png"::: on the left Activity Bar and choose **Open Microsoft Teams Toolkit**.
1. Go to **Bot management > Existing bot registrations** and select your registered bot.
1. In the **Bot endpoint address** field, enter the local web server where you're hosting the bot and append `/api/messages` to it.

    :::image type="content" source="../assets/images/build-your-first-app/bot-config-endpoint-url.png" alt-text="Illustration showing where you can configure the bot endpoint URL in the Teams Toolkit.":::

Your bot will be able to respond to messages in Teams.

## Run your app

You've set up a URL to host your bot and configured it to handle messages. It's time to get your bot up and running.

1. In a terminal, go to the root directory of your app project and run `npm install`.
1. Run `npm start`.

If successful, you see a message like the following that indicates your bot is listening for activity at your `localhost`:

`Bot/ME service listening at http://localhost:3978`

## Sideload your bot in Teams

With your bot running, you can install it in Teams.

> [!TIP]
> If you haven't sideloaded a Teams app before and run into issues, follow the [instructions for getting started with sideloading](../build-your-first-app/build-and-run.md#sideload-your-app-in-teams).

1. Log in to the Teams client with your account that allows app sideloading.
1. Select **Apps**, then choose **Upload a custom app**.
1. Go to your app project `.publish` folder and select `Development.zip`.
1. In the install modal, select **Add** to install your app.

## Test your bot

Now for the fun part: Let's say "Hello" to your bot in a one-on-one chat.

1. In Teams, select **More** :::image type="icon" source="../assets/icons/teams-client-more.png"::: on the left side.
1. Locate and select the bot you just sideloaded.
    :::image type="content" source="../assets/images/build-your-first-app/bot-teams-access.png" alt-text="Illustration showing where you access your bot in Teams.":::
1. In the compose box, enter `Hello` and send.

Your bot replies with a, "Hi (your name)". Here's what the exchange should look like.

:::image type="content" source="../assets/images/build-your-first-app/contoso-chatbot.gif" alt-text="A GIF showing a user say 'Hello' to a Teams bot and getting a response back.":::

> [!NOTE]
> If you make code changes after testing your bot—for example, you update `botActivityHandler.js`—you must run `npm start` again to see those changes reflected in Teams.

## Well done

Congratulations! You have a basic Teams bot that can communicate with users in channels, chats, and one-on-one.

## Troubleshooting: Verify your bot is connected to Teams

If your bot isn't working correctly, make sure it's [connected to the Azure Bot Service's Teams *channel*](https://docs.microsoft.com/azure/bot-service/channel-connect-teams?view=azure-bot-service-4.0).

It's important to understand that this isn't the same as a channel in Teams. In this case, a channel is how the Azure Bot Service connects your bot to Teams or another [supported Microsoft or third-party communications app](https://docs.microsoft.com/azure/bot-service/bot-service-channels-reference?view=azure-bot-service-4.0).

## Learn more

* [See what else Teams bots can do with one of our samples](https://github.com/microsoft/BotBuilder-Samples#teams-samples)
* [Bot conversation basics](../bots/how-to/conversations/conversation-basics.md)
* [Bot authentication in Team](../bots/how-to/authentication/auth-flow-bot.md)
* [Microsoft Bot Framework](https://dev.botframework.com/)
