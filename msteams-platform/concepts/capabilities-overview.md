---
title: Understand app capabilities
author: heath-hamilton
description: Description of Teams app capabilities, such as Tabs, Bots, Messaging extensions, and Webhooks and connectors.
ms.topic: conceptual
ms.localizationpriority: medium
ms.author: lajanuar
ms.date: 09/22/2020
keywords: tabs bots messaging extensions webhooks connectors gcc
---

# Understand Microsoft Teams app capabilities

Extensibility or entry points are different ways in which an app can manifest itself to a user. For example, a user can interact with an app on a canvas tab to do an activity or might choose to do the same using a conversational bot. The various capabilities used to build your Teams app allows you to increase its usage scope.

There are multiple ways to extend Teams, so every app is unique. Some only have one capability, such as a webhook, while others have more than one feature to give users various options. For example, your app can display data in a central location, that is, the **tab** and present that same information through a conversational interface, that is, the **bot**.

## App capabilities

Your Teams apps have one or all of the following core capabilities:

* [Tabs](../tabs/what-are-tabs.md)
* [Messaging extensions](../messaging-extensions/what-are-messaging-extensions.md)
* [Bots](../bots/what-are-bots.md)
* [Webhooks and connectors](../webhooks-and-connectors/what-are-webhooks-and-connectors.md)

Your app can also take advantage of advanced capabilities, such as the [Microsoft Graph API for Teams](/graph/teams-concept-overview).

The following illustration gives you an idea of which capabilities will provide the features you want in your app:

:::image type="content" source="../assets/images/capabilities-overview.png" alt-text="Mind map illustrating what Teams app capabilities are.":::

## Always consider your user

As you familiarize yourself with Teams app development, you understand its core fundamentals. You understand that there is more than one way to build certain features. In such scenarios, consider how you can provide a more native experience to your user.
For example, you can collect user input in a form built as a tab in the app. You can also do this using a task module without switching views and disrupting user's workflow. It is important to choose extension points that provide least deviation from a user's regular workflow.

## Government Community Cloud (GCC)

Government Community Cloud is a government focused copy of the commercial environment. Department of Defense (DOD) and Federal contractors must meet the stringent cybersecurity and compliance requirements. For this purpose, GCC-High was created to meet the needs of DOD and Federal contractors. GCC-High is a copy of the DOD cloud but exists in its own sovereign environment. The DOD cloud is built for the Department of Defense only.

> [!NOTE]
> Teams store has evolved:
> Previously, the LOB apps were updated by selecting the ellipses on the tile. With the updated Teams store experience, you can now update the LOB apps by logging in to the [Teams Admin Centre](https://admin.teams.microsoft.com).

The following table includes Teams features and availability for GCC, GCC-High, and DOD:

| Features   | GCC | GCC-High | DOD |
|-------------|---------|
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
> [Teams app entry points](../concepts/extensibility-points.md)

## See also

* [Build apps for Teams](../overview.md)
* [Build your first Microsoft Teams app](../build-your-first-app/build-first-app-overview.md)