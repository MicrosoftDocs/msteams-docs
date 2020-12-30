---
title: Office 365 Connectors
description: Describes how to get started with Office 365 Connectors in Microsoft Teams
keywords: teams o365 connector
ms.topic: conceptual
ms.date: 04/19/2019
---
# Creating Office 365 Connectors for Microsoft Teams

>With Microsoft Teams apps, you can add your existing Office 365 Connector or build a new one to include in Microsoft Teams. See [Build your own Connector](/outlook/actionable-messages/connectors-dev-dashboard#build-your-own-connector) for more information.

## Adding a Connector to your Teams App

You can distribute your registered Connector as part of your Teams app package. Whether as a standalone solution, or one of several [capabilities](~/concepts/extensibility-points.md) that your experience enables in Teams, you can [package](~/concepts/build-and-test/apps-package.md) and [publish](~/concepts/deploy-and-publish/apps-publish.md) your Connector as part of your AppSource submission, or you can provide it to users directly for uploading within Teams.

To distribute your Connector, you need to register by using the [Connectors Developer Dashboard](https://outlook.office.com/connectors/home/login/#/publish). By default, once a Connector is registered, it's assumed that your Connector will work in all Office 365 products that support them, including Outlook and Teams. If that is _not_ the case and you need to create a Connector that only works in Microsoft Teams, contact us directly at [Microsoft Teams App Submissions](mailto:teamsubm@microsoft.com).

> [!IMPORTANT]
> After you choose **Save** in the Connectors Developer Dashboard, your Connector is registered. If you want to publish your Connector in AppSource, follow the instructions in [Publish your Microsoft Teams app to AppSource](~/concepts/deploy-and-publish/apps-publish.md). If you do not wish to publish your app in AppSource, and rather simply distribute it directly to your organization only, you can do so by [publishing to your organization](#publish-connectors-for-your-organization). If you only want to publish to your organization, no further action is necessary on the Connector dashboard.

### Integrating the configuration experience

Your users will complete the entire Connector configuration experience without having to leave the Teams client. To achieve this experience, Teams will embed your configuration page directly within an iframe. The sequence of operations is as follows:

1. The user clicks on your connector to begin the configuration process.
2. Teams will load your configuration experience in line.
3. The user interacts with your web experience to complete the configuration.
4. The user presses "Save", which triggers a callback in your code.
5. Your code will process the save event by retrieving the webhook settings (documented below). Your code should then store the webhook to post events later.

You can reuse your existing web configuration experience or create a separate version to be hosted specifically in Teams. Your code should:

1. Include the Microsoft Teams JavaScript SDK. This gives your code access to APIs to perform common operations like getting the current user/channel/team context and initiating authentication flows. Initialize the SDK by calling `microsoftTeams.initialize()`.
2. Call `microsoftTeams.settings.setValidityState(true)` when you want to enable the Save button. You should do this as a response to valid user input, such as a selection or field update.
3. Register a `microsoftTeams.settings.registerOnSaveHandler()` event handler, which gets called when the user clicks Save.
4. Call `microsoftTeams.settings.setSettings()` to save the connector settings. What's saved here is also what will be shown in the configuration dialog if the user tries to update an existing configuration for your connector.
5. Call `microsoftTeams.settings.getSettings()` to fetch webhook properties, including the URL itself. You should call this  In addition to during the save event, you should also call this when your page is first loaded in the case of a re-configuration.
6. (Optional) Register a `microsoftTeams.settings.registerOnRemoveHandler()` event handler, which gets called when the user removes your connector. This event gives your service an opportunity to perform any cleanup actions.

Here's a sample HTML to create a Connector configuration page without the CSS.

```html
<h2>Send notifications when tasks are:</h2>
<div class="col-md-8">
    <section id="configSection">
        <form id="configForm">
            <input type="radio" name="notificationType" value="Create" onclick="onClick()"> Created
            <br>
            <br>
            <input type="radio" name="notificationType" value="Update" onclick="onClick()"> Updated
        </form>
    </section>
</div>

<script src="https://statics.teams.microsoft.com/sdk/v1.5.2/js/MicrosoftTeams.min.js" crossorigin="anonymous"></script>
<script src="/Scripts/jquery-1.10.2.js"></script>

<script type="text/javascript">

        function onClick() {
            microsoftTeams.settings.setValidityState(true);
        }

        microsoftTeams.initialize();
        microsoftTeams.settings.registerOnSaveHandler(function (saveEvent) {
            var radios = document.getElementsByName('notificationType');

            var eventType = '';
            if (radios[0].checked) {
                eventType = radios[0].value;
            } else {
                eventType = radios[1].value;
            }

            microsoftTeams.settings.setSettings({
                 entityId: eventType,
                contentUrl: "https://YourSite/Connector/Setup",
                removeUrl:"https://YourSite/Connector/Setup",
                 configName: eventType
                });

            microsoftTeams.settings.getSettings(function (settings) {
                // We get the Webhook URL in settings.webhookUrl which needs to be saved. 
                // This can be used later to send notification.
            });

            saveEvent.notifySuccess();
        });

        microsoftTeams.settings.registerOnRemoveHandler(function (removeEvent) {
            var removeCalled = true;
            alert("Removed" + JSON.stringify(removeEvent));
        });

</script>
```

#### `GetSettings()` response properties

>[!Note]
>The parameters returned by the `getSettings` call here are different than if you were to invoke this method from a tab, and differ from those documented [here](/javascript/api/%40microsoft/teams-js/settings.settings?view=msteams-client-js-latest&preserve-view=true).

| Parameter   | Details |
|-------------|---------|
| `entityId`       | The entity ID, as set by your code when calling `setSettings()`. |
| `configName`  | The configuration name, as set by your code when calling `setSettings()`. |
| `contentUrl` | The URL of the configuration page, as set by your code when calling `setSettings()` |
| `webhookUrl` | The webhook URL created for this connector. Persist the webhook URL and use it to POST structured JSON to send cards to the channel. The `webhookUrl` is returned only when application returns successfully. |
| `appType` | The values returned can be `mail`, `groups` or `teams` corresponding to the Office 365 Mail, Office 365 Groups or Microsoft Teams respectively. |
| `userObjectId` | This is the unique id corresponding to the Office 365 user who initiated setup of the connector. It should be secured. This value can be used to associate the user in Office 365 who set up the configuration to the user in your service. |

If you need to authenticate the user as part of loading your page in step 2 above, refer to [this link](~/tabs/how-to/authentication/auth-flow-tab.md) for details on how you can integrate login when your page is embedded.

> [!NOTE]
> Due to cross-client compatibility reasons, your code will need to call `microsoftTeams.authentication.registerAuthenticationHandlers()` with the URL and success/failure callback methods before calling `authenticate()`.

#### Handling edits

Your code should handle users returning to edit an existing connector configuration. To do this, call `microsoftTeams.settings.setSettings()` during the initial configuration with the following parameters:

- `entityId` is the custom ID that is understood by your service and represents what the user has configured.
- `configName` is a friendly name that your configuration code can retrieve
- `contentUrl` is a custom URL that gets loaded when a user edits an existing connector configuration. You can use this URL to make it easier for your code to handle the edit case.

Typically, this call is made as part of your save event handler. Then, when the `contentUrl` above is loaded, your code should call `getSettings()` to prepopulate any settings or forms in your configuration UI.

#### Handling removals

You can optionally execute an event handler when the user removes an existing connector configuration. You register this handler by calling `microsoftTeams.settings.registerOnRemoveHandler()`. This handler can be used to perform cleanup operations such as removing entries from a database.

### Including the Connector in your Manifest

You can download the auto-generated Teams app manifest from the portal. Before you can use it to test or publish your app, though, you must do the following:

- [Include two icons](../../concepts/build-and-test/apps-package.md#app-icons).
- Modify the `icons` portion of the manifest to refer to the file names of the icons instead of URLs.

The following manifest.json file contains the basic elements needed to test and submit your app.

> [!NOTE]
> Replace `id` and `connectorId` in the following example with the GUID of your Connector.

#### Example manifest.json with Connector

```json
{
  "$schema": "https://developer.microsoft.com/json-schemas/teams/v1.8/MicrosoftTeams.schema.json",
  "manifestVersion": "1.5",
  "id": "e9343a03-0a5e-4c1f-95a8-263a565505a5",
  "version": "1.0",
  "packageName": "com.sampleapp",
  "developer": {
    "name": "Publisher",
    "websiteUrl": "https://www.microsoft.com",
    "privacyUrl": "https://www.microsoft.com",
    "termsOfUseUrl": "https://www.microsoft.com"
  },
  "description": {
    "full": "This is a sample manifest for an app with a connector with an inline configuration experience.",
    "short": "This is a sample manifest for an app with a connector."
  },
  "icons": {
    "outline": "sampleapp-outline.png",
    "color": "sampleapp-color.png"
  },
  "connectors": [
    {
      "connectorId": "e9343a03-0a5e-4c1f-95a8-263a565505a5",
      "configurationUrl": "https://teamstodoappconnectorwithinlineconfig.azurewebsites.net/Connector/Setup",
      "scopes": [
        "team"
      ]
    }
  ],
  "name": {
    "short": "Sample App",
    "full": "Sample App Long Name"
  },
  "accentColor": "#FFFFFF"
}
```

## Testing your Connector

To test your Connector, upload it to a team as you would with any other app. You can create a .zip package using the manifest file from the Connectors Developer Dashboard (modified as directed in the preceding section) and the two icon files.

After you upload the app, open the Connectors list from any channel. Scroll to the bottom to see your app in the **Uploaded** section.

![Screenshot of uploaded section in Connector dialog box](~/assets/images/connectors/connector_dialog_uploaded.png)

You can now launch the configuration experience. Be aware that this flow occurs entirely within Microsoft Teams as a hosted experience.

To verify that an `HttpPOST` action is working correctly, [send messages to your connector](~/webhooks-and-connectors/how-to/connectors-using.md).

## Publish Connectors for your organization

Sometimes, you may not want to publish your connector app to the public AppSource/Store but would like it to be available only to the users in your organization. In such cases, you can upload your custom connector app to your [organization's App Catalog](~/concepts/deploy-and-publish/apps-publish.md). This way, your connector app will be available only to that organization, and you will not need to publish your connector to the public store.

Once you've uploaded your app package, to configure and use the connector in a Team it can be installed from the organization's app catalog by following these steps:

1. Select the apps icon from the far left vertical navigation bar.
1. In the **Apps** window select **Connectors**.
1. Select the connector that you want to add and a pop-up dialog window will display.
1. Select the **Add to a team** bar.
1. In the next dialog window type a team or channel name.
1. Select the **Set up a connector** bar from the bottom right corner of dialog window.
1. The connector will be available in the  section &#9679;&#9679;&#9679; => *More options* => *Connectors* => *All* => *Connectors for you team* for that team. You can navigate by scrolling to this section or search for the connector app.
1. To configure or modify the connector select the **Configure** bar.
