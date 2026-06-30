---
title: Teams Specific Context for Bots
description: Learn how to get Teams-specific context in bots by using Teams SDK APIs for roster, member, team, and channel information.
ms.topic: article
ms.localizationpriority: high
ms.owner: angovil
ms.date: 06/29/2026
---

# Get Teams specific context for your bot

A bot can access additional context data about a team or chat where it's installed. This information can be used to enrich the bot's functionality and provide a more personalized experience.

## Fetch the roster or user profile

Your bot can query the paged list of members and their basic user profiles, including Teams user IDs and Microsoft Entra information, such as name and objectId. You can use this information to correlate user identities. For example, to check whether a user logged into a tab through Microsoft Entra credentials is a member of the team. Use the paged members API for all supported languages. The unpaginated members APIs are deprecated and should not be used.

The following sample code uses paged member retrieval:

:::

* [API changes](https://microsoft.github.io/teams-sdk/csharp/essentials/api/)

```csharp
app.OnMessage(async context =>
{
    var members = await TeamsInfo.GetPagedMembersAsync(context);
});
```

::: zone-end

:::

* [API changes](https://microsoft.github.io/teams-sdk/typescript/essentials/api/)

```typescript
app.on('message', async ({ activity, api }) => {
    const membersClient = api.conversations.members(activity.conversation.id);
    const page = await membersClient.getPaged({
        pageSize: 50,
    });
});
```

::: zone-end

:::

* [API changes](https://microsoft.github.io/teams-sdk/python/essentials/api/)

```python
@app.on_message
async def handle_message(ctx: ActivityContext[MessageActivity]):
    members = await TeamsInfo.get_paged_members(ctx)


    all_members = []
    continuation_token: str | None = None

    while True:
        result = await members_client.get_paged(
            page_size=50,
            continuation_token=continuation_token,
        )
        all_members.extend(result.members)

        if not result.continuation_token:
            break

        continuation_token = result.continuation_token
```

::: zone-end

After you fetch the roster or user profile, you can get details of a single member. To retrieve information for one or more specific members of a chat or team, use the Microsoft Teams bot APIs `context.Api.Conversations.Members.GetByIdAsync(conversationId, memberId)` for C# or `api.conversations.members(conversationId).getById(memberId)` for TypeScript APIs.

## Get single member details

You can retrieve details of a specific member using user identifiers from the activity context.

The following sample code uses Teams SDK APIs:

:::

* [SDK reference](/microsoftteams/platform/teams-sdk/essentials/api?pivots=csharp)

```csharp
app.OnMessage(async context =>
{
    var conversationId = context.Activity.Conversation.Id;
    var memberId = context.Activity.From.Id;

    // Gets a single member by ID.
    var member = await context.Api.Conversations.Members.GetByIdAsync(conversationId, memberId);
});
```

::: zone-end

* [SDK reference](/microsoftteams/platform/teams-sdk/essentials/api?pivots=typescript)

```typescript
app.on('message', async ({ activity, api }) => {
    const conversationId = activity.conversation.id;
    const memberId = activity.from.id;

    // Gets a single member by ID.
    const member = await api.conversations.members(conversationId).getById(memberId);
});
```

:::

# [Python](#tab/python)

* [SDK reference](/microsoftteams/platform/teams-sdk/essentials/api?pivots=python)

```python
@app.on_message
async def handle_message(ctx: ActivityContext[MessageActivity]):
    conversation_id = ctx.activity.conversation.id
    member_id = ctx.activity.from_.id

    # Gets a single member by ID.
    member = await ctx.api.conversations.members.get_by_id(conversation_id, member_id)
```

::: zone-end

::: zone pivot="teams-sdk-python"

* [Teams SDK API reference](https://microsoft.github.io/teams-sdk/python/essentials/api/)

```python
@app.on_message
async def get_member(ctx: ActivityContext[MessageActivity]) -> None:
    member_id = ctx.activity.from_.id
    member = await ctx.api.conversations.member.get_by_id(ctx.activity.conversation.id, member_id)
```

::: zone-end

After you get details of a single member, you can get details of the team. To retrieve information for a team, use the Teams bot APIs `context.Api.Teams.GetByIdAsync(teamId)` for C# or `api.teams.getById(teamId)` for TypeScript.

## Get team's details

When installed in a team, your bot can query metadata such as team ID and Microsoft Entra group ID.

The following sample code uses Teams SDK APIs:

::: zone pivot="teams-sdk-csharp"

* [SDK reference](/microsoftteams/platform/teams-sdk/essentials/api?pivots=csharp)

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

::: zone-end

* [SDK reference](/microsoftteams/platform/teams-sdk/essentials/api?pivots=typescript)

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

* [SDK reference](/microsoftteams/platform/teams-sdk/essentials/api?pivots=python)

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

::: zone-end

::: zone pivot="teams-sdk-python"

* [Teams SDK API reference](https://microsoft.github.io/teams-sdk/python/essentials/api/)

```python
@app.on_message
async def get_team_details(ctx: ActivityContext[MessageActivity]) -> None:
    team_id = ctx.activity.channel_data.team.id
    team = await ctx.api.teams.get_by_id(team_id)
```

::: zone-end

After you get details of the team, you can get the list of channels in a team. To retrieve information for a list of channels in a team, use the Teams bot APIs `context.Api.Teams.GetConversationsAsync(teamId)` for C# or `api.teams.getConversations(teamId)` for TypeScript APIs.

## Get the list of channels in a team

Your bot can query the list of channels in a team.

> [!NOTE]
>
> * The name of the default General channel is returned as `null` to allow for localization.
> * The channel ID for the General channel always matches the team ID.

The following sample code is used to get the list of channels in a team:

# [C#](#tab/dotnet)

* [SDK reference](/microsoftteams/platform/teams-sdk/essentials/api?pivots=csharp)

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

* [SDK reference](/microsoftteams/platform/teams-sdk/essentials/api?pivots=typescript)

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

::: zone-end

::: zone pivot="teams-sdk-python"

* [SDK reference](/microsoftteams/platform/teams-sdk/essentials/api?pivots=python)

```python
@app.on_message
async def handle_message(ctx: ActivityContext[MessageActivity]):
    team_id = ctx.activity.channel_data.get("team", {}).get("id") if ctx.activity.channel_data else None

    if team_id:
        # Gets channels (conversations) for the team.
        channels = await ctx.api.teams.get_conversations(team_id)
        await ctx.send(f"Total of {len(channels)} channels are currently in team")
```

::: zone-end

If you need raw connector REST endpoints, use the Teams SDK API for most bot scenarios and only use REST directly for advanced cases that aren't covered by SDK abstractions.

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
* [Bot Meetings sample](https://github.com/OfficeDev/Microsoft-Teams-Samples/tree/main/samples/TeamsSDK/bot-meetings)
<!-- markdownlint-enable MD024 -->
