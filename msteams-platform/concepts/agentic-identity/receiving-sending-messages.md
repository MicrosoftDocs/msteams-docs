---
title: Receiving and Sending Messages as an Agentic User
description: Receive messages and send replies, reactions, and proactive messages as an Agentic User.
ms.topic: article
zone_pivot_groups: teams-sdk-languages
ms.date: 11/23/2026
---

# Receiving and sending messages as an Agentic User

Configure the blueprint client ID, credential, and tenant ID in your app's SDK credentials. Teams SDK uses them to acquire tokens for the Agentic User.

## Reactive messaging

An inbound Agent 365 activity includes the Agentic User in `activity.recipient`. The handler context automatically uses that identity for replies, sends, and API calls.

::: zone pivot="teams-sdk-csharp"

```csharp
teams.OnMessage(async (context, cancellationToken) =>
{
    AgenticIdentity? agenticIdentity =
        context.Activity.Recipient?.GetAgenticIdentity();

    if (agenticIdentity?.AgenticUserId is not string agenticUserId)
    {
        throw new InvalidOperationException(
            "The activity is not addressed to an Agentic User.");
    }

    await context.ReplyAsync(
        $"Hi! I'm an Agentic User, and my user ID is {agenticUserId}. Nice to meet you!",
        cancellationToken);
});
```

::: zone-end

::: zone pivot="teams-sdk-typescript"

```typescript
import { getAgenticIdentity } from '@microsoft/teams.api';
import { App } from '@microsoft/teams.apps';

const app = new App();

app.on('message', async ({ activity, reply }) => {
  const agenticIdentity = getAgenticIdentity(activity.recipient);
  if (!agenticIdentity?.agenticUserId) {
    throw new Error('The activity is not addressed to an Agentic User.');
  }

  await reply(
    `Hi! I'm an Agentic User, and my user ID is ${agenticIdentity.agenticUserId}. Nice to meet you!`
  );
});
```

::: zone-end

::: zone pivot="teams-sdk-python"

```python
from microsoft_teams.api import MessageActivity
from microsoft_teams.apps import ActivityContext, App

app = App()


@app.on_message
async def handle_message(ctx: ActivityContext[MessageActivity]) -> None:
    agentic_identity = ctx.activity.recipient.agentic_identity
    if agentic_identity is None or agentic_identity.agentic_user_id is None:
        raise RuntimeError("The activity is not addressed to an Agentic User.")

    await ctx.reply(
        f"Hi! I'm an Agentic User, and my user ID is "
        f"{agentic_identity.agentic_user_id}. Nice to meet you!"
    )
```

::: zone-end

> [!NOTE]
> The blueprint authenticates the runtime, but it isn't the sender. Replies and API calls use the Agentic User from the inbound activity.

## Bot capabilities

Most Teams capabilities available to standard bots are also available to Agentic Users, including cards, reactions, and API calls.

This example adds a reaction to an incoming message as the Agentic User:

::: zone pivot="teams-sdk-csharp"

```csharp
teams.OnMessage(async (context, cancellationToken) =>
{
    await context.Api.Conversations.AddReactionAsync(
        context.Activity.Conversation.Id,
        context.Activity.Id,
        ReactionType.Like,
        cancellationToken: cancellationToken
    );
});
```

::: zone-end

::: zone pivot="teams-sdk-typescript"

```typescript
app.on('message', async ({ activity, api }) => {
  await api.conversations.addReaction(activity.conversation.id, activity.id, 'like');
});
```

::: zone-end

::: zone pivot="teams-sdk-python"

```python
@app.on_message
async def react_to_message(ctx: ActivityContext[MessageActivity]) -> None:
    await ctx.api.conversations.add_reaction(
        ctx.activity.conversation.id,
        ctx.activity.id,
        "like",
    )
```

::: zone-end

For more reaction options, see [Use emoji reactions in Teams chat](../../agents-in-teams/agent-reactions.md).

## Proactive messaging

A proactive operation has no inbound activity that identifies the sender. Create an `AgenticIdentity` associated with the Agentic User, then pass it as the operation scope. The app helper supplies the required blueprint ID from app configuration; the Agentic App Instance and Agentic User IDs select the user-backed scope used by this example.

:::image type="content" source="../../assets/agentic-identity-proactive-message.png" alt-text="Diagram illustrating the difference between reactive and proactive messages for agentic identities.":::

If your app will send proactive messages later, store the conversation ID, service URL, Agentic App Instance ID, Agentic User ID, and tenant ID in persistent storage when it receives an activity. When you send, pass the stored service URL to select the destination, and the agentic identity to send as the Agentic User rather than as the bot.

::: zone pivot="teams-sdk-csharp"

```csharp
var agenticIdentity = new AgenticIdentity
{
    AgenticAppId = agenticAppId,
    AgenticUserId = agenticUserId,
    AgenticAppBlueprintId = blueprintId,
    TenantId = tenantId
};

await teams.SendAsync(
    conversationId,
    "Your scheduled update is ready.",
    serviceUrl,
    agenticIdentity,
    cancellationToken);

ApiClient api = teams.Api
    .ForServiceUrl(serviceUrl)
    .ForAgenticIdentity(agenticIdentity);

await api.Conversations.AddReactionAsync(
    conversationId,
    activityId,
    ReactionType.Like,
    cancellationToken: cancellationToken);
```

::: zone-end

::: zone pivot="teams-sdk-typescript"

```typescript
const agenticIdentity = app.getAgenticIdentity({
  agenticAppId,
  agenticUserId,
  tenantId,
});

await app.send(conversationId, 'Your scheduled update is ready.', {
  serviceUrl,
  agenticIdentity,
});

const api = app.api.clone({ serviceUrl, agenticIdentity });

await api.conversations.addReaction(conversationId, activityId, 'like');
```

For requirements and routing behavior, see [Per-call service URLs in TypeScript](../../bots/how-to/conversations/send-proactive-messages.md#per-call-service-urls-in-typescript).

::: zone-end

::: zone pivot="teams-sdk-python"

```python
agentic_identity = app.get_agentic_identity(
    agentic_app_id,
    agentic_user_id,
    tenant_id=tenant_id,
)

await app.send(
    conversation_id,
    "Your scheduled update is ready.",
    service_url=service_url,
    agentic_identity=agentic_identity,
)

api = app.api.clone(service_url=service_url, agentic_identity=agentic_identity)

await api.conversations.add_reaction(conversation_id, activity_id, "like")
```

::: zone-end
