---
title: Stream Agent Messages
description: Learn how to enhance the user experience in agents using streaming techniques and to stream message through Teams SDK and configure streaming agent messages. 
ms.date: 10/19/2026
ms.topic: article
zone_pivot_groups: teams-sdk-languages
---

# Stream agent messages

While a Teams agent is preparing a response to a user in chat, it can provide realtime insight about its status and stream the message content into the conversation as its generated. These techniques effectively communicate that an agent has received a message and is processing it, and improve overall agent responsiveness.

> [!NOTE]
> Implementing the current streaming experience requires Teams SDK 2.1.0 or newer. Older versions of Teams SDK can stream messages only in one-on-one conversations between an agent and a user, and informative updates and response generation will render in a legacy experience.

## User experience

Streaming an agent message has two phases: informative updates and response streaming. Users are also presented with a stop button that halts streaming.

Each agent in a conversation can stream one message into the conversation at a time. Multiple agents can stream messages into a conversation simultaneously.

### Informative updates

Informative updates provide insight into an agent's actions before it begins generating a response message. They appear with an animated icon beneath the message to which the agent is responding, not as a separate message. Each emitted update replaces the previous one, and the final update remains displayed until the agent begins streaming its response or a user selects the stop button, even as the conversation continues. They don't create notifications or unread messages.

:::image type="content" source="../assets/images/bots/stream-informative-update.png" alt-text="Screenshot shows an informative update under the user's request." lightbox="../assets/images/bots/stream-informative-update.png" border="false":::

In group chats, channels, and meeting chats, informative updates are displayed to everyone. Each informative message text must not be more than 1 kb or 1000 characters.

### Response streaming

When an agent begins streaming a response, a message bubble is created in the conversation into which the content is streamed. Any remaining informative update disappears, and the agent can no longer send them for the current message activity.

:::image type="content" source="../assets/images/bots/stream-response-start.png" alt-text="Screenshot shows the agent's response as it starts streaming." lightbox="../assets/images/bots/stream-response-start.png" border="false":::

The bubble remains in the same position as content is streamed to it, and animates to indicate when streaming is completed.

Streamed messages sent using extended Markdown mode will render formatting progressively to provide a smooth reading experience. See [Format agent messages](how-to/format-your-bot-messages.md) for more information.

### Stop button

The stop button enables users to halt message streaming. It's available during both informative update generation and response streaming, and is displayed a few seconds after each one begins.

In group chats, channels, and meeting chats, the stop button is available to all users in the conversation.

## General developer considerations for streaming

An agent can maintain only one active stream per conversation, but can have a stream open in each of multiple conversations concurrently.

Once an agent begins emitting the streamed response, any further informative updates it emits will be ignored.

Use of the stop button is not accompanied by an event. After a user selects the stop button, updates to the user experience are immediately halted, and further informative updates or writes to the stream will result in a 403 `ContentStreamNotAllowed` error that should be handled appropriately.

Streams time out and are automatically closed 10 minutes after the agent writes the first informative update or response chunk.

Streaming is not supported in [proactive messaging scenarios](how-to/conversations/send-proactive-messages.md), with the exception of one-on-one conversations between an agent and a user. In one-on-one conversations, informative updates and streamed responses are rendered using a legacy experience.

## Implement streaming with Teams SDK

> [!NOTE]
> Implementing the current streaming experience requires Teams SDK 2.1.0 or newer. Older versions of Teams SDK can stream messages only in one-on-one conversations between an agent and a user, and informative updates and response generation will render in a legacy experience.

::: zone pivot="teams-sdk-csharp"

Use `TeamsStreamingWriter` to write informative updates and stream response content. Finalize the writer after appending all response chunks.

# [C# SDK v2.1](#tab/dotnet-v2-1)

```csharp
teams.OnMessage(async (context, cancellationToken) =>
{
  TeamsStreamingWriter writer = TeamsStreamingWriter.CreateFromContext(context);

  await writer.SendInformativeUpdateAsync("Testing", cancellationToken);
  await Task.Delay(1000, cancellationToken);
  await writer.AppendResponseAsync("hello", cancellationToken);
  await writer.AppendResponseAsync(", ", cancellationToken);
  await writer.AppendResponseAsync("world!", cancellationToken);
  await writer.FinalizeResponseAsync(cancellationToken: cancellationToken);
});
```

# [C# SDK<2.1(legacy)](#tab/dotnet-legacy)

```csharp
app.OnMessage(async (context, cancellationToken) =>
{   
   context.Stream.Update("Testing");
   await Task.Delay(1000);
   context.Stream.Emit("hello");
   context.Stream.Emit(", ");
   context.Stream.Emit("world!");
});
```

::: zone-end

::: zone pivot="teams-sdk-typescript"

Use `stream.update` to write informative updates before beginning the message stream. `stream.update` can be called multiple times with different update text.

Use `stream.emit` to write a chunk of content to the stream. Chunks will be rendered into the message as soon as they are received by Teams. After the first call to `stream.emit`, informative updates will no longer be shown and `stream.update` will have no effect.

```typescript
app.on('message', async ({ activity, stream }) => {
  stream.update("Thinking...");
  await new Promise(resolve => setTimeout(resolve, 1000))  
  stream.emit('hello');
  stream.emit(', ');
  stream.emit('world!');

  // result message: "hello, world!"
});
```

::: zone-end

::: zone pivot="teams-sdk-python"

Use `stream.update` to write informative updates before beginning the message stream. `stream.update` can be called multiple times with different update text.

Use `stream.emit` to write a chunk of content to the stream. Chunks will be rendered into the message as soon as they are received by Teams. After the first call to `stream.emit`, informative updates will no longer be shown and `stream.update` will have no effect.

```python
@app.on_message
async def handle_message(ctx: ActivityContext[MessageActivity]):
    ctx.stream.update("Stream starting...")
    await asyncio.sleep(1)

    # Stream messages with delays using ctx.stream.emit
    for message in STREAM_MESSAGES:
        # Add some randomness to timing
        await asyncio.sleep(random())

        ctx.stream.emit(message)
```

::: zone-end

## Implement streaming via REST API

Agent messages can be streamed through REST API. Streaming messages support rich text and citation. Attachment, AI-label, feedback button, and sensitivity labels are available only for the final streaming message. For more information, see [attachments](/azure/bot-service/rest-api/bot-framework-rest-connector-add-rich-cards), [AI Content Labels](~/bots/how-to/bot-messages-ai-generated-content.md), and [user feedback controls](~/agents-in-teams/integrate-ai/user-feedback-controls.md).

When your agent invokes streaming through REST API, ensure to call the next streaming API only after receiving a successful response from the initial API call. If your agent uses SDK, verify that you receive a null response object from the send activity method to confirm that the previous call was successfully transmitted.

When your agent calls streaming API too fast, you may encounter issues and streaming experience can be interrupted. We recommend that your agent streams one message at a time to ensure that it calls the streaming API at a consistent pace. If not, the request might be throttled. Buffer the tokens from the model for 1.5 to two seconds to ensure a smooth streaming process.

The following are the properties for streaming agent messages:

| Property | Required | Description |
| --- | --- | --- |
| `type` | ✔️ | Supported values are either `typing` or `message`. </br> • `typing`: Use when streaming the message. </br> • `message`: Use for the final streamed message. |
| `replyToId` | | The ID of the user's message that the agent is responding to. Teams uses this value to associate informative updates and the streamed response with the user's message. Required to stream in group chats, meeting chats, and channels. Include it in every streaming request, including the final message. If you omit this value in a one-on-one chat, streaming uses the previous user experience. |
| `text` | ✔️ | The contents of the message that is to be streamed. Teams renders this value in the agent's message bubble. For an `informative` update, the text stays visible until the next update or the first streamed chunk replaces it. A start streaming activity that omits `text` is rejected. |
| `entities.type` | ✔️ | Must be `streamInfo` |
| `entities.streamId` | ✔️ | `streamId` from the initial streaming request, [start streaming](#start-streaming). |
| `entities.streamType` | | Type of streaming updates. Supported values are either `informative`, `streaming`, or `final`. The default value is `streaming`. `final` is used only in the final message. |
| `entities.streamSequence` | ✔️ | Incremental integer for each request. |

> [!NOTE]
> For REST APIs, `streamSequence` must start at 1 and increment by 1 for each subsequent streaming request. Don't set `streamSequence` for the final message.
> The Teams typing animation isn't available while a stream is open. If your agent doesn't have response content yet, send a meaningful informative update instead of empty or whitespace text.
>

To enable streaming in agents, follow these steps:

1. [Start streaming](#start-streaming)
1. [Continue streaming](#continue-streaming)
1. [Final streaming](#final-streaming)

### Start streaming

The agent can send either an informative or a streaming message as its initial communication. The response includes the `streamId`, which is important for executing subsequent calls.

A start streaming activity must include `text`. If `text` is missing, the request fails with a `400 BadRequest` response and the error message `Start streaming activities should include text`. Teams renders this value in the message bubble, so use a meaningful informative update for the first activity. For more information, see [error codes](#error-codes).

Your agent can send multiple informative updates while processing the user's request such as, **Scanning through documents**, **Summarizing Content**, and **Found relevant work items**. You can send these updates before your agent generates its final response to the user.

```json

//Ex: An agent sends the first request with content & the content is informative loading message.

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
    "id": "<conversationId>"
  },
  "recipient": {
    "id": "<recipientId>",
    "name": "<recipientName>",
    "aadObjectId": "<recipient aad objecID>"
  },
  "locale": "en-US",
  "replyToId": "<userMessageId>", // ID of the user's message that the agent is responding to. Required in conversations other than one-on-one chats.
  "text": "Searching through documents...", //(required) first informative loading message.
  "entities":[
    {
      "type": "streaminfo",
      "streamType": "informative", // informative or streaming; default= streaming.
      "streamSequence": 1 // (required) incremental integer; must be present for start and continue streaming request, but must not be set for final streaming request.
    }
  ],
}

201 created { "id": "a-0000l" } // return stream id

```

The following image is an example of start streaming:

:::image type="content" source="../assets/images/bots/start_streaming.png" alt-text="Screenshot shows start streaming." lightbox="../assets/images/bots/start_streaming.png" border="false":::

### Continue streaming

Use the `streamId` that you've received from the initial request to send either informative or streaming messages. You can [start with informative updates](#start-with-informative-updates) and later [switch to response streaming](#switch-to-response-streaming) when the final response is ready.

#### Start with informative updates

As your agent generates a response send informative updates to the user such as, **Scanning through documents**, **Summarizing Content**, and **Found relevant work items**. Ensure that you make subsequent calls only after the agent receives successful response from the previous calls.

Each informative update replaces the previous one in the message bubble and remains visible to the user until the next update or the first streamed chunk arrives.

```json

// Ex: An agent sends the second request with content & the content is informative loading message.

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
  "replyToId": "<userMessageId>", // ID of the user's message that the agent is responding to. Required in conversations other than one-on-one chats.
  "text": "Searching through emails...", // (required) second informative loading message.
  "entities":[
    {
      "type": "streaminfo",
      "streamId": "a-0000l", // // (required) must be present for any subsequent request after the first chunk.
      "streamType": "informative", // informative or streaming; default= streaming.
      "streamSequence": 2 // (required) incremental integer; must be present for start and continue streaming request, but must not be set for final streaming request.
    }
  ],
} 
202 0K { }

```

The following image is an example of an agent providing informative updates:

:::image type="content" source="../assets/images/bots/stream-informative-update.png" alt-text="Screenshot shows an informative update under the user's request." lightbox="../assets/images/bots/stream-informative-update.png" border="false":::

#### Switch to response streaming

After your agent is ready to generate its final message for the user, switch from providing informative updates to response streaming.

The message `text` of each stream update request sent by your agent must contain the previously streamed content as well as newly-emitted content. As your agent generates content, accumulate it locally in a string and send its entire contents with each request.

The throttling limit is 1 request per second for each agent in a conversation thread. You must ensure that the agent sends the request  within this limit. The agent may send requests at a slower rate, as needed.

```json

// Ex: An agent sends the third request with content & the content is actual streaming content.

POST /conversations/<conversationId>/activities HTTP/1.1
{
  "type": "typing",
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
    "id" : "<recipientId>",
    "name": "<recipientName>",
    "aadObjectId": "<recipient aad objecID>"
  },
  "locale": "en-US" ,
  "replyToId": "<userMessageId>", // ID of the user's message that the agent is responding to. Required in conversations other than one-on-one chats.
  "text": "A brown fox", // (required) first streaming content.
  "entities":[
    {
      "type": "streaminfo",
      "streamId": "a-0000l", // // (required) must be present for any subsequent request after the first chunk.
      "streamType": "streaming", // informative or streaming; default= streaming.
      "streamSequence": 3 // (required) incremental integer; must be present for start and continue streaming request, but must not be set for final streaming request.
    }
  ],
}
202 0K{ }

```

```json

// Ex: An agent sends the fourth request with content & the content is actual streaming content.

POST /conversations/<conversationId>/activities HTTP/1.1
{
  "type": "typing",
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
    "id" : "<recipientId>",
    "name": "<recipientName>",
    "aadObjectId": "<recipient aad objecID>"
  },
  "locale": "en-US" ,
  "replyToId": "<userMessageId>", // ID of the user's message that the agent is responding to. Required in conversations other than one-on-one chats.
  "text": "A brown fox jumped over the fence", // (required) first streaming content.
  "entities":[
    {
      "type": "streaminfo",
      "streamId": "a-0000l", // // (required) must be present for any subsequent request after the first chunk.
      "streamType": "streaming", // informative or streaming; default= streaming.
      "streamSequence": 4 // (required) incremental integer; must be present for start and continue streaming request, but must not be set for final streaming request.
    }
  ],
}
202 0K{ }
```

The following image is an example of an agent providing updates in chunks:

:::image type="content" source="../assets/images/bots/stream-response-growing.png" alt-text="Screenshot shows the agent's response growing as more content streams in." lightbox="../assets/images/bots/stream-response-growing.png" border="false":::

### Final streaming

After your agent completes generating its message, send the end streaming signal along with the final message. For the final message, the `type` of activity is `message`. Here, the agent sets any fields that are allowed for the regular message activity but `final` is the only allowed value for `streamType`.

```json

// Ex: An agent sends the second request with content && the content is informative loading message.

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
202 0K{ }

```

The following image is an example of the agent's final response:

:::image type="content" source="../assets/images/bots/stream-final-response.png" alt-text="Screenshot shows the agent's completed response." lightbox="../assets/images/bots/stream-final-response.png" border="false":::

## Stop streaming agent response

The :::image type="icon" source="../assets/icons/stop-button.png"::: button lets users control streaming responses. The **Stop** button is available by default during streaming, allowing users to stop a response early. Users can interrupt the message streaming and refine their prompts or send new ones. It enhances conversation management with agents for better user experience.

In group chats, meeting chats, and channels, any participant can stop the agent's response. What remains depends on when the user stops the response:

- **During informative updates**: The informative update is removed, and no message remains.
- **During response streaming**: The partial response remains and is marked as stopped by the user.

:::image type="content" source="../assets/images/bots/stream-stopped-response.png" alt-text="Screenshot shows a partial response marked as stopped by a user." lightbox="../assets/images/bots/stream-stopped-response.png" border="false":::

After a user stops message generation:

- Agents treat stopped responses as incomplete or discarded in the conversation.
- Agents can't change the content already streamed.
- The following error is generated if an agent continues streaming on a message that is stopped by a user:

    | Error detail | Description |
    | --- | --- |
    | Http status code | 403 |
    | Error code | `ContentStreamNotAllowed` |
    | Error message | Content stream was canceled by user. |
    | Description | The streaming was stopped by the user. |

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
| Teams streaming agent sample | This sample app can be used for streaming scenarios in Teams using Azure Open AI and Bot Framework v4 for personal scope. | NA | [View](https://github.com/OfficeDev/Microsoft-Teams-Samples/tree/main/samples/TeamsSDK/Archived/bot-streaming/csharp) | NA |
| Conversational streaming agent | This is a conversational streaming agent with Teams SDK. | [View](https://github.com/microsoft/teams-sdk/tree/release/v1/js/samples/04.ai-apps/a.teamsChefBot) | NA | [View](https://github.com/microsoft/teams-sdk/tree/release/v1/python/samples/04.ai.h.chainedActions.listBot-streaming) |

## See also

- [Format your bot messages](how-to/format-your-bot-messages.md)
- [AI Content Labels](~/bots/how-to/bot-messages-ai-generated-content.md)
- [User feedback controls](~/agents-in-teams/integrate-ai/user-feedback-controls.md)
- [Teams SDK](/microsoftteams/platform/teams-ai-library/welcome)
- [Best practices and features checklist for Teams agents](how-to/teams-conversational-ai/agents-best-practices-features-checklist.md)
