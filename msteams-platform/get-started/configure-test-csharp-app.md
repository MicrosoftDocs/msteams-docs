---
title: Register and Test your first app using C#
description: Learn how to register and test Microsoft Teams apps with C# or .NET.
keywords: getting started .net c# csharp
ms.custom: scenarios:getting-started; languages:ASP.NET,C#
ms.localizationpriority: medium
ms.topic: tutorial
ms.date: 11/09/2018
---

# Preview and test your app

After you've imported your app and configured the capabilities in Developer Portal, you can preview and test the sample app.

## Preview your app in Teams

After configuring the capabilities of your app, you can preview and test your app in Teams in the local environment.

To preview your app:

1. Select **Preview in Teams** from the Developer Portal toolbar.

    :::image type="content" source="../assets/images/teams-toolkit-v2/preview-in-teams.png" alt-text="Image showing Preview button" border="false":::

    The Developer Portal informs you that your app is sideloaded successfully.

1. Select **Publish** from the left pane, and select **Download app package** to download the configured app package from Developer Portal.
1. Save the app package zip file.The file name is Hello World.zip.
1. Select the **Store** :::image type="icon" source="../assets/images/teams-toolkit-v2/teams-store-icon.png"::: icon.
1. Select **Manage your apps**.
1. Select **Upload a custom app**.
1. Select Hello World.zip to upload it to Teams in the local environment.

    The **Add** page appears for your app.

1. Select **Add** to install the app on Teams.

    :::image type="content" source="../assets/images/teams-toolkit-v2/add-nodejs-app-sideload.png" alt-text="Image showing Add app dialog" border="false":::

    Your app is now available in Teams. You can view all the tabs and test the capabilities:

    - Hello tab:

        :::image type="content" source="../assets/images/teams-toolkit-v2/helloworld-tab.png" alt-text="Image showing Hello tab in local environment" border="false":::

    - Chat bot:

        :::image type="content" source="../assets/images/teams-toolkit-v2/helloworld-bot.png" alt-text="Image showing the app's bot in local environment" border="false":::

        You can send a message using the chat.

        :::image type="content" source="../assets/images/teams-toolkit-v2/helloworld-bot-chat.png" alt-text="Image showing chat in local environment" border="false":::

    - Message extension:

        :::image type="content" source="../assets/images/teams-toolkit-v2/helloworld-msgext.png" alt-text="Image showing message extension in local environment" border="false":::

        You can try a search using the message extension.

        :::image type="content" source="../assets/images/teams-toolkit-v2/helloworld-msgext-query.png" alt-text="Image showing search using message extension in local environment" border="false":::

    - About tab:

        :::image type="content" source="../assets/images/teams-toolkit-v2/helloworld-about.png" alt-text="Image showing About tab in local environment" border="false":::

| &nbsp; | &nbsp; |
|:--- | ---:|
|[:::image type="icon" source="../assets/images/get-started/app-roadmap/back-deploy.png":::](deploy-csharp-app.md) | [:::image type="icon" source="../assets/images/get-started/app-roadmap/next-overview.png":::](get-started-overview.md)|
|