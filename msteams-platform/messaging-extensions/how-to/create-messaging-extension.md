---
title: Create a messaging extension
author: clearab
description: How to create a messaging extension for a Microsoft Teams app.
ms.topic: conceptual
ms.author: anclear
---
# Create a messaging extension in Microsoft Teams

At a high level, you'll need to complete the following steps to create a messaging extension.

1. Create and register your bot service
1. Create and deploy your app service (you can use service like ngrok to [run it locally](~/foo.md))
1. Create your app package
1. Upload your package to Microsoft Teams

## Create a bot on the Bot Framework

Messaging extensions are powered by bots built on the Bot Framework; if you don't already have on you'll need to [create a bot and register it on the Bot Framework](/foo.md). The Microsoft App Id (we'll refer to this as your Bot Id from inside of Teams, to identify it from other App Id's you might be working with) and the messaging endpoints for your bot will be used in your messaging extension to receive and respond to requests. If you're using an existing bot, make sure you [enable the Microsoft Teams channel](/azure/bot-service/bot-service-manage-channels.md?view=azure-bot-service-4.0).

Once you've got your bot service created, if you're starting from a new bot you'll need to create and deploy the app service that powers your bot. Depending on how you chose to create your bot service, you may need to do this manually. For Node.js bots we recommend using the Teams Yeoman generator, and for C#/.NET bots starting with the EchoBot in the [Bot Framework Visual Studio Template](https://marketplace.visualstudio.com/items?itemName=BotBuilder.botbuilderv4). For more information see [create a bot](foo.md).

## Create your app manifest using App Studio

foo.md

## Create your app manifest manually

As with bots and tabs, you update the [manifest](~/resources/schema/manifest-schema.md#composeextensions) of your app to include the messaging extension properties. These properties govern how your messaging extension appears and behaves in the Microsoft Teams client. Messaging extensions are supported beginning with v1.0 of the manifest.

### Declare your messaging extension

To add a messaging extension, include a new top-level JSON structure in your [app manifest](foo.md) with the `composeExtensions` property. You create a single messaging extension for your app, with up to 10 commands.

> [!NOTE]
> The manifest refers to messaging extensions as `composeExtensions`. This is to maintain backward compatibility.

The extension definition is an object that has the following structure:

| Property name | Purpose | Required? |
|---|---|---|
| `botId` | The unique Microsoft app ID for the bot as registered with the Bot Framework. This should typically be the same as the ID for your overall Teams app. | Yes |
| `canUpdateConfiguration` | Enables **Settings** menu item. | No |
| `commands` | Array of commands that this messaging extension supports. You are limited to 10 commands. | Yes |

### Define your commands

Your messaging extension should declare one or more commands, which define where your users can trigger your messaging extension, and the type of interaction. See [learn more](#learn-more) for links to more information on messaging extension commands.

In the app manifest, your command item is an object with the following structure:

| Property name | Purpose | Required? | Minimum manifest version |
|---|---|---|---|
| `id` | Unique ID that you assign to this command. The user request will include this ID. | Yes | 1.0 |
| `title` | Command name. This value appears in the UI. | Yes | 1.0 |
| `description` | Help text indicating what this command does. This value appears in the UI. | Yes | 1.0 |
| `type` | Set the type of command. Possible values include `query` and `action`. If not present the default value is set to `query` | No | 1.4 |
| `initialRun` | Optional parameter, used with `query` commands. If set to **true**, indicates this command should be executed as soon as the user chooses this command in the UI. | No | 1.0 |
| `fetchTask` | Optional parameter, used with `action` commands. Set to **true** to fetch the adaptive card or web url to display. This is used when the inputs to the `action` command is dynamic as opposed to a static set of parameters. Note that the if set to **true** the static parameter list for the command is ignored | No | 1.4 |
| `parameters` | Static list of parameters for the command. | Yes | 1.0 |
| `parameter.name` | The name of the parameter. This is sent to your service in the user request. | Yes | 1.0 |
| `parameter.description` | Describes this parameter’s purposes or example of the value that should be provided. This value appears in the UI. | Yes | 1.0 |
| `parameter.title` | Short user-friendly parameter title or label. | Yes | 1.0 |
| `parameter.inputType` | Set to the type of input required. Possible values include `text`, `textarea`, `number`, `date`, `time`, `toggle`. Default is set to `text` | No | 1.4 |
| `context` | Optional array of values that defines the context the message action is available in. Possible values are `message`, `compose`, or `commandBox`. Default is `["compose", "commandBox"]`. | No | 1.5 |

### Simple manifest example

The example below is a simple messaging extension object in the app manifest with a search command. This is not the entire app manifest file, just the part specific to messaging extensions. See [app manifest schema](foo.md) for a complete example).

```json
...
"composeExtensions": [
  {
    "botId": "abcd1234-1fc5-4d97-a142-35bb662b7b23",
    "canUpdateConfiguration": true,
    "commands": [
      {
        "id": "searchCmd",
        "description": "Search you ToDo's",
        "title": "Search",
        "initialRun": true,
        "parameters": [
          {
            "name": "searchKeyword",
            "description": "Enter your search keywords",
            "title": "Keywords"
          }
        ]
      }
    ]
  }
]
...
```

## Add your invoke message handlers

Configuration complete, it's time to start writing code. foo.md => more things

## Learn more

Learn more about messaging extensions:

* [What are messaging extensions?](~/messaging-extensions/what-are-messaging-extensions.md)

Learn about designing effective messaging extensions:

* [linkToMEDesignArticle](./foo.md)

Learn how to add commands to your messaging extension

* [Define action-based messaging extension command](./foo.md)
* [Define search-based messaging extension command](./foo.md)