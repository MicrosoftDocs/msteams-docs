---
title: The Teams agent application model for developers
author: nickwalkmsft
description: TODO Learn how the Teams application model packages, identifies, installs, routes, and connects Teams app experiences to application logic.
ms.topic: concept-article
ms.date: 05/23/2026
---

# The Teams agent application model for developers

TODO lead-in: explicitly explain what is in this article: app model and its components

TODO explain that this is a 10,000 view of the overall app model that gives special attention to agents. [Teams SDK programming model **for agents**](../teams-sdk-programming-model.md) explains how it is reflected in the SDK.

TODO this connects with quickstart (so does dev workflow)

Summarize the concept of runtime and the three registrations.

Teams apps bring new features and experiences to the Teams interface, similar to the way extensions in web browsers and code editors work. TODO What do teams apps *do*? They are in the collaborative surface, access organizational data, etc. etc.

## The bot (agent) app capability

Teams offers multiple surfaces and integration points that developers can use to build new collaborative experiences. These surfaces and integration points are called *app capabilities*, and an implementation that builds on top of one or more of them is a *Teams app*.

Developers use the *bot* app capability to create bots and agents: conversational assistants that participate in Teams chat. The terms "bot" and "agent" are often used interchangeably, but in the modern AI landscape, agents are distinguished from bots by their use of large language models (LLM). Agents use LLMs to understand and generate natural language, adapt to context, and dynamically perform actions on behalf of users.

Agent development is the main focus of Teams SDK and most modern Teams app development.

## App runtime: an app's web-hosted code

An app's runtime is its code: a web service or web application that implements its behavior. App developers are responsible for hosting their app's runtime on the web for the lifetime of the app: Teams does not host or run app code, it calls the app's runtime remotely.

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

- All Teams apps, including agents, need a *manifest* JSON configuration file to register with the Teams platform
- Agents require a *bot registration* to interact with the Bot Connector API, the service that agents use to interface with Teams
- An Entra ID *app registration* enables an agent to authenticate and get access to services and data, using its own identity or on behalf of users

All of these surfaces require the developer to have access to a Microsoft Entra tenant.

### Manifest: app definition and configuration

An app's manifest is a JSON configuration file that contains everything needed by the Teams platform to distribute the app and present it in Teams. For example, it includes:

- The app's name and description
- Information about the app's developer
- The unique ID of the app's Entra ID app registration
- A list of Teams operations the app needs permissions to access
- Configuration for each app capability the app implements

The manifest is the part of the app that its developer deploys to the Teams platform, using the Teams Developer Portal or the Teams developer CLI. When development is complete and the runtime is running in production, they use the portal to publish the app to the Teams Store or to their organizational app catalog. When a user installs the app, the manifest configuration is all that the Teams client on their device needs to present it, because Teams depends on the app's web-hosted runtime to drive its behavior.

### Bot registration: an agent's key to using Teams

The Bot Connector API is the service that agents use to interact with Teams, for operations like sending chat messages. Bot Connector is what calls an agent's runtime when events are triggered in Teams. Simplifying and structuring interactions with the Bot Connector API is the main purpose of Teams SDK.

For an agent to interface with Teams, its developer must register it with the Bot Connector service. Some aspects of an agent's definition, including its endpoint URL, lives with this registration and not in the agent's manifest. The manifest references an agent's bot registration using its unique Bot Connector ID.

Bot Connector supports two kinds of bot registration:

- **Teams Developer Portal**: Developers can create bot registrations in the Teams Developer Portal by using the portal website.
- **Azure AI Bot Services**: Bot registrations are represented in Microsoft Azure by Azure AI Bot Services resources, which can be created with Azure management tools like the Azure portal, CLI, and ARM and Bicep templates.

Both kinds of bot registration can also be created using the Teams developer CLI. Agents that enable users to grant access to resources on their behalf with single sign-on or OAuth must have an Azure AI Bot Services registration.

### Entra ID app registration: identity and authentication

Microsoft Entra ID is the identity and access management service used by Teams and Microsoft 365. An app's registration in Entra ID is its globally-unique identity that enables it to participate in authentication and authorization flows within the Microsoft 365 ecosystem.

Many agents need access to organizational data in Microsoft 365 and to privileged operations in Teams to power their collaboration features. An app registration is what allows administrators and users to grant it the access it needs. Entra ID is also used to authenticate the communications between an agent's runtime and the Bot Connector API.

## Teams developer CLI

The Teams developer CLI addresses all of these aspects of Teams agent development. In the quickstart, `teams project new` creates the code for an agent runtime from a template. When you run `teams app create`, the CLI uses your Microsoft 365 account to create:

1. An Entra ID app registration in your tenant
1. A bot registration in Teams Developer Portal, configured to use the app registration for authentication
1. A starter app manifest, which references the bot registration and is deployed to the Teams platform
1. A client secret, associated with the Entra ID app registration and written to your agent's runtime configuration, for authenticating to the Bot Connector API
