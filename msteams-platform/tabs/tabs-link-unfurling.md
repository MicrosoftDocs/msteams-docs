---
title: Tabs link unfurling and Stage View
author: Rajeshwari-v
description: How to unfurl a link, open the Stage View and pin a tab with Microsoft Teams app.  
ms.topic: conceptual
ms.author: surbhigupta
---

# Tabs link unfurling and Stage View

> [!NOTE]
> This feature is available in public developer preview only.

Stage View is a new UI component, which allows you to render the content that is opened in full screen in Teams and pinned as a tab.
 
> [!NOTE]
> Currently, Teams mobile clients do no support tabs link unfurling and Stage View. Mobile clients use the `websiteUrl` attribute provided by the developer to open the page in the device's web browser.

## Stage View

Stage View is a full screen UI component that you can invoke to surface your web content. The existing link unfurling service is updated so that it is used to turn URLs into a tab using an Adaptive Card and Chat Services. 

## Understand how the Stage View works

When a user sends a URL in the chat or channel, the URL is unfurled to an Adaptive Card. The user selects **View** in the card, and pins the content as a tab directly from the Stage View.

## Advantage of Stage View

Stage View helps provide a more seamless experience of viewing content in Teams. Users can open and view the content provided by your app without leaving the context, and they can pin the content to the chat or channel for future quick access. This leads to a higher user engagement with your app.

##  Stage View vs. Task module

|Stage View|Task module|
|:-----------|:-----------|
|Stage View is useful when you have a rich content to display to the users, such as a page, a dashboard, a file, and so on. It provides  maximum real estate that helps to render your content in the full-screen canvas.|[Task module](../task-modules-and-cards/task-modules/task-modules-tabs.md) is especially useful to display messages that requires user's attention, or collect information required to move to the next step.|
  
## Invoke the Stage View

You can invoke the Stage View in the following  ways: 

* [Invoke Stage View from Adaptive Card](#invoke-stage-view-from-adaptive-card)
* [Invoke Stage View through deep link](#invoke-stage-view-through-deep-link)

## Invoke Stage View from Adaptive Card

When the user enters a URL on the Teams desktop client, the bot is invoked and returns an [Adaptive Card](../task-modules-and-cards/cards/cards-actions.md) with the option to open the URL in a stage. After a stage is launched and the `tabInfo` is passed in, you can add the ability to pin the stage as a tab.  

The following images display a stage opened from an Adaptive Card:

<img src="~/assets/images/tab-images/open-stage-from-adaptive-card1.png" alt="Open a stage from Adaptive Card" width="400"/>

<img src="~/assets/images/tab-images/open-stage-from-adaptive-card2.png" alt="Open a stage" width="400"/>

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
> * `invoke` workflow is similar to the current `appLinking` workflow. 
> * To maintain consistency, it is recommended to name the `Action.Submit` as `View`.
> * `websiteUrl` is a required property to be passed in the `TabInfo` object.

**Process to invoke Stage View**

1. When the user selects **View**, the bot receives an `invoke` request. The request type is `composeExtension/queryLink`.
1. `invoke` response from bot contains an Adaptive Card with type `tab/tabInfoAction` in it.
1. The bot responds with a `200` code.

> [!NOTE]
> Currently, Teams mobile clients do not support the Stage View capability. When a user selects **View** on a mobile client, the user is taken to the device's browser. The browser opens the URL specified in the `websiteUrl` parameter of the `TabInfo` object.

## Invoke Stage View through deep link

To invoke the Stage View through deep link from your tab, you must wrap the deep link URL in the `microsoftTeams.executeDeeplink(url)` API. The deeplink can also be passed through an `OpenURL` action in the card.

The following image displays a Stage View invoked through a deep link:

<img src="~/assets/images/tab-images/invoke-stage-view-through-deep-link.png" alt="Invoke a Stage View through a deep link" width="400"/>

### Syntax 

Following is the deeplink syntax:  
 
https://teams.microsoft.com/l/stage/{appId}/0?context={“contentUrl”:”[contentUrl]”,“websiteUrl”:”[websiteUrl]”,“name”:”[name]”}

### Examples

When a user enters a URL, it is unfurled into an Adaptive card.
Following are the deep link examples to invoke the Stage View:

**Example 1**

https://teams.microsoft.com/l/stage/2a527703-1f6f-4559-a332-d8a7d288cd88/0?context={“contentUrl”:”https%3A%2F%2Fmicrosoft.sharepoint.com%2Fteams%2FLokisSandbox%2FSitePages%2FSandbox-Page.aspx”,“websiteUrl”:”https%3A%2F%2Fmicrosoft.sharepoint.com%2Fteams%2FLokisSandbox%2FSitePages%2FSandbox-Page.aspx”,“name”:”Contoso”}

**Example 2**

https://teams.microsoft.com/l/Meeting_Stage/2a527703-1f6f-4559-a332-d8a7d288cd88/0?context={“contentUrl”:”https%3A%2F%2Fmicrosoft.sharepoint.com%2Fteams%2FLokisSandbox%2FSitePages%2FSandbox-Page.aspx”,“websiteUrl”:”https%3A%2F%2Fmicrosoft.sharepoint.com%2Fteams%2FLokisSandbox%2FSitePages%2FSandbox-Page.aspx”,“name”:”Contoso”}

> [!NOTE]
> * The `name` is optional in deep link. If not included, the app name replaces it. 
> * The deep link can also be passed through  an `OpenURL` action.
> * Currently, Teams mobile clients do not support the Stage View capability. When users selects a deep link to a Stage View, they are taken to their device's web browser. The web browser opens the URL specified in the `websiteUrl` parameter of the deep link.

## Tab information property

| Property name | Type | Number of characters | Description |
|:-----------|:---------|:------------|:-----------------------|
| `entityId` | String | 64 | This property is a  unique identifier for the entity that the tab displays. This is a required field.|
| `name` | String | 128 | This property is the display name of the tab in the channel interface. This is an optional field.|
| `contentUrl` | String | 2048 | This property is the https:// URL that points to the entity UI to be displayed in the Teams canvas. This is a required field.|
| `websiteUrl?` | String | 2048 | This property is the https:// URL to point at, if a user selects to view in a browser. This is a required field.|
| `removeUrl?` | String | 2048 | This property is the https:// URL that points to the UI to be displayed when the user deletes the tab. This is an optional field.|

## See also

[Messaging extensions link unfurling](~/messaging-extensions/how-to/link-unfurling.md)


