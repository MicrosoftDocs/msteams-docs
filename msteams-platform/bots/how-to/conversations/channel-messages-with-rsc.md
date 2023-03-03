---
title: Receive all conversation messages with RSC
author: surbhigupta12
description: Enable bots to receive all conversation messages without being @mentioned using RSC permissions. Read on webApplicationInfo or authorization section in manifest.
ms.topic: conceptual
ms.localizationpriority: medium
---

# Receive all conversation messages with RSC

The resource-specific consent (RSC) permissions model, originally developed for Microsoft Teams Graph APIs, is being extended to bot scenarios. With RSC, conversation owners can consent for a bot to receive all user messages in standard channels and chats without being @mentioned. This can be enabled by specifying the `ChannelMessage.Read.Group` or `ChatMessage.Read.Chat` permission strings in your Teams app manifest. Conversation owners can grant consent during the app installation or upgrade process after the app updates are published. For more information about enabling RSC for your app and inside of a tenant, see [resource-specific consent](../../../graph-api/rsc/resource-specific-consent.md).

## Enable bots to receive all channel or chat messages

The `ChannelMessage.Read.Group` and `ChatMessage.Read.Chat` RSC permissions are being extended to bots. With user consent and app installation, these permissions:

* Allow a specified graph application to get all messages in channels and chats, respectively.
* Enable a bot defined in the app manifest to receive all conversations messages without being @mentioned in relevant contexts where the permissions apply.

### Filtering at mention messages

```csharp
// When ChannelMessage.Read.Group or ChatMessage.Read.Chat RSC is in the app manifest, this method is called even when bot is not @mentioned.
// This code snippet allows the bot to ignore all messages that do not @mention the bot.
protected override async Task OnMessageActivityAsync(ITurnContext<IMessageActivity> turnContext, CancellationToken cancellationToken)
{
        // Ignore the message if bot was not mentioned. 
        // Remove this if block to process all messages received by the bot.
        if (!turnContext.Activity.GetMentions().Any(mention => mention.Mentioned.Id.Equals(turnContext.Activity.Recipient.Id, StringComparison.OrdinalIgnoreCase)))
        {
            return;
        }
        // Sends an activity to the sender of the incoming activity.
        await turnContext.SendActivityAsync(MessageFactory.Text("Using RSC the bot can receive messages across channels or chats in team without being @mentioned."));
}
```

> [!IMPORTANT]
>
> * Services that need access to all Teams message data must use the Graph APIs that provide access to archived data in channels and chats.
> * Bots must use the `ChannelMessage.Read.Group` and `ChatMessage.Read.Chat` RSC permission appropriately to build and enhance engaging experience for users to pass the store approval. The app description must include how the bot uses the data it reads.
> * The `ChannelMessage.Read.Group` and `ChatMessage.Read.Chat` RSC permission may not be used by bots to extract large amounts of customer data.
> * The ability for bots to receive all messages in chats using `ChatMessage.Read.Chat` is available only in [public developer preview for Teams](../../../resources/dev-preview/developer-preview-intro.md) and is only enabled after a re-installation or new installation into a chat.
> * After the RSC permissions are enabled, the bot continues to receive all messages even when the client switches out of public developer preview.
> * If you have an app that's using the `ChatMessage.Read.Chat` RSC permission for Graph scenarios, then test the app following the steps in [sideload in a conversation](channel-messages-with-rsc.md?tabs=chat%2Cdotnet#sideload-in-a-conversation) and modify the app before the feature is [generally available](https://www.microsoft.com/en-us/microsoft-365/roadmap?filters=&searchterms=receive%2Call%2Cgroup%2Cchat%2Cmessages). If you don't want your bot to receive all chat messages, implement the following [code snippet](#filtering-at-mention-messages). If no action is taken, your bot will receive all messages after new installations.

## Update app manifest

For your bot to receive all conversation messages, the relevant RSC permission strings must be specified in the `authorization.permissions.resourceSpecific` property of your Teams app manifest. For more information about manifest schema, see [app manifest schema for Teams](../../../resources/schema/manifest-schema.md).

:::image type="content" source="../../../assets/images/bots/RSC/appmanifest_2.png" alt-text="app manifest":::

The following code provides an example of the app manifest:

* **webApplicationInfo.id**: Your Microsoft Azure Active Directory (AAD) app ID. The app ID can be the same as your bot ID.
* **webApplicationInfo.resource**: Any string. The resource field has no operation in RSC, but must be added with a value to avoid error response.
* **authorization.permissions.resourceSpecific**: RSC permissions for your app with either or both `ChannelMessage.Read.Group` and `ChatMessage.Read.Chat` specified. For more information, see [resource-specific permissions](/microsoftteams/platform/graph-api/rsc/resource-specific-consent#resource-specific-permissions).

The following code provides an example of the app manifest version 1.12 or higher:

```json
{
    "$schema": "https://developer.microsoft.com/en-us/json-schemas/teams/v1.12/MicrosoftTeams.schema.json",
    "manifestVersion": "1.12",
    "version": "1.0.0",
    "id": "8239c8f3-ed78-4512-933e-babfd28856f1",
    "packageName": "com.contoso.rscechobot",
    "developer": {
        "name": "Contoso",
        "websiteUrl": "https://www.contoso.com",
        "privacyUrl": "https://www.contoso.com/privacy",
        "termsOfUseUrl": "https://www.contoso.com/tos"
    },
    "icons": {
        "color": "color.png",
        "outline": "outline.png"
    },
    "name": {
        "short": "RscEchoBot",
        "full": "Echo bot with RSC configured for all conversation messages"
    },
    "description": {
        "short": "Echo bot with RSC configured for all channel and chat messages",
        "full": "Echo bot configured with all channel and chat messsages RSC permission in manifest"
    },
    "accentColor": "#FFFFFF",
    "staticTabs": [
        {
            "entityId": "conversations",
            "scopes": [
                "personal"
            ]
        },
        {
            "entityId": "about",
            "scopes": [
                "personal"
            ]
        }
    ],
    "webApplicationInfo": {
        "id": "07338883-af76-47b3-86e4-2603c50be638",
        "resource": "https://AnyString"
    },
    "authorization": {
        "permissions": {
            "resourceSpecific": [
                {
                    "type": "Application",
                    "name": "ChannelMessage.Read.Group"
                },
                {
                    "type": "Application",
                    "name": "ChatMessage.Read.Chat"
                }
            ]
        }
    },
    "bots": [
        {
            "botId": "07338883-af76-47b3-86e4-2603c50be638",
            "scopes": [
                "personal",
                "team",
                "groupchat"
            ],
            "supportsFiles": false,
            "isNotificationOnly": false
        }
    ],
    "permissions": [
        "identity",
        "messageTeamMembers"
    ],
    "validDomains": []
}
```

## Sideload in a conversation

# [Channel messages](#tab/channel)

The following steps guide you to sideload and validate bot that receives all channel messages in a Team without being @mentioned:

1. Select or create a team.
1. Select &#x25CF;&#x25CF;&#x25CF; from the left pane. The dropdown menu appears.
1. Select **Manage team** from the dropdown menu.

   :::image type="content" source="Media/managingteam.png" alt-text="Screenshot of Managing team option in Teams application.":::

1. Select **Apps**. Multiple apps appear.

1. Select **Upload a custom app** from the lower right corner.

      :::image type="content" source="Media/uploadingcustomapp.png" alt-text="Screenshot of upload a custom app option.":::
  
1. Select **Open**.

      :::image type="content" source="Media/selectapppackage.png" alt-text="Screenshot of the open dialog box to select the app package." lightbox="Media/selectapppackage.png":::

1. Select **Add** from the app details pop-up, to add the bot to your selected team.

      :::image type="content" source="Media/addingbot.png" alt-text="Screenshot of the Add button to add a bot to a team." lightbox="Media/addingbot.png":::

1. Select a channel and enter a message in the channel for your bot.

    The bot receives the message without being @mentioned.

      :::image type="content" source="Media/botreceivingmessage.png" alt-text="Screenshot of a bot receiving message in a channel." lightbox="Media/botreceivingmessage.png":::

# [Chat messages](#tab/chat)

The following steps guide you to sideload and validate bot that receives all chat messages in [public developer preview](../../../resources/dev-preview/developer-preview-intro.md) without being @mentioned in a chat:

1. Switch the client to public developer preview (select **About** > **Developer preview**).
1. Select or create a group chat.
1. Select the ellipses &#x25CF;&#x25CF;&#x25CF; from the group chat. The dropdown menu appears.
1. Select **Manage apps** from the dropdown menu.

   :::image type="content" source="../../../assets/images/bots/Chats_Manage_Apps_Entry.png" alt-text="Manage apps in team.":::

1. Select **Upload a custom app** from the lower right corner of **Manage apps**.

   :::image type="content" source="../../../assets/images/bots/Chats_Manage_Apps_Page.png" alt-text="Uploading custom app.":::

1. Select the app package from the **Open** dialog box.
1. Select **Open**.

   :::image type="content" source="../../../assets/images/bots/Chats_Sideload_App_FilePicker.png" alt-text= "Selecting app package.":::

1. Select **Add** from the app details pop-up, to add the bot to your selected group chat.

   :::image type="content" source="../../../assets/images/bots/Chats_Install_Dialog.png" alt-text="Adding the bot.":::

1. Enter a message in the group chat for your bot.

   :::image type="content" source="../../../assets/images/bots/Bot_ReceiveMessage.png" alt-text="Bot receives message.":::

   The bot receives the message without being @mentioned.

   :::image type="content" source="../../../assets/images/bots/Bot_NoMention.png" alt-text="No mention.":::

---

## Code snippets

The following code provides an example of the RSC permissions:

# [C#](#tab/dotnet)

* [SDK reference](/dotnet/api/microsoft.bot.builder.activityhandler.onmessageactivityasync?view=botbuilder-dotnet-stable&preserve-view=true)
* [Sample code reference](https://github.com/OfficeDev/Microsoft-Teams-Samples/blob/main/samples/meetings-token-app/csharp/Bots/TokenBot.cs#L52)

```csharp

// Handle when a message is addressed to the bot.
// When rsc is enabled the method will be called even when bot is addressed without being @mentioned.
protected override async Task OnMessageActivityAsync(ITurnContext<IMessageActivity> turnContext, CancellationToken cancellationToken)
{
        // Sends an activity to the sender of the incoming activity.
         await turnContext.SendActivityAsync(MessageFactory.Text("Using RSC the bot can receive messages across channels or chats in team without being @mentioned."));
}

```

# [Node.js](#tab/nodejs)

* [SDK reference](/javascript/api/botbuilder/teamsactivityhandler?view=botbuilder-ts-latest#botbuilder-teamsactivityhandler-onmessage&preserve-view=true)
* [Sample code reference](https://github.com/OfficeDev/Microsoft-Teams-Samples/blob/main/samples/app-localization/nodejs/server/bot/botActivityHandler.js#L25)

```javascript

// Handle when a message is addressed to the bot.
// When rsc is enabled the method will be called even when bot is addressed without being @mentioned.

this.onMessage(async (context, next) => {
    // Sends a message activity to the sender of the incoming activity.
   await context.sendActivity(MessageFactory.text("Using RSC the bot can receive messages across channels or chats in team without being @mentioned."))
   await next();
});

```

---

## Code sample

| Sample name | Description | .NET |Node.js|
|-------------|-------------|------|----|
|Channel messages with RSC permissions| Microsoft Teams sample app demonstrating on how a bot can receive all channel messages with RSC without being @mentioned.|[View](https://github.com/OfficeDev/Microsoft-Teams-Samples/tree/main/samples/bot-receive-channel-messages-withRSC/csharp) |[View](https://github.com/OfficeDev/Microsoft-Teams-Samples/tree/main/samples/bot-receive-channel-messages-withRSC/nodejs) |

## See also

* [Bot conversations](/microsoftteams/platform/bots/how-to/conversations/conversation-basics)
* [Resource-specific consent](/microsoftteams/resource-specific-consent)
* [Test resource-specific consent](/microsoftteams/platform/graph-api/rsc/test-resource-specific-consent)
* [Upload custom app in Teams](~/concepts/deploy-and-publish/apps-upload.md)
* [List replies to messages in a channel](/graph/api/chatmessage-list-replies?view=graph-rest-1.0&tabs=http&preserve-view=true)
