---
title: Teams live share
description: overview of Teams live share
ms.topic: overview
ms.localizationpriority: high
keywords: teams live share Cowatch  
---

# How Cowatch works

Cowatch works with partner apps and on web through SDK (iOS, Android, JS, .NET).

Cowatch SDK enables synchronization of video between users in a Teams meeting in partner.

Teams Client launches partner app with an app-link including relevant context (session-id, token).

Partner app uses Cowatch SDK to join the WebSocket connection to send/receive Cowatch events.

Partner client will receive play, pause and seek commands for each user, allowing for a seamless Cowatch experience

## Platforms and SDK's

| Platform | SDK |
| --- | --- |
| iOS & iPadOS | Swift + Objective C |
| Android | Java |
| Web/PWA | Javascript |
| Windows UWP | .NET |

## Prerequisites

1. Tenant ID, User ID and Meeting ID:

    * To check with Bot API if user is part of the meeting in Cloud API
    * To check if user is part of CollabSpace on subsequent calls to Cloud API

1. Name of user from AAD token:  

    * To greet and tag users inside Cowatch app.  (From token)
    * microsoftTeams.authentication.getAuthToken()  
    * 1p AAD  app

## Manifest update

To enable Teams Live Share, update your manifest.json file (starting May 25, 2022). If you want audio ducking and meeting stage support, additional RSC permissions are needed as well (starting May 25, 2022).

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
