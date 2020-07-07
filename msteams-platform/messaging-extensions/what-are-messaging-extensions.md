---
title: What are messaging extensions?
author: clearab
description: An overview of messaging extensions on the Microsoft Teams platform
ms.topic: overview
ms.author: anclear
---
# What are messaging extensions?

Messaging extensions allow users to interact with your web service through buttons and forms in the Microsoft Teams client. They can search or initiate actions in an external system from the compose message area, the command box, or directly from a message. You can then send the results of that interaction back to the Microsoft Teams client, typically in the form of a richly formatted card.

The screenshot below shows the locations where messaging extensions can be invoked from.

![messaging extension invoke locations](~/assets/images/messaging-extension-invoke-locations.png)

## User scenarios

**Scenario:** I need some external system to do something and I want the result of the action to be sent back to my conversation.\
**Example:** Reserve a resource and let the channel know what day/time you reserved it for.

**Scenario:** I need to find something in an external system, and I want to share the results with my conversation.\
**Example:**  Search for a work item in Azure DevOps, and share it with the group as an adaptive card.

**Scenario:** I need to complete a complex task involving multiple steps (or lots of information) in an external system, and the results should be shared with a conversation.\
**Example:** Create a bug in your tracking system based on a Teams message, assign that bug to Bob, then send a card to the conversation thread with the bug's details.

## How do messaging extensions work?

A messaging extension consists of a web service you host and your app manifest which defines where your web service can be invoked from in the Microsoft Teams client. They take advantage of the Bot Framework's messaging schema and secure communication protocol, so you'll also need to register your web service as a bot in the Bot Framework. Although you can create your web service completely by hand, we recommend you take advantage of the [Bot Framework SDK](https://github.com/microsoft/botframework) to make working with the protocol simpler.

In the app manifest for your Microsoft Teams app you'll define a single messaging extension with up to ten different commands. Each command defines a type (action or search), and the locations in the client it can be invoked from (compose message area, command bar, and/or message). Once invoked, your web service will receive an HTTPS message with a JSON payload including all the relevant information. You'll respond with a JSON payload, letting the Teams client know what interaction to enable next.

## Types of messaging extensions

The type of messaging extension command defines the UI elements and interaction flows available to your web service. Some interactions, like authentication and configuration, are available for both types of commands.

### Action commands

Action commands allow you to present your users with a modal popup to collect or display information. When they submit the form, your web service can respond by inserting a message into the conversation directly, or by inserting a message into the compose message area and allowing the user to submit the message. You can even chain multiple forms together for more complex workflows.

They can be triggered from the compose message area, the command box, or from a message. When invoked from a message, the initial JSON payload sent to your bot will include the entire message it was invoked from.

![messaging extension action command task module](~/assets/images/task-module.png)

### Search commands

Search commands allow your users to search an external system for information (either manually through a search box, or by pasting a link to a monitored domain into the compose message area), then insert the results of the search into a message. In the most basic search command flow, the initial invoke message will include the search string the user submitted. You'll respond with a list of cards and card previews. The Teams client will render the card previews in a list for the end user to select from. When the user selects a card, the full-size card will be inserted into the compose message area.

They can be triggered from the compose message area or the command box. Unlike action commands, they cannot be triggered from a message.

![messaging extension search command](~/assets/images/search-extension.png)

### Link unfurling

You also can invoke your service when a URL is pasted in the compose message area. This functionality, known as **link unfurling**, allows you to subscribe to receive an invoke when URLs containing a particular domain are pasted into the compose message area. Your web service can "unfurl" the URL into a detailed card, providing more information than the standard website preview card. You can even add buttons so users can take action without leaving Teams.

## Get started

Ready to get started building? Try one of our quickstarts:

* **C#**
  * [Messaging extension with action-based commands](https://github.com/microsoft/BotBuilder-Samples/tree/master/samples/csharp_dotnetcore/51.teams-messaging-extensions-action)
  * [Messaging extension with search-based commands](https://github.com/microsoft/BotBuilder-Samples/tree/master/samples/csharp_dotnetcore/50.teams-messaging-extensions-search)
* **JavaScript**
  * [Messaging extension with action-based commands](https://github.com/microsoft/BotBuilder-Samples/tree/master/samples/javascript_nodejs/51.teams-messaging-extensions-action)
  * [Messaging extension with search-based commands](https://github.com/microsoft/BotBuilder-Samples/tree/master/samples/javascript_nodejs/50.teams-messaging-extensions-search)

## Learn more

* [Create a messaging extension](~/messaging-extensions/how-to/create-messaging-extension.md)
* [Define action messaging extension command](~/messaging-extensions/how-to/action-commands/define-action-command.md)
* [Define search messaging extension command](~/messaging-extensions/how-to/search-commands/define-search-command.md)
