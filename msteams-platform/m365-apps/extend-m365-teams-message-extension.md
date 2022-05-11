---
title: Extend a Teams message extension across Microsoft 365
description: Here's how to update your search-based Teams message extension to run in Outlook
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
* Microsoft Visual Studio Code with the Teams Toolkit extension (Optional)

> [!div class="nextstepaction"]
> [Install prerequisites](prerequisites.md)

## Prepare your message extension for the upgrade

If you have an existing message extension in production, make a copy or a branch of your project for testing and update your App ID in the app manifest to use a new identifier (distinct from the production App ID).

If you'd like to use sample code to complete this tutorial on updating an existing Teams app, follow the setup steps in [Teams message extension search sample](https://github.com/microsoft/BotBuilder-Samples/tree/main/samples/javascript_nodejs/50.teams-messaging-extensions-search) to quickly build a Microsoft Teams search-based message extension. Alternately, use the ready-made Outlook-enabled app in the following *Quickstart* section to skip the [*Update the app manifest*](#update-the-appmanifest) portion of this tutorial.

### Quickstart

You can use the Teams Toolkit extension for Visual Studio Code to start with a [sample Teams message extension](https://github.com/OfficeDev/TeamsFx-Samples/tree/ga/NPM-search-connector-M365) app that's already enabled to run in Outlook.

1. From Visual Studio Code, open the command palette (Ctrl+Shift+P), type `Teams: Create a new Teams app`
1. Select **Create a new Teams app** option
1. Select **Search-based message extension** to download sample code for a Teams message extension using the latest Teams app manifest (version `1.13`)

    :::image type="content" source="images/toolkit-palatte-search-sample.png" alt-text="Type 'Create a new Teams app' VS Code command palette to list Teams sample options":::

    The sample is also available as *NPM Search Connector* in the Teams Toolkit Samples gallery. From the Teams Toolkit pane, select *Development* > *View samples* > **NPM Search Connector**.
    
    :::image type="content" source="images/toolkit-search-sample.png" alt-text="NPM Search Connector sample in Teams Toolkit Samples gallery":::

1. Select a location on your local machine for the workspace folder
1. Open the command palette (Ctrl+Shift+P) and type `Teams: Provision in the cloud` to create the required app resources (Azure App Service, App Service plan, Azure Bot, and Managed Identity) in your Azure account.
1. Open the command palette (Ctrl+Shift+P) and type `Teams: Deploy to the cloud` to deploy the sample code to the provisioned resources in Azure and start the app.

From here, you can skip ahead to [Add an Outlook channel for your bot](#add-an-outlook-channel-for-your-bot) to complete the final step of enabling the Teams message extension to work in Outlook. (The app manifest is already referencing the correct version, so no updates are necessary.)

## Update the app manifest

You'll need to use the [Teams developer manifest](../resources/schema/manifest-schema.md) schema version `1.13` to enable your Teams message extension to run in Outlook.

You have two options for updating your app manifest:

# [Teams Toolkit](#tab/manifest-teams-toolkit)

1. Open the *Command palette*: `Ctrl+Shift+P`
1. Run the `Teams: Upgrade Teams manifest to support Outlook and Office apps` command and select your app manifest file. Changes will be made in place.

# [Manual steps](#tab/manifest-manual)

Open your Teams app manifest and update the `$schema` and `manifestVersion` with the following values:

```json
{
    "$schema" : "https://developer.microsoft.com/json-schemas/teams/v1.13/MicrosoftTeams.schema.json",
    "manifestVersion" : "1.13"
}
```

---

If you used Teams Toolkit to create your message extension app, you can use it to validate the changes to your manifest file and identify any errors. Open the command palette `Ctrl+Shift+P` and find **Teams: Validate manifest file** or select the option from the Deployment menu of the Teams Toolkit (look for the Teams icon on the left side of Visual Studio Code).

:::image type="content" source="images/toolkit-validate-manifest-file.png" alt-text="Teams Toolkit 'Validate manifest file' option under 'Deployment' menu":::

## Add an Outlook channel for your bot

In Microsoft Teams, a message extension consists of a web service that you host and an app manifest, which defines where your web service is hosted. The web service takes advantage of the [Bot Framework SDK](/azure/bot-service/bot-service-overview) messaging schema and secure communication protocol through a Teams channel registered for your bot.

For users to interact with your message extension from Outlook, you'll need to add an Outlook channel to your bot:

1. From [Microsoft Azure portal](https://portal.azure.com) (or [Bot Framework portal](https://dev.botframework.com) if you previously registered there), navigate to your bot resource.

1. From *Settings*, select **Channels**.

1. Click on **Outlook**, select the **Message extensions** tab, then click **Save**.

    :::image type="content" source="images/azure-bot-channel-message-extensions.png" alt-text="Add an Outlook 'Message Extensions' channel for your bot from the Azure Bot Channels pane":::

1. Confirm that your Outlook channel is listed along with Microsoft Teams in your bot's **Channels** pane:

    :::image type="content" source="images/azure-bot-channels.png" alt-text="Azure Bot Channels pane listing both Microsoft Teams and Outlook channels":::

## Update Microsoft Azure Active Directory (Azure AD) app registration for SSO

> [!NOTE]
> You can skip the step if you're using [Teams message extension search sample](https://github.com/microsoft/BotBuilder-Samples/tree/main/samples/javascript_nodejs/50.teams-messaging-extensions-search), as the scenario doesn't involve Azure Active Directory (AAD) Single Sign-On authentication.

Azure Active Directory Single-sign on (SSO) for message extensions works the same way in Outlook [as it does in Teams](/microsoftteams/platform/bots/how-to/authentication/auth-aad-sso-bots), however you need to add several client application identifiers to the Azure AD app registration of your bot in your tenant's *App registrations* portal.

1. Sign in to [Azure portal](https://portal.azure.com) with your sandbox tenant account.
1. Open **App registrations**.
1. Select the name of your application to open its app registration.
1. Select  **Expose an API** (under *Manage*).

In the **Authorized client applications** section, ensure all of the following `Client Id` values are listed:

|Microsoft 365 client application | Client ID |
|--|--|
|Teams desktop and mobile |1fec8e78-bce4-4aaf-ab1b-5451cc387264 |
|Teams web |5e3ce6c0-2b1f-4285-8d4b-75ee78787346 |
|Outlook desktop | d3590ed6-52b3-4102-aeff-aad2292ab01c |
|Outlook Web Access | 00000002-0000-0ff1-ce00-000000000000 |
|Outlook Web Access | bc59ab01-8403-45c6-8796-ac3ef710b3e3 |

## Sideload your updated message extension in Teams

The final step is to sideload your updated message extension ([app package](/microsoftteams/platform/concepts/build-and-test/apps-package)) in Microsoft Teams. Once completed, your message extension will appear in your installed *Apps* from the compose message area.

1. Package your Teams application (manifest and app [icons](/microsoftteams/platform/resources/schema/manifest-schema#icons)) in a zip file. If you used Teams Toolkit to create your app, you can easily do this using the **Zip Teams metadata package** option in the *Deployment* menu of Teams Toolkit:

    :::image type="content" source="images/toolkit-zip-teams-metadata-package.png" alt-text="'Zip Teams metadata package' option in Teams Toolkit extension for Visual Studio Code":::

1. Log in to Teams with your sandbox tenant account, and verify you are on the *Public Developer Preview* by clicking on the ellipsis (**...**) menu by your user profile and opening **About** to check that the *Developer preview* option is toggled on.

    :::image type="content" source="images/teams-dev-preview.png" alt-text="From Teams ellipses menu, open 'About' and verify 'Developer Preview' option is checked":::

1. Open the *Apps* pane, and click **Upload a custom app** and then **Upload for me or my teams**.

    :::image type="content" source="images/teams-upload-custom-app.png" alt-text="'Upload a custom app' button in the Teams 'Apps' pane":::

1. Select your app package and click *Open*.

Once sideloaded through Teams, your message extension will be available in Outlook on the web.

## Preview your message extension in Outlook

You're now ready to test your message extension running in Outlook on Windows desktop and the web. While your updated message extension will continue to run in Teams with full [feature support for message extensions](/microsoftteams/platform/messaging-extensions/what-are-messaging-extensions), there are limitations in this early preview of the Outlook-enabled experience to be aware of:

* Message extensions in Outlook are limited to the mail [*compose* context](/microsoftteams/platform/resources/schema/manifest-schema#composeextensions). Even if your Teams message extension includes `commandBox` as a *context* in its manifest, the current preview is limited to the mail composition (`compose`) option. Invoking a message extension from the global Outlook *Search* box is not supported.
* [Action-based message extension](/microsoftteams/platform/messaging-extensions/how-to/action-commands/define-action-command?tabs=AS) commands are not supported in Outlook. If your app has both search- and action-based commands, it will surface in Outlook but the action menu will not be available.
* Insertion of more than five [Adaptive Cards](/microsoftteams/platform/task-modules-and-cards/cards/design-effective-cards?tabs=design) in an email is not supported; Adaptive Cards v1.4 and later are not supported.
* [Card actions](/microsoftteams/platform/task-modules-and-cards/cards/cards-actions?tabs=json) of type `messageBack`, `imBack`, `invoke`, and `signin` are not supported for inserted cards. Support is limited to `openURL`: on click, the user will be redirected to the specified URL in a new tab.

As you test your message extension, you can identify the source (originating from Teams versus Outlook) of bot requests by the [channelId](https://github.com/Microsoft/botframework-sdk/blob/main/specs/botframework-activity/botframework-activity.md#channel-id) of the [Activity](https://github.com/Microsoft/botframework-sdk/blob/main/specs/botframework-activity/botframework-activity.md) object. When a user performs a query, your service receives a standard Bot Framework `Activity` object. One of the properties in the Activity object is `channelId`, which will have the value of `msteams` or `outlook`, depending from where the bot request originates. For more, see  [Search based message extensions SDK](/microsoftteams/platform/resources/messaging-extension-v3/search-extensions).

### Outlook on the web

To preview your app running in Outlook on the web:

1. Log in to [outlook.com](https://www.outlook.com) using credentials for your test tenant.
1. Select **New message**.
1. Open **More apps** flyout menu on the bottom of the composition window.

:::image type="content" source="images/outlook-web-compose-more-apps.png" alt-text="Click on the 'More apps' menu on the bottom of the mail composition window to use your message extension":::

Your message extension will be listed. You can invoke it from there and use it just as you would while composing a message in Teams.

### Outlook

To preview your app running in Outlook on Windows desktop:

1. Launch Outlook logged in with credentials for your test tenant.
1. Click on **New Email**.
1. Open the **More apps** flyout menu on the top ribbon.

Your message extension will be listed. Invoking it will open an adjacent pane to display search results.

## Next steps

Outlook-enabled message extensions are supported for production use in Microsoft Teams and can be distributed to preview audiences running the *Targeted Release* version of outlook.com and the *Beta Channel* build of Outlook for Windows desktop.

Distribution options and processes for Outlook-enabled message extensions are the same as with traditional Team apps.

### Single-tenant distribution

Outlook-enabled message extensions can be distributed to test and production tenants in one of three ways:

#### Teams client

From the *Apps* menu, select *Manage your apps* > **Submit an app to your org**. This requires approval from your IT admin.

#### Microsoft Teams Admin Center

As a Teams admin, you can upload and pre-install the app package for your organization's tenant from [Teams admin](https://admin.teams.microsoft.com/). See [Upload your custom apps in the Microsoft Teams admin center](/MicrosoftTeams/upload-custom-apps) for details.

#### Microsoft Admin Center

As a global admin, you can upload and pre-install the app package from [Microsoft admin](https://admin.microsoft.com/). See [Test and deploy Microsoft 365 Apps by partners in the Integrated apps portal](/microsoft-365/admin/manage/test-and-deploy-microsoft-365-apps) for details.

### Multitenant distribution

The app [submission process for  Teams apps enabled for Outlook and Office](../concepts/deploy-and-publish/appsource/publish.md) is the same as for traditional Teams apps; the only difference is you'll [reference version 1.13](../tabs/how-to/using-teams-client-sdk.md) of the Teams app manifest schema in your app package, which introduces support for Teams apps that run across Microsoft 365.
