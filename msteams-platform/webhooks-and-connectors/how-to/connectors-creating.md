---
title: Create Office 365 Connectors
author: laujan
description: Describes how to get started with Office 365 Connectors in Microsoft Teams
keywords: teams Office365 connector
ms.localizationpriority: medium
ms.topic: conceptual
ms.date: 06/16/2021
---
# Create Office 365 Connectors

With Microsoft Teams apps, you can add your existing Office 365 Connector or build a new one within Teams. For more information, see [build your own connector](/outlook/actionable-messages/connectors-dev-dashboard#build-your-own-connector).

## Add a connector to Teams app

You can create a [package](~/concepts/build-and-test/apps-package.md) and [publish](~/concepts/deploy-and-publish/apps-publish.md) your connector as part of your AppSource submission. You can distribute your registered connector as part of your Teams app package. For information on entry points for Teams app, see [capabilities](~/concepts/extensibility-points.md). You can also provide the package to users directly for uploading within Teams.

To distribute your connector, register it in the [Connectors Developer Dashboard](https://aka.ms/connectorsdashboard).

For a connector to work only in Microsoft Teams, follow the instructions to submit connector in [publish your app to the Microsoft Teams store](~/concepts/deploy-and-publish/appsource/publish.md) article. Otherwise, a registered connector works in all Office 365 products that support applications, including Outlook and Teams.

> [!IMPORTANT]
> Your connector is registered after you select **Save** in the Connectors Developer Dashboard. If you want to publish your connector in AppSource, follow the instructions in [publish your Microsoft Teams app to AppSource](~/concepts/deploy-and-publish/apps-publish.md). If you do not want to publish your app in AppSource, distribute it directly to the organization. After publishing connectors for your organization, no further action is required on the Connector Dashboard.

### Integrate the configuration experience

Users can complete the entire connector configuration experience without having to leave the Teams client. To get the experience, Teams can embed your configuration page directly within an iframe. The sequence of operations is as follows:

1. The user selects the connector to begin the configuration process.
1. The user interacts with the web experience to complete the configuration.
1. The user selects **Save**, which triggers a callback in code.

    > [!NOTE]
    >
    > * The code can process the save event by retrieving the webhook settings. Your code stores the webhook to post events later.
    > * The configuration experience is loaded inline within Teams.

You can reuse your existing web configuration experience or create a separate version to be hosted specifically in Teams. Your code must include the Microsoft Teams JavaScript SDK. This gives your code access to APIs to perform common operations, such as getting the current user, channel, or team context and initiate authentication flows.

To integrate the configuration experience:

1. Initialize the SDK by calling `microsoftTeams.initialize()`.
1. Call `microsoftTeams.settings.setValidityState(true)` to enable **Save**.

    > [!NOTE]
    > You must call `microsoftTeams.settings.setValidityState(true)` as a response to user selection or field update.

1. Register  `microsoftTeams.settings.registerOnSaveHandler()` event handler, which is called when the user selects **Save**.
1. Call `microsoftTeams.settings.setSettings()` to save the connector settings. The saved settings are also shown in the configuration dialog if the user tries to update an existing configuration for your connector.
1. Call `microsoftTeams.settings.getSettings()` to fetch webhook properties, including the URL.

    > [!NOTE]
    > You must call `microsoftTeams.settings.getSettings()` when your page is first loaded in case of reconfiguration.

1. Register `microsoftTeams.settings.registerOnRemoveHandler()` event handler, which is called when the user removes connector.

This event gives your service an opportunity to perform any cleanup actions.

The following code provides a sample HTML to create a connector configuration page without the customer service and support:

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

To authenticate the user as part of loading your page, see [authentication flow for tabs](~/tabs/how-to/authentication/auth-flow-tab.md) to integrate sign in when your page is embedded.

> [!NOTE]
> Due to cross client compatibility reasons, your code must call `microsoftTeams.authentication.registerAuthenticationHandlers()` with the URL and success or failure callback methods before calling `authenticate()`.

#### `GetSettings` response properties

>[!NOTE]
>The parameters returned by the `getSettings` call are different when you invoke this method from a tab and differ from those documented in [js settings](https://docs.microsoft.com/en-us/javascript/api/@microsoft/teams-js/settings?view=msteams-client-js-latest&preserve-view=true).

The following table provides the parameters and the details of `GetSetting` response properties:

| Parameters   | Details |
|-------------|---------|
| `entityId`       | The entity ID, as set by your code when calling `setSettings()`. |
| `configName`  | The configuration name, as set by your code when calling `setSettings()`. |
| `contentUrl` | The URL of the configuration page, as set by your code when calling `setSettings()`. |
| `webhookUrl` | The webhook URL created for the connector. Use the webhook URL to POST structured JSON to send cards to the channel. The `webhookUrl` is returned only when the application returns data successfully. |
| `appType` | The values returned can be `mail`, `groups`, or `teams` corresponding to the Office 365 Mail, Office 365 Groups, or Microsoft Teams respectively. |
| `userObjectId` | The unique ID corresponding to the Office 365 user who initiated the set up of the connector. It must be secured. This value can be used to associate the user in Office 365, who has set up the configuration in your service. |

#### Handle edits

Your code must handle users who return to edit an existing connector configuration. To do this, call `microsoftTeams.settings.setSettings()` during the initial configuration with the following parameters:

* `entityId` is the custom ID that represents what the user has configured and understood by your service.
* `configName` is a name that configuration code can retrieve.
* `contentUrl` is a custom URL that gets loaded when a user edits an existing connector configuration.

This call is made as part of your save event handler. Then, when the `contentUrl` is loaded, your code must call `getSettings()` to pre populate any settings or forms in your configuration user interface.

#### Handle removals

You can execute an event handler when the user removes an existing connector configuration. You register this handler by calling `microsoftTeams.settings.registerOnRemoveHandler()`. This handler is used to perform cleanup operations, such as removing entries from a database.

### Include the connector in your Manifest

Download the auto generated `Teams app manifest` from the portal. Perform the following steps, before testing or publishing the app:

1. [Include two icons](../../concepts/build-and-test/apps-package.md#app-icons).
1. Modify the `icons` portion of the manifest to include the file names of the icons instead of URLs.

The following manifest.json file contains the elements needed to test and submit the app:

> [!NOTE]
> Replace `id` and `connectorId` in the following example with the GUID of the connector.

#### Example of manifest.json with connector

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
    "full": "This is a small sample app we made for you! This app has samples of all capabilities Microsoft Teams supports.",
    "short": "This is a small sample app we made for you!"
  },
  "icons": {
    "outline": "sampleapp-outline.png",
    "color": "sampleapp-color.png"
  },
  "connectors": [
    {
      "connectorId": "e9343a03-0a5e-4c1f-95a8-263a565505a5",
      "scopes": [
        "team"
      ]
    }
  ],
  "name": {
    "short": "Sample App",
    "full": "Sample App"
  },
  "accentColor": "#FFFFFF",
  "needsIdentity": "true"
}
```

## Test your connector

To test your connector, upload it to a team with any other app. You can create a .zip package using the manifest file from the two icon files and connectors Developer Dashboard, modified as directed in [Include the connector in your Manifest](#include-the-connector-in-your-manifest).

After you upload the app, open the connectors list from any channel. Scroll to the bottom to see your app in the **Uploaded** section:

![Screenshot of an uploaded section in connector dialog box](~/assets/images/connectors/connector_dialog_uploaded.png)

> [!NOTE]
> The flow occurs entirely within Microsoft Teams as a hosted experience.

To verify that `HttpPOST` action is working correctly, [send messages to your connector](~/webhooks-and-connectors/how-to/connectors-using.md).

Follow the [step-by-step guide](../../sbs-teams-connectors.yml) to create and test the connectors in your Microsoft Teams.

## Distribute webhook and connector

1. [Set up an Incoming Webhook](~/webhooks-and-connectors/how-to/add-incoming-webhook.md#create-an-incoming-webhook) directly for your team.

1. Add a [configuration page](~/webhooks-and-connectors/how-to/connectors-creating.md?#integrate-the-configuration-experience) and publish your Incoming Webhook in a Office 365 Connector.

1. Package and publish your connector as part of your [AppSource](~/concepts/deploy-and-publish/office-store-guidance.md) submission.

## Code sample

The following table provides the sample name and its description:

|**Sample name** | **Description** | **.NET** | **Node.js** |
|----------------|------------------|--------|----------------|
| Connectors | Sample Office 365 Connector generating notifications to Teams channel.| [View](https://github.com/OfficeDev/Microsoft-Teams-Samples/tree/main/samples/connector-todo-notification/csharp) | [View](https://github.com/OfficeDev/Microsoft-Teams-Samples/tree/main/samples/connector-github-notification/nodejs)|
| Generic connectors sample |Sample code for a generic connector that is easy to customize for any system that supports webhooks.| | [View](https://github.com/OfficeDev/Microsoft-Teams-Samples/tree/main/samples/connector-generic/nodejs)|

## Step-by-step guide

Follow the [step-by-step guide](../../sbs-teams-connectors.yml) to build and test connector in Teams.

## See also

* [Create and send messages](~/webhooks-and-connectors/how-to/connectors-using.md)
* [Create an Incoming Webhook](~/webhooks-and-connectors/how-to/add-incoming-webhook.md)
* [Create an Office 365 Connector](~/webhooks-and-connectors/how-to/connectors-creating.md)
* [How admins can enable or disable connectors](/MicrosoftTeams/office-365-custom-connectors#enable-or-disable-connectors-in-teams)
* [How admins can publish custom connectors within their org](/MicrosoftTeams/office-365-custom-connectors)
