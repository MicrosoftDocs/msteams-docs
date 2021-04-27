---
title: Work with universal actions for adaptive cards
description: Work with the universal actions for adaptive cards.
ms.topic: conceptual
---

# Work with universal actions for adaptive cards

Universal actions for adaptive cards provides a way to implement adaptive card based scenarios for both Teams and Outlook. This document covers the following:

* [Schema used for universal actions for adaptive cards](#schema-for-universal-actions-for-adaptive-cards)
* [Refresh model](#refresh-model)
* [`adaptiveCard/action` invoke activity](#adaptivecardaction-invoke-activity)
* [Backward compatibility](#backward-compatibility)

## Schema for universal actions for adaptive cards

Universal Actions for adaptive cards is introduced in the adaptive cards schema version 1.4. To use Adaptive card effectively, the `version` property of your adaptive card must be set to 1.4

> [!NOTE]
> Setting the `version` property to 1.4 makes your adaptive card incompatible with older clients of the platforms or applications, such as Outlook and Teams, as they do not support the universal actions for adaptive cards.

If you set the card version to less than 1.4 and use either or both, `refresh` property and `Action.Execute`, the following happens:

| Client | Behavior |
| :-- | :-- |
| Teams | Your card stops working. Card is not refreshed and `Action.Execute` does not render depending on the version of the Teams client. To ensure maximum compatibility in Teams, define `Action.Execute` with an `Action.Submit` in the fallback property. |

For more information on how to support older clients, see [backward compatibility](#backward-compatibility).

### Action.Execute

When authoring adaptive cards, replace `Action.Submit` and `Action.Http` with `Action.Execute`. The schema for `Action.Execute` is similar to that of `Action.Submit`. 

[Action.Execute schema and properties](https://docs.microsoft.com/en-us/adaptive-cards/authoring-cards/universal-action-model#actionexecute)

Now you can use the refresh model to allow adaptive cards to update automatically.

## Refresh model

To automatically refresh your adaptive card, define its `refresh` property, which embeds an action of type `Action.Execute` and an `userIds` array. 

[Refresh schema and properties](https://docs.microsoft.com/en-us/adaptive-cards/authoring-cards/universal-action-model#refresh-mechanism)


## User Ids in Refresh
1. UserIds is an array of user MRI's which is part of the refersh property in adaptive cards.

2. If the `userIds` list property is not included in the refresh section of the card, the card is not automatically refreshed. Instead, a `Refresh Card` option is displayed to the user in the triple dot menu in web/desktop and in the long press context menu in mobile (android/iOS) to manually refresh the card. 

3. UserIds property is added because channels in Teams can include a large number of members. If all members are viewing the channel at the same time, an unconditional automatic refresh results in many concurrent calls to the bot. To avoid this, the `userIds` property must always be included to identify which users must get an automatic refresh, with a maximum of `sixty user MRIs`.

4. [This document explains how you can fetch Teams conversation memeber's user MRIs to add in userIds list in refresh section of adaptive card](https://docs.microsoft.com/en-us/microsoftteams/platform/bots/how-to/get-teams-context?tabs=dotnet#fetch-the-roster-or-user-profile)

5. Sample Teams user MRI - `29:1bSnHZ7Js2STWrgk6ScEErLk1Lp2zQuD5H2qQ960rtvstKp8tKLl-3r8b6DoW0QxZimuTxk_kupZ1DBMpvIQQUAZL-PNj0EORDvRZXy8kvWk`

> [!NOTE]
> The `userIds` property is ignored in Outlook, and the refresh property is always automatically activated. There is no scale issue in Outlook because users view the card at different times.

Next step is to use the `adaptiveCard/action` invoke activity to understand what request must be made after `Action.Execute` is executed.

## `adaptiveCard/action` invoke activity

When `Action.Execute` is executed in the client, a new type of Invoke activity `adaptiveCard/action` is made to your bot.

[Request format and properties for a typical `adaptiveCard/action` invoke activity](https://docs.microsoft.com/en-us/adaptive-cards/authoring-cards/universal-action-model#request-format)

[Response format and properties for a typical `adaptiveCard/action` invoke activity with supported response types](https://docs.microsoft.com/en-us/adaptive-cards/authoring-cards/universal-action-model#response-format)

Next you can go through a summary on how you can leverage universal bot action model

## Summary on how to leverage universal bot action model in Teams

**To work with universal actions for adaptive cards and implement `Action.Execute`**

1. Replace all instances of `Action.Submit` with `Action.Execute` to update an existing scenario on Teams.
2. Add a `refresh` clause to your adaptive card, if you want to leverage the automatic refresh model or if your scenario requires contextual views.

    >[!NOTE]
    > Specify the `userIds` property to identify, which users get automatic updates. 

3. Handle `adaptiveCard/action` invoke requests in your bot.
4. Use the Invoke request's context to generate cards that are specifically created for a user.
 
    > [!NOTE]
    > Whenever your bot returns a new card as a result of processing an `Action.Execute`, the response must conform to the [response format](#response-format).

Next you can apply backward compatibility to older clients across different platforms and make your adaptive card compatible.

## Backward compatibility

The universal actions for adaptive cards allows you to set properties that enable backward compatibility with older versions of Outlook and Teams.

### Teams

To ensure backward compatibility of your adaptive cards with older versions of Teams, you must include the `fallback` property and set its value to `Action.Submit`. Also, your bot code must process both `Action.Execute` and `Action.Submit`.

[Backward compatibility on Teams](https://docs.microsoft.com/en-us/adaptive-cards/authoring-cards/universal-action-model#teams)

## See also

* [Adaptive card actions in Teams](~/task-modules-and-cards/cards/cards-actions.md#adaptive-cards-actions)
* [How bots work](/azure/bot-service/bot-builder-basics?view=azure-bot-service-4.0&preserve-view=true)
