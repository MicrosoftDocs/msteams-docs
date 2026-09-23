---
title: Format Agent Messages
description: Format agent messages in Teams with Markdown, extended Markdown, or HTML. Learn how to set textFormat and render rich content.
ms.topic: article
ms.author: nickwalk
ms.reviewer: nickwalk
ms.date: 09/21/2026
author: nickwalkmsft
---

# Format agent messages

Agents can use Markdown and HTML to format the text of messages that they send.

By default, Teams recognizes a practical subset of Markdown syntax and HTML elements. Opting in to extended Markdown mode enables additional Markdown features.

## Default formatting features

By default, Teams recognizes the following markup syntax:

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

## Extended Markdown mode (preview)

> [!IMPORTANT]
> Extended Markdown mode is available in [public developer preview](../../resources/dev-preview/developer-preview-intro.md). When it becomes generally available, the current default behavior will remain the default to ensure the stability of existing agents.
>
> To prepare to take advantage of extended Markdown mode's general availability:
>
> - Avoid or remove the use of HTML for message formatting, and use Markdown exclusively
> - Everywhere your implementation constructs or sends messages, use a pattern that allows specifying a `textFormat` (specify `markdown` to retain the current default behavior)
> - Test messaging scenarios in both default and extended Markdown modes with the latest Teams desktop, web, iOS and Android clients

Extended Markdown mode supports additional CommonMark and GitHub Flavored Markdown features to enhance agent expressiveness and better support the output of modern large language models (LLMs). It also enables progressive rendering of formatting when [streaming messages](../streaming-ux.md).

Extended Markdown mode is recommended for all messaging scenarios that aren't strictly dependent on the default formatting behavior. It's opt-in because it's not fully backwards compatible with the default formatting behavior, and does not support arbitrary HTML.

### Enable extended Markdown mode

Enable extended Markdown mode on a message by setting its activity's `textFormat` property to `extendedmarkdown` before sending it.

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

### Extended Markdown mode features

In extended Markdown mode, Teams recognizes all of the Markdown features of the default formatting behavior, plus the following:

| Feature                   | Syntax                                                                     | Description                                                                                                                            |
| ------------------------- | -------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------- |
| **Fenced code blocks**    | Use triple backticks with a language identifier, for example ` ```python ` | Syntax-highlighted code fences                                                                                                         |
| **Math equations**        | Inline: `$E = mc^2$` Block: `$$\int_0^\infty f(x)dx$$`                     | LaTeX/KaTeX math notation rendered inline or as a block                                                                                |
| **Images and image URLs** | `![alt text](https://example.com/image.png)`                               | Render image content from Markdown                                                                                                     |
| **Citations**             | `[#]` in message text + `entities` array in Activity                       | Inline citation markers with reference details. For more information, see [citations](bot-messages-ai-generated-content.md#citations). |
| **Tables**                | Pipe-delimited rows with separator line                                    | Structured tabular data with optional column alignment                                                                                 |
| **Task lists**            | `- [ ] item` / `- [x] item`                                                | Checklist-style items; checkboxes are read-only                                                                                        |

#### Fenced code blocks

Use triple backticks with a language identifier to display syntax-highlighted code in your agent messages.

````markdown
```python
def fibonacci(n):
    if n <= 1:
        return n
    return fibonacci(n-1) + fibonacci(n-2)
```
````

#### Math equations

Use LaTeX/KaTeX syntax to render mathematical notation. Use single dollar signs for inline equations and double dollar signs for block equations.

```markdown
Inline math: $E = mc^2$

Block math:

$$
\int_0^\infty f(x)dx
$$
```

#### Images

Use standard Markdown image syntax to render images in your agent messages.

```markdown
![Build status](https://example.com/build-status.png)
```

#### Citations

Cite sources in your agent messages using `[#]` notation in the message text and providing citation details in the Activity `entities` array. For more information on how to add citations, see [citations](bot-messages-ai-generated-content.md#citations).

#### Tables

Use GitHub Flavored Markdown (GFM) table syntax to present structured data. Tables support column alignment using colons in the separator row.

```markdown
| Feature | Status | Priority |
| :------ | :----: | -------: |
| Tables  |  Done  |     High |
| Math    |  Done  |     High |
```

In this example, the first column is left-aligned, the second is centered, and the third is right-aligned.

#### Task lists

Use task list syntax to display completed and pending items in your agent messages.

```markdown
- [x] Checkout code
- [x] Install dependencies
- [x] Run unit tests
- [ ] Deploy to production
```

> [!NOTE]
> Task list checkboxes are read-only. Users can't interact with them to change their state.

## Legacy formatting modes

The following legacy formatting modes should not be used in new development.

| `textFormat` value | Capabilities |
| ------------------ | ----------- |
| `markdown` | Default behavior, same as not setting `textFormat` |
| `xml` | Supports only a basic HTML subset (no Markdown syntax). |
| `plain` | Displays raw text without formatting. |

## Message size limits

[!INCLUDE [agent-message-size-limit](includes/agent-message-size-limit.md)]

## Next steps

> [!div class="nextstepaction"]
> [Update and delete messages sent from agent](update-and-delete-bot-messages.md)

## See also

- [Build agents for Teams](../what-are-bots.md)
- [Adaptive Cards](../../task-modules-and-cards/what-are-cards.md#adaptive-cards)
- [Format cards in Teams](../../task-modules-and-cards/cards/cards-format.md)
