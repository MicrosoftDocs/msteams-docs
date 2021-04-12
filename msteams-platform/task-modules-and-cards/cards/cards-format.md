---
title: Text formatting in cards
description: Describes card text formatting in Microsoft Teams
keywords: teams bots cards format
ms.date: 03/29/2018
ms.topic: conceptual
---

# Format cards in Microsoft Teams

You can add rich text formatting to your cards using either Markdown or HTML, depending on the card type.

Cards support formatting in the text property only, not in the title or subtitle properties. Formatting can be specified using a subset of XML or HTML formatting, or Markdown, depending on the card type. For current and future development of Adaptive Cards, using Markdown formatting is recommended.

Formatting support differs between different card types. Rendering of the card can differ slightly between the desktop and the mobile Microsoft Teams clients, as well as Teams in the desktop browser.

You can include an inline image with any Teams card. Images an be formatted as  `.png`, `.jpg`, or `.gif` files and must not exceed 1024 ×1024 px or 1 MB. Animated GIF is not supported. For more information, see [cards reference](./cards-reference.md#inline-card-images).

You can format Adaptive Cards and O365 connector cards with Markdown that include certain supported styles.

## Format cards with Markdown

There are two card types that support Markdown in Teams:

> [!div class="checklist"]
> * Adaptive Cards: Markdown is supported in Adaptive Card `Textblock` field, as well as `Fact.Title` and `Fact.Value`. HTML is not supported in Adaptive Cards.
> * O365 connector cards: Markdown and limited HTML is supported in Office 365 connector cards in the text fields.

# [Markdown formatting for Adaptive Cards](#tab/adaptive-md)

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

### Newlines for Adaptive Cards

In lists you can use the `\r` or `\n` escape sequences for newlines. Using `\n\n` in a list causes the next element in the list to be indented. If you require newlines elsewhere in the TextBlock, use `\n\n`.

### Mobile and desktop differences for Adaptive Cards

Formatting is different between the desktop and the mobile versions of Teams.

On the desktop, Adaptive Card Markdown formatting appears as shown in the following image in both web browsers and in the Teams client application:

![Adaptive Card Markdown formatting in the desktop client](../../assets/images/cards/Adaptive-markdown-desktop-client.png)

On iOS, Adaptive Card Markdown formatting appears as shown in the following image:

![Adaptive Card Markdown formatting in iOS](../../assets/images/cards/Adaptive-markdown-iOS-75.png)

On Android, Adaptive Card Markdown formatting appears as shown in the following image:

![Adaptive Card Markdown formatting in Android](../../assets/images/cards/Adaptive-markdown-Android.png)

For more information, see [text features in Adaptive Cards](/adaptive-cards/create/textfeatures).

The date and localization features mentioned in this section are not supported in Teams.

### Adaptive Cards formatting sample

The following code shows an example of Adaptive Cards formatting:

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

### Mention support within Adaptive Cards v1.2

Card based mentions are supported in web, desktop and mobile clients. You can add @ mentions within an Adaptive Card body for bots and messaging extension responses. To add @ mentions in cards, follow the same notification logic and rendering as that of message based [mentions in channel and group chat conversations](../../bots/how-to/conversations/channel-and-group-conversations.md#working-with-mentions ).

Bots and messaging extensions can include mentions within the card content in [TextBlock](https://adaptivecards.io/explorer/TextBlock.html) and [FactSet](https://adaptivecards.io/explorer/FactSet.html) elements.

> [!NOTE]
> * [Media elements](https://adaptivecards.io/explorer/Media.html) are currently not supported in Adaptive Cards v1.2 on the Teams platform.
> * Channel and team mentions are not supported in bot messages.

To include a mention in an Adaptive Card, your app needs to include the following elements:

* `<at>username</at>` in the supported Adaptive Card elements.
* The `mention` object inside of an `msteams` property in the card content, which includes the Teams user ID of the user being mentioned.

#### Sample Adaptive Card with a mention

The following code shows an example of Adaptive Card with a mention:

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

### Information masking in Adaptive Cards

Use the information masking property to mask specific information, such as password or sensitive information from users within the Adaptive Card [`Input.Text`](https://adaptivecards.io/explorer/Input.Text.html) input element.

> [!NOTE]
> * The feature only supports client side information masking, the masked input text is sent as clear text to the HTTPS endpoint address that was specified during [bot configuration](../../build-your-first-app/build-bot.md#4-configure-your-bot).
> * The information masking property is currently available only in developer preview.

To mask information in Adaptive Cards, add the `isMasked` property to **type** `Input.Text`, and set its value to **true**.

#### Sample Adaptive Card with masking property

The following code shows an example of Adaptive Card with masking property:

```json
{
    "type": "Input.Text",
    "id": "secretThing",
    "style": "password",
    "isMasked": true
  },
```

The following image is an example of masking information in Adaptive Cards:

![Masking information image](../../assets/images/cards/masking-information-view.png)

### Full width Adaptive Card

You can use the `msteams` property to expand the width of an Adaptive Card and make use of additional canvas space. The next section provides information on how to use the property.

#### Constructing full width cards

To make a full width Adaptive Card the `width` object in `msteams` property in the card content must be set to `Full`.

#### Sample Adaptive Card with full width

Your app must include the elements from the following code sample:

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

The following image shows a full width Adaptive Card:
![Full width Adaptive Card view](../../assets/images/cards/full-width-adaptive-card.png)

The following image shows the default view of the Adaptive Card when you have not set the `width` property to **Full**:
![Small width Adaptive Card view](../../assets/images/cards/small-width-adaptive-card.png)

### Typeahead support

Within the [`Input.Choiceset`](https://adaptivecards.io/explorer/Input.ChoiceSet.html) schema element, asking users to filter through and select through a sizable number of choices can significantly slow down task completion. Typeahead support within Adaptive Cards can simplify input selection by narrowing or filtering the set of input choices as the user types the input.

To enable typeahead within the `Input.Choiceset`, set `style` to `filtered` and ensure `isMultiSelect` is set to `false`.

#### Sample Adaptive Card with typeahead support

The following code shows an example of Adaptive Card with typeahead support:

``` json
{
   "type": "Input.ChoiceSet",
   "label": "Select a user",
   "isMultiSelect": false,
   "choices":  [
      { "title": "User 1", "value": "User1" },
      { "title": "User 2", "value": "User2" }
    ],
   "style": "filtered"
}
```

### Stage view for images in Adaptive Cards

> [!NOTE]
> This feature is currently available only in developer preview.

In an Adaptive Card, you can use the `msteams` property to add the ability to display images in stage view selectively. When users hover over the images, they can see an expand icon, for which the `allowExpand` attribute is set to `true`. For information on how to use the property, see the following code example:

``` json
{
    "type": "AdaptiveCard",
     "body": [
          {
            "type": "Image",
            "url": "https://picsum.photos/200/200?image=110",
            "msTeams": {
              "allowExpand": true
            }
          },
     ],
    "$schema": "http://adaptivecards.io/schemas/adaptive-card.json",
    "version": "1.2"
}
```

When users hover over the image, an expand icon appears at the top right corner as shown in the following image:

![Adaptive Card with expandable image](../../assets/images/cards/adaptivecard-hover-expand-icon.png)

The image appears in stage view when the user selects the expand button as shown in the following image:

![Image expanded to stage view](../../assets/images/cards/adaptivecard-expand-image.png)

In the stage view, users can zoom in and zoom out of the image. You can select which images in your Adaptive Card need to have this capability.

> [!NOTE]
> * Zoom in and zoom out capability applies only to the image elements that is image type in an Adaptive Card.
> * For Teams mobile apps, stage view functionality for images in Adaptive Cards are available by default. Users can view Adaptive Card images in stage view by simply tapping on the image, irrespective of whether the `allowExpand` attribute is present or not.

# [Markdown formatting for O365 connector cards](#tab/connector-md)

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

On the desktop, Markdown formatting for connector cards appears as shown in the following image:

![Markdown formatting for connector cards in the Desktop client](../../assets/images/cards/connector-desktop-markdown-combined.png)

On iOS, Markdown formatting for connector cards appears as shown in the following image:

![Markdown formatting for connector cards in the iOS client](../../assets/images/cards/connector-iphone-markdown-combined-80.png)

Connector cards using Markdown for iOS include the following issues:

* The iOS client for Teams does not render Markdown or HTML inline images in connector cards.
* Blockquotes are rendered as indented but without a gray background.

On Android, Markdown formatting for connector cards appears as shown in the following image:

![Markdown formatting for connector cards in the Android client](../../assets/images/cards/connector-android-markdown-combined.png)

### Formatting example for Markdown connector cards

The following code shows an example of formatting for Markdown connector cards:

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

# [HTML formatting for O365 connector cards](#tab/connector-html)

Connector cards support limited Markdown and HTML formatting.

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

On the desktop, HTML formatting for connector cards appears as shown in the following image:

![HTML formatting for connector cards in the desktop client](../../assets/images/cards/Connector-desktop-html-combined.png)

On iOS, HTML formatting appears as shown in the following image:

![HTML formatting for connector cards in the iOS client](../../assets/images/cards/connector-iphone-html-combined-80.png)

Connector cards using HTML for iOS include the following issues:

* Inline images are not rendered on iOS using either Markdown or HTML in connector cards.
* Preformatted text is rendered but does not have a gray background.

On Android, HTML formatting appears as shown in the following image:

![HTML formatting for connector cards in the Android client](../../assets/images/cards/connector-android-html-combined.png)

### Formatting sample for HTML connector cards

The following code shows an example of formatting for HTML connector cards:

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

# [HTML formatting for hero and thumbnail cards](#tab/simple-html)

HTML tags are supported for simple cards, such as the hero and thumbnail cards. Markdown is not supported.

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

On the desktop, HTML formatting appears as shown in the following image:

![HTML formatting in the Desktop client](../../assets/images/cards/card-formatting-xml-desktop-v2.png)

On iOS, HTML formatting appears as shown in the following image:

![HTML formatting in the iOS client](../../assets/images/cards/card-formatting-xml-mobile-v2.png)

Character formatting, such as bold and italic are not rendered on iOS.

On Android, HTML formatting appears as shown in the following image:

![HTML formatting in the Android client](../../assets/images/cards/card-formatting-xml-android-60.png)

Character formatting, such as bold and italic display correctly on Android.

### Format sample for HTML formatting in simple cards

The images in the previous section were created using Teams AppStudio, where the text property of a hero card is set to the following string:

`<p>bold: <strong>Bold Text</strong></p><p>italic: <em>Italic Text</em></p><p>strikethrough: <strike>Strikethrough text</strike></p><h1>Header 1</h1><h2>Header 2</h2><h3>Header 3</h3><p>bullet list: <ul><li>text</li><li>text</li></ul></p><p>ordered list: <ol><li>text</li><li>text</li></ol></p><pre>preformatted text</pre><blockquote>blockquote text</blockquote></p><p>hyperlink: <a href=\"https://www.bing.com/\">Bing</a></p><p>embedded image: <img src=\"https://aka.ms/Fo983c\" alt=\"Duck on a rock\"></img></p>`

You can test formatting in your own cards by modifying this code.

---

## Next step

> [!div class="nextstepaction"]
> [Card actions](./cards-actions.md)