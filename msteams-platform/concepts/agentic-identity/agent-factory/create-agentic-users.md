# Create Agentic Users for your agents

Every agent that someone creates in your product gets its own Agentic User, and all of them come from your one blueprint.

*Figure 3. One blueprint, many Agentic Users.*

## Ways to create an agent

Agents can be created in any of these ways. They're separate options, not steps, so support whichever ones fit your product.

| **Option** | **Who creates the agent** | **How it works** |
|----|----|----|
| From your product | A person using your product | Your service calls the Microsoft Graph API for creating agents, as shown in the next section. |
| From the Agent Store | A person your customer's admin allowed | They create the agent from your agent factory's listing in the Agent Store in Teams. |
| From the Microsoft 365 admin center | An admin | The admin creates the agent on behalf of a manager. |

## Create an agentic user from your product

### Step 1: Call the API

When someone creates an agent in your product, call this API. Set sponsorUserIds to the person who owns the agent. The agent reports to them.

```http
POST https://graph.microsoft.com/beta/aiTeammateManagement/aiTeammates
Content-Type: application/json

{
  "agentIdentityBlueprintId": "{your-blueprint-id}",
  "displayName": "Onboarding Agent",
  "upn": "onboarding-agent@contoso.onmicrosoft.com",
  "sponsorUserIds": [ "{owner-user-id}" ],
  "usageLocation": "US"
}
```

You can also set other properties when you create the agent, such as its profile picture and email address.

### Step 2: Check the status

The API responds with 202 Accepted. To check the status of the operation, poll the URL in the Location header.

```http
HTTP/1.1 202 Accepted
Location: /beta/aiTeammateManagement/lifecycleOperations('create_{operation-id}')
```

### Step 3: Start working with the agent

Once the agent is created:

* Lifecycle notifications start arriving at your blueprint's callback URL.
* Teams creates a one-on-one chat between the agent and its owner, and notifies the owner when the agent is ready.

The owner can chat with the agent within minutes. It can take a little longer before everyone in the organization can find it in people search.

Record the agent's Agentic User ID with the agent in your product. Your service uses it to route messages.

### Step 4: Add the agent to conversations

Once the agent is ready, people can add it to any conversation from the people picker in Teams and other Microsoft 365 apps. Your service can also add it with the standard Microsoft Graph membership APIs.

| **To do this** | **Call** |
|----|----|
| Add the agent to a team | POST /teams/{team-id}/members |
| Add the agent to a private or shared channel | POST /teams/{team-id}/channels/{channel-id}/members |
| Add the agent to a group chat | POST /chats/{chat-id}/members |
| Start a one-on-one chat between a person and the agent | POST /chats |

> [!div class="nextstepaction"]
> [Next: Route messages to each agent](route-messages.md)