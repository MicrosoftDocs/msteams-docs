---
title: Tabs- Link unfurling
author: Rajeshwari-v
description: How to perform link unfurling with tab in a Microsoft Teams app.
ms.topic: conceptual
ms.author: surbhigupta12
---

# Leverage link unfurling service for tabs

The collaborative experience of Teams platform  enhances with added new features continuously. A  new UI component called **Stage View** is built in Teams which renders the content in full screen. **Stage View** provides a engaging experience to users as they need not go out of Teams to open a link and view the content. You can open links in a Teams stage-view instead of the browser

This document guides you on how to leverage the existing link unfurling service to unfurl the URLs and pin them as tabs. 

## Add link unfurling to tabs
 
Link unfurling in tab provides engaging user experience within Teams context by keeping the content and the conversation in one place by displaying the contents in full-screen, called **Stage View** .

The **Stage View** leverages existing link unfurling service to unfurl URLs to Adaptive Cards that are pinned as tabs. When user selects the Adaptive Card, the content is opened in **Stage View** instead of the browser. The user can pin the URL as a tab from the **Stage View** or from the Adaptive Card directly.

When a user enters a URL, it is opened in a tab and unfurled into an Adaptive Card. The link opens in a task module or **Stage View** and keeps the user within Teams. The URL is pinned as a tab from the Stage View. 

You can use the link unfurling service to upgrade the website tab into a Teams app and configure a new website tab as an app.

## Invoke a Stage View through a deep link

**Stage View** is a large canvas that you can invoke to surface the web content.

To invoke the deep link from your tab, you must wrap the deep link URL in our `microsoftTeams.executeDeeplink(url)` API.

### Syntax 

The deeplink must follow the following syntax:
https://teams.microsoft.com/l/stage/{appId}/0?context={“contentUrl”:”[contentUrl]”,“websiteUrl”:”[websiteUrl]”, “title”:”[title]”}

### Examples

#### Example 1:

https://teams.microsoft.com/l/stage/2a527703-1f6f-4559-a332-d8a7d288cd88/0?context={“contentUrl”:”https%3A%2F%2Fmicrosoft.sharepoint.com%2Fteams%2FLokisSandbox%2FSitePages%2FSandbox-Page.aspx”, “websiteURL”:”https%3A%2F%2Fmicrosoft.sharepoint.com%2Fteams%2FLokisSandbox%2FSitePages%2FSandbox-Page.aspx”, “title”:”Contoso”}

#### Example 2:

https://teams.microsoft.com/l/Meeting_Stage/2a527703-1f6f-4559-a332-d8a7d288cd88/0?context={“contentUrl”:”https%3A%2F%2Fmicrosoft.sharepoint.com%2Fteams%2FLokisSandbox%2FSitePages%2FSandbox-Page.aspx”, “websiteURL”:”https%3A%2F%2Fmicrosoft.sharepoint.com%2Fteams%2FLokisSandbox%2FSitePages%2FSandbox-Page.aspx”, “title”:”Contoso”}

> [!NOTE]
> The `title` is optional in the deeplink. If you donot include the `title`, your app name replaces it.
## Tab link unfurling scenarios


Following are the scenarios under which a link is unfurled and pinned as Tab:

1. Build a tab link unfurling service that can be used to turn any URL into a tab using an adaptive card and chat service. 

1. Use the tab link unfurling service to stage a URL in a new component. 

1. Pin a tab directly from the stage. 

1. Use the tab link unfurling service to upgrade the website tab into a Teams app 

1. Use the tab link unfurling service to configure a new website tab as an app. 


## Tab information property              





## Open a stage from the Adaptive Card and pin a tab

* When the user enters a URL, the bot is invoked and returns an Adaptive Card with the option to open the URL in a stage. 
* After a stage is launched, and the tab information is passed in, then you must add the ability to pin the stage as a tab.

### Schema for Adaptive Card




The invoke type should be of `composeExtension/queryLink` type. It is like the current `appLinking` workflow. 

The `overflow to true` decides whether the button will show up as an overflow in the card or as a button in the body of the card. 

**Workflow**

1. `Invoke` request to bot  
    * Type: “composeextension/queryLink".
1. `Invoke` response from bot  
    * Contains Adaptive Card with type `tab` or `tabInfoAction` in it.
1.	When the user selects **View**, that sends an `invoke` request to bot. 
1. The bot can respond with a `200` code.

## Pin a tab directly from the Adaptive Card through a button or overflow

* When the user enters a URL, it invokes a bot.The bot returns an Adaptive Card with the option to pin it as a tab.
* The overflow to true decides whether the button shows up as an overflow in the card or as a button in the body of the card.

### Schema for Adaptive Card





* Set `pinTab` to `true` for this workflow.

## Deeplink to a stage

•	This is the deeplink format : https://teams.microsoft.com/l/stage/appId/0?context={ "contentURL": contentURL, "websiteURL": websiteURL, "title": title}
•	We resolve the deeplink from our deeplinkservice and open the stage.
•	No option to pin the tab from here.
•	 Its difficult to include the entire tabInfo object in the deeplink URL.
•	The entityId will be 0 in this case.

## Open a stage with no option to pin the tab

You can open a stage with no option to pin the tab with the following schema:

* `OpenURL` action with the stage deeplink. It opens the stage with the URL.

##  OpenURL action which opens the url in a browser 
Schema for this will be: 



## Upgrade a website tab to an app

Schema 


* When there is a website tab that matches an app, you get **Use the app** option in a banner. 

If you select **Use the app**, it triggers an `invoke` request to the bot. You can use  `handleExecuteBotQuery` API to get the response from bot.

When you send an`invoke` request of `tab/tabInfoFetch`, the bot sends the `tabInfo` as part of the response. You can use the tab information to update the website tab to an app.

## Add a tab of an app instead of the website tab. 

Similar to the above scenario.

## API
You must update the bot SDK API.


