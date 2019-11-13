---
title: Format your bot messages
author: clearab
description: Add rich formatting to your bot messages
ms.topic: overview
ms.author: anclear
---
# Format your bot messages

You can set the optional [`TextFormat`](/bot-framework/dotnet/bot-builder-dotnet-create-messages#customizing-a-message) property to control how your message's text content is rendered.

Microsoft Teams supports the following formatting options:

| TextFormat value | Description |
| --- | --- |
| plain | The text should be treated as raw text with no formatting applied.|
| markdown | The text should be treated as Markdown formatting and rendered on the channel as appropriate. *See* [Formatting text content](#formatting-text-content) for supported styles. |
| xml | The text is simple XML markup. *See* [Formatting text content](#formatting-text-content) for supported styles. |

## Formatting text content

Microsoft Teams supports a subset of Markdown and XML (HTML) formatting tags.

Currently, the following limitations apply:

* Text-only messages don't support table formatting.
* Rich cards support formatting in the text property only, not in the title or subtitle properties.
* Rich cards don't support Markdown or table formatting.

## Cross-platform support

To ensure that your formatting works across all platforms supported by Microsoft Teams, be aware that some styles are not currently supported across all platforms.

| Style                     | Text-only messages | Rich cards (XML only) |
| ---                       | :---: | :---: |
| bold                      | ✔ | ✖ |
| italic                    | ✔ | ✔ |
| header (levels 1&ndash;3) | ✖ | ✔ |
| strikethrough             | ✖ | ✔ |
| horizontal rule           | ✖ | ✖ |
| unordered list            | ✖ | ✔ |
| ordered list              | ✖ | ✔ |
| preformatted text         | ✔ | ✔ |
| blockquote                | ✔ | ✔ |
| hyperlink                 | ✔ | ✔ |
| image link                | ✔ | ✖ |

## Support by individual platform

Support for text formatting varies by type of message and by platform.

### Text-only messages

| Style                     | Desktop | iOS | Android |
| ---                       | :---: | :---: | :---: |
| bold                      | ✔ | ✔ | ✔ |
| italic                    | ✔ | ✔ | ✔ |
| header (levels 1&ndash;3) | ✖ | ✖ | ✖ |
| strikethrough             | ✔ | ✔ | ✖ |
| horizontal rule           | ✖ | ✖ | ✖ |
| unordered list            | ✔ | ✖ | ✖ |
| ordered list              | ✔ | ✖ | ✖ |
| preformatted text         | ✔ | ✔ | ✔ |
| blockquote                | ✔ | ✔ | ✔ |
| hyperlink                 | ✔ | ✔ | ✔ |
| image link                | ✔ | ✔ | ✔ |

### Cards

See [Card Formatting](~/task-modules-and-cards/cards/cards-format.md) for support in cards.
