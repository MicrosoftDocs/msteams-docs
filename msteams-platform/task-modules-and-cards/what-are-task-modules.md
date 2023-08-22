---
title: Task modules
author: surbhigupta
description: In this module, learn how to add modal pop-up experiences to collect or display information to your users from your Microsoft Teams apps.
ms.localizationpriority: medium
ms.topic: overview
ms.author: anclear
ms.date: 12/16/2022
---

# Task modules

Task modules permit you to create modal pop-up experiences in your Teams application. In the pop-up, you can:

* Run your own custom HTML or JavaScript code.
* Show an `<iframe>`-based widget such as a YouTube or Microsoft Stream video.
* Display an [Adaptive Card](/adaptive-cards/).

Task modules are useful for initiating and completing tasks or displaying rich information, such as videos or Power Business Intelligence (BI) dashboards. A pop-up experience is often more natural for users initiating and completing tasks compared to a tab or a conversation-based bot experience.

Task modules build on the foundation of Microsoft Teams tabs. They're essentially a tab inside a pop-up window. They use the same Microsoft Teams JavaScript client library (TeamsJS), so if you have built a tab you're already familiar with creating a task module.

Task modules can be invoked in three ways:

* Channel or personal tabs: Using the TeamsJS library, you can invoke task modules from buttons, links, or menus on your tab. For more information, see [using task modules in tabs](~/task-modules-and-cards/task-modules/task-modules-tabs.md).
* Bots: Using buttons on [cards](~/task-modules-and-cards/cards/cards-reference.md) sent from your bot. This is useful when you don't require everyone in a channel to see what you are doing with a bot. For example, when having users respond to a poll in a channel it isn't useful to see a record of that poll being created. For more information, see [using task modules from Teams bots](~/task-modules-and-cards/task-modules/task-modules-bots.md).
* Outside of Teams from a deep link: You can also create URLs to invoke a task module from anywhere. For more information, see [task module deep link syntax](~/concepts/build-and-test/deep-link-application.md#deep-link-to-open-a-task-module).

## Components of a task module

Here's what a task module looks like when invoked from a bot:

:::image type="content" source="../assets/images/task-module/task-module-example.png" alt-text="task module example":::

A task module includes the following as shown in the previous image:

1. Your app's [`color` icon](~/resources/schema/manifest-schema.md#icons).
2. Your app's [`short` name](~/resources/schema/manifest-schema.md#name).
3. The task module's title specified in the `title` property of the [TaskInfo object](~/task-modules-and-cards/task-modules/invoking-task-modules.md#the-taskinfo-object).
4. The task module's close or cancel button. If the user selects this button, your app receives an `err` event. For more information, see [example for submitting the result of a task module](~/task-modules-and-cards/task-modules/task-modules-tabs.md#example-of-submitting-the-result-of-a-task-module).

    > [!NOTE]
    > It is currently not possible to detect the `err` event when a task module is invoked from a bot.

5. The blue rectangle is where your web page appears if you're loading your own web page using the `url` property of the [TaskInfo object](~/task-modules-and-cards/task-modules/invoking-task-modules.md#the-taskinfo-object). For more information, see [task module sizing](~/task-modules-and-cards/task-modules/invoking-task-modules.md#task-module-sizing).
6. If you're displaying an Adaptive Card using the `card` property of the [TaskInfo object](~/task-modules-and-cards/task-modules/invoking-task-modules.md#the-taskinfo-object) the padding is added for you. For more information, see [task module CSS for HTML or JavaScript task modules](~/task-modules-and-cards/task-modules/invoking-task-modules.md#task-module-css-for-html-or-javascript-task-modules).
7. Adaptive Card buttons render after you select **Sign up**. When using your own page, create your own buttons. By design, the primary button style (solid) is applied to the last root action in an Adaptive Card.  For all other actions, the default button style is applied.

## Next step

> [!div class="nextstepaction"]
> [Invoke and dismiss task modules](~/task-modules-and-cards/task-modules/invoking-task-modules.md)

## See also

* [Cards and task modules](cards-and-task-modules.md)
* [Cards](~/task-modules-and-cards/what-are-cards.md)
* [Adaptive Cards overflow menu](~/task-modules-and-cards/cards/cards-format.md#adaptive-cards-overflow-menu)
* [Instrumenting for Teams app specific analytics](../concepts/design/overview-analytics.md#instrumenting-for-teams-app-specific-analytics)
