---
title: Build apps for the Microsoft Teams platform
description: Learn about Microsoft Teams apps, why you build apps on Teams for your business organization, and how does Teams app help meet business needs.
ms.topic: overview
ms.localizationpriority: high
ms.date: 05/24/2021
---

# Teams app that fits

Microsoft Teams offers a collection of apps that are provided by Microsoft or external services. Teams apps can be tabs, bots, or message extensions or any combination of the capabilities. You can extend Teams apps to work on Microsoft Outlook and Microsoft 365 too. These apps expand the value of the Teams collaborative experience for users.

Apps can be personal or shared. A personal app enables a one-on-one communication and a shared app lets multiple users share app space to collaborate.

## Driving organizational goals

Collaboration and communication are key for an organization. Concise communication, integration with necessary services, and on-the-go accessibility is why organizations are increasingly choosing to rely on apps.

Organizations use it to connect with their customers, provide services, and share information. But that's not all! Apps are the meeting place for people to work together. A well-placed app helps build a cohesive environment for external and internal business needs.

Let's look at some areas where an app helps to meet a business need.

:::image type="content" border="false" source="../msteams-platform/assets/images/overview/why-teams-apps.png" alt-text="Diagram shows why should you build a Teams app.":::

| **Development options** | **Business opportunities** |
| --- | --- |
| - Desktop app <br> - Web app <br> - Mobile app | - Increase user engagement <br> - Make your app discoverable on Microsoft Teams Store |
| **Customer benefits** | **Internal workflows** |
| - On-the-go accessibility <br> - Secure customer data <br> - Ease of communication | - Automate repetitive tasks <br> - Simplify tasks with bots, such as Q&A and helpdesk |

Take a look at these example developer personas and app scenarios:

:::image type="content" border="false" source="assets/images/overview/dev-persona.png" alt-text="Diagram shows the developer persona and user stories." lightbox="assets/images/overview/dev-persona.png":::

You can meet all of these scenarios with Teams apps and enhance collaboration within your Teams across Microsoft 365.

## Build apps with Teams platform

Teams apps help your collaborative workspace to be more productive by bringing key information, common tools, and trusted processes to where people increasingly gather, learn, and work. Apps are how you extend the capabilities of Team platform to fit your requirements. Create something brand new or integrate an existing app, and you utilize benefits of Teams platform for your particular business needs.

The benefits of building apps span from meeting organizational goals to increasing internal productivity.

Here's why Teams is best suited for your app needs:

* **Communication and collaboration**

    Most successful Teams apps involve pulling information from another system, having a conversation about it, and letting users take action. Teams lets you do all these tasks directly within the Teams client. You can even push information to a targeted audience based on an event or action in an external system.

* **Social interactions**

    Teams is a social platform; custom social-focused apps encourage your team to extend your company culture into your collaboration space. Use apps for sending polls, letting people share feedback with each other, enabling connection, and communication.

    :::image type="content" border="false" source="../msteams-platform/assets/images/overview/scenario-social.png" alt-text="Diagram shows a Teams app for building team culture.":::

* **Common business processes**

    Repetitive tasks like creating and sharing a sales call report, tracking a project timeline, reserving common resources, and submitting help desk requests and expense reports make for effective Teams apps.

    :::image type="content" border="false" source="../msteams-platform/assets/images/overview/scenario-approval-flow.png" alt-text="Diagram shows a Teams app for internal use.":::

* **Personal apps with tabs and bots**

    One-to-one conversational bots are one of the more open-ended features in Teams. The conversation is just between the bot and your user. You have the flexibility of including dialogs (referred as task modules in TeamsJS v1.x) to simplify complex sets of information.

    For example, if your app is a design tool with multiple collaborators, a shared bot that notifies all users helps to build user engagement.

    Additionally, a chat bot can be an easy replacement for emails and phone calls to IT or HR departments.

* **Surface existing app**

    If you've got an existing web app, Microsoft SharePoint site (or SharePoint Framework extension), Microsoft Power Apps, or other web-based application, it makes sense to enable some or all of it in Teams. Extending existing apps and porting interactive functionalities to Teams helps to grow user base and user engagement for your app.

    :::image type="content" border="false" source="../msteams-platform/assets/images/overview/scenario-dashboard.png" alt-text="Screenshot shows a SharePoint site ported as a Teams tab.":::

* **Teams Store advantage**

    Push your app on Teams Store to improve app's availability and you can use it as a marketing opportunity. If you're running a startup, Teams platform helps to increase awareness of your products. Teams Store marketplace can be a great platform for large audiences to discover your app.

* **Build once, run everywhere**

    Extend your Teams app across Microsoft 365, which provides a streamlined way to deliver cross-platform apps to an expanded user audience: from a single codebase, you can create app experiences tailored for Teams, Outlook, and Microsoft 365 app environments. End users don't have to leave the context of their work to use your app, and administrators benefit from a consolidated management and deployment workflow.

    Use the latest app manifest and Teams JavaScript client library versions to enable your personal tab and message extension apps to run in other Microsoft 365 experiences in addition to Teams. You can reach users on platforms such as Outlook and Microsoft 365 app all with the same codebase, broadening the reach of your app and streamlining your development and distribution processes.

## From ideas to Teams app

Learn how apps let you help your users in the Teams environment.

Take a look at this scenario:

:::image type="content" source="../msteams-platform/assets/images/overview/developer-scenario.png" alt-text="Diagram shows how to build an app that sends weather forecast to customers so that they can plan their traveling dates in advance." lightbox="../msteams-platform/assets/images/overview/developer-scenario.png":::

As a developer, you want a way to share important and relevant information to help your users. It's a typical user story. Relatable? But how does Teams fit in to this scenario?

Let’s dig deeper into this story and find out.

## Delve into app ideation

:::row:::
   :::column span="":::
      :::image type="content" source="../msteams-platform/assets/images/overview/developer-scenario-01.png" alt-text="Diagram shows the user story as a developer at a travel agency, build apps for travelers.":::
   :::column-end:::
   :::column span="":::
      #### Understand your user

        Know about your user to identify how they use Teams. 
        
        Relevant questions:
        - Do the users mostly use mobile clients?
        - How technically sophisticated are your primary users?
   :::column-end:::
:::row-end:::
:::row:::
   :::column span="":::
      #### Understand the problem

        Identify the user problem that you want to resolve with your app. 

        Relevant questions:
        - What are the pros and cons of the current system of your users?
        - What issues do you want to address?
   :::column-end:::
   :::column span="":::
       :::image type="content" source="../msteams-platform/assets/images/overview/developer-scenario-02.png" alt-text="Diagram shows how to develop an app that sends weather forecast of the destination to customers.":::
   :::column-end:::
:::row-end:::
:::row:::
   :::column span="":::
      :::image type="content" source="../msteams-platform/assets/images/overview/developer-scenario-03.png" alt-text="Diagram shows that customers can know weather conditions and plan ahead.":::
   :::column-end:::
   :::column span="":::
      #### List app requirements and benefits

        Determine your app's features and how you expect it to answer the user's problem. 

        Relevant questions:
        - Do the users need current updates regularly without having to check?
        - Do you need to authenticate users?
   :::column-end:::
:::row-end:::
:::row:::
   :::column span="":::
      #### User-centric solution

        Craft the right app experience for your users with an app that fits their requirement. 

        Relevant questions:
        - Should only registered users receive regular help?
        - What features would be most convenient for user experience?
   :::column-end:::
   :::column span="":::
       :::image type="content" source="../msteams-platform/assets/images/overview/developer-scenario-04.png" alt-text="Diagram shows that the customers are well-prepared for traveling.":::
   :::column-end:::
:::row-end:::

Next, explore some of Teams features that help you build an app solution.

## Next step

> [!div class="nextstepaction"]
> [Explore Teams features](overview-explore.md)
