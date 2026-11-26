---
title: Handle lifecycle notifications in your agent factory
description: Handle Agentic User lifecycle notifications in a Teams agent factory to synchronize ownership, workload readiness, disablement, deletion, and restoration.
ms.topic: article
ms.date: 11/15/2026
ms.author: umangsehgal
author: umangsehgal
---

# Handle lifecycle notifications in your agent factory

This article is part 5 of the [Build an agent factory with Agentic Users in Teams](build-agent-factory.md) series.

For each Agentic User mapped to your service, Microsoft 365 sends notifications when something changes. Examples include changes to the agent's profile, such as its name, email address, or manager; changes to its workload onboarding; or an admin disabling or deleting it. Teams also sends conversation updates when the agent is added to or removed from a supported conversation. Conversation updates are separate from Agentic User lifecycle notifications.

The events your service handles depend on the agent's business logic and scenarios. At a minimum, handle message activities delivered to your service when people post or reply in conversations that include the agent. For message handling, see [Route messages in your Teams agent factory](route-messages.md).

A basic message handler can reply without custom lifecycle handlers. A factory that stores per-agent state or schedules work should also handle the events that affect ownership, readiness, and access. Stop scheduled work when an agent is disabled or deleted.

## Notifications your service receives

| **Notification** | **Sent when** |
| ---- | ---- |
| Agentic User identity created | The agent's Agentic User is created. |
| Workload onboarding updated | The agent's onboarding to a workload, such as Teams, changes state. |
| Identity property updated | The agent's mail address, alias, or user principal name changes. |
| Manager updated | The agent gets a new manager. |
| Disabled or enabled | An admin disables or re-enables the agent. |
| Deleted or undeleted | The agent is deleted or restored. |
| Conversation update | Conversation membership changes, such as when the agent is added to or removed from a supported Teams conversation. This is separate from the Agentic User lifecycle events. |

## Handle a notification

Register typed handlers for the events your service needs. For example, pause an agent's scheduled work while it's disabled:

# [C#](#tab/csharp)

The C# example assumes a configured `teamsApp` and an `ILogger` named `logger` obtained through dependency injection.

```csharp
using Microsoft.Extensions.Logging;

teamsApp.OnAgenticUserDisabled(async (context, cancellationToken) =>
{
    var tenantId = context.Activity.Value?.TenantId;
    var agenticUserId = context.Activity.Value?.AgenticUserId;
    if (string.IsNullOrWhiteSpace(tenantId) ||
        string.IsNullOrWhiteSpace(agenticUserId))
    {
        logger.LogWarning("Ignoring a notification without an agent or tenant ID.");
        return;
    }

    await scheduler.PauseAsync(tenantId, agenticUserId, cancellationToken);
});
```

# [TypeScript](#tab/typescript)

```typescript
import { App } from '@microsoft/teams.apps';

const app = new App();

app.on('agenticUserDisabled', async ({ activity, log }) => {
  const tenantId = activity.value.tenantId;
  const agenticUserId = activity.value.agenticUserId;
  if (!tenantId?.trim() || !agenticUserId?.trim()) {
    log.warn('Ignoring a notification without an agent or tenant ID.');
    return;
  }

  await scheduler.pause(tenantId, agenticUserId);
});
```

# [Python](#tab/python)

```python
from microsoft_teams.api import AgenticUserDisabledActivity
from microsoft_teams.apps import ActivityContext, App

app = App()


@app.on_agentic_user_disabled
async def handle_disabled(ctx: ActivityContext[AgenticUserDisabledActivity]) -> None:
    tenant_id = ctx.activity.value.tenant_id
    agentic_user_id = ctx.activity.value.agentic_user_id
    if (
        not tenant_id
        or not tenant_id.strip()
        or not agentic_user_id
        or not agentic_user_id.strip()
    ):
        ctx.logger.warning("Ignoring a notification without an agent or tenant ID.")
        return

    await scheduler.pause(tenant_id, agentic_user_id)
```

---

The scheduler is your service's own job scheduler. Its pause operation must apply only to the matching tenant and Agentic User. Make handlers safe to run more than once, and check the agent's current enabled and deleted state before executing queued work. Don't resume work until the identity is enabled, onboarding has succeeded, and your product's authorization checks pass.

For every lifecycle notification and its payload, see [Agentic User lifecycle events](../lifecycle-events.md). For recommended responses, see [Best practices for Teams agent factories](best-practices.md).

Previous: [Route messages in your Teams agent factory](route-messages.md).

> [!div class="nextstepaction"]
> [Next: Best practices](best-practices.md)
