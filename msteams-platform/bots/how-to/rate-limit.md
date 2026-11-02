---
title: Rate limiting for agents
description: Learn how to optimize agent with rate limiting, detect transient exceptions, perform an exponential backoff, and know about add per agent thread limit for all agents.
ms.topic: article
ms.localizationpriority: medium
ms.owner: angovil
ms.date: 10/08/2026
---

# Rate limiting for agents

Rate limiting is a method to limit messages to a certain maximum frequency. As a general principle, your application must limit the number of messages it posts to an individual chat or channel conversation. This ensures an optimal experience and messages don't appear as spam to your users.

To protect Microsoft Teams and its users, the bot APIs provide a rate limit for incoming requests. Apps that go over this limit receive an `HTTP 429 Too Many Requests` error status. All requests are subject to the same rate limiting policy, including sending messages, channel enumerations, and roster fetches.

As the exact values of rate limits are subject to change, your application must implement the appropriate backoff behavior when the API returns `HTTP 429 Too Many Requests`.

## Handle rate limits

When an API returns an `HTTP 429 Too Many Requests` response, wait for the period specified in the `Retry-After` response header before you retry the request. If the response doesn't include a `Retry-After` header, use an exponential backoff with random jitter and a bounded number of retries.

## Handle `HTTP 429` responses

You must take simple precautions to avoid receiving `HTTP 429` responses. For example, avoid issuing multiple requests to the same personal or channel conversation. Instead, create a batch of the API requests.

Using an exponential backoff with random jitter prevents multiple requests from colliding again when they're retried. Store the retry values and strategy in a configuration file so you can fine-tune them at runtime.

> [!NOTE]
> In addition to error code **429**, retry error codes **412**, **502**, **503**, and **504**.

For more information, see [Transient fault handling](/azure/architecture/best-practices/transient-faults) and [Retry pattern](/azure/architecture/patterns/retry).

You can also handle rate limit using the per agent per thread limit.

## Per agent per thread limit

The per agent per thread limit controls the traffic that a agent is allowed to generate in a single conversation. A conversation is 1:1 between agent and user, a group chat, or a channel in a team. So, if the application sends one agent message to each user, the thread limit doesn't throttle.

>[!NOTE]
>
> * The thread limit of 3600 seconds and 1800 operations applies only if multiple agent messages are sent to a single user.
> * The global limit per app per tenant is 50 Requests Per Second (RPS). Hence, the total number of agent messages per second must not cross the thread limit.
> * Message splitting at the service level results in higher than expected RPS. If you're concerned about approaching the limits, you must implement a [backoff strategy](#handle-rate-limits). The values provided in this section are for estimation only.

The following table provides the per agent per thread limits:

| Scenario | Time period in seconds | Maximum allowed operations |
| --- | --- | --- |
| Send to conversation | 1 | 7 |
| Send to conversation | 2 | 8 |
| Send to conversation | 30 | 60 |
| Send to conversation | 3600 | 1800 |
| Create conversation | 1 | 7 |
| Create conversation | 2 | 8 |
| Create conversation | 30 | 60 |
| Create conversation | 3600 | 1800 |
| Get conversation members| 1 | 14 |
| Get conversation members| 2 | 16 |
| Get conversation members| 30 | 120 |
| Get conversation members| 3600 | 3600 |
| Get conversations | 1 | 14 |
| Get conversations | 2 | 16 |
| Get conversations | 30 | 120 |
| Get conversations | 3600 | 3600 |

>[!NOTE]
> Previous versions of `TeamsInfo.getMembers` and `TeamsInfo.GetMembersAsync` APIs are being deprecated. They are throttled to five requests per minute and return a maximum of 10K members per team. To update your implementation to use paginated member retrieval, see [Get Teams specific context for your agent](get-teams-context.md).

You can also handle rate limit using the per thread limit for all agents.

## Per thread limit for all agents

The per thread limit for all agents controls the traffic that all agents are allowed to generate across a single conversation. A conversation here's 1:1 between agent and user, a group chat, or a channel in a team.

The following table provides the per thread limit for all agents:

| Scenario | Time period in seconds | Maximum allowed operations |
| --- | --- | --- |
| Send to conversation | 1 | 14 |
| Send to conversation | 2 | 16 |
| Create conversation | 1 | 14 |
| Create conversation | 2 | 16 |
| Create conversation| 1 | 14 |
| Create conversation| 2 | 16 |
| Get conversation members| 1 | 28 |
| Get conversation members| 2 | 32 |
| Get conversations | 1 | 28 |
| Get conversations | 2 | 32 |

## Next step

> [!div class="nextstepaction"]
> [Calls and online meetings agents](../calls-and-meetings/calls-meetings-bots-overview.md)

## See also

* [Build agents for Teams](../what-are-bots.md)
* [Manage a long-running operation](/azure/bot-service/bot-builder-howto-long-operations-guidance?view=azure-bot-service-4.0&preserve-view=true)
