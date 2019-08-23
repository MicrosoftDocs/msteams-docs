---
title: Create a content page
author: laujan
description: 
keywords: teams tabs group channel configurable static
ms.topic: conceptual
ms.author: v-laujan
---
# Create a content page for your tab

A content page is a webpage that is rendered within the Teams client. Typically these are part of:

* A personal-scoped custom tab - In this instance the content page is the first page the user encounters.
* A channel/group custom tab - After the user pins and configures the tab in the appropriate context, the content page is displayed.
* A [task module](foo.md) - You can create a content page and embed it as a webview inside a task module. The page will be rendered inside the modal popup.

This article is specific to using content pages as tabs; however the majority of the guidance here would apply regardless of how the content page is presented to the end-user.

## Tab content and style guidelines

Your tab's overall objective should be to provide access to meaningful and engaging content that has a practical value and an evident purpose. That does not mean that you should forego a pleasing style, but you should focus on minimizing clutter by making your tab design clean, navigation intuitive, and content immersive. See [Content and conversations, all at once using tabs](~/resources/design/framework/tabs) and [Microsoft Teams app approval process guidance](~/platform/publishing/office-store-approval#tabs)

## Integrate your code with Teams

For your page to display in Teams, you must include the [Microsoft Teams JavaScript client SDK](~/foo.md) and include a call to `microsoftTeams.initialize()` after your page loads. That is how your page and the Teams client communicate:

```html
<!DOCTYPE html>
<html>
<head>
...
    <script src= 'https://statics.teams.microsoft.com/sdk/v1.5.0/js/MicrosoftTeams.min.js'></script>
...
</head>

<body>
...
    <script>
    microsoftTeams.initialize();
    </script>
...
</body>
```

>[!IMPORTANT]
>Don't copy/paste the `<script src="...">` URLs from this page, as it might not represent the latest version. To get the latest version of the SDK markup, always go to:
[Microsoft Teams JavaScript API (via CDN)](static.foo.com).

## Accessing additional content

### Using the SDK to interact with Teams

The **Teams JavaScript client SDK**  and **Teams JavaScript Library** are part of the [Microsoft Teams developer platform](https://msdn.microsoft.com/microsoft-teams) and provide tools and processes to facilitate Teams application creation. The Teams client SDK is distributed as an npm package. The latest version can be found here:
<https://www.npmjs.com/package/@microsoft/teams-js>. The Teams Library is located at <https://github.com/OfficeDev/microsoft-teams-library-js>.
The following table outlines the Teams Library functions typically used in tabs development:<br/><br/>

| Module         | Function  | Description          | Documentation|
| -----          | -----     | -----     | -----    | -----        |
| Teams SDK public API     |            |      |[source code](https://github.com/OfficeDev/microsoft-teams-library-js/blob/master/src/public/publicAPIs.ts)|
|                | `microsoftTeams.initialize()` | Initializes the Teams library. This function must be called before any other SDK calls.|[function](~/javascript/api/@microsoft/teams-js/microsoftteams?view=msteams-client-js-latest#initialize-any-)|
||`microsoftTeams.getContext(callback: (context: Context)`| Gets the current state in which the page is running. The callback retrieves the **Context** object.|[function](~/javascript/api/@microsoft/teams-js/microsoftteams?view=msteams-client-js-latest#getcontext--context--context-----void-)<br/>[context obj](~/javascript/api/@microsoft/teams-js/microsoftteams.context?view=msteams-client-js-latest)|
|| `microsoftTeams.registerFullScreenHandler(handler: (isFullScreen: boolean)` |The handler that is registered when the user toggles a tab's full-screen/windowed view.|[function](~/javascript/api/@microsoft/teams-js/microsoftteams?view=msteams-client-js-latest#registerfullscreenhandler--isfullscreen--boolean-----void-)<br/>[boolean](~/javascript/api/@microsoft/teams-js/microsoftteams.context?view=msteams-client-js-latest#isfullscreen)|
||`microsoftTeams.registerChangeSettingsHandler()` |The handler that is registered when the user selects the enabled **Settings** button to reconfigure a tab.|[function](~/javascript/api/@microsoft/teams-js/microsoftteams?view=msteams-client-js-latest#registerchangesettingshandler-------void-)|
|| `microsoftTeams.getTabInstances(callback: (tabInfo: TabInformation),tabInstanceParameters?: TabInstanceParameters,)` |Gets the tabs owned by the app. The callback retrieves the **TabInformation** object. The **TabInstanceParameters** object is an optional parameter.|[function](~/javascript/api/@microsoft/teams-js/microsoftteams?view=msteams-client-js-latest#gettabinstances--tabinfo--tabinformation-----void--tabinstanceparameters-)<br/>[tabInfo obj](~/javascript/api/@microsoft/teams-js/microsoftteams.tabinformation?view=msteams-client-js-latest)|
||`microsoftTeams.getMruTabInstances(callback: (tabInfo: TabInformation),tabInstanceParameters?: TabInstanceParameters)`|Gets the most recently used tabs for the user. The callback retrieves the **TabInformation** object. The **TabInstanceParameters** object is an optional parameter.|[function](~/javascript/api/@microsoft/teams-js/microsoftteams?view=msteams-client-js-latest#getmrutabinstances--tabinfo--tabinformation-----void--tabinstanceparameters-)<br/>[tabInfo obj](~/javascript/api/@microsoft/teams-js/microsoftteams.teaminformation?view=msteams-client-js-latest)<br/>[tabInstance obj](~//javascript/api/@microsoft/teams-js/microsoftteams.tabinstanceparameters?view=msteams-client-js-latest)|
||`microsoftTeams.shareDeepLink(deepLinkParameters: DeepLinkParameters)`|Takes the **DeepLinkParameters** object as input and shares a deep link dialog box that a user can use to navigate to content *within the tab*.|[function](~/javascript/api/@microsoft/teams-js/microsoftteams?view=msteams-client-js-latest#sharedeeplink-deeplinkparameters-)<br/>[deepLink obj](~/javascript/api/@microsoft/teams-js/microsoftteams.deeplinkparameters?view=msteams-client-js-latest)|
||`microsoftTeams.executeDeepLink(deepLink: string, onComplete?: (status: boolean, reason?: string))`|Takes a required **deepLink** as input and navigates user to a URL or triggers a client action—such as opening or installing—an app *within Teams*.|[function](foo.md)|
||`microsoftTeams.navigateToTab(tabInstance: TabInstance, onComplete?: (status: boolean, reason?: string))`|Takes the **TabInstance** object as input and navigates to a specified tab instance.|[function](~/javascript/api/@microsoft/teams-js/microsoftteams?view=msteams-client-js-latest#navigatetotab-tabinstance-)<br/>[tabInstance obj](~//javascript/api/@microsoft/teams-js/microsoftteams.tabinstance?view=msteams-client-js-latest)|
|Authentication namespace||[source code](https://github.com/OfficeDev/microsoft-teams-library-js/blob/master/src/public/authentication.ts)|
||`microsoftTeams.authentication.authenticate(authenticateParameters?: AuthenticateParameters)`|Initiates an authentication request that opens a new window with the parameters provided by the caller. Optional input values are defined by the **AuthenticateParameters** object.|[function](~/javascript/api/@microsoft/teams-js/microsoftteams.authentication?view=msteams-client-js-latest#authenticate-authenticateparameters-)<br/>[auth obj](~/javascript/api/@microsoft/teams-js/microsoftteams.authentication.authenticateparameters?view=msteams-client-js-latest)|
||`microsoftTeams.authentication.notifySuccess(result?: string, callbackUrl?: string)`|Notifies the frame that initiated the authentication request that the request was successful and closes the authentication window|[function](~/javascript/api/@microsoft/teams-js/microsoftteams.authentication?view=msteams-client-js-latest#notifysuccess-string--string-)|
||`microsoftTeams.authentication.notifyFailure(reason?: string, callbackUrl?: string)`|Notifies the frame that initiated the authentication request that the request failed and closes the authentication window.|[function](~/javascript/api/@microsoft/teams-js/microsoftteams.authentication?view=msteams-client-js-latest#notifyfailure-string--string-)|
|Settings namespace||[source code](https://github.com/OfficeDev/microsoft-teams-library-js/blob/master/src/public/settings.ts)|
||`microsoftTeams.settings.setValidityState(validityState: boolean)`|The initial value is false. Activates the **Save** or **Remove** button when the validity state is true.|[function](~/javascript/api/@microsoft/teams-js/microsoftteams.settings?view=msteams-client-js-latest#setvaliditystate-boolean-)|
||`microsoftTeams.settings.getSettings(callback: (instanceSettings: Settings)`|Gets the settings for the current instance. The callback retrieves the **Settings** object.|[function](~/javascript/api/@microsoft/teams-js/microsoftteams.settings?view=msteams-client-js-latest#getsettings--instancesettings--settings-----void-)<br/>[settings obj](~/javascript/api/@microsoft/teams-js/microsoftteams.settings.settings?view=msteams-client-js-latest)|
||`microsoftTeams.settings.setSettings(instanceSettings: Settings, onComplete?: (status: boolean, reason?: string)`|Configures the settings for the current instance. Valid settings are defined by the **Settings** object.|[function](~/javascript/api/@microsoft/teams-js/microsoftteams.settings?view=msteams-client-js-latest#setsettings-settings-)<br/>[settings obj](javascript/api/@microsoft/teams-js/microsoftteams.settings.settings?view=msteams-client-js-latest)|
||`microsoftTeams.settings.registerOnSaveHandler(handler: (evt: SaveEvent)`|The handler that is registered when the user selects the **Save** button. This handler should be used to create or update the underlying resource powering the content.|[function](~/javascript/api/@microsoft/teams-js/microsoftteams.settings?view=msteams-client-js-latest#registeronsavehandler--evt--saveevent-----void-)|
||`microsoftTeams.settings.registerOnRemoveHandler(handler: (evt: RemoveEvent)`|The handler that is registered when the user selects the **Remove** button. This handler should be used to remove the underlying resource powering the content.|[function](~/javascript/api/@microsoft/teams-js/microsoftteams.settings?view=msteams-client-js-latest#registeronremovehandler--evt--removeevent-----void-)|
|Tasks namespace||[source code](https://github.com/OfficeDev/microsoft-teams-library-js/blob/master/src/public/tasks.ts)|
||`microsoftTeams.tasks.startTask(taskInfo: TaskInfo, submitHandler?: (err: string, result: string)`|Takes the **TaskInfo** object as input and allows an app to open the task module. The optional **submitHandler** is registered when the task module is completed. |[function](~/javascript/api/@microsoft/teams-js/microsoftteams.tasks?view=msteams-client-js-latest#starttask-taskinfo---err--string--result--string-----void-)<br/>[taskInfo obj](~/javascript/api/@microsoft/teams-js/microsoftteams.taskinfo?view=msteams-client-js-latest)|
||`microsoftTeams.tasks.submitTask(result?: string | object, appIds?: string | string[])`|Submits the task module. The optional **result** string parameter is the result sent to the bot or the app and is typically a JSON object or serialization; The optional **appIds** string or string array parameter aids in validating that the call originated from the same appId as the one that invoked the task module.|[function](~//javascript/api/@microsoft/teams-js/microsoftteams.tasks?view=msteams-client-js-latest#submittask-string---object--string---string---)|
||||

### Deep links

You can create deep links to entities in Teams. Typically, these are used to create links that navigate to content and information within your tab. See [Create deep links to content and features in Microsoft Teams](foo.md)

### Task Modules

A task module is a modal popup-like experience that you can trigger from your tab. Typically in a content page you do not want to navigate your user through multiple pages. Instead, you will use task modules to present forms for gathering additional information, displaying the details of an item in a list, or any other time you need to present the user with additional information. The task modules themselves can be additional content pages, or created completely using Adaptive Cards. See [Using task modules in tabs](foo.md) for complete information.

### Valid Domains

Ensure that the all URL domains used in your tabs are included in the `validDomains` array in your [manifest](~/concepts/apps/apps-package). For more information, see [validDomains](~/resources/schema/manifest-schema#validdomains) in the manifest schema reference. However, be mindful that the core functionality of your tab exists within Teams and not outside of Teams.

## Get Started

Ready to get started building?

Node.js

- [Quickstart: Create a custom personal tab with Node.js and the Yeoman Generator for Microsoft Teams](foo.md)
- [Quickstart: Create a custom channel and group tab with Node.js and the Yeoman Generator for Microsoft Teams](foo.md)

.NET

- [Quickstart: Create a Custom Personal Tab with ASP.NET Core](foo.md)
- [Quickstart: Create a Custom Personal Tab with ASP. NET Core MVC](foo.md)
- [Quickstart: Create a Custom Channel and Group Tab with ASP.NET Core](foo.md)
- [Quickstart: Create a Custom Channel and Group Tab with ASP.NET Core MVC](foo.md)
