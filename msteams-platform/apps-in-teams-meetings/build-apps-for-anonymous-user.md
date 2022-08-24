---
title: Build apps for anonymous user
author: v-sdhakshina
description: In this article, learn how to test the experience delivered to the anonymous users in meeting apps with all admin settings.
ms.topic: conceptual
ms.author: v-sdhakshina
ms.localizationpriority: medium
---

# Build apps for anonymous users

You can test the experience delivered to anonymous users by selecting the meeting join url present in the meeting invite and joining the meeting via incognito window.

> [!NOTE]
>
> * Side panel tabs and content bubbles aren't available for anonymous users at the moment.
> * You can build conversational extensibility solutions to engage with meeting participants.
> * Apps shared on stage by regular in-tenant users will render for anonymous users.

## Tenant admin setting for anonymous user app interaction

Teams admin can use the admin portal to enable or disable anonymous user app interaction for entire tenant. This setting is enabled by default, unless overridden by admin. You must enable this to support anonymous user interaction with apps in meetings, [Allow anonymous users to interact with apps in meetings](/microsoftteams/meeting-settings-in-teams).

## In-Meeting getContext from Teams client SDK

Apps receive the following info pertaining to the anonymous user through the Teams Client SDK `getContext API` when shared app stage is loaded. Apps recognize the users as anonymous by the **Unknown** userLicenseType and the **anon** userObjectId.

```csharp
"userObjectId": "8:anon:<<User GUID>>",
"userLicenseType": "Unknown",
"loginHint": "8:teamsvisitor:<<ID>>",
"userPrincipalName": "8:teamsvisitor:<<ID>>",
"tid": "<<User GUID>>"
```

## Payloads of Bot API for anonymous users in a meeting chat

Bot APIs make your bot meeting aware. Following are some examples of bot APIs and how they allow you to differentiate between regular and anonymous users:

**Paged Get Members API**

```csharp
{ 
  "members": [ 
    { 
      "id": "<<GUID>>", 
      "aadObjectId": "<<GUID>>", 
      "name": "TestName TestSurname", 
      "givenName": "TestName TestSurname", 
      "email": "sample", 
      "userPrincipalName": "sample", 
      "tenantId": "<<GUID>>", 
      "userRole": "anonymous" 
    } 
  ] 
} 
```

**Non-paginated Get Members API**

```csharp
{ 
  "members": [ 
    { 
      "id": "<<GUID>>", 
      "name": "AnonTest (Guest)", 
      "tenantId": "<<GUID>>", 
      "userRole": "anonymous" 
    } 
  ] 
} 
```

**Get Single Member API**

```csharp
{ 
  "id": "<<GUID>>", 
  "name": "AnonTest (Guest)", 
  "tenantId": "<<GUID>>", 
  "userRole": "anonymous" 
} 
```

**ConversationUpdate Event – MembersAdded Payload object**

```csharp
{ 
  "membersAdded": [ 
    { 
      "id": "<<GUID1>>" 
    } 
  ], 
  "type": "conversationUpdate", 
  "timestamp": "<<timestamp>>", 
  "id": "<<GUID2>>", 
  "channelId": "msteams", 
  "serviceUrl": "<<serviceURL>>", 
  "from": { 
    "id": "<<GUID3>>" 
  }, 
  "conversation": { 
    "isGroup": true, 
    "tenantId": "<<tenant id>>", 
    "id": "<<chat id>>" 
  }, 
  "recipient": { 
    "id": "<<bot id>>", 
    "name": "bot name" 
  }, 
  "channelData": { 
    "tenant": { 
      "id": "<<tenant id>>" 
    }, 
    "source": null, 
    "meeting": { 
      "id": "<<meeting id>>" 
    } 
  } 
} 
```

> [!NOTE]
>
> * When an anonymous user is added to the meeting, `membersAdded` payload object doesn't have `aadObjectId` field.
> * When an anonymous user is added to the meeting, `from` object in the payload always have the id of the meeting organizer, even if the anonymous user was added by another presenter.

**ConversationUpdate Event – MembersRemoved Payload object**

```csharp
{
  "membersRemoved": [
    {
      "id": "<<GUID1>>" 
    }
  ],
  "type": "conversationUpdate",
  "timestamp": "<<timestamp>>",
  "id": "<<GUID2>>",
  "channelId": "msteams",
  "serviceUrl": "<<serviceURL>>",
  "from": {
    "id": "<<GUID3>>"
  },
  "conversation": {
    "isGroup": true,
    "tenantId": "<<tenant id>>",
    "id": "<<chat id>>"
  },
  "recipient": {
    "id": "<<bot id>>",
    "name": "bot name"
  },
  "channelData": {
    "tenant": {
      "id": "<<tenant id>>"
    },
    "source": null,
    "meeting": {
      "id": "<<meeting id>>"
    }
  }
}
```

> [!NOTE]
>
> * When an anonymous user is added to a meeting, `membersRemoved` payload object doesn't have `aadObjectId` field.
> * When an anonymous user is added to a meeting, `from` object in the payload always have the id of the meeting organizer, even if the anonymous user was removed by another presenter.

**Create Conversation API**

```csharp
{ 
  "error": {
    "code": "BadArgument",
    "message": "Bot cannot create a conversation with an anonymous user"
  }
} 
```

**Invoke**

Anonymous users can interact with Adaptive Cards, which use invoke activities. The first snapshot shows a sample response for anonymous user for an invoke call. The following two examples show invoke activities responses of `tab/fetch` and tab or submit.

`tab/fetch`:

```csharp
{ 
"tab": { 
    "type": "continue", 
    "value": { 
        "cards": [ 
            { 
                "card": adaptiveCard1, 
            }, 
            { 
                "card": adaptiveCard2, 
            } 
            { 
                "card": adaptiveCard3 
            }   
        ] 
    }, 
}, 
"responseType": "tab" 
} 
```

`tab/submit` **continue** POST response:

When a user selects a button on the Adaptive Card tab, the `tab/submit` request is triggered to your bot with the corresponding data through the `Action.Submit` function of Adaptive Card. The Adaptive Card data is available through the data property of the `tab/submit` request. You receive either of the following responses to your request:

* An HTTP status code `200` response with no body. An empty `200` response results in no action taken by the client.

* The standard `200` tab continues response, as explained in fetch Adaptive Card. A tab continue response triggers the client to update the rendered Adaptive Card tab with the Adaptive Cards provided in the cards array of the continue response.

```csharp
{
"tab": {
    "type": "continue",
    "value": {
        "cards": [
            {
            "card": adaptiveCard1,
            },
            {
            "card": adaptiveCard2,
            }
        ]
    },
},
"responseType": "tab"
}
```

## See also

[Advanced meeting APIs](advanced-meeting-apis.md)
