---
title: Extend Message Extension to Outlook
description: Learn how to update search-based message extension to run in Outlook, add Microsoft 365 channel for bot, and update Microsoft Entra app registration for SSO.
ms.date: 10/17/2024
ms.author: mosdevdocs
author: erikadoyle
ms.topic: tutorial
ms.localizationpriority: high
ms.subservice: m365apps
---

# Extend a Teams message extension across Microsoft 365

Message extensions let users interact with your web service via buttons and forms. Developers can search or initiate actions from Microsoft Teams and Outlook by extending Teams apps across Microsoft 365. There are two types of message extensions:

- Search-based message extensions: Allow users to search an external system and share results in the compose message area.
- Action-based message extensions: Use a modal pop-up to collect/display information, process interactions, and return rich cards to the client.

> [!NOTE]
> Teams search-based message extensions are generally available for Outlook, and action-based message extensions are in preview for Outlook.

Outlook mobile users on Android and iOS can view and interact with cards sent from Outlook on the web and Outlook for Windows. The extension also supports [link unfurling](../messaging-extensions/how-to/link-unfurling.md) that displays cards to launch [Stageview](../tabs/tabs-link-unfurling.md) and dialogs.

## Prerequisites

Developers must ensure:

> [!div class="checklist"]
>
> - Check for message extensions support within Outlook for Windows desktop, web, and mobile. See the support table in [extend Teams apps across Microsoft 365](~/m365-apps/overview.md).
> - [A Microsoft 365 Developer Program sandbox tenant.](~/m365-apps/prerequisites.md#prepare-a-developer-tenant-for-testing) For action-based message extensions, enroll your developer tenant in Microsoft 365 [Targeted Releases](~/m365-apps/prerequisites.md#enroll-your-developer-tenant-for-microsoft-365-targeted-releases-optional).
> - [A test environment with Microsoft 365 apps installed from the Microsoft 365 Apps Current Channel.](~/m365-apps/prerequisites.md#enroll-your-developer-tenant-for-microsoft-365-targeted-releases-optional)
> - [(Optional) Microsoft Visual Studio Code with Microsoft 365 Agents Toolkit extension](~/m365-apps/prerequisites.md#enroll-your-developer-tenant-for-microsoft-365-targeted-releases-optional).

## Build or extend a message extension

Developers can either build a new message extension app with Microsoft 365 Agents Toolkit (previously known as Teams Toolkit) or extend an existing Teams message extension app to Outlook.

# [Build a message extension app for Outlook](#tab/ttk)

To build a Teams message extension app for Outlook using Microsoft 365 Agents Toolkit for Visual Studio Code, ensure the following:

> [!div class="checklist"]
>
> - [Upload your app in Teams](#upload-your-custom-app-in-teams)
> - [Preview your message extension in Outlook](#preview-your-message-extension-in-outlook)

Developers can create a search-based or an action-based message extension.

[!INCLUDE [message-extensions-outlook](../includes/messaging-extensions/message-extensions-outlook.md)]

After building your app, [upload it in Teams](#upload-your-custom-app-in-teams) and [preview it in Outlook](#preview-your-message-extension-in-outlook). For building your app package with Agents Toolkit, see [build app package](~/toolkit/publish.md#build-app-package).

> [!div class="nextstepaction"]
> [I ran into an issue](https://github.com/MicrosoftDocs/msteams-docs/issues/new?template=Doc-Feedback.yaml&title=%5BI%20ran%20into%20an%20issue%5D%20Build%20a%20message%20extension%20app%20for%20Outlook&pageUrl=https%3A%2F%2Flearn.microsoft.com%2Fen-us%2Fmicrosoftteams%2Fplatform%2Fm365-apps%2Fextend-m365-teams-message-extension%3Ftabs%3Dttk%252Csearch-based-message-extension%23build-or-extend-a-message-extension&contentSourceUrl=https%3A%2F%2Fgithub.com%2FMicrosoftDocs%2Fmsteams-docs%2Fblob%2Fmain%2Fmsteams-platform%2Fm365-apps%2Fextend-m365-teams-message-extension.md&documentVersionIndependentId=2f0e2f61-c2b6-13c5-c367-283c55ae1be0&author=surbhigupta&platformId=f6fd84a6-25e7-c46b-e713-4a1598c448a9&metadata=*%2BID%253A%2Be473e1f3-69f5-bcfa-bcab-54b098b59c80%2B%250A*%2BService%253A%2B**msteams**)

# [Extend an existing Teams message extension app to Outlook](#tab/existing-app)

To extend an existing Teams message extension app to Outlook, developers should:

> [!div class="checklist"]
>
> - [Update your app manifest.](#update-your-app-manifest)
> - [Add the Microsoft 365 channel for your app.](#add-microsoft-365-channel-for-your-app)
> - [Update Microsoft Entra app registration for SSO.](#update-microsoft-entra-app-registration-for-sso)
> - [Upload your updated app in Teams.](#upload-your-custom-app-in-teams)
> - [Preview your message extension in Outlook](#preview-your-message-extension-in-outlook)

### Update your app manifest

Update the [app manifest](../resources/schema/manifest-schema.md) (previously called Teams app manifest) schema version 1.13 or later to enable your message extension in Outlook.

Open the app manifest and update the $schema and manifestVersion as follows:

```json
{
  "$schema": "https://developer.microsoft.com/json-schemas/teams/v1.16/MicrosoftTeams.schema.json",
  "manifestVersion": "1.16"
}
```

Developers can use Microsoft 365 Agents Toolkit to [validate the app manifest](../toolkit/TeamsFx-preview-and-customize-app-manifest.md#validate-your-app) and fix any issues.

[!INCLUDE [requirements-targeting](../includes/requirements-targeting.md)]

### Add Microsoft 365 channel for your app

A message extension consists of a hosted web service and an app manifest defining the web service's location. The web service uses the Bot Framework SDK messaging schema and secure communication via a Teams channel for the bot.

To allow interactions from Outlook, enable the Microsoft 365 channel for your Azure bot resource:

> [!NOTE]
> If developers have enabled the Outlook channel previously, add the Microsoft 365 channel to ensure proper functionality in Outlook. The Outlook channel is no longer used for message extensions in Outlook and may be disabled.

Follow these steps:

1. Sign in to [Microsoft Azure portal](https://portal.azure.com) or [Bot Framework portal](https://dev.botframework.com) (if previously registered) and open the bot resource.
2. Navigate to Settings > Channels.
3. Under Available channels, select the Microsoft 365 channel.

   :::image type="content" source="../assets/images/azure-bot-channel-message-extensions.png" alt-text="Screenshot shows the Microsoft 365 Extensions Preview channel for your bot from the Azure Bot Channels pane." :::

4. Select Apply.

   :::image type="content" source="../assets/images/azure-bot-channel-message-extensions-apply.png" alt-text="Screenshot shows the Microsoft 365 Message Extensions channel for your bot from the Azure Bot Channels pane." :::

5. Confirm that the Microsoft 365 channel appears alongside Microsoft Teams in your bot’s Channels pane.

### Update Microsoft Entra app registration for SSO

> [!NOTE]
> Developers can skip this step if building an app for Outlook using Microsoft 365 Agents Toolkit, as this scenario doesn't involve Microsoft Entra single sign-on (SSO) authentication.

Microsoft Entra SSO for message extensions works similarly in Outlook as in Microsoft Teams. However, developers must add several client application identifiers to the Microsoft Entra app registration of the bot in the tenant's App registrations portal.

Steps:

1. Sign in to [Azure portal](https://portal.azure.com) using the sandbox tenant account.
2. Select App registrations.
3. Choose the application to open its registration.
4. Navigate to Manage > Expose an API.
5. In the Authorized client applications section, ensure all the following Client Id values are included:

   - Teams desktop and mobile: 1fec8e78-bce4-4aaf-ab1b-5451cc387264
   - Teams web: 5e3ce6c0-2b1f-4285-8d4b-75ee78787346
   - Microsoft 365 web: 4765445b-32c6-49b0-83e6-1d93765276ca
   - Microsoft 365 desktop: 0ec893e0-5785-4de6-99da-4ed124e5296c
   - Microsoft 365 mobile: d3590ed6-52b3-4102-aeff-aad2292ab01c
   - Outlook desktop: d3590ed6-52b3-4102-aeff-aad2292ab01c
   - Outlook Web Access: bc59ab01-8403-45c6-8796-ac3ef710b3e3
   - Outlook mobile: 27922004-5251-4030-b22d-91ecd9a37ea4

> [!div class="nextstepaction"]
> [I ran into an issue](https://github.com/MicrosoftDocs/msteams-docs/issues/new?template=Doc-Feedback.yaml&title=%5BI%20ran%20into%20an%20issue%5D+Extend+an+existing+Teams+message+extension+app+to+Outlook&pageUrl=https%3A%2F%2Flearn.microsoft.com%2Fen-us%2Fmicrosoftteams%2Fplatform%2Fm365-apps%2Fextend-m365-teams-message-extension%3Ftabs%3Dexisting-app%252Csearch-based-message-extension&contentSourceUrl=https%3A%2F%2Fgithub.com%2FMicrosoftDocs%2Fmsteams-docs%2Fblob%2Fmain%2Fmsteams-platform%2Fm365-apps%2Fextend-m365-teams-message-extension.md&documentVersionIndependentId=2f0e2f61-c2b6-13c5-c367-283c55ae1be0&author=surbhigupta&platformId=f6fd84a6-25e7-c46b-e713-4a1598c448a9&metadata=*%2BID%253A%2Be473e1f3-69f5-bcfa-bcab-54b098b59c80%2B%250A*%2BService%253A%2B**msteams**)

---

## Upload your custom app in Teams

Upload the updated message extension (app package) into Microsoft Teams. Once uploaded, the extension appears in the Apps section of the compose message area.

Steps:

1. Create a .zip file containing the app manifest and [icons](/microsoftteams/platform/resources/schema/manifest-schema#icons).
2. Sign in to Microsoft Teams using the sandbox tenant account.
3. Select Apps > Manage your apps > Upload an app.

   :::image type="content" source="images/teams-manage-your-apps.png" alt-text="Screenshot shows the Upload an app option under Manage your apps." :::

4. Choose Upload a custom app, select the .zip file, and install (Add) it to the Teams client.

   :::image type="content" source="images/teams-upload-custom-app.png" alt-text="Screenshot shows the Upload a custom app option in Teams." :::

After uploading, the message extension becomes available in Outlook for Windows desktop and web.

## Preview your message extension in Outlook

To test the message extension in Outlook on the web:

1. Sign in to outlook.com using the test tenant credentials.
2. Select New message.
3. Click Apps on the ribbon.

   :::image type="content" source="images/outlook-me.png" alt-text="Screenshot shows the preview your message extension in Outlook on the web." :::

The message extension appears and can be used as it is in Teams.

## Debugging

During debugging, developers can identify the source of bot requests (Teams vs. Outlook) using the channelId field in the Activity object. The Bot Framework sends a standard Activity object when a user queries. The channelId property indicates the origin: either msteams or m365extensions.

For further information, see:
- [search based message extensions SDK](/microsoftteams/platform/resources/messaging-extension-v3/search-extensions)
- [action based messaging extensions SDK](/microsoftteams/platform/resources/messaging-extension-v3/create-extensions)

## Limitations

Be aware of the following limitations when running the updated message extension in Outlook:

- Only the compose context is supported in Outlook. Message extension contexts like commandBox and message in the Teams app manifest are not supported in Outlook.
- Action-based message extensions can send cards into the compose box; however, using bots to deliver cards is not supported in this scenario. Developers can convert this into sending cards directly in Outlook.
- No more than five Adaptive Cards can be inserted in an email.
- Card actions of type messageBack, imBack, invoke, and signin are not supported. Only openURL is supported.
- For Adaptive Card actions, Action.Submit only supports launching Stageview and task modules.

> [!NOTE]
> When testing an app with link unfurling, remove the app manually afterward. If multiple apps monitor the same domain, the most recently installed app might prevent proper invocation in Outlook, as happens in Microsoft Teams.

Developers can use the [Microsoft Teams developer community channels](/microsoftteams/platform/feedback) to report issues and provide feedback.

## Code sample

| **Sample Name** | **Description** | **Node.js** |
|-----------------|-----------------|-------------|
| NPM Search Connector | Teams Toolkit sample app to build a message extension app. Works in Teams and Outlook. | [View](https://github.com/OfficeDev/TeamsFx-Samples/tree/v2.1.0/NPM-search-connector-M365) |
| Teams Link Unfurling | Sample app showcasing a Node.js bot that implements link unfurling in Microsoft Teams messaging extensions. | [View](https://github.com/OfficeDev/Microsoft-Teams-Samples/tree/main/samples/msgext-link-unfurling/nodejs) |
| Tab in Stageview | Demonstrates the use of a Teams Tab in Stageview with collaborative elements using Node.js. | [View](https://github.com/OfficeDev/Microsoft-Teams-Samples/tree/main/samples/tab-stage-view/nodejs) |
| Teams action-based message extension for Microsoft 365 | Teams Toolkit sample app to build a message extension app working in Teams and Outlook. | [View](https://github.com/OfficeDev/microsoft-365-agents-toolkit/tree/dev/templates/vsc/js) |

## Next step

> [!div class="nextstepaction"]
> [Publish Teams apps for Outlook and Microsoft 365 app](publish.md)