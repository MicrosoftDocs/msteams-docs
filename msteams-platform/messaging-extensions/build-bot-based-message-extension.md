---
title: Build Bot-based Message Extensions
author: v-ypalikila
description: Learn about Bot-based message extension using Bot Framework to interact with your web service from different locations in the Teams client.
ms.localizationpriority: medium
ms.topic: overview
ms.author: anclear
ms.date: 09/16/2024
---

# Build message extensions using Bot Framework

Message extensions built using Bot Framework (Bot-based) use a web service as a bot. You can use message extensions to enable users to interact with your web service from different locations in the Teams client, such as the compose message area, the command box, or directly from a message and send back structured data, such as cards.

Bot-based message extension takes advantage of the Bot Framework's messaging schema and secure communication protocol. The bot is defined in the app manifest for the Teams app and you can also define different types of commands for your message extension, such as action commands or search commands.

There are two types of message extension commands, action command and search command. The message extension command type defines the UI elements and interaction flows available to your web service. You can use a search command or an action command to interact with your web service through a bot in Teams.

:::image type="content" source="../assets/images/Copilot/bot-based-action-search-command.png" alt-text="Screenshot shows the way for a developer to select between action commands and search commands.":::

# [Search commands](#tab/search-commands)

Message extension search commands allow users to search external systems and insert the results of that search into a message in the form of a card. This document guides you on how to select search command invoke locations, and add the search command to your app manifest.

> [!NOTE]
> The result card size limit is 28 KB. The card isn't sent if its size exceeds 28 KB.

See the following video to learn how to define message extension search commands:
<br>
> [!VIDEO https://www.microsoft.com/en-us/videoplayer/embed/RE4OIvK]
<br>

The search command in a message extension is configured using the `composeExtensions.commands` property and the `query` type in the app manifest (previously called as Teams app manifest). Command and parameter descriptions enhance the usability and effectiveness of a message extension. A good command description offers a clear and concise summary of the app’s features.

The following code is an example of the `composeExtensions` property defining a search command:

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

You must add the following parameters to your `composeExtensions.commands` array of objects:

| Property name | Purpose | Required? | Manifest version |
|---|---|---|---|
| `id` | Unique ID that you assign to search command. The user request includes this ID. | Yes | 1.0 |
| `title` |Command name. This value appears in the user interface (UI). | Yes | 1.0 |
| `description` | Help text indicating what this command does. This value appears in the UI. | Yes | 1.0 |
|`semanticDescription`|Semantic description of the command for consumption by the Large Language Models (LLMs).|No|1.17|
| `type` | Type of command. Default is `query`. | No | 1.4 |
|`initialRun` | If this property is set to **true**, it indicates this command should be executed as soon as the user selects this command in the UI. | No | 1.0 |
| `context` | Optional array of values that defines the context the search action is available in. The possible values are `message`, `compose`, or `commandBox`. The default is `compose`,`commandBox`. | No | 1.5 |

You must add the following search parameter details that define the text visible to your user in the Teams client:

| Property name | Purpose | Is required? | Minimum manifest version |
|---|---|---|---|
| `parameters` | Defines a static list of parameters for the command. | No | 1.0 |
| `parameter.name` | Describes the name of the parameter. The `parameter.name` is sent to your service in the user request. | Yes | 1.0 |
| `parameter.description` | Describes the parameter’s purposes or example of the value that must be provided. This value appears in the UI. | Yes | 1.0 |
|`parameter.semanticDescription`|Semantic description of the parameter for consumption by the Large Language Models (LLMs).|No|1.17|
| `parameter.title` | Short user-friendly parameter title or label. | Yes | 1.0 |
| `parameter.inputType` | Set to the type of the input required. Possible values include `text`, `textarea`, `number`, `date`, `time`, `toggle`. Default is set to `text`. | No | 1.4 |
| `parameters.value` | Initial value for the parameter. The value isn't supported | No | 1.5 |

For more information, see [app manifest schema](~/resources/schema/manifest-schema.md).

## Message extension as a plugin for Copilot for Teams chats

Teams supports message extension plugins in Microsoft Copilot for Teams chats. Extending bot-based message extension plugins to Teams chats offers several benefits:

* **Expanded functionality**: Plugins for Copilot for Teams chats offer functionalities that complement those of plugins for Copilot for Microsoft 365 or meetings. For example, a plugin for Copilot for meetings helps schedule and manage meetings, while a plugin for Copilot for Teams chats handles follow-up actions such as sending meeting minutes or action items.

* **Integration**: Plugins can help integrate other external tools or services into Copilot for Teams chats. This can streamline workflows by allowing users to access multiple tools and services from one place, reducing context switching.

* **Consistency**: Having plugins for both chat and meetings can provide a consistent user experience across different modes of communication.

For example, consider a scenario where an accessibility issue is identified in a one-on-one chat. If an Azure DevOps plugin for Copilot for Teams chats activated, Copilot for Teams chats can be instructed to create a bug in Azure DevOps to track the identified issue. Copilot uses relevant information from the conversation to activate the Azure DevOps plugin, which results in the creation of a bug.

To learn how to build a bot-based message extension plugin for Copilot for Teams chats, see [Extend bot-based message extension as plugin for Copilot for Microsoft 365 and Copilot for Teams chats](build-bot-based-plugin.md).
## Message extension as plugin for Copilot for Teams meetings

Message extension plugins are supported in Copilot for Teams meetings. Extending bot-based message extension plugins to meetings allows you to enhance the Copilot for Teams meetings. Copilot for Teams meetings can utilize various app capabilities during meetings, such as task modules, app sharing, and more, to improve user engagement and productivity. For example, a plugin can be used in Copilot for Teams meetings to summarize discussions, generate notes, and list tasks. It also extends the benefits of traditional plugins by enabling real-time interaction with external data and custom functionality.

Copilot for Teams meetings is interactive and efficient, it can assist with summarizing discussions, suggesting action items, and providing prompt-less assistance in real-time. Users can ask natural language questions to Copilot for Teams meetings and get responses from your plugin that are relevant to the meeting context. Plugins are available for users to enable in both Microsoft 365 Copilot and Copilot for Teams meetings.

:::image type="content" source="../assets/images/Copilot/meeting-copilot-extensibility.png" alt-text="Screenshot shows the plugins flyout menu in Copilot for Teams meetings.":::

| Benefits          | Description                                                                                                            |
|-------------------|------------------------------------------------------------------------------------------------------------------------|
| User Empowerment  | Extending Copilot for Teams meetings empowers users with various actions to enhance their meeting experience.                      |
| UI Commands       | Users can easily access features like opening a task module or sharing an app to the stage.                             |
| Search Commands   | Efficient data retrieval from app databases is made possible, streamlining the search process.                          |

| Scenarios         | Description                                                                                                            |
|-------------------|------------------------------------------------------------------------------------------------------------------------|
| Reactive Commands | Users can directly command Copilot for Teams meetings to perform specific actions or provide information.                                  |
|                   | - Natural Language Prompts: Users can instruct Copilot for Teams meetings to carry out search commands.                         |
|                   | - Prompt Suggestions: Apps can offer static or enriched prompts for Copilot for Teams meetings to execute.                                |
| Proactive Assistance | Copilot for Teams meetings proactively listens to meeting signals and assists users by:                                                   |
|                   | - Suggesting prompts from apps: Contextually relevant suggestions based on the discussion topics.                      |
|                   | - Providing assistance without explicit prompts: Copilot for Teams meetings can automatically suggest actions based on the discussion.    |

## Next step

> [!div class="nextstepaction"]
> [Define message extension search command](how-to/search-commands/define-search-command.md)

# [Action commands](#tab/action-commands)

> [!NOTE]
> When a message action is initiated, attachment details aren't sent as part of the `turncontext` invoke activity.

Action commands allow you to present your users with a modal pop-up called a task module in Teams. The task module collects or displays information, processes the interaction, and sends the information back to Teams. This document guides you on how to select action command invoke locations, create your task module, send final message, or card, create action command using app studio, or create it manually.

The action command in a message extension is configured using the `composeExtensions.commands` property and `action` type in the app manifest.

The following code is an example of the `composeExtensions` property defining an action command:

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

You must add the following parameters to your `composeExtensions.commands` array of objects:

| Property name | Purpose | Required? | Manifest version |
|---|---|---|---|
| `id` | Unique ID that you assign to this command. The user request includes this ID. | Yes | 1.0 |
| `title` | Command name. This value appears in the UI. | Yes | 1.0 |
| `type` | Message extension type. Default is `action`. | No | 1.4 |
| `fetchTask` | Set to `true` for an Adaptive Card or embedded web view for your task module, and`false` for a static list of parameters or when loading the web view by a `taskInfo`. | No | 1.4 |
| `context` | Optional array of values that defines where the message extension is invoked from. The possible values are `message`, `compose`, or `commandBox`. The default value is `["compose", "commandBox"]`. | No | 1.5 |

If you're using a static list of parameters, you must also add the following parameters:

| Property name | Purpose | Is required? | Minimum manifest version |
|---|---|---|---|
| `parameters` | Describes the static list of parameters for the command. Only use when `fetchTask` is `false`. | No | 1.0 |
| `parameter.name` | Describes the name of the parameter. This is sent to your service in the user request. | Yes | 1.0 |
| `parameter.description` | Describes the parameter’s purposes or example of the value that should be provided. This value appears in the UI. | Yes | 1.0 |
| `parameter.title` | Short user-friendly parameter title or label. | Yes | 1.0 |
| `parameter.inputType` | Set to the type of input required. The possible values include `text`, `textarea`, `number`, `date`, `time`, `toggle`. The default value is set to `text`. | No | 1.4 |

If you're using an embedded web view, you can optionally add the `taskInfo` object to fetch your web view without calling your bot directly. If you select this option, the behavior is similar to that of using a static list of parameters. In that the first interaction with your bot is [responding to the task module submit action](~/messaging-extensions/how-to/action-commands/respond-to-task-module-submit.md). If you're using a `taskInfo` object, you must set the `fetchTask` parameter to `false`.

| Property name | Purpose | Is required? | Minimum manifest version |
|---|---|---|---|
|`taskInfo`|Specify the task module to preload when using a message extension command. | No | 1.4 |
|`taskInfo.title`|Initial task module title. |No | 1.4 |
|`taskInfo.width`|Task module width, either a number in pixels or default layout such as `large`, `medium`, or `small`. |No | 1.4 |
|`taskInfo.height`|Task module height, either a number in pixels or default layout such as `large`, `medium`, or `small`.|No | 1.4 |
|`taskInfo.url`|Initial web view URL.|No | 1.4 |

For more information, see [app manifest schema](~/resources/schema/manifest-schema.md).

## Next step

> [!div class="nextstepaction"]
> [Define message extension action commands](how-to/action-commands/define-action-command.md)

---

## See also

* [Universal Actions for search based message extensions](how-to/search-commands/universal-actions-for-search-based-message-extensions.md)
* [API-based message extension](api-based-overview.md)
