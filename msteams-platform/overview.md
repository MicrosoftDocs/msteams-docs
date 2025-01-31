---
title: Developing Apps for Teams Platform
author: heath-hamilton
description: Discover Microsoft Teams, understand why you should develop apps on Teams platform, and see how Teams app fulfills business needs.
ms.topic: overview
ms.localizationpriority: high
ms.date: 05/24/2021
---
# Customizing Teams App 

Microsoft Teams provides a range of apps from Microsoft and external services. Teams apps can be tabs, bots, message extensions or they can combine these features. You can adapt Teams apps to function with Outlook and Microsoft 365 App, significantly enhancing the Teams collaborative experience for users.

Apps can be personal or communal. A personal app facilitates one-to-one communication while a communal app allows multiple users to share app space for collaboration.

## Aligning with Organizational Goals

Effective collaboration and communication are vital for an organization. Clear communication, integration with necessary services, and mobile accessibility are driving organizations to increasingly rely on apps.

Organizations use these to connect with customers, offer services, and disseminate information. Yet, that's not all! Apps serve as a meeting place for people to work together. A strategically placed app supports a unified environment to meet both external and internal business requirements.

Let's examine areas where an app caters to a business need.

:::image type="content" border="false" source="../msteams-platform/assets/images/overview/why-teams-apps.png" alt-text="Screenshot displays reasons for building a Team’s app.":::

| **Development Options** | **Business Opportunities** |
| --- | --- |
| - Desktop app <br> - Web app <br> - Mobile app | - Enhance user engagement <br> - Improve app discoverability on Microsoft Teams Store |
| **Customer Benefits** | **Internal Workflows** |
| - Mobile accessibility <br> - Secure customer data <br> - Streamlined communication | - Automate repetitive tasks <br> - Simplify tasks with bots (Q&A and helpdesk) |

With Teams platform, adaptive apps can be built to suit your needs. Develop something entirely new for Teams or integrate an existing app.

Consider these example developer personas and app scenarios:

:::image type="content" border="false" source="assets/images/overview/dev-persona.png" alt-text="Screenshot displays the developer persona and user stories."lightbox="assets/images/overview/dev-persona.png":::

Teams apps can meet these scenarios, enhancing collaboration across your Teams within Microsoft 365.

## Crafting Apps with Microsoft Teams Platform

Teams apps boost your collaborative workspace's productivity by bringing key details, routine tools, and trusted methods to the place where people gather, learn, and work. Apps enhance the capabilities of the Team's platform to suit your needs. Either create something entirely new or integrate an existing app to harness the benefits of the Teams platform for your specific business needs.

The benefits of building apps range from achieving organizational goals to improving internal productivity.

Here's why Teams is ideal for your app needs:

* **Communication and Collaboration**

    Successful Teams apps typically involve fetching information from another system, initiating a conversation about it, and enabling users to act. Teams permit all these tasks directly within the Teams client. Information can even be pushed to a targeted audience based on an event or action in an external system.

* **Social Interactions**

    As a social platform, Teams encourages team culture extension into your collaboration space through custom social-focused apps. Utilize apps to launch polls, share feedback internally, and facilitate communication and connection.

    :::image type="content" border="false" source="../msteams-platform/assets/images/overview/scenario-social.png" alt-text="Screenshot of a Teams app that fosters team culture.":::

* **Routine Business Processes**

    Activities like preparing and sharing a sales call report, tracking project timelines, reserving common resources, lodging help desk requests and submitting expense reports are repetitive. Teams apps prove to be effective for such tasks.

    :::image type="content" border="false" source="../msteams-platform/assets/images/overview/scenario-approval-flow.png" alt-text="Screenshot of a Teams app for internal usage.":::

* **Personal Apps with Tabs and Bots**

    One-to-one conversational bots are among the more flexible features in Teams. The conversation is between only the bot and your user. With dialogues (referred to as task modules in TeamsJS v1.x), complex information sets can be simplified.

    For instance, if your app is a design tool with multiple collaborators, a communal bot that notifies all users aids in fostering user engagement.

    Furthermore, a chat bot can serve as an efficient alternative for IT or HR department emails and phone calls.

* **Existing App Integration**

    If you already have a web app, SharePoint site (or SPFx extension), PowerApp, or other web-based application, integrating some or all of it in Teams could be beneficial. Extending existing apps and transferring interactive functionalities to Teams aids in enhancing your app's user base and their engagement.

    :::image type="content" border="false" source="../msteams-platform/assets/images/overview/scenario-dashboard.png" alt-text="Screenshot shows a SharePoint site ported as a Teams tab.":::

* **Teams Store Advantage**

    Featuring your app on Teams Store enhances its availability and marketing potential. If your company is a startup, the Teams platform can help raise product awareness. The Teams Store marketplace could be a compelling platform for a large audience to discover your app.

* **Develop Once, Deploy Everywhere**

    Across Microsoft 365, extend your Teams app, which provides an efficient way to deliver cross-platform apps to an expanded user audience. From a single codebase, you can tailor app experiences for Teams, Outlook, and Microsoft 365 app environments. Users aren't required to leave their work context to use your app, and administrators benefit from a consolidated management and deployment workflow.

    Use the latest app manifest and Teams JavaScript client library versions to enable your personal tab and message extension apps to function in other Microsoft 365 experiences in addition to Teams. Reach users on platforms such as Outlook and Microsoft 365 app with a singular codebase, widening the reach of your app and streamlining your development and distribution processes.

## Next Step

> [!div class="nextstepaction"]
> [From Concepts to Teams App](overview-story.md)