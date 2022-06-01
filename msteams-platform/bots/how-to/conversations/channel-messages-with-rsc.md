---
title: Receive all conversation messages with RSC
author: surbhigupta12
description: Receive all conversation messages with RSC
ms.topic: conceptual
ms.localizationpriority: medium
---

# Receive all conversation messages with RSC

The resource-specific consent (RSC) permissions model, originally developed for Teams Graph APIs, is being extended to bot scenarios.

Using RSC, you can request team owners to consent for a bot to receive user messages across standard channels or chats without being @mentioned. The capability is enabled by specifying the `ChannelMessage.Read.Group` or `ChatMessage.Read.Chat` permissions in the manifest of RSC enabled Teams app. The conversation owners can grant consent during the app installation or upgrade process.
 
For more information about enabling RSC for your app, see [resource-specific consent in Teams](/microsoftteams/platform/graph-api/rsc/resource-specific-consent#update-your-teams-app-manifest).

## Enable bots to receive all channel or chat messages

The `ChannelMessage.Read.Group` and `ChatMessage.Read.Chat` RSC permissions in a Teams app manifest enable a specified graph application to get all messages in channels and chats respectively, where the Teams app has been consented to, and installed. A bot defined in an app manifest with one or both RSC permissions, receives all messages without being @mentioned in conversations where the permissions apply.

|**RSC Permission** | **Conversation Context** | **Graph App** | **Bot** |
| -------- | --------- | ---------| --------- |
|`ChannelMessage.Read.Group` | Teams & Channels | Get all messages through Graph API in channels where Teams app is installed | Receive all messages sent in standard channels without being @mentioned where Teams app is installed |
|`ChatMessage.Read.Chat` | Chats (user:user, groups, and meetings) | Get all messages through Graph API in chats  where Teams app is installed | Receive all messages sent in chat without being @mentioned where Teams app is installed |

> [!NOTE]
> * Services that need access to all Teams message data must use the Graph APIs that provide access to archived data in channels and chats.
> * Bots must use the `ChannelMessage.Read.Group` and `ChatMessage.Read.Chat` RSC permissions appropriately to build and enhance engaging experience for users in the team or they will not pass the store approval. The app description must include how the bot uses the data it reads.
> * The `ChannelMessage.Read.Group` and `ChatMessage.Read.Chat` RSC permissions may not be used by bots to extract large amounts of customer data.

## Update app manifest

For your bot to receive all channel messages, RSC must be configured in the Teams app manifest with the `ChannelMessage.Read.Group` permission specified in the `webApplicationInfo` property.

![Update app manifest](~/bots/how-to/conversations/Media/appmanifest.png)

The following list describes the `webApplicationInfo` object:

* **id**: Your Azure Active Directory (AAD) app ID. The app ID can be the same as your bot ID.
* **resource**: Any string. The resource field has no operation in RSC, but must be added with a value to avoid error response.
* **applicationPermissions**: RSC permissions for your app with `ChannelMessage.Read.Group`and `ChatMessage.Read.Chat` must be specified. For more information, see [resource-specific permissions](/microsoftteams/platform/graph-api/rsc/resource-specific-consent#resource-specific-permissions).

The following code provides an example of the app manifest:

```json
"webApplicationInfo": {
"id": "XXxxXXXXX-XxXX-xXXX-XXxx-XXXXXXXxxxXX",
"resource": "https://AnyString",
"applicationPermissions": [
"ChannelMessage.Read.Group",
"ChatMessage.Read.Chat"
    ]
  }
```

## Sideload in a conversation to test

# [Channel messages](#tab/channel)

The following steps guide you to sideload and validate bot that receives all channel messages in a Team without being @mentioned:

1. Select or create a team.
1. Select the ellipses &#x25CF;&#x25CF;&#x25CF; from the left pane. The drop-down menu appears.
1. Select **Manage team** from the drop-down menu. The details appear:

    ![Managing apps in team](~/bots/how-to/conversations/Media/managingteam.png)

      :::image type="content" source="Media/managingteam.png" alt-text="managing team"border="true":::

1. Select **Apps**. Multiple apps appear.
1. Select **Upload a custom app** from the lower right corner":

      :::image type="content" source="Media/uploadingcustomapp.png" alt-text="uploading custom app":::
  
1. Select the app package from the **Open** dialog box.
1. Select **Open**:

      :::image type="content" source="Media/selectapppackage.png" alt-text="Select the app package"lightbox="Media/selectapppackage.png"border="true":::

1. Select **Add** from the app details pop-up, to add the bot to your selected team:

      :::image type="content" source="Media/addingbot.png" alt-text="Adding bot"lightbox="Media/addingbot.png"border="true":::

1. Select a channel and enter a message in the channel for your bot:

      :::image type="content" source="Media/botreceivingmessage.png" alt-text="Bot receiving message"lightbox="Media/botreceivingmessage.png"border="true":::

   The bot receives the message without being @mentioned.

    ![Bot without at mention](~/bots/how-to/conversations/Media/botreceivingmessage-noatmention.png)

# [Chat messages](#tab/chat)

The following steps guide you to sideload and validate bot that receives all chat messages without being @ mentioned in a chat:

1. Select or create a group chat.
1. Select the ellipses &#x25CF;&#x25CF;&#x25CF; from the group chat. The drop-down menu appears.
1. Select **Manage apps** from the drop-down menu:

   ![Manage apps in team](~/assets/images/bots/Chats_Manage_Apps_Entry.png)

1. Select **Upload a custom app** from the lower right corner of **Manage apps**:

    ![Uploading custom app](~/assets/images/bots/Chats_Manage_Apps_Page.png)

1. Select the app package from the **Open** dialog box.
1. Select **Open**:

    ![Selecting app package](~/assets/images/bots/Chats_Sideload_App_FilePicker.png)

1. Select **Add** from the app details pop-up, to add the bot to your selected group chat:

    ![Adding the bot](~/assets/images/bots/Chats_Install_Dialog.png)

1. Enter a message in the group chat for your bot:

   ![Bot receives message](~/assets/images/bots/Bot_ReceiveMessage.png)

   The bot receives the message without being @mentioned:

   ![No mention](~/assets/images/bots/Bot_NoMention.png)

---

## Code snippets

The following code provides an example of RSC permissions:

# [C#](#tab/dotnet)

```csharp

// Handle when a message is addressed to the bot. 
// When rsc is enabled the method will be called even when bot is addressed without being @mentioned
protected override async Task OnMessageActivityAsync(ITurnContext<IMessageActivity> turnContext, CancellationToken cancellationToken)
{
		await turnContext.SendActivityAsync(MessageFactory.Text("Using RSC the bot can receive messages across channels or chats in team without being @mentioned."));
}
```

# [Node.js](#tab/nodejs)

```javascript

// Handle when a message is addressed to the bot. 
// When rsc is enabled the method will be called even when bot is addressed without being @mentioned
this.onMessage(async (context, next) => {
   await context.sendActivity(MessageFactory.text("Using RSC the bot can receive messages across channels or chats in team without being @mentioned."))
   await next();
});
```

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
