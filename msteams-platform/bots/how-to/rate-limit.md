---
title: Optimize your bot with rate limiting in Teams
description: Rate limiting and best practices in Microsoft Teams
ms.topic: conceptual
keywords: teams bots rate limiting
---

# Optimize your bot with rate limiting in Teams

Rate limiting is a method to limit messages to a certain maximum frequency. As a general principle, your application must limit the number of messages it posts to an individual chat or channel conversation. This ensures an optimal experience and messages do not appear as spam to your users.

To protect Microsoft Teams and its users, the bot APIs provide a rate limit for incoming requests. Apps that go over this limit receive an `HTTP 429 Too Many Requests` error status. All requests are subject to the same rate limiting policy, including sending messages, channel enumerations, and roster fetches.

As the exact values of rate limits are subject to change, your application must implement the appropriate backoff behavior when the API returns `HTTP 429 Too Many Requests`.

## Handle rate limits

When issuing a Bot Builder SDK operation, you can handle `Microsoft.Rest.HttpOperationException` and check for the status code.

The following code shows an example of handling rate limits:

```csharp
try
{
    // Perform Bot Framework operation
    // for example, await connector.Conversations.UpdateActivityAsync(reply);
}
catch (HttpOperationException ex)
{
    if (ex.Response != null && (uint)ex.Response.StatusCode ==  429)
    {
        //Perform retry of the above operation/Action method
    }
}
```

After you handle rate limits for bots, you can handle `HTTP 429` responses using an exponential backoff.

## Handle `HTTP 429` responses

In general, you must take simple precautions to avoid receiving `HTTP 429` responses. For example, avoid issuing multiple requests to the same personal or channel conversation. Instead, create a batch of the API requests.

Using an exponential backoff with a random jitter is the recommended way to handle 429s. This ensures that multiple requests do not introduce collisions on retries.

After you handle `HTTP 429` responses, you can go through the example for detecting transient exceptions.

> [!NOTE]
> In addition to retyring error code **429**, error codes **412**, **502**, and **504** must also be retried.

## Detect transient exceptions example

The following code shows an example of using exponential backoff using the transient fault handling application block:

```csharp
public class BotSdkTransientExceptionDetectionStrategy : ITransientErrorDetectionStrategy
    {
        // List of error codes to retry on
        List<int> transientErrorStatusCodes = new List<int>() { 429 };

        public bool IsTransient(Exception ex)
        {
            if (ex.Message.Contains("429"))
                return true;

            var httpOperationException = ex as HttpOperationException;
            if (httpOperationException != null)
            {
                return httpOperationException.Response != null &&
                        transientErrorStatusCodes.Contains((int)httpOperationException.Response.StatusCode);
            }

            return false;
        }
    }
```

You can perform backoff and retries using [transient fault handling](/previous-versions/msp-n-p/hh675232%28v%3dpandp.10%29). For guidelines on obtaining and installing the NuGet package, see [adding the transient fault handling application block to your solution](/previous-versions/msp-n-p/dn440719(v=pandp.60)?redirectedfrom=MSDN). See also [transient fault handling](/azure/architecture/best-practices/transient-faults).

After you go through the example for detecting transient exceptions, go through the exponential backoff example. You can use exponential backoff instead of retrying on failures.

## Backoff example

In addition to detecting rate limits, you can also perform an exponential backoff.

The following code shows an example of exponential backoff:

```csharp
/**
* The first parameter specifies the number of retries before failing the operation.
* The second parameter specifies the minimum and maximum backoff time respectively.
* The last parameter is used to add a randomized  +/- 20% delta to avoid numerous clients retrying simultaneously.
*/
var exponentialBackoffRetryStrategy = new ExponentialBackoff(3, TimeSpan.FromSeconds(2),
                        TimeSpan.FromSeconds(20), TimeSpan.FromSeconds(1));


// Define the Retry Policy
var retryPolicy = new RetryPolicy(new BotSdkTransientExceptionDetectionStrategy(), exponentialBackoffRetryStrategy);

//Execute any bot sdk action
await retryPolicy.ExecuteAsync(() => connector.Conversations.ReplyToActivityAsync( (Activity)reply) ).ConfigureAwait(false);
```

You can also perform a `System.Action` method execution with the retry policy described in this section. The referenced library also allows you to specify a fixed interval or a linear backoff mechanism.

Store the value and strategy in a configuration file to fine-tune and tweak values at run time.

For more information, see [retry patterns](/azure/architecture/patterns/retry).

You can also handle rate limit using the per bot per thread limit.

## Per bot per thread limit

The per bot per thread limit controls the traffic that a bot is allowed to generate in a single conversation. A conversation is 1:1 between bot and user, a group chat, or a channel in a team. So, if the application sends one bot message to each user, the thread limit does not throttle.

>[!NOTE]
> * The thread limit of 3600 seconds and 1800 operations applies only if multiple bot messages are sent to a single user. 
> * The global limit per app per tenant is 30 Requests Per Second (RPS). Hence, the total number of bot messages per second must not cross the thread limit.
> * Message splitting at the service level results in higher than expected RPS. If you are concerned about approaching the limits, you must implement the [backoff strategy](#backoff-example). The values provided in this section are for estimation only.

The following table provides the per bot per thread limits:

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
> Previous versions of `TeamsInfo.getMembers` and `TeamsInfo.GetMembersAsync` APIs are being deprecated. They are throttled to five requests per minute and return a maximum of 10K members per team. To update your Bot Framework SDK and the code to use the latest paginated API endpoints, see [Bot API changes for team and chat members](../../resources/team-chat-member-api-changes.md).

You can also handle rate limit using the per thread limit for all bots.

## Per thread limit for all bots

The per thread limit for all bots controls the traffic that all bots are allowed to generate across a single conversation. A conversation here is 1:1 between bot and user, a group chat, or a channel in a team.

The following table provides the per thread limit for all bots:

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
> [Calls and meetings bots](~/bots/calls-and-meetings/calls-meetings-bots-overview.md)

