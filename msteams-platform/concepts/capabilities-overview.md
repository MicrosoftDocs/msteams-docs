---
title: Understanding Teams app capabilities
author: heath-hamilton
description: Teams app capabilities explained
ms.topic: conceptual
ms.author: lajanuar
ms.date: 09/22/2020
---
# Understanding Teams app capabilities

*Capabilities* are the extension points for building apps on the Microsoft Teams platform.

There are multiple ways to extend Teams, so every app is unique: Some only have one capability (such as a webhook), while others have a few to give users options. For instance, your app could display data in a central location (tab) and present that same information through a conversational interface (bot).

Your Teams app 
have one or all of the following core capabilities:

* [Tabs](../tabs/what-are-tabs.md)
* [Messaging extensions](../messaging-extensions/what-are-messaging-extensions.md)
* [Bots](../bots/what-are-bots.md)
* [Webhooks and connectors](../webhooks-and-connectors/what-are-webhooks-and-connectors.md)

Your app can also take advantage of advanced capabilities, such as the [Microsoft Graph API for Teams](https://docs.microsoft.com/graph/teams-concept-overview).

See the following illustration to get an idea which capabilities would provide the features you want in your app.

:::image type="content" source="../assets/images/capabilities-overview.png" alt-text="Mind map illustrating what Teams app capabilities are.":::

## Doing what's best for your users

As you familiarize yourself with Teams app development, you'll begin to understand its subtleties. There's more than one way to build certain features (such as collecting user input). For example, you could embed a web-based form in a tab using an `<iframe>`. You could also do this in a tab using a task module, a Teams UI convention, for a more native experience your users may prefer.

Choosing the right capabilities and design comes down to first [understanding your audience's use cases](../concepts/design/understand-use-cases.md).
