---
title: Update and delete messages sent from your bot
author: WashingtonKayaker
description: How to update and delete messages sent from your Microsoft Teams bot
ms.topic: overview
ms.author: anclear
---
# Update and delete messages sent from your bot

[!INCLUDE [pre-release-label](~/includes/v4-to-v3-pointer-bots.md)]

## Updating messages

Rather than have your messages be static snapshots of data, your bot can dynamically update messages inline after sending them. You can use dynamic message updates for scenarios such as poll updates, modifying available actions after a button press, or any other asynchronous state change.

The new message need not match the original in type. For instance, if the original message contained an attachment, the new message can be a simple text message.

# [C#](#tab/csharp)

To update an existing message, pass a new `Activity` object with the existing activity ID to the `UpdateActivityAsync` method of the `TurnContext` class.

```csharp
foreach (var activityId in _list)
{
    var newActivity = MessageFactory.Text(turnContext.Activity.Text);
    newActivity.Id = activityId;
    await turnContext.UpdateActivityAsync(newActivity, cancellationToken);
}
```

<!--
# [JavaScript](#tab/javascript)
-->

---



## Deleting messages

Messages can be deleted using the bot frameworks DeleteActivity method as shown here.

# [C#](#tab/csharp)

In the bot framework, every message has its own unique activity identifier.  To delete that message, pass that activityId to the `DeleteActivityAsync` method of the `turnContext` class.

```csharp
foreach (var activityId in _list)
{
    await turnContext.DeleteActivityAsync(activityId, cancellationToken);
}
```

<!--
# [JavaScript](#tab/javascript)
-->

---




<!--
## Writing notes

* **Purpose** How to update and delete messages sent from your bot
* **Existing teams doc reference** 
  * some of: [bots-conversations](https://docs.microsoft.com/en-us/microsoftteams/platform/concepts/bots/bot-conversations/bots-conversations)
* **Existing Bot framework doc reference**
  * none?
* **Code Snippets** 
  * [Updating messages](https://docs.microsoft.com/en-us/microsoftteams/platform/concepts/bots/bot-conversations/bots-conversations#updating-messages)
  * [Deleting messages](https://docs.microsoft.com/en-us/microsoftteams/platform/concepts/bots/bot-conversations/bots-conversations#deleting-messages)
-->   
 

