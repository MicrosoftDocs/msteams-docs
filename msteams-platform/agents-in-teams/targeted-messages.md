---
title: Send and Receive Targeted Messages
description: Use targeted messages to enable agents to privately interact with users in group conversations without distracting other users or revealing private information.
ms.localizationpriority: high
ms.date: 06/16/2026
ms.topic: article
zone_pivot_groups: select-language
---

<!-- markdownlint-disable MD023 -->
<!-- markdownlint-disable MD001 -->
<!-- markdownlint-disable MD024 -->

# Send and receive targeted messages in group conversations

_Targeted messaging_ enables users and agents to send each other messages in the context of a group conversation that can only be seen by the sender and the targeted recipient.

:::image type="content" source="../assets/images/agents-in-teams/targeted-messages/targeted-messages.png" alt-text="Image shows user scenarios for targeted messages" border="false" lightbox="../assets/images/agents-in-teams/targeted-messages/targeted-messages-main.png":::

With targeted messages, a user can privately send a message or command to an agent that remains in the context of a group conversation. When the agent responds in the chat or channel, it can use a targeted message to make the response visible only to that user. Agents can also proactively send targeted messages to users to privately communicate contextual information, offer assistance, or provide reminders relevant to the group conversation.

Targeted messaging isn't available in one-on-one chats, where the conversation is already private anyway. Targeted messages can only be sent between a single user and a single agent, not between two users or two agents.

## What are targeted messages

Targeted messages are private one-to-one messages between a user and an agent in a group conversation. They're presented in the flow of the conversation but only the sender and their single recipient can see them. Targeted messages disappear from Teams clients after 24 hours to avoid cluttering conversations, but might be retained in secure storage to comply with organizational retention requirements.

Sending targeted messages to any user in a group conversation is a capability of all Teams agents. To be eligible to _receive_ targeted messages, an agent must opt in via its configuration; see [Receive targeted messages](#receive-targeted-messages).

With targeted messaging, users and agents can privately interact without distracting other users or exposing information that isn't meant for the group. Consider the following scenarios:

- A user can ask an agent to generate a summary of the discussion without the other participants seeing the request or the response.
- A user can privately ask for information from an agent with the intent of sharing it with the group but wants to confirm the contents of the message first. The agent can respond privately, with a [suggested action](../bots/how-to/conversations/suggested-actions.md) requesting the user's approval to share its response. When the user approves, the agent resends the message publicly. For more information, see [best practices and design guidance](#best-practices-and-design-guidance).
- A user can direct and monitor background work with agents, referencing the context of the conversation, without distracting the other participants.
- An agent can detect a new user entering a large, long-running conversation and proactively send them a private welcome message and a summary.

> [!IMPORTANT]
> Targeted messaging is a fundamental part of agent design for group conversations and requires careful handling of user privacy expectations. For more information, see [best practices and design guidance](#best-practices-and-design-guidance).

### Key aspects of targeted messages

Targeted messages:

- Can be used only for one-to-one interactions between an agent and a user in channels, group chats, and meeting chats.
- Support all the [capabilities of standard messages](../bots/build-conversational-capability.md#message-content) like buttons, images, Adaptive Cards, and files, but don't support reactions, replies, or forwarding.
- Generally operate the same way as standard messages, with the same API operations. Users and agents can modify or delete targeted messages after sending them, but can't change their visibility. If a scenario calls for a private message to be made public, the sender should delete it and resend it as a standard message; see [best practices and design guidance](#best-practices-and-design-guidance).
- Expire 24 hours after being sent. When a targeted message expires, Teams deletes it from all clients, although it might be retained in secure storage based on organizational policy.
- Aren't visible to untargeted users, even if they're using an older version of the Teams client that doesn't support targeted messages.

## User experience

Targeted messages sent or received by a user are presented in the flow of the conversation with an indicator stating **Only you can see this message**.

:::image type="content" source="../assets/images/agents-in-teams/targeted-messages/targeted-message-example.png" alt-text="Image shows an example of targeted message." border="false":::

Users send targeted messages to an agent in a channel, group chat, or meeting chat by invoking its name as a _slash command_.

When a user enters a <kbd>/</kbd> in an empty compose box, Teams displays an autocomplete menu containing [built-in commands for common tasks](https://support.microsoft.com/office/use-commands-in-microsoft-teams-88f61508-284d-417f-a53d-9e082164050b). If the conversation includes agents that are eligible to receive targeted messages, the menu will also include a targeted-message command for each of them, named after the agent and displaying its icon.

Activating an agent's targeted message command switches the compose box to targeted message mode. After the user composes a message and selects **Send**, the resulting message will be targeted to the agent and can't be seen by other participants in the conversation.

For more information about slash commands, including how to register extra named slash commands that can be dispatched to your agent, see [expose slash commands from agents and apps](agent-slash-commands.md).

You can implement the following agent-to-user response flows:

- _Private response mode_ is the default for slash-command responses and keeps the interaction focused between the user and the agent. Use it for drafts, summaries, and personal tasks.
- _Public response_ mode lets the user share the response to the wider audience.
- _Private-to-public response flow_ enables [user approval for a private response](#approval-workflow-using-suggested-actions) to be shared publicly.

### Prompt preview in targeted messages

Prompt Preview helps preserve conversational context in targeted messaging scenarios by displaying a compact preview of the user's original request above the agent's response. Prompt Preview helps users understand the context of a response without exposing the original prompt to other participants. A single agent response can contain multiple prompt previews.

Prompt preview can appear in both private and public agent responses:

# [Private agent-to-user response](#tab/private)

The agent replies privately to the user's targeted message, so only the intended user can see the reply and the prompt preview.

  :::image type="content" source="../assets/images/agents-in-teams/agent-slash-commands/private-prompt-preview.png" alt-text="Image shows the prompt preview for private agent-to-user response." lightbox="../assets/images/agents-in-teams/agent-slash-commands/private-prompt-preview.png":::

# [Public agent-to-user response](#tab/public)

The agent sends a public resply to the user's request that includes the prompt preview. It's visible to everyone in the chat.

  :::image type="content" source="../assets/images/agents-in-teams/agent-slash-commands/public-prompt-preview.png" alt-text="Image shows the prompt preview for public agent-to-user response." lightbox="../assets/images/agents-in-teams/agent-slash-commands/public-prompt-preview.png":::

> [!NOTE]
> When an agent re-shares a private response publicly, the prompt preview shows the original targeted message above the agent response.

---

## Implement targeted messages

Targeted messages are sent and received using the same operations as [standard single-recipient messages](/microsoftteams/platform/teams-sdk/essentials/sending-messages/overview?pivots=typescript) in the Teams SDK, but have a Boolean property indicating whether they're targeted. You can also control response visibility and add prompt preview in the agent responses.

### Receive targeted messages

An agent must opt in via its manifest to be able to receive targeted messages. If not opted in, Teams won't give users the option to send a targeted message to the agent.

Agents that opt in to receive targeted messages should always check the visibility of messages they receive and take it into consideration when generating responses and tracking the context of a conversation. For more information, see [best practices and design guidance](#best-practices-and-design-guidance).

To opt in to receive targeted messages, the `bots` entry in its [app manifest](/microsoft-365/extensibility/schema/root-bots#supportstargetedmessages) of your agent must include a `true` value for the `supportsTargetedMessages` property.

```json
{
    "bots": [
        {
            "botId": "{{BOT_ID}}",
            "scopes": ["personal", "team", "groupChat"],
            "supportsTargetedMessages": true
        }
    ]
}
```

Agents receive messages via standard message events. Targeted messages can be distinguished from public messages as shown in the following snippet:

::: zone pivot="typescript"

  ```typescript

    app.on('message', async ({ send, activity }) => {
      if(activity.Recipient.isTargeted) {
         // Handle message event
        }
    });
  ```

::: zone-end

::: zone pivot="csharp"

```csharp

  teams.OnMessage(async (context, cancellationToken) => {
    if (context.Activity.Recipient?.IsTargeted == true){
      // Handle message event
    }
  });
```

::: zone-end

::: zone pivot="python"

```python

  @app.on_message
  async def handle_message(ctx):
    if getattr(ctx.activity.recipient, "is_targeted", False):
      # Handle message event
```

::: zone-end

### Send a targeted message

All agents in Teams are automatically eligible to send targeted messages. To send a targeted message, use `withRecipient` to specify a single recipient by their ID, and provide a value of `true` for the `isTargeted` argument. The recipient must be a member of the chat or channel.

::: zone pivot="typescript"

```typescript
import { MessageActivity } from '@microsoft/teams.api';

app.on('message', async ({ send, activity }) => {
  // Using withRecipient with isTargeted=true explicitly targets the specified recipient
  await send(
    new MessageActivity('This message is only visible to you!')
      .withRecipient(activity.from, true)
  );
});
```

::: zone-end

::: zone pivot="csharp"

```csharp
app.OnMessage(async context =>
{
// Using WithRecipient with isTargeted=true explicitly targets the specified recipient
await context.Send(
        new MessageActivity("This message is only visible to you!")
            .WithRecipient(context.Activity.From, isTargeted: true)
    );
});
```

::: zone-end

::: zone pivot="python"

```python
from microsoft_teams.api import MessageActivity, MessageActivityInput
from microsoft_teams.apps import ActivityContext

@app.on_message
async def handle_message(ctx: ActivityContext[MessageActivity]):
  # Using with_recipient with is_targeted=True explicitly targets the specified recipient
  await ctx.send(
      MessageActivityInput(text="This message is only visible to you!")
          .with_recipient(ctx.activity.from_, is_targeted=True)
  )
```

::: zone-end

> [!NOTE]
> If attempting to send a targeted message results in an error, consider sending a 1:1 chat message as a fallback.

#### Send replies using REST APIs

If you are sending replies through REST APIs, use the same `targetedMessageInfo` entity in the activity payload.

```HTTP
POST {cloud}/v3/conversations/{conversationId}/activities?isTargetedActivity=true
Authorization: Bearer eyJhbGciOiJIUzI1Ni...
Content-Type: application/json
Show more lines
JSON
{
"type": "message",
"from": {
"id": "28:c9e...",
"name": "Contoso"
},
"conversation": {
"id": "x:17I0...",
"name": "Convo1"
},
"recipient": {
"id": "29:1XJ...",
"name": "Megan Bowen"
},
"text": "My bot's reply",
"entities": [
{
"type": "targetedMessageInfo",
"messageId": "1772129782775"
}
]
}
```

Use `isTargetedActivity=true` for the private reply. For a public repost, send the message normally but keep the same `targetedMessageInfo` entity.

<!--
Response visibility is controlled by the `WithRecipient` configuration and the `isTargeted` property. Use `isTargeted: true` with `WithRecipient` to deliver a private, user-specific response within a shared conversation. Use `isTargeted: false` with `WithRecipient` only when you need to identify an intended recipient while keeping the message visible according to the normal conversation context. This distinction allows developers to identify an intended recipient without automatically creating a private or ephemeral experience.
-->

### Integrate prompt preview in a targeted message

Prompt preview can appear in both private and public agent responses, but the implementation mechanism is the same in both cases: the agent includes `targetedMessageInfo` that references the original targeted message. The difference is only who can see the reply after it is sent.

Prompt Preview can be added automatically in _reactive_ scenarios such as when replying with `send()` or `reply()` to a user’s targeted message or slash-command request through the Teams SDK or REST API. These SDK methods typically attach the `targetedMessageInfo` entity automatically, keeping the response associated with the incoming user interaction and tied to the original prompt. In _proactive_ flows, however, the agent sends the response outside the original turn, so it must explicitly add the `targetedMessageInfo` entity and reference the targeted message ID before sending the private or public message, ensuring the preview points to the correct original request.

To render prompt preview, include a `targetedMessageInfo` entity in the reply activity and set its `messageId` value to the message ID of the original targeted message, which Teams uses to show the user's original request above the agent response, as shown in this example:

::: zone pivot="typescript"

```typescript
if (isTargeted) {
response.addTargetedMessageInfo(targetedMessageId);
}
```

::: zone-end

::: zone pivot="csharp"

```csharp

if (isTargeted)
{
response.AddTargetedMessageInfo(targetedMessageId);
}
```

::: zone-end

::: zone pivot="python"

```python

if is_targeted:
response.add_targeted_message_info(activity.id)
```

::: zone-end

```json

"entities": [{
  "type": "targetedMessageInfo",
  "messageId": "xxxxxxxxxxxxx"
}]

```

This example demonstrates the `entities` array needed to add prompt preview with `messageId` of the original message on a reply activity with `type` set to `targetedMessageInfo`, so the original message appears in the prompt preview.

### Update or delete a targeted message

Targeted messages can be updated and deleted in the same way as standard messages, with the following limitations:

- The visibility of a targeted message can't be changed.
- Targeted messages expire after 24 hours and are automatically deleted from clients. Attempting to modify or delete an expired message results in an error.

For more information on updating or deleting a targeted message, see [Teams SDK](/microsoftteams/platform/teams-sdk/essentials/sending-messages/overview?pivots=csharp).

## Approval Workflow Using suggested actions

User approval is a key safeguard in targeted messaging workflows. Since an agent’s response may contain user-specific information, explicit user consent is required before sharing it in a public conversation.

The agent can respond privately, with a [suggested action](../bots/how-to/conversations/suggested-actions.md) requesting the user's approval to share its response. When the user approves, the agent resends the message publicly. The approval experience can be implemented through interactive review surfaces such as Adaptive Cards or suggested actions. Here's a recommended user approval workflow:

1. Receive the user’s targeted request.
1. Send the agent’s response privately, including a prompt preview for context.
1. Present approval options using Suggested Actions or an Adaptive Card.
1. Publish the response to the conversation only after the user approves sharing.

Recommended actions can include Approve, Reject, Share, and Update.

## Best practices and design guidance

Targeted messaging is a fundamental part of group conversations that include agents. Users expect agents to respect the privacy boundaries it creates, unless they approve it for sharing with wider audience.

Agents that can receive targeted messages should **always** check the visibility of messages received in group contexts and use it to inform response generation and conversation context tracking.

When designing agent interactions for group conversations, choosing between public and targeted messages in different situations requires careful judgment:

- A targeted request to an agent should result in a targeted response, unless the user or the situation explicitly calls for a public response.
- Public messages should be used in situations that are purely informational and don't require user-specific context. They should benefit the entire group and shouldn't contain any private information.
- Take care when using Adaptive Cards in targeted messages. Although the message itself is targeted, interactions with a card can still generate public activity that users might not expect.
- Use Prompt Preview whenever an agent responds to a targeted user request. Compared with [quoted replies](/microsoftteams/platform/teams-sdk/essentials/sending-messages/overview?pivots=csharp), this helps users understand the relationship between their original prompt and the agent’s response without requiring them to locate the earlier message.

## Errors

Targeted message operations can return `400 Bad argument` when the payload is invalid. On create, this error usually means the recipient is missing. Call `WithRecipient(account, isTargeted: true)` with a valid Account object. The same requirement applies to the `Send TM` API.

`400 Bad argument` can also occur when recipient data is included where it shouldn't be. Don't pass a recipient on update or delete, and don't include it in the `Edit TM` API payload.
`403 BotNotInConversationRoster` means the bot isn't a member of the conversation. Install the bot in the conversation before sending targeted messages. `404 ActivityNotFoundInConversation` means the message ID wasn't found. The message might have been deleted or expired after 24 hours. In that case, send a new targeted message or wait for user input, based on business logic.

In prompt preview scenarios, `400 INVALID_TARGETED_MESSAGE_ID` means the targeted message ID is invalid. Verify that the ID is correct. `404 TARGETED_MESSAGE_EXPIRED_OR_DELETED` means the referenced message was deleted or expired after 24 hours. In that case, send a new targeted message or wait for user input, based on business logic.

More details on other messaging error codes can be found [here](../bots/build-conversational-capability.md#status-codes-from-bot-conversational-apis).

## Code sample

| Sample name | Description | .NET | TypeScript | Python |
| --- | --- | --- | --- | --- |
| Agent Targeted Messages | This sample demonstrates how to use targeted messaging in Microsoft Teams. Targeted messages are private messages that appear in a shared channel or group chat but are only visible to a specific user. The sample implements a reminder agent where all agent responses — confirmations, reminder deliveries, active reminder lists, and snooze confirmations — are sent as targeted messages. | [View](https://github.com/OfficeDev/Microsoft-Teams-Samples/tree/main/samples/TeamsSDK/agent-targeted-messages/dotnet/agent-targeted-messages) | [View](https://github.com/OfficeDev/Microsoft-Teams-Samples/tree/main/samples/TeamsSDK/agent-targeted-messages/nodejs/agent-targeted-messages) | [View](https://github.com/OfficeDev/Microsoft-Teams-Samples/tree/main/samples/TeamsSDK/agent-targeted-messages/python/agent-targeted-messages) |

## Related content

- [Proactive messages](../bots/how-to/conversations/send-proactive-messages.md)
- [Send and receive messages](../bots/build-conversational-capability.md)
- [Expose slash commands from agents and apps](agent-slash-commands.md)
- [Suggested actions](../bots/how-to/conversations/suggested-actions.md)
