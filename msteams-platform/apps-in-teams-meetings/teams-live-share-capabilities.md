---
title: Live Share getting started
description: Getting started with Live Share for Teams.
ms.topic: concept
ms.localizationpriority: high
ms.author: v-ypalikila
---

---

# Live Share Capabilities

For complete API-level documentation, please visit the Live Share [API reference docs](https://www.github.com/microsoft/live-share-sdk).

Live Share can be added to your meeting extension's side panel and stage contexts with minimal effort. Let's start with the basics.

> [!Note]
> At this time, only scheduled meetings are supported and all participants must be on the meeting calendar. Support for other meeting types are coming soon.

## Register Live Share RSC permission

To enable Live Share for your meeting extension, you must first add the following RSC permissions into your app manifest:

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
          "type": "Delegated“​
        },
        {​
          "name": "LiveShareSession.ReadWrite.Group",​
          "type": "Delegated“​
        },
        {​
          "name": "MeetingStage.Write.Chat",​
          "type": "Delegated“​
        },
        {​
          "name": "ChannelMeetingStage.Write.Group",​
          "type": "Delegated“​
        }
      ]​
    }​
  }​
}
```

## Joining a meeting session

Joining a session associated with the user's current meeting can be done in just a few simple steps.

1. Initialize the Teams Client SDK
2. Initialize the `TeamsFluidClient`
3. Define the data structures you want to synchronize (e.g., `SharedMap`)
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
  initialObjects: { exampleMap: SharedMap }
};
const { container } = await client.joinContainer(schema);

// ... ready to start app sync logic
```

That's all it took to setup your container and join the session for the meeting. Now, let's review the different types of **Distributed Data Objects** that you can use with Live Share.

## Fluid distributed data structures (DDS)

Live Share supports any of the [types of distributed data structures](https://fluidframework.com/docs/data-structures/overview/) in Fluid Framework. Here is a quick overview of a few of the different types of objects available to you:

| Shared Object                                                                       | Description                                                                                                                                  |
| ----------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------- |
| [SharedMap](https://fluidframework.com/docs/data-structures/map/)                   | A distributed key-value store. Set any JSON-serializable object for a given key to synchronize that object for everyone else in the session. |
| [SharedSegmentSequence](https://fluidframework.com/docs/data-structures/sequences/) | A list-like data structure for storing a set of items (called segments) at set positions.                                                    |
| [SharedString](https://fluidframework.com/docs/data-structures/string/)             | Distributed string sequence optimized for editing document text editing.                                                                     |

> See the Fluid Frameowork docs to learn about other data structures.

Let's look at a quick example of `SharedMap` as a playlist:

```javascript
import { SharedMap } from "fluid-framework";
// ...
const schema = {
  initialObjects: { playlistMap: SharedMap }
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
> Core Fluid Framework DDS structures do not support meeting role verification. Anyone in the meeting will be able to READ/WRITE any data stored through these objects.

## Live Share ephemeral data structures

Live Share provides a set of new **ephemeral** DDS classes to create transient stateful and stateless objects that don't need to be stored in the Fluid container. For example, if you wanted to create a laser-pointer like effect into your app such as our popular PowerPoint Live integration, it is often easier to use our `EphemeralEvent` or `EphemeralState` objects.

| Ephemeral Object  | Description                                                                                                                     |
| ----------------- | ------------------------------------------------------------------------------------------------------------------------------- |
| EphemeralPresence | See which users are online, set custom properties for each user, and broadcast changes to their presence.                       |
| EphemeralEvent    | Broadcast individual events with any custom data attributes in the payload.                                                     |
| EphemeralState    | Similar to SharedMap, a distributed key-value store that allows for restricted state changes based on role (e.g. the presenter) |

### EphemeralPresence example

```javascript
import { EphemeralPresence, PresenceState } from "live-share";
// ...
const schema = {
  initialObjects: { presence: EphemeralPresence }
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
  picture: "DEFAULT_PROFILE_PICTURE_URL"
});

function onUserDidLogIn(userName, profilePicture) {
  presence.updatePresence(PresenceState.online, {
    name: userName,
    picture: profilePicture
  });
}
```

### EphemeralEvent example

```javascript
import { EphemeralEvent } from "live-share";
// ...
const schema = {
  initialObjects: { notifications: EphemeralEvent }
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
  text: "joined the session"
});
```

## Role verification for ephemeral data structures

Meetings in Teams can range from 1-1 calls to a large company all-hands meeting, and may compose of people across different organizations. Thus, we've designed these components to support role verification, which allows developers to define the roles that are allowed to send messages for each individual ephemeral object. For example, one could choose that only meeting presenters and organizers can control video playback, but still allow guests and attendees to request videos to watch next.

We recommend listening to your customers to understand their scenarios before implementing role verification into your app, particularly for the "Organizer" role. There is no guarantee that a meeting organizer be present in the meeting. As a general rule of thumb, all users will be either "Organizer" or "Presenter" when collaborating within an organization. If a user is an "Attendee", it is usually an intentional decision on behalf of a meeting organizer.

```javascript
import { EphemeralState, UserMeetingRole } from "live-share";
// ...
const schema = {
  initialObjects: { appState: EphemeralState }
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
    documentId
  });
}

function onSelectPresentMode(documentId) {
  appState.changeState("presenting", {
    documentId,
    presentingUserId: "LOCAL_USER_ID"
  });
}
```

## Code samples

| Sample name | Description                                                      | Javascript                                                                                 |
| ----------- | ---------------------------------------------------------------- | ------------------------------------------------------------------------------------------ |
| Dice roller | Enable all connected clients to roll a dice and view the result. | [View](https://github.com/microsoft/live-share-sdk/tree/main/samples/01.dice-roller)       |
| Agile Poker | Enable all connected clients to play Agile Poker.                | [View](https://github.com/microsoft/live-share-sdk/tree/main/samples/22.react-agile-poker) |

## Next step

> [!div class="nextstepaction"] > [Live Share Media Capabilities](teams-live-share-media-capabilities.md)

## See also

- [Reference docs](https://www.github.com/microsoft/live-share-sdk)
- [Live Share on GitHub](https://www.github.com/microsoft/live-share-sdk)
- [Teams apps in meetings](teams-apps-in-meetings.md)
