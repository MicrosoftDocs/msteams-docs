---
title: Designing your meeting extension
author: heath-hamilton
description: Learn how to design apps in Teams meetings and get the Microsoft Teams UI Kit.
ms.author: lajanuar
ms.topic: conceptual
---
# Designing your Microsoft Teams meeting extension

You can create apps to make meetings more productive. For example, ask people to complete a survey during a call or send a quick reminder that doesn’t interrupt the flow of the meeting.

## Microsoft Teams UI Kit

You can find more comprehensive design guidelines, including elements that you can grab and modify as needed, in the Microsoft Teams UI Kit.

> [!div class="nextstepaction"]
> [Get the Microsoft Teams UI Kit (Figma)](https://www.figma.com/community/file/916836509871353159)

## Add a meeting extension

You can add a meeting extension before and during meetings. You also can add an app for a specific meeting directly from the Teams store (AppSource).

### Add before a meeting

In the meeting details, select **Add a tab +** to open the app flyout and find apps optimized for meetings.

:::image type="content" source="../../assets/images/apps-in-meetings/add-before-meeting.png" alt-text="Example shows how to add a meeting extension before a meeting." border="false":::

### Add during a meeting

In a meeting, select **More** :::image type="icon" source="../../assets/icons/teams-client-more.png"::: > **Add an app** and choose the app you want.

:::image type="content" source="../../assets/images/apps-in-meetings/add-during-meeting.png" alt-text="Example shows how to add a meeting extension during a meeting." border="false":::

## Before a meeting

Prior to your meeting, you can add content in the tab. The following example shows a draft survey question that people will answer during the call.

:::image type="content" source="../../assets/images/apps-in-meetings/before-meeting-tab.png" alt-text="Example shows how to app content in the meeting details before a call." border="false":::

### Anatomy: Meeting tab (before and after meetings)

:::image type="content" source="../../assets/images/apps-in-meetings/meeting-details-tab-anatomy.png" alt-text="Example shows the structural anatomy of a meeting tab before and after a meeting." border="false":::

|Counter|Description|
|----------|-----------|
|1|**Tab name**: Navigation label for your tab.|
|2|**Tab overflow**: Opens tab actions, such as rename and remove.|
|3|**iframe**: Displays your app content.|

### Designing with UI templates

Use one of the following Teams UI templates to help design your meeting tab:

* [List](../../concepts/design/design-teams-app-ui-templates.md#list): Lists can display related items in a scannable format and allow users to take actions on an entire list or individual items.
* [Task board](../../concepts/design/design-teams-app-ui-templates.md#task-board): A task board, sometimes called a kanban board or swim lanes, is a collection of cards often used to track the status of work items or tickets.
* [Dashboard](../../concepts/design/design-teams-app-ui-templates.md#dashboard): A dashboard is a canvas containing multiple cards that provide an overview of data or content.
* [Form](../../concepts/design/design-teams-app-ui-templates.md#form): Forms are for collecting, validating, and submitting user input in a structured way.
* [Empty state](../../concepts/design/design-teams-app-ui-templates.md#empty-state): The empty state template can be used for many scenarios, including sign in, first-run experiences, error messages, and more.
* [Left nav](../../concepts/design/design-teams-app-ui-templates.md#left-nav): The left nav template can help if your tab requires some navigation. In general, you should keep tab navigation to a minimum.

## Use an in-meeting tab

The in-meeting tab is a canvas for augmenting collaboration during meetings. Attendees can see and interact with app content in a dedicated space outside the meeting stage through shared or role-based views.

### Use cases

People might use the in-meeting tab to:

* Provide detailed feedback (for example, evaluate a job candidate)
* Quickly create a poll, survey, or task item for the meeting participants
* Display notes relevant to the meeting (for example, information about a sales lead)

:::image type="content" source="../../assets/images/apps-in-meetings/use-in-meeting-tab.png" alt-text="Example shows how you can present poll content in an in-meeting tab." border="false":::

### Anatomy: In-meeting tab

:::image type="content" source="../../assets/images/apps-in-meetings/in-meeting-tab-anatomy.png" alt-text="Example shows the structural anatomy of an in-meeting tab." border="false":::

|Counter|Description|
|----------|-----------|
|1|**App icon (selected)**: 16-pixel transparent app logo.|
|2|**App name**|
|3|**Header**: Includes your app name.|
|4|**Close button**: Dismisses the tab. Always use the upper-right close icon instead of an action in the footer.|
|5|**Notification bar**: Error alerts display directly below the header and push the iframe content down by 20 pixels.|
|6|**iframe**: Displays your app content.|

### Spacing

Optimize your in-meeting tab to fit edge-to-edge within the 280 pixel-wide iframe area. There are 20 pixels of padding on the left and right sides of the iframe and between the tab header. The iframe is full bleed to the bottom of the tab.

:::image type="content" source="../../assets/images/apps-in-meetings/in-meeting-tab-spacing.png" alt-text="Example shows in-meeting tab spacing dimensions." border="false":::

### Scrolling

Iframe contents should scroll vertically. You can only see the content you've scrolled to (nothing above or below). The scrollbar is part of the iframe content.

:::image type="content" source="../../assets/images/apps-in-meetings/in-meeting-tab-scrolling.png" alt-text="Example shows how the in-meeting tab scrolls." border="false":::

### Navigation

For scenarios with navigation layers or heavy content, we recommend allowing users to navigate to a secondary layer. Users must be able to go back to the previous layer.

:::image type="content" source="../../assets/images/apps-in-meetings/in-meeting-tab-nav.png" alt-text="Example shows in-meeting navigation." border="false":::

## Use an in-meeting dialog

In-meeting dialogs display on the Teams meeting stage. They require a user's attention, confirmation, or interaction but are subtle and don't interrupt the meeting. You should use these sparingly and for scenarios that are light and task oriented.

### Use cases

In-meeting dialogs are triggered by a user (such as the meeting organizer) who might want participants to:

* Provide brief feedback
* Take a short survey or poll
* Submit approvals
* Get reminders

:::image type="content" source="../../assets/images/apps-in-meetings/use-in-meeting-dialog.png" alt-text="Example shows how you can use an in-meeting dialog." border="false":::

### Anatomy: In-meeting dialog

:::image type="content" source="../../assets/images/apps-in-meetings/in-meeting-dialog-anatomy.png" alt-text="Example shows the structural anatomy of an in-meeting dialog." border="false":::

|Counter|Description|
|----------|-----------|
|1|**Header**: Includes app icon, name, action string, and close icon.|
|2|**iframe**: Displays your app content.|

### Anatomy: In-meeting dialog header

:::image type="content" source="../../assets/images/apps-in-meetings/in-meeting-dialog-header-anatomy.png" alt-text="Example shows the structural anatomy of an in-meeting dialog header." border="false":::

There are two header variants. When possible, use the variant with the avatar to reinforce that the dialog is coming from a person.

|Counter|Description|
|----------|-----------|
|1|**Avatar**: Person who initiates the in-meeting dialog.|
|2|**App icon**|
|3|**App name**|
|4|**Close button**: Dismisses the dialog.|
|5|**Action string**: Typically describes who initiated the dialog.|

### Responsive behavior

In-meeting dialogs can vary in size to account for different scenarios. Make sure to maintain padding and component sizes.

* **Width**: The iframe width is an absolute value within the range you specify.
* **Height**: The height of the dialog is determined by the content in the iframe. Vertical scroll takes over for content that exceeds the maximum height.

:::image type="content" source="../../assets/images/apps-in-meetings/in-meeting-dialog-responsive.png" alt-text="Example shows the in-meeting dialog. Width: Min--280 pixels (248 pixels iframe). Max--460 pixels (428 pixels iframe). Height: 300 pixels (iframe)." border="false":::

## After a meeting

You can go back to a meeting after it ends and view app content. In this example, the meeting organizer can look at poll results in the **Contoso** tab. (Note: From a design standpoint, there's no difference between a the pre- and post-meeting tab experience.)

:::image type="content" source="../../assets/images/apps-in-meetings/post-meeting-experience.png" alt-text="Example shows a post-meeting tab." border="false":::

## Best practices

### Interactions

:::row:::
   :::column span="":::
:::image type="content" source="../../assets/images/apps-in-meetings/interaction-do.png" alt-text="Example showing how to limit the number of interactions." border="false":::

#### Do: Limit the number of interactions

For in-meeting dialogs, remove unnecessary content that doesn't help users accomplish something quickly.

   :::column-end:::
   :::column span="":::
:::image type="content" source="../../assets/images/apps-in-meetings/interaction-dont.png" alt-text="Example showing how not to introduce unnecessary elements." border="false":::

#### Don't: Introduce unnecessary elements

A single in-meeting dialog with multiple interactions can distract from the call.

   :::column-end:::
:::row-end:::

### Layout

:::row:::
   :::column span="":::
:::image type="content" source="../../assets/images/apps-in-meetings/in-meeting-dialog-layout-do.png" alt-text="Example showing how you should use a single-column dialog layout." border="false":::

#### Do: Use a single-column dialog layout

Since the dialogs are at the center of the meeting stage, task completion should be fast and simple to avoid user frustration.

   :::column-end:::
   :::column span="":::
:::image type="content" source="../../assets/images/apps-in-meetings/in-meeting-dialog-layout-dont.png" alt-text="Example showing you shouldn't clutter the space of a meeting extension." border="false":::

#### Don't: Clutter the space

Dense or overly structured content can be distracting and overwhelming, especially during a meeting.

   :::column-end:::
:::row-end:::

:::row:::
   :::column span="":::
:::image type="content" source="../../assets/images/apps-in-meetings/in-meeting-tab-layout-do.png" alt-text="Example showing a single-column tab layout." border="false":::

#### Do: Use a single-column tab layout

Given the in-meeting tab's narrow nature, we strongly recommend displaying the contents in a single column.

   :::column-end:::
   :::column span="":::
:::image type="content" source="../../assets/images/apps-in-meetings/in-meeting-tab-layout-dont.png" alt-text="Example showing a tab with multiple columns." border="false":::

#### Don't: Use multiple columns

Due to the limited space of the in-meeting tab, layouts with more than one column aren’t recommended.

   :::column-end:::
:::row-end:::

### Controls

:::row:::
   :::column span="":::
:::image type="content" source="../../assets/images/apps-in-meetings/in-meeting-dialog-controls-do.png" alt-text="Example showing how to right align primary controls." border="false":::

#### Do: Right align the primary action

We recommend positioning the most visually heavy action to the right-most location.

   :::column-end:::
   :::column span="":::
:::image type="content" source="../../assets/images/apps-in-meetings/in-meeting-dialog-controls-dont.png" alt-text="Example showing how you shouldn't left align primary controls." border="false":::

#### Don't: Left or center align actions

This deviates from the standard Teams pattern for control placement in a dialog and may conflict with a dialog behind the top one.

   :::column-end:::
:::row-end:::

### Scroll

:::row:::
   :::column span="":::
:::image type="content" source="../../assets/images/apps-in-meetings/in-meeting-dialog-scroll-do.png" alt-text="Example showing vertical scrolling in an in-meeting tab." border="false":::

#### Do: Scroll vertically

Users expect vertical scrolling in Teams (and elsewhere).

   :::column-end:::
   :::column span="":::
:::image type="content" source="../../assets/images/apps-in-meetings/in-meeting-dialog-scroll-dont.png" alt-text="Example showing horizontal scrolling in an in-meeting tab." border="false":::

#### Don't: Scroll horizontally

Horizontal scrolling isn’t an expected behavior in Teams. Other canvases in the meeting environment scroll vertically.

   :::column-end:::
:::row-end:::

### Workflows

:::row:::
   :::column span="":::
:::image type="content" source="../../assets/images/apps-in-meetings/in-meeting-tab-workflow-do.png" alt-text="Example showing complex scenario in an in-meeting tab." border="false":::

#### Do: Surface complex scenarios in the in-meeting tab

If your app includes multiple tasks, we strongly recommend using an in-meeting tab with a single-column layout.

   :::column-end:::
   :::column span="":::
:::image type="content" source="../../assets/images/apps-in-meetings/in-meeting-dialog-workflow-dont.png" alt-text="Example showing complex scenarios in an in-meeting dialog." border="false":::

#### Don't: Make in-meeting dialogs complex

In-meeting dialogs are intended for brief interactions.

   :::column-end:::
:::row-end:::

### Theming

:::row:::
   :::column span="":::
:::image type="content" source="../../assets/images/apps-in-meetings/in-meeting-tab-theming-do.png" alt-text="Example showing a meeting extension with the dark theme." border="false":::

#### Do: Use Teams color tokens

Teams meetings are optimized for dark mode to help reduce visual and cognitive noise so users can focus on the discussion and shared content. Learn about using <a href="https://fluentsite.z22.web.core.windows.net/0.51.3/colors#color-scheme" target="_blank">color tokens (Fluent UI)</a>.

   :::column-end:::
   :::column span="":::
:::image type="content" source="../../assets/images/apps-in-meetings/in-meeting-tab-theming-dont.png" alt-text="Example showing a meeting extension with a default (light) theme." border="false":::

#### Don't: Hard code hex values

If you don’t use Teams color tokens, your designs will be less scalable and take more time to manage.

   :::column-end:::
:::row-end:::

### Navigation

:::row:::
   :::column span="":::
:::image type="content" source="../../assets/images/apps-in-meetings/in-meeting-tab-nav-do.png" alt-text="Example showing a meeting extension with a back button." border="false":::

#### Do: Have a back button

If you have more than one layer of navigation in an in-meeting tab, users must be able to go back to their previous views.

   :::column-end:::
   :::column span="":::
:::image type="content" source="../../assets/images/apps-in-meetings/in-meeting-tab-nav-dont.png" alt-text="Example showing a meeting extension with two dismiss buttons." border="false":::

#### Don't: Include another dismiss button

Providing an option to close in-meeting tab content may cause issues since there’s already a button in the header to dismiss the in-meeting tab itself.

   :::column-end:::
:::row-end:::

:::row:::
   :::column span="":::
   :::column-end:::
   :::column span="":::
:::image type="content" source="../../assets/images/apps-in-meetings/in-meeting-tab-nav-caution.png" alt-text="Example showing modals (or task modules) within an in-meeting tab." border="false":::

#### Caution: Avoid modals within the in-meeting tab

Modals (also known as task modules) in the already narrow in-meeting tab might wrap and obscure the content.

   :::column-end:::
:::row-end:::

## Validate your design

If you plan to publish your app to the Teams store (AppSource), you should understand the design issues that commonly cause apps to fail during submission.

> [!div class="nextstepaction"]
> [Check design validation guidelines](../../concepts/deploy-and-publish/appsource/prepare/frequently-failed-cases.md)
