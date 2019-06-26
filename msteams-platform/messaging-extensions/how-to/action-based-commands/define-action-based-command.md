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

For additional guidance on designing your messaging extension see: [Designing effective messaging extensions](~/foo.md).

## Choose messaging extension invoke locations

The first thing you need to decide is where your messaging extension can be triggered (or more specifically, *invoked* from). Your extension can be invoked from one or more of the following locations:

* The buttons at the bottom of the compose message area
* By @mentioning in the command box
* Directly from an existing message via the ... overflow menu on a message.

Invoking your messaging extension from either the compose message area or the command box will immediately present your users with your task module to collect information from them.

If you enable invoking directly from a message, the initial invoke to your bot will include a JSON object containing the message from which it was invoked, which you can process before presenting them with a task module. You must also respond with an adaptive card message from your bot rather than inserting a card into the compose box for your user to send.

## Choose how to build your task module

In addition to choosing where your command can be invoked from, you must also chose how to create the task module for your users. You have three options for creating the form that is rendered inside the task module:

* **Static list of parameters** - The simplest option. Using your app manifest you can define a list of parameters (input fields) that Teams will render for you. You cannot control the formatting with this option.
* **Adaptive card** - You can choose to use an adaptive card, which provides greater control over the UI, but still limits you on the available controls and formatting options.
* **Embedded web view** - If you need complete control over the UI and controls, you can choose to embed a custom web view in the task module.

If you choose to create your task module with a static list of parameters, the first call to your messaging extension will be when a user submits the task module. When using an embedded web view or an adaptive card, your messaging extension will need to handle an initial invoke event from the user, create the task module, and return it back to the client.

## Choose how the final message will be sent

In most cases, your action-based messaging extension command will result in a card inserted into the compose message box that your user can then decide to send into the channel or chat. The message in this case comes from the user, and your bot will not be able to edit or update the card further.

However, if your messaging extension is triggered from the compose box or directly from a message, your bot can insert the final response directly into the channel or chat. In this case the adaptive card comes from the bot, the bot will be able to update it, and can the bot can also reply to the conversation thread if needed.

## Add the command to your app manifest

Now that you've decided how users will interact with your action-based messaging extension command, it is time to add it to your app manifest. To do this you'll add a new `composeExtension` object to the top level of your app manifest JSON. You can either do so with the help of App Studio, or manually.

### Create a command using App Studio

The following steps assume you've already [created a messaging extension](~/messaging-extensions/how-to/create-messaging-extension.md).

1. From the Microsoft Teams client, open **App Studio** and select the **Manifest Editor** tab.
1. If you've already created your app package in App Studio, chose it from the list. If not, you can import an existing app package.
1. Click the **Add** button in the Command section.
1. Choose **Allow users to trigger actions in external services while inside of Teams**.
1. If you want to use a static set of parameters to create your task module, select that option. Otherwise, choose to **Fetch a dynamic set of parameters from your bot**.
1. Add a **Command Id** and a **Title**.
1. Select where you want your compose extension to be triggered from. Keep in mind that if you choose Message, you must send an adaptive card from your bot as the final response.
1. If you're using parameters for your task module, add the first one.
1. Click Save
1. If you need to add more parameters, click the **Add** button in the **Parameters** section to add them.

### Manually create a command

To manually add your action-based messaging extension command to your app manifest, you'll need to add the follow parameters to your `composeExtension.commands` array of objects.

| Property name | Purpose | Required? | Minimum manifest version |
|---|---|---|---|
| `id` | Unique ID that you assign to this command. The user request will include this ID. | Yes | 1.0 |
| `title` | Command name. This value appears in the UI. | Yes | 1.0 |
| `type` | Must be `action` | No | 1.4 |
| `fetchTask` | `true` for an adaptive card or embedded web view for your task module, `false` for a static list of parameters or when loading the web view by a `taskInfo` | No | 1.4 |
| `context` | Optional array of values that defines the context the message action is available in. Possible values are `message`, `compose`, or `commandBox`. Default is `["compose", "commandBox"]`. | No | 1.5 |

If you are using a static list of parameters, you'll add them as well.

| Property name | Purpose | Required? | Minimum manifest version |
| `parameters` | Static list of parameters for the command. Only use when `fetchTask` is `false` | No | 1.0 |
| `parameter.name` | The name of the parameter. This is sent to your service in the user request. | Yes | 1.0 |
| `parameter.description` | Describes this parameter’s purposes or example of the value that should be provided. This value appears in the UI. | Yes | 1.0 |
| `parameter.title` | Short user-friendly parameter title or label. | Yes | 1.0 |
| `parameter.inputType` | Set to the type of input required. Possible values include `text`, `textarea`, `number`, `date`, `time`, `toggle`. Default is set to `text` | No | 1.4 |

If you are using an embedded web view, you can optionally add the `taskInfo` object to fetch your web view without calling your bot directly. If you choose to use this option, the behavior is similar to using a static list of parameters in that the first interaction with your bot will be [responding to the task module submit action](~/foo.md).

| Property name | Purpose | Required? | Minimum manifest version |
|`taskInfo`|Specify the task module to preload when using a messaging extension command| No | 1.4 |
|`taskInfo.title`|Initial task module title|No | 1.4 |
|`taskInfo.width`|Task module width - either a number in pixels or default layout such as 'large', 'medium', or 'small'|No | 1.4 |
|`taskInfo.height`|Task module height - either a number in pixels or default layout such as 'large', 'medium', or 'small'|No | 1.4 |
|`taskInfo.url`|Initial web view URL|No | 1.4 |

#### App manifest example

The below is an example of a `composeExtensions` object defining two action-based commands. It is not an example of the complete manifest, for the full app manifest schema see: [App manifest schema](~/foo.md).

```json
...
"composeExtensions": [
  {
    "botId": "12a3c29f-1fc5-4d97-a142-12bb662b7b23",
    "canUpdateConfiguration": true,
    "commands": [
      {
        "id": "addTodo",
        "description": "Create a To Do item",
        "title": "Create To Do",
        "type": "action",
        "context": ["commandBox", "message", "compose"],
        "parameters": [
          {
            "name": "Name",
            "description": "To Do Title",
            "title": "Title",
            "inputType": "text"
          },
          {
            "name": "Description",
            "description": "Description of the task",
            "title": "Description",
            "inputType": "textarea"
          },
          {
            "name": "Date",
            "description": "Due date for the task",
            "title": "Date",
            "inputType": "date"
          }
        ]
      },
      {
        "id": "reassignTodo",
        "description": "Reassign a todo item",
        "title": "Reassign a todo item",
        "type": "action",
        "fetchTask": true,
      }
    ]
  }
]
...
```

## Next steps

If you are using either an adaptive card or an embedded web view without a `taskInfo` object, you'll want to:

* [Create and respond with a task module](~/messaging-extensions/how-to/action-based-commands/create-task-module.md)

If you are using parameters or an embedded web view with a `taskInfo` object, the next step for you is to:

* [Respond to task module submit](~/messaging-extensions/how-to/action-based-commands/respond-to-task-module-submit.md)

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
