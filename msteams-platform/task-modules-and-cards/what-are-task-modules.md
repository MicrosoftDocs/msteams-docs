---
title: Build Dialog in Tabs with Adaptive Card
author: surbhigupta
description: Learn how to create a modal pop-up experience and embed a webpage to display surveys, videos, and collect or display information to users from Teams apps.
ms.localizationpriority: medium
ms.topic: overview
ms.author: anclear
ms.date: 11/12/2024
---

# Dialogs

Dialogs (referred as task modules in TeamsJS v1.x) permit you to create modal pop-up experiences in your Teams application. In the pop-up, you can:

* Run your own custom HTML or JavaScript code.
* Show an `<iframe>`-based widget such as surveys, YouTube video, or Microsoft Stream video.
* Display an [Adaptive Card](/adaptive-cards/).

Dialogs are useful for initiating and completing tasks or displaying rich information, such as videos or Power Business Intelligence (BI) dashboards. A pop-up experience is often more natural for users initiating and completing tasks compared to a tab or a conversation-based bot experience.

Dialogs build on the foundation of Microsoft Teams tabs. They're essentially a tab inside a pop-up window. They use the same Microsoft Teams JavaScript client library (TeamsJS), so if you have built a tab, you're already familiar with creating a dialog.

You can invoke dialogs in three ways:

* Channel or personal tabs: Using the TeamsJS library, you can invoke dialogs from buttons, links, or menus on your tab. For more information, see [using dialogs in tabs](~/task-modules-and-cards/task-modules/task-modules-tabs.md).
* Bots: Using buttons on [cards](~/task-modules-and-cards/cards/cards-reference.md) sent from your bot. This is useful when you don't require everyone in a channel to see what you are doing with a bot. For example, when having users respond to a poll in a channel it isn't useful to see a record of that poll being created. For more information, see [using dialogs from Teams bots](~/task-modules-and-cards/task-modules/task-modules-bots.md).
* Outside of Teams from a deep link: You can also create URLs to invoke a dialog from anywhere. For more information, see [dialog deep link syntax](~/concepts/build-and-test/deep-link-application.md#deep-link-to-open-a-dialog).

## Components of a dialog

Here's what a dialog looks like when invoked from a bot:

:::image type="content" source="../assets/images/task-module/task-module-example.png" alt-text="dialog example":::

A dialog includes the following as shown in the previous image:

1. Your app's [`color` icon](~/resources/schema/manifest-schema.md#icons).
2. Your app's [`short` name](~/resources/schema/manifest-schema.md#name).
3. The dialog's title specified in the `title` property of the [DialogInfo object](~/task-modules-and-cards/task-modules/invoking-task-modules.md#dialoginfo-object).
4. The dialog's close or cancel button. If the user selects this button, your app receives an `err` event. For more information, see [example for submitting the result of a dialog](~/task-modules-and-cards/task-modules/task-modules-tabs.md#example-of-submitting-the-result-of-a-dialog).

    > [!NOTE]
    > It isn't possible to detect the `err` event when a dialog is invoked from a bot.

5. The blue rectangle is where your web page appears if you're loading your own web page using the `url` property of the [TaskInfo object](~/task-modules-and-cards/task-modules/invoking-task-modules.md#dialoginfo-object). For more information, see [Invoke and dismiss dialogs](~/task-modules-and-cards/task-modules/invoking-task-modules.md).
6. If you're displaying an Adaptive Card using the `card` property of the [TaskInfo object](~/task-modules-and-cards/task-modules/invoking-task-modules.md#dialoginfo-object), the padding is added for you. For more information, see [CSS for HTML or JavaScript dialogs](~/task-modules-and-cards/task-modules/invoking-task-modules.md#css-for-html-or-javascript-dialogs).
7. Adaptive Card buttons render after you select **Sign up**. When using your own page, create your own buttons. By design, the primary button style (solid) is applied to the last root action in an Adaptive Card.  For all other actions, the default button style is applied.

## Using dialogs in Bot Framework

You can integrate dialogs into Microsoft Bot Framework Web Chat to improve user experience. However, with the primary focus on chat interactions, Web Chat doesn't support opening dialogs. To create custom events or components within Web Chat, use [Bot Framework Web Chat](https://github.com/microsoft/BotFramework-WebChat). For more information, see [Bot Framework documentation](/azure/bot-service).

## Next step

> [!div class="nextstepaction"]
> [Invoke and dismiss dialogs](~/task-modules-and-cards/task-modules/invoking-task-modules.md)

## See also

* [Adaptive Cards overflow menu](~/task-modules-and-cards/cards/cards-format.md#adaptive-cards-overflow-menu)
* [Bot configuration experience](../bots/how-to/bot-configuration-experience.md)
* [Cards and dialogs](cards-and-task-modules.md)
* [Cards](~/task-modules-and-cards/what-are-cards.md)
* [Instrumenting for Teams app specific analytics](../concepts/design/overview-analytics.md#instrumenting-for-teams-app-specific-analytics)
