---
title: Work with universal bot action model
description: Work with the universal bot action model.
ms.topic: conceptual
---

# Work with universal bot action model

A universal bot action model is implemented using the existing bot builder SDK. You can reuse your code from bot builder SDK that is specific to `adaptiveCard/action` invoke activities for your bots to be universal. This document covers the following:

* [Schema used for universal bot action model](#schema-for-universal-bot-action-model)
* [Refresh model](#refresh-model)
* [`adaptiveCard/action` invoke activity](#adaptivecardaction-invoke-activity)
* [Backward compatibility](#backward-compatibility)

**To work with universal bot action model and implement the `Action.Execute` command**

1. Replace all instances of `Action.Submit` with `Action.Execute` to update an existing scenario on Teams.
2. Add the `originator` field for cards to surface on Outlook.
3. Add a `refresh` clause to your adaptive card, if you want to leverage the automatic refresh model or if your scenario requires contextual views.

    >[!NOTE]
    > Specify the `userIds` property to identify, which users get automatic updates.

4. Handle `adaptiveCard/action` invoke requests in your bot.
5. Use the Invoke request's context to generate cards that are specifically created for a user.
 
    > [!NOTE]
    > Whenever your bot returns a new card as a result of processing an `Action.Execute`, the response must conform to the [response format](#response-format).

## Schema for universal bot action model

The universal bot action model is introduced in the adaptive cards schema version 1.4. To use the adaptive card effectively, the `version` property of your adaptive card must be set to 1.4 or higher.

> [!NOTE]
> Setting the `version` property to 1.4 makes your adaptive card incompatible with older clients of the platforms or applications, such as Outlook and Teams, as they do not support the universal bot action model.

If you set the card version to less than 1.4 and use either or both, `refresh` property and the `Action.Execute` command the following happens:

| Client | Behavior |
| :-- | :-- |
| Outlook | Your card stops working. Card is not refreshed and `Action.Execute` does not render or your card is rejected. |
| Teams | Your card stops working. Card is not refreshed and the `Action.Execute` action does not render depending on the version of the Teams client. To ensure maximum compatibility in Teams, define your `Action.Execute` actions with an `Action.Submit` action in the fallback property. |

For more information on how to support older clients, see [backward compatibility](#backward-compatibility).

### Action.Execute command

When authoring adaptive cards, replace `Action.Submit` and `Action.Http` with `Action.Execute`. The schema for `Action.Execute` is similar to that of `Action.Submit`. See the following JSON example:

#### Sample JSON

The schema for `Action.Execute` request is as follows:

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

The schema for `Action.Execute` includes the following properties:

| Property | Type | Required | Description |
| :-- | :-- | :-- | :-- |
| type | `Action.Execute` | Yes | This property must be `Action.Execute`. |
| verb | string | No | This property is a convenience string used to identify the action. |
| data | string, object | No | This property includes initial data that input fields are combined with. These are essentially hidden properties. |
| title | string | No | This property is a label for button or link that represents the action. |
| iconUrl | uri | No | This property is an optional icon shown on the action along with the title. Supports data URI in adaptive cards version 1.2 or higher. |
| style | ActionStyle | No | This property controls the style of an action, which influences how the action is displayed and spoken. |
| fallback | <action object>, "drop" | No | This property describes what to do when `Action.Execute` is not supported by the client displaying the card. |
| requires | Dictionary<string> | No | This property is a series of key or value pairs indicating features that the item requires depending on minimum version. When a feature is missing or is of a previous version, fallback is triggered. |

Now you can use the refresh model to allow adaptive cards to update automatically.

## Refresh model

To automatically refresh your adaptive card, define its `refresh` property, which embeds an action of type `Action.Execute` and an `userIds` array. This model is defined with a sample JSON and the refresh object properties.

### Sample JSON

The schema for refresh model request is as follows:

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

> [!IMPORTANT]
> If the `userIds` list property is not included in the refresh section of the card, the card is not automatically refreshed. Instead, a button is displayed to the user to manually refresh the card. This is because channels in Teams can include a large number of members. If all members are viewing the channel at the same time, an unconditional automatic refresh results in many concurrent calls to the bot. To avoid this, the `userIds` property must always be included to identify which users must get an automatic refresh, with a maximum of five user IDs.

> [!NOTE]
> The `userIds` property is ignored in Outlook, and the refresh property is always automatically activated. There is no scale issue in Outlook because users view the card at different times.

> [!IMPORTANT]
> When developing Outlook actionable message scenarios, the adaptive card's `originator` property must be specified. `originator` is a Globally Unique Identifier (GUID) generated at the time a bot subscribes to the Outlook channel. It is used by Outlook to validate that the adaptive card was sent by an authorized bot. The adaptive card is not rendered in Outlook if `originator` is absent. `originator` is ignored in Teams.

Next step is to use the `adaptiveCard/action` invoke activity to understand what request must be made after the `Action.Execute` command is executed.

## `adaptiveCard/action` invoke activity

When `Action.Execute` is executed in the client, a new type of Invoke activity `adaptiveCard/action` is made to your bot.

### Sample JSON

The sample JSON code provides a typical `adaptiveCard/action` invoke activity request and response.

#### Request format

The `adaptiveCard/action` invoke activity request is as follows:

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

| Property | Description |
| :-- | :-- |
| value.action | This property is a copy of the action as defined in the adaptive card. With `Action.Submit`, the data property of the action includes the values of the various inputs in the card, if any. |
| value.trigger | This property indicates if the action is triggered explicitly by the user selecting a button or implicitly through automatic refresh. |

#### Response format

If the bot processes an incoming `adaptiveCard/action Invoke` activity, the HTTP response's status code returned by the bot must be equal to `200`. Also, the body of the HTTP response must be formatted to include the following:

```json
{
    "statusCode": <number (200 – 599)>,
    "type": "<string>",
    "value": "<object>"
}
```

#### Properties

The `adaptiveCard/action` invoke activity response includes the following properties:

| Property | Description |
| :-- | :-- |
| statusCode | This property is an HTTP response status code. A status of `200` does not mean that the bot successfully processed the request. <br/><br/> A client application must always look at the `statusCode` property in the response's body to know how the bot processed the request. `statusCode` is a number ranging from 200-599 that mirrors HTTP status code values and is meant to be a sub-status for the result of the bot processing the invoke. A missing, null, or undefined value for `statusCode` implies a `200` success. |
| type | This property is a set of string constants that describe the expected shape of the value property. |
| value | This property is an object that is specific to the type of response body. |

Next you can apply backward compatibility to older clients across different platforms and make your adaptive card compatible.

## Backward compatibility

The universal bot action model allows you to set properties that enable backward compatibility with older versions of Outlook and Teams.

### Outlook

Actionable messages in Outlook can either use the existing model or the universal bot action model. If you are using the existing model, the actions are encoded as explicit HTTP calls and use the `Action.Http` command to implement the adaptive card scenarios. If you use the universal bot action model, the `Action.Execute` command must be implemented as bots and subscribe to Outlook actionable messages channel.

### Teams

To ensure backward compatibility of your adaptive cards with older versions of Teams, you must include the `fallback` property and set its value to `Action.Submit`. Also, your bot code must process both `Action.Execute` and `Action.Submit`.

> [!IMPORTANT]
> It is recommended that you wrap your `Action.Execute` in type `ActionSet`, as some older Teams clients do not support `fallback` property if it is not wrapped in an `ActionSet`.

> [!NOTE]
> * If the `version` property of the card is set to 1.2, `Action.Execute` is defined with an `Action.Submit` as its fallback. 
> * When rendered in a Teams client that supports adaptive cards 1.4, the `Action.Execute` command works as expected.
> * In Teams clients that do not support adaptive cards 1.4, the `Action.Submit` is rendered instead of `Action.Execute`.

### Sample JSON

The schema for backward compatibility request is as follows:

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
* [How bots work](/azure/bot-service/bot-builder-basics?view=azure-bot-service-4.0&preserve-view=true)
