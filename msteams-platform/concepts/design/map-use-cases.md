---
title: Map Use Cases to App Features
author: surbhigupta
description: Learn to identify how your app's use cases can work within the Teams experience, app features, and capabilities, and map common use cases with capabilities.
ms.topic: conceptual
ms.localizationpriority: high
ms.author: anclear
ms.date: 02/06/2025
---

# Map your use cases to Teams app features

A well-defined use case is essential for outlining the specific features you want to include in your Teams app. After determining the user requirements, you can clearly define the scope and choose the Teams capability that best aligns with your app's goals. This process helps ensure that the features you develop are directly driven by real user needs and scenarios.

You can map your use case based on:

- Sharing and collaborating on items in an external system.
- Starting workflows and sending notifications to users.
- Using social platforms, conversational bots, and combining multiple features.

For example, when designing an app for a document review process, you might map the use case to features such as tabs for displaying documents or message extensions for quick searches in external systems.

## Common use cases mapped to Teams capabilities

The next step is to match your user scenarios with specific app capabilities. Below is a list of common user scenarios and their recommended Teams capabilities. This list is not exhaustive but serves as a starting point for identifying the best solution for your needs.

</br>
</br>
<details>
<summary>Create, share, and collaborate on items in an external system</summary>

Develop apps that interact with your external data and systems effectively. This can be useful for scenarios like collaborating on project documents, managing external databases, or integrating with a CRM platform.

| **If you want to...** | **Try ...** |
| ----------------------- | ------------ |
| Search external systems and share the results as an interactive card. | Message extensions with search commands |
| Collect information to insert into a data store or run advanced searches. | Message extensions with action commands |
| Create embedded web experiences to view, work with, and share data. | Tabs |
| Push data and send data out of the Teams client. | Connectors and webhooks |
| Use interactive modal forms from anywhere you need to collect or display information. | Dialogs (referred to as task modules in TeamsJS v1.x) |

A common use case might involve integrating a product catalog search from an external inventory system, displaying interactive cards through message extensions, and allowing users to add items to a shopping cart directly within Teams.

</details>
</br>
<details>
<summary>Initiate workflows and processes</summary>

This capability is ideal when you need to kick off business processes or automate tasks in external systems directly from Teams. It streamlines the initiation of workflows like leave requests, incident reports, or approval processes.

| **If you want to...** | **Try ...** |
| ----------------------- | ------------ |
| Trigger messages, allowing your users to quickly send the contents of a message to your web services. | Message extensions action commands |
| Open messages from a tab, a bot, or a message extension to collect information before initiating a workflow. | Dialogs (referred to as task modules in TeamsJS v1.x) |
| Interact with your users through text and rich cards. | Conversational bots |
| Handle simple back-and-forth interactions without building a full conversational bot. | Outgoing webhooks |

For instance, in a scenario where a company needs to process expense claims, users can initiate a workflow from a Teams message extension that pre-populates a form (using dialogs/task modules) before submitting the claim to an external financial system.

</details>
</br>
<details>
<summary>Send notifications and alerts</summary>

Use this capability to communicate important updates, reminders, or alerts asynchronously to your users in Teams. It is particularly helpful for time-sensitive information such as meeting reminders or critical system alerts.

| **If you want to...** | **Try ...** |
| ----------------------- | ------------ |
| Send proactive notifications to inform users about news, events, requests, or reminders that require immediate attention. | Microsoft Graph API (sendActivityNotification) |
| Send interactive messages to groups, channels, or individual users. | Conversational bots |
| Enable a channel to subscribe to receive messages, allowing users to customize their notifications. | Connectors and incoming webhooks |

A practical example is an IT operations scenario where automated alerts about system status or maintenance updates are sent directly to relevant Teams channels using the Microsoft Graph API for activity notifications.

</details>
</br>
<details>
<summary>Ask questions and get answers</summary>

This approach enables direct interaction with users to resolve queries. It leverages modern AI and conversational interfaces to facilitate efficient and natural communication.

| **If you want to...** | **Try ...** |
| ----------------------- | ------------ |
| Utilize natural language processing, AI, and machine learning to connect users with the answers they need using a smart bot. | Conversational bots |
| Embed your existing web portal in Teams or develop a Teams-specific version for enhanced functionality. | Tabs |

For example, consider a helpdesk scenario where employees use a conversational bot powered by AI to troubleshoot issues and get immediate responses, or alternatively access a dedicated FAQ tab with embedded web content.

</details>

## App capabilities mapped to features

The Microsoft Teams platform provides a broad range of features, each delivering a unique way to engage with your users. By understanding how each capability aligns with specific user needs, you can design a Teams app that is both robust and functionally relevant.

Below are examples of how Teams capabilities enable different features for your Teams app:

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
      :::image type="content" source="~/assets/images/overview/flowchart-adaptive-card.png" alt-text="Microsoft Teams app capabilities for Adaptive Cards." link="~/task-modules-and-cards/cards/cards-reference.md#adaptive-card" border="false":::
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

- Use the **tab** capability to display dialogs, request device permissions, showcase <iframe> content, or leverage deep links for navigation.
- Use the **message extension** capability to send rich cards, unfurl links, or take direct action on messages, providing users with interactive and contextually relevant functionality.

> [!NOTE]
> You can also explore the capability to add meeting app extensibility to your Teams app. For more details, see [apps for Teams meetings and calls](../../apps-in-teams-meetings/teams-apps-in-meetings.md).

## See also

- [Plan your app with Teams features](../app-fundamentals-overview.md)
- [Build your first Microsoft Teams app](../../get-started/get-started-overview.md)
- [Teams app planning checklist](planning-checklist.md)

In practical scenarios, mapping use cases in this way helps streamline development by choosing the right Teams features. For example, if you're designing a project management tool, you might incorporate tabs for dashboards, bots for interactive updates, and message extensions for quick data queries. This ensures that each aspect of your application leverages the most suitable Teams capability, leading to a more cohesive and functional user experience.