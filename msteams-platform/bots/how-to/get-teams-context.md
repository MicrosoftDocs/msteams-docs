---
title: Teams specific context for bots
description: Learn how to get Teams-specific context in bots by using Teams SDK APIs for roster, member, team, and channel information.
ms.topic: article
ms.localizationpriority: high
ms.owner: angovil
ms.date: 06/19/2026
---
<!-- markdownlint-disable MD024 -->
# Get Teams specific context for your bot

[!INCLUDE [pre-release-label](~/includes/v4-to-v3-pointer-bots.md)]

A bot can access additional context data about the team or chat where it's installed. This information can be used to personalize responses and build richer workflows.

## Fetch the roster or user profile

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

# [C#](#tab/dotnet)

* [Teams SDK API reference](https://microsoft.github.io/teams-sdk/csharp/essentials/api/)

```csharp
// TODO: Add .NET Teams SDK paged members snippet when the Learn-approved
// method signature is finalized for this article.
// Reference: https://microsoft.github.io/teams-sdk/csharp/essentials/api/
```

# [TypeScript](#tab/typescript)

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

# [Python](#tab/python)

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

* * *

After you fetch the roster, you can get details for a single member.

## Get single member details

You can retrieve details of a specific member using user identifiers from the activity context.

The following sample code uses Teams SDK APIs:

# [C#](#tab/dotnet)

* [Teams SDK API reference](https://microsoft.github.io/teams-sdk/csharp/essentials/api/)

```csharp
// TODO: Add .NET Teams SDK single-member snippet after API shape
// for member lookup is finalized for this article.
```

# [TypeScript](#tab/typescript)

* [Teams SDK API reference](https://microsoft.github.io/teams-sdk/typescript/essentials/api/)

```typescript
app.on("message", async ({ activity, api }) => {
  const memberId = activity.from?.id;
  if (!memberId) {
    return;
  }

  const member = await api.conversations
    .members(activity.conversation.id)
    .get(memberId);
});
```

# [Python](#tab/python)

* [Teams SDK API reference](https://microsoft.github.io/teams-sdk/python/essentials/api/)

```python
@app.on_message
async def get_member(ctx: ActivityContext[MessageActivity]) -> None:
    member_id = ctx.activity.from_.id
    member = await ctx.api.conversations.members(ctx.activity.conversation.id).get(member_id)
```

* * *

After you get details for a member, you can retrieve team details.

## Get team's details

When installed in a team, your bot can query metadata such as team ID and Microsoft Entra group ID.

The following sample code uses Teams SDK APIs:

# [C#](#tab/dotnet)

* [Teams SDK API reference](https://microsoft.github.io/teams-sdk/csharp/essentials/api/)

```csharp
// TODO: Add .NET Teams SDK team-details snippet when the Learn-approved
// API method mapping is finalized.
```

# [TypeScript](#tab/typescript)

* [Teams SDK API reference](https://microsoft.github.io/teams-sdk/typescript/essentials/api/)

```typescript
app.on("message", async ({ activity, api }) => {
  const teamId = activity.channelData?.team?.id;
  if (!teamId) {
    return;
  }

  const team = await api.teams.get(teamId);
});
```

# [Python](#tab/python)

* [Teams SDK API reference](https://microsoft.github.io/teams-sdk/python/essentials/api/)

```python
@app.on_message
async def get_team_details(ctx: ActivityContext[MessageActivity]) -> None:
    team_id = ctx.activity.channel_data.team.id
    team = await ctx.api.teams.get(team_id)
```

* * *

After you get team details, you can get the list of channels in that team.

## Get the list of channels in a team

Your bot can query the list of channels in a team.

> [!NOTE]
>
> * The name of the default General channel is returned as `null` to allow for localization.
> * The channel ID for the General channel always matches the team ID.

The following sample code is used to get the list of channels in a team:

# [C#](#tab/dotnet)

* [Teams SDK API reference](https://microsoft.github.io/teams-sdk/csharp/essentials/api/)

```csharp
// TODO: Add .NET Teams SDK channel-list snippet when Learn-approved
// API method mapping is finalized.
```

# [TypeScript](#tab/typescript)

* [Teams SDK API reference](https://microsoft.github.io/teams-sdk/typescript/essentials/api/)

```typescript
app.on("message", async ({ activity, api }) => {
  const teamId = activity.channelData?.team?.id;
  if (!teamId) {
    return;
  }

  const channels = await api.teams.channels.list(teamId);
});
```

# [Python](#tab/python)

* [Teams SDK API reference](https://microsoft.github.io/teams-sdk/python/essentials/api/)

```python
@app.on_message
async def list_channels(ctx: ActivityContext[MessageActivity]) -> None:
    team_id = ctx.activity.channel_data.team.id
    channels = await ctx.api.teams.channels.list(team_id)
```

* * *

If you need raw connector REST endpoints, use the Teams SDK API for most bot scenarios and only use REST directly for advanced cases that aren't covered by SDK abstractions.

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
<!-- markdownlint-enable MD024 -->
