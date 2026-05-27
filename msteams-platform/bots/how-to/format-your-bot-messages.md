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
| `markdown++` | The text must be treated as enriched Markdown, supporting extended features such as math equations, Mermaid diagrams, callouts, and inline Adaptive Cards. |
| `xml` | The text is simple XML markup. |

Teams supports a subset of `markdown`, `markdown++`, and `xml` or HTML formatting tags. Your bot can also mention other users and tags in text messages posted in channels. For more information, see [add mentions to your messages](~/bots/how-to/conversations/channel-and-group-conversations.md#add-mentions-to-your-messages).

### Enable enriched Markdown (markdown++)

To use enriched Markdown formatting in bot messages, set the `textFormat` property to `"markdown++"` in your `Activity` object:

# [JSON](#tab/json)

```json
{
  "type": "message",
  "text": "Here's a math equation: $$x = \\frac{-b \\pm \\sqrt{b^2 - 4ac}}{2a}$$",
  "textFormat": "markdown++"
}
```

# [C#](#tab/csharp)

```csharp
var activity = MessageFactory.Text(
    "Here's a math equation: $$x = \\frac{-b \\pm \\sqrt{b^2 - 4ac}}{2a}$$",
    inputHint: InputHints.IgnoringInput
);
activity.TextFormat = "markdown++";
await turnContext.SendActivityAsync(activity);
```

# [TypeScript](#tab/ts)

```typescript
const activity = MessageFactory.text(
  "Here's a math equation: $$x = \\frac{-b \\pm \\sqrt{b^2 - 4ac}}{2a}$$"
);
activity.textFormat = "markdown++";
await context.sendActivity(activity);
```

# [Python](#tab/python)

```python
activity = Activity(
    type=ActivityTypes.message,
    text="Here's a math equation: $$x = \\frac{-b \\pm \\sqrt{b^2 - 4ac}}{2a}$$",
    text_format="markdown++"
)
await context.send_activity(activity)
```

---

The following limitations apply to formatting:

- Text-only messages in `plain` format don't support table formatting.
- Rich cards support formatting in the text property only, not in the title or subtitle properties.
- Rich cards don't support Markdown or `markdown++` or table formatting.
- `markdown++` is rendered client-side and requires Teams SDK support. Older clients fall back to `markdown` rendering.

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

## Enriched Markdown (markdown++) features

When using `textFormat: "markdown++"`, the following enriched features are available in text-only messages:

| Feature | Description | Text-only messages | Notes |
| --- | --- | :---: | --- |
| **Callouts** | Colored highlighted blocks for notes, warnings, tips | ✔️ | Use `> [!TYPE]` syntax |
| **Math equations** | Inline and block LaTeX/KaTeX rendering | ✔️ | Delimited by `$...$` (inline) or `$$...$$` (block) |
| **Mermaid diagrams** | Embedded flowcharts, sequence diagrams, etc. | ✔️ | Fenced code block with \`\`\`mermaid |
| **Inline Adaptive Cards** | Embed interactive card elements within Markdown | ✔️ | Fenced block using special syntax |
| **At-mentions** | Reference users or groups | ✔️ | Standard `<at>User Name</at>` or `<at>GroupName</at>` |
| **Entity representations** | Structured data (dates, files, etc.) | ✔️ | Rendered as semantic elements |

### Callouts and directives

Callouts highlight important information such as notes, warnings, and tips:

```markdown
> [!NOTE]
> This is a note callout.

> [!WARNING]
> This is a warning callout.

> [!TIP]
> This is a tip callout.

> [!IMPORTANT]
> This is an important callout.
```

**Note:** Callouts require `textFormat: "markdown++"` and are rendered with distinct visual styling in Teams clients.

### Math equations

Math equations use LaTeX syntax and are rendered client-side. Inline equations are delimited with `$...$`, while block equations use `$$...$$`:

```markdown
The quadratic formula is: $x = \frac{-b \pm \sqrt{b^2 - 4ac}}{2a}$

For a block equation:
$$\int_0^{\infty} e^{-x^2} dx = \frac{\sqrt{\pi}}{2}$$
```

### Mermaid diagrams

Embed Mermaid diagrams for flowcharts, sequence diagrams, and more:

```markdown
\`\`\`mermaid
graph LR
    A[Start] --> B{Decision}
    B -->|Yes| C[Process]
    B -->|No| D[Skip]
    C --> E[End]
\`\`\`
```

### Inline Adaptive Cards

Embed interactive Adaptive Card elements inline within Markdown text:

```markdown
\`\`\`<icard>
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
\`\`\`
```

### Entity representations

EntityRepresentations allow you to include structured data inline. For example, referencing a user or date:

```markdown
Assigned to: <at>John Doe</at>
Due date: <date value="2026-12-31">December 31, 2026</date>
```

### At-mention support

Mention users and groups in your bot messages. At-mentions work with both standard Markdown and enriched Markdown:

```markdown
Hello <at>Jane Smith</at>, please review this.

Notifying team: <at>Engineering Team</at>
```

## Streaming with enriched Markdown

When using `markdown++` in streaming scenarios, your bot can stream content progressively. Enriched content (Mermaid diagrams, math equations, inline Adaptive Cards) renders at safe boundaries to ensure a smooth user experience:

- **Callouts**: Render after the closing `>` block
- **Inline math**: Rendered as content arrives
- **Block math** (`$$...$$`): Renders after the closing `$$` delimiter
- **Mermaid diagrams**: Render after the closing \`\`\` fence
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
