---
title: Live Share FAQ
description: In this module, learn more about Live Share Frequently Asked Questions.
ms.topic: overview
ms.localizationpriority: high
ms.author: v-ypalikila
---

---

# Live Share SDK FAQ

Get answers to common questions when using Live Share.<br>

<br>

<details>

<summary><b>Can I use my own Azure Fluid Relay service?</b></summary>

Yes. When constructing the `TeamsFluidClient` class, you can define your own `AzureConnectionConfig`. Live Share associates containers you create with meetings, but you'll need to create your own Azure `ITokenProvider` to sign tokens for your containers and regional requirements. For more information, see Azure [Fluid Relay documentation](/azure/azure-fluid-relay/).

<br>

</details>

<details>

<summary><b>How long is data stored in Live Share's hosted service accessible?</b></summary>

Any data sent or stored through Fluid containers created by Live Share's hosted Azure Fluid Relay service is accessible for 24 hours. If you want to persist data beyond 24 hours, you can replace our hosted Azure Fluid Relay service with your own. Alternatively, you can use your own storage provider in parallel to Live Share's hosted service.

<br>

</details>

<details>

<summary><b>What meeting types does Live Share support?</b></summary>

Currently, only scheduled meetings are supported and all participants must be on the meeting calendar. Meeting types such as, one-on-one calls, group calls, and meet now aren't supported.

<br>

</details>

<details>

<summary><b>Will Live Share's media package work with DRM content?</b></summary>

No. Teams currently doesn't support encrypted media for tab applications.

<br>

</details>

<details>
<summary><b>How many people can attend a Live Share session?</b></summary>

Currently, Live Share supports a maximum of 100 attendees per session.

<br>

</details>

## Have more questions or feedback?

Submit issues and feature requests to the SDK repository for [Live Share SDK](https://github.com/microsoft/live-share-sdk). Use the `live-share` and `microsoft-teams` tag to post how-to questions about the SDK at [Stack Overflow](https://stackoverflow.com/questions/tagged/live-share+microsoft-teams).

## See also

- [GitHub repository](https://github.com/microsoft/live-share-sdk)
- [Live Share SDK reference docs](/javascript/api/@microsoft/live-share/)
- [Live Share Media SDK reference docs](/javascript/api/@microsoft/live-share-media/)
- [Teams apps in meetings](teams-apps-in-meetings.md)
