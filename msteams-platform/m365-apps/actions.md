---
title: Actions overview
description: In this article, learn more about the function of Actions and its use cases. 
ms.date: 10/11/2023
ms.author: mosdevdocs
author: mobajemu
ms.topic: Conceptual
ms.subservice: m365apps
---

> [!NOTE]
> The feature is only available for Microsoft 365 app on web and desktop clients.

Actions seamlessly integrate your app into the user's workflow, ensuring effortless discovery and smooth interaction with their content. By guiding users to your app based on their intent and contextual content, Actions facilitate efficient task completion. This integration increases your app's visibility and engagement with minimal development effort.

Building Actions give developers to enhance their user's productivity by streamlining task completion and reducing the need for context switching across various Microsoft 365 applications.

# Key benefits of Actions in Microsoft 365 applications

1. Enables them to accomplish tasks more efficiently.
1. Seamlessly integrates your app in their workflow. Increases app's visibility and user engagement of your app.
1. Empowers users to take immediate action on content files through your app, expanding the range of interactions users can have with their content.  

[Screenshot or Gif of Actions in action]  

## How Actions work

Actions are created through the integration of Intent, Object, and Handler. When a user intends to accomplish a task, it is represented as intent + object. The intent defines the user's desired action, and the object specifies the function to be executed.

As a developer, your role is to receive the user's intent and object input and construct the corresponding handler that facilitates task completion for the users.
To build an Action, you will define the intent, object, and handler of your actions in the manifest. And in your handler, use the [Teams JS library](/javascript/api/@microsoft/teams-js) to receive the Action information to create a seamless user experience for performing users specific tasks.  

### Intent

Intent is the objective a user wants to perform or achieve. User intent is typically represented by a verb, such as "open," or “add to.” This "intent" enables the M365 platform to display the Actions in locations that mostly align with the user's needs and intentions. This includes but not limited to, where Actions show up and how Actions are grouped or ordered.
We currently enable three main intents for Actions: “open”, “addTo”, and “custom”. With the "custom" intent, developers have the flexibility to build tailored Actions to fulfill any user task.

### Object

Object is the file on which the user wants to perform an action on. Currently, Actions can be triggered on content objects, files that has an extension, like Word, PowerPoint, Excel, PDF, images, etc., which reside in OneDrive and SharePoint that are accessible through Microsoft Graph.

### Handlers

A handler is the method or mechanism to fulfill the user's intent and perform the desired action on the specified object. It is responsible for implementing the logic and functionality of the Action, ensuring a seamless and meaningful user experience.

To support your users in the most meaningful way, we offer multiple types of handlers that you can build. You have the choice to direct users to the app’s page or enable them to complete tasks within a dialog.

Supported handlers:

* openDialog: This handler directs users to a dialog, offering a dedicated and contextualized interface for interacting with your app's features without opening the full app. This ensures a focused and efficient workflow, allowing users to complete tasks seamlessly within their current context.
* openPage: By using the openPage handler you can drive users to your app's dedicated pages(personal tab).

## How to build Actions

To build Actions to your existing Teams app follow these steps:

1. Update app manifest
1. Build the handler that retrieves Action information through context object
1. Access content object through Graph API

### Update app manifest

Add the following code after `staticTabs` property in the app manifest (previously called Teams app manifest).

In the following example code, two Actions are built:

* Action to open a page: Action shows related tasks in the **To-do** app based on the selected file. It uses a custom `intent` to identify the file type, such as .xlsx or doc. It has a handler type of **openPage** that opens the app and navigates to the specified `pageId` and `subpageId`.

* Action to open a dialog: Action lets you add a selected file and a note to the **To-do** app. It uses an `intent` type of **addTo** to identify the file type, such as .docx or .doc. It has a `handler` type of **openDialog** that opens a web-based dialog from the specified URL.

```json
"actions": [
    {
        // Defining Action to open a page
        "id": "relatedTasks",
        "displayName": "Related tasks",
        "intent": "custom",
        "description": "Shows tasks in the To do app that are related to this file.",
        "handlers": [
            {
                "type": "openPage",
                "supportedObjects": {
                    "file": {
                        "extensions": ["xlsx", "doc", "docx", "pdf", "pptx", "ppt"]
                    }
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
                    }
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
]
```
For more information, see public developer preview app manifest schema.

## Actions user scenarios

Let us walk through a user scenario of how users might interact with your app through Actions you develop and how the handler affects the workflow.

For background: The user is a supervisor at Northwind Traders with limited time for focused work. They start their day in the Microsoft 365 app, where they can easily access all of their content.  

### Scenario 1: Action opens a dialog

They see the latest Sales report for a supplier, 'Tokyo Trader,' and want to add it as an attachment in the supplier management system app built by Northwind Traders. Right clicking on the Word document, they choose the Action 'Add to supplier' built by Northwind Traders.  

:::image type="content" source="images/m365-actions-user-scenario-1-1.png" alt-text="The screenshot shows a right click menu displaying the Add To Action running on Microsoft 365 on web.":::

A dialog pops up where they select 'Tokyo Traders' and then click 'Add'. They are able to add the attachment quickly, without opening the document or app.  

:::image type="content" source="images/m365-actions-user-scenario-1-2.png" alt-text="The screenshot shows a pop-up dialog of the Northwind app for the user to add an attachement  running on Microsoft 365 on web.":::

### Scenario 2: Action opens page

On the same page, they notice the 'Q2 Top suppliers' Excel sheet and want to see which suppliers they work with are on this list.   They right-click on the Excel file, then click on the Action 'Related suppliers'.

:::image type="content" source="images/m365-actions-user-scenario-2-1.png" alt-text="The screenshot shows the right click menu displaying the Related supplier option running on Microsoft 365 on web.":::

The Northwind app opens, displaying the list of suppliers filtered to show only those that appear in the document.  This saves them time opening up the app and the Excel file and checking each item manually.

:::image type="content" source="images/m365-actions-user-scenario-2-2.png" alt-text="The screenshot shows the northwind app open, displaying the list of suppliers filtered to show only those that appear in the document running on Microsoft 365 on web.":::

# How to build Actions

To add an Action to your existing Teams app, you must:

> [!div class="checklist"]
>
>* Define Actions in the manifest
>* Build the handler that retrieves Action information through context object
>* Access content object through Graph API




## Build the handler that retrieves Action information through context object

A handler implements the logic and functionality of the Action, it performs the desired intent on the specified object. Based on the handler type, your app can implement specific app logic:   
* With `open page` handler type, will direct users to your app’s launch page based on the `pageId` and `subPageId` defined in the manifest.
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
|`itemId` | IDs of the content are passed to the app. Apps should use these ids to query the Microsoft graph for more details.|
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
> When constructing an action that directs the user to a dialog, you can utilize the [dialog.url.submit( )](/javascript/api/@microsoft/teams-js/dialog.url#@microsoft-teams-js-app-getcontext) API to close the dialog when the user clicks a button. However, it's important to note that using the submit() API in your app's in the Action triggered dialog will not allow data to be sent back to the launch page.

## Test and Deploy your Actions

Once you have defined the Action in the app manifest, build the handler that retrieves the Action information through the context object, and have access to the content object through Graph Api, it’s time to see your Action in action.

### Test you Actions

To test you Actions:
1.	[**Enroll your Microsoft 365 tenant in Microsoft 365 Targeted Release**](prerequisites.md#install-microsoft-365-apps-in-your-test-environment). Only Targeted Release users will be able to experience Actions in Microsoft 365 app. 
1.	**Sideload your app using Teams Toolkit**. With a developer account In the Microsoft 365 app, go to **Run and Debug (Ctrl+Shift+D)**, and choose **Debug**  to run and test your Actions. It will automatically open up Microsoft 365 app in a browser window and install this app with Actions to your account.  
    :::image type="content" source="images/vs-actions-debugger.png" alt-text="The screenshot is an example of the dubugger tool running in Visual Studio code on windows.":::
    > [!NOTE]
> If you are not seeing the option Debug in the Microsoft 365 app, check out your set up in the launch.json. see sample code here. 
1. **Test your action with the Microsoft 365 app**. You can now preview your new content action by opening the [Microsoft 365 app](https://www.microsoft365.com/) and right clicking a file that is supported by your action. Your action should appear in the context menu.
    :::image type="content" source="images/m365-actions-add-to-supplier.png" alt-text="The screenshot shows the right click menu displaying the Add to Supplier option running on Microsoft 365 on web.":::
### Enable Actions for your users

To enable Actions for end users through tenant admins:
1. upload the app package containing the Actions via the [Microsoft Admin Center](https://admin.microsoft.com/)
1.Enable the app for targeted release to users in the tenant
1. In the Microsoft 365 admin center, navigate to **settings** > **integrated apps** > select **upload custom apps** to upload app
[Insert demo video of admin flow here]