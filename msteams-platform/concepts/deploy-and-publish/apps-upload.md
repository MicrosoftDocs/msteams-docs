---
title: Upload your custom app
description: Describes how to upload your app in Microsoft Teams
ms.topic: how-to
ms.author: lajanuar
keywords: teams apps upload
---

# Upload your app to Microsoft Teams
This document guides you on the process to upload your apps to your organization environment through different methods.

After you [create an app package](../build-and-test/apps-package.md), upload your app package and test the app experience within Microsoft Teams. After uploading, the package is available to all users of the selected team, and only users of that team.

Before uploading the app package, ensure that the [prerequisite](#prerequisite) is fulfilled. Now, use one of the following methods to upload your apps to Teams:
* [Upload using the Teams store](#upload-your-package-into-a-team-or-conversation-using-the-store)

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

You can also upload your app package using the **Apps** tab.

**To upload your app package**

1. In the target team, choose **More options** (**&#8943;**) and select **Manage team**.

   > [!NOTE]
   > You must be the team owner or the owner must give access to users to add the appropriate app types for this functionality to appear.

2. Select the **Apps** tab, and then choose **Upload a custom app** on the lower right.

   ![Upload entry point](../../assets/images/UploadACustomApp.png)

3. In the **Open** dialog, navigate to your .zip package, and then select it.
  
4. Select **Open** and your uploaded app appears in the list.

   ![Example of bot in list of uploaded bots](../../assets/images/botinlist.jpg)

   > [!NOTE]
   > If your app does not appear, the most common reason is an error in the manifest, particularly IDs for the app, bot, and messaging extensions.

## Troubleshoot

If the manifest fails to load, check that you followed all the instructions in [create the app package](../../concepts/build-and-test/apps-package.md) and validated your manifest against the [schema](../../resources/schema/manifest-schema.md).


## Test the uploaded app package

You can access and test your uploaded app package. The testing helps you ensure that your app is successfully uploaded. You can access the tab, bot, messaging extension, and connectors in your app package.

### Test your uploaded configurable tab

If your app contains tabs, you can pin them to any conversation or team channel using the standard tab gallery flow.

**To test a tab**

1. Go to a channel in the team. Select **+** and **Add a tab** to the right of the existing tabs.
2. Select your tab from the **Add a tab** gallery that appears.
![The Add a tab dialog box](../../assets/images/tab_gallery.png)

3. Accept the consent prompt.
4. Configure your tab through the [configuration page](../../tabs/how-to/create-tab-pages/configuration-page.md), and select **Save**.

### Test your uploaded bot

When you add a bot to a team, it must be usable by anyone on that team, inside and outside the team channels, depending on the bot scope definition. You and other team members can see a post in the **General** channel indicating that the bot has been added to the team.

For a Microsoft Teams bot, you can start the conversation by invoking your bot. You must @mention the name of the bot, which must autocomplete.

To test direct chats with your bot, you can either access it through the app home or @mention the bot name in a channel. You can also search for it in the **New Chat** window.

To add your bot to a conversation, you can @mention the bot name in a conversation or search for it in the **New Chat** window.

### Test your uploaded connector

With the app loaded in the team or conversation, users can set up a Connector using the standard Connectors gallery flow.

**To test your uploaded connector**

1. Go to a channel in the team. Select **More options** (*&#8943;*), and choose **Connectors**.
2. Select your connector from the sideloaded section at the bottom.
3. Configure your connector through its [configuration page](../../webhooks-and-connectors/how-to/connectors-creating.md), and select **Save**.

    ![The add connector dialog box](../../assets/images/connector_gallery.png).

### Test your uploaded messaging extension

An uploaded app with a messaging extension automatically appears in the **More options** (*&#8943;*) menu in the compose box.

![Messaging extensions](../../assets/images/compose-extensions/cesampleapp.png)

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
> [Use the app](/office/apps-and-services-cc1fba57-9900-4634-8306-2360a40c665b?ui=en-us&rs=en-us&ad=us)

## Next step

> [!div class="nextstepaction"]
> [Publish to your orgranization](/MicrosoftTeams/manage-apps?toc=%2Fmicrosoftteams%2Fplatform%2Ftoc.json&bc=%2FMicrosoftTeams%2Fbreadcrumb%2Ftoc.json)
