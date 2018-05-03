---
title: Features in the Public Developer Preview
description: Describes the features in the Public Developer Preview of Microsoft Teams
keywords: teams preview developer features
ms.date: 01/31/2018
---
# Features in the Public Developer Preview for Microsoft Teams

As of 04/26/2018 these are the features in Developer Preview. These features are still in development and may change before they are released publicly.

When new items are added they will be listed here.

## Adding tabs and bots to chats

Chats are conversations between one or more users in Teams. Tabs and bots can now be added to chats. In the past they could only be added to channels and personal (bot to user) conversations.

This feature allows you to:

* Add tabs to chats
* Add bots to chats

To enable this feature use the new scope `groupchat` in the manifest definition for bots and tabs. The [Developer preview manifest](~/resources/schema/manifest-schema-dev-preview) has been updated to include this feature.

Tab support is limited to configurable tabs.

### Event changes

All events have been updated to have a new `conversationType` field that returns one of the following three values for the conversation:

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

### Changes to getContext()

`isChat` is returned by `getContext` to indicate whether or not the tab is in a chat.

### Testing your app

To test your app, open up a chat and click *Add apps* in the header. From there you can access *Add custom app* to upload your app package.

### Known issues

* The UI shown in Developer Preview is still being developed
* Custom defined app icons are currently not working in chat
* If you upload an app with a bot to a chat in the *Developer Preview* version of Teams, and you switch back to the *Public* version, there might be some UI or behavior inconsistencies. If you run into any issues, please uninstall the app in *Developer Preview*
* Bot menus do not currently work with the 'groupChat' scope
* Deeplinks into tabs in group chat do not work
* There is a limit of 5 uploaded apps per chat

### Preview manifest

The [Developer preview manifest](~/resources/schema/manifest-schema-dev-preview) has been updated to include this feature.