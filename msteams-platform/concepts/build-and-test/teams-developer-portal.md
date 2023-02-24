---
title: Developer Portal for Teams
description: In this article, learn how to create a brand new app and import an existing app in Teams Developer Portal.
ms.localizationpriority: medium
ms.topic: overview
ms.author: surbhigupta
---

# Developer Portal for Teams

<a href="https://dev.teams.microsoft.com" target="_blank">Developer Portal for Teams</a> is the primary tool for configuring, distributing, and managing your Microsoft Teams apps. With Developer Portal, you can collaborate with colleagues on your app, set up runtime environments, and much more.

:::image type="content" source="../../assets/images/tdp/tdp-home.png" alt-text="The screenshot is an example that shows the home page of Developer Portal for Teams." lightbox="../../assets/images/tdp/tdp-home.png":::

> [!NOTE]
>
> * Currently, Developer Portal is not available for Government Community Cloud (GCC)-High or Department of Defense (DOD) tenants.
> * However, you can use a regular tenant to build an app in Developer Portal, download the app, and upload the app using [Microsoft Graph](/graph/api/teamsapp-publish?view=graph-rest-1.0&tabs=http&preserve-view=true) to a national cloud. For more information, see [National cloud deployments](/graph/deployments).

## Register an app

Developer Portal provides the following ways to register a Teams app:

* [Create and register a brand new app](#create-and-register-a-brand-new-app).
* [Import an existing app package](#import-an-existing-app).

### Create and register a brand new app

Developer portal allows you to create a brand new app:

1. Log into Developer Portal, select **Apps** from the left pane.

   :::image type="content" source="../../assets/images/tdp/home-page.png" alt-text="The screenshot is an example that shows the Developer Portal for Teams home page." lightbox="../../assets/images/tdp/home-page.png":::

1. Select **+ New app**.

   :::image type="content" source="../../assets/images/tdp/new-app.png" alt-text="Screenshot shows how to create a brand new app in Developer Portal for Teams.":::

1. Enter app name and select **Add**.

   :::image type="content" source="../../assets/images/tdp/enter-app-name-tdp.png" alt-text="The screenshot shows how to create a brand new app in Developer Portal for Teams." lightbox="../../assets/images/tdp/enter-app-name-tdp.png":::

Now you've successfully created a brand new app and you can see all the basic information of the new app.

:::image type="content" source="../../assets/images/tdp/basic-information-app-tdp.png" alt-text="The screenshot is an example that shows the basic information of the app you created in the Developer Portal for Teams." lightbox="../../assets/images/tdp/basic-information-app-tdp.png":::

### Import an existing app

Follow the steps to import and manage your existing app in Developer Portal:

1. Select **Apps** from the left pane of the Developer Portal.
1. Select **Import App**.

   :::image type="content" source="../../assets/images/tdp/import-app.png" alt-text="The screenshot show how to import your existing app in Developer Portal for Teams to manage your apps." lightbox="../../assets/images/tdp/import-app.png":::

1. Select the app manifest file, and then select **Open**.

   > [!NOTE]
   > You can receive an error message such as **Provided add-in package was not understood. Ensure that the file being submitted is a valid Office add-in package**, if there are nested folders or missing files in the app package folder.

1. Select **Import**.

   * Developer Portal creates a unique app ID and locks the ID for your registered Teams app. You can’t edit or provide an ID of your choice, which prevents to have duplicate app IDs for multiple apps.
   * If you create an app using the Microsoft Teams Toolkit for Visual Studio Code, you can manage your app in Developer Portal.
   * You can import an existing app which you created on App Studio to Developer Portal. To import an already published app to Developer Portal, the [app owner](~/concepts/build-and-test/manage-your-apps-in-developer-portal.md#advanced) needs to raise a service request through [admin portal](https://admin.microsoft.com/Adminportal/Home?#/support) to transfer the ownership over the app ID.

## Next step

> [!div class="nextstepaction"]
> [Manage your apps in Developer Portal](manage-your-apps-in-developer-portal.md)

## See also

* [Teams Toolkit Overview](../../toolkit/teams-toolkit-fundamentals.md)
* [Analyze your app's usage in Developer Portal](analyze-your-apps-usage-in-developer-portal.md)
* [Include a SaaS offer with your Microsoft Teams app](~/concepts/deploy-and-publish/appsource/prepare/include-saas-offer.md)
