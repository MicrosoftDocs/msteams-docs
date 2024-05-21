---
title: Publish Teams apps using Teams Toolkit
author: zyxiaoyuer
description: In this module, learn how to publish Teams apps using Teams Toolkit and publish to individual scope or custom app upload permission.
ms.localizationpriority: medium
ms.topic: overview
ms.date: 11/29/2021
---

# Publish Teams apps using Teams Toolkit

After creating the app, you can distribute your app to different scopes, such as an individual, a team, or an organization. The distribution depends on multiple factors such as needs, business and technical requirements, and your goal for the app. Distribution to different scope may need different review process. In general, the bigger the scope, the more review the app needs to go through for security and compliance concerns.

:::image type="content" source="../assets/images/teams-toolkit-v2/teams toolkit fundamentals/publish-flow_1.png" alt-text="Screenshot shows the publish flow.":::

Here's what you'll learn in this section:

* [Publish to individual scope or custom app upload permission](#publish-to-individual-scope-or-custom-app-upload-permission)
* [Publish to your organization](#publish-to-your-organization)
* [Publish to Microsoft Teams Store](#publish-to-teams-store)

## Prerequisites

* Ensure to create your [app package](~/concepts/build-and-test/apps-package.md) and [validate it](https://dev.teams.microsoft.com/appvalidation.html) for errors.
* [Enable custom app uploading](~/concepts/build-and-test/prepare-your-o365-tenant.md#enable-custom-teams-apps-and-turn-on-custom-app-uploading) in Teams.
* Ensure that your app is running and accessible using HTTPs.
* Ensure you have followed set of guidelines in the publish your app to the Teams Store to publish your app.

## Publish to individual scope or custom app upload permission

You can add a custom app to Microsoft Teams by uploading an [app package](../concepts/build-and-test/apps-package.md) in `.zip` file directly to a team or in personal context. Adding a custom app by uploading an app package is known as custom app upload. It allows you to test app while being uploaded in Teams. You can build and test app in the following scenarios:

* Test and debug an app locally.
* Build an app for yourself, such as to automate a workflow.
* Build an app for small set of users, such as, your work group.

You can build an app for internal use and share it with your team without submitting it to the Microsoft Teams app catalog in the Teams Store . For more information, see [how to upload your app in Teams](../concepts/deploy-and-publish/apps-upload.md).

### Build app package

You need to run **Provision in the cloud** before you build the app package. The following step helps you to build the app package:

Select **Zip Teams App Package** > **UTILITY**.<br>
    The generated app package is located in `{your project folder}\appPackage\build\appPackage.{env}.zip`.

### Upload app package

Perform the following steps to upload app package:

1. In the Teams client, select **Apps** > **Manage your apps** > **Upload an app**.

   :::image type="content" source="../assets/images/teams-toolkit-v2/teams toolkit fundamentals/publish-manage-teams-upload-app.png" alt-text="Screenshot shows the publish an app option.":::

   The **Upload an app** window appears.

2. Select **Upload a custom app**.

   :::image type="content" source="../assets/images/teams-toolkit-v2/teams toolkit fundamentals/upload-custom-app.png" alt-text="Screenshot shows the option to upload a custom app in Teams.":::

   Now, the custom app is uploaded into the Teams client and you can add and view it.

## Publish to your organization

When the app is ready for use in production, you can submit the app using the Teams app submission API, called from Microsoft Graph API. Teams app submission API is an integrated development environment (IDE) such as Microsoft Visual Studio Code installed with Microsoft Teams Toolkit. The following steps help you to publish the app to your organization:

* [Publish from Teams Toolkit](#publish-from-teams-toolkit)
* [Approve on admin center](#approve-on-admin-center)

### Publish from Teams Toolkit

> [!NOTE]
> You can use CICD pipelines to publish your Teams app. For more information, see [set up CI/CD pipelines](use-CICD-template.md).

The following steps help you to publish the app from Teams Toolkit:

1. You can publish your Teams app in one of the following ways:
     * Select **Publish** under **LIFECYCLE**.
     * Select **View** > **Command Palette...** > **Teams: Publish**.

       :::image type="content" source="../assets/images/teams-toolkit-v2/teams toolkit fundamentals/select-publish_1.png" alt-text="Screenshot shows the Publish option highlighted.":::

1. Select your environment, Teams Toolkit runs the `publish` lifecycle defined in `teamsapp.yml`.

    :::image type="content" source="../assets/images/teams-toolkit-v2/teams toolkit fundamentals/select-env.jpg" alt-text="Screenshot shows the environment options.":::

Now the app is available on the Manage apps of Microsoft Teams admin center, where you and the admin can review and approve it.

> [!NOTE]
> The app doesn't publish to your organization's app store yet. The step submits the app to the Teams admin center where you can approve it for publishing to your organization's app store.

### Approve on admin center

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
  > * Grant admin consent to apps in [manage org wide app settings.](https://admin.teams.microsoft.com/policies/manage-apps).

The following steps help you to approve from admin center:

1. Select **Go to admin portal**.

1. Select the :::image type="icon" source="../assets/images/teams-toolkit-v2/teams toolkit fundamentals/Showall.PNG"::: icon > **Teams apps** > **Manage apps**.

   :::image type="content" source="../assets/images/teams-toolkit-v2/teams toolkit fundamentals/select-manage-apps.png" alt-text="Screenshot shows the select Manage apps option.":::

   You can view all Teams app for your organization.

   In the **Pending approval** widget at the top of the page, lets you know when a custom app is submitted for approval. In the table, a newly submitted app automatically publishes the status of submitted and blocked apps. You can sort the publishing status column in descending order to find the app.

   :::image type="content" source="../assets/images/teams-toolkit-v2/teams toolkit fundamentals/admin-approval-for-teams-app.png" alt-text="Screenshot shows the teams apps pending for approval.":::

1. Select the app name to go to the app details page. On the **About** tab, you can view details about the app, including description, status, and app ID.

   :::image type="content" source="../assets/images/teams-toolkit-v2/teams toolkit fundamentals/about-submitted-app.png" alt-text="Screenshot shows the submitted app.":::

1. Select the status dropdown and change from **Submitted** to **Publish**.

   After you publish the app, the publishing status changes to Published and the status automatically changes to Allowed.

   For more information, see [Publish to your org](/microsoftteams/manage-apps?toc=%2Fmicrosoftteams%2Fplatform%2Ftoc.json&bc=%2Fmicrosoftteams%2Fplatform%2Fbreadcrumb%2Ftoc.json)

## Publish to Teams Store

You can distribute your app directly to the Teams Store inside Microsoft Teams and reach millions of users around the world. If your app is also featured in the Teams Store, you can instantly reach potential customers. The apps published to the Teams Store also automatically list on Microsoft AppSource, which is the official marketplace for Microsoft 365 apps and solutions.

For more information, see [how to publish to the Teams Store](../concepts/deploy-and-publish/appsource/publish.md#publish-your-app-to-the-teams-store).

## See also

* [Teams Toolkit Overview](teams-toolkit-fundamentals.md)
* [Distribute your Microsoft Teams app](../concepts/deploy-and-publish/apps-publish-overview.md)
* [Create Teams app package](../concepts/build-and-test/apps-package.md)
* [Prepare your Microsoft 365 tenant](../concepts/build-and-test/prepare-your-o365-tenant.md)
* [Manage Teams app in the Microsoft Teams admin center](/microsoftteams/manage-apps?toc=%2Fmicrosoftteams%2Fplatform%2Ftoc.json&bc=%2Fmicrosoftteams%2Fplatform%2Fbreadcrumb%2Ftoc.json)
