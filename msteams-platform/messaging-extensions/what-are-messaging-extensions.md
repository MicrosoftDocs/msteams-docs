---
title: Messaging extensions
author: clearab
description: An overview of messaging extensions on the Microsoft Teams platform
ms.topic: overview
ms.author: anclear
---
# Messaging extensions

Messaging extensions permit users to interact with your web service through buttons and forms in the Microsoft Teams client. They can search or initiate actions in an external system from the compose message area, the command box, or directly from a message. You can send back the results of that interaction to the Microsoft Teams client in the form of a richly formatted card.

The following screenshot displays the locations from where messaging extensions are invoked:

![messaging extension invoke locations](~/assets/images/messaging-extension-invoke-locations.png)

## Advantages of messaging extensions

| Scenarios | Examples |
|:---------- |:---------|
| You need some external system to do an action  and you want the result of the action to be sent back to your conversation.| Reserve a resource and allow the channel to know what day and time you reserved it for.|
|You need to find something in an external system, and you want to share the results with the conversation.|  Search for a work item in Azure DevOps, and share it with the group as an adaptive card.|
| You need to complete a complex task involving multiple steps or lots of information in an external system, and share the results with a conversation.| Create a bug in your tracking system based on a Teams message, assign that bug to Bob, and send a card to the conversation thread with the bug's details.|

## Understand working of messaging extensions 

A messaging extension consists of a web service that you host and your app manifest which defines where your web service is invoked from in the Microsoft Teams client. They take advantage of the Bot Framework's messaging schema and secure communication protocol, so you must register your web service as a bot in the Bot Framework. Use [Bot Framework SDK](https://github.com/microsoft/botframework) to work with the protocol though you can create your web service manually.

In the app manifest for your Microsoft Teams app, you define a single messaging extension with up to ten different commands. Each command defines a type and the locations in the client from where it is invoked. The command types are **action** or **search**. The locations are **compose message area, command bar, and message**. After invoking, your web service receives an HTTPS message with a JSON payload including all the relevant information. You respond with a JSON payload and allow the Teams client to know what interaction to enable next. For information on how to create a messaging extension, see [create a messaging extension](~/messaging-extensions/how-to/create-messaging-extension.md).

## Types of messaging extension commands

The type of messaging extension command defines the UI elements and interaction flows available to your web service. Some interactions, such as authentication and configuration are available for both types of commands.

### Action commands

Use [action commands](how-to/action-commands/define-action-command.md) to present your users with a modal popup to collect or display information. When the user submits the form, your web service responds by inserting a message into the conversation directly, or by inserting a message into the compose message area. After that, the user can submit the message. You can chain multiple forms together for more complex workflows.

They are triggered from the compose message area, the command box, or from a message. When invoked from a message, the initial JSON payload sent to your bot includes the entire message it was invoked from.

![messaging extension action command task module](~/assets/images/task-module.png)

### Search commands

[Search commands](how-to/search-commands/define-search-command.md) allow your users to search an external system for information either manually through a search box, or by pasting a link to a monitored domain into the compose message area. Later, insert the results of the search into a message. In the most basic search command flow, the initial invoke message includes the search string that the user submitted. You [respond](how-to/search-commands/respond-to-search.md) with a list of cards and card previews. The Teams client renders a list of card previews for the user. When the user selects a card from the list, the full-size card is inserted into the compose message area.

The cards can be triggered from the compose message area or the command box. Unlike action commands, they cannot be triggered from a message.

![messaging extension search command](~/assets/images/search-extension.png)

## Link unfurling

You can also invoke your service when a URL is pasted in the compose message area. This functionality is known as **link unfurling**. You can subscribe to receive an invoke when URLs containing a particular domain are pasted into the compose message area. Your web service can "unfurl" the URL into a detailed card, providing more information than the standard website preview card. You can add buttons to allow your users to immediately take action without leaving the Microsoft Teams client. For more information on link unfurling, see [link unfurling](how-to/link-unfurling.md)

## See also

Build a messaging extension:

* [Create a messaging extension](~/messaging-extensions/how-to/create-messaging-extension.md)
* [Define action messaging extension command](~/messaging-extensions/how-to/action-commands/define-action-command.md)
* [Define search messaging extension command](~/messaging-extensions/how-to/search-commands/define-search-command.md)
