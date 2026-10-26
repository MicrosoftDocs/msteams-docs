---
title: Chain of Thought for Teams Agents
description: Learn how Chain of Thought lets Teams agents show structured progress steps, status updates, and sources while working on a user request.
ms.date: 10/26/2026
ms.topic: article
ms.localizationpriority: high
---

# Chain of Thought for Teams agents

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

The following conceptual flow describes the agent's responsibilities. API payloads and SDK methods are pending confirmation.

1. **Associate the CoT with a user message.** Specify the message that the agent is responding to. An agent can have only one ongoing CoT per user message.
1. **Add and update steps.** Provide a title and status for each step, with optional descriptions and sources. Update steps as the work progresses.
1. **Complete the steps.** The specification requires all steps to be marked as completed before completing the CoT.
1. **Explicitly complete the CoT with a final response.** Teams doesn't infer completion from the individual step statuses. Associate the completed CoT with the final response so that users can review the completed steps.

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

## Implementation guidance

Implementation examples will be added after the feature team confirms the API and SDK contracts. This draft doesn't specify SDK methods, package versions, request payloads, or cancellation error handling.

## See also

- [Build conversational capability](../../bots/build-conversational-capability.md)
- [AI content labels](ai-content-labels.md)
- [Best practices and features checklist for Teams agents](../../bots/how-to/teams-conversational-ai/agents-best-practices-features-checklist.md)
