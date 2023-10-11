---
title: Bot-based Message extension
author: v-ypalikila
description: Learn how to build a bot message extension using Teams developer portal and Teams Toolkit.
ms.localizationpriority: medium
ms.topic: overview
ms.author: anclear
ms.date: 09/07/2023
---

# Bot-based Message extension

Bot-based message extensions use a bot to handle user requests and responses. They require a bot registration and a bot framework SDK. They can be configured and deployed using the DEveloper portal for Teams or the Teams Toolkit.

[!include[v4-to-v3-SDK-pointer](~/includes/v4-to-v3-pointer-me.md)]

# [Search commands](#tab/search-commands)

Message extension search commands allow users to search external systems and insert the results of that search into a message in the form of a card. This document guides you on how to select  search command invoke locations, and add the search command to your app manifest.

> [!NOTE]
> The result card size limit is 28 KB. The card is not sent if its size exceeds 28 KB.

See the following video to learn how to define message extension search commands:
<br>

> [!VIDEO https://www.microsoft.com/en-us/videoplayer/embed/RE4OIvK]
<br>

### Create a search command manually

To manually add your message extension search command to your app manifest, you must add the following parameters to your `composeExtensions.commands` array of objects:

| Property name | Purpose | Required? | Minimum manifest version |
|---|---|---|---|
| `id` | This property is a unique ID that you assign to search command. The user request includes this ID. | Yes | 1.0 |
| `title` | This property is a command name. This value appears in the user interface (UI). | Yes | 1.0 |
| `description` | This property is a help text indicating what this command does. This value appears in the UI. | Yes | 1.0 |
| `type` | This property must be a `query`. | No | 1.4 |
|`initialRun` | If this property is set to **true**, it indicates this command should be executed as soon as the user selects this command in the UI. | No | 1.0 |
| `context` | This property is an optional array of values that defines the context the search action is available in. The possible values are `message`, `compose`, or `commandBox`. The default is `["compose", "commandBox"]`. | No | 1.5 |

You must add the details of the search parameter that defines the text visible to your user in the Teams client.

| Property name | Purpose | Is required? | Minimum manifest version |
|---|---|---|---|
| `parameters` | This property defines a static list of parameters for the command. | No | 1.0 |
| `parameter.name` | This property describes the name of the parameter. The `parameter.name` is sent to your service in the user request. | Yes | 1.0 |
| `parameter.description` | This property describes the parameter’s purposes or example of the value that must be provided. This value appears in the UI. | Yes | 1.0 |
| `parameter.title` | This property is a short user-friendly parameter title or label. | Yes | 1.0 |
| `parameter.inputType` | This property is set to the type of the input required. Possible values include `text`, `textarea`, `number`, `date`, `time`, `toggle`. Default is set to `text`. | No | 1.4 |
| `parameters.value` | Initial value for the parameter. Currently the value isn't supported | No | 1.5 |

#### Example

Following section is an example of the simple app manifest of the `composeExtensions` object defining a search command:

```json
{
...
  "composeExtensions": [
    {
      "botId": "57a3c29f-1fc5-4d97-a142-35bb662b7b23",
      "canUpdateConfiguration": true,
      "commands": [{
          "id": "searchCmd",
          "description": "Search Bing for information on the web",
          "title": "Search",
          "initialRun": true,
          "parameters": [{
            "name": "searchKeyword",
            "description": "Enter your search keywords",
            "title": "Keywords"
          }]
        }
      ]
    }
  ],
...
}

```

For more information, see [app manifest schema](~/resources/schema/manifest-schema.md).


# [Action commands](#tab/action-commands)

[!include[v4-to-v3-SDK-pointer](~/includes/v4-to-v3-pointer-me.md)]

> [!NOTE]
> When a message action is initiated, attachment details aren't sent as part of the `turncontext` invoke activity.

Action commands allow you to present your users with a modal pop-up called a task module in Teams. The task module collects or displays information, processes the interaction, and sends the information back to Teams. This document guides you on how to select action command invoke locations, create your task module, send final message, or card, create action command using app studio, or create it manually.

## Add the action command to your app manifest

To add the action command to the app manifest, you must add a new `composeExtensions` object to the top level of the app manifest JSON. You can use one of the following ways to do so:

* [Create an action command using Developer Portal](#create-an-action-command-using-developer-portal)
* [Create an action command manually](#create-an-action-command-manually)

### Create an action command manually

To manually add your action-based message extension command to your app manifest, you must add the following parameters to the `composeExtensions.commands` array of objects:

| Property name | Purpose | Required? | Minimum manifest version |
|---|---|---|---|
| `id` | This property is a unique ID that you assign to this command. The user request includes this ID. | Yes | 1.0 |
| `title` | This property is a command name. This value appears in the UI. | Yes | 1.0 |
| `type` | This property must be an `action`. | No | 1.4 |
| `fetchTask` | This property is set to `true` for an adaptive card or embedded web view for your task module, and`false` for a static list of parameters or when loading the web view by a `taskInfo`. | No | 1.4 |
| `context` | This property is an optional array of values that defines where the message extension is invoked from. The possible values are `message`, `compose`, or `commandBox`. The default value is `["compose", "commandBox"]`. | No | 1.5 |

If you're using a static list of parameters, you must also add the following parameters:

| Property name | Purpose | Is required? | Minimum manifest version |
|---|---|---|---|
| `parameters` | This property describes the static list of parameters for the command. Only use when `fetchTask` is `false`. | No | 1.0 |
| `parameter.name` | This property describes the name of the parameter. This is sent to your service in the user request. | Yes | 1.0 |
| `parameter.description` | This property describes the parameter’s purposes or example of the value that should be provided. This value appears in the UI. | Yes | 1.0 |
| `parameter.title` | This property is a short user-friendly parameter title or label. | Yes | 1.0 |
| `parameter.inputType` | This property is set to the type of input required. The possible values include `text`, `textarea`, `number`, `date`, `time`, `toggle`. The default value is set to `text`. | No | 1.4 |

If you're using an embedded web view, you can optionally add the `taskInfo` object to fetch your web view without calling your bot directly. If you select this option, the behavior is similar to that of using a static list of parameters. In that the first interaction with your bot is [responding to the task module submit action](~/messaging-extensions/how-to/action-commands/respond-to-task-module-submit.md). If you're using a `taskInfo` object, you must set the `fetchTask` parameter to `false`.

| Property name | Purpose | Is required? | Minimum manifest version |
|---|---|---|---|
|`taskInfo`|Specify the task module to preload when using a message extension command. | No | 1.4 |
|`taskInfo.title`|Initial task module title. |No | 1.4 |
|`taskInfo.width`|Task module width, either a number in pixels or default layout such as `large`, `medium`, or `small`. |No | 1.4 |
|`taskInfo.height`|Task module height, either a number in pixels or default layout such as `large`, `medium`, or `small`.|No | 1.4 |
|`taskInfo.url`|Initial web view URL.|No | 1.4 |

#### App manifest example

This section isn't an example of the complete manifest. The following is an example of a `composeExtensions` object defining two action commands:

```json
...
"composeExtensions": [
  {
    "botId": "c8fa3cf6-b1f0-4ba8-a5bf-a241bc29adf3",
    "commands": [
      {
        "id": "To do",
        "type": "action",
        "title": "Create To do",
        "description": "Create a To do",
        "initialRun": true,
        "fetchTask": false,
        "context": [
          "commandBox",
          "compose"
        ],
        "parameters": [
          {
            "name": "Name",
            "title": "Title",
            "description": "To do Title",
            "inputType": "text"
          },
          {
            "name": "Description",
            "title": "Description",
            "description": "Description of the task",
            "inputType": "textarea"
          },
          {
            "name": "Date",
            "title": "Date",
            "description": "Due date for the task",
            "inputType": "date"
          }
        ]
      }
    ],
    "canUpdateConfiguration": true,
    "messageHandlers": [
      {
        "type": "link",
        "value": {
          "domains": [
            "yourapp.onmicrosoft.com"
          ]
        }
      }
    ]
  }
]
...
```

For more information, see [app manifest schema](~/resources/schema/manifest-schema.md).

---
