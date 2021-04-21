---
title: Send tenant ID and conversation ID to the request headers of the bot
description: describes how to send tenant ID and conversation ID to the request headers of the bot.
ms.topic: conceptual
localization_priority: Normal
---

# Send tenant ID and conversation ID to the request headers of the bot

The current outgoing requests to the bot do not contain in the header or URL any information that helps bots route the traffic without unpacking the entire payload. The activities are sent to the bot through a URL similar to https://<your_domain>/api/messages. Requests are received to show the conversation ID and tenant ID in the headers.

## Request header fields

Two non-standard request header fields are added to all the requests sent to bots, for both asynchronous flow and synchronous flow. The following table provides the request header fields and their values.

| Field key | Value |
|----------------|-----------------|
| x-ms-conversation-id | The conversation ID corresponding to the request activity if applicable and confirmed or verified. |
| x-ms-tenant-id | The tenant ID corresponding to the conversation in the request activity. |

If the tenant or conversation ID is not present in the activity or was not validated on the service side, the value is empty.

![Request header fields](~/assets/images/bots/requestheaderfields.png)
