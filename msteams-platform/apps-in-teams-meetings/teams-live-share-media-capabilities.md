---
title: Live Share media capabilities
description: In this module, learn more about Live Share media capabilities, suspensions and wait points, audio ducking, and synchronizing video and audio.
ms.topic: concept
ms.localizationpriority: high
ms.author: v-ypalikila
---

---

# Live Share media capabilities

Video and audio are instrumental parts of the modern world and workplace. We've heard wide ranging feedback that there is more we can do to increase the quality, accessibility, and license protections of watching videos together in meetings.

The Live Share SDK enables **media synchronization** into any HTML `<video>` and `<audio>` element simpler than ever before. By synchronizing media at the player state and transport controls layer, you can individually attribute views and license, while providing the highest possible quality available through your app.

## Install

To add the latest version of the SDK to your application using npm:

```bash
npm install @microsoft/live-share --save
npm install @microsoft/live-share-media --save
```

OR

To add the latest version of the SDK to your application using [Yarn](https://yarnpkg.com/):

```bash
yarn add @microsoft/live-share
yarn add @microsoft/live-share-media
```

## Media sync overview

The Live Share SDK has two primary classes related to media synchronization:

| Classes                                                                                                                                  | Description                                                                                                              |
| ---------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------ |
| [EphemeralMediaSession](https://livesharesdk.z5.web.core.windows.net/classes/_microsoft_live_share_media.EphemeralMediaSession.html)     | Custom ephemeral object designed to coordinate media transport controls and playback state in independent media streams. |
| [MediaPlayerSynchronizer](https://livesharesdk.z5.web.core.windows.net/classes/_microsoft_live_share_media.MediaPlayerSynchronizer.html) | Synchronizes a local HTML Media Element with a group of remote HTML Media Elements for an `EphemeralMediaSession`.       |

Example:

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
  initialObjects: { mediaSession: EphemeralMediaSession },
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

The `EphemeralMediaSession` automatically listens for changes to the group's playback state and applies changes through the `MediaPlayerSynchronizer`. To avoid playback state changes that a user didn't intentionally initiate, such as a buffer event, we must call transport controls through the synchronizer, rather than directly through the player.

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

> [!Note]
> While you can use the `EphemeralMediaSession` object to synchronize media directly, using the `MediaPlayerSynchronizer` unless you want more fine tuned control of the synchronization logic. Depending on the player you use in your app, you might want to create a delegate shim to make your web player's interface match the HTML media interface.

## Suspensions and wait points

If you want to temporarily suspend synchronization for the `EphemeralMediaSession` object, you can use suspensions. A [MediaSessionCoordinatorSuspension](https://livesharesdk.z5.web.core.windows.net/classes/_microsoft_live_share_media.EphemeralMediaSessionCoordinatorSuspension.html) object is local by default, which can be helpful in cases where a user might want to catch up on something they missed, take a break, and so on. If the user ends the suspension, synchronization resumes automatically.

```javascript
// Suspend the media session coordinator
const suspension = mediaSession.coordinator.beginSuspension();

// End the suspension when ready
suspension.end();
```

When beginning a suspension, you can also include an optional [CoordinationWaitPoint](https://livesharesdk.z5.web.core.windows.net/interfaces/_microsoft_live_share_media.CoordinationWaitPoint.html) parameter, which allows users to define the timestamps in which a suspension should occur for all users. Synchronization won't resume until all users have ended the suspension for that wait point. This is useful for things like adding a quiz or survey at certain points in the video.

```javascript
// Suspend the media session coordinator
const waitPoint = {
  position: 0,
  reason: "ReadyUp", // Optional.
};
const suspension = mediaSession.coordinator.beginSuspension();
// End the suspension when the user readies up
document.getElementById("ready-up-button").onclick = () => {
  // Sync will resume when everyone has ended suspension
  suspension.end();
};
```

## Audio ducking

Live SHare SDK supports intelligent audio ducking. You can use the _experimental_ feature in your application, add the following to your code:

```javascript
import * as microsoftTeams from "@microsoft/teams-js";

// ...

let volumeTimer;
microsoftTeams.meeting.registerSpeakingStateChangeHandler((speakingState) => {
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

To enable audio ducking, you must add the following [RSC](/microsoftteams/platform/graph-api/rsc/resource-specific-consent) permissions into your app manifest:

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

| Sample name          | Description                                                                                                                               | Javascript                                     |
| -------------------- | ----------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------- |
| React video          | Basic example showing how the EphemeralMediaSession object works with HTML5 video.                                                        | [View](https://aka.ms/liveshare-reactvideo)    |
| React media template | Enable all connected clients to watch videos together, build a shared playlist, transfer whom is in control, and annotate over the video. | [View](https://aka.ms/liveshare-mediatemplate) |

## Next step

> [!div class="nextstepaction"]
> [Agile Poker tutorial](../sbs-teams-live-share.yml)

## See also

* [Live Share SDK FAQ](teams-live-share-faq.md)
* [GitHub repository](https://github.com/microsoft/live-share-sdk)
* [Live Share SDK reference docs](https://docs.microsoft.com/javascript/api/@microsoft/live-share/)
* [Live Share Media SDK reference docs](https://docs.microsoft.com/javascript/api/@microsoft/live-share-media/)
* [Teams apps in meetings](teams-apps-in-meetings.md)
