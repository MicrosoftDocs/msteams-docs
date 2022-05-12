---
title: Teams live share
description: Teams live share works
ms.topic: overview
ms.localizationpriority: high
---

# How Teams live share works

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

1. Tenant ID, User ID and Meeting ID:

    * To check with Bot API, if user is part of the meeting in Cloud API.

1. Name of user from Microsoft Azure Active Directory (Azure AD) token:  

    * To greet and tag users inside Teams live share app. (From token)
    * microsoftTeams.authentication.getAuthToken()  
    * 1p Azure AD  app

## Manifest update

To enable Teams Live Share, update your manifest.json file. If you want audio ducking and meeting stage support, more RSC permissions are needed as well.

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
