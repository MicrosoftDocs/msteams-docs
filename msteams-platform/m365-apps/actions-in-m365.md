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
Actions help you enhance your app's visibility and engagement with minimal development effort and reduce the need to switch contexts across various Microsoft 365 apps. For instance, your app can act immediately on content files, expanding the range of interactions users can have with their content.

In the following graphic, the user intends to attach a Word document to the list in the **To do** app. The user right-click on the Word document and select the **Add to** action. A dialog appears with the Word document attached. The user adds a note and selects **Submit**. The Word document is added to the list in the **To do** app:

  :::image type="content" source="images/actions-in-m365-app.gif" alt-text="Graphic shows the user can add a file to the to-do list app with a note attached for a task to complete.":::

## Build Actions

Actions are the combination of intent, object, and handler. Actions represent the task that the user wants to perform where intent is the user’s desired action, object is the function to be executed, and handler is the way to perform the action on the object.

When you're creating an app ensure that you define user intent, choose the object to perform the action, and construct the corresponding handler that facilitates task completion for the user.

### Intent

Intent is the objective a user wants to perform or achieve, such as open or add. Microsoft 365 uses intent to display Actions in locations that align with the user’s needs and intentions. Intent determines the placement, grouping, and ordering of Actions. You can create an intent for `Open`, `addTo`, and `custom` actions. You can use `custom` Actions to create tailored Actions.

### Object

Object is the file on which the user wants to perform an action. Currently, Actions can be triggered on content objects (files) that have an extension, such as Word, PowerPoint, Excel, PDF, and images. The files must be available in OneDrive or SharePoint and are accessible through Microsoft Graph.

### Handlers

A handler is how the Action performs the user’s intent on the selected object. It provides the logic and functionality of the Action, creating a smooth and meaningful user experience.

`openPage`: Drive users to your app's dedicated pages (personal tab).

| &nbsp; | Actions | Supported |
| --- | --- | --- |
| &nbsp; | Intent | `Open`, `addTo`, and `custom` |
| &nbsp; | Object  | The files must be available in OneDrive or SharePoint and are accessible through Microsoft Graph. |
| &nbsp; | Handlers | `openPage` |

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
1. [Create a handler](#create-a-handler).
1. [Access content through Graph API](#access-content-through-graph-api).

#### Update app manifest

Define the intent, object, and handler for your actions in the app manifest schema (previously called Teams app manifest).

The following is an app manifest example for with `intent` and `supportedobjects` and `handlers` properties for `openPage`:

* Action to open a page: Action shows related tasks in the **To-do** app based on the selected file. It uses `"intent": "custom"` to identify the file type, such as .xlsx or doc. The `"type": "openPage"` handler opens the app and navigates to the `pageId`.

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
                    }
                }
            ]
        }
    ]
    ```

The https:// URL referencing the JSON Schema for the manifest. Use public developer preview manifest schema.

```json
"$schema": "https://raw.githubusercontent.com/OfficeDev/microsoft-teams-app-schema/preview/DevPreview/MicrosoftTeams.schema.json",

"manifestVersion": "devPreview",
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

* `itemId`: The app receives the id as the content and uses it to query the Microsoft graph.

#### Access content through Graph API

After obtaining the `itemId` of the triggering content, you can use the Graph API to read or modify the content, facilitating task completion for your users.

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

### Enable Actions in Microsoft Admin Center

1. Upload the app package containing the Actions in the Microsoft Admin Center.
1. Enable the app for targeted release to users in the tenant.
1. In the Microsoft Admin Center, select **Settings** > **Integrated Apps** > **Upload custom apps**.
1. Ensure that you've your users enrolled in the targeted release to use Actions.

### Run the app locally with Azure Subscription

To debug the project, you will need to configure an Azure SQL Database to be used locally:

1. [Create an Azure SQL database.](/azure/azure-sql/database/single-database-create-quickstart?view=azuresql&tabs=azure-portal)
1. [Add IP address of your computer into allowlist of firewall of Azure SQL Server.](/azure/azure-sql/database/firewall-configure?view=azuresql)
1. Use [query editor](/azure/azure-sql/database/connect-query-portal?view=azuresql) with below query to create a table:

    ```sql
    (
    id INT IDENTITY PRIMARY KEY,
    description NVARCHAR(128) NOT NULL,
    objectId NVARCHAR(36),
    itemId NVARCHAR(128),
    channelOrChatId NVARCHAR(128),
    isCompleted TinyInt NOT NULL default 0,
    )
    ```

1. Open `env/.env.local.user` file, uncomment and set the values of below config with the Azure SQL Database you just created:

    ```sql
    SECRET_SQL_ENDPOINT=
    SECRET_SQL_DATABASE_NAME=
    SECRET_SQL_USER_NAME=
    SECRET_SQL_PASSWORD=
    ```

1. Edit the `LOCAL_STORAGE` value to false in `env/.env.local` file.
1. Open Debug View (Ctrl+Shift+D) and select **Debug in the Microsoft 365 app (Edge)** from the  dropdown and enter **F5**.

A browser window opens with Microsoft 365 home page and your app is available under **Apps**.

### Deploy the app to Azure

1. Install `teamsfx-cli` from `npm` and run `teamsfx -h` to check all available commands:

    ```bash
    npm install -g @microsoft/teamsfx-cli
    ```

1. Create todo-list project.

    ```bash
    teamsfx new template todo-list-with-Azure-backend
    ```

1. Provision the project to azure. Input admin name and password of SQL.

    ```bash
    teamsfx provision
    ```

1. Deploy the app.

    ```bash
    teamsfx deploy
    ```

1. Open `env/.env.dev` file, you could get the database name in `PROVISIONOUTPUT__AZURESQLOUTPUT__DATABASENAME` output. In Azure portal, find the database and use [query editor](/azure/azure-sql/database/connect-query-portal?view=azuresql) with below query to create a table:

    ```sql
    CREATE TABLE Todo
    (
        id INT IDENTITY PRIMARY KEY,
        description NVARCHAR(128) NOT NULL,
        objectId NVARCHAR(36),
        channelOrChatId NVARCHAR(128),
        isCompleted TinyInt NOT NULL default 0,
    )
    ```

1. Open the project in Visual Studio Code.
1. Create an `env/.env.dev.user` file, and set value for `SECRET_SQL_USER_NAME` and `SECRET_SQL_PASSWORD`.
1. Open the command palette and select Teams: Provision in the cloud. You will be asked to input admin name and password of SQL. The toolkit will help you to provision Azure SQL.
1. Once provision is completed, open the command palette and select Teams: Deploy to the cloud.
1. Open Debug View (Ctrl+Shift+D) and select **Launch Remote (Edge)** or **Launch Remote (Chrome)** from the  dropdown and enter **F5**.

A browser window opens with Microsoft 365 home page and your app is available under **Apps**.

## Design guidelines

One single Action in the context menu contains App icon and display name.

Actions with custom intent will show as a flat list in the bottom of the context menu, actions with Open/Add to intent will be grouped into Open and Add to.

:::image type="content" source="images/app-icon-context-menu.png" alt-text="The screenshot shows the app icon in context menu.":::

:::image type="content" source="images/icon-slot.png" alt-text="The screenshot shows the icon slot in context menu.":::

> [!NOTE]
> The placement of actions is determined by the Microsoft 365 platform. Using intent does not guarantee grouping, and using custom intent does not imply no grouping. We are planning to introduce additional features and experiences to assist users in quickly locating the most relevant and useful actions.

:::image type="content" source="images/actions-design-guidelines.png" alt-text="The screenshot shows the design of context menu.":::

## Code sample

| **Sample name** | **Description** |**Node.js** |
|-----------------|-----------------|----------------|
| Actions in Microsoft 365 apps | This sample code describes the Actions in Microsoft 365 apps. |TBD|

## See also

[Extend Teams apps across Microsoft 365](overview.md)
