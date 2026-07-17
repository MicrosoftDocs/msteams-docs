---
title: Components of Apps and Agents on the Teams Platform
author: nickwalkmsft
ms.author: nickwalk
ms.reviewer: nickwalk
description: "TODO Learn the fundamental concepts behind Teams applications and agents: the app runtime, "
ms.topic: concept-article
ms.date: 07/14/2026
---

# Technical components of a Teams agent (TODO for TOC: Teams agent components)

This article explains the technical artifacts that make up an app on the Teams platform. Many of the concepts described here apply to all Teams apps, but this article focuses on agents: conversational assistants that participate in Teams chat.

It's meant to accompany the quickstart, the application model and dev workflow articles

for building conversational agents that participate in Teams chat, and other kinds of extensions to the Teams experience.

Teams apps, including agents, consist of a *runtime* containing the agent's code, and a set of *registrations* that configure different aspects of the agent and identify them to the Teams platform.

## Teams agents are conversational apps

Teams apps extend Teams with new experiences and features. Developers create them by building web services and web applications that interface with extensible surfaces in Teams called *app capabilities*. Each of Teams' app capabilities enables a different kind of interactivity or experience.

Apps that implement Teams' *bot* capability interact with users in Teams chat. These conversational assistant apps are called agents or bots. The terms "bot" and "agent" are often used interchangeably, but agents are distinguished from bots by their use of large language models (LLMs). Agents use LLMs to understand and generate natural language, adapt to context, and dynamically perform actions on behalf of users.

User chat messages are the primary driver of most agent activity, but agents are not limited to request-response chat workflows. Agents can take action and send messages proactively, at any time, and can listen for a wide variety of Teams-based triggers. The API that agents use to interface with Teams enables them to perform many kinds of actions beyond chat.

Agent development is the main focus of Teams SDK and most modern Teams app development.

## App runtime: an app's web-hosted code

An app's runtime is its code: a web service or web application that implements its behavior. App developers are responsible for hosting their app's runtime on the web for the lifetime of the app, because Teams does not host or run app code, it calls the app's runtime remotely.

For an agent, the runtime is a web service that listens for events triggered by Teams user activity and performs actions in Teams. For example, when a user sends a chat message to an agent, the Teams platform will call its runtime's `activity` event handler with a `message` payload.

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

## Manifest, Bot Connector registration, and Entra ID identity

Creating and hosting a runtime is not enough to make an app available in Teams. The components needed for different kinds of apps can vary depending on their functionality; for agents, registration and configuration is required in three different places:

- All Teams apps, including agents, need a *manifest* JSON configuration file registered with the Teams platform
- Agents require a *Bot Connector registration* to interact with the Bot Connector API, the agent interface to Teams
- An Entra ID *app registration* enables an agent to authenticate and get access to services and data, using its own identity or on behalf of users

All of these components require a Microsoft Entra tenant associated with the developer.

### Manifest: app definition and configuration

An app's manifest is a JSON configuration file that contains everything needed by the Teams platform to distribute the app and present it in Teams. For example, it includes:

- The app's name and description
- Information about the app's developer
- The unique ID of the app's Entra ID app registration
- A list of Teams operations the app needs permissions to access
- Configuration for each app capability the app implements

The manifest is the part of the app that its developer deploys to the Teams platform, using the Teams Developer Portal or the Teams developer CLI. When development is complete and the runtime is running in production, they use the portal to publish the app to the Teams Store or to their organizational app catalog.

When a user installs the app, its manifest is loaded to their device and used to present the app in Teams. As the user interacts with the app, the Teams platform communicates with the app's web-hosted runtime to drive its behavior.

### Bot Connector registration: an agent's key to using Teams

The Bot Connector API is the service that agents use to interact with Teams. Bot Connector is the API that agents call for operations like sending chat messages, and is what calls an agent's runtime when events are triggered in Teams. Simplifying and structuring interactions with the Bot Connector API is the main purpose of Teams SDK.

For an agent to interface with Teams, its developer must register it with Bot Connector. Some aspects of an agent's definition, including its endpoint URL, lives with its Bot Connector registration and not in the agent's manifest. The manifest references an agent's Bot Connector registration using its unique ID.

Bot Connector supports two kinds of registration:

- **Teams Developer Portal**: Developers can create registrations in the Teams Developer Portal using the portal website or the Teams developer CLI.
- **Azure AI Bot Services**: An instance of a Bot Services resource in Microsoft Azure functions as a registration. A Bot Services resource is a configuration object that can be created in an Azure subscription using the Teams developer CLI or Azure management tools like the Azure portal, CLI, and ARM and Bicep templates.

Both kinds of registration are suitable for testing and production, but agents that provide single sign-on or OAuth features must use an Azure AI Bot Services registration. Most bots begin development with a Teams Developer Portal registration, and migrate to an Azure registration later if needed.

### Entra ID app registration: identity and authentication

Microsoft Entra ID is the identity and access management service used by Teams and Microsoft 365. An app registration in Entra ID is an app's globally-unique identity that enables it to participate in authentication and authorization flows within the Microsoft 365 ecosystem.

Many agents access Microsoft 365 organizational data through the Microsoft Graph API to power collaboration features, or need permission to use privileged operations in Teams. An app registration is what allows administrators and users to grant an agent the access it needs. Entra ID is also used to authenticate the communications between an agent's runtime and the Bot Connector API.

## Teams developer CLI

The Teams developer CLI supports Teams agent development by TODO In the quickstart, `teams project new` uses a template to create starter code for an agent runtime using Teams SDK in C#, TypeScript or Python. When you run `teams app create`, the CLI uses your Microsoft 365 account to create:

1. An Entra ID app registration in your tenant, with an associated client secret that the agent's runtime uses for authentication
1. A bot registration in Teams Developer Portal, configured to use the app registration as the agent's identity
1. A starter app manifest, which references the bot registration and is deployed to the Teams platform
1. A configuration file for the agent's runtime containing the client secret, used by Teams SDK to authenticate to the Bot Connector API

## Next steps

TODO

Try the quickstart

Learn more about creating an agent runtime with Teams SDK

Learn more about the developer workflow
