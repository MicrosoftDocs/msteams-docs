---
title: Receive all channel messages with RSC
author: surbhigupta12
description: Receive all channel messages with RSC permissions
ms.topic: conceptual
localization_priority: Normal
---

# Receive all channel messages with RSC

Using resource-specific consent (RSC) permissions, a bot can now receive a message even when it is not @mentioned by a user. Bots can receive all channel messages in a team when consented to and installed. Earlier, a bot was only able to receive a message when it was @mentioned by a user.

RSC enables team owners to consent to more permissions for apps in Teams. You can specify permissions that apps require in the application manifest. Users review and consent to permissions during the app installation process.

> [!NOTE]
> RSC permissions are now extended to bot APIs. Earlier, RSC was only applicable to Graph calls for team resources, using the application permissions context. For more information, see [resource-specific permissions](~/graph-api/rsc/resource-specific-consent.md).

### User tenant requirements

The RSC support for Graph is provided to all users. Previously, only Admins were able to grant permission to apps in groups.

## Enable bots to receive all channel messages

With RSC and existing permissions, bot can receive all channel messages in team. This includes the capability to remove bot @mention.

The `ChannelMessage.Read.Group` RSC permission is added to the app manifest and is now extended to bots. Graph applications are able to get all messages in a conversation. Bots can receive all messages in a channel without being @mentioned with specific permissions and user consent.

**To add bots to a team and receive all channel messages**

1. Select or create a team.
1. Select **More options** from the left pane. The drop-down menu displays.
1. Select **Manage team** from the drop-down menu. The details appear.
1. Select **Apps**. Multiple apps are displayed.
1. Select **Upload a custom app** from the lower right corner. The **Open** dialog box is displayed.
1. Select the required app manifest.
1. Select **Open**. The app details pop-up is displayed.

    ![Permissions for app installation](~/assets/images/bots/permissions.png)

1. Select **Add** to add the bot to your selected team.
1. On the **General** page, enter a message in the channel for your bot.

The bot receives the message without being @mentioned.

## Changes to app manifest

You can configure an app manifest for a Teams app with an Azure Active Directory (AAD) application and resource-specific permissions that are used to check and authorize calls to Graph.

The following code provides an example of changes to app manifest:

```json

```

## See also

* [Bot conversations](/bots/how-to/conversations/conversation-basics)
* [Resource-specific consent](/resource-specific-consent)
* [Test resource-specific consent](/graph-api/rsc/test-resource-specific-consent)
