---
author: heath-hamilton
description: Best practices for integrating an existing web app with Microsoft Teams
ms.author: heath-hamilton
ms.date: 08/26/2020
ms.topic: conceptual
title: Integrating a web app with Microsoft Teams
---
# Integrating a web app with Teams

Do you have an existing web app you think would fit naturally with Teams' social and collaborative features? Follow these guidelines to understand how to integrate these types of apps:

* Standalone apps
* Collaboration platform apps
* SharePoint

For each guideline, you can see if it's applicable to your integration scenario.

## Get to know Teams platform capabilities

***Integration scenarios**: Standalone apps, collaboration platform apps, SharePoint*

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

---

## Determine a subset of functionality

***Integration scenarios**: Standalone apps*

Integrating every part of an app with Teams typically isn't ideal. For large apps, this may even be detrimental to the user experience. Consider not only which features are most used but also which features would be most useful within Teams. Remember, you can always allow users to pop out to the main app and access other features.

Before you begin any technical work, do some planning for your Teams app:

1. [Map your app's use cases to Teams platform capabilities](../concepts/design/map-use-cases.md).
1. [Determine your app's scope](../planning-your-app/app-scope.md). Is it for personal use, collaboration, or both?

---

## Understand SharePoint requirements and options

***Integration scenarios**: SharePoint*

You can integrate an existing SharePoint page as a Teams tab. Remember the following:

* It must be a *modern* SharePoint Online page
* Only personal tabs are supported (no channel tab integration)

See the [full instructions](https://docs.microsoft.com/en-us/MicrosoftTeams/teams-standalone-static-tabs-using-spo-sites).

Alternatively, you can build a Teams tab [using the SharePoint Framework](https://docs.microsoft.com/en-us/sharepoint/dev/spfx/integrate-with-teams-introduction).

---

## Aim towards multitenancy

***Integration scenarios**: Standalone apps, collaboration platform apps, SharePoint*

If you don't already do this, consider the Software-as-a-Service (SaaS) model for your app. Hosting a multitenant app makes your product scalable and simplifies app distribution.

---

## Review your APIs

***Integration scenarios**: Standalone apps, collaboration platform apps*

It isn't guaranteed your app's existing APIs will work the same when running in Teams. Identity mapping, deep-link support, and Microsoft Graph API integration might require API updates and should be considered when estimating an integration.

---

## Think about authentication

***Integration scenarios**: Standalone apps, collaboration platform apps, SharePoint*

Like the rest of of Microsoft 365, Teams uses Azure Active Directory (AD) as an identity provider. If your app uses a different identity provider, you must either do an identity mapping exercise or federate with Azure AD.

Teams has single sign-on (SSO) mechanisms with Azure AD for third-party apps and guidance for authentication flows to other identity providers using standards such as OAuth and Open ID Connect (OIDC).

For SharePoint pages, you can only use SSO and can't add another Azure AD ID if you want SSO to work for another app (since the ID is the SharePoint app).

---

## Follow Teams app design guidelines

***Integration scenarios**: Standalone apps, collaboration platform apps*

In general, your app should feel natural to the Teams user experience.

* **Limit navigation**: Embedding web content in a tab with little design updates likely will be an awkward or even broken user experience. For example, tabs are in themselves a top navigation, so any further navigation must be carefully considered and minimized.
* **Use familiar iconography and controls**: Consider using the [Fluent Design System](https://fluentsite.z22.web.core.windows.net/) for actions or navigation within your app and Teams.
* **Consider themes**: Good Teams apps feel like a native part of teams, so matching the user's theme in your app is important (especially with tabs). This means supporting three different color schemes (default [light], dark, and high contrast).

---

## Reuse UI components

***Integration scenarios**: Standalone apps, collaboration platform apps, SharePoint*

If you built your app in a modular way, try reusing those components if possible to accelerate development and reduce maintenance issues (fixing a bug won't require changes in two places). For example, you can build Teams tabs content however you like as long as the content can display in an `<iframe>`.

---

## Understand context in Teams

***Integration scenarios**: Standalone apps, collaboration platform apps*

Teams provides rich, contextual information to bots, messaging extensions, and tabs. This can include details about who's using the app, which chats and channels the app is running, and the theme (light, dark, or high contrast) a user configures. For example, the [Teams JavaScript client SDK](https://docs.microsoft.com/javascript/api/@microsoft/teams-js/?view=msteams-client-js-latest) can make your tab aware of and react to theme changes.

---

## Be smart about notifications

***Integration scenarios**: Standalone apps, collaboration platform apps*

Consider the long-term vision of the app when considering notifications. If you think your app will have multi-threaded conversation, a bot might be the more flexible capability to use than webhooks.

---

## Maximize the use of deep links

***Integration scenarios**: Standalone apps, collaboration platform apps, SharePoint*

Almost everything in Teams can be linked to directly with a deep link. Your app should maximize use of these, including linking to and from specific messages and tab content.

---

## Capture new user details

***Integration scenarios**: Standalone apps, collaboration platform apps, SharePoint*

If your app includes a bot, your app should listen for new members added and store their details. This includes a proprietary Teams identifier that's required to send proactive messages to that user. It also saves you an additional Graph API call and getting user consent for querying team membership.

---

## Use SharePoint for file and data storage

***Integration scenarios:** Standalone apps, collaboration platform apps, SharePoint pages*

When you create a team, a SharePoint site collection is also provisioned to support file and data storage for that team. Your app can and should leverage this site collection if interacting with files. It can also be used to store raw data in SharePoint Lists and Excel.

---

## Plan for localization

***Integration scenarios**: Standalone apps, collaboration platform apps*

Publishing a Teams app that supports multiple languages takes additional development time. While in most cases locale is included as contextual app information, you must configure the app manifest and account for translation work.
