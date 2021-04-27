---
title: Contextual or user specific views
description: Sample for user specific views using Universal Bot
author: surbhigupta12
ms.topic: conceptual
localization_priority: Normal
---

# Contextual or user specific views

Earlier if an Adaptive Card was sent in a Teams conversation, all users see the same card content. Here we are introducing universal actions for Adaptive Cards, which enables bot developers to provide contextual or user specific views to users. The same Adaptive Card can now refresh to a contextual or user specific Adaptive Card.

For example, Megan wants to create an incident and assign it to Alex. Also she wants everyone in the team to be aware about the incident. Megan uses Contoso incident reporting bot powered by universal actions for Adaptive Cards.

![user specific views](~/assets/images/bots/Rolebasedviews.png)

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
2. Now this card automatically refreshes to user specific view for Megan and Alex. Alex's and Megan's user MRIs are added in userIds property of refresh property of the Adaptive Card json.
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