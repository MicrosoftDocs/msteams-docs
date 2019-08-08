---
title: Create a Content Page for Your Custom Tab
author: laujan
description: 
keywords: teams tabs group channel configurable 
ms.topic: conceptual
ms.author: laujan
---
# Create a Configuration Page for Your Channel or Group Chat Tab

A custom tab is a convenient bookmark for users to access your hosted web content within the Teams platform. Tabs in the channel or group chat scope require a configuration page that is used to add or edit a tab and set the content URL based on user input at the time of installation.

## Tab requirements

A configuration page contains JavaScript code that is added to your view page(s). Each page must reference the [Microsoft Teams JavaScript client SDK](foo.md) and call `microsoft.initialize()`, conceivably via a shared layout. Additionally, your URLs must be secure HTTPS endpoints and available from the cloud. Microsoft Teams will not display insecure HTTP content. Below is an excerpt from a code sample fully available at [GitHubRepo](foo.md)):

```html
<head>
<script src='https://statics.teams.microsoft.com/sdk/v1.4.3/js/MicrosoftTeams.min.js'></script>
 </head>
    <body>
    ...
    <script>
        microsoftTeams.initialize();
        let saveGray = () => {
            microsoftTeams.settings.registerOnSaveHandler(function (saveEvent) {
                microsoftTeams.settings.setSettings({
                    websiteUrl: "https://yourWebsite.com",
                    contentUrl: "https://yourWebsite.com/gray",
                    entityId: "grayIconTab",
                    suggestedDisplayName: "MyNewTab"
                });
                saveEvent.notifySuccess();
            });
        }
        let saveRed = () => {
            microsoftTeams.settings.registerOnSaveHandler(function (saveEvent) {
                microsoftTeams.settings.setSettings({
                    websiteUrl: "https://yourWebsite.com",
                    contentUrl: "https://yourWebsite.com/red",
                    entityId: "redIconTab",
                    suggestedDisplayName: "MyNewTab"
                });
                saveEvent.notifySuccess();
            });
        }
    </script>
    ...
    <script>
        let gr = document.getElementById("gray").style;
        let rd = document.getElementById("red").style;

        const colorClickGray = () => {
            gr.display = "block";
            rd.display = "none";
            microsoftTeams.settings.setValidityState(true);
            saveGray()
        }

        const colorClickRed = () => {
            rd.display = "block";
            gr.display = "none";
            microsoftTeams.settings.setValidityState(true);
            saveRed();
        }
    </script>
  ...
  </body>

<button onclick="(document.getElementById('icon').src = '/images/iconGray.png'); colorClickGray()">Select Gray</button>

<img id="icon" src="/images/teamsIcon.png" alt="icon" style="width:100px" />

<button onclick="(document.getElementById('icon').src = '/images/iconRed.png'); colorClickRed()">Select Red</button>
...
```

Here, the the user is presented with two option buttons, **Select Gray** or  **Select Red** to display the tab with either a red or gray icon. Choosing the *SelectGray* or *SelectRed* button fires `saveGray()` or `saveRed()`, sets `settings.setValidityState(true)`, triggers the `microsoftTeams.settings.registerOnSaveHandler()` event handler, and enables the **Save** button on your uploaded app's configuration page in Teams.This code lets Teams know that you have satisfied the configuration requirements and the installation can proceed. On save, the parameters of `settings.setSettings()` are set as defined by the `Settings` interface (See [Settings interface](~/javascript/api/@microsoft/teams-js/microsoftteams.settings.settings?view=msteams-client-js-latest.md) ) for the current instance. Finally, `saveEvent.notifySuccess()` is called to indicate that the content URL has successfully resolved.

>[!NOTE]
>
>* If a save handler was registered using `microsoftTeams.settings.registerOnSaveHandler()`, the callback must call `saveEvent.notifySuccess().
>* If no save handler was registered, the `saveEvent.notifySuccess()` call is automatically made immediately upon the user selecting the save button. See [Troubleshoot your Microsoft Teams app](foo.md).

## Get context data for your tab settings

You can capture and use the values of context data variables in two ways:

1. Insert URL placeholders in your content URLs.
The available placeholders are the properties defined in the [Context interface](~/javascript/api/@microsoft/teams-js/microsoftteams.context?view=msteams-client-js-latest.md). Teams updates the placeholders by assigning the true values to the relevant URLs when your code runs. For example, you can set the `contentURL` in the `MicrosoftTeams.settings.setSettings()` as follows:

    ```json
    ...
    contentUrl: "https://www.yourWebsite.com/tenant={tid}&group={groupId}&location={locale}"
    ...
    ```

1. Use the [Microsoft Teams JavaScript client SDK](foo.md) and apply the `microsoftTeams.getContext(function(context){}` method that takes a callback function and, when invoked, retrieves the [Context interface](foo.md).

```html

 <head>

</head>

    <body>
    ...
    <script>
        microsoftTeams.initialize();
        let saveGray = () => {
            microsoftTeams.settings.registerOnSaveHandler((saveEvent) => {
                let url = "https://yourWebsite.com"
                microsoftTeams.getContext(context) => {
                    if(context.channelId === "TeamA"){
                        let teamAUrl = `${url}/gray`;
                        }
                   if(context.channelId === "TeamB"){
                        let teamBUrl = `${url}/red`;
                    }
                let entity = `${context.teamId}-${context.channelId}`
}
                microsoftTeams.settings.setSettings({
                    websiteUrl: `${url}`,
                    contentUrl: `${teamAUrl}`,
                    entityId: `${entity}`,
                    suggestedDisplayName: "MyNewTab"
                });
                saveEvent.notifySuccess();
                });
            });
        }
        let saveRed = () => {
            microsoftTeams.settings.registerOnSaveHandler(function (saveEvent) {
                microsoftTeams.settings.setSettings({
                    websiteUrl: `${url}`,
                    contentUrl: `${teamBUrl}`,
                    entityId: `${entity}`,
                    suggestedDisplayName: "MyNewTab"
                });
                saveEvent.notifySuccess();
            });
        }
    </script>
    ...
```
The above code initializes the Teams Library, sets the **Save** button state in the Teams app based on the field content, registers a function as the Save Handler, and sets the Teams settings for the tab, including the url of the content page and the Entity Id for the tab.

## Modify or remove a tab 

You can enable users to modify, reconfigure, or rename a group/channel tab by setting your manifest's `canUpdateConfiguration` property to `true`. Supported removal options can further refine the user experience. You can designate what happens to the content when a tab is removed by including a removal options page in your app and setting a value for the `removeUrl` property in the  `setSettings()` configuration (see below). Personal tabs can't be modified but can be uninstalled by the user.

## Mobile clients

If you choose to have your channel/group tab appear on Teams mobile clients, the `setSettings()` configuration must have a value for the `websiteUrl` property (see below). Full support for tabs on mobile clients will be released soon. To prepare for the update, you should follow the [guidance for tabs on mobile](~/resources/design/framework/tabs-mobile.md) when creating your tabs.

Microsoft Teams setSettings() configuration:

```javascript
microsoftTeams.settings.setSettings({
    contentUrl: "add content page URL here",
    entityId: "add unique name here",
    suggestedDisplayName: "add name to display on tab here",
    websiteUrl: "REQUIRED FOR MOBILE CLIENTS",
    removeUrl: "ADD REMOVAL PAGE URL HERE"
});
```

## Context and Authentication

Your tab may need to access services such as Twitter, Facebook, and Teams that require authentication and authorization. You can add a button to your configuration or content page to enable users to sign in when needed. See [Authenticate a user in a Microsoft Teams tab](foo.md) and. The user context information can be help construct authentication requests and URLs. See [Microsoft Teams authentication flow for tabs](foo.md).

Ready to get started building? Here are a few guidelines:

#### Node.js

* [Quickstart: Create a custom personal tab with Node.js and the Yeoman Generator for Microsoft Teams](foo.md)
* [Quickstart: Create a custom channel and group tab with Node.js and the Yeoman Generator for Microsoft Teams](foo.md)

#### .NET

* [Quickstart: Create a Custom Personal Tab with ASP.NET Core](foo.md)
* [Quickstart: Create a Custom Personal Tab with ASP. NET Core MVC](foo.md)
* [Quickstart: Create a Custom Channel and Group Tab with ASP.NET Core](foo.md)
* [Quickstart: Create a Custom Channel and Group Tab with ASP.NET Core MVC](foo.md)
