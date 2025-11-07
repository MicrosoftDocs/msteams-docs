---
title: Agents in Teams - Overview
description: Learn about agents in Teams and associated organizational goals, why should you build agents on Teams platform, and how do Teams agent help meet business needs.
ms.localizationpriority: high
ms.date: 02/06/2025
ms.topic: reference
---

# Agents in Teams

With the introduction of Teams SDK, developers can create collaborative agents for Teams users. In addition to giving query responses, agents in Teams can summarize conversations, draft documents, manage tasks, automate processes, and provide personalized insights. These agents help users coordinate, communicate, and achieve more efficiently within Teams. Your agents built for Teams can also be extended beyond Teams into other Microsoft 365 hubs, such as Outlook, using Microsoft 365 Agents SDK.

## What are agents in Teams?

Agents in Teams are intelligent and conversational apps built with Teams SDK. They interact through natural language (LLM), connect to business data, and perform actions on behalf of users. Leveraging large language models and Microsoft’s ecosystem, these agents deliver secure, customized AI experiences within Teams and can be extended to other Microsoft 365 hubs using the Microsoft 365 Agents SDK.

:::image type="content" source="../assets/images/agents-in-teams/agent-overview/agents-in-teams.png" alt-text="Image shows what are agents in Teams." border="false" lightbox="../assets/images/agents-in-teams/agent-overview/agents-in-teams.png":::

 An agent in Teams understands user intent, performs tasks, and enhances collaboration.

## Why build agents for Teams?

Building agents for Teams helps to enhance collaboration and increase productivity. Agents can automate workflows, provide real-time updates, and facilitate informed decision-making. By leveraging Teams' capabilities, organizations can streamline processes, increase team efficiency, and improve customer engagement. Within Teams, agents can focus on high-priority work to enable better outcomes and success.

### Agent user experience

- **In-context intelligence**: Users can interact directly with agents within their Teams usage during conversations and meetings.
- **Task automation**: Agents can handle repetitive or complex tasks, such as summarizing chats, scheduling meetings, or pulling business data.
- **Personalized assistance**: Agents can adapt to user preferences and roles for more relevant and actionable insights.

### Agent developer experience

- **Native Teams integration**: Simplified development using Teams SDK with built-in support for Teams' authentication, messaging, and UI components.
- **Security and compliance**: Benefit from identity, compliance, and data protection frameworks.
- **Extensibility across Microsoft 365**: Agents can evolve beyond Teams into other Microsoft 365 experiences using Microsoft 365 Agents SDK.

### Common user scenarios

Here are some scenarios for agents in Teams:

**Knowledge hub**: Get instant and personalized guidance and support with the knowledge hub agent. This agent is designed to empower students in their academic and career journeys. The agent offers personalized support for course selection, study strategies, career development planning, and academic roadmap creation. By responding to targeted prompts, it helps students make informed decisions about their education and future career paths. This comprehensive tool provides:

- **Personalized course recommendations**: Suggests courses to build AI skills and other in-demand competencies.
- **Career-aligned academic planning**: Guides students in choosing courses that match their career goals.
- **Sample course plans**: Generates tailored course plans based on individual aspirations.
- **Institutional insights**: Provides information about top educational institutions in IT and related fields.
- **Course shortlisting and next steps**: Shortlists top courses aligned with career objectives and outlines actionable next steps for each.
- **Expert-endorsed recommendations**: Recommends leading courses from recognized experts in IT and AI.

:::image type="content" source="../assets/images/agents-in-teams/agent-overview/agent-scenario-academic.png" alt-text="Image shows agent user scenario." lightbox="../assets/images/agents-in-teams/agent-overview/agent-scenario-academic.png" border="false":::

For more information, see [code samples for agents](build-first-agent.md#code-sample).

## Choose an approach to build your agent

Developers and organizations can choose from multiple approaches depending on the app requirements:

- **Low-code or no-code**: Use Microsoft Copilot Studio to design conversational experiences with minimal code.
- **Pro-code**: Use Teams SDK to build fully customized agents, integrated with agents to handle complex or domain-specific needs.

## Tools and SDKs for building agents

Here's a list of tools and SDKs you can use to build agents for Teams:

- **Teams SDK**: This is the latest SDK for building agents specifically tailored for the Teams environment It simplifies the development process by providing:

  - Simplified message handling
  - Integration with Adaptive Cards and Teams UI components
  - Native support for OpenAI and Azure OpenAI models

- **Microsoft 365 Agents SDK**: The Microsoft 365 Agents SDK allows developers to extend their Teams agents and apps beyond Teams. It helps make the agents and apps available for Microsoft 365 Chat,  Outlook, and other Microsoft 365 hubs. This enables developers to deliver consistent experience across platforms in the Microsoft ecosystem.

- **Microsoft 365 Agent Toolkit**: Microsoft 365 Agents Toolkit is the pro-code option for building and debugging agents and actions (plugins). You can use the toolkit to build agents tailored for Teams. It also provides support for all major Microsoft 365 platform extensibility surfaces, including agents, tabs, bots, message extensions, and Outlook Add-ins. Agents Toolkit is available as an extension for Visual Studio Code and Visual Studio.

## Next step

> [!div class="nextstepaction"]
> [Build your first agent](build-first-agent.md)
