---
title: Get context for your tab
description: Describes how to get user context to your tabs
ms.localizationpriority: medium
ms.topic: how-to
keywords: teams tabs user context
---

# Get context for your tab

Your tab requires contextual information to display relevant content:

* Basic information about the user, team, or company.
* Locale and theme information.
* Read the `entityId` or `subEntityId` that identifies what is in this tab.

[!INCLUDE [sdk-include](~/includes/sdk-include.md)]

## User context

Context about the user, team, or company can be especially useful when:

* You create or associate resources in your app with the specified user or team.
* You initiate an authentication flow from Microsoft Azure Active Directory (Azure AD) or other identity provider, and you don't require the user to enter their username again.

For more information, see [authenticate a user in your Microsoft Teams](~/concepts/authentication/authentication.md).

> [!IMPORTANT]
> Although this user information can help provide a smooth user experience, you must not use it as proof of identity.  For example, an attacker can load your page in a browser and render harmful information or requests.

## Access context information

You can access context information in two ways:

* Insert URL placeholder values.
* Use the [Microsoft Teams JavaScript client SDK](/javascript/api/overview/msteams-client).

### Get context by inserting URL placeholder values

Use placeholders in your configuration or content URLs. Microsoft Teams replaces the placeholders with the relevant values when determining the actual configuration or content URL. The available placeholders include all fields on the [context](/javascript/api/@microsoft/teams-js/microsoftteams.context?view=msteams-client-js-1.12.1&preserve-view=true) object. Common placeholders include the following:

* {entityId}: The ID you supplied for the item in this tab when first [configuring the tab](~/tabs/how-to/create-tab-pages/configuration-page.md).
* {subEntityId}: The ID you supplied when generating a [deep link](~/concepts/build-and-test/deep-links.md) for a specific item within this tab. This must be used to restore to a specific state within an entity; for example, scrolling to or activating a specific piece of content.
* {loginHint}: A value suitable as a login hint for Azure AD. This is usually the login name of the current user in their home tenant.
* {userPrincipalName}: The User Principal Name of the current user in the current tenant.
* {userObjectId}: The Azure AD object ID of the current user in the current tenant.
* {theme}: The current user interface (UI) theme such as `default`, `dark`, or `contrast`.
* {groupId}: The ID of the Office 365 group in which the tab resides.
* {tid}: The Azure AD tenant ID of the current user.
* {locale}: The current locale of the user formatted as languageId-countryId(en-us).

> [!NOTE]
> The previous `{upn}` placeholder is now deprecated. For backward compatibility, it is currently a synonym for `{loginHint}`.

For example, in your tab manifest you set the `configURL` attribute to `"https://www.contoso.com/config?name={loginHint}&tenant={tid}&group={groupId}&theme={theme}"`, the signed-in user has the following attributes:

* Their username is **user@example.com**.
* Their company tenant ID is **e2653c-etc**.
* They're a member of the Office 365 group with id **00209384-etc**.
* The user has set their Teams theme to **dark**.

When they configure the tab, Teams calls the following URL:

`https://www.contoso.com/config?name=user@example.com&tenant=e2653c-etc&group=00209384-etc&theme=dark`

### Get context by using the Microsoft Teams JavaScript library

You can also retrieve the information listed above using the [Microsoft Teams JavaScript client SDK](/javascript/api/overview/msteams-client) by calling the `app.getContext()` function. For additional information, see the properties of the [Context interface](/javascript/api/@microsoft/teams-js/app.context?view=msteams-client-js-latest&preserve-view=true).

## Retrieve context in private channels

When your content page is loaded in a private channel, the data you receive from the `getContext` call is obfuscated to protect the privacy of the channel.

The following fields are changed when your content page is in a private channel:

* `groupId`: Undefined for private channels
* `teamId`: Set to the threadId of the private channel
* `teamName`: Set to the name of the private channel
* `teamSiteUrl`: Set to the URL of a distinct, unique SharePoint site for the private channel
* `teamSitePath`: Set to the path of a distinct, unique SharePoint site for the private channel
* `teamSiteDomain`: Set to the domain of a distinct, unique SharePoint site domain for the private channel

If your page makes use of any of these values, the value of `channelType` field must be `Private` to determine if your page is loaded in a private channel and can respond appropriately.

## Retrieve context in Microsoft Teams Connect shared channels

> [!NOTE]
> Currently, Microsoft Teams Connect shared channels are in [developer preview](../../resources/dev-preview/developer-preview-intro.md) only.

When your content page is loaded in a Microsoft Teams Connect shared channel, the data you receive from the `getContext` call is altered due to the unique roster of users in shared channels.

The following fields are changed when your content page is in a shared channel:

* `groupId`: Undefined for shared channels.
* `teamId`: Set to the `threadId` of the team, the channel is shared for the current user. If the user has access to multiple teams, the `teamId` is set to the team that hosts (creates) the shared channel.
* `teamName`: Set to the name of the team, the channel is shared for the current user. If the user has access to multiple teams, the `teamName` is set to the team that hosts (creates) the shared channel.
* `teamSiteUrl`: Set to the URL of a distinct, unique SharePoint site for the shared channel.
* `teamSitePath`: Set to the path of a distinct, unique SharePoint site for the shared channel.
* `teamSiteDomain`: Set to the domain of a distinct, unique SharePoint site domain for the shared channel.

In addition to these field changes, there're two new fields available for shared channels:

* `hostTeamGroupId`: Set to the `groupId` associated with the hosting team, or the team that created the shared channel. The property can make Microsoft Graph API calls retrieve membership of the shared channel.
* `hostTeamTenantId`: Set to the `tenantId` associated with the hosting team, or the team that created the shared channel. The property can be cross referenced with the current user's tenant ID found in the `tid` field of `getContext` to determine if the user is internal or external to the hosting team's tenant.

If your page makes use of any of these values, the value of `channelType` field must be `Shared` to determine if your page is loaded in a shared channel and can respond appropriately.

> [!NOTE]
> Every time a user restarts or reloads the Teams desktop or web client, a new sessionID is created, which is tracked by Teams session, whereas, when a user exits the Teams apps and reloads it in Teams platform a new app sessionID is created, which is tracked by app session.

## Handle theme change

You can register your app to be informed if the theme changes by calling `app.registerOnThemeChangeHandler(function(theme) { /* ... */ })`.

The `theme` argument in the function is a string with a value of `default`, `dark`, or `contrast`.

## Next step

> [!div class="nextstepaction"]
> [Build tabs with Adaptive Cards](~/tabs/how-to/build-adaptive-card-tabs.md)

## See also

* [Tab design guidelines](../../tabs/design/tabs.md)
* [Teams tabs](~/tabs/what-are-tabs.md)
* [Create a personal tab](~/tabs/how-to/create-personal-tab.md)
* [Create a channel or group tab](~/tabs/how-to/create-channel-group-tab.md)
* [Use task modules in tabs](~/task-modules-and-cards/task-modules/task-modules-tabs.md)
