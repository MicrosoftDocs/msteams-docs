---
title: Enable an Agent to Receive All Chat Messages
description: Enable a Teams agent to receive all chat messages with RSC permissions. Learn how to update your app manifest and filter @mentions in group chats and channels.
ms.topic: article
ms.date: 10/09/2026
zone_pivot_groups: teams-sdk-languages
---

# Enable an agent to receive all chat messages

By default, the only chat messages that agents receive or can access via Graph APIs in group chats and channels are the ones where they're @mentioned. This behavior predates LLM-driven agents: historically, scripted or flow-based bots had no need to receive messages that didn't directly invoke them. Additionally, requiring the explicit consent of conversation owners for agents to access all of their conversation's messages aligns with Teams' stance on data privacy.

Modern agents are most effective when they can observe and process all of the messages in conversations where they participate. To receive and access all chat messages in group chats and channels, an agent must request the appropriate [resource-specific consent permissions](../graph-api/rsc/resource-specific-consent.md) via its manifest.

> [!NOTE]
> This capability is supported in Microsoft Teams commercial environments, [Government Community Cloud (GCC), GCC High, Department of Defense (DoD)](../concepts/cloud-overview.md#teams-app-capabilities), and [Teams operated by 21Vianet](../concepts/sovereign-cloud.md) environments.

## Update requested RSC permissions

To enable your agent to receive all messages in group chats and channels, include one or both of the following RSC permission declarations in the agent's app manifest:

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

### Update permissions in Developer Portal

Alternatively, use Teams Developer Portal to configure RSC permissions instead of editing the app manifest directly:

1. Sign in to [Developer Portal for Teams](https://dev.teams.microsoft.com/).
1. Select **Apps**, and then select your app.
1. Under **Configure**, select **Permissions**.
1. Under **Team permissions**, add `ChannelMessage.Read.Group` to receive channel messages.
1. Under **Chat/Meeting permissions**, add `ChatMessage.Read.Chat` to receive group chat messages.
1. Select **Save**.

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
