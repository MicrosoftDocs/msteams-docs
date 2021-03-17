---
title: Sideload your app
description: Learn how to upload your custom app in Microsoft Teams.
ms.topic: how-to
author: KirtiPereira
ms.author: surbhigupta
---

# Sideload your app in Microsoft Teams

With sideloading, you can distribute your Microsoft Teams app to a small group of users or even an individual. It's a common way to test and debug apps locally.

> [!NOTE]
> Uploading an updated package for an existing app with a bot might not show tab changes when viewed through the conversations window. You can access the app through the apps fly-out or test in a clean environment.

## Create your upload package

For development and AppSource submission, you must create a package that you can upload. The package must contain the information to describe your experience. The package is a .zip file that contains the application manifest and icons that uniquely define your experience.

To create an upload package, see [Create the package for your Microsoft Teams app](../build-and-test/apps-package.md).

After you create the package, upload it into a team. The uploaded package is only available to the users of the selected team.

## Load your package into Teams

You can test your package by uploading it into Teams.

> [!NOTE]
> For uploading to work, your tenant admin must first [enable uploading of apps](/microsoftteams/admin-settings).

There are two ways to upload your app to Teams:

* Using the Store
* Using the Apps tab

## Upload your package into a team or conversation using the Store

1. In the lower left corner of Teams, choose the **Store** icon. On the Store page, choose **Upload a custom app**.

  ![View team](../../assets/images/store-upload-a-custom-app2.png)

2. In the **Open** dialog, navigate to the package you want to upload and choose Open.

   ![Add menu](../../assets/images/NewappAddmenudropdown.png)

The uploaded package must be available for use in the team or conversation specified in the consent dialog. If your app does not appear, the most common reason is an error in the manifest, particularly IDs for the app, bot, and messaging extensions. If the app is not scoped for conversations that option does not appear.

>[!NOTE]
> * Apps in conversations is currently in [Developer Preview](../../resources/dev-preview/developer-preview-intro.md), and the option does not appear if Teams is not running in that mode.
> * Create your [app package](~/concepts/build-and-test/apps-package.md) and [validate it](https://dev.teams.microsoft.com/appvalidation.html) for errors.
> * [Enable sideloading in your Teams tenant](~/concepts/build-and-test/prepare-your-o365-tenant.md#enable-custom-teams-apps-and-turn-on-custom-app-uploading).
> * Make sure your app services are running and accessible via HTTPs.

## Sideload your app
With your app running and accessible via HTTPS, you're ready to upload it to Teams.

1. Log in to the Teams client with your [Microsoft 365 development account](../build-your-first-app/build-first-app-overview.md#set-up-your-development-account).)
1. Select **Apps**, then choose **Upload a custom app**.
1. Select your app package .zip file. An install dialog displays.
:::image type="content" source="~/assets/images/build-your-first-app/add-teams-app.png" alt-text="Screenshot showing an example of a Teams app install dialog.":::
1. Select **Add** to install your app.

## Troubleshoot sideloading issues
1. In the target team, choose **More options** (**&#8943;**) and select **Manage team**.

   > [!NOTE]
   > You must be the team owner or the owner must give access to users to add the appropriate app types for this functionality to appear.

2. Select the **Apps** tab and choose **Upload a custom app** on the lower right.

If your app fails to sideload, do the following until the issue resolves:

1. Go back through the instructions when [creating your app package](../../concepts/build-and-test/apps-package.md).
1. [Validate your app package](https://dev.teams.microsoft.com/appvalidation.html) again.
1. Make sure your app manifest matches the latest [schema](../../resources/schema/manifest-schema.md).

## Access your sideloaded app
1. Select your .zip package from the computer.
2. You can see your uploaded app in the list.

Teams provides several ways to open apps you've added. For more information, see [access your apps in Teams](https://support.microsoft.com/office/access-your-apps-in-teams-0758cb09-9e85-40e7-a974-51df7734646a).

## Update your sideloaded app
You can update your app service code without having to sideload the app again. However, you must upload the app again if you change any app configurations (i.e., the manifest).

## Remove your sideloaded app
To remove your app, select the app icon in Teams, and open the contextual menu, and then select **Uninstall**.

## Add a default install scope and group capability

> [!NOTE]
> The default install scope and group capability is currently available in developer preview only.

Although installing an app in the personal scope works for most apps, some of the apps in Teams Store support both personal and team scopes.
Some of these apps are intended to work in a team, meetings, or a groupchat, with personal app experience being secondary.
The default install scope selection helps you to specify the `defaultInstallScope` for the apps that you publish. The app installation experience makes the default options available to the user, while the rest is moved under the chevron as highlighted in the image.

![Add an app](../../assets/images/compose-extensions/addanapp.png)

The `defaultInstallScope` property supports values, such as personal, team, groupchat, or meetings.

> [!NOTE]
>`defaultGroupCapability` provides the default capability that is added to the team, groupchat or meetings. Choose a tab, bot, or connector as the default capability for your app, but you must ensure that you have provided the selected capability in your app definition.

## Remove or update your app

To remove your app, select the delete icon next to the app name in the **View Teams** bots list. If you change manifest information, first remove the app and then add the updated package, see [Load your package into a team](#load-your-package-into-teams). Code changes on your service do not require you to upload your manifest again. However, if the code changes require manifest updates, such as changes to the URL or the Microsoft app ID for its bot, you must upload the manifest again.

> [!NOTE]
> You cannot remove a bot from a personal context entirely. If the bot is removed and added again, additional communication with the bot appends to the previous conversation.


## See also

> [!div class="nextstepaction"]
> [Use your Teams app](/office/apps-and-services-cc1fba57-9900-4634-8306-2360a40c665b?ui=en-us&rs=en-us&ad=us)


