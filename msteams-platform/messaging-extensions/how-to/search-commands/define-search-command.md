---
title: Define message extension search commands
author: surbhigupta
description: Learn about message extension search commands for Teams apps, to create a search command through app manifest and manually.
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

When a search command is invoked from the compose message area, the user sends the results to the conversation. When it's invoked from the command box, the user interacts with the resulting card, or copies it for use elsewhere.

The following image displays the invoke locations of the search command:

:::image type="content" source="~/assets/images/messaging-extension/search-command-invoke-locations.png" alt-text="Screenshot shows the invoke locations of a search command in a Teams channel.":::

## Add the search command to your app manifest

To add the search command to your app manifest, you must add a new `composeExtension` object to the top level of your app manifest JSON. You can add the search command either with the help of Developer Portal, or manually.

### Create a search command using Developer Portal

The prerequisite to create a search command is that you must already have created a message extension. For information on how to create a message extension, see [create a message extension](../../../sbs-gs-msgext.yml).

**To create an action command**

1. Open **Developer Portal** from the Microsoft Teams client and select the **Apps** tab.
   If you already created your app package in **Developer Portal**, select from the list. If you haven't created an app package, import an existing one.
1. After importing an app package, select **Message extensions** under **App features**.
1. To create a message extension, you need a Microsoft registered bot. You can either use an existing bot or create a new bot. Select **Create new bot** option, give a name to the new bot, and then select **Create**.

   :::image type="content" source="../../../assets/images/tdp/bot-page.png" alt-text="Screenshot shows the options to configure a bot for an app in Teams Developer Portal.":::

1. To use an existing bot, select **Select an existing bot** and choose the existing bots from the dropdown list, or select **Enter a bot ID** if you have a bot ID created already.

1. Select the scope of the messaging extension and select **Save**.

1. Select **Add a command** in the **Command** section to include the commands, which decide the behavior of message extension.
The following image displays command addition for message extension:

   :::image type="content" source="../../../assets/images/tdp/add-a-command.PNG" alt-text="Screenshot shows how to add a command in Teams Developer Portal to define the behavior of the message extension.":::

1. Select **Search** and enter **Command ID**, **Command title**, and **Command description**.

1. Enter all the parameters and select the type of input from the dropdown list.

   :::image type="content" source="../../../assets/images/tdp/add-a-command-parameter.PNG" alt-text="Screenshot shows how to add a parameter to define your command in Teams Developer Portal for a message extension.":::

1. Select **Add a domain** under **Preview links**.

1. Enter valid domain and then select **Add**.

   :::image type="content" source="../../../assets/images/tdp/add-domain.PNG" alt-text="Screenshot shows how to add a valid domain to your messaging extension for link unfurling.":::

1. Select **Save**.

   :::image type="content" source="../../../assets/images/tdp/add-a-command-save.PNG" alt-text="Screenshot shows how to save all your setting and parameters for your message extension.":::

**To add additional parameters**

1. Select ellipse under command section and then select **Edit parameter**.

   :::image type="content" source="../../../assets/images/tdp/edit-parameters.PNG" alt-text="Screenshots shows how to edit parameters for your message extension.":::

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

## Code sample

| Sample name           | Description | .NET    | Node.js   | Manifest|
|:---------------------|:--------------|:---------|:--------|:--------------|
|Teams message extension search   |  This sample shows how to build a Search-based Message Extension. It searches nudget packages and displays the results in search based messaging extension.        |[View](https://github.com/OfficeDev/Microsoft-Teams-Samples/tree/main/samples/msgext-search/csharp)|[View](https://github.com/OfficeDev/Microsoft-Teams-Samples/tree/main/samples/msgext-search/nodejs)|[View](https://github.com/OfficeDev/Microsoft-Teams-Samples/tree/main/samples/msgext-search/csharp/demo-manifest/msgext-search.zip)

## Step-by-step guide

Follow the [step-by-step guide](../../../sbs-messagingextension-searchcommand.yml) to build a search based message extension.

## Next step

> [!div class="nextstepaction"]
> [Respond to the search commands](~/messaging-extensions/how-to/search-commands/respond-to-search.md).

## See also

* [Cards](../../../task-modules-and-cards/what-are-cards.md)
* [Task modules](../../../task-modules-and-cards/what-are-task-modules.md)
* [App manifest schema for Teams](../../../resources/schema/manifest-schema.md)
* [Developer Portal for Teams](../../../concepts/build-and-test/teams-developer-portal.md)
* [Message extensions](../../what-are-messaging-extensions.md)
