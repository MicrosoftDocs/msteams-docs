---
title: Adaptive Card loop component
description: In this module, learn and build Adaptive Card loop components.
ms.localizationpriority: high
ms.topic: reference
ms.date: 08/16/2023
---

# Adaptive Card loop component

> [!NOTE]
>
> * Adaptive Card-based Loop components are available in only [public preview](../resources/dev-preview/developer-preview-intro.md).
> * Adaptive Card-based Loop component is available from Adaptive Card version 1.6.

Loop component is an evolution of Fluid component - a way to collaborate with a team through loop whether it’s in chat, email, meeting, or Loop page. Loop components  sync across Microsoft 365 apps such as Teams and Outlook. Loop components in Teams chat offer a new way to ideate, create, share, and collaborate content across Microsoft 365, and complete tasks in the flow of work. You can share a component such as a table, task list, or paragraph in a chat and make edits in real time. For more information, see [Loop components](https://support.microsoft.com/office/first-things-to-know-about-loop-components-ee2a584b-5785-4dd6-8a2d-956131a29c81).

Adaptive Card-based Loop component allows Microsoft 365 developers to build Loop experiences while building upon their existing message extension-based Microsoft 365 integrations. Adaptive Card-based Loop component has actionable content and enables users to make quick updates without switching context. Loop components adhere to Microsoft 365 platform's 'build once, works everywhere' philosophy, which ensures that your Loop component automatically works seamlessly across Teams and Outlook, and other Microsoft 365 hub apps.

Following is an example of an Adaptive Card-based Loop component:

:::image type="content" source="~/assets/images/adaptive-cards/adaptive-card-loop.png" alt-text="Example of an Adaptive Card loop component.":::

## Prerequisites

Before you build an Adaptive Card-based Loop component, ensure that you meet the following prerequisites:

1. [Build a Message Extension with a Search command](../messaging-extensions/what-are-messaging-extensions.md).

1. Add [link unfurling](../messaging-extensions/how-to/link-unfurling.md) support to the Message Extension

1. Use [Universal Actions for Adaptive Cards](../task-modules-and-cards/cards/Universal-actions-for-adaptive-cards/Work-with-Universal-Actions-for-Adaptive-Cards.md)

1. [Extend your Teams message across Microsoft 365](extend-m365-teams-message-extension.md)

## Build Loop components

After you've met all the requirements, upgrade the Adaptive Card into a Loop component using the following steps:

1. Ensure the Adaptive Card adheres to the [design guidelines](design-loop-components.md) to build an actionable and coherent Adaptive Card based experience for your end users.
1. To enable Loop component, add the URL that uniquely identifies the card in the [metadata.webUrl](https://adaptivecards.io/explorer/Metadata.html) property in the [Adaptive Card schema](https://adaptivecards.io/explorer/) to support portability via the Copy button present in the Loop header.

### Example

The following is a JSON example of an Adaptive Card-based Loop component with the `metadata` and `webUrl` properties:

```json
{
  "type": "AdaptiveCard",
  "version": "1.6",
  "metadata": {
    "webUrl": "https://jarvisacloopsbot.azurewebsites.net/refreshCard"
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
| `metadata`| Metadata | Defines various metadata properties typically not used for rendering the card | No |
| `webUrl` | String | URL that uniquely identifies the card and serves as a browser fallback that can be used by some hosts.|No|

## Test your Loop component

You can test the loop component in the developer preview environments of Microsoft Teams and Outlook for web.

### Test in Microsoft Teams

To configure, distribute, and manage your application use the [Developer Portal for Teams](../concepts/build-and-test/teams-developer-portal.md). You can test and debug your app in the Developer Portal using the following options:

* **Overview page**: On the **Overview page**, you can see a snapshot of whether your app's configurations validate against Teams store test cases.
* **Preview in Teams**: The **Preview in Teams** button lets you launch your app quickly in the Teams client for debugging.

:::image type="content" source="../assets/images/developer-portal-overview.png" alt-text="A screenshot of the Developer Portal overview page with the Preview in Teams button highlighted":::

### Test in Outlook for web

To turn on the Adaptive Card-based Loop component in Outlook.com, follow these steps:

1. Create a search-based message extension using [Teams App Camp](https://microsoft.github.io/app-camp/).
1. [Create a Microsoft 365 developer tenant](https://developer.microsoft.com/microsoft-365/dev-program) or sign in with your test tenant credentials.
1. [Enable Targeted Release for everyone](/microsoft-365/admin/manage/release-options-in-office-365?view=o365-worldwide&preserve-view=true).
1. Send an email from the tenant admin account to  [AC loops Dev Preview Help](mailto:acloops-preview-help@microsoft.com). Microsoft will verify the admin user and enable support for Loop components for this tenant.

   > [!NOTE]
   > For any help in building Adaptive Card-based Loop components reach out to [AC loops Dev Preview Help](mailto:acloops-preview-help@microsoft.com).

The Adaptive Card generated by your app is rendered as a Loop component.

## See also

[Loop component developer user experience guidelines](design-loop-components.md)
