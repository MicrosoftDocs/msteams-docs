---
title: How to Extend Microsoft 365 Copilot
description: In this article, learn how to integrate with Microsoft 365 Copilot through message extensions and Graph connectors. 
ms.localizationpriority: medium
ms.topic: overview
ms.author: ginobuzz
ms.date: 05/23/2023 
---

# Extend Microsoft 365 Copilot

Microsoft 365 Copilot is powered by an advanced processing and orchestration engine that seamlessly integrates Microsoft 365 apps, Microsoft Graph, and large language models (LLMs) to turn your words into the most powerful productivity tool. While Copilot is already able to use the apps and data within the Microsoft 365 ecosystem, many users still depend on various external tools and services for work management and collaboration. You can address this gap by extending Copilot to enable users to work with their third-party tools and services, unlocking the full potential of Microsoft 365 Copilot.

You can extend Microsoft 365 Copilot by building a plugin or by connecting to an external data source.

## What is a plugin?

A plugin allows Copilot to interact directly with third-party data, apps, and services, enhancing its capabilities and broadening its range of capabilities.
Plugins allow Copilot to:

* Retrieve real-time information, for example, latest news coverage on a product launch.
* Retrieve knowledge-based information, for example, my team’s design files in Figma.
* Perform actions on behalf of the user, for example, create a Jira ticket.

## How do I build a plugin?

> [!NOTE]
> Plugins for Microsoft 365 Copilot are in early access preview. This documentation is subject to change. When you have access to [the developer preview program](https://aka.ms/plugins-dev-waitlist), you'll receive instructions on evaluating your message extension to be used by Microsoft 365 Copilot.

If you already have a Teams message extension, then you already have a plugin that works with Copilot. If not, create a [message extension using the Teams Toolkit](~/messaging-extensions/what-are-messaging-extensions.md).

**Scenario 1: I want to create a new plugin from an existing API or OpenAI plugin**

[Join the early access program](https://aka.ms/PluginsEarlyAccess) to build a message extension that allows you to convert an existing API or OpenAI plugin to work for Microsoft Copilot.

1. Using the Teams Toolkit for Microsoft Visual Studio Code, go to **Create plugin for Copilot**.
2. Provide a link to either an OpenAPI specification or an OpenAI plugin.
3. Update your manifest with plugin metadata such as name, publisher, APIs used.
4. Optional: If you want your plugin to return an Adaptive Card, provide an Adaptive Card template and reference the template in the manifest.
5. Test your plugin.
6. Preview and publish your plugin.

**Scenario 2: I want to build a plugin from an existing Microsoft 365 message extension**

Your Message Extension will work with Copilot (after quality testing).

## What makes a good plugin for Microsoft 365 Copilot?

To ensure your plugin works as intended, it is important to include good descriptions in your manifest. This allows the underlying LLM to take full advantage of your plugin’s capabilities. It’s recommended to test different descriptions and instructions to find the most effective way for the LLM to utilize your plugin. Also, it’s important that the manifest file is up-to-date with any changes or enhancements you make to your plugin.

1. App description: Include detailed descriptions of the app, supported scenarios, feature capabilities, and related keywords using the `shortDescription` and `longDescription` fields.

   ```json
   "name": { 
   "shortDescription": "Work-item tracking and productivity app", 
   "longDescription": "Contoso app is a work-item tracking and project management app that allows teams to create, manage, and track work items. This app helps teams manage projects more efficiently. " 
   } 
   ```

2. Skill parameter descriptions: Include detailed descriptions of your search and action skills along with associated parameters. These descriptions are used by the LLM to trigger the right skill and input the correct parameters for a given user request.

   ```json
   "commands": [{ 
   "id": "Work item search query", 
   "type": "query", 
   "context": "command box", 
   "parameters": [ 
   { 
   "name": "Work item search string", 
   "title": "Work item search keyword", 
   "description": "Search for work items by keyword(s)", 
   }] 
   }, 
   ```

3. Adaptive Card responses: By incorporating Adaptive Cards into your plugin’s response, you can enhance the user experience by providing more dynamic, actionable content within the responses and references, allowing users to interact more effectively with the information provided.

4. Including links in plugin response: Including links within your skill’s response serves multiple purposes:
    * Assists the LLM in posting the entity link for users, streamlining the reference process.
    * Enables users to easily access your entities in future Copilot requests.
    * Embedded links in Adaptive Cards that allows your content to be displayed as a live, actionable loop component throughout the M365 ecosystem, enhancing user engagement and interaction.

5. Deep Content Retrieval: To further enhance your plugin’s functionality, it’s recommended that your API supports deep content retrieval scenarios that can be leveraged by the LLMs to obtain grounding data. This involves enabling Copilot to send targeted requests, such as limiting a search to a specific date range, to your API for particular tasks and queries.

## Upgrading your plugin to a rich conversational Teams app  

When you connect your API to Teams, you've built a simple, powerful Microsoft 365 Copilot plugin. Teams makes it easier and helps you enhance this experience by adding rich conversational components. In addition to your plugin, you can use Teams Toolkit to add a bot to your manifest file. Developing a bot has never been easier with the release of the new [Teams AI library](bots/how-to/Teams%20conversational%20AI/teams-conversation-ai-overview.md). By bot, your plugin becomes a full conversational Teams app, allowing you to develop link unfurling experiences, message extensions, message actions, search bar actions, and end-to-end conversational bots.

## Connecting external data sources

If you have an existing Microsoft Graph Connector, it will work with Copilot without any changes. With a Graph Connector, your data will be included in Copilot responses, and also participate in other Microsoft 365 experiences such as search, content recommendations. For more information, see [building a Microsoft Graph connector](https://developer.microsoft.com/graph/connectors).

## How to make your Graph connector work better with Copilot?

To ensure your Graph connector works well with Copilot, there are several things you should do. Following these tips will also improve relevance for your connector content with Microsoft Search:

1. Include `urlToItemResolver`. By including `urlToItemResolver` in your connector’s [activity settings](/graph/connecting-external-content-manage-connections), Copilot will become aware when users share URLs to your content with one another. When users share an item with one another, Copilot will boost its importance for including the item in its response.  
2. Provide a rich human-readable name and detailed description when you [create the connection](/graph/api/externalconnectors-external-post-connections). This helps Copilot understand what the data source is, so it includes the data source in its response if it’s relevant.
3. Apply [semantic labels](/graph/connecting-external-content-manage-schema). Semantic labels help Copilot understand the semantic meaning of your schema. You must apply as many of them to your schema as applicable.
4. Add [user activities](/graph/api/externalconnectors-externalitem-addactivities). In addition to adding your content `externalItems` to the Microsoft Graph, your connector should also add user activities around you’re content. Supported activity types are shown [here](/graph/api/resources/externalconnectors-externalactivity). Items that have more activities are boosted in their importance.

## See also

* [Message extensions overview](~/messaging-extensions/what-are-messaging-extensions.md)
* [Build message extension](~/get-started/build-message-extension.md)
* [OpenAPI spec definition](https://spec.openapis.org/oas/v3.1.0)
* [Graph connectors overview](https://developer.microsoft.com/graph/connectors)
* [Our approach to responsible AI at Microsoft](https://www.microsoft.com/ai/our-approach?activetab=pivot1:primaryr5)
