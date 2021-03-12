---
title: Rate limiting
description: Rate limiting and best practices in Microsoft Teams
keywords: teams bots rate limiting
---

# Optimize your bot: rate limiting and best practices in Microsoft Teams

As a general principle, your application should limit the number of messages it posts to an individual chat or channel conversation. This ensures an optimal experience that doesn't feel “spammy” to your end users.

To protect Microsoft Teams and its users, the bot APIs rate-limit incoming requests. Apps that go over this limit receive an `HTTP 429 Too Many Requests` error status. All requests are subject to the same rate-limiting policy, including sending messages, channel enumerations, and roster fetches.

Because the exact values of rate limits are subject to change, we recommend your application implement the appropriate backoff behavior when the API returns `HTTP 429 Too Many Requests`.

## Handling rate limits

When issuing a Bot Builder SDK operation, you can handle `Microsoft.Rest.HttpOperationException` and check for the status code.

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

## Best practices

In general, you should take simple precautions to avoid receiving `HTTP 429` responses. For instance, avoid issuing multiple requests to the same personal or channel conversation. Instead, consider batching the API requests.

Using an exponential backoff with a random jitter is the recommended way to handle 429s. This ensures that multiple requests don't introduce collisions on retries.

## Example: detecting transient exceptions

Here is a sample using exponential backoff via the Transient Fault Handling Application Block.

You can perform backoff and retries using [Transient Fault Handling](/previous-versions/msp-n-p/hh675232%28v%3dpandp.10%29). For guidelines on obtaining and installing the NuGet package, see [Adding the Transient Fault Handling Application Block to Your Solution](/previous-versions/msp-n-p/dn440719(v=pandp.60)?redirectedfrom=MSDN)). *See also* [Transient fault handling](/azure/architecture/best-practices/transient-faults).

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

## Example: backoff

In addition to detecting rate limits, you can also perform an exponential backoff.

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

You can also perform a `System.Action` method execution with the retry policy described above. The referenced library also allows you to specify a fixed interval or a linear backoff mechanism.

We recommend storing the value and strategy in a configuration file to fine-tune and tweak values at run time.

For more information, check out this handy guide on various retry patterns: [Retry pattern](/azure/architecture/patterns/retry).

## Per bot per thread limit

>[!NOTE]
>Message splitting at the service level will result in higher than expected requests per second (RPS). If you're concerned about approaching the limits, you should implement the backoff strategy described above. The values provided below are for estimation only.

This limit controls the traffic that a bot is allowed to generate on a single conversation. A conversation here is 1:1 between bot and user, a group-chat, or a channel in a team.

| **Scenario** | **Time-period (sec)** | **Max allowed operations** |
| --- | --- | --- |
| Send to Conversation | 1 | 7 |
| Send to Conversation | 2 | 8 |
| Send to Conversation | 30 | 60 |
| Send to Conversation | 3600 | 1800 |
| Create Conversation | 1 | 7 |
| Create Conversation | 2 | 8 |
| Create Conversation | 30 | 60 |
| Create Conversation | 3600 | 1800 |
| Get Conversation Members| 1 | 14 |
| Get Conversation Members| 2 | 16 |
| Get Conversation Members| 30 | 120 |
| Get Conversation Members| 3600 | 3600 |
| Get Conversations | 1 | 14 |
| Get Conversations | 2 | 16 |
| Get Conversations | 30 | 120 |
| Get Conversations | 3600 | 3600 |

>[!NOTE]
> Previous versions of the `TeamsInfo.getMembers` and `TeamsInfo.GetMembersAsync` are deprecated and will be throttled to 5 requests per minute and return a maximum of 10K members per team. Please refer to the [Bot API Changes for Team/Chat Members](resources/team-chat-member-api-changes.md) page to update your Bot framework SDK and code to use the latest paginated API endpoints.

## Per thread limit for all bots

This limit controls the traffic that all bots are allowed to generate across a single conversation. A conversation here is 1:1 between bot and user, a group-chat, or a channel in a team.

| **Scenario** | **Time-period (sec)** | **Max allowed operations** |
| --- | --- | --- |
| Send to Conversation | 1 | 14 |
| Send to Conversation | 2 | 16 |
| Create Conversation | 1 | 14 |
| Create Conversation | 2 | 16 |
| CreateConversation| 1 | 14 |
| CreateConversation| 2 | 16 |
| Get Conversation Members| 1 | 28 |
| Get Conversation Members| 2 | 32 |
| Get Conversations | 1 | 28 |
| Get Conversations | 2 | 32 |
