---
title: Upload your custom app
description: Learn how to sideload your app in Microsoft Teams. Sideloading is common when testing and debugging an app during development.
ms.topic: how-to
author: surbhigupta
ms.author: surbhigupta
ms.localizationpriority: high
---

# Upload your app in Teams

You can sideload Microsoft Teams apps without having to publish to your organization or the Teams store in the following scenarios:

* You want to test and debug an app locally yourself or with other developers.
* You built an app for yourself to automate a workflow.
* You built an app for a small set of users, such as, your work group.

> [!NOTE]
> Sideloading your messaging extension app multiple times displays more than one instance for messaging extensions.

> [!IMPORTANT]
>
> * Currently, sideloading of apps is possible only in Government Community Cloud (GCC) and is not possible in GCC-High and Department of Defense (DOD).
> * App installation is supported only on Teams desktop client.

## Prerequisites

* Ensure to create your [app package](~/concepts/build-and-test/apps-package.md) and [validate it](https://dev.teams.microsoft.com/appvalidation.html) for errors.
* [Enable custom app uploading](~/concepts/build-and-test/prepare-your-o365-tenant.md#enable-custom-teams-apps-and-turn-on-custom-app-uploading) in Teams.
* Ensure that your app is running and accessible using HTTPs.

## Upload your app

You can sideload your app to a team, chat, meeting, or for personal use depending on how you configured your app's scope.

1. Log in to the Teams client with your [Microsoft 365 development account](https://developer.microsoft.com/microsoft-365/dev-program).

1. Select **Apps** > **Manage your apps** and **Upload an app**.

    :::image type="content" source="~/assets/images/publish-app/manage-apps.png" alt-text="Screenshot of Teams app that shows the Publish an app option under Manage your apps.":::

1. Select **Upload a custom app**.

   :::image type="content" source="~/assets/images/publish-app/publish-app.png" alt-text="Screenshot shows the Upload a custom app option.":::

1. Select your app package .zip file.
1. Add your app to Teams as per your requirement:</br>

   a. Select **Add** to add your personal app.</br>
   b. Use the dropdown menu to add your app to a Team or chat.

    :::image type="content" source="~/assets/images/publish-app/teams-app-detail.png" alt-text="Screenshot shows the Add option dropdown to add your personal app.":::

## Troubleshoot

If your app fails to sideload or encounters any issues to upload, check the following options:

1. Ensure that you've followed all the instructions for [creating your app package](../../concepts/build-and-test/apps-package.md).
1. [Validate your app package](https://dev.teams.microsoft.com/appvalidation.html).
1. Ensure your app manifest matches with the latest [schema](../../resources/schema/manifest-schema.md).

## Manage your apps

Manage your apps allows users to have a dedicated place to manage, update and remove their apps, permissions, and subscriptions on the Teams client. The users can install the apps from **Manage your apps**.

### Access your app

To access apps through **Manage your apps**, follow the steps:

1. Go to **Apps** and select **Manage your apps** in Teams to view the installed apps across all your channels or for personal use in a list format.

    :::image type="content" source="~/assets/images/publish-app/manage-apps-list.png" alt-text="Screenshot shows the installed apps under Manage your apps.":::

1. Select the app dropdown to view all the scopes where the app is installed.

    :::image type="content" source="~/assets/images/publish-app/app-scopes.png" alt-text="Screenshot shows the app scopes from the app dropdown.":::

1. Select the scope of app to go to the app in the channel or personal view. The list of scopes consists of personal scope and teams scope only. Apps installed in group chat scope aren't displayed in this view currently.

Teams provides several ways to open apps. For more information, see [access your apps in Teams](https://support.microsoft.com/office/access-your-apps-in-teams-0758cb09-9e85-40e7-a974-51df7734646a).

### Update your app

You don't have to sideload your app again if you make code changes (these are reflected in Teams in real-time). However, you must reinstall if you change any app configurations.

If an update is available to your app, then the **Update available** option is enabled. To update, follow the steps:

1. Select **Update available** to view update.

     :::image type="content" source="~/assets/images/publish-app/update-available.png" alt-text="Screenshot shows the Update available option under Manage your apps.":::

1. Select **View update**. A window with update option appears.
1. Select **Update** to update your app.

     :::image type="content" source="~/assets/images/publish-app/update-window.png" alt-text="Screenshot shows the app window with the Update option.":::

     :::image type="content" source="~/assets/images/publish-app/updated-app.png" alt-text="Screenshot shows the app successfully updated status under Manage your apps.":::

### Remove your app

To remove app from Teams, follow the steps:

1. Find the app in **Manage your app**.

1. Select &nbsp;:::image type="content" source="~/assets/images/publish-app/bin-icon.png" alt-text="Remove app in Teams.":::&nbsp; at the scope of the installed app.

    :::image type="content" source="~/assets/images/publish-app/uninstall-from-channel.png" alt-text="Screenshot shows the remove option in the scopes of an installed app.":::

1. Select **Remove** to remove your app.

    :::image type="content" source="~/assets/images/publish-app/remove-app-teams.png" alt-text="Screenshot shows the remove app dialog with the Remove option highlighted in red.":::

> [!NOTE]
>
> * You can't remove personal bot activity entirely. If you remove the app and add it again, new communication with the bot appends to the previous conversation with it.
> * Currently, you can't migrate your custom app to the Teams store. If you want to list your app to the Teams store, see [how to publish your app to the Microsoft Teams store](appsource/publish.md).

## Next step

> [!div class="nextstepaction"]
>[Create apps for Teams meetings](../../apps-in-teams-meetings/teams-apps-in-meetings.md)

## See also

* [Distribute your Microsoft Teams app](apps-publish-overview.md)
* [Configure default install options](~/concepts/deploy-and-publish/add-default-install-scope.md)
* [Maintain your published Microsoft Teams app](~/concepts/deploy-and-publish/appsource/post-publish/overview.md)
* [Add app to chat](/graph/api/chat-post-installedapps)
