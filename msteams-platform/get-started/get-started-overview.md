---
title: Get Started - Overview
description: Learn how to create your first Microsoft Teams app based on language and development environments, understand app capabilities, and SDKs.
ms.localizationpriority: high
ms.date: 02/06/2025
ms.topic: reference
---

# Apps in Teams

Teams apps are custom solutions designed to enhance collaboration and productivity within Microsoft Teams. They leverage the platform’s extensibility to deliver interactive experiences directly inside chats, channels, and meetings.

[WIP: Placeholder image]

:::image type="content" source="../assets/images/overview/teams-apps-types.png" alt-text="Image shows types of Teams app." border="false":::

Build Teams apps with the Teams SDK for client and conversational experiences, and Microsoft 365 Agents SDK for advanced, cross-hub agent scenarios. These tools help you connect to enterprise data, coordinate multi-agent workflows, and keep interactions secure and context-aware. Whether you’re creating a Teams-first solution or expanding across Microsoft 365, Teams apps give you a flexible, powerful way to deliver real impact within the Microsoft ecosystem.

Here's an idea of what you'll learn:

- The types of apps and agents that you can build for Teams and Microsoft 365 with Microsoft 365 Agents Toolkit (previously known as Teams Toolkit):
  - Build tab, scenario-based apps, and message extension with GitHub Codespaces or step-by-step guide.
  - Learn about tutorials and code samples available for building your Teams app.
- Learn about various tools and SDKs available for building your Teams app.

## Why Build Apps for Microsoft Teams?

Build collaborative workspace with apps for Microsoft Teams. You can bring people, data, and workflows together in one place. With over 320 million users, Teams isn’t just for chats and meetings; it’s a powerful hub to simplify processes, automate tasks, and keep key information at readily accessible. Develop custom apps or integrating existing solutions into Teams to:

- **Boost productivity**: Bring all your essential tools, data, and business processes in one place. It enables app users to switch quickly between apps and achieve more.
- **Enhance collaboration**: Enable teams to communicate, share insights, and work together whether through bots, tabs, message extensions, or meeting apps.
- **Personalize experiences**: Tailor solutions to your organization’s unique needs, from simple task lists to complex project management or helpdesk apps.
- **Automate and streamline**: Use apps to handle repetitive tasks, approvals, and notifications, optimizing app user’s time.
- **Reach users everywhere**: Teams apps work across desktop, web, and mobile, ensuring your solutions are accessible to app users.

Teams helps organizations modernize communication, foster engagement, and deliver seamless, secure, and context-aware experiences.

## What capabilities can you build in Teams?

Teams platforms supports the following app types:

- **Tabs**:

  Tabs are web experiences (hosted pages) that run inside Teams. Use them for dashboards, forms, or full fidelity web apps embedded in a chat, channel, or meeting. Tabs can also be extended to Outlook and the Microsoft 365 app when you target the modern Teams client APIs.

- **Bots**:

  In Teams, bots have evolved into agents, that is, AI-enhanced, conversational apps that respond in 1:1, group, channel, or meeting contexts. You can build bot apps or agents that answer questions, summarize discussions, automate tasks, and participate in meetings (for example, sending agenda updates or capturing action items).

- **Message extensions**:

  Message extensions bring search and action commands to the compose box and contextual menus. They call into your service and return cards that users can insert into a message, or launch dialogs to complete short workflows.

- **Meeting apps**:

  Meeting apps add configurable tabs and bot capabilities to the meeting surface. You can react to meeting lifecycle events (start/end), notify participants, and provide in meeting UI for notes, tasks, and workflows.

## Teams apps building blocks

Here's a list of SDKs and tools that you can use to build app capabilities:

- Teams SDK (previously known as Teams AI library)

  The Teams SDK offers streamlined client APIs (TeamsJS v2 “capabilities”) for tabs and meeting surfaces, plus language SDKs for building conversational agents (with streaming, adaptive cards, dialogs, and more).

- Microsoft 365 Agents SDK (multi hub, pro code agents)

  The Microsoft 365 Agents SDK lets you build agents and apps that can be published to Microsoft 365 Copilot and other endpoints and can interoperate with Teams. It’s designed for agents that work across hubs and collaborate with other agents (A2A) and tools (MCP).

- Microsoft 365 Agents Toolkit (developer workflow & scaffolding)

  The Microsoft 365 Agents Toolkit (evolution of Teams Toolkit) provides VS Code and CLI templates, local debugging, resource provisioning, and testing against Teams or Copilot. The toolkit is a quick way to scaffold tabs, message extensions, and agents, then deploy using Azure defaults.

## Build your first Teams app

In this section, learn how to build a Teams app with different capabilities, such as bot, tab, and message extension. Select the type of Teams app that you want to build:

- **Build a simple Teams bot app**: Build a [bot](build-notification-bot.md). (WIP: Link to be updated for basic bot app.)
- **Build a basic Teams tab app**: Get started with building a Teams app with a [a basic tab app](build-basic-tab-app.md).
- **Build message extension Teams app**: Build a [search-based message extension](build-message-extension.md).

Get started with building apps for Microsoft Teams and beyond!

## See also

- [Microsoft Teams samples](https://github.com/OfficeDev/Microsoft-Teams-Samples#microsoft-teams-samples)
- [Git and GitHub resources](/contribute/additional-resources)
- [Teams app tutorials and code samples](tool-options-and-code-samples.md)
