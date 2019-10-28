---
title: Get Team's specific context for your bot
author: clearab
description: How to get Microsoft Team's specific context for your bot, including the conversation roster, details, and channel list.
ms.topic: overview
ms.author: anclear
---
# Get Team's specific context for your bot

[!INCLUDE [pre-release-label](~/includes/v4-to-v3-pointer-bots.md)]

A bot can access additional context data about the team or chat. This information can be used to enrich the bot's functionality and to provide a more personalized experience.

## Fetching the roster or user profile

Your bot can query for the list of members and their basic profiles, which includes Teams user IDs and Azure Active Directory (Azure AD) information such as name and objectId. You can use this information to correlate user identities; for example, to check whether a user logged into a tab through Azure AD credentials is a member of the team. You can also use this call in a one-to-one chat to gain additional information about your user.

# [C#/.NET](#tab/dotnet)

```csharp
protected override async Task OnMessageActivityAsync(ITurnContext<IMessageActivity> turnContext, CancellationToken cancellationToken)
{
    IEnumerable<TeamsChannelAccount> members = await TeamsInfo.GetMembersAsync(turnContext, cancellationToken);
}
```

# [TypeScript/Node.js](#tab/typescript)

```typescript
asdf
```

# [JSON](#tab/json)

You can directly issue a GET request on /v3/teams/{teamId}, using the value of `serviceUrl` as the endpoint. The value of `serviceUrl` tends to be stable but can change. When a new message arrives, your bot should verify its stored value of `serviceUrl`.

```http
GET /v3/teams/19:ja0cu120i1jod12j@skype.net

Response body
{
    "id": "29:1GcS4EyB_oSI8A88XmWBN7NJFyMqe3QGnJdgLfFGkJnVelzRGos0bPbpsfJjcbAD22bmKc4GMbrY2g4JDrrA8vM06X1-cHHle4zOE6U4ttcc",
    "name": "The Team Name",
    "aadGroupId": "02ce3874-dd86-41ba-bddc-013f34019978"
}
```

* * *

## Get team's details

When installed in a team, your bot can query for metadata about that team which includes the AAD groupId.

# [C#/.NET](#tab/dotnet)

```csharp
protected override async Task OnMessageActivityAsync(ITurnContext<IMessageActivity> turnContext, CancellationToken cancellationToken)
{
    TeamDetails teamDetails = await TeamsInfo.GetTeamDetailsAsync(turnContext, turnContext.Activity.TeamsGetTeamInfo().Id, cancellationToken);
    if (teamDetails != null) {
        await turnContext.SendActivityAsync($"The groupId is: {teamDetails.AadGroupId}");
    }
    else {
        await turnContext.SendActivityAsync($"Message did not come from a channel in a team.");
    }
}
```

# [TypeScript/Node.js](#tab/typescript)

```typescript
asdf
```

# [JSON](#tab/json)

You can directly issue a GET request on /v3/conversations/{teamId}/members/, using the value of `serviceUrl` as the endpoint. The value of `serviceUrl` tends to be stable but can change. When a new message arrives, your bot should verify its stored value of `serviceUrl`.

```http
GET /v3/conversations/19:ja0cu120i1jod12j@skype.net/members

Response body
[{
    "id": "29:1GcS4EyB_oSI8A88XmWBN7NJFyMqe3QGnJdgLfFGkJnVelzRGos0bPbpsfJjcbAD22bmKc4GMbrY2g4JDrrA8vM06X1-cHHle4zOE6U4ttcc",
    "objectId": "9d3e08f9-a7ae-43aa-a4d3-de3f319a8a9c",
    "givenName": "Larry",
    "surname": "Brown",
    "email": "Larry.Brown@fabrikam.com",
    "userPrincipalName": "labrown@fabrikam.com"
}, {
    "id": "29:1bSnHZ7Js2STWrgk6ScEErLk1Lp2zQuD5H2qQ960rtvstKp8tKLl-3r8b6DoW0QxZimuTxk_kupZ1DBMpvIQQUAZL-PNj0EORDvRZXy8kvWk",
    "objectId": "76b0b09f-d410-48fd-993e-84da521a597b",
    "givenName": "John",
    "surname": "Patterson",
    "email": "johnp@fabrikam.com",
    "userPrincipalName": "johnp@fabrikam.com"
}, {
    "id": "29:1URzNQM1x1PNMr1D7L5_lFe6qF6gEfAbkdG8_BUxOW2mTKryQqEZtBTqDt10-MghkzjYDuUj4KG6nvg5lFAyjOLiGJ4jzhb99WrnI7XKriCs",
    "objectId": "6b7b3b2a-2c4b-4175-8582-41c9e685c1b5",
    "givenName": "Rick",
    "surname": "Stevens",
    "email": "Rick.Stevens@fabrikam.com",
    "userPrincipalName": "rstevens@fabrikam.com"
}]
```

* * *

## Get the list of channels in a team

Your bot can query the list of channels in a team.

> [!Note]
>
>* The name of the default General channel is returned as `null` to allow for localization.
>* The channel ID for the General channel always matches the team ID.

# [C#/.NET](#tab/dotnet)

```csharp
protected override async Task OnMessageActivityAsync(ITurnContext<IMessageActivity> turnContext, CancellationToken cancellationToken)
{
    IEnumerable<ChannelInfo> channels = await TeamsInfo.GetTeamChannelsAsync(turnContext, turnContext.Activity.TeamsGetTeamInfo().Id, cancellationToken);
}
```

# [TypeScript/Node.js](#tab/typescript)

```typescript
asdf
```

# [JSON](#tab/json)

You can directly issue a GET request on /v3/teams/{teamId}/conversations, using the value of `serviceUrl` as the endpoint. The value of `serviceUrl` tends to be stable but can change. When a new message arrives, your bot should verify its stored value of `serviceUrl`.

```http
GET /v3/teams/19%3A033451497ea84fcc83d17ed7fb08a1b6%40thread.skype/conversations

Response body
{
    "conversations": [{
        "id": "19:033451497ea84fcc83d17ed7fb08a1b6@thread.skype",
        "name": null
    }, {
        "id": "19:cc25e4aae50746ecbb11473bba24c70a@thread.skype",
        "name": "Materials"
    }, {
        "id": "19:b7b84cba410c406ba671dbbf5e0a3519@thread.skype",
        "name": "Design"
    }, {
        "id": "19:fc5db2aed489454e8f8c06829ed6c986@thread.skype",
        "name": "Marketing"
    }]
}
```

* * *

[!INCLUDE [sample](~/includes/bots/teams-conversation-bot-sample.md)]
