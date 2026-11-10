---
title: Plans and steps for Teams agents
description: Learn how Teams agents use plans and steps to show structured progress, status updates, and sources while working on a user request.
ms.date: 11/06/2026
ms.topic: article
ms.localizationpriority: high
zone_pivot_groups: teams-sdk-languages
---

# Plans and steps for Teams agents

> [!NOTE]
> In Teams SDK, structured progress is implemented with the experimental plan API. Its types and methods might change.

A plan lets a Teams agent show its progress while working on a user's request. Users can see which steps are complete, what the agent is working on, and when it needs assistance. The agent can update this progress without sending additional chat messages.

For example, an agent preparing a meeting agenda can show steps for gathering discussion topics, reviewing related documents, and putting together the agenda. As the work progresses, the agent updates each step's status and adds relevant details or sources.

Teams manages the thinking indicator, expand and collapse controls, and stop button. Your agent supplies and updates the steps, and explicitly completes the plan with a final response.

## How plans work

A plan represents the work an agent is doing to respond to a specific user message. Every plan is bound to its original prompt, including plans started later by a proactive or background worker. It contains steps that describe the work:

- Each step has its own status. Steps can run in parallel.
- The agent can add steps and update them as work progresses.
- The plan has a separate lifecycle from its steps. It remains active until the agent completes it, stops it, or reports an error.

Teams uses plan and step updates to show the agent's progress and whether it needs assistance.

:::image type="content" source="../../assets/images/agents-in-teams/agent-plans/copilot-workflow.gif" alt-text="Animated demonstration of a user request, plan progress and step updates, followed by the agent's final response." lightbox="../../assets/images/agents-in-teams/agent-plans/copilot-workflow.gif":::

## User experience

### Thinking indicator

When an agent starts a plan in response to a user message, Teams displays a thinking indicator below that message. The indicator shows a status icon and a one-line preview of the current step. In threaded channels, a reply indicator opens the thread containing the plan.

The thinking indicator is collapsed by default. Each user can independently expand or collapse it without changing the view for other participants. Participants see the same step content and statuses.

### Progress steps

Users can expand the thinking indicator to see the agent's progress and each step's status. Steps can include optional descriptions and sources.

Add or update steps as the agent works. A **Stop** button is available in the expanded view.

Teams shows the overall plan status in the header, such as **Thinking** or **Assistance Required**.

### Completed steps

When the agent explicitly completes the plan and sends its final response, the thinking indicator disappears. A collapsed **Completed steps** component appears at the bottom of the response.

Users can expand **Completed steps** to review the steps, including descriptions and sources where provided. Completed plans can't be updated.

:::image type="content" source="../../assets/images/agents-in-teams/agent-plans/plan-completed-steps-expanded.png" alt-text="Final agent response with Completed steps expanded to show the completed work." lightbox="../../assets/images/agents-in-teams/agent-plans/plan-completed-steps-expanded.png":::

### Stopped responses and errors

When a user selects **Stop**, the plan indicator disappears. Teams doesn't display a "Response stopped" message. If the agent tries to update or complete a plan after the user stops it, Teams returns a `PlanConflict` error:

```json
{
        "error": {
                "code": "PlanConflict",
                "message": "The user stopped this plan. It can no longer be updated or completed."
        }
}
```

When the agent reports a plan error, the plan indicator also disappears and Teams doesn't display a "Ran into issues" message. A stopped or errored plan is terminal and can't be updated or completed. Stopping a plan doesn't cancel your application's work or stop a response stream. Handle application cancellation and streaming separately.

## Define and update steps

Each step requires a title and status. Descriptions and sources are optional.

| Step information | Required | Description |
| --- | --- | --- |
| Title | Yes | A short description of the work represented by the step. |
| Status | Yes | Whether the step is proposed, active, completed, blocked, or in error. |
| Description | No | Additional details that users can view by expanding the step. |
| Sources | No | References supplied as citation objects. |

While the plan is active, your agent can add one or more steps or update the title, status, description, and sources of existing steps.

### Step statuses

| Status | Meaning |
| --- | --- |
| Proposed | The step is planned but hasn't started. |
| Active | The agent is executing the step. |
| Completed | The step finished successfully. |
| Blocked | The step needs user input, such as clarification or permissions. |
| Error | The step encountered a failure. |

Teams determines the thinking indicator's overall status from the highest-priority step status, in this order: **Blocked**, **Active**, **Error**, **Proposed**, **Completed**.

The illustration shows the **Proposed**, **Active**, and **Completed** states.

:::image type="content" source="../../assets/images/agents-in-teams/agent-plans/plan-step-statuses.png" alt-text="Illustration of Proposed, Active, and Completed plan step states." lightbox="../../assets/images/agents-in-teams/agent-plans/plan-step-statuses.png":::

A step in the `error` state marks that step as failed. It doesn't end the plan. Reporting an error for the plan is a separate, terminal operation that ends the entire plan and prevents further updates. While a plan is active, its displayed status is derived from its steps. After the plan reaches a terminal state, its lifecycle determines whether it can be updated.

The Bot API contract doesn't expose an operation for querying the current persisted plan state. The service checks the state internally when validating completion, but the Bot doesn't receive that state or the internal plan ID. Track the operations and step states in your application, and confirm with the SDK team before relying on a plan-state read API.

## Manage the plan lifecycle

The following flow describes how an agent manages a plan in response to a user message.

1. **Associate the plan with a user message.** In a message handler, `ctx.plan()` or `Plan.CreateFromContext(context)` creates a reactive plan associated with the incoming prompt. An agent can have only one ongoing plan per user message.
1. **Add and update steps.** Provide a title and status for each step, with optional descriptions and sources. Update steps as the work progresses.
1. **Complete the plan with a final response.** Teams doesn't infer plan completion from step statuses. Marking every step as completed before completing the plan is recommended, but not required. When the plan is completed, the Teams client renders steps with any status other than `error` as completed. Steps in the `error` state remain in that state. The client doesn't change stored statuses.

Completion, stopping, an overall error, timeout, and deletion are terminal states. Don't attempt to update a plan after it reaches a terminal state.

### Time limits

The following time limits apply to plan updates:

| Limit | Behavior |
| --- | --- |
| First update | The agent must send the first plan update within five minutes of the user's message. |
| Inactivity timeout | The plan times out after 24 hours without updates and enters an error state. |

### Edited messages

How your agent responds to an edited user message depends on the associated plan's state:

| Existing plan state | Agent behavior |
| --- | --- |
| Active | Update the current plan to reflect the edited request. |
| Completed | Create a new plan for the edited request. The new plan is separate from the completed plan and its final response. |
| Stopped or error | Create a new plan for the edited request. The new plan replaces the stopped or errored plan. |

### Deleted messages

When an associated user or agent message is deleted, its associated plans are also deleted. This applies to user, agent, administrator, and retention-driven deletion. The thinking indicator disappears, and a deleted plan can't be relinked to another response.

## Implement plans with Teams SDK

The Teams SDK exposes plans through a plan associated with the incoming message. Start a plan with one or more steps, update the steps as work progresses, and complete the plan with a final answer. The plan API is experimental, and its types and methods can change. The SDK sample projects provide end-to-end examples.

Give every step a unique ID within its plan. Keep the ID stable for the lifetime of that logical step, and don't reuse it for different work. The `version` identifies successive revisions of that step. Increment it by 1 whenever you change its status, title, description, or sources. The service uses the step ID and version to append a new step, replace it with a newer revision, or skip a revision that isn't newer. A step requires an ID, version, title, and status. Description and sources are optional.

### Start a plan, update a step, and send an answer

The following examples start a plan with an active step, mark the step complete, and send a final answer.

::: zone pivot="teams-sdk-csharp"

The following project-file setting suppresses the `ExperimentalTeamsPlan` diagnostic for this sample. It doesn't enable the API or change its experimental status:

```xml
<PropertyGroup>
    <NoWarn>$(NoWarn);ExperimentalTeamsPlan</NoWarn>
</PropertyGroup>
```

```csharp
using Microsoft.Teams.Apps;
using Microsoft.Teams.Apps.Schema.Entities;

teams.OnMessage(async (context, ct) =>
{
        Plan plan = Plan.CreateFromContext(context);
        PlanStep step = new()
        {
                Id = "answer",
                Version = 1,
                Title = "Prepare answer",
                Status = PlanStepStatuses.Active
        };

        await plan.StartAsync([step], ct);

        string answer = "Here is your answer.";
        step.Status = PlanStepStatuses.Completed;
        step.Version++;
        await plan.UpdateAsync([step], ct);
        await plan.CompleteAsync(answer, ct);
});
```

::: zone-end

::: zone pivot="teams-sdk-typescript"

```typescript
import type { Step } from '@microsoft/teams.api';

app.on('message', async (ctx) => {
    const plan = ctx.plan();
    const step: Step = {
        id: 'answer',
        version: 1,
        title: 'Prepare answer',
        status: 'active',
    };

    await plan.start([step]);

    const answer = 'Here is your answer.';
    await plan.update([{ ...step, version: 2, status: 'completed' }]);
    await plan.complete(answer);
});
```

::: zone-end

::: zone pivot="teams-sdk-python"

```python
from microsoft_teams.api import MessageActivity, Step
from microsoft_teams.apps import ActivityContext

@app.on_message
async def handle_message(ctx: ActivityContext[MessageActivity]) -> None:
        plan = ctx.plan()
        step = Step(id="answer", version=1, title="Prepare answer", status="active")
        await plan.start([step])

        answer = "Here is your answer."
        completed_step = step.model_copy(update={"version": 2, "status": "completed"})
        await plan.update([completed_step])
        await plan.complete(answer)
```

::: zone-end

Send plan updates sequentially. Wait for each update call to finish before sending the next. The SDK doesn't order overlapping calls or automatically resolve conflicts.

### Send or stream the final answer

Use `plan.complete(answer)` when the complete answer is ready to send as one message. Use response streaming when you want users to receive the answer progressively as it's generated. The difference is how the answer is delivered: one message at once or progressively as it is generated. Use only one path for an answer.

When using a plan with response streaming, start the plan first, skip informative updates, and attach the plan completion metadata to the final streamed message. Emit the completion metadata after all answer text. Stopping the plan doesn't stop the response stream. Your application must handle both lifecycles.

The `completion()` or `Completion()` helper creates a new message bound to the original prompt and carrying completion metadata. It doesn't send a message or close a stream. The stream must target the same conversation as the plan. The Bot API contract confirms completion with a normal final-message `POST`. Although the SDK samples attach completion metadata to a final-stream `PUT`, the contract supplied for this article doesn't confirm that the service completes the plan on this path. Confirm end-to-end support before relying on streamed plan completion in production.

Python and TypeScript close the stream automatically after a normal handler return. Explicitly await `ctx.stream.close()` if you need to handle final-send errors inside the handler or finish one response before starting another.

::: zone pivot="teams-sdk-csharp"

In C#, explicitly finalize the writer with the plan completion activity. Creating a plan or returning from the handler doesn't close the writer.

```csharp
TeamsStreamingWriter writer = TeamsStreamingWriter.CreateFromContext(context);
await writer.AppendResponseAsync("Here is ", ct);
await writer.AppendResponseAsync("your answer.", ct);
await writer.FinalizeResponseAsync(plan.Completion(), ct);
```

::: zone-end

::: zone pivot="teams-sdk-typescript"

```typescript
ctx.stream.emit('Here is ');
ctx.stream.emit('your answer.');
ctx.stream.emit(plan.completion());
```

::: zone-end

::: zone pivot="teams-sdk-python"

```python
ctx.stream.emit("Here is ")
ctx.stream.emit("your answer.")
ctx.stream.emit(plan.completion())
```

::: zone-end

### Stop or report a plan error with the Bot API

Use a terminal plan outcome when work is stopped or fails instead of completing it with an answer.

::: zone pivot="teams-sdk-csharp"

```csharp
await plan.StopAsync(ct);
await plan.ErrorAsync(ct);
```

::: zone-end

::: zone pivot="teams-sdk-typescript"

```typescript
await plan.stop();
await plan.error();
```

::: zone-end

::: zone pivot="teams-sdk-python"

```python
await plan.stop()
await plan.error()
```

::: zone-end

These methods don't accept a reason string or cancel your application's work. To describe a failure, it's recommended that you first update the affected step with a higher version, an `error` status, and a description, then report the Plan error.

`PlanConflict` is an HTTP `409` for different plan conflicts, including a stopped or already completed plan, a version race, or an operation that's invalid for the current state. Don't blindly retry terminal-state conflicts. For a version-race response, the Bot API response message says to retry the request. Log the service error details and handle the specific response. A lost version race doesn't by itself mean that the plan is terminal.

### Proactive plans and background work

You can create and manage a plan outside an activity handler, such as from a scheduled job, queue consumer, or background worker. Starting a plan inside a message handler is reactive, even if the handler later returns and work continues in the background. A proactive worker doesn't need the original handler or activity context, but it still needs the original prompt binding.

Before scheduling the work, save the routing metadata required to bind the plan to the original prompt:

- The full conversation ID, including any channel thread suffix.
- The original prompt activity ID as `replyToId`. Don't substitute the bot's answer ID or a stream ID.
- For a reply in a one-to-one chat thread, the reply-chain binding with the chat or channel ID and root message ID. Omit `replyChain` for a channel thread or a top-level chat message.
- The service URL and identity information needed to create an authenticated SDK client scoped to the original conversation.

For example, the serialized routing metadata for a one-to-one chat thread can look like this:

```json
{
        "conversationId": "a:opaque-conversation",
        "replyToId": "original-prompt-id",
        "replyChain": {
                "chatOrChannelId": "19:chat@thread.v2",
                "replyChainId": "root-message-id"
        }
}
```

When a `replyChain` binding is present, completing the plan posts the final message to that thread. Plan operations, such as starting and updating steps, remain conversation-level activities. Plan positioning and message streaming are configured separately.

When the worker runs, create a scoped, authenticated API client and reconstruct the plan from the saved binding. The SDK doesn't persist plans or steps or retain the incoming handler context. Your application owns job scheduling, cancellation, and recovery. Store only serializable routing metadata with the job. Don't store credentials or the runtime API client.

::: zone pivot="teams-sdk-csharp"

```csharp
PlanOptions options = JsonSerializer.Deserialize<PlanOptions>(savedPlan)
        ?? throw new InvalidOperationException("The saved plan binding is missing.");

Plan plan = new(apiClient, options);
await plan.StartAsync(
[
        new PlanStep
        {
                Id = "report",
                Version = 1,
                Status = PlanStepStatuses.Active,
                Title = "Preparing report",
                Description = "Preparing the report in the background."
        }
], cancellationToken);

// Perform background work...

await plan.UpdateAsync(
[
        new PlanStep
        {
                Id = "report",
                Version = 2,
                Status = PlanStepStatuses.Completed,
                Title = "Report ready",
                Description = "The background report is ready."
        },
        new PlanStep
        {
                Id = "deliver",
                Version = 1,
                Status = PlanStepStatuses.Active,
                Title = "Delivering report",
                Description = "Delivering the report to the user."
        }
], cancellationToken);

// Perform additional background work...

await plan.UpdateAsync(
[
        new PlanStep
        {
                Id = "deliver",
                Version = 2,
                Status = PlanStepStatuses.Completed,
                Title = "Report delivered",
                Description = "The report was delivered successfully."
        }
], cancellationToken);

await plan.CompleteAsync("Your background report is ready.", cancellationToken);
```

::: zone-end

::: zone pivot="teams-sdk-typescript"

```typescript
import { Client } from '@microsoft/teams.api';
import { Plan, PlanOptions } from '@microsoft/teams.apps';

type SavedPlanBinding = Omit<PlanOptions, 'apiClient'>;

async function runPlanJob(savedPlan: SavedPlanBinding, apiClient: Client) {
    const plan = new Plan({ ...savedPlan, apiClient });

    await plan.start([
        {
            id: 'report',
            version: 1,
            status: 'active',
            title: 'Preparing report',
            description: 'Preparing the report in the background.',
        },
    ]);

    // Perform background work...

    await plan.update([
        {
            id: 'report',
            version: 2,
            status: 'completed',
            title: 'Report ready',
            description: 'The background report is ready.',
        },
        {
            id: 'deliver',
            version: 1,
            status: 'active',
            title: 'Delivering report',
            description: 'Delivering the report to the user.',
        },
    ]);

    // Perform additional background work...

    await plan.update([
        {
            id: 'deliver',
            version: 2,
            status: 'completed',
            title: 'Report delivered',
            description: 'The report was delivered successfully.',
        },
    ]);

    await plan.complete('Your background report is ready.');
}
```

::: zone-end

::: zone pivot="teams-sdk-python"

```python
from typing import Any

from microsoft_teams.api import ApiClient, Step
from microsoft_teams.apps import Plan, PlanOptions

async def run_plan_job(saved_plan: dict[str, Any], api_client: ApiClient) -> None:
        options = PlanOptions(**saved_plan, api_client=api_client)
        plan = Plan(**options)

        await plan.start(
                [
                        Step(
                                id="report",
                                version=1,
                                status="active",
                                title="Preparing report",
                                description="Preparing the report in the background.",
                        )
                ]
        )

        # Perform background work...

        await plan.update(
                [
                        Step(
                                id="report",
                                version=2,
                                status="completed",
                                title="Report ready",
                                description="The background report is ready.",
                        ),
                        Step(
                                id="deliver",
                                version=1,
                                status="active",
                                title="Delivering report",
                                description="Delivering the report to the user.",
                        ),
                ]
        )

        # Perform additional background work...

        await plan.update(
                [
                        Step(
                                id="deliver",
                                version=2,
                                status="completed",
                                title="Report delivered",
                                description="The report was delivered successfully.",
                        )
                ]
        )

        await plan.complete("Your background report is ready.")
```

::: zone-end

## Use the Bot API without Teams SDK

If your agent doesn't use Teams SDK, send plan data in the `planInfo` entity on the Bot API activity. The activity must include `replyToId`, the ID of the user message the plan answers. Include at most one `planInfo` entity per activity. Plans aren't supported on targeted activities, activity edits, or `CreateConversation` activities.

Use `type: "typing"` for `start`, `continue`, `stop`, and `error` operations. Start and continue require one or more complete step states and don't include `text`. Stop and error don't include `text` or `steps`. Use `type: "message"` with the final answer and `planType: "complete"` to complete the plan.

### Start a plan

```http
POST /v3/conversations/{conversationId}/activities
```

```json
{
        "type": "typing",
        "replyToId": "prompt-message-id",
        "entities": [
                {
                        "type": "planInfo",
                        "planType": "start",
                        "steps": [
                                {
                                        "id": "step-1",
                                        "version": 1,
                                        "status": "active",
                                        "title": "Review the source material"
                                }
                        ]
                }
        ]
}
```

### Update steps

Send the full desired state for each step you add or update. Keep each step ID stable, and increment its version by 1 when any of its fields change. The service compares the ID and version to append a new step, replace a step with a newer revision, or skip a revision that isn't newer. The Bot API doesn't read the plan before each update, so wait for each `continue` request to succeed before sending the next operation.

```http
POST /v3/conversations/{conversationId}/activities
```

```json
{
        "type": "typing",
        "replyToId": "prompt-message-id",
        "entities": [
                {
                        "type": "planInfo",
                        "planType": "continue",
                        "steps": [
                                {
                                        "id": "step-1",
                                        "version": 2,
                                        "status": "completed",
                                        "title": "Review the source material"
                                },
                                {
                                        "id": "step-2",
                                        "version": 1,
                                        "status": "active",
                                        "title": "Prepare the answer"
                                }
                        ]
                }
        ]
}
```

Steps can include optional `description` and `sources`. Sources use `title`, `url`, and optional `icon`, and are allowed only on steps whose status is `completed`.

### Complete a plan

For a nonstreamed answer, send the final message with `planType: "complete"` and no `steps`:

```http
POST /v3/conversations/{conversationId}/activities
```

```json
{
        "type": "message",
        "replyToId": "prompt-message-id",
        "text": "Here is the final answer.",
        "entities": [
                {
                        "type": "planInfo",
                        "planType": "complete"
                }
        ]
}
```

For a streamed final answer, include `planInfo` on the final message alongside the final `streamInfo` entity. Intermediate stream messages don't complete the plan. The Bot API contract supplied for this article doesn't confirm that the service completes the plan on a final-stream message.

### Stop a plan or report an error

Send a typing activity with `planType: "stop"` or `planType: "error"`. Do not include `text` or `steps`. Both operations stop the plan. A later plan update or completion can return `409 PlanConflict`.

### Responses and conflicts

Successful `start`, `continue`, `stop`, and `error` operations return `202 Accepted` with no body. A successful complete returns the existing final-message response. The Bot API contract defines these `PlanConflict` cases:

| Scenario | HTTP status | Bot-facing message |
| --- | --- | --- |
| User stopped the plan | `409` | `The user stopped this plan. It can no longer be updated or completed.` |
| Plan was stopped by the Bot or after a Bot error | `409` | The response explains that the plan was stopped and can no longer be updated or completed. |
| Plan was already completed | `409` | `This plan is already complete. It can no longer be updated.` |
| A version race was lost | `409` | `This plan changed during the request. Retry the request.` |
| Operation isn't allowed in the current state | `409` | `Plan state does not allow this operation.` |

`PlanConflict` doesn't always mean that the user stopped the plan. Use the response message to distinguish terminal states from a version-race conflict. The Bot API contract doesn't define an operation for reading the current plan state. Track the operations and step states your application sends.

## Code samples

| Sample | Description | C# | TypeScript | Python |
| --- | --- | --- | --- | --- |
| Teams SDK plan sample | Demonstrates creating and updating a plan, completing it with a final answer, and streaming completion metadata. | [View](https://github.com/microsoft/teams.net/tree/main/samples/PlanBot) | [View](https://github.com/microsoft/teams.ts/tree/main/examples/plan) | [View](https://github.com/microsoft/teams.py/tree/main/examples/plan) |

## See also

- [Build conversational capability](../../bots/build-conversational-capability.md)
- [AI content labels](ai-content-labels.md)
- [Best practices and features checklist for Teams agents](../../bots/how-to/teams-conversational-ai/agents-best-practices-features-checklist.md)
