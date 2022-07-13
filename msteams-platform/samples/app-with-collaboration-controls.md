---
title: Application with collaboration controls for Microsoft Teams
author: surbhigupta
description: In this article, learn how to build a model driven app and add collaboration controls to the app.
ms.localizationpriority: medium
ms.author: v-npaladugu
ms.topic: conceptual
---

# Create a new model-driven app with collaboration controls for Teams

Collaboration controls are designed for [model-driven applications](/power-apps/maker/model-driven-apps/model-driven-app-overview). The following section covers how to create a model-driven app.

## Create a model-driven application

1. Open [https://make.preview.powerapps.com.](https://make.preview.powerapps.com/)

1. Select **Solutions** in the left pane.

1. Select **New solution**, so that you can provide a home for all your future customizations.

   :::image type="content" source="../assets/images/collaboration-control/new-solution.png" alt-text="New solution" border="true":::

1. Provide the name and publisher of your new solution, this solution is going to hold your custom Collaboration Manager.

   :::image type="content" source="../assets/images/collaboration-control/collaboration-manager.png" alt-text="Collaboration manager" border="true":::

1. Select **Create**

1. After the solution has been created, it will appear in your list of solutions. Select your solution to open it.

1. Before creating your app, create a home for your data. select **New** > **Table** to get started.

1. Give your table a name. Under **Advanced options** select **Creating a new activity**.

   :::image type="content" source="../assets/images/collaboration-control/new-activity.png" alt-text="Create new activity" border="true":::

    > [!TIP]
    > Take a note of the schema name in the side pane for the settings, it would be such as cr*****_inspections

1. Select **Save**.

1. After you're done creating your table, feel free to customize it by adding extra
columns, relationships, and more (Optional).

1. Now you can create a new model-driven app by selecting **New** > **App** > **Model-driven app.**

   :::image type="content" source="../assets/images/collaboration-control/model-driven-app.png" alt-text="New model driven app" border="true":::

1. Choose new **Modern app designer (preview)** to open the new app.

   :::image type="content" source="../assets/images/collaboration-control/model-driven-app-blank.png" alt-text="new model driven app blank" border="true":::

1. Select **Create.**

1. Give your app a name and select **Create.**

   :::image type="content" source="../assets/images/collaboration-control/collaboration-manager-for-inspection.png" alt-text="Collaboration manager for inspection" border="true":::

1. Select **Add page.**

1. Select **Table based view and form.**

   :::image type="content" source="../assets/images/collaboration-control/table-based.png" alt-text="Table based view and form" border="true":::

1. Select **Next.**

1. Search and select the table you've created earlier.

   :::image type="content" source="../assets/images/collaboration-control/table-view-form-pages.png" alt-text="Table view form pages" border="true":::

1. Select **Add.**

1. Select **Publish** to save and publish your app.

1. Select **Play** to test out your new app.

Now you’ve successfully built a model-driven app.

## Add Collaboration controls to your application

To add Collaboration controls Tasks, Meetings, Files, and Notes experiences to the app created post app creation as follows:

1. To include the Tasks, Meetings, and Notes tabs you need to edit the Main Information form. To begin, go back to the explorer and select your solution.

1. Select the table you created in [Create a new model-driven app for Teams.](#create-a-new-model-driven-app-with-collaboration-controls-for-teams)

1. Go to the Forms tab for your table.

     :::image type="content" source="../assets/images/collaboration-control/forms-tab.png" alt-text="forms tab for your table" border="true":::

1. Select the Information form of form type **Main** to open it in the form designer.

1. Once you are in the form designer, press and drag in a **1-column tab** from the **Components** section.

     :::image type="content" source="../assets/images/collaboration-control/components.png" alt-text="Components power apps" border= "true":::

1. After selecting the tab, rename the tab to “Tasks” in the property pane.

1. Select the tab name to select the full section and select **Expand first component to full tab** in the Properties pane. This is required as the controls only support full tab views.

     :::image type="content" source="../assets/images/collaboration-control/expand-first-component.png" alt-text=" Expand first component to full tab" border="true":::

1. You can now run your power app in Power Apps by selecting it.

     :::image type="content" source="../assets/images/collaboration-control/collaboration-manager-for-inspections-power-apps.png" alt-text="Collaboration manager for inspections" border="true":::

1. Create a new record by selecting **+ New** and then open the record.

     :::image type="content" source="../assets/images/collaboration-control/power-apps-open-the-record.png" alt-text="Power apps open the record" border="true":::

1. Now you can see views for each tab that appear similar to the following image:

     :::image type="content" source="../assets/images/collaboration-control/tabs.png" alt-text="Tasks" border="true":::

     > [!TIP]
     > The controls are only visible after a record is saved in the application. If the control tabs don't appear in your record, try to refresh your browser or republish the app from Power Apps.

Now you’ve successfully added the Collaboration controls to your application. You can now run your application in Power Apps and launch the controls. As settings have not yet been configured, you'll not be able to create entities such as Tasks, or Meetings until settings are configured.

## Define Settings for your Collaboration

You can define settings for Collaboration controls for the business entity such as the table created in [new model-driven app](#create-a-new-model-driven-app-with-collaboration-controls-for-teams).

The settings that you can apply are as follows

|Settings|Used by|
|---|---|
|Group Id|Tasks, Internal Meetings, Approvals.|
|Bookings business Id|External meetings using Bookings |
|Site Id|SharePoint files |
|Drive Id|SharePoint files|

> [!NOTE]
> Settings are crtical to launch your app, so ensure to follow the steps as suggested. If you have issues launching and saving the controls recheck the values.

You can get the Group Id by creating a new team or use an existing team in Microsoft Teams to host your application and create settings variables.

To create a new team, see [create a team from scratch](https://support.microsoft.com/en-us/office/create-a-team-from-scratch-174adf5f-846b-4780-b765-de1a0a737e2b).

Use the following instructions to retrieve the Group ID of your Teams team for Approvals, Tasks, and internal Meetings:

1. Find your team in your teams list.

1. Select the More options **...** and **Get link** to team.

     :::image type="content" source="../assets/images/collaboration-control/get-link.png" alt-text="get link to the Team" border="true":::

1. Copy the link and record the value of `groupId` from the URL. You'll use this value at a later stage while defining the settings of your solution.

     `https://teams.microsoft.com/l/team/19%3akk_TuKhjXu92yJvg4TZ10S6rouLSCgvHIb5NOOTfRjg1%40thread.tacv2/conversations?groupId=4310f270-1aa5-4089-99f3-47eb3b4d69ad&tenantId=b699419b-e0df-47e3-9909-24076fdcf68b`

Use the following instructions to retrieve the Retrieve the SharePoint Site ID and Drive ID for Files:

1. To use the Files control, you'll need to configure to an existing SharePoint site or create a new SharePoint site. To create a new site, see [create a site](/sharepoint/create-site-collection).

1. Now retrieve the Setting Values of Site ID and Drive ID, which can be called using the details in your SharePoint site.

     1. **Site ID**: Using [Graph Explorer](https://developer.microsoft.com/graph/graph-explorer), sign in and give permissions to Directory.ReadWrite.All and User.ReadWrite.All
         :::image type="content" source="../assets/images/collaboration-control/graph-permissions.png" alt-text="Graph Explorer":::

     1. Ensure to replace hostname with your hostname and relative path to the site path and make a graph call to `https://graph.microsoft.com/v1.0/sites/{hostname}:/{relative-path-to-site}`.Following is an example:
         1. If your Site URL = <https://myhostname.sharepoint.com/sites/MySiteName>
         1. Hostname = myhostname.sharepoint.com
         1. Relative path to site = sites/MySiteName

              :::image type="content" source="../assets/images/collaboration-control/graph-call.png" alt-text="Graph call":::

            Graph call would be, `https://graph.microsoft.com/v1.0/sites/myhostname.sharepoint.com:/sites/MySiteName`.

     1. The response received is a Json object representing the Site, for example Site ID would be `abcdef.sharepoint.com,0abe7394-6fce-4dcc-9884-7eaceb48cd41,8cb86762-16cd-495e-87cb-893cfdf94054`.

     1. Save the Site ID value parameter.

     1. **Drive ID**: Using [Graph Explorer](https://developer.microsoft.com/graph/graph-explorer), sign in and make the graph call to `https://graph.microsoft.com/v1.0/sites/{site-id}/drives` with the value of Site ID that you saved earlier.

     1. A Json response is returned with a parameter value of type array or list of drive objects. Look through the Json for the Json object whose name parameter matches the name of your document library. Save the value of the Drive ID parameter.

To create meetings with users outside of your organization such as customers and to use virtual visit features within your app you would need to provide a Bookings business. For more information, see [Microsoft Bookings](/microsoft-365/bookings/bookings-overview?view=o365-worldwide).

## Adding Collaboration controls Conversations experience

 1. Now, we want to edit the header of the Form associated with your business entities to add
Conversations experience to them. To begin, we want to go back to the explorer for your solution
and in the “Apps” Section, find the MDA (Model Driven Application) app you created previously
(e.g., Collaboration Manager for Inspections).

 1. Open [Command Designer](/power-apps/maker/model-driven-apps/command-designer-overview) (currently in Preview) by clicking ‘Edit in preview’ context menu item.

     :::image type="content" source="../assets/images/collaboration-control/edit-in-preview.png" alt-text="edit in preview" border= "true":::

 1. On the next screen, select ‘…’ on the right of your application table and select **Edit command bar (preview)**

     :::image type="content" source="../assets/images/collaboration-control/edit-command-bar.png" alt-text="Edit command bar" border="true":::

 1. Select **Main form** and **Edit**

     :::image type="content" source="../assets/images/collaboration-control/select-main-form.png" alt-text="select main form" border= "true":::

 1. Select + **New command** on Commands panel

     :::image type="content" source="../assets/images/collaboration-control/select-new-command.png" alt-text="select new command" border="true":::

     > [!NOTE]
     > If presented with this view below, select JavaScript

     :::image type="content" source="../assets/images/collaboration-control/select-java-script.png" alt-text="select java script" border="true":::

 1. Configure the command in the opened right-hand pane

    1. Label: **Conversations**

    1. Icon: **Use web resource**

     :::image type="content" source="../assets/images/collaboration-control/use-web-resource.png" alt-text="Use web resource" border="true":::

     1. Library:

     Select + **Add web resource** and in opened dialog search and add **icrosoft _TeamsChatIcon.svg** web resource:
     :::image type="content" source="../assets/images/collaboration-control/teams-chat-icon.png" alt-text="Teams chat icon" border="true":::

    1. **Action:** Set **Action** (if not set) to: **Run JavaScript**

    1. Select **Add library** and in opened dialog search and add **icrosoft _chatControl** web
     resource

     :::image type="content" source="../assets/images/collaboration-control/add-java-script.png" alt-text="Add javascript" border="true":::

     1. **Function Name:** **icrosoft _chatControl.chatControl.clickChatIcon**

     1. Click + **Add Parameter**

     1. In **Parameter 1** select **FirstPrimaryItemId**

     1. Click + **Add Parameter**

     1. In **Parameter 2** select **PrimaryEntityTypeName**

     1. Click + **Add Parameter**

 1. In Parameter 3 select **String** and for the value enter in the Name (not the Display Name) of the Primary Name Column for your table e.g., cr*****_inspections from Exercise 2, Task 1 , step 10.

     :::image type="content" source="../assets/images/collaboration-control/settings-inspection.png" alt-text="Settings for inspection" border="true":::

     1. **Visibility: 'Show'**

     1. Once entered it should look like the image below

     :::image type="content" source="../assets/images/collaboration-control/run-javascript.png" alt-text="Run javascript" border="true":::

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
