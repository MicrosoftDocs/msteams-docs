---
title: Tabs- Link unfurling
author: Rajeshwari-v
description: How to perform link unfurling with tab in a Microsoft Teams app.
ms.topic: conceptual
ms.author: surbhigupta
---

# Tabs link unfurling with Stage View

The collaborative experience of Teams platform enhances with added new features continuously. A new UI component called Stage View is built in Teams allowing you to render the content that can be opened in full screen in Teams and pinned as a tab. 
This documentation guides you on how to adopt the Stage View in your app.

## Stage View

Stage View is a giant, full screen UI component that you can invoke to surface your web content. The link-unfurling service is updated so that it is used to turn URLs into a tab using an Adaptive Card and Chat Services. 

## Understand how the Stage View works

When a user sends an URL in the chat or channel, the URL is unfurled to an Adaptive Card, and get the UI and tab information through the card. When a user selects the Adaptive Card, it is staged in the UI component. The users can pin the content as a tab directly from the Stage View.  
The following image explains how the Stage View works:

![stageview working](~/assests/images/tabs/stage-view-working.png)

## Advantage of Stage View

The Stage View provides users with a more seamless experience of viewing content in Teams, instead of navigating to the browser. The users can interact directly with your content without leaving Teams and your app, leading to more engagement to your app and extending the time users spend on your app.

## Invoke the Stage View

You can invoke the Stage View in the following two ways:   

* Invoke Stage View through a deep link.
* Invoke Stage View from the Adaptive Card.

## Invoke Stage View through a deep link

**Stage View** is a large canvas that you can invoke to surface the web content.

To invoke the deep link from your tab, you must wrap the deep link URL in our `microsoftTeams.executeDeeplink(url)` API. 

The following image displays a Stage View invoked through a deep link:

![invoke a Stage View through a deep link](~/assets/images/tab-images/invoke-stage-view-through-deep-link.png)


### Syntax 

The deeplink must follow the following syntax:
https://teams.microsoft.com/l/stage/{appId}/0?context={“contentUrl”:”[contentUrl]”,“websiteUrl”:”[websiteUrl]”, “title”:”[title]”}

### Examples
The following examples show the sample deep links to invoke the **Stage View**:

#### Example 1

https://teams.microsoft.com/l/stage/2a527703-1f6f-4559-a332-d8a7d288cd88/0?context={“contentUrl”:”https%3A%2F%2Fmicrosoft.sharepoint.com%2Fteams%2FLokisSandbox%2FSitePages%2FSandbox-Page.aspx”, “websiteURL”:”https%3A%2F%2Fmicrosoft.sharepoint.com%2Fteams%2FLokisSandbox%2FSitePages%2FSandbox-Page.aspx”, “title”:”Contoso”}

#### Example 2

https://teams.microsoft.com/l/Meeting_Stage/2a527703-1f6f-4559-a332-d8a7d288cd88/0?context={“contentUrl”:”https%3A%2F%2Fmicrosoft.sharepoint.com%2Fteams%2FLokisSandbox%2FSitePages%2FSandbox-Page.aspx”, “websiteURL”:”https%3A%2F%2Fmicrosoft.sharepoint.com%2Fteams%2FLokisSandbox%2FSitePages%2FSandbox-Page.aspx”, “title”:”Contoso”}

> [!NOTE]
> The `title` is optional in the deeplink. If you do not include the `title`, your app name replaces it.

## Invoke Stage View from the Adaptive Card

Stage View is invoked from an [Adaptive Card](../task-modules-and-cards/cards/cards-actions.md). When the user enters a URL, the bot is invoked and returns an Adaptive Card with the option to open the URL in a stage.After a stage is launched, and the tabInfo is passed in, then you can add the ability to pin the stage as a tab.  

### 1. Open a stage from Adaptive Card and pin a tab

The following images display a stage opened from Adaptive Card and pinned in a tab:

![Open a stage from Adaptive Card](~/assets/images/tab-images/open-stage-from-adaptive-card.png)


![pin a tab](~/assets/images/tab-images/pin-a-tab.png)

### Example 

Following is the code to open a stage from Adaptive Card and pin a tab:

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
}, 
{   
    type: "Action.Submit",
    title: "Pin as Tab",
     data: {
        msteams: {
            type: "invoke",
            overflow: "true",
            value: {        
                  type: "tab/tabInfoAction",
                  tabInfo: {
                    contentUrl: contentUrl,
                    websiteUrl: websiteUrl,
                    name: "Tasks",
                    entityId: "entityId",
                    pinTab: true
                           }
            }
        }
    }    
}
```

The invoke type must be of `composeExtension/queryLink` type. It is like the current `appLinking` workflow. 

The `overflow to true` decides whether the button shows up as an overflow in the card or as a button in the body of the card. 

**Workflow**

1. `Invoke` request to bot  
    * Type: “composeextension/queryLink".
1. `Invoke` response from bot  
    * Contains Adaptive Card with type `tab` or `tabInfoAction` in it.
1.	When the user selects **View**, that sends an `invoke` request to bot. 
1. The bot can respond with a `200` code.

### 2. Pin a tab directly from the Adaptive Card through a button or overflow

* When the user enters a URL, it invokes a bot. The bot returns an Adaptive Card with the option to pin it as a tab.
* The `overflow to true` decides whether the button shows up as an overflow in the card or as a button in the body of the card.

#### Example 

Following is an example to pin a tab directly from the Adaptive Card through a button or overflow:

```json
{
    type: "Action.Submit",
    title: "Pin as Tab",
     data: {
        msteams: {
            type: "invoke",
            overflow: "true",
            value: {
                  type: "tab/tabInfoAction",
                  tabInfo: {
                    contentUrl: contentUrl,
                    websiteUrl: websiteUrl,
                    name: "Tasks",
                    entityId: "entityId",
                    pinTab: true
                  }
            }
        }
    }
}         
```

> [!NOTE] 
> Set `pinTab` to `true` for this workflow.

### 3. Deeplink to a stage

* The deeplink format is: https://teams.microsoft.com/l/stage/appId/0?context={ "contentURL": contentURL, "websiteURL": websiteURL, "title": title}
* The deeplink is resolved from deeplinkservice and open the stage.
* No option to pin the tab from here.
* Its difficult to include the entire `tabInfo` object in the deeplink URL.
* The `entityId` is `zero` in this case.

### 4. Open a stage with no option to pin the tab

Use `OpenURL` action with the stage deeplink to open the stage with the URL.

**`OpenURL`action which opens the URL in a browser** 

#### Example 

Following is an example of `OpenURL`action which opens the URL in a browser:

```json
{
  type: "Action.OpenUrl",  
 title: "View",
 url: contentUrl
}
```

### 5. Upgrade a website tab to an app

You can upgrade a website tab to an app. The following image displays how a website tab is upgraded to an app:

![upgrade a website tab to an app](~/assets/images/tab-images/upgrade-a-website-tab-to-an-app.png)

#### Example 

Following is an example to upgrade a website tab to an app:

```json
{
	“title”: “View”,
	“type”: “Action.Submit”,
    “data”:{
     “msteams”:{
	  “type”: “invoke”
         “overflow”: “true”,
              “value”:{
                    “type”: “tab/tabInfoFetch”,
                    “anything”: “any contextual information you would like to add”
               }
        }
    }
},
{
    "tabInfo": {
 “contentUrl”: “contentUrl",
 “websiteUrl”: “websiteUrl”,
 “removeUrl”: “removeUrl”,
 "name": "Tasks",
 "entityId": "entityId",
 “pinTab”: “true”
 }
}
```
* When there is a website tab that matches an app, you get **Use the app** option in a banner. 

* If you select **Use the app**, it triggers an `invoke` request to the bot. You can use  `handleExecuteBotQuery` API to get the response from bot.

* When you send an`invoke` request of `tab/tabInfoFetch`, the bot sends the `tabInfo` as part of the response. You can use the tab information to update the website tab to an app.

### 6. Add a tab of an app instead of the website tab

You can add a tab of an app instead of website tab. This work flow is same as [upgrade a website tab to an app](#5-upgrade-a-website-tab-to-an-app).   

The following image displays how to add a tab of an app instead of the website tab: 

![add a tab of an app instead of the website tab](~/assets/images/tab-images/add-tab-of-an-app-instead-of-website-tab.png)

## Tab information property

| Property name | Type | Number of characters | Description |
|:-----------|:---------|:------------|:-----------------------|
| entityId | String | 64 | A unique identifier for the entity that the tab displays. |
| name | String | 128 | The display neme of the tab in the channel interface. |
| contentUrl | String | 2048 | The https:// URL that points to the entity UI to be displayed in the Teams canvas. |
| websiteUrl? | String | 2048 | The https:// URL to point at if a user selects to view in a browser. |
| removeUrl? | String | 2048 | The https:// URL that points to the UI to be displayed when the user deletes the tab. |


##  Stage View vs task Module

Stage View is good to use when you have a rich content to display to end users, like a page, a dashboard, a file, and so on. Stage view provides maximum real estate that helps you render your content in the full-screen canvas. 
[Task Module](../task-modules-and-cards/task-modules/task-modules-tabs.md) is especially useful to display messages that requires users attention or collect information required to move to the next step.

## See also

> [!div class="nextstepaction"]
> [Messaging extensions link unfurling](~/messaging-extensions/how-to/link-unfurling.md)


