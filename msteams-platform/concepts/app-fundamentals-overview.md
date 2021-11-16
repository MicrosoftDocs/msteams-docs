---
title: App development fundamentals overview
author: heath-hamilton
description: Describe the foundational concepts of Teams platform development, such as app capabilities and entry points, understanding use cases and mapping them to app capabilities, and planning apps.
ms.topic: conceptual
ms.localizationpriority: medium
ms.author: lajanuar
keywords: entry points extensibility use cases device capability
---

# Microsoft Teams app development fundamentals

Microsoft Teams app fundamentals give the direction you need to create your custom Teams app. You can recognize the framework required to plan your Teams app. The document helps you to understand the user-app communication and figure out the kind of app surfaces you need to use or the APIs your app might require in the process. Get some inspiration to embrace interactivity that can deepen the app experience when you integrate with Teams.

## Capabilities and entry points

You can extend your Teams app in multiple ways. To be able to extend your app, you must understand all the core capabilities and the entry points that work in a collaborative space. You can experiment with the extension points for building your apps. Important app project components help you to correctly configure your app page. Teams app can have [multiple capabilities](../concepts/capabilities-overview.md) and [entry points](../concepts/extensibility-points.md).

### Personal apps

:::row:::
   :::column span="1":::

**Help people focus**: A [personal app](~/design/personal-apps.md) is a dedicated space or bot to help users focus on their own tasks or view activities important to them.

   :::column-end:::

   :::column span="3":::

:::image type="content" source="../assets/images/overview-personal-apps-2021.png" alt-text="Conceptual representation of what personal apps look like in the Teams client." border="false":::

   :::column-end:::

:::row-end:::

### Tabs

:::row:::
   :::column span="1":::

**Collaborate more conveniently**: Display your web-based content in a [tab](../tabs/what-are-tabs.md) where people can discuss and work on it together.

   :::column-end:::

   :::column span="3":::

:::image type="content" source="../assets/images/overview-channel-chat-apps-2021.png" alt-text="Conceptual representation of what tabs look like in the Teams client." border="false":::

   :::column-end:::

:::row-end:::

### Bots

:::row:::
   :::column span="1":::

**Turn words into actions**: Conversations often result in the need to do something (generate an order, review my code, check ticket status, and so on). A [bot](../bots/what-are-bots.md) can kick off these kinds of workflows right inside Teams.

   :::column-end:::

   :::column span="3":::

:::image type="content" source="../assets/images/overview-bots-2021.png" alt-text="Conceptual representation of what bots look like in the Teams client." border="false":::

   :::column-end:::

:::row-end:::

### Messaging extensions

:::row:::

   :::column span="1":::

**Make it easier to multitask**: With [messaging extensions](../messaging-extensions/what-are-messaging-extensions.md), you can quickly share external information in a conversation. You also can act on a message, such as creating a help ticket based on the content of a channel post.

   :::column-end:::

   :::column span="3":::

:::image type="content" source="../assets/images/overview-messaging-extensions-2021.png" alt-text="Conceptual representation of what messaging extensions look like in the Teams client." border="false":::

   :::column-end:::
:::row-end:::

### Meeting extensions

:::row:::

   :::column span="1":::

**Create apps for meetings**: There are a few options for [incorporating your app into the Teams calling experience](../apps-in-teams-meetings/design/designing-apps-in-meetings.md).

   :::column-end:::

   :::column span="3":::

:::image type="content" source="../assets/images/overview-meeting-extensions-2021.png" alt-text="Conceptual representation of what meeting extensions look like in the Teams client." border="false":::

   :::column-end:::
:::row-end:::

### Webhooks and connectors

:::row:::

   :::column span="":::

**Communicate with external apps**: [Incoming webhooks](../webhooks-and-connectors/what-are-webhooks-and-connectors.md#incoming-webhooks) are a simple way to automatically send notifications from another app to a Teams channel. With [outgoing webhooks](../webhooks-and-connectors/what-are-webhooks-and-connectors.md#outgoing-webhooks), message your web service with an @mention.

   :::column-end:::

   :::column span="":::

:::image type="content" source="../assets/images/overview-connectors.png" alt-text="Conceptual representation of what connectors look like in the Teams client." border="false":::

   :::column-end:::
:::row-end:::

### Microsoft Graph for Teams

:::row:::

   :::column span="":::

**Utilize Teams data**: The [Microsoft Graph API for Teams](/graph/teams-concept-overview) provides access to information about teams, channels, users, and messages that can help you create or enhance features for your app (such as rich notifications).

   :::column-end:::

   :::column span="":::

:::image type="content" source="../assets/images/overview-graph.png" alt-text="Conceptual representation of the Microsoft Graph API for Teams." border="false":::

   :::column-end:::
:::row-end:::

## Understand your use cases

You can recognize user issues and identify the answers to some common problems the users face. You can build your Teams app by finding the right combination to meet your user's needs. [Understand use cases](../concepts/design/understand-use-cases.md) to know how an end-user interacts with your app. You learn to understand the user and their problem. Some common questions answered are as follows:

* Do you need authentication?
* What problem is your app going to solve?
* Who are the end-users of the app?
* How should the onboarding experience be and what else the app can do?

## Map your use cases to Teams app capabilities

[Map your use cases](../concepts/design/map-use-cases.md) covers some common scenarios and how to choose your app's capabilities. Information to share your app and collaborate on items in an external system is provided. You can also learn how to initiate workflows and send notifications to users. Get additional tips on where to start, how to get social with users, conversational bots, and combining multiple features.

## Plan responsive tabs for Teams mobile
[Plan responsive tabs for Teams mobile](../concepts/design/plan-responsive-tabs-for-teams-mobile.md) covers common scenarios and helps with planning apps for Teams mobile. The document guides on how to strategize for apps on mobile. You can also learn about the different satges and different types of Teams app.

## Integrate device capabilities

Microsoft Teams platform is continuously enhancing developer capabilities aligning with built-in first-party experiences. The enhanced Teams platform allows partners to access and integrate the native device capabilities, such as camera, QR or barcode scanner, photo gallery, microphone, and location using dedicated APIs available in Microsoft Teams JavaScript client SDK.

## Next step

> [!div class="nextstepaction"]
> [Understand Teams app capabilities](capabilities-overview.md)

## See also

* [Considerations for Teams integration](../samples/integrating-web-apps.md)
* [Build your first Microsoft Teams app](../build-your-first-app/build-first-app-overview.md)
