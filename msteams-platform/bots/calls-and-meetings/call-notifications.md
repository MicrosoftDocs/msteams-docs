---
title: Incoming call notifications
description: Learn about incoming notification protocol to convert the call from legacy to Graph format, redirects for region affinity and authenticate the callback.
ms.topic: conceptual
ms.localizationpriority: medium
ms.date: 04/02/2019
---

# Incoming call notifications

In [registering a calls and meetings bot for Microsoft Teams](./registering-calling-bot.md#create-new-bot-or-add-calling-capabilities), the Webhook for calling URL is mentioned. This URL is the webhook endpoint for all incoming calls to your bot.

## Protocol determination

The incoming notification is provided in a legacy format for compatibility with the previous [Skype protocol](/azure/bot-service/dotnet/bot-builder-dotnet-real-time-media-concepts?view=azure-bot-service-3.0&preserve-view=true). In order to convert the call to the Microsoft Graph protocol, your bot must determine whether the notification is in a legacy format and provides the following response:

```http
HTTP/1.1 204 No Content
```

Your bot receives the notification again, but this time in the Microsoft Graph protocol.

In a future release of the Real-time Media Platform, you can configure the protocol your application supports to avoid receiving the initial callback in the legacy format.

The next section provides details on incoming call notifications redirected for region affinity to your deployment.

## Redirects for region affinity

You call your webhook from the data-center hosting the call. The call starts in any data center and doesn't take into account region affinities. The notification is sent to your deployment depending on the GeoDNS resolution. If your application determines, by inspecting the initial notification payload or otherwise, that it needs to run in a different deployment, the application provides the following response:

```http
HTTP/1.1 302 Found
Location: your-new-location
```

Enable your bot to answer an incoming call using the [answer](/graph/api/call-answer?view=graph-rest-1.0&tabs=http&preserve-view=true) API. You can specify the `callbackUri` to handle this particular call. This is useful for stateful instances where your call is handled by a particular partition, and you want to embed this information in the `callbackUri` for routing to the right instance.

The next section provides details on authenticating the callback by inspecting the token posted to your webhook.

## Authenticate the callback

Your bot must inspect the token posted to your webhook to validate the request. Every time the API posts to the webhook, the HTTP POST message contains an OAuth token in the Authorization header as a bearer token, with the audience as your application's App ID.

Your application must validate this token before accepting the callback request.

The following sample code is used to authenticate the callback:

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

The OAuth token has the following values, and is signed by Skype:

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

The OpenID configuration published at <https://api.aps.skype.com/v1/.well-known/OpenIdConfiguration> can be used to verify the token. Each OAuth token value is used as follows:

* `aud` where audience is the App ID URI specified for the application.
* `tid` is the tenant id for Contoso.com.
* `iss` is the token issuer, `https://api.botframework.com`.

For your code handling, the webhook must validate the token, ensure it hasn't expired, and check whether it has been signed by the published OpenID configuration. You must also check whether aud matches your App ID before accepting the callback request.

For more information, see [validate inbound requests](https://github.com/microsoftgraph/microsoft-graph-comms-samples/blob/master/Samples/Common/Sample.Common/Authentication/AuthenticationProvider.cs).

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
