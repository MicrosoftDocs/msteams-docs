---
title: Route messages in your Teams agent factory
description: Route Teams messages to the correct Agentic User, isolate each agent's context by tenant and user ID, and acquire tokens for Microsoft 365 API calls.
ms.topic: article
ms.date: 11/15/2026
ms.author: umangsehgal
author: umangsehgal
---

# Route messages in your Teams agent factory

This article is part 4 of the [Build an agent factory with Agentic Users in Teams](build-agent-factory.md) series.

One service receives the messages for every Agentic User created from your blueprint. Each message identifies the Agentic User it's addressed to in `activity.recipient`, the activity's **To** field. Within the inbound handler, Teams SDK uses that identity for replies, sends, and supported API calls.

## Route each message

Read the Agentic User ID from the recipient, resolve the customer's tenant ID from the SDK activity, and load only the matching agent from your product. Let Teams SDK validate incoming requests before these handlers run; identity fields aren't a replacement for request authentication.

# [C#](#tab/csharp)

The C# example assumes a configured `teamsApp` and an `ILogger` named `logger` obtained through dependency injection.

```csharp
using Microsoft.Extensions.Logging;

teamsApp.OnMessage(async (context, cancellationToken) =>
{
    var identity = context.Activity.Recipient?.GetAgenticIdentity();
    var tenantId = identity?.TenantId ?? context.Activity.TenantId;
    var agenticUserId = identity?.AgenticUserId;
    if (string.IsNullOrWhiteSpace(tenantId) ||
        string.IsNullOrWhiteSpace(agenticUserId))
    {
        logger.LogWarning("Ignoring a message without an agent or tenant ID.");
        return;
    }

    var agent = await agentStore.FindAsync(tenantId, agenticUserId);
    if (agent is null)
    {
        logger.LogWarning(
            "No agent registered for tenant {TenantId} and user {AgenticUserId}.",
            tenantId, agenticUserId);
        return;
    }

    await context.ReplyAsync(
        await agentRuntime.RunAsync(
            agent, context.Activity.Text ?? string.Empty, cancellationToken),
        cancellationToken);
});
```

# [TypeScript](#tab/typescript)

```typescript
import { getAgenticIdentity } from '@microsoft/teams.api';
import { App } from '@microsoft/teams.apps';

const app = new App();

app.on('message', async ({ activity, reply, log }) => {
  const identity = getAgenticIdentity(activity.recipient);
  const tenantId =
    identity?.tenantId || activity.conversation.tenantId || activity.channelData?.tenant?.id;
  const agenticUserId = identity?.agenticUserId;
  if (!tenantId?.trim() || !agenticUserId?.trim()) {
    log.warn('Ignoring a message without an agent or tenant ID.');
    return;
  }

  const agent = await agentStore.find(tenantId, agenticUserId);
  if (!agent) {
    log.warn('No agent registered for this tenant and user.', {
      tenantId,
      agenticUserId,
    });
    return;
  }

  await reply(await agentRuntime.run(agent, activity.text ?? ''));
});
```

# [Python](#tab/python)

```python
from microsoft_teams.api import MessageActivity
from microsoft_teams.apps import ActivityContext, App

app = App()


@app.on_message
async def handle_message(ctx: ActivityContext[MessageActivity]) -> None:
    identity = ctx.activity.recipient.agentic_identity
    tenant_id = (
        (identity.tenant_id if identity else None)
        or ctx.activity.conversation.tenant_id
        or (
            ctx.activity.channel_data.tenant.id
            if ctx.activity.channel_data and ctx.activity.channel_data.tenant
            else None
        )
    )
    agentic_user_id = identity.agentic_user_id if identity else None
    if (
        not tenant_id
        or not tenant_id.strip()
        or not agentic_user_id
        or not agentic_user_id.strip()
    ):
        ctx.logger.warning("Ignoring a message without an agent or tenant ID.")
        return

    agent = await agent_store.find(tenant_id, agentic_user_id)
    if agent is None:
        ctx.logger.warning(
            "No agent registered for tenant %s and user %s.", tenant_id, agentic_user_id
        )
        return

    await ctx.reply(await agent_runtime.run(agent, ctx.activity.text or ""))
```

---

The store and runtime objects stand in for your own storage and orchestration. The store must look up the agent by both tenant ID and Agentic User ID, and return no agent if the identity isn't registered or is disabled. Never fall back to another agent's configuration. If an activity doesn't contain the required IDs, log the condition and stop.

## Keep each agent's context separate

Key an agent's configuration, knowledge, and memory by tenant ID and Agentic User ID. For conversation-specific state, include the conversation ID as well. A conversation ID alone isn't sufficient because several of your agents can join the same conversation. Load only the selected agent's authorized data and tools. For guidance, see [Best practices for Teams agent factories](best-practices.md).

## Send proactive messages as the correct agent

A scheduled job has no inbound activity from which Teams SDK can select the sender. Store the tenant ID, Agentic User ID, agent identity client ID, conversation ID, and service URL when your service receives an activity. For proactive work, explicitly select that agent's identity rather than relying on a previous handler's context.

Pass the customer's stored tenant ID when constructing the proactive identity. Teams SDK uses this value to scope proactive operations to that customer's tenant.

For examples in each SDK language, see [Proactive messaging](../receiving-sending-messages.md#proactive-messaging).

## Call Microsoft 365 workloads as the agent itself

Teams SDK handles token acquisition for operations that use its Agentic User scope. The agent's granted permissions and the target workload's authorization rules determine which operations it can perform. For a separate Microsoft 365 API client, use the token-acquisition flow in the following appendix.

## Appendix: Get an Agentic User token yourself

Teams SDK handles this exchange for its scoped operations. You need the following requests only when implementing token acquisition yourself. Before starting, obtain the customer's tenant ID, blueprint client ID, agent identity client ID, and Agentic User object ID.

> [!IMPORTANT]
> A delegated permission grant must authorize the agent identity to act as the Agentic User for the requested resource and scopes. The Agentic User is the principal, and the agent identity is the client. Configuring permissions on the blueprint alone isn't sufficient. Never log or persist tokens in plaintext.

### Step 1: Get a blueprint token

Request a token scoped to the agent identity through `fmi_path`. The client-secret example is for local development only. In production, use a certificate or a managed identity configured as a federated identity credential.

```http
POST https://login.microsoftonline.com/{tenant-id}/oauth2/v2.0/token
Content-Type: application/x-www-form-urlencoded

client_id={blueprint-id}
&scope=api://AzureADTokenExchange/.default
&client_secret={blueprint-secret}
&fmi_path={agent-identity-id}
&grant_type=client_credentials
```

Save the response's `access_token` as `{blueprint-token}` for the next two requests.

### Step 2: Get an agent identity exchange token

Use the blueprint token as a client assertion to request an exchange token for the agent identity, not a Microsoft Graph access token.

```http
POST https://login.microsoftonline.com/{tenant-id}/oauth2/v2.0/token
Content-Type: application/x-www-form-urlencoded

client_id={agent-identity-id}
&scope=api://AzureADTokenExchange/.default
&grant_type=client_credentials
&client_assertion_type=urn:ietf:params:oauth:client-assertion-type:jwt-bearer
&client_assertion={blueprint-token}
```

Save the response's `access_token` as `{agent-identity-token}`.

### Step 3: Get the Agentic User's token

Use both tokens to request a delegated access token for the Agentic User. This example targets Microsoft Graph; use the appropriate resource scope for another supported workload.

```http
POST https://login.microsoftonline.com/{tenant-id}/oauth2/v2.0/token
Content-Type: application/x-www-form-urlencoded

client_id={agent-identity-id}
&scope=https://graph.microsoft.com/.default
&grant_type=user_fic
&client_assertion_type=urn:ietf:params:oauth:client-assertion-type:jwt-bearer
&client_assertion={blueprint-token}
&user_id={agentic-user-id}
&user_federated_identity_credential={agent-identity-token}
```

Use the final response's `access_token` in the `Authorization: Bearer` header of your Microsoft Graph request. Form-encode the request values and handle token expiration and acquisition failures.

* Instead of `user_id`, you can pass `username` with the Agentic User's user principal name.
* In .NET, `Microsoft.Identity.Web.AgentIdentities` handles token acquisition with `.WithAgentUserIdentity(agentId, userId)` after you configure credentials and register agent identity services.

For credential configuration, delegated permission grants, and the .NET setup, see [Authenticate and acquire tokens for autonomous agents](/entra/agent-id/autonomous-agent-authentication-authorization-flow).

Previous: [Create Agentic Users for your Teams agent factory](create-agentic-users.md).

> [!div class="nextstepaction"]
> [Next: Handle lifecycle notifications](be-in-the-know.md)
