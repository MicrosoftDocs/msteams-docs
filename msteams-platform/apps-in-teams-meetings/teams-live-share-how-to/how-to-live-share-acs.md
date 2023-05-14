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
> Live Share for Azure Communication Services is available in private developer preview. You can request access [here](https://aka.ms/liveshareacspreview).

If you use [Azure Communication Services Teams interoperability](/azure/communication-services/concepts/teams-interop) in your web application, then you can extend it to use Microsoft Teams Live Share. This allows Azure Communication Service (ACS) users and Teams meeting users to join the same Live Share session, enabling frictionless collaboration.

In this article, we will walk you through how to integrate the `@microsoft/live-share-acs` package with the `LiveShareClient` to join a Live Share session for a Teams meeting. We will also show you how to join the meeting's Live Share session through your Microsoft Teams meeting extension. Let's get started!

## Pre-requisites

1. [Get access](https://aka.ms/liveshareacspreview) to the Live Share for Azure Communication Services private preview.
2. Read the [Azure Communication Services Teams interoperability](/azure/communication-services/concepts/teams-interop) documentation.
3. Complete the [Live Share quick start guide](../teams-live-share-quick-start.md).

### Install the JavaScript SDK

The [Live Share SDK](https://github.com/microsoft/live-share-sdk) is a JavaScript package published on [npm](https://www.npmjs.com/package/@microsoft/live-share), which you can download through npm or Yarn. You must also install Live Share peer dependencies, which include `fluid-framework` and `@fluidframework/azure-client`. Next, install the `@microsoft/live-share-acs` package. If you are using Live Share in your tab application, you should also install `@microsoft/teams-js` version `2.11.0` or greater.

#### npm

```bash
npm install @azure/communication-calling@next --save
npm install @microsoft/live-share fluid-framework @fluidframework/azure-client --save
npm install @microsoft/live-share-acs --save
npm install @microsoft/teams-js --save
```

#### yarn

```bash
yarn add @azure/communication-calling@next
yarn add @microsoft/live-share fluid-framework @fluidframework/azure-client
yarn add @microsoft/live-share-acs
yarn add @microsoft/teams-js
```

## Join a session

When calling initializing `LiveShareClient`, there is an property called `host`, which implements the `ILiveShareHost` interface. The `host` allows the `LiveShareClient` class to connect to a Live Share session. For example, the `TestLiveShareHost` joins a session using a `localhost` test server.

When meeting participants join a Live Share session through your Azure Communication Services application, you must use the `ACSLiveShareHost` class from the `@microsoft/live-share-acs` package. For users joining the meeting through the Teams client, your tab application can connect to the session using the `LiveShareHost` from the `@microsoft/teams-js` library.

> [!NOTE]
> Live Share does not support AAD users joining through Azure Communication Services. AAD users must join a meeting through the Microsoft Teams client to join a Live Share session.

Here is an example of how this might work in your application:

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

If your business provides customer services, Live Share helps to improve collaboration between your agents and customers. The following are several examples in which `ACSLiveShareHost` can be used in your application:

* Enable your support agents and customers to co-browse your website.
* Empower your retail agents and digital shoppers to co-shop on your e-commerce website.
* Implement onboarding assistance between your sales representatives and new customers.
* Co-watch high-quality promotional videos during sales calls.

## See also

* [Apps for Teams meetings and calls](../teams-apps-in-meetings.md)
* [GitHub repository](https://github.com/microsoft/live-share-sdk)
* [Live Share SDK reference docs](/javascript/api/@microsoft/live-share/)
* [Live Share Media SDK reference docs](/javascript/api/@microsoft/live-share-media/)
* [Live Share FAQ](../teams-live-share-faq.md)
* [Use Fluid with Teams](../../tabs/how-to/using-fluid-msteam.md)
* [App manifest schema for Teams](../../resources/schema/manifest-schema.md)
