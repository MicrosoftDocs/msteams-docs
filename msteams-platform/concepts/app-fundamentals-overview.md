---
title: Plan your app overview
author: heath-hamilton
description: Introduce the elements of planning an app, understanding use cases, app capabilities, and other Teams features.
ms.topic: conceptual
ms.localizationpriority: medium
ms.author: lajanuar
keywords: entry points extensibility use cases device capability
---

# Plan your app with Teams features

Building an awesome Teams app is all about finding the right combination to meet your user's needs. The design, features, and capabilities of an app stem from this purpose. 

At its heart, Teams is a collaboration platform. It's also a social platform, is natively cross-platform, sits at the heart of Office 365, and offers a personal canvas for you to create apps. Teams as a platform offers you toolkits, libraries, and apps at every stage of app development.

Let's break it down to app building lifecycle:

- [Before you build](#before-you-build)
- [During build](#during-build)
- [Post-build](#post-build)

## Before you build

Understanding the user and their problem are the first indicators of how a Teams app can help. Build your use around the problem, determine how Teams can solve it, and draw a solution.

- **Understand your use case and Teams App Features**: Recognize user issues and identify the solutions to some common problems the users face. Build your Teams app by finding the right combination of Teams features to meet your user's needs. [Understand use cases](../concepts/design/understand-use-cases.md) to know how an end-user interacts with your app.

- **Map your use cases**: [Map common use cases](../concepts/design/map-use-cases.md) to Teams features based on:

  - Sharing and collaborating on items in an external system.
  - Starting workflows and sending notifications to users.
  - Using social platforms, conversational bots, and combining multiple features.

- **Plan responsive tabs for Teams mobile**: [Plan responsive tabs for Teams mobile](../concepts/design/plan-responsive-tabs-for-teams-mobile.md) covers common scenarios and helps with planning apps for Teams mobile. The document guides on how to plan for apps on mobile. You can also learn about the different stages and different types of Teams app.

## During build

- **Create and Build app project**: With Teams, you can choose the build environment that best suits your app requirement. Use the Teams Toolkit or other SDKs, such as C#, Blazor, Node.js, and more to [get started](../get-started/get-started-overview.md#get-started) with creating project workspace and scaffolding. You can build a basic app with the tab, bot, and messaging extension features.

- **Design your app**: Use Teams UI Toolkit and UI Library to [design your app's layout](~/concepts/design/design-teams-app-process.md).

- **Use Teams as a platform**: Teams, as a platform, helps you build a single- or multi-capability app. Your Teams app is backed by the integrated products and services that strengthen the app experience.

    :::image type="content" source="../assets/images/overview/teams-solution.png" alt-text="Conceptual representation of the Teams solution." border="true":::

    Your apps appear on Teams as Tabs, Bots, Messaging Extensions, or Connectors & Webhooks. These capabilities are powered at the backend by Azure, Microsoft Graph, SharePoint, and Power apps that help automate tasks and processes.

    Together, these capabilities bring your app solution to life. You can develop extensive features capabilities:

  - [Tabs](../tabs/what-are-tabs.md#microsoft-teams-tabs)
  - [Bots](../bots/what-are-bots.md#bots-in-microsoft-teams)
  - [Messaging extensions](../messaging-extensions/what-are-messaging-extensions.md#messaging-extensions)
  - [Webhooks and connectors](../webhooks-and-connectors/what-are-webhooks-and-connectors.md#webhooks-and-connectors)
  - [Cards](../task-modules-and-cards/what-are-cards.md#cards)
  - [Task modules](../task-modules-and-cards/what-are-task-modules.md#task-modules)

- **Integrate device capabilities**: With enhanced Teams platform, you can integrate the native [device capabilities](device-capabilities/device-capabilities-overview.md#device-capabilities) in your app. Device capabilities include camera, QR or barcode scanner, photo gallery, microphone, and location. You can use dedicated APIs available in Microsoft Teams JavaScript client SDK for integration.

## Post-build

- Integrate your app with Teams and other apps, such as [Microsoft 365](../m365-apps/overview.md#extend-teams-apps-across-microsoft-365), [Microsoft Graph](../graph-api/proactive-bots-and-messages/graph-proactive-bots-and-messages.md#proactive-installation-of-apps-using-graph-api-to-send-messages), and more.
- Use [Developer Portal](build-and-test/teams-developer-portal.md#manage-your-apps-with-the-developer-portal-for-microsoft-teams) to configure, manage, and deploy your app.

<details>
<summary>Learn about Government Community Cloud (GCC)</summary>

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

- For third-party apps, see [web apps](../samples/integrating-web-apps.md) and [meeting app extensibility](../apps-in-teams-meetings/meeting-app-extensibility.md).
- For bots, see [build your first conversational bot for Teams](../get-started/first-app-bot.md), [designing your Teams bot](../bots/design/bots.md), [add bots to Microsoft Teams apps](../resources/bot-v3/bots-overview.md), and [bots in Teams](../bots/what-are-bots.md).
- For sideloading apps, see [enable your Teams app to be customized](../concepts/design/enable-app-customization.md), [distribute your Microsoft Teams app](../concepts/deploy-and-publish/apps-publish-overview.md), and [Upload your app in Teams](../concepts/deploy-and-publish/apps-upload.md).
- For custom connectors, see [create Office 365 connectors for Teams](../webhooks-and-connectors/how-to/connectors-creating.md).

</details>

## Next step

> [!div class="nextstepaction"]
> [Use cases and Teams features](understand-use-cases.md)

## See also

- [Considerations for Teams integration](../samples/integrating-web-apps.md)
- [Build your first Microsoft Teams app](../build-your-first-app/build-first-app-overview.md)
