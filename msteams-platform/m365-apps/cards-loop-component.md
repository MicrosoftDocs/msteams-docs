---
title: Build Adaptive Card-based Loop component
description: In this module, learn and build Adaptive Card Loop components.
ms.localizationpriority: high
ms.topic: reference
ms.date: 08/16/2023
---

# Adaptive Card-based Loop components

> [!NOTE]
>
> * Adaptive Card-based Loop components are available in [public developer preview](../resources/dev-preview/developer-preview-intro.md).
> * Adaptive Card-based Loop components require Adaptive Cards version 1.6 or later.

Adaptive Card-based Loop components enable you to build collaborative experiences within your Teams [message extensions](../messaging-extensions/what-are-messaging-extensions.md) that work across Microsoft 365. Adaptive Card-based Loop components have actionable content that enables users to make live updates without having to switch context between Microsoft 365 apps, such as Teams and Outlook.

[Loop components](https://support.microsoft.com/office/first-things-to-know-about-loop-components-in-microsoft-teams-ee2a584b-5785-4dd6-8a2d-956131a29c81) were first released in Teams followed by other Microsoft 365 apps such as Outlook, Whiteboard, and Loop app. Loop components allow users to collaborate and share live content with others in the chat, email, meeting, Whiteboard or Loop app. Because Loop components stay in sync across different Microsoft 365 apps, they enable users to coauthor content and make real-time updates on their content. For more information, see [overview of Loop components in the Microsoft 365 ecosystem](/microsoft-365/loop/loop-components-teams).

Following is an example of an Adaptive Card-based Loop component:

:::image type="content" source="~/assets/images/adaptive-cards/adaptive-card-loop.png" alt-text="Example of an Adaptive Card Loop component.":::

This article provides an overview of how to build and test your Adaptive Card-based Loop components.

## Prerequisites

Before you build an Adaptive Card-based Loop component, ensure that you meet the following prerequisites:

1. [Build a message extension with a search command](../messaging-extensions/what-are-messaging-extensions.md).

1. Add [link unfurling](../messaging-extensions/how-to/link-unfurling.md) support to the message extension.

1. Use [Universal Actions for Adaptive Cards](../task-modules-and-cards/cards/Universal-actions-for-adaptive-cards/Work-with-Universal-Actions-for-Adaptive-Cards.md).

1. [Extend your Teams message extension across Microsoft 365](extend-m365-teams-message-extension.md).

## Build Adaptive Card-based Loop component

To build the Adaptive Card-based Loop component, follow these steps:

1. Ensure that the Adaptive Card adheres to the [design guidelines](design-loop-components.md) to build an actionable and coherent Adaptive Card-based experience for your end users.
1. To enable Loop component, add the URL that uniquely identifies the card in the [metadata.webUrl](https://adaptivecards.io/explorer/Metadata.html) property in the [Adaptive Card schema](https://adaptivecards.io/explorer/). The `metadata.webUrl` property supports portability through the Copy button present in the Loop component header.

### Example

The following is a JSON example of an Adaptive Card-based Loop component with the `metadata` and `webUrl` properties:

```json
{
  "type": "AdaptiveCard",
  "version": "1.6",
  "metadata": {
    "webUrl": "https://contoso.com/tab"
  },
  "body": [
    {
      ....
    },
  ]
  }
```

### Query parameters

|Property|Type|Description|Required|
|---|---|---|---|
| `metadata`| Metadata | Defines various metadata properties typically not used for rendering the card. | No |
| `webUrl` | String | URL that uniquely identifies the card and serves as a browser fallback that can be used by some hosts.| No |

## Test your Loop component

You can test the Loop component in the developer preview environments of Microsoft Teams and Outlook for web.

### Test in Microsoft Teams

To configure, distribute, and manage your application use the [Developer Portal for Teams](../concepts/build-and-test/teams-developer-portal.md). You can test and debug your app in the Developer Portal using the following options:

* **Overview page**: On the **Overview page**, under **Teams store validation**, you can see a snapshot of your app's configuration and check if your app package validates against Teams store test cases.
* **Preview in Teams**: The **Preview in Teams** button launches your app quickly in the Teams client for debugging.

:::image type="content" source="../assets/images/developer-portal-overview.png" alt-text="A screenshot of the Developer Portal overview page with the Preview in Teams button highlighted. " lightbox="../assets/images/developer-portal-overview.png" :::

### Test in Outlook for web

To turn on the Adaptive Card-based Loop component in Outlook for web, follow these steps:

1. Create a search-based message extension using [Teams App Camp](https://microsoft.github.io/app-camp/).
1. [Create a Microsoft 365 developer tenant](https://developer.microsoft.com/microsoft-365/dev-program) or sign in with your test tenant credentials.
1. [Enable Targeted Release for everyone](/microsoft-365/admin/manage/release-options-in-office-365?view=o365-worldwide&preserve-view=true).
1. Send an email from the tenant admin account to  [AC Loops Dev Preview Help](mailto:acloops-preview-help@microsoft.com). Microsoft will verify the admin user and enable support for Loop components for this tenant.

   > [!NOTE]
   > For any help in building Adaptive Card-based Loop components reach out to [AC Loops Dev Preview Help](mailto:acloops-preview-help@microsoft.com).

The Adaptive Card generated by your app is rendered as a Loop component.

## Code sample

|**Sample name** | **Description** | **Node.js** |
|----------------|-----------------|--------------|
| Adaptive Card-based Loop component | This sample demonstrates how to created a message extension with adaptive card-based loop components.|[View](https://github.com/OfficeDev/Microsoft-Teams-Samples/tree/main/samples/msgext-unfurling-ac-loop-components/nodejs)|

## See also

[Design your Loop component](design-loop-components.md)
