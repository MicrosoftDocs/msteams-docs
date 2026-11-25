---
title: Configure Incoming Call Notifications
description: Learn about incoming notification protocol to convert the call from legacy to Graph format, redirects for region affinity and authenticate the callback.
ms.topic: article
ms.localizationpriority: medium
ms.date: 10/12/2026
---

# Incoming call notifications

In [registering a calls and meetings bot for Microsoft Teams](./registering-calling-bot.md#create-new-bot-or-add-calling-capabilities), the Webhook for calling URL is mentioned. This URL is the webhook endpoint for all incoming calls to your bot.

## Protocol determination

The incoming notification is provided in a legacy format for compatibility with the previous [Skype protocol](/azure/bot-service/dotnet/bot-builder-dotnet-real-time-media-concepts?view=azure-bot-service-3.0&preserve-view=true). To convert the call to the Microsoft Graph protocol, your bot must determine whether the notification is in a legacy format and provides the following response:

```http
HTTP/1.1 204 No Content
```

Your bot receives the notification again, but this time in the Microsoft Graph protocol.

In a future release of the Real-time Media Platform, you can configure the protocol your application supports to avoid receiving the initial callback in the legacy format.

The next section provides details on incoming call notifications redirected for region affinity to your deployment.

## Redirects for region affinity

You call your webhook from the data-center hosting the call. The call starts in any data center and doesn't consider region affinities. The notification is sent to your deployment depending on the GeoDNS resolution. If your application determines, by inspecting the initial notification payload or otherwise, that it needs to run in a different deployment, the application provides the following response:

```http
HTTP/1.1 302 Found
Location: your-new-location
```

Enable your bot to answer an incoming call using the [answer](/graph/api/call-answer?view=graph-rest-1.0&preserve-view=true&tabs=http) API. You can specify the `callbackUri` to handle this particular call. This is useful for stateful instances where your call is handled by a particular partition, and you want to embed this information in the `callbackUri` for routing to the right instance.

The next section provides details on authenticating the callback by inspecting the token posted to your webhook.

## Authenticate the callback

Your bot must validate the token posted to your webhook before it accepts the callback request. Every time the API posts to the webhook, the HTTP POST message contains a token in the `Authorization` header as a bearer token. The token's audience is your bot's application (client) ID.

```http
POST https://bot.contoso.com/api/calls
Content-Type: application/json
Authorization: Bearer <token>

{
  "value": [
    {
      "subscriptionId": "2887CEE8344B47C291F1AF628599A93C",
      "subscriptionExpirationDateTime": "2016-11-20T18:23:45.9356913Z",
      "changeType": "updated",
      "resource": "/app/calls/8A934F51F25B4EE19613D4049491857B",
      "resourceData": {
        "@odata.type": "#microsoft.graph.call",
        "state": "Established"
      }
    }
  ]
}
```

### Migration to Microsoft Entra tokens

Callback tokens are moving from tokens signed by the calling platform's own OpenID configuration (legacy tokens) to standard Microsoft Entra app tokens. During the migration, your bot can receive either kind of token, so it must accept both. After the migration completes, legacy tokens and their OpenID configuration endpoints are retired.

> [!IMPORTANT]
> If your bot validates callback tokens only against the legacy OpenID configuration, update it to also accept Microsoft Entra tokens. The simplest way is to use the built-in validation in the Microsoft Graph Communications SDK.

### Use the Microsoft Graph Communications SDK

The Microsoft Graph Communications SDK version 1.2.0.17950 and later includes `DefaultAuthenticationProvider`, which validates both Microsoft Entra tokens and legacy tokens. To use it, call `SetAuthentication` when you build the client:

```csharp
var builder = new CommunicationsClientBuilder("MyCallingBot", appId, graphLogger);
builder.SetAuthentication(appId, tokenProvider);
builder.SetNotificationUrl(notificationUrl);
builder.SetServiceBaseUrl(serviceBaseUrl);
var client = builder.Build();
```

`tokenProvider` is your implementation of `Microsoft.Graph.Communications.Client.Authentication.ITokenProvider`. It acquires the tokens your bot sends on outbound Microsoft Graph requests, for example by using MSAL or Azure.Identity.

`SetAuthentication(appId, tokenProvider)` validates tokens for the public cloud. For other clouds, use the following `SetAuthentication` overloads. They configure the same built-in provider for that cloud:

| Cloud | Overload |
|---|---|
| Microsoft Azure operated by 21Vianet | `SetAuthentication(appId, tokenProvider, AzureCloudInstance.AzureChina)` |
| US Government (GCC High) | `SetAuthentication(appId, tokenProvider, GraphAuthenticationOptions)`, with `OidAuthorityUrl` set to the GCC High legacy OpenID configuration, as shown in the following example |
| US Government (DoD) | `SetAuthentication(appId, tokenProvider, GraphAuthenticationOptions)`, with `OidAuthorityUrl` set to the DoD legacy OpenID configuration |

GCC High and DoD share a Microsoft Entra cloud but use different legacy OpenID configurations, so `AzureCloudInstance.AzureUsGovernment` can't identify which legacy configuration to trust and isn't accepted. Pass both configuration URLs in `GraphAuthenticationOptions` instead:

```csharp
builder.SetAuthentication(appId, tokenProvider, new GraphAuthenticationOptions
{
    EntraAuthorityUrl = "https://login.microsoftonline.us/common/v2.0/.well-known/openid-configuration",

    // For DoD, use https://pma.dod.teams.microsoft.us/v1/.well-known/openid-configuration.
    OidAuthorityUrl = "https://pma.gov.teams.microsoft.us/v1/.well-known/openid-configuration",
});
```

#### Replace SetAuthenticationProvider

`ICommunicationsClientBuilder.SetAuthenticationProvider` is obsolete. A custom `IRequestAuthenticationProvider` that validates only legacy tokens rejects Microsoft Entra tokens after the migration, so replace it with `SetAuthentication`.

In apps that target .NET 8 or later, the compiler reports the obsolete method as `GRAPHCOMM_AUTH_0001`. Apps that target earlier frameworks report it as `CS0618`. If you must defer the change, make sure your provider accepts both token types and suppress both diagnostics:

```csharp
#pragma warning disable CS0618, GRAPHCOMM_AUTH_0001
builder.SetAuthenticationProvider(customAuthenticationProvider);
#pragma warning restore CS0618, GRAPHCOMM_AUTH_0001
```

### Validate tokens without the SDK

If your bot doesn't use the SDK, accept a callback only if its token passes all the checks for one of the following token types.

#### Microsoft Entra tokens

| Check | Requirement |
|---|---|
| Signature | Signed (`RS256` or `PS256`) by a key from the Microsoft Entra OpenID configuration for your cloud. |
| Signing key issuer | If the signing key in the keys document has an `issuer` value, replace any `{tenantid}` placeholder with the token's `tid`. The result must equal the token's `iss`, or for v1.0 tokens, the v2.0 issuer for the same `tid` (for example, `https://login.microsoftonline.com/{tid}/v2.0`). This check is required because the `common` keys document lists keys for every tenant. For more information, see [validate the signing key issuer](/entra/identity-platform/access-tokens#validate-the-signing-key-issuer). |
| `iss` | Issued for the token's tenant (`tid`): `https://login.microsoftonline.com/{tid}/v2.0` or `https://sts.windows.net/{tid}/`. US Government uses `https://login.microsoftonline.us/{tid}/v2.0` or `https://sts.windows.net/{tid}/`, and Azure operated by 21Vianet uses `https://login.chinacloudapi.cn/{tid}/v2.0` or `https://sts.chinacloudapi.cn/{tid}/`. |
| `aud` | Your bot's application (client) ID. |
| `azp` (or `appid` in v1.0 tokens) | The calling platform's application ID: `26a18ebc-cdf7-4a6a-91cb-beb352805e81`, or `e736143e-5e30-4821-9609-0b032986a3a3` in US Government clouds. Without this check, any app that can get a token for your bot's audience could impersonate the calling platform. |
| `exp`, `nbf` | The token isn't expired and is already valid. |

| Cloud | Microsoft Entra OpenID configuration |
|---|---|
| Public | `https://login.microsoftonline.com/common/v2.0/.well-known/openid-configuration` |
| US Government | `https://login.microsoftonline.us/common/v2.0/.well-known/openid-configuration` |
| Azure operated by 21Vianet | `https://login.chinacloudapi.cn/common/v2.0/.well-known/openid-configuration` |

#### Legacy tokens

Legacy tokens have the following values:

```json
{
    "aud": "0efc74f7-41c3-47a4-8775-7259bfef4241",
    "iss": "https://api.botframework.com",
    "iat": 1466741440,
    "nbf": 1466741440,
    "exp": 1466745340,
    "tid": "1fdd12d0-4620-44ed-baec-459b611f84b2"
}
```

* `aud` is your bot's application ID.
* `tid` is the tenant ID for Contoso.com.
* `iss` is the token issuer, `https://api.botframework.com`.

Accept a legacy token only if all of the following are true:

* It's signed by a key from the legacy OpenID configuration for your cloud, listed in the following table.
* `iss` is exactly `https://api.botframework.com`.
* `aud` matches your bot's application ID.
* It hasn't expired (`exp`) and, if it contains `nbf`, it's already valid.

| Cloud | Legacy OpenID configuration |
|---|---|
| Public | `https://api.aps.skype.com/v1/.well-known/OpenIdConfiguration` |
| US Government (GCC High) | `https://pma.gov.teams.microsoft.us/v1/.well-known/openid-configuration` |
| US Government (DoD) | `https://pma.dod.teams.microsoft.us/v1/.well-known/openid-configuration` |
| Azure operated by 21Vianet | `https://pma.teams.microsoftonline.cn/v1/.well-known/openid-configuration` |

## Next step

> [!div class="nextstepaction"]
> [Requirements and considerations for application-hosted media bots](~/bots/calls-and-meetings/requirements-considerations-application-hosted-media-bots.md)

## See also

* [Build bots for Teams](../what-are-bots.md)
* [Calls and online meetings bots](calls-meetings-bots-overview.md)
* [Work with the cloud communications API in Microsoft Graph](/graph/api/resources/communications-api-overview)
* [Authentication flow for bots in Microsoft Teams](../how-to/authentication/auth-flow-bot.md)
* [Set up an auto attendant](/microsoftteams/create-a-phone-system-auto-attendant)
* [Set up auto answer for Microsoft Teams Rooms on Android and Teams video phone devices](/microsoftteams/set-up-auto-answer-on-teams-android)
