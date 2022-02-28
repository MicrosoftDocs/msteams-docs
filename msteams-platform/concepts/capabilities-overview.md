---
title: Understand app features
author: heath-hamilton
description: Description of Teams app capabilities, such as Tabs, Bots, Messaging extensions, and Webhooks and connectors; app scope, such as personal and shared apps
ms.topic: conceptual
ms.localizationpriority: high
ms.author: lajanuar
ms.date: 09/22/2020
keywords: tabs bots messaging extensions webhooks connectors
---

# Understand Microsoft Teams app features

There are multiple ways to extend Teams, so every app is unique. A Teams app can manifest itself to a user in different ways. An Teams app features include:

- App capabilities
- App scope

For example, a user can interact with an app on a canvas tab to do an activity or might choose to do the same using a conversational bot. You can only one capability, such as a webhook, while others have more than one feature to give users various options.

These capabilities can exist across different scopes. For example, your app can display data in a central shared location, that is, the tab and present that same information through a personal conversational interface, that is, the bot.

## App capabilities

To be able to extend your app, you must understand all the core capabilities and the entry points that work in a collaborative space. You can experiment with the extension points for building your apps. Important app project components help you to correctly configure your app page.

Your Teams apps have one or all of the following core capabilities:

:::row:::
   :::column span="":::
### Personal apps

A [personal app](../concepts/design/personal-apps.md) is a dedicated space or bot to help users focus on their own tasks or view activities important to them.

   :::column-end:::

   :::column span="":::

:::image type="content" source="../assets/images/overview-personal-apps-2021.png" alt-text="Conceptual representation of what personal apps look like in the Teams client." border="false":::

   :::column-end:::

:::row-end:::

:::row:::
   :::column span="":::

### Tabs

Display your web-based content in a [tab](../tabs/what-are-tabs.md) where people can discuss and work on it together.

   :::column-end:::

   :::column span="":::

:::image type="content" source="../assets/images/overview-channel-chat-apps-2021.png" alt-text="Conceptual representation of what tabs look like in the Teams client." border="false":::

   :::column-end:::

:::row-end:::

:::row:::
   :::column span="":::

### Bots

Conversations often result in the need to do something (generate an order, review my code, check ticket status, and so on). A [bot](../bots/what-are-bots.md) can kick off these kinds of workflows right inside Teams.

   :::column-end:::

   :::column span="":::

:::image type="content" source="../assets/images/overview-bots-2021.png" alt-text="Conceptual representation of what bots look like in the Teams client." border="false":::

   :::column-end:::

:::row-end:::

:::row:::

   :::column span="":::

### Messaging extensions

With [messaging extensions](../messaging-extensions/what-are-messaging-extensions.md), you can quickly share external information in a conversation. You also can act on a message, such as creating a help ticket based on the content of a channel post.

   :::column-end:::

   :::column span="":::

:::image type="content" source="../assets/images/overview-messaging-extensions-2021.png" alt-text="Conceptual representation of what messaging extensions look like in the Teams client." border="false":::

   :::column-end:::
:::row-end:::

:::row:::

   :::column span="":::

### Meeting extensions

There are a few options for [incorporating your app into the Teams calling experience](../apps-in-teams-meetings/design/designing-apps-in-meetings.md).

   :::column-end:::

   :::column span="":::

:::image type="content" source="../assets/images/overview-meeting-extensions-2021.png" alt-text="Conceptual representation of what meeting extensions look like in the Teams client." border="false":::

   :::column-end:::
:::row-end:::

:::row:::

   :::column span="":::

### Webhooks and connectors

[Incoming webhooks](../webhooks-and-connectors/what-are-webhooks-and-connectors.md#incoming-webhooks) are a simple way to automatically send notifications from another app to a Teams channel. With [outgoing webhooks](../webhooks-and-connectors/what-are-webhooks-and-connectors.md#outgoing-webhooks), message your web service with an @mention.

   :::column-end:::

   :::column span="":::

:::image type="content" source="../assets/images/overview-connectors.png" alt-text="Conceptual representation of what connectors look like in the Teams client." border="false":::

   :::column-end:::
:::row-end:::

:::row:::

   :::column span="":::

### Microsoft Graph for Teams

The [Microsoft Graph API for Teams](/graph/teams-concept-overview) provides access to information about teams, channels, users, and messages that can help you create or enhance features for your app (such as rich notifications).

> [!NOTE]
> Teams store has evolved:
> Previously, the LOB apps were updated by selecting the ellipses on the tile. With the updated Teams store experience, you can now update the LOB apps by logging in to the [Teams Admin Centre](https://admin.teams.microsoft.com).

   :::column-end:::

   :::column span="":::

:::image type="content" source="../assets/images/overview-graph.png" alt-text="Conceptual representation of the Microsoft Graph API for Teams." border="false":::

   :::column-end:::
:::row-end:::

## Choose the correct scope for your app

You can choose app scope from the following:

- Personal app experience: A personal app is a dedicated space or bot to help users focus on their own tasks or view activities important to them.
- Shared app experience: Team, channel, and chat are collaboration spaces. Apps in these contexts are available to everyone in that space. Collaboration spaces typically focus on workflows for your app's interactions or unlocking new social interactions.

## See also

* [Build apps for Teams](../overview.md)
* [Build your first Microsoft Teams app](../build-your-first-app/build-first-app-overview.md)