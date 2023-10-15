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

To add an Action to your existing Teams app, you must:
  
* Define Actions in the manifest
* Build the handler that retrieves Action information through context object
* Access content object through Graph API

## Define Actions in the manifest

For an Action to appear in the context menu of your M365 app (when a user right clicks on a file), you must add a JSON payload in the app manifest. In the Manifest, you define the user intent, object type, and the handler that will trigger.

Here is a sample manifest code that builds two Actions:
* An Action that [opens a page](about-actions.md#open-page)
* An Action that [opens a dialog](about-actions.md#open-dialog)

```json
{  
  "$schema": "https://raw.githubusercontent.com/OfficeDev/microsoft-teams-app-schema/preview/DevPreview/MicrosoftTeams.schema.json",  
  "manifestVersion": "devPreview",  
  
   ...  
  "actions": [  
    {
// Definign Action to open a page
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
// Defining Action to open a dialog
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

In the sample code:
* Action “related task”, uses “custom” `intent` to show tasks in the To-do app that are related to the selected `object` (file). The `object` type (file type) supported by this Action have the extension types   “.xlsx”, “doc”, etc. It has `handler` type “openPage” to open the App and navigate to the page as defined in the pageId and subpageId.
* Action “add todo task”, uses `Intent` type “addTo”, to add the selected `object`  with a short note on the To-do app. The `object` type supported by this Action have the extension types “.docx”, “.doc”, etc. It has `handler` type “openDialog” to open an HTML based dialog from the URL address defined.

Refer to the [refrence page]() for a comprehensive breakdown of each field in the manifest. 

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

A handler implements the logic and functionality of the Action, it performs the desired intent on the specified object. Based on the handler type, your app can implement specific app logic:   
*With `open page` handler type, will direct users to your app’s launch page based on the `pageId` and `subPageId` defined in the manifest.
*The `open dialog` handler will create an HTML-based dialog for users to seamlessly complete tasks within the dialog itself.   

Once your app's page or dialog is launched, your app can access contextual information about the invoked Action from the actionInfo property of the Context object (returned from a call to app.getContext()).

> [!NOTE]
> The Microsoft Teams JavaScript client library (TeamsJS) enables your app to determine when a page or dialog was opened from an Action, and the content being  triggered.

The following tables provides the list of app.Context API parameters (Context interface) and functions along with their descriptions:
`actionInfo` a property of app.Context object to represent the action by which your app was invoked.
|Property| Description|
| --- | --- |
|`actionId` | Maps to the action id supplied inside the manifest |
|`actionObjects`| Array of corresponding action objects|

`M365ContentAction`interface, stores information needed to represent M365 Content stored in OneDrive or SharePoint.

|Property| Description|
| --- | --- |
|`itemId` | IDs of the content are passed to the app. Apps should use these ids to query the Microsoft graph for more details.|
|`secondaryId`| Represents an optional secondary identifier for an action in a Microsoft 365 content item.|

For more details [see the Context interface reference]() or the following code.

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
### Sample code getting the Action info from context

Applications can access the context object using `app.getContext`.
Once an application has the context object, it can …

**Check if the app was launched using an Action:**

```javascript
app.getContext().then((context: app.Context) => {
  const actionInfo = context.actionInfo;
  if (actionInfo) {
      // App was launched using an action
  }
})
```

**Check the actionId that was linked to the action that launched the application**

```javascript
app.getContext().then((context: app.Context) => {
    const actionInfo = context.actionInfo;
    if (actionInfo && actionInfo.actionId == 'myActionId1`) {
        // Handle specific action
    }
})
```

**Determine the type of Action its type specific data**

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

After obtaining the `itemId` of the triggering content, you can leverage the Graph API to read or modify the content, facilitating task completion for your users. 

> [!NOTE]
> When constructing an action that directs the user to a dialog, you can utilize the dialog.url.submit( ) API to close the dialog when the user clicks a button. However, it's important to note that using the submit() API in your app's in the Action triggered dialog will not allow data to be sent back to the launch page.

## Test and Deploy your Actions

Once you have defined the Action in the app manifest, build the handler that retrieves the Action information through the context object, and have access to the content object through Graph Api, it’s time to see your Action in action.

## Test you Actions

To test you Actions:
1.	[**Enroll your Microsoft 365 tenant in Microsoft 365 Targeted Release**](prerequisites.md#install-microsoft-365-apps-in-your-test-environment). Only Targeted Release users will be able to experience Actions in Microsoft 365 app. 
1.	**Sideload your app using Teams Toolkit**. With a developer account In the Microsoft 365 app, go to **Run and Debug (Ctrl+Shift+D)**, and choose **Debug**  to run and test your Actions. It will automatically open up Microsoft 365 app in a browser window and install this app with Actions to your account.  
    > [!NOTE]
> If you are not seeing the option Debug in the Microsoft 365 app, check out your set up in the launch.json. see sample code here. 
1. **Test your action with the Microsoft 365 app**. You can now preview your new content action by opening the [Microsoft 365 app](https://www.microsoft365.com/) and right clicking a file that is supported by your action. Your action should appear in the context menu.
    
### Enable Actions for your users

To enable Actions for end users through tenant admins:
1. upload the app package containing the Actions via the Microsoft Admin Center (admin.microsoft.com)
1.Enable the app for targeted release to users in the tenant
1. In the Microsoft 365 admin center, navigate to **settings** > **integrated apps** > select **upload custom apps** to upload app
[Insert demo video of admin flow here]