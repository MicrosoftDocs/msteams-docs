# Best practices

You don't need these recommendations to get an agent working, but they make your agents better teammates and your agent factory easier to run.

## Introduce the agent

* Send a short hello when the agent is created, in its one-on-one chat with its owner, and whenever it's added to a new conversation. Say what it can help with, and suggest a first task.
* When the agent's manager changes, have it introduce itself to its new manager and refresh what it knows about them.

## Give each agent a clear profile

When you create an agent, give it a recognizable name, description, and profile picture, so people pick the right one in the people picker.

## Let the manager set boundaries

Let each agent's manager decide how the agent responds when other people contact it.

## Keep each agent's context separate

* Key each agent's records by its Agentic User ID, and store the tenant ID with them.
* In each turn, load only that agent's instructions, knowledge, tools, and memory. One agent should never read another agent's conversations or data, even in the same organization.
* If no agent matches an Agentic User ID, log it and stop. Don't fall back to another agent's logic.
* Include the Agentic User ID in your logs and telemetry, so every action traces back to one agent.

## React to lifecycle notifications

| **Notification** | **What your service can do** |
| ---- | ---- |
| Agentic User identity created | Create or link the agent's record, and initialize its configuration and state. |
| Identity property updated | Refresh the stored mail address, alias, or user principal name. |
| Manager updated | Update the agent's owner, and send approvals and escalations to the new manager. |
| Disabled | Pause the agent's scheduled and proactive work. |
| Enabled | Resume the agent's work. |
| Deleted | Stop the agent, remove its access to your product's resources, and start cleanup. |
| Undeleted | Restore the agent's state. |

## Plan for deletion

Deleting an Agentic User doesn't delete the agent in your product. Keep the agent's configuration and memory long enough to restore it if its Agentic User is undeleted, and then delete that data. When someone deletes an agent in your product, also remove its Agentic User from the customer's tenant.

## Protect credentials and tokens

* Store your blueprint's credentials and any tokens you cache in secure storage, such as Azure Key Vault or an encrypted Azure Cosmos DB database.
* In production, authenticate the blueprint with a managed identity or a certificate. Use client secrets only during development.

> [!div class="nextstepaction"]
> [Next: Agent factory FAQ](faq.md)
