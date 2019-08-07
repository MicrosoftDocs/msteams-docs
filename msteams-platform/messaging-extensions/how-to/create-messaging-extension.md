---
title: Create a messaging extension
author: clearab
description: How to create a messaging extension for a Microsoft Teams app.
ms.topic: conceptual
ms.author: anclear
---
# Create a messaging extension in Microsoft Teams

At a high level, you'll need to complete the following steps to create a messaging extension.

1. Prepare your development environment
1. Create and register your bot service
1. Create and deploy your app service (while developing you can use service like ngrok to [run it locally](~/foo.md))
1. Create your app package
1. Upload your package to Microsoft Teams

As you're building your messaging extension, you'll regularly be moving between changing your app manifest, and deploying code to your bot's app service. When working with the app manifest, keep in mind that you can either manually manipulate the JSON file, or make changes through App Studio. Either way, you'll need to re-deploy (sideload) your app in Teams when you make a change.

[!include[prepare environment](~/includes/prepare-environment.md)]

## Create a bot on the Bot Framework

Messaging extensions are powered by bots built on the Bot Framework; if you don't already have on you'll need to [create a bot and register it on the Bot Framework](/foo.md). The Microsoft App Id (we'll refer to this as your Bot Id from inside of Teams, to identify it from other App Id's you might be working with) and the messaging endpoints for your bot will be used in your messaging extension to receive and respond to requests. If you're using an existing bot, make sure you [enable the Microsoft Teams channel](/azure/bot-service/bot-service-manage-channels.md?view=azure-bot-service-4.0).

Once you've got your bot service created, if you're starting from a new bot you'll need to create and deploy the app service that powers your bot. Depending on how you chose to create your bot service, you may need to do this manually. For Node.js bots we recommend using the [Teams Yeoman generator](~/foo.md), and for C#/.NET bots starting with the **EchoBot** template in the [Bot Framework Visual Studio Template](https://marketplace.visualstudio.com/items?itemName=BotBuilder.botbuilderv4). For more information see [create a bot](foo.md).

## Create your app manifest using App Studio

You can use the App Studio app from within the Microsoft Teams client to help create your app manifest.

1. In the Teams client, open App Studio from the **...** overflow menu on the left navigation rail.
1. On the **Manifest editor** tab select **Create a new app** (or if you're adding a messaging extension to an existing app, you can import your app package)
1. Add your app details (see [manifest schema definition](~/resoureces/foo.md) for full descriptions of each field).
1. On the **Messaging extensions** tab click the **Setup** button.
1. You can either create a new bot for your messaging extension to use, or if you've already registered a bot select/add it here.
1. If necessary, update your bot endpoint address to point to your bot. It should look something like `https://someplace.com/api/messages`.
1. The **Add** button in the **Command** section will guide you through adding commands to your messaging extension. See the [Learn more](#learn-more) section for links to more information on adding commands. Remember you can define up to 10 commands for your messaging extension.
1. The **Message Handlers** section allows you to add a domain that your messaging will trigger on. See [link unfurling](foo.md) for more information.

From the **Finish => Test and distribute** tab you can **Download** your app package (which includes your app manifest as well as your app icons), or **Install** the package into a team.

## Create your app manifest manually

As with bots and tabs, you update the [app manifest](~/resources/schema/manifest-schema.md#composeextensions) of your app to include the messaging extension properties. These properties govern how your messaging extension appears and behaves in the Microsoft Teams client. Messaging extensions are supported beginning with v1.0 of the manifest.

### Declare your messaging extension

To add a messaging extension, include a new top-level JSON structure in your app manifest with the `composeExtensions` property. You create a single messaging extension for your app, with up to 10 commands.

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

Configuration complete, it's time to start writing code. When your users trigger your messaging extension you'll need to handle the initial invoke message, collect some information from the user, then process that information and respond appropriately. To do that, you'll first need to decide what kind of commands you want to add to your messaging extension and either [add an action-based commands](~/messaging-extensions/how-to/action-based-commands/define-action-based-command.md) or [add a search-based commands](~/messaging-extensions/how-to/search-based-commands/define-search-based-command.md).

## Identify the user

Every request to your services includes the obfuscated ID of the user that performed the request, as well as the user's display name and Azure Active Directory object ID.

```json
"from": {
  "id": "29:1C7dbRrC_5yzN1RGtZIrcWT0xz88KPGP9sxdpVpV8sODlgPHeQE9RqQ02hnpuKzy6zZ-AaZx6swUOMj_Dsdse3TQ4sIaeebbFBF-VgjJy_nY",
  "name": "John Smythe",
  "aadObjectId": "cd723fa0-0591-416a-9290-e93ecf3a9b92"
},
```

The `id` and `aadObjectId` values are guaranteed to be that of the authenticated Teams user. They can be used as keys to look up credentials or any cached state in your service. In addition, each request contains the Azure Active Directory tenant ID of the user, which can be used to identify the user’s organization. If applicable, the request also contains the team and channel IDs from which the request originated.

## Next steps

* [Create action-based commands](~/messaging-extensions/how-to/action-based-commands/define-action-based-command.md)
* [Create search-based commands](~/messaging-extensions/how-to/search-based-commands/define-search-based-command.md)

## Learn more

Try it out in a quickstart:

* Quickstarts for C#
  * [Messaging extension with action-based commands](~/foo.md)
  * [Messaging extension with search-based commands](~/foo.md)
* Quickstarts for Node.js
  * [Messaging extension with action-based commands](~/foo.md)
  * [Messaging extension with search-based commands](~/foo.md)

Learn more about messaging extensions concepts:

* [Understand Teams app capabilities ?](~/concepts/understand-teams-app-capabilities.md)
* [What are messaging extensions?](~/messaging-extensions/what-are-messaging-extensions.md)

Learn about designing effective messaging extensions:

* [linkToMEDesignArticle](./foo.md)

Learn about authentication in messaging extensions

* [something something authentication](./foo.md)