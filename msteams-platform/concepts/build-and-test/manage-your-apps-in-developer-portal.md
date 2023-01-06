---
title: Manage your apps with the Developer Portal
description: Learn how to configure, distribute, and manage your apps using the Developer Portal for Microsoft Teams.
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
* [Manage rollouts](#manage-rollouts)

## Overview

In the **Overview** section, you can see the following components to manage your app:

* **Dashboard**

  * In the **Dashboard** under **Overview** section, you can see the following components for your app:
    * **Teams store validation**: App validation tool checks your app package against the test cases Microsoft uses when reviewing your app.
    * **Announcement**: Latest updates of your apps on Developer Portal for Teams.
    * **Active users (Preview)**: Shows you the active user count.
    * **Basic information**: Shows you the **App ID**, **Version**, **Manifest version**, and other basic information.
    * **Upgrade to 1.15**: Upgrade your app manifest to the latest version 1.15, which enables support for extending Teams apps to Outlook and Office.

    :::image type="content" source="../../assets/images/tdp/dashboard-page_1.png" alt-text="The screenshot is an example that shows the Overview page of the app you created in Developer Portal for Teams." lightbox="../../assets/images/tdp/dashboard-page_1.PNG":::

* **Analytics**

    In the **Analytics** under **Overview** section, you can get an overview of your app's usage, engagement, and other insights. For more information, see [how to analyze your app's usage](analyze-your-apps-usage-in-developer-portal.md).

## Configure

To install and render your app in Teams, you must include a set of configurations that Teams recognizes. To upload your apps in Teams, you need to have app manifest, which contains all the app details to display your app in Teams. This can be achieved with the help of components and tools that are available in Developer Portal.

:::image type="content" source="../../assets/images/tdp/configure.png" alt-text="The screenshot is an example that shows how to configure features to manage and access your app in Developer Portal.":::

In the **Configure** section, you can see the following components to manage and access your app:

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
  > [!NOTE]
  > Currently, connector is not available for Government Community Cloud (GCC) tenants.
* **Permissions**: This section allows you to give **Device permissions**, **Team Permissions**, **Chat/Meeting permissions**, and **User Permissions** for your app.
* **Single sign-on**: Bot registered on Microsoft Azure Active Directory (Azure AD) supports single sign-on (SSO). If a bot is registered on Bot Framework portal (or within the Developer Portal under **Bot management**), then a bot doesn't support SSO, and you have to register your bot on Azure AD to support SSO. For a bot registered on Azure AD, add the **Application ID URI**. To get **Application ID URI** from Azure AD, see [how to use SSO authentication for bots](../../bots/how-to/authentication/auth-aad-sso-bots.md).
* **Languages**: This section allows you to set up or change the language of your app.
* **Domain**: This section allows you to add the domains to load your apps in the Teams client, such as *.example.com.

## Advanced

In the **Advanced** section, you can see the following components to manage your app in Developer Portal:

* **Owners**

    Each app includes an **Owners** page, where you can share your app registration with others in your org. You can add **Administrator** and **Operative** role to manage who can change the settings of your app. The **Operative** role has a permission, such as updating an app's configuration. The **Administrator** role has the permissions, such as updating an app's configuration, adding or removing owners, and deleting an app.

    To add an owner:

    1. In the **Advanced** section, select **Owners**.
    1. Select **Add owners**.
    1. Enter a name and select a user ID from the drop-down list.
    1. Under **Role**, select **Operative** or **Administrator**.
    1. Select **Add**.

* **App content**: You can configure your app with the following features:
  
  * **Loading indicator**: Displays an indicator to let users know your hosted app content (for example, Tabs and Task modules) is loading.
  * **Full-screen mode**: Displays a personal app without an app header. It's supported for the published apps to your org.
  * **Supported channel types**: Lists the non-standard channel types that the app supports.
  * **Default group capability**: For apps that support multiple group capabilities, such as teams, group chat, or meetings, select the default capability to navigate users when you add your app from the store.

* **Environments**

    You can configure environments and global variables to help transition your app from your local runtime to production. Global variables are used across all environments.

    To set up an environment, follow these steps:

    1. In the Developer Portal, select the **Apps** that you're working.
    1. Go to **Environments** under **Advanced** section.
    1. Select **+ Add an environment**>**Add**.

  * **Global variables**

      1. Select **Add a global variable** to create configuration variables for your environment.

      To use global variables:

      Use the variable names instead of hard-coded values to set your app configurations.

      1. Enter `{{` in any field in the Developer Portal. A dropdown with all the variables you've created for the chosen environment along with the global variables appears.  
      1. Before downloading your app package (for example, when getting ready to publish to the Teams store), select the environment you want to use. Your app configurations update automatically based on the environment.

* **Plan and pricing**: You can link a Software-as-a-Services (SaaS) offer that you've created in the Partner center for your app.
* **Admin settings**:
  * **App Customization**: You can customize your app by selecting different properties, such as **Name**, **Short description**, **Small icon**, and other properties.  
  * **Block app by default**: You can block your app by default for users until a tenant admin selects to enable it.

## Publish

In the **Publish** section, you can publish your app to your org or to the Teams store.

* **Publish to org**:

   1. In the Developer Portal, select the **Apps** that you're working.
   1. Go to **Publish to org** under **Publish**.
   1. Select **Publish your App**.

* **Publish to store**:

   1. In the Developer Portal, select the **Apps** that you're working.
   1. Go to **Publish to store** under **Publish**.
   1. Select **Publish**.

   > [!NOTE]
   > The app validation tool checks your app package against the test cases that Microsoft uses to review your app. Resolve errors or warnings and read the **App submission checklist** before submitting your app.

   You can download the app package by selecting **Download app package** button from the **Publish to store** page.

* **App package**: The app package describes how your app is configured that includes app features, required resources, and other important attributes in manifest. The Icon tab shows the icon used for your app.

## Manage rollouts

In the **Manage rollouts** section, you can see the following components to manage your app in Developer Portal:

* **Pull request history**: This page allows you to create a new pull request and to control who gets app updates. For example, you can release an update to Microsoft employees to identify and fix bugs before releasing it to the public.

* **Distribute your app**: This page allows you to create a request to distribute your app to specific audience. You can distribute your app to non-GA rings or GA rings. It's recommended to not distribute to several rings simultaneously. Instead, roll out gradually to higher order rings. For help, see [aka.ms/teamsAppIngestion](https://domoreexp.visualstudio.com/Teamspace/_wiki/wikis/Teamspace.wiki/26278/Publishing-apps).

* **Withdraw your app**: This page allows you to create a request to withdraw your app from a specific audience.

   > [!NOTE]
   > DevX team is allowed to withdraw your app from **Ring 4**.

## Test your app directly in Teams

The Developer Portal provides options for testing and debugging your app:

* On the **Overview** page, you can see a snapshot whether your app is configured and is validated against Teams store test cases.
* The **Preview in Teams** button launches your app quickly in the Teams client for debugging.

## Use tools to create app features

The Developer Portal also includes tools to help you build key features of Teams apps. The following are the tools:

* **Scene studio**: Design [custom Together Mode scenes in Teams](../../apps-in-teams-meetings/teams-together-mode.md) for Teams meetings.
* **Adaptive Cards editor (Preview)**: Create and preview Adaptive Cards to include with your apps.
* **Identity platform management (Preview)**: Register your apps with Azure AD to help users sign in and provide access to APIs.
* **Teams store app validation**: Check your app package against the test cases that Microsoft uses to review your app.
* **Bot management**: Add conversational bots to your app that communicate with users, respond to their questions, and proactively notify them about changes and other events.

To add a bot:

1. In the Developer Portal, select **Tools** in the left pane.
1. Select the **Bot management**.

    :::image type="content" source="../../assets/images/tdp/tools-in-dev-portal_1.png" alt-text="The screenshot is an example that shows the tools in developer portal, which helps you to build key features." lightbox="../../assets/images/tdp/tools-in-dev-portal_1.PNG":::

1. In the Bot management page, select **+ New Bot**.
1. Enter the name and select **Add**.

    :::image type="content" source="../../assets/images/tdp/Add_new_bot.PNG" alt-text="Add a new bot by using bot management option." lightbox="../../assets/images/tdp/Add_new_bot.PNG":::

From the Developer Portal, you can go to Bot Framework portal and configure your bot to update icon and other properties.

## See also

* [Teams Toolkit Overview](../../toolkit/teams-toolkit-fundamentals.md)
* [Include a SaaS offer with your Microsoft Teams app](~/concepts/deploy-and-publish/appsource/prepare/include-saas-offer.md)
