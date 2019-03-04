---
title: Technical details on handling incoming call notifications
description: Detailed technical information on handling notifications from incoming calls
keywords: calling calls notifications callback region affinity
ms.date: 09/24/2018
---

# Incoming call notifications: technical details

In [Registering a calling and meeting bot for Microsoft Teams](~/concepts/calls-and-meetings/registering-calling-bot#creating-a-new-bot-or-adding-calling-capabilities-to-an-existing-bot), we mentioned the **Webhook (for calling)** URL, the webhook endpoint for all incoming calls to your bot. This topic discusses the technical details you'll need to respond to these notifications.

## Protocol determination

The incoming notification is provided in legacy format for compatibility with the previous [Skype protocol](https://docs.microsoft.com/en-us/azure/bot-service/dotnet/bot-builder-dotnet-real-time-media-concepts?view=azure-bot-service-3.0). In order to convert the call to the Microsoft Graph protocol, your bot must determine whether the notification is in legacy format and reply with:

```http
HTTP/1.1 204 No Content
```

Your bot will receive the notification again, but this time in the Microsoft Graph protocol.

In a future release of the Real-time Media Platform, we will allow you configure the protocol your application supports to avoid receiving the initial callback in the legacy format.

## Redirects for region affinity

We will call your webhook from the data-center hosting the call. The call may start in any data center and does not take into account region affinities. The notification will be sent to your deployment depending on the GeoDNS resolution. If your application determines, by inspecting the initial notification payload or otherwise, that it needs to run in a different deployment, the application may reply with:

```http
HTTP/1.1 302 Found
Location: your-new-location
```

You may decide to pick up the call and call the [answer](https://developer.microsoft.com/en-us/graph/docs/api-reference/beta/api/call_answer) API. You can specify the `callbackUri` to handle this particular call. This is useful for _stateful_ instances where your call is handled by a particular partition and you want to embed this information in the `callbackUri` for routing to the right instance.

## Authenticating the callback

Your bot should inspect the token posted to your webhook to validate the request. Whenever the API posts to the webhook, the HTTP POST message contains an OAuth token in the Authorization header as a Bearer token, with audience as your application's App ID.

Your application should validate this token before accepting the callback request.

```http
POST https://bot.contoso.com/api/calls
Content-Type: application/json
Authentication: Bearer <TOKEN>

"value": [
    "subscriptionId": "2887CEE8344B47C291F1AF628599A93C",
    "subscriptionExpirationDateTime": "2016-11-20T18:23:45.9356913Z",
    "changeType": "updated",
    "resource": "/app/calls/8A934F51F25B4EE19613D4049491857B",
    "resourceData": {
        "@odata.type": "#microsoft.graph.call",
        "state": "Established"
    }
]
```

The OAuth token would have values like the following, and will be signed by Skype. The OpenID configuration published at <https://api.aps.skype.com/v1/.well-known/OpenIdConfiguration> can be used to verify the token.

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

* **aud** audience is the App ID URI specified for the application.
* **tid** is the tenant id for Contoso.com
* **iss** is the token issuer, `https://api.botframework.com`

Your code handling the webhook should validate the token, ensure it has not expired, and check whether it has been signed by our published OpenID configuration. You should also check whether **aud** matches your App ID before accepting the callback request.

[Sample](https://github.com/microsoftgraph/microsoft-graph-comms-samples/blob/master/Samples/Common/Sample.Common/Authentication/AuthenticationProvider.cs) shows how to validate inbound requests.

> [!NOTE]
> In the future, we will send you access tokens issued by Azure AD instead of Skype. To prepare for this migration, your bot should accept both kinds of tokens.

The new token would look like following:

```json
{
    "aud": "0efc74f7-41c3-47a4-8775-7259bfef4241",
    "iss": "https://sts.windows.net/31537af4-6d77-4bb9-a681-d2394888ea26/",
    "iat": 1466741440,
    "nbf": 1466741440,
    "exp": 1466745340,
    "appid": "26a18ebc-cdf7-4a6a-91cb-beb352805e81",
    "appidacr": "2",
    "oid": "2d452913-80c9-4b56-8419-43a7da179822",
    "sub": "MF4f-ggWMEji12KynJUNQZphaUTvLcQug5jdF2nl01Q",
    "tid": "b9419818-09af-49c2-b0c3-653adc1f376e",
    "ver": "1.0"
}
```

* **aud** audience is the App ID specified for the application.
* **tid** is the tenant id for Contoso.com
* **iss** is the token issuer, `https://sts.windows.net/{tenantId}/`
* **appid** is the appid of our service

As before, your code handling the webhook should validate the token, ensure it has not expired, and check whether it has been signed by the [Azure AD published OpenID configuration](https://login.microsoftonline.com/common/v2.0/.well-known/openid-configuration). You should also check whether **aud** matches your App ID before accepting the callback request.

## Additional information

You can read more about [Azure AD tokens and validation here](https://docs.microsoft.com/azure/active-directory/develop/access-tokens).
