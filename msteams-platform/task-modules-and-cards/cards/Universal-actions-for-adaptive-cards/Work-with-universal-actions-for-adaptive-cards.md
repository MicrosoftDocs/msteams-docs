---
title: Work with universal actions for Adaptive Cards
description: Work with the universal actions for Adaptive Cards.
ms.topic: conceptual
---

# Work with universal actions for Adaptive Cards

Universal actions for Adaptive Cards provides a way to implement Adaptive Card based scenarios for both Teams and Outlook. This document covers the following:

* [Refresh model](#refresh-model)
* [`adaptiveCard/action` invoke activity](#adaptivecardaction-invoke-activity)
* [Schema used for universal actions for Adaptive Cards](#schema-for-universal-actions-for-adaptive-cards)
* [Backward compatibility](#backward-compatibility)

## Schema for universal actions for Adaptive Cards

Universal Actions for Adaptive Cards is introduced in the Adaptive Cards schema version 1.4. To use Adaptive Card effectively, the `version` property of your Adaptive Card must be set to 1.4.

> [!NOTE]
> Setting the `version` property to 1.4 makes your Adaptive Card incompatible with older clients of the platforms or applications, such as Outlook and Teams, as they do not support the universal actions for Adaptive Cards.

If you set the card version to less than 1.4 and use either or both, `refresh` property and `Action.Execute`, the following happens:

| Client | Behavior |
| :-- | :-- |
| Teams | Your card stops working. Card is not refreshed and `Action.Execute` does not render depending on the version of the Teams client. To ensure maximum compatibility in Teams, define `Action.Execute` with an `Action.Submit` in the fallback property. |

For more information on how to support older clients, see [backward compatibility](#backward-compatibility).

### Action.Execute

When authoring Adaptive Cards, replace `Action.Submit` and `Action.Http` with `Action.Execute`. The schema for `Action.Execute` is similar to that of `Action.Submit`.

For more information, see [Action.Execute schema and properties](https://docs.microsoft.com/en-us/adaptive-cards/authoring-cards/universal-action-model#actionexecute).

Now, you can use the refresh model to allow Adaptive Cards to update automatically.

## Refresh model

To automatically refresh your Adaptive Card, define its `refresh` property, which embeds an action of type `Action.Execute` and an `userIds` array.

For more information, see [refresh schema and properties](https://docs.microsoft.com/en-us/adaptive-cards/authoring-cards/universal-action-model#refresh-mechanism).

## User IDs in refresh

The following are the features of UserIds in refresh:

* UserIds is an array of user MRI's which is part of the refresh property in Adaptive Cards.

* If the `userIds` list property is not included in the refresh section of the card, the card is not automatically refreshed. Instead, a `Refresh Card` option is displayed to the user in the triple dot menu in web or desktop and in the long press context menu in mobile that is Android or iOS to manually refresh the card.

* UserIds property is added because channels in Teams can include a large number of members. If all members are viewing the channel at the same time, an unconditional automatic refresh results in many concurrent calls to the bot. To avoid this, the `userIds` property must always be included to identify which users must get an automatic refresh with a maximum of `sixty user MRIs`.

* For more information, see [how you can fetch Teams conversation member's user MRIs to add in userIds list in refresh section of Adaptive Card](https://docs.microsoft.com/en-us/microsoftteams/platform/bots/how-to/get-teams-context?tabs=dotnet#fetch-the-roster-or-user-profile).

* Sample Teams user MRI - `29:1bSnHZ7Js2STWrgk6ScEErLk1Lp2zQuD5H2qQ960rtvstKp8tKLl-3r8b6DoW0QxZimuTxk_kupZ1DBMpvIQQUAZL-PNj0EORDvRZXy8kvWk`

> [!NOTE]
> The `userIds` property is ignored in Outlook, and the refresh property is always automatically activated. There is no scale issue in Outlook because users view the card at different times.

Next step is to use the `adaptiveCard/action` invoke activity to understand what request must be made after `Action.Execute` is executed.

## `adaptiveCard/action` invoke activity

When `Action.Execute` is executed in the client, a new type of Invoke activity `adaptiveCard/action` is made to your bot.

For more information, see [request format and properties for a typical `adaptiveCard/action` invoke activity](https://docs.microsoft.com/en-us/adaptive-cards/authoring-cards/universal-action-model#request-format)

For more information, see [response format and properties for a typical `adaptiveCard/action` invoke activity with supported response types](https://docs.microsoft.com/en-us/adaptive-cards/authoring-cards/universal-action-model#response-format)

Next, you can go through a summary on how you can leverage universal bot action model.

## Summary on how to leverage universal bot action model in Teams

**To work with universal actions for Adaptive Cards and implement `Action.Execute`**

1. Replace all instances of `Action.Submit` with `Action.Execute` to update an existing scenario on Teams.
2. Add a `refresh` clause to your Adaptive Card, if you want to leverage the automatic refresh model or if your scenario requires contextual views.

    >[!NOTE]
    > Specify the `userIds` property to identify, which users get automatic updates.

3. Handle `adaptiveCard/action` invoke requests in your bot.
4. Use the Invoke request's context to generate cards that are specifically created for a user.

    > [!NOTE]
    > Whenever your bot returns a new card as a result of processing an `Action.Execute`, the response must conform to the [response format](#response-format).

Next, you can apply backward compatibility to older clients across different platforms and make your Adaptive Card compatible.

## Backward compatibility

The universal actions for Adaptive Cards allows you to set properties that enable backward compatibility with older versions of Outlook and Teams.

### Teams

To ensure backward compatibility of your Adaptive Cards with older versions of Teams, you must include the `fallback` property and set its value to `Action.Submit`. Also, your bot code must process both `Action.Execute` and `Action.Submit`.

For more information, see [backward compatibility on Teams](https://docs.microsoft.com/en-us/adaptive-cards/authoring-cards/universal-action-model#teams).

## See also

* [Adaptive Card actions in Teams](~/task-modules-and-cards/cards/cards-actions.md#adaptive-cards-actions)
* [How bots work](/azure/bot-service/bot-builder-basics?view=azure-bot-service-4.0&preserve-view=true)
