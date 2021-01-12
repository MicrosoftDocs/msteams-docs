---
title: Create a configuration page
author: laujan
description: how to create a configuration page
keywords: teams tabs group channel configurable 
ms.topic: conceptual
ms.author: lajanuar
---
# Create a configuration page

A configuration page is a special type of [content page](content-page.md) that allows your users to configure some aspects of the Teams app. It collects information from users and sets the `contentUrl` of the content page that appears. These aspects are part of the following:

* A channel or group chat tab  
* A [messaging extension](~/messaging-extensions/what-are-messaging-extensions.md)
* An [Office 365 Connector](~/webhooks-and-connectors/what-are-webhooks-and-connectors.md)

## Configuring a channel or group chat tab

The application must reference the [Microsoft Teams JavaScript client SDK](/javascript/api/overview/msteams-client?view=msteams-client-js-latest&preserve-view=true) and call `microsoft.initialize()`. The URLs used also must be secured HTTPS endpoints and available from the cloud. The following code is an example of a configuration page:

```html
<head>
<script src='https://statics.teams.cdn.office.net/sdk/v1.6.0/js/MicrosoftTeams.min.js'></script>
</head>
    <body>
        <button onclick="(document.getElementById('icon').src = '/images/iconGray.png'); colorClickGray()">Select Gray</button>
        <img id="icon" src="/images/teamsIcon.png" alt="icon" style="width:100px" />
        <button onclick="(document.getElementById('icon').src = '/images/iconRed.png'); colorClickRed()">Select Red</button>

        <script>
            microsoftTeams.initialize();
            let saveGray = () => {
                microsoftTeams.settings.registerOnSaveHandler((saveEvent) => {
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
                microsoftTeams.settings.registerOnSaveHandler((saveEvent) => {
                    microsoftTeams.settings.setSettings({
                        websiteUrl: "https://yourWebsite.com",
                        contentUrl: "https://yourWebsite.com/red",
                        entityId: "redIconTab",
                        suggestedDisplayName: "MyNewTab"
                    });
                    saveEvent.notifySuccess();
                });
            }

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
    </body>
...
```

To display the tab content with a gray or red icon, choose either **Select Gray** or **Select Red**. Choosing the relative option fires either `saveGray()` or `saveRed()` and invokes the following:

1. The `settings.setValidityState(true)` is set to true.
1. The `microsoftTeams.settings.registerOnSaveHandler()` event handler is triggered.
1. The **Save** button on the app's configuration page, uploaded in Teams, is enabled.

This code informs Teams that the configuration requirements are satisfied and the installation can proceed. When the user selects **Save**, the parameters of `settings.setSettings()` are set, as defined by the `Settings` interface. For more information, see [Settings interface](/javascript/api/@microsoft/teams-js/_settings?view=msteams-client-js-latest&preserve-view=true). In the last step, `saveEvent.notifySuccess()` is called to indicate that the content URL has successfully resolved.

>[!NOTE]
>
>* If you register a save handler using `microsoftTeams.settings.registerOnSaveHandler()`, this returns a request for `saveEvent.notifySuccess()` or `saveEvent.notifyFailure()` to indicate the effect of the configuration.
>* If you don't register a save handler, the `saveEvent.notifySuccess()` call is automatically made immediately when the user selects **Save**.

### Get context data for your tab settings

Your tab might require contextual information to display relevant content. Contextual information further enhances your tab's appeal by providing a more customized user experience.

The Teams [Context interface](/javascript/api/@microsoft/teams-js/context?view=msteams-client-js-latest&preserve-view=true) defines the properties that can be used for your tab configuration. Collect the values of context data variables in two ways:

1. Insert URL query string placeholders in your manifest's `configurationURL`.

1. Use the [Teams SDK](/javascript/api/overview/msteams-client?view=msteams-client-js-latest&preserve-view=true) `microsoftTeams.getContext((context) =>{})` method.

#### Insert placeholders in the `configurationURL`

Context interface placeholders can be added to your base `configurationUrl`. For example:

##### Base Url

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

After your page uploads, the Teams updates the query string placeholders with the relevant values. You can include logic in your configuration page to retrieve and use those values. For more information on working with URL query strings, see [URLSearchParams](https://developer.mozilla.org/en-US/docs/Web/API/URLSearchParams) in MDN web docs. The following example describes the way to extract a value from the `configurationURL` property:

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

### Use the `getContext()` function to retrieve context

When requested, the `microsoftTeams.getContext((context) => {})` function retrieves the [Context interface](/javascript/api/@microsoft/teams-js/context?view=msteams-client-js-latest&preserve-view=true). You can add this function to your configuration page to retrieve context values:

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

You might require authentication before allowing a user to configure your app. Otherwise, your content might include sources that have their own authentication protocols. For more information, see [Authenticate a user in a Microsoft Teams tab](~/tabs/how-to/authentication/auth-flow-tab.md). Context information can be used to help in constructing the authentication requests and authorization page URLs.
Ensure that all domains used in your tab pages are listed in the `manifest.json` `validDomains` array.

## Modify or remove a tab

Supported removal options can further refine the user experience. You can enable users to modify, reconfigure, or rename a group or channel tab by setting your manifest's `canUpdateConfiguration` property to `true`. Also, you can indicate what happens to the content when a tab is removed. This is done by including a removal options page in your app and setting a value for the `removeUrl` property in the  `setSettings()` configuration (see Mobile clients section). Personal tabs can't be modified but can be uninstalled by the user. For more information, see [Create a removal page for your tab](~/tabs/how-to/create-tab-pages/removal-page.md).

## Mobile clients

If you choose to have your channel or group tab appear on the Teams mobile clients, the `setSettings()` configuration must have a value for the `websiteUrl` property. See [guidance for tabs on mobile](~/tabs/design/tabs-mobile.md).

Microsoft Teams setSettings() configuration for removal page or mobile clients:

```javascript
microsoftTeams.settings.setSettings({
    contentUrl: "add content page URL here",
    entityId: "add unique name here",
    suggestedDisplayName: "add name to display on tab here",
    websiteUrl: "URL REQUIRED FOR MOBILE CLIENTS",
    removeUrl: "ADD REMOVAL PAGE URL HERE"
});
```
