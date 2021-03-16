---
title: Sideload your app
description: Learn how to upload your custom app in Microsoft Teams.
ms.topic: how-to
author: KirtiPereira
ms.author: surbhigupta
---

# Sideload your app in Microsoft Teams

With sideloading, you can distribute your Microsoft Teams app to a small group of users or even an individual. It's a common way to test and debug apps locally.

## Prerequisites

* Create your [app package](~/concepts/build-and-test/apps-package.md) and [validate it](https://dev.teams.microsoft.com/appvalidation.html) for errors.
* [Enable sideloading in your Teams tenant](~/concepts/build-and-test/prepare-your-o365-tenant.md#enable-custom-teams-apps-and-turn-on-custom-app-uploading).
* Make sure your app services are running and accessible via HTTPs.

## Sideload your app

With your app running and accessible via HTTPS, you're ready to upload it to Teams.

1. Log in to the Teams client with your [Microsoft 365 development account](../build-your-first-app/build-first-app-overview.md#set-up-your-development-account).)
1. Select **Apps**, then choose **Upload a custom app**.
1. Select your app package .zip file. An install dialog displays.
:::image type="content" source="~/assets/images/build-your-first-app/add-teams-app.png" alt-text="Screenshot showing an example of a Teams app install dialog.":::
1. Select **Add** to install your app.

## Troubleshoot sideloading issues

If your app fails to sideload, do the following until the issue resolves:

1. Go back through the instructions when [creating your app package](../../concepts/build-and-test/apps-package.md).
1. [Validate your app package](https://dev.teams.microsoft.com/appvalidation.html) again.
1. Make sure your app manifest matches the latest [schema](../../resources/schema/manifest-schema.md).

## Access your sideloaded app

Teams provides several ways to open apps you've added. For more information, see [access your apps in Teams](https://support.microsoft.com/office/access-your-apps-in-teams-0758cb09-9e85-40e7-a974-51df7734646a).

## Update your sideloaded app

You can update your app service code without having to sideload the app again. However, you must upload the app again if you change any app configurations (i.e., the manifest).

## Remove your sideloaded app

To remove your app, right click the app icon in Teams and select **Uninstall**.

> [!NOTE]
> You can't remove a bot from a personal context entirely. If you remove the bot and add it again, new communication with the bot appends to the previous conversation.

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

## See also

> [!div class="nextstepaction"]
> [Use your Teams app](/office/apps-and-services-cc1fba57-9900-4634-8306-2360a40c665b?ui=en-us&rs=en-us&ad=us)
