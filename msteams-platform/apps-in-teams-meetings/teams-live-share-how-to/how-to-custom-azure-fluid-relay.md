---
title: How to use custom Azure Fluid Relay service
author: surbhigupta
description: In this module, learn how to use a custom Azure Fluid Relay service with Live Share.
ms.topic: overview
ms.localizationpriority: high
ms.author: v-ypalikila
ms.date: 07/21/2022
---

---

# Custom Azure Fluid Relay service

While you likely prefer using our free hosted service, there are situations where it's beneficial to use your own Azure Fluid Relay service for your Live Share app.

## Prerequisites

1. Build a meeting side panel and stage app meeting extension, as shown in the [dice roller tutorial](../teams-live-share-tutorial.md).
2. Update your app manifest to include all [necessary permissions](../teams-live-share-capabilities.md#register-rsc-permissions).
3. Provision an Azure Fluid Relay service as outlined in this [tutorial](/azure/azure-fluid-relay/how-tos/provision-fluid-azure-portal).

## Connect to Azure Fluid Relay service

When calling initializing `LiveShareClient`, you can define your own `AzureConnectionConfig`. Live Share associates containers you create with meetings, but you need to implement the `ITokenProvider` interface to sign tokens for your containers. This example explains Azure's `AzureFunctionTokenProvider`, which uses an Azure cloud function to request an access token from a server.

# [JavaScript](#tab/javascript)

```javascript
import { LiveShareClient, LivePresence } from "@microsoft/live-share";
import { LiveShareHost } from "@microsoft/teams-js";
import { SharedMap } from "fluid-framework";
import { AzureFunctionTokenProvider } from "@fluidframework/azure-client";

// Define a custom connection for your app
const options = {
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
const host = LiveShareHost.create();
const liveShare = new LiveShareClient(host, options);
const schema = {
  initialObjects: {
    presence: LivePresence,
    ticTacToePositions: SharedMap,
  },
};
const { container } = await liveShare.joinContainer(schema);

// ... ready to start app sync logic
```

# [TypeScript](#tab/typescript)

```TypeScript
import {
  LiveShareClient,
  ILiveShareClientOptions,
  LivePresence,
} from "@microsoft/live-share";
import { LiveShareHost } from "@microsoft/teams-js";
import { SharedMap } from "fluid-framework";
import { AzureFunctionTokenProvider } from "@fluidframework/azure-client";

// Define a custom connection for your app
const options: ILiveShareClientOptions = {
  connection: {
    tenantId: "MY_TENANT_ID",
    tokenProvider: new AzureFunctionTokenProvider(
      "MY_FUNCTION_ENDPOINT_URL" + "/api/GetAzureToken",
      { userId: "userId", userName: "Test User" }
    ),
    endpoint: "MY_SERVICE_ENDPOINT_URL",
    type: "remote",
  },
};
// Join the Fluid container
const host = LiveShareHost.create();
const liveShare = new LiveShareClient(host, options);
const schema = {
  initialObjects: {
    presence: LivePresence,
    ticTacToePositions: SharedMap,
  },
};
const { container } = await liveShare.joinContainer(schema);

// ... ready to start app sync logic
```

---

## Why use a custom Azure Fluid Relay service?

Consider using a custom AFR service connection if you:

* Require storage of data in Fluid containers beyond the lifetime of a meeting.
* Transmit sensitive data through the service that requires a custom security policy.
* Develop features through Fluid Framework for your application outside of Teams.

## Why use Live Share with your custom service?

Azure Fluid Relay is designed to work with any web-based application, meaning it works with or without Microsoft Teams. That raises an important question: if I build my own Azure Fluid Relay service, do I still need Live Share?

Live Share has features that are beneficial to common meeting scenarios that augment other features in your app, including:

* [Container mapping](#container-mapping)
* [Live objects and role verification](#live-objects-and-role-verification)

### Container mapping

The `LiveShareClient` in `@microsoft/live-share` is responsible for mapping a unique meeting identifier to your Fluid containers, which ensures that all meeting participants join the same container. As part of this process, the client attempts to connect to a `containerId` mapped to the meeting that one already exists. If one doesn't exist, the `AzureClient` is used to create a container using your `AzureConnectionConfig` and then relay the `containerId` to other meeting participants.

If your app already has a mechanism for creating Fluid containers and sharing them to other members, such as by inserting the `containerId` into the URL shared to the meeting stage, then this may not be necessary for your app.

### Live objects and role verification

Live Share's live data structures such as `LivePresence`, `LiveState`, and `LiveEvent` are tailored to collaboration in meetings and thus aren't supported in Fluid containers used outside of Microsoft Teams. Features like role verification help your app align with expectations of our users.

> [!NOTE]
> As an added benefit, live objects also feature faster message latencies compared to traditional Fluid data structures.

For more information, see [core capabilities](../teams-live-share-capabilities.md) page.

## Use Live Share without LiveShareClient

You can still use Live Share even if you use don't want to use the `LiveShareClient` class for your custom Azure Fluid Relay service. This is helpful if you want to control when a container is created or how it's shared with meeting participants.

The following is an example of how you might do this in your application:

# [JavaScript](#tab/javascript)

```javascript
import {
  LiveShareClient,
  LivePresence,
  getLiveShareContainerSchemaProxy,
} from "@microsoft/live-share";
import { SharedMap } from "fluid-framework";
import {
  AzureFunctionTokenProvider,
  AzureClient,
} from "@fluidframework/azure-client";
import { LiveShareHost } from "@microsoft/teams-js";

// Define a custom connection for your app
const options = {
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
// Initialize your AzureClient instance
const client = new AzureClient(options);
// Define your Fluid schema
const schema = {
  initialObjects: {
    presence: LivePresence,
    ticTacToePositions: SharedMap,
  },
};
// Create your host
const host = LiveShareHost.create();
// Create the LiveShareRuntime, which is needed for `LiveDataObject` instances to work
const runtime = new LiveShareRuntime(this._host);
// Inject the LiveShareRuntime dependency into the ContainerSchema
const injectedSchema = getLiveShareContainerSchemaProxy(
    schema,
    runtime,
);
// Create (or get) your container
const { container } = await client.createContainer(injectedSchema);

// ... ready to start app sync logic
```

# [TypeScript](#tab/typescript)

```TypeScript
import {
  LiveShareClient,
  ILiveShareClientOptions,
  LivePresence,
  getLiveShareContainerSchemaProxy,
} from "@microsoft/live-share";
import {
  SharedMap,
  ContainerSchema,
} from "fluid-framework";
import {
    AzureFunctionTokenProvider,
    AzureClientProps,
} from "@fluidframework/azure-client";
import { LiveShareHost } from "@microsoft/teams-js";

// Define a custom connection for your app
const options: AzureClientProps = {
  connection: {
    tenantId: "MY_TENANT_ID",
    tokenProvider: new AzureFunctionTokenProvider(
      "MY_FUNCTION_ENDPOINT_URL" + "/api/GetAzureToken",
      { userId: "userId", userName: "Test User" }
    ),
    endpoint: "MY_SERVICE_ENDPOINT_URL",
    type: "remote",
  },
};
// Initialize your AzureClient instance
const client = new AzureClient(options);
// Define your Fluid schema
const schema: ContainerSchema = {
  initialObjects: {
    presence: LivePresence,
    ticTacToePositions: SharedMap,
  },
};
// Create your host
const host = LiveShareHost.create();
// Create the LiveShareRuntime, which is needed for `LiveDataObject` instances to work
const runtime = new LiveShareRuntime(this._host);
// Inject the LiveShareRuntime dependency into the ContainerSchema
const injectedSchema: ContainerSchema = getLiveShareContainerSchemaProxy(
    schema,
    runtime,
);
// Create (or get) your container
const { container } = await client.createContainer(injectedSchema);

// ... ready to start app sync logic
```

---

Alternatively, you can use or override the `AzureLiveShareHost`. This allows you to get custom user display names and roles from your `AzureAudience`, rather than through Microsoft Teams.

# [JavaScript](#tab/javascript)

```javascript
import {
  LiveShareClient,
  LivePresence,
  AzureLiveShareHost,
  getLiveShareContainerSchemaProxy,
} from "@microsoft/live-share";
import { SharedMap } from "fluid-framework";
import {
  AzureFunctionTokenProvider,
  AzureClient,
} from "@fluidframework/azure-client";

// Define a custom connection for your app
const options = {
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
// Initialize your AzureClient instance
const client = new AzureClient(options);
// Define your Fluid schema
const schema = {
  initialObjects: {
    presence: LivePresence,
    ticTacToePositions: SharedMap,
  },
};
// Create your AzureLiveShareHost
const host = AzureLiveShareHost.create();
// Create the LiveShareRuntime, which is needed for `LiveDataObject` instances to work
const runtime = new LiveShareRuntime(this._host);
// Inject the LiveShareRuntime dependency into the ContainerSchema
const injectedSchema = getLiveShareContainerSchemaProxy(
    schema,
    runtime,
);
// Create (or get) your container
const { container } = await client.createContainer(injectedSchema);
// Set AzureAudience into the AzureLiveShareHost
host.setAudience(services.audience);

// ... ready to start app sync logic
```

# [TypeScript](#tab/typescript)

```TypeScript
import {
  LiveShareClient,
  ILiveShareClientOptions,
  LivePresence,
  AzureLiveShareHost,
  getLiveShareContainerSchemaProxy,
} from "@microsoft/live-share";
import {
  SharedMap,
  ContainerSchema,
} from "fluid-framework";
import {
    AzureFunctionTokenProvider,
    AzureClientProps,
} from "@fluidframework/azure-client";

// Define a custom connection for your app
const options: AzureClientProps = {
  connection: {
    tenantId: "MY_TENANT_ID",
    tokenProvider: new AzureFunctionTokenProvider(
      "MY_FUNCTION_ENDPOINT_URL" + "/api/GetAzureToken",
      { userId: "userId", userName: "Test User" }
    ),
    endpoint: "MY_SERVICE_ENDPOINT_URL",
    type: "remote",
  },
};
// Initialize your AzureClient instance
const client = new AzureClient(options);
// Define your Fluid schema
const schema: ContainerSchema = {
  initialObjects: {
    presence: LivePresence,
    ticTacToePositions: SharedMap,
  },
};
// Create your AzureLiveShareHost
const host = AzureLiveShareHost.create();
// Create the LiveShareRuntime, which is needed for `LiveDataObject` instances to work
const runtime = new LiveShareRuntime(this._host);
// Inject the LiveShareRuntime dependency into the ContainerSchema
const injectedSchema: ContainerSchema = getLiveShareContainerSchemaProxy(
    schema,
    runtime,
);
// Create (or get) your container
const { container, services } = await client.createContainer(injectedSchema);
// Set AzureAudience into the AzureLiveShareHost
host.setAudience(services.audience);

// ... ready to start app sync logic
```

---

Many Live Share APIs depend on a global timestamp API, which allows `LiveDataObject` objects to determine the order of remote messages. If you're using data structures that rely on the `TimestampProvider` class, then you must either use the `LiveShareHost` from the `teams-js` library or override the `getTimestamp()` function in `AzureLiveShareHost` with a value returned by your server.

## See also

* [Apps for Teams meetings and calls](../teams-apps-in-meetings.md)
* [GitHub repository](https://github.com/microsoft/live-share-sdk)
* [Live Share SDK reference docs](/javascript/api/@microsoft/live-share/)
* [Live Share Media SDK reference docs](/javascript/api/@microsoft/live-share-media/)
* [Live Share FAQ](../teams-live-share-faq.md)
* [Use Fluid with Teams](../../tabs/how-to/using-fluid-msteam.md)
* [App manifest schema for Teams](../../resources/schema/manifest-schema.md)
