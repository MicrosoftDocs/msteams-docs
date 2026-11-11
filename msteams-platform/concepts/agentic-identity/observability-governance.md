---
title: Observability and governance
description: Connect Teams SDK telemetry to Agent 365 monitoring and governance while protecting sensitive data.
ms.topic: article
ms.date: 11/11/2026
---

# Observability and governance

Agent 365 observability has three layers:

1. **Teams SDK telemetry** records normal activity processing, handler, authentication, API, and state operations.
2. **Agent 365 [baggage](https://opentelemetry.io/docs/concepts/signals/baggage/)** adds identity and correlation context to child [spans](https://opentelemetry.io/docs/concepts/signals/traces/#spans).
3. **Application telemetry setup** creates Agent 365 scopes and configures the Microsoft [OpenTelemetry distribution](https://opentelemetry.io/docs/concepts/distributions/) and [exporters](https://opentelemetry.io/docs/concepts/components/#exporters).

:::image type="content" source="../../assets/agentic-user-observability.png" alt-text="Diagram illustrating the primarily layers of agentic user observability":::

The SDK establishes correlation context for reactive operations. For proactive work, open a scope with the selected `AgenticIdentity` before creating the span that represents the operation.

> [!IMPORTANT]
> Baggage alone does not create Agent 365 governance records. Your app must configure the supported Agent 365 scopes, [processors](https://opentelemetry.io/docs/specs/otel/trace/sdk/#span-processor), authentication, and exporter.
>

## Configure the SDK bridge

The Microsoft OpenTelemetry distribution and Agent 365 exporter are optional for Teams SDK telemetry. We recommend configuring them when you want agent activity to appear in Microsoft Defender and Microsoft Purview for governance. See [Microsoft OpenTelemetry Distro](/microsoft-agent-365/developer/microsoft-opentelemetry) for setup guidance.

Teams SDK doesn't depend on a specific exporter. It provides the token and baggage integration points.

For reactive turns, configure the Agent 365 baggage bridge when you create the app. The SDK establishes the baggage before its root turn span starts.

::: zone pivot="teams-sdk-csharp"

Teams SDK adds Agent 365 baggage before each reactive turn.

::: zone-end

::: zone pivot="teams-sdk-typescript"

```typescript
import { App } from '@microsoft/teams.apps';

const agent365 = {
  operationSource: 'support-agent',
  // Identifiers are included by default. Extra data is opt-in.
  include: ['agentName'],
} as const;

const app = new App({
  telemetry: { agent365 },
});
```

::: zone-end

::: zone pivot="teams-sdk-python"

```python
from microsoft_teams.apps import Agent365BaggageOptions, App

agent365: Agent365BaggageOptions = {
    "operation_source": "support-agent",
    # Identifiers are included by default. Extra data is opt-in.
    "include": ["agentName"],
}

app = App(telemetry={"agent365": agent365})
```

::: zone-end

Acquire an Agent 365 exporter token through the same identity setup used by Teams SDK:

::: zone pivot="teams-sdk-csharp"

```csharp
using Microsoft.Identity.Abstractions;
using Microsoft.Identity.Web;

const string observabilityScope =
    "api://9b975845-388f-4429-889e-eab1ef63949c/.default";
var provider =
    webApp.Services.GetRequiredService<IAuthorizationHeaderProvider>();
var tokenOptions = new AuthorizationHeaderProviderOptions
{
    AcquireTokenOptions = new()
    {
        AuthenticationOptionsName = "AzureAd",
        Tenant = agenticIdentity.TenantId
    }
};

tokenOptions.WithAgentUserIdentity(
    agenticIdentity.AgenticAppId!,
    new Guid(agenticIdentity.AgenticUserId!));

string authorization = await provider.CreateAuthorizationHeaderAsync(
    [observabilityScope],
    tokenOptions);
string token = authorization["Bearer ".Length..];
```

::: zone-end

::: zone pivot="teams-sdk-typescript"

```typescript
const observabilityScope = 'api://9b975845-388f-4429-889e-eab1ef63949c/.default';

const token = await app.tokenProvider.getAgenticAppToken(
  observabilityScope,
  agenticAppId,
  tenantId
);
```

::: zone-end

::: zone pivot="teams-sdk-python"

Use the app's token provider to request an observability token for the Agentic App Instance.

```python
OBSERVABILITY_SCOPE = "api://9b975845-388f-4429-889e-eab1ef63949c/.default"

token = await app.token_provider.get_agentic_app_token(
    OBSERVABILITY_SCOPE,
    agentic_app_id,
    tenant_id,
)
```

::: zone-end

For proactive work, establish identity baggage before creating the Agent 365 operation span and before calling Teams APIs.

::: zone pivot="teams-sdk-csharp"

```csharp
var agentDetails = new AgentDetails(
    agentId: agenticIdentity.AgenticAppId,
    agenticUserId: agenticIdentity.AgenticUserId,
    agentBlueprintId: agenticIdentity.AgenticAppBlueprintId,
    tenantId: agenticIdentity.TenantId);

using var scope = InvokeAgentScope.Start(
    new Request(conversationId: conversationId),
    new InvokeAgentScopeDetails(serviceUrl),
    agentDetails);

await teamsApp.SendAsync(
    conversationId,
    "Digest ready.",
    serviceUrl,
    agenticIdentity,
    cancellationToken);
```

::: zone-end

::: zone pivot="teams-sdk-typescript"

```typescript
import { createAgent365Scope } from '@microsoft/teams.apps';

const withAgent365Scope = createAgent365Scope(agent365);

await withAgent365Scope({ agenticIdentity, conversationId }, async () => {
  // Create the Agent 365 operation span inside this callback.
  await app.send(conversationId, 'Digest ready.', {
    agenticIdentity,
  });
});
```

::: zone-end

::: zone pivot="teams-sdk-python"

```python
from microsoft_teams.apps import create_agent365_scope

open_agent365_scope = create_agent365_scope(agent365)

with open_agent365_scope(
    agentic_identity=agentic_identity,
    conversation_id=conversation_id,
):
    # Create the Agent 365 operation span inside this scope.
    await app.send(
        conversation_id,
        "Digest ready.",
        agentic_identity=agentic_identity,
    )
```

::: zone-end

Use the app's token provider when the Agent 365 exporter requires authentication. Short-lived processes must flush the tracer provider or shut down the Microsoft OpenTelemetry distribution before they exit.

For telemetry data guidance, see [Handling sensitive data in OpenTelemetry](https://opentelemetry.io/docs/security/handling-sensitive-data/).

## Governance

When the app and tenant are configured for Agent 365 governance, identity-aware telemetry can support:

- attribution of actions to an Agentic User or app instance;
- audit and investigation in Microsoft security and compliance tools;
- administrator controls for enablement, disablement, ownership, and deletion;
- monitoring of agent, model, and tool activity.

Use the [Agent 365 documentation](/microsoft-agent-365/) for current governance, Microsoft Defender, and Microsoft Purview setup. The SDK does not grant access to those products or replace their tenant configuration.
