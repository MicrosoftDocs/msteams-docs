---
title: Combine bots with tabs
description: In this article, you'll learn how to use tabs and bots together, constructing deep links to tabs in messages from your bot, and teams bots tabs development
ms.topic: conceptual
ms.localizationpriority: medium
ms.date: 03/15/2018
---
# Combine bots with tabs

[!include[v3-to-v4-SDK-pointer](~/includes/v3-to-v4-pointer-bots.md)]

Bots and tabs work together, and are often combined into a single back-end service. This section describes best practices and common patterns for using tabs and bots together.

## Associating user identities across bot and tab

For example:
Suppose your tab application uses a proprietary ID system to secure its content. Suppose you also have a bot that can interact with the user. Typically, you’ll want to show content in the tab that is specific to the viewing user. The challenge is that the user ID in your system is likely different from the Microsoft Teams user ID. So how do you associate these two identities?
In general, the recommended approach is to sign the user in with the bot using the same identity system used to provide authentication for the tab content. You can implement via the sign in action, which typically signs the user via an OAuth flow.

This flow works best if your identity provider implements the OAuth 2.0 protocol. You can then associate the Teams user ID with the user’s credentials from your own identity service.

   :::image type="content" source="../../assets/images/bots/associating_contexts.png" alt-text="Screenshot shows the associating identities.":::

## Constructing deep links to tabs in messages from your bot

You want to use tabs to show more content that can fit inside of a card, or provide a way to complete complex form-filling tasks using the tab canvas. For example, consider navigating the user to the tab when the user selects the card from your bot. For this to happen, you’ll need to encode your bot’s message to include a [deep link](~/concepts/build-and-test/deep-links.md) URL, either through markup or as the target of the openUrl action.

Deep links rely on an entityId, which is an opaque value that maps to a unique entity in your system. When the tab is created, you store some simple state. For example, flag on your backend indicating the tab is created in the channel. When your bot constructs a message, it can target the entityId associated with that tab.

> [!NOTE]
> In personal chats, because tabs are *static* and installed with the app, you can always assume their existence and thus construct deep links accordingly.

## Sending notifications for tab updates

Often you’ll want to notify the end user whenever an update or a user action occurs in a tab. An example scenario is assigning a task or ticket to a fellow team member and then notifying that team member.

There are two ways of achieving this scenario:

1. If you wish to notify an entire channel, your bot can asynchronously post a message to the channel. There's no way for a bot to proactively create the tab conversation if it wasn't created with the tab.

2. If you wish to only notify the recipient or interested parties involved with the action, your bot can send a personal chat message to the user. You should first check to see if a personal conversation between your bot and the user exists. If not, you can call `CreateConversation` to initiate the personal chat.

In both cases, use event notifications wisely and never spam the user with unnecessary updates.

## See also

* [Add capabilities to Microsoft Teams app](../../toolkit/add-capability.md)
