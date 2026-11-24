---
title: Activity Handlers and Agent Logic
description: Learn how Teams agent scopes, activity handlers, and conversational logic work together. Explore examples in C#, TypeScript, and Python.
ms.topic: article
ms.localizationpriority: medium
ms.owner: nickwalk
ms.date: 11/23/2026
zone_pivot_groups: teams-sdk-languages
ai-usage: ai-assisted
---

# Understand agent concepts

An agent's interactions can be using text, speech, images, or video. It processes the user's input to understand their request and evaluates the input to perform relevant tasks. An agent may request information or enable access to services, and responds to the user.

## Agent scopes

Agents in Microsoft Teams can be part of a one-to-one conversation, a group chat, or a channel in a team. Each scope provides unique opportunities and challenges for your conversational agent.

| In a channel | In a group chat | In a one-to-one chat |
| :-- | :-- | :-- |
| Massive reach | Fewer members | Traditional way |
| Concise individual interactions | @mention to agent | Q&A agents |
| @mention to agent | Similar to channel | Agents that tell jokes and take notes |

### In a channel

Channels contain threaded conversations between multiple people, even up to 2000. This potentially gives your agent massive reach, but individual interactions must be concise. Traditional multi-turn interactions don't work. Instead, you must look to use interactive cards or dialogs (referred as task modules in TeamsJS v1.x), or move the conversation to a one-to-one conversation to collect lots of information. Your agent only has access to messages where it's `@mentioned`. You can retrieve additional messages from the conversation using Microsoft Graph and organization-level permissions.

Agents work better in a channel in the following cases:

- Notifications, where you provide an interactive card for users to take additional information.
- Feedback scenarios, such as polls and surveys.
- Single request or response cycle resolves interactions and the results are useful for multiple members of the conversation.
- Social or fun agents, where you get an awesome cat image, randomly pick a winner, and so on.

### In a group chat

Group chats are non-threaded conversations between three or more people. They tend to have fewer members than a channel and are more transient. Similar to a channel, your agent only has access to messages where it's `@mentioned` directly.

Agents that work better in a channel also work better in a group chat.

### In a one-to-one chat

One-to-one chat is a traditional way for a conversational agent to interact with a user. A few examples of one-to-one conversational agents are:

- Q&A agents
- agents that initiate workflows in other systems.
- agents that tell jokes.
- agents that take notes.
Before creating one-to-one agents, consider whether a conversation-based interface is the best way to present your functionality.

## Activity handler and agent logic

To create an agent app that meets your needs, understanding Microsoft Teams activity handler and agent logic is essential. These two key components work together to organize conversational logic.

- [Teams activity handler](#teams-activity-handler):
  Processes Teams-specific events and interactions such as channel creation, team member additions, and other actions unique to the Teams environment.

- [Agent logic](#agent-logic):
  Houses the agent's conversational logic and is responsible for making decisions based on user input. Incoming activities are routed to the appropriate handler based on activity type and optional pattern matching.

### Teams activity handler

The activity handler is the core of an agent's functionality, managing and processing user interactions. Register handlers for the activities your agent needs to process, such as messages, member changes, and channel lifecycle events. The SDK routes incoming activities to the appropriate handlers.

> [!NOTE]
> If an agent activity takes more than 15 seconds to process, Teams sends a retry request to the agent endpoint, so you might see duplicate requests.

::: zone pivot="teams-sdk-csharp"

Use the `Microsoft.Teams.Apps` package to register a `TeamsBotApplication` with ASP.NET Core. Call `AddTeamsBotApplication()` to register the SDK services, then `UseTeamsBotApplication()` to connect the agent to the request pipeline. Register handlers with methods such as `OnMessage()`. Handlers receive a typed context and a cancellation token. Use `context.SendAsync()` or `context.ReplyAsync()` to respond.

The following example registers a message handler that echoes the user's message:

```csharp
using Microsoft.Teams.Apps;

WebApplicationBuilder builder = WebApplication.CreateSlimBuilder(args);
builder.Services.AddTeamsBotApplication();

WebApplication app = builder.Build();
TeamsBotApplication teams = app.UseTeamsBotApplication();

teams.OnMessage(async (context, cancellationToken) =>
{
    await context.SendAsync($"You said: {context.Activity.Text}", cancellationToken);
});

app.Run();
```

::: zone-end

::: zone pivot="teams-sdk-typescript"

Use the `@microsoft/teams.apps` package to create an `App` instance. Register handlers with `app.on(eventName, handler)`. The SDK infers the activity type from the event name. The handler context exposes the incoming `activity` and functions such as `send()` and `reply()` to respond.

The following example registers a message handler that echoes the user's message:

```typescript
import { App } from '@microsoft/teams.apps';

const app = new App();

app.on('message', async ({ activity, send }) => {
    await send(`You said: ${activity.text}`);
});

app.start().catch(console.error);
```

::: zone-end

::: zone pivot="teams-sdk-python"

Use the `microsoft-teams-apps` package to create an `App` instance. Register an asynchronous function with a decorator such as `@app.on_message`. The handler receives an `ActivityContext[TActivity]` object. Use `ctx.send()` or `ctx.reply()` to respond.

The following example registers a message handler that echoes the user's message:

```python
import asyncio
from microsoft_teams.apps import App, ActivityContext
from microsoft_teams.api import MessageActivity

app = App()

@app.on_message
async def handle_message(ctx: ActivityContext[MessageActivity]):
    await ctx.send(f"You said: {ctx.activity.text}")

if __name__ == "__main__":
    asyncio.run(app.start())
```

::: zone-end

For event descriptions and handler registration syntax, see the [Teams agent event reference](agent-event-reference.md).

### Agent logic

Agent logic incorporates the fundamental rules and decision-making frameworks that dictate an agent's actions and interactions. It outlines how the agent interprets user input, formulates responses, and participates in conversations.

Keep event registration separate from the decisions your agent makes in each handler. A handler receives the activity context, evaluates the user's input or the event payload, and calls the services needed to complete the task.

Now that you've familiarized yourself with agent activity handlers, explore how agents behave differently depending on the conversation and the messages they receive or send.

## Recommendations

An extensive dialog between your agent and the user is a slow and complex way to get a task completed. An agent that supports excessive commands, especially a broad range of commands, isn't successful or viewed positively by users.

- **Avoid multi-turn experiences in chat** An extensive dialog requires the developer to maintain state. To exit this state, a user must either time out or select **Cancel**. Also, the process is tedious. For example, see the following conversation scenario:

    USER: Schedule a meeting with Megan.

    AGENT: I've found 200 results, include a first and last name.

    USER: Schedule a meeting with Megan Bowen.

    AGENT: OK, what time would you like to meet with Megan Bowen?

    USER: 1:00 pm.

    AGENT: On which day?

- **Support six or less frequent commands** As there are only six visible commands in the current agent menu, anything more is unlikely to be used with any frequency. Agents that go deep into a specific area rather than trying to be a broad assistant work and fare better.
- **Optimize size of knowledge base for quicker interaction** One of the disadvantages of agents is that it's difficult to maintain a large retrieval knowledge base with unranked responses. Agents are best suited for short, quick interactions, and not sifting through long lists looking for an answer.

> [!NOTE]
> Teams platform only supports Transport Layer Security (TLS) version 1.2. Ensure you configure your agent environment accordingly.

## Explore other agent features

In addition to conventional agent features, you can also explore advanced features available in a Teams agent app:

- [Get Teams specific context for your agent](how-to/get-teams-context.md).
- [Calls and online meetings agents](calls-and-meetings/calls-meetings-bots-overview.md).
- [Enable SSO for your app](how-to/authentication/bot-sso-overview.md).

## Code sample

| Sample name | Description | TypeScript | C# | Python |
| --- | --- | --- | --- | --- |
| Teams conversation agent | This app demonstrates basic agent events. | [View](https://github.com/OfficeDev/Microsoft-Teams-Samples/tree/main/samples/TeamsSDK/bot-quickstart/nodejs/bot-quickstart) | [View](https://github.com/OfficeDev/Microsoft-Teams-Samples/tree/main/samples/TeamsSDK/bot-quickstart/dotnet/bot-quickstart) | [View](https://github.com/OfficeDev/Microsoft-Teams-Samples/tree/main/samples/TeamsSDK/bot-quickstart/python/bot-quickstart) |
