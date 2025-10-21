---
title: Microsoft Teams Developer Platform
author: heath-hamilton
description: Learn about Microsoft Teams and associated organizational goals, why should you build agents and apps on Teams platform, and how do they help meet business needs.
ms.topic: overview
ms.localizationpriority: high
ms.date: 04/18/2025
---
# Microsoft Teams developer platform overview

Microsoft Teams platform empowers developers to create intelligent and collaborative experiences directly into Teams experience. Whether you want to build powerful agents or rich apps, the platform gives you the tools to extend Teams with seamless, secure, and contextual solutions. Teams platform supports custom experiences, workflows, and integrations that live where people work.

<!--
Microsoft Teams offers a collection of apps provided by Microsoft or external services. Teams apps include tabs, bots, message extensions, or any combination of these capabilities. You can extend Teams apps to work on Outlook and Microsoft 365 app, too. These apps expand the value of the Teams collaborative experience for users.

Apps present themselves as personal or shared. A personal app enables one-on-one communication, while a shared app lets multiple users collaborate in a common space.
-->

## What is Teams platform?

Teams is evolving from a communication hub into a collaborative and intelligent platform with agents where people, data, and AI come together. Developers can build agents in Teams using Teams AI library. It enables natural, conversational, and context-aware experiences powered by large language models (LLMs).
At the same time, developers can continue to create Teams apps. You can also extend Teams capabilities for task-specific workflows, data, visualization, and integration with enterprise systems.

Take a look at these example developer personas, and agent and app scenarios:

:::image type="content" border="false" source="assets/images/overview/dev-persona.png" alt-text="Screenshot shows you the developer persona and user stories." lightbox="assets/images/overview/dev-persona.png":::

You can meet these scenarios using Teams agents and apps, and enhance collaboration across Microsoft 365.

## Why build on Teams platform?

Teams plaform empowers developers to build agents and apps to achieve goals, boost productivity, and foster collaboration. You can automate tasks, facilitate communication, and integrate seamlessly across Microsoft 365 platforms.

Agents are the backbone of modern organizations, enabling seamless collaboration, communication, and workflow automation. By integrating agents into workspaces, organizations connect with customers, deliver services, and share information efficiently. Key roles of an agent include:

- **Collaboration and communication**: Agents facilitate concise, targeted interactions, integrating with essential services and providing on-the-go accessibility.
- **Business enablement**: Agents automate repetitive tasks, streamline internal workflows, and simplify processes such as Q&A, helpdesk, and approvals.
- **Customer engagement**: Agents ensure secure data handling, ease of communication, and personalized experiences.

Agents can be deployed across desktop, web, and mobile platforms, and integrated into Microsoft Teams to:

- Increase user engagement
- Surface key information and tools
- Automate business processes

### Extend and scale agents

Agents can integrate existing web apps, SharePoint sites, PowerApps, and other solutions into Teams, expanding reach and engagement. Publishing agents to the Teams Store increases visibility and adoption.

You can build unified experience for agents. Build agents once and deploy them everywhere—across Teams, Outlook, and Microsoft 365—using a single codebase. This approach streamlines development, management, and user access, ensuring consistent experiences and efficient administration.

### Social interactions and personal apps

Teams acts as a social platform, where custom apps help extend company culture. Personal apps use conversational bots for direct user interaction, and task modules (dialogs) make complex data easy to manage.

## What to build on Teams platform?

The Teams platform offers two powerful paths for developers. Select agents to build an agent in Teams, or select apps to add other Teams capabilities.

[WIP image placeholder]

:::row:::
    :::column:::
        :::image type="content" source="assets/images/agents-in-teams/path.png" alt-text="Image to choose a path" border="false":::
    :::column-end:::
:::row-end:::
:::row:::
    :::column:::
        :::image type="content" source="assets/images/agents-in-teams/choose-agent.png" alt-text="Image to choose agent" border="false" lightbox="assets/images/agents-in-teams/choose-agent.png" link="agents-in-teams/overview.md":::
    :::column-end:::
    :::column:::
        :::image type="content" source="assets/images/agents-in-teams/choose-app.png" alt-text="Image to choose app" border="false" link="get-started/get-started-overview.md" lightbox="assets/images/agents-in-teams/choose-app.png":::
    :::column-end:::
:::row-end:::

<!--
| When to build | Use this approach | Ideal for ... |
| --- | --- | --- |
| Agents in Teams | Use the Teams AI library to build intelligent, conversational agents that understand natural language and act within context. | Personalized assistance, task automation, intelligent workflows, summarization, insights |
| Apps in Teams | Use the Microsoft 365 Agents SDK and Microsoft 365 Agents toolkit to build or add capabilities like tabs, bots, message extensions, or meeting experiences | Productivity tools, dashboards, content sharing, structured workflows, enterprise integrations |
-->
<!--
### Agents in Teams

Agents in Teams are intelligent assistants that can understand, reason, and act within the Teams environment. Using Teams AI library, developers can create agents that engage naturally with users, automate business processes, and integrate securely with Microsoft 365 data and services.

#### Key benefits

- **Conversational and contextual**: [Add details]
- **Seamless integration**: [Add details]
- **Future-ready**: [Add details]
- **Built secure**: [Add details]

For more information, see [Agents in Teams](agents-in-teams/overview.md).

#### Example scenario

[Add scenario for Teams agents: Summarizes updates and creates tasks; helpdesk, etc.]

### Apps in Teams

Teams apps extend collaboration with custom interfacses and integrated workflows. Developers can add one or more capabilities such as tabs, bots, message extension, or meeting apps to deliver tailored solutions.

### Choose your path and get started
-->

<!--
## Driving organizational goals

Collaboration and communication serve as key pillars for any organization. Concise communication, integration with necessary services, and on-the-go accessibility demonstrate why organizations choose to rely on apps.

Organizations connect with customers, provide services, and share information with apps. Apps become the meeting place for people to work together. A well-placed app builds a cohesive environment for external and internal business needs.

Consider example areas where an app meets a business requirement:

:::image type="content" border="false" source="../msteams-platform/assets/images/overview/why-teams-apps.png" alt-text="Screenshot shows you why should you build Teams app." :::

| **Development options** | **Business opportunities** |
| --- | --- |
| - Desktop app <br> - Web app <br> - Mobile app | - Increase user engagements <br> - Make your app discoverable on Microsoft Teams Store |
| **Customer benefits** | **Internal workflows** |
| - On-the-go accessibility <br> - Secure customer data <br> - Ease of communication | - Automate repetitive tasks <br> - Simplify tasks with bots, such as Q&A and helpdesk |

You can build apps with the Teams platform by extending app capabilities to fit specific needs. You can create something brand new for Teams or integrate an existing app.

### Build agent with Microsoft Teams platform

Teams apps empower collaborative workspaces to increase productivity by bringing key information, common tools, and trusted processes directly to users. You can extend the capabilities of the Teams platform to fulfill specific requirements by creating a brand new app or integrating an existing app. This process meets both organizational goals and productivity needs.

The benefits of building apps span from meeting organizational goals to increasing internal productivity.

Here's why Teams is best suited for your app needs:

1. **Communication and collaboration**

   You can build Teams apps that pull information from external systems, facilitate conversations, and enable users to take action. Teams integrates these features within the client, and you can push information to a targeted audience when an event or action occurs in an external system.

2. **Social interactions**

   Teams serves as a social platform. Custom social-focused apps encourage teams to extend company culture into the collaboration space. You can use apps for sending polls, enabling users to share feedback, and promoting connection and communication.

   :::image type="content" border="false" source="../msteams-platform/assets/images/overview/scenario-social.png" alt-text="Screenshot shows you the Teams app for building team culture." :::

3. **Common business processes**

   You can create Teams apps to handle repetitive tasks such as creating and sharing sales call reports, tracking project timelines, reserving common resources, submitting help desk requests, and managing expense reports. Such tasks often benefit from automation and streamlined workflows when integrated into Teams apps.

   :::image type="content" border="false" source="../msteams-platform/assets/images/overview/scenario-approval-flow.png" alt-text="Screenshot shows you the Teams app for internal use." :::

4. **Personal apps with tabs and bots**

   Personal apps incorporate one-to-one conversational bots that open dialogue between the bot and a user. You can include dialogs (referred to as task modules in TeamsJS v1.x) that simplify complex data sets. For instance, a design tool app with multiple collaborators integrates a shared bot that notifies users, driving engagement. Additionally, a chat bot replaces emails or phone calls for IT or HR departments effectively.

5. **Surface existing app**

   You can integrate existing web apps, SharePoint sites (or SPFx extensions), PowerApps, or other web-based applications into Teams. Extending existing apps and porting interactive features to Teams expands the user base and increases engagement.

   :::image type="content" border="false" source="../msteams-platform/assets/images/overview/scenario-dashboard.png" alt-text="Screenshot shows you the SharePoint site ported as a Teams tab." :::

6. **Teams Store advantage**

   You can push apps to Teams Store to improve availability and create marketing opportunities. For startups and established organizations, the Teams Store marketplace increases product awareness and reaches large audiences.

7. **Build once, run everywhere**

   Extend Teams apps across Microsoft 365, which streamlines delivering cross-platform apps to a wider audience. A single codebase supports tailored app experiences for Teams, Outlook, and Microsoft 365 app environments. End users access apps without leaving their work context, while administrators manage and deploy workflows efficiently.

   Use the latest app manifest and Teams JavaScript client library versions to enable personal tabs and message extension apps to run in other Microsoft 365 experiences in addition to Teams. You can reach users on platforms such as Outlook and Microsoft 365 app with the same codebase, broadening app reach and streamlining development and distribution processes.
-->

## Next step

> [!div class="nextstepaction"]
> [Agents in Teams](agents-in-teams/overview.md)
> [!div class="nextstepaction"]
> [Build your first agent](agents-in-teams/build-first-agent.md)
