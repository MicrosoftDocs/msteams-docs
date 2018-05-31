---
title: Features in the Public Developer Preview
description: Describes the features in the Public Developer Preview of Microsoft Teams
keywords: teams preview developer features
ms.date: 05/28/2018
---
# Features in the Public Developer Preview for Microsoft Teams

The developer preview includes the following new features:

* [Sending and receiving files through your bot](~/concepts/bots/bots-files)
* Adaptive Cards: [Adaptive card](~/concepts/cards/cards-reference#adaptive-card-supported-in-developer-preview-only), [Adaptive card actions in Teams](~/concepts/cards/cards-actions#adaptive-card-actions-supported-in-developer-preview-only).
* Tabs and bots in chats: See the following section for details on this feature.  When the feature is out of developer preview this content will be merged into the live doc set.

## Adding tabs and bots to chats

Chats are conversations between one or more users in Teams. Tabs and bots can now be added to chats. In the past they could only be added to channels and personal (bot to user) conversations.

This feature allows you to:

* Add tabs to chats
* Add bots to chats

To enable this feature use the new scope `groupchat` in the manifest definition for bots and tabs. You must  use the preview schema (1.3) in order to use this feature. You can find the schema here: `https://statics.teams.microsoft.com/sdk/v1.3.0-beta.2/manifest/MicrosoftTeams.schema.json`.

The [Developer preview manifest](~/resources/schema/manifest-schema-dev-preview) documentation has also been updated to include this scope.

Tab support is limited to configurable tabs.

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

See [Bot notifications](~/concepts/bots/bots-notifications) for more details on bots and events before these changes.

### Group chats are similar to channel chats

Group chat conversations behave very similarly to channel conversations with bots, so the information in the [Interact in a team channel with a Microsoft Teams bot](~/concepts/bots/bot-conversations/bots-conv-channel) topic may also be helpful. The main difference is that group chat does not support threaded conversations.

### Tab changes to getContext()

`isChat` is returned by `getContext` to indicate whether or not the tab is in a chat.

### Testing your app

To test your app, open up a chat and click *Add apps* in the header. From there you can access *Add custom app* to upload your app package.

### Preview manifest

The [Developer preview manifest](~/resources/schema/manifest-schema-dev-preview) has been updated to include this feature.

See [What is the Public Developer Preview for Microsoft Teams?](~/resources/general/developer-preview) for more information on enabling it for your development tenant.

### Samples

The samples in this section have been updated to include this feature:

* [Featured code samples](~/samples/code-samples#featured)

### Known issues

* The UI shown in Developer Preview is still being developed
* Custom defined app icons are currently not working in chat
* If you upload an app with a bot to a chat in the *Developer Preview* version of Teams, and you switch back to the *Public* version, there might be some UI or behavior inconsistencies. If you run into any issues, please uninstall the app in *Developer Preview*
* Bot menus do not currently work with the `groupchat` scope
* Deeplinks into tabs in group chat do not work
* There is a limit of 5 uploaded apps per chat