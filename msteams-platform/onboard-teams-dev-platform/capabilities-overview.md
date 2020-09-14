---
title: Understanding Teams app capabilities
author: heath-hamilton
description: overview of Teams capabilities and extension points
ms.topic: overview
ms.author: v-heha
---
# Understanding Teams app capabilities

*Capabilities* are the extension points for building apps on the Microsoft Teams platform.

There are multiple ways to extend the Teams client, so every app is unique: Some only have one capability (such as a webhook), while others have a few to give users options. For instance, your app could display data in a central location (tab) and present that same information through a conversational interface (bot).

Your Teams app can have one or all of the following core capabilities:

* [Tabs](../tabs/what-are-tabs.md)
* [Messaging extensions](../messaging-extensions/what-are-messaging-extensions.md)
* [Webhooks and connectors](../webhooks-and-connectors/what-are-webhooks-and-connectors.md)
* [Bots](../bots/what-are-bots.md)

Your app can also can take advantage of advanced capabilities, such as the [Microsoft Graph REST API](../graph-api/rsc/resource-specific-consent.md).

See the following illustration to get an idea which capabilities would provide the features you want in your app.

![Mind map illustrating what Teams app capabilities are](doc-links/images/capabilities-overview.png)

## Doing what's best for your users

As you familiarize yourself with Teams app development, you'll begin to understand its subtleties. There's more than one way to build certain features (such as collecting user input). For example, you could embed a web-based form in a tab using an `<iframe>`. You could also do this in a tab using a task module, a Teams UI convention, for a more native experience your users may prefer.

Choosing the right combination of capabilities and UI conventions, controls, and elements comes down to first [understanding your audience's use cases](../concepts/design/understand-use-cases.md).

## Learn more

* [Start planning your app](../concepts/extensibility-points.md)
