---
title: Create a messaging extension using App Studio
author: clearab
description: Learn how to create a Microsoft Teams messaging extension using App Studio.
ms.topic: conceptual
ms.author: anclear
---
# Create a messaging extension using App Studio

> [!TIP]
> Looking for a faster way to get started? Create a [messaging extension](../../build-your-first-app/build-messaging-extension.md) using the Microsoft Teams Toolkit.

At a high level, you'll need to complete the following steps to create a messaging extension.

1. Prepare your development environment
2. Create and deploy your web service (while developing use a tunneling service like ngrok to run it locally)
3. Register your web service with the Bot Framework
4. Create your app package
5. Upload your package to Microsoft Teams

Creating your web service, creating your app package, and registering your web service with the Bot Framework can be done in any order. Because those three pieces are so intertwined, no matter which order you do them in you'll need return to update the others. Your registration needs the messaging endpoint from your deployed web service, and your web service needs the Id and password created from your registration. Your app manifest also needs that Id to connect Teams to your web service.

As you're building your messaging extension, you'll regularly be moving between changing your app manifest, and deploying code to your web service. When working with the app manifest, keep in mind that you can either manually manipulate the JSON file, or make changes through App Studio. Either way, you'll need to re-deploy (upload) your app in Teams when you make a change to the manifest, but there's no need to do so when you deploy changes to your web service.

[!include[prepare environment](~/includes/prepare-environment.md)]

## Create your web service

The heart of your messaging extension is your web service. It will define a single route, typically `/api/messages`, to receive all requests on. If you're getting started from scratch, you have a few options to choose from.

* Use one of our [quickstarts](#learn-more) tutorials that will guide you through the creation of your web service.
* Choose one of the messaging extension samples available in the [Bot Framework sample repository](https://github.com/Microsoft/BotBuilder-Samples) to start from.
* If you're using JavaScript, use the [Yeoman generator for Microsoft Teams](https://github.com/OfficeDev/generator-teams) to scaffold your Teams app, including your web service.
* Create your web service from scratch. You can choose to add the Bot Framework SDK for your language, or you can work directly with the JSON payloads.

## Register your web service with the Bot Framework

Messaging extensions take advantage of the Bot Framework's messaging schema and secure communication protocol; if you don't already have one you'll need to register your web service on the Bot Framework. The Microsoft App Id (we'll refer to this as your Bot Id from inside of Teams, to identify it from other App Id's you might be working with) and the messaging endpoint your register with the Bot Framework will be used in your messaging extension to receive and respond to requests. If you're using an existing registration, make sure you [enable the Microsoft Teams channel](/azure/bot-service/bot-service-manage-channels.md?view=azure-bot-service-4.0&preserve-view=true).

If you follow one of the quickstarts or start from one of the available samples you'll be guided through registering your web service. If you want to manually register your service you have three options to do so. If you choose to register without using an Azure subscription you will not be able to take advantage of the simplified OAuth authentication flow provided by the Bot Framework. You will be able to migrate your registration to Azure after creation.

* If you have an Azure subscription (or want to create a new one), you can register your web service manually using the Azure Portal. Create a "Bot Channels Registration" resource. You can choose the free pricing tier, as messages from Microsoft Teams do not count towards your total allowable messages per month.
* If you do not wish to use an Azure subscription, you can use the [legacy registration portal](https://dev.botframework.com/bots/new).
* App Studio can also help you register your web service (bot). Web services registered through App Studio are not registered in Azure. You can use the [legacy portal](https://dev.botframework.com/bots) to view, manage, and migrate your registrations.

## Create your app manifest

You can either use App Studio to help you create your app manifest, or create it manually.

### Create your app manifest using App Studio

You can use the App Studio app from within the Microsoft Teams client to help create your app manifest.

1. In the Teams client, open App Studio from the **...** overflow menu on the left navigation rail. If it isn't already installed, you can do so by searching for it.
2. On the **Manifest editor** tab select **Create a new app** (or if you're adding a messaging extension to an existing app, you can import your app package)
3. Add your app details (see [manifest schema definition](~/resources/schema/manifest-schema.md) for full descriptions of each field).
4. On the **Messaging extensions** tab click the **Setup** button.
5. You can either create a new web service (bot) for your messaging extension to use, or if you've already registered one select/add it here.
6. If necessary, update your bot endpoint address to point to your bot. It should look something like `https://someplace.com/api/messages`.
7. The **Add** button in the **Command** section will guide you through adding commands to your messaging extension. See the [Learn more](#learn-more) section for links to more information on adding commands. Remember you can define up to 10 commands for your messaging extension.
8. The **Message Handlers** section allows you to add a domain that your messaging will trigger on. See [link unfurling](~/messaging-extensions/how-to/link-unfurling.md) for more information.

From the **Finish => Test and distribute** tab you can **Download** your app package (which includes your app manifest as well as your app icons), or **Install** the package.

### Create your app manifest manually

As with bots and tabs, you update the [app manifest](~/resources/schema/manifest-schema.md#composeextensions) of your app to include the messaging extension properties. These properties govern how your messaging extension appears and behaves in the Microsoft Teams client. Messaging extensions are supported beginning with v1.0 of the manifest.

#### Declare your messaging extension

To add a messaging extension, include a new top-level JSON structure in your app manifest with the `composeExtensions` property. You create a single messaging extension for your app, with up to 10 commands.

> [!NOTE]
> The manifest refers to messaging extensions as `composeExtensions`. This is to maintain backward compatibility.

The extension definition is an object that has the following structure:

| Property name | Purpose | Required? |
|---|---|---|
| `botId` | The unique Microsoft app ID for the bot as registered with the Bot Framework. This should typically be the same as the ID for your overall Teams app. | Yes |
| `canUpdateConfiguration` | Enables **Settings** menu item. | No |
| `commands` | Array of commands that this messaging extension supports. You are limited to 10 commands. | Yes |

#### Define your commands

Your messaging extension should declare one or more commands, which define where your users can trigger your messaging extension, and the type of interaction. See [learn more](#learn-more) for more information on messaging extension commands.

#### Simple manifest example

The example below is a simple messaging extension object in the app manifest with a search command. This is not the entire app manifest file, just the part specific to messaging extensions. See [app manifest schema](~/resources/schema/manifest-schema.md) for a complete example.

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

When your users trigger your messaging extension you'll need to handle the initial invoke message, collect some information from the user, then process that information and respond appropriately. To do that, you'll first need to decide what kind of commands you want to add to your messaging extension and either [add an action commands](~/messaging-extensions/how-to/action-commands/define-action-command.md) or [add a search commands](~/messaging-extensions/how-to/search-commands/define-search-command.md).

## Messaging extensions in Teams meetings

Once a meeting begins, Teams participants can interact directly with your messaging extension during a live call. Consider the following when building your in-meeting messaging extension:

1. **Location**. Your messaging extension can be invoked from the compose message area, the command box, or @mentioned in the meeting chat.

1. **Metadata**. When your messaging extension is invoked it can identify the user and tenant from `userId` and `tenantId`. The `meetingId` can be found as part of the `channelData` object. Your app can use the `userId` and `meetingId`  for the `GetParticipant` API request to retrieve user roles.

1. **Command type**. If your message extension uses [action-based commands](../../messaging-extensions/what-are-messaging-extensions.md#action-commands), it should follow tabs [single sign-on](../../tabs/how-to/authentication/auth-aad-sso.md) authentication.

1. **User experience**. You should determine the intended the end-user experience for messaging extensions invoked during a meeting chat.

## Next steps

* [Create action commands](~/messaging-extensions/how-to/action-commands/define-action-command.md)
* [Create search commands](~/messaging-extensions/how-to/search-commands/define-search-command.md)
* [Link unfurling](~/messaging-extensions/how-to/link-unfurling.md)

## Learn more

Try it out in a quickstart:

* Quickstarts for C#
  * [Messaging extension with action-based commands](https://github.com/microsoft/BotBuilder-Samples/tree/master/samples/csharp_dotnetcore/51.teams-messaging-extensions-action)
  * [Messaging extension with search-based commands](https://github.com/microsoft/BotBuilder-Samples/tree/master/samples/csharp_dotnetcore/50.teams-messaging-extensions-search)
* Quickstarts for JavaScript
  * [Messaging extension with action-based commands](https://github.com/microsoft/BotBuilder-Samples/tree/master/samples/javascript_nodejs/51.teams-messaging-extensions-action)
  * [Messaging extension with search-based commands](https://github.com/microsoft/BotBuilder-Samples/tree/master/samples/javascript_nodejs/50.teams-messaging-extensions-search)

Learn more about messaging extensions concepts:

* [Understand Teams app capabilities ?](~/concepts/extensibility-points.md)
* [What are messaging extensions?](~/messaging-extensions/what-are-messaging-extensions.md)
