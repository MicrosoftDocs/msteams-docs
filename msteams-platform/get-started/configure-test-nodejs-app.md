---
title: Register and Test your first app using Node.js
description: Learn how to register and test Microsoft Teams apps with Node.js
keywords: getting started Node.js
ms.custom: scenarios:getting-started; languages:Node.js
ms.localizationpriority: medium
ms.topic: tutorial
ms.date: 11/09/2018
---

# Preview and publish your Node.js app

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

## Publish your app to Teams Store

When you've tested your app in the local environment, you're ready to publish the sample app to the Teams store.

1. Open Developer Portal.
1. Select **Publish**.
1. Select **Publish to store**.

    :::image type="content" source="../assets/images/teams-toolkit-v2/publish-your-app.png" alt-text="Image showing publish options" border="false":::

    Your app is now available in Teams Store.

    :::image type="content" source="../assets/images/teams-toolkit-v2/hello-world-in-store-nj.png" alt-text="Image showing app in Teams store" border="false":::

1. Select the Hello World app.

    The **Add** page appears.

    :::image type="content" source="../assets/images/teams-toolkit-v2/add-app-to-store-nodejs.png" alt-text="Image showing Add page" border="false":::

1. Select **Add** to install the app on Teams store.

    Your app is now installed from the Teams Store. You can view all the pages and test the capabilities.

    - Hello tab:

        :::image type="content" source="../assets/images/teams-toolkit-v2/nj-hw-store-tab-whole.png" alt-text="Image showing Hello tab" border="false":::

    - Chat bot:

        :::image type="content" source="../assets/images/teams-toolkit-v2/nj-hw-store-bot.png" alt-text="Image showing the app's bot" border="false":::

        You can send a message using the chat.

        :::image type="content" source="../assets/images/teams-toolkit-v2/nj-hw-store-bot-chat.png" alt-text="Image showing chat in bot" border="false":::

    - Message extension:

        :::image type="content" source="../assets/images/teams-toolkit-v2/nj-hw-store-msgext.png" alt-text="Image showing message extension" border="false":::

        You can try a search using the message extension.

        :::image type="content" source="../assets/images/teams-toolkit-v2/nj-hw-store-msgext-query.png" alt-text="Image showing search using message extension" border="false":::

    - About tab:

        :::image type="content" source="../assets/images/teams-toolkit-v2/nj-hw-store-about.png" alt-text="Image showing About tab" border="false":::

        Congratulations! Your app is now live.

| &nbsp; | &nbsp; |
|:--- | ---:|
|[:::image type="icon" source="../assets/images/get-started/app-roadmap/back-deploy.png":::](deploy-nodejs-app.md) | [:::image type="icon" source="../assets/images/get-started/app-roadmap/next-overview.png":::](code-samples.md)|
|