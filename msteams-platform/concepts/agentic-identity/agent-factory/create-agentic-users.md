---
title: Create Agentic Users for your Teams agent factory
description: Provision Agentic Users from your agent factory, track asynchronous creation, store per-agent identities, and add ready agents to Teams conversations.
ms.topic: article
ms.date: 11/15/2026
ms.author: umangsehgal
author: umangsehgal
---

# Create Agentic Users for your Teams agent factory

This article is part 3 of the [Build an agent factory with Agentic Users in Teams](build-agent-factory.md) series.

Every agent that someone creates in your product gets its own agent identity and Agentic User. They share the same agent identity blueprint.

:::image type="content" source="../../../assets/images/agent-blueprint-user-governance.png" alt-text="Diagram showing one agent identity blueprint and three independently managed agents with yellow, orange, and sage avatars. Each agent has its own agent identity and Agentic User." lightbox="../../../assets/images/agent-blueprint-user-governance.png":::

*One agent identity blueprint supports multiple independently managed agents.*

Your service supplies their instructions, models, tools, and orchestration. Each agent's access remains subject to granted permissions and tenant policies.

## Ways to create an agent

Agents can be created in any of these ways. They're separate options, not steps, so support whichever ones fit your product.

| **Option** | **Who creates the agent** | **How it works** |
| ---- | ---- | ---- |
| From your product | A person using your product | Your service calls the Microsoft Graph API for creating agents, as shown in the next section. |
| From the Agent Store | A person your customer's admin allowed | They create the agent from your agent factory's listing in the Agent Store in Teams. |
| From the Microsoft 365 admin center | An admin | The admin creates the agent on behalf of a manager. |

## Create an agentic user from your product

Complete [Set up an agent factory for Microsoft Teams](setup.md), including customer activation and consent, before provisioning agents.

> [!IMPORTANT]
> The following example uses a Microsoft Graph beta API. Beta APIs can change. Confirm the provisioning API's availability in your customer tenant before implementing this workflow.

### Provisioning authorization

Creating an agent requires provisioning authorization in the customer's tenant. This is separate from the workload permissions the resulting agent uses to access Microsoft 365 resources.

### Step 1: Call the API

When an authorized person creates an agent in your product, call this API with a token authorized to provision agents in the customer's tenant. In this example, `sponsorUserIds` contains the ID of the agent's directory sponsor.

Track the agent's sponsor, directory manager, and owner in your product as separate relationships. The same person might hold more than one role, but don't assume that they do. A manager update should refresh manager-dependent behavior; transfer ownership in your product only when your product's ownership policy explicitly calls for it.

```http
POST https://graph.microsoft.com/beta/aiTeammateManagement/aiTeammates
Authorization: Bearer {provisioning-access-token}
Content-Type: application/json

{
  "agentIdentityBlueprintId": "{your-blueprint-id}",
  "displayName": "Onboarding Agent",
  "upn": "onboarding-agent@contoso.onmicrosoft.com",
  "sponsorUserIds": [ "{sponsor-user-id}" ],
  "usageLocation": "US"
}
```

Use a unique `upn` in a verified domain in the customer's tenant. Set additional properties only when they're supported by the provisioning API.

### Step 2: Check the status

The API responds with `202 Accepted`, which means the request was accepted, not that the agent is ready. To check the operation, send authenticated `GET` requests to the URL returned in the `Location` header.

```http
HTTP/1.1 202 Accepted
Location: /beta/aiTeammateManagement/lifecycleOperations('create_{operation-id}')
```

Resolve a relative `Location` against `https://graph.microsoft.com`. Poll until the operation reports success or failure, honor `Retry-After` when supplied, and use bounded backoff and a timeout otherwise. Surface failure details to your user instead of polling indefinitely or blindly submitting another creation request.

Use the provisioning workflow's documented response and lifecycle payloads to establish the mapping between your product's agent and its directory identities. Persist the following values with the agent's record before enabling message routing:

| **Stored value** | **Purpose** |
| ---- | ---- |
| Customer's tenant ID | Select the customer's tenant for routing and token acquisition. |
| Agent identity client ID | Identify the per-agent client during token acquisition. |
| Agentic User object ID | Identify the agent as a Microsoft 365 participant and select its record when routing messages. |

These are different IDs. Don't substitute the blueprint ID or user principal name for the Agentic User object ID, or assume the agent identity client ID and Agentic User object ID are interchangeable.

### Step 3: Start working with the agent

Once the agent is created:

* Lifecycle notifications start arriving at your blueprint's callback URL.
* Teams creates a one-on-one chat between the agent and its owner, and notifies the owner when the agent is ready.

Provisioning, Teams onboarding, and people-search indexing are separate asynchronous stages. Handle the `AgenticUserWorkloadOnboardingUpdated` notification and check both `workloadName` and `workloadOnboardingState` against the documented Teams workload and successful onboarding values. For handler examples, see [Agentic User lifecycle events](../lifecycle-events.md#register-handlers).

Wait for successful Teams onboarding before sending a welcome message. Search visibility can lag behind creation.

### Step 4: Add the agent to conversations

Once the agent is ready and searchable, people can add it to supported Teams conversations from the people picker, subject to tenant policy and conversation permissions. Your service can also use the applicable Microsoft Graph membership APIs. Each API requires its own permissions; provisioning an Agentic User doesn't grant membership access.

| **To do this** | **Call** |
| ---- | ---- |
| Add the agent to a team | [POST /teams/{team-id}/members](/graph/api/team-post-members) |
| Add the agent to a private or shared channel | [POST /teams/{team-id}/channels/{channel-id}/members](/graph/api/channel-post-members) |
| Add the agent to a group chat | [POST /chats/{chat-id}/members](/graph/api/chat-post-members) |
| Start a one-on-one chat between a person and the agent | [POST /chats](/graph/api/chat-post) |

Check the linked API documentation for supported membership scenarios, request bodies, permissions, and limitations.

Previous: [Set up an agent factory for Microsoft Teams](setup.md).

> [!div class="nextstepaction"]
> [Next: Route messages to each agent](route-messages.md)
