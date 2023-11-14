---
title: How to build Actions in Microsoft 365
description: In this documentation, you will learn to build Actions.
ms.date: 11/12/2023
ms.author: mosdevdocs
author: mobajemu
ms.topic: Conceptual
ms.subservice: m365apps
---
# How to build Actions in Microsoft 365

To add an Action to your existing Teams app, you must:

> [!div class="checklist"]
>
>* Define Actions in the manifest
>* Build the handler that retrieves Action information through context object
>* Access content object through Graph API

## Define Actions in the manifest

For an Action to appear in the context menu of your Microsoft 365 app (when a user right clicks on a file), you must add a JSON payload in the app manifest. In the manifest, you define the user intent (purpose of Action), object type (file type), and the handler (Action logic) that will trigger.

In the manifest you must provide:

* `id` : the unique id that defines the action in your code.
* `displayName`: the name your Action would appear as in the context menu to users.
* `intent`: The user task to be completed. There are three intent types supported for Actions: “open”, “addTo”, and “custom”. With the "custom" intent, you have the flexibility to build tailored Actions to fulfill any user task.
* `description`: a short description of the purpose of the Action .
* `handlers`: The logic and functionality of the Action. There are currently two types of handlers, openDialog and openPage. For more information on the capabilities of the handler and which choice that best fits your Action, please refer to the [Actions overview documentation](actions.md#handler-user-scenarios). Once you have chosen the best `handler` that alligns with your `intent`, you must define it in `type`. You must further specifiy which object type your users can use you Actions on by specifiying the `extentions`.


In this sample manifest code, two Actions are built, an Action that [opens a page](actions.md#handlers) and an Action that [opens a dialog](actions.md#handlers).

```json
{  
  "$schema": "https://raw.githubusercontent.com/OfficeDev/microsoft-teams-app-schema/preview/DevPreview/MicrosoftTeams.schema.json",  
  "manifestVersion": "devPreview",  
  
   ...  
  "actions": [  
    {
// Defining Action to open a page
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

Action “related task”, uses “custom” `intent` to show tasks in the To-do app that are related to the selected `object` (file). The `object` type (file type) supported by this Action have the extension types   “.xlsx”, “doc”, etc. It has `handler` type “openPage” to open the App and navigate to the page as defined in the pageId and subpageId.

Action “add todo task”, uses `intent` type “addTo”, to add the selected `object` with a short note on the To-do app. The `object` type supported by this Action have the extension types “.docx”, “.doc”, etc. It has `handler` type “openDialog” to open an HTML based dialog from the URL address defined.

Refer to the [refrence page](/javascript/api/@microsoft/teams-js/app) for a comprehensive breakdown of each field in the manifest. 

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
* With `open page` handler type, the Action will direct users to your app’s launch page based on the `pageId` and `subPageId` defined in the manifest.
* The `open dialog` handler will create an HTML-based dialog for users to seamlessly complete tasks within the dialog itself.  

Once your app's page or dialog is launched, your app can access contextual information about the invoked Action from the [actionInfo](/javascript/api/@microsoft/teams-js/actioninfo) property of the [Context object](/javascript/api/@microsoft/teams-js/app.context) (returned from a call to [app.getContext()](/javascript/api/@microsoft/teams-js/app#@microsoft-teams-js-app-getcontext)).

> [!NOTE]
> The Microsoft Teams JavaScript client library (TeamsJS) enables your app to determine when a page or dialog was opened from an Action, and the content being triggered.

The following tables provides the list of app.Context API parameters (Context interface) and functions along with their descriptions:

[`actionInfo`](/javascript/api/@microsoft/teams-js/actioninfo) a property of [app.Context](/javascript/api/@microsoft/teams-js/app.context) object to represent the action by which your app was invoked.

|Property| Description|
| --- | --- |
|`actionId` | Maps to the action id supplied inside the manifest |
|`actionObjects`| Array of corresponding action objects|

[`M365ContentAction`interface](/javascript/api/@microsoft/teams-js/m365contentaction), stores information needed to represent M365 Content stored in OneDrive or SharePoint.

|Property| Description|
| --- | --- |
|`itemId` | Id's of the content are passed to the app. Apps should use these ids to query the Microsoft graph for more details.|
|`secondaryId`| Represents an optional secondary identifier for an action in a Microsoft 365 content item.|

For more details [see the Context interface reference](/javascript/api/@microsoft/teams-js/app.context) or the following code.

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

Applications can access the context object using [app.getContext](/javascript/api/@microsoft/teams-js/app#@microsoft-teams-js-app-getcontext).

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

## Access content through Graph API

After obtaining the `itemId` of the triggering content, you can leverage the Graph API to read or modify the content, facilitating task completion for your users. 

> [!NOTE]
> When constructing an Action that directs the user to a dialog, you can utilize the [dialog.url.submit( )](/javascript/api/@microsoft/teams-js/dialog.url#@microsoft-teams-js-app-getcontext) API to close the dialog when the user clicks a button. However, it's important to note that using the submit() API in your app's in the Action triggered dialog will not allow data to be sent back to the launch page.

## Test and Deploy your Actions

Once you have defined the Action in the app manifest, built the handler that retrieves the Action information through the context object, and have access to the content object through Graph API, it’s time to see your Action in action.

### Test you Actions

To test you Action:
1.	[**Enroll your Microsoft 365 tenant in Microsoft 365 Targeted Release**](prerequisites.md#install-microsoft-365-apps-in-your-test-environment). Only Targeted Release users will be able to experience Actions in Microsoft 365 app. 
1.	**Sideload your app using Teams Toolkit**. With a developer account In the Microsoft 365 app, go to **Run and Debug (Ctrl+Shift+D)**, and choose **Debug**  to run and test your Actions. It will automatically open up Microsoft 365 app in a browser window and install this app with Actions to your account.  
    :::image type="content" source="images/vs-actions-debugger.png" alt-text="The screenshot is an example of the dubugger tool running in Visual Studio code on windows."::: 
1. **Test your action with the Microsoft 365 app**. You can now preview your new content action by opening the [Microsoft 365 app](https://www.microsoft365.com/) and right clicking a file that is supported by your action. Your action should appear in the context menu.

    :::image type="content" source="images/m365-actions-add-to-supplier.png" alt-text="The screenshot shows the right click menu displaying the Add to Supplier option running on Microsoft 365 on web.":::

### Enable Actions for your users

To enable Actions for end users through tenant admins:
1. Upload the app package containing the Actions via the [Microsoft Admin Center](https://admin.microsoft.com/)
1. Enable the app for targeted release to users in the tenant
1. In the Microsoft 365 admin center, navigate to **settings** > **integrated apps** > select **upload custom apps** to upload app