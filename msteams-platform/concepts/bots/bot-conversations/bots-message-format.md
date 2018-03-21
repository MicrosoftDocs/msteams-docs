---
title: Bot message format
description: Describes the details of formatting for bot messages
keywords: teams scenarios channels conversation bot message
ms.date: 03/21/2018
---
# Message formatting for bots

You can set the optional [`TextFormat`](https://docs.microsoft.com/en-us/bot-framework/dotnet/bot-builder-dotnet-create-messages#customizing-a-message) property to control how your message's text content is rendered.

Microsoft Teams supports the following formatting options:

| TextFormat value | Description |
| --- | --- |
| plain | The text should be treated as raw text with no formatting applied at all |
| markdown | The text should be treated as Markdown formatting and rendered on the channel as appropriate; see [Formatting text content](#formatting-text-content) for supported styles |
| xml | The text is simple XML markup; see [Formatting text content](#formatting-text-content) for supported styles |

# Formatting text content

Microsoft Teams supports a subset of Markdown and XML (HTML) formatting tags.

Currently, the following limitations apply:

* Text-only messages do not support table formatting
* Rich cards support formatting in the text property only, not in the title or subtitle properties
* Rich cards do not support Markdown or table formatting

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

> [!NOTE]
> Currently, Connector cards support no formatting across all platforms. See [Cards](~/concepts/bots/bot-conversations/bots-conversations#cards) in the next section for more detail.

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

[!include[Formatting text content in cards](~/includes/bots/message-format-cards.html)]

\*Renders as bold

## Examples of text formatting

| Style | Example | Markdown | XML (HTML) |
| --- | --- | --- | --- |
| bold | **text** | `**text**` | `<strong>text</strong>` |
| italic | *text* | `*text*` | `<em>text</em>` |
| header (levels 1&ndash;3) | **Text** | `### Text` | `<h3>Text</h3>` |
| strikethrough | ~~text~~ | `~~text~~` | `<strike>text</strike>` |
| unordered list | <ul><li>text</li><li>text</li></ul> | `* text`<br>`* text` | `<ul><li>text</li><li>text</li></ul>` |
| ordered list | <ol><li>text</li><li>text</li></ol> | `1. text`<br>`2. text` | `<ol><li>text</li><li>text</li></ol>` |
| preformatted text | `text` | `` `text` `` | `<pre>text</pre>` |
| blockquote | <blockquote>text</blockquote> | `>text` | `<blockquote>text</blockquote>` |
| hyperlink | [Bing](https://www.bing.com/) | `[Bing](https://www.bing.com/)` | `<a href="https://www.bing.com/">Bing</a>` |
| image link | <img src="http://aka.ms/Fo983c" alt="Duck on a rock"></img> | `![Duck on a rock](http://aka.ms/Fo983c)` | `<img src="http://aka.ms/Fo983c" alt="Duck on a rock"></img>` |

# Picture messages

Pictures are sent by adding attachments to a message. You can find more information on attachments in the [Bot Framework documentation](https://docs.botframework.com/en-us/core-concepts/attachments/).

Pictures can be at most 1024×1024 and 1 MB in PNG, JPEG, or GIF format; animated GIF is not officially supported.

We recommend that you specify the height and width of each image by using XML. If you use Markdown, the image size defaults to 256×256. For example:

* Use `<img src="http://aka.ms/Fo983c" alt="Duck on a rock" height="150" width="223"></img>`
* Don't use `![Duck on a rock](http://aka.ms/Fo983c)`