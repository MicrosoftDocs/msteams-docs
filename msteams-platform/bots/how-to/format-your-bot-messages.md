---
title: Format your bot messages
author: surbhigupta
description: Learn how to format and style your bot messages such as strikethrough, ordered and unordered list, hyperlink, or image link. Understand cross-platform support.
ms.topic: conceptual
ms.localizationpriority: medium
ms.author: anclear
---
# Format your bot messages

Message formatting enables you to bring out the best in bot messages. You can format your bot messages to include rich cards as attachments that contain interactive elements, such as buttons, text, images, and so on.

> [!NOTE]
> The bot message size limit is 40 KB. If the bot message size limit exceeds 40 KB, bot receives a `413` status code (`RequestEntityTooLarge`), which contains the error code `MessageSizeTooBig`. The bot message size limit includes the entire message payload encoded as UTF-16 and doesn't include Base64 encoded images.

## Format text content

To format your bot messages, you can set the optional [`TextFormat`](/bot-framework/dotnet/bot-builder-dotnet-create-messages#customizing-a-message) property to control how your bot message's text content is rendered.

Microsoft Teams supports the following formatting options:

| `TextFormat` value | Description |
| --- | --- |
| plain | The text must be treated as raw text with no formatting applied.|
| markdown | The text must be treated as markdown formatting and rendered on the channel as appropriate. |
| xml | The text is simple XML markup. |

Teams supports a subset of markdown and XML or HTML formatting tags.

Currently, the following limitations apply to formatting:

* Text-only messages don't support table formatting.
* Rich cards support formatting in the text property only, not in the title or subtitle properties.
* Rich cards don't support markdown or table formatting.

After you format text content, ensure that your formatting works across all platforms supported by Teams.

## Cross-platform support

Some styles are currently not supported across all platforms. The following table provides a list of styles and which of these styles are supported in text-only messages and rich cards:

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

### Cards

For card support, see [card formatting](~/task-modules-and-cards/cards/cards-format.md).

## Next step

> [!div class="nextstepaction"]
> [Update and delete messages sent from bot](update-and-delete-bot-messages.md)

## See also

* [Build bots for Teams](../what-are-bots.md)
* [Designing your Microsoft Teams bot](../design/bots.md)
* [Adaptive Cards](../../task-modules-and-cards/what-are-cards.md#adaptive-cards)
