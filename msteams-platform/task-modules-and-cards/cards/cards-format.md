---
title: Text formatting in cards
description: Describes card text formatting in Microsoft Teams
keywords: teams bots cards format
ms.date: 03/29/2018
---
# Format cards in Teams

You can add rich text formatting to your cards using either Markdown or HTML, depending on the card type.

Cards support formatting in the text property only, not in the title or subtitle properties. Formatting can be specified using a subset of XML (HTML) formatting, or Markdown depending on card type. For current and future development Adaptive cards using Markdown formatting is recommended.

Formatting support differs between different card types, and rendering of the card can differ slightly between the desktop and the mobile Teams clients, as well as Teams in the desktop browser.

You can include an inline image with any Teams card. Images an be formatted as  `.png`, `.jpg`, or `.gif` files and must not exceed 1024 ×1024 px or 1 MB. Animated GIF is not officially supported. *See* [Cards reference](./cards-reference.md#inline-card-images)

## Formatting cards with Markdown

There are two card types that support Markdown in Teams:

> [!div class="checklist"]
> * **Adaptive Cards**: Markdown is supported in Adaptive Card `Textblock` field, as well as `Fact.Title` and `Fact.Value`. HTML is not supported in adaptive cards.
> * **O365 Connector Cards**: Markdown and limited HTML is supported in Office 365 Connector cards in the text fields.

# [**Markdown formatting: Adaptive Cards**](#tab/adaptive-md)

 The supported styles for `Textblock`, `Fact.Title` and `Fact.Value` are:

| Style | Example | Markdown |
| --- | --- | --- |
| bold | **Bold** | ```**Bold**``` |
| italic | _Italic_ | ```_Italic_``` |
| unordered list | <ul><li>text</li><li>text</li></ul> | ```- Item 1\r- Item 2\r- Item 3``` |
| ordered list | <ol><li>text</li><li>text</li></ol> | ```1. Green\r2. Orange\r3. Blue``` |
| Hyperlinks |[Bing](https://www.bing.com/)| ```[Title](url)``` |

The following Markdown tags are not supported:

* Headers
* Tables
* Images
* Preformatted text
* Blockquotes

> [!IMPORTANT]
> Adaptive cards do not support HTML formatting.

### Newlines for Adaptive Cards

In lists you can use the `\r` or `\n` escape sequences for newlines. Using `\n\n` in a list will cause the next element in the list to be indented. If you need newlines elsewhere in the textblock, use `\n\n`.

### Mobile and desktop differences for Adaptive Cards

Formatting is slightly different between the desktop and the mobile versions of Teams.

On the desktop, Adaptive Card Markdown formatting appears like this in both web browsers and in the Teams client application:

![Adaptive Card Markdown formatting in the desktop client](../../assets/images/cards/Adaptive-markdown-desktop-client.png)

On iOS, Adaptive Card Markdown formatting appears like this:

![Adaptive Card Markdown formatting in iOS](../../assets/images/cards/Adaptive-markdown-iOS-75.png)

On Android, Adaptive Card Markdown formatting appears like this:

![Adaptive Card Markdown formatting in Android](../../assets/images/cards/Adaptive-markdown-Android.png)

### More information on Adaptive Cards

[Text features in Adaptive cards](/adaptive-cards/create/textfeatures)
The date and localization features mentioned in this topic are not supported in Teams.

### Formatting sample for Adaptive cards

``` json
{
    "$schema": "https://adaptivecards.io/schemas/adaptive-card.json",
    "type": "AdaptiveCard",
    "version": "1.0",
    "body": [
        {
            "type": "TextBlock",
            "text": "This is some **bold** text"
        },
        {
            "type": "TextBlock",
            "text": "This is some _italic_ text"
        },
        {
            "type": "TextBlock",
            "text": "- Bullet \r- List \r",
            "wrap": true
        },
        {
            "type": "TextBlock",
            "text": "1. Numbered\r2. List\r",
            "wrap": true
        },
        {
            "type": "TextBlock",
            "text": "Check out [Adaptive Cards](https://adaptivecards.io)"
        }
    ]
}
```

### Mention support within Adaptive cards v1.2

Card based mentions are supported in Web, Desktop and mobile clients. You can add @ mentions within an adaptive card body for bots and messaging extension responses.  To add @ mentions in cards, follow the same notification logic and rendering as that of message based [mentions in channel and group chat conversations](../../bots/how-to/conversations/channel-and-group-conversations.md#working-with-mentions ).

Bots and messaging extensions can include mentions within the card content in [TextBlock](https://adaptivecards.io/explorer/TextBlock.html) and [FactSet](https://adaptivecards.io/explorer/FactSet.html) elements.

> [!NOTE]
> * [Media elements](https://adaptivecards.io/explorer/Media.html) are currently not supported in Adaptive cards v1.2 on the Teams platform.
> * Channel & Team mentions are not supported in bot messages.

#### Constructing mentions

To include a mention in an Adaptive Card your app needs to include the following elements

* `<at>username</at>` in the supported adaptive card elements
* The `mention` object inside of an `msteams` property in the card content, which includes the Teams user id of the user being mentioned

#### Sample Adaptive card with a mention

``` json
{
  "contentType": "application/vnd.microsoft.card.adaptive",
  "content": {
    "type": "AdaptiveCard",
    "body": [
      {
        "type": "TextBlock",
        "text": "Hi <at>John Doe</at>"
      }
    ],
    "$schema": "https://adaptivecards.io/schemas/adaptive-card.json",
    "version": "1.0",
    "msteams": {
      "entities": [
        {
          "type": "mention",
          "text": "<at>John Doe</at>",
          "mentioned": {
            "id": "29:123124124124",
            "name": "John Doe"
          }
        }
      ]
    }
  }
}
```

### Full width Adaptive Cards
You can use this proprety to expand the width of an adaptive card and make use of addtional canvas space (see example below).

#### Constructing full width cards
To make a full width Adaptive Card your app needs to include the following elements

* The `width` object inside of an `msteams` property in the card content should be set to `Full`

#### Sample adaptive card with full width

``` json
{
    "type": "AdaptiveCard",
    "body": [{
        "type": "Container",
        "items": [{
            "type": "TextBlock",
            "text": "Digest card",
            "size": "Large",
            "weight": "Bolder"
        }]
    }],
    
    "msteams": {
        "width": "Full"
    },
    "$schema": "http://adaptivecards.io/schemas/adaptive-card.json",
    "version": "1.2"
}
```

# [**Markdown formatting: O365 Connector Cards**](#tab/connector-md)

Connector cards support limited Markdown and HTML formatting. HTML support is described in the last section.

| Style | Example | Markdown |
| --- | --- | --- |
| bold | **text** | `**text**` |
| italic | *text* | `*text*` |
| header (levels 1&ndash;3) | **Text** | `### Text`|
| strikethrough | ~~text~~ | `~~text~~` |
| unordered list | <ul><li>text</li><li>text</li></ul> | ```- Item 1\r- Item 2\r- Item 3``` |
| ordered list | <ol><li>text</li><li>text</li></ol> | ```1. Green\r2. Orange\r3. Blue``` |
| preformatted text | `text` | ``preformatted text`` |
| blockquote | >blockquote text | `>blockquote text` |
| hyperlink | [Bing](https://www.bing.com/) | `[Bing](https://www.bing.com/)` |
| image link |![Duck on a rock](https://aka.ms/Fo983c) | `![Duck](https://aka.ms/Fo983c)` |

In connector cards, newlines are rendered for `\n\n`, but not for `\n` or `\r`.

### Mobile and desktop differences for connector cards using Markdown

On the desktop, Markdown formatting for connector cards looks like this:

![Markdown formatting for connector cards in the Desktop client](../../assets/images/cards/connector-desktop-markdown-combined.png)

On iOS, Markdown formatting for connector cards looks like this:

![Markdown formatting for connector cards in the iOS client](../../assets/images/cards/connector-iphone-markdown-combined-80.png)

Issues:

* The iOS client for Teams does not render Markdown or HTML inline images in Connector Cards.
* Blockquotes are rendered as indented but without a gray background.

On Android, Markdown formatting for connector cards looks like this:

![Markdown formatting for connector cards in the Android client](../../assets/images/cards/connector-android-markdown-combined.png)

### Formatting example for Markdown Connector Cards

``` json
{
  "contentType": "application/vnd.microsoft.teams.card.o365connector",
  "content": {
    "@type": "MessageCard",
    "@context": "https://schema.org/extensions",
    "summary": "Summary",
    "title": "Connector Card Markdown formatting",
    "sections": [
        {
            "text": "This is some **bold** text"
        },
        {
            "text": "This is some _italic_ text"
        },
        {
            "text": "# Header 1\r## Header 2\r### Header 3"
        },
        {
            "text": "- Bullet \r- List \r"
        },
        {
            "text": "1. Numbered\r1. List \r"
        },
        {
            "text": "Link: [Bing](https://www.bing.com)"
        },
        {
            "text": "embedded image link: ![Duck on a rock](https://aka.ms/Fo983c)"
        },
        {
            "text": "`preformatted text`"
        },
        {
            "text": "Newlines (backslash n, backslash n):\n\nline a\n\nline b\n\nline c"
        },
        {
            "text": ">This is a blockquote"
        }
     ]
  }
}

```

---

## Formatting cards with HTML

# [**HTML formatting: O365 Connector Cards**](#tab/connector-html)

Connector cards support limited Markdown and HTML formatting. Markdown is described in the next section.

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
| image link | <img src="https://aka.ms/Fo983c" alt="Duck on a rock"></img> | `<img src="https://aka.ms/Fo983c" alt="Duck on a rock"></img>` |

In connector cards, newlines are rendered in HTML using the `<p>` tag.

### Mobile and desktop differences for connector cards using HTML

On the desktop, HTML formatting for connector cards looks like this:

![HTML formatting for connector cards in the Desktop client](../../assets/images/cards/Connector-desktop-html-combined.png)

On iOS, HTML formatting looks like this:

![HTML formatting for connector cards  in the iOS client](../../assets/images/cards/connector-iphone-html-combined-80.png)

Issues:

* Inline images are not rendered on iOS using either Markdown or HTML in Connector Cards.
* Preformatted text is rendered but does not have a gray background.

On Android, HTML formatting looks like this:

![HTML formatting for connector cards in the Android client](../../assets/images/cards/connector-android-html-combined.png)

### Formatting sample for HTML Connector Cards

``` json
{
  "contentType": "application/vnd.microsoft.teams.card.o365connector",
  "content": {
    "@type": "MessageCard",
    "@context": "https://schema.org/extensions",
    "summary": "Summary",
    "title": "Connector Card HTML formatting",
    "sections": [
        {
            "text": "This is some <strong>bold</strong> text"
        },
        {
            "text": "This is some <em>italic</em> text"
        },
        {
            "text": "This is some <strike>strikethrough</strike> text"
        },
        {
            "text": "<h1>Header 1</h1>\r<h2>Header 2</h2>\r <h3>Header 3</h3>"
        },
        {
            "text": "bullet list <ul><li>text</li><li>text</li></ul>"
        },
        {
            "text": "ordered list <ol><li>text</li><li>text</li></ol>"
        },
        {
            "text": "hyperlink <a href=\"https://www.bing.com/\">Bing</a>"
        },
        {
            "text": "embedded image <img src=\"https://aka.ms/Fo983c\" alt=\"Duck on a rock\"></img>"
        },
        {
            "text": "preformatted text <pre>text</pre>"
        },
        {
            "text": "Paragraphs <p>Line a</p><p>Line b</p>"
        },
        {
            "text": "<blockquote>Blockquote text</blockquote>"
        }
     ]
  }
}

```

# [**HTML Formatting: hero and thumbnail cards**](#tab/simple-html)

HTML tags are supported for simple cards such as the hero and thumbnail card. Markdown is not supported.

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
| image link |<img src="https://aka.ms/Fo983c" alt="Duck on a rock"></img>| `<img src="https://aka.ms/Fo983c" alt="Duck on a rock"></img>` |

### Mobile and desktop differences for simple cards

Because of resolution differences between the desktop and mobile platform, formatting is different between the desktop and the mobile version of Teams.

On the desktop, HTML formatting appears like this:

![HTML formatting in the Desktop client](../../assets/images/cards/card-formatting-xml-desktop-v2.png)

On iOS, HTML formatting appears like this:

![HTML formatting in the iOS client](../../assets/images/cards/card-formatting-xml-mobile-v2.png)

Issues:

* Character formatting like bold and italic are not rendered on iOS.

On Android, HTML formatting appears like this:

![HTML formatting in the Android client](../../assets/images/cards/card-formatting-xml-android-60.png)

Character formatting like bold and italic display correctly on Android.

### Formatting sample for HTML formatting in simple cards

These screenshots were created using Teams AppStudio, where the text property of a hero card was set to the following string. You can test formatting in your own cards by modifying this code.

`<p>bold: <strong>Bold Text</strong></p><p>italic: <em>Italic Text</em></p><p>strikethrough: <strike>Strikethrough text</strike></p><h1>Header 1</h1><h2>Header 2</h2><h3>Header 3</h3><p>bullet list: <ul><li>text</li><li>text</li></ul></p><p>ordered list: <ol><li>text</li><li>text</li></ol></p><pre>preformatted text</pre><blockquote>blockquote text</blockquote></p><p>hyperlink: <a href=\"https://www.bing.com/\">Bing</a></p><p>embedded image: <img src=\"https://aka.ms/Fo983c\" alt=\"Duck on a rock\"></img></p>`

---
