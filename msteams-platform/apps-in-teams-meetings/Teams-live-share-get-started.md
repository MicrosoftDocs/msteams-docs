---
title: Get started
description: Use Teams live share SDK to integrate your experiences with Microsoft Teams.
ms.topic: concept
ms.localizationpriority: high
ms.author: v-ypalikila
---

# Get started

You can use Teams live share SDK to integrate your experiences with Microsoft Teams. To get started, use the JavaScript samples.

Learn [how to build collaborative experiences using the SDK](https://github.com/OfficeDev/Teams-Collaboration-SDK/tree/main/docs#readme).

### Prerequisites

Before you begin, you must fulfill the following prerequisites:

* Update the app manifest
* create a container
* RSC permissions

## Update the app manifest.

 To Enable your aTeams live share for Teams meetings, update your app manifest and use the context properties to determine where your app must appear.

The app manifest must include the following code snippet:

```json

  {,

"configurableTabs": [​
{​
      "configurationUrl": “(YOUR_URL)/config?inTeams=true",​
      "canUpdateConfiguration": false,​
      "scopes": ["groupchat"],​
      "context": ["meetingSidePanel", "meetingStage"]​
  ],​

  "validDomains": [“{YOUR_DOMAIN}"],​

  "authorization": {​

    "permissions": {​

      "resourceSpecific": [​

        {​
          "name": “LiveShareSession.ReadWrite.Chat",​
          "type": "Delegated“​
        },​

        {​
          "name": “LiveShareSession.ReadWrite.Channel",​
          "type": "Delegated“​
        },​

        {​
          "name": "MeetingStage.Write.Chat",​
          "type": "Delegated“​
        },​

        {​
          "name": “OnlineMeetingIncomingAudio.Detect.Chat",​
          "type": "Delegated“​
        }​

      ]​

    }​

  }​

}​

​
```
## Create a fluid container

Fluid data is stored within containers, and these containers need to be created before other users can load them. Since creation and loading of containers both happen in the browser, a Fluid application needs to be capable of handling both paths

## Resource-specific consent

The RSC permissions model enables **team owners** and **chat owners** to grant consent for an application to access and modify a Teams data and a chat's data, respectively. Enable RSC permissions for Audio ducking and meeting stage support.

### Resource-specific permissions for Teams live share

The following table provides resource-specific permissions for Teams live share:

|Application permission| Action |
| ----- | ----- |
|Interactive.ReadWrite.Meeting|<!--- need info --->|

For more details, see [resource specific consent](/graph/permissions-reference).