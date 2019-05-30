---
title: Create a messaging extension
author: clearab
description: How to create a messaging extension for a Microsoft Teams app.
ms.topic: conceptual
ms.author: anclear
---
# Create a messaging extension in Microsoft Teams

At a high level, you'll need to complete the following steps to create a messaging extension.

1. Create and deploy your app service (you can use service like ngrok to [run it locally](~/foo.md))
1. Create and register your bot service
1. Create your app package
1. Upload your package to Microsoft Teams
1. Extend your bot with additional capabilities by adding commands

## Create a bot on the Bot Framework

Messaging extensions are powered by bots built on the Bot Framework; if you don't already have on you'll need to [create a bot and register it on the Bot Framework](/foo.md). The Microsoft App Id (we'll refer to this as your Bot Id from inside of Teams, to identify it from other App Id's you might be working with) and the messaging endpoints for your bot will be used in your messaging extension to receive and respond to requests. If you're using an existing bot, make sure you [enable the Microsoft Teams channel](/azure/bot-service/bot-service-manage-channels.md?view=azure-bot-service-4.0).

## Update your app manifest

As with bots and tabs, you update the [manifest](~/resources/schema/manifest-schema.md#composeextensions) of your app to include the messaging extension properties. These properties govern how your messaging extension appears and behaves in the Microsoft Teams client. Messaging extensions are supported beginning with v1.0 of the manifest.

### Declare your messaging extension

To add a messaging extension, include a new top-level JSON structure in your manifest with the `composeExtensions` property. Currently, you are limited to creating a single messaging extension for your app.

> [!NOTE]
> The manifest refers to messaging extensions as `composeExtensions`. This is to maintain backward compatibility.

The extension definition is an object that has the following structure:

| Property name | Purpose | Required? |
|---|---|---|
| `botId` | The unique Microsoft app ID for the bot as registered with the Bot Framework. This should typically be the same as the ID for your overall Teams app. | Yes |
| `scopes` | Array declaring whether this extension can be added to `personal` or `team` scopes (or both). | Yes |
| `canUpdateConfiguration` | Enables **Settings** menu item. | No |
| `commands` | Array of commands that this messaging extension supports. You are limited to 10 commands. | Yes |

### Define your commands

Your messaging extension should declare one command, which appears when the user selects your app from the **More options** (**&#8943;**) button in the compose box.

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

## Learn more

Learn more about messaging extensions:

* [What are messaging extensions?](~/messaging-extensions/what-are-messaging-extensions.md)

Learn about designing effective messaging extensions:

* [linkToMEDesignArticle](./foo.md)

Learn how to add commands to your messaging extension

* [Define action-based messaging extension command](./foo.md)
* [Define search-based messaging extension command](./foo.md)