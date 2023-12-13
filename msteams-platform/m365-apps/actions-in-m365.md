---
title: Actions in Microsoft 365
description: In this article, learn more about the function of Actions and its use cases. 
ms.date: 11/16/2023
ms.author: mosdevdocs
author: v-bvishnu
ms.topic: Conceptual
ms.subservice: m365apps
---
# Actions in Microsoft 365

> [!NOTE]
>
> * Actions for Microsoft 365 is available in [public developer preview](../resources/dev-preview/developer-preview-intro.md).
>
> * Actions is supported for Microsoft 365 (Office) app for web and desktop.

Actions enable your app to integrate seamlessly into the user's workflow and guide users to your app based on their intent and the content at hand, making task completion more efficient.
Actions help you enhance your app's visibility and engagement with minimal development effort and reduce the need for users to switch contexts across various Microsoft 365 apps.

The following graphic is an example of an Action that direct user to view list of suppliers related to the file. In Microsoft 365, the user right-clicks on the excel file and selects **Related suppliers** to view the list of suppliers for the Northwind company. The Northwind page opens with the list of suppliers. The user saves time by checking the result with a single click and the Excel file each time manually.

  :::image type="content" source="images/actions-in-m365-app.gif" alt-text="Graphic shows the user right-clicks on the excel file and select the related suppliers.":::

## Understand how Actions work

Actions are built using a combination of Intent, Object, and Handler. When a users wants to perform a task, the task can be represented as a combination of intent and object, where the internt is the verb describing the user's desired action and the object is the noun on which the action is to be performed. You must listen to the user's  task (intent and object) and create a handler that help users to complete the task.

To build an action, you must define the intent, object, and handler in the app manifest and use Teams JavaScript library (Teams JS) to get the Action details to make it easy for the users to do specific tasks.

The following table lists the required elements and support information for Actions:

| &nbsp; | Name | Description | What is supported in this preview  
| --- | --- | --- | ---|
| &nbsp; | Intent | Intent is the objective a user wants to perform or achieve, such as `Open` and  `addTo`. Microsoft 365 uses intent to display Actions in locations that align with the user’s needs and intentions. Intent determines the placement of Actions. | You can create an intent for `Open`, `addTo`, and `custom` Actions. You can use `custom` Action to create tailored action. |
| &nbsp; | Object  | Object is the file on which the user wants to perform an action. | Currently, Actions can be triggered on content objects (files) that have an extension, such as Word, PowerPoint, Excel, PDF, and images. The files must be available in OneDrive or SharePoint and are accessible through Microsoft Graph. |
| &nbsp; | Handlers | A handler receives the information of the Action the user performs and helps you create a seamless user experience for performing users specific tasks.  | Actions support `openPage` handler. The `openPage` handler allows you to directly guide users to your app's personal tab. By utilizing the `openPage` handler, you can effectively drive users to your app's dedicated pages, providing them with a rich and expansive interface to accomplish their goals. |

## Design guidelines

Actions enable your app to integrate seamlessly into the user's workflow and guide users to your app based on their intent and the content at hand, making task completion more efficient.

:::image type="content" source="images/app-icon-context-menu.png" alt-text="The screenshot shows the app icon in context menu.":::

:::image type="content" source="images/icon-slot.png" alt-text="The screenshot shows the icon slot in context menu.":::

> [!NOTE]
> The placement of Actions is determined by the Microsoft 365 platform.

### Context menu

An Action in the context menu contains App icon and display name. Actions with custom intent show as a flat list at the end of the context menu, actions with Open or Add to intent are grouped into **Open** and **Add To**.

:::image type="content" source="images/actions-design-guidelines.png" alt-text="The screenshot shows the design of context menu.":::

## See also

[Extend Teams apps across Microsoft 365](overview.md)
