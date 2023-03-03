---
author: heath-hamilton
description: Learn best practices or considerations for integrating existing web apps with Microsoft Teams. It gives information on API requirements, authentication, and deep-linking of your app with Teams.
ms.author: surbhigupta
ms.date: 08/26/2020
ms.localizationpriority: medium
ms.topic: conceptual
title: Considerations for Teams integration
---
# Considerations for Teams integration

You can make web apps suitable with Teams' social and collaborative features, by properly integrating them with Teams.
  
The different types of apps, which you can integrate with Teams are as follows:

* **Standalone apps**: A standalone app is a single-page or large, and complex app. The user can use some aspects of it in Teams.
* **Collaboration apps**: An app already built for the social and collaborative features inherent to Teams.
* **SharePoint**: A SharePoint page you want to surface in Teams.

You can map and follow the appropriate guideline applicable to your integration scenario.
This document gives an overview of Teams capabilities, share-point requirements for file and data storage, API requirements, authentication, and deep-linking of your app with Teams.

## Get to know Teams platform capabilities

***Integration scenarios**: Standalone apps, collaboration apps, SharePoint*

Your Teams app must include required and expected collaborative features. To work with app integration, it's important to familiarize with Teams development terminology.

|Common app features   |Teams platform capabilities   |
|----------|-----------|
|Embedded webpage, homepage, or webview  |[Tabs](../tabs/what-are-tabs.md)  |
|Share shortcuts and extensions  |[Message extensions](../messaging-extensions/what-are-messaging-extensions.md)  |
|Action shortcuts and extensions  |[Message extensions](../messaging-extensions/what-are-messaging-extensions.md)  |
|Chatbots |[Bots](../bots/what-are-bots.md) |
|Channel notifications  |[Bots](../bots/what-are-bots.md)<br/>[Incoming Webhooks](../webhooks-and-connectors/what-are-webhooks-and-connectors.md)<br/>[connectors for Microsoft 365 Groups](../webhooks-and-connectors/what-are-webhooks-and-connectors.md)  |
|Message external services  |[Bots](../bots/what-are-bots.md)<br/>[Outgoing Webhooks](../webhooks-and-connectors/what-are-webhooks-and-connectors.md)  |
|Modals  |[Task modules](../task-modules-and-cards/what-are-task-modules.md)  |
|Content-rich cards  |[Adaptive Cards](../task-modules-and-cards/what-are-cards.md)  |

## Determine a subset of functionality

***Integration scenarios**: Standalone apps*

Integrating all features of an existing application into Teams often leads to a forced or unnatural user experience, particularly in larger apps. Start with the most impactful features and those that integrates more naturally with Teams. You can allow users to launch the main app and access its full set of features.

The following are the prerequisites to integrate your app with Teams.

1. [Map your app's use cases to Teams platform capabilities](../concepts/design/map-use-cases.md).
1. [Determine your app's entry points](../concepts/extensibility-points.md). Is it for personal use, for collaboration, or for both?

## Understand SharePoint requirements and options

***Integration scenarios**: SharePoint*

To integrate an existing [SharePoint page](/sharepoint/dev/general-development/overview-of-the-sharepoint-page-model) as a Teams tab, you must consider the following:

* It must be a *modern* SharePoint online page.
* Only personal tabs are supported. You can't integrate your page as a channel tab.

Alternatively, you can build a Teams tab [using the SharePoint Framework](/sharepoint/dev/spfx/integrate-with-teams-introduction).

## Aim towards multitenancy

***Integration scenarios**: Standalone apps, collaboration apps, SharePoint*

If your app is used by multiple organizations, consider multitenant hosting. It makes your product scalable and simplifies the distribution.

## Review your APIs

***Integration scenarios**: Standalone apps, collaboration apps*

Your app's APIs and data structures must support the app when integrating with Teams. To extend the support, you must augment the APIs and data structures with contextual information about Teams for [identity mapping](../concepts/authentication/authentication.md), [deep-link support](../concepts/build-and-test/deep-links.md), and [incorporating Microsoft Graph](/graph/teams-concept-overview).

See how to get context for your Teams [tab](../tabs/how-to/access-teams-context.md) or [bot](../bots/how-to/get-teams-context.md).

## Understand authentication options

***Integration scenarios**: Standalone apps, collaboration apps, SharePoint*

Azure Active Directory is the identity provider for Teams. If your app uses a different identity provider, you must either do an identity mapping exercise or combine with Microsoft Azure Active Directory (Azure AD).

Teams has single sign-on (SSO) mechanisms with Azure AD for third-party apps. It also provides the guidance for authentication flows to other identity providers using standards such as OAuth and Open ID Connect, known as OIDC.

> [!IMPORTANT]
> Currently, third-party apps are available in Government Community Cloud (GCC) but are not available for GCC-High and Department of Defense (DOD). Third-party apps are turned off by default for GCC. To turn on third-party apps for GCC, see [manage app permission policies](/microsoftteams/teams-app-permission-policies) and [manage apps](/microsoftteams/manage-apps).

For SharePoint pages, you can only use SSO and can't add another Azure AD ID if you want SSO to work for another app as the ID is the SharePoint app.

Learn more about [authentication in Teams](../concepts/authentication/authentication.md).

## Follow Teams design guidelines

***Integration scenarios**: Standalone apps, collaboration apps*

Ensure to follow [Teams design guidelines](../concepts/design/understand-use-cases.md) to make your app native to Teams. You can't migrate an existing app content to a Teams tab. For more information on app design, see [Fluent Design System](https://fluentsite.z22.web.core.windows.net/).

## Maximize deep linking

***Integration scenarios**: Standalone apps, collaboration apps, SharePoint*

You can create links to information and features within Teams. Use [deep links](../concepts/build-and-test/deep-links.md) to link your app with Teams as they tie together multiple pieces of an app for a more native Teams experience.

## Be smart when messaging users

***Integration scenarios**: Standalone apps, collaboration apps, SharePoint*

Use a [bot](../bots/what-are-bots.md) in your Teams app for multi-threaded conversation, as it offers more flexibility than a [webhook](../webhooks-and-connectors/what-are-webhooks-and-connectors.md).

Bots also allow you to send **proactive messages** to individual users or channels. The proactive messages are unprompted messages triggered by an outside event and not a message sent to a bot. For example, your bot sends a welcome message when it's installed or a new user joins a channel.

Sending proactive messages requires Teams-specific identifiers. You can capture the information by [fetching roster or user profile data](../bots/how-to/get-teams-context.md#fetch-the-roster-or-user-profile), [subscribing to conversation events](../bots/how-to/conversations/subscribe-to-conversation-events.md), or using [Microsoft Graph](/microsoftteams/platform/graph-api/proactive-bots-and-messages/graph-proactive-bots-and-messages?context=graph/context#proactive-messaging-in-teams).

Don't spam users with excessive messages. If the Teams capability supports it, the users can configure notification settings for your app.
Following is an example of a notification message:
**Don't send me unprompted messages**.

## Use SharePoint for file and data storage

***Integration scenarios:** Standalone apps, collaboration apps, SharePoint pages*

When a team is created, a [SharePoint site collection](/microsoftteams/sharepoint-onedrive-interact) is also provisioned to support file and data storage for that team. Your app must leverage this feature if it interacts with files. Use the site collection to store raw data in SharePoint Lists and Microsoft Excel.

## See also

* [Integrate web apps](integrate-web-apps-overview.md)
* [Adaptive Cards](../task-modules-and-cards/cards/cards-reference.md#adaptive-card)
* [Integrate web apps](~/samples/integrate-web-apps-overview.md)
* [Low-code and no-code solutions for Microsoft Teams](~/samples/teams-low-code-solutions.md)
* [Share to Teams from web apps](~/concepts/build-and-test/share-to-teams-from-web-apps.md)
* [SameSite cookie attributes](~/resources/samesite-cookie-update.md)
* [Integrate Power Virtual Agents chatbot](~/bots/how-to/add-power-virtual-agents-bot-to-teams.md)
