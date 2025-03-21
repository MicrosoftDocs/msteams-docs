---
title: Live Share overview
author: surbhigupta
description: Learn about Live Share SDK, Live share core, Live share media, and Live share canvas, apps with Live Share, Live Share collaborative contexts, and React integration.
ms.topic: overview
ms.localizationpriority: high
ms.author: surbhigupta
ms.date: 04/07/2022
---

# Live Share SDK

:::image type="content" source="../assets/images/teams-live-share/live-share-overview-featured-image.png" alt-text="Screenshot featuring Live Share in a meeting. Meeting participants are looking at a 3D model together.":::

Live Share is an SDK designed to transform Teams apps into collaborative multi-user experiences without writing any dedicated back-end code. With Live Share, your users can co-watch, co-create, and co-edit together in Microsoft Teams. Whether your users are presenting during a meeting or viewing content shared to a chat, Live Share securely connects them into a shared session with just a few lines of code.

Sometimes screen sharing just isn't enough, which is why Microsoft built tools like PowerPoint Live and Whiteboard directly into Teams. By bringing your web application directly to center stage in the meeting interface, your users can seamlessly collaborate during meetings and calls.

Collaboration doesn't need to stop after meetings end, either. Live Share sessions work in chat and channel contexts, allowing your users to see who is viewing what content, follow one another, and more.

> [!div class="nextstepaction"]
> [Get started](teams-live-share-quick-start.md)

## Feature overview

Live Share has three primary packages that support limitless collaborative scenarios. These packages expose a set of distributed data structures (DDS), including primitive building blocks and turn-key scenarios.

Live Share seamlessly integrates meetings with [Fluid Framework](https://fluidframework.com/). Fluid Framework is a collection of client libraries for distributing and synchronizing shared state. Live Share provides a free, fully managed, and ready to use [Azure Fluid Relay](/azure/azure-fluid-relay/) backed by the security and global scale of Teams.

### Live Share core

Live Share enables connecting to a special Fluid Container associated with each meeting, chat, or channel in a few lines of code. In addition to the data structures provided by Fluid Framework, Live Share also supports a new set of DDS classes to simplify synchronizing app state.

Features supported by the Live Share core package include:

- Join a Live Share session with `LiveShareClient` for meetings, chats, or channels.
- Track presence and synchronize user metadata with `LivePresence`.
- Coordinate app state that disappears when users leave the session with `LiveState`.
- Synchronize a countdown timer with `LiveTimer`.
- Send real-time events to other clients in the session with `LiveEvent`.
- Present to and follow other users with `LiveFollowMode`.
- Use any feature of Fluid Framework, such as `SharedMap` and `SharedString`.

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

When collaborating in real time, it's essential for users to be able to point out and emphasize content on the screen. Live Share canvas makes it easy to add inking, laser pointers, and cursors to your app for seamless collaboration.

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

Live Share provides a turn-key Azure Fluid Relay service backed by the security of Microsoft Teams. All sessions adhere to tenant data residency requirements, global regulations, and security commitments. In just a few lines of code, you can connect to Live Share containers that are accessible only to members of a meeting, chat, or channel.

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

While most of you find it preferable to use our free hosted service, there are still situations where it's beneficial to use your own Azure Fluid Relay service for your Live Share app.

Consider using a custom service if you:

- Require long-term storage of data in Fluid containers.
- Transmit sensitive data through the service that requires a custom security policy.
- Develop features through Fluid Framework, for example, `SharedMap`, for your application outside of Teams.

For more information, see the custom Azure Fluid Relay service [how-to guide](./teams-live-share-how-to/how-to-custom-azure-fluid-relay.md).

## Live Share collaborative contexts

Live Share sessions enable seamless collaboration in meetings, chats, and channels. When you connect to a session  through the `joinContainer()` API, Teams connects your user to the appropriate Fluid container. While you don't need to write any context-specific code, you should understand the differences in user scenarios for each tab surface.

> [!NOTE]
> Live Share sessions used across different contexts should connect to the same Fluid container. If you want to synchronize data differently across different contexts, you can create different distributed-data objects (DDS) for each context and only listen to changes for those that are relevant to your scenario.

The Teams JavaScript SDK's `getContext()` API tells you which `FrameContexts` your app is running in. You can use this to conditionally enable different features and UX patterns in your application for each context. Live Share supports the following `FrameContexts` contexts:

- `meetingStage`
- `sidePanel`
- `content`

The following example shows how you can add context-specific functionality to your application:

# [JavaScript](#tab/javascript)

```javascript
import { LiveShareClient, LiveFollowMode } from "@microsoft/live-share";
import {
  app,
  liveShare,
  LiveShareHost,
  FrameContexts,
} from "@microsoft/teams-js";

// Check if Live Share is supported in the current host / context
if (!liveShare.isSupported()) return;

// Join the Fluid container for the current scope
const host = LiveShareHost.create();
const liveShare = new LiveShareClient(host);
const schema = {
  initialObjects: { followMode: LiveFollowMode },
};
const { container } = await liveShare.joinContainer(schema);

// Get teamsJs context
const context = await app.getContext();
switch (context.page?.frameContext) {
  case FrameContexts.meetingStage: {
    // Optimize app for meeting stage
    // e.g., followMode.startPresenting()
    break;
  }
  case FrameContexts.sidePanel: {
    // Optimize app for meeting side panel
    // e.g., provide simplified UX for selecting content
    break;
  }
  case FrameContexts.content: {
    // Optimize app for content
    // e.g., hide presenter settings not appropriate for async contexts
    break;
  }
  default: {
    throw new Error("Received unexpected frameContext");
  }
}

// ... ready to start app sync logic
```

# [TypeScript](#tab/typescript)

```TypeScript
import { LiveShareClient, LiveFollowMode } from "@microsoft/live-share";
import { app, liveShare, LiveShareHost, FrameContexts } from "@microsoft/teams-js";
import { ContainerSchema } from "fluid-framework";

// Check if Live Share is supported in the current host / context
if (!liveShare.isSupported()) return;

// Join the Fluid container for the current scope
const host = LiveShareHost.create();
const liveShare = new LiveShareClient(host);
const schema: ContainerSchema = {
  initialObjects: { followMode: LiveFollowMode },
};
const { container } = await liveShare.joinContainer(schema);

// Get teamsJs context
const context: app.Context = await app.getContext();
switch(context.page?.frameContext) {
  case FrameContexts.meetingStage: {
    // Optimize app for meeting stage
    // e.g., followMode.startPresenting()
    break;
  }
  case FrameContexts.sidePanel: {
    // Optimize app for meeting side panel
    // e.g., provide simplified UX for selecting content
    break;
  }
  case FrameContexts.content: {
    // Optimize app for content
    // e.g., hide presenter settings not appropriate for async contexts
    break;
  }
  default: {
    throw new Error("Received unexpected frameContext");
  }
}

// ... ready to start app sync logic
```

---

### Meeting contexts

:::image type="content" source="../assets/images/teams-live-share/live-share-meetings-overview-full.png" alt-text="Screenshot showing meeting side panel and stage.":::

As we've mentioned earlier, there are two meeting contexts: `meetingStage` and `sidePanel`. In the following section, explore how to optimize these contexts to enhance the user experience.

#### Meeting stage

The `meetingStage` context allows users to share your app content to the meeting stage for participants in the meeting. In this context, users typically expect to collaborate in real time. Unlike when loading a collaborative app like Microsoft Loop or Word in a web browser, presenters usually expect to have more control of the experience. For example, in PowerPoint Live, presenters expect to have control over which PowerPoint slide is visible to attendees by default, even if attendees can choose to stop following them temporarily.

:::image type="content" source="../assets/images/teams-live-share/live-share-meeting-stage.png" alt-text="Overview of unique use cases for Live Share in meeting stage.":::

Consider making the following optimizations for your `meetingStage` app:

- Put the active presenter control of the app, such as by controlling the camera position for all users viewing a 3D model.
- Allow eligible users to take control of the app, such as taking control of media playback while co-watching a video.
- Let users temporarily stop following the presenter, such as showing a "Sync to presenter" button when an attendee clicks on a different image in a slideshow.
- Provide settings that give the presenter control, such as disabling the ability for other users to stop following them.

#### Meeting side panel

The meeting `sidePanel` context allows users to pin your app as a tab in a meeting, alongside default tabs like chat. While any meeting participant may have the option to open a `sidePanel` tab, each user must open it individually. This makes it ideal for asynchronous scenarios during a meeting, such as searching for content to share to the meeting stage. While your users won't want to co-watch, co-create, or co-edit rich content from this surface, Live Share can still improve your `sidePanel` app.

:::image type="content" source="../assets/images/teams-live-share/live-share-side-panel.png" alt-text="Overview of unique use cases for Live Share in meeting side panel.":::

Consider making the following optimizations for your `sidePanel` app:

- Companion experiences to the meeting stage, such as collaborative video or audio playlists.
- Configuration settings before sharing content to the meeting stage, such as disabling the "take control" feature.
- Performance optimizations, such as broadcasting new content once while sharing has already started, rather than reloading the application.

### Content contexts

The `content` context is designed for asynchronous consumption of your app's content. There are a couple different surfaces for `content` contexts in chat and channels, including:

- Chat and channel tabs
- Collaborative stage view

> [!NOTE]
> The `content` context is also used for personal apps, which Live Share doesn't support. Live Share only supports `content` contexts on Teams desktop and web clients.

#### Chat and channel tabs

:::image type="content" source="../assets/images/teams-live-share/live-share-chat-channel-full.png" alt-text="Screenshot of Live Share in chat and channel tabs, with list of task boards and avatars indicating which tasks people are viewing.":::

Chat and channel tabs allow users to pin your application to a chat or channel. A tab that supports both `sidePanel` and `content` features the same pinned URL, but the use cases are fairly different. For starters, chat and channel tabs generally have more horizontal space to work with. As a best practice, allow users to search for content to "pin" to the tab. For example, teachers using a note app may pin notes containing educational resources for their students.

While chat and channel tabs are most commonly used for asynchronous consumption, it's possible for your users to have the same content at the same time. When this happens, it's useful to keep content in sync to prevent data conflicts or duplication of work. Live Share allows you to show what content each user is viewing, what they're doing, and more. This can provide social incentives that draw users into app content, increasing engagement and collaboration. We call this "coincidental collaboration."

:::image type="content" source="../assets/images/teams-live-share/live-share-chat-and-channel-tabs.png" alt-text="Overview of unique use cases for Live Share in chat and channel tabs.":::

Consider making the following optimizations for your `content` chat and channel tab:

- Show which users are viewing content pinned to the tab, such as users actively viewing each whiteboard.
- Nudge users to join an ongoing collaboration session, such as displaying a toast to join an ongoing standup for a task app.
- Allow users to follow a specific user or group of users, such as by clicking on the avatar of another connected user they'd like to follow.

#### Collaborative stageview

:::image type="content" source="../assets/images/teams-live-share/live-share-collab-stage-full.png" alt-text="Screenshot shows Live Share in Collaborative Stageview, where a video player is open, and avatars indicate specific points in the video each user is viewing.":::

When users share your app's content with their colleagues in Teams, we recommend using [collaborative stageview](../tabs/open-content-in-stageview.md#collaborative-stageview). In this scenario, users open content that was shared in a popout window with chat on the side, allowing users to engage with your content while continuing the conversation flow. Similar to chat and channel tabs, this content is primarily consumed asynchronously. However, if users share the content through an Adaptive Card, users are more likely to view the content and chat with one another, increasing the need for collaborative features.

:::image type="content" source="../assets/images/teams-live-share/live-share-collab-stage.png" alt-text="Overview of unique use cases for Live Share in collaborative stageview.":::

Consider making the following optimizations for your collaborative stageview apps:

- Show which users are viewing the content and what they're doing, such as displaying a user's avatar at the position they are at in a video.
- Allow users to follow a specific user or group of users, such as by clicking on the avatar of another connected user they'd like to follow.
- Facilitate ad-hoc communication, such as by enabling inking tools and laser pointers while in follow mode.

## React integration

Live Share has a dedicated React integration, making Live Share features even easier to integrate into React apps. Rather than using `LiveShareClient` directly, you can use the `LiveShareProvider` component to join a Live Share session when the component first mounts. Each `LiveDataObject` has a corresponding React hook, designed to make using Live Share incredibly easy. For more information, see Live Share for React [GitHub page](https://aka.ms/livesharereact).

## User scenarios

| Scenario                                                                                | Example                                                                                                                                                                                            |
| :-------------------------------------------------------------------------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| During a marketing review, a user wants to collect feedback on their latest video edit. | User shares the video to the meeting stage and starts the video. As needed, the user pauses the video to discuss the scene and participants draw over parts of the screen to emphasize key points. |
| A project manager plays Agile Poker with their team during planning.                    | Manager shares an Agile Poker app to the meeting stage that enables playing the planning game until the team has consensus.                                                                        |
| A financial advisor reviews PDF documents with clients before signing.                  | The financial advisor shares the PDF contract to the meeting stage. All attendees can see each other's cursors and highlighted text in the PDF, after which both parties sign the agreement.       |
| Engineers view a 3D model together.                                                     | An engineering team views a 3D model that was shared in chat. They can see each other's camera positions, edit the model, and follow each other.                                                   |

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
