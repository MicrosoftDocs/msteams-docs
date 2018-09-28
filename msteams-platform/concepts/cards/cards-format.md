---
title: Text formatting in cards
description: Describes card text formatting in Microsoft Teams
keywords: teams bots cards format
ms.date: 03/29/2018
---
# Card formatting

Cards support formatting in the text property only, not in the title or subtitle properties. Formatting can be specified using a subset of XML (HTML) markup, or Markdown.

Formatting support differs between different card types, and between the desktop and the mobile platform. Those differences are described below.

## Formatting for regular cards:

These XML tags are supported for regular cards such as the hero and thumbnail card. Markdown is not supported.

| Style | Example | XML (HTML) |
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

### Mobile and desktop differences for XML formatting

Because of resolution differences between the desktop and mobile platform, formatting is different between the desktop and the mobile version of Teams.

On the desktop, XML formatting appears like this:

![XML formatting in the desktop client](~/assets/images/cards/card-formatting-xml-desktop-v2.png)

On iOS, XML formatting appears like this:

![XML formatting in the iOS client](~/assets/images/cards/card-formatting-xml-mobile-v2.png)

Note that character formatting like bold and italic are not rendered on iOS mobile.

On Android, XML formatting appears like this:

![XML formatting in the Android client](~/assets/images/cards/card-formatting-xml-android.jpg)

![XML formatting in the Android client](~/assets/images/cards/card-formatting-xml-android-v2.jpg)

Note that character formatting like bold and italic display correctly on Android.

These screenshots were created using Teams AppStudio, where the text property of a hero card was set to the following string. You can test formatting in your own cards by modifying this code.

`<p>bold: <strong>Bold Text</strong></p><p>italic: <em>Italic Text</em></p><p>strikethrough: <strike>Strikethrough text</strike></p><h1>Header 1</h1><h2>Header 2</h2><h3>Header 3</h3><p>bullet list: <ul><li>text</li><li>text</li></ul></p><p>ordered list: <ol><li>text</li><li>text</li></ol></p><pre>preformatted text</pre><blockquote>blockquote text</blockquote></p><p>hyperlink: <a href=\"https://www.bing.com/\">Bing</a></p><p>embedded image: <img src=\"http://aka.ms/Fo983c\" alt=\"Duck on a rock\"></img></p>`

## Formatting for Connector cards

## Formatting for Adaptive cards

Adaptive card offers inline markup for a subset of Markdown syntax. The supported styles are:

| Text Style      | Markdown |
|-----------------|-----|
| **Bold**        | ```**Bold**``` |
| _Italic_        | ```_Italic_``` |
| Bullet list     | ```- Item 1\r- Item 2\r- Item 3``` | 
| Numbered list   | ```1. Green\r2. Orange\r3. Blue``` |
| Hyperlinks      | ```[Title](url)``` |

The following markdown tags are not supported

* Headers
* Tables
* Images
* Anything not in the table above

### For more information

[Text features in Adaptive cards](https://docs.microsoft.com/en-us/adaptive-cards/create/textfeatures)
Note that the date and localization features mentioned in this topic are not supported in Teams.