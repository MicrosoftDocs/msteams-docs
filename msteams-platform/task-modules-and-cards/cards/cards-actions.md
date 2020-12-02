---
title: Add card actions in a bot
description: Describes card actions in Microsoft Teams and how to use them in your bots
keywords: teams bots cards actions
---
# Card actions

Cards used by bots and messaging extensions in Teams support the following activity ([`CardAction`](https://docs.microsoft.com/bot-framework/dotnet/bot-builder-dotnet-add-rich-card-attachments#process-events-within-rich-cards)) types. Note that these actions differ from `potentialActions` for Office 365 Connector cards when used from Connectors.

| Type | Action |
| --- | --- |
| `openUrl` | Opens a URL in the default browser. |
| `messageBack` | Sends a message and payload to the bot (from the user who clicked the button or tapped the card) and sends a separate message to the chat stream. |
| `imBack`| Sends a message to the bot (from the user who clicked the button or tapped the card). This message (from user to bot) is visible to all conversation participants. |
| `invoke` | Sends a message and payload to the bot (from the user who clicked the button or tapped the card). This message is not visible. |
| `signin` | Initiates OAuth flow, allowing bots to connect with secure services. |

> [!NOTE]
>* Teams does not support `CardAction` types not listed in the preceding table.
>* Teams does not support the `potentialActions` property.
>* Card actions are different than [suggested actions](https://docs.microsoft.com/azure/bot-service/bot-builder-howto-add-suggested-actions?view=azure-bot-service-4.0&tabs=javascript#suggest-action-using-button&preserve-view=true) in Bot Framework/Azure Bot Service. Suggested actions are not supported in Microsoft Teams: if you want buttons to appear on a Teams bot message, use a card.
>* If you're using a card action as part of a messaging extension, the actions will be not work until the card is submitted to the channel (they will not work while the card is in the compose message box).

Teams also supports [Adaptive Cards actions](~/task-modules-and-cards/cards/cards-actions.md#adaptive-cards-actions), which are only used by Adaptive Cards. These actions are listed in their own section at the end of this reference.

## openUrl

This action type specifies a URL to launch in the default browser. Note that your bot does not receive any notice on which button was clicked.

The `value` field must contain a full and properly formed URL.

```json
{
    "type": "openUrl",
    "title": "Tabs in Teams",
    "value": "https://msdn.microsoft.com/microsoft-teams/tabs"
}
```

## messageBack

With `messageBack`, you can create a fully customized action with the following properties:

| Property | Description |
| --- | --- |
| `title` | Appears as the button label. |
| `displayText` | Optional. Echoed by the user into the chat stream when the action is performed. This text is *not* sent to your bot. |
| `value` | Sent to your bot when the action is performed. You can encode context for the action, such as unique identifiers or a JSON object. |
| `text` | Sent to your bot when the action is performed. Use this property to simplify bot development: Your code can check a single top-level property to dispatch bot logic. |

The flexibility of `messageBack` means that your code can choose not to leave a visible user message in the history simply by not using `displayText`.

```json
{
  "buttons": [
    {
    "type": "messageBack",
    "title": "My MessageBack button",
    "displayText": "I clicked this button",
    "text": "User just clicked the MessageBack button",
    "value": "{\"property\": \"propertyValue\" }"
    }
  ]
}
```

The `value` property can be either a serialized JSON string or a JSON object.

### Inbound message example

`replyToId` contains the ID of the message that the card action came from. Use it if you want to update the message.

```json
{
   "text":"User just clicked the MessageBack button",
   "value":{
      "property":"propertyValue"
   },
   "type":"message",
   "timestamp":"2017-06-22T22:38:47.407Z",
   "id":"f:5261769396935243054",
   "channelId":"msteams",
   "serviceUrl":"https://smba.trafficmanager.net/amer-client-ss.msg/",
   "from":{
      "id":"29:102jd210jd010icsoaeclaejcoa9ue09u",
      "name":"John Smith"
   },
   "conversation":{
      "id":"19:malejcou081i20ojmlcau0@thread.skype;messageid=1498171086622"
   },
   "recipient":{
      "id":"28:76096e45-119f-4736-859c-6dfff54395f7",
      "name":"MyBot"
   },
   "entities":[
      {
        "locale": "en-US",
        "country": "US",
        "platform": "Windows",
        "timezone": "America/Los_Angeles",
        "type": "clientInfo" 
      }
   ],
   "channelData":{
      "channel":{
         "id":"19:malejcou081i20ojmlcau0@thread.skype"
      },
      "team":{
         "id":"19:12d021jdoijsaeoaue0u@thread.skype"
      },
      "tenant":{
         "id":"bec8e231-67ad-484e-87f4-3e5438390a77"
      }
   },
        "replyToId": "1575667808184",
}
```

## imBack

This action triggers a return message to your bot, as if the user typed it in a normal chat message. Your user, and all other users if in a channel, will see that button response.

The `value` field should contain the text string echoed in the chat and therefore sent back to the bot. This is the message text you will process in your bot to perform the desired logic. Note: this field is a simple string - there is no support for formatting or hidden characters.

```json
{
    "type": "imBack",
    "title": "More",
    "value": "Show me more"
}
```

## invoke

The `invoke` action is used for invoking [task modules](~/task-modules-and-cards/task-modules/task-modules-bots.md).

The `invoke` action contains three properties: `type`, `title`, and `value`. The `value` property can contain a string, a stringified JSON object, or a JSON object.

```json
{
    "type": "invoke",
    "title": "Option 1",
    "value": {
        "option": "opt1"
    }
}
```

When a user clicks the button, your bot will receive the `value` object with some additional info. Please note that the activity type will be `invoke` instead of `message` (`activity.Type == "invoke"`).

### Example: Invoke button definition (.NET)

```csharp
var button = new CardAction()
{
    Title = "Option 1",
    Type = "invoke",
    Value = "{\"option\": \"opt1\"}"
};
```

### Example: Incoming invoke message

The top-level `replyToId` property contains the ID of the message that the card action came from. Use it if you want to update the message.

```json
{
    "type": "invoke",
    "value": {
        "option": "opt1"
    },
    "timestamp": "2017-02-10T04:11:19.614Z",
    "localTimestamp": "2017-02-09T21:11:19.614-07:00",
    "id": "f:6894910862892785420",
    "channelId": "msteams",
    "serviceUrl": "https://smba.trafficmanager.net/amer-client-ss.msg/",
    "from": {
        "id": "29:1Eniglq0-uVL83xNB9GU6w_G5a4SZF0gcJLprZzhtEbel21G_5h-
    NgoprRw45mP0AXUIZVeqrsIHSYV4ntgfVJQ",
        "name": "John Doe"
    },
    "conversation": {
        "id": "19:97b1ec61-45bf-453c-9059-6e8984e0cef4_8d88f59b-ae61-4300-bec0-caace7d28446@unq.gbl.spaces"
    },
    "recipient": {
        "id": "28:8d88f59b-ae61-4300-bec0-caace7d28446",
        "name": "MyBot"
    },
    "entities": [
        {
            "locale": "en-US",
            "country": "US",
            "platform": "Web",
            "type": "clientInfo"
        }
    ],
    "channelData": {
        "channel": {
            "id": "19:dc5ba12695be4eb7bf457cad6b4709eb@thread.skype"
        },
        "team": {
            "id": "19:712c61d0ef384e5fa681ba90ca943398@thread.skype"
        },
        "tenant": {
            "id": "72f988bf-86f1-41af-91ab-2d7cd011db47"
        }
    },
    "replyToId": "1575667808184"
}
```

## signin

Initiates an OAuth flow, allowing bots to connect with secure services, as described in more detail here: [Authentication flow in bots](~/bots/how-to/authentication/auth-flow-bot.md).

## Adaptive Cards actions

Adaptive Cards support three action types:

* [Action.OpenUrl](http://adaptivecards.io/explorer/Action.OpenUrl.html)
* [Action.Submit](http://adaptivecards.io/explorer/Action.Submit.html)
* [Action.ShowCard](http://adaptivecards.io/explorer/Action.ShowCard.html)

In addition to the actions mentioned above, you can modify the Adaptive Card `Action.Submit` payload to support existing Bot Framework actions using a `msteams` property in the `data` object of `Action.Submit`. The below sections detail how to use existing Bot Framework actions with Adaptive Cards.

> [!NOTE]
> Adding `msteams` to data, with a Bot Framework action, does not work with an Adaptive Card task module.

### Adaptive Cards with messageBack action

To include a `messageBack` action with an Adaptive Card include the following details in the `msteams` object. Note that you can include additional hidden properties in the `data` object if needed.

| Property | Description |
| --- | --- |
| `type` | Set to `messageBack` |
| `displayText` | Optional. Echoed by the user into the chat stream when the action is performed. This text is *not* sent to your bot. |
| `value` | Sent to your bot when the action is performed. You can encode context for the action, such as unique identifiers or a JSON object. |
| `text` | Sent to your bot when the action is performed. Use this property to simplify bot development: Your code can check a single top-level property to dispatch bot logic. |

#### Example

```json
{
  "type": "Action.Submit",
  "title": "Click me for messageBack",
  "data": {
    "msteams": {
        "type": "messageBack",
        "displayText": "I clicked this button",
        "text": "text to bots",
        "value": "{\"bfKey\": \"bfVal\", \"conflictKey\": \"from value\"}"
    }
  }
}
```

### Adaptive Cards with imBack action

To include a `imBack` action with an Adaptive Card include the following details in the `msteams` object. Note that you can include additional hidden properties in the `data` object if needed.

| Property | Description |
| --- | --- |
| `type` | Set to `imBack` |
| `value` | String that needs to be echoed back in the chat |

#### Example

```json
{
  "type": "Action.Submit",
  "title": "Click me for imBack",
  "data": {
    "msteams": {
        "type": "imBack",
        "value": "Text to reply in chat"
    }
  }
}
```

### Adaptive Cards with signin action

To include a `signin` action with an Adaptive Card include the following details in the `msteams` object. Note that you can include additional hidden properties in the `data` object if needed.

| Property | Description |
| --- | --- |
| `type` | Set to `signin` |
| `value` | Set to the URL that you want to redirect to  |

#### Example

```json
{
  "type": "Action.Submit",
  "title": "Click me for signin",
  "data": {
    "msteams": {
        "type": "signin",
        "value": "https://signin.com"
    }
  }
}
```

### Adaptive Cards with invoke action
 
To include a `invoke` action with an Adaptive Card include the following details in the `msteams` object. Note that you can include additional hidden properties in the `data` object if needed.

| Property | Description |
| --- | --- |
| `type` | Set to `signin` |
| `data` | Set the value  |

#### Example

```json
{
    "type": "Action.Submit",
    "data": {
    "msteams": {
         "type": "task/fetch"
               },
         "data": "value"
            },
    "title": "submit"
}
```
