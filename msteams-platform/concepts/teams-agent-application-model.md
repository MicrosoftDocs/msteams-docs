---
title: TODO The Teams agent application model for developers
author: nickwalkmsft
description: TODO Learn how the Teams application model packages, identifies, installs, routes, and connects Teams app experiences to application logic.
ms.topic: conceptual
ms.date: 05/23/2026
---

# The Teams agent application model for developers

TODO lead-in: explicitly explain what is in this article: app model and its components

TODO explain that this is a 10,000 view of the overall app model that gives special attention to agents. [Teams SDK programming model **for agents**](../teams-sdk-programming-model.md) explains how it is reflected in the SDK.

TODO this also serves to explain the quickstart, in which you build an agent.

Summarize the concept of runtime and the three registrations.

Teams apps bring new features and experiences to the Teams interface, similar to the way extensions in web browsers and code editors work. TODO What do teams apps *do*? They are in the collaborative surface, access organizational data, etc. etc.

## The bot (agent) app capability

Teams offers multiple surfaces and integration points developers can use to create custom experiences. These surfaces and integration points are called *app capabilities*, and an implementation that builds on top of one or more of them is a *Teams app*.

Developers use the *bot* app capability to create bots and agents: conversational assistants that participate in Teams chat. The terms "bot" and "agent" are often used interchangeably, but in the modern AI landscape, agents are distinguished from bots by their reliance on large language models (LLM). Agents use LLMs to understand and generate natural language, adapt to context, and dynamically perform actions on behalf of users.

Agents are defined in large part by the services and data they access. As a baseline, many productivity-focused agents access Microsoft 365 organizational data and services through the Microsoft Graph API to enable workplace collaboration features.

Agent development is the main focus of Teams SDK and most modern Teams app development.

## App runtime: an app's web-hosted code

An app's runtime is its code, implemented as a web service or web application. App developers are responsible for hosting and maintaining their app's runtime on the web: Teams does not host or run app code, it calls the app's runtime remotely.

For an agent, the runtime is a web service that listens for events triggered by Teams user activity and performs actions in Teams. For example, when a user sends a chat message to the agent, the Teams platform will call the runtime's `activity` event handler with a `message` payload. In most Teams agents, receiving a chat message event is the main trigger for taking action, but agents are not limited to request-response chat workflows. They can listen for and act on a wide variety of Teams events, and can also act proactively, without being triggered by user activity.

In the quickstart, your agent's runtime code is built with Teams SDK and features a minimal chat message handler that sends a chat message in response, similar to the following:

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

This minimal implementation illustrates how event handlers work. A real-world agent's runtime will depend on an LLM to understand a user's request, take action on it, and generate a chat response.

## Manifest, identity, and Bot Service registration

Creating and hosting an app runtime is not enough to make it available in Teams. Teams apps require registration and configuration across a few different surfaces:

- An app's *manifest* is a JSON configuration file that specifies the app's properties and configuration, and is used to register it with the Teams platform.
- Most Teams apps have a *app registration* identity in Microsoft Entra ID to enable secure access to organizational resources.
- An agent's runtime interacts with the Teams platform via the Bot Connector service, which requires a *Bot Service resource*.

All of these surfaces require the developer to have access to a Microsoft Entra tenant, which is why the second part of the quickstart requires a Microsoft work or school account.

### Manifest: app definition and configuration

An app's manifest contains all the configuration needed by the Teams platform needed to distribute the app and present it in Teams. It specifies the app's name and description, information about which Teams operations the app needs permissions to access, and configuration for each app capability the app implements.

The manifest is the part of the app that developers deploy to the Teams platform, using the Teams Developer Portal or the Teams developer CLI. When development is complete and the runtime is running in production, they use the portal to publish the app to the Teams Store or to their organizational app catalog. When a user installs the app, the manifest configuration is all that is needed by the Teams client on their device to present it to them, because Teams depends on the app's web-hosted runtime to drive its behavior.

In the quickstart, you don't see or interact with your agent's app manifest. `teams app create` creates a starter manifest for an agent and deploys it to the Teams platform, which generates a private installer link that you use to install the app.

### Entra ID app registration: identity and authentication

Microsoft Entra ID is the identity and access management service used by Teams and Microsoft 365. Most Teams apps have an *app registration* in Entra ID that allows the app to participate in identity and authorization flows within the Microsoft 365 ecosystem.

An app's registration enables administrators to grant it access to Microsoft 365 data and services within their organizations. It also provides the infrastructure needed for the app to perform enterprise single sign-on and OAuth authentication, allowing it to access data and services on behalf of consenting users.

In the quickstart, `teams app create` creates an Entra ID app registration in your tenant to represent your agent.

### Bot Services: the Teams interface for agents

The Bot Connector service is the interface between the Teams platform and an agent's runtime. It is the service that calls an agent's runtime when events are triggered in Teams, and that an agent runtime calls for most Teams-related operations. The main purpose of Teams SDK is to accelerate agent development by simplifying and structuring interactions with the Bot Connector service.

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
