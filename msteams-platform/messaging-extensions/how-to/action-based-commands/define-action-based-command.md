---
title: Define action-based messaging extension command
author: clearab
description: An overview of messaging extensions on the Microsoft Teams platform
ms.topic: conceptual
ms.author: anclear
---
# Define action-based messaging extension commands

Action-based messaging extensions commands allow you present your users with a modal popup (called a task module in Teams) to collect or display information, then process their interaction and send information back to Teams. They can be triggered from the compose message area, the command box, or from a message.

In addition to choosing where your command can be invoked from, you must also chose how to create the task module for your users. You have three options for creating the form that is rendered inside the task module:

* **Static list of parameters** - The simplest option. Using your app manifest you can define a list of parameters (input fields) that Teams will render for you. You cannot control the formatting with this option.
* **Adaptive card** - You can choose to use an adaptive card, which provides greater control over the UI, but still limits you on the available controls and formatting options.
* **Embedded web view** - If you need complete control over the UI and controls, you can choose to embed a custom web view in the task module.

## Add the command to your app manifest



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
