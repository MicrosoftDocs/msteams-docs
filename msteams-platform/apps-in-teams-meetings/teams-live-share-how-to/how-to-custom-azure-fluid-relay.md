---
title: Live Share overview
author: surbhigupta
description: In this module, learn what is Microsoft Live Share SDK and its user scenarios.
ms.topic: overview
ms.localizationpriority: high
ms.author: v-ypalikila
ms.date: 04/07/2022
---

---

# How to: custom Azure Fluid Relay service

While most developers will find it preferable to use our free hosted service, there are still situations where it is beneficial to use your own Azure Fluid Relay service for your Live Share app.

## Pre-requisites

1. Build a meeting side panel and/or stage app meeting extension, as shown in our [dice roller tutorial](../teams-live-share-tutorial.md).
2. Update your app manifest to include all [necessary permissions](../teams-live-share-capabilities.md#register-rsc-permissions).
3. Provision an Azure Fluid Relay service as outlined in this [tutorial](/azure/azure-fluid-relay/how-tos/provision-fluid-azure-portal).

## Connect to Azure Fluid Relay service

When constructing the `TeamsFluidClient` class, you can define your own `AzureConnectionConfig`. Live Share associates containers you create with meetings, but you'll need to implement the `ITokenProvider` interface to sign tokens for your containers. In this example, we use Azure's `AzureFunctionTokenProvider`, which uses an Azure cloud function to request an access token from a server.

```javascript
import { TeamsFluidClient, EphemeralPresence } from "@microsoft/live-share";
import { SharedMap } from "fluid-framework";
import { AzureFunctionTokenProvider } from "@fluidframework/azure-client";

// Define a custom connection for your app
const clientProps = {
  connection: {
    tenantId: "MY_TENANT_ID",
    tokenProvider: new AzureFunctionTokenProvider(
      "MY_SERVICE_ENDPOINT_URL" + "/api/GetAzureToken",
      { userId: "userId", userName: "Test User" }
    ),
    endpoint: "MY_SERVICE_ENDPOINT_URL",
    type: "remote",
  },
};
// Join the Fluid container
const client = new TeamsFluidClient(clientProps);
const schema = {
  initialObjects: {
    presence: EphemeralPresence,
    ticTacToePositions: SharedMap,
  },
};
const { container } = await client.joinContainer(schema);

// ... ready to start app sync logic
```

## Why use a custom Azure Fluid Relay service?

While most developers will find it beneficial to use our free hosted service, there may still be times where it is beneficial to use your own Azure Fluid Relay service for your Live Share app.

Consider using a custom AFR service connection if you:

- Require storage of data in Fluid containers beyond the lifetime of a meeting.
- Transmit sensitive data through the service that requires a custom security policy.
- Develop features through Fluid Framework (e.g., `SharedMap`) for your application outside of Teams.

## Why use Live Share with your custom service?

Azure Fluid Relay is designed to work with any web-based application, meaning it works with or without Teams. That raises an important question: why use Live Share at all?

Live Share has features that are beneficial to meeting scenarios that can augment other features in your app, including:

- Container mapping
- Ephemeral objects & role verification
- Media synchronization

### Container mapping

Live Share's `TeamsFluidClient` class is responsible for mapping a unique meeting identifier to your Fluid containers, which ensures that all meeting participants join the same container. As part of this process, the client will attempt to connect to a `containerId` mapped to the meeting should one already exist. If one does not exist, the `AzureClient` is used to create a container using your `AzureConnectionConfig` and then relay the `containerId` to other meeting participants.

If your app already has a mechanism for creating Fluid containers and sharing them to other members -- such as by inserting the `containerId` into the URL shared to the meeting stage -- then this may not be necessary for your app.

### Ephemeral objects & role verification

Live Share's ephemeral data structures such as `EphemeralPresence`, `EphemeralState`, and `EphemeralEvent` are tailored to collaboration in meetings and thus are not supported in Fluid containers used outside of Microsoft Teams. Features like role verification help your app align with expectations of our users.

> [!NOTE]
> As an added benefit, ephemeral objects also feature faster message latencies compared to traditional Fluid data structures.

To learn more, visit our [core capabilities](../teams-live-share-capabilities.md) page.

### Media synchronization

Packages from `@microsoft/live-share-media` are not supported in Fluid containers used outside of Microsoft Teams.

To learn more, visit our [media capabilities](../teams-live-share-media-capabilities.md) page.

## See also

- [GitHub repository](https://github.com/microsoft/live-share-sdk)
- [Live Share SDK reference docs](/javascript/api/@microsoft/live-share/)
- [Live Share Media SDK reference docs](/javascript/api/@microsoft/live-share-media/)
- [Live Share capabilities](teams-live-share-capabilities.md)
- [Live Share media capabilities](teams-live-share-media-capabilities.md)
- [Live Share FAQ](teams-live-share-faq.md)
- [Teams apps in meetings](teams-apps-in-meetings.md)
