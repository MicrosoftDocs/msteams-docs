---
title: Chain of Thought for Teams Agents
description: Learn how Chain of Thought lets Teams agents show structured progress steps, status updates, and sources while working on a user request.
ms.date: 11/03/2026
ms.topic: article
ms.localizationpriority: high
zone_pivot_groups: teams-sdk-languages
---

# Chain of Thought for Teams agents

> [!NOTE]
> In Teams SDK, structured progress is implemented with the **Plan** API. The API is experimental and might change.

Chain of Thought (CoT) lets a Teams agent show its progress as a structured list of steps while working on a user's request. Each step has a title and status, and can include a description and source citations. Users can expand the progress indicator to see what the agent is doing and review completed steps alongside the final response.

For example, an agent preparing a meeting agenda can show steps for gathering discussion topics, reviewing related documents, and putting together the agenda. As the work progresses, the agent updates each step's status and adds relevant details or sources.

Teams manages the thinking indicator, expand and collapse controls, and stop button. Your agent supplies the steps and their updates, and explicitly signals completion with a final response.

## User experience

### Thinking indicator

When an agent starts a CoT in response to a user message, Teams displays a thinking indicator below that message. The indicator shows a status icon and a one-line preview of the current step. In threaded channels, a reply indicator opens the thread containing the CoT.

The thinking indicator is collapsed by default. Each user can independently expand or collapse it without changing the view for other participants. Participants see the same step content and statuses.

### Progress steps

Expanding the thinking indicator reveals a list of steps with status icons and titles. Users can expand steps that contain additional details to view their descriptions and sources.

The agent can add steps as work progresses and update existing steps. Steps can run in parallel, they don't have to complete one at a time. A **Stop** button is available in the expanded view.

Although steps can run in parallel, send updates to the same Plan one at a time. Wait for each call to finish before sending the next. The SDK doesn't order overlapping calls or automatically resolve conflicts.

The expanded header reflects the overall status, such as **Thinking**, **Assistance Required**, or **Ran into issues**.

### Completed steps

When the agent explicitly completes the CoT and sends its final response, the thinking indicator disappears. A collapsed **Completed steps** component appears at the bottom of the response.

Users can expand **Completed steps** to review the steps, including descriptions and sources where provided. Completed CoTs can't be updated.

### Stopped responses and errors

When a user selects **Stop**, the CoT ends and the indicator is replaced with **Response stopped by [User Name]**. In the initial experience described by the specification, individual steps aren't shown after stopping.

If the agent sets the CoT to an error state, the indicator is replaced with **Ran into issues**. The initial error experience also hides individual steps. A stopped or errored CoT doesn't produce a final response through the CoT completion flow and can't receive further updates.

## Define and update steps

Each step requires a title and status. Descriptions and sources are optional.

| Step information | Required | Description |
| --- | --- | --- |
| Title | Yes | A short description of the work represented by the step. |
| Status | Yes | Whether the step is proposed, active, completed, blocked, or in error. |
| Description | No | Additional details that users can view by expanding the step. |
| Sources | No | References supplied as citation objects. |

While the CoT is active, your agent can add one or more steps or update the title, status, description, and sources of existing steps.

### Step statuses

| Status | Meaning |
| --- | --- |
| Proposed | The step is planned but hasn't started. |
| Active | The agent is executing the step. |
| Completed | The step finished successfully. |
| Blocked | The step needs user input, such as clarification or permissions. |
| Error | The step encountered a failure. |

Teams determines the thinking indicator's overall status from the highest-priority step status, in this order: **Blocked**, **Active**, **Error**, **Proposed**, **Completed**.

A step in the error state isn't the same as setting the entire CoT to an error state. The latter ends the CoT and prevents further updates.

## Manage the CoT lifecycle

The following flow describes how an agent manages a Plan in response to a user message.

1. **Associate the Plan with a user message.** In a message handler, `ctx.plan()` or `Plan.CreateFromContext(context)` creates a reactive Plan associated with the incoming prompt. An agent can have only one ongoing Plan per user message.
1. **Add and update steps.** Provide a title and status for each step, with optional descriptions and sources. Update steps as the work progresses.
1. **Complete the Plan with a final response.** Teams doesn't infer Plan completion from step statuses. Marking every step as completed before completing the Plan is recommended, but not required. When the Plan is completed, the Teams client renders its steps as completed without changing their stored statuses.

Completion, stopping, an overall error, timeout, and deletion are terminal states. Don't attempt to update a CoT after it reaches a terminal state.

### Time limits

The following time limits apply to CoT updates:

| Limit | Behavior |
| --- | --- |
| First update | The agent must send the first CoT update within five minutes of the user's message. |
| Inactivity timeout | The CoT times out after 24 hours without updates. Teams treats the timeout as an error and displays **Ran into issues**. |

### Edited messages

How your agent responds to an edited user message depends on the associated CoT's state:

| Existing CoT state | Agent behavior |
| --- | --- |
| Active | Update the current CoT to reflect the edited request. |
| Completed | Create a new CoT for the edited request. The new CoT is separate from the completed CoT and its final response. |
| Stopped or error | Create a new CoT for the edited request. The new CoT replaces the stopped or errored CoT. |

### Deleted messages

When an associated user or agent message is deleted, its associated CoTs are also deleted. This applies to user, agent, administrator, and retention-driven deletion. The thinking indicator disappears, and a deleted CoT can't be relinked to another response.

## Implement CoT with Teams SDK

The Teams SDK exposes CoT through a Plan associated with the incoming message. Start a Plan with one or more steps, update the steps as work progresses, and complete the Plan with a final answer. The Plan API is experimental, and its types and methods can change. For end-to-end examples, see the SDK sample projects in the following table.

Give every step a unique ID within its Plan. Keep the ID stable for the lifetime of that logical step, and don't reuse it for different work. Increment its version whenever you change its status, title, description, or sources. A step requires an ID, version, title, and status; description and sources are optional.

### Start a Plan, update a step, and send an answer

The following examples start a Plan with an active step, mark the step complete, and send a final answer.

::: zone pivot="teams-sdk-csharp"

Enable the experimental API diagnostic in your project file:

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

### Stream the final answer

You can stream the answer after updating the Plan. Use the same conversation stream and emit the Plan completion metadata after all answer text, as the final item. Don't call both the direct Plan completion method and the streamed completion path for the same answer.

The `completion()` or `Completion()` helper creates a new message bound to the original prompt and carrying completion metadata. It doesn't send a message or close a stream. The stream must target the same conversation as the Plan.

Python and TypeScript close the stream automatically after a normal handler return. Explicitly await `ctx.stream.close()` if you need to handle final-send errors inside the handler or finish one response before starting another.

::: zone pivot="teams-sdk-csharp"

In C#, explicitly finalize the writer with the Plan completion activity. Creating a Plan or returning from the handler doesn't close the writer.

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

### Stop a Plan or report an error

Use a terminal Plan outcome when work is stopped or fails instead of completing it with an answer.

| Outcome | Python | TypeScript | C# |
| --- | --- | --- | --- |
| Stop | `await plan.stop()` | `await plan.stop()` | `await plan.StopAsync(ct)` |
| Report failure | `await plan.error()` | `await plan.error()` | `await plan.ErrorAsync(ct)` |

These methods don't accept a reason string or cancel your application's work. To describe a failure, it's recommended that you first update the affected step with a higher version, an `error` status, and a description, then report the Plan error.

If Teams returns `PlanConflict`, it means the requested operation conflicts with the Plan's current lifecycle. The response is an authoritative HTTP `409`; for example, it can occur if you try to complete a Plan that has already been stopped. Don't automatically retry the operation or treat the conflict as a streaming timeout. Log the service error details, then terminate or clean up the local worker as appropriate.

### Continue work later

Plans created from an incoming message context are reactive and bound to that prompt. To continue work later, save the full conversation ID and the original prompt's `replyToId`, and provide an authenticated `apiClient` scoped to the same service URL and identity when reconstructing the Plan. Don't substitute the bot's answer ID or stream ID for the original prompt ID.

The SDK doesn't persist Plans or their steps. Persist the Plan data your application needs to resume its work, but don't store credentials or the runtime client. Your application is responsible for scheduling background work, cancellation, and recovery; the Teams SDK doesn't retain the incoming handler context for you.

## Code samples

| Sample | Description | C# | TypeScript | Python |
| --- | --- | --- | --- | --- |
| Teams SDK Plan sample | Demonstrates creating and updating a Plan, completing it with a final answer, and streaming completion metadata. | [View](https://github.com/microsoft/teams.net/tree/main/samples/PlanBot) | [View](https://github.com/microsoft/teams.ts/tree/main/examples/plan) | [View](https://github.com/microsoft/teams.py/tree/main/examples/plan) |

## See also

- [Build conversational capability](../../bots/build-conversational-capability.md)
- [AI content labels](ai-content-labels.md)
- [Best practices and features checklist for Teams agents](../../bots/how-to/teams-conversational-ai/agents-best-practices-features-checklist.md)
