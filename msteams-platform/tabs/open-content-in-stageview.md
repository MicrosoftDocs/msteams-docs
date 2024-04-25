---
title: Open content in Stageview
author: Rajeshwari-v
description: Learn about the types of Stageview, a full screen UI component invoked to surface your app content. Open content in multi-window experiences using deep links, Adaptive Cards, or Teams JavaScript client library (TeamsJS).
ms.topic: conceptual
ms.author: surbhigupta
ms.localizationpriority: high
ms.date: 06/05/2023
---

# Open content in Stageview

Microsoft Teams provides multiple methods to open your app content in immersive canvas experiences. Stageview allows users to adopt multitasking inside Teams, for example, you can open your app content in a new Teams window with a specific chat in the side panel. Stageview is designed to:

* Facilitate multitasking within Teams.
* Support collaboration in a Teams multi-window.
* Focus on specific tasks in a large modal experience.

> [!NOTE]
> The article is based on Teams JavaScript client library (TeamsJS) version 2.0.x. If you're using an earlier version, see [TeamsJS](how-to/using-teams-client-library.md) for guidance between the latest and earlier versions.

## Types of Stageview

 Based on the UI and functionality, Stageview offers three ways to open your app content:

* [Collaborative Stageview](#collaborative-stageview)
* [Stageview Multi-window](#stageview-multi-window)
* [Stageview Modal](#stageview-modal)

### Collaborative Stageview

Collaborative Stageview enables multitasking scenarios for your app content in Teams. Users can open and view your app content inside a new Teams window while accompanied by a side panel conversation. This view enables meaningful content engagement and collaboration from within the same window.

**Best usage**: When the content is opened from a conversation such as chat, channel, or channel tab.

:::image type="content" source="~/assets/images/tab-images/collab-view.png" alt-text="The screenshot shows the Collaborative Stageview in Teams.":::

### Stageview Multi-window

Stageview Multi-window is useful for scenarios that require a user to multitask in Teams without the need for collaboration. This view opens the app content in a new Teams window without a side panel conversation allowing users to focus on their task.

**Best usage**: When the content is opened from a nonconversational surface such as a personal app.

:::image type="content" source="~/assets/images/tab-images/multi-view.png" alt-text="The screenshot shows the Stageview Multi-window in Teams.":::

### Stageview Modal

Stageview Modal is a full-screen UI component used to render your app content inside the Teams main window. This view provides users with a focused experience to engage with the app content. Stageview Modal is useful for displaying rich content that doesn't require a user to multitask. It’s the default view when Collaborative Stageview and Stageview Multi-window aren't supported.

> [!NOTE]
> Teams web client supports Stageview Modal only.

:::image type="content" source="~/assets/images/tab-images/modal-view1.png" alt-text="The screenshot shows the Stageview Modal in Teams.":::

## Invoke Stageview

You can invoke Stageview in Teams through one of the following methods and configure the expected Stageview response. The following table provides the default and defined response for each Stageview invoke method:

| Invoke method | Default response | Defined response |
| ---| ---| --- |
| [Adaptive Card](#invoke-collaborative-stageview-from-adaptive-card) | Opens in Collaborative Stageview. | Opens in Stageview Modal, if Collaborative Stageview or Stageview Multi-window isn't supported. |
| [stageView API](#invoke-from-stageview-api) | Opens in Collaborative Stageview. | Opens in the respective Stageview based on the `openMode` [defined](#openmode). |
| [Deep link](#invoke-from-deep-link)| Opens in Collaborative Stageview. | Opens in the respective Stageview based on the `openMode` [defined](#openmode). |

<br>
<details>
<summary id="openmode" ><b>openMode property</b></summary>

`openMode` is a property in [StageViewParams interface](/javascript/api/@microsoft/teams-js/stageview.stageviewparams). The `openMode` property is optional and can be defined in a [stageView API](#invoke-from-stageview-api) or a [deep link](#invoke-from-deep-link) to determine the type of Stageview response. The `openMode` property has the following three values:

* `popoutWithChat`
* `popout`
* `modal`

The following table provides the Stageview response of the `openMode` values:

| Input | Response |
| ---| ---|
| `openMode` defined as `popoutWithChat` | Opens in Collaborative Stageview with an associated side panel conversation. |
| `openMode` defined as `popout`| Opens in Stageview Multi-window without a side panel conversation. |
| `openMode` defined as `modal` | Opens in Stageview Modal. |

When `openMode` isn't defined, the content opens by default in Collaborative Stageview with an associated side panel conversation. The fallback hierarchy for a Stageview response is `popoutWithChat` > `popout` > `modal`.

> [!NOTE]
>
> * The `openMode` values are case sensitive. If you don't use the correct casing, the content opens in Stageview Modal.
> * When pop-out experience isn't supported, for example in a Teams web client, the content opens in Stageview Modal even when the `openMode` property is defined.

</details>

### Invoke Collaborative Stageview from Adaptive Card

Collaborative Stageview from an Adaptive Card allows users to engage with your content while continuing the conversation flow. If Collaborative Stageview is invoked from an Adaptive Card JSON in Teams web client, it opens in a Stageview Modal.

The following steps help you to understand how Collaborative Stageview is invoked from an Adaptive Card:

1. When the user shares a URL for an app content in a Teams chat, the bot receives a `composeExtensions/queryLink` invoke request. The bot returns an Adaptive Card with the type `tab/tabInfoAction`.

1. After the user selects the action button on the Adaptive Card, Collaborative Stageview opens based on the content in the Adaptive Card.

:::image type="content" source="../assets/images/tab-images/collab-view.gif" alt-text="The graphical representation shows how Collaborative Stageview response from Adaptive Card.":::

The following JSON code is an example to create an action button in an Adaptive Card:

```json
{
  "type": "Action.Submit",
  "title": "Open",
  "data": {
    "msteams": {
      "type": "invoke",
      "value": {
        "type": "tab/tabInfoAction",
        "tabInfo": {
          "contentUrl": "contentUrl",
          "websiteUrl": "websiteUrl",
          "name": "Sales Report",
          "entityId": "entityId"
        }
      }
    }
  }
}
```

**Best practices to create an Adaptive Card**

* The content URL must be within the list of `validDomains` in your app manifest.
* The invoke request type must be `composeExtensions/queryLink`.
* The `invoke` workflow must be similar to the `appLinking` workflow.
* The `Action.Submit` must be configured as `Open` to maintain consistency.

If your app isn't optimized to work in Teams mobile client, Stageview for apps distributed through the [Microsoft Teams Store](../concepts/deploy-and-publish/apps-publish-overview.md) opens in a default web browser.

### Invoke from stageView API

The stageView API from TeamsJS allows you to open the Teams window in a Stageview experience based on the `openMode` defined. If the `openMode` property isn't defined, the default response is a Collaborative Stageview with an associated side panel conversation. In a Collaborative Stageview experience, the side panel conversation is the same thread from where the Stageview was invoked such as chat or group chat.

> [!NOTE]
> The stageView API supports an optional `threadId` parameter that allows you to bring a specific conversation to the Collaborative Stageview side panel. Mapping `contentUrl` to `threadId` allows you to persist a conversation alongside the content.

The following codes are the samples for each `openMode` value in stageView API:

# [popoutWithChat](#tab/withchat)

The `openMode` property is defined as `popoutWithChat` in [StageViewParams](/javascript/api/@microsoft/teams-js/stageview.stageviewparams) to open in Collaborative Stageview.

  ```json
    {
      "appId": "2c19df50-1c3c-11ea-9327-cd28e4b6f7ba",
      "contentUrl": "https://teams-test-tab.azurewebsites.net",
      "title": "Test tab ordering",
      "websiteUrl": "https://teams-test-tab.azurewebsites.net",
      "openMode": "popoutWithChat"
    }
  ```

# [popout](#tab/popout)

The `openMode` property is defined as `popout` in [StageViewParams](/javascript/api/@microsoft/teams-js/stageview.stageviewparams) to open in Stageview Multi-window.

  ```json
    {
      "appId": "2c19df50-1c3c-11ea-9327-cd28e4b6f7ba",
      "contentUrl": "https://teams-test-tab.azurewebsites.net",
      "title": "Test tab ordering",
      "websiteUrl": "https://teams-test-tab.azurewebsites.net",
      "openMode": "popout"
    }
  ```

# [modal](#tab/modal)

The `openMode` property is defined as `modal` in [StageViewParams](/javascript/api/@microsoft/teams-js/stageview.stageviewparams) to open in Stageview Modal.

  ```json
    {
      "appId": "2c19df50-1c3c-11ea-9327-cd28e4b6f7ba",
      "contentUrl": "https://teams-test-tab.azurewebsites.net",
      "title": "Test tab ordering",
      "websiteUrl": "https://teams-test-tab.azurewebsites.net",
      "openMode": "modal"
    }
  ```

---

When `openMode` isn't defined in [StageViewParams](/javascript/api/@microsoft/teams-js/stageview.stageviewparams), the default response is Collaborative Stageview.

  ```json
    {
      "appId": "2c19df50-1c3c-11ea-9327-cd28e4b6f7ba",
      "contentUrl": "https://teams-test-tab.azurewebsites.net",
      "title": "Test tab ordering",
      "websiteUrl": "https://teams-test-tab.azurewebsites.net"
    }
  ```

For more information on stageView API, see [stageView module](/javascript/api/@microsoft/teams-js/stageview).

#### stageView API parameters

[!INCLUDE [stageView API parameters](../includes/stageview-deep-link-query.md)]

### Invoke from deep link

To invoke Stageview through deep link from your tab or personal app, wrap the deep link URL in the [app.openLink(url) API](/javascript/api/%40microsoft/teams-js/app#@microsoft-teams-js-app-openlink) and define the `openMode` property for the chat content to open. When the openMode property isn't specified, Stageview response from a deep link defaults to Collaborative Stageview.

To display a specific chat in the side panel, you must specify a `threadId`. Otherwise, the side panel conversation brings the group chat or channel thread from which the deep link is invoked.

> [!NOTE]
>
> * All deep links must be encoded before you paste the URL. Unencoded URLs aren't supported.
> * When you invoke Stageview from a certain context, ensure that your app works in that context.
> * When adding a threadId, ensure your app works in the context of the threadId that's passed. If the context fails, the experience falls back to the personal context.

#### Syntax

**Deep link syntax for Collaborative Stageview:**

`https://teams.microsoft.com/l/stage/{appId}/0?context={"contentUrl":"contentUrl","websiteUrl":"websiteUrl","name":"Contoso","openMode":"popoutWithChat","threadId":"threadId"}`

The appID is your application ID. For more information on appID, see [different types of app IDs](../concepts/build-and-test/deep-link-application.md#app-id-for-different-types-of-apps).

**Encoded deep link syntax for Collaborative Stageview:**

`https://teams.microsoft.com/l/stage/%7BappId%7D/0?context=%7B%22contentUrl%22:%22contentUrl%22,%22websiteUrl%22:%22websiteUrl%22,%22name%22:%22Contoso%22,%22openMode%22:%22popoutWithChat%22,%22threadId%22:%22threadId%22%7D`

<br>
<details>
<summary><b>Example</b></summary>

**Encoded deep link URL to invoke Collaborative Stageview:**

`https://teams.microsoft.com/l/stage/6d621545-9c65-493c-b069-2b978b37c117/0?context=%7B%22appId%22%3A%226d621545-9c65-493c-b069-2b978b37c117%22%2C%22contentUrl%22%3A%22https%3A%2F%2F3282-115-111-228-84.ngrok-free.app%22%2C%22websiteUrl%22%3A%22https%3A%2F%2F3282-115-111-228-84.ngrok-free.app%22%2C%22name%22%3A%22DemoStageView%22%2C%22openMode%22%3A%22popoutWithChat%22%2C%22threadId%22%3A%2219%3Abe817b823c204cde8aa174ae146251dd%40thread.v2%22%7D`

</details>

#### Deep link query parameters

[!INCLUDE [Deep link query parameters](../includes/stageview-deep-link-query.md)]

Whether you want to facilitate multitasking, enhance collaboration, or provide focused user experience, Stageview has a mode to suit your requirements.

## FAQs

</br>

<details>

<summary>Which Stageview should I use?</summary>

Collaborative Stageview allows the users to open content along with a side panel conversation in a Teams window. This view is best suited for most of the collaboration scenarios.

</br>

</details>

<details>

<summary>What's the difference between Stageview Modal and dialogs?</summary>

Stageview Modal is useful to display rich content to the users, such as page, dashboard, or file. <br> Dialogs (referred as task modules in TeamsJS v1.x) are useful to display messages that need users' attention or collect information required to move to the next step.

</br>

</details>

<details>

<summary>When Stageview is invoked, the content opens in Collaborative Stageview but gets loaded in the main Teams window instead of a new window. How to open the content in a new window?</summary>

Ensure that your `contentUrl` domain is accurately reflected in the manifest `validDomains` property. For more information, see [app manifest schema](../resources/schema/manifest-schema.md).

</br>

</details>

<details>

<summary>Why isn't any content displayed in a new Teams window even when `contentUrl` matches with `validDomains`?</summary>

Call `app.notifySuccess()` in all iframe-based contents to notify Teams that your app is loaded successfully. If applicable, Teams hides the loading indicator. If `notifySuccess` isn't called within 30 seconds, Teams assumes that the app is timed out and displays an error screen with a retry option. For app updates, this step is applicable for tabs that are already configured. If you don't perform this step, an error screen is displayed for the existing users.

</br>

</details>

<details>

<summary>Can I include a deep link in my `contentUrl`?</summary>

No, deep links aren't supported in `contentUrl`.

</br>

</details>

<details>

<summary>How do I keep a specific thread shown alongside my content?</summary>

Collaborative Stageview from a deep link or a stageView API comes with the additional `threadId` parameter. You can explicitly define the chat thread to be displayed in the side panel for your specific `contentUrl`. For more information about retrieving a `threadId`, see [get conversation thread](/graph/api/group-get-thread).

</br>

</details>

## See also

[Create deep links](../concepts/build-and-test/deep-links.md)
