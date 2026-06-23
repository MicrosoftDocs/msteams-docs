---
title: Teams Specific Context for Bots
description: Learn how to get Teams-specific context in bots by using Teams SDK APIs for roster, member, team, and channel information.
ms.topic: article
ms.localizationpriority: high
zone_pivot_groups: teams-sdk-languages
ms.date: 06/19/2026
---
# Get Teams specific context for your bot

A bot can access additional context data about the team or chat where it's installed. This information can be used to personalize responses and build richer workflows.

## Fetch the roster or user profile

Your bot can query the list of members in the current team or chat and use that data to personalize responses or target follow-up actions.

Use the Teams SDK conversations members API to retrieve roster information.

For conversation member retrieval:

* Minimum page size: `50`
* Default page size: `200`
* Maximum page size: `500`

Don't use non-paginated member retrieval in teams and channels. For large rosters, non-paginated calls can be incomplete or throttled.

> [!NOTE]
>
> * Pagination is available in team and channel conversations.
> * Pagination isn't supported in chat conversations. In chats, the full roster is returned by the service.

The following sample code uses paged member retrieval:

::: zone pivot="teams-sdk-csharp"

* [Teams SDK API reference](https://microsoft.github.io/teams-sdk/csharp/essentials/api/)

```csharp
app.OnMessage(async (context, cancellationToken) =>
{
    var membersClient = context.Api.Conversations.Members;
    var allMembers = new List<TeamsChannelAccount>();
    string? continuationToken = null;

    do
    {
        var page = await membersClient.GetPagedAsync(
            context.Conversation.Id,
            pageSize: 50,
            continuationToken: continuationToken,
            cancellationToken: cancellationToken
        );

        allMembers.AddRange(page.Members.Where(m => m is not null).Select(m => m!));
        continuationToken = page.ContinuationToken;
    }
    while (!string.IsNullOrEmpty(continuationToken));
});
```

::: zone-end

::: zone pivot="teams-sdk-typescript"

* [Teams SDK API reference](https://microsoft.github.io/teams-sdk/typescript/essentials/api/)

```typescript
app.on("message", async ({ activity, api }) => {
  const membersClient = api.conversations.members(activity.conversation.id);
  const allMembers = [];
  let continuationToken = undefined;

  do {
    const page = await membersClient.getPaged({
      pageSize: 50,
      continuationToken,
    });

    allMembers.push(...page.members);
    continuationToken = page.continuationToken;
  } while (continuationToken);
});
```

::: zone-end

::: zone pivot="teams-sdk-python"

* [Teams SDK API reference](https://microsoft.github.io/teams-sdk/python/essentials/api/)

```python
@app.on_message
async def list_members(ctx: ActivityContext[MessageActivity]) -> None:
    members_client = ctx.api.conversations.members(ctx.activity.conversation.id)

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

After you fetch the roster, you can get details for a single member.

## Get single member details

You can retrieve details of a specific member using user identifiers from the activity context.

The following sample code uses Teams SDK APIs:

::: zone pivot="teams-sdk-csharp"

* [Teams SDK API reference](https://microsoft.github.io/teams-sdk/csharp/essentials/api/)

```csharp
app.OnMessage(async (context, cancellationToken) =>
{
    var memberId = context.Activity.From?.Id;
    if (string.IsNullOrEmpty(memberId))
    {
        return;
    }

    var member = await context.Api.Conversations.Members.GetByIdAsync(
        context.Conversation.Id,
        memberId,
        cancellationToken: cancellationToken
    );
});
```

::: zone-end

::: zone pivot="teams-sdk-typescript"

* [Teams SDK API reference](https://microsoft.github.io/teams-sdk/typescript/essentials/api/)

```typescript
app.on("message", async ({ activity, api }) => {
    const memberId = activity.from?.id;
    if (!memberId) {
        return;
    }

    const member = await api.conversations
        .member.getById(activity.conversation.id, memberId);
});
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

After you get details for a member, you can retrieve team details.

## Get team's details

When installed in a team, your bot can query metadata such as team ID and Microsoft Entra group ID.

The following sample code uses Teams SDK APIs:

::: zone pivot="teams-sdk-csharp"

* [Teams SDK API reference](https://microsoft.github.io/teams-sdk/csharp/essentials/api/)

```csharp
app.OnMessage(async (context, cancellationToken) =>
{
    var teamId = context.Activity.ChannelData?.Team?.Id;
    if (string.IsNullOrEmpty(teamId))
    {
        return;
    }

    var team = await context.Api.Teams.GetByIdAsync(
        teamId,
        cancellationToken: cancellationToken
    );
});
```

::: zone-end

::: zone pivot="teams-sdk-typescript"

* [Teams SDK API reference](https://microsoft.github.io/teams-sdk/typescript/essentials/api/)

```typescript
app.on("message", async ({ activity, api }) => {
    const teamId = activity.channelData?.team?.id;
    if (!teamId) {
        return;
    }

    const team = await api.teams.getById(teamId);
});
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

After you get team details, you can get the list of channels in that team.

## Get the list of channels in a team

Your bot can query the list of channels in a team.

> [!NOTE]
>
> * The name of the default General channel is returned as `null` to allow for localization.
> * The channel ID for the General channel always matches the team ID.

The following sample code is used to get the list of channels in a team:

::: zone pivot="teams-sdk-csharp"

* [Teams SDK API reference](https://microsoft.github.io/teams-sdk/csharp/essentials/api/)

```csharp
app.OnMessage(async (context, cancellationToken) =>
{
    var teamId = context.Activity.ChannelData?.Team?.Id;
    if (string.IsNullOrEmpty(teamId))
    {
        return;
    }

    var channels = await context.Api.Teams.GetConversationsAsync(
        teamId,
        cancellationToken: cancellationToken
    );
});
```

::: zone-end

::: zone pivot="teams-sdk-typescript"

* [Teams SDK API reference](https://microsoft.github.io/teams-sdk/typescript/essentials/api/)

```typescript
app.on("message", async ({ activity, api }) => {
  const teamId = activity.channelData?.team?.id;
  if (!teamId) {
    return;
  }

  const channels = await api.teams.getConversations(teamId);
});
```

::: zone-end

::: zone pivot="teams-sdk-python"

* [Teams SDK API reference](https://microsoft.github.io/teams-sdk/python/essentials/api/)

```python
@app.on_message
async def list_channels(ctx: ActivityContext[MessageActivity]) -> None:
    team_id = ctx.activity.channel_data.team.id
    channels = await ctx.api.teams.get_conversations(team_id)
```

::: zone-end

If you need raw connector REST endpoints, use the Teams SDK API for most bot scenarios and only use REST directly for advanced cases that aren't covered by SDK abstractions.

<!-- [!INCLUDE [sample](~/includes/bots/teams-bot-samples.md)] -->

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
