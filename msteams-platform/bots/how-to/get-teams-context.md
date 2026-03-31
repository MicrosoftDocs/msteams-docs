---
title: Teams Specific Context for Bot
description: Get Teams specific context for your bot, fetch user profile, get single member, team's, list of channels in a team details. Sample on create a new channel thread.
ms.topic: conceptual
ms.localizationpriority: high
ms.owner: angovil
ms.date: 03/31/2026
---
# Get Teams specific context for your bot

A bot can access additional context data about a team or chat where it's installed. This information can be used to enrich the bot's functionality and provide a more personalized experience.

## Fetch the roster or user profile

Your bot can query for the list of members and their basic user profiles, including Teams user IDs and Microsoft Entra information, such as name and objectId. You can use this information to correlate user identities. For example, to check whether a user logged into a tab through Microsoft Entra credentials is a member of the team.

The following sample code is used for fetching the roster:

# [C#](#tab/dotnet)

```csharp
app.OnMessage(async context =>
{
    var conversationId = context.Activity.Conversation.Id;

    // Gets all members of the conversation.
    var members = await context.Api.Conversations.Members.GetAsync(conversationId);
});
```

# [TypeScript](#tab/typescript)

```typescript
app.on('message', async ({ activity, api }) => {
    const conversationId = activity.conversation.id;

    // Gets all members of the conversation.
    const members = await api.conversations.members(conversationId).get();
});
```

# [Python](#tab/python)

```python
@app.on_message
async def handle_message(ctx: ActivityContext[MessageActivity]):
    conversation_id = ctx.activity.conversation.id

    # Gets all members of the conversation.
    members = await ctx.api.conversations.members(conversation_id).get_all()
```

# [JSON](#tab/json)

You can directly issue a GET request on `/v3/conversations/{conversationId}/pagedmembers?pageSize={pageSize}&continuationToken={continuationToken}`, using the value of `serviceUrl` as the endpoint. The value of `serviceUrl` is stable but can change. When a new message arrives, your bot must verify its stored value for `serviceUrl`. The response payload also indicates if the user is a regular or anonymous user.

```http
GET /v3/conversations/19:meeting_N2QzYTA3YmItYmMwOC00OTJmLThkYzMtZWMzZGU0NGIyZGI0@thread.v2/pagedmembers?pageSize=100&continuationToken=asdfasdfalkdsjfalksjdf

Response body
{
   "continuationToken":"asdfqwerueiqpiewr",
   "members":[
      {
         "id":"29:1GcS4EyB_oSI8A88XmWBN7NJFyMqe3QGnJdgLfFGkJnVelzRGos0bPbpsfJjcbAD22bmKc4GMbrY2g4JDrrA8vM06X1-cHHle4zOE6U4ttcc",
         "name":"Anon1 (Guest)",
         "tenantId":"29:1UX7p8Fkx7p93MZlBFS71swTB9juQOCfnXf2L3wxOUITCcIGpFcRX-JiFjLDVZhxGpEfzSTGNsZeEyTKr1iu3Vw",
         "userRole":"anonymous"
      },
      {
         "id":"29:1bSnHZ7Js2STWrgk6ScEErLk1Lp2zQuD5H2qQ960rtvstKp8tKLl-3r8b6DoW0QxZimuTxk_kupZ1DBMpvIQQUAZL-PNj0EORDvRZXy8kvWk",
         "objectId":"76b0b09f-d410-48fd-993e-84da521a597b",
         "givenName":"John",
         "surname":"Patterson",
         "email":"johnp@fabrikam.com",
         "userPrincipalName":"johnp@fabrikam.com",
         "tenantId":"29:1UX7p8Fkx7p93MZlBFS71swTB9juQOCfnXf2L3wxOUITCcIGpFcRX-JiFjLDVZhxGpEfzSTGNsZeEyTKr1iu3Vw",
         "userRole":"user"
      },
      {
         "id":"29:1URzNQM1x1PNMr1D7L5_lFe6qF6gEfAbkdG8_BUxOW2mTKryQqEZtBTqDt10-MghkzjYDuUj4KG6nvg5lFAyjOLiGJ4jzhb99WrnI7XKriCs",
         "objectId":"6b7b3b2a-2c4b-4175-8582-41c9e685c1b5",
         "givenName":"Rick",
         "surname":"Stevens",
         "email":"Rick.Stevens@fabrikam.com",
         "userPrincipalName":"rstevens@fabrikam.com",
         "tenantId":"29:1UX7p8Fkx7p93MZlBFS71swTB9juQOCfnXf2L3wxOUITCcIGpFcRX-JiFjLDVZhxGpEfzSTGNsZeEyTKr1iu3Vw",
         "userRole":"user"
      }
   ]
}
```

* * *

After you fetch the roster or user profile, you can get details of a single member. To retrieve information for one or more specific members of a chat or team, use the Microsoft Teams bot APIs `context.Api.Conversations.Members.GetByIdAsync(conversationId, memberId)` for C# or `api.conversations.members(conversationId).getById(memberId)` for TypeScript APIs.

## Get single member details

You can also retrieve the details of a particular user using their Teams user ID, UPN, or Microsoft Entra Object ID.

The following sample code is used to get single member details:

# [C#](#tab/dotnet)

```csharp
app.OnMessage(async context =>
{
    var conversationId = context.Activity.Conversation.Id;
    var memberId = context.Activity.From.Id;

    // Gets a single member by ID.
    var member = await context.Api.Conversations.Members.GetByIdAsync(conversationId, memberId);
});
```

# [TypeScript](#tab/typescript)

```typescript
app.on('message', async ({ activity, api }) => {
    const conversationId = activity.conversation.id;
    const memberId = activity.from.id;

    // Gets a single member by ID.
    const member = await api.conversations.members(conversationId).getById(memberId);
});
```

# [Python](#tab/python)

```python
@app.on_message
async def handle_message(ctx: ActivityContext[MessageActivity]):
    conversation_id = ctx.activity.conversation.id
    member_id = ctx.activity.from_.id

    # Gets a single member by ID.
    member = await ctx.api.conversations.members(conversation_id).get(member_id)
```

# [JSON](#tab/json)

You can directly issue a GET request on `/v3/conversations/{conversationId}/members/{userId}`, using the value of `serviceUrl` as the endpoint. The value of `serviceUrl` is stable but can change. When a new message arrives, your bot must verify its stored value for `serviceUrl`. This can be used for regular users and anonymous users.

The following is the response sample for regular user:

```http
GET /v3/conversations/19:ja0cu120i1jod12j@skype.net/members/29:1GcS4EyB_oSI8A88XmWBN7NJFyMqe3QGnJdgLfFGkJnVelzRGos0bPbpsfJjcbAD22bmKc4GMbrY2g4JDrrA8vM06X1-cHHle4zOE6U4ttcc

Response body
{
    "id": "29:1GcS4EyB_oSI8A88XmWBN7NJFyMqe3QGnJdgLfFGkJnVelzRGos0bPbpsfJjcbAD22bmKc4GMbrY2g4JDrrA8vM06X1-cHHle4zOE6U4ttcc",
    "objectId": "9d3e08f9-a7ae-43aa-a4d3-de3f319a8a9c",
    "givenName": "Larry",
    "surname": "Brown",
    "email": "Larry.Brown@fabrikam.com",
    "userPrincipalName": "labrown@fabrikam.com",
    "tenantId":"72f988bf-86f1-41af-91ab-2d7cd011db47", 
    "userRole":"user"
}
```

The following is the response sample for anonymous user:

```http
GET /v3/conversations/19:ja0cu120i1jod12j@skype.net/members/<anonymous user id>"

Response body
{
    "id": "29:1GcS4EyB_oSI8A88XmWBN7NJFyMqe3QGnJdgLfFGkJnVelzRGos0bPbpsfJjcbAD22bmKc4GMbrY2g4JDrrA8vM06X1-cHHle4zOE6U4ttcc",
    "name": "Anon1 (Guest)",
    "tenantId":"72f988bf-86f1-41af-91ab-2d7cd011db47", 
    "userRole":"anonymous"
}
```

* * *

After you get details of a single member, you can get details of the team. To retrieve information for a team, use the Teams bot APIs `context.Api.Teams.GetByIdAsync(teamId)` for C# or `api.teams.getById(teamId)` for TypeScript.

## Get team's details

When installed in a team, your bot can query for metadata about that team including the Microsoft Entra group ID.

The following sample code is used to get team's details:

# [C#](#tab/dotnet)

```csharp
app.OnMessage(async context =>
{
    var teamId = context.Activity.ChannelData?.Team?.Id;

    if (teamId != null)
    {
        // Gets team details by ID.
        var teamDetails = await context.Api.Teams.GetByIdAsync(teamId);
        await context.Send($"The groupId is: {teamDetails.AadGroupId}");
    }
    else
    {
        await context.Send("Message did not come from a channel in a team.");
    }
});
```

# [TypeScript](#tab/typescript)

```typescript
app.on('message', async ({ activity, api, send }) => {
    const teamId = activity.channelData?.team?.id;

    if (teamId) {
        // Gets team details by ID.
        const teamDetails = await api.teams.getById(teamId);
        await send(`The group ID is: ${teamDetails.aadGroupId}`);
    } else {
        await send('This message did not come from a channel in a team.');
    }
});
```

# [Python](#tab/python)

```python
@app.on_message
async def handle_message(ctx: ActivityContext[MessageActivity]):
    team_id = ctx.activity.channel_data.get("team", {}).get("id") if ctx.activity.channel_data else None

    if team_id:
        # Gets team details by ID.
        team_details = await ctx.api.teams.get_by_id(team_id)
        await ctx.send(f"The team name is {team_details.name}. The AADGroupID is {team_details.aad_group_id}.")
    else:
        await ctx.send("Message did not come from a channel in a team.")
```

# [JSON](#tab/json)

You can directly issue a GET request on `/v3/teams/{teamId}`, using the value of `serviceUrl` as the endpoint. The value of `serviceUrl` is stable but can change. When a new message arrives, your bot must verify its stored value for `serviceUrl`.

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

After you get details of the team, you can get the list of channels in a team. To retrieve information for a list of channels in a team, use the Teams bot APIs `context.Api.Teams.GetConversationsAsync(teamId)` for C# or `api.teams.getConversations(teamId)` for TypeScript APIs.

## Get the list of channels in a team

Your bot can query the list of channels in a team.

> [!NOTE]
>
> * The name of the default General channel is returned as `null` to allow for localization.
> * The channel ID for the General channel always matches the team ID.

The following sample code is used to get the list of channels in a team:

# [C#](#tab/dotnet)

```csharp
app.OnMessage(async context =>
{
    var teamId = context.Activity.ChannelData?.Team?.Id;

    if (teamId != null)
    {
        // Gets channels (conversations) for the team.
        var channels = await context.Api.Teams.GetConversationsAsync(teamId);
        await context.Send($"The channel count is: {channels.Count}");
    }
});
```

# [TypeScript](#tab/typescript)

```typescript
app.on('message', async ({ activity, api, send }) => {
    const teamId = activity.channelData?.team?.id;

    if (teamId) {
        // Gets channels (conversations) for the team.
        const channels = await api.teams.getConversations(teamId);
        await send(`The channel count is: ${channels.length}`);
    }
});
```

# [Python](#tab/python)

```python
@app.on_message
async def handle_message(ctx: ActivityContext[MessageActivity]):
    team_id = ctx.activity.channel_data.get("team", {}).get("id") if ctx.activity.channel_data else None

    if team_id:
        # Gets channels (conversations) for the team.
        channels = await ctx.api.teams.get_conversations(team_id)
        await ctx.send(f"Total of {len(channels)} channels are currently in team")
```

# [JSON](#tab/json)

You can directly issue a GET request on `/v3/teams/{teamId}/conversations`, using the value of `serviceUrl` as the endpoint. The value of `serviceUrl` is stable but can change. When a new message arrives, your bot must verify its stored value for `serviceUrl`.

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

[!INCLUDE [sample](~/includes/bots/teams-bot-samples.md)]

## Next step

> [!div class="nextstepaction"]
> [Send and receive files using bot](bots-filesv4.md)

## See also

* [Build bots for Teams](../what-are-bots.md)
* [Dialogs](../../task-modules-and-cards/what-are-task-modules.md)
* [Authenticate users in Microsoft Teams](../../concepts/authentication/authentication.md)
* [Bot activity handlers](../bot-basics.md)
* [Localize your app](../../concepts/build-and-test/apps-localization.md)
* [Get the profile photo of a user, a group, a team, or an Outlook contact](/graph/api/profilephoto-get)
