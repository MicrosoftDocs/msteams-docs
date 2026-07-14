---
title: The Teams agent application model for developers
author: nickwalkmsft
description: TODO Learn how the Teams application model packages, identifies, installs, routes, and connects Teams app experiences to application logic.
ms.topic: conceptual
ms.date: 05/23/2026
---

# The Teams agent application model for developers

TODO lead-in: explicitly explain what is in this article: app model and its components

TODO explain that this is a 10,000 view of the overall app model that gives special attention to agents. [Teams SDK programming model **for agents**](../teams-sdk-programming-model.md) explains how it is reflected in the SDK.

TODO this connects iwth quickstart (so does dev workflow)

Summarize the concept of runtime and the three registrations.

Teams apps bring new features and experiences to the Teams interface, similar to the way extensions in web browsers and code editors work. TODO What do teams apps *do*? They are in the collaborative surface, access organizational data, etc. etc.

## The bot (agent) app capability

Teams offers multiple surfaces and integration points that developers can use to build new collaborative experiences. These surfaces and integration points are called *app capabilities*, and an implementation that builds on top of one or more of them is a *Teams app*.

Developers use the *bot* app capability to create bots and agents: conversational assistants that participate in Teams chat. The terms "bot" and "agent" are often used interchangeably, but in the modern AI landscape, agents are distinguished from bots by their use of large language models (LLM). Agents use LLMs to understand and generate natural language, adapt to context, and dynamically perform actions on behalf of users.

Agent development is the main focus of Teams SDK and most modern Teams app development.

## App runtime: an app's web-hosted code

An app's runtime is its code, implemented as a web service or web application. App developers are responsible for hosting their app's runtime on the web for the lifetime of the app: Teams does not host or run app code, it calls the app's runtime remotely.

For an agent, the runtime is a web service that listens for events triggered by Teams user activity and performs actions in Teams. For example, when a user sends a chat message to an agent, the Teams platform will call its runtime's `activity` event handler with a `message` payload. In most Teams agents, receiving a chat message event is the main trigger for taking action, but agents are not limited to request-response chat workflows. They can listen for and act on a wide variety of Teams events, and can also act proactively, without being triggered by user activity.

In the quickstart, your agent's runtime code is built with Teams SDK and features a chat message handler that sends a chat message in response, similar to the following:

# [C#](#tab/csharp)

```csharp
app.OnMessage(async (context, cancellationToken) =>
{
    await context.Send($"You said: {context.activity.Text}", cancellationToken);
});
```

# [TypeScript](#tab/typescript)

```typescript
app.on('message', async ({ activity, send }) => {
  await send(`You said: ${activity.text}`);
});
```

# [Python](#tab/python)

```python
@app.on_message
async def handle_message(ctx: ActivityContext[MessageActivity]):
    await ctx.send(f"You said '{ctx.activity.text}'")
```

---

This minimal implementation illustrates how event handlers work. A real-world agent's runtime will use an LLM to understand a user's request, take action on it, and generate a response.

## Manifest, bot registration, and Entra ID identity

Creating and hosting a runtime is not enough to make an app available in Teams. While requirements for different kinds of apps can vary, agents need registration and configuration across three different surfaces:

- All Teams apps, including agents, are registered on the Teams platform with a *manifest*, a JSON configuration file
- Agents require a *bot registration* to interact with the Bot Connector API, the service that agents use to interface with Teams
- An Entra ID *app registration* enables an agent to authenticate with the Bot Connector API and with Microsoft Graph to accessing organizational data

All of these surfaces require the developer to have access to a Microsoft Entra tenant, which is why the second part of the quickstart requires a Microsoft 365 work or school account.

### Manifest: app definition and configuration

An app's manifest contains all the configuration needed by the Teams platform to distribute the app and present it in Teams. For example, it includes:

- The app's name and description
- Information about the app's developer
- The unique ID of the app's Entra ID app registration
- A list of Teams operations the app needs permissions to access
- Configuration for each app capability the app implements

The manifest is the part of the app that its developer deploys to the Teams platform, using the Teams Developer Portal or the Teams developer CLI. When development is complete and the runtime is running in production, they use the portal to publish the app to the Teams Store or to their organizational app catalog. When a user installs the app, the manifest configuration is all that the Teams client on their device needs to present it, because Teams depends on the app's web-hosted runtime to drive its behavior.

### Bot registration: an agent's key to using Teams

The Bot Connector API is the service that agents use to execute most of their Teams-related operations, like sending chat messages. Bot Connector is what calls an agent's runtime when events are triggered in Teams, and is the API that an agent runtime calls to interact with the Teams platform. Simplifying and structuring interactions with the Bot Connector API is the main purpose of Teams SDK.

For an agent to interface with Teams, its developers must register it with the Bot Connector service. Some aspects of an agent's definition, including its endpoint URL, lives with this registration and not in the agent's manifest. The manifest references an agent's bot registration using its unique Bot Connector ID.

Bot Connector supports two kinds of bot registration:

- **In Teams Developer Portal**: TODO
- **In Microsoft Azure**: TODO

### Entra ID app registration: identity and authentication

Microsoft Entra ID is the identity and access management service used by Teams and Microsoft 365. An app's registration in Entra ID is its globally-unique identity that enables it to participate in identity and authorization flows within the Microsoft 365 ecosystem.

To power their collaboration features, many agents need access to organizational data in Microsoft 365 and privileged operations in Teams. An app registration is what allows administrators to grant the app the access it needs. It also provides the infrastructure needed for users to consent to the app accessing data and taking actions on their behalf, using their permissions, with single sign-on and OAuth authentication.

Agents have a unique authentication requirement in the form of the Bot Connector API. Bot Connector uses Entra ID to identify and authenticate an agent's runtime. Most agents built with Teams SDK use a single Entra ID app registration for Bot Connector authentication and for agent identity and authentication flows.

## Teams developer CLI

The Teams developer CLI connects all of these aspects of Teams agent development. In the quickstart, `teams project new` creates the code for an agent runtime from a template. When you run `teams app create`, the CLI:

1. Creates an Entra ID app registration
1. Generates a client secret for authenticating with the app registration
1. Creates a bot registration using the Teams Developer Portal
1. Creates a starter app manifest, associates it with the bot registration, and deploys it to the Teams platform
1. Adds configuration to the agent's runtime that Teams SDK uses to authenticate with the Bot Connector API

gent communication with Bot Connector is authenticated with Entra ID, and the bot registration associates the agent's runtime with an Entra ID identity.

The registration is how Teams platform associates an agent's runtime with the installable app that makes the agent available in Teams.

In addition to registering an app manifest with the Teams platform, developers must also register their agents with the Bot Connector service.  of an Azure AI Bot Service resource, a configuration object registered with Microsoft Azure.

usu. same app reg

Some of an agent's configuration, including its endpoint, resides with the the Bot Connector service instead of placed in its manifest. This

The Bot Connector service is part of Microsoft Azure AI Bot Service, but Teams agents are not required to be hosted in Microsoft Azure.

Creating a

Auth

*Some* operations are in Graph.

You don't need an Azure sub for most dev, TDP can create one for you.

Need a resource and auth, talk about config

In the quickstart, `teams app create` creates a Bot Services resource for your agent,

---

It's the reason the manifest has a bot id instead of an endpoint for a bot. The identity of an app is heavily intertwined with the identity of the bot it contains.

Dont' have to host on Azure, it's not a billable Azure resource, for dev dont' even need an azure sub.

TODO: Where can I put the concept of every agent instance being serviced by teh same runtime endpoint? Maybe it could go in Bot Services. Every Teams agent is a single global endpoint URL that services across all organizations that install it. The runtime is responsible for isolating data and activities across different contexts and organizations.
