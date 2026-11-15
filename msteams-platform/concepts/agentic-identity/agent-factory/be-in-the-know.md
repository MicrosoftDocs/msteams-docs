# Be in the know

For each Agentic User your service administers, Microsoft 365 notifies your service in real time when something changes: the agent is added to a conversation, its name, email address, or manager changes, or an admin disables or deletes it.

You don't have to handle any of these notifications. An agent works without them: when someone messages it, your service receives the message and replies. Handle only the ones that matter to your product.

## Notifications your service receives

| **Notification** | **Sent when** |
|----|----|
| Agentic User identity created | The agent's Agentic User is created. |
| Workload onboarding updated | The agent's onboarding to a workload, such as Teams, changes state. |
| Identity property updated | The agent's mail address, alias, or user principal name changes. |
| Manager updated | The agent gets a new manager. |
| Disabled or enabled | An admin disables or re-enables the agent. |
| Deleted or undeleted | The agent is deleted or restored. |
| Conversation update | Someone adds the agent to a chat, channel, or meeting. |

## Handle a notification

Register handlers only for the notifications you care about. For example, to pause an agent's scheduled work while it's disabled:

```typescript
app.on('agenticUserDisabled', async ({ activity }) => {
  // Optional: pause this agent's scheduled work while it's disabled.
  await scheduler.pause(activity.value.agenticUserId);
});
```

For every notification and its payload, see Agentic User lifecycle events. For what to do with them, see Best practices.

> [!div class="nextstepaction"]
> [Next: Best practices](best-practices.md)