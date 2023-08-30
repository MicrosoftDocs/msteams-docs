---
title: Configure Tasks for external clients in Collaboration control app
author: surbhigupta
description: In this module, learn how to configure Tasks for external clients in Collaboration control app in Microsoft Teams.
ms.localizationpriority: medium
ms.author: v-npaladugu
ms.topic: conceptual
ms.date: 09/30/2022
---

# Configure Tasks for external clients

External tasks that can be assigned to users who aren't part of your organization or don't have access to your application such as assigning a task to a customer.

To enable, you'll need an extra step of passing an XML string to each instance of Tasks PCF control attached to the sub grid component on desired MDA form. XML string is a parametrized query that allows the control to extract the required data from a table that contains customer information.

> [!NOTE]
> Currently, Collaboration controls are available only in [public developer preview](~/resources/dev-preview/developer-preview-intro.md).

To create external tasks, follow the steps:

1. Create a new custom entity such as Customer or reuse an existing customer entity like Contacts.

1. Create new fields that hold the following information:
    1. Name
    1. Email
    1. Parent (Lookup to the parent table such as Inspections)
    > [!NOTE]
    > The customer entity created above is, where the task control pulls the customer information from when assigning an external task. The Parent field ensures that the customer entity is linked to an Inspection record.

1. Generate a Fetch XML file to allow the PCF control to pull the right customer information.

    **Configure XML schema**

    Following is the schema definition for the tasks configuration Fetch XML. Any Fetch XML needs to be designed to meet the following requirements:

    * Query result shall return the following properties for each user object:
      * ID
      * displayname
      * email, use alias if needed.
    * Query shall contain the **@top** parameter to allow caller to limit the number of results.
    * Query shall have **@rootEntityId** parameter to filter results by only related records, if needed.
    * Query shall have **@useName** parameter to allow result filtering by name
    * Query shall have **@useIdentifier** parameter to allow fetching only selected users.

    **Configuration XML schema and example**

    Configuration of XML schema pulls data from the customer table. You can adjust the `<fetch/>` node to specify your own query to display users from any other custom table.

    > [!NOTE]
    > The above entity and attribute name and order attribute in the XML are in **PublisherPrefix_TableColumn** format.

    ```xml
    
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

1. Bind the Task controls to the subgrid within the classic form designer. Select **Save** and then select **Switch to classic**.

1. Move through in the classic form designer, until you find the **Tasks** tab. Double-click the subgrid to open its property dialog.

    :::image type="content" source="~/assets/images/collaboration-control/subgrid-property.png" alt-text="Screenshot shows the tasks property dialog.":::

1. In the property dialog, set the properties as shown in the following image:

    :::image type="content" source="~/assets/images/collaboration-control/tasks-property.png" alt-text="Sceenshot shows to set the properties in the Tasks property settings.":::

1. Go to the Controls tab and select :::image type="icon" source="~/assets/images/collaboration-control/edit-icon.png" alt-text="Screenshot shows how to edit the tasks."::: on Custom Tasks property to add the Fetch XML generated above.

1. Paste the Fetch XML

    :::image type="content" source="~/assets/images/collaboration-control/set-fetchproperties.png" alt-text="Screenshot shows how to paste Fetch XML.":::

    :::image type="content" source="~/assets/images/collaboration-control/custom-tasksproperty.png" alt-text="Screenshot shows how to configure Custom property settings.":::

1. Select **Ok** in Configure Property "Custom Tasks" and Set Properties windows.

1. Save and Publish.

## See also

* [Integrate web apps](integrate-web-apps-overview.md)
* [Public developer preview manifest schema for Teams](../resources/schema/manifest-schema-dev-preview.md)
