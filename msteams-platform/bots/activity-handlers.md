---
title: Activity handlers in a bot app
author: surbhigupta
description: Description for bot activity handlers
ms.topic: overview
ms.localizationpriority: high
ms-author: surbhigupta
ms.date: 01/29/2023
---

# Bot activity handlers

This document builds on the article on [how bots work](/azure/bot-service/bot-builder-basics?view=azure-bot-service-4.0&preserve-view=true) in the core [Bot Framework documentation](/azure/bot-service/?view=azure-bot-service-4.0&preserve-view=true). The primary difference between bots developed for Microsoft Teams and the core Bot Framework is in the features provided in Teams.

An activity handler is used to organize the conversational logic for your bot. Activities are handled in two ways using Teams activity handlers and bot logic. The Teams activity handler adds support for Teams-specific events and interactions. The bot object contains the conversational reasoning or logic for a turn and exposes a turn handler, which is the method that can accept incoming activities from the bot adapter.

## Teams activity handlers

Teams activity handler is derived from Microsoft Bot Framework's activity handler. It routes all Teams activities before allowing any non-Teams specific activities to be handled.

When a bot for Teams receives an activity, it's routed to the activity handlers. All activities are routed through one base handler called the turn handler. The turn handler calls the required activity handler to manage any activity received. The Teams bot is derived from `TeamsActivityHandler` class, which is derived from the Bot Framework's `ActivityHandler` class.

> [!NOTE]
> If the bot activity takes more than 15 seconds to process, Teams send a retry request to bot endpoint. Hence, you'll see duplicate requests in your bot.
