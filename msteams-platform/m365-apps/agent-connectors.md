---
title: Register MCP Servers as Agent Connectors for Microsoft 365
description: Register your MCP server in the Microsoft 365 app manifest to enable access to your tools from agents like the Channel Agent in Teams.
#customer intent: As a developer, I want to register my MCP server as an agent connector so that Microsoft 365 agents can access my external tools and services.
author: erikadoyle
ms.author: edoyle
ms.date: 12/15/2025
ms.topic: how-to
ms.subservice: m365apps
---

# Register MCP servers as agent connectors for Microsoft 365 (preview)

Agents in Microsoft 365, such as [Channel Agent](/microsoftteams/set-up-channel-agent-teams) in Microsoft Teams, can connect to external systems through *agent connectors* declared in the app manifest. This article shows you how to register your remote Model Context Protocol (MCP) server in the Microsoft 365 app manifest, enabling Microsoft 365 agents to securely discover, select, and invoke MCP tools that your server exposes.

> [!NOTE]
>
> Agent Connectors are available in [public developer preview](../resources/dev-preview/developer-preview-intro.md).

Microsoft 365 agents use agent connectors to communicate with external systems. For MCP servers, the connector provides:

- The network endpoint of your MCP server
- Authentication and authorization configuration
- Tool definitions (inline or dynamically discovered)
- Optional metadata that helps agents orchestrate the right tool during user interactions

Once registered, your MCP server becomes available to any Microsoft 365 agent capable of using MCP, including the Channel Agent in Microsoft Teams.

## Prerequisites

Before you begin, ensure you have:

- A test tenant [enabled with Teams public preview](/microsoftteams/public-preview-doc-updates) features (for testing your MCP integration with Teams Channel Agent)
- A working MCP server with a secure public endpoint
- Authentication credentials (OAuth configuration or API key)

## Add the agent connector to your manifest

First, declare your MCP server in the [agentConnectors](/microsoft-365/extensibility/schema/root-agent-connectors?view=m365-app-prev&preserve-view=true) array at the root level of your app manifest.

1. Open your Microsoft 365 app manifest (`manifest.json`) file.

2. Locate or create the root-level `agentConnectors` array.

3. Add a new connector object with a unique `id`, display name, and description:

````json
{
  "$schema": "https://developer.microsoft.com/json-schemas/teams/vDevPreview/MicrosoftTeams.schema.json",
  "manifestVersion": "devPreview",
  ...
    "agentConnectors": [
      {
        "id": "my-mcp-server",
        "displayName": "My Automation Server",
        "description": "Provides workflow automation and task management tools.",
        "toolSource": {
          "remoteMcpServer": {
            "endpoint": "https://mcp.mycompany.com"
          }
        }
      }
    ]
  }
}
````

Each connector must have a unique `id` that distinguishes it from other connectors in your manifest. The `toolSource` object must include exactly one of `remoteMcpServer`, `localMcpServer`, or `plugin`.

For MCP servers, use **remoteMcpServer** unless your server runs locally within the Teams client environment (advanced scenarios).

## Configure the remote MCP server endpoint

Define how Microsoft 365 connects to your MCP server using the `remoteMcpServer` object.

1. Within your connector's [toolSource](/microsoft-365/extensibility/schema/root-agent-connectors-tool-source?view=m365-app-prev&preserve-view=true), specify the `remoteMcpServer` endpoint:

````json
"toolSource": {
  "remoteMcpServer": {
    "endpoint": "https://mcp.mycompany.com"
  }
}
````

2. Ensure your endpoint uses HTTPS (for HTTP connections) or WSS (for WebSocket connections).

The endpoint must be publicly accessible and respond to MCP protocol handshake messages. Microsoft 365 agents establish long-lived connections to this endpoint.

## Configure authentication

Specify how Microsoft 365 retrieves credentials when calling your MCP server. MCP servers support several authorization methods:

- **None**: No authentication required
- **OAuthPluginVault**: OAuth 2.0 tokens stored inside Microsoft’s secure vault
- **ApiKeyPluginVault**: API key stored in a vault and referenced by ID
- **DynamicClientRegistration**: Dynamic OAuth client creation

### Use OAuth authentication

For OAuth 2.0 tokens stored in Microsoft's secure vault, specify authorization type `OAuthPluginVault` in your configuration:

````json
"remoteMcpServer": {
  "endpoint": "https://mcp.mycompany.com",
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

### Use no authentication

If your server doesn't require authentication (not recommended for production), set the authorization type to `None` or omit the `authorization` object entirely.

For enterprise scenarios, prefer OAuth over API keys to align with security best practices and administrator expectations.

## Define tool discovery

Choose how Microsoft 365 agents discover the tools your MCP server provides. You can use inline definitions if your toolset is static, or dynamic discovery if your toolset changes frequently.

### Enable dynamic tool discovery

Dynamic discovery allows Microsoft 365 to fetch your tool list at runtime, which is recommended for servers whose tools change frequently.

The following example shows how to add the dynamic discovery flag to your `remoteMcpServer` configuration:

````json
"remoteMcpServer": {
  "endpoint": "https://mcp.mycompany.com",
  "authorization": {
    "type": "ApiKeyPluginVault",
    "referenceId": "my-apikey"
  },
  "modelContextProtocol.enable_dynamic_discovery": true
}
````

When enabled, agents call your server's `tools/list` method to retrieve available tools. This approach eliminates the need to republish your app when tools change.

### Use inline tool definitions

For static toolsets that don't change frequently, add an `mcpToolDescription` object with your tool definitions:

````json
"remoteMcpServer": {
  "endpoint": "https://mcp.mycompany.com",
  "authorization": {
    "type": "ApiKeyPluginVault",
    "referenceId": "my-apikey"
  },
  "mcpToolDescription": {
    "description": {
      // Tool definitions following MCP protocol schema
    }
  }
}
````

The `description` object must match the schema returned by your MCP server's `tools/list` response.

## Example schema

The following is an example of a complete agent connector configuration:

```json
{
  "$schema": "https://developer.microsoft.com/json-schemas/teams/vDevPreview/MicrosoftTeams.schema.json",
  "manifestVersion": "devPreview",
  ...
  "agentConnectors": [
    {
      "id": "my-mcp-server",
      "displayName": "My Automation Server",
      "description": "Provides workflow automation and task management tools.",
      "toolSource": {
        "remoteMcpServer": {
          "endpoint": "https://mcp.mycompany.com",
          "authorization": {
            "type": "ApiKeyPluginVault",
            "referenceId": "my-apikey"
          },
          "modelContextProtocol.enable_dynamic_discovery": true
        }
      }
    }
  ]
}
```

This configuration is sufficient for Microsoft 365 agents, including the Channel Agent in Teams, to establish a connection and discover tools from your MCP server.

## Validate your configuration

Before deploying your app, verify that your manifest and MCP server are correctly configured.

1. Use the [Microsoft 365 app package validation](https://dev.teams.microsoft.com/tools/store-validation) tool in Developer Portal to check your manifest for errors.

2. Verify your MCP server responds correctly to handshake messages by testing the connection manually.

3. Confirm that your `tools/list` endpoint returns schema-compliant tool definitions:

   - Each tool has a unique name and description
   - Input schemas are valid JSON Schema
   - Required and optional parameters are clearly defined

4. Test your authorization configuration:

   - Verify the `referenceId` points to a valid secret
   - Confirm tokens or keys are correctly retrieved
   - Test token refresh if using OAuth

5. Ensure your endpoint supports TLS 1.2 or higher.

6. Verify error messages and retry semantics for failed tool calls.

## Test with Microsoft 365 agents

Validate your integration by testing with actual Microsoft 365 agents.

1. Deploy your app to a test environment.

2. Open a [Channel Agent](/microsoftteams/set-up-channel-agent-teams) in Microsoft Teams or another Microsoft 365 agent that supports MCP.

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

## Troubleshoot common issues

If your MCP server isn't working as expected, check these common issues:

### Agent can't connect to your server

- Verify your endpoint is publicly accessible
- Confirm your endpoint uses HTTPS or WSS
- Check firewall and network security settings
- Ensure your server responds to MCP handshake messages

### Tools don't appear in agents

- Verify `tools/list` returns valid tool definitions
- Check that tool descriptions are clear and complete
- Confirm `modelContextProtocol.enable_dynamic_discovery` is set correctly
- Validate the JSON schema of inline tool definitions

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

When ready, submit your app for [partner certification and publishing](../concepts/deploy-and-publish/appsource/publish.md).
