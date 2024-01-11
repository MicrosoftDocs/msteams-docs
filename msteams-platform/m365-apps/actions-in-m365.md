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
> * Actions are available in [public developer preview](../resources/dev-preview/developer-preview-intro.md).
> * Actions are supported for Microsoft 365 (Office) app for web and desktop.

Actions aim to integrate your app into your user's workflow by enabling easy discoverability and seamless interaction with their content. Actions enable efficient task completion by directing users to your app with their intent and contextual content. The integration enhances the visibility and engagement of your app with minimal development effort.

The following graphic is an example of an Action that directs user to view list of suppliers related to the file:

| Steps | Description |
| --- | --- |
| 1 | In Microsoft 365, the user right-clicks on the Excel file. A context menu appears.|
| 2 | The user selects **Related suppliers** to view the list of suppliers for the Northwind company.|
| 3 | The Northwind page opens with the list of suppliers mentioned in the Excel file. The user saves time by checking the result with a single click on the Excel file without manually opening the file each time.|

  :::image type="content" source="images/actions-in-m365-app.gif" alt-text="Graphic shows the user right-clicks on the excel file and select the related suppliers.":::

## Understand how Actions work

Actions are built using a combination of Intent, Object, and Handler.

* Intent and object: When a user wants to perform a task, the task can be represented as a combination of intent and object, where the intent is the verb describing the user's desired action and the object is the noun on which the action is to be performed. For example, opening a file is a verb and the file is an object.

* Handler: You must listen to the user's task (intent and object) and create a handler that help users complete the task.

To build an action, you must define the intent, object, and handler in the app manifest and use Teams JavaScript library (Teams JS) to get the Action details to make it easy for the users to do specific tasks.

The following table lists the required elements and support information for Actions:

| &nbsp; | Name | Description | What is supported in this preview  
| --- | --- | --- | ---|
| &nbsp; | Intent | Intent is the objective a user wants to perform or achieve. Intent is typically represented by a verb, such as `Open`, `addTo`, or any other actions that a user intends to perform. Microsoft 365 uses intent to display Actions in locations that align with the user’s needs and intentions. Intent determines the placement of Actions. | You can create an intent for `Open`, `addTo`, and `custom` Actions. You can use `custom` Action to create a tailored action. |
| &nbsp; | Object  | Object is the file on which the user wants to perform an action. Object represents the noun or context that defines what the user wants to perform an action on.  | Actions can be triggered on content objects (files) that have an extension, such as Word, PowerPoint, Excel, PDF, and images. The files must be available in OneDrive or SharePoint and must be accessible through Microsoft Graph. |
| &nbsp; | Handlers | A handler refers to the method to fulfil the user's intent and perform the desired action on the specified object. Handler is responsible for implementing the logic and functionality of the Action, ensuring a seamless and meaningful user experience. | Actions support the `openPage` handler. The `openPage` handler allows you to directly guide users to your app's personal tab. The `openPage` handler helps you to drive users to your app's dedicated pages, providing them with a rich and expansive interface to accomplish their goals. |

## Design guidelines

Create app icons and display names in a context menu for Actions. A single action shows the essence of your app, and by designing the visual connection between the app icon and its display name, you can enhance both the look and the function.

:::image type="content" source="images/app-icon-context-menu.png" alt-text="The screenshot shows the app icon in context menu.":::

* Ensure that the name of the app doesn't exceed more than 18 characters including spaces.

* Use one line for Actions title. Use verbs that show the result of selecting menu items that trigger Actions.

In the following image is an anatomy of icon slot:

:::image type="content" source="images/icon-slot.png" alt-text="The screenshot shows the icon slot in context menu.":::

### Context menu

An Action in the context menu contains an app icon and display name.

* Actions with custom intent show as a flat list at the end of the context menu.

    :::image type="content" source="images/context-menu-flat-list.png" alt-text="Screenshot shows the custom intent as a flat list at the end of the context menu.":::

* Actions with **Open** or **Add to** intents are grouped.

    :::image type="content" source="images/grouped-by-intent.png" alt-text="Screenshot shows the Actions grouped by intent in the context menu.":::

> [!NOTE]
>
> The Microsoft 365 platform determines the placement of Actions, and there’s no requirement for intents to be grouped or for custom intents to be ungrouped.

## Next step

> [!div class="nextstepaction"]
> [Build Actions in Microsoft 365](build-actions-in-m365.md)
