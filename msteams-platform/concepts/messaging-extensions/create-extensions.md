---
title: Create based messaging extensions
description: Describes how to develop create based messaging extensions
keywords: teams messaging extensions messaging extensions search
ms.date: 11/07/18
---

# Initiating actions from messaging extensions

Messaging extensions now allow you to take inputs from users and post to your service. Note that create based messaging extensions are currently in Developer preview.

![Example of messaging extension card](~/assets/images/compose-extensions/ceexample.png)

## Add a messaging extension to your app

Building a messaging extension involves implementing familiar Microsoft Teams developer platform concepts like bot APIs, cards, and tabs.

At its core, a messaging extension is a cloud-hosted service that listens to user requests and responds with structured data, such as cards. You integrate your service with Microsoft Teams via Bot Framework `Activity` objects. Our .NET and Node.js [extensions for the Bot Builder SDK](~/get-started/code#microsoft-teams-extensions-for-the-bot-builder-sdk) can help you add messaging extension functionality to your app.

![Diagram of message flow for messaging extensions](~/assets/images/compose-extensions/ceflow.png)

### Register in the Bot Framework

If you haven’t done so already, you must first register a bot with the Microsoft Bot Framework. (See [Create a bot](~/concepts/bots/bots-create) for instructions.) The Microsoft app ID and callback endpoints for your bot, as defined there, will be used in your messaging extension to receive and respond to user requests. Remember to enable the Microsoft Teams channel for your bot.

Record your bot’s app ID and app password—you will need to supply the app ID in your app manifest.

### Update your app manifest

As with bots and tabs, you update the [manifest](~/resources/schema/manifest-schema#composeextensions) of your app to include the messaging extension properties. These properties govern how your messaging extension appears and behaves in the Microsoft Teams client. Messaging extensions are supported beginning with v1.0 of the manifest.

#### Declare your messaging extension

To add a messaging extension, include a new top-level JSON structure in your manifest with the `composeExtensions` property. Currently, you are limited to creating a single messaging extension for your app.

> [!NOTE]
> The manifest refers to messaging extensions as `composeExtensions`. This is to maintain backward compatibility.

The extension definition is an object that has the following structure:

| Property name | Purpose | Required? |
|---|---|---|
| `botId` | The unique Microsoft app ID for the bot as registered with the Bot Framework. This should typically be the same as the ID for your overall Teams app. | Yes |
| `scopes` | Array declaring whether this extension can be added to `personal` or `team` scopes (or both). | Yes |
| `canUpdateConfiguration` | Enables **Settings** menu item. | No |
| `commands` | Array of commands that this messaging extension supports. You are limited to 10 commands. | Yes |

#### Define commands

Your messaging extension should declare one command, which appears when the user selects your app from the **More options** (**&#8943;**) button in the compose box. 

![Screenshot of list of messaging extensions in Teams](~/assets/images/compose-extensions/compose-extension-list.png)

In the app manifest, your command item is an object with the following structure:

| Property name | Purpose | Required? |
|---|---|---|
| `id` | Unique ID that you assign to this command. The user request will include this ID. | Yes |
| `title` | Command name. This value appears in the UI. | Yes |
| `description` | Help text indicating what this command does. This value appears in the UI. | Yes |
| `type` | Set the type of command. Possible values include `query` and `action`. If not present the default value is set to `query` | No |
| `initialRun` | Optional parameter, used with `query` commands. If set to **true**, indicates this command should be executed as soon as the user chooses this command in the UI. | No |
| `fetchTask` | Optional parameter, used with `action` commands. Set to **true** to fetch the adaptive card or web url to display within the [task module](https://docs.microsoft.com/en-us/microsoftteams/platform/concepts/task-modules/task-modules-overview). This is used when the inputs to the `action` command is dynamic as opposed to a static set of parameters. Note that the if set to **true** the static parameter list for the command is ignored | No |
| `parameters` | Static list of parameters for the command. | Yes |
| `parameter.name` | The name of the parameter. This is sent to your service in the user request. | Yes |
| `parameter.description` | Describes this parameter’s purposes or example of the value that should be provided. This value appears in the UI. | Yes |
| `parameter.title` | Short user-friendly parameter title or label. | Yes |
| `parameter.inputType` | Set to the type of input required. Possible values include `text`, `textarea`, `number`, `date`, `time`, `toggle`. Default is set to `text` | No |

For create based  messaging extension set the `type` parameter to `action`. Below is an example of a manifest with a search and a create command. Note that a single messaging extension can have up to 10 different commands associated with it. This can include both multiple search and multiple create based commands.

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

### Test via uploading

You can test your messaging extension by uploading your app. See [Uploading your app in a team](~/concepts/apps/apps-upload) for details.

To open your messaging extension, navigate to any of your chats or channels. Choose the **More options** (**&#8943;**) button in the compose box, and choose your messaging extension.

## Collecting input from users

There are three ways to collect information from an end user in Teams.

### Static parameter list ###

In this method, all you need to do is define a static list of parameters in the manfifest as shown above in the "Create To Do" command. To use this method ensure `fetchTask` is set to `false` and that you define your paramters in the manifest.

When a user chooses a command with static parameters, Teams will generate a form in a Task Module with the parameters defined in the manifest. On hitting Submit a `composeExtension/submitAction` is sent to the bot. See the [responding to submit](#Responding to submit) section for more info ont he expected set of responses.


### Dynamic input using an adaptive card

In this method, your service can define a custom adaptive card to collect the end user input. For this approach, set the `fetchTask` parameter to `true` in the manifest. Note that if you set `fetchTask` to `true` any static parameters defined for the command will be ignored.

In this method your service will be receive a `composeExtension/fetchTask` event and needs to respond with an adaptive card based [task module response](https://docs.microsoft.com/en-us/microsoftteams/platform/concepts/task-modules/task-modules-overview#the-taskinfo-object). Below is an sample response with an adaptive card:

```json
{
    "task": {
        "value": {
            "card": {
                "type": "AdaptiveCard",
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
                "$schema": "http://adaptivecards.io/schemas/adaptive-card.json",
                "version": "1.0"
            }
        },
        "type": "continue"
    }
}
```
The bot can also respond with an auth/config response if the user needs to authenticate or configure the extesion before getting the user input.

### Dynamic input using a web view

In this method, your service can show an `<iframe>` based widget to show any custom UI and collect user input. For this approach, set the `fetchTask` parameter to `true` in the manifest. 

Just like in the adaptive card flow your service will be send a fetchTask event and needs to respond with a url based [task module response](https://docs.microsoft.com/en-us/microsoftteams/platform/concepts/task-modules/task-modules-overview#the-taskinfo-object). Below is an sample response with an adaptive card

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
The bot can also respond with an auth/config response if the user needs to authenticate or configure the extesion before getting the user input.

## Responding to submit

Once a user completes entering their input your bot will receive a `composeExtension/submitAction` event with the command id and parameter values set. 

There are three different expected responses to a submitAction.

### Task Module response

This is used when your extension needs to chain dialogs together to get more information. The response is exactly the same as the `fetchTask` section mentioned earlier

### Compose extension auth/config response

This is used when your extension needs to either authenticate or configure in order to continue. See the [authentication section](~/concepts/messaging-extensions/search-extensions#Authentication) defined in the search section for more details.

### Compose extension result response

This used to insert a card into the compose box as a result of a the comand. It's the same response that's used in the search command, but it's limited to one command in the array. 

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