---
title: Integrate SDK to your app
description: Use Teams live share SDK to integrate your experiences with Microsoft Teams.
ms.topic: concept
ms.localizationpriority: high
ms.author: v-ypalikila
---

# Integrate SDK to your app

The Live Share SDK is in preview. You will need to be part of the [Developer Preview Program](/microsoftteams/platform/resources/dev-preview/developer-preview-intro) for Microsoft Teams to use this feature.

The Live Share SDK builds on the [Fluid Framework](https://fluidframework.com/) to enable the creation of collaborative experiences for Microsoft Teams and M365. This preview version focuses on building collaborative meeting applications for Microsoft Teams using Fluid. The SDK provides a `TeamsFluidClient` class for connecting to a special Fluid Container associated with each meeting. A collection of Live Share specific Distributed Data Structure classes are a`lso provided to simplify building applications for common meeting scenarios like shared media playback.

To get started, we recommend first familiarizing yourself with the [Fluid Framework](https://fluidframework.com/docs/) and building Teams Meeting Apps. You can then follow our Quick Start Guide to build your first [Teams Meeting App](teams-apps-in-meetings.md) that uses Live Share.

## Setup you development environment

To get started, ensure that you install the following tools and set up your development environment:

|Install|	For using...|
|-------|--------------|
| [Node.js](https://nodejs.org/en/download)|	Back-end JavaScript runtime environment. Use the latest v14 LTS release.|
|[ngrok](https://ngrok.com/download)|	Teams app features (conversational bots, message extensions, and incoming webhooks) require inbound connections. A tunnel connects your development system to Teams. It isn't required for apps that only include tabs. This package is installed within the project directory (using npm devDependencies).|
|Visual Studio 2019 or the latest version.|	JavaScript, TypeScript, or SharePoint Framework (SPFx) build environments. Use version 1.55 or later.|
|[Git](https://git-scm.com/downloads)|Git to use the Sample Node.js app repo from GitHub.|


## Get started

Open a new command window and navigate to the folder you where you want to install the project, and then clone the live share sdk repo with the following commands.

1. Add the latest version of the SDK to your application using NPM.

   ```bash

   npm install @microsoft/live-share --save

   ```

1. Clone the repository to test samples and/or build the packages.

   ```bash
   git clone https://github.com/microsoft/live-share-sdk.git

   ```

1. Change to the live-share-sdk directory.

   ```bash
   cd live-share-sdk

   ```

1. Install the dependency package.

   ```bash
    npm install

   ```

1. Start both the client and a local server.

   ```bash
   npm start

   ```

A new browser tab will open to http://localhost:8080 and you will see the dice roller appear! To see collaboration in action copy the full URL in the browser, including the ID, into a new window or even a different browser. This opens a second client for your dice roller application. With both windows open, click the Roll button in either and note that the state of the dice changes in both clients.

## A

In the DiceRoller app, users are shown a die with a button to roll it. When the die is rolled, the Fluid Framework syncs the data across clients so everyone sees the same result

Before you begin, you must fulfill the following prerequisites:

* [Update the app manifest](#update-the-app-manifest)
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

## Enable resource-specific consent

The RSC permissions model enables **team owners** and **chat owners** to grant consent for an application to access and modify a Teams data and a chat's data, respectively.

### Resource-specific permissions for Teams live share

Delegated permissions allow the app to access data on behalf of the signed-in user.

The following table provides resource-specific permissions for Teams live share:

|Name| Description |
| ----- | ----- |
|`LiveShareSession.ReadWrite.Chat`|<!--- need info --->|
|`LiveShareSession.ReadWrite.Channel`|<!--- need info --->|
|`MeetingStage.Write.Chat`|Show content on the meeting stage of meetings associated with this chat.|
|`OnlineMeetingIncomingAudio.Detect.Chat`|<!--- need info --->|


## Samples

* [JavaScript samples](https://github.com/OfficeDev/Teams-Collaboration-SDK/tree/main/javascript/packages#readme).
