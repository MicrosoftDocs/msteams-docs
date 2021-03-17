---
title: Bot API changes for team and chat members
author: ojasvichoudhary 
description: Describes upcoming and in-progress changes to the Bot APIs used for retrieving members of teams and chats
keywords: bot framework apis team members roster
ms.topic: reference
ms.author: ojchoudh
---
# Changes to Teams bot APIs for fetching team and chat members

>[!NOTE]
> We've started with the deprecation process for `TeamsInfo.getMembers` and `TeamsInfo.GetMembersAsync` APIs. Initially, they will be throttled to 5 requests per minute and return a maximum of 10K members per team. This can result in the full roster not being returned as the team size [increases](https://blogs.microsoft.com/2020/09/22/whats-new-in-microsoft-teams-microsoft-ignite-2020/). To view the list of upcoming changes, see [API changes](https://docs.microsoft.com/microsoftteams/platform/resources/team-chat-member-api-changes#api-changes). Users must update to version 4.8 or higher of the Bot Framework SDK and switch to the paginated API endpoints, or the `TeamsInfo.GetMemberAsync` single user API. 

Currently, bot developers who want to retrieve information for one or more members of a chat or team use the Microsoft Teams bot APIs `TeamsInfo.GetMembersAsync` (for C#) or `TeamsInfo.getMembers` (for TypeScript/Node.js) APIs [(documented here)](https://docs.microsoft.com/microsoftteams/platform/bots/how-to/get-teams-context?tabs=dotnet#fetching-the-roster-or-user-profile). These APIs have several shortcomings today:

* **For large teams, performance is poor and timeouts are more likely.** The maximum team size has grown considerably since Microsoft Teams was released in early 2017. Since `GetMembersAsync`/`getMembers` returns the entire member list, it takes a long time for the API call to return for large teams, and it’s not uncommon for the call to time out and you have to try again.
* **Getting profile details for a single user is cumbersome.** To get the profile information for a single user, you have to retrieve the entire member list and then search for the one you want. True, there’s a helper function in the Bot Framework SDK to make it simpler, but under the covers it’s not efficient.

Separately, with the introduction of org-wide teams, we realized it was time to better align these APIs with Office 365 privacy controls: bots used in large teams are able to retrieve basic profile information, which is similar to the `User.ReadBasic.All` Microsoft Graph permission. Tenant administrators have a great deal of control over which apps and bots can be used in their tenant, but these settings are different than the ones governing Microsoft Graph.

Here’s a sample JSON representation of what’s returned by these APIs today. I’ll refer to some of the fields below.

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
Here are the upcoming API changes:

* We've created a new API [`TeamsInfo.GetPagedMembersAsync`](https://docs.microsoft.com/microsoftteams/platform/bots/how-to/get-teams-context?tabs=dotnet#fetching-the-roster-or-user-profile) for retrieving profile information for members of a chat/team. This API is now available with the Bot Framework 4.8 SDK. For development in all other versions use the [`GetConversationPagedMembers`](https://docs.microsoft.com/dotnet/api/microsoft.bot.connector.conversationsextensions.getconversationpagedmembersasync?view=botbuilder-dotnet-stable) method. **Note**: In either v3 or v4, the best action is to upgrade to the latest point release (3.30.2 or 4.8 respectively). 
* We've created a new API [`TeamsInfo.GetMemberAsync`](https://docs.microsoft.com/microsoftteams/platform/bots/how-to/get-teams-context?tabs=dotnet#get-single-member-details) for retrieving the profile information for a single user. It takes the ID of the team/chat and a [UPN](https://docs.microsoft.com/windows/win32/ad/naming-properties#userprincipalname) (`userPrincipalName`, *see above*), Azure Active Directory Object ID (`objectId`, *see above*), or the Teams user ID (`id`, *see above*) as parameters and returns the profile information for that user. **Note**: We're changing `objectId` to `aadObjectId` to match what it's called in the `Activity` object of a Bot Framework message. The new API is available with version 4.8 of the Bot Framework SDK. It will soon be available in the Teams SDK extension Bot Framework 3.x as well; meanwhile you can use the [REST](https://docs.microsoft.com/microsoftteams/platform/bots/how-to/get-teams-context?tabs=json#get-single-member-details) endpoint.
* `TeamsInfo.GetMembersAsync` (C#) and `TeamsInfo.getMembers` (TypeScript/Node.js) is formally deprecated and will stop working in late 2021. We'll announce a specific timetable in May 2020, based on feedback from developers. Once the new paged API is available, developers should update their bots to use it. (This also applies to the [underlying REST API these APIs use](https://docs.microsoft.com/microsoftteams/platform/bots/how-to/get-teams-context?tabs=json#tabpanel_CeZOj-G++Q_json).)
* By late 2021, bots will not be able to proactively retrieve the `userPrincipalName` or `email` properties for members of a chat/team and will need to use Microsoft Graph to retrieve them. Specifically, `userPrincipalName` and `email` properties won't be returned from the new `GetConversationPagedMembers` API starting in late 2021. Bots will have to use Microsoft Graph with an access token to retrieve this information. This is obviously a major change: We must make it easier for bots to get an access token, and we must streamline and simplify the end-user consent process.

## Feedback and More Information
We'll use this page for providing up to date information on these changes. If you have questions, use the "Send feedback > on this page" in the **Feedback** section below. 
