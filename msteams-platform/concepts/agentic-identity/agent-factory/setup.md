---
title: Set up an agent factory for Microsoft Teams
description: Register an agent identity blueprint, configure Teams SDK authentication, package your agent factory, and prepare it for customer admin activation.
ms.topic: article
ms.date: 11/15/2026
ms.author: umangsehgal
author: umangsehgal
---

# Set up an agent factory for Microsoft Teams

This article is part 2 of the [Build an agent factory with Agentic Users in Teams](build-agent-factory.md) series.

You set up your agent factory once, in your own tenant. Then each customer's admin activates it in theirs.

## Prerequisites

* A development tenant and permission to register an agent identity blueprint. The Agent 365 setup workflow supports the **Agent ID Developer** and **Global Administrator** roles; a Global Administrator must complete any required admin consent.
* A Teams SDK service in TypeScript, C#, or Python, with a publicly reachable HTTPS messaging endpoint. The SDK examples in this series use version 2.2.1.
* Access to a customer test tenant and an administrator who can activate the factory and grant consent. Verify the licenses and feature availability required by the Microsoft 365 workloads your agents use.

For the supported registration tools and their prerequisites, see [Set up an agent blueprint](/microsoft-agent-365/developer/registration).

> [!IMPORTANT]
> The agentic-user template in this article uses a preview schema. Confirm that your development and customer tenants support the required features before testing or publishing.

## Step 1: Register a blueprint

Create an agent identity blueprint registration in Microsoft Entra by following [Set up an agent blueprint](/microsoft-agent-365/developer/registration). Use the AI teammate setup for agents that need an Agentic User. The blueprint is the reusable identity definition for your factory; each agent has its own child agent identity.

## Step 2: Set the callback URL

Set the blueprint's callback URL to the messaging endpoint where your service listens, for example `https://{your-host}/api/messages`. Messages and lifecycle notifications for all of your agents arrive there. Follow [Register an agent messaging endpoint](/microsoft-agent-365/developer/agent-messaging-endpoint) for the registration procedure.

## Step 3: Add permissions

Declare only the API permissions your agents need on the blueprint. Declaring a permission isn't the same as granting consent: the customer's administrator reviews and consents to the requested permissions during activation. Each API also enforces its own authorization requirements.

Keep permissions to provision and manage agents separate from the workload permissions an agent needs to read data or take actions. See [Agent permissions](/microsoft-agent-365/developer/registration#agent-permissions).

## Step 4: Add Teams SDK to your service

Install Teams SDK in your service, and configure it with the blueprint's client ID, credential, and tenant ID, the same settings a standard Teams app uses. Teams SDK then receives each activity and gets the tokens your agents need.

# [TypeScript / Python](#tab/typescript-python)

Configure the blueprint identity through your runtime's environment variables. For a user-assigned managed identity configured as a federated identity credential:

```text
CLIENT_ID=<blueprint-client-id>
TENANT_ID=<blueprint-tenant-id>
MANAGED_IDENTITY_CLIENT_ID=<managed-identity-client-id>
```

# [C#](#tab/csharp)

Configure the blueprint identity in `appsettings.json`. For a user-assigned managed identity configured as a federated identity credential:

```json
{
  "AzureAd": {
    "ClientId": "<blueprint-client-id>",
    "TenantId": "<blueprint-tenant-id>",
    "ClientCredentials": [
      {
        "SourceType": "SignedAssertionFromManagedIdentity",
        "ManagedIdentityClientId": "<managed-identity-client-id>"
      }
    ]
  }
}
```

---

Associate the managed identity with the blueprint before using these settings. For installation and credential alternatives in your selected language, follow [Set up Agentic Users](../setup.md) and [Review or update agent runtime authentication configuration](../../../agents-in-teams/configure-agent-runtime-authentication.md). Use client secrets only for local development; never commit credentials to source control.

## Step 5: Package and publish your agent factory

To make your agent factory available in Agent 365, where admins govern agents, wrap the blueprint in a Microsoft 365 app package. Include the following two JSON files and the `color.png` and `outline.png` icons referenced by the manifest at the root of the package ZIP. Replace all placeholder values, including the app ID, blueprint ID, and developer URLs, before validating and uploading the package.

`manifest.json`:

```json
{
  "$schema": "https://developer.microsoft.com/json-schemas/teams/v1.30/MicrosoftTeams.schema.json",
  "manifestVersion": "1.30",
  "version": "1.0.0",
  "id": "{your-app-id}",
  "developer": {
    "name": "Acme",
    "websiteUrl": "https://{your-domain}",
    "privacyUrl": "https://{your-domain}/privacy",
    "termsOfUseUrl": "https://{your-domain}/terms"
  },
  "icons": { "color": "color.png", "outline": "outline.png" },
  "name": { "short": "Acme Agent Factory", "full": "Acme Agent Factory" },
  "description": {
    "short": "{short description}",
    "full": "{full description}"
  },
  "accentColor": "#FFFFFF",
  "agenticUserTemplates": [
    { "id": "acme-agenticuser-template", "file": "acme-agenticuser-template.json" }
  ]
}
```

`acme-agenticuser-template.json`:

```json
{
  "$schema": "https://developer.microsoft.com/json-schemas/teams/vDevPreview/MicrosoftTeams.AgenticUser.schema.json",
  "id": "acme-agenticuser-template",
  "schemaVersion": "0.1.0-preview",
  "agentIdentityBlueprintId": "{your-blueprint-id}",
  "communicationProtocol": "activityProtocol"
}
```

Publish the package in one of two ways:

* Through Partner Center, to distribute your agent factory to customers.
* Through the Microsoft 365 admin center, to make it available in one organization only, as a line-of-business app.

For the upload procedure, see [Publish the agent](/microsoft-agent-365/developer/publish). Publishing makes the offering available; it doesn't replace customer activation or consent.

## What your customer's admin does

Before anyone in an organization can create agents from your agent factory, an admin there activates it in the Microsoft 365 admin center:

1. Go to the Agents page of the Microsoft 365 admin center, [https://admin.cloud.microsoft/#/agents/all](https://admin.cloud.microsoft/#/agents/all).
1. Select your agent factory, for example Acme Agent Factory, and then select Activate.
1. Choose who can create agents from it: all users, or specific users and groups.
1. Grant the permissions your agent factory needs.
1. Select Review and finish.

:::image type="content" source="../../../assets/images/activate-agent-factory-admin-center.png" alt-text="A screenshot of the Microsoft 365 admin center, showing an agent factory being activated." lightbox="../../../assets/images/activate-agent-factory-admin-center.png":::

*Activating an agent factory in the Microsoft 365 admin center.*

Previous: [Build an agent factory with Agentic Users in Teams](build-agent-factory.md).

> [!div class="nextstepaction"]
> [Next: Create Agentic Users for your agents](create-agentic-users.md)
