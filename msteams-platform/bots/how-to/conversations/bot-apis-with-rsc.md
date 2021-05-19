---
title: Receive all channel messages with RSC
author: surbhigupta12
description: Receive all channel messages with RSC permissions
ms.topic: conceptual
localization_priority: Normal
---

# Receive all channel messages with RSC

> [!NOTE]
> This feature is available in public developer preview.

The resource-specific consent (RSC) permissions model, originally developed for Teams Graph APIs, is now extended to bot scenarios.

Currently, bots can only receive user channel messages when they are @mentioned. Using RSC, you can now request team owners to consent for a bot to receive user messages across all channels in a team without using @mention. This capability is enabled by specifying the `ChannelMessage.Read.Group` permission in the manifest of an RSC enabled Teams app. After configuration, Team owners can grant consent during the app installation process.

For more information about enabling RSC for your app, see [resource-specific consent in Teams](/microsoftteams/platform/graph-api/rsc/resource-specific-consent#update-your-teams-app-manifest).

## Enable bots to receive all channel messages

The `ChannelMessage.Read.Group` RSC permission is now extended to bots. With user consent, this permission allows graph applications to get all messages in a conversation and bots to receive all channel messages without being @mentioned.

## Update App Manifest

For your bot to receive all channel messages, RSC must be configured in the Teams app manifest with the `ChannelMessage.Read.Group` permission specified in the `webApplicationInfo` property.
The following is an example of the `webApplicationInfo` object:
* **id**: Your Azure AD app ID. This can be the same as your bot id.
* **resource**: Any string. This field has no operation in RSC, but must be added and have a value to avoid an error response. 
* **applicationPermissions**: RSC permissions for your app with `ChannelMessage.Read.Group` specified. For more information on RSC permissions, see [Resource-specific Permissions](/microsoftteams/platform/graph-api/rsc/resource-specific-consent#resource-specific-permissions). 

The following code provides an example of the app manifest:

```json
"webApplicationInfo": {
"id": "XXxxXXXXX-XxXX-xXXX-XXxx-XXXXXXXxxxXX",
"resource": "https://AnyString",
"applicationPermissions": [
"ChannelMessage.Read.Group"
    ]
  }
```

## Receive channel messages with RSC 

To receive all channel messages in a team with RSC without being @mentioned, follow these steps:

1. Select or create a team.
1. Select **More options** from the left pane. The drop-down menu appears.
1. Select **Manage team** from the drop-down menu. The details appear.
1. Select **Apps**. Multiple apps appear.
1. Select **Upload a custom app** from the lower right corner. The **Open** dialog box appears.
1. Select the app package.
1. Select **Open**. The app details pop-up appears.
1. Select **Add** to add the bot to your selected team.
1. Select a channel and enter a message in the channel for your bot.
   The bot receives the message without being @mentioned.

## See also

* [Bot conversations](/bots/how-to/conversations/conversation-basics)
* [Resource-specific consent](/resource-specific-consent)
* [Test resource-specific consent](/graph-api/rsc/test-resource-specific-consent)
* [Upload custom app in Teams](/concepts/deploy-and-publish/apps-upload)
