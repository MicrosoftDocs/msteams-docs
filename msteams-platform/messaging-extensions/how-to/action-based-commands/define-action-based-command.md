---
title: Define action-based messaging extension command
author: clearab
description: An overview of messaging extensions on the Microsoft Teams platform
ms.topic: conceptual
ms.author: anclear
---
# Define action-based messaging extension commands

Action-based messaging extensions commands allow you present your users with a modal popup (called a task module in Teams) to collect or display information, then process their interaction and send information back to Teams. Before creating your command you'll need to decide:

1. Where can the messaging extension can be triggered from?
1. How will the task module be created?
1. Will the final message or card be sent to the channel from a bot, or will the message or card be inserted into the compose message area for the user to submit?

## Choose messaging extension invoke locations

The first thing you need to decide is where your messaging extension can be triggered (or more specifically, *invoked* from). Your options are:

* The compose message area
* The command box
* Directly from an existing message

Invoking your messaging extension from either the compose message area or the command box will immediately present your users with your task module to collect information from them. If you enable invoking directly from a message, the initial invoke to your bot will include a JSON object containing the message from which it was invoked, which you can process before presenting them with a task module.

## Choose how to build your task module

In addition to choosing where your command can be invoked from, you must also chose how to create the task module for your users. You have three options for creating the form that is rendered inside the task module:

* **Static list of parameters** - The simplest option. Using your app manifest you can define a list of parameters (input fields) that Teams will render for you. You cannot control the formatting with this option.
* **Adaptive card** - You can choose to use an adaptive card, which provides greater control over the UI, but still limits you on the available controls and formatting options.
* **Embedded web view** - If you need complete control over the UI and controls, you can choose to embed a custom web view in the task module.

## Choose how the final message will be sent

asdf

## Add the command to your app manifest

Now that you've decided how users will interact with your action-based messaging extension command, it is time to add it to your app manifest.

### Create a command using App Studio

### Manually create a command

### Command schema definition

[!includes[messaging extension command schema](~/includes/messaging-extension-command-schema.md)]

## Next steps

* [Handle the initial invoke request](~/messaging-extensions/how-to/action-based-commands/define-action-based-command.md)

## Learn more

Try it out in a quickstart:

* Quickstarts for C#
  * [Messaging extension with action-based commands](~/foo.md)
  * [Messaging extension with search-based commands](~/foo.md)
* Quickstarts for Node.js
  * [Messaging extension with action-based commands](~/foo.md)
  * [Messaging extension with search-based commands](~/foo.md)

Learn about authentication in messaging extensions

* [something something authentication](./foo.md)
