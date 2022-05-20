---
title: Integrate Live Share SDK to your app
description: Use Live Share SDK to integrate your experiences with Microsoft Teams.
ms.topic: concept
ms.localizationpriority: high
ms.author: v-ypalikila
---

# Integrate Live Share SDK to your app

> [!NOTE]
> Live Share SDK is currently available only in [public developer preview](../resources/dev-preview/developer-preview-intro.md).

The Live Share SDK builds on the [Fluid Framework](https://fluidframework.com/) to enable the creation of collaborative experiences for Microsoft Teams and M365. This preview version focuses on building collaborative meeting applications for Microsoft Teams using Fluid. The SDK provides a `TeamsFluidClient` class for connecting to a special Fluid Container associated with each meeting. A collection of Live Share specific Distributed Data Structure classes are a`lso provided to simplify building applications for common meeting scenarios like shared media playback.

To get started, we recommend first familiarizing yourself with the [Fluid Framework](https://fluidframework.com/docs/) and building Teams Meeting Apps. You can then follow our Quick Start Guide to build your first [Teams Meeting App](teams-apps-in-meetings.md) that uses Live Share.

Before you begin, you must fulfill the following prerequisites:

1. [Update the app manifest](#update-the-app-manifest)
1. [Create a Teams Fluid client](#create-a-teams-fluid-client)
1. [Define a container schema](#define-a-container-schema)
1. [Join container](#join-container)
1. [Handled valueChanged event to update UI](#handled-valuechanged-event-to-update-ui)

## Update the app manifest

 To enable Live Share for Teams meetings, update your app manifest and use the context properties to determine where your app must appear.

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

### Resource-specific permissions for Live Share

The RSC permissions model enables **team owners** and **chat owners** to grant consent for an application to access and modify a Teams data and a chat's data, respectively. Delegated permissions allow the app to access data on behalf of the signed-in user.

The following table provides resource-specific permissions for Live Share:

|Name| Description |
| ----- | ----- |
|`LiveShareSession.ReadWrite.Chat`|<!--- need info --->|
|`LiveShareSession.ReadWrite.Channel`|<!--- need info --->|
|`MeetingStage.Write.Chat`|Show content on the meeting stage of meetings associated with this chat.|
|`OnlineMeetingIncomingAudio.Detect.Chat`|<!--- need info --->|

## Create a Teams Fluid client

```javascript
let client;

  if (!!searchParams.get('inTeams')) {

      // Create client

      client = new TeamsFluidClient();

  } else {

      // Create client and configure for testing

      client = new TeamsFluidClient({

        connection: {

          tenantId: LOCAL_MODE_TENANT_ID,

          tokenProvider: new InsecureTokenProvider("", { id: "123", name: "Test User" }),

          orderer: "http://localhost:7070",

          storage: "http://localhost:7070",

        }

      });

  }
```

## Define a container schema

```javascript
const diceValueKey = "dice-value-key";


const containerSchema = {

  initialObjects: { diceMap: SharedMap }

};


function onContainerFirstCreated(container) {

  // Set initial state of the rolled dice to 1.

  container.initialObjects.diceMap.set(diceValueKey, 1);

}
```

## Join container

```javascript
function onContainerFirstCreated(container) {

  // Set initial state of the rolled dice to 1.

  container.initialObjects.diceMap.set(diceValueKey, 1);

}


await client.joinContainer(containerSchema, onContainerFirstCreated);

```

## Handled valueChanged event to update UI


```javascript
const updateDice = () => {

        const diceValue = diceMap.get(diceValueKey);

        // Unicode 0x2680-0x2685 are the sides of a dice (⚀⚁⚂⚃⚄⚅)

        dice.textContent = String.fromCodePoint(0x267f + diceValue);

        dice.style.color = `hsl(${diceValue * 60}, 70%, 30%)`;

    };


// Use the changed event to trigger the re-render whenever the value changes.

diceMap.on("valueChanged", updateDice);

```

## Samples

|Name|Description|Javascript|
|---------|----------|
|Dice roller||[View](https://github.com/microsoft/live-share-sdk/tree/main/samples/01.dice-roller)|
|React video||[View](https://github.com/microsoft/live-share-sdk/tree/main/samples/02.react-video)|
|React media template|||
|Agile poker|||
