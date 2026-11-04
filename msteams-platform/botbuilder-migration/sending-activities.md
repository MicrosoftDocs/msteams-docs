---
title: Sending Activities
description: Migrate from BotBuilder's TurnContext activity sending to Teams SDK's simplified send method with better Adaptive Card support.
ms.topic: how-to
zone_pivot_groups: dev-lang
ms.date: 10/09/2026
---
# Sending Activities

::: zone pivot="csharp"
This article is not available for the selected development language.
::: zone-end

::: zone pivot="typescript,python"

## Sending Activities

BotBuilder's pattern for sending activities via its `TurnContext` is similar to that in Teams SDK,
but one key difference is that sending adaptive cards doesn't require constructing the entire activity yourself.
::: zone-end

::: zone pivot="python"
# [Diff](#tab/Diff)
```python
    # highlight-error-start
-   from botbuilder.core import ActivityHandler, TurnContext
-   from botbuilder.schema import Activity
    # highlight-error-end
    # highlight-success-start
+   from microsoft_teams.api import MessageActivity, TypingActivityInput
+   from microsoft_teams.apps import ActivityContext, App
    # highlight-success-end

    # highlight-error-start
-   class MyActivityHandler(ActivityHandler):
-       async def on_message_activity(self, turn_context: TurnContext):
-           await turn_context.send_activity(Activity(type="typing"))
    # highlight-error-end
    # highlight-success-start
+   @app.on_message
+   async def on_message(context: ActivityContext[MessageActivity]):
+       await context.send(TypingActivityInput())
    # highlight-success-end
    ```

---

# [BotBuilder](#tab/BotBuilder)
```python showLineNumbers
    from botbuilder.core import ActivityHandler, TurnContext
    from botbuilder.schema import Activity

    class MyActivityHandler(ActivityHandler):
        async def on_message_activity(self, turn_context: TurnContext):
            # highlight-next-line
            await turn_context.send_activity(Activity(type="typing"))
    ```

---

# [Teams SDK](#tab/Teams SDK)
```python showLineNumbers
    from microsoft_teams.api import MessageActivity, TypingActivityInput
    from microsoft_teams.apps import ActivityContext, App

    @app.on_message
    async def on_message(context: ActivityContext[MessageActivity]):
        # highlight-next-line
        await context.send(TypingActivityInput())
    ```

## Strings

# [Diff](#tab/Diff)
```python
    # highlight-error-start
-   from botbuilder.core import ActivityHandler, TurnContext
    # highlight-error-end
    # highlight-success-start
+   from microsoft_teams.api import MessageActivity
+   from microsoft_teams.apps import ActivityContext, App
    # highlight-success-end

    # highlight-error-start
-   class MyActivityHandler(ActivityHandler):
-       async def on_message_activity(self, turn_context: TurnContext):
-           await turn_context.send_activity("hello world")
    # highlight-error-end
    # highlight-success-start
+   @app.on_message
+   async def on_message(context: ActivityContext[MessageActivity]):
+       await context.send("hello world")
    # highlight-success-end
    ```

---

# [BotBuilder](#tab/BotBuilder)
```python showLineNumbers
    from botbuilder.core import ActivityHandler, TurnContext

    class MyActivityHandler(ActivityHandler):
        async def on_message_activity(self, turn_context: TurnContext):
            # highlight-next-line
            await turn_context.send_activity("hello world")
    ```

---

# [Teams SDK](#tab/Teams SDK)
```python showLineNumbers
    from microsoft_teams.api import MessageActivity
    from microsoft_teams.apps import ActivityContext, App

    @app.on_message
    async def on_message(context: ActivityContext[MessageActivity]):
        # highlight-next-line
        await context.send("hello world")
    ```

## Adaptive Cards

# [Diff](#tab/Diff)
```python
    # highlight-error-start
-   from botbuilder.core import ActivityHandler, TurnContext
-   from botbuilder.schema import Activity, Attachment
    # highlight-error-end
    # highlight-success-start
+   from microsoft_teams.api import MessageActivity
+   from microsoft_teams.apps import ActivityContext, App
+   from microsoft_teams.cards import AdaptiveCard, TextBlock
    # highlight-success-end

    # highlight-error-start
-   class MyActivityHandler(ActivityHandler):
-       async def on_message_activity(self, turn_context: TurnContext):
-         card = {"type": "AdaptiveCard", "version": "1.0", "body": [{"type": "TextBlock", "text": "hello world"}]}
-         attachment = Attachment(content_type="application/vnd.microsoft.card.adaptive", content=card)
-         activity = Activity(type="message", attachments=[attachment])
-         await turn_context.send_activity(activity)
    # highlight-error-end
    # highlight-success-start
+   @app.on_message
+   async def on_message(context: ActivityContext[MessageActivity]):
+       await context.send(AdaptiveCard().with_body([TextBlock(text="Hello from Adaptive Card!")]))
    # highlight-success-end
    ```

---

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

---

# [Teams SDK](#tab/Teams SDK)
```python showLineNumbers
    from microsoft_teams.api import MessageActivity
    from microsoft_teams.apps import ActivityContext, App
    from microsoft_teams.cards import AdaptiveCard, TextBlock

    @app.on_message
    async def on_message(context: ActivityContext[MessageActivity]):
        # highlight-next-line
        await context.send(AdaptiveCard(body=[TextBlock(text="Hello from Adaptive Card!")]))
    ```

## Attachments

# [Diff](#tab/Diff)
```python
    # highlight-error-start
-   from botbuilder.core import ActivityHandler, TurnContext
-   from botbuilder.schema import Activity, Attachment
    # highlight-error-end
    # highlight-success-start
+   from microsoft_teams.api import Attachment, MessageActivity, MessageActivityInput
+   from microsoft_teams.apps import ActivityContext, App
    # highlight-success-end

    # highlight-error-start
-   class MyActivityHandler(ActivityHandler):
-       async def on_message_activity(self, turn_context: TurnContext):
-         attachment = Attachment(...)
-         activity = Activity(type="message", attachments=[attachment])
-         await turn_context.send_activity(activity)
    # highlight-error-end
    # highlight-success-start
+   @app.on_message
+   async def on_message(context: ActivityContext[MessageActivity]):
+       attachment = Attachment(...)
+       activity = MessageActivityInput().add_attachments([attachment])
+       await context.send(activity)
    # highlight-success-end
    ```

---

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

---

# [Teams SDK](#tab/Teams SDK)
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
::: zone-end

::: zone pivot="typescript"
# [Diff](#tab/Diff)
```typescript
    // highlight-error-start
-    import { TeamsActivityHandler } from 'botbuilder';

-    export class ActivityHandler extends TeamsActivityHandler {
-      constructor() {
-        super();
-        this.onMessage(async (context) => {
-          await context.sendActivity({ type: 'typing' });
-        });
-      }
-    }
    // highlight-error-end
    // highlight-success-start
+    app.on('message', async ({ send }) => {
+      await send({ type: 'typing' });
+    });
    // highlight-success-end
    ```

---

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

---

# [Teams SDK](#tab/Teams SDK)
```typescript showLineNumbers
    app.on('message', async ({ send }) => {
      // highlight-next-line
      await send({ type: 'typing' });
    });
    ```

## Strings

# [Diff](#tab/Diff)
```typescript
    // highlight-error-start
-    import { TeamsActivityHandler } from 'botbuilder';

-    export class ActivityHandler extends TeamsActivityHandler {
-      constructor() {
-        super();
-        this.onMessage(async (context) => {
-          await context.sendActivity('hello world');
-        });
-      }
-    }
    // highlight-error-end
    // highlight-success-start
+    app.on('message', async ({ send }) => {
+      await send('hello world');
+    });
    // highlight-success-end
    ```

---

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

---

# [Teams SDK](#tab/Teams SDK)
```typescript showLineNumbers
    app.on('message', async ({ send }) => {
      // highlight-next-line
      await send('hello world');
    });
    ```

## Adaptive Cards

# [Diff](#tab/Diff)
```typescript
    // highlight-error-line
-    import { TeamsActivityHandler, CardFactory } from 'botbuilder';
    // highlight-success-line
+    import { AdaptiveCard, TextBlock } from '@microsoft/teams.cards';

    // highlight-error-start
-    export class ActivityHandler extends TeamsActivityHandler {
-      constructor() {
-        super();
-        this.onMessage(async (context) => {
-          await context.sendActivity({
-            type: 'message',
-            attachments: [
-              CardFactory.adaptiveCard({
-                $schema: 'http://adaptivecards.io/schemas/adaptive-card.json',
-                type: 'AdaptiveCard',
-                version: '1.0',
-                body: [{
-                  type: 'TextBlock',
-                  text: 'hello world'
-                }]
-              })
-            ]
-          });
-        });
-      }
-    }
    // highlight-error-end
    // highlight-success-start
+    app.on('message', async ({ send }) => {
+      await send(new AdaptiveCard(new TextBlock('hello world')));
+    });
    // highlight-success-end
    ```

---

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

---

# [Teams SDK](#tab/Teams SDK)
```typescript showLineNumbers
    import { AdaptiveCard, TextBlock } from '@microsoft/teams.cards';

    app.on('message', async ({ send }) => {
      // highlight-next-line
      await send(new AdaptiveCard(new TextBlock('hello world')));
    });
    ```

## Attachments

# [Diff](#tab/Diff)
```typescript
    // highlight-error-line
-    import { TeamsActivityHandler } from 'botbuilder';
    // highlight-success-start
+    import { MessageActivityInput } from '@microsoft/teams.api';
+    import { AdaptiveCard, TextBlock } from '@microsoft/teams.cards';
    // highlight-success-end

    // highlight-error-start
-    export class ActivityHandler extends TeamsActivityHandler {
-      constructor() {
-        super();
-        this.onMessage(async (context) => {
-          await context.sendActivity({
-            type: 'message',
-            attachments: [
-              ...
-            ]
-          });
-        });
-      }
-    }
    // highlight-error-end
    // highlight-success-start
+    app.on('message', async ({ send }) => {
+      await send(new MessageActivityInput().addAttachments(...));
+    });
    // highlight-success-end
    ```

---

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

---

# [Teams SDK](#tab/Teams SDK)
```typescript showLineNumbers
    import { MessageActivityInput } from '@microsoft/teams.api';

    app.on('message', async ({ send }) => {
      // highlight-next-line
      await send(new MessageActivityInput().addAttachments(...));
    });
    ```
::: zone-end


