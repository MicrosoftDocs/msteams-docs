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

Actions aim to integrate your app into your user's workflow by enabling easy discoverability and seamless interaction with their content. By directing users to your app with their intent and contextual content, Actions enable efficient task completion. This integration enhances the visibility and engagement of your app with minimal development effort.

The following graphic is an example of an Action that directs user to view list of suppliers related to the file. In Microsoft 365, the user right-clicks on the excel file and selects **Related suppliers** to view the list of suppliers for the Northwind company. The Northwind page opens with the list of suppliers. The user saves time by checking the result with a single click and the Excel file each time manually.

  :::image type="content" source="images/actions-in-m365-app.gif" alt-text="Graphic shows the user right-clicks on the excel file and select the related suppliers.":::

## Understand how Actions work

Actions are built using a combination of Intent, Object, and Handler. When a users wants to perform a task, the task can be represented as a combination of intent and object, where the intent is the verb describing the user's desired action and the object is the noun on which the action is to be performed. You must listen to the user's  task (intent and object) and create a handler that help users to complete the task.

Build an action, you must define the intent, object, and handler in the app manifest and use Teams JavaScript library (Teams JS) to get the Action details to make it easy for the users to do specific tasks.

The following table lists the required elements and support information for Actions:

| &nbsp; | Name | Description | What is supported in this preview  
| --- | --- | --- | ---|
| &nbsp; | Intent | Intent is the objective a user wants to perform or achieve. Intent is typically represented by a verb, such as `Open` and  `addTo` or any other action that a user intends to perform. Microsoft 365 uses intent to display Actions in locations that align with the user’s needs and intentions. Intent determines the placement of Actions. | You can create an intent for `Open`, `addTo`, and `custom` Actions. You can use `custom` Action to create tailored action. |
| &nbsp; | Object  | Object is the file on which the user wants to perform an action. Object represents the noun or context content that defines what the user wants to perform an action on.  | Currently, Actions can be triggered on content objects (files) that have an extension, such as Word, PowerPoint, Excel, PDF, and images. The files must be available in OneDrive or SharePoint and are accessible through Microsoft Graph. |
| &nbsp; | Handlers | A handler refers to the method to fulfil the user's intent and perform the desired action on the specified object. Handler is responsible for implementing the logic and functionality of the Action, ensuring a seamless and meaningful user experience. | Actions support `openPage` handler. The `openPage` handler allows you to directly guide users to your app's personal tab. By utilizing the `openPage` handler, you can effectively drive users to your app's dedicated pages, providing them with a rich and expansive interface to accomplish their goals. |

## Design guidelines

This section covers the main principles of creating a captivating user experience by seamlessly integrating app icons and display names in a context menu. A single action can express the core of your application, and by skillfully designing the visual interaction between the app icon and its display name, you can improve both the appearance and the functionality. visually appealing context menu that reflects your application’s identity.

:::image type="content" source="images/app-icon-context-menu.png" alt-text="The screenshot shows the app icon in context menu.":::

:::image type="content" source="images/icon-slot.png" alt-text="The screenshot shows the icon slot in context menu.":::

> [!NOTE]
> The placement of Actions is determined by the Microsoft 365 platform.

### Context menu

An Action in the context menu contains App icon and display name. Actions with custom intent show as a flat list at the end of the context menu, actions with Open or Add to intent are grouped into **Open** and **Add To**.

:::image type="content" source="images/actions-design-guidelines.png" alt-text="The screenshot shows the design of context menu.":::

## Next step

> [!div class="nextstepaction"]
> [Build Actions in Microsoft 365](build-actions-in-m365.md)
