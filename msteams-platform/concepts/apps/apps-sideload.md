---
title: Sideload your app
description: Describes how to sideload your app in Microsoft Teams
keywords: teams apps sideloading
---

# Sideload your app in Microsoft Teams

To test your app experience within Microsoft Teams, you need to sideload your app using the following instructions. Sideloading adds the app to the team you select, and you and your team members can interact with it like end users.

For bots designed only for 1:1 contexts, see [Adding a bot for 1:1 chat only](~/concepts/bots/bots-test#adding-a-bot-for-11-chat-only) for an alternate way to access for testing purposes.

> [!NOTE]
> Sideloading an updated package for an existing app with a bot might not show tab changes when viewed through the Conversations window. We recommend you access via the Apps fly-out, or test on a clean test environment.

## Create your sideload package

For both development and final Office Store submission, you must create a sideloadable package that contains the information to describe your experience. The package, a .zip file, contains the application manifest and icons that uniquely define your experience.

To create your sideload package, see [Create the package for your Microsoft Teams app](~/publishing/apps-package).

## Load your package into a team

With your package created, you can now load it into a team of your choosing. This adds the experience as an available integration for all users in the selected team.

> [!NOTE]
> For sideloading to work, your tenant admin must first [enable sideloading of apps](/microsoftteams/admin-settings).

1. Create a new team for testing, if necessary. Click **Create team** at the bottom of the left-hand panel.

2. In the target team, choose **More options** (**&#8943;**) and choose **View team**.

   ![View team](~/assets/images/tab_view_team.png)

   > [!NOTE]
   > You must be the team owner, or the owner must allow users to add the appropriate app types for this functionality to appear.

3. Select the Apps tab, and then choose **Sideload an app** on the lower right.

   > [!NOTE]
   > This same flow works not only for bots but all other app extension types as well.

   ![Sideload entry point](~/assets/images/sideloadentrypoint.png)

4. Browse to and select your .zip package from your computer.

5. You will see your sideloaded app in the list.

   ![Example of bot in list of sideloaded bots](~/assets/images/botinlist.jpg)

## Accessing your sideloaded configurable tab

With the app loaded in the team, users can pin the tab to any channel on the team using the standard tab gallery flow:

1. Go to a channel in the team. Choose **+** (**Add a tab**) to the right of the existing tabs.

2. Select your tab from the gallery that appears.

3. Accept the consent prompt.

4. Configure your tab via its [configuration page](~/concepts/tabs/tabs-configuration) and choose **Save**. 

  ![The Add a tab dialog box, featuring a gallery of available tabs](~/assets/images/tab_gallery.png)

## Accessing your sideloaded bot
 
When you add a bot to the team, it should be usable by anyone on that team, inside and outside the team channels, depending on bot scope definition. You and other team members will see a post in the General channel indicating that the bot has been added to the team.

For a teams-enabled bot, you can start by invoking your bot by @mentioning the name of the bot, which should autocomplete.

To test direct chats with your bot, you can either access it via the App home, @mention it in a channel, or search for it in the **New Chat** window.

## Accessing your sideloaded Connector

With the app loaded in the team, users can set up a Connector on any channel in the team using the standard Connectors gallery flow:

1. Go to a channel in the team. Choose **More options** (**&#8943;**) and choose **Connectors**.

2. Select your Connector from the **Sideloaded** section at the bottom.

3. Configure your Connector via its [configuration page](~/concepts/connectors) and choose **Save**. 

  ![The Add a tab dialog box, featuring a gallery of available tabs.](~/assets/images/connector_gallery.png)

## Accessing your sideloaded compose extension

A sideloaded app with a compose extension automatically appears in the **More options** (**&#8943;**) menu in the compose box.

![Compose extensions](~/assets/images/compose-extensions/cesampleapp.png)

## Removing or updating your app

If you want to remove your app, select the trash-can icon next to the app name in the View Teams bots list.  

If you change manifest information, you must first remove the app and then add the updated package (per [Load your package into a team](#load-your-package-into-a-team)). Note that, in general, code changes on your service do not require you to re-sideload your manifest, unless those changes require manifest updates (such as changes to the URL or the Microsoft app ID for its bot). 

> [!NOTE]
> There is currently no way to completely remove a bot from 1:1 context.

## Troubleshooting notes

* If the manifest doesn't load, please double-check that you followed all the instructions in [Create the package](~/publishing/apps-package) and validated your manifest against the [schema](~/resources/schema/manifest-schema).

* Encountering other problems? See [Troubleshoot your Microsoft Teams app](~/troubleshoot/troubleshoot).
