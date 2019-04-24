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

## Adding bots to chats

Chats are conversations between one or more users in Teams. Bots can now be added to chats. In the past they could only be added to channels and personal (bot to user) conversations.

This feature allows you to:

* Add bots to chats

To enable this feature use the new scope `groupchat` in the manifest definition for bots. You must use the preview schema (1.3) in order to use this feature. You can find the schema here: `https://developer.microsoft.com/en-us/json-schemas/teams/v1.3/MicrosoftTeams.schema.json`.

The [Developer preview manifest](~/resources/schema/manifest-schema-dev-preview.md) documentation has also been updated to include this scope.

### Bot event changes

All events sent to your bot have been updated to have a new `conversationType` field that returns one of the following three values for the conversation:

* `personal` – chat between a bot and a user
* `groupChat` – chat between a bot and two or more users
* `channel` – chat between a bot and members of a team

```json
    "conversation": {
        "id": "19:efa9296d959346209fea44151c742e73@thread.skype",
        "conversationType": "groupChat",
        "isGroup": true,
    },
```

* If `conversationType` is `groupChat` or `channel`, then the `isGroup` field is included and set to true for backwards compatibility
* if `conversationType` is `personal`, then the `isGroup` field is not included

Bots will receive the following events in group chat. These events are a subset of the events bots receive in channel conversations.

* Bot added (conversationUpdate activity)
* Member added (conversationUpdate activity)
* Member removed (conversationUpdate activity)
* Message (message activity)
* Like added/removed (messageReaction activity)

See [Bot notifications](~/concepts/bots/bots-notifications.md) for more details on bots and events before these changes.

### Group chats are similar to channel chats

Group chat conversations behave very similarly to channel conversations with bots, so the information in the [Interact in a team channel with a Microsoft Teams bot](~/concepts/bots/bot-conversations/bots-conv-channel.md) topic may also be helpful. The main difference is that group chat does not support threaded conversations.

### Testing your app

To test your app, open up a chat and click Manage apps from the tab gallery or by right clicking your chat on the left chat rail. From there you can access Upload a custom app to upload your app package.

### Preview manifest

The [Developer preview manifest](~/resources/schema/manifest-schema-dev-preview.md) has been updated to include this feature.

See [What is the Public Developer Preview for Microsoft Teams?](~/resources/dev-preview/developer-preview.md) for more information on enabling it for your development tenant.

### Known issues

* If you upload an app with a bot to a chat in the *Developer Preview* version of Teams, and you switch back to the *Public* version, there might be some UI or behavior inconsistencies. If you run into any issues, please uninstall the app in *Developer Preview*
* Bot menus do not currently work with the `groupchat` scope
* There is a limit of 5 uploaded apps per chat