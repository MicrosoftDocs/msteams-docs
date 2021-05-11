---
title: Bots APIs with RSC permissions
author: surbhigupta12
description: Aligning Bot APIs with RSC permissions.
ms.topic: conceptual
localization_priority: Normal
---

# Bot APIs with RSC permissions

Currently, without this feature, a bot is only able to receive a message when it is @ mentioned by a user. This feature enables developers to remove that requirement using RSC permissions so that bots can receive all channel messages in a team when consented to and installed.

Prior to the Resource Specific Consent (RSC) feature, admins can only grant all-or-nothing permission to apps in groups. RSC support for Graph was recently rolled out for teams and channels to all users. This document presents a vision for aligning the permissions of bots in Teams with RSC to allow Azure Active Directory (AAD) to be the central place to control permissions of apps.

## Current bot permissions

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

The consent screen is shown to the users when they are trying to add a bot into a team. It is not a simple task to allow a bot to do an operation that is not already covered in the list of permissions.

Until now, upon being consented, the corresponding bot is added to the participant roster of the underlying chat service thread backing the 1:1, group-chat, or channel and is limited to the list of permissions for that thread.

### Bot events RSC integration

Eventing scenarios consist of any notification sent to a bot triggered by a user action in teams.  

To start converging the permission model, integrate RSC for a scenario that can be supported with an existing permission where bot receives all channel messages in team. This includes the capability to remove bot at mention.

RSC permission is `ChannelMessage.Read.Group`.
