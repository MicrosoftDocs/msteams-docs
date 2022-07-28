---
title: Power Automate in collaboration control app
author: surbhigupta
description: In this article, learn about Power Automate in collaboration control app in Microsoft Teams.
ms.localizationpriority: medium
ms.author: v-npaladugu
ms.topic: conceptual
---

# Power Automate

Power Automate can be used to automate workflows around your Collaboration Manager application. For example, automatically create tasks when a new record is created.

## Enable collaboration control connector

Microsoft Power Automate, Microsoft Power Apps and Azure Logic app, developers can access Collaboration controls APIs by triggers and/or actions in automated workflows.

In this version, the connector enables, makers to set up triggers from:

1. When a Collaboration session is created
1. When a planner task is created or modified

It also includes a set of Collaboration controls Api and tasks steps that can be invoked with a flow

**How to find the connector once the AppSource package is installed**

The connector triggers/actions will be found in workflow step selections. The connector itself would be found on Custom connectors with configurable options.

**Authentication Guidance**

To use the connector in your solution, it’s necessary to create an Azure App trusted by your environment to execute the flows.

### Creating an Azure App

The Azure Active Directory management section could be found from [Azure portal](https://ms.portal.azure.com/#home) by signing in to account with enough permissions to add it (Application user) to your environment.

In the home page of Azure portal, look for Azure Active Directory and there will be an option to Add a new App Registration.

  :::image type="content" source="../assets/images/collaboration-control/azure-active-directory-home-portal.png" alt-text="Add a new App Registration":::

  :::image type="content" source="../assets/images/collaboration-control/new-app-registration.png" alt-text="Add new app registration":::

In the app registration, set your application name and add the Web redirect URI: <https://global.consent.azure-apim.net/redirect>.

  :::image type="content" source="../assets/images/collaboration-control/register-an-application.png" alt-text="Register an application":::

In the Implicit Grand/Hybrid Flows section, select both Access Tokens and ID tokens checkboxes.

  :::image type="content" source="../assets/images/collaboration-control/authorisation-endpoint-tokens.png" alt-text="Tokens and ID tokens":::

Open the left menu API Permission option and select **“Add a permission”** and look for **“Dynamic CRM”** permission.

  :::image type="content" source="../assets/images/collaboration-control/dynamic-crm.png" alt-text="Add a permission":::

Ensure to enable the checkbox **user_impersonation** after selecting the Dynamics CRM.

  :::image type="content" source="../assets/images/collaboration-control/admin-consent-required.png" alt-text="enable the checkbox user_impersonation":::

In the Certificates & Secrets page, add a new client secret and copy the value, for later use while setting up the connector security.

  :::image type="content" source="../assets/images/collaboration-control/copy-new-secret-value.png" alt-text="copy new secret value":::

In the Application Overview page, find Application (Client) ID and save it for later use while setting up the connector security.

  :::image type="content" source="../assets/images/collaboration-control/application-client-ID.png" alt-text="Save client ID":::

Now your Azure App is all set, need to add it as an application user in our environment.

Back the PowerApps interface, look for the top right settings icon and open the admin center.

  :::image type="content" source="../assets/images/collaboration-control/power-apps-interface.png" alt-text="Power apps interface":::

On the admin center, select the environment menu option and select one of the environments in the list that you want to add as the connector app.

  :::image type="content" source="../assets/images/collaboration-control/power-platform-admin-center.png" alt-text="adding connector app":::

Once the environment details are shown select settings.

  :::image type="content" source="../assets/images/collaboration-control/settings-environment.png" alt-text="select settings":::

In the settings details page, expand the Users + permissions and enter the Application users link.

  :::image type="content" source="../assets/images/collaboration-control/users-link.png" alt-text="Application user link":::

In the App users page, select the **Plus New app user** and a new right pane will appear

  :::image type="content" source="../assets/images/collaboration-control/new-app-user.png" alt-text="new app user":::

Select in **plus add an app**

  :::image type="content" source="../assets/images/collaboration-control/create-new-app-user.png" alt-text="Create new app user":::

Select your app from the search box and select add again

  :::image type="content" source="../assets/images/collaboration-control/add-app-aad.png" alt-text="add app from Azure Active Directory":::

Back to the previous, Create a new app user form, set the **Business unit** and **Security Roles** to your connector application, will be running, then select “Create” and your app will be in the list.  

With the app user set in the environment, we can proceed to custom connector configuration.

Go back to PowerApps or Power Automate and select the Custom Connectors menu. Later select the edit pencil icon for the Collaboration connector.

  :::image type="content" source="../assets/images/collaboration-control/collaboration-connector.png" alt-text="custom connector menu":::

On the General (Tab/Item) fill the host with the address of Dynamic 365 instance domain (without the https://).

  :::image type="content" source="../assets/images/collaboration-control/dynamic-365-instance.png" alt-text="Dynamic 365 instance":::

  :::image type="content" source="../assets/images/collaboration-control/general-information.png" alt-text="General information":::

On the Security tab,  
Client secret input: use your saved app secret value in the input  
Client ID: Your Azure app (Client ID)  
Resource URL:  The URL of your Dynamic 365 instance (<https://org>.crm.dynamics.com/)
Scope: Same as above with “.default” suffix (<https://org>.crm.dynamics.com/.default)

Select the update connector and this will save the changes and allow your flow to establish connections.

  :::image type="content" source="../assets/images/collaboration-control/custom-connector.png" alt-text="custom connector":::

### How to invoke the connector  

Triggers and actions are pre-defined with configurable input/output as a workflow step. Adding the step to the proper workflow position with correct input/output configuration to define when the trigger/action is to be invoked.

  :::image type="content" source="../assets/images/collaboration-control/invoke-the-connector.png" alt-text="Invoke the connector":::

**What is supported with the connector**

The following triggers and actions are supported within a flow.  

Details of their inputs are included.

1. **Triggers**
When a Collaboration Session is Created.

  :::image type="content" source="../assets/images/collaboration-control/colab-session-created-preview.png" alt-text="Collaboration session created":::

**Scope:** A scope to limit which rows can trigger the flow.
**Run as:** The running user for steps where invoker connections are used.

**When a Task is created or modified**

  :::image type="content" source="../assets/images/collaboration-control/task-created.png" alt-text="Task is created or modified":::

By default, the trigger Planner Task will be disabled and won't trigger. To enable it the following steps must be completed by the tenant admin:

* Create a support ticket  under the path Power Apps/Collaboration controls/Settings.
* Request that your environment is enabled for the Collaboration connector and provides your Environment URL (preferred) or Organization ID.  
* You can add the following sample text to your support request: “enable Environment URL: url for the Collaboration Connector.
* To open a support ticket, follow the steps at Get Help + Support - Power Platform | Microsoft Docs

1. **Actions**
Begin Collaboration Session

  :::image type="content" source="../assets/images/collaboration-control/begin-collab-session.png" alt-text="begin collaboration session":::

This step action creates a new collaboration session for your dataverse business entity.

**Application Name:** Name of the associated application, for example, could be “Collaboration Manager for Loans” or “Collaboration Manager for Closed Loan Auditing”.
**Collaboration Root Entity Name:** Type of application record (table name) for example, could be “msfi_loanapplication” for a Collaboration Manager for Loans application.
**Collaboration Root Entity ID:** ID of the associated application record, e.g.could be the ID of a Loan Application record.  

**Advanced options**

**Metadata (Advanced):** Adds metadata for a collaboration session.

* **OData Type:** This field needs to be provided if the other key/value are set and need to match exactly #Microsoft.Dynamics.CRM.m365_collaborationmetadata
* **Key:** Key associated with the metadata attribute
* **Value:** Value associated with the metadata attribute

**Retrieve Collaboration Session**

  :::image type="content" source="../assets/images/collaboration-control/retrieve-collab-session.png" alt-text="Retrieve collaboration session":::

This step action returns the collaboration session that matches the provided inputs:

**Application Name:** The application name context for the collaboration session.
**Collaboration Root Entity ID:** The business entity ID for the collaboration session.  
**Collaboration Root Entity Name:** The business entity type for the collaboration session.

  :::image type="content" source="../assets/images/collaboration-control/update-collab-session.png" alt-text="Update collaboration session":::

This step action updates an existing collaboration session:

**Collaboration Root ID:** The GUID for the target collaboration session/root record.
**Collaboration Root Entity ID:** The business entity ID that the collaboration session will refer to.
**Collaboration Root Entity Name:** The business entity type name that the collaboration session will refer to.

**Advanced options:**

* **Create Metadata (Advanced):** Adds more metadata to a collaboration session record.
* **OData Type:** This field needs to be provided if the other key/value are set and needs to match exactly #Microsoft.Dynamics.CRM.m365_collaborationmetadata.
* **Key:** Key associated with the metadata attribute.
* **Value:** Value associated with the metadata attribute.

**Update Metadata (Advanced):** Updates existing metadata on a collaboration session record.

* **OData Type:** This field needs to be provided if the other key/value are set and needs to match exactly #Microsoft.Dynamics.CRM.m365_collaborationmetadata.
* **Key:** Key associated with the metadata attribute to update.
* **Value:** Value associated with the metadata attribute.

**Delete Metadata (Advanced):** Removes any existing metadata on a collaboration session record.

* **OData Type:** This field needs to be provided if the other key/value are set and needs to match exactly #Microsoft.Dynamics.CRM.m365_collaborationmetadata.
* **Key:** Key associated with the metadata attribute to remove.

  :::image type="content" source="../assets/images/collaboration-control/associate-collab-map.png" alt-text="Associate collaboration map":::

This step action creates a mapping of an external collaboration entity (outside dataverse) with your collaboration session:

**Collaboration Root ID:** The collaboration session unique identifier to map to a collaborative entity.
**Collaboration Map External ID:** The external collaborative resource ID to map.
**Collaboration Map Entity Name:** The external collaborative entity type name to map.

**Advanced options:**

* **Metadata:** Add metadata for a collaboration map.
* **OData Type:** This field needs to be provided if the other key/value are set and needs to match exactly #Microsoft.Dynamics.CRM.m365_collaborationmetadata
* **Key:** Key associated with the metadata attribute
* **Value:** Value associated with the metadata attribute

**Associate Collaboration Map (internal)**

  :::image type="content" source="../assets/images/collaboration-control/associate-collab-map-internal.png" alt-text="Associate collaboration map internal":::

This step action creates a mapping of a collaboration entity (dataverse table) with your collaboration session. Internal are intended to create mappings between internal Dataverse entities/tables only.

**Collaboration Root ID:** The collaboration session unique identifier to map to a collaborative entity.
**Collaboration Map Entity ID:** The Dataverse collaborative entity ID to map.
**Collaboration Map Entity Name:** The Dataverse collaborative entity type name to map.

**Advanced options:**

**Metadata (Advanced)** Add metadata for a collaboration map.

**OData Type:** This field needs to be provided if the other key/value are set and needs to match exactly #Microsoft.Dynamics.CRM.m365_collaborationmetadata
**Key:** Key associated with the metadata attribute
**Value:** Value associated with the metadata attribute

**Update Collaboration Map**

  :::image type="content" source="../assets/images/collaboration-control/update-collab-map.png" alt-text="Update collaboration map":::

This step action updates an existing collaboration map.

**Collaboration Map ID:** The collaboration map unique identifier to update.
**Collaboration Map Entity ID:** The collaborative entity ID to map. This value must be empty if the external ID is Provided
**Collaboration Map Entity Name**
**Collaboration Map External ID:** The external collaborative resource ID to map. This value must be empty if the entity ID is provided.  

**Advanced options:**

**Create Metadata:** Adds more metadata to a collaboration map record.

**OData Type:** This field needs to be provided if the other key/value are set and needs to match exactly #Microsoft.Dynamics.CRM.m365_collaborationmetadata.
**Key:** Key associated with the metadata attribute.
**Value:** Value associated with the metadata attribute.

**Update Metadata:** Updates existing metadata on a collaboration map record.

* **OData Type:** This field needs to be provided if the other key/value are set and needs to match exactly #Microsoft.Dynamics.CRM.m365_collaborationmetadata
* **Key:** Key associated with the metadata attribute to update
* **Value:** Value associated with the metadata attribute

**Delete Metadata:** Removes any existing metadata on a collaboration map record.

* **OData Type:** This field needs to be provided if the other key/value are set and needs to match exactly #Microsoft.Dynamics.CRM.m365_collaborationmetadata.
* **Key:** Key associated with the metadata attribute to remove.

**Get Collaboration Metadata**

  :::image type="content" source="../assets/images/collaboration-control/get-collab-metadata.png" alt-text="get collaboration metadata":::

This step action lists all metadata matching the specified filter.
**Filter:** A filter to apply to the metadata query.  
Example retrieving all metadata related to a collaboration map entity ID  
m365_entityname eq 'm365_collaborationmap' and m365_entityid eq 'GUID'

**Create Planner Task**

  :::image type="content" source="../assets/images/collaboration-control/create-planner-task.png" alt-text="Create planner task":::

This step action creates a Graph Planner Task using Collaboration controls Planner task virtual table.

**Collaboration Root ID (Required):** Collaboration session unique identifier
**Plan ID (Required):** Plan ID that the task belongs
**Title (Required):** Title of the task
**Assignments:** A json formatted object that represents all the assignments of a Task. See. plannerAssignments resource type - Microsoft Graph v1.0 | Microsoft Docs

**Bucket ID:** Bucket ID to which the tasks belong.
**Priority:** Priority of the task. 0 and 10 (inclusive) increasing value being lower priority.

Active Checklist Item Count (Advanced): Number of checklist items with value set to false representing incomplete items.

**Advanced options:**

**Applied Categories:** A json formatter object that represents all the categories to apply for the task. See. plannerAppliedCategories resource type - Microsoft Graph v1.0 | Microsoft Docs  
**Assignee Priority:** String value hints used to order items of this type in a list view. See. docs.microsoft.com/en-us/graph/api/resources/planner-order-hint-format?view=graph-rest-1.0
**Checklist Item Count:** Number of checklist items that are present on the task.
**Completed By:** A json formatted object that represents the identity of the user that completed the task. See. docs.microsoft.com/en-us/graph/api/resources/identityset?view=graph-rest-1.0&preserve-view=true
**Conversation Thread ID:** Thread ID of the conversation on the task. This is the ID of the conversation thread object created in the group.
**Created By:** A json formatted object that represents the identity of the user that created the task. See. docs.microsoft.com/en-us/graph/api/resources/identityset?view=graph-rest-1.0
**Due Date Time:** Date and time at which the task is due. The Timestamp type represents date and time information using ISO 8601 format and is always in UTC time. For example, midnight UTC on January 1st, 2014 is 2014-01-01T00:00:00Z.
**Order Hint:** Hint used to order items of this type in a list view. The format is defined as outline here.
**Percent Complete:** Percentage of task completion (0-100)
**Preview Type:** This sets the type of preview that shows up on the task. The possible values are: automatic, noPreview, checklist, description, reference.
**Reference Count:** Number of external references that exist on the task.
**Start Date Time:** Date and time at which the task starts. The Timestamp type represents date and time information using ISO 8601 format and is always in UTC time. For example, midnight UTC on Jan 1, 2014 is 2014-01-01T00:00:00Z.

**Get Planner Task**

  :::image type="content" source="../assets/images/collaboration-control/get-planner-task.png" alt-text="Get planner task":::

This step action returns a Planner Task data using Collaboration controls Planner task virtual table

**Task ID (Required):** Task unique identifier

**Update Planner Task**

  :::image type="content" source="../assets/images/collaboration-control/update-planner-task-preview.png" alt-text="Update planner task":::

This step action updates a planner task record using Collaboration controls Planner task virtual table

**Task ID (Required):** Task unique identifier
**Assignments:** A json formatted object that represents all the assignments of a Task. See. plannerAssignments resource type - Microsoft Graph v1.0 | Microsoft Docs  
**Bucket ID:** Bucket ID to where the task belongs.  
**Planner Task Details:** Represents the additional information about a task.
**Due Date Time:** Date and time at which the task is due. The Timestamp type represents date and time information using ISO 8601 format and is always in UTC time. For example, midnight UTC on January 1, 2014 is 2014-01-01T00:00:00Z.
**Priority:** Priority of the task. 0 and 10 (inclusive) increasing value being lower priority.  
**Percent Complete:** Percentage of task completion (0-100)
**Title:** Title of the task

**Advanced options:**

**Applied Categories:** A json formatted object that represents all the categories to apply for the task. See. plannerAppliedCategories resource type - Microsoft Graph v1.0 | Microsoft Docs
**Assignee Priority:** String value hints used to order items of this type in a list view. See. docs.microsoft.com/en-us/graph/api/resources/planner-order-hint-format?view=graph-rest-1.0
**Conversation Thread ID:** Thread ID of the conversation on the task. This is the ID of the conversation thread object created in the group.
**Collaboration Root ID:** The collaboration session unique identifier.
**Order Hint:** Hint used to order items of this type in a list view. The format is defined as outline here
**Start Date Time:** Date and time at which the task starts. The Timestamp type represents date and time information using ISO 8601 format and is always in UTC time. For example, midnight UTC on January 1, 2014 is 2014-01-01T00:00:00Z.

**Example Flow Scenario**

The following are two simple examples of flows:

Getting a response from Microsoft forms, creating a collaboration session and a task associated.

  :::image type="content" source="../assets/images/collaboration-control/response-submitted.png" alt-text="New response submitted":::

Every time a collaboration session is created, capture the details and send an e-mail notification.

  :::image type="content" source="../assets/images/collaboration-control/colab-session-created-preview.png" alt-text="Collaboration session created":::

Keep in mind that multiple flows could even be triggered in this way to perform different actions, using data from the response of the Collaboration Session creation.
