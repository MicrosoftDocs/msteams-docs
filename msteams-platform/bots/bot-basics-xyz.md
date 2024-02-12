---
title: Bot activity handlers
author: surbhigupta
description: Learn about Microsoft Teams events and activity handlers for messages, channels, teams, members, mentions, auth, card actions using Microsoft Bot Framework SDK.
ms.topic: conceptual
ms.localizationpriority: medium
ms.author: anclear
ms.date: 01/22/2023
---



# Understanding and Implementing Bot Activity Handlers in Microsoft Teams

Welcome to the comprehensive guide on Bot Activity Handlers in Microsoft Teams. This document provides an in-depth understanding of how bots work in Microsoft Teams, focusing on the unique features that Microsoft Teams offers over the core Bot Framework. 

An activity handler is a key component that manages the conversational flow of your bot. It processes activities in two ways: through Teams-specific activity handlers for Teams-specific events and interactions, and through the bot object for general conversational logic. 

When a bot for Teams receives an activity, it's directed to the appropriate activity handlers. All activities first pass through a base handler, the turn handler, which then calls the specific activity handler needed for the received activity. 

This guide will help you understand how to implement your own logic within Teams-specific activity handlers, and how to handle different types of activities. It's a must-read for developers looking to build or enhance bots for Microsoft Teams. Continue reading to delve deeper into the world of bot activity handlers in Microsoft Teams.

## Bot Activity Handlers in Microsoft Teams

Are you looking to build a bot that can interact effectively with users on Microsoft Teams? Understanding bot activity handlers is key. This guide is designed for developers who are building bots for Microsoft Teams using the Microsoft Bot Framework SDK. 

Bot activity handlers are used to organize the conversational logic for your bot. They handle activities in two ways: Teams activity handlers and bot logic. The Teams activity handler adds support for Teams-specific events and interactions, while the bot object contains the conversational logic for a turn and exposes a turn handler. 

This guide will help you understand how to implement these handlers in your bot, providing code snippets for each handler in C#, JavaScript, and Python. It also explains the different types of activities that can be handled, such as messages, channels, teams, members, mentions, auth, and card actions. 

This information is crucial for developers as it helps them understand how to handle different types of activities in their bot, which is key to creating a bot that can interact effectively with users. It also helps developers understand how to handle Teams-specific events and interactions, which is important for creating bots that can fully leverage the capabilities of Microsoft Teams. 

This guide is applicable to bots developed for Microsoft Teams on all platforms - mobile, desktop, and web.

## Implementing Bot Activity Handlers

### Teams Activity Handlers

Teams activity handler is derived from Microsoft Bot Framework's activity handler. It routes all Teams activities before allowing any non-Teams specific activities to be handled. 

When a bot for Teams receives an activity, it's routed to the activity handlers. All activities are routed through one base handler called the turn handler. The turn handler calls the required activity handler to manage any activity received. 

The Teams bot is derived from `TeamsActivityHandler` class, which is derived from the Bot Framework's `ActivityHandler` class.

### Bot Logic

The bot logic processes incoming activities from one or more of your bot channels and in response generates outgoing activities. It's still true of bots derived from the Teams activity handler class, which first checks for Teams activities. After checking for Teams activities, it passes all other activities to the Bot Framework's activity handler.

## Code Snippets

The guide provides detailed code snippets for implementing Teams activity handlers and bot logic in C#, JavaScript, and Python. These code snippets cover a wide range of activities, including messages, channels, teams, members, mentions, auth, and card actions. 

## Limitations and Best Practices

If the bot activity takes more than 15 seconds to process, Teams send a retry request to bot endpoint. Hence, you'll see duplicate requests in your bot.

## Code Sample

The guide also provides links to code samples that demonstrate how to use different bot conversation events available in Bot Framework v4. These samples are available in C#, Node.js, and Python.

## Next Steps

After reading this guide, you can proceed to learn about [Conversation basics](~/bots/how-to/conversations/conversation-basics.md) in Microsoft Teams.

## See Also

You can also refer to the following resources for more information:

- [Build bots for Teams](what-are-bots.md)
- [Teams JavaScript client SDK](../tabs/how-to/using-teams-client-sdk.md)
- [App manifest schema for Teams](../resources/schema/manifest-schema.md)
- [API reference for the Bot Framework Connector service](/azure/bot-service/rest-api/bot-framework-rest-connector-api-reference)
- [Get Teams specific context for your bot](how-to/get-teams-context.md)
- [Messages in bot conversations](how-to/conversations/conversation-messages.md)
- [Component and waterfall dialogs](/azure/bot-service/bot-builder-concept-waterfall-dialogs) 

## Conclusion

In conclusion, understanding and implementing bot activity handlers is crucial for creating bots that can interact effectively with users on Microsoft Teams. This guide has provided you with the necessary information and code snippets to implement these handlers in your bot. Remember to refer to the provided resources for further information and guidance. Happy coding!
Sequence Diagram Result: ```mermaid
sequenceDiagram
    participant TeamsApp as Teams App
    participant TeamsActivityHandler as Teams Activity Handler
    participant BotFrameworkActivityHandler as Bot Framework Activity Handler
    participant BotLogic as Bot Logic

    TeamsApp->>TeamsActivityHandler: Receives an activity
    TeamsActivityHandler->>TeamsActivityHandler: Checks for Teams specific events
    TeamsActivityHandler->>BotFrameworkActivityHandler: Passes non-Teams specific activities
    BotFrameworkActivityHandler->>BotLogic: Sends activity to Bot Logic
    BotLogic->>TeamsApp: Generates outgoing activities
    Note over TeamsApp,TeamsActivityHandler: If activity takes more than 15 seconds to process, Teams sends a retry request to bot endpoint.
```