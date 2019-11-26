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

You can perform backoff and retries using [Transient Fault Handling libraries](/previous-versions/msp-n-p/hh680901(v=pandp.50)). For guidelines on obtaining and installing the NuGet package, see [Adding the Transient Fault Handling Application Block to Your Solution](/previous-versions/msp-n-p/hh680891(v=pandp.50))

```csharp
public class BotSdkTransientExceptionDetectionStrategy : ITransientErrorDetectionStrategy
{
    // List of error codes to retry on
    List<int> transientErrorStatusCodes = new List<int>() { 429 };

    public bool IsTransient(Exception ex)
    {
        var httpOperationException = ex as HttpOperationException;
        if (httpOperationException != null)
        {
            return httpOperationException.Response != null &&
                    transientErrorStatusCodes.Contains((int) httpOperationException.Response.StatusCode);
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
var retryPolicy = new RetryPolicy(new BotSdkTransientExceptionDetectionStrategy(), fixedIntervalRetryStrategy);

//Execute any bot sdk action
await retryPolicy.ExecuteAsync(() => connector.Conversations.ReplyToActivityAsync((Activity)reply)).ConfigureAwait(false);
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
| NewMessage | 1 | 7 |
| NewMessage | 2 | 8 |
| NewMessage | 30 | 60 |
| NewMessage | 3600 | 1800 |
| UpdateMessage | 1 | 7 |
| UpdateMessage | 2 | 8 |
| UpdateMessage | 30 | 60 |
| UpdateMessage | 3600 | 1800 |
| NewThread | 1 | 7 |
| NewThread | 2 | 8 |
| NewThread | 30 | 60 |
| NewThread | 3600 | 1800 |
| GetThreadMembers | 1 | 14 |
| GetThreadMembers | 2 | 16 |
| GetThreadMembers | 30 | 120 |
| GetThreadMembers | 3600 | 3600 |
| GetThread | 1 | 14 |
| GetThread | 2 | 16 |
| GetThread | 30 | 120 |
| GetThread | 3600 | 3600 |

## Per thread limit for all bots

This limit controls the traffic that all bots are allowed to generate across a single conversation. A conversation here is 1:1 between bot and user, a group-chat, or a channel in a team.

| **Scenario** | **Time-period (sec)** | **Max allowed operations** |
| --- | --- | --- |
| NewMessage | 1 | 14 |
| NewMessage | 2 | 16 |
| UpdateMessage | 1 | 14 |
| UpdateMessage | 2 | 16 |
| NewThread | 1 | 14 |
| NewThread | 2 | 16 |
| GetThreadMembers | 1 | 28 |
| GetThreadMembers | 2 | 32 |
| GetThread | 1 | 28 |
| GetThread | 2 | 32 |

## Bot per data center limit

This limit controls the traffic that a bot is allowed to generate across all threads in a data center (across multiple tenants).

|**Time-period (sec)** | **Max allowed operations** |
| --- | --- |
| 1 | 20 |
| 1800 | 8000 |
| 3600 | 15000 |
