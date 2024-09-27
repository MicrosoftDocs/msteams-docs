---
title: Know about Developer Portal for Teams
description: Learn how to create a brand new app, import an existing or published app in Developer Portal, and changelog for Developer Portal.
ms.localizationpriority: medium
ms.topic: overview
ms.author: surbhigupta
ms.date: 02/27/2023
---

# Developer Portal for Teams

<a href="https://dev.teams.microsoft.com" target="_blank">Developer Portal for Teams</a> (previously known as App Studio) is the primary tool for configuring, distributing, and managing your Microsoft Teams apps. With Developer Portal, you can collaborate with colleagues on your app, set up runtime environments, and much more.

:::image type="content" source="../../assets/images/tdp/tdp-home.png" alt-text="Screenshot shows the home page of Developer Portal." lightbox="../../assets/images/tdp/tdp-home.png":::

> [!NOTE]
>
> * Developer Portal for Government Community Cloud (GCC) is supported only as an app in Teams and not as a standalone website.
> * Developer Portal isn't available for GCC-High and Department of Defense (DOD) tenants. However, you can use a regular tenant to build an app in Developer Portal, download the app, and upload the app using [Microsoft Graph](/graph/api/teamsapp-publish?view=graph-rest-1.0&tabs=http&preserve-view=true) to a national cloud. For more information, see [national cloud deployments](/graph/deployments).

## Register an app

Developer Portal provides the following ways to register a Teams app:

* [Create and register a brand new app](#create-and-register-a-brand-new-app).
* [Import an existing app package](#import-an-existing-app).

### Create and register a brand new app

Developer Portal allows you to create a brand new app:

1. Sign in to [Developer Portal](https://dev.teams.microsoft.com) and select **Apps** from the left pane.

   :::image type="content" source="../../assets/images/tdp/home-page.png" alt-text="Screenshot shows the home page of Developer Portal with the Apps option highlighted in red." lightbox="../../assets/images/tdp/home-page.png":::

1. Select **+ New app**.

   :::image type="content" source="../../assets/images/tdp/enter-app-name-tdp.png" alt-text="Screenshot shows how to create a brand new app in Developer Portal." lightbox="../../assets/images/tdp/create-new-app-in-tdp.png":::

1. Enter app name and select **Add**.

   :::image type="content" source="../../assets/images/tdp/enter-app-name-tdp.png" alt-text="The screenshot shows how to create a brand new app in Developer Portal." lightbox="../../assets/images/tdp/enter-app-name-tdp.png":::

Now you've successfully created a brand new app and you can see all the basic information of the new app.

:::image type="content" source="../../assets/images/tdp/basic-information-app-tdp.png" alt-text="Screenshot shows the basic information of the app you created in Developer Portal." lightbox="../../assets/images/tdp/basic-information-app-tdp.png":::

### Import an existing app

Follow the steps to import and manage your existing app in Developer Portal:

1. In Developer Portal, select **Apps** from the left pane.
1. Select **Import app**.

   :::image type="content" source="../../assets/images/tdp/import-app.png" alt-text="Screenshot shows how to import your existing app in Developer Portal to manage your apps." lightbox="../../assets/images/tdp/import-app.png":::

1. Select the app manifest file, and then select **Open**.

   > [!NOTE]
   > You can receive an error message such as **Provided add-in package was not understood. Ensure that the file being submitted is a valid Office add-in package**, if there are nested folders or missing files in the app package folder.

1. Select **Import**.

   * Developer Portal creates a unique app ID and locks the ID for your registered Teams app. You can’t edit or provide an ID of your choice, which prevents to have duplicate app IDs for multiple apps.
   * If you create an app using the Microsoft Teams Toolkit for Visual Studio Code, you can manage your app in Developer Portal.
   * You can import an existing app to Developer Portal that was created in App Studio. If an app in your tenant doesn't have an owner, the Teams Tenant admin or Global admin can take ownership of the app from Teams Developer Portal.

     :::image type="content" source="../../assets/images/tdp/change-ownership-app-teams-global-admin.png" alt-text="Screenshot shows an example of a tenant admin taking ownership of an app in Teams Developer Portal.":::

#### Steps to import a published app that's not registered in Developer Portal

You might have published apps in Teams Store that wasn't registered in Developer Portal. If you want to monitor app analytics or validate your app, you must import your app into Developer Portal. While importing your published app, you might face the following error:

:::image type="content" source="../../assets/images/tdp/error-message.png" alt-text="Screenshot shows an example of error message when you import an existing app in Teams Developer Portal."::: 

To resolve this error, we recommend that you raise a [support ticket](../../feedback.md) to Microsoft with the following details:

* App ID
* Tenant ID
* Your email ID
* Screenshot of the email from Partner Center when the app was published.

This information is required to verify the app owner's identity, who raises the ticket and to allow them to import an app.

## Changelog for Developer Portal

Changelog for Developer Portal allows you to stay engaged with the latest updates in Teams. You can view the updates about features, recent changes in APIs, and important bug fixes.

To view **Changelog**, sign in to [Developer Portal](https://dev.teams.microsoft.com) and select **Changelog** from the left pane.

:::image type="content" source="../../assets/images/tdp/changelog.png" alt-text="Screenshot shows the Changelog in the Developer Portal highlighted in red.":::

The updates for Changelog in Developer Portal are categorized based on the following:

* **Added**: Updates on a service or feature that's a new feature or capability.
* **Changed**: Updates on a service or API that's modified.
* **Removed**: Updates on a service or API that's removed and may be replaced with a new and updated service.
* **Fixed**: Updates on a service or API that was previously identified as a high-priority or breaking-change issue that's fixed or mitigated.
* **Deprecated**: Updates on a service or API at the end of its life and deprecated.
* **Security**: Updates on important and critical security patch.

## Next step

> [!div class="nextstepaction"]
> [Manage your apps in Developer Portal](manage-your-apps-in-developer-portal.md)

## See also

* [Teams Toolkit Overview](../../toolkit/teams-toolkit-fundamentals.md)
* [Analyze your app's usage in Developer Portal](analyze-your-apps-usage-in-developer-portal.md)
* [Include a SaaS offer with your Microsoft Teams app](~/concepts/deploy-and-publish/appsource/prepare/include-saas-offer.md)
