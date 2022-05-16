---
title: Cards and task modules
description: Learn about types of cards supported in bots for Teams, such as, Adaptive cards, Hero card, Thumbnail card, and more. 
Learn about card actions and invoking task modules in channels, bots, or deep links.
author: surbhigupta12
ms.topic: conceptual
ms.localizationpriority: medium
---

# Cards and task modules

Cards provide users with various visual, audio, and selectable messages and help in conversation flow.

With task modules, you can create modal pop-up experiences in Microsoft Teams. They're useful for starting and completing the tasks, or displaying rich information like videos or Power business intelligence (BI) dashboards.

The following types of cards are supported in bots for Teams:

* Adaptive Card
* Hero card
* List card
* Office 365 Connector card
* Receipt card
* Sign in card
* Thumbnail card
* Card collections

You can format card text using a subset of XML or HTML formatting or Markdown depending on the card type.

[People Picker in Adaptive Cards](cards/people-picker.md) in Adaptive Card helps to search, select, reassign, and preselect users within chat or channel.

You can add and respond to card actions that:

* Open a URL
* Send messages and payload to the bot
* Initiate OAuth flow

You can provide [dynamic search](~/task-modules-and-cards/cards/dynamic-search.md) experience within a large dataset using type ahead control in Adaptive Cards and perform type-ahead static search within limited number of choices. Invoke the task modules in channel or personal tabs, bots, or deep links. Your user's experience for any workflows that requires data input can be improved by adding a task module to the user's tab. You can invoke task modules from Teams bots using buttons on Adaptive Cards and Bot Framework cards.

## See also

* [Cards](~/task-modules-and-cards/what-are-cards.md)
* [Task modules](~/task-modules-and-cards/what-are-task-modules.md)
