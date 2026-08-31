---
title: SSO Setup
description: Describes how to configure SSO in Teams
ms.topic: how-to
ms.date: 07/27/2026
---

# SSO Setup

This section describes how to configure the Azure Bot Service (ABS), the Entra App Registration and the Teams manifest to enable Single-Sign-On (SSO) for your Teams app.

> [!TIP]
>
> Let an AI assistant run this for you
> The [`teams-dev` skill](../../developer-tools/agent-skills.md) can orchestrate the full SSO setup for you  install it in your AI coding assistant and say *"set up SSO for my Teams bot"*.

## Prerequisites

Before starting SSO configuration, ensure you have:

- An **Azure-managed** Azure Bot Service resource and its associated Entra App Registration (Application ID / Client ID and Tenant ID).
- To set up using CLIs: the [`az` CLI](/cli/azure/install-azure-cli) and the [Teams Developer CLI](https://microsoft.github.io/teams-sdk/cli/getting-started/installation/) installed and authenticated.

> [!NOTE]
>
> CLI users: migrate first if your bot is Teams-managed
>
> SSO requires an Azure-managed bot because the OAuth connection lives in Azure Bot Service. If you registered with `teams app create` (default Teams-managed), migrate your bot first:
>
> ```bash
> teams app bot migrate "<appId>" --subscription "<id>" --resource-group "<rg>"
> ```
>
> Your `CLIENT_ID`, `CLIENT_SECRET`, and `TENANT_ID` stay the same. See [bot locations](https://microsoft.github.io/teams-sdk/teams/azure-configuration/) for details.

## Configure the Entra App Registration for SSO

You need an Entra ID App Registration to configure the OAuth connection in Azure Bot Service. If you don't already have one, follow the [Create the Entra App Registration](../azure-configuration.md#create-the-entra-app-registration).

# [Azure Portal - OAuth Connection](#tab/portal)

1. Add the Bot Framework redirect URI. From your App Registration, navigate to **Authentication** and add a **Web** platform redirect URI with the value `https://token.botframework.com/.auth/web/redirect`

:::image type="content" source="~/assets/screenshots/entra-auth-redirect.png" alt-text="Entra auth redirect" lightbox="~/assets/screenshots/entra-auth-redirect.png" :::
2. Configure the API. From `Expose an API`, click `Add` to Application ID URI and set the value to `api://<Your-Application-Id>`. Add the scope `access_as_user` and select who can *consent*.

:::image type="content" source="~/assets/screenshots/entra-oauth-scopes.png" alt-text="Entra oauth scopes" lightbox="~/assets/screenshots/entra-oauth-scopes.png" :::
3. Authorize the client applications for SSO. To enable the Teams clients, desktop and web, to perform the SSO flow you must add the following client applications to the scope defined before: Teams Desktop `1fec8e78-bce4-4aaf-ab1b-5451cc387264` and Teams Web `5e3ce6c0-2b1f-4285-8d4b-75ee78787346`

:::image type="content" source="~/assets/screenshots/entra-authorize-clientapp.png" alt-text="Entra oauth authorize client app" lightbox="~/assets/screenshots/entra-authorize-clientapp.png" :::

# [Azure CLI - OAuth Connection](#tab/cli)

The full SSO setup involves several steps the Teams Developer CLI doesn't handle directly (creating the `access_as_user` scope, pre-authorizing Teams clients, configuring the OAuth connection in Azure Bot Service, updating `webApplicationInfo` in the manifest). The [`teams-dev` skill](../../developer-tools/agent-skills.md) orchestrates all of this for you  install it in your AI coding assistant and say *"set up SSO for my Teams bot"*.

## Step 1: Look Up the AAD App Object ID

The Microsoft Graph object ID differs from the app's Client ID. Query it using the `az` CLI:

```bash

az rest \
  --method GET \
  --uri "https://graph.microsoft.com/v1.0/applications?\$filter=appId eq '$appId'" \
  --query "value[0].id" \
  --output tsv
```

Save the result as your `objectId`.

### Step 2: Generate a Scope UUID

The `access_as_user` scope needs a stable unique identifier. Generate one with PowerShell, bash, or any UUID tool:

```bash

# PowerShell
[guid]::NewGuid().ToString()

# bash / macOS / Linux
uuidgen
```

Save the result as your `scopeId`.

### Step 3: Configure the AAD App (Identifier URI, Scope, Redirect URI)

Substitute your `appId` and `scopeId` into the following command:

```bash

az rest \
  --method PATCH \
  --uri "https://graph.microsoft.com/v1.0/applications/$objectId" \
  --headers "Content-Type=application/json" \
  --body "{
    \"identifierUris\": [\"api://botid-$appId\"],
    \"api\": {
      \"requestedAccessTokenVersion\": 2,
      \"oauth2PermissionScopes\": [{
        \"id\": \"$scopeId\",
        \"adminConsentDescription\": \"Allow the application to access the bot on behalf of the signed-in user.\",
        \"adminConsentDisplayName\": \"Access as user\",
        \"userConsentDescription\": \"Allow the application to access the bot on your behalf.\",
        \"userConsentDisplayName\": \"Access as user\",
        \"isEnabled\": true,
        \"type\": \"User\",
        \"value\": \"access_as_user\"
      }]
    },
    \"web\": {
      \"redirectUris\": [\"https://token.botframework.com/.auth/web/redirect\"]
    }
  }"
```

### Step 4: Pre-Authorize Teams Clients

Pre-authorize the Teams desktop and web clients so they can silently acquire SSO tokens. Substitute your `scopeId`:

```bash

az rest \
  --method PATCH \
  --uri "https://graph.microsoft.com/v1.0/applications/$objectId" \
  --headers "Content-Type=application/json" \
  --body "{
    \"api\": {
      \"oauth2PermissionScopes\": [{
        \"id\": \"$scopeId\",
        \"adminConsentDescription\": \"Allow the application to access the bot on behalf of the signed-in user.\",
        \"adminConsentDisplayName\": \"Access as user\",
        \"userConsentDescription\": \"Allow the application to access the bot on your behalf.\",
        \"userConsentDisplayName\": \"Access as user\",
        \"isEnabled\": true,
        \"type\": \"User\",
        \"value\": \"access_as_user\"
      }],
      \"preAuthorizedApplications\": [
        {
          \"appId\": \"1fec8e78-bce4-4aaf-ab1b-5451cc387264\",
          \"delegatedPermissionIds\": [\"$scopeId\"]
        },
        {
          \"appId\": \"5e3ce6c0-2b1f-4285-8d4b-75ee78787346\",
          \"delegatedPermissionIds\": [\"$scopeId\"]
        }
      ]
    }
  }"
```

> [!NOTE]
>
> The pre-authorization patch must run after the scope patch because the pre-authorized apps reference the `scopeId`, which must exist first. If it fails with a scope-not-found error, wait 15 seconds (AAD replication lag) and retry.

---

## Create the OAuth connection in Azure Bot Service

You need to add a new OAuth connection to your Azure Bot Service resource.

# [Azure Portal](#tab/portal)

1. From the Bot service resource in the Azure Portal, navigate to `Settings/Configuration` and `Add OAuth Connection settings`.
2. Provide a name for your connection e.g. `graph`, and select the *Service Provider* `Azure Active Directory v2`
3. Populate the `TenantId`/`ClientId`/`ClientSecret` from the values obtained in the previous section. Configure the Token Exchange URL with the Application ID URI (e.g. `api://<Your-Application-Id>`), and add the Scopes you need e.g. `User.Read`

:::image type="content" source="~/assets/screenshots/abs-oauth-connection.png" alt-text="ABS OAuth connection" lightbox="~/assets/screenshots/abs-oauth-connection.png" :::

# [Azure CLI](#tab/cli)

Use the `az bot authsetting create` command to create the OAuth connection. The `--setting-name` is the OAuth connection name  `"graph"` is used here as an example since Microsoft Graph is the most common scenario. Replace the other placeholders with your values:

```bash

az bot authsetting create \
  --resource-group $resourceGroup \
  --name $botName \
  --setting-name "graph" \
  --client-id $appId \
  --client-secret $clientSecret \
  --provider-scope-string "User.Read" \
  --service "Aadv2" \
  --parameters tenantId=$tenantId tokenExchangeUrl=api://botid-$appId
```

> [!TIP]
>
> To include additional permissions (Graph, SharePoint, etc.), space-delimit them: `"User.Read Mail.Read Sites.Read.All"`.

---

## Configure the App Manifest

The Teams application manifest needs to be updated to include `webApplicationInfo` with the `Application Id` and `Application ID URI`.

# [Manifest JSON](#tab/manifest)

Add `*.botframework.com` to `validDomains` and add the `webApplicationInfo` section to your `manifest.json`:

```json

"validDomains": [
    ...
    // highlight-next-line
    "*.botframework.com"
 ],
 // highlight-start
 "webApplicationInfo": {
    "id": "<Your-Application-Id>",
    "resource": "api://<Your-Application-Id>"
  }
 // highlight-end
```

# [Teams Developer CLI](#tab/teams-cli)

> [!NOTE]
>
> This option is available if your app was created using the Teams Developer CLI.

You can set the `webApplicationInfo` fields directly without downloading and re-uploading the manifest:

```bash

teams app update $teamsAppId \
  --web-app-info-id "$appId" \
  --web-app-info-resource "api://botid-$appId"
```

You can then verify the full SSO configuration with the doctor command:

```bash

teams app doctor $teamsAppId
```

Expected all SSO checks pass:

- Identifier URI: `api://botid-<appId>`
- `access_as_user` scope
- Teams clients pre-authorized
- Bot Framework redirect URI present
- OAuth connection  URIs aligned

---

## Cross-Tenant Considerations

If your Entra auth app lives in a different tenant than where the Teams app is installed, see [Cross-Tenant Considerations](troubleshooting-sso.md#cross-tenant-considerations) in the troubleshooting guide.

## Troubleshooting

If you encounter SSO errors, see the [Troubleshooting](./troubleshooting-sso.md) guide for common issues and solutions.
