---
title: Understand Teams app capabilities
author: heath-hamilton
description: Teams app capabilities explained
ms.topic: conceptual
ms.author: lajanuar
ms.date: 09/22/2020
---

# Understand Teams app capabilities

Capabilities are the extension points for building apps on the Microsoft Teams platform. The various capabilities used to build your Teams app allow you to increase its usage scope.

There are multiple ways to extend Teams, so every app is unique. Some only have one capability, such as a webhook, while others have more than one feature to give users various options. For example, your app can display data in a central location, that is, the **tab** and present that same information through a conversational interface, that is, the **bot**.

This document introduces the core capabilities  that you can use to build your Teams app.

## App capabilities

Your Teams app can have one or all of the following core capabilities:

* [Tabs](../tabs/what-are-tabs.md)
* [Messaging extensions](../messaging-extensions/what-are-messaging-extensions.md)
* [Bots](../bots/what-are-bots.md)
* [Webhooks and connectors](../webhooks-and-connectors/what-are-webhooks-and-connectors.md)

Your app can also take advantage of the advanced capabilities, such as the [Microsoft Graph API for Teams](https://docs.microsoft.com/graph/teams-concept-overview).

The following illustration gives you an idea of which capabilities will provide the features you want in your app.

:::image type="content" source="../assets/images/capabilities-overview.png" alt-text="Mind map illustrating what Teams app capabilities are.":::

The core capabilities together with the entry points enable you to create a collaboration hub that can provide a native experience to your users. 

## Consider user preference

As you familiarize yourself with Teams app development, you understand its core fundamentals. You understand that there is more than one way to build certain features. In such scenarios, consider how you can provide a more native experience to your user.
For example, collecting user input. You can collect user input by embedding a web-based form in a tab using an `<iframe>`. You can also do this in a tab using a task module, a Teams UI convention. Using the task module to develop the app will provide a more native experience to your user. Therefore, you must do the right thing for your user.

## See also

> [!div class="nextstepaction"]
> [Build apps for Teams](../overview.md)
## Next step

> [!div class="nextstepaction"]
> [Teams app entry points](../concepts/extensibility-points.md)
