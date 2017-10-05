---
title: User Context | Microsoft Docs
description: Describes how to get user context to your apps
author: charlesprakash
ms.author: charlesprakash
manager: billbl
ms.topic: article
ms.prod: msteams
ms.date: 10/05/2017
keywords: teams user context
---

# Get context for your Microsoft Team tab

Your tab might require contextual information in order to display the necessary content.

* Your tab might need basic information about the user, team, or company.
* Your tab might need locale and theme information.
* Your tab might need to read the `entityId` or `subEntityId` that identifies what is in this tab.

## User context

Context about the user, team or company can be especially useful when

* You need to create or associate resources in your app with the specified user or team.
* You want to initiate an authentication flow against Azure Active Directory or other identity provider, and you don't want to require the user to enter their username again. (For more information on authenticating within your Microsoft Teams tab, see [Authenticate a user in your Microsoft Teams tab](auth.md).)

>**Important:** Although this user information can help provide a smooth user experience, you should *not* use it as proof of identity. For example, an attacker could you load your page in a "bad browser" and provide it with any information they want.

To obtain this identifying information about the user, team, or company, you must add `identity` to the `permissions` object in your [manifest](schema.md#permissions). Doing so prompts the user for consent when they add your tab.

## Accessing context

You can access context information in two ways:

* Insert URL placeholder values
* Use the [Microsoft Teams JavaScript Library](jslibrary.md)

### Getting context by inserting URL placeholder values

Use placeholders in your configuration or content URLs. Microsoft Teams replaces the placeholders with the relevant values when determining the actual configuration or content URL to navigate to. The available placeholders include all fields on the [Context](jslibrary.md#Context) object. Common placeholders include the following:

* {entityId}: The ID you supplied for the item in this tab when first [configuring the tab](createconfigpage.md).
* {subEntityId}: The ID you supplied when generating a [deep link](deeplinks.md) for a specific item _within_ this tab. This should be used to restore to a specific state within an entity; for example, scrolling to or activating a specific piece of content.
* {upn}: The user name.
* {groupId}: The ID of an Office 365 group.
* {tid}: The company ID; that is, the tenant ID.
* {locale}: The user locale, such as 'en-us'.

For example, suppose in your tab manifest you set the `configURL` attribute to

`"https://www.contoso.com/config?name={upn}&tenant={tid}&group={groupId}"`

And the signed-in user has the following attributes:

* Their username is 'user@example.com'
* Their company tenant ID is 'e2653c-etc'
* They are a member of the Office 365 group named 'test' 

When they select your tab, they will be navigated to

`https://www.contoso.com/config?name=user@example.com&tenant=e2653c-etc&group=test`

### Getting context by using the Microsoft Teams JavaScript library

You can also retrieve the information listed above using the [Microsoft Teams JavaScript library](jslibrary.md) by calling `microsoftTeams.getContext(function(context) { /* ... */ })`.

The context variable will look like the following example.

```json
{
    "teamId": "The team ID in the format 19:[id]@thread.skype",
    "channelId": "The channel ID in the format 19:[id]@thread.skype",
    "locale": "Lowercase lang-locale",
    "theme": "default | dark | contrast",
    "entityId": "The entity id you set up on your config page",
    "subEntityId": "The sub entity id you set up on your config page",
    "upn": "The user identifier in email format",
    "tid": "Guid identifying the current Tenant ID",
    "groupId": "Guid identifying the current O365 Group ID"
}
```

## Theme change handling

You can register your app to be told if the theme changes by calling `microsoftTeams.registerOnThemeChangeHandler(function(theme) { /* ... */ })`.

Theme will be a string set to `default`, `dark`, or `contrast`
