---
title: Map your use cases to Teams app features and capabilities
author: surbhigupta
description: Identify how your app's use cases can work within the Teams experience, app features, and capabilities; map common use cases with capabilities.
ms.topic: conceptual
ms.localizationpriority: high
ms.author: anclear
ms.date: 12/01/2022
---
# Map your use cases to Teams app features

A well-defined use case helps you to chart out the framework of features you want in the Teams app. After you've determined the user requirements, define the scope and Teams capability best suited for your app.

You can map your use case based on:

* Sharing and collaborating on items in an external system.
* Starting workflows and sending notifications to users.
* Using social platforms, conversational bots, and combining multiple features.

## Common use cases mapped to Teams capabilities

The next step is to match use cases with app capabilities.

Here's a list of common user scenarios mapped to Teams capabilities. It isn't an exhaustive list, but helps you think through some of the possibilities available to you.
</br>
</br>
<details>
<summary>Create, share, and collaborate on items in an external system</summary>

Apps to interact with your data

| **If you want to...** | **Try ...** |
| --- | --- |
| Search external systems and share the results as an interactive card. | Message extensions with search commands |
| Collect information to insert into a data store or run advanced searches. | Message extensions with action commands |
| Create embedded web experiences to view, work with and share data. | Tabs |
| Push data and send data out of the Teams client. | Connectors and webhooks|
| Interactive modal forms from wherever you need them to collect or display information. | Dialogs (referred as task modules in TeamsJS v1.x) |

</details>
</br>
<details>
<summary>Initiate workflows and processes</summary>

A quick way to start a process or workflow in an external system.

| **If you want to...** | **Try ...** |
| --- | --- |
| Trigger messages, allowing your users to quickly send the contents of a message to your web services. | Message extensions action commands |
| Open messages from a tab, a bot, or a message extension to collect information before initiating a workflow. | Dialogs (referred as task modules in TeamsJS v1.x) |
| Interact with your users through text and rich cards. | Conversational bots |
| A good choice for a simple back-and-forth interaction when you don't need to build an entire conversational bot. |  Outgoing webhooks |

</details>
</br>
<details>
<summary>Send notifications and alerts</summary>

Send asynchronous notifications and alerts to your users in Teams.

| **If you want to...** | **Try ...** |
| --- | --- |
| Send proactive notifications to inform users about news, events, requests, and reminders that require users’ immediate attention or specific actions in the activity feed. | Microsoft Graph API (`sendActivityNotification`) |
| Send interactive messages to groups, channels, or individual users. | Conversational bots |
| Permit a channel to subscribe to receive messages. A connector lets users tailor the subscription with a configuration page. | Connectors and incoming webhooks |

</details>
</br>
<details>
<summary>Ask questions and get answers</summary>

Connect with your users and resolve their queries

| **If you want to...** | **Try ...** |
| --- | --- |
| Natural language processing, AI, machine learning, and all the buzzwords. Use a bot powered by the intelligent cloud to connect your users to the answers they need. | Conversational bots |
| Embed your existing web portal in Teams or create a Teams-specific version for added functionality. | Tabs |

</details>

## App capabilities mapped to features

The Microsoft Teams platform offers a large variety of features. Each feature is a way of interacting with your users that makes the Teams app capability relevant to the user need.

Let's look at how Teams capabilities enable different features for your Teams app.

:::row:::
      :::image type="content" source="~/assets/images/overview/flowchart-tab.png" alt-text="Microsoft Teams app capabilities for tab." link="~/tabs/what-are-tabs.md" border="false":::
:::row-end:::

:::row:::
      :::image type="content" source="~/assets/images/overview/flowchart-bot.png" alt-text="Microsoft Teams app capabilities for bot." link="~/bots/what-are-bots.md" border="false":::
:::row-end:::

:::row:::
      :::image type="content" source="~/assets/images/overview/flowchart-message-extension.png" alt-text="Microsoft Teams app capabilities for message extension." link="~/messaging-extensions/what-are-messaging-extensions.md" border="false":::
:::row-end:::

:::row:::
      :::image type="content" source="~/assets/images/overview/flowchart-adaptive-card.png" alt-text="Microsoft Teams app capabilities for adaptive cards." link="~/task-modules-and-cards/cards/cards-reference.md#adaptive-card" border="false":::
:::row-end:::

:::row:::
      :::image type="content" source="~/assets/images/overview/flowchart-apps-for-meetings.png" alt-text="Microsoft Teams app capabilities for meetings." link="~/apps-in-teams-meetings/teams-apps-in-meetings.md" border="false":::
:::row-end:::

:::row:::
      :::image type="content" source="~/assets/images/overview/flowchart-webhook-and-connectors.png" alt-text="Microsoft Teams app capabilities for webhooks and connectors." link="~/webhooks-and-connectors/what-are-webhooks-and-connectors.md" border="false":::
:::row-end:::

:::row:::
      :::image type="content" source="~/assets/images/overview/flowchart-graph-conversational-interface.png" alt-text="Microsoft Teams app capabilities for graph conversational interface." link="/graph/overview" border="false":::
:::row-end:::

For example:

* Use the **tab** capability to display dialogs, request device permissions, display <`iframe`> content, or using deep links.
* Use the **message extension** capability to send cards, unfurl links, or take action on messages.

> [!NOTE]
> You can also explore the capability to add meeting app extensibility to your Teams app. For more information, see [apps for Teams meetings and calls](../../apps-in-teams-meetings/teams-apps-in-meetings.md).

## See also

* [Plan your app with Teams features](../app-fundamentals-overview.md)
* [Build your first Microsoft Teams app](../../get-started/get-started-overview.md)
* [Teams app planning checklist](planning-checklist.md)
