---
title: Live Share SDK capabilities
description: Integrate applications and websites with Teams to collaborate, watch, and browse content in a Teams meeting.
ms.topic: concept
ms.localizationpriority: high
ms.author: v-ypalikila
---
---

# Live Share SDK

> [!NOTE]
> Live Share SDK is currently available only in [public developer preview](../resources/dev-preview/developer-preview-intro.md).

Live Share SDK helps you to integrate applications and websites with Teams to collaborate, watch, and browse content in a Teams meeting.

The Live Share SDK contains a collection of classes for building collaborative applications. While there's a heavy focus on building collaborative media applications, any number of collaborative experiences can be built using the SDK components.

* [Collaboration spaces](#collaboration-spaces)
* [Shared components](#shared-components)
* [Building custom components](#building-custom-components)

## Collaboration spaces

Everything starts with the `TeamsCollaborationSpace` or `CollaborationSpace` classes. Clients join collaboration spaces and are then able to exchange messages and share objects with other clients connected to the same space. Each space exposes a `BroadcastSocket` which can be used to message other clients within the space, a `SharedObjects` collection which can be used persist objects that are synchronized across all of the clients within the space, and a `SharedClock` which provides a synchronized clock for the space.

## Shared components

While it's completely possible to use the `CollaborationSpace` object directly to build collaborative experiences, the SDK provides of set of pre-built components that dramatically simplify the task.

| Component      | Description                                  |
| -------------- | -------------------------------------------- |
| MediaPlayerSynchronizer | A component that uses `SharedMediaSession` for HTML5 video sync. |
| SharedMediaSession | A component used to synchronize media playback. |
| SharedPresence | Tracks presence information for members of a space. |
| SharedEvent | A component that simplifies broadcasting an event to other clients within the space. |
| SharedMap| A distributed map that's synchronized across all clients within a space. |
| SharedList | A distributed list that's synchronized across all clients within a space. |

## Building custom components

In addition to the pre-built components, the SDK makes it easy to build your own custom components. Custom components come in two flavors:

* Peer-to-peer messaging based components like `SharedMediaSession`, `SharedPresence`, and `SharedEvent`. The Building Shared Components guide will walk you through building a custom `SharedCursor` component. 
* Distributed data structures like `SharedMap`, `SharedList`, and `SharedCounter`. The Building Shared Objects guide will walk you through building a custom `SharedCounter` component.

## SDK capabilities

You can use Teams client media libraries and work with Fluid framework to make your applications more interactive, when using the Teams meeting stage, or working with media.

### Live Share SDK packages

* **teams-js-fluid**: Components to simplify building collaborative experiences for Teams.
* **fluid-events**: Base helper classes to enable creation of cross platform fluid components.
* **fluid-presence**: Cross platform component for sharing presence.
* **fluid-media**: Cross platform components for synchronizing media playback.
* **fluid-stored-objects**: Cross platform components for notifying clients of changes to large objects stored in a no SQL database.

### Container creation

Teams managed fluid client for creating a container scoped to a specific context for example, meeting. Teams collaboration service verifies roster membership and maintains the mapping of conversation ID to container ID.

**TeamsFluidClient** can join a container mapped to a meeting with the following code.

**Sample code**

```javascript
// Initialize Teams Client SDK
microsoftTeams.initialize();

// Define Fluid document schema
// https://fluidframework.com
const schema = {
  initialObjects: { mediaSession: EphemeralMediaSession },
};
// Join Fluid container
const client = new TeamsFluidClient();
const { container } = await client.joinContainer(schema);
const { mediaSession } = container.initialObjects;

// TODO: build your collaborative features into app!

```

### Media synchronizer

A component that uses SharedMediaSession for HTML5 video sync.

**SharedMediaSession**: Synchronizes media playback across clients connected to a container.

**MediaPlayerSynchronizer**: Helper class to simplify synchronizing an HTML media element with the SharedMediaSession.

**Sample code**

```javascript
// Add mediaSession to Fluid schema
const schema = {
  initialObjects: { …, mediaSession: EphemeralMediaSession },
};

// Setup media session & synchronizer
const { mediaSession } = container.initialObjects;
const player = document.getElementById(“player");
const synchronizer = mediaSession.synchronize(player);

// Choose who can control playback and start synchronizing
const playbackRoles = ["Presenter"];
mediaSession.start(playbackRoles);

// Intercept play, pause, and seek user actions
function onClickPlay() {
  synchronizer.play();
};

// To temporarily suspend synchronization, use a suspension
const suspension = mediaSession.coordinator.beginSuspension();
suspension.end(); // Calling end will auto resume sync
```

### See who is online

`EphemeralPresence` makes it easy to track who is online, assign user attributes, and more.

**Sample code**

```javascript
// Add presence to Fluid schema
const schema = {
  initialObjects: { …, presence: EphemeralPresence },
};

// Listen for presence changes for users in session
const { presence } = container.initialObjects;
presence.on(“presenceChanged“, (userPresence, local) => {
  // Update app state / UI
});

// Set initial presence data and start receiving changes
const customUserData = {
  userName: “YOUR_USER_NAME",
};
presence.start(userId, customUserData);

// Report presence updates
function changeDisplayName(userName) {
  customUserData.userName = userName;
  presence.updatePresence(“online", customUserData);
};

```

### Send notifications

Using `EphemeralEvent` you can send any JSON message to every client in the session.​

**Sample code - EphemeralEvent**

```javascript
// Add playlistMap to Fluid schema
const schema = {
  initialObjects: { …, notificationEvent: EphemeralEvent },
};

// Set event listener
const { notificationEvent } = container.initialObjects;
notificationEvent.on(“received“, (event, local) => {
  // Display notification
});

// Choose who can send events and start synchronizing
const roles = [“Attendee"]; // Optional, defaults to all
notificationEvent.start(roles);

// Send notification method
function sendNotification(text, senderName) {
  // Send any JSON serializable object
  notificationEvent.sendEvent({
    text: text,
    senderName: senderName,
  });
};
```

### Role-based state

<!--  Add description  -->

**Sample code**

```javascript
// Add myState to Fluid schema
const schema = {
  initialObjects: { …, myState: EphemeralState },
};

// Listen for state changes
const { myState } = container.initialObjects;
myState.on(“stateChanged“, (state, value, local) => {
  // Update app state / UI
});

// Set who can change state and start receiving changes
const roles = [“Organizer"]; // Optional, defaults to all
myState.start(roles);

// Change the state
const availableStates = [“state1", “state2", “state3"];
function changeState(state: string, value: T | undefined) {
  if (availableStates.includes(state)) {
    myState.changeState(state, value);
  }
};
```

### Build a playlist

**Sample code**

```javascript
// Add playlistMap to Fluid schema
const schema = {
  initialObjects: { …, playlistMap: SharedMap },
};
// Listen for valueChanged events
const { playlistMap } = container.initialObjects;
playlistMap.on(“valueChanged“, (changed, local) => {
  const video = playlistMap.get(changed.key);
  // Update app state / UI
});

// Get latest values on the fly (e.g., on join container)
const videos = [];
playlistMap.forEach((value, key) => {
  videos.push(value);
});

// Add videos to the playlist
function addToList(video, id) {
  playlistMap.set(id, video);
};

```

### fluid-events

* **SharedEventScope**: Send and receive events for a component within a container.
* **SharedEventSource**: Class to simplify sending events to other instances of a component.
* **SharedEventTarget**:  Class to simplify receiving events sent by a source.
* **SharedEventTimer**: Class to simplify sending events at regular intervals.
* **LocalTimestampProvider**: Generates timestamps using the local clock. Only used for local testing.
* **TeamsTimestampProvider** – Synchronizes each client's clock with the Teams Collaboration Service clock.
