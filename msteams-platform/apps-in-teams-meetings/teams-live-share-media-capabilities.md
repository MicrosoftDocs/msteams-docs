---
title: Live Share media capabilities
description: Synchronizing video and audio with Live Share
ms.topic: concept
ms.localizationpriority: high
ms.author: v-ypalikila
---

---

# Live Share media capabilities

For complete API-level documentation, please visit the Live Share [API reference docs](https://www.github.com/microsoft/live-share-sdk).

Video and audio are instrumental parts of the modern world and workplace. We've heard wide ranging feedback that there is more we can do to increase the quality, accessibility, and license protections of watching videos together in meetings.

Live Share makes enabling **media synchronization** into any HTML `<video>` and `<audio>` element simpler than ever before. By synchronizing media at the player state and transport controls layer, developers can individually attribute views and license, while providing the highest possible quality available through your app.

## Media sync overview

Live Share has two primary classes related to media synchronization:

| Classes                   | Description                                                                                                              |
| ------------------------- | ------------------------------------------------------------------------------------------------------------------------ |
| `EphemeralMediaSession`   | Custom ephemeral object designed to coordinate media transport controls and playback state in independent media streams. |
| `MediaPlayerSynchronizer` | Synchronizes a local HTML Media Element with a group of remote HTML Media Elements for an `EphemeralMediaSession`.       |

Let's look at an example of this in the code.

```html
<body>
  <video id="player">
    <source src="YOUR_VIDEO_SRC" type="video/mp4" />
  </video>
</body>
```

```javascript
import * as microsoftTeams from "@microsoft/teams-js";
import { TeamsFluidClient } from "@microsoft/live-share";
import { EphemeralMediaSession } from "@microsoft/live-share-media";

// Initialize the Teams Client SDK
await microsoftTeams.app.initialize();

// Setup the Fluid container
const client = new TeamsFluidClient();
const schema = {
  initialObjects: { mediaSession: EphemeralMediaSession }
};
const { container } = await client.joinContainer(schema);
const { mediaSession } = container.initialObjects;

// Get the player from your document and create synchronizer
const player = document.getElementById("player");
const synchronizer = mediaSession.synchronize(player);

// Define roles you want to allow playback control and start sync
const allowedRoles = ["Organizer", "Presenter"];
await mediaSession.start(allowedRoles);
```

The `EphemeralMediaSession` automatically listens for changes to the group's playback state and automatically applies changes through the `MediaPlayerSynchronizer`. To avoid playback state changes that a user didn't intentionally initiate, such as a buffer event, we must call transport controls through the synchronizer, rather than directly through the player.

Let's do that now.

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
    trackIdentifier: "SOME_OTHER_VIDEO_SRC"
  });
};
```

> [!Note]
> While you can use the `EphemeralMediaSession` object to synchronize media directly, we recommend using the `MediaPlayerSynchronizer` unless you want more fine tuned control of the synchronization logic. Depending on the player you use in your app, you may want to create a delegate shim to make your web player's interface match the HTML media interface.

## Suspensions and wait points

If you want to temporarily suspend synchronization for the `EphemeralMediaSession` object, you can use suspensions. A `MediaSessionCoordinatorSuspension` object is local by default, which can be helpful in cases where a user may want to catch up on something they missed, take a break, etc. If the user ends the suspension, synchronization resumes automatically.

```javascript
// Suspend the media session coordinator
const suspension = mediaSession.coordinator.beginSuspension();

// End the suspension when ready
suspension.end();
```

When beginning a suspension, you can also include an optional `CoordinationWaitPoint` parameter, which allows users to define the timestamps in which a suspension should occur for all users. Synchronization won't resume until all users have ended the suspension for that wait point. This is useful for things like adding a quiz or survey at certain points in the video.

```javascript
// Suspend the media session coordinator
const waitPoint = {
  position: 0,
  reason: "ReadyUp" // Optional.
};
const suspension = mediaSession.coordinator.beginSuspension();
// End the suspension when the user readies up
document.getElementById("ready-up-button").onclick = () => {
  // Sync will resume when everyone has ended suspension
  suspension.end();
};
```

## Audio ducking

At Build 2022, we announced intelligent audio ducking. In the coming months, we will be refining this feature to ultimately integrate with the MediaSynchronizer by default. Until then, if you want to try this _experimental_ feature in your application, add the following to your code.

```javascript
import * as microsoftTeams from "@microsoft/teams-js";

// ...

let volumeTimer;
microsoftTeams.meeting.registerSpeakingStateChangeHandler(speakingState => {
  if (speakingState.isSpeakingDetected && !volumeTimer) {
    volumeTimer = setInterval(() => {
      synchronizer.volumeLimiter?.lowerVolume();
    }, 250);
  } else if (volumeTimer) {
    clearInterval(volumeTimer);
    volumeTimer = undefined;
  }
});
```

To enable audio ducking, you must also add the following [RSC](https://docs.microsoft.com/microsoftteams/platform/graph-api/rsc/resource-specific-consent) permissions into your app manifest:

```json
{
  // ...rest of your manifest here
  "authorization": {​
    "permissions": {​
      "resourceSpecific": [
        // ...other permissions here​
        {​
          "name": "OnlineMeetingIncomingAudio.Detect.Chat",​
          "type": "Delegated“​
        },
        {​
          "name": “OnlineMeetingIncomingAudio.Detect.Group",​
          "type": "Delegated“​
        }​
      ]​
    }​
  }​
}
```

> [!Note]
> The `registerSpeakingStateChangeHandler` API used for audio ducking currently only works for non-local users who are speaking.

## Code samples

| Sample name          | Description                                                                                                                               | Javascript                                                                                    |
| -------------------- | ----------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------- |
| React video          | Basic example showing how the EphemeralMediaSession object works with HTML5 video.                                                                     | [View](https://aka.ms/liveshare-reactvideo)          |
| React media template | Enable all connected clients to watch videos together, build a shared playlist, transfer whom is in control, and annotate over the video. | [View](https://aka.ms/liveshare-mediatemplate) |

## Next step

> [!div class="nextstepaction"] > [Getting started](teams-live-share-getting-started.md)

## See also

- [Reference docs](https://www.github.com/microsoft/live-share-sdk)
- [Live Share on GitHub](https://www.github.com/microsoft/live-share-sdk)
- [Live Share capabilities](teams-apps-in-meetings.md)
- [Teams apps in meetings](teams-apps-in-meetings.md)
