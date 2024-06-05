---
title: Add card actions in a bot
description: Learn what are card actions in Microsoft Teams, action types and how to use them in your bots.
ms.localizationpriority: medium
ms.topic: conceptual
ms.date: 05/04/2023
---

# Card actions

Cards used by bots and message extensions in Microsoft Teams support the following activity [`CardAction`](/bot-framework/dotnet/bot-builder-dotnet-add-rich-card-attachments#process-events-within-rich-cards) types:

> [!NOTE]
> The `CardAction` actions differ from `potentialActions` for connector cards for Microsoft 365 Groups when used from connectors.

| Type | Action |
| --- | --- |
| `openUrl` | Opens a URL in the default browser. |
| `messageBack` | Sends a message and payload to the bot from the user who selected the button or tapped the card. Sends a separate message to the chat stream. |
| `imBack`| Sends a message to the bot from the user who selected the button or tapped the card. This message from user to bot is visible to all conversation participants. |
| `invoke` | Sends a message and payload to the bot from the user who selected the button or tapped the card. This message isn't visible. |
| `signin` | Initiates OAuth flow, allowing bots to connect with secure services. |

> [!NOTE]
>
>* Teams does not support `CardAction` types not listed in the previous table.
>* Teams does not support the `potentialActions` property.
>* Card actions are different than [suggested actions](/azure/bot-service/bot-builder-howto-add-suggested-actions?view=azure-bot-service-4.0&tabs=javascript#suggest-action-using-button&preserve-view=true) in Bot Framework or Azure Bot Service.
>* If you are using a card action as part of a message extension, the actions do not work until the card is submitted to the channel. The actions do not work while the card is in the compose message box.

## Action type openUrl

`openUrl` action type specifies a URL to launch in the default browser.

> [!NOTE]
>
> * Your bot doesn't receive any notice on which button was selected.
> * URLs don't support machine names that include numbers. For example, a hostname such as *userhostname123* isn't supported.

With `openUrl`, you can create an action with the following properties:

| Property | Description |
| --- | --- |
| `title` | Appears as the button label. |
| `value` | This field must contain a full and properly formed URL. |

# [JSON](#tab/json)

The following code shows an example of `openUrl` action type in JSON:

```json
{
    "type": "openUrl",
    "title": "Tabs in Teams",
    "value": "https://msdn.microsoft.com/microsoft-teams/tabs"
}
```

# [C#](#tab/csharp)

The following code shows an example of `openUrl` action type in C#:

```csharp
var button = new CardAction()
{
    Type = ActionTypes.OpenUrl,
    Title = "Tabs in Teams",
    Value = "https://learn.microsoft.com/microsoftteams/platform/"
};
```

# [JavaScript/Node.js](#tab/javascript)

The following code shows an example of `openUrl` action type in JavaScript:

```javascript
CardFactory.actions([
{
    type: 'openUrl',
    title: 'Tabs in Teams',
    value: 'https://learn.microsoft.com/microsoftteams/platform/'
}])
```

---

## Action type messageBack

With `messageBack`, you can create a fully customized action with the following properties:

| Property | Description |
| --- | --- |
| `title` | Appears as the button label. |
| `displayText` | Optional. Used by the user in the chat stream when the action is performed. This text isn't sent to your bot. |
| `value` | Sent to your bot when the action is performed. You can encode context for the action, such as unique identifiers or a JSON object. |
| `text` | Sent to your bot when the action is performed. Use this property to simplify bot development. Your code can check a single top-level property to dispatch bot logic. |

The flexibility of `messageBack` means that your code can't leave a visible user message in the history simply by not using `displayText`.

# [JSON](#tab/json)

The following code shows an example of `messageBack` action type in JSON:

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

# [C#](#tab/csharp)

The following code shows an example of `messageBack` action type in C#:

```csharp
var button = new CardAction()
{
    Type = ActionTypes.MessageBack,
    Title = "My MessageBack button",
    DisplayText = "I clicked this button",
    Text = "User just clicked the MessageBack button",
    Value = "{\"property\": \"propertyValue\" }"
};
```

# [JavaScript/Node.js](#tab/javascript)

The following code shows an example of `messageBack` action type in JavaScript:

```javascript
CardFactory.actions([
{
    type: 'messageBack',
    title: "My MessageBack button",
    displayText: "I clicked this button",
    text: "User just clicked the MessageBack button",
    value: {property: "propertyValue" }
}])
```

---

### Inbound message example

`replyToId` contains the ID of the message that the card action came from. Use it if you want to update the message.

The following code shows an example of inbound message:

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

## Action type imBack

The `imBack` action triggers a return message to your bot, as if the user typed it in a normal chat message. Your user and all other users in a channel can see the button response.

With `imBack`, you can create an action with the following properties:

| Property | Description |
| --- | --- |
| `title` | Appears as the button label. |
| `value` | This field must contain the text string used in the chat and therefore sent back to the bot. This is the message text you process in your bot to perform the desired logic. |

> [!NOTE]
> The `value` field is a simple string. There is no support for formatting or hidden characters.

# [JSON](#tab/json)

The following code shows an example of `imBack` action type in JSON:

```json
{
    "type": "imBack",
    "title": "More",
    "value": "Show me more"
}
```

# [C#](#tab/csharp)

The following code shows an example of `imBack` action type in C#:

```csharp
var button = new CardAction()
{
    Type = ActionTypes.ImBack,
    Title = "More",
    Value = "Show me more"
};
```

# [JavaScript/Node.js](#tab/javascript)

The following code shows an example of `imBack` action type in JavaScript:

```javascript
CardFactory.actions([
{
    type: "imBack",
    title: "More",
    value: "Show me more"
}])
```

---

## Action type invoke

The `invoke` action is used for invoking [dialogs (referred as task modules in TeamsJS v1.x)](~/task-modules-and-cards/task-modules/task-modules-bots.md).

The `invoke` action contains three properties, `type`, `title`, and `value`.

With `invoke`, you can create an action with the following properties:

| Property | Description |
| --- | --- |
| `title` | Appears as the button label. |
| `value` | This property can contain a string, a stringified JSON object, or a JSON object. |

# [JSON](#tab/json)

The following code shows an example of `invoke` action type in JSON:

```json
{
    "type": "invoke",
    "title": "Option 1",
    "value": {
        "option": "opt1"
    }
}
```

When a user selects the button, your bot receives the `value` object with some additional information.

> [!NOTE]
> The activity type is `invoke` instead of `message` that is `activity.Type == "invoke"`.

# [C#](#tab/csharp)

The following code shows an example of `invoke` action type in C#:

```csharp
var button = new CardAction()
{
    Title = "Option 1",
    Type = "invoke",
    Value = "{\"option\": \"opt1\"}"
};
```

# [JavaScript/Node.js](#tab/javascript)

The following code shows an example of `invoke` action type in Node.js:

```javascript
CardFactory.actions([
{
    type: "invoke",
    title: "Option 1",
    value: {
        option: "opt1"
    }
}])
```

---

### Example of incoming invoke message

The top-level `replyToId` property contains the ID of the message that the card action came from. Use it if you want to update the message.

The following code shows an example of incoming invoke message:

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

## Action type sign-in

`signin` action type initiates an OAuth flow that permits bots to connect with secure services. For more information, see [authentication flow in bots](~/bots/how-to/authentication/auth-flow-bot.md).

Teams also supports [Adaptive Cards actions](#adaptive-cards-actions) that are only used by Adaptive Cards.

# [JSON](#tab/json)

The following code shows an example of `signin` action type in JSON:

```json
{
"type": "signin",
"title": "Click me for signin",
"value": "https://signin.com"
}
```

# [C#](#tab/csharp)

The following code shows an example of `signin` action type in C#:

```csharp
var button = new CardAction()
{
    Type = ActionTypes.Signin,
    Title = "Click me for signin",
    Value = "https://signin.com"
};
```

# [JavaScript/Node.js](#tab/javascript)

The following code shows an example of `signin` action type in JavaScript:

```javascript
CardFactory.actions([
{
    type: "signin",
    title: "Click me for signin",
    value: "https://signin.com"
}])
```

---

## Adaptive Cards actions

Adaptive Cards support four action types:

* [Action.OpenUrl](https://adaptivecards.io/explorer/Action.OpenUrl.html): Open the specified url.
* [Action.Submit](https://adaptivecards.io/explorer/Action.Submit.html): Sends the result of the submit action to the bot.
* [Action.ShowCard](https://adaptivecards.io/explorer/Action.ShowCard.html): Invokes a dialog and renders the sub-card into that dialog. You only need to handle this if `ShowCardActionMode` is set to popup.
* [Action.ToggleVisibility](https://adaptivecards.io/explorer/Action.ToggleVisibility.html): Shows or hides one or more elements in the card.
* [Action.Execute](/adaptive-cards/authoring-cards/universal-action-model#actionexecute): Gathers the input fields, merges with optional data field, and sends an event to the client.

### Action.Submit

`Action.Submit` type is used to gather the input, combine the `data` properties, and send an event to the bot. When a user selects the submit action, Teams sends a message activity to the bot, which includes the user's input in key-value pairs for all input fields and hidden data that is defined in the card payload.

In the Adaptive Card schema, the `data` property for Action.Submit is either a `string` or an `object`. A submit action behaves differently for each data property:

* `string`: A string submit action automatically sends a message from the user to the bot and is visible in the conversation history.
* `object`: An object submit action automatically sends an invisible message from the user to the bot that contains hidden data. An object submit action populates the activity’s value property while the text property is empty.

Action.Submit is equivalent to the Bot Framework actions. You can also modify the Adaptive Card `Action.Submit` payload to support existing Bot Framework actions using an `msteams` property in the `data` object of `Action.Submit`. When you define the `msteams` property under `data`, the Teams client defines the behavior of `Action.Submit`. If the `msteams` property isn't defined in the schema, `Action.Submit` works like a regular Bot Framework invoke action, where; the submit action triggers an invoke call to the bot and the bot receives the payload with all the input values defined in the input fields.

> [!NOTE]
>
>* The bot doesn’t receive user input unless the user submits their actions in the Adaptive Card through a button, such as **Save** or **Submit**. For example, the bot doesn't consider user actions, such as selecting an option from multiple choices or filling out fields in a form, as inputs unless the user submits them.
>* Adding `msteams` to data with a Bot Framework action doesn't work with an Adaptive Card dialog.
>* Primary or destructive `ActionStyle` isn't supported in Teams.
>* Your app has five seconds to respond to the invoke message.

#### Example

The following is an example of an `Action.Submit` card payload:

The payload consists of a text input field `"id": "text-1"` and hidden data payload `"hiddenKey": 123.45`.

```json
{
  "$schema": "http://adaptivecards.io/schemas/adaptive-card.json",
  "type": "AdaptiveCard",
  "version": "1.5",
  "fallbackText": "fallback text for sample 01",
  "speak": "This is adaptive card sample 1",
  "body": [
    {
      "type": "Container",
      "items": [
        {
          "id": "text-1",
          "type": "Input.Text"
        }
      ]
    }
  ],
  "actions": [
    {
      "type": "Action.Submit",
      "data": {
        "hiddenKey": 123.45
      }
    }
  ]
}
```

:::image type="content" source="../../assets/images/adaptive-cards/adaptive-card-action-submit.png" alt-text="Screenshot shows an example of an Adaptive Card with the submit button.":::

The following is an example of the incoming activity to a bot when user types something in the input field and selects **Submit**. The `value` attribute includes the user's input in the `text-1` property and a hidden data payload in the `hiddenKey` property:

 ```json
 
{
  "type": "message",
  "timestamp": "2023-07-18T23:45:41.699Z",
  "localTimestamp": "2023-07-18T16:45:41.699-07:00",
  "id": "f:9eb18f56-2259-8fa4-7dfc-111ffff58e67",
  "channelId": "msteams",
  "serviceUrl": "https://smba.trafficmanager.net/amer/",
  "from": {
    "id": "29:1E0NZYNZFQOCUI8zM9NY_EhlCsWgNbLGTHUNdBVX2ob8SLjhltEhQMPi07Gr6MLScFeS8SrKH1WGvJSiVKThnyw",
    "name": "Robin Liao",
    "aadObjectId": "97b1ec61-45bf-453c-9059-6e8984e0cef4"
  },
  "conversation": {
    "conversationType": "personal",
    "tenantId": "72f988bf-86f1-41af-91ab-2d7cd011db47",
    "id": "a:1H-RowZ3FrIheyjTupPnoCC6JvOLB5pCWms1xwqvAJG97j61D18EuSennYZE6tyfbQrnfIN3uIcwpOx73mg10hHp_uoTMMQlXhXosIu_q7QVCaYiW6Ch3bPWAitUw4aSX"
  },
  "recipient": {
    "id": "28:159e1c0f-15ef-4597-a8c6-44ba1fd89b78",
    "name": "Mushroom"
  },
  "entities": [
    {
      "locale": "en-US",
      "country": "US",
      "platform": "Web",
      "timezone": "America/Los_Angeles",
      "type": "clientInfo"
    }
  ],
  "channelData": {
    "tenant": {
      "id": "72f988bf-86f1-41af-91ab-2d7cd011db47"
    },
    "source": {
      "name": "message"
    },
    "legacy": {
      "replyToId": "1:1XFuAl7wF96vl6iAQk9tqus0uFrB89uujGpld-Qm-XEw"
    }
  },
  "replyToId": "1689723936016",
  "value": {
    "hiddenKey": 123.45,
    "text-1": "HELLO"
  },
  "locale": "en-US",
  "localTimezone": "America/Los_Angeles"
}
 ```

The next section provides details on how to use existing Bot Framework actions with Adaptive Cards.

#### Form completion feedback

You can build form completion feedback using an Adaptive Card. Form completion message appears in Adaptive Cards while sending a response to the bot. The message can be of two types, error or success:

* **Error**: When a response sent to the bot is unsuccessful, **Something went wrong, Try again** message appears. The error occurs due to various reasons, such as:
  * Too many requests
  * Multiple concurrent operations on the same conversation
  * Service dependency issue
  * Gateway Timeout

     :::image type="content" source="../../assets/images/Cards/error-message.png" alt-text="Screenshot shows an Error message in an Adaptive Card."  :::

* **Success**: When a response sent to the bot is successful, **Your response was sent to the app** message appears.

     :::image type="content" source="../../assets/images/Cards/success.PNG" alt-text="Screenshot shows a success message in an Adaptive Card.":::

     You can select **Close** or switch chat to dismiss the message.

     If you don't want to display the success message, set the attribute `hide` to `true` in the `msTeams` `feedback` property. Following is an example:

     ```json
        "content": {
            "type": "AdaptiveCard",
            "title": "Card with hidden footer messages",
            "version": "1.0",
            "actions": [
            {
                "type": "Action.Submit",
                "title": "Submit",
                "msTeams": {
                    "feedback": {
                    "hide": true
                    }
                }
            }
            ]
        } 
     ```

For more information on cards and cards in bots, see [cards documentation](~/task-modules-and-cards/what-are-cards.md).

### Adaptive Cards with messageBack action

To include a `messageBack` action with an Adaptive Card, include the following details in the `msteams` object:

> [!NOTE]
> You can include additional hidden properties in the `data` object, if required.

| Property | Description |
| --- | --- |
| `type` | Set to `messageBack`. |
| `displayText` | Optional. Used by the user in the chat stream when the action is performed. This text isn't sent to your bot. |
| `value` | Sent to your bot when the action is performed. You can encode context for the action, such as unique identifiers or a JSON object. |
| `text` | Sent to your bot when the action is performed. Use this property to simplify bot development. Your code can check a single top-level property to dispatch bot logic. |

The following code shows an example of Adaptive Cards with `messageBack` action:

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

To include an `imBack` action with an Adaptive Card, include the following details in the `msteams` object:

> [!NOTE]
> You can include additional hidden properties in the `data` object, if required.

| Property | Description |
| --- | --- |
| `type` | Set to `imBack`. |
| `value` | String that needs to be echoed back in the chat. |

The following code shows an example of Adaptive Cards with `imBack` action:

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

### Adaptive Cards with sign-in action

To include a `signin` action with an Adaptive Card, include the following details in the `msteams` object:

> [!NOTE]
> You can include additional hidden properties in the `data` object, if required.

| Property | Description |
| --- | --- |
| `type` | Set to `signin`. |
| `value` | Set to the URL where you want to redirect.  |

The following code shows an example of Adaptive Cards with `signin` action:

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

To include an `invoke` action with an Adaptive Card, include the following details in the `msteams` object:

> [!NOTE]
> You can include additional hidden properties in the `data` object, if required.

| Property | Description |
| --- | --- |
| `type` | Set to `task/fetch`. |
| `data` | Set the value.  |

The following code shows an example of Adaptive Cards with `invoke` action:

```json
{
  "type": "Action.Submit",
  "title": "submit",
  "data": {
    "msteams": {
        "type": "task/fetch"
    }
  }
}
```

| Property | Description |
| --- | --- |
| `type` | Set to `invoke`. |
| `value` | Set the value to display. |

The following code shows an example of Adaptive Cards with `invoke` action with additional payload data:

```json
[
  {
    "type": "Action.Submit",
    "title": "submit with object value",
    "data": {
      "ab": "xy",
      "msteams": {
        "type": "invoke",
        "value": { "a": "b" }
      }
    }
  },
  {
    "type": "Action.Submit",
    "title": "submit with stringified json value",
    "data": {
      "ab": "xy",
      "msteams": {
        "type": "invoke",
        "value": "{ \"a\": \"b\"}"
      }
    }
  }
]
```

## Code samples

|S.No.|Card| Description|.NET|Node.js|Python|Java|Manifest|
|:--|:--|:--------------------------------------------------------|-----|------------|-----|----------------------------|------|
|1|Adaptive Card actions|This sample showcases different actions supported in Adaptive Cards.|[View](https://github.com/OfficeDev/Microsoft-Teams-Samples/tree/main/samples/bot-adaptive-card-actions/csharp)|[View](https://github.com/OfficeDev/Microsoft-Teams-Samples/tree/main/samples/bot-adaptive-card-actions/nodejs)|NA|NA|[View](https://github.com/OfficeDev/Microsoft-Teams-Samples/blob/main/samples/bot-adaptive-card-actions/csharp/demo-manifest/bot-adaptivecard-actions.zip)|
|2|Using cards|Introduces all card types including thumbnail, audio, media etc. Builds on Welcoming user + multi-prompt bot by presenting a card with buttons in welcome message that route to appropriate dialog.|[View](https://github.com/microsoft/BotBuilder-Samples/blob/main/samples/csharp_dotnetcore/06.using-cards)|[View](https://github.com/microsoft/BotBuilder-Samples/blob/main/samples/javascript_nodejs/06.using-cards)|[View](https://github.com/microsoft/BotBuilder-Samples/blob/main/samples/python/06.using-cards)|[View](https://github.com/microsoft/BotBuilder-Samples/blob/main/samples/java_springboot/06.using-cards)|NA|
|3|Adaptive cards|Demonstrates how the multi-turn dialog can use a card to get user input for name and age.|[View](https://github.com/microsoft/BotBuilder-Samples/blob/main/samples/csharp_dotnetcore/07.using-adaptive-cards)|[View](https://github.com/microsoft/BotBuilder-Samples/blob/main/samples/javascript_nodejs/07.using-adaptive-cards)|[View](https://github.com/microsoft/BotBuilder-Samples/blob/main/samples/python/07.using-adaptive-cards)|[View](https://github.com/microsoft/BotBuilder-Samples/blob/main/samples/java_springboot/07.using-adaptive-cards)|NA|

> [!NOTE]
> Media elements aren't supported for Adaptive Card in Teams.

## Next step

> [!div class="nextstepaction"]
> [Universal Actions for Adaptive Cards](../cards/Universal-actions-for-adaptive-cards/Overview.md)

## See also

* [Cards reference](./cards-reference.md)
* [Types of cards](cards-reference.md)
* [Use dialogs from bots](~/task-modules-and-cards/task-modules/task-modules-bots.md)
* [Adaptive Cards in bots](../../bots/how-to/conversations/conversation-messages.md#adaptive-cards)
* [Adaptive Card-based Loop component](../../m365-apps/cards-loop-component.md)
