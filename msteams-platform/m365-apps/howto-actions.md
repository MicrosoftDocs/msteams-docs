---
title: How to build Actions
description: In this documentation, you will learn to build Actions.
ms.date: 10/11/2023
ms.author: mosdevdocs
author: mobajemu
ms.topic: Conceptual
ms.subservice: m365apps
---
# How to build Actions

In this article we will walk through the three stepto add an Action to your existing Teams app:
  
* Define Actions in the manifest
* Build the handler that retrieves Action information through context object
* Access content object through Graph API

## Define Actions in the manifest

To make an action show up in the context menu when the user right-clicks on a piece of content in Microsoft 365 app, you simply add a json payload in the Manifest, where you define the user intent, object type and the handler that will trigger.

Here is a sample manifest that builds the two Actions in the above user experience section. [Link to the sample manifest in Github](https://github.com/OfficeDev/m365-msteams-actions-preview/blob/main/sample/appPackage/manifest.json%22/t%22_blank)

Sample manifest with 2 Actions: 

In this sample code:

Action “Add todo task”, uses “addTo” intent and supports files with extensions “.docx”, “.doc”, etc. It has handler type “openDialog” and will open an HTML based dialog as from the url address.

Action “Related suppliers”, uses “custom” intent, supports files with extensions “.xlsx”. It has handler type “openPage” and will open the App, and navigate to the page as defined in the pageId and subpageId.   

```json
{  
  "$schema": "https://raw.githubusercontent.com/OfficeDev/microsoft-teams-app-schema/preview/DevPreview/MicrosoftTeams.schema.json",  
  "manifestVersion": "devPreview",  
  
   ...  
  "actions": [  
    {  
      "id": "relatedTasks",  
      "displayName": "Related tasks",  
      "intent": "custom",  
      "description": "Shows tasks in the To do app that are related to this file. ",  
      "handlers": [  
        {  
          "type": "openPage",  
          "supportedObjects": {  
            "file": {  
              "extensions": ["xlsx", "doc", "docx", "pdf", "pptx", "ppt"]  
            },  
          },  
          "pageInfo": {  
            "pageId": "index",  
            "subPageId": ""  
          }  
        }  
      ]  
    },  
    {  
      "id": "addTodoTask",  
      "displayName": "Add todo task",  
      "intent": "addTo",  
      "description": "Add this file with a short note to my to do list",  
      "handlers": [  
        {  
          "type": "openDialog",  
          "supportedObjects": {  
            "file": {  
              "extensions": ["xlsx", "doc", "dot", "docx", "pdf", "pptx", "ppt"]  
            },  
          },  
          "dialogInfo": {  
            "dialogType": "url",  
            "url": "http://localhost:53000/index.html#/dialogPage",  
            "width": "small",  
            "height": "large"  
          }  
        }  
      ]  
    }  
  ],
...
  }  
```

For a comprehensive breakdown of each field in the manifest, kindly refer to the reference page. 

> [!NOTE]
> Since this feature is in preview, please use devPreview version manifest, by setting the $schema and manifestVersion as below.

During preview, please use developer preview manifest $schema: 
```json
"$schema": "https://raw.githubusercontent.com/OfficeDev/microsoft-teams-app-schema/preview/DevPreview/MicrosoftTeams.schema.json",
```

During preview, please use this verion of the developer preview manifest schema:
```json
"manifestVersion": "devPreview",  
```

## Build the handler that retrieves Action information through context object

[A "handler" is the method or mechanism to fulfill the user's intent and perform the desired action on the specified object. It is responsible for implementing the logic and functionality of the Action, ensuring a seamless and meaningful user experience.] = rework

Based on the handler type:   

With `open page` handler type, will direct users to your app’s launch page based on the pageId and subPageId defined in the manifest.

The `open dialog` handler will create an HTML-based dialog for users to seamlessly complete tasks within the dialog itself.   

Once your app's page or dialog is launched, your app can access contextual information about the invoked Action from the actionInfo property of the Context object (returned from a call to app.getContext()).

### What is ActionInfo in context object?

The Microsoft Teams JavaScript client library (TeamsJS) enables your app to determine when a page or dialog was opened from an Action, and the content being  triggred.

The following table provides the list of app.Context API parameters (Context interface) and functions along with their descriptions:

| Parameter| Description|
| --- | --- |
|`actionInfo` (ActionInfo interface) <br>| A new property actionInfo has been added to the app.Context object to represent the action by which your app was invoked.</br> <br> - `actionId` : string (Maps to the action id supplied inside the manifest) </br> <br> - `actionObjects` : BaseActionObject<M365Content>[] (Array of corresponding action objects) </br>|
|`M365ContentAction` (M365ContentAction interface)| - `itemId`: IDs of the content are passed to the app. Apps should use these ids to query the Microsoft graph for more details. (See the below section for how you can use itemId to retrieve the content info) <br> - `secondaryId`: Represents an optional secondary identifier for an action in a Microsoft 365 content item.</br> |

```javascript
export enum ActionObjectType {
    Future = 'future',
    M365Contenet = 'm365content',
}

export interface BaseActionObject<T extends ActionObjectType> {
    type: T;
}

export interface M365ContentAction extends BaseActionObject<ActionObjectType.M365Content>{
// In order to not leak person data to applications, only ids of the
// office content is passed to the app. Apps use these ids together with the fact
// that this is OfficeContent to query the Microsoft graph for more details.
//
// In the future, we may need to support "ExternalContent" or "MailContent" etc.
// and would also use the types as hints on which cloud api to call to get more info 
    itemId: string;
    secondaryId?: SecondaryId;
}

// These correspond with field names in the MSGraph
export enum SecondaryM365ContentIdName {
    DriveId = 'driveId',
    GroupId = 'groupId',
    SiteId = 'siteId',
    UserId = 'userId',
}

// This is just an example of how future Actions could be added, not for checkin
export interface FutureAction extends BaseActionObject<ActionObjectType.Future> {
foo: string?
}
```

More details see the reference or the image below

### Sample code getting the Action info from context

Applications can access the context object using app.getContext. Once an application has the context object, it can do the following things:

**Check if the app was launched using an Action:**

```javascript
app.getContext().then((context: app.Context) => {
  const actionInfo = context.actionInfo;
  if (actionInfo) {
      // App was launched using an action
  }
})
```

**Check the actionId was linked to the action that launched the application**

```javascript
app.getContext().then((context: app.Context) => {
    const actionInfo = context.actionInfo;
    if (actionInfo && actionInfo.actionId == 'myActionId1`) {
        // Handle specific action
    }
})
```

**Determine the type of an Action and access its type specific data**

```javascript
app.getContext().then((context: app.Context) => {
    const actionInfo = context.actionInfo;
    if (actionInfo) {
        if (actionInfo.actionObject.type == app.ActionObjectType.M365Content) {
            const m365Action: app.M365ContentAction = actionInfo.actionObject;
            // Get the requested content from Mirosoft Graph by item id: ${m365Action.itemId};
        }
    } 
})
```

Link to sample code: get context

## Access content through Graph API

After obtaining the itemId of the triggering content, you can leverage the Graph API to read or modify the content, facilitating task completion for your users. Sample code: fetch data,  call Graph API  

### (Optional step) Close the dialog

When constructing an action that directs the user to a dialog, you can utilize the dialog.url.submit( ) API to close the dialog when the user clicks a button.

However, it's important to note that using the submit() API in your app's in the Action triggered dialog will not allow data to be sent back to the launch page.

## Test your Actions

### Enroll your account into Targeted Release

For this preview, only targeted release users will be able to experience Actions in Microsoft 365 app. Make sure your account is in Targeted Release before trying it out. To enroll in Targeted release, please refer to Set up the Standard or Targeted release options - Microsoft 365 admin | Microsoft Learn 

### Sideload your app using Teams Toolkit

To run and test your actions using your developer account during development. Simply go to Run and Debug (Ctrl+Shift+D), and choose Debug in the Microsoft 365 app.

It will automatically open up Microsoft 365 app in a browser window and install this app with Actions to your account.  

Note: If you are not seeing the option Debug in the Microsoft 365 app, check out your set up in the launch.json, see sample code here. 

### Test your action with Microsoft 365 app

You can now preview your new content action by opening the Microsoft 365 app (https://www.microsoft365.com/) and right-clicking a file that is supported by your action. Your action should appear in the context menu.

## Enable Actions for your users

To enable Actions for end users through tenant admins:
* upload the app package containing the Actions via the Microsoft Admin Center (admin.microsoft.com)
* Enable the app for targeted release to users in the tenant
* In the Microsoft 365 admin center, navigate to settings > integrated apps > select upload custom apps

During this preview, we offer the opportunity for your Actions to be delivered to end users through tenant admins.

[Insert demo video of admin flow here] 