---
title: Open Content in Stageview
author: Rajeshwari-v
description: Learn about the types of Stageview, a full screen UI component invoked to surface your app content. Open content in multiwindow experiences using deep links, Adaptive Cards, or Teams JavaScript client library (TeamsJS) SDK.
ms.topic: conceptual
ms.author: surbhigupta
ms.localizationpriority: high
ms.date: 06/05/2023
---

# Open Content in Stageview

Microsoft Teams provides multiple methods to open your app content in immersive canvas experiences. These Stageview canvases allow the users to adopt mulitasking workflows inside Teams, collaborate with others directly in a Teams multiwindow, or complete focused work in large modal experience.

## Types of Stageview

 Based on the UI and functionality, Stageview provides three ways to open your app content:

* [Collaborative Stageview](#collaborative-stageview)
* [Stageview Multi-window](#stageview-multi-window)
* [Stageview Modal](#stageview-modal)

### Collaborative Stageview

Collaborative Stageview enables multitasking scenarios for your app content in Teams. Users can open and view your app content inside a new Teams window while accompanied by a side panel conversation. This view enables meaningful content engagement and collaboration from within the same window. We recommend Collaborative Stageview when the user opens content from a conversation such as a chat, a channel, or a channel tab.

:::image type="content" source="~/assets/images/tab-images/collab-view.png" alt-text="The illustration shows the Collaborative Stageview in Teams.":::

### Stageview Multi-window

Stageview Multi-window is useful for scenarios that requires a user to multitask in Teams without the need for collaboration. This view opens the app content in a new Teams window without a side panel conversation, that allows users to focus on their task. We recommend Stageview Multi-window in scenarios where the user opens content from a nonconversational surface such as a personal app.

:::image type="content" source="~/assets/images/tab-images/multi-view.png" alt-text="The illustration shows the Stageview Multi-window in Teams.":::

### Stageview Modal

Stageview Modal is a full-screen UI component used to render your app content inside the Teams main window. This view provides users with a focused experience to engage with the app content. Stageview Modal is useful for displaying rich content that doesn't require a user to multitask. It’s the default view when Collaborative Stageview and Stageview Multi-window aren't supported

> [!NOTE]
> Teams web client supports only Stageview Modal.

:::image type="content" source="~/assets/images/tab-images/modal-view1.png" alt-text="The illustration shows the Stageview Modal in Teams."

## Invoke Stageview

You can invoke Stageview in Teams through one of the following methods and also configure the expected Stageview response:

* [Invoke from Adaptive Card](#invoke-collaborative-stageview-from-adaptive-card)
* [Invoke from stageView API](#invoke-from-stageview-api)
* [Invoke from deep link](#invoke-from-deep-link)

The following table provides the default and defined response behavior for each Stageview invoke type:

| Invoke type | Default response | Defined response |
| ---| ---| --- |
| Adaptive Card | Opens in Collaborative Stageview | Opens in Stageview Modal, if Collaborative Stageview or Stageview Multi-window isn't supported. |
| stageView API | Opens in Collaborative Stageview | Opens in the respective Stageview based on the `openMode` defined. |
| Deep link| Opens in Collaborative Stageview | Opens in the respective Stageview based on the `openMode` defined. |

`openMode` is a property in [StageViewParams interface](/javascript/api/@microsoft/teams-js/stageview.stageviewparams). The `openMode` property can be defined in a [stageView API](#invoke-from-stageview-api) or a [deep link](#invoke-from-deep-link) to determine the type of Stageview response. The three `openMode` properties are:

* `popoutWithChat`
* `popout`
* `modal`

The following table provides the Stageview responses of the `openMode` property:

| Input | Response |
| ---| ---|
| `openMode` not defined | Opens by default in Collaborative Stageview with an associated side panel conversation. |
| `openMode` defined as `popoutWithChat` | Opens in Collaborative Stageview with an associated side panel conversation. |
| `openMode` defined as `popout`| Opens in Stageview Multi-window without a side panel conversation. |
| `openMode` defined as `modal` | Opens in Stageview Modal. |

> [!NOTE]
>
> * In scenarios were pop-out experience isn't supported, for example, Teams web client, the open mode is a Stageview Modal even if the `openMode` property is defined.
> * The fallback hierarchy is `popoutWithChat` > `popout` > `modal`.

### Invoke Collaborative Stageview from Adaptive Card

Collaborative Stageview from an Adaptive Card allows users to engage with your content while continuing the conversation flow. When a user enters a URL for an app content in a chat, the bot is invoked and returns an Adaptive Card with an option to open the URL. If the URL is opened from an Adaptive Card in Teams web client, it opens in a Stageview Modal.

To invoke Collaborative Stageview, perform the following steps:

1. When the user shares a URL in a Teams chat, the bot receives a `composeExtensions/queryLink` invoke request. The bot returns an Adaptive Card with the type `tab/tabInfoAction`.

1. After the user selects the action button on the Adaptive Card, Collaborative Stageview opens based on the content in the Adaptive Card.

:::image type="content" source="../assets/images/tab-images/collab-view.gif" alt-text="The graphical representation shows how Collaborative Stageview response from Adaptive Card.":::

The following code is an example to create a Collaborative Stageview button in an Adaptive Card

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

#### Best practices

* Ensure that the content URL is within the list of `validDomains` in your app manifest.
* The invoke request type must be a `composeExtensions/queryLink`.
* The `invoke` workflow is similar to the `appLinking` workflow.
* To maintain consistency, we recommended naming `Action.Submit` as `Open`.
* If you don't have an optimized mobile experience for Teams mobile client, Stageview for apps distributed through the [Microsoft Teams Store](../concepts/deploy-and-publish/apps-publish-overview.md) opens in a default web browser. The browser opens the URL specified in the `websiteUrl` parameter of the `TabInfo` object.

### Invoke from stageView API

The stageView API from the Teams JavaScript client library (TeamsJS) SDK allows you to open the Teams window in a Stageview experience based on the `openMode` defined. If the `openMode` property isn't defined, the default response is a Collaborative Stageview with an associated side panel conversation. The side panel conversation is the same thread from where the Collaborative Stageview was invoked, that is, a chat or a group chat.

> [!NOTE]
> The stageView API supports an optional `threadId` parameter that allows you to bring a specific conversation into the Collaborative Stageview side panel. Mapping `contentUrl` to `threadId` allows you to persist a conversation alongside content.

The following code snippets provide the samples of the `openMode` property:

# [No openMode](#tab/noopenmode)

When `openMode` isn't defined in [StageViewParams](/javascript/api/@microsoft/teams-js/stageview.stageviewparams), the default response is Collaborative Stageview.

  ```json
    {
      "appId": "2c19df50-1c3c-11ea-9327-cd28e4b6f7ba",
      "contentUrl": "https://teams-test-tab.azurewebsites.net",
      "title": "Test tab ordering",
      "websiteUrl": "https://teams-test-tab.azurewebsites.net"
    }
  ```

# [popoutWithChat](#tab/withchat)

The `openMode` property defined as `popoutWithChat` in [StageViewParams](/javascript/api/@microsoft/teams-js/stageview.stageviewparams) to open in Collaborative Stageview.

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

The `openMode` property defined as `popout` in [StageViewParams](/javascript/api/@microsoft/teams-js/stageview.stageviewparams) to open in Stageview Multi-window.

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

The `openMode` property defined as `modal` in [StageViewParams](/javascript/api/@microsoft/teams-js/stageview.stageviewparams) to open in Stageview Modal.

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

For more information, see [stageView module](/javascript/api/@microsoft/teams-js/stageview).

#### stageView API parameters

| Property name | Type | Character limit | Required | Description |
| --- | --- | --- | --- | --- |
| entityId | String | 64 | Yes | A unique identifier for the entity that the tab displays. |
| name | String | 128 | Optional | The display name of the tab in the channel interface. If no value is provided, the app name is displayed. |
| contentUrl | String | 2048 | Yes | The https:// URL that points to the entity UI to be displayed in Teams. |
| websiteUrl | String | 2048 | Yes | The https:// URL to point at, if a user selects to view in a browser. |
| threadId | String | 2048 | Optional | The ID defines the conversation shown in the Collaborative Stageview side panel. It can contain a chat `threadId` (channel `threadId` isn't supported). If no is value passed, `threadId` is inherited from the context where Collaborative Stageview is opened. |
| openMode | String | 2048 | Optional | The property defines the open behavior for stage content in the desktop client. |

> [!NOTE]
>
> * The optional `threadId` parameter only supports chat threads. If a channel `threadId` is used, the side panel isn't displayed.
> * When you launch Stageview from a certain context, ensure that your app works in that context. For example, if the Stageview is launched from a personal app, you must ensure that your app has a personal scope.

### Invoke from deep link

Stageview response from a deep link defaults to Collaborative Stageview with an associated side panel conversation when the `openMode` property isn't specified. To invoke Stageview through deep link from your tab or personal app, wrap the deep link URL in the [app.openLink(url) API](/javascript/api/%40microsoft/teams-js/app#@microsoft-teams-js-app-openlink) and define the `openMode` property. The `openMode` property defined in the API determines how the chat content opens.

Unless a `threadId` is specified, the side panel conversation brings the group chat or channel thread from which the deep link is invoked.

> [!NOTE]
> All deep links must be encoded before pasting the URL. Unencoded URLs aren't supported.

#### Syntax

The following link is the deep link syntax for Collaborative Stageview:

`https://teams.microsoft.com/l/stage/{appId}/0?context={"contentUrl":"contentUrl","websiteUrl":"websiteUrl","name":"Contoso","openMode":"popoutWithChat"}`

##### Example

The following link is the encoded deep link URL to invoke Stageview:

<br>

<details>
<summary><b>Example</b></summary>

Encoded URL:

`https://teams.microsoft.com/l/stage/{appId}/0?context=%7B%22contentUrl%22%3A%22contentUrl%22%2C%22websiteUrl%22%3A%22websiteUrl%22%2C%22name%22%3A%22Contoso%22%2C%22openMode%22%3A%22popoutWithChat%22%7D`

</details>

#### Query parameters

| Property name | Type | Character limit | Required | Description |
| --- | --- | --- | --- | --- |
| entityId | String | 64 | Yes | The unique identifier for the entity that the tab displays. |
| name | String | 128 | Optional | The display name of the tab in the channel interface. If no value is provided, the app name is displayed. |
| contentUrl | String | 2048 | Yes | The https:// URL that points to the entity UI to be displayed in Teams. |
| websiteUrl | String | 2048 | Yes | The https:// URL to point at, if a user selects to view in a browser. |
| threadId | String | 2048 | Optional | The ID defines the conversation shown in the Collaborative Stageview side panel. It can contain a chat `threadId` (channel `threadId` isn't supported). If no is value passed, `threadId` is inherited from the context where Collaborative Stageview is opened. |
| openMode | String | 2048 | Optional | The property defines the open behavior for stage content in the desktop client. |

Whether you want to facilitate multitasking, enhance collaboration, or provide a focused user experience, Stageview has a mode to suit your requirements. Remember to consider the context in which your app is being used and ensure that your app works in that context.

> [!NOTE]
> The article is based on TeamsJS version 2.0.x. If you're using an earlier version, see [TeamsJS](how-to/using-teams-client-library.md) for guidance between the latest and earlier versions.

## FAQs

</br>

<details>

<summary>Which Stageview should I use?</summary>

Collaborative Stageview allows the users to open content along with a side panel conversation in a Teams window. We recommend this view for most of the collaboration scenarios.

</br>

</details>

<details>

<summary>What's the difference between Stageview Modal and dialogs?</summary>

Stageview Modal is useful to display rich content to the users, such as a page, a dashboard, or a file. <br> Dialogs are useful to display messages that need users' attention or collect information required to move to the next step.

</br>

</details>

<details>

<summary>The content opens in Collaborative Stageview, but it's loading into the main canvas. How to open in a new Teams window?</summary>

Ensure that your `contentUrl` domain is accurately reflected in the manifest `validDomains` property. For more information, see [app manifest schema](../resources/schema/manifest-schema.md).

</br>

</details>

<details>

<summary>The `contentUrl` matches `validDomains`, but why any content isn't still displayed in a new Teams window?</summary>

Call `app.notifySuccess()` in all iframe-based contents to notify Teams that your app is loaded successfully. If applicable, Teams hides the loading indicator. If `notifySuccess` isn't called within 30 seconds, Teams assumes that the app is timed out, and displays an error screen with a retry option. For app updates, this step is applicable for tabs that are already configured. If you don't perform this step, an error screen is displayed for the existing users.

</br>

</details>

<details>

<summary>Can I include a deep link in my `contentUrl`?</summary>

No, deep links aren't supported in `contentUrl`.

</br>

</details>

<details>

<summary>How do I keep a specific thread shown alongside my content?</summary>

Collaborative Stageview from a deep link or stageView API comes with the additional `threadId` parameter. You can explicitly define the chat thread to be displayed in the side panel for your specific `contentUrl`. For more information about retrieving a `threadId`, see [get conversation thread](/graph/api/group-get-thread).

</br>

</details>

## Next step

> [!div class="nextstepaction"]
> [Create conversational tabs](~/tabs/how-to/conversational-tabs.md)

## See also

* [Build tabs for Teams](what-are-tabs.md)
* [Add link unfurling](../messaging-extensions/how-to/link-unfurling.md)
* [Build tabs with Adaptive Cards](how-to/build-adaptive-card-tabs.md)
* [Create deep links](../concepts/build-and-test/deep-links.md)
* [App manifest schema for Teams](../resources/schema/manifest-schema.md)
