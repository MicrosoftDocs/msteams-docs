---
title: Design your tab
description: Design guidelines for Microsoft Teams tabs.
ms.topic: conceptual
---
# Designing your Microsoft Teams tab

Tabs are essentially focused webpages that facilitate collaboration. To guide your app design, the following information describes and illustrates how people can add, use, and manage tabs.

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

### Anatomy

:::image type="content" source="../../assets/images/tabs/design-set-up-tab-anatomy.png" alt-text="Illustration showing the UI anatomy of a tab configuration modal." border="false":::

1. **App logo**: Full color app logo of your app.
1. **App name**: Full name of your app.
1. **iframe**: Responsive space for your app’s content (for example, tab settings or authentication).
1. **About link**: Opens a dialog showing more information about the app, such as a full description, permissions required by the app, and links to your privacy policy and terms of service.
1. **Close button**: Closes the modal.
1. **Notify team members option**: The modal asks if you want to create a post letting others know you added a tab.
1. **Back button**: Goes to the previous step based on where the dialog opened.
1. **Save button**: Completes tab setup.

### Tab authentication with SSO

You can add a step in which users must first sign in with their Microsoft credentials. This authentication method is called single sign-on (SSO).

### Authentication

xxx

### Getting started with UI templates

xxxx

## Manage a tab

xxx

### Anatomy

xxx

## Best practices

### Always include a default state

Include a default state to make tabs easy to set up even if your tab is configurable.

### Naming

In many cases, the name of your app will make a great tab name. But, also consider naming your tabs according to the functionality they provide.

### Multi-window

Channel tabs that have complex editing capabilities must open the editor view in multi-window rather than a tab.

### No horizontal scrolling

Tab should not have horizontal scrolling.

### Easy navigation

Navigation inside a tab app must be easy to follow i.e. pages have the following where necessary/applicable:
* Back buttons
* Page headers
* Breadcrumbs
* Hamburger menus

### Undo last action

User must be able to undo their last action in the app.

### Share content

Personal apps should enable users to share content from a personal app experience with other team members. Channel tab must provide navigation that complements the main Teams navigation, rather than conflicting with it (such as left rail nav-bars).

### Single view

Personal apps should present content from team or group chat scoped instances of that app in a single view, e.g., a Trello user should be able to see all instances of Trello boards they participate in at a team level in their personal app.

### No app bar

Tabs should not provide an app bar with icons in the left rail that conflicts with the main Teams navigation.

### Navigation

Tabs should not have more than 3 levels of navigation within the app.

### L2/L3 view

Secondary and tertiary pages in a tab should be opened in an L2/L3 view in the main tab area that is navigated via the breadcrumb.

### No link to external browser

Link targets in tabs should not link to an external browser but should link to div elements contained within Teams, e.g., inside task Modules, tabs, etc.

### Tab design best practices

* Personal/Static tabs should enable users to share content from a personal app experience with another team members.
* Personal/Static tabs may present content from team or group chat scoped instances of that app in a single view.
* Link targets in tabs should not link to an external browser but should link to div elements contained within Teams (example-inside, task modules, tabs, etc).
* Tabs should be responsive to Team’s themes. When the Teams theme is changed, the theme within the app should also change to reflect that theme.
* Tabs should use Teams-styled components where possible. It means adopting Teams fonts, type ramps, color palettes, grid system, motion, tone of voice, etc.
* Tabs should use Teams interaction behaviors for in-page navigation, position, and use of dialogs, information hierarchies, etc.
* Tabs should use the standard Teams hamburger menu and/or breadcrumb for in-app navigation. Tabs should not provide an app bar with icons in the left rail that conflicts with the main Teams navigation.
* Tabs should not have more than three levels of navigation within the app.
* Secondary and tertiary pages in a tab should be opened in an L2/L3 view in the main tab area that is navigated via the breadcrumb.
* Tabs that have complex editing capabilities within the app should open the editor view in multi-window rather than a tab (for desktop and web).

## Notifications for tabs

There are two modes of notification for tab content changes:

> [!div class="checklist"]
>
> * **Use the app API to notify users of changes**. This message will show up in the user’s activity feed and deep link to the tab. *See*  [Create deep links to content and features in Microsoft Teams](../../concepts/build-and-test/deep-links.md?view=msteams-client-js-latest&preserve-view=true )

> * **Use a bot**. This method is preferred especially if the Tab thread is targeted. The result will be that the tab’s threaded conversation will be moved into view as recently active. This method also allows for some sophistication in how the notification is sent.

Sending a message to a tab thread increases the awareness of activity to all users without explicitly notifying everyone. This is awareness without noise. In addition, when you `@mention`  specific users the same notification will be placed in their feed, deep linking them to the tab thread directly.

### Deep linking

When possible, cards and bots should deep link to richer data in a hosted tab. For example, a card may show a summary of bug data, but clicking it can shows the entire bug in a tab.

## Get the Microsoft Teams UI Kit

sss
