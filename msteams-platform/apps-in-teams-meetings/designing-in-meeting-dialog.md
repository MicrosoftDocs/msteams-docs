---
title: Designing a Microsoft Teams in-meeting dialog
author: heath-hamilton
description: Guidance and best practices for designing an in-meeting dialog for Microsoft Teams.
ms.author: lajanuar
ms.topic: conceptual
---
# Designing an in-meeting dialog

In-meeting dialogs display on the Teams meeting stage. They require a user's attention, confirmation, or interaction but are subtle and don't interrupt the meeting.

## Use cases

In-meeting dialogs are triggered by a user (such as the meeting organizer) who might want participants to:

* Provide brief feedback
* Take a short survey or poll
* Submit approvals
* Get reminders

## Example

The following example shows what the in-meeting dialog might look like from a meeting participant's perspective. As you can see, the content and task are lightweight.

:::image type="content" source="../assets/images/calls-and-meetings/in-meeting-dialog-participant-view.png" alt-text="Example shows what the in-meeting dialog might look like from a meeting participant's perspective.":::

<a href="https://www.figma.com/community/file/888593778835180533" target="_blank">See the full scenario (Figma)</a>

<a href="https://www.figma.com/community/file/888593778835180533" target="_blank">See other example use cases (Figma)</a>

## Anatomy

:::image type="content" source="../assets/images/calls-and-meetings/in-meeting-dialog-anatomy.png" alt-text="UI anatomy of an in-meeting dialog view." border="false":::

1. **App icon**
1. **App name**
1. **Action string**
1. **Dismiss icon:** Closes a single dialog. Always use the upper-right close icon instead of an action in the footer.
1. **Webview**: Displays all third-party app content and buttons (standard Teams buttons recommended).

### Sizing

In-meeting dialogs can vary in size to account for different use cases, but you must always maintain padding and component sizes.

* **Height**: The height of the dialog is determined by the content in the webview. Vertical scroll takes over for content that exceeds the maximum height you specify.
* **Width**: The width of the webview is an absolute value within the range you specify.

:::image type="content" source="../assets/images/calls-and-meetings/in-meeting-dialog-sizing.png" alt-text="Illustration showing the possible dimensions of an in-meeting dialog. Height: The height of the dialog is determined by the content in the webview. Vertical scroll takes over for content that exceeds the maximum height (defined by you). Min: None. Max: 400 pixels (320 pixels webview). Width: The width of the webview is an absolute value within the range you specify. Min.: 288 pixels (256 pixels webview). Max: 468 pixels (436 pixels webview)." border="false":::

## Behavior

See general in-meeting dialog behavior, such as rest, loading, and more, in <a href="https://www.figma.com/community/file/888593778835180533" target="_blank">Figma</a>.

### Position

In-meeting dialogs are aligned in the center of the meeting stage. They can’t be dragged and work within the framework of Teams system-level notifications.

:::image type="content" source="../assets/images/calls-and-meetings/in-meeting-dialog-position.png" alt-text="Illustration showing the UI anatomy of an in-meeting dialog." border="false":::

### Aggregation

Only one dialog displays at a time, stack ranking from last to most recent sent to the bottom. Once a dialog is resolved or dismissed, the next one take its place.

<a href="https://www.figma.com/community/file/888593778835180533" target="_blank">See an example (Figma)</a>

### Scrolling

Scrolling occurs in the webview portion of an in-meeting dialog. Remember the following about scrolling:

* You should only be able to scroll vertically.
* You can only see the content you've scrolled to (nothing above or below).

:::image type="content" source="../assets/images/calls-and-meetings/in-meeting-dialog-scroll.png" alt-text="Illustration showing how scrolling the webview content in the in-meeting dialog works." border="false":::

### Buttons

In-meeting dialog buttons are part of the webview ([see some examples](#best-practices)).

Unlike similar components, in-meeting dialogs are dismissed once a user selects a button.

## Components

In-meeting dialogs are built primarily with the following <a href="https://www.figma.com/community/file/888593778835180533" target="_blank">UI components (Figma)</a>, which are based on the <a href="https://fluentsite.z22.web.core.windows.net/" target="_blank">Fluent Design System</a>.

Component | Guidelines | Example
 - | - | -
Button | Primary and secondary buttons can be medium or small | Send a response
Input | Field for brief user input. Label text can include an icon  | Enter feedback
Dropdown | Select one or more options from a list. Can include search and multi-selection features | Choose a language
Selection controls | Use checkboxes for multiple choices or radio buttons and toggles for single choices. For more detailed selections, use a slider | Vote in a poll
Alerts | Whether displaying an urgent message, error state, or warning, the message should be short and won't interrupt the user's current task | Display issue when submitting a response

## Theming

### Colors

Use the <a href="https://www.figma.com/community/file/888593778835180533" target="_blank">recommended color scheme (Figma)</a> for backgrounds, foregrounds, and conveying states.

### Typography

Use the <a href="https://www.figma.com/community/file/888593778835180533" target="_blank">recommended font sizes and weights (Figma)</a> for titles, body text, and metadata text.

## Best practices

While in-meeting dialogs can make calls more effective, they also can derail calls if too obtrusive. In general, use the dialogs sparingly and follow these best practices.

### Navigation

:::row:::
   :::column span="":::
:::image type="content" source="../assets/images/calls-and-meetings/in-meeting-dialog-steps-do.png" alt-text="Illustration showing how to limit in-meeting dialog content to a single screen so users can focus on the meeting." border="false":::

#### Do: Keep it contained

Limit in-meeting dialog content to a single screen so users can focus on the meeting.

   :::column-end:::
   :::column span="":::
:::image type="content" source="../assets/images/calls-and-meetings/in-meeting-dialog-steps-dont.png" alt-text="Illustration showing how in-meeting dialogs shouldn't require users to navigate through content." border="false":::

#### Don't: Include multiple steps

In-meeting dialogs shouldn't require users to navigate through content.

   :::column-end:::
:::row-end:::

### Interactions

:::row:::
   :::column span="":::
:::image type="content" source="../assets/images/calls-and-meetings/in-meeting-dialog-interactions-do.png" alt-text="Illustration showing why you should remove unnecessary content that doesn't help users accomplish something quickly." border="false":::

   :::column-end:::
   :::column span="":::
:::image type="content" source="../assets/images/calls-and-meetings/in-meeting-dialog-interactions-dont.png" alt-text="Another illustration showing why you should remove unnecessary content that doesn't help users accomplish something quickly." border="false":::

   :::column-end:::
:::row-end:::

:::row:::
   :::column span="":::
:::image type="content" source="../assets/images/calls-and-meetings/in-meeting-dialog-tab-do.png" alt-text="Illustration showing that, if you need complex interactions, it's recommended you use a single column on the meeting right pane instead." border="false":::

#### Do: Limit number of interactions

Remove unnecessary content that doesn't help users accomplish something quickly. If you need complex interactions, we strongly recommend displaying your content using a single column on the in-meeting tab instead.

   :::column-end:::
   :::column span="":::
:::image type="content" source="../assets/images/calls-and-meetings/in-meeting-dialog-tab-dont.png" alt-text="Illustration showing that too many interactions in the in-meeting dialog distracts from the meeting." border="false":::

#### Don't: Introduce unnecessary elements

You may be able to design a single in-meeting dialog with multiple interactions, but too many can distract from the meeting.

   :::column-end:::
:::row-end:::

### Layout

:::row:::
   :::column span="":::
:::image type="content" source="../assets/images/calls-and-meetings/in-meeting-dialog-layout-do.png" alt-text="Illustration showing an ideal layout for in-meeting dialogs." border="false":::

#### Do: Use single-column layouts

Since the dialogs are at the center of the meeting stage, task completion should be fast and simple to avoid user frustration.

   :::column-end:::
   :::column span="":::
:::image type="content" source="../assets/images/calls-and-meetings/in-meeting-dialog-layout-dont.png" alt-text="Illustration showing layout for in-meeting dialogs that isn't recommended." border="false":::

#### Don't: Clutter the space

Dense or overly structured content can be distracting and overwhelming, especially during a meeting.

   :::column-end:::
:::row-end:::

### Size

:::row:::
   :::column span="":::
:::image type="content" source="../assets/images/calls-and-meetings/in-meeting-dialog-size-do.png" alt-text="Illustration showing how the in-meeting dialog size should always be the same." border="false":::

#### Do: Keep it consistent

This is important because in-meeting dialogs always display in the same location.

   :::column-end:::
   :::column span="":::
:::image type="content" source="../assets/images/calls-and-meetings/in-meeting-dialog-size-dont.png" alt-text="Illustration showing how you shouldn't use different dialog sizes." border="false":::

#### Don't: Always fit to the content

You may be trying to avoid horizontal scrolling, but multiple in-meeting dialog sizes within the same app is an inconsistent experience.

   :::column-end:::
:::row-end:::

### Controls

:::row:::
   :::column span="":::
:::image type="content" source="../assets/images/calls-and-meetings/in-meeting-dialog-controls-do.png" alt-text="Illustration showing where to place buttons on the in-meeting dialog." border="false":::

#### Do: Right align the primary action

We recommend positioning the most visually heavy action to the right-most location.

   :::column-end:::
   :::column span="":::
:::image type="content" source="../assets/images/calls-and-meetings/in-meeting-dialog-controls-dont.png" alt-text="Illustration showing where not to place buttons on the in-meeting dialog." border="false":::

#### Don't: Left or center align actions

This deviates from the standard Teams pattern for control placement in a dialog and may conflict with a dialog behind the top one.

   :::column-end:::
:::row-end:::

## Accessibility

For information on accessibility, see <a href="https://www.figma.com/community/file/888593778835180533" target="_blank">Figma</a>.

## Resources

* <a href="https://www.figma.com/community/file/888593778835180533" target="_blank">Microsoft Teams meeting extensions Figma file</a>

## Validate your design

If you plan to publish your app to AppSource, you should understand the design issues that commonly cause apps to fail during submission.

> [!div class="nextstepaction"]
> [Check design validation guidelines](../concepts/deploy-and-publish/appsource/prepare/frequently-failed-cases.md#validation-guidelines)
