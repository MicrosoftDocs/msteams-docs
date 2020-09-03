---
author: heath-hamilton
description: Best practices for integrating an existing web app with Microsoft Teams
ms.author: heath-hamilton
ms.date: 08/26/2020
ms.topic: conceptual
title: Integrating a web app with Microsoft Teams
---
# Integrating web apps with Teams

Do you have an existing web app you think would fit naturally with Teams' social and collaborative features? These guidelines can help you understand how to integrate the following types of apps:

* **Standalone apps**: Could be a single-page app or large, complex app you want people to use some aspects of in Teams.
* **Collaboration apps**: An app already built for the social and collaborative features inherent to Teams.
* **SharePoint**: SharePoint pages, such as your organization's intranet portal, which you can surface in Teams.

For each guideline, you can see if it's applicable to your integration scenario.

## Get to know Teams platform capabilities

***Integration scenarios**: Standalone apps, collaboration apps, SharePoint*

Your Teams app can include features users want and might expect when collaborating, but you may be unfamiliar with Teams development terminology.

|Common app features   |Teams platform capabilities   |
|----------|-----------|
|Embedded webpage, homepage, or webview  |[Tabs](../tabs/what-are-tabs.md)  |
|Share shortcuts and extensions  |[Messaging extensions](../messaging-extensions/what-are-messaging-extensions.md)  |
|Action shortcuts and extensions  |[Messaging extensions](../messaging-extensions/what-are-messaging-extensions.md)  |
|Chatbots  |[Bots](../bots/what-are-bots.md) |
|Channel notifications  |[Bots](../bots/what-are-bots.md)<br/>[Incoming webhooks](../webhooks-and-connectors/what-are-webhooks-and-connectors.md)<br/>[Office 365 Connectors](../webhooks-and-connectors/what-are-webhooks-and-connectors.md)  |
|Message external services  |[Bots](../bots/what-are-bots.md)<br/>[Outgoing webhooks](../webhooks-and-connectors/what-are-webhooks-and-connectors.md)  |
|Modals  |[Task modules](../task-modules-and-cards/what-are-task-modules.md)  |
|Content-rich cards  |[Adaptive Cards](../task-modules-and-cards/what-are-cards.md)  |

Learn more about [Teams app concepts and capabilities](../concepts/capabilities-overview.md).

## Determine a subset of functionality

***Integration scenarios**: Standalone apps*

Integrating all features of an existing application into Teams often leads to a forced or unnatural user experience, particularly in larger apps. Consider starting with the most impactful features and those that will integrate more naturally into Teams. Remember, you can always allow users to launch the main app and access the full set of features offered by the application.

Before you begin any technical work, do some planning for your Teams app:

1. [Map your app's use cases to Teams platform capabilities](../concepts/design/map-use-cases.md).
1. [Determine your app's scope](../planning-your-app/app-scope.md). Is it for personal use, collaboration, or both?

## Understand SharePoint requirements and options

***Integration scenarios**: SharePoint*

You can integrate an existing [SharePoint page](https://docs.microsoft.com/MicrosoftTeams/teams-standalone-static-tabs-using-spo-sites) as a Teams tab. Remember the following:

* It must be a *modern* SharePoint Online page
* Only personal tabs are supported (no channel tab integration)

Alternatively, you can build a Teams tab [using the SharePoint Framework](https://docs.microsoft.com/sharepoint/dev/spfx/integrate-with-teams-introduction).

## Aim towards multi-tenancy

***Integration scenarios**: Standalone apps, collaboration apps, SharePoint*

If your application is a software product used by multiple organizations, consider multi-tenant hosting that would maximize the economies of scale offered by a Software-as-a-Service (SaaS) application. Hosting a multi-tenant app makes your product scalable and greatly simplifies app distribution.

## Review your APIs

***Integration scenarios**: Standalone apps, collaboration apps*

Don't assume your app's existing APIs and data structures will support the app integrated into Microsoft Teams. These might need to be augmented with additional contextual information from Microsoft Teams for the purpose of [Identity mapping](../concepts/authentication/configure-identity-provider.md), [deep-link support](../concepts/build-and-test/deep-links.md), and [incorporating Microsoft Graph](https://docs.microsoft.com/graph/teams-concept-overview). It would help to review [Get Team's specific context in a bot](https://docs.microsoft.com/en-us/microsoftteams/platform/bots/how-to/get-teams-context?tabs=dotnet) and [Get context for your Microsoft Teams tab](https://docs.microsoft.com/en-us/microsoftteams/platform/tabs/how-to/access-teams-context) when estimating your integration.

## Think about authentication

***Integration scenarios**: Standalone apps, collaboration apps, SharePoint*

The identity provider for Microsoft Teams is Azure Active Directory (AD). If your app uses a different identity provider, you must either do an identity mapping exercise or federate with Azure AD.

Teams has single sign-on (SSO) mechanisms with Azure AD for third-party apps and guidance for authentication flows to other identity providers using standards such as OAuth and Open ID Connect (OIDC).

For SharePoint pages, you can only use SSO and can't add another Azure AD ID if you want SSO to work for another app (since the ID is the SharePoint app).

Learn more about [authentication in Teams](../concepts/authentication/authentication.md).

## Follow Teams app design guidelines

***Integration scenarios**: Standalone apps, collaboration apps*

In general, your app should feel natural to the Teams user experience.

* **Limit navigation**: Embedding web content in a tab with little design updates likely will be an awkward or even broken user experience. For example, tabs are in themselves a top navigation, so any further navigation must be carefully considered and minimized.
* **Use familiar iconography and controls**: Consider using the [Fluent Design System](https://fluentsite.z22.web.core.windows.net/) for actions or navigation within your app and Teams.
* **Consider themes**: Good Teams apps feel like a native part of teams, so matching the user's theme in your app is important (especially with tabs). This means supporting three different color schemes (default [light], dark, and high contrast).

## Reuse UI components

***Integration scenarios**: Standalone apps, collaboration apps, SharePoint*

If you built your app in a modular way, try reusing those components if possible to accelerate development and reduce maintenance issues (fixing a bug won't require changes in two places). For example, you can build Teams tabs content however you like as long as the content can display in an `<iframe>`.

## Plan for localization

***Integration scenarios**: Standalone apps, collaboration apps*

Publishing a [Teams app that supports multiple languages](../concepts/build-and-test/apps-localization.md) takes additional development time. While in most cases locale is included as contextual app information, you must configure the app manifest and account for translation work.

## Understand context in Teams

***Integration scenarios**: Standalone apps, collaboration apps*

Teams provides rich, contextual information to bots, messaging extensions, and tabs. This can include details about who's using the app, which chats and channels the app is running, and the theme (light, dark, or high contrast) a user configures. For example, the [Teams JavaScript client SDK](https://docs.microsoft.com/javascript/api/@microsoft/teams-js/?view=msteams-client-js-latest) can make your tab aware of and react to theme changes. See [Get Team's specific context in a bot](https://docs.microsoft.com/en-us/microsoftteams/platform/bots/how-to/get-teams-context?tabs=dotnet) and [Get context for your Microsoft Teams tab](https://docs.microsoft.com/en-us/microsoftteams/platform/tabs/how-to/access-teams-context) for a complete overview of the context available to your application.

## Be smart about notifications

***Integration scenarios**: Standalone apps, collaboration apps*

Consider the long-term vision of the app when considering notifications. If you think your app will ever have multi-threaded conversation, a [conversational bot](../bots/what-are-bots.md) might be the more flexible capability than webhooks. You should be responsible with notifications and not spam users with excessive activity. Consider allowing users to configure the notification settings specific to your application.

## Maximize deep linking

***Integration scenarios**: Standalone apps, collaboration apps, SharePoint*

Almost everything in Teams can be linked to directly with a [deep link](../concepts/build-and-test/deep-links.md). Your app should maximize use of these, including linking to and from specific messages and tab content. Deep links can really help pull together multiple integrations of an app to feel more native to Microsoft Teams.

## Proactive messages

***Integration scenarios**: Standalone apps, collaboration apps, SharePoint*

If your app includes a bot, you may want to send proactive messages to individual users or Team channels. Proactive messages are unprompted messages from a bot triggered by an outside event instead of a message sent into the bot. For example, your bot can sent a welcome message when it is installed or when a new user joins a channel. Sending a proactive message requires Teams-specific identifiers not available through the Microsoft Graph, so you should capture this information by [fetching roster or user profile](https://docs.microsoft.com/en-us/microsoftteams/platform/bots/how-to/get-teams-context?tabs=dotnet#fetching-the-roster-or-user-profile) data in conjunction with [subscribing to conversation events](https://docs.microsoft.com/en-us/microsoftteams/platform/bots/how-to/conversations/subscribe-to-conversation-events?tabs=dotnet). These can also save you from making additional Graph API calls and requiring user consent for querying team membership.

## Use SharePoint for file and data storage

***Integration scenarios:** Standalone apps, collaboration apps, SharePoint pages*

When a team is created, a [SharePoint site collection](https://docs.microsoft.com/microsoftteams/sharepoint-onedrive-interact) is also provisioned to support file and data storage for that team. Your app can and should leverage this feature if it interacts with files. You can also use the site collection to store raw data in SharePoint Lists and Excel.
