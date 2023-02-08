---
title: Live Share media capabilities
author: surbhigupta
description: In this module, learn more about Live Share media capabilities, suspensions and wait points, audio ducking, and synchronizing video and audio.
ms.topic: conceptual
ms.localizationpriority: high
ms.author: v-ypalikila
ms.date: 04/07/2022
---

# Live Share media capabilities

:::image type="content" source="../assets/images/teams-live-share/live-share-media-capabilities-docs-feature-1.png" alt-text="Teams Live Share media synchronization":::

Video and audio are instrumental parts of the modern world and workplace. We've heard wide ranging feedback that there's more we can do to increase the quality, accessibility, and license protections of watching videos together in meetings.

The Live Share SDK enables robust **media synchronization** for any HTML `<video>` and `<audio>` element with just a few lines of code. By synchronizing media at the player state and transport controls layer, you can individually attribute views and license, while providing the highest possible quality available through your app.

## Install

To add the latest version of the SDK to your application using npm:

```bash
npm install @microsoft/live-share@next --save
npm install @microsoft/live-share-media@next --save
```

OR

To add the latest version of the SDK to your application using [Yarn](https://yarnpkg.com/):

```bash
yarn add @microsoft/live-share@next
yarn add @microsoft/live-share-media@next
```

## Media sync overview

The Live Share SDK has two primary classes related to media synchronization:

| Classes                                                                                        | Description                                                                                                                                       |
| ---------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------- |
| `LiveMediaSession` | Custom live object designed to coordinate media transport controls and playback state in independent media streams.                          |
| [MediaPlayerSynchronizer](/javascript/api/@microsoft/live-share-media/mediaplayersynchronizer) | Synchronizes any object that implements the `IMediaPlayer` interface -- including HTML5 `<video>` and `<audio>` -- using `LiveMediaSession`. |

Example:

```html
<body>
  <video id="player">
    <source src="YOUR_VIDEO_SRC" type="video/mp4" />
  </video>
</body>
```

# [JavaScript](#tab/javascript)

```javascript
import { LiveShareClient, UserMeetingRole } from "@microsoft/live-share";
import { LiveMediaSession } from "@microsoft/live-share-media";
import { LiveShareHost } from "@microsoft/teams-js";

// Setup the Fluid container
const host = LiveShareHost.create();
const liveShare = new LiveShareClient(host);
const schema = {
  initialObjects: { mediaSession: LiveMediaSession },
};
const { container } = await liveShare.joinContainer(schema);
const { mediaSession } = container.initialObjects;

// Get the player from your document and create synchronizer
const player = document.getElementById("player");
const synchronizer = mediaSession.synchronize(player);

// Define roles you want to allow playback control and start sync
const allowedRoles = [UserMeetingRole.organizer, UserMeetingRole.presenter];
await mediaSession.initialize(allowedRoles);
```

# [TypeScript](#tab/typescript)

```TypeScript
import { LiveShareClient, UserMeetingRole } from "@microsoft/live-share";
import { LiveMediaSession, IMediaPlayer, MediaPlayerSynchronizer } from "@microsoft/live-share-media";
import { LiveShareHost } from "@microsoft/teams-js";
import { ContainerSchema } from "fluid-framework";

// Join the Fluid container
const host = LiveShareHost.create();
const liveShare = new LiveShareClient(host);
const schema: ContainerSchema = {
  initialObjects: { mediaSession: LiveMediaSession },
};
const { container } = await liveShare.joinContainer(schema);
const mediaSession = container.initialObjects.mediaSession as LiveMediaSession;

// Get the player from your document and create synchronizer
const player: IMediaPlayer = document.getElementById("player") as HTMLVideoElement;
const synchronizer: MediaPlayerSynchronizer = mediaSession.synchronize(player);

// Define roles you want to allow playback control and start sync
const allowedRoles: UserMeetingRole[] = [UserMeetingRole.organizer, UserMeetingRole.presenter];
await mediaSession.initialize(allowedRoles);
```

---

The `LiveMediaSession` automatically listens for changes to the group's playback state. `MediaPlayerSynchronizer` listens to state changes emitted by `LiveMediaSession` and applies them to the provided `IMediaPlayer` object, such as an HTML5 `<video>` or `<audio>` element. To avoid playback state changes that a user didn't intentionally initiate, such as a buffer event, we must call transport controls through the synchronizer, rather than directly through the player.

Example:

```html
<body>
  <video id="player">
    <source src="YOUR_VIDEO_SRC" type="video/mp4" />
  </video>
  <div class="player-controls">
    <button id="play-button">Play</button>
    <button id="pause-button">Pause</button>
    <button id="restart-button">Restart</button>
    <button id="change-track-button">Change track</button>
  </div>
</body>
```

```javascript
// ...

document.getElementById("play-button").onclick = () => {
  synchronizer.play();
};

document.getElementById("pause-button").onclick = () => {
  synchronizer.pause();
};

document.getElementById("restart-button").onclick = () => {
  synchronizer.seekTo(0);
};

document.getElementById("change-track-button").onclick = () => {
  synchronizer.setTrack({
    trackIdentifier: "SOME_OTHER_VIDEO_SRC",
  });
};
```

> [!NOTE]
> While you can use the `LiveMediaSession` object to synchronize media manually, it's generally recommend to use the `MediaPlayerSynchronizer`. Depending on the player you use in your app, you might need to create a delegate shim to make your web player's interface match the [IMediaPlayer](/javascript/api/@microsoft/live-share-media/imediaplayer) interface.

## Suspensions and wait points

:::image type="content" source="../assets/images/teams-live-share/live-share-media-out-of-sync.png" alt-text="Screenshot that shows a suspension sync to the presenter.":::

If you want to temporarily suspend synchronization for the `LiveMediaSession` object, you can use suspensions. A `MediaSessionCoordinatorSuspension` object is local by default, which can be helpful in cases where a user might want to catch up on something they missed, take a break, and so on. If the user ends the suspension, synchronization resumes automatically.

# [JavaScript](#tab/javascript)

```javascript
// Suspend the media session coordinator
const suspension = mediaSession.coordinator.beginSuspension();

// End the suspension when ready
suspension.end();
```

# [TypeScript](#tab/typescript)

```TypeScript
import { MediaSessionCoordinatorSuspension } from "@microsoft/live-share-media";

// Suspend the media session coordinator
const suspension: MediaSessionCoordinatorSuspension = mediaSession.coordinator.beginSuspension();

// End the suspension when ready
suspension.end();
```

---

When beginning a suspension, you can also include an optional [CoordinationWaitPoint](/javascript/api/@microsoft/live-share-media/coordinationwaitpoint) parameter, which allows users to define the timestamps in which a suspension should occur for all users. Synchronization won't resume until all users have ended the suspension for that wait point.

Here are a few scenarios where wait points are especially useful:

- Adding a quiz or survey at certain points in the video.
- Waiting for everyone to suitably load a video before it starts or while buffering.
- Allow a presenter to choose points in the video for group discussion.

# [JavaScript](#tab/javascript)

```javascript
// Suspend the media session coordinator
const waitPoint = {
  position: 0,
  reason: "ReadyUp", // Optional.
};
const suspension = mediaSession.coordinator.beginSuspension(waitPoint);
// End the suspension when the user readies up
document.getElementById("ready-up-button").onclick = () => {
  // Sync will resume when everyone has ended suspension
  suspension.end();
};
```

# [TypeScript](#tab/typescript)

```TypeScript
import { MediaSessionCoordinatorSuspension, CoordinationWaitPoint } from "@microsoft/live-share-media";

// Suspend the media session coordinator
const waitPoint: CoordinationWaitPoint = {
  position: 0,
  reason: "ReadyUp", // Optional.
};
const suspension = mediaSession.coordinator.beginSuspension(waitPoint);

// End the suspension when the user readies up
document.getElementById("ready-up-button")!.onclick = () => {
  // Sync will resume when everyone has ended suspension
  suspension.end();
};
```

---

## Audio ducking

The Live Share SDK supports intelligent audio ducking. You can use the feature in your application by adding the following to your code:

# [JavaScript](#tab/javascript)

```javascript
import { meeting } from "@microsoft/teams-js";

// ... set up MediaPlayerSynchronizer

// Register speaking state change handler through Microsoft Teams JavaScript client library (TeamsJS)
let volumeTimer;
meeting.registerSpeakingStateChangeHandler((speakingState) => {
  if (speakingState.isSpeakingDetected && !volumeTimer) {
    // If someone in the meeting starts speaking, periodically
    // lower the volume using your MediaPlayerSynchronizer's
    // VolumeLimiter.
    synchronizer.volumeLimiter?.lowerVolume();
    volumeTimer = setInterval(() => {
      synchronizer.volumeLimiter?.lowerVolume();
    }, 250);
  } else if (volumeTimer) {
    // If everyone in the meeting stops speaking and the
    // interval timer is active, clear the interval.
    clearInterval(volumeTimer);
    volumeTimer = undefined;
  }
});
```

# [TypeScript](#tab/typescript)

```TypeScript
import { meeting } from "@microsoft/teams-js";

// ... set up MediaPlayerSynchronizer

// Register speaking state change handler through TeamsJS library
let volumeTimer: NodeJS.Timeout | undefined;
meeting.registerSpeakingStateChangeHandler((speakingState: meeting.ISpeakingState) => {
  if (speakingState.isSpeakingDetected && !volumeTimer) {
    // If someone in the meeting starts speaking, periodically
    // lower the volume using your MediaPlayerSynchronizer's
    // VolumeLimiter.
    synchronizer.volumeLimiter?.lowerVolume();
    volumeTimer = setInterval(() => {
      synchronizer.volumeLimiter?.lowerVolume();
    }, 250);
  } else if (volumeTimer) {
    // If everyone in the meeting stops speaking and the
    // interval timer is active, clear the interval.
    clearInterval(volumeTimer);
    volumeTimer = undefined;
  }
});
```

---

Additionally, add the following [RSC](/microsoftteams/platform/graph-api/rsc/resource-specific-consent) permissions into your app manifest:

```json
{
  // ...rest of your manifest here
  "authorization": {​
    "permissions": {​
      "resourceSpecific": [
        // ...other permissions here​
        {​
          "name": "OnlineMeetingIncomingAudio.Detect.Chat",​
          "type": "Delegated"
        },
        {​
          "name": "OnlineMeetingIncomingAudio.Detect.Group",​
          "type": "Delegated"​
        }​
      ]​
    }​
  }​
}
```

> [!NOTE]
> The `registerSpeakingStateChangeHandler` API used for audio ducking currently only works on Microsoft Teams desktop and in scheduled and meet now meeting types.

## Code samples

| Sample name          | Description                                                                                                                               | JavaScript                                     |
| -------------------- | ----------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------- |
| React video          | Basic example showing how the LiveMediaSession object works with HTML5 video.                                                        | [View](https://aka.ms/liveshare-reactvideo)    |
| React media template | Enable all connected clients to watch videos together, build a shared playlist, transfer whom is in control, and annotate over the video. | [View](https://aka.ms/liveshare-mediatemplate) |

## Next step

> [!div class="nextstepaction"]
> [Live Share canvas](teams-live-share-canvas.md)

## See also

- [Apps for Teams meetings](teams-apps-in-meetings.md)
- [Live Share SDK FAQ](teams-live-share-faq.md)
- [Live Share SDK reference docs](/javascript/api/@microsoft/live-share/)
- [Live Share Media SDK reference docs](/javascript/api/@microsoft/live-share-media/)
- [Use Fluid with Teams](../tabs/how-to/using-fluid-msteam.md)
- [App manifest schema for Teams](../resources/schema/manifest-schema.md)
