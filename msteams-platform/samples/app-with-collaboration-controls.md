---
title: Application with Collaboration controls for Microsoft Teams
author: surbhigupta
description: In this article, learn how to build a model-driven app and add Collaboration controls to the app.
ms.localizationpriority: medium
ms.author: v-npaladugu
ms.topic: conceptual
---

# Create a new model-driven app with Collaboration controls for Teams

Collaboration controls are designed for [model-driven applications](/power-apps/maker/model-driven-apps/model-driven-app-overview). The following section covers how to create a model-driven app.

## Create a model-driven application

1. Open [https://make.preview.powerapps.com.](https://make.preview.powerapps.com/)

1. Select **Solutions** in the left pane.

1. Select **New solution**, so that you can provide a home for all your future customizations.

   :::image type="content" source="../assets/images/collaboration-control/new-solution.png" alt-text="The screenshot is an example that shows the new solution." border="true":::

1. Provide the name and publisher of your new solution, this solution is going to hold your custom Collaboration Manager.

   :::image type="content" source="../assets/images/collaboration-control/collaboration-manager.png" alt-text="The screenshot is an example that shows the Collaboration manager." border="true":::

1. Select **Create**

1. After the solution is created, it appears in your list of solutions. Select your solution to open it.

1. Before creating your app, create a home for your data. select **New** > **Table** to get started.

1. Give your table a name. Under **Advanced options** select **Creating a new activity**.

   :::image type="content" source="../assets/images/collaboration-control/new-activity.png" alt-text="The screenshot descirbes how to create new activity." border="true":::

    > [!TIP]
    > Take a note of the schema name in the side pane for the settings, it would be such as cr*****_inspections

1. Select **Save**.

1. After you're done creating your table, you can customize it by adding extra
columns, relationships, and more (Optional).

1. Now you can create a new model-driven app by selecting **New** > **App** > **Model-driven app.**

   :::image type="content" source="../assets/images/collaboration-control/model-driven-app.png" alt-text="The screenshot is an example that shows ths new model driven app." border="true":::

1. Choose new **Modern app designer (preview)** to open the new app.

   :::image type="content" source="../assets/images/collaboration-control/model-driven-app-blank.png" alt-text="The screenshot is an example that shows the new model driven app blank." border="true":::

1. Select **Create.**

1. Give your app a name and select **Create.**

   :::image type="content" source="../assets/images/collaboration-control/collaboration-manager-for-inspection.png" alt-text="The screenshot is an example that shows the Collaboration manager for inspection." border="true":::

1. Select **Add page.**

1. Select **Table based view and form.**

   :::image type="content" source="../assets/images/collaboration-control/table-based.png" alt-text="The screenshot is an example that shows the table based view and form." border="true":::

1. Select **Next.**

1. Search and select the table you've created earlier.

   :::image type="content" source="../assets/images/collaboration-control/table-view-form-pages.png" alt-text="The screenshot is an example that shows the table view form pages." border="true":::

1. Select **Add.**

1. Select **Publish** to save and publish your app.

1. Select **Play** to test out your new app.

Now you’ve successfully built a model-driven app.

## Add Collaboration controls to your application

Following are the steps to add Collaboration control capabilities such as Tasks, Meetings, Files, and Notes experiences to the app created:

1. To include the Tasks, Meetings, and Notes tabs you need to edit the Main Information form. To begin, go back to the explorer and select your solution.

1. Select the table you created in [Create a new model-driven app for Teams.](#create-a-new-model-driven-app-with-collaboration-controls-for-teams)

1. Go to the Forms tab for your table.

     :::image type="content" source="../assets/images/collaboration-control/forms-tab.png" alt-text="The screenshot is an example that shows the forms tab for your table." border="true":::

1. Select the Information form of form type **Main** to open it in the form designer.

1. Once you are in the form designer, press and drag in a **1-column tab** from the **Components** section.

     :::image type="content" source="../assets/images/collaboration-control/components.png" alt-text="The screenshot is an example that shows the components of power apps." border= "true":::

1. After selecting the tab, rename the tab to “Tasks” in the property pane.

1. Select the tab name to select the full section and select **Expand first component to full tab** in the Properties pane. This is required as the controls only support full tab views.

     :::image type="content" source="../assets/images/collaboration-control/expand-first-component.png" alt-text=" The screenshot describes how to expand first component to full tab." border="true":::

1. You can now run your power app in Power Apps by selecting it.

     :::image type="content" source="../assets/images/collaboration-control/collaboration-manager-for-inspections-power-apps.png" alt-text="Collaboration manager for inspections" border="true":::

1. Create a new record by selecting **+ New** and then open the record.

     :::image type="content" source="../assets/images/collaboration-control/power-apps-open-the-record.png" alt-text="The screenshot is an example that shows the power apps that opens the record." border="true":::

1. Now you can see views for each tab that appear similar to the following image:

     :::image type="content" source="../assets/images/collaboration-control/tabs.png" alt-text="The screenshot is an example that shows the tasks." border="true":::

     > [!TIP]
     > The controls are only visible after a record is saved in the application. If the control tabs don't appear in your record, try to refresh your browser or republish the app from Power Apps.

Now you’ve successfully added the Collaboration controls to your application. You can now run your application in Power Apps and launch the controls. As settings haven't yet been configured, you'll not be able to create entities such as Tasks, or Meetings.

## Define Settings for your Collaboration

You can define settings for Collaboration controls for the business entity such as the table created in [new model-driven app](#create-a-new-model-driven-app-with-collaboration-controls-for-teams).

The settings that you can apply are as follows

|Settings|Used by|
|---|---|
|Group ID|Tasks, Internal Meetings, Approvals.|
|Bookings business ID|External meetings using Bookings |
|Site ID|SharePoint files |
|Drive ID|SharePoint files|

> [!NOTE]
> Settings are crtical to launch your app, so ensure that you follow the steps as suggested. If you have issues launching and saving the controls recheck the values.

You can get the Group ID by creating a new team or use an existing team in Microsoft Teams to host your application and create settings variables.

To create a new team, see [create a team from scratch](https://support.microsoft.com/en-us/office/create-a-team-from-scratch-174adf5f-846b-4780-b765-de1a0a737e2b).

Use the following instructions to retrieve the Group ID of your Teams team for Approvals, Tasks, and internal Meetings:

1. Find your team in your teams list.

1. Select the More options **...** and **Get link** to team.

     :::image type="content" source="../assets/images/collaboration-control/get-link.png" alt-text="The screenshot describes how to get the linked to the team." border="true":::

1. Copy the link and record the value of `groupId` from the URL. You'll use this value at a later stage while defining the settings of your solution.

     `https://teams.microsoft.com/l/team/19%3akk_TuKhjXu92yJvg4TZ10S6rouLSCgvHIb5NOOTfRjg1%40thread.tacv2/conversations?groupId=4310f270-1aa5-4089-99f3-47eb3b4d69ad&tenantId=b699419b-e0df-47e3-9909-24076fdcf68b`

Use the following instructions to retrieve the Retrieve the SharePoint Site ID and Drive ID for Files:

1. To use the Files control, you'll need to configure to an existing SharePoint site or create a new SharePoint site. To create a new site, see [create a site](/sharepoint/create-site-collection).

1. Now retrieve the Setting Values of Site ID and Drive ID, which can be called using the details in your SharePoint site.

     1. **Site ID**: Using [Graph Explorer](https://developer.microsoft.com/graph/graph-explorer), sign in and give permissions to Directory.ReadWrite.All and User.ReadWrite.All
         :::image type="content" source="../assets/images/collaboration-control/graph-permissions.png" alt-text="The screenshot is an example that shows the Graph Explorer.":::

     1. Ensure that you replace hostname with your hostname and relative path to the site path and make a graph call to `https://graph.microsoft.com/v1.0/sites/{hostname}:/{relative-path-to-site}`. Following is an example:
         1. If your Site URL = <https://myhostname.sharepoint.com/sites/MySiteName>
         1. Hostname = myhostname.sharepoint.com
         1. Relative path to site = sites/MySiteName

              :::image type="content" source="../assets/images/collaboration-control/graph-call.png" alt-text="The screenshot is an example that shows the Graph call.":::

            Graph call would be, `https://graph.microsoft.com/v1.0/sites/myhostname.sharepoint.com:/sites/MySiteName`.

     1. The response received is a Json object representing the Site, for example Site ID would be `abcdef.sharepoint.com,0abe7394-6fce-4dcc-9884-7eaceb48cd41,8cb86762-16cd-495e-87cb-893cfdf94054`.

     1. Save the Site ID value parameter.

     1. **Drive ID**: Using [Graph Explorer](https://developer.microsoft.com/graph/graph-explorer), sign in and make the graph call to `https://graph.microsoft.com/v1.0/sites/{site-id}/drives` with the value of Site ID that you saved earlier.

     1. A Json response is returned with a parameter value of type array or list of drive objects. Look through the Json for the Json object whose name parameter matches the name of your document library. Save the value of the Drive ID parameter.

To create meetings with users outside of your organization such as customers and to use virtual visit features within your app you would need to provide a Bookings business. For more information, see [Microsoft Bookings](/microsoft-365/bookings/bookings-overview?view=o365-worldwide&preserve-view=true).

## Add Settings to your Collaboration Manager app

To apply settings and explore the collaborative features of your app in Power Apps, open the application that you've created earlier. You would see a view page, where you can select the existing records or create new one. To begin with open or create a record.

You would need to add the Settings IDs that you've saved earlier for your application

|Settings|Used by|
|---|---|
|Group ID|Tasks, internal Meetings, Approvals.|
|Bookings business ID|External meetings using Bookings |
|Site ID|SharePoint files |
|Drive ID|SharePoint files|

### Add Settings for Tasks, Meetings, and Files

1. Launch a control and you can see a window as following:

     :::image type="content" source="../assets/images/collaboration-control/launch-window.png" alt-text="The screenshot is an example that shows the control window.":::

1. Select **Configure** and navigate to the General tab to add the Group ID.

     :::image type="content" source="../assets/images/collaboration-control/groupid-general.png" alt-text="The screenshot describes how to add the Group ID in General tab.":::

1. Open Files tab to add Site ID and Drive ID.

     :::image type="content" source="../assets/images/collaboration-control/files-tab.png" alt-text="The screenshot describes how to add the site ID and drive ID in files tab.":::

The Notes control doesn't require a setting value. Now you can create entities such as Tasks and Meetings in your application. If you're facing issues launching and saving the controls recheck the settings values.

## Navigate your new Collaboration Manager app

Following sections guides you on how to use the Task, Notes, Meetings, Files, Conversations, and Approvals controls.

### Creating Tasks

Explore collaboration in the Tasks tab by selecting the Tasks tab, which opens an empty page where users can add all the relevant tasks they need to complete.

:::image type="content" source="../assets/images/collaboration-control/explore-tasks.png" alt-text="The screenshot is an example that shows the explore tasks tab.":::

1. To create a new task for the team, select **Add a task**. This will open a dialog where you can provide specifics about the task and assign it to the relevant people on the team and select Save.

     :::image type="content" source="../assets/images/collaboration-control/add-task.png" alt-text="The screenshot describes on how to add a task.":::

1. The saved task will appear in the tasks list.

     :::image type="content" source="../assets/images/collaboration-control/task-list.png" alt-text="The screenshot is an example that shows the list of tasks.":::

1. As all the tasks are backed by Microsoft Planner. Users can use the Tasks app within Microsoft Teams to see all the tasks that are assigned. To get started, select **More** options‘…’ in Teams left pane. Search and select Tasks by Planner and To Do.

     :::image type="content" source="../assets/images/collaboration-control/tasks-planner.png" alt-text="The screenshot is an example of the Tasks by Planner and To Do.":::

1. After opening the Tasks by Planner and To Do app, users can see all the tasks that were created in your app within the **Assigned to me** section of the app. Users can also view the details of a task, add attachments, and mark them as complete.

### Creating notes

To create a note select **Notes** tab from your app, which would redirect to an empty screen where users can provide any relevant information. To add a new note, select **New note**.
After adding relevant details in the notes, select **Save**.

:::image type="content" source="../assets/images/collaboration-control/notes-tab.png" alt-text="The screenshot describes how to create new Notes.":::

### Creating meetings

Select **Meetings** tab in a record to schedule both internal and external meetings.

:::image type="content" source="../assets/images/collaboration-control/meeting-tab.png" alt-text="The screenshot descirbes how to schedule meetings.":::

To schedule an internal meeting, select the dropdown next to the **New meeting** button and then select **Internal meeting**.

:::image type="content" source="../assets/images/collaboration-control/new-meeting-tab.png" alt-text="The screenshot describes how to schedule internal meetings.":::

> [!NOTE]
>
> Customer Booking is enabled, if you have configured the Microsoft Booking with a valid setting for your app.

Within the **New meeting** dialog, users can provide relevant information about the meeting and select **Save**. The meeting appears in the meetings list.

To schedule an external meeting with the customer, select the dropdown next to the **New meeting** button and select **Customer Booking**. If the **Customer Booking** option isn't available in the **New Meeting** dropdown, confirm if the app is configured to Microsoft Bookings in the Settings and the user has the Bookings Administrator role. For more information, see [add staff to Bookings](/microsoft-365/bookings/add-staff?view=o365-worldwide&preserve-view=true). You can add additional booking types by adding additional services within your Bookings business.

:::image type="content" source="../assets/images/collaboration-control/customer-booking.png" alt-text="The screenshot describes on how to schedule customer Bookings.":::

Users can see both Internal meetings and Customer Bookings on their meeting list. After the meeting is started, users can join by selecting the **Join** button, which opens the meeting directly in Microsoft Teams.

As the meetings are backed by Outlook, users can navigate to either Bookings, or Outlook Calendar to see all the meetings listed in a single calendar. Internal meetings are listed in shared calendar.

### Adding files

Open the **Files** tab in your application and select **Upload** to upload files from OneDrive for Business or from your computer. When a file is successfully uploaded, the main list view automatically refreshs to show the files in the list.

:::image type="content" source="../assets/images/collaboration-control/upload-files.png" alt-text="The screenshot describes how to upload files.":::

### Using Approvals

Approvals allow users to request sign off from others when working in a record. For example, request an approval to complete a task or close a record.

1. Go to the **Approvals** tab of the application.

1. When there are no approval requests, users see the following screen.

      :::image type="content" source="../assets/images/collaboration-control/no-approvals.png" alt-text="The screenshot is an example that shows no approval requests.":::

1. Select the **New approval request** to open the approval request form.

      :::image type="content" source="../assets/images/collaboration-control/approval-request-form.png" alt-text="The screenshot is an example that show the new approval request form.":::

1. In the Approval request form, fill the required fields and select **Send**,which creates a request and added to the list.

      :::image type="content" source="../assets/images/collaboration-control/approvals-list.png" alt-text="The screenshot is an example that show the list of approvals.":::

1. Select the approval to view the details.
