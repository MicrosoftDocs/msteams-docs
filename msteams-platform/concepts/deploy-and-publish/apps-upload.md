---
title: Upload your custom app
description: Describes how to upload your app in Microsoft Teams
ms.topic: how-to
keywords: teams apps Upload
---

# Upload an app package to Microsoft Teams
This document guides you on the process to upload your apps to your organization environment through different methods.

After you [create an app package](../build-and-test/apps-package.md), upload your app package and test the app experience within Microsoft Teams. After uploading, the package is available to all users of the selected team, and only users of that team.

Before uploading the app package, ensure that the [prerequisite](#prerequisite) is fulfilled. Now, use one of the following methods to upload your apps to Teams:
* [Upload using the App Store](#upload-your-package-into-a-team-or-conversation-using-the-store)
* [Upload using the Apps tab](#upload-your-package-into-a-team-using-the-apps-tab)

> [!NOTE]
> If you upload an updated package for an existing app with a bot it might not show the tab changes when viewed through the conversation window. It is, therefore, recommended to access it through the Apps fly-out or test on a clean test environment.

## Prerequisite
The tenant administrator must first [enable uploading of custom apps](/microsoftteams/admin-settings) to successfully upload your app package and test it within the Teams environment. 

## Upload your package into a team or conversation using the Store
This section guides you through the steps to upload your app package using the App Store.

**To upload your app package**

1. In the lower left corner of Teams, choose the **Store** icon. On the **Store** page, choose **Upload a custom app**.

   ![View team](../../assets/images/store-upload-a-custom-app2.png)

2. In the **Open** dialog, navigate to the package you want to upload and choose **Open**.
  ![Screenshot of the Open dialog box is required]()

3. After the package is uploaded, select if you want to add it to a team or chat. 
   
    ![Add menu](../../assets/images/NewappAddmenudropdown.png)

   The uploaded package is available for use in the team or conversation specified in the consent dialog. 

   > [!NOTE]
   >If your app does not appear, the most common reason is an error in the manifest, particularly IDs for the app, bot, and messaging extensions.<br/>
   If the app is not scoped for conversations, the **Add to a chat** option does not appear.

## Upload your package into a team using the Apps tab

>[!NOTE]
> **Apps** tab in conversations is currently in [Developer Preview](../../resources/dev-preview/developer-preview-intro.md), and the option does not appear if Teams is not running in that mode.
![Example of bot in list of uploaded bots](../../assets/images/botinlist.jpg)

confirmation required, **Is the above note still applicable?** 

You can also upload your app package using the **Apps** tab.

**To upload your app package**

1. In the target team, choose **More options** (**&#8943;**) and select **Manage team**.

   > [!NOTE]
   > You must be the team owner, or the owner must allow users to add the appropriate app types for this functionality to appear.

2. Select the **Apps** tab, and then choose **Upload a custom app** on the lower right.

   ![Upload entry point](../../assets/images/UploadACustomApp.png)

3. In the **Open** dialog, navigate to your .zip package, and then select it.
   ![Screenshot of the Open dialog box is required]()

4. Select **Open** and your uploaded app appears in the list.

   ![Example of bot in list of uploaded bots](../../assets/images/botinlist.jpg)

> [!NOTE]
   >If your app does not appear, the most common reason is an error in the manifest, particularly IDs for the app, bot, and messaging extensions.

## Remove or update your app

If you want to remove your app, select the **trash-can** icon next to the app name in the **View Teams** bots list.

If you change the manifest information, you must first remove the app and then add the updated package through load your package into Teams [App Store](#upload-your-package-into-a-team-or-conversation-using-the-Store) and [Apps tab](#upload-your-package-into-a-team-using-the-apps-tab). In general, code changes on your service do not require you to re-upload your manifest, unless those changes require manifest updates, such as changes to the URL or the Microsoft app ID for its bot.

> [!NOTE]
> You cannot completely remove a bot from personal context. If the bot is removed and re-added, additional communication with the bot appends to the previous conversation.

## Troubleshoot notes

If the manifest fails to load, check that you followed all the instructions in [create the app package](../../concepts/build-and-test/apps-package.md) and validated your manifest against the [schema](../../resources/schema/manifest-schema.md).

## Next step

> [!div class="nextstepaction"]
> [Access your uploaded app](apps-access.md)

