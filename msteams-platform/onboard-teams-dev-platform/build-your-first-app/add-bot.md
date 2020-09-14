---
title: Create a bot for Teams
author: heath-hamilton
description: Learn how to build a bot in your first Microsoft Teams app.
ms.author: lajanuar
ms.date: 08/31/2020
ms.topic: tutorial
---
# Create a bot for Teams

You'll build a basic *bot* app in this tutorial. A bot acts as an intermediary between Teams users and your web service. People can chat with a bot to quickly get information or initiate workflows and tasks performed by your service.

## Your assignment

Your workplace has been using [tabs](../build-your-first-app/add-personal-tab.md) to surface important contact information in Teams. For example, colleagues have quick access to the help desk phone number. But instead of calling, what if people could contact the help desk using a chatbot? Your boss asks you to look at how quickly you can get a basic conversational bot up and running in Teams.

## What you'll learn

> [!div class="checklist"]
>
> * Create an app project and bot using the Microsoft Teams Toolkit for Visual Studio Code
> * Identify the app manifest properties and some of the scaffolding relevant to bots
> * Host a bot locally
> * Configure a bot for Teams
> * Sideload and test a bot in Teams

## Before you begin

If you haven't yet, set up your Microsoft 365 development [account](building-real-world-app.md#set-up-your-development-account) and [Teams app tools](building-real-world-app.md#install-your-development-tools).

## Create your app project and bot

The Microsoft Teams Toolkit helps you set up the following components for your app:

* **App project**: Includes the app manifest and scaffolding relevant to bots
* **Bot**: Configures a new bot and registers it with the Microsoft Azure Bot Service

> [!TIP]
> If you haven't created a Teams app project before, you might find it helpful to follow [these instructions](../build-your-first-app/build-and-run.md) that explain projects in more detail.

1. In Visual Studio Code, select **Microsoft Teams** :::image type="icon" source="../doc-links/images/vsc-toolkit.png"::: on the left Activity Bar and choose **Create a new Teams app**.
1. Enter a name for your Teams app. (This is the default name for your app and also the name of the app project directory on your local machine.)
1. On the **Add capabilities** screen, select **Bot** then **Next**.
1. Select **Create a new Bot** and **Login** to sign in with your Microsoft 365 development account.<br/>
:::image type="content" source="../doc-links/images/vsc-create-bot.png" alt-text="Illustration showing how, in the Teams Toolkit, to log in to your Microsoft 365 account to create a new bot.":::
1. (Optional) Enter a custom name for your bot and select **Create**. (Remember, this is the name for your bot and not the name of the Teams app you already specified.)
1. Select **Finish** at the bottom of the screen to configure your project.

## Identify relevant app project components

Much of the app manifest and scaffolding are set up automatically when you create your project with the Teams Toolkit. Let's look at the main components for building a bot.

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

For now, let's just focus on the following required properties. (See the full list of supported [`bots`](../../resources/schema/manifest-schema.md#bots) properties.)

* `botId`: The ID of the bot you created setting up your project. (Stored in `{botId0}`, you can find the actual ID in `Development.env`.)
* `scopes`: Specifies if your bot is available in `personal`, `groupchat`, or `team` (i.e., channel) contexts.
* `commands`: Available commands users can send to your bot.
* `title`: A bot command name users see in the Teams client.
* `description`: A short description or example of the syntax and arguments to help users understand what a bot command does.

### App scaffolding

The app scaffolding provides a `botActivityHandler.js` file, located in the root directory of your project, for handling how your bot processes activities in Teams (for example, how the bot responds to specific messages such as "Hello").

## Set up a secure tunnel to your app

For testing purposes, let's host your bot on a local web server (port 3978).

1. In a terminal, run `ngrok http -host-header=rewrite 3978`.
1. Copy the HTTPS URL in the output since Teams requires HTTPS connections.
1. In your `.publish` directory, open `Development.env`.
1. Replace the `baseUrl0` value with the copied URL. (For example, change `baseUrl0=http://localhost:3000` to `baseUrl0=https://85528b2b3ca5.ngrok.io`.)

Your app manifest is pointing to where you're hosting the bot.

## Configuring your bot

To use a bot in Teams, you must register it with the Azure Bot Service. Lucky for you, this is done automatically when you set up your app using the Teams Toolkit.

### Add the bot endpoint address

You must specify an endpoint URL to receive and process user messages (i.e., requests) sent to the bot. Typically, the URL looks like `https://HOST_URL/api/messages`. You can configure this quickly in the Teams Toolkit.

1. In Visual Studio Code, select **Microsoft Teams** :::image type="icon" source="../doc-links/images/vsc-toolkit.png"::: on the left Activity Bar and choose **Open Microsoft Teams Toolkit**.
1. Go to **Bot management > Existing bot registrations** and select the bot you created during setup.
1. In the **Bot endpoint address** field, enter the local web server where you're hosting the bot and append `/api/messages` to it.

    :::image type="content" source="../doc-links/images/bot-config-endpoint-url.png" alt-text="Illustration showing where you can configure the bot endpoint URL in the Teams Toolkit.":::

Your bot will be able to respond to messages in Teams.

## Run your app

You've set up a URL to host your bot and configured it to handle messages. It's time to get your bot up and running.

1. In a terminal, go to the root directory of your app project and run `npm install`.
1. Run `npm start`.

If successful, you see something like the following message indicating your bot is listening for activity at your `localhost`:

`Bot/ME service listening at http://localhost:3978`

## Sideload your bot in Teams

With your bot running, you can install it in Teams.

> [!TIP]
> If you haven't sideloaded a Teams app before and run into issues, follow these [instructions](../build-your-first-app/build-and-run.md#sideload-your-app-in-teams).

1. Log in to the Teams client with your account that allows app sideloading.
1. Select **Apps**, then choose **Upload a custom app**.
1. Go to your app project `.publish` folder and select `Development.zip`.
1. In the install modal, select **Add** to install your app.

## Test your bot

Now for the fun part: Let's say "Hello" to your bot in a one-on-one chat.

1. In Teams, select **More** :::image type="icon" source="../doc-links/images/teams-client-more.png"::: on the left side.
1. Locate and select the bot you just sideloaded.<br/>
   :::image type="content" source="../doc-links/images/bot-teams-access.png" alt-text="Illustration showing where you access your bot in Teams.":::
1. In the compose box, send a `Hello` message.

Your bot replies with something like the following message.

:::image type="content" source="../doc-links/images/contoso-chatbot.png" alt-text="A screenshot showing a user say 'Hello' to a Teams bot and getting a response back.":::

> [!NOTE]
> If you make code changes after testing your bot—for example, you update `botActivityHandler.js`—you must run your app again to see those changes reflected in Teams.

## Well done

Congratulations! You have a basic Teams bot that can communicate with users one-on-one or in group settings (channels and chats).

## Troubleshooting

The following information may help if you had issues completing this tutorial.

### Toolkit setup fails

While setting up your app project with the Teams Toolkit, you get an error after selecting the **Create a new Bot** option and logging in with your Microsoft 365 development account.

This could be an authentication issue. Follow these steps to finish setting up your project.

1. In Visual Studio Code, select **Microsoft Teams** :::image type="icon" source="../doc-links/images/vsc-toolkit.png"::: on the left Activity Bar and choose **Sign out**.
1. Go through the setup process again by logging in with the same account and creating a new bot.

### Bot isn't connected to Teams

If you installed your app but the bot isn't working, make sure the bot is [connected to the Azure Bot Service's Teams *channel*](https://docs.microsoft.com/azure/bot-service/channel-connect-teams?view=azure-bot-service-4.0).

It's important to understand that this isn't the same as a channel in Teams. In this case, a channel is how the Azure Bot Service connects your bot to Teams or another [supported Microsoft or third-party communications app](https://docs.microsoft.com/azure/bot-service/bot-service-channels-reference?view=azure-bot-service-4.0).

## Learn more

* [See what else Teams bots can do with one of our samples (GitHub)](https://github.com/microsoft/BotBuilder-Samples#teams-samples)
* [Bot conversation basics](../../bots/how-to/conversations/conversation-basics.md)
* [Bot authentication in Teams](../../bots/how-to/authentication/auth-flow-bot.md)
* [Microsoft Bot Framework](https://dev.botframework.com/)
