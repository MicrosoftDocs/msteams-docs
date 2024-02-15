---
title: Teams tab Stage View
author: Rajeshwari-v
description: Learn about the Stage View options, a full screen UI component invoked to surface your app content. Link unfurling is used to turn URLs into a tab using Adaptive Cards.
ms.topic: conceptual
ms.author: surbhigupta
ms.localizationpriority: high
ms.date: 06/05/2023
---

# Teams tab Stage View

Stage View in Microsoft Teams enhances productivity and collaboration by offering you the flexibility to create engaging applications and streamline workflows. Stage View is an immersive canvas experience and provides different ways to open the app content.

Stage View is designed to:

* Facilitate multitasking within Teams
* Collaborate directly in a Teams multi-window
* Focus on specific tasks in an immersive view

> [!NOTE]
> This article is based on Teams JavaScript client library (TeamsJS) version 2.0.x. If you're using an earlier version, see [TeamsJS](how-to/using-teams-client-library.md) for guidance between the latest and earlier versions.

## Types of Stage View

 Stage View provides three different ways to open your app content, based on the UI and functionality:

* Collaborative Stage View
* Multi-window Stage View
* Stage View Modal

### Collaborative Stage View

Collaborative Stage View enables multitasking scenario where users can open and view your app content in a new Teams window, with a side-panel conversation. It allows meaningful content engagement and collaboration within the same window. We recommend to use Collaborative Stage View when the content is opened from chat, channel, or channel tab.

:::image type="content" source="~/assets/images/tab-images/collab-view.png" alt-text="The illustration shows the collaborative stageview.":::

### Multi-window Stage View

Multi-window Stage View is useful for scenarios where a user requires to multitask in Teams without the need for collaboration. The view opens the app content in a new window without a side-panel conversation, allowing the user to focus on a singular task. We recommend Multi-window Stage View when user isn't opening content from personal app.

:::image type="content" source="~/assets/images/tab-images/multi-view.png" alt-text="The illustration shows the multi-window stage view.":::

### Stage View modal

Stage View modal is a full-screen UI component that can be used to render your app content inside the main Teams window as a modal and provide the users with a focused experience. It's the default mode when the Collaborative and Multi-window isn't supported.

> [!NOTE]
> Teams web client only supports Stage View modal.

:::image type="content" source="~/assets/images/tab-images/modal-view1.png" alt-text="The illustration shows the stage view modal.":::

## Invoke Stage View

You can invoke Stage View experience through one of the following ways:

* Invoke from Adaptive Card
* Invoke from StageView API
* Invoke from Deeplink

The following table provides details on the default and defined responses for each invoke type:

| Invoke from | Default response | Defined response |
| ---| ---| --- |
| Adaptive Card | Opens in Collaborative Stage View | Opens in Stage View modal, if Collaborative Stage View or Multi-window Stage View isn't supported. |
| StageView API | Opens in Collaborative Stage View | Define `openMode` to open in Teams Multi-window or Stage View modal. |
| Deeplink| Opens in Collaborative Stage View | Define `openMode` to open in Teams Multi-window or Stage View modal. |

### Invoke Collaborative Stage View from Adaptive Card

Collaborative Stage View from an adaptive card allows users to engage with your content while continuing the conversation flow. When a user enters a URL for app content in a chat, the bot is invoked and returns an Adaptive Card with an option to open the URL.

If Collaborative Stage View is invoked through Adaptive Card from the web client, it opens as a Stage View Modal.

Perform the following steps to invoke Collaborative Stage View:

1. When the user shares a URL in a Teams chat, the bot receives a `composeExtensions/queryLink` invoke request. The bot returns an Adaptive Card with the type `tab/tabInfoAction`.

1. After the user selects the action button on the Adaptive Card, Collaborative Stage View opens based on the content in the Adaptive Card.

:::image type="content" source="../assets/images/tab-images/collab-view.gif" alt-text="The graphical representation shows how Collaborative Stage View response from Adaptive Card.":::

The following code sample is an example to create a Collaborative Stage View button in an Adaptive Card:

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
* If you don't have an optimized mobile experience for Teams mobile client, the Stage View for apps distributed through the Microsoft Teams Store opens in a default web browser. The browser opens the URL specified in the `websiteUrl` parameter of the `TabInfo` object.

### Invoke from StageView API

The StageView API from the Teams JS Client SDK allows you to open in any one of the Stage View experience based on the `openMode` defined. `openMode` is the main property in StageView API that determines the type of Stage View response. The three `openMode`properties are:

* `modal`
* `popout`
* `popoutWithChat`

The following table provides the responses of the `openMode`properties:

| Input | Response |
| ---| ---|
| openMode not defined | Opens by default in Collaborative Stage View with an associated side panel conversation. |
| openMode defined as `popoutWithChat` | Opens in Collaborative Stage View. |
| openMode defined as `popout`| Opens in Multi-window  Stage View. |
| openMode defined as `modal` | Opens in Stage View modal. |

> [!NOTE]
>
> * In scenarios were pop-outs aren't supported (for example, Teams in browser), the experience falls back to Stage View modal.
> * The fallback hierarchy is `popoutWithChat` -> `popout` -> `modal`.

For more information, see [StageView module](/javascript/api/@microsoft/teams-js/stageview).

#### StageView API parameters

| Property name | Type | Character Limit | Description |
| --- | --- | --- | --- |
| entityId | String | 64 | [Required] This property is a unique identifier for the entity that the tab displays. |
| name | String | 128 | [Optional] This property is the display name of the tab in the channel interface. If no value is provided, the app name is shown. |
| contentUrl | String | 2048 | [Required] This property is the https:// URL that points to the entity UI to be displayed in the Microsoft Teams canvas. |
| websiteUrl | String | 2048 | [Required] This property is the https:// URL to point at, if a user selects to view in a browser. |
| threadId | String | 2048 | [Optional] This property defines the conversation shown in the Collaborative Stage View side panel. It can contain a chat threadId (channel threadId isn't supported). If no value passed, threadId is inherited from the context where Collaborative Stage View is opened. |
| openMode | String | 2048 | [Optional] This property defines the open behavior for stage content in the Desktop client. |

# [Open mode undefined](#tab/noopenmode)

* [StageViewParams](/javascript/api/@microsoft/teams-js/stageview.stageviewparams?view=msteams-client-js-latest) with no `openMode` (defaults to Collaborative Stage View):

    If no value is passed, `openMode` defaults to `popoutWithChat` (Collaborative Stage View). The side panel conversation is the same thread from where the Collaborative Stage View was invoked (for example, chat, group chat). A threadId can also be specified (optional), allowing you to define the conversation that's brought into the side panel.

    ```json
    {
      "appId": "2c19df50-1c3c-11ea-9327-cd28e4b6f7ba",
      "contentUrl": "https://teams-test-tab.azurewebsites.net",
      "title": "Test tab ordering",
      "websiteUrl": "https://teams-test-tab.azurewebsites.net"
    }
    ```

# [popoutWithChat](#tab/withchat)

* StageViewParams for Collaborative Stage View:

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

* StageViewParams for Multi-window Stage View:

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

* StageViewParams for Stage View modal:

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

> [!NOTE]
>
> * The optional threadId parameter only supports chat threads. If a channel threadId is used, the side panel isn't displayed.
> * When you launch Stage View from a certain context, ensure that your app works in that context. For example, if the Stage View is launched from a personal app, you must ensure your app has a personal scope.

### Invoke from Deeplink

The default behavior of Stage View deeplink is to open in Collaborative Stage View with an associated side panel conversation. To invoke the deeplink from your tab or personal app, you must wrap the deeplink URL in the app.openLink(url) API.

The `openMode` parameters defined in the API determine the way the chat content opens. The three `openMode`properties are:

* `modal`
* `popout`
* `popoutWithChat`

The following table provides the responses of the `openMode`properties:

| Input | Response |
| ---| ---|
| openMode not defined | Opens by default in Collaborative Stage View with an associated side panel conversation. |
| openMode defined as `popoutWithChat` | Opens in Collaborative Stage View. |
| openMode defined as `popout`| Opens in Multi-window  Stage View. |
| openMode defined as `modal` | Opens in Stage View modal. |

Unless a threadId is specified, the side panel conversation brings the groupchat/channel thread from which the deeplink is invoked.

#### Syntax

The following is the deeplink syntax for Collaborative Stage View:

`https://teams.microsoft.com/l/stage/{appId}/0?context={"contentUrl":"contentUrl","websiteUrl":"websiteUrl","name":"Contoso","openMode":"popOutWithChat"}`

> [!NOTE]
>
> * Deeplink without any `openMode` specified defaults to Collaborative Stage View.
> * All deeplinks must be encoded before pasting the URL. Unencoded URLs aren't supported.

`https://teams.microsoft.com/l/stage/2c19df50-1c3c-11ea-9327-cd28e4b6f7ba/0?context=%7B%22contentUrl%22%3A%22https%3A%2F%2Fteams-test-tab.azurewebsites.net%22%2C%22websiteUrl%22%3A%22https%3A%2F%2Fteams-test-tab.azurewebsites.net%22%7D`

#### Query parameters

| Property name | Type | Character Limit | Description |
| --- | --- | --- | --- |
| entityId | String | 64 | This property is a unique identifier for the entity that the tab displays and it's a required field. |
| name | String | 128 | This property is the display name of the tab in the channel interface and it's an optional field. If no value is provided, the app name is shown. |
| contentUrl | String | 2048 | This property is the https:// URL that points to the entity UI to be displayed in the Microsoft Teams canvas and it's a required field. |
| websiteUrl | String | 2048 | This property is the https:// URL to point at, if a user selects to view in a browser and it's a required field. |
| threadId | String | 2048 | [Optional] This property defines the conversation shown in the Collaborative Stage View side panel. It can contain a chat threadId (channel threadId isn't supported). If no value passed, threadId is inherited from the context where Collaborative Stage View is opened. |
| openMode | String | 2048 | [Optional] This property defines the open behavior for stage content in the Desktop client. |

> [!NOTE]
>
> * The optional threadId parameter only supports chat threads. If a channel threadId is used, the side panel isn't displayed.
> * When you launch Stage View from a certain context, ensure that your app works in that context. For example, if the Stage View is launched from a personal app, you must ensure your app has a personal scope.

Whether you want to facilitate multitasking, enhance collaboration, or provide a focused user experience, the Stage View has a mode to suit your needs. Remember to consider the context in which your app is being used and ensure that your app works in that context.

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
