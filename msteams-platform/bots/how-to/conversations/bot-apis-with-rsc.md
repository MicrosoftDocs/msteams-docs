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

Using resource-specific consent (RSC) permissions, a bot can now receive a message even when it is not @mentioned by a user. Bots can receive all channel messages in a team when consented to and installed. Earlier, a bot was only able to receive a message when it was @mentioned by a user.

RSC enables team owners to consent to more permissions for apps in Teams. You can specify permissions that apps require in the application manifest. Users review and consent to permissions when you enable bots to receive all channel messages.

> [!NOTE]
> Only team owners can add and consent to RSC permissions.

## Enable bots to receive all channel messages

The `ChannelMessage.Read.Group` RSC permission is now extended to bots. Graph applications are able to get all messages in a conversation. Bots can receive all messages in a channel without being @mentioned with specific permissions and user consent.

**To add bots to a team and receive all channel messages**

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

## App manifest example

You can configure an app manifest for a Teams app with an Azure Active Directory (AAD) application and resource-specific permissions that are used to check and authorize calls to Graph. In the `webApplicationInfo` property, the `ChannelMessage.Read.Group` RSC permission is extended to support bots.

The following code provides an example of the app manifest:

```json
"webApplicationInfo": {
    "id": "AAD App ID",
    "resource": "Resource URL for acquiring auth token for SSO",
    "applicationPermissions": [
      "TeamSettings.Read.Group",
      "ChannelSettings.Read.Group",
      "ChannelSettings.Edit.Group",
      "Channel.Create.Group",
      "Channel.Delete.Group",
      "ChannelMessage.Read.Group",
      "TeamsApp.Read.Group",
      "TeamsTab.Read.Group",
      "TeamsTab.Create.Group",
      "TeamsTab.Edit.Group",
      "TeamsTab.Delete.Group",
      "Member.Read.Group",
      "Owner.Read.Group",
      "Member.ReadWrite.Group",
      "Owner.ReadWrite.Group"
    ],
},
```

## See also

* [Bot conversations](/bots/how-to/conversations/conversation-basics)
* [Resource-specific consent](/resource-specific-consent)
* [Test resource-specific consent](/graph-api/rsc/test-resource-specific-consent)
