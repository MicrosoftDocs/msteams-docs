---
title: Get started - Build a messaging extension
author: heath-hamilton
description: Quickly create a Microsoft Teams messaging extension using the Microsoft Teams Toolkit.
ms.author: lajanuar
localization_priority: Normal
ms.date: 11/04/2020
ms.topic: tutorial
---
# Build a messaging extension for Microsoft Teams

There are two types of Teams *messaging extensions*: [Search commands](../messaging-extensions/how-to/search-commands/define-search-command.md) and [action commands](../messaging-extensions/how-to/action-commands/define-action-command.md).

In this lesson, you'll create a *search command* (also known as a *search-based messaging extension*), which is a shortcut for finding external content and sharing it in Teams. Users can access search commands from the [Teams compose or command box](../messaging-extensions/what-are-messaging-extensions.md).

## Your assignment

Your organization's help desk communicates with users through Teams, but the tickets reside in a separate system. This means support staff must constantly go back and forth between apps. You'll investigate how you might reduce this much context switching by creating a simple search-based messaging extension for Teams.

## What you'll learn

> [!div class="checklist"]
>
> * Create an app project and messaging extension bot using the Microsoft Teams Toolkit for Visual Studio Code
> * Identify the app configurations and some of the scaffolding relevant to messaging extensions
> * Host an app locally
> * Configure the bot for your messaging extension
> * Sideload and test a messaging extension in Teams

## Before you begin

If you haven't yet, make sure you [understand and install the Teams development prerequisites](build-first-app-overview.md#get-prerequisites).

## 1. Create your app project

The Microsoft Teams Toolkit helps you set up the following components for your messaging extension:

* **App configurations and scaffolding** relevant to messaging extensions
* **Bot** for your messaging extension that's automatically registered with the Microsoft Azure Bot Service

> [!TIP]
> If you haven't created a Teams app project before, you might find it helpful to follow [these instructions](../build-your-first-app/build-and-run.md) that explain projects in more detail.

1. In Visual Studio Code, select **Microsoft Teams** :::image type="icon" source="../assets/icons/vsc-toolkit.png"::: on the left Activity Bar and choose **Create a new Teams app**.
1. When prompted, sign in with your Microsoft 365 development account.
1. On the **Add capabilities** screen, select **Messaging Extension** then **Next**.
1. Enter a name for your Teams app. (This is the default name for your app and also the name of the app project directory on your local machine.)
1. On the **Configure messaging extension** screen, do the following:
    1. Choose only the **Search-based** option for the type of messaging extension.
    1. Select **Create a new Bot** then **Create Bot Registration**. If successful, your new bot will have a **Registered** status.
    1. For now, select **No** for the link unfurling option.
1. Select **Finish** at the bottom of the screen to configure your project.

## 2. Identify relevant app project components

Much of the app configurations and scaffolding are set up automatically when you create your project with the Teams Toolkit.

### App configurations

To view or update your messaging extension's configurations, select **App Studio** in the toolkit and go to **Messaging extensions**.

### App scaffolding

The app scaffolding provides a `botActivityHandler.js` file, located in the root directory of your project, for handling how your messaging extension (or technically, the [messaging extension's bot](#4-configure-the-bot-for-your-messaging-extension)) responds to search queries in Teams.

## 3. Set up a secure tunnel to your app

For testing purposes, let's host your messaging extension on a local web server (port 3978).

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

1. In a terminal, go to the root directory of your app project and run `npm install`.
1. Run `npm start`.

If successful, you see the following message indicating your messaging extension service is listening for activity at your `localhost`:

`Bot/ME service listening at http://localhost:3978`

## 6. Sideload your messaging extension in Teams

With your messaging extension running, you can install it in Teams.

> [!TIP]
> If you haven't sideloaded a Teams app before and run into issues, follow these [instructions](../build-your-first-app/build-and-run.md#4-sideload-your-app-in-teams).

1. In Visual Studio Code, press the **F5** key to launch a Teams web client.
1. In the app install dialog, select **Add for me**.

## 7. Test your messaging extension

Learn how messaging extensions work in a Teams chat.

1. Start a new chat. In the compose box, select **More** :::image type="icon" source="../assets/icons/teams-client-more.png"::: and choose the messaging extension app you just sideloaded.
1. Try searching for something (for example, **Tickets**). If your app is working, you'll see sample search results (you can add your own later).<br/>
   :::image type="content" source="../assets/images/build-your-first-app/me-teams-test.png" alt-text="A screenshot showing how a search-based messaging extension is used in the Teams compose box.":::

## Well done

Congratulations! You have a basic Teams messaging extension that's set up to search for external content in the compose or command box.

## Next steps

See the following pages to continue and build a fully featured messaging extension:

1. [Define search commands](../messaging-extensions/how-to/search-commands/define-search-command.md) that are relevant to your service.
1. Configure your service to [respond to users' searches](../messaging-extensions/how-to/search-commands/respond-to-search.md).

## Troubleshooting

The following information may help if you had issues completing this tutorial.

### Bot isn't connected to Teams

If you installed your app but it isn't working, make sure the messaging extension's bot is [connected to the Azure Bot Service's Teams *channel*](https://docs.microsoft.com/azure/bot-service/channel-connect-teams?view=azure-bot-service-4.0&preserve-view=true).

It's important to understand that this isn't the same as a channel in Teams. In this case, a channel is how the Azure Bot Service connects your bot to Teams or another [supported Microsoft or third-party communications app](https://docs.microsoft.com/azure/bot-service/bot-service-channels-reference?view=azure-bot-service-4.0&preserve-view=true).

## Learn more

* [Include a link unfurling feature](../messaging-extensions/how-to/link-unfurling.md)
* Follow our [design guidelines](../messaging-extensions/design/messaging-extension-design.md) and build with [production-ready UI templates](../concepts/design/design-teams-app-ui-templates.md) to create a seamless experience.
* [Add authentication](../messaging-extensions/how-to/add-authentication.md)
* [Create an action-based messaging extension](../messaging-extensions/how-to/action-commands/define-action-command.md)
* [Microsoft Bot Framework](https://dev.botframework.com/)

