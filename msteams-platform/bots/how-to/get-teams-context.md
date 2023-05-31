---
title: Get Teams specific context for your bot
author: surbhigupta
description: Get Teams specific context for your bot, fetch user profile, get single member, team's, list of channels in a team details. Sample on create a new channel thread.
ms.topic: conceptual
ms.localizationpriority: high
ms.author: lajanuar
---
# Get Teams specific context for your bot

[!INCLUDE [pre-release-label](~/includes/v4-to-v3-pointer-bots.md)]

A bot can access additional context data about a team or chat where it's installed. This information can be used to enrich the bot's functionality and provide a more personalized experience.

## Fetch the roster or user profile

Your bot can query for the list of members and their basic user profiles, including Teams user IDs and Microsoft Azure Active Directory (Azure AD) information, such as name and objectId. You can use this information to correlate user identities. For example, to check whether a user logged into a tab through Azure AD credentials is a member of the team. For get conversation members, minimum or maximum page size depends on the implementation. Page size less than 50, are treated as 50, and greater than 500, are capped at 500. Even if you use the non-paged version, it's unreliable in large teams and must not be used. For more information, see [changes to Teams Bot APIs for fetching team or chat members](~/resources/team-chat-member-api-changes.md).

> [!NOTE]
>
> * Pagination is available in a team and a channel.
> * Pagination isn't supported in chats. For chats, the entire roster is always returned.

The following sample code uses the paged endpoint for fetching the roster:

# [C#](#tab/dotnet)

* [SDK reference](/dotnet/api/microsoft.bot.builder.teams.teamsinfo.getpagedmembersasync?view=botbuilder-dotnet-stable#microsoft-bot-builder-teams-teamsinfo-getpagedmembersasync(microsoft-bot-builder-iturncontext-system-nullable((system-int32))-system-string-system-threading-cancellationtoken)&preserve-view=true)

* [Sample code reference](https://github.com/OfficeDev/Microsoft-Teams-Samples/blob/main/samples/graph-proactive-installation/csharp/ProactiveAppInstallation/Bots/ProactiveBot.cs#L78)

```csharp
public class MyBot : TeamsActivityHandler
{
    protected override async Task OnMessageActivityAsync(ITurnContext<IMessageActivity> turnContext, CancellationToken cancellationToken)
    {
        var members = new List<TeamsChannelAccount>();
        string continuationToken = null;

        do
        {   
            // Gets a paginated list of members of one-on-one, group, or team conversation.
            var currentPage = await TeamsInfo.GetPagedMembersAsync(turnContext, 100, continuationToken, cancellationToken);
            continuationToken = currentPage.ContinuationToken;
            members.AddRange(currentPage.Members);
         }
         while (continuationToken != null);
     }
}
```

# [TypeScript](#tab/typescript)

* [SDK reference](/javascript/api/botbuilder/teamsinfo?view=botbuilder-ts-latest#botbuilder-teamsinfo-getpagedmembers&preserve-view=true)

* [Sample code reference](https://github.com/OfficeDev/Microsoft-Teams-Samples/blob/main/samples/graph-proactive-installation/nodejs/bots/proactiveBot.js#L38)

```typescript
export class MyBot extends TeamsActivityHandler {
    constructor() {
        super();

        // See https://learn.microsoft.com/en-us/azure/bot-service/bot-builder-basics?view=azure-bot-service-4.0 to learn more about the message and other activity types.
        this.onMessage(async (turnContext, next) => {
            var continuationToken;
            var members = [];

            do {
                // Gets a paginated list of members of one-on-one, group, or team conversation.
                var pagedMembers = await TeamsInfo.getPagedMembers(turnContext, 100, continuationToken);
                continuationToken = pagedMembers.continuationToken;
                members.push(...pagedMembers.members);
            }
            while(continuationToken !== undefined)

            // By calling next() you ensure that the next BotHandler is run.
            await next();
        });
    }
}
```

# [Python](#tab/python)

* [SDK reference](/python/api/botbuilder-core/botbuilder.core.teams.teamsinfo?view=botbuilder-py-latest#botbuilder-core-teams-teamsinfo-get-team-members&preserve-view=true)

```python
async def _show_members(
    self, turn_context: TurnContext
):
    # Get a conversationMember from a team.
    members = await TeamsInfo.get_team_members(turn_context)
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

After you fetch the roster or user profile, you can get details of a single member. Currently, to retrieve information for one or more members of a chat or team, use the Microsoft Teams bot APIs `TeamsInfo.GetMembersAsync` for C# or `TeamsInfo.getMembers` for TypeScript APIs.

## Get single member details

You can also retrieve the details of a particular user using their Teams user ID, UPN, or Azure AD Object ID.

The following sample code is used to get single member details:

# [C#](#tab/dotnet)

* [SDK reference](/dotnet/api/microsoft.bot.builder.teams.teamsinfo.getmemberasync?view=botbuilder-dotnet-stable#microsoft-bot-builder-teams-teamsinfo-getmemberasync(microsoft-bot-builder-iturncontext-system-string-system-threading-cancellationtoken)&preserve-view=true)

* [Sample code reference](https://github.com/OfficeDev/Microsoft-Teams-Samples/blob/main/samples/bot-sequential-flow-adaptive-cards/csharp/SequentialUserSpecificFlow/Bots/UserSpecificBot.cs#L37)

```csharp
public class MyBot : TeamsActivityHandler
{
    protected override async Task OnMessageActivityAsync(ITurnContext<IMessageActivity> turnContext, CancellationToken cancellationToken)
    {   
        // Gets the account of a single conversation member.
        // This works in one-on-one, group, and team scoped conversations.
        var member = await TeamsInfo.GetMemberAsync(turnContext, turnContext.Activity.From.Id, cancellationToken);
    }
}
```

# [TypeScript](#tab/typescript)

* [SDK reference](/javascript/api/botbuilder/teamsinfo?view=botbuilder-ts-latest#botbuilder-teamsinfo-getmember&preserve-view=true)

* [Sample code reference](https://github.com/OfficeDev/Microsoft-Teams-Samples/blob/main/samples/bot-conversation/nodejs/bots/teamsConversationBot.js#L186)

```typescript
export class MyBot extends TeamsActivityHandler {
    constructor() {
        super();

        // See learn.microsoft.com/en-us/azure/bot-service/bot-builder-basics?view=azure-bot-service-4.0 to learn more about the message and other activity types.
        this.onMessage(async (turnContext, next) => {
            const member = await TeamsInfo.getMember(turnContext, encodeURI('someone@somecompany.com'));

            // By calling next() you ensure that the next BotHandler is run.
            await next();
        });
    }
}
```

# [Python](#tab/python)

* [SDK reference](/python/api/botbuilder-core/botbuilder.core.teams.teamsinfo?view=botbuilder-py-latest#botbuilder-core-teams-teamsinfo-get-member&preserve-view=true)

* [Sample code reference](https://github.com/OfficeDev/Microsoft-Teams-Samples/blob/main/samples/bot-conversation/python/bots/teams_conversation_bot.py#L67)

```python
async def _show_members(
    self, turn_context: TurnContext
):
    # TeamsInfo.get_member: Gets the member of a team scoped conversation.
    member = await TeamsInfo.get_member(turn_context, turn_context.activity.from_property.id)
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

After you get details of a single member, you can get details of the team. Currently, to retrieve information for a team, use the Teams bot APIs `TeamsInfo.GetMemberDetailsAsync` for C# or `TeamsInfo.getTeamDetails` for TypeScript.

## Get team's details

When installed in a team, your bot can query for metadata about that team including the Azure AD group ID.

The following sample code is used to get team's details:

# [C#](#tab/dotnet)

* [SDK reference](/dotnet/api/microsoft.bot.builder.teams.teamsinfo.getteamdetailsasync?view=botbuilder-dotnet-stable#microsoft-bot-builder-teams-teamsinfo-getteamdetailsasync(microsoft-bot-builder-iturncontext-system-string-system-threading-cancellationtoken)&preserve-view=true)

* [Sample code reference](https://github.com/OfficeDev/Microsoft-Teams-Samples/blob/main/samples/msteams-application-qbot/Source/Microsoft.Teams.Apps.QBot.Web/Bot/QBotTeamInfo.cs#L44)

```csharp
public class MyBot : TeamsActivityHandler
{
    protected override async Task OnMessageActivityAsync(ITurnContext<IMessageActivity> turnContext, CancellationToken cancellationToken)
    {
        // Gets the details for the given team id. This only works in team scoped conversations.
        // TeamsGetTeamInfo: Gets the TeamsInfo object from the current activity.
        TeamDetails teamDetails = await TeamsInfo.GetTeamDetailsAsync(turnContext, turnContext.Activity.TeamsGetTeamInfo().Id, cancellationToken);
        if (teamDetails != null) {
            await turnContext.SendActivityAsync($"The groupId is: {teamDetails.AadGroupId}");
        }
        else {
            // Sends a message activity to the sender of the incoming activity.
            await turnContext.SendActivityAsync($"Message did not come from a channel in a team.");
        }
    }
}
```

# [TypeScript](#tab/typescript)

* [SDK reference](/javascript/api/botbuilder/teamsinfo?view=botbuilder-ts-latest#botbuilder-teamsinfo-getteamdetails&preserve-view=true)

* [Sample code reference](https://github.com/OfficeDev/Microsoft-Teams-Samples/blob/main/samples/app-complete-sample/nodejs/server/dialogs/teams/fetchTeamInfoDialog.js#L21)

```typescript
export class MyBot extends TeamsActivityHandler {
    constructor() {
        super();

        // See https://learn.microsoft.com/en-us/azure/bot-service/bot-builder-basics?view=azure-bot-service-4.0 to learn more about the message and other activity types.
        this.onMessage(async (turnContext, next) => {

            // Gets the details for the given team id.
            const teamDetails = await TeamsInfo.getTeamDetails(turnContext);
            if (teamDetails) {

                // Sends a message activity to the sender of the incoming activity.
                await turnContext.sendActivity(`The group ID is: ${teamDetails.aadGroupId}`);
            } else {
                await turnContext.sendActivity('This message did not come from a channel in a team.');
            }

            // By calling next() you ensure that the next BotHandler is run.
            await next();
        });
    }
}
```

# [Python](#tab/python)

[SDK reference](/python/api/botbuilder-core/botbuilder.core.teams.teamsinfo?view=botbuilder-py-latest#botbuilder-core-teams-teamsinfo-get-team-details&preserve-view=true)

```python
async def _show_details(self, turn_context: TurnContext):

    # Gets the details for the given team id.
    team_details = await TeamsInfo.get_team_details(turn_context)

    # MessageFactory.text(): Specifies the type of text data in a message attachment.
    reply = MessageFactory.text(f"The team name is {team_details.name}. The team ID is {team_details.id}. The AADGroupID is {team_details.aad_group_id}.")

    # Sends a message activity to the sender of the incoming activity.
    await turn_context.send_activity(reply)
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

After you get details of the team, you can get the list of channels in a team. Currently, to retrieve information for a list of channels in a team, use the Teams bot APIs `TeamsInfo.GetTeamChannelsAsync` for C# or `TeamsInfo.getTeamChannels` for TypeScript APIs.

## Get the list of channels in a team

Your bot can query the list of channels in a team.

> [!NOTE]
>
> * The name of the default General channel is returned as `null` to allow for localization.
> * The channel ID for the General channel always matches the team ID.

The following sample code is used to get the list of channels in a team:

# [C#](#tab/dotnet)

* [SDK reference](/dotnet/api/microsoft.bot.builder.teams.teamsinfo.getteamchannelsasync?view=botbuilder-dotnet-stable#microsoft-bot-builder-teams-teamsinfo-getteamchannelsasync(microsoft-bot-builder-iturncontext-system-string-system-threading-cancellationtoken)&preserve-view=true)

* [Sample code reference](https://github.com/OfficeDev/Microsoft-Teams-Samples/blob/main/samples/msteams-application-qbot/Source/Microsoft.Teams.Apps.QBot.Web/Bot/QBotTeamInfo.cs#L57)

```csharp
public class MyBot : TeamsActivityHandler
{
    // Override this in a derived class to provide logic specific to Message activities.
    protected override async Task OnMessageActivityAsync(ITurnContext<IMessageActivity> turnContext, CancellationToken cancellationToken)
    {
        // Returns a list of channels in a Team. This only works in team scoped conversations.
        IEnumerable<ChannelInfo> channels = await TeamsInfo.GetTeamChannelsAsync(turnContext, turnContext.Activity.TeamsGetTeamInfo().Id, cancellationToken);

        // Sends a message activity to the sender of the incoming activity.
        await turnContext.SendActivityAsync($"The channel count is: {channels.Count()}");
    }
}
```

# [TypeScript](#tab/typescript)

[SDK reference](/javascript/api/botbuilder/teamsinfo?view=botbuilder-ts-latest#botbuilder-teamsinfo-getteamchannels&preserve-view=true)

```typescript
export class MyBot extends TeamsActivityHandler {
    constructor() {
        super();

        // See https://learn.microsoft.com/en-us/azure/bot-service/bot-builder-basics?view=azure-bot-service-4.0 to learn more about the message and other activity types.
        this.onMessage(async (turnContext, next) => {

            // Supports retrieving channels hosted by a team.
            const channels = await TeamsInfo.getTeamChannels(turnContext);

            // Sends a message activity to the sender of the incoming activity.
            await turnContext.sendActivity(`The channel count is: ${channels.length}`);

            // By calling next() you ensure that the next BotHandler is run.
            await next();
        });
    }
}
```

# [Python](#tab/python)

[SDK reference](/python/api/botbuilder-core/botbuilder.core.teams.teamsinfo?view=botbuilder-py-latest#botbuilder-core-teams-teamsinfo-get-team-channels&preserve-view=true)

```python
async def _show_channels(
    self, turn_context: TurnContext
):
    # Supports retrieving channels hosted by a team.
    channels = await TeamsInfo.get_team_channels(turn_context)
    reply = MessageFactory.text(f"Total of {len(channels)} channels are currently in team")
    await turn_context.send_activity(reply)
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
* [Dialog](../../task-modules-and-cards/what-are-task-modules.md)
* [Authenticate users in Microsoft Teams](../../concepts/authentication/authentication.md)
* [Bot activity handlers](../bot-basics.md)
* [Localize your app](../../concepts/build-and-test/apps-localization.md)
* [Get the profile photo of a user, a group, a team, or an Outlook contact](/graph/api/profilephoto-get)
