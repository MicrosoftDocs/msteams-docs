---
title: Manage your apps with the Developer Portal
description: Learn how to configure, distribute, and manage your apps using the Developer Portal for Microsoft Teams.
ms.localizationpriority: medium
ms.topic: overview
ms.author: surbhigupta
ms.date: 02/28/2023
---

# Manage your apps in Developer Portal

After you create or upload your app, you can manage your apps in Developer Portal with the following:

* [Overview](#overview)
* [Configure](#configure)
* [Advanced](#advanced)
* [Develop](#develop)
* [Publish](#publish)

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
  > Connector isn't available for Government Community Cloud (GCC) tenants.
* **Permissions**: This section allows you to give **Device permissions**, **Team Permissions**, **Chat/Meeting permissions**, and **User Permissions** for your app.
  > [!NOTE]
  > The maximum limit for RSC permissions is 16.
* **Single sign-on**: Bot registered on Microsoft Entra ID supports single sign-on (SSO). If a bot is registered on Bot Framework portal (or within the Developer Portal under **Bot management**), then a bot doesn't support SSO, and you have to register your bot on Microsoft Entra ID to support SSO. For a bot registered on Microsoft Entra ID, add the **Application ID URI**. To get **Application ID URI** from Microsoft Entra ID, see [how to use SSO authentication for bots](../../bots/how-to/authentication/auth-aad-sso-bots.md).
* **Languages**: This section allows you to set up or change the language of your app.
* **Domain**: This section allows you to add the domains to load your apps in the Teams client, such as *.example.com.

## Advanced

In the **Advanced** section, you can see the following components to manage your app in Developer Portal:

* **Owners**

    Each app includes an **Owners** page, where you can share your app registration with others in your org. You can add **Administrator** and **Operative** role to manage who can change the settings of your app. The **Operative** role has a permission, such as updating an app's configuration. The **Administrator** role has the permissions, such as updating an app's configuration, adding or removing owners, and deleting an app. If there are no active owners for an app, Tenant admins can own the apps by entering the app ID in Teams Developer Portal.

    To add an owner:

    1. In the **Advanced** section, select **Owners**.
    1. Select **Add owners**.
    1. Enter a name and select a user ID from the dropdown list.
    1. Under **Role**, select **Operative** or **Administrator**.
    1. Select **Add**.

* **App content**: You can configure your app with the following features:
  
  * **Loading indicator**: Displays an indicator to let users know your hosted app content (for example, Tabs and Dialogs (referred as task modules in TeamsJS v1.x)) is loading.
  * **Full-screen mode**: Displays a personal app without an app header. It's supported for the published apps to your org.
  * **Supported channel types**: Lists the non-standard channel types that the app supports.
  * **Default group capability**: For apps that support multiple group capabilities, such as teams, group chat, or meetings, select the default capability to navigate users when you add your app from the Microsoft Teams Store.

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
      1. Before downloading your app package (for example, when getting ready to publish to the Teams Store), select the environment you want to use. Your app configurations update automatically based on the environment.

* **Plan and pricing**: You can link a Software-as-a-Services (SaaS) offer that you've created in the Partner center for your app.
* **Admin settings**:
  * **App Customization**: You can customize your app by selecting different properties, such as **Name**, **Short description**, **Small icon**, and other properties.  
  * **Block app by default**: You can block your app by default for users until a tenant admin selects to enable it.

## Develop

In the **Develop** section, you can open and develop your app in Teams Toolkit in the Visual Studio Code and Visual Studio. For more information, see [develop your app with Teams Toolkit](develop-your-apps-with-teams-toolkit.md).

## Publish

In the **Publish** section, you can publish your app to your org or to the Teams Store.

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

   You can download the app package by selecting the **Download app package** button from the **Publish to store** page.

* **App package**: The app package describes how your app is configured that includes app features, required resources, and other important attributes in manifest. The app definition refers to the configuration and settings associated with the application. The Icon tab shows the icon used for your app.

* **App validation**: Evaluate your app package based on the test cases that Microsoft uses to review your app. The **App validation** tool identifies any errors or warnings in your app package and provides guidelines for resolution.

    If your app failed any test cases, you can review the guidelines and make necessary updates to your app package based on the Microsoft test case results. You can also download your app package and validation report.

    <br>
    <details>
    <summary><b>Validate your app package</b></summary><br>

    To ensure that your app functions as expected on Teams, use the **App validation** tool to check your app package against Microsoft's test cases:

    1. In the Developer Portal, select the **Apps** from the left pane and select the app that you're working.
    1. Go to **Publish** > **App validation** > **Get started**.

        :::image type="content" source="../../assets/images/tdp/app-validation-home.png" alt-text="Screenshot shows you the App validation in Teams developer portal." lightbox="../../assets/images/tdp/app-validation-get-started.png":::

    1. Select the validation acknowledgments checkbox and select the **Start validation**.

        :::image type="content" source="../../assets/images/tdp/app-validation.png" alt-text="Screenshot shows you the App validation acknowledgment of your app package." lightbox="../../assets/images/tdp/app-validation-start.png":::

        Teams Developer Portal now starts to validate your app package:

        :::image type="content" source="../../assets/images/tdp/app-validation-in-progress.png" alt-text="Screenshot shows you the App validation in progress.":::

        After you select **Start validation**, your app validation status becomes **Created**, then it moves to **In progress** status once the app validation is initiated. When the app validation completes, the status updates to **Completed**.

        You can select **Refresh status** to retrieve latest validation status when the validation in **In progress** status.

        :::image type="content" source="../../assets/images/tdp/app-validation-refresh.png" alt-text="Screenshot shows the app validation status.":::

    1. After validation, it shows the list of test cases your app has passed or failed. Here is the list of app validation test result status:<br>

        1. **Success** - Your app validation test is successful.
        1. **Warning** - You can review and resolve the warning.
        1. **Error** - You must check and fix the errors; else the app can't be published.
        1. **Skipped** - Unable to execute the test case for now. You must submit the new validation request again.

        :::image type="content" source="../../assets/images/tdp/app-validation-result.png" alt-text="Screenshot shows you the app validation tool result.":::

    </details>

## Test your app directly in Teams

The Developer Portal provides options for testing and debugging your app:

* On the **Overview** page, you can see a snapshot whether your app is configured and is validated against Teams Store test cases.
* The **Preview in Teams** button launches your app quickly in the Teams client for debugging.

## Use tools to create app features

The Developer Portal also includes tools to help you build key features of Teams apps. The following are the tools:

* **Scene studio**: Design [custom Together Mode scenes in Teams](../../apps-in-teams-meetings/teams-together-mode.md) for Teams meetings.
* **Adaptive Cards editor (Preview)**: Create and preview Adaptive Cards to include with your apps.
* **Identity platform management (Preview)**: Register your apps with Microsoft Entra ID to help users sign in and provide access to APIs.
* **Teams Store app validation**: Check your app package against the test cases that Microsoft uses to review your app. We recommend you to use latest app validation tool in your app under [**Publish**](#publish) section.
* **Bot management**: Add conversational bots to your app that communicate with users, respond to their questions, and proactively notify them about changes and other events.

To add a bot:

1. In the Developer Portal, select **Tools** in the left pane.
1. Select the **Bot management**.

    :::image type="content" source="../../assets/images/tdp/tools-in-dev-portal_1.png" alt-text="The screenshot is an example that shows the tools in developer portal, which helps you to build key features." lightbox="../../assets/images/tdp/tools-in-dev-portal_1.PNG":::

1. In the Bot management page, select **+ New Bot**.
1. Enter the name and select **Add**.

    :::image type="content" source="../../assets/images/tdp/Add_new_bot.PNG" alt-text="Add a new bot by using bot management option." lightbox="../../assets/images/tdp/Add_new_bot.PNG":::

From the Developer Portal, you can go to Bot Framework portal and configure your bot to update icon and other properties.

  > [!NOTE]
  > Bot ID doesn't support environment variables.

## See also

* [Teams Toolkit Overview](../../toolkit/teams-toolkit-fundamentals.md)
* [Include a SaaS offer with your Microsoft Teams app](~/concepts/deploy-and-publish/appsource/prepare/include-saas-offer.md)
