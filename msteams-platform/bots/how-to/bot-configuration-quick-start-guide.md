---
title: Bot configuration quick start guide
author: surbhigupta
description:  In this module, learn how to quickly try the bot configuration.
ms.topic: conceptual
ms.localizationpriority: high
ms.author: v-bvishnu
ms.date: 04/07/2022
---

# Bot configuration quick start guide

> [!NOTE]
>
> * Bot configuration experience is available in [public developer preview](../../resources/dev-preview/developer-preview-intro.md).
> * Bot configuration experience is supported in channel or group chat scopes only.

It's designed to quickly run a bot configuration based sample on your computer's localhost.

## Set up your development environment

To get started, ensure that you have the following tools:

* Microsoft Teams
* [Teams Toolkit](../../../toolkit/install-Teams-Toolkit.md)
* [NodeJS](https://nodejs.org/en/)
* [Microsoft Edge](https://www.microsoft.com/edge) (recommended) or [Google Chrome](https://www.google.com/chrome/)
* [Visual Studio Code](https://code.visualstudio.com/download)
* Dev tunnel is available in Visual Studio 2022 version 17.7.0 or later. <br> or </br> You can also use [ngrok](https://ngrok.com/download) as a tunnel to connect your development system to Teams. It isn't required for apps that only include tabs. This package is installed within the project directory (using npm devDependencies).

## Build and run the sample app

1. Go to the [sample](https://github.com/OfficeDev/Microsoft-Teams-Samples/tree/v-harikrishnan/bot-configuration-app/samples/bot-configuration-app/nodejs).

1. Clone the repository to test the sample app.

   ```bash
   git clone https://github.com/OfficeDev/Microsoft-Teams-Samples.git
   ```

1. Run the following command to go to the app folder:

   ```bash
   cd samples/bot-configuration-app/nodejs
   ```

1. Go to **Visual Studio Code**.

1. Select **Open a folder**, browse to the folder where bot configuration sample is available and then select **Select folder**.

1. From the left pane, select **Teams Toolkit**.

1. Under **ACCOUNTS**, sign in to the following:
   * **Microsoft 365 account**
   * **Azure account**

1. To debug your app, enter **F5**.

   A browser tab opens a Teams web client requesting to add the bot to your tenant.

1. Select **Add**.

   :::image type="content" source="../../../assets/images/bots/Conversation-AI-sample-app-add.png" alt-text="Screenshot shows the add option in Teams web client.":::

   A chat window opens.

1. In the message compose area, @mention **TeamsChef-local** to invoke the bot and chat in a plain language.

   :::image type="content" source="../../../assets/images/bots/conversation-AI-quick-start-final.png" alt-text="Screenshot shows an example of conversation with Teams chef bot in Teams.":::

   The bot uses the text-davinci-003 model to chat with Teams users and respond in a polite and respectful manner, staying within the scope of the conversation.

> [!NOTE]
> If you're building a bot for the first time, it's recommended to use Teams Toolkit extension for Visual Studio code to build a bot, see [Build your first bot app using JavaScript](../../../sbs-gs-bot.yml).

## Next step

> [!div class="nextstepaction"]
> [Build your first bot using Teams AI library](../../../sbs-botbuilder-conversation-AI.yml)
