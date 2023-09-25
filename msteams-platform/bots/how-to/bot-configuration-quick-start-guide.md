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
* [[Teams Toolkit](../../../toolkit/install-Teams-Toolkit.md)]
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

1. From the dropdown next to **Add**, select **Add to a team**, **Add to a chat**, or **Add to a meeting**.

   :::image type="content" source="../../assets/images/bots/group-chat-add-Bot.png" alt-text="Screenshot shows add your bot to chat.":::

1. Enter the name of a person or chat in the search field.

   :::image type="content" source="../../assets/images/bots/add-bot-to-chat.png" alt-text="Screenshot shows bot added to a chat.":::

1. Select **Set up a bot**.

   :::image type="content" source="../../assets/images/bots/set-up-a-bot.png" alt-text="Screenshot shows set up a bot in chat.":::

   The bot is installed in the chat.

## See also

[Bot configuration experience](bot-configuration-experience.md)
