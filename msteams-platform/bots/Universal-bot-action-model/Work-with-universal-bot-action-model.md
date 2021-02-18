---
title: Work with universal bot action model
description: Work with the universal bot action model.
ms.topic: conceptual
---

# Work with universal bot action model

A universal bot action model is implemented using the existing bot builder SDK. You can reuse your code. The main difference is that you can only use `adaptiveCard/action` invoke activities for your bots to be universal.

To work with universal bot action model and implement the `Action.Execute` model, follow these steps:

1. Use `Action.Execute` instead of `Action.Submit`. To update an existing scenario on Teams, replace all instances of `Action.Submit` with `Action.Execute`.
2. For cards to surface on Outlook, add the `originator` field, see [sample JSON](#sample-json).
3. Add a `refresh` clause to your adaptive card if you want to leverage the automatic refresh model or if your scenario requires contextual views. Be sure to specify the `userIds` property to identify which users get automatic updates.
4. Handle `adaptiveCard/action` Invoke requests in your bot.
5. Whenever your bot needs to return a new card as a result of processing an `Action.Execute`, you can use the Invoke request's context to generate cards that are specifically crafted for a given user. Make sure the response conforms to the [response format](#response-format).

This document covers the schema used for universal bot action model, JSON sample of `Action.Execute` command, refresh model, `adaptiveCard/action` invoke activity, and backward compatibility.

## Schema for universal bot action model

The universal bot action model is introduced in the adaptive cards schema version 1.4. To use these new capabilities, the adaptive card `version` property must be set to 1.4 or higher.

>[!NOTE]
> Setting the adaptive card `version` property to 1.4 or higher makes your adaptive card incompatible with older clients such as Outlook or Teams that do not support the universal bot action model.

If you use the `refresh` property, use the `Action.Execute` command, and specify a card version less than 1.4, the following issues occur:

| Client | Behavior |
| :-- | :-- |
| Outlook | Your card stops working. `refresh` is not honored and `Action.Execute` does not render or your card is rejected. |
| Teams | Your card stops working. `refresh` is not honored and the `Action.Execute` action does not render depending on the version of the Teams client. To ensure maximum compatibility in Teams, define your `Action.Execute` actions with an `Action.Submit` action in the fallback property. |

For more information, see [backward compatibility](#backward-compatibility).

Next you can work with the `Action.Execute` command and identify the differences between `Action.Execute`, `Action.Submit` and `Action.Http`.

### Action.Execute command

When authoring adaptive cards, use `Action.Execute` in place of both `Action.Submit` and `Action.Http`. The schema for `Action.Execute` is similar to that of `Action.Submit`.

#### Example JSON

The `Action.Execute` model includes the following JSON example:

```json
{
  "$schema": "http://adaptivecards.io/schemas/adaptive-card.json",
  "type": "AdaptiveCard",
  "version": "1.4",
  "body": [
    {
      "type": "TextBlock",
      "text": "Present a form and submit it back to the originator"
    },
    {
      "type": "Input.Text",
      "id": "firstName",
      "placeholder": "What is your first name?"
    },
    {
      "type": "Input.Text",
      "id": "lastName",
      "placeholder": "What is your last name?"
    },
    {
      "type": "ActionSet",
      "actions": [
        {
          "type": "Action.Execute",
          "title": "Submit",
          "verb": "personalDetailsFormSubmit",
          "fallback": "Action.Submit"
        }
      ]
    }
  ]
}
```

#### Properties

The `Action.Execute` model includes the following properties:

| Property | Type | Required | Description |
| :-- | :-- | :-- | :-- |
| type | `Action.Execute` | Yes | Must be `Action.Execute`. |
| verb | string | No | A convenience string used by developer to identify the action. |
| data | string, object | No | Initial data that input fields are combined with. These are essentially hidden properties. |
| title | string | No | Label for button or link that represents this action. |
| iconUrl | uri | No | Optional icon shown on the action along with the title. Supports data URI in adaptive cards version 1.2 or higher. |
| style | ActionStyle | No | Controls the style of an action, which influences how the action is displayed and spoken. |
| fallback | <action object>, "drop" | No | Describes what to do when `Action.Execute` is not supported by the client displaying the card. |
| requires | Dictionary<string> | No | A series of key or value pairs indicating features that the item requires depending on minimum version. When a feature is missing or is of a previous version, fallback is triggered. |

Now that you have identified the `Action.Execute` command and its properties, you can determine how the refresh model is used to create adaptive cards that update automatically.

## Refresh model

To automatically refresh your adaptive card, define its refresh property, which embeds an action of type `Action.Execute` and a `userIds` array. This model is defined with a sample JSON and the refresh object properties.

### Sample JSON

The refresh model includes the following JSON sample:

```json
{
  "$schema": "http://adaptivecards.io/schemas/adaptive-card.json",
  "type": "AdaptiveCard",
  "originator":"c9b4352b-a76b-43b9-88ff-80edddaa243b",
  "version": "1.4",
  "refresh": {
    "action": {
      "type": "Action.Execute",
      "title": "Submit",
      "verb": "personalDetailsCardRefresh"
    },
    "userIds": []
  },
  "body": [
    {
      "type": "TextBlock",
      "text": "Present a form and submit it back to the originator"
    },
    {
      "type": "Input.Text",
      "id": "firstName",
      "placeholder": "What is your first name?"
    },
    {
      "type": "Input.Text",
      "id": "lastName",
      "placeholder": "What is your last name?"
    },
    { 
      "type": "ActionSet",
      "actions": [
        {
          "type": "Action.Execute",
          "title": "Submit",
          "verb": "personalDetailsFormSubmit",
          "fallback": "Action.Submit"
        }
      ]
    }
  ]
}
```

### Properties

The refresh model includes the following properties:

| Property | Type | Required | Description |
| :-- | :-- | :-- | :-- |
| action | `Action.Execute` | Yes | This property must be an action instance of type `Action.Execute`. |
| userIds | Array<string> | Yes | This property is an array of `MRIs` of users for whom auto refresh must be enabled. |

>[!IMPORTANT]
> If the `userIds` list property is not included in the refresh section of the card, the card is not automatically refreshed. Instead, a button is displayed to the user to manually refresh the card. This is because channels in Teams can include a large number of members. If many members are all viewing the channel at the same time, an unconditional automatic refresh would result in many concurrent calls to the bot. To avoid this, the `userIds` property must always be included to identify which users must get an automatic refresh, with a maximum of five user IDs.

>[!NOTE]
> The `userIds` property is ignored in Outlook, and the refresh property is always automatically honored. There is no scale issue in Outlook because users view the card at different times.

>[!IMPORTANT]
> When developing Outlook actionable message scenarios, the adaptive card's `originator` property must be specified. `originator` is a Globally Unique Identifier (GUID) generated at the time a bot subscribes to the Outlook channel. It is used by Outlook to validate that the adaptive card was sent by an authorized bot. The adaptive card is not rendered in Outlook if `originator` is absent. `originator` is ignored in Teams.

Now you can work with the `adaptiveCard/action` invoke activity to understand what request needs to be made after the `Action.Execute` command is executed.

## `adaptiveCard/action` invoke activity

When `Action.Execute` is executed whether it is the refresh action or an action taken by selecting a button, a new type of Invoke activity `adaptiveCard/action` is made to your bot.

### Sample JSON

The sample JSON code provides a typical `adaptiveCard/action` invoke activity request and response.

#### Request format

The `adaptiveCard/action` invoke activity request includes the following JSON sample:

```json
{ 
  "type": "invoke",
  "name": "adaptiveCard/action",

  // ... other properties omitted for brevity

  "value": { 
    "action": { 
      "type": "Action.Execute", 
      "id": "abc", 
      "verb": "def",
      "data": { ... } 
    },
    "trigger": "automatic | manual" 
  }
}
```

#### Properties

The `adaptiveCard/action` invoke activity request includes the following properties:

| Field | Description |
| :-- | :-- |
| value.action | A copy of the action as defined in the adaptive card. Like with `Action.Submit`, the data property of the action includes the values of the various inputs in the card, if there are any. |
| value.trigger | Indicates if the action was triggered explicitly by the user selecting a button or implicitly through automatic refresh. |

#### Response format

If the bot processes an incoming `adaptiveCard/action Invoke` activity, the HTTP response's status code returned by the bot must be equal to 200. Also, the body of the HTTP response must be formatted to include the following:

```json
{
    "statusCode": <number (200 – 599)>,
    "type": "<string>",
    "value": "<object>"
}
```

#### Properties

The `adaptiveCard/action` invoke activity response includes the following properties:

| Field | Description |
| :-- | :-- |
| statusCode | An HTTP response status code of 200 does not necessarily mean the bot was able to successfully process the request. A client application must always look at the `statusCode` property in the response's body to know how the bot processed the request. `statusCode` is a number ranging from 200-599 that mirrors HTTP status code values and is meant to be a sub-status for the result of the bot processing the invoke. A missing, null, or undefined value for `statusCode` implies a 200 success. |
| type | A set of string constants that describe the expected shape of the value property. |
| value | An object that is specific to the type of response body. |

Now that you have worked on the `adaptiveCard/action` invoke activity you can determine backward compatibility requirements of the `Action.Execute` command in Outlook and Teams.

## Backward compatibility



### Outlook

The new `Action.Execute` universal action model is a departure from the `Action.Http` model currently used by Outlook actionable messages, where actions are encoded in the adaptive card as explicit HTTP calls. The `Action.Execute` model can be used to implement scenarios for both Outlook and Teams. Actionable message scenarios can either use the `Action.Http` model or the new `Action.Execute` model, but not both. Scenarios that use the universal `Action.Execute` model must be implemented as bots and subscribe to Outlook actionable messages channel.

>[!IMPORTANT]
> Scenarios implemented using the universal `Action.Execute` model are not compatible with older versions of Outlook.

### Teams

For your cards to be backward compatible and work for users on older versions of Teams, your `Action.Execute` actions must include a fallback property defined as an `Action.Submit`. Your bot must be coded in such a way that it can process both `Action.Execute` and `Action.Submit`.

>[!IMPORTANT]
> Some older Teams clients do not support fallback property when not wrapped in an `ActionSet`. It is recommended that you wrap all your `Action.Execute` in `ActionSet`.

The version property of the card is set to 1.2 and `Action.Execute` is defined with an `Action.Submit` as its fallback. When rendered in a Teams client that supports Adaptive Cards 1.4, the `Action.Execute` renders and works as expected. In Teams clients that do not support Adaptive Cards 1.4, the `Action.Submit` is rendered in place of `Action.Execute`.

```json
{
  "$schema": "http://adaptivecards.io/schemas/adaptive-card.json",
  "type": "AdaptiveCard",
  "version": "1.2",
  "body": [
    {
      "type": "TextBlock",
      "text": "Present a form and submit it back to the originator"
    },
    {
      "type": "Input.Text",
      "id": "firstName",
      "placeholder": "What is your first name?"
    },
    {
      "type": "Input.Text",
      "id": "lastName",
      "placeholder": "What is your last name?"
    },
    {
      "type": "ActionSet",
      "actions": [
        {
          "type": "Action.Execute",
          "title": "Submit",
          "verb": "personalDetailsFormSubmit",
          "fallback": {
            "Action.Submit",
            "title": "Submit"
          }  
        }
      ]
    }
  ]
}
```

## See also

* [Adaptive card actions in Teams](~/task-modules-and-cards/cards/cards-actions.md#adaptive-cards-actions)
* [How bots work](azure/bot-service/bot-builder-basics?view=azure-bot-service-4.0)
