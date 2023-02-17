---
title: Live Share getting started
author: surbhigupta
description: In this module, learn more about live share SDK capabilities, RSC permissions and live data structures.
ms.topic: conceptual
ms.localizationpriority: high
ms.author: v-ypalikila
ms.date: 04/07/2022
---

# Live Share core capabilities

:::image type="content" source="../assets/images/teams-live-share/Teams-live-share-core-capabilities-hero.png" alt-text="Screenshot shows an example of users playing agile poker game in a Teams meeting, which showcases the Live share capability.":::

The Live Share SDK can be added to your meeting extension's `sidePanel` and `meetingStage` contexts with minimal effort. 

> [!NOTE]
> The Live Share SDK isn't supported for anonymous users.

This article focuses on how to integrate the Live Share SDK into your app and key capabilities of the SDK.

## Install the JavaScript SDK

The [Live Share SDK](https://github.com/microsoft/live-share-sdk) is a JavaScript package published on [npm](https://www.npmjs.com/package/@microsoft/live-share), and you can download through npm or Yarn.

### npm

```bash
npm install @microsoft/live-share@next --save
```

### yarn

```bash
yarn add @microsoft/live-share@next
```

## Register RSC permissions

To enable the Live Share SDK for your meeting extension, you must first add the following RSC permissions into your app manifest:

```json
{
  // ...rest of your manifest here
  "configurableTabs": [
    {
        "configurationUrl": "<<YOUR_CONFIGURATION_URL>>",
        "canUpdateConfiguration": true,
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

## Join a meeting session

Follow the steps to join a session that's associated with a user's meeting:

1. Initialize `LiveShareClient`.
2. Define the data structures you want to synchronize. For example, `SharedMap`.
3. Join the container.

Example:

# [JavaScript](#tab/javascript)

```javascript
import { LiveShareClient } from "@microsoft/live-share";
import { LiveShareHost } from "@microsoft/teams-js";
import { SharedMap } from "fluid-framework";

// Join the Fluid container
const host = LiveShareHost.create();
const liveShare = new LiveShareClient(host);
const schema = {
  initialObjects: { exampleMap: SharedMap },
};
const { container } = await liveShare.joinContainer(schema);

// ... ready to start app sync logic
```

# [TypeScript](#tab/typescript)

```TypeScript
import { LiveShareClient } from "@microsoft/live-share";
import { LiveShareHost } from "@microsoft/teams-js";
import { ContainerSchema, SharedMap } from "fluid-framework";

// Join the Fluid container
const host = LiveShareHost.create();
const liveShare = new LiveShareClient(host);
const schema: ContainerSchema = {
  initialObjects: { exampleMap: SharedMap },
};
const { container } = await liveShare.joinContainer(schema);

// ... ready to start app sync logic
```

---

That's all it took to setup your container and join the meeting's session. Now, let's review the different types of _distributed data structures_ that you can use with the Live Share SDK.

> [!TIP]
> Ensure that the Teams Client SDK is initialized before using the Live Share APIs.

## Fluid distributed data structures

The Live Share SDK supports any [distributed data structure](https://fluidframework.com/docs/data-structures/overview/) included in Fluid Framework. These features serve as a set of primitives you can use to build robust collaborative scenarios, such as real-time updates of a task list or co-authoring text within an HTML `<textarea>`.

Following are the different types of objects available:

| Shared Object                                                                       | Description                                                                                                                             |
| ----------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------- |
| [SharedMap](https://fluidframework.com/docs/data-structures/map/)                   | A distributed key-value store. Set any JSON-serializable object for a given key to synchronize that object for everyone in the session. |
| [SharedSegmentSequence](https://fluidframework.com/docs/data-structures/sequences/) | A list-like data structure for storing a set of items (called segments) at set positions.                                               |
| [SharedString](https://fluidframework.com/docs/data-structures/string/)             | Distributed-string sequence optimized for editing the text of documents or text areas.                                                  |

Let's see how `SharedMap` works. In this example, we've used `SharedMap` to build a playlist feature.

# [JavaScript](#tab/javascript)

```javascript
import { LiveShareClient } from "@microsoft/live-share";
import { LiveShareHost } from "@microsoft/teams-js";
import { SharedMap } from "fluid-framework";

// Join the Fluid container
const host = LiveShareHost.create();
const liveShare = new LiveShareClient(host);
const schema = {
  initialObjects: { playlistMap: SharedMap },
};
const { container } = await liveShare.joinContainer(schema);
const playlistMap = container.initialObjects.playlistMap as SharedMap;

// Register listener for changes to values in the map
playlistMap.on("valueChanged", (changed, local) => {
  const video = playlistMap.get(changed.key);
  // Update UI with added video
});

function onClickAddToPlaylist(video) {
  // Add video to map
  playlistMap.set(video.id, video);
}
```

# [TypeScript](#tab/typescript)

```TypeScript
import { LiveShareClient } from "@microsoft/live-share";
import { LiveShareHost } from "@microsoft/teams-js";
import { ContainerSchema, SharedMap, IValueChanged } from "fluid-framework";

// Join the Fluid container
const host = LiveShareHost.create();
const liveShare = new LiveShareClient(host);
const schema: ContainerSchema = {
  initialObjects: { exampleMap: SharedMap },
};
const { container } = await liveShare.joinContainer(schema);
const playlistMap = container.initialObjects.playlistMap as SharedMap;

// Declare interface for object being stored in map
interface IVideo {
  id: string;
  url: string;
}

// Register listener for changes to values in the map
playlistMap.on("valueChanged", (changed: IValueChanged, local: boolean) => {
  const video: IVideo | undefined = playlistMap.get(changed.key);
  // Update UI with added video
});

function onClickAddToPlaylist(video: IVideo) {
  // Add video to map
  playlistMap.set(video.id, video);
}
```

---

> [!NOTE]
> Core Fluid Framework DDS objects don't support meeting role verification. Everyone in the meeting can change data stored through these objects.

## Live Share data structures

The Live Share SDK includes a set of new distributed-data structures that extend Fluid's `SharedObject` class, providing new types of stateful and stateless objects. Unlike Fluid data structures, Live Share's `SharedObject` classes don’t write changes to the Fluid container, enabling faster synchronization. Further, these classes were designed from the ground up for common meeting scenarios in Teams meetings. Common scenarios include synchronizing what content the presenter is viewing, displaying metadata for each user in the meeting, or displaying a countdown timer.

| Live Object    | Description                                                                                                                             |
| -------------- | --------------------------------------------------------------------------------------------------------------------------------------- |
| `LivePresence` | See which users are online, set custom properties for each user, and broadcast changes to their presence.                               |
| `LiveEvent`    | Broadcast individual events with any custom data attributes in the payload.                                                             |
| `LiveState`    | Similar to SharedMap, a distributed key-value store that allows for restricted state changes based on role, for example, the presenter. |
| `LiveTimer`    | Synchronize a countdown timer for a given interval.                                                                                     |

### LivePresence example

:::image type="content" source="../assets/images/teams-live-share/live-share-presence.png" alt-text="Screenshot shows an example of showing people who available in a sessionTeams using Live Share presence.":::

The `LivePresence` class makes tracking who is in the session easier than ever. When calling the `.initialize()` or `.updatePresence()` methods, you can assign custom metadata for that user, such as name, profile picture, or the identifier for content they are viewing. By listening to `presenceChanged` events, each client receives the latest `LivePresenceUser` object, collapsing all presence updates into a single record for each unique `userId`.

The following are a few examples in which `LivePresence` can be used in your application:

- Displaying profile pictures and names of each user connected to the session.
- Synchronizing the coordinates in a 3D scene where each user's avatar is located.
- Reporting each user's cursor position in a text document.
- Posting each user's answer to an ice-breaker question during a group activity.

> [!NOTE]
> The default `userId` assigned to each `LivePresenceUser` is a random UUID and is not directly tied to an AAD identity. You can override this by setting a custom `userId` to be the primary key, as shown in the example below.

# [JavaScript](#tab/javascript)

```javascript
import {
  LiveShareClient,
  LivePresence,
  PresenceState,
} from "@microsoft/live-share";
import { LiveShareHost } from "@microsoft/teams-js";

// Join the Fluid container
const host = LiveShareHost.create();
const liveShare = new LiveShareClient(host);
const schema = {
  initialObjects: {
    presence: LivePresence,
  },
};
const { container } = await liveShare.joinContainer(schema);
const presence = container.initialObjects.presence;

// Register listener for changes to presence
presence.on("presenceChanged", (userPresence, local) => {
  // Update UI with presence
});

// Start tracking presence
presence.initialize("YOUR_CUSTOM_USER_ID", {
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

# [TypeScript](#tab/typescript)

```TypeScript
import {
  LiveShareClient,
  LivePresence,
  PresenceState,
  LivePresenceUser,
} from "@microsoft/live-share";
import { LiveShareHost } from "@microsoft/teams-js";

// Declare interface for type of custom data for user
interface ICustomUserData {
  name: string;
  picture: string;
}

// Join the Fluid container
const host = LiveShareHost.create();
const liveShare = new LiveShareClient(host);
const schema = {
  initialObjects: {
    presence: LivePresence<ICustomUserData>,
  },
};
const { container } = await liveShare.joinContainer(schema);
const presence = container.initialObjects.presence as LivePresence<ICustomUserData>;

// Register listener for changes to presence
presence.on("presenceChanged", (userPresence: LivePresenceUser<ICustomUserData>, local: boolean) => {
  // Update UI with presence
});

// Start tracking presence
presence.initialize("YOUR_CUSTOM_USER_ID", {
  name: "Anonymous",
  picture: "DEFAULT_PROFILE_PICTURE_URL",
});

function onUserDidLogIn(userName: string, profilePicture: string) {
  presence.updatePresence(PresenceState.online, {
    name: userName,
    picture: profilePicture,
  });
}
```

---

### LiveEvent example

:::image type="content" source="../assets/images/teams-live-share/live-share-event.png" alt-text="Screenshot shows an example of Teams client displaying notification when there's a change in the event.":::

`LiveEvent` is a great way to send simple events to other clients in a meeting that are only needed at the time of delivery. It's useful for scenarios like sending session notifications or implementing custom reactions.

# [JavaScript](#tab/javascript)

```javascript
import { LiveEvent, LiveShareClient } from "@microsoft/live-share";
import { LiveShareHost } from "@microsoft/teams-js";

// Join the Fluid container
const host = LiveShareHost.create();
const liveShare = new LiveShareClient(host);
const schema = {
  initialObjects: { notifications: LiveEvent },
};
const { container } = await liveShare.joinContainer(schema);
const { notifications } = container.initialObjects;

// Register listener for incoming notifications
notifications.on("received", (event, local) => {
  let notificationToDisplay;
  if (local) {
    notificationToDisplay = `You ${event.text}`;
  } else {
    notificationToDisplay = `${event.senderName} ${event.text}`;
  }
  // Display notification in your UI
});

// Start listening for incoming notifications
await notifications.initialize();

notifications.sendEvent({
  senderName: "LOCAL_USER_NAME",
  text: "joined the session",
});
```

# [TypeScript](#tab/typescript)

```TypeScript
import { LiveShareClient, LiveEvent, ILiveEvent } from "@microsoft/live-share";
import { LiveShareHost } from "@microsoft/teams-js";

// Declare interface for type of custom data for user
interface ICustomEvent extends ILiveEvent {
  senderName: string;
  text: string;
}

// Join the Fluid container
const host = LiveShareHost.create();
const liveShare = new LiveShareClient(host);
const schema = {
  initialObjects: {
    notifications: LiveEvent<ICustomEvent>,
  },
};
const { container } = await liveShare.joinContainer(schema);
const notifications = container.initialObjects.notifications as LiveEvent<ICustomEvent>;

// Register listener for incoming notifications
notifications.on("received", (event: ICustomEvent, local: boolean) => {
  let notificationToDisplay: string;
  if (local) {
    notificationToDisplay = `You ${event.text}`;
  } else {
    notificationToDisplay = `${event.senderName} ${event.text}`;
  }
  // Display notification in your UI
});

// Start listening for incoming notifications
await notifications.initialize();

notifications.sendEvent({
  senderName: "LOCAL_USER_NAME",
  text: "joined the session",
});
```

---

### LiveTimer example

:::image type="content" source="../assets/images/teams-live-share/live-share-timer.png" alt-text="Screenshot shows an example of a count down timer with 9 seconds remaining.":::

`LiveTimer` provides a simple countdown timer that is synchronized for everyone in a meeting. It’s useful for scenarios that have a time limit, such as a group meditation timer or a round timer for a game.

# [JavaScript](#tab/javascript)

```javascript
import { LiveShareClient, LiveTimer } from "@microsoft/live-share";
import { LiveShareHost } from "@microsoft/teams-js";

// Join the Fluid container
const host = LiveShareHost.create();
const liveShare = new LiveShareClient(host);
const schema = {
  initialObjects: { timer: LiveTimer },
};
const { container } = await liveShare.joinContainer(schema);
const { timer } = container.initialObjects;

// Register listener for when the timer starts its countdown
timer.on("started", (config, local) => {
  // Update UI to show timer has started
});

// Register listener for when a paused timer has resumed
timer.on("played", (config, local) => {
  // Update UI to show timer has resumed
});

// Register listener for when a playing timer has paused
timer.on("paused", (config, local) => {
  // Update UI to show timer has paused
});

// Register listener for when a playing timer has finished
timer.on("finished", (config) => {
  // Update UI to show timer is finished
});

// Register listener for the timer progressed by 20 milliseconds
timer.on("onTick", (milliRemaining) => {
  // Update UI to show remaining time
});

// Start synchronizing timer events for users in session
await timer.initialize();

// Start a 60 second timer
const durationInMilliseconds = 1000 * 60;
timer.start(durationInMilliseconds);

// Pause the timer for users in session
timer.pause();

// Resume the timer for users in session
timer.play();
```

# [TypeScript](#tab/typescript)

```TypeScript
import {
  LiveShareClient,
  LiveTimer,
  LiveTimerEvents,
  ITimerConfig,
} from "@microsoft/live-share";
import { LiveShareHost } from "@microsoft/teams-js";

// Join the Fluid container
const host = LiveShareHost.create();
const liveShare = new LiveShareClient(host);
const schema = {
  initialObjects: { timer: LiveTimer },
};
const { container } = await liveShare.joinContainer(schema);
const timer = container.initialObjects.timer as LiveTimer;

// Register listener for when the timer starts its countdown
timer.on(LiveTimerEvents.started, (config: ITimerConfig, local: boolean) => {
  // Update UI to show timer has started
});

// Register listener for when a paused timer has resumed
timer.on(LiveTimerEvents.played, (config: ITimerConfig, local: boolean) => {
  // Update UI to show timer has resumed
});

// Register listener for when a playing timer has paused
timer.on(LiveTimerEvents.paused, (config: ITimerConfig, local: boolean) => {
  // Update UI to show timer has paused
});

// Register listener for when a playing timer has finished
timer.on(LiveTimerEvents.finished, (config: ITimerConfig) => {
  // Update UI to show timer is finished
});

// Register listener for the timer progressed by 20 milliseconds
timer.on(LiveTimerEvents.onTick, (milliRemaining: number) => {
  // Update UI to show remaining time
});

// Start synchronizing timer events
await timer.initialize();

// Start a 60 second timer for users in session
const durationInMilliseconds = 1000 * 60;
timer.start(durationInMilliseconds);

// Pause the timer for users in session
timer.pause();

// Resume the timer for users in session
timer.play();
```

---

### LiveState example

:::image type="content" source="../assets/images/teams-live-share/live-share-state.png" alt-text="Screenshot shows an example of Live Share state to synchronize what planet in the solar system is actively presented to the meeting.":::

The `LiveState` class enables synchronizing simple application state for everyone in a meeting. `LiveState` synchronizes two values: a `state` string and a corresponding `data` object, which allows you to build an ephemeral distributed-state machine.

The following are a few examples in which `LiveState` can be used in your application:

- Tracking the user identifier of the current presenter to build a **take control** feature.
- Maintaining the content identifier that the current presenter is viewing. For example, an `taskId` on a task board.
- Synchronizing the current step in a multi-round group activity. For example, the guessing phase during the Agile Poker game.

> [!NOTE]
> Unlike `SharedMap`, the `state` and `data` values in `LiveState` will be reset after all the users disconnect from a session.

Example:

# [JavaScript](#tab/javascript)

```javascript
import { LiveShareClient, LiveState } from "@microsoft/live-share";
import { LiveShareHost } from "@microsoft/teams-js";

// Join the Fluid container
const host = LiveShareHost.create();
const liveShare = new LiveShareClient(host);
const schema = {
  initialObjects: { appState: LiveState },
};
const { container } = await liveShare.joinContainer(schema);
const { appState } = container.initialObjects;

// Register listener for changes to state and corresponding custom data
appState.on("stateChanged", (state, data, local) => {
  if (state === "planet-viewer") {
    const planetName = data?.planetName;
    // Update app to display an image of the selected planet for the selected solar system
  } else {
    // No planet is yet selected
  }
});

// Set roles who can change state and start listening for changes
appState.initialize();

function onSelectPlanet(planetName) {
  appState.changeState("planet-viewer", {
    planetName,
  });
}
```

# [TypeScript](#tab/typescript)

```TypeScript
import { LiveShareClient, LiveState } from "@microsoft/live-share";
import { LiveShareHost } from "@microsoft/teams-js";

enum PlanetName {
  MERCURY = "Mercury",
  VENUS = "Venus",
  EARTH = "Earth",
  MARS = "Mars",
  JUPITER = "Jupiter",
  SATURN = "Saturn",
  URANUS = "Uranus",
  NEPTUNE = "Neptune",
}

// Declare interface for type of custom data for user
interface ICustomState {
  planetName: PlanetName;
}

// Join the Fluid container
const host = LiveShareHost.create();
const liveShare = new LiveShareClient(host);
const schema = {
  initialObjects: {
    appState: LiveState<ICustomState>,
  },
};
const { container } = await liveShare.joinContainer(schema);
const appState = container.initialObjects.appState as LiveState<ICustomState>;

// Register listener for changes to state and corresponding custom data
appState.on("stateChanged", (state: string, data: ICustomState | undefined, local: boolean) => {
  if (state === "planet-viewer") {
    const planetName = data?.planetName;
    // Update app to display an image of the selected planet for the selected solar system
  } else {
    // No planet is yet selected
  }
});

// Set roles who can change state and start listening for changes
appState.initialize();

function onSelectPlanet(planetName: PlanetName) {
  appState.changeState("planet-viewer", {
    planetName,
  });
}
```

---

## Role verification for live data structures

Meetings in Teams include calls, all-hands meetings, and online classrooms. Meeting participants might span across organizations, have different privileges, or simply have different goals. Hence, it’s important to respect the privileges of different user roles during meetings. Live objects are designed to support role verification, allowing you to define the roles that are allowed to send messages for each individual live object. For example, you could choose that only meeting presenters and organizers can control video playback, but still allow guests and attendees to request videos to watch next.

> [!NOTE]
> The `LivePresence` class doesn't support role verification. The `LivePresenceUser` object has a `getRoles` method, which returns the meeting roles for a given user.

In the following example where only presenters and organizers can take control, `LiveState` is used to synchronize which user is the active presenter.

# [JavaScript](#tab/javascript)

```javascript
import {
  LiveShareClient,
  LiveState,
  UserMeetingRole,
} from "@microsoft/live-share";
import { LiveShareHost } from "@microsoft/teams-js";

// Join the Fluid container
const host = LiveShareHost.create();
const liveShare = new LiveShareClient(host);
const schema = {
  initialObjects: { appState: LiveState },
};
const { container } = await liveShare.joinContainer(schema);
const { appState } = container.initialObjects;

// Register listener for changes to state and corresponding custom data
appState.on("stateChanged", (state, data, local) => {
  // Update local app state
});

// Set roles who can change state and start listening for changes
const allowedRoles = [UserMeetingRole.organizer, UserMeetingRole.presenter];
appState.initialize(allowedRoles);

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

# [TypeScript](#tab/typescript)

```TypeScript
import { LiveShareClient, LiveState, UserMeetingRole } from "@microsoft/live-share";
import { LiveShareHost } from "@microsoft/teams-js";

// Declare interface for type of custom data for user
interface ICustomState {
  documentId: string;
  presentingUserId?: string;
}

// Join the Fluid container
const host = LiveShareHost.create();
const liveShare = new LiveShareClient(host);
const schema = {
  initialObjects: {
    appState: LiveState<ICustomState>,
  },
};
const { container } = await liveShare.joinContainer(schema);
const appState = container.initialObjects.appState as LiveState<ICustomState>;

// Register listener for changes to state and corresponding custom data
appState.on("stateChanged", (state: string, data: ICustomState | undefined, local: boolean) => {
  // Update local app state
});

// Set roles who can change state and start listening for changes
const allowedRoles: UserMeetingRole[] = [UserMeetingRole.organizer, UserMeetingRole.presenter];
appState.initialize(allowedRoles);

function onSelectEditMode(documentId: string) {
  appState.changeState("editing", {
    documentId,
  });
}

function onSelectPresentMode(documentId: string) {
  appState.changeState("presenting", {
    documentId,
    presentingUserId: "LOCAL_USER_ID",
  });
}
```

---

Listen to your customers to understand their scenarios before implementing role verification into your app, particularly for the **Organizer** role. There's no guarantee that a meeting organizer be present in the meeting. As a general rule of thumb, all users will be either **Organizer** or **Presenter** when collaborating within an organization. If a user is an **Attendee**, it's usually an intentional decision on behalf of a meeting organizer.

## Code samples

| Sample name | Description                                                     | JavaScript                                  |
| ----------- | --------------------------------------------------------------- | ------------------------------------------- |
| Dice Roller | Enable all connected clients to roll a die and view the result. | [View](https://aka.ms/liveshare-diceroller) |
| Agile Poker | Enable all connected clients to play Agile Poker.               | [View](https://aka.ms/liveshare-agilepoker) |

## Next step

> [!div class="nextstepaction"]
> [Live Share media](teams-live-share-media-capabilities.md)

## See also

- [Apps for Teams meetings](teams-apps-in-meetings.md)
- [GitHub repository](https://github.com/microsoft/live-share-sdk)
- [Resource-specific consent](../graph-api/rsc/resource-specific-consent.md)
- [Live Share SDK reference docs](/javascript/api/@microsoft/live-share/)
- [Live Share Media SDK reference docs](/javascript/api/@microsoft/live-share-media/)
- [Live Share FAQ](teams-live-share-faq.md)
- [Use Fluid with Teams](../tabs/how-to/using-fluid-msteam.md)
- [Build Agile Poker using Live Share SDK](../sbs-teams-live-share.yml)
- [Dice Roller code tutorial](teams-live-share-tutorial.md)
