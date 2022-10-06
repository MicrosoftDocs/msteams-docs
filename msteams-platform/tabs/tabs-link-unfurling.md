---
title: Tabs link unfurling and Stage View
author: Rajeshwari-v
description: Learn about stage view, a full screen UI component invoked to surface your web content. Link unfurling is used to turn URLs into a tab using Adaptive Cards.
ms.topic: conceptual
ms.author: surbhigupta
ms.localizationpriority: high
---

# Tabs link unfurling and Stage View

Stage View is a user interface (UI) component that allows you to render content either a full-sized modal within Teams or as a new window.

[!INCLUDE [sdk-include](~/includes/sdk-include.md)]

## Stage View

The link unfurling service is updated so that it's used to turn URLs into a tab using an Adaptive Card and Chat Services. When a user sends a URL in a chat, the URL is unfurled to an Adaptive Card. The user can select **View** in the card, and pin the content as a tab directly from Stage View.

Collaborative Stage View is an enhancement to Stage View that allows your app content to exist in multiple Teams windows. When a user opens Stage View from Adaptive Cards within a group chat, it opens the app content in a new Teams window instead of a modal.

> [!NOTE]
>
> Currently Collaborative Stage View is available only in [Public developer preview for Teams](../resources/dev-preview/developer-preview-intro.md)

Collaborative Stage View is only invoked from Adaptive Card in group chats. When invoked from channels, Teams web client, or mobile, the Collaborative Stage View experience fall back to the full screen Stage View modal.

|Component|Invoke action|Desktop|Web|Mobile|
|-----------|-----------|-----------|-----------|-----------|
|Collaborative Stage View|Invoke from Adaptive Card|**Chat**: Opens Teams pop-out window with chat pane.|Opens Stage View modal|Opens Stage View modal|
|Stage View|Invoke from deep link only. It's recommended when calling from your tab app, and not Adaptive Cards.|Opens Stage View modal|Opens Stage View modal|Opens Stage View modal|

## Advantages of Stage View

Stage View provides seamless experience of viewing content in Teams. Users can open and view the content provided by your app without leaving the context, and they can pin the content to the chat for future quick access leading to a higher user engagement with your app.

Stage View opens as a modal, providing users a full canvas to engage with the content.

   [![Open a stage from Adaptive Cards](~/assets/images/tab-images/stage-view.png)](~/assets/images/tab-images/stage-view.png#lightbox)

The Collaborative Stage View provides seamless, multitasking experience when working with content in Teams. Users can open and view your app content in a new Teams window and continue discussion from same window. The ability to engage and conversation about the same content leads to higher user engagement with your app.

Collaborative Stage View opens in a new Teams window with the originating chat in the side panel.

   [![Open a collaborative stage from Adaptive Cards](~/assets/images/tab-images/collabrative-stage-view.png)](~/assets/images/tab-images/collabrative-stage-view.png#lightbox)

## Stage View vs. Task module

|Stage View|Task module|
|:-----------|:-----------|
|Stage View is helpful to display the rich content to the users, such as a page, a dashboard, a file, and so on. It provides rich features that help to render your content in the full-screen canvas. Elevating your content with Collaborative Stage View also allows you to enable rich multi-tasking scenarios for users. It allows users to engage with the content while also continuing to collaborate. The rich experience of the main Teams window can be surfaced for your app in its own dedicated window.|[Task module](../task-modules-and-cards/task-modules/task-modules-tabs.md) is especially useful to display messages that require user attention, or collect information required to move to the next step.|

## Invoke Stage View

> [!NOTE]
>
> * On Teams mobile clients, invoking Stage View for apps distributed through the [Teams store](~/concepts/deploy-and-publish/apps-publish-overview.md) and not having a mobile-optimized experience opens the default web browser of the device. The browser opens the URL specified in the `websiteUrl` parameter of the `TabInfo` object.
> * The multi-window Collaborative Stage View can be invoked from the group chats only. It is not available in the Teams web client or mobile. In these scenarios, the Stage View experience fall back to showing users the content in an interstitial modal.

The two invoke Stage View process are:

* [Invoke Stage View from Adaptive Card](#invoke-stage-view-from-adaptive-card)
* [Invoke Stage View through deep link](#invoke-stage-view-through-deep-link)

## Invoke Stage View from Adaptive Card

When the user enters an app content URL in a chat, the bot is invoked, and returns [Card actions](../task-modules-and-cards/cards/cards-actions.md) with the option to open the URL. Depending on the context and the users client, this URL is opened in the appropriate Stage View UI. When the Collaborative Stage View is invoked from Adaptive Cards in a group or meeting chat (and not from a deep link), a new window is opened.

The following images displays invoking Collaborative Stage View from Adaptive Cards:

1. The user selects an Adaptive Card button to open content URL.

   [![Open a stage example2](~/assets/images/tab-images/collab-stage-view-example3.png)](~/assets/images/tab-images/collab-stage-view-example3.png#lightbox)

1. The Adaptive Card actions returns with the option to open the URL.

   [![Open a stage from Adaptive Card example](~/assets/images/tab-images/collab-stage-view-example1.png)](~/assets/images/tab-images/collab-stage-view-example1.png#lightbox)

1. Collaborative Stage View opens a separate window.

   [![Open a stage example1](~/assets/images/tab-images/collab-stage-view-example2.png)](~/assets/images/tab-images/collab-stage-view-example2.png#lightbox)

### Code snippet

The following code enables to create a Collaborative Stage View button from Adaptive Cards:

```JSONCopy
{
    type: "Action.Submit",
    name: "Open",
    data: {
          msteams: {
            type: "invoke",
            value: {
                type: "tab/tabInfoAction",
                tabInfo: {
                    contentUrl: contentUrl,
                    websiteUrl: websiteUrl,
                    name: "Sales Report",
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
> * `invoke` is same as the current `appLinking` workflow.
> * To maintain consistency, it is recommended to name `Action.Submit` as `View`.
> * `websiteUrl` is a required property to be passed in the `TabInfo` object.

Following is the process to invoke Stage View:

* When the user selects **View**, the bot receives an `invoke` request. The request type is `composeExtension/queryLink`.
* `invoke` response from bot contains an Adaptive Card with type `tab/tabInfoAction` in it.
* The bot responds with a `200` code.

> [!NOTE]
>
> On Teams mobile clients, invoking Stage View for apps distributed through the [Teams store](~/concepts/deploy-and-publish/apps-publish-overview.md) and not having a mobile-optimized experience opens the default web browser of the device. The browser opens the URL specified in the `websiteUrl` parameter of the `TabInfo` object.

## Invoke Stage View through deep link

To invoke the Stage View through deep link from your tab, you must wrap the deep link URL in the `app.openLink(url)` API. Invoke Stage View from a deep link always default to the modal experience (and not a Teams window). While it's possible for the deep link to be passed through an `OpenURL` Adaptive Card action, the Stage View deep link is intended for the tab canvas. For Adaptive Cards, we encourage developers to follow the [Code snippet](#code-snippet).

### Syntax

Following is the deep link syntax:

`<https://teams.microsoft.com/l/stage/{appId}/0?context>={"contentUrl":"contentUrl","websiteUrl":"websiteUrl","name":"Contoso"}`

### Examples

When a user enters a URL, it's unfurled into Adaptive Cards.

Following are the deep link examples to invoke Stage View:

**Example 1: URL with threadId**

Unencoded URL:

`<https://teams.microsoft.com/l/stage/be411542-2bd5-46fb-8deb-a3d5f85156f6/0?context>={"contentUrl":"https://teams-alb.wakelet.com/teams/collection/e4173826-5dae-4de0-b77d-bfabafd6f191","websiteUrl":"https://teams-alb.wakelet.com/teams/collection/e4173826-5dae-4de0-b77d-bfabafd6f191?standalone=true","title":"Quotes: Miscellaneous","threadId":"19:9UryYW9rjwnq-vwmBcexGjN1zQSNX0Y4oEAgtUC7WI81@thread.tacv2"}`

Encoded URL:

`<https://teams.microsoft.com/l/stage/be411542-2bd5-46fb-8deb-a3d5f85156f6/0?context=%7B%22contentUrl%22%3A%22https%3A%2F%2Fteams-alb.wakelet.com%2Fteams%2Fcollection%2Fe4173826-5dae-4de0-b77d-bfabafd6f191%22%2C%22websiteUrl%22%3A%22https%3A%2F%2Fteams-alb.wakelet.com%2Fteams%2Fcollection%2Fe4173826-5dae-4de0-b77d-bfabafd6f191%3Fstandalone%3Dtrue%22%2C%22title%22%3A%22Quotes%3A%20Miscellaneous%22%2C%22threadId%22%3A%2219:9UryYW9rjwnq-vwmBcexGjN1zQSNX0Y4oEAgtUC7WI81@thread.tacv2%22%7D>`

**Example 2: URL with no threadId**

Unencoded URL:

`<https://teams.microsoft.com/l/stage/43f56af0-8615-49e6-9635-7bea3b5802c2/0?context>={"contentUrl":"https://teams-alb.wakelet.com/teams/collection/e4173826-5dae-4de0-b77d-bfabafd6f191","websiteUrl":"https://teams-alb.wakelet.com/teams/collection/e4173826-5dae-4de0-b77d-bfabafd6f191?standalone=true","title":"Quotes: Miscellaneous"}`

Encoded

`<https://teams.microsoft.com/l/stage/43f56af0-8615-49e6-9635-7bea3b5802c2/0?context=%7B%22contentUrl%22%3A%22https%3A%2F%2Fteams-alb.wakelet.com%2Fteams%2Fcollection%2Fe4173826-5dae-4de0-b77d-bfabafd6f191%22%2C%22websiteUrl%22%3A%22https%3A%2F%2Fteams-alb.wakelet.com%2Fteams%2Fcollection%2Fe4173826-5dae-4de0-b77d-bfabafd6f191%3Fstandalone%3Dtrue%22%2C%22title%22%3A%22Quotes%3A%20Miscellaneous%22%7D>`

> [!NOTE]
> All deep links must be encoded before pasting the URL. We don't support unencoded URLs.
>
> * The `name` is optional in deep link. If not included, the app name replaces it.
> * The deep link can also be passed through an `OpenURL` action.
> * When you launch a Stage View from a certain context, ensure that your app works in that context. For example, if your Stage View is launched from a personal app, you must ensure your app has a personal scope.

## Tab information property

| Property name | Type | Number of characters | Description |
|:-----------|:---------|:------------|:-----------------------|
| `entityId` | String | 64 | This property is a  unique identifier for the entity that the tab displays. This is a required field.|
| `name` | String | 128 | This property is the display name of the tab in the channel interface. This is an optional field.|
| `contentUrl` | String | 2048 | This property is the https:// URL that points to the entity UI to be displayed in the Teams canvas. This is a required field.|
| `websiteUrl?` | String | 2048 | This property is the https:// URL to point at, if a user selects to view in a browser. This is a required field.|
| `removeUrl?` | String | 2048 | This property is the https:// URL that points to the UI to be displayed when the user deletes the tab. This is an optional field.|

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
