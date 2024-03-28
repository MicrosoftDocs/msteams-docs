---
title: Understanding your app's use cases and Teams features
author: heath-hamilton
description: Learn how to understand and map Microsoft Teams app capabilities such as message extensions, tabs, bots, and more to build your app.
ms.topic: conceptual
ms.localizationpriority: high
ms.author: anclear
ms.date: 12/09/2022
---

# Understand and map your use cases

The user's requirements determine all app choices you make, such as building app design, selecting capabilities, determining build and test environment, and app distribution.

To identify your app's use case:

* **Understand your user**: Recognize user issues and identify the solutions to some common problems the users face.
* **Understand the problem**: Work out the core problem your app must solve. Understand use case scenarios to know how a user interacts with your app to solve their problems.
* **Consider integration**: Identify the apps and services your app requires, such as authentication, Microsoft Graph, or web apps.
* **Publish for reach**: Go through [how to publish your app to Microsoft Teams Store](/training/modules/microsoft-teams-publish-app-to-store/) to ensure your app passes the Teams Store submission process.

A well-defined use case helps you to chart out the framework of features you want in the Teams app. After you determine the user requirements, define the scope and Teams capabilities best suited for your app.

You can map your use case based on:

* Sharing and collaborating on items in an external system.
* Starting workflows and sending notifications to users.
* Using social platforms, conversational bots, and combining multiple features.

## Microsoft Teams app features

Every Teams app built on the platform have the following features:

* [App capabilities](#app-capabilities)
* [App scope](#app-scope)

### App capabilities

App capabilities are the core functionalities that you can build in your app. They also act as entry or extension points to enable integration and interaction. For more information, see [Explore Teams platform features](../../overview-explore.md).

#### App capabilities mapped to features

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

Here's a list of common user scenarios mapped to Teams capabilities. It isn't an exhaustive list, but helps you think through some of the possibilities available to you.
</br>
</br>
<details>
<summary>Create, share, and collaborate on items in an external system.</summary>

Apps to interact with your data.

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

* **Personal app**: A personal app is a dedicated space or bot to help users focus on their own tasks or view activities important to them.
* **Shared app**: Team, channel, and chat are collaboration spaces. Apps in these contexts are available to everyone in that space. Collaboration spaces typically focus on workflows for your app's interactions or unlocking new social interactions.

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