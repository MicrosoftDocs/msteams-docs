---
title: Define action-based messaging extension command
author: clearab
description: An overview of messaging extensions on the Microsoft Teams platform
ms.topic: conceptual
ms.author: anclear
---
# Define action-based messaging extension commands

Action-based messaging extensions commands allow you present your users with a modal popup to collect or display information, then process their interaction and send information back to Teams. They can be triggered from the compose message area, the command box, or from a message.

In addition to choosing where your command can be invoked from, you must also chose how to create the modal popup for your users. You have three options for creating the modal (which is rendered in a task module):

* **Static list of parameters** - The simplest option. Using your app manifest you can define a list of parameters (input fields) that Teams will render for you. You cannot control the formatting with this option.
* **Adaptive card** - You can choose to use an adaptive card, which provides greater control over the UI, but still limits you on the available controls and formatting options.
* **Embedded web view** - If you need complete control over the UI and controls, you can choose to embed a custom web view in the task module.

## Action-based command schema definition

| Property name | Purpose | Required? | Minimum manifest version |
|---|---|---|---|
| `id` | Unique ID that you assign to this command. The user request will include this ID. | Yes | 1.0 |
| `title` | Command name. This value appears in the UI. | Yes | 1.0 |
| `description` | Help text indicating what this command does. This value appears in the UI. | Yes | 1.0 |
| `type` | Set the type of command. Possible values include `query` and `action`. If not present the default value is set to `query` | No | 1.4 |
| `initialRun` | Optional parameter, used with `query` commands. If set to **true**, indicates this command should be executed as soon as the user chooses this command in the UI. | No | 1.0 |
| `fetchTask` | Optional parameter, used with `action` commands. Set to **true** to fetch the adaptive card or web url to display within the task module. This is used when the inputs to the `action` command is dynamic as opposed to a static set of parameters. Note that the if set to **true** the static parameter list for the command is ignored | No | 1.4 |
| `parameters` | Static list of parameters for the command. | Yes | 1.0 |
| `parameter.name` | The name of the parameter. This is sent to your service in the user request. | Yes | 1.0 |
| `parameter.description` | Describes this parameter’s purposes or example of the value that should be provided. This value appears in the UI. | Yes | 1.0 |
| `parameter.title` | Short user-friendly parameter title or label. | Yes | 1.0 |
| `parameter.inputType` | Set to the type of input required. Possible values include `text`, `textarea`, `number`, `date`, `time`, `toggle`. Default is set to `text` | No | 1.4 |
| `context` | Optional array of values that defines the context the message action is available in. Possible values are `message`, `compose`, or `commandBox`. Default is `["compose", "commandBox"]`. | No | 1.5 |
