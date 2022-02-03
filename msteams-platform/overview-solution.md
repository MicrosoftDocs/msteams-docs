---
title: Teams solution for building apps
author: heath-hamilton
description: Overview of Teams solution for building apps
ms.topic: overview
ms.localizationpriority: medium
ms.author: lajanuar
ms.date: 11/02/2021
---
# The Teams solution

The Microsoft Teams Platform is a powerful, flexible platform for creating apps for Microsoft Teams. It provides a vast suite of development environments and tools to support app development.

## The user story

Now that you've had a view of Teams offerings, you can map them to user needs. Let’s revisit the user scenario.

The developer from Tours and Travel agency wants to build an app for their users, the travelers. The app should:

- Check and send the forecast to travelers registered with the travel agency.
- Notify the users a day before the departure date so they can plan.

Collate and map requirements to Teams features:

| User app needs | Check forecast | Notification before travel | Registered user |
| --- |:---:|:---:|:---:|
| **Capability** | Bot | &nbsp; | &nbsp; |
| **Integration** | &nbsp; | &nbsp; | Microsoft Graph; Forecast website |
| **Scope** | &nbsp; | Personal app; Adaptive Card | &nbsp; |
| **Integration point** | &nbsp; | Chat | &nbsp; |
|

**Teams app solution**: A Teams *personal chat bot* app, which checks and *sends forecast notification* in an *Adaptive Card* to *registered users* before their travel date, checks all requirements.

:::image type="content" source="../msteams-platform/assets/images/overview/user-story-2.png" alt-text="Image showing user story" border="true":::

Teams offers these and many more capabilities to bring your users a feature-rich app solution. To develop this app:

1. Create a personal chat bot app.
1. Integrate with external API from a forecast website to connect and request forecast for specific date and location.
1. Integrate with Microsoft Graph for registered users.
1. Check and send forecast details on the basis of users travel date and travel location on a particular day.

## Choose what suits you

You can build a Teams app as per your app's requirements. Based on factors, such as business needs, development environment, domain knowledge, select the environment and tools you want to build your app.

A Teams app offers you the flexibility of choosing your build environment. This includes tools, framework, and languages to approach your app development.

:::image type="content" source="../msteams-platform/assets/images/overview/app-mindmap.png" alt-text="Business need app" border="true":::

Build your Teams app in the environment that works for your particular requirements. You can even choose a combination of tools and .

For example: You can use Teams Toolkit to build an app with JavaScript and host it on a SharePoint site.

## Teams Collaborative Platform

A Teams app brings your users the advantages of a collaborative workspace.

As a platform for building apps, Teams offers the full range of apps and toolkits. From planning your app to distributing it, the Teams framework supports you at every stage.

:::image type="content" source="../msteams-platform/assets/images/overview/teams-overview.png" alt-text="Illustration of Teams app building framework" border="true":::

By building your app with Teams, you can:

- Design your app with Teams UI Toolkit and UI Library.
- Build personal apps, a shared or collaborative apps, or custom apps.
- Use the benefits of Teams Toolkit that scaffolds the basic app workspace for you with minimal effort.
- Try ready made solutions.
- Integrate with low-code and no-code Apps in Teams.
- Automate tasks and low-code applications.
- Integrate your existing apps with Teams.
- Choose that build environment most suitable for your app, such as JavaScript, C#, SharePoint Framework, and other tools and SDKs.
- Extend Teams functionality with tabs, bots, webhooks, adaptive cards-using them on their own or in combination to suit your app needs
- Dive deeper with user authentication, integration with other apps, Teams data from Microsoft Graph, and Developer Portal to manage your app.

## Useful Links

:::row:::
    :::column span="1":::
        **Start building**
    :::column-end:::
    :::column span="2":::
        Quickly familiarize yourself with building for Teams by setting up your environment and creating a simple app.

        > [!div class="nextstepaction"]
        > [Build your first app](get-started/get-started-overview.md)
    :::column-end:::
:::row-end:::

:::row:::
    :::column span="1":::
        **Integrate with Teams**
    :::column-end:::
    :::column span="2":::
        Blend the features users love about an existing web app, service, or system with the collaborative features of Teams.

        > [!div class="nextstepaction"]
        > [Integrate an existing app](samples/integrating-web-apps.md)
    :::column-end:::
:::row-end:::

:::row:::
    :::column span="1":::
        **A little code goes a long way**
    :::column-end:::
    :::column span="2":::
        You don't need to be an expert programmer to build a great Teams app. Try one of several low-code solutions.

        > [!div class="nextstepaction"]
        > [Create a low-code app](samples/teams-low-code-solutions.md)
    :::column-end:::
:::row-end:::

:::row:::
    :::column span="1":::
        **Get ideas for your app**
    :::column-end:::
    :::column span="2":::
        Looking for app development inspiration? Browse our list of real-world scenarios and industry solutions with high fidelity concept mocks to understand the various ways a Teams app can help your users.

        > [!div class="nextstepaction"]
        > [See app scenarios](https://adoption.microsoft.com/extensibility-look-book/scenarios/)
    :::column-end:::
:::row-end:::

:::row:::
    :::column span="1":::
        **Test your app running across Microsoft 365**
    :::column-end:::
    :::column span="2":::
        You can preview your Teams apps running in other high usage Microsoft 365 experiences with Microsoft Teams JavaScript client SDK v2 Preview.

        > [!div class="nextstepaction"]
        > [Extend your app](m365-apps/overview.md)
    :::column-end:::
:::row-end:::

## See also

- [App fundamentals](~/concepts/app-fundamentals-overview.md)
- [Design your Teams app](~/concepts/design/design-teams-app-process.md)
- [Map your use cases to Teams app capabilities](~/concepts/design/map-use-cases.md)
