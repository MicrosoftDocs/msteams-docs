---
title: Upload your custom app
description: Learn how to sideload your app in Microsoft Teams. Sideloading is common when testing and debugging an app during development.
ms.topic: how-to
author: surbhigupta
ms.author: surbhigupta
ms.localizationpriority: high
---

# Upload your app in Microsoft Teams

You can sideload Microsoft Teams apps without having to publish to your organization or the Teams store in the following scenarios:

* You want to test and debug an app locally yourself or with other developers.
* You built an app for yourself to automate a workflow.
* You built an app for a small set of users, such as, your work group.

> [!IMPORTANT]
> Currently, sideloading apps are available in Government Community Cloud (GCC), but are not available for GCC-High and Department of Defense (DOD).

## Prerequisites

* Ensure to create your [app package](~/concepts/build-and-test/apps-package.md) and [validate it](https://dev.teams.microsoft.com/appvalidation.html) for errors.
* [Enable custom app uploading](~/concepts/build-and-test/prepare-your-o365-tenant.md#enable-custom-teams-apps-and-turn-on-custom-app-uploading) in Teams.
* Ensure that your app is running and accessible using HTTPs.

## Upload your app

You can sideload your app to a team, chat, meeting, or for personal use depending on how you configured your app's scope.

1. Log in to the Teams client with your [Microsoft 365 development account](~/build-your-first-app/build-and-run.md#prerequisites).
1. Select **Store** and select **Manage your apps**.
1. Select **Publish an app** and **Upload a custom app**.
1. Select your app package .zip file, the following window appears:

    :::image type="content" source="~/assets/images/build-your-first-app/add-teams-app.png" alt-text="Screenshot showing an example of a Teams app install dialog.":::

1. Select **Add** to add your app to Teams.

## Troubleshooting

If your app fails to sideload or any issues to upload, check the following options:

1. Ensure that you have followed all the instructions for [creating your app package](../../concepts/build-and-test/apps-package.md).
1. [Validate your app package](https://dev.teams.microsoft.com/appvalidation.html).
1. Ensure your app manifest matches to the latest [schema](../../resources/schema/manifest-schema.md).

## Access your app

Manage your apps allows users to have a dedicated place to manage and update their apps, permissions, and subscriptions on the Teams client. The users can install the apps from **Manage your apps**.

* Go to **Store** and select **Manage your apps** in Teams to view the installed apps across all your channels or for personal use in a list format.

:::image type="content" source="~/assets/images/publish-app/manage-apps-list.png" alt-text="Access teams apps list" border="true":::

* Select the app dropdown to view all the scopes where the app is installed.

:::image type="content" source="~/assets/images/publish-app/app-scopes.png" alt-text="Access teams app scope" border="true":::

Select the scope of app to go to the app in the channel or personal view.

>[!NOTE]
> Currently, group chat scope where the app is installed is not listed in the app dropdown.

**To access apps through channels**

1. Select more options (&#x25CF;&#x25CF;&#x25CF;) in your Team and then select **Manage Team** open **Apps** section To access apps your installed.

select ellipses &#x25CF;&#x25CF;&#x25CF; from the **Team** To access apps your installed in a channel,  beside the Team name and browse to **Manage Team** in the dropdown.

Select **Apps** in **Manage Team** to view list of apps installed in that Team.

Teams provides several ways to open apps. For more information, see [access your apps in Teams](https://support.microsoft.com/office/access-your-apps-in-teams-0758cb09-9e85-40e7-a974-51df7734646a).

## Update your app

You don't have to sideload your app again if you make code changes (these are reflected in Teams in real-time). However, you must reinstall if you change any app configurations.

If your app has any available update, then there would be an **Update available** option. once you select the **Update available** option, you can see the app dropdown where you have  **View update** option in the scope where you need to update the app.

By selecting **View update**, a window with update option appears. Select **Update** button  to update your app.

## Remove your app

To remove your app, select the app dropdown in **Manage your app** and a delete option would be displayed beside your app installed scope.

Select the delete icon where you want to delete the app and a window would popup with disclamair and **Remove** option. Select **Remove** to remove your app from the selected scope.

> [!NOTE]
> You can't remove personal bot activity entirely. If you remove the app and add it again, new communication with the bot appends to the previous conversation with it.

## Next step

> [!div class="nextstepaction"]
> [Use your Teams app](https://support.microsoft.com/office/apps-and-services-cc1fba57-9900-4634-8306-2360a40c665b)

## See also

* [Configure default install options](~/concepts/deploy-and-publish/add-default-install-scope.md)
* [Maintain your published Microsoft Teams app](~/concepts/deploy-and-publish/appsource/post-publish/overview.md)
