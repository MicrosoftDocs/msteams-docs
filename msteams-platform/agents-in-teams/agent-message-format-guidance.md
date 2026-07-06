# Teams Agent Message Format Design Guidance

Teams agents can respond using four message formats. Choosing the right format optimizes user experience by preventing cognitive overload, missed actions, or broken experiences. This guide helps you pick the right format based on what you're communicating and what the user needs to do.

| Format | Best For | Complexity of Implementation |
|---|---|---|
| Plain Text | Conversational replies, quick confirmations, single-sentence facts | Low |
| Markdown | Structured information, lists, code — no action required | Low – Med |
| Adaptive Card | Actionable content, approvals, forms, structured data | Medium – High |
| Widget / MCP-UI | Rich, live, stateful experiences with custom UI | High |

---

## Key Principles

1. **Default to the simplest format that meets the need.** Plain Text → Markdown → Adaptive Card → Widget. Don't over-engineer.
2. **Cards are for action, not decoration.** If there's no button, a card is probably overkill.
3. **Widgets are an escalation path, not a default.** Validate on Adaptive Cards first; escalate only when cards hit a hard UI ceiling.
4. **Match the surface.** Mobile Teams has limited widget support. Adaptive Cards are the safest cross-surface choice for interactive content.
5. **Avoid format mixing in a single turn.** A markdown block followed by a card in the same message creates visual noise. Pick one.

---

## Format Profiles

### Plain Text

Use when the response is conversational, brief, or a single-sentence fact. Plain text feels like chatting, loads instantly, and requires zero rendering overhead.

**Use for:**
- "What time is the team sync?" → "Your team sync is at 2 PM Pacific today."
- Confirming an action: "Done — I've sent the invite to Alex."
- Error nudges: "I couldn't find that file. Can you share the link?"
- Status pings: "The deployment finished 3 minutes ago."
- Quick clarifications in a back-and-forth dialog

**Avoid when:** Content has lists, tables, code, or anything the user needs to scan rather than read linearly.


### Markdown

Use when you need lightweight structure — headers, bullets, bold, inline code — but no interactivity. Markdown renders natively in Teams chat and channel posts.

**Use for:**
- Meeting recap with bullet-point action items
- Code snippet with syntax highlighting (inline code or fenced blocks)
- Numbered troubleshooting steps or release notes
- Comparison list: "Here are 3 options for the API approach…"
- Research summaries with sections and sub-bullets

**Avoid when:** Content has more than ~3 data columns, or when the user must take an action (click, approve, fill a field).


### Adaptive Card

Use when structure meets interaction — approvals, form inputs, rich data tables, status dashboards, or any scenario where the user must act on the content.

**Use for:**
- Approval workflow: "Please approve this PR" with [Approve] / [Reject] buttons
- Incident alert with severity badge, owner field, and [Acknowledge] CTA
- Expense report form with dropdowns and text fields
- Interview scheduling: candidate name, time slots, [Confirm Slot] actions
- Search result cards: file name, last modified, [Open] / [Share] buttons

**Avoid when:** Content is purely informational (use Markdown); or data is live and needs real-time refresh (use Widget).


### Widget / MCP-UI

Use for rich, stateful, interactive experiences beyond what a card can offer — embedded charts, live data, multi-step flows, or custom UI. Widgets render as a pane, not inline in chat.

**Use for:**
- Interactive data explorer: filter a table, drill into a row, export CSV
- Multi-step onboarding wizard collecting info across 4–5 screens
- Canvas-style Kanban board with drag-and-drop
- Live analytics dashboard refreshing every 30 seconds
- Code diff viewer with syntax highlighting and inline comments

**Avoid when:** The experience fits in a card (use Adaptive Cards instead), or the UI is too rich to belong in a Teams message at all — a full analytics suite, an interactive CAD viewer, or any app-scale UI should live on the web and be linked to, not embedded. Widgets occupy the middle ground: richer than a card, scoped enough to feel native, but they do not replace the rich experience of a full app. Widgets have higher latency, require extra infrastructure, and have limited support on mobile / classic Teams. Default to Adaptive Cards; escalate to Widget only when cards hit a hard ceiling.

---

## Decision Tree: Which Format Should I Use?

:::image type="content" source="../assets/images/agents-in-teams/teams-message-format-decision-tree-wide-v2.png" alt-text="Image shows a decision tree for agent to choose the right message format." border="false":::

---

## Quick-Reference Cheat Sheet

| Signal in Your Scenario | Recommended Format |
|---|---|
| "Yes/No — confirmed it" | Plain Text |
| "Here are the steps to…" | Markdown |
| "Please approve / reject" | Adaptive Card |
| "Here's a code snippet" | Markdown |
| "Your real-time service health monitor" | Widget / MCP-UI |
| "3 options — pick one" | Adaptive Card |
| "It's done" / "I couldn't…" | Plain Text |
| "Here's the meeting recap" | Markdown |
| "Submit this form" | Adaptive Card |
| "Live sales pipeline" | Widget / MCP-UI |
| "Search results with actions" | Adaptive Card |
| "Live map search + zoom in/out" | Widget / MCP-UI |
| "Status report — scheduled, no action needed" | Markdown |
| "Status report — scheduled, requires action" | Adaptive Card |
| "Status report — on-demand, deeply customized with real-time data" | Widget / MCP-UI |
