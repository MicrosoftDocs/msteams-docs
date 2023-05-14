---
title: How to use Live Share with Azure Communication Services
author: surbhigupta
description: In this module, learn how to integrate your Azure Communication Services app with Live Share.
ms.topic: overview
ms.localizationpriority: high
ms.author: v-ypalikila
ms.date: 07/21/2022
---

---

# Integrate your Azure Communication Services app with Live Share

> [!IMPORTANT]
> Live Share for Azure Communication Services is currently in private developer preview. Request access [here](https://aka.ms/liveshareacspreview).

Use [Azure Communication Services Teams interoperability](/azure/communication-services/concepts/teams-interop) in your web application to extend it to Microsoft Teams Live Share. This integration allows Azure Communication Service (ACS) users and Teams meeting users to join the same Live Share session for seamless collaboration.

In this article, you'll learn how to integrate the `@microsoft/live-share-acs` package with the `LiveShareClient` to join a Live Share session for a Teams meeting. You'll also discover how to join the meeting's Live Share session through your Microsoft Teams meeting extension. Let's start!

## Pre-requisites

1. [Request access](https://aka.ms/liveshareacspreview) to the Live Share for Azure Communication Services private preview.
2. Understand the [Azure Communication Services Teams interoperability](/azure/communication-services/concepts/teams-interop) by reading the documentation.
3. Complete the [Live Share quick start guide](../teams-live-share-quick-start.md).

### Install the JavaScript dependencies

First, install [@microsoft/live-share](https://github.com/microsoft/live-share-sdk) and its peer dependencies, including `fluid-framework` and `@fluidframework/azure-client`. Then, install the `@microsoft/live-share-acs` package and its peer dependency, the `@azure/communication-calling@next` package. If you're using Live Share in your tab application, install `@microsoft/teams-js` version 2.11.0 or newer.

#### npm

```bash
npm install @microsoft/live-share fluid-framework @fluidframework/azure-client --save
npm install @microsoft/live-share-acs @azure/communication-calling@next --save
npm install @microsoft/teams-js --save
```

#### yarn

```bash
yarn add @microsoft/live-share fluid-framework @fluidframework/azure-client
yarn add @microsoft/live-share-acs @azure/communication-calling@next
yarn add @microsoft/teams-js
```

## Join a session

When initializing `LiveShareClient`, use the `ILiveShareHost` property to connect the `LiveShareClient` class to a Live Share session. For example, the `TestLiveShareHost` class joins a session using a `localhost` test server.

To have meeting participants join a Live Share session through your Azure Communication Services application, use the `ACSLiveShareHost` class from the `@microsoft/live-share-acs` package. For users joining the meeting through the Teams client, your tab application can connect to the session using the `LiveShareHost` class from the `@microsoft/teams-js` library.

> [!NOTE]
> Live Share doesn't support AAD users joining through Azure Communication Services. AAD users must join a meeting through the Microsoft Teams client to join a Live Share session.

Here's an example of how you can implement this in your application:

# [JavaScript](#tab/javascript)

```javascript
import { LiveShareClient, LiveState } from "@microsoft/live-share";
import { ACSLiveShareHost } from "@microsoft/live-share-acs";
import { app, LiveShareHost } from "@microsoft/teams-js";
import { CallClient } from "@azure/communication-calling";
import { AzureCommunicationTokenCredential } from '@azure/communication-common';

async function joinSession(host) {
    const client = new LiveShareClient(host);
    const schema = {
        initialObjects: {
            liveState: LiveState,
        },
    };
    const { container } = await client.joinContainer(schema);

    // ... ready to start app sync logic
}

async function joinFromTeams() {
    // Initialize teams-js
    await app.initialize();
    // Create Teams LiveShareHost
    const host = LiveShareHost.create();
    // Join the Live Share session
    await joinSession(host);
}

async function joinFromACS() {
    // Initialize your ACS CallClient
    const callClient = new CallClient();
    // Get a token credential & user ID from your server and create a token credential
    const userACSToken = "<USER ACCESS TOKEN>";
    const userACSId = "<USER_COMMUNICATION_USER_ID>";
    const tokenCredential = new AzureCommunicationTokenCredential(userACSToken);
    // Create a call agent
    const userDisplayName = "<USER_DISPLAY_NAME";
    const callAgent = await callClient.createCallAgent(tokenCredential, {
        displayName: userDisplayName,
    });
    // Get the meeting join URL
    const meetingJoinUrl = "<MEETING JOIN URL>";
    // Join the Teams meeting
    const teamsCall = callAgent.join({meetingLink: meetingJoinUrl}, {});
    // Create the ACSLiveShareHost
    const host = ACSLiveShareHost.create({
        userId: userACSId,
        displayName: userDisplayName,
        call: teamsCall,
        teamsMeetingJoinUrl: meetingJoinUrl,
        acsTokenProvider: () => {
            // In production, you likely want to refresh the token.
            // Refer to the Azure Communication Services documentation for examples of this.
            return Promise.resolve(userACSToken)
        },
    });
    // Join the Live Share session
    await joinSession(host);

    // ... other ACS call setup
}

// First, we must know if your user is joining a session from ACS or Teams.
// A common pattern is deploying two versions of your app, such as teams.contoso.com and app.contoso.com or using environment variables
const IN_TEAMS = window.location.origin.includes("teams.");

if (IN_TEAMS) {
    joinFromTeams();
} else {
    joinFromACS();
}
```

# [TypeScript](#tab/typescript)

```TypeScript
import { LiveShareClient, LiveState, ILiveShareHost } from "@microsoft/live-share";
import { ACSLiveShareHost } from "@microsoft/live-share-acs";
import { app, LiveShareHost } from "@microsoft/teams-js";
import { CallClient } from "@azure/communication-calling";
import { AzureCommunicationTokenCredential } from '@azure/communication-common';

async function joinSession(host: ILiveShareHost): Promise<void> {
    const client = new LiveShareClient(host);
    const schema = {
        initialObjects: {
            liveState: LiveState,
        },
    };
    const { container } = await client.joinContainer(schema);

    // ... ready to start app sync logic
}

async function joinFromTeams(): Promise<void> {
    // Initialize teams-js
    await app.initialize();
    // Create Teams LiveShareHost
    const host = LiveShareHost.create();
    // Join the Live Share session
    await joinSession(host);
}

async function joinFromACS(): Promise<void> {
    // Initialize your ACS CallClient
    const callClient = new CallClient();
    // Get a token credential & user ID from your server and create a token credential
    const userACSToken = "<USER ACCESS TOKEN>";
    const userACSId = "<USER_COMMUNICATION_USER_ID>";
    const tokenCredential = new AzureCommunicationTokenCredential(userACSToken);
    // Create a call agent
    const userDisplayName = "<USER_DISPLAY_NAME";
    const callAgent = await callClient.createCallAgent(tokenCredential, {
        displayName: userDisplayName,
    });
    // Get the meeting join URL
    const meetingJoinUrl = "<MEETING JOIN URL>";
    // Join the Teams meeting
    const teamsCall = callAgent.join({meetingLink: meetingJoinUrl}, {});
    // Create the ACSLiveShareHost
    const host = ACSLiveShareHost.create({
        userId: userACSId,
        displayName: userDisplayName,
        call: teamsCall,
        teamsMeetingJoinUrl: meetingJoinUrl,
        acsTokenProvider: () => {
            // In production, you likely want to refresh the token.
            // Refer to the Azure Communication Services documentation for examples of this.
            return Promise.resolve(userACSToken)
        },
    });
    // ... other ACS call setup

    // Join the Live Share session
    await joinSession(host);
}

// First, we must know if your user is joining a session from ACS or Teams.
// A common pattern is deploying two versions of your app, such as teams.contoso.com and app.contoso.com or using environment variables
const IN_TEAMS = window.location.origin.includes("teams.");

if (IN_TEAMS) {
    joinFromTeams();
} else {
    joinFromACS();
}
```

## Why use Live Share with Azure Communication Services?

Integrating Live Share into your app can enhance collaboration between your agents and customers, particularly if your business provides customer services. Here are a few examples of how `ACSLiveShareHost` can be implemented in your application:

* Facilitate co-browsing of your website between your support agents and customers.
* Enable your retail agents and digital shoppers to co-shop on your e-commerce website.
* Provide onboarding assistance through your sales representatives for new customers.
* Allow co-watching of high-quality promotional videos during sales calls.

## See also

* [Apps for Teams meetings and calls](../teams-apps-in-meetings.md)
* [GitHub repository](https://github.com/microsoft/live-share-sdk)
* [Live Share SDK reference docs](/javascript/api/@microsoft/live-share/)
* [Live Share Media SDK reference docs](/javascript/api/@microsoft/live-share-media/)
* [Live Share FAQ](../teams-live-share-faq.md)
* [Use Fluid with Teams](../../tabs/how-to/using-fluid-msteam.md)
* [App manifest schema for Teams](../../resources/schema/manifest-schema.md)
