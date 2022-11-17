---
title: Notification bot in Teams
author: surbhigupta
description: Learn how a notification bot works in Teams, and to customize notification behavior.
ms.topic: conceptual
ms.author: v-amprasad
ms.localizationpriority: high
---

# Notification bot in Teams

A Notification bot in Microsoft Teams enables you to build applications that collaborate with events and send these messages as notifications to an individual person, chat, group or channel in Teams. You can send Notifications as plain text or [Adaptive Cards](../../../task-modules-and-cards/cards/cards-reference.md#adaptive-card).

:::image type="content" source="../../../assets/images/notification-bot/notification-new-event.png" alt-text="new notification event sample":::

**Advantages**
[Placeholder for advantages of Notification bot]

## Notification based on events

Bot Framework SDK provides the functionality to [proactively message in Teams](send-proactive-messages.md). TeamsFx SDK provides the functionality to manage bot's conversation references when bot event is triggered. TeamsFx SDK recognizes following bot events:

|**Event**  |**Behavior**  |
|---------|---------|
|The first time you install a bot to a person, group, or Team.     |You need to add the target conversation reference to the storage.         |
|When the bot is uninstalled from a person, group, or Team.     |You need to remove the target conversation reference from the storage.         |
|When the team is deleted that was installed by bot.     |You need to remove the target conversation reference from the storage.         |
|When the team is restored that was installed by bot.     |You need to add the target conversation reference to the storage.         |
|When the bot messages.     |You need to add the target conversation reference to the storage, if it doesn't exist.         |

When you send notifications, TeamsFx SDK creates new conversation from the selected conversation reference and sends messages. For advanced usage, you can directly access the conversation reference to execute your own bot logic:

### [TypeScript](#tab/t s)

```TypeScript
   // list all installation targets
for (const target of await bot.notification.installations()) {
    // call Bot Framework's adapter.continueConversation()
    await target.adapter.continueConversation(target.conversationReference, async (context) => {
        // your own bot logic
        await context...
    });
}
```

### [.NET](#tab/dot net)

```.NET
   // list all installation targets
foreach (var target in await _conversation.Notification.GetInstallationsAsync()) {
    // call Bot Framework's adapter.ContinueConversationAsync()
    await target.Adapter.ContinueConversationAsync(
        target.BotAppId,
        target.ConversationReference,
        async (context, ctx) =>
        {
            // your own bot logic
            await context...
        },
        cancellationToken);
}
```

---

## Customize Notification

Following are the customizations you can make to extend the template to fit your business requirements.
