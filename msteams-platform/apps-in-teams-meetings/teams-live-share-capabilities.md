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

This article focuses on how to integrate the Live Share SDK into your app and key capabilities of the SDK.

## Prerequisites

### Install the JavaScript SDK

The [Live Share SDK](https://github.com/microsoft/live-share-sdk) is a JavaScript package published on [npm](https://www.npmjs.com/package/@microsoft/live-share), and you can download through npm or yarn. You must also install Live Share peer dependencies, which include `fluid-framework` and `@fluidframework/azure-client`. If you're using Live Share in your tab application, you must also install `@microsoft/teams-js` version `2.11.0` or later. Finally, if you plan to use the `TestLiveShareHost` class for local browser development, you must install `@fluidframework/test-client-utils` and `start-server-and-test` packages in your `devDependencies`.

#### npm

```bash
npm install @microsoft/live-share fluid-framework @fluidframework/azure-client --save
npm install @microsoft/teams-js --save
npm install @fluidframework/test-client-utils start-server-and-test --save-dev
```

#### yarn

```bash
yarn add @microsoft/live-share fluid-framework @fluidframework/azure-client
yarn add @microsoft/teams-js
yarn add @fluidframework/test-client-utils -dev
```

### Register RSC permissions

To enable the Live Share SDK for your meeting extension, you must first add the following RSC permissions into your app manifest:

```json
{
  // ...rest of your manifest here
  "configurableTabs": [
    {
        "configurationUrl": "<<YOUR_CONFIGURATION_URL>>",
        "canUpdateConfiguration": true,
        "scopes": [
            "groupchat",
            "team"
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
2. Define the data structures you want to synchronize. For example, `LiveState` or `SharedMap`.
3. Join the container.

Example:

# [JavaScript](#tab/javascript)

```javascript
import { LiveShareClient, LiveState } from "@microsoft/live-share";
import { LiveShareHost } from "@microsoft/teams-js";
import { SharedMap } from "fluid-framework";

// Join the Fluid container
const host = LiveShareHost.create();
const liveShare = new LiveShareClient(host);
const schema = {
  initialObjects: {
    liveState: LiveState,
    sharedMap: SharedMap,
  },
};
const { container } = await liveShare.joinContainer(schema);

// ... ready to start app sync logic
```

# [TypeScript](#tab/typescript)

```TypeScript
import { LiveShareClient, LiveState } from "@microsoft/live-share";
import { LiveShareHost } from "@microsoft/teams-js";
import { ContainerSchema, SharedMap } from "fluid-framework";

// Join the Fluid container
const host = LiveShareHost.create();
const liveShare = new LiveShareClient(host);
const schema: ContainerSchema = {
  initialObjects: {
    exampleMap: SharedMap,
    liveState: LiveState,
  },
};
const { container } = await liveShare.joinContainer(schema);

// ... ready to start app sync logic
```

# [React](#tab/react)

```jsx
import { LiveShareHost } from "@microsoft/teams-js";
import { LiveShareProvider, useLiveShareContext } from "@microsoft/live-share-react";
import { useState } from "react";

export const App = () => {
    // Create the host as React state so that it doesn't get reset on mount
    const [host] = useState(LiveShareHost.create());

    // Live Share for React does not require that you define a custom Fluid schema
    return (
        <LiveShareProvider host={host} joinOnLoad>
            <LiveShareLoading />
        </LiveShareProvider>
    );
}

const LiveShareLoading = () => {
    // Any live-share-react hook (e.g., useLiveShareContext, useLiveState, etc.) must be a child of <LiveShareProvider>
    const { joined } = useLiveShareContext();
    if (joined) {
        return <p>{"Loading..."}</p>;
    }
    return <p>{"Your app here..."}</p>;
}
```

---

That's all it took to setup your container and join the meeting's session. Now, let's review the different types of _distributed data structures_ that you can use with the Live Share SDK.

> [!TIP]
> Ensure that the Teams Client SDK is initialized before calling `LiveShareHost.create()`.

## Live Share data structures

The Live Share SDK includes a set of new distributed-data structures that extend Fluid's `DataObject` class, providing new types of stateful and stateless objects. Unlike Fluid data structures, Live Share's `LiveDataObject` classes don’t write changes to the Fluid container, enabling faster synchronization. Further, these classes were designed from the ground up for common meeting scenarios in Teams meetings. Common scenarios include synchronizing what content the presenter is viewing, displaying metadata for each user in the meeting, or displaying a countdown timer.

| Live Object                                                            | Description                                                                                                                             |
| ------------------------------------------------------------------ | --------------------------------------------------------------------------------------------------------------------------------------- |
| [LivePresence](/javascript/api/@microsoft/live-share/livepresence)     | See which users are online, set custom properties for each user, and broadcast changes to their presence.                                                            |
| [LiveState](/javascript/api/@microsoft/live-share/livestate)           | Synchronize any JSON serializable `state` value. |
| [LiveTimer](/javascript/api/@microsoft/live-share/livetimer)           | Synchronize a countdown timer for a given interval.                                                            |
| [LiveEvent](/javascript/api/@microsoft/live-share/liveevent)           | Broadcast individual events with any custom data attributes in the payload.                                                             |
| [LiveFollowMode](/javascript/api/@microsoft/live-share/livefollowmode) | Follow specific users, present to everyone in the session, and start/end suspensions.                                  |

### LivePresence example

:::image type="content" source="../assets/images/teams-live-share/live-share-presence.png" alt-text="Screenshot shows an example of showing people who available in a sessionTeams using Live Share presence.":::

The `LivePresence` class makes tracking who is in the session easier than ever. When calling the `.initialize()` or `.updatePresence()` methods, you can assign custom metadata for that user, such as profile picture, the identifier for content they're viewing, and more. By listening to `presenceChanged` events, each client receives the latest `LivePresenceUser` object, collapsing all presence updates into a single record for each unique `userId`.

The following are a few examples in which `LivePresence` can be used in your application:

- Getting the Microsoft Teams `userId`, `displayName`, and `roles` of each user in the session.
- Displaying custom information about each user connected to the session, such as a profile picture URL.
- Synchronizing the coordinates in a 3D scene where each user's avatar is located.
- Reporting each user's cursor position in a text document.
- Posting each user's answer to an ice-breaker question during a group activity.

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

// Register listener for changes to each user's presence.
// This should be done before calling `.initialize()`.
presence.on("presenceChanged", (user, local) => {
  console.log("A user presence changed:")
  console.log("- display name:", user.displayName);
  console.log("- state:", user.state);
  console.log("- custom data:", user.data);
  console.log("- change from local client", local);
  console.log("- change impacts local user", user.isLocalUser);
});

// Define the initial custom data for the local user (optional).
const customUserData = {
  picture: "DEFAULT_PROFILE_PICTURE_URL",
  readyToStart: false,
};
// Start receiving incoming presence updates from the session.
// This will also broadcast the user's `customUserData` to others in the session.
await presence.initialize(customUserData);

// Send a presence update, in this case once a user is ready to start an activity.
// If using role verification, this will throw an error if the user doesn't have the required role.
await presence.update({
  ...customUserData,
  readyToStart: true,
});
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
  picture: string;
  readyToStart: boolean;
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
// Force casting is necessary because Fluid does not maintain type recognition for `container.initialObjects`.
// Casting here is always safe, as the `initialObjects` is constructed based on the schema you provide to `.joinContainer`.
const presence = container.initialObjects.presence as unknown as LivePresence<ICustomUserData>;

// Register listener for changes to each user's presence.
// This should be done before calling `.initialize()`.
presence.on("presenceChanged", (user: LivePresenceUser<ICustomUserData>, local: boolean) => {
  console.log("A user presence changed:")
  console.log("- display name:", user.displayName);
  console.log("- custom data:", user.data);
  console.log("- state:", user.state);
  console.log("- roles", user.roles);
  console.log("- change from local client", local);
  console.log("- change impacts local user", user.isLocalUser);
});

// Define the initial custom data for the local user (optional).
const customUserData: ICustomUserData = {
  picture: "DEFAULT_PROFILE_PICTURE_URL",
  readyToStart: false,
};
// Start receiving incoming presence updates from the session.
// This will also broadcast the user's `customUserData` to others in the session.
await presence.initialize(customUserData);

// Send a presence update, in this case once a user is ready to start an activity.
// If using role verification, this will throw an error if the user doesn't have the required role.
await presence.update({
  ...initialData,
  readyToStart: true,
});
```

# [React](#tab/react)

```jsx
import { useLivePresence } from "@microsoft/live-share-react";

// Define a unique key that differentiates this usage of `useLivePresence` from others in your app
const MY_UNIQUE_KEY = "presence-key";

// Example component for using useLivePresence
export const MyCustomPresence = () => {
    const { allUsers, localUser, updatePresence } = useLivePresence(MY_UNIQUE_KEY, {
        picture: "DEFAULT_PROFILE_PICTURE_URL",
        readyToStart: false,
    });

    // Callback to update the user's presence
    const onToggleReady = () => {
        updatePresence({
            ...localUser.data,
            readyToStart: !localUser.data.readyToStart,
        });
    }

    // Render UI
    return (
        {allUsers.map((user) => (
            <div key={user.userId}>
                <div>
                    {user.displayName}
                </div>
                <div>
                    {`Ready: ${user.data.readyToStart}`}
                </div>
                {user.isLocalUser && (
                    <button onClick={onToggleReady}>
                        {"Toggle ready"}
                    </button>
                )}
            </div>
        ))}
    );
}
```

---

Users joining a session from a single device have a single `LivePresenceUser` record that is shared to all their devices. To access the latest `data` and `state` for each of their active connections, you can use the `getConnections()` API from the `LivePresenceUser` class. This returns a list of `LivePresenceConnection` objects. You can see if a given `LivePresenceConnection` instance is from the local device using the `isLocalConnection` property.

Each `LivePresenceUser` and `LivePresenceConnection` instance has a `state` property, which can be either `online`, `offline`, or `away`. An `presenceChanged` event is emitted when a user's state changes. For example, if a user leaves a meeting, their state changes to `offline`.

> [!NOTE]
> It can take up to 20 seconds for an `LivePresenceUser`'s `state` to update to `offline` after leaving a meeting.

### LiveState example

:::image type="content" source="../assets/images/teams-live-share/live-share-state.png" alt-text="Screenshot shows an example of Live Share state to synchronize what planet in the solar system is actively presented to the meeting.":::

The `LiveState` class enables synchronizing simple application state for everyone in a meeting. `LiveState` synchronizes a single `state` value, allowing you to synchronize any JSON serializable value, such as a `string`, `number`, or `object`.

The following are a few examples in which `LiveState` can be used in your application:

- Setting the user identifier of the current presenter to build a **take control** feature.
- Synchronizing the current route path for your application to ensure everyone is on the same page. For example, `/whiteboard/:whiteboardId`.
- Maintaining the content identifier that the current presenter is viewing. For example, an `taskId` on a task board.
- Synchronizing the current step in a multi-round group activity. For example, the guessing phase during the Agile Poker game.
- Keeping a scroll position in sync for a **follow me** feature.

> [!NOTE]
> Unlike `SharedMap`, the `state` value in `LiveState` will be reset after all the users disconnect from a session.

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

// Register listener for changes to the state.
// This should be done before calling `.initialize()`.
appState.on("stateChanged", (planetName, local, clientId) => {
  // Update app with newly selected planet.
  // See which user made the change (optional)
  const clientInfo = await appState.getClientInfo(clientId);
});

// Set a default value and start listening for changes.
// This default value will not override existing for others in the session.
const defaultState = "Mercury";
await appState.initialize(defaultState);

// `.set()` will change the state for everyone in the session.
// If using role verification, this will throw an error if the user doesn't have the required role.
await appState.set("Earth");
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

// Join the Fluid container
const host = LiveShareHost.create();
const liveShare = new LiveShareClient(host);
const schema = {
  initialObjects: {
    appState: LiveState<PlanetName>,
  },
};
const { container } = await liveShare.joinContainer(schema);
// Force casting is necessary because Fluid does not maintain type recognition for `container.initialObjects`.
// Casting here is always safe, as the `initialObjects` is constructed based on the schema you provide to `.joinContainer`.
const appState = container.initialObjects.appState as unknown as LiveState<PlanetName>;

// Register listener for changes to the state.
// This should be done before calling `.initialize()`.
appState.on("stateChanged", async (planetName: PlanetName, local: boolean, clientId: string) => {
  // Update app with newly selected planet
  // See which user made the change (optional)
  const clientInfo = await appState.getClientInfo(clientId);
});

// Set a default value and start listening for changes.
// This default value will not override existing for others in the session.
const defaultState = PlanetName.MERCURY;
await appState.initialize(defaultState);

// `.set()` will change the state for everyone in the session.
// If using role verification, this will throw an error if the user doesn't have the required role.
await appState.set(PlanetName.EARTH);
```

# [React](#tab/react)

```jsx
import { useLiveState } from "@microsoft/live-share-react";

const planets = [
  "Mercury",
  "Venus",
  "Earth",
  "Mars",
  "Jupiter",
  "Saturn",
  "Uranus",
  "Neptune",
];

// Define a unique key that differentiates this usage of `useLiveState` from others in your app
const MY_UNIQUE_KEY = "selected-planet-key";

// Example component for using useLiveState
export const MyCustomState = () => {
    const [planet, setPlanet] = useLiveState(MY_UNIQUE_KEY, planets[0]);

    // Render UI
    return (
        <div>
            {`Current planet: ${planet}`}
            {'Select a planet below:'}
            {planets.map((planet) => (
                <button key={planet} onClick={() => {
                    setPlanet(planet);
                }}>
                    {planet}
                </button>
            ))}
        </div>
    );
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
  initialObjects: { customReactionEvent: LiveEvent },
};
const { container } = await liveShare.joinContainer(schema);
const { customReactionEvent } = container.initialObjects;

// Register listener to receive events sent through this object.
// This should be done before calling `.initialize()`.
customReactionEvent.on("received", async (kudosReaction, local, clientId) => {
  console.log("Received reaction:", kudosReaction, "from clientId", clientId);
  // See which user made the change (optional)
  const clientInfo = await customReactionEvent.getClientInfo(clientId);
  // Display notification in your UI
});

// Start listening for incoming events
await customReactionEvent.initialize();

// `.send()` will send your event value to everyone in the session.
// If using role verification, this will throw an error if the user doesn't have the required role.
const kudosReaction = {
  emoji: "❤️",
  forUserId: "SOME_OTHER_USER_ID",
};
await customReactionEvent.send(kudosReaction);
```

# [TypeScript](#tab/typescript)

```TypeScript
import { LiveShareClient, LiveEvent } from "@microsoft/live-share";
import { LiveShareHost } from "@microsoft/teams-js";

// Declare interface for type of custom data for user
interface ICustomReaction {
  emoji: string,
  forUserId: "SOME_OTHER_USER_ID",
}

// Join the Fluid container
const host = LiveShareHost.create();
const liveShare = new LiveShareClient(host);
const schema = {
  initialObjects: {
    customReactionEvent: LiveEvent<ICustomEvent>,
  },
};
const { container } = await liveShare.joinContainer(schema);
// Force casting is necessary because Fluid does not maintain type recognition for `container.initialObjects`.
// Casting here is always safe, as the `initialObjects` is constructed based on the schema you provide to `.joinContainer`.
const customReactionEvent = container.initialObjects.customReactionEvent as unknown as LiveEvent<ICustomReaction>;

// Register listener to receive events sent through this object.
// This should be done before calling `.initialize()`.
customReactionEvent.on("received", async (event: ICustomReaction, local: boolean, clientId: string) => {
  console.log("Received reaction:", kudosReaction, "from clientId", clientId);
  // See which user made the change (optional)
  const clientInfo = await customReactionEvent.getClientInfo(clientId);
  // Display notification in your UI
});

// Start listening for incoming events
await customReactionEvent.initialize();

// `.send()` will send your event value to everyone in the session.
// If using role verification, this will throw an error if the user doesn't have the required role.
const kudosReaction: ICustomReaction = {
  emoji: "❤️",
  forUserId: "SOME_OTHER_USER_ID",
};
await customReactionEvent.send(kudosReaction);
```

# [React](#tab/react)

```jsx
import { useLiveEvent } from "@microsoft/live-share-react";

const emojis = [
  "❤️",
  "😂",
  "👍",
  "👎",
];

// Define a unique key that differentiates this usage of `useLiveEvent` from others in your app
const MY_UNIQUE_KEY = "event-key";

// Example component for using useLiveEvent
export const MyCustomEvent = () => {
    const {
        latestEvent,
        sendEvent,
    } = useLiveEvent(MY_UNIQUE_KEY);

    // Render UI
    return (
        <div>
            {`Latest event: ${latestEvent?.value}, from local user: ${latestEvent?.local}`}
            {'Select a planet below:'}
            {emojis.map((emoji) => (
                <button key={emoji} onClick={() => {
                    sendEvent(emoji);
                }}>
                    {emoji}
                </button>
            ))}
        </div>
    );
}
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

// Register listeners for timer changes
// This should be done before calling `.initialize()`.

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

// Start a 60 second timer for users in the session.
// If using role verification, this will throw an error if the user doesn't have the required role.
const durationInMilliseconds = 1000 * 60;
await timer.start(durationInMilliseconds);

// Pause the timer for users in session
// If using role verification, this will throw an error if the user doesn't have the required role.
await timer.pause();

// Resume the timer for users in session
// If using role verification, this will throw an error if the user doesn't have the required role.
await timer.play();
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
// Force casting is necessary because Fluid does not maintain type recognition for `container.initialObjects`.
// Casting here is always safe, as the `initialObjects` is constructed based on the schema you provide to `.joinContainer`.
const timer = container.initialObjects.timer as unknown as LiveTimer;

// Register listeners for timer changes
// This should be done before calling `.initialize()`.

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
// If using role verification, this will throw an error if the user doesn't have the required role.
const durationInMilliseconds = 1000 * 60;
await timer.start(durationInMilliseconds);

// Pause the timer for users in session
// If using role verification, this will throw an error if the user doesn't have the required role.
await timer.pause();

// Resume the timer for users in session
// If using role verification, this will throw an error if the user doesn't have the required role.
await timer.play();
```

# [React](#tab/react)

```jsx
import { useLiveTimer } from "@microsoft/live-share-react";

// Define a unique key that differentiates this usage of `useLiveTimer` from others in your app
const MY_UNIQUE_KEY = "timer-key";

// Example component for using useLiveTimer
export function CountdownTimer() {
  const { milliRemaining, timerConfig, start, pause, play } = useLiveTimer("TIMER-ID");

  return (
    <div>
      <button
        onClick={() => {
          start(60 * 1000);
        }}
      >
        { timerConfig === undefined ? "Start" : "Reset" }
      </button>
      { timerConfig !== undefined && (
        <button
          onClick={() => {
            if (timerConfig.running) {
              pause();
            } else {
              play();
            }
          }}
        >
          {timerConfig.running ? "Pause" : "Play" }
        </button>
      )}
      { milliRemaining !== undefined && (
        <p>
          { `${Math.round(milliRemaining / 1000)} / ${Math.round(timerConfig.duration) / 1000}` }
        </p>
      )}
    </div>
  );
}
```

---

### LiveFollowMode example

:::image type="content" source="../assets/images/teams-live-share/live-share-follow-mode.png" alt-text="Image showing three clients with three separate views: a presenting user, a user following the presenter, and a user with their own private view with the option to sync back to the presenter.":::

> [!NOTE]
> `LiveFollowMode` is in Beta and provided as a preview for developers and may change based on feedback that we receive. Do not use this API in a production environment.

The `LiveFollowMode` class combines `LivePresence` and `LiveState` into a single class, enabling you to easily implement follower and presenter modes into your application. This allows you to implement familiar patterns from popular collaborative apps like PowerPoint Live, Excel Live, and Whiteboard. Unlike with screen sharing, `LiveFollowMode` allows you to render content with higher quality, better accessibility, and enhanced performance. Users can easily transition between their own private views and following other users.

To "take control" of the application for all other users in the session, you can use the `startPresenting()` function. Alternatively, you can allow users to individually choose specific users they want to follow using the `followUser()` function. In both scenarios, users can temporarily enter a private view with the `beginSuspension()` function, or sync back to the presenter with the `endSuspension()` function. Meanwhile, the `update()` function allows the local user to tell other clients in the session their own personal `stateValue`. Similar to `LivePresence`, you can listen to changes to each user's `stateValue` through a `presenceChanged` event listener.

`LiveFollowMode` also exposes a `state` object, which dynamically updates depending on which user the local user is following. For example, if the local user is not following anyone, then the `state.value` property will equal the local user's most recent `stateValue` that was broadcast through `update()`. However, if the local user is following a presenter, then the `state.value` property will equal the presenting user's most recent `stateValue`. Similar to `LiveState`, you can listen to changes to the `state` value using a `stateChanged` event listener.

The following are a few examples in which `LiveFollowMode` can be used in your application:

- Synchronizing camera positions in a 3D scene to co-browse during a design review.
- Updating the `slideId` to open in a carousel for productive presentations and discussions.
- Broadcasting the `path` to open in your application's router.

Example:

# [JavaScript](#tab/javascript)

```javascript
import {
  LiveShareClient,
  LiveFollowMode,
  FollowModeType,
} from "@microsoft/live-share";
import { LiveShareHost } from "@microsoft/teams-js";

// Join the Fluid container
const host = LiveShareHost.create();
const liveShare = new LiveShareClient(host);
const schema = {
  initialObjects: {
    followMode: LiveFollowMode,
  },
};
const { container } = await liveShare.joinContainer(schema);
const followMode = container.initialObjects.followMode;

// As an example, we will assume there is a button in the application document
const button = document.getElementById("action-button");
// As an example, we will assume there is a div with text showing the follow state
const infoText = document.getElementById("info-text");

// Register listener for changes to the `state` value to use in your app.
// This should be done before calling `.initialize()`.
followMode.on("stateChanged", (state, local, clientId) => {
  console.log("The state changed:");
  console.log("- state value:", state.value);
  console.log("- follow mode type:", state.type);
  console.log("- following user id:", state.followingUserId);
  console.log("- count of other users also following user", state.otherUsersCount);
  console.log("- state.value references local user's stateValue", state.isLocalValue);
  // Can optionally get the relevant user's presence object
  const followingUser = followMode.getUserForClient(clientId);
  switch (state.type) {
    case FollowModeType.local: {
        // Update app to reflect that the user is not currently following anyone and there is no presenter.
        infoText.innerHTML = "";
        // Show a "Start presenting" button in your app.
        button.innerHTML = "Start presenting";
        button.onclick = async () => {
            await followMode.startPresenting();
        };
        // Note: state.isLocalValue will be true.
        break;
    }
    case FollowModeType.activeFollowers: {
        // Update app to reflect that the local user is being followed by other users.
        infoText.innerHTML = `${state.otherUsersCount} users are following you`;
        // Does not mean that the local user is presenting to everyone, so you can still show the "Start presenting" button.
        button.innerHTML = "Present to all";
        button.onclick = async () => {
            await followMode.startPresenting();
        };
        // Note: state.isLocalValue will be true.
        break;
    }
    case FollowModeType.activePresenter: {
        // Update app to reflect that the local user is actively presenting to everyone.
        infoText.innerHTML = `You are actively presenting to everyone`;
        // Show a "Stop presenting" button in your app.
        button.innerHTML = "Stop presenting";
        button.onclick = async () => {
            await followMode.stopPresenting();
        };
        // Note: state.isLocalValue will be true.
        break;
    }
    case FollowModeType.followPresenter: {
        // The local user is following a remote presenter.
        infoText.innerHTML = `${followingUser?.displayName} is presenting to everyone`;
        // Show a "Take control" button in your app.
        button.innerHTML = "Take control";
        button.onclick = async () => {
            await followMode.startPresenting();
        };
        // Note: state.isLocalValue will be false.
        break;
    }
    case FollowModeType.suspendFollowPresenter: {
        // The local user is following a remote presenter but has an active suspension.
        infoText.innerHTML = `${followingUser?.displayName} is presenting to everyone`;
        // Show a "Sync to presenter" button in your app.
        button.innerHTML = "Sync to presenter";
        button.onclick = async () => {
            await followMode.endSuspension();
        };
        // Note: state.isLocalValue will be true.
        break;
    }
    case FollowModeType.followUser: {
        // The local user is following a specific remote user.
        infoText.innerHTML = `You are following ${followingUser?.displayName}`;
        // Show a "Stop following" button in your app.
        button.innerHTML = "Stop following";
        button.onclick = async () => {
            await followMode.stopFollowing();
        };
        // Note: state.isLocalValue will be false.
        break;
    }
    case FollowModeType.suspendFollowUser: {
        // The local user is following a specific remote user but has an active suspension.
        infoText.innerHTML = `You were following ${followingUser?.displayName}`;
        // Show a "Resume following" button in your app.
        button.innerHTML = "Resume following";
        button.onclick = async () => {
            await followMode.endSuspension();
        };
        // Note: state.isLocalValue will be true.
        break;
    }
    default: {
        break;
    }
  }
  const newCameraPosition = state.value;
  // TODO: apply new camera position
});

// Register listener for changes to each user's personal state updates.
// This should be done before calling `.initialize()`.
followMode.on("presenceChanged", (user, local) => {
  console.log("A user presence changed:");
  console.log("- display name:", user.displayName);
  console.log("- state value:", user.data?.stateValue);
  console.log("- user id user is following:", user.data?.followingUserId);
  console.log("- change from local client", local);
  console.log("- change impacts local user", user.isLocalUser);
  // As an example, we will assume there is a button for each user in the session.
  document.getElementById(`follow-user-${user.userId}-button`).onclick = () => {
    followMode.followUser(user.userId);
  };
  // Update 3D scene to reflect this user's camera position (e.g., orb + display name)
  const userCameraPosition = user.data?.stateValue;
});

// Define the initial stateValue for the local user (optional).
const startingCameraPosition = {
  x: 0,
  y: 0,
  z: 0,
};
// Start receiving incoming presence updates from the session.
// This will also broadcast the user's `startingCameraPosition` to others in the session.
await followMode.initialize(startingCameraPosition);

// Example of an event listener for a camera position changed event.
// For something like a camera change event, you should use a debounce function to prevent sending updates too frequently.
// Note: it helps to distinguish changes initiated by the local user (e.g., drag mouse) separately from other change events.
function onCameraPositionChanged(position, isUserAction) {
    // Broadcast change to other users so that they have their latest camera position
    followMode.update(position);
    // If the local user changed the position while following another user, we want to suspend.
    // Note: helps to distinguish changes initiated by the local user (e.g., drag mouse) separately from other change events.
    if (!isUserAction) return;
    switch (state.type) {
      case FollowModeType.followPresenter:
      case FollowModeType.followUser: {
        // This will trigger a "stateChanged" event update for the local user only.
        followMode.beginSuspension();
        break;
      }
      default: {
        // No need to suspend for other types
        break;
      }
    }
}
```

# [TypeScript](#tab/typescript)

```TypeScript
import {
  LiveShareClient,
  LiveFollowMode,
  FollowModeType,
  IFollowModeState,
  FollowModePresenceUser,
} from "@microsoft/live-share";
import { LiveShareHost } from "@microsoft/teams-js";

// Declare interface for custom data to synchronize with LiveFollowMode.
// In this example, we are synchronizing the camera position in a 3D scene.
interface ICameraPosition {
  x: number;
  y: number;
  z: number;
}

// Join the Fluid container
const host = LiveShareHost.create();
const liveShare = new LiveShareClient(host);
const schema = {
  initialObjects: {
    followMode: LiveFollowMode<ICameraPosition>,
  },
};
const { container } = await liveShare.joinContainer(schema);
// Force casting is necessary because Fluid does not maintain type recognition for `container.initialObjects`.
// Casting here is always safe, as the `initialObjects` is constructed based on the schema you provide to `.joinContainer`.
const followMode = container.initialObjects.followMode as unknown as LiveFollowMode<ICameraPosition>;

// As an example, we will assume there is a button in the application document
const button = document.getElementById("action-button");
// As an example, we will assume there is a div with text showing the follow state
const infoText = document.getElementById("info-text");

// Register listener for changes to the `state` value to use in your app.
// This should be done before calling `.initialize()`.
followMode.on("stateChanged", (state: IFollowModeState<ICameraPosition>, local: boolean, clientId: string) => {
  console.log("The state changed:");
  console.log("- state value:", state.value);
  console.log("- follow mode type:", state.type);
  console.log("- following user id:", state.followingUserId);
  console.log("- count of other users also following user", state.otherUsersCount);
  console.log("- state.value references local user's stateValue", state.isLocalValue);
  // Can optionally get the relevant user's presence object
  const followingUser = followMode.getUserForClient(clientId);
  switch (state.type) {
    case FollowModeType.local: {
        // Update app to reflect that the user is not currently following anyone and there is no presenter.
        infoText.innerHTML = "";
        // Show a "Start presenting" button in your app.
        button.innerHTML = "Start presenting";
        button.onclick = async () => {
            await followMode.startPresenting();
        };
        // Note: state.isLocalValue will be true.
        break;
    }
    case FollowModeType.activeFollowers: {
        // Update app to reflect that the local user is being followed by other users.
        infoText.innerHTML = `${state.otherUsersCount} users are following you`;
        // Does not mean that the local user is presenting to everyone, so you can still show the "Start presenting" button.
        button.innerHTML = "Present to all";
        button.onclick = async () => {
            await followMode.startPresenting();
        };
        // Note: state.isLocalValue will be true.
        break;
    }
    case FollowModeType.activePresenter: {
        // Update app to reflect that the local user is actively presenting to everyone.
        infoText.innerHTML = `You are actively presenting to everyone`;
        // Show a "Stop presenting" button in your app.
        button.innerHTML = "Stop presenting";
        button.onclick = async () => {
            await followMode.stopPresenting();
        };
        // Note: state.isLocalValue will be true.
        break;
    }
    case FollowModeType.followPresenter: {
        // The local user is following a remote presenter.
        infoText.innerHTML = `${followingUser?.displayName} is presenting to everyone`;
        // Show a "Take control" button in your app.
        button.innerHTML = "Take control";
        button.onclick = async () => {
            await followMode.startPresenting();
        };
        // Note: state.isLocalValue will be false.
        break;
    }
    case FollowModeType.suspendFollowPresenter: {
        // The local user is following a remote presenter but has an active suspension.
        infoText.innerHTML = `${followingUser?.displayName} is presenting to everyone`;
        // Show a "Sync to presenter" button in your app.
        button.innerHTML = "Sync to presenter";
        button.onclick = async () => {
            await followMode.endSuspension();
        };
        // Note: state.isLocalValue will be true.
        break;
    }
    case FollowModeType.followUser: {
        // The local user is following a specific remote user.
        infoText.innerHTML = `You are following ${followingUser?.displayName}`;
        // Show a "Stop following" button in your app.
        button.innerHTML = "Stop following";
        button.onclick = async () => {
            await followMode.stopFollowing();
        };
        // Note: state.isLocalValue will be false.
        break;
    }
    case FollowModeType.suspendFollowUser: {
        // The local user is following a specific remote user but has an active suspension.
        infoText.innerHTML = `You were following ${followingUser?.displayName}`;
        // Show a "Resume following" button in your app.
        button.innerHTML = "Resume following";
        button.onclick = async () => {
            await followMode.endSuspension();
        };
        // Note: state.isLocalValue will be true.
        break;
    }
    default: {
        break;
    }
  }
  const newCameraPosition = state.value;
  // TODO: apply new camera position
});

// Optionally, you can register a listener for changes to each user's personal state updates.
// This should be done before calling `.initialize()`.
followMode.on("presenceChanged", (user: FollowModePresenceUser<ICameraPosition>, local: boolean) => {
  console.log("A user presence changed:");
  console.log("- display name:", user.displayName);
  console.log("- state value:", user.data?.stateValue);
  console.log("- userId that user is following:", user.data?.followingUserId);
  console.log("- change from local client", local);
  console.log("- change impacts local user", user.isLocalUser);
  // As an example, we will assume there is a button for each user in the session.
  document.getElementById(`follow-user-${user.userId}-button`)!.onclick = () => {
    followMode.followUser(user.userId);
  };
  // Update 3D scene to reflect this user's camera position (e.g., orb + display name)
  const userCameraPosition = user.data?.stateValue;
});

// Define the initial stateValue for the local user (optional).
const startingCameraPosition: ICameraPosition = {
  x: 0,
  y: 0,
  z: 0,
};
// Start receiving incoming presence updates from the session.
// This will also broadcast the user's `startingCameraPosition` to others in the session.
await followMode.initialize(startingCameraPosition);

// Example of an event listener for a camera position changed event.
// For something like a camera change event, you should use a debounce function to prevent sending updates too frequently.
// Note: it helps to distinguish changes initiated by the local user (e.g., drag mouse) separately from other change events.
function onCameraPositionChanged(position: ICameraPosition, isUserAction: boolean) {
    // Broadcast change to other users so that they have their latest camera position
    followMode.update(position);
    // If the local user changed the position while following another user, we want to suspend.
    // Note: helps to distinguish changes initiated by the local user (e.g., drag mouse) separately from other change events.
    if (!isUserAction) return;
    switch (state.type) {
      case FollowModeType.followPresenter:
      case FollowModeType.followUser: {
        // This will trigger a "stateChanged" event update for the local user only.
        followMode.beginSuspension();
        break;
      }
      default: {
        // No need to suspend for other types
        break;
      }
    }
}
```

# [React](#tab/react)

```jsx
import { FollowModeType } from "@microsoft/live-share";
import { useLiveFollowMode } from "@microsoft/live-share-react";
// As an example, we will use a fake component to denote what a 3D viewer might look like in an app
import { Example3DModelViewer } from "./components";

// Define a unique key that differentiates this usage of `useLiveFollowMode` from others in your app
const MY_UNIQUE_KEY = "follow-mode-key";

// Define the initial stateValue for the local user (optional).
const startingCameraPosition = {
  x: 0,
  y: 0,
  z: 0,
};

// Example component for using useLivePresence
export const MyLiveFollowMode = () => {
    const {
      state,
      localUser,
      otherUsers,
      allUsers,
      liveFollowMode,
      update,
      startPresenting,
      stopPresenting,
      beginSuspension,
      endSuspension,
      followUser,
      stopFollowing,
    } = useLiveFollowMode(MY_UNIQUE_KEY, startingCameraPosition);

    // Example of an event listener for a camera position changed event.
    // For something like a camera change event, you should use a debounce function to prevent sending updates too frequently.
    // Note: it helps to distinguish changes initiated by the local user (e.g., drag mouse) separately from other change events.
    function onCameraPositionChanged(position, isUserAction) {
        // Broadcast change to other users so that they have their latest camera position
        update(position);
        // If the local user changed the position while following another user, we want to suspend.
        // Note: helps to distinguish changes initiated by the local user (e.g., drag mouse) separately from other change events.
        if (!isUserAction) return;
        switch (state.type) {
          case FollowModeType.followPresenter:
          case FollowModeType.followUser: {
            // This will trigger a "stateChanged" event update for the local user only.
            followMode.beginSuspension();
            break;
          }
          default: {
            // No need to suspend for other types
            break;
          }
        }
    }

    // Can optionally get the relevant user's presence object
    const followingUser = liveFollowMode?.getUser(state.followingUserId);

    // Render UI
    return (
        <div>
            {state.type === FollowModeType.local && (
                <div>
                    <p>{""}</p>
                    <button onClick={startPresenting}>
                        {"Start presenting"}
                    </button>
                </div>
            )}
            {state.type === FollowModeType.activeFollowers && (
                <div>
                    <p>{`${state.otherUsersCount} users are following you`}</p>
                    <button onClick={startPresenting}>
                        {"Present to all"}
                    </button>
                </div>
            )}
            {state.type === FollowModeType.activePresenter && (
                <div>
                    <p>{`You are actively presenting to everyone`}</p>
                    <button onClick={stopPresenting}>
                        {"Stop presenting"}
                    </button>
                </div>
            )}
            {state.type === FollowModeType.followPresenter && (
                <div>
                    <p>{`${followingUser?.displayName} is presenting to everyone`}</p>
                    <button onClick={startPresenting}>
                        {"Take control"}
                    </button>
                </div>
            )}
            {state.type === FollowModeType.suspendFollowPresenter && (
                <div>
                    <p>{`${followingUser?.displayName} is presenting to everyone`}</p>
                    <button onClick={endSuspension}>
                        {"Sync to presenter"}
                    </button>
                </div>
            )}
            {state.type === FollowModeType.followUser && (
                <div>
                    <p>{`You are following ${followingUser?.displayName}`}</p>
                    <button onClick={stopFollowing}>
                        {"Stop following"}
                    </button>
                </div>
            )}
            {state.type === FollowModeType.suspendFollowUser && (
                <div>
                    <p>{`You were following ${followingUser?.displayName}`}</p>
                    <button onClick={stopFollowing}>
                        {"Resume following"}
                    </button>
                </div>
            )}
            <div>
                <p>{"Follow a specific user:"}</p>
                {otherUsers.map((user) => (
                    <button onClick={() => {
                        followUser(user.userId);
                    }} key={user.userId}>
                        {user.displayName}
                    </button>
                ))}
            </div>
            <Example3DModelViewer
                cameraPosition={state.value}
                onCameraPositionChanged={onCameraPositionChanged}
            />
        </div>
    );
}
```

---

## Role verification for live data structures

Meetings in Teams include calls, all-hands meetings, and online classrooms. Meeting participants might span across organizations, have different privileges, or simply have different goals. Hence, it’s important to respect the privileges of different user roles during meetings. Live objects are designed to support role verification, allowing you to define the roles that are allowed to send messages for each individual live object. For example, you could choose that only meeting presenters and organizers can control video playback, but still allow guests and attendees to request videos to watch next.

In the following example where only presenters and organizers can take control, `LiveState` is used to synchronize which user is the active presenter:

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

// Register listener for changes to state
appState.on("stateChanged", (state, local) => {
  // Update local app state
});

// Set roles who can change state and start listening for changes
const initialState = {
  documentId: "INITIAL_DOCUMENT_ID",
};
const allowedRoles = [UserMeetingRole.organizer, UserMeetingRole.presenter];
await appState.initialize(initialState, allowedRoles);

async function onSelectEditMode(documentId) {
  try {
    await appState.set({
      documentId,
    });
  } catch (error) {
    console.error(error);
  }
}

async function onSelectPresentMode(documentId) {
  try {
    await appState.set({
      documentId,
      presentingUserId: "LOCAL_USER_ID",
    });
  } catch (error) {
    console.error(error);
  }
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

// Register listener for changes to state
appState.on("stateChanged", (state: ICustomState, local: boolean) => {
  // Update local app state
});

// Set roles who can change state and start listening for changes
const initialState: ICustomState = {
  documentId: "INITIAL_DOCUMENT_ID",
};
const allowedRoles: UserMeetingRole[] = [UserMeetingRole.organizer, UserMeetingRole.presenter];
await appState.initialize(initialState, allowedRoles);

async function onSelectEditMode(documentId: string) {
  try {
    await appState.set({
      documentId,
    });
  } catch (error: Error) {
    console.error(error);
  }
}

async function onSelectPresentMode(documentId: string) {
  try {
    await appState.set({
      documentId,
      presentingUserId: "LOCAL_USER_ID",
    });
  } catch (error: Error) {
    console.error(error);
  }
}
```

# [React](#tab/react)

```jsx
import { useLiveState } from "@microsoft/live-share-react";

// Define a unique key that differentiates this usage of `useLiveState` from others in your app
const MY_UNIQUE_KEY = "unique-key";
// Define the initial state
const INITIAL_STATE = {
  documentId: "INITIAL_DOCUMENT_ID",
};
// Define the allowed roles
const ALLOWED_ROLES = [UserMeetingRole.organizer, UserMeetingRole.presenter];

// Example component for using useLiveState
export const MyCustomState = () => {
    const [state, setState] = useLiveState(MY_UNIQUE_KEY, INITIAL_STATE, ALLOWED_ROLES);

    const onTakeControl = async () => {
        try {
            await setState({
                ...state,
                presentingUserId: "<LOCAL_USER_ID>",
            });
        } catch (error) {
            console.error(error);
        }
    };

    // Render UI
    return (
        <div>
            {`Current document: ${state.documentId}`}
            {`Current presenter: ${state.presentingUserId}`}
            <button onClick={onTakeControl}>
                Take control
            </button>
        </div>
    );
}
```

---

Listen to your customers to understand their scenarios before implementing role verification into your app, particularly for the **Organizer** role. There's no guarantee that a meeting organizer be present in the meeting. As a general rule of thumb, all users are either **Organizer** or **Presenter** when collaborating within an organization. If a user is an **Attendee**, it's usually an intentional decision on behalf of a meeting organizer.

In some cases, a user may have multiple roles. For example, an **Organizer** is also an **Presenter**. In addition, meeting participants that are external to the tenant hosting the meeting have the **Guest** role, but may also have **Presenter** privileges. This provides a lot of flexibility in how you use role verification in your application.

> [!NOTE]
> The Live Share SDK isn't supported for **Guest** users in channel meetings.

## Fluid distributed data structures

The Live Share SDK supports any [distributed data structure](https://fluidframework.com/docs/data-structures/overview/) included in Fluid Framework. These features serve as a set of primitives you can use to build robust collaborative scenarios, such as real-time updates of a task list or co-authoring text within an HTML `<textarea>`.

Unlike the `LiveDataObject` classes mentioned in this article, Fluid data structures don't reset after your application is closed. This is ideal for scenarios such as the meeting side panel, where users frequently close and reopen your app while using other tabs in the meeting, such as chat.

Fluid Framework officially supports the following types of distributed data structures:

| Shared Object                                                                       | Description                                                                                                                             |
| ----------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------- |
| [SharedMap](https://fluidframework.com/docs/data-structures/map/)                   | A distributed key-value store. Set any JSON-serializable object for a given key to synchronize that object for everyone in the session. |
| [SharedSegmentSequence](https://fluidframework.com/docs/data-structures/sequences/) | A list-like data structure for storing a set of items (called segments) at set positions.                                               |
| [SharedString](https://fluidframework.com/docs/data-structures/string/)             | A distributed-string sequence optimized for editing the text of documents or text areas.                                                  |

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
const playlistMap = container.initialObjects.playlistMap;

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
const playlistMap = container.initialObjects.playlistMap as unknown as SharedMap;

// Declare interface for object being stored in map
interface IVideo {
  id: string;
  url: string;
  title: string;
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

# [React](#tab/react)

```jsx
import { useSharedMap } from "@microsoft/live-share-react";
import { v4 as uuid } from "uuid";

// Unique key that distinguishes this useSharedMap from others in your app
const UNIQUE_KEY = "CUSTOM-MAP-ID"

export function PlaylistMapExample() {
  const { map, setEntry, deleteEntry } = useSharedMap(UNIQUE_KEY);
  return (
    <div>
      <h2>{"Videos"}</h2>
      <button
        onClick={() => {
          const id = uuid();
          setEntry(id, {
            id,
            url: "<YOUR_VIDEO_URL>",
            title: "<VIDEO_TITLE>",
          });
        }}
      >
        {"+ Add video"}
      </button>
      <div>
        {[...map.values()].map((video) => (
          <div key={video.id}>
            {video.title}
          </div>
        ))}
      </div>
    </div>
  );
}
```

---

> [!NOTE]
> Core Fluid Framework DDS objects don't support meeting role verification. Everyone in the meeting can change the data stored through these objects.

## Local browser testing

You can test the Live Share SDK locally in your browser using the `TestLiveShareHost` class without installing your app in Teams. This is useful for testing the core collaborative capabilities of your application in a familiar `localhost` environment.

Example:

# [JavaScript](#tab/javascript)

```javascript
import { LiveShareClient, TestLiveShareHost, LiveState } from "@microsoft/live-share";
import { LiveShareHost } from "@microsoft/teams-js";
import { SharedMap } from "fluid-framework";

/**
 * Detect whether you are in Teams or local environment using your preferred method.
 * Options for this include: environment variables, URL params, Teams FX, etc.
 */
const inTeams = process.env.IN_TEAMS;
// Join the Fluid container
const host = inTeams
  ? LiveShareHost.create()
  : TestLiveShareHost.create();
const liveShare = new LiveShareClient(host);
const schema = {
  initialObjects: {
    liveState: LiveState,
    sharedMap: SharedMap,
  },
};
const { container } = await liveShare.joinContainer(schema);

// ... ready to start app sync logic
```

# [TypeScript](#tab/typescript)

```TypeScript
import {
  LiveShareClient,
  TestLiveShareHost,
  LiveState,
  ILiveShareHost,
} from "@microsoft/live-share";
import { LiveShareHost } from "@microsoft/teams-js";
import { ContainerSchema, SharedMap } from "fluid-framework";

/**
 * Detect whether you are in Teams or local environment using your preferred method.
 * Options for this include: environment variables, URL params, Teams FX, etc.
 */
const inTeams = process.env.IN_TEAMS;
// Join the Fluid container
const host: ILiveShareHost = inTeams
  ? LiveShareHost.create()
  : TestLiveShareHost.create();
const liveShare = new LiveShareClient(host);
const schema: ContainerSchema = {
  initialObjects: {
    exampleMap: SharedMap,
    liveState: LiveState,
  },
};
const { container } = await liveShare.joinContainer(schema);

// ... ready to start app sync logic
```

# [React](#tab/react)

```jsx
import { TestLiveShareHost } from "@microsoft/live-share";
import { LiveShareHost } from "@microsoft/teams-js";
import { LiveShareProvider, useLiveShareContext } from "@microsoft/live-share-react";
import { useState } from "react";

/**
 * Detect whether you are in Teams or local environment using your preferred method.
 * Options for this include: environment variables, URL params, Teams FX, etc.
 */
const inTeams = process.env.IN_TEAMS;

export const App = () => {
    // Create the host as React state so that it doesn't get reset on mount
    const [host] = useState(
        inTeams ? LiveShareHost.create() : TestLiveShareHost.create()
    );

    // Live Share for React does not require that you define a custom Fluid schema
    return (
        <LiveShareProvider host={host} joinOnLoad>
            <LiveShareLoading />
        </LiveShareProvider>
    );
}

const LiveShareLoading = () => {
    // Any live-share-react hook (e.g., useLiveShareContext, useLiveState, etc.) must be a child of <LiveShareProvider>
    const { joined } = useLiveShareContext();
    if (joined) {
        return <p>{"Loading..."}</p>;
    }
    return <p>{"Your app here..."}</p>;
}
```

---

The `TestLiveShareHost` class leverages Fluid Framework's `tinylicious` test server, rather than our production Azure Fluid Relay service. To do this, you must add a few scripts to your `package.json` to start the test server. You also must also add the `@fluidframework/test-client-utils` and `start-server-and-test` packages to the `devDependencies` in your `package.json`.

```json
{
    "scripts": {
        "start": "start-server-and-test start:server 7070 start:client",
        "start:client": "{YOUR START CLIENT COMMAND HERE}",
        "start:server": "npx tinylicious@latest"
    },
    "devDependencies": {
        "@fluidframework/test-client-utils": "^1.3.6",
        "start-server-and-test": "^2.0.0"
    }
}
```

When you start your application this way, the `LiveShareClient` will add `#{containerId}` to your URL, if one doesn't already exist. You can then copy and paste the URL into a new browser window to connect to the same Fluid container.

> [!NOTE]
> By default, all clients connected through `TestLiveShareHost` will have `presenter` and `organizer` roles.

## Code samples

| Sample name | Description                                                     | JavaScript                                  | TypeScript                                  |
| ----------- | --------------------------------------------------------------- | ------------------------------------------- | ---------------------------------------------- |
| Dice Roller | Enable all connected clients to roll a die and view the result. | [View](https://aka.ms/liveshare-diceroller) | [View](https://aka.ms/liveshare-diceroller-ts) |
| Agile Poker | Enable all connected clients to play Agile Poker.               | [View](https://aka.ms/liveshare-agilepoker) |                        |
| 3D Model    | Enable all connected clients to view a 3D model together.       |                          | [View](https://aka.ms/liveshare-3dviewer-ts)                       |
| Timer       | Enable all connected clients to view a countdown timer.         |                          | [View](https://aka.ms/liveshare-timer-ts)                          |
| Presence avatars | Display presence avatars for all connected clients.        |                          | [View](https://aka.ms/liveshare-presence-ts)                       |

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
