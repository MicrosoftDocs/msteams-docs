---
author: heath-hamilton
description: Best practices for integrating existing web apps with Microsoft Teams
ms.author: v-heha
ms.date: 08/26/2020
ms.topic: conceptual
title: Integrate a web app with Microsoft Teams
---
# Integrate web apps with Teams

Do you have a web app you think would fit naturally with Teams' social and collaborative features? These guidelines can help you understand how to integrate the following types of apps:

* **Standalone apps**: Could be a single-page app or large, complex app you want people to use some aspects of in Teams.
* **Collaboration apps**: An app already built for the social and collaborative features inherent to Teams.
* **SharePoint**: A SharePoint page you want to surface in Teams.

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

## Determine a subset of functionality

***Integration scenarios**: Standalone apps*

Integrating all features of an existing application into Teams often leads to a forced or unnatural user experience, particularly in larger apps. Consider starting with the most impactful features and those that will integrate more naturally with Teams. Remember, you can always allow users to launch the main app and access its full set of features.

Before you begin any technical work, do some planning for your Teams app:

1. [Map your app's use cases to Teams platform capabilities](../concepts/design/map-use-cases.md).
1. [Determine your app's scope](../planning-your-app/app-scope.md). Is it for personal use, collaboration, or both?

## Understand SharePoint requirements and options

***Integration scenarios**: SharePoint*

You can integrate an existing [SharePoint page](https://docs.microsoft.com/MicrosoftTeams/teams-standalone-static-tabs-using-spo-sites) as a Teams tab. Remember the following:

* It must be a *modern* SharePoint Online page
* Only personal tabs are supported (you can't integrate your page as a channel tab)

Alternatively, you can build a Teams tab [using the SharePoint Framework](https://docs.microsoft.com/sharepoint/dev/spfx/integrate-with-teams-introduction).

## Aim towards multi-tenancy

***Integration scenarios**: Standalone apps, collaboration apps, SharePoint*

If your app is used by multiple organizations, consider multi-tenant hosting that would make your product scalable and greatly simplify distribution.

## Review your APIs

***Integration scenarios**: Standalone apps, collaboration apps*

Don't assume your app's existing APIs and data structures fully support the app when integrated with Teams. You might need to augment these with contextual information about Teams for [identity mapping](../concepts/authentication/configure-identity-provider.md), [deep-link support](../concepts/build-and-test/deep-links.md), and [incorporating Microsoft Graph](https://docs.microsoft.com/graph/teams-concept-overview).

Learn more about getting context for your Teams [tab](../tabs/how-to/access-teams-context.md) or [bot](../bots/how-to/get-teams-context.md).

## Understand authentication options

***Integration scenarios**: Standalone apps, collaboration apps, SharePoint*

Azure Active Directory (AD) is the identity provider for Teams. If your app uses a different identity provider, you must either do an identity mapping exercise or federate with Azure AD.

Teams has single sign-on (SSO) mechanisms with Azure AD for third-party apps and guidance for authentication flows to other identity providers using standards such as OAuth and Open ID Connect (OIDC).

For SharePoint pages, you can only use SSO and can't add another Azure AD ID if you want SSO to work for another app (since the ID is the SharePoint app).

Learn more about [authentication in Teams](../concepts/authentication/authentication.md).

## Follow Teams design guidelines

***Integration scenarios**: Standalone apps, collaboration apps*

In general, your app should feel natural in Teams. You might think migrating existing app content to a Teams tab is sufficient, but we strongly recommend your app follows [Teams design guidelines](../concepts/design/understand-use-cases.md). See also: [Fluent Design System](https://fluentsite.z22.web.core.windows.net/).

## Maximize deep linking

***Integration scenarios**: Standalone apps, collaboration apps, SharePoint*

Almost everything in Teams can be linked to directly with a [deep link](../concepts/build-and-test/deep-links.md). Your app should maximize use of these, including linking to and from specific messages and tab content. Deep links can really tie together multiple pieces of an app for a more native Teams experience.

## Be smart when messaging users

***Integration scenarios**: Standalone apps, collaboration apps, SharePoint*

Consider the types of messages your Teams app might send now and in the long term. If you think your app will ever have a multi-threaded conversation, a [bot](../bots/what-are-bots.md) might offer more flexibility than a [webhook](../webhooks-and-connectors/what-are-webhooks-and-connectors.md).

Bots also allow you to send *proactive messages* to individual users or channels. These are unprompted messages triggered by an outside event and not a message sent to a bot. (For example, your bot can send a welcome message when it's installed or a new user joins a channel.) 

Sending proactive messages requires Teams-specific identifiers—you can capture this information by [fetching roster or user profile data](../bots/how-to/get-teams-context.md#fetching-the-roster-or-user-profile), [subscribing to conversation events](../bots/how-to/conversations/subscribe-to-conversation-events.md), or using [Microsoft Graph](https://docs.microsoft.com/graph/teams-proactive-messaging).

Be careful not to spam users with excessive messages. If the Teams capability supports it, consider letting users configure notification settings for your app (for example, "Don't send me unprompted messages.").

## Use SharePoint for file and data storage

***Integration scenarios:** Standalone apps, collaboration apps, SharePoint pages*

When a team is created, a [SharePoint site collection](https://docs.microsoft.com/microsoftteams/sharepoint-onedrive-interact) is also provisioned to support file and data storage for that team. Your app can and should leverage this feature if it interacts with files. You can also use the site collection to store raw data in SharePoint Lists and Excel.
