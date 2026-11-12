---
title: Agentic User lifecycle events
description: Handle Agentic User creation, updates, enablement, deletion, restoration, and workload onboarding.
ms.topic: article
zone_pivot_groups: teams-sdk-languages
ms.date: 11/11/2026
---

# Agentic User lifecycle events

Agent 365 sends lifecycle events when an Agentic User is created or when its identity, manager, availability, deletion status, or workload onboarding changes. These events let your app keep its state and behavior synchronized with Microsoft 365.

For example, your app can initialize per-agent storage after creation, update ownership when the manager changes, pause scheduled work when the Agentic User is disabled, clean up access after deletion, and wait for Teams onboarding before sending messages.

## Supported events

| Event                         | Typical use                                           |
| ----------------------------- | ----------------------------------------------------- |
| Agentic User identity created | Initialize per-agent configuration and state          |
| Identity property updated     | Refresh mail, alias, or user principal name data      |
| Manager updated               | Update ownership, approval, or escalation routing     |
| Enabled                       | Resume work for the Agentic User                      |
| Disabled                      | Stop scheduled or proactive work                      |
| Deleted                       | Disable access and begin cleanup                      |
| Undeleted                     | Restore state after the Agentic User is restored      |
| Workload onboarding updated   | Wait for Teams onboarding to succeed before messaging |

The event names in activity payloads use `AgenticUser*`, such as `AgenticUserIdentityCreated` and `AgenticUserDisabled`.

## Register handlers

Register a general handler when you need common processing for every lifecycle event. Register typed handlers when you need the payload for a specific variant.

::: zone pivot="teams-sdk-csharp"

```csharp
teamsApp.OnAgentLifecycle((context, _) =>
{
    context.Log.LogInformation(
        "Lifecycle event: {ValueType}",
        context.Activity.ValueType);
    return Task.CompletedTask;
});

teamsApp.OnAgenticUserIdentityCreated((context, _) =>
{
    context.Log.LogInformation(
        "Agentic User created: {AgenticUserId}",
        context.Activity.Value?.AgenticUserId);
    return Task.CompletedTask;
});

teamsApp.OnAgenticUserIdentityUpdated((context, _) =>
{
    context.Log.LogInformation(
        "Agentic User identity updated: {UpdatedProperty}",
        context.Activity.Value?.UpdatedProperty);
    return Task.CompletedTask;
});

teamsApp.OnAgenticUserManagerUpdated((context, _) =>
{
    context.Log.LogInformation(
        "Agentic User manager updated: {Manager}",
        context.Activity.Value?.Manager);
    return Task.CompletedTask;
});

teamsApp.OnAgenticUserEnabled((context, _) =>
{
    context.Log.LogInformation(
        "Agentic User enabled: {AgenticUserId}",
        context.Activity.Value?.AgenticUserId);
    return Task.CompletedTask;
});

teamsApp.OnAgenticUserDisabled((context, _) =>
{
    context.Log.LogInformation(
        "Agentic User disabled: {AgenticUserId}",
        context.Activity.Value?.AgenticUserId);
    return Task.CompletedTask;
});

teamsApp.OnAgenticUserDeleted((context, _) =>
{
    context.Log.LogInformation(
        "Agentic User deleted: {DeletionReason}",
        context.Activity.Value?.DeletionReason);
    return Task.CompletedTask;
});

teamsApp.OnAgenticUserUndeleted((context, _) =>
{
    context.Log.LogInformation(
        "Agentic User restored: {AgenticUserId}",
        context.Activity.Value?.AgenticUserId);
    return Task.CompletedTask;
});

teamsApp.OnAgenticUserWorkloadOnboardingUpdated((context, _) =>
{
    context.Log.LogInformation(
        "Agentic User workload onboarding updated: {WorkloadName} ({State})",
        context.Activity.Value?.WorkloadName,
        context.Activity.Value?.WorkloadOnboardingState);
    return Task.CompletedTask;
});
```

::: zone-end

::: zone pivot="teams-sdk-typescript"

```typescript
app.on('agentLifecycle', async (ctx) => {
  ctx.log.info('Lifecycle event received', {
    valueType: ctx.activity.valueType,
    agenticUserId: ctx.activity.value.agenticUserId,
  });

  // Continue so the matching typed handler can also run.
  await ctx.next();
});

app.on('agenticUserIdentityCreated', ({ activity, log }) => {
  log.info('Agentic User created', { agenticUserId: activity.value.agenticUserId });
});

app.on('agenticUserIdentityUpdated', ({ activity, log }) => {
  log.info('Agentic User identity updated', {
    updatedProperty: activity.value.updatedProperty,
  });
});

app.on('agenticUserManagerUpdated', ({ activity, log }) => {
  log.info('Agentic User manager updated', { manager: activity.value.manager });
});

app.on('agenticUserEnabled', ({ activity, log }) => {
  log.info('Agentic User enabled', { agenticUserId: activity.value.agenticUserId });
});

app.on('agenticUserDisabled', ({ activity, log }) => {
  log.info('Agentic User disabled', { agenticUserId: activity.value.agenticUserId });
});

app.on('agenticUserDeleted', ({ activity, log }) => {
  log.info('Agentic User deleted', { deletionReason: activity.value.deletionReason });
});

app.on('agenticUserUndeleted', ({ activity, log }) => {
  log.info('Agentic User restored', { agenticUserId: activity.value.agenticUserId });
});

app.on('agenticUserWorkloadOnboardingUpdated', ({ activity, log }) => {
  log.info('Agentic User workload onboarding updated', {
    workloadName: activity.value.workloadName,
    workloadOnboardingState: activity.value.workloadOnboardingState,
  });
});
```

::: zone-end

::: zone pivot="teams-sdk-python"

```python
from microsoft_teams.api import (
    AgenticUserDeletedActivity,
    AgenticUserDisabledActivity,
    AgenticUserEnabledActivity,
    AgenticUserIdentityCreatedActivity,
    AgenticUserIdentityUpdatedActivity,
    AgenticUserManagerUpdatedActivity,
    AgenticUserUndeletedActivity,
    AgenticUserWorkloadOnboardingUpdatedActivity,
    AgentLifecycleEventActivity,
)
from microsoft_teams.apps import ActivityContext


@app.on_agent_lifecycle
async def handle_lifecycle(
    ctx: ActivityContext[AgentLifecycleEventActivity],
) -> None:
    ctx.logger.info("Lifecycle event: %s", ctx.activity.value_type)

    # Continue so the matching typed handler can also run.
    await ctx.next()


@app.on_agentic_user_identity_created
async def handle_created(
    ctx: ActivityContext[AgenticUserIdentityCreatedActivity],
) -> None:
    ctx.logger.info("Agentic User created: %s", ctx.activity.value.agentic_user_id)


@app.on_agentic_user_identity_updated
async def handle_identity_updated(
    ctx: ActivityContext[AgenticUserIdentityUpdatedActivity],
) -> None:
    ctx.logger.info(
        "Agentic User identity updated: %s",
        ctx.activity.value.updated_property,
    )


@app.on_agentic_user_manager_updated
async def handle_manager_updated(
    ctx: ActivityContext[AgenticUserManagerUpdatedActivity],
) -> None:
    ctx.logger.info("Agentic User manager updated: %s", ctx.activity.value.manager)


@app.on_agentic_user_enabled
async def handle_enabled(
    ctx: ActivityContext[AgenticUserEnabledActivity],
) -> None:
    ctx.logger.info("Agentic User enabled: %s", ctx.activity.value.agentic_user_id)


@app.on_agentic_user_disabled
async def handle_disabled(
    ctx: ActivityContext[AgenticUserDisabledActivity],
) -> None:
    ctx.logger.info("Agentic User disabled: %s", ctx.activity.value.agentic_user_id)


@app.on_agentic_user_deleted
async def handle_deleted(
    ctx: ActivityContext[AgenticUserDeletedActivity],
) -> None:
    ctx.logger.info("Agentic User deleted: %s", ctx.activity.value.deletion_reason)


@app.on_agentic_user_undeleted
async def handle_undeleted(
    ctx: ActivityContext[AgenticUserUndeletedActivity],
) -> None:
    ctx.logger.info("Agentic User restored: %s", ctx.activity.value.agentic_user_id)


@app.on_agentic_user_workload_onboarding_updated
async def handle_workload_onboarding_updated(
    ctx: ActivityContext[AgenticUserWorkloadOnboardingUpdatedActivity],
) -> None:
    ctx.logger.info(
        "Agentic User workload onboarding updated: %s (%s)",
        ctx.activity.value.workload_name,
        ctx.activity.value.workload_onboarding_state,
    )
```

::: zone-end
