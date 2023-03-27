---
title: Developer Portal for Teams
description: In this article, learn how to create a brand new app and import an existing app in Teams Developer Portal. Also, learn about the Changelog for Developer Portal.
ms.localizationpriority: medium
ms.topic: overview
ms.author: surbhigupta
---

# Developer Portal for Teams

<a href="https://dev.teams.microsoft.com" target="_blank">Developer Portal for Teams</a> is the primary tool for configuring, distributing, and managing your Microsoft Teams apps. With Developer Portal, you can collaborate with colleagues on your app, set up runtime environments, and much more.

:::image type="content" source="../../assets/images/tdp/tdp-home.png" alt-text="Screenshot shows the home page of Developer Portal for Teams." lightbox="../../assets/images/tdp/tdp-home.png":::

> [!NOTE]
>
> * Developer Portal isn't available for Government Community Cloud (GCC)-High or Department of Defense (DOD) tenants.
> * However, you can use a regular tenant to build an app in Developer Portal, download the app, and upload the app using [Microsoft Graph](/graph/api/teamsapp-publish?view=graph-rest-1.0&tabs=http&preserve-view=true) to a national cloud. For more information, see [National cloud deployments](/graph/deployments).

## Register an app

Developer Portal provides the following ways to register a Teams app:

* [Create and register a brand new app](#create-and-register-a-brand-new-app).
* [Import an existing app package](#import-an-existing-app).

### Create and register a brand new app

Developer Portal allows you to create a brand new app:

1. Sign in to [Developer Portal](https://dev.teams.microsoft.com) and select **Apps** from the left pane.

   :::image type="content" source="../../assets/images/tdp/home-page.png" alt-text="Screenshot shows the home page of Developer Portal for Teams with the Apps option highlighted in red." lightbox="../../assets/images/tdp/home-page.png":::

1. Select **+ New app**.

   :::image type="content" source="../../assets/images/tdp/enter-app-name-tdp.png" alt-text="Screenshot shows how to create a brand new app in Developer Portal for Teams." lightbox="../../assets/images/tdp/create-new-app-in-tdp.png":::

1. Enter app name and select **Add**.

   :::image type="content" source="../../assets/images/tdp/enter-app-name-tdp.png" alt-text="The screenshot shows how to create a brand new app in Developer Portal for Teams." lightbox="../../assets/images/tdp/enter-app-name-tdp.png":::

Now you've successfully created a brand new app and you can see all the basic information of the new app.

:::image type="content" source="../../assets/images/tdp/basic-information-app-tdp.png" alt-text="Screenshot shows the basic information of the app you created in Developer Portal for Teams." lightbox="../../assets/images/tdp/basic-information-app-tdp.png":::

### Import an existing app

Follow the steps to import and manage your existing app in Developer Portal:

1. In Developer Portal, select **Apps** from the left pane.
1. Select **Import app**.

   :::image type="content" source="../../assets/images/tdp/import-app.png" alt-text="Screenshot shows how to import your existing app in Developer Portal for Teams to manage your apps." lightbox="../../assets/images/tdp/import-app.png":::

1. Select the app manifest file, and then select **Open**.

   > [!NOTE]
   > You can receive an error message such as **Provided add-in package was not understood. Ensure that the file being submitted is a valid Office add-in package**, if there are nested folders or missing files in the app package folder.

1. Select **Import**.

   * Developer Portal creates a unique app ID and locks the ID for your registered Teams app. You can’t edit or provide an ID of your choice, which prevents to have duplicate app IDs for multiple apps.
   * If you create an app using the Microsoft Teams Toolkit for Visual Studio Code, you can manage your app in Developer Portal.
   * You can import an existing app, which you created on App Studio to Developer Portal. If an app in your tenant doesn't have an owner, the Teams tenant admin or global admin can take ownership of the app from Teams Developer Portal.

   :::image type="content" source="../../assets/images/tdp/change-ownership-app-teams-global-admin.png" alt-text="Screenshot shows an example of a tenant admin taking ownership of an app in Teams Developer Portal.":::

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
