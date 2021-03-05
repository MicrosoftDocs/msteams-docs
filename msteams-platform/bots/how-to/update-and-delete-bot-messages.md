---
title: Update and delete messages sent from your bot
author: WashingtonKayaker
description: How to update and delete messages sent from your Microsoft Teams bot
ms.topic: overview
ms.author: anclear
---

# Update and delete messages sent from your bot

[!INCLUDE [pre-release-label](~/includes/v4-to-v3-pointer-bots.md)]

Rather than have your messages be static snapshots of data, your bot can dynamically update messages after sending them. Messages can also be deleted using the Bot Framework's `DeleteActivity` method.

## Update messages

You can use dynamic message updates for scenarios, such as poll updates, modifying available actions after a button press, or any other asynchronous state change.

The new message need not match the original in type. For example, if the original message contained an attachment, the new message can be a simple text message.

# [C# or .NET](#tab/dotnet)

To update an existing message, pass a new `Activity` object with the existing activity ID to the `UpdateActivityAsync` method of the `TurnContext` class. For more information, see [TurnContextClass](/dotnet/api/microsoft.bot.builder.turncontext?view=botbuilder-dotnet-stable&preserve-view=true).

```csharp
var newActivity = MessageFactory.Text("The new text for the activity");
newActivity.Id = activityId;
await turnContext.UpdateActivityAsync(newActivity, cancellationToken);
```

# [TypeScript or Node.js](#tab/typescript)

To update an existing message, pass a new `Activity` object with the existing activity ID to the `updateActivity` method of the `TurnContext` object. For more information, see [updateActivity](/javascript/api/botbuilder-core/turncontext?view=botbuilder-ts-latest#updateactivity-partial-activity--&preserve-view=true).

```typescript
const newActivity = MessageFactory.text('The new text for the activity');
newActivity.id = activityId;
await turnContext.updateActivity(newActivity);
```

# [Python](#tab/python)

To update an existing message, pass a new `Activity` object with the existing activity ID to the `update_activity` method of the `TurnContext` class. For more information, see [TurnContextClass](/python/api/botbuilder-core/botbuilder.core.turncontext?view=botbuilder-py-latest).

```python

new_activity = MessageFactory.text("The new text for the activity")
new_activity.id = activity_id
update_result = await context.update_activity(new_activity)

```

# [REST API](#tab/rest)

> [!NOTE]
> You can develop Teams apps in any web programming technology and directly call the [bot connector service REST APIs](/azure/bot-service/rest-api/bot-framework-rest-connector-api-reference?view=azure-bot-service-4.0&preserve-view=true). To do this, you must implement [authentication](/azure/bot-service/rest-api/bot-framework-rest-connector-authentication?view=azure-bot-service-4.0&preserve-view=true) security procedures with your API requests.

To update an existing activity within a conversation, include the `conversationId` and `activityId` in the request endpoint. To complete this scenario, you must cache the activity ID returned by the original post call.

```http
PUT /v3/conversations/{conversationId}/activities/{activityId}
```

For information on REST API request body, see [activity](/azure/bot-service/rest-api/bot-framework-rest-connector-api-reference?view=azure-bot-service-4.0#activity-object&preserve-view=true) object. For information on what REST API returns, see [ResourceResponse](/azure/bot-service/rest-api/bot-framework-rest-connector-api-reference?view=azure-bot-service-4.0#resourceresponse-object&preserve-view=true) object.

---

| | |
|----|----|
| **Request body** | An [Activity](/azure/bot-service/rest-api/bot-framework-rest-connector-api-reference?view=azure-bot-service-4.0#activity-object&preserve-view=true) object |
| **Returns** | A [ResourceResponse](/azure/bot-service/rest-api/bot-framework-rest-connector-api-reference?view=azure-bot-service-4.0#resourceresponse-object&preserve-view=true) object |

---

## Update cards

To update the existing card on button selection, you can use `ReplyToId` of incoming activity.

# [C#/.NET](#tab/dotnet)

To update existing card on a button click, pass a new `Activity` object with updated card and `ReplyToId` as activity ID to the `UpdateActivityAsync` method of the `TurnContext` class. See [TurnContextClass](/dotnet/api/microsoft.bot.builder.turncontext?view=botbuilder-dotnet-stable&preserve-view=true).
```csharp
var activity = MessageFactory.Attachment(card.ToAttachment());
activity.Id = turnContext.Activity.ReplyToId;
await turnContext.UpdateActivityAsync(activity, cancellationToken);
```

# [TypeScript/Node.js](#tab/typescript)

To update existing card on a button click, pass a new `Activity` object with updated card and `replyToId` as activity ID to the `updateActivity` method of the `TurnContext` object. See [updateActivity](/javascript/api/botbuilder-core/turncontext?view=botbuilder-ts-latest#updateactivity-partial-activity--&preserve-view=true).
```typescript
const message = MessageFactory.attachment(card);
message.id = context.activity.replyToId;
await context.updateActivity(message);
```

# [Python](#tab/python)

To update existing card on a button click, pass a new `Activity` object with updated card and `reply_to_id` as activity ID to the `update_activity` method of the `TurnContext` class. See [TurnContextClass](/python/api/botbuilder-core/botbuilder.core.turncontext?view=botbuilder-py-latest).

```python
updated_activity = MessageFactory.attachment(CardFactory.hero_card(card))
updated_activity.id = turn_context.activity.reply_to_id
await turn_context.update_activity(updated_activity)

```

## Delete messages

In the Bot Framework, every message has its own unique activity identifier. Messages can be deleted using the Bot Framework's `DeleteActivity` method.

# [C# or .NET](#tab/dotnet)

To delete a message, pass that activity's ID to the `DeleteActivityAsync` method of the `TurnContext` class. For more information, see [TurnContext.DeleteActivityAsync Method](/dotnet/api/microsoft.bot.builder.turncontext.deleteactivityasync?view=botbuilder-dotnet-stable&preserve-view=true).

```csharp
foreach (var activityId in _list)
{
    await turnContext.DeleteActivityAsync(activityId, cancellationToken);
}
```

# [TypeScript or Node.js](#tab/typescript)

To delete a message, pass that activity's ID to the `deleteActivity` method of the `TurnContext` object. For more information, see [deleteActivity](/javascript/api/botbuilder-core/turncontext?view=botbuilder-ts-latest#deleteactivity-string---partial-conversationreference--&preserve-view=true)

```typescript
for (let i = 0; i < activityIds.length; i++) {
    await turnContext.deleteActivity(activityIds[i]);
}
```

# [Python](#tab/python)

To delete that message, pass that activity's ID to the `delete_activity` method of the `TurnContext` object. For more information, see [activity-update-and-delete](https://github.com/microsoft/botbuilder-python/blob/c04ecacb22c1f4b43a671fe2f1e4782218391975/tests/teams/scenarios/activity-update-and-delete/bots/activity_update_and_delete_bot.py).

```python
for each activity_id in _list:
    await TurnContext.delete_activity(activity_id)
```

# [REST API](#tab/rest)

 To delete an existing activity within a conversation, include the `conversationId` and `activityId` in the request endpoint.

```http
DELETE /v3/conversations/{conversationId}/activities/{activityId}
```

For REST API, request body is not applicable and it returns an HTTP Status code that indicates the outcome of the operation. Nothing is specified in the body of the response.

---

## Next step

> [!div class="nextstepaction"]
> [Update and delete bot messages](~/bots/how-to/get-teams-context.md)

## Code samples

The official conversation basics are as follows:

| Sample Name           | Description                                                                      | .NET    | JavaScript   | Python  |
|:----------------------|:---------------------------------------------------------------------------------|:--------|:-------------|:--------|
|Teams Conversation Basics  | Demonstrates basics of conversations in Teams, including message update and delete.|[.NET&nbsp;Core](https://github.com/microsoft/BotBuilder-Samples/tree/main/samples/csharp_dotnetcore/57.teams-conversation-bot)|[JavaScript](https://github.com/microsoft/BotBuilder-Samples/tree/main/samples/javascript_nodejs/57.teams-conversation-bot) | [Python](https://github.com/microsoft/BotBuilder-Samples/tree/main/samples/python/57.teams-conversation-bot)|

