---
title: Stream bot messages
description: Learn how to enhance the user experience in bots using streaming techniques.
ms.date: 10/23/2024
ms.topic: conceptual
author: surbhigupta12
ms.author: surbhigupta
ms.localizationpriority: high
---

# Stream bot messages

>[!NOTE]
>
> - Streaming bot messages is available only for one-on-one chats and in [public developer preview](../resources/dev-preview/developer-preview-intro.md).
> - Streaming bot messages isn't available with Tools and the `o1` model.

Streaming bot messages involves delivering bot's response to the user in small updates while the complete response is being generated. This approach significantly enhances the user experience. Often, bots exhibit a slow response generation time without any updates in the user interface, which can result in a less engaging experience.

When users see the bot processing their request in real time, it can potentially increase their satisfaction and trust. This perceived responsiveness and transparency can enhance user engagement, leading to a decrease in conversation abandonment with the bot.

Streaming bot messages has two types of updates:

- **Informative updates**: Informative updates appear as a blue progress bar at the bottom of the chat, informing the user about the bot's ongoing actions before a response is generated.

  :::image type="content" source="../assets/images/bots/stream_type_informative.png" alt-text="Screenshot shows the bots informative updates of streaming." lightbox="../assets/images/bots/stream_type_informative.png":::

- **Response streaming**: Response streaming is displayed as a typing indicator, revealing the bot's response to the user as it is being generated.

  :::image type="content" source="../assets/images/bots/stream_type_responsive.png" alt-text="Screenshot shows the bots response streaming." lightbox="../assets/images/bots/stream_type_responsive.png":::

You can implement streaming bot messages in your app in one of the following ways:

- [Stream using Teams AI library](#stream-message-through-teams-ai-library).
- [Stream using REST API](#stream-message-through-rest-api).

## Stream message through Teams AI library

The Teams AI library provides the capability to stream messages for AI-powered bots. Streaming bot messages helps to ease the response time lag while the Large Language Model (LLM) generates the complete response. The primary factors contributing to slow response time include multiple preprocessing steps, such as Retrieval-Augmented Generation (RAG) or function calls, and the time required by the LLM to generate a full response.

Through streaming, your AI bot can offer an experience that is engaging and responsive for the user. To configure streaming messages for your AI-powered bot app:

1. **Enable streaming for AI bot**:

    Bot messages can be streamed through AI SDK. The AI-powered bot sends chunks to the user as the model generates the response. Streaming messages support rich text and citation. However, attachment, AI-label, feedback loop, and sensitivity labels are available only for the final streaming message.

    To enable streaming for AI SDK, use the `DefaultAugmentation` class in `config.json` and the main application class.

2. **Set informative message**:

    You can define just one informative message for your AI-powered bot. This message appears for the user every time the bot sends an update. Here are some examples for informative messages that you can set in your app:

    - **Scanning through documents**
    - **Summarizing content**
    - **Finding relevant work items**

    To set an informative message, define it in the `ActionPlanner` using the `StartStreamingMessage` configuration.

    The following example shows the information updates in an AI-powered bot:

    :::image type="content" source="../assets/images/bots/streaming-ai-info-update.png" alt-text="Image shows information updates streaming in an AI bot.":::

3. **Edit the final streamed message**:

    Using AI SDK, text messages and simple markdown can be formatted while they're being streamed. However, for Adaptive Cards, images, or rich HTML, the formatting can be applied once the final message is complete. You can send attachments only in the final streamed chunk.

    To set attachments in the final chunk, use the `EndStreamHandler` in the `ActionPlanner` declaration.

    The following example shows the streaming response in an AI-powered bot:

    :::image type="content" source="../assets/images/bots/ai-response-streaming.png" alt-text="Image shows streaming responses in an AI bot.":::

    The following example shows the final streamed response in an AI-powered bot:

    :::image type="content" source="../assets/images/bots/ai-final-stream-message.png" alt-text="Image shows the final streamed response in an AI bot.":::

4. **Enable AI-powered features for final message**:

    You can enable the following AI-powered features for the final message sent by the bot:
<br>

    - **Citations**: The Teams AI library automatically includes citations in the bot's responses. It provides references for the sources that the bot used to generate the response. It allows users to refer to the source through in-text citations and references.
    - **Sensitivity Label**: Use sensitivity label to help users understand the the confidentiality of a message. The `StreamingResponse` class allows you to define the sensitivity label.
    - **Feedback loop**: This allows users to provide positive or negative feedback on the bot messages. You can configure the feedback loop by using the `AIOptions` object in the app declaration and specifying a handler. However for a Python app, set the feedback loop toggle in the `ActionPlannerOptions` object.
    - **Generated by AI**: The Teams AI library automatically includes a "Generated by AI" label in the bot's responses. This tag helps users identify that a message was generated using AI.

    For more information about formatting AI bot messages, see [bot messages with AI-generated content](how-to/bot-messages-ai-generated-content.md).

### Configure streaming bot messages

Follow these steps to configure streaming bot messages:

1. **Enable streaming for AI bot**: Use the `DefaultAugmentation` class in the `config.json` and in the main application class. Update one of the following, as needed:
    - For a C# bot app: Update `program.cs`.
    - For a JavaScript app: Update `index.ts`.
    - For a Python app: `bot.py`.
1. Set `stream` to true in the `OpenAIModel` declaration.
1. [*Optional*] You can also configure the following AI-powered features:
    - **Set informative message**: Specify the informative message in the `ActionPlanner` declaration using the `StartStreamingMessage` configuration.
    - **Edit the final streamed message**: Set the feedback loop toggle in the `AIOptions` object within the app declaration and specify a handler.
    - **Enable AI-powered features for final message**: Set attachments in the final chunk using the `EndStreamHandler` within the `ActionPlanner` declaration.

The following code snippet shows an example of streaming bot message:

# [C#](#tab/csharp)

```C#
    // Create OpenAI Model
    builder.Services.AddSingleton<OpenAIModel > (sp => new(
        new OpenAIModelOptions(config.OpenAI.ApiKey, "gpt-4o")
        {
            LogRequests = true,
            Stream = true,              // Set stream toggle
        },
        sp.GetService<ILoggerFactory>()
    ));

ResponseReceivedHandler endStreamHandler = new((object sender, ResponseReceivedEventArgs args) =>
    {
        StreamingResponse? streamer = args.Streamer;

        if (streamer == null)
        {
            return;
        }

        AdaptiveCard adaptiveCard = new("1.6")
        {
            Body = [new AdaptiveTextBlock(streamer.Message) { Wrap = true }]
        };

        var adaptiveCardAttachment = new Attachment()
        {
            ContentType = "application/vnd.microsoft.card.adaptive",
            Content = adaptiveCard,
        };


        streamer.Attachments = [adaptiveCardAttachment];    // Set attachments

    });


    // Create ActionPlanner
    ActionPlanner<TurnState> planner = new(
        options: new(
            model: sp.GetService<OpenAIModel>()!,
            prompts: prompts,
            defaultPrompt: async (context, state, planner) =>
            {
                PromptTemplate template = prompts.GetPrompt("Chat");
                return await Task.FromResult(template);
            }
        )
        {
            LogRepairs = true,
            StartStreamingMessage = "Loading stream results...", // Set informative message
            EndStreamHandler = endStreamHandler // Set final chunk handler
        },
        loggerFactory: loggerFactory
    );
```

# [JavaScript or TypeScript](#tab/jsts)

```JavaScript
const model = new OpenAIModel({
    // ...Setup OpenAI or AzureOpenAI
    stream: true,                                         // Set stream toggle
});

const endStreamHandler: PromptCompletionModelResponseReceivedEvent = (ctx, memory, response, streamer) => {
    // ... Setup attachments
    streamer.setAttachments([...cards]);                      // Set attachments
};

const planner = new ActionPlanner({
    model,
    prompts,
    defaultPrompt: 'default',
    startStreamingMessage: 'Loading stream results...', // Set informative message
    endStreamHandler: endStreamHandler                  // Set final chunk handler
});
```

# [Python](#tab/python)

```Python
model = OpenAIModel(
        OpenAIModelOptions(api_key=config.OPENAI_KEY, default_model="gpt-4o", stream=True)
    )

def end_stream_handler(
    context: TurnContext,
    state: MemoryBase,
    response: PromptResponse[str],
    streamer: StreamingResponse,
):
    if not streamer:
        return

    card = CardFactory.adaptive_card(
        {
            "$schema": "http://adaptivecards.io/schemas/adaptive-card.json",
            "version": "1.6",
            "type": "AdaptiveCard",
            "body": [{"type": "TextBlock", "wrap": True, "text": streamer.message}],
        }
    )

    streamer.set_attachments([card])

planner=ActionPlanner(
                ActionPlannerOptions(
                    model=model,
                    prompts=prompts,
                    default_prompt="tools",
                    enable_feedback_loop=True,                                      # Enable the feedback loop
                    start_streaming_message="Loading streaming results...",         # Set the informative message
                    end_stream_handler=end_stream_handler,                          # Set the final chunk handler
                )
            ),
```

---

### Custom Planner and Model Development

The `StreamingResponse` class is the helper class for streaming responses to the client. It allows you to send a series of updates in one go, making the interaction smoother and more engaging. If you're using your own custom model, you can easily set up and manage this class to stream responses seamlessly. It's a great way to keep the user engaged.

Streaming bot messages follows the sequence:

- `queueInformativeUpdate()`
- `queueTextChunk()`
- `endStream()`

After `endStream()` is called, the stream ends, and no more updates can be sent.

Here's a list of other methods that can be used to customize the experience include:

- `setAttachments`
- `setSensitivityLabel`
- `setFeedbackLoop`
- `setGeneratedByAILabel`

#### Limitations for Azure OpenAI or OpenAI

Here's a list of limitations when using Azure OpenAI or OpenAI to stream bot messages:

- Streaming is only available in one-on-one chats.
- `SendActivity` requests are restricted to one Request Per Second (RPS). Our SDK buffers to 1.5 seconds.
- For AI-powered features, Citations, Sensitivity Label, Feedback Loop and Generated by AI Label are supported in the final chunk. Citations are set per each text chunk queued.
- Only rich text can be streamed.
- Due to future GA protocol changes, the `channelData` metadata must be included in the `entities` object as well.
- Only one informative message can be set. This message is reused for each update. Examples include:
  - **Scanning through documents**
  - **Summarizing content**
  - **Finding relevant work items**
- The informative message is rendered only at the beginning of each message returned from the LLM.
- Attachments can only be sent in the final streamed chunk.
- Streaming isn't available with AI SDK's function calls yet.
- Here are some requirements to use streamSequence for AI SDK:
  - First one must be number '1'.
  - Subsequent numbers (except final) must be a monotonic increasing integer (For example, 1->2->3).
  - For the final message, `streamSequence` must not be set.

## Stream message through REST API

Bot messages can be streamed through REST API. Streaming messages support rich text and citation. Attachment, AI-label, feedback button, and sensitivity labels are available only for the final streaming message. For more information, see [attachments](/azure/bot-service/rest-api/bot-framework-rest-connector-add-rich-cards) and [bot messages with AI-generated content](~/bots/how-to/bot-messages-ai-generated-content.md).

When your bot invokes streaming through REST API, ensure to call the next streaming API only after receiving a successful response from the initial API call. If your bot uses SDK, verify that you receive a null response object from the send activity method to confirm that the previous call was successfully transmitted.

In some scenarios, the bot receives an error message without the error status code. We recommend that your bot streams one message at a time to ensure that it calls the streaming API at a consistent pace. If not, the request might be throttled. Buffer the tokens from the model for 1.5 to two seconds to ensure a smooth streaming process.

The following are the properties for streaming bot messages:

|Property|Required|Description|
|---|---|---|
| `type` | ✔️ | Supported values are either `typing` or `message`. </br> • `typing`: Use when streaming the message. </br> • `message`: Use for the final streamed message. |
| `text` | ✔️ | The contents of the message that is to be streamed. |
| `entities.type` | ✔️ | Must be `streamInfo`|
| `entities.streamId` | ✔️ | `streamId` from the initial streaming request, [start streaming](#start-streaming). |
| `entities.streamType` | | Type of streaming updates. Supported values are either `informative`, `streaming`, or `final`. The default value is `streaming`. |
| `entities.streamSequence` | ✔️ | Incremental integer for each request. |
| `ChannelData.streamId` | ✔️ | Must be the same value as `entities.streamId`.|
| `channelData.streamType` | ✔️ | Must be the same value as `entities.streamType`|
| `channelData.streamSequence` | ✔️ | Must be the same value as `entities.streamSequence` |

> [!NOTE]
> You must insert the streaming metadata into both `entities` and `ChannelData`.
> Here are some requirements to use streamSequence for REST APIs:
>
> - First one must be number '1'.
> - Subsequent numbers (except final) must be a monotonic increasing integer (For example, 1->2->3).
> - For the final message, `streamSequence` must not be set.

To enable streaming in bots, follow these steps:

1. [Start streaming](#start-streaming)
1. [Continue streaming](#continue-streaming)
1. [Final streaming](#final-streaming)

### Start streaming

The bot can send either an informative or a streaming message as its initial communication. The response includes the `streamId`, which is important for executing subsequent calls.

Your bot can send multiple informative updates while processing the user's request such as, **Scanning through documents**, **Summarizing Content**, and **Found relevant work items**. You can send these updates before your bot generates its final response to the user.

```json

//Ex: A bot sends the first request with content & the content is informative loading message.

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
  "text": "Searching through documents...", //(required) first informative loading message.
  "entities":[
    {
      "type": "streaminfo",
      "streamType": "informative", // informative or streaming(name needs to be finalized); default= streaming.
      "streamSequence": 1 // (required) incremental integer; must be present for any streaming request.
    }
  ],
  "channelData": { 
    //Add the same entities data to prevent breaking changes in near future.
    "streamType": "informative",
    "streamSequence": 1,
  }
}

201 created { "id": "a-0000l" } // return stream id

```

The following image is an example of start streaming:

:::image type="content" source="../assets/images/bots/start_streaming.png" alt-text="Screenshot shows start streaming." lightbox="../assets/images/bots/start_streaming.png":::

### Continue streaming

Use the `streamId` that you've received from the initial request to send either informative or streaming messages. You can [start with informative updates](#start-with-informative-updates) and later [switch to response streaming](#switch-to-response-streaming) when the final response is ready.

#### Start with informative updates

As your bot generates a response send informative updates to the user such as, **Scanning through documents**, **Summarizing Content**, and **Found relevant work items**. Ensure that you make subsequent calls only after the bot receives successful response from the previous calls.

```json

// Ex: A bot sends the second request with content & the content is informative loading message.

POST /conversations/<conversationId>/activities HTTP/1.1 
{
  "type": "typing",
  " serviceurl": "https://smba.trafficmanager.net/amer/",
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
  "text ": "Searching through emails...", // (required) second informative loading message.
  "entities":[
    {
      "type": "streaminfo",
      "streamId": "a-0000l", // (required) must be present for any subsequent request after the first chunk.
      "streamType": "informative", // informative or streaming(name needs to be finalized); default= streaming.
      "streamSequence": 2 // (required) incremental integer; must be present for any streaming request.
    }
  ],
  "channelData": {
    // Add the same entities data to prevent breaking changes in near future.
    "streamld ": "a-0000l",
    "streamType": "informative",
    "streamSequence": 2, 
  }
} 
200 0K { }

```

The following image is an example of a bot providing informative updates:

:::image type="content" source="../assets/images/bots/stream_type_informative.png" alt-text="Screenshot shows the informative updates of streaming." lightbox="../assets/images/bots/stream_type_informative.png":::

#### Switch to response streaming

After your bot is ready to generate its final message for the user, switch from providing informative updates to response streaming. For every response streaming update, the message content should be the latest version of the final message. This means that your bot should incorporate any new tokens generated by the Large Language Models (LLMs). Append these tokens to the previous message version and then send it to the user.

When the bot dispatches a streaming request, ensure that the bot sends the request at a minimum rate of one request per second.

```json

// Ex: A bot sends the third request with content & the content is actual streaming content.

POST /conversations/<conversationId>/activities HTTP/1.1
{
  "type": "typing",
  " serviceurl" : "https://smba.trafficmanager.net/amer/ ",
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
  "text ": "A brown fox", // (required) first streaming content.
  "entities":[
    {
      "type": "streaminfo",
      "streamId": "a-0000l", // (required) must be present for any subsequent request after the first chunk.
      "streamType": "streaming", // informative or streaming(name needs to be finalized); default= streaming.
      "streamSequence": 3 // (required) incremental integer; must be present for any streaming request.
    }
  ],
  "channelData": 
  {
    // Add the same entities data to prevent breaking changes in near future.
    "streamld ": "a-0000l", // (required) must be present for any subsequence request after the first chunk.
    "streamType": "streaming",
    "streamSequence": 3, // (required) incremental integer; must be present for any streaming request.
  }
}
200 0K{ }

```

```json

// Ex: A bot sends the fourth request with content & the content is actual streaming content.

POST /conversations/<conversationId>/activities HTTP/1.1
{
  "type": "typing",
  " serviceurl" : "https://smba.trafficmanager.net/amer/ ",
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
  "text ": "A brown fox jumped over the fence", // (required) second streaming content.
  "entities":[
    {
      "type": "streaminfo",
      "streamId": "a-0000l", // (required) must be present for any subsequent request after the first chunk.
      "streamType": "streaming", // informative or streaming(name needs to be finalized); default= streaming.
      "streamSequence": 4 // (required) incremental integer; must be present for any streaming request.
    }
  ],
  "channelData": 
  {
    // Add the same entities data to prevent breaking changes in near future.
    "streamld ": "a-0000l", // (required) must be present for any subsequence request after the first chunk.
    "streamType": "streaming",
    "streamSequence": 4, // (required) incremental integer; must be present for any streaming request.
  }
}
200 0K{ }
```

The following image is an example of a bot providing updates in chunks:

:::image type="content" source="../assets/images/bots/stream_type_responsive.png" alt-text="Screenshot shows the response streaming." lightbox="../assets/images/bots/stream_type_responsive.png":::

### Final Streaming

After your bot completes generating its message, send the end streaming signal along with the final message and its contents. For the final message, the `type` of activity is `message`. Here, the bot sets any fields that are allowed for the regular message activity but `final` is the only allowed value for `streamType`.

```json

// Ex: A bot sends the second request with content && the content is informative loading message.

POST /conversations/<conversationId>/activities HTTP/1.1
{
  "type": "message",
  " serviceurl" : "https://smba.trafficmanager.net/amer/ ",
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
  "text ": "A brown fox jumped over the fence.", // (required) final full streamed content.
  "entities":[
    {
      "type": "streaminfo",
      "streamId": "a-0000l", // (required) must be present for any subsequent request after the first chunk.
      "streamType": "final", // (required) final is only allowed for the last message of the streaming.
    }
  ],
  "channelData": 
  {
    // Add the same entities data to prevent breaking changes in near future.
    "streamld ": "a-0000l", // (required) must be present for any subsequence request after the first chunk.
    "streamType": "final"
  }
}
200 0K{ }

```

The following image is an example of the bot's final response:

:::image type="content" source="../assets/images/bots/streaming_final.png" alt-text="Screenshot shows the final streamed message." lightbox="../assets/images/bots/streaming_final.png":::

## Response codes

The following are the success and error codes:

### Success codes

| Http status code | Return value | Description |
| --- | --- | --- |
| `201` | `streamId`, this is the same as `activityId` such as `{"id":"1728640934763"}` | The bot returns this value after sending the initial streaming request. </br> For any subsequent streaming requests, the `streamId` is required. |
| `202` | `{}`| Success code for any subsequent streaming requests. |

### Error codes

| Http status code | Error code | Error message | Description |
|--- |--- |--- |--- |
| `202`|`ContentStreamSequenceOrderPreConditionFailed`| `PreCondition failed exception when processing streaming activity.` | Few streaming requests might arrive out of sequence and get dropped. The most recent streaming request, determined by `streamSequence`, is used when requests are received in a disordered manner. Ensure to send each request in a sequential manner.|
| `400`| `BadRequest`| Depending on the scenario, you might encounter various error messages such as `Start streaming activities should include text` | The incoming payload doesn't adhere to or contain the necessary values. |
| `403`|`ContentStreamNotAllowed` | `Content stream is not allowed`| The streaming API feature isn't allowed for the user or bot.|
| `403`|`ContentStreamNotAllowed` | `Content stream is not allowed on a already completed streamed message`| A bot can't continuously stream on a message that has already streamed and completed.|
| `403`| `ContentStreamNotAllowed` | `Content stream finished due to exceeded streaming time.`| The bot failed to complete the streaming process within the strict time limit of two minutes. |
| `403`| `ContentStreamNotAllowed`| `Message size too large`| The bot sent a message that exceeds the current [message size](~/bots/how-to/format-your-bot-messages.md) restriction. |
| `429`| NA | `API calls quota exceeded`| The number of messages streamed by the bot has exceeded quota. |

## Sample code

| Sample name | Description | Node.js | C# | Python |
| --- | --- | --- | --- | --- |
| {TBD} | This is a conversational streaming bot with REST API. | {TBD} | {TBD} |
| Conversational streaming bot | This is a conversational streaming bot with Teams AI library. | [View](https://github.com/microsoft/teams-ai/tree/main/js/samples/04.ai-apps/i.teamsChefBot-streaming)| [View](https://github.com/microsoft/teams-ai/tree/main/dotnet/samples/04.ai.g.teamsChefBot-streaming) | [View](https://github.com/microsoft/teams-ai/tree/main/python/samples/04.ai.h.chainedActions.listBot-streaming) |

## See also

- [Bot messages with AI-generated content](~/bots/how-to/bot-messages-ai-generated-content.md)
- [Teams AI library](~/bots/how-to/teams-conversational-ai/teams-conversation-ai-overview.md)
