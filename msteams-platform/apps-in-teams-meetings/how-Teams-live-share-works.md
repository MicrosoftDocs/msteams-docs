---
title: Teams live share works
description: Teams live share works
ms.topic: overview
ms.localizationpriority: high
---

# Enable and configure your app for Teams live share

Teams live share SDK helps you integrate applications and websites with Teams to watch and browse content in a Teams meeting stage and collaborate with other users in a Teams meeting.

Teams fluid clients capabilities

## Platforms and SDKs

| Platform | SDK |
| --- | --- |
| iOS & iPadOS | Swift + Objective C |
| Android | Java |
| Web/PWA | JavaScript |
| Windows UWP | .NET |

## Prerequisites

<!--- prerequisites to be added. --->

## Update your app manifest

To enable your app for Teams Live Share, update your app manifest file use the context properties to determine where your app must appear.
<!--- If you want audio ducking and meeting stage support, more RSC permissions are needed as well. --->

The app manifest must include the following code snippet:

```json
{
  …rest of your app manifest,
  "configurableTabs": [
    {
      "configurationUrl": “{YOUR_URL}/config?inTeams=true",
      "canUpdateConfiguration": false,
      "scopes": ["groupchat"],
      "context": ["meetingSidePanel", "meetingStage"]
    }
  ],
  "validDomains": [“{YOUR_DOMAIN}"],
  "authorization": {
    "permissions": {
      "resourceSpecific": [
        {
          "name": “LiveShareSession.ReadWrite.Chat",
          "type": "Delegated“
        },
        {
          "name": "MeetingStage.Write.Chat",
          "type": "Delegated“
        },
        {
          "name": “OnlineMeetingIncomingAudio.Detect.Chat",
          "type": "Delegated“
        }
      ]
    }
  }
}

```

<!--- Resource specific names from the above manifest should be added resource specific consent article. --->

## SDK collaboration and capabilities

You can use Teams client media libraries and work with Fluid framework and Teams together to make your applications more interactive, when using the Teams meeting stage, or working with media.

**Meeting collaboration on stage**

:::image type="content" source="../assets/images/cowatch/meeting-collabration.png" alt-text="meeting-collabration-cowatch":::

**Meeting collaboration for external apps**

:::image type="content" source="../assets/images/cowatch/meeting-collabration-external-app.png" alt-text="meeting-collabration-ext-apps":::

### Teams live share SDK packages

* **teams-js-fluid** – Components to simplify building collaborative experiences for Teams.
* **fluid-events** – Base helper classes to enable creation of cross platform fluid components.
* **fluid-presence** – Cross platform component for sharing presence.
* **fluid-media** – Cross platform components for synchronizing media playback.
* **fluid-stored-objects** – Cross platform components for notifying clients of changes to large objects stored in a no-sql database.

#### Teams-js-fluid

**TeamsContainer**: Teams managed fluid client for creating a container scoped to a specific context (e.g., meeting). Teams Collaboration Service verifies roster membership and maintains the mapping of conversation ID to container ID.

TeamsFluidClient can join a container mapped to a meeting with the following code.

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

**TeamsTimestampProvider** – Synchronizes each client's clock with the Teams Collaboration Service clock. Needed by fluid-events for event ordering.

Package: <@microsoft/teams-js-fluid>

### fluid-events

* `SharedEventScope` – Sends/receives events for a component within a container.
* `SharedEventSource` – Class to simplify sending events to other instances of a component.
* `SharedEventTarget` – Class to simplify receiving events sent by a source.
* `SharedEventTimer` – Class to simplify sending events at regular intervals.
* `LocalTimestampProvider` – Generates timestamps using the local clock. Only used for local testing.

**fluid-presence**

**SharedPresence**: Publishes and subscribes to presence information across all clients currently connected to a container.

* Apps provide their own anonymized user ID to avoid PII issues.

* Apps can customize the information published using a JSON data object.

* The same user ID can be connected to the container from multiple clients and their presence data will be collapsed to a single entry in the presence list.

Package: <@fluidframework/ fluid-ephemeral>

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

### fluid-media

**SharedMediaSession** Synchronizes media playback across clients connected to a container.

* Supports playing, pausing, seeking, and changing tracks by any client.
* Apps can disable individual transport operations on a per client basis.
* Wait points can be used to temporarily pause all clients within the group for ad playback.

**MediaPlayerSynchronizer** Helper class to simplify synchronizing an HTML Media Element with the SharedMediaSession.

Package: @fluidframework/ fluid-ephemeral-media

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

### EphemeralEvent

* Show how to send use EphemeralEvent through a simple notification example.
* EphemeralEvent makes sending any JSON message to every client in the session.
* This is not a stateful component, meaning if messages are missed, they are gone for good.

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

show how to create a simple state machine into your app. If you want a stateful object that maps to meeting roles, EphemeralState is a great choice.

State is lost once the last user disconnects from the session.

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

### Building a playlist

* Any SharedObject built for Fluid Framework works with Teams Live Share.
* SharedMap is a key/value stateful object, where key is a string and value is any JSON serializable value.
* Only Ephemeral SharedObject types support role verification.
* Note that all data stored in sessions this way will be deleted in less than 24hrs.

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
