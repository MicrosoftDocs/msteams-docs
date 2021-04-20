---
title: Designing your personal app
description: Learn how to design a Teams personal app and get the Microsoft Teams UI Kit.
author: heath-hamilton
ms.topic: conceptual
localization_priority: Normal
ms.author: lajanuar
--- 
# Designing your personal app for Microsoft Teams

A personal app can be a bot, private workspace, or both. Sometimes it functions like a place to create or view content, other times it offers the user a bird’s eye view of everything that's theirs when the app has been configured as a tab in multiple channels.

To guide your app design, the following information describes and illustrates how people can add, use, and manage personal apps in Teams.

## Microsoft Teams UI Kit

You can find comprehensive personal app design guidelines, including elements that you can grab and modify as needed, in the Microsoft Teams UI Kit. The UI kit also has essential topics such as accessibility and responsive sizing that aren't covered here.

> [!div class="nextstepaction"]
> [Get the Microsoft Teams UI Kit (Figma)](https://www.figma.com/community/file/916836509871353159)

## Add a personal app

You can add a personal app from the Teams store (AppSource) or the app flyout by selecting the **More** icon on the left side of Teams (shown in the following example).

:::image type="content" source="../../assets/images/personal-apps/add-from-app-flyout.png" alt-text="Example shows how to add a personal app from the app flyout." border="false":::

## Use a personal app (private workspace)

With a private workspace, you can view app content that's meaningful to you in a central location without leaving Teams.

(Implementation note: The private workspace is based on the [*personal tab*](../../build-your-first-app/build-personal-tab.md) capability.)

### Anatomy: Personal app (private workspace)

:::image type="content" source="../../assets/images/personal-apps/personal-tab-component-anatomy.png" alt-text="Example shows personal tab's component anatomy." border="false":::

|Counter|Description|
|----------|-----------|
|A|**App attribution**: Your app logo and name.|
|B|**Tabs**: Provides navigation for your personal app. For example, include an **About** or **Help** tab.|
|C|**Popout view**: Pushes your app content from a parent window to a standalone child window.|
|D|**More menu**: Includes additional app information and options. (You could alternatively make **Settings** a tab.)|

:::image type="content" source="../../assets/images/personal-apps/personal-tab-structural-anatomy.png" alt-text="Example shows personal tab's structural anatomy." border="false":::

|Counter|Description|
|----------|-----------|
|A|**Tabs**: Provides navigation for your personal app.|
|1|**iframe**: Displays your app content.|

### Designing with UI templates

Use one of the following Teams UI templates to help design your personal tab:

* [List](../../concepts/design/design-teams-app-ui-templates.md#list): Lists can display related items in a scannable format and allow users to take actions on an entire list or individual items.
* [Task board](../../concepts/design/design-teams-app-ui-templates.md#task-board): A task board, sometimes called a kanban board or swim lanes, is a collection of cards often used to track the status of work items or tickets.
* [Dashboard](../../concepts/design/design-teams-app-ui-templates.md#dashboard): A dashboard is a canvas containing multiple cards that provide an overview of data or content.
* [Form](../../concepts/design/design-teams-app-ui-templates.md#form): Forms are for collecting, validating, and submitting user input in a structured way.
* [Empty state](../../concepts/design/design-teams-app-ui-templates.md#empty-state): The empty state template can be used for many scenarios, including sign in, first-run experiences, error messages, and more.
* [Left nav](../../concepts/design/design-teams-app-ui-templates.md#left-nav): The left nav template can help if your tab requires some navigation. In general, you should keep tab navigation to a minimum.

## Use a personal app (bot)

Personal apps can include a bot for one-on-one conversations and private notifications (for instance, when a colleague posts a comment on your artboard). The bot is available in a tab you specify.

### Anatomy: Personal app (bot)

:::image type="content" source="../../assets/images/personal-apps/personal-bot-anatomy.png" alt-text="Example shows personal bot component anatomy." border="false":::

|Counter|Description|
|----------|-----------|
|A|**Bot tab**: For example, include a **Chat** tab to access bot conversations and notifications.|
|B|**Bot message**: Bots often send messages and notifications in the form of a card (such as an Adaptive Card).|
|C|**Compose box**: Input field for sending messages to the bot.|

## Best practices

### Tab priority

#### Do: Show the most relevant content in the first tab

With responsive sizing, tabs on the right may become truncated or out of view.

:::image type="content" source="../../assets/images/personal-apps/personal-tab-priority-do.png" alt-text="Example shows a personal app best practice." border="false":::

#### Don’t: Lead with secondary content or metadata

Like a standard web app, tab navigation should progress in an order that helps make sense of your app’s primary features.

:::image type="content" source="../../assets/images/personal-apps/personal-tab-priority-dont.png" alt-text="Example of a personal app best practice." border="false":::

### Tab hierarchy

#### Do: Tabs should be of equal hierarchy and represent key app pages

Your tabs should categorize your app’s primary features and content. With responsive sizing, content on the right may become truncated or out of view.

:::image type="content" source="../../assets/images/personal-apps/personal-tab-hierarchy-do.png" alt-text="Example shows personal app best practice." border="false":::

#### Don't: Include different levels of hierarchy

Your content should progress in a logical order that helps users make sense of it. If you have two tabs that are closely related, consider combining them into one tab.

:::image type="content" source="../../assets/images/personal-apps/personal-tab-hierarchy-dont.png" alt-text="Example displays a personal app best practice." border="false":::

### First-run experience

#### Do: Include a first-run experience

There should be at least a welcome screen the first time you use a personal app. For bots, describe what your bot can do and provide quick actions, such as a sign-in button.

:::image type="content" source="../../assets/images/personal-apps/personal-tab-fre-do.png" alt-text="Illustration shows a personal app best practice." border="false":::

:::image type="content" source="../../assets/images/personal-apps/personal-bot-fre-do.png" alt-text="Illustration of a personal app best practice." border="false":::

#### Don't: Start with a blank screen

Users might be confused if nothing displays the first time they run your app.

:::image type="content" source="../../assets/images/personal-apps/personal-tab-fre-dont.png" alt-text="Illustration displays a personal app best practice." border="false":::

### Personalized content

#### Do: Aggregate app content relevant to a user

Whether it's a personal tab or bot, display content related to only a user's activity in your app.

:::image type="content" source="../../assets/images/personal-apps/personal-tab-personalized-content-do.png" alt-text="Example provides a personal app best practice." border="false":::

:::image type="content" source="../../assets/images/personal-apps/personal-bot-personalized-content-do.png" alt-text="The example shows a personal app best practice." border="false":::

#### Don’t: Show unrelated or overly broad content

In personal contexts, don’t display content for teams a user isn't part of. Personal bot content should focus on the individual—not a group.

:::image type="content" source="../../assets/images/personal-apps/personal-tab-personalized-content-dont.png" alt-text="Disclosed is an example of a personal app best practice." border="false":::

:::image type="content" source="../../assets/images/personal-apps/personal-bot-personalized-content-dont.png" alt-text="Sample shows a personal app best practice." border="false":::

### Complex app features

#### Do: Allow users to access complex features in a browser

Your app should focus on core tasks in Teams, but you can still view the full, standalone app in a browser.

:::image type="content" source="../../assets/images/personal-apps/personal-tab-feature-do.png" alt-text="Sample shows personal app best practice." border="false":::

#### Don’t: Include your entire app

Unless you created your app specifically for Teams, you probably have features that don’t make sense in a collaboration tool.

:::image type="content" source="../../assets/images/personal-apps/personal-tab-feature-dont.png" alt-text="Illustration provides personal app best practice." border="false":::

## Manage a personal tab

On the left side of Teams, users can right click the personal app to pin, remove, and configure other app options.

:::image type="content" source="../../assets/images/personal-apps/manage-personal-tab.png" alt-text="Example shows options for managing a personal app." border="false":::

## Learn more

These other design guidelines may help depending on the scope of your personal app:

* [Designing your tab](../../tabs/design/tabs.md)
* [Designing you bot](../../bots/design/bots.md)

## Validate your design

If you plan to publish your app to AppSource, you should understand the design issues that commonly cause apps to fail during submission.

> [!div class="nextstepaction"]
> [Check design validation guidelines](../../concepts/deploy-and-publish/appsource/prepare/frequently-failed-cases.md#validation-guidelines--most-failed-test-cases)
