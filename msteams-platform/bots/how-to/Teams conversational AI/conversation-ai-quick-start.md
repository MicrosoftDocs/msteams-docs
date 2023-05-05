---
title: Conversation AI quick start guide
author: surbhigupta
description:  In this module, learn how to quickly try the Teams conversational AI SDK.
ms.topic: conceptual
ms.localizationpriority: high
ms.author: v-ypalikila
ms.date: 04/07/2022
---

# Conversation AI quick start guide

Get started with Teams conversation AI SDK using the ChefBot sample. It's designed to quickly run a Teams conversation AI library based sample on your computer's localhost.

## Set up your development environment

To get started, install:

* Microsoft Teams.
* [Teams Toolkit](../../../toolkit/install-Teams-Toolkit.md)
* [NodeJS](https://nodejs.org/en/)
* [OpenAI](https://openai.com/api/) key to leverage GPT.
* Global Administrator access to a [Microsoft 365 tenant](https://developer.microsoft.com/microsoft-365/dev-program?ocid=MSlearn&WT.mc_id=m365-16105-cxa) and enable [upload a Teams custom apps](../../../concepts/build-and-test/prepare-your-o365-tenant.md#enable-custom-teams-apps-and-turn-on-custom-app-uploading?WT.mc_id=m365-84637-cxa).

## Build and run the sample app

1. Go to the [sample](https://github.com/microsoft/botbuilder-m365/tree/main/js/samples/04.ai.a.naturalLanguage.santaBot).

1. Clone the repository to test the sample app.

   ```bash
   git clone <https://github.com/Microsoft/botbuilder-m365.git>
   ```

1. Run the following command to go to the app folder:

   ```bash
   cd samples/js/samples/AITeamsChefBotTTK 
   ```

1. Update the **SECRET_OPENAI_API_KEY** in the `.env.local.user` configuration file.

   ```text
    SECRET_OPENAI_API_KEY=<your OpenAI key>
   ```

1. Go to Visual Studio Code.

1. Select **Open a folder**, browse to the folder where ChefBot is available and select **Select folder**.

1. From the left pane, select **Teams Toolkit**.

1. Under **ACCOUNTS**, sign in to the following:
   * Microsoft 365 account
   * Azure account

1. To debug your app, enter **F5**.

   A browser tab opens a Teams web client requesting to add the app to your tenant.

1. Select **Add**.

   :::image type="content" source="../../../assets/images/bots/Conversation-AI-sample-app-add.png" alt-text="Screenshot shows the add option in Teams web client.":::

   A chat window opens.

1. You can @mention the bot to invoke the Chef bot and chat in a plain language.

   The bot uses the text-davinci-003 model to chat with Teams users and respond in a polite and respectful manner, staying within the scope of the conversation. This is possible due to the skprompts.txt file's contents.
