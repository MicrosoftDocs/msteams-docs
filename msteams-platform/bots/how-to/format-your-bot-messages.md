---
title: Customize Bot Messages
description: Learn how to format and style your bot messages such as strikethrough, ordered and unordered list, hyperlink, or image link. Understand cross-platform support.
ms.topic: article
ms.localizationpriority: medium
ms.author: anclear
ms.owner: angovil
ms.date: 03/11/2025
---
# Format your bot messages

Message formatting enables you to bring out the best in bot messages. You can format your bot messages to include rich cards as attachments that contain interactive elements, such as buttons, text, and images.

> [!NOTE]
> Regarding bot message size limit:
>
> - The bot message size limit is 100 KB:
>   - 100 KB is an approximate limit because it includes the message itself (text, image links, etc.), @-mentions, and reactions encoded as UTF-16. This 100 KB size limitation doesn't include base64 encoded image.
>   - During implementation, it's recommended to ensure that the size of the message itself is within 80 KB to guarantee successful message delivery.
> - If the bot message exceeds the size limit, the bot receives a `413` status code (`RequestEntityTooLarge`), which contains the error code `MessageSizeTooBig`.

## Format text content

To format your bot messages, you can set the optional [`TextFormat`](/bot-framework/dotnet/bot-builder-dotnet-create-messages#customizing-a-message) property to control how your bot message's text content is rendered.

Microsoft Teams supports the following formatting options:

| `TextFormat` value | Description |
| --- | --- |
| `plain` | The text must be treated as raw text with no formatting applied.|
| `markdown` | The text must be treated as Markdown formatting and rendered on the channel as appropriate. |
| `extendedMarkdown` | The text must be treated as extended Markdown, supporting richer client-side rendering such as math equations, callouts, images, and inline Adaptive Cards. |
| `xml` | The text is simple XML markup. |

Teams supports a subset of `markdown`, `extendedMarkdown`, and `xml` or HTML formatting tags. For extended Markdown text content, only the `<at>` and `<cite>` HTML tags are supported. Your bot can also mention other users and tags in text messages posted in channels. For more information, see [add mentions to your messages](~/bots/how-to/conversations/channel-and-group-conversations.md#add-mentions-to-your-messages).

### Enable extended Markdown

To use extended Markdown formatting in bot messages, set the `textFormat` property to `"extendedMarkdown"` in your `Activity` object:

# [JSON](#tab/json)

```json
{
  "type": "message",
  "textFormat": "extendedMarkdown",
  "text": "markdownContent"
}
```

# [C#](#tab/csharp)

```csharp
var activity = new Activity
{
    Type = ActivityTypes.Message,
    Text = markdownContent,
    TextFormat = "extendedMarkdown"
};

await app.SendActivity(conversationId, activity);
```

# [TypeScript](#tab/typescript)

```typescript
const activity = {
  type: "message",
  text: markdownContent,
  textFormat: "extendedMarkdown"
};

await app.sendActivity(conversationId, activity);
```

# [Python](#tab/python)

```python
activity = Activity(
    type=ActivityTypes.message,
    text=markdown_content,
    text_format="extendedMarkdown"
)

await app.send_activity(conversation_id, activity)
```

---

### How Teams processes bot text formats

For existing values (`plain`, `markdown`, `xml`) and when `textFormat` is omitted, Teams clients currently receive a `RichText/Html` payload.

- The backend converts supported Markdown/formatting into HTML.
- Example: bot text `***bold text***` is converted to `<strong>bold text</strong>` in the client payload.

For `textFormat: "extendedMarkdown"`, Teams clients receive `RichText/ExtendedMarkdown`.

- The backend bypasses HTML conversion and sends the raw bot content.
- Client-side rendering handles supported extended Markdown features.

The following limitations apply to formatting:

- Text-only messages in `plain` format don't support table formatting.
- Rich cards support formatting in the text property only, not in the title or subtitle properties.
- Rich cards don't support Markdown or `extendedMarkdown` or table formatting.
- `extendedMarkdown` is rendered client-side. Older or unsupported clients receive unsupported constructs as plain text.

After you format text content, ensure that your formatting works across all platforms supported by Teams.

## Standard Markdown support

Some styles aren't supported across all platforms. The following table provides a list of standard Markdown styles and which of these styles are supported in text-only messages and rich cards:

| Style                     | Text-only messages | Rich cards - XML only |
| ---                       | :---: | :---: |
| Bold                      | ✔️️ | ❌ |
| Italic                    | ✔️ | ✔️ |
| Header (levels 1&ndash;3) | ❌ | ✔️ |
| Strikethrough             | ❌ | ✔️ |
| Horizontal rule           | ❌ | ❌ |
| Unordered list            | ❌ | ✔️ |
| Ordered list              | ❌ | ✔️ |
| Preformatted text         | ✔️ | ✔️ |
| Blockquote                | ✔️ | ✔️ |
| Hyperlink                 | ✔️ | ✔️ |
| Image link                | ❌ | ❌ |

## Extended Markdown features

When using `textFormat: "extendedMarkdown"`, the following features are available in text-only messages:

| Feature | Syntax | Description |
| --- | --- | --- |
| **Callouts** | `> [!NOTE]`, `> [!WARNING]`, `> [!TIP]`, `> [!IMPORTANT]` | Colored highlighted blocks for notes, warnings, tips |
| **Math equations** | `$...$` (inline) / `$$...$$` (block) | Mathematical equations using KaTeX |
| **Inline Adaptive Cards** | ` ```adaptivecard ` | Embed interactive card elements within Markdown |
| **Fenced blocks** | Use triple backticks with a language identifier, for example ` ```python ` or ` ```adaptivecard ` | Use fenced blocks for supported custom rendering blocks |
| **Images and image URLs** | `![alt text](https://example.com/image.png)` | Render image content from Markdown |
| **At-mentions** | `<at>User Name</at>` or `<at>GroupName</at>` | Reference users or groups |
| **Citations** | `<cite>number</cite>` | Inline citation markers in message text |
| **Tables** | Pipe-delimited rows with separator line | Structured tabular data with optional column alignment |
| **Task lists** | `- [ ] item` / `- [x] item` | Checklist-style items; checkboxes are read-only |
| **Code blocks** | `` ```language `` | Syntax-highlighted code fences |
| **Footnotes** | `Text[^1]` and `[^1]: note` | Reference-style supplementary notes |

### Callouts and directives

Callouts create visually distinct blocks that help users identify important information by severity or type. Use directives to highlight warnings, tips, informational notes, or critical errors.

| Directive | Use case |
|-----------|----------|
| `> [!NOTE]` | General information the user should know |
| `> [!TIP]` | Helpful suggestions or best practices |
| `> [!WARNING]` | Important caution that could affect outcomes |
| `> [!IMPORTANT]` | Critical alerts requiring immediate attention |

```markdown
> [!NOTE]
> This is a note callout.

> [!TIP]
> This is a tip callout.

> [!WARNING]
> This is a warning callout.

> [!IMPORTANT]
> This is an important callout.
```

**Note:** Callouts require `textFormat: "extendedMarkdown"` and are rendered with distinct visual styling in Teams clients.

### Math equations

Use LaTeX/KaTeX syntax to render mathematical equations. Inline math uses single dollar signs, and block math uses double dollar signs.

**Inline math:**

```markdown
The equation $E = mc^2$ describes mass-energy equivalence.
```

**Block math:**

```markdown
$$
r = \frac{\sum(x_i - \bar{x})(y_i - \bar{y})}{\sqrt{\sum(x_i - \bar{x})^2}\sqrt{\sum(y_i - \bar{y})^2}}
$$
```

> [!NOTE]
> Math rendering uses KaTeX. For the full list of supported LaTeX commands, see [KaTeX supported functions](https://katex.org/docs/supported).

### Inline Adaptive Cards

Embed interactive Adaptive Card elements inline within Markdown text:

````markdown
```adaptivecard
{
  "type": "AdaptiveCard",
  "version": "1.6",
  "body": [
    {
      "type": "TextBlock",
      "text": "Click the button below:",
      "weight": "bolder"
    }
  ],
  "actions": [
    {
      "type": "Action.OpenUrl",
      "title": "Learn more",
      "url": "https://learn.microsoft.com"
    }
  ]
}
```
````

### At-mention support

Mention users and groups in your bot messages. At-mentions work with both standard Markdown and extended Markdown:

```markdown
Hello <at>Jane Smith</at>, please review this.

Notifying team: <at>Engineering Team</at>
```

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

Use task list syntax to display completed and pending items in your bot messages.

```markdown
- [x] Checkout code
- [x] Install dependencies
- [x] Run unit tests
- [ ] Deploy to production
```

> [!NOTE]
> Task list checkboxes are read-only. Users can't interact with them to change their state.

## Streaming with extended Markdown

When using `extendedMarkdown` in streaming scenarios, your bot can stream content progressively. Extended Markdown content renders at safe boundaries to ensure a smooth user experience:

- **Callouts**: Render after the closing `>` block
- **Inline math**: Rendered as content arrives
- **Block math** (`$$...$$`): Renders after the closing `$$` delimiter
- **Inline Adaptive Cards**: Render after the closing \`\`\` fence

For detailed information about streaming implementation, see [Stream bot messages](../streaming-ux.md).

After checking cross-platform support, ensure that support by individual platforms is also available.

## Support by individual platform

Support for text formatting varies by type of message and platform.

### Text-only messages

The following table provides a list of styles, which are supported on desktop, iOS, and Android:

| Style                     | Desktop | iOS | Android |
| ---                       | :---: | :---: | :---: |
| Bold                      | ✔️ | ✔️ | ✔️ |
| Italic                    | ✔️ | ✔️ | ✔️ |
| Header (levels 1&ndash;3) | ❌ | ❌ | ❌ |
| Strikethrough             | ✔️ | ✔️ | ❌ |
| Horizontal rule           | ❌ | ❌ | ❌ |
| Unordered list            | ✔️ | ❌ | ❌ |
| Ordered list              | ✔️ | ❌ | ❌ |
| Preformatted text         | ✔️ | ✔️ | ✔️ |
| Blockquote                | ✔️ | ✔️ | ✔️ |
| Hyperlink                 | ✔️ | ✔️ | ✔️ |
| Image link                | ❌ | ❌ | ❌ |

## AI-generated content messages

AI labels, citations, feedback buttons, and sensitivity labels in your bot’s messages improve user engagement and foster transparency and trust.

- [AI label](format-ai-bot-messages.md#ai-label) enables users to identify that the message was generated using AI.
- [Citations](format-ai-bot-messages.md#citations) enables users to refer to the source of the bot's message through in-text citations and references.
- [Feedback buttons](format-ai-bot-messages.md#feedback-buttons) enables users to provide positive or negative feedback to the bot's messages.
- [Sensitivity label](format-ai-bot-messages.md#sensitivity-label) enables users to understand the confidentiality of the bot's message.

For more information, see [bot messages with AI-generated content](format-ai-bot-messages.md).

## Next step

> [!div class="nextstepaction"]
> [Update and delete messages sent from bot](update-and-delete-bot-messages.md)

## See also

- [Build bots for Teams](../what-are-bots.md)
- [Designing your Microsoft Teams bot](../design/bots.md)
- [Adaptive Cards](../../task-modules-and-cards/what-are-cards.md#adaptive-cards)
- [Format cards in Teams](../../task-modules-and-cards/cards/cards-format.md)
