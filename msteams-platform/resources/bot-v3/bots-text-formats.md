---
title: Format Bot Messages & Text
description: Learn how to format bot text in Microsoft Teams using Markdown and XML tags with Bot Framework SDK, support in bot conversations, and check platform compatibility.
ms.topic: how-to
ms.localizationpriority: medium
ms.date: 04/02/2023
---
# Formatting bot messages

[!include[v3-to-v4-SDK-pointer](~/includes/v3-to-v4-pointer-bots.md)]

You can set the optional [`TextFormat`](/bot-framework/dotnet/bot-builder-dotnet-create-messages#customizing-a-message) property to control how your message's text content is rendered.

Microsoft Teams supports the following formatting options:

| TextFormat value | Description |
| --- | --- |
| plain | The text should be treated as raw text with no formatting applied at all. |
| markdown | The text should be treated as Markdown formatting and rendered on the channel as appropriate; see [Formatting text content](#formatting-text-content) for supported styles. |
| xml | The text is simple XML markup; see [Formatting text content](#formatting-text-content) for supported styles. |

## Formatting text content

Teams supports a subset of Markdown and XML (HTML) formatting tags.

The following limitations apply:
* Text-only messages do not support table formatting.

For information on formatting in cards, see [Teams Card Reference](~/task-modules-and-cards/cards/cards-reference.md).

### Cross-platform support

To ensure that your formatting works across all platforms supported by Teams, be aware that some styles aren't supported across all platforms.

| Style                     | Text-only messages | Cards (XML only) |
|---------------------------|--------------------|------------------|
| bold                      | ✔                  | ✖                |
| italic                    | ✔                  | ✔                |
| header (levels 1&ndash;3) | ✖                  | ✔                |
| strikethrough             | ✖                  | ✔                |
| horizontal rule           | ✖                  | ✖                |
| unordered list            | ✖                  | ✔                |
| ordered list              | ✖                  | ✔                |
| preformatted text         | ✔                  | ✔                |
| blockquote                | ✔                  | ✔                |
| hyperlink                 | ✔                  | ✔                |
| image link                | ✔                  | ✖                |

### Support by individual platform

Support for text formatting varies by type of message and by platform.

#### Text-only messages

| Style                     | Desktop | iOS | Android |
|---------------------------|---------|-----|---------|
| bold                      | ✔       | ✔   | ✔       |
| italic                    | ✔       | ✔   | ✔       |
| header (levels 1&ndash;3) | ✖       | ✖   | ✖       |
| strikethrough             | ✔       | ✔   | ✖       |
| horizontal rule           | ✖       | ✖   | ✖       |
| unordered list            | ✔       | ✖   | ✖       |
| ordered list              | ✔       | ✖   | ✖       |
| preformatted text         | ✔       | ✔   | ✔       |
| blockquote                | ✔       | ✔   | ✔       |
| hyperlink                 | ✔       | ✔   | ✔       |
| image link                | ✔       | ✔   | ✔       |

### Examples of text formatting

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
| image link | <img src="https://aka.ms/Fo983c" alt="Duck on a rock"></img> | `![Duck on a rock](http://aka.ms/Fo983c)` | `<img src="https://aka.ms/Fo983c" alt="Duck on a rock"></img>` |
