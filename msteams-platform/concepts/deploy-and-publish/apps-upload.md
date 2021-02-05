---
title: Upload your custom app
description: Describes how to upload your app in Microsoft Teams
ms.topic: how-to
ms.author: lajanuar
keywords: teams apps Upload
---
# Upload an app package to Microsoft Teams

To test your app experience within Microsoft Teams, you need to upload your app to Teams. Uploading adds the app to the team you select, and you and your team members can interact with it like end users.

> [!NOTE]
> Uploading an updated package for an existing app with a bot might not show tab changes when viewed through the Conversations window. It's better to access it via the Apps fly-out, or test on a clean test environment.

## Create your upload package

For development as well as AppSource (formerly Office Store) submission you must create an uploadable package that contains the information to describe your experience. The package, a .zip file, contains the application manifest and icons that uniquely define your experience.

To create an upload package, see [Create the package for your Microsoft Teams app](../build-and-test/apps-package.md).

With your package created, you can now upload it into a team. Once uploaded it will be available for all users in the selected team, and only the users of that team.

## Load your package into Teams

You can test your package by uploading it into Teams.

> [!NOTE]
> For uploading to work, your tenant admin must first [enable uploading of apps](/microsoftteams/admin-settings).

There are two ways to upload your app to Teams:

* Using the Store
* Using the Apps tab

## Upload your package into a team or conversation using the Store

1. In the lower left corner of Teams, choose the Store icon. On the Store page, choose "Upload a custom app".

  ![View team](../../assets/images/store-upload-a-custom-app2.png)

2. In the *Open* dialog, navigate to the package you want to upload and choose *Open*.

   ![Add menu](../../assets/images/NewappAddmenudropdown.png)

The uploaded package must be available for use in the team or conversation specified in the consent dialog. If your app does not appear, the most common reason is an error in the manifest, particularly IDs for the app, bot and messaging extensions. If the app is not scoped for conversations, that option will not appear.

>[!NOTE]
> Apps in conversations is currently in [Developer Preview](../../resources/dev-preview/developer-preview-intro.md), and the option will not appear if Teams is not running in that mode.

![Example of bot in list of uploaded bots](../../assets/images/botinlist.jpg)

## Upload your package into a team using the Apps tab

1. In the target team, choose *More options* (**&#8943;**) and choose *Manage team*.

   > [!NOTE]
   > You must be the team owner, or the owner must allow users to add the appropriate app types for this functionality to appear.

2. Select the Apps tab, and then choose *Upload a custom app* on the lower right.

   ![Upload entry point](../../assets/images/UploadACustomApp.png)

3. Browse to and select your .zip package from your computer.

4. After a brief pause you will see your uploaded app in the list.

   ![Example of bot in list of uploaded bots](../../assets/images/botinlist.jpg)

If your app does not load, the most common reason is an error in the manifest, particularly ids for the app, bot and messaging extensions.

## Access your uploaded configurable tab

If the app contains tabs, users can pin them to any conversation or team channel using the standard tab gallery flow:

1. Go to a channel in the team. Choose *+* (*Add a tab*) to the right of the existing tabs.

2. Select your tab from the gallery that appears.

3. Accept the consent prompt.

4. Configure your tab via its [configuration page](../../tabs/how-to/create-tab-pages/configuration-page.md) and choose *Save*.

  ![The Add a tab dialog box, featuring a gallery of available tabs](../../assets/images/tab_gallery.png)

## Access your uploaded bot

When you add a bot to a team, it should be usable by anyone on that team, inside and outside the team channels, depending on bot scope definition. You and other team members will see a post in the General channel indicating that the bot has been added to the team.

For a teams-enabled bot, you can start by invoking your bot by @mentioning the name of the bot, which should autocomplete.

To test direct chats with your bot, you can either access it via the App home, @mention it in a channel, or search for it in the **New Chat** window.

When you add your bot to a conversation To test direct chats with your bot, you can @mention it in a conversation, or search for it in the **New Chat** window.

## Access your uploaded Connector

With the app loaded in the team or conversation, users can set up a Connector using the standard Connectors gallery flow:

1. Go to a channel in the team. Choose *More options* (*&#8943;*) and choose *Connectors*.

2. Select your Connector from the **Sideloaded** section at the bottom.

3. Configure your Connector via its [configuration page](../../webhooks-and-connectors/how-to/connectors-creating.md) and choose *Save*.

  ![The Add a tab dialog box, featuring a gallery of available tabs.](../../assets/images/connector_gallery.png)

## Access your uploaded messaging extension

An uploaded app with a messaging extension automatically appears in the *More options* (*&#8943;*) menu in the compose box.

![Messaging extensions](../../assets/images/compose-extensions/cesampleapp.png)

## Add an app

Although installing an app in the personal scope works for most apps, some of the apps in Teams Store support both personal and team scopes.
Some of these apps are intended to work in a team or a group chat, with personal app experience being secondary.
Hence, the default install scope selection helps you to specify the `defaultInstallScope` for the apps that you publish. The app installation experience makes the default options available to the user, while the rest is moved under the chevron as highlighted in the image.

![Add an app](../../assets/images/compose-extensions/addanapp.png)

The `defaultInstallScope` property supports values, such as personal, team, group chat, or meeting.

> [!NOTE]
> For a successful validation, specify a `defaultInstallScope` that supports all capabilities. Each capability in an app must support the `defaultInstallScope`, else the app acts as it would if the default installation scope is excluded.

`defaultGroupCapability` defines capabilities that are installed by default. Choose tab, bot, or connector as the default capability of the app for each group scope. The app validation fails if any of the scopes do not support the default capability.

## Remove or update your app

To remove your app, select the delete icon next to the app name in the View Teams bots list.

If you change manifest information, you must first remove the app and then add the updated package per [Load your package into a team](#load-your-package-into-teams). In general, code changes on your service do not require you to re-upload your manifest, unless those changes require manifest updates, such as changes to the URL or the Microsoft app ID for its bot.

> [!NOTE]
> You cannot remove a bot from a personal context entirely. If the bot is removed and added again, additional communication with the bot appends to the previous conversation.

## Troubleshooting notes

If the manifest fails to load, check that you have followed all the instructions in [Create the package](../../concepts/build-and-test/apps-package.md) and validated your manifest against the [schema](../../resources/schema/manifest-schema.md).
