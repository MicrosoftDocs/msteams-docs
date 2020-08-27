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
|Embedded webpage, homepage, or WebView  |Tabs  |
|Share shortcuts and extensions  |Messaging extensions  |
|Action shortcuts and extensions  |Messaging extensions  |
|Chatbots  |Bots |
|Channel notifications  |Bots<br/>Incoming webhooks<br/>Office 365 Connectors  |
|Message external services  |Bots<br/>Outgoing webhooks  |
|Modals  |Task modules  |
|Content-rich cards  |Adaptive Cards  |

Learn more about [Teams app concepts and capabilities](../concepts/capabilities-overview.md).

## Determine a subset of functionality

***Integration scenarios**: Standalone apps*

Integrating every part of an app with Teams typically isn't ideal. For large apps, this may even be detrimental to the user experience. Consider not only which features are most used but also which features would be most useful within Teams. Remember, you can always allow users to pop out to the main app and access other features.

Before you begin any technical work, do some planning for your Teams app:

1. [Map your app's use cases to Teams platform capabilities](../concepts/design/map-use-cases.md).
1. [Determine your app's scope](../planning-your-app/app-scope.md). Is it for personal use, collaboration, or both?

## Understand SharePoint requirements and options

***Integration scenarios**: SharePoint*

You can integrate an existing SharePoint page as a Teams tab. Remember the following:

* It must be a *modern* SharePoint Online page
* Only personal tabs are supported (no channel tab integration)

See the [full instructions](https://docs.microsoft.com/en-us/MicrosoftTeams/teams-standalone-static-tabs-using-spo-sites).

Alternatively, you can build a Teams tab [using the SharePoint Framework](https://docs.microsoft.com/en-us/sharepoint/dev/spfx/integrate-with-teams-introduction).

## Aim towards multitenancy

***Integration scenarios**: Standalone apps, collaboration apps, SharePoint*

If you don't already do this, consider the Software-as-a-Service (SaaS) model for your app. Hosting a multitenant app makes your product scalable and simplifies app distribution.

## Review your APIs

***Integration scenarios**: Standalone apps, collaboration apps*

It isn't guaranteed your app's existing APIs will work the same when running in Teams. [Identity mapping](..concepts/authentication/configure-identity-provider.md), [deep-link support](../concepts/build-and-test/deep-links.md), and [incorporating Microsoft Graph](https://docs.microsoft.com/en-us/graph/teams-concept-overview) might require API updates and should be considered when estimating your integration.

## Think about authentication

***Integration scenarios**: Standalone apps, collaboration apps, SharePoint*

Like the rest of of Microsoft 365, Teams uses Azure Active Directory (AD) as an identity provider. If your app uses a different identity provider, you must either do an identity mapping exercise or federate with Azure AD.

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

Teams provides rich, contextual information to bots, messaging extensions, and tabs. This can include details about who's using the app, which chats and channels the app is running, and the theme (light, dark, or high contrast) a user configures. For example, the [Teams JavaScript client SDK](https://docs.microsoft.com/javascript/api/@microsoft/teams-js/?view=msteams-client-js-latest) can make your tab aware of and react to theme changes.

## Be smart about notifications

***Integration scenarios**: Standalone apps, collaboration apps*

Consider the long-term vision of the app when considering notifications. If you think your app will have multi-threaded conversation, a [conversational bot](../bots/what-are-bots.md) might be the more flexible capability than webhooks.

## Maximize deep linking

***Integration scenarios**: Standalone apps, collaboration apps, SharePoint*

Almost everything in Teams can be linked to directly with a [deep link](../concepts/build-and-test/deep-links.md). Your app should maximize use of these, including linking to and from specific messages and tab content.

## Know when new users are added to conversations

***Integration scenarios**: Standalone apps, collaboration apps, SharePoint*

If your app includes a bot, your app can [listen for when new members](../bots/how-to/conversations/conversation-basics.md) are added and store their details. For example, your bot can send a welcome message when a user joins a channel. Doing this requires a proprietary Teams identifier for sending proactive messages to a user. It also saves you an additional Graph API call and getting user consent for querying team membership.

## Use SharePoint for file and data storage

***Integration scenarios:** Standalone apps, collaboration apps, SharePoint pages*

When a team is created, a [SharePoint site collection](https://docs.microsoft.com/en-us/microsoftteams/sharepoint-onedrive-interact) is also provisioned to support file and data storage for that team. Your app can and should leverage this feature if it interacts with files. You can also use the site collection to store raw data in SharePoint Lists and Excel.
