---
title: Developing Apps for the Teams Platform
author: heath-hamilton
description: Understand Microsoft Teams, the importance of building apps on the Teams platform, and how these apps support business requirements.
ms.topic: overview
ms.localizationpriority: high
ms.date: 05/24/2021
---

# Tailored Teams Apps

Microsoft Teams provides an array of apps delivered by either Microsoft or third-party platforms. These apps can come in the form of tabs, bots, or message extensions, or even a combination of these features. Moreover, you can enhance Teams apps for use on Outlook and Microsoft 365 App, extending their value to users.

Teams apps can be utilized individually or in shared collaborations. Personal apps provide one-on-one communication, while shared apps offer collaborative spaces for multiple users.

## Promoting Organizational Objectives

Effective communication and teamwork are crucial for organizational success. Apps offer concise communication, integration with necessary services, and portable accessibility, factors that explain the rising deployment of apps in organizations.

Apps enable organizations to connect with their customers, deliver services, and share information. They also serve as a platform for collaborative work. Appropriately deployed apps foster a cohesive environment for both external and internal business functions.

Several areas demonstrate how an app can meet business requirements.

:::image type="content" border="false" source="../msteams-platform/assets/images/overview/why-teams-apps.png" alt-text="Screenshot illustrating reasons for building a Teams app.":::

| **Development options** | **Business opportunities** |
| --- | --- |
| - Desktop app <br> - Web app <br> - Mobile app | - Amplify user engagement <br> - Promote app discoverability on Microsoft Teams Store |
| **Customer benefits** | **Internal workflows** |
| - Accessibility on the move <br> - Secure customer data <br> - Simplified communication | - Streamline repetitive tasks <br> - Efficient tasks management with bots, such as Q&A and helpdesk |

You can develop apps on the Teams platform by presenting app features to suit your requirements. This could involve inventing something entirely new or integrating an existing app.

Below are some examples of developer personas and app scenarios:

:::image type="content" border="false" source="assets/images/overview/dev-persona.png" alt-text="Screenshot showing developer personas and user stories."lightbox="assets/images/overview/dev-persona.png":::

With Teams apps, you can accommodate all of these scenarios, promoting collaboration within your Teams throughout Microsoft 365.

## Building Apps on Microsoft Teams Platform

Teams apps enhance productivity by bringing vital information, common tools, and trusted processes into your collaborative workspace. These apps are your tools for adjusting the capabilities of the Team platform to meet your unique needs. Whether you create a new app or leverage an existing one, you are utilizing the advantages of the Teams platform to fulfill your specific business needs.

The benefits of building apps extend from achieving organizational goals to boosting internal productivity.

Here are a few reasons why Teams is ideal for your app needs:

* **Communication and Collaboration**

    Successful Teams apps often pull information from another system, foster discussion about it, and permit users to act upon it. Teams allows for all these activities within the Teams client alone. You can also push information to a specified audience based on an event or action in an external system.

* **Social Interactions**

    Since Teams is a social platform, personalized social-focused apps can help extend your company culture into your collaborative workspace. Use apps for initiating polls, sharing feedback, and promoting connection and communication.

    :::image type="content" border="false" source="../msteams-platform/assets/images/overview/scenario-social.png" alt-text="Screenshot showing the Teams app for fostering team culture.":::

* **Common Business Processes**

    Repetitive tasks such as compiling and sharing a sales call report, tracking project timelines, reserving common resources, and submitting helpdesk requests make for effective Teams apps.

    :::image type="content" border="false" source="../msteams-platform/assets/images/overview/scenario-approval-flow.png" alt-text="Screenshot of a Teams app for internal usage.":::

* **Personal Apps Using Tabs and Bots**

    One-to-one conversation bots are among the more unique features in Teams, allowing for a conversation between the bot and the user. You can include dialogs (referred to as task modules in TeamsJS v1.x) to streamline complex data sets.

    For instance, in a design tool app with multiple collaborators, a shared bot that informs all users helps foster user engagement.

    Moreover, a chatbot can effectively replace emails and phone calls to IT or HR departments.

* **Showcasing Existing Apps**

    If you already have a web app, SharePoint site (or SPFx extension), PowerApp, or another web-based application, it may be beneficial to make it accessible in Teams. By extending existing apps and porting their interactive functionalities to Teams, you can grow your user base and engagement.

    :::image type="content" border="false" source="../msteams-platform/assets/images/overview/scenario-dashboard.png" alt-text="Screenshot showing a SharePoint site ported as a Teams tab.":::

* **Advantage of Teams Store**

    By featuring your app on the Teams Store, you can increase its availability and use it as a marketing opportunity. If you're a startup, the Teams platform can help raise awareness of your products. The Teams Store marketplace is an excellent platform for a wide audience to discover your app.

* **Build Once, Use Everywhere**

    Expand your Teams app across Microsoft 365 to provide a cross-platform app delivery method to a larger user audience. From one codebase, you can create app experiences tailored for Teams, Outlook, and Microsoft 365 app environments. Users can stay in their workspace context to use your app, while administrators benefit from a consolidated management and deployment procedure.

    By using the latest app manifest and Teams JavaScript client library versions, you can enable your personal tab and message extension apps to run in other Microsoft 365 experiences, in addition to Teams. This allows you to reach users on platforms such as Outlook and Microsoft 365 app all with the same codebase, broadening the reach of your app and streamlining your development and distribution processes.

## Next Step

> [!div class="nextstepaction"]
> [From ideas to Teams app](overview-story.md)
