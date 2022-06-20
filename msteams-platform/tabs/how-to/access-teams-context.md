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

You can also retrieve the information listed above using the [Microsoft Teams JavaScript client SDK](/javascript/api/overview/msteams-client).

# [TeamsJS v2](#tab/teamsjs-v2)

## Typescript

```TypeScript
import * as microsoftTeams from "@microsoft/teams-js";

microsoftTeams.getContext((context: microsoftTeams.Context) => {
  /* ... */
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

## JavaScript

```js
import microsoftTeams from "@microsoft/teams-js";

microsoftTeams.getContext((context) => { /* ... */ });
```

---

The following table lists commonly used context properties:

| TeamsJS v2 name | TeamsJS v1 name | Description |
|-----------------|-----------------|-------------|
| app.Context.team.internalId | teamId | The Microsoft Teams ID for the team with which the content is associated. |
| app.Context.team.displayName | teamName | The name for the team with which the content is associated. |
| app.Context.channel.id | channelId | The Microsoft Teams ID for the channel with which the content is associated. |
| app.Context.channel.displayName | channelName | The name for the channel with which the content is associated. |
| app.Context.chat.id | chatId | The Microsoft Teams ID for the chat with which the content is associated. |
| app.Context.app.locale | locale | The current locale that the user has configured for the app formatted as languageId-countryId (for example, en-us). |
| app.Context.page.id | entityId | The developer-defined unique ID for the page this content points to. |
| app.Context.page.subPageId | subEntityId | The developer-defined unique ID for the sub-page this content points to. This field should be used to restore to a specific state within a page, such as scrolling to or activating a specific piece of content. |
| app.Context.user.loginHint | loginHint | A value suitable for use as a login_hint when authenticating with Azure AD. Because a malicious party can run your content in a browser, this value should be used only as a hint as to who the user is and never as proof of identity. This field is available only when the identity permission is requested in the manifest. |
| app.Context.user.userPrincipalName | upn | The UPN of the current user. This may be an externally-authenticated UPN (e.g., guest users). Because a malicious party run your content in a browser, this value should be used only as a hint as to who the user is and never as proof of identity. This field is available only when the identity permission is requested in the manifest. |
| app.Context.user.id | userObjectId | The Azure AD object id of the current user. Because a malicious party run your content in a browser, this value should be used only as a hint as to who the user is and never as proof of identity. This field is available only when the identity permission is requested in the manifest. |
| app.Context.user.tenant.id | tid | The Azure AD tenant ID of the current user. Because a malicious party can run your content in a browser, this value should be used only as a hint as to who the user is and never as proof of identity. This field is available only when the identity permission is requested in the manifest. |
| app.Context.team.groupId | groupId | The Office 365 group ID for the team with which the content is associated. This field is available only when the identity permission is requested in the manifest. |
| app.theme  | theme | The current UI theme: default, dark, contrast |
| app.Context.page.isFullScreen | isFullScreen | Indication whether the page is in full-screen mode. |
| app.Context.team.type | teamType | The type of the team. |
| app.Context.sharepointSite.teamSiteUrl | teamSiteUrl | The root SharePoint site associated with the team. |
| app.Context.sharepointSite.teamSiteDomain | teamSiteDomain | The domain of the root SharePoint site associated with the team. |
| app.Context.sharepointSite.teamSitePath | teamSitePath | The relative path to the SharePoint site associated with the team. |
| app.Context.channel.relativeUrl | channelRelativeUrl | The relative path to the SharePoint folder associated with the channel. |
| app.Context.app.host.sessionId | sessionId | Unique ID for the current Host session for use in correlating telemetry data. |
| app.Context.team.userRole | userTeamRole | The user's role in the team. Because a malicious party can run your content in a browser, this value should be used only as a hint as to the user's role, and never as proof of her role. |
| app.Context.team.isArchived | isTeamArchived | Indicates whether team is archived. Apps should use this as a signal to prevent any changes to content associated with archived teams. |
| app.Context.app.host.clientType | hostClientType | The type of the host client. Possible values are : android, ios, web, desktop, rigel |
| app.Context.page.frameContext | frameContext | The context where page url is loaded (content, task, setting, remove, sidePanel) |
| app.Context.sharepoint | sharepoint | SharePoint context. This is only available when hosted in SharePoint. |
| app.Context.user.tenant.teamsSku | tenantSKU | The license type for the current user tenant. Possible values are enterprise, free, edu, unknown |
| app.Context.user.licenseType | userLicenseType | The license type for the current user. Possible values are E1, E3, and E5 enterprise plans |
| app.Context.app.parentMessageId | parentMessageId | The ID of the parent message from which this task module was launched. This is only available in task modules launched from bot cards. |
| app.Context.app.host.ringId | ringId | Current ring ID. |
| app.Context.app.sessionId | appSessionId | Unique ID for the current Host session for use in correlating telemetry data. |
| app.Context.user.isCallingAllowed | isCallingAllowed | Represents whether calling is allowed for the current logged-in user. |
| app.Context.user.isPSTNCallingAllowed | isPSTNCallingAllowed | Indicates if PSTN calling is allowed for the current user |
| app.Context.meeting.id | meetingId | The meeting ID used by tab when running in meeting context. |
| app.Context.channel.defaultOneNoteSectionId | defaultOneNoteSectionId | The OneNote section ID that is linked to the channel. |
| app.Context.page.isMultiWindow | isMultiWindow | The indication whether the tab is in a pop out window. |

For additional information, see [Updates to the *Context* interface](using-teams-client-sdk.md#updates-to-the-context-interface) and the [Context interface](/javascript/api/@microsoft/teams-js/app.context) API reference.

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
