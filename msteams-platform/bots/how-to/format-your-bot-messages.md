---
title: Format your bot messages
author: clearab
description: Add rich formatting to your bot messages
ms.topic: conceptual
ms.author: anclear
---
# Format your bot messages

Message formatting enables you to bring out the best in bot messages. You can format your bot messages to include rich cards that are attachments that contain interactive elements, such as buttons, text, images, audio, video, and so on.

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

* Text-only messages do not support table formatting.
* Rich cards support formatting in the text property only, not in the title or subtitle properties.
* Rich cards do not support markdown or table formatting.

After you format text content, ensure that your formatting works across all platforms supported by Microsoft Teams.

## Cross-platform support

Some styles are currently not supported across all platforms. The following table provides a list of styles and which of these styles are supported in text-only messages and rich cards:

| Style                     | Text-only messages | Rich cards - XML only |
| ---                       | :---: | :---: |
| Bold                      | ✔ | ✖ |
| Italic                    | ✔ | ✔ |
| Header (levels 1&ndash;3) | ✖ | ✔ |
| Strikethrough             | ✖ | ✔ |
| Horizontal rule           | ✖ | ✖ |
| Unordered list            | ✖ | ✔ |
| Ordered list              | ✖ | ✔ |
| Preformatted text         | ✔ | ✔ |
| Blockquote                | ✔ | ✔ |
| Hyperlink                 | ✔ | ✔ |
| Image link                | ✔ | ✖ |

After checking cross-platform support, ensure that support by individual platforms is also available.

## Support by individual platform

Support for text formatting varies by type of message and platform.

### Text-only messages

The following table provides a list of styles and which of these styles are supported on desktop, iOS, and Android:

| Style                     | Desktop | iOS | Android |
| ---                       | :---: | :---: | :---: |
| Bold                      | ✔ | ✔ | ✔ |
| Italic                    | ✔ | ✔ | ✔ |
| Header (levels 1&ndash;3) | ✖ | ✖ | ✖ |
| Strikethrough             | ✔ | ✔ | ✖ |
| Horizontal rule           | ✖ | ✖ | ✖ |
| Unordered list            | ✔ | ✖ | ✖ |
| Ordered list              | ✔ | ✖ | ✖ |
| Preformatted text         | ✔ | ✔ | ✔ |
| Blockquote                | ✔ | ✔ | ✔ |
| Hyperlink                 | ✔ | ✔ | ✔ |
| Image link                | ✔ | ✔ | ✔ |

### Cards

For card support, see [card formatting](~/task-modules-and-cards/cards/cards-format.md).

## Next step

> [!div class="nextstepaction"]
> [Update and delete bot messages](~/bots/how-to/update-and-delete-bot-messages.md)
