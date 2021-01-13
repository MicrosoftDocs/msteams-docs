---
title: Create and send the task module
author: clearab
description: How to handle the initial invoke action and respond with a task module from an action messaging extension command
ms.topic: conceptual
ms.author: anclear
---
# Create and send the task module

[!include[v4-to-v3-SDK-pointer](~/includes/v4-to-v3-pointer-me.md)]

If you are not populating your task module with parameters defined in your app manifest, you'll need to create the task module to be presented to your users. You can use either an Adaptive Card or an embedded web view.

## The initial invoke request

Using this method you service will receive an `Activity` object of type `composeExtension/fetchTask`, and you'll need to respond with a `task` object containing either the adaptive card or a URL to the embedded web view. In addition to the standard bot activity properties, the initial invoke payload contains the following request metadata:

|Property name|Purpose|
|---|---|
|`type`| Type of request; must be `invoke`. |
|`name`| Type of command that is issued to your service. Will be `composeExtension/fetchTask`. |
|`from.id`| ID of the user that sent the request. |
|`from.name`| Name of the user that sent the request. |
|`from.aadObjectId`| Azure Active Directory object id of the user that sent the request. |
|`channelData.tenant.id`| Azure Active Directory tenant ID. |
|`channelData.channel.id`| Channel ID (if the request was made in a channel). |
|`channelData.team.id`| Team ID (if the request was made in a channel). |
|`value.commandId` | Contains the Id of the command that was invoked. |
|`value.commandContext` | The context that triggered the event. Will be `compose`. |
|`value.context.theme` | The user's client theme, useful for embedded web view formatting. Will be `default`, `contrast` or `dark`. |

### Example fetchTask request

# [C#/.NET](#tab/dotnet)

```csharp
protected override async Task<MessagingExtensionActionResponse> OnTeamsMessagingExtensionFetchTaskAsync(ITurnContext<IInvokeActivity> turnContext, MessagingExtensionAction action, CancellationToken cancellationToken)
{
  //handle fetch task
}
```

# [JavaScript/Node.js](#tab/javascript)

```javascript
class TeamsMessagingExtensionsActionPreviewBot extends TeamsActivityHandler {
  handleTeamsMessagingExtensionFetchTask(context, action) {
    //hand fetch task
  }
}
```

# [JSON](#tab/json)

```json
{
  "name": "composeExtension/fetchTask",
  "type": "invoke",
  "timestamp": "2019-07-01T22:57:22.175Z",
  "localTimestamp": "2019-07-01T15:57:22.175-07:00",
  "id": "f:0123456878990178955",
  "channelId": "msteams",
  "serviceURL": "https://smba.trafficmanager.net/amer/",
  "from": {
    "id": "29:1test2GgHIa0DXzDT_OGwL5vSMZdAxDlGR7hYxZ6_JBVqHz2Zq9Nm44FUNWqHCdGBwHg8WrlFRsYrd0cCAS7dig",
    "name": "John Smith",
    "aadObjectId": "1234567d-1234-462a-8952-35b75f16f1e1"
  },
  "conversation": {
    "isGroup": true,
    "conversationType": "channel",
    "tenantId": "1234abcd-1234-12ab-12ab-35b75f16f1e1",
    "id": "19:83ed1d507cb5427c93495cf914326310@thread.skype"
  },
  "recipient": {
    "id": "28:049566e0-4401-4bcf-86a1-ce22082ce03a",
    "name": "mess"
  },
  "entities": [
    {
      "locale": "en-US",
      "country": "US",
      "platform": "Windows",
      "type": "clientInfo"
    }
  ],
  "channelData": {
    "channel": {
      "id": "19:83ab1d507cb5427c93495cf912345678@thread.skype"
    },
    "team": {
      "id": "19:83ab1d507cb5427c93495cf912345678@thread.skype"
    },
    "tenant": {
      "id": "1234abcd-1234-12ab-12ab-35b75f16f1e1"
    },
    "source": {
      "name": "compose"
    }
  },
  "value": {
    "commandId": "hello",
    "commandContext": "compose",
    "context": {
      "theme": "dark"
    }
  },
  "locale": "en-US"
}
```

* * *

## Initial invoke request from a message

When your bot is invoked from a message rather than the compose area or the command bar, the `value` object in the initial request will contain the details of the message your messaging extension was invoked from. An example of this object is below. The `reactions` and `mentions` arrays are optional, and will not be present if there are no reactions or mentions in the original message.

# [C#/.NET](#tab/dotnet)

```csharp
protected override async Task<MessagingExtensionActionResponse> OnTeamsMessagingExtensionFetchTaskAsync(ITurnContext<IInvokeActivity> turnContext, MessagingExtensionAction action, CancellationToken cancellationToken)
{
  var messageText = action.MessagePayload.Body.Content;
  var fromId = action.MessagePayload.From.User.Id;

  //finish handling the fetchTask
}
```

# [JavaScript/Node.js](#tab/javascript)

```javascript
class TeamsMessagingExtensionsActionPreview extends TeamsActivityHandler {
  handleTeamsMessagingExtensionFetchTask(context, action) {
    const messageText = action.messagePayload.body.content;

    //finish handling the fetchTask
  }
}
```

# [JSON](#tab/json)

```json
{
  "name": "composeExtension/submitAction",
  "type": "invoke",
...
  "value": {
    "commandId": "setReminder",
    "commandContext": "message",
    "messagePayload": {
      "id": "1111111111",
      "replyToId": null,
      "createdDateTime": "2019-02-25T21:29:36.065Z",
      "lastModifiedDateTime": null,
      "deleted": false,
      "subject": "Message subject",
      "summary": null,
      "importance": "normal",
      "locale": "en-us",
      "body": {
        "contentType": "html",
        "content": "This is the message the messaging extension was invoked from."
    },
      "from": {
        "device": null,
        "conversation": null,
        "user": {
          "userIdentityType": "aadUser",
          "id": "wxyz12ab8-ab12-cd34-ef56-098abc123876",
          "displayName": "Jamie Smythe"
        },
        "application": null
      },
      "reactions": [
        {
          "reactionType": "like",
          "createdDateTime": "2019-02-25T22:40:40.806Z",
          "user": {
            "device": null,
            "conversation": null,
            "user": {
              "userIdentityType": "aadUser",
              "id": "qrst12346-ab12-cd34-ef56-098abc123876",
              "displayName": "Jim Brown"
            },
            "application": null
          }
        }
      ],
      "mentions": [
        {
          "id": 0,
          "mentionText": "Sarah",
          "mentioned": {
            "device": null,
            "conversation": null,
            "user": {
              "userIdentityType": "aadUser",
              "id": "ab12345678-ab12-cd34-ef56-098abc123876",
              "displayName": "Sarah"
            },
            "application": null
          }
        }
      ]
    }
  ...
```

* * *

## Respond to the fetchTask

Respond to the invoke request with a `task` object that contains either a `taskInfo` object with the adaptive card or web URL, or a simple string message.

|Property name|Purpose|
|---|---|
|`type`| Can be either `continue` to present a form, or `message` for a simple popup. |
|`value`| Either a `taskInfo` object for a form, or a `string` for a message. |

The schema for the taskInfo object is:

|Property name|Purpose|
|---|---|
|`title`| The title of the task module.|
|`height`| Can be either an integer (in pixels), or `small`, `medium`, `large`.|
|`width`| Can be either an integer (in pixels), or `small`, `medium`, `large`.|
|`card`| The adaptive card defining the form (if using one).
|`url`| The URL to be opened inside of the task module as an embedded web view.|
|`fallbackUrl`| If a client does not support the task module feature, this URL is opened in a browser tab. |

### With an adaptive card

When using an adaptive card, you'll need to respond with a `task` object with the `value` object containing an adaptive card.

#### Example fetchTask response with an adaptive card

# [C#/.NET](#tab/dotnet)

This sample uses the [AdaptiveCards NuGet package](https://www.nuget.org/packages/AdaptiveCards) in addition to the Bot Framework SDK.

```csharp
protected override async Task<MessagingExtensionActionResponse> OnTeamsMessagingExtensionFetchTaskAsync(ITurnContext<IInvokeActivity> turnContext, MessagingExtensionAction action, CancellationToken cancellationToken)
{
  string placeholder = "Not invoked from message";

  if (action.MessagePayload != null)
  {
      var messageText = action.MessagePayload.Body.Content;
      var fromId = action.MessagePayload.From.User.Id;
      placeholder = "Invoked from message";
  }

  var response = new MessagingExtensionActionResponse()
  {
    Task = new TaskModuleContinueResponse()
    {
      Value = new TaskModuleTaskInfo()
      {
        Height = "small",
        Width = "small",
        Title = "Example task module",
        Card = new Attachment()
        {
          ContentType = AdaptiveCard.ContentType,
          Content = new AdaptiveCard("1.0")
          {
            Body = new List<AdaptiveElement>()
            {
              new AdaptiveTextInput() { Id = "FormField1", Placeholder = placeholder},
              new AdaptiveTextInput() { Id = "FormField2", Placeholder = "FormField2"},
              new AdaptiveTextInput() { Id = "FormField3", Placeholder = "FormField3"},
            },
            Actions = new List<AdaptiveAction>()
            {
              new AdaptiveSubmitAction()
              {
                Type = AdaptiveSubmitAction.TypeName,
                Title = "Submit",
              },
            },
          },
        },
      },
    },
  };
  return response;
}
```

# [JavaScript/Node.js](#tab/javascript)

```javascript
class TeamsMessagingExtensionsActionPreview extends TeamsActivityHandler {
    handleTeamsMessagingExtensionFetchTask(context, action) {
      const adaptiveCard = CardFactory.adaptiveCard({
        actions: [{
          data: { submitLocation: 'messagingExtensionFetchTask'},
          title: 'Submit',
          type: 'Action.Submit'
        }],
        body: [
          { text: 'Task Module', type: 'TextBlock', weight: 'bolder'},
          { type: 'TextBlock', text: 'Enter text for Question:' },
          { id: 'Question', placeholder: 'Question text here', type: 'Input.Text', value: userText },
          { type: 'TextBlock', text: 'Options for Question:' },
          { type: 'TextBlock', text: 'Is Multi-Select:' },
          {
            choices: [{ title: 'True', value: 'true' }, { title: 'False', value: 'false' }],
            id: 'MultiSelect',
            isMultiSelect: false,
            style: 'expanded',
            type: 'Input.ChoiceSet',
            value: isMultiSelect ? 'true' : 'false'
          },
          { id: 'Option1', placeholder: 'Option 1 here', type: 'Input.Text', value: option1 },
          { id: 'Option2', placeholder: 'Option 2 here', type: 'Input.Text', value: option2 }
        ],
        type: 'AdaptiveCard',
        version: '1.0'
      });

      return {
        task: {
          type: 'continue',
          value: {
            card: adaptiveCard,
            height: 450,
            title: 'Task Module Fetch Example',
            url: null,
            width: 500
          }
        }
      };
    }
}
```

# [JSON](#tab/json)

```json
 {​
  "task": {​
    "type": "continue",
    "value": {​
      "title": "Task module title",
      "height": 500,
      "width": "medium",
      "card": {​
        "$schema": "http://adaptivecards.io/schemas/adaptive-card.json",
        "type": "AdaptiveCard",
        "version": "1.0",
        "body": [
          {​
            "type": "Input.Text",
            "placeholder": "FormField1",
            "id": "FormField1"
          }​,
          {​
            "type": "Input.Text",
            "placeholder": "FormField2",
            "id": "FormField2"
          }​,
          {​
            "type": "Input.Text",
            "placeholder": "FormField3",
            "id": "FormField3"
          }​,
          {​
            "type": "ActionSet",
            "actions": [
              {​
                "type": "Action.Submit",
                "title": "Action.Submit",
                "id": "submitAction"
              }​
            ]
          }​
        ]
      }​
    }​
  }​
}​
```

* * *

### With an embedded web view

When using an embedded web view, you'll need to respond with a `task` object with the `value` object containing the URL to the web form you'd like to load. The domains of any URL you want to load must be included in the `validDomains` array in your app's manifest. See the [task module documentation](~/task-modules-and-cards/what-are-task-modules.md) for complete information on building your embedded web view.

# [C#/.NET](#tab/dotnet)

```csharp
protected override async Task<MessagingExtensionActionResponse> OnTeamsMessagingExtensionFetchTaskAsync(ITurnContext<IInvokeActivity> turnContext, MessagingExtensionAction action, CancellationToken cancellationToken)
{
  string placeholder = "Not invoked from message";

  if (action.MessagePayload != null)
  {
      var messageText = action.MessagePayload.Body.Content;
      var fromId = action.MessagePayload.From.User.Id;
      placeholder = "Invoked from message";
  }

  var response = new MessagingExtensionActionResponse()
  {
    Task = new TaskModuleContinueResponse()
    {
      Value = new TaskModuleTaskInfo()
      {
        Height = "small",
        Width = "small",
        Title = "Example task module",
        Url = "https://contoso.com/msteams/taskmodules/newcustomer",
        },
      },
    },
  };
  return response;
}
```

# [JavaScript/Node.js](#tab/javascript)

```javascript
class TeamsMessagingExtensionsActionPreview extends TeamsActivityHandler {
  handleTeamsMessagingExtensionFetchTask(context, action) {
    return {
      task: {
        type: 'continue',
        value: {
          width: 500,
          height: 450,
          title: 'Task Module Fetch Example',
          url: 'https://contoso.com/msteams/taskmodules/newcustomer',
          fallbackUrl: 'https://contoso.com/msteams/taskmodules/newcustomer'
        }
      }
    };
  }
}
```

# [JSON](#tab/json)

```json
{
  "task": {
    "type": "continue",
    "value": {
      "title": "Task module title",
      "height": 500,
      "width": "medium",
      "url": "https://contoso.com/msteams/taskmodules/newcustomer",
      "fallbackUrl": "https://contoso.com/msteams/taskmodules/newcustomer"
    }
  }
}
```
### Request to install your conversational bot

If the app contains a conversational bot, install the bot in the conversation before loading the task module. It is useful to get additional context for the task module. The example for this scenario is to fetch the roster to populate a people picker control or the list of channels in a team.

When the messaging extension receives the `composeExtension/fetchTask` invoke, check if the bot is installed in the current context to facilitate the flow. For example, check the flow with a get roster call. If the bot is not installed, return an Adaptive Card with an action that requests the user to install the bot. See the action in the following example. The user must have permission to install the apps in that location for checking. If the app installation is unsuccessful, the user receives a message to contact the administrator.

Example of the response:

```json
{
  "type": "AdaptiveCard",
  "body": [
    {
      "type": "TextBlock",
      "text": "Looks like you haven't used Disco in this team/chat"
    }
  ],
  "actions": [
    {
      "type": "Action.Submit",
      "title": "Continue",
      "data": {
        "msteams": {
          "justInTimeInstall": true
        }
      }
    }
  ],
  "version": "1.0"
}
```

After the installation, the bot receives another invoke message with `name = composeExtension/submitAction`, and `value.data.msteams.justInTimeInstall = true`.

Example of the invoke:

```json
{
  "value": {
    "commandId": "giveKudos",
    "commandContext": "compose",
    "context": {
      "theme": "default"
    },
    "data": {
      "msteams": {
        "justInTimeInstall": true
      }
    }
  },
  "conversation": {
    "id": "19:7705841b240044b297123ad7f9c99217@thread.skype"
  },
  "name": "composeExtension/submitAction",
  "imdisplayname": "Bob Smith"
}
```

Task response to the invoke must be similar to that of the installed bot.

* * *

## Next steps

If you allow your users to send a response back from the task module, you have to handle the submit action.

* [Create and respond with a task module](~/messaging-extensions/how-to/action-commands/respond-to-task-module-submit.md)

[!include[messaging-extension-learn-more](~/includes/messaging-extensions/learn-more.md)]
