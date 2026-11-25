---
title: Add code to enable SSO in a message extension
description: Learn how to configure code, request and receive an access token, and handle sign-out when enabling SSO in a Teams message extension.
ms.topic: how-to
ms.localizationpriority: high
ms.date: 11/19/2026
---

# Enable SSO in your message extension app

Single sign-on (SSO) lets a bot-based message extension access resources on behalf of a Teams user using their Microsoft Entra identity. This article describes the Teams SDK configuration, message-extension handlers, and considerations for authentication.

> [!IMPORTANT]
> This article doesn't provide an end-to-end Teams SDK implementation of message-extension SSO. The sign-in and sign-out examples are for an optional conversational bot and don't authenticate a message-extension request. Verify the extension's authentication response, token exchange, and request handling in Teams before deploying your app.

## Prerequisites

* A message extension app built with the Teams SDK and an Azure-managed bot resource.
* A Microsoft Entra app registration configured for SSO, including an exposed API scope and authorized Teams clients.
* An OAuth connection on the Azure Bot resource and the delegated permissions required to access your resources.

For detailed configuration steps, see [Configure your app in Microsoft Entra ID](bot-sso-register-aad.md) and the [Teams SDK authentication setup guide](https://microsoft.github.io/teams-sdk/cli/guides/user-authentication-setup/).

## Configure the app manifest

Configure `webApplicationInfo` as described in [Update app manifest for SSO](bot-sso-manifest.md). Its `resource` must match the application ID URI exposed by the SSO app registration and the token exchange URL in the OAuth connection. Add the appropriate token service domain to `validDomains`. For more information, see [OAuth URL support for Azure Bot Service](/azure/bot-service/ref-oauth-redirect-urls?view=azure-bot-service-4.0&preserve-view=true) for regional endpoints.

## Register the OAuth flow

For Teams SDK 2.1, the following TypeScript example registers an OAuth flow. Replace `graph` with the connection name configured on your Azure Bot resource:

```typescript
import { App } from '@microsoft/teams.apps';

const app = new App();
const graph = app.addOAuthFlow('graph');
```

Registration alone doesn't sign in a user or process a message-extension invoke. Registered OAuth flows can't be combined with `oauth.defaultConnectionName`.

## Sign in and sign out in a bot conversation

If your Teams app also includes a conversational bot, the following examples show the [Teams SDK user authentication](https://microsoft.github.io/teams-sdk/typescript/in-depth-guides/user-authentication/) flow in a bot message handler. Add these handlers to the app that registers the `graph` flow. The app must have a bot capability configured for a personal conversation.

These examples are for bot messages, not message-extension invokes. Don't call them from a message-extension handler as a substitute for the extension's required authentication response.

### Start sign-in

Call `signIn` on the registered flow when the user requests sign-in:

```typescript
app.message('/signin', async (ctx) => {
  const token = await graph.signIn(ctx);
  if (token) {
    await ctx.send('You are already signed in.');
  }
});
```

If a token is already available, `signIn` returns it. Otherwise, the SDK sends an OAuth card and returns without a token. Sign-in completes on a separate turn after the user authenticates or consents.

### Handle sign-in completion and failure

Register a completion callback for the connection. In this example, the callback confirms sign-in without exposing the token:

```typescript
graph.onSignInComplete(async (ctx) => {
  await ctx.send('You are signed in.');
});
```

If your app needs to access a resource, the callback also receives a token response. Use its access token only with the intended resource and required delegated permissions. The original message isn't available in the completion context; if the bot must resume a request, manage the pending request separately.

Register a failure callback to report an unsuccessful sign-in:

```typescript
graph.onSignInFailure(async (ctx, failure) => {
  ctx.log.error(`Sign-in failed: ${failure?.code ?? 'unknown'}`);
  await ctx.send('Sign-in failed. Please try again.');
});
```

The failure details can be absent, including for token-service and token-exchange failures. Configure shared state storage for multiple app instances so pending sign-in attribution and token-exchange deduplication work across instances. For more information, see [Handle sign-in failures](https://microsoft.github.io/teams-sdk/typescript/in-depth-guides/user-authentication/#handling-sign-in-failures).

### Sign out

Use the same registered flow to sign the user out of the OAuth connection:

```typescript
app.message('/signout', async (ctx) => {
  await graph.signOut(ctx);
  await ctx.send('You have been signed out.');
});
```

Sign-out removes the user's token for this connection. It doesn't necessarily sign the user out of Teams or revoke previously granted consent.

## Handle message-extension requests

In the TypeScript Teams SDK, use `message.ext.query` for search requests and `message.ext.query-link` for link-unfurling requests. See [Respond to a search command](../../../messaging-extensions/how-to/search-commands/respond-to-search.md) and the [Teams SDK message-extension sample](https://github.com/microsoft/teams.ts/tree/main/examples/message-extensions) for request and response examples. The sample demonstrates message-extension routing, not SSO.

Message-extension requests are invokes that require the response expected by the extension. A conversational OAuth card or sign-in completion callback isn't by itself a complete message-extension response. Verify how your implementation handles the authentication response, token exchange, consent or interactive sign-in fallback, and processing of the request after authentication. Don't assume that other message-extension scenarios support SSO without verifying them.

## Validate access tokens

Distinguish the bearer token used to authenticate an incoming Teams activity from the user access token used to access a resource. The Teams SDK validates the inbound bearer token for its activity endpoint. This doesn't automatically validate arbitrary user tokens received by custom endpoints. For more information, see the [Teams SDK trust model](https://microsoft.github.io/teams-sdk/typescript/essentials/app-authentication/trust-model/).

If your API receives an access token intended for that API, validate it using a supported identity library. Validation includes the signature, trusted issuer and tenant, audience, lifetime, and the scopes or roles required by your API. Check the `aud` claim against the expected audience and verify that the `scp` claim contains the required delegated scope, such as `access_as_user` when applicable. Don't rely on decoding a token or an issuer prefix check alone.

For more information, see [Validate tokens](/entra/identity-platform/access-tokens#validate-tokens). Don't log access tokens or include them in diagnostic output.

## Test authentication in Teams

Test search and link unfurling separately, if your app supports both scenarios:

1. Install the app in Teams and test with a user who hasn't previously consented. Verify that consent or interactive sign-in completes and that the original request is processed.
1. Repeat the request and verify that an existing token can be used without an unnecessary prompt. Test administrator-granted consent separately.
1. Test denied consent, expired tokens, failed token exchange, and sign-out. Verify that errors are visible and the app can recover.
1. Test with multiple Teams clients and, if your app runs on multiple instances, shared state. Check that repeated requests don't produce duplicate operations or responses.

Use a test tenant and avoid logging credentials or access tokens. Testing these scenarios requires a complete message-extension SSO implementation; the OAuth registration example in this article isn't sufficient by itself.

## Related samples

* [Teams SDK message extensions](https://github.com/microsoft/teams.ts/tree/main/examples/message-extensions): demonstrates search, action commands, and link unfurling without SSO.
* [Teams SDK bot authentication](https://github.com/OfficeDev/Microsoft-Teams-Samples/tree/main/samples/TeamsSDK/bot-auth-quickstart): demonstrates conversational bot authentication, not message-extension SSO.

## See also

* [Teams SDK user authentication](https://microsoft.github.io/teams-sdk/teams/user-authentication/)
* [Enable SSO for your app](bot-sso-overview.md)
* [Update app manifest for SSO](bot-sso-manifest.md)
