---
title: Add Office 365 Connectors
description: Describes how to get started with Office 365 Connectors in Microsoft Teams
keywords: teams o365 connector
localization_priority: Normal
ms.topic: conceptual
ms.date: 04/19/2019
---
# Create Office 365 Connectors for Microsoft Teams

With Microsoft Teams apps, you can add your existing Office 365 Connector or build a new one to include in Microsoft Teams. For more information, see [build your own Connector](/outlook/actionable-messages/connectors-dev-dashboard#build-your-own-connector).

> [!VIDEO https://www.youtube-nocookie.com/embed/9qcwzVFppMg]

## Add a Connector to your Teams App

You can distribute your registered Connector as part of your Teams app package. For a standalone solution or one of several [capabilities](~/concepts/extensibility-points.md) that your experience enables in Teams, you can [package](~/concepts/build-and-test/apps-package.md) and [publish](~/concepts/deploy-and-publish/apps-publish.md) your Connector as part of your AppSource submission. You can also provide it to users directly for uploading within Teams.

To distribute your Connector, you need to register by using the [Connectors Developer Dashboard](https://outlook.office.com/connectors/home/login/#/publish). By default, when a Connector is registered, it is assumed that your Connector works in all Office 365 products that support them, including Outlook and Teams. If that is not the case and you need to create a Connector that only works in Microsoft Teams, contact us directly at [Microsoft Teams App Submissions](mailto:teamsubm@microsoft.com).

> [!IMPORTANT]
> Your Connector is registered after you choose **Save** in the Connectors Developer Dashboard. If you want to publish your Connector in AppSource, follow the instructions in [publish your Microsoft Teams app to AppSource](~/concepts/deploy-and-publish/apps-publish.md). If you do not want to publish your app in AppSource, distribute it directly to your organization. You can do so by [publishing to your organization](#publish-connectors-for-your-organization). If you only want to publish to your organization, no further action is necessary on the Connector Dashboard.

### Integrate the configuration experience

Your users can complete the entire Connector configuration experience without having to leave the Teams client. To get the experience, Teams can embed your configuration page directly within an iframe. The sequence of operations is as follows:

* The user selects your connector to begin the configuration process.
* Your configuration experience is loaded in line within Teams.
* The user interacts with your web experience to complete the configuration.
* The user selects **Save**, which triggers a callback in your code.
* Your code can process the save event by retrieving the webhook settings. Your code stores the webhook to post events later.

You can reuse your existing web configuration experience or create a separate version to be hosted specifically in Teams. Your code must:

1. Include the Microsoft Teams JavaScript SDK. This gives your code access to APIs to perform common operations like getting the current user, channel, or team context and initiating authentication flows. Initialize the SDK by calling `microsoftTeams.initialize()`.
2. Call `microsoftTeams.settings.setValidityState(true)` when you want to enable the **Save** button. You must do this as a response to valid user input, such as a selection or field update.
3. Register a `microsoftTeams.settings.registerOnSaveHandler()` event handler, which is called when the user selects **Save**.
4. Call `microsoftTeams.settings.setSettings()` to save the connector settings. The saved settings are also shown in the configuration dialog if the user tries to update an existing configuration for your connector.
5. Call `microsoftTeams.settings.getSettings()` to fetch webhook properties, including the URL. You must call this during the save event and when your page is first loaded in case of a re-configuration.
6. Optionally, register a `microsoftTeams.settings.registerOnRemoveHandler()` event handler, which is called when the user removes your connector. This event gives your service an opportunity to perform any cleanup actions.

Following code provides a sample HTML to create a Connector configuration page without the CSS:

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
            alert("Removed" + JSON.stringify(removeEvent));
        });

</script>
```

#### `GetSettings` response properties

>[!NOTE]
>The parameters returned by the `getSettings` call here are different when you invoke this method from a tab, and differ from those documented [here](/javascript/api/%40microsoft/teams-js/settings.settings?view=msteams-client-js-latest&preserve-view=true).

| Parameter   | Details |
|-------------|---------|
| `entityId`       | The entity ID, as set by your code when calling `setSettings()`. |
| `configName`  | The configuration name, as set by your code when calling `setSettings()`. |
| `contentUrl` | The URL of the configuration page, as set by your code when calling `setSettings()`. |
| `webhookUrl` | The webhook URL created for this connector. Use the webhook URL to POST structured JSON to send cards to the channel. The `webhookUrl` is returned only when application returns data successfully. |
| `appType` | The values returned can be `mail`, `groups`, or `teams` corresponding to the Office 365 Mail, Office 365 Groups, or Microsoft Teams respectively. |
| `userObjectId` | This is the unique ID corresponding to the Office 365 user who initiated setup of the connector. It must be secured. This value can be used to associate the user in Office 365, who has set up the configuration for the user in your service. |

If you need to authenticate the user as part of loading your page in step 2, see [authentication flow for tabs](~/tabs/how-to/authentication/auth-flow-tab.md) to integrate sign in when your page is embedded.

> [!NOTE]
> Due to cross-client compatibility reasons, your code must call `microsoftTeams.authentication.registerAuthenticationHandlers()` with the URL and success or failure callback methods before calling `authenticate()`.

#### Handle edits

Your code must handle users who return to edit an existing connector configuration. To do this, call `microsoftTeams.settings.setSettings()` during the initial configuration with the following parameters:

- `entityId` is the custom ID that represents what the user has configured and is understood by your service.
- `configName` is a friendly name that your configuration code can retrieve.
- `contentUrl` is a custom URL that gets loaded when a user edits an existing connector configuration. You can use this URL to make it easier for your code to handle the edit case.

Typically, this call is made as part of your save event handler. Then, when the `contentUrl` is loaded, your code must call `getSettings()` to pre-populate any settings or forms in your configuration user interface (UI).

#### Handle removals

Optionally, you can execute an event handler when the user removes an existing connector configuration. You register this handler by calling `microsoftTeams.settings.registerOnRemoveHandler()`. This handler can be used to perform cleanup operations such as removing entries from a database.

### Include the Connector in your Manifest

You can download the auto-generated Teams app manifest from the portal. Before you use the connector to test or publish your app, you must do the following:

* [Include two icons](../../concepts/build-and-test/apps-package.md#app-icons).
* Modify the `icons` portion of the manifest to include the file names of the icons instead of URLs.

The following manifest.json file contains the basic elements needed to test and submit your app:

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

## Test your Connector

To test your Connector, upload it to a team with any other app. You can create a .zip package using the manifest file from the Connectors Developer Dashboard modified as directed in the preceding section and the two icon files.

After you upload the app, open the Connectors list from any channel. Scroll to the bottom to see your app in the **Uploaded** section.

![Screenshot of uploaded section in Connector dialog box](~/assets/images/connectors/connector_dialog_uploaded.png)

You can now launch the configuration experience. Be aware that this flow occurs entirely within Microsoft Teams as a hosted experience.

To verify that an `HttpPOST` action is working correctly, [send messages to your connector](~/webhooks-and-connectors/how-to/connectors-using.md).

## Publish Connectors for your organization

If you do not want to publish your connector app to the public AppSource or Store but want it to be available only to the users in your organization. In such cases, you can upload your custom connector app to your [organization's App Catalog](~/concepts/deploy-and-publish/apps-publish.md). This way, your connector app is available only to that organization and you must not publish your connector to the public store.

After you have uploaded your app package to configure and use the connector in a team, it can be installed from the organization's app catalog by following these steps:

1. Select **Apps** from the left navigation bar.
1. In the **Apps** section, select **Connectors**.
1. Select the connector that you want to add. A pop-up dialog window is displayed.
1. From the drop-down menu, select **Add to a team**.
1. In the search box, type a team or channel name.
1. Select **Set up a connector** from the drop-down menu in the bottom right corner of the dialog window.
1. The connector is available in the section &#9679;&#9679;&#9679; > **More options** > **Connectors** > **All** > **Connectors for your team** for that team. You can navigate by scrolling to this section or search for the connector app.
1. To configure or modify the connector, select **Configure**.

## Code sample

|**Sample name** | **Description** | **.NET** | **Node.js** |
|----------------|------------------|--------|----------------|
| Connectors	| Sample Office 365 Connector generating notifications to Teams channel.|	[View](https://github.com/OfficeDev/Microsoft-Teams-Samples/tree/main/samples/connector-todo-notification/csharp) |	[View](https://github.com/OfficeDev/Microsoft-Teams-Samples/tree/main/samples/connector-github-notification/nodejs)|
| Generic connectors sample |Sample code for a generic connector that is easy to customize for any system that supports webhooks.|	| [View](https://github.com/OfficeDev/Microsoft-Teams-Samples/tree/main/samples/connector-generic/nodejs)|
