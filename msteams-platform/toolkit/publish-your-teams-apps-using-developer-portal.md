---
title: Publish App using Developer Portal
author: zyxiaoyuer
description: Learn how to publish the app using Developer Portal in Microsoft 365 Agents Toolkit for Visual Studio Code, update app manifest, and publish manually.
ms.author: zhany
ms.localizationpriority: medium
ms.topic: overview
ms.date: 02/06/2025
---

# Publish Teams app with Developer Portal

You can configure and manage your app in Developer Portal within Microsoft 365 Agents Toolkit (previously known as Teams Toolkit).

## To publish app using Developer Portal

You can publish your app, which is created in Visual Studio Code using Developer Portal:

The following steps help to publish your app in Developer Portal:

1. Select **Open Developer Portal to Publish** for Microsoft Teams under **UTILITY**.

   :::image type="content" source="../assets/images/toolkit-v2/toolkit-fundamentals/open-developer-portal-to-publish.png" alt-text="Screenshot showing the selection of open Developer Portal to publish.":::

1. Select the Teams app package you'd like to publish.

   :::image type="content" source="../assets/images/toolkit-v2/toolkit-fundamentals/select-your-teams-app-package.png" alt-text="Screenshot showing the selection of zip Teams app package.":::

1. Sign in to [Developer Portal for Teams](https://dev.teams.microsoft.com/home) using the corresponding account.
1. Agents Toolkit opens your selected Teams app's page and navigate to the **Publish** > **Publish to store** page.
1. Select **Publish** > **Publish to your org**.

   :::image type="content" source="../assets/images/toolkit-v2/toolkit-fundamentals/publish-to-your-org.png" alt-text="Screenshot showing the selection of publish to your org.":::

## To update Manifest file and app package

If there are any changes related to Teams app's manifest file, you can update the manifest and publish the Teams app again. To publish Teams app manually, you can use [Developer Portal for Teams](https://dev.teams.microsoft.com/home).

1. Sign in to [Developer Portal for Teams](https://dev.teams.microsoft.com) using the corresponding account.
1. Select **Apps** > **Import app** to import your app package in zip format.<br>
   You need to replace the app, that you previously uploaded to the Developer Portal.

You can do the following configuration for your app in the Developer Portal:

* **Basic information**: This section shows and allows you to edit the **App names**, **Descriptions**, **Version**, **Developer information**, **App URLs**, **Application (client) ID**, and **Microsoft Partner Network ID** (CCP ID).
* **Branding**: This section allows you to add **Color icon** and **Outline icon** in `.png` format.
* **App features**: This section allows you to add the following features to your app:
  * Personal app
  * Bot
  * Connector
  * Scene
  * Group and channel app
  * Message extension
  * Meeting extension
  * Activity feed notification
* **Permissions**: This section allows you to give **Device permissions**, **Team Permissions**, **Chat/Meeting Permissions**, and **User Permissions** for your app.
* **Single sign-on**: This section allows you to configure your app to authenticate users with single sign-on (SSO) and to specify your app's resource for getting authorization tokens.
* **Languages**: This section allows you to set up or change the language of your app.
* **Domain**: This section allows you to add the domains to load your apps in the Teams client, such as *.example.com.

## See also

* [Microsoft 365 Agents Toolkit Overview](agents-toolkit-fundamentals.md)
* [Developer Portal for Teams](../concepts/build-and-test/teams-developer-portal.md)
* [Manage your apps in Developer Portal](../concepts/build-and-test/manage-your-apps-in-developer-portal.md)
* [Develop your apps with Microsoft 365 Agents Toolkit](../concepts/build-and-test/develop-your-apps-with-toolkit.md)
