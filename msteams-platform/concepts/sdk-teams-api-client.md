---
title: Teams API Client
description: Overview of the Teams API Client and how to use it to interact with conversations, meetings, and teams in your application.
ms.topic: how-to
zone_pivot_groups: teams-sdk-languages
ms.date: 11/11/2026
---

# Agent Communication Service API Client

::: zone pivot="teams-sdk-csharp"
The Agent Communication Service (ACS) has a number of areas that your application has access to via its API. These are all available via the `context.Api` (and `teams.Api` at the app level) object. Here is a short summary of the different areas:
::: zone-end

::: zone pivot="teams-sdk-python,teams-sdk-typescript"
The Agent Communication Service (ACS) has a number of areas that your application has access to via its API. These are all available via the `app.api` object. Here is a short summary of the different areas:
::: zone-end

::: zone pivot="teams-sdk-csharp"

| Area            | Description                                                                                                                                                          |
| --------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `Conversations` | Gives your application the ability to perform activities on conversations (send, update, delete messages, etc.), or create conversations (like 1:1 chat with a user) |
| `Meetings`      | Gives your application access to meeting details and participant information via `GetByIdAsync` and `GetParticipantAsync`                                             |
| `Teams`         | Gives your application access to team or channel details                                                                                                             |
::: zone-end

::: zone pivot="teams-sdk-python"

| Area            | Description                                                                                                                                                          |
| --------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `conversations` | Gives your application the ability to perform activities on conversations (send, update, delete messages, etc.), or create conversations (like 1:1 chat with a user) |
| `meetings`      | Gives your application access to meeting details and participant information via `get_by_id` and `get_participant`                                                    |
| `teams`         | Gives your application access to team or channel details                                                                                                             |
::: zone-end

::: zone pivot="teams-sdk-typescript"

| Area            | Description                                                                                                                                                          |
| --------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `conversations` | Gives your application the ability to perform activities on conversations (send, update, delete messages, etc.), or create conversations (like 1:1 chat with a user) |
| `meetings`      | Gives your application access to meeting details and participant information via `getById` and `getParticipant`                                                       |
| `teams`         | Gives your application access to team or channel details                                                                                                             |
::: zone-end

An instance of the API client is passed to handlers that can be used to fetch details:

## Example

::: zone pivot="teams-sdk-csharp"
In this example, we use the API client to fetch the members in a conversation. The `Api` object is passed to the activity handler in this case.
::: zone-end

::: zone pivot="teams-sdk-python,teams-sdk-typescript"
In this example, we use the API client to fetch the members in a conversation. The `api` object is passed to the activity handler in this case.
::: zone-end

::: zone pivot="teams-sdk-csharp"

```csharp
teams.OnMessage(async (context, cancellationToken) =>
{
    var members = await context.Api.Conversations.Members.GetAsync(
        context.Activity.Conversation!.Id!,
        cancellationToken: cancellationToken);
});
```

::: zone-end

::: zone pivot="teams-sdk-python"

```python
@app.on_message
async def handle_message(ctx: ActivityContext[MessageActivity]):
    members = await ctx.api.conversations.members.get(ctx.activity.conversation.id)
```

::: zone-end

::: zone pivot="teams-sdk-typescript"

```typescript
app.on('message', async ({ activity, api }) => {
  const members = await api.conversations.getMembers(activity.conversation.id);
});
```

::: zone-end

## Proactive API

It's also possible to access the API client from outside a handler via the app instance. Here we have the same example as above, but we're access the API client via the app instance.

::: zone pivot="teams-sdk-csharp"

Outside of a turn, use the app-level `teams.Api` client (point it at the target service URL first):

```csharp
var api = teams.Api.ForServiceUrl(serviceUrl);
var members = await api.Conversations.Members.GetAsync(conversationId);
```

::: zone-end

::: zone pivot="teams-sdk-python"

```python
members = await app.api.conversations.members.get("...")
```

::: zone-end

::: zone pivot="teams-sdk-typescript"

```typescript
import * as endpoints from '@microsoft/teams.graph-endpoints';

const res = await app.api.graph.call(endpoints.chats.getAllMessages.get);
```

::: zone-end

## Meetings Example

In this example, we use the API client to get a specific meeting participant's details, such as their role (e.g. Organizer) and whether they are currently in the meeting. Provide the user's AAD Object ID to specify which participant to look up. The `meetingId` and `tenantId` are available from the activity's channel data.

> [!NOTE]
> To retrieve **all** members of a meeting, use the conversations API as shown in the [example above](#example), since meetings are also conversations.

::: zone pivot="teams-sdk-csharp"

```csharp
teams.OnMeetingStart(async (context, cancellationToken) =>
{
    var meetingId = context.Activity.Value.Id;
    var tenantId = context.Activity.ChannelData?.Tenant?.Id;
    var userId = context.Activity.From?.AadObjectId;

    if (meetingId != null && tenantId != null && userId != null)
    {
        var participant = await context.Api.Meetings.GetParticipantAsync(meetingId, userId, tenantId);
        // participant.Meeting?.Role — "Organizer", "Presenter", "Attendee"
        // participant.Meeting?.InMeeting — true/false
    }
});
```

::: zone-end

::: zone pivot="teams-sdk-python"

```python
@app.on_activity("meetingStart")
async def handle_meeting_start(ctx: ActivityContext):
    meeting_id = ctx.activity.channel_data.meeting.id
    tenant_id = ctx.activity.channel_data.tenant.id
    user_id = ctx.activity.from_.aad_object_id

    if meeting_id and tenant_id and user_id:
        participant = await ctx.api.meetings.get_participant(meeting_id, user_id, tenant_id)
        # participant.meeting.role — "Organizer", "Presenter", "Attendee"
        # participant.meeting.in_meeting — True/False
```

::: zone-end

::: zone pivot="teams-sdk-typescript"

```typescript
app.on('meetingStart', async ({ activity, api }) => {
  const meetingId = activity.channelData?.meeting?.id;
  const tenantId = activity.channelData?.tenant?.id;
  const userId = activity.from?.aadObjectId;

  if (meetingId && tenantId && userId) {
    const participant = await api.meetings.getParticipant(meetingId, userId, tenantId);
    // participant.meeting?.role — "Organizer", "Presenter", "Attendee"
    // participant.meeting?.inMeeting — true/false
  }
});
```

::: zone-end

Visit [Meeting Events](../in-depth-guides/meeting-events.md) to learn more about meeting events.
