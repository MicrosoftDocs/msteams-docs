---
title: Upload your custom app
description: Learn how to upload your custom app in Microsoft Teams. Custom app upload is common when testing and debugging an app during development.
ms.topic: how-to
author: surbhigupta
ms.author: surbhigupta
ms.localizationpriority: high
ms.date: 04/16/2023
---

# Upload your app in Teams

You can upload Microsoft Teams apps without having to publish to your organization or the Microsoft Teams Store in the following scenarios:

* You want to test and debug an app locally yourself or with other developers.
* You built an app for yourself to automate a workflow.
* You built an app for a small set of users, such as, your work group.

> [!IMPORTANT]
>
> * Custom app upload is possible only in Government Community Cloud (GCC) and isn't possible in GCC High and Department of Defense (DOD).
> * App installation is supported only on Teams desktop client.
> * We recommend you to avoid multiple uploads of your message extension app to Teams, as it results in multiple instances of the message extension.

From January 31 2024, users can't chat with bots that aren't connected to a Microsoft Teams app such as Azure bots created through the Bot Framework or Power Virtual Agents. We recommend you to create a new Teams app connected to the Azure Bot using the [Developer Portal](../build-and-test/manage-your-apps-in-developer-portal.md#configure), publish it to Teams, and allow users to install the app using the [app permission policies](/microsoftteams/teams-app-permission-policies#edit-an-app-permission-policy).

If you want to test the app, you can assign users an [app setup policy](/microsoftteams/teams-app-setup-policies#manage-app-setup-policies) that allows uploading custom apps and chat with the Azure bot through a direct link to a chat.

## Prerequisites

* Ensure to create your [app package](~/concepts/build-and-test/apps-package.md) and [validate it](https://dev.teams.microsoft.com/appvalidation.html) for errors.
* [Enable custom app uploading](~/concepts/build-and-test/prepare-your-o365-tenant.md#enable-custom-teams-apps-and-turn-on-custom-app-uploading) in Teams.
* Ensure that your app is running and accessible using HTTPs.

## Upload your app

You can upload your app to a team, chat, meeting, or for personal use depending on how you configured your app's scope.

1. Log in to the Teams client with your [Microsoft 365 development account](https://developer.microsoft.com/microsoft-365/dev-program).

1. Select **Apps** > **Manage your apps** and **Upload an app**.

    :::image type="content" source="~/assets/images/publish-app/upload-an-app.png" alt-text="Screenshot shows the option to upload an app highlighted in red.":::

1. Select **Upload a custom app**.

   :::image type="content" source="~/assets/images/publish-app/upload-custom-app.png" alt-text="Screenshot shows the option to upload a custom app.":::

1. Select your app package .zip file.
1. Add your app to Teams as per your requirement:</br>

   a. Select **Add** to add your personal app.</br>
   b. Use the dropdown menu to add your app to a Team or chat.

    :::image type="content" source="~/assets/images/publish-app/teams-app-detail.png" alt-text="Screenshot shows the custom app to add in Teams or chat.":::

## Troubleshoot

If your app fails to upload or encounters any issues to upload, check the following options:

1. Ensure that you follow all the instructions for [creating your app package](../../concepts/build-and-test/apps-package.md).
1. [Validate your app package](https://dev.teams.microsoft.com/appvalidation.html).
1. Ensure your app manifest matches with the latest [schema](../../resources/schema/manifest-schema.md).

## Manage your apps

Manage your apps allows users to have a dedicated place to manage, update and remove their apps, permissions, and subscriptions on the Teams client. The users can install the apps from **Manage your apps**.

### Access your app

To access apps through **Manage your apps**, follow the steps:

1. Go to **Apps** and select **Manage your apps** in Teams to view the installed apps across all your channels or for personal use in a list format.

    :::image type="content" source="~/assets/images/publish-app/manage-apps-list.png" alt-text="Screenshot shows the list of installed apps that appears when you select manage your apps.":::

1. Select the app dropdown to view the list of scopes where the app is installed.

    :::image type="content" source="~/assets/images/publish-app/app-scopes.png" alt-text="Screenshot shows the list of scopes where the app is installed.":::

1. Select the scope of app to go to the app in the channel or personal view. The list of scopes consists of personal scope and teams scope only. Apps installed in group chat scope aren't displayed in this view currently.

Teams provides several ways to open apps. For more information, see [access your apps in Teams](https://support.microsoft.com/office/access-your-apps-in-teams-0758cb09-9e85-40e7-a974-51df7734646a).

### Update your app

You don't have to upload your custom app again if you make code changes (these are reflected in Teams in real-time). However, you must reinstall if you change any app configurations. For more information, see [Role of an admin in upgrading Teams apps](/MicrosoftTeams/apps-update-experience).

When a Teams app receives an update, the user must consent to update the app in any one context, and the app is automatically updated in all the related contexts (chats, channels, and meetings) where the app is installed. The user can update the app from any context.

If an update is available for your app, follow these steps to update your app from the Teams Store:

1. Go to **Microsoft Teams**.
1. Select **Apps** > **Manage your apps**.

    :::image type="content" source="../../assets/images/publish-app/update-available-manage-apps.png" alt-text="Screenshot shows the updates available for apps installed in the manage your apps option.":::

1. Under the **Apps** tab, check for the **Update** option next to the app.

1. Select **Update**.

   :::image type="content" source="../../assets/images/publish-app/update-available.png" alt-text="Screenshot shows the option to select update for the Teams app.":::

1. Select **Update now**.

   :::image type="content" source="../../assets/images/publish-app/update-window.png" alt-text="Screenshot shows the option to update the app installed in Teams.":::

   The app is automatically updated in all the related contexts (chats, channels, and meetings) where the app is installed.

### Remove your app

To remove app from Teams, follow the steps:

1. Find the app in **Manage your apps**.

1. Select &nbsp;:::image type="content" source="../../assets/images/publish-app/bin-icon.png" alt-text="Screenshot shows the delete icon to remove app in Teams.":::&nbsp; at the scope of the installed app.

    :::image type="content" source="../../assets/images/publish-app/uninstall-from-channel.png" alt-text="Screenshot shows the option to remove app in a channel highlighted in red.":::

1. Select **Remove** to remove your app.

    :::image type="content" source="../../assets/images/publish-app/remove-app-teams.png" alt-text="Screenshot shows the option to select remove option in teams.":::

> [!NOTE]
>
> * You can't remove personal bot activity entirely. If you remove the app and add it again, new communication with the bot appends to the previous conversation with it.
> * You can't migrate your custom app to the Teams Store. If you want to list your app to the Teams Store, see [how to publish your app to the Teams Store](appsource/publish.md).

## Next step

> [!div class="nextstepaction"]
>[Create apps for Teams meetings](../../apps-in-teams-meetings/teams-apps-in-meetings.md)

## See also

* [Distribute your Microsoft Teams app](apps-publish-overview.md)
* [Configure default install options](~/concepts/deploy-and-publish/add-default-install-scope.md)
* [Maintain your published Microsoft Teams app](~/concepts/deploy-and-publish/appsource/post-publish/overview.md)
* [Add app to chat](/graph/api/chat-post-installedapps)
* [Manage custom and uploaded apps](/microsoftteams/teams-custom-app-policies-and-settings)
