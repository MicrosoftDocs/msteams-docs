---
title: Extend a Teams message extension across Microsoft 365
description: In this learning path, you'll learn how to update your search-based Teams message extension to run in Outlook.
ms.date: 05/24/2022
ms.topic: tutorial
ms.custom: m365apps
ms.localizationpriority: high
---
# Extend a Teams message extension across Microsoft 365

Search-based [message extensions](/microsoftteams/platform/messaging-extensions/what-are-messaging-extensions) allow users to search an external system and share results through the compose message area of the Microsoft Teams client. By [extending your Teams apps across Microsoft 365](overview.md), you can now bring production search-based Teams message extensions to preview audiences in Outlook for Windows desktop and outlook.com.

The process to update your search-based Teams message extension to run Outlook involves these steps:

> [!div class="checklist"]
>
> * Update your app manifest
> * Add an Outlook channel for your bot
> * Sideload your updated app in Teams

The rest of this guide will walk you through these steps and show you how to preview your message extension in both Outlook for Windows desktop and outlook.com.

## Prerequisites

To complete this tutorial, you'll need:

* A Microsoft 365 Developer Program sandbox tenant
* Enrollment in *Office 365 Targeted Releases* for your sandbox tenant
* A test environment with Office apps installed from the Microsoft 365 Apps *Beta Channel*
* (Optional) Microsoft Visual Studio Code with the Teams Toolkit extension

> [!div class="nextstepaction"]
> [Publish Teams apps extended for Microsoft 365](publish.md)

## Prepare your message extension for the upgrade

If you have an existing message extension in production, make a copy or a branch of your project for testing and update your App ID in the app manifest to use a new identifier (distinct from the production App ID, for testing).

If you'd like to use sample code to complete the full tutorial on updating an existing Teams app, follow the setup steps in [Teams message extension search sample](https://github.com/microsoft/BotBuilder-Samples/tree/main/samples/javascript_nodejs/50.teams-messaging-extensions-search) to quickly build a Microsoft Teams search-based message extension.

Alternately, you can use the ready-made Outlook-enabled app in the following section and skip the [*Update the app manifest*](#update-the-app-manifest) portion of this tutorial.

### Quickstart

To start with a [sample message extension](https://github.com/OfficeDev/TeamsFx-Samples/tree/ga/NPM-search-connector-M365) that's already enabled to run in Outlook, use Teams Toolkit extension for Visual Studio Code.

1. From Visual Studio Code, open the command palette (`Ctrl+Shift+P`), type `Teams: Create a new Teams app`.
1. Select **Create a new Teams app** option.
1. Select **Search-based message extension** to download sample code for a Teams message extension using the latest Teams app manifest (version `1.13`).

    :::image type="content" source="images/toolkit-palatte-search-sample.png" alt-text="Type 'Create a new Teams app' VS Code command palette to list Teams sample options":::

    The sample is also available as *NPM Search Connector* in the Teams Toolkit Samples gallery. From the Teams Toolkit pane, select *Development* > *View samples* > **NPM Search Connector**.

    :::image type="content" source="images/toolkit-search-sample.png" alt-text="NPM Search Connector sample in Teams Toolkit Samples gallery":::

1. Select a location on your local machine for the workspace folder.
1. Open the command palette (`Ctrl+Shift+P`) and type `Teams: Provision in the cloud` to create the required app resources (Azure App Service, App Service plan, Azure Bot, and Managed Identity) in your Azure account.
1. Open the command palette (`Ctrl+Shift+P`) and type `Teams: Deploy to the cloud` to deploy the sample code to the provisioned resources in Azure and start the app.

From here, you can skip ahead to [Add an Outlook channel for your bot](#add-an-outlook-channel-for-your-bot) to complete the final step of enabling the Teams message extension to work in Outlook. (The app manifest is already referencing the correct version, so no updates are necessary.)

## Update the app manifest

You'll need to use the [Teams developer manifest](../resources/schema/manifest-schema.md) schema version `1.13` to enable your Teams message extension to run in Outlook.

You have two options for updating your app manifest:

# [Teams Toolkit](#tab/manifest-teams-toolkit)

1. Open the command palette: `Ctrl+Shift+P`.
1. Run the `Teams: Upgrade Teams manifest` command and select your app manifest file. Changes will be made in place.

# [Manual steps](#tab/manifest-manual)

Open your Teams app manifest and update the `$schema` and `manifestVersion` with the following values:

```json
{
    "$schema" : "https://developer.microsoft.com/json-schemas/teams/v1.13/MicrosoftTeams.schema.json",
    "manifestVersion" : "1.13"
}
```

---

If you used Teams Toolkit to create your message extension app, you can use it to validate the changes to your manifest file and identify any errors. Open the command palette `Ctrl+Shift+P` and find **Teams: Validate manifest file**.

## Add an Outlook channel for your bot

In Microsoft Teams, a message extension consists of a web service that you host and an app manifest, which defines where your web service is hosted. The web service takes advantage of the [Bot Framework SDK](/azure/bot-service/bot-service-overview) messaging schema and secure communication protocol through a Teams channel registered for your bot.

For users to interact with your message extension from Outlook, you'll need to add an Outlook channel to your bot:

1. From [Microsoft Azure portal](https://portal.azure.com) (or [Bot Framework portal](https://dev.botframework.com) if you previously registered there), navigate to your bot resource.

1. From *Settings*, select **Channels**.

1. Under *Available channels*, select **Outlook**. Select the **Message extensions** tab, then **Apply**.

    :::image type="content" source="images/azure-bot-channel-message-extensions.png" alt-text="Add an Outlook 'Message Extensions' channel for your bot from the Azure Bot Channels pane":::

1. Confirm that your Outlook channel is listed along with Microsoft Teams in your bot's **Channels** pane.

    :::image type="content" source="images/azure-bot-channels.png" alt-text="Azure Bot Channels pane listing both Microsoft Teams and Outlook channels":::

## Update Microsoft Azure Active Directory (Azure AD) app registration for SSO

> [!NOTE]
> You can skip the step if you're using the [sample app](#quickstart) provided in this tutorial, as the scenario doesn't involve Azure Active Directory (AAD) Single Sign-On authentication.

Azure Active Directory (AD) Single-sign on (SSO) for message extensions works the same way in Outlook [as it does in Teams](/microsoftteams/platform/bots/how-to/authentication/auth-aad-sso-bots). However you need to add several client application identifiers to the Azure AD app registration of your bot in your tenant's *App registrations* portal.

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

The final step is to sideload your updated message extension ([app package](/microsoftteams/platform/concepts/build-and-test/apps-package)) in Microsoft Teams. Once completed, your message extension will appear in your installed *Apps* from the compose message area.

1. Package your Teams application (manifest and app [icons](/microsoftteams/platform/resources/schema/manifest-schema#icons)) in a zip file. If you used Teams Toolkit to create your app, you can easily do this using the **Zip Teams metadata package** option in the *Deployment* menu of Teams Toolkit.

    :::image type="content" source="images/toolkit-zip-teams-metadata-package.png" alt-text="'Zip Teams metadata package' option in Teams Toolkit extension for Visual Studio Code":::

1. Sign in to Teams with your sandbox tenant account, and toggle into  *Developer Preview* mode. Select the ellipsis (**...**) menu by your user profile, then select: **About** > **Developer preview**.

    :::image type="content" source="images/teams-dev-preview.png" alt-text="From Teams ellipses menu, open 'About', and select 'Developer Preview' option":::

1. Select **Apps** to open the **Manage your apps** pane. Then select **Publish an app**.

    :::image type="content" source="images/teams-manage-your-apps.png" alt-text="Open the 'Manage your apps' pane and select 'Publish an app'":::

1. Choose **Upload a custom app** option, select your app package, and install (*Add*) it to your Teams client.

    :::image type="content" source="images/teams-upload-custom-app.png" alt-text="'Upload a custom app' option in Teams":::

After it's sideloaded through Teams, your message extension will be available in outlook.com and Outlook for Windows desktop.

## Preview your message extension in Outlook

Here's how to test your message extension running in Outlook on Windows desktop and the web.

### Outlook on the web

To preview your app running in Outlook on the web:

1. Sign in to [outlook.com](https://www.outlook.com) using credentials for your test tenant.
1. Select **New message**.
1. Open **More apps** flyout menu on the bottom of the composition window.

    :::image type="content" source="images/outlook-web-compose-more-apps.png" alt-text="Click on the 'More apps' menu on the bottom of the mail composition window to use your message extension":::

Your message extension is listed. You can invoke it from there and use it just as you would while composing a message in Teams.

### Outlook

To preview your app running in Outlook on Windows desktop:

1. Launch Outlook logged in with credentials for your test tenant.
1. Select **New Email**.
1. Open the **More Apps** flyout menu on the top ribbon.

    :::image type="content" source="images/outlook-desktop-compose-more-apps.png" alt-text="Click on 'More Apps' on the composition window ribbon to use your message extension":::

Your message extension is listed, it opens an adjacent pane to display search results.

## Troubleshooting

 While your updated message extension will continue to run in Teams with full [feature support for message extensions](/microsoftteams/platform/messaging-extensions/what-are-messaging-extensions), there are limitations in this early preview of the Outlook-enabled experience to be aware of:

* Message extensions in Outlook are limited to the mail [*compose* context](/microsoftteams/platform/resources/schema/manifest-schema#composeextensions). Even if your Teams message extension includes `commandBox` as a *context* in its manifest, the current preview is limited to the mail composition (`compose`) option. Invoking a message extension from the global Outlook *Search* box isn't supported.
* [Action-based message extension](/microsoftteams/platform/messaging-extensions/how-to/action-commands/define-action-command?tabs=AS) command aren't supported in Outlook. If your app has both search- and action-based commands, it will surface in Outlook but the action menu won't be available.
* Insertion of more than five [Adaptive Cards](/microsoftteams/platform/task-modules-and-cards/cards/design-effective-cards?tabs=design) in an email isn't supported; Adaptive Cards v1.4 and later aren't supported.
* [Card actions](/microsoftteams/platform/task-modules-and-cards/cards/cards-actions?tabs=json) of type `messageBack`, `imBack`, `invoke`, and `signin` aren't supported for inserted cards. Support is limited to `openURL`: on click, the user will be redirected to the specified URL in a new tab.

Use the [Microsoft Teams developer community channels](/microsoftteams/platform/feedback) to report issues and provide feedback.

### Debugging

As you test your message extension, you can identify the source (originating from Teams versus Outlook) of bot requests by the [channelId](https://github.com/Microsoft/botframework-sdk/blob/main/specs/botframework-activity/botframework-activity.md#channel-id) of the [Activity](https://github.com/Microsoft/botframework-sdk/blob/main/specs/botframework-activity/botframework-activity.md) object. When a user performs a query, your service receives a standard Bot Framework `Activity` object. One of the properties in the Activity object is `channelId`, which will have the value of `msteams` or `outlook`, depending from where the bot request originates. For more information, see  [Search based message extensions SDK](/microsoftteams/platform/resources/messaging-extension-v3/search-extensions).

## Code sample

| **Sample Name** | **Description** | **Node.js** |
|---------------|--------------|--------|
| NPM Search Connector | Use Teams Toolkit to build a message extension app. Works in Teams, Outlook. |  [View](https://github.com/OfficeDev/TeamsFx-Samples/tree/ga/NPM-search-connector-M365) |

## Next step

Publish your app to be discoverable in Teams, Outlook, and Office:

> [!div class="nextstepaction"]
> [Publish Teams apps for Outlook and Office](publish.md)
