---
title: Extend an Agent to Other Channels With the Microsoft 365 Agents SDK
description: Extend a Teams SDK agent to Direct Line and Email with Microsoft 365 Extensions. Keep your Teams handlers intact and learn how to add multichannel support today.
ms.topic: how-to
zone_pivot_groups: teams-sdk-languages
ms.date: 09/27/2026
---

# Extend an agent to other channels with the Microsoft 365 Agents SDK

Microsoft 365 Extensions let you extend an existing Teams SDK application to channels such as Direct Line and Email without rewriting any Teams-specific capabilities.

Register your existing Teams SDK handlers on the `App` returned by `useTeamsSdk` (TypeScript), `use_teams_sdk` (Python), or `AddTeamsSdk` (C#). The resulting app is a bridge where Microsoft Agents SDK `AgentApplication` acts the multichannel host.

Matching Teams activities continue through your Teams SDK handlers, while non-Teams activities and unmatched Teams activities flow through the Agents SDK application.

## How to Use It

::: zone pivot="teams-sdk-typescript"

Install the Microsoft 365 Extensions package alongside the Microsoft Agents SDK:

```bash
npm install @microsoft/agents-hosting @microsoft/teams.m365extensions
```

Add an Agents SDK host to your existing Teams SDK application, then replace your current `App` initialization with `useTeamsSdk`:

```typescript
import {
  AgentApplication,
  CloudAdapter,
  getAuthConfigWithDefaults,
  MemoryStorage,
  type TurnState,
} from '@microsoft/agents-hosting';
import { useTeamsSdk } from '@microsoft/teams.m365extensions';

const authConfig = getAuthConfigWithDefaults({
  clientId: process.env.CLIENT_ID,
  clientSecret: process.env.CLIENT_SECRET,
  tenantId: process.env.TENANT_ID,
});

const adapter = new CloudAdapter(authConfig);
const agentApp = new AgentApplication<TurnState>({
  storage: new MemoryStorage(),
  adapter,
});

const app = useTeamsSdk(agentApp, adapter.connectionManager);
```

::: zone-end

::: zone pivot="teams-sdk-python"

Install the Microsoft 365 Extensions package alongside the Microsoft Agents SDK:

```bash
pip install microsoft-agents-activity microsoft-agents-authentication-msal microsoft-agents-hosting-aiohttp microsoft-agents-hosting-core microsoft-teams-m365extensions
```

Add an Agents SDK host to your existing Teams SDK application, then replace your current `App` initialization with `use_teams_sdk`:

```python
from os import environ

from microsoft_agents.activity import load_configuration_from_env
from microsoft_agents.authentication.msal import MsalConnectionManager
from microsoft_agents.hosting.aiohttp import CloudAdapter
from microsoft_agents.hosting.core import AgentApplication, MemoryStorage, TurnState
from microsoft_agents.hosting.core.app import ApplicationOptions
from microsoft_teams.m365extensions import use_teams_sdk

agents_sdk_config = load_configuration_from_env(dict(environ))
connection_manager = MsalConnectionManager(**agents_sdk_config)
adapter = CloudAdapter(connection_manager=connection_manager)

agent_app = AgentApplication[TurnState](
    options=ApplicationOptions(storage=MemoryStorage(), adapter=adapter),
    connection_manager=connection_manager,
    **agents_sdk_config,
)

app = use_teams_sdk(agent_app, connection_manager)
```

::: zone-end

::: zone pivot="teams-sdk-csharp"

Install the Microsoft 365 Extensions package alongside the Microsoft Agents SDK:

```bash
dotnet add package Microsoft.Agents.Hosting.AspNetCore
dotnet add package Microsoft.Agents.Authentication.Msal
dotnet add package Microsoft.Teams.M365Extensions
```

Add an Agents SDK host to your existing Teams SDK application, then register your Teams SDK bot with `AddTeamsSdk`:

```csharp
using Microsoft.Agents.Storage;
using Microsoft.Teams.M365Extensions;

var builder = WebApplication.CreateBuilder(args);

// Your existing Microsoft Agents SDK agent
builder.AddAgent<MyAgent>();
builder.Services.AddSingleton<IStorage, MemoryStorage>();
builder.Services.AddAgentAspNetAuthentication(builder.Configuration);

// Embed your Teams SDK bot as middleware in the Agents SDK pipeline
builder.Services.AddTeamsSdk<MyTeamsBot>();

var app = builder.Build();

app.UseAuthentication();
app.UseAuthorization();
app.MapAgentApplicationEndpoints(requireAuth: !app.Environment.IsDevelopment());

app.Run();
```

::: zone-end

## Key Benefits

### Extend Your Teams App to Other Channels

Through this extension, you can connect your existing Teams SDK app to other channels such as Direct Line and Email without rewriting your Teams-specific logic.

| Activity | Route |
| --- | --- |
| Teams activity matching a Teams SDK handler | Teams SDK |
| Teams activity without a matching Teams SDK handler | Agents SDK |
| Direct Line / Direct Line activity | Agents SDK |
| Email activity | Agents SDK |

#### Example Message Handler

You can use the Agents SDK message handler to identify the incoming channel and confirm how each activity was routed.
The incoming activity is recognized as Teams if the `channelId="msteams"`.

::: zone pivot="teams-sdk-typescript"

```typescript
AGENT_SDK_APP.onMessage(command('channel'), async (context: TurnContext) => {
  const via = isTeamsChannel(context.activity)
    ? 'Teams turn with no matching teams.ts route → fell through'
    : 'non-Teams channel → passed straight through';
  await context.sendActivity(`[Agent SDK] channelId=${context.activity.channelId} (${via})`);
});
```

::: zone-end

::: zone pivot="teams-sdk-python"

```python
@AGENT_SDK_APP.message(_command("channel"))
async def _channel(context: TurnContext, _state: TurnState):
    via = (
        "Teams turn with no matching teams.py route → fell through"
        if is_teams_channel(context.activity)
        else "non-Teams channel → passed straight through"
    )
    await context.send_activity(f"[Agent SDK] channelId={context.activity.channel_id} ({via})")
```

::: zone-end

::: zone pivot="teams-sdk-csharp"

```csharp
using Microsoft.Agents.Builder;
using Microsoft.Agents.Builder.State;
using Microsoft.Teams.M365Extensions;

private async Task ChannelAsync(ITurnContext context, ITurnState state, CancellationToken ct)
{
    string via = TeamsSdkMiddleware.IsTeamsChannel(context.Activity)
        ? "Teams turn with no matching teams.net route → fell through"
        : "non-Teams channel → passed straight through";
    await context.SendActivityAsync($"[Agent SDK] channelId={context.Activity.ChannelId} ({via})", cancellationToken: ct);
}
```

::: zone-end

#### Direct Line

:::image type="content" source="../assets/extensions-web-chat.png" alt-text="The channel command in Direct Line returning an Agents SDK response that identifies Direct Line as a non-Teams channel that passed straight through.":::

#### Email

:::image type="content" source="../assets/extensions-email.png" alt-text="The channel command sent through Email returning an Agents SDK response that identifies Email as a non-Teams channel that passed straight through.":::

### Access Rich Teams Capabilities from Agents SDK

When an Agents SDK handler receives a Teams activity, it can use the Teams SDK API client to access Teams-specific capabilities, such as message reactions:

::: zone pivot="teams-sdk-typescript"

```typescript
import { isTeamsChannel } from '@microsoft/teams.m365extensions';

agentApp.onMessage(/^agents sdk react$/i, async (context) => {
  if (!isTeamsChannel(context.activity)) {
    await context.sendActivity('Message reactions are only available in Teams.');
    return;
  }

  const response = await context.sendActivity('Adding then removing a reaction.');
  const api = app.api.fromServiceUrl({
    serviceUrl: context.activity.serviceUrl!,
  });
  const conversationId = context.activity.conversation!.id;

  await api.conversations.addReaction(conversationId, response!.id!, 'like');
  await new Promise((resolve) => setTimeout(resolve, 2000));
  await api.conversations.deleteReaction(conversationId, response!.id!, 'like');
});
```

For a full example, the [Microsoft 365 Extensions sample](https://github.com/microsoft/teams.ts/tree/main/examples/m365extensions) demonstrates a single application running across Teams, Web Chat, and Email.

::: zone-end

::: zone pivot="teams-sdk-python"

```python
import asyncio
import re

from microsoft_agents.hosting.core import TurnContext, TurnState
from microsoft_teams.api.clients.api_client import ApiClient
from microsoft_teams.m365extensions import is_teams_channel


@agent_app.message(re.compile(r"^agents sdk react$", re.IGNORECASE))
async def agents_sdk_reaction(context: TurnContext, _state: TurnState):
    if not is_teams_channel(context.activity):
        await context.send_activity(
            "Message reactions are only available in Teams."
        )
        return

    response = await context.send_activity("Adding then removing a reaction.")
    api = ApiClient(
        service_url=context.activity.service_url,
        options=app.api.http,
    )
    conversation_id = context.activity.conversation.id

    await api.conversations.add_reaction(conversation_id, response.id, "like")
    await asyncio.sleep(2)
    await api.conversations.delete_reaction(conversation_id, response.id, "like")
```

For a full example, the [Microsoft 365 Extensions sample](https://github.com/microsoft/teams.py/tree/main/examples/m365extensions) demonstrates a single application running across Teams, Web Chat, and Email.

::: zone-end

::: zone pivot="teams-sdk-csharp"

```csharp
using Microsoft.Agents.Builder;
using Microsoft.Agents.Builder.State;
using Microsoft.Teams.Apps.Schema;
using Microsoft.Teams.M365Extensions;

private async Task AgentsSdkReactAsync(ITurnContext context, ITurnState state, CancellationToken ct)
{
    if (!TeamsSdkMiddleware.IsTeamsChannel(context.Activity))
    {
        await context.SendActivityAsync("Message reactions are only available in Teams.", cancellationToken: ct);
        return;
    }

    var response = await context.SendActivityAsync("Adding then removing a reaction.", cancellationToken: ct);
    var api = _teamsBot.Api.ForServiceUrl(new Uri(context.Activity.ServiceUrl));
    string conversationId = context.Activity.Conversation.Id;

    await api.Conversations.AddReactionAsync(conversationId, response!.Id, ReactionTypes.Like, cancellationToken: ct);
    await Task.Delay(2000, ct);
    await api.Conversations.DeleteReactionAsync(conversationId, response.Id, ReactionTypes.Like, cancellationToken: ct);
}
```

For a full example, the [Microsoft 365 Extensions sample](https://github.com/microsoft/teams.net/tree/main/samples/M365ExtensionsBot) demonstrates a single application running across Teams, Web Chat, and Email.

::: zone-end

## How It Works

Microsoft 365 Extensions adds a lightweight middleware bridge to your existing Teams SDK application. Aside from app initialization, your Teams-specific code stays the same.

1. **Add the bridge.** Call `useTeamsSdk` (TypeScript), `use_teams_sdk` (Python), or `AddTeamsSdk` (C#) to connect your app to Agents SDK.
2. **Keep your Teams logic.** Existing handlers and API client calls continue handling Teams activities.
3. **Add more channels.** Direct Line, Email, and unmatched Teams activities flow to the Agents SDK.
