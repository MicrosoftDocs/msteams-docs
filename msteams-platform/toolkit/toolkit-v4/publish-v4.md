---
title: Publish Teams apps using Teams Toolkit v4
author: zyxiaoyuer
description: In this module, learn how to publish Teams apps using Teams Toolkit v4 and publish to individual scope or sideload permission.
ms.localizationpriority: medium
ms.topic: overview
ms.date: 11/29/2021
---


# Publish Teams apps using Teams Toolkit v4

> [!IMPORTANT]
>
> We've introduced the Teams Toolkit v5 extension within Visual Studio Code. This version comes to you with many new app development features. We recommend that you use Teams Toolkit v5 for building your Teams app.
>
> [Teams Toolkit v4](~/toolkit-v4/teams-toolkit-fundamentals-v4.md) extension will soon be deprecated.

After creating the app, you can distribute your app to different scopes, such as an individual, a team, or an organization. The distribution depends on multiple factors such as needs, business and technical requirements, and your goal for the app. Distribution to different scope may need different review process. In general, the bigger the scope, the more review the app needs to go through for security and compliance concerns.

:::image type="content" source="images/publish-flow_1-v4.png" alt-text="publish flow":::

Here's what you'll learn in this section:

* [Publish to individual scope or sideload permission](#publish-to-individual-scope-or-sideload-permission)
* [Publish to your organization](#publish-to-your-organization)
* [Publish to Microsoft Teams store](#publish-to-microsoft-teams-store)

## Prerequisites

* Ensure to create your [app package](~/concepts/build-and-test/apps-package.md) and [validate it](https://dev.teams.microsoft.com/appvalidation.html) for errors.
* [Enable custom app uploading](~/concepts/build-and-test/prepare-your-o365-tenant.md#enable-custom-teams-apps-and-turn-on-custom-app-uploading) in Teams.
* Ensure that your app is running and accessible using HTTPs.
* Ensure you have followed set of guidelines in the publish your app to the Microsoft Teams store to publish your app.

## Publish to individual scope or sideload permission

You can add a custom app to Teams by uploading an [app package](~/concepts/build-and-test/apps-package.md) in `.zip` file directly to a team or in personal context. Adding a custom app by uploading an app package is known as sideloading. It allows you to test app while being uploaded in Teams. You can build and test app in the following scenarios:

* Test and debug an app locally.
* Build an app for yourself, such as to automate a workflow.
* Build an app for small set of users, such as, your work group.

You can build an app for internal use and share it with your team without submitting it to the Microsoft Teams app catalog in the Teams app store. For more information, see [how to upload your app in Teams](~/concepts/deploy-and-publish/apps-upload.md).

### Build app package

You need to run **Provision in the cloud** before you build the app package. The following step helps you to build the app package:

* Select **Zip Teams metadata package** under **DEPLOYMENT**.<br>
    The generated app package is located in `{your project folder}\build\appPackage\appPackage.{env}.zip`.

### Upload app package

Perform the following steps to upload app package:

1. In the Teams client, select **Apps** > **Manage your apps** > **Upload an app**.

   :::image type="content" source="images/publish1_1-v4.png" alt-text="publish an app":::

   **Upload an app** window appears.

2. Select **Upload a custom app**.

   :::image type="content" source="images/upload_1-v4.png" alt-text="upload an app":::

   Now the app is sideloaded into the Teams client and you can add and view it

## Publish to your organization

When the app is ready for use in production, you can submit the app using the Teams app submission API, called from Microsoft Graph API. Teams app submission API is an integrated development environment (IDE) such as Microsoft Visual Studio Code installed with Teams toolkit. The following steps help you to publish the app to your organization:

* [Publish from Teams Toolkit](#publish-from-teams-toolkit)
* [Approve on Admin Center](#approve-on-admin-center)

### Publish from Teams Toolkit

The following steps help you to publish the app from Teams Toolkit:

1. You can publish your Teams app in one of the following ways:
     * Select **Publish to Teams** under **DEPLOYMENT**.
     * Select **View** > **Command Palette...** > **Teams: Publish to Teams**.

   :::image type="content" source="images/select-publish_1-v4.png" alt-text="Select Publish":::

1. Select **Install for your organization**.

   :::image type="content" source="images/installforyourorganization_1-v4.png" alt-text="Install for your organization":::

   Now the app is successfully published to the admin portal and you see the following notice:

   :::image type="content" source="images/confirm-publish_1-v4.png" alt-text="Confirm Publish":::

Now the app is available on the **Manage apps** of Microsoft Teams admin center, where you and the admin can review and approve it.

> [!NOTE]
> The app doesn't publish to your organization's app store yet. The step submits the app to the Teams admin center where you can approve it for publishing to your organization's app store.

### Approve on Admin Center

Teams toolkit for Visual Studio Code built on top of the Teams App Submission API and it allows you to automate the submission-to-approval process for custom apps on Teams.

  > [!NOTE]
  > Ensure that you have Teams app project in Visual Studio code. As an admin, **Manage apps** in the [Microsoft Teams admin center](https://admin.teams.microsoft.com/policies/manage-apps) is where you can view and manage all Teams apps for your organization. You can do the following activities in the admin center:
  >
  > * See the org level status and properties of apps.
  > * Approve or upload new custom apps to your organization's app store.
  > * Block or allow apps at the org level.
  > * Add apps to Teams.
  > * Purchase services for third-party apps.
  > * View permissions requested by apps.
  > * Grant admin consent to apps.
  > * [Manage org wide app settings](https://admin.teams.microsoft.com/policies/manage-apps).

The following steps help you to approve from Admin Center:

1. Select **Go to admin portal**.

1. Select the :::image type="icon" source="images/Showall-v4.png"::: icon > **Teams apps** > **Manage apps**.

   :::image type="content" source="images/select-manage-apps-v4.png" alt-text="Select Manage apps":::

   You can view all Teams app for your organization.

   In the **Pending approval** widget at the top of the page lets you know when a custom app is submitted for approval. In the table, a newly submitted app automatically publishes the status of submitted and blocked apps. You can sort the publishing status column in descending order to find the app.

   :::image type="content" source="images/admin-approval-for-teams-app-1-v4.png" alt-text="approval":::

1. Select the app name to go to the app details page. On the **About** tab, you can view details about the app, including description, status, and app ID.

   :::image type="content" source="images/about-submitted-app-1-v4.png" alt-text="submitted app":::

1. Select the status dropdown and change from **Submitted** to **Publish**.

   After you publish the app, the publishing status changes to published and the status automatically changes to allowed.

   For more information, see [Publish to your org](/microsoftteams/manage-apps?toc=%2Fmicrosoftteams%2Fplatform%2Ftoc.json&bc=%2Fmicrosoftteams%2Fplatform%2Fbreadcrumb%2Ftoc.json)

## Publish to Microsoft Teams store

You can distribute your app directly to the store inside Microsoft Teams and reach millions of users around the world. If your app is also featured in the store, you can instantly reach potential customers. The apps published to the Teams store also automatically list on Microsoft AppSource, which is the official marketplace for Microsoft 365 apps and solutions.

For more information, see [how to publish to the Teams store](~/concepts/deploy-and-publish/appsource/publish.md#publish-your-app-to-the-microsoft-teams-store).

## See also

* [Teams Toolkit Overview](teams-toolkit-fundamentals-v4.md)
* [Distribute your Microsoft Teams app](~/concepts/deploy-and-publish/apps-publish-overview.md)
* [Create Teams app package](~/concepts/build-and-test/apps-package.md)
* [Prepare your Microsoft 365 tenant](~/concepts/build-and-test/prepare-your-o365-tenant.md)
* [Manage Teams app in the Microsoft Teams admin center](/microsoftteams/manage-apps?toc=%2Fmicrosoftteams%2Fplatform%2Ftoc.json&bc=%2Fmicrosoftteams%2Fplatform%2Fbreadcrumb%2Ftoc.json)
