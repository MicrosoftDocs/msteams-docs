---
title: Limitations and known issues in Collaboration controls app for Microsoft Teams
author: surbhigupta
description: In this article, learn about limitations and known issues in Collaboration controls app for Microsoft Teams.
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

When upgrading the controls to a later version, the same installation started banner displays, but the control status remains installing even after the upgrade is complete. You can confirm that the upgrade is complete by checking the Solutions list at [https://make.preview.powerapps.com/](https://make.preview.powerapps.com/), it should take approximately 15 minutes. You can also see in the history for specific solutions that the later version was installed and then the previous version was removed:
     :::image type="content" source="../assets/images/collaboration-control/history.png" alt-text="History check" border="true":::

**Bookings Meetings: 1:1**

The Meetings control supports 1:1 meetings when using Bookings to engage with users outside of your organization. 1:Many meetings with external users are not supported at this time. 

**Bookings: Guests unable to join meetings**

If your external guests are unable to join meetings using the browser join link, ensure your organisation meeting policies enable guests to join calls. For more information please visit: https://docs.microsoft.com/en-us/microsoftteams/meeting-policies-participants-and-guests#let-anonymous-people-join-a-meeting


**Meeting attendee status is incorrect**

 When an attendee RSVPs to a meeting, their response status may not display correctly in both the agenda view and the meeting details. Clicking the decline button may also return an error message on screen.

**Cannot join meetings from Power Apps runtime**

 If the join button doesn't work for meetings when apps are played in Power Apps, this can be worked around by playing apps inside Teams.

**Duplicate Archive Folders**

 When navigating into the Archive folder after archiving files, users may experience duplicate archive folders. Navigating from the archive folder(s) to the files main view will resolve the issue, and files that are archived won't be removed.

**System Error after Upgrade**

 If you experience the error ‘System.ServiceModel.FaultException`1[Microsoft.Xrm.Sdk.OrganizationServiceFault]:Dataset with name 'gridData' not found Dataset Configuration for reference:…’ you may have a subgrid bound to an earlier version of the Events control. Solution: Remove subgrids that were bound to the Events control and after importing the new package, add the events control back.

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

 The controls provide the following methods to debug your application.

 1. Trace logging of plugin events when an API is invoked. This information is stored in your Dataverse environment.

 a. **To enable trace logging please follow these steps:** Logging and tracing (Microsoft Dataverse)<br/>

* Power Apps Microsoft Docs:[https://docs.microsoft.com/en-us/powerapps/developer/dataplatform/logging-tracing?WT.mc_id=email](/power-apps/developer/data-platform/logging-tracing?WT.mc_id=email)

 1. **Browser logging** for UI controls. This is standard console logging.
 a. It's supported when using a browser to run the Collaboration Manager app via Power Platform
 and Teams web. <br/>
 b. Within the console tab, you can search for errors using the Collaboration Manager error
 message or searching for Collaboration Manager control names such as Tasks.<br/>

 > [!TIP]
 > If an error occurs in a Teams desktop client, try to replicate in Teams web to capture the error log. 

## FAQ

Q: What are the Collaboration controls (Preview)?

A: Collaboration controls (Preview) enable you to add Microsoft 365 capabilities to your Power Apps line of business custom applications to simplify user workflows when collaborating on business processes in Teams or Power Apps.

Q: What is the benefit of the Collaboration controls (Preview) for makers?

A: With these new controls, you as a maker can drag-and-drop controls that bring Microsoft 365 collaboration to your app.

Q: What is the benefit of the Collaboration controls (Preview) for users?

A: Your users can experience productivity gains and stay in their flow by collaborating on approvals, files, meetings, notes and tasks without leaving the context of your app.

Q: How do I get access to the Collaboration controls (Preview)?

A: Request that your Power Platform administrator install the controls from AppSource to your Power Apps environment.

Q: How do I add the controls to a Model Driven App?

A: Navigate to Form Designer and drag the controls from the Component pane onto a form
