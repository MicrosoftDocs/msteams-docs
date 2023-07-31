---
title: Virtual tables for Tasks, Meetings, and Files in Collaboration control app
author: surbhigupta
description: In this module, learn about Virtual tables for Tasks, Meetings, and Files in Collaboration control app in Microsoft Teams.
ms.localizationpriority: medium
ms.author: v-npaladugu
ms.topic: conceptual
ms.date: 01/11/2023
---

# Virtual tables for Tasks, Meetings, Files

A new capability with this release is a set of Virtual tables. These enable developers to interact with Graph via OData APIs.

The Collaboration controls core solution includes a set of [virtual tables](/power-apps/developer/data-platform/virtual-entities/get-started-ve), which can be used for programmatic access to the data created by the Collaboration controls.

> [!NOTE]
> Currently, Collaboration controls are available only in [public developer preview](~/resources/dev-preview/developer-preview-intro.md).

> [!TIP]
> [Virtual tables](/power-apps/developer/data-platform/virtual-entities/get-started-ve) also known as virtual entities, enable the integration of data residing in external systems by seamlessly representing that data as tables in Microsoft Dataverse, without replication of data and often without custom coding.

The external system that is used by the Collaboration controls is Microsoft Graph. There are virtual tables for group calendar events, booking appointments, planner plans or tasks and SharePoint drives, folders, and files.

This article provides samples, which demonstrate how to access the virtual tables using the Dataverse REST API to perform CRUD (Create, Read, Update, and Delete) operations.

> [!TIP]
> For more information on the Dataverse REST API, see [use the Microsoft Dataverse Web API](/power-apps/developer/data-platform/webapi/overview).

* Virtual tables use the standard Dataverse Web API, which makes it easy to use the virtual tables to populate data in your application.
* Virtual tables implement complex workflows required to support Collaboration controls and these execute within Microsoft data centers for optimum performance.  
* Virtual tables use the standard Dataverse logging and monitoring capabilities.

After you install the Collaboration controls, the virtual tables can be treated as another service to your application that can depend on.

:::image type="content" source="~/assets/images/collaboration-control/vt-overview.png" alt-text="Virtual tables overview":::

**Pre-requisites**

To follow along with this article, you'll need:

1. A Dataverse environment where the Collaboration controls have been installed.
1. A user account in the Dataverse environment, which has the **Collaboration controls User** role assigned to it.
1. A third-party tool, for example, Post man or some custom C# code that allows you to authenticate to Microsoft Dataverse instances and to compose and send Web API requests and view responses.  

> [!TIP]
> Microsoft provides information on how to configure a Postman environment that connects to your Dataverse instance and use Postman to perform operations with the Web API. See [Use Postman with Microsoft Dataverse Web API](/power-apps/developer/data-platform/webapi/use-postman-web-api).

## Virtual tables sample scenario

The scenario described in this guide uses the Planner Plan and Task virtual tables. The scenario described is the same one that the Tasks Collaboration control uses. From a user perspective the scenario shows how a Planner Plan, and several Tasks are created and associated with a specific business record. The scenario goes on to show how to retrieve the tasks associated with the business record and how to read, update, and delete a specific planner task.

The following sequence diagram explains the interaction between the client, which could be the Tasks collaboration control, the [Collaboration API](/rest/api/industry/collaboration-controls/) and the Planner Plan and Task virtual tables.

:::image type="content" source="~/assets/images/collaboration-control/vt-sequence.png" alt-text="The illustration shows the sequence diagram for virtual tables.":::

## Virtual tables basic operations

This section describes the HTTP requests and responses for each step in the sample scenario.

**Task 1: Retrieve the Group ID**

Retrieve the Group ID used in [settings for your Collaboration](~/samples/app-with-collaboration-controls.md#define-settings-for-your-collaboration).

> [!NOTE]
> The user you use to create the Plan in the subsequent tasks, must be a member of this group. If not you will get 403 Forbidden response.

**Task 2: Begin a Collaboration session**

A collaboration session is a record in the collaboration root table, which allows you to associate multiple collaborations, for example, tasks, events, appointments with a business record.

A collaboration session allows you to perform operations such as list of the calendar events associated with a business record, for example, an inspections application.

# [Request](#tab/request)

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
* `collaborationRootEntityId`:  Primary key (ID) of the specific business record

# [Response](#tab/response)

```http
    HTTP/1.1 200 OK 
```

```json
{ 
    "@odata.context": "https:// [Organization URI]/api/data/v9.0/$metadata#Microsoft.Dynamics.CRM.m365_begincollaborationsessionResponse", 
    "collaborationRootId": "72fc6b52-39d5-ec11-a7b6-0022481bfe8f" 
}
```

---

Keep track of the `collaborationRootId` as it is needed in subsequent requests.

**Task 3: Create a Planner Plan**

Create a Planner Plan and associate it with the collaboration session created above with `Group ID` and `collaborationRootId`.

# [Request](#tab/request1)

```http
    HTTP/1.1 POST https://[Organization URI]/api/data/v9.0/m365_graphplannerplans  
```

```json

{ 
    "m365_collaborationrootid": "{{collaborationRootId}}", 
    "m365_owner": "{{groupId}}", 
    "m365_title": "{{planTitle}}" 
}

```

* `collaborationRootId`: Identifies the collaboration session we want to associate this plan with, use the value from task 2

* `groupId`: Identifies the group who owns this plan, use the value from step 1

* `planTitle`: Title for the plan

# [Response](#tab/response1)

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

---

Keep track of the`m365_id` as it is needed in subsequent requests.

**Task 4: Create a Planner Task**

Create a Planner Task with `PlanId` and `collaborationRootId`. you can create several Planner Tasks and associate them with the collaboration session created earlier.

# [Request](#tab/request2)

```http
    HTTP/1.1 POST https://[Organization URI]/api/data/v9.0/m365_graphplannertasks  
```

```json
{ 
    "m365_collaborationrootid": "{{collaborationRootId}}", 
    "m365_planid": "{{planId}}", 
    "m365_title": "{{taskTitle}}", 
    "m365_duedatetime": "2022-05-04T08:00:00Z", 
    "m365_assignments": "{\"me\":{\"orderHint\":\" !\",\"@odata.type\":\"#microsoft.graph.plannerAssignment\"}}" 
} 

```

* `collaborationRootId`: Identifies the collaboration session we want to associate this plan with, use the value from task 2
* `planId`: Identifies the plan this task will be assigned to, use the value from the previous step
* `taskTitle`: Title for the task

# [Response](#tab/response2)

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

---

Keep track of the `m365_graphplannertaskid` as it is needed in subsequent requests.

> [!NOTE]
> The `m365_graphplannertaskid` is the primary key of the record in the Planner Task virtual table. All subsequent requests to the virtual table to interact with this record must use this primary key. This will be referred to as the `plannerTaskId` in subsequent steps in this document.

You should repeat this step to create multiple tasks in the plan.

**Task 5: Retrieve Associated Planner Tasks**

Retrieve Associated Planner Tasks with `collaborationRootId` associated with the collaboration session created previously.

# [Request](#tab/request3)

```http
    HTTP/1.1 GET https://[Organization URI]/api/data/v9.0/ m365_graphplannertasks?$filter=m365_collaborationrootid eq '{{collaborationRootId}}'&$select=m365_graphplannertaskid,m365_title,m365_createddatetime  
```

* `$filter`: Use the $filter system query to request records associated with the collaboration session (by specifying the ID of the collaboration root record).
* `$select`: Use the $select system query option to request specific properties.

# [Response](#tab/response3)

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

---

Keep track of the `m365_id‘s` as IDs will be needed in subsequent requests.

**Task 6: Retrieve a Planner Task**

Retrieve a Planner Task with `PlannerTaskID` to perform a Read operation on one of the planner tasks created earlier.

# [Request](#tab/request4)

```http
    HTTP/1.1 GET https://[Organization URI]/api/data/v9.0/m365_graphplannertasks({{plannerTaskId}})  
```

* `plannerTaskId`: The primary key for the planner task record is the `m365_graphplannertaskid` property.

# [Response](#tab/response4)

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

---

Keep track of the `@odata.etag` property and the`m365_graphplannertaskid` property as these will be needed to perform update or delete operations.

**Task 7: Update a Planner Task**

Update a Planner Task with `PlannerTask ID` to perform an Update operation on one of the planner tasks created in the previous step. To update a planner task, execute the following request:

# [Request](#tab/request5)

```http
    HTTP/1.1 PATCH https://[Organization URI]/api/data/v9.0/m365_graphplannertasks({{plannerTaskId}})
```

* Header: If-Match: {{@odata.etag}}

```json

{
    "m365_title": "{{$planTitle}}" 
}   

```

* `@odata.etag`: Etag for the task, you must perform a read to retrieve the most up-to-date version.

* `planTitle`: Updated title for the task

# [Response](#tab/response5)

```http
    HTTP/1.1 204 No Content 
```

---

**Task 8: Delete a Planner Task**

Delete a Planner Task with `PlannerTask ID` to perform a Delete operation on one of the planner tasks created in the previous step. To delete a planner task, execute the following request:

# [Request](#tab/request6)

```http
    HTTP/1.1 DELETE https://[Organization URI]/api/data/v9.0/m365_graphplannertasks({{plannerTaskId}})
```

* `@odata.etag`: Etag for the task, you must perform a read to retrieve the most up-to-date version.

# [Response](#tab/response6)

```http
    HTTP/1.1 204 No Content
```

---

**Task 9: Update a Planner Task details**

Update a Planner Task with `PlannerTask ID` to perform an update operation on one of the planner tasks created in the previous step.

# [Request](#tab/request7)

```http
    HTTP/1.1 PATCH https://[Organization URI]/api/data/v9.0/m365_graphplannertasks({{plannerTaskId}})
```

Header: If-Match: {{@odata.etag}}

```json

{ 

    "m365_title": "{{$planTitle}}", 
    "m365_details": "{\"@odata.etag\":\"{{details.etag}}\",\"description\":\"Updated Task Description\"}" 

}   
```

* `@odata.etag`: Etag for the task, you must perform a read to retrieve the most up to date version.
* `planTitle`: Updated title for the task.
* `@details.etag`: Etag for the task details, you must perform a read using the query $select query parameter to include the `m365_details` column to retrieve the most up to date version. This value will be included in the `m365_details` column of the response. This value isn't the same as the `@odata.etag` because in the Planner backend, the Task and its details are stored separately.

# [Response](#tab/response7)

```http
HTTP/1.1 204 No Content 
```

---

> [!NOTE]
> You can set the `If-Match` header to be '*' and then you'll not need to provide any etag values, but your changes will always overwrite the task and it’s details.

## Virtual tables authorization

Following are the authorization steps required to make HTTP requests using the Virtual tables in the Collaboration controls solution.

### Azure app registration

To acquire the correct bearer token, an app registration in Azure is required. For more information on app registrations, see [register an app](/azure/active-directory/develop/quickstart-register-app).

1. Create an app registration in the Azure portal to authenticate.
1. Browse to **Certificates & secrets**.
1. Create a new client secret.

     > [!IMPORTANT]
     > Make sure to copy the secret value and store for later use. You will not be able to access it again after leaving the current page.

1. Browse to **API Permissions**.
1. Add the **user_impersonation** delegated permission from Dynamics CRM.
1. Grant admin consent for this permission.

     :::image type="content" source="../assets/images/collaboration-control/power-automate-api-permission.png" alt-text="The screenshot is an example that shows the Power Automate API permission":::

1. Browse to **Manifest**.
1. Set the value of the following attributes to true:

   * oauth2AllowIdTokenImplicitFlow
   * oauth2AllowImplicitFlow

1. Select Save.

     :::image type="content" source="../assets/images/collaboration-control/power-automate-manifest.png" alt-text="The screenshot is an example that shows the Power Automate manifest":::

### PowerApps environment permissions

After the app registration has been set up, you must set up an application user in PowerApps environment. This will allow you to authenticate with the correct Dynamics scopes that were configured earlier.

1. Open the [Power Platform Admin Center](https://admin.powerplatform.microsoft.com/).
1. Browse to **Environments** > **Your_Environment** > **Users** > **App Users List**.
1. Select **New App User** and select your Azure app registration.
1. Select **Edit Security Roles** and assign the **System Administrator** role to the app user.

   1. The **System Administrator** role is applied to allow authentication for any users that have a lower security role. For example, **Collaboration controls User**.
   1. This can be restricted by applying a lower role to the application. For example, **Collaboration controls Administrator**.

     :::image type="content" source="../assets/images/collaboration-control/power-automate-admin-center.png" alt-text="The screenshot is an example that shows the Power automate admin center":::

### Getting the bearer token

After completion of Azure app registration and PowerApps environment permissions, send the following HTTP request to get the Bearer token.

```http
POST https://login.microsoftonline.com/<AZURE_APP_TENANT_ID>/oauth2/token
```

* **Content-Type**: application/x-www-form-urlencoded
* **client_id**: <AZURE_APP_CLIENT_ID>
* **&client_secret**: <AZURE_APP_CLIENT_ID>
* **&resource**: https://\<RESOURCEURL\>/
* **&username**: \<USERNAME\>
* **&password**: \<PASSWORD\>
* **&grant_type**: Password

> [!IMPORTANT]
> Make sure to include the trailing forward slash on the resource parameter. If not you will get an error related to Graph scopes when calling the virtual table.

From the response payload, copy the value of the **access_token** property. You can then pass this Bearer token as the part of the authorization header when making requests to the Virtual tables.

:::image type="content" source="../assets/images/collaboration-control/power-automate-authorization.png" alt-text="The screenshot is an example that shows the Power automate authorization":::

## Virtual tables error handling

Virtual tables error handling describes common error scenarios and how the virtual tables will respond.

### Attempt to create a virtual record without a Collaboration session

A valid collaboration session is required for every request to create a virtual record.  When a virtual record is created the virtual table will create a collaboration map record, which includes the virtual record primary key, entity name and the external ID that is, Graph resource ID. This collaboration map is associated with a collaboration session, and this is how the Collaboration controls will keep track of the collaborations associated with a business record.

# [Request](#tab/request8)

```http
    HTTP/1.1 POST https://[Organization URI]/api/data/v9.0/m365_graphplannertasks  
```

```json

{ 
    "m365_planid": "{{planId}}", 
    "m365_title": "{{taskTitle}}", 
    "m365_duedatetime": "2022-05-04T08:00:00Z", 
    "m365_assignments": "{\"me\":{\"orderHint\":\" !\",\"@odata.type\":\"#microsoft.graph.plannerAssignment\"}}" 
}

```

The `collaborationRootId` property is missing from the request.

# [Response](#tab/response8)

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

---

To resolve this issue, you must always provide a valid `collaborationRootId` property when creating a virtual record.

### Attempt to read a virtual record without a Collaboration map

Virtual tables allow you to execute requests, which return collections of virtual records. We saw this earlier in this document where we requested all the planner tasks associated with a specific collaboration session. It's also possible to request all the planner tasks associated with a specific planner plan by using a $filter system query like this: $filter=m365_planid eq`{{planId}}`. One issue that will happen if you use such a query is that records will be returned for planner tasks, which aren't associated with a collaboration session that is, planner tasks that were created by a means other than using a Collaboration control. If you attempt to read, update, or delete such a record the request will fail because the virtual table can't find the associated collaboration map.  

# [Request](#tab/request9)

```http
    HTTP/1.1 GET https://[Organization URI]/api/data/v9.0/m365_graphplannertasks({{plannerTaskId}})
```

The `plannerTaskId` property is associated with a planner task, which was created using the Planner web interface and so doesn't have a collaboration map record.

# [Response](#tab/response9)

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

---

To resolve this issue, you must check the error message in the response and if it's set to the message shown above this means the virtual record isn't associated. To create an association for this record, you must call [Associate Collaboration Map - REST API](/rest/api/industry/collaboration-controls/collaboration-custom-apis/associate-collaboration-map).

### Attempt to read a virtual record and the Graph resource has been deleted

Related to the previous error, you need to handle the case where a Graph resource has been deleted but the client still has a reference to the deleted virtual record. This can happen if another user deleted the record. If you attempt to read, update, or delete such a record the request will fail because the virtual table can't retrieve the resource from Graph.

# [Request](#tab/request10)

```http
    HTTP/1.1 GET https://[Organization URI]/api/data/v9.0/m365_graphplannertasks({{plannerTaskId}})
```

The `plannerTaskId` property is associated with a planner task, which was deleted.

# [Response](#tab/response10)

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

---

This case must be handled by any client code, which retrieves virtual records as another user can delete the associated Graph resource at any time.

### Attempt to update a virtual record with an invalid @odata.etag

The `@odata.etag` property is used for data concurrency and to prevent the over writing of the same record if it has been updated by another user. When, a record is read the current etag is returned, and remains valid until the record is changed. The etag should be included in any update request and will be checked before the operation completes. If the record was changed by another user since the current user read the record, then the current users update request will fail.

If you perform two updates requests using the same @odata.etag, then the second request will fail:

# [Request](#tab/request11)

```http
    HTTP/1.1 PATCH https://[Organization URI]/api/data/v9.0/m365_graphplannertasks({{plannerTaskId}})
```

Header: If-Match: {{@odata.etag}}

```json
{
    "m365_title": "{{$planTitle}}" 
}

```

# [Response](#tab/response11)

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

---

### Querying for Associated Virtual Records

In Task 5 of above, described how to Retrieve Associated Planner Tasks. This operation is supported for all of the virtual tables. When executing this request, you must include a `$filter` query, which specifies the Collaboration Root ID as shown below:

# [Request](#tab/request12)

```http
    HTTP/1.1 GET https://[Organization URI]/api/data/v9.0/ m365_graphplannertasks?$filter=m365_collaborationrootid eq '{{collaborationRootId}}'&$select=m365_graphplannertaskid,m365_title,m365_createddatetime  
```

---

* Other filtering options can't be combined with this `$filter` query and if there they'll be ignored.
* Other filtering must be performed directly on the response from the request.

### Querying for Virtual records with required key attributes

When, Dataverse Web API is called to retrieve multiple records from the following virtual tables a mandatory key attribute is required. Graph Booking Appointments requires a valid `m365_bookingbusinessid` is included in the query. If the key attribute isn't provided, then the request will fail as follows:

# [Response](#tab/response13)

```http
    HTTP/1.1 400 Bad Request 
```

```json

{ 
  "error": { 
    "code": "0x80048d0b", 
    "message": "Key attribute is missing: 'm365_bookingbusinessid'.", 
    ….
  } 
} 

```

---

To fix this problem, change the request to this format:

# [Request](#tab/request14)

```http
    HTTP/1.1 GET https://[Organization URI]/api/data/v9.0/ m365_graphbookingappointments?$filter=m365_bookingbusinessid eq '{{bookingBusinessId}}'
```

---

### Creating virtual records and Graph access control

The virtual tables honor the access control specified for Microsoft Graph. The virtual tables won't permit operations that the user couldn't perform using the Microsoft Graph API. For example, if the user you use to create the Plan is Task 3 and isn't a member of group you use then you'll get 403 Forbidden responses.

## See also

* [Integrate web apps](integrate-web-apps-overview.md)
* [App manifest schema for Teams](../resources/schema/manifest-schema.md)
* [Microsoft Graph overview](/graph/teams-concept-overview)
