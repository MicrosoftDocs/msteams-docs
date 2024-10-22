---
title: Streaming UX in Bots
description: Learn how to enhance the user experience in bots using streaming techniques.
ms.date: 09/19/2024
ms.topic: conceptual
author: surbhigupta12
ms.author: surbhigupta
ms.localizationpriority: high
---

# Streaming UX in bots

>[!NOTE]
>
> Streaming UX is only available for one-on-one chats and in [public developer preview](../resources/dev-preview/developer-preview-intro.md).

Streaming UX in bots refers to the process of delivering parts of the bot’s response to the user in real-time, as the response is being generated. Bots often exhibit a slow response generation time, without any updates on the response in the user interface, results in a less engaging user experience.

Streaming UX enhances the response generation time into an engaging and informative interaction. It enables users to witness the bot processing their request in real time, which could potentially increase user satisfaction and trust. Perceived responsiveness and transparency can enhance the user engagement, leading to a decrease in conversation abandonment with the bot.

Streaming UX has two types of updates:

* **Informative updates**: Informative updates appear as a blue progress bar at the bottom of the chat, informing the user about the bot's ongoing actions before a response is generated.

  :::image type="content" source="../assets/images/bots/stream_type_informative.png" alt-text="Screenshot shows the UX of informative updates of streaming." lightbox="../assets/images/bots/stream_type_informative.png":::

* **Response streaming**: Response streaming is displayed as a typing indicator, revealing the bot's response to the user as it is being generated.

  :::image type="content" source="../assets/images/bots/stream_type_responsive.png" alt-text="Screenshot shows the UX of response streaming." lightbox="../assets/images/bots/stream_type_responsive.png":::

## Streaming REST API

When your bot invokes the streaming API through REST, ensure to call another streaming API only after receiving a successful response from the initial API call. If your bot uses SDK, verify that you receive a null response object from the SDK's send activity method to confirm that the previous call was successfully transmitted. In some scenarios, the bot might not receive an error status code, but it can receive an error message.

To enable streaming in bots, follow these steps:

> [!div class="checklist"]
>
> * [Start streaming](#start-streaming)
> * [Continue streaming]
> * [Final streaming]

### Start streaming

1. **Start streaming**: Initiate the streaming process by setting the `streamType` as `informative` and `streamSequence` to `1`. 

The bot sends either informative message or streaming as the first message. The response will contain the `streamId` which is needed to make subsequent calls. The bot can also send citation here.  

Notes: Provide Informative Updates 

An informative update provides insight into what your bot is currently doing. Use these updates before your bot has started generating its final response to the user.  

Examples of this include:  

“Scanning through documents”, “Summarizing Content”, “Found relevant work items”.  

While this is one step, you can send multiple informative updates as your bot makes progress on the user’s request.

The following are the query parameters to start streaming:

|Property|Required|Description|
|---|---|---|
| `type` | ✔️ | Must be `typing`|
| `text` | ✔️ | The contents of the message that requires streaming. |
| `entities.type` | ✔️ | Must be `streamInfo`|
| `entities.streamType` | | Type of streaming updates. Supported values are either `informative` or `streaming` while default value is `streaming`. |
| `entities.streamSequence` | ✔️ | Incremental integer for each request. |
| `channelData.streamType` | ✔️ | Must be the same value as `entities.streamType`|
| `channelData.streamSequence ` | ✔️ | Must be the same value as `entities.streamSequence` |

```json
//Ex: A bot sends the second request with content && the content is informative loading message.

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
201 created {a-0000l} // return activity id

```

The following image is an example of start streaming:

:::image type="content" source="../assets/images/bots/start_streaming.png" alt-text="Screenshot shows the UX of start streaming." lightbox="../assets/images/bots/start_streaming.png":::

### Continue streaming 

Use the `streamId` that you received from the first request. The bot sends either informative message or streaming. Make the subsequent calls after the bot receives 2xx from the previous calls. The bot can also send citation here. 

2. **Provide informative updates**: Before the bot produces its final response, provide insights into the bot's ongoing actions such as, **Scanning through documents** or **Summarizing Content**. To provide these insights, set the `streamType` to `informative` and the `streamSequence` to `2`. Associate a `streamId` and the required display `text` with the request.

```json

// Ex: A bot sends the second request with content & the content is informative loading message.

POST /conversations/<conversationId>/activities HTTP/1.1 
{
      "type": "typing",
      " serviceurl": "<https://smba.trafficmanager.net/amer/> ",
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
      "channelData": {
        "streamld ": "a-0000l", // (required) must be present for any subsequent request after the first chunk.
        "streamType": "informative",
        "streamSequence": 2, // (required) incremental integer; must be present for any streaming request.
      }
    } 
    200 0K

   ```

   The following image is an example of a bot providing informative updates:

   :::image type="content" source="../assets/images/bots/stream_type_informative.png" alt-text="Screenshot shows the UX of informative updates of streaming." lightbox="../assets/images/bots/stream_type_informative.png":::

Notes: Switch to Response Streaming 

Once your bot is ready to start generating its final message to the user, switch from informative updates to response streaming.  

For each response streaming update, the content of the message should be the latest version of the final message. This means that your bot should take any new tokens generated by the LLM, append it to the previous version of the message, and then send it to the user. 

When the bot sends a streaming request, please make sure the bot sends the request at minimum 1 request per second.  

3. **Switch to response streaming**: After the bot is ready to generate the final message, transition to response streaming by setting `streamType` to `streaming`. Ensure each `text` update includes the latest version of the final message. During this transition, update the `streamSequence` to `3` and associate a `streamId` with the request. In the subsequent messages, add new tokens generated by the Large Language Models (LLMs) to the previous `text` message content.

   ```json

   // Ex: A bot sends the second request with content & the content is informative loading message.

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
      "text ": "A brown fox" // (required) first streaming content.
      "channelData": {
        "streamld ": "a-0000l", // (required) must be present for any subsequence request after the first chunk.
        "streamType": "streaming",
        "streamSequence": 3, // (required) incremental integer; must be present for any streaming request.
       }
    }
    200 0K

   ```
  
   Add the new `text` tokens, generated by the LLM, to the existing message content. During this transition, update the `streamSequence` to `4` and link a `streamId` to the request.

   ```json

   // Ex: A bot sends the second request with content & the content is informative loading message.

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
      "text ": "A brown fox jumped over ", // (required) second streaming content.
      "channelData": {
        "streamld ": "a-0000l", // (required) must be present for any subsequence request after the first chunk.
        "streamType": "streaming",
        "streamSequence": 4, // (required) incremental integer; must be present for any streaming request.
       }
    }
    200 0K
   ```

   The following image is an example of a bot providing updates in chunks:

   :::image type="content" source="../assets/images/bots/stream_type_responsive.png" alt-text="Screenshot shows the UX of response streaming." lightbox="../assets/images/bots/stream_type_responsive.png":::

### Final Streaming 

Once your bot has completed generating its message, send the end streaming signal along with the final message & its contents. Please note the type of activity is message. Here, the bot sets any fields that are allowed for the regular message activity. Only ‘final’ is allowed as a streamType value.  

4. **End streaming and send the final message**: To conclude the streaming with an end signal, set `type` as `message` and deliver the final `text` message to the user. In this final message, update the `streamType` to `final` and associate a `streamId` with the request.

    ```json

       // Ex: A bot sends the second request with content && the content is informative loading message.

        POST /conversations/<conversationId>/activities HTTP/1.1
        {
         "type": "message",
         " serviceurl" : "https://smba.trafficmanager.net/amer/ ",
         "channelId": "msteams",
         "from": {
            "id": "<botId>",
            "name": "BotName>"
           },
         "conversation": {
            "conversationType": "personal",
            "id : (conversationId>"
            },
         "recipient": {
          "id" : "recipientId>",
          "name": "<recipientName>",
          "aadObjectId": "<recipient aad objecID>"
          },
          "locale": "en-US" ,
          "text ": "A brown fox jumped over the fence.", // (required) final full streamed content.
          "channelData": {
            "streamld ": "a-0000l", // (required) must be present for any subsequence request after the first chunk.
            "streamType": "final",
           }
        }
        200 0K

       ```

   The following image is an example of the bot's final response:

   :::image type="content" source="../assets/images/bots/streaming_final.png" alt-text="Screenshot shows the UX of final streamed message." lightbox="../assets/images/bots/streaming_final.png":::

## Limitations

* Ensure no attachments are included during streaming.
* Maintain only one stream per thread.

## See also

* [Bot messages with AI-generated content](~/bots/how-to/bot-messages-ai-generated-content.md)
* [Teams AI library](~/bots/how-to/teams-conversational-ai/teams-conversation-ai-overview.md)