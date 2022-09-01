---
title: Manage your apps with the Developer Portal
description: In this article, learn how to configure, distribute, and manage your apps using the Developer Portal for Microsoft Teams.
ms.localizationpriority: medium
ms.topic: overview
ms.author: surbhigupta
---

# Manage your apps in Developer Portal

After you create or upload your app, you can manage your apps in Developer Portal with the following:

* [Overview](#overview)
* [Configure](#configure)
* [Advanced](#advanced)
* [Publish](#publish)

## Overview

In the **Overview** section, you can see the following components to manage your app:

| Components | Description |
| --- | --- |
| **Teams store validation** | App validation tool checks your app package against the test cases Microsoft uses when reviewing your app. |
| **Announcement** | Latest updates of your apps on Developer Portal for Teams.|
| **Basic information** | Shows you the App ID, Version, Manifest version, and so on. |

:::image type="content" source="~/assets/images/tdp/overview.png" alt-text="Overview of Developer Portal":::

## Configure

To install and render your app in Teams, you must include a set of configurations that Teams recognizes. To upload your apps in Teams, you need to have app manifest, which contains all the app details to display your app in Teams. This can be achieved with the help of components and tools that are available in Developer Portal.

In the **Configure** section, you can see the following components to manage and access your app:

| Components | Description |
| --- | --- |
| **Basic information** | This section shows and allows you to edit the App name, App ID, Descriptions, Version, Developer Information, App URLs, Application (client) ID, and Microsoft Partner Network ID. |
| **Branding** | This page shows the app icon details.|
| **App features** | You can add the following features to your app: <br> - Personal app <br>-  Bot <br> - Connector <br> - Scene <br> - Group and channel app <br> - Messaging extension <br> - Meeting extension <br> - Activity feed notification|
| **Permissions** | This section allows you to give Device permissions, Team permissions, Chat or Meeting permissions, and User Permissions for your app.|
| **Single sign-on** | You can configure your app to authenticate users with single sign-on (SSO).|
| **Languages** | You can set up or change the language of your app.|
| **Domain** | You can add the domains to load your apps in the Teams client (For example: *.example.com).|

:::image type="content" source="~/assets/images/tdp/config-section.png" alt-text="config-section":::

## Advanced

In the **Advanced** section, you can see the following components to manage your app in Developer Portal:

| Components | Description |
| --- | --- |
| **Owners** | Each app includes an **Owners** page, where you can share your app registration with others in your org. You can add **Administrator** and **Operative** role to manage who can change the settings of your app. The **Operative** role has the same permissions as the **Administrator** role except to delete an app. <br> To add an owner:<br> 1. In the **Advanced** section, select **Owners**. <br> 2. Select **Add an owner**. <br> 3. Enter a name and select a user ID from the drop-down list. <br> 4. Under **Role**, select **Operative** or **Administrator**. <br> 5. Select **Add**.|
| **App content** | You can configure your app with the following additional features: <br> - Loading indicator: Displays an indicator to let users know your hosted app content (For example: Tabs and Task modules) is loading. <br> - Full-screen mode: Displays a personal app without an app header. It is only supported for the published apps to your org.|
| ***Environments** | **Environments**: <br> You can configure environments and global variables to help transition your app from your local runtime to production. Global variables are used across all environments. <br> To set up an environment:<br> 1. In the Developer Portal, select the **Apps** that you're working. <br> 2. Go to **Environments** under **Advanced** section and select **+ Add an environment**. <br> 3. Select **Add**. <br> **Global variables:** <br> 1. Select **Add a global variable** to create configuration variables for your environment.<br> To use global variables: <br> Use the variable names instead of hard-coded values to set your app configurations. <br> 1. Enter `{{` in any field in the Developer Portal. A dropdown with all the variables you've created for the chosen environment along with the global variables appears. <br> 2. Before downloading your app package (for example, when getting ready to publish to the Teams store), select the environment you want to use. Your app configurations update automatically based on the environment.|
| **Admin settings** | 1. **App Customization**: You can customize your app. <br> 2. **App default blocked**: You can block your app by default for users until a tenant admin chooses to enable it.|
| **First Party settings**| Set features for first party applications that extend beyond the public functionality. You can also add Screenshot urls, App keywords, Video Url, Third party notice url and so on.|

:::image type="content" source="~/assets/images/tdp/advanced-section.png" alt-text="Advanced section":::

## Publish

In the **Publish** section, you can see the following components to publish your app in Developer Portal:

:::image type="content" source="~/assets/images/tdp/publish-app.png" alt-text="Publish app":::

* **App package**: The app package describes how your app is configured that includes app features, required resources, and other important attributes in manifest. The Icon tab shows the icon used for your app.

* **Publish your app to org**:

   1. In the app **Overview** page, under **Publish**, select **Publish to Org**.
   1. Select **Publish your App**.

* **Publish your app to store**:

   1. In the app **Overview** page, under **Publish**, select **Publish to Store**.
   1. Select **Publish**.

   > [!NOTE]
   > The app validation tool checks your app package against the test cases that Microsoft uses to review your app. Resolve errors or warnings and read the **App submission checklist** before submitting your app.

   You can download the app package by selecting **Download app package** button from the Publish to store page.

## Test your app directly in Teams

The Developer Portal provides options for testing and debugging your app:

* On the **Overview** page, you can see a snapshot whether your app is configured and is validated against Teams store test cases.
* The **Preview in Teams** button launches your app quickly in the Teams client for debugging.

## Use tools to create app features

The Developer Portal also includes tools to help you build key features of Teams apps. The following are the tools:

* **Scene studio**: Design [custom Together Mode scenes](~/apps-in-teams-meetings/teams-together-mode.md) for Teams meetings.
* **Adaptive Cards editor**: Create and preview Adaptive Cards to include with your apps.
* **Microsoft identity platform management**: Register your apps with Azure Active Directory to help users sign in and provide access to APIs.
* **Teams store app validation**: Check your app package against the test cases that Microsoft uses to review your app.
* **Bot management**: Add conversational bots to your app that communicate with users, respond to their questions, and proactively notify them about changes and other events.

To add a bot:

1. In the Developer Portal, select **Tools** in the left pane and select **Bot management**.

   :::image type="content" source="~/assets/images/tdp/select-tools.png" alt-text="Select tools":::

   **Bot management** page appears.

1. Select **New Bot**.

   :::image type="content" source="~/assets/images/tdp/select-new-bot.png" alt-text="Select new bot":::

   **Add bot** window appears.

1. Enter the name and select **Add**.

   :::image type="content" source="~/assets/images/tdp/add-bot.png" alt-text="Add bot":::

From the Developer Portal, you can go to Bot Framework Portal and configure your bot to update icon and other properties.

## See also

[Include a SaaS offer with your Microsoft Teams app](~/concepts/deploy-and-publish/appsource/prepare/include-saas-offer.md)
