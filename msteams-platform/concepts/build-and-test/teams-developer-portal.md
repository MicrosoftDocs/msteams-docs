---
title: Developer Portal for Teams
description: In this article, learn more about Developer Portal and how to create a brand new app and import an existing app in the Teams Developer Portal.
ms.localizationpriority: medium
ms.topic: overview
ms.author: surbhigupta
---

# Developer Portal for Teams

The <a href="https://dev.teams.microsoft.com" target="_blank">Developer Portal for Teams</a> is the primary tool for configuring, distributing, and managing your Microsoft Teams apps. With the Developer Portal, you can collaborate with colleagues on your app, set up runtime environments, and much more.

:::image type="content" source="../../assets/images/tdp/tdp_home_1.png" alt-text="Screenshot shows the home page of the Developer Portal for Teams.":::

> [!NOTE]
>
> * Currently, Developer Portal is not available for Government Community Cloud (GCC)-High or Department of Defense (DOD) tenants.
> * However, you can use a regular tenant to build an app in the Developer Portal, download the app, and upload the app using [Microsoft Graph](/graph/api/teamsapp-publish?view=graph-rest-1.0&tabs=http&preserve-view=true) to a national cloud. For more information, see [National cloud deployments](/graph/deployments).

## Register an app

The Developer Portal provides the following ways to register a Teams app:

* [Create and register a brand new app](#create-and-register-a-brand-new-app).
* [Import an existing app package](#import-an-existing-app).

### Create and register a brand new app

The Developer portal allows you to create a brand new app:

1. Sign in to [Developer Portal](https://dev.teams.microsoft.com) and select **Apps** from the left pane.

   :::image type="content" source="../../assets/images/tdp/home-page.png" alt-text="Screenshot shows the home page of the Developer Portal for Teams with the Apps option highlighted in red.":::

1. Select **New app** and enter app name.

   :::image type="content" source="../../assets/images/tdp/enter-app-name-tdp.png" alt-text="Screenshot shows how to create a brand new app in Developer Portal for Teams." lightbox="../../assets/images/tdp/create-new-app-in-tdp.png":::

1. Select **Add**.

Now you've successfully created a brand new app and you can see all the basic information of the new app.

:::image type="content" source="../../assets/images/tdp/basic-information-app-tdp.png" alt-text="Screenshot shows the basic information of the app you created in the Developer Portal for Teams.":::

### Import an existing app

Follow the steps to import and manage your existing app in the Developer Portal.

1. On the Developer Portal, select **Apps** from the left pane.
1. Select **Import app**.

   :::image type="content" source="../../assets/images/tdp/import-app.png" alt-text="Screenshot shows how to import your existing app in Developer Portal for Teams to manage your apps.":::

1. Select the app manifest file, and then select **Open**.
1. Select **Import**.

> [!NOTE]
>
> * The Developer Portal creates a unique app ID and locks the ID for your registered Teams app. You can’t edit or provide an ID of your choice, which prevents to have duplicate app IDs for multiple apps.
> * If you create an app using the Microsoft Teams Toolkit for Visual Studio Code, you can manage your app in the Developer Portal. For more information, see [Build apps with teams toolkit and Visual studio code](~/toolkit/visual-studio-code-overview.md).
> * You can import an existing app which you created on App Studio to the Developer Portal.

## Changelog for Developer Portal

Changelog for Developer Portal let's you stay engaged with the latest updates in Teams. You can view the updates about features, recent changes in APIs, important bug fixes, and other developer products.

To view the Changelog, sign in to [Developer Portal](https://dev.teams.microsoft.com) and select **Changelog** from the left pane.

:::image type="content" source="../../assets/images/tdp/changelog.png" alt-text="Screenshot shows the Changelog in the Developer Portal.":::

The updates for Changelog in the Developer Portal are categorized based on the following:

* Added
* Changed
* Removed
* Fixed
* Deprecated
* Security

## See also

[Include a SaaS offer with your Microsoft Teams app](~/concepts/deploy-and-publish/appsource/prepare/include-saas-offer.md)
