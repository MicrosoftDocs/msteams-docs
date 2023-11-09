---
title: Extend a Teams message extension across Microsoft 365
description: Learn how to update your search-based message extension to run in Outlook and add Microsoft 365 channel for your bot.
ms.date: 01/31/2023
ms.author: mosdevdocs
author: erikadoyle
ms.topic: tutorial
ms.localizationpriority: high
ms.subservice: m365apps
---
# Extend a Teams message extension across Microsoft 365

Message extensions allow users to interact with your web service using buttons and forms. Users can search or initiate actions in an external system from Microsoft Teams and Outlook by extending your Teams apps across Microsoft 365. There are two types of message extensions:

* Search-based message extensions: Allow users to search an external system and share results through the compose message area of the client.

* Action-based message extensions: Allow users with a modal pop-up to collect or display information, process the interaction, and send the information back to the client as a rich card.

> [!NOTE]
> Teams search-based message extensions are generally available for Outlook and action-based message extensions are available in preview for Outlook.

Outlook mobile users on Android and iOS can receive and take actions on cards from your apps that were sent to them by users on Outlook on the web and Outlook for Windows.

Teams message extension across Microsoft 365 also supports [link unfurling](../messaging-extensions/how-to/link-unfurling.md) that display cards to launch [Stage View](../tabs/tabs-link-unfurling.md) and task modules.

## Prerequisites

To extend your Teams message extension to Outlook, ensure the following:

> [!div class="checklist"]
>
> * Check for message extensions support within Outlook for Windows desktop, web, and mobile, see the support table in [extend Teams apps across Microsoft 365](~/m365-apps/overview.md).
> * [A Microsoft 365 Developer Program sandbox tenant.](~/m365-apps/prerequisites.md#prepare-a-developer-tenant-for-testing)
> * [A test environment with Microsoft 365 apps installed from the Microsoft 365 Apps **Current Channel**.](~/m365-apps/prerequisites.md#enroll-your-developer-tenant-for-microsoft-365-targeted-releases-optional)
> * [(Optional) Microsoft Visual Studio Code with the Teams Toolkit extension.](~/m365-apps/prerequisites.md#enroll-your-developer-tenant-for-microsoft-365-targeted-releases-optional)

To extend your Teams message extension to Outlook, you can either build a new message extension app with Teams Toolkit or extend an existing Teams message extension app to Outlook.

:::row:::
:::column:::

[Build a new message extension app with Teams Toolkit.](#build-a-message-extension-app-for-outlook)
    
  > [!div class="checklist"]
  >
  > * [Build an app with Teams Toolkit in Visual Studio Code](#build-a-message-extension-app-for-outlook)
  > * [Sideload your app in Teams using Teams Toolkit](#sideload-your-app-in-teams-using-teams-toolkit)
  > * [Preview your message extension in Outlook](#preview-your-message-extension-in-outlook)

:::column-end:::
:::column:::

[Extend an existing Teams message extension app to Outlook.](#build-a-message-extension-app-for-outlook)
    
  > [!div class="checklist"]
  >
  > * [Update your app manifest.](#update-your-app-manifest)
  > * [Add the Microsoft 365 channel for your bot.](#add-microsoft-365-channel-for-your-app)
  > * [Update Azure AD app registration for SSO](#update-azure-ad-app-registration-for-sso)
  > * [Sideload your updated app in Teams.](#sideload-your-app-in-teams)
  > * [Preview your message extension in Outlook](#preview-your-message-extension-in-outlook-1)

:::column-end:::
:::row-end:::

## Build a message extension app for Outlook

You can build a Teams message extension app for Outlook through Teams Toolkit extension for Visual Studio Code.

# [Search-based message extension](#tab/search-based-message-extension)

1. Open **Visual Studio Code**.
1. Select **Command Palette...** under the **View** option or **Ctrl+Shift+P**.
1. Select **Teams: Create a New App**.
1. From the dropdown list that appears, select **Message Extension**.
1. Select **Custom Search Results** to download the sample code for a Teams search-based message extension using the latest app manifest (previously called Teams [app manifest](../resources/schema/manifest-schema.md)).

    :::image type="content" source="images/toolkit-palatte-search-sample.png" alt-text="Screenshot shows the Create a new Teams app VS Code command palette to list Teams sample options.":::

   You can also download the sample code from the left pane, under **DEVELOPMENT**, select **View Samples**. A **Samples** tab appears, in the search field enter **NPM Search Connector**.

    :::image type="content" source="images/toolkit-search-sample.png" alt-text="Screenshot shows the NPM Search Connector sample in Teams Toolkit Samples gallery.":::

1. Select a preferred programming language.
1. Select a location on your local machine for the workspace folder and enter your application name.
1. Select **Command Palette...** under the **View** option or **Ctrl+Shift+P**.
1. Enter **Teams: Provision** to create the relevant app resources, such as Azure App Service, App Service plan, Azure Bot, and Managed Identity, in your Azure account.
1. Select a subscription and a resource group.
1. Select **Provision**. Alternatively, you can select **Provision** under the **LIFECYCLE** section of the extension.
1. Select **Command Palette...** under the **View** option or **Ctrl+Shift+P**.
1. Enter **Teams: Deploy** to deploy the sample code to the provisioned resources in Azure and start the app. Alternatively, you can select **Deploy** under **LIFECYCLE** section of the extension.
1. Select **Deploy**.

# [Action-based message extension](#tab/action-based-message-extension)

1. Open **Visual Studio Code**.
1. Select **Command Palette...** under the **View** option or **Ctrl+Shift+P**.
1. Select **Teams: Create a New App**.
1. From the dropdown list that appears, select **Message Extension**.
1. Select **Collect Form Input and Process Data** to download the sample code for a Teams action-based message extension using the latest app manifest (previously called Teams [app manifest](../resources/schema/manifest-schema.md)).

    :::image type="content" source="images/toolkit-palatte-action-sample.png" alt-text="Screenshot shows the Create a new Teams app VS Code command palette to list Teams action-based message extension sample option.":::

1. Select preferred programming language.
1. Select a location on your local machine for the workspace folder and enter your application name.
1. Select **Command Palette...** under the **View** option or **Ctrl+Shift+P**.
1. Enter **Teams: Provision** to create the relevant app resources, such as Azure App Service, App Service plan, Azure Bot, and Managed Identity, in your Azure account.
1. Select a subscription and a resource group.
1. Select **Provision**. Alternatively, you can select **Provision** under the **LIFECYCLE** section of the extension.
1. Select **Command Palette...** under the **View** option or **Ctrl+Shift+P**.
1. Enter **Teams: Deploy** to deploy the sample code to the provisioned resources in Azure and start the app. Alternatively, you can select **Deploy** under **LIFECYCLE** section of the extension.
1. Select **Deploy**.

---

### Sideload your app in Teams using Teams Toolkit 

Sideload your updated message extension [app package](/microsoftteams/platform/concepts/build-and-test/apps-package) into Teams.

1. Open **UTILITY** section of Teams Toolkit and select **Zip Teams App Package**. Select the `manifest.json` file for your app and the appropriate environment.

   :::image type="content" source="images/toolkit-zip-teams-app-package.png" alt-text="Screenshot shows Zip Teams App Package option in Teams Toolkit extension for Visual Studio Code.":::

1. Go to **Microsoft Teams** and sign in using your sandbox tenant account.

1. Select **Apps** > **Manage your apps** > **Upload an app**.

   :::image type="content" source="images/teams-manage-your-apps.png" alt-text="Screenshot shows the Upload an app option under Manage your apps.":::

1. Select the **Upload a custom app** option, select your app package, and install (**Add**) it to your Teams client.

   :::image type="content" source="images/teams-upload-custom-app.png" alt-text="Screenshot shows the Upload a custom app option in Teams.":::

After it's sideloaded through Teams, your message extension is available in Outlook for Windows desktop and web.

### Preview your message extension in Outlook

To test your message extension running in Outlook for Windows and Outlook on the web.
    
# [Outlook on the web](#tab/outlook-on-the-web)

To preview your app running in Outlook on the web:

1. Sign in to [outlook.com](https://www.outlook.com) using your test tenant credentials.
1. Select **New message**.
1. Select **Apps** on the ribbon.

   :::image type="content" source="images/outlook-web-compose-more-apps.png" alt-text="Screenshot shows the Apps menu on the ribbon of the mail composition window to launch your message extension.":::

Your message extension is listed. You can invoke it from there and use it just as you would while composing a message in Teams.

# [Outlook for Windows](#tab/outlook-on-the-desktop)

To preview your app running in Outlook for Windows:

1. Launch Outlook and sign in with your test tenant credentials.
1. Select **New Email**.
1. Select **All Apps** on the ribbon.

   :::image type="content" source="images/outlook-desktop-compose-more-apps.png" alt-text="Screenshot shows the All Apps menu on the ribbon of the composition window to launch your message extension.":::

---

## Extend an existing Teams message extension app to Outlook

To extend your existing Teams message extension app to Outlook, ensure the following:

> [!div class="checklist"]
>
> * [Update your app manifest.](#update-your-app-manifest)
> * [Add the Microsoft 365 channel for your app.](#add-microsoft-365-channel-for-your-app)
> * [Update Azure AD app registration for SSO.](#update-azure-ad-app-registration-for-sso)
> * [Sideload your updated app in Teams.](#sideload-your-app-in-teams)

### Update your app manifest

Update the [app manifest](../resources/schema/manifest-schema.md) schema version `1.13` or later to enable your Teams message extension to run in Outlook.

Open your app manifest and update the `$schema` and `manifestVersion` with the following values:

```json
{
"$schema" : "https://developer.microsoft.com/json-schemas/teams/v1.16/MicrosoftTeams.schema.json",
"manifestVersion" : "1.16"
}
```

### Add Microsoft 365 channel for your app

In Microsoft Teams, a message extension consists of a web service that you host and an app manifest, which defines where your web service is hosted. The web service takes the advantage of [Bot Framework SDK](/azure/bot-service/bot-service-overview) messaging schema and secure communication protocol through a Teams channel registered for your bot.

For users to interact with your message extension from Outlook, you need to enable the **Microsoft 365** channel for your Azure bot resource of the message extension app.

> [!NOTE]
>
> If you've previously enabled the **Outlook** channel for your bot, you'll need to enable the **Microsoft 365** channel in order for your message extension to function correctly in Microsoft Outlook. The Outlook channel is no longer used for message extensions running in Outlook and can be disabled.

1. Go to [Microsoft Azure portal](https://portal.azure.com) or [Bot Framework portal](https://dev.botframework.com) (if you've previously registered there), go to your bot resource.

1. From **Settings** > **Channels**.

1. Under **Available channels**, select **Microsoft 365** channel.

   :::image type="content" source="../assets/images/azure-bot-channel-message-extensions.png" alt-text="Screenshot shows the Microsoft 365 Extensions Preview channel for your bot from the Azure Bot Channels pane.":::

1. Select **Apply**.

   :::image type="content" source="../assets/images/azure-bot-channel-message-extensions-apply.png" alt-text="Screenshot shows the Microsoft 365 Message Extensions channel for your bot from the Azure Bot Channels pane.":::

1. Confirm that your **Microsoft 365** channel is listed along with **Microsoft Teams** in your bot's **Channels** pane.

### Update Azure AD app registration for SSO

Azure Active Directory (AD) single sign-on (SSO) for message extensions works the same way in Outlook [as it does in Teams](/microsoftteams/platform/bots/how-to/authentication/auth-aad-sso-bots). However, you need to add several client application identifiers to the Azure AD app registration of your bot in your tenant's **App registrations** portal.

1. Sign in to [Azure portal](https://portal.azure.com) with your sandbox tenant account.
1. Select **App registrations**.
1. Select the name of your application to open its app registration.
1. Select **Manage** > **Expose an API**.
1. In the **Authorized client applications** section, ensure all of the following `Client Id` values are listed:

   |Microsoft 365 client application | Client ID |
   |--|--|
   |Teams desktop and mobile |1fec8e78-bce4-4aaf-ab1b-5451cc387264 |
   |Teams web |5e3ce6c0-2b1f-4285-8d4b-75ee78787346 |
   |Outlook desktop | d3590ed6-52b3-4102-aeff-aad2292ab01c |
   |Outlook Web Access | bc59ab01-8403-45c6-8796-ac3ef710b3e3 |
   |Outlook mobile | 27922004-5251-4030-b22d-91ecd9a37ea4 |


### Preview your message extension in Outlook

Here's how to test your message extension running in Outlook for Windows and Outlook on the web.
    
# [Outlook on the web](#tab/outlook-on-the-web)

To preview your app running in Outlook on the web:

1. Sign in to [outlook.com](https://www.outlook.com) using your test tenant credentials.
1. Select **New message**.
1. Select **Apps** on the ribbon.

   `Place holder for Figma image`

# [Outlook for Windows](#tab/outlook-on-the-desktop)

To preview your app running in Outlook for Windows:

1. Launch Outlook and sign in with your test tenant credentials.
1. Select **New Email**.
1. Select **All Apps** on the ribbon.

   `Place holder for Figma image`

---

Your message extension is listed. You can invoke it from there and use it just as you would while composing a message in Teams.

## Debugging

As you debug your message extension, you can identify the source (originating from Teams versus Outlook) of bot requests by the [channelId](https://github.com/Microsoft/botframework-sdk/blob/main/specs/botframework-activity/botframework-activity.md#channel-id) field of the [Activity](https://github.com/Microsoft/botframework-sdk/blob/main/specs/botframework-activity/botframework-activity.md) object. When a user performs a query, your service receives a standard Bot Framework `Activity` object. One of the properties in the Activity object is `channelId`, which has the value of `msteams` or `m365extensions`, depending on where the bot request originates. For more information, see [search based message extensions SDK](/microsoftteams/platform/resources/messaging-extension-v3/search-extensions) and [action based messaging extensions SDK](/microsoftteams/platform/resources/messaging-extension-v3/create-extensions).

## Limitations

While your updated message extension continues to run in Teams, you must be aware of the following limitations:

- Message extensions in Outlook are supported only in the [`compose`](/microsoftteams/platform/resources/schema/manifest-schema#composeextensions) context. Teams message extension contexts like `commandBox` and `message` in its app manifest are not supported on Outlook.

- Action-based message extensions that [send cards](../messaging-extensions/how-to/action-commands/respond-to-task-module-submit.md#respond-with-a-card-inserted-into-the-compose-message-area) into the compose box are supported in Outlook. However, using [bots to deliver cards](../messaging-extensions/how-to/action-commands/respond-to-task-module-submit.md#) isn't supported. In this scenario, you can convert your message extension to [send cards](../messaging-extensions/how-to/action-commands/respond-to-task-module-submit.md#respond-with-a-card-inserted-into-the-compose-message-area) into the compose box in Outlook.

- You can't insert more than five [Adaptive Cards](/microsoftteams/platform/task-modules-and-cards/cards/design-effective-cards?tabs=design) in an email. 

- [Card actions](/microsoftteams/platform/task-modules-and-cards/cards/cards-actions?tabs=json) of type `messageBack`, `imBack`, `invoke`, and `signin` aren't supported. `openURL` is the only supported card action.

- Adaptive Card actions are supported. For `Action.Submit` only [stageview](https://learn.microsoft.com/en-us/microsoftteams/platform/tabs/tabs-link-unfurling#invoke-collaborative-stage-view-from-adaptive-card) and [taskmodule](https://learn.microsoft.com/en-us/microsoftteams/platform/task-modules-and-cards/task-modules/task-modules-bots?tabs=nodejs#bot-framework-card-actions-vs-adaptive-card-actionsubmit-actions) launching is supported  

Use the [Microsoft Teams developer community channels](/microsoftteams/platform/feedback) to report issues and provide feedback.

## Code sample

| **Sample Name** | **Description** | **Node.js** |
|---------------|--------------|--------|
| NPM Search Connector | Use Teams Toolkit to build a message extension app. Works in Teams, Outlook. | [View](https://github.com/OfficeDev/TeamsFx-Samples/tree/v2.1.0/NPM-search-connector-M365) |
| Teams Link Unfurling | Simple Teams app to demonstrate link unfurling. Works in Teams, Outlook. | [View](https://github.com/OfficeDev/Microsoft-Teams-Samples/tree/main/samples/msgext-link-unfurling/nodejs)
| Tab in Stage View | Microsoft Teams tab sample app for demonstrating a tab in Stage View. Works in Teams, Outlook, Microsoft 365 app. | [View](https://github.com/OfficeDev/Microsoft-Teams-Samples/tree/main/samples/tab-stage-view/nodejs) |
|Teams action-based message extension for Microsoft 365| `TBD` | `TBD` |


## Next step

Publish your app to be discoverable in Teams, Outlook, and Microsoft 365 app:

> [!div class="nextstepaction"]
> [Publish Teams apps for Outlook and Microsoft 365 app](publish.md)

## See also

[Message extensions](~/messaging-extensions/what-are-messaging-extensions.md)
