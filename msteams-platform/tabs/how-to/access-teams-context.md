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
* You initiate an authentication flow from Azure Active Directory (AAD) or other identity provider, and you do not require the user to enter their username again. For more information, see [authenticate a user in your Microsoft Teams tab](~/concepts/authentication/authentication.md).

> [!IMPORTANT]
> Although this user information can help provide a smooth user experience, you must not use it as proof of identity. For example, an attacker can load your page in a browser and render harmful information or requests.

## Access context information

You can access context information in two ways:

* Insert URL placeholder values.
* Use the [Microsoft Teams JavaScript client SDK](/javascript/api/overview/msteams-client).

### Get context by inserting URL placeholder values

Use placeholders in your configuration or content URLs. Microsoft Teams replaces the placeholders with the relevant values when determining the actual configuration or content URL. The available placeholders include all fields on the [context](/javascript/api/@microsoft/teams-js/microsoftteams.context?view=msteams-client-js-latest&preserve-view=true) object. Common placeholders include the following:

* {entityId}: The ID you supplied for the item in this tab when first [configuring the tab](~/tabs/how-to/create-tab-pages/configuration-page.md).
* {subEntityId}: The ID you supplied when generating a [deep link](~/concepts/build-and-test/deep-links.md) for a specific item within this tab. This must be used to restore to a specific state within an entity; for example, scrolling to or activating a specific piece of content.
* {loginHint}: A value suitable as a login hint for AAD. This is usually the login name of the current user in their home tenant.
* {userPrincipalName}: The User Principal Name of the current user in the current tenant.
* {userObjectId}: The AAD object ID of the current user in the current tenant.
* {theme}: The current user interface (UI) theme such as `default`, `dark`, or `contrast`.
* {groupId}: The ID of the Office 365 group in which the tab resides.
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

> [!Note]
> Private channels are currently in private developer preview.

When your content page is loaded in a private channel, the data you receive from the `getContext` call is obfuscated to protect the privacy of the channel. The following fields are changed when your content page is in a private channel:

* `groupId`: Undefined for private channels
* `teamId`: Set to the threadId of the private channel
* `teamName`: Set to the name of the private channel
* `teamSiteUrl`: Set to the URL of a distinct, unique SharePoint site for the private channel
* `teamSitePath`: Set to the path of a distinct, unique SharePoint site for the private channel
* `teamSiteDomain`: Set to the domain of a distinct, unique SharePoint site domain for the private channel

If your page makes use of any of these values, you must check the `channelType` field to determine if your page is loaded in a private channel and respond appropriately.

> [!Note]
> `teamSiteUrl` also works well for standard channels.

## Shared channels

Team members use chats and channels to communicate among themselves and share information. There are scenarios, when the team must communicate with external members. The users create new chats with the external members or add the external members to the existing chats or channels for communication, which results in the following issues:

* The external users can access the entire team content.
* The chats with external member give limited compliance controls to the system admin.    

To resolve the preceding issues, a combination to share channel across the organization along with the ability to invite people to a specific channel has been introduced. Currently, people across and outside the organization can collaborate effectively using shared channels. The shared channel provides easy collaboration and allows to work efficiently with agencies, vendors, or clients. 

The following image illustrates the concept of shared channels:
[Place holder for image]

## Advantages

* You can share a channel across the organizational boundaries and invite people to a specific channel for effective collaboration and required information. 
* Bot users are accessible to all users in the workspace with apps installed and any external members in a channel between organizations with specified bot. 
* The team parameter informs your app about the message origin for external users. 
* You can use Conversations API and `users.info` method to determine appropriate data access of your app. 
* By default, your app must expose less information in shared channels to protect your users’ data. You must change the app's behavior for external members if your app shares sensitive information. You can have unique set of tools and apps for multiple companies working together.

## Limitations 

* Private channels: Shared channels have similar isolation challenges as private channels for users who do not belong to the parent team. Use an **allow list** for a set of tabs that functions independent of user groups.
    > [!NOTE]
    > Private channels can be used as Shared channels.    

* Federated users: In Shared channels, the federated tenants encounter the issue of users from multiple organizations accessing the same app. You can follow the `parentTeam/tenant` pattern for app roster, and app management.

## JS SDK and Bot SDK

When the content UX is loaded in a shared channel, the data received from the `getContext` call must account for shared channel changes. If the tab makes use of any of the following values, the `channelType` field must be populated to determine if the tab is loaded in a shared channel, and respond appropriately.
To populate the `channelType` field with `sharedChannel`, you must populate the following  `getContext` properties:

**PROPERTIES:**

|Property name|Description|
|----------|--------------|
|`channelId`| This property is set to the SC channel thread ID.|
|`groupId`|This property is blank for Shared Channels.|
|`hostTeamTenantId`| This property describes the host team’s tenant ID. |
|`hostTeamGroupId`|This property describes the host team’s AAD group ID. This property is distinctly called out from groupID. |
|`tid`|  This property describes the current user’s tenant ID. This matches with the `homeTid` in the token.|
|`teamId`|This property is set to the thread ID of the current shared team. | 
|`teamName`|This property is set to current shared teamName. |
|`teamType`|This property is set to current shared team type.|
|`teamSiteUrl`|This property describes `channelSiteUrl`.| 
|`teamSitePath`| This property describes `channelSitePath`.| 
|`teamSiteDomain`| This property describes  `channelSiteDomain`.| 
|`tenantSKU`| This property describes the host team’s tenant SKU.|
|`userObjectId`|  This property describes current user’s ID, regardless of tenant.|
|`userPrincipalName`| This property describes the current user’s UPN, regardless of tenant.|
|`userTeamRole`| This property describes user’s role in host team:</br>admin </br>user </br> guest </br> [New] sharedChannelMember  |

## Get direct channel membership

Steps to get direct channel membership are as follows:

1. Call [List members of channel](/graph/api/channel-list-members?view=graph-rest-beta&tabs=http&preserve-view=true) API.
1. Get host team group ID with HTTP request `GET /teams/{host-team-group-id}/channels/{channel-id}/members`.
1. Get host team group ID with HTTP request `GET /teams/{host-team-group-id}/channels/{channel-id}/sharedWithTeams`. 
1. Get direct members with the `GET channel members` API.
1.	Iterate through each shared Team with the `GET sharedWithTeam` API.
1.	Use the `GET channel members` API on each `sharedWithTeam` to get full membership.

Following table lists the channel types and their corresponding group IDs:

|  Channel type  | groupId | hostTeamGroupId |
|-----------------|----------|----------------------|
|Regular|	Team AAD group ID|	Team AAD group ID|
|Private|Empty|	Host Team AAD group ID|
|Shared|	Empty|	Host Team AAD group ID|

## Manifest updates

You can use `supportsSharedChannels` boolean property in the app manifest to control your LOB app access in shared channel. Platform reads the flag and expose apps in shared channels accordingly. 

## Handle theme change

You can register your app to be informed if the theme changes by calling `microsoftTeams.registerOnThemeChangeHandler(function(theme) { /* ... */ })`.

The `theme` argument in the function is a string with a value of `default`, `dark`, or `contrast`.

## See also

* [Tab design guidelines](~/tabs/how-to/build-adaptive-card-tabs.md)
* [Teams tabs](~/tabs/what-are-tabs.md)
* [Create a personal tab](~/tabs/how-to/create-personal-tab.md)
* [Create a channel or group tab](~/tabs/how-to/create-channel-group-tab.md)

## Next step

> [!div class="nextstepaction"]
> [Build tabs with Adaptive Cards](~/tabs/how-to/build-adaptive-card-tabs.md)