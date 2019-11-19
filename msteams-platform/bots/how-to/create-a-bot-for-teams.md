---
title: Create a bot for Microsoft Teams
author: clearab
description: How to create a bot for Microsoft Teams.
ms.topic: conceptual
ms.author: anclear
---
# Create a bot for Microsoft Teams

You'll need to complete the following steps to create a conversational bot.

1. Prepare your development environment.
1. Create your web service.
1. Register your web service as a bot with the Bot Framework.
1. Create your app manifest, and your app package
1. Upload your package to Microsoft Teams

Creating your web service, creating your app package, and registering your web service with the Bot Framework can be done in any order. Because those three pieces are so intertwined, no matter which order you do them in you'll need return to update the others. Your registration needs the messaging endpoint from your deployed web service, and your web service needs the ID and password created from your registration. You app manifest also needs that Id to connect Teams to your web service.

As you're building your messaging extension, you'll regularly be moving between changing your app manifest, and deploying code to your web service. When working with the app manifest, keep in mind that you can either manually manipulate the JSON file, or make changes through App Studio. Either way, you'll need to re-deploy (upload) your app in Teams when you make a change to the manifest, but there's no need to do so when you deploy changes to your web service.

See the [Bot Framework Documentation](/azure/bot-service/) for additional information on the Bot Framework.

[!include[prepare environment](~/includes/prepare-environment.md)]

## Create your web service

The heart of your bot is your web service. It will define a single route, typically `/api/messages`, to receive all requests on. If you're getting started from scratch, you have a few options to choose from.

* Use one of our quickstarts in either [C#](https://github.com/microsoft/BotBuilder-Samples/tree/master/samples/csharp_dotnetcore/57.teams-conversation-bot) or [JavaScript](https://github.com/microsoft/BotBuilder-Samples/tree/master/samples/javascript_nodejs/57.teams-conversation-bot) that will guide you through the creation of your web service.
* Start with the Teams conversation bot sample in either [C#/dotnet](https://github.com/microsoft/BotBuilder-Samples/tree/master/samples/csharp_dotnetcore/57.teams-conversation-bot) or [JavaScript](https://github.com/microsoft/BotBuilder-Samples/tree/master/samples/javascript_nodejs/57.teams-conversation-bot).
* If you're using JavaScript, use the [Yeoman generator for Microsoft Teams](https://github.com/OfficeDev/generator-teams) to scaffold your Teams app, including your web service.
* Create your web service from scratch. You can choose to add the Bot Framework SDK for your language, or you can work directly with the JSON payloads.

## Register your web service with the Bot Framework

> [!Important]
> When registering your web service, be sure to set the **Display name** to the same name you use for your **Short name** in your app manifest. When your app is distributed by either direct uploading or through the organizational app catalog messages sent to a conversation by your bot will use the registration's **Display name** rather than the app's **Short name**.

Registering your web service with the Bot Framework provides a secure communication channel between the Teams client and your web service. The Teams client and your web service never communicate directly. Instead, messages are routed through the Bot Framework Service (Microsoft Teams uses a separate instance of this service that is compliant with the Office 365 standards).

You have two options when registering your web service with the Bot Framework. You can use either [App Studio](#using-app-studio) or the [legacy portal](#in-the-legacy-portal) to register your bot without using an Azure subscription. Or, if you already have an Azure subscription (or don't mind creating one), you can use [the Azure portal](#with-an-azure-subscription) to register your web service.

### Without an Azure subscription

If you do not wish to create your bot registration in Azure, you **must** use either this link - https://dev.botframework.com/bots/new, or App Studio. If you click on the *Create a bot* button in the Bot Framework portal, you will create your bot registration in Microsoft Azure, and will need to provide an Azure subscription. To manage your registration or migrate it to an Azure subscription after creation go to: https://dev.botframework.com/bots.

When you edit the properties of an existing registration that is not registered in Azure, such as its "messaging endpoint," you will see "Migration status" column and a blue "Migrate" button that will take you into the Microsoft Azure portal. Don't click on the "Migrate" button unless that's what you want to do; instead, click on the name of the bot and you can edit its properties:

   ![Edit Bot Properties](~/assets/images/bots/bf-migrate-bot-to-azure.png)

Scenarios when you **must** have your bot registration in Azure (either by creating it in the Azure portal or migrating):

* You want to use the Bot Framework's [OAuthPrompt](~/bots/how-to/authentication/auth-flow-bot.md) for authentication.
* You want to enable additional channels like webchat, Direct Line, or Skype.

#### Using App Studio

*App Studio* is an app in Teams that helps with registering your web service as a bot, and creating an app package that references your bot. It also contains a React control library and configurable samples for cards. See [Getting started with Teams App Studio](~/concepts/build-and-test/app-studio-overview.md).

Remember, if you use App Studio to register your web service you'll need to go to https://dev.botframework.com/bots to manage your registration. Some settings (like your messaging endpoint) can be updated in App Studio as well.

#### In the legacy portal

Create your bot registration using this link: https://dev.botframework.com/bots/new. **Be sure to add Microsoft Teams as a channel from the featured channels list after creating your bot.** Feel free to re-use any Microsoft App ID you generated if you've already created your app package/manifest.

   ![Bot Framework registration page](~/assets/images/bots/bfregister.png)

### With an Azure subscription

You can also register your web service by creating a Bot Channels Registration resource in the Azure portal.

[!INCLUDE [bot channels registration steps](~/includes/bots/azure-bot-channels-registration.md)]

The Bot Framework portal is optimized for registering bots in Microsoft Azure. Here are some things to know:

* The Microsoft Teams channel for bots registered on Azure is **free**. Messages sent over the Teams channel will NOT count towards the consumed messages for the bot.
* If you register your bot using Microsoft Azure, your bot code does not need to be *hosted* on Microsoft Azure.
* If you do register a bot using Microsoft Azure portal, you must have a Microsoft Azure account. You can [create one for free](https://azure.microsoft.com/free/). To verify your identity when you create one, you must provide a credit card, but it won't be charged; it's always free to create and use bots with Microsoft Teams.

## Create your app manifest and package

Your [app manifest](~/resources/schema/manifest-schema.md) defines the metadata for your app, the extensibility points your app use, and pointers to your web services. You can either use App Studio to help you create your app manifest, or create it manually.

### Using App Studio

1. In the Teams client, open App Studio from the **...** overflow menu on the left navigation rail. If it isn't already installed, you can do so by searching for it.
2. On the **Manifest editor** tab select **Create a new app** (or if you're adding a bot to an existing app, you can import your app package)
3. Add your app details (see [manifest schema definition](~/resources/schema/manifest-schema.md) for full descriptions of each field).
4. On the **Bots** tab click the **Setup** button.
5. You can either create a new web service registration (bot), or if you've already registered one select/add it here.
6. Select the capabilities and scopes your bot will need.
7. If necessary, update your bot endpoint address to point to your bot. It should look something like `https://someplace.com/api/messages`.
8. Optionally, add [bot commands](~/bots/how-to/create-a-bot-commands-menu.md).
9. Optionally, you can download your completed app package from the **Test and distribute** tab.

### Create it manually

As with messaging extensions and tabs, you update the [app-manifest](~/resources/schema/manifest-schema.md) define your bot. Add new top-level JSON structure in your app manifest with the `bots` property.

|Name| Type| Maximum size | Required | Description|
|---|---|---|---|---|
|`botId`|String|64 characters|✔|The unique Microsoft app ID for the bot as registered with the Bot Framework. This may well be the same as the overall app ID.|
|`needsChannelSelector`|Boolean|||Describes whether or not the bot utilizes a user hint to add the bot to a specific channel. Default: `false`|
|`isNotificationOnly`|Boolean|||Indicates whether a bot is a one-way, notification-only bot, as opposed to a conversational bot. Default: `false`|
|`supportsFiles`|Boolean|||Indicates whether the bot supports the ability to upload/download files in personal chat. Default: `false`|
|`scopes`|Array of enum|3|✔|Specifies whether the bot offers an experience in the context of a channel in a `team`, in a group chat (`groupchat`), or an experience scoped to an individual user alone (`personal`). These options are non-exclusive.|

Optionally, you can define one or more list of commands that your bot can recommend to users. The object is an array (maximum of 2 elements) with all elements of type `object`; you must define a separate command list for each scope that your bot supports. See [Bot menus](~/bots/how-to/create-a-bot-commands-menu.md) for more information.

|Name| Type| Maximum size | Required | Description|
|---|---|---|---|---|
|`items.scopes`|array of enum|3|✔|Specifies the scope for which the command list is valid. Options are `team`, `personal`, and `groupchat`.|
|`items.commands`|array of objects|10|✔|An array of commands the bot supports:<br>`title`: the bot command name (string, 32)<br>`description`: a simple description or example of the command syntax and its argument (string, 128)|

#### Simple manifest example

The example below is a simple bot object, with two command lists defined. This is not the entire app manifest file, just the part specific to messaging extensions.

```json
...
  "bots": [
    {
      "botId": "%MICROSOFT-APP-ID-REGISTERED-WITH-BOT-FRAMEWORK%",
      "needsChannelSelector": false,
      "isNotificationOnly": false,
      "scopes": [ "team", "personal", "groupchat" ],
      "supportsFiles": true,
      "commandLists": [
        {
          "scopes": [ "team", "groupchat" ],
          "commands": [
            {
              "title": "Command 1",
              "description": "Description of Command 1"
            },
            {
              "title": "Command N",
              "description": "Description of Command N"
            }
          ]
        },
        {
          "scopes": [ "personal", "groupchat" ],
          "commands": [
            {
              "title": "Personal command 1",
              "description": "Description of Personal command 1"
            },
            {
              "title": "Personal command N",
              "description": "Description of Personal command N"
            }
          ]
        }
      ]
    }
  ],
...
```

#### Create your app package manually

To create an app package, you need to add your app manifest and (optionally) your app icons to a .zip archive file. See [Create your app package](~/concepts/build-and-test/apps-package.md) for complete details.

## Upload your package to Microsoft Teams

If you've been using App Studio, you can install your app from the **Test and distribute** tab of the **Manifest editor**. Alternatively, you can install your app package by clicking the `...` overflow menu from the left navigation rail, clicking **More apps**, then the **Upload a custom app** link. You can also import an app manifest or app package into App Studio to make additional updates before uploading.

## Next steps

* [Bot conversation basics](~/bots/how-to/conversations/conversation-basics.md)
* [Subscribe to conversation events](~/bots/how-to/conversations/subscribe-to-conversation-events.md)
