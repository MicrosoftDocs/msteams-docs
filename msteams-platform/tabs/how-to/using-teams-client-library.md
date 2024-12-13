---
title: Teams JavaScript client library SDK
description: Learn Microsoft Teams JavaScript client library (TeamsJS SDK), which helps you build app experiences hosted in an <iframe> in Teams, Microsoft 365, and Outlook.
ms.localizationpriority: high
ms.author: mosdevdocs
author: erikadoyle
ms.subservice: m365apps
ms.topic: conceptual
keywords: SDK TeamsJS Teams client JavaScript library
ms.date: 12/12/2024
---

# Teams JavaScript client library

The Microsoft Teams JavaScript client library (TeamsJS) can help you create hosted experiences in Teams, Microsoft 365 app, and Outlook, where your app content is hosted in an [iFrame](https://developer.mozilla.org/docs/Web/HTML/Element/iframe). The library is helpful for developing apps with the following Teams capabilities:

* [Tabs](../../tabs/what-are-tabs.md)
* [Dialogs (referred as task modules in TeamsJS v1.x)](../../task-modules-and-cards/what-are-task-modules.md)

Starting with version `2.0.0`, the existing TeamsJS library (`@microsoft/teams-js`, or simply `TeamsJS`) is refactored to enable [Teams apps to run in Outlook and Microsoft 365 app](/microsoftteams/platform/m365-apps/overview), in addition to Microsoft Teams. From a functional perspective, the latest version of TeamsJS supports all existing (v.1.x.x) Teams app functionality while adding the optional ability to host Teams apps in Outlook and Microsoft 365 app.

Here's the versioning guidance for various app scenarios:

[!INCLUDE [pre-release-label](~/includes/teamjs-version-details.md)]

The remainder of this article walks you through the structure and latest updates to the TeamsJS library.

## Microsoft 365 support (running Teams apps in Microsoft 365 and Outlook)

TeamsJS v.2.0 introduces the ability for certain types of Teams apps to run across the Microsoft 365 ecosystem. The other Microsoft 365 application hosts (including Microsoft 365 app and Outlook) for Teams apps support a subset of the application types and capabilities you can build for the Teams platform. This support expands over time. For a summary of host support for Teams apps, see [TeamsJS capability support across Microsoft 365](../../m365-apps/teamsjs-support-m365.md).

### Improve app performance with tree shaking

Starting with TeamsJS version 2.31.0, the library is fully tree-shakeable. Tree shaking is a JavaScript optimization that eliminates unused code. By using tree shaking when an app is bundled for deployment you can reduce package size, which results in faster download and improved load time.

#### How to use tree shaking with TeamsJS

Taking advantage of tree shaking when you bundle your app package just requires a bundler, such as [webpack](https://webpack.js.org/guides/tree-shaking/#root) or [Rollup](https://rollupjs.org/faqs/#what-is-tree-shaking), that supports tree shaking. When tree shaking is enabled, all unused TeamsJS code is automatically removed in the final bundle. For example, consider the following code:

```typescript
export function scanBarCode(barCodeConfig: BarCodeConfig): Promise<string> {
   //implementation omitted
}

export function hasPermission(): Promise<boolean>{
   //implementation omitted
}

export function requestPermission(): Promise<boolean>{
   //implementation omitted
}

export function isSupported(): boolean {
   //implementation omitted
}
```

Assume the **barCode** module in TeamsJS contains the four functions `hasPermission()`, `isSupported()`, `requestPermission()`, and `scanBarCode(BarCodeConfig)`. If an app only uses the `hasPermission()` function, then after tree shaking the other three functions would be excluded from the app bundle. This ensures that apps stay as lightweight as possible and only include the code they need.

> [!IMPORTANT]
> When using tree shaking, keep in mind the following considerations:
>
> 1. If your app uses the CDN to consume the TeamsJS library, then the library version used is not tree shakable.
> 1. The TeamsJS library type was changed from UMD (Universal Module Definition) to ESM (ECMAScript Modules) in order to support tree shaking. However, the UMD version is still offered. If a bundler supports ESM the tree-shakable ESM package of TeamsJS is used, otherwise the UMD package is used.

## What's new in TeamsJS version 2.x.x

There are two significant changes between TeamsJS 1.x.x versions and v.2.0.0 and later:

* [**Callback functions now return Promise objects.**](#callbacks-converted-to-promises) Most functions with callback parameters in TeamsJS v.1.12 are modernized to return a JavaScript [Promise](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise) object for improved handling of asynchronous operations and code readability.

* [**APIs are now organized into *capabilities*.**](#apis-organized-into-capabilities) You can think of capabilities as logical groupings of APIs that provide similar functionality, such as `authentication`, `dialog`, `chat`, and `calendar`. Each namespace represents a separate capability.

> [!TIP]
> You can use the [Teams Toolkit extension](https://aka.ms/teams-toolkit) for Microsoft Visual Studio Code to simplify the [TeamsJS v.2.0 update process](#updating-to-teamsjs-version-20) for an existing Teams app.

### Backwards compatibility

Once you start referencing `@microsoft/teams-js@2.0.0` (or later) from an existing Teams app, you see deprecation warnings for any code calling APIs that are changed.

An API translation layer (mapping v.1 to v.2 TeamsJS API calls) is provided to enable existing Teams apps to continue working in Teams until they're able to update application code to use the TeamsJS v.2 API patterns.

#### Authentication

In `TeamsJS` version 2.11.0 or later, apps must provide a third url parameter, `hostRedirectUrl`, in the [authenticate API](/javascript/api/@microsoft/teams-js/authentication#@microsoft-teams-js-authentication-authenticate), to redirect users to the correct client after the completion of authentication. The `hostRedirectUrl` authentication parameter is necessary to enable your client to be supported across Microsoft 365 host applications. Apps implemented on older versions of `TeamsJS` only support Teams following this update, as the `oauthRedirectmethod` and `authId` query parameters are passed to the third-party app server.

For more information regarding the authentication parameter, see [use external OAuth providers](authentication/auth-oauth-provider.md).

#### Teams apps running across Microsoft 365

Following are the requirements to enable an existing Teams app to run in Outlook and Microsoft 365:

1. Dependency on TeamsJS version 2.x.x ( `@microsoft/teams-js@2.0.0`) or later.

2. [Modify existing application code](#2-update-teamsjs-references) according to the required changes described in this article.

3. [Update your app manifest](#3-update-the-app-manifest-optional) (previously called Teams app manifest) to version 1.13 or later.

For more information, see [Extend Teams apps across Microsoft 365](../../m365-apps/overview.md).

### Callbacks converted to promises

> [!NOTE]
> The `getTabInstances` API isn't implemented on Teams mobile.

Teams APIs that previously took a callback parameter are updated to return a JavaScript [Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise) object. These include the following APIs:

```js
app.getContext, app.initialize, appInstallDialog.openAppInstallDialog, app.openLink, authentication.authenticate, authentication.getAuthToken, authentication.getUser, authentication.registerAuthenticationHandlers was removed to support using Promises, calendar.openCalendarItem, calendar.composeMeeting, call.startCall, chat.getChatMembers, conversations.openConversation, location.getLocation, location.showLocation, mail.openMailItem, mail.composeMail, pages.backStack.navigateBack, pages.navigateToTab, pages.tabs.getMruTabInstances, pages.tabs.getTabInstances, pages.getConfig, pages.config.setConfig, pages.backStack.navigateBack, people.selectPeople, teams.fullTrust.getConfigSetting, teams.fullTrust.joinedTeams.getUserJoinedTeams
```

You need to update the way your code calls any of these APIs to use Promises. For example, if your code is calling a Teams API like this:

# [JavaScript](#tab/javascript)

This code:

```js
import microsoftTeams from "@microsoft/teams-js";

microsoftTeams.getContext((context) => { /* ... */ });
```

Needs to be updated to:

```js
import { app } from "@microsoft/teams-js";

app.getContext().then((context) => {
    /*...*/
});
```

...or the equivalent `async/await` pattern:

```js
import { app } from "@microsoft/teams-js";

async function example() {
  const context = await app.getContext();
  /*...*/
}
```

# [TypeScript](#tab/typescript)

This code:

```TypeScript
import * as microsoftTeams from "@microsoft/teams-js";
microsoftTeams.app.getContext().then((context:  microsoftTeams.app.Context) => { 
/* ... */ 
});
```

Needs to be updated to:

```TypeScript
import { app } from "@microsoft/teams-js"; 

app.getContext().then((context: app.Context) => { 
/*...*/
});
```

...or the equivalent `async/await` pattern:

```TypeScript
import { app } from "@microsoft/teams-js"; 

async function example() {
            const context: app.Context = await app.getContext();
            /*...*/
          }
```

---

> [!TIP]
> When you use [Teams Toolkit to update to TeamsJS v.2.0](#updating-to-teamsjs-version-20), the required updates are flagged for you with `TODO` comments in your client code.

Cross-cloud communication through SDK is restricted for security reasons; hence, Teams operated by 21Vianet domain isn't included in `validOrigins`. To enable an app to function in Teams operated by 21Vianet, specify the Teams operated by 21Vianet domain during the SDK initialization in your app deployment, using the [validMessageOrigins](/javascript/api/@microsoft/teams-js/app) parameter.

```js
import { app } from '@microsoft/teams-js';
app.initialize(["https://teams.microsoftonline.cn"]);
```

### APIs organized into capabilities

A *capability* is a logical grouping (via namespace) of APIs that provide similar functionality. You can think of Microsoft Teams, Outlook, and Microsoft 365 app, as hosts to your tab app. A host supports a given capability if it supports all the APIs defined within that capability. A host can't partially implement a capability. Capabilities can be feature- or content-based, such as *authentication*, or *dialog*. There are also capabilities for application types such as *pages*, and other groupings.

Starting with TeamsJS v.2.0, APIs are defined as functions in a JavaScript namespace whose name matches their required capability. For example, if an app is running in a host that supports the *dialog* capability, then the app can safely call APIs such as `dialog.open` (in addition to other dialog-related APIs defined in the namespace). If an app attempts to call an API that isn't supported in that host, the API generates an exception.

> [!TIP]
> Check for host support of a given capability at runtime by calling the [`isSupported()`](#differentiate-your-app-experience) function on that capability (namespace).

#### Differentiate your app experience

You can check for host support of a given capability at runtime by calling the `isSupported()` function on that capability (namespace). It returns `true` if it's supported and `false` if not, and you can adjust app behavior as appropriate. This allows your app to light up UI and functionality in hosts that support it, while continuing to run for hosts that don't.

The host name where your app operates is displayed as a [HostName](/javascript/api/%40microsoft/teams-js/hostname) enum value of the `Context` interface (`app.Context.app.host.name`). You can query this at runtime by invoking `getContext`. For the Classic Teams client, this value might return as *unknown* or *undefined*. In this case, map these values to Classic Teams.

The `{hostName}` [URL placeholder value](./access-teams-context.md#get-context-by-inserting-url-placeholder-values) is also available. However, we recommend using the *hostName* mechanism with discretion.

* **Don't** assume certain functionality is or isn't available in a host based on the *hostName* property value. Instead, check for capability support (`isSupported`).
* **Don't** use *hostName* to gate API calls. Instead, check for capability support (`isSupported`).
* **Do** use *hostName* to differentiate the theme of your application based on the host it's running in. For example, you can use Microsoft Teams purple as the main accent color when running in Teams, and Outlook blue when running in Outlook.
* **Do** use *hostName* to differentiate messages shown to the user based on which host it's running in. For example, show *Manage your tasks in Microsoft 365* when running in Microsoft 365 on the web, and *Manage your tasks in Teams* when running in Teams.

> [!TIP]
> The best practice is to specify the runtime requirements and dependencies of your app in a host-agnostic way, rather than special casing your app code with host-specific logic. For more information, see [how to specify Microsoft 365 host runtime requirements in your app manifest](../../m365-apps/specify-runtime-requirements.md).

#### Namespaces

Starting with TeamsJS v.2.0, APIs are organized into *capabilities* by way of namespaces. Several new namespaces of particular importance are *app*, *pages*, *dialog*, and *teamsCore*.

##### *app* namespace

The `app` namespace contains top-level APIs required for overall app usage, across Teams, Microsoft 365 app, and Outlook. All the APIs from various other TeamsJS namespaces are moved to the `app` namespace as of TeamsJS v.2.0:

| Original namespace `global (window)` | New namespace `app` |
| - | - |
| `executeDeepLink` | `app.openLink` (renamed) |
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

##### *pages* namespace

The `pages` namespace includes functionality for running and navigating webpages within various Microsoft 365 hosts, including Teams, Microsoft 365 app, and Outlook. It also includes several subcapabilities, implemented as subnamespaces.

| Original namespace `global (window)` | New namespace `pages` |
| - | - |
| `setFrameContext` | `pages.setCurrentFrame` (renamed) |
| `initializeWithFrameContext` | `pages.initializeWithFrameContext` |
| `registerFocusEnterHandler` | `pages.registerFocusEnterHandler`
| `registerFullScreenHandler` | `pages.registerFullScreenHandler` |
| `returnFocus` | `pages.returnFocus` |
| `shareDeepLink` | `pages.shareDeepLink` |

| Original namespace `settings` | New namespace `pages`  |
| - | - |
| `settings.getSettings` | `pages.getConfig` (renamed)

###### *pages.tabs*

| Original namespace `global (window)` | New namespace `pages.tabs` |
| - | - |
| `getTabInstances` |  `pages.tabs.getTabInstances` |
| `getMruTabInstances` | `pages.tabs.getMruTabInstances` |

| Original namespace `navigation` | New namespace `pages.tabs` |
| - | - |
| `navigation.navigateToTab` | `pages.tabs.navigateToTab` |

###### *pages.config*

| Original namespace `settings` | New namespace `pages.config`  |
| - | - |
| `settings.setSettings` | `pages.config.setConfig` (renamed)
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
| `registerChangeConfigHandler` | `pages.config.registerChangeConfigHandler` (renamed)

###### *pages.backStack*

| Original namespace `navigation` | New namespace `pages.backStack`  |
| - | - |
| `navigation.navigateBack` | `pages.backStack.navigateBack`

| Original namespace `global (window)` | New namespace `pages.backStack`  |
| - | - |
| `registerBackButtonHandler` | `pages.backStack.registerBackButtonHandler`

###### *pages.appButton*

| Original namespace `global (window)` | New namespace `pages.appButton`  |
| - | - |
| `registerAppButtonClickHandler` | `pages.appButton.onClick` (renamed)
| `registerAppButtonHoverEnterHandler` | `pages.appButton.onHoverEnter` (renamed)
| `registerAppButtonHoverLeaveEnter` | `pages.appButton.onHoverLeave` (renamed)
| `FrameContext` interface | `pages.appButton.FrameInfo` (renamed) |

##### *dialog* namespace

> [!NOTE]
> The `window.alert`, `window.confirm`, and `window.prompt` APIs used to display a dialog aren't supported in the new Teams Client. We recommended you to render a dialog within your own frame, for example, using the [Fluent V9 dialog](https://react.fluentui.dev/?path=/docs/components-dialog--default) or use the Microsoft Teams JavaScript client library (TeamsJS) to display a [Teams dialog](~/tabs/what-are-tabs.md) using Adaptive Card or a nested `<iframe>`.

The TeamsJS *tasks* namespace is renamed to *dialog*, and the following APIs are renamed:

| Original namespace `tasks` | New namespace `dialog`  |
| - | - |
| `tasks.startTask` | `dialog.url.open`, `dialog.url.bot.open`, `dialog.adaptiveCard.open`, `dialog.adaptiveCard.bot.open` |
| `tasks.submitTask` | `dialog.url.submit` (renamed) |
| `tasks.updateTask` | `dialog.update` (renamed) |
| `tasks.TaskModuleDimension` enum | `dialog.DialogDimension` (renamed) |
| `tasks.TaskInfo` interface | `dialog.DialogInfo` (renamed) |

Additionally, this capability is split into two main subcapabilities, `dialog.url` for HTML-based dialogs and `dialog.adaptiveCard` for Adaptive Card-based dialogs, with further subnamespaces for bot-based dialogs.

##### *teamsCore* namespace

To generalize the TeamsJS library to run other Microsoft 365 hosts such as Microsoft 365 app and Outlook, Teams-specific functionality (originally in the *global* namespace) is moved to a *teamsCore* namespace:

| Original namespace `global (window)` | New namespace `teamsCore`  |
| - | - |
| `enablePrintCapability` | `teamsCore.enablePrintCapability`
| `print` | `teamsCore.print`
| `registerOnLoadHandler` | `teamsCore.registerOnLoadHandler`
| `registerBeforeUnloadHandler` | `teamsCore.registerBeforeUnloadHandler`

#### Updates to the *Context* interface

The `Context` interface is moved to the `app` namespace and updated to group similar properties for better scalability as it runs in Outlook and Microsoft 365 app, in addition to Teams.

A new property `app.Context.app.host.name` is added to enable tabs to differentiate user experience depending on the host application.

You can also visualize the changes by reviewing the `transformLegacyContextToAppContext` function in the [TeamsJS version 2.x.x source](https://github.com/OfficeDev/microsoft-teams-library-js/blob/main/packages/teams-js/src/public/app.ts)  (*app.ts* file).

| Original name in `Context` interface | New location in `app.Context` |
| - | - |
| `appIconPosition` | `app.Context.app.iconPositionVertical` |
| `appLaunchId`| *NOT IN TeamsJS v.2.0* |
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
| NA | `app.Context.app.host.name`|

## Updating to TeamsJS version 2.0

The easiest way to update your Teams app with TeamsJS version 2.0.x is to use the [Teams Toolkit extension](https://aka.ms/teams-toolkit) for Visual Studio Code. This section walks you through the steps to do that. If you prefer to manually update your code, see the [Callbacks converted to promises](#callbacks-converted-to-promises) and [APIs organized into capabilities](#apis-organized-into-capabilities) sections for more information on required API changes.

### 1. Install the latest Teams Toolkit Visual Studio Code extension

In the *Visual Studio Code Extensions Marketplace*, search for **Teams Toolkit** and install the latest version.

### 2. Update TeamsJS references

To run in Outlook and Microsoft 365 app, your app needs to depend on the [npm package](https://www.npmjs.com/package/@microsoft/teams-js/v/2.0.0) `@microsoft/teams-js@2.0.0` (or later). To perform these steps manually, and for more information on the API changes, see the following sections on [Callbacks converted to promises](#callbacks-converted-to-promises) and [APIs organized into capabilities](#apis-organized-into-capabilities).

1. Ensure you have the latest [Teams Toolkit](https://aka.ms/teams-toolkit) (version 2.10.0 or later)
1. Open the *Command palette*: `Ctrl+Shift+P`
1. Run the command `Teams: Upgrade Teams JS SDK references to support Outlook and Microsoft 365 apps`

After completion, the utility updates your `package.json` file with the TeamsJS version 2.x.x (`@microsoft/teams-js@2.0.0` or later) dependency, and your `*.js/.ts` and `*.jsx/.tsx` are updated with:

> [!div class="checklist"]
>
> * `package.json` references to TeamsJS version 2.x.x
> * Import statements for TeamsJS version 2.x.x
> * [Function, Enum, and Interface calls](#apis-organized-into-capabilities) to TeamsJS version 2.x.x
> * `TODO` comment reminders to review areas that might be impacted by [Context](#updates-to-the-context-interface) interface changes
> * `TODO` comment reminders to [convert callback functions to promises](#callbacks-converted-to-promises)

> [!IMPORTANT]
> Code inside html files is not supported by the upgrade tooling and requires manual changes.

### 3. Update the app manifest (optional)

If you're updating a Teams app to run in Microsoft 365 app and Outlook, you also need to update the app manifest to version 1.13 or later. You can do this easily with Teams Toolkit, or manually.

# [Teams Toolkit](#tab/manifest-teams-toolkit)

1. Open the *Command palette*: `Ctrl+Shift+P`
1. Run **Teams: Upgrade Teams manifest to support Outlook and Microsoft 365 apps** command and select your app manifest file. Changes are made in place.

# [Manual steps](#tab/manifest-manual)

Open your app manifest and update the `$schema` and `manifestVersion` with the following values:

```json
{
    "$schema" : "https://developer.microsoft.com/json-schemas/teams/v1.13/MicrosoftTeams.schema.json",
    "manifestVersion" : "1.13"
}
```

---

If you used Teams Toolkit to create your personal app, you can also use it to validate the changes to your app manifest file and identify any errors. Open the command palette `Ctrl+Shift+P` and find **Teams: Validate manifest file** or select the option from the Deployment menu of the Teams Toolkit (look for the Teams icon on the left side of Visual Studio Code).

:::image type="content" source="../../m365-apps/images/toolkit-validate-manifest-file.png" alt-text="Teams Toolkit 'Validate manifest file' option under 'Deployment' menu":::

## Next steps

* Use the [TeamsJS library reference](/javascript/api/overview/msteams-client) to get started with the TeamsJS library.
* Review the [changelog](https://github.com/OfficeDev/microsoft-teams-library-js/blob/main/packages/teams-js/CHANGELOG.md) for  latest updates to TeamsJS.
