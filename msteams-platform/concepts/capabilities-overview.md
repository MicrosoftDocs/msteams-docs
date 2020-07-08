---
title: Understanding Teams app capabilities
author: heath-hamilton
description: 
ms.topic: overview
ms.author: heath-hamilton
---
# Understanding Teams app capabilities

*Capabilities* are the extension points for building apps on the Microsoft Teams platform. Every Teams app is unique: Some may only have one capability (such as a connector), while others may have a few to serve a variety of use cases. Your app could display data in a central location (tab) and present that same information through a conversational interface (bot).

Your Teams app can have one or all of the following core capabilities:

* Tabs
* Messaging extensions
* Connectors
* Bots

## Doing what's best for you

As you familiarize yourself with Teams app development, you'll begin to understand you can build different capabilities to do similar things. For example, if your app requires user input, you could embed a web form in a tab using an `<iframe>`. You could also do something similar in a tab using a task module, which is a common Teams-themed interface. Choosing the right combination of capabilities, interfaces, and controls for your app comes down to [knowing your target audience's use cases](../concepts/design/understand-use-cases.md) and then successfully [mapping those use cases to Teams capabilities](../concepts/design/map-use-cases.md).

See the following illustration to get an idea which capabilities would provide the features you want in your app.

:::image type="content" source="../assets/images/capabilities-overview.png" alt-text="Mind map illustrating what Teams app capabilities are.":::
