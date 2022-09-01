---
title: Developer Portal for Teams
description: In this article, learn more about Developer Portal and how to create a brand new app and import an existing app in the Teams Developer Portal.
ms.localizationpriority: medium
ms.topic: overview
ms.author: surbhigupta
---

# Developer Portal for Teams

The <a href="https://dev.teams.microsoft.com" target="_blank">Developer Portal for Teams</a> is the primary tool for configuring, distributing, and managing your Microsoft Teams apps. With the Developer Portal, you can collaborate with colleagues on your app, set up runtime environments, and much more.

:::image type="content" source="../../assets/images/tdp/tdp_home_1.png" alt-text="The screenshot is an example that shows the home page of the Developer Portal for Teams.":::

> [!NOTE]
>
> * Currently, Developer Portal is not available for Government Community Cloud (GCC), GCC-High, or Department of Defense (DOD) tenants.
> * However, you can use a regular tenant to build an app in the Developer Portal, download the app, and upload the app using [Microsoft Graph](/graph/api/teamsapp-publish?view=graph-rest-1.0&tabs=http&preserve-view=true) to a national cloud. For more information, see [National cloud deployments](/graph/deployments).
> * Currently, in some scenarios, Developer Portal won't load in the browser when AdBlocker is enabled. To continue with Developer Portal in browser, disable AdBlocker.

## Register an app

The Developer Portal provides the following ways to register a Teams app:

* [Create and register a brand new app](#create-and-register-a-brand-new-app)
* [Import an existing app](#import-an-existing-app)

### Create and register a brand new app

The Developer portal allows you to create a brand new app:

1. Go to the [Developer Portal](https://dev.teams.microsoft.com).

   The following page appears:

   :::image type="content" source="~/assets/images/tdp/dev-portal-first-page.png" alt-text="Developer portal first page":::

1. Select **Apps** from the left pane.

   :::image type="content" source="~/assets/images/tdp/select-app.png" alt-text="Select app":::

1. Select **New app**.

   :::image type="content" source="~/assets/images/tdp/select-new-app.png" alt-text="Select new app":::

   Add app window appears.

1. Enter app name and select **Add**.

   :::image type="content" source="~/assets/images/tdp/enter-app-name.png" alt-text="Enter app name":::

Now you've successfully created a brand new app and you can see all the basic information of the new app.

:::image type="content" source="~/assets/images/tdp/Dev-portal.png" alt-text="Developer Portal":::

### Import an existing app

Follow the steps to import and manage your existing app in the Developer Portal.

1. In the Developer Portal, select **Apps** from the left pane.

  :::image type="content" source="~/assets/images/tdp/select-app.png" alt-text="Select app1":::

1. Select **Import App**.

  :::image type="content" source="~/assets/images/tdp/select-import-app.png" alt-text="Import an app":::

1. Select the app manifest file, and then select **Open**.
1. Select **Import**.

   > [!NOTE]
   >
   > * The Developer Portal creates a unique app ID and locks the ID for your registered Teams app. You can’t edit or provide an ID of your choice, which prevents to have duplicate app IDs for multiple apps.
   > * If you create an app using the Microsoft Teams Toolkit for Visual Studio Code, you can manage your app in the Developer Portal. For more information, see [Build apps with teams toolkit and Visual studio code](~/toolkit/visual-studio-code-overview.md).
   > * You can import an existing app which you created on App Studio to the Developer Portal.

## See also

[Include a SaaS offer with your Microsoft Teams app](~/concepts/deploy-and-publish/appsource/prepare/include-saas-offer.md)
