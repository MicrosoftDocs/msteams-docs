---
title: Build apps for anonymous user
author: v-sdhakshina
description: Learn how to build apps for anonymous users and test the experience delivered to the anonymous users in meeting apps with all admin settings.
ms.topic: conceptual
ms.author: v-sdhakshina
ms.localizationpriority: medium
ms.date: 02/07/2023
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

Teams admins can use the Teams admin center to enable or disable anonymous user app interaction for the entire tenant. If your app needs to be accessed by anonymous users, ensure that the tenant admins enable the anonymous user app interaction. This setting is enabled by default. For more information, see [allow anonymous users to interact with apps in meetings](/microsoftteams/meeting-settings-in-teams).

To test your apps experience for anonymous users, select the URL in the meeting invite and join the meeting from a private browser window.

## In-Meeting getContext from Teams client library

Apps receive the following information for an anonymous user when they call the `getContext` API from the [shared app stage](~/apps-in-teams-meetings/build-apps-for-teams-meeting-stage.md). You can recognize anonymous users by checking for a `userLicenseType` value of `Anonymous`.

> [!NOTE]
> The Live Share SDK isn't supported for anonymous users.

# [JavaScript](#tab/javascript)

```javascript

microsoftTeams.app.getContext().then((context) => {
    if (context.user.licenseType === "Anonymous")
        {
            // Add your custom logic here
        }
});

```

# [JSON](#tab/json)

```json

{
   "app": {
    "locale": "en-us",
    "sessionId": "e0024c2a-067f-4f43-8423-6acac718b7a0",
    "theme": "dark",
    "parentMessageId": "",
    "userClickTime": 1675776700117,
    "host": {
        "name": "Teams",
        "clientType": "web",
        "sessionId": "",
        "ringId": "general"
    }
  },
  "page": {
    "frameContext": "meetingStage",
    "subPageId": "",
    "isMultiWindow": false,
    "sourceOrigin": ""
  },
  "user": {
    "id": "",
    "licenseType": "Anonymous",
    "loginHint": "",
    "userPrincipalName": ""
 },
 "chat": {
      "id": "19:meeting_ZmMyNWZjMzEtMWU0Mi00NDNmLWJhMmYtNjM4OTY0YmM0NWM2@thread.v2"
 },
  "meeting": {
      "id": "MCMxOTptZWV0aW5nX1ptTXlOV1pqTXpFdE1XVTBNaTAwTkRObUxXSmhNbVl0TmpNNE9UWTBZbU0wTldNMkB0aHJlYWQudjIjMA=="
    }
}

```

---

| **Property name** | **Description** |
| --- | --- |
| `userObjectId` | Empty string for anonymous user. |
| `userLicenseType` | `Anonymous` represents anonymous user. |
| `loginHint` | Empty string for anonymous user. |
| `userPrincipalName` | Empty string for anonymous user. |

For more information on `getContext`, see [get context by using the Microsoft Teams JavaScript library.](~/tabs/how-to/access-teams-context.md#get-context-by-using-the-microsoft-teams-javascript-library)

## Bot activities and APIs

With a few differences, the activities sent to your bot and the responses that it receives from bot APIs are consistent between anonymous and non-anonymous meeting participants.

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
| `userRole` | `Anonymous` represents anonymous user. |
| `tenantId` | Tenant ID of the meeting organizer. |
| `userRole` | `anonymous`, represents anonymous user. |

### ConversationUpdate activity MembersAdded and MembersRemoved

`MembersAdded`

```csharp
protected override async Task OnTeamsMembersAddedAsync(IList<TeamsChannelAccount> membersAdded, TeamInfo teamInfo, ITurnContext<IConversationUpdateActivity> turnContext, CancellationToken cancellationToken)
  {
     foreach (var teamMember in membersAdded)
     {
         // If UserRole == "anonymous", it indicates an anonymous user
         if (teamMember.UserRole == "anonymous" )
          {
             // Add your custom logic here
          }
          else
          {
           // Add your custom logic here
          }
     }
  }
```

`MembersRemoved`

```csharp
protected override async Task OnTeamsMembersRemovedAsync(IList<TeamsChannelAccount> membersRemoved, TeamInfo teamInfo, ITurnContext<IConversationUpdateActivity> turnContext, CancellationToken cancellationToken)
   foreach (var member in membersRemoved)
   {
      // If AadObjectId is null, it indicates an anonymous user
       if (member.AadObjectId == null)
       {
           // Add your custom logic here
       }
       else
       {
           // Add your custom logic here
       }
   }
```

> [!NOTE]
>
> When an anonymous user joins or leaves a meeting, the `from` object in the payload always has the ID of the meeting organizer, even if the action was taken by someone else.

### Create Conversation API

Bots aren't allowed to initiate a one-on-one conversation with an anonymous user. If a bot calls the [Create Conversation API](/dotnet/api/microsoft.bot.builder.botframeworkadapter.createconversationasync) with the user ID of an anonymous user, it will receive a `400` Bad Request status code and the following error response:

```csharp
var conversationParameters = new ConversationParameters
    {
       IsGroup = false,
       Bot = turnContext.Activity.Recipient,
       Members = new ChannelAccount[] { teamMember },
       TenantId = turnContext.Activity.Conversation.TenantId,
    };
    
    await ((CloudAdapter)turnContext.Adapter).CreateConversationAsync(
    conversationParameters,
    async (t1, c1) =>
    {
       conversationReference = t1.Activity.GetConversationReference();
       await ((CloudAdapter)turnContext.Adapter).ContinueConversationAsync(
       _appId,
       conversationReference,
       async (t2, c2) =>
       {
         await t2.SendActivityAsync(proactiveMessage, c2);
        },
        cancellationToken);
    },
cancellationToken);
```

```json
{ 
  "error": {
    "code": "BadArgument",
    "message": "Bot cannot create a conversation with an anonymous user"
  }
} 
```

### Adaptive Cards

Anonymous users can view and interact with Adaptive Cards in the meeting chat. Adaptive Card actions behave the same way for anonymous and non-anonymous users. For more information, see [Card actions](/microsoftteams/platform/task-modules-and-cards/cards/cards-actions?tabs=json).

## Known issues and limitations

* For an anonymous user, the user ID from `getContext` and the user ID received by the bot are different. It's not possible to correlate the two directly. If you need to track the user's identity between your tab and bot, you must prompt the user to authenticate with an external identity provider.

* Anonymous users will see a generic app icon on bot messages and cards, instead of the app's actual icon.

    :::image type="content" source="../assets/images/apps-in-meetings/app-icon.png" alt-text="Screenshot shows how the app icon displays for anonymous user.":::

## Code sample

|Sample name | Description | .NET |Node.js|
|----------------|-----------------|--------------|--------------|
| Anonymous user support | Sample app to show anonymous user support in meeting apps. | [View](https://github.com/OfficeDev/Microsoft-Teams-Samples/tree/main/samples/app-anonymous-users/csharp) | [View](https://github.com/OfficeDev/Microsoft-Teams-Samples/tree/main/samples/app-anonymous-users/nodejs)|

## Next step

> [!div class="nextstepaction"]
> [Meeting apps APIs](meeting-apps-apis.md)

## See also

* [Apps for Teams meetings and calls](teams-apps-in-meetings.md)
* [Build apps for Teams meeting stage](build-apps-for-teams-meeting-stage.md)
* [Meeting apps APIs](meeting-apps-apis.md)
* [How Microsoft Teams bots work](/azure/bot-service/bot-builder-basics-teams)
* [Get context for your tab](../tabs/how-to/access-teams-context.md)
