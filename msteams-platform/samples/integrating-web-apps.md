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

## Determine a subset of functionality

It might not make sense to migrate every part of your existing app into Teams. For large apps, this may even be detrimental to the user experience. Consider not only which features are most used but also which features would be most useful within Teams. For other features, you can always allow the user to pop out to the main app.

Before you begin any technical work, do some initial planning for your Teams app:

1. [Map your app's use cases to Teams capabilities](../concepts/design/map-use-cases.md).
1. [Determine your app's scope](../planning-your-app/app-scope.md). Is it for personal use, collaboration, or both?

## Aim towards multitenancy

If you don't already do this, consider the SaaS model for your app. Hosting a multitenant app makes your product scalable and simplifies the Teams app manifest and app distribution.

## Review your APIs

Migrating an app into Teams doesn't mean the APIs sufficiently when running from within Teams. Identity mapping, deep link support, and Microsoft Graph API integration might drive the need for API updates and should be considered when estimating a migration.

## Consider authentication

Like all of Microsoft 365, Teams uses Azure Active Directory (AD) as an identity provider. If your app uses a different identity provider, you must either go through an identity mapping exercise or federate with Azure AD.

Teams has SSO mechanisms with Azure AD for third-party apps and guidance for doing authentication flows to other identity providers using standards such as OAuth and Open ID Connect (OIDC).

## Follow Teams design guidelines

In general, your app should feel natural to the Teams user experience.

* **Limit navigation**: Embedding web content into a tab with little design updates likely will be an awkward or even broken user experience. For example, tabs are in themselves a top navigation, so any sub-navigation must be carefully considered and navigation within a tab should be minimized.
* **Use familiar iconography**: Your application will not feel native to Microsoft Teams if it uses different  iconography. Consider the Fluent UI icons for actions or navigation within your app and Teams.
* **Consider themes**: Good Teams apps feel like a native part of teams, so matching the user's theme in your app is important. This means supporting three different sets of styles (default, dark, and high-contrast). Themes are primarily a consideration in tab development, but messaging extensions have their own theming considerations.

[See the complete Teams design guidelines](../designing-your-app/designing-overview.md)

## Reuse UI components

If you built your app in a modular way, try reusing those components wherever possible. This can accelerate your development and reduce maintenance issues. For example, fixing a bug won't require changes in two places.

## Understand context in Teams

Teams provides rich, contextual information to bots, messaging extensions, and tabs. This can include details about who's using the app, which chats and channels the app is running, and the theme (light, dark, or high contrast) a user configures. For example, the [Teams JavaScript client SDK](https://docs.microsoft.com/javascript/api/@microsoft/teams-js/?view=msteams-client-js-latest) can make your tab aware of and react to theme changes.

## Be smart about notifications

Consider the long-term vision of the app when considering notifications. If you think your app will have multi-threaded conversations, a bot might be the more flexible capability to build than webhooks.

## Maximize use of deep links

Almost everything in Teams can be linked to directly with a deep link. Your app should maximize use of these, including linking to and from specific messages and tab content.

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

## SharePoint page considerations

If you want to integrate a SharePoint page with Teams:

* It only works for modern SharePoint Online pages 
* Only works as a personal app/tab (not in a channel) 
* You can only use SSO for the SharePoint page and can't add another AAD ID if you wish to have SSO work for another app (since the AAD id will be the SharePoint app)

More details here: https://docs.microsoft.com/en-us/MicrosoftTeams/teams-standalone-static-tabs-using-spo-sites

If you want to add a SharePoint Framework app (not a page), follow the SPFx documentation: https://docs.microsoft.com/en-us/sharepoint/dev/spfx/integrate-with-teams-introduction
