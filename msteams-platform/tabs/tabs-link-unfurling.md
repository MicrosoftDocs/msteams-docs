---
title: Tabs link unfurling and Stage View
author: Rajeshwari-v
description: Learn how to unfurl a link, open the Stage View and pin a tab with Microsoft Teams app. Learn about stage view and invoking it using Adaptive card using code example and sample. 
ms.topic: conceptual
ms.author: surbhigupta
ms.localizationpriority: medium
---

# Tabs link unfurling and Stage View

Stage View is a user interface (UI) component, that allows you to render content opened in full screen in Teams and pinned as a tab. Now you can access Stage View in different chat window. It allows users to maintain their context within their new window experience while continuing  group chat conversation. <br> Developers have to enable Tab link Unfurling for their app to get Stage View update for free. Users are still able to pin the app content as a tab. It's a new entry point to pinning app content but it will not change the existing functionality of tabs or pinning.

## Stage View

Stage View is a full screen UI component that you can invoke to surface your web content. The existing link unfurling service is updated so that it's used to turn URLs into a tab using an Adaptive Card and Chat services.

* When users invoke Stage View from Adaptive cards within chats, Stage View opens in a new window
* When a user sends a URL in a chat or channel, the URL is unfurled to an Adaptive Card. The user can select **View** in the card, and pin the content as a tab directly from Stage View

:::image type="content" source="~/assets/images/tab-images/stage-view.png" alt-text="Stage View" border="true":::

## Advantages of Stage View

* Provides enhanced experience to view content in Teams
* Allows users to do multi-task within Teams in a separate window

## Limitations of Stage View

* If a Stage View is already open, and the user selects on another stage link in the same chat, it will replace the existing Stage View window

* If a Stage View with chat is open and a meeting with the same chat gets started, Stage View window will get closed automatically. When the meeting ends, Stage View window will be restored

* If a Stage View link is opened from main window or chat window, it will replace with the Stage View window with side chat pane

## Stage View vs. Task module

|Stage View|Task module|
|:-----------|:-----------|
|Stage View is useful to display rich content to the users, such as a page, a dashboard, a file, and so on. It provides rich features that help to render your content in the new pop-up window.|[Task module](../task-modules-and-cards/task-modules/task-modules-tabs.md) is especially useful to display messages that require user attention, or collect information required to move to the next step.|
  
## Invoke Stage View

You can invoke Stage View in the following  ways:

* [Invoke Stage View from Adaptive Card](#invoke-stage-view-from-adaptive-card)
* [Invoke Stage View through deep link](#invoke-stage-view-through-deep-link)

## Invoke Stage View from Adaptive Card

When the user enters a URL on the Teams desktop client, the bot is invoked and returns an [Adaptive Card](../task-modules-and-cards/cards/cards-actions.md) with the option to open the URL in a stage. Now Stage View opens in a new window with chat docked to the side. After a stage is launched and the **tabInfo** is provided, you can pin the stage as a tab.

An Adaptive Card opens a stage in the following images:

:::image type="content" source="~/assets/images/tab-images/open-stage-from-adaptive-card1.png" alt-text="Open a stage from Adaptive Card" border="true":::

:::image type="content" source="~/assets/images/tab-images/open-stage-from-adaptive-card2.png" alt-text="Open a stage" border="true":::

### Example

Following is the code to open a stage from an Adaptive Card:

```json
{
    type: "Action.Submit",
    name: "View",
    data: {
          msteams: {
            type: "invoke",
            value: {
                type: "tab/tabInfoAction",
                tabInfo: {
                    contentUrl: contentUrl,
                    websiteUrl: websiteUrl,
                    name: "Tasks",
                    entityId: "entityId"
                 }
                }
            }
        }
} 
```

The `invoke` request type must be `composeExtension/queryLink`.

> [!NOTE]
>
> * `invoke` workflow is similar to the current `appLinking` workflow
> * To maintain consistency, it is recommended to name `Action.Submit` as `View`
> * `websiteUrl` is a required property to be passed in the `TabInfo` object

**To invoke Stage View**:

1. When the user selects **View**, the bot receives an `invoke` request. The request type is `composeExtension/queryLink`.
1. `invoke` response from bot contains an Adaptive Card with type `tab/tabInfoAction` in it.
1. The bot responds with a `200` code.

> [!NOTE]
> On Teams mobile clients, invoking Stage View for apps distributed through the [your Microsoft Teams app](../concepts/deploy-and-publish/apps-publish-overview.md) and not having a moblie-optimized experience opens the default web browser of the device. The browser opens the URL specified in the `websiteUrl` parameter of the `TabInfo` object.

## Invoke Stage View through deep link

To invoke the Stage View through deep link from your tab, you must wrap the deep link URL in the `microsoftTeams.executeDeeplink(url)` API. The deep link can also be passed through an `OpenURL` action in the card.

> [!NOTE]
> All deeplinks must be encoded before pasting the URL. We don't support unencoded URLs.
>
> * The `name` is optional in deep link. If not included, the app name replaces it
> * When you launch a Stage from a certain context, ensure that your app works in that context. For example, if your Stage View is launched from a personal app, you must ensure your app has a personal scope

### Syntax

Following is the keeplink syntax:

<https://teams.microsoft.com/l/stage/{appId}/0?context>={"contentUrl":"contentUrl","websiteUrl":"websiteUrl","name":"Contoso"}


### Examples

When a user enters a URL, it's unfurled into an Adaptive card.Following are the deep link examples to invoke Stage View:

<br>

<details>
<summary><b>Example 1</b></summary>
URL with threadId

Unencoded URL:

<https://teams.microsoft.com/l/stage/be411542-2bd5-46fb-8deb-a3d5f85156f6/0?context>={"contentUrl":"https://teams-alb.wakelet.com/teams/collection/e4173826-5dae-4de0-b77d-bfabafd6f191","websiteUrl":"https://teams-alb.wakelet.com/teams/collection/e4173826-5dae-4de0-b77d-bfabafd6f191?standalone=true","title":"Quotes: Miscellaneous","threadId":"19:9UryYW9rjwnq-vwmBcexGjN1zQSNX0Y4oEAgtUC7WI81@thread.tacv2"}

Encoded URL:

<https://teams.microsoft.com/l/stage/be411542-2bd5-46fb-8deb-a3d5f85156f6/0?context=%7B%22contentUrl%22%3A%22https%3A%2F%2Fteams-alb.wakelet.com%2Fteams%2Fcollection%2Fe4173826-5dae-4de0-b77d-bfabafd6f191%22%2C%22websiteUrl%22%3A%22https%3A%2F%2Fteams-alb.wakelet.com%2Fteams%2Fcollection%2Fe4173826-5dae-4de0-b77d-bfabafd6f191%3Fstandalone%3Dtrue%22%2C%22title%22%3A%22Quotes%3A%20Miscellaneous%22%2C%22threadId%22%3A%2219:9UryYW9rjwnq-vwmBcexGjN1zQSNX0Y4oEAgtUC7WI81@thread.tacv2%22%7D>

</details>

<br>

<details>
<summary><b>Example 2</b></summary>
URL without threadId

Unencoded URL:

<https://teams.microsoft.com/l/stage/43f56af0-8615-49e6-9635-7bea3b5802c2/0?context>={"contentUrl":"https://teams-alb.wakelet.com/teams/collection/e4173826-5dae-4de0-b77d-bfabafd6f191","websiteUrl":"https://teams-alb.wakelet.com/teams/collection/e4173826-5dae-4de0-b77d-bfabafd6f191?standalone=true","title":"Quotes: Miscellaneous"}

Encoded URL:

<https://teams.microsoft.com/l/stage/43f56af0-8615-49e6-9635-7bea3b5802c2/0?context=%7B%22contentUrl%22%3A%22https%3A%2F%2Fteams-alb.wakelet.com%2Fteams%2Fcollection%2Fe4173826-5dae-4de0-b77d-bfabafd6f191%22%2C%22websiteUrl%22%3A%22https%3A%2F%2Fteams-alb.wakelet.com%2Fteams%2Fcollection%2Fe4173826-5dae-4de0-b77d-bfabafd6f191%3Fstandalone%3Dtrue%22%2C%22title%22%3A%22Quotes%3A%20Miscellaneous%22%7D>

</details>

<br>

## Tab information property

| Property name | Type | Number of characters | Description |
|:-----------|:---------|:------------|:-----------------------|
| `entityId` | String | 64 | This property is a  unique identifier for the entity that the tab displays and it's a required field.|
| `name` | String | 128 | This property is the display name of the tab in the channel interface and it's an optional field.|
| `contentUrl` | String | 2048 | This property is the https:// URL that points to the entity UI to be displayed in the Teams canvas and it's a required field.|
| `websiteUrl?` | String | 2048 | This property is the https:// URL to point at, if a user selects to view in a browser and it's a required field.|
| `removeUrl?` | String | 2048 | This property is the https:// URL that points to the UI to be displayed when the user deletes the tab and it's an optional field.|

## Code sample

| Sample name | Description | C# |Node.js|
|-------------|-------------|------|----|
|Tab in stage view |Microsoft Teams tab sample app for demonstrating tab in stage view.|[View](https://github.com/OfficeDev/Microsoft-Teams-Samples/tree/main/samples/tab-stage-view/csharp)|[View](https://github.com/OfficeDev/Microsoft-Teams-Samples/tree/main/samples/tab-stage-view/nodejs)|

## Next step

> [!div class="nextstepaction"]
> [Create conversational tabs](~/tabs/how-to/conversational-tabs.md)

## See also

* [Message extensions link unfurling](~/messaging-extensions/how-to/link-unfurling.md)
* [Teams tabs](~/tabs/what-are-tabs.md)
* [Create a personal tab](~/tabs/how-to/create-personal-tab.md)
* [Create a channel or group tab](~/tabs/how-to/create-channel-group-tab.md)
