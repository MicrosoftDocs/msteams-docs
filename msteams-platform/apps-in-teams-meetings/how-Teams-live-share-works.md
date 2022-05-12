---
title: Teams live share works
description: Teams live share works
ms.topic: overview
ms.localizationpriority: high
---

# Enable and configure your app for Teams live share



Teams live share works with partner apps and on web through SDK (iOS, Android, JS, .NET).

* Teams live share SDK enables synchronization of video between users in a Teams meeting in partner.

* Teams Client launches partner app with an app-link including relevant context (session-id, token).

* Partner app uses Teams live share SDK to join the WebSocket connection to send/receive Teams live share events.

* Partner client will receive play, pause and seek commands for each user, allowing for a seamless Teams live share experience.

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
