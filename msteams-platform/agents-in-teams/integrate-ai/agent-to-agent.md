---
title: Bot-to-Bot Communication with Agent2Agent (A2A)
description: "Hand a user off between two Teams bots over the Agent2Agent protocol a the receiving bot opens a proactive 1:1 and greets the user with full context so the conversation continues seamlessly."
ms.topic: how-to
zone_pivot_groups: teams-sdk-languages
ms.date: 09/27/2026
---

# Bot-to-Bot Communication with Agent2Agent (A2A)

Agents are typically designed to interact either with people (chatbots) or with systems (tools, APIs, MCP servers). [Agent2Agent](https://a2a-protocol.org/) (A2A) introduces a third interaction model: agents communicating directly with other agents as peers a each with its own model, capabilities, and human audience.

This guide walks through a **handoff** between two Teams bots, **Alice** and **Bob**, each backed by its own LLM agent. A user DMs one bot; its agent reads the peer's capability description and decides whether to answer directly or hand the user off. On handoff, the receiving bot **proactively opens a 1:1 chat** with the user and greets them with the context that came across a so the conversation continues seamlessly in the new chat.

::: zone pivot="teams-sdk-python"

Both bots run the **same code**, differentiated entirely by environment variables (name, description, self/peer URLs). They use the [`a2a-sdk`](https://github.com/a2aproject/a2a-python) for the protocol and `agent_framework` for the LLM agent.

Full source: [examples/a2a](https://github.com/microsoft/teams.py/tree/main/examples/a2a).

::: zone-end

::: zone pivot="teams-sdk-typescript"

Both bots run the **same code**, differentiated entirely by environment variables (name, description, self/peer URLs). They use [`@a2a-js/sdk`](https://www.npmjs.com/package/@a2a-js/sdk) for the protocol and the OpenAI SDK for the LLM agent.

Full source: [examples/a2a](https://github.com/microsoft/teams.ts/tree/main/examples/a2a).

::: zone-end

::: zone pivot="teams-sdk-csharp"

This guide is based on [`A2ABot`](https://github.com/microsoft/teams.net/tree/main/samples/A2ABot): two SDK 2.1 bots run the same code with different config and hand users off through A2A.

::: zone-end

## Advertising capabilities with an Agent Card

Every A2A server publishes an `AgentCard` a a small machine-readable document describing who the agent is and what it can do. Peers fetch this card to learn about each other; their LLMs then read the `description` field to decide *when* to hand off a user.

::: zone pivot="teams-sdk-python"

```python

from a2a.types import AgentCapabilities, AgentCard, AgentSkill

def build_agent_card(config: Config) -> AgentCard:
    return AgentCard(
        name=config.name,
        description=config.description,
        url=config.self_url.rstrip("/") + "/a2a",
        version="1.0.0",
        protocol_version="0.3.0",
        default_input_modes=["application/json"],
        default_output_modes=["text/plain"],
        capabilities=AgentCapabilities(streaming=False),
        skills=[AgentSkill(
            id="handoff",
            name="Handoff",
            description=f"Accepts handoffs of users from peer bots. Specialty: {config.description}",
            tags=["a2a", "teams", "handoff"],
        )],
    )
```

::: zone-end

::: zone pivot="teams-sdk-typescript"

```typescript

import type { AgentCard } from '@a2a-js/sdk';

function buildAgentCard(config: Config): AgentCard {
  return {
    name: config.name,
    description: config.description,
    url: `${config.selfUrl.replace(/\/+$/, '')}/a2a`,
    version: '1.0.0',
    protocolVersion: '0.3.0',
    preferredTransport: 'JSONRPC',
    capabilities: {},
    defaultInputModes: ['application/json'],
    defaultOutputModes: ['text/plain'],
    skills: [{
      id: 'handoff',
      name: 'Handoff',
      description: `Accepts handoffs of users from peer bots. Specialty: ${config.description}`,
      tags: ['a2a', 'teams', 'handoff'],
    }],
  };
}
```

::: zone-end

::: zone pivot="teams-sdk-csharp"

The sample publishes an A2A `AgentCard` per bot:

```csharp
public static AgentCard Build(Config config) => new()
{
    Name = config.Name,
    Description = config.Description,
    SupportedInterfaces =
    [
        new AgentInterface
        {
            Url = $"{config.SelfUrl}/a2a",
            ProtocolBinding = "JSONRPC",
            ProtocolVersion = "1.0",
        }
    ],
    Skills =
    [
        new AgentSkill
        {
            Id = "handoff",
            Name = "Handoff",
            Description = $"Accepts handoffs of users from peer bots. Specialty: {config.Description}",
        }
    ],
};
```

::: zone-end

The `description` is the most important knob in this sample a it's the natural-language summary another bot's LLM uses to decide whether *this* bot is the right peer for a given user. Tweak it to match the persona and expertise you want each bot to advertise.

## The handoff message contract

A handoff carries everything the receiving bot needs to reach the user proactively: their **`aadObjectId`** (the tenant-wide identity both bots share a the Teams MRI one bot sees isn't valid against the other), the **`tenantId`**, the **`serviceUrl`**, and a **`summary`** of the conversation so the peer can pick up cold.

::: zone pivot="teams-sdk-python"

```python

from typing import Literal
from pydantic import BaseModel, ConfigDict

class HandoffMessage(BaseModel):
    model_config = ConfigDict(alias_generator=_alias, populate_by_name=True)

    kind: Literal["handoff"] = "handoff"
    from_: str
    user_name: str
    aad_object_id: str
    tenant_id: str
    service_url: str
    summary: str
```

The `alias_generator` camel-cases the field names on the wire (`from_` a `from`, `aad_object_id` a `aadObjectId`) so both bots a regardless of language a agree on the payload shape.

::: zone-end

::: zone pivot="teams-sdk-typescript"

```typescript

export type HandoffMessage = {
  readonly kind: 'handoff';
  readonly from: string;
  readonly userName: string;
  readonly aadObjectId: string;
  readonly tenantId: string;
  readonly serviceUrl: string;
  readonly summary: string;
};

export function isHandoffMessage(value: unknown): value is HandoffMessage {
  if (!value || typeof value !== 'object') return false;
  const v = value as Record<string, unknown>;
  return (
    v.kind === 'handoff' &&
    typeof v.aadObjectId === 'string' && v.aadObjectId.length > 0 &&
    typeof v.tenantId === 'string' && v.tenantId.length > 0 &&
    typeof v.serviceUrl === 'string' && v.serviceUrl.length > 0 &&
    typeof v.summary === 'string'
  );
}
```

A type guard validates the inbound `DataPart` before the receiving bot acts on it.

::: zone-end

::: zone pivot="teams-sdk-csharp"

Use a strict handoff payload contract:

```csharp
internal record HandoffMessage(
    string Kind,
    string AadObjectId,
    string UserName,
    string Summary,
    string From,
    string TenantId,
    string ServiceUrl);
```

::: zone-end

## LLM-driven handoff

Routing is not a hard-coded rule a the LLM decides. Each bot exposes a single `handoff_to_peer` tool to its agent, and the agent's instructions include the live `AgentCard.description` of the peer. When a question fits the peer's expertise better than its own, the model calls the tool.

::: zone pivot="teams-sdk-python"

```python

from agent_framework import tool

@tool
async def handoff_to_peer(summary: str) -> str:
    """Hand off the current user to your peer when their expertise is a better fit.

    Pass a concise summary so the peer can pick up cold. The peer will message the user directly.
    """
    identity = current_turn_identity.get()
    if not identity:
        # No identity means we're inside a handoff greeting — prevent ping-pong.
        return "handoff_to_peer is unavailable in this context."
    payload = HandoffMessage(
        from_=self._config.name,
        user_name=identity.user_name,
        aad_object_id=identity.aad_object_id,
        tenant_id=identity.tenant_id,
        service_url=identity.service_url,
        summary=summary,
    )
    await self._a2a_client.send_handoff(payload)
    return "Handoff confirmed. The peer will message the user directly."
```

The agent's system prompt embeds the peer's live `AgentCard.description`, so the model knows what the peer actually specializes in:

```python

instructions = "\n".join([
    f"You are {config.name}, a Teams bot. Your specialty: {config.description}.",
    "You have one peer:",
    f"- {config.peer_name}: {peer_card.description}",
    f"- If the user's question fits {config.peer_name}'s specialty better than your own, "
    "call handoff_to_peer with a clear summary. Then briefly tell the user you're handing them over.",
    "- Otherwise, answer directly.",
])
```

::: zone-end

::: zone pivot="teams-sdk-typescript"

```typescript

import type { RunnableToolFunction } from 'openai/lib/RunnableFunction';

function buildHandoffTool(): RunnableToolFunction<{ summary: string }> {
  return {
    type: 'function',
    function: {
      name: 'handoff_to_peer',
      description:
        'Hand off the current user to your peer when their expertise is a better fit. ' +
        'Pass a concise summary so the peer can pick up cold. The peer will message the user directly.',
      parameters: {
        type: 'object',
        properties: { summary: { type: 'string' } },
        required: ['summary'],
        additionalProperties: false,
      },
      function: async (args: { summary: string }) => {
        const identity = TURN_STORAGE.getStore();
        if (!identity) {
          // Called from a handoff greeting (no identity) — guard against ping-pong.
          return 'handoff_to_peer is unavailable in this context.';
        }
        const payload: HandoffMessage = { kind: 'handoff', from: config.name, ...identity, summary: args.summary };
        await a2aClient.sendHandoff(payload);
        return 'Handoff confirmed. The peer will message the user directly.';
      },
      parse: (raw: string) => JSON.parse(raw) as { summary: string },
    },
  };
}
```

The identity is held in an `AsyncLocalStorage` (`TURN_STORAGE`) for the duration of the turn. The agent's system prompt embeds the peer's live `AgentCard.description` so the model knows what the peer specializes in:

```typescript

const instructions = [
  `You are ${config.name}, a Teams bot. Your specialty: ${config.description}.`,
  'You have one peer:',
  `- ${config.peerName}: ${peerDescription}`,
  `- If the user's question fits ${config.peerName}'s specialty better than your own, call handoff_to_peer with a clear summary. Then briefly tell the user you're handing them over.`,
  '- Otherwise, answer directly.',
].join('\n');
```

::: zone-end

::: zone pivot="teams-sdk-csharp"

The model gets one handoff tool that calls A2A:

```csharp
AIFunction handoffTool = AIFunctionFactory.Create(HandoffToPeerAsync, new AIFunctionFactoryOptions
{
    Name = "handoff_to_peer",
    Description = $"Hand off the current user to {_config.PeerName} when {_config.PeerName}'s expertise is a better fit.",
});
```

Then send structured handoff data:

```csharp
await _a2aClient.SendHandoffAsync(
    new HandoffMessage("handoff", turn.AadObjectId, turn.UserName, summary, _config.Name, turn.TenantId, turn.ServiceUrl),
    ct);
```

::: zone-end

The identity needed to build the handoff is captured from the inbound Teams activity and stashed for the duration of the turn, so the tool callback can reach it without threading it through every call. A handoff *greeting* runs with no identity set a the tool guards against that to prevent a ping-pong.

## Sending a handoff over A2A

The outbound side resolves the peer's `AgentCard` once (so the agent can read its live description into the tool), then ships the handoff as a `DataPart`.

::: zone pivot="teams-sdk-python"

```python

import httpx, uuid
from a2a.client import A2ACardResolver, A2AClient
from a2a.types import DataPart, Message, MessageSendParams, Part, Role, SendMessageRequest

class A2APeerClient:
    async def send_handoff(self, payload: HandoffMessage) -> None:
        if not self._cached_card:
            await self.get_peer_card()
        async with httpx.AsyncClient(timeout=60.0, follow_redirects=True) as http:
            client = A2AClient(httpx_client=http, agent_card=self._cached_card)
            request = SendMessageRequest(
                id=str(uuid.uuid4()),
                params=MessageSendParams(message=Message(
                    message_id=str(uuid.uuid4()),
                    role=Role.user,
                    parts=[Part(root=DataPart(data=payload.model_dump(by_alias=True)))],
                )),
            )
            await client.send_message(request)
```

`get_peer_card()` resolves the peer's card once via `A2ACardResolver` against its well-known endpoint, and caches it.

::: zone-end

::: zone pivot="teams-sdk-typescript"

```typescript

import type { AgentCard, MessageSendParams } from '@a2a-js/sdk';
import { Client, ClientFactory, JsonRpcTransportFactory } from '@a2a-js/sdk/client';

export class A2APeerClient {
  private cachedClient?: Client;

  async sendHandoff(payload: HandoffMessage): Promise<void> {
    if (!this.cachedClient) await this.getPeerCard();
    const params: MessageSendParams = {
      message: {
        kind: 'message',
        role: 'user',
        messageId: crypto.randomUUID(),
        parts: [{ kind: 'data', data: payload as unknown as Record<string, unknown> }],
      },
    };
    await this.cachedClient!.sendMessage(params);
  }

  // getPeerCard() resolves the peer's AgentCard once via the well-known endpoint
  // and constructs the underlying A2A client, then caches both.
}
```

::: zone-end

::: zone pivot="teams-sdk-csharp"

The outbound client resolves and caches the peer card once:

```csharp
A2ACardResolver resolver = new(new Uri(config.PeerUrl), http);
AgentCard card = await resolver.GetAgentCardAsync(ct);
global::A2A.A2AClient client = new(new Uri(card.SupportedInterfaces[0].Url), http);
```

Then posts the handoff as a `Data` part.

::: zone-end

## Receiving a handoff

The inbound side implements the A2A protocol's executor interface. For each inbound message it pulls the handoff out of the `DataPart`, opens a fresh 1:1 with the user against **their** `serviceUrl`, asks the agent to seed that conversation's history with the handoff context and produce a greeting, sends the greeting proactively, and acks back so the sender's call resolves.

::: zone pivot="teams-sdk-python"

```python

from a2a.server.agent_execution.agent_executor import AgentExecutor
from microsoft_teams.api import Account, CreateConversationParams
from microsoft_teams.api.clients.conversation.client import ConversationClient

class HandoffAgentExecutor(AgentExecutor):
    async def execute(self, context: RequestContext, event_queue: EventQueue) -> None:
        handoff = _extract_handoff(context)
        if not handoff:
            await self._ack(event_queue, ..., "Unsupported or incomplete handoff message.")
            return

        # 1. Open a 1:1 with the user against THEIR serviceUrl.
        new_conv_id = await self._open_dm_with_user(handoff)
        # 2. Seed history with the handoff context + greeting.
        greeting = await self._agent.greet_with_handoff(new_conv_id, handoff)
        # 3. Send the greeting proactively.
        await self._app.send(new_conv_id, greeting)
        # 4. Ack so the sender's send_message resolves.
        await self._ack(event_queue, ..., f"Handoff received and {handoff.user_name} contacted directly.")

    async def _open_dm_with_user(self, handoff: HandoffMessage) -> str:
        conv_client = ConversationClient(service_url=handoff.service_url, options=self._app.api.http)
        result = await conv_client.create(CreateConversationParams(
            members=[Account(id=handoff.aad_object_id, name=handoff.user_name)],
            tenant_id=handoff.tenant_id,
        ))
        return result.id
```

`greet_with_handoff` runs the LLM with the handoff summary as a system instruction and leaves the resulting turn in the session, so subsequent user replies continue naturally.

::: zone-end

::: zone pivot="teams-sdk-typescript"

```typescript

import type { AgentExecutor, ExecutionEventBus, RequestContext } from '@a2a-js/sdk/server';
import { Client as TeamsApiClient } from '@microsoft/teams.api';

export class HandoffAgentExecutor implements AgentExecutor {
  execute = async (ctx: RequestContext, bus: ExecutionEventBus): Promise<void> => {
    const handoff = this.extractHandoff(ctx);
    if (!handoff) {
      this.publishText(bus, ctx, 'Unsupported or incomplete handoff message.');
      bus.finished();
      return;
    }
    // 1. Open a 1:1 with the user against THEIR serviceUrl.
    const newConvId = await this.openDmWithUser(handoff);
    // 2. Seed history with the handoff context + greeting.
    const greeting = await this.agent.greetWithHandoff(newConvId, handoff);
    // 3. Send the greeting proactively.
    await this.app.send(newConvId, greeting);
    // 4. Ack so the sender's sendMessage resolves.
    this.publishText(bus, ctx, `Handoff received and ${handoff.userName} contacted directly.`);
    bus.finished();
  };

  private async openDmWithUser(handoff: HandoffMessage): Promise<string> {
    const api = new TeamsApiClient(handoff.serviceUrl, this.app.api.http);
    const conv = await api.conversations.create({
      tenantId: handoff.tenantId,
      members: [{ id: handoff.aadObjectId, role: 'user', name: handoff.userName }],
    });
    if (!conv.id) throw new Error('CreateConversation returned no id.');
    return conv.id;
  }
}
```

`greetWithHandoff` runs the LLM with the handoff summary as a synthetic turn and leaves it in the per-conversation history, so subsequent user replies continue naturally.

::: zone-end

::: zone pivot="teams-sdk-csharp"

Inbound A2A creates a 1:1 conversation and sends a proactive greeting:

```csharp
CreateConversationResponse conv = await conversations.CreateConversationAsync(
    new ConversationParameters
    {
        IsGroup = false,
        TenantId = handoff.TenantId,
        Members = [new TeamsChannelAccount { Id = handoff.AadObjectId }],
    },
    serviceUrl,
    cancellationToken: ct);

string greeting = await agent.GreetWithHandoffAsync(newConvId, handoff.From, handoff.UserName, handoff.Summary, ct);
await conversations.SendActivityAsync(newConvId, new MessageActivityInput().WithText(greeting), serviceUrl, cancellationToken: ct);
```

::: zone-end

Because the greeting turn is left in the per-conversation history, when the user replies in their new DM the agent picks up coherently.

## Wiring A2A into your Teams app

The Teams bot and A2A server run in the same process and share one HTTP surface: `/api/messages` for Teams, `/a2a` for inbound handoffs, and `/.well-known/agent-card.json` for the AgentCard.

::: zone pivot="teams-sdk-python"

```python

import uvicorn
from fastapi import FastAPI
from microsoft_teams.apps import App, FastAPIAdapter

fastapi_app = FastAPI()
app = App(http_server_adapter=FastAPIAdapter(app=fastapi_app), ...)

async def main() -> None:
    agent_card = build_agent_card(config)
    a2a_starlette = make_a2a_app(teams_app=app, agent=bot_agent, config=config, agent_card=agent_card)
    fastapi_app.mount("/a2a", a2a_starlette.build())  # serves /a2a + /.well-known/agent-card.json
    await app.initialize()
    server = uvicorn.Server(uvicorn.Config(fastapi_app, host="0.0.0.0", port=int(getenv("PORT", "3978"))))
    await server.serve()
```

::: zone-end

::: zone pivot="teams-sdk-typescript"

```typescript

import express from 'express';
import { App, ExpressAdapter } from '@microsoft/teams.apps';
import { DefaultRequestHandler, InMemoryTaskStore } from '@a2a-js/sdk/server';
import { agentCardHandler, jsonRpcHandler, UserBuilder } from '@a2a-js/sdk/server/express';

const expressApp = express();
const app = new App({ httpServerAdapter: new ExpressAdapter(expressApp) });

const a2aHandler = new DefaultRequestHandler(
  buildAgentCard(config),
  new InMemoryTaskStore(),
  new HandoffAgentExecutor(app, agent, config, log)
);
expressApp.use('/.well-known/agent-card.json', agentCardHandler({ agentCardProvider: a2aHandler }));
expressApp.use('/a2a', jsonRpcHandler({ requestHandler: a2aHandler, userBuilder: UserBuilder.noAuthentication }));

// Register /api/messages without starting an internal server — we own the http.Server.
await app.initialize();
http.createServer(expressApp).listen(Number(process.env.PORT) || 3978);
```

::: zone-end

::: zone pivot="teams-sdk-csharp"

Teams + A2A are hosted in one ASP.NET app:

```csharp
builder.Services.AddTeamsBotApplication();
builder.Services.AddA2AAgent<A2AServer>(agentCard);

WebApplication webApp = builder.Build();
TeamsBotApplication teamsApp = webApp.UseTeamsBotApplication();

webApp.MapA2A("/a2a");
webApp.MapWellKnownAgentCard(agentCard);
webApp.Run();
```

::: zone-end

Each bot needs its own Teams app registration (so DMs route to the right bot) and its own port. The sample runs Alice on `3978` and Bob on `3979`; their peer URLs point at each other.

## Putting it all together

With both bots running and installed for the user, DM Alice with a question outside her specialty and watch the round-trip: Alice's LLM calls `handoff_to_peer`, Bob receives it over A2A, opens a new 1:1 with the user, and greets them with an answer already in hand. The bots are symmetric; the same flow runs the other way from Bob to Alice.

:::image type="content" source="../../assets/agent-to-agent.gif" alt-text="Animated screenshot of the end-to-end A2A handoff: a user DMs Alice, Alice hands off to Bob, and Bob opens a new chat greeting the user with context.":::
/>

> [!WARNING]
>
> This sample configures no authenticator on the A2A endpoint, so any caller can post a handoff. For production, validate the caller's identity (a bearer token or mTLS) before opening a conversation with someone they named.
