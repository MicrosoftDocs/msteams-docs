---
title: Integrate with Developer Portal in Teams Toolkit 
author: zyxiaoyuer
description: In this module, learn how to integrate with Developer Portal in Teams Toolkit
ms.author: zhany
ms.localizationpriority: medium
ms.topic: overview
ms.date: 07/29/2022
---

# Integrate with Developer Portal in Teams Toolkit

You can configure and manage your app in developer portal within Teams Toolkit.

## To Publish app using Developer Portal

The following steps help you to publish your app in Developer Portal:

1. Select **Developer Portal for Teams** under **DEPLOYMENT**.

    :::image type="content" source="../assets/images/teams-toolkit-v2/teams toolkit fundamentals/dev-portal-ttk.png" alt-text="Developer Portal for Teams":::

   Now Developer Portal opens in a browser.

1. Sign-in to [Developer portal for Teams](https://dev.teams.microsoft.com) using the corresponding account.
1. Import your app package in zip, select **App** > **Import app**.
1. Select **Publish** > **Publish to your org**.

## To update Manifest file and app package

If there are any changes related to Teams app's manifest file, you can update the manifest and publish the Teams app again. To publish Teams app manually, you may leverage [Developer Portal for Teams](https://dev.teams.microsoft.com/home).

1. Sign-in to [Developer portal for Teams](https://dev.teams.microsoft.com) using the corresponding account.
1. Import your app package in zip, select **App** > **Import app** > **Replace**.
1. Select the target app in app list.
1. To publish your app, select **Publish** > **Publish to your org**.

You can do the following configuration in the Developer Portal:

* **Basic information**: This section shows and allows you to edit the App name, App ID, Descriptions, Version, Developer Information, App URLs, Application (client) ID, and Microsoft Partner Network ID.
* **Branding**: This page shows the app icon details.
* **App features**: You can add the following features to your app:
  * Personal app
  * Bot
  * Connector
  * Scene
  * Group and channel app
  * Messaging extension
  * Meeting extension
  * Activity feed notification
* **Permissions**: This section allows you to give Device permissions, Team permissions, Chat or Meeting permissions, and User Permissions for your app.
* **Single sign-on**: You can configure your app to authenticate users with single sign-on (SSO).
* **Languages**: You can set up or change the language of your app.
* **Domain**: You can add the domains to load your apps in the Teams client (For example: *.example.com).

## See also

* [Developer Portal for Teams](../concepts/build-and-test/teams-developer-portal.md)
* [Manage your apps in Developer Portal](../concepts/build-and-test/manage-your-apps-in-developer-portal.md)
