---
title: Power Automate in collaboration control app
author: surbhigupta
description: In this module, learn about Power Automate in collaboration control app in Microsoft Teams and how to create an Azure app.
ms.localizationpriority: medium
ms.author: v-npaladugu
ms.topic: conceptual
---

# Power Automate

Power Automate can be used to automate workflows around your Collaboration Manager application. For example, automatically create tasks when a new record is created.

## Overview

**What the Collaboration control connector enables developers to do**

Microsoft Power Automate, Microsoft Power Apps and Azure Logic app developers can access Collaboration controls APIs by triggers or actions in automated workflows.

In this version, the connector enables, makers to set up triggers from:

1. When a Collaboration session is created
1. When a planner task is created or modified

It also includes a set of Collaboration controls Api and tasks steps that can be invoked with a flow

**How to find the connector once the AppSource package is installed**

The connector actions will be found in workflow step selections. The connector itself would be found on Custom connectors with configurable options.

**Authentication Guidance**

To use the connector in your solution, it’s necessary to create an Azure App trusted by your environment to execute the flows.

## Create an Azure App

In the [Azure portal](https://ms.portal.azure.com/#home) for Azure Active Directory management, sign in to your account with adequate permissions to add an user application to your environment with the following steps:

1. In the home page of Azure portal, select **Azure Active Directory**. In Azure Active Directory select dropdown for **Add** and select **App registration**.

  :::image type="content" source="../assets/images/collaboration-control/azure-active-directory-home-portal.png" alt-text="Add a new App Registration":::

  :::image type="content" source="../assets/images/collaboration-control/new-app-registration.png" alt-text="Add new app registration":::

1. In the app registration, set your application name and add the Web redirect URI to `https://global.consent.azure-apim.net/redirect`.

  :::image type="content" source="../assets/images/collaboration-control/register-an-application.png" alt-text="Register an application":::

1. In the Implicit Grant and hybrid flows section, select both Access Tokens and ID tokens.

  :::image type="content" source="../assets/images/collaboration-control/authorisation-endpoint-tokens.png" alt-text="Tokens and ID tokens":::

1. Select API Permission in the left pane and select **Add a permission** and search for **Dynamic CRM** permission.

  :::image type="content" source="../assets/images/collaboration-control/dynamic-crm.png" alt-text="Add a permission":::

1. Ensure to select **user_impersonation** in Permissions after selecting the Dynamics CRM.

  :::image type="content" source="../assets/images/collaboration-control/admin-consent-required.png" alt-text="enable the checkbox user_impersonation":::

1. In the Certificates & Secrets page, add a **New client secret** and copy the value, for later use while setting up the connector security.

  :::image type="content" source="../assets/images/collaboration-control/copy-new-secret-value.png" alt-text="copy new secret value":::

1. In the Application Overview page, copy the **Application (Client) ID** and save it for later use while setting up the connector security.

  :::image type="content" source="../assets/images/collaboration-control/application-client-ID.png" alt-text="Save client ID":::

Now your Azure App is all set and you need to add it as an user application in your environment.

## Add Azure app to Power Automate environment

1. Open Power Apps portal, in the top right corner select **settings** and open **admin center**.

  :::image type="content" source="../assets/images/collaboration-control/power-apps-interface.png" alt-text="Power apps interface":::

1. In the admin center, select **Environment** from the left pane and select your environment in the list that you want to add the connector app.

  :::image type="content" source="../assets/images/collaboration-control/power-platform-admin-center.png" alt-text="adding connector app":::

1. In the environment details page, select settings.

  :::image type="content" source="../assets/images/collaboration-control/settings-environment.png" alt-text="select settings":::

1. In the settings details page, select **Users + permissions** section and select **Application users**.

  :::image type="content" source="../assets/images/collaboration-control/users-link.png" alt-text="Application user link":::

1. In the App users page, select the **+ New app user**. **Create a new app user** window appears.

  :::image type="content" source="../assets/images/collaboration-control/new-app-user.png" alt-text="new app user":::

1. Select **+ Add an app**.

  :::image type="content" source="../assets/images/collaboration-control/create-new-app-user.png" alt-text="Create new app user":::

1. Select your app from the search box and select add again.

  :::image type="content" source="../assets/images/collaboration-control/add-app-aad.png" alt-text="add app from Azure Active Directory":::

After the app is added, set the **Business unit** and **Security Roles** to your connector application. Select **Create** and your app will be in the list. With the app user set in the environment, we can proceed to custom connector configuration.

## Custom connector configuration

1. Open PowerApps or Power Automate and select the **Custom Connectors** menu. Select **edit** for the Collaboration connector.

  :::image type="content" source="../assets/images/collaboration-control/collaboration-connector.png" alt-text="custom connector menu":::

1. In the General Information tab, enter the host with the address of Dynamic 365 instance domain (without the https://).

  :::image type="content" source="../assets/images/collaboration-control/general-information.png" alt-text="General information":::

1. In the Security tab, enter the following inputs:

   * Client secret: Use your saved app secret value in the input.
   * Client ID: Your Azure app (Client ID).
   * Resource URL:  The URL of your Dynamic 365 instance (<https://org>.crm.dynamics.com/).
   * Scope: Same as above with .default suffix (<https://org>.crm.dynamics.com/.default).

  :::image type="content" source="../assets/images/collaboration-control/dynamic-365-instance.png" alt-text="Dynamic 365 instance":::

1. Select **Update connector** to save the changes and allow your flow to establish connections.

  :::image type="content" source="../assets/images/collaboration-control/custom-connector.png" alt-text="custom connector":::

## How to invoke the connector  

Triggers and actions are pre-defined with configurable input/output as a workflow step. Adding the workflow step to the proper workflow position with correct input/output configuration to define when the trigger or action is to be invoked.

  :::image type="content" source="../assets/images/collaboration-control/invoke-the-connector.png" alt-text="Invoke the connector":::

### Triggers and actions supported with connector

The following triggers and actions are supported within a flow:

* **Triggers**

  1. When a Collaboration Session is Created.

      :::image type="content" source="../assets/images/collaboration-control/colab-session-created-preview.png" alt-text="Collaboration session created":::

      **Scope:** A scope to limit which rows can trigger the flow.

      **Run as:** The running user for steps where invoker connections are used.

  1. When a Task is created or modified

      :::image type="content" source="../assets/images/collaboration-control/task-created.png" alt-text="Task is created or modified":::

      By default, the trigger Planner Task will be disabled and won't trigger. To enable it the following steps must be completed by the tenant admin:

      * Create a support ticket under the path Power Apps/Collaboration controls/Settings.
      * Request that your environment is enabled for the Collaboration connector and provide your Environment URL (preferred) or Organization ID.  
      * You can add the following sample text to your support request: "Please enable Environment URL: `url` for the Collaboration Connector".
      * To open a support ticket, see [Get Help + Support](/power-platform/admin/get-help-support)

* **Actions**

  1. Begin Collaboration session

      :::image type="content" source="../assets/images/collaboration-control/begin-collab-session.png" alt-text="begin collaboration session":::

     This step action creates a new collaboration session for your dataverse business entity

      * **Application Name:** Name of the associated application, for example, could be “Collaboration Manager for Loans” or “Collaboration Manager for Closed Loan Auditing”.
      * **Collaboration Root Entity Name:** Type of application record (table name) for example, could be “msfi_loanapplication” for a Collaboration Manager for Loans application.
      * **Collaboration Root Entity ID:** ID of the associated application record, e.g.could be the ID of a Loan Application record.  

      ***Advanced options***

      **Metadata (Advanced):** Adds metadata for a collaboration session.

        * **OData Type:** This field needs to be provided if the other key/value are set and need to match exactly #Microsoft.Dynamics.CRM.m365_collaborationmetadata.
        * **Key:** Key associated with the metadata attribute.
        * **Value:** Value associated with the metadata attribute.

  1. Retrieve Collaboration session

      :::image type="content" source="../assets/images/collaboration-control/retrieve-collab-session.png" alt-text="Retrieve collaboration session":::

     This step action returns the collaboration session that matches the provided inputs:

     * **Application Name:** The application name context for the collaboration session.
     * **Collaboration Root Entity ID:** The business entity ID for the collaboration session.  
     * **Collaboration Root Entity Name:** The business entity type for the collaboration session.

  1. Update Collaboration session

      :::image type="content" source="../assets/images/collaboration-control/update-collab-session.png" alt-text="Update collaboration session":::

     This step action updates an existing collaboration session:

     * **Collaboration Root ID:** The GUID for the target collaboration session/root record.
     * **Collaboration Root Entity ID:** The business entity ID that the collaboration session will refer to.
     * **Collaboration Root Entity Name:** The business entity type name that the collaboration session will refer to.

     ***Advanced options:***

      **Create Metadata (Advanced):** Adds more metadata to a collaboration session record.

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

  1. Associate Collaboration Map (external)

      :::image type="content" source="../assets/images/collaboration-control/associate-collab-map.png" alt-text="Associate collaboration map":::

     This step action creates a mapping of an external collaboration entity (outside dataverse) with your collaboration session:

     * **Collaboration Root ID:** The collaboration session unique identifier to map to a collaborative entity.
     * **Collaboration Map External ID:** The external collaborative resource ID to map.
     * **Collaboration Map Entity Name:** The external collaborative entity type name to map.

     ***Advanced options:***

     **Metadata:** Add metadata for a collaboration map.
     * **OData Type:** This field needs to be provided if the other key/value are set and needs to match exactly #Microsoft.Dynamics.CRM.m365_collaborationmetadata.
     * **Key:** Key associated with the metadata attribute.
     * **Value:** Value associated with the metadata attribute.

  1. Associate Collaboration Map (internal)

      :::image type="content" source="../assets/images/collaboration-control/associate-collab-map-internal.png" alt-text="Associate collaboration map internal":::

     This step action creates a mapping of a collaboration entity (dataverse table) with your collaboration session. Internal are intended to create mappings between internal Dataverse entities/tables only.

     * **Collaboration Root ID:** The collaboration session unique identifier to map to a collaborative entity.
     * **Collaboration Map Entity ID:** The Dataverse collaborative entity ID to map.
     * **Collaboration Map Entity Name:** The Dataverse collaborative entity type name to map.

     ***Advanced options:***

     **Metadata (Advanced)** Add metadata for a collaboration map.

     * **OData Type:** This field needs to be provided if the other key/value are set and needs to match exactly #Microsoft.Dynamics.CRM.m365_collaborationmetadata
     * **Key:** Key associated with the metadata attribute
     * **Value:** Value associated with the metadata attribute

  1. Update Collaboration Map

      :::image type="content" source="../assets/images/collaboration-control/update-collab-map.png" alt-text="Update collaboration map":::

     This step action updates an existing collaboration map.

     * **Collaboration Map ID:** The collaboration map unique identifier to update.
     * **Collaboration Map Entity ID:** The collaborative entity ID to map. This value must be empty if the external ID is Provided
     * **Collaboration Map Entity Name**
     * **Collaboration Map External ID:** The external collaborative resource ID to map. This value must be empty if the entity ID is provided.  

     ***Advanced options:***

     **Create Metadata:** Adds more metadata to a collaboration map record.

     * **OData Type:** This field needs to be provided if the other key/value are set and needs to match exactly #Microsoft.Dynamics.CRM.m365_collaborationmetadata.
     * **Key:** Key associated with the metadata attribute.
     * **Value:** Value associated with the metadata attribute.

     **Update Metadata:** Updates existing metadata on a collaboration map record.

     * **OData Type:** This field needs to be provided if the other key/value are set and needs to match exactly #Microsoft.Dynamics.CRM.m365_collaborationmetadata
     * **Key:** Key associated with the metadata attribute to update
     * **Value:** Value associated with the metadata attribute

     **Delete Metadata:** Removes any existing metadata on a collaboration map record.

     * **OData Type:** This field needs to be provided if the other key/value are set and needs to match exactly #Microsoft.Dynamics.CRM.m365_collaborationmetadata.
     * **Key:** Key associated with the metadata attribute to remove.

  1. Get Collaboration Metadata

      :::image type="content" source="../assets/images/collaboration-control/get-collab-metadata.png" alt-text="get collaboration metadata":::

     This step action lists all metadata matching the specified filter.
     **Filter:** A filter to apply to the metadata query.
     Example retrieving all metadata related to a collaboration map entity ID  
     m365_entityname eq 'm365_collaborationmap' and m365_entityid eq 'GUID'

  1. Create Planner Task

      :::image type="content" source="../assets/images/collaboration-control/create-planner-task.png" alt-text="Create planner task":::

     This step action creates a Graph Planner Task using Collaboration controls Planner task virtual table.

     * **Collaboration Root ID (Required):** Collaboration session unique identifier
     * **Plan ID (Required):** Plan ID that the task belongs
     * **Title (Required):** Title of the task
     * **Assignments:** A json formatted object that represents all the assignments of a Task. See, [plannerAssignments resource type](/graph/api/resources/plannerassignments)
     * **Bucket ID:** Bucket ID to which the tasks belong.
     * **Priority:** Priority of the task. 0 and 10 (inclusive) increasing value being lower priority.

     ***Advanced options:***

     * **Active Checklist Item Count** (Advanced): Number of checklist items with value set to false representing incomplete items.
     * **Applied Categories:** A json formatter object that represents all the categories to apply for the task. See, [plannerAppliedCategories resource type](/graph/api/resources/plannerappliedcategories).
     * **Assignee Priority:** String value hints used to order items of this type in a list view. See, [using order hints in Planner](/graph/api/resources/planner-order-hint-format)
     * **Checklist Item Count:** Number of checklist items that are present on the task.
     * **Completed By:** A json formatted object that represents the identity of the user that completed the task. See, [identitySet resource type](/graph/api/resources/identityset)
     * **Conversation Thread ID:** Thread ID of the conversation on the task. This is the ID of the conversation thread object created in the group.
     * **Created By:** A json formatted object that represents the identity of the user that created the task. See, [identitySet resource type](/graph/api/resources/identityset)
     * **Due Date Time:** Date and time at which the task is due. The Timestamp type represents date and time information using ISO 8601 format and is always in UTC time. For example, midnight UTC on January 1st, 2014 is 2014-01-01T00:00:00Z.
     * **Order Hint:** Hint used to order items of this type in a list view. The format is defined as outlined in [using order hints in Planner](/graph/api/resources/planner-order-hint-format).
     * **Percent Complete:** Percentage of task completion (0-100)
     * **Preview Type:** This sets the type of preview that shows up on the task. The possible values are: automatic, noPreview, checklist, description, reference.
     * **Reference Count:** Number of external references that exist on the task.
     * **Start Date Time:** Date and time at which the task starts. The Timestamp type represents date and time information using ISO 8601 format and is always in UTC time. For example, midnight UTC on Jan 1, 2014 is 2014-01-01T00:00:00Z.

  1. Get Planner Task

      :::image type="content" source="../assets/images/collaboration-control/get-planner-task.png" alt-text="Get planner task":::

     This step action returns a Planner Task data using Collaboration controls Planner task virtual table

     **Task ID (Required):** Task unique identifier

  1. Update Planner Task

      :::image type="content" source="../assets/images/collaboration-control/update-planner-task-preview.png" alt-text="Update planner task":::

     This step action updates a planner task record using Collaboration controls Planner task virtual table

     * **Task ID (Required):** Task unique identifier
     * **Assignments:** A json formatted object that represents all the assignments of a Task. See. plannerAssignments resource type - Microsoft Graph v1.0 | Microsoft Docs  
     * **Bucket ID:** Bucket ID to where the task belongs.  
     * **Planner Task Details:** Represents the additional information about a task.
     * **Due Date Time:** Date and time at which the task is due. The Timestamp type represents date and time information using ISO 8601 format and is always in UTC time. For example, midnight UTC on January 1, 2014 is 2014-01-01T00:00:00Z.
     * **Priority:** Priority of the task. 0 and 10 (inclusive) increasing value being lower priority.  
     * **Percent Complete:** Percentage of task completion (0-100)
     * **Title:** Title of the task

     ***Advanced options:***

     * **Applied Categories:** A json formatted object that represents all the categories to apply for the task. See, [plannerAppliedCategories resource type](/graph/api/resources/plannerappliedcategories).
     * **Assignee Priority:** String value hints used to order items of this type in a list view. See, [using order hints in Planner](/graph/api/resources/planner-order-hint-format).
     * **Conversation Thread ID:** Thread ID of the conversation on the task. This is the ID of the conversation thread object created in the group.
     * **Collaboration Root ID:** The collaboration session unique identifier.
     * **Order Hint:** Hint used to order items of this type in a list view. The format is defined as outline here.
     * **Start Date Time:** Date and time at which the task starts. The Timestamp type represents date and time information using ISO 8601 format and is always in UTC time. For example, midnight UTC on January 1, 2014 is 2014-01-01T00:00:00Z.

**Example Flow Scenario**

The following are some example of flows:

1. Getting a response from Microsoft forms, creating a Collaboration session and a task associated.

  :::image type="content" source="../assets/images/collaboration-control/response-submitted.png" alt-text="New response submitted":::

1. Every time a collaboration session is created, capture the details and send an e-mail notification.

  :::image type="content" source="../assets/images/collaboration-control/colab-session-created-preview.png" alt-text="Collaboration session created":::

> [!NOTE]
> Multiple flows could be triggered in this way to perform different actions, using data from the response of the Collaboration session creation.
