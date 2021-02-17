---
title: Add authentication to your messaging extension
author: clearab
description: How to add authentication to a messaging extension
ms.topic: conceptual
ms.author: anclear
---
# Add authentication to your messaging extension

[!include[v4-to-v3-SDK-pointer](~/includes/v4-to-v3-pointer-me.md)]

## Identify the user

Every request to your services includes the obfuscated ID of the user that performed the request, as well as the user's display name and Azure Active Directory object ID.

```json
"from": {
  "id": "29:1C7dbRrC_5yzN1RGtZIrcWT0xz88KPGP9sxdpVpV8sODlgPHeQE9RqQ02hnpuKzy6zZ-AaZx6swUOMj_Dsdse3TQ4sIaeebbFBF-VgjJy_nY",
  "name": "Larry Jin",
  "aadObjectId": "cd723fa0-0591-416a-9290-e93ecf3a9b92"
},
```

The `id` and `aadObjectId` values are guaranteed to be that of the authenticated Teams user. They can be used as keys to look up credentials or any cached state in your service. In addition, each request contains the Azure Active Directory tenant ID of the user, which can be used to identify the user’s organization. If applicable, the request also contains the team and channel IDs from which the request originated.

## Authentication

If your service requires user authentication, you need to sign in the user before he or she can use the messaging extension. If you have written a bot or a tab that signs in the user, this section should be familiar.

The sequence is as follows:

1. User issues a query, or the default query is automatically sent to your service.
2. Your service checks whether the user has first authenticated by inspecting the Teams user ID.
3. If the user has not authenticated, send back an `auth` response with an `openUrl` suggested action including the authentication URL.
4. The Microsoft Teams client launches a pop-up window hosting your webpage using the given authentication URL.
5. After the user signs in, you should close your window and send an "authentication code" to the Teams client.
6. The Teams client then reissues the query to your service, which includes the authentication code passed in step 5.

Your service should verify that the authentication code received in step 6 matches the one from step 5. This ensures that a malicious user does not try to spoof or compromise the sign-in flow. This effectively "closes the loop" to finish the secure authentication sequence.

### Respond with a sign-in action

To prompt an unauthenticated user to sign in, respond with a suggested action of type `openUrl` that includes the authentication URL.

#### Response example for a sign-in action

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
> For the sign-in experience to be hosted in a Teams pop-up, the domain portion of the URL must be in your app’s list of valid domains. (See [validDomains](~/resources/schema/manifest-schema.md#validdomains) in the manifest schema.)

### Start the sign-in flow

Your sign-in experience should be responsive and fit within a popup window. It should integrate with the [Microsoft Teams JavaScript client SDK](/javascript/api/overview/msteams-client), which uses message passing.

As with other embedded experiences running inside Microsoft Teams, your code inside the window needs to first call `microsoftTeams.initialize()`. If your code performs an OAuth flow, you can pass the Teams user ID into your window, which then can pass it to the OAuth sign-in URL.

### Complete the sign-in flow

When the sign-in request completes and redirects back to your page, it should perform the following steps:

1. Generate a security code. (This can be a random number.) You need to cache this code on your service, along with the credentials obtained through the sign-in flow (such as OAuth 2.0 tokens).
2. Call `microsoftTeams.authentication.notifySuccess` and pass the security code.

At this point, the window closes and control is passed to the Teams client. The client now can reissue the original user query, along with the security code in the `state` property. Your code can use the security code to look up the credentials stored earlier to complete the authentication sequence and then complete the user request.

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
|**Sample name** | **Description** |**.NETCore** | **JavaScript**|
|----------------|-----------------|--------------|----------------|
|Messaging extensions - auth and config | A Messaging Extension that has a configuration page, accepts search requests, and returns results after the user has signed in. |[View](https://github.com/microsoft/BotBuilder-Samples/tree/main/samples/csharp_dotnetcore/52.teams-messaging-extensions-search-auth-config)|[View](https://github.com/microsoft/BotBuilder-Samples/blob/main/samples/javascript_nodejs/52.teams-messaging-extensions-search-auth-config)| 

 
