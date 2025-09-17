---
title: Authentication and single sign-on for AI-powered agents  
description: Configure Microsoft Entra ID, update your agent manifest, and add code to enable seamless single sign-on (SSO) across chat, Copilot, tabs, and message extensions.  
ms.localizationpriority: medium  
ms.topic: how-to  
ms.date: 07/02/2025  
---
# Enable authentication and single sign-on  

This guide shows how to let your agent silently obtain a Microsoft Graph access token on behalf of the signed-in Teams user—no extra prompts, no OAuth pop-ups.

## Prerequisites  

- Microsoft 365 developer tenant with admin rights  
- Azure subscription  
- Agents Toolkit CLI ≥ v1.1 or VS Code extension ≥ v1.1  
- Node 18 / .NET 8 / Python 3.10 project scaffolded via `atk new`  

## 1 – Register (or reuse) a Microsoft Entra application  

1. Open **Entra Admin Center** → **App registrations** → **New registration**.  
2. Name: `ContosoAgentApp`, Supported accounts: *Single tenant*.  
3. Record **Application (client) ID** and **Tenant ID**.  
4. In **Authentication** tab:  
   - Add redirect URI `https://token.botframework.com/.auth/web/redirect`.  
   - Enable *Allow implicit/Hybrid*.  
5. In **API Permissions** tab:  
   - Add `User.Read`, `Chat.Read`, any custom scopes.  
6. *Optional*: create a client secret ( bots only; tabs use SSO token ).  

> [!TIP]  
> Use `atk entra-app upload` to automate steps 1-5.

## 2 – Update the agent manifest  

### `webApplicationInfo` block  

```json
"webApplicationInfo": {
  "id": "<CLIENT_ID>",
  "resource": "api://<CLIENT_ID>"
}
```  

### RSC scopes (if needed)  

```json
"authorization": {
  "permissions": {
    "resourceSpecific": [
      {
        "type": "chat",
        "name": "Chat.Read",
        "description": "Read messages in a chat the user is part of"
      }
    ]
  }
}
```

## 3 – Add client-side code (tabs / message extensions)  

```ts
import { authentication } from "@microsoft/teams-js";

const token = await authentication.getAuthToken({ resources: ["https://graph.microsoft.com"] });
const graphData = await fetch("https://graph.microsoft.com/v1.0/me", {
  headers: { Authorization: `Bearer ${token}` }
}).then(r => r.json());
```

*Handle `error:needsConsent` by calling `authentication.requestAuthToken()` once.*

## 4 – Add server-side code (bots / custom engine)  

### JavaScript  

```ts
import { TeamsActivityHandler, createMicrosoftGraphClient } from "@microsoft/teams-ai";

adapter.setAdapterSettings({
  appId: process.env.M365_APP_ID,
  appPassword: process.env.M365_APP_PASSWORD
});

bot.onMessage(async (context, state) => {
  const oboToken = await adapter.getUserToken(context, { scopes: ["https://graph.microsoft.com/.default"] });
  const graph = createMicrosoftGraphClient(oboToken);
  const profile = await graph.api("/me").get();
  await context.sendActivity(`Hello ${profile.displayName}!`);
});
```

### .NET (snippet)  

```csharp
var result = await userTokenClient.GetUserTokenAsync(turnContext, "graph", scopes);
graphClient = new GraphServiceClient(new DelegateAuthenticationProvider(
   r => { r.Headers.Authorization = new(result.TokenType, result.Token); return Task.CompletedTask; }));
```

## 5 – Test the flow locally  

1. Run `atk preview --env local`.  
2. Toolkit sideloads the app and launches Teams in a debug browser.  
3. First Graph call triggers silent token acquisition; if consent required, admin prompt appears once.

## Troubleshooting  

| Symptom | Resolution |  
|---------|------------|  
| `invalid_grant` after 1 hour | Ensure `oauthTokenProvider` caches refresh tokens for subsequent calls. |  
| Teams mobile shows login dialog | Mobile requires **TeamsJS v2.4+** and HTTPS (dev tunnel). |  
| `AADSTS65001` (consent required) | Grant tenant-wide admin consent in Entra or use RSC scopes only. |

## Next step  

Integrate Graph calls in your agent’s skills—see [Microsoft Graph integration](microsoft-graph-integration-outline.md).

## See also  

- [App manifest for agents](../build/app-manifest-for-agents-outline.md)
- [Resource-specific consent for agents](../../graph-api/rsc/resource-specific-consent.md)
