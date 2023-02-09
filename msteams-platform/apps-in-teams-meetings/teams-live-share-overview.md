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

> [!VIDEO https://www.youtube.com/embed/971YIvosuUk]

Live Share is an SDK designed to transform Teams apps into collaborative multi-user experiences without writing any dedicated back-end code. With Live Share, your users can co-watch, co-create, and co-edit during meetings.

Sometimes screen sharing just isn't enough, which is why Microsoft built tools like PowerPoint Live and Whiteboard directly into Teams. By bringing your web application directly to center stage in the meeting interface, your users can seamlessly collaborate during meetings and calls.

> [!div class="nextstepaction"]
> [Get started](teams-live-share-quick-start.md)

> [!NOTE]
> Live Share SDK is available only in [public developer preview](../resources/dev-preview/developer-preview-intro.md).

## Feature overview

Live Share has three packages that support limitless collaborative scenarios. These packages expose a set of distributed data structures (DDS), including primitive building blocks and turn-key scenarios.

Live Share seamlessly integrates meetings with [Fluid Framework](https://fluidframework.com/). Fluid Framework is a collection of client libraries for distributing and synchronizing shared state. Live Share provides a free, fully managed, and ready to use [Azure Fluid Relay](/azure/azure-fluid-relay/) backed by the security and global scale of Teams.

### Live Share core

Live Share enables connecting to a special Fluid Container associated with each meeting in a few lines of code. In addition to the data structures provided by Fluid Framework, Live Share also supports a new set of DDS classes to simplify synchronizing app state in meetings.

Features supported by the Live Share core package include:

- Join a meeting's Live Share session with `LiveShareClient`.
- Track meeting presence and synchronize user metadata with `LivePresence`.
- Send real-time events to other clients in the session with `LiveEvent`.
- Coordinate app state that disappears when users leave the session with `LiveState`.
- Synchronize a countdown timer with `LiveTimer`.
- Leverage any feature of Fluid Framework, such as `SharedMap` and `SharedString`.

You can find more information about this package on the [core capabilities page](./teams-live-share-capabilities.md).

### Live Share media

:::image type="content" source="../assets/images/teams-live-share/teams-live-share-contoso-video.gif" alt-text="Screenshot shows an example of Live Share video sharing experience.":::

Video and audio are instrumental parts of the modern world and workplace. Live Share media enables **media synchronization** for any media player with just a few lines of code. By synchronizing media at the player state and transport controls layer, you can individually attribute views, while providing the highest possible quality available through your app. Because Microsoft isn't rebroadcasting your media content, your licensing and access requirements are kept intact.

Features supported by Live Share media include:

- Synchronize media player state and track with `MediaPlayerSynchronizer`.
- Intelligent adjustments to media volume as users talk during the meeting.
- Limit which users can modify player state.
- Suspend and resume media synchronization on the fly or at scheduled wait points.

You can find more information about this package on the [Live Share media page](./teams-live-share-media-capabilities.md).

> [!NOTE]
> Live Share doesn't rebroadcast media content. It's designed for use with embedded web players, such as HTML5 `<video>` or Azure Media Player.

### Live Share canvas

:::image type="content" source="../assets/images/teams-live-share/Teams-live-share-schematics.png" alt-text="Screenshots shows an example of multiple users drawing on a canvas during a meeting.":::

When collaborating in meetings, it's essential for users to be able to point out and emphasize content on the screen. Live Share canvas makes it easy to add inking, laser pointers, and cursors to your app for seamless collaboration.

Features supported by Live Share canvas include:

- Add a collaborative `<canvas>` to your app with `LiveCanvas`.
- Convey ideas using the pen, highlighter, line, and arrow tools.
- Present effectively using the laser pointer.
- Follow along with real-time mouse cursors.
- Configure settings for variable devices and view states.
- Use fully supported mouse, touch, and stylus inputs.

You can find more information about this package on the [Live Share canvas page](./teams-live-share-canvas.md).

## Why build apps with Live Share?

Building collaborative apps can be difficult, time consuming, costly, and includes complex compliance requirements at scale. Teams users spend significant amount of time reviewing work with teammates, watching videos together, and brainstorming new ideas through screen sharing. The Live Share SDK enables you to transform your app into something more collaborative with minimal investment.

Here are some key benefits of the Live Share SDK:

- Zero-hassle session management and security.
- Stateful and stateless distributed data structures.
- Media extensions to easily synchronize video and audio.
- Turn-key inking, laser pointers, and cursors.
- Respect meeting privileges using role verification.
- Free and fully managed service with low latency.

To understand if Live Share is right for your collaborative scenario, it's helpful to understand the differences between Live Share and other collaborative frameworks, including:

- [Web sockets](#web-sockets)
- [Azure Fluid Relay](#azure-fluid-relay)
- [Live Share](#live-share-hosted-service)

### Web sockets

Web sockets are a ubiquitous technology for real-time communication in the web, and some apps may prefer to use their own custom web-socket backend. Unlike REST APIs, web sockets keep an open connection between a server and clients in a session.

Like other custom API services, requirements typically include authenticating sessions, regional mapping, maintenance, and scale. Many collaborative scenarios also require maintaining session state in the server, which requires storage infrastructure, conflict resolutions, and more.

By using Live Share, you get all the power of web sockets without any of the overhead.

### Azure Fluid Relay

[Azure Fluid Relay](/azure/azure-fluid-relay/) is a managed offering for the Fluid Framework that helps developers build real-time collaborative experiences and replicate state across connected JavaScript clients. Microsoft Whiteboard, Loop, and OneNote are all examples of apps built with Fluid Framework today.

Like other Azure services, Azure Fluid Relay is designed to tailor to your individual project needs with minimal complexity. Requirements include developing an authentication story for your Fluid containers and regional compliance. Once configured, developers can focus on delivering high quality collaborative experiences.

### Live Share hosted service

Live Share provides a turn-key Azure Fluid Relay service backed by the security of Microsoft Teams meetings. Live Share containers are restricted to meeting participants, maintain tenant residency requirements, and can be accessed in a few lines of client code.

# [JavaScript](#tab/javascript)

```javascript
import { LiveShareClient, LivePresence } from "@microsoft/live-share";
import { LiveShareHost } from "@microsoft/teams-js";

// Join the Fluid container
const host = LiveShareHost.create();
const liveShare = new LiveShareClient(host);
const schema = {
  initialObjects: { presence: LivePresence },
};
const { container } = await liveShare.joinContainer(schema);

// ... ready to start app sync logic
```

# [TypeScript](#tab/typescript)

```TypeScript
import { LiveShareClient, LivePresence } from "@microsoft/live-share";
import { LiveShareHost } from "@microsoft/teams-js";
import { ContainerSchema } from "fluid-framework";

// Join the Fluid container
const host = LiveShareHost.create();
const liveShare = new LiveShareClient(host);
const schema: ContainerSchema = {
  initialObjects: { presence: LivePresence },
};
const { container } = await liveShare.joinContainer(schema);

// ... ready to start app sync logic
```

---

> [!IMPORTANT]
> Any data sent or stored through the Live Share SDK's hosted Azure Fluid Relay service is accessible up to 24 hours. For more information, see [Live Share FAQ](teams-live-share-faq.md).

#### Using a custom Azure Fluid Relay service

While most of you find it preferable to use our free hosted service, there are still situations where it is beneficial to use your own Azure Fluid Relay service for your Live Share app.

Consider using a custom service if you:

- Require storage of data in Fluid containers beyond the lifetime of a meeting.
- Transmit sensitive data through the service that requires a custom security policy.
- Develop features through Fluid Framework, for example, `SharedMap`, for your application outside of Teams.

For more information, see the custom Azure Fluid Relay service [how-to guide](./teams-live-share-how-to/how-to-custom-azure-fluid-relay.md).

## User scenarios

| Scenario                                                                                | Example                                                                                                                                                                                            |
| :-------------------------------------------------------------------------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| During a marketing review, a user wants to collect feedback on their latest video edit. | User shares the video to the meeting stage and starts the video. As needed, the user pauses the video to discuss the scene and participants draw over parts of the screen to emphasize key points. |
| A project manager plays Agile Poker with their team during planning.                    | Manager shares an Agile Poker app to the meeting stage that enables playing the planning game until the team has consensus.                                                                        |
| A financial advisor reviews PDF documents with clients before signing.                  | The financial advisor shares the PDF contract to the meeting stage. All attendees can see each other's cursors and highlighted text in the PDF, after which both parties sign the agreement.        |

> [!IMPORTANT]
> Live Share is licensed under the [Microsoft Live Share SDK License](https://github.com/microsoft/live-share-sdk/blob/main/LICENSE). To use these capabilities in your app, you must first read and agree to these terms.

## Next step

> [!div class="nextstepaction"]
> [Get started](teams-live-share-quick-start.md)

## See also

- [Apps for Teams meetings](teams-apps-in-meetings.md)
- [GitHub repository](https://github.com/microsoft/live-share-sdk)
- [Live Share SDK reference docs](/javascript/api/@microsoft/live-share/)
- [Live Share Media SDK reference docs](/javascript/api/@microsoft/live-share-media/)
- [Use Fluid with Teams](../tabs/how-to/using-fluid-msteam.md)
- [Meeting apps APIs](meeting-apps-apis.md)
