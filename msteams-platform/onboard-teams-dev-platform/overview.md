---
title: Teams developer platform
author: clearab
description: Overview of how developers can extend and customize Microsoft Teams features using the Teams platform.
ms.topic: overview
ms.author: anclear
#Customer intent: As a developer, I want to understand why I would want to build a Teams app so that I can solve business problems.
---
# Building for Microsoft Teams

Microsoft Teams apps bring key information, common tools, and trusted processes to where people increasingly gather, learn, and work.

Apps are how you extend Teams to fit your needs. You can create something brand new for Teams or simply integrate features in your favorite apps and services.

## What can Teams apps do?

People discover and use Teams apps through a set of platform [capabilities](doc-links/capabilities-overview.md).

Some apps are simple (send notifications), while others are complex (view patient records). When planning your app, remember that Teams is a collaboration hub. The best Teams apps help people express themselves and work better together.

### Get information more conveniently

Sometimes you just need to make things easier to find. Display an important webpage in a [tab](doc-links/what-are-tabs.md), which provides a full-screen web experience for static and dynamic content in Teams.

![Conceptual representation of what tabs look like in the Teams client.](doc-links/images/overview-tabs.png)

### Share links without switching context

Pull information into a conversation and never leave Teams. For example, with [messaging extensions](doc-links/what-are-messaging-extensions.md) you can share rich, easily digestible content from an external system using the message compose box.

![Conceptual representation of what messaging extensions look like in the Teams client](doc-links\images\overview-messaging.png)

### Turn words into actions   

Conversations often result in the need to do something (create an order, review my code, etc.). A [bot](doc-links/what-are-bots.md) can kick off these kinds of workflows right inside Teams.

![Conceptual representation of what bots look like in the Teams client](doc-links/images/overview-bots.png)

### Communicate with external apps and services

[Incoming webhooks](doc-links/what-are-webhooks-and-connectors.md#incoming-webhooks) are a simple way to automatically send alerts from another app to a Teams channel or chat. With [outgoing webhooks](webhooks-and-connectors/what-are-webhooks-and-connectors.md#outgoing-webhooks), you can send a message to your web service with an @mention.

![Conceptual representation of what connectors look like in the Teams client.](doc-links/images/overview-connectors.png)

### Utilize Teams data

The [Microsoft Graph REST API for Teams](https://docs.microsoft.com/graph/teams-concept-overview) provides access to information about teams, channels, users, and messages that can help you create or enhance features for your app.

!["Conceptual representation of the Microsoft Graph REST API for Teams](assets/images/overview-graph.png)
  
## Start building

   Quickly familiarize yourself with building for Teams by creating a simple app and adding a couple commonly used capabilities.

   > [!div class="nextstepaction"]
   > [Build your first app now](doc-links/building-real-world-app.md)

   :::column-end:::
   :::column span="":::

   :::column-end:::
:::row-end:::

:::row:::
   :::column span="2":::

### Bring it all together

   Simplify processes and workflows for users by blending your organization's favorite web apps, services, and systems with Teams collaborative features.

   > [!div class="nextstepaction"]
   > [Integrate an existing app](doc-links/integrating-web-apps.md)

   :::column-end:::
   :::column span="":::

   :::column-end:::
:::row-end:::

:::row:::
   :::column span="2":::

### Trust the process

   Understand the entire Teams platform development process to effectively plan, design, build, and publish an app for your organization or anyone.

   > [!div class="nextstepaction"]
   > [Start planning your app](doc-links/extensibility-points.md)

   :::column-end:::
   :::column span="":::

   :::column-end:::
:::row-end:::

:::row:::
   :::column span="2":::

### No code, no worries

   You don't need to be a programmer to build a great app. Create a Teams app with little to no code using the Microsoft Power Platform.

   > [!div class="nextstepaction"]
   > [Import a Power Platform app](doc-links/importing-custom-microsoft-apps.md)

   :::column-end:::
   :::column span="":::

   :::column-end:::
:::row-end:::

## Resources

* [Add a Share to Teams button to your website](doc-links/share-to-teams.md)
* [Design your app using recommended guidelines](doc-links/designing-overview.md)
* [Fluent UI Design System](https://fluentsite.z22.web.core.windows.net/)
* [Microsoft Teams JavaScript client SDK](https://docs.microsoft.com/javascript/api/@microsoft/teams-js/?view=msteams-client-js-latest)
* [Bot Framework SDK for JavaScript](https://github.com/Microsoft/botbuilder-js) and [Bot Framework SDK for .NET](https://github.com/Microsoft/botbuilder-dotnet/)
* [Publish your app to an organization or AppSource](doc-links/overview.md)
