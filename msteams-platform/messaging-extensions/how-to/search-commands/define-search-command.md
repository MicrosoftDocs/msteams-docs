---
title: Define messaging extension search commands
author: surbhigupta
description: Learn about messaging extension search commands for Microsoft Teams apps, to create a search command through app manifest and manually using code examples and sample.
ms.topic: conceptual
ms.author: anclear
ms.localizationpriority: none
---
# Define messaging extension search commands

[!include[v4-to-v3-SDK-pointer](~/includes/v4-to-v3-pointer-me.md)]

Messaging extension search commands allow users to search external systems and insert the results of that search into a message in the form of a card. This document guides you on how to select  search command invoke locations, and add the search command to your app manifest.

> [!NOTE]
> The result card size limit is 28 KB. The card is not sent if its size exceeds 28 KB.

## Select search command invoke locations

The search command is invoked from any one or both of the following locations:

* Compose message area: The buttons at the bottom of the compose message area.
* Command box: By @mentioning in the command box.

  When search command is invoked from the compose message area, the user sends the results to the conversation. When it is invoked from the command box, the user interacts with the resulting card, or copies it for use elsewhere.

The following image displays the invoke locations of the search command:

![search command invoke locations](~/assets/images/messaging-extension/search-command-invoke-locations.png)

## Add the search command to your app manifest

To add the search command to your app manifest, you must add a new `composeExtension` object to the top level of your app manifest JSON. You can add the search command either with the help of App Studio, or manually.

### Create a search command using App Studio

The prerequisite to create a search command is that you must already have created a messaging extension. For information on how to create a messaging extension, see [create a messaging extension](~/messaging-extensions/how-to/create-messaging-extension.md).

**To create a search command**

1. Open **App Studio** from the Microsoft Teams client, and select the **Manifest Editor** tab.
1.  If you already created your app package in **App Studio**, select from the list. If you have not created an app package, import an existing one.
1. After importing app package, select **Messaging extensions** under **Capabilities**. You get a pop-up window to set up the messaging extension.
1. Select **Set up** in the window to include the messaging extension in your app experience. The following image displays the messaging extension set up page: 

    <img src="~/assets/images/messaging-extension/messaging-extension-set-up.png" alt="messaging extension set up" width="500"/>

1. To create the messaging extension, you need a Microsoft registered bot. You can either use an existing bot or create a new bot. Select **Create new bot** option, give a name for the new bot, and select **Create**. The following image displays bot creation for messaging extension:

    <img src="~/assets/images/messaging-extension/create-bot-for-messaging-extension.png" alt="create bot for messaging extension" width="500"/>

1. Select **Add** in the **Command section** of the messaging extensions page to include the commands which decides the behaviour of messaging extension.   
The following image displays command addition for messaging extension:

   <img src="~/assets/images/messaging-extension/include-command.png" alt="include command" width="500"/>
1. Select **Allow users to query your service for information and insert that into a message**. The following image displays the search command parameter selection:

    <img src="~/assets/images/messaging-extension/search-command-parameter-selection.png" alt="search command parameter selection" width="500"/>

1. Add a **Command Id** and a **Title**.
1. Select the location from where your search command must be invoked. The following image displays the search command invoke location:

    <img src="~/assets/images/messaging-extension/search-command-invoke-location-selection.png" alt="search command invoke location selection]" width="500"/>

1. Add your search parameter and select **Save**.

### Create a search command manually

To manually add your messaging extension search command to your app manifest, you must add the following parameters to your `composeExtension.commands` array of objects:

| Property name | Purpose | Required? | Minimum manifest version |
|---|---|---|---|
| `id` | This property is an unique ID that you assign to search command. The user request includes this ID. | Yes | 1.0 |
| `title` | This property is a command name. This value appears in the user interface (UI). | Yes | 1.0 |
| `description` | This property is a help text indicating what this command does. This value appears in the UI. | Yes | 1.0 |
| `type` | This property must be a `query`. | No | 1.4 |
|`initialRun` | If this property is set to **true**, it indicates this command should be executed as soon as the user selects this command in the UI. | No | 1.0 |
| `context` | This property is an optional array of values that defines the context the search action is available in. The possible values are `message`, `compose`, or `commandBox`. The default is `["compose", "commandBox"]`. | No | 1.5 |

You must add the details of the search parameter, that defines the text visible to your user in the Teams client.

| Property name | Purpose | Is required? | Minimum manifest version |
|---|---|---|---|
| `parameters` | This property defines a static list of parameters for the command. | No | 1.0 |
| `parameter.name` | This property describes the name of the parameter. This is sent to your service in the user request. | Yes | 1.0 |
| `parameter.description` | This property describes the parameter’s purposes or example of the value that must be provided. This value appears in the UI. | Yes | 1.0 |
| `parameter.title` | This property is a short user-friendly parameter title or label. | Yes | 1.0 |
| `parameter.inputType` | This property is set to the type of the input required. Possible values include `text`, `textarea`, `number`, `date`, `time`, `toggle`. Default is set to `text`. | No | 1.4 |

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

## Code sample

| Sample Name           | Description | .NET    | Node.js   |   
|:---------------------|:--------------|:---------|:--------|
|Teams messaging extension action| Describes how to define action commands, create task module, and  respond to task module submit action. |[View](https://github.com/microsoft/BotBuilder-Samples/tree/master/samples/csharp_dotnetcore/51.teams-messaging-extensions-action)|[View](https://github.com/microsoft/BotBuilder-Samples/tree/master/samples/javascript_nodejs/51.teams-messaging-extensions-action) | 
|Teams messaging extension search   |  Describes how to define search commands and respond to searches.        |[View](https://github.com/microsoft/BotBuilder-Samples/tree/master/samples/csharp_dotnetcore/50.teams-messaging-extensions-search)|[View](https://github.com/microsoft/BotBuilder-Samples/tree/master/samples/javascript_nodejs/50.teams-messaging-extensions-search)|

## Universal actions for search based messaging extensions

Universal actions now bring the enhanced user experience available for adaptive cards to messaging extensions. To enable universal actions for search based messaging extensions, the app should have the [Schema for Universal Actions](/adaptive-cards/authoring-cards/universal-action-model#schema) along with the following requirements:

1. The app should have a conversation bot defined in their app manifest.
1. If you already have a conversational bot, the bot should be the same that is used in your messaging extension.
1. If the card is sent in a group, the users should have group specific permissions to read the card.  Specify `team` and `groupchat` depending on scenarios you plan to support.

**Example**

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
### Automatic Refresh for Adaptive Cards in search based MEs

You can automatically update adaptive cards in messaging extensions to ensure users always see up to date data. To allow an Adaptive Card to automatically refresh, define `userIds` array in either `29:<ID>` or `8:orgid:<AAD ID>` format in the `refresh` property.

**Example**

```json
    {
        "type": "AdaptiveCard",
        "refresh": {
            "userIds": [
                "<8:orgId:<AADID>>",
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
Automatic refresh is enabled for all users in the group chat/channel with size <=60. For conversations (group chat/channel) of size more than 60, you can provide a manual refresh button or use the refresh button in the message options menu to get the latest result.
 
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

### Just-in Time (JIT) Install

When a user selects a card and sends it in a group chat/channel, a **Just-in Time (JIT)** Installation prompt appears. After the users selects send, the card goes into a sending state and performs installation in the background for all the users in the group.

>[!NOTE]
> For apps that don’t have `action. Execute` and `refresh` schema defined, the install prompt will not be shown to the users.

The following example shows a dynamic scenario for JIT install:

1. The users selects a card.

    :::image type="content" source="../../../assets/images/messaging-extension/universal-actions-jit-post-card.jpg" alt-text="user selects card":::

1. The card is posted in to the compose box and a JIT Installation prompt is shown to the user.

    :::image type="content" source="../../../assets/images/messaging-extension/universal-actions-jit-install-prompt.jpg" alt-text="app shows installation prompt":::

1. After the user selects send, the bot installs the card in the background and sends it to the users after the installation in complete.

    :::image type="content" source="../../../assets/images/messaging-extension/universal-actions-jit-sent.jpg" alt-text="card is sent to users":::

## Next step

> [!div class="nextstepaction"]
> [Respond to the search commands](~/messaging-extensions/how-to/search-commands/respond-to-search.md).