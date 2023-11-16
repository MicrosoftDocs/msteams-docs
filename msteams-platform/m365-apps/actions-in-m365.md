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
> * Actions for Microsoft 365 is available in [public developer preview](../resources/dev-preview/developer-preview-intro.md)
>
> * Actions is supported for Microsoft 365 apps on web and desktop clients only and isn't supported on Outlook and Microsoft Teams.

Actions seamlessly integrate your app into the user's workflow, ensuring effortless discovery and smooth interaction with their content. By guiding users to your app based on their intent and contextual content, Actions facilitate efficient task completion. Which integration increases your app's visibility and engagement with minimal development effort.

Actions enhance user's productivity by streamlining task completion and reducing the need for context switching across various Microsoft 365 applications.

You can create an Teams app extensible across Microsoft 365 with the Actions feature. However Actions will only work in Microsoft 365 hub.

With Actions users can:

* Accomplish tasks more efficiently.
* Seamlessly integrates your app into users workflow, increasing app's visibility and user engagement.
* Take immediate action on content files through your app, expanding the range of interactions they can have with their content.  

  :::image type="content" source="images/actions-in-m365-app.gif" alt-text="Graphic shows the user can add a file to the to-do list app with a note attached for a task to complete.":::

## Understand how Actions work

Actions are the combination of Intent, Object, and Handler. Actions represent the task that the user wants to perform where Intent is the user’s desired action, Object is the function to be executed, and Handler is the way to perform the action on the object.

When your creating an app ensure that you define user intent, and choose the object to perform the action, and construct the corresponding handler that facilitates task completion for the user.

### Intent

Intent is the objective a user wants to perform or achieve. User intent is typically represented as open or add to. Intent enables the Microsoft 365 platform to display the Actions in locations that mostly align with the user's needs and intentions. This includes but not limited to, where Actions show up and how Actions are grouped or ordered.
We currently enable three main intents for Actions: Open, addTo, and custom. With the custom intent, developers have the flexibility to build tailored Actions to fulfill any user task.

### Object

Object is the file on which the user wants to perform an action on. Currently, Actions can be triggered on content objects, files that have an extension, like Word, PowerPoint, Excel, PDF, and images. Which reside in OneDrive and SharePoint that are accessible through Microsoft Graph.

### Handlers

A handler is how the Action performs the user’s intent on the selected object. It provides the logic and functionality of the Action, creating a smooth and meaningful user experience.

You can choose between two types of handlers:

* openDialog: This handler directs users to a dialog, offering a dedicated and contextualized interface for interacting with your app's features without opening the full app.
* openPage: By using the openPage handler, you can drive users to your app's dedicated pages(personal tab).

## Prerequisites

Ensure you install the following tools for building Actions in Microsoft 365.

| &nbsp; | Install | For using... |
| --- | --- | --- |
| **Required** | &nbsp; | &nbsp; |
| &nbsp; | [Install Teams Toolkit](../toolkit/install-Teams-Toolkit.md) | A Microsoft Visual Studio Code extension that creates a project scaffolding for your app. Use the latest version. |
| &nbsp; | [Microsoft Teams](https://www.microsoft.com/microsoft-teams/download-app) | Microsoft Teams to collaborate with everyone you work with through apps for chat, meetings, and call-all in one place.|
| &nbsp; | [Node.js](https://nodejs.org/en/download/) | Back-end JavaScript runtime environment. For more information, see [Node.js version compatibility table for project type](~/toolkit/build-environments.md#nodejs-version-compatibility-table-for-project-type).|
| &nbsp; | [Microsoft Edge](https://www.microsoft.com/edge) (recommended) or [Google Chrome](https://www.google.com/chrome/) | A browser with developer tools. |
| &nbsp; | [Visual Studio Code](https://code.visualstudio.com/download) | JavaScript, TypeScript, or SharePoint Framework (SPFx) build environments. Use the latest version. |
| **Optional** | &nbsp; | &nbsp; |
| &nbsp; | [Azure Tools for Visual Studio Code](https://marketplace.visualstudio.com/items?itemName=ms-vscode.vscode-node-azure-pack) and [Azure CLI](/cli/azure/install-azure-cli) | Azure tools to access stored data or to deploy a cloud-based backend for your Teams app in Azure. |

## How to build Actions

To build Actions to your existing Teams app follow these steps:

1. Update app manifest
1. Build the handler that retrieves Action information through context object
1. Access content object through Graph API

### Update app manifest

1. Define the intent, object, and handler for your actions in the app manifest schema (previously called Teams app manifest).

1. Update the handler to receive the Action information to create a seamless user experience for performing users specific tasks using the [Teams JavaScript library (TeamsJS)](/javascript/api/@microsoft/teams-js).

In the following example, two Actions are built:

* Action to open a page: Action shows related tasks in the **To-do** app based on the selected file. It uses a custom `intent` to identify the file type, such as .xlsx or doc. It has a handler type of **openPage** that opens the app and navigates to the specified `pageId` and `subpageId`.

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

* Action to open a dialog: Action lets you add a selected file and a note to the **To-do** app. It uses an `intent` type of **addTo** to identify the file type, such as .docx or .doc. It has a `handler` type of **openDialog** that opens a web-based dialog from the specified URL.

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

For more information, see public developer preview app manifest schema.

### Build the handler that retrieves Action information through context object

* Open page handler: Handler is directed to app’s launch page based on the pageId and subPageId defined in the manifest.

* Open dialog handler: HTML-based dialog that enables app to complete tasks seamlessly within the dialog itself.

Once your app's page or dialog is launched, your app can access contextual information about the invoked Action from the `actionInfo` property of the context object `app.getContext()`.

```javascript
const context = await app.getContext();
const itemId = context.actionInfo && context.actionInfo.actionObjects[0].itemId;
this.setState({
    itemId: itemId
});
```

### Access content through Graph API

After obtaining the itemId of the triggering content, you can leverage the Graph API to read or modify the content, facilitating task completion for your users.

```javascript
async readActionItem() {
    try {
        return await this.graphClient.api(`/users/${this.objectId}/drive/items/${this.itemId}`).get();
    } catch (error) {
        console.log("readActionItem", error);
    }
}
```

## Test your Actions in Microsoft 365 apps

You can now preview your Actions in Microsoft 365 app by right-clicking a file that is supported by your Actions. Actions will appear in the context menu.

:::image type="content" source="images/actions-context-menu.png" alt-text="The screenshot shows the actions in context menu.":::

## User scenarios  

## Actions user scenarios

Let us walk through a user scenario of how users might interact with your app through Actions you develop and how the handler affects the workflow.

For background: The user is a supervisor at Northwind Traders with limited time for focused work. They start their day in the Microsoft 365 app, where they can easily access all of their content.  

### Action opens a dialog

In this example, the user sees the latest sales report from a supplier, 'Tokyo Trader,' and wants to add it as an attachment in the supplier management system app built by Northwind Traders.
They right-click on the Word document and choose the Action 'Add to supplier' built by Northwind Traders.

:::image type="content" source="images/m365-actions-add-to-dropdown.png" alt-text="The screenshot shows a right click menu displaying the options from the add-to dropdown.":::

A dialog pops up where they select 'Tokyo Traders' and click 'Add' to add the attachment to their management system, all without opening the document or app. With the openDialog handler, users can complete task efficiently by working in a contextualized dialog interface.

:::image type="content" source="images/m365-actions-popup-dialog.png" alt-text="The screenshot shows a pop-up dialog of the northwind app for the user to add an attachment  running on Microsoft 365 on web.":::

### Action opens a page

On the same page, the user notices the 'Q2 Top suppliers' Excel sheet and want to see which suppliers they work with on this list.
They right-click on the Excel file and then click on the Action 'Related suppliers'.

:::image type="content" source="images/m365-actions-opens-a-page.png" alt-text="The screenshot shows the right click menu displaying the related supplier option running on Microsoft 365 on web.":::

The Northwind app opens, displaying the list of suppliers filtered to show only those that appear in the document. This saves them time opening up the app and the Excel file and checking each item manually.

:::image type="content" source="images/m365-actions-opens-supplier-list.png" alt-text="The screenshot shows the northwind app, which shows the suppliers that match the document in Microsoft 365 on the web.":::

## See also

[Extend Teams apps across Microsoft 365](overview.md)
