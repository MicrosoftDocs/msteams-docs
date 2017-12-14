---
title: Rate limiting
description: Rate limiting and best practices in Microsoft Teams
keywords: teams bots rate limiting
---

# Optimize your bot: Rate limiting and best practices in Microsoft Teams

As a general principle, your application should limit the number of messages it posts into an individual chat or channel conversation. This ensures an optimal experience that does not feel “spammy” to your end users.

To protect Microsoft Teams, the bot APIs rate-limit incoming requests. Apps that go over this limit receive an `HTTP 429 Too Many Requests` error status. All requests are subject to the same rate-limiting policy, including sending messages, channel enumeration, and roster fetches.

Because the exact values of rate limits are subject to change, we recommend your application implement the appropriate back-off behavior when the API returns `HTTP 429 Too Many Requests`.

### Handling rate limits

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

### Best practices

In general, you should take simple precautions to avoid receiving `HTTP 429` responses. For instance, avoid issuing multiple requests to the same 1:1 or channel conversation. Instead, consider batching the API requests.

Using an exponential backoff with a random jitter is the recommended way to handle 429s. This ensures that multiple requests do not introduce collisions on retries. Following are some of the ways you can handle transient errors.

### Example: detecting transient exceptions

Here is a sample using exponential backoff via the Transient Fault Handling Application Block.

You can perform backoff and retries using [Transient Fault Handling libraries](https://msdn.microsoft.com/en-us/library/hh680901(v=pandp.50).aspx). For guidelines on obtaining and installing the NuGet package, see [Adding the Transient Fault Handling Application Block to Your Solution](https://msdn.microsoft.com/en-us/library/hh680891(v=pandp.50).aspx).

```csharp
public class BotSdkTransientExceptionDetectionStrategy : ITransientErrorDetectionStrategy
{
    // List of error codes on retry on
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

### Example: backoff

In addition to detecting rate limits, you can also perform an exponential backoff.

```csharp
/**
* The first parameter specifies the number of retries before failing the operation.
* The second parameter specifies the minimum and maximum backoff time respectively.
* The last parameter is used to add a randomized  +/- 20% delta to avoid numerous clients all retrying simultaneously.
*/
var exponentialBackoffRetryStrategy = new ExponentialBackoff(3, TimeSpan.FromSeconds(2),
                        TimeSpan.FromSeconds(20), TimeSpan.FromSeconds(1));


// Define the Retry Policy
var retryPolicy = new RetryPolicy(new BotSdkTransientExceptionDetectionStrategy(), fixedIntervalRetryStrategy);

//Execute any bot sdk action
await retryPolicy.ExecuteAsync(() => connector.Conversations.ReplyToActivityAsync((Activity)reply)).ConfigureAwait(false);
```

You can also perform a `System.Action` method execution with the retry policy described above. The library mentioned also allows you to specify a fixed interval or a linear backoff mechanism.

We recommend storing the value and strategy in a configuration file to fine tune and tweak values at run time. 

For more information, check out this handy guide on various retry patterns: [Retry pattern](https://docs.microsoft.com/en-us/azure/architecture/patterns/retry).
