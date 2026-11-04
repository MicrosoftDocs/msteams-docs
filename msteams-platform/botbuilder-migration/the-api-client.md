---
title: The API Client
description: Replace BotBuilder's static TeamsInfo class with Teams SDK's injected ApiClient for cleaner API interactions.
ms.topic: how-to
zone_pivot_groups: dev-lang
ms.date: 10/09/2026
---
# The API Client

::: zone pivot="csharp"
This article is not available for the selected development language.
::: zone-end

::: zone pivot="typescript,python"

## The API Client

BotBuilder exposes a static class `TeamsInfo` that allows you to query the api. In Teams SDK
we pass an instance of our `ApiClient` into all our activity handlers through the context.

> [!TIP]
> The Teams SDK `ApiClient` uses a fluent API pattern that makes it easier to discover available methods through IDE autocompletion.

::: zone-end

::: zone pivot="python"
# [Diff](#tab/Diff)
```python
  # highlight-error-start
-  from botbuilder.core import ActivityHandler, TurnContext
-  from botbuilder.core.teams import TeamsInfo
  # highlight-error-end
  # highlight-success-line
+  from microsoft_teams.apps import ActivityContext
+  from microsoft_teams.api import MessageActivity

  # highlight-error-start
-  class MyActivityHandler(ActivityHandler):
-      async def on_message_activity(self, turn_context: TurnContext):
-          members = await TeamsInfo.get_members(turn_context)
  # highlight-error-end
  # highlight-success-start
+  @app.on_message
+  async def on_message(context: ActivityContext[MessageActivity]):
+      members = await context.api.conversations.get_members(context.activity.conversation.id)
  # highlight-success-end
  ```

---

# [BotBuilder](#tab/BotBuilder)
```python showLineNumbers
    from botbuilder.core import ActivityHandler, TurnContext
    from botbuilder.core.teams import TeamsInfo

    class MyActivityHandler(ActivityHandler):
        async def on_message_activity(self, turn_context: TurnContext):
            # highlight-next-line
            members = await TeamsInfo.get_members(turn_context)
    ```

---

# [Teams SDK](#tab/Teams SDK)
```python showLineNumbers
    from microsoft_teams.api import MessageActivity
    from microsoft_teams.apps import ActivityContext

    @app.on_message
    async def on_message(context: ActivityContext[MessageActivity]):
        # highlight-next-line
        members = await context.api.conversations.get_members(context.activity.conversation.id)
    ```
::: zone-end

::: zone pivot="typescript"
# [Diff](#tab/Diff)
```typescript
  // highlight-error-start
-  import {
-    CloudAdapter,
-    ConfigurationBotFrameworkAuthentication,
-    TeamsInfo,
-  } from 'botbuilder';
  // highlight-error-end
  // highlight-success-line
+  import { App } from '@microsoft/teams.apps';

  // highlight-error-start
-  const auth = new ConfigurationBotFrameworkAuthentication(process.env);
-  const adapter = new CloudAdapter(auth);
  // highlight-error-end
  // highlight-success-line
+  const app = new App();

  // highlight-error-start
-  export class ActivityHandler extends TeamsActivityHandler {
-    constructor() {
-      super();
-      this.onMessage(async (context) => {
-        const members = await TeamsInfo.getMembers(context);
-      });
-    }
-  }
  // highlight-error-end
  // highlight-success-start
+  app.on('message', async ({ api, activity }) => {
+    const members = await api.conversations.getMembers(activity.conversation.id);
+  });
  // highlight-success-end
  ```

---

# [BotBuilder](#tab/BotBuilder)
```typescript showLineNumbers
    import {
      CloudAdapter,
      ConfigurationBotFrameworkAuthentication,
      TeamsInfo,
    } from 'botbuilder';

    const auth = new ConfigurationBotFrameworkAuthentication(process.env);
    const adapter = new CloudAdapter(auth);

    export class ActivityHandler extends TeamsActivityHandler {
      constructor() {
        super();
        this.onMessage(async (context) => {
          // highlight-next-line
          const members = await TeamsInfo.getMembers(context);
        });
      }
    }
    ```

---

# [Teams SDK](#tab/Teams SDK)
```typescript showLineNumbers
    import { App } from '@microsoft/teams.apps';

    const app = new App();

    app.on('message', async ({ api, activity }) => {
      // highlight-next-line
      const members = await api.conversations.getMembers(activity.conversation.id);
    });
    ```
::: zone-end

::: zone pivot="typescript,python"
## Mapping TeamsInfo APIs to Teams SDK ApiClient Methods

The following table shows common BotBuilder `TeamsInfo` methods and their equivalent Teams SDK `ApiClient` methods:
::: zone-end

::: zone pivot="python"
| BotBuilder (TeamsInfo) | Teams SDK (ApiClient) |
|------------------------|----------------------|
| `TeamsInfo.get_member(context, user_id)` | `api.conversations.get_member_by_id(conversation_id, user_id)` |
| `TeamsInfo.get_team_details(context, team_id)` | `api.teams.get_by_id(team_id)` |
| `TeamsInfo.get_meeting_info(context, meeting_id)` | `api.meetings.get_by_id(meeting_id)` |
| `TeamsInfo.send_message_to_teams_channel(context, team_id, message)` | `api.conversations.create(CreateConversationParams)` then `api.conversations.create_activity(conversation_id, activity)` |
::: zone-end

::: zone pivot="typescript"
| BotBuilder (TeamsInfo) | Teams SDK (ApiClient) |
|------------------------|----------------------|
| `TeamsInfo.getMember(context, userId)` | `api.conversations.getMemberById(conversationId, userId)` |
| `TeamsInfo.getTeamDetails(context, teamId)` | `api.teams.getById(teamId)` |
| `TeamsInfo.getMeetingInfo(context, meetingId)` | `api.meetings.getById(meetingId)` |
| `TeamsInfo.sendMessageToTeamsChannel(context, teamId, message)` | `api.conversations.create(CreateConversationParams)` then `api.conversations.createActivity(conversationId, activity)` |
::: zone-end

