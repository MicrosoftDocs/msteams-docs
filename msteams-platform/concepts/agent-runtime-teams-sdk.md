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

*TODO the concept of "agents can do other things and act proactively" should also be generalized/de-teched (i.e. don't talk about "event handlers", just responsiveness to activities) and put in "Agents in Teams":* In most Teams agent designs, the activity handlers - particularly the `message` handler - are the agent's main entrypoints and drivers of action. However, agents are not limited to request-response workflows based on Teams activities. They are free to take action in response to other inputs, such as additional service interfaces and timers. Agents can perform actions in Teams [proactively](../bots/how-to/conversations/send-proactive-messages.md), at any time, not just in the context of handling a Teams activity event.

*TODO would LOVE to structure this as a tutorial, starting from the quickstart output. For now I'm trying to structure it using active verbs, so that this isn't purely a "conceptual" article.*

*TODO should this be part of a "getting started", or "concepts?"*

# Agent runtime concepts and code basics

This article covers the fundamentals of building a Teams agent runtime using Teams SDK.

A Teams agent's runtime is its code: a web service that interacts with Teams using the Bot Connector service. It receives chat messages and other Teams activity information on its `/api/messages` endpoint and performs actions in Teams by calling the Bot Connector API.

An agent's runtime can be hosted anywhere on the web, but its developer is responsible for hosting it. Teams does not host or run an agent's code.

*TODO mention that there's lots more features than what's covered here, link to best practices article in next steps*
*TODO see next steps at the end about provisioning an agent to make it available in Teams and using advanced features.*
*Fully defining an agent and making it available in Teams also requires provisioning the agent, see [Provisioning an agent on the Teams platform](agent-provisioning-teams-platform.md) for more information.*

*TODO these are for the Teams SDK page*:

- *Agent development is the main focus of Teams SDK and most modern Teams app development. Simplifying and structuring interactions with the Bot Connector API is the main purpose of Teams SDK.*
- *Teams agent development does not require building greenfield applications or creating new agent behavior from scratch. Developers can use Teams SDK as a bridge to connect existing agents to Teams, or to extend existing web applications or services with Teams functionality. Creating this bridge or extension as a Teams agent with Teams SDK ensures full fidelity of features and conversational experience.*
- *An agent runtime built with Teams SDK can serve multiple roles and expose other service endpoints, such as Model Context Protocol (MCP) and Agent2Agent (A2A) protocol endpoints.*

## Initialize the runtime's App instance

::: zone pivot="teams-sdk-csharp"

Teams SDK implements agent runtime functionality as an ASP.NET Core extension. `AddTeams` and `UseTeams` register the `/api/messages` endpoint, configure its authentication requirements, and set up the SDK's event handling system.

```csharp
var builder = WebApplication.CreateBuilder(args);
builder.AddTeams();
var app = builder.Build();
var teams = app.UseTeams();

// Register activity handlers, event handlers, and potentially other routes

app.Run();
```

`UseTeams` returns an instance of the SDK's `App` class, the main provider of Teams-related functionality. The convention used by this documentation is to store this instance in a variable named `teams`.

::: zone-end

::: zone pivot="teams-sdk-python"

TODO

(For information about using Teams SDK to integrate a Teams agent runtime into an existing web application, see [Self managing your server](#self-managing-your-server)).

::: zone-end

::: zone pivot="teams-sdk-typescript"

The `App` class is the heart of an agent runtime. The typical structure of a  

(For information about using Teams SDK to integrate a Teams agent runtime into an existing web application, see [Self managing your server](#self-managing-your-server)).

::: zone-end

This is a *very* short intro based on <https://microsoft.github.io/teams-sdk/typescript/essentials/app-basics> and <https://microsoft.github.io/teams-sdk/typescript/getting-started/code-basics> but shorter, and pivoted as appropriate.

*TODO talk about app auth here too, this is a good spot, make it crisp, both directions*

---

## Receive and reply to chat messages

Request-response chat interactions with users are the foundation of most agent scenarios.

::: zone pivot="teams-sdk-csharp"

In an agent runtime built with Teams SDK, chat messages are handled as events. During application startup, call `teams.OnMessage` to register a message event handler.

```csharp
teams.OnMessage(async (context, cancellationToken) =>
{
    context.Send($"You said: {context.Activity.Text}");
    context.Reply("Here I've quoted your message. Select the quote to jump to your original message.");
});
```

The `context` object passed to your handler contains information about the chat message and two helper methods that simplify replying in the same chat. `context.Send` and `context.Reply` both send a message into the conversation; `context.Reply` also includes a quoted reference to the original message.

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

Teams SDK provides an event-driven framework for receiving and handling activities with strongly-typed event handlers. For example, to define the agent's behavior in response to receiving a chat message,

```python
@app.on_message
async def handle_message(ctx: ActivityContext[MessageActivity]):
    # Implementation here
```

::: zone-end

TODO screenshot

## Handle and perform other activities in Teams

Chat messages are only one category of Teams interaction, or *activity*, that agents can react to and perform. Examples of other activities include creating a channel in a team, installing an agent into a group chat, and a user selecting a button in an interactive Adaptive Card chat message.

TODO maybe show a handler for a different event too?
TODO link to handler/activity list; "`message` is generally the activity of greatest interest, but agents receive activities for many kinds of actions"

The `context` object received by a handler contains all of the activity's information.

During application startup, use the `teams.OnXxx` methods to register event handlers for different kinds of activities. Most agent scenarios are based on chat interactions, For example, use `teams.OnMessage` to register a handler for received chat messages:

strongly typed

Activities without registered handlers are silently ignored

middleware pattern next()

*TODO this should go somewhere else*:
An agent's visibility to different actions is determined by where the agent is installed and its permissions.

## Proactive messaging

*TODO Is proactivity in any other kind of Teams action of any concern, or relevant, or is it pretty much just about chat?*

Chat interactions in Teams are not limited to request-response workflows. For example, an agent could send unsolicited chat messages about scheduled notifications or events received from systems other than Teams. Some scenarios might call for sending a message to a different conversation than the one referenced by the handler's context.

*TODO is "long running workflow" a scenario? Any reason not to just do even long-running workflows within the handler context? If so, make the above a short bullet list including that scenario*.

*FYI I moved this down here under "other activities" so I can mention capturing contexts from other kinds of handlers*

*Proactive messaging* refers to scenarios that involve sending chat messages outside of the context of an activity handler. Without a handler's `context`, sending a message requires addressing it to a specific conversation or thread using a conversation ID.

Conversation IDs can't be derived from other information, they must be captured when they are available. The main consideration in proactive messaging scenarios is anticipating the need for sending proactive messages while a conversation's context is available and capturing its conversation ID for later use.

Most proactive messaging scenarios involve recognizing the need for future proactive messages to a conversation and capturing its ID from an

::: zone pivot="teams-sdk-csharp"

Use `teams.Send` and `teams.Reply` to proactively send messages at any time.

::: zone-end

::: zone pivot="teams-sdk-python"

::: zone-end

::: zone pivot="teams-sdk-typescript"

::: zone-end

*TODO do we explicitly say "don't save the whole message context, just the ID"?*

Later in this article, you'll learn about other opportunities for capturing conversation IDs to use in proactive messaging.
TODO see proactive msg article for more information, including how to create a new conversation in Teams.

runtime will also access other services, esp. graph (separate section for graph? maybe a subsection here?)

## Send rich messages

TODO link to basic messaging, emphasizing that what you're sending sending is a message *activity* and you can send more than just text

Mention adaptive card builder

## Graph

*TODO mention graph API very briefly but put in a separate howto article*

## Integrate AI

existing agent or "raw" LLM

TODO reuse the snippets from above but include an LLM call. "This minimal implementation illustrates a common agent workflow: receiving a `message` payload via the `activity` event handler and responding with a chat message. A real-world agent's runtime would use an LLM to understand the user's request, take action on it, and generate a response."

This is where we talk about the possibilities of "bringing an agent vs. building one new". You might look at "Teams agent development" as creating a bridge between an existing agent (via something like the OpenAI API) and Teams conversational features. Or, you might be starting from scratch and also building up a new, bespoke LLM-based agent as you go.

## Handle runtime events

general events are more (but not entirely) about app lifecycle and are more of an implementation thing; cover them separately here.

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

---

# Teams SDK programming model **for agents**

In [The Teams application model and developer workflow](concepts/teams-application-model.md), we saw how apps are powered by web apps

That article is overall arch model and workflow, this is Temas SDK app model

The focus of the SDK, and of most of this, is agents.

Can think of a Teams SDK app as the bridge between an existing agent and Teams

 Most agents built with Teams SDK use a single Entra ID app registration for Bot Connector authentication and for agent identity and authentication flows.

TODO: Where can I put the concept of every agent instance being serviced by teh same runtime endpoint? Maybe it could go in Bot Services. Every Teams agent is a single global endpoint URL that services across all organizations that install it. The runtime is responsible for isolating data and activities across different contexts and organizations.

most events are activities, so the SDK exposes activity-specific handlers.

api client -> bot connector

<https://microsoft.github.io/teams-sdk/why>

--

Multi languages:

<https://microsoft.github.io/teams-sdk/csharp/getting-started/code-basics>

<https://microsoft.github.io/teams-sdk/csharp/essentials/>

<https://microsoft.github.io/teams-sdk/csharp/essentials/app-basics>

<https://microsoft.github.io/teams-sdk/csharp/essentials/on-event>

<https://microsoft.github.io/teams-sdk/csharp/essentials/on-activity/> (there's a reference for TS)

<https://microsoft.github.io/teams-sdk/csharp/essentials/app-authentication/>

<https://microsoft.github.io/teams-sdk/csharp/essentials/app-authentication/trust-model>  (? this might be a separate page, but here we should at least call out how one function of the SDK is to authenticate received messages, and then we can link to a separate page.)

<https://microsoft.github.io/teams-sdk/csharp/essentials/sending-messages/> (some basic subset of messaging; a lot of this is specific features we'd link to from here, but this is a pretty good list of messaging features I can use to get that done.)

<https://microsoft.github.io/teams-sdk/csharp/essentials/api>

<https://microsoft.github.io/teams-sdk/typescript/essentials/graph> (big enough might need a separate page)

## How the Teams SDK expresses the application model

The Teams SDK provides a programming model for building Teams apps that follows the Teams application model directly. Instead of requiring developers to manually implement authentication, request handling, activity routing, response formatting, and Teams API calls, the SDK provides abstractions for these common tasks. [\[microsoft.github.io\]](https://microsoft.github.io/teams-sdk/why/)

The SDK does not replace the Teams application model. It makes the model concrete in code.

## The app object

In the Teams SDK, the app object is the main entry point for your Teams application. It hosts and runs the server, receives incoming requests, routes activities to handlers, handles authentication, provides utilities for interacting with Teams, and manages plugins that extend application behavior. [\[microsoft.github.io\]](https://microsoft.github.io/teams-sdk/csharp/essentials/app-basics/)

Conceptually, the app object represents the developer-owned application service in the Teams application model. It is where incoming Teams activity becomes application logic.

The app object can be responsible for:

- Hosting the application server
- Authenticating requests from Teams
- Routing events and activities
- Registering handlers
- Sending replies
- Sending proactive messages
- Accessing Teams APIs
- Managing plugins and lifecycle events

## Authentication and platform plumbing

Teams apps need to authenticate incoming requests from Teams and authenticate outgoing calls back to Teams or other Microsoft services. Without an SDK, developers would need to implement this plumbing directly, along with routing logic for different event and activity types. [\[microsoft.github.io\]](https://microsoft.github.io/teams-sdk/why/), [\[microsoft.github.io\]](https://microsoft.github.io/teams-sdk/teams/core-concepts/)

The Teams SDK abstracts much of this boilerplate so developers can focus on application behavior. It handles common concerns such as authentication, routing, event handling, and Teams platform integration. [\[microsoft.github.io\]](https://microsoft.github.io/teams-sdk/why/)

## Teams API access

A Teams app often needs to do more than reply to a single message. It might need to send, update, or delete messages; get conversation members; retrieve meeting details; or access team and channel information.

The Teams SDK provides an API client for working with Teams platform areas such as conversations, meetings, teams, and channels. [\[microsoft.github.io\]](https://microsoft.github.io/teams-sdk/csharp/essentials/api/)

Examples of API scenarios include:

- Get members of a conversation
- Send a message to a conversation
- Update or delete a message
- Retrieve meeting details
- Get meeting participant information
- Access team or channel details

These APIs let application logic participate more fully in Teams experiences, beyond simple request-response message handling.

## Plugins and extensibility

The Teams SDK includes a plugin model that lets developers hook into application lifecycle events, server events, activity events, and outgoing activity behavior. Plugins can add, replace, or augment parts of the app’s behavior. [\[microsoft.github.io\]](https://microsoft.github.io/teams-sdk/csharp/getting-started/code-basics/), [\[microsoft.github.io\]](https://microsoft.github.io/teams-sdk/csharp/essentials/app-basics/)

Plugins support a modular application structure. For example, a plugin might help configure hosting, add diagnostics, handle authentication behavior, modify activity processing, or integrate additional services.

## Building conversational app experiences

Bots and agents are a major Teams app capability. They let developers create conversational experiences in Teams-native surfaces, such as chats, channels, and other conversation contexts.

A conversational Teams app can:

- Receive user messages
- Respond with text
- Send Adaptive Cards
- Handle card actions
- Start workflows
- Call APIs or external services
- Use AI services to generate responses
- Send proactive messages
- Participate in conversations where the app is installed

The Teams SDK expresses these behaviors through message handlers, activity handlers, API clients, authentication support, Adaptive Card support, and utilities for sending responses.

## Messages and responses

A common conversational pattern is message handling. A user sends a message to the app, Teams delivers that message as an activity, and the app processes the activity in a handler.

The app can then respond with:

- A text message
- An Adaptive Card
- A typing indicator followed by a response
- A workflow result
- A request for more information
- No visible response, if the activity does not require one

The SDK docs show a basic message handler that sends a typing indicator and replies to the user’s message. [\[microsoft.github.io\]](https://microsoft.github.io/teams-sdk/csharp/getting-started/code-basics/)

## Adaptive Cards

Adaptive Cards provide a flexible, cross-platform format for rich, interactive content. In Teams, Adaptive Cards can be used for rich messages, dialogs, message extensions, link unfurling, configuration forms, and other app contexts. [\[microsoft.github.io\]](https://microsoft.github.io/teams-sdk/csharp/in-depth-guides/adaptive-cards/)

In the Teams application model, Adaptive Cards are one way for an app to create richer user experiences inside Teams conversations and workflows. A card can display information, collect input, and expose actions. When a user takes an action on a card, Teams can send an activity back to the app for handling. [\[microsoft.github.io\]](https://microsoft.github.io/teams-sdk/why/), [\[microsoft.github.io\]](https://microsoft.github.io/teams-sdk/csharp/in-depth-guides/adaptive-cards/)

## Proactive messages

A Teams app can respond to incoming activity, but it can also send proactive messages. A proactive message is sent by the app outside the immediate context of a user’s latest message. [\[microsoft.github.io\]](https://microsoft.github.io/teams-sdk/why/)

For example, an app might send a proactive message when:

- A workflow completes
- An external system changes state
- A user needs to approve something
- A scheduled reminder is due
- An agent has a result to share

Proactive messaging requires the app to authenticate with Teams and use the appropriate conversation context and APIs to send the message. [\[microsoft.github.io\]](https://microsoft.github.io/teams-sdk/why/), [\[microsoft.github.io\]](https://microsoft.github.io/teams-sdk/csharp/essentials/api/)

## Development, testing, and deployment

A Teams app moves through several stages as developers build, test, and deploy it.

## Local development

During local development, your application usually runs on your machine. Because Teams needs a public HTTPS endpoint to send activity to your app, you can use a dev tunnel to expose your local server to Teams. [\[microsoft.github.io\]](https://microsoft.github.io/teams-sdk/teams/core-concepts/)

A dev tunnel creates a secure public HTTPS endpoint, manages SSL certificates, and forwards Teams messages and events to your locally running application. [\[microsoft.github.io\]](https://microsoft.github.io/teams-sdk/teams/core-concepts/)

This lets you test the app in Teams while still running and debugging the application locally.

## Provisioning

Before a Teams app can interact with Teams, it must be registered and configured. For bot and agent scenarios, provisioning can include creating or updating the app registration and configuring the bot registration that connects Teams to your application endpoint. [\[microsoft.github.io\]](https://microsoft.github.io/teams-sdk/teams/core-concepts/)

The Teams Developer CLI can automate many setup tasks, including app creation, registration, manifest scaffolding, validation, and updates. [\[microsoft.github.io\]](https://microsoft.github.io/teams-sdk/teams/core-concepts/), [\[microsoft.github.io\]](https://microsoft.github.io/teams-sdk/teams/manifest/)

## Sideloading

Sideloading lets you install and test a Teams app before publishing it to an organization app catalog or broader distribution channel. To sideload an app, the app manifest and icons are packaged together in a zip file. [\[microsoft.github.io\]](https://microsoft.github.io/teams-sdk/teams/manifest/)

Sideloading is important during development because it lets you test how the app appears and behaves in Teams before it is made available to other users.

## Production deployment

In production, your app runs as a deployed service with a public HTTPS endpoint. Teams routes activity to that endpoint based on the app’s identity, manifest, capability configuration, and routing registrations. [\[microsoft.github.io\]](https://microsoft.github.io/teams-sdk/teams/core-concepts/), [\[microsoft.github.io\]](https://microsoft.github.io/teams-sdk/why/)

The same application model applies in production as in development:

- Teams identifies the app.
- Teams routes activity to the configured endpoint.
- The app authenticates incoming requests.
- The app handles events and activities.
- The app sends responses or proactive messages.
- The app uses Teams APIs or other services as needed.

## Conceptual diagram

```text
User
  ↓
Teams client
  ↓
Teams platform services
  ↓
App identity, manifest, and capability configuration
  ↓
Bot registration and routing
  ↓
Public HTTPS endpoint
  ↓
Developer-owned application service
  ↓
Teams SDK app object
  ↓
Events, activities, handlers, plugins, APIs
  ↓
Application logic, AI services, Microsoft Graph, external services
  ↓
Response or proactive message
  ↓
Teams conversation
```

## Key terms

### Teams app

An installable application experience that extends Microsoft Teams through one or more app capabilities.

### App capability

A Teams feature area that an app uses to create a specific user experience, such as a bot, tab, message extension, or other Teams experience.

### App package

The zip package used to install or test an app in Teams. It includes the app manifest and app icons. [\[microsoft.github.io\]](https://microsoft.github.io/teams-sdk/teams/manifest/)

### App manifest

The JSON file that describes a Teams app’s metadata, identity, capabilities, permissions, URLs, and related configuration. [\[microsoft.github.io\]](https://microsoft.github.io/teams-sdk/teams/manifest/)

### App registration

The identity registration used to identify and authenticate the app with Teams and related Microsoft services. For bot and agent scenarios, this includes a client ID and secret. [\[microsoft.github.io\]](https://microsoft.github.io/teams-sdk/teams/core-concepts/)

### Bot registration

The registration that connects Teams bot activity to the app’s public HTTPS endpoint. [\[microsoft.github.io\]](https://microsoft.github.io/teams-sdk/teams/core-concepts/)

### Endpoint

The public HTTPS URL where Teams sends activity for the app. [\[microsoft.github.io\]](https://microsoft.github.io/teams-sdk/why/), [\[microsoft.github.io\]](https://microsoft.github.io/teams-sdk/teams/core-concepts/)

### Event

Something meaningful that happens in Teams or within the app runtime. Events can include incoming activity, sent activity, sign-in, startup, or errors. [\[microsoft.github.io\]](https://microsoft.github.io/teams-sdk/csharp/essentials/on-event/), [\[microsoft.github.io\]](https://microsoft.github.io/teams-sdk/csharp/essentials/)

### Activity

A Teams-specific payload sent between Teams and the app, such as a message, reaction, card action, installation event, or invoke call. [\[microsoft.github.io\]](https://microsoft.github.io/teams-sdk/csharp/essentials/on-activity/), [\[microsoft.github.io\]](https://microsoft.github.io/teams-sdk/csharp/essentials/)

### Handler

Application logic that reacts to an event or activity and decides what action the app should take. [\[microsoft.github.io\]](https://microsoft.github.io/teams-sdk/csharp/essentials/), [\[microsoft.github.io\]](https://microsoft.github.io/teams-sdk/csharp/essentials/on-activity/)

### Proactive message

A message sent by the app outside the immediate context of responding to the latest user message. [\[microsoft.github.io\]](https://microsoft.github.io/teams-sdk/why/)

### Teams SDK

The recommended programming model for implementing the Teams application model in code. It provides abstractions for app hosting, authentication, event and activity routing, handlers, Teams API access, plugins, and response utilities. [\[microsoft.github.io\]](https://microsoft.github.io/teams-sdk/why/), [\[microsoft.github.io\]](https://microsoft.github.io/teams-sdk/csharp/essentials/app-basics/)

## Summary

The Teams application model connects installable Teams experiences to developer-owned application logic. The model includes the app package, manifest, app identity, capabilities, routing, endpoint, events, activities, handlers, authentication, and Teams APIs.

The Teams SDK is the primary way developers implement this model in modern Teams apps and agents. It expresses Teams platform concepts directly in code, so developers can build conversational and interactive Teams experiences without manually implementing the platform plumbing for authentication, routing, activity handling, and Teams API access.
