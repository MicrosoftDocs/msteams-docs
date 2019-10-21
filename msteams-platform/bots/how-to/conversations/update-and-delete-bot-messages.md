---
title: Update and delete messages sent from your bot
author: WashingtonKayaker
description: How to update and delete messages sent from your Microsoft Teams bot
ms.topic: overview
ms.author: anclear
---
# Update and delete messages sent from your bot


## Updating messages
<!-- https://docs.microsoft.com/en-us/microsoftteams/platform/concepts/bots/bot-conversations/bots-conversations#updating-messages -->


Rather than have your messages be static snapshots of data, your bot can dynamically update messages inline after sending them. You can use dynamic message updates for scenarios such as poll updates, modifying available actions after a button press, or any other asynchronous state change.

The new message need not match the original in type. For instance, if the original message contained an attachment, the new message can be a simple text message.

# [C#](#tab/csharp)


OPEN ISSUE: REMOVE FOR LOOP?   

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
<!-- https://docs.microsoft.com/en-us/microsoftteams/platform/concepts/bots/bot-conversations/bots-conversations#deleting-messages -->


# [C#](#tab/csharp)

OPEN ISSUE: REMOVE FOR LOOP?   await turnContext.DeleteActivityAsync(activityId, cancellationToken);

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
   * some of: [https://docs.microsoft.com/en-us/microsoftteams/platform/concepts/bots/bot-conversations/bots-conversations](https://docs.microsoft.com/en-us/microsoftteams/platform/concepts/bots/bot-conversations/bots-conversations)
 * **Existing Bot framework doc reference**
   * none?
 * **Code Snippets** 
   * [https://github.com/microsoft/botbuilder-dotnet/tree/master/tests/Teams/ActivityUpdateAndDelete](https://github.com/microsoft/botbuilder-dotnet/tree/master/tests/Teams/ActivityUpdateAndDelete)
   -->