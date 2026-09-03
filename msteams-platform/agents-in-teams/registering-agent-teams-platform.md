---
title: Registering an Agent on the Teams Platform
author: nickwalkmsft
ms.author: nickwalk
ms.reviewer: nickwalk
description: "Registering an agent in Teams requires configuring it across three services: Entra ID, Bot Connector, and the Teams platform. Learn how to configure each and get started."
ms.topic: concept-article
ms.date: 07/21/2026
---

# Registering an agent on the Teams platform

Creating and hosting an agent runtime is not enough to make an agent available in Teams. You must also *register* your agent at the beginning of the development process by creating configuration for it across three services:

- **Microsoft Entra ID**: An Entra ID app registration is the identity used by the agent to authenticate and get access to services and data
- **Bot Connector service**: Registering the agent with the Bot Connector service enables it to interact with users in Teams chat
- **Teams platform**: An app manifest registered in Teams Developer Portal establishes an agent as a distributable, installable Teams app

By registering an agent at the beginning of development, you can use it in Teams as it takes shape, verifying its behavior and experiencing it exactly as users will. Use the [quickstart](../agents-in-teams/quickstart-create-agent-teams-sdk.md) to create and register a new agent.

## Entra ID app registration: identity and authentication

Microsoft Entra ID is the identity and access management service used by Teams and Microsoft 365. An app registration in your developer Entra tenant is a globally unique identity that an agent uses to authenticate to secured resources and participate in user delegation flows (single sign-on and OAuth) within the Microsoft ecosystem.

An Entra ID app registration is not strictly required for all Teams agents. However, most agents have one, as it enables multiple important capabilities:

- **Authenticating to organizational resources**: Many agents access organizational data and services, including the Microsoft Graph API, to power collaboration features.
- **On-behalf-of flows with single sign-on and OAuth**: Users can delegate access to agents, granting consent for them to access data and services on their behalf.
- **Obtaining consent for privileged operations in Teams**: Certain agent actions in Teams require consent from administrators and users.
- **Authentication with Bot Connector**: An agent's runtime must authenticate to Bot Connector using an Entra ID identity. An app registration is the recommended and most flexible choice, and is the only choice for agent runtimes not hosted on Microsoft Azure.

Some scenarios call for an agent to be associated with multiple Entra ID app registrations, but most require only a single app registration to enable all of these capabilities.

## Bot Connector registration: an agent's interface to Teams

Bot Connector is the service that agents use to interact with most Teams functionality, especially chat. Before your agent can authenticate to Bot Connector and perform actions in Teams, you need to register it with the service.

A Bot Connector registration contains a small amount of configuration, most importantly:

- The endpoint URL of the agent's runtime. Bot Connector will send realtime activity data about user actions in Teams to this endpoint.
- A reference to an Entra ID identity used for agent runtime authentication. The agent's runtime must authenticate to Bot Connector using credentials associated with this identity. In most cases, this identity is an Entra ID app registration.

Bot Connector supports two different kinds of registration: standalone and Azure AI Bot Service resource. See [Choose a Bot Connector registration type for an agent](../agents-in-teams/choose-agent-registration-type.md) for more information.

## App manifest: define and distribute

An agent's app manifest is a JSON configuration file that contains everything needed by the Teams platform to distribute it and install it in Teams clients. It includes, for example:

- The agent's name and description
- Information about the agent's developer
- The ID of the agent's Entra ID app registration
- The ID of the agent's Bot Connector registration
- Platform-level configuration needed for certain agent features
- A list of privileged Teams operations the agent needs permissions to access

Registering an agent's app manifest in Teams Developer Portal is what establishes it as a Teams app that can be distributed in the Teams store or your organization's app catalog. When you create and register a starter app manifest at the beginning of agent development, you can use the web interface of Teams Developer Portal to update it as you add features that need manifest configuration.

App manifests conform to the [app manifest schema](/microsoft-365/extensibility/schema), which evolves as Microsoft releases new Teams platform features.

## Register an agent with Teams developer CLI

`teams app create` fully registers an agent. It creates:

1. An Entra ID app registration in your tenant, configured with a client secret used for authentication
1. A standalone Bot Connector registration that references the Entra ID app registration
1. A Teams Platform registration with a starter app manifest configured to use the standalone Bot Connector registration
1. An agent runtime configuration file (a `.env` file for a TypeScript or Python runtime, or an `appsettings.json` file for .NET) that will authenticate a runtime to the Bot Connector service using the client secret

## Next steps

- Use the [quickstart](../agents-in-teams/quickstart-create-agent-teams-sdk.md) to create and register a new Teams agent using `teams app create`.

## See also

- [App manifest schema reference](/microsoft-365/extensibility/schema)
