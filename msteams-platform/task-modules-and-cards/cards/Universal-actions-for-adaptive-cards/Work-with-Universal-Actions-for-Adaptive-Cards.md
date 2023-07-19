---
title: Work with Universal Actions for Adaptive Cards
description: Learn to work with the Universal Actions for Adaptive Cards, including Schema for UniversalActions for Adaptive cards, Refresh model, and backward compatibility
ms.topic: conceptual
ms.localizationpriority: medium
ms.date: 12/20/2022
---

# Work with Universal Actions for Adaptive Cards

Universal Actions for Adaptive Cards provide a way to implement Adaptive Card based scenarios for both, Teams and Outlook. This document covers the following topics:

* [Schema used for Universal Actions for Adaptive Cards](#schema-for-universal-actions-for-adaptive-cards)
* [Refresh model](#refresh-model)
* [`adaptiveCard/action` invoke activity](#adaptivecardaction-invoke-activity)
* [Backward compatibility](#backward-compatibility)

## Quick start guide to use Universal Actions for Adaptive Cards in Teams

1. Replace all instances of `Action.Submit` with `Action.Execute` to update an existing scenario on Teams.
2. Add a `refresh` clause to your Adaptive Card, if you want to use the automatic refresh model or if your scenario requires User Specific Views.

    >[!NOTE]
    > Specify the `userIds` property to identify which users get automatic updates.

3. Handle `adaptiveCard/action` invoke requests in your bot.
4. Use the invoke request's context to respond back with cards that are created for a user.

    > [!NOTE]
    > Whenever your bot returns a new card as a result of processing an `Action.Execute`, the response must conform to the response format.

## Schema for Universal Actions for Adaptive Cards

Universal Actions for Adaptive Cards are introduced in the Adaptive Cards schema version 1.5. To use Adaptive Card effectively, the `version` property of your Adaptive Card must be set to 1.5.

> [!NOTE]
> Setting the `version` property to 1.5 makes your Adaptive Card incompatible with older clients of the platforms or applications, such as Outlook and Teams, as they do not support the Universal Actions for Adaptive Cards.

If you set the card version to less than 1.5 and use either or both, `refresh` property and `Action.Execute`, the following happens:

| Client | Behavior |
| :-- | :-- |
| Teams | Your card stops working. Card isn't refreshed and `Action.Execute` doesn't render depending on the version of the Teams client. To ensure maximum compatibility in Teams, define `Action.Execute` with an `Action.Submit` in the fallback property. |

For more information on how to support older clients, see [backward compatibility](#backward-compatibility).

### Action.Execute

When authoring Adaptive Cards, replace `Action.Submit` and `Action.Http` with `Action.Execute`. The schema for `Action.Execute` is similar to that of `Action.Submit`.

For more information, see [Action.Execute schema and properties](/adaptive-cards/authoring-cards/universal-action-model#actionexecute).

Now, you can use the refresh model to allow Adaptive Cards to update automatically.

## Refresh model

To automatically refresh your Adaptive Card, define its `refresh` property, which embeds an action of type `Action.Execute` and an `userIds` array.

For more information, see [refresh schema and properties](/adaptive-cards/authoring-cards/universal-action-model#refresh-mechanism).

## User IDs in refresh

The following are the features of UserIds in refresh:

* UserIds is an array of user MRIs, which is part of the `refresh` property in Adaptive Cards.

* If the `userIds` list property is specified as `userIds: []` in the refresh section of the card, the card isn't automatically refreshed. Instead, a **Refresh Card** option is displayed to the user in the triple dot menu in Teams web client or desktop and in the long press context menu in Teams mobile, that is, Android or iOS to manually refresh the card. Alternatively, you may choose to skip `userIds` in the refresh property altogether in case the scenario involves <=60 members in Teams group chats or channels. The Teams client automatically invokes refresh calls for all the users if the group or channel has <=60 users.

* UserIds property is added because channels in Teams can include a large number of members. If all members are viewing the channel at the same time, an unconditional automatic refresh results in many concurrent calls to the bot. The `userIds` property must always be included to identify which users must get an automatic refresh with a maximum of *60 (sixty) user MRIs*.

* You can fetch Teams conversation member's user MRIs. For more information on how to add in userIds list in refresh section of Adaptive Card, see [fetch roster or user profile](/microsoftteams/platform/bots/how-to/get-teams-context?tabs=dotnet#fetch-the-roster-or-user-profile).

 You can get the user MRI for channel, Group Chat or 1:1 chat using the following example:

 1. Using TurnContext  

     `userMRI= turnContext.Activity.From.Id`

 1. Using GetMemberAsync method
  
     `var member = await TeamsInfo.GetMemberAsync(turnContext, turnContext.Activity.From.Id, cancellationToken);var userMRI = member.Id;`

* Sample Teams user MRI is `29:1bSnHZ7Js2STWrgk6ScEErLk1Lp2zQuD5H2qQ960rtvstKp8tKLl-3r8b6DoW0QxZimuTxk_kupZ1DBMpvIQQUAZL-PNj0EORDvRZXy8kvWk`

> [!NOTE]
> The `userIds` property is ignored in Outlook, and the `refresh` property is always automatically activated. There is no scale issue in Outlook because users view the card at different times.

Next step is to use the `adaptiveCard/action` invoke activity to understand what request must be made after `Action.Execute` is executed.

## `adaptiveCard/action` invoke activity

When `Action.Execute` is executed in the client, a new type of Invoke activity `adaptiveCard/action` is made to your bot.

For more information, see [request format and properties for a typical `adaptiveCard/action` invoke activity](/adaptive-cards/authoring-cards/universal-action-model#request-format).

For more information, see [response format and properties for a typical `adaptiveCard/action` invoke activity with supported response types](/adaptive-cards/authoring-cards/universal-action-model#response-format).

Next, you can apply backward compatibility to older clients across different platforms and make your Adaptive Card compatible.

## Backward compatibility

Universal Actions for Adaptive Cards allow you to set properties that enable backward compatibility with older versions of Outlook and Teams.

### Teams

To ensure backward compatibility of your Adaptive Cards with older versions of Teams, you must include the `fallback` property and set its value to `Action.Submit`. Also, your bot code must process both `Action.Execute` and `Action.Submit`.

For more information, see [backward compatibility on Teams](/adaptive-cards/authoring-cards/universal-action-model#teams).

## Code samples

|Sample name | Description | .NET | Node.js | Manifest|
|----------------|-----------------|--------------|--------------|--------------|
| Teams catering bot | This sample shows  a bot that accepts food order using Adaptive Cards. |[View](https://github.com/OfficeDev/Microsoft-Teams-Samples/tree/main/samples/bot-teams-catering/csharp)| NA | NA|
| Sequential Workflows Adaptive Cards | This sample shows how to implement Sequential Workflows, User Specific Views, and up to date Adaptive Cards in bots. | [View](https://github.com/OfficeDev/Microsoft-Teams-Samples/tree/main/samples/bot-sequential-flow-adaptive-cards/csharp) | [View](https://github.com/OfficeDev/Microsoft-Teams-Samples/tree/main/samples/bot-sequential-flow-adaptive-cards/nodejs) |[View](https://github.com/OfficeDev/Microsoft-Teams-Samples/tree/main/samples/bot-sequential-flow-adaptive-cards/csharp/demo-manifest/bot-adaptivecards-user-specific-views.zip)

## See also

* [Cards and task modules](../../cards-and-task-modules.md)
* [Adaptive Card actions in Teams](~/task-modules-and-cards/cards/cards-actions.md#adaptive-cards-actions)
* [Basics of the Microsoft Bot Framework](/azure/bot-service/bot-builder-basics?view=azure-bot-service-4.0&preserve-view=true)
* [Sequential Workflows](~/task-modules-and-cards/cards/universal-actions-for-adaptive-cards/sequential-workflows.md)
* [Up to date cards](~/task-modules-and-cards/cards/universal-actions-for-adaptive-cards/up-to-date-views.md)
* [Form completion feedback](~/bots/how-to/conversations/conversation-messages.md#form-completion-feedback)
