---
title: Initiate actions with messaging extensions
description: Create Action-based messaging extensions to allow users to trigger external services
keywords: teams messaging extensions messaging extensions search
ms.date: 02/21/2019
---

# Initiate actions with messaging extensions

Action-based messaging extensions allow your users to trigger actions in external services while inside of Teams.

![Example of messaging extension card](~/assets/images/compose-extensions/ceexample.png)

The following sections describe how to do this.

[!include[Common content for creating extensions](~/concepts/messaging-extensions/messaging-extensions-common.md)]

### Action type message extensions

To initiate actions from a  messaging extension set the `type` parameter to `action`. Below is an example of a manifest with a search and a create command. A single messaging extension can have up to 10 different commands. This can include both multiple search and multiple action-based commands.

#### Complete app manifest example

```json
{
  "$schema": " https://developer.microsoft.com/en-us/json-schemas/teams/v1.3/MicrosoftTeams.schema.json",
  "manifestVersion": "1.3",
  "version": "1.0",
  "id": "57a3c29f-1fc5-4d97-a142-35bb662b7b23",
  "packageName": "com.microsoft.teams.samples.Todo",
  "developer": {
    "name": "John Developer",
    "websiteUrl": "http://todobotservice.azurewebsites.net/",
    "privacyUrl": "http://todobotservice.azurewebsites.net/privacy",
    "termsOfUseUrl": "http://todobotservice.azurewebsites.net/termsofuse"
  },
  "name": {
    "short": "To Do",
    "full": "To Do"
  },
  "description": {
    "short": "Find or create a new task in To Do",
    "full": "Find or create a new task in To Do"
  },
  "icons": {
    "outline": "todo-outline.jpg",
    "color": "todo-color.jpg"
  },
  "accentColor": "#ff6a00",
  "composeExtensions": [
    {
      "botId": "57a3c29f-1fc5-4d97-a142-35bb662b7b23",
      "canUpdateConfiguration": true,
      "commands": [
        {
          "id": "searchCmd",
          "description": "Search you Todo's",
          "title": "Search",
          "initialRun": true,
          "parameters": [{
            "name": "searchKeyword",
            "description": "Enter your search keywords",
            "title": "Keywords"
          }]
        },
        {
          "id": "addTodo",
          "description": "Create a To Do item",
          "title": "Create To Do",
          "type": "Action",
          "parameters": [
            {
            "name": "Title",
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
          "title": "Create To Do",
          "type": "Action",
          "fetchTask": true
        }
      ]
    }
  ],
  "permissions": [
    "identity",
    "messageTeamMembers"
  ],
  "validDomains": [
    "todobotservice.azurewebsites.net",
    "*.todobotservice.azurewebsites.net"
  ]
}
```

> [!NOTE]
> Initiating actions from messages is in [developer preview](~/resources/dev-preview/developer-preview-intro.md).

### Initiate actions from messages

In addition to initiating actions from the compose message area, you can also use your messaging extension to initiate an action from a message. This will allow you to send the contents of the message to your bot for processing, and optionally reply to that message with the results. Your users can access your messaging extension from the overflow `...` menu and then selecting `More Actions` as in the image below.

![Example of initiating an action from a message](~/assets/images/compose-extensions/messageextensions_messageaction.png)

To enable your messaging extension to work from an action you'll need to add the `context` parameter to your messaging extension's `commands` object in your app manifest as in the example below. Valid strings for the `context` array are `"message"`, `"commandBar"`, and `"compose"`. The default value is `["compose", "commandBar"]`.

```json
"composeExtensions": [
  {
    "botId": "12345ab8-ab12-cd34-ef56-098abc123876",
    "canUpdateConfiguration": true,
    "commands": [
      {
        "id": "reassignTodo",
        "description": "Reassign a todo item",
        "title": "Create To Do",
        "type": "Action",
        "context": ["message"],
        "fetchTask": true
    }]
    ...

```

The request sent to your bot is the same as described [below](#responding-to-submit), where the `content` object will contain the contents of the message the action was initiated from.

### Test via uploading

You can test your messaging extension by uploading your app. See [Uploading your app in a team](~/concepts/apps/apps-upload.md) for details.

To open your messaging extension, navigate to any of your chats or channels. Choose the **More options** (**&#8943;**) button in the compose box, and choose your messaging extension.

## Collecting input from users

There are three ways to collect information from an end user in Teams.

### Static parameter list

In this method, all you need to do is define a static list of parameters in the manifest as shown above in the "Create To Do" command. To use this method ensure `fetchTask` is set to `false` and that you define your parameters in the manifest.

When a user chooses a command with static parameters, Teams will generate a form in a Task Module with the parameters defined in the manifest. On hitting Submit a `composeExtension/submitAction` is sent to the bot. See the topic [Responding to submit](#responding-to-submit) for more information on the expected set of responses.

### Dynamic input using an adaptive card

In this method, your service can define a custom adaptive card to collect the end user input. For this approach, set the `fetchTask` parameter to `true` in the manifest. Note that if you set `fetchTask` to `true` any static parameters defined for the command will be ignored.

In this method your service will receive a `composeExtension/fetchTask` event and needs to respond with an adaptive card based [task module response](~/concepts/task-modules/task-modules-overview.md#the-taskinfo-object). Below is an sample response with an adaptive card:

```json
{
    "task": {
        "type": "continue",
        "value": {
            "card": {
                "contentType": "application/vnd.microsoft.card.adaptive",
                "content": {
                    "body": [
                        {
                            "type": "TextBlock",
                            "text": "Please enter the following information:"
                        },
                        {
                            "type": "TextBlock",
                            "text": "Name"
                        },
                        {
                            "type": "Input.Text",
                            "spacing": "None",
                            "title": "New Input.Toggle",
                            "placeholder": "Placeholder text"
                        },
                        {
                            "type": "TextBlock",
                            "text": "Date of birth"
                        },
                        {
                            "type": "Input.Date",
                            "spacing": "None",
                            "title": "New Input.Toggle"
                        }
                    ],
                    "type": "AdaptiveCard",
                    "$schema": "http://adaptivecards.io/schemas/adaptive-card.json",
                    "version": "1.0"
                }
            }
        }
    }
}
```

The bot can also respond with an auth/config response if the user needs to authenticate or configure the extension before getting the user input.

### Dynamic input using a web view

In this method your service can show an `<iframe>` based widget to show any custom UI and collect user input. For this approach, set the `fetchTask` parameter to `true` in the manifest.

Just like in the adaptive card flow your service will be send a `fetchTask` event and needs to respond with a URL based [task module response](~/concepts/task-modules/task-modules-overview.md#the-taskinfo-object). Below is an sample response with an Adaptive card:

```json
{
    "task": {
        "value": {
            "url": "http://mywebapp.com/input"
        },
        "type": "continue"
    }
}
```

The bot can also respond with an auth/config response if the user needs to authenticate or configure the extension before getting the user input.

## Responding to submit

Once a user completes entering their input your bot will receive a `composeExtension/submitAction` event with the command id and parameter values set.

There are three different expected responses to a `submitAction`.

### Task Module response

This is used when your extension needs to chain dialogs together to get more information. The response is exactly the same as `fetchTask` mentioned earlier.

### Compose extension auth/config response

This is used when your extension needs to either authenticate or configure in order to continue. See [authentication section](~/concepts/messaging-extensions/search-extensions.md#authentication) in the search section for more details.

### Compose extension result response

This used to insert a card into the compose box as a result of a the command. It's the same response that's used in the search command, but it's limited to one card or one result in the array.

```json
{
  "composeExtension": {
    "attachments": [
      {  
        "contentType": "application/vnd.microsoft.teams.card.o365connector",
        "content": {
          "sections": [
            {
              "activityTitle": "[85069]: Create a cool app",
              "activityImage": "https://placekitten.com/200/200"
            },
            {
              "title": "Details",
              "facts": [
                {
                  "name": "Assigned to:",
                  "value": "[Larry Brown](mailto:larryb@example.com)"
                },
                {
                  "name": "State:",
                  "value": "Active"
                }
              ]
            }
          ]
        },
        "preview": {
          "contentType": "application/vnd.microsoft.card.thumbnail",
          "content": {
            "title": "85069: Create a cool app",
            "images": [
              {
                "url": "https://placekitten.com/200/200"
              }
            ]
          }
        }
      }
    ],
    "type": "result",
    "attachmentLayout": "list"
  }
}
```
