---
title: Define message extension search commands
author: surbhigupta
description: In this module, learn about message extension search commands for Teams apps, to create a search command through app manifest and manually.
ms.topic: conceptual
ms.author: anclear
ms.localizationpriority: medium
---
# Define message extension search commands

[!include[v4-to-v3-SDK-pointer](~/includes/v4-to-v3-pointer-me.md)]

Message extension search commands allow users to search external systems and insert the results of that search into a message in the form of a card. This document guides you on how to select  search command invoke locations, and add the search command to your app manifest.

> [!NOTE]
> The result card size limit is 28 KB. The card is not sent if its size exceeds 28 KB.

See the following video to learn how to define message extension search commands:
<br>

> [!VIDEO <https://www.microsoft.com/en-us/videoplayer/embed/RE4OIvK>]
<br>

## Select search command invoke locations

The search command is invoked from any one or both of the following locations:

* Compose message area: The buttons at the bottom of the compose message area.
* Command box: By @mentioning in the command box.

  When a search command is invoked from the compose message area, the user sends the results to the conversation. When it's invoked from the command box, the user interacts with the resulting card, or copies it for use elsewhere.

The following image displays the invoke locations of the search command:

:::image type="content" source="~/assets/images/messaging-extension/search-command-invoke-locations.png" alt-text="Search command invoke locations":::

## Add the search command to your app manifest

To add the search command to your app manifest, you must add a new `composeExtension` object to the top level of your app manifest JSON. You can add the search command either with the help of Developer Portal, or manually.

### Create a search command using Developer Portal

The prerequisite to create a search command is that you must already have created a message extension. For information on how to create a message extension, see [create a message extension](~/messaging-extensions/how-to/create-messaging-extension.md).

**To create an action command**

1. Open **Developer Portal** from the Microsoft Teams client and select the **Apps** tab.
   If you already created your app package in **Developer Portal**, select from the list. If you haven't created an app package, import an existing one.
1. After importing an app package, select **Message extensions** under **App features**.
1. To create a message extension, you need a Microsoft registered bot. You can either use an existing bot or create a new bot. Select **Create new bot** option, give a name to the new bot, and then select **Create**.

   :::image type="content" source="../../../assets/images/tdp/bot-page.png" alt-text="The screenshot show you how to create a bot in Developer Portal.":::

1. To use an existing bot, select **Select an existing bot** and choose the existing bots from the dropdown list, or select **Enter a bot ID** if you have a bot ID created already.

1. Select the scope of the messaging extension and select **Save**.

1. Select **Add a command** in the **Command** section to include the commands, which decide the behavior of message extension.
The following image displays command addition for message extension:

   :::image type="content" source="../../../assets/images/tdp/add-a-command.PNG" alt-text="The screenshot shows how to add a command to define the behavior of the message extension.":::

1. Select **Search** and enter **Command ID**, **Command title**, and **Command description**.

1. Enter all the parameters and select the type of input from the dropdown list.

   :::image type="content" source="../../../assets/images/tdp/add-a-command-parameter.PNG" alt-text="The screenshot shows how to add a parameter to define your command for message extension.":::

1. Select **Add a domain** under **Preview links**.

1. Enter valid domain and then select **Add**.

   :::image type="content" source="../../../assets/images/tdp/add-domain.PNG" alt-text="Screenshot shows how to add a valid domain to your messaging extension for link unfurlings.":::

1. Select **Save**.

   :::image type="content" source="../../../assets/images/tdp/add-a-command-save.PNG" alt-text="Screenshot shows how to save all your setting and parameters for your message extension.":::

**To add additional parameters**

1. Select ellipse under command section and then select **Edit parameter**.

   :::image type="content" source="../../../assets/images/tdp/edit-parameters.PNG" alt-text="Screenshots shows how to add additional parameters for your message extension.":::

1. Select **Add a Parameters** and enter all the parameters.

   :::image type="content" source="../../../assets/images/tdp/add-parameter.PNG" alt-text="Screenshot shows how to add additional parameters for your message extension."lightbox="../../../assets/images/tdp/add-a-parameters.PNG":::

### Create a search command manually

To manually add your message extension search command to your app manifest, you must add the following parameters to your `composeExtension.commands` array of objects:

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

For the complete app manifest, see [App manifest schema](~/resources/schema/manifest-schema.md).

## Universal Actions for search based messaging extensions

Adaptive Cards in search based messaging extensions now support Universal Actions. To enable Universal Actions for search based messaging extensions, the app must conform to the [Schema for Universal Actions for Adaptive Cards](../../../task-modules-and-cards/cards/Universal-actions-for-adaptive-cards/Work-with-Universal-Actions-for-Adaptive-Cards.md#schema-for-universal-actions-for-adaptive-cards) along with the following requirements:

1. The app must have a conversation bot defined in the app manifest.
1. If you already have a conversational bot, you must use the same bot that is used in your messaging extension.
1. If the card is sent in a group, the app must specify `team` or `groupchat` scope on their bot in the manifest.

The following is an example of a JSON schema with `team` and `groupchat`values:

```json
{
    "$schema": "https://developer.microsoft.com/json-schemas/teams/v1.11/MicrosoftTeams.schema.json",
    "manifestVersion": "1.11",
    "version": "1.0.0",
    "id": "%MICROSOFT-APP-ID%",
    "packageName": "com.example.myapp",
    "bots": [
        {
            "botId": "%MICROSOFT-APP-ID-REGISTERED-WITH-BOT-FRAMEWORK%",
            "scopes": [
                    "team",
                    "personal",
                    "groupchat"
                ]
        }
    ],
    "composeExtensions": [
        {
            "canUpdateConfiguration": true,
            "botId": "%MICROSOFT-APP-ID-REGISTERED-WITH-BOT-FRAMEWORK%", // Use the same bot as what is specified in the bots section above
        }
    ]
}
```

### Automatic refresh for Adaptive Cards in search based MEs

Enable automatic refresh for Adaptive Cards in search based messaging extensions to ensure users always see the latest information. To enable, define `userIds` array either in  `29:<ID>` or `8:orgid:<AAD ID>` format in the `refresh` property. For more information, see [Work with Universal Actions for Adaptive Cards](../../../task-modules-and-cards/cards/Universal-actions-for-adaptive-cards/Work-with-Universal-Actions-for-Adaptive-Cards.md#user-ids-in-refresh).

The following is an example of `userIds` array in the `refresh` property:

```json
    {
        "type": "AdaptiveCard",
        "refresh": {
            "userIds": [
                "8:orgid:<AADID>",
                "29:<id>"
            ],
            "action": {
                "type": "Action.Execute",
                "data": {}
            }
        },
        "body": [
            {
                "type": "TextBlock",
                "text": "Hello World!",
                "wrap": true
            }
        ],
        "actions": [
            {
                "type": "Action.Execute",
                "data": {},
                "title": "Hello"
            }
        ]
    }
```

> [!NOTE]
> Automatic refresh is enabled for all users in the group chat or channel with *less than or equal to* 60 users. For conversations (group chat or channel) with more than 60 users, users can use the refresh button in the message options menu to get the latest result.

The following is an example of `Action.Execute` in the `refresh` property:

```json
    {
        "type": "AdaptiveCard",
        "refresh": {
            "action": {
                "type": "Action.Execute",
                "data": {}
            }
        },
        "body": [
            {
                "type": "TextBlock",
                "text": "Hello World!",
                "wrap": true
            }
        ],
        "actions": [
            {
                "type": "Action.Execute",
                "data": {},
                "title": "Hello"
            }
        ]
    }
```

### Just-in-time install

Just-in-time (JIT) allows you to install a card or messaging extension for multiple users in a group chat or channel. In order to support Universal Actions in search based Message extensions, your bot is added to the conversation where the card (with `Action.Execute`) is sent by the user.

When a user selects a card and sends it in a group chat or channel, a **JIT** installation prompt appears. After the user selects the **send** option, the app is added for all the users in the chat or channel in the background.

> [!NOTE]
> For apps that don’t have `Action.Execute` and `refresh` schema defined, the install prompt isn't shown to the users.

The following is an example of a dynamic ME and JIT install user flow:

  :::image type="content" source="../../../assets/videos/dynamic-me-jit-flow.gif" alt-text="Dynamic ME JIT flow":::

## Code sample

| Sample Name           | Description | .NET    | Node.js   |
|:---------------------|:--------------|:---------|:--------|
|Teams message extension search   |  Describes how to define search commands and respond to searches.        |[View](https://github.com/microsoft/BotBuilder-Samples/tree/master/samples/csharp_dotnetcore/50.teams-messaging-extensions-search)|[View](https://github.com/microsoft/BotBuilder-Samples/tree/master/samples/javascript_nodejs/50.teams-messaging-extensions-search)|

## Step-by-step guide

Follow the [step-by-step guide](../../../sbs-messagingextension-searchcommand.yml) to build a search based message extension.

## Next step

> [!div class="nextstepaction"]
> [Respond to the search commands](~/messaging-extensions/how-to/search-commands/respond-to-search.md).
