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

Yes! When initializing Live Share, you can define your own `AzureConnectionConfig`. Live Share associates containers you create with meetings, but you'll need to implement the `ITokenProvider` interface to sign tokens for your containers. For example, you can use a provided `AzureFunctionTokenProvider`, which uses an Azure cloud function to request an access token from a server.

While most of you find it beneficial to use our free hosted service, there may still be times where it's beneficial to use your own Azure Fluid Relay service for your Live Share app. Consider using a custom AFR service connection if you:

* Require storage of data in Fluid containers beyond the lifetime of a meeting.
* Transmit sensitive data through the service that requires a custom security policy.
* Develop features through Fluid Framework, for example, `SharedMap`, for your application outside of Teams.

For more information, see [how to guide](./teams-live-share-how-to/how-to-custom-azure-fluid-relay.md) or visit the [Azure Fluid Relay documentation](/azure/azure-fluid-relay/).

<br>

</details>

<details>

<summary><b>How long is data stored in Live Share's hosted service accessible?</b></summary>

Any data sent or stored through Fluid containers created by Live Share's hosted Azure Fluid Relay service may be accessible for up to 24 hours, though in most cases it is deleted within six hours. If you want to persist data beyond 24 hours, you can replace our hosted Azure Fluid Relay service with your own. Alternatively, you can use your own storage provider in parallel to Live Share's hosted service.

<br>

</details>

<details>

<summary><b>What meeting types does Live Share support?</b></summary>

Scheduled meetings, one-on-one calls, group calls, meet now, and channel meetings are supported.

<br>

</details>

<details>

<summary><b>Will Live Share's media package work with DRM content?</b></summary>

No. Teams currently doesn't support encrypted media for tab applications on desktop. Chrome, Edge, and mobile clients are supported. For more information, you can [track the issue here](https://github.com/microsoft/live-share-sdk/issues/14).

<br>

</details>

<details>
<summary><b>How many people can attend a Live Share session?</b></summary>

Currently, Live Share supports a maximum of 100 attendees per session. If this is something you're interested in, you can [start a discussion here](https://github.com/microsoft/live-share-sdk/discussions).

<br>

</details>

<details>
<summary><b>Can I use Live Share's data structures outside of Teams?</b></summary>

Currently, Live Share packages require the Teams Client SDK to function properly. Features in `@microsoft/live-share` or `@microsoft/live-share-media` won't work outside Microsoft Teams. If this is something you're interested in, you can [start a discussion here](https://github.com/microsoft/live-share-sdk/discussions).

<br>

</details>

<details>
<summary><b>Can I use multiple Fluid containers?</b></summary>

Currently, Live Share only supports having one container using our provided Azure Fluid Relay service. However, it's possible to use both a Live Share container and a container created by your own Azure Fluid Relay instance.

<br>

</details>

<details>
<summary><b>Can I change my Fluid container schema after creating the container?</b></summary>

Currently, Live Share doesn't support adding new `initialObjects` to the Fluid `ContainerSchema` after creating or joining a container. Because Live Share sessions are short-lived, this is most commonly an issue during development after adding new features to your app.

> [!NOTE]
> If you are using the `dynamicObjectTypes` property in the `ContainerSchema`, you can add new types at any point. If you later remove types from the schema, existing DDS instances of those types will gracefully fail.

To fix errors resulting from changes to `initialObjects` when testing locally in your browser, remove the hashed container ID from your URL and reload the page. If you're testing in a Teams meeting, start a new meeting and try again.

If you plan to update your app with new `SharedObject`, `DataObject`, or `LiveDataObject` instances, you should consider how you deploy new schema changes to production. While the actual risk is relatively low and short lasting, there may be active sessions at the time you roll out the change. Existing users in the session shouldn't be impacted, but users joining that session after you deployed a breaking change may have issues connecting to the session. To mitigate this, you may consider some of the following solutions:

* Use our experimental [Live Share Turbo](https://aka.ms/liveshareturbo) or [Live Share for React](https://aka.ms/livesharereact) packages.
* Deploy schema changes for your web application outside of normal business hours.
* Use `dynamicObjectTypes` for any changes made to your schema, rather than changing `initialObjects`.

> [!NOTE]
> Live Share does not currently support versioning your `ContainerSchema`, nor does it have any APIs dedicated to migrations.

<br>

</details>

<details>
<summary><b>Are there limits to how many change events I can emit through Live Share?</b></summary>

While there aren't any enforced limits, you should be mindful of how many messages you send. For optimal performance, you must debounce changes emitted through Live Share to one message per 50 milliseconds or more. This is especially important when sending changes based on mouse or touch coordinates, such as when synchronizing cursor positions, inking, and dragging objects around a page.

<br>

</details>

<details>
<summary><b>Is Live Share supported for Government Community Cloud (GCC), Government Community Cloud High (GCC-High), and Department of Defense (DOD) tenants?</b></summary>

Live Share isn't supported for GCC, GCC-High, and DOD tenants.

<br>

</details>

<details>
<summary><b>Does Live Share support external and guest users?</b></summary>

Yes, Live Share supports guest and external users for most meeting types. However, guest users are not supported in channel meetings.

<br>

</details>

<details>
<summary><b>Does Live Share support Teams Rooms devices?</b></summary>

No, Live Share does not support Teams Rooms devices at this time.

<br>

</details>

<details>
<summary><b>Do Live Share apps support meeting recordings?</b></summary>

No, neither Live Share nor other meeting stage apps support Teams meeting recordings at this time.

<br>

</details>

<details>
<summary><b>Does Live Share support Azure Communication Services users?</b></summary>

Live Share supports external users joining a Teams meeting from Azure Communication Services in private preview. For more information, follow our [how-to guide](./teams-live-share-how-to/how-to-live-share-acs).

<br>

</details>

## Have more questions or feedback?

Submit issues and feature requests to the SDK repository for [Live Share SDK](https://github.com/microsoft/live-share-sdk). Use the `live-share` and `microsoft-teams` tag to post how-to questions about the SDK at [Stack Overflow](https://stackoverflow.com/questions/tagged/live-share+microsoft-teams).

## See also

* [Apps for Teams meetings](teams-apps-in-meetings.md)
* [GitHub repository](https://github.com/microsoft/live-share-sdk)
* [Live Share SDK reference docs](/javascript/api/@microsoft/live-share/)
* [Live Share Media SDK reference docs](/javascript/api/@microsoft/live-share-media/)
* [Use Fluid with Teams](../tabs/how-to/using-fluid-msteam.md)
