---
title: Actions in Microsoft 365
description: In this article, learn more about the function of Actions and its use cases. 
ms.date: 11/16/2023
ms.author: mosdevdocs
author: Vishnu
ms.topic: Conceptual
ms.subservice: m365apps
---
# Actions in Microsoft 365

> [!NOTE]
>
> * Actions for Microsoft 365 is available in [public developer preview](../resources/dev-preview/developer-preview-intro.md).
>
> * Actions is supported for Microsoft 365 apps on web and desktop clients only and isn't supported on Outlook and Microsoft Teams.

Actions enable your app to integrate seamlessly into the user's workflow and guide users to your app based on their intent and the content at hand, making task completion more efficient.
Actions help you enhance your app's visibility and engagement with minimal development effort and reduce the need to switch contexts across various Microsoft 365 apps.

The following graphic is an example of open page Action where the user intends to view the list of suppliers. In Microsoft 365, the user right-clicks on the excel file and select the **Related suppliers**. The Northwind page opens with the list of suppliers. This saves time for the user to open the app and the Excel file and check each item manually.

  :::image type="content" source="images/actions-in-m365-app.gif" alt-text="Graphic shows the user right-clicks on the excel file and select the related suppliers.":::

## Build Actions

Actions are the combination of intent, object, and handler. Actions represent the task that the user wants to perform where intent is the user’s desired action, object is the function to be executed, and handler is the way to perform the action on the object.

| &nbsp; | Name | Description | What is supported in this preview  
| --- | --- | --- | ---|
| &nbsp; | Intent | Intent is the objective a user wants to perform or achieve, such as `Open` and  `addTo`. Microsoft 365 uses intent to display Actions in locations that align with the user’s needs and intentions. Intent determines the placement, grouping, and ordering of Actions. | You can create an intent for `Open`, `addTo`, and `custom` actions. You can use `custom` Actions to create tailored Actions. |
| &nbsp; | Object  | Object is the file on which the user wants to perform an action. | Currently, Actions can be triggered on content objects (files) that have an extension, such as Word, PowerPoint, Excel, PDF, and images. The files must be available in OneDrive or SharePoint and are accessible through Microsoft Graph. |
| &nbsp; | Handlers | A handler is how the Action performs the user’s intent on the selected object. It provides the logic and functionality of the Action, creating a smooth and meaningful user experience. | `openPage`: Handler allows you to directly guide users to your app's personal tab. By utilizing the `openPage` handler, you can effectively drive users to your app's dedicated pages, providing them with a rich and expansive interface to accomplish their goals. |

## Design guidelines

One single Action in the context menu contains App icon and display name.

Actions with custom intent show as a flat list in the bottom of the context menu, actions with Open/Add to intent will be grouped into Open and Add to.

:::image type="content" source="images/app-icon-context-menu.png" alt-text="The screenshot shows the app icon in context menu.":::

:::image type="content" source="images/icon-slot.png" alt-text="The screenshot shows the icon slot in context menu.":::

> [!NOTE]
> The placement of actions is determined by the Microsoft 365 platform. Using intent does not guarantee grouping, and using custom intent does not imply no grouping. We are planning to introduce additional features and experiences to assist users in quickly locating the most relevant and useful actions.

### In context menu

:::image type="content" source="images/actions-design-guidelines.png" alt-text="The screenshot shows the design of context menu.":::

## See also

[Extend Teams apps across Microsoft 365](overview.md)
