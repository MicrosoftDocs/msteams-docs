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

[WIP: tags for infographic]

- **Tabs**: Embedded web experiences for dashboards, forms, or full-featured applications, accessible in chats, channels, or meetings.
- **Bots**: Conversational apps that respond to user queries, automate tasks, and participate in discussions or meetings.
- **Message extensions**: Tools that enable users to find and insert content or trigger actions from the compose box and contextual menus.
- **Meeting apps**: Solutions that add configurable tabs and bot capabilities to the meeting surface, supporting workflows like agenda management and action item tracking.

Build Teams apps with the Teams SDK for client and conversational experiences, and Microsoft 365 Agents SDK for advanced, cross-hub agent scenarios. These tools help you connect to enterprise data, coordinate multi-agent workflows, and keep interactions secure and context-aware. Whether you’re creating a Teams-first solution or expanding across Microsoft 365, Teams apps give you a flexible, powerful way to deliver real impact within the Microsoft ecosystem.

Get started with building apps for Microsoft Teams and beyond!

## Why Build Apps for Microsoft Teams?

Build collaborative workspace with apps for Microsoft Teams. You can bring people, data, and workflows together in one place. With over 320 million users, Teams isn’t just for chats and meetings; it’s a powerful hub to simplify processes, automate tasks, and keep key information at readily accessible.

[WIP: Placeholder image]

:::image type="content" source="../assets/images/overview/why-teams-apps.png" alt-text="Image shows collaborating with Teams apps." border="false":::

Develop custom apps or integrating existing solutions into Teams to:

- **Boost productivity**: Bring all your essential tools, data, and business processes in one place. It enables app users to switch quickly between apps and achieve more.
- **Enhance collaboration**: Enable teams to communicate, share insights, and work together whether through bots, tabs, message extensions, or meeting apps.
- **Personalize experiences**: Tailor solutions to your organization’s unique needs, from simple task lists to complex project management or helpdesk apps.
- **Automate and streamline**: Use apps to handle repetitive tasks, approvals, and notifications, optimizing app user’s time.
- **Reach users everywhere**: Teams apps work across desktop, web, and mobile, ensuring your solutions are accessible to app users.

Teams helps organizations modernize communication, foster engagement, and deliver seamless, secure, and context-aware experiences.

## What you can build in Teams?

Teams platforms supports the following app types:

- **Tabs (personal, team/channel, and meeting tabs)**
  Tabs are web experiences (hosted pages) that run inside Teams. Use them for dashboards, forms, or full fidelity web apps embedded in a chat, channel, or meeting. Tabs can also be extended to Outlook and the Microsoft 365 app when you target the modern Teams client APIs.

- **Bots (conversational experiences)**
  In Teams, “bots” have evolved into agents—AI enhanced, conversational apps that respond in 1:1, group, channel, or meeting contexts. You can build agents that answer questions, summarize discussions, automate tasks, and participate in meetings (for example, sending agenda updates or capturing action items).

- **Message extensions**
  Message extensions bring “find and insert” and “action” commands to the compose box and contextual menus. They call into your service and return cards that users can insert into a message, or launch dialogs to complete short workflows.

- **Meeting apps**
  Meeting apps add configurable tabs and bot capabilities to the meeting surface. You can react to meeting lifecycle events (start/end), notify participants, and provide in meeting UI for notes, tasks, and workflows.

Here's an idea of what you'll learn:

- The types of apps and agents that you can build for Teams and Microsoft 365 with Microsoft 365 Agents Toolkit (previously known as Teams Toolkit):
  - Build tab, scenario-based apps, and message extension with GitHub Codespaces or step-by-step guide.
  - Learn about tutorials and code samples available for building your Teams app.
- Learn about various tools and SDKs available for building your Teams app.
  - The recommended SDKs and toolkits for different scenarios
- Security and authentication best practices for conversational apps

## Build your first Teams app

In this section, learn how to build a Teams app with different capabilities, such as bot, tab, and message extension. Select the type of Teams app that you want to build:

- **Build a simple Teams bot app**: Build a conversational bot.
- **Build a basic Teams tab app**: Get started with building a Teams app with a basic tab app.
- **Build message extension Teams app**: Build a search-based message extension Teams app.

## Next step

If you want to build a basic tab app, select the following:

> [!div class="nextstepaction"]
> [Build your basic tab app](build-basic-tab-app.md)

If a bot is what you're interested in, select the following:

> [!div class="nextstepaction"]
> [Start building a bot](build-notification-bot.md)

If you want to build a message extension app, select the following:

> [!div class="nextstepaction"]
> [Build message extension](build-message-extension.md)

If you want to build a declarative agent, select the following:

> [!div class="nextstepaction"]
> [Build declarative agent](/microsoft-365-copilot/extensibility/build-declarative-agents?tabs=ttk)

## See also

- [Microsoft Teams samples](https://github.com/OfficeDev/Microsoft-Teams-Samples#microsoft-teams-samples)
- [Git and GitHub resources](/contribute/additional-resources)
- [Teams app tutorials and code samples](tool-options-and-code-samples.md)
