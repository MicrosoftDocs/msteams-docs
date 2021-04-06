---
title: Define messaging extension action commands
author: clearab
description: An overview of messaging extension action commands
ms.topic: conceptual
ms.author: anclear
---
# Define messaging extension action commands

[!include[v4-to-v3-SDK-pointer](~/includes/v4-to-v3-pointer-me.md)]

Use action commands to present the users with a modal popup called a task module in Teams. The task module collects or displays information, then processes the interaction and sends the information back to Teams. This documents guides you on how to select action command invoke locations, create your task module, send final message or card, create action command using app studio, and create manually. 

Before creating the action command you must decide the following factors:

1. [Choose action command invoke locations](#choose-action-command-invoke-locations)
1. [Choose how to create your task module](#choose-how-to-create-your-task-module)
1. [Choose how to send final message or card](#choose-how-the-final-message-is-sent)

## Choose action command invoke locations

Specify the `context` in your app manifest, the action command is invoked from one or more of the following locations:

* The buttons at the bottom of the compose message area.
* By @mentioning your app in the command box. 
   > [!NOTE]
   > If messaging extension is invoked from the command box, you cannot respond with a bot message inserted directly into the conversation.

* Directly from an existing message through the overflow menu on a message. 
    > [!NOTE] 
    > The initial invoke to your bot includes a JSON object containing the message from which it was invoked. You can process the message before presenting them with a task module.

The following image displays the locations from where messaging extensions are invoked:
<img src="~/assets/images/messaging-extension/messaging-extension-invoke-locations.png" alt="messaging extension invoke locations" width="400"/>

## Choose how to create your task module

Choose how to populate the form in the task module for the users. Following are the ways to create the form that is rendered inside the task module:

* **Static list of parameters**: This is the simplest method. You can define a list of parameters in your app manifest the Teams client renders, but cannot control the formatting in this case.
* **Adaptive Card**:  You can choose to use an Adaptive Card, which provides greater control over the UI, but still limits you on the available controls and formatting options.
* **Embedded web view**: You can choose to embed a custom web view in the task module to have a complete control over the UI and controls. 

If you create the task module with a static list of parameters and submit, the messaging extension is called. When using an embedded web view or an Adaptive Card, your messaging extension must handle an initial invoke event from the user, create the task module, and return it back to the client.

## Choose how the final message is sent

In most cases, the action command results in a card inserted into the compose message box. The user can send it into the channel or chat. In this case, the message comes from the user, and the bot cannot edit or update the card further.

If the messaging extension is invoked from the compose box or directly from a message, your web service can insert the final response directly into the channel or chat. In this case, the Adaptive Card comes from the bot, the bot updates it, and replies to the conversation thread if needed. You must add the `bot` object to the app manifest using  the same ID and defining the appropriate scopes.

## Add the action command to your app manifest

To add the action command to the app manifest, you must add a new `composeExtension` object to the top level of the app manifest JSON. You can either add with the help of App Studio, or manually.

### Create an action command using App Studio

The prerequisite to create an action command is that you must already create a messaging extension. For information on how to create a messaging extension, see [create a messaging extension](~/messaging-extensions/how-to/create-messaging-extension.md).

**To create an action command**

1. Open **App Studio** from the Microsoft Teams client, and select the **Manifest Editor** tab.
1. If you already created your app package in **App Studio**, choose it from the list. If you have not created an app package, import an existing one.
1. After importing an app package, select **Messaging extensions** under **Capabilities**. You get a pop-up window to set up the messaging extension.
1. Select **Set up** in the window to include the messaging extension in your app experience. The following image displays the messaging extension set up window:

    <img src="~/assets/images/messaging-extension/messaging-extension-set-up.png" alt="messaging extension set up" width="400"/>
    
1. To create a messaging extension, you need a Microsoft registered bot. You can either use an existing bot or create a new bot. Select **Create new bot** option, give a name for the new bot, and select **Create**. The following image displays bot creation for messaging extension:

    <img src="~/assets/images/messaging-extension/create-bot-for-messaging-extension.png" alt="create bot for messaging extension" width="400"/>

1. Select **Add** in the **Command section** of the messaging extensions page.
1. Choose **Allow users to trigger actions in external services while inside of Teams**. The following image displays the action command selection:

    <img src="~/assets/images/messaging-extension/action-command-selection.png" alt="action command selection" width="400"/>
    
1. To use a static set of parameters to create your task module, select **Define a set of static parameters for the command**. 

    The following image displays the action command static parameter selection:

   <img src="~/assets/images/messaging-extension/action-command-static-parameter-selection.png" alt="action command static parameter selection" width="400"/> 
   
   
    The following image displays an example static parameter set-up: 

   <img src="~/assets/images/messaging-extension/setting-up-of-static-parameter.png" alt="action command static parameter set-up" width="400"/>

    The following image displays an example static parameter testing:

   <img src="~/assets/images/messaging-extension/static-parameter-testing.png" alt="action command static parameter testing" width="400"/>

1. To use dynamic parameters, choose to **Fetch a dynamic set of parameters from your bot**. The following image displays the action command parameter selection:

    <img src="~/assets/images/messaging-extension/action-command-dynamic-parameter-selection.png" alt="action command dynamic parameter selection" width="400"/>
    
1. Add a **Command Id** and a **Title**.
1. Select the location from where you want to invoke the action command. The following image displays the action command invoke location:

    <img src="~/assets/images/messaging-extension/action-command-invoke-location.png" alt="action command invoke location" width="400"/>

1. Select **Save**.
1. To add more parameters, select the **Add** button in the **Parameters** section.

### Create an action command manually

To manually add your action-based messaging extension command to your app manifest, you must add the following parameters to the `composeExtension.commands` array of objects:

| Property name | Purpose | Required? | Minimum manifest version |
|---|---|---|---|
| `id` | This property is an unique ID that you assign to this command. The user request includes this ID. | Yes | 1.0 |
| `title` | This property is a command name. This value appears in the UI. | Yes | 1.0 |
| `type` | This property must be an `action` | No | 1.4 |
| `fetchTask` | This property is set to `true` for an adaptive card or embedded web view for your task module, and`false` for a static list of parameters or when loading the web view by a `taskInfo` | No | 1.4 |
| `context` | This property is an optional array of values that defines where the messaging extension is invoked from. The possible values are `message`, `compose`, or `commandBox`. The default value is `["compose", "commandBox"]`. | No | 1.5 |

If you are using a static list of parameters, you must also add the following parameters:

| Property name | Purpose | Is required? | Minimum manifest version |
|---|---|---|---|
| `parameters` | This property describes the static list of parameters for the command. Only use when `fetchTask` is `false` | No | 1.0 |
| `parameter.name` | This property describes the name of the parameter. This is sent to your service in the user request. | Yes | 1.0 |
| `parameter.description` | This property describes the parameter’s purposes or example of the value that should be provided. This value appears in the UI. | Yes | 1.0 |
| `parameter.title` | This property is a short user-friendly parameter title or label. | Yes | 1.0 |
| `parameter.inputType` | This property is set to the type of input required. The possible values include `text`, `textarea`, `number`, `date`, `time`, `toggle`. The default value is set to `text` | No | 1.4 |

If you are using an embedded web view, you can optionally add the `taskInfo` object to fetch your web view without calling your bot directly. If you choose to use this option, the behavior is similar to that of using a static list of parameters. In that the first interaction with your bot is [responding to the task module submit action](~/messaging-extensions/how-to/action-commands/respond-to-task-module-submit.md). If you are using a `taskInfo` object, you must set the `fetchTask` parameter to `false`.

| Property name | Purpose | Is required? | Minimum manifest version |
|---|---|---|---|
|`taskInfo`|Specify the task module to preload when using a messaging extension command| No | 1.4 |
|`taskInfo.title`|Initial task module title|No | 1.4 |
|`taskInfo.width`|Task module width - either a number in pixels or default layout such as 'large', 'medium', or 'small'|No | 1.4 |
|`taskInfo.height`|Task module height - either a number in pixels or default layout such as 'large', 'medium', or 'small'|No | 1.4 |
|`taskInfo.url`|Initial web view URL|No | 1.4 |

#### App manifest example

The following section is an example of a `composeExtensions` object defining two action commands. It is not an example of the complete manifest. For the complete app manifest schema, see [app manifest schema](~/resources/schema/manifest-schema.md).

```json
...
"composeExtensions": [
  {
    "botId": "12a3c29f-1fc5-4d97-a142-12bb662b7b23",
    "canUpdateConfiguration": true,
    "commands": [
      {
        "id": "addTodo",
        "description": "Create a To Do item",
        "title": "Create To Do",
        "type": "action",
        "context": ["commandBox", "message", "compose"],
        "fetchTask": true,
        "parameters": [
          {
            "name": "Name",
            "description": "To Do Title",
            "title": "Title",
            "inputType": "text"
          },
          {
            "name": "Description",
            "description": "Description of the task",
            "title": "Description",
            "inputType": "textarea"
          },
          {
            "name": "Date",
            "description": "Due date for the task",
            "title": "Date",
            "inputType": "date"
          }
        ]
      },
      {
        "id": "reassignTodo",
        "description": "Reassign a todo item",
        "title": "Reassign a todo item",
        "type": "action",
        "fetchTask": true,
      }
    ]
  }
]
...
```

## Code sample

| Sample Name           | Description | .NET    | Node.js   |   
|:---------------------|:--------------|:---------|:--------|
|Teams messaging extension action| Describes how to define action commands, create task module, and  respond to task module submit action. |[View](https://github.com/microsoft/BotBuilder-Samples/tree/master/samples/csharp_dotnetcore/51.teams-messaging-extensions-action)|[View](https://github.com/microsoft/BotBuilder-Samples/tree/master/samples/javascript_nodejs/51.teams-messaging-extensions-action) | 
|Teams messaging extension search   |  Describes how to define search commands and respond to searches.        |[View](https://github.com/microsoft/BotBuilder-Samples/tree/master/samples/csharp_dotnetcore/50.teams-messaging-extensions-search)|[View](https://github.com/microsoft/BotBuilder-Samples/tree/master/samples/javascript_nodejs/50.teams-messaging-extensions-search)|

## Next step

If you are using either an Adaptive Card or an embedded web view without a `taskInfo` object, the next step is to:

> [!div class="nextstepaction"]
> [Create and respond with a task module](~/messaging-extensions/how-to/action-commands/create-task-module.md)

If you are using the parameters or an embedded web view with a `taskInfo` object, the next step is to:

> [!div class="nextstepaction"]
> [Respond to task module submit](~/messaging-extensions/how-to/action-commands/respond-to-task-module-submit.md)

