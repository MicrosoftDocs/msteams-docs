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

> [!VIDEO https://www.microsoft.com/en-us/videoplayer/embed/RE4OIvK]
<br>

## Select search command invoke locations

The search command is invoked from any one or both of the following locations:

* Compose message area: The buttons at the bottom of the compose message area.
* Command box: By @mentioning in the command box.

  When search command is invoked from the compose message area, the user sends the results to the conversation. When it's invoked from the command box, the user interacts with the resulting card, or copies it for use elsewhere.

The following image displays the invoke locations of the search command:

:::image type="content" source="~/assets/images/messaging-extension/search-command-invoke-locations.png" alt-text="Search command invoke locations":::

## Add the search command to your app manifest

To add the search command to your app manifest, you must add a new `composeExtension` object to the top level of your app manifest JSON. You can add the search command either with the help of Developer Portal, or manually.

### Create a search command using Developer Portal

The prerequisite to create a search command is that you must already have created a message extension. For information on how to create a message extension, see [create a message extension](~/messaging-extensions/how-to/create-messaging-extension.md).

**To create an action command**

1. Open **Developer Portal** from the Microsoft Teams client and select the **Apps** tab.
1. If you already created your app package in **Developer Portal**, select it from the list. If you haven't created an app package, import an existing one.
1. After importing an app package, select **Message extensions** under **App features**.
1. To create a message extension, you need a Microsoft registered bot. You can either use an existing bot or create a new bot. Select **Create new bot** option, give a name for the new bot, and select **Create**. The following image displays bot creation for message extension:

(image to be added)

1. To use an existing bot, select **Use existing bot** and select **Select from one of my existing bots** to choose the existing bots from the dropdown or select **Enter bot id** if you have a bot id created already.

(image to be added)

1. Select the scope of the messaging extension.

1. Select checkbox if you need to reconfigure the app.

1. Select **Add a command** in the **Command** section to include the commands which decides the behavior of message extension.
The following image displays command addition for message extension:

   :::image type="content" source="../../../assets/images/tdp/add-a-command.PNG" alt-text="Screenshot shwos how to add a command to define the behavior of the message extension.":::

1. Select **Search** and enter **Command ID**, **Command title**,**Command description**.

1. Enter all the parameters and select the type of input from the dropdown.

   :::image type="content" source="../../../assets/images/tdp/add-a-command-parameter.PNG" alt-text="Screenshot shwos how to add a parameters to define your command for message extension.":::

1. Select **Add a domain** under **Preview links**.

1. Enter valid domain and then select **Add**.

   :::image type="content" source="../../../assets/images/tdp/add-domain.PNG" alt-text="Screenshot shwos how to add a valid domain to your messaging extension for link unfurlings.":::

1. Select **Save**.

   :::image type="content" source="../../../assets/images/tdp/add-a-command-save.PNG" alt-text="Screenshot shwos how to aave all your setting and parameters for your message extension.":::

**To add additional parameters**

1. Select ellipse under command section and then select **Edit parameter**.

   :::image type="content" source="../../../assets/images/tdp/edit-parameters.PNG" alt-text="Screenshots shows how to add additional parameters for your message extension.":::

1. Select **+ Add a Parameters** and enter all the parameters.

   :::image type="content" source="../../../assets/images/tdp/add-parameter.PNG" alt-text="Screenshot shows how to add additional parameters for your message extension."lightbox="../../../assets/images/tdp/add-a-parameters.PNG":::

### Create a search command manually

To manually add your message extension search command to your app manifest, you must add the following parameters to your `composeExtension.commands` array of objects:

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
|Teams message extension search   |  Describes how to define search commands and respond to searches.        |[View](https://github.com/microsoft/BotBuilder-Samples/tree/master/samples/csharp_dotnetcore/50.teams-messaging-extensions-search)|[View](https://github.com/microsoft/BotBuilder-Samples/tree/master/samples/javascript_nodejs/50.teams-messaging-extensions-search)|

## Step-by-step guide

Follow the [step-by-step guide](../../../sbs-messagingextension-searchcommand.yml) to build a search based message extension.

## Next step

> [!div class="nextstepaction"]
> [Respond to the search commands](~/messaging-extensions/how-to/search-commands/respond-to-search.md).
