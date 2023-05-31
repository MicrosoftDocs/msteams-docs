---
title: Define message extension action commands
author: surbhigupta
description: Learn to define messaging extension action commands with app manifest example in Microsoft Teams. Sample (.NET, Node.js) how to define action commands, create dialog, and respond to dialog submit action.
ms.localizationpriority: medium
ms.topic: conceptual
ms.author: anclear
---

# Define message extension action commands

[!include[v4-to-v3-SDK-pointer](~/includes/v4-to-v3-pointer-me.md)]

> [!NOTE]
> When a message action is initiated, attachment details aren't sent as part of the `turncontext` invoke activity.

Action commands allow you to present your users with a modal pop-up called a dialog in Teams. The dialog collects or displays information, processes the interaction, and sends the information back to Teams. This document guides you on how to select action command invoke locations, create your dialog, send final message, or card, create action command using app studio, or create it manually.

Before creating the action command, you must decide the following factors:

1. [Where can the action command be triggered from?](#select-action-command-invoke-locations)
1. [How will the dialog be created?](#select-how-to-create-your-dialog)
1. [Will the final message or card be sent to the channel from a bot, or will the message or card be inserted into the compose message area for the user to submit?](#select-how-the-final-message-is-sent)

See the following video to learn how to define message extension action commands:
<br>

> [!VIDEO https://www.microsoft.com/en-us/videoplayer/embed/RE4OANG]
<br>

## Select action command invoke locations

First, you must decide the location from where your action command must be invoked. By specifying the `context` in your app manifest, your command can be invoked from one or more of the following locations:

* Compose message area: The buttons at the bottom of the compose message area.

    Command context = compose

* Command box: By @mentioning your app in the command box.

    Commands context = commandBox

   > [!NOTE]
   > If message extension is invoked from the command box, you cannot respond with a bot message inserted directly into the conversation.

* Message: Directly from an existing message through the `...` overflow menu on a message.

    Commands context = message

    > [!NOTE]
    > The initial invoke to your bot includes a JSON object containing the message from which it was invoked. You can process the message before presenting them with a dialog.

The following image displays the locations from where action command is invoked:

:::image type="content" source="~/assets/images/messaging-extension-invoke-locations.png" alt-text="Action command invoke locations":::

## Select how to create your dialog

In addition to selecting where your command can be invoked from, you must also select how to populate the form in the dialog for your users. You have the following three options for creating the form that is rendered inside the dialog:

* **Static list of parameters**: This is the simplest method. You can define a list of parameters in your app manifest the Teams client renders, but can't control the formatting in this case.
* **Adaptive Card**:  You can select to use an Adaptive Card, which provides greater control over the UI, but still limits you on the available controls and formatting options.
* **Embedded web view**: You can select to embed a custom web view in the dialog to have a complete control over the UI and controls.

If you select to create the dialog with a static list of parameters and when the user submits the dialog, the message extension is called. When using an embedded web view or an Adaptive Card, your message extension must handle an initial invoke event from the user, create the dialog, and return it back to the client.

## Select how the final message is sent

In most cases, the action command results in a card inserted into the compose message box. The user can send it into the channel or chat. In this case, the message comes from the user, and the bot can't edit or update the card further.

If the message extension is invoked from the compose box or directly from a message, your web service can insert the final response directly into the channel or chat. In this case, the Adaptive Card comes from the bot, the bot updates it, and replies to the conversation thread if needed. You must add the `bot` object to the app manifest using  the same ID and defining the appropriate scopes.

## Add the action command to your app manifest

To add the action command to the app manifest, you must add a new `composeExtension` object to the top level of the app manifest JSON. You can use one of the following ways to do so:

* [Create an action command using Developer Portal](#create-an-action-command-using-developer-portal)
* [Create an action command manually](#create-an-action-command-manually)

### Create an action command using Developer Portal

You can create an action command using **Developer Portal**.

> [!NOTE]
> The prerequisite to create an action command is that you have already created a message extension. For information on how to create a message extension, see [create a message extension](~/messaging-extensions/how-to/create-messaging-extension.md).

To create an action command:

1. Open **Developer Portal** from the Microsoft Teams client and select the **Apps** tab.
   If you already created your app package in **Developer Portal**, select from the list. If you haven't created an app package, import an existing one.
1. After importing an app package, select **Message extensions** under **App features**.
1. To create a message extension, you need a Microsoft registered bot. You can either use an existing bot or create a new bot. Select **Create new bot** option, give a name to the new bot, and then select **Create**.

   :::image type="content" source="../../../assets/images/tdp/bot-page.png" alt-text="The screenshot show you how to create a bot in Developer Portal.":::

1. To use an existing bot, select **Select an existing bot** and choose the existing bots from the dropdown list or select **Enter a bot ID** if you have a bot id created already.

1. Select the scope of the bot and **Save**.

1. Select **Add a command** in the **Command** section to include the commands, which decides the behavior of message extension.

   :::image type="content" source="../../../assets/images/tdp/add-a-command.PNG" alt-text="Screenshot shows how to add a command to define the behavior of the message extension.":::

1. Select **Action** and then select parameter type.

1. Enter **Command ID**, **Command title**, and **Command description**.

1. Enter all the parameters and select the type of input from the dropdown list.

   :::image type="content" source="../../../assets/images/tdp/add-a-command-parameter.PNG" alt-text="Screenshot shows how to add a parameters to define your command for message extension.":::

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

### Create an action command manually

To manually add your action-based message extension command to your app manifest, you must add the following parameters to the `composeExtension.commands` array of objects:

| Property name | Purpose | Required? | Minimum manifest version |
|---|---|---|---|
| `id` | This property is an unique ID that you assign to this command. The user request includes this ID. | Yes | 1.0 |
| `title` | This property is a command name. This value appears in the UI. | Yes | 1.0 |
| `type` | This property must be an `action`. | No | 1.4 |
| `fetchTask` | This property is set to `true` for an adaptive card or embedded web view for your dialog, and`false` for a static list of parameters or when loading the web view by a `taskInfo`. | No | 1.4 |
| `context` | This property is an optional array of values that defines where the message extension is invoked from. The possible values are `message`, `compose`, or `commandBox`. The default value is `["compose", "commandBox"]`. | No | 1.5 |

If you're using a static list of parameters, you must also add the following parameters:

| Property name | Purpose | Is required? | Minimum manifest version |
|---|---|---|---|
| `parameters` | This property describes the static list of parameters for the command. Only use when `fetchTask` is `false`. | No | 1.0 |
| `parameter.name` | This property describes the name of the parameter. This is sent to your service in the user request. | Yes | 1.0 |
| `parameter.description` | This property describes the parameter’s purposes or example of the value that should be provided. This value appears in the UI. | Yes | 1.0 |
| `parameter.title` | This property is a short user-friendly parameter title or label. | Yes | 1.0 |
| `parameter.inputType` | This property is set to the type of input required. The possible values include `text`, `textarea`, `number`, `date`, `time`, `toggle`. The default value is set to `text`. | No | 1.4 |

If you're using an embedded web view, you can optionally add the `taskInfo` object to fetch your web view without calling your bot directly. If you select this option, the behavior is similar to that of using a static list of parameters. In that the first interaction with your bot is [responding to the dialog submit action](~/messaging-extensions/how-to/action-commands/respond-to-task-module-submit.md). If you're using a `taskInfo` object, you must set the `fetchTask` parameter to `false`.

| Property name | Purpose | Is required? | Minimum manifest version |
|---|---|---|---|
|`taskInfo`|Specify the dialog to preload when using a message extension command. | No | 1.4 |
|`taskInfo.title`|Initial dialog title. |No | 1.4 |
|`taskInfo.width`|Dialog width, either a number in pixels or default layout such as `large`, `medium`, or `small`. |No | 1.4 |
|`taskInfo.height`|Dialog height, either a number in pixels or default layout such as `large`, `medium`, or `small`.|No | 1.4 |
|`taskInfo.url`|Initial web view URL.|No | 1.4 |

#### App manifest example

This section isn't an example of the complete manifest. For the complete app manifest schema, see [app manifest schema](~/resources/schema/manifest-schema.md). The following is an example of a `composeExtensions` object defining two action commands:

```json
...
"composeExtensions": [
  {
    "botId": "c8fa3cf6-b1f0-4ba8-a5bf-a241bc29adf3",
    "commands": [
      {
        "id": "To do",
        "type": "action",
        "title": "Create To do",
        "description": "Create a To do",
        "initialRun": true,
        "fetchTask": false,
        "context": [
          "commandBox",
          "compose"
        ],
        "parameters": [
          {
            "name": "Name",
            "title": "Title",
            "description": "To do Title",
            "inputType": "text"
          },
          {
            "name": "Description",
            "title": "Description",
            "description": "Description of the task",
            "inputType": "textarea"
          },
          {
            "name": "Date",
            "title": "Date",
            "description": "Due date for the task",
            "inputType": "date"
          }
        ]
      }
    ],
    "canUpdateConfiguration": true,
    "messageHandlers": [
      {
        "type": "link",
        "value": {
          "domains": [
            "yourapp.onmicrosoft.com"
          ]
        }
      }
    ]
  }
]
...
```

## Code sample

| Sample name           | Description | .NET    | Node.js   | Manifest|
|:---------------------|:--------------|:---------|:--------|:--------------|
|Teams message extension action| This sample shows how to define action commands, create dialog, and  respond to dialog submit action. |[View](https://github.com/OfficeDev/Microsoft-Teams-Samples/tree/main/samples/msgext-action/csharp)|[View](https://github.com/OfficeDev/Microsoft-Teams-Samples/tree/main/samples/msgext-action/nodejs) |[View](https://github.com/OfficeDev/Microsoft-Teams-Samples/tree/main/samples/msgext-action/csharp/demo-manifest/msgext-action.zip) |
|Message extension action preview| This sample shows how to use action preview in Messaging Extensions using Bot Framework v4. |[View](https://github.com/OfficeDev/Microsoft-Teams-Samples/tree/main/samples/msgext-action-preview/csharp)|[View](https://github.com/OfficeDev/Microsoft-Teams-Samples/tree/main/samples/msgext-action-preview/nodejs) |[View](https://github.com/OfficeDev/Microsoft-Teams-Samples/tree/main/samples/msgext-action-preview/csharp/demo-manifest/msgext-action-preview.zip) |

## Step-by-step guide

Follow the [step-by-step guide](../../../sbs-meetingextension-action.yml) to build Teams action based message extension.

## Next step

If you're using either an Adaptive Card or an embedded web view without a `taskInfo` object, the next step is to:

> [!div class="nextstepaction"]
> [Create and respond with a dialog](~/messaging-extensions/how-to/action-commands/create-task-module.md)

If you're using the parameters or an embedded web view with a `taskInfo` object, the next step is to:

> [!div class="nextstepaction"]
> [Respond to dialog submit](~/messaging-extensions/how-to/action-commands/respond-to-task-module-submit.md)

## See also

* [Cards](../../../task-modules-and-cards/what-are-cards.md)
* [Dialogs](../../../task-modules-and-cards/what-are-task-modules.md)
* [App manifest schema for Teams](../../../resources/schema/manifest-schema.md)
* [Developer Portal for Teams](../../../concepts/build-and-test/teams-developer-portal.md)
* [Message extensions](../../what-are-messaging-extensions.md)
