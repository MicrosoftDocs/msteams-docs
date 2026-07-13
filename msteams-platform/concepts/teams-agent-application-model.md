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

Teams apps bring new features and experiences to the Teams interface, similar to the way extensions in web browsers and code editors work. TODO What do teams apps *do*? They are in the collaborative surface, access organizational data, etc. etc.

## The bot (agent) app capability

Teams offers multiple surfaces and integration points developers can use to create custom experiences. These surfaces and integration points are called *app capabilities*, and an implementation that builds on top of one or more of them is a *Teams app*.

Developers use the *bot* app capability to create conversational assistants that participate in Teams chat. A bot-capability application, and its presence in chat, is referred to as a bot or agent. Both terms are often used interchangeably, but in the modern AI landscape, agents are distinguished from bots by their reliance on large language models (LLM). Agents use LLMs to converse naturally, adapt to context, and dynamically perform actions on behalf of users.

Agent development is the main focus of Teams SDK and most modern Teams app development.

## Runtime, manifest, and identity

From a developer's perspective, Teams apps consist of three main components:

- An app's *runtime* is a web service or application that implements the behavior of a Teams app capability.
- An app's *manifest* is a JSON configuration file that defines everything else about the app.
- All Teams agents, and most Teams apps generally, have a unique *identity* registered in Microsoft Entra ID.

### Runtime: web-hosted app code

An app's runtime is a web service or web application containing the app's code. App developers are responsible for hosting and maintaining their app's runtime on the web: Teams does not host or run app code, it calls the app's runtime remotely.

For an agent, the runtime is a web service that listens for events triggered by Teams user activity and performs actions in Teams, usually with an emphasis on chat. For example, when a user sends the agent a message in one-on-one chat, the Teams platform will call the runtime's `activity` handler with a `message` payload.

In the quickstart, the agent runtime you create from a template is built with Teams SDK and features a minimal chat message handler that sends a chat message in response, similar to the following:

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

This basic implementation illustrates how event handlers work, but a real-world agent's runtime will depend on an LLM to understand a user's request, take action on it, and generate a chat response. Agents are not limited to request-response chat workflows: they can listen for and act on a wide variety of Teams events, and can also act proactively, without being triggered by user activity.

Agents are characterized by the services and data they access. Many productivity-focused agents access Microsoft 365 organizational data and services through the Microsoft Graph API to enable workplace productivity and collaboration features.

An agent's runtime is registered with Teams as a single global endpoint URL that handles events for all instances of the agent. Agents distributed to multiple organizations must securely manage requests from different tenants.

### Manifest: app definition and configuration

An app's manifest defines everything about the app that isn't expressed through its runtime code. In addition to basic configuration like the app's name and description, the manifest declares which capabilities the app implements and the endpoint URL of the runtime that powers them. The manifest also lists the Teams operations the app needs permission to use, which administrators and users can review and consent to.

Unlike the app's runtime, developers deploy the manifest to the Teams platform using the Teams Developer Portal or the Teams developer CLI. When development is complete and the runtime is running in production, they use the portal to publish the manifest to the Teams Store or to their organizational app catalog. When a user installs the app, the manifest configuration is all that is needed by the Teams client on their device to present it to them, because Teams depends on the web-hosted runtime to drive the app's behavior.

In the quickstart, you don't see or interact with your agent's app manifest. `teams app create` creates a starter manifest for an agent and deploys it to the Teams platform, which generates a private installer link that you use to install the app.

### Identity: app and user authentication

Microsoft Entra ID is the identity and access management service used by Teams and Microsoft 365. Most Teams apps have an *app registration* in Entra ID that allows the app to participate in identity and authorization flows within the Microsoft 365 ecosystem.

An app's registration enables administrators to grant it access to Microsoft 365 data and services within their organizations. It also provides the infrastructure needed for the app to perform enterprise single sign-on and OAuth authentication, allowing it to access data and services on behalf of consenting users.

Creating an app registration requires the developer to have access to an Entra tenant, which is why the second part of the quickstart requires a Microsoft work or school account. In the quickstart, `teams app create` creates an Entra ID app registration in your tenant to represent your agent.

## Azure AI Bot Service and the Bot Connector service

The Bot Connector service is the interface between the Teams platform and an agent's runtime. It is the service that calls an agent's runtime when events are triggered in Teams, and that an agent runtime calls for most Teams-related operations. The main purpose of Teams SDK is to accelerate the development of agents by simplifying and structuring interactions with the Bot Connector service.

The Bot Connector service is hosted in Microsoft Azure and is part of Azure AI Bot Service.

Some of an agent's configuration, including its endpoint, is registered with the the Bot Connector service instead of placed in its manifest.

Auth

*Some* operations are in Graph.

You don't need an Azure sub for most dev, TDP can create one for you.

Need a resource and auth, talk about config

In the quickstart, `teams app create` creates a Bot Services resource for your agent,

---

Azure

Bot Services is a Microsoft cloud service that mediates communications between the Teams platforms and an agent's runtime.

Most agent operations on Teams are routed through a Microsoft cloud service called Bot Services.

Bot Services is a Microsoft cloud service that that mediates communication between the Teams platform and all Teams agents.

Agents in particular use bot. Much functionalty there, and it's what raises events.

It's the reason the manifest has a bot id instead of an endpoint for a bot. The identity of an app is heavily intertwined with the identity of the bot it contains.

Some functionality in APX, some in Graph.

Dont' have to host on Azure, it's not a billable Azure resource, for dev dont' even need an azure sub.
