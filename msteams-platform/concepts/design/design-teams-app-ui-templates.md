---
title: Designing your app with UI templates
author: heath-hamilton
description: Design your app faster with standardized UI components, layouts, and patterns commonly seen across Microsoft Teams.
ms.author: lajanuar
ms.topic: overview
---
# Designing your Microsoft Teams app with UI templates

Design your Microsoft Teams app faster with UI templates. The templates are a collection of basic UI components that work across Teams, giving you more time to figure out the best experience for your users.

## Microsoft Teams UI Kit

You can grab UI templates from the Microsoft Teams UI Kit, which also includes extensive information about usage, anatomy, accessibility, and best practices.

> [!div class="nextstepaction"]
> [Get the Microsoft Teams UI Kit (Figma)](https://www.figma.com/community/file/916836509871353159)

## List

You can use a list to display related items in a scannable format and allow users to take actions on an entire list or individual items.

:::image type="content" source="../../assets/images/ui-templates/list.png" alt-text="Example shows a list UI template." border="false":::

### Top use cases

* Display data
* Contextual actions on app content

## Dashboard

A dashboard displays different types of content in a central location (Teams personal app or tab). Users should be able to customize at least some of what they see on a dashboard.

:::image type="content" source="../../assets/images/ui-templates/dashboard.png" alt-text="Example shows a dashboard UI template." border="false":::

### Top use cases

* Analyze data
* Report metrics
* Organize different information in one place

## Form

Forms are used to collect, validate, and submit user input in a structured way. Clear labeling and logical groupings of input fields are critical for a good user experience.

:::image type="content" source="../../assets/images/ui-templates/form.png" alt-text="Example shows a form UI template." border="false":::

### Top use cases

* Sign in
* User profiles
* Settings
* User input collection

## Sign in

You can design app sign-in flows for different Teams contexts and identity providers. The following example includes single sign-on (SSO), which we recommend for the simplest authentication experience.

:::image type="content" source="../../assets/images/ui-templates/sign-in.png" alt-text="Example shows a sign in UI template." border="false":::

### Top use case

* Authenticate users

## Task board

A task board, sometimes called a kanban board or swim lanes, is a collection of cards often used to track the status of work items or tickets. It can also be used to sort any type of content into categories. You can edit and move the cards between columns.

:::image type="content" source="../../assets/images/ui-templates/task-board.png" alt-text="Example shows a task board UI template." border="false":::

### Top use cases

* Project management. Assigning tasks and tracking status
* Brainstorming. Adding ideas in different categories
* Sorting exercises. Organizing any kind of information into buckets

## Data visualization

You can use different card sizes (single, double, and full) to stack and organize data visualizations on the same page. The cards scale to fit the column layout and fill in blank spaces.

:::image type="content" source="../../assets/images/ui-templates/data-viz.png" alt-text="Example shows a data visualization UI template." border="false":::

### Top use cases

* Display complex information
* Create a dashboard

## Wizard

A wizard guides a user through several screens to complete a task (such as a setup process).

:::image type="content" source="../../assets/images/ui-templates/wizard.png" alt-text="Example shows a wizard UI template." border="false":::

### Top use cases

* Setup
* Onboarding
* First-run experiences

## Empty state

The empty state template can be used for many scenarios, including sign in, first-run experiences, error messages, and more. It’s highly flexible⁠—adapt it to use one, a few, or all of the components in the following design.

:::image type="content" source="../../assets/images/ui-templates/empty-state.png" alt-text="Example shows a wizard UI template." border="false":::

### Top use cases

* Sign in
* Welcome messages and first-run experiences
* Success messages
* Error messages

## Notification bar

A notification bar is a dedicated area for displaying a brief, important messages that do not require the user to take immediate action. Specific background colors and icons are associated with specific types of messages (see below).

:::image type="content" source="../../assets/images/ui-templates/notification-bar.png" alt-text="Example shows notification bar templates." border="false":::

### Top use cases

* Critical messages, errors, and warnings
* Success messages
* Informational or promotional messages

## Left nav

Use the left nav to browse multiple pages within your Teams tab. In the following example, the left nav is between the channel list and tab content.

:::image type="content" source="../../assets/images/ui-templates/left-nav.png" alt-text="Example shows a left nav template." border="false":::

### Top use cases

* Browse multiple pages within a Teams tab
* Break down complex apps into multiple pages

## Breadcrumb

Breadcrumbs are a navigational aid that convey your app’s hierarchy. They help users understand how the page they’re viewing fits into the overall experience and afford one-click access to higher levels in that hierarchy.

:::image type="content" source="../../assets/images/ui-templates/breadcrumb.png" alt-text="Example shows a breadcrumb template." border="false":::

### Top use cases

* Communicate hierarchy
* Navigation

## Toolbar

A toolbar is a container for grouping a set of controls.

:::image type="content" source="../../assets/images/ui-templates/toolbar.png" alt-text="Example shows a toolbar template." border="false":::

### Top use cases

* Contextual actions on app content
* Contextual filter and find
* Navigation and breadcrumbs

## Stage

Stage offers a way for users to open an entity—like an image, file, or website—in Teams instead of opening it in another app or browser. The primary use case of stage is viewing; the surface should not be used for complex interactions.

(Implementation note: Build your stage using a large task module.)

:::image type="content" source="../../assets/images/ui-templates/stage.png" alt-text="Example shows a stage template." border="false":::

### Top use cases

* Open an entity in Teams instead of another app or browser
* Spotlight media or other content
