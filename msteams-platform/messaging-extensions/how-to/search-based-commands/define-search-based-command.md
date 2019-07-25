---
title: Define search-based messaging extension command
author: clearab
description: Define a search-based messaging extension command.
ms.topic: conceptual
ms.author: anclear
---
# Define search-based messaging extension commands

Search-based messaging extension commands allow your users to search external systems and insert the results of that search into a message in the form of a card.

For additional guidance on designing your messaging extension see: [Designing effective messaging extensions](~/foo.md).

## Choose messaging extension invoke locations

The first thing you need to decide is where your messaging extension can be triggered (or more specifically, *invoked* from). Your extension can be invoked from one or both of the following locations:

* The buttons at the bottom of the compose message area
* By @mentioning in the command box

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
|---|---|---|---|
| `parameters` | Static list of parameters for the command. Only use when `fetchTask` is `false` | No | 1.0 |
| `parameter.name` | The name of the parameter. This is sent to your service in the user request. | Yes | 1.0 |
| `parameter.description` | Describes this parameter’s purposes or example of the value that should be provided. This value appears in the UI. | Yes | 1.0 |
| `parameter.title` | Short user-friendly parameter title or label. | Yes | 1.0 |
| `parameter.inputType` | Set to the type of input required. Possible values include `text`, `textarea`, `number`, `date`, `time`, `toggle`. Default is set to `text` | No | 1.4 |

If you are using an embedded web view, you can optionally add the `taskInfo` object to fetch your web view without calling your bot directly. If you choose to use this option, the behavior is similar to using a static list of parameters in that the first interaction with your bot will be [responding to the task module submit action](~/foo.md).

| Property name | Purpose | Required? | Minimum manifest version |
|---|---|---|---|
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
        "id": "findTodo",
        "description": "Find a To Do item",
        "title": "Find To Do",
        "type": "search",
        "context": ["commandBox", "compose"],
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