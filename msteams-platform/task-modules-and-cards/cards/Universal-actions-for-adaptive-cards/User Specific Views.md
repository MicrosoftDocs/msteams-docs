---
title: User Specific Views
description: Sample for User Specific Views using Universal Actions
author: surbhigupta12
ms.topic: conceptual
localization_priority: Normal
---

# User Specific Views

Earlier if an Adaptive Card was sent in a Teams conversation, all users see the exact same card content. With the introduction of the Universal Actions model and `refresh` for Adaptive Cards, bot developers can now provide User Specific Views of Adaptive Cards to users. The same Adaptive Card can now refresh to a User Specific Adaptive Card.

For example, Megan, a safety inspector at Contoso, wants to create an incident and assign it to Alex. She also wants everyone in the team to be aware about the incident. Megan uses Contoso incident reporting message extension powered by Universal Actions for Adaptive Cards.

:::image type="content" source="~/assets/images/adaptive-cards/universal-bots-incident-management.png" alt-text="User Specific Views":::

## Sample Adaptive Card

The following code provides an example of an Adaptive Card:

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

**To send Adaptive Cards, refresh user specific view, and invoke requests to the bot**

1. When Megan creates a new incident, the bot sends the Adaptive Card or common card with incident details in the Teams conversation.
2. Now this card automatically refreshes to user specific view for Megan and Alex. Alex's and Megan's user MRIs are added in `userIds` property of `refresh` property of the Adaptive Card JSON.
3. The card remains the same for other users in the conversation.
4. For Megan, automatic refresh triggers an `adaptiveCard/action` invoke request to the bot. The bot can return an incident creator card with `Edit` button as a response to this invoke request.
5. Similarly for Alex, automatic refresh triggers another `adaptiveCard/action` invoke request to the bot. The bot can return an incident owner card `Resolve` button as a response to this invoke request.

## Sample invoke request sent from Teams client to the bot

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

## Sample adaptiveCard/action invoke response card

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

## Sample adaptiveCard/action invoke response card for Alex

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

## Sample invoke response to return an Adaptive Card

The following code provides an example of an invoke response to return an Adaptive Card:

```C#
string cardJson = "<adaptive card json>";
var card = JsonConvert.DeserializeObject(cardJson);

var adaptiveCardResponse = JObject.FromObject(new
 {
    statusCode = 200,
    type = "application/vnd.microsoft.card.adaptive",
    value = card
 });
```

Card design guidelines to keep in mind while designing User Specific Views:

* You can create a maximum of **60 User Specific Views** for a particular card being sent to a chat or channel by specifying their `userIds` in the `refresh` section.
* **Base Card:** The base version of the card that the bot developer sends to the chat. This is the version of the Adaptive Card for all users who are not specified in the `userIds` section.
* A message update or edit can be used to update the base card and simultaneously refresh the User Specific Card.

## See also

* [Work with Universal Actions for Adaptive Cards](Work-with-universal-actions-for-adaptive-cards.md)
* [Up to date views](Up To Date Views.md)
