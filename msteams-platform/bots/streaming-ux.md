---
title: Streaming UX in Bots
description: Learn how to enhance the user experience in bots using streaming techniques.
ms.date: 09/19/2024
ms.topic: conceptual
author: surbhigupta12
ms.author: surbhigupta
---

# Streaming UX in bots

>[!NOTE]
>
> Streaming UX is only available for one-on-one chats and in [public developer preview](../resources/dev-preview/developer-preview-intro.md).

Streaming UX in bots refers to the process of delivering portions of the bot’s response to the user in real-time, as the response is being generated. Streaming UX transforms response generation wait time into an informative and interactive experience that enhances the overall utility of Teams bots in daily workflows. Streaming UX allows users to observe the bot actively processing their request, potentially boosting user satisfaction and trust.

Streaming UX enables bots to provide updates to the user during the response generation process. Streaming UX has two types of updates:

* **Informative updates**: Informative updates appear as a blue progress bar at the bottom of the chat, informing the user about the bot's ongoing actions before a response is generated.

  :::image type="content" source="../assets/images/bots/stream_type_informative.png" alt-text="Screenshot shows the UX of informative updates of streaming." lightbox="../assets/images/bots/stream_type_informative.png":::

* **Response streaming**: Response streaming is displayed as a typing indicator, revealing the bot's response to the user as it is being generated.

  :::image type="content" source="../assets/images/bots/stream_type_responsive.png" alt-text="Screenshot shows the UX of response streaming." lightbox="../assets/images/bots/stream_type_responsive.png":::

Following are few benifits of Streaming UX in Bots:

> [!div class="checklist"]
> 
> * **Improved engagement**: Streaming UX keeps users engaged by providing real-time updates, making the interaction feel more dynamic. 
> * **Perceived responsiveness**: Users perceive the bot as more responsive because they see immediate feedback rather than waiting for a complete response. 
> * **Transparency**: Informative updates offer transparency into what the bot is doing, which can increase user trust. 
> * **Reduced abandonment**: Faster perceived response times can reduce the likelihood of users abandoning the interaction. 

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
        "id : (conversationId)"
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
