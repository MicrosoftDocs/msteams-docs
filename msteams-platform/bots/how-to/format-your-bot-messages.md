---
title: Format Agent Messages
description: Format agent messages in Teams with Markdown, extended Markdown, HTML, or plain text. Learn how to set textFormat and render rich content.
ms.topic: article
ms.author: nickwalk
ms.reviewer: nickwalk
ms.date: 09/19/2026
author: nickwalkmsft
---

# Format agent messages

Agents can use Markdown and HTML to format the text of messages that they send.

By default, Teams recognizes a subset of Markdown syntax and a limited set of HTML elements. You can change the formatting behavior by setting the `textFormat` property of a message activity before sending it.

> [!IMPORTANT]
> Extended Markdown mode (`"textFormat": "extendedmarkdown"`), available in [public developer preview](../../resources/dev-preview/developer-preview-intro.md), enhances agent expressiveness and improves support for Markdown features used by modern large language models (LLMs). When it reaches general availability, it will be recommended for all messaging scenarios that don't require exact compatibility with the existing behavior.
>
> **The current behavior will remain the default** to ensure the stability of existing agents, because extended Markdown mode does not fully preserve it. To prepare to take advantage of extended Markdown mode when it becomes generally available:
>
> - Avoid or remove the use of HTML for message formatting, and use Markdown exclusively
> - Use message construction patterns that allow specifying a `textFormat`
> - Test messaging scenarios in both default and extended Markdown modes with the latest Teams desktop, web, iOS and Android clients

## Choose a formatting mode

The `textFormat` property of a message activity controls how Teams recognizes Markdown and HTML in the message's `text`. Teams supports the following values:

| `textFormat` value | Capabilities |
| ------------------ | ----------- |
| *(not specified)* or `markdown` | Supports a limited subset of Markdown and HTML described in [Default formatting behavior](#default-formatting-behavior). |
| `extendedmarkdown` | **In public developer preview.** Supports CommonMark, GitHub Flavored Markdown (GFM), tables, task lists, math, images, citations, and progressive streaming; see [Extended Markdown behavior](#extended-markdown-behavior). |
| `xml` | **Legacy.** Supports only a basic HTML subset (no Markdown syntax). |
| `plain` | **Legacy.** Displays raw text without formatting. |

`textFormat` applies only to a message activity's `text` property. It doesn't change the behavior of markup recognition in Adaptive Cards or other rich-card payload properties.

Test formatting scenarios to ensure that they work across all platforms supported by Teams. Older or unsupported clients might show unsupported constructs as plain text.

## Set the formatting mode

The following example illustrates sending a message with `extendedmarkdown` formatting:

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
const activity = 
  new MessageActivityInput("### Sprint update\n\n- [x] Build completed\n- [ ] Deploy pending")
    .withTextFormat('extendedmarkdown');

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

# [JSON](#tab/json)

```json
{
  "type": "message",
  "textFormat": "extendedmarkdown",
  "text": "### Sprint update\n\n- [x] Build completed\n- [ ] Deploy pending"
}
```

---

## Default formatting behavior

By default, when no `textFormat` value is specified, Teams recognizes a practical subset of Markdown syntax and HTML elements.

| Formatting | Syntax |
| ---------- | ------ |
| Markdown Bold | `**text**` |
| Markdown Italic | `*text*` |
| Markdown Hyperlink | `[text](https://example.com)` |
| HTML Bold | `<b>`, `<strong>` |
| HTML Italic | `<i>`, `<em>` |
| HTML Underline | `<u>` |
| HTML Strikethrough | `<s>` |
| HTML Line break | `<br>` |
| HTML Horizontal rule | `<hr>` |
| HTML Hyperlink | `<a href="URL">` |
| HTML Image | `<img src="URL">` |

## Extended Markdown behavior

Setting `textFormat` to `extendedmarkdown` enables support for additional Markdown features, as well as progressive rendering when [streaming messages](../streaming-ux.md). Extended Markdown is not fully backwards compatible with the default rendering behavior. Arbitrary HTML is not supported.

| Feature                   | Syntax                                                                     | Description                                                                                                                            |
| ------------------------- | -------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------- |
| **Fenced code blocks**    | Use triple backticks with a language identifier, for example ` ```python ` | Syntax-highlighted code fences                                                                                                         |
| **Math equations**        | Inline: `$E = mc^2$` Block: `$$\int_0^\infty f(x)dx$$`                     | LaTeX/KaTeX math notation rendered inline or as a block                                                                                |
| **Images and image URLs** | `![alt text](https://example.com/image.png)`                               | Render image content from Markdown                                                                                                     |
| **Citations**             | `[#]` in message text + `entities` array in Activity                       | Inline citation markers with reference details. For more information, see [citations](bot-messages-ai-generated-content.md#citations). |
| **Tables**                | Pipe-delimited rows with separator line                                    | Structured tabular data with optional column alignment                                                                                 |
| **Task lists**            | `- [ ] item` / `- [x] item`                                                | Checklist-style items; checkboxes are read-only                                                                                        |

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

## Message size limits

[!INCLUDE [agent-message-size-limit](includes/agent-message-size-limit.md)]

## Next steps

> [!div class="nextstepaction"]
> [Update and delete messages sent from agent](update-and-delete-bot-messages.md)

## See also

- [Build agents for Teams](../what-are-bots.md)
- [Adaptive Cards](../../task-modules-and-cards/what-are-cards.md#adaptive-cards)
- [Format cards in Teams](../../task-modules-and-cards/cards/cards-format.md)
