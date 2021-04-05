---
title: Tabs- Link unfurling
author: Rajeshwari-v
description: How to perform link unfurling with tab in a Microsoft Teams app.
ms.topic: conceptual
ms.author: surbhigupta
---

# Leverage link unfurling service for tabs

The collaborative experience of Teams platform  enhances with continuous addition of new features. A new UI component called **Stage View** is built in Teams that renders the content in full screen. **Stage View** provides a engaging experience. Use the **Stage View** to open the links and view the content within Teams itself instead of browser. 

This document guides you on how to leverage the existing link unfurling service to unfurl the URLs and pin them as tabs. 

## Add link unfurling to tabs
 
Link unfurling in tab provides engaging user experience within Teams context by keeping the content and the conversation in one place and displaying the contents in full-screen, called **Stage View** .

The **Stage View** leverages existing link unfurling service to unfurl URLs to Adaptive Cards that are pinned as tabs. When user selects the Adaptive Card, the content is opened in **Stage View** instead of the browser. The user can pin the URL as a tab from the **Stage View** or from the Adaptive Card directly.

When a user enters a URL, it is opened in a tab and unfurled into an Adaptive Card. The link opens in a task module or **Stage View** and keeps the user within Teams. The URL is pinned as a tab from the Stage View. 

You can use the link unfurling service to upgrade the website tab into a Teams app and configure a new website tab as an app.

## Invoke a Stage View through a deep link

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

## Tab information property

| Property name | Type | Number of characters | Description |
|:-----------|:---------|:------------|:-----------------------|
| entityId | String | 64 | A unique identifier for the entity that the tab displays. |
| name | String | 128 | The display neme of the tab in the channel interface. |
| contentUrl | String | 2048 | The https:// URL that points to the entity UI to be displayed in the Teams canvas. |
| websiteUrl? | String | 2048 | The https:// URL to point at if a user selects to view in a browser. |
| removeUrl? | String | 2048 | The https:// URL that points to the UI to be displayed when the user deletes the tab. |


## Tab link unfurling scenarios

The tab link unfurling service is used to turn any URL into a tab using an adaptive card and chat service. You can unfurl the link in tabs with the following scenarios:

**Tab link unfurling scenarios**

1. Use the tab link unfurling service to stage a URL in a new component. 

1. Pin a tab directly from the stage. 

1. Use the tab link unfurling service to upgrade the website tab into a Teams app 

1. Use the tab link unfurling service to configure a new website tab as an app. 
         
### 1. Open a stage from Adaptive Card and pin a tab

* When the user enters a URL, the bot is invoked and returns an Adaptive Card with the option to open the URL in a stage. 
* After a stage is launched, and the tab information is passed in, then you must add the ability to pin the stage as a tab.  

The following images display a stage opened from Adaptive Card and pinned in a tab:

![Open a stage from Adaptive Card](~/assets/images/tab-images/open-stage-from-adaptive-card.png)


![pin a tab](~/assets/images/tab-images/pin-a-tab.png)

### Schema for Adaptive Card

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

#### Schema for Adaptive Card

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

* Set `pinTab` to `true` for this workflow.

### 3. Deeplink to a stage

* The deeplink format is: https://teams.microsoft.com/l/stage/appId/0?context={ "contentURL": contentURL, "websiteURL": websiteURL, "title": title}
* The deeplink is resolved from deeplinkservice and open the stage.
* No option to pin the tab from here.
* Its difficult to include the entire `tabInfo` object in the deeplink URL.
* The `entityId` is `zero` in this case.

### 4. Open a stage with no option to pin the tab

You can open a stage with no option to pin the tab with the following schema:

* `OpenURL` action with the stage deeplink. It opens the stage with the URL.

### 5. OpenURL action which opens the URL in a browser 

#### Schema 

```json
{
  type: "Action.OpenUrl",  
 title: "View",
 url: contentUrl
}
```

### 6. Upgrade a website tab to an app

You can upgrade a website tab to an app. The following image displays how a website tab is upgraded to an app:

![upgrade a website tab to an app](~/assets/images/tab-images/upgrade-a-website-tab-to-an-app.png)

#### Schema 

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

### 5. Add a tab of an app instead of the website tab 
In this work flow, you can add a tab of an app instead of website tab. This work flow is same as [upgrade a website tab to an app](#upgrade-a-website-tab-to-an-app).   

The following image displays how to add a tab of an app instead of the website tab: 

![add a tab of an app instead of the website tab](~/assets/images/tab-images/add-tab-of-an-app-instead-of-website-tab.png)

## API

You must update the BOT SDK API.

## See also

> [!div class="nextstepaction"]
> [Messaging extensions link unfurling](~/messaging-extensions/how-to/link-unfurling.md)
