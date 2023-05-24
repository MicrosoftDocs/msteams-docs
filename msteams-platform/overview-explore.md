---
title: Exploring Teams as a platform for building apps
author: heath-hamilton
description: Microsoft Teams platform features for your app on desktop and mobile. Tabs, bots, messaging extension, webhook, connectors, Microsoft Graph, or Adaptive Cards.
ms.topic: overview
ms.localizationpriority: high
ms.author: lajanuar
ms.date: 04/16/2023
---
# Explore Teams platform features

With Teams, you can build your app in a feature-rich environment. Using Teams as a platform for building apps, you can extend the Teams capabilities for your desktop and mobile app solutions. Choose the best features for your app.

:::image type="content" source="../msteams-platform/assets/images/overview/what-is-m365-dev-plat.png" alt-text="Screenshot shows you the conceptual representation of Teams as a platform."lightbox="../msteams-platform/assets/images/overview/what-is-m365-dev-plat.png":::

## Teams app features

| Feature | Description | Useful for |
| --- | --- | --- |
|Tabs | Tabs are Teams-aware webpages embedded in Microsoft Teams. You can add them as part of a channel inside a team, group chat, or personal app for an individual user. | Personal tab, channel or group tab, stage view, and link unfurling. |
| Bots | A bot is also referred to as a chatbot or conversational bot. It's an app that runs simple and repetitive automated tasks done by the users. A bot interaction can be a quick question and answer, or it can be a complex conversation that provides access to services. | Customer service, information about the weather, make dinner reservations, or provide travel information. |
| Message extension | Message extensions let the users interact with your web service Teams client. They search or start actions in an external system. You can send the result of the interaction to the Teams client as a richly formatted card. | Reserve a resource and allow the channel to know the reserved time slot. Search for a work item, and share it with the group as an Adaptive Card. Create a bug in your tracking system based on a Teams message, assign that bug to a user, and send a card to the conversation thread with the bug's details. |
|Meeting extensions | You can create apps to make meetings more productive. | Ask people to complete a survey during a call or send a quick reminder that doesn’t interrupt the flow of the meeting. |
| Personal app | A personal app is a dedicated space (tab) or bot to help users focus on their own tasks or view activities important to them. | OneNote is a personal app that gives you a private workspace within Teams. Planner offers a bird's eye view of all your tasks, across boards that you or your team have added as channel tabs. |
| Webhooks and connectors | Communicate with external apps, and send or receive notifications and messages from other apps. | Subscribe to receive notifications and messages from your web services. |
| Microsoft Graph | Microsoft Graph is the gateway to data and intelligence in Microsoft 365 and can be incorporated in any kind of Teams app. | Create, manage, find, and archive large number of teams and populate them with users and channels. |
| Adaptive Card | Cards help you organize information into groups and give users the opportunity to interact with specific parts of the information. | Sharing using text and images; gathering information using input forms. |
| Task modules | Task modules permit you to create modal pop-up experiences in your Teams application. | Run your own custom HTML or JavaScript code. Show an <`iframe`>-based widget such as a YouTube or Microsoft Stream video. |

### Extend your Teams app across Microsoft 365

If you've already built some Teams apps, you can now extend your apps across Microsoft 365 and configure them to be accessible over Outlook and Microsoft 365.

:::image type="content" border="false" source="assets/images/overview/app-manifest.png" alt-text="Screenshot shows you the configuration of properties in the Teams app manifest."lightbox="assets/images/overview/app-manifest.png":::

## Microsoft Teams update

We're excited to announce a major update to the Microsoft Teams! New Teams is reimagined from the ground up with performance in mind; it's faster, simpler, smarter, and flexible to ensure better experience for your apps and users.

The new Teams Client is closely aligned with all the existing Teams Clients where your apps run. At full feature parity, you can use the new Teams Client with all the same capabilities available in Teams.

If you have an app that runs inside the Classic Teams Client for Windows or Mac, the Teams Web Clients for Edge, Chrome, or Firefox, and our Teams Mobile Clients for Android and iOS, the app will most likely run in the new Teams Client without any issues.

Apps in the new Teams client run better and faster as:  

* The new Teams Client uses the Evergreen version of Edge WebView2 to ensure Teams client is always up to date with the latest fixes and improvements available in Edge and Chromium.

* The new Teams Client has been rebuilt from the ground up with performance in mind and includes all the platform infrastructure responsible for bootstrapping your app and powering the SDK APIs that it uses.  

### Timelines and Rollout

To ensure a smooth transition, a phased rollout of the new platform is planned. The following are the key milestones:

* **Private Preview or Developer Preview**: The new Teams client is available in Public Developer Preview starting 24th May 2023. You can access the new platform and test your apps. We encourage you to adopt the feature early and provide feedback to help refine the platform.

* **GA of all platform features from Teams classic**: All the platform features from Teams classic will be generally available (GA) in the new Teams client by June 2023. We plan to officially launch the new platform after addressing the known issues and incorporating feedback.

> [!NOTE]
>
> * Test personal apps after installing and pinning it in the Classic Teams Client.
> * Test channel tabs after installing and pinning them in the Classic Teams Client.
> * Test messaging extensions, meeting apps, bots, and link unfurling after installing and pinning them in the Classic Teams Client.

You can distinguish between the Teams host clients using the [HostName](/javascript/api/@microsoft/teams-js/hostname?view=msteams-client-js-latest&preserve-view=true) property. Classic Teams client and the new Teams client are represented using the `teams` and `teamsModern` fields respectively.

* SDK v1.x: `hostName`
* SDK v2.x: `app.Context.app.host.name`

### Known Issues

* You can't install, uninstall, pin, and unpin apps in the new Teams client. It's recommended to perform these actions in the Classic Teams Client and the changes are reflected in the New Teams Client.

* You can't add, update, rename, and remove tabs from chats and channels in the new Teams client. It's recommended to perform these actions in the Classic Teams Client and the changes are reflected in the New Teams Client.

* Share in Teams isn't supported in the new Teams client.

* API's used in Teams that require [device permissions](concepts/device-capabilities/native-device-permissions.md) aren't supported.

* Adaptive card tabs aren't supported in the new Teams client.

For more information on known issues and gaps in the New Teams Client, see [The new Microsoft Teams](/microsoftteams/new-teams-desktop-admin?tabs=teams-admin-center#known-issues).

## Next step

You've had a short tour through some of Teams platform features. You're ready to see how you can use them to build your app.

Let's head towards the solution for the user story.

> [!div class="nextstepaction"]
> [The Teams solution](overview-solution.md)
