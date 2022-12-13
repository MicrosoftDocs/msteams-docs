---
title: Deploy an app with Collaboration controls in Microsoft Teams
author: surbhigupta
description: In this module, learn how to deploy your app with Collaboration control in Microsoft Teams and how to enable others to use your app.
ms.localizationpriority: medium
ms.author: v-npaladugu
ms.topic: conceptual
---

# Deploy Collaboration controls to Microsoft Teams

Collaboration controls currently work best within Microsoft Teams. You can create a new app that can be embedded inside Teams app as both, a personal app and a tab app.

> [!NOTE]
> Currently, Collaboration controls are available only in [public developer preview](~/resources/dev-preview/developer-preview-intro.md).

## Configure the app for Teams

The app that you've created in [create a model-driven application](~/samples/app-with-collaboration-controls.md#create-a-model-driven-application) only have a single left pane and there are no complex commands. So before adding your app into Teams, you can hide the left pane and make more comprehensible header view.

> [!NOTE]
> Don't enable the following steps if you want to display the left pane and high-density header to your users.

To do so, we'll use Power Apps **new app** settings.

1. Go to **Solutions** in the left pane.

1. Go to the bottom of your solutions list and select **Default solution**.

1. Search for and select **Setting definition**.

     :::image type="content" source="../assets/images/collaboration-control/settings-defnition.png" alt-text="Screenshot shows searching and setting definition in Power apps.":::

1. Search and select **Hide the navbar** from the list of settings definitions. This hides the left pane in your application.

     :::image type="content" source="../assets/images/collaboration-control/hide-the-nav-bar.png" alt-text="Screenshot shows how to select hide the nav bar.":::

1. On the lower right  of your application in the edit pane, there's a section titled **Setting app values**. If you created your app using the modern app designer, your app appears on the list. Select **New app value** under your app.

1. Change the value from **No** to **Yes.**

     :::image type="content" source="../assets/images/collaboration-control/value-to-yes.png" alt-text="Screenshot displays dropdown to select change value to yes.":::

1. Select **Save.**

1. Search and select **App high density page header** from the list of settings definitions and repeat the process.

     :::image type="content" source="../assets/images/collaboration-control/density-page-header.png" alt-text="Screenshot shows how to select app high density page header.":::

1. Select **Back to solutions**.

     :::image type="content" source="../assets/images/collaboration-control/default-solution.png" alt-text="The screenshot shows default solution.":::

1. Select **Publish all customizations** to publish all the work you've completed.

     :::image type="content" source="../assets/images/collaboration-control/publish-cusomization.png" alt-text="Publish all customizations.":::

## Add the app to Microsoft Teams app catalog

As the settings are defined, you can now add the app to Microsoft Teams. To start with, browse to the **Apps** page in the Power Apps maker portal and find the app that you've created and select ellipse **…**.

To add the app to Teams, select **Add to Teams**.

:::image type="content" source="../assets/images/collaboration-control/add-to-teams.png" alt-text="Add to Teams.":::

Selecting **Add to Teams** opens a dialog where you can review the details and select **Download app**, which saves the Microsoft Teams app manifest to your device.

:::image type="content" source="../assets/images/collaboration-control/colab-manager-inspection.png" alt-text="The screenshot is an example that shows the collaboration manager inspection.":::

To upload your app to Teams, see [upload your app in Team](~/concepts/deploy-and-publish/apps-upload.md).

## Enable others to use your application

Following are required to enable users to run the deployed Collaboration Manager applications built using the Collaboration controls:

* Create a Collaboration team
* Add members to the team
* Create a security role
* Assign security roles to team members

### Create a Collaboration team

1. Sign into [Power Platform admin center](https://admin.powerplatform.microsoft.com/environments).

     1. Select the environment where the app is deployed.
     1. Select **Settings** > **Users** + **permissions**.
     1. Select **Teams**.

1. Select the **+ Create team** button from the top of the page.

1. Add all the required fields:
     1. **Team name:** Ensure the name is unique within the business unit.
     1. **Description:** Enter a description of the team.
     1. **Business unit:** Select a business unit from the dropdown list.
     1. **Administrator:** Search for the user within your organization that you want to assign as the administrator by entering characters.
     1. **Team type:** Select the team type. The following steps assume that you've selected Owner from the dropdown list. The other team types (Microsoft 365 team and Microsoft Azure Active Directory team) auto populates team members from Azure Active Directory.

         :::image type="content" source="../assets/images/collaboration-control/new-team.png" alt-text="Screenshot to select new team type.":::

     1. Ensure that you note the team name. You'll need this later to assign this team as the owner of a record.

     1. Select **Next.**

### Add members to the team

> [!NOTE]
> Adding members to the team isn't necessary if your team type is Azure Active Directory or Microsoft 365.

1. Select a team, and then select **Manage team members**.

1. To add new team members, select **+ Add team members** and choose users from your organization to add.

     :::image type="content" source="../assets/images/collaboration-control/add-team-members.png" alt-text="The screenshot describes how to add team members.":::

1. To delete a team member, select the user and then choose **Remove**.

### Create a security role

1. Select **Settings** > **Users** + **permissions** in the environment where the app is deployed.

1. Select **Security roles**.

     :::image type="content" source="../assets/images/collaboration-control/users-permission.png" alt-text="Screenshot displays to add new team members for users permission.":::

1. Select on **New role** at the upper left of the page, which now opens a new page.

1. On the **Details tab**, provide a name for your security role.

1. Go to **Custom Entities** tab.

     1. Give organization permissions (full green circle) for each of the collaboration entities, **Collaboration Map**, **Collaboration Metadata**, and **Collaboration Root**.

         :::image type="content" source="../assets/images/collaboration-control/collab-map.png" alt-text="Screenshot shows how to create a security role on collaboration map.":::

1. Select **Save** and **Close**.

### Assign Security roles

1. Select **Settings** > **Users** + **permissions** in the environment where the app is deployed.

1. Select **Teams**, select then the team you created in [create a Collaboration team](#create-a-collaboration-team).

1. Choose **Manage security roles** from the header.

     :::image type="content" source="../assets/images/collaboration-control/edit-team.png" alt-text="Screenshot displays collaboration map, collaboration metadata, and collaboration root. for edit team.":::

1. Select the roles [created in a security role](#create-a-security-role).

1. Select **Save**.

For more information on role privileges, see [configure user security in an environment](/power-platform/admin/database-security).

## See also

[Integrate web apps](integrate-web-apps-overview.md)
