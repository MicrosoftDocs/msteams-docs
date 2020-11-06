---
title: Using the Teams client SDK
author: laujan
description: How to use the Teams client SDK to add Teams-aware functionality to your custom tabs
keywords: teams tabs group channel configurable static SDK JavaScript personal
ms.topic: conceptual
---
# Using the Teams client SDK

The **Teams JavaScript client SDK**  and **Teams JavaScript Library** are part of the [Microsoft Teams developer platform](/microsoftteams/platform/) and provide tools and processes to facilitate Teams application creation. The Teams client SDK is distributed as an npm package. The latest version can be found here:
<https://www.npmjs.com/package/@microsoft/teams-js>. The Teams Library is located at <https://github.com/OfficeDev/microsoft-teams-library-js>.

The following table outlines the Teams Library functions typically used in tabs development:

## Teams SDK public API 

| Function  | Description          | Documentation|
| -----     | -----     | -----    |
| `microsoftTeams.initialize()` | Initializes the Teams library. This function must be called before any other SDK calls.|[function](/javascript/api/@microsoft/teams-js/microsoftteams?view=msteams-client-js-latest#initialize-any-)|
|`microsoftTeams.getContext(callback: (context: Context)`| Gets the current state in which the page is running. The callback retrieves the **Context** object.|[function](/javascript/api/@microsoft/teams-js/microsoftteams?view=msteams-client-js-latest#getcontext--context--context-----void-)<br/>[context obj](https://docs.microsoft.com/en-us/javascript/api/@microsoft/teams-js/context?view=msteams-client-js-latest)|
| `microsoftTeams.initializeWithContext({contentUrl: string, websiteUrl: string})` | Initializes the Teams library and sets the tab's [frame context](/javascript/api/@microsoft/teams-js/microsoftteams.framecontext?view=msteams-client-js-latest) depending on the contentUrl and websiteUrl. This ensures the go-to-website/reload functionality operates on the correct URL.|[function](/javascript/api/@microsoft/teams-js/microsoftteams?view=msteams-client-js-latest#initializewithframecontext-framecontext--------void--string---)|
| `microsoftTeams.setFrameContext({contentUrl: string, websiteUrl: string})` | Sets the tab's [frame context](/javascript/api/@microsoft/teams-js/microsoftteams.framecontext?view=msteams-client-js-latest) depending on the contentUrl and websiteUrl. This ensures the go-to-website/reload functionality operates on the correct URL.|[function](/javascript/api/@microsoft/teams-js/microsoftteams?view=msteams-client-js-latest#setframecontext-framecontext-)|
| `microsoftTeams.registerFullScreenHandler(handler: (isFullScreen: boolean)` |The handler that is registered when the user toggles a tab's full-screen/windowed view.|[function](/javascript/api/@microsoft/teams-js/microsoftteams?view=msteams-client-js-latest#registerfullscreenhandler--isfullscreen--boolean-----void-)<br/>[boolean](https://docs.microsoft.com/en-us/javascript/api/@microsoft/teams-js/microsoftteams?view=msteams-client-js-latest#registerFullScreenHandler__isFullScreen__boolean_____void_)|
|`microsoftTeams.registerChangeSettingsHandler()` |The handler that is registered when the user selects the enabled **Settings** button to reconfigure a tab.|[function](/javascript/api/@microsoft/teams-js/microsoftteams?view=msteams-client-js-latest#registerchangesettingshandler-------void-)|
| `microsoftTeams.getTabInstances(callback: (tabInfo: TabInformation),tabInstanceParameters?: TabInstanceParameters,)` |Gets the tabs owned by the app. The callback retrieves the **TabInformation** object. The **TabInstanceParameters** object is an optional parameter.|[function](/javascript/api/@microsoft/teams-js/microsoftteams?view=msteams-client-js-latest#gettabinstances--tabinfo--tabinformation-----void--tabinstanceparameters-)<br/>[tabInfo obj](https://docs.microsoft.com/en-us/javascript/api/@microsoft/teams-js/tabinformation?view=msteams-client-js-latest)|
|`microsoftTeams.getMruTabInstances(callback: (tabInfo: TabInformation),tabInstanceParameters?: TabInstanceParameters)`|Gets the most recently used tabs for the user. The callback retrieves the **TabInformation** object. The **TabInstanceParameters** object is an optional parameter.|[function](/javascript/api/@microsoft/teams-js/microsoftteams?view=msteams-client-js-latest#getmrutabinstances--tabinfo--tabinformation-----void--tabinstanceparameters-)<br/>[tabInfo obj](https://docs.microsoft.com/en-us/javascript/api/@microsoft/teams-js/tabinformation?view=msteams-client-js-latest)<br/>[tabInstance obj](https://docs.microsoft.com/en-us/javascript/api/@microsoft/teams-js/tabinstanceparameters?view=msteams-client-js-latest)|
|`microsoftTeams.shareDeepLink(deepLinkParameters: DeepLinkParameters)`|Takes the **DeepLinkParameters** object as input and shares a deep link dialog box that a user can use to navigate to content *within the tab*.|[function](/javascript/api/@microsoft/teams-js/microsoftteams?view=msteams-client-js-latest#sharedeeplink-deeplinkparameters-)<br/>[deepLink obj](https://docs.microsoft.com/en-us/javascript/api/@microsoft/teams-js/deeplinkparameters?view=msteams-client-js-latest)|
|`microsoftTeams.executeDeepLink(deepLink: string, onComplete?: (status: boolean, reason?: string))`|Takes a required **deepLink** as input and navigates user to a URL or triggers a client action—such as opening or installing—an app *within Teams*.|[function](/javascript/api/@microsoft/teams-js/microsoftteams?view=msteams-client-js-latest#executedeeplink-string---status--boolean--reason---string-----void-)|
|`microsoftTeams.navigateToTab(tabInstance: TabInstance, onComplete?: (status: boolean, reason?: string))`|Takes the **TabInstance** object as input and navigates to a specified tab instance.|[function](/javascript/api/@microsoft/teams-js/microsoftteams?view=msteams-client-js-latest#navigatetotab-tabinstance-)<br/>[tabInstance obj](https://docs.microsoft.com/en-us/javascript/api/@microsoft/teams-js/tabinstance?view=msteams-client-js-latest)|

## Authentication namespace

| Function  | Description          | Documentation|
| -----     | -----     | -----    |
|`microsoftTeams.authentication.authenticate(authenticateParameters?: AuthenticateParameters)`|Initiates an authentication request that opens a new window with the parameters provided by the caller. Optional input values are defined by the **AuthenticateParameters** object.|[function](https://docs.microsoft.com/en-us/javascript/api/@microsoft/teams-js/authentication?view=msteams-client-js-latest)<br/>[auth obj](https://docs.microsoft.com/en-us/javascript/api/@microsoft/teams-js/authenticateparameters?view=msteams-client-js-latest)|
|`microsoftTeams.authentication.notifySuccess(result?: string, callbackUrl?: string)`|Notifies the frame that initiated the authentication request that the request was successful and closes the authentication window|[function](https://docs.microsoft.com/en-us/javascript/api/@microsoft/teams-js/authentication?view=msteams-client-js-latest)|
|`microsoftTeams.authentication.notifyFailure(reason?: string, callbackUrl?: string)`|Notifies the frame that initiated the authentication request that the request failed and closes the authentication window.|[function](https://docs.microsoft.com/en-us/javascript/api/@microsoft/teams-js/authentication?view=msteams-client-js-latest)|

## Settings namespace

| Function  | Description          | Documentation|
| -----     | -----     | -----    |
|`microsoftTeams.settings.setValidityState(validityState: boolean)`|The initial value is false. Activates the **Save** or **Remove** button when the validity state is true.|[function](https://docs.microsoft.com/en-us/javascript/api/@microsoft/teams-js/settings?view=msteams-client-js-latest)|
|`microsoftTeams.settings.getSettings(callback: (instanceSettings: Settings)`|Gets the settings for the current instance. The callback retrieves the **Settings** object.|[function](https://docs.microsoft.com/en-us/javascript/api/@microsoft/teams-js/settings?view=msteams-client-js-latest)<br/>[settings obj](https://docs.microsoft.com/en-us/javascript/api/@microsoft/teams-js/_settings?view=msteams-client-js-latest)|
|`microsoftTeams.settings.setSettings(instanceSettings: Settings, onComplete?: (status: boolean, reason?: string)`|Configures the settings for the current instance. Valid settings are defined by the **Settings** object.|[function](/https://docs.microsoft.com/en-us/javascript/api/@microsoft/teams-js/settings?view=msteams-client-js-latest)<br/>[settings obj](/javascript/api/@microsoft/teams-js/microsoftteams.settings.settings?view=msteams-client-js-latest)|
|`microsoftTeams.settings.registerOnSaveHandler(handler: (evt: SaveEvent)`|The handler that is registered when the user selects the **Save** button. This handler should be used to create or update the underlying resource powering the content.|[function](https://docs.microsoft.com/en-us/javascript/api/@microsoft/teams-js/settings?view=msteams-client-js-latest)|
|`microsoftTeams.settings.registerOnRemoveHandler(handler: (evt: RemoveEvent)`|The handler that is registered when the user selects the **Remove** button. This handler should be used to remove the underlying resource powering the content.|[function](https://docs.microsoft.com/en-us/javascript/api/@microsoft/teams-js/settings?view=msteams-client-js-latest)|

## Tasks namespace

| Function  | Description          | Documentation|
| -----     | -----     | -----    |
|`microsoftTeams.tasks.startTask(taskInfo: TaskInfo, submitHandler?: (err: string, result: string)`|Takes the **TaskInfo** object as input and allows an app to open the task module. The optional **submitHandler** is registered when the task module is completed. |[function](https://docs.microsoft.com/en-us/javascript/api/@microsoft/teams-js/tasks?view=msteams-client-js-latest)<br/>[taskInfo obj](https://docs.microsoft.com/en-us/javascript/api/@microsoft/teams-js/taskinfo?view=msteams-client-js-latest)|
|`microsoftTeams.tasks.submitTask(result?: string | object, appIds?: string | string[])`|Submits the task module. The optional **result** string parameter is the result sent to the bot or the app and is typically a JSON object or serialization; The optional **appIds** string or string array parameter aids in validating that the call originated from the same appId as the one that invoked the task module.|[function](/javascript/api/@microsoft/teams-js/microsoftteams.tasks?view=msteams-client-js-latest#submittask-string---object--string---string---)|
