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

:::image type="content" source="images/actions-in-m365-app.gif" alt-text="Graphic shows the user right-clicks on the excel file and select the related suppliers.":::

| Steps | Description |
| --- | --- |
| 1 | In Microsoft 365, the user right-clicks on the Excel file. A context menu appears.|
| 2 | The user selects **Related suppliers** to view the list of suppliers for the Northwind company.|
| 3 | The Northwind personal tab opens with the list of suppliers mentioned in the Excel file. The user saves time by checking the result with a single click on the Excel file without manually opening the file each time.|

## Understand how Actions work

Actions are built using an intent, object, and handler. When a user aims to complete a task it's called an Action, and the Action is represented by the intent and object. The intent serves as the verb, outlining the user's intended action, while the object is the noun on which the action is performed. For example, opening a file is an intent and the file is an object. You must consider the user's intent and object as the input and create the appropriate handler to enable task completion for the user.

To build an action, you must define the intent, object, and handler in the app manifest and use Teams JavaScript library (Teams JS) to get the Action details to make it easy for the users to do specific tasks.

The following table lists the required elements and support information for Actions:

| &nbsp; | Name | Description | What is supported in this preview  
| --- | --- | --- | ---|
| &nbsp; | Intent | Intent is the objective a user wants to perform or achieve. Intent is typically represented by a verb, such as `Open`, `Add to`, or any other actions that a user intends to perform. Microsoft 365 uses intent to display Actions in locations that align with the user’s needs and intentions. Intent determines the placement of Actions. | You can create an intent for `Open`, `Add to`, and `custom` Actions. You can use `custom` Action to create a tailored action. |
| &nbsp; | Object  | Object is the file on which the user wants to perform an action. Object represents the noun or context that defines what the user wants to perform an action on.  | Actions can be triggered on content objects (files) that have an extension, such as Word, PowerPoint, Excel, PDF, and images. The files must be available in OneDrive or SharePoint and must be accessible through Microsoft Graph. |
| &nbsp; | Handlers | A handler refers to the method to fulfill the user's intent and perform the desired action on the specified object. Handler is responsible for implementing the logic and functionality of the Action, ensuring a seamless and meaningful user experience. | Actions support the `openPage` handler. The `openPage` handler allows you to directly guide users to your app's personal tab. The `openPage` handler helps you to drive users to your app's dedicated personal tab, providing them with a rich and expansive interface to accomplish their goals. |

## Design guidelines

Create app icons and display names in a context menu for Actions. A single action shows the essence of your app, and by designing the visual connection between the app icon and its display name, you can enhance both the look and the function.

:::image type="content" source="images/app-icon-context-menu.png" alt-text="The screenshot shows the app icon in context menu.":::

* Start with the intent name, typically represented by a verb, such as `Open` or `Add to` and followed by a term that describes your app or what your action does.

* Ensure that the first letter is capitalized. When using a brand name, only the first letter of the brand name should be capitalized.

The following image is an anatomy of an icon slot:

:::image type="content" source="images/icon-slot.png" alt-text="The screenshot shows the icon slot in context menu.":::

### Display name

The following table provides guidance on the do’s and don’ts for the display name:

| ✔️ **Do's** | ❌ **Don't** |
| --- | --- |
|Add to Todo: Add to represents the intent and Todo is the app name.|Avoid using Contoso as the only app name, as it doesn't adequately convey the app's functionality.|
|Open in Contoso: Open represents the intent and Contoso is the app name.|Open PDF, Word, PPT, or TXT files in Contoso is too long.|
|Add to dashboard: Add to represents the intent and Contoso is the app name. However, dashboard provides a more accurate description of the use case.|Custom sign document: Custom intent, no need to include custom in the display name. Start with the intent description with a verb.|
|Request signatures: Start with the custom intent, followed by a comprehensive description of the action. The brand name or object name, Contoso sign, isn't necessarily required.|&nbsp;|
|Convert to PDF: Start with the custom intent, which is identified as the verb, to clearly express the action in the Contoso app.|

The following image is an example of correct and incorrect ways to format a sample name:

:::image type="content" source="images/do-and-dont.png" alt-text="Screenshot shows the do and don't of the sample display name." lightbox="images/do-and-dont.png":::

### Context menu

An Action in the context menu contains an app icon and display name.

The following images are an example of flat list and grouped intents in a context menu:

#### [Flat list](#tab/flatlist)

:::image type="content" source="images/context-menu-flat-list.png" alt-text="Screenshot shows the custom intent as a flat list at the end of the context menu.":::

#### [Grouped](#tab/groupedlist)

:::image type="content" source="images/grouped-by-intent.png" alt-text="Screenshot shows the Actions grouped by intent in the context menu.":::

---

> [!NOTE]
>
> The Microsoft 365 platform determines the placement of Actions.

### Validation guidelines

It’s recommended to review the validation guidelines to assist your app in passing the Teams Store submission process. For more information, see [Actions in Microsoft 365](../concepts/deploy-and-publish/appsource/prepare/teams-store-validation-guidelines.md#actions-in-microsoft-365).

## Next step

> [!div class="nextstepaction"]
> [Build Actions in Microsoft 365](build-actions-in-m365.md)
