---
title: Teams AI library quick start guide
author: surbhigupta
description:  In this module, learn how to quickly try the Teams AI library.
ms.topic: conceptual
ms.localizationpriority: high
ms.author: v-ypalikila
ms.date: 04/07/2022
---

# Teams AI library quick start guide

Get started with Teams AI library using the ChefBot sample. It's designed to quickly run a Teams AI library based sample on your computer's localhost.

## Set up your development environment

To get started, ensure that you have the following tools:

* Microsoft Teams
* [Teams Toolkit](../../../toolkit/install-Teams-Toolkit.md)
* [NodeJS](https://nodejs.org/en/)
* [OpenAI](https://openai.com/api/) key
* Global Administrator access to a [Microsoft 365 tenant](https://developer.microsoft.com/microsoft-365/dev-program?ocid=MSlearn&WT.mc_id=m365-16105-cxa) and [Enable custom Teams apps and turn on custom app uploading](../../../concepts/build-and-test/prepare-your-o365-tenant.md#enable-custom-teams-apps-and-turn-on-custom-app-uploading)

> [!NOTE]
> If you're building a bot for the first time, it's recommended to use Teams Toolkit extension for Visual Studio code to build a bot, see [Build your first bot app using JavaScript](../../../sbs-gs-bot.yml).

## Build and run the sample app

1. Go to the [sample](https://github.com/microsoft/teams-ai/tree/main/js/samples).

1. Clone the repository to test the sample app.

   ```bash
   git clone https://github.com/microsoft/teams-ai.git
   ```

1. Run the following command to go to the app folder:

   ```bash
   cd samples/js/samples/04.ai.a.teamsChefBot
   ```

1. Update the **SECRET_OPENAI_API_KEY** in the `.env.local.user` configuration file.

   ```text
    SECRET_OPENAI_API_KEY=<your OpenAI key>
   ```

1. Go to **Visual Studio Code**.

1. Select **Open a folder**, browse to the folder where ChefBot is available and select **Select folder**.

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
> If you're building a bot for the first time, it's recommended to use Teams Toolkit extension for Visual Studio code to [build a bot](../../../sbs-gs-bot.yml).

## Next step

> [!div class="nextstepaction"]
> [Build your first bot using Teams AI library](../../../sbs-botbuilder-conversation-AI.yml)
