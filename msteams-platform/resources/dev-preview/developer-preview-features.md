---
title: Features in the Public Developer Preview
description: Describes the features in the Public Developer Preview of Microsoft Teams
keywords: teams preview developer features
ms.date: 12/07/2018
---
# Features in the Public Developer Preview for Microsoft Teams

When these features are out of developer preview this content will be merged into the live doc set.
The developer preview includes the following new features:

## Action-based commands for Messaging Extensions

The messaging extension infrastructure is being updated to include non-search based commands. This can be used to collect input from a user and make an update to your service. Possible examples include: Create a task, Create a work item, and start a build. See [messaging extension section](https://docs.microsoft.com/en-us/microsoftteams/platform/concepts/messaging-extensions) for more on this change.

## Deep linking to a chat

You can now create deep links to private chats between users. You can link to an existing chat, or you can specify a set of chat participants to start a new chat. See [Deep linking to a chat](~/concepts/deep-links#deep-linking-to-a-chat) for more details.

## Introducing "task modules"

A task module allows you to create modal popup experiences in your Teams application, from both bots and tabs. Inside the popup, you can run your own custom HTML/JavaScript code, show an `<iframe>`-based widget such as a YouTube or Microsoft Stream video, or display an [Adaptive card](https://docs.microsoft.com/en-us/adaptive-cards/).

Task module documentation has been added as a new section, including an [overview](~/concepts/task-modules/task-modules-overview), how to use task module from [tabs](~/concepts/task-modules/task-modules-tabs) and [bots](~/concepts/task-modules/task-modules-bots).

## Calls and online meeting bots

With the addition of [Microsoft Graph APIs for calls and online meetings](https://developer.microsoft.com/en-us/graph/docs/api-reference/beta/resources/calls-api-overview), Microsoft Teams apps can now interact with users in rich ways using voice and video. These APIs allow you to add new app features such as interactive voice response (IVR), call control, and access to real-time audio and/or video streams for calls and meetings, including desktop and app sharing.

We've added a new section on how to create and develop calls and online meetings bots, starting with the [overview](~/concepts/calls-and-meetings/calls-meetings-bots-overview).

## The tab configuration page is significantly taller

The height of the content area for the tab [Configuration page](~/concepts/tabs/tabs-configuration) will shortly be increased significantly; the width remains unchanged. It is important for you to update the tab configuration pages in your apps before this happens, otherwise your users will see your tab configuration page with a great deal of whitespace. (We have not finalized the date for this change as we cannot be sure how long it will take for most developers to update their apps, but it will likely be before the end of August, 2018.) 

<img width="450px" title="New sizes for configuration tabs" src="~/assets/images/tabs/config-dialog-Contoso2.png" />

Follow these guidelines to correctly format content in your tab configuration pages:

* Base the height of the content area in the tab on fixed-height graphic elements.
* Calculate available vertical space (the height of the content area in the configuration tab) using `window.innerHeight`. This returns the size of the `<iframe>` in which your configuration page resides, which may change in future releases. By using this value, your content will adjust automatically to future changes.
* Allocate vertical space to the variable-height elements minus what's needed for the fixed-height elements.
* For the *login* state, vertically and horizontally center the content.
* If you want a background image, you need either a new image, sized to fit the new area (preferred), or can keep the same image and choose between:
  * aligning to the upper left hand corner.
  * scaling the image to fit.

When properly sized, your tab configuration page should look similar to this:

<img width="450px" title="New configuration tab" src="~/assets/images/tabs/config-dialog-Contoso.png" />

## Adding bots to chats

Chats are conversations between one or more users in Teams. bBots can now be added to chats. In the past they could only be added to channels and personal (bot to user) conversations.

This feature allows you to:

* Add bots to chats

To enable this feature use the new scope `groupchat` in the manifest definition for bots. You must use the preview schema (1.3) in order to use this feature. You can find the schema here: `https://developer.microsoft.com/en-us/json-schemas/teams/v1.3/MicrosoftTeams.schema.json`.

The [Developer preview manifest](~/resources/schema/manifest-schema-dev-preview) documentation has also been updated to include this scope.

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

### Testing your app

To test your app, open up a chat and click Manage apps from the tab gallery or by right clicking your chat on the left chat rail. From there you can access Upload a custom app to upload your app package.

### Preview manifest

The [Developer preview manifest](~/resources/schema/manifest-schema-dev-preview) has been updated to include this feature.

See [What is the Public Developer Preview for Microsoft Teams?](~/resources/general/developer-preview) for more information on enabling it for your development tenant.

### Samples

The samples in this section have been updated to include this feature:

* [Featured code samples](~/samples/code-samples#featured)

### Known issues

* The UI shown in Developer Preview is still being developed
* If you upload an app with a bot to a chat in the *Developer Preview* version of Teams, and you switch back to the *Public* version, there might be some UI or behavior inconsistencies. If you run into any issues, please uninstall the app in *Developer Preview*
* Bot menus do not currently work with the `groupchat` scope
* There is a limit of 5 uploaded apps per chat