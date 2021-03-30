---
title: Send tenant ID and conversation ID to the request headers of the bot
description: describes how to send tenant ID and conversation ID to the request headers of the bot.
ms.topic: conceptual
---

# Send tenant ID and conversation ID to the request headers of the bot

The current outgoing requests to the bot do not contain in the header or URL any information that helps bots route the traffic without unpacking the entire payload. The activities are sent to the bot to a URL similar to https://va.ai.dynamics.com/api/v1/messages/bots/1f0fe267-c3e3-4011-85fa-xxxxxxxxxx. Requests are received to show the conversation ID and tenant ID in the headers.

Currently, for Forms bot, the registered message endpoint is https://forms.office.com/botv4/api/messages.
For the requests sent to this endpoint, Forms reverse proxy can route the requests to appropriate Forms rings. For example, for MSIT users, when they create polls using messaging extension or submit a response in adaptive card, those requests can be routed to Forms MSIT ring. Also requests must be routed from some test tenants to Forms fast food ring so there is quick validation after checking in code.

Forms reverse proxy performance must not be affected so the payload in request body in reverse proxy must not be simply decoded. Therefore you can add tenant ID in request headers. Similarly, you can add conversation ID in request headers to enable traffic affinity.

## Current headers of the bot

Currently, the request headers include the Authentication standard header and an optional non-standard header called ContextId which is copied from the original request made by the user.

![Current headers of the bots](~/assets/images/bots/currentheadersofbots.png)

## New headers of the bot

You can add the tenant ID and the conversation ID to the request headers of the bot from the activity. In addition the new headers of the bot include the following features:

- The added headers have the keys x-ms-tenant-id and x-ms-conversation-id.
- The values sent to the bot are populated from the activity object that is already included in the request body.
- The values are included only when they can be confirmed or verified before sending to the bot.
- If the tenant or conversation ID is not present in the activity, the value for the key is empty.
- The values are added for both asynchronous flow that is user messages and events and synchronous flow that is for invokes.

![New headers of the bot](~/assets/images/bots/newheadersofbots.png)

> [!NOTE]
> Always send a hash of the conversation ID and name it routing-id so that it is not required to check if it is valid or not.

## Implementation details

The BotNotificationService creates the bot activity request. During the creation add BotActivity.Conversation.TenantId value as a nonstandard request header with the name x-ms-tenant-id. Similarly, add BotActivity.Conversation.ConversationId with the name x-ms-conversation-id.

The changes are behind a feature switch TenantIdAndConversationIdHeadersEnabled, that allows gradual deployment.

> [!NOTE]
> The header is in addition and must not cause any backward compatibility issues.

## Request header fields

Two non-standard request header fields are added to all the requests sent to bots, for both asynchronous flow and synchronous flow. The following table provides the request header fields and their values.

| Field key | Value |
|----------------|-----------------|
| x-ms-conversation-id | The conversation ID corresponding to the request activity if applicable and confirmed or verified. |
| x-ms-tenant-id | The tenant ID corresponding to the conversation in the request activity. |

If the tenant or conversation ID is not present in the activity, the value is empty.

![Request header fields](~/assets/images/bots/requestheaderfields.png)
