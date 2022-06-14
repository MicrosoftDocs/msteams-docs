---
title: Live Share overview
description: In this module, learn what is Microsoft Live Share SDK and its user scenarios.
ms.topic: overview
ms.localizationpriority: high
ms.author: v-ypalikila
---

---

# Live Share SDK

> [!Note]
> The Live Share SDK is currently available only in [Public Developer Preview](../resources/dev-preview/developer-preview-intro.md). You must be part of the Public Developer Preview for Microsoft Teams to use the Live Share SDK.

Live Share is an SDK designed to transform Teams apps into collaborative multi-user experiences without writing any dedicated back-end code. The Live Share SDK seamlessly integrates meetings with [Fluid Framework](https://fluidframework.com/). Fluid Framework is a collection of client libraries for distributing and synchronizing shared state. Live Share provides a free, fully managed, and ready to use [Azure Fluid Relay](/azure/azure-fluid-relay/) backed by the security and global scale of Teams.

> [!div class="nextstepaction"]
> [Get started](teams-live-share-quick-start.md)

The Live Share SDK provides a `TeamsFluidClient` class for connecting to a special Fluid Container associated with each meeting in a few lines of code. In addition to the data structures provided by Fluid Framework, Live Share also supports a new set of distributed data structure (DDS) classes to simplify building applications for common meeting scenarios, such as shared media playback.

:::image type="content" source="../assets/images/teams-live-share/teams-live-share-contoso-video.gif" alt-text="Live Share video sharing experience":::

## Why build apps using the Live Share SDK?

Building collaborative apps can be difficult, time consuming, costly, and includes complex compliance requirements at scale. Teams users spend significant amount of time reviewing work with teammates, watching videos together, and brainstorming new ideas through screen sharing. The Live Share SDK enables you to transform your app into something more collaborative with minimal investment.

Here are some key benefits of the Live Share SDK:

* Zero-hassle session management and security
* Stateful and stateless distributed data structures
* Media extensions to easily synchronize video and audio
* Respect meeting privileges using role verification
* Free and fully managed service with low latency
* Intelligent audio ducking

:::image type="content" source="../assets/images/teams-live-share/Teams-live-share-schematics.png" alt-text="Teams Live Share":::

## User scenarios

|Scenario|Example|
| :------- | :--------------------- |
| Users and their coworkers scheduled a meeting to present an early edit of a marketing video at an upcoming leadership review and want to highlight specific sections for feedback. | Users share the video to the meeting stage and start the video. As needed, the user pauses the video to discuss the scene. Users can take turns drawing over parts of the screen to emphasize key points.|
| You're a project manager for an agile team playing Agile Poker with your team to estimate the amount of work needed for an upcoming sprint.| You share an Agile Poker planning app to the meeting stage that uses the Live Share SDK and play the planning game until the team meets a consensus.|

> [!IMPORTANT]
> Any data sent or stored through the Live Share SDK's hosted Azure Fluid Relay service is accessible for 24 hours. For more information, see [Live Share FAQ](teams-live-share-faq.md).

## Next step

> [!div class="nextstepaction"]
> [Get started](teams-live-share-quick-start.md)

## See also

* [GitHub repository](https://github.com/microsoft/live-share-sdk)
* [Live Share SDK reference docs](/javascript/api/@microsoft/live-share/)
* [Live Share Media SDK reference docs](/javascript/api/@microsoft/live-share-media/)
* [Live Share capabilities](teams-live-share-capabilities.md)
* [Live Share media capabilities](teams-live-share-media-capabilities.md)
* [Live Share FAQ](teams-live-share-faq.md)
* [Teams apps in meetings](teams-apps-in-meetings.md)
