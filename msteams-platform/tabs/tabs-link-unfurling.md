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

Open Stageview Multi-window in Microsoft Teams enables different ways to open app content in immersive canvas.  is a powerful feature that enhances user experience. It provides a platform for app content, designed to facilitate multitasking within Teams, enabling users to collaborate directly in a Teams multi-window or focus on specific tasks in an immersive Teams Stageview.

The Open Stageview Multi-window feature enhances productivity and collaboration by offering developers the flexibility to create more engaging applications and businesses the opportunity to streamline workflows.

Microsoft Teams provides multiple methods for opening your app content in immersive canvas experiences. These canvases allow your users to embrace multi-tasking workflows inside Teams, collaborate with others directly in a Teams multi-window or complete focused work in an immersive Teams Stage View.

By leveraging this feature, developers can create more interactive applications, and businesses can improve team collaboration and streamline workflows.

## Modes to Open Your App Content

The Open Stageview Multi-window offers three modes to open your app content:

- Collaborative Stageview
- Teams Multi-window
- Stageview Modal

:::row:::
    :::column:::
        :::image type="content" source="~/assets/images/tab-images/collab-stage-view.png" alt-text="The illustration shows the collaborative stageview.":::
    :::column-end:::
    :::column span="2":::

**Collaborative Stageview**

Collaborative Stageview enables multitasking scenarios for your app content in Teams. Users can open and view your app content in a new Teams window, accompanied by a side panel conversation. This allows for meaningful content engagement and collaboration within the same window.

    :::column-end:::
:::row-end:::

:::row:::
    :::column:::
        :::image type="content" source="~/assets/images/tab-images/multi-window.png" alt-text="The illustration shows the multi-window stage view.":::
    :::column-end:::
    :::column span="2":::

**Teams Multi-window**

Teams Multi-window is useful for scenarios that require a user to multitask in Teams without the need for ad-hoc collaboration. This opens your content in a new window without a side-panel conversation, allowing your user to focus on the singular task at hand through your app.

    :::column-end:::
:::row-end:::

:::row:::
    :::column:::
        :::image type="content" source="~/assets/images/tab-images/modal-view.png" alt-text="The illustration shows the stage view modal.":::
    :::column-end:::
    :::column span="2":::

**Stageview Modal**

Stageview Modal is a full-screen UI component that can be used to render your app content inside the main Teams window, providing users with a focused experience to engage with your app.

    :::column-end:::
:::row-end:::

## Ways to invoke Open Stageview Multi-window

## How to invoke Collaborative Stageview from an Adaptive Card

Opening Collaborative Stageview from an adaptive card allows users to engage with your content while continuing in the flow of conversation.

Here is a JSON code example to create a Collaborative Stageview button in an Adaptive Card:

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

## How to invoke from StageView API

The StageView API from the Teams JS Client SDK allows you to open any of the three â€˜openModesâ€™. If an openMode is not defined, by default the Collaborative Stageview will open with an associated sidepanel conversation.

## How to invoke from a Deeplink

By default, Stageview deeplinks will open in Collaborative Stageview with an associated sidepanel conversation. The 'openMode' parameter can be used to dictate whether content should be opened in Teams Multiwindow (popout) or Stageview Modal (modal).

## Important Notes

- If Collaborative Stageview is invoked via Adaptive Card JSON from the web client, a Stageview Modal is opened instead, as multi-window Teams experiences are not yet supported in the browser.
- Ensure that the URL of the content is within the list of validDomains in your app manifest.
- The invoke request type must be a composeExtensions/queryLink.
- Invoke workflow is similar to the appLinking workflow.
- To maintain consistency, it is recommended to name Action.Submit as Open.
- If you don't have an optimized mobile experience for Teams mobile client, the Stage View for apps distributed through the Microsoft Teams Store opens in a default web browser.
- The optional threadId parameter only supports chat threads.
- When you launch Stageview from a certain context, ensure that your app works in that context.
- All deep links must be encoded before pasting the URL. The unencoded URLs aren't supported.

For more detailed information on the stageView module, visit the [Microsoft Learn page](https://learn.microsoft.com/en-us/teams/jslibrary/v1.10.0/reference/microsoftteams.stageview).

There are three modes to open your app content:

- Collaborative Stage View
- Teams multi-window
- Stage View modal

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

- When users invoke Stage View from Adaptive Cards, Stage View opens in a new Teams window along with the originating chat or channel thread in the side panel. This new app canvas is called the [Collaborative Stage View](#collaborative-stage-view). The Collaborative Stage View allows users to multi-task and collaborate with each other.

- The Collaborative Stage View surfaces the originating chat or thread from where it was invoked and helps the users to engage with content and conversation side-by-side.

The following image is an example of the Collaborative Stage View:

:::image type="content" source="../assets/images/tab-images/collaborative-stage-view.png" alt-text="Screenshot shows the Collaborative Stage View in Teams.":::

### Stage View vs. Dialog

| Stage View | Dialog (referred as task module in TeamsJS v1.x)|
|:-----------|:-----------|
| Stage View is useful to display rich content to the users, such as a page, a dashboard, or a file. It provides rich features that help to render your content in the new pop-up window and the full-screen canvas. <br><br> After your app content opens in Stage View, users can choose to pin the content as a tab. <br><br> For more collaborative capabilities, opening your content in Collaborative Stage View (through an Adaptive Card) allows users to engage with content and conversation side-by-side, while enabling multi-window scenarios.| [Dialog](../task-modules-and-cards/task-modules/task-modules-tabs.md) is especially useful to display messages that need users' attention, or collect information required to move to the next step.|

> [!WARNING]
> Microsoft's cloud services, including web versions of Teams (*teams.microsoft.com*), Outlook (*outlook.com*), and Microsoft 365 (*microsoft365.com*) domains are migrating to the *cloud.microsoft* domain. Perform the following steps before June 2024 to ensure your app continues to render on the Teams web client:
>
> 1. Update TeamsJS SDK to v.2.19.0 or higher. For more information about the latest release of TeamsJS SDK, see [Microsoft Teams JavaScript client library](https://www.npmjs.com/package/@microsoft/teams-js).
>
> 2. Update your [Content Security Policy](https://developer.mozilla.org/en-US/docs/Web/HTTP/CSP) headers in your Teams app to allow your app to access the ***teams.cloud.microsoft*** domain. If your Teams app extends across Outlook and Microsoft 365, ensure you allow your app to access ***teams.cloud.microsoft***, ***outlook.cloud.microsoft***, and ***m365.cloud.microsoft*** domains.

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
> - All deep links must be encoded before pasting the URL.The unencoded URLs aren't supported.
> - The `name` property is optional in a deep link. If not included, the app name replaces it.
> - The deep link can also be passed through an `OpenURL` action.
> - When you launch a Stage View from a certain context, ensure that your app works in that context. For example, if the Stage View is launched from a personal app, you must ensure your app has a personal scope.

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

:::image type="content" source="../assets/images/tab-images/collaborative-stage-view-adaptive-card.png" alt-text="Screenshot shows the process of invoking Collaborative Stage View from an Adaptive Card.":::

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

The following steps show how to invoke Collaborative Stage View:

- When the user shares a URL in a Teams chat, the bot receives an `composeExtensions/queryLink` invoke request. The bot returns an Adaptive Card with the type `tab/tabInfoAction`.
- When the user selects the action button on the Adaptive Card, Collaborative Stage View opens based on the content in the Adaptive Card.

> [!NOTE]
>
> - Passing a Stage View deep link into an Adaptive Card doesn't open the Collaborative Stage View. A Stage View deep link always opens the Stage View Modal.
> - Ensure that the URL of the content is within the list of `validDomains` in your app manifest.
> - The invoke request type must be a `composeExtensions/queryLink`.
> - `invoke` workflow is similar to the `appLinking` workflow.
> - To maintain consistency, it is recommended to name `Action.Submit` as `Open`.
> - `websiteUrl` is a required property to be passed in the `TabInfo` object.
> - If you don't have an optimized mobile experience for Teams mobile client, the Stage View for apps distributed through the [Microsoft Teams Store](../concepts/deploy-and-publish/apps-publish-overview.md) opens in a default web browser. The browser opens the URL specified in the `websiteUrl` parameter of the `TabInfo` object.

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

- [Build tabs for Teams](what-are-tabs.md)
- [Add link unfurling](../messaging-extensions/how-to/link-unfurling.md)
- [Build tabs with Adaptive Cards](how-to/build-adaptive-card-tabs.md)
- [Create deep links](../concepts/build-and-test/deep-links.md)
- [Cards](../task-modules-and-cards/what-are-cards.md)
- [App manifest schema for Teams](../resources/schema/manifest-schema.md)
