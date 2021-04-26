---
title: Sequential workflows
description: Sample for sequential workflow using Universal Bot
author: surbhigupta12
ms.topic: conceptual
localization_priority: Normal
---

# Sequential workflows

Sequential workflow is when an Adaptive Card is updated on user action and user can progress through a series of cards. This is supported through `Action.Execute` which enables bot developers to return an Adaptive Card in response to a user action.

For example, take a scenario where a restaurant wants to take an order. With `Action.Execute` the user's choice for various items, such as food, drinks and so on, can be recorded sequentially. <br/>

<img src="~/assets/images/bots/sequentialWorkflow.gif" alt="Sequential workflow" width="400"/>

A user can progress through their workflow without modifying the card for other users. As shown in the below image, different users could be at different stages of the workflow and they see different states of the card.

![Catering bot states](~/assets/images/bots/Cateringbotstates.png)
Note: In order to sync the user's progress across devices, please use the refresh property in adaptive card JSON. 

## Sample Adaptive Card

The following code provides an example of an Adaptive Card:

```JSON
{
  "$schema": "http://adaptivecards.io/schemas/adaptive-card.json",
  "type": "AdaptiveCard",
  "version": "1.4",
  "body": [
    {
      "type": "TextBlock",
      "text": "Select from food options"
    },
    { 
      "type": "ActionSet",
      "actions": [
        {
          "type": "Action.Execute",
          "title": "Chicken",
          "verb": "food",
          "data": {
              "item": "chicken"
          }
        },
        {
          "type": "Action.Execute",
          "title": "Beef",
          "verb": "food",
          "data": {
              "item": "beef"
          }
        },
        {
          "type": "Action.Execute",
          "title": "Vegan",
          "verb": "food",
          "data": {
              "item": "vegan"
          }
        }
      ]
    }
  ]
}
```

`Action.Execute` invoking the bot can return an Adaptive Card as a response, which replaces the existing card in Teams.
The following example provides what the bot returns on food or drink selection or order confirmation:

* On food selection from Card 1, bot can return a card for selection of drinks that is Card 2. 
* On drink selection from Card 2, bot can return an order confirmation card that is Card 3.
* On order confirmation from Card 3, bot can return an order confirmed card that is Card 4.

## Sample invoke request received on bot side

The following code provides an example of an invoke request received on bot side:

```JSON
{ 
  "type": "invoke",
  "name": "adaptiveCard/action",

  // ... other properties omitted for brevity

  "value": { 
    "action": { 
      "type": "Action.Execute", 
      "id": "", 
      "verb": "food",
      "data": { 
            "item": "vegan"
      } 
    },
    "trigger": "manual" 
  }
}
```

## Sample invoke response to return Adaptive Card

The following code provides an example of an invoke response to return Adaptive Card:

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

## See also

* [Adaptive Card actions in Teams](~/task-modules-and-cards/cards/cards-actions.md#adaptive-cards-actions)
* [How bots work](/azure/bot-service/bot-builder-basics?view=azure-bot-service-4.0&preserve-view=true)
