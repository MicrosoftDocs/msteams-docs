---
title: Understanding app capabilities
author: heath-hamilton
description: Learn about the Microsoft Teams platform extension points.
ms.topic: conceptual
ms.author: lajanuar
ms.date: 09/22/2020
---
# Understanding Microsoft Teams app capabilities

*Capabilities* are the extension points for building apps on the Microsoft Teams platform.

There are multiple ways to extend Teams, so every app is unique: Some only have one capability (such as a webhook), while others have a few to give users options. For instance, your app could display data in a central location (tab) and present that same information through a conversational interface (bot).

Your Teams app can have one or all of the following core capabilities:

* [Tabs](../tabs/what-are-tabs.md)
* [Messaging extensions](../messaging-extensions/what-are-messaging-extensions.md)
* [Bots](../bots/what-are-bots.md)
* [Webhooks and connectors](../webhooks-and-connectors/what-are-webhooks-and-connectors.md)
* [Adaptive Cards](../task-modules-and-cards/what-are-cards.md)
* [Task modules](../task-modules-and-cards/what-are-task-modules.md)

Your app can also can take advantage of advanced capabilities, such as the [Microsoft Graph API for Teams](https://docs.microsoft.com/graph/teams-concept-overview).

See the following illustration to get an idea which Teams capabilities would provide the features you want in your app.

:::image type="content" source="../assets/images/capabilities-overview.png" alt-text="Mind map illustrating what Teams app capabilities are.":::

## Doing what's best for your users

As you familiarize yourself with Teams app development, you'll begin to understand its subtleties. Sometimes there's more than one way to build a feature: For example, you could collect user input with a task module (a modal) or bot.

To choose the right app capabilities and design, you must first [understand your audience's use cases and scenarios](../concepts/design/understand-use-cases.md).
