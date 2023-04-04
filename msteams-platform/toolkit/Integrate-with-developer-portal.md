---
title: Integrate with Developer Portal in Teams Toolkit 
author: zyxiaoyuer
description: Learn how to integrate with Developer Portal in Teams Toolkit.
ms.author: zhany
ms.localizationpriority: medium
ms.topic: overview
ms.date: 07/29/2022
---

# Integrate with Developer Portal

You can configure and manage your app in Developer Portal within Teams Toolkit.

## To Publish app using Developer Portal

You can publish your app which is created in Visual Studio and Visual Studio Code using Developer Portal:

# [Visual Studio Code](#tab/visualstudiocode)

The following steps help to publish your app in Developer Portal:

1. Select **Developer Portal for Teams** under **DEPLOYMENT**.

    :::image type="content" source="../assets/images/teams-toolkit-v2/teams toolkit fundamentals/dev-portal-ttk_1.png" alt-text="Developer Portal for Teams":::

   Developer Portal opens in a browser.

1. Sign in to [Developer Portal for Teams](https://dev.teams.microsoft.com) using the corresponding account.
1. Select **Apps** > **Import app** to import your app package in zip format.

    :::image type="content" source="../assets/images/teams-toolkit-v2/teams toolkit fundamentals/Select_Import_app.png" alt-text="Select Import app":::

1. Select **Publish** > **Publish to your org**.

    :::image type="content" source="../assets/images/teams-toolkit-v2/teams toolkit fundamentals/Select_Publish_to_org.png" alt-text="Select to publish the app to your organization.":::

# [Visual Studio](#tab/visualstudio)

The following steps helps you to open Teams Developer Portal from Visual Studio to publish:

1. Open **Teams Developer Portal** to publish your app.

1. Select **Project** > **Teams Toolkit** > **Open Teams Developer Portal to Publish**.

1. Select the **Teams zipped app package**.

1. Teams Toolkit will open your app in **Teams Developer Portal** and direct you to the **Publish to your org** page, from there you can select **Publish your app** to continue with your publishing process.

## To update Manifest file and app package

If there are any changes related to Teams app's manifest file, you can update the manifest and publish the Teams app again. To publish Teams app manually, you can use [Developer Portal for Teams](https://dev.teams.microsoft.com/home).

1. Sign in to [Developer Portal for Teams](https://dev.teams.microsoft.com) using the corresponding account.
1. Select **Apps** > **Import app** to import your app package in zip format.<br>
   You need to replace the app, that you previously uploaded to the Developer Portal.
1. Select **Publish** > **Publish to your org**.

You can do the following configuration for your app in the Developer Portal:

* **Basic information**: This section shows and allows you to edit the **App names**, **App ID**, **Descriptions**, **Version**, **Developer information**, **App URLs**, **Application (client) ID**, and **Microsoft Partner Network ID**.
* **Branding**: This section allows you to add **Color icon** and **Outline icon** in `.png` format.
* **App features**: This section allows you to add the following features to your app:
  * Personal app
  * Bot
  * Connector
  * Scene
  * Group and channel app
  * Messaging extension
  * Meeting extension
  * Activity feed notification
* **Permissions**: This section allows you to give **Device permissions**, **Team Permissions**, **Chat/Meeting Permissions**, and **User Permissions** for your app.
* **Single sign-on**: This section allows you to configure your app to authenticate users with single sign-on (SSO) and to specify your app's resource for getting authorization tokens.
* **Languages**: This section allows you to set up or change the language of your app.
* **Domain**: This section allows you to add the domains to load your apps in the Teams client, such as *.example.com.

## See also

* [Teams Toolkit Overview](teams-toolkit-fundamentals.md)
* [Developer Portal for Teams](../concepts/build-and-test/teams-developer-portal.md)
* [Manage your apps in Developer Portal](../concepts/build-and-test/manage-your-apps-in-developer-portal.md)
