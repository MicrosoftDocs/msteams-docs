---
title: Teams solution for building apps
author: heath-hamilton
description: Understand how to plan, design, build, extend to Microsoft 365, test, distribute, monetize, and integrate your app with Teams.
ms.topic: overview
ms.localizationpriority: high
ms.author: lajanuar
ms.date: 11/02/2021
---
# The Teams solution

The Microsoft Teams Platform is a powerful, flexible platform for creating apps for Teams. It provides a vast suite of development environments and tools to support app development.

## The user story

You've had a view of Teams offerings. You can now map them to user needs. Let’s revisit the scenario.

The developer from Tours and Travel agency wants to build an app for their users, the travelers. The app must:

- Check and send the forecast to travelers registered with the travel agency.
- Notify the users a day before the departure date so they can plan.

Collate and map requirements to Teams features:

| User app needs | Check forecast | Notification before travel | Registered user |
| --- |:---:|:---:|:---:|
| **Capability** | Bot | &nbsp; | &nbsp; |
| **Integration** | &nbsp; | &nbsp; | :::image type="icon" source="assets/icons/microsoft-icon.png"::: Microsoft Graph, Weather API |
| **Scope** | &nbsp; | Personal app | &nbsp; |
| **Integration point** | &nbsp; | Chat | &nbsp; |

**Teams app solution**: A Teams *personal chat bot* app that checks and *sends forecast notification* to *registered users* before their travel date.

:::image type="content" source="../msteams-platform/assets/images/overview/developer-scenario-solution.png" alt-text="A developer at a travel agency builds a bot for Teams that sends weather forecast to customers so that they can plan ahead their traveling dates":::

Teams offers these and many more capabilities to bring your users a feature-rich app solution. To develop this app:

1. Create a personal chat bot app.
1. Integrate with an external weather forecast API to connect and request forecast for specific date and location.
1. Integrate with :::image type="icon" source="assets/icons/teams-icon.png"::: Microsoft Graph for registered users.
1. Check and send forecast details based on user's travel date and travel location.

## Choose what suits you

You can build a Teams app as per your app's requirements. Based on factors, such as business needs, development environment, domain knowledge, select the environment and tools you want to build your app.

A Teams app offers you the flexibility of choosing your build environment. It includes tools, framework, and languages to approach your app development.

:::image type="content" source="../msteams-platform/assets/images/overview/tools-of-your-choice.png" alt-text="Business need app":::

Build your Teams app in the environment that works for your particular requirements. You can even select a combination.

For example, you can use Teams Toolkit to build an app with JavaScript and host it on a SharePoint site.

## Teams collaborative platform

A Teams app brings your users the advantages of a collaborative workspace.

As a platform for building apps, Teams offers the full range of apps and toolkits. Teams platform supports you at every stage from planning your app to distributing it.

:::image type="content" source="../msteams-platform/assets/images/overview/teams-dev-life-cycle.png" alt-text="Describing a life cycle of Teams app development. Plan, Design, Build, Extend, Test, Deploy, Distribute. Details shown in a bullet list below.":::

From designing to building and distributing a Teams app, you can use various tools and services. An example development flow can be:

1. Plan your project and figure out the requirement.
1. Design the app. Use Teams UI Kit and UI Library for designing tabs UI.
1. Build the app with JavaScript using Teams Toolkit.
1. Extend functionality by adding more Teams capabilities and M365 data with :::image type="icon" source="assets/icons/microsoft-icon.png"::: Microsoft Graph.
1. Test the app on a developer tenant with sample user data.
1. Deploy the app to Azure.
1. Manage and publish the apps to Store with Developer Portal. Monetize your app with options, such as SaaS offers, in-app purchases, and more.

## Next step

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

## See also

- [Teams app that fits](overview.md)
- [Design process for Microsoft Teams apps](concepts/design/design-teams-app-process.md)
- [Extend Teams apps across Microsoft 365](m365-apps/overview.md)
- [Test your app](concepts/build-and-test/test-app-overview.md)
- [Distribute your Microsoft Teams app](concepts/deploy-and-publish/apps-publish-overview.md)
- [Monetize your app](concepts/deploy-and-publish/appsource/prepare/monetize-overview.md)
- [Considerations for Teams integration](samples/integrating-web-apps.md)
- [Teams Toolkit Overview](toolkit/teams-toolkit-fundamentals.md)
- [Developer Portal for Teams](concepts/build-and-test/teams-developer-portal.md)
