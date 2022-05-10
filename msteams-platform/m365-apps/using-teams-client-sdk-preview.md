---
title: Microsoft Teams JavaScript client SDK v2 Preview
description: Understand the changes coming with Microsoft Teams JavaScript client SDK v2 Preview
ms.date: 11/15/2021
ms.topic: conceptual
ms.custom: m365apps
ms.localizationpriority: medium
---
# Microsoft Teams JavaScript client SDK v2 Preview

With the [Microsoft Teams JavaScript client SDK v2 Preview](/javascript/api/overview/msteams-client?view=msteams-client-js-beta&preserve-view=true), the existing Teams SDK (`@microsoft/teams-js`, or simply `TeamsJS`) has been refactored to enable Teams developers the ability to [extend Teams apps to run in Outlook and Office](overview.md). From a functional perspective, the TeamsJS SDK v2 Preview (`@microsoft/teams-js@next`) is a superset of the current TeamsJS SDK, it supports existing Teams app functionality while adding the ability to host Teams apps in Outlook and Office.

There are two significant changes in the TeamsJS SDK v2 Preview that your code will need to account for in order to run in other Microsoft 365 applications:

* [**Callback functions now return Promise objects.**](#callbacks-converted-to-promises) All existing functions with a callback parameter have been modernized to return a JavaScript [Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise) object for improved handling of asynchronous operations and code readability.

* [**APIs are now organized into *capabilities*.**](#apis-organized-into-capabilities) You can think of capabilities as logical groupings of APIs that provide similar functionality, such as `authentication`, `calendar`, `mail`, `monetization`, `meeting`, and `sharing`.

 You can use the [Teams Toolkit extension](https://aka.ms/teams-toolkit) for Microsoft Visual Studio Code to simplify the update process for your Teams app, as described in the following section.

> [!NOTE]
> Enabling an existing Teams app to run in Outlook and Office requires both:
>
> 1. Dependency on the `@microsoft/teams-js@2.0.0-beta.1` or later, and
> 2. Modifying existing application code according to the required changes described in this document.
>
> If you reference `@microsoft/teams-js@2.0.0-beta.1` (or later) from an existing Teams app, you will see deprecation warnings if your code calls APIs that have changed. An API translation layer (mapping current SDK to preview SDK API calls) is provided to enable existing Teams apps to continue working in Teams until they are able to update code to work with the TeamsJS SDK v2 Preview. After you update your code with the changes outlined in this article, your personal tab will also run in Outlook and Office.

## Updating to the Teams client SDK v2 Preview

The easiest way to update your Teams app to use the TeamsJS SDK v2 Preview is to use the [Teams Toolkit extension](https://aka.ms/teams-toolkit) for Visual Studio Code. This section will walk you through the steps to do that. If you prefer to manually update your code, see the [Callbacks converted to promises](#callbacks-converted-to-promises) and [APIs organized into capabilities](#apis-organized-into-capabilities) sections for more details on required API changes.

### 1. Install the latest Teams Toolkit Visual Studio Code extension

In the *Visual Studio Code Extensions Marketplace*, search for **Teams Toolkit** and install version `2.10.0` or later. The toolkit provides two commands to assist the process:

1. A command to update your manifest schema
1. A command to update your SDK references and call sites

Following are the two key updates you'll need to run a Teams personal tab app in other Microsoft 365 applications:
``

### 2. Updating the manifest

# [Teams Toolkit](#tab/manifest-teams-toolkit)

1. Open the *Command palette*: `Ctrl+Shift+P`
1. Run **Teams: Upgrade Teams manifest to support Outlook and Office apps** command and select your app manifest file. Changes will be made in place.

# [Manual steps](#tab/manifest-manual)

Open your Teams app manifest and update the `$schema` and `manifestVersion` with the following values:

```json
{
    "$schema" : "https://raw.githubusercontent.com/OfficeDev/microsoft-teams-app-schema/preview/DevPreview/MicrosoftTeams.schema.json",
    "manifestVersion" : "m365DevPreview"
}
```

---

If you used Teams Toolkit to create your personal app, you can also use it to validate the changes to your manifest file and identify any errors. Open the command palette `Ctrl+Shift+P` and find **Teams: Validate manifest file** or select the option from the Deployment menu of the Teams Toolkit (look for the Teams icon on the left side of Visual Studio Code).

:::image type="content" source="images/toolkit-validate-manifest-file.png" alt-text="Teams Toolkit 'Validate manifest file' option under 'Deployment' menu":::

### 2. Update SDK references

To run in Outlook and Office, your app will need to depend on the [npm package](https://www.npmjs.com/package/@microsoft/teams-js/v/2.0.0-beta.1) `@microsoft/teams-js@2.0.0-beta.1` (or a later *beta* version). To perform these steps manually, and for more information on the API changes, see the following sections on [Callbacks converted to promises](#callbacks-converted-to-promises) and [APIs organized into capabilities](#apis-organized-into-capabilities).

1. Ensure you have [Teams Toolkit](https://aka.ms/teams-toolkit) `v2.10.0` or later
1. Open the *Command palette*: `Ctrl+Shift+P`
1. Run the command `Teams: Upgrade Teams JS SDK references to support Outlook and Office apps`

After completion, the utility will have updated your `package.json` file with the TeamsJS SDK v2 Preview (`@microsoft/teams-js@2.0.0-beta.1` or later) dependency, and your `*.js/.ts` and `*.jsx/.tsx` files will be updated with:

> [!div class="checklist"]
>
> * `package.json` references to TeamsJS SDK v2 Preview
> * Import statements for TeamsJS SDK v2 Preview
> * [Function, Enum, and Interface calls](#apis-organized-into-capabilities) to TeamsJS SDK v2 Preview
> * `TODO` comment reminders to review areas that might be impacted by [Context](#updates-to-the-context-interface) interface changes
> * `TODO` comment reminders to ensure [conversion to promises functions from callback style functions](#callbacks-converted-to-promises) has gone well at every call site the tool found

> [!IMPORTANT]
> Code inside html files is not supported by the upgrade tooling and will require manual changes.

## Callbacks converted to promises

Teams APIs that previously took a callback parameter have been updated to return a JavaScript [Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise) object. These include the following APIs:

```js
app.getContext, app.initialize, appInstallDialog.openAppInstallDialog, authentication.authenticate, authentication.getAuthToken, authentication.getUser, authentication.registerAuthenticationHandlers was removed to support using Promises, calendar.openCalendarItem, calendar.composeMeeting, call.startCall, core.executeDeepLink, location.getLocation, location.showLocation, mail.openMailItem, mail.composeMail, media.captureImage, media.getMedia, media.selectMedia, media.viewImages, media.scanBarCode, meeting.getAppContentStageSharingCapabilities, meeting.getAuthenticationTokenForAnonymousUser, meeting.getIncomingClientAudioState, meeting.getLiveStreamState, meeting.getMeetingDetails, meeting.requestStartLiveStreaming, meeting.requestStopLiveStreaming, meeting.shareAppContentToStage, meeting.stopSharingAppContentToStage, meeting.toggleIncomingClientAudio, meeting.getAppContentStageSharingState, pages.backStack.navigateBack, pages.navigateCrossDomain, pages.navigateToTab, pages.tabs.getMruTabInstances, pages.tabs.getTabInstances, pages.config.setConfig, pages.config.getConfig, people.selectPeople, ChildAppWindow.postMessage, ParentAppWindow.postMessage
```

You'll need to update the way your code calls any of these APIs to use Promises. For example, if your code is calling a Teams API like this:

# [JavaScript](#tab/javascript)

This code:

```js
import microsoftTeams from "@microsoft/teams-js";

microsoftTeams.getContext((context) => { /* ... */ });
```

Needs to be updated to:

```js
import { app, Context } from "@microsoft/teams-js";

app.getContext().then((context) => {
    /*...*/
});
```

...or the equivalent `async/await` pattern:

```js
import { app, Context } from "@microsoft/teams-js";

async function example() {
  const context = await app.getContext();
  /*...*/
}
```

# [TypeScript](#tab/typescript)

This code:

```TypeScript
import * as microsoftTeams from "@microsoft/teams-js";

microsoftTeams.getContext((context: microsoftTeams.Context) => {
  /* ... */
});
```

Needs to be updated to:

```TypeScript
import { app, Context } from "@microsoft/teams-js";

app.getContext().then((context: Context) => {
    /*...*/
});
```

...or the equivalent `async/await` pattern:

```TypeScript
import { app, Context } from "@microsoft/teams-js";

async function example() {
  const context: Context = await app.getContext();
  /*...*/
}
```

---

> [!TIP]
> When you update your code for the TeamsJS SDK v2 Preview using [Teams Toolkit](#updating-to-the-teams-client-sdk-v2-preview), the required updates are flagged for you with `TODO` comments in your client code.

## APIs organized into capabilities

A *capability* is a logical grouping of APIs that provide similar functionality. You can think of Microsoft Teams, Outlook, and Office, as hosts. A host supports a given capability if it supports all the APIs defined within that capability. A host cannot partially implement a capability.  Capabilities can be feature- or content-based, such as *dialog* or *authentication*. There are also capabilities for application types, such as *tabs/pages* or *bots*, and other groupings.

In the TeamsJS SDK v2 Preview, APIs are defined as functions in a JavaScript namespace whose name matches their required capability. If an app is running in a host that supports the dialog capability, then the app can safely call APIs such as `dialog.open` (in addition to other dialog-related APIs defined in the namespace). Meanwhile, if an app attempts to call an API that's not supported in that host, the API will throw an exception.

### Differentiate your app experience

You can check for host support of a given capability at runtime by calling the `isSupported()` function on that capability (namespace). It will return `true` if it is supported and `false` if not, and you can adjust app behavior as appropriate. This allows your app to light up UI and functionality in hosts that support it, while continuing to run for hosts that don't.

The name of the host your app is running in is exposed as a *hostName* property on the Context interface (`app.Context.app.host.name`), which can be queried at runtime by calling `getContext`. It is also available as a `{hostName}` [URL placeholder value](../tabs/how-to/access-teams-context.md#get-context-by-inserting-url-placeholder-values). Best practice is to use the *hostName* mechanism sparingly:

* **Don't** assume certain functionality is or isn't available in a host based on the *hostName* property value. Instead, check for capability support (`isSupported`).
* **Don't** use *hostName* to gate API calls. Instead, check for capability support (`isSupported`).
* **Do** use *hostName* to differentiate the theme of your application based on the host its running in. For example, you can use Microsoft Teams purple as the main accent color when running in Teams, and Outlook blue when running in Outlook.
* **Do** use *hostName* to differentiate messages shown to the user based on which host it's running in. For example, show *Manage your tasks in Office* when running in Office on the web, and *Manage your tasks in Teams* when running in Microsoft Teams.

### Namespaces

The TeamsJS SDK v2 Preview organizes APIs into *capabilities* by way of namespaces. Several new namespaces of particular importance are *app*, *pages*, *dialog*, and *teamsCore*.

#### *app* namespace

The `app` namespace contains top-level APIs required for overall app usage, across Microsoft Teams, Office, and Outlook. All the APIs from various other TeamsJS namespaces have been moved to the `app` namespace in TeamsJS SDK v2 Preview:

| Original namespace `global (window)` | New namespace `app` |
| - | - |
| `initialize` | `app.initialize` |
| `getContext` | `app.getContext` |
| `registerOnThemeChangeHandler` | `app.registerOnThemeChangeHandler` |

| Original namespace `appInitialization` | New namespace `app` |
| - | - |
| `appInitialization.notifyAppLoaded` | `app.notifyAppLoaded` |
| `appInitialization.notifySuccess` | `app.notifySuccess` |
| `appInitialization.notifyFailure` | `app.notifyFailure` |
| `appInitialization.notifyExpectedFailure` | `app.notifyExpectedFailure` |
| `appInitialization.FailedReason` enum | `app.FailedReason` |
| `appInitialization.ExpectedFailureReason` enum | `app.ExpectedFailureReason` |
| `appInitialization.IFailedRequest` enum | `app.IFailedRequest` |
| `appInitialization.IExpectedFailureRequest` enum | `app.IExpectedFailureRequest` |

#### *core* namespace

The `core` namespace includes functionality for deep links.

| Original namespace `publicAPIs` | New namespace `core` |
| - | - |
| `shareDeepLink` | `core.shareDeepLink` |
| `executeDeepLink` | `core.executeDeepLink` |

#### *pages* namespace

The `pages` namespace includes functionality for running and navigating webpages within various Microsoft 365 clients, including Teams, Office, and Outlook. It also includes several sub-capabilities, implemented as sub-namespaces.

| Original namespace `global (window)` | New namespace `pages` |
| - | - |
| `setFrameContext` | `pages.setCurrentFrame` (renamed) |
| `initializeWithFrameContext` | `pages.initializeWithFrameContext` |
| `registerFullScreenHandler` | `pages.registerFullScreenHandler` |
| `navigateCrossDomain` | `pages.navigateCrossDomain` |
| `returnFocus` | `pages.returnFocus` |

##### *pages.tabs*

| Original namespace `global (window)` | New namespace `pages.tabs` |
| - | - |
| `getTabInstances` |  `pages.tabs.getTabInstances` |
| `getMruTabInstances` | `pages.tabs.getMruTabInstances` |
| `navigateToTab` | `pages.tabs.navigateToTab` |

| Original namespace `navigation` | New namespace `pages.tabs` |
| - | - |
| `navigation.navigateToTab` | `pages.tabs.navigateToTab` |

##### *pages.config*

| Original namespace `settings` | New namespace `pages.config`  |
| - | - |
| `settings.setSettings` | `pages.config.setConfig` (renamed)
| `settings.getSettings` | `pages.config.getConfig` (renamed)
| `settings.setValidityState`| `pages.config.setValidityState`
| `settings.initialize` | `pages.config.initialize`
| `settings.registerOnSaveHandler`| `pages.config.registerOnSaveHandler`
| `settings.registerOnRemoveHandler` | `pages.config.registerOnRemoveHandler`
| `settings.Settings` interface | `pages.config.Config` (renamed)
| `settings.SaveEvent` interface | `pages.config.SaveEvent` (renamed)
| `settings.RemoveEvent` interface | `pages.config.RemoveEvent` (renamed)
| `settings.SaveParameters` interface | `pages.config.SaveParameters` (renamed)
| `settings.SaveEventImpl` interface | `pages.config.SaveEventImpl` (renamed)

| Original namespace `global (window)` | New namespace `pages.config` |
| - | - |
| `registerEnterSettingsHandler` | `pages.config.registerChangeConfigHandler` (renamed)

##### *pages.backStack*

| Original namespace `navigation` | New namespace `pages.backStack`  |
| - | - |
| `navigation.navigateBack` | `pages.backStack.navigateBack`

| Original namespace `global (window)` | New namespace `pages.backStack`  |
| - | - |
| `registerBackButtonHandler` | `pages.backStack.registerBackButtonHandler`

##### *pages.appButton*

| Original namespace `global (window)` | New namespace `pages.appButton`  |
| - | - |
| `registerAppButtonClickHandler` | `pages.appButton.onClick` (renamed)
| `registerAppButtonHoverEnterHandler` | `pages.appButton.onHoverEnter` (renamed)
| `registerAppButtonHoverLeaveEnter` | `pages.appButton.onHoverLeave` (renamed)
| `FrameContext` interface | `pages.appButton.FrameInfo` (renamed)) |

#### *dialog* namespace

The TeamsJS *tasks* namespace has been renamed to *dialog*, and the following APIs have been renamed:

| Original namespace `tasks` | New namespace `dialog`  |
| - | - |
| `tasks.startTask` | `dialog.open` (renamed) |
| `tasks.submitTasks` | `dialog.submit` (renamed) |
| `tasks.updateTasks` | `dialog.resize` (renamed) |
| `tasks.TaskModuleDimension` enum | `dialog.DialogDimension` (renamed) |
| `tasks.TaskInfo` interface | `dialog.DialogInfo` (renamed) |

#### *teamsCore* namespace

To generalize the TeamsJS SDK to run other Microsoft 365 hosts such as Office and Outlook, Teams-specific functionality (originally in the *global* namespace) has been moved to a *teamsCore* namespace:

| Original namespace `global (window)` | New namespace `teamsCore`  |
| - | - |
| `enablePrintCapability` | `teamsCore.enablePrintCapability`
| `print` | `teamsCore.print`
| `registerOnLoadHandler` | `teamsCore.registerOnLoadHandler`
| `registerBeforeUnloadHandler` | `teamsCore.registerBeforeUnloadHandler`
| `registerFocusEnterHandler` | `teamsCore.registerFocusEnterHandler`

### Updates to the *Context* interface

The `Context` interface has been moved to the `app` namespace and updated to group similar properties for better scalability as it runs in Outlook and Office, in addition to Teams.

A new property `app.Context.app.host.name` has been added to enable personal tabs to differentiate user experience depending on the host application.

You can also visualize the changes by reviewing the  [`transformLegacyContextToAppContext`](https://github.com/OfficeDev/microsoft-teams-library-js/blob/2.0-preview/packages/teams-js/src/public/app.ts) function in the TeamsJS SDK v2 Preview source.

| Original name in `Context` interface | New location in `app.Context` |
| - | - |
| `appIconPosition` | `app.Context.app.iconPositionVertical` |
| `appLaunchId`| *NOT IN Teams client SDK v2 Preview* |
| `appSessionId` | `app.Context.app.sessionId`|
| `channelId`| `app.Context.channel.id` |
| `channelName`| `app.Context.channel.displayName`|
| `channelRelativeUrl` | `app.Context.channel.relativeUrl`|
| `channelType`| `app.Context.channel.membershipType` |
| `chatId` | `app.Context.chat.id`|
| `defaultOneNoteSectionId`| `app.Context.channel.defaultOneNoteSectionId`|
| `entityId` | `app.Context.page.id`|
| `frameContext` | `app.Context.page.frameContext`|
| `groupId`| `app.Context.team.groupId` |
| `hostClientType` | `app.Context.app.host.clientType`|
| `hostTeamGroupId`| `app.Context.channel.ownerGroupId` |
| `hostTeamTenantId` | `app.Context.channel.ownerTenantId`|
| `isCallingAllowed` | `app.Context.user.isCallingAllowed`|
| `isFullScreen` | `app.Context.page.isFullScreen`|
| `isMultiWindow`| `app.Context.page.isMultiWindow` |
| `isPSTNCallingAllowed` | `app.Context.user.isPSTNCallingAllowed`|
| `isTeamArchived` | `app.Context.team.isArchived`|
| `locale` | `app.Context.app.locale` |
| `loginHint`| `app.Context.user.loginHint` |
| `meetingId`| `app.Context.meeting.id` |
| `osLocaleInfo` | `app.Context.app.osLocaleInfo` |
| `parentMessageId`| `app.Context.app.parentMessageId`|
| `ringId` | `app.Context.app.host.ringId`|
| `sessionId`| `app.Context.app.host.sessionId` |
| `sourceOrigin` | `app.Context.page.sourceOrigin`|
| `subEntityId`| `app.Context.page.subPageId` |
| `teamId` | `app.Context.team.internalId`|
| `teamSiteDomain` | `app.Context.sharepointSite.domain`|
| `teamSitePath` | `app.Context.sharepointSite.path`|
| `teamSiteUrl`| `app.Context.sharepointSite.url` |
| `teamTemplateId` | `app.Context.team.templateId`|
| `teamType` | `app.Context.team.type`|
| `tenantSKU`| `app.Context.user.tenant.teamsSku` |
| `tid`| `app.Context.user.tenant.id` |
| `upn` | `app.Context.user.userPrincipalName` |
|`userClickTime`| `app.Context.app.userClickTime`|
| `userFileOpenPreference` | `app.Context.app.userFileOpenPreference` |
| `userLicenseType`| `app.Context.user.licenseType` |
| `userObjectId` | `app.Context.user.id`|
| `userTeamRole` | `app.Context.team.userRole`|
| `userDisplayName` | `app.Context.user.displayName` |
| N/A | `app.Context.app.host.name`|

## Next steps

You can also learn more about breaking changes in the [TeamsJS SDK v2 Preview changelog](https://github.com/OfficeDev/microsoft-teams-library-js/blob/2.0-preview/packages/teams-js/CHANGELOG.md) and the [TeamsJS SDK v2 Preview API Reference](/javascript/api/overview/msteams-client?view=msteams-client-js-beta&preserve-view=true).

When you're ready to test your Teams apps running in Outlook and Office, see:

> [!div class="nextstepaction"]
> [Extend your Teams app across Microsoft 365](overview.md)
