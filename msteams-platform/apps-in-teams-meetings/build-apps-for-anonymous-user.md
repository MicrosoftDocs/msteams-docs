---
title: Build apps for anonymous user
author: v-sdhakshina
description: Learn how to build apps for anonymous users and test the experience delivered to the anonymous users in meeting apps with all admin settings.
ms.topic: conceptual
ms.author: v-sdhakshina
ms.localizationpriority: medium
---

# Build apps for anonymous users

You can build bots, message extensions, and cards and task modules in your app to engage with anonymous meeting participants.

## Admin setting for anonymous user app interaction

Teams admins can use the Teams admin center to enable or disable anonymous user app interaction for the entire tenant. This setting is enabled by default. For more information, see [allow anonymous users to interact with apps in meetings](/microsoftteams/meeting-settings-in-teams).

To test your apps experience for anonymous users, select the URL in the meeting invite and join the meeting from a private browser window.

## In-Meeting getContext from Teams client library

Apps receive the following information for an anonymous user when they call the `getContext` API from the [shared app stage](~/apps-in-teams-meetings/build-apps-for-teams-meeting-stage.md). You can recognize anonymous users by checking for a `userLicenseType` value of `Unknown`.

```csharp
"userObjectId": "8:anon:<GUID1>",
"userLicenseType": "Unknown",
"loginHint": "8:teamsvisitor:<ID>",
"userPrincipalName": "8:teamsvisitor:<ID>",
"tid": "<meeting organizer tenant ID>"
```

| **Property name** | **Description** |
| --- | --- |
| `userObjectId` | Unique generated value for the anonymous user. This value cannot be used in calls to Graph APIs. |
| `userLicenseType` | `Unknown`, represents anonymous user. |
| `loginHint` | Unique generated value. This value cannot be used as a hint in login flows. |
| `userPrincipalName` | Unique generated value. This value cannot be used in calls to Graph APIs. |
| `tid` | Tenant ID of the meeting organizer. |

> [!NOTE]
> When an anonymous user joins a meeting, a new user ID is generated. Whenever the anonymous user re-joins a meeting, a different user ID is generated.

## Bot activities and APIs

With a few differences, the activities sent to your bot, and the responses that it receives from bot APIs, are consistent between anonymous and non-anonymous meeting participants. In general:

* The user ID is a generated value that is different each time the anonymous user joins the meeting.
* The `aadObjectId` property is omitted.
* The `userRole` property is set to **anonymous**.
* The provided tenant ID is set to the tenant ID of the meeting organizer.

### Get members and get single member APIs

The [get members](/microsoftteams/platform/bots/how-to/get-teams-context#fetch-the-roster-or-user-profile) and [get single member](/microsoftteams/platform/bots/how-to/get-teams-context#get-single-member-details) APIs return limited information for anonymous users:

```json
{ 
  "id": "<GUID1>", 
  "name": "<AnonTest (Guest)>",  
  "tenantId": "<GUID2>", 
  "userRole": "anonymous" 
} 
```

| **Property name** | **Description** |
| --- | --- |
| `id` | Unique generated value for the anonymous user. |
| `name` | Name provided by the anonymous user when joining the meeting. |
| `tenantId` | Tenant ID of the meeting organizer. |
| `userRole` | `anonymous`, represents anonymous user. |

> [!NOTE]
> The ID received from the bot APIs and the Teams client library API are not the same.

### ConversationUpdate activity MembersAdded and MembersRemoved

```csharp
{ 
  "membersAdded": [ 
    { 
      "id": "<GUID1>" 
    } 
  ], 
  "type": "conversationUpdate", 
  "timestamp": "<timestamp>", 
  "id": "<event unique identifier>", 
  "channelId": "msteams", 
  "serviceUrl": "<serviceURL>", 
  "from": { 
    "id": "<GUID2>" 
  }, 
  "conversation": { 
    "isGroup": true, 
    "tenantId": "<tenant id>", 
    "id": "<conversation id>" 
  }, 
  "recipient": { 
    "id": "<bot id>", 
    "name": "<bot name>" 
  }, 
  "channelData": { 
    "tenant": { 
      "id": "<tenant id>" 
    }, 
    "source": null, 
    "meeting": { 
      "id": "<meeting id>" 
    } 
  } 
} 
```

| **Property name** | **Description** |
| --- | --- |
| `membersAdded.id` | Anonymous user ID. |
| `from.id` | Meeting organizer ID. |
| `conversation.tenantId` | Tenant ID of the meeting organizer. |
| `conversation.id` | Conversation ID of the meeting chat. |
| `tenant.id` | Tenant ID of the meeting organizer. |

Similar changes apply to the `membersRemoved` activity payload.

> [!NOTE]
>
> When an anonymous user joins or leaves a meeting, the `from` object in the payload always has the id of the meeting organizer, even if the action was taken by someone else.

### Create Conversation API

Bots are not allowed to initiate a One-on-One conversation with an anonymous user. If a bot calls the Create Conversation API with the user ID of an anonymous user, it will receive a `400` Bad Request status code and the following error response:

```csharp
{ 
  "error": {
    "code": "BadArgument",
    "message": "Bot cannot create a conversation with an anonymous user"
  }
} 
```

### Adaptive cards

Anonymous users can view and interact with Adaptive Cards in the meeting chat. Adaptive card actions behave the same way for anonymous and non-anonymous users. For more information, see [Card actions](/microsoftteams/platform/task-modules-and-cards/cards/cards-actions?tabs=json).

## Known issues and limitations

* Side panel tabs and content bubbles aren't available for anonymous users. Anonymous users can still see app content shared to the meeting stage.

* For an anonymous user, the user ID from `getContext` and the user ID received by the bot are different. It's not possible to correlate the two directly. If you need to track the user's identity between your tab and bot, you must prompt the user to authenticate with an external identity provider.

* Anonymous users will see a generic app icon on bot messages and cards, instead of the app's actual icon. For example:

    :::image type="content" source="../assets/images/apps-in-meetings/app-icon.png" alt-text="This screenshot shows you how the app icon displays for anonymous user.":::

## Next step

> [!div class="nextstepaction"]
> [Meeting apps APIs](meeting-apps-apis.md)
## See also

* [Apps for Teams meetings and calls](teams-apps-in-meetings.md)
* [Build apps for Teams meeting stage](build-apps-for-teams-meeting-stage.md)
* [Meeting apps APIs](meeting-apps-apis.md)
* [How Microsoft Teams bots work](/azure/bot-service/bot-builder-basics-teams)
* [Get context for your tab](../tabs/how-to/access-teams-context.md)
