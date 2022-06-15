---
title: Deploy app with collaboration controls in Microsoft Teams
author: surbhigupta
description: The solutions that make up Collaboration Controls allow makers to build applications that integrate with Microsoft 365 services like Planner, Bookings, and Outlook.
ms.localizationpriority: medium
ms.author: v-npaladugu
ms.topic: conceptual
---

# Deploy collaboration controls app in Teams

 Collaboration controls currently works best within Microsoft Teams, so the following steps highlight how you can create a new app that can be embedded inside of Microsoft Teams as both a personal app and tab app.

 **Task 1: [Optional] Configuring the app to look great in Microsoft Teams**

 To do so, we will leverage Power Apps ‘new app’ settings.

 1. Navigate to **Solutions** in the left navigation.

 1. Navigate to the bottom of your solutions list and select **Default solution.**

 1. Search for and select **Setting definition** in the tree view.

     :::image type="content" source="../assets/images/Collaboration control/settings-defnition.png" alt-text="Setting definition" border="true":::

 1. Search for and select **Hide the navbar** from the list of settings definitions. This will hide the left navigation in your application. Do not enable this feature if your app has multiple navigation items you want the user to leverage.

     :::image type="content" source="../assets/images/Collaboration control/hide-the-nav-bar.png" alt-text="Hide the nav bar" border="true":::

 1. In the edit pane that appears on the right, there should be a section at the bottom titled **Setting app values.** If you created your app using the modern app designer, your app should appear on the list. Select **New app value** underneath your app.

 1. Change the value from **No** to **Yes.**

     :::image type="content" source="../assets/images/Collaboration control/value-to-yes.png" alt-text="Change value to yes" border="true":::

 1. Select **Save.**

 1. Repeat steps 4-7, but this time, search for and select App high density page header. Note, there is a known issue with the chats experience where the chat icon may not appear if the high density page header is enabled.

     :::image type="content" source="../assets/images/Collaboration control/density-page-header.png" alt-text="Density page header" border="true":::

 1. Select **'Back to solutions'**

     :::image type="content" source="../assets/images/Collaboration control/default-solution.png" alt-text="Default solution" border="true":::

 1. . Finally, select **Publish all customizations** to publish all the work you've completed.

     :::image type="content" source="../assets/images/Collaboration control/publish-cusomization.png" alt-text="Publish all customizations" border="true":::

 **Task 2: Adding the app to the Microsoft Teams app catalogue**

 1. Now that the settings are defined, we can now add the app to Microsoft Teams. To begin, navigate to the **Apps** page in the Power Apps maker portal.

 1. Once' there, find the app you previously created and select the '…'

 1. To bring the app to Teams, select **Add to Teams**.

     :::image type="content" source="../assets/images/Collaboration control/add-to-teams.png" alt-text="Add to Teams" border="true":::

 1. This will open the **Add to Teams** panel. Review the details and select **Download app** [to save the Microsoft Teams app manifest to your device].

     :::image type="content" source="../assets/images/Collaboration control/colab-manager-inspection.png" alt-text="Collaboration manager inspection" border="true":::

 1. To bring your newly downloaded app manifest to Microsoft Teams, open Teams and navigate to the app store by selecting Apps in the left app bar.

 1. Next, select **Upload a custom app** at the bottom of the left navigation. [Note: The steps to select 'Upload a custom app' may vary depending on your version of Teams e.g., you may have to select **Manage your apps** > **Upload a custom app**]

     :::image type="content" source="../assets/images/Collaboration control/upload-custom-app.png" alt-text="upload a custom app" border= "true":::

 1. Select **Upload for my org** and select the Teams app manifest you downloaded on step 4 above.

 1. Once the upload is complete, the app may appear **Manage your apps** or in the **Built by your org** section of the Teams app catalogue.

 **Task 3: [Optional] How to add the app as a Teams tab**

 1. To add an app to a team, select the chevron next to the Open button and select Add to a team.

     :::image type="content" source="../assets/images/Collaboration control/add-app-teams-tab.png" alt-text="Add the app as a Teams tab" border="true":::

 1. Search for and select the team channel you want to add the app to.

     :::image type="content" source="../assets/images/Collaboration control/select-team-channel.png" alt-text="Select Teams channel" border="true":::

 1. Finally, select **Save** to finish pinning the app to your Teams channel.

     :::image type="content" source="../assets/images/Collaboration control/select-save.png" alt-text="Select save" border="true":::

 1. Once' successful, the app will appear as a pinned tab.

 **Task 4: [Optional] How to add the app as a personal app**

 1. Select '…' in the Teams left nav bar to find your app, select your app to open it. When your app appears on the Teams left nav bar, right click and select **Pin** to add the app as a personal app.

     :::image type="content" source="../assets/images/Collaboration control/select-pin.png" alt-text="select pin" border="true":::

 1. Now the app is pinned as a personal app in the left app bar.

## Enable others to use your application

 The following role is required to enable users to run deployed Collaboration Manager applications built using the Collaboration controls.

* Create a Collaboration team
* Add members to the team
* Create a security role
* Assign security roles to team members

 **Task 1: Create a Collaboration team**

1. Sign into Power Platform Admin Center
     a. Select the environment where the app is deployed <br/>
     b. Select **Settings** > **Users** + **permissions** <br/>
     c. Select **Teams** <br/>

1. Click the + Create team button on the top of the page

     a. Fill in the required fields <br/>
     b. **Team name:** Make sure this name is unique within the business unit. <br/>
     c. **Description:** Enter a description of the team. <br/>
     d. **Business unit:** Select a business unit from the dropdown list. <br/>
     e. **Administrator:** Search for the user within your organization that you want to assign as the administrator by entering characters. <br/>
     f. **Team type:** Select the team type. The following task 2 assumes you've selected ‘Owner’ from the dropdown list. The other team types (Microsoft 365 team and Microsoft Azure Active Directory team) will auto populate team members from Azure Active Directory.<br/>

     :::image type="content" source="../assets/images/Collaboration control/new-team.png" alt-text="New team" border="true":::

     1. Make a note of the team name. You'll need this later to assign this team as the owner of a record.

     1. Select **Next.**

 **Task 2: Add members to the team**

 (This is not necessary if your team type is Azure Active Directory or Microsoft 365.)

 1. Select a team, and then select **Manage team members**

 1. To add new team members, select + **Add team members** and choose users from your organization to add.

     :::image type="content" source="../assets/images/Collaboration control/add-team-members.png" alt-text="Add Team members" border= "true":::

 1. To delete a team member, select the user and then choose Remove.

 **Task 3: Create a security role**

 1. Return to step 1b

 1. Click on Security roles

     :::image type="content" source="../assets/images/Collaboration control/users-permission.png" alt-text="Users permission" border="true":::

 1. Click on **New role** at the top left of the page

     a. A new page will now open

 1. On the **Details tab**, provide a name for your security role.

 1. Go to **Custom Entities** tab

     a. Give organization permissions (full green circle) for each of the collaboration entities:
**Collaboration Map**, **Collaboration Metadata**, **Collaboration Root**.

     :::image type="content" source="../assets/images/Collaboration control/collab-map.png" alt-text="Collaboration map" border="true":::

 1. Select **Save** and **Close**

 **Task 4: Assign Security roles**

 1. Return to step 1b.

 1. Select **Teams**, select then the team you created in step 3.

 1. Choose **Manage security roles** from the header.

     :::image type="content" source="../assets/images/Collaboration control/edit-team.png" alt-text="Edit team" border="true":::

 1. Select the roles created in Task 3.

 1. Select **Save**.

 More information on role privileges: [Configure user security in an environment - Power Platform | Microsoft Docs](/power-platform/admin/database-security)

 **[Optional] Power Automate**

 Power Automate can be used to automate workflows around your Collaboration Manager application. For example, automatically create tasks when a new record is created.

 This is an advanced scenario that requires Makers to build flows using [published Power Automate connectors](/connectors/connector-reference/connector-reference-powerautomate-connectors) (like the [Planner connector](/connectors/planner/)) to create flows and call Collaboration Toolkit APIs to associate the action with a record.

 To interact with the Collaboration Toolkit API in a Power Automate Flow, the recommended approach is to use the [Dataverse Connector](/connectors/commondataserviceforapps/) and [Perform an Unbound Action](/connectors/commondataserviceforapps/).

## Limitations and known issues

 The Collaboration controls is currently intended for use as described in this document, and there are the following limitations:

* Components cannot be used in Canvas Apps.
* Components only support full tab views.

     :::image type="content" source="../assets/images/Collaboration control/tasks-tab.png" alt-text="tasks" border="true":::

* The subgrid view selected is not honored. All tasks, meetings or notes for the collaborative record will be displayed.

     :::image type="content" source="../assets/images/Collaboration control/subgrid-view.png" alt-text="subgrid view" border= "true":::

* Activities added to the timeline control don’t appear in the components (and tasks, meetings and notes created in the components are not included in the timeline control).
* New records must be saved before accessing the components, otherwise you will see an empty screen.
* The components do not inherit theming from the form or app they are added to.
* Localization is only available when running the app inside Microsoft Teams.
* Edge strict mode is not supported, and cross-site cookies are required.

 **Admin Center does not update when installation or upgrade is complete**

 When following the installation steps in exercise 1,' redirected to the Power Platform admin center. A banner is displayed when installation starts, but it is not updated when installation completes. The status is listed during installation, and when installation is complete it may disappear from the list. You can view the solutions list at <https://make.preview.powerapps.com/> to confirm that installation is complete.

 **View during installation:**
     :::image type="content" source="../assets/images/Collaboration control/view-during-installation.png" alt-text="view during installation" border="true":::

 **View after installation:**
     :::image type="content" source="../assets/images/Collaboration control/view-after-installation.png" alt-text="view after installation" border="true":::

 When upgrading the controls to a later version, the same installation started banner displays, but the controlstatus remains installing even after the upgrade is complete. You can confirm that the upgrade is complete by checking the Solutions list at [https://make.preview.powerapps.com/](https://make.preview.powerapps.com/), it should take approximately 15 minutes. You can also see in the history for specific solutions that the later version was installed and then the previous version was removed:
     :::image type="content" source="../assets/images/Collaboration control/history.png" alt-text="History check" border="true":::

 **Conversations button does not respond unless browser locale is English (United States)**

 If the Conversations button does not respond when you click it, and you observe the following error in the console logs:
     :::image type="content" source="../assets/images/Collaboration control/console-log.png" alt-text="console log" border="true":::

 This is caused by a localization error for the Conversations component. You can resolve the issue by updating your browser locale to en-US.

 **Conversations button disappears in Teams Web UI**
 There is an issue that causes the Conversations button to intermittently disappear when viewing a record in the Teams Web UI. You can follow this workaround to reload the button when the “App high density page header” setting is turned off:,

 1. Go back to the list view that shows all the records for the entity.

 1. Refresh the browser.

 1. Click on a record.

 1. The Conversations button is now visible.

 **Conversations are not refreshed when moving to another record**

 The conversations pane is not refreshed when you move between records. As a result, you will see all the conversations from the teams channel, and not just the ones linked to that specific record. Deleted conversations will also be displayed with "(no title)".

 **Multiple Conversations buttons are displayed in Teams channels**

 When an app is played in a Teams channel, there is an additional chat icon in the header bar that opens the Posts tab with channel conversations. This is not present when apps are played as a personal app or group chat app.

 **Meeting attendee status is incorrect**

 When an attendee RSVPs to a meeting, their response status may not display correctly in both the agenda view and the meeting details. Clicking the decline button may also return an error message on screen.

 **Cannot join meetings from Power Apps runtime**

 The join button does not work for meetings when apps are played in Power Apps. This issue can be worked around by playing apps inside Teams.

 **Duplicate Archive Folders**

 When navigating into the Archive folder after archiving files, users may experience duplicate archive folders. Navigating from the archive folder(s) to the files main view will resolve the issue, and files that are archived will not be removed.

 **System Error after Upgrade**

 If you experience the error ‘System.ServiceModel.FaultException`1[Microsoft.Xrm.Sdk.OrganizationServiceFault]:Dataset with name 'gridData' not found Dataset Configuration for reference:…’ you may have a subgrid bound to an earlier version of the Events control. Solution: Remove subgrids that were bound to the Events control and after importing the new package, add the events control back.

 **Cannot add app in Teams**

 Sometimes an app cannot be added to a Teams channel because the app details do not load correctly and the Save button is disabled:
     :::image type="content" source="../assets/images/Collaboration control/collab-mgr-inspection.png" alt-text="Collab manager inspection" border="true":::

 This can be worked around by creating a new model driven app that uses the same table (repeating exercise 2, exercise 4 task 2 and exercise 6 task 2).

 It can also be helpful to:

 1. Ensure the app has a different name or description, so you can identify the new app in the Teams app catalogue.
 1. Test publishing the app to Teams before repeating exercise 4, task 2
 Cannot change app details after uploading to Teams
 If you want to change the app name, icon, or description after uploading it to Teams, you can follow this process:
 1. Go to admin.teams.microsoft.com
 1. Either select the option to upload a new file, or delete the app and it can be uploaded to Teams
 following the process in exercise 6 task 2.

     :::image type="content" source="../assets/images/Collaboration control/manage-apps.png" alt-text="manage apps" border="true":::

* If you're updating the manifest, you've to unzip it and manually update the version number so that it is higher.

* After changing the app catalogue in the tenant, you've to log out and log back in as the user to get the updated catalogue.

 **Tasks, Meetings controls fail to save**

 If a control fails to save a task or meeting, the likely cause is misconfigured Group ID or Channel ID.

 Solution 1: Confirm the IDs are correct, and the settings have been applied as per the settings exercise.
 Solution 2: Try to ensure that the Power Apps environment and Teams environment are on the same tenant.

 **Controls fail to load or show an error**
 If Tasks, Meetings or Files controls fail to load or show an error, it may be a transient issue.

 Example:
     :::image type="content" source="../assets/images/Collaboration control/control-fail.png" alt-text="control fail" border="true":::

 Solution: Refresh your browser or if in Teams, reload the tab.

## Error Logging & Support

 The controls provides the following methods to debug your application.

 1. Trace logging of plugin events when an API is invoked. This information is stored in your Dataverse environment.

 a. **To enable trace logging please follow these steps:** Logging and tracing (Microsoft Dataverse)<br/>

* Power Apps Microsoft Docs:[https://docs.microsoft.com/en-us/powerapps/developer/dataplatform/logging-tracing?WT.mc_id=email](/power-apps/developer/data-platform/logging-tracing?WT.mc_id=email)

 1. **Browser logging** for UI controls. This is standard console logging.
 a. It is supported when using a browser to run the Collaboration Manager app via Power Platform
 and Teams web. <br/>
 b. Within the console tab, you can search for errors using the Collaboration Manager error
 message or searching for Collaboration Manager control names such as Tasks.<br/>

 > [!TIP]
 > If an error occurs in a Teams desktop client, try to replicate in Teams web to capture the error log. Support

 **Support**

 If you need to log support issues, go to <https://aka.ms/CollaborationToolkitFeedback> and provide the requested information.

 How to collect this type of information in your Power App environment

 |**Area**| **How to** |
 |---|---|
 | Session details | Select Edit in Preview, Select the settings icon and ‘Session Details’ and select ‘Copy details’ |
 | Browser language | Get your language(s) from your browser settings. |
 | Region | Determine your region from your Operating System settings. |
