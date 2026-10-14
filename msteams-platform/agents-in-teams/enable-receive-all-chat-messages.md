---
title: Configure an Agent to Receive All Messages in Group Chats and Channels
description: Give your Teams agent full conversation context by enabling RSC permissions. Learn how to receive all channel and group chat messages regardless of @mentions.
ms.topic: article
ms.date: 10/09/2026
zone_pivot_groups: teams-sdk-languages
---

# Configure an agent to receive all messages in group chats and channels

By default, in group chats and channels, the only chat messages that an agent receives or can access through Graph APIs are the messages in which it's @mentioned. To receive and access all messages from the group chats and channels it's in, an agent must declare the appropriate [resource-specific consent (RSC) permissions](../graph-api/rsc/resource-specific-consent.md) in its app manifest.

Most LLM-driven agents benefit from requesting these permissions so they can use the full contents of a conversation as context and proactively interact with users when appropriate. However, you should carefully design and evaluate your agent to ensure appropriate behavior with respect to data privacy and user expectations for agent participation.

The permissions described in this article are only relevant to agents that are installable in `team` and/or `groupChat` scopes. They don't provide agents with access to additional conversations, only to additional *messages* in conversations they can already access.

> [!NOTE]
> This capability is supported in Microsoft Teams commercial environments, [Government Community Cloud (GCC), GCC High, Department of Defense (DoD)](../concepts/cloud-overview.md#teams-app-capabilities), and [Teams operated by 21Vianet](../concepts/sovereign-cloud.md) environments.

## Update declared RSC permissions

To configure an agent to receive all messages in group chats and/or channels, include one or both of the following RSC permission declarations in the agent's app manifest:

* `ChannelMessage.Read.Group`: Receive all messages in the channels of the team where the app is installed.
* `ChatMessage.Read.Chat`: Receive all messages in the group chat where the app is installed.

Example:

```json
{
    "webApplicationInfo": {
      "id": "<MICROSOFT-ENTRA-APP-ID>",
      "resource": "https://RscBasedStoreApp"
    },
    "authorization": {
      "permissions": {
        "resourceSpecific": [
          {
            "name": "ChannelMessage.Read.Group",
            "type": "Application"
          },
          {
            "name": "ChatMessage.Read.Chat",
            "type": "Application"
            }
        ]
      }
    }
}
```

After you update the permissions, install or upgrade the app in the target team or group chat. The team or chat owner must consent to the requested RSC permissions during installation.

For more information, see the [app manifest schema documentation](/microsoft-365/extensibility/schema/root-authorization-permissions).

### Update permissions by using Developer Portal

Alternatively, use Teams Developer Portal to configure RSC permissions instead of editing the app manifest directly:

1. Sign in to [Developer Portal for Teams](https://dev.teams.microsoft.com/).
1. Select **Apps**, and then select your app.
1. Under **Configure**, select **Permissions**.
1. Under **Team permissions**, add `ChannelMessage.Read.Group` to receive channel messages.
1. Under **Chat/Meeting permissions**, add `ChatMessage.Read.Chat` to receive group chat messages.
1. Select **Save**.

## Why don't agents receive all group chat and channel messages by default?

Agents that don't benefit from full message access can minimize processing load, data privacy concerns, and complexity by retaining the @mention limitation. Scripted and flow-based bots aren't designed to benefit from additional context in messages that don't directly invoke them. Even for LLM-powered agents, invoke-based interaction and limited context might be sufficient for some scenarios.

Users generally expect modern agents to observe all messages in group chats and channels, and it's a critical capability for many agent scenarios. Even so, requiring developers to opt in gives them a choice, and requiring users to consent sets clear expectations about the boundaries of an agent's participation.

## Filter @mention messages

In some scenarios, once an agent has access to all messages in a conversation, it can be helpful to distinguish between messages where the agent is @mentioned and where it isn't. Messages in which the agent is @mentioned typically include direct requests from users and are of the highest relevance, and you might want to prioritize their processing when the agent is under load. When retrieving and using historical messages to assemble context, @mention messages might be considered higher-priority than other messages.

The following code illustrates how to create a filter to determine whether the agent is @mentioned in a message. Here, it's shown in use as a filter on received messages, but it can be applied to message activities in any scenario.

::: zone pivot="teams-sdk-csharp"

```csharp
// When ChannelMessage.Read.Group or ChatMessage.Read.Chat RSC is in the app manifest, this method is called even when agent is not @mentioned.
// This code snippet allows the agent to ignore all messages that do not @mention the agent.
teams.OnMessage(async (context, cancellationToken) =>
{
    // Ignore the message if agent was not mentioned.
    // Remove this if block to process all messages received by the agent.
    if (!context.Activity.GetMentions().Any(mention => mention.Mentioned.Id.Equals(context.Activity.Recipient.Id, StringComparison.OrdinalIgnoreCase)))
    {
        return;
    }

// Sends an activity to the sender of the incoming activity.
await context.SendAsync(
    "Using RSC the agent can receive messages across channels or chats in team without being @mentioned.",
    cancellationToken);
});
```

::: zone-end

::: zone pivot="teams-sdk-typescript"

```typescript
// When ChannelMessage.Read.Group or ChatMessage.Read.Chat RSC is in the app manifest, this method is called even when agent is not @mentioned.
// This code snippet allows the agent to ignore all messages that do not @mention the agent.
app.on('message', async ({ activity, send }) => {
  // Ignore the message if agent was not mentioned.
  // Remove this if block to process all messages received by the agent.
  const mentioned = activity.entities?.some(
    (entity) =>
      entity.type === 'mention' &&
      entity.mentioned?.id === activity.recipient.id
  );

  if (!mentioned) {
    return;
  }

  // Sends an activity to the sender of the incoming activity.
  await send(
    'Using RSC the agent can receive messages across channels or chats in team without being @mentioned.'
  );
});
```

::: zone-end

::: zone pivot="teams-sdk-python"

```python
# When ChannelMessage.Read.Group or ChatMessage.Read.Chat RSC is in the app manifest, this method is called even when agent is not @mentioned.
# This code snippet allows the agent to ignore all messages that do not @mention the agent.
@app.on_message
async def handle_message(ctx: ActivityContext[MessageActivity]):
    # Ignore the message if agent was not mentioned.
    # Remove this if block to process all messages received by the agent.
    mentioned = any(
        entity.type == "mention"
        and entity.mentioned.id == ctx.activity.recipient.id
        for entity in (ctx.activity.entities or [])
    )

    if not mentioned:
        return

    # Sends an activity to the sender of the incoming activity.
    await ctx.send(
        "Using RSC the agent can receive messages across channels or chats in team without being @mentioned."
    )
```

::: zone-end

## Update the app description

To pass the Microsoft Teams Store approval, the app description must describe how an agent uses the data it has access to, including chat messages. If your agent receives all messages in conversations in which it participates, consider including a statement about how it uses and protects that data.

For more information, see [app descriptions](../concepts/deploy-and-publish/appsource/prepare/teams-store-validation-guidelines.md#app-descriptions).

## See also

* [Send and receive messages](../bots/build-conversational-capability.md)
* [Resource-specific consent for your Teams app](../graph-api/rsc/resource-specific-consent.md)
* [Test resource-specific consent permissions in Teams](../graph-api/rsc/test-resource-specific-consent.md)
* [Upload your app in Teams](../concepts/deploy-and-publish/apps-upload.md)
* [List replies to messages in a channel](/graph/api/chatmessage-list-replies?view=graph-rest-1.0&tabs=http&preserve-view=true)
