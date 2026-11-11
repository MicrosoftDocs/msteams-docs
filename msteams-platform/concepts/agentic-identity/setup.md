---
title: Agentic Identity
description: Connect an existing Teams SDK app to an Agentic User and configure app authentication.
ms.topic: how-to
ms.date: 11/11/2026
---

# Set up Agentic Users

## 1. Set up an AI teammate

Follow [Set up an agent blueprint](/microsoft-agent-365/developer/registration) and select the AI teammate setup.

To run a config-free setup, provide an agent name:

```powershell
a365 setup all `
  --agent-name "MyAgent" `
  --aiteammate
```

## 2. Configure Teams SDK

Configure Teams SDK with the blueprint identity. It uses the same authentication settings as a standard Teams app, and the blueprint ID is the application (client) ID.

| Agent 365 value      | App authentication setting                                                       |
| -------------------- | -------------------------------------------------------------------------------- |
| Blueprint ID         | Application (client) ID (`CLIENT_ID`)                                            |
| Blueprint credential | Client secret, user-assigned managed identity, or federated identity credentials |
| Tenant ID            | Tenant ID (`TENANT_ID`)                                                          |

Configure these values as described in [Review or update agent runtime authentication configuration](../../agents-in-teams/configure-agent-runtime-authentication.md).

## 3. Deploy and register the messaging endpoint

Deploy your Teams SDK app to a publicly accessible host, then [register its messaging endpoint](/microsoft-agent-365/developer/agent-messaging-endpoint), typically `https://<host>/api/messages`.

```powershell
a365 setup blueprint --endpoint-only `
  --messaging-endpoint "https://<host>/api/messages"
```

## 4. Publish and create an instance

1. Run `a365 publish` to create the agent package.
2. Follow [Publish the agent](https://learn.microsoft.com/microsoft-agent-365/developer/publish) to upload the package to the Microsoft 365 admin center.
3. [Create an agent instance](https://learn.microsoft.com/microsoft-agent-365/developer/create-instance).

After the instance is approved, its Agentic User can communicate through the deployed Teams SDK app.
