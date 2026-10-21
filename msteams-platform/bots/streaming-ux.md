---
title: Stream Agent Messages
description: Learn how to enhance the user experience in agents using streaming techniques and to stream message through Teams SDK and configure streaming agent messages. 
ms.date: 10/19/2026
ms.topic: article
zone_pivot_groups: teams-sdk-languages
---

# Stream agent messages

A Teams agent can provide realtime updates about its status as it prepares a chat response to a user, then stream the response content into the conversation as it's being generated. Using these techniques, agents can clearly acknowledge receipt of user messages, communicate liveness, and maximize overall responsiveness.

::: zone pivot="teams-sdk-csharp"

> [!NOTE]
> Implementing the streaming experience shown here with Teams SDK requires package `Microsoft.Teams.Apps` version 2.1.0 or newer. Agents using older versions of Teams SDK can only use the streaming API in one-on-one conversations between an agent and a user, and informative updates and response generation will render in a legacy experience.

::: zone-end

::: zone pivot="teams-sdk-python"

> [!NOTE]
> Implementing the streaming experience shown here with Teams SDK requires package `microsoft-teams-apps` version 2.0.15 or newer. Agents using older versions of Teams SDK can only use the streaming API in one-on-one conversations between an agent and a user, and informative updates and response generation will render in a legacy experience.

::: zone-end

::: zone pivot="teams-sdk-typescript"

> [!NOTE]
> Implementing the streaming experience shown here with Teams SDK requires package `@microsoft/teams.apps` version 2.0.14 or newer. Agents using older versions of Teams SDK can only use the streaming API in one-on-one conversations between an agent and a user, and informative updates and response generation will render in a legacy experience.

::: zone-end

## User experience

Message streaming consists of two phases: optional informative updates followed by message content streaming. A stop button displayed during both phases enables users to halt message generation.

### Informative updates

Informative updates are short texts that an agent can optionally display while preparing to stream a response to a user message. They're shown directly beneath the chat message to which the agent is responding, not in message bubbles, and are accompanied by an animated icon. Each new update the agent sends replaces the previous one.

:::image type="content" source="../assets/images/bots/stream-informative-update.png" alt-text="Screenshot of an informative update under the user's request." lightbox="../assets/images/bots/stream-informative-update.png":::

Updates don't create notifications or trigger the unread message badge for the conversation. In group chats, channels, and meeting chats, informative updates are displayed to everyone in the conversation.

### Message content streaming

Message content streaming appends chunks of message content into a conversation bubble as an agent emits them.

:::image type="content" source="../assets/images/bots/stream-response-start.png" alt-text="Screenshot of the agent's response as it starts streaming." lightbox="../assets/images/bots/stream-response-start.png":::

Emitting the first content chunk creates the bubble and stops the display of informative updates. The bubble's position in the conversation remains fixed as streamed content is appended, and the bubble animates when the agent signals that streaming is complete.

<!-- TODO also mention stuff that only renders when message is finalized -->

Streamed messages sent using extended Markdown mode render their formatting progressively to provide a smooth reading experience. See [Format agent messages](how-to/format-your-bot-messages.md) for more information.

### Stop button

The stop button allows users to halt informative updates and message content streaming. It's displayed during both phases, a few seconds after each phase begins.

:::image type="content" source="../assets/images/bots/stream-stopped-response.png" alt-text="Screenshot of a partial response marked as stopped by a user." lightbox="../assets/images/bots/stream-stopped-response.png":::

In group chats, channels, and meeting chats, the stop button is available to all users in the conversation.

## General developer considerations for streaming

An agent can maintain only one open stream per conversation, but can have streams open in multiple conversations concurrently.

Each informative message text must not be more than 1 kb or 1000 characters.

Once an agent begins emitting streamed content, any further informative updates it emits will not be displayed.

[Extended Markdown mode](how-to/format-your-bot-messages.md) is compatible with message content streaming and enables progressively rendered formatting.

Use of the stop button is not accompanied by an event. When a user selects the stop button, informative updates and message content streaming are immediately halted in the client. Further attempts by the agent to emit informative updates or message content to the stream will result in `403 ContentStreamNotAllowed` errors with the error message "Content stream was canceled by user". Agents should anticipate this scenario and handle the error appropriately.

Streams time out and are automatically closed 10 minutes after the agent writes the first informative update or content chunk.

Informative updates and message content streaming are intended for responding to specific user messages within the context of the received message's activity handler. They're not supported in [proactive messaging scenarios](how-to/conversations/send-proactive-messages.md).

Some messaging features, such as attachment, AI labels, feedback buttons, and sensitivity labels are only rendered once the agent finishes streaming. For more information, see [attachments](/azure/bot-service/rest-api/bot-framework-rest-connector-add-rich-cards), [AI Content Labels](~/bots/how-to/bot-messages-ai-generated-content.md), and [user feedback controls](~/agents-in-teams/integrate-ai/user-feedback-controls.md).

## Implement streaming with Teams SDK

::: zone pivot="teams-sdk-csharp"

Use `TeamsStreamingWriter` to write informative updates and stream content. Finalize the writer after appending all content chunks.

# [C# SDK v2.1](#tab/dotnet-v2-1)

```csharp
teams.OnMessage(async (context, cancellationToken) =>
{
  TeamsStreamingWriter writer = TeamsStreamingWriter.CreateFromContext(context);

  await writer.SendInformativeUpdateAsync("Reviewing the latest project status...", cancellationToken);
  await Task.Delay(1000, cancellationToken);

  string summary = """
  ## Project status

  - [x] API tests passed
  - [x] Deployment checks completed
  - [ ] Final sign-off pending

  The release is on track for Friday.
  """;

  await writer.AppendResponseAsync(summary, cancellationToken);
  await writer.FinalizeResponseAsync(cancellationToken: cancellationToken);
});
```

The emitted content can include markdown headings, task lists, and emphasis to improve readability while the message streams in.

# [C# SDK<2.1(legacy)](#tab/dotnet-legacy)

```csharp
app.OnMessage(async (context, cancellationToken) =>
{   
   context.Stream.Update("Reviewing the latest project status...");
   await Task.Delay(1000);

   context.Stream.Emit("## Project status\n\n- [x] API tests passed\n- [x] Deployment checks completed\n- [ ] Final sign-off pending");
});
```

::: zone-end

::: zone pivot="teams-sdk-typescript"

Use `stream.update` to write informative updates before emitting message content. `stream.update` can be called multiple times with different update text.

Use `stream.emit` to write a chunk of content to the stream. Chunks will be rendered into the message as soon as they are received by Teams. After the first call to `stream.emit`, informative updates will no longer be shown and `stream.update` will have no effect.

```typescript
app.on('message', async ({ activity, stream }) => {
  stream.update("Preparing a project status update...");
  await new Promise(resolve => setTimeout(resolve, 1000));

  const summary = [
    '## Project status',
    '',
    '- [x] API tests passed',
    '- [x] Build completed',
    '- [ ] Final sign-off pending',
    '',
    'The rollout is still on track for Friday.'
  ].join('\n');

  stream.emit(new MessageActivityInput(summary).withTextFormat('extendedmarkdown'));
});
```

The same pattern works for multi-part responses that stream progressively, using extended Markdown to render headings, lists, and inline emphasis as each chunk arrives.

::: zone-end

::: zone pivot="teams-sdk-python"

Use `stream.update` to write informative updates before emitting message content. `stream.update` can be called multiple times with different update text.

Use `stream.emit` to write a chunk of content to the stream. Chunks will be rendered into the message as soon as they are received by Teams. After the first call to `stream.emit`, informative updates will no longer be shown and `stream.update` will have no effect.

```python
@app.on_message
async def handle_message(ctx: ActivityContext[MessageActivity]):
    ctx.stream.update("Preparing a status update...")
    await asyncio.sleep(1)

    status = """## Project status

- [x] API tests passed
- [x] Build completed
- [ ] Final sign-off pending

The rollout is still on track for Friday.
"""

    ctx.stream.emit(MessageActivityInput(text=status).with_text_format("extendedmarkdown"))
```

For a more natural streaming experience, emit a sequence of markdown-formatted text chunks and let Teams progressively render them as they arrive.

```python
@app.on_message
async def handle_message(ctx: ActivityContext[MessageActivity]):
    ctx.stream.update("Starting the *extended* markdown stream...", "markdown")
    await asyncio.sleep(1)

    for message in [
        "### Release summary\n\n- [x] Build complete\n- [x] Tests passed\n",
        "- [ ] Final sign-off pending\n\nThe app is ready to ship once approval is received.\n",
        "**Important:** package validation is still running in the background.",
    ]:
        await asyncio.sleep(0.5)
        ctx.stream.emit(MessageActivityInput(text=message).with_text_format("extendedmarkdown"))
```

::: zone-end

## Implement streaming via REST API

Despite its name, content streaming does not depend on HTTP streaming or similar technologies. At the HTTP API level, it's implemented as a sequence of requests. Each request either sets a new informative update text to be displayed or updates the contents of the streamed message.

### Open a stream

To begin streaming, send an activity payload to the `/conversations/<conversationId>/activities` endpoint including the following required payload values (in addition to other required values):

- `type`: `typing`
- `replyToId`: The ID of the user message being responded to. Optional in one-on-one conversations, but streaming and informative updates will render in a legacy experience.
- `text`: The first informative update text. If skipping the informative update phase, the first content chunk.
- `entities[0].type`: `streamInfo`
- `entities[0].streamType`: `informative`. If skipping the informative update phase and sending the first content chunk, set to `streaming`.
- `entities[0].streamSequence`: 1

```json
POST /conversations/<conversationId>/activities HTTP/1.1

{
  "type": "typing",
  "serviceurl": "<https://smba.trafficmanager.net/amer/>",
  "channelId": "msteams",
  "from": {
    "id": "<botId>",
    "name": "<BotName>"
  },
  "conversation": {
    "conversationType": "personal",
    "id": "<conversationId>"
  },
  "recipient": {
    "id": "<recipientId>",
    "name": "<recipientName>",
    "aadObjectId": "<recipient aad objecID>"
  },
  "locale": "en-US",
  "replyToId": "<userMessageId>",
  "text": "Searching through documents...",
  "entities":[
    {
      "type": "streaminfo",
      "streamType": "informative",
      "streamSequence": 1
    }
  ]
}
```

The `201 Created` response will include a JSON payload with an `id` property whose value must be used as the `entities.streamId` value in all subsequent requests.

### Send informative messages and message content updates

Once the stream is open, send additional requests using the stream's ID to display informative updates and stream message content. Include the following payload follows:

- `type`: `typing`
- `replyToId`: The ID of the user message being responded to. Optional in one-on-one conversations, but streaming and informative updates will render in a legacy experience.
- `text`: The new informative update text to display, or the entirety of the message content generated to this point
- `entities[0].type`: `streamInfo`
- `entities[0].streamType`: `informative` if setting a new informative update text, `streaming` if updating the message content
- `entities[0].streamSequence`: \<Incremented with each request sent\>

Once you begin sending message content, do not send any further informative updates, as they will not be displayed.

When streaming message content, each request represents a full message update, not just new content to be appended. Accumulate content locally as it is generated and send the entire accumulated value as the payload's `text` with each request. Requests that attempt to change content provided in previous request will result in a `403 ContentStreamNotAllowed` error with the message `Request streamed content should contain the previously streamed content`.

Each streaming request can include additional `entities` values representing message features, but most features will not be rendered in the Teams client until the stream is closed.

The service is rate-limited to 1 per second, per stream. Buffer generated content to throttle requests as necessary.

```json
POST /conversations/<conversationId>/activities HTTP/1.1 
{
  "type": "typing",
  "serviceurl": "https://smba.trafficmanager.net/amer/",
  "channelId": "msteams",
  "from": {
    "id": "<botId>",
    "name": "<BotName>"
  },
  "conversation": {
    "conversationType": "personal",
    "id" : "<conversationId>"
  },
  "recipient": {
    "id": "<recipientId>",
    "name": "<recipientName>",
    "aadObjectId": "<recipient aad objecID>"
  },
  "locale": "en -US",
  "replyToId": "<userMessageId>",
  "text": "Searching through emails...",
  "entities":[
    {
      "type": "streaminfo",
      "streamId": "a-0000l",
      "streamType": "informative",
      "streamSequence": 2
    }
  ],
}
```

### Close the stream

Once message generation is complete, close the stream by sending a message activity with the following payload properties:

- `type`: `message`
- `replyToId`: The ID of the user message being responded to. Optional in one-on-one conversations, but streaming and informative updates will render in a legacy experience.
- `text`: The complete message contents
- `entities[0].type`: `streamInfo`
- `entities[0].streamId`: The `id` value obtained from the initial response
- `entities[0.streamType`: `final`

Do not include `entities[0].streamSequence` in the final request payload.

```json
POST /conversations/<conversationId>/activities HTTP/1.1
{
  "type": "message",
  "serviceurl" : "https://smba.trafficmanager.net/amer/ ",
  "channelId": "msteams",
  "from": {
    "id": "<botId>",
    "name": "<BotName>"
  },
  "conversation": {
    "conversationType": "personal",
    "id" : "<conversationId>"
  },
  "recipient": {
    "id" : "recipientId>",
    "name": "<recipientName>",
    "aadObjectId": "<recipient aad objecID>"
  },
  "locale": "en-US",
  "replyToId": "<userMessageId>", // ID of the user's message that the agent is responding to. Required in conversations other than one-on-one chats.
  "text": "A brown fox jumped over the fence.", // (required) first streaming content.
  "entities":[
    {
      "type": "streaminfo",
      "streamId": "a-0000l", // // (required) must be present for any subsequent request after the first chunk.
      "streamType": "final", // (required) final is only allowed for the last message of the streaming.
    }
  ],
}
```

## Response codes

The following are the success and error codes:

### Success codes

| Http status code | Return value | Description |
| --- | --- | --- |
| `201` | `streamId`, this is the same as `activityId` such as `{"id":"1728640934763"}` | The agent returns this value after sending the initial streaming request. </br> For any subsequent streaming requests, the `streamId` is required. |
| `202` | `{}` | Success code for any subsequent streaming requests. |

### Error codes

| Http status code | Error code | Error message | Description |
| --- | --- | --- | --- |
| `202` | `ContentStreamSequenceOrderPreConditionFailed` | `PreCondition failed exception when processing streaming activity.` | Few streaming requests might arrive out of sequence and get dropped. The most recent streaming request, determined by `streamSequence`, is used when requests are received in a disordered manner. Ensure to send each request in a sequential manner. |
| `400` | `BadRequest` | Depending on the scenario, you might encounter various error messages such as `Start streaming activities should include text` | The incoming payload doesn't adhere to or contain the necessary values. |
| `403` | `ContentStreamNotAllowed` | `Content stream is not allowed` | The streaming API feature isn't allowed for the user or agent. |
| `403` | `ContentStreamNotAllowed` | `Content stream is not allowed on an already completed streamed message` | An agent can't continuously stream on a message that has already streamed and completed. |
| `403` | `ContentStreamNotAllowed` | `Content stream finished due to exceeded streaming time.` | The agent failed to complete the streaming process within the time limit of 10 minutes. |
| `403` | `ContentStreamNotAllowed` | `Message size too large` | The agent sent a message that exceeds the current [message size](~/bots/how-to/format-your-bot-messages.md) restriction. |
| `403` | `ContentStreamNotAllowed` | `Content stream was canceled by user` | The streaming was stopped by the user. |
| `403` | `ContentStreamNotAllowed` | `Request streamed content should contain the previously streamed content` | The incoming content for the stream message does not contain what has been already streamed. |
| `429` | NA | `API calls quota exceeded` | The number of messages streamed by the agent has exceeded quota. |

## Code sample

| Sample name | Description | Node.js | C# | Python |
| --- | --- | --- | --- | --- |
| Teams SDK streaming sample | This sample shows how to stream agent responses and use extended Markdown formatting in the latest SDKs. | [View](https://github.com/microsoft/teams-sdk/tree/release/v1/js/samples/04.ai-apps/a.teamsChefBot) | [View](https://github.com/microsoft/teams-sdk/tree/release/v1/dotnet/samples) | [View](https://github.com/microsoft/teams.py/tree/main/examples/stream) |
| Streaming + extended Markdown sample | This sample demonstrates progressive rendering of markdown-formatted output while content is still streaming. | [View](https://github.com/microsoft/teams-sdk/tree/release/v1/js/samples/04.ai-apps/a.teamsChefBot) | NA | [View](https://github.com/microsoft/teams-sdk/tree/release/v1/python/samples/04.ai.h.chainedActions.listBot-streaming) |

## See also

- [Format your bot messages](how-to/format-your-bot-messages.md)
- [AI Content Labels](~/bots/how-to/bot-messages-ai-generated-content.md)
- [User feedback controls](~/agents-in-teams/integrate-ai/user-feedback-controls.md)
- [Teams SDK](/microsoftteams/platform/teams-ai-library/welcome)
- [Best practices and features checklist for Teams agents](how-to/teams-conversational-ai/agents-best-practices-features-checklist.md)
