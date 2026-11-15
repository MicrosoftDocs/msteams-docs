---
title: Set up your agent factory
description: Agent factory setup starts with a Microsoft Entra blueprint. Register it, add permissions, connect Teams SDK, and publish to Agent 365. Get started now.
ms.topic: article
ms.date: 11/14/2026
ms.author: umangsehgal
author: umangsehgal
---

# Set up your agent factory

You set up your agent factory once, in your own tenant. Then each customer's admin activates it in theirs.

## Step 1: Register a blueprint

Create an agent identity blueprint registration in Microsoft Entra. You can do this in Teams Developer Portal. The blueprint is your agent factory: every agent your users create is its child and inherits its configuration unless you override it.

## Step 2: Set the callback URL

Set the blueprint's callback URL to the messaging endpoint where your service listens, for example `https://{your-host}/api/messages`. Messages and lifecycle notifications for all of your agents arrive there.

## Step 3: Add permissions

Add the Microsoft Entra permissions your agents need for their jobs to the blueprint. Every agent created from the blueprint starts with these permissions.

## Step 4: Add Teams SDK to your service

Install Teams SDK in your service, and configure it with the blueprint's client ID, credential, and tenant ID, the same settings a standard Teams app uses. Teams SDK then receives each activity and gets the tokens your agents need.

## Step 5: Package and publish your agent factory

To make your agent factory available in Agent 365, where admins govern agents, wrap the blueprint in a Microsoft 365 app package. The package has two main files.

manifest.json:

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

acme-agenticuser-template.json:

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

* Through Partner Center, to make your agent factory available to every organization.
* Through the Microsoft 365 admin center, to make it available in one organization only, as a line-of-business app.

## What your customer's admin does

Before anyone in an organization can create agents from your agent factory, an admin there activates it in the Microsoft 365 admin center:

1. Go to the Agents page of the Microsoft 365 admin center, [https://admin.cloud.microsoft/#/agents/all](https://admin.cloud.microsoft/#/agents/all).
1. Select your agent factory, for example Acme Agent Factory, and then select Activate.
1. Choose who can create agents from it: all users, or specific users and groups.
1. Grant the permissions your agent factory needs.
1. Select Review and finish.

:::image type="content" source="../../../assets/images/activate-agent-factory-admin-center.png" alt-text="A screenshot of the Microsoft 365 admin center, showing an agent factory being activated." lightbox="../../../assets/images/activate-agent-factory-admin-center.png":::

*Activating an agent factory in the Microsoft 365 admin center.*

> [!div class="nextstepaction"]
> [Next: Create Agentic Users for your agents](create-agentic-users.md)
