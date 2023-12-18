---
title: Build Actions in Microsoft 365
description: In this article, learn more how to build Actions and its use cases.
ms.date: 12/8/2023
ms.author: mosdevdocs
author: v-preethah
ms.topic: Conceptual
ms.subservice: m365apps
---

# Build Actions in Microsoft 365

When you create an app ensure that you define user intent, choose the object to perform the action, and construct the corresponding handler that facilitates task completion for the user.

## Prerequisites

Before you get started, ensure that you install the following tools:

| &nbsp; | Install | Description |
| --- | --- | --- |
| &nbsp; | [Teams Toolkit](../toolkit/install-Teams-Toolkit.md) | A Microsoft Visual Studio Code extension that run and debug your app. Use the latest version. |
| &nbsp; | [Node.js](https://nodejs.org/en/download/) | A JavaScript runtime environment. For more information, see [Node.js version compatibility table for project type](~/toolkit/build-environments.md#nodejs-version-compatibility-table-for-project-type).|
| &nbsp; | [Microsoft Edge](https://www.microsoft.com/edge) (recommended) or [Google Chrome](https://www.google.com/chrome/) | A browser with developer tools. |
| &nbsp; | [Visual Studio Code](https://code.visualstudio.com/download) | Visual Studio Code is a lightweight but powerful source code editor. Which comes with built-in support for JavaScript, TypeScript, Node.js, and SharePoint Framework (SPFx) build environments. Use the latest version. |

To build Actions for your app, follow these steps:

> [!div class="checklist"]
>
>* [Update app manifest](#update-app-manifest).
>* [Retrieve Action information through context object](#retrieve-action-information-through-context-object).
>* [Access content through Graph API](#access-content-through-graph-api).

## Update app manifest

Add the `actions` property and define the intent, object, and handler for your actions in the app manifest (previously called Teams app manifest).

The following is an example of the `intent`, `supportedobjects`, and `handlers` properties for `openPage` in app manifest:

```json
{
  "$schema": "https://developer.microsoft.com/json-schemas/teams/vDevPreview/MicrosoftTeams.schema.json",
  "manifestVersion": "devPreview",
.
.
.
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
                }
            }
        ]
    }
]
}
```

For more information, see [public developer preview app manifest schema](../resources/schema/manifest-schema-dev-preview.md#actions).

When a user selects an action to open a page and view related tasks in an app based on the selected file. The app uses the `"intent": "custom"` property to identify the file type, such as .xlsx or doc and the `"type": "openPage"` handler opens the app and navigates to the `pageId`.

## Retrieve Action information through context object

Build the handler to receive the Action information through the [context object](/javascript/api/%40microsoft/teams-js/app.context?view=msteams-client-js-latest&preserve-view=true) to create a seamless user experience for performing users specific tasks using the [Teams JavaScript library (TeamsJS)](/javascript/api/@microsoft/teams-js).

When a user selects Add option from the app's context menu, a page opens with the help of the `openPage` property in the app manifest. Your app can access contextual information about the invoked Action from the `actionInfo` property of the context object `app.getContext()`.

```javascript
const context = await app.getContext();
```

| &nbsp; | Name | Description |
| --- | --- | --- |
| &nbsp; | `actionId` | Maps to the Action ID supplied inside the manifest. |
| &nbsp; | `actionObjects` | Array of corresponding action objects. |
| &nbsp; | `itemId` | The app receives the ID as the content and uses it to query the Microsoft graph. |

The [ActionInfo](/javascript/api/@microsoft/teams-js/actioninfo) interface helps to enable your app to determine when a user opens a page from an Action and the content that initiated the Action.

```javascript
const itemId = context.actionInfo && context.actionInfo.actionObjects[0].itemId;
app.getContext().then((context: app.Context) => {
    const actionInfo = context.actionInfo;
    if (actionInfo && actionInfo.actionId == 'myActionId1') {
        // Handle specific action
    }
});
```

## Access content through Graph API

After obtaining the `itemId` of the triggering content, you can use the Graph API to read or modify the content, facilitating task completion for your users.

```javascript
async readActionItem() {
    try {
        return await this.graphClient.api(`/users/${this.objectId}/drive/items/${this.itemId}`).get();
    } catch (error) {
        console.log("Error reading the content", error);
    }
}
```

## Run your app

After you update the app package with the required information, you can run your app in Teams Toolkit to test your Actions.

To run your app in Teams Toolkit, follow these steps:

1. Go to Visual Studio Code.

1. Select **File** > **Open Folder...**.

1. Select the folder where your app is created.

1. Select **Select Folder**.

1. From the left pane, select **Run and Debug (Ctrl+Shift+D)**.

1. From the debug dropdown menu, select **Debug in the Microsoft 365 app (Edge) without backend**.

   :::image type="content" source="images/actions-debug.png" alt-text="The screenshot shows actions in debug.":::

1. Select **Yes** if you receive the following security warning:

   :::image type="content" source="~/assets/images/teams-toolkit-v2/first-tab/hw-warning.png" alt-text="Screenshot shows the microsoft warning.":::

A browser window opens with Microsoft 365 home page and your app is available under **Apps**.

You can now preview your Actions in Microsoft 365 app, right-click a file that is supported by your Actions. Actions appear in the context menu, for example **Add todo task**.

:::image type="content" source="images/actions-context-menu.png" alt-text="The screenshot shows the actions in context menu.":::

### Enable Actions in Microsoft Admin Center

Actions are available in public developer preview. To use an app with Actions in your tenant, an admin must upload the app package to the Microsoft Admin Center as follows:

1. Go to [Microsoft Admin Center](https://admin.microsoft.com/AdminPortal#/homepage).

1. Select **Settings** > **Integrated Apps** > **Upload custom apps**.

Follow instructions to preinstall your app for entire organization or user groups within your tenant.

> [!NOTE]
> Ensure that you enable [targeted release](/microsoft-365/admin/manage/release-options-in-office-365?view=o365-worldwide&preserve-view=true) to the users in the tenant.

## Code sample

| **Sample name** | **Description** |**Node.js** |
|-----------------|-----------------|----------------|
| Actions in Microsoft 365 apps | This sample code describes the Actions in Microsoft 365 apps. | [Code sample](https://github.com/OfficeDev/m365-msteams-actions-preview/tree/main) [Need to update the public link.]|

## See also

* [Actions in Microsoft 365](actions-in-m365.md)
* [Actions in Microsoft 365 quick start guide](actions-in-m365-quick-start-guide.md)
