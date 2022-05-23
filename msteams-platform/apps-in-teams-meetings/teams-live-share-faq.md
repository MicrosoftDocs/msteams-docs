---
title: Live Share FAQ
description: Frequently-asked questions for the Live Share SDK.
ms.topic: overview
ms.localizationpriority: high
ms.author: v-ypalikila
---

---

# Live Share FAQ

Get answers to common questions when using Live Share.<br>

<br>

<details>

<summary><b>Can I use my own Azure Fluid Relay service?</b></summary>

Yes! When constructing the `TeamsFluidClient` class, you can define your own `AzureConnectionConfig`. Live Share will still associate containers you create with meetings, but you'll need to create your own Azure `ITokenProvider` to sign tokens for your containers and regional requirements. For more information, see Azure [Fluid Relay documentation](/azure/azure-fluid-relay/).

<br>

</details>

<details>

<summary><b>How long is data stored in Live Share's hosted service accessible?</b></summary>

Any data sent or stored through Fluid containers created by Live Share's hosted Azure Fluid Relay service is accessible for 24 hours. If you want to persist data beyond 24 hours, you can replace our hosted Azure Fluid Relay service with your own. Alternatively, you can use your own storage provider in parallel to Live Share's hosted service.

<br>

</details>

<details>

<summary><b>What meeting types does Live Share support?</b></summary>

Currently, only scheduled meetings are supported and all participants must be on the meeting calendar. Meeting types such as, one-on-one calls, group calls, and meet now are not supported.

<br>

</details>

<details>

<summary><b>Will Live Share's media package work with DRM content?</b></summary>

No. While we hope to eventually support DRM-licensed content such as WideVine and FairPlay, Teams currently doesn't support encrypted media for tab applications.

<br>

</details>

## See also

- [GitHub repository](https://github.com/microsoft/live-share-sdk)
- [Reference docs](https://aka.ms/livesharedocs)
- [Teams apps in meetings](teams-apps-in-meetings.md)
