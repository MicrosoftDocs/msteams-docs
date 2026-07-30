---
title: Send and Receive Targeted Messages
description: Use targeted messages to enable agents to privately interact with users in group conversations without distracting other users or revealing private information.
ms.localizationpriority: high
ms.date: 07/17/2026
ms.topic: article
zone_pivot_groups: select-language
---

<!-- markdownlint-disable MD023 -->
<!-- markdownlint-disable MD001 -->
<!-- markdownlint-disable MD024 -->

# Send and receive targeted messages in group conversations

:::image type="content" source="../assets/images/agents-in-teams/targeted-messages/targeted-messages.png" alt-text="Image shows user scenarios for targeted messages" border="false" lightbox="../assets/images/agents-in-teams/targeted-messages/targeted-messages.png":::

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
- Generally operate the same way as standard messages, with the same API operations. Users and agents can modify or delete targeted messages after sending them but can't change their visibility. If a scenario calls for a private message to be made public, the sender should delete it and resend it as a standard message; see [best practices and design guidance](#best-practices-and-design-guidance).
- Expire 24 hours after being sent. When a targeted message expires, Teams deletes it from all clients, although it might be retained in secure storage based on organizational policy.
- Aren't visible to untargeted users, even if they're using an older version of the Teams client that doesn't support targeted messages.

## User experience

Targeted messages sent or received by a user are presented in the flow of the conversation with an indicator stating **Only you can see this message**.

:::image type="content" source="../assets/images/agents-in-teams/targeted-messages/targeted-message-example.png" alt-text="Image shows an example of targeted message." border="false":::

Users send targeted messages to an agent in a channel, group chat, or meeting chat by invoking its name as a _slash command_.

When a user enters a <kbd>/</kbd> in an empty compose box, Teams displays an autocomplete menu containing [built-in commands for common tasks](https://support.microsoft.com/office/use-commands-in-microsoft-teams-88f61508-284d-417f-a53d-9e082164050b). If the conversation includes agents that are eligible to receive targeted messages, the menu will also include a targeted-message command for each of them, named after the agent and displaying its icon.

Activating an agent's targeted message command switches the compose box to targeted message mode. After the user composes a message and selects **Send**, the resulting message will be targeted to the agent and can't be seen by other participants in the conversation.

For more information about slash commands, including how to register extra named slash commands that can be dispatched to your agent, see [expose slash commands from agents and apps](agent-slash-commands.md).

### Prompt Preview in targeted messages

Prompt Preview helps preserve conversational context in targeted messaging scenarios by displaying a compact preview of the user's original request above the agent's response. Prompt Preview helps users understand the context of a response without exposing the original prompt to other participants. A single agent response can contain multiple prompt previews.

Prompt Preview can appear in both private and public agent responses:

# [Private agent-to-user response](#tab/private)

The agent replies privately to the user's targeted message, so only the intended user can see the reply and the prompt preview.

  :::image type="content" source="../assets/images/agents-in-teams/targeted-messages/private-prompt-preview.png" alt-text="Image shows the prompt preview for private agent-to-user response." lightbox="../assets/images/agents-in-teams/agent-slash-commands/private-prompt-preview.png":::

# [Public agent-to-user response](#tab/public)

The agent sends a public reply to the user's request that includes the prompt preview. It's visible to everyone in the chat.

  :::image type="content" source="../assets/images/agents-in-teams/targeted-messages/public-prompt-preview.png" alt-text="Image shows the prompt preview for public agent-to-user response." lightbox="../assets/images/agents-in-teams/agent-slash-commands/public-prompt-preview.png":::

> [!NOTE]
> When an agent re-shares a private response publicly, the prompt preview shows the original targeted message above the agent response.

---

### Quoted replies in targeted messages

Quoted replies reference an earlier message in a thread, helping readers identify what a response relates to and navigate back to the original context. Use a quoted reply when responding to an earlier point in a busy thread or when readers may need to return to the referenced message. Quoted replies support thread navigation, while Prompt Preview preserves the private prompt-response relationship for targeted agent responses and approval-based sharing.

For more information, see [quoted replies](/microsoftteams/platform/teams-sdk/essentials/sending-messages/overview?pivots=csharp).

## Implement targeted messages

Targeted messages are sent and received using the same operations as [standard single-recipient messages](/microsoftteams/platform/teams-sdk/essentials/sending-messages/overview?pivots=typescript) in the Teams SDK but have a Boolean property indicating whether they're targeted.

### Receive targeted messages

An agent must opt in via its manifest to be able to receive targeted messages. If not opted in, Teams won't give users the option to send a targeted message to the agent.

Agents that opt in to receive targeted messages should always check the visibility of messages they receive and take it into consideration when generating responses and tracking the context of a conversation. For more information, see [best practices and design guidance](#best-practices-and-design-guidance).

To opt in to receive targeted messages, set `supportsTargetedMessages` property to `true` in your agent’s `bots` entry in the [app manifest](/microsoft-365/extensibility/schema/root-bots#supportstargetedmessages).

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

### Integrate prompt preview in a targeted message

Prompt Preview can appear in both private and public agent responses, but the implementation mechanism is the same in both cases: the agent includes `targetedMessageInfo` that references the original targeted message. The difference is only who can see the reply after it is sent.

Prompt Preview is automatically supported in _reactive_ scenarios, such as when an agent replies to a user’s targeted message or slash-command request using `send()` or `reply()` through the Teams SDK or REST API. In these cases, the SDK typically adds the `targetedMessageInfo` entity automatically, linking the response to the original user request.

In _proactive_ scenarios, the response is sent outside the original conversation turn. As a result, the agent must explicitly include the `targetedMessageInfo` entity and provide the targeted message ID before sending the private or public message.

This ensures the response remains associated with the correct original request and enables Prompt Preview to display the appropriate user prompt.

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

#### Send replies using REST APIs

If you are sending replies through REST APIs, use the same `targetedMessageInfo` entity in the activity payload.

```HTTP
POST {cloud}/v3/conversations/{conversationId}/activities?isTargetedActivity=true
Authorization: Bearer eyJhbGciOiJIUzI1Ni...
Content-Type: application/json

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
  "text": "My agent's reply",
  "entities": [
    {
      "type": "targetedMessageInfo",
      "messageId": "1772129782775"
    }
  ]
}
```

Use `isTargetedActivity=true` for the private reply. For a public repost, send the message normally but keep the same `targetedMessageInfo` entity.

To render prompt preview, include a `targetedMessageInfo` entity in the reply activity and set its `messageId` value to the message ID of the original targeted message to show the user's original request above the agent response, as shown in this example:

```json

"entities": [{
  "type": "targetedMessageInfo",
  "messageId": "xxxxxxxxxxxxx"
}]

```

This example adds a `targetedMessageInfo` entity `type` to the activity’s `entities` array and references the original user message through its `messageId`. This association enables _Prompt Preview_ and enables the original request to appear above the agent response.

### Update or delete a targeted message

Targeted messages can be updated and deleted in the same way as standard messages, with the following limitations:

- The visibility of a targeted message can't be changed.
- Targeted messages expire after 24 hours and are automatically deleted from clients. Attempting to modify or delete an expired message results in an error.

For more information on updating or deleting a targeted message, see [Teams SDK](/microsoftteams/platform/teams-sdk/essentials/sending-messages/overview?pivots=csharp#targeted-messages).

### Approval workflow using suggested actions

User approval is a key safeguard in targeted messaging workflows. Since an agent’s response may contain user-specific information, explicit user consent is required before sharing it in a public conversation.

The agent can respond privately, with a [suggested action](../bots/how-to/conversations/suggested-actions.md) requesting the user's approval to share its response. When the user approves, the agent resends the message publicly. The approval experience can be implemented through interactive review surfaces such as Adaptive Cards or suggested actions. Here's a recommended user approval workflow:

1. Receive the user’s targeted request.
1. Send the agent’s response privately, including a prompt preview for context.
1. Present approval options using Suggested Actions or an Adaptive Card.
1. Publish the response to the conversation only after the user approves sharing.

Recommended actions can include Approve, Reject, Share, and Update.

## Best practices and design guidance

The ability for users and agents to communicate privately with targeted messaging is a fundamental consideration in group conversations. Agents should **always** consider the visibility of messages they receive and use it to inform response generation, response visibility, and whether the original request should be tracked as part of the conversation's context.

When designing agent interactions for group conversations, choosing between public and targeted messages in different situations requires careful judgment:

- A targeted request to an agent should result in a targeted response unless the user or the situation explicitly calls for a public response.
- Public messages should be used in situations that are purely informational and don't require user-specific context. They should benefit the entire group and shouldn't contain any private information.
- Take care when using Adaptive Cards in targeted messages. Although the message itself is targeted, interactions with a card can still generate public activity that users might not expect.
- Use Prompt Preview whenever an agent responds to a targeted user request. Compared with [quoted replies](/microsoftteams/platform/teams-sdk/essentials/sending-messages/overview?pivots=csharp), this helps users understand the relationship between their original prompt and the agent’s response without requiring them to locate the earlier message.

## Handle errors

Ensure to handle these errors appropriately in your agent or app.

# [Teams SDK](#tab/tsdk)

Here's a list of error codes, error descriptions, and developer actions for Teams SDK:

| Status code | Error code | Description | Developer action |
| --- | --- | --- | --- |
| 400 | `Bad argument` | On create, the payload is invalid because the recipient is missing. | Call `WithRecipient(account, isTargeted: true)` with a valid Account object. |
| 400 | `Bad argument` | Recipient data was included in an update or delete operation, where it is not allowed. | Do not pass a recipient on update or delete. |
| 400 | `INVALID_TARGETED_MESSAGE_ID` | In prompt preview scenarios, the targeted message ID is invalid. | In prompt preview scenario, verify that the targeted message ID is correct. |
| 403 | `BotNotInConversationRoster` | The agent or bot app is not a member of the conversation. | Ensure bot is installed in the conversation before sending targeted messages. |
| 404 | `ActivityNotFoundInConversation` | The message ID was not found. The message might have been deleted or expired after 24 hours. | Ensure the agent either sends a new targeted message or waits for user input, as per business logic. |
| 404 | `TARGETED_MESSAGE_EXPIRED_OR_DELETED` | In prompt preview scenarios, the referenced message was deleted or expired after 24 hours. | Send a new targeted message or wait for user input, based on business logic. |

# [HTTP](#tab/api)

The following table lists error codes, error descriptions, and developer actions for REST APIs:

| Status code | Error code | Description | Developer action |
| --- | --- | --- | --- |
| 400 | `Bad argument` | On create, the payload is invalid because the recipient is missing. | Ensure that recipient is included in the payload of the `Send TM` API when the agent sends the message as it's mandatory. |
| 400 | `Bad argument` | Recipient is included in the payload of the `Edit TM` API in an update or delete operation, where it is not allowed. | Ensure the recipient isn't included in the payload of the `Edit TM` API. |
| 400 | `INVALID_TARGETED_MESSAGE_ID` | In prompt preview scenarios, the targeted message ID is invalid. | In prompt preview scenario, verify that the targeted message ID is correct. |
| 403 | `BotNotInConversationRoster` | Bot isn't a member of the conversation. | Ensure the agent or bot app is installed in the conversation before sending targeted messages. |
| 404 | `ActivityNotFoundInConversation` | The message ID was not found. The message might have been deleted or expired after 24 hours. | Send a new targeted message or wait for user input, based on business logic. |
| 404 | `TARGETED_MESSAGE_EXPIRED_OR_DELETED` | In prompt preview scenarios, the referenced message was deleted or expired after 24 hours. | Send a new targeted message or wait for user input, based on business logic. |

---

More details on other messaging error codes can be found [here](../bots/build-conversational-capability.md#status-codes-from-agent-conversational-apis).

## Code sample

| Sample name | Description | .NET | TypeScript | Python |
| --- | --- | --- | --- | --- |
| Agent Targeted Messages | This sample demonstrates how to use targeted messaging in Microsoft Teams. Targeted messages are private messages that appear in a channel or group chat but are only visible to a specific user. The sample implements a reminder agent where all agent responses — confirmations, reminder deliveries, active reminder lists, and snooze confirmations — are sent as targeted messages. | [View](https://github.com/OfficeDev/Microsoft-Teams-Samples/tree/main/samples/TeamsSDK/agent-targeted-messages/dotnet/agent-targeted-messages) | [View](https://github.com/OfficeDev/Microsoft-Teams-Samples/tree/main/samples/TeamsSDK/agent-targeted-messages/nodejs/agent-targeted-messages) | [View](https://github.com/OfficeDev/Microsoft-Teams-Samples/tree/main/samples/TeamsSDK/agent-targeted-messages/python/agent-targeted-messages) |

## Related content

- [Proactive messages](../bots/how-to/conversations/send-proactive-messages.md)
- [Send and receive messages](../bots/build-conversational-capability.md)
- [Expose slash commands from agents and apps](agent-slash-commands.md)
- [Suggested actions](../bots/how-to/conversations/suggested-actions.md)
