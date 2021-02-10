---
title: Universal bot action model
description: Understand universal bot action model.
ms.topic: conceptual
---

# Universal bot action model

A universal bot action model is a model that makes adaptive cards available across different platforms like Outlook, Teams, WebChat, Cortana, Timeline, and your applications through one `Action.Execute` command. Layout and rendering were already provided universally but now action handling is also provided.

Adaptive cards are a combination of content such as text and graphics, and actions that can be performed by a user. As a developer you can add adaptive cards to a conversation through a bot or messaging extension. Adaptive cards are cross-platform and cross-app snippets of UI, authored using a lightweight JSON format, that apps and services can share. For more information, see [adaptivecards.io](http://adaptivecards.io/).

## Overview

The universal bot action model provides the following:
* The generalization of bots and the Bot Framework as the way to implement adaptive card-based scenarios for both Teams and Outlook.
* `Action.Execute` replaces both `Action.Submit` used by bots and `Action.Http` used by actionable messages.
* Popular features only supported by actionable messages made available to bots, namely:
    * The ability for a card to be refreshed at the time it is displayed.
    * The ability for `Action.Execute` actions to return an updated card to be immediately displayed in the client.

For more information, see [actionable message documentation](https://docs.microsoft.com/en-us/outlook/actionable-messages/send-via-email).

>[!NOTE]
> If you are already using adaptive cards on Teams with bot, you can use the same bot with a few changes to support `Action.Execute`. If you are using actionable messages on Outlook, you will need to develop a bot that supports `Action.Execute`.

### Enhancements

Universal bot action model leverages the full Bot Framework stack, with the following enhancements:
* Support the adaptiveCard/action Invoke activity.
    * Do not support chat like conversational experiences.
    * All user interactions happen within the confines of a single area on the screen.
* Implement a synchronous model.
    * When a user takes an action from within the card, that action is executed synchronously and the card waits for the response to be returned.
    * The channel that accepted the card in the first place is responsible for allowing or disallowing the bot to send updates to the card, as is appropriate for that channel.
* Client runtimes and channels operate over HTTP only. This simplifies implementation, both on the client and server, while addressing the vast majority of needs.
* Is Implemented using the existing bot builder SDKs. Developers can reuse their code. The main difference is they can only use adaptiveCard/action Invoke activities for their bots to be universal.

## Schema for universal bot action model

The universal bot action model is introduced in the adaptive cards schema version 1.4. To use these new capabilities, the adaptive card `version` property must be set to 1.4 or higher.

Note: Setting the adaptive card `version` property to 1.4 or higher will make your adaptive card incompatible with older clients such as Outlook or Teams that do not support the universal bot action model.

If you use the `refresh` property and `Action.Execute` and specify a card version less than 1.4, the following will happen:

