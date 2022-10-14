---
title: Build apps for anonymous user
author: v-sdhakshina
description: In this article, learn how to test the experience delivered to the anonymous users in meeting apps with all admin settings.
ms.topic: conceptual
ms.author: v-sdhakshina
ms.localizationpriority: medium
---

# Build apps for anonymous users

You can build Bot, Messaging Extensions, Cards and Task Module solutions in your app to engage with anonymous participants in meeting. You can test the experience delivered to anonymous users by selecting the meeting join URL present in the meeting invite and joining the meeting via private window.

> [!NOTE]
>
> * Side panel tabs and content bubbles aren't available for anonymous users at the moment.
> * Apps shared on stage by regular in-tenant users will render for anonymous users.

## Tenant admin setting for anonymous user app interaction

Teams admin can use the admin portal to enable or disable anonymous user app interaction for entire tenant. This setting is enabled by default, unless overridden by the admin. You must enable this to support anonymous user interaction with apps in meetings, [Allow anonymous users to interact with apps in meetings](/microsoftteams/meeting-settings-in-teams).

## In-Meeting getContext from Teams client SDK

Apps receive the following info pertaining to the anonymous user through the Teams Client SDK `getContext API` when the shared app stage is loaded. Apps can recognize the users as anonymous by the **Unknown** userLicenseType.

```csharp
"userObjectId": "8:anon:<<GUID1>>",
"userLicenseType": "Unknown",
"loginHint": "8:teamsvisitor:<<ID>>",
"userPrincipalName": "8:teamsvisitor:<<ID>>",
"tid": "<<GUID2>>"
```

| **Property Name** | **Description** |
| --- | --- |
| `userObjectId` | Currently, invalid value is returned in `userObjectId`, using this value for identifying anonymous user is not advised |
| `userLicenseType` | `Unknown`, represents anonymous user |
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
      "id": "<<GUID1>>", 
      "name": "<<AnonTest (Guest)>>",  
      "tenantId": "<<GUID2>>", 
      "userRole": "anonymous" 
    } 
  ] 
} 
```

| **Property Name** | **Description** |
| --- | --- |
| `id` | Anonymous user ID |
| `name` | Provided by anonymous user, when joining meeting |
| `tenantId` | Tenant ID of the meeting organizer |
| `userRole` | `anonymous`, represents anonymous user |

> [!NOTE]
> The ID received in bot API payload and Teams Client SDK API are not same.

**Get Single Member API**

```csharp
{ 
  "id": "<<GUID1>>", 
  "name": "<<AnonTest (Guest)>>", 
  "tenantId": "<<GUID2>>", 
  "userRole": "anonymous" 
} 
```

| **Property Name** | **Description** |
| --- | --- |
| `id` | Anonymous user ID |
| `name` | Provided by anonymous user, when joining meeting |
| `tenantId` | Tenant ID of the meeting organizer |
| `userRole` | `anonymous`, represents anonymous user |

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
  "id": "<<event unique identifier>>", 
  "channelId": "msteams", 
  "serviceUrl": "<<serviceURL>>", 
  "from": { 
    "id": "<<GUID2>>" 
  }, 
  "conversation": { 
    "isGroup": true, 
    "tenantId": "<<tenant id>>", 
    "id": "<<conversation id>>" 
  }, 
  "recipient": { 
    "id": "<<bot id>>", 
    "name": "<<bot name>>" 
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

| **Property Name** | **Description** |
| --- | --- |
| `membersAdded`.`id` | Anonymous user ID |
| `from`.`id` | Meeting organizer ID |
| `conversation`.`tenantId` | Tenant ID of the meeting organizer |
| `conversation`.`id` | Conversation ID |
| `recipient`.`id` | Bot ID |
| `tenant`.`id` | Tenant ID of the meeting organizer |

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
  "id": "<<event unique identifier>>",
  "channelId": "msteams",
  "serviceUrl": "<<serviceURL>>",
  "from": {
    "id": "<<GUID2>>"
  },
  "conversation": {
    "isGroup": true,
    "tenantId": "<<tenant id>>",
    "id": "<<conversation id>>"
  },
  "recipient": {
    "id": "<<bot id>>",
    "name": "<<bot name>>"
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

| **Property Name** | **Description** |
| --- | --- |
| `membersRemoved`.`id` | Anonymous user ID |
| `from`.`id` | Meeting organizer ID |
| `conversation`.`tenantId` | Tenant ID of the meeting organizer |
| `conversation`.`id` | Conversation ID |
| `recipient`.`id` | Bot ID |
| `tenant`.`id` | Tenant ID of the meeting organizer |

> [!NOTE]
>
> * When an anonymous user is removed from a meeting, `membersRemoved` payload object doesn't have `aadObjectId` field.
> * When an anonymous user is removed from a meeting, `from` object in the payload always have the id of the meeting organizer, even if the anonymous user was removed by another presenter.

**Create Conversation API**

Create conversation API is not supported for anonymous users. If a bot attempts to create a conversation with an anonymous user, it will receive a `400` Bad Request status code, with the following payload:

```csharp
{ 
  "error": {
    "code": "BadArgument",
    "message": "Bot cannot create a conversation with an anonymous user"
  }
} 
```

**Invoke**

Anonymous users can interact with Adaptive Cards, which use invoke activities. The payload received by bot on invoke activities for anonymous user is exactly same as the payload received for any user.

Anonymous users can interact with Adaptive Cards, which use invoke activities. When an invoke request is sent from anonymous user to the bot, the payload request will not have `imdisplayname`. The `from`.`id` and `from`.`name` fields will include anonymous user details. For more information, see [cards action](/microsoftteams/platform/task-modules-and-cards/cards/cards-actions?tabs=json).

## Adaptive card for anonymous users

Currently, anonymous users can't see the app icon when the message is sent through a bot app. It displays only generic app icon as following:

:::image type="content" source="../assets/images/apps-in-meetings/app-icon.png" alt-text="This screenshot shows you how the app icon displays for anonymous user.":::

## See also

* [Build apps for Teams meeting stage](build-apps-for-teams-meeting-stage.md)
* [Meeting apps APIs](meeting-apps-apis.md)
* [How Microsoft Teams bots work](/azure/bot-service/bot-builder-basics-teams)
