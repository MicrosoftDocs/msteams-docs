---
title: Features in the Public Developer Preview
description: Describes the features in the Public Developer Preview of Microsoft Teams
keywords: teams preview developer features
ms.date: 03/15/2019
---

# Features in the Public Developer Preview for Microsoft Teams

When these features are out of developer preview this content will be merged into the live doc set.
The developer preview includes the following new features:

## Respond to message extension submit action with an adaptive card message sent from a bot

You can also respond to the submit action by inserting a message with an [adaptive card](~/concepts/cards/cards.md#adaptive-cards) into the channel with a bot. Your user will be able to preview the message before submitting it, and potentially edit/interact with it as well. This can be very useful in scenarios where you need to gather information from your users before creating an adaptive card response. The following scenario shows how you can use this flow to configure a poll without including the configuration steps in the channel message. See [Respond with an adaptive card message sent from a bot](~/concepts/messaging-extensions/create-extensions.md#respond-with-an-adaptive-card-message-sent-from-a-bot).

## Trigger messaging extension from links inserted into the compose message box

You can now configure your messaging extension to respond to a URL inserted into the compose message box similarly to a user using your messaging extension for search. This allows you to automatically resolve the URL into a card. See [Receive requests from links inserted into the compose message box](~/concepts/messaging-extensions/search-extensions.md#receive-requests-from-links-inserted-into-the-compose-message-box) for more information.

## Deep linking to a chat

You can now create deep links to private chats between users. You can link to an existing chat, or you can specify a set of chat participants to start a new chat. See [Deep linking to a chat](~/concepts/deep-links.md#deep-linking-to-a-chat) for more details.

## Calls and online meeting bots

With the addition of [Microsoft Graph APIs for calls and online meetings](https://developer.microsoft.com/en-us/graph/docs/api-reference/beta/resources/calls-api-overview.md), Microsoft Teams apps can now interact with users in rich ways using voice and video. These APIs allow you to add new app features such as interactive voice response (IVR), call control, and access to real-time audio and/or video streams for calls and meetings, including desktop and app sharing.

We've added a new section on how to create and develop calls and online meetings bots, starting with the [overview](~/concepts/calls-and-meetings/calls-meetings-bots-overview.md).

## Preview manifest

The [Developer preview manifest](~/resources/schema/manifest-schema-dev-preview.md) has been updated to include this feature.

See [What is the Public Developer Preview for Microsoft Teams?](~/resources/dev-preview/developer-preview.md) for more information on enabling it for your development tenant.

## Known issues

* If you upload an app with a bot to a chat in the *Developer Preview* version of Teams, and you switch back to the *Public* version, there might be some UI or behavior inconsistencies. If you run into any issues, please uninstall the app in *Developer Preview*
* Bot menus do not currently work with the `groupchat` scope
* There is a limit of 5 uploaded apps per chat