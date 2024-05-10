---
title: Suggested prompts for bot
author: v-npaladugu
description: Learn how to create and handle a prompt starter and suggested actions for your Microsoft Teams bot.
ms.topic: how-to
ms.localizationpriority: medium
ms.author: anclear
---

# Suggested prompts for bot

Suggested prompts are commands that are presented to the users in the Microsoft Teams chat when they install your bot app. 

A key challenge users face when starting a conversation with bots is to understand how to interact with them. This challenge is more often with the bots that use AI library as users might not be familiar with their conversational nature or the different set of functionalities. So, it's important to help users onboard and explore how to use your bot.

Suggested prompts create an engaging and insightful user experience and helps your bot acquire and retain users. Users can discover the value of your bot through prompt conversations. There are two types of suggested prompts:

* [Prompt starters](#prompt-starters): Prompt starters help users start a conversation with your bot.
* [Suggested actions](#suggested-actions): Suggested actions help users continue conversations with your bot.

## Prompt starters

Prompt starters help users start conversations with your bot with prompts available in the chat window. Prompt starters are sourced from the [command menu](~/bots/how-to/create-a-bot-commands-menu.md) in your bot's app manifest. When the user selects a command in the prompt starter, the title of the command is populated into the compose box. Post initial conversation the commands are available in the **View prompts** option above the compose box.

>[!NOTE]
> Ensure that the bot doesn't send a welcome message for prompt starter. The prompts aren't displayed for the initial conversation if your bot sends a welcome message. 

# [Desktop](#tab/desktop)

* One-on-one conversation

  :::image type="content" source="~/assets/images/bots/prompt-starter-desktop.png" alt-text="Screenshot that shows the Prompt Starter in desktop.":::

* Group chat or channels
  
  **{WIP}**
  

# [Mobile](#tab/mobile)

:::image type="content" source="~/assets/images/bots/prompt-starter-mobile.png" alt-text="Screenshot that shows the Prompt Starter and View Prompts in mobile.":::

* * *

## Suggested actions

> [!Note]
> Suggested actions are currently available only in personal chat.

Suggested actions are a way to help users continue their conversation with your bot. They give users some ideas of what to ask next, based on the previous response or conversation. Suggested actions can be prompts that go deeper into the previous answer, ask for more details to get a better answer, or switch to a related conversation.

Your bot should offer context-specific suggestions to the user, rather than generic or fixed ones. You can use your bot’s large language model (LLM) to generate up to three possible suggestions along with its responses. Then, you can extract these suggestions and present them as options for the user to choose. For  more information, see [suggested actions.](~/bots/how-to/conversations/conversation-messages.md#send-suggested-actions)

:::image type="content" source="~/assets/images/Cards/suggested-actions.png" alt-text="Bot suggested actions" border="true":::