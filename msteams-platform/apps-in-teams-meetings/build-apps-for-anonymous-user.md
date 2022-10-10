---
title: Build apps for anonymous user
author: v-sdhakshina
description: In this article, learn how to test the experience delivered to the anonymous users in meeting apps with all admin settings.
ms.topic: conceptual
ms.author: v-sdhakshina
ms.localizationpriority: medium
---

# Build apps for anonymous users

You can test the experience delivered to anonymous users by selecting the meeting join URL present in the meeting invite and joining the meeting via private window.

Anonymous users can't see the app icon when the message is sent through a bot app. It displays only generic app icon as following:

:::image type="content" source="../assets/images/apps-in-meetings/app-icon.png" alt-text="This screenshot shows you how the app icon displays for anonymous user.":::

> [!NOTE]
>
> * Side panel tabs and content bubbles aren't available for anonymous users at the moment.
> * You can build Bot, Messaging Extensions, Cards and Task Module solutions in your app to engage with meeting participants..
> * Apps shared on stage by regular in-tenant users will render for anonymous users.

## Tenant admin setting for anonymous user app interaction

Teams admin can use the admin portal to enable or disable anonymous user app interaction for entire tenant. This setting is enabled by default, unless overridden by the admin. You must enable this to support anonymous user interaction with apps in meetings, [Allow anonymous users to interact with apps in meetings](/microsoftteams/meeting-settings-in-teams).

## In-Meeting getContext from Teams client SDK

Apps receive the following info pertaining to the anonymous user through the Teams Client SDK `getContext API` when the shared app stage is loaded. Apps can recognize the users as anonymous by the **Unknown** userLicenseType.

```csharp
"userObjectId": "8:anon:<<User GUID>>",
"userLicenseType": "Unknown",
"loginHint": "8:teamsvisitor:<<ID>>",
"userPrincipalName": "8:teamsvisitor:<<ID>>",
"tid": "<<GUID>>"
```

| **Property Name** | **Description** |
| --- | --- |
| `userObjectId` | Invalid value, `userObjectId` is not supported for anonymous user |
| `userLicenseType` | `Unknown` value represent anonymous user |
| `loginHint` | Unique ID for anonymous user |
| `userPrincipalName` | Unique ID for anonymous user |
| `tid` | Tenant ID of the meeting organizer |

## Payloads of Bot API for anonymous users in a meeting chat

Bot APIs make your bot meeting aware. Following are some examples of bot APIs and how they allow you to differentiate between regular and anonymous users:

**Paged Get Members API**

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

| **Property Name** | **Description** |
| --- | --- |
| `id` | 29:XXXX encrypted user id |
| `name` | provided by anonymous user, when joining meeting |
| `tenantId` | Tenant ID of the meeting organizer |
| `userRole` | `anonymous`, represent anonymous user |

> [!NOTE]
> The ID returned in bot API payload and Teams Client SDK are not same.

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
> * When an anonymous user is removed from a meeting, `membersRemoved` payload object doesn't have `aadObjectId` field.
> * When an anonymous user is removed from a meeting, `from` object in the payload always have the id of the meeting organizer, even if the anonymous user was removed by another presenter.

**Create Conversation API**

Create conversation API is not supported for anonymous users. The anonymous user receives the following error payload:

```csharp
{ 
  "error": {
    "code": "BadArgument",
    "message": "Bot cannot create a conversation with an anonymous user"
  }
} 
```

**Invoke**

Anonymous users can interact with Adaptive Cards, which use invoke activities.

When a user selects a button on the Adaptive Card in meeting chat, the invoke request is triggered to your bot with the corresponding data through the `Action.Submit` function of Adaptive Card. The Adaptive Card data is available through the data property of the request. You receive either of the following responses to your request:

* An HTTP status code `200` response with no body. An empty `200` response results in no action taken by the client.
* The standard `200` continue response. A continue response triggers the client to update the rendered Adaptive Card with the Adaptive Cards provided in the cards array of the continue response.

The example shows invoke activities request payload on submit event.

```json
{
  clientMessageId : "<<id>>"
  complianceData: {
    action: {
     type: "invoke",
     title: "Submit Vote"
     }
  }
  conversation: {
    id: "<<conversation id>>"
  }
  messageType: "RichText/Media_Card"
  serverMessageId: "<<id2>>"
  value: {
    choice: "<<user selection object>>"
      data: {
       <<data provided by bot>>
      }
    }
  }
```

| **Property Name** | **Description** |
| --- | --- |
| `data` | Object provided by bot to render adaptive card |
| `choice` | User selected object from adaptive card |

## See also

* [Build apps for Teams meeting stage](build-apps-for-teams-meeting-stage.md)
* [Meeting apps APIs](meeting-apps-apis.md)
