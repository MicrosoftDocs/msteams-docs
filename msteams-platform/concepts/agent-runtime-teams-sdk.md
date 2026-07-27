---
title: Agent runtime and Teams SDK
author: nickwalkmsft
ms.author: nickwalk
ms.reviewer: nickwalk
description: TODO
ms.topic: concept-article
ms.date: 07/14/2026
zone_pivot_groups: teams-sdk-languages
---

<!--

*TODO the concept of "agents can do other things and act proactively" should also be generalized/de-teched (i.e. don't talk about "event handlers", just responsiveness to activities) and put in "Agents in Teams":* In most Teams agent designs, the activity handlers - particularly the `message` handler - are the agent's main entrypoints and drivers of action. However, agents are not limited to request-response workflows based on Teams activities. They are free to take action in response to other inputs, such as additional service interfaces and timers. Agents can perform actions in Teams [proactively](../bots/how-to/conversations/send-proactive-messages.md), at any time, not just in the context of handling a Teams activity event.

*TODO would LOVE to structure this as a tutorial, starting from the quickstart output. For now I'm trying to structure it using active verbs, so that this isn't purely a "conceptual" article.*

*TODO should this be part of a "getting started", or "concepts?"*

-->

# Get started with agent development

This article outlines the fundamentals of building a Teams agent runtime using Teams SDK.

A Teams agent's runtime is its code: a web service that interacts with Teams using the Bot Connector service. It receives chat messages and information about other Teams activities on its `/api/messages` endpoint and performs actions in Teams by calling the Bot Connector API.

An agent's runtime can be hosted anywhere on the web, but its developer is responsible for hosting it. Teams does not host or run an agent's code.

<!--

*TODO mention that there's more to building an gaent than what's covered here, especially its more expressive conversational and requiresments for provisioning an agent; features link to best practices article in next steps*
*TODO see next steps at the end about provisioning an agent to make it available in Teams and using advanced features.*
*Fully defining an agent and making it available in Teams also requires provisioning the agent, see [Provisioning an agent on the Teams platform](agent-provisioning-teams-platform.md) for more information.*

*TODO these are for the Teams SDK page*:

- *Agent development is the main focus of Teams SDK and most modern Teams app development. Simplifying and structuring interactions with the Bot Connector API is the main purpose of Teams SDK.*
- *Teams agent development does not require building greenfield applications or creating new agent behavior from scratch. Developers can use Teams SDK as a bridge to connect existing agents to Teams, or to extend existing web applications or services with Teams functionality. Creating this bridge or extension as a Teams agent with Teams SDK ensures full fidelity of features and conversational experience.*
- *An agent runtime built with Teams SDK can serve multiple roles and expose other service endpoints, such as Model Context Protocol (MCP) and Agent2Agent (A2A) protocol endpoints.*
- 

-->

## Initialize and start the runtime

::: zone pivot="teams-sdk-csharp"

Teams SDK provides agent runtime functionality as an ASP.NET Core extension. Developers can use the SDK as the foundation of a new ASP.NET Core app or extend an existing app to interact with Teams as an agent.

Use `AddTeams` and `UseTeams` to register the `/api/messages` endpoint and integrate the SDK's event handling system.

```csharp
using Microsoft.Teams.Plugins.AspNetCore.Extensions;

var builder = WebApplication.CreateBuilder(args);
builder.AddTeams();
var app = builder.Build();
var teams = app.UseTeams();

// Register activity handlers, event handlers, and potentially other routes

app.Run();
```

`UseTeams` returns an instance of the SDK's `App` class, the main provider of Teams-related functionality. The convention used by Teams SDK and this documentation is to store this instance in a variable named `teams`.

App initialization uses settings in `appsettings.json` to configure the runtime's inbound and outbound authentication with the Bot Connector service. TODO for more information, see (app auth/trust model page in SDK section)

::: zone-end

::: zone pivot="teams-sdk-python"

The application model provided by Teams SDK is similar to [FastAPI](https://fastapi.tiangolo.com/), and by default uses uvicorn and FastAPI for hosting and routing.

Create and start an instance of the `App` class to register and configure the runtime's endpoints and host the app. The convention used by Teams SDK and this documentation is to store this instance in a variable named `app`.

```python
from microsoft_teams.api import MessageActivity, TypingActivityInput
from microsoft_teams.apps import ActivityContext, App

app = App()

# Register activity handlers and event handlers

if __name__ == "__main__":
    asyncio.run(app.start())
```

(For information about using Teams SDK to integrate a Teams agent runtime into an existing web application, see [Self managing your server](#self-managing-your-server)).

<!-- TODO app auth -->

::: zone-end

::: zone pivot="teams-sdk-typescript"

The `App` class is the heart of an agent runtime. The typical structure of a  

(For information about using Teams SDK to integrate a Teams agent runtime into an existing web application, see [Self managing your server](#self-managing-your-server)).

::: zone-end

## Receive and reply to chat messages

Request-response chat interactions with users are the foundation of many agent scenarios.

::: zone pivot="teams-sdk-csharp"

In an agent runtime built with Teams SDK, chat messages are handled as events. During application startup, call `teams.OnMessage` to register a message event handler.

```csharp
teams.OnMessage(async (context, cancellationToken) =>
{
    await context.Send($"You said: '{context.Activity.Text}'");
    await context.Reply("This message is a quoted reply. Select the quote to jump to your original message.");
});
```

The `context` object passed to the handler contains information about the message, along with two helper methods that simplify replying in the same conversation. `context.Send` and `context.Reply` both send a message into the conversation; `context.Reply` also includes a quoted reference to the original message.

::: zone-end

::: zone pivot="teams-sdk-typescript"

Teams SDK provides a strongly-typed event router for handling activities. Prior to  call the `App.on` method with activity type corresponding to the activity type. For example, to register a handler for chat messages, call `App.OnMessage`:

```typescript
app.on('message', async context => {
    // Implementation here
});
```

::: zone-end

::: zone pivot="teams-sdk-python"

In an agent runtime built with Teams SDK, chat messages are handled as events. Use the `@app.on_message` decorator to register a message event handler.

```python
@app.on_message
async def handle_message(ctx: ActivityContext[MessageActivity]):
    await ctx.send(f"You said: '{context.Activity.Text}'")
    await ctx.reply("This message is a quoted reply. Select the quote to jump to your original message.")
```

`ctx` contains information about the message, along with two helper methods that simplify replying in the same conversation. `ctx.send` and `ctx.reply` both send a message into the conversation; `ctx.reply` also includes a quoted reference to the original message.

::: zone-end

TODO screenshot

TODO for more on messaging basics, see [Send and receive messages](../bots/build-conversational-capability.md).s

## Integrate AI

existing agent or "raw" LLM

TODO reuse the snippets from above but include an LLM call. "This minimal implementation illustrates a common agent workflow: receiving a `message` payload via the `activity` event handler and responding with a chat message. A real-world agent's runtime would use an LLM to understand the user's request, take action on it, and generate a response."

This is where we talk about the possibilities of "bringing an agent vs. building one new". You might look at "Teams agent development" as creating a bridge between an existing agent (via something like the OpenAI API) and Teams conversational features. Or, you might be starting from scratch and also building up a new, bespoke LLM-based agent as you go.

## Send messages proactively

<!-- *TODO Is proactivity in any other kind of Teams action of any concern, or relevant, or is it pretty much just about chat?* -->

Chat interactions in Teams are not limited to request-response workflows. For example, an agent could send unsolicited chat messages about scheduled notifications or events received from systems other than Teams. Some scenarios might call for sending a message to a different conversation than the one referenced by the handler's context.

<!-- *TODO is "long running workflow" a scenario? Any reason not to just do even long-running workflows within the handler context? If so, make the above a short bullet list including that scenario*. -->

Sending chat messages outside of the context of an activity handler is called *proactive messaging*. Sending a proactive message requires capturing a conversations's unique ID ahead of time, from a context where it is available, and supplying it to a call to `teams.Send` or `teams.Reply`.

TODO app.send snippets

See [Proactive messages](../bots/how-to/conversations/send-proactive-messages.md) for guidance about implementing proactive messaging.

<!-- *TODO rest of the text in this section is inspiration for improving the proactive messaging article*

Without a handler's `context`, messages must be addressed to a  conversation using its unique conversation ID.

Conversation IDs can't be derived or constructed on demand. Proactive messaging depends on anticipating which conversations will require proactive messages and capturing their IDs from a handler where they are available. Making this determination, and designing a strategy for and retrieving conversation IDs, depends heavily on the scenario and the design of the agent.

*TODO do we explicitly say "don't save the whole message context, just the ID"?*

Later in this article, you'll learn about other opportunities for capturing conversation IDs to use in proactive messaging.

-->

## Access other Teams data and operations

API client <https://microsoft.github.io/teams-sdk/csharp/essentials/api>

Note the need for contexts here too; same concept as proactive messaging

## Handle other activities in Teams

Chat messages are only one category of Teams interaction, or *activity*, that Bot Connector sends to the `/api/messages` endpoint. Examples of other activities include creating a channel in a team, installing an agent into a group chat, and a user selecting a button in an interactive Adaptive Card chat message.

::: zone pivot="teams-sdk-csharp"

During application startup, use the `teams.OnXxx` methods to register event handlers for different kinds of activities.

::: zone-end

::: zone pivot="teams-sdk-typescript"

Call `app.on` with an activity type name to register a handler for it.

::: zone-end

::: zone pivot="teams-sdk-python"

Register activity handlers at module scope using the @app.on_* decorators.

::: zone-end

TODO maybe show a handler for a different event too?
TODO link to handler/activity list; "`message` is generally the activity of greatest interest, but agents receive activities for many kinds of actions"

The `context` object received by a handler contains all of the activity's information.

Activities without registered handlers are silently ignored

All activity handlers, including message handlers, support multiple chained implementations in a middleware pattern.

*TODO this should go somewhere else*:
An agent's visibility to different actions is determined by where the agent is installed and its permissions.

## Create rich messages

TODO link to basic messaging, emphasizing that what you're sending sending is a message *activity* and you can send more than just text

Mention adaptive card builder

## Graph

*TODO mention graph API very briefly but put in a separate howto article*

## Handle runtime events

general events are more (but not entirely) about app lifecycle and are more of an implementation thing; cover them separately here.

## Utilities

Logging... ?

## Self managing your server

(For TS and Py only, since it's self-evident in the ASP.NET core model)

If you are integrating into an existing web service, or building a web service that exposes additional endpoints

Integrates with the ecosystem's common app server so you can apply custom configuration, expose additional services from the same implementation etc.

### Dev workflow

(move this further down the page, or maybe a separate small article if this gets long)

provision first
can have this be a dedicated section talking about dev tunnels, playground, sideloading

talk about how the manifest can evolve and be redeployed and the app reinstalled

Moved from provisioning article; this is not specifically about runtime but very relevant to "dev workflow":

Developers use the Teams Developer Portal or the Teams developer CLI to create and submit an initial app manifest to the Teams platform at the beginning of agent development. Once submitted, they can access a private install link to install the agent in Teams while it's being developed. As the agent evolves during development, they can use the portal and CLI to edit and validate the manifest as needed.

They can use the portal and CLI to edit and validate the manifest,

 used to install the agent to  while it's under development.

When development is complete, publish the agent to the Teams Store or to their organizational app catalog. When a user installs the agent, its app manifest is loaded to their device and used to present the agent in Teams. As users interact with it, Teams
