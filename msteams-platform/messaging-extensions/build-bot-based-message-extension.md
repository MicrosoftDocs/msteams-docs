---
title: Build Bot-based Message Extensions
author: surbhigupta
description: Learn about Bot-based message extension using Bot Framework to interact with your web service from different locations in Teams client.
ms.localizationpriority: medium
ms.topic: overview
ms.author: anclear
ms.owner: slamba
ms.date: 09/16/2024
---

# Build message extensions using Bot Framework

Message extensions built using Bot Framework (Bot-based) use a web service as bot. Developers can use message extensions to enable users to interact with web service from different locations in Teams client, such as compose message area, command box, or directly from message and send back structured data, such as cards.

Bot-based message extension takes advantage of Bot Framework's messaging schema and secure communication protocol. Bot is defined in app manifest for Teams app and developers can also define different types of commands for message extension, such as action commands or search commands.

There are two types of message extension commands, action command and search command. Message extension command type defines UI elements and interaction flows available to web service. Developers can use search command or action command to interact with web service through bot in Teams.

:::image type="content" source="../assets/images/Copilot/bot-based-action-search-command.png" alt-text="Screenshot shows the way for a developer to select between action commands and search commands." :::

# [Search commands](#tab/search-commands)

Message extension search commands allow users to search external systems and insert results of that search into message in form of card. This document guides developers on how to select search command invoke locations and add search command to app manifest.

> [!NOTE]
> Result card size limit is 28 KB. Card isn't sent if its size exceeds 28 KB.

See following video to learn how to define message extension search commands:
<br>
> [!VIDEO 64d251ff-0c4c-43df-a3f9-58171a3faf04]
<br>

Search command in message extension is configured using `composeExtensions.commands` property and `query` type in app manifest (previously called as Teams app manifest). Command and parameter descriptions enhance usability and effectiveness of message extension. Good command description offers clear and concise summary of app’s features.

Following code is example of `composeExtensions` property defining search command:

```json
{
 "composeExtensions": [
    {
      "botId": "eccdf132-0900-4d36-936b-dec5e6357f11",
      "commands": [
        {
          "id": "Dev",
          "type": "query",
          "title": "Jedi",
          "description": "May the force be with you",
          "initialRun": true,
          "fetchTask": false,
          "context": [
            "commandBox",
            "compose",
            "message"
          ],
          "parameters": [
            {
              "name": "Luke",
              "title": "Skywalker",
              "description": "Jedi master",
              "inputType": "text"
            }
          ]
        }
      ],
      "canUpdateConfiguration": true
    }
  ],
```

### Parameters

Developers must add following parameters to `composeExtensions.commands` array of objects:

| Property name | Purpose | Required? | Manifest version |
|---|---|---|---|
| `id` | Unique ID assigned to search command. User request includes this ID. | Yes | 1.0 |
| `title` | Command name. Value appears in user interface (UI). | Yes | 1.0 |
| `description` | Help text indicating what command does. Value appears in UI. | Yes | 1.0 |
|`semanticDescription`|Semantic description of command for consumption by Large Language Models (LLMs).|No|1.17|
| `type` | Type of command. Default is `query`. | No | 1.4 |
|`initialRun` | Indicates command should execute immediately when user selects it in UI if set to **true**. | No | 1.0 |
| `context` | Optional array of values that defines context in which search action is available. Possible values are `message`, `compose`, or `commandBox`. Default is `compose`,`commandBox`. | No | 1.5 |

Developers must add following search parameter details that define text visible to user in Teams client:

| Property name | Purpose | Is required? | Minimum manifest version |
|---|---|---|---|
| `parameters` | Defines static list of parameters for command. | No | 1.0 |
| `parameter.name` | Describes name of parameter. `parameter.name` is sent to service in user request. | Yes | 1.0 |
| `parameter.description` | Describes parameter’s purposes or example of value that must be provided. Value appears in UI. | Yes | 1.0 |
|`parameter.semanticDescription`|Semantic description of parameter for consumption by Large Language Models (LLMs).|No|1.17|
| `parameter.title` | Short user-friendly parameter title or label. | Yes | 1.0 |
| `parameter.inputType` | Specifies type of input required. Possible values include `text`, `textarea`, `number`, `date`, `time`, `toggle`. Default is `text`. | No | 1.4 |
| `parameters.value` | Initial value for parameter. Value isn't supported | No | 1.5 |

For more information, see [app manifest schema](/microsoft-365/extensibility/schema).

## Next step

> [!div class="nextstepaction"]
> [Define message extension search command](how-to/search-commands/define-search-command.md)

# [Action commands](#tab/action-commands)

> [!NOTE]
> When message action is initiated, attachment details aren't sent as part of `turncontext` invoke activity.

Action commands allow developers to present users with modal pop-up called task module in Teams. Task module collects or displays information, processes interaction, and sends information back to Teams. This document guides developers on how to select action command invoke locations, create task module, send final message or card, and create action command manually.

Action command in message extension is configured using `composeExtensions.commands` property and `action` type in app manifest.

Following code is example of `composeExtensions` property defining action command:

```json
"composeExtensions": [
        {
            "botId": "xxxxxx-xxx-bot-ID-xxxxxxxx}",
            "commands": [
                {
                    "id": "createCard",
                    "context": [
                        "compose",
                        "message",
                        "commandBox"
                    ],
                    "description": "Command to run action to create a Card from Compose Box",
                    "title": "Create Card",
                    "type": "action",
                    "parameters": [
                        {
                            "name": "title",
                            "title": "Card title",
                            "description": "Title for the card",
                            "inputType": "text"
                        },
                        {
                            "name": "subTitle",
                            "title": "Subtitle",
                            "description": "Subtitle for the card",
                            "inputType": "text"
                        },
                        {
                            "name": "text",
                            "title": "Text",
                            "description": "Text for the card",
                            "inputType": "textarea"
                        }
                    ]
                }
            ]
        }
    ]
```

### Parameters

Developers must add following parameters to `composeExtensions.commands` array of objects:

| Property name | Purpose | Required? | Manifest version |
|---|---|---|---|
| `id` | Unique ID assigned to this command. User request includes this ID. | Yes | 1.0 |
| `title` | Command name. Value appears in UI. | Yes | 1.0 |
| `type` | Message extension type. Default is `action`. | No | 1.4 |
| `fetchTask` | Set to `true` for Adaptive Card or embedded web view for task module and `false` for static list of parameters or when loading web view by `taskInfo`. | No | 1.4 |
| `context` | Optional array of values that defines where message extension is invoked. Possible values are `message`, `compose`, or `commandBox`. Default value is `["compose", "commandBox"]`. | No | 1.5 |

When using static list of parameters, developers must also add following parameters:

| Property name | Purpose | Is required? | Minimum manifest version |
|---|---|---|---|
| `parameters` | Describes static list of parameters for command. Only use when `fetchTask` is `false`. | No | 1.0 |
| `parameter.name` | Describes name of parameter. This is sent to service in user request. | Yes | 1.0 |
| `parameter.description` | Describes parameter’s purposes or example of value that should be provided. Value appears in UI. | Yes | 1.0 |
| `parameter.title` | Short user-friendly parameter title or label. | Yes | 1.0 |
| `parameter.inputType` | Specifies type of input required. Possible values include `text`, `textarea`, `number`, `date`, `time`, `toggle`. Default is `text`. | No | 1.4 |

When using embedded web view, developers can optionally add `taskInfo` object to fetch web view without calling bot directly. Selecting this option yields behavior similar to using static list of parameters. In this case, first interaction with bot is [responding to task module submit action](~/messaging-extensions/how-to/action-commands/respond-to-task-module-submit.md). When using `taskInfo` object, developers must set `fetchTask` parameter to `false`.

| Property name | Purpose | Is required? | Minimum manifest version |
|---|---|---|---|
|`taskInfo`|Specifies task module to preload when using message extension command. | No | 1.4 |
|`taskInfo.title`|Initial task module title. |No | 1.4 |
|`taskInfo.width`|Task module width, either a number in pixels or default layout such as `large`, `medium`, or `small`. |No | 1.4 |
|`taskInfo.height`|Task module height, either a number in pixels or default layout such as `large`, `medium`, or `small`.|No | 1.4 |
|`taskInfo.url`|Initial web view URL.|No | 1.4 |

For more information, see [app manifest schema](/microsoft-365/extensibility/schema).

## Next step

> [!div class="nextstepaction"]
> [Define message extension action commands](how-to/action-commands/define-action-command.md)

---

## See also

* [Universal Actions for search based message extensions](how-to/search-commands/universal-actions-for-search-based-message-extensions.md)
* [API-based message extension](api-based-overview.md)