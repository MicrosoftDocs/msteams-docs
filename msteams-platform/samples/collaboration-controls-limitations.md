---
title: Limitations and known issues in Collaboration control app
author: surbhigupta
description: In this module, learn about limitations and known issues in Collaboration controls app for Microsoft Teams.
ms.localizationpriority: medium
ms.author: v-npaladugu
ms.topic: conceptual
ms.date: 09/30/2022
---

# Limitations and known issues

> [!NOTE]
> Currently, Collaboration controls are available only in [public developer preview](~/resources/dev-preview/developer-preview-intro.md).

Following are the limitations for Collaboration controls:

* Components can't be used in Canvas apps.
* Components only support full tab views.

     :::image type="content" source="../assets/images/collaboration-control/tasks-tab.png" alt-text="The screenshot shows the tasks." border="true":::

* The subgrid view selected isn't honored. All tasks, meetings, or notes for the collaborative record are displayed.

     :::image type="content" source="../assets/images/collaboration-control/subgrid-view.png" alt-text="The screenshot shows the subgrid view of the tasks." border= "true":::

* Activities added to the timeline control don’t appear in the components, tasks, meetings, and notes created in the components aren't included in the timeline control.
* New records must be saved before accessing the components, otherwise you'll see an empty screen.
* The components don't inherit theming from the form or app they're added to.
* Localization is only available when running the app inside Microsoft Teams.
* Microsoft Edge strict mode isn't supported and cross-site cookies are required.

**Admin Center does not update when installation or upgrade is complete**

When following the installation steps in [install Collaboration controls](~/samples/install-collaboration-control.md), you're redirected to the Power Platform admin center. A banner is displayed when installation starts, but it isn't updated when installation completes. The status is listed during installation and when it's completed it might not be available in the list. You can view the solutions list at [https://make.powerapps.com/](https://make.preview.powerapps.com/) to confirm that installation is complete.

**View during installation:**
     :::image type="content" source="../assets/images/collaboration-control/view-during-installation.png" alt-text="The screenshot shows the process during installation." border="true":::

**View after installation:**
     :::image type="content" source="../assets/images/collaboration-control/view-after-installation.png" alt-text="The screenshot shows the completion of the installation." border="true":::

When upgrading the controls to a later version, the same installation started banner displays, but the control status remains installing even after the upgrade is complete. You can confirm the upgrade is complete by checking the solutions list at [https://make.powerapps.com/](https://make.preview.powerapps.com/), it must take approximately 15 minutes.

You can also see in the history for specific solutions that the later version was installed and then the previous version was removed:
     :::image type="content" source="../assets/images/collaboration-control/history.png" alt-text="The screenshot shows the history for specific solutions of the versions that are installed and removed." border="true":::

## Bookings Meetings

The Meetings control supports one on one meetings when using Bookings to engage with users outside of your organization. One to many meetings aren't supported at this time using Collaboration controls.

**Meeting attendee status is incorrect**

When an attendee RSVPs to a meeting, their response status might not display correctly in both the agenda view and the meeting details. Selecting the decline button might return an error message on screen.

## Tasks

**Tasks: Filter "clear" text is not translated**

The text on the “clear" button displayed on the Tasks filter isn't translated.

**Tasks: Grid context menu appears cropped**

When the Tasks grid is populated by a low number of Tasks the grid context menu may appear cropped and require use of scrollbars.

**Tasks: Keyword search filter use “BeginsWith” operator for “Guest” tasks**

When search Tasks using the keyword text filter, “Guest” tasks are returned using the “BeginsWith” operator. “Member” tasks are returned using the “Contains” operator.

## Files

When navigating into the Archive folder after archiving files, users might experience duplicate archive folders.  Navigating from the archive folder(s) to the files main view resolves the issue, and files that are archived won't be removed.

## Controls

**Controls fail to save**

If a control fails to save a task or meeting, the likely cause is misconfigured Group ID or Channel ID.  

Solution 1: Confirm the IDs are correct and the settings are applied as per the settings exercise.  

Solution 2: Ensure that the Power Apps environment and Teams environment are on the same tenant.  

**Controls fail to load or show an error**

If the controls fail to load or show an error, it might be a transient issue.

Example:

:::image type="content" source="../assets/images/collaboration-control/sync-fail.png" alt-text="Screenshot shows the control sync fail.":::

This would render in the console log as:

:::image type="content" source="../assets/images/collaboration-control/control-fail.png" alt-text="Screenshot is an example of control fail from consol log." border="true":::

Solution: Refresh your browser or if in Teams app, reload the tab.

If you want to change the app name, icon, or description after uploading it to Teams, see [customize appearance of apps](/microsoftteams/customize-apps#customize-details-of-an-app)

## Error logging

The controls provide the following methods to debug your application.

1. **Trace logging** of plugin events when an API is invoked. This information is stored in your Dataverse environment.

    1. To enable trace logging follow these steps in [logging and tracing](/power-apps/developer/data-platform/logging-tracing?WT.mc_id=email).

1. **Browser logging** for UI controls. This is standard console logging.

    1. It's supported when using a browser to run the Collaboration Manager app via Power Platform and Teams web.
    1. Within the console tab, you can search for errors using the Collaboration Manager error message or searching for Collaboration Manager control names such as Tasks.

> [!TIP]
> If an error occurs in a Teams desktop client, try to replicate in Teams web to capture the error log.

## FAQ

<br>

<details>

<summary><b>What are the Collaboration controls (Preview)?</b></summary>

Collaboration controls (Preview) enable you to add Microsoft 365 capabilities to your Power Apps line of business custom applications to simplify user workflows when collaborating on business processes in Teams or Power Apps.

<br>

</details>

<br>

<details>

<summary><b>What is the benefit of the Collaboration controls (Preview) for makers?</b></summary>

With these new controls, you as a maker can drag-and-drop controls that bring Microsoft 365 collaboration to your app.

<br>

</details>

<br>

<details>

<summary><b>What is the benefit of the Collaboration controls (Preview) for users?</b></summary>

Your users can experience productivity gains and stay in their flow by collaborating on approvals, files, meetings, notes, and tasks without leaving the context of your app.

<br>

</details>

<br>

<details>

<summary><b>How do I get access to the Collaboration controls (Preview)?</b></summary>

Request that your Power Platform administrator install the controls from AppSource to your Power Apps environment.

<br>

</details>

<br>

<details>

<summary><b>How do I add the controls to a Model Driven App?</b></summary>

Go to Form Designer and drag the controls from the Component pane onto a form.

<br>

</details>
