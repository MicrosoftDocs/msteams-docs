---
title: Tabs-link unfurling
author: Rajeshwari-v
description: How to perform link unfurling with tab in a Microsoft Teams app.
ms.topic: conceptual
ms.author: surbhigupta
---

# Tabs link unfurling 

The collaborative experience of Teams platform is enhanced continuously with addition of new features. In this process of continuous enhancement, a new UI component, called Stage View is built in Teams. 

Stage View allows you to render the content that is opened in full screen in Teams and pinned as a tab. To allow the users to use this feature, let us understand how to adopt the Stage View in your app.
 
## Stage View

Stage View is a giant, full screen UI component that you can invoke to surface your web content. The existing link unfurling service is updated so that it is used to turn URLs into a tab using an Adaptive Card and Chat Services. 

## Understand how the Stage View works

When a user sends an URL in the chat or channel, the URL is unfurled to an Adaptive Card. The user gets the UI and tab information through the card, and pins the content as a tab directly from the Stage View.

The following image explains how the Stage View works:

![stageview working](~/assets/images/tabs/stage-view-working.png)

## Advantage of Stage View

The Stage View provides users with a more seamless experience of viewing content in Teams, instead of browser. This leads to more engagement with your app within Teams.

## Invoke the Stage View

You can invoke the Stage View in the following  ways: 

* Invoke Stage View from an Adaptive Card.
* Invoke Stage View through a deep link.

## Invoke Stage View from an Adaptive Card

When the user enters an URL, the bot is invoked and returns an [Adaptive Card](../task-modules-and-cards/cards/cards-actions.md) with the option to open the URL in a stage. After a stage is launched, and the `tabInfo` is passed in, you can add the ability to pin the stage as a tab.  

The following images display a stage opened from an Adaptive Card:

![Open a stage from Adaptive Card](~/assets/images/tab-images/open-stage-from-adaptive-card.png)

![Open a stage from Adaptive Card](~/assets/images/tab-images/open-stage-from-adaptive-card2.png)

### Example 

Following is the code to open a stage from an  Adaptive Card:

```json
{
    type: "Action.Submit",
    title: "View",
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
> `invoke` workflow is similar to the current `appLinking` workflow. 

**To invoke Stage View**

1. When the user selects **View**, the bot receives an `invoke` request. The request type is `composeExtension/queryLink`.
1. `invoke` response from bot contains an Adaptive Card with type `tab/tabInfoAction` in it.
1. The bot responds with a `200` code.

## Invoke Stage View through deep link

To invoke the deep link from your tab, you must wrap the deep link URL in `microsoftTeams.executeDeeplink(url)` API. 

The following image displays a Stage View invoked through a deep link:

![invoke a Stage View through a deep link](~/assets/images/tab-images/invoke-stage-view-through-deep-link.png)

### Syntax 

Following is the syntax of a deeplink:  

https://teams.microsoft.com/l/stage/{appId}/0?context={“contentUrl”:”[contentUrl]”,“websiteUrl”:”[websiteUrl]”, “title”:”[title]”}

### Examples

Following are the deep link examples to invoke the Stage View:

#### Example 1

https://teams.microsoft.com/l/stage/2a527703-1f6f-4559-a332-d8a7d288cd88/0?context={“contentUrl”:”https%3A%2F%2Fmicrosoft.sharepoint.com%2Fteams%2FLokisSandbox%2FSitePages%2FSandbox-Page.aspx”, “websiteURL”:”https%3A%2F%2Fmicrosoft.sharepoint.com%2Fteams%2FLokisSandbox%2FSitePages%2FSandbox-Page.aspx”, “title”:”Contoso”}

#### Example 2

https://teams.microsoft.com/l/Meeting_Stage/2a527703-1f6f-4559-a332-d8a7d288cd88/0?context={“contentUrl”:”https%3A%2F%2Fmicrosoft.sharepoint.com%2Fteams%2FLokisSandbox%2FSitePages%2FSandbox-Page.aspx”, “websiteURL”:”https%3A%2F%2Fmicrosoft.sharepoint.com%2Fteams%2FLokisSandbox%2FSitePages%2FSandbox-Page.aspx”, “title”:”Contoso”}

> [!NOTE]
> The `title` is optional in the deeplink. If not included, the app name replaces it . 

## Tab information property

| Property name | Type | Number of characters | Description |
|:-----------|:---------|:------------|:-----------------------|
| `entityId` | String | 64 | This property is a  unique identifier for the entity that the tab displays. |
| `name` | String | 128 | This property is the display name of the tab in the channel interface. |
| `contentUrl` | String | 2048 | This property is the https:// URL that points to the entity UI to be displayed in the Teams canvas. |
| `websiteUrl?` | String | 2048 | This property is the https:// URL to point at, if a user selects to view in a browser. |
| `removeUrl?` | String | 2048 | This property is the https:// URL that points to the UI to be displayed when the user deletes the tab. |


##  Stage View vs. Task module

* Stage View is useful when you have a rich content to display to the users, such as a page, a dashboard, a file, and so on. It provides  maximum real estate that helps to render your content in the full-screen canvas. 
* [Task module](../task-modules-and-cards/task-modules/task-modules-tabs.md) is especially useful to display messages that requires user's attention or collect information required to move to the next step.

## See also

> [!div class="nextstepaction"]
> [Messaging extensions link unfurling](~/messaging-extensions/how-to/link-unfurling.md)


