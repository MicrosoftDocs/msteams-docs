---
title: Create a configuration page
author: surbhigupta
description: Create configuration page to collect information from user. Also, get context data for Microsoft Teams tabs, know about authentication, modify or remove tabs.
ms.localizationpriority: high
ms.topic: conceptual
ms.author: v-npaladugu
ms.date: 01/31/2023
---
# Create a configuration page

A configuration page is a special type of [content page](content-page.md). The users configure some aspects of the Microsoft Teams app using the configuration page and use that configuration as part of the following:

* A channel or group chat tab: Collect information from the users and set the `contentUrl` of the content page to be displayed.
* A [message extension](~/messaging-extensions/what-are-messaging-extensions.md).
* A [connector for Microsoft 365 Groups](~/webhooks-and-connectors/what-are-webhooks-and-connectors.md).

[!INCLUDE [sdk-include](~/includes/sdk-include.md)]

## Configuration page for tabs

The application must refer the [TeamsJS library](/javascript/api/overview/msteams-client#microsoft-teams-javascript-client-library) and call `app.initialize()`. The URLs used must be secured HTTPS endpoints and are available from the cloud.

### Example

An example of a configuration page is shown in the following image:

:::image type="content" source="../../../assets/images/tab-images/configuration-page.png" alt-text="Screenshot shows the configuration page.":::

The following code is an example of corresponding code for the configuration page:

# [TeamsJS v2](#tab/teamsjs-v2)

```html
<head>
    <script src="https://res.cdn.office.net/teams-js/2.2.0/js/MicrosoftTeams.min.js" 
      integrity="sha384yBjE++eHeBPzIg+IKl9OHFqMbSdrzY2S/LW3qeitc5vqXewEYRWegByWzBN/chRh" 
      crossorigin="anonymous" >
    </script>
<body>
    <button onclick="(document.getElementById('icon').src = '/images/iconGray.png'); colorClickGray()">Select Gray</button>
    <img id="icon" src="/images/teamsIcon.png" alt="icon" style="width:100px" />
    <button onclick="(document.getElementById('icon').src = '/images/iconRed.png'); colorClickRed()">Select Red</button>

    <script>
        await microsoftTeams.app.initialize();
        let saveGray = () => {
            microsoftTeams.pages.config.registerOnSaveHandler((saveEvent) => {
                const configPromise = pages.config.setConfig({
                    websiteUrl: "https://example.com",
                    contentUrl: "https://example.com/gray",
                    entityId: "grayIconTab",
                    suggestedDisplayName: "MyNewTab"
                });
                configPromise.
                    then((result) => {saveEvent.notifySuccess()}).
                    catch((error) => {saveEvent.notifyFailure("failure message")});
            });
        }

        let saveRed = () => {
            microsoftTeams.pages.config.registerOnSaveHandler((saveEvent) => {
                const configPromise = pages.config.setConfig({
                    websiteUrl: "https://example.com",
                    contentUrl: "https://example.com/red",
                    entityId: "redIconTab",
                    suggestedDisplayName: "MyNewTab"
                });
                configPromise.
                    then((result) => {saveEvent.notifySuccess();}).
                    catch((error) => {saveEvent.notifyFailure("failure message")});
            });
        }

        let gr = document.getElementById("gray").style;
        let rd = document.getElementById("red").style;

        const colorClickGray = () => {
            gr.display = "block";
            rd.display = "none";
            microsoftTeams.pages.config.setValidityState(true);
            saveGray()
        }

        const colorClickRed = () => {
            rd.display = "block";
            gr.display = "none";
            microsoftTeams.pages.config.setValidityState(true);
            saveRed();
        }
    </script>
    ...
</body>
```

# [TeamsJS v1](#tab/teamsjs-v1)

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
                    websiteUrl: "https://example.com",
                    contentUrl: "https://example.com/gray",
                    entityId: "grayIconTab",
                    suggestedDisplayName: "MyNewTab"
                });
                saveEvent.notifySuccess();
            });
        }
        let saveRed = () => {
            microsoftTeams.settings.registerOnSaveHandler((saveEvent) => {
                microsoftTeams.settings.setSettings({
                    websiteUrl: "https://example.com",
                    contentUrl: "https://exampe.com/red",
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
    ...
</body>
```

***
Choose either **Select Gray** or **Select Red** button in the configuration page, to display the tab content with a gray or red icon.

The following image displays the tab content with **Gray** icon selected:

:::image type="content" source="../../../assets/images/tab-images/configure-tab-with-gray.png" alt-text="Screenshot shows the configure tab with select gray.":::

The following image displays the tab content with **Red** icon selected:

:::image type="content" source="../../../assets/images/tab-images/configure-tab-with-red.png" alt-text="Screenshot shows the configure tab with select red.":::

Choosing the appropriate button triggers either `saveGray()` or `saveRed()`, and invokes the following:

* Set `pages.config.setValidityState(true)` to true.
* The `pages.config.registerOnSaveHandler()` event handler is triggered.
* **Save** on the app's configuration page, is enabled.

The configuration page code informs Teams that the configuration requirements are met and the installation can proceed. When the user selects **Save**, the parameters of `pages.config.setConfig()` are set, as defined by the `Config` interface. For more information, see [config interface](/javascript/api/@microsoft/teams-js/pages.config?). `saveEvent.notifySuccess()` is called to indicate that the content URL has successfully resolved.

>[!NOTE]
>
>* You have 30 seconds to complete the save operation (the callback to `registerOnSaveHandler`) before the timeout. After the timeout, a generic error message appears.
>* If you register a save handler using `registerOnSaveHandler()`, the callback must invoke `saveEvent.notifySuccess()` or `saveEvent.notifyFailure()` to indicate the outcome of the configuration.
>* If you do not register a save handler, the `saveEvent.notifySuccess()` call is made automatically when the user selects **Save**.
>* Ensure to have unique `entityId`. Duplicate `entityId` redirects to the first instance of the tab.

### Get context data for your tab settings

Your tab requires contextual information to display relevant content. Contextual information further enhances your tab's appeal by providing a more customized user experience.

For more information on the properties used for tab configuration, see [context interface](/javascript/api/@microsoft/teams-js/app.context). Collect the values of context data variables in the following two ways:

* Insert URL query string placeholders in `configurationURL`of your [app manifest](../../../resources/schema/manifest-schema.md#configurabletabs).

* Use the [TeamsJS library](/javascript/api/overview/msteams-client#microsoft-teams-javascript-client-library) `app.getContext()` method.

#### Insert placeholders in the `configurationUrl`

Add context interface placeholders to your base `configurationUrl`. For example:

##### Base URL

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

After your page uploads, Teams updates the query string placeholders with relevant values. Include logic in the configuration page to retrieve and use those values. For more information on working with URL query strings, see [URLSearchParams](https://developer.mozilla.org/en-US/docs/Web/API/URLSearchParams) in MDN Web Docs. The following code example provides the way to extract a value from the `configurationUrl` property:

# [TeamsJS v2](#tab/teamsjs-v2)

```html
<script>
   await microsoftTeams.app.initialize();
   const getId = () => {
        let urlParams = new URLSearchParams(document.location.search.substring(1));
        let blueTeamId = urlParams.get('team');
        return blueTeamId
    }
//For testing, you can invoke the following to view the pertinent value:
document.write(getId());
</script>
```

# [TeamsJS v1](#tab/teamsjs-v1)

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

***

### Use the `getContext()` function to retrieve context

The `app.getContext()` function returns a promise that resolves with the [context interface](/javascript/api/@microsoft/teams-js/pages?view=msteams-client-js-latest&preserve-view=true) object.

The following code provides an example of adding this function to the configuration page to retrieve context values:

# [TeamsJS v2](#tab/teamsjs-v2)

```html
<!-- `userPrincipalName` will render in the span with the id "user". -->

<span id="user"></span>
...
<script type="module">
    import {app} from 'https://res.cdn.office.net/teams-js/2.0.0/js/MicrosoftTeams.min.js';
    const contextPromise = app.getContext();
    contextPromise.
        then((context) => {
            let userId = document.getElementById('user');
            userId.innerHTML = context.user.userPrincipalName;
        }).
        catch((error) => {/*Unsuccessful operation*/});
</script>
...
```

# [TeamsJS v1](#tab/teamsjs-v1)

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

***

## Context and authentication

Authenticate before allowing a user to configure your app. Otherwise, your content might include sources that have their authentication protocols. For more information, see [authenticate a user in a Microsoft Teams tab](~/tabs/how-to/authentication/auth-flow-tab.md). Use context information to construct the authentication requests and authorization page URLs. Ensure that all domains used in your tab pages are listed in the `manifest.json` and `validDomains` array.

## Modify or remove a tab

Set your manifest's `canUpdateConfiguration` property to `true`. It enables the users to modify or reconfigure a channel or group tab. You can rename your tab only through Teams user interface. Inform the user about the impact on content when a tab is removed. To do this, include a removal options page in the app, and set a value for the `removeUrl` property in the `setConfig()` (formerly `setSettings()`) configuration. The user can uninstall static tabs but can't modify them. For more information, see [create a removal page for your tab](~/tabs/how-to/create-tab-pages/removal-page.md).

Microsoft Teams `setConfig()` (formerly `setSettings()`) configuration for removal page:

# [TeamsJS v2](#tab/teamsjs-v2)

```javascript
import { pages } from "@microsoft/teams-js";
const configPromise = pages.config.setConfig({
    contentUrl: "add content page URL here",
    entityId: "add a unique identifier here",
    suggestedDisplayName: "add name to display on tab here",
    websiteUrl: "add website URL here //Required field for configurable tabs on Mobile Clients",
    removeUrl: "add removal page URL here"
});
configPromise.
    then((result) => {/*Successful operation*/}).
    catch((error) => {/*Unsuccessful operation*/});
```

# [TeamsJS v1](#tab/teamsjs-v1)

```javascript
microsoftTeams.settings.setSettings({
    contentUrl: "add content page URL here",
    entityId: "add a unique identifier here",
    suggestedDisplayName: "add name to display on tab here",
    websiteUrl: "add website URL here //Required field for configurable tabs on Mobile Clients",
    removeUrl: "add removal page URL here"
});
```

***

## Mobile clients

If you choose to have your channel or group tab appear on the Teams mobile clients, the `setConfig()` configuration must have a value for `websiteUrl`. For more information, see [guidance for tabs on mobile](~/tabs/design/tabs-mobile.md).

## Next step

> [!div class="nextstepaction"]
> [Create a removal page for your tab](~/tabs/how-to/create-tab-pages/removal-page.md)

## See also

* [Build tabs for Teams](../../what-are-tabs.md)
* [Update manifest for SSO and preview app](../authentication/tab-sso-manifest.md)
* [Configure third party OAuth IdP authentication](../authentication/auth-tab-aad.md)
* [Create connectors for Microsoft 365 Groups](../../../webhooks-and-connectors/how-to/connectors-creating.md)
* [Get context for your tab](../access-teams-context.md)
* [Tabs on mobile](../../design/tabs-mobile.md)
