---
title: Upgrade Teams to work with Outlook and Office.com
description: Upgrading Teams to work with Outlook and Office.com
keywords: teams visual studio code toolkit
ms.localizationpriority: medium
ms.topic: Upgrade Teams
ms.author: v-vasudhab
---

# Upgrade Teams application to work with Outlook and Office.com

> [!NOTE]
> This feature is currently available in Developer preview only.

Teams Toolkit helps you to upgrade Teams applications to work with Outlook and Office.com. You must upgrade the manifest and `TeamsJS` SDK to the latest version to run the application on Outlook and Office.com, to extend your Teams applications in Outlook and Office.com, the migration commands in Teams are as follows:

![Migration of Teams](../assets/images/upgrade-teams/teams-extended-in-outlook-and-office.png)

1. Use the command **Teams: Upgrade Teams manifest to extend in Outlook and Office** to upgrade manifest to the latest version.

1. Use the command **Teams: Upgrasde Teams JS SDK to extend in Outlook and Office** to upgrade `TeamsJS` SDK to the latest version.

> [!NOTE]
> To extend your Teams application in Outlook and Office.com, upgrading manifest file is required. However, it's optional for you to upgrade the `TeamsJS` SDK, as the old version continues to work.

> [!IMPORTANT]
> If you have both `TeamsFx` and `TeamsJS` SDK packages in your Teams application,`TeamsFx` SDK is not currently compatible with the latest version (beta version) of `TeamsJS` SDK package. It can cause functional damage to your application when running in Outlook and Office.com.
> If some functions are not working in Outlook or Office.com, remove `TeamsFx` packages from your application or don't upgrade `TeamsJS` SDK to latest version.

## Prerequisites

Install the latest version of Teams Toolkit from Visual Studio Code extension in [Teams Toolkit (Preview) - Visual Studio Marketplace](https://marketplace.visualstudio.com/items?itemName=TeamsDevApp.ms-teams-vscode-extension).

The following are the steps to upgrade manifest and `TeamsJS` client SDK:

## Upgrade manifest

1. From Visual Studio Code, open command platte (Ctrl+Shift+P / ⌘⇧-P). 
1. Type: `Teams: Upgrade Teams manifest to extend in Outlook and Office` in the search box.
1. Select Teams app manifest file.

This command will:

* Update manifest version to use the latest `m365DevPreview` version.
* Update manifest file to use the latest `DevPreview` schema.

To know more about the required manifest schema and version, see [Developer Preview manifest schema](/microsoftteams/platform/resources/schema/manifest-schema-dev-preview)

## Upgrade Teams JavaScript Client SDK

1. From Visual Studio Code, open command platte (Ctrl+Shift+P / ⌘⇧-P) 
1. Type: `Teams: Upgrade Teams JS SDK to extend in Outlook and Office` in the search box. 
1. Select Teams app project folder.

This command will:

* Update `TeamsJS SDK` to the latest beta version.
* Update function references, `Enum` and interface references.
* Add `TODO` comments for yuo to change callbacks manually.
    > [!TIP]
    > Changing callbacks alters control flow. This code will have `TODO` comments for your review. 
    > The typical solution is to make parent function `async` and use `await` next to each promise, or use `then/catch/finally` style.
* Add `TODO` comments in places where you get changes to the context schema.

## Run your Teams application in Outlook and Office.com

After upgrading you can run Teams application in Outlook and Office.com.

### Upload and run your application in Teams

The following are the steps to Test your application in Outlook and Office.com by uploading your application through Teams client:

1. Push code changes to the server to host your application.
1. Move application to a zip folder.
1. Go to Teams client and select **Apps**.
1. Select **Upload a custom app** and select your application's zip folder.
1. Select **Add** on app details to install the application.

Teams install and launch your app. You can find your app in **More apps**.

 ![More apps](../assets/images/upgrade-teams/more-apps.png)

## Run Teams application in Outlook

Perform the following steps to preview personal tab apps in Outlook web app and desktop clients:

### Outlook web application

1. Go to https://outlook.office.com 
1. Select the three dots on the bottom left bar.

    ![More apps view](../assets/images/upgrade-teams/apps.png)

1. Select the name of your app to preview in Outlook web application.

    ![App preview in outlook](../assets/images/upgrade-teams/preview-outlook-web-application.png)

### Outlook desktop client

1. Open Outlook desktop client.
1. Select the three dots on the bottom left bar.

     ![More apps view](../assets/images/upgrade-teams/outlook-desktop-apps.png)

1. Select the name of your app to preview it in Outlook Desktop Client.

     ![app preview](../assets/images/upgrade-teams/outlook-desktop-preview.png)

## Run Teams application in Office.com

Perform the following steps to preview your apps in Outlook web client:

1. Go to www.office.com
1. Select the three dots on the bottom left bar.

    ![Apps in M365](../assets/images/upgrade-teams/m365-app.png)

1. Select the name of your app to preview it in office.com

    ![Apps in Office](../assets/images/upgrade-teams/office-preview.png)

## Create a sample application with Teams Toolkit and Run it in Outlook and Office.com

Perform the following steps to create a new tab app using Teams Toolkit and run it in Outlook and Office.com:

1. Create a new sample Teams app in Visual Studio Code with Teams Toolkit, use command palette and run `start from sample` and select **Start from sample**.

    ![Create new teams sample app](../assets/images/upgrade-teams/sample-app.png)

1. Select **Todo List (Works in Teams, Outlook and Office)** in the next window and click **OK**.

    ![select TODO](../assets/images/upgrade-teams/sample-list.png)

    This step will create a sample application. Once the project has been successfully created:

1. Select **Provision in the cloud**.

    ![Select provision](../assets/images/upgrade-teams/provision-in-cloud.png)

1. Select **Deploy to the cloud**.

    ![Deploy to the cloud](../assets/images/upgrade-teams/deploy-to-the-cloud.png)

1. Select **Teams:Zip Teams metadata package**.

    ![Zip Teams metadata package](../assets/images/upgrade-teams/zip-metadata-package.png)
1. Follow the `README` file in the sample application project to run the application in Outlook and Office.com.

## See also

[Placeholder for see also links]