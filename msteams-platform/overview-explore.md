---
title: Exploring Teams as a platform for building apps
author: heath-hamilton
description: Microsoft Teams platform features for your app on desktop and mobile. Tabs, bots, message extension, webhook, connectors, Microsoft Graph, or Adaptive Cards.
ms.topic: overview
ms.localizationpriority: high
ms.date: 11/02/2021
---
# Explore Teams platform features

With Teams, you can build your app in a feature-rich environment. Using Teams as a platform for building apps, you can extend the Teams capabilities for your desktop and mobile apps.

:::image type="content" source="../msteams-platform/assets/images/overview/what-is-m365-dev-plat.png" alt-text="Screenshot shows you the conceptual representation of Teams as a platform."lightbox="../msteams-platform/assets/images/overview/what-is-m365-dev-plat.png":::

## Teams app features

Teams platform provides the following features to build your app:

| Feature | Description | Useful for |
| --- | --- | --- |
| Message extension | Interact with your web service from Teams. Message extensions search or start actions in an external system. You can send the result of the interaction in Teams as a richly formatted card. Message extensions can be enhanced with AI capabilities with Copilot for Teams. | - Search for a work item, and share it with the group as an Adaptive Card.<br> - Create a bug in your tracking system based on a Teams message, assign that bug to a user, and send a card to the conversation thread with the bug's details. |
| Tab | Teams-aware webpage embedded in Microsoft Teams. You can add tabs as part of a channel inside a team, group chat, or personal app for an individual user. | Personal tab, channel or group tab, Stage View, and link unfurling. |
| Bot | Also referred to as a chatbot or conversational bot, bots automates simple and repetitive tasks. A bot interaction can be a quick question and answer, or it can be a complex conversation that provides access to services. | Customer service, information about the weather, make dinner reservations, or provide travel information. |
| Meeting extension | Apps that make meetings more productive. | Ask people to complete a survey during a call or send a quick reminder that doesn’t interrupt the flow of the meeting. |
| Workflow | Communicate with external apps, and send or receive notifications and messages from other apps. | Subscribe to receive notifications and messages from your web services. |
| Card | Organize information into groups and give users the opportunity to interact with specific parts of the information. | Sharing using text and images; gathering information using input forms. |
| Dialog (referred as task modules in TeamsJS v1.x) | Create modal pop-up experiences in your Teams app. | - Run your own custom HTML or JavaScript code<br> - Show an <`iframe`>-based widget such as a YouTube or Microsoft Stream video. |

### The user story

To understand how to use Teams apps to provide solutions for your users, consider the following scenario:

:::image type="content" source="../msteams-platform/assets/images/overview/developer-scenario.png" alt-text="Screenshot shows a scenario of a notification bot that sends weather forecast to customers before they travel."lightbox="../msteams-platform/assets/images/overview/developer-scenario.png":::

You can pick the following features to build an app:

| Feature | Description |
| --- | --- |
| Bot | Create a notification bot app to check and send weather forecast details based on user's travel date and travel location |
| Microsoft Graph | - Register users on the app <br>- Integrate the app with an external weather forecast API to connect and request forecast for specific date and location |

### Extend your Teams app across Microsoft 365

If you've already built a Teams app, you can extend your app across Microsoft 365 and configure it to be accessible over Outlook and Microsoft 365.

:::image type="content" border="false" source="assets/images/overview/app-manifest.png" alt-text="Screenshot shows you the configuration of properties in the Teams app manifest."lightbox="assets/images/overview/app-manifest.png":::

## Next step

You've had a short tour through some of Teams platform features. You're ready to build your first Teams app.

> [!div class="nextstepaction"]
> [Get started](get-started/get-started-overview.md)
