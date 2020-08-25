---
title: Integrating web apps with Microsoft Teams
author: heath-hamilton
description: Understand the steps needed to integrate your web app with Microsoft Teams
---
# Integrating existing apps with Teams

These guidelines can help you efficiently integrate the following types of apps with Teams:

* Standalone web apps
* Collaboration platform apps
* SharePoint pages

## Do initial planning

Integrating an app as is likely will feel foreign, awkward, or broken to the Teams experience. Make sure you first:

1. [Map your app's use cases to Teams capabilities](../concepts/design/map-use-cases.md).
1. [Determine your app's scope](../planning-your-app/app-scope.md). Is it for personal use, collaboration, or both?

## Aim towards multitenancy

If you don't already do this, consider the SaaS model for your app. Hosting a multitenant app makes your product scalable and simplifies the Teams app manifest and app distribution.

## Review your APIs

Migrating an app into Teams doesn't mean the APIs sufficiently when running from within Teams. Identity mapping, deep link support, and Microsoft Graph API integration might drive the need for API updates and should be considered when estimating a migration.

## Consider authentication

Like all of Microsoft 365, Teams uses Azure Active Directory (AD) as an identity provider. If your app uses a different identity provider, you must either go through an identity mapping exercise or federate with Azure AD.

Teams has SSO mechanisms with Azure AD for third-party apps and guidance for doing authentication flows to other identity providers using standards such as OAuth and Open ID Connect (OIDC).

## Consider a subset of functionality

If you haven't integrated your app with a collaboration platform like Teams, you may be unfamiliar with what makes the best 

## Follow design guidelines

* **Limit navigation**: Embedding web content into a tab with little design updates is likely to lead to poor UX. For example, tabs are in themselves a top navigation, so any subnavigation needs to be carefully considered and navigation within a tab should be minimized.
* **Use familiar iconography**: Your application will not feel native to Microsoft Teams if it uses different  iconography. Consider the Fluent UI icons for actions or navigation within your app and Teams.
* **Consider themes**: Good Teams apps feel like a native part of teams, so matching the user's theme in your app is important. This means supporting three different sets of styles (default, dark, and high-contrast). Themes are primarily a consideration in tab development, but messaging extensions have their own theming considerations.

[See the complete Teams design guidelines](../designing-your-app/designing-overview.md)

## Reuse UI components

If you built your app in a modular way, try reusing those components wherever possible. This can accelerate your development and reduce maintenance issues. For example, fixing a bug won't require changes in two places.

## Understand context in Teams

Teams provides rich, contextual information to bots, messaging extensions, and tabs. This can include details about who's using the app, which chats and channels the app is running, and the theme (light, dark, or high contrast) a user configures. For example, the [Teams JavaScript client SDK](https://docs.microsoft.com/javascript/api/@microsoft/teams-js/?view=msteams-client-js-latest) can make your tab aware of and react to theme changes.

## Be smart about notifications

Consider the long-term vision of the app when considering notifications. If you think your app will have multi-threaded conversations, a bot might be the more flexible capability to build than webhooks.

## Maximize deep links

Almost everything in Teams can be linked to directly with a deep link. Your app should maximize use of these, including deep linking from messages and tabs and providing deep links users can share to navigate directly to a tab with additional context.

## Capture new user details

If your app includes a bot, your app should listen for new members added and store their details. This includes a proprietary Teams identifier that's required to send proactive messages to that user. It also saves you an additional call to the Microsoft Graph APO and user consent for querying team membership.

### Use SharePoint for file and data storage

When you create a team, a SharePoint site collection is provisioned to support file and data storage for that team. Your application can and should leverage this site collection if interacting with files. It can also be used to store raw data in SharePoint Lists and Excel.

## Plan for localization

Delivering a Teams app that supports multiple languages takes additional planning. Locale is available as contextual information to most Teams extensions, but translations and planning are also necessary in the app manifest.

## Standalone web app considerations

Some text.

## Collaboration app consideations

If you've already created an app for a collaboration platform such as Slack ...

### Plan your Teams app

If you want to create a Teams app that's similar to your Slack app, you must understand how 

1. Map your app's use cases to Teams capabilities
1. Determine your app contexts

## SharePoint page considerations

xxx
