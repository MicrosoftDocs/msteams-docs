---
title: Exploring Teams as a platform for building apps
author: heath-hamilton
description: Microsoft Teams platform features for your app on desktop and mobile. Tabs, bots, messaging extension, webhook, connectors, Microsoft Graph, or Adaptive Cards.
ms.topic: overview
ms.localizationpriority: high
ms.date: 11/02/2021
---
# Explore Teams platform features

With Teams, you can build your app in a feature-rich environment. Using Teams as a platform for building apps, you can extend the Teams capabilities for your desktop and mobile app solutions. Choose the best features for your app.

:::image type="content" source="../msteams-platform/assets/images/overview/what-is-m365-dev-plat.png" alt-text="Screenshot shows you the conceptual representation of Teams as a platform."lightbox="../msteams-platform/assets/images/overview/what-is-m365-dev-plat.png":::

## Teams app features

| Feature | Description | Useful for |
| --- | --- | --- |
|Tabs | Tabs are Teams-aware webpages embedded in Microsoft Teams. You can add them as part of a channel inside a team, group chat, or personal app for an individual user. | Personal tab, channel or group tab, Stage View, and link unfurling. |
| Bots | A bot, also known as a chatbot or conversational bot, has evolved with artificial intelligence to understand and respond to users in natural language for dynamic conversations. A bot interaction can be a quick question and answer, or it can be a complex conversation that provides access to services. | Customer service, content generation such as new sales presentations or code, personalized guidance for your app, complex financial analysis, and automation of tasks. |
| Message extension | Message extensions let the users interact with your web service Teams client. They search or start actions in an external system. You can send the result of the interaction to the Teams client as a richly formatted card. | Reserve a resource and allow the channel to know the reserved time slot. Search for a work item, and share it with the group as an Adaptive Card. Create a bug in your tracking system based on a Teams message, assign that bug to a user, and send a card to the conversation thread with the bug's details. |
|Meeting extensions | You can create apps to make meetings more productive. | Ask people to complete a survey during a call or send a quick reminder that doesn’t interrupt the flow of the meeting. |
| Personal app | A personal app is a dedicated space (tab) or bot to help users focus on their own tasks or view activities important to them. | OneNote is a personal app that gives you a private workspace within Teams. Planner offers a bird's eye view of all your tasks, across boards that you or your team have added as channel tabs. |
| Webhooks and connectors | Communicate with external apps, and send or receive notifications and messages from other apps. | Subscribe to receive notifications and messages from your web services. |
| Microsoft Graph | Microsoft Graph APIs enable Teams apps to build collaborative features with the intelligence of Microsoft 365 data and engage users regularly through activity feed notifications. | Send activity feed notifications, export or import messages, get meeting transcripts and recordings, use resource-specific consent (RSC) permissions, CRUD (create, read, update, and delete) users, chats, channels, and apps.  |
| Adaptive Card | Cards help you organize information into groups and give users the opportunity to interact with specific parts of the information. | Sharing using text and images; gathering information using input forms. |
| Dialogs (referred as task modules in TeamsJS v1.x) | Dialogs permit you to create modal pop-up experiences in your Teams application. | Run your own custom HTML or JavaScript code. Show an <`iframe`>-based widget such as a YouTube or Microsoft Stream video. |

### Extend your Teams app across Microsoft 365

If you've already built some Teams apps, you can now extend your apps across Microsoft 365 and configure them to be accessible over Outlook and Microsoft 365.

:::image type="content" border="false" source="assets/images/overview/app-manifest.png" alt-text="Screenshot shows you the configuration of properties in the Teams app manifest."lightbox="assets/images/overview/app-manifest.png":::

## Next step

You've had a short tour through some of Teams platform features. You're ready to see how you can use them to build your app.

Let's head towards the solution for the user story.

> [!div class="nextstepaction"]
> [The Teams solution](overview-solution.md)
