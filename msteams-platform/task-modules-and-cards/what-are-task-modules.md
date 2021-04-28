---
title: Task modules
author: clearab
description: Describe task modules and components of task module.
localization_priority: Normal
ms.topic: overview
ms.author: anclear
---

# Task modules

Task modules permit you to create modal pop-up experiences in your Teams application. In the pop-up you can:

* Run your own custom HTML or JavaScript code.
* Show an `<iframe>`-based widget such as a YouTube or Microsoft Stream video.
* Display an [Adaptive Card](/adaptive-cards/).

Task modules are useful for initiating and completing tasks or displaying rich information, such as videos or Power business intelligence (BI) dashboards. A pop-up experience is often more natural for users initiating and completing tasks compared to a tab or a conversation-based bot experience.

Task modules build on the foundation of Microsoft Teams tabs. They are essentially a tab inside a pop-up window. They use the same SDK, so if you have built a tab you are already familiar with creating a task module.

Task modules can be invoked in three ways:

* Channel or personal tabs: Using the Microsoft Teams Tabs SDK, you can invoke task modules from buttons, links, or menus on your tab. For more information, see [using task modules in tabs](~/task-modules-and-cards/task-modules/task-modules-tabs.md).
* Bots: Using buttons on [cards](~/task-modules-and-cards/cards/cards-reference.md) sent from your bot. This is useful when you do not require everyone in a channel to see what you are doing with a bot. For example, when having users respond to a poll in a channel it is not useful to see a record of that poll being created. For more information, see [using task modules from Teams bots](~/task-modules-and-cards/task-modules/task-modules-bots.md).
* Outside of Teams from a deep link: You can also create URLs to invoke a task module from anywhere. For more information, see [task module deep link syntax](~/task-modules-and-cards/task-modules/invoking-task-modules.md#task-module-deep-link-syntax).

## Components of a task module

Here is what a task module looks like when invoked from a bot:

![Task module example](~/assets/images/task-module/task-module-example.png)

A task module includes the following as shown in the previous image:

1. Your app's [`color` icon](~/resources/schema/manifest-schema.md#icons).
2. Your app's [`short` name](~/resources/schema/manifest-schema.md#name).
3. The task module's title specified in the `title` property of the [TaskInfo object](~/task-modules-and-cards/task-modules/invoking-task-modules.md#the-taskinfo-object).
4. The task module's close or cancel button. If the user selects this button, your app receives an `err` event. For more information, see [example for submitting the result of a task module](~/task-modules-and-cards/task-modules/task-modules-tabs.md#example-of-submitting-the-result-of-a-task-module).

    > [!NOTE]
    > It is currently not possible to detect the `err` event when a task module is invoked from a bot.

5. The blue rectangle is where your web page appears if you are loading your own web page using the `url` property of the [TaskInfo object](~/task-modules-and-cards/task-modules/invoking-task-modules.md#the-taskinfo-object). For more information, see [task module sizing](~/task-modules-and-cards/task-modules/invoking-task-modules.md#task-module-sizing).
6. If you are displaying an Adaptive Card using the `card` property of the [TaskInfo object](~/task-modules-and-cards/task-modules/invoking-task-modules.md#the-taskinfo-object) the padding is added for you. For more information, see [task module CSS for HTML or JavaScript task modules](~/task-modules-and-cards/task-modules/invoking-task-modules.md#task-module-css-for-html-or-javascript-task-modules).
7. Adaptive Card buttons render after you select **Sign up**. When using your own page, create your own buttons.

## See also

* [Invoke and dismiss task modules](~/task-modules-and-cards/task-modules/invoking-task-modules.md)