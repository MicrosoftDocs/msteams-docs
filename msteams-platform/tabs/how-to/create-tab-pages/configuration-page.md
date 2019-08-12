---
title: Create a Configuration Page for Your Custom Tab
author: laujan
description: 
keywords: teams tabs group channel configurable 
ms.topic: conceptual
ms.author: laujan
---
# Create a configuration page for your channel or group chat tab

A custom tab is a convenient bookmark for users to access your hosted web content within the Teams platform. Tabs in the channel or group chat scope require a configuration page that is used to add or edit a tab and set the content URL at the time of installation.

## Tab requirements

A configuration page informs the content page how it should render. Your application must reference the [Microsoft Teams JavaScript client SDK](foo.md) and call `microsoft.initialize()`. Additionally, your URLs must be secure HTTPS endpoints and available from the cloud. Below is a configuration page citation. It is available in full at [OurGitHubRepo](foo.md):

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

Here, the user is presented with two option buttons, **Select Gray** or **Select Red** to display the tab content with either a red or gray icon. Choosing the relative button fires `saveGray()` or `saveRed()` and invokes the following:

1. The `settings.setValidityState(true)` is set to true.
1. The `microsoftTeams.settings.registerOnSaveHandler()` event handler is triggered.
1. The **Save** button on the app's configuration page, uploaded in Teams, is enabled.

This code lets Teams know that the configuration requirements have been satisfied and the installation can proceed. On **Save**, the parameters of `settings.setSettings()` are set, as defined by the `Settings` interface, for the current instance (See [Settings interface](~/javascript/api/@microsoft/teams-js/microsoftteams.settings.settings?view=msteams-client-js-latest.md) ). Finally, `saveEvent.notifySuccess()` is called to indicate that the content URL has successfully resolved.

>[!NOTE]
>
>* If a save handler was registered using `microsoftTeams.settings.registerOnSaveHandler()`, the callback must invoke `saveEvent.notifySuccess()` or `saveEvent.notifyFailure()` to indicate the outcome of the configuration.
>* If no save handler was registered, the `saveEvent.notifySuccess()` call is automatically made immediately upon the user selecting the **Save** button. See [Troubleshoot your Microsoft Teams app](foo.md).

## Get context data for your tab settings

Your tab might require contextual information to display relevant content. Contextual information can further enhance your tab's appeal by providing a more customized user experience.

The Teams [Context interface](~/javascript/api/@microsoft/teams-js/microsoftteams.context?view=msteams-client-js-latest.md) defines the properties that can be used for your tab configuration. You can collect the values of context data variables in two ways:

1. Insert URL query string placeholders in your manifest's `configurationURL`.

1. Use the [Teams SDK](foo.md) `microsoftTeams.getContext((context) =>{}` method.

### Insert placeholders in the `configurationURL`

Context interface placeholders can be added to your base `configurationUrl`. For example:

#### Base Url

```json
...
"configurationUrl": "https://yourWebsite/config",
...
```

#### Base URL with query strings

```json
...
"configurationUrl": "https://yourWebsite/config?team={teamId}&channel={channelId}&{locale}"
...
```

After your page has uploaded, the query string placeholders will be updated by Teams with the relevant values. You can include logic in your configuration page to retrieve and use those values. For more information on working with URL query strings see [URLSearchParams](https://developer.mozilla.org/en-US/docs/Web/API/URLSearchParams) in MDN web docs. Here is an example of how to extract a value from the above `configurationURL` property:

```html
<script>
   microsoftTeams.initialize();
   const getId = () => {
        let urlParams = new URLSearchParams(document.location.search.substring(1));
        let blueTeamId = urlParams.get('team');
        return blueTeamId
    }
//For testing, you can invoke the following to view the pertinent value:
document.write(getId());
</script>

```

### Use the `getContext()` method to retrieve context

When invoked, the `microsoftTeams.getContext((context) => {})` function retrieves the [Context interface](~/javascript/api/@microsoft/teams-js//microsoftteams.context?view=msteams-client-js-latest.md). You can add this function to your configuration page to retrieve context values:

```html

    <!-- `userPrincipalName` will render in the span with the id "user". -->

    <span id="user"></span>
    ...
    <script>
    microsoftTeams.getContext((context) =>{
    let userId = document.getElementById('user');
    userId.innerHTML = context.userPrincipalName;
});
    </script>
    ...
```

## Context and Authentication

You might require authentication before allowing a user to configure your tab or your content might include sources that have their own authentication protocols. See [Authenticate a user in a Microsoft Teams tab](foo.md) Context information can be used to help construct authentication requests and authorization page URLs. See [Microsoft Teams authentication flow for tabs](foo.md).

## Modify or remove a tab

Supported removal options can further refine the user experience. You can enable users to modify, reconfigure, or rename a group/channel tab by setting your manifest's `canUpdateConfiguration` property to `true`.  In addition, you can designate what happens to the content when a tab is removed by including a removal options page in your app and setting a value for the `removeUrl` property in the  `setSettings()` configuration (see below). Personal tabs can't be modified but can be uninstalled by the user. For more information, see [Create a removal page for your tab](~/platform/tabs/how-t-/create-tab-pages/removal-page.md).

## Mobile clients

If you choose to have your channel/group tab appear on Teams mobile clients, the `setSettings()` configuration must have a value for the `websiteUrl` property (see below). Full support for tabs on mobile clients will be released soon. To prepare for the update, you should follow the [guidance for tabs on mobile](~/resources/design/framework/tabs-mobile.md) when creating your tabs.

Microsoft Teams setSettings() configuration for removal page and/or mobile clients:

```javascript
microsoftTeams.settings.setSettings({
    contentUrl: "add content page URL here",
    entityId: "add unique name here",
    suggestedDisplayName: "add name to display on tab here",
    websiteUrl: "URL REQUIRED FOR MOBILE CLIENTS",
    removeUrl: "ADD REMOVAL PAGE URL HERE"
});
```

Ready to get started building? Here are a few guidelines:

### Node.js

* [Quickstart: Create a custom personal tab with Node.js and the Yeoman Generator for Microsoft Teams](foo.md)
* [Quickstart: Create a custom channel and group tab with Node.js and the Yeoman Generator for Microsoft Teams](foo.md)

### .NET

* [Quickstart: Create a Custom Personal Tab with ASP.NET Core](foo.md)
* [Quickstart: Create a Custom Personal Tab with ASP. NET Core MVC](foo.md)
* [Quickstart: Create a Custom Channel and Group Tab with ASP.NET Core](foo.md)
* [Quickstart: Create a Custom Channel and Group Tab with ASP.NET Core MVC](foo.md)
