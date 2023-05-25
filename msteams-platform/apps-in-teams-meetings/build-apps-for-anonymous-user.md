---
title: Build apps for anonymous user
author: v-sdhakshina
description: Learn how to build apps for anonymous users and test the experience delivered to the anonymous users in meeting apps with all admin settings.
ms.topic: conceptual
ms.author: v-sdhakshina
ms.localizationpriority: medium
---

# Build apps for anonymous users

Anonymous users don't have an Azure Active Directory (Azure AD) identity and aren't federated with a tenant. The anonymous participants are like external users but their identity isn't shown in the meeting. An anonymous user can be a presenter or an attendee but can't be an organizer. You can build bots, messaging extensions, and cards and task modules in your app to engage with anonymous meeting participants.

> [!NOTE]
> Apps for anonymous users is supported in Teams mobile client only and isn't supported in channel meetings.

For anonymous users to interact with the apps in Teams meetings, ensure the following:

1. Update your [app manifest](#app-manifest-update-for-anonymous-users).
2. Enable the [anonymous user app interaction](#admin-setting-for-anonymous-user-app-interaction) in Teams admin center.

## App manifest update for anonymous users

To allow anonymous users to interact with the tab app, update the `supportsAnonymousGuestUsers` property to `true` in your app manifest schema v1.16 or later. Following is an example of the manifest:

```json

 "meetingExtensionDefinition": {
  "supportsAnonymousGuestUsers": true
 }

```

For more information, see [app manifest schema.](~/resources/schema/manifest-schema.md#meetingextensiondefinition)

## Anonymous user authentication flow

Anonymous users can't be authenticated through Azure AD authentication or `getAuthToken` from the client SDK as they aren't Azure AD accounts. `getAuthToken` fails for anonymous users by returning the error `useGetAuthToken: Failed with error - User is not authenticated`. If you need to authenticate anonymous users, your app must identify anonymous users and provide an alternative authentication experience in the meetings. You can determine if a user is anonymous by validating [user's context](#in-meeting-getcontext-from-teams-client-library).

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
