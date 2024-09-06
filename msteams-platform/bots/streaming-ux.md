---
title: Streaming UX in Bots
description: Learn how to enhance the user experience in bots using streaming techniques.
ms.date: 09/05/2024
ms.topic: conceptual
author: surbhigupta12
ms.author: surbhigupta
---

# Streaming UX in Bots

>[!NOTE]
>
> Streaming UX is only available for one-on-one chats and in [public developer preview](../resources/dev-preview/developer-preview-intro.md).

Microsoft Teams users expect swift and seamless interactions with bots, mirroring the instant responsiveness of chatbots like ChatGPT. Streaming UX introduces a dynamic interaction model where bots stream activity, and chunks of responses in real-time. This not only aligns with user expectations of promptness but also maintains user engagement. It transforms the wait time into an informative and interactive experience that enhances the overall utility of Teams bots in daily workflows.

Streaming UX can improve the user experience by making the bot seem more responsive, performative, and transparent. Streaming UX allows bots to send updates to the user while they're generating a response. Streaming UX has two types of updates:

* **Informative updates**: Informative update is shown as a blue progress bar at the bottom of the chat, and they tell the user what the bot is doing before it has a response ready.

  :::image type="content" source="../assets/images/bots/stream_type_informative.png" alt-text="Screenshot shows the UX of informative updates of streaming." lightbox="../assets/images/bots/stream_type_informative.png":::

* **Response streaming**: Response streaming is shown as a typing indicator, and it shows the user the response as the bot is generating it.

  :::image type="content" source="../assets/images/bots/stream_type_responsive.png" alt-text="Screenshot shows the UX of response streaming." lightbox="../assets/images/bots/stream_type_responsive.png":::

## Enable streaming in bots

To enable streaming in bots, follow these steps:

1. ***Start streaming***: Initiate the streaming process to begin sharing content.

   ```json

   // Ex: A bot sends the second request with content && the content is informative loading message.
    
   POST /conversations/<conversationId>/activities HTTP/1.1 
   {
      "type": "typing",
      " serviceurl": "<https://smba.trafficmanager.net/amer/> ",
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
        "id": "recipientId>",
        "name": "<recipientName>",
        "aadObjectId": "<recipient aad objecID>"
      },
      "locale": "en-US"
      "text": "Searching through documents.", // First informative loading message.
      "channelData": { 
        "streamType": "informative", // informative or streaming(name needs to be finalized); default: streaming.
        "streamSequence": 1 // (required) incremental integer; must be present for any streaming request.
      }
    }

    201 created {a-0000l} // return activity id

   ```
  
   The following image is an example of start streaming:
   
   :::image type="content" source="../assets/images/bots/start_streaming.png" alt-text="Screenshot shows the UX of start streaming." lightbox="../assets/images/bots/start_streaming.png":::

2. ***Provide informative updates***: Offer insights into the bot's current actions, such as **Scanning through documents** or **Summarizing Content**. These updates should occur before the bot generates its final response.

   ```json

    // Ex: A bot sends the second request with content && the content is informative loading message.

    POST /conversations/<conversationId>/activities HTTP/1.1 
    {
      "type": "typing",
      " serviceurl": "<https://smba.trafficmanager.net/amer/> ",
      "channelId": "msteams",
      "from": {
        "id": "<botId>",
        "name": "BotName>"
      },
      "conversation": {
        "conversationType": "personal",
        "id : <conversationId>"
      },
      "recipient": {
        "id": "recipientId>",
        "name": "<recipientName>",
        "aadObjectId": "<recipient aad objecID>"
      },
      "locale": "en -US",
      "text ": "Searching
      through emails...", // (required) second informative loading message.
      "channelData": {
        "streamld ": "a-0000l", // (required) must be present for any subsequence request after the first chunk.
        "streamType": "informative",
        "streamSequence": 2, // (required) incremental integer; must be present for any streaming request.
      }
    } 
    200 0K

   ```

   :::image type="content" source="../assets/images/bots/stream_type_informative.png" alt-text="Screenshot shows the UX of informative updates of streaming." lightbox="../assets/images/bots/stream_type_informative.png":::

3. ***Switch to response streaming***: Transition to response streaming once the bot is ready to generate the final message. Each update should include the latest version of the final message, appending new tokens generated by the LLM to the previous message content.

   ```json

   // Ex: A bot sends the second request with content && the content is informative loading message.

    POST /conversations/<conversationId>/activities HTTP/1.1
    {
     "type": "typing",
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
      "text ": "A brown fox" // (required) first streaming content.
      "channelData": {
        "streamld ": "a-0000l", // (required) must be present for any subsequence request after the first chunk.
        "streamType": "streaming",
        "streamSequence": 3, // (required) incremental integer; must be present for any streaming request.
       }
    }
    200 0K

   ```

   ```json

   // Ex: A bot sends the second request with content && the content is informative loading message.

    POST /conversations/<conversationId>/activities HTTP/1.1
    {
     "type": "typing",
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
      "text ": "A brown fox jumped over the fence.", // (required) second streaming content.
      "channelData": {
        "streamld ": "a-0000l", // (required) must be present for any subsequence request after the first chunk.
        "streamType": "streaming",
        "streamSequence": 4, // (required) incremental integer; must be present for any streaming request.
       }
    }
    200 0K
   ```

   :::image type="content" source="../assets/images/bots/stream_type_responsive.png" alt-text="Screenshot shows the UX of response streaming." lightbox="../assets/images/bots/stream_type_responsive.png":::

4. ***End streaming and send the final message***: Conclude the streaming with an end signal and deliver the final message and its contents to the user.

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
   :::image type="content" source="../assets/images/bots/streaming_final.png" alt-text="Screenshot shows the UX of final streamed message." lightbox="../assets/images/bots/streaming_final.png":::

## Limitations

* Ensure no attachments are included during streaming.
* Maintain only one stream per thread.
* Handle other potential errors gracefully.
