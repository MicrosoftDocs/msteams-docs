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
Actions help you enhance your app's visibility and engagement with minimal development effort and reduce the need to switch contexts across various Microsoft 365 apps.

The following graphic is an example of open page Action where the user intends to view the list of suppliers. In Microsoft 365, the user right-clicks on the excel file and select the **Related suppliers**. The Northwind page opens with the list of suppliers. This saves time for the user to open the app and the Excel file and check each item manually.

  :::image type="content" source="images/actions-in-m365-app.gif" alt-text="Graphic shows the user right-clicks on the excel file and select the related suppliers.":::

## Build Actions

Actions are the combination of intent, object, and handler. Actions represent the task that the user wants to perform where intent is the user’s desired action, object is the function to be executed, and handler is the way to perform the action on the object.

| &nbsp; | Name | Description | What is supported in this preview  
| --- | --- | --- | ---|
| &nbsp; | Intent | Intent is the objective a user wants to perform or achieve, such as `Open` and  `addTo`. Microsoft 365 uses intent to display Actions in locations that align with the user’s needs and intentions. Intent determines the placement, grouping, and ordering of Actions. | You can create an intent for `Open`, `addTo`, and `custom` actions. You can use `custom` Actions to create tailored Actions. |
| &nbsp; | Object  | Object is the file on which the user wants to perform an action. | Currently, Actions can be triggered on content objects (files) that have an extension, such as Word, PowerPoint, Excel, PDF, and images. The files must be available in OneDrive or SharePoint and are accessible through Microsoft Graph. |
| &nbsp; | Handlers | A handler is how the Action performs the user’s intent on the selected object. It provides the logic and functionality of the Action, creating a smooth and meaningful user experience. | `openPage`: Handler allows you to directly guide users to your app's personal tab. By utilizing the `openPage` handler, you can effectively drive users to your app's dedicated pages, providing them with a rich and expansive interface to accomplish their goals. |

When you create an app ensure that you define user intent, choose the object to perform the action, and construct the corresponding handler that facilitates task completion for the user.

### Prerequisites

Before you get started, ensure that you install the following tools:

| &nbsp; | Install | For using... |
| --- | --- | --- |
| &nbsp; | [Teams Toolkit](../toolkit/install-Teams-Toolkit.md) | A Microsoft Visual Studio Code extension that creates a project scaffolding for your app. Use the latest version. |
| &nbsp; | [Microsoft Teams](https://www.microsoft.com/microsoft-teams/download-app) | Microsoft Teams to collaborate with everyone you work with through apps for chat, meetings, and call-all in one place.|
| &nbsp; | [Node.js](https://nodejs.org/en/download/) | Back-end JavaScript runtime environment. For more information, see [Node.js version compatibility table for project type](~/toolkit/build-environments.md#nodejs-version-compatibility-table-for-project-type).|
| &nbsp; | [Microsoft Edge](https://www.microsoft.com/edge) (recommended) or [Google Chrome](https://www.google.com/chrome/) | A browser with developer tools. |
| &nbsp; | [Visual Studio Code](https://code.visualstudio.com/download) | JavaScript, TypeScript, or SharePoint Framework (SPFx) build environments. Use the latest version. |
| &nbsp; | [Azure SQL](/azure/azure-sql/database/single-database-create-quickstart?view=azuresql&tabs=azure-portal&preserve-view=true) | Azure SQL Database, a fully managed platform as a service (PaaS) database engine that handles most of the database management functions such as upgrading, patching, backups, and monitoring without user involvement. |

To build Actions for your app, follow these steps:

1. [Update app manifest](#update-app-manifest).
1. [Retrieve Action information through context object](#retrieve-action-information-through-context-object).
1. [Access content through Graph API](#access-content-through-graph-api).

#### Update app manifest

Define the intent, object, and handler for your actions in the app manifest schema (previously called Teams app manifest).

The following is an example of the `intent` and `supportedobjects` and `handlers` properties for `openPage` in app manifest:

```json
{
  "$schema": "https://raw.githubusercontent.com/OfficeDev/microsoft-teams-app-schema/preview/DevPreview/MicrosoftTeams.schema.json",
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

When a user selects an action to open a page and view related tasks in the To-do app based on the selected file. The app uses the `"intent": "custom"` property to identify the file type, such as .xlsx or doc and the `"type": "openPage"` handler opens the app and navigates to the `pageId`.

#### Retrieve Action information through context object

Update the handler to receive the Action information through the context object to create a seamless user experience for performing users specific tasks using the [Teams JavaScript library (TeamsJS)](/javascript/api/@microsoft/teams-js).

When a user selects Add option from the app's context menu, a page opens with the help of the `openPage` property in the app manifest. Your app can access contextual information about the invoked Action from the `actionInfo` property of the context object `app.getContext()`.

```javascript
const context = await app.getContext();
const itemId = context.actionInfo && context.actionInfo.actionObjects[0].itemId;
this.setState({
    itemId: itemId
});
```

| &nbsp; | Name | Description |
| --- | --- | --- |
| &nbsp; | `actionId` | Maps to the action id supplied inside the manifest. |
| &nbsp; | `actionObjects` | Array of corresponding action objects. |
| &nbsp; | `itemId` | The app receives the id as the content and uses it to query the Microsoft graph. |

The [ActionInfo](/javascript/api/@microsoft/teams-js/actioninfo) interface helps to enable your app to determine when a user opens a page from an Action, and the content that initiated the Action.

```javascript
app.getContext().then((context: app.Context) => {
    const actionInfo = context.actionInfo;
    if (actionInfo && actionInfo.actionId == 'myActionId1') {
        // Handle specific action
    }
});
```

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

## Run your app

After you update the app manifest, you can run your app in Teams Toolkit.

To run your app in Teams Toolkit follow these steps:

1. Go to Visual Studio Code.

1. Select **File** > **Open Folder...**.

1. Select the folder where your app is created.

1. Select **Select Folder**.

1. From the left pane, select **Run and Debug (Ctrl+Shift+D)**.

1. From the debug dropdown menu, select **Debug in the Microsoft 365 app (Edge) without backend** and select the **F5** key.

   :::image type="content" source="images/actions-debug.png" alt-text="The screenshot shows actions in debug.":::

1. Select **Yes** if you receive the following security warning:

   :::image type="content" source="~/assets/images/teams-toolkit-v2/first-tab/hw-warning.png" alt-text="Screenshot shows the microsoft warning.":::

A browser window opens with Microsoft 365 home page and your app is available under **Apps**.

You can now preview your Actions in Microsoft 365 app, right-click a file that is supported by your Actions. Actions appear in the context menu, for example **Add todo task**.

:::image type="content" source="images/actions-context-menu.png" alt-text="The screenshot shows the actions in context menu.":::

### Enable Actions in Microsoft Admin Center

In the [Microsoft Admin Center](https://admin.microsoft.com/AdminPortal#/homepage), select **Settings** > **Integrated Apps** > **Upload custom apps** and follow instructions to preinstall your app for entire organization or user groups within your tenant. Ensure that you've enabled the app for [targeted release](/microsoft-365/admin/manage/release-options-in-office-365?view=o365-worldwide&preserve-view=true) to the users in the tenant.

### Run the app with Azure

To run the app with Azure subscription, you'll need to configure an Azure SQL Database:

1. [Create an Azure SQL database.](/azure/azure-sql/database/single-database-create-quickstart?view=azuresql&tabs=azure-portal&preserve-view=true)

1. [Add IP address of your computer into allowlist of firewall of Azure SQL Server.](/azure/azure-sql/database/firewall-configure?view=azuresql&preserve-view=true)

1. Use [query editor](/azure/azure-sql/database/connect-query-portal?view=azuresql&preserve-view=true) with below query to create a table:

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

1. Open your app in Teams Toolkit.

1. Open `env/.env.local.user` and update the following values:

    ```sql
    LOCAL_STORAGE=
    SECRET_SQL_ENDPOINT=
    SECRET_SQL_DATABASE_NAME=
    SECRET_SQL_USER_NAME=
    SECRET_SQL_PASSWORD=
    ```

    The `env/.env.local.user` file contains the config values for the Azure SQL Database you created. Open the file and update the values as follows:

1. Update the `LOCAL_STORAGE` value to false in `env/.env.local` file.

1. From the left pane, open debug view (Ctrl+Shift+D) and select **Debug in Teams (Edge)** from the  dropdown and select the **F5** key.

A browser window opens with Microsoft 365 home page. Your app is available under the **Apps** section.

### Deploy the app to Azure

To deploy the app to Azure, follow these steps:

1. Open [Microsoft-Teams-Samples](https://github.com/OfficeDev/Microsoft-Teams-Samples).

1. Select **Code**.

1. From the dropdown menu, select **Open with GitHub Desktop**.

   :::image type="content" source="../../assets/images/include-files/clone-repository.png" alt-text="Screenshot show the option to clone repository in local.":::

1. Go to Visual Studio Code.

1. Select **File** > **Open Folder...**.

1. Select the folder where your app is created.

1. Select **Select Folder**.

1. Create an `env/.env.dev.user` file, and set value for `SECRET_SQL_USER_NAME` and `SECRET_SQL_PASSWORD`.

1. Open the command palette and select **Teams: Provision in the cloud**. You are asked to input admin name and password of SQL. The toolkit helps you to provision Azure SQL.

1. Once provision is completed, open the command palette and select **Teams: Deploy to the cloud**.

1. Open Debug View (Ctrl+Shift+D) and select **Launch Remote (Edge)** or **Launch Remote (Chrome)** from the  dropdown and enter **F5**.

A browser window opens with Microsoft 365 home page and your app is available under **Apps**.

## Design guidelines

One single Action in the context menu contains App icon and display name.

Actions with custom intent show as a flat list in the bottom of the context menu, actions with Open/Add to intent will be grouped into Open and Add to.

:::image type="content" source="images/app-icon-context-menu.png" alt-text="The screenshot shows the app icon in context menu.":::

:::image type="content" source="images/icon-slot.png" alt-text="The screenshot shows the icon slot in context menu.":::

> [!NOTE]
> The placement of actions is determined by the Microsoft 365 platform. Using intent does not guarantee grouping, and using custom intent does not imply no grouping. We are planning to introduce additional features and experiences to assist users in quickly locating the most relevant and useful actions.

### In context menu

:::image type="content" source="images/actions-design-guidelines.png" alt-text="The screenshot shows the design of context menu.":::

## Code sample

| **Sample name** | **Description** |**Node.js** |
|-----------------|-----------------|----------------|
| Actions in Microsoft 365 apps | This sample code describes the Actions in Microsoft 365 apps. | [Code sample](https://github.com/OfficeDev/m365-msteams-actions-preview/tree/main) [Need to update the public link.]|

## See also

[Extend Teams apps across Microsoft 365](overview.md)
