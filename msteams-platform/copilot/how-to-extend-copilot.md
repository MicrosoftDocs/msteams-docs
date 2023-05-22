---
title: How to Extend Microsoft 365 Copilot
description: In this article, learn how to integrate with Microsoft 365 Copilot through message extensions and Graph connectors. 
ms.localizationpriority: medium
ms.topic: overview
ms.author: ginobuzz
ms.date: 05/23/2023 
---

# How to Extend Microsoft 365 Copilot

Microsoft 365 Copilot is powered by an advanced processing and orchestration engine that seamlessly integrates Microsoft 365 apps, Microsoft Graph, and LLMs to turn your words into the most powerful productivity tool on the planet. While Copilot is already able to leverage the apps and data within the Microsoft 365 ecosystem, many users still depend on various external tools and services for work management and collaboration. You can address this gap by extending Copilot to enable users to work with their third-party tools and services, unlocking the full potential of Microsoft 365 Copilot.

You can extend Microsoft 365 Copilot by building a plugin or by connecting to an external data source.

## What is a plugin?

The **Usage by time period** chart shows you the number of active users or tenants who opened and used your app across different time periods.

1. Retrieve real-time information, for example, latest news coverage on a product launch.
2. Retrieve knowledge-bases information, for example, my team’s design files in Figma.
3. Perform actions on behalf of the user, for example, create a Jira ticket.

> [!NOTE]
> Plugins for Microsoft 365 Copilot are in early access preview. This documentation is subject to change.

If you already have a Teams message extension, then you already have a plugin that will work with Copilot. If not, it’s easy to create a [Message Extension using the Teams Toolkit](https://learn.microsoft.com/en-us/microsoftteams/platform/messaging-extensions/what-are-messaging-extensions?tabs=dotnet).

### Scenario 1: I want to create a new plugin from an existing API or OpenAI Plugin

[Join the early access program](https://aka.ms/PluginsEarlyAccess) in order to build a message extension that will allow you to convert an existing API or OpenAI Plugin to work for Microsoft Copilot also.

1. Using the Teams Toolkit for VSCode, go to ‘Create plugin for Copilot’.
2. Provide a link to either an OpenAPI specification or an OpenAI plugin.
3. Update your manifest with plugin metadata (name, publisher, APIs used, and so on).
4. Optional: If you want your plugin to return an adaptive card, provide an adaptive card template and reference them in the manifest.
5. Test your plugin.
6. Preview and publish your plugin.

### Scenario 2: I want to build a plugin from an existing Microsoft 365 Message Extension

Your Message Extension will work with Copilot (after quality testing). Read on to learn how to ensure your current ME will function as a high-quality plugin.

## What makes a good plugin for Microsoft 365 Copilot?

To ensure your plugin will work as intended, it is important to include good descriptions in your manifest. This allows the underlying LLM to take full advantage of your plugin’s capabilities. It’s recommended to test different descriptions and instructions to find the most effective way for the LLM to utilize your plugin. Also, it’s important to manifest file up-to-date with any changes or enhancements you make to your plugin.

1. App description – Include detailed descriptions of the app, supported scenarios, feature capabilities, and related keywords using the shortDescription and longDescription fields.

```json
... 
"name": { 
"shortDescription": "Work-item tracking and productivity app", 
"longDescription": "Contoso app is a work-item tracking and project management app that allows teams to create, manage, and track work items. This app helps teams manage projects more efficiently. " 
... 
} 

```

2. Skill Parameter descriptions – Include detailed descriptions of your search and action skills along with associated parameters. These descriptions are used by the LLM to trigger the right skill and input the correct parameters for a given user request.

```json

... 

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

... 

```

3. Adaptive Card responses – By incorporating Adaptive Cards into your plugin’s response, you can enhance the user experience by providing more dynamic, actionable content within the responses and references, allowing users to interact more effectively with the information provided.

4. Including links in plugin response – Including links within your skill’s response serves multiple purposes. First, it assists the LLM in posting the entity link for users, streamlining the reference process. Second, it enables users to easily access your entities in future Copilot requests. Last, embedding links in Adaptive Cards allows your content to be displayed as a live, actionable loop component throughout the M365 ecosystem, enhancing user engagement and interaction.

5. Deep Content Retrieval – To further enhance your plugin’s functionality, it’s recommended that your API supports deep content retrieval scenarios that can be leveraged by the LLMs to obtain grounding data. This involves enabling Copilot to send targeted requests, such as limiting a search to a specific date range, to your API for particular tasks and queries.

# Upgrading your plugin to a rich conversational Teams app  

When you connect your API to Teams, you've built a simple, powerful Microsoft 365 Copilot plugin. You can now take that to the next level by adding rich conversational components to supercharge that experience – and Teams makes it simple to do. In addition to your plugin, you can use Teams Toolkit to add a bot to your manifest file. Developing a bot has never been easier with the release of the new [Teams AI SDK](https://github.com/microsoft/teams-ai). By doing this, your plugin becomes a full conversational Teams app, allowing you to develop link unfurling experiences, message extensions, message actions, search bar actions, and end-to-end conversational bots.

## Connecting external data sources

If you have an existing Microsoft Graph Connector, it will work with Copilot without any changes. With a Graph Connector, your data will be included in Copilot responses, and also participate in other Microsoft 365 experiences like Search, content recommendations, and more. [Learn more about building a Microsoft Graph Connector](https://developer.microsoft.com/en-us/graph/connectors).

## How to make your Graph connector work better with Copilot?

To ensure your Graph connector works well with Copilot, there are several things you must do. Following these tips would also improve relevance for your connector content with Microsoft Search:

1. Include urlToItemResolver. By including urlToItemResolver in your connector’s [activity settings](https://learn.microsoft.com/en-us/graph/connecting-external-content-manage-connections#activity-settings), Copilot will become aware when users share URLs to your content with one another. When users share an item with one another, Copilot will boost its importance for including the item in its response.  
2. Provide a rich human-readable name and detailed description when you [create the connection](https://learn.microsoft.com/en-us/graph/api/externalconnectors-external-post-connections?view=graph-rest-1.0&tabs=http). This helps Copilot understand what the data source is so it will include the data source in its response if it’s relevant.
3. Apply [semantic labels](https://learn.microsoft.com/en-us/graph/connecting-external-content-manage-schema#semantic-labels). Semantic labels help Copilot understands the semantic meaning of your schema. You must apply as many of them to your schema as applicable.
4. Add [user activities](https://learn.microsoft.com/en-us/graph/api/externalconnectors-externalitem-addactivities?view=graph-rest-1.0&tabs=http). In addition to adding your content (externalItems) to the Microsoft Graph, your connector must also add user activities around you’re your content. Supported activity types are shown [here](https://learn.microsoft.com/en-us/graph/api/resources/externalconnectors-externalactivity?view=graph-rest-1.0). Items that have more activities will be boosted in its importance.

## See also

* [Message extensions overview] (<https://learn.microsoft.com/en-us/microsoftteams/platform/messaging-extensions/what-are-messaging-extensions>)
* [Build message extension](https://learn.microsoft.com/en-us/microsoftteams/platform/get-started/build-message-extension?)
* [OpenAPI spec definition](https://spec.openapis.org/oas/v3.1.0)
* [Graph connectors overview](https://developer.microsoft.com/en-us/graph/connectors)
* [Our approach to responsible AI at Microsoft](https://www.microsoft.com/en-us/ai/our-approach?activetab=pivot1:primaryr5)
