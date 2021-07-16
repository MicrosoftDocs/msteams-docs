---
title: Get context for your tab
description: Describes how to get user context to your tabs
localization_priority: Normal
ms.topic: how-to
keywords: teams tabs user context
---

# Get context for your tab

Your tab requires contextual information to display relevant content:

* Basic information about the user, team, or company.
* Locale and theme information.
* Read the `entityId` or `subEntityId` that identifies what is in this tab.

## User context

Context about the user, team, or company can be especially useful when:

* You create or associate resources in your app with the specified user or team.
* You can initiate an authentication flow from Azure Active Directory (AAD) or other identity provider. You don't require the user to enter their username again. For more information, see [authenticate a user in your Microsoft Teams tab](~/concepts/authentication/authentication.md).

> [!IMPORTANT]
> Although this user information can help provide a smooth user experience, you must not use it as proof of identity. For example, an attacker can load your page in a browser and render harmful information or requests.

## Access context information

You can access context information in two ways:

* Insert URL placeholder values.
* Use the [Microsoft Teams JavaScript client SDK](/javascript/api/overview/msteams-client).

### Get context by inserting URL placeholder values

Use placeholders in your configuration or content URLs. Microsoft Teams replaces the placeholders with the relevant values when determining the actual configuration or content URL. The available placeholders include all fields on the [context](/javascript/api/@microsoft/teams-js/microsoftteams.context?view=msteams-client-js-latest&preserve-view=true) object. Common placeholders include the following properties:

* {entityId}: The ID you supplied for the item in this tab when first [configuring the tab](~/tabs/how-to/create-tab-pages/configuration-page.md).
* {subEntityId}: The ID you supplied when generating a [deep link](~/concepts/build-and-test/deep-links.md) for a specific item within this tab. This must be used to restore to a specific state within an entity; for example, scrolling to or activating a specific piece of content.
* {loginHint}: A value suitable as a sign-in hint for AAD. This is usually the sign-in name of the current user in their home tenant.
* {userPrincipalName}: The User Principal Name of the current user in the current tenant.
* {userObjectId}: The AAD object ID of the current user in the current tenant.
* {theme}: The current user interface (UI) theme such as `default`, `dark`, or `contrast`.
* {groupId}: The ID of the Office 365 group in which the tab stays.
* {tid}: The AAD tenant ID of the current user.
* {locale}: The current locale of the user formatted as languageId-countryId. For example, en-us.

> [!NOTE]
> The previous `{upn}` placeholder is now deprecated. For backward compatibility, it is currently a synonym for `{loginHint}`.

For example, in your tab manifest you set the `configURL` attribute to `"https://www.contoso.com/config?name={loginHint}&tenant={tid}&group={groupId}&theme={theme}"`, the signed-in user has the following attributes:

* Their username is **user@example.com**.
* Their company tenant ID is **e2653c-etc**.
* They are a member of the Office 365 group with id **00209384-etc**.
* The user has set their Teams theme to **dark**.

When they configure the tab, Teams calls the following URL:

`https://www.contoso.com/config?name=user@example.com&tenant=e2653c-etc&group=00209384-etc&theme=dark`

### Get context by using the Microsoft Teams JavaScript library

You can also retrieve the information listed above using the [Microsoft Teams JavaScript client SDK](/javascript/api/overview/msteams-client) by calling `microsoftTeams.getContext(function(context) { /* ... */ })`.

The following code provides an example of context variable:

```json
{
    "teamId": "The Microsoft Teams ID in the format 19:[id]@thread.skype",
    "teamName": "The name of the current team",
    "channelId": "The channel ID in the format 19:[id]@thread.skype",
    "channelName": "The name of the current channel",
    "chatId": "The chat ID in the format 19:[id]@thread.skype",
    "locale": "The current locale of the user formatted as languageId-countryId (for example, en-us)",
    "entityId": "The developer-defined unique ID for the entity this content points to",
    "subEntityId": "The developer-defined unique ID for the sub-entity this content points to",
    "loginHint": "A value suitable as a login hint for Azure AD. This is usually the login name of the current user, in their home tenant",
    "userPrincipalName": "The principal name of the current user, in the current tenant",
    "userObjectId": "The Azure AD object id of the current user, in the current tenant",
    "tid": "The Azure AD tenant ID of the current user",
    "groupId": "Guid identifying the current O365 Group ID",
    "theme": "The current UI theme: default | dark | contrast",
    "isFullScreen": "Indicates if the tab is in full-screen",
    "teamType": "The type of team",
    "teamSiteUrl": "The root SharePoint site associated with the team",
    "teamSiteDomain": "The domain of the root SharePoint site associated with the team",
    "teamSitePath": "The relative path to the SharePoint site associated with the team",
    "channelRelativeUrl": "The relative path to the SharePoint folder associated with the channel",
    "sessionId": "The unique ID for the current Teams session for use in correlating telemetry data",
    "userTeamRole": "The user's role in the team",
    "isTeamArchived": "Indicates if team is archived",
    "hostClientType": "The type of host client. Possible values are android, ios, web, desktop, rigel",
    "frameContext": "The context where tab URL is loaded (for example, content, task, setting, remove, sidePanel)",
    "sharepoint": "The SharePoint context is available only when hosted in SharePoint",
    "tenantSKU": "The license type for the current user tenant. Possible values are enterprise, free, edu, unknown",
    "userLicenseType": "The license type for the current user",
    "parentMessageId": "The parent message ID from which this task module is launched",
    "ringId": "The current ring ID",
    "appSessionId": "The unique ID for the current session used for correlating telemetry data",
    "isCallingAllowed": "Indicates if calling is allowed for the current logged in user",
    "isPSTNCallingAllowed": "Indicates if PSTN calling is allowed for the current logged in user",
    "meetingId": "The meeting ID used by tab when running in meeting context",
    "defaultOneNoteSectionId": "The OneNote section ID that is linked to the channel"
}
```

## Get context in private channels

> [!NOTE]
> Private channels are currently in private developer preview.

When your content page is loaded in a private channel, the data you receive from the `getContext` call is obfuscated to protect the privacy of the channel. The following fields are changed when your content page is in a private channel:

* `groupId`: Undefined for private channels
* `teamId`: Set to the threadId of the private channel
* `teamName`: Set to the name of the private channel
* `teamSiteUrl`: Set to the URL of a distinct, unique SharePoint site for the private channel
* `teamSitePath`: Set to the path of a distinct, unique SharePoint site for the private channel
* `teamSiteDomain`: Set to the domain of a distinct, unique SharePoint site domain for the private channel

If your page makes use of any of these values, you must check the `channelType` field to determine if your page is loaded in a private channel and respond appropriately.

> [!NOTE]
> `teamSiteUrl` also works well for standard channels.

## Get context in shared channels

> [!NOTE]     
> Shared channels are currently available in [developer preview](~/resources/dev-preview/developer-preview-intro.md) only.

Shared channels in Teams allow members of an organization to collaborate with external members with access permissions. You can create a channel and share the channel with:

* Members of another team within the same organization
* Members of other organizations 

For example, organization A is the host tenant and team A is the host team. Team A creates a channel and shares it with team B within the same organization. Consider organization B is external and consists of members with access permissions. Team A shares the channel with members of organization B. The following image illustrates the concept of shared channels:

![Shared channels](~/assets/images/shared-channels.png)

### Properties

When the content UX is loaded in a shared channel, use the data received from `getContext` call for  shared channel changes. If tab makes use of any of the following values, you must populate the `channelType` field to determine if the tab is loaded in a shared channel, and respond appropriately.

Use the following `getContext` properties to populate the `channelType` field with `sharedChannel`:

|Property name|Description|
|----------|--------------|
|`channelId`| The property is set to the SC channel thread ID.|
|`groupId`|The property is blank for shared Channels.|
|`hostTeamTenantId`| The property describes the host team’s tenant ID. |
|`hostTeamGroupId`|The property describes the host team’s AAD group ID and is called out from groupID. |
|`tid`|  The property describes the current user’s tenant ID, which matches the `homeTid` in the token.|
|`teamId`|The property is set to the thread ID of the current shared team. | 
|`teamName`|The property is set to current shared `teamName`. |
|`teamType`|The property is set to current shared `teamType`.|
|`teamSiteUrl`|The property describes `channelSiteUrl`.| 
|`teamSitePath`| The property describes `channelSitePath`.| 
|`teamSiteDomain`| The property describes  `channelSiteDomain`.| 
|`tenantSKU`| The property describes the host team’s `tenantSKU`.|
|`userObjectId`|  The property describes current user’s ID.|
|`userPrincipalName`| The property describes the current user’s UPN.|
|`userTeamRole`| The property describes user’s role in host team, such as admin, user, guest, and `sharedChannelMember`.  |

### App permissions 

App permissions in shared channels follow host team's app roster and host tenant's app policy. You can customize the app permission for external members, if your app shares important information. You can use `Conversations API` and `users.info` method to determine appropriate data access of your app.

### Get direct shared channel membership

You can get direct shared channel membership by following the steps:

1. Get direct members with [GET channel members](/graph/api/channel-list-members?view=graph-rest-beta&tabs=http&preserve-view=true) API. 

    ```http
    GET /teams/{host-team-group-id}/channels/{channel-id}/members
    ```
2. Get each shared team with `GET sharedWithTeam` API.

    ```http
    GET /teams/{host-team-group-id}/channels/{channel-id}/sharedWithTeams
    ```
3. Use [GET channel members](/graph/api/channel-list-members?view=graph-rest-beta&tabs=http&preserve-view=true) API on each `sharedWithTeam` to get full membership.

### AAD native identity 

The apps must function cross-tenant in installation and usage. The following table lists the channel types and their corresponding group IDs:

|  Channel type  | groupId | hostTeamGroupId |
|-----------------|----------|----------------------|
|Regular|	Team AAD group ID|	Team AAD group ID|
|Private|Empty|	Host Team AAD group ID|
|Shared|	Empty|	Host Team AAD group ID|

### Manifest update 

You can use `supportsSharedChannels` boolean property in the app manifest to control app access in shared channel. You can set the property value to `true` or `false` and give apps permissions. 

## Handle theme change

You can register your app to be informed if the theme changes by calling `microsoftTeams.registerOnThemeChangeHandler(function(theme) { /* ... */ })`.
The `theme` argument in the function is a string with a value of `default`, `dark`, or `contrast`.

## See also

* [Tab design guidelines](~/tabs/how-to/build-adaptive-card-tabs.md)
* [Teams tabs](~/tabs/what-are-tabs.md)
* [Create a personal tab](~/tabs/how-to/create-personal-tab.md)
* [Create a channel or group tab](~/tabs/how-to/create-channel-group-tab.md)
