---
title: Teams tab Stageview
author: Rajeshwari-v
description: Learn about the Stageview options, a full screen UI component invoked to surface your app content. Link unfurling is used to turn URLs into a tab using Adaptive Cards.
ms.topic: conceptual
ms.author: surbhigupta
ms.localizationpriority: high
ms.date: 06/05/2023
---

# Teams tab Stageview

Microsoft Teams provides various methods to open your app content in immersive canvas experiences. These canvases allow users to multitask inside Teams, collaborate with others directly in a Teams multi-window, or focus on tasks in expansive modal experiences.

> [!NOTE]
> This article is based on Teams JavaScript client library (TeamsJS) version 2.0.x. If you're using an earlier version, see [TeamsJS](how-to/using-teams-client-library.md) for guidance between the latest and earlier versions.

## Types of Stageview

 Stageview provides three different ways to open your app content, based on the UI and functionality:

* Collaborative Stageview
* Stageview Multi-window
* Stageview modal

### Collaborative Stageview

Collaborative Stageview enables multitasking scenarios where users can open and view your app content in a new Teams window accompanied by a side-panel conversation. This allows for meaningful content engagement and collaboration from within the same window that leads to higher user engagement for your app. We recommend to use Collaborative Stageview when the user opens content from a conversation that is chat, channel, or channel tab.

:::image type="content" source="~/assets/images/tab-images/collab-view.png" alt-text="The illustration shows the Collaborative Stageview.":::

### Stageview Multi-window

Stageview Multi-window is useful for scenarios where a user requires to multitask in Teams without the need for collaboration. The view opens the app content in a new window without a side-panel conversation, allowing the user to focus on a single task. When the user opens content from a non-conversational surface for example, a personal app, we recommend Stageview Multi-Window.

:::image type="content" source="~/assets/images/tab-images/multi-view.png" alt-text="The illustration shows the Stageview Multi-window.":::

### Stageview modal

Stageview modal is a full-screen UI component that can be used to render your app content inside the main Teams window. This provides users with a focused experience to engage with the app content. Stageview Modal is useful for displaying rich content that doesn't require a user to multitask. It’s the default mode when Collaborative Stageview and Stageview Multi-window isn't supported.

> [!NOTE]
> Teams web client supports only the Stageview modal.

:::image type="content" source="~/assets/images/tab-images/modal-view1.png" alt-text="The illustration shows the Stageview modal.":::

## Invoke Stageview

You can invoke Stageview experience through one of the following ways:

* [Invoke from Adaptive Card](#invoke-collaborative-stageview-from-adaptive-card)
* [Invoke from StageView API](#invoke-from-stageview-api)
* [Invoke from deep link](#invoke-from-deep-link)

The following table provides details on the default and defined responses for each invoke type:

| Invoke from | Default response | Defined response |
| ---| ---| --- |
| Adaptive Card | Opens in Collaborative Stageview | Opens in Stageview modal, if Collaborative Stageview or Stageview Multi-window isn't supported. |
| StageView API | Opens in Collaborative Stageview | Define `openMode` to open in Stageview Multi-window or Stageview modal. |
| Deep link| Opens in Collaborative Stageview | Define `openMode` to open in Stageview Multi-window or Stageview modal. |

`openMode` property defined in a StageView API or deep link determines the type of Stageview response. The three `openMode`properties are:

* `popoutWithChat`
* `popout`
* `modal`

The following table provides the responses of the `openMode`properties:

| Input | Response |
| ---| ---|
| openMode not defined | Opens by default in Collaborative Stageview with an associated side panel conversation. |
| openMode defined as `popoutWithChat` | Opens in Collaborative Stageview. |
| openMode defined as `popout`| Opens in Stageview Multi-window. |
| openMode defined as `modal` | Opens in Stageview modal. |

### Invoke Collaborative Stageview from Adaptive Card

Collaborative Stageview from an adaptive card allows users to engage with your content while continuing the conversation flow. When a user enters a URL for app content in a chat, the bot is invoked and returns an Adaptive Card with an option to open the URL. If invoked through Adaptive Card from a web client, it opens as a Stageview modal.

Perform the following steps to invoke Collaborative Stageview:

1. When the user shares a URL in a Teams chat, the bot receives a `composeExtensions/queryLink` invoke request. The bot returns an Adaptive Card with the type `tab/tabInfoAction`.

1. After the user selects the action button on the Adaptive Card, Collaborative Stageview opens based on the content in the Adaptive Card.

:::image type="content" source="../assets/images/tab-images/collab-view.gif" alt-text="The graphical representation shows how Collaborative Stageview response from Adaptive Card.":::

The following code sample is an example to create a Collaborative Stageview button in an Adaptive Card:

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
* To maintain consistency, it's recommended to name `Action.Submit` as `Open`.
* If you don't have an optimized mobile experience for Teams mobile client, the Stageview for apps distributed through the Microsoft Teams Store opens in a default web browser. The browser opens the URL specified in the `websiteUrl` parameter of the `TabInfo` object.

### Invoke from StageView API

The StageView API from the Teams JS Client SDK allows you to open in any one of the Stageview experience based on the `openMode` defined. `openMode` is the main property in StageView API that determines the type of Stageview response.

> [!NOTE]
>
> * The Stageview API supports an optional threadId parameter that allows you to bring a specific conversation into the Collaborative Stageview sidepanel. Mapping contentUrl to threadId allows you to persist a conversation alongside content.
> * In scenarios were pop-outs aren't supported (for example, Teams in browser), the experience falls back to Stageview modal.
> * The fallback hierarchy is `popoutWithChat` -> `popout` -> `modal`.

For more information, see [stageView module](/javascript/api/@microsoft/teams-js/stageview).

# [No openMode](#tab/noopenmode)

[StageViewParams](/javascript/api/@microsoft/teams-js/stageview.stageviewparams) with no value passed, `openMode` defaults to `popoutWithChat` (Collaborative Stageview).

The side panel conversation is the same thread from where the Collaborative Stageview was invoked (for example, chat or group chat). Optionally, you can specify a threadId that allows you to define the conversation that's brought into the side panel.

  ```json
    {
      "appId": "2c19df50-1c3c-11ea-9327-cd28e4b6f7ba",
      "contentUrl": "https://teams-test-tab.azurewebsites.net",
      "title": "Test tab ordering",
      "websiteUrl": "https://teams-test-tab.azurewebsites.net"
    }
  ```

# [popoutWithChat](#tab/withchat)

StageViewParams for Collaborative Stageview:

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

StageViewParams for Stageview Multi-window:

  ```json
    {
      "appId": "2c19df50-1c3c-11ea-9327-cd28e4b6f7ba",
      "contentUrl": "https://teams-test-tab.azurewebsites.net",
      "title": "Test tab ordering",
      "websiteUrl": "https://teams-test-tab.azurewebsites.net",
      "openMode": "popout"
    }
  ```

# [Modal](#tab/modal)

StageViewParams for Stageview modal:

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

#### StageView API parameters

| Property name | Type | Character Limit | Description |
| --- | --- | --- | --- |
| entityId | String | 64 | [Required] This property is a unique identifier for the entity that the tab displays. |
| name | String | 128 | [Optional] This property is the display name of the tab in the channel interface. If no value is provided, the app name is shown. |
| contentUrl | String | 2048 | [Required] This property is the https:// URL that points to the entity UI to be displayed in the Microsoft Teams canvas. |
| websiteUrl | String | 2048 | [Required] This property is the https:// URL to point at, if a user selects to view in a browser. |
| threadId | String | 2048 | [Optional] This property defines the conversation shown in the Collaborative Stageview side panel. It can contain a chat threadId (channel threadId isn't supported). If no value passed, threadId is inherited from the context where Collaborative Stageview is opened. |
| openMode | String | 2048 | [Optional] This property defines the open behavior for stage content in the Desktop client. |

> [!NOTE]
>
> * The optional threadId parameter only supports chat threads. If a channel threadId is used, the side panel isn't displayed.
> * When you launch Stageview from a certain context, ensure that your app works in that context. For example, if the Stageview is launched from a personal app, you must ensure your app has a personal scope.

### Invoke from deep link

The default behavior of Stageview deep link is to open in Collaborative Stageview with an associated side panel conversation. To invoke the deep link from your tab or personal app, you must wrap the deep link URL in the [app.openLink(url) API](/javascript/api/%40microsoft/teams-js/app#@microsoft-teams-js-app-openlink). The `openMode` parameters defined in the API determine the way the chat content opens.

Unless a threadId is specified, the side panel conversation brings the groupchat or channel thread from which the deep link is invoked.

#### Syntax

The following is the deep link syntax for Collaborative Stageview:

`https://teams.microsoft.com/l/stage/{appId}/0?context={"contentUrl":"contentUrl","websiteUrl":"websiteUrl","name":"Contoso","openMode":"popOutWithChat"}`

##### Examples

Following is the deep link examples to invoke Stageview:

<br>

<details>
<summary><b>Example </b></summary>

Encoded URL:

`https://teams.microsoft.com/l/stage/2c19df50-1c3c-11ea-9327-cd28e4b6f7ba/0?context=%7B%22contentUrl%22%3A%22https%3A%2F%2Fteams-test-tab.azurewebsites.net%22%2C%22websiteUrl%22%3A%22https%3A%2F%2Fteams-test-tab.azurewebsites.net%22%7D`

</details>

> [!NOTE]
>
> * Deep link without any `openMode` specified defaults to Collaborative Stageview.
> * All deep links must be encoded before pasting the URL. Unencoded URLs aren't supported.

#### Query parameters

| Property name | Type | Character Limit | Description |
| --- | --- | --- | --- |
| entityId | String | 64 | This property is a unique identifier for the entity that the tab displays and it's a required field. |
| name | String | 128 | This property is the display name of the tab in the channel interface and it's an optional field. If no value is provided, the app name is shown. |
| contentUrl | String | 2048 | This property is the https:// URL that points to the entity UI to be displayed in the Microsoft Teams canvas and it's a required field. |
| websiteUrl | String | 2048 | This property is the https:// URL to point at, if a user selects to view in a browser and it's a required field. |
| threadId | String | 2048 | [Optional] This property defines the conversation shown in the Collaborative Stageview side panel. It can contain a chat threadId (channel threadId isn't supported). If no value passed, threadId is inherited from the context where Collaborative Stageview is opened. |
| openMode | String | 2048 | [Optional] This property defines the open behavior for stage content in the Desktop client. |

Whether you want to facilitate multitasking, enhance collaboration, or provide a focused user experience, the Stageview has a mode to suit your needs. Remember to consider the context in which your app is being used and ensure that your app works in that context.

## FAQs

</br>

<details>

<summary>Which Stageview should I use?</summary>

Collaborative Stageview allows the users to open content and a conversation within the same Teams multi-window. We recommend this for most collaboration scenarios.

</br>

</details>

<details>

<summary>What's the difference between Stageview modal and Dialogs?</summary>

Stageview modal is useful to display rich content to the users, such as a page, a dashboard, or a file. Dialogs are useful for displaying messages that need users' attention or to collect information required to move to the next step.

</br>

</details>

<details>

<summary>I'm able to open Collaborative Stageview, but content is loading into the main canvas.</summary>
Ensure that your contentUrl domain is accurately reflected in the manifest `validDomains` property. For more information, see [App manifest schema](../resources/schema/manifest-schema.md).

</br>

</details>

<details>

<summary>My contentUrl matches my `validDomains`, but I'm still unable to view any content showing up.</summary>

Call app.notifySuccess() in all iframe-based contents to notify Teams that your app has successfully loaded. If applicable, Teams hides the loading indicator. If `notifySuccess` isn't called within 30 seconds, Teams assumes that your app has timed out, and displays an error screen with a retry option. For app updates, this step is applicable for already configured tabs. If you don't perform this step, an error screen is displayed for the existing users. [*Mandatory*]

</details>

## Next step

> [!div class="nextstepaction"]
> [Create conversational tabs](~/tabs/how-to/conversational-tabs.md)

## See also

* [Build tabs for Teams](what-are-tabs.md)
* [Add link unfurling](../messaging-extensions/how-to/link-unfurling.md)
* [Build tabs with Adaptive Cards](how-to/build-adaptive-card-tabs.md)
* [Create deep links](../concepts/build-and-test/deep-links.md)
* [Cards](../task-modules-and-cards/what-are-cards.md)
* [App manifest schema for Teams](../resources/schema/manifest-schema.md)
