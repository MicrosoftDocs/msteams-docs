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

Agents can send messages with formatted text. Teams supports HTML, Markdown, and plain text for the `text` property of an activity.

The format you choose depends on the content and capabilities your agent requires. If you don't specify `textFormat`, Teams uses HTML formatting by default.

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

Microsoft Teams supports the following formatting options:

| `textFormat` value | When to use |
| ------------------ | ----------- |
| `extendedmarkdown` | Use when your agent needs the extended Markdown features described in this article. This format is in public developer preview. |
| `markdown` | Use for existing agents that depend on the legacy Teams Markdown subset. |
| `plain` | Use when the message must be displayed as raw text without formatting. |

When using `extendedmarkdown`, `<at>` is the only supported HTML tag. For HTML formatting, omit `textFormat` and use the HTML syntax supported by Teams.

The following limitations apply to formatting:

- `textFormat` applies to the activity `text` property. It doesn't enable Markdown or HTML in Adaptive Card or other rich-card payload properties.
- In extended Markdown content, don't include arbitrary HTML. Use `<at>` only as part of a valid mention entity.
- Task-list checkboxes are read-only.
- Older or unsupported clients might show unsupported constructs as plain text.

After you format text content, ensure that your formatting works across all platforms supported by Teams.

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

## Legacy Markdown

The `markdown` format remains supported for existing agents that depend on the legacy Teams Markdown subset. It isn't deprecated, but it provides fewer formatting capabilities than `extendedmarkdown`, and rendering can vary across Teams clients. Keep using it when compatibility with an existing agent requires it, and test messages on the Teams clients that your agent supports.

For new Markdown scenarios, review the capabilities and preview status of [extended Markdown](#extended-markdown-features) before using it in an agent.

## Next step

> [!div class="nextstepaction"]
> [Update and delete messages sent from agent](update-and-delete-bot-messages.md)

## See also

- [Build agents for Teams](../what-are-bots.md)
- [Adaptive Cards](../../task-modules-and-cards/what-are-cards.md#adaptive-cards)
- [Format cards in Teams](../../task-modules-and-cards/cards/cards-format.md)
