---
title: Get started - Build a bot
author: girliemac
description: Quickly create a Microsoft Teams bot using the Microsoft Teams Toolkit.
ms.author: timura
ms.date: 04/14/2020

ms.topic: tutorial
---
# Build a bot for Microsoft Teams

This tutorial teaches you to build a basic bot app. A bot acts as an intermediary between Teams users and your web service with a conversational interface. People can chat with a bot to quickly get information or initiate workflows and tasks performed by your service.

**This tutorial teaches you to:**

* Create an app project and bot using the Microsoft Teams Toolkit for Visual Studio Code.
* Understand the Configurations relavant to bot for Teams.
* Host and run an app locally using a localhost tunneling solution.
* Sideload and test a bot in Teams.

## Prerequisites

Ensure that you understand how to set up and build Teams app before you begin to build a channel or group tab. For more information, see [Create your first Microsoft Teams Hello World app](../build-your-first-app/build-and-run.md).

## 1. Create your app project

The Microsoft Teams Toolkit helps you set up the following components for your app: 

* **App configurations and scaffolding** relevant to bots
* **Bot** that's automatically registered with the Microsoft Azure Bot Service

**To create your app project**

1. In Visual Studio Code, select **Microsoft Teams** :::image type="icon" source="../assets/icons/vsc-toolkit.png"::: on the left Activity Bar and choose **Create a new Teams app**.

    :::image type="content" source="../assets/images/build-your-first-app/vscode-teams-toolkit-bots-01.png" alt-text="Screenshot showing how to create an app in the Teams Toolkit.":::

1. When prompted, sign in with your Microsoft 365 development account. 
1. On the Select project screen, select Conversation bots: 

    :::image type="content" source="../assets/images/build-your-first-app/vscode-teams-toolkit-bots-02.png" alt-text="Screenshot showing how to create a new bot in the Teams Toolkit.":::

1. On the **Configure project** screen, enter a name for your bot. This is the default name for your app and also the name of the app project directory on your local machine.
1. Select **Create a new Bot** > **Create Bot Registration** as shown in the following image:

    :::image type="content" source="../assets/images/build-your-first-app/vscode-teams-toolkit-bots-03.png" alt-text="Screenshot showing naming new bot in the Teams Toolkit.":::

    If successful, your new bot will have a **Registered** status. Now your bot is automatically registered with the Microsoft Azure Bot Service. 

    :::image type="content" source="../assets/images/build-your-first-app/vscode-teams-toolkit-bots-04.png" alt-text="Screenshot showing registering new bot in the Teams Toolkit.":::

1. Select **Finish** at the bottom of the screen and save your project on your machine.  

## 2. Understand your app project components

Much of the app configurations and scaffolding are set up automatically when you create your project with the Teams Toolkit. Let's look at the main components for building a bot:

:::image type="content" source="../assets/images/build-your-first-app/vscode-teams-toolkit-bots-05.png" alt-text="Screenshot showing a project scaffold in the Teams Toolkit.":::

The app scaffolding of the bot is different from the tab. Unlike tabs, bot development doesn't require you to build any front-end web components or Teams client SDK.  Instead, it uses [Microsoft Bot Framework](https://dev.botframework.com/), which is an open-source SDK that allows you to build intelligent, enterprise-grade bots, including web and mobile chat bots, and Teams bots! 

The `botActivityHandler.js` file, located in the root directory of your project, is the Teams specific handler. The app scaffolding provides a `botActivityHandler.js` file, located in the root directory of your project, is the Teams specific handler that handles bot activities such as how the bot responds to specific messages.

## 3. Set up a secure tunnel to your app

Take a look at the `index.js`, where it creates a HTTP server and handles routing to listen for incoming requests to your bot. The `/api/messages` is your app's endpoint URL to respond to client requests: 

```JavaScript
server.post('/api/messages', (req, res) => { 
  adapter.processActivity(req, res, async (context) => { 
    await botActivityHandler.run(context); 
  }); 
}); 
```

To forward the requests to your bot's logic, you must set up a publicly accessible URL, such as `https://example.com/api/messages`, instead of `https://localhost`.  Because your app is running from your localhost currently, you will need to **tunnel** the network.

Tunneling is a protocol that allows you to transport data across a network. And localhost tunneling gives you a connection between your local machine and a remote connection. To securely expose your localhost to the internet, we recommend you to use the 3rd party tool called, **ngrok**. This will give you a secure URL. 

1. Go to [ngrok.com](https://ngrok.com/download) site and follow the instruction to install and set up ngrok on your environment. 
    
    You have to set the PATH environment variable, which is specific to the shell you are using. With this, you can use the `ngrok` command from your working directory. 

1. After you have finished setting it up, open terminal and run `ngrok http -host-header=rewrite 3978`. 

    Now ngrok provides you a public, secure URL that forwards to your localhost at port 3978, so copy the HTTPS URL, for example, `https://287a4f4223bc.ngrok.io` as shown in the screenshot below, since Teams requires HTTPS connections: 

    :::image type="content" source="../assets/images/build-your-first-app/vscode-teams-toolkit-bots-ngrok-06.png" alt-text="Screenshot showing tunnelling of localhost with ngrok.":::

1. Register the URL in your app manifest. 

## 4. Register your bot endpoint

To use a bot in Teams, you must register it with the Azure Bot Service. This is done automatically when you set up your app using the Teams Toolkit.

You must still specify an endpoint address to receive and process user messages, or requests, sent to the bot. Typically, the URL looks like `https://HOST_URL/api/messages`. You can configure this quickly in the toolkit.

1. Open **Microsoft Teams Toolkit**.
1. Select **Bots** > **Existing bot registrations** and select the bot you created during setup. 
1. In the **Bot endpoint address** field, enter the ngrok URL, for example, `https://287a4f4223bc.ngrok.io`, where you're hosting the bot and append `/api/messages` to it:

    :::image type="content" source="../assets/images/build-your-first-app/vscode-teams-toolkit-bots-07.png" alt-text="Screenshot showing how to tunnel localhost with ngrok.":::

    Your bot will be able to respond to messages in Teams, after you set up the endpoint correctly. 

## 5. Build and run your app

You've set up a URL to host your bot and configured it to handle messages. It's time to get your app up and running.

1. In terminal, go to the root directory of your app project and run `npm install`.
1. Run `npm start`.

   If successful, you see the following message indicating your bot is listening for activity at your `localhost`:

   `Bot/ME service listening at http://localhost:3978`

## 6. Sideload your bot in Teams

With your bot running, you can install it in Teams.

> [!TIP]
> If you haven't sideloaded a Teams app before and run into issues, follow these [instructions](../build-your-first-app/build-and-run.md#4-sideload-your-app-in-teams).

1. In Visual Studio Code, select the **F5** key to launch a Teams web client.
1. In the app install dialog, select **Add for me**. 

   > [!Note]
   > By default, the app is added to your 1:1 direct chat message, however you can choose to install it to a team or chat by clicking the little arrow beside **Add for me**. In this tutorial, let’s just click Add.

   :::image type="content" source="../assets/images/build-your-first-app/vscode-teams-toolkit-install-08.png" alt-text="Screenshot showing tunnelling localhost with ngrok.":::

## 7. Test your bot

Let's say "Hello" to your bot.

* In the compose box, send a `Hello` message.
    Your bot replies with something like the following message:

    :::image type="content" source="../assets/images/build-your-first-app/teams-client-bot.png" alt-text="A screenshot showing a user say 'Hello' to a Teams bot and getting a response.":::

    You have now created a basic Teams bot that can communicate with users one-on-one or in group settings (channels and chats) 🎉

## Troubleshoot your bot

The following information may help if you had issues completing this tutorial.

**Bot isn't connected to Teams**

If you installed your app but the bot isn't working, make sure the bot is [connected to the Azure Bot Service's Teams *channel*](https://docs.microsoft.com/azure/bot-service/channel-connect-teams?view=azure-bot-service-4.0&preserve-view=true).

It's important to understand that this isn't the same as a channel in Teams. In this case, a channel is how the Azure Bot Service connects your bot to Teams or another [supported Microsoft or third-party communications app](https://docs.microsoft.com/azure/bot-service/bot-service-channels-reference?view=azure-bot-service-4.0&preserve-view=true).

## See also

* [Bot basics](../bots/bot-basics.md)
* [Build a personal tab for Microsoft Teams](../build-your-first-app/build-personal-tab.md)
* [See what else Teams bots can do with one of our samples](https://github.com/microsoft/BotBuilder-Samples#teams-samples)
* [Bot conversation basics](../bots/how-to/conversations/conversation-basics.md)
* [Design guidelines](../bots/design/bots.md) 
* [Production-ready UI templates](../concepts/design/design-teams-app-ui-templates.md)
* [Bot authentication in Teams](../bots/how-to/authentication/auth-flow-bot.md)
* [Microsoft Bot Framework](https://dev.botframework.com/)
* [Create a bot without the toolkit](../resources/bot-v3/bots-create.md)

## Next step

> [!div class="nextstepaction"]
> [Build a messaging extension](../build-your-first-app/build-messaging-extension.md)
