---
title: Application with collaboration controls for Microsoft Teams
author: surbhigupta
description: The solutions that make up Collaboration Controls allow makers to build applications that integrate with Microsoft 365 services like Planner, Bookings, and Outlook.
ms.localizationpriority: medium
ms.author: v-npaladugu
ms.topic: conceptual
---

# Create a new model-driven app with collaboration controls for Teams

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

## Configure Collaboration controls for your application

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

## Add Collaboration controls to your application

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

## Adding Collaboration controls Conversations experience

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
