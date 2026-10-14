---
title: Tab App Functions
description: Details on how to register REST endpoints that can be called from Tab apps.
ms.topic: how-to
zone_pivot_groups: teams-sdk-languages-typescript-csharp
ms.date: 09/27/2026
---

# Tab app functions

::: zone pivot="csharp"

Agents may want to expose REST APIs that client applications can call. This SDK makes it easy to implement those APIs through the `app.AddFunction()` method. The function takes a name and a callback that implements the function.

::: zone-end

::: zone pivot="typescript"

Agents may want to expose REST APIs that client applications can call. This SDK makes it easy to implement those APIs through the `app.function()` method. The function takes a name and a callback that implements the function.

::: zone-end

::: zone pivot="csharp"

```csharp

app.AddFunction('do-something', (context) => {
  // do something useful
});

```

This registers a REST API hosted at `http://localhost:{PORT}/api/functions/do-something` or `https://{BOT_DOMAIN}/api/functions/do-something` that clients can POST to. When they do, this SDK validates that the caller provides a valid Microsoft Entra bearer token before invoking the registered callback. If the token is missing or invalid, the request is denied with a HTTP 401.

The function can be typed to accept input arguments. The clients would include those in the POST request payload, and they are made available in the callback through the `Data` context argument.

```csharp

public class ProcessMessageData
{
    [JsonPropertyName("message")]
    public required string Message { get; set; }
}

// ...

app.AddFunction<ProcessMessageData> ("process-message", (context) => {
    context.Log.Debug($"process-message with: {context.Data.Message}");
});

```

::: zone-end

::: zone pivot="typescript"

```typescript

app.function('do-something', () => {
  // do something useful
});

```

This registers a REST API hosted at `http://localhost:{PORT}/api/functions/do-something` or `https://{BOT_DOMAIN}/api/functions/do-something` that clients can POST to. When they do, this SDK validates that the caller provides a valid Microsoft Entra bearer token before invoking the registered callback. If the token is missing or invalid, the request is denied with a HTTP 401.

The function can be typed to accept input arguments. The clients would include those in the POST request payload, and they are made available in the callback through the `data` context argument.

```typescript

app.function<{}, { message: string }>('process-message', ({ data, log }) => {
  log.info(`process-message called with: ${data.message}`);
});

```

::: zone-end

> [!WARNING]
>
> This SDK does not validate that the function arguments are of the expected types or otherwise trustworthy. You must take care to validate the input arguments before using them.

::: zone pivot="csharp"

If desired, the function can return data to the caller.

```csharp

app.AddFunction('get-random-number', () => {
    return 4; // chosen by fair dice roll;
              // guaranteed to be random
});

```

::: zone-end

::: zone pivot="typescript"

If desired, the function can return data to the caller. The return value can be a string, an object, or an array.

```typescript

app.function('get-random-number', () => {
  return '4'; // chosen by fair dice roll;
  // guaranteed to be random
});

```

If your function returns a number, that will be interpreted as an HTTP status code:

```typescript

app.function('privileged-action', ({ userId }) => {
  if (!hasPermission(userId)) {
    return 401; // HTTP response will have status 401: unauthorized
  }
  // ... do something
});

```

::: zone-end

## Function context

The function callback receives a context object with a number of useful values. Some originate within the agent itself, while others are furnished by the caller via the HTTP Request.

::: zone pivot="csharp"

| Property       | Source | Description                                                                                                        |
| -------------- | ------ | ------------------------------------------------------------------------------------------------------------------ |
| `Api`          | Agent  | The API client.                                                                                                    |
| `AppId`        | Agent  | Unique identifier assigned to the app after deployment, ensuring correct app instance recognition across hosts.    |
| `AppSessionId` | Caller | Unique ID for the calling app's session, used to correlate telemetry data.                                         |
| `AuthToken`    | Caller | The validated MSAL Entra token.                                                                                    |
| `ChannelId`    | Caller | Microsoft Teams ID for the channel associated with the content.                                                    |
| `ChatId`       | Caller | Microsoft Teams ID for the chat associated with the content.                                                       |
| `Data`         | Caller | The function payload.                                                                                              |
| `Log`          | Agent  | The app logger instance.                                                                                           |
| `MeetingId`    | Caller | Meeting ID used by tab when running in meeting context.                                                            |
| `MessageId`    | Caller | ID of the parent message from which the task module was launched (only available in bot card-launched modules).    |
| `PageId`       | Caller | Developer-defined unique ID for the page this content points to.                                                   |
| `Send`         | Agent  | Sends an activity to the current conversation.                                                                     |
| `SubPageId`    | Caller | Developer-defined unique ID for the sub-page this content points to. Used to restore specific state within a page. |
| `TeamId`       | Caller | Microsoft Teams ID for the team associated with the content.                                                       |
| `TenantId`     | Caller | Microsoft Entra tenant ID of the current user, extracted from the validated auth token.                            |
| `UserId`       | Caller | Microsoft Entra object ID of the current user, extracted from the validated auth token.                            |
| `UserName`     | Caller | Microsoft Entra name of the current user, extracted from the validated auth token.                                 |

::: zone-end

::: zone pivot="typescript"

| Property                   | Source | Description                                                                                                                               |
| -------------------------- | ------ | ----------------------------------------------------------------------------------------------------------------------------------------- |
| `api`                      | Agent  | The API client.                                                                                                                           |
| `appGraph`                 | Agent  | The app graph client.                                                                                                                     |
| `appId`                    | Agent  | Unique identifier assigned to the app after deployment, ensuring correct app instance recognition across hosts.                           |
| `appSessionId`             | Caller | Unique ID for the calling app's session, used to correlate telemetry data.                                                                |
| `authToken`                | Caller | The validated MSAL Entra token.                                                                                                           |
| `channelId`                | Caller | Microsoft Teams ID for the channel associated with the content.                                                                           |
| `chatId`                   | Caller | Microsoft Teams ID for the chat associated with the content.                                                                              |
| `data`                     | Caller | The function payload.                                                                                                                     |
| `getCurrentConversationId` | Agent  | Attempts to find the conversation ID where the app is used and verifies agent-user presence. Returns `undefined` if not found or invalid. |
| `log`                      | Agent  | The app logger instance.                                                                                                                  |
| `meetingId`                | Caller | Meeting ID used by tab when running in meeting context.                                                                                   |
| `messageId`                | Caller | ID of the parent message from which the task module was launched (only available in bot card-launched modules).                           |
| `pageId`                   | Caller | Developer-defined unique ID for the page this content points to.                                                                          |
| `send`                     | Agent  | Sends an activity to the current conversation. Returns `null` if the conversation ID is invalid or undetermined.                          |
| `subPageId`                | Caller | Developer-defined unique ID for the sub-page this content points to. Used to restore specific state within a page.                        |
| `teamId`                   | Caller | Microsoft Teams ID for the team associated with the content.                                                                              |
| `tenantId`                 | Caller | Microsoft Entra tenant ID of the current user, extracted from the validated auth token.                                                   |
| `userId`                   | Caller | Microsoft Entra object ID of the current user, extracted from the validated auth token.                                                   |

::: zone-end

::: zone pivot="csharp"
The `AuthToken` is validated before the function callback is invoked, and the `TenantId`, `UserId`, and `UserName` values are extracted from the validated token. In the typical case, the remaining caller-supplied values would reflect what the Teams Tab app retrieves from the teams-js `getContext()` API, but the agent does not validate these.

> [!WARNING]
>
> Take care to validate the caller-supplied values before using them. Don't assume that the calling user actually has access to items indicated in the context.

::: zone-end

::: zone pivot="typescript"

The `authToken` is validated before the function callback is invoked, and the `tenantId` and `userId` values are extracted from the validated token. In the typical case, the remaining caller-supplied values would reflect what the Teams Tab app retrieves from the teams-js `getContext()` API, but the agent does not validate them.

> [!WARNING]
>
> Take care to validate the caller-supplied values before using them. Don't assume that the calling user actually has access to items indicated in the context.

::: zone-end

::: zone pivot="csharp"

To simplify a common scenarios, the context provides a `Send` method. This method sends an activity to the current conversation ID, determined from the context values provided by the client (chatId and channelId). If neither chatId or channelId is provided by the caller, the ID of the 1:1 conversation between the agent and the user is assumed.

> [!WARNING]
>
> The `Send` method does not validate that the chat ID or conversation ID provided by the caller is valid or correct. You must take care to validate that the user and agent both have appropriate access to the conversation.

::: zone-end

::: zone pivot="typescript"

To simplify two common scenarios, the context provides the `getCurrentConversationId` and `send` methods.

- The `getCurrentConversationId` method attempts to find the current conversation ID based on the context provided by the client (chatId and channelId) and validates that both the agent and the calling user are actually present in the conversation. If neither chatId or channelId is provided by the caller, the ID of the 1:1 conversation between the agent and the user is returned.
- The `send` method relies on `getCurrentConversationId` to find the conversation where the app is hosted and posts an activity.

::: zone-end

## Additional resources

::: zone pivot="csharp"

- For more information about the teams-js getContext() API, see the [Teams JavaScript client library](/microsoftteams/platform/tabs/how-to/using-teams-client-library) documentation.

::: zone-end

::: zone pivot="typescript"

## Executing Functions

The client App exposes an `exec()` method that can be used to call functions implemented in an agent created with this SDK. The function call uses the `app.http` client to make a request, attaching a bearer token created from the `app.msalInstance` MSAL public client application, so that the remote function can authenticate and authorize the caller.

The `exec()` method supports passing arguments and provides options to attach custom request headers and/or controlling the MSAL token scope.

### Invoking a remote function

When the tab app and the remote agent are deployed to the same location and in the same AAD app, it's simple to construct the client app and call the function.

```typescript

import { App } from '@microsoft/teams.client';

const app = new App(clientId);
await app.start();

// this requests a token for 'api://<clientId>/access_as_user' and attaches
// that to an HTTP POST request to /api/functions/my-function
const result = await app.exec<string>('my-function');
```

If the deployment is more complex, the [AppOptions](tab-app-options.md) can be used to influence the URL as well as the scope in the token.

### Function arguments

Any argument for the remote function can be provided as an object.

```typescript

const args = { arg1: 'value1', arg2: 'value2' };
const result = await app.exec('my-function', args);
```

### Request headers

By default, the HTTP request will include a header with a bearer token as well as headers that give contextual information about the state of the app, such as which channel or team or chat or meeting the tab is active in.

If needed, you can add additional headers to the `requestHeaders` option field. This may be handy to provide additional context to the remote function, such as a logging correlation ID.

```typescript

const requestHeaders = {
  'x-custom-correlation-id': 'aaaa0000-bb11-2222-33cc-444444dddddd',
};

// custom headers when the function does not take arguments
const result = await app.exec('my-function', undefined, { requestHeaders });

// custom headers when the function takes arguments
const args = { arg1: 'value1', arg2: 'value2' };
const result = await app.exec('my-other-function', args, { requestHeaders });
```

### Request bearer token

By default, the HTTP request will include a header with a bearer token acquired by requesting an `access_as_user` permission. The resource used for the request depends on the `remoteApiOptions.remoteAppResource` [AppOption](tab-app-options.md). If this app option is not provided, the token is requested for the scope `api://<clientId>/access_as_user`. If this option is provided, the token is requested for the scope `<remoteApiOptions.remoteAppResource>/access_as_user`.

When calling a function that requires a different permission or scope, the `exec` options let you override the behavior.

To specify a custom permission, set the permission field in the `exec` options.

```typescript

// with this option, the exec() call will request a token for either
// api://<clientId>/my_custom_permission or
// <remoteApiOptions.remoteAppResource>/my_custom_permission,
// depending on the app options used.
const options = {
  permission: 'my_custom_permission',
};

// custom permission when the function does not take arguments
const result = await app.exec('my-function', undefined, options);

// custom permission when the function takes arguments
const args = { arg1: 'value1', arg2: 'value2' };
const result = await app.exec('my-other-function', args, options);
```

Sometimes you may need even more control. You might for need a scope for a different resource than your default when calling a particular remote agent function. In these cases you can provide the exact token request object you need as part of the `exec` options.

```typescript

// with this option, the exec() call will request a token for exactly
// api://my-custom-resources/my_custom_scope, regardless of which app
// options were used to construct the app.
const options = {
  msalTokenRequest: {
    scopes: ['api://my-custom-resources/my_custom_scope'],
  },
};

// custom token request when the function does not take arguments
const result = await app.exec('my-function', undefined, options);

// custom token request when the function takes arguments
const args = { arg1: 'value1', arg2: 'value2' };
const result = await app.exec('my-other-function', args, options);
```

### Ensuring user consent

The `exec()` function supports incremental, just-in-time consent such that the user is prompted to consent during the `exec()` call, if they haven't already consented earlier.

If you find that you'd rather test for consent or request consent before making the `exec()` call, the `hasConsentForScopes` and `ensureConsentForScopes` can be used. More details about those are given in the [Graph](tab-graph.md) section.

::: zone-end
