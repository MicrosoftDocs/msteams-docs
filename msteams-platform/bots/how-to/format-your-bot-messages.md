---
title: Customize Agent Messages
description: Learn how to format and style your agent messages such as strikethrough, ordered and unordered list, hyperlink, or image link. Understand cross-platform support.
ms.topic: article
ms.localizationpriority: medium
ms.author: anclear
ms.owner: angovil
ms.date: 08/17/2026
---
# Format your agent messages

Message formatting enables you to bring out the best in agent messages. You can format your agent messages to include rich cards as attachments that contain interactive elements, such as buttons, text, and images.

> [!NOTE]
> Regarding agent or bot message size limit:
>
> - The agent message size limit is 100 KB:
>   - 100 KB is an approximate limit because it includes the message itself (text, image links, etc.), @-mentions, and reactions encoded as UTF-16. This 100 KB size limitation doesn't include base64 encoded image.
>   - During implementation, it's recommended to ensure that the size of the message itself is within 80 KB to guarantee successful message delivery.
> - If the agent message exceeds the size limit, the agent receives a `413` status code (`RequestEntityTooLarge`), which contains the error code `MessageSizeTooBig`.

## Format text content

To format your agent messages, you can set the optional [`TextFormat`](/bot-framework/dotnet/bot-builder-dotnet-create-messages#customizing-a-message) property to control how your agent message's text content is rendered.

Microsoft Teams supports the following formatting options:

| `TextFormat` value | Description |
| --- | --- |
| `plain` | The text is treated as raw text with no formatting applied. |
| `markdown` | The text is treated as Markdown formatting and rendered on the channel as appropriate. |
| `extendedmarkdown` | The text is treated as extended Markdown, supporting richer rendering for text-only messages such as tables, task lists, code fences, math equations, images, at-mentions, and citations. |
| `xml` | The text uses a subset of HTML tags for formatting in rich cards. For supported tags, see [format cards](~/task-modules-and-cards/cards/cards-format.md). |

> [!NOTE]
> Support for **extended markdown** is available in [public developer preview](../../resources/dev-preview/developer-preview-intro.md).

For `markdown`, Teams supports a subset of Markdown formatting. For `extendedmarkdown`, Teams supports CommonMark syntax along with additional features such as tables, task lists, code fences, math equations, images, at-mentions, and citations. In extended Markdown content, `<at>` is the only supported HTML tag.

The following limitations apply to formatting:

- Text-only messages in `plain` format don't support table formatting.
- Rich cards support formatting in the text property only, not in the title or subtitle properties.
- For rich card payload properties, `markdown` and `extendedmarkdown` formatting aren't supported.
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

## Support by individual platform

Support for text formatting varies by type of message and platform.

### Text-only messages

The following table provides a list of styles, which are supported on desktop, iOS, and Android:

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

## Next step

> [!div class="nextstepaction"]
> [Update and delete messages sent from agent](update-and-delete-bot-messages.md)

## See also

- [Build agents for Teams](../what-are-bots.md)
- [Adaptive Cards](../../task-modules-and-cards/what-are-cards.md#adaptive-cards)
- [Format cards in Teams](../../task-modules-and-cards/cards/cards-format.md)
