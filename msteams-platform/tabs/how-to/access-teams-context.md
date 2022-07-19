---
title: Get context for your tab
description: In this module, learn how to get user context to your tabs, user context and Access context information
ms.localizationpriority: medium
ms.topic: how-to
---

# Get context for your tab

Your tab requires contextual information to display relevant content:

* Basic information about the user, team, or company.
* Locale and theme information.
* The `page.id` and `page.subPageId` that identify what is in this tab (known as `entityId` and `subEntityId` prior to TeamsJS v.2.0.0).

## User context

Context about the user, team, or company can be especially useful when:

* You create or associate resources in your app with the specified user or team.
* You initiate an authentication flow from Microsoft Azure Active Directory (Azure AD) or other identity provider, and you do not require the user to enter their username again.

For more information, see [authenticate a user in your Microsoft Teams](~/concepts/authentication/authentication.md).

> [!IMPORTANT]
> Although this user information can help provide a smooth user experience, you must not use it as proof of identity.  For example, an attacker can load your page in a browser and render harmful information or requests.

## Access context information

You can access context information in two ways:

* Using [URL placeholder values](#get-context-by-inserting-url-placeholder-values).
* From the Microsoft Teams JavaScript client SDK [context](/javascript/api/@microsoft/teams-js/app.context) object.

### Get context by inserting URL placeholder values

Use placeholders in your configuration or content URLs. Microsoft Teams replaces the placeholders with the relevant values when determining the actual configuration or content URL. The available placeholders include all fields on the [context](/javascript/api/@microsoft/teams-js/microsoftteams.context?view=msteams-client-js-latest&preserve-view=true) object. Common placeholders include the following properties:

* [{page.id}](/javascript/api/@microsoft/teams-js/app.pageinfo#@microsoft-teams-js-app-pageinfo-id): The developer-defined unique ID for the page defined when first [configuring the page](~/tabs/how-to/create-tab-pages/configuration-page.md). (Known as `{entityId}` prior to TeamsJS v.2.0.0).
* [{page.subPageId}](/javascript/api/@microsoft/teams-js/app.pageinfo#@microsoft-teams-js-app-pageinfo-subpageid): The developer-defined unique ID for the subpage this content points defined when generating a [deep link](~/concepts/build-and-test/deep-links.md) for a specific item within the page. (Known as `{subEntityId}` prior to TeamsJS v.2.0.0).
* [{user.loginHint}](/javascript/api/@microsoft/teams-js/app.userinfo#@microsoft-teams-js-app-userinfo-loginhint): A value suitable as a login hint for Azure AD. This is usually the login name of the current user in their home tenant. (Known as `{loginHint}` prior to TeamsJS v.2.0.0).
* [{user.userPrincipalName}](/javascript/api/@microsoft/teams-js/app.userinfo#@microsoft-teams-js-app-userinfo-userprincipalname): The User Principal Name of the current user in the current tenant. (Known as `{userPrincipalName}` prior to TeamsJS v.2.0.0).
* [{user.id}](/javascript/api/@microsoft/teams-js/app.userinfo#@microsoft-teams-js-app-userinfo-id): The Azure AD object ID of the current user in the current tenant. (Known as `{userObjectId}` prior to TeamsJS v.2.0.0).
* [{app.theme}](/javascript/api/@microsoft/teams-js/app.appinfo#@microsoft-teams-js-app-appinfo-theme): The current user interface (UI) theme such as `default`, `dark`, or `contrast`. (Known as `{theme}` prior to TeamsJS v.2.0.0).
* [{team.groupId}](/javascript/api/@microsoft/teams-js/app.teaminfo#@microsoft-teams-js-app-teaminfo-groupid): The ID of the Office 365 group in which the tab resides. (Known as `{groupId}` prior to TeamsJS v.2.0.0)
* [{user.tenant.id}](/javascript/api/@microsoft/teams-js/app.tenantinfo#@microsoft-teams-js-app-tenantinfo-id): The Azure AD tenant ID of the current user. (Known as `{tid}` prior to TeamsJS v.2.0.0).
* [{app.locale}](/javascript/api/@microsoft/teams-js/app.appinfo#@microsoft-teams-js-app-appinfo-locale): The current locale of the user formatted as *languageId-countryId*, for example `en-us`. (Known as `{locale}` prior to TeamsJS v.2.0.0).

> [!NOTE]
> The previous `{upn}` placeholder is now deprecated. For backward compatibility, it is currently a synonym for `{user.loginHint}`.

For example, in your app manifest if you set your tab *configurationUrl* attribute to `"https://www.contoso.com/config?name={user.loginHint}&tenant={user.tenant.id}&group={team.groupId}&theme={app.theme}"` and the signed-in user has the following attributes:

* Their username is **user@example.com**.
* Their company tenant ID is **e2653c-etc**.
* They're a member of the Office 365 group with ID **00209384-etc**.
* The user has set their Teams theme to **dark**.

. . . then Teams will call the following URL when configuring the tab:

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
    "groupId": "Guid identifying the current Office 365 Group ID",
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
    "hostClientType": "The type of host client. Possible values are android, ios, web, desktop, surfaceHub, teamsRoomsAndroid, teamsPhones, teamsDisplays rigel (deprecated, use teamsRoomsWindows instead)",
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
    "defaultOneNoteSectionId": "The OneNote section ID that is linked to the channel",
    "isMultiWindow": "The indication whether the tab is in a pop out window"
}
```

# [TeamsJS v2](#tab/teamsjs-v2)

## TypeScript

```TypeScript
import { app, Context } from "@microsoft/teams-js";

app.getContext().then((context: Context) => {
    /*...*/
});
```

Equivalent `async/await` pattern:

```TypeScript
import { app, Context } from "@microsoft/teams-js";

async function example() {
  const context: Context = await app.getContext();
  /*...*/
}
```

## JavaScript

```js
import { app, Context } from "@microsoft/teams-js";

app.getContext().then((context) => {
    /*...*/
});
```

Equivalent `async/await` pattern:

```js
import { app, Context } from "@microsoft/teams-js";

async function example() {
  const context = await app.getContext();
  /*...*/
}
```

# [TeamsJS v1](#tab/teamsjs-v1)

## TypeScript

```TypeScript
import * as microsoftTeams from "@microsoft/teams-js";

microsoftTeams.getContext((context: microsoftTeams.Context) => {
  /* ... */
});
```

## JavaScript

```js
import microsoftTeams from "@microsoft/teams-js";

microsoftTeams.getContext((context) => {
  /* ... */ 
});
```

---

The following table lists commonly used context properties of the *context* object:

| TeamsJS v2 name | TeamsJS v1 name | Description |
|-----------------|-----------------|-------------|
| team.internalId | teamId | The Microsoft Teams ID for the team with which the content is associated. |
| team.displayName | teamName | The name for the team with which the content is associated. |
| channel.id | channelId | The Microsoft Teams ID for the channel with which the content is associated. |
| channel.displayName | channelName | The name for the channel with which the content is associated. |
| chat.id | chatId | The Microsoft Teams ID for the chat with which the content is associated. |
| app.locale | locale | The current locale that the user has configured for the app formatted as languageId-countryId (for example, en-us). |
| page.id | entityId | The developer-defined unique ID for the page this content points to. |
| page.subPageId | subEntityId | The developer-defined unique ID for the subpage this content points to. This field should be used to restore to a specific state within a page, such as scrolling to or activating a specific piece of content. |
| user.loginHint | loginHint | A value suitable for use as a login_hint when authenticating with Azure AD. Because a malicious party can run your content in a browser, this value should be used only as a hint as to who the user is and never as proof of identity. This field is available only when the identity permission is requested in the manifest. |
| user.userPrincipalName | upn | The UPN of the current user. This may be an externally authenticated UPN (for example, guest users). Because a malicious party runs your content in a browser, this value should be used only as a hint as to who the user is and never as proof of identity. This field is available only when the identity permission is requested in the manifest. |
| user.id | userObjectId | The Azure AD object ID of the current user. Because a malicious party runs your content in a browser, this value should be used only as a hint as to who the user is and never as proof of identity. This field is available only when the identity permission is requested in the manifest. |
| user.tenant.id | tid | The Azure AD tenant ID of the current user. Because a malicious party can run your content in a browser, this value should be used only as a hint as to who the user is and never as proof of identity. This field is available only when the identity permission is requested in the manifest. |
| team.groupId | groupId | The Office 365 group ID for the team with which the content is associated. This field is available only when the identity permission is requested in the manifest. |
| app.theme  | theme | The current UI theme: default, dark, contrast |
| page.isFullScreen | isFullScreen | Indication whether the page is in full-screen mode. |
| team.type | teamType | The type of the team. |
| sharepointSite.teamSiteUrl | teamSiteUrl | The root SharePoint site associated with the team. |
| sharepointSite.teamSiteDomain | teamSiteDomain | The domain of the root SharePoint site associated with the team. |
| sharepointSite.teamSitePath | teamSitePath | The relative path to the SharePoint site associated with the team. |
| channel.relativeUrl | channelRelativeUrl | The relative path to the SharePoint folder associated with the channel. |
| app.host.sessionId | sessionId | Unique ID for the current Host session for use in correlating telemetry data. |
| team.userRole | userTeamRole | The user's role in the team. Because a malicious party can run your content in a browser, this value should be used only as a hint as to the user's role, and never as proof of her role. |
| team.isArchived | isTeamArchived | Indicates whether team is archived. Apps should use this as a signal to prevent any changes to content associated with archived teams. |
| app.host.clientType | hostClientType | The type of the host client. Possible values are: android, ios, web, desktop, rigel |
| page.frameContext | frameContext | The context where page url is loaded (content, task, setting, remove, sidePanel) |
| sharepoint | sharepoint | SharePoint context. This is only available when hosted in SharePoint. |
| user.tenant.teamsSku | tenantSKU | The license type for the current user tenant. Possible values are enterprise, free, edu, unknown |
| user.licenseType | userLicenseType | The license type for the current user. Possible values are E1, E3, and E5 enterprise plans |
| app.parentMessageId | parentMessageId | The ID of the parent message from which this task module was launched. This is only available in task modules launched from bot cards. |
| app.host.ringId | ringId | Current ring ID. |
| app.sessionId | appSessionId | Unique ID for the current Host session for use in correlating telemetry data. |
| user.isCallingAllowed | isCallingAllowed | Represents whether calling is allowed for the current logged-in user. |
| user.isPSTNCallingAllowed | isPSTNCallingAllowed | Indicates if PSTN calling is allowed for the current user |
| meeting.id | meetingId | The meeting ID used by tab when running in meeting context. |
| channel.defaultOneNoteSectionId | defaultOneNoteSectionId | The OneNote section ID that is linked to the channel. |
| page.isMultiWindow | isMultiWindow | The indication whether the tab is in a pop out window. |

For more information, see [Updates to the *Context* interface](using-teams-client-sdk.md#updates-to-the-context-interface) and the [Context interface](/javascript/api/@microsoft/teams-js/app.context) API reference.

## Retrieve context in private channels

> [!NOTE]
> Private channels are currently in private developer preview only.

When your content page is loaded in a private channel, the data you receive from the `getContext` call is obfuscated to protect the privacy of the channel.

The following fields are changed when your content page is in a private channel:

* `team.groupId`: Undefined for private channels
* `team.internalId`: Set to the threadId of the private channel
* `team.displayName`: Set to the name of the private channel
* `sharepointSite.url`: Set to the URL of a distinct, unique SharePoint site for the private channel
* `sharepointSite.path`: Set to the path of a distinct, unique SharePoint site for the private channel
* `sharepointSite.domain`: Set to the domain of a distinct, unique SharePoint site domain for the private channel

If your page makes use of any of these values, the value of `channel.membershipType` field must be `Private` to determine if your page is loaded in a private channel and can respond appropriately.

## Retrieve context in Microsoft Teams Connect shared channels

> [!NOTE]
> Currently, Microsoft Teams Connect shared channels are in developer preview only.

When your content page is loaded in a Microsoft Teams Connect shared channel, the data you receive from the `getContext` call is altered due to the unique roster of users in shared channels.
The following fields are changed when your content page is in a shared channel:

* `team.groupId`: Undefined for shared channels.
* `team.internalId`: Set to the `threadId` of the team, the channel is shared for the current user. If the user has access to multiple teams, this is set to the team that hosts (creates) the shared channel.
* `team.displayName`: Set to the name of the team, the channel is shared for the current user. If the user has access to multiple teams, this is set to the team that hosts (creates) the shared channel.
* `sharepointSite.url`: Set to the URL of a distinct, unique SharePoint site for the shared channel.
* `sharepointSite.path`: Set to the path of a distinct, unique SharePoint site for the shared channel.
* `sharepointSite.domain`: Set to the domain of a distinct, unique SharePoint site domain for the shared channel.

In addition to these field changes, there are two new fields available for shared channels:

* `hostTeamGroupId`: Set to the `team.groupId` associated with the hosting team, or the team that created the shared channel. The property can make Microsoft Graph API calls retrieve membership of the shared channel.
* `hostTeamTenantId`: Set to the `channel.ownerTenantId` associated with the hosting team, or the team that created the shared channel. The property can be cross-referenced with the current user's tenant ID found in the `user.tenant.id` field of the *context* object to determine if the user is internal or external to the hosting team's tenant.

If your page makes use of any of these values, the value of `channel.membershipType` field must be `Shared` to determine if your page is loaded in a shared channel and can respond appropriately.

> [!NOTE]
> `teamSiteUrl` also works well for standard channels.
> If your page makes use of any of these values, the value of `channelType` field must be `Shared` to determine if your page is loaded in a shared channel and can respond appropriately.

## Get context in shared channels

When the content UX is loaded in a shared channel, use the data received from `getContext` call for  shared channel changes. If tab makes use of any of the following values, you must populate the `channelType` field to determine if the tab is loaded in a shared channel, and respond appropriately.
For shared channels, the `groupId` value is `null`, since the host team's groupId does not accurately reflect the true membership of the shared channel. To address this, the `hostTeamGroupID` and `hostTenantID` properties are newly added and useful for making Microsoft Graph API calls to retrieve membership. `hostTeam` refers to the Team that created the shared channel. `currentTeam` refers to Team that the current user is accessing the shared channel from.

For more information about these concepts, see [Shared channels](~/concepts/build-and-test/shared-channels.md).

Use the following `getContext` properties in shared channels:

| Property | Description |
|----------|--------------|
|`channelId`| The property is set to the SC channel thread ID.|
|`channelType`| The property is set to `sharedChannel` for shared channels.|
|`groupId`|The property is `null` for shared Channels.|
|`hostTenantId`| The property is newly added and describes the host's tenant ID, useful for comparing against the current user's `tid` tenant ID property. |
|`hostTeamGroupId`| The property is newly added and describes the host team’s AAD group ID, useful for making Microsoft Graph API calls to retrieve shared channel membership. |
|`teamId`|The property is newly added and set to the thread ID of the current shared team. |
|`teamName`|The property is set to current shared team's `teamName`. |
|`teamType`|The property is set to current shared team's `teamType`.|
|`teamSiteUrl`|The property describes the shared channel's `channelSiteUrl`.|
|`teamSitePath`| The property describes the shared channel's `channelSitePath`.|
|`teamSiteDomain`| The property describes the shared channel's `channelSiteDomain`.|
|`tenantSKU`| The property describes the host team’s `tenantSKU`.|
|`tid`|  The property describes the current user’s tenant ID.|
|`userObjectId`|  The property describes current user’s ID.|
|`userPrincipalName`| The property describes the current user’s UPN.|

For more information on shared channels, see [Shared channels](~/concepts/build-and-test/shared-channels.md).

## Handle theme change

You can register your app to be informed if the theme changes by calling `microsoftTeams.app.registerOnThemeChangeHandler(function(theme) { /* ... */ })`.

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
