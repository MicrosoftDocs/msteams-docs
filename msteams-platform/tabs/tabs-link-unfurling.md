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

Stage View in Microsoft Teams is an immersive canvas experience and provides different ways to open the app content. It improves user experience and designed to:

* Facilitate multitasking within Teams
* Collaborate directly in a Teams multi-window
* Focus on specific tasks in an immersive Teams Stage View

Stage View enhances productivity and collaboration by offering developers the flexibility to create more engaging applications and streamline workflows.

> [!NOTE]
> This article is based on  Microsoft Teams JavaScript client library version 2.0.x. If you're using an earlier version and for guidance between the latest and earlier versions, see [TeamsJS](how-to/using-teams-client-library.md) .

## Types of Stage View

Based on the UI and functionality, Stage View provides three different ways to open your app content:

* Collaborative Stage View
* Multi-window Stage View
* Stage View Modal

### Collaborative Stage View

Collaborative Stage View enables multitasking scenarios for your app content in Teams. Users can open and view your app content in a new Teams window, with a side panel conversation. It allows meaningful content engagement and collaboration within the same window. We recommend Collaborative Stage View when user opens content from chat, channel, or channel tab.

:::image type="content" source="~/assets/images/tab-images/collab-stage-view.png" alt-text="The illustration shows the collaborative stageview.":::

### Multi-window Stage View

Multi-window Stage View is useful for scenarios that require a user to multitask in Teams without the need for collaboration. The view opens your content in a new window without a side-panel conversation, allowing your user to focus on the singular task at hand through your app. We recommend Multi-window Stage View when user isn't opening content from personal app.

:::image type="content" source="~/assets/images/tab-images/multi-window.png" alt-text="The illustration shows the multi-window stage view.":::

### Stage View modal

Stage View modal is a full-screen UI component that can be used to render your app content inside the main Teams window, providing users with a focused experience to engage with your app. It's the default mode when the Collaborative and Multi-window isn't supported.

> [!NOTE]
> Teams web client only supports Stage View modal and doesn't support Collaborative Stage view and Teams Multi-window experience.

:::image type="content" source="~/assets/images/tab-images/modal-view.png" alt-text="The illustration shows the stage view modal.":::

## Ways to invoke Stage View

There are three ways by which you can invoke Stage View experience:

* Invoke Collaborative Stageview from Adaptive Card
* Invoke from StageView API
* Invoke from Deeplink

The following table provides the open behavior of Stage Views:

| Invoke | Default response | Other response |
| ---| ---| --- |
| Adaptive Card | Opens in Collaborative Stageview | Opens in Stage View modal, if Collaborative Stage View or Teams Multi-window isn't supported. |
| StageView API | Opens in Collaborative Stageview | Define `openMode` to open in Teams Multi-window or Stage View modal |
| Deeplink| Opens in Collaborative Stageview | Define `openMode` to open in Teams Multi-window or Stage View modal |

### Invoke Collaborative Stageview from Adaptive Card

Collaborative Stageview from an adaptive card allows users to engage with your content while continuing the conversation flow. When a user enters a URL for app content in a chat, the bot is invoked and returns an Adaptive Card with an option to open the URL.

Perform the following steps to invoke Collaborative Stage View:

1. When the user shares a URL in a Teams chat, the bot receives a `composeExtensions/queryLink` invoke request. The bot returns an Adaptive Card with the type tab/tabInfoAction.

1. After the user selects the action button on the Adaptive Card, Collaborative Stage View opens based on the content in the Adaptive Card.

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

* If Collaborative Stageview is invoked via Adaptive Card JSON from the web client, a Stageview Modal is opened instead, as multi-window Microsoft Teams experiences aren't yet supported in the browser.
* Ensure that the content URL is within the list of `validDomains` in your app manifest.
* The invoke request type must be a `composeExtensions/queryLink`.
* The `invoke` workflow is similar to the `appLinking` workflow.
* To maintain consistency, it's recommended to name `Action.Submit` as `Open`.
* If you don't have an optimized mobile experience for Microsoft Teams mobile client, the Stage View for apps distributed through the Microsoft Teams Store opens in a default web browser. The browser opens the URL specified in the `websiteUrl` parameter of the `TabInfo` object.

### Invoke from StageView API

The StageView API from the Microsoft Teams JS Client SDK allows you to open in any one of the Stage View experience based on the `openMode` defined. The three `openModes`parameters in StageView API are:

* `modal`
* `popout`
* `popoutWithChat`

The following table provides the response of the `openModes`parameters:

| Input | Result |
| ---| ---|
| openMode not defined | Opens by default in Collaborative Stageview with an associated side panel conversation |
| openMode defined as `popoutWithChat` | Opens in Collaborative Stageview |
| openMode defined as `popout`| Opens in Multi-window  Stageview|
| openMode defined as `modal` | Opens in StageView modal |

> [!NOTE]
> In scenarios were pop-outs aren't supported (e.g., Microsoft Teams in browser), the experience falls back to modal. The fallback hierarchy is `popoutWithChat` -> `popout` -> `modal`.

For more information, see [StageView module](/javascript/api/@microsoft/teams-js/stageview).

#### StageView API parameters

| Property name | Type | Character Limit | Description |
| --- | --- | --- | --- |
| entityId | String | 64 | [Required] This property is a unique identifier for the entity that the tab displays. |
| name | String | 128 | [Optional] This property is the display name of the tab in the channel interface. If no value is provided, the app name is shown. |
| contentUrl | String | 2048 | [Required] This property is the https:// URL that points to the entity UI to be displayed in the Microsoft Teams canvas. |
| websiteUrl | String | 2048 | [Required] This property is the https:// URL to point at, if a user selects to view in a browser. |
| threadId | String | 2048 | [Optional] This property defines the conversation shown in the Collaborative Stageview side panel. It can contain a chat threadId (channel threadId isn't supported). If no value passed, threadId is inherited from the context where Collaborative Stageview is opened. |
| openMode | String | 2048 | [Optional] This property defines the open behavior for stage content in the Desktop client. |

* StageViewParams with no open mode (defaults to Collaborative Stageview):

    If no value is passed, openMode defaults to `popoutWithChat` (Collaborative Stageview). The side panel conversation is the same thread from where the Collaborative Stageview was invoked (for example, chat, group chat). A threadId can also be specified (optional), allowing you to define the conversation that's brought into the side panel.

    ```json
    {
      "appId": "2c19df50-1c3c-11ea-9327-cd28e4b6f7ba",
      "contentUrl": "https://teams-test-tab.azurewebsites.net",
      "title": "Test tab ordering",
      "websiteUrl": "https://teams-test-tab.azurewebsites.net"
    }
    ```

* StageViewParams for Collaborative Stageview:

    ```json
    {
      "appId": "2c19df50-1c3c-11ea-9327-cd28e4b6f7ba",
      "contentUrl": "https://teams-test-tab.azurewebsites.net",
      "title": "Test tab ordering",
      "websiteUrl": "https://teams-test-tab.azurewebsites.net",
      "openMode": "popoutWithChat"
    }
    ```

* StageViewParams for Multi-Window Stageview:

    ```json
    {
      "appId": "2c19df50-1c3c-11ea-9327-cd28e4b6f7ba",
      "contentUrl": "https://teams-test-tab.azurewebsites.net",
      "title": "Test tab ordering",
      "websiteUrl": "https://teams-test-tab.azurewebsites.net",
      "openMode": "popout"
    }
    ```

* StageViewParams for Stageview modal:

    ```json
    {
      "appId": "2c19df50-1c3c-11ea-9327-cd28e4b6f7ba",
      "contentUrl": "https://teams-test-tab.azurewebsites.net",
      "title": "Test tab ordering",
      "websiteUrl": "https://teams-test-tab.azurewebsites.net",
      "openMode": "modal"
    }
    ```

> [!NOTE]
>
> * The optional threadId parameter only supports chat threads. In a scenario where a channel threadId is used, the side panel UI isn't shown.
> * When you launch Stageview from a certain context, ensure that your app works in that context. For example, if the Stageview is launched from a personal app, you must ensure your app has a personal scope.

### Invoke from Deeplink

The default behavior of Stage View deeplinks is to open in Collaborative Stageview with an associated side panel conversation. To invoke the deeplink from your tab or personal app, you must wrap the deep link URL in the app.openLink(url) API. The `openMode` parameters defined in the API determines the way the chat content opens.

* `modal`
* `popout`
* `popoutWithChat`

The following table provides the response of the `openModes`parameters:

| Input | Result |
| ---| ---|
| openMode not defined | Opens by default in Collaborative Stageview with an associated side panel conversation |
| openMode defined as `popoutWithChat` | Opens in Collaborative Stageview |
| openMode defined as `popout`| Opens in Multi-window  Stageview|
| openMode defined as `modal` | Opens in StageView modal |

> [!NOTE]
> In scenarios were pop-outs aren't supported (e.g., Microsoft Teams in browser), the experience falls back to modal. The fallback hierarchy is `popoutWithChat` -> `popout` -> `modal`.

Unless a threadId is specified, the side panel conversation brings the groupchat/channel thread from which the deeplink is invoked.

#### Syntax

The following is the deep link syntax for Collaborative Stage View:

`https://teams.microsoft.com/l/stage/{appId}/0?context={"contentUrl":"contentUrl","websiteUrl":"websiteUrl","name":"Contoso","openMode":"popOutWithChat"}`

Deep link without any openMode specified defaults to Collaborative Stageview.

> [!NOTE]
> All deep links must be encoded before pasting the URL. Unencoded URLs aren't supported.

`https://teams.microsoft.com/l/stage/2c19df50-1c3c-11ea-9327-cd28e4b6f7ba/0?context=%7B%22contentUrl%22%3A%22https%3A%2F%2Fteams-test-tab.azurewebsites.net%22%2C%22websiteUrl%22%3A%22https%3A%2F%2Fteams-test-tab.azurewebsites.net%22%7D`

#### Query parameters

| Property name | Type | Character Limit | Description |
| --- | --- | --- | --- |
| entityId | String | 64 | This property is a unique identifier for the entity that the tab displays and it's a required field. |
| name | String | 128 | This property is the display name of the tab in the channel interface and it's an optional field. If no value is provided, the app name is shown. |
| contentUrl | String | 2048 | This property is the https:// URL that points to the entity UI to be displayed in the Microsoft Teams canvas and it's a required field. |
| websiteUrl | String | 2048 | This property is the https:// URL to point at, if a user selects to view in a browser and it's a required field. |
| threadId | String | 2048 | [Optional] This property defines the conversation shown in the Collaborative Stageview side panel. It can contain a chat threadId (channel threadId isn't supported). If no value passed, threadId is inherited from the context where Collaborative Stageview is opened. |
| openMode | String | 2048 | [Optional] This property defines the open behavior for stage content in the Desktop client. |

> [!NOTE]
>
> * The optional threadId parameter only supports chat threads. In the scenario that a channel threadId is used, the side panel UI will not be shown.
> * All deep links must be encoded before pasting the URL. Unencoded URLs are not supported.
> * When you launch a Stageview from a certain context, ensure that your app works in that context. For example, if the Stageview is launched from a personal app, you must ensure your app has a personal scope.

Whether you want to facilitate multitasking, enhance collaboration, or provide a focused user experience, the Stageview Multi-window has a mode to suit your needs. Remember to consider the context in which your app is being used and ensure that your app works in that context.

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
