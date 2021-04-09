---
title: Get started - Build a bot
author: girliemac
description: Quickly create a Microsoft Teams bot using the Microsoft Teams Toolkit.
ms.author: lajantimurauar
ms.date: 03/17/2020
ms.topic: tutorial
---
# Build a bot for Microsoft Teams

You'll build a basic bot app in this tutorial. A bot acts as an intermediary between Teams users and your web service with a conversational interface. People can chat with a bot to quickly get information or initiate workflows and tasks performed by your service. 


## What you'll learn

> [!div class="checklist"]
>
> * Create an app project and bot using the Microsoft Teams Toolkit for Visual Studio Code
> * Configure a bot for Teams 
> * Host and run an app locally using a localhost tunneling solution 
> * Sideload and test a bot in Teams


## Before you begin

If you don't have an account that allows app sideloading or haven't installed your required tools, see [overview and prerequisite](../build-your-first-app/build-first-app-overview.md) before you begin.  

You can build Teams apps with your preferred tools, but this tutorial uses Microsoft Teams Toolkit for Visual Studio Code ([Download VS Code](https://code.visualstudio.com/download)).  

To install the Microsoft Teams Toolkit extension:

1. Open VS Code and select **Extensions** :::image type="icon" source="../assets/icons/vs-code-extensions.png"::: on the left Activity Bar 
2. Look for **Microsoft Teams Toolkit** and install the extension  

_This tutorial uses v.1.2. The screenshots in this tutorial may show a different UI from what you see, depending on the version you have._

> [!TIP]
> If you haven't created a Teams app project before, you might find it helpful to follow [these instructions](../build-your-first-app/build-and-run.md) that explain projects in more detail.


## 1. Create your app project

The Microsoft Teams Toolkit helps you set up the following components for your app: 

* **App configurations and scaffolding** relevant to bots
* **Bot** that's automatically registered with the Microsoft Azure Bot Service


In Visual Studio Code, select **Microsoft Teams** :::image type="icon" source="../assets/icons/vsc-toolkit.png"::: on the left Activity Bar and choose **Create a new Teams app**.

:::image type="content" source="../assets/images/build-your-first-app/vscode-teams-toolkit-bots-01.png" alt-text="Screenshot showing how to create an app in the Teams Toolkit.":::

When prompted, sign in with your Microsoft 365 development account. 

On the Select project screen, select Conversation bots: 

:::image type="content" source="../assets/images/build-your-first-app/vscode-teams-toolkit-bots-02.png" alt-text="Screenshot showing how to create a new bot in the Teams Toolkit.":::

At **Configure project**, enter a name for your bot. (This is the default name for your app and also the name of the app project directory on your local machine.)  

Then, select **Create a new Bot** then click **Create Bot Registration** button:

:::image type="content" source="../assets/images/build-your-first-app/vscode-teams-toolkit-bots-03.png" alt-text="Screenshot showing naming new bot in the Teams Toolkit.":::

If successful, your new bot will have a **Registered** status. 
Now your bot is automatically registered with the Microsoft Azure Bot Service. 

:::image type="content" source="../assets/images/build-your-first-app/vscode-teams-toolkit-bots-04.png" alt-text="Screenshot showing registering new bot in the Teams Toolkit.":::

Then select **Finish** at the bottom of the screen and save your project on your machine.  

## 2. Identify relevant app project components

Much of the app configurations and scaffolding are set up automatically when you create your project with the Teams Toolkit. Let's look at the main components for building a bot:

:::image type="content" source="../assets/images/build-your-first-app/vscode-teams-toolkit-bots-05.png" alt-text="Screenshot showing a project scaffold in the Teams Toolkit.":::

If you have gone through the [**Create a "Hello, world" app**](../build-your-first-app/build-and-run.md)  tutorial and creates a Tab, you may notice the difference in the app scaffolding. Unlike tabs, bot development doesn't require you to build any front-end web components or Teams client SDK.  

Instead, it uses [Microsoft Bot Framework](https://dev.botframework.com/), which is an open-source SDK that allows you to build intelligent, enterprise-grade bots, including web and mobile chat bots, and Teams bots! 

The `botActivityHandler.js` file, located in the root directory of your project, is the Teams specific handler. 


The app scaffolding provides a `botActivityHandler.js` file, located in the root directory of your project, is the Teams specific handler that handles bot activities such as how the bot responds to specific messages.

## 3. Set up a secure tunnel to your app

Take a look at the `index.js`, where it creates a HTTP server and handles routing to listen for incoming requests to your bot. The `/api/messages` is your app's endpoint URL to respond to client requests: 

```JavaScript
server.post('/api/messages', (req, res) => { 
  adapter.processActivity(req, res, async (context) => { 
    await botActivityHandler.run(context); 
  }); 
}); 
```

To forward the requests to your bot's logic, you _must_ set up a publicly accessible URL, such as `https://example.com/api/messages`, instead of `https://localhost`.  Because your app is running from your localhost currently, you will need to **tunnel** the network.

> 📝 _**What is tunneling?**_— tunneling is a protocol that allows you to transport data across a network. And localhost tunneling gives you a connection between your local machine and a remote connection. To securely expose your localhost to the internet, we recommend you to use the 3rd party tool called, **ngrok**. This will give you a secure URL. 

First, let's go to the [ngrok.com](https://ngrok.com/download) site to install and set up ngrok on your environment. 

Once you finished set it up, now you are going to host your app on a local web server at port 3978:

Then, in a terminal, run `ngrok http -host-header=rewrite 3978`.  

Now ngrok provides you a public, secure URL that forwards to your localhost at port 3978, so copy the HTTPS URL (for example, `https://287a4f4223bc.ngrok.io` as seen in the screenshot below) since Teams requires HTTPS connections: 

:::image type="content" source="../assets/images/build-your-first-app/vscode-teams-toolkit-bots-ngrok-06.png" alt-text="Screenshot showing how to tunnel localhost with ngrok.":::

Now, you will need to register the URL in your app manifest in the next step. 

## 4. Register bot endpoint

To use a bot in Teams, you must register it with the Azure Bot Service. Lucky for you, this is done automatically when you set up your app using the Teams Toolkit.

You still must specify an endpoint address to receive and process user messages (i.e., requests) sent to the bot. Typically, the URL looks like `https://HOST_URL/api/messages`. You can configure this quickly in the toolkit.

Go back to **Microsoft Teams Toolkit**, then click **Bots**. Scroll to **Existing bot registrations** and select the bot you created during setup. 

In the **Bot endpoint address** field, enter the ngrok URL (for example, `https://287a4f4223bc.ngrok.io`) where you're hosting the bot and append `/api/messages` to it:

 :::image type="content" source="../assets/images/build-your-first-app/vscode-teams-toolkit-bots-07.png" alt-text="Screenshot showing how to tunnel localhost with ngrok.":::

Your bot will be able to respond to messages in Teams, once you set up the endpoint correctly. 

## 5. Build and run your app

You've set up a URL to host your bot and configured it to handle messages. It's time to get your app up and running.

1. In another terminal, go to the root directory of your app project and run `npm install`.
1. Run `npm start`.

If successful, you see the following message indicating your bot is listening for activity at your `localhost`:

`Bot/ME service listening at http://localhost:3978`

## 6. Sideload your bot in Teams

With your bot running, you can install it in Teams.

> [!TIP]
> If you haven't sideloaded a Teams app before and run into issues, follow these [instructions](../build-your-first-app/build-and-run.md#4-sideload-your-app-in-teams).

In Visual Studio Code, you can either use **App Studio to install**, or press the **F5** key to launch a Teams web client in a browser. (See a step-by-step instruction of how to use App Studio at [Hello World](../build-your-first-app/build-and-run?#install-app-studio))

Once Teams client is launched with app installation modal, click **Add**. 

_By default, the app is added to your 1:1 direct chat message, however you can choose to install it to a team or chat by clicking the little arrow on the right of the button. In this tutorial, let’s just click Add._

:::image type="content" source="../assets/images/build-your-first-app/vscode-teams-toolkit-install-08.png" alt-text="Screenshot showing how to tunnel localhost with ngrok.":::

## 7. Test your bot

Now for the fun part: Let's say "Hello" to your bot.

In the compose box, send a `Hello` message.
Your bot replies with something like the following message:

:::image type="content" source="../assets/images/build-your-first-app/teams-client-bot.png" alt-text="A screenshot showing a user say 'Hello' to a Teams bot and getting a response.":::

Congratulations! You have a basic Teams bot that can communicate with users one-on-one or in group settings (channels and chats) 🎉

## Troubleshooting

The following information may help if you had issues completing this tutorial.

### Bot isn't connected to Teams

If you installed your app but the bot isn't working, make sure the bot is [connected to the Azure Bot Service's Teams *channel*](https://docs.microsoft.com/azure/bot-service/channel-connect-teams?view=azure-bot-service-4.0&preserve-view=true).

It's important to understand that this isn't the same as a channel in Teams. In this case, a channel is how the Azure Bot Service connects your bot to Teams or another [supported Microsoft or third-party communications app](https://docs.microsoft.com/azure/bot-service/bot-service-channels-reference?view=azure-bot-service-4.0&preserve-view=true).

## Next lesson 

Next, try building an app with messaging extensions, which also uses Bot Framework. 

> [!div class="nextstepaction"]
> [Build a messaging extension](../build-your-first-app/build-messaging-extension.md)

## Learn more

* [See what else Teams bots can do with one of our samples](https://github.com/microsoft/BotBuilder-Samples#teams-samples)
* [Bot conversation basics](../bots/how-to/conversations/conversation-basics.md)
* Follow our [design guidelines](../bots/design/bots.md) and build with [production-ready UI templates](../concepts/design/design-teams-app-ui-templates.md) to create a seamless experience.
* [Bot authentication in Teams](../bots/how-to/authentication/auth-flow-bot.md)
* [Microsoft Bot Framework](https://dev.botframework.com/)
* [Create a bot without the toolkit](../resources/bot-v3/bots-create.md)
