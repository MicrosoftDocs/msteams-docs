---
title: Loop Component in Adaptive Cards
description: Learn how to build and test Adaptive Card-based Loop components for collaborative experiences within Microsoft Teams.
ms.localizationpriority: high
ms.topic: reference
ms.date: 10/11/2024
---

# Adaptive Card-based Loop components

> [!NOTE]
>
> * Adaptive Card-based Loop components require Adaptive Card schema version 1.6 or later.
> * Adaptive Card-based Loop components aren't available in Microsoft Teams and Microsoft Outlook on macOS and mobile clients.

Adaptive Card-based Loop components enable you to build collaborative experiences within your Teams message extensions that work across Microsoft 365. Adaptive Card-based Loop components have actionable content that enables users to make live updates without having to switch contexts between Microsoft 365 apps, such as Teams and Outlook.

Following is an example of an Adaptive Card-based Loop component:

:::image type="content" source="~/assets/images/adaptive-cards/adaptive-card-loop.png" alt-text="Screenshot shows an Adaptive Card-based Loop component.":::

## Build an Adaptive Card-based Loop component

To build an Adaptive Card-based Loop component, follow these steps:

1. [Build a message extension with a search command](../sbs-gs-msgext.yml).

1. Add [link unfurling](../messaging-extensions/how-to/link-unfurling.md) to the message extension.

1. Use [Universal Actions for Adaptive Cards](../task-modules-and-cards/cards/Universal-actions-for-adaptive-cards/Work-with-Universal-Actions-for-Adaptive-Cards.md) and define the `refresh` property to ensure that the card is always up to date. For more information, see [up-to-date cards](../task-modules-and-cards/cards/Universal-actions-for-adaptive-cards/Up-To-Date-Views.md).

1. [Extend your message extension across Microsoft 365](extend-m365-teams-message-extension.md). This step includes the following actions:
   1. [Update your app manifest to version 1.13 or later.](extend-m365-teams-message-extension.md#update-your-app-manifest)
   1. Add the Microsoft 365 channel for your bot.
   1. Update the Microsoft Entra app registration for single sign-on (SSO).

1. Add the URL that uniquely identifies the card in the [metadata.webUrl](https://adaptivecards.io/explorer/Metadata.html) property. The `metadata.webUrl` property supports portability through the **Copy component** button :::image type="icon" source="../assets/icons/copy-component-button.png" border="false"::: present in the Loop component header.

1. [Add your message extension to Teams](extend-m365-teams-message-extension.md#upload-your-custom-app-in-teams) and [preview your message extension in Outlook](extend-m365-teams-message-extension.md#preview-your-message-extension-in-outlook). Alternatively, you can also debug your app in [Developer Portal for Teams](../concepts/build-and-test/teams-developer-portal.md) using the **Preview in Teams** button on the **Overview** page.

   :::image type="content" source="../assets/images/developer-portal-overview.png" alt-text="A screenshot of Developer Portal's overview page with the Preview in Teams button highlighted in red. " lightbox="../assets/images/developer-portal-overview.png":::

> [!NOTE]
> Ensure that the Adaptive Card-based Loop component adheres to the [design guidelines](design-loop-components.md) to build an actionable and coherent Adaptive Card-based experience for your users.

### Example

The following JSON payload is an example of an Adaptive Card-based Loop component with the `metadata` and `webUrl` properties:

```json
{
  "type": "AdaptiveCard",
  "version": "1.6",
  "metadata": {
    "webUrl": "https://contoso.com/tab"
  },
  "refresh": {
    "action": {
      "type": "Action.Execute",
      "title": "Submit",
      "verb": "personalDetailsCardRefresh"
    },
    "userIds": []
  },
  "body": [
    {
      ....
    },
  ]
  }
```

### Schema

|Property|Type|Description|
|---|---|---|
| `metadata`| Metadata | Defines various metadata properties typically not used for rendering the card. |
| `webUrl` | String | URL that uniquely identifies the card and serves as a browser fallback that can be used by some hosts. |

> [!NOTE]
>
> * When you copy an Adaptive Card-based Loop component, the URL of the Loop component is copied. When you paste the URL in a Teams chat or the Loop app, the link unfurls into the Adaptive Card-based Loop component.
> * Adaptive Card-based Loop components use the same [refresh mechanism](/adaptive-cards/authoring-cards/universal-action-model#refresh-mechanism) as regular Adaptive Cards. The content in an Adaptive Card-based Loop component is refreshed only when a user opens the Loop component.

## Code sample

|**Sample name** | **Description** | **Node.js** | **.NET** | **Manifest** |
|----------------|-----------------|--------------|--------------|--------------|
| Message extension with Adaptive Card-based Loop component | This sample demonstrates how to create a message extension with an Adaptive Card-based Loop component.|[View](https://github.com/OfficeDev/Microsoft-Teams-Samples/tree/main/samples/msgext-unfurling-ac-loop-components/nodejs)| [View](https://github.com/OfficeDev/Microsoft-Teams-Samples/tree/main/samples/msgext-unfurling-ac-loop-components/csharp) | [View](https://github.com/OfficeDev/Microsoft-Teams-Samples/blob/main/samples/msgext-unfurling-ac-loop-components/nodejs/demo-manifest/msgext-unfurling-ac-loop-components.zip) |

## See also

* [Build message extensions](../messaging-extensions/what-are-messaging-extensions.md)
* [Design your Loop component](design-loop-components.md)
* [Adaptive Cards Schema Explorer](https://adaptivecards.io/explorer/)
