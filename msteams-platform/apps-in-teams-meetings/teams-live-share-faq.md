---
title: Live Share FAQ
author: surbhigupta
description: In this module, learn more about Live Share Frequently Asked Questions.
ms.topic: overview
ms.localizationpriority: high
ms.author: v-ypalikila
ms.date: 04/07/2022
---

---

# Live Share SDK FAQ

Get answers to common questions when using Live Share.<br>

<br>

<details>

<summary><b>Can I use my own Azure Fluid Relay service?</b></summary>

Yes! When constructing the `TeamsFluidClient` class, you can define your own `AzureConnectionConfig`. Live Share associates containers you create with meetings, but you'll need to implement the `ITokenProvider` interface to sign tokens for your containers. For example, you can use a provided `AzureFunctionTokenProvider`, which uses an Azure cloud function to request an access token from a server.

While most developers will find it beneficial to use our free hosted service, there may still be times where it is beneficial to use your own Azure Fluid Relay service for your Live Share app. Consider using a custom AFR service connection if you:

- Require storage of data in Fluid containers beyond the lifetime of a meeting.
- Transmit sensitive data through the service that requires a custom security policy.
- Develop features through Fluid Framework (e.g., `SharedMap`) for your application outside of Teams.

For more information, read our [how to guide](./teams-live-share-how-to/how-to-custom-azure-fluid-relay.md) or visit the [Azure Fluid Relay documentation](/azure/azure-fluid-relay/).

<br>

</details>

<details>

<summary><b>How long is data stored in Live Share's hosted service accessible?</b></summary>

Any data sent or stored through Fluid containers created by Live Share's hosted Azure Fluid Relay service is accessible for 24 hours. If you want to persist data beyond 24 hours, you can replace our hosted Azure Fluid Relay service with your own. Alternatively, you can use your own storage provider in parallel to Live Share's hosted service.

<br>

</details>

<details>

<summary><b>What meeting types does Live Share support?</b></summary>

During Preview, only scheduled meetings are supported and all participants must be on the meeting calendar. Meeting types such as, one-on-one calls, group calls, and meet now aren't supported. Other meeting types will be supported in the future.

<br>

</details>

<details>

<summary><b>Will Live Share's media package work with DRM content?</b></summary>

No. Teams currently doesn't support encrypted media for tab applications on desktop. Chrome, Edge, and mobile clients are supported. For more information, [track the issue](https://github.com/microsoft/live-share-sdk/issues/14)!

<br>

</details>

<details>
<summary><b>How many people can attend a Live Share session?</b></summary>

Currently, Live Share supports a maximum of 100 attendees per session. If this is something you're interested in, [start a discussion](https://github.com/microsoft/live-share-sdk/discussions)!

<br>

</details>

<details>
<summary><b>Can I use Live Share's ephemeral data structures outside of Teams?</b></summary>

Currently, Live Share packages require the Teams Client SDK to function properly. No features in `@microsoft/live-share` or `@microsoft/live-share-media` will work outside of a Microsoft Teams. If this is something you're interested in, [start a discussion](https://github.com/microsoft/live-share-sdk/discussions)!

<br>

</details>

## Have more questions or feedback?

Submit issues and feature requests to the SDK repository for [Live Share SDK](https://github.com/microsoft/live-share-sdk). Use the `live-share` and `microsoft-teams` tag to post how-to questions about the SDK at [Stack Overflow](https://stackoverflow.com/questions/tagged/live-share+microsoft-teams).

## See also

- [GitHub repository](https://github.com/microsoft/live-share-sdk)
- [Live Share SDK reference docs](/javascript/api/@microsoft/live-share/)
- [Live Share Media SDK reference docs](/javascript/api/@microsoft/live-share-media/)
- [Teams apps in meetings](teams-apps-in-meetings.md)
