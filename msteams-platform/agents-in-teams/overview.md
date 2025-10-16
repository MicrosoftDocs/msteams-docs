---
title: Agents in Teams - Overview
description: Learn about agents in Teams and associated organizational goals, why should you build agents on Teams platform, and how do Teams agent help meet business needs.
ms.localizationpriority: high
ms.date: 02/06/2025
ms.topic: reference
---

# Agents in Teams

Microsoft Teams platform enables developers to build and integrate collaborative experiences into Teams. Whith the introduction of Teams AI library, developers can now create agents - intelligent apps that can understand context, respond conversationally, and perform tasks across Teams. Your agents built for Teams can also be extended beyond Teams environment into other Microsoft 365 hubs, such as Outlook, using Microsoft 365 Agents SDK.

## What are agents in Teams?

Agents in Teams can interact through natural language, connect to business data, and perform actions on behalf of the users.

:::image type="content" source="../assets/images/agents-in-teams/agent-overview/agents-in-teams.png" alt-text="Image shows what are agents in Teams." lightbox="../assets/images/agents-in-teams/agent-overview/agents-in-teams.png":::

Built using Teams AI library, agents leverage the power of large language models (LLMs) and Microsoft's ecosystem to deliver customized and secure AI experiences within Teams. A Teams agent integrates into Microsoft Teams and uses large language models (LLMs) to understand user intent, perform tasks, and enhance collaboration. These agents can be embedded in chats, meetings, or channels and can respond to queries, generate reports, manage tasks, and more.

## Why build agents for Teams?

Microsoft Teams provides a powerful platform for teams to connect, communicate, and work together. Building agents on Microsoft Teams helps to build enhanced collaboration, increased productivity, and customization. Agents can automate workflows, provide real-time updates, and facilitate informed decision-making. By leveraging Teams' capabilities, organizations can streamline processes, increase team efficiency, and improve customer engagement. With agents, Teams can focus on high-priority work to enable better outcomes and success.

### Agent user experience

- **In-context intelligence**: Users can interact directly with agents within their Teams usage during conversations and meetings.
- **Task automation**: Agents can handle repetitive or complex tasks, such as summarizing chats, scheduling meetings, or pulling business data.
- **Personalized assistance**: Agents can adapt to user preferences and roles for more relevant and actionable insights.

### Agent developer experience

- **Native Teams integration**: Simplified developmnt using Teams AI library with built-in support for Teams' authentication, messaging, and UI components.
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

:::image type="content" source="../assets/images/agents-in-teams/agent-overview/agent-scenario-academic.png" alt-text="Image shows agent user scenario." lightbox="../assets/images/agents-in-teams/agent-overview/agent-scenario.png" border="none":::

For more information, see [Add link to code sample to Contoso Knowledge Hub].

Some other user scenarios can include:

- **Code companion**: Get instant coding assistance with the code companion, an agent for helping developers on-the-go. Code companion is your on-the-go agent available 24/7 to help you overcome coding challenges and boost productivity. This agent provides:

  - Code and tool suggestions: Get hep with code snippets, debugging, relevant code samples, and tools available for building your agents and apps.
  - Error resolution:Identifying and suggesting fixes with code analysis.
  - Best practices: Learn more about industry-standard coding practices.
  - Knowledgebase: Access a vast repository of domain and product knowledge from Learn documentation and tutorials.
- Helpdesk and customer support
- Task automation

## How to choose?

Developers and organizations can choose from multiple approaches depending on the app requirements:

- **Low-code or no-code**: Use Microsoft Copilot Studio to design conversational experiences with minimal code.
- **Pro-code**: Use Teams AI library to build fully customized agents, integrated with agents to handle complex or domain-specific needs.

## Tools and SDKs for building agents

[Add introduction]

- **Teams AI library**: This is the latest SDK for building agents specifically tailored for the Teams environment It simplifies the development process by providing:

  - Simplified message handling
  - Integration with Adaptive Cards and Teams UI components
  - Native support for OpenAI and Azure OpenAI models

- **Microsoft 365 Agents SDK**: The Microsoft 365 Agents SDK allows developers to extend their Teams agents and apps beyond Teams. It helps make the agents and apps available for Microsoft 365 Chat,  Outlook, and other Microsoft 365 hubs. This enables developers to deliver consistent experience across platforms in the Microsoft ecosystem.

- **Microsoft 365 Agent Tools**: [Add details]
