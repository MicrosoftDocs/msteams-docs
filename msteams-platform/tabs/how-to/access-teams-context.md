---
title: Get context for your tab
description: Describes how to get user context to your tabs
keywords: teams tabs user context
---

# Get context for your Microsoft Teams tab

Your tab might require contextual information to display relevant content.

* Your tab might need basic information about the user, team, or company.
* Your tab might need locale and theme information.
* Your tab might need to read the `entityId` or `subEntityId` that identifies what is in this tab.

## User context

Context about the user, team or company can be especially useful when

* You need to create or associate resources in your app with the specified user or team.
* You want to initiate an authentication flow against Azure Active Directory or other identity provider, and you don't want to require the user to enter their username again. (For more information on authenticating within your Microsoft Teams tab, see [Authenticate a user in your Microsoft Teams tab](~/concepts/authentication/authentication.md).)

> [!IMPORTANT]
> Although this user information can help provide a smooth user experience, you should *not* use it as proof of identity. For example, an attacker could you load your page in a "bad browser" and provide it with any information they want.

## Accessing context

You can access context information in two ways:

* Insert URL placeholder values
* Use the [Microsoft Teams JavaScript client SDK](/javascript/api/overview/msteams-client)

### Getting context by inserting URL placeholder values

Use placeholders in your configuration or content URLs. Microsoft Teams replaces the placeholders with the relevant values when determining the actual configuration or content URL to navigate to. The available placeholders include all fields on the [Context](/javascript/api/@microsoft/teams-js/microsoftteams.context?view=msteams-client-js-latest) object. Common placeholders include the following:

* {entityId}: The ID you supplied for the item in this tab when first [configuring the tab](~/tabs/how-to/create-tab-pages/configuration-page.md).
* {subEntityId}: The ID you supplied when generating a [deep link](~/concepts/build-and-test/deep-links.md) for a specific item _within_ this tab. This should be used to restore to a specific state within an entity; for example, scrolling to or activating a specific piece of content.
* {loginHint}: A value suitable as a login hint for Azure AD.This is usually the login name of the current user, in their home tenant.
* {userPrincipalName}: The User Principal Name of the current user, in the current tenant.
* {userObjectId}: The Azure AD object ID of the current user, in the current tenant.
* {theme}: The current UI theme such as `default`, `dark`, or `contrast`.
* {groupId}: The ID of the Office 365 Group in which the tab resides.
* {tid}: The Azure AD tenant ID of the current user.
* {locale}: The current locale of the user formatted as languageId-countryId (for example, en-us).

>[!NOTE]
>The previous `{upn}` placeholder is now deprecated. For backward compatibility, it is currently a synonym for `{loginHint}`.

For example, suppose in your tab manifest you set the `configURL` attribute to

`"https://www.contoso.com/config?name={loginHint}&tenant={tid}&group={groupId}&theme={theme}"`

And the signed-in user has the following attributes:

* Their username is 'user@example.com'
* Their company tenant ID is 'e2653c-etc'
* They are a member of the Office 365 group with id '00209384-etc'
* The user has set their Teams theme to 'dark'

When they configure your tab, Teams calls this URL:

`https://www.contoso.com/config?name=user@example.com&tenant=e2653c-etc&group=00209384-etc&theme=dark`

### Getting context by using the Microsoft Teams JavaScript library

You can also retrieve the information listed above using the [Microsoft Teams JavaScript client SDK](/javascript/api/overview/msteams-client) by calling `microsoftTeams.getContext(function(context) { /* ... */ })`.

The context variable will look like the following example.

```json
{
    "teamId": "The Microsoft Teams ID in the format 19:[id]@thread.skype",
    "teamName": "The name of the current team",
    "channelId": "The channel ID in the format 19:[id]@thread.skype",
    "channelName": "The name of the current channel",
    "chatId": "The chat ID in the in the format 19:[id]@thread.skype",
    "locale": "The current locale of the user formatted as languageId-countryId (for example, en-us)",
    "entityId": "The developer-defined unique ID for the entity this content points to",
    "subEntityId": "The developer-defined unique ID for the sub-entity this content points to",
    "loginHint": "A value suitable as a login hint for Azure AD. This is usually the login name of the current user, in their home tenant",
    "userPrincipalName": "The User Principal Name of the current user, in the current tenant",
    "userObjectId": "The Azure AD object id of the current user, in the current tenant",
    "tid": "The Azure AD tenant ID of the current user",
    "groupId": "Guid identifying the current O365 Group ID",
    "theme": "The current UI theme: default | dark | contrast",
    "isFullScreen": "Indicates whether the tab is in full-screen mode",
    "userLicenseType": "Indicates the user licence type in the given SKU (for example, student or teacher)",
    "tenantSKU": "Indicates the SKU category of the tenant (for example, EDU)",
    "channelType": "microsoftTeams.ChannelType.Private | microsoftTeams.ChannelType.Regular"
}
```

## Retrieving context in private channels

> [!Note]
> Private channels are currently in private developer preview.

When your content page is loaded in a private channel, the data you receive from the `getContext` call will be obfuscated to protect the privacy of the channel. The following fields are changed when your content page is in a private channel. If your page makes use of any of the values below, you'll need to check the `channelType` field to determine if your page is loaded in a private channel, and respond appropriately.

* `groupId` - Undefined for private channels
* `teamId` - Set to the threadId of the private channel
* `teamName` - Set to the name of the private channel
* `teamSiteUrl` - Set to the URL of a distinct, unique SharePoint site for the private channel
* `teamSitePath` - Set to the path of a distinct, unique SharePoint site for the private channel
* `teamSiteDomain` - Set to the domain of a distinct, unique SharePoint site domain for the private channel

## Theme change handling

You can register your app to be told if the theme changes by calling `microsoftTeams.registerOnThemeChangeHandler(function(theme) { /* ... */ })`.

The `theme` argument in the function will be a string with a value of `default`, `dark`, or `contrast`.