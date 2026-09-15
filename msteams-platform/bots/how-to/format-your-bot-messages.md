---
title: Format your agent messages
description: Learn how to format text in messages sent by your agent, including HTML, Markdown, and plain text.
ms.topic: article
ms.localizationpriority: medium
ms.author: anclear
ms.owner: angovil
ms.date: 08/25/2026
---

# Format your agent messages

Agents can send messages with formatted text. Teams supports multiple text formatting options for the `text` property of an activity.

The format you choose depends on the content and capabilities your agent requires. If you don't specify `textFormat`, Teams uses a default basic formatting mode that supports a subset of Markdown syntax and a limited set of HTML elements.

> [!IMPORTANT]
> Extended Markdown is available in [public developer preview](../../resources/dev-preview/developer-preview-intro.md). Test your agent with the latest Teams desktop, web, iOS, and Android clients before distributing it.

## Format text content

Set the [`TextFormat`](/bot-framework/dotnet/bot-builder-dotnet-create-messages#customizing-a-message) property to control how Teams renders the `text` property of your Activity.

The following example shows how to send a message with `extendedmarkdown` formatting. This format supports CommonMark, GitHub Flavored Markdown (GFM), and additional features such as tables, task lists, math equations, images, at-mentions, citations, and streaming.

# [JSON](#tab/json)

```json
{
  "type": "message",
  "textFormat": "extendedmarkdown",
  "text": "### Sprint update\n\n- [x] Build completed\n- [ ] Deploy pending"
}
```

# [C#](#tab/csharp)

```csharp
var activity = new Activity
{
    Type = ActivityTypes.Message,
    Text = "### Sprint update\n\n- [x] Build completed\n- [ ] Deploy pending",
    TextFormat = "extendedmarkdown"
};

await app.Send(conversationId, activity);
```

# [TypeScript](#tab/typescript)

```typescript
const activity = {
  type: "message",
  text: "### Sprint update\n\n- [x] Build completed\n- [ ] Deploy pending",
  textFormat: "extendedmarkdown",
};

await app.send(conversationId, activity);
```

# [Python](#tab/python)

```python
activity = Activity(
    type=ActivityTypes.message,
    text="### Sprint update\n\n- [x] Build completed\n- [ ] Deploy pending",
    text_format="extendedmarkdown"
)

await app.send(conversation_id, activity)
```

---

## Text formatting options

Use `textFormat` to choose the formatting behavior for activity text.

| `textFormat` value | When to use |
| ------------------ | ----------- |
| *(not specified)* | **Default basic formatting.** Use for simple text responses. Supports a limited subset of Markdown and HTML described in [Standard Markdown support](#standard-markdown-support). |
| `extendedmarkdown` | **Recommended for rich text responses.** Use this format when your agent outputs richer markdown (for example, from LLM). Supports CommonMark, GitHub Flavored Markdown (GFM), tables, math, images, at-mentions, citations, and streaming. This format is in public developer preview. |
| `markdown` | **Legacy.** Behaves the same as the default basic formatting and is kept for backward compatibility. |
| `xml` | **Legacy.** Supports only a basic HTML subset (no Markdown syntax). |
| `plain` | **Legacy.** Displays raw text without formatting. |

### Standard Markdown support

When you don't specify `textFormat` (default behavior), or when you use `textFormat: "markdown"`, Teams supports the following practical cross-platform subset. This is intentionally not an exhaustive renderer or sanitizer reference.

Supported Markdown formatting:

| Formatting | Syntax |
| ---------- | ------ |
| Bold | `**text**` |
| Italic | `*text*` |
| Hyperlink | `[text](https://example.com)` |

Supported HTML formatting:

| Formatting | Supported tags |
| ---------- | -------------- |
| Bold | `<b>`, `<strong>` |
| Italic | `<i>`, `<em>` |
| Underline | `<u>` |
| Strikethrough | `<s>` |
| Line break | `<br>` |
| Horizontal rule | `<hr>` |
| Hyperlink | `<a href="URL">` |
| Image | `<img src="URL">` |

Additional conversation tags:

- `<at>` tags for at-mentions
- `<quoted>` tags for quoted replies

When using `extendedmarkdown`, both `<at>` (at-mentions) and `<quoted>` (quoted replies) tags are supported for inline HTML.

The following limitations apply to formatting:

- `textFormat` applies to the activity `text` property. It doesn't enable Markdown or HTML in Adaptive Card or other rich-card payload properties.
- In extended Markdown content, don't include arbitrary HTML. Use `<at>` and `<quoted>` only where supported.
- Task-list checkboxes are read-only.
- Older or unsupported clients might show unsupported constructs as plain text.

After you format text content, ensure that your formatting works across all platforms supported by Teams.

## Message size limits

[!INCLUDE [agent-message-size-limit](includes/agent-message-size-limit.md)]

## Extended Markdown features

When using `textFormat: "extendedmarkdown"`, the following features are available in text-only messages:

| Feature                   | Syntax                                                                     | Description                                                                                                                            |
| ------------------------- | -------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------- |
| **Fenced code blocks**    | Use triple backticks with a language identifier, for example ` ```python ` | Syntax-highlighted code fences                                                                                                         |
| **Math equations**        | Inline: `$E = mc^2$` Block: `$$\int_0^\infty f(x)dx$$`                     | LaTeX/KaTeX math notation rendered inline or as a block                                                                                |
| **Images and image URLs** | `![alt text](https://example.com/image.png)`                               | Render image content from Markdown                                                                                                     |
| **At-mentions**           | `<at>User Name</at>` or `<at>GroupName</at>`                               | Reference users or groups                                                                                                              |
| **Citations**             | `[#]` in message text + `entities` array in Activity                       | Inline citation markers with reference details. For more information, see [citations](bot-messages-ai-generated-content.md#citations). |
| **Tables**                | Pipe-delimited rows with separator line                                    | Structured tabular data with optional column alignment                                                                                 |
| **Task lists**            | `- [ ] item` / `- [x] item`                                                | Checklist-style items; checkboxes are read-only                                                                                        |

### At-mention and quoted-reply support

Mention users and groups in your agent messages. At-mentions work with both standard Markdown and extended Markdown:

```markdown
Hello <at>Jane Smith</at>, please review this.

Notifying team: <at>Engineering Team</at>
```

You can also quote a previous message in your response by using the `<quoted>` tag:

```markdown
<quoted>Original message text</quoted>

Thanks for the update!
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
| :------ | :----: | -------: |
| Tables  |  Done  |     High |
| Math    |  Done  |     High |
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

## Next step

> [!div class="nextstepaction"]
> [Update and delete messages sent from agent](update-and-delete-bot-messages.md)

## See also

- [Build agents for Teams](../what-are-bots.md)
- [Adaptive Cards](../../task-modules-and-cards/what-are-cards.md#adaptive-cards)
- [Format cards in Teams](../../task-modules-and-cards/cards/cards-format.md)
