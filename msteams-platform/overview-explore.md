---
title: Explore Teams as a platform for building apps
description: Learn about Microsoft Teams platform features for your app such as tabs, bots, message extensions, webhooks, connectors, Microsoft Graph, and Adaptive Cards.
ms.topic: overview
ms.localizationpriority: high
ms.date: 11/02/2021
---

# Explore Teams platform features

With Microsoft Teams, you can build your app in a feature-rich environment. Using Teams as a platform for building apps, you can extend the Teams capabilities for your desktop and mobile app solutions. Choose the best features for your app.

:::image type="content" source="../msteams-platform/assets/images/overview/what-is-m365-dev-plat.png" alt-text="Diagram shows the conceptual representation of Teams as a platform." lightbox="../msteams-platform/assets/images/overview/what-is-m365-dev-plat.png":::

## Teams app features

| Feature | Description | Useful for |
| --- | --- | --- |
| Tabs | Tabs are Teams-aware webpages embedded in Teams. You can add them as part of a channel inside a team, group chat, or personal app for an individual user. | Personal tab, channel or group tab, Stageview, and link unfurling. |
| Bots | A bot is also referred to as a chatbot or conversational bot. It's an app that runs simple and repetitive automated tasks done by the users. A bot interaction can be a quick question and answer, or it can be a complex conversation that provides access to services. | Customer service, information about the weather, make dinner reservations, or provide travel information. |
| Message extension | Message extensions let the users interact with your web service Teams client. They search or start actions in an external system. You can send the result of the interaction to the Teams client as a richly formatted card. Message extensions can be enhanced with AI capabilities with Microsoft Copilot. | Reserve a resource and allow the channel to know the reserved time slot. Search for a work item, and share it with the group as an Adaptive Card. Create a bug in your tracking system based on a Teams message, assign that bug to a user, and send a card to the conversation thread with the bug's details. |
| Meeting extensions | You can create apps to make meetings more productive. | Ask people to complete a survey during a call or send a quick reminder that doesn’t interrupt the flow of the meeting. |
| Personal app | A personal app is a dedicated space (tab) or bot to help users focus on their own tasks or view activities important to them. | Microsoft OneNote is a personal app that gives you a private workspace within Teams. Microsoft Planner offers a bird's eye view of all your tasks, across boards that you or your team have added as channel tabs. |
| Webhooks and connectors | Communicate with external apps, and send or receive notifications and messages from other apps. | Subscribe to receive notifications and messages from your web services. |
| Microsoft Graph | Microsoft Graph is the gateway to data and intelligence in Microsoft 365 and can be incorporated in any kind of Teams app. | Create, manage, find, and archive large number of teams and populate them with users and channels. |
| Adaptive Card | Cards help you organize information into groups and give users the opportunity to interact with specific parts of the information. | Sharing using text and images; gathering information using input forms. |
| Dialogs (referred as task modules in TeamsJS v1.x) | Dialogs permit you to create modal pop-up experiences in your Teams application. | Run your own custom HTML or JavaScript code. Show an <`iframe`>-based widget such as a YouTube or Microsoft Stream video. |

### Extend your Teams app across Microsoft 365

If you've already built some Teams apps, you can now extend your apps across Microsoft 365 and configure them to be accessible over Outlook and Microsoft 365.

:::image type="content" border="false" source="assets/images/overview/app-manifest.png" alt-text="Screenshot shows the configuration of properties in the Teams app manifest." lightbox="assets/images/overview/app-manifest.png":::

You took a short tour through some of Teams platform features. Let's head towards the solution for the user story.

## The user story

You've had a view of Teams offerings. You can now map them to user needs. Let’s revisit the scenario.

The developer from the travel agency wants to build an app for their users, the travelers. The app must:

- Check and send the forecast to travelers registered with the travel agency.
- Notify the users a day before the departure date so they can plan.

Collate and map requirements to Teams functionalities:

| User app needs | Check forecast | Notification before travel | Registered user |
| --- |:---:|:---:|:---:|
| **Capability** | Notification bot | &nbsp; | &nbsp; |
| **Integration** | &nbsp; | &nbsp; | :::image type="icon" source="assets/icons/graph-small-icon.png"::: Microsoft Graph, Weather API |
| **Scope** | &nbsp; | Personal app | &nbsp; |
| **Integration point** | &nbsp; | Notification | &nbsp; |

**Teams app solution**: A Teams notification bot app that checks and sends forecast notification to registered users before their travel date.

:::image type="content" border="false" source="../msteams-platform/assets/images/overview/developer-scenario-solution.png" alt-text="Screenshot shows to how to build a bot for Teams that sends weather forecast to customers so that they can plan ahead their traveling dates." lightbox="../msteams-platform/assets/images/overview/developer-scenario-solution.png":::

Teams offers these and many more capabilities to bring your users a feature-rich app solution. To develop this app:

1. Create a notification bot app.
1. Integrate with an external weather forecast API to connect and request forecast for a specific date and location.
1. Integrate with :::image type="icon" source="assets/icons/graph-small-icon.png"::: Microsoft Graph for registered users.
1. Check and send forecast details based on user's travel date and location.

## Dive deeper

Choose to customize your app with functionalities, such as user authentication, and tools, such as Microsoft Graph and Developer Portal for Teams.

Let's go through Teams Developer Documentation based on your requirements for building a Teams app:

| What do you want? | Where to go |
| --------| --------|
| You're new to Teams app development and want to create a new Teams app. | bui[Build your first Teams app](get-started/build-first-teams-app.md) |
| You've created apps with Teams before and want to learn more about app functionalities. | Build modules for [tabs](tabs/what-are-tabs.md), [bots](bots/what-are-bots.md), [message extensions](messaging-extensions/what-are-messaging-extensions.md), [meeting app](apps-in-teams-meetings/teams-apps-in-meetings.md), and more. |
| You want to find more information about the tools and SDKs that are available with Teams. | [Explore Tools](get-started/explore-tools-and-sdks.md#explore-tools) and [Explore SDKs](get-started/explore-tools-and-sdks.md#explore-sdks) |

## Next step

> [!div class="nextstepaction"]
> [Build your first Teams app](get-started/build-first-teams-app.md)

## See also

[Extend a Teams personal tab across Microsoft 365 app](m365-apps/extend-m365-teams-personal-tab.md)
