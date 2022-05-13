---
title: Building tabs and other hosted experiences with the JavaScript client SDK
author: heath-hamilton
ms.author: surbhigupta
description: Overview of the Microsoft Teams JavaScript client SDK, which can help you build Teams app experiences hosted in an <iframe>. It includes basic functions, authentication namespace, and settings namespace.
ms.localizationpriority: high
keywords: teams tabs group channel configurable static SDK JavaScript personal
ms.topic: conceptual
---
# Building tabs and other hosted experiences with the Microsoft Teams JavaScript client SDK

The Microsoft Teams JavaScript client SDK can help you create hosted experiences in Teams, which means displaying your app content in an iframe.

The SDK is helpful for developing apps with any of the following Teams capabilities:

* [Tabs](../../tabs/what-are-tabs.md)
* [Task modules](../../task-modules-and-cards/what-are-task-modules.md)

For example, the SDK can make your [tab react to theme changes](../../build-your-first-app/build-personal-tab.md#3-update-your-tab-theme) your users make in the Teams client.

## Getting started

Do one of the following depending on your development preferences:

* [Install the SDK with npm or Yarn](/javascript/api/overview/msteams-client?view=msteams-client-js-latest&preserve-view=true)
* [Clone the SDK (GitHub)](https://github.com/OfficeDev/microsoft-teams-library-js)

## Common SDK functions

See the following tables to understand commonly used SDK functions. The [SDK reference documentation](/javascript/api/@microsoft/teams-js/?view=msteams-client-js-latest&preserve-view=true) provides more comprehensive information.

### Basic functions

| Function  | Description          | Documentation|
| -----     | -----     | -----    |
| `microsoftTeams.initialize()` | Initializes the SDK. This function must be called before any other SDK calls.|[function](/javascript/api/@microsoft/teams-js/microsoftteams?view=msteams-client-js-latest#@microsoft-teams-js-microsoftteams-initialize&preserve-view=true)|
|`microsoftTeams.getContext(callback: (context: Context)`| Gets the current state in which the page is running. The callback retrieves the **Context** object.|[function](/javascript/api/@microsoft/teams-js/microsoftteams?view=msteams-client-js-latest&preserve-view=true)<br/>[context obj](/javascript/api/@microsoft/teams-js/@microsoft.teams-js?view=msteams-client-js-latest&preserve-view=true)|
| `microsoftTeams.initializeWithContext({contentUrl: string, websiteUrl: string})` | Initializes the Teams library and sets the tab's [frame context](/javascript/api/@microsoft/teams-js/microsoftteams.framecontext?view=msteams-client-js-latest&preserve-view=true) depending on the contentUrl and websiteUrl. This ensures the go-to-website/reload functionality operates on the correct URL.|[function](/javascript/api/@microsoft/teams-js/microsoftteams?view=msteams-client-js-latest#@microsoft-teams-js-microsoftteams-initializewithframecontext&preserve-view=true)|
| `microsoftTeams.setFrameContext({contentUrl: string, websiteUrl: string})` | Sets the tab's [frame context](/javascript/api/@microsoft/teams-js/microsoftteams.framecontext?view=msteams-client-js-latest&preserve-view=true) depending on the contentUrl and websiteUrl. This ensures the go-to-website/reload functionality operates on the correct URL.|[function](/javascript/api/@microsoft/teams-js/microsoftteams?view=msteams-client-js-latest#@microsoft-teams-js-microsoftteams-setframecontext&preserve-view=true)|
| `microsoftTeams.registerFullScreenHandler(handler: (isFullScreen: Boolean)` |The handler that is registered when the user toggles a tab's full-screen/windowed view.|[function](/javascript/api/@microsoft/teams-js/microsoftteams?view=msteams-client-js-latest#@microsoft-teams-js-microsoftteams-registerfullscreenhandler&preserve-view=true)<br/>[Boolean](/javascript/api/@microsoft/teams-js/microsoftteams?view=msteams-client-js-latest#@microsoft-teams-js-microsoftteams-registerfullscreenhandler&preserve-view=true)|
|`microsoftTeams.registerChangeSettingsHandler()` |The handler that is registered when the user selects the enabled **Settings** button to reconfigure a tab.|[function](/javascript/api/@microsoft/teams-js/microsoftteams?view=msteams-client-js-latest&preserve-view=true)|
| `microsoftTeams.getTabInstances(callback: (tabInfo: TabInformation),tabInstanceParameters?: TabInstanceParameters,)` |Gets the tabs owned by the app. The callback retrieves the **TabInformation** object. The **TabInstanceParameters** object is an optional parameter.|[function](/javascript/api/@microsoft/teams-js/microsoftteams?view=msteams-client-js-latest#@microsoft-teams-js-microsoftteams-gettabinstances&preserve-view=true)<br/>[tabInfo obj](/javascript/api/@microsoft/teams-js/microsoftteams.tabinformation?view=msteams-client-js-latest&preserve-view=true)|
|`microsoftTeams.getMruTabInstances(callback: (tabInfo: TabInformation),tabInstanceParameters?: TabInstanceParameters)`|Gets the most recently used tabs for the user. The callback retrieves the **TabInformation** object. The **TabInstanceParameters** object is an optional parameter.|[function](/javascript/api/@microsoft/teams-js/microsoftteams?view=msteams-client-js-latest#@microsoft-teams-js-microsoftteams-getmrutabinstances&preserve-view=true)<br/>[tabInfo obj](/javascript/api/@microsoft/teams-js/microsoftteams.tabinformation?view=msteams-client-js-latest&preserve-view=true)<br/>[tabInstance obj](/javascript/api/@microsoft/teams-js/microsoftteams.tabinstanceparameters?view=msteams-client-js-latest&preserve-view=true)|
|`microsoftTeams.shareDeepLink(deepLinkParameters: DeepLinkParameters)`|Takes the **DeepLinkParameters** object as input and shares a deep link dialog box that a user can use to navigate to content *within the tab*.|[function](/javascript/api/@microsoft/teams-js/microsoftteams?view=msteams-client-js-latest#@microsoft-teams-js-microsoftteams-sharedeeplink&preserve-view=true)<br/>[deepLink obj](/javascript/api/@microsoft/teams-js/microsoftteams.deeplinkparameters?view=msteams-client-js-latest&preserve-view=true)|
|`microsoftTeams.executeDeepLink(deepLink: string, onComplete?: (status: Boolean, reason?: string))`|Takes a required **deepLink** as input and navigates user to a URL or triggers a client action—such as opening or installing—an app *within Teams*.|[function](/javascript/api/@microsoft/teams-js/microsoftteams?view=msteams-client-js-latest#@microsoft-teams-js-microsoftteams-executedeeplink&preserve-view=true)|
|`microsoftTeams.navigateToTab(tabInstance: TabInstance, onComplete?: (status: Boolean, reason?: string))`|Takes the **TabInstance** object as input and navigates to a specified tab instance.|[function](/javascript/api/@microsoft/teams-js/microsoftteams?view=msteams-client-js-latest#@microsoft-teams-js-microsoftteams-navigatetotab&preserve-view=true)<br/>[tabInstance obj](/javascript/api/@microsoft/teams-js/microsoftteams.tabinstance?view=msteams-client-js-latest&preserve-view=true)|

### Authentication namespace

| Function  | Description          | Documentation|
| -----     | -----     | -----    |
|`microsoftTeams.authentication.authenticate(authenticateParameters?: AuthenticateParameters)`|Initiates an authentication request that opens a new window with the parameters provided by the caller. Optional input values are defined by the **AuthenticateParameters** object.|[function](/javascript/api/@microsoft/teams-js/microsoftteams.authentication?view=msteams-client-js-latest&preserve-view=true)<br/>[auth obj](/javascript/api/@microsoft/teams-js/microsoftteams.authentication.authenticateparameters?view=msteams-client-js-latest&preserve-view=true)|
|`microsoftTeams.authentication.notifySuccess(result?: string, callbackUrl?: string)`|Notifies the frame that initiated the authentication request that the request was successful and closes the authentication window|[function](/javascript/api/@microsoft/teams-js/microsoftteams.authentication?view=msteams-client-js-latest&preserve-view=true)|
|`microsoftTeams.authentication.notifyFailure(reason?: string, callbackUrl?: string)`|Notifies the frame that initiated the authentication request that the request failed and closes the authentication window.|[function](/javascript/api/@microsoft/teams-js/microsoftteams.authentication?view=msteams-client-js-latest&preserve-view=true)|
|`microsoftTeams.authentication.getAuthToken(authTokenRequest: AuthTokenRequest)`|Send request to issue Azure AD token on behalf of the app. The token can be acquired from the cache, if it has not expired. Otherwise, a request is sent to Azure AD to obtain a new token.|[function](/javascript/api/@microsoft/teams-js/microsoftteams.authentication?view=msteams-client-js-latest#@microsoft-teams-js-microsoftteams-authentication-getauthtoken&preserve-view=true)|

### Settings namespace

| Function  | Description          | Documentation|
| -----     | -----     | -----    |
|`microsoftTeams.settings.setValidityState(validityState: Boolean)`|The initial value is false. Activates the **Save** or **Remove** button when the validity state is true.|[function](/javascript/api/@microsoft/teams-js/microsoftteams.settings.settings?view=msteams-client-js-latest&preserve-view=true)|
|`microsoftTeams.settings.getSettings(callback: (instanceSettings: Settings)`|Gets the settings for the current instance. The callback retrieves the **Settings** object.|[function](/javascript/api/@microsoft/teams-js/microsoftteams.settings.settings?view=msteams-client-js-latest&preserve-view=true)<br/>[settings obj](/javascript/api/@microsoft/teams-js/microsoftteams.settings.settings?view=msteams-client-js-latest&preserve-view=true)|
|`microsoftTeams.settings.setSettings(instanceSettings: Settings, onComplete?: (status: Boolean, reason?: string)`|Configures the settings for the current instance. Valid settings are defined by the **Settings** object.|[function](/javascript/api/@microsoft/teams-js/microsoftteams.settings.settings?view=msteams-client-js-latest&preserve-view=true)<br/>[settings obj](/javascript/api/@microsoft/teams-js/microsoftteams.settings.settings?view=msteams-client-js-latest&preserve-view=true)|
|`microsoftTeams.settings.registerOnSaveHandler(handler: (evt: SaveEvent)`|The handler that is registered when the user selects the **Save** button. This handler should be used to create or update the underlying resource powering the content.|[function](/javascript/api/@microsoft/teams-js/microsoftteams.settings.settings?view=msteams-client-js-latest&preserve-view=true)|
|`microsoftTeams.settings.registerOnRemoveHandler(handler: (evt: RemoveEvent)`|The handler that is registered when the user selects the **Remove** button. This handler should be used to remove the underlying resource powering the content.|[function](/javascript/api/@microsoft/teams-js/microsoftteams.settings.settings?view=msteams-client-js-latest&preserve-view=true)|

### Task modules namespace

| Function  | Description          | Documentation|
| -----     | -----     | -----    |
|`microsoftTeams.tasks.startTask(taskInfo: TaskInfo, submitHandler?: (err: string, result: string)`|Takes the **TaskInfo** object as input and allows an app to open the task module. The optional **submitHandler** is registered when the task module is completed. |[function](/javascript/api/@microsoft/teams-js/microsoftteams.tasks?view=msteams-client-js-latest&preserve-view=true)<br/>[taskInfo obj](/javascript/api/@microsoft/teams-js/microsoftteams.taskinfo?view=msteams-client-js-latest&preserve-view=true)|
|`microsoftTeams.tasks.submitTask(result?: string | object, appIds?: string | string[])`|Submits the task module. The optional **result** string parameter is the result sent to the bot or the app and is typically a JSON object or serialization; The optional **appIds** string or string array parameter aids in validating that the call originated from the same appId as the one that invoked the task module.|[function](/javascript/api/@microsoft/teams-js/microsoftteams.tasks?view=msteams-client-js-latest#@microsoft-teams-js-microsoftteams-tasks-submittask&preserve-view=true)|
