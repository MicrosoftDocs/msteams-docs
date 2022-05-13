---
title: Teams live share works
description: Teams live share works
ms.topic: overview
ms.localizationpriority: high
---

# Enable and configure your app for Teams live share

Teams live share SDK helps you integrate applications and websites with Teams to collaborate, watch, and browse content in a Teams meeting.

Teams fluid clients capabilities:

(content to be added)

## Platforms and SDKs

The following are the supported platforms and its SDKs:

| Platform | SDK |
| --- | --- |
| iOS & iPadOS | Swift and Objective C |
| Android | Java |
| Web/PWA | JavaScript |
| Windows UWP | .NET |

## Add Teams live share to your app

(content to be added)

### Prerequisites

* [Get context for your tab](/microsoftteams/platform/tabs/how-to/access-teams-context)

* Tenant ID, User ID and Meeting ID:  

  * To check with Bot API if user is part of the meeting in Cloud API.

  * To check if user is part of CollabSpace on subsequent calls to Cloud API.

* Name of user from AAD token:

  * To address and tag users inside Cowatch app (From token).

* microsoftTeams.authentication.getAuthToken()

  * 1p AAD  app

### Update your app manifest

To enable your app for Teams live share, update your app manifest and use the context properties to determine where your app must appear.
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

## Resource-specific consent

The RSC permissions model enables **team owners** and **chat owners** to grant consent for an application to access and modify a Teams data and a chat's data, respectively.

### Resource-specific permissions for Teams live share

|Application permission| Action |
| ----- | ----- |
|LiveShareSession.ReadWrite.Chat| <!--- Need to check with SME ---> |
|MeetingStage.Write.Chat| <!--- Need to check with SME ---> |
|OnlineMeetingIncomingAudio.Detect.Chat| <!--- Need to check with SME ---> |

For more details, see [resource specific consent](/graph/permissions-reference).

## SDK authentication and access

You can authenticate the SDK in several ways. All requests made through the SDK must have a valid API key, provided to the channel. The access token should only give access to the minimum number of data or capabilities.

The following are the different types of authentication:

### Teams live share app - SDK authentication

When a user opens a channel through Teams live share meeting tab or interstitial, included in the URI is a parameter for a local access token. The SDK validates the token, and if valid, marks the user as authenticated.

Once the user is confirmed to be authenticated, if the URI also includes session identifier, the SDK begins that process according to the requirements. If the URI indicates the user should be redirected back to Teams once complete, the SDK opens the URI for the Teams app.

### SDK - Teams live share app authentication

You can connect the channel to Teams through an API in the SDK. In this case, SDK opens a URI to the Teams app, then it generates a local access token and opens the channel URI with the token included. The SDK validates the token, and if valid, marks the user as authenticated.

### Server OAuth 2.0

You can optionally use a valid local access token to generate a single-use authorization code that you can send to your server to convert into an access token and refresh token, per the OAuth 2.0 standard. You can use a method in the SDK’s API to set the access token manually and it is used as the primary access token.
If the server token is about to expire or is expired, the SDK will provide a proper error informing you to request a new access token from your server.

### Refresh token

If a local access token is about to expire or is expired, the SDK will automatically refresh it (either before a request fails by checking the expiration timestamp, waiting for the request to give the related error code, or both).

### Invalidate token

Partners should be able to include the ability to invalidate a token from their app (For example, user wants to opt out of the Teams integration). If the user is to continue using the Teams integration after invalid token, they must reauthenticate the SDK.

## SDK collaboration and capabilities

You can use Teams client media libraries and work with Fluid framework to make your applications more interactive, when using the Teams meeting stage, or working with media.

### Teams live share SDK packages

* **teams-js-fluid**: Components to simplify building collaborative experiences for Teams.
* **fluid-events**: Base helper classes to enable creation of cross platform fluid components.
* **fluid-presence**: Cross platform component for sharing presence.
* **fluid-media**: Cross platform components for synchronizing media playback.
* **fluid-stored-objects**: Cross platform components for notifying clients of changes to large objects stored in a no SQL database.

#### Teams-js-fluid

**TeamsContainer**: Teams managed fluid client for creating a container scoped to a specific context for example, meeting. Teams collaboration service verifies roster membership and maintains the mapping of conversation ID to container ID.

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

**TeamsTimestampProvider** – Synchronizes each client's clock with the Teams Collaboration Service clock.

Package: <@microsoft/teams-js-fluid>

### fluid-events

* **SharedEventScope**: Send and receive events for a component within a container.
* **SharedEventSource**: Class to simplify sending events to other instances of a component.
* **SharedEventTarget**:  Class to simplify receiving events sent by a source.
* **SharedEventTimer**: Class to simplify sending events at regular intervals.
* **LocalTimestampProvider**: Generates timestamps using the local clock. Only used for local testing.

### fluid-presence

**SharedPresence**: Publishes and subscribes to presence information across all clients currently connected to a container.

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

**SharedMediaSession**: Synchronizes media playback across clients connected to a container.

**MediaPlayerSynchronizer**: Helper class to simplify synchronizing an HTML media element with the SharedMediaSession.

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

### fluid-stored-objects

(content to be added)

### EphemeralEvent

(content to be added)

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

(content to be added)

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

(content to be added)

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
