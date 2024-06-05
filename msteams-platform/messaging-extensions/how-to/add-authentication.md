---
title: Add third party authentication to your message extension
author: surbhigupta
description: Enable authentication in Teams message extension app using third-party provider with Microsoft Entra configuration and code sample.
ms.localizationpriority: medium
ms.topic: conceptual
ms.author: anclear
---
# Add third party authentication to your message extension

[!include[v4-to-v3-SDK-pointer](~/includes/v4-to-v3-pointer-me.md)]

> [!NOTE]
> After adding authentication to the message extension, you must add "**token.botframework.com**" to the "**validDomains**" section in the manifest.

## Identify the user

Every request to your services includes the user ID, the user's display name, and Microsoft Entra object ID.

```json
"from": {
  "id": "29:1C7dbRrC_5yzN1RGtZIrcWT0xz88KPGP9sxdpVpV8sODlgPHeQE9RqQ02hnpuKzy6zZ-AaZx6swUOMj_Dsdse3TQ4sIaeebbFBF-VgjJy_nY",
  "name": "Larry Jin",
  "aadObjectId": "cd723fa0-0591-416a-9290-e93ecf3a9b92"
},
```

The `id` and `aadObjectId` values are guaranteed for the authenticated Teams user. They're used as keys to look up the credentials or any cached state in your service. In addition, each request contains the Microsoft Entra tenant ID, which is used to identify the user’s organization. If applicable, the request also contains the team ID and channel ID from which the request is originated.

## Authentication

If your service requires user authentication, the users must sign in before they use the message extension. The authentication steps are similar to that of a bot or tab.
The sequence is as follows:

1. User issues a query or the default query is automatically sent to your service.
1. Your service checks whether the user is authenticated by inspecting the Teams user ID.
1. If the user isn't authenticated, send back an `auth` response with an `openUrl` suggested action including the authentication URL.
1. The Microsoft Teams client launches a dialog box hosting your webpage using the given authentication URL.
1. After the user signs in, you should close your window and send an **authentication code** to the Teams client.
1. The Teams client then reissues the query to your service, which includes the authentication code passed in Step 5.

Your service should verify the authentication code received in step 6 matches with step 5. The steps ensure that a malicious user doesn't try to spoof or compromise the sign-in flow. The flow effectively "closes the loop" to finish the secure authentication sequence.

### Respond with a sign in action

To prompt an unauthenticated user, to sign in, respond with a suggested action of type `openUrl` that includes the authentication URL.

#### Response example for a sign in action

```json
{
  "composeExtension":{
    "type":"auth",
    "suggestedActions":{
      "actions":[
        {
          "type": "openUrl",
          "value": "https://example.com/auth",
          "title": "Sign in to this app"
        }
      ]
    }
  }
}
```

> [!NOTE]
>
> * For the sign in experience to be hosted in a Teams pop-up window, the domain portion of the URL must be in your app’s list of valid domains. For more information, see [validDomains](~/resources/schema/manifest-schema.md#validdomains) in the manifest schema.
> * The size of the authentication pop-up can be defined by including query string parameters of width and height, `Value = $"{_siteUrl}/searchSettings.html?height=600&width=600"`.

### Start the sign in flow

Your sign in experience must be responsive and fit within a pop-up window. It should integrate with the [Microsoft Teams JavaScript client library](/javascript/api/overview/msteams-client), which uses message passing.

As with other embedded experiences running inside Microsoft Teams, your code inside the window needs to first call `app.initialize()`. If your code performs an OAuth flow, you can pass the Teams user ID into your window, which then passes it to the OAuth sign-in URL.

### Complete the sign in flow

When the sign in request completes and redirects back to your page, it must perform the following steps:

1. Generate a security code, a random number. You must cache this code on your service, with the credentials obtained through the sign-in flow, such as OAuth 2.0 tokens.
1. Call `authentication.notifySuccess` and pass the security code.

At this point, the window closes and the control is passed to the Teams client. The client now reissues the original user query, along with the security code in the `state` property. Your code can use the security code to look up the credentials stored earlier to complete the authentication sequence and then complete the user request.

#### Reissued request example

```json
{
    "name": "composeExtension/query",
    "value": {
        "commandId": "insertWiki",
        "parameters": [{
            "name": "searchKeyword",
            "value": "lakers"
        }],
        "state": "12345",
        "queryOptions": {
            "skip": 0,
            "count": 25
        }
    },
    "type": "invoke",
    "timestamp": "2017-04-26T05:18:25.629Z",
    "localTimestamp": "2017-04-25T22:18:25.629-07:00",
    "entities": [{
        "locale": "en-US",
        "country": "US",
        "platform": "Web",
        "type": "clientInfo"
    }],
    "text": "",
    "attachments": [],
    "address": {
        "id": "f:7638210432489287768",
        "channelId": "msteams",
        "user": {
            "id": "29:1A5TJWHkbOwSyu_L9Ktk9QFI1d_kBOEPeNEeO1INscpKHzHTvWfiau5AX_6y3SuiOby-r73dzHJ17HipUWqGPgw",
            "aadObjectId": "fc8ca1c0-d043-4af6-b09f-141536207403"
        },
        "conversation": {
            "id": "19:7705841b240044b297123ad7f9c99217@thread.skype"
        },
        "bot": {
            "id": "28:c073afa8-7e77-4f92-b3e7-aa589e952a3e",
            "name": "maotestbot2"
        },
        "serviceUrl": "https://smba.trafficmanager.net/amer-client-ss.msg/",
        "useAuth": true
    },
    "source": "msteams"
}
```

## Code sample

|**Sample name** | **Description** |**.NET** | **Node.js**| **Manifest**|
|----------------|-----------------|--------------|----------------|----------------|
|Message extensions - auth and config | A message extension that has a configuration page, accepts search requests, and returns results after the user has signed in. |[View](https://github.com/OfficeDev/Microsoft-Teams-Samples/tree/main/samples/msgext-search-auth-config/csharp)|[View](https://github.com/OfficeDev/Microsoft-Teams-Samples/tree/main/samples/msgext-search-sso-config/nodejs)|[View](https://github.com/OfficeDev/Microsoft-Teams-Samples/tree/main/samples/msgext-search-auth-config/csharp/demo-manifest/msgext-search-auth-config.zip)|

## See also

[Enable SSO for your bot and message extension app](../../bots/how-to/authentication/bot-sso-overview.md)
