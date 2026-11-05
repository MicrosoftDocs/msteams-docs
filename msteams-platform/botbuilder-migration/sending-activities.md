---
title: Sending Activities
description: Migrate from BotBuilder's TurnContext activity sending to Teams SDK's simplified send method with better Adaptive Card support.
ms.topic: how-to
zone_pivot_groups: teams-sdk-languages-typescript-python
ms.date: 10/09/2026
---
# Sending Activities

BotBuilder's pattern for sending activities via its `TurnContext` is similar to that in Teams SDK,
but one key difference is that sending adaptive cards doesn't require constructing the entire activity yourself.

::: zone pivot="teams-sdk-python"

# [BotBuilder](#tab/BotBuilder)

```python showLineNumbers
    from botbuilder.core import ActivityHandler, TurnContext
    from botbuilder.schema import Activity

    class MyActivityHandler(ActivityHandler):
        async def on_message_activity(self, turn_context: TurnContext):
            # highlight-next-line
            await turn_context.send_activity(Activity(type="typing"))
```

# [Teams SDK](#tab/TeamsSDK)

```python showLineNumbers
    from microsoft_teams.api import MessageActivity, TypingActivityInput
    from microsoft_teams.apps import ActivityContext, App

    @app.on_message
    async def on_message(context: ActivityContext[MessageActivity]):
        # highlight-next-line
        await context.send(TypingActivityInput())
```

---

## Strings

# [BotBuilder](#tab/BotBuilder)

```python showLineNumbers
    from botbuilder.core import ActivityHandler, TurnContext

    class MyActivityHandler(ActivityHandler):
        async def on_message_activity(self, turn_context: TurnContext):
            # highlight-next-line
            await turn_context.send_activity("hello world")
```

# [Teams SDK](#tab/TeamsSDK)

```python showLineNumbers
    from microsoft_teams.api import MessageActivity
    from microsoft_teams.apps import ActivityContext, App

    @app.on_message
    async def on_message(context: ActivityContext[MessageActivity]):
        # highlight-next-line
        await context.send("hello world")
```

---

## Adaptive Cards

# [BotBuilder](#tab/BotBuilder)

```python showLineNumbers
    from botbuilder.core import ActivityHandler, TurnContext
    from botbuilder.schema import Activity, Attachment

    class MyActivityHandler(ActivityHandler):
        async def on_message_activity(self, turn_context: TurnContext):
          # hightlight-start
          card = {"type": "AdaptiveCard", "version": "1.0", "body": [{"type": "TextBlock", "text": "hello world"}]}
          attachment = Attachment(content_type="application/vnd.microsoft.card.adaptive", content=card)
          activity = Activity(type="message", attachments=[attachment])
          await turn_context.send_activity(activity)
          # highlight-end
```

# [Teams SDK](#tab/TeamsSDK)

```python showLineNumbers
    from microsoft_teams.api import MessageActivity
    from microsoft_teams.apps import ActivityContext, App
    from microsoft_teams.cards import AdaptiveCard, TextBlock

    @app.on_message
    async def on_message(context: ActivityContext[MessageActivity]):
        # highlight-next-line
        await context.send(AdaptiveCard(body=[TextBlock(text="Hello from Adaptive Card!")]))
```

---

## Attachments

# [BotBuilder](#tab/BotBuilder)

```python showLineNumbers
    from botbuilder.core import ActivityHandler, TurnContext
    from botbuilder.schema import Activity, Attachment

    class MyActivityHandler(ActivityHandler):
        async def on_message_activity(self, turn_context: TurnContext):
            # highlight-start
            attachment = Attachment(...)
            activity = Activity(type="message", attachments=[attachment])
            await turn_context.send_activity(activity)
            # highlight-end
```

# [Teams SDK](#tab/TeamsSDK)

```python showLineNumbers
    from microsoft_teams.api import Attachment, MessageActivity, MessageActivityInput
    from microsoft_teams.apps import ActivityContext, App

    @app.on_message
    async def on_message(context: ActivityContext[MessageActivity]):
        # highlight-start
        attachment = Attachment(...)
        activity = MessageActivityInput().add_attachments([attachment])
        await context.send(activity)
        # highlight-end
```

---

::: zone-end

::: zone pivot="teams-sdk-typescript"

# [BotBuilder](#tab/BotBuilder)

```typescript showLineNumbers
    import { TeamsActivityHandler } from 'botbuilder';

    export class ActivityHandler extends TeamsActivityHandler {
      constructor() {
        super();
        this.onMessage(async (context) => {
          // highlight-next-line
          await context.sendActivity({ type: 'typing' });
        });
      }
    }
```

# [Teams SDK](#tab/TeamsSDK)

```typescript showLineNumbers
    app.on('message', async ({ send }) => {
      // highlight-next-line
      await send({ type: 'typing' });
    });
```

---

## Strings

# [BotBuilder](#tab/BotBuilder)

```typescript showLineNumbers
    import { TeamsActivityHandler } from 'botbuilder';

    export class ActivityHandler extends TeamsActivityHandler {
      constructor() {
        super();
        this.onMessage(async (context) => {
          // highlight-next-line
          await context.sendActivity('hello world');
        });
      }
    }
```

# [Teams SDK](#tab/TeamsSDK)

```typescript showLineNumbers
    app.on('message', async ({ send }) => {
      // highlight-next-line
      await send('hello world');
    });
```

---

## Adaptive Cards

# [BotBuilder](#tab/BotBuilder)

```typescript showLineNumbers
    import { TeamsActivityHandler, CardFactory } from 'botbuilder';

    export class ActivityHandler extends TeamsActivityHandler {
      constructor() {
        super();
        this.onMessage(async (context) => {
          // highlight-start
          await context.sendActivity({
            type: 'message',
            attachments: [
              CardFactory.adaptiveCard({
                $schema: 'http://adaptivecards.io/schemas/adaptive-card.json',
                type: 'AdaptiveCard',
                version: '1.0',
                body: [{
                  type: 'TextBlock',
                  text: 'hello world'
                }]
              })
            ]
          });
          // highlight-end
        });
      }
    }
```

# [Teams SDK](#tab/TeamsSDK)

```typescript showLineNumbers
    import { AdaptiveCard, TextBlock } from '@microsoft/teams.cards';

    app.on('message', async ({ send }) => {
      // highlight-next-line
      await send(new AdaptiveCard(new TextBlock('hello world')));
    });
```

---

## Attachments

# [BotBuilder](#tab/BotBuilder)

```typescript showLineNumbers
    import { TeamsActivityHandler } from 'botbuilder';

    export class ActivityHandler extends TeamsActivityHandler {
      constructor() {
        super();
        this.onMessage(async (context) => {
          // highlight-start
          await context.sendActivity({
            type: 'message',
            attachments: [
              ...
            ]
          });
          // highlight-end
        });
      }
    }
```

# [Teams SDK](#tab/TeamsSDK)

```typescript showLineNumbers
    import { MessageActivityInput } from '@microsoft/teams.api';

    app.on('message', async ({ send }) => {
      // highlight-next-line
      await send(new MessageActivityInput().addAttachments(...));
    });
```

---

::: zone-end
