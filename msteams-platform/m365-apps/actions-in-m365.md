---
title: Actions in Microsoft 365
description: In this article, learn more about the function of Actions and its use cases. 
ms.date: 11/16/2023
ms.author: mosdevdocs
author: Vishnu
ms.topic: Conceptual
ms.subservice: m365apps
---
# Actions in Microsoft 365

> [!NOTE]
>
> * Actions for Microsoft 365 is available in [public developer preview](../resources/dev-preview/developer-preview-intro.md).
>
> * Actions is supported for Microsoft 365 apps on web and desktop clients only and isn't supported on Outlook and Microsoft Teams.

Actions enable your app to integrate seamlessly into the user's workflow and guide users to your app based on their intent and the content at hand, making task completion more efficient.
Actions help you enhance your app's visibility and engagement with minimal development effort and improve user productivity by streamlining task completion and reducing the need to switch contexts across various Microsoft 365 apps. For instance, your app can act immediately on content files, expanding the range of interactions users can have with their content.

You can extend your Teams app across Microsoft 365 using Actions. However, it's important to note that Actions function only in the Microsoft 365.

In the following graphic, the user intends to attach a Word document to the list in the **To do** app. The uses right-clicks on the Word document and select the **Add to** action. A dialog appears with the Word document attached, the user adds a note and select **Submit**. The Word document is added to the list in the **To do** app:

  :::image type="content" source="images/actions-in-m365-app.gif" alt-text="Graphic shows the user can add a file to the to-do list app with a note attached for a task to complete.":::

## Build Actions

Actions are the combination of intent, object, and handler. Actions represent the task that the user wants to perform where intent is the user’s desired action, object is the function to be executed, and handler is the way to perform the action on the object.

When you're creating an app ensure that you define user intent, choose the object to perform the action, and construct the corresponding handler that facilitates task completion for the user.

### Intent

Intent is the objective a user wants to perform or achieve, such as open or add. Microsoft 365 uses intent to display Actions in locations that align with the user’s needs and intentions. Intent determines the placement, grouping, and ordering of Actions. You can create an intent for Open, addTo, and custom actions. You can use custom Actions to create tailored Actions.

### Object

Object is the file on which the user wants to perform an action. Currently, Actions can be triggered on content objects (files) that have an extension, such as Word, PowerPoint, Excel, PDF, and images. The files must be available in OneDrive or SharePoint and are accessible through Microsoft Graph.

### Handlers

A handler is how the Action performs the user’s intent on the selected object. It provides the logic and functionality of the Action, creating a smooth and meaningful user experience.

The following are the avilable types of handlers:

* `openDialog`: Directs users to a dialog, offering a dedicated and contextualized interface for interacting with your app's features without opening the full app.
* `openPage`: Drive users to your app's dedicated pages (personal tab).

### Prerequisites

Ensure you install the following tools to build Actions in Microsoft 365:

| &nbsp; | Install | For using... |
| --- | --- | --- |
| &nbsp; | [Teams Toolkit](../toolkit/install-Teams-Toolkit.md) | A Microsoft Visual Studio Code extension that creates a project scaffolding for your app. Use the latest version. |
| &nbsp; | [Microsoft Teams](https://www.microsoft.com/microsoft-teams/download-app) | Microsoft Teams to collaborate with everyone you work with through apps for chat, meetings, and call-all in one place.|
| &nbsp; | [Node.js](https://nodejs.org/en/download/) | Back-end JavaScript runtime environment. For more information, see [Node.js version compatibility table for project type](~/toolkit/build-environments.md#nodejs-version-compatibility-table-for-project-type).|
| &nbsp; | [Microsoft Edge](https://www.microsoft.com/edge) (recommended) or [Google Chrome](https://www.google.com/chrome/) | A browser with developer tools. |
| &nbsp; | [Visual Studio Code](https://code.visualstudio.com/download) | JavaScript, TypeScript, or SharePoint Framework (SPFx) build environments. Use the latest version. |

### Create Actions

To create Actions for your app, follow these steps:

1. [Update app manifest](#update-app-manifest).
1. [Build the handler that retrieves Action information through context object](#build-the-handler-that-retrieves-action-information-through-context-object).
1. [Access content through Graph API](#access-content-through-graph-api).

#### Update app manifest

Define the intent, object, and handler for your actions in the app manifest schema (previously called Teams app manifest).

The following is an app manifest example for with `intent` and `supportedobjects` and `handlers` properties for `openPage` and `openDialog`:

* Action to open a page: Action shows related tasks in the **To-do** app based on the selected file. It uses `"intent": "custom"` to identify the file type, such as .xlsx or doc. The `"type": "openPage"` handler opens the app and navigates to the `pageId` and `subpageId` (need more information in code line no 96).

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
        }
    ]
    ```

* Action to open a dialog: Action lets you add a selected file and a note to the **To-do** app. It uses an `"intent": "addTo"` to identify the file type, such as .docx or .doc. The `"type": "openDialog"` handler opens a web-based dialog from the specified URL.

    ```json
    "actions": [
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

For more information, see [public developer preview app manifest schema](../resources/schema/manifest-schema-dev-preview.md#actions).

#### Create a handler

Update the handler to receive the Action information through the context object to create a seamless user experience for performing users specific tasks using the [Teams JavaScript library (TeamsJS)](/javascript/api/@microsoft/teams-js).

When a user selects Add option from the app's context menu, a page or dialog opens with the help of the `openDialog` property in the app manifest. Your app can access contextual information about the invoked Action from the `actionInfo` property of the context object `app.getContext()`.

```javascript
const context = await app.getContext();
const itemId = context.actionInfo && context.actionInfo.actionObjects[0].itemId;
this.setState({
    itemId: itemId
});
```

**Parameters**

| &nbsp; | Name | Description |
| --- | --- | --- |
| &nbsp; | `actionId` | Maps to the action id supplied inside the manifest. |
| &nbsp; | `actionObjects` | Array of corresponding action objects. |

* [`actionInfo`](/javascript/api/@microsoft/teams-js/actioninfo): The TeamsJS helps to enable your app to determine when a user opens a page or dialog from an Action, and the content that initiated the Action.

    ```javascript
    app.getContext().then((context: app.Context) => {
        const actionInfo = context.actionInfo;
        if (actionInfo && actionInfo.actionId == 'myActionId1') {
            // Handle specific action
        }
    });
    ```

#### [`M365ContentAction`interface](/javascript/api/@microsoft/teams-js/m365contentaction) (Need more information from Irene)

In order to not leak personal data to applications, only ids of the office content are passed to the app. Apps use these ids together with the fact that this is OfficeContent to query the Microsoft graph for more details.

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

**Properties**

| &nbsp; | Name | Description |
| --- | --- | --- |
| &nbsp; | `itemId` | Only office content IDs are passed to the app. Apps should use these ids to query the Microsoft graph for more details. |
| &nbsp; | `secondaryId` | Represents an optional secondary identifier for an action in a Microsoft 365 content item. |

#### Access content through Graph API

After obtaining the itemId of the triggering content, you can use the Graph API to read or modify the content, facilitating task completion for your users.

```javascript
async readActionItem() {
    try {
        return await this.graphClient.api(`/users/${this.objectId}/drive/items/${this.itemId}`).get();
    } catch (error) {
        console.log("readActionItem", error);
    }
}
```

## Build and run your app

After you update the app manifest, you can build and run your app in Teams Toolkit.

To build and run your app locally:

1. Open your app in Teams Toolkit.

1. From the left pane, select **Debug in the Microsoft 365 app (Edge) without backend** and enter **F5**.

   :::image type="content" source="images/actions-debug.png" alt-text="The screenshot shows actions in debug.":::

1. Select **Yes** if the following dialog appears:

   :::image type="content" source="~/assets/images/teams-toolkit-v2/first-tab/hw-warning.png" alt-text="Screenshot shows the microsoft warning.":::

A browser window opens with Microsoft 365 home page and your app is available under **Apps**.

You can now preview your Actions in Microsoft 365 app, right-click a file that is supported by your Actions. Actions appear in the context menu, for example **Add todo task**.

:::image type="content" source="images/actions-context-menu.png" alt-text="The screenshot shows the actions in context menu.":::

## Code sample

| **Sample name** | **Description** |**Node.js** |
|-----------------|-----------------|----------------|
| Actions in Microsoft 365 apps | This sample code describes the Actions in Microsoft 365 apps. |TBD|

## See also

[Extend Teams apps across Microsoft 365](overview.md)
