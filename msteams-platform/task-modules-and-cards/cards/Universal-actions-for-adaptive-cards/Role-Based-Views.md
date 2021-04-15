---
title: Contextual or Role Base views
description: Sample for role based views using Universal Bot
ms.topic: conceptual
---

## Contextual or role based views
Earlier if an adaptive card was sent in a Teams conversation then all users see the same card content. Here we are introducing universal bots which enables bot developers to provide contextual or role based views to users. The same adaptive card can now refresh to a contextual or role based adaptive card.

Example: Megan wants to create an incident and assign it to Alex. Also she wants everyone in the team to be aware about the incident. Megan uses Contoso incident reporting bot powered by Universal bots.

![Role-based views](~/assets/images/bots/Rolebasedviews.png)

**Sample Card JSON**
```
{
  "$schema": "http://adaptivecards.io/schemas/adaptive-card.json",
  "type": "AdaptiveCard",
  "originator":"c9b4352b-a76b-43b9-88ff-80edddaa243b",
  "version": "1.4",
  "refresh": {
    "action": {
      "type": "Action.Execute",
      "title": "Refresh",
      "verb": "roleBasedViewCardRefresh",
      "data": {
              "refresh info": "<refresh info>"
    },
    "userIds": ["<Megan's userID>", "<Alex's userID>"]
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

1. When Megan creates a new incident, the bot sends the above adaptive card (common card) with incident details in the Teams conversation.
2. Now this card automatically refreshes to role based view for Megan and Alex. (Why? : Alex's and Megan's user id's are added in userIds property in refresh property of the adaptive card json)
3. The card remains the same for other users in the conversation.
4. For Megan, automatic refresh trigers an `adaptiveCard/action` invoke request to the bot. The bot can return an incident creator card with `Edit` button as a response to this invoke request. 
5. Similarly for Alex, automatic refresh trigers another `adaptiveCard/action` invoke request to the bot. The bot can return an incident owner card `Resolve` button as a response to this invoke request.


**Sample invoke request sent from Alex's and Megan's Teams Client to the bot**
```
{ 
  "type": "invoke",
  "name": "adaptiveCard/action",

  // ... other properties omitted for brevity

  "value": { 
    "action": { 
      "type": "Action.Execute", 
      "id": "", 
      "verb": "roleBasedViewCardRefresh",
      "data": { 
            "refresh info": "<refresh info>"
      } 
    },
    "trigger": "automatic" 
  }
}
```

**Sample adaptiveCard/action invoke response Card JSON for Megan**
```
{
  "$schema": "http://adaptivecards.io/schemas/adaptive-card.json",
  "type": "AdaptiveCard",
  "originator":"c9b4352b-a76b-43b9-88ff-80edddaa243b",
  "version": "1.4",
  "refresh": {
    "action": {
      "type": "Action.Execute",
      "title": "Refresh",
      "verb": "roleBasedViewCardRefresh"
    },
    "userIds": ["<Megan's userID>", "<Alex's userID>"]
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

**Sample adaptiveCard/action invoke response Card JSON for Alex**
```
{
  "$schema": "http://adaptivecards.io/schemas/adaptive-card.json",
  "type": "AdaptiveCard",
  "originator":"c9b4352b-a76b-43b9-88ff-80edddaa243b",
  "version": "1.4",
  "refresh": {
    "action": {
      "type": "Action.Execute",
      "title": "Refresh",
      "verb": "roleBasedViewCardRefresh"
    },
    "userIds": ["<Megan's userID>", "<Alex's userID>"]
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

**Sample invoke response to return adaptive card**
```
string cardJson = "<adaptive card json>";
var card = JsonConvert.DeserializeObject(cardJson);

var adaptiveCardResponse = JObject.FromObject(new
 {
    statusCode = 200,
    type = "application/vnd.microsoft.card.adaptive",
    value = card
 });
```