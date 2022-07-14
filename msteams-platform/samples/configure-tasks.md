---
title: Configure Tasks for external clients in collaboration control app
author: surbhigupta
description: In this article, learn about configuring Tasks for external clients in collaboration control app in Microsoft Teams.
ms.localizationpriority: medium
ms.author: v-npaladugu
ms.topic: conceptual
---

# Configure Tasks for external clients

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
