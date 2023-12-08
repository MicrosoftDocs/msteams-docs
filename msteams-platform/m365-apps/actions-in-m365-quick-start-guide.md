---
title: Actions in Microsoft 365
description: In this article, learn how to create Actions in Microsoft 365, function of Actions and its use cases.
ms.date: 11/16/2023
ms.author: mosdevdocs
author: Vishnu
ms.topic: Conceptual
ms.subservice: m365apps
---
# Actions in Microsoft 365 Quick Start Guide

This quick start guide helps you create Action in Microsoft 365.

## Prerequisites

1. [Create an Azure SQL database.](/azure/azure-sql/database/single-database-create-quickstart?view=azuresql&tabs=azure-portal&preserve-view=true)

1. [Add IP address of your computer into allowlist of firewall of Azure SQL Server.](/azure/azure-sql/database/firewall-configure?view=azuresql&preserve-view=true)

### Run the app with Azure

To run the app with Azure subscription, you'll need to configure an Azure SQL Database:

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

   :::image type="content" source="~/assets/images/include-files/clone-repository.png" alt-text="Screenshot show the option to clone repository in local.":::

1. Select **Clone**.

1. Go to Visual Studio Code.

1. Select **File** > **Open Folder...**.

1. Select the folder where your app is created.

1. Select **Select Folder**.

1. Create an `env/.env.dev.user` file, and set value for `SECRET_SQL_USER_NAME` and `SECRET_SQL_PASSWORD`.

1. Open the command palette and select **Teams: Provision in the cloud**. You are asked to input admin name and password of SQL. The toolkit helps you to provision Azure SQL.

1. Once provision is completed, open the command palette and select **Teams: Deploy to the cloud**.

1. Open Debug View (Ctrl+Shift+D) and select **Launch Remote (Edge)** or **Launch Remote (Chrome)** from the  dropdown and enter **F5**.

A browser window opens with Microsoft 365 home page and your app is available under **Apps**.

## See also

[Extend Teams apps across Microsoft 365](overview.md)
