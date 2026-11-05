---
title: Proactive Activities
description: Migrate from BotBuilder's complex conversation reference handling to Teams SDK's simple conversation ID-based proactive messaging.
ms.topic: how-to
zone_pivot_groups: teams-sdk-languages-typescript-python
ms.date: 10/09/2026
---
# Proactive Activities

::: zone pivot="teams-sdk-python"
The BotBuilder proactive message flow requires storing a conversation reference.
In Teams SDK, we expose a `send` method in the `App` class, almost identical to the one
passed into our activity handlers through our context. This method accepts a `conversation_id`, so storing just that is enough!
::: zone-end

::: zone pivot="teams-sdk-typescript"
The BotBuilder proactive message flow requires storing a conversation reference.
In Teams SDK, we expose a `send` method in the `App` class, almost identical to the one
passed into our activity handlers through our context. This method accepts a `conversationId`, so storing just that is enough!
::: zone-end

::: zone pivot="teams-sdk-python"

# [BotBuilder](#tab/BotBuilder)

```python showLineNumbers
    from botbuilder.core import TurnContext
    from botbuilder.integration.aiohttp import CloudAdapter, ConfigurationBotFrameworkAuthentication
    from botbuilder.schema import ChannelAccount, ConversationAccount, ConversationReference

    adapter = CloudAdapter(ConfigurationBotFrameworkAuthentication(config))

    # highlight-start
    conversation_reference = ConversationReference(
        service_url="...",
        bot=ChannelAccount(...),
        channel_id="msteams",
        conversation=ConversationAccount(...),
        user=ChannelAccount(...)
    )

    async def send_proactive(turn_context: TurnContext):
        await turn_context.send_activity("proactive hello")

    await adapter.continue_conversation(
        conversation_reference,
        send_proactive
    )
    # highlight-end
```

# [Teams SDK](#tab/TeamsSDK)

```python showLineNumbers
    from microsoft_teams.apps import App

    app = App()

    # highlight-start
    await app.send("your-conversation-id", "proactive hello")
    # highlight-end
```

---

::: zone-end

::: zone pivot="teams-sdk-typescript"

# [BotBuilder](#tab/BotBuilder)

```typescript showLineNumbers
    import {
      CloudAdapter,
      ConfigurationBotFrameworkAuthentication,
      ConversationReference,
    } from 'botbuilder';

    const auth = new ConfigurationBotFrameworkAuthentication(process.env);
    const adapter = new CloudAdapter(auth);

    // highlight-start
    (async () => {
      const conversationReference: ConversationReference = {
        serviceUrl: '...',
        bot: { ... },
        channelId: 'msteams',
        conversation: { ... },
        user: { ... },
      };

      await adapter.continueConversationAsync(process.env.MicrosoftAppId ?? '', conversationReference, async context => {
        await context.sendActivity('proactive hello');
      });
    }());
    // highlight-end
```

# [Teams SDK](#tab/TeamsSDK)

```typescript showLineNumbers
    import { App } from '@microsoft/teams.apps';

    const app = new App();

    // highlight-start
    (async () => {
      await app.start();
      await app.send('your-conversation-id', 'proactive hello');
    }());
    // highlight-end
```

---

::: zone-end
