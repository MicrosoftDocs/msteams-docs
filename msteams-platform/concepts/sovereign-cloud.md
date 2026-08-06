---
title: Teams for Sovereign Clouds
author: nickwalk
description: Learn about sovereign clouds supported by Teams, including US Government (GCC-High, DoD) and China (21Vianet), and how to configure your app for these environments.
ms.topic: article
ms.localizationpriority: high
ms.date: 07/27/2026
---

# Plan for sovereign clouds

Sovereign clouds are designed to operate within specific countries or regions to comply with local data privacy regulations. They use separate Azure infrastructure with different service endpoints for authentication, token services, and bot communication.

Teams supports the following sovereign cloud environments:

- **US Government (GCC-High)**: For US government agencies and contractors handling controlled unclassified information.
- **US Government (DoD)**: For the US Department of Defense.
- **China (21Vianet)**: For the China market, operated and managed by 21Vianet, the largest service provider in the country/region.

> [!NOTE]
> If your app runs in the standard commercial (public) cloud, no additional sovereign cloud configuration is needed.

## Supported clouds

The following table lists the supported cloud environments and their associated portals and Teams clients:

| Cloud | Value | Azure Portal | Teams Client |
| --- | --- | --- | --- |
| Public (default) | `Public` | portal.azure.com | teams.microsoft.com |
| US Gov (GCC-High) | `USGov` | portal.azure.us | gov.teams.microsoft.us |
| US Gov (DoD) | `USGovDoD` | portal.azure.us | dod.teams.microsoft.us |
| China (21Vianet) | `China` | portal.azure.cn | n/a |

### Prerequisites

To deploy an app in a sovereign cloud, you need:

- A Teams tenant in the corresponding cloud environment.
- An Azure Bot resource and app registration in the sovereign cloud portal.

## Configure your app for a sovereign cloud

The Teams SDK handles sovereign cloud configuration automatically when you specify your cloud environment. Add the `CLOUD` environment variable to your existing app authentication configuration.

Valid values: `Public`, `USGov`, `USGovDoD`, `China`

### Configuration using appsettings.json

```json
{
  "Teams": {
    "ClientId": "your-client-id",
    "ClientSecret": "your-client-secret",
    "TenantId": "your-tenant-id",
    "Cloud": "USGov"
  }
}
```

### Programmatic configuration

```csharp
var app = new App(new AppOptions
{
    Cloud = CloudEnvironment.USGov,
    Credentials = new ClientCredentials("client-id", "client-secret")
});
```

Available cloud presets: `CloudEnvironment.Public`, `CloudEnvironment.USGov`, `CloudEnvironment.USGovDoD`, `CloudEnvironment.China`

### Per-endpoint overrides

For scenarios that require customization of individual endpoints, such as China single-tenant bots that need a tenant-specific login URL, you can override specific properties.

```json
{
  "Teams": {
    "Cloud": "China",
    "LoginTenant": "your-tenant-id"
  }
}
```

Available override properties: `LoginEndpoint`, `LoginTenant`, `BotScope`, `TokenServiceUrl`, `OpenIdMetadataUrl`, `TokenIssuer`, `GraphScope`

### What the SDK configures automatically

When you set a cloud environment, the SDK automatically uses the correct endpoints for:

- **Login authority**: Where tokens are acquired (for example, `login.microsoftonline.us` for GCC-High).
- **Bot token scope**: The OAuth scope for bot-to-service communication.
- **Token service URL**: Where user OAuth tokens are managed.
- **JWT validation**: The signing keys and issuers used to verify inbound activity tokens.
- **OpenID metadata**: The discovery endpoint for token validation configuration.

You don't need to configure these endpoints individually.

## Teams operated by 21Vianet

Microsoft 365 operated by 21Vianet is tailored specifically for China and hosts [Microsoft Teams operated by 21Vianet](/officeupdates/teams-app-versioning). To deploy Teams operated by 21Vianet, you must purchase a suitable plan. For more information, see [Office 365 plan operated by 21Vianet](/azure/information-protection/parity-between-azure-information-protection).

### Apps, capabilities, and experiences

The following table details the apps and its capabilities supported for Teams operated by 21Vianet:

| &nbsp; | Teams operated by 21Vianet |
| ------------- | --- |
| **Apps** | &nbsp; |
| Apps built by Microsoft | ✔️ |
| Third-party apps | ❌ |
| Custom apps built for your org (LOB apps) distributed and used in specific organization | ✔️ |
| Upload a custom app | ❌ |
| **App capabilities** | &nbsp; |
| Tabs | ✔️ |
| Bots | ❌ |
| Message extensions | ❌ |
| Message actions | ❌ |
| Cards: Adaptive, Hero, Thumbnail, Microsoft 365 connector, Receipt, Sign in, and OAuth cards | ❌ |
| Dialogs (referred as task modules in TeamsJS v1.x) | ✔️ |
| Link unfurling | ❌ |
| Meeting extensions | ❌ |
| Connectors and webhooks | ❌ |
| Workflows | ❌ |
| **Experiences** | &nbsp; |
| Teams Store | ✔️ |
| In-context Teams Store or app flyouts | ✔️ |
| Manage apps in Teams | ✔️ |
| Manage apps in Teams Admin Center | ✔️ |
| Graph APIs | ✔️ |
| Developer Portal for Teams | ❌ |

### Service and availability

 The features that are available in Teams depends on the Microsoft 365 plan purchased. For more information, see [feature availability](/office365/servicedescriptions/office-365-platform-service-description/teams-operated-by-21vianet) in Teams operated by 21Vianet.

## Troubleshoot sovereign cloud issues

### Bot fails to acquire a token at startup

**Symptom:** The SDK logs `AADSTS500011` (resource principal not found) or `AADSTS700016` (application not found in directory) when the app starts.

**Cause:** The bot's app registration lives in the wrong cloud's tenant. Sovereign clouds have separate Microsoft Entra ID instances from the public cloud, and an app registered in the commercial cloud can't authenticate to a sovereign tenant (and vice versa).

**Fix:** Register the bot in the sovereign cloud portal that matches your `Cloud` setting. For US Gov/DoD, use `portal.azure.us`. For China, use `portal.azure.cn`.

### Inbound activities are rejected with issuer mismatch or audience invalid

**Symptom:** Token validation fails on inbound `/api/messages` requests. Logs show `IDX10204` or `IDX10214`.

**Cause:** The bot is configured for the wrong cloud, so its JWT validator expects tokens signed by a different issuer than the one your sovereign Bot Channel Service uses.

**Fix:** Confirm the `Cloud` setting matches the cloud your Azure Bot resource was created in.

### China bots fail user OAuth flows

**Symptom:** OAuth or user-token flows fail in China with login redirects that don't resolve.

**Cause:** China sovereign cloud doesn't have a stable multitenant login alias. Single-tenant bots must point to their specific tenant explicitly.

**Fix:** Override `LoginTenant` on the China preset to your tenant ID:

```json
{
  "Teams": {
    "Cloud": "China",
    "LoginTenant": "your-tenant-id"
  }
}
```

### CLOUD environment variable seems ignored

**Symptom:** The bot still uses public cloud endpoints despite setting `CLOUD=USGov`.

**Cause:** Either the environment variable isn't set in the running process, or your code passes `Cloud` explicitly, which takes precedence.

**Fix:** Confirm the environment variable is exported into the process environment, and check whether your code passes `Cloud` explicitly. The value passed in code wins over the environment variable.

### Next steps

After configuring your cloud environment, your bot will authenticate and communicate using the correct sovereign cloud endpoints. No other code changes are needed; OAuth flows and all other SDK features work identically across clouds.

## See also

- [Microsoft 365 operated by 21Vianet](/office365/servicedescriptions/office-365-platform-service-description/microsoft-365-operated-by-21vianet)
- [Teams SDK sovereign cloud configuration](https://microsoft.github.io/teams-sdk/csharp/essentials/app-configuration/sovereign-cloud/)
