---
title: Deploy app with collaboration controls in Microsoft Teams
author: surbhigupta
description: In this article, learn about deploying your app with collaboration control in Microsoft Teams.
ms.localizationpriority: medium
ms.author: v-npaladugu
ms.topic: conceptual
---

# Deploy Collaboration controls to Microsoft Teams

Collaboration controls currently work best within Microsoft Teams. You can create a new app that can be embedded inside of Teams app as both, a personal app and a tab app.

## Configure the app to look great in Microsoft Teams**

The app that you have created in [create a model-driven application](/samples/app-with-collaboration-controls.md#create-a-model-driven-application) only have a single left pane and there are no complex commands. So before adding your app into Teams, you can hide the left pane and make more comprehensible header view.

> [!NOTE]
> Do not enable the following steps if you want to display the left navigation and high-density header to your users.

To do so, we'll use Power Apps **new app** settings.

1. Go to **Solutions** in the left navigation.

1. Move through to the bottom of your solutions list and select **Default solution**.

1. Search for and select **Setting definition**.

     :::image type="content" source="../assets/images/collaboration-control/settings-defnition.png" alt-text="Setting definition" border="true":::

1. Search and select **Hide the navbar** from the list of settings definitions. This will hide the left pane in your application.

     :::image type="content" source="../assets/images/collaboration-control/hide-the-nav-bar.png" alt-text="Hide the nav bar" border="true":::

1. On the right side of your application in the edit pane, there should be a section at the bottom titled **Setting app values**. If you created your app using the modern app designer, your app should appear on the list. Select **New app value** under your app.

1. Change the value from **No** to **Yes.**

     :::image type="content" source="../assets/images/collaboration-control/value-to-yes.png" alt-text="Change value to yes" border="true":::

1. Select **Save.**

1. Search and select **App high density page header** from the list of settings definitions and repeat the process.

     :::image type="content" source="../assets/images/collaboration-control/density-page-header.png" alt-text="Density page header" border="true":::

1. Select **Back to solutions**.

     :::image type="content" source="../assets/images/collaboration-control/default-solution.png" alt-text="Default solution" border="true":::

1. Select **Publish all customizations** to publish all the work you've completed.

     :::image type="content" source="../assets/images/collaboration-control/publish-cusomization.png" alt-text="Publish all customizations" border="true":::

## Add the app to Microsoft Teams app catalog

As the settings are defined, you can now add the app to Microsoft Teams. To start with, browse to the **Apps** page in the Power Apps maker portal and find the app that you have created and select More options **…**.

To add the app to Teams, select **Add to Teams**.

:::image type="content" source="../assets/images/collaboration-control/add-to-teams.png" alt-text="Add to Teams" border="true":::

Selecting **Add to Teams** will open a dialog where you can review the details and select **Download app**. This will save the Microsoft Teams app manifest to your device.

:::image type="content" source="../assets/images/collaboration-control/colab-manager-inspection.png" alt-text="Collaboration manager inspection" border="true":::

To upload your app to Teams, see [upload your app in Team](~/concepts/deploy-and-publish/apps-upload.md)

## Enable others to use your application

The following role is required to enable users to run deployed Collaboration Manager applications built using the Collaboration controls.

* Create a Collaboration team
* Add members to the team
* Create a security role
* Assign security roles to team members

### Create a Collaboration team

1. Sign into Power Platform Admin Center
     a. Select the environment where the app is deployed <br/>
     b. Select **Settings** > **Users** + **permissions** <br/>
     c. Select **Teams** <br/>

1. Select the + Create team button on the top of the page

     a. Fill in the required fields <br/>
     b. **Team name:** Make sure this name is unique within the business unit. <br/>
     c. **Description:** Enter a description of the team. <br/>
     d. **Business unit:** Select a business unit from the dropdown list. <br/>
     e. **Administrator:** Search for the user within your organization that you want to assign as the administrator by entering characters. <br/>
     f. **Team type:** Select the team type. The following task 2 assumes you've selected ‘Owner’ from the dropdown list. The other team types (Microsoft 365 team and Microsoft Azure Active Directory team) will auto populate team members from Azure Active Directory.<br/>

     :::image type="content" source="../assets/images/collaboration-control/new-team.png" alt-text="New team" border="true":::

     1. Make a note of the team name. You'll need this later to assign this team as the owner of a record.

     1. Select **Next.**

 **Task 2: Add members to the team**

 (This isn't necessary if your team type is Azure Active Directory or Microsoft 365.)

 1. Select a team, and then select **Manage team members**

 1. To add new team members, select + **Add team members** and choose users from your organization to add.

     :::image type="content" source="../assets/images/collaboration-control/add-team-members.png" alt-text="Add Team members" border= "true":::

 1. To delete a team member, select the user and then choose Remove.

 **Task 3: Create a security role**

 1. Return to step 1b

 1. Select on Security roles

     :::image type="content" source="../assets/images/collaboration-control/users-permission.png" alt-text="Users permission" border="true":::

 1. Select on **New role** at the top left of the page

     a. A new page will now open

 1. On the **Details tab**, provide a name for your security role.

 1. Go to **Custom Entities** tab

     a. Give organization permissions (full green circle) for each of the collaboration entities:
**Collaboration Map**, **Collaboration Metadata**, **Collaboration Root**.

     :::image type="content" source="../assets/images/collaboration-control/collab-map.png" alt-text="Collaboration map" border="true":::

 1. Select **Save** and **Close**

 **Task 4: Assign Security roles**

 1. Return to step 1b.

 1. Select **Teams**, select then the team you created in step 3.

 1. Choose **Manage security roles** from the header.

     :::image type="content" source="../assets/images/collaboration-control/edit-team.png" alt-text="Edit team" border="true":::

 1. Select the roles created in Task 3.

 1. Select **Save**.

 More information on role privileges: [Configure user security in an environment - Power Platform | Microsoft Docs](/power-platform/admin/database-security)

## Optional

### Power Automate

 Power Automate can be used to automate workflows around your Collaboration Manager application. For example, automatically create tasks when a new record is created.

 This is an advanced scenario that requires Makers to build flows using [published Power Automate connectors](/connectors/connector-reference/connector-reference-powerautomate-connectors) (like the [Planner connector](/connectors/planner/)) to create flows and call Collaboration Toolkit APIs to associate the action with a record.

 To interact with the Collaboration Toolkit API in a Power Automate Flow, the recommended approach is to use the [Dataverse Connector](/connectors/commondataserviceforapps/) and [Perform an Unbound Action](/connectors/commondataserviceforapps/).

### Configure Tasks for external clients

Follow these steps if you would like to be able to create external tasks.  

External (or guest) tasks are tasks that can be assigned to users who aren't part of your organization or don't have access to your application,  e.g., when assigning a task to a customer.

To enable, you'll need an extra step of passing an XML string to each instance of Tasks PCF control attached to the sub grid component on desired MDA form. This XML string is a parametrized query that allows the control to extract the required data from a table that contains customer information.

1. Create a new custom entity (for example, “Customer”) or reuse an existing customer entity like Contacts.

1. Then create new fields that will hold the following information (the names can be different):
    1. Name
    1. Email
    1. Parent (Lookup to the parent table,  e.g., Inspections)
    > [!NOTE]
    > The customer entity created above will be where the task control pulls the customer information from when assigning an external task. The “Parent” field ensures that the customer entity is linked to an Inspection record.

1. You need to generate a Fetch XML file to allow the PCF control to pull the right customer information.

    **Configuration XML schema**

    Below is the schema definition for the tasks configuration Fetch XML. Any Fetch XML needs to be designed to meet the following requirements:

    * Query result shall return the following properties for each user object: id, displayname, email (use ‘alias’ if needed)
    * Query shall contain the “@top” parameter to allow caller to limit the number of results
    * Query shall have “@rootEntityId” parameter to filter results by only related records (if needed)
    * Query shall have “@useName” parameter to allow result filtering by name.
    * Query shall have “@useIdentifier” parameter to allow fetching only selected users

    **Configuration XML schema and example**

    This pulls data from the customer table. You can adjust the `<fetch/>` node to specify your own query to display users from any other custom table.

    > [!NOTE]
    > The above entity & attribute name and order attribute in the XML are in this format “PublisherPrefix_TableColumn”.

    ```html
    <custom-tasks> 
    <custom-task id="external" name="External" for="guest"> 
    <fetch top="@top"> 
    <entity name="[Name of table, e.g. Crb2891_customer]"> 
    <attribute name="[Name of ID column, e.g. Crb2891_customerid]" alias="id" /> 
    <attribute name="[Name of primary name column, e.g. Crb2891_name]" alias="displayname" /> 
    <attribute name="[Name of email column, e.g. Crb2891_email]" alias="email" /> 
    <order attribute ="[Name of primary name column, e.g. Crb2891_name]" descending="false" /> 
    <filter type="and"> 
    <condition attribute="[Name of parent lookup column, e.g. Crb2891_parent]" operator="eq" value="@rootEntityId" />
    <condition attribute="[Name of primary name column, e.g. Crb2891_name]" operator="like" value="@userName" />
    <condition attribute="[Name of email column, e.g. Crb2891_email]" operator="like" value="@userIdentifier" /> 
    </filter> 
    </link-entity> 
    </entity> 
    </fetch> 
    </custom-task> 
    </custom-tasks> 
    ```

1. We now need to bind the Task controls to the subgrid within the classic form designer. Select Save and then select Switch to classic.
1. Scroll down in the classic form designer until you find the Tasks tab. Double-click on the subgrid to open its property dialog.
1. While in the property dialog, Set the properties as shown in the images below
1. Navigate to the Controls tab and select on pen symbol on Custom Tasks property to add the Fetch XML generated above.
1. Paste the Fetch XML  
1. Select Ok
1. Select Ok on properties window
1. Save and Publish

### Virtual Tables for Tasks, Meetings, Files

A new capability with this release is a set of Virtual Tables. These enable developers to interact with Graph via OData APIs.

**Overview**

The Collaboration Controls Core solution includes a set of virtual tables, which can be used for programmatic access to the data created by the Collaboration controls.

> [!TIP]
> Virtual tables (also known as virtual entities) enable the integration of data residing in external systems by seamlessly representing that data as tables in Microsoft Dataverse, without replication of data and often without custom coding.

The external system used by the Collaboration controls is Microsoft Graph and there are virtual tables for group calendar events, booking appointments, planner plans/tasks and SharePoint drives/folders/files.

This guide provides samples, which demonstrate how to access the virtual tables using the Dataverse REST API to perform CRUD (Create, Read, Update and Delete) operations.

> [!TIP]
> For more information on the Dataverse REST API go to Use the Microsoft Dataverse Web API (Dataverse) - Power Apps | Microsoft Docs.

**Why use Virtual Tables?**

The virtual tables make the developer's job easier.

We use them to simplify the development of the Collaboration controls and we're making them available for customers to use.

* Virtual tables use the standard Dataverse Web API, which makes it easy to use the virtual tables to populate data in your application.
* Our virtual tables implement complex workflows required to support our Collaboration controls and these execute within Microsoft data centers for optimum performance.  
* The virtual tables use the standard Dataverse logging and monitoring capabilities.

Once you install the Collaboration controls, the virtual tables can be treated as another service your applications can depend on.

**Pre-requisites**

To follow along with this guide, you'll need:

1. A Dataverse environment where the Collaboration controls have been installed.
1. A user account in the Dataverse environment, which has the “Collaboration controls User” role assigned to it.
1. A third-party tool, e.g.,  Postman or some custom C# code, that allows you to authenticate to Microsoft Dataverse instances and to compose and send Web API requests and view responses.  

> [!TIP]
> Microsoft provides information on how to configure a Postman environment that connects to your Dataverse instance and use Postman to perform operations with the Web API. See Use Postman with Microsoft Dataverse Web API (Developer Guide for Dataverse) - Power Apps | Microsoft Docs.

**Virtual Tables Sample Scenario**

The scenario described in this guide uses the Planner Plan and Task virtual tables. The scenario described is the same one that the Tasks Collaboration control uses. From a user perspective the scenario shows how a Planner Plan, and several Tasks are created and associated with a specific business record. The scenario goes on to show how to retrieve the tasks associated with the business record and how to read, update and delete a specific planner task.

The sequence diagram below shows the interaction between the client (which could be the Tasks collaboration control), the Collaboration API and the Planner Plan and Task virtual tables.

**Virtual Tables Basic Operations**

This section describes the HTTP requests and responses for each step in the sample scenario.

**Task 1: Retrieve the Group ID used in Exercise 4**

**Task 2: Begin a Collaboration Session**

This step creates a collaboration session, which will be used in the following steps. A collaboration session is a record in the collaboration root table, which allows us to associate multiple collaborations,  e.g., tasks, events, appointments, etc. with a business record. This allows us to perform operations such as list of the calendar events associated with a business record for example, an inspections application.

**Request**

```http
HTTP/1.1 POST https://[Organization URI]/api/data/v9.0/m365_begincollaborationsession  
```

```json
{ 

"applicationName": "{{applicationName}}", 
"collaborationRootEntityId": "{{collaborationRootEntityId}}", 
"collaborationRootEntityName": "{{entityName}}" 

} 
```

* `applicationName`: Unique name for the application
* `collaborationRootEntityName`: Name of the business record entity  
* `collaborationRootEntityId`:  Primary key (id) of the specific business record

**Response**

```http
HTTP/1.1 200 OK 
```

```json
{ 

    "@odata.context": "https:// [Organization URI]/api/data/v9.0/$metadata#Microsoft.Dynamics.CRM.m365_begincollaborationsessionResponse", 

    "collaborationRootId": "72fc6b52-39d5-ec11-a7b6-0022481bfe8f" 

} 
```

Keep track of the `collaborationRootId` as it will be needed in subsequent requests.

**Task 3: Create a Planner Plan**

This step creates a Planner Plan and associates it with the collaboration session created in the previous step.

Prereq: Group ID, Collab Root ID

**Request**

```http

HTTP/1.1 POST https://[Organization URI]/api/data/v9.0/m365_graphplannerplans  

```

Content-Type: application/json

```json

{ 

    "m365_collaborationrootid": "{{collaborationRootId}}", 

    "m365_owner": "{{groupId}}", 

     "m365_title": "{{planTitle}}" 

}   

```

**collaborationRootId**: Identifies the collaboration session we want to associate this plan with, use the value from step 2

**groupId**: Identifies the group who will own this plan, use the value from step 1

**planTitle**: Title for the plan

**Response**

```http

HTTP/1.1 201 Created 

```

```json

{ 

    "@odata.context": "https:// [Organization URI]/api/data/v9.0/$metadata#m365_graphplannerplans/$entity", 

    "@odata.etag": "W/\"JzEtUGxhbiAgQEBAQEBAQEBAQEBAQEBARCc=\"", 

    "m365_createdby": "{\"user\":{\"displayName\":null,\"email\":null,\"id\":\"be330617-0e2b-48e9-8bf7-429a09c78e65\"},\"group\":null}", 

    "m365_createddatetime": "2022-05-16T16:58:33.1833561Z", 

    "m365_owner": "03614cef-8f5b-4265-9944-080d013c55d6", 

    "m365_title": "Multi-byte plan", 

    "m365_id": "8I6fu1kNS0elsbTxd67bi2UADnJu", 

    "m365_collaborationrootid": "72fc6b52-39d5-ec11-a7b6-0022481bfe8f", 

    "m365_graphplannerplanid": "5c9c3ecf-f157-0f67-dcd9-733a77ad593e", 

    "m365_details": null 

} 

```

Keep track of the`m365_id` as it will be needed in subsequent requests.

**Task 4: Create a Planner Task**

This step can be repeated to create several Planner Tasks and associate them with the collaboration session created earlier.

Prereq: Plan ID, Collab Root ID  

**Request**

```http
HTTP/1.1 POST https://[Organization URI]/api/data/v9.0/m365_graphplannertasks  
```

Content-Type: application/json

```json
{ 

    "m365_collaborationrootid": "{{collaborationRootId}}", 

    "m365_planid": "{{planId}}", 

    "m365_title": "{{taskTitle}}", 

    "m365_duedatetime": "2022-05-04T08:00:00Z", 

    "m365_assignments": "{\"me\":{\"orderHint\":\" !\",\"@odata.type\":\"#microsoft.graph.plannerAssignment\"}}" 

}   

```

**collaborationRootId**: Identifies the collaboration session we want to associate this plan with, us the value from step 2

**planId**: Identifies the plan this task will be assigned to, use the value from the previous step

**taskTitle**: Title for the task

**Response**

```http
HTTP/1.1 201 Created 
```

```json

{ 

    "@odata.context": "https://mwtmarkwallaceunmanaged.crm10.dynamics.com/api/data/v9.0/$metadata#m365_graphplannertasks/$entity", 

    "@odata.etag": "W/\"JzEtVGFzayAgQEBAQEBAQEBAQEBAQEBARCc=\"", 

    "m365_activechecklistitemcount": 0, 

    "m365_appliedcategories": "{}", 

    "m365_assigneepriority": "8585488865579062167", 

    "m365_assignments": "{\"be330617-0e2b-48e9-8bf7-429a09c78e65\":{\"assignedBy\":{\"user\":{\"displayName\":null,\"email\":null,\"id\":\"be330617-0e2b-48e9-8bf7-429a09c78e65\"},\"group\":null},\"assignedDateTime\":\"2022-05-16T16:58:47.571364+00:00\",\"orderHint\":\"8585488866179218449P`\",\"@odata.type\":\"#microsoft.graph.plannerAssignment\"}}", 

    "m365_checklistitemcount": 0, 

    "m365_createdby": "{\"user\":{\"displayName\":null,\"email\":null,\"id\":\"be330617-0e2b-48e9-8bf7-429a09c78e65\"},\"group\":null}", 

    "m365_createddatetime": "2022-05-16T16:58:47Z", 

    "m365_duedatetime": "2022-05-04T08:00:00Z", 

    "m365_hasdescription": false, 

    "m365_orderhint": "8585488865579062167", 

    "m365_percentcomplete": 0, 

    "m365_priority": 5, 

    "m365_planid": "8I6fu1kNS0elsbTxd67bi2UADnJu", 

    "m365_previewtype": "automatic", 

    "m365_referencecount": 0, 

    "m365_title": "Team-oriented discrete time-frame", 

    "m365_id": "8WSKWaEqAU-aZV4h9VUn0GUALXbH", 

    "m365_collaborationrootid": "72fc6b52-39d5-ec11-a7b6-0022481bfe8f", 

    "m365_graphplannertaskid": "0a2115b9-8b03-90ee-b450-42005d906ce8", 

    "m365_completedby": null, 

    "m365_details": null, 

    "m365_completeddatetime": null, 

    "m365_conversationthreadid": null, 

    "m365_bucketid": null, 

    "m365_startdatetime": null 

} 

```

Keep track of the m365_graphplannertaskid as it will be needed in subsequent requests.

> [!NOTE]
> The m365_graphplannertaskid is the primary key of the record in the Planner Task virtual table. All subsequent requests to the virtual table to interact with this record must use this primary key. This will be referred to as the plannerTaskId in subsequent steps in this document.

You should repeat this step to create multiple tasks in the plan.

**Task 5: Retrieve Associated Planner Tasks**

This step retrieves all the planner tasks associated with the collaboration session created previously.

Prereq: Collaboration Root ID  

**Request**

```http

HTTP/1.1 GET https://[Organization URI]/api/data/v9.0/ m365_graphplannertasks?$filter=m365_collaborationrootid eq '{{collaborationRootId}}'&$select=m365_graphplannertaskid,m365_title,m365_createddatetime  

```

**$filter**: Use the $filter system query to request records associated with the collaboration session (by specifying the id of the collaboration root record).
**$select**: Use the $select system query option to request specific properties.

**Response**

```http
HTTP/1.1 200 OK 
```

```json

{ 

    "@odata.context": "https://mwtmarkwallaceunmanaged.crm10.dynamics.com/api/data/v9.0/$metadata#m365_graphplannertasks(m365_graphplannertaskid,m365_title,m365_createddatetime)", 

    "value": [ 

        { 

            "@odata.etag": "W/\"JzEtVGFzayAgQEBAQEBAQEBAQEBAQEBARCc=\"", 

            "m365_graphplannertaskid": "8537731e-9414-1091-8d7d-ce5b74fc2477", 

            "m365_title": "Diverse executive core", 

            "m365_createddatetime": "2022-05-16T16:58:45Z", 

            "m365_id": "N_A2qmo3j0uvZZY1yd6V_GUADDEg", 

            "m365_collaborationrootid": "72fc6b52-39d5-ec11-a7b6-0022481bfe8f" 

        }, 

        { 

            "@odata.etag": "W/\"JzEtVGFzayAgQEBAQEBAQEBAQEBAQEBARCc=\"", 

            "m365_graphplannertaskid": "4a89895a-050e-9165-a6e4-19c3850f22ec", 

            "m365_title": "Cloned didactic open architecture", 

            "m365_createddatetime": "2022-05-16T16:58:41Z", 

            "m365_id": "--U0zbgsO0us084C0yCyEWUALbWw", 

            "m365_collaborationrootid": "72fc6b52-39d5-ec11-a7b6-0022481bfe8f" 

        }, 

        { 

            "@odata.etag": "W/\"JzEtVGFzayAgQEBAQEBAQEBAQEBAQEBARCc=\"", 

            "m365_graphplannertaskid": "20a08b8c-394b-b3fb-f9d1-47496df7a67b", 

            "m365_title": "Synergized zero defect interface", 

            "m365_createddatetime": "2022-05-16T16:58:43Z", 

            "m365_id": "AMn3RtbmV0m6cvkp5HKDCWUAKI0_", 

            "m365_collaborationrootid": "72fc6b52-39d5-ec11-a7b6-0022481bfe8f" 

        } 

    ] 

} 

```

Keep track of the `m365_id‘s` as these will be needed in subsequent requests.

**Task 6: Retrieve a Planner Task**

This step performs a Read operation on one of the planner tasks created in a previous step.

Prereq: Planner Task ID

To read a planner task, execute the following request:

**Request**

```http
HTTP/1.1 GET https://[Organization URI]/api/data/v9.0/m365_graphplannertasks({{plannerTaskId}})  

```

**plannerTaskId**: The primary key for the planner task record that is, the m365_graphplannertaskid property.

**Response**

```http

HTTP/1.1 200 OK 

```

```json
{ 

    "@odata.context": "https://mwtmarkwallaceunmanaged.crm10.dynamics.com/api/data/v9.0/$metadata#m365_graphplannertasks/$entity", 

    "@odata.etag": "W/\"JzEtVGFzayAgQEBAQEBAQEBAQEBAQEBARCc=\"", 

    "m365_activechecklistitemcount": 0, 

    "m365_appliedcategories": "{}", 

    "m365_assigneepriority": "8585488204334528131", 

    "m365_assignments": "{\"be330617-0e2b-48e9-8bf7-429a09c78e65\":{\"assignedBy\":{\"user\":{\"displayName\":null,\"email\":null,\"id\":\"be330617-0e2b-48e9-8bf7-429a09c78e65\"},\"group\":null},\"assignedDateTime\":\"2022-05-17T11:20:52.0247676+00:00\",\"orderHint\":\"8585488204934840644P2\",\"@odata.type\":\"#microsoft.graph.plannerAssignment\"}}", 

    "m365_checklistitemcount": 0, 

    "m365_createdby": "{\"user\":{\"displayName\":null,\"email\":null,\"id\":\"be330617-0e2b-48e9-8bf7-429a09c78e65\"},\"group\":null}", 

    "m365_createddatetime": "2022-05-17T11:20:52Z", 

    "m365_duedatetime": "2022-05-04T08:00:00Z", 

    "m365_orderhint": "8585488204334528131", 

    "m365_percentcomplete": 0, 

    "m365_priority": 5, 

    "m365_planid": "8I6fu1kNS0elsbTxd67bi2UADnJu", 

    "m365_previewtype": "automatic", 

    "m365_referencecount": 0, 

    "m365_title": "Secured content-based customer loyalty", 

    "m365_id": "SXmz1hxiOk-E3MKJUyhj0mUABvix", 

    "m365_details": "{\"@odata.context\":\"https://graph.microsoft.com/beta/$metadata#planner/tasks('SXmz1hxiOk-E3MKJUyhj0mUABvix')/details/$entity\",\"@odata.etag\":\"W/\\\"JzEtVGFza0RldGFpbHMgQEBAQEBAQEBAQEBAQEBARCc=\\\"\",\"description\":null,\"previewType\":\"automatic\",\"id\":\"SXmz1hxiOk-E3MKJUyhj0mUABvix\",\"references\":{},\"checklist\":{}}", 

    "m365_graphplannertaskid": "1b326015-bb43-945c-85bc-9b2a4ed16c73", 

    "m365_completedby": null, 

    "m365_hasdescription": null, 

    "m365_collaborationrootid": null, 

    "m365_completeddatetime": null, 

    "m365_conversationthreadid": null, 

    "m365_bucketid": null, 

    "m365_startdatetime": null 

} 

```

Keep track of the `@odata.etag` property and the`m365_graphplannertaskid` property as these will be needed to perform update or delete operations.

**Task 7: Update a Planner Task**

This step performs an Update operation on one of the planner tasks created in a previous step.

Prereq: Planner Task ID

To update a planner task, execute the following request:

**Request**

```http

HTTP/1.1 PATCH https://[Organization URI]/api/data/v9.0/m365_graphplannertasks({{plannerTaskId}})  

```

Content-Type: application/json

Header: If-Match: {{@odata.etag}}

```json

{ 

    "m365_title": "{{$planTitle}}" 

}   

```

**@odata.etag**: Etag for the task, you must perform a read to retrieve the most up-to-date version.

**planTitle**: Updated title for the task

**Response**

```http

HTTP/1.1 204 No Content 

```

**Task 8: Delete a Planner Task**

This step performs a Delete operation on one of the planner tasks created in a previous step.

Prereq: Planner Task ID

To delete a planner task, execute the following request:

**Request**

```http

HTTP/1.1 DELETE https://[Organization URI]/api/data/v9.0/m365_graphplannertasks({{plannerTaskId}})  

```

**@odata.etag**: Etag for the task, you must perform a read to retrieve the most up-to-date version.

**Response**

```http
HTTP/1.1 204 No Content
```

#### Virtual Tables Error Handling

This section describes common error scenarios and how the virtual tables will respond.

Attempt to create a virtual record without a collaboration session

A valid collaboration session is required for every request to create a virtual record.  When a virtual record is created the virtual table will create a collaboration map record, which includes the virtual record primary key, entity name and the external id i.e., Graph resource id. This collaboration map is associated with a collaboration session, and this is how the Collaboration controls will keep track of the collaborations associated with a business record.

**Request**

```http
HTTP/1.1 POST https://[Organization URI]/api/data/v9.0/m365_graphplannertasks  
```

Content-Type: application/json

```json

{ 

    "m365_planid": "{{planId}}", 

    "m365_title": "{{taskTitle}}", 

    "m365_duedatetime": "2022-05-04T08:00:00Z", 

    "m365_assignments": "{\"me\":{\"orderHint\":\" !\",\"@odata.type\":\"#microsoft.graph.plannerAssignment\"}}" 

}   

```

The collaborationRootId property is missing from the request.

**Response**

```http
HTTP/1.1 400 Bad Request 
```

```json

{ 

    "error": { 

        "code": "0x80048d0b", 

        "message": "Parameter 'm365_collaborationrootid' is null, empty, or white-space." 

    } 

} 

```

To resolve this issue, you must always provide a valid `collaborationRootId` property when creating a virtual record.

#### Attempt to read a virtual record without a collaboration map

Virtual tables allow you to execute requests which return collections of virtual records. We saw this earlier in this document where we requested all the planner tasks associated with a specific collaboration session. It's also possible to request all the planner tasks associated with a specific planner plan by using a $filter system query like this: $filter=m365_planid eq '{{planId}}'. One issue that will happen if you use such a query is that records will be returned for planner tasks, which aren't associated with a collaboration session that is, planner tasks that were created by a means other than using a Collaboration control. If you attempt to read, update, or delete such a record the request will fail because the virtual table can't find the associated collaboration map.  

**Request**

```http
HTTP/1.1 GET https://[Organization URI]/api/data/v9.0/m365_graphplannertasks({{plannerTaskId}})
```

The `plannerTaskId` property is associated with a planner task, which was created using the Planner web interface and so doesn't have a collaboration map record.

**Response**

```http
HTTP/1.1 404 Not Found 
```

```json
{ 

    "error": { 

        "code": "0x80048d02", 

        "message": "A record with the specified key values does not exist in m365_collaborationmap entity" 

    } 

} 
```

To resolve this issue, you must check the error message in the response and if it's set to the message shown above this means the virtual record isn't associated. To create an association for this record, you must call Collaboration - Custom APIs - Associate Collaboration Map - REST API (Collaboration Toolkit) | Microsoft Docs.

#### Attempt to read a virtual record and the Graph resource has been deleted

Related to the previous error, you need to handle the case where a Graph resource has been deleted but the client still has a reference to the deleted virtual record. This can happen if another user deleted the record. If you attempt to read, update, or delete such a record the request will fail because the virtual table can't retrieve the resource from Graph.  

**Request**

```http
HTTP/1.1 GET https://[Organization URI]/api/data/v9.0/m365_graphplannertasks({{plannerTaskId}})
```

The plannerTaskId property is associated with a planner task which was deleted.

**Response**

```http
HTTP/1.1 404 Not Found 
```

```json
{ 

    "error": { 

        "code": "0x80048d02", 

        "message": "REST call failed because: Reason - NotFound, Full error - {\"error\":{\"code\":\"\",\"message\":\"The requested item is not found.\",\"innerError\":{\"date\":\"2022-05-17T16:30:51\",\"request-id\":\"b692a31a-312d-490c-8dce-d258459a0211\",\"client-request-id\":\"b692a31a-312d-490c-8dce-d258459a0211\"}}}." 

    } 

} 
```

This case must be handled by any client code, which retrieves virtual records as another user can delete the associated Graph resource at any time.

#### Attempt to update a virtual record with an invalid @odata.etag

The `@odata.etag` property is used for data concurrency and to prevent the over writing of the same record if it has been updated by another user. When a record is read the current etag is returned and remains valid until the record is changed. The etag should be included in any update request and will be checked before the operation completes. If the record was changed by another user since the current user read the record, then the current users update request will fail.

If you perform two update requests using the same @odata.etag then the second request will fail:

**Request**

```http
HTTP/1.1 PATCH https://[Organization URI]/api/data/v9.0/m365_graphplannertasks({{plannerTaskId}})
```

Content-Type: application/json

Header: If-Match: {{@odata.etag}}

```json
{ 

    "m365_title": "{{$planTitle}}" 
}

```

**Response**

```http
HTTP/1.1 409 Conflict 
```

```json
{ 

    "error": { 

        "code": "0x80048d08", 

        "message": "REST call failed because: Reason - Conflict, Full error - {\"error\":{\"code\":\"\",\"message\":\"The attempted changes conflicted with already accepted changes. Read the latest state and resolve differences.\",\"innerError\":{\"date\":\"2022-05-18T06:54:55\",\"request-id\":\"dc6cd2b7-1509-4e81-91ff-22cf35b86e18\",\"client-request-id\":\"dc6cd2b7-1509-4e81-91ff-22cf35b86e18\"}}}." 

    }

} 
```

## Limitations and known issues

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

## Error Logging & Support

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

 **Support**

 If you need to log support issues, go to <https://aka.ms/CollaborationToolkitFeedback> and provide the requested information.

 How to collect this type of information in your Power App environment

 |**Area**| **How to** |
 |---|---|
 | Session details | Select Edit in Preview, Select the settings icon and ‘Session Details’ and select ‘Copy details’ |
 | Browser language | Get your language(s) from your browser settings. |
 | Region | Determine your region from your Operating System settings. |
