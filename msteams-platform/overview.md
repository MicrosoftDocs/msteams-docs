---
title: Build apps for the Microsoft Teams platform
author: heath-hamilton
description: Get an overview of how developers can extend Microsoft Teams features with custom apps.
ms.topic: overview
localization_priority: Normal
ms.author: lajanuar
ms.date: 09/22/2020
---
# Build apps for Microsoft Teams

Microsoft Teams apps bring key information, common tools, and trusted processes to where people increasingly gather, learn, and work.

Apps are how you extend Teams to fit your needs. Create something brand new for Teams or integrate an existing app.

> [!div class="nextstepaction"]
> [Start here](build-your-first-app/build-first-app-overview.md)

## What are Teams apps?

Teams apps are a combination of [capabilities](concepts/capabilities-overview.md) and [entry points](concepts/extensibility-points.md). For example, people can chat with your app's *bot* (capability) in a *channel* (entry point).

Some apps are simple (send notifications), while others are complex (manage patient records). When planning your app, remember that Teams is a collaboration hub. The best Teams apps help people express themselves and work better together.

:::row:::
   :::column span="":::

### Tabs

**Get information more conveniently**: Sometimes you just need to make things easier to find. Display an important webpage in a [tab](tabs/what-are-tabs.md), which provides a full-screen web experience for static and dynamic content in Teams.

:::image type="content" source="assets/images/overview-tabs.png" alt-text="Conceptual representation of what tabs look like in the Teams client." border="false":::

   :::column-end:::

   :::column span="":::

### Bots

**Turn words into actions**: Conversations often result in the need to do something (generate an order, review my code, check ticket status, etc.). A [bot](bots/what-are-bots.md) can kick off these kinds of workflows right inside Teams.

:::image type="content" source="assets/images/overview-bots.png" alt-text="Conceptual representation of what bots look like in the Teams client." border="false":::

   :::column-end:::

:::row-end:::

:::row:::

   :::column span="":::

### Messaging extensions

**Make it easier to multitask**: With [messaging extensions](messaging-extensions/what-are-messaging-extensions.md), you can quickly share external information in a conversation. You also can act on a message, such as creating a help ticket based on the content of a channel post.

:::image type="content" source="assets\images\overview-messaging.png" alt-text="Conceptual representation of what messaging extensions look like in the Teams client." border="false":::

   :::column-end:::

   :::column span="":::

### Webhooks

**Communicate with external apps**: [Incoming webhooks](webhooks-and-connectors/what-are-webhooks-and-connectors.md#incoming-webhooks) are a simple way to automatically send notifications from another app to a Teams channel. With [outgoing webhooks](webhooks-and-connectors/what-are-webhooks-and-connectors.md#outgoing-webhooks), message your web service with an @mention.

:::image type="content" source="assets/images/overview-connectors.png" alt-text="Conceptual representation of what connectors look like in the Teams client." border="false":::

   :::column-end:::
:::row-end:::

:::row:::

   :::column span="":::

### Microsoft Graph for Teams

**Utilize Teams data**: The [Microsoft Graph API for Teams](https://docs.microsoft.com/graph/teams-concept-overview) provides access to information about teams, channels, users, and messages that can help you create or enhance features for your app.

:::image type="content" source="assets/images/overview-graph.png" alt-text="Conceptual representation of the Microsoft Graph API for Teams." border="false":::

   :::column-end:::

   :::column span="":::
   :::column-end:::
:::row-end:::

:::row:::
   :::column span="2":::

## Start building

Quickly familiarize yourself with building for Teams by setting up your environment and creating a simple app.

> [!div class="nextstepaction"]
> [Build your first app](build-your-first-app/build-first-app-overview.md)

   :::column-end:::
   :::column span="":::

   :::column-end:::
:::row-end:::

:::row:::
   :::column span="2":::

## Integrate with Teams

Blend the features users love about an existing web app, service, or system with the collaborative features of Teams.

> [!div class="nextstepaction"]
> [Integrate an existing app](samples/integrating-web-apps.md)

   :::column-end:::
   :::column span="":::

   :::column-end:::
:::row-end:::

:::row:::
   :::column span="2":::

## A little code goes a long way

You don't need to be an expert programmer to build a great Teams app. Try one of several low-code solutions.

> [!div class="nextstepaction"]
> [Create a low-code app](samples/teams-low-code-solutions.md)

   :::column-end:::
   :::column span="":::

   :::column-end:::
:::row-end:::

:::row:::
   :::column span="2":::

## Get ideas for your app

Looking for app development inspiration? Browse our list of real-world scenarios and industry solutions with high fidelity concept mocks to understand the various ways Teams apps can help your users.

> [!div class="nextstepaction"]
> [See app scenarios](https://adoption.microsoft.com/extensibility-look-book/scenarios/)

   :::column-end:::
   :::column span="":::

   :::column-end:::
:::row-end:::

## See also

* [Add a Share-to-Teams button to your website](concepts/build-and-test/share-to-teams.md)
* [Design your Teams app](concepts/design/design-teams-app-overview.md)
* [Microsoft Teams JavaScript client SDK](https://docs.microsoft.com/javascript/api/@microsoft/teams-js/?view=msteams-client-js-latest&preserve-view=true)
* Bot Framework SDK for [JavaScript](https://github.com/Microsoft/botbuilder-js) and [.NET](https://github.com/Microsoft/botbuilder-dotnet/)
* [Publish your Teams app](concepts/deploy-and-publish/overview.md)
