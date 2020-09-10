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

Your workplace has been using Teams tabs to surface important contact information. For example, colleagues have quick access to the help desk phone number. But instead of calling, what if people could contact the help desk using a chatbot? Your boss has asked you to look at how quickly you can get a basic conversational bot up and running in Teams.

## What you'll learn

> [!div class="checklist"]
>
> * Identify the app manifest and scaffolding components relevant to bots
> * Register your bot with the Microsoft Bot Framework
> * Create a bot command

## Before you begin

If you haven't yet, set up your Microsoft 365 development [account](building-real-world-app.md#set-up-your-development-account) and [tools](building-real-world-app.md#install-your-development-tools).

## Create your app project

Use the Microsoft Teams Toolkit in Visual Studio Code to set up the app project for your bot.

> [!TIP]
> If you've never created a Teams app project, you might find the instructions in build and run your first app more comprehensive.

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
* `commands`: Options for available commands users can send to you bot.
* `title`: A bot command name users see.
* `description`: A short description or example of the syntax and arguments to help users understand what the command does.

### App scaffolding

The app scaffolding provides a `botActivityHandler.js` file, located in the root directory of your project, for handling how your bot processes activities in Teams (for example, sending and receiving messages).

## Set up a secure tunnel to your app

For testing purposes, host your bot on a local web server (port 3978).

1. In a terminal, run `ngrok http -host-header=rewrite 3978`.
1. Copy the HTTPS URL you're provided.
1. In your `.publish` directory, open `Development.env`.
1. Replace the `baseUrl0` value with the copied URL. (For example, change `baseUrl0=http://localhost:3000` to `baseUrl0=https://85528b2b3ba5.ngrok.io`.)

Your app manifest now points to where you're hosting the bot.

## Configuring your bot

To use a bot in Teams, you must register it with the Microsoft Azure Bot Service. Lucky for you, the toolkit already did this when you created this app project.

### Update the messaging endpoint

xxx

### Verify your bot is connected to Teams

xxx

## Add some personality to your bot

Update and create bot commands.

## Run your app

npm stuff

    Bot/ME service listening at http://localhost:3978

## Sideload your app in Teams

xxx

## Greet your bot

Install, say Hello

## Well done

Congratulations! You have a Teams bot that can communicate with users in channels, chats, and one-on-one.

## Learn more

* [Bot conversation basics](../bots/how-to/conversations/conversation-basics.md)
* [Teams bot samples](https://github.com/microsoft/BotBuilder-Samples#teams-samples)
* [Bot authentication in Team](../bots/how-to/authentication/auth-flow-bot.md)
* [Microsoft Bot Framework](https://dev.botframework.com/)

## Next lesson

Try creating a simple messaging extension, which also uses the Bot Framework.

> [!div class="nextstepaction"]
> [Build a messaging extension](add-messaging-extension.md)
