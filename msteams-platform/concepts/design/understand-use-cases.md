---
title: Understanding your app's use cases and Teams features
author: heath-hamilton
description: Plan your app, understand your user and their need, understand the user problems that your app would solve, plan user authentication and their onboarding experience
ms.topic: conceptual
ms.localizationpriority: medium
ms.author: anclear
---

# Use cases and Teams features

In the collaborative social framework of Teams, there is a wide variety of user needs that you can solve with a Teams app. For instance, an app that bridges gap in achieving effective collaboration is a great fit.

The app user and their need are the basic guidelines that determine all app choices you'll make. Building app design, selecting capabilities, determining build and test environment, and app distribution follow the user's requirement from the app.

## Understand your use cases

If you're going to meet user needs with your app, you first need to understand them.

- **Understand your user**: Understand who your user is and you can identify the right distribution model. It helps you to identify how users use Teams.

- **Understand the problem**: Every app has a core problem or a need to solve. Before you start building an app, you need to identify the user need. You can solve wide variety of problems, provided you understand which one you're trying to solve.

- **Consider integration**: Identify the apps and services your app requires, such as authentication, Microsoft Graph, or web apps.

## Microsoft Teams app features

There are multiple ways to extend Teams so every app is unique. A Teams app can manifest itself to a user in different ways. Teams app features include:

- [App capabilities](#app-capabilities)
- [App scope](#app-scope)

For example, a user can interact with an app on a canvas tab to do an activity or might choose to do the same using a conversational bot.

These capabilities can exist across different scopes. For example, your app can display data in a central shared location, that is, the tab, and present that same information through a personal conversational interface, that is, the bot.

### App capabilities

To be able to extend your app, you must understand all the core capabilities and the entry points that work in a collaborative space. You can experiment with the extension points for building your apps. Important app project components help you to correctly configure your app page.

Your Teams apps have one or all of the following core capabilities:

:::row:::
   :::column span="":::

#### Personal apps

A [personal app](../../concepts/design/personal-apps.md) is a dedicated space or bot to help users focus on their own tasks or view activities important to them.

   :::column-end:::

   :::column span="":::

:::image type="content" source="../../assets/images/overview-personal-apps-2021.png" alt-text="Conceptual representation of what personal apps look like in the Teams client." border="false":::

   :::column-end:::

:::row-end:::

:::row:::
   :::column span="":::

#### Tabs

Display your web-based content in a [tab](../../tabs/what-are-tabs.md) where people can discuss and work on it together.

   :::column-end:::

   :::column span="":::

:::image type="content" source="../../assets/images/overview-channel-chat-apps-2021.png" alt-text="Conceptual representation of what tabs look like in the Teams client." border="false":::

   :::column-end:::

:::row-end:::

:::row:::
   :::column span="":::

#### Bots

Conversations often result in the need to do something (generate an order, review my code, check ticket status, and so on). A [bot](../../bots/what-are-bots.md) can kick off these kinds of workflows right inside Teams.

   :::column-end:::

   :::column span="":::

:::image type="content" source="../../assets/images/overview-bots-2021.png" alt-text="Conceptual representation of what bots look like in the Teams client." border="false":::

   :::column-end:::

:::row-end:::

:::row:::

   :::column span="":::

#### Messaging extensions

With [messaging extensions](../../messaging-extensions/what-are-messaging-extensions.md), you can quickly share external information in a conversation. You also can act on a message, such as creating a help ticket based on the content of a channel post.

   :::column-end:::

   :::column span="":::

:::image type="content" source="../../assets/images/overview-messaging-extensions-2021.png" alt-text="Conceptual representation of what messaging extensions look like in the Teams client." border="false":::

   :::column-end:::
:::row-end:::

:::row:::

   :::column span="":::

#### Meeting extensions

There are a few options for [incorporating your app into the Teams calling experience](../../apps-in-teams-meetings/design/designing-apps-in-meetings.md).

   :::column-end:::

   :::column span="":::

:::image type="content" source="../../assets/images/overview-meeting-extensions-2021.png" alt-text="Conceptual representation of what meeting extensions look like in the Teams client." border="false":::

   :::column-end:::
:::row-end:::

:::row:::

   :::column span="":::

#### Webhooks and connectors

[Incoming webhooks](../../webhooks-and-connectors/what-are-webhooks-and-connectors.md#incoming-webhooks) are a simple way to automatically send notifications from another app to a Teams channel. With [outgoing webhooks](../../webhooks-and-connectors/what-are-webhooks-and-connectors.md#outgoing-webhooks), message your web service with an @mention.

   :::column-end:::

   :::column span="":::

:::image type="content" source="../../assets/images/overview-connectors.png" alt-text="Conceptual representation of what connectors look like in the Teams client." border="false":::

   :::column-end:::
:::row-end:::

:::row:::

   :::column span="":::

#### Microsoft Graph for Teams

The [Microsoft Graph API for Teams](/graph/teams-concept-overview) provides access to information about teams, channels, users, and messages that can help you create or enhance features for your app (such as rich notifications).

   :::column-end:::

   :::column span="":::

:::image type="content" source="../../assets/images/overview-graph.png" alt-text="Conceptual representation of the Microsoft Graph API for Teams." border="false":::

   :::column-end:::
:::row-end:::

### App scope

You can choose app scope from the following:

- **Personal app experience**: A personal app is a dedicated space or bot to help users focus on their own tasks or view activities important to them.
- **Shared app experience**: Team, channel, and chat are collaboration spaces. Apps in these contexts are available to everyone in that space. Collaboration spaces typically focus on workflows for your app's interactions or unlocking new social interactions.

## Next step

> [!div class="nextstepaction"]
> [Map your use cases](../../concepts/design/map-use-cases.md)

## See also

[Device capabilities](~/concepts/device-capabilities/device-capabilities-overview.md)
