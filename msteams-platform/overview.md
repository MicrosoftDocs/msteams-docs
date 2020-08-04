---
title: Microsoft Teams developer platform
author: clearab
description: Overview of how developers can extend and customize Microsoft Teams features using the Teams platform.
ms.topic: overview
ms.author: anclear
#Customer intent: As a developer, I want to understand why I would want to build a Teams app so that I can solve business problems.
---
# What are Microsoft Teams apps?

Microsoft Teams apps bring key information, common tools, and trusted processes to where people increasingly gather, learn, and work.

Apps are how you extend Teams to fit your needs. You can create something brand new for Teams or simply integrate features in your favorite apps and services.

<br>

> [!VIDEO https://www.microsoft.com/en-us/videoplayer/embed/RE4AUyE]

## What can Teams apps do?

People discover and use Teams apps through a set of [capabilities](concepts/capabilities-overview.md). Your app can have one or more of these capabilities. You also can define your app's scope for personal workspaces only or expand it to chats and team channel activities.

Some apps are simple (send notifications), while others are complex (view patient records). When planning your app, remember that Teams is a collaboration hub. The best Teams apps help people express themselves and work better together.

### Get information more conveniently

Sometimes you just need to make things easier to find. Display an important webpage in a [tab](tabs/what-are-tabs.md), which provides a full-screen web experience for static and dynamic content in Teams.

:::image type="content" source="assets/images/overview-tabs.png" alt-text="Conceptual representation of what tabs look like in the Teams client." border="false":::

### Share links without switching context

Pull information into a conversation and never leave Teams. For example, with [messaging extensions](messaging-extensions/what-are-messaging-extensions.md) you can share rich, easily digestible content from an external system using the message compose box.

:::image type="content" source="assets\images\overview-messaging.png" alt-text="Conceptual representation of what messaging extensions look like in the Teams client." border="false":::

### Turn words into actions

Conversations often result in the need to do something (create an order, review my code, etc.). A [bot](bots/what-are-bots.md) can kick off these kinds of workflows right inside Teams.

:::image type="content" source="assets/images/overview-bots.png" alt-text="Conceptual representation of what bots look like in the Teams client." border="false":::

### Communicate with external apps and services

[Incoming webhooks](webhooks-and-connectors/what-are-webhooks-and-connectors.md#incoming-webhooks) are a simple way to automatically send alerts from another app to a Teams channel or chat. With [outgoing webhooks](webhooks-and-connectors/what-are-webhooks-and-connectors.md#outgoing-webhooks), you can send a message to your web service with an @mention.

:::image type="content" source="assets/images/overview-connectors.png" alt-text="Conceptual representation of what connectors look like in the Teams client." border="false":::

### Utilize Teams data

The [Microsoft Graph REST API for Teams](graph-api/rsc/resource-specific-consent.md) provides access to information about teams, channels, users, and messages that can help you create or enhance features for your app.

:::image type="content" source="assets/images/overview-graph.png" alt-text="Conceptual representation of the Microsoft Graph REST API for Teams." border="false":::

## Get started

:::row:::
   :::column span="":::

      <div align="center">

      :::image type="content" source="assets/images/overview-cta-integrate.png" alt-text="<alt text>" border="false":::
      
        <h3>Best of both worlds</h3>

        Bring your favorite web apps and services into Teams for a seamless user experience.

        > [!div class="nextstepaction"]
        > [Integrate an app or service](samples/integrating-web-apps.md)

      </div>

   :::column-end:::

   :::column span="":::

      <div align="center" style="background-color: #D3D3D3;">

      :::image type="content" source="assets/images/overview-cta-build.png" alt-text="<alt text>" border="false":::
      
        <h3>Off and running</h3>

        Get to know your way around the platform by creating a basic Teams app.

        > [!div class="nextstepaction"]
        > [Build your first app now](build-your-first-app/building-real-world-app.md)

      </div>

   :::column-end:::

   :::column span="":::

      <div align="center">

        :::image type="content" source="assets/images/overview-cta-plan.png" alt-text="<alt text>" border="false":::
      
        <h3>Trust the process</h3>

        Walk through how to plan, design, build, and publish a great Teams app.

        > [!div class="nextstepaction"]
        > [Start planning your app](concepts/extensibility-points.md)

      </div>

   :::column-end:::
:::row-end:::

Did you know you can also create a Teams app without writing code? Try [importing your Power App or other custom Microsoft business app](samples/importing-custom-microsoft-apps.md).

## Resources

Already familiar with developing Teams apps? See the following resources and tools.

* [Adding a Share to Teams button to your website](concepts/build-and-test/share-to-teams.md)
* [Fluent Design System](https://fluentsite.z22.web.core.windows.net/)
