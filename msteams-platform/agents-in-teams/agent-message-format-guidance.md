# Teams agent message format guidance

Teams agents can respond using four message formats. Choosing the right format optimizes user experience by preventing cognitive overload, missed actions, or broken experiences. This guide helps you pick the right format based on what you're communicating and what the user needs to do.

| # | Format | Best for | Complexity of implementation |
|---|---|---|---|
| 1 | Plain text | Conversational replies, quick confirmations, single-sentence facts | Low |
| 2 | Markdown | Structured information, lists, code — no action required | Low – Medium |
| 3 | Adaptive Card | Structured, visually rich content with optional actionability | Medium – High |
| 4 | Widget / MCP-UI | Fully custom, stateful experiences with bespoke UI | High |

## Key principles

1. **Default to the simplest format that meets the need.** Plain Text → Markdown → Adaptive Card → Widget. 
2. **Cards are for attraction, clarity and actions.** Include both informational and interactive elements in Adaptive Cards. Use cards when you need clarity, consistency or polished presentation aligned with Teams' design system. 
3. **Widgets are an escalation path, not a default.** Validate on Adaptive Cards first; escalate only when cards hit a hard ceiling (live refresh, complex state, custom layouts etc.).
4. **Match the surface.** Adaptive Cards are the most reliable cross-device choice for interactive content. Widget support varies on mobile and classic Teams.
5. **Avoid format mixing in a single turn.** A markdown block followed by a card in the same message creates visual noise. It is better to pick one format.



## Format profiles overview


:::image type="content" source="../assets/images/agents-in-teams/agent-message-format/agent-message-format-artifacts.png" alt-text="Image shows a spectrum of Generative UI: Plain Text, Markdown, Adaptive Cards and HTML Widget." border="false":::


## Plain text

Use when the response is conversational, brief, or a single-sentence fact. Plain text feels like chatting, loads instantly, and requires zero rendering overhead.

**Use for:**
- "What time is the team sync?" → "Your team sync is at 2 PM Pacific today."
- Confirming an action: "Done — I've sent the invite to Alex."
- Error nudges: "I couldn't find that file. Can you share the link?"
- Status pings: "The deployment finished 3 minutes ago."
- Quick clarifications in a back-and-forth dialog

**Avoid when:** Content has lists, tables, code, or anything the user needs to scan rather than read linearly.

**Example:**


:::image type="content" source="../assets/images/agents-in-teams/agent-message-format/agent-message-format-plain-text.png" alt-text="Image shows a sample of Plain Text message format." border="false":::



## Markdown

Use when you need lightweight structure — headers, bullets, bold, inline code — but no interactivity. Markdown renders natively in Teams chat and channel posts.

**Use for:**
- Meeting recap with bullet-point action items
- Code snippet with syntax highlighting (inline code or fenced blocks)
- Numbered troubleshooting steps or release notes
- Comparison list: "Here are 3 options for the API approach…"
- Research summaries with sections and sub-bullets

**Avoid when:** Content has more than ~3 data columns, or when the user must take an action (click, approve, fill a field).

**Example:**


:::image type="content" source="../assets/images/agents-in-teams/agent-message-format/agent-message-format-markdown.png" alt-text="Image shows a sample of markdown message format." border="false":::



## Adaptive Card

Use when you need a structured, visually rich layout with actionability. Cards may include both informational and interactive elements. Adaptive Cards support components such as badges, progress indicators, tables, charts, and forms, and automatically adapt to Teams’ design language, accessibility modes, and themes (light, dark, high contrast).

**Use for:**
- Approval workflow: "Please approve this PR" with [Approve] / [Reject] buttons
- Incident alert with severity badge, owner field, and [Acknowledge] CTA
- Expense report form with dropdowns and text fields
- Interview scheduling: candidate name, time slots, [Confirm Slot] actions
- Recurring status dashboard with progress rings or charts

**Avoid when:** Content is concise and purely informational (use Markdown); the experience requires live refresh or complex state management (use Widget).

**Example:**


:::image type="content" source="../assets/images/agents-in-teams/agent-message-format/agent-message-format-adaptive-card.png" alt-text="Image shows a sample of adaptive card message format." border="false":::


**Design samples:**


:::image type="content" source="../assets/images/agents-in-teams/agent-message-format/agent-message-format-adaptive-card-design-samples.png" alt-text="Image shows multiple design samples of adaptive card." border="false":::



## Widget / MCP-UI

Use for rich, stateful, interactive experiences beyond what a card can offer — embedded charts, live data, multi-step flows, or custom UI. Widgets render as a pane, not inline in chat. Widgets render as an iframe inline in chat.

> [!NOTE]
> Unlike Adaptive Cards, HTML widgets use a single fluid layout that scales continuously across widths. If your content requires significantly different layouts at different sizes, consider Adaptive Cards instead.

**Use for:**
- Interactive data explorer: filter a table, drill into a row, export CSV
- Multi-step onboarding wizard collecting info across 4–5 screens
- Canvas-style Kanban board with drag-and-drop
- Live analytics dashboard refreshing every 30 seconds
- Code diff viewer with syntax highlighting and inline comments

**Avoid when:** The experience fits in a card (use Adaptive Cards instead), or the UI is too rich to belong in a Teams message at all — a full analytics suite, an interactive CAD viewer, or any app-scale UI should live on the web and be linked to, not embedded. Widgets could take longer to load, require extra infrastructure, and have limited support on classic Teams. Default to Adaptive Cards; escalate to Widget only when cards hit a hard ceiling.

**Example:**


:::image type="content" source="../assets/images/agents-in-teams/agent-message-format/agent-message-format-html-widget.png" alt-text="Image shows a sample of html widget message format." border="false":::


**Design samples:**


:::image type="content" source="../assets/images/agents-in-teams/agent-message-format/agent-message-format-html-widget-design-samples.png" alt-text="Image shows multiple design samples of html widgets." border="false":::

## Which message format should I use?

Use the decision tree to help choosing the best message format:


:::image type="content" source="../assets/images/agents-in-teams/agent-message-format/agent-message-format-decision-tree.png" alt-text="Image shows a decision tree for agent to choose the right message format." border="false":::



## Quick-Reference Cheat Sheet

| Scenario in agent's message | Recommended Format |
|---|---|
| Simple yes/no or single-sentence confirmation | Plain text |
| Step-by-step instructions or numbered list | Markdown |
| User must approve or reject something | Adaptive Card |
| Code snippet or technical reference | Markdown |
| Real-time service health or live status monitor | Widget / MCP-UI |
| Presenting options for the user to choose from | Adaptive Card |
| Action completed or action failed | Plain Text |
| Meeting recap or structured summary | Markdown |
| Form the user needs to fill out and submit | Adaptive Card |
| Live sales pipeline or updating data feed | Widget / MCP-UI |
| Search result the user can act on | Adaptive Card |
| Interactive map with zoom and filter controls | Widget / MCP-UI |
| Scheduled status report - no action needed | Markdown |
| Scheduled status report - user action required | Adaptive Card |
| On-demand status report with real-time data and custom UI | Widget / MCP-UI |
