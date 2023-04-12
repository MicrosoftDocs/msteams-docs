---
title: Sequential Workflows
description: In this module, learn about Sequential Workflows for Adaptive cards using Universal Actions with Code samples
author: surbhigupta12
ms.topic: conceptual
ms.localizationpriority: medium
---

# Sequential Workflows

Adaptive Cards now support Sequential Workflows that are updated on user action. Using Sequential Workflows, Adaptive Cards are updated on user action and user can progress through a series of cards that require user input. `Action.Execute` supports Sequential Workflows, which allows bot developers to return Adaptive Cards in response to a user action.

For example, take a scenario where the cafeteria wants to take an order for a team or channel. With `Action.Execute` the user's choice for various items, such as food and drinks can be recorded sequentially. User can also go back and forth through the cards as per the logic defined by the bot developer. <br/>

The following image shows the Sequential Workflow:

<img src="~/assets/images/bots/sequentialWorkflow.gif" alt="Sequential Workflow" width="400"/>

A user can progress through their workflow without modifying the card for other users. The workflow is also useful for conducting quizzes using sequential Adaptive Cards. The following image shows different users can be at different stages of the workflow and states of the card:

:::image type="content" source="~/assets/images/adaptive-cards/universal-bots-catering-bot.png" alt-text="Catering bot states" lightbox="../../../assets/images/adaptive-cards/universal-bots-catering-bot.png":::

> [!NOTE]
> In order to sync the user's progress across devices, use the `refresh` property in Adaptive Card JSON.

## Sequential Workflow for Adaptive Cards

The following code provides an example of Adaptive Cards:

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

`Action.Execute` invoking the bot can return Adaptive Cards as a response, which replaces the existing card in Teams.
The following example provides what the bot returns on food or drink selection or order confirmation:

* On food selection from Card 1, bot can return a card for selection of drinks that is Card 2.
* On drink selection from Card 2, bot can return an order confirmation card that is Card 3.
* On order confirmation from Card 3, bot can return an order confirmed card that is Card 4.

## Invoke request received on bot side

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

## Invoke response to return Adaptive Cards

The following code provides an example of an invoke response to return Adaptive Cards:

```C#
string cardJson = "<adaptive card json>";
var card = JsonConvert.DeserializeObject(cardJson);

var adaptiveCardResponse = JObject.FromObject(new
 {
    statusCode = 200,
    type = "application/vnd.microsoft.adaptive.card",
    value = card
 });
```

## Code samples

|Sample name | Description | .NET | Node.js | Manifest|
|----------------|-----------------|--------------|--------------|--------------|
| Teams catering bot | This sample shows a bot that accepts food order using Adaptive Cards. |[View](https://github.com/OfficeDev/Microsoft-Teams-Samples/tree/main/samples/bot-teams-catering/csharp)| NA | NA|
| Sequential Workflows Adaptive Cards | This sample shows how to implement Sequential Workflows, User Specific Views, and up to date Adaptive Cards in bots. | [View](https://github.com/OfficeDev/Microsoft-Teams-Samples/tree/main/samples/bot-sequential-flow-adaptive-cards/csharp) | [View](https://github.com/OfficeDev/Microsoft-Teams-Samples/tree/main/samples/bot-sequential-flow-adaptive-cards/nodejs) |[View](https://github.com/OfficeDev/Microsoft-Teams-Samples/tree/main/samples/bot-sequential-flow-adaptive-cards/csharp/demo-manifest/bot-adaptivecards-user-specific-views.zip)

## See also

* [Cards and task modules](../../cards-and-task-modules.md)
* [Adaptive Card actions in Teams](~/task-modules-and-cards/cards/cards-actions.md#adaptive-cards-actions)
* [How bots work](/azure/bot-service/bot-builder-basics?view=azure-bot-service-4.0&preserve-view=true)
* [Work with Universal Actions for Adaptive Cards](Work-with-universal-actions-for-adaptive-cards.md)
* [Form completion feedback](~/bots/how-to/conversations/conversation-messages.md#form-completion-feedback)
