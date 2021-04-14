---
title: Understand app capabilities
author: heath-hamilton
description: Teams app capabilities explained
ms.topic: conceptual
ms.author: lajanuar
ms.date: 09/22/2020
---

# Understand Microsoft Teams app capabilities

Extensibility or entry points are different ways in which an app can manifest itself to a user. For example, a user can interact with an app on a canvas tab to do an activity or might choose to do the same using a conversational bot. The various capabilities used to build your Teams app allow you to increase its usage scope.

There are multiple ways to extend Teams, so every app is unique. Some only have one capability, such as a webhook, while others have more than one feature to give users various options. For example, your app can display data in a central location, that is, the **tab** and present that same information through a conversational interface, that is, the **bot**.

## App capabilities

Your Teams app have one or all of the following core capabilities:

* [Tabs](../tabs/what-are-tabs.md)
* [Messaging extensions](../messaging-extensions/what-are-messaging-extensions.md)
* [Bots](../bots/what-are-bots.md)
* [Webhooks and connectors](../webhooks-and-connectors/what-are-webhooks-and-connectors.md)

Your app can also take advantage of advanced capabilities, such as the [Microsoft Graph API for Teams](https://docs.microsoft.com/graph/teams-concept-overview).

The following illustration gives you an idea of which capabilities will provide the features you want in your app.

:::image type="content" source="../assets/images/capabilities-overview.png" alt-text="Mind map illustrating what Teams app capabilities are.":::

## Always consider your user

As you familiarize yourself with Teams app development, you understand its core fundamentals. You understand that there is more than one way to build certain features. In such scenarios, consider how you can provide a more native experience to your user.
For example, you can collect user input in a form built as a tab in the app. You can also do this using a task module without switching views and disrupting user's flow of work. It is important to choose extension points that provide least deviation from a user's regular flow of work.

## See also

> [!div class="nextstepaction"]
> [Build apps for Teams](../overview.md)
## Next step

> [!div class="nextstepaction"]
> [Teams app entry points](../concepts/extensibility-points.md)
