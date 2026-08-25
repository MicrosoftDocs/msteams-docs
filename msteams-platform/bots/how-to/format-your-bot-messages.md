---
title: Format Agent Messages with Markdown
description: Learn when to use extended Markdown for agent messages and how to add CommonMark, GFM, images, mentions, citations, math, and code.
ms.topic: article
ms.localizationpriority: medium
ms.author: anclear
ms.owner: angovil
ms.date: 08/20/2026
---
# Format your agent messages

Modern large language model (LLM)-backed agents naturally generate Markdown. Extended Markdown (`extendedmarkdown`) is the recommended format for new agent text responses — your agent can send CommonMark and GitHub Flavored Markdown (GFM) directly, and Teams renders it as rich, responsive content while preserving Teams capabilities such as at-mentions and citations.

Choose the message format based on what the user needs:

- Use **extended Markdown** for generated or structured text that users read, scan, copy, or stream.
- Use an [Adaptive Card](../../task-modules-and-cards/what-are-cards.md#adaptive-cards) for interactive controls, such as buttons and input fields, or when you require a fixed card layout.
- Use legacy `markdown` only when maintaining an existing agent that depends on the smaller Teams Markdown subset.

> [!IMPORTANT]
> Extended Markdown is available in [public developer preview](../../resources/dev-preview/developer-preview-intro.md). Test your agent with the latest Teams desktop, web, iOS, and Android clients before distributing it.

## Format text content

To format your agent messages, you can set the optional [`TextFormat`](/bot-framework/dotnet/bot-builder-dotnet-create-messages#customizing-a-message) property to control how your agent message's text content is rendered.

Microsoft Teams supports the following formatting options:

| `TextFormat` value | When to use |
| --- | --- |
| `extendedmarkdown` | **Recommended for new agent text responses.** Supports CommonMark, GFM, math, images, at-mentions, citations, and streaming. |
| `markdown` | Use for existing agents that depend on the legacy Teams Markdown subset. |
| `plain` | Use when the message must be displayed as raw text without formatting. |
| `xml` | Use only where a supported rich-card text property accepts the Teams HTML subset. For supported tags, see [format cards](~/task-modules-and-cards/cards/cards-format.md). |

> [!NOTE]
> Support for **extended markdown** is available in [public developer preview](../../resources/dev-preview/developer-preview-intro.md).

For `extendedmarkdown`, Teams supports CommonMark syntax along with additional features such as tables, task lists, code fences, math equations, images, at-mentions, and citations. In extended Markdown content, `<at>` is the only supported HTML tag.

The following limitations apply to formatting:

- `textFormat` applies to the Activity `text` property. It doesn't enable extended Markdown in Adaptive Card or other rich-card payload properties.
- In extended Markdown content, don't include arbitrary HTML. Use `<at>` only as part of a valid mention entity.
- Task-list checkboxes are read-only.
- Older or unsupported clients can show unsupported constructs as plain text.

After you format text content, ensure that your formatting works across all platforms supported by Teams.

### Set message text format

To set the text format, specify the `textFormat` property in your `Activity` object. The following example shows how to send a message with `extendedmarkdown` formatting:

# [JSON](#tab/json)

```json
{
  "type": "message",
  "textFormat": "extendedmarkdown",
  "text": "### Sprint update\n\n- [x] Build completed\n- [1] Deploy pending"
}
```

# [C#](#tab/csharp)

```csharp
var activity = new Activity
{
    Type = ActivityTypes.Message,
    Text = "### Sprint update\n\n- [x] Build completed\n- [1] Deploy pending",
    TextFormat = "extendedmarkdown"
};

await app.Send(conversationId, activity);
```

# [TypeScript](#tab/typescript)

```typescript
const activity = {
  type: "message",
  text: "### Sprint update\n\n- [x] Build completed\n- [1] Deploy pending",
  textFormat: "extendedmarkdown"
};

await app.send(conversationId, activity);
```

# [Python](#tab/python)

```python
activity = Activity(
    type=ActivityTypes.message,
    text="### Sprint update\n\n- [x] Build completed\n- [1] Deploy pending",
    text_format="extendedmarkdown"
)

await app.send(conversation_id, activity)
```

---

## Standard Markdown support

Some styles aren't supported across all platforms. The following table provides a list of standard Markdown styles and which of these styles are supported in text-only messages and rich cards:

| Style | Text-only messages | Rich cards - XML only |
| --- | :---: | :---: |
| Bold | ✔️️ | ❌ |
| Italic | ✔️ | ✔️ |
| Header (levels 1&ndash;3) | ❌ | ✔️ |
| Strikethrough | ❌ | ✔️ |
| Horizontal rule | ❌ | ❌ |
| Unordered list | ❌ | ✔️ |
| Ordered list | ❌ | ✔️ |
| Preformatted text | ✔️ | ✔️ |
| Blockquote | ✔️ | ✔️ |
| Hyperlink | ✔️ | ✔️ |
| Image link | ❌ | ❌ |

## Extended Markdown features

When using `textFormat: "extendedmarkdown"`, the following features are available in text-only messages:

| Feature | Syntax | Description |
| --- | --- | --- |
| **Fenced code blocks** | Use triple backticks with a language identifier, for example ` ```python ` | Syntax-highlighted code fences |
| **Math equations** | Inline: `$E = mc^2$` Block: `$$\int_0^\infty f(x)dx$$` | LaTeX/KaTeX math notation rendered inline or as a block |
| **Images and image URLs** | `![alt text](https://example.com/image.png)` | Render image content from Markdown |
| **At-mentions** | `<at>User Name</at>` or `<at>GroupName</at>` | Reference users or groups |
| **Citations** | `[#]` in message text + `entities` array in Activity | Inline citation markers with reference details. For more information, see [citations](bot-messages-ai-generated-content.md#citations). |
| **Tables** | Pipe-delimited rows with separator line | Structured tabular data with optional column alignment |
| **Task lists** | `- [ ] item` / `- [x] item` | Checklist-style items; checkboxes are read-only |

### At-mention support

Mention users and groups in your agent messages. At-mentions work with both standard Markdown and extended Markdown:

```markdown
Hello <at>Jane Smith</at>, please review this.

Notifying team: <at>Engineering Team</at>
```

### Fenced code blocks

Use triple backticks with a language identifier to display syntax-highlighted code in your agent messages.

````markdown
```python
def fibonacci(n):
    if n <= 1:
        return n
    return fibonacci(n-1) + fibonacci(n-2)
```
````

### Math equations

Use LaTeX/KaTeX syntax to render mathematical notation. Use single dollar signs for inline equations and double dollar signs for block equations.

```markdown
Inline math: $E = mc^2$

Block math:
$$
\int_0^\infty f(x)dx
$$
```

### Images

Use standard Markdown image syntax to render images in your agent messages.

```markdown
![Build status](https://example.com/build-status.png)
```

### Citations

Cite sources in your agent messages using `[#]` notation in the message text and providing citation details in the Activity `entities` array. For more information on how to add citations, see [citations](bot-messages-ai-generated-content.md#citations).

### Tables

Use GitHub Flavored Markdown (GFM) table syntax to present structured data. Tables support column alignment using colons in the separator row.

```markdown
| Feature | Status | Priority |
|:--------|:------:|----------:|
| Tables  | Done   | High      |
| Math    | Done   | High      |
```

In this example, the first column is left-aligned, the second is centered, and the third is right-aligned.

### Task lists

Use task list syntax to display completed and pending items in your agent messages.

```markdown
- [x] Checkout code
- [x] Install dependencies
- [x] Run unit tests
- [ ] Deploy to production
```

> [!NOTE]
> Task list checkboxes are read-only. Users can't interact with them to change their state.

## Streaming with extended Markdown

Extended Markdown content will render as it streams:

- **Fenced code blocks**: Render only after the closing ` ``` ` fence is received on its own line
- **Math equations**: Render after the closing `$` or `$$` delimiter is received
- **Images and image URLs**: Render after the closing parenthesis of the image URL passes validation
- **At-mentions**: Render when `<at>...</at>` tags are complete and valid
- **Citations**: Render when `[#]` markers and corresponding `entities` are present in the Activity
- **Tables**: Render when enough rows are received to form a valid table structure
- **Task lists**: Render when list items and checkbox markers (`- [ ]`, `- [x]`) are complete

For detailed information about streaming implementation, see [Stream agent messages](../streaming-ux.md).

## Legacy Markdown platform support

The following table applies to the legacy `markdown` format, not `extendedmarkdown`. Legacy Markdown supports a smaller subset that varies by platform:

| Style | Desktop | iOS | Android |
| --- | :---: | :---: | :---: |
| Bold | ✔️ | ✔️ | ✔️ |
| Italic | ✔️ | ✔️ | ✔️ |
| Header (levels 1&ndash;3) | ❌ | ❌ | ❌ |
| Strikethrough | ✔️ | ✔️ | ❌ |
| Horizontal rule | ❌ | ❌ | ❌ |
| Unordered list | ✔️ | ❌ | ❌ |
| Ordered list | ✔️ | ❌ | ❌ |
| Preformatted text | ✔️ | ✔️ | ✔️ |
| Blockquote | ✔️ | ✔️ | ✔️ |
| Hyperlink | ✔️ | ✔️ | ✔️ |
| Image link | ❌ | ❌ | ❌ |

## AI-generated content messages

AI labels, citations, feedback buttons, and sensitivity labels in your agent’s messages improve user engagement and foster transparency and trust.

- [AI label](format-ai-bot-messages.md#ai-label) enables users to identify that the message was generated using AI.
- [Citations](format-ai-bot-messages.md#citations) enables users to refer to the source of the agent's message through in-text citations and references.
- [Feedback buttons](format-ai-bot-messages.md#feedback-buttons) enables users to provide positive or negative feedback to the agent's messages.
- [Sensitivity label](format-ai-bot-messages.md#sensitivity-label) enables users to understand the confidentiality of the agent's message.

For more information, see [agent messages with AI-generated content](format-ai-bot-messages.md).

## Message size limits

[!INCLUDE [agent-message-size-limit](includes/agent-message-size-limit.md)]

## Next step

> [!div class="nextstepaction"]
> [Update and delete messages sent from agent](update-and-delete-bot-messages.md)

## See also

- [Build agents for Teams](../what-are-bots.md)
- [Adaptive Cards](../../task-modules-and-cards/what-are-cards.md#adaptive-cards)
- [Format cards in Teams](../../task-modules-and-cards/cards/cards-format.md)
