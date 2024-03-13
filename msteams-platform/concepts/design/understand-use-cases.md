---
title: Understanding your app's use cases and Teams features
author: heath-hamilton
description: Learn about Microsoft Teams app capabilities such as, tabs, bots, meeting extensions, message extensions, webhook connectors, personal app experience, and shared app experience.
ms.topic: conceptual
ms.localizationpriority: high
ms.author: anclear
ms.date: 12/09/2022
---

# Understand and map your use cases

The user's requirements are the basic guidelines that determine all app choices you'll make, such as building app design, selecting capabilities, determining build and test environment, and app distribution.

If you're going to meet user requirements with your app, you first need to understand your users.

* **Understand your user**: Recognize user issues and identify the solutions to some common problems the users face.
* **Understand the problem**: Work out the core problem your app must solve. Understand use cases to know how an end-user interacts with your app.
* **Consider integration**: Identify the apps and services your app requires, such as authentication, Microsoft Graph, or web apps.
* **Publish to reach user**: Go through [how to publish your app to Microsoft Teams Store](/training/modules/microsoft-teams-publish-app-to-store/) to ensure your app passes the Teams Store submission process.

A well-defined use case helps you to chart out the framework of features you want in the Teams app. After you determine the user requirements, define the scope and Teams capabilities best suited for your app.

You can map your use case based on:

* Sharing and collaborating on items in an external system.
* Starting workflows and sending notifications to users.
* Using social platforms, conversational bots, and combining multiple features.

## Microsoft Teams app features

There are multiple ways to extend Teams so every app is unique. Teams app features offer:

* [App capabilities](#app-capabilities)
* [App scope](#app-scope)

### App capabilities

Capabilities are the core functionalities that you can build in your app. They're also called entry or extension points because they enable integration and interaction.

Your Teams apps have one or all of the following core capabilities:

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

#### Workflows

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

### App capabilities mapped to features

The Microsoft Teams platform offers a large variety of features. Each feature is a way of interacting with your users that makes the Teams app capability relevant to the user need.

Let's look at how Teams capabilities enable different features for your Teams app.

:::row:::
      :::image type="content" source="~/assets/images/overview/flowchart-tab.png" alt-text="Diagram shows Microsoft Teams app capabilities for tab." link="~/tabs/what-are-tabs.md" border="false":::
:::row-end:::
 
:::row:::
      :::image type="content" source="~/assets/images/overview/flowchart-bot.png" alt-text="Diagram shows Microsoft Teams app capabilities for bot." link="~/bots/what-are-bots.md" border="false":::
:::row-end:::
 
:::row:::
      :::image type="content" source="~/assets/images/overview/flowchart-message-extension.png" alt-text="Diagram shows Microsoft Teams app capabilities for message extension." link="~/messaging-extensions/what-are-messaging-extensions.md" border="false":::
:::row-end:::
 
:::row:::
      :::image type="content" source="~/assets/images/overview/flowchart-adaptive-card.png" alt-text="Diagram shows Microsoft Teams app capabilities for adaptive cards." link="~/task-modules-and-cards/cards/cards-reference.md#adaptive-card" border="false":::
:::row-end:::
 
:::row:::
      :::image type="content" source="~/assets/images/overview/flowchart-apps-for-meetings.png" alt-text="Diagram shows Microsoft Teams app capabilities for meetings." link="~/apps-in-teams-meetings/teams-apps-in-meetings.md" border="false":::
:::row-end:::
 
:::row:::
      :::image type="content" source="~/assets/images/overview/flowchart-webhook-and-connectors.png" alt-text="Diagram shows Microsoft Teams app capabilities for webhooks and connectors." link="~/webhooks-and-connectors/what-are-webhooks-and-connectors.md" border="false":::
:::row-end:::
 
:::row:::
      :::image type="content" source="~/assets/images/overview/flowchart-graph-conversational-interface.png" alt-text="Diagram shows Microsoft Teams app capabilities for graph conversational interface." link="/graph/overview" border="false":::
:::row-end:::

> [!NOTE]
> You can also explore the capability to add meeting app extensibility to your Teams app. For more information, see [apps for Teams meetings and calls](../../apps-in-teams-meetings/teams-apps-in-meetings.md).

### Common use cases mapped to Teams capabilities

The next step is to match use cases with app capabilities.

Here's a list of common user scenarios mapped to Teams capabilities. It isn't an exhaustive list, but helps you think through some of the possibilities available to you.
</br>
</br>
<details>
<summary>Create, share, and collaborate on items in an external system.</summary>

Apps to interact with your data

| **If you want to...** | **Try ...** |
| --- | --- |
| Search external systems and share the results as an interactive card. | Message extensions with search commands |
| Collect information to insert into a data store or run advanced searches. | Message extensions with action commands |
| Create embedded web experiences to view, work with and share data. | Tabs |
| Push data and send data out of the Teams client. | Workflows|
| Interactive modal forms from wherever you need them to collect or display information. | Dialogs (referred as task modules in TeamsJS v1.x) |

</details>
</br>
<details>
<summary>Initiate workflows and processes.</summary>

A quick way to start a process or workflow in an external system.

| **If you want to...** | **Try ...** |
| --- | --- |
| Trigger messages, allowing your users to quickly send the contents of a message to your web services. | Message extensions with action commands |
| Open messages from a tab, a bot, or a message extension to collect information before initiating a workflow. | Dialogs (referred as task modules in TeamsJS v1.x) |
| Interact with your users through text and rich cards. | Conversational bots |
| A simple back-and-forth interaction when you don't need to build a conversational bot. | Outgoing webhooks |

</details>
</br>
<details>
<summary>Send notifications and alerts.</summary>

Send asynchronous notifications and alerts to your users in Teams.

| **If you want to...** | **Try ...** |
| --- | --- |
| Send proactive messages to groups, channels, or individual users. | Conversational bots |
| Permit a channel to subscribe to receive messages. A connector lets users tailor the subscription with a configuration page. | Workflows |

</details>
</br>
<details>
<summary>Ask questions and get answers.</summary>

Connect with your users and resolve their queries.

| **If you want to...** | **Try ...** |
| --- | --- |
| Use a bot powered by AI, natural language processing, or machine learning to connect your users to the answers they need. | Conversational bots |
| Embed your existing web portal in Teams or create a Teams-specific version for added functionality. | Tabs |

</details>

> [!NOTE]
> Previously, custom apps built for your org (LOB apps) were updated  in the Teams Store by selecting the ellipses on the tile. With the updated Teams Store experience, you can now update the custom apps built for your org (LOB apps) by signing in to the [Teams Admin Center](https://admin.teams.microsoft.com).

### App scope

Your app can have one of the following scopes:

* **Personal app experience**: A personal app is a dedicated space or bot to help users focus on their own tasks or view activities important to them.
* **Shared app experience**: Team, channel, and chat are collaboration spaces. Apps in these contexts are available to everyone in that space. Collaboration spaces typically focus on workflows for your app's interactions or unlocking new social interactions.

An app can exist across different scopes. For example:

* Your app can display data in a central shared location, that is, a tab.
* It can also present that same information through a personal conversational interface, that is, a bot.

## See also

* [Plan your app with Teams features](../app-fundamentals-overview.md)
* [Build bots for Teams](../../bots/what-are-bots.md)
* [Build tabs for Teams](../../tabs/what-are-tabs.md)
* [Build meeting extensions for Teams](../../apps-in-teams-meetings/design/designing-apps-in-meetings.md)
* [Webhooks and connectors](../../webhooks-and-connectors/what-are-webhooks-and-connectors.md)
* [Apps for Teams meetings and calls](../../apps-in-teams-meetings/teams-apps-in-meetings.md)
* [Build Adaptive Cards](../../task-modules-and-cards/cards/cards-reference.md#adaptive-card)
* [Teams app planning checklist](planning-checklist.md)
