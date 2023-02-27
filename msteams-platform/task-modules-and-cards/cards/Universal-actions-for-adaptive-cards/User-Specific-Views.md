---
title: User Specific Views
description: In this module, learn about User Specific Views using Universal Actions with Code Sample and adaptiveCard/action invoke response card
author: surbhigupta12
ms.topic: conceptual
ms.localizationpriority: medium
---

# User Specific Views

Earlier if Adaptive Cards were sent in a Teams conversation, all users would see the exact same card content. With the introduction of the Universal Actions model and `refresh` for Adaptive Cards, bot developers can now provide User Specific Views of Adaptive Cards to users. The same Adaptive Card can now refresh to a User Specific Adaptive Card. The Adaptive Card provides powerful scenarios like approvals, poll creator controls, ticketing, incident management, and project management cards.

> [!NOTE]
>
> * User Specific View is supported for Adaptive Cards sent by a bot and is dependent on Universal Actions.
> * Maximum 60 different users can see a different version of the card with additional information or actions.

For example, Megan, a safety inspector at Contoso, wants to create an incident and assign it to Alex. Megan also wants everyone in the team to be aware about the incident. Megan uses Contoso incident reporting message extension powered by Universal Actions for Adaptive Cards.

# [Mobile](#tab/mobile)

:::image type="content" source="~/assets/images/adaptive-cards/mobile-universal-bots-incident-management.jpg" alt-text="Mobile User Specific Views" lightbox="../../../assets/images/adaptive-cards/mobile-universal-bots-incident-management.jpg":::

# [Desktop](#tab/desktop)

:::image type="content" source="~/assets/images/adaptive-cards/universal-bots-incident-management.png" alt-text="User Specific Views" lightbox="../../../assets/images/adaptive-cards/universal-bots-incident-management.png":::

* * *

## User Specific Views for Adaptive Cards

The following code provides an example of Adaptive Cards:

```JSON
{
  "$schema": "http://adaptivecards.io/schemas/adaptive-card.json",
  "type": "AdaptiveCard",
  "originator":"c9b4352b-a76b-43b9-88ff-80edddaa243b",
  "version": "1.4",
  "refresh": {
    "action": {
      "type": "Action.Execute",
      "title": "Refresh",
      "verb": "editOrResolveView",
      "data": {
            "refresh info": "<refresh info>"
      }
    },
    "userIds": ["<Megan's user MRI>", "<Alex's user MRI>"]
  },
  "body": [
    {
      "type": "TextBlock",
      "text": "Incident 1234"
    },
    {
      "type": "TextBlock",
      "text": "Incident details: <incident details>"
    }
  ]
}
```

To send Adaptive Cards, refresh User Specific Views, and invoke requests to the bot:

1. When Megan creates a new incident, the bot sends the Adaptive Card or common card with incident details in the Teams conversation.
2. Now this card automatically refreshes to User Specific View for Megan and Alex. Alex's and Megan's user MRIs are added in `userIds` property of `refresh` property of the Adaptive Card JSON. The card remains the same for other users in the conversation.
3. For Megan, automatic refresh triggers an `adaptiveCard/action` invoke request to the bot. The bot can return an incident creator card with `Edit` button as a response to this invoke request.
4. Similarly for Alex, automatic refresh triggers another `adaptiveCard/action` invoke request to the bot. The bot can return an incident owner card `Resolve` button as a response to this invoke request.

## Invoke request sent from Teams client to the bot

The following code provides an example of an invoke request sent from Alex's and Megan's Teams client to the bot:

```JSON
{ 
  "type": "invoke",
  "name": "adaptiveCard/action",

  // ... other properties omitted for brevity

  "value": { 
    "action": { 
      "type": "Action.Execute", 
      "id": "", 
      "verb": "editOrResolveView",
      "data": { 
            "refresh info": "<refresh info>"
      } 
    },
    "trigger": "automatic" 
  }
}
```

## adaptiveCard/action invoke response card

The following code provides an example of an adaptiveCard/action invoke response card for Megan:

```JSON
{
  "$schema": "http://adaptivecards.io/schemas/adaptive-card.json",
  "type": "AdaptiveCard",
  "originator":"c9b4352b-a76b-43b9-88ff-80edddaa243b",
  "version": "1.4",
  "refresh": {
    "action": {
      "type": "Action.Execute",
      "title": "Refresh",
      "verb": "editOrResolveView"
    },
    "userIds": ["<Megan's user MRI>", "<Alex's user MRI>"]
  },
  "body": [
    {
      "type": "TextBlock",
      "text": "Incident 1234"
    },
    {
      "type": "TextBlock",
      "text": "Incident details: <incident details>"
    }
  ],
  "actions": [
    {
      "type": "Action.Execute",
      "title": "Edit",
      "verb": "edit",
      "data": {
            "additional info": "<additional info>",
            ...
      }
    }
  ]
}
```

## adaptiveCard/action invoke response card for Alex

The following code provides an example of an adaptiveCard/action invoke response card for Alex:

```JSON
{
  "$schema": "http://adaptivecards.io/schemas/adaptive-card.json",
  "type": "AdaptiveCard",
  "originator":"c9b4352b-a76b-43b9-88ff-80edddaa243b",
  "version": "1.4",
  "refresh": {
    "action": {
      "type": "Action.Execute",
      "title": "Refresh",
      "verb": "editOrResolveView"
    },
    "userIds": ["<Megan's user MRI>", "<Alex's user MRI>"]
  },
  "body": [
    {
      "type": "TextBlock",
      "text": "Incident 1234"
    },
    {
      "type": "TextBlock",
      "text": "Incident details: <incident details>"
    }
  ],
  "actions": [
    {
      "type": "Action.Execute",
      "title": "Resolve",
      "verb": "resolve",
      "data": {
            "additional info": "<additional info>",
            ...
      }
    }
  ]
}
```

## Invoke response to return Adaptive Cards

The following code provides an example of an invoke response to return Adaptive Cards:

### [C#](#tab/C)

```csharp
string cardJson = "<adaptive card json>";
var card = JsonConvert.DeserializeObject(cardJson);

var adaptiveCardResponse = JObject.FromObject(new
 {
    statusCode = 200,
    type = "application/vnd.microsoft.adaptive.card",
    value = card
 });
```

### [Node.js](#tab/nodejs)

```javascript
var card = "<adaptive card json>";
 
const cardRes = {
        statusCode: 200,
        type: 'application/vnd.microsoft.card.adaptive',
        value: card
    };
    const res = {
        status: 200,
        body: cardRes
    };
    return res;

```

***

The following list provides card design guidelines for User Specific Views:

* Refresh behavior: You can create a maximum of 60 User Specific Views for a particular card sent to a conversation by specifying their `userIds` in the `Refresh` property.

  * If the `userIds` field isn't specified in the `Refresh` property, Teams client can automatically trigger refresh for all users when there are less than or equal to 60 members in the conversation.

  * For users to manually trigger card refresh, they can select **Refresh** from the message options menu. This happens to all users when there are fewer than 60 members in a conversation, or to the set of users not specified in the `userIds` list when there are all or fewer than 60 users in a conversation.

* Base card: The bot sends the message, which embeds with the base version of the card. All members of the conversation can view the same. The bot later fetches the User Specific Card through refresh for the users specified in the `userIds` section.

* Refresh timeout: Teams client triggers a refresh in two ways, either through **Refresh** or by selecting **Execute**. The refresh triggers only if the card from the last invoke is older than a minute. You can control the refresh behavior by adding a timestamp to the data bag and checking it before sending the refreshed card.

* A message update can be used to update the base card and simultaneously refresh the User Specific Card. Opening the chat or channel also refreshes the card for users with **Refresh** enabled.

* For scenarios with larger groups where users switch to a view on action, which needs dynamic updates for responders, you can keep adding up to 60 users to the `userIds` list. You can remove the first responder from the list when the 61st user responds. For the users who get removed from the `userIds` list, you can provide a manual **Refresh** to get the latest result.

* Give prompt to the users to get a User Specific View, where they see only a particular view of the card or some actions.

> [!NOTE]
> The User Specific Card returned by the bot is sent only to the specific client that requested for it. For example, if a user switches to a different client, such as from desktop to mobile, then another invoke event is triggered to fetch the refreshed card.

## Code sample

|Sample name | Description | .NET | Node.js | Manifest
|----------------|-----------------|--------------|--------------|--------------|
| Sequential Workflows Adaptive Cards | This sample shows how to implement Sequential Workflows, User Specific Views, and up to date Adaptive Cards in bots. | [View](https://github.com/OfficeDev/Microsoft-Teams-Samples/tree/main/samples/bot-sequential-flow-adaptive-cards/csharp) | [View](https://github.com/OfficeDev/Microsoft-Teams-Samples/tree/main/samples/bot-sequential-flow-adaptive-cards/nodejs) | [View](https://github.com/OfficeDev/Microsoft-Teams-Samples/tree/main/samples/bot-sequential-flow-adaptive-cards/csharp/demo-manifest/bot-adaptivecards-user-specific-views.zip)
## See also

* [Cards and task modules](../../cards-and-task-modules.md)
* [Work with Universal Actions for Adaptive Cards](Work-with-Universal-Actions-for-Adaptive-Cards.md)
* [Up to date cards](Up-To-Date-Views.md)
* [Cards](../../what-are-cards.md)
* [Form completion feedback](../../../bots/how-to/conversations/conversation-messages.md#form-completion-feedback)
