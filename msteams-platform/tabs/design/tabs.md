---
title: Designing your tab for desktop and web
description: Design guidelines for Microsoft Teams tabs (desktop and web).
ms.topic: conceptual
---
# Designing your tab for Microsoft Teams desktop and web

Tabs are essentially focused webpages that facilitate collaboration. To guide your app design, the following information describes and illustrates how people can add, use, and manage tabs.

## Microsoft Teams UI Kit

You can find comprehensive tab design guidelines, including elements that you can grab and modify as needed, in the Microsoft Teams UI Kit. The kit also covers essential topics such as accessibility and responsive sizing.

> [!div class="nextstepaction"]
> [Get the Microsoft Teams UI Kit (Figma)](https://www.figma.com/community/file/888593778835180533)

## Add a tab

You can add a tab from the Teams store or in one of the following contexts:

* Chat
* Channel
* Meeting (before, during, or after the meeting)

The following example shows how a tab is added in a channel.

:::image type="content" source="../../assets/images/tabs/design-add-tab.png" alt-text="Example shows a tab being added in a channel." border="false":::

## Set up a tab

There's a short setup process to add an app as a channel, chat, or meeting tab. The experience is largely up to you. For example, you could have a description of how to use the app and some optional settings. Include a sign-in step here if you need to authenticate users.

### Tab configuration modal

:::image type="content" source="../../assets/images/tabs/design-set-up-tab-config.png" alt-text="Example shows a tab configuration modal." border="false":::

### Anatomy: Tab configuration modal

:::image type="content" source="../../assets/images/tabs/test.png" alt-text="Illustration showing the UI anatomy of a tab configuration modal." border="false":::

|Counter|Description|
|----------|-----------|
|1|**App logo**: Full color app logo of your app.|
|2|**App name**: Full name of your app|
|3|**iframe**: Responsive space for your app’s content (for example, tab settings or authentication).|
|4|**About link**: Opens a dialog showing more information about the app, such as a full description, permissions required by the app, and links to your privacy policy and terms of service.
|5|**Close button**: Closes the modal.|
|6|**Notify team members option**: The modal asks if you want to create a post letting others know you added a tab.|
|7|**Back button**: Goes to the previous step based on where the dialog opened.|
|8|**Save button**: Completes tab setup.|

### Tab authentication with single sign-on

You can add a step in which users must first sign in with their Microsoft credentials. This authentication method is called single sign-on (SSO).

:::image type="content" source="../../assets/images/tabs/design-set-up-tab-auth.png" alt-text="Example shows a tab authentication screen." border="false":::

### Designing your tab setup with UI templates

Use one of the following Teams UI templates to help design your tab setup experience:

* [List](../../concepts/design/design-teams-app-ui-templates.md): Lists can display related items in a scannable format and allow users to take actions on an entire list or individual items.
* [Form](../../concepts/design/design-teams-app-ui-templates.md): Forms are for collecting, validating, and submitting user input in a structured way.
* [Empty state](../../concepts/design/design-teams-app-ui-templates.md): The empty state template can be used for many scenarios, including sign in, first-run experiences, error messages, and more.

## View a tab

Tabs provide a full-screen web experience in Teams where you can display collaborative content—such task boards and dashboards—and important information.

:::image type="content" source="../../assets/images/tabs/design-view-tab.png" alt-text="Example shows a tab with a task board." border="false":::

### Anatomy: Tab

:::image type="content" source="../../assets/images/tabs/design-view-tab-anatomy.png" alt-text="Illustration showing the UI anatomy of a tab." border="false":::

|Counter|Description|
|----------|-----------|
|1|**Tab name**: Navigation label for your tab.|
|2|**Tab overflow**: Opens tab actions, such as rename and remove.|
|3|**Tab chat**: Opens a chat thread on the right, allowing users to have a conversation next to the content.|
|4|**iframe**: Displays your tab’s content.

### Designing your tab with UI templates

Use one of the following Teams UI templates to help design your tab experience:

* [List](../../concepts/design/design-teams-app-ui-templates.md): Lists can display related items in a scannable format and allow users to take actions on an entire list or individual items.
* [Task board](../../concepts/design/design-teams-app-ui-templates.md): A task board, sometimes called a kanban board or swim lanes, is a collection of cards often used to track the status of work items or tickets.
* [Dashboard](../../concepts/design/design-teams-app-ui-templates.md): A dashboard is a canvas containing multiple cards that provide an overview of data or content.
* [Form](../../concepts/design/design-teams-app-ui-templates.md): Forms are for collecting, validating, and submitting user input in a structured way.
* [Empty state](../../concepts/design/design-teams-app-ui-templates.md): The empty state template can be used for many scenarios, including sign in, first-run experiences, error messages, and more.
* [Left nav](../../concepts/design/design-teams-app-ui-templates.md): The left nav template can help if your tab requires some navigation. In general, you should keep tab navigation to a minimum.

## Use a tab to collaborate

Tabs help facilitate conversations about content in a central location.

### Thread discussion

Users can automatically post to a channel or chat once they’ve added a new tab. This not only notifies team members of the new content and provides a link to tab, it allows people to start talking about the tab.

:::image type="content" source="../../assets/images/tabs/design-use-tab-channel.png" alt-text="Example shows a tab being discussed in a channel thread." border="false":::

### Side-by-side discussion

Users can have a conversation next while viewing the tab’s content.

:::image type="content" source="../../assets/images/tabs/design-use-tab-side-chat.png" alt-text="Example shows a tab with a chat open on the right side." border="false":::

### Permissions and role-based views

The tab experience may be different for users depending on their permissions. For example, one user can access the tab without having to sign in. Another user, however, must sign and will see slightly different content.

## Manage a tab

You can include options to rename, remove, or modify a tab.

### Anatomy: Tab menu

:::image type="content" source="../../assets/images/tabs/design-manage-tab-menu-anatomy.png" alt-text="Illustration showing the UI anatomy of a tab menu." border="false":::

|Counter|Description|
|----------|-----------|
|1|**Settings**: (Optional) Allows users to modify a tab’s settings after it’s been added.|
|2|**Rename**: Allows users to give the tab a name that’s more meaningful to the team.|
|3|**Remove**: Removes the tab from the channel, chat, or meeting.|

## Tab notifications and deep linking

You can send a message with a deep link to your tab. For example, a card shows a summary of bug data a user can select to see the entire bug in a tab. Sending messages about tab activity increases awareness without explicitly notifying everyone (i.e., activity without noise). You also can @mention specific users if needed.

Notify users of tab activity one of the following ways:

* **Bot**: This method is preferred especially if the tab thread is targeted. The tab’s threaded conversation is moved into view as recently active. This method also allows for some sophistication in how the notification is sent.
* **Message**: A message shows up in the user’s activity feed with a [deep link to the tab](../../concepts/build-and-test/deep-links.md?view=msteams-client-js-latest&preserve-view=true).

## Best practices

### Collaboration

:::row:::
   :::column span="":::
:::image type="content" source="../../assets/images/tabs/design-tab-collaboration-do.png" alt-text="Illustration showing what to do with tab navigation design." border="false":::

#### Do: Facilitate conversation

Include content and components people can talk about. If it doesn’t fit within the context of a chat, channel, or meeting, it doesn’t belong in your tab.

   :::column-end:::
   :::column span="":::
:::image type="content" source="../../assets/images/tabs/design-tab-collaboration-dont.png" alt-text="Illustration showing what not to do with tab navigation design." border="false":::

#### Don't: Treat your tab like any other webpage

A tab isn’t a webpage someone might view once. A tab should display your most important, relevant content that people need to accomplish something together.

   :::column-end:::
:::row-end:::

### Navigation

:::row:::
   :::column span="":::
:::image type="content" source="../../assets/images/tabs/design-tab-nav-do.png" alt-text="Illustration showing what to do with tab navigation design." border="false":::

#### Do: Limit tasks and data

Tabs work best when they address specific needs. Include a limited set of tasks and data relevant to the team or group.

   :::column-end:::
   :::column span="":::
:::image type="content" source="../../assets/images/tabs/design-tab-nav-dont.png" alt-text="Illustration showing what not to do with tab navigation design." border="false":::

#### Don't: Embed your entire app

Using a tab to display an entire app with multi-level navigation and complex interactions leads to information overload.

   :::column-end:::
:::row-end:::

### Setup

:::row:::
   :::column span="":::
:::image type="content" source="../../assets/images/tabs/design-tab-setup-do.png" alt-text="Illustration showing what to do with tab setup design." border="false":::

#### Do: Keep it simple

If your app requires authentication, try integrating Microsoft single sign-on (SSO) for a more seamless sign-in experience. Also, only include essential information and steps to add the tab. 

   :::column-end:::
   :::column span="":::
:::image type="content" source="../../assets/images/tabs/design-tab-setup-dont.png" alt-text="Illustration showing what not to do with tab setup design." border="false":::

#### Don't: Have too many steps

Remove any unnecessary steps for adding a tab.

   :::column-end:::
:::row-end:::

### Theming

:::row:::
   :::column span="":::
:::image type="content" source="../../assets/images/tabs/design-tab-theming-do.png" alt-text="Illustration showing what to do with tab theming." border="false":::

#### Do: Take advantage of Teams color tokens

Each Teams theme has its own color scheme. To handle theme changes automatically, use [color tokens](https://fluentsite.z22.web.core.windows.net/0.51.3/colors#color-scheme) in your design.

   :::column-end:::
   :::column span="":::
:::image type="content" source="../../assets/images/tabs/design-tab-theming-dont.png" alt-text="Illustration showing what not to do with tab theming." border="false":::

#### Don't: Hard code color values

If you don’t use Teams color tokens, your designs will be less scalable and take more time to manage.

   :::column-end:::
:::row-end:::

## Validate your design

If you plan to publish your app to AppSource, you should understand the design issues that commonly cause apps to fail during submission.

> [!div class="nextstepaction"]
> [Check design validation guidelines](../../concepts/deploy-and-publish/appsource/prepare/frequently-failed-cases.md#validation-guidelines--most-failed-test-cases)
