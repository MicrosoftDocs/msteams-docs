---
title: Bot API changes for team and chat members
author: ojasvichoudhary 
description: In this module, learn upcoming and in-progress changes to the Bot APIs used for retrieving members of teams and chats
ms.localizationpriority: medium
ms.topic: reference
ms.author: ojchoudh
ms.date: 08/30/2022
---

# Teams bot API changes to fetch team or chat members

>[!NOTE]
> The deprecation process for `TeamsInfo.getMembers` and `TeamsInfo.GetMembersAsync` APIs have started. Initially, they are heavily throttled to five requests per minute and return a maximum of 10K members per team. This results in the full roster not being returned as team size increases.
> You must update to version 4.10 or higher of the Bot Framework SDK and switch to the paginated API endpoints, or the `TeamsInfo.GetMemberAsync` single user API. This also applies to your bot even if you are not directly using these APIs, as older SDKs call these APIs during [membersAdded](../bots/how-to/conversations/subscribe-to-conversation-events.md#members-added) events. To view the list of upcoming changes, see [API changes](team-chat-member-api-changes.md#api-changes).

Currently, if you want to retrieve information for one or more members of a chat or team, you can use the [Microsoft Teams bot APIs](/microsoftteams/platform/bots/how-to/get-teams-context?tabs=dotnet#fetch-the-roster-or-user-profile) `TeamsInfo.GetMembersAsync` for C# or `TeamsInfo.getMembers` for TypeScript or Node.js APIs. For more information, see [fetch roster or user profile](../bots/how-to/get-teams-context.md#fetch-the-roster-or-user-profile).

These APIs have the following shortcomings:

* For large teams, performance is poor and timeouts are more likely: The maximum team size has grown considerably since Teams was released in early 2017. As `GetMembersAsync` or `getMembers` returns the entire member list, it takes a long time for the API call to return for large teams, and it's common for the call to time out and you have to try again.
* Getting profile details for a single user is difficult: To get the profile information for a single user, you have to retrieve the entire member list, and then search for the one you want. There's a helper function in the Bot Framework SDK to make it simpler, but it isn't efficient.

With the introduction of organization wide teams, there's a requirement to better align these APIs with Microsoft 365 privacy controls. Bots used in large teams are able to retrieve basic profile information similar to the `User.ReadBasic.All` Microsoft Graph permission. Tenant administrators have a great deal of control over which apps and bots can be used in their tenant, but these settings are different from Microsoft Graph.

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

## API changes

Following are the upcoming API changes:

* A new API is created [`TeamsInfo.GetPagedMembersAsync`](/microsoftteams/platform/bots/how-to/get-teams-context?tabs=dotnet#fetch-the-roster-or-user-profile) for retrieving profile information for members of a chat or team. This API is now available with the Bot Framework version 4.8 or later SDK. For development in all other versions, use the [`GetConversationPagedMembers`](/dotnet/api/microsoft.bot.connector.conversationsextensions.getconversationpagedmembersasync?view=botbuilder-dotnet-stable&preserve-view=true) method.

> [!NOTE]
>
> Upgrade to the latest version of the Microsoft Bot Framework SDK as follows:
>
> * Bot Framework SDK v3: Upgrade to version 3.30.2 or later.
> * Bot Framework SDK v4: Upgrade to version 4.8 or later.

* A new API is created [`TeamsInfo.GetMemberAsync`](/microsoftteams/platform/bots/how-to/get-teams-context?tabs=dotnet#get-single-member-details) for retrieving the profile information for a single user. It takes the ID of the team or chat and a [UPN](/windows/win32/ad/naming-properties#userprincipalname) that is `userPrincipalName`, Microsoft Azure Active Directory (Azure AD) Object ID `objectId`, or the Teams user ID `id` as parameters and returns the profile information for that user.

    > [!NOTE]
    > `objectId` is changed to `aadObjectId` to match what is called in the `Activity` object of a Bot Framework message. The new API is available with version 4.8 or later of the Bot Framework SDK. It is also available in the Teams SDK extension Bot Framework 3.x. Meanwhile, you can use the [REST](/microsoftteams/platform/bots/how-to/get-teams-context?tabs=json#get-single-member-details) endpoint.

* `TeamsInfo.GetMembersAsync` in C# and `TeamsInfo.getMembers` in TypeScript or Node.js is formally deprecated. Once the new API is available, you must update your bots to use it. This also applies to the [underlying REST API that these APIs use](/microsoftteams/platform/bots/how-to/get-teams-context?tabs=json#tabpanel_CeZOj-G++Q_json).
* By late 2022, bots can't proactively retrieve the `userPrincipalName` or `email` properties for members of a chat or team. Bots must use the Graph APIs to retrieve the required information. The new `GetConversationPagedMembers` API can't return the `userPrincipalName` and `email` properties from late 2022.

    > [!NOTE]
    > We recommend you to use the [Graph API](/graph/api/user-get?view=graph-rest-1.0&tabs=http&preserve-view=true#examples) with an access token to retrieve information.

## See also

* [Build bots for Teams](../bots/what-are-bots.md)
* [Overview for using Teams](/graph/teams-concept-overview)
* [API reference for the Bot Framework Connector service](/azure/bot-service/rest-api/bot-framework-rest-connector-api-reference)
