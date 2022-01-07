---
title: Publish Teams apps using Teams Toolkit
author: zyxiaoyuer
description:  publish Teams apps
ms.author: yanjiang
ms.localizationpriority: medium
ms.topic: overview
ms.date: 11/29/2021
---


# Publish Teams apps using Teams Toolkit

After creating the app, you can distribute your app to different scope, such as individual, team, organization, or anyone. The distribution depends on multiple factors, including needs, business and technical requirements, and your goal for the app. Distribution to different scope may need different review process. In general, the bigger the scope, the more review the app needs to go through for security and compliance concerns.

## Prerequisite

* [Install Teams Toolkit](https://marketplace.visualstudio.com/items?itemName=TeamsDevApp.ms-teams-vscode-extension) version v3.0.0+.

> [!TIP]
> Ensure you have Teams app project in VS code.

## Publish to individual scope (sideloading permission)

The users can add custom app to Teams by uploading an app package in a *.zip file directly to a team or in personal context. Adding a custom app by uploading an app package, also known as side loading, allows you to test app as it's being developed, before it's ready to be widely distributed as mentioned in the following scenarios:

* Test and debug an app locally yourself or with other developers.
* Build an app for yourself. For example, to automate a workflow.
* Build an app for a small set of users, such as, your work group.

You can build an app for internal use only and share it with your team without submitting it to the Teams app catalog in the Teams app store.

**To build your app to *.zip app package file**
You can build the app package by selecting `Zip Teams metadata package` from DEPLOYMENT panel in Treeview of Teams Toolkit. You need to run `Provision in the cloud` first. The generated app package will be located in `{your project folder}/build/appPackage/appPackage.{env}.zip`.

Follow the steps to upload app package:

1. In the Teams client, select **Apps** in left bar.
2. Select **Manage your apps**.
3. Select **publish an app**

   :::image type="content" source="../assets/images/teams-toolkit-v2/teams toolkit fundamentals/pub.png" alt-text="publish":::

4. Select **Upload a custom app** as shown in the image:

   :::image type="content" source="../assets/images/teams-toolkit-v2/teams toolkit fundamentals/uplo.png" alt-text="upload":::

## Publish to your organization 

When the app is ready for use in production, the developer can submit the app using the Teams App Submission API, called from Graph API, an integrated development environment (IDE) such as Visual Studio Code installed with Teams toolkit. You can either select **Publish to Teams** from DEPLOYMENT panel in TreeView of Teams Toolkit, or trigger **Teams: Publish to Teams** from command palette. Then select **Install for your organization** as shown in the following image:

![Install for your organization](./images/installforyourorganization.png)

Doing this makes the app available on the Manage apps page of the Microsoft Teams admin center, where you, and the admin, can review and approve it.

As an admin, the manage apps page in the [Microsoft Teams admin center](https://admin.teams.microsoft.com/policies/manage-apps) is where you view and manage all Teams apps for your organization. Here, you can see the org-level status and properties of apps, approve or upload new custom apps to your organization's app store, block or allow apps at the org level, add apps to teams, purchase services for third-party apps, view permissions requested by apps, grant admin consent to apps, and [manage org-wide app settings](https://admin.teams.microsoft.com/policies/manage-apps).

Teams toolkit for Visual Studio Code built on top of the Teams App Submission API and it allows you to automates the submission-to-approval process for custom apps on Teams.

> [!NOTE]
> Keep in mind that this doesn't publish the app to your organization's app store yet. This step submits the app to the Microsoft Teams admin center where you can approve it for publishing to your organization's app store.

## Admin approval for submitted Teams apps

The admin of your Teams tenant can then go to the Manage apps page in the Microsoft Teams admin center (in the left navigation, go to Teams apps > Manage apps), gives you a view into all Teams apps for your organization. The Pending approval widget at the top of the page lets you know when a custom app is submitted for approval.
In the table, a newly submitted app automatically shows a Publishing status of Submitted and Status of Blocked. You can sort the Publishing status column in descending order to quickly find the app:

 :::image type="content" source="../assets/images/teams-toolkit-v2/teams toolkit fundamentals/admin-approval-for-teams-app-1.png" alt-text="approval":::

Select the app name to go to the app details page. On the About tab, you can view details about the app, including description, status, submitter, and app ID:

 :::image type="content" source="../assets/images/teams-toolkit-v2/teams toolkit fundamentals/about-submitted-app-1.png" alt-text="submitted app":::

Follow the steps to publish the app :

1. In the left navigation of the Microsoft Teams admin center, go to Teams apps > Manage apps.
2. Select the app name to go to the app details page, and then in the Publishing status box, select Publish.
After you publish the app, the Publishing status changes to Published and the Status automatically changes to Allowed.

## Publish to Microsoft Store

You can distribute your app directly to the store inside Microsoft Teams and reach millions of users around the world. If your app is also featured in the store, you can instantly reach potential customers.Apps published to the Teams store also automatically list on Microsoft AppSource, which is the official marketplace for Microsoft 365 apps and solutions.

For more information, see [Publish to microsoft Teams store]([Publish your app to the Microsoft Teams store](../concepts/deploy-and-publish/appsource/publish.md#publish-your-app-to-the-microsoft-teams-store))

## See also

> [!div class="nextstepaction"]
> [Manage multiple environments](TeamsFx-multi-env.md)

> [!div class="nextstepaction"]
> [Collaborate with other developers on Teams project](TeamsFx-collaboration.md)