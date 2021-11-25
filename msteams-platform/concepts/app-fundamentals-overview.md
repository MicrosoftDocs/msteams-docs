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

Let's break it down to app building lifecycle:

- Before you build
- During build
- Post-build

## Before you build

The first step for any app is to understand the user need and problem, determine how Teams can solve it, and form a solution.

- Understand and map your use cases

    You can recognize user issues and identify the answers to some common problems the users face. Build your Teams app by finding the right combination to meet your user's needs. [Understand use cases](../concepts/design/understand-use-cases.md) to know how an end-user interacts with your app. It covers some common scenarios and how to choose your app's capabilities.

- Teams App Features

    Select your app's scope and features. You can extend your Teams app in multiple ways. Your app scope can be personal or shared space app. You can choose to meet the user needs with one or more [capabilities](../concepts/capabilities-overview.md).

    Use Teams UI Toolkit and UI Library to [design your app's layout](~/concepts/design/design-teams-app-process.md).

- Plan responsive tabs for Teams mobile

    [Plan responsive tabs for Teams mobile](../concepts/design/plan-responsive-tabs-for-teams-mobile.md) covers common scenarios and helps with planning apps for Teams mobile. The document guides on how to strategize for apps on mobile. You can also learn about the different stages and different types of Teams app.

## During build

- Teams Toolkit and Other SDKs

    Use Teams toolkit to create your app's project workspace and build app capabilities.

    - [Tabs](../tabs/what-are-tabs.md#microsoft-teams-tabs)
    - [Bots](../bots/what-are-bots.md#bots-in-microsoft-teams)
    - [Messaging extensions](../messaging-extensions/what-are-messaging-extensions.md#messaging-extensions)
    - [Webhooks and connectors](../webhooks-and-connectors/what-are-webhooks-and-connectors.md#webhooks-and-connectors)
    - [Cards](../task-modules-and-cards/what-are-cards.md#cards)
    - [Task modules](../task-modules-and-cards/what-are-task-modules.md#task-modules)

- Use Teams as a platform

    Teams, as a platform, helps you build a single- or multi-capability app that is backed by the integrated products and services that strengthen the app experience.

    :::image type="content" source="../assets/images/overview/teams-solution.png" alt-text="Conceptual representation of the Teams solution." border="true":::

    You could have apps that appear on Teams as Tabs, Bots, Messaging Extensions, Connectors & Webhooks. These are powered at the backend by Azure, Microsoft Graph, SharePoint and Power apps that can help automate day to day tasks and processes.

    Together, these capabilities bring your app solution to life.

- Integrate device capabilities

    The enhanced Teams platform allows partners to access and integrate the native device capabilities, such as camera, QR or barcode scanner, photo gallery, microphone, and location using dedicated APIs available in Microsoft Teams JavaScript client SDK.

## Post-build

- Integrate your app with Teams and other apps: Microsoft 365, Microsoft Graph, and more
- Use Developer Portal to configure, manage, and deploy your app

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

- For third-party apps, see [web apps](../samples/integrating-web-apps.md) and [meeting app extensibility](../apps-in-teams-meetings/meeting-app-extensibility.md).
- For bots, see [build your first conversational bot for Teams](../get-started/first-app-bot.md), [designing your Teams bot](../bots/design/bots.md), [add bots to Microsoft Teams apps](../resources/bot-v3/bots-overview.md), and [bots in Teams](../bots/what-are-bots.md).
- For sideloading apps, see [enable your Teams app to be customized](../concepts/design/enable-app-customization.md), [distribute your Microsoft Teams app](../concepts/deploy-and-publish/apps-publish-overview.md), and [Upload your app in Teams](../concepts/deploy-and-publish/apps-upload.md).
- For custom connectors, see [create Office 365 connectors for Teams](../webhooks-and-connectors/how-to/connectors-creating.md).

## Next step

> [!div class="nextstepaction"]
> [Understand Teams app capabilities](capabilities-overview.md)

## See also

- [Considerations for Teams integration](../samples/integrating-web-apps.md)
- [Build your first Microsoft Teams app](../build-your-first-app/build-first-app-overview.md)
