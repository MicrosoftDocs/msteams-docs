---
title: Create Actions in Microsoft 365
description: Learn how to build Actions, configure app manifest, retrieve Actions information through context object, access content through Graph API, preinstall Actions.
ms.date: 12/8/2023
ms.author: mosdevdocs
author: v-preethah
ms.topic: conceptual
ms.subservice: m365apps
---

# Build Actions in Microsoft 365

> [!NOTE]
>
> Actions are available in [public developer preview](../resources/dev-preview/developer-preview-intro.md).

When you create an app ensure that you define user intent, determine the object to perform the action, and construct the corresponding handler that facilitates task completion for the user.

To build Actions for your app, follow these steps:

1. [Prerequisites](#prerequisites).
1. [Configure app manifest](#configure-app-manifest).
1. [Retrieve Action information through context object](#retrieve-action-information-through-context-object).
1. [Access content through Graph API](#access-content-through-graph-api).

## Prerequisites

Before you get started, ensure that you install the following:

| &nbsp; | Install | Description |
| --- | --- | --- |
| &nbsp; | [Node.js](https://nodejs.org/en/download/) | A JavaScript runtime environment. For more information, see [Node.js version compatibility table for project type](~/toolkit/build-environments.md#nodejs-version-compatibility-table-for-project-type).|
| &nbsp; | [Microsoft Edge](https://www.microsoft.com/edge/) (recommended) or [Google Chrome](https://www.google.com/chrome/) | A browser with developer tools. |
| &nbsp; | [Visual Studio Code](https://code.visualstudio.com/download) | Visual Studio Code is a lightweight but powerful source code editor, which comes with built-in support for JavaScript, TypeScript, Node.js, and SharePoint Framework (SPFx) build environments. Use the latest version. |
| &nbsp; | [Teams Toolkit](../toolkit/install-Teams-Toolkit.md) | A Microsoft Visual Studio Code extension that creates a project scaffolding for your app. Use the latest version. |

## Configure app manifest

Add the `actions` property and define the intent, object, and handler for your actions in the app manifest (previously called Teams app manifest).

The following is an app manifest example for Actions that can be triggered on files such as Excel, Word, PDF, or PowerPoint:

```json
{
  "$schema": "https://developer.microsoft.com/json-schemas/teams/vDevPreview/MicrosoftTeams.schema.json",
  "manifestVersion": "devPreview",

  "actions": [
    {
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

When a user selects an action to open a personal tab and view related tasks in an app based on the selected file. The app uses the `"intent": "custom"` property to identify the file type, such as .xlsx or doc and the `"type": "openPage"` handler opens the app and navigates to the `pageId`.

## Retrieve Action information through context object

Build the handler to receive the Action information through the [context object](/javascript/api/%40microsoft/teams-js/app.context?view=msteams-client-js-latest&preserve-view=true) to create a seamless user experience for performing users specific tasks using the [Teams JavaScript library (TeamsJS)](/javascript/api/@microsoft/teams-js).

When a user selects Add option from the app's context menu, a personal tab opens with the help of the `openPage` property in the app manifest. Your app can access contextual information about the invoked Action from the `actionInfo` property of the `app.getContext()` context object.

The [ActionInfo](/javascript/api/@microsoft/teams-js/actioninfo) interface helps to enable your app to determine when a user opens a tab from an Action and the content that initiated the Action.

```javascript
app.getContext().then((context) => {
    const actionInfo = context.actionInfo;
    if (actionInfo) {
        // App was launched using an action    
    } 
    if (actionInfo && actionInfo.actionId == 'myActionId1') {
        // Handle specific action    
    } 
    if (actionInfo) {
        if (actionInfo.actionObject.type == app.ActionObjectType.M365Content) {
            const itemId = actionInfo.actionObjects[0].itemId;
            // Get the requested content from Mirosoft Graph by item id:
        } 
    }
})
```

| &nbsp; | Name | Description |
| --- | --- | --- |
| &nbsp; | `actionObjects` | Array of corresponding action objects. |
| &nbsp; | `itemId` | The app receives the ID as the content and uses it to query the Microsoft Graph. |
| &nbsp; | `actionInfo` | The context object contains an object that holds all the information related to the current action. |

## Access content through Graph API

After obtaining the `itemId` of the triggering content, you can use the [Graph API](/graph/api/driveitem-get?view=graph-rest-1.0&tabs=http&preserve-view=true) to read or modify the content, facilitating task completion for your users.

**HTTP request**

```http
GET /users/{user-id}/drive/items/{item-id}
```

## Sideload your app using Teams Toolkit

After you update the app package with the required information, you're ready to test your Actions in the Teams Toolkit. To initiate debugging, select the **F5** key.

   :::image type="content" source="images/actions-debug.png" alt-text="The screenshot shows actions in debug.":::

A browser window opens with Microsoft 365 home page and your app is available under **Apps**.

You can now preview your Actions in the Microsoft 365 home page, right-click a file that is supported by your Actions. Actions appear in the context menu, for example **Add todo task**.

:::image type="content" source="images/actions-context-menu.png" alt-text="The screenshot shows the actions in context menu.":::

[!INCLUDE [m365-app-rename](~/includes/m365-app-rename.md)]

## Preinstall Actions for users in Microsoft 365 Admin Center

> [!NOTE]
> Actions are available in public developer preview, ensure that you enable [targeted release](/microsoft-365/admin/manage/release-options-in-office-365?view=o365-worldwide&preserve-view=true) to the users to experience Actions in Microsoft 365 app.

To use an app with Actions in your tenant, an admin must upload the app package with devPreview manifest to the Microsoft Admin Center as follows:

1. Go to [Microsoft Admin Center](https://admin.microsoft.com/AdminPortal#/homepage).

1. Select **Settings** > **Integrated Apps** > **Upload custom apps**.

Follow instructions to preinstall your app for entire organization or user groups within your tenant.

## Code sample

| **Sample name** | **Description** |**Node.js** |
|-----------------|-----------------|----------------|
| Actions in Microsoft 365 apps | This sample code describes the actions implemented in Microsoft 365 apps, specifically focusing on two actions within a To Do app. | [View](https://github.com/OfficeDev/Microsoft-Teams-Samples/tree/main/samples/m365-actions-preview/nodejs)|

## Next step

> [!div class="nextstepaction"]
> [Actions in Microsoft 365 quick start guide](actions-in-m365-quick-start-guide.md)
