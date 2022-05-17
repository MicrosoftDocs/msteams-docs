---
title: Get started with Teams live share
description: Use Teams live share SDK to integrate your experiences with Microsoft Teams.
ms.topic: concept
ms.localizationpriority: high
ms.author: v-ypalikila
---

# Get started with teams live share

You can use Teams live share SDK to integrate your experiences with Microsoft Teams. To get started, use the [JavaScript samples](https://github.com/OfficeDev/Teams-Collaboration-SDK/tree/main/javascript/packages#readme).

Learn [how to build collaborative experiences using the SDK](https://github.com/OfficeDev/Teams-Collaboration-SDK/tree/main/docs#readme).

## Prerequisites

Before you begin, you must fulfill the following prerequisites:

* [Update the app manifest](#update-the-app-manifest)
* [Create a container](#create-a-container)
* [Enable RSC permissions](#enable-resource-specific-consent)

## Update the app manifest

 To enable Teams live share for Teams meetings, update your app manifest and use the context properties to determine where your app must appear.

The app manifest must include the following code snippet:

```json

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

## Create a container

Fluid data is stored within containers, and these containers need to be created before other users can load them. Since creation and loading of containers both happen in the browser, a Fluid application needs to be capable of handling both paths.

## Enable resource-specific consent

The RSC permissions model enables **team owners** and **chat owners** to grant consent for an application to access and modify a Teams data and a chat's data, respectively.

### Resource-specific permissions for Teams live share

The following table provides resource-specific permissions for Teams live share:

|Name| Description |
| ----- | ----- |
|LiveShareSession.ReadWrite.Chat|<!--- need info --->|
|LiveShareSession.ReadWrite.Channel|<!--- need info --->|
|MeetingStage.Write.Chat|<!--- need info --->|
|OnlineMeetingIncomingAudio.Detect.Chat|<!--- need info --->|

For more information, see [resource specific consent](/graph/permissions-reference).
