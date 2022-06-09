---
title: Collaboration Controls for Microsoft Teams
author: surbhigupta
description: The solutions that make up Collaboration Controls allow makers to build applications that integrate with Microsoft 365 services like Planner, Bookings, and Outlook.
ms.localizationpriority: medium
ms.author: v-npaladugu
ms.topic: conceptual
---

# Collaboration controls overview

 The solutions that make up Collaboration Controls allow makers to build applications that integrate with Microsoft 365 services like Planner, Bookings, and Outlook.

 Key capabilities of Collaboration Controls include the following:

 **Microsoft Planner tasks:** Create tasks that are assigned to members of a record so that they can view a consolidated list of remaining items within the Tasks app within Microsoft Teams.

 **Dataverse Tasks:** Create tasks that can be assigned to users who are external to your organization.

 **Dataverse Notes:** Create notes that are assigned to a record in your app.

 **Outlook Meetings:** Schedule meetings with both customers and internal employees and seamlessly connect with others with Microsoft Teams with a select of a button.

 **Microsoft Teams channel conversations:** Participate in channel conversations with your
 colleagues to get questions quickly answered and to notify others of important events.

 **SharePoint Files:** Upload, view, pin/unpin, and share files with members of a record so that you can search, reference, and edit relevant artifacts in a centralized location backed by SharePoint.

 > [!NOTE]
 > By configuring and using the various Microsoft 365 capabilities of Collaboration Controls mentioned above,' granting permission for user data to pass through the Graph API and agreeing to [Microsoft API terms of Use](/legal/microsoft-apis/terms-of-use?context=graph%2Fcontext). To learn more about Graph APIs, go to [this link](/graph/overview)

## Install collaboration controls

 In this exercise, you'll learn how to install Collaboration Controls.

### Install the Collaboration Controls solutions

 In this task, you'll install the Collaboration Controls into your dataverse environment via a private link. This link must not be shared with any other persons inside or outside your organization. Afterwards, you'll be able to configure and use the components within your own   model-driven app.

 Collaboration Controls includes the following solutions:

 |**Settings solutions** | **To do** |
 |---|---|
 | Collaboration Toolkit Settings | Hold the settings infrastructure that powers Collaboration Controls. Includes several new solution-aware components.|
 | Collaboration Toolkit Settings Objects | Provides pre-defined settings values that are leveraged by the Collaboration Controls. |

 |**Collaboration solutions** | **To do** |
 |---|---|
 | Collaboration Toolkit Tasks | Includes the new tasks PCF (Power Apps component framework) control, and in the future, the virtual table for Planner tasks.|
 | Collaboration Toolkit Events | Includes the new events PCF control, and in the future, the virtual table for Outlook and Bookings events. |
 | Collaboration Toolkit Notes | Includes the new notes PCF control. |
 | Collaboration Toolkit Chats | Includes the new conversations PCF control, and in the future, the virtual table for Conversations |
 | Collaboration Toolkit Files | Includes the new files PCF control, and in the future, the virtual table for Files |
 | Collaboration Toolkit Core | Includes custom Collaboration Apis and the Collaboration Data Model |

 > [!TIP]
 > If you've an existing version of the controls installed in your environment, you may need to create a fresh environment and complete a new install to successfully upgrade to the latest   version.

 Before installation, you must be in a power platform environment or tenant admin. You'll need a dataverse environment with a database. If you've one, you'll need to create a new one to continue this lab.

 To install the solutions, begin by navigating to Microsoft AppSource and then complete the following steps.

 1. Select the Get it now button,
 1. Sign in with your account, fill in the form and continue

     :::image type="content" source="../assets/images/Collaboration control/preview-form.png" alt-text="Preview form "border="true":::

     :::image type="content" source="../assets/images/Collaboration control/overview.png" alt-text="overview collaboration control" border="true":::

     :::image type="content" source="../assets/images/Collaboration control/collaboration-controls-preview.png" alt-text="Collaboration control preview" border="true":::

 1. You'll be directed to Power Platform Admin Center. Select an environment from the drop down and agree to the terms and policy statements.

     > [!TIP]
     > If you see a permissions error when you select the environment, try clicking outside the
     environment drop down to see if that resolves the issue.

     :::image type="content" source="../assets/images/Collaboration control/install-collaboration-control.png" alt-text="Install collaboration control" border="true":::

 1. Select Install to begin installation. Installation should take approximately 15 mins to complete.

 1. Navigate to [https://make.preview.powerapps.com/](https://make.preview.powerapps.com/environments/839eace6-59ab-4243-97ec-a5b8fcc104e4/home)

 1. Make sure' in the environment the controls were installed into. You can view the environment and change it if required on the top right of the screen.

     :::image type="content" source="../assets/images/Collaboration control/power-apps.png" alt-text="power apps" border="true":::

 1. Once' in the right environment, select the Solutions tab to view all the solutions that you've just installed.

 The Collaboration controls are a preview, and any element may change over time with potential for breaking changes. The Collaboration controls aren't supported on production environments.

   :::image type="content" source="../assets/images/Collaboration control/solutions.png" alt-text="solutions collaboration control" border= "true":::

 Congrats! You've successfully installed all the Collaboration solutions into your environment. In the next exercise, you'll build a new model-driven app that can take advantage of the Collaboration Control capabilities.

### Prerequisites

 The following are required to build and deploy Collaboration Manager applications using the Collaboration Controls.

* Power Apps - to build Model Driven Applications using the Collaboration Controls
* Microsoft 365 E3 or higher - to deploy custom applications to Microsoft Teams

### Role Requirements

 To install the components onto a Power Platform environment the following roles are required:

* System Customizer
* Environment Maker

 > [!NOTE]
 > If these roles are enabled but installation of the controls is showing ‘privilege errors’, elevate the account to the System Administrator role.

 More information on role privileges: [Configure user security in an environment - Power Platform | Microsoft Docs](/power-platform/admin/database-security)

### Create a new model-driven app for Teams

 Collaboration controls are designed for best model-driven applications. The following section covers how to create a model-driven app.

 Create a model-driven application

 1. Navigate back to [https://make.powerapps.com.](https://make.powerapps.com.)

 1. Select Solutions in the left navigation.

 1. Select New solution so that we can provide a home for all our future customizations.

     :::image type="content" source="../assets/images/Collaboration control/new-solution.png" alt-text="New solution" border="true":::

 1. Provide the name and publisher of your new solution. Since this solution is going to hold our custom Collaboration Manager, let’s call it **My Collaboration Manager**.

     :::image type="content" source="../assets/images/Collaboration control/collaboration-manager.png" alt-text="Collaboration manager" border="true":::

 1. Select **Create**

 1. Once the solution has been created, it'll appear in your list of solutions. Select it to open it.

 1. Before creating our app, we must first create a home for our data; select **New** > **Table** to get started.

 1. Give your table a name, we'll use **'Inspections'** for this document.

 1. Under **Advanced options** select **Creating a new activity**.

     :::image type="content" source="../assets/images/Collaboration control/new-activity.png" alt-text="Create new activity" border="true":::

     > [!TIP]
     > Take a note of the schema name in the side pane for the later settings exercise e.g.cr*****_inspections.

 1. Select **Save**

 1. Once you're done creating your table, feel free to customize it by adding additional
columns, relationships, and more (Optional).

 1. Next, we'll create a new model-driven app by selecting **New** > **App** > **Model-driven app.**

     :::image type="content" source="../assets/images/Collaboration control/model-driven-app.png" alt-text="New model driven app" border="true":::

 1. Choose to open the new app in the new **Modern app designer (preview)**

     :::image type="content" source="../assets/images/Collaboration control/model-driven-app-blank.png" alt-text="new model driven app blank" border="true":::

 1. Select **Create.**

 1. Give your app a name, such as **‘Collaboration Manager for Inspections’** and select **Create.**

     :::image type="content" source="../assets/images/Collaboration control/collaboration-manager-for-inspection.png" alt-text="Collaboration manager for inspection" border="true":::

 1. Select **Add page.**

 1. Select **Table based view and form.**

     :::image type="content" source="../assets/images/Collaboration control/table-based.png" alt-text="Table based view and form" border="true":::

 1. Select **Next.**

 1. Search for and select the table you created on step 8.

     :::image type="content" source="../assets/images/Collaboration control/table-view-form-pages.png" alt-text="Table view form pages" border="true":::

 1. Select **Add.**

 1. Select **Publish** to save and publish your app.

 1. Select **Play** to test out your new app.

 **Congrats!** You’ve built a model-driven app. In the next steps, we’ll show you how to add collaboration controls.

### Configure Collaboration controls for your application

 In this exercise, you'll define the settings for Collaboration controls for the business entity (for example, Inspections) you created in the previous exercise.

 The settings you apply are **Group ID** which is needed for Tasks and internal Meetings, **Channel ID** for Conversations, and the **Booking business ID** to enable external meetings using Bookings functionality. You'll also apply settings for the **Site ID and Drive ID**, which are needed for Files to be linked to your SharePoint site.

 You can do this by creating a new Team to host your application and create settings variables, **OR if using an existing Team, you can skip to Task 2.**

Create a new Microsoft Teams team

 1. Open **Microsoft Teams** and navigate to **Teams** in the left app bar.

 1. Select Join or create a team so that we can create a new team that'll be leveraging the app you created. This team'll be the home for all conversations and more for this app.

     :::image type="content" source="../assets/images/Collaboration control/join-create-team.png" alt-text="Join or create a Team" border="true":::

 1. Select **Create team** to open the new team creation modal.

 1. Select **From scratch** to create a brand-new Teams team.

     :::image type="content" source="../assets/images/Collaboration control/from-scratch.png" alt-text="Create a brand new Teams" border="true":::

 1. Determine if you want to make the team Private, Public, or Org-wide. [Learn more.](/microsoft-365/community/changing-microsoft-teams-from-private-to-public-what-to-expect-in-sharepoint)

     :::image type="content" source="../assets/images/Collaboration control/pvt-pub-org-wide.png" alt-text="Private public org-wide" border="true":::

 1. Provide the name and description of your brand-new team before finally selecting **Create.**

     :::image type="content" source="../assets/images/Collaboration control/quick-details.png" alt-text="Quick details about your private Team" border="true":::

 1. You can optionally add members to your new team or select **Skip** to do this later.

 **Retrieve the Group ID of your Teams team**

 1. Now that we have a Microsoft Teams team, we want to record its ID so that we can leverage it later. To get the ID, start by finding your new team in your list of teams.

 1. Select the … button

 1. Select Get link to team.

     :::image type="content" source="../assets/images/Collaboration control/get-link.png" alt-text="get link to the Team" border="true":::

 1. Now record the value of groupId from within the URL somewhere safe. You'll use this value in a future step while defining the settings of your solution.

     `<https://teams.microsoft.com/l/team/19%3akk_TuKhjXu92yJvg4TZ10S6rouLSCgvHIb5NOOTfRjg1%40thr>ead.tacv2/conversations?groupId=4310f270-1aa5-4089-99f3-47eb3b4d69ad&tenantId=b699419be0df-47e3-9909-24076fdcf68b`

 **Retrieve the internal ID of the Channel you want to install the app**

 1. Whether you created a new Microsoft Teams team and Channel or have an existing Team and Channel,
you'll want to record its Channel ID so that it can be leveraged. To get the ID, start by finding your Channel within the team in your list of teams.

 1. Select ‘…’

 1. Select Get link to channel.

 1. Record the value of channel id from within the URL somewhere safe. You'll use this value in a future step while defining the settings of your solution.

     The URL has this format: `"<https://teams.microsoft.com/l/channel/><Channel ID>/<"Channelname">?groupId=<"Group ID">&tenantId=<"Tenant ID">".`

     `<https://teams.microsoft.com/l/channel/19%3aYFxdJQf61EK8oHrq1AUu4ESOsRldO_a9qKYt8dmIUBk1>%40thread.tacv2/General?groupId=a8bf3f63-ea7c-4eb3-ad2f-48dfc4899fc1&tenantId=1c137272-0581-487f-b195-aeeb93cc4d9d`

 1. Decode this URL-encoded channel ID. For example, you would change "19%3acbe3683f25094106b826c9cada3afbe0%40thread.tacv2" to
 19:cbe3683f25094106b826c9cada3afbe0@thread.tacv2

 **Retrieve the SharePoint Site ID and Drive ID for Files**

 1. To leverage the Files control, you'll need to configure to an existing SharePoint site or to create a new SharePoint site. To create a new one, you can follow the steps listed here:
  [https://docs.microsoft.com/en-us/sharepoint/create-site-collection](/sharepoint/create-site-collection)

 1. Once you've your preferred SharePoint site identified, return to the PowerApps Maker Portal and create a new Settings Group by navigating to New and then to More and then to Other and then to Settings Group.

 1. You'll then need to retrieve the Setting Values of Site ID and Drive ID, which can be called using the details in your SharePoint site.

     * Site ID: Using [Graph Explorer](https://developer.microsoft.com/graph/graph-explorer) - Microsoft Graph, sign with the appropriate login and make the graph call: <https://graph.microsoft.com/v1.0/sites/{hostname}:/{relative-path-to-site>}, making sure to replace hostname with the hostname and relative path to site with the site path.

        i i.e., if your Site URL = <https://myhostname.sharepoint.com/sites/MySiteName>

       ii. hostname = myhostname.sharepoint.com

       iii. relative path to site = sites/MySiteName

     * This implies the graph call would be:
     <https://graph.microsoft.com/v1.0/sites/myhostname.sharepoint.com:/> sites/MySiteName

     * The response received is a Json object representing the Site. Copy and save the value of the ID parameter.

     * **Drive ID**: Using [Graph Explorer](https://developer.microsoft.com/graph/graph-explorer) - Microsoft Graph, sign with the appropriate login and make the graph call: <https://graph.microsoft.com/v1.0/sites/{site-id}/drives> with the Site ID being the value of the ID parameter you saved earlier.

     * A Json response is returned with a parameter value of type array/list of drive objects. Look through the Json for the Json object whose name parameter matches the name of your
     document library. Copy and save the value of the Drive ID parameter.

 **Create a new Bookings business for the branch (Optional)**

 This section enables creating meetings with users outside of your organization, like a customer.

 1. To leverage the **virtual visit** features within your app, we must also provide a Bookings business. To create a new Bookings business, start by going to [http://office.com/apps.](https://www.office.com/apps?auth=2)

 1. Select **Bookings** within the list of apps.

     :::image type="content" source="../assets/images/Collaboration control/bookings.png" alt-text="bookings within the list" border="true":::

 1. If this is your first-time using Bookings, you may be prompted with a **Get it now** button, select that to continue.

     :::image type="content" source="../assets/images/Collaboration control/online-scheduling.png" alt-text="Online scheduling your customers" border="true":::

 1. If you already have a Bookings business and need to create an additional one, select the chevron next to your currently active Bookings business and select **New**.

     :::image type="content" source="../assets/images/Collaboration control/inspection.png" alt-text="Select new" border="true":::

 1. Provide the name and type of your business before selecting **Continue.**

     :::image type="content" source="../assets/images/Collaboration control/selecting-continue.png" alt-text="selecting continue" border="true":::

 1. You may now provide additional details for your Bookings business by configuring the Booking page, Staff, Services, and Business Information pages by selecting them in the left navigation.

 1. Make sure the user you're going to test with is added to the Staff list, he also needs to be an admin to create/update and cancel bookings (adding admin permission to a staff member can take up to an hour to take effect).

 **Retrieve the alias of the new Bookings business**

 To get the alias of your new Bookings business, you may need to reopen the current Bookings business so that we can retrieve the value from the URL; begin by selecting the chevron and selecting **Open.**

   :::image type="content" source="../assets/images/Collaboration control/selecting-open.png" alt-text="Selecting open" border="true":::

 Once the dialog appears, re-select your new Bookings business.

   :::image type="content" source="../assets/images/Collaboration control/bookings-business.png" alt-text="choose a calendar" border="true":::

 Navigate to the **Booking Page**, select **Save and publish** and copy the link from **Share your page.**

   :::image type="content" source="../assets/images/Collaboration control/booking-page.png" alt-text="Booking page status" border="true":::

 **Provide the settings to Collaboration controls for your application**

 1. Now that we have the Channel ID, Group ID, and the optional Bookings business ID, we can set them as values within the Collaboration controls settings. To begin, open [https://make.powerapps.com/.](https://make.preview.powerapps.com/environments/839eace6-59ab-4243-97ec-a5b8fcc104e4/home)

 1. Ensure' in the correct environment by using the environment picker in the top right.

 1. Navigate to the **Solutions** page in the left navigation.

 1. Navigate to the solution you created in the previous exercise e.g. My Collaboration Manager and select it.

 1. Settings for Collaboration controls are bound to specific entities. To get started, we need to create a settings group that is related to an existing table. To get started, select New > More > Other > Settings Group.

     :::image type="content" source="../assets/images/Collaboration control/settings-group.png" alt-text="settings group" border="true":::

 1. Provide a human readable **Display name** for your settings group.

 1. For the name, copy and paste the schema name of the table you created in the previous exercise.

 1. Select **Save & Close.**

 1. Provide the first settings value by selecting New > More > Other > Settings Value from within the solution explorer.

     :::image type="content" source="../assets/images/Collaboration control/power-apps-settings-value.png" alt-text="Power apps setting value" border="true":::

 1. Group ID

 For our first settings value, we'll provide the value of our teams group.

* Paste the value you retrieved as the Teams **Group ID** in the **Value field.**
* Set **Settings Group ID** to the settings group you created previously
* Set **Settings Definition ID** to **“Group ID”.**

     :::image type="content" source="../assets/images/Collaboration control/new-settings-value.png" alt-text="new settings value" border="true":::

 1. Select **Save & Close** once' complete

 1. **[Optional - Bookings]** Repeat step 9 above to create a new settings value.

* Now populate the new settings value with the Bookings business ID you saved previously.
* Set **Settings Group ID** to the one you created previously
* Set Settings Definition ID to “Booking Business ID”

     :::image type="content" source="../assets/images/Collaboration control/new-settings.png" alt-text="new settings" border="true":::

 1. Select **Save & Close** once' complete.

 1. **[Channel ID]** Repeat step 9 above to create a new settings value.

* Now populate the new settings value with the decoded Channel ID you saved previously.

* Set **Settings Group ID** to the one you created previously

* Set **Settings Definition ID** to **"Channel ID"**.

     :::image type="content" source="../assets/images/Collaboration control/settings-value.png" alt-text="Settings value" border="true":::

1. Select Save & Close once' complete.

1. **[Files]** Repeat step 9 above to create a new settings value for **Site ID.**

* Pass the Site ID to the field labeled Value.
* Set the Settings Group ID to ‘Settings for Inspections’
* Set the Settings Definition Id to ‘Site Id’
* Select Save & Close once' complete.

1. **[Files]** Repeat step 9 above to create a new settings value for Drive ID.

* Pass the Drive ID to the field labeled **Value**.
* Set the Settings Definition Id to **'Site Id'**

> [!NOTE]
> To use **Conversations** in the personal app, you must configure the channel ID as mentioned above and the app must **first** be added to the Channel associated with the Channel ID provided.

**Congrats!** You've now configured the settings for your application.

### Add Collaboration controls to your application

Now that you've configured the Collaboration controls, you can now add collaborative capabilities to the app created.

Adding Collaboration controls Tasks, Meetings, Files, and Notes experiences.

 1. We now want to edit the Main Information form so that it includes the tasks, meetings, and notes tabs. To begin, we want to go back to the explorer & select your solution (for example: My Collaboration Manager).

 1. Select the table (for example: Inspections) you created in [Create a new model-driven app for Teams.](#create-a-new-model-driven-app-for-teams)

 1. Navigate to the Forms tab for your table.

     :::image type="content" source="../assets/images/Collaboration control/forms-tab.png" alt-text="forms tab for your table" border="true":::

 1. Select the Information form of form type “Main" to open it in the form designer.

 1. Once' in the form designer, drag in a **1-column tab** from the **Components** drawer.

     :::image type="content" source="../assets/images/Collaboration control/components.png" alt-text="Components power apps" border= "true":::

 1. After dragging in the tab, rename the tab to “Tasks” in the property pane.

 1. Now select the section within your new tab so that you can select Hide label within the property pane.

     :::image type="content" source="../assets/images/Collaboration control/hide-label.png" alt-text="Hide label" border="true":::

 1. Select the full section and select **Expand first component to full tab** in the property pane. This is required as the controls only support full tab views.

     :::image type="content" source="../assets/images/Collaboration control/expand-first-component.png" alt-text=" Expand first component to full tab" border="true":::

 1. Drag-and-drop a **Subgrid** control from the **Components** drawer into your section.

 1. In the pop up, check ‘Show related records’ and for tasks, set the values to **All Tasks** from the **Tasks (Regarding)** table.

     :::image type="content" source="../assets/images/Collaboration control/all-tasks.png" alt-text="All tasks from the tasks" border="true":::

 1. Repeat steps 5 – 10 for the Meetings, Notes, and Files tabs to create additional tabs and add the controls.

     :::image type="content" source="../assets/images/Collaboration control/new-inspection.png" alt-text="New inspections" border="true":::

     > [!NOTE]
     >
     > For Files, the Table and Default view settings aren't required so you can use same settings as Notes (image above) when you drag the subgrid.
     >
     > If' unable to find the control table in the “Select subgrid views” pop up, you may have missed step 9 of Task 1 in Exercise 2. Make sure you check the option for ‘Creating a new activity’.

     :::image type="content" source="../assets/images/Collaboration control/create-new-activity.png" alt-text="Create a new activity" border="true":::

 1. We now need to configure the custom controls for our subgrids within the classic form designer. Select **Save** and then select **Switch to classic.**

 1. Scroll down in the classic form designer until you find the **Tasks** tab. Double-click on the subgrid to open its property dialog.

     :::image type="content" source="../assets/images/Collaboration control/property-dialog.png" alt-text="Tasks tab property dialog" border="true":::

 1. While in the property dialog, select the Controls tab to view all custom controls assigned to it.

     :::image type="content" source="../assets/images/Collaboration control/select-controls.png" alt-text="Select the controls" border="true":::

 1. Select **Add Control**

 1. For the tasks tab, select **Tasks (Preview)** and then **Add.**

     :::image type="content" source="../assets/images/Collaboration control/tasks-preview.png" alt-text="add tasks preview" border="true":::

 1. Check the Web, Phone, and Tablet radio buttons for the Tasks control to ensure that it shows across all form factors.

 **For Pro Devs**

 Follow the following steps if you would like to be able to create external
 tasks:

 External (or guest) tasks are tasks that can be assigned to users who aren't part of your
 organization or  have access to your application e.g., when assigning a task to a customer.

 To enable you'll need an additional step of passing an XML string to each instance of Tasks
 PCF control attached to the sub grid component on desired MDA form. This XML string is a
 parametrized query that allows the control to extract the required data from a table that contains customer information.

* Create a new custom entity (e.g., “Customer”) or reuse an existing customer entity like
Contacts.

* Then create new fields that'll hold the following information (the names can be
different):

* Name
* Email
* Parent (Lookup to the parent table e.g., Inspections)

     > [!NOTE]
     > The customer entity created above'll be where the task control pulls the customer
information from when assigning an external task. The “Parent” field ensures that the customer
entity is linked to an Inspection record.

* You need to generate a Fetch XML file to allow the PCF control to pull the right customer
information.

Configuration XML Schema

Below is the schema definition for the tasks configuration Fetch XML. Any Fetch XML needs to be
designed to meet the following requirements:

* Query result shall return the following properties for each user object: id, displayname,
email (use ‘alias’ if needed),
* Query shall contain the “@top” parameter to allow caller to limit the number of results,
* Query shall have “@rootEntityId” parameter to filter results by only related records (if
needed),
* Query shall have “@useName” parameter to allow result filtering by name.
* Query shall have “@useIdentifier” parameter to allow fetching only selected users

Configuration XML Schema and example

This pulls data from the customer table. You can adjust the `<fetch />` node to specify your own
query to display users from any other custom table.

> [!NOTE]
> The above entity & attribute name and order attribute in the XML are in this format
"PublisherPrefix_TableColumn"

```html

 <custom-tasks>

 <custom-task id="external" name="External" for="guest">

 <fetch top="@top">

 <entity name="[Name of table, e.g. Crb2891_customer]">

 <attribute name="[Name of ID column, e.g. Crb2891_customerid]" alias="id" />

 <attribute name="[Name of primary name column, e.g. Crb2891_name]"
 alias="displayname" />

 <attribute name="[Name of email column, e.g. Crb2891_email]" alias="email" />

 <order attribute ="[Name of primary name column, e.g. Crb2891_name]"
 descending="false" />

 <filter type="and">

 <condition attribute="[Name of parent lookup column, e.g. Crb2891_parent]"
 operator="eq"

 value="@rootEntityId" />

 <condition attribute="[Name of primary name column, e.g. Crb2891_name]"
 operator="like" value="@userName" />

 <condition attribute="[Name of email column, e.g. Crb2891_email]" operator="like"
 value="@userIdentifier" />

 </filter>

 </link-entity>

 </entity>

 </fetch>

 </custom-task>

 </custom-tasks>

```

* Then repeat steps 12 – 15

* Set the properties as shown in the images below

   :::image type="content" source="../assets/images/Collaboration control/set-properties.png" alt-text="set properties" border="true":::

* Navigate to the Controls tab and click on pen symbol on Custom Tasks property to add
the Fetch XML generated above.

* Paste the Fetch XML

   :::image type="content" source="../assets/images/Collaboration control/set-properties-chart-properties.png" alt-text="Set chart properties" border="true":::

   :::image type="content" source="../assets/images/Collaboration control/custom-tasks.png" alt-text="Custom tasks" border= "true":::

* Click Ok

* Click Ok on properties window

* Save and Publish

 1. Repeat steps 12-17 for the meetings, notes, and files tabs. For meetings, use Meeting (Preview), for notes use Notes (Preview) and for files use Files (Preview).

     > [!NOTE]
     > When in Classic Designer adding the Files control, ensure that the Name field is populated with a unique name.

     :::image type="content" source="../assets/images/Collaboration control/set-the-list-chart-properties.png" alt-text="Set the list or chart properties" border="true":::

 1. Select Save.

 1. Select Publish (from within the Classic Form Designer).

 1. You can now close the Classic Form Designer and open your app in Power Apps by selecting it.  

     :::image type="content" source="../assets/images/Collaboration control/collaboration-manager-for-inspections-power-apps.png" alt-text="Collaboration manager for inspections" border="true":::

 1. Create a new record via + New and then open the record.

     :::image type="content" source="../assets/images/Collaboration control/power-apps-open-the-record.png" alt-text="Power apps open the record" border="true":::

     You should see views for each tab that appear similar to the image below.

     :::image type="content" source="../assets/images/Collaboration control/tabs.png" alt-text="Tasks" border="true":::

     > [!TIP]
     > The controls are only visible after a record is initially saved in the application. If the control tabs don't appear in your record, try to refresh your browser and/or republish the app from within Power Apps.

### Adding Collaboration controls Conversations experience

 1. Now, we want to edit the header of the Form associated with your business entities to add
Conversations experience to them. To begin, we want to go back to the explorer for your solution
and in the “Apps” Section, find the MDA (Model Driven Application) app you created previously
(e.g., Collaboration Manager for Inspections).

 1. Open [Command Designer](/power-apps/maker/model-driven-apps/command-designer-overview) (currently in Preview) by clicking ‘Edit in preview’ context menu item.

     :::image type="content" source="../assets/images/Collaboration control/edit-in-preview.png" alt-text="edit in preview" border= "true":::

 1. On the next screen, select ‘…’ on the right of your application table and select **Edit command bar (preview)**

     :::image type="content" source="../assets/images/Collaboration control/edit-command-bar.png" alt-text="Edit command bar" border="true":::

 1. Select **Main form** and **Edit**

     :::image type="content" source="../assets/images/Collaboration control/select-main-form.png" alt-text="select main form" border= "true":::

 1. Select + **New command** on Commands panel

     :::image type="content" source="../assets/images/Collaboration control/select-new-command.png" alt-text="select new command" border="true":::

     > [!NOTE]
     > If presented with this view below, select JavaScript

     :::image type="content" source="../assets/images/Collaboration control/select-java-script.png" alt-text="select java script" border="true":::

 1. Configure the command in the opened right-hand pane

    1. Label: **Conversations**

    1. Icon: **Use web resource**

     :::image type="content" source="../assets/images/Collaboration control/use-web-resource.png" alt-text="Use web resource" border="true":::

     1. Library:

     Select + **Add web resource** and in opened dialog search and add **icrosoft _TeamsChatIcon.svg** web resource:
     :::image type="content" source="../assets/images/Collaboration control/teams-chat-icon.png" alt-text="Teams chat icon" border="true":::

    1. **Action:** Set **Action** (if not set) to: **Run JavaScript**

    1. Select **Add library** and in opened dialog search and add **icrosoft _chatControl** web
     resource

     :::image type="content" source="../assets/images/Collaboration control/add-java-script.png" alt-text="Add javascript" border="true":::

     1. **Function Name:** **icrosoft _chatControl.chatControl.clickChatIcon**

     1. Click + **Add Parameter**

     1. In **Parameter 1** select **FirstPrimaryItemId**

     1. Click + **Add Parameter**

     1. In **Parameter 2** select **PrimaryEntityTypeName**

     1. Click + **Add Parameter**

 1. In Parameter 3 select **String** and for the value enter in the Name (not the Display Name) of the Primary Name Column for your table e.g., cr*****_inspections from Exercise 2, Task 1 , step 10.

     :::image type="content" source="../assets/images/Collaboration control/settings-inspection.png" alt-text="Settings for inspection" border="true":::

     1. **Visibility: 'Show'**

     1. Once entered it should look like the image below

     :::image type="content" source="../assets/images/Collaboration control/run-javascript.png" alt-text="Run javascript" border="true":::

     1. Part IV

     1. Tooltip title: **Inspections conversations**
     1. Tooltip description: **Contextual conversations on an inspection**
     1. Accessibility text: [optional]
     1. Order number: [optional]

 1. Customize the order of the commands by typing in numbers here

     1. Hide: [leave unchecked]

 1. When selected, command is hidden in app and designer experiences. This
overrides the visibility attribute

 1. Select Save and Publish to have the command created

 1. Now, when you complete Exercise 6 (Deploy to Teams) the new Conversations button will be shown.

     > [!TIP]
     >  If you experience issues setting the library value, close the browser window and restart from step 1.

     > [!NOTE]
     > Currently, custom visibility rules are not supported by the command designer (limitations), and as a result the Conversations icon button will be visible on all canvases – portal, mobile, Teams app, though it will only work in Teams and will not respond on the other canvases.

 1. **[Optional]** Now, you can replace the default badge icon :::image type="icon" source="../assets/icons/badge-icon.png" border="false":::by a custom one:

* Navigate to your solution (e.g., My Collaboration Manager) and select **New** > **More** > **Web resource**
* b. Specify a distinctive name. E.g., chatPaneBadgeItem
* Select any image resource type – ICO, PNG, …
* Upload the icon file.
* Select **Save**
* Take note of the web resource name together with automatically added prefix.
* Return to the step #6 an modify the command by adding one more **String** parameter
  pointing to just created web resource. The parameter value should follow the convention -
  **$webresource**:resourceName. So, if the resource name is icrosoft _chatPaneBadgeItem then
the parameter value will be $webresource:icrosoft_chatPaneBadgeItem

     > [!NOTE]
     > To use **Conversations** in the personal app, you must configure the channel ID (in Task 3, Step 5) and the app must **first** be added to the Channel associated with the Channel ID provided.

 **Congrats!** You've now added the Collaboration controls to your application!

## Deploy to Teams

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
