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
| `plain` | The text is treated as raw text with no formatting applied. |
| `markdown` | The text is treated as Markdown formatting and rendered on the channel as appropriate. |
| `extendedmarkdown` | The text is treated as extended Markdown, supporting richer rendering for text-only messages such as tables, task lists, code fences, images, at-mentions, and citations. |
| `xml` | The text is simple XML markup. |

For `markdown`, Teams supports a subset of Markdown formatting. For `extendedmarkdown`, Teams supports CommonMark syntax along with additional features such as tables, task lists, code fences, images, at-mentions, and citations. In extended Markdown content, `<at>` is the only supported HTML tag. For `xml`, Teams supports a subset of XML formatting tags.

Your bot can also mention other users and tags in text messages posted in channels. For more information, see [add mentions to your messages](~/bots/how-to/conversations/channel-and-group-conversations.md#add-mentions-to-your-messages).

### Enable extended Markdown

To use extended Markdown formatting in bot messages, set the `textFormat` property to `"extendedmarkdown"` in your `Activity` object:

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

await app.SendActivity(conversationId, activity);
```

# [TypeScript](#tab/typescript)

```typescript
const activity = {
  type: "message",
  text: "### Sprint update\n\n- [x] Build completed\n- [1] Deploy pending",
  textFormat: "extendedmarkdown"
};

await app.sendActivity(conversationId, activity);
```

# [Python](#tab/python)

```python
activity = Activity(
    type=ActivityTypes.message,
    text="### Sprint update\n\n- [x] Build completed\n- [1] Deploy pending",
    text_format="extendedmarkdown"
)

await app.send_activity(conversation_id, activity)
```

---

The following limitations apply to formatting:

- Text-only messages in `plain` format don't support table formatting.
- Rich cards support formatting in the text property only, not in the title or subtitle properties.
- For rich card payload properties, `markdown` and `extendedmarkdown` formatting aren't supported.
- Older or unsupported clients can show unsupported constructs as plain text.

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

When using `textFormat: "extendedmarkdown"`, the following features are available in text-only messages:

| Feature | Syntax | Description |
| --- | --- | --- |
| **Fenced code blocks** | Use triple backticks with a language identifier, for example ` ```python ` | Syntax-highlighted code fences |
| **Images and image URLs** | `![alt text](https://example.com/image.png)` | Render image content from Markdown |
| **At-mentions** | `<at>User Name</at>` or `<at>GroupName</at>` | Reference users or groups |
| **Citations** | `[#]` in message text + `entities` array in Activity | Inline citation markers with reference details. For more information, see [citations](bot-messages-ai-generated-content.md#citations). |
| **Tables** | Pipe-delimited rows with separator line | Structured tabular data with optional column alignment |
| **Task lists** | `- [ ] item` / `- [x] item` | Checklist-style items; checkboxes are read-only |

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

[!INCLUDE [streaming-with-extended-markdown](includes/streaming-with-extended-markdown.md)]

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
