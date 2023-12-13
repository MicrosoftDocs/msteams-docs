---
title: Actions in Microsoft 365 quick start guide
description: In this article, learn how to create Actions in Microsoft 365, function of Actions and its use cases.
ms.date: 12/8/2023
ms.author: mosdevdocs
author: v-preethah
ms.topic: Conceptual
ms.subservice: m365apps
---
# Actions in Microsoft 365 quick start guide

Get started with Actions in Microsoft 365 using the [Microsoft 365 sample](https://github.com/OfficeDev/m365-msteams-actions-preview/tree/main) [Need to update the public link.].

## Prerequisites

Before you get started, ensure that you install the following tools:

| &nbsp; | Install | For using... |
| --- | --- | --- |
| &nbsp; | [Teams Toolkit](../toolkit/install-Teams-Toolkit.md) | A Microsoft Visual Studio Code extension that creates a project scaffolding for your app. Use the latest version. |
| &nbsp; | [Microsoft Teams](https://www.microsoft.com/microsoft-teams/download-app) | Microsoft Teams to collaborate with everyone you work with through apps for chats, meetings, and calls in one place.|
| &nbsp; | [Node.js](https://nodejs.org/en/download/) | Back-end JavaScript runtime environment. For more information, see [Node.js version compatibility table for project type](~/toolkit/build-environments.md#nodejs-version-compatibility-table-for-project-type).|
| &nbsp; | [Microsoft Edge](https://www.microsoft.com/edge) (recommended) or [Google Chrome](https://www.google.com/chrome/) | A browser with developer tools. |
| &nbsp; | [Visual Studio Code](https://code.visualstudio.com/download) | JavaScript, TypeScript, or SharePoint Framework (SPFx) build environments. Use the latest version. |

After you've installed the tools, follow these steps:

1. Create an [Azure SQL database](/azure/azure-sql/database/single-database-create-quickstart?view=azuresql&tabs=azure-portal&preserve-view=true).

1. Add [IP address](/azure/azure-sql/database/firewall-configure?view=azuresql&preserve-view=true) of your computer into allowlist of firewall of Azure SQL Server.

### Run the app with Azure

To run the app with Azure, follow these steps:

1. Go to [Azure SQL database](https://ms.portal.azure.com/#browse/Microsoft.Sql%2Fservers%2Fdatabases).

1. To create a table, use the following code in the query editor:

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

    For more information on how to use query editor, see [use the Azure portal query editor](/azure/azure-sql/database/connect-query-portal?view=azuresql&preserve-view=true)

1. Open [Microsoft-Teams-Samples](https://github.com/OfficeDev/Microsoft-Teams-Samples).

1. Select **Code**.

1. From the dropdown menu, select **Open with GitHub Desktop**.

   :::image type="content" source="~/assets/images/include-files/clone-repository.png" alt-text="Screenshot show the option to clone repository in local.":::

1. Select **Clone**.

1. Go to Visual Studio Code.

1. Select **File** > **Open Folder...**.

1. Select the folder where your app is created.

1. Select **Select Folder**.

1. Under **EXPLORER**, select the `env/.env.local.user` file and update the following values:

    ```sql
    LOCAL_STORAGE=
    SECRET_SQL_ENDPOINT= <Your SQL endpoint>
    SECRET_SQL_DATABASE_NAME= <Your SQL database name>
    SECRET_SQL_USER_NAME= <Your SQL user name>
    SECRET_SQL_PASSWORD= <Your SQL user password>
    ```

    The `env/.env.local.user` file contains the config values for the Azure SQL Database you created.

1. Update the `LOCAL_STORAGE` value to false in `env/.env.local` file.

1. From the left pane, select **Run and Debug (Ctrl+Shift+D)** and select **Debug in Teams (Edge)** from the dropdown or select the **F5** key.

A browser window opens with Microsoft 365 home page. Your app is available under the **Apps** section.

### Deploy the app to Azure

To deploy the app to Azure, follow these steps:

1. Go to Visual Studio Code.

1. Under **EXPLORER**, create the `env/.env.dev.user` file, and update the following code in the  `env.dev.user` file:

    ```sql
    SECRET_SQL_USER_NAME= <Your SQL user name>
    SECRET_SQL_PASSWORD= <Your SQL user password>
    ```

1. Select **View** > **Command Palette...** and enter **Teams: Provision in the cloud** in the search field. You are asked to input SQL admin name and password. The Teams Toolkit helps provision Azure SQL.

1. After provision, select **View** > **Command Palette...** and enter **Teams: Deploy to the cloud** in the search field.

1. Under **EXPLORER**, open the `env/.env.dev` file, and update the following code in the  `env.dev` file:

    ```sql
    PROVISIONOUTPUT__AZURESQLOUTPUT__DATABASENAME=
    ```

### Preview the app in Azure

After deployment, you can preview the app running in Azure. To preview the app in Azure follow these steps:

1. Go to Visual Studio Code.

1. From the left pane, select **Run and Debug (Ctrl+Shift+D)** and select **Launch Remote in the Microsoft 365 app (Edge)** or **Launch Remote in the Microsoft 365 app (Chrome)** from the dropdown list.

A browser window opens with Microsoft 365 home page and your app is available under **Apps**.

## See also

[Actions in Microsoft 365](actions-in-m365.md)
[Build Actions in Microsoft 365](build-actions-in-m365.md)
