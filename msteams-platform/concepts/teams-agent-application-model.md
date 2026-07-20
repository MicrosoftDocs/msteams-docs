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

## Teams agents

TODO this is for "agents in teams"
Teams agents are conversational assistant apps that interact with users in Teams chat. The terms "bot" and "agent" are often used interchangeably, but agents are distinguished from bots by their use of large language models (LLMs). Agents use LLMs to understand and generate natural language, adapt to context, and dynamically perform actions on behalf of users.

**TODO maybe this article should just be about the 3 registrations**; save the runtime stuff for the programming model article. Have that article be everything about "the thing you code", including the fact that you have to host it yourself. Call it "Teams agent registration".

## Agent runtime: an agent's web-hosted code

An agent's runtime is its code: a web service that implements its behavior. App developers are responsible for hosting and maintaining their agent's runtime on the web, because Teams does not host or run its code.

The runtime's main job is to use the Bot Connector API to listen for events triggered by Teams user activity and perform actions in Teams. For example, when a user sends a chat message to an agent, the Teams platform will call its runtime's `activity` event handler with a `message` payload. After performing an action, the bot can respond by sending a message back.

runtime will also access other services, esp. graph

In the quickstart, your agent's runtime code features a chat message handler that responds with a message, similar to the following:

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

This minimal implementation illustrates how event handlers work. A real-world agent's runtime would use an LLM to understand the user's request, take action on it, and generate a response.

User chat messages are the primary driver of most agent activity, but agents in Teams are not limited to request-response chat workflows. Agents can take action and send messages proactively, at any time. The Bot Connector API enables agents to listen for a wide variety of Teams-based triggers and perform many kinds of actions beyond chat.

Agent development is the main focus of Teams SDK and most modern Teams app development. Simplifying and structuring interactions with the Bot Connector API is the main purpose of Teams SDK.

---

## Manifest, Bot Connector registration, and Entra ID identity

Creating and hosting a runtime is not enough to make an agent available in Teams. Agents require registration and configuration across three surfaces:

- Agents require a *Bot Connector registration* to interact with the agent API for Teams
- An Entra ID *app registration* enables an agent to authenticate and get access to services and data
- Developers use the agent's *app manifest* JSON configuration file to register it with the Teams platform as an installable Teams app

All of these components require a Microsoft Entra tenant associated with the agent's developer.

The developer workflow enabled by the Teams developer CLI promotes registering an agent at the beginning of its development. Registering early enables developers to use their agents from Teams as they take shape, experiencing them exactly as users will.

### Bot Connector registration: an agent's key to using Teams

The Bot Connector API is the service that agents use to interact with Teams. Developers must register their agents with Bot Connector for them to use the API.

A Bot Connector registration contains a small amount of configuration. Most importantly, it includes the global endpoint URL of the agent's runtime, and a reference to an Entra ID identity that the runtime must use to authenticate to Bot Connector.

Bot Connector supports two kinds of registration:

- **Teams Developer Portal**: Developers can create registrations in the Teams Developer Portal using the portal website or the Teams developer CLI.
- **Azure AI Bot Services**: An instance of a Bot Services resource in Microsoft Azure serves as a Bot Connector registration. A Bot Services resource is a configuration object that can be created in an Azure subscription using the Teams developer CLI or Azure management tools like the Azure portal, CLI, and ARM and Bicep templates.

Both kinds of registration are suitable for testing and production, but agents that implement single sign-on or OAuth must use an Azure AI Bot Services registration. Bots can begin development with a Teams Developer Portal registration and migrate to an Azure registration later if needed.

### Entra ID app registration: identity and authentication

Microsoft Entra ID is the identity and access management service used by Teams and Microsoft 365. An app registration in Entra ID is a globally unique identity that enables an agent to participate in authentication and authorization flows within the Microsoft ecosystem.

An Entra ID app registration enables multiple agent capabilities that require authentication and authorization:

- **Authenticating to organizational resources.** Many agents access organizational data and services, including the Microsoft Graph API, to power collaboration features.
- **On-behalf-of flows with single sign-on and OAuth.** An agent's app registration enables users to grant consent for the agent to access data and services on their behalf, using their permissions.
- **Requesting consent for privileged operations in Teams.** Certain agent actions in Teams require consent from administrators and users.
- **Authentication with Bot Connector.** An agent's runtime must authenticate with Bot Connector to use the API. Developers with agents hosted on Microsoft Azure have the option of using an Azure user-assigned managed identity instead of an app registration, but using an app registration provides additional flexibility.

Agents can use a single app registration to enable all of these capabilities.

### App manifest: app definition and configuration

An agent's app manifest is a JSON configuration file that contains everything needed by the Teams platform to distribute it and present it in Teams. For example, it includes:

- The agent's name and description
- Information about the agent's developer
- The ID of the agent's Entra ID app registration
- The ID of the agent's Bot Connector registration
- Platform-level configuration required for certain agent features
- A list of privileged Teams operations the agent needs permissions to access

Developers deploy an agent's app manifest to the Teams platform using the Teams Developer Portal or the Teams developer CLI. When development is complete and the runtime is running in production, they use the portal to publish the agent to the Teams Store or to their organizational app catalog. When a user installs the agent, its app manifest is loaded to their device and used to present the agent in Teams.

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
