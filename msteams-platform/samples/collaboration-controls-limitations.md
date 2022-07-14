---
title: Limitations and known issues in collaboration controls app for Microsoft Teams
author: surbhigupta
description: In this article, learn about limitations and known issues in collaboration controls app for Microsoft Teams.
ms.localizationpriority: medium
ms.author: v-npaladugu
ms.topic: conceptual
---

# Limitations and known issues

The Collaboration controls are currently intended for use as described in this document, and there are the following limitations:

* Components can't be used in Canvas Apps.
* Components only support full tab views.

     :::image type="content" source="../assets/images/collaboration-control/tasks-tab.png" alt-text="tasks" border="true":::

* The subgrid view selected isn't honored. All tasks, meetings or notes for the collaborative record will be displayed.

     :::image type="content" source="../assets/images/collaboration-control/subgrid-view.png" alt-text="subgrid view" border= "true":::

* Activities added to the timeline control don’t appear in the components (and tasks, meetings and notes created in the components aren't included in the timeline control).
* New records must be saved before accessing the components, otherwise you'll see an empty screen.
* The components don't inherit theming from the form or app they're added to.
* Localization is only available when running the app inside Microsoft Teams.
* Microsoft Edge strict mode isn't supported, and cross-site cookies are required.

**Admin Center does not update when installation or upgrade is complete**

 When following the installation steps in exercise 1,' redirected to the Power Platform admin center. A banner is displayed when installation starts, but it isn't updated when installation completes. The status is listed during installation, and when installation is complete it may disappear from the list. You can view the solutions list at <https://make.preview.powerapps.com/> to confirm that installation is complete.

**View during installation:**
     :::image type="content" source="../assets/images/collaboration-control/view-during-installation.png" alt-text="view during installation" border="true":::

**View after installation:**
     :::image type="content" source="../assets/images/collaboration-control/view-after-installation.png" alt-text="view after installation" border="true":::

When upgrading the controls to a later version, the same installation started banner displays, but the controlstatus remains installing even after the upgrade is complete. You can confirm that the upgrade is complete by checking the Solutions list at [https://make.preview.powerapps.com/](https://make.preview.powerapps.com/), it should take approximately 15 minutes. You can also see in the history for specific solutions that the later version was installed and then the previous version was removed:
     :::image type="content" source="../assets/images/collaboration-control/history.png" alt-text="History check" border="true":::

**Conversations button does not respond unless browser locale is English (United States)**

If the Conversations button doesn't respond when you select it, and you observe the following error in the console logs:
     :::image type="content" source="../assets/images/collaboration-control/console-log.png" alt-text="console log" border="true":::

This is caused by a localization error for the Conversations component. You can resolve the issue by updating your browser locale to en-US.

**Conversations button disappears in Teams Web UI**
 There's an issue that causes the Conversations button to intermittently disappear when viewing a record in the Teams Web UI. You can follow this workaround to reload the button when the “App high density page header” setting is turned off:,

 1. Go back to the list view that shows all the records for the entity.

 1. Refresh the browser.

 1. Select on a record.

 1. The Conversations button is now visible.

**Conversations are not refreshed when moving to another record**

 The conversations pane isn't refreshed when you move between records. As a result, you'll see all the conversations from the teams channel, and not just the ones linked to that specific record. Deleted conversations will also be displayed with "(no title)".

**Multiple Conversations buttons are displayed in Teams channels**

 When an app is played in a Teams channel, there's an another chat icon in the header bar that opens the Posts tab with channel conversations. This isn't present when apps are played as a personal app or group chat app.

**Meeting attendee status is incorrect**

 When an attendee RSVPs to a meeting, their response status may not display correctly in both the agenda view and the meeting details. Clicking the decline button may also return an error message on screen.

**Cannot join meetings from Power Apps runtime**

 The join button doesn't work for meetings when apps are played in Power Apps. This issue can be worked around by playing apps inside Teams.

**Duplicate Archive Folders**

 When navigating into the Archive folder after archiving files, users may experience duplicate archive folders. Navigating from the archive folder(s) to the files main view will resolve the issue, and files that are archived won't be removed.

**System Error after Upgrade**

 If you experience the error ‘System.ServiceModel.FaultException`1[Microsoft.Xrm.Sdk.OrganizationServiceFault]:Dataset with name 'gridData' not found Dataset Configuration for reference:…’ you may have a subgrid bound to an earlier version of the Events control. Solution: Remove subgrids that were bound to the Events control and after importing the new package, add the events control back.

**Cannot add app in Teams**

 Sometimes an app can't be added to a Teams channel because the app details don't load correctly and the Save button is disabled:
     :::image type="content" source="../assets/images/collaboration-control/collab-mgr-inspection.png" alt-text="Collab manager inspection" border="true":::

 This can be worked around by creating a new model driven app that uses the same table (repeating exercise 2, exercise 4 task 2 and exercise 6 task 2).

 It can also be helpful to:

 1. Ensure the app has a different name or description, so you can identify the new app in the Teams app catalog.
 1. Test publishing the app to Teams before repeating exercise 4, task 2
 Can't change app details after uploading to Teams
 If you want to change the app name, icon, or description after uploading it to Teams, you can follow this process:
 1. Go to admin.teams.microsoft.com
 1. Either select the option to upload a new file, or delete the app and it can be uploaded to Teams
 following the process in exercise 6 task 2.

     :::image type="content" source="../assets/images/collaboration-control/manage-apps.png" alt-text="manage apps" border="true":::

* If you're updating the manifest, you've to unzip it, and manually update the version number so that it's higher.

* After changing the app catalog in the tenant, you've to log out and log back in as the user to get the updated catalogue.

 **Tasks, Meetings controls fail to save**

 If a control fails to save a task or meeting, the likely cause is misconfigured Group ID or Channel ID.

 Solution 1: Confirm the IDs are correct, and the settings have been applied as per the settings exercise.
 Solution 2: Try to ensure that the Power Apps environment and Teams environment are on the same tenant.

 **Controls fail to load or show an error**
 If Tasks, Meetings or Files controls fail to load or show an error, it may be a transient issue.

 Example:
     :::image type="content" source="../assets/images/collaboration-control/control-fail.png" alt-text="control fail" border="true":::

 Solution: Refresh your browser or if in Teams, reload the tab.

## Error Logging

 The controls provides the following methods to debug your application.

 1. Trace logging of plugin events when an API is invoked. This information is stored in your Dataverse environment.

 a. **To enable trace logging please follow these steps:** Logging and tracing (Microsoft Dataverse)<br/>

* Power Apps Microsoft Docs:[https://docs.microsoft.com/en-us/powerapps/developer/dataplatform/logging-tracing?WT.mc_id=email](/power-apps/developer/data-platform/logging-tracing?WT.mc_id=email)

 1. **Browser logging** for UI controls. This is standard console logging.
 a. It's supported when using a browser to run the Collaboration Manager app via Power Platform
 and Teams web. <br/>
 b. Within the console tab, you can search for errors using the Collaboration Manager error
 message or searching for Collaboration Manager control names such as Tasks.<br/>

 > [!TIP]
 > If an error occurs in a Teams desktop client, try to replicate in Teams web to capture the error log. Support
