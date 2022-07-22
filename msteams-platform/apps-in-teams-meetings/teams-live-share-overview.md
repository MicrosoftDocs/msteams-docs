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

# Live Share SDK

> [!NOTE]
> The Live Share SDK is currently available in [Public Developer Preview](../resources/dev-preview/developer-preview-intro.md). You must be part of the Public Developer Preview for Microsoft Teams to use Live Share.

Live Share is an SDK designed to transform Teams apps into collaborative multi-user experiences without writing any dedicated back-end code. Live Share seamlessly integrates meetings with [Fluid Framework](https://fluidframework.com/). Fluid Framework is a collection of client libraries for distributing and synchronizing shared state. Live Share provides a free, fully managed, and ready to use [Azure Fluid Relay](/azure/azure-fluid-relay/) backed by the security and global scale of Teams.

> [!div class="nextstepaction"] > [Get started](teams-live-share-quick-start.md)

Live Share includes an `TeamsFluidClient` class for connecting to a special Fluid Container associated with each meeting in a few lines of code. In addition to the data structures provided by Fluid Framework, Live Share also supports a new set of distributed data structure (DDS) classes to simplify building applications for common meeting scenarios, such as shared media playback.

:::image type="content" source="../assets/images/teams-live-share/teams-live-share-contoso-video.gif" alt-text="Live Share video sharing experience":::

## Why build apps with Live Share?

Building collaborative apps can be difficult, time consuming, costly, and includes complex compliance requirements at scale. Teams users spend significant amount of time reviewing work with teammates, watching videos together, and brainstorming new ideas through screen sharing. The Live Share SDK enables you to transform your app into something more collaborative with minimal investment.

Here are some key benefits of the Live Share SDK:

- Zero-hassle session management and security.
- Stateful and stateless distributed data structures.
- Media extensions to easily synchronize video and audio.
- Respect meeting privileges using role verification.
- Free and fully managed service with low latency.
- Intelligent audio ducking.

:::image type="content" source="../assets/images/teams-live-share/Teams-live-share-schematics.png" alt-text="Teams Live Share":::

To understand if Live Share is right for your collaborative scenario, it is helpful to understand the differences between Live Share and other collaborative frameworks, including:

- Web sockets
- Azure Fluid Relay
- Live Share

### Web sockets

Web sockets are a ubiquitous technology for real-time communication in the web, and some apps may prefer to use their own custom web-socket backend. Unlike REST APIs, web sockets keep an open connection between a server and clients in a session.

Like other custom API services, requirements typically include authenticating sessions, regional mapping, maintenance, and scale. Many collaborative scenarios also require maintaining session state in the server, which requires storage infrastructure, conflict resolutions, and more.

### Azure Fluid Relay

[Azure Fluid Relay](/azure/azure-fluid-relay/) is a managed offering for the Fluid Framework that helps developers build real-time collaborative experiences and replicate state across connected JavaScript clients. Microsoft Whiteboard, Loop, and OneNote are all examples of apps built with Fluid Framework today.

Like other Azure services, Azure Fluid Relay is designed to tailor to your individual project needs with minimal complexity. Requirements include developing an authentication story for your Fluid containers and regional compliance. Once configured, developers can focus on delivering high quality collaborative experiences.

### Live Share hosted service

Live Share provides a turn-key Azure Fluid Relay service backed by the security of Microsoft Teams meetings. Live Share containers are restricted to meeting participants, maintain tenant residency requirements, and can be accessed in a few lines of client code.

# [JavaScript](#tab/javascript)

```javascript
import { TeamsFluidClient, EphemeralPresence } from "@microsoft/live-share";

// Join the Fluid container
const client = new TeamsFluidClient();
const schema = {
  initialObjects: { presence: EphemeralPresence },
};
const { container } = await client.joinContainer(schema);

// ... ready to start app sync logic
```

# [TypeScript](#tab/typescript)

```TypeScript
import { TeamsFluidClient, EphemeralPresence } from "@microsoft/live-share";
import { ContainerSchema } from "fluid-framework";

// Join the Fluid container
const client = new TeamsFluidClient();
const schema: ContainerSchema = {
  initialObjects: { presence: EphemeralPresence },
};
const { container } = await client.joinContainer(schema);

// ... ready to start app sync logic
```

---

> [!IMPORTANT]
> Any data sent or stored through the Live Share SDK's hosted Azure Fluid Relay service is accessible up to 24 hours. For more information, see [Live Share FAQ](teams-live-share-faq.md).

#### Using a custom Azure Fluid Relay service

While most developers will find it preferable to use our free hosted service, there are still situations where it is beneficial to use your own Azure Fluid Relay service for your Live Share app.

Consider using a custom service if you:

- Require storage of data in Fluid containers beyond the lifetime of a meeting.
- Transmit sensitive data through the service that requires a custom security policy.
- Develop features through Fluid Framework (e.g., `SharedMap`) for your application outside of Teams.

To learn more, visit our custom Azure Fluid Relay service [how-to guide](./teams-live-share-how-to/how-to-custom-azure-fluid-relay.md).

## User scenarios

| Scenario                                                                                | Example                                                                                                                                                                                            |
| :-------------------------------------------------------------------------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| During a marketing review, a user wants to collect feedback on their latest video edit. | User shares the video to the meeting stage and starts the video. As needed, the user pauses the video to discuss the scene and participants draw over parts of the screen to emphasize key points. |
| A project manager plays Agile Poker with their team during planning.                    | Manager shares an Agile Poker app to the meeting stage that enables playing the planning game until the team has consensus.                                                                        |

## Next step

> [!div class="nextstepaction"] > [Get started](teams-live-share-quick-start.md)

## See also

- [GitHub repository](https://github.com/microsoft/live-share-sdk)
- [Live Share SDK reference docs](/javascript/api/@microsoft/live-share/)
- [Live Share Media SDK reference docs](/javascript/api/@microsoft/live-share-media/)
- [Live Share capabilities](teams-live-share-capabilities.md)
- [Live Share media capabilities](teams-live-share-media-capabilities.md)
- [Live Share FAQ](teams-live-share-faq.md)
- [Teams apps in meetings](teams-apps-in-meetings.md)
