---
title: Upload your custom app
description: Describes how to upload your app in Microsoft Teams
ms.topic: how-to
keywords: teams apps Upload
---
# Upload an app package to Microsoft Teams

You must upload your app package and test the app experience within Microsoft Teams.
Uploading the app adds the app to the team you select. You and your team members can interact with the app easily.

> [!NOTE]
> Uploading an updated package for an existing app with a bot might not show the tab changes when viewed through the conversation window. It is recommended to access it through the Apps fly-out or test on a clean test environment.

## Load your package into Teams

Upload your app package and test in within Teams environment. After uploading, the package is available to all users in the selected team and only the users of that team.

> [!NOTE]
> To successfully upload your app, your tenant admin must first [enable uploading of apps](/microsoftteams/admin-settings).

There are two ways to upload your app to Teams:

* Using the Store
* Using the Apps tab

## Upload your package into a team or conversation using the Store

1. In the lower left corner of Teams, choose the **Store** icon. On the **Store** page, choose **Upload a custom app**.

  ![View team](../../assets/images/store-upload-a-custom-app2.png)

2. In the **Open** dialog, navigate to the package you want to upload and choose **Open**.

   ![Add menu](../../assets/images/NewappAddmenudropdown.png)

The uploaded package is available for use in the team or conversation specified in the consent dialog. If your app does not appear, the most common reason is an error in the manifest, particularly IDs for the app, bot and messaging extensions. If the app is not scoped for conversations, that option does not appear.

>[!NOTE]
> Apps in conversations is currently in [Developer Preview](../../resources/dev-preview/developer-preview-intro.md), and the option does not appear if Teams is not running in that mode.

![Example of bot in list of uploaded bots](../../assets/images/botinlist.jpg)

## Upload your package into a team using the Apps tab

1. In the target team, choose **More options** (**&#8943;**) and select **Manage team**.

> [!NOTE]
> You must be the team owner, or the owner must allow users to add the appropriate app types for this functionality to appear.

2. Select the Apps tab, and then choose **Upload a custom app** on the lower right.

![Upload entry point](../../assets/images/UploadACustomApp.png)

3. Select your .zip package from your computer.

4. After a brief pause, you can see your uploaded app in the list.

![Example of bot in list of uploaded bots](../../assets/images/botinlist.jpg)

If your app does not load, the most common reason is an error in the manifest, particularly IDs for the app, bot and messaging extensions.

## Remove or update your app

If you want to remove your app, select the trash-can icon next to the app name in the **View Teams** bots list.

If you change the manifest information, you must first remove the app and then add the updated package through [Load your package into Teams](#load-your-package-into-teams). In general, code changes on your service do not require you to re-upload your manifest, unless those changes require manifest updates, such as changes to the URL or the Microsoft app ID for its bot.

> [!NOTE]
> You can't completely remove a bot from personal context. If the bot is removed and re-added, additional communication with the bot appends to the previous conversation.

## Troubleshoot notes

* If the manifest fails to load, check that you followed all the instructions in [Create the package](../../concepts/build-and-test/apps-package.md) and validated your manifest against the [schema](../../resources/schema/manifest-schema.md).

## Next step

> [!div class="nextstepaction"]
> [Access your uploaded app](~/concepts/deploy-and-publish/apps-access.md)

