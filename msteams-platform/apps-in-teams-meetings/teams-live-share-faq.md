---
title: Live Share FAQ
author: surbhigupta
description: Learn more about Live Share SDK frequently asked questions related to Azure Fluid Relay service, data stored in Live Share, fluid containers, and government clouds.
ms.topic: overview
ms.localizationpriority: high
ms.author: surbhigupta
ms.date: 01/07/2025
---

---

# Live Share SDK FAQ

Get answers to common questions when using Live Share.<br>

<br>

<details>

<summary><b>Can I use my own Azure Fluid Relay service?</b></summary>

Yes! When initializing Live Share, you can define your own `AzureConnectionConfig`. Live Share associates containers you create with meetings, chats, or channels, but you need to implement the `ITokenProvider` interface to sign tokens for your containers. For example, you can use a provided `AzureFunctionTokenProvider`, which uses an Azure cloud function to request an access token from a server.

While most of you find it beneficial to use our free hosted service, there might still be times where it's beneficial to use your own Azure Fluid Relay service for your Live Share app. Consider using a custom Azure Fluid Relay service connection if you:

- Require storage of data in Fluid containers beyond six hours after the container is first created.
- Transmit sensitive data through the service that requires a custom security policy.
- Develop features through Fluid Framework, for example, `SharedMap`, for your application outside of Teams.

For more information, see [how to guide](./teams-live-share-how-to/how-to-custom-azure-fluid-relay.md) or visit the [Azure Fluid Relay documentation](/azure/azure-fluid-relay/).

<br>

</details>

<details>

<summary><b>How long is data stored in Live Share's hosted service accessible?</b></summary>

Any data sent or stored through Fluid containers created by Live Share's hosted Azure Fluid Relay service might be accessible for up to 24 hours, though in most cases it's deleted within six hours. If you want to persist data beyond 24 hours, you can replace our hosted Azure Fluid Relay service with your own. Alternatively, you can use your own storage provider in parallel to Live Share's hosted service.

<br>

</details>

<details>

<summary><b>What meeting types does Live Share support?</b></summary>

Scheduled meetings, one-on-one calls, group calls, meet now, and channel meetings are supported.

<br>

</details>

<details>

<summary><b>Can I use Live Share for my tab outside of meetings?</b></summary>

Yes! Live Share supports chat and channel content contexts, including configurable tabs, static tabs, and Collaborative Stageview for Microsoft Teams desktop and web clients. Personal apps aren't supported.

> [!NOTE]
> Microsoft Teams iOS and Android clients don't support Live Share sessions outside of meeting contexts.

<br>

</details>

<details>

<summary><b>Will Live Share's media package work with DRM content?</b></summary>

Yes, DRM is supported in the new Teams desktop, web, iOS, and Android clients. The classic Teams client doesn't support DRM. To enable DRM encryption for Teams desktop, enable the `media` device permission in your app manifest.

<br>

</details>

<details>
<summary><b>How many people can attend a Live Share session?</b></summary>

Live Share supports a maximum of 100 attendees per session. If you're interested in the same, you can [start a discussion here](https://github.com/microsoft/live-share-sdk/discussions).

<br>

</details>

<details>
<summary><b>Can I use Live Share's data structures outside of Teams?</b></summary>

Live Share packages require the Teams Client SDK to function properly. Features in `@microsoft/live-share` or `@microsoft/live-share-media` don't work outside Microsoft Teams. If you're interested in the same, you can [start a discussion here](https://github.com/microsoft/live-share-sdk/discussions).

<br>

</details>

<details>
<summary><b>Can I use multiple Fluid containers?</b></summary>

Live Share only supports having one container using our provided Azure Fluid Relay service. However, it's possible to use both a Live Share container and a container created by your own Azure Fluid Relay instance.

<br>

</details>

<details>
<summary><b>Can I change my Fluid container schema after creating the container?</b></summary>

Live Share doesn't support adding new `initialObjects` to the Fluid `ContainerSchema` after creating or joining a container. As Live Share sessions are short-lived, this issue commonly arises during development, particularly after adding new features to your app.

> [!NOTE]
> If you are using the `dynamicObjectTypes` property in the `ContainerSchema`, you can add new types at any point. If you later remove types from the schema, existing DDS instances of those types will gracefully fail.

To fix errors resulting from changes to `initialObjects` when testing locally in your browser, remove the hashed container ID from your URL and reload the page. If you're testing in a Teams meeting, start a new meeting and try again.

If you plan to update your app with new `SharedObject`, `DataObject`, or `LiveDataObject` instances, you must consider how you deploy new schema changes to production. While the actual risk is relatively low and short lasting, there might be active sessions at the time you roll out the change. Existing users in the session must not be impacted, but users joining that session after you deployed a breaking change might have issues connecting to the session. To mitigate this risk, you might consider some of the following solutions:

- Use our experimental [Live Share Turbo](https://aka.ms/liveshareturbo) or [Live Share for React](https://aka.ms/livesharereact) packages.
- Deploy schema changes for your web application outside of normal business hours.
- Use `dynamicObjectTypes` for any changes made to your schema, rather than changing `initialObjects`.

> [!NOTE]
> Live Share doesn't support versioning your `ContainerSchema` and doesn't have any APIs dedicated to migrations.

<br>

</details>

<details>
<summary><b>Are there limits to how many change events I can emit through Live Share?</b></summary>

While there aren't any enforced limits, you must be mindful of how many messages you send. For optimal performance, you must debounce changes emitted through Live Share to one message per 50 milliseconds or more. This action is especially important when sending changes based on mouse or touch coordinates, such as when synchronizing cursor positions, inking, and dragging objects around a page.

<br>

</details>

<details>
<summary><b>Is Live Share supported for Government Community Cloud (GCC), GCC High, Department of Defense (DOD), and Teams operated by 21Vianet environment?</b></summary>

Live Share is only supported in GCC environment.

<br>

</details>

<details>
<summary><b>Does Live Share support external and guest users?</b></summary>

Yes, Live Share supports guest and external users for most meeting types. However, guest users aren't supported in channel meetings.

<br>

</details>

<details>
<summary><b>Does Live Share support Teams Rooms devices?</b></summary>

No, Live Share doesn't support Teams Rooms devices.

<br>

</details>

<details>
<summary><b>Do Live Share apps support meeting recordings?</b></summary>

No, Live Share doesn't support Teams Rooms devices.

<br>

</details>

<details>
<summary><b>Does Live Share support the Fluid Framework version 2 beta?</b></summary>

Yes, Live Share supports Fluid Framework version `^2.0.0-rc` and later in preview. If you're interested in using these preview versions, update your Live Share packages to version `2.0.0-preview.0` or later.

<br>

</details>

## Have more questions or feedback?

Submit issues and feature requests to the SDK repository for [Live Share SDK](https://github.com/microsoft/live-share-sdk). Use the `live-share` and `microsoft-teams` tag to post how-to questions about the SDK at [Stack Overflow](https://stackoverflow.com/questions/tagged/live-share+microsoft-teams).

## See also

- [Apps for Teams meetings](teams-apps-in-meetings.md)
- [GitHub repository](https://github.com/microsoft/live-share-sdk)
- [Live Share SDK reference docs](/javascript/api/@microsoft/live-share/)
- [Live Share Media SDK reference docs](/javascript/api/@microsoft/live-share-media/)
- [Use Fluid with Teams](../tabs/how-to/using-fluid-msteam.md)
