---
title: Extend a Teams message extension across Microsoft 365
description: Learn how to update your search-based message extension to run in Outlook and add Microsoft 365 channel for your bot.
ms.date: 01/31/2023
ms.topic: tutorial
ms.custom: m365apps
ms.localizationpriority: high
---
# Extend a Teams message extension across Microsoft 365

> [!NOTE]
>
> * Microsoft 365 Extensions channel is available only in [public developer preview](../resources/dev-preview/developer-preview-intro.md).
> * If you've connected your message extension bot to an **Outlook** channel, you must to migrate to the **Microsoft 365 Extensions** channel.

Search-based [message extensions](/microsoftteams/platform/messaging-extensions/what-are-messaging-extensions) allow users to search an external system and share results through the compose message area of the Microsoft Teams client. You can now bring production search-based Teams message extensions to preview audiences in Outlook for Windows desktop and outlook.com by [extending your Teams apps across Microsoft 365](overview.md).

The process to update your search-based Teams message extension involves the following steps:

> [!div class="checklist"]
>
> * Update your app manifest.
> * Add the Microsoft 365 Extensions channel for your bot.
> * Sideload your updated app in Teams.

The rest of this guide walks you through these steps and shows how to preview your message extension in Outlook for Windows desktop and web.

## Prerequisites

To complete this tutorial, you need:

* A Microsoft 365 Developer Program sandbox tenant.
* Enrollment in *Microsoft 365 Targeted Releases* for your sandbox tenant.
* A test environment with Microsoft 365 apps installed from the Microsoft 365 Apps *Beta Channel*.
* (Optional) Microsoft Visual Studio Code with the Teams Toolkit extension.

> [!div class="nextstepaction"]
> [Install prerequisites](prerequisites.md)

## Link unfurling

If your search-based message extension supports [link unfurling](../messaging-extensions/how-to/link-unfurling.md) in Teams, completing the steps of this tutorial also enables link unfurling in Outlook on the web and Windows desktop environments. The [Code samples](#code-sample) section below provides a simple link unfurling app for testing.

## Prepare your message extension for the upgrade

If you have an existing message extension in production, make a copy or a branch of your project for testing and update your App ID in the app manifest to use a new identifier (distinct from the production App ID, for testing).

If you'd like to use sample code to complete the full tutorial on updating an existing Teams app, follow the setup steps in [Teams message extension search sample](https://github.com/OfficeDev/Microsoft-Teams-Samples/tree/main/samples/msgext-search/nodejs) to quickly build a Microsoft Teams search-based message extension.

Alternately, you can use the ready-made Outlook-enabled app in the following section and skip the [*Update the app manifest*](#update-the-app-manifest) portion of this tutorial.

### Quickstart

To start with a [sample message extension](https://github.com/OfficeDev/TeamsFx-Samples/tree/ga/NPM-search-connector-M365) that's already enabled to run in Outlook, use Teams Toolkit extension for Visual Studio Code.

1. From Visual Studio Code, open the command palette (`Ctrl+Shift+P`), type `Teams: Create a new app`.
1. Select **Create a new Teams app** option.
1. Select **Search-based message extension** to download the sample code for a Teams message extension using the latest Teams app manifest. For more information, see [Teams developer manifest](../resources/schema/manifest-schema.md).

    :::image type="content" source="images/toolkit-palatte-search-sample.png" alt-text="The screenshot is an example that shows the Type 'Create a new Teams app' VS Code command palette to list Teams sample options.":::

    The sample is also available as *NPM Search Connector* in the Teams Toolkit Samples gallery. From the Teams Toolkit pane, select *Development* > *View samples* > **NPM Search Connector**.

    :::image type="content" source="images/toolkit-search-sample.png" alt-text="The screenshot is an example that shows the NPM Search Connector sample in Teams Toolkit Samples gallery.":::

1. Select preferred programming language.
1. Select a location on your local machine for the workspace folder and enter your application name.
1. Open the command palette (`Ctrl+Shift+P`) and type `Teams: Provision in the cloud` to create the required app resources (Azure App Service, App Service plan, Azure Bot, and Managed Identity) in your Azure account.
1. Select a subscription and a resource group.
1. Select **Provision**.
1. Open the command palette (`Ctrl+Shift+P`) and type `Teams: Deploy to the cloud` to deploy the sample code to the provisioned resources in Azure and start the app.
1. Select **Deploy**.

From here, you can skip ahead to [Add Microsoft 365 Extensions channel for your bot](#add-microsoft-365-extensions-channel-for-your-bot) to complete the final step of enabling the Teams message extension to work in Outlook. (The app manifest is already referencing the correct version, so no updates are necessary).

## Update the app manifest

You need to use the Teams developer manifest schema version `1.13` (or higher) to enable your Teams message extension to run in Outlook. For more information on schema version, see [Teams developer manifest](../resources/schema/manifest-schema.md).

You have two options for updating your app manifest:

# [Teams Toolkit](#tab/manifest-teams-toolkit)

1. Open the command palette: `Ctrl+Shift+P`.
1. Run the `Teams: Upgrade Teams manifest` command and select your app manifest file. Changes will be made in place.

# [Manual steps](#tab/manifest-manual)

Open your Teams app manifest and update the `$schema` and `manifestVersion` with the following values:

```json
{
    "$schema" : "https://developer.microsoft.com/json-schemas/teams/v1.14/MicrosoftTeams.schema.json",
    "manifestVersion" : "1.14"
}
```

---

If you used Teams Toolkit to create your message extension app, you can use it to validate the changes to your manifest file and identify any errors. Open the command palette (`Ctrl+Shift+P`) and find **Teams: Validate manifest file**.

## Add Microsoft 365 extensions channel for your bot

In Microsoft Teams, a message extension consists of a web service that you host and an app manifest, which defines where your web service is hosted. The web service takes advantage of the [Bot Framework SDK](/azure/bot-service/bot-service-overview) messaging schema and secure communication protocol through a Teams channel registered for your bot.

For users to interact with your message extension from Outlook, you need to add Microsoft 365 Extensions channel to your bot:

1. From [Microsoft Azure portal](https://portal.azure.com) (or [Bot Framework portal](https://dev.botframework.com) if you previously registered there), go to your bot resource.

1. From *Settings*, select **Channels**.

1. Under *Available channels*, select **Microsoft 365 Extensions (Preview)** channel.

    :::image type="content" source="../assets/images/azure-bot-channel-message-extensions.png" alt-text="The screenshot is an example that shows the Microsoft 365 Extensions (Preview) channel for your bot from the Azure Bot Channels pane.":::

1. Select **Apply**.

    :::image type="content" source="../assets/images/azure-bot-channel-message-extensions-apply.png" alt-text="The screenshot is an example that shows the Microsoft 365  'Message Extensions' channel for your bot from the Azure Bot Channels pane.":::

1. Confirm that your Microsoft 365 Extensions channel is listed along with Teams in your bot's **Channels** pane.

## Update Microsoft Azure Active Directory (Azure AD) app registration for SSO

> [!NOTE]
> You can skip this step if you're using the [sample app](#quickstart) provided in this tutorial, as the scenario doesn't involve Azure Active Directory (AAD) single sign-on authentication.

Azure Active Directory (AD) single sign-on (SSO) for message extensions works the same way in Outlook [as it does in Teams](/microsoftteams/platform/bots/how-to/authentication/auth-aad-sso-bots). However, you need to add several client application identifiers to the Azure AD app registration of your bot in your tenant's *App registrations* portal.

1. Sign in to [Azure portal](https://portal.azure.com) with your sandbox tenant account.
1. Open **App registrations**.
1. Select the name of your application to open its app registration.
1. Select  **Expose an API** (under *Manage*).
1. In the **Authorized client applications** section, ensure all of the following `Client Id` values are listed:

   |Microsoft 365 client application | Client ID |
   |--|--|
   |Teams desktop and mobile |1fec8e78-bce4-4aaf-ab1b-5451cc387264 |
   |Teams web |5e3ce6c0-2b1f-4285-8d4b-75ee78787346 |
   |Outlook desktop | d3590ed6-52b3-4102-aeff-aad2292ab01c |
   |Outlook Web Access | 00000002-0000-0ff1-ce00-000000000000 |
   |Outlook Web Access | bc59ab01-8403-45c6-8796-ac3ef710b3e3 |

## Sideload your updated message extension in Teams

The final step is to sideload your updated message extension ([app package](/microsoftteams/platform/concepts/build-and-test/apps-package)) into Teams. After you complete, message extension appears in your installed *Apps* from the compose message area.

1. Package your Teams application (manifest and app [icons](/microsoftteams/platform/resources/schema/manifest-schema#icons)) in a zip file. If you used Teams Toolkit to create your app, you can easily do this using the **Zip Teams metadata package** option in the *Deployment* menu of Teams Toolkit.

    :::image type="content" source="images/toolkit-zip-teams-metadata-package.png" alt-text="The screenshot is an example that shows 'Zip Teams metadata package' option in Teams Toolkit extension for Visual Studio Code.":::

1. Go to **Microsoft Teams** and sign in using your sandbox tenant account.

1. Select **Apps** to open the **Manage your apps** pane. Then select **Upload an app**.

    :::image type="content" source="../assets/images/teams-manage-your-apps.png" alt-text="The screenshot is an example that shows the 'Upload an app' option.":::

1. Choose **Upload a customized app** option, select your app package, and install (*Add*) it to your Teams client.

    :::image type="content" source="../assets/images/teams-upload-custom-app.png" alt-text="The screenshot is an example that shows the 'Upload a customized app' option in Teams.":::

After it's sideloaded through Teams, your message extension is available in Outlook for Windows desktop and web.

## Preview your message extension in Outlook

Here's how to test your message extension running in Outlook on Windows desktop and the web.

### Outlook on the web

To preview your app running in Outlook on the web:

1. Sign in to [outlook.com](https://www.outlook.com) using your test tenant credentials.
1. Select **New message**.
1. Open **More apps** flyout menu on the bottom of the composition window.

    :::image type="content" source="images/outlook-web-compose-more-apps.png" alt-text="The screenshot is an example that shows the 'More apps' menu on the bottom of the mail composition window to use your message extension.":::

Your message extension is listed. You can invoke it from there and use it just as you would while composing a message in Teams.

### Outlook

To preview your app running in Outlook on Windows desktop:

1. Launch Outlook and sign in with your test tenant credentials.
1. Select **New Email**.
1. Open the **More Apps** flyout menu on the top ribbon.

    :::image type="content" source="images/outlook-desktop-compose-more-apps.png" alt-text="The screenshot is an example that shows the 'More Apps' on the composition window ribbon to use your message extension.":::

Your message extension is listed, it opens an adjacent pane to display search results.

## Troubleshooting

 While your updated message extension will continue to run in Teams with full [feature support for message extensions](/microsoftteams/platform/messaging-extensions/what-are-messaging-extensions), there are limitations in this early preview of the Outlook-enabled experience to be aware of:

* Message extensions in Outlook are limited to the mail [*compose* context](/microsoftteams/platform/resources/schema/manifest-schema#composeextensions). Even if your Teams message extension includes `commandBox` as a *context* in its manifest, the current preview is limited to the mail composition (`compose`) option. Invoking a message extension from the global Outlook *Search* box isn't supported.
* [Action-based message extension](/microsoftteams/platform/messaging-extensions/how-to/action-commands/define-action-command?tabs=AS) commands aren't supported in Outlook. If your app has both search- and action-based commands, it will surface in Outlook, but the action menu won't be available.
* Insertion of more than five [Adaptive Cards](/microsoftteams/platform/task-modules-and-cards/cards/design-effective-cards?tabs=design) in an email isn't supported; Adaptive Cards v1.5 and later aren't supported.
* [Card actions](/microsoftteams/platform/task-modules-and-cards/cards/cards-actions?tabs=json) of type `messageBack`, `imBack`, `invoke`, and `signin` aren't supported for inserted cards. Support is limited to `openURL`: when selected, the user is redirected to the specified URL in a new tab.

Use the [Microsoft Teams developer community channels](/microsoftteams/platform/feedback) to report issues and provide feedback.

### Debugging

As you test your message extension, you can identify the source (originating from Teams versus Outlook) of bot requests by the [channelId](https://github.com/Microsoft/botframework-sdk/blob/main/specs/botframework-activity/botframework-activity.md#channel-id) of the [Activity](https://github.com/Microsoft/botframework-sdk/blob/main/specs/botframework-activity/botframework-activity.md) object. When a user performs a query, your service receives a standard Bot Framework `Activity` object. One of the properties in the Activity object is `channelId`, which will have the value of `msteams` or `outlook`, depending on where the bot request originates. For more information, see [search based message extensions SDK](/microsoftteams/platform/resources/messaging-extension-v3/search-extensions).

## Code sample

| **Sample Name** | **Description** | **Node.js** |
|---------------|--------------|--------|
| NPM Search Connector | Use Teams Toolkit to build a message extension app. Works in Teams, Outlook. |  [View](https://github.com/OfficeDev/TeamsFx-Samples/tree/ga/NPM-search-connector-M365) |
| Teams Link Unfurling | Simple Teams app to demonstrate link unfurling. Works in Teams, Outlook. | [View](https://github.com/OfficeDev/Microsoft-Teams-Samples/tree/main/samples/msgext-link-unfurling/nodejs)

## Next step

Publish your app to be discoverable in Teams, Outlook, and Microsoft 365 app:

> [!div class="nextstepaction"]
> [Publish Teams apps for Outlook and Microsoft 365 app](publish.md)
