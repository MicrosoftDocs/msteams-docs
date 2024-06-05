---
title: Update and delete messages sent from your bot
author: WashingtonKayaker
description: Learn how to update and delete messages sent from your Microsoft Teams bot in different environments and with REST APIs using samples (.NET, Node.js, Python).
ms.topic: overview
ms.localizationpriority: medium
ms.author: anclear
---

# Update and delete messages sent from bot

[!INCLUDE [pre-release-label](~/includes/v4-to-v3-pointer-bots.md)]

Your bot can dynamically update messages after sending them instead of having them as static snapshots of data. Messages can also be deleted using the Bot Framework's `DeleteActivity` method.

## Update messages

You can use dynamic message updates for scenarios, such as poll updates, modifying available actions after a button press, or any other asynchronous state change.

It is not necessary for the new message to match the original in type. For example, if the original message contains an attachment, the new message can be a simple text message.

# [C#](#tab/dotnet)

* [SDK reference](/dotnet/api/microsoft.bot.builder.turncontext.updateactivityasync)
* [Sample code reference](https://github.com/OfficeDev/Microsoft-Teams-Samples/blob/main/samples/bot-conversation/csharp/Bots/TeamsConversationBot.cs#L266)

To update an existing message, pass a new `Activity` object with the existing activity ID to the `UpdateActivityAsync` method of the `TurnContext` class.

```csharp
// Send initial message
var response = await turnContext.SendActivityAsync(MessageFactory.Attachment(card.ToAttachment()), cancellationToken);
var activityId = response.Id; // Fetch activity id.

// MessageFactory.Text(): Specifies the type of text data in a message attachment.
var newActivity = MessageFactory.Text("The new text for the activity");
newActivity.Id = activityId;

// UpdateActivityAsync(): A method that can participate in update activity events for the current turn.
await turnContext.UpdateActivityAsync(newActivity, cancellationToken);
```

# [TypeScript](#tab/typescript)

* [SDK reference](/javascript/api/botbuilder-core/turncontext#botbuilder-core-turncontext-updateactivity)
* [Sample code reference](https://github.com/OfficeDev/Microsoft-Teams-Samples/blob/main/samples/bot-conversation/nodejs/bots/teamsConversationBot.js#L162)

To update an existing message, pass a new `Activity` object with the existing activity ID to the `updateActivity` method of the `TurnContext` object.

```typescript
// Send initial message
var message = await context.sendActivity("<Your Message>");
var activityId = message.id; // Fetch activity id.

// MessageFactory.Text(): Specifies the type of text data in a message attachment.
const newActivity = MessageFactory.text('The new text for the activity');
newActivity.id = activityId;

// A method that can participate in update activity events for the current turn.
await turnContext.updateActivity(newActivity);
```

# [Python](#tab/python)

* [SDK reference](/python/api/botbuilder-core/botbuilder.core.turncontext#botbuilder-core-turncontext-update-activity)
* [Sample code reference](https://github.com/OfficeDev/Microsoft-Teams-Samples/blob/main/samples/bot-conversation/python/bots/teams_conversation_bot.py#L156)

To update an existing message, pass a new `Activity` object with the existing activity ID to the `update_activity` method of the `TurnContext` class.

```python
# Send initial message
message = await turn_context.send_activity("<Your Message>")
activityId = message.id # Fetch activity id.

# MessageFactory.Text(): Specifies the type of text data in a message attachment.
new_activity = MessageFactory.text("The new text for the activity")
new_activity.id = activity_id

# A method that can participate in update activity events for the current turn.
update_result = await context.update_activity(new_activity)
```

# [REST API](#tab/rest)

> [!NOTE]
> You can develop Teams apps in any web-programming technology and directly call the [Bot Connector service REST APIs](/azure/bot-service/rest-api/bot-framework-rest-connector-api-reference?view=azure-bot-service-4.0&preserve-view=true). To do so, you need to implement [Authentication](/azure/bot-service/rest-api/bot-framework-rest-connector-authentication?view=azure-bot-service-4.0&preserve-view=true) security procedures with your API requests.

To update an existing activity within a conversation, include the `conversationId` and `activityId` in the request endpoint. To complete this scenario, you must cache the activity ID returned by the original post call.

```http
PUT /v3/conversations/{conversationId}/activities/{activityId}
```

|Request |Response |
|----|----|
| An [Activity](/azure/bot-service/rest-api/bot-framework-rest-connector-api-reference?view=azure-bot-service-4.0#activity-object&preserve-view=true) object. | A [ResourceResponse](/azure/bot-service/rest-api/bot-framework-rest-connector-api-reference?view=azure-bot-service-4.0#resourceresponse-object&preserve-view=true) object. |

---
---

Now that you have updated messages, update the existing card on button selection for incoming activities.

## Update cards

To update the existing card on button selection, you can use `ReplyToId` of incoming activity.

# [C#](#tab/dotnet)

* [SDK reference](/dotnet/api/microsoft.bot.builder.turncontext.updateactivityasync#microsoft-bot-builder-turncontext-updateactivityasync(microsoft-bot-schema-iactivity-system-threading-cancellationtoken))
* [Sample code reference](https://github.com/OfficeDev/Microsoft-Teams-Samples/blob/main/samples/bot-conversation/csharp/Bots/TeamsConversationBot.cs#L266)

To update existing card on a button selection, pass a new `Activity` object with updated card and `ReplyToId` as activity ID to the `UpdateActivityAsync` method of the `TurnContext` class.

```csharp
// Returns a message activity that contains an attachment.
var activity = MessageFactory.Attachment(card.ToAttachment());
activity.Id = turnContext.Activity.ReplyToId;

// A method that can participate in update activity events for the current turn.
await turnContext.UpdateActivityAsync(activity, cancellationToken);
```

# [TypeScript](#tab/typescript)

* [SDK reference](/javascript/api/botbuilder-core/turncontext#botbuilder-core-turncontext-updateactivity)
* [Sample code reference](https://github.com/OfficeDev/Microsoft-Teams-Samples/blob/main/samples/bot-conversation/nodejs/bots/teamsConversationBot.js#L162)

To update existing card on a button selection, pass a new `Activity` object with updated card and `replyToId` as activity ID to the `updateActivity` method of the `TurnContext` object.

```typescript
// MessageFactory.attachment(): Returns a message activity that contains an attachment.
const message = MessageFactory.attachment(card);
message.id = context.activity.replyToId;

// updateActivity(): A method that can participate in update activity events for the current turn.
await context.updateActivity(message);
```

# [Python](#tab/python)

* [SDK reference](/python/api/botbuilder-core/botbuilder.core.turncontext?view=botbuilder-py-latest&preserve-view=true#botbuilder-core-turncontext-update-activity)
* [Sample code reference](https://github.com/OfficeDev/Microsoft-Teams-Samples/blob/main/samples/bot-conversation/python/bots/teams_conversation_bot.py#L156)

To update existing card on a button click, pass a new `Activity` object with updated card and `reply_to_id` as activity ID to the `update_activity` method of the `TurnContext` class.

```python
# MessageFactory.attachment(): Returns a message activity that contains an attachment.
updated_activity = MessageFactory.attachment(CardFactory.hero_card(card))
updated_activity.id = turn_context.activity.reply_to_id

# update_activity(): A method that can participate in update activity events for the current turn.
await turn_context.update_activity(updated_activity)
```

# [REST API](#tab/rest)

> [!NOTE]
> You can develop Teams apps in any web programming technology and directly call the [bot connector service REST APIs](/azure/bot-service/rest-api/bot-framework-rest-connector-api-reference?view=azure-bot-service-4.0&preserve-view=true). To do this, you must implement [authentication](/azure/bot-service/rest-api/bot-framework-rest-connector-authentication?view=azure-bot-service-4.0&preserve-view=true) security procedures with your API requests.

To update an existing activity within a conversation, include the `conversationId` and `activityId` in the request endpoint. To complete this scenario, you must cache the activity ID returned by the original post call.

```http
PUT /v3/conversations/{conversationId}/activities/{activityId}
```

|Request |Response |
|----|----|
| An [activity](/azure/bot-service/rest-api/bot-framework-rest-connector-api-reference?view=azure-bot-service-4.0#activity-object&preserve-view=true) object. | A [ResourceResponse](/azure/bot-service/rest-api/bot-framework-rest-connector-api-reference?view=azure-bot-service-4.0#resourceresponse-object&preserve-view=true) object. |

---

Now that you have updated cards, you can delete messages using the Bot Framework.

## Delete messages

In the Bot Framework, every message has its unique activity identifier. Messages can be deleted using the Bot Framework's `DeleteActivity` method.

# [C#](#tab/dotnet)

* [SDK reference](/dotnet/api/microsoft.bot.builder.botadapter.deleteactivityasync#microsoft-bot-builder-botadapter-deleteactivityasync(microsoft-bot-builder-iturncontext-microsoft-bot-schema-conversationreference-system-threading-cancellationtoken)&preserve-view=true)
* [Sample code reference](https://github.com/OfficeDev/Microsoft-Teams-Samples/blob/main/samples/bot-conversation/csharp/Bots/TeamsConversationBot.cs#L165)

To delete a message, pass that activity's ID to the `DeleteActivityAsync` method of the `TurnContext` class.

```csharp
foreach (var activityId in _list)
{
    // When overridden in a derived class, deletes an existing activity in the conversation.
    await turnContext.DeleteActivityAsync(activityId, cancellationToken);
}
```

# [TypeScript](#tab/typescript)

* [SDK reference](/javascript/api/botbuilder-core/turncontext#botbuilder-core-turncontext-deleteactivity)
* [Sample code reference](https://github.com/OfficeDev/Microsoft-Teams-Samples/blob/main/samples/bot-conversation/nodejs/bots/teamsConversationBot.js#L255)

To delete a message, pass that activity's ID to the `deleteActivity` method of the `TurnContext` object.

```typescript
for (let i = 0; i < activityIds.length; i++) {
    // deleteActivity(): deletes an existing activity in the conversation.
    await turnContext.deleteActivity(activityIds[i]);
}
```

# [Python](#tab/python)

* [SDK reference](/python/api/botbuilder-core/botbuilder.core.turncontext#botbuilder-core-turncontext-delete-activity)
* [Sample code reference](https://github.com/OfficeDev/Microsoft-Teams-Samples/blob/main/samples/bot-conversation/python/bots/teams_conversation_bot.py#L227)

To delete that message, pass that activity's ID to the `delete_activity` method of the `TurnContext` object.

```python
for each activity_id in _list:
    # delete_activity(): deletes an existing activity in the conversation.
    await TurnContext.delete_activity(activity_id)
```

# [REST API](#tab/rest)

To delete an existing activity within a conversation, include the `conversationId` and `activityId` in the request endpoint.

```http
DELETE /v3/conversations/{conversationId}/activities/{activityId}
```

| **Request and response** | **Description** |
|----|----|
| N/A | An HTTP status code indicating the outcome of the operation. Nothing is specified in the body of the response. |

---

## Code sample

The following code sample demonstrates basics of conversations:

| **Sample name** | **Description** | **.NET** | **Node.js** | **Python** | **Manifest**|
|----------------------|-----------------|--------|-------------|--------|--------|
| Teams Conversation Basics  | This sample shows how to use different bot conversation events available in bot framework v4 for personal and teams scope. | [View](https://github.com/OfficeDev/Microsoft-Teams-Samples/tree/main/samples/bot-conversation/csharp) | [View](https://github.com/OfficeDev/Microsoft-Teams-Samples/tree/main/samples/bot-conversation/nodejs) | [View](https://github.com/OfficeDev/Microsoft-Teams-Samples/tree/main/samples/bot-conversation/python) | [View](https://github.com/OfficeDev/Microsoft-Teams-Samples/tree/main/samples/bot-conversation/csharp/demo-manifest/bot-conversation.zip) |

## Next step

> [!div class="nextstepaction"]
> [Get Teams specific context for your bot](get-teams-context.md)

## See also

* [Build bots for Teams](../what-are-bots.md)
* [Conversation basics](conversations/conversation-basics.md)
* [Cards](../../task-modules-and-cards/what-are-cards.md)
