---
title: Create connectors for Microsoft 365 Groups
author: laujan
description: Get started with connectors for Microsoft 365 Groups. Add connector to Teams app in Microsoft Teams. Sample(.NET, Node.js) connector for Microsoft 365 Groups generating notifications to Teams channel.
ms.localizationpriority: medium
ms.topic: conceptual
ms.date: 06/16/2021
---
# Create connectors for Microsoft 365 Groups

With Microsoft Teams apps, you can add your existing connector for Microsoft 365 Groups or build a new one within Teams. For more information, see [build your own connector](/outlook/actionable-messages/connectors-dev-dashboard#build-your-own-connector).

See the following video to learn how to create an connectors for Microsoft 365 Groups:
<br>

> [!VIDEO https://www.microsoft.com/en-us/videoplayer/embed/RE4OIzv]
<br>

[!INCLUDE [sdk-include](~/includes/sdk-include.md)]

## Add a connector to Teams app

You can create a [package](~/concepts/build-and-test/apps-package.md) and [publish](~/concepts/deploy-and-publish/apps-publish.md) your connector as part of your AppSource submission. You can distribute your registered connector as part of your Teams app package. For information on entry points for Teams app, see [capabilities](~/concepts/extensibility-points.md). You can also provide the package directly to the users for uploading within Teams.

To distribute your connector, register it in the [Connectors Developer Dashboard](https://aka.ms/connectorsdashboard).

For a connector to work only in Teams, follow the instructions to submit connector in [publish your app to the Microsoft Teams store](~/concepts/deploy-and-publish/appsource/publish.md) article. Otherwise, a registered connector works in all Microsoft 365 products that support applications, including Outlook and Teams.

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

You can reuse your existing web configuration experience or create a separate version to be hosted specifically in Teams. Your code must include the TeamsJS library. This gives your code access to the APIs to perform common operations, such as getting the current user, channel, or team context, and initiate authentication flows.

To integrate the configuration experience:

> [!NOTE]
> Starting with TeamsJS library v.2.0.0, APIs in the *settings* namespace have been deprecated in favor of equivalent APIs in the *pages* namespace, including `pages.getConfig()` and other APIs in the `pages.config` sub-namespace. For more information, see [What's new in TeamsJS version 2.x.x](../../tabs/how-to/using-teams-client-library.md#whats-new-in-teamsjs-version-2xx).

1. Initialize TeamsJS by calling `app.initialize()`.
1. Call `pages.config.setValidityState(true)` to enable **Save**.

    > [!NOTE]
    > You must call `microsoftTeams.pages.config.setValidityState(true)` as a response to user selection or field update.

1. Register  `microsoftTeams.pages.config.registerOnSaveHandler()` event handler, which is called when the user selects **Save**.
1. Call `microsoftTeams.pages.config.setConfig()` to save the connector settings. The saved settings are also shown in the configuration dialog if the user tries to update an existing configuration for your connector.
1. Call `microsoftTeams.pages.getConfig()` to fetch webhook properties, including the URL.

    > [!NOTE]
    > You must call `microsoftTeams.pages.getConfig()` when your page is first loaded in case of reconfiguration.

1. Register `microsoftTeams.pages.config.registerOnRemoveHandler()` event handler, which is called when the user removes connector.

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

<script src="https://res.cdn.office.net/teams-js/2.2.0/js/MicrosoftTeams.min.js" integrity="sha384-Q2Z9S56exI6Oz/ThvYaV0SUn8j4HwS8BveGPmuwLXe4CvCUEGlL80qSzHMnvGqee" crossorigin="anonymous"></script>
<script src="/Scripts/jquery-1.10.2.js"></script>

<script>
        function onClick() {
            pages.config.setValidityState(true);
        }

        await microsoftTeams.app.initialize();
        pages.config.registerOnSaveHandler(function (saveEvent) {
            var radios = document.getElementsByName('notificationType');

            var eventType = '';
            if (radios[0].checked) {
                eventType = radios[0].value;
            } else {
                eventType = radios[1].value;
            }

            await pages.config.setConfig({
                entityId: eventType,
                contentUrl: "https://YourSite/Connector/Setup",
                removeUrl:"https://YourSite/Connector/Setup",
                configName: eventType
                });

            pages.getConfig().then(async (config) {
                // We get the Webhook URL from config.webhookUrl which needs to be saved. 
                // This can be used later to send notification.
            });

            saveEvent.notifySuccess();
        });

        pages.config.registerOnRemoveHandler(function (removeEvent) {
            alert("Removed" + JSON.stringify(removeEvent));
        });

</script>
```

To authenticate the user as part of loading your page, see [authentication flow for tabs](~/tabs/how-to/authentication/auth-flow-tab.md) to integrate sign in when your page is embedded.

> [!NOTE]
> Prior to TeamsJS v.2.0.0, your code must call `microsoftTeams.authentication.registerAuthenticationHandlers()` with the URL and success or failure callback methods before calling `authenticate()` due to cross-client compatibility reasons. Starting with TeamsJS v.2.0.0, *registerAuthenticationHandlers* has been deprecated in favor of directly calling [authenticate()](/javascript/api/@microsoft/teams-js/authentication#@microsoft-teams-js-authentication-authenticate) with the required authentication parameters.

#### `getConfig` response properties

>[!NOTE]
>The parameters returned by the `getConfig` call are different when you invoke this method from a tab and differ from those documented in the [reference](/javascript/api/@microsoft/teams-js/pages#@microsoft-teams-js-pages-getconfig).

The following table provides the parameters and the details of `getConfig` response properties:

| Parameters   | Details |
|-------------|---------|
| `entityId`       | The entity ID, as set by your code when calling `setConfig()`. |
| `configName`  | The configuration name, as set by your code when calling `setConfig()`. |
| `contentUrl` | The URL of the configuration page, as set by your code when calling `setConfig()`. |
| `webhookUrl` | The webhook URL created for the connector. Use the webhook URL to POST structured JSON to send cards to the channel. The `webhookUrl` is returned only when the application returns data successfully. |
| `appType` | The values returned can be `mail`, `groups`, or `teams` corresponding to the Microsoft 365 Mail, Microsoft 365 Groups, or Teams. respectively. |
| `userObjectId` | The unique ID corresponding to the Microsoft 365 user who initiated the setup of the connector. It must be secured. This value can be used to associate the user in Microsoft 365, who has setup the configuration in your service. |

#### Handle edits

Your code must handle users who return to edit an existing connector configuration. To do this, call `microsoftTeams.pages.config.setConfig()` during the initial configuration with the following parameters:

* `entityId` is the custom ID that represents what the user has configured and understood by your service.
* `configName` is a name that configuration code can retrieve.
* `contentUrl` is a custom URL that gets loaded when a user edits an existing connector configuration.

This call is made as part of your save event handler. Then, when the `contentUrl` is loaded, your code must call `getConfig()` to prepopulate any settings or forms in your configuration user interface.

#### Handle removals

You can execute an event handler when the user removes an existing connector configuration. You register this handler by calling `microsoftTeams.pages.config.registerOnRemoveHandler()`. This handler is used to perform cleanup operations, such as removing entries from a database.

### Include the connector in your manifest

Download the auto-generated *Teams app manifest* from the Developer Portal (<https://dev.teams.microsoft.com>). Perform the following steps, before testing or publishing the app:

1. [Include two icons](../../concepts/build-and-test/apps-package.md#app-icons).
1. Modify the `icons` portion of the manifest to include the file names of the icons instead of URLs.

The following *manifest.json* example contains the elements needed to test and submit the app:

> [!NOTE]
> Replace `id` and `connectorId` in the following example with the GUID of the connector.

#### Example of manifest.json with connector

```json
{
  "$schema": "https://developer.microsoft.com/json-schemas/teams/v1.8/MicrosoftTeams.schema.json",
  "manifestVersion": "1.5",
  "id": "e9343a03-0a5e-4c1f-95a8-263a565505a5",
  "version": "1.0",
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

To test your connector, upload it to a team with any other app. You can create a .zip package using the manifest file from the two icon files and Connectors Developer Dashboard, modified as directed in [Include the connector in your Manifest](#include-the-connector-in-your-manifest).

After you upload the app, open the connectors list from any channel. Scroll to the bottom to see your app in the **Uploaded** section.

:::image type="content" source="../../assets/images/Connectors/connector_dialog_uploaded_1.png" alt-text="Screenshot of an upload section in connector dialog box.":::

> [!NOTE]
> The flow occurs entirely within Teams as a hosted experience.

To verify that `HttpPOST` action is working correctly, [send messages to your connector](~/webhooks-and-connectors/how-to/connectors-using.md).

Follow the [step-by-step guide](../../sbs-teams-connectors.yml) to create and test the connectors in your Teams.

## Distribute webhook and connector

1. [Create Incoming Webhooks](add-incoming-webhook.md#create-incoming-webhooks) directly for your team.

1. Add a [configuration page](~/webhooks-and-connectors/how-to/connectors-creating.md?#integrate-the-configuration-experience) and publish your Incoming Webhook in a connector for Microsoft 365 Groups.

1. Package and publish your connector as part of your [AppSource](~/concepts/deploy-and-publish/office-store-guidance.md) submission.

## Code sample

The following table provides the sample name and its description:

|**Sample name** | **Description** | **.NET** | **Node.js** |
|----------------|------------------|--------|----------------|
| Connector TODO notification |This sample shows a connector for  Microsoft 365 groups, which generates and sends notifications for Teams channel.| [View](https://github.com/OfficeDev/Microsoft-Teams-Samples/tree/main/samples/connector-todo-notification/csharp)| [View](https://github.com/OfficeDev/Microsoft-Teams-Samples/tree/main/samples/connector-todo-notification/nodejs)|
| Generic connectors sample |This sample shows a generic connector that is easy to customize for any system that supports webhooks.| NA| [View](https://github.com/OfficeDev/Microsoft-Teams-Samples/tree/main/samples/connector-generic/nodejs)|

## Step-by-step guide

Follow the [step-by-step guide](../../sbs-teams-connectors.yml) to build and test connector in Teams.

## See also

* [Webhooks and connectors](../what-are-webhooks-and-connectors.md)
* [Create Incoming Webhooks](~/webhooks-and-connectors/how-to/add-incoming-webhook.md)
* [Create Outgoing Webhooks](add-outgoing-webhook.md)
* [Create and send messages](connectors-using.md)
* [How admins can enable or disable connectors](/microsoftteams/office-365-custom-connectors#enable-or-disable-connectors-in-teams)
* [How admins can publish custom connectors within their org](/microsoftteams/office-365-custom-connectors)
* [App manifest schema for Teams](../../resources/schema/manifest-schema.md)
* [getConfig](/javascript/api/@microsoft/teamsfx/teamsfxconfiguration?view=msteams-client-js-latest&preserve-view=true)
