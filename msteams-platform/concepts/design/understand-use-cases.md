---
title: Understanding your app's use cases and Teams features
author: heath-hamilton
description: Learn about Microsoft Teams app capabilities such as, tabs, bots, meeting extensions, message extensions, webhook connectors, personal app experience, and shared app experience.
ms.topic: conceptual
ms.localizationpriority: high
ms.author: anclear
---

# Understand your use cases

In the collaborative social framework of Teams, there's a wide variety of user needs that you can solve with a Teams app. For example, an app that bridges gap in achieving effective collaboration is a great fit.

The app user and their app's requirements are the basic guidelines that determine all app choices you'll make. Building app design, selecting capabilities, determining build and test environment, and app distribution follow the user's requirement from the app.

If you're going to meet user requirements with your app, you first need to understand them.

* **Understand your user**:
  * Recognize user issues and identify the solutions to some common problems the users face.
  * Build your Teams app by finding the right combination of Teams features to meet your user's needs.
  * Understand use cases to know how an end-user interacts with your app.
  * It's recommended to go through the learn module [how to publish your app to Teams app store](/training/modules/microsoft-teams-publish-app-to-store/) to help with your app to pass the Microsoft Teams store submission process.

* **Understand the problem**: Work out the core problem your app must solve.

* **Consider integration**: Identify the apps and services your app requires, such as authentication, Microsoft Graph, or web apps.

## Microsoft Teams app features

There are multiple ways to extend Teams so every app is unique. Teams app features offer:

* [App capabilities](#app-capabilities)
* [App scope](#app-scope)

### App capabilities

Capabilities are the core functionalities that you can build in your app. They're also called entry or extension points because they enable integration and interaction.

Your Teams apps have one or all of the following core capabilities:

:::row:::
   :::column span="":::

#### Personal apps

A [personal app](../../concepts/design/personal-apps.md) is a dedicated space or bot to help users focus on their own tasks or view relevant activities.

   :::column-end:::

   :::column span="":::

:::image type="content" source="../../assets/images/overview-personal-apps-2021.png" alt-text="Conceptual representation of what personal apps look like in the Teams client.":::

   :::column-end:::

:::row-end:::

:::row:::
   :::column span="":::

#### Tabs

Display your web-based content in a [tab](../../tabs/what-are-tabs.md) where people can discuss and work on it together.

   :::column-end:::

   :::column span="":::

:::image type="content" source="../../assets/images/overview-channel-chat-apps-2021.png" alt-text="Conceptual representation of what tabs look like in the Teams client.":::

   :::column-end:::

:::row-end:::

:::row:::
   :::column span="":::

#### Bots

Conversations often result in the need to do something (generate an order, review code, check ticket status, and so on). A [bot](../../bots/what-are-bots.md) can kick off these kinds of workflows right inside Teams.

   :::column-end:::

   :::column span="":::

:::image type="content" source="../../assets/images/overview-bots-2021.png" alt-text="Conceptual representation of what bots look like in the Teams client.":::

   :::column-end:::

:::row-end:::

:::row:::

   :::column span="":::

#### Message extensions

With [message extensions](../../messaging-extensions/what-are-messaging-extensions.md), you can search and share external information. You also can act on a message, such as creating a help ticket based on the content of a channel post.

   :::column-end:::

   :::column span="":::

:::image type="content" source="../../assets/images/overview-messaging-extensions-2021.png" alt-text="Conceptual representation of what message extensions look like in the Teams client.":::

   :::column-end:::
:::row-end:::

:::row:::

   :::column span="":::

#### Meeting extensions

There are a few options for [incorporating your app into the Teams calling experience](../../apps-in-teams-meetings/design/designing-apps-in-meetings.md).

   :::column-end:::

   :::column span="":::

:::image type="content" source="../../assets/images/overview-meeting-extensions-2021.png" alt-text="Conceptual representation of what meeting extensions look like in the Teams client.":::

   :::column-end:::
:::row-end:::

:::row:::

   :::column span="":::

#### Webhooks and connectors

[Incoming Webhooks](../../webhooks-and-connectors/what-are-webhooks-and-connectors.md#incoming-webhooks) are a simple way to automatically send notifications from another app to a Teams channel. With [Outgoing Webhooks](../../webhooks-and-connectors/what-are-webhooks-and-connectors.md#outgoing-webhooks), you can message your web service with an @mention.

   :::column-end:::

   :::column span="":::

:::image type="content" source="../../assets/images/overview-connectors.png" alt-text="Conceptual representation of what connectors look like in the Teams client.":::

   :::column-end:::
:::row-end:::

:::row:::

   :::column span="":::

#### Microsoft Graph for Teams

The [Microsoft Graph API for Teams](/graph/teams-concept-overview) provides access to information about teams, channels, users, and messages that help you to create or enhance features for your app.

   :::column-end:::

   :::column span="":::

:::image type="content" source="../../assets/images/overview-graph.png" alt-text="Conceptual representation of the Microsoft Graph API for Teams.":::

   :::column-end:::
:::row-end:::

> [!NOTE]
> Teams store has evolved:
>
> Previously, the LOB apps were updated by selecting the ellipses on the tile. With the updated Teams store experience, you can now update the LOB apps by logging in to the [Teams Admin Centre](https://admin.teams.microsoft.com).

### App scope

Your app can have one of the following scopes:

* **Personal app experience**: A personal app is a dedicated space or bot to help users focus on their own tasks or view activities important to them.
* **Shared app experience**: Team, channel, and chat are collaboration spaces. Apps in these contexts are available to everyone in that space. Collaboration spaces typically focus on workflows for your app's interactions or unlocking new social interactions.

An app can exist across different scopes. For example:

* Your app can display data in a central shared location, that is, a tab.
* It can also present that same information through a personal conversational interface, that is, a bot.

A user can interact with an app on a canvas tab to do an activity or might choose to do the same using a conversational bot.

## Next step

> [!div class="nextstepaction"]
> [Map your use cases](../../concepts/design/map-use-cases.md)

## See also

* [Plan your app with Teams features](../app-fundamentals-overview.md)
* [Build bots for Teams](../../bots/what-are-bots.md)
* [Build tabs for Teams](../../tabs/what-are-tabs.md)
* [Build meeting extensions for Teams](../../apps-in-teams-meetings/design/designing-apps-in-meetings.md)
* [Webhooks and connectors](../../webhooks-and-connectors/what-are-webhooks-and-connectors.md)
* [Apps for Teams meetings and calls](../../apps-in-teams-meetings/teams-apps-in-meetings.md)
* [Build Adaptive Cards](../../task-modules-and-cards/cards/cards-reference.md#adaptive-card)
* [Teams app planning checklist](planning-checklist.md)
