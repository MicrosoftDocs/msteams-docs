---
title: Serve MCP-generated HTML widgets
description: Learn how to share HTML widgets with Teams
ms.localizationpriority: high
author: nickwalkmsft
ms.topic: reference
ms.date: 11/03/2026
---

# Serve MCP-generated HTML widgets

An MCP-generated HTML widget is an interactive interface that an MCP server provides alongside a tool result. Your Teams agent reads the widget's HTML, sends it in an extended Markdown message, and forwards user-initiated tool calls to the originating MCP server. Users can interact with the tool's results directly in the conversation.

Use this walkthrough when an MCP server supplies the widget rather than your agent owning the HTML. To build your own widget, including its handshake, sizing, and bot-side tool handler, see [Send an HTML widget from an agent](send-html-widgets.md).

## Prerequisites

- A working TypeScript Teams SDK bot available on a public HTTPS endpoint.
- An MCP client connected to a server that provides MCP App tools and widget resources, using Client from @modelcontextprotocol/sdk.
- The [widget Markdown helper](send-html-widgets.md#put-the-widget-in-a-fenced-code-block) and [tool-call route](send-html-widgets.md#step-6-handle-tool-calls-in-the-bot) from the agent-owned widget walkthrough. The combined route below reuses handleWidgetTool for calls that aren't from MCP widgets.

## Widgets from MCP servers

Some MCP servers return a widget along with a tool's result: these tools are MCP App tools. Your bot can show those widgets in Teams the same way as its own widgets. It sends each widget in an extended markdown message, and forwards the widget's tool calls to the MCP server that provided it.

This section assumes that your bot already calls tools on MCP servers with a `Client` from the MCP TypeScript SDK (`@modelcontextprotocol/sdk`). It uses the correlation ID from [Optional: identify which widget is calling](send-html-widgets.md#optional-identify-which-widget-is-calling) to route each widget's tool calls to the right MCP server.

### Declare widget support

MCP servers only return widgets to clients that support them. Declare that support when you create the MCP client:

```ts
import { Client } from "@modelcontextprotocol/sdk/client/index.js";

const client = new Client(
  { name: "My bot", version: "1.0.0" },
  {
    capabilities: {
      // Tells MCP servers that this client can display MCP App widgets.
      extensions: {
        "io.modelcontextprotocol/ui": {
          mimeTypes: ["text/html;profile=mcp-app"],
        },
      },
    },
  },
);
```

### Call the tool and create the widget

An MCP App tool declares its widget with a `ui://` URI in the tool's `_meta.ui.resourceUri` field. The widget's HTML is a resource on the MCP server, which the bot reads with `readResource`. The server can also declare the widget's domain, security policy, and permissions.

A widget produced by an MCP tool must include the `mcpUrl` field in its payload: the URL of the MCP server whose tool produced it.

> [!IMPORTANT]
> Always set `mcpUrl` on widgets produced by MCP tools. Teams uses it to run the widget on a dedicated domain, scoped to your bot's ID and to that MCP server's URL. This keeps widgets from different MCP servers isolated from each other and from your bot's own widgets. Without `mcpUrl`, an MCP widget runs on the domain scoped to your bot's ID only, and can call any service that accepts calls from that domain. See [Where widgets run](send-html-widgets.md#where-widgets-run).

Create `src/bot/mcp-widgets.ts`. Its imports cover the code in this section and in [Forward the widget's tool calls](#forward-the-widgets-tool-calls):

```ts
import { randomUUID } from "node:crypto";
import type { Client } from "@modelcontextprotocol/sdk/client/index.js";
import {
  CallToolResultSchema,
  type CallToolResult,
  type Tool,
} from "@modelcontextprotocol/sdk/types.js";
import type {
  IHtmlWidgetCallToolInvokeActivity,
  IHtmlWidgetCallToolResponse,
  IHtmlWidgetPayload,
  IHtmlWidgetPermissions,
  IHtmlWidgetSecurityPolicy,
} from "@microsoft/teams.api";
import { correlationIdOf } from "./correlation";

// The MIME type of MCP App widgets.
const MCP_APP_MIME_TYPE = "text/html;profile=mcp-app";

// A widget payload from an MCP tool. The correlationId and mcpUrl fields are
// not part of the published IHtmlWidgetPayload type yet.
export type McpWidgetPayload = IHtmlWidgetPayload & {
  correlationId: string;
  mcpUrl: string;
};

// Settings that an MCP server can declare for a widget, in the _meta.ui field
// of the widget's resource.
interface McpWidgetSettings {
  domain?: string;
  csp?: IHtmlWidgetSecurityPolicy;
  permissions?: IHtmlWidgetPermissions;
}

// Where tool calls from an MCP widget go.
interface McpWidgetRoute {
  // The client connected to the MCP server that provided the widget.
  client: Client;
  // The conversation that the widget was sent to.
  conversationId: string;
}

// The routes of the MCP widgets that this bot sent, by correlationId. In
// production, keep them in persistent storage: widgets in older messages can
// still call tools after your bot restarts.
const routes = new Map<string, McpWidgetRoute>();

// Returns the _meta.ui object of an MCP tool or resource, or undefined.
function uiMetadata(
  meta: Record<string, unknown> | undefined,
): object | undefined {
  const ui = meta?.ui;

  return typeof ui === "object" && ui !== null ? ui : undefined;
}

// Returns the ui:// URI of a tool's widget, or undefined if the tool has none.
function widgetUri(tool: Tool): string | undefined {
  const ui = uiMetadata(tool._meta);

  return ui && "resourceUri" in ui && typeof ui.resourceUri === "string"
    ? ui.resourceUri
    : undefined;
}

// Calls an MCP tool and, if the tool has a widget, creates the widget's
// payload.
//   client:         client connected to the MCP server that provides the tool.
//   serverUrl:      URL of that MCP server, the one the client connected to.
//                   Sent as the widget's mcpUrl. Its origin is the widget's
//                   domain if the server doesn't declare one.
//   conversationId: the conversation the widget will be sent to.
//   tool:           the tool, as returned by client.listTools().
//   args:           the tool's arguments.
// Returns the tool's result, and the widget's payload if the tool has a widget.
export async function callMcpTool(
  client: Client,
  serverUrl: string,
  conversationId: string,
  tool: Tool,
  args: Record<string, unknown>,
): Promise<{ result: CallToolResult; widget?: McpWidgetPayload }> {
  const result = CallToolResultSchema.parse(
    await client.callTool({ name: tool.name, arguments: args }),
  );
  const uri = widgetUri(tool);

  // No widget for tools without one, or when the tool failed.
  if (!uri || result.isError) {
    return { result };
  }

  // Read the widget's HTML and settings from the MCP server.
  const resource = await client.readResource({ uri });
  const content = resource.contents.find((item) => item.uri === uri);

  if (!content || content.mimeType !== MCP_APP_MIME_TYPE) {
    throw new Error("The MCP server did not return the tool's widget.");
  }

  // The HTML is either text, or base64-encoded binary data.
  const html =
    "text" in content
      ? content.text
      : Buffer.from(content.blob, "base64").toString("utf8");
  const settings: McpWidgetSettings = uiMetadata(content._meta) ?? {};

  // Remember where this widget's tool calls must go.
  const correlationId = randomUUID();

  routes.set(correlationId, { client, conversationId });

  return {
    result,
    widget: {
      type: "widget/mcp-ui",
      name: tool.title ?? tool.name,
      description: tool.description,
      domain: settings.domain ?? new URL(serverUrl).origin,
      html,
      securityPolicy: settings.csp,
      permissions: settings.permissions,
      // The tool's arguments and result. Teams passes them to the widget,
      // which typically renders the result.
      toolInput: args,
      toolOutput: result,
      // Teams passes this back with every tool call from the widget.
      correlationId,
      // The URL of the MCP server whose tool produced the widget. Teams runs
      // the widget on a dedicated domain scoped to the bot's ID and this URL.
      mcpUrl: serverUrl,
    },
  };
}
```

### Send the widget

Call the MCP tool with `callMcpTool` instead of `client.callTool`. If the tool returned a widget, send it:

```ts
import { callMcpTool } from "./mcp-widgets";
import { widgetMarkdown } from "./widget-markdown";

// `client` is your MCP client, `tool` comes from client.listTools(), and
// `args` are the tool's arguments, for example chosen by your model.
const { result, widget } = await callMcpTool(
  client,
  "https://mcp.example.com/mcp",
  activity.conversation.id,
  tool,
  args,
);

if (widget) {
  await send({
    type: "message",
    textFormat: "extendedmarkdown",
    text: widgetMarkdown(widget),
  });
}

// Use `result` as you would for any MCP tool, for example by passing it back
// to your model.
```

AAn MCP widget's HTML already performs the handshake and reports its height. Send it unchanged. To add markdown around an MCP widget, put `widgetMarkdown(widget)` in a `text` array, as shown in [Mix markdown and widgets](send-html-widgets.md#mix-markdown-and-widgets).

Test the supplied widget on Teams mobile against the [responsive scaling guidance](ux-guidelines.md#responsive-scaling). If layout or interaction changes are needed, work with the MCP server owner.

### Forward the widget's tool calls

When an MCP widget calls a tool, the bot forwards the call to the MCP server that provided the widget, and returns the server's result to the widget.

Add the following code to `src/bot/mcp-widgets.ts`:

```ts
// Returns true if widgets may call this tool. MCP servers can restrict a tool
// to the model by setting its _meta.ui.visibility field to ["model"].
function isAvailableToWidgets(tool: Tool): boolean {
  const ui = uiMetadata(tool._meta);
  const visibility =
    ui && "visibility" in ui && Array.isArray(ui.visibility)
      ? ui.visibility
      : ["model", "app"];

  return visibility.includes("app");
}

// Builds a tool call response that reports an error to the widget.
function errorResult(text: string): IHtmlWidgetCallToolResponse {
  return {
    responseType: "htmlwidget/calltoolresult",
    callToolResult: {
      content: [{ type: "text", text }],
      structuredContent: {},
      isError: true,
    },
  };
}

// Forwards a tool call from an MCP widget to the MCP server that provided the
// widget, and returns the server's result to the widget.
// Returns undefined if the call does not come from an MCP widget.
export async function handleMcpWidgetTool(
  activity: IHtmlWidgetCallToolInvokeActivity,
): Promise<IHtmlWidgetCallToolResponse | undefined> {
  const correlationId = correlationIdOf(activity);

  // Only MCP widgets have a correlationId in this bot.
  if (!correlationId) {
    return undefined;
  }

  const route = routes.get(correlationId);

  // The widget must have been sent by this bot, to this conversation.
  if (!route || route.conversationId !== activity.conversation.id) {
    return errorResult("This widget is no longer available.");
  }

  // The tool must exist, and widgets must be allowed to call it. (If the
  // server has many tools, follow nextCursor to list all of them.)
  const { tools } = await route.client.listTools();
  const tool = tools.find((entry) => entry.name === activity.value.name);

  if (!tool || !isAvailableToWidgets(tool)) {
    return errorResult("Unknown tool: " + activity.value.name);
  }

  // Remove Teams' reserved __msteams__ property before forwarding the
  // arguments to the MCP server.
  const { __msteams__, ...args } = activity.value.arguments as Record<
    string,
    unknown
  >;
  const result = CallToolResultSchema.parse(
    await route.client.callTool({ name: tool.name, arguments: args }),
  );

  return {
    responseType: "htmlwidget/calltoolresult",
    callToolResult: {
      // Teams does not support resource_link items, so they are removed.
      content: result.content.filter((item) => item.type !== "resource_link"),
      // Always set these fields: fields you omit can reach the widget as null.
      structuredContent: result.structuredContent ?? {},
      isError: result.isError ?? false,
    },
  };
}
```

Then update the `widget.callTool` route from [Step 6](send-html-widgets.md#step-6-handle-tool-calls-in-the-bot), so that it sends tool calls from MCP widgets to `handleMcpWidgetTool`:

```ts
import type { IHtmlWidgetCallToolResponse } from "@microsoft/teams.api";
import { handleWidgetTool } from "./dice-tool";
import { handleMcpWidgetTool } from "./mcp-widgets";

app.on(
  "widget.callTool",
  async ({ activity }): Promise<IHtmlWidgetCallToolResponse> => {
    try {
      // Tool calls from MCP widgets go to their MCP server. All other tool
      // calls are handled by the bot itself.
      return (
        (await handleMcpWidgetTool(activity)) ?? handleWidgetTool(activity)
      );
    } catch (error) {
      // Safety net for unexpected failures, including MCP server errors.
      console.error("Widget tool failed.", error);

      return {
        responseType: "htmlwidget/calltoolresult",
        callToolResult: {
          content: [{ type: "text", text: "Something went wrong." }],
          structuredContent: {},
          isError: true,
        },
      };
    }
  },
);
```

`handleMcpWidgetTool` follows the same rules as any tool handler in Step 6, and adds these:

- **Only forward calls from widgets you sent.** A call is forwarded only if its correlation ID is known and belongs to the same conversation.
- **Only forward tools that widgets may call.** A tool whose `_meta.ui.visibility` is `["model"]` is reserved for the model.
- **Remove `__msteams__` from the arguments.** It is meant for your bot, not for the MCP server.
- **Return the server's result.** Set `structuredContent` and `isError` even if the server omitted them, and remove `resource_link` content items, which Teams does not support.
