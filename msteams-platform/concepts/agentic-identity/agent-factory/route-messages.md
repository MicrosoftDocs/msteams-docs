---
title: Route messages to each agent
description: Route messages to each Agentic User with Teams SDK. Read the recipient ID, load the right agent, and keep each agent's context separate. Learn how.
ms.topic: article
ms.date: 11/14/2026
ms.author: umangsehgal
author: umangsehgal
---

# Route messages to each agent

One service receives the messages for every Agentic User created from your blueprint. Each message names the Agentic User it's addressed to in its To field, the activity's recipient, and Teams SDK replies, sends, and calls APIs as that Agentic User for you.

## Route each message

Read the Agentic User ID from the To field, load that agent from your product, and run only its logic.

```typescript
import { getAgenticIdentity } from '@microsoft/teams.api';
import { App } from '@microsoft/teams.apps';

const app = new App();

app.on('message', async ({ activity, reply }) => {
  // The To field (recipient) says which agent the message is for.
  const agenticUserId = getAgenticIdentity(activity.recipient)?.agenticUserId;
  if (!agenticUserId) return;

  // Load that agent from your product, and run only its logic.
  const agent = await agentStore.findByAgenticUserId(agenticUserId);
  if (!agent) return;

  await reply(await agentRuntime.run(agent, activity.text));
});
```

Here, agentStore and agentRuntime stand in for your own storage and orchestration.

## Keep each agent's context separate

Because each agent has its own identity, your service can keep each agent's knowledge, memory, and conversations apart by keying them on its Agentic User ID. Several of your agents can even join the same conversation, each in its own role. For guidance, see Best practices.

## Call Microsoft 365 workloads as the agent itself

Teams SDK gets the Agentic User's token for you, so replies and API calls run as the agent. To call Microsoft 365 APIs as the agent without Teams SDK, see the appendix, [Get an Agentic User token yourself](#get-an-agentic-user-token-yourself).

## Get an Agentic User token yourself

Teams SDK does all of this for you. You need these calls only to call Microsoft 365 APIs as an agent without Teams SDK. Getting an Agentic User token takes three calls to the same Microsoft Entra token endpoint:

1. Get a blueprint token, scoped to the agent identity.
1. Exchange it for an agent identity token.
1. Use both tokens to get the Agentic User's token. Use this token with Microsoft 365 services.

```http
POST https://login.microsoftonline.com/{tenant-id}/oauth2/v2.0/token

client_id={blueprint-id}
&scope=api://AzureADTokenExchange/.default
&client_secret={blueprint-secret}
&fmi_path={agent-identity-id}
&grant_type=client_credentials
POST https://login.microsoftonline.com/{tenant-id}/oauth2/v2.0/token

client_id={agent-identity-id}
&scope=api://AzureADTokenExchange/.default
&grant_type=client_credentials
&client_assertion_type=urn:ietf:params:oauth:client-assertion-type:jwt-bearer
&client_assertion={blueprint-token}
POST https://login.microsoftonline.com/{tenant-id}/oauth2/v2.0/token

client_id={agent-identity-id}
&scope=https://graph.microsoft.com/.default
&grant_type=user_fic
&client_assertion_type=urn:ietf:params:oauth:client-assertion-type:jwt-bearer
&client_assertion={blueprint-token}
&user_id={agentic-user-id}
&user_federated_identity_credential={agent-identity-token}
```

* Instead of user_id, you can pass username with the Agentic User's user principal name.
* The third call fails unless a delegated permission grant exists for the scopes, with the Agentic User as the principal and the agent identity as the client.
* Client secrets are for development only. In production, use a certificate or managed identity credential in the first call.
* In .NET, Microsoft.Identity.Web.AgentIdentities makes all three calls for you with .WithAgentUserIdentity(agentId, userId).

Source: Microsoft Learn, [autonomous agent authentication flow](/entra/agent-id/autonomous-agent-authentication-authorization-flow).

> [!div class="nextstepaction"]
> [Next: Be in the know](be-in-the-know.md)
