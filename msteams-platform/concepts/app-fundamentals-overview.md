---
title: Plan your app overview
author: heath-hamilton
description: Introduce the elements of planning an app, such as understanding use cases and mapping them to app capabilities, app capabilities, and other Teams features.
ms.topic: conceptual
ms.localizationpriority: medium
ms.author: lajanuar
keywords: entry points extensibility use cases device capability
---

# Plan your app with Teams capabilities

An app's design, features, and capabilities stem from its purpose. The app user and their need form the basic guideline that determines all app choices you'll make. Building app design, selecting capabilities, determining build and test environment, and app distribution follow the user's requirement from the app.

The document helps you to understand the user-app communication and figure out the kind of app surfaces you need to use or the APIs your app might require in the process. Get some inspiration to embrace interactivity that can deepen the app experience when you integrate with Teams.

The first step for any app is to understand the user need and problem, determine how Teams can solve it, and form a solution.

## Understand your use cases

You can recognize user issues and identify the answers to some common problems the users face. You can build your Teams app by finding the right combination to meet your user's needs. [Understand use cases](../concepts/design/understand-use-cases.md) to know how an end-user interacts with your app. You learn to understand the user and their problem. Some common questions answered are as follows:

- Do you need authentication?
- What problem is your app going to solve?
- Who are the end-users of the app?
- How should the onboarding experience be and what else the app can do?

## Map your use cases to Teams app capabilities

[Map your use cases](../concepts/design/map-use-cases.md) covers some common scenarios and how to choose your app's capabilities. Information to share your app and collaborate on items in an external system is provided. You can also learn how to initiate workflows and send notifications to users. Get additional tips on where to start, how to get social with users, conversational bots, and combining multiple features.

## Teams Capabilities

You can extend your Teams app in multiple ways.

:::image type="content" source="../assets/images/overview/teams-capabilities.png" alt-text="Illustrates Teams capabilities" border="true":::

Your Teams app can have [multiple capabilities](../concepts/capabilities-overview.md):

- Tabs – Collaborate conveniently and display web-based content in a [tab](../tabs/what-are-tabs.md) where people can discuss and work on it together.
- Bots – A [bot](../bots/what-are-bots.md) will help you turn your words and conversations into action and initiate various workflows right inside Teams.
- Messaging extensions – Make it easier to multitask and quickly share external information in a conversation or contextually act on a message with [message extensions](../messaging-extensions/what-are-messaging-extensions.md).
- Meeting extensions - You can create apps to make meetings more productive with [meeting extensions](../apps-in-teams-meetings/design/designing-apps-in-meetings.md). For example, ask people to complete a survey during a call or send a quick reminder that doesn’t interrupt the flow of the meeting.
- Webhooks and Connectors – Communicate with external apps, send or receive notifications and messages from other apps. [Incoming webhooks](../webhooks-and-connectors/what-are-webhooks-and-connectors.md#incoming-webhooks) are a simple way to automatically send notifications from another app to a Teams channel. With [outgoing webhooks](../webhooks-and-connectors/what-are-webhooks-and-connectors.md#outgoing-webhooks), message your web service with an @mention.
- Personal Apps - A [personal app](../concepts/design/personal-apps.md) is a dedicated space (tab) or bot to help users focus on their own tasks or view activities important to them.
- Adaptive cards: Use [cards](../task-modules-and-cards/what-are-cards.md), you can organize information into groups and give users the opportunity to interact with specific parts of the information.

### Plan responsive tabs for Teams mobile

[Plan responsive tabs for Teams mobile](../concepts/design/plan-responsive-tabs-for-teams-mobile.md) covers common scenarios and helps with planning apps for Teams mobile. The document guides on how to strategize for apps on mobile. You can also learn about the different stages and different types of Teams app.

## Use Teams as a platform

Teams, as a platform, helps you build a single- or multi-capability app that is backed by the integrated products and services that strengthen the app experience.

:::image type="content" source="../assets/images/overview/teams-solution.png" alt-text="Conceptual representation of the Teams solution." border="true":::

You could have apps that appear on Teams as Tabs, Bots, Messaging Extensions, Connectors & Webhooks. These are powered at the backend by Azure, Microsoft Graph, SharePoint and Power apps that can help automate day to day tasks and processes.

Together, these capabilities bring your app solution to life.



## Integrate device capabilities

Microsoft Teams platform is continuously enhancing developer capabilities aligning with built-in first-party experiences. The enhanced Teams platform allows partners to access and integrate the native device capabilities, such as camera, QR or barcode scanner, photo gallery, microphone, and location using dedicated APIs available in Microsoft Teams JavaScript client SDK.

## Government Community Cloud (GCC)

Government Community Cloud is a government focused copy of the commercial environment. Department of Defense (DOD) and Federal contractors must meet the stringent cybersecurity and compliance requirements. For this purpose, GCC-High was created to meet the needs of DOD and Federal contractors. GCC-High is a copy of the DOD cloud but exists in its own sovereign environment. The DOD cloud is built for the Department of Defense only.

The following table includes Teams features and availability for GCC, GCC-High, and DOD:

| Features   | GCC | GCC-High | DOD |
|-------------|---------|---|---|
| Teams owned apps as in internally developed apps | ✔️ App is enabled if it has GCC. | ✔️ App is enabled if it has GCC-High. | ✔️ App is enabled if it has DOD. |
| Microsoft apps | ✔️ Microsoft apps compliant with GCC | ✔️ Microsoft apps compliant with GCC-High | ✔️ Microsoft apps compliant with DOD |
| 3p or third-party apps | ✔️ Third-party apps are available. Disabled by default and tenant admin use their own discretion to enable it. | ❌ | ❌ |
| Bots | ✔️ | ❌ | ❌ |
| Custom or Lob tab apps |  ✔️ | ✔️ | ✔️ |
| Sideloading apps | ✔️ | ❌ | ❌ |
| Custom or Lob bots | ✔️ | ❌ | ❌ |
| Custom messaging extensions | ❌ | ❌ | ❌ |
| Custom connectors | ❌ | ❌ | ❌ |

The following list helps to identify the availability of GCC, GCC-High, and DOD for the features:

* For third-party apps, see [web apps](../samples/integrating-web-apps.md) and [meeting app extensibility](../apps-in-teams-meetings/meeting-app-extensibility.md).
* For bots, see [build your first conversational bot for Teams](../get-started/first-app-bot.md), [designing your Teams bot](../bots/design/bots.md), [add bots to Microsoft Teams apps](../resources/bot-v3/bots-overview.md), and [bots in Teams](../bots/what-are-bots.md).
* For sideloading apps, see [enable your Teams app to be customized](../concepts/design/enable-app-customization.md), [distribute your Microsoft Teams app](../concepts/deploy-and-publish/apps-publish-overview.md), and [Upload your app in Teams](../concepts/deploy-and-publish/apps-upload.md).
* For custom connectors, see [create Office 365 connectors for Teams](../webhooks-and-connectors/how-to/connectors-creating.md).

## Next step

> [!div class="nextstepaction"]
> [Understand Teams app capabilities](capabilities-overview.md)

## See also

- [Considerations for Teams integration](../samples/integrating-web-apps.md)
- [Build your first Microsoft Teams app](../build-your-first-app/build-first-app-overview.md)
