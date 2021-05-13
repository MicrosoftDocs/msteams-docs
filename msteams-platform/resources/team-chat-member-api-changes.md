---
title: Bot API changes for team and chat members
author: ojasvichoudhary 
description: Describes upcoming and in-progress changes to the Bot APIs used for retrieving members of teams and chats
keywords: bot framework apis team members roster
localization_priority: Normal
ms.topic: reference
ms.author: ojchoudh
---

# Teams bot API changes to fetch team or chat members

>[!NOTE]
> The deprecation process for `TeamsInfo.getMembers` and `TeamsInfo.GetMembersAsync` APIs have started. Initially, they are heavily throttled to five requests per minute and return a maximum of 10K members per team. This results in the full roster not being returned as team size increases.
> You must update to version 4.10 or higher of the Bot Framework SDK and switch to the paginated API endpoints, or the `TeamsInfo.GetMemberAsync` single user API. This also applies to your bot even if you are not directly using these APIs, as older SDKs call these APIs during [membersAdded](../bots/how-to/conversations/subscribe-to-conversation-events.md#team-members-added) events. To view the list of upcoming changes, see [API changes](team-chat-member-api-changes.md#api-changes). 

Currently, bot developers who want to retrieve information for one or more members of a chat or team use the Microsoft Teams bot APIs `TeamsInfo.GetMembersAsync` for C# or `TeamsInfo.getMembers` for TypeScript or Node.js APIs. For more information, see [fetch roster or user profile](../bots/how-to/get-teams-context.md#fetch-the-roster-or-user-profile). These APIs have several shortcomings.

Currently, if you want to retrieve information for one or more members of a chat or team, you can use the [Microsoft Teams bot APIs](https://docs.microsoft.com/microsoftteams/platform/bots/how-to/get-teams-context?tabs=dotnet#fetch-the-roster-or-user-profile) `TeamsInfo.GetMembersAsync` for C# or `TeamsInfo.getMembers` for TypeScript or Node.js APIs. These APIs have the following shortcomings:

* For large teams, performance is poor and timeouts are more likely: The maximum team size has grown considerably since Teams was released in early 2017. As `GetMembersAsync` or `getMembers` returns the entire member list, it takes a long time for the API call to return for large teams, and it is common for the call to time out and you have to try again.
* Getting profile details for a single user is difficult: To get the profile information for a single user, you have to retrieve the entire member list and then search for the one you want. There is a helper function in the Bot Framework SDK to make it simpler, but it is not efficient.

With the introduction of organization wide teams, there is a requirement to better align these APIs with Office 365 privacy controls. Bots used in large teams are able to retrieve basic profile information similar to the `User.ReadBasic.All` Microsoft Graph permission. Tenant administrators have a great deal of control over which apps and bots can be used in their tenant, but these settings are different from Microsoft Graph.

The following code provides a sample JSON representation of what is returned by Teams bot APIs:

```json
[{
    "id": "29:1GcS4EyB_oSI8A88XmWBN7NJFyMqe3QGnJdgLfFGkJnVelzRGos0bPbpsfJjcbAD22bmKc4GMbrY2g4JDrrA8vM06X1-cHHle4zOE6U4ttcc",
    "name": "Anon1 (Guest)",
    "tenantId":"72f988bf-86f1-41af-91ab-2d7cd011db47",
	"userRole": "anonymous"
}, {
    "id": "29:1bSnHZ7Js2STWrgk6ScEErLk1Lp2zQuD5H2qQ960rtvstKp8tKLl-3r8b6DoW0QxZimuTxk_kupZ1DBMpvIQQUAZL-PNj0EORDvRZXy8kvWk",
    "objectId": "76b0b09f-d410-48fd-993e-84da521a597b",
    "givenName": "John",
    "surname": "Patterson",
    "email": "johnp@fabrikam.com",
    "userPrincipalName": "johnp@fabrikam.com",
    "tenantId":"72f988bf-86f1-41af-91ab-2d7cd011db47",
	"userRole": "user"
}, {
    "id": "29:1URzNQM1x1PNMr1D7L5_lFe6qF6gEfAbkdG8_BUxOW2mTKryQqEZtBTqDt10-MghkzjYDuUj4KG6nvg5lFAyjOLiGJ4jzhb99WrnI7XKriCs",
    "objectId": "6b7b3b2a-2c4b-4175-8582-41c9e685c1b5",
    "givenName": "Rick",
    "surname": "Stevens",
    "email": "Rick.Stevens@fabrikam.com",
    "userPrincipalName": "rstevens@fabrikam.com",
    "tenantId":"72f988bf-86f1-41af-91ab-2d7cd011db47",
	"userRole": "user"
}]
```

## API Changes

Following are the upcoming API changes:

* A new API is created [`TeamsInfo.GetPagedMembersAsync`](https://docs.microsoft.com/microsoftteams/platform/bots/how-to/get-teams-context?tabs=dotnet#fetch-the-roster-or-user-profile) for retrieving profile information for members of a chat or team. This API is now available with the Bot Framework 4.8 SDK. For development in all other versions, use the [`GetConversationPagedMembers`](https://docs.microsoft.com/dotnet/api/microsoft.bot.connector.conversationsextensions.getconversationpagedmembersasync?view=botbuilder-dotnet-stable&preserve-view=true) method.

    > [!NOTE]
    > In either v3 or v4, the best action is to upgrade to the latest point release that is 3.30.2 or 4.8 respectively.

* A new API is created [`TeamsInfo.GetMemberAsync`](https://docs.microsoft.com/microsoftteams/platform/bots/how-to/get-teams-context?tabs=dotnet#get-single-member-details) for retrieving the profile information for a single user. It takes the ID of the team or chat and a [UPN](https://docs.microsoft.com/windows/win32/ad/naming-properties#userprincipalname) that is `userPrincipalName`, Azure Active Directory Object ID `objectId`, or the Teams user ID `id` as parameters and returns the profile information for that user.

    > [!NOTE]
    > `objectId` is changed to `aadObjectId` to match what is called in the `Activity` object of a Bot Framework message. The new API is available with version 4.8 of the Bot Framework SDK. It is also available in the Teams SDK extension Bot Framework 3.x. Meanwhile, you can use the [REST](https://docs.microsoft.com/microsoftteams/platform/bots/how-to/get-teams-context?tabs=json#get-single-member-details) endpoint.

* `TeamsInfo.GetMembersAsync` in C# and `TeamsInfo.getMembers` in TypeScript or Node.js is formally deprecated. Once the new API is available, you must update your bots to use it. This also applies to the [underlying REST API that these APIs use](https://docs.microsoft.com/microsoftteams/platform/bots/how-to/get-teams-context?tabs=json#tabpanel_CeZOj-G++Q_json).
* By late 2021, bots cannot proactively retrieve the `userPrincipalName` or `email` properties for members of a chat or team. Bots must use Graph to retrieve them. The `userPrincipalName` and `email` properties are not returned from the new `GetConversationPagedMembers` API starting in late 2021. Bots have to use Graph with an access token to retrieve information. It must be made easier for bots to get an access token and streamline and simplify the end-user consent process.
