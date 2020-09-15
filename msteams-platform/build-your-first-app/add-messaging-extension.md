---
title: Create a messaging extension for Teams
author: heath-hamilton
description: Learn how to build a messaging extension for your first Microsoft Teams app.
ms.author: lajanuar
ms.date: 09/22/2020
ms.topic: tutorial
---
# Create a messaging extension for Teams

There are two types of Teams *messaging extensions*: Search commands and action commands.

In this lesson, you'll create a *search command*, a shortcut for finding external content and sharing it in Teams. Users can access search commands from the [Teams compose or command box](../messaging-extensions/what-are-messaging-extensions.md).

## Your assignment

Your organization's help desk communicates with users through Teams, but the tickets reside in a separate system. This means support staff must constantly go back and forth between apps. You'll investigate how to reduce this much context switching by creating a simple search-based messaging extension in Teams.

## What you'll learn

> [!div class="checklist"]
>
> * Create an app project and bot using the Microsoft Teams Toolkit for Visual Studio Code
> * Identify the app manifest properties and some of the scaffolding relevant to messaging extensions
> * Host an app locally
> * Configure a bot for your messaging extension
> * Sideload and test a messaging extension in Teams

## Before you begin

If you haven't yet, set up your Microsoft 365 development [account](building-real-world-app.md#set-up-your-development-account) and [Teams app tools](building-real-world-app.md#install-your-development-tools).

## Create your app project

The Microsoft Teams Toolkit helps you set up the following components for your messaging extension app:

* **App manifest and scaffolding** relevant to messaging extensions
* **Bot** for your messaging extension that's automatically registered with the Microsoft Azure Bot Service

> [!TIP]
> If you haven't created a Teams app project before, you might find it helpful to follow [these instructions](../build-your-first-app/build-and-run.md) that explain projects in more detail.

1. In Visual Studio Code, select **Microsoft Teams** :::image type="icon" source="../assets/icons/vsc-toolkit.png"::: on the left Activity Bar and choose **Create a new Teams app**.
1. Enter a name for your Teams app. (This is the default name for your app and also the name of the app project directory on your local machine.)
1. On the **Add capabilities** screen, select **Messaging Extension** then **Next**.
1. On the **Configure messaging extension** screen, do the following:
    1. Choose only the **Search-based** option for the type of messaging extension.
    1. Select **Create a new Bot** and **Login** to sign in with your Microsoft 365 development account.
    1. (Optional) Enter a custom name for your bot and select **Create**. (Remember, this is the name for your bot and not the name of the Teams app you already specified.)
    1. Select **Yes** for the link unfurling option.</br>
:::image type="content" source="../assets/images/build-your-first-app/choose-me-search.png" alt-text="Illustration showing how, in the Teams Toolkit, to log in to your Microsoft 365 account to create a new bot.":::
1. Select **Finish** at the bottom of the screen to configure your project.

## Identify relevant app project components

Much of the app manifest and scaffolding are set up automatically when you create your project with the Teams Toolkit.



### App manifest

The following snippet from the app manifest (the `manifest.json` file in your project's `.publish` directory) shows the properties and default values relevant to messaging extensions.

```JSON
"composeExtensions": [
    {
        "botId": "{botId0}",
        "canUpdateConfiguration": true,
        "commands": [
            {
                "id": "searchQuery",
                "context": [
                    "compose",
                    "commandBox"
                ],
                "description": "Test command to run query",
                "title": "Search",
                "type": "query",
                "parameters": [
                    {
                        "name": "searchQuery",
                        "title": "Search Query",
                        "description": "Your search query",
                        "inputType": "text"
                    }
                ]
            }
        ]
    }
],
```

Let's understand some of the properties the toolkit created for you. (See the full list of supported [`composeExtensions`](../resources/schema/manifest-schema.md#composeextensions) properties.)

* `botId`: The ID of the bot you created setting up your project. (Stored in `{botId0}`, you can find the actual ID in `Development.env`.)
* `commands`: Available commands for the messaging extension. The toolkit provides you one by default.
* `id`: Command identifier for the command.
* `context`: Defines where users can invoke the messaging extension.
* `description`: UI help text indicating what the command does or how to get started.
* `title`: User-friendly name for the command.
* `parameters`: Number of parameters a command accepts (minimum of one and maximum of five).
* `parameters.name`: Parameter name that's included in requests to your messaging extension service.
* `parameters.title`: User-friendly name for the parameter.
* `parameters.description`: UI help text describing the parameter's purpose or example input.

### App scaffolding

The app scaffolding provides a `botActivityHandler.js` file, located in the root directory of your project, for handling how your bot processes activities in Teams (for example, how the bot responds to specific messages such as "Hello").

## Set up a secure tunnel to your app

For testing purposes, let's host your messaging extension on a local web server (port 3978).

1. In a terminal, run `ngrok http -host-header=rewrite 3978`.
1. Copy the HTTPS URL in the output since Teams requires HTTPS connections.
1. In your `.publish` directory, open `Development.env`.
1. Replace the `baseUrl0` value with the copied URL. (For example, change `baseUrl0=http://localhost:3000` to `baseUrl0=https://85528b2b3ca5.ngrok.io`.)

Your app manifest is pointing to where you're hosting the bot used by the messaging extension.

## Configuring your messaging extension

Messaging extensions rely on bots to send and process user requests from Teams to your external service.

The bot must be registered with the Azure Bot Service. This is done automatically when you set up your app using the Teams Toolkit.

### Add the bot endpoint address

You must specify an endpoint URL to receive and process user messages (i.e., requests) sent to the bot. Typically, the URL looks like `https://HOST_URL/api/messages`. You can configure this quickly in the Teams Toolkit.

1. In Visual Studio Code, select **Microsoft Teams** :::image type="icon" source="../assets/icons/vsc-toolkit.png"::: on the left Activity Bar and choose **Open Microsoft Teams Toolkit**.
1. Go to **Bot management > Existing bot registrations** and select the bot you created during setup.
1. In the **Bot endpoint address** field, enter the local web server where you're hosting the bot (`baseUrl10` value) and append `/api/messages` to it.

Your bot will be able to handle queries in your messaging extension.

## Run your app

You've set up a URL to host your messaging extension and ... . It's time to get your app up and running.

1. In a terminal, go to the root directory of your app project and run `npm install`.
1. Run `npm start`.

If successful, you see something like the following message indicating your messaging extension service is listening for activity at your `localhost`:

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

1. In Teams, select **More** :::image type="icon" source="../assets/icons/teams-client-more.png"::: on the left side.
1. Locate and select the bot you just sideloaded.<br/>
   :::image type="content" source="../assets/images/build-your-first-app/bot-teams-access.png" alt-text="Illustration showing where you access your bot in Teams.":::
1. In the compose box, send a `Hello` message.

Your bot replies with something like the following message.

:::image type="content" source="../assets/images/build-your-first-app/contoso-chatbot.png" alt-text="A screenshot showing a user say 'Hello' to a Teams bot and getting a response back.":::

> [!NOTE]
> If you make code changes after testing your bot—for example, you update `botActivityHandler.js`—you must run your app again to see those changes reflected in Teams.

## Well done

Congratulations! You have a basic Teams messaging extension that can search for external content in the compose or command box.

## Troubleshooting

The following information may help if you had issues completing this tutorial.

### Toolkit setup fails

While setting up your app project with the Teams Toolkit, you get an error after selecting the **Create a new Bot** option and logging in with your Microsoft 365 development account.

This could be an authentication issue. Follow these steps to finish setting up your project.

1. In Visual Studio Code, select **Microsoft Teams** :::image type="icon" source="../assets/icons/vsc-toolkit.png"::: on the left Activity Bar and choose **Sign out**.
1. Go through the setup process again by logging in with the same account and creating a new bot.

### Bot isn't connected to Teams

If you installed your app but it isn't working, make sure the messaging extenion's bot is [connected to the Azure Bot Service's Teams *channel*](https://docs.microsoft.com/azure/bot-service/channel-connect-teams?view=azure-bot-service-4.0).

It's important to understand that this isn't the same as a channel in Teams. In this case, a channel is how the Azure Bot Service connects your bot to Teams or another [supported Microsoft or third-party communications app](https://docs.microsoft.com/azure/bot-service/bot-service-channels-reference?view=azure-bot-service-4.0).

## Learn more

* [Receive and respond to search commands](../messaging-extensions/how-to/search-commands/respond-to-search.md)
* Link unfurling
* Authentication
* Action-based commands
* [Microsoft Bot Framework](https://dev.botframework.com/)
