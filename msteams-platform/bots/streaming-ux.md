---
title: Streaming bot messages
description: Learn how to enhance the user experience in bots using streaming techniques.
ms.date: 10/23/2024
ms.topic: conceptual
author: surbhigupta12
ms.author: surbhigupta
ms.localizationpriority: high
---

# Streaming bot messages

>[!NOTE]
>
> Streaming bot messages is only available for one-on-one chats and in [public developer preview](../resources/dev-preview/developer-preview-intro.md).

Streaming bot messages refers to the process of delivering parts of the bot’s response to the user in real-time, as the response is being generated. Bots often exhibit a slow response generation time, without any updates on the response in the user interface, results in a less engaging user experience.

Streaming bot messages enhances the response generation time into an engaging and informative interaction. It enables users to witness the bot processing their request in real time, which could potentially increase user satisfaction and trust. Perceived responsiveness and transparency can enhance the user engagement, leading to a decrease in conversation abandonment with the bot.

Streaming bot messages has two types of updates:

* **Informative updates**: Informative updates appear as a blue progress bar at the bottom of the chat, informing the user about the bot's ongoing actions before a response is generated.

  :::image type="content" source="../assets/images/bots/stream_type_informative.png" alt-text="Screenshot shows the bots informative updates of streaming." lightbox="../assets/images/bots/stream_type_informative.png":::

* **Response streaming**: Response streaming is displayed as a typing indicator, revealing the bot's response to the user as it is being generated.

  :::image type="content" source="../assets/images/bots/stream_type_responsive.png" alt-text="Screenshot shows the bots response streaming." lightbox="../assets/images/bots/stream_type_responsive.png":::

## Streaming REST API

When your bot invokes the streaming API through REST, ensure to call another streaming API only after receiving a successful response from the initial API call. If your bot uses SDK, verify that you receive a null response object from the SDKs send activity method to confirm that the previous call was successfully transmitted. 

In some scenarios, the bot might not receive an error status code, but it can receive an error message. Ensure the bot calls the streaming API at a consistent pace during streaming, we  recommend that a bot streams one message at a time. If not, the request might be throttled. Buffer the tokens from the model for 1.5 to two seconds to ensure a smooth streaming process.

To enable streaming in bots, follow these steps:

> [!div class="checklist"]
>
> * [Start streaming](#start-streaming)
> * [Continue streaming](#continue-streaming)
> * [Final streaming](#final-streaming)

The following are the query parameters for streaming REST API:

|Property|Required|Description|
|---|---|---|
| `type` | ✔️ | Must be `typing`|
| `text` | ✔️ | The contents of the message that is to be streamed. |
| `entities.type` | ✔️ | Must be `streamInfo`|
| `entities.streamId` | ✔️ | `streamId` from the initial streaming request that is start streaming. |
| `entities.streamType` | | Type of streaming updates. Supported values are either `informative`, `streaming`, or `final`. The default value is `streaming`. |
| `entities.streamSequence` | ✔️ | Incremental integer for each request. |
| `ChannelData.streamId` | ✔️ | Must be the same value as `entities.streamId`.|
| `channelData.streamType` | ✔️ | Must be the same value as `entities.streamType`|
| `channelData.streamSequence ` | ✔️ | Must be the same value as `entities.streamSequence` |

> [!NOTE]
> You must insert the streaming metadata into both `entities` and `ChannelData`.

Streaming messages support rich text and citation. Attachment, AI-label, feedback button, and sensitivity labels are available only for the final streaming message. For more information see [attachments](/azure/bot-service/rest-api/bot-framework-rest-connector-add-rich-cards) and [bot messages with AI-generated content](~/bots/how-to/bot-messages-ai-generated-content.md).

### Start streaming

The bot can send either an informative or a streaming message as its initial communication. The response includes the `streamId` which is important for executing subsequent calls. 

Your bot can send multiple informative updates while processing the user's request such as, **Scanning through documents**, **Summarizing Content**, and **Found relevant work items**. You can send these updates before your bot generates its final response to the user.

The bot can also send citation for streaming. For more information, see [citations](~/bots/how-to/bot-messages-ai-generated-content.md#citations)

```json

//Ex: A bot sends the first request with content && the content is informative loading message.

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

Use the `streamId` that you've received from the initial request to send either informative or streaming message. Ensure that you make subsequent calls only after the bot receives successful response from the previous calls.

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

After your bot is ready to generate its final message for the user, switch from providing informative updates to response streaming. For every response streaming update, the message content should be the latest version of the final message. This means that your bot should incorporate any new tokens generated by the Large Language Models (LLMs), append these to the previous message version, and then send it to the user.

When the bot dispatches a streaming request, ensure the bot sends the request at a minimum rate of one request per second.

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

After your bot has completed generating its message, send the end streaming signal along with the final message and its contents. For the final message, the `type` of activity is `message`. Here, the bot sets any fields that are allowed for the regular message activity but `final` is the only allowed value for `streamType`.

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
| `202`|`ContentStreamSequenceOrderPreConditionFailed`| `PreCondition failed exception when processing streaming activity.` | Few streaming requests might arrive out of sequence and consequently, get dropped. The most recent streaming request, determined by `streamSequence`, is used when requests are received in a disordered manner. Ensure to send each request in a sequential manner.|
| `400`| `BadRequest`| Depending on the scenario, you might encounter various error messages such as `Start streaming activities should include text` | The incoming payload doesn't adhere to or contain the necessary values. |
| `403`|`ContentStreamNotAllowed` | `Content stream is not allowed`| The streaming API feature isn't allowed for the user or bot.|
| `403`|`ContentStreamNotAllowed` | `Content stream is not allowed on a already completed streamed message`| A bot can't continuously stream on a message that has already been streamed and completed.|
| `403`| `ContentStreamNotAllowed` | `Content stream finished due to exceeded streaming time.`| The bot failed to complete the streaming process within the strict time limit of two minutes. |
| `403`| `ContentStreamNotAllowed`| `Message size too large`| The bot sent a message that exceeds the current message size restriction. |
| `429`| | `API calls quota exceeded`| The bot sent an excessive number of streaming requests. |

## See also

* [Bot messages with AI-generated content](~/bots/how-to/bot-messages-ai-generated-content.md)
* [Teams AI library](~/bots/how-to/teams-conversational-ai/teams-conversation-ai-overview.md)

## Sample code

| Sample name | Description | Node.js | c# |
| --- | --- | --- | --- |
| {TBD} | This is a conversational streaming bot with REST API. | {TBD} | {TBD} |
| Conversational streaming bot | This is a conversational streaming bot with Teams AI library for Teams that thinks it's a chef to help you cook Teams apps. | [View](https://github.com/microsoft/teams-ai/tree/main/js/samples/04.ai-apps/i.teamsChefBot-streaming)| [View](https://github.com/microsoft/teams-ai/tree/main/dotnet/samples/04.ai.g.teamsChefBot-streaming) |