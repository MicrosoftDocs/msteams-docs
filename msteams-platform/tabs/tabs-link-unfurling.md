---
title: Teams tab Multi-window and Stage View
author: Rajeshwari-v
description: Learn about Stage View and Collaborative Stage View, a full screen UI component invoked to surface your web content. Link unfurling is used to turn URLs into a tab using Adaptive Cards.
ms.topic: conceptual
ms.author: surbhigupta
ms.localizationpriority: high
ms.date: 06/05/2023
---

# Teams tab Multi-window and Stage View

Looking for ways to enhance your app's user experience within Microsoft Teams? Microsoft Teams offers various ways to open your app content in immersive canvas experiences. These canvases enable your users to multitask within Teams, collaborate directly in a Teams Multi-window, or focus on tasks in an immersive Teams Stageview.

Your app content can be opened in three modes:
    1. Collaborative Stageview
    2. Teams Multi-window
    3. Stageview Modal

## Collaborative Stageview

Collaborative Stageview facilitates multitasking for your app content in Microsoft Teams. Users can open and view your app content in a new Microsoft Teams window, accompanied by a side panel conversation. This feature promotes meaningful content engagement and collaboration within the same window, leading to increased user engagement for your app. We recommend the Collaborative Stageview when your user opens content from a conversation (e.g., chat, channel, channel tab).

## Teams Multi-window

Teams Multi-window is ideal for scenarios where a user needs to multitask in Microsoft Teams without ad-hoc collaboration. This mode opens your content in a new window without a side-panel conversation, allowing your user to focus on a single task through your app. We recommend Teams Multi-Window when your user isn't opening content from a conversation (for example, personal app).

## Stageview Modal

Stageview Modal is a full-screen UI component that renders your app content inside the main Microsoft Teams window, providing users with a focused experience to engage with your app. Stageview Modal is useful for displaying rich content that doesn't require multitasking. Stageview Modal is the only mode available on the Microsoft Teams web client and is the default mode when multi-window is not supported.

## Invoke Collaborative Stageview from Adaptive Card

Opening Collaborative Stageview from an adaptive card allows users to engage with your content while continuing the conversation flow. When a user enters a URL for app content in a chat, the bot is invoked and returns an Adaptive Card with an option to open the URL.

Here's how to invoke Collaborative Stageview:
â€¢ When the user shares a URL in a Microsoft Teams chat, the bot receives a composeExtensions/queryLink invoke request. The bot returns an Adaptive Card with the type tab/tabInfoAction.
â€¢ After the user selects the action button on the Adaptive Card, Collaborative Stage View opens based on the content in the Adaptive Card.

Here's a JSON code example to create a Collaborative Stageview button in an Adaptive Card:

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

> [!NOTE]
>
> * If Collaborative Stageview is invoked via Adaptive Card JSON from the web client, a Stageview Modal is opened instead, as multi-window Microsoft Teams experiences are not yet supported in the browser.
> * Ensure that the content URL is within the list of validDomains in your app manifest.
> * The invoke request type must be a composeExtensions/queryLink.
> * The invoke workflow is similar to the appLinking workflow.
> * To maintain consistency, it is recommended to name Action.Submit as Open.
> * If you don't have an optimized mobile experience for Microsoft Teams mobile client, the Stage View for apps distributed through the Microsoft Teams Store opens in a default web browser. The browser opens the URL specified in the websiteUrl parameter of the TabInfo object.

## Invoke from StageView API

The StageView API from the Microsoft Teams JS Client SDK allows you to open any of the three openModes. If an openMode is not defined, by default the Collaborative Stageview will open with an associated side panel conversation. This side panel conversation will be the same thread from where the Collaborative Stageview was invoked (for example, chat, group chat). A threadId can also be specified (optional), allowing you to define the conversation that's brought into the side panel. The `openMode` parameter can be used to dictate whether content should be opened in Teams Multi-window (popout) or Stageview modal (modal).

For more information, see [StageView module - Teams | Microsoft Learn](https://docs.microsoft.com/en-us/javascript/api/@microsoft/teams-js/stageview?view=msteams-client-js-latest)

### StageView API Parameters

| Property name | Type | Character Limit | Description |
| --- | --- | --- | --- |
| entityId | String | 64 | [Required] This property is a unique identifier for the entity that the tab displays. |
| name | String | 128 | [Optional] This property is the display name of the tab in the channel interface. If no value is provided, the app name will be shown. |
| contentUrl | String | 2048 | [Required] This property is the https:// URL that points to the entity UI to be displayed in the Microsoft Teams canvas. |
| websiteUrl | String | 2048 | [Required] This property is the https:// URL to point at, if a user selects to view in a browser. |
| threadId | String | 2048 | [Optional] This property defines the conversation shown in the Collaborative Stageview sidepanel. It can contain a chat threadId (channel threadId is not supported). If no value passed, threadId is inherited from the context where Collaborative Stageview is opened. |
| openMode | String | 2048 | [Optional] This property defines the open behavior for stage content in the Desktop client. It can contain one of three values :â€œmodalâ€, â€œpopoutâ€, and â€œpopoutWithChatâ€. If no value is passed, openMode defaults to â€œpopoutWithChatâ€ (Collaborative Stageview). In the scenario that pop-outs are not supported (e.g., Microsoft Teams in browser), the experience falls back to modal. As such, the fallback hierarchy is popoutWithChat -> popout -> modal . |

StageViewParams with no open mode (defaults to Collaborative Stageview):

```json
{
  "appId": "2c19df50-1c3c-11ea-9327-cd28e4b6f7ba",
  "contentUrl": "https://teams-test-tab.azurewebsites.net",
  "title": "Test tab ordering",
  "websiteUrl": "https://teams-test-tab.azurewebsites.net"
}
```

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

StageViewParams for Teams Multi-Window:

```json
{
  "appId": "2c19df50-1c3c-11ea-9327-cd28e4b6f7ba",
  "contentUrl": "https://teams-test-tab.azurewebsites.net",
  "title": "Test tab ordering",
  "websiteUrl": "https://teams-test-tab.azurewebsites.net",
  "openMode": "popout"
}
```

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

> [!NOTE]
>
> * The optional threadId parameter only supports chat threads. In the scenario that a channel threadId is used, the side panel UI will not be shown.
> * When you launch Stageview from a certain context, ensure that your app works in that context. For example, if the Stageview is launched from a personal app, you must ensure your app has a personal scope.

## Invoke from Deeplink

By default, Stageview deeplinks will open in Collaborative Stageview with an associated side panel conversation. Unless a threadId is specified, the side panel conversation will bring the groupchat/channel thread from which the deeplink is invoked. The 'openMode' parameter can be used to dictate whether content should be opened in Teams Multiwindow (popout) or Stageview Modal (modal).

To invoke the deeplink from your tab or personal app, you must wrap the deep link URL in the app.openLink(url) API.

### Syntax

The following is the deep link syntax for Stageview Multi-window:

`https://teams.microsoft.com/l/stage/{appId}/0?context={"contentUrl":"contentUrl","websiteUrl":"websiteUrl","name":"Contoso","openMode":"popOutWithChat"}`

Deep link without any openMode specified (defaults to Collaborative Stageview).

> [!NOTE]
> All deep links must be encoded before pasting the URL. Unencoded URLs aren't supported.

`https://teams.microsoft.com/l/stage/2c19df50-1c3c-11ea-9327-cd28e4b6f7ba/0?context=%7B%22contentUrl%22%3A%22https%3A%2F%2Fteams-test-tab.azurewebsites.net%22%2C%22websiteUrl%22%3A%22https%3A%2F%2Fteams-test-tab.azurewebsites.net%22%7D`

### Query parameters

| Property name | Type | Character Limit | Description |
| --- | --- | --- | --- |
| entityId | String | 64 | This property is a unique identifier for the entity that the tab displays and it's a required field. |
| name | String | 128 | This property is the display name of the tab in the channel interface and it's an optional field. If no value is provided, the app name will be shown. |
| contentUrl | String | 2048 | This property is the https:// URL that points to the entity UI to be displayed in the Microsoft Teams canvas and it's a required field. |
| websiteUrl | String | 2048 | This property is the https:// URL to point at, if a user selects to view in a browser and it's a required field. |
| threadId | String | 2048 | [Optional] This property defines the conversation shown in the Collaborative Stageview side panel. It can contain a chat threadId (channel threadId is not supported). If no value passed, threadId is inherited from the context where Collaborative Stageview is opened. |
| openMode | String | 2048 | [Optional] This property defines the open behavior for stage content in the Desktop client. It can contain one of three values :modal, popout, and popoutWithChat. If no value is passed, openMode defaults to popoutWithChat (Collaborative Stageview). In the scenario that pop-outs are not supported (e.g., Microsoft Teams in browser), the experience falls back to modal. As such, the fallback hierarchy is popoutWithChat -> popout -> modal . |

>[!NOTE]
>
> * The optional threadId parameter only supports chat threads. In the scenario that a channel threadId is used, the side panel UI will not be shown.
> * All deep links must be encoded before pasting the URL. Unencoded URLs are not supported.
> * When you launch a Stageview from a certain context, ensure that your app works in that context. For example, if the Stageview is launched from a personal app, you must ensure your app has a personal scope.

In conclusion, the Stageview Multi-window in Microsoft Teams provides a versatile and immersive canvas for your app content. Whether you want to facilitate multitasking, enhance collaboration, or provide a focused user experience, the Stageview Multi-window has a mode to suit your needs. Remember to consider the context in which your app is being used and ensure that your app works in that context. Happy coding!

Microsoft Teams provides multiple methods for opening your app content in immersive canvas experiences. These canvases allow your users to embrace multi-tasking workflows inside Teams, collaborate with others directly in a Teams multi-window or complete focused work in an immersive Teams Stage View.

There are three modes to open your app content:

* Collaborative Stage View
* Teams multi-window
* Stage View modal

## Collaborative Stage

The Collaborative Stage mode allows multiple users to interact with your app simultaneously. It's ideal for collaborative tasks that require real-time interaction among team members.

## Teams Window

The Teams Window mode opens your app in a separate window within Teams. This mode is perfect for tasks that require a dedicated workspace but still need access to the Teams environment.

## Stage Modal

The Stage Modal mode provides an immersive, full-screen experience for your app. Use this mode when users need to focus on tasks without any distractions.

Stage View is a user interface (UI) component that allows you to render content in a full screen within Teams or as a new window.

> [!NOTE]
> This article is based on  Microsoft Teams JavaScript client library version 2.0.x. If you are using an earlier version, see [TeamsJS](how-to/using-teams-client-library.md) for guidance on the differences between the latest TeamsJS and earlier versions.

<!--It allows users to maintain their context within their new window experience while continuing  group chat conversation. <br> Developers have to enable Tab link Unfurling for their app to get Stage View update for free. Users are still able to pin the app content as a tab. It's a new entry point to pinning app content but it will not change the existing functionality of tabs or pinning. 

[!INCLUDE [sdk-include](~/includes/sdk-include.md)]-->

## Stage View

Stage View is a full screen UI component that can be used to render your app content, providing users with a focused experience to engage with your app. Stage View can be invoked from either an Adaptive Card or a deep link, in both chats and channels.

* When users invoke Stage View from Adaptive cards, Stage View opens in a new Teams window along with the originating chat or channel thread in the side panel. This new app canvas is called the [Collaborative Stage View](#collaborative-stage-view). The Collaborative Stage View allows users to multi-task and collaborate with each other.

* The Collaborative Stage View surfaces the originating chat or thread from where it was invoked and helps the users to engage with content and conversation side-by-side.

The following image is an example of the Collaborative Stage View:

:::image type="content" source="../assets/images/tab-images/collaborative-stage-view.png" alt-text="Screenshot shows the Collaborative Stage View in Teams.":::

### Stage View vs. Dialog

| Stage View | Dialog (referred as task module in TeamsJS v1.x)|
|:-----------|:-----------|
| Stage View is useful to display rich content to the users, such as a page, a dashboard, or a file. It provides rich features that help to render your content in the new pop-up window and the full-screen canvas. <br><br> After your app content opens in Stage View, users can choose to pin the content as a tab. <br><br> For more collaborative capabilities, opening your content in Collaborative Stage View (through an Adaptive Card) allows users to engage with content and conversation side-by-side, while enabling multi-window scenarios.| [Dialog](../task-modules-and-cards/task-modules/task-modules-tabs.md) is especially useful to display messages that need users' attention, or collect information required to move to the next step.|

### Invoke Stage View through deep link

To invoke the Stage View through deep link from your tab, you must wrap the deep link URL in the `app.openLink(url)` API. Stage View from a deep link always defaults to the modal experience (and not a Teams window). While the Stage View deep link can be passed through an `OpenURL` action in the card, the Stage View deep link is intended for the tab canvas. For Stage View from Adaptive Cards, it's recommended to follow the JSON [Adaptive Card example](#example).

The following image is an example of Stage view when it's invoked from a deep link:

:::image type="content" source="../assets/images/tab-images/open-stage-from-adaptive-card2.png" alt-text="Screenshot shows the open stage from card."lightbox="~/assets/images/tab-images/open-stage-from-adaptive-card2.png":::

#### Syntax

Following is the deep link syntax for Stage View:

`https://teams.microsoft.com/l/stage/{appId}/0?context={"contentUrl":"contentUrl","websiteUrl":"websiteUrl","name":"Contoso"}`

#### Examples

Following are the deep link examples to invoke Stage View:

<br>

<details>
<summary><b>Example 1</b></summary>
URL with threadId

Unencoded URL:

`https://teams.microsoft.com/l/stage/be411542-2bd5-46fb-8deb-a3d5f85156f6/0?context={"contentUrl":"https://teams-alb.wakelet.com/teams/collection/e4173826-5dae-4de0-b77d-bfabafd6f191","websiteUrl":"https://teams-alb.wakelet.com/teams/collection/e4173826-5dae-4de0-b77d-bfabafd6f191?standalone=true","title":"Quotes: Miscellaneous","threadId":"19:9UryYW9rjwnq-vwmBcexGjN1zQSNX0Y4oEAgtUC7WI81@thread.tacv2"}`

Encoded URL:

`https://teams.microsoft.com/l/stage/be411542-2bd5-46fb-8deb-a3d5f85156f6/0?context=%7B%22contentUrl%22%3A%22https%3A%2F%2Fteams-alb.wakelet.com%2Fteams%2Fcollection%2Fe4173826-5dae-4de0-b77d-bfabafd6f191%22%2C%22websiteUrl%22%3A%22https%3A%2F%2Fteams-alb.wakelet.com%2Fteams%2Fcollection%2Fe4173826-5dae-4de0-b77d-bfabafd6f191%3Fstandalone%3Dtrue%22%2C%22title%22%3A%22Quotes%3A%20Miscellaneous%22%2C%22threadId%22%3A%2219:9UryYW9rjwnq-vwmBcexGjN1zQSNX0Y4oEAgtUC7WI81@thread.tacv2%22%7D`

</details>

<br>

<details>
<summary><b>Example 2</b></summary>
URL without threadId

Unencoded URL:

`https://teams.microsoft.com/l/stage/43f56af0-8615-49e6-9635-7bea3b5802c2/0?context={"contentUrl":"https://teams-alb.wakelet.com/teams/collection/e4173826-5dae-4de0-b77d-bfabafd6f191","websiteUrl":"https://teams-alb.wakelet.com/teams/collection/e4173826-5dae-4de0-b77d-bfabafd6f191?standalone=true","title":"Quotes: Miscellaneous"}`

Encoded URL:

`https://teams.microsoft.com/l/stage/43f56af0-8615-49e6-9635-7bea3b5802c2/0?context=%7B%22contentUrl%22%3A%22https%3A%2F%2Fteams-alb.wakelet.com%2Fteams%2Fcollection%2Fe4173826-5dae-4de0-b77d-bfabafd6f191%22%2C%22websiteUrl%22%3A%22https%3A%2F%2Fteams-alb.wakelet.com%2Fteams%2Fcollection%2Fe4173826-5dae-4de0-b77d-bfabafd6f191%3Fstandalone%3Dtrue%22%2C%22title%22%3A%22Quotes%3A%20Miscellaneous%22%7D`

</details>

<br>

> [!NOTE]
>
> * All deep links must be encoded before pasting the URL.The unencoded URLs aren't supported.
> * The `name` property is optional in a deep link. If not included, the app name replaces it.
> * The deep link can also be passed through an `OpenURL` action.
> * When you launch a Stage View from a certain context, ensure that your app works in that context. For example, if the Stage View is launched from a personal app, you must ensure your app has a personal scope.

## Collaborative Stage View

> [!NOTE]
> Collaborative Stage View isn't supported in Teams web and mobile clients.

Collaborative Stage View is an enhancement to Stage View that allows users to engage with your app content in a new Teams window. When a user opens Collaborative Stage View from an Adaptive Card, the app content pops-out in a new Teams window instead of the default Stage View modal.

In the new Teams window, the Collaborative Stage View also opens a chat in the side panel. The chat brings the conversation from the group chat or channel thread where the users' Adaptive Card is originally shared. Users can continue to collaborate directly within the new window.

The following image is an example of Collaborative Stage View:

:::image type="content" source="../assets/images/tab-images/collaborative-stage-view.png" alt-text="Screenshot shows the Collaborative Stage View in Teams.":::

### Advantages of Collaborative Stage View

Collaborative Stage View helps unlock multi-tasking scenarios with your app content in Teams. Users can open and view your app content inside a new Teams window, while having meaningful conversation and collaboration from the same window. The ability to engage with content while also having a conversation on the content leads to higher user engagement for your app.

|Feature |Notes |Desktop |Web |Mobile|
|---      |:-----  |:--------   |:----  |:----- |
|Collaborative Stage View| Invoke from Adaptive Card action. |Chat or Channel: Opens Teams pop-out window with chat pane.| Opens Stage View modal. |Opens Stage View modal.|
|Stage View |Invoke from Deep link. Only recommended when calling from your tab app, and not an Adaptive Card. |Opens Stage View modal.| Opens Stage View modal.| Opens Stage View modal.|

### Invoke Collaborative Stage View from Adaptive Card

When the user enters an app content URL in a chat, the bot is invoked and returns an Adaptive Card with the option to open the URL. Depending on the context and the users’ client, the URL opens in the appropriate Stage View UI. When the Collaborative Stage View is invoked from an Adaptive Card in a chat or channel (and not from a deep link), a new window opens.

The following image is an example of a Collaborative Stage View from an Adaptive Card:

:::image type="content" source="../assets/images/tab-images/collaborative-stage-view-adaptive-card.png" alt-text="Screenshot shows the invoke experience of collaborative Stage View from Adaptive Card.":::

:::image type="content" source="../assets/images/tab-images/collaborative-stage-view.png" alt-text="Screenshot shows the Collaborative Stage View in Adaptive Card.":::

#### Example

The following is a JSON code example to create a Collaborative Stage View button in an Adaptive Card:

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

Following is the process to invoke Collaborative Stage View:

* When the user shares a URL in a Teams chat, the bot receives an `composeExtensions/queryLink` invoke request. The bot returns an Adaptive Card with the type `tab/tabInfoAction`.
* When the user selects the action button on the Adaptive Card, Collaborative Stage View opens based on the content in the Adaptive Card.

> [!NOTE]
>
> * Passing a Stage View deep link into an Adaptive Card doesn't open the Collaborative Stage View. A Stage View deep link always opens the Stage View Modal.
> * Ensure that the URL of the content is within the list of `validDomains` in your app manifest.
> * The invoke request type must be a `composeExtensions/queryLink`.
> * `invoke` workflow is similar to the `appLinking` workflow.
> * To maintain consistency, it is recommended to name `Action.Submit` as `Open`.
> * `websiteUrl` is a required property to be passed in the `TabInfo` object.
> * If you don't have an optimized mobile experience for Teams mobile client, the Stage View for apps distributed through the [Microsoft Teams Store](../concepts/deploy-and-publish/apps-publish-overview.md) opens in a default web browser. The browser opens the URL specified in the `websiteUrl` parameter of the `TabInfo` object.

#### Query parameters

| Property name | Type | Number of characters | Description |
|:-----------|:---------|:------------|:-----------------------|
| `entityId` | String | 64 | This property is a  unique identifier for the entity that the tab displays and it's a required field.|
| `name` | String | 128 | This property is the display name of the tab in the channel interface and it's an optional field.|
| `contentUrl` | String | 2048 | This property is the `https://` URL that points to the entity UI to be displayed in the Teams canvas and it's a required field.|
| `websiteUrl?` | String | 2048 | This property is the `https://` URL to point at, if a user selects to view in a browser and it's a required field.|
| `removeUrl?` | String | 2048 | This property is the `https://` URL that points to the UI to be displayed when the user deletes the tab and it's an optional field.|

## Code sample

| Sample name | Description | .NET |Node.js| Manifest|
|-------------|-------------|------|----|----|
|Tab in Stage View |Microsoft Teams tab sample app for demonstrating tab in Stage View.|[View](https://github.com/OfficeDev/Microsoft-Teams-Samples/tree/main/samples/tab-stage-view/csharp)|[View](https://github.com/OfficeDev/Microsoft-Teams-Samples/tree/main/samples/tab-stage-view/nodejs)|[View](https://github.com/OfficeDev/Microsoft-Teams-Samples/tree/main/samples/tab-stage-view/csharp/demo-manifest/tab-stage-view.zip)|

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
