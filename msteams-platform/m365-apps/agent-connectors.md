---
title: Register MCP Servers as Agent Connectors for Microsoft 365
description: Register a remote MCP server as an agent connector by using Work IQ Dev Tools or editing the Microsoft 365 App Manifest.
#customer intent: As a developer, I want to register my MCP server as an agent connector so that Microsoft 365 agents can access my external tools and services.
ms.date: 08/12/2026
ms.topic: how-to
ms.subservice: m365apps
---

# Register MCP servers as agent connectors for Microsoft 365

Agents in Microsoft 365<!--, such as [Channel Agent](/microsoftteams/set-up-channel-agent-teams) in Microsoft Teams,--> can connect to external systems through *agent connectors* declared in the App Manifest. This article shows you how to register your remote Model Context Protocol (MCP) server as an agent connector, enabling Microsoft 365 agents to securely discover, select, and invoke MCP tools that your server exposes.
<!--
> [!NOTE]
>
> Agent Connectors are available in [public developer preview](../resources/dev-preview/developer-preview-intro.md) and only supported in Channel Agent for Microsoft Teams. Additional agent hosts will be supported in the future.
-->

Microsoft 365 agents use agent connectors to communicate with external systems. For MCP servers, the connector provides:

- The network endpoint of your MCP server
- Authentication and authorization configuration
- Tool definitions
- Optional metadata that helps agents orchestrate the right tool during user interactions

Once registered, your MCP server becomes available to any Microsoft 365 agent capable of using MCP.<!--, including the Channel Agent in Microsoft Teams.-->

## Agent connectors and other MCP options

Microsoft 365 offers more than one way to connect an MCP server, and each option has its own manifest, distribution path, and admin experience. Use the following table to confirm that an agent connector is the right option for your scenario. Rows are limited to publicly documented constructs.

| Option | What you author | Consumed by | Admin management |
| --- | --- | --- | --- |
| **Agent connector** (this article) | An `agentConnectors` entry in the Microsoft 365 app manifest (`manifest.json`) | Microsoft 365 agents that support MCP, including [Microsoft 365 Copilot Cowork](/microsoft-365/copilot/cowork/cowork-plugin-development) | The containing app is managed with your other agents and apps in the Microsoft 365 admin center and Teams admin center |
| [**MCP plugin**](/microsoft-365-copilot/extensibility/build-mcp-plugins) | A plugin manifest (`ai-plugin.json`) with a `RemoteMCPServer` runtime | [Declarative agents](/microsoft-365-copilot/extensibility/overview-declarative-agent) for Microsoft 365 Copilot | The containing declarative agent is managed in the Microsoft 365 admin center |
| [**Federated Copilot connector**](/microsoft-365/copilot/connectors/federated-connectors-overview) | A connector submitted to Microsoft for approval and gallery publication | Microsoft 365 Copilot Chat, Copilot in Excel, and the Researcher agent | **Copilot** > **Connectors** in the Microsoft 365 admin center |
| [**Synced Copilot connector**](/microsoft-365/copilot/connectors/overview) | A connector that indexes external content into Microsoft Graph | Microsoft 365 Copilot and Microsoft Search | **Copilot** > **Connectors** in the Microsoft 365 admin center |
| [**Bring your own (BYO) MCP server**](/microsoft-365/admin/manage/manage-tools-for-agent) | A remote MCP server registered with Microsoft Agent 365 | Microsoft Agent 365 agents (preview); doesn't serve Microsoft 365 declarative agents | **Agents** > **Tools** in the Microsoft 365 admin center |

Agent connectors and MCP plugins both point at a remote MCP server that you host, and neither one indexes your data. They differ in which manifest declares them and which hosts consume them. Federated and synced Copilot connectors are separate products with their own submission and admin experiences: an agent connector doesn't appear under **Copilot** > **Connectors**.

## Prerequisites

Before you begin, ensure you have:

- A test tenant to validate your MCP integration
- A working MCP server with a secure public endpoint
- Authentication credentials ([OAuth configuration](../messaging-extensions/api-based-oauth.md#configure-oauth-in-developer-portal) or [API key](../messaging-extensions/api-based-secret-service-auth.md#api-key-authentication))
- [Work IQ Dev Tools (WIQD)](https://aka.ms/wiqd/docs) installed if you use the recommended preview workflow
- An app manifest that uses schema version 1.29 or later. Agent connectors were introduced in version 1.27, but the configurations described in this article require version 1.29. For more information, see [Choose a manifest version](#choose-a-manifest-version).

Registering an existing remote MCP server as an agent connector doesn't require an Azure subscription or any Azure resources. You host the MCP server yourself, and the connector is declared entirely in the app manifest.

> [!NOTE]
> Don't confuse an agent connector with a [Microsoft 365 Copilot connector](/microsoft-365/copilot/connectors/overview), which indexes or federates external content into Microsoft Graph. A Copilot connector is a separate construct that can require Azure resources to host its ingestion service, and it's managed under **Copilot** > **Connectors** in the Microsoft 365 admin center.

## Choose a manifest version

The `agentConnectors` array is available in app manifest version 1.27 and later, but the schema changed in version 1.29. Use version 1.29 or later unless you have a specific reason to target an earlier version.

| Capability | Version 1.27 and 1.28 | Version 1.29 and later |
| --- | --- | --- |
| `agentConnectors` array | Supported | Supported |
| `mcpToolDescription` (static tool definitions) | **Required** | Optional |
| Omitting `mcpToolDescription` for [dynamic tool discovery](#use-dynamic-tool-discovery) | Not supported | Supported, if the host allows it |
| `AzureKeyVault` authorization type | Not supported | Supported |

If you author a connector against version 1.27 or 1.28 and omit `mcpToolDescription`, validation fails with an error that reports a missing required property. Update `$schema` and `manifestVersion` to version 1.29 or later instead of adding an unused tool description file.

Check the requirements of the hosts you target before you choose a version. Hosts can require properties that the schema treats as optional. For example, Microsoft 365 Copilot Cowork currently expects manifest version 1.28 with a tool description for every connector. For more information, see [Build plugins for Copilot Cowork](/microsoft-365/copilot/cowork/cowork-plugin-development).

## Choose an authoring method

Whichever tool you use, the result is the same artifact: an `agentConnectors` entry in your app manifest. The manifest node is what registers your MCP server, so these are different ways to produce the same manifest entry, not different features. What you build works the same regardless of how you author it.

- **Work IQ Dev Tools (recommended preview workflow)**: Use the WIQD agentic interface in GitHub Copilot CLI to create and manage the standalone plugin project containing your agent connector. WIQD is in preview.
- **Manual App Manifest configuration**: Edit the App Manifest directly by using the detailed schema instructions in this article. Use this path for advanced configuration, reference, and troubleshooting during preview.
- **[Microsoft 365 Agents Toolkit](../toolkit/agents-toolkit-fundamentals.md)**: Create or open a Microsoft 365 app project, then add the `agentConnectors` array to its manifest.

All of these methods register an existing remote MCP server. None of them creates or hosts the MCP server for you.

If you author the manifest yourself, you can start from either of two entry points:

- **New project**: Start from a blank Microsoft 365 app or agent project, then add the `agentConnectors` array to its manifest. There's no separate "Agent connector" template; you add the array to a standard Microsoft 365 app manifest.
- **Existing app package**: Add the `agentConnectors` array to the manifest of an app package that you already publish.

## Create the agent connector with WIQD

WIQD includes an agentic interface for GitHub Copilot CLI. Describe the plugin and remote MCP connector that you want to create, and the WIQD orchestrator guides you through project creation, configuration, validation, provisioning, and sharing.

To verify that the WIQD agent is installed and ready to use:

1. Start GitHub Copilot CLI:

   ```console
   copilot
   ```

1. Enter `/agent`.

1. Confirm that `wiqd:wiqd` appears in the list, and then select it. The WIQD agent handles the requests that you enter during the session.

   :::image type="content" source="images/wiqd-copilot.png" alt-text="Screenshot of GitHub Copilot CLI showing the agent selector with the wiqd:wiqd orchestrator available." lightbox="images/wiqd-copilot.png":::

You can also select the WIQD agent when you start GitHub Copilot CLI and provide the first natural-language request:

```console
copilot -i "Create a standalone plugin and add my remote MCP server as an agent connector." --agent wiqd:wiqd
```

### Use the equivalent CLI workflow

The following commands show the underlying workflow for automation, troubleshooting, and reference:

1. Create an empty standalone plugin project:

   ```console
   wiqd plugin create
   ```

1. From the plugin project, add a remote MCP agent connector:

   ```console
   wiqd plugin add connector
   ```

1. Review the generated App Manifest. Use [Configure the remote MCP server endpoint](#configure-the-remote-mcp-server-endpoint), [Configure authentication](#configure-authentication), and [Define tool discovery](#define-tool-discovery) to review or complete the connector configuration.

1. Check the plugin manifest for schema errors before you build the package:

   ```console
   wiqd plugin validate
   ```

1. Validate the built package with [Microsoft 365 Agents Toolkit validation rules](../toolkit/TeamsFx-preview-and-customize-app-manifest.md#validate-app-package-using-validation-rules) before provisioning:

   ```console
   wiqd plugin validate --mode deep
   ```

WIQD uses Microsoft 365 Agents Toolkit for lifecycle operations. Continue to the manual configuration sections for the schema details that WIQD validation reports or that your connector requires.

## Configure the agent connector in the App Manifest manually

For the manual path, declare your MCP server in the [agentConnectors](/microsoft-365/extensibility/schema/root-agent-connectors) array at the root level of your App Manifest. These schema details also help you review and troubleshoot a manifest generated through WIQD.

1. Open your Microsoft 365 App Manifest (`manifest.json`) file.

2. Locate or create the root-level `agentConnectors` array.

3. Add a new connector object with a unique `id`, `displayName`, and `description`:

````json
{
  "$schema": "https://developer.microsoft.com/json-schemas/teams/v1.29/MicrosoftTeams.schema.json",
  "manifestVersion": "1.29",
  ...
  "agentConnectors": [
    {
      "id": "my-mcp-server",
      "displayName": "My Automation Server",
      "description": "Provides workflow automation and task management tools.",
      "toolSource": {
        "remoteMcpServer": {
          "mcpServerUrl": "https://mcp.example.com"
        }
      }
    }
  ]
}
````

The following table lists the properties of each connector object.

| Property | Required | Limit | Description |
| --- | --- | --- | --- |
| `id` | Yes | 64 characters | Unique identifier that distinguishes the connector from other connectors in your manifest. |
| `displayName` | Yes | 128 characters | User-friendly name that can appear in UI. |
| `description` | No | 4,000 characters | Purpose and functionality of the connector. Include it so that agents and admins can tell your connector apart from others. |
| `toolSource` | No | — | Configuration for the tools the connector provides. To register an MCP server, include `toolSource.remoteMcpServer` with an `mcpServerUrl`. |

A manifest can declare a maximum of 10 agent connectors. The connector object and the manifest root both set `additionalProperties` to `false`, so an unknown or misspelled property causes the upload to fail. Each connector must have a unique `id` that distinguishes it from other connectors in your manifest.<!-- The `toolSource` object must include exactly one of `remoteMcpServer`, `localMcpServer`, or `plugin`.For MCP servers, use **remoteMcpServer** unless your server runs locally within the Teams client environment (advanced scenarios).-->

## Configure the remote MCP server endpoint

Define how Microsoft 365 connects to your MCP server using the `remoteMcpServer` object.

1. Within your connector's [toolSource](/microsoft-365/extensibility/schema/root-agent-connectors-tool-source), specify the `remoteMcpServer` endpoint:

    ````json
    "toolSource": {
      "remoteMcpServer": {
        "mcpServerUrl": "https://mcp.example.com"
      }
    }
    ````

2. Ensure your endpoint uses HTTPS. The `mcpServerUrl` value must begin with `https://` and can't exceed 2,048 characters. Other schemes, such as plain HTTP or WebSocket URLs, are rejected during validation.

The endpoint must be publicly accessible and respond to MCP protocol handshake messages. Microsoft 365 agents establish long-lived connections to this endpoint.

## Configure authentication

Specify how Microsoft 365 retrieves credentials when calling your MCP server. The following values are currently supported for MCP server authentication:

- **None**: No authentication required
- **OAuthPluginVault**: OAuth 2.0 tokens stored inside Microsoft’s secure vault
- **ApiKeyPluginVault**: API key stored in a vault and referenced by ID
- **DynamicClientRegistration**: Dynamic OAuth client registration
- **AzureKeyVault**: Secrets stored in your own Azure Key Vault instance (manifest version 1.29 and later)

Every type except `None` requires a `referenceId`. The `referenceId` value points to a configuration that you register separately, so that no secret values are stored in your app manifest.

> [!NOTE]
> Authorization for an app-manifest `agentConnectors` entry is a different surface from the authentication that a [declarative agent plugin](/microsoft-365-copilot/extensibility/plugin-authentication) configures in its own plugin manifest. The two constructs support different schemes. For example, API key authentication is supported for API plugins but not for MCP plugins, whereas an agent connector supports `ApiKeyPluginVault`. Configure authorization for the manifest you're authoring, and don't assume that a scheme available in one is available in the other.

### Use OAuth authentication

For OAuth 2.0 tokens stored in Microsoft's secure vault, specify authorization type `OAuthPluginVault` in your configuration:

````json
"remoteMcpServer": {
  "mcpServerUrl": "https://mcp.example.com",
  "authorization": {
    "type": "OAuthPluginVault",
    "referenceId": "my-oauth-config"
  }
}
````

The `referenceId` points to a secure [OAuth configuration that you register in Developer Portal](https://dev.teams.microsoft.com/tools/oauth-configuration). For details, see [Configure OAuth in Developer Portal](../messaging-extensions/api-based-oauth.md#configure-oauth-in-developer-portal).

When setting up your OAuth app with a third-party authentication provider, ensure that you add `https://teams.microsoft.com/api/platform/v1.0/oAuthRedirect` to the list of allowed redirect endpoints.

### Use API key authentication

For API keys stored in a vault, configure the authorization type as `ApiKeyPluginVault`:

````json
"authorization": {
  "type": "ApiKeyPluginVault",
  "referenceId": "my-apikey"
}
````

The `referenceId` points to an [API key that you register in Developer Portal](https://dev.teams.microsoft.com/tools/api-key-registration). For details, see [API key authentication](../messaging-extensions/api-based-secret-service-auth.md).

### Use dynamic client registration

Dynamic client registration enables Microsoft 365 to register as an OAuth client with your MCP server at runtime using the [RFC 7591](https://datatracker.ietf.org/doc/html/rfc7591) protocol. This approach is useful when your server supports dynamic OAuth flows and you don't want to pre-register client credentials.

Configure the authorization type as `DynamicClientRegistration` with a `referenceId`:

````json
"authorization": {
  "type": "DynamicClientRegistration",
  "referenceId": "my-dcr-config"
}
````

The `referenceId` identifies the dynamic client registration configuration that Microsoft 365 uses when it negotiates client credentials with your MCP server's OAuth registration endpoint. The configuration supplies the authorization values for that exchange, so that no client secret is stored in your manifest.

> [!IMPORTANT]
> Human review needed: No published procedure documents a Developer Portal (or other) flow for registering a dynamic client registration configuration for `agentConnectors` (escalation E5). Confirm the registration surface and the exact value that `referenceId` must contain before publishing.

Your server must:

- Expose a [RFC 7591](https://datatracker.ietf.org/doc/html/rfc7591) compliant client registration endpoint.
- Return a `client_id` and `client_secret` that Microsoft 365 can use to obtain access tokens.
- Support token refresh for long-lived sessions.

### Use Azure Key Vault authentication

Azure Key Vault authentication allows you to store and manage your MCP server credentials in your own [Azure Key Vault](/azure/key-vault/general/overview) instance. This gives you full control over secret lifecycle management, including rotation, access policies, and audit logging. This authorization type requires manifest version 1.29 or later.

Configure the authorization type as `AzureKeyVault`:

````json
"authorization": {
  "type": "AzureKeyVault",
  "referenceId": "my-keyvault-secret"
}
````

The `referenceId` identifies the secret configuration that maps to your Azure Key Vault secret, so that Microsoft 365 can retrieve the secret at runtime without storing it in your manifest.

To set up Azure Key Vault authentication:

1. Store your MCP server credentials (API key or client secret) as a secret in your [Azure Key Vault](/azure/key-vault/general/quick-create-portal).
1. Grant the Microsoft 365 service principal access to read the secret by configuring an [access policy](/azure/key-vault/general/assign-access-policy) or [Azure RBAC role](/azure/key-vault/general/rbac-guide) on your vault.
1. Set the `referenceId` in your manifest to the identifier for that secret configuration.

> [!IMPORTANT]
> Human review needed: No published procedure documents where a developer registers the Azure Key Vault secret reference used by `agentConnectors` (escalation E5). Confirm the registration surface and the exact value that `referenceId` must contain before publishing.

### Use no authentication

If your server doesn't require authentication (not recommended for production), set the authorization type to `None` or omit the `authorization` object entirely.

For enterprise scenarios, prefer OAuth over API keys to align with security best practices and administrator expectations.

## Define tool discovery

Configure how Microsoft 365 agents discover the tools your MCP server provides. Use static inline tool definitions when your toolset is stable, or enable dynamic tool discovery when your toolset changes frequently.

### Use static tool definitions

For static toolsets that don't change frequently, add an `mcpToolDescription` object that points to a tool description file in your app package:

````json
"remoteMcpServer": {
  "mcpServerUrl": "https://mcp.example.com",
  "authorization": {
    "type": "ApiKeyPluginVault",
    "referenceId": "my-apikey"
  },
  "mcpToolDescription": {
    "file": "toolDescription.json"
  }
}
````

In the app manifest, `file` is the only property that `mcpToolDescription` accepts, and its value is a path relative to the root of your app package. Don't add an inline `tools` array or a nested `description` object; that shape belongs to the plugin manifest, not the app manifest, and it fails validation here.

The referenced file is a standalone JSON document whose contents match the schema that your MCP server's `tools/list` response returns. The following example shows a `toolDescription.json` file:

````json
{
  "tools": [
    {
      "name": "ContentQueryTool_QueryItems",
      "description": "Retrieves information about items (such as tasks, issues, or other tracked entities) that can be answered by their fields or metadata.",
      "inputSchema": {
        "type": "object",
        "properties": {
          "property1": {
            "type": "string",
            "description": "Description of property1"
          },
          "property2": {
            "type": "string",
            "description": "Description of property2"
          }
        },
        "required": [
          "property1"
        ]
      },
      "annotations": {
        "title": "Query Items",
        "readOnlyHint": true
      }
    }
  ]
}
````

### Use dynamic tool discovery

Dynamic tool discovery allows Microsoft 365 agents to fetch your tool list at runtime by calling your server's `tools/list` method. This approach is recommended when your toolset changes frequently, as it eliminates the need to republish your app each time tools are added, updated, or removed.

To enable dynamic tool discovery, omit the [mcpToolDescription](/microsoft-365/extensibility/schema/root-agent-connectors-tool-source-remote-mcp-server-mcp-tool-description) from your [remoteMcpServer](/microsoft-365/extensibility/schema/root-agent-connectors-tool-source-remote-mcp-server) configuration:

````json
"remoteMcpServer": {
  "mcpServerUrl": "https://mcp.example.com",
  "authorization": {
    "type": "OAuthPluginVault",
    "referenceId": "my-oauth-config"
  }
}
````

> [!IMPORTANT]
> You can omit `mcpToolDescription` only when both conditions are true:
>
> - Your app manifest uses schema version 1.29 or later. In versions 1.27 and 1.28, `mcpToolDescription` is required, so omitting it fails validation.
> - The host you target permits dynamic tool discovery. Some hosts require a tool description even when the schema allows you to omit one. For example, Microsoft 365 Copilot Cowork uses manifest version 1.28 and rejects a package whose connector has no `mcpToolDescription`, returning an HTTP 400 error. Confirm the requirements of the hosts you target. For Cowork, see [Build plugins for Copilot Cowork](/microsoft-365/copilot/cowork/cowork-plugin-development).

Dynamic tool discovery for the declarative agent plugin path is a different construct that uses the plugin manifest, not the app-manifest `agentConnectors` node. For that path, see [Dynamic tool discovery for plugins](/microsoft-365-copilot/extensibility/plugin-dynamic-tool-discovery).

When `mcpToolDescription` is omitted, Microsoft 365 agents:

- Connect to your MCP server endpoint.
- Call the `tools/list` method to retrieve the available tools at runtime.
- Update the available tool list without requiring a manifest republish.

Your MCP server must return a valid `tools/list` response that includes each tool's name, description, and input schema.

<!--## Example schema

The following is an example of a complete agent connector configuration, using *OAuthPluginVault* authentication and a static tool description file:

```json
{
  "$schema": "https://developer.microsoft.com/json-schemas/teams/v1.29/MicrosoftTeams.schema.json",
  "manifestVersion": "1.29",
  ...
  "agentConnectors": [
  {
      "id": "my-connector-static",
      "displayName": "My Connector with Static Tools",
      "description": "A connector that uses OAuth authentication and an MCP server with a static tool description file.",
      "toolSource": {
          "remoteMcpServer": {
              "mcpServerUrl": "https://example.com/api/mcp",
              "mcpToolDescription": {
                  "file": "toolDescription.json"
              },
              "authorization": {
                  "type": "OAuthPluginVault",
                  "referenceId": "NzJmOTg4Ym..."
              }
          }
      }
  }]
}
```

The `toolDescription.json` file in the app package contains the tool definitions, as shown in [Use static tool definitions](#use-static-tool-definitions). This configuration is sufficient for Microsoft 365 agents, including the Channel Agent in Teams, to establish a connection and discover tools from your MCP server.
-->

## Validate your configuration

Before deploying your plugin, validate both its App Manifest and its live MCP integration.

### Validate the plugin and App Manifest

If you use WIQD, run `wiqd plugin validate` for fast offline static validation. Run `wiqd plugin validate --mode deep` to build the package and delegate semantic validation to Microsoft 365 Agents Toolkit.

For the manual path, use the [Microsoft 365 app package validation](https://dev.teams.microsoft.com/tools/store-validation) tool in Developer Portal to check your manifest for errors.

Static validation checks the manifests in the plugin project against the shipping schema. Deep validation builds the package and applies [Microsoft 365 Agents Toolkit validation rules](../toolkit/TeamsFx-preview-and-customize-app-manifest.md#validate-app-package-using-validation-rules). Neither mode validates the live MCP server, credentials, protocol behavior, or tool execution.

### Validate the MCP server at runtime

Complete these checks regardless of which authoring method you use:

1. Verify if your MCP server responds correctly to handshake messages by testing the connection manually.

1. Confirm that your `tools/list` endpoint returns schema-compliant tool definitions:

   - Each tool has a unique name and description
   - Input schemas are valid JSON Schema
   - Required and optional parameters are clearly defined

1. Test your authorization configuration:

   - Verify the `referenceId` points to a valid secret
   - Confirm tokens or keys are correctly retrieved
   - Test token refresh if using OAuth

1. Ensure your endpoint supports TLS 1.2 or higher.

1. Verify error messages and retry semantics for failed tool calls.

## Test with Microsoft 365 agents

Validate your integration by testing with actual Microsoft 365 agents.

1. Provision or deploy your plugin to a test environment. If you use WIQD, sign in with `wiqd auth login` if needed, and then run:

   ```console
   wiqd plugin provision
   ```

   Provisioning doesn't replace the runtime checks in the preceding section.

2. Open a <!--[Channel Agent](/microsoftteams/set-up-channel-agent-teams) in Microsoft Teams or another -->Microsoft 365 agent that supports MCP.

3. Test natural language commands that should trigger your tools:
   - "Create a task in my project management system"
   - "Update the status of ticket number 123"
   - "Search for open issues assigned to me"

4. Verify that:
   - Tools appear in the agent's available actions
   - User consent prompts display when required
   - Tool calls execute successfully
   - Responses are processed correctly
   - Error conditions are handled gracefully

5. Test across multiple tenants if your scenario requires multi-tenant support.

## Deploy and manage the connector

An agent connector isn't deployed on its own. It ships inside the app package that contains it, and it's governed with that app.

- **Where it's installed**: Upload the app package to your test tenant, or publish it to your organization's app catalog or the Microsoft commercial marketplace. The connector becomes available when the containing app is installed.
- **Where admins manage it**: Admins manage the containing app or agent alongside their other agents and apps in the [Microsoft 365 admin center](/microsoft-365/admin/manage/manage-copilot-agents-integrated-apps) and in the Teams admin center under **Teams apps** > **Manage apps**. Availability changes made in either admin center are [synchronized between them](/microsoftteams/uam-tac-mac).
- **Which settings apply**: Tenant-wide [agent settings](/microsoft-365/admin/manage/agent-settings), such as allowed agent types and which users can access agents, apply to the app that contains your connector. Test with an account that's in scope for those settings.
- **Where it doesn't appear**: Agent connectors don't appear under **Copilot** > **Connectors** in the Microsoft 365 admin center. That experience manages [synced and federated Copilot connectors](/microsoft-365/copilot/connectors/overview), which use a separate submission and approval process.

## Tools that modify data

If a tool on your MCP server modifies data or performs another consequential action, such as creating, updating, or deleting a record, annotate it so that agents and hosts can treat it appropriately. For an MCP server tool, set the `readOnlyHint` annotation to `false` for a tool that changes state. (The equivalent flag for an API plugin action is `isConsequential`, set to `true`.)

For the annotations that Microsoft 365 expects and the requirements that store validation applies to consequential actions, see [User disclosure and confirmation for action scenarios](../concepts/deploy-and-publish/appsource/prepare/review-copilot-validation-guidelines.md#user-disclosure-and-confirmation-for-action-scenarios). For guidance on building write-capable tools on the declarative agent plugin path, see [Confirmation prompts for plugins](/microsoft-365-copilot/extensibility/api-plugin-confirmation-prompts).

## Troubleshoot common issues

If your MCP server isn't working as expected, check these common issues:

### Provisioning asks for Azure resources

Registering a remote MCP server as an agent connector doesn't require an Azure subscription. If your tooling prompts you to select an Azure subscription or resource group, your project was created from a template that includes an Azure-hosted component, such as the [Microsoft 365 Copilot connector template](/microsoft-365/copilot/extensibility/build-your-first-connector), which deploys an ingestion service to Azure Functions. Create your project from a template that doesn't include Azure-hosted components, and then add the `agentConnectors` array to its manifest.

### Validation reports a missing required property

- Confirm that each connector object includes both `id` and `displayName`.
- Confirm that `toolSource.remoteMcpServer` includes `mcpServerUrl`.
- If the error names `mcpToolDescription`, either add a tool description file or move your manifest to version 1.29 or later, where the property is optional. For more information, see [Choose a manifest version](#choose-a-manifest-version).
- If the error names `referenceId`, add it. Every authorization type except `None` requires it.
- If the error names `authorization.type`, confirm that the value is valid for your manifest version. `AzureKeyVault` requires version 1.29 or later.
- If the error reports an unexpected or additional property, remove it. The connector object and the manifest root both reject unknown properties.

### Agent can't connect to your server

- Verify your endpoint is publicly accessible
- Confirm your `mcpServerUrl` value begins with `https://`
- Check firewall and network security settings
- Ensure your server responds to MCP handshake messages

### Tools don't appear in agents

- Verify `tools/list` returns valid tool definitions
- Check that tool descriptions are clear and complete
- For static definitions, confirm `mcpToolDescription` contains only a `file` property, that the path is relative to the root of the app package, and that the file is included in the package
- For dynamic discovery, confirm `mcpToolDescription` is omitted, that your manifest is version 1.29 or later, and that your server correctly responds to `tools/list` at runtime

### Authentication failures

- Verify the `referenceId` matches your stored secret configuration
- Test that OAuth tokens are valid and not expired
- Confirm API keys have the necessary permissions
- Check authorization header format in outbound requests

### Tool calls fail or time out

- Review your server logs for errors
- Verify input parameter validation is working correctly
- Check that responses follow MCP protocol format
- Ensure your server handles concurrent requests

## Next steps

When the plugin is ready, ask the WIQD orchestrator to share it with users in your tenant. For automation or reference, use:

```console
wiqd plugin share --scope users --email <email-address>
```

If you authored the manifest directly, publish the containing app so that users can install it. To make the connector available to your organization only, publish it to your organization's app catalog.

Partner certification and public marketplace publishing are a separate process. When ready, submit your app for [partner certification and publishing](../concepts/deploy-and-publish/appsource/publish.md).
