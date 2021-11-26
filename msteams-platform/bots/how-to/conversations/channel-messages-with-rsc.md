---
title: Receive all channel messages and group chats with RSC
author: surbhigupta12
description: Receive all channel messages and group chats with RSC permissions
ms.topic: conceptual
ms.localizationpriority: medium
---

# Receive all channel messages and group chats with RSC

The resource-specific consent (RSC) permissions model, originally developed for Teams Graph APIs, is now extended to bot scenarios. Bots receive all chat messages via RSC permission. Using RSC, you can request team owners to consent for a bot to receive user messages across standard channels and **groupchat** without being @mentioned. The capability is enabled by specifying the `ChannelMessage.Read.Group` and `ChatMessage.Read.Chat` permissions under `webApplicationInfo.applicationPermissions` in the manifest of RSC enabled Teams app. After configuration, team owners can grant consent during the app installation process.

For more information about enabling RSC for your app, see [resource-specific consent in Teams](/microsoftteams/platform/graph-api/rsc/resource-specific-consent#update-your-teams-app-manifest).

## Enable bots to receive all channel and group chat messages

The `ChannelMessage.Read.Group`and `ChatMessage.Read.Chat` RSC permissions are extended to bots. With user consent, the permissions allow graph applications to get all messages in a conversation and bots to receive all channel and **groupchat** messages without being @mentioned.

> [!NOTE]
> * Services that need access to all Teams message data must use the Graph APIs that also provide access to archived data in channels and chats.
> * Bots must use the `ChannelMessage.Read.Group` and `ChatMessage.Read.Chat` RSC permissions appropriately to build and enhance engaging experience for users in the team or they will not pass the store approval. The app description must include how the bot uses the data it reads.
> * The `ChannelMessage.Read.Group` and `ChatMessage.Read.Chat` RSC permissions may not be used by bots as a way to extract large amounts of customer data.

## Update app manifest

For your bot to receive all channel messages, RSC must be configured in the Teams app manifest with the `ChannelMessage.Read.Group` and `ChatMessage.Read.Chat` permissions specified in the `webApplicationInfo` property.

 ![App Manifest](~/assets/images/bots/manifest_image.png)

The following is an example of the `webApplicationInfo` object:

* **id**: Your Azure Active Directory (AAD) app ID. This can be the same as your bot ID.
* **resource**: Any string. This field has no operation in RSC, but must be added and have a value to avoid error response.
* **applicationPermissions**: RSC permissions for your app with `ChannelMessage.Read.Group`and `ChatMessage.Read.Chat` must be specified. For more information, see [resource-specific permissions](/microsoftteams/platform/graph-api/rsc/resource-specific-consent#resource-specific-permissions).

The following codes provide example of the app manifest:

```json
"webApplicationInfo": {
"id": "XXxxXXXXX-XxXX-xXXX-XXxx-XXXXXXXxxxXX",
"resource": "https://AnyString",
"applicationPermissions": [
"ChannelMessage.Read.Group"
"ChatMessage.Read.Chat"
    ]
  }
```

## Sideload in a team

# [Channel messages](#tab/channel)

To sideload in a team to test, whether all channel messages in a team with RSC are received without being @mentioned:

1. Select or create a team.
1. Select the ellipses &#x25CF;&#x25CF;&#x25CF; from the left pane. The drop-down menu appears.
1. Select **Manage team** from the drop-down menu. The details appear.

   ![Managing apps in team](~/bots/how-to/conversations/Media/managingteam.png)

1. Select **Apps**. Multiple apps appear.
1. Select **Upload a custom app** from the lower right corner.

    ![Uploading custom app](~/bots/how-to/conversations/Media/uploadingcustomapp.png)

1. Select the app package from the **Open** dialog box.
1. Select **Open**.

    ![Selecting app package](~/bots/how-to/conversations/Media/selectapppackage.png)

1. Select **Add** from the app details pop-up, to add the bot to your selected team.

    ![Adding the bot](~/bots/how-to/conversations/Media/addingbot.png)

1. Select a channel and enter a message in the channel for your bot.

    The bot receives the message without being @mentioned.

    ![Bot receives message](~/bots/how-to/conversations/Media/botreceivingmessage.png)

# [Chat messages](#tab/chat)

To sideload in a team to test, whether all **groupchat** messages in a team with RSC are received without being @mentioned:

1. Select or create a **groupchat**.
1. Select the ellipses &#x25CF;&#x25CF;&#x25CF; from the left pane. The drop-down menu appears.
1. Select **Manage apps** from the drop-down menu. The details appear.

   ![Manage apps in team](~/assets/images/bots/Chats_Manage_Apps_Entry.png)

1. Select **Apps**. Multiple apps appear.
1. Select **Upload a custom app** from the lower right corner.

    ![Uploading custom app](~/assets/images/bots/Chats_Manage_Apps_Page.png)

1. Select the app package from the **Open** dialog box.
1. Select **Open**.

    ![Selecting app package](~/assets/images/bots/Chats_Sideload_App_FilePicker.png)

1. Select **Add** from the app details pop-up, to add the bot to your selected **groupchat**.

    ![Adding the bot](~/assets/images/bots/Chats_Install_Dialog.png)

1. Enter a message in the **groupchat** for your bot.

   ![Bot receives message](~/assets/images/bots/Bot_ReceiveMessage.png)

   The bot receives the message without being @mentioned.

   ![No mention](~/assets/images/bots/Bot_NoMention.png)

---

## Code sample

| Sample name | Description | C# |Node.js|
|-------------|-------------|------|----|
|Channel messages with RSC permissions|Microsoft Teams sample app demonstrating on how a bot can receive all channel messages with RSC without being @mentioned.|[View](https://github.com/OfficeDev/Microsoft-Teams-Samples/tree/main/samples/bot-receive-channel-messages-withRSC/csharp) |[View](https://github.com/OfficeDev/Microsoft-Teams-Samples/tree/main/samples/bot-receive-channel-messages-withRSC/nodejs) |

## See also

* [Bot conversations](/microsoftteams/platform/bots/how-to/conversations/conversation-basics)
* [Resource-specific consent](/microsoftteams/resource-specific-consent)
* [Test resource-specific consent](/microsoftteams/platform/graph-api/rsc/test-resource-specific-consent)
* [Upload custom app in Teams](~/concepts/deploy-and-publish/apps-upload.md)
