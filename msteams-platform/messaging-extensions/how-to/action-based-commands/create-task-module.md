---
title: Create and send the task module
author: clearab
description: How to handle the initial invoke action and respond with a task module from an action-based messaging extension command
ms.topic: conceptual
ms.author: anclear
---
# Create and send the task module

If you are not populating your task module with parameters defined in your app manifest, you'll need to create the task module to be presented to your users. You can use either an adaptive card or an embedded web view. This article will guide you through creating fairly simple task modules. See the [documentation for task modules](~/task-modules/what-are-task-modules.md) for the complete documentation on them.

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

## Initial invoke request from a message

When your bot is invoked from a message rather than the compose area or the command bar, the `value` object in the initial request will contain the details of the message your messaging extension was invoked from. An example of this object is below. The `reactions` and `mentions` arrays are optional, and will not be present if there are no reactions or mentions in the original message.

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
        "content": "this is the message"
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

## Respond to the fetchTask

Your response to the invoke request should be in the form of a `task` object that contains either a `taskInfo` object with the adaptive card or web URL, or a simple string message.

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

```json
{
  "task": {
    "type": "continue",
    "value": {
      "title": "Task module form",
      "height": "small",
      "width": "medium",
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
              "placeholder": "Placeholder text"
            }
          ],
          "actions" : [
            {
              "type": "Action.Submit",
              "title": "Submit"
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

### With an embedded web view

When using an embedded web view, you'll need to respond with a `task` object with the `value` object containing the URL to the web form you'd like to load. The domains of any URL you want to load must be included in the `validDomains` array in your app's manifest. See the [task module documentation](~/task-modules/what-are-task-modules.md) for complete information on building your embedded web view.

#### Example fetchTask response with an embedded web view

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

## Complete sample using an adaptive card

# [C#/.NET](#tab/dotnet)

You can see the [complete sample project on GitHub](https://github.com/OfficeDev/msteams-samples/tree/master/samples/dotnet/messaging_extensions/messaging_extension_action_with_card).

```csharp
[BotAuthentication]
public async Task<HttpResponseMessage> Post([FromBody]Activity activity)
{
  if (activity.Type == ActivityTypes.Invoke)
  {
    if (activity.Name == "composeExtension/fetchTask")
    {
      //Create the adaptive card
      AdaptiveCard card = new AdaptiveCard(new AdaptiveSchemaVersion("1.0"));
      card.Body.Add(new AdaptiveTextBlock()
      {
        Text = "Please enter the following information:"
      });
      card.Body.Add(new AdaptiveTextBlock()
      {
        Text = "Name"
      });
      card.Body.Add(new AdaptiveTextInput()
      {
        Id = "name",
        Spacing = AdaptiveSpacing.None,
        Placeholder = "Name goes here"
      });
      card.Actions.Add(new AdaptiveSubmitAction()
      {
        Title = "Submit"
      });
  
      string cardJson = card.ToJson();
  
      //Create the task module response
      string task = $@"{{
        'task': {{
          'type': 'continue',
          'value': {{
            'card': {{
              'contentType': 'application/vnd.microsoft.card.adaptive',
              'content': {cardJson}
              }}
            }}
          }}
        }}";
  
      return Request.CreateResponse(HttpStatusCode.OK, JObject.Parse(task));
    }
  }
}
```

# [JavaScript/Node.js](#tab/javascript)

```javascript
//this is the javascript example.
```

# [TypeScript/Node.js](#tab/typescript)

```typescript
let something = `an example in typescript`;
```

---

## Next steps

If you allow your users to send a response back from the task module, you'll need to handle the submit action.

* [Create and respond with a task module](~/messaging-extensions/how-to/action-based-commands/respond-to-task-module-submit.md)

[!Includes(~/includes/messaging-extensions/learn-more.md)]
