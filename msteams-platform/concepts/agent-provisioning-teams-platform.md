---
title: Provisioning an Agent on the Teams Platform
author: nickwalkmsft
ms.author: nickwalk
ms.reviewer: nickwalk
description: "Provisioning an agent in Teams requires registration across three surfaces: Entra ID, Bot Connector, and app manifest. Learn how to configure each and get started."
ms.topic: concept-article
ms.date: 07/21/2026
---

## Provisioning an agent on the Teams platform

Creating and hosting an agent runtime is not enough to make an agent available in Teams. Provisioning an agent on the Teams platform requires registration and configuration across three surfaces:

- *Entra ID app registration*: Identity configuration that enables an agent to authenticate and get access to services and data
- *Bot Connector API registration*: Service configuration that enables an agent to interact with Teams via the Bot Connector API
- :*App manifest*: A JSON configuration used to register the agent with the Teams Platform as an installable Teams app

All of these components require a Microsoft Entra tenant associated with the agent's developer.

The developer workflow enabled by the Teams developer CLI encourages provisioning an agent right at the beginning of its development. Provisioning early enables developers to use their agents from Teams as they take shape, experiencing them exactly as users will.

### Entra ID app registration: identity and authentication

Microsoft Entra ID is the identity and access management service used by Teams and Microsoft 365. An app registration in Entra ID is a globally unique identity that enables an agent to participate in authentication and authorization flows within the Microsoft ecosystem.

An Entra ID app registration is not strictly required for all Teams agents. However, most agents have one, as it enables multiple important capabilities:

- **Authenticating to organizational resources**: Many agents access organizational data and services, including the Microsoft Graph API, to power collaboration features.
- **On-behalf-of flows with single sign-on and OAuth**: Users can grant consent for the agent to access data and services on their behalf, using their permissions.
- **Requesting consent for privileged operations in Teams**: Certain agent actions in Teams require consent from administrators and users.
- **Authentication with Bot Connector**: An agent's runtime must authenticate to Bot Connector with an Entra ID identity. An app registration is the recommended and most flexible choice, and the only choice for agent runtimes not hosted on Azure.

Agents can use a single app registration to enable all of these capabilities.

### Bot Connector registration: an agent's key to using Teams

The Bot Connector API is the service that agents use to interact with Teams. Developers must register their agents with Bot Connector for them to use the API.

A Bot Connector registration contains a small amount of configuration, most notably the endpoint URL of the agent's runtime. The Teams platform uses the endpoint URL to call the agent's runtime with information about user activity in Teams.

The Bot Connector registration also contains a reference to an Entra ID identity used by the agent's runtime to authenticate to Bot Connector. An Entra ID app registration is the default choice, and is recommended for its flexibility of credential types. Developers with agents hosted on Microsoft Azure can choose to directly assign an Azure user-assigned managed identity instead.

Bot Connector supports two kinds of registration:

- **Teams Developer Portal**: Developers can create registrations in the Teams Developer Portal using the portal website or the Teams developer CLI. Registrations created in the Teams Developer Portal can be managed using the Microsoft 365 account used to create them.
- **Azure AI Bot Services**: An instance of a Bot Services resource in Microsoft Azure serves as a Bot Connector registration. A Bot Services resource is a configuration object that can be created in an Azure subscription using the Teams developer CLI or Azure management tools like the Azure portal, CLI, and ARM and Bicep templates.

Both kinds of registration are suitable for testing and production, but agents that implement single sign-on or OAuth must use an Azure AI Bot Services registration. The recommended approach to agent development is to begin with a Teams Developer Portal registration and migrate to an Azure AI Bot Services registration later if needed.

### App manifest: agent definition and configuration

An agent's app manifest is a JSON configuration file that contains everything needed by the Teams platform to distribute it and present it as a Teams app. For example, it includes:

- The agent's name and description
- Information about the agent's developer
- The ID of the agent's Entra ID app registration
- The ID of the agent's Bot Connector registration
- Platform-level configuration required for certain agent features
- A list of privileged Teams operations the agent needs permissions to access

Developers deploy an agent's app manifest to the Teams platform using the Teams Developer Portal or the Teams developer CLI. During development, they can access a private installation link from the portal or the CLI to install the agent to their Teams client, even though it has not yet been published. When development is complete, they use the portal to publish the agent to the Teams Store or to their organizational app catalog. When a user installs the agent, its app manifest is loaded to their device and used to present the agent in Teams.

## Teams developer CLI

The Teams developer CLI is designed to create all of these provisioning artifacts at the beginning of development. Running `teams app create` creates:

1. An Entra ID app registration in your tenant, configured with a client secret used for authentication
1. A bot registration in Teams Developer Portal, configured to use the app registration as the agent's identity
1. A starter app manifest, which references the bot registration and is deployed to the Teams platform
1. A configuration file for the agent's runtime containing the client secret, used by Teams SDK to authenticate to the Bot Connector API
