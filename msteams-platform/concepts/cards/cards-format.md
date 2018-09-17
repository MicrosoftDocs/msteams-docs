---
title: Text formatting in cards
description: Describes card text formatting in Microsoft Teams
keywords: teams bots cards format
ms.date: 03/29/2018
---
# Card formatting

Cards support formatting in the text property only, not in the title or subtitle properties. Formatting can be specified using a subset of XML (HTML) markup, or Markdown.

Formatting support differs slightly between different card types, and between the desktop and the mobile platform. Those differences are described below. 

In general these tags are supported:

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

## Mobile and desktop differences

Because of resolution differences between the desktop and mobile platform, formatting is different between the desktop and the mobile version of Teams.

On the desktop XML formatting appears like this:

![XML formatting in the desktop client](~/images/cards/card-formatting-xml-desktop-v2.png)

On mobile XML formatting appears like this:

![XML formatting in the mobile client](~/images/cards/card-formatting-xml-mobile-v2.png)

Note that character formatting like bold and italic are not rendered on mobile.

These screenshots were created by setting the text property of a hero card to the following string. You can test formatting in your own cards by modifying this code.

`<p>bold: <strong>Bold Text</strong></p><p>italic: <em>Italic Text</em></p><p>strikethrough: <strike>Strikethrough text</strike></p><h1>Header 1</h1><h2>Header 2</h2><h3>Header 3</h3><p>bullet list: <ul><li>text</li><li>text</li></ul></p><p>ordered list: <ol><li>text</li><li>text</li></ol></p><pre>preformatted text</pre><blockquote>blockquote text</blockquote></p><p>hyperlink: <a href=\"https://www.bing.com/\">Bing</a></p><p>embedded image: <img src=\"http://aka.ms/Fo983c\" alt=\"Duck on a rock\"></img></p>`

## Text formatting for Adaptive cards

Adaptive card offers inline markup for a subset of Markdown syntax. The supported styles are:

| Text Style      | Markdown |
|-----------------|-----|
| **Bold**        | ```**Bold**``` |
| _Italic_        | ```_Italic_``` |
| Bullet list     | ```- Item 1\r- Item 2\r- Item 3``` | 
| Numbered list   | ```1. Green\r2. Orange\r3. Blue``` |
| Hyperlinks      | ```[Title](url)``` |

_Not supported_

* Headers
* Tables
* Images
* Anything not in the table above

### For more information
[Text features in Adaptive cards](https://docs.microsoft.com/en-us/adaptive-cards/create/textfeatures)