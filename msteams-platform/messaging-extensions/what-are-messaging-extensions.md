---
title: What are messaging extensions?
author: aclear16
description: An overview of messaging extensions on the Microsoft Teams platform
ms.topic: overview
ms.author: anclear
---
# What are messaging extensions?

Messaging extensions enable an alternative way for your Microsoft Teams users to interact with bots built on the Azure Bot Framework. Unlike conversational bots, users interact with your messaging extensions through buttons and forms, giving you more control over the interaction. They allow you to search, or take action, in an external system from the compose message area, the command box, or directly from a message in Teams. You can then insert the results of that interaction into a message in Microsoft Teams.

foo.md => screenshot needed, fullscreen, red box around three areas you can trigger an ME from.

## Messaging extensions user scenarios

**Scenario:** I need some external system to do something and I want the result of the action to be sent back to my conversation.
**Example:** Reserve a resource and let the channel know what day/time you reserved it for.

**Scenario:** I need to find something in an external system, and I want to share the results with my conversation.
**Example:**  Search for a work item in Azure DevOps, and share it with the group as an adaptive card.

**Scenario:** I need to complete a complex task involving multiple steps (or lots of information) in an external system, and the results should be shared with a conversation
**Example:** Create a bug in your tracking system based on a Teams message, assign that bug to Bob, then send a card to the conversation thread with the bug's details.

## Types of messaging extension commands

Messaging extensions commands come in two types, and can be triggered from three different areas. Each command defines the type of interaction, and the location the interaction can be triggered from. For example, with a single message extension you could define commands allowing users to search a SharePoint list, create a list item from a message, and create a new list item from the compose message area.

* [Action-based messaging extensions commands](./foo.md) allow you present your users with a modal popup to collect or display information, then process their interaction and send information back to Teams. They can be triggered from the compose message area, the command box, or from a message.
* [Search-based messaging extensions commands](./foo.md) allow your users to search an external system for information, then insert the results of the search into a message. They can be triggered from the compose message area or the command box.

## How do messaging extensions work?

Your messaging extension is made of a bot, and a set of commands that define how your users can interact with it. Using your [app manifest](foo.md), you can only define a single messaging extension in a Teams app, however you can define up to 10 commands. Depending on the type of command, the flow can be slightly different.

### Action-based messaging extension commands

The diagram below outlines the information flow for action-based commands. foo.md => fill this part in with a walkthrough of the diagram

foo.md => information flow diagram

### Search-based messaging extension commands

The diagram below outlines the information flow for search-based commands. foo.md => fill this part in with a walkthrough of the diagram

foo.md => information flow diagram

## Get Started

Ready to get started? Try out one of our quickstarts:

* Action-based messaging extensions
  * [In C#/.NET](foo.md)
  * [In JavaScript/Node.js](foo.md)
* Search-based messaging extensions
  * [In C#/.NET](foo.md)
  * [In JavaScript/Node.js](foo.md)

## Learn more

Learn more about how messaging extensions fit with other Teams app capabilities:

* [linkToConceptArticle1](./foo.md)
* [linkToConceptArticle2](./foo.md)

Learn about designing effective messaging extensions:

* [linkToMEDesignArticle](./foo.md)

Learn more about how to build messaging extensions:

* [Create a messaging extension](./foo.md)
* [Define action-based messaging extension command](./foo.md)
* [Define search-based messaging extension command](./foo.md)