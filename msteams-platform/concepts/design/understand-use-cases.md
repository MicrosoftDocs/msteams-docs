---
title: Understand App Use Cases & Features
author: heath-hamilton
description: Learn Teams app capabilities such as tabs, bots, meeting extensions, message extensions, and webhook connectors and scopes such as personal and shared app experience.
ms.topic: conceptual
ms.localizationpriority: high
ms.author: anclear
ms.date: 02/06/2025
---

# Understand Use Cases

In the collaborative social framework of Teams, a wide variety of user needs can be addressed through a Teams app. For instance, an app designed to bridge gaps and foster effective collaboration is an ideal fit for solving everyday challenges.

The core principle is to base all design decisions on the app user's requirements. These requirements guide your decisions when it comes to app design, selecting capabilities, determining the build/test environment, and app distribution.

To meet these user requirements effectively, you must first fully understand them.

## Key Considerations

Follow these guidelines to ensure you capture the full context of your app's intended use:

1. **Understand your user**:
   - Recognize user issues and identify solutions for common challenges.
   - Build your Teams app by combining the appropriate Teams features to meet your user's needs.
   - Learn about specific use cases to understand how an end-user interacts with your app.
   - It is recommended to review the learning module [how to publish your app to Microsoft Teams Store](/training/modules/microsoft-teams-publish-app-to-store/) which offers guidance on passing the Teams Store submission process.

2. **Understand the problem**:
   - Clarify the core problem your app is designed to solve. This analysis helps in prioritizing features that bring critical value to the end-users.

3. **Consider integration**:
   - Identify the necessary apps and services required by your app, such as authentication mechanisms, Microsoft Graph integration, or interactions with web apps.
   - Real-world example: If your app needs secure communication, planning for integration with authentication services (like OAuth) is essential.

---

## Microsoft Teams App Features

Teams apps are highly customizable and can be extended in multiple ways. The features are categorized into two main types:

* [App capabilities](#app-capabilities)
* [App scope](#app-scope)

Each of these sections provides a detailed look at the functionalities you can incorporate into your Teams app.

---

### App Capabilities

App capabilities represent the core functionalities (also referred to as entry or extension points) that enable integration and interaction within Teams. Your Teams app can include one or more of the following capabilities:

:::row:::
   :::column span="":::

#### Personal Apps

A [personal app](../../concepts/design/personal-apps.md) creates a dedicated space or bot environment where users can focus on their individual tasks and view relevant activities.  
*Real-world use example: Use a personal app to deliver driven insights specific to each user's workflow needs.*

   :::column-end:::

   :::column span="":::

:::image type="content" source="../../assets/images/overview-personal-apps-2021.png" alt-text="Conceptual representation of what personal apps look like in the Teams client.":::

   :::column-end:::
:::row-end:::

:::row:::
   :::column span="":::

#### Tabs

Tabs allow you to display web-based content, enabling teams to work and discuss together in a dedicated space.  
*Use case scenario: A project management app can use a tab to display dashboards and progress reports accessible by all team members.*

   :::column-end:::

   :::column span="":::

:::image type="content" source="../../assets/images/overview-channel-chat-apps-2021.png" alt-text="Conceptual representation of what tabs look like in the Teams client.":::

   :::column-end:::
:::row-end:::

:::row:::
   :::column span="":::

#### Bots

Bots empower your app to initiate workflows based on conversational inputs. They are ideal for scenarios like generating orders, reviewing code, or checking ticket statuses directly within Teams.  
*Developer tip: Integrate a bot to streamline tasks that require immediate action based on user messages.*

   :::column-end:::

   :::column span="":::

:::image type="content" source="../../assets/images/overview-bots-2021.png" alt-text="Conceptual representation of what bots look like in the Teams client.":::

   :::column-end:::
:::row-end:::

:::row:::

   :::column span="":::

#### Message Extensions

Message extensions let users search and share external information right from the Teams interface. They also enable users to perform actions on messages, such as creating help tickets directly from a channel post.  
*Practical example: Use message extensions to connect to a support system and generate tickets without leaving Teams.*

   :::column-end:::

   :::column span="":::

:::image type="content" source="../../assets/images/overview-messaging-extensions-2021.png" alt-text="Conceptual representation of what message extensions look like in the Teams client.":::

   :::column-end:::
:::row-end:::

:::row:::

   :::column span="":::

#### Meeting Extensions

Meeting extensions provide many options for embedding your app into the Teams calling experience. This integration creates richer, contextually aware interactions during meetings.  
*Scenario application: Integrate meeting extensions to present collaborative tools or interactive content while users are on calls or meetings.*

   :::column-end:::

   :::column span="":::

:::image type="content" source="../../assets/images/overview-meeting-extensions-2021.png" alt-text="Conceptual representation of what meeting extensions look like in the Teams client.":::

   :::column-end:::
:::row-end:::

:::row:::

   :::column span="":::

#### Webhooks and Connectors

[!INCLUDE [deprecation-note](~/includes/deprecation-note.md)]

Incoming Webhooks provide a simple mechanism to automatically send notifications from external systems to a Teams channel. Outgoing Webhooks, on the other hand, allow your app to send data from Teams to your web service via an @mention.  
*Developer insight: Webhooks are particularly useful for alerting systems or integrating with existing notification infrastructures.*

   :::column-end:::

   :::column span="":::

:::image type="content" source="../../assets/images/overview-connectors.png" alt-text="Conceptual representation of what connectors look like in the Teams client.":::

   :::column-end:::
:::row-end:::

:::row:::

   :::column span="":::

#### Microsoft Graph for Teams

The [Microsoft Graph API for Teams](/graph/teams-concept-overview) offers a unified endpoint to access and manipulate information about teams, channels, users, and messages. Utilize its notification APIs to efficiently send notifications from your app to Teams users.  
*Practical usage: Use the Graph API for integrating team data into your app dashboard, enabling a seamless flow of real-time information.*

   :::column-end:::

   :::column span="":::

:::image type="content" source="../../assets/images/overview-graph.png" alt-text="Conceptual representation of the Microsoft Graph API for Teams.":::

   :::column-end:::
:::row-end:::

> [!NOTE]
> Teams Store has evolved:
>
> Previously, custom apps built for your organization (LOB apps) were updated by selecting the ellipses on the tile. With the updated Teams Store experience, you now update custom apps for your organization by logging into the [Teams Admin Centre](https://admin.teams.microsoft.com).

---

### App Scope

Your app operates within one or more scopes depending on its functionality and target audience. The available scopes are:

- **Personal App Experience**:  
  A personal app presents a dedicated space or bot designed to help individual users manage their tasks or view important activities.
  
- **Shared App Experience**:  
  When operating within a team, channel, or chat, your app can serve as a collaborative tool available to all members of that space. This scope is typically used for workflows designed to enhance team interactions or facilitate social communication.

An app can extend across different scopes. For example:

- Your app might display important shared data in a central location via a tab.
- That same data could also be accessible through a personal bot interface.

This flexibility enables users to choose the mode of interaction that best suits their needs, whether through a canvas tab or a conversational interface.

---

## Next Step

> [!div class="nextstepaction"]
> [Map your use cases](../../concepts/design/map-use-cases.md)

---

## See Also

To explore more about building for Teams, consider checking the following guides:

- [Build bots for Teams](../../bots/what-are-bots.md)
- [Build tabs for Teams](../../tabs/what-are-tabs.md)
- [Build meeting extensions for Teams](../../apps-in-teams-meetings/design/designing-apps-in-meetings.md)
- [Webhooks and connectors](../../webhooks-and-connectors/what-are-webhooks-and-connectors.md)
- [Apps for Teams meetings and calls](../../apps-in-teams-meetings/teams-apps-in-meetings.md)
- [Build Adaptive Cards](../../task-modules-and-cards/cards/cards-reference.md#adaptive-card)
- [Teams app planning checklist](planning-checklist.md)

---

By understanding these use cases and app features, developers can design and build robust Teams apps that meet both individual and collaborative needs. Whether enhancing personal productivity or fostering team collaboration, Teams app capabilities provide a versatile foundation for creating innovative solutions in today's digital workspace.