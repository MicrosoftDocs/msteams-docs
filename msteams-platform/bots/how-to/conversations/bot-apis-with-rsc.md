---
title: Receive all channel messages with RSC
author: surbhigupta12
description: Receive all channel messages with RSC permissions
ms.topic: conceptual
localization_priority: Normal
---

# Receive all channel messages with RSC

Currently, without this feature, a bot is only able to receive a message when it is @ mentioned by a user. This feature enables developers to remove that requirement using resource-specific consent (RSC) permissions so that bots can receive all channel messages in a team when consented to and installed.

This feature is built on top of existing capabilities in Teams with some control mechanisms that are already released for Graph. This feature is built on RSC and extends the permissions to bot APIs.

## Background about RSC

RSC enables team owners to consent to more permissions for apps in Teams. You can specify specific permissions apps require in the application manifest. Users review and consent to permissions during the app installation process. Currently, RSC only applies on Graph calls for team resources using the application permissions context. But RSC permissions are now extended to bot APIs.

Here are some of the functionalities that are blocked on granting additional permissions to bots:

* Read receipts
* Getting tags in a team
* Receive new messages without being mentioned
* List teams, group-chats, meetings, and 1:1s where bot is added
* Create group-chats
* Add, edit, or remove reactions on messages
* Mention channels
* Meeting events

Each bot in Teams when added to a context that is 1:1, group-chat, or team, is limited by the same set of permissions in that context as shown in the following image:

![App permissions](~/assets/images/bots/apppermissions.png)

The consent screen is shown to the users when they are trying to add a bot into a team.

On being consented, the corresponding bot is added to the participant roster of the underlying chat service thread backing the 1:1, group-chat, or channel and is limited to the list of permissions for that thread.

For more information, see [bot conversations](/bots/how-to/conversations/conversation-basics), [resource-specific consent](/resource-specific-consent), [test resource-specific consent](/graph-api/rsc/test-resource-specific-consent), and [resource-specific permissions](/graph-api/rsc/resource-specific-consent).

### User tenant requirements

Before the RSC feature, Admins were only able to grant all-or-nothing permission to apps in groups. RSC support for Graph is recently provided to all users.

## Enable bots to receive all channel messages

Eventing scenarios consist of any notification sent to a bot triggered by a user action in teams.  

To start converging the permission model, integrate RSC for a scenario that can be supported with an existing permission where bot receives all channel messages in team. This includes the capability to remove bot at mention.

RSC permission that is added to app manifest is `ChannelMessage.Read.Group` is extended to bots. Graph applications are able to get all messages in a conversation. If these permissions are specified and the user consents to it, bots are able to receive all messages in a channel without being @mentioned.

**To add bots to a team and receive all channel messages**

1. Select or create a team, select **More options** for that team from the left pane, and select **Manage team** from the drop-down menu.
1. Select **Apps** from the section.
1. Select **Upload a custom app** from the lower right corner.
1. In the **Open** dialog box, select the app manifest you want to use, and select **Open**.

    ![Permissions for app installation](~/assets/images/bots/permissions.png)

1. Select **Add** to add the bot to your selected team.
1. On the **General** page, enter a message in the channel for your bot.

The bot receives the message without being @mentioned.

## Changes to app manifest

You can configure an app manifest for a Teams app with an Azure Active Directory (AAD) application and resource-specific permissions that are used to check and authorize calls to Graph.

The following code provides an example of changes to app manifest:

```json

```