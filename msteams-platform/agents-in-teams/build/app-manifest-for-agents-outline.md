---
title: App manifest for AI-powered agents  
description: Reference guide to the JSON manifest that defines skills, permissions, and runtime requirements for Microsoft Teams agents and Copilot plug-ins.  
ms.localizationpriority: medium  
ms.topic: reference  
ms.date: 07/02/2025  
---
# App manifest for AI-powered agents  

[Brief intro – ≤ 75 words about the role of the manifest, where it lives, and how it powers both Teams and Copilot surfaces.]

## Manifest versions and $schema URLs  

| Version | Use-case | $schema URL | Notes |
|---------|----------|-------------|-------|
| `v1.22` | AI agents & Copilot plug-ins (preview) | `https://developer.microsoft.com/json-schemas/teams/v1.22/MicrosoftTeams.schema.json` | Adds `copilotAgents`, `actions`, `elementRelationshipSet`. |
| `v1.16–1.21` | Classic Teams apps |  | Still supported; agents require 1.22+. |

## Minimum file structure  

```json
{
  "$schema": ".../v1.22/MicrosoftTeams.schema.json",
  "manifestVersion": "1.22",
  "version": "1.0.0",
  "id": "<GUID>",
  "developer": { ... },
  "name": { "short": "Contoso Agent" },
  "description": { "short": "..." },
  "icons": { "color": "color.png", "outline": "outline.png" },
  "copilotAgents": { ... },
  "permissions": [ ... ],
  "validDomains": [ ... ]
}
```

## Key manifest sections for agents  

### `copilotAgents`  

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| `declarativeAgents` | array | Optional | Plug-in style agents powered by OpenAPI + declarative prompts. |
| `customEngineAgents` | array | Optional | Agents that run custom orchestration logic. |

#### Declarative agent example  

```json
{
  "copilotAgents": {
    "declarativeAgents": [
      {
        "id": "salesInsights",
        "fullName": "Contoso Sales Insights",
        "description": "Answer questions about opportunities",
        "actions": [ "listDeals", "getDeal" ],
        "knowledgeSources": [ "https://contoso.com/kb/sales" ]
      }
    ]
  }
}
```

### `actions`  

Defines function-calling surface for Copilot.  

```json
"actions": [
  {
    "id": "getDeal",
    "parameters": [
      { "name": "dealId", "type": "string", "description": "CRM opportunity ID" }
    ],
    "description": "Fetches a specific deal"
  }
]
```

### `elementRelationshipSet` *(cross-host runtime)*  

- `oneWayDependency` – e.g., message extension depends on bot.  
- `mutualDependencies` – e.g., tab & agent must deploy together.  

### `authorization.permissions.resourceSpecific`  

Explain how to request RSC scopes so Copilot can call the agent on behalf of the user.

### `webApplicationInfo`  

Reference to Microsoft Entra app; required for SSO and Graph calls.

### `validDomains`  

List all service endpoints—including dev tunnels—your agent will call.

## Tooling tips  

- **Agents Toolkit** auto-generates and updates manifest during scaffold, debug, and deploy.  
- **Developer Portal** offers a form-based manifest editor with agent-specific fields.  
- Use `atk package` or `atk preview` to validate against the schema and perform static checks.

## Common validation errors  

| Error message | Fix |
|---------------|-----|
| `manifestVersion must be 1.22` | Upgrade `$schema` and `manifestVersion`. |
| `actions.parameters missing description` | Add `description` to every parameter. |
| `id not unique` | Generate a new GUID for each agent. |

## Samples  

- **Declarative plug-in manifest:** `teams-samples/agents/declarative-plugin/manifest.json`  
- **Custom engine agent manifest:** `teams-samples/agents/custom-engine/manifest.json`

## Next step  

Learn how to “[Build bots, message extensions, tabs & cards](build-bots-message-extensions-tabs-and-cards.md)” that implement the skills declared in your manifest.

## See also  

- [Tools & SDKs for building agents](tools-and-sdks-for-agents.md)  
- [Resource-specific consent for agents](../graph-api/rsc/resource-specific-consent.md)
