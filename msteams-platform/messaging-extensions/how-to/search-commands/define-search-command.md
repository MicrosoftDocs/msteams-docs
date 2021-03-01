---
title: Define messaging extension search commands
author: clearab
description: Define messaging extension search commands for Microsoft Teams apps.
ms.topic: conceptual
ms.author: anclear
---
# Define messaging extension search commands

[!include[v4-to-v3-SDK-pointer](~/includes/v4-to-v3-pointer-me.md)]

Messaging extension search commands allow your users to search external systems and insert the results of that search into a message in the form of a card.

[!NOTE]
> Result card size limit is 28KB, beyond the limit, message is not sent.  

## Choose messaging extension invoke locations

The search command is invoked from any one or both of the following locations:

* The buttons at the bottom of the compose message area
* By @mentioning in the command box

When invoked from the compose message area, the user sends the results to the conversation. When invoked from the command box, the user interacts with the resulting card, or copy it for use elsewhere.

## Add the command to your app manifest

To add the search command to your app manifest, you must add a new `composeExtension` object to the top level of your app manifest JSON. You can either do so with the help of App Studio, or manually.

### Create a command using App Studio

Follow the succeeding steps to create a command after [creating a messaging extension](~/messaging-extensions/how-to/create-messaging-extension.md).

1. From the Microsoft Teams client, open **App Studio** and select the **Manifest Editor** tab.
1. If you have already created your app package in App Studio, choose it from the list. If not, you can import an existing app package.
1. Select the **Add** button in the Command section.
1. Choose **Allow users to query your service for information and insert that into a message**.
1. Add a **Command ID** and a **Title**.
1. Select where you want your search command to be triggered from. Selecting **message** does not currently alter the behavior of your search command.
1. Add your search parameter.
1. Select **Save**.

### Create a command manually 

To manually add your messaging extension search command to your app manifest, you must add the following parameters to your `composeExtension.commands` array of objects.

| Property name | Purpose | Required? | Minimum manifest version |
|---|---|---|---|
| `id` | Unique ID that you assign to this command. The user request includes this ID. | Yes | 1.0 |
| `title` | Command name. This value appears in the UI. | Yes | 1.0 |
| `description` | Help text indicating what this command does. This value appears in the UI. | Yes | 1.0 |
| `type` | Must be `query` | No | 1.4 |
|`initialRun` | If set to **true**, indicates this command should be executed as soon as the user chooses this command in the UI. | No | 1.0 |
| `context` | Optional array of values that defines the context the search action is available in. Possible values are `message`, `compose`, or `commandBox`. Default is `["compose", "commandBox"]`. | No | 1.5 |

You must add the details of the search parameter, which defines the text visible to your user in the Teams client.

| Property name | Purpose | Required? | Minimum manifest version |
|---|---|---|---|
| `parameters` | Static list of parameters for the command. | No | 1.0 |
| `parameter.name` | The name of the parameter. This is sent to your service in the user request. | Yes | 1.0 |
| `parameter.description` | Describes this parameter’s purposes or example of the value that should be provided. This value appears in the UI. | Yes | 1.0 |
| `parameter.title` | Short user-friendly parameter title or label. | Yes | 1.0 |
| `parameter.inputType` | Set to the type of input required. Possible values include `text`, `textarea`, `number`, `date`, `time`, `toggle`. Default is set to `text` | No | 1.4 |

#### App manifest example

Following is an example of a `composeExtensions` object defining a search command. It is an example of the simple manifest. For the complete  app manifest schema, see [App manifest schema](~/resources/schema/manifest-schema.md).

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

## Next step

> [!div class="nextstepaction"]
> [handle the search request](~/messaging-extensions/how-to/search-commands/respond-to-search.md).

[!include[messaging-extension-learn-more](~/includes/messaging-extensions/learn-more.md)]
