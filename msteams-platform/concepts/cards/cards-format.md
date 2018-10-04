---
title: Text formatting in cards
description: Describes card text formatting in Microsoft Teams
keywords: teams bots cards format
ms.date: 03/29/2018
---
# Card formatting

Cards support formatting in the text property only, not in the title or subtitle properties. Formatting can be specified using a subset of XML (HTML) markup, or Markdown.

Formatting support differs between different card types, and between the desktop and the mobile platform.

* **Regular Cards**: Markdown is not supported in Hero/Thumbnail card text fields, but limited HTML is supported.
* **O365 Connector Cards**: Markdown and limited HTML is supported in Office 365 Connector cards in the text fields.
* **Adaptive Cards**: Markdown is supported in Adaptive Card Textblock fields, as well as field and Fact.Title & Fact.Value. Limited HTML is not supported.

## HTML Formatting for regular cards

These HTML tags are supported for regular cards such as the hero and thumbnail card. Markdown is not supported.

| Style | Example | HTML |
| --- | --- | --- |
| bold | **text** | `<strong>text</strong>` |
| italic | *text* | `<em>text</em>` |
| header (levels 1&ndash;3) | **Text** | `<h3>Text</h3>` |
| strikethrough | ~~text~~ | `<strike>text</strike>` |
| unordered list | <ul><li>text</li><li>text</li></ul> | `<ul><li>text</li><li>text</li></ul>` |
| ordered list | <ol><li>text</li><li>text</li></ol> | `<ol><li>text</li><li>text</li></ol>` |
| preformatted text | `text` | `<pre>text</pre>` |
| blockquote | <blockquote>text</blockquote> | `<blockquote>text</blockquote>` |
| hyperlink | [Bing](https://www.bing.com/) | `<a href="https://www.bing.com/">Bing</a>` |
| image link | `<img src="http://aka.ms/Fo983c" alt="Duck on a rock"></img>` |

### Mobile and desktop differences for regular cards

Because of resolution differences between the desktop and mobile platform, formatting is different between the desktop and the mobile version of Teams.

On the desktop, HTML formatting appears like this:

![HTML formatting in the Desktop client](~/assets/images/cards/card-formatting-xml-desktop-v2.png)

On iOS, HTML formatting appears like this:

![HTML formatting in the iOS client](~/assets/images/cards/card-formatting-xml-mobile-v2.png)

Note that character formatting like bold and italic are not rendered on iOS mobile.

On Android, HTML formatting appears like this:

![HTML formatting in the Android client](~/assets/images/cards/card-formatting-xml-android-60.png)

Note that character formatting like bold and italic display correctly on Android.

These screenshots were created using Teams AppStudio, where the text property of a hero card was set to the following string. You can test formatting in your own cards by modifying this code.

`<p>bold: <strong>Bold Text</strong></p><p>italic: <em>Italic Text</em></p><p>strikethrough: <strike>Strikethrough text</strike></p><h1>Header 1</h1><h2>Header 2</h2><h3>Header 3</h3><p>bullet list: <ul><li>text</li><li>text</li></ul></p><p>ordered list: <ol><li>text</li><li>text</li></ol></p><pre>preformatted text</pre><blockquote>blockquote text</blockquote></p><p>hyperlink: <a href=\"https://www.bing.com/\">Bing</a></p><p>embedded image: <img src=\"http://aka.ms/Fo983c\" alt=\"Duck on a rock\"></img></p>`

## HTML formatting for Connector Cards

Connector cards support limited markdown and HTML formatting. Markdown is described in the next section.

| Style | Example | HTML |
| --- | --- | --- |
| bold | **text** | `<strong>text</strong>` |
| italic | *text* | `<em>text</em>` |
| header (levels 1&ndash;3) | **Text** | `<h3>Text</h3>` |
| strikethrough | ~~text~~ | `<strike>text</strike>` |
| unordered list | <ul><li>text</li><li>text</li></ul> | `<ul><li>text</li><li>text</li></ul>` |
| ordered list | <ol><li>text</li><li>text</li></ol> | `<ol><li>text</li><li>text</li></ol>` |
| preformatted text | `text` | `<pre>text</pre>` |
| blockquote | <blockquote>text</blockquote> | `<blockquote>text</blockquote>` |
| hyperlink | [Bing](https://www.bing.com/) | `<a href="https://www.bing.com/">Bing</a>` |
| image link | `<img src="http://aka.ms/Fo983c" alt="Duck on a rock"></img>` |

### Mobile and desktop differences for connector cards using HTML

On the desktop, HTML formatting for connector cards looks like this:

![HTML formatting for connector cards in the Desktop client](~/assets/images/cards/Connector-desktop-html-combined.png)

On iOS, HTML formatting looks like this:

![HTML formatting for connector cards  in the iOS client](~/assets/images/cards/connector-iphone-html-combined-80.png)

Note that character formatting like bold and italic are not rendered on iOS mobile.

On Android, HTML formatting looks like this:

![HTML formatting for connector cards in the Android client](~/assets/images/cards/connector-android-html-combined.png)

## Markdown formatting for Connector Cards

Connector cards support limited markdown and HTML formatting. HTML is described in the last section.

| Style | Example | Markdown |
| --- | --- | --- |
| bold | **text** | `**text**` |
| italic | *text* | `*text*` |
| header (levels 1&ndash;3) | **Text** | `### Text`|
| strikethrough | ~~text~~ | `~~text~~` |
| unordered list | <ul><li>text</li><li>text</li></ul> | ```- Item 1\r- Item 2\r- Item 3``` |
| ordered list | <ol><li>text</li><li>text</li></ol> | ```1. Green\r2. Orange\r3. Blue``` |
| preformatted text | `text` | ``preformatted text`` |
| blockquote | <blockquote>text</blockquote> | `< blockquote text` |
| hyperlink | [Bing](https://www.bing.com/) | `<a href="https://www.bing.com/">Bing</a>` |
| image link | ![Duck](http://aka.ms/Fo983c)|`![Duck](http://aka.ms/Fo983c)` |

### Mobile and desktop differences for connector cards using markdown

On the desktop, markdown formatting for connector cards looks like this:

![HTML formatting for connector cards in the Desktop client](~/assets/images/cards/connector-desktop-markdown-combined.png)

On iOS, markdown formatting for connector cards looks like this:

![HTML formatting for connector cards in the iOS client](~/assets/images/cards/connector-iphone-markdown-combined-80.png)

On Android, markdown formatting for connector cards looks like this:

![HTML formatting for connector cards in the Android client](~/assets/images/cards/connector-android-markdown-combined.png)

## Markdown formatting for Adaptive Cards

 The supported styles are:

| Style | Example | Markdown |
| --- | --- | --- |
| bold | **Bold** | ```**Bold**``` |
| italic | _Italic_ | ```_Italic_``` |
| unordered list | <ul><li>text</li><li>text</li></ul> | ```- Item 1\r- Item 2\r- Item 3``` |
| ordered list | <ol><li>text</li><li>text</li></ol> | ```1. Green\r2. Orange\r3. Blue``` |
| Hyperlinks |[Bing](https://www.bing.com/)| ```[Title](url)``` |

The following markdown tags are not supported

* Headers
* Tables
* Images
* Preformatted text
* Blockquotes

Anything not in the table above

Adaptive cards do not support HTML formatting.

### Mobile and desktop differences for Adaptive Cards

Formatting is slightly different between the desktop and the mobile versions of Teams.

On the desktop, Adaptive Card markdown formatting appears like this in both web browsers and in the Teams client application:

![Adaptive Card Markdown formatting in the desktop client](~/assets/images/cards/Adaptive-markdown-desktop-client.png)

On iOS, Adaptive Card markdown formatting appears like this:

![Adaptive Card Markdown formatting in iOS](~/assets/images/cards/Adaptive-markdown-iOS-75.png)

On Android, Adaptive Card markdown formatting appears like this:

![Adaptive Card Markdown formatting in Android](~/assets/images/cards/Adaptive-markdown-Android.png)

### For more information on Adaptive Cards

[Text features in Adaptive cards](https://docs.microsoft.com/en-us/adaptive-cards/create/textfeatures)
Note that the date and localization features mentioned in this topic are not supported in Teams.