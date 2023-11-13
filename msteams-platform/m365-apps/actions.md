---
title: Actions overview
description: In this article, learn more about the function of Actions and its use cases. 
ms.date: 10/11/2023
ms.author: mosdevdocs
author: mobajemu
ms.topic: Conceptual
ms.subservice: m365apps
---
# What are Actions

> [!NOTE]
> The feature is only available for Microsoft 365 app on web and desktop clients.

Actions seamlessly integrate your app into the user's workflow, ensuring effortless discovery and smooth interaction with their content. By guiding users to your app based on their intent and contextual content, Actions facilitate efficient task completion. This integration increases your app's visibility and engagement with minimal development effort.

Building Actions give developers to enhance their user's productivity by streamlining task completion and reducing the need for context switching across various Microsoft 365 applications.

## Key benefits of Actions in Microsoft 365 applications

1. Users accomplish tasks more efficiently.
1. Seamlessly integrates your app in user workflow, increasing app's visibility and user engagement.
1. Users can take immediate action on content files through your app, expanding the range of interactions they can have with their content.  

:::image type="content" source="images/m365-Actions-in-action.gif" alt-text="In this GIF, the user can add a file to the to-do list sample app with a note attached for a task to complete. ":::
 
## How Actions work

Actions are created through the integration of Intent, Object, and Handler. When a user intends to accomplish a task, it is represented as intent + object. The intent defines the user's desired action, and the object specifies the function to be executed.

As a developer, your role is to receive the user's intent and object input and construct the corresponding handler that facilitates task completion for the users.
To build an Action, you will define the intent, object, and handler of your actions in the manifest. And in your handler, use the [Teams JS library](/javascript/api/@microsoft/teams-js) to receive the Action information to create a seamless user experience for performing users specific tasks.  

### Intent

"intent" is the objective a user wants to perform or achieve. User intent is typically represented by a verb, such as "open," or “add to.” This "intent" enables the Microsoft 365 platform to display the Actions in locations that mostly align with the user's needs and intentions. This includes but not limited to, where Actions show up and how Actions are grouped or ordered.

There are three intent types supported for Actions: “open”, “addTo”, and “custom”. With the "custom" intent, developers have the flexibility to build tailored Actions to fulfill any user task.

### Object

"object" is the file on which the user wants to perform an action on. For an Action to be triggered on the file it must reside in ether OneDrive or SharePoint and be accessible through Microsoft Graph.

> [!NOTE]
> Current object file types supported include but are not limited to .docx, .doc, .ppt, .xlsx, .pdf, .jpg, .png, and well as other image file types


### Handlers

A "handler" is the method or mechanism to fulfill the user's intent and perform the desired action on the specified object. It is responsible for implementing the logic and functionality of the Action.

**Currently supported handler:**

The current choice of handlers can either direct users to the app’s page or open a dialog for the user to interact with.

* openDialog: This handler directs users to a dialog, offering a dedicated and contextualized interface for interacting with your app's features without opening the full app.
* openPage: By using the openPage handler you can drive users to your app's dedicated pages(personal tab).

## Handler user scenarios

Let us walk through a user scenario of how the handler affects the workflow. 

For background: The user is a supervisor at Northwind Traders with limited time for focused work. They start their day in the Microsoft 365 app, where they can easily access all of their content.  

### Action opens a dialog

In this example, the user sees the latest sales report from a supplier, 'Tokyo Trader,' and wants to add it as an attachment in the supplier management system app built by Northwind Traders.
They right-click on the Word document and choose the Action 'Add to supplier' built by Northwind Traders. 

:::image type="content" source="images/m365-actions-user-scenario-1-1.png" alt-text="The screenshot shows a right click menu displaying the Add To Action running on Microsoft 365 on web.":::

A dialog pops up where they select 'Tokyo Traders' and click 'Add' to add the attachment to their management system, all without opening the document or app. With the openDialog handler, users can complete task efficiently by working in a contextualized dialog interface.
:::image type="content" source="images/m365-actions-user-scenario-1-2.png" alt-text="The screenshot shows a pop-up dialog of the Northwind app for the user to add an attachment  running on Microsoft 365 on web.":::

### Action opens a page

On the same page, the user notices the 'Q2 Top suppliers' Excel sheet and want to see which suppliers they work with on this list.   
They right-click on the Excel file and then click on the Action 'Related suppliers'.

:::image type="content" source="images/m365-actions-user-scenario-2-1.png" alt-text="The screenshot shows the right click menu displaying the Related supplier option running on Microsoft 365 on web.":::

The Northwind app opens, displaying the list of suppliers filtered to show only those that appear in the document.  This saves them time opening up the app and the Excel file and checking each item manually.

:::image type="content" source="images/m365-actions-user-scenario-2-2.png" alt-text="The screenshot shows the Northwind app open, displaying the list of suppliers filtered to show only those that appear in the document running on Microsoft 365 on web.":::

## Next step

With this information you are well acquainted with the functions of Actions. To learn how to build your first Action navigate to the [How to build Actions documentation](build-actions.md).  

