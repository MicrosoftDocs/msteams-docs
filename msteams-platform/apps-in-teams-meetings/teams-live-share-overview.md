---
title: Live Share overview
description: Overview of Microsoft Live Share for Teams.
ms.topic: overview
ms.localizationpriority: high
ms.author: v-ypalikila
---

---

# Overview

> [!Note]
> Live Share SDK is currently available only in [Public Developer Preview](../resources/dev-preview/developer-preview-intro.md).

Live Share is an SDK designed to transform Teams apps into collaborative multi-user experiences without writing any dedicated back-end code. Live Share seamlessly integrates meetings with [Fluid Framework](https://fluidframework.com/), a collection of client libraries for distributing and synchronizing shared state. This service is free, fully managed, and ready to use.

> [!div class="nextstepaction"]
> [Get started](teams-live-share-quick-start.md)

The SDK provides a `TeamsFluidClient` class for connecting to a special Fluid Container associated with each meeting in a few lines of code. Live Share also supports a new set of distributed data structure (DDS) classes to simplify building applications for common meeting scenarios, such as shared media playback.

:::image type="content" source="../assets/images/teams-live-share/Teams-live-share-video-sharing.png" alt-text="Live Share video sharing experience":::

## Why Live Share?

Building collaborative apps can be difficult and time consuming, requiring expensive infrastructure and complex compliance requirements at scale. Teams users spend significant amount of time reviewing work with teammates, watching videos together, and brainstorming new ideas through screen sharing. Now, Live Share can transform your app into something more collaborative with minimal investment.

Here are some key benefits of the SDK:

- Zero-hassle session management & security
- Stateful and stateless distributed data structures
- Media extensions to easily synchronize video and audio
- Respect meeting privileges using role verification
- Free and fully managed service with low latency

:::image type="content" source="../assets/images/teams-live-share/Teams-live-share.png" alt-text="Teams Live Share":::

## User scenarios

|Scenario|Example|
| :------- | :--------------------- |
| You and your coworker scheduled a meeting to present an early edit of a marketing video at an upcoming leadership review and want to highlight specific sections for feedback. | You share the video to the meeting stage and start the video. As needed, you pause the video to discuss the scene. You and your colleague take turns drawing over parts of the screen to emphasize key points.|
| You're a project manager for an agile team playing agile poker with your team to estimate the amount of work needed for an upcoming sprint.| You share an agile poker planning app to the meeting stage that uses Live Share and play the planning game until a team consensus is met.|

> [!IMPORTANT]
> Any data sent or stored through Live Share's hosted Azure Fluid Relay service is accessible for 24 hours. For more information, see [Live Share FAQ](teams-live-share-faq.md)(teams-live-share-faq.md).

## Next step

> [!div class="nextstepaction"]
> [Quick start](teams-live-share-quick-start.md)

## See also

- [GitHub repository](https://github.com/microsoft/live-share-sdk)
- [Reference docs](https://aka.ms/livesharedocs)
- [Live Share capabilities](teams-live-share-capabilities.md)
- [Live Share media capabilities](teams-live-share-media-capabilities.md)
- [Live Share FAQ](teams-live-share-faq.md)
- [Teams apps in meetings](teams-apps-in-meetings.md)
