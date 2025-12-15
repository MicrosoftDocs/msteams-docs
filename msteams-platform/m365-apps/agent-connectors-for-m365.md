---
title: Register a MCP Server as an Agent Connector for Microsoft 365
description: Register your MCP server in the Microsoft 365 app manifest and empower agents like the Channel Agent in Teams to access your tools effortlessly.
#customer intent: As a developer, I want to register my MCP server as an agent connector so that Microsoft 365 agents can access my external tools and services.
author: erikadoyle
ms.author: edoyle
ms.date: 12/15/2025
ms.topic: how-to
ms.subservice: m365apps
---

# Register a MCP server as an agent connector for Microsoft 365 (preview)

Agents in Microsoft 365, such as [Channel Agent](/microsoftteams/set-up-channel-agent-teams) in Microsoft Teams, can connect to external systems through agent connectors declared in the app manifest. This article shows you how to register your Model Context Protocol (MCP) server in the Microsoft 365 app manifest, enabling Microsoft 365 agents to discover and invoke the tools your server exposes.

By completing this article, you'll have a fully configured MCP server registered in your app manifest that Microsoft 365 agents can use to access your external tools and services. Your MCP server becomes available to any Microsoft 365 agent capable of using MCP, including Channel Agent in Microsoft Teams.

Agent connectors provide the network endpoint, authentication configuration, and tool definitions that agents need to communicate with your MCP server. Once registered, agents can securely discover, select, and invoke your MCP tools during natural language interactions.

## Prerequisites

Before you begin, ensure you have:

- A test tenant [enabled with Teams pubic preview](/microsoftteams/public-preview-doc-updates) features (for testing your MCP integration with Teams Channel Agent)
- A working MCP server with a secure public endpoint
- Authentication credentials (OAuth configuration or API key)

## Add the agent connector to your manifest

The first step is to declare your MCP server in the `agentConnectors` array at the root level of your app manifest.

1. Open your Microsoft 365 app manifest (`manifest.json`) file.

2. Locate or create the root-level `agentConnectors` array.

3. Add a new connector object with a unique `id`, display name, and description:

````json
{
  "root": {
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

Each connector must have a unique `id` that distinguishes it from other connectors in your manifest. The `displayName` and `description` help administrators and agents understand what your connector provides.

## Configure the remote MCP server endpoint

Define how Microsoft 365 connects to your MCP server using the `remoteMcpServer` object.

1. Within your connector's `toolSource`, specify the `remoteMcpServer` endpoint:

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

Specify how Microsoft 365 retrieves credentials when calling your MCP server. MCP servers support several authorization methods.

### Use OAuth authentication

For OAuth 2.0 tokens stored in Microsoft's secure vault:

1. Add the `authorization` object to your `remoteMcpServer` configuration:

````json
"remoteMcpServer": {
  "endpoint": "https://mcp.mycompany.com",
  "authorization": {
    "type": "OAuthPluginVault",
    "referenceId": "my-oauth-config"
  }
}
````

The `referenceId` points to a secure OAuth configuration that administrators manage outside your manifest.

### Use API key authentication

For API keys stored in a vault:

1. Configure the authorization type as `ApiKeyPluginVault`:

````json
"authorization": {
  "type": "ApiKeyPluginVault",
  "referenceId": "my-apikey"
}
````

### Use no authentication

If your server doesn't require authentication (not recommended for production):

1. Set the authorization type to `None` or omit the `authorization` object entirely.

For enterprise scenarios, prefer OAuth over API keys to align with security best practices and administrator expectations.

## Define tool discovery

Choose how Microsoft 365 agents discover the tools your MCP server provides. You can use inline definitions or dynamic discovery.

### Enable dynamic tool discovery

Dynamic discovery allows Microsoft 365 to fetch your tool list at runtime, which is recommended for servers whose tools change frequently.

1. Add the dynamic discovery flag to your `remoteMcpServer` configuration:

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

For static toolsets that don't change frequently:

1. Add an `mcpToolDescription` object with your tool definitions:

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

## Create a complete configuration

Combine all elements into a working agent connector configuration.

1. Assemble your complete connector definition:

````json
{
  "root": {
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
}
````

2. Save your manifest file.

This configuration enables Microsoft 365 agents to establish a connection, retrieve credentials, and discover tools from your MCP server.

## Validate your configuration

Before deploying your app, verify that your manifest and MCP server are correctly configured.

1. Use the Microsoft 365 App Validator to check your manifest for errors.

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

2. Open the Channel Agent in Microsoft Teams or another Microsoft 365 agent that supports MCP.

3. Test natural language commands that should trigger your tools:
   - "Create a task in my project management system"
   - "Update the status of ticket #123"
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

**Agent can't connect to your server**

- Verify your endpoint is publicly accessible
- Confirm your endpoint uses HTTPS or WSS
- Check firewall and network security settings
- Ensure your server responds to MCP handshake messages

**Tools don't appear in agents**

- Verify `tools/list` returns valid tool definitions
- Check that tool descriptions are clear and complete
- Confirm `modelContextProtocol.enable_dynamic_discovery` is set correctly
- Validate the JSON schema of inline tool definitions

**Authentication failures**

- Verify the `referenceId` matches your stored secret configuration
- Test that OAuth tokens are valid and not expired
- Confirm API keys have the necessary permissions
- Check authorization header format in outbound requests

**Tool calls fail or time out**

- Review your server logs for errors
- Verify input parameter validation is working correctly
- Check that responses follow MCP protocol format
- Ensure your server handles concurrent requests

## Next steps

After successfully registering your MCP server:

- Test your integration thoroughly across different Microsoft 365 agents
- Monitor your server's performance and reliability metrics
- Gather user feedback on tool descriptions and usability
- Submit your app for partner certification and publishing
- Review the MCP protocol specification for advanced features
- Consider implementing additional tools based on user needs
