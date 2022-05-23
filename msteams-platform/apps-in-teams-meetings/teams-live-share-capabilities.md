---
title: Live Share getting started
description: Getting started with Live Share for Teams.
ms.topic: concept
ms.localizationpriority: high
ms.author: v-ypalikila
---

---

# Live Share capabilities

The Live Share SDK can be added to your meeting extension's `sidePanel` and `meetingStage` contexts with minimal effort. This article focuses on how to integrate the Live Share SDK into your app and key capabilities of the SDK.

> [!Note]
Currently, only scheduled meetings are supported, and all participants must be on the meeting calendar. Meeting types such as, one-on-one calls, group calls, and meet now are currently not supported.

## Install the JavaScript SDK

The [Live Share SDK](https://github.com/microsoft/live-share-sdk) is a JavaScript package published on [NPM](https://www.npmjs.com/package/@microsoft/live-share), and can be downloaded through npm or Yarn.

**NPM**

```bash
$ npm install @microsoft/live-share --save
```

**Yarn**

```bash
$ yarn add @microsoft/live-share
```

## Register RSC permissions

To enable the Live Share SDK for your meeting extension, you must first add the following RSC permissions into your app manifest:

```json
{
  // ...rest of your manifest here
  "configurableTabs": [
    {
        "configurationUrl": "https://<<BASE_URI_ORIGIN>>/config",
        "canUpdateConfiguration": false,
        "scopes": [
            "groupchat"
        ],
        "context": [
            "meetingSidePanel",
            "meetingStage"
        ]
    }
  ],
  "validDomains": [
    "<<BASE_URI_ORIGIN>>"
  ],
  "authorization": {​
    "permissions": {​
      "resourceSpecific": [
        // ...other permissions here​
        {​
          "name": "LiveShareSession.ReadWrite.Chat",​
          "type": "Delegated"
        },
        {​
          "name": "LiveShareSession.ReadWrite.Group",​
          "type": "Delegated"
        },
        {​
          "name": "MeetingStage.Write.Chat",​
          "type": "Delegated"
        },
        {​
          "name": "ChannelMeetingStage.Write.Group",​
          "type": "Delegated"
        }
      ]​
    }​
  }​
}
```

## Joining a meeting session

Follow the steps to join a session that is associated with a user's meeting: 

1. Initialize the Teams Client SDK
2. Initialize the [TeamsFluidClient](https://livesharesdk.z5.web.core.windows.net/classes/_microsoft_live_share.TeamsFluidClient.html)
3. Define the data structures you want to synchronize. For example, `SharedMap`.
4. Join the container

Let's look at the code.

```javascript
import * as microsoftTeams from "@microsoft/teams-js";
import { TeamsFluidClient } from "@microsoft/live-share";
import { SharedMap } from "fluid-framework";

// Initialize the Teams Client SDK
await microsoftTeams.app.initialize();

// Setup the Fluid container
const client = new TeamsFluidClient();
const schema = {
  initialObjects: { exampleMap: SharedMap },
};
const { container } = await client.joinContainer(schema);

// ... ready to start app sync logic
```

That's all it took to setup your container and join the meeting's session. Now, let's review the different types of _distributed data structures_ that you can use with the Live Share SDK.

## Fluid distributed data structures

The Live Share SDK supports any [distributed-data structure](https://fluidframework.com/docs/data-structures/overview/) included in Fluid Framework. Here's a quick overview of a few of the different types of objects available:

| Shared Object                                                                       | Description                                                                                                                                  |
| ----------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------- |
| [SharedMap](https://fluidframework.com/docs/data-structures/map/)                   | A distributed key-value store. Set any JSON-serializable object for a given key to synchronize that object for everyone in the session. |
| [SharedSegmentSequence](https://fluidframework.com/docs/data-structures/sequences/) | A list-like data structure for storing a set of items (called segments) at set positions.                                                    |
| [SharedString](https://fluidframework.com/docs/data-structures/string/)             | Distributed-string sequence optimized for editing document text editing.                                                                     |

Let's see how `SharedMap` works. In this example, we've used `SharedMap` to build a simple playlist feature.

```javascript
import { SharedMap } from "fluid-framework";
// ...
const schema = {
  initialObjects: { playlistMap: SharedMap },
};
const { container } = await client.joinContainer(schema);
const { playlistMap } = container.initialObjects;

// Listen for changes to values in the map
playlistMap.on("valueChanged", (changed, local) => {
  const video = playlistMap.get(changed.key);
  // Update UI with added video
});

function onClickAddToPlaylist(video) {
  // Add video to map
  playlistMap.set(video.id, video);
}
// ...
```

> [!Note]
> Core Fluid Framework DDS objects don't support meeting role verification. Everyone in the meeting will be able to change data stored through these objects.

## Live Share ephemeral data structures

The Live Share SDK includes a set of new ephemeral `SharedObject` classes, which provide stateful and stateless objects that aren't stored in the Fluid container. For example, if you want to create a laser-pointer feature into your app, such as the popular PowerPoint Live integration that might be better to use our `EphemeralEvent` or `EphemeralState` objects.

| Ephemeral Object                                                                                                       | Description                                                                                                                     |
| ---------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------- |
| [EphemeralPresence](https://livesharesdk.z5.web.core.windows.net/classes/_microsoft_live_share.EphemeralPresence.html) | See which users are online, set custom properties for each user, and broadcast changes to their presence.                       |
| [EphemeralEvent](https://livesharesdk.z5.web.core.windows.net/classes/_microsoft_live_share.EphemeralEvent.html)       | Broadcast individual events with any custom data attributes in the payload.                                                     |
| [EphemeralState](https://livesharesdk.z5.web.core.windows.net/classes/_microsoft_live_share.EphemeralState.html)       | Similar to SharedMap, a distributed key-value store that allows for restricted state changes based on role, for example, the presenter.|

### EphemeralPresence example

The `EphemeralPresence` class makes tracking who is attending a meeting easier than ever. When calling the `.start()` or `.updatePresence()` methods, developers can assign custom metadata for that user, such as a unique identifier or name.

```javascript
import { EphemeralPresence, PresenceState } from "@microsoft/live-share";
// ...
const schema = {
  initialObjects: { presence: EphemeralPresence },
};
const { container } = await client.joinContainer(schema);
const { presence } = container.initialObjects;

// Listen for changes to presence
presence.on("presenceChanged", (userPresence, local) => {
  // Update UI with presence
});

// Start tracking presence
presence.start("YOUR_CUSTOM_USER_ID", {
  name: "Anonymous",
  picture: "DEFAULT_PROFILE_PICTURE_URL",
});

function onUserDidLogIn(userName, profilePicture) {
  presence.updatePresence(PresenceState.online, {
    name: userName,
    picture: profilePicture,
  });
}
```

### EphemeralEvent example

`EphemeralEvent` is a great way to send simple events to other clients in a meeting. It's useful for scenarios like sending session notifications.

```javascript
import { EphemeralEvent } from "@microsoft/live-share";
// ...
const schema = {
  initialObjects: { notifications: EphemeralEvent },
};
const { container } = await client.joinContainer(schema);
const { notifications } = container.initialObjects;

// Listen for incoming notifications
notifications.on("received", (event, local) => {
  let notificationToDisplay;
  if (local) {
    notificationToDisplay = `You ${event.text}`;
  } else {
    notificationToDisplay = `${event.senderName} ${event.text}`;
  }
  // Display notification in your UI
});

// Start tracking notifications
await notifications.start();

notifications.sendEvent({
  senderName: "LOCAL_USER_NAME",
  text: "joined the session",
});
```

## Role verification for ephemeral data structures

Meetings in Teams can range from one-on-one calls to all-hands meetings, and may include members across organizations. We've designed our ephemeral objects to support role verification, allowing developers to define the roles that are allowed to send messages for each individual ephemeral object. For example, developers could choose that only meeting presenters and organizers can control video playback, but still allow guests and attendees to request videos to watch next.

We recommend listening to your customers to understand their scenarios before implementing role verification into your app, particularly for the **Organizer** role. There's no guarantee that a meeting organizer be present in the meeting. As a general rule of thumb, all users will be either **Organizer** or **Presenter** when collaborating within an organization. If a user is an **Attendee**, it's usually an intentional decision on behalf of a meeting organizer.

```javascript
import { EphemeralState, UserMeetingRole } from "@microsoft/live-share";
// ...
const schema = {
  initialObjects: { appState: EphemeralState },
};
const { container } = await client.joinContainer(schema);
const { appState } = container.initialObjects;

// Listen for changes to values in the map
appState.on("stateChanged", (state, value, local) => {
  // Update local app state
});

// Set roles who can change state and start
const allowedRoles = [UserMeetingRole.organizer, UserMeetingRole.presenter];
appState.start(allowedRoles);

function onSelectEditMode(documentId) {
  appState.changeState("editing", {
    documentId,
  });
}

function onSelectPresentMode(documentId) {
  appState.changeState("presenting", {
    documentId,
    presentingUserId: "LOCAL_USER_ID",
  });
}
```

## Code samples

| Sample name | Description                                                      | JavaScript                                  |
| ----------- | ---------------------------------------------------------------- | ------------------------------------------- |
| Dice Roller | Enable all connected clients to roll a dice and view the result. | [View](https://aka.ms/liveshare-diceroller) |
| Agile Poker | Enable all connected clients to play Agile Poker.                | [View](https://aka.ms/liveshare-agilepoker) |

## Next step

> [!div class="nextstepaction"] 
> [Live Share media capabilities](teams-live-share-media-capabilities.md)

## See also

- [GitHub repository](https://github.com/microsoft/live-share-sdk)
- [Live Share API reference docs](https://livesharesdk.z5.web.core.windows.net/).
- [Reference docs](https://aka.ms/livesharedocs)
- [Teams apps in meetings](teams-apps-in-meetings.md)
