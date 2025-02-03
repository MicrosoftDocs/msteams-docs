---
title: Developing Apps for Teams Platform
author: heath-hamilton
description: Discover how Microsoft Teams can help meet your business needs by building custom apps on Teams platform. 
ms.topic: guide
ms.localizationpriority: high
ms.date: 05/24/2021
---

# Producing Teams Apps that are Suitable

Microsoft Teams features a selection of applications furnished by Microsoft as well as third-party services. Teams apps can exist in various forms such as tabs, bots, or message extensions or a blend of these. It is possible to extend these apps for compatibility with Outlook and Microsoft 365 App. The purpose of these apps is to enhance collaborative experiences for users on Teams.

Apps could be designed for individual use or meant for sharing. A personal app enables direct communication between two people while a shared app allows multiple users to collaborate within the app space.

## Achieving Organizational Objectives

Effective collaboration and clear communication are crucial for a successful organization. With their ease of use, integration with essential services, and flexibility for usage on the go, apps are quickly becoming an integral part of organizations. 

Organizations use apps in a myriad of ways, from connecting with customers and offering services to disseminating information. Apps also serve as a hub for teamwork. Strategically deployed apps can foster a seamless environment that caters to both internal and external business needs.

Let's delve into some areas where an app can address a business requirement.

:::image type="content" border="false" source="../msteams-platform/assets/images/overview/why-teams-apps.png" alt-text="Screenshot demonstrating why you should build a Teams app.":::

| **Development Alternatives** | **Business Opportunities** |
| --- | --- |
| - Desktop app <br> - Web app <br> - Mobile app | - Amplify user engagements <br> - Showcase your app on Microsoft Teams Store |
| **Advantages for Customers** | **In-house Workflows** |
| - Accessibility on-the-go <br> - Secure customer data <br> - Simplified communication | - Streamline repetitive tasks <br> - Expedite tasks using bots for Q&A and helpdesk services |

Teams platform enables you to develop apps that cater to your specific needs by extending the capabilities of the app. You can either create an entirely new app for Teams or integrate an existing app.

Consider the following developer personas and app scenarios as examples:

:::image type="content" border="false" source="assets/images/overview/dev-persona.png" alt-text="Screenshot demonstrating the developer persona and user stories."lightbox="assets/images/overview/dev-persona.png":::

Using Teams apps, you can cater to all these scenarios and enhance collaboration within your Teams across the Microsoft 365 platform.

## Developing Apps with Microsoft Teams Platform

Teams apps help to enhance your collaborative workspace by consolidating key information, regular tools, and proven processes where your team mainly collates, learns, and works. By creating something entirely new or integrating an existing app, you can utilize the benefits of Teams platform for your individual business needs.

The advantages of building apps range from achieving organizational goals to enhancing internal productivity.

Here are some reasons why Teams is the best choice for your app requirements:

* **Communication and Collaboration**

    Successful Teams apps typically involve extracting information from a different system, initiating a conversation about it, and enabling users to take action. Teams allows you to undertake all these tasks directly within the Teams client. You can even push information to a preselected audience based on an event or action in an external system.

* **Social Interactions**

    As Teams is a social platform, custom social-focused apps can help extend your company culture into your collaboration space. Apps could be used to conduct polls, share feedback, encourage interactions and communication.

    :::image type="content" border="false" source="../msteams-platform/assets/images/overview/scenario-social.png" alt-text="Screenshot showcasing a Teams app for building team culture.":::

* **Common Business Processes**

    Repetitive tasks such as composing and sharing a sales call report, tracking project timelines, reserving shared resources, filing help desk requests, and expense reports can be simplified using effective Teams apps.

    :::image type="content" border="false" source="../msteams-platform/assets/images/overview/scenario-approval-flow.png" alt-text="Screenshot showcasing a Teams app for in-house use.":::

* **Personal Apps with Tabs and Bots**

    On Teams, one-to-one conversational bots are some of the more flexible features. The interaction is between the bot and your user. You have the freedom to include task modules (as referred to in TeamsJS v1.x) to simplify complex information sets.

    For instance, if your app is a design tool that allows multiple collaborators, a shared bot that notifies all users can help increase user engagement.

    In addition, a chatbot can serve as a convenient replacement for emails and phone calls to IT or HR departments.

* **Existing App Integration**

    If you already have a web app, SharePoint site (or SPFx extension), PowerApp, or other web-based application, it may be practical to add some or all of it to Teams. Extending existing apps and porting interactive functionalities to Teams aids in expanding your user base and fostering user engagement with your app.

    :::image type="content" border="false" source="../msteams-platform/assets/images/overview/scenario-dashboard.png" alt-text="Screenshot showcasing the SharePoint site ported as a Teams tab.":::

* **Advantage of Teams Store**

    Listing your app on the Teams Store can improve its accessibility and serve as a marketing opportunity. If you are a startup, the Teams platform can assist in building awareness around your products. The Teams Store marketplace can provide an extensive platform for a larger audience to discover your app.

* **Create Once, Run Anywhere**

    Extend your Teams app across Microsoft 365, providing an efficient way to deliver cross-platform apps to a wider user base. From a single codebase, you can create apps suitable for Teams, Outlook, and Microsoft 365 app environments. End users don’t have to switch contexts to use your app, and administrators benefit from a consolidated management and deployment workflow.

    Use the latest app manifest and Teams JavaScript client library versions to enable your personal tab and message extension apps to run in other Microsoft 365 environments in addition to Teams. You can reach users on platforms such as Outlook and Microsoft 365 app with the same codebase, thereby increasing the reach of your app and simplifying your development and distribution processes.

## What’s Next

> [!NOTE]
> [From Ideas to Teams App](overview-story.md)