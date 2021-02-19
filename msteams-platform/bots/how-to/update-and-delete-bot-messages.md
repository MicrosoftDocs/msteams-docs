---
title: Update and delete messages sent from your bot
author: WashingtonKayaker
description: How to update and delete messages sent from your Microsoft Teams bot
ms.topic: overview
ms.author: anclear
---

# Update and delete messages sent from your bot

[!INCLUDE [pre-release-label](~/includes/v4-to-v3-pointer-bots.md)]

## Update messages

Rather than have your messages be static snapshots of data, your bot can dynamically update messages after sending them. You can use dynamic message updates for scenarios such as poll updates, modifying available actions after a button press, or any other asynchronous state change.

The new message need not match the original in type. For instance, if the original message contained an attachment, the new message can be a simple text message.

# [C#/.NET](#tab/dotnet)

To update an existing message, pass a new `Activity` object with the existing activity ID to the `UpdateActivityAsync` method of the `TurnContext` class. See [TurnContextClass](/dotnet/api/microsoft.bot.builder.turncontext?view=botbuilder-dotnet-stable&preserve-view=true).

```csharp
var newActivity = MessageFactory.Text("The new text for the activity");
newActivity.Id = activityId;
await turnContext.UpdateActivityAsync(newActivity, cancellationToken);
```

# [TypeScript/Node.js](#tab/typescript)

To update an existing message, pass a new `Activity` object with the existing activity ID to the `updateActivity` method of the `TurnContext` object. See [updateActivity](/javascript/api/botbuilder-core/turncontext?view=botbuilder-ts-latest#updateactivity-partial-activity--&preserve-view=true).

```typescript
const newActivity = MessageFactory.text('The new text for the activity');
newActivity.id = activityId;
await turnContext.updateActivity(newActivity);
```

# [Python](#tab/python)

To update an existing message, pass a new `Activity` object with the existing activity ID to the `update_activity` method of the `TurnContext` class. See [TurnContextClass](link to Python API ref docs).

```python

new_activity = MessageFactory.text("The new text for the activity")
new_activity.id = activity_id
update_result = await context.update_activity(new_activity)

```

# [REST API](#tab/rest)

>[!NOTE]
>You can develop Teams apps in any web-programming technology and directly call the [Bot Connector service REST APIs](/azure/bot-service/rest-api/bot-framework-rest-connector-api-reference?view=azure-bot-service-4.0&preserve-view=true). To do so, you'll need to implement [Authentication](/azure/bot-service/rest-api/bot-framework-rest-connector-authentication?view=azure-bot-service-4.0&preserve-view=true) security procedures with your API requests.

To update an existing activity within a conversation, include the `conversationId` and `activityId` in the request endpoint. To complete this scenario, you must cache the activity ID returned by the original POST call.

```http
PUT /v3/conversations/{conversationId}/activities/{activityId}
```

| | |
|----|----|
| **Request body** | An [Activity](/azure/bot-service/rest-api/bot-framework-rest-connector-api-reference?view=azure-bot-service-4.0#activity-object&preserve-view=true) object |
| **Returns** | A [ResourceResponse](/azure/bot-service/rest-api/bot-framework-rest-connector-api-reference?view=azure-bot-service-4.0#resourceresponse-object&preserve-view=true) object |

---

## Update adaptive cards

Follow the steps to update the adaptive card on click on button:

1. Create an adaptive card and add unique ID (GUID) in the adaptive card action.

```json
var Card = new AdaptiveCard()
{
    Body = new List<AdaptiveElement>()
    {
        new AdaptiveTextBlock(){Text="This is a test adaptive card"},
    },
    Actions = new List<AdaptiveAction>() 
    {
    new AdaptiveSubmitAction()
    {
        Title="UpdateMe",
        DataJson= @"{'id':'uniqueId'}"
    }
    }
};
```

2. After sending the message, continue mapping the adaptive card's unique ID and message ID.

```json
connector = new ConnectorClient(new Uri(activity.ServiceUrl));
reply = activity.CreateReply();
reply.Attachments.Add(Card.ToAttachment());
var msgToUpdate = await connector.Conversations.ReplyToActivityAsync(reply);
// Keep mapping of uniqueId and messageToUpdate.Id
// UniqueId1 => messageId1
// UniqueId2 => messageId2
```

3. When a user selects **UpdateMe** action button, check the mapping for `uniqueId` in the `activity.Value`.

4. Create new card and call `connector.Conversations.UpdateActivityAsync` with the updated code.

## Delete messages

In the Bot Framework, every message has its own unique activity identifier.
Messages can be deleted using the Bot Framework's `DeleteActivity` method as shown here.

# [C#/.NET](#tab/dotnet)

To delete that message, pass that activity's ID to the `DeleteActivityAsync` method of the `TurnContext` class. See [TurnContext.DeleteActivityAsync Method](/dotnet/api/microsoft.bot.builder.turncontext.deleteactivityasync?view=botbuilder-dotnet-stable&preserve-view=true).

```csharp
foreach (var activityId in _list)
{
    await turnContext.DeleteActivityAsync(activityId, cancellationToken);
}
```

# [TypeScript/Node.js](#tab/typescript)

To delete that message, pass that activity's ID to the `deleteActivity` method of the `TurnContext` object. See [deleteActivity](/javascript/api/botbuilder-core/turncontext?view=botbuilder-ts-latest#deleteactivity-string---partial-conversationreference--&preserve-view=true).

```typescript
for (let i = 0; i < activityIds.length; i++) {
    await turnContext.deleteActivity(activityIds[i]);
}
```

# [Python](#tab/python)

To delete that message, pass that activity's ID to the `delete_activity` method of the `TurnContext` object. See [activity-update-and-delete](https://github.com/microsoft/botbuilder-python/blob/c04ecacb22c1f4b43a671fe2f1e4782218391975/tests/teams/scenarios/activity-update-and-delete/bots/activity_update_and_delete_bot.py).

```python
for each activity_id in _list:
    await TurnContext.delete_activity(activity_id)
```

# [REST API](#tab/rest)

 To delete an existing activity within a conversation, include the `conversationId` and `activityId` in the request endpoint.

```http
DELETE /v3/conversations/{conversationId}/activities/{activityId}
```

| | |
|----|----|
| **Request body** | n/a |
| **Returns** | An HTTP Status code that indicates the outcome of the operation. Nothing is specified in the body of the response. |

---
