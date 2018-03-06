---
title: Cards
description: Describes all the cards available to bots in Teams
keywords: bots cards reference
ms.date: 03/06/18
---
# Cards Reference

The cards listed in this section are supported in Bots for Teams. These cards are based on cards defined by the bot framework, but Teams does not support all the cards provided by bot framework and has added additional cards.

# Card examples

You can find information on how to use cards in the documentation for the Bot Builder SDK. Code samples are in the Microsoft/BotBuilder-Samples repository on GitHub.
* .NET
  * [Add rich card attachments to messages](https://docs.microsoft.com/en-us/bot-framework/dotnet/bot-builder-dotnet-add-rich-card-attachments)
  * [Rich cards sample code](https://github.com/Microsoft/BotBuilder-Samples/tree/master/CSharp/cards-RichCards)
* Node.js
  * [Add rich card attachments to messages](https://docs.microsoft.com/en-us/bot-framework/nodejs/bot-builder-nodejs-send-rich-cards)
  * [Rich cards sample code](https://github.com/Microsoft/BotBuilder-Samples/tree/master/Node/cards-RichCards)

## Common properties for all cards

### Inline card images

Your card can contain a inline image by including a link to the image content hosted on a public content-delivery network (CDN).

Images are scaled up or down in size while maintaining the aspect ratio to cover the image area, and then cropped from center to achieve the appropriate aspect ratio for the card.

Images must be at most 1024×1024 and 1 MB in PNG, JPEG, or GIF format; animated GIF is not officially supported.

| Property | Type  | Description |
| --- | --- | --- |
| url | URL | HTTPS URL to the image |
| alt | String | Accessible description of the image |

### Buttons

Buttons are shown stacked at the bottom of the card. Button text is always on a single line and will be truncated if the text exceeds the button width. Any additional buttons beyond the maximum number supported by the card will not be shown.

### Card actions

TBD describe

See the topic [Card Actions](`/concepts/cards-actions) for more information.

## Cards

### Adaptive Card

Not supported in Teams.

A customizable card that can contain any combination of text, speech, images, buttons, and input fields.
`https://docs.microsoft.com/en-us/adaptive-cards/get-started/bots`

### Animation Card

Not supported in Teams.

A card that can play animated GIFs or short videos.
`https://docs.botframework.com/en-us/node/builder/chat-reference/classes/_botbuilder_d_.animationcard.html`

### Audio Card

Not supported in Teams.
A card that can play an audio file.
`https://docs.botframework.com/en-us/node/builder/chat-reference/classes/_botbuilder_d_.audiocard.html`

### Hero Card

A card that typically contains a single large image, one or more buttons, and text.
`https://docs.botframework.com/en-us/node/builder/chat-reference/classes/_botbuilder_d_.herocard.html`

## Hero card

The [hero card](https://docs.botframework.com/en-us/csharp/builder/sdkreference/attachments.html#herocard) renders a title, subtitle, text, large image, and buttons.

![Example of a hero card](~/assets/images/cards/hero.png)

| Property | Type  | Description |
| --- | --- | --- |
| title | Rich text | Title of the card. Maximum 2 lines; formatting not currently supported |
| subtitle | Rich text | Subtitle of the card. Maximum 2 lines; formatting not currently supported |
| text | Rich text | Text appears just below the subtitle; see [Message format](~/concepts/bots/bots-conversations#message-format) for formatting options |
| images | Array of images | Image displayed at top of card. Aspect ratio 16:9 |
| buttons | Array of action objects | Set of actions applicable to the current card. Maximum 6 |
| tap | Action object | This action will be activated when the user taps on the card itself |

### Office 365 Card

Supported in teams, not in bot framework.
The Office 365 Connector card provides a more flexible layout with multiple sections, images, and fields.

TBD - fill out the following with correct values

| Property | Type  | Description |
| --- | --- | --- |
| title | Rich text | Title of the card. Maximum 2 lines; formatting not currently supported |
| subtitle | Rich text | Subtitle of the card. Maximum 2 lines; formatting not currently supported |
| text | Rich text | Text appears just below the subtitle; see [Message format](~/concepts/bots/bots-conversations#message-format) for formatting options |
| images | Array of images | Image displayed at top of card. Aspect ratio 16:9 |
| buttons | Array of action objects | Set of actions applicable to the current card. Maximum 6 |
| tap | Action object | This action will be activated when the user taps on the card itself |

Most of the information you need about Connector cards is in [Using Office 365 Connector cards in Microsoft Teams](~/concepts/connectors#using-office-365-connector-cards-in-microsoft-teams), including details on actionable messages.

Office 365 Connector cards function properly on Microsoft Teams including [ActionCard actions](https://docs.microsoft.com/en-us/outlook/actionable-messages/card-reference#actioncard-action)).

One important difference between using Connector cards from a Connector and using Connector cards in your bot is the handling of card actions

* For a Connector, the endpoint receives the card payload via HTTP POST.
* For a bot, the `HttpPOST` action triggers an `invoke` action that sends only the action ID and body to the bot.

To use Connector cards in your bot, we recommend using the `O365ConnectorCard` class in the [Teams extensions for the Bot Builder SDK](~/get-started/code#microsoft-teams-extensions-for-the-bot-builder-sdk) for .NET or Node.js. You can simplify handling of the `HttpPOST` action by using the `onO365ConnectorCardAction` method.

### Receipt Card

Not supported in Teams.
A card that enables a bot to provide a receipt to the user. It typically contains the list of items to include on the receipt, tax and total information, and other text.
`https://docs.botframework.com/en-us/node/builder/chat-reference/classes/_botbuilder_d_.receiptcard.html` 

### SignIn Card

A card that enables a bot to request that a user sign-in. It typically contains text and one or more buttons that the user can click to initiate the sign-in process.
`https://docs.botframework.com/en-us/node/builder/chat-reference/classes/_botbuilder_d_.signincard.html`

### Thumbnail Card

A card that typically contains a single thumbnail image, one or more buttons, and text.
`https://docs.botframework.com/en-us/node/builder/chat-reference/classes/_botbuilder_d_.thumbnailcard.html`

The [thumbnail card](https://docs.botframework.com/en-us/csharp/builder/sdkreference/attachments.html#thumbnailcard) renders a title, subtitle, text, small thumbmail image, and buttons.

![Example of a thumbnail card](~/assets/images/cards/thumbnail.png)

| Property | Type  | Description |
| --- | --- | --- |
| title | Rich text | Title of the card. Maximum 2 lines; formatting not currently supported |
| subtitle | Rich text | Subtitle of the card. Maximum 2 lines; formatting not currently supported |
| text | Rich text | Text appears just below the subtitle; see [Message format](~/concepts/bots/bots-conversations#message-format) for formatting options |
| images | Array of images | Image displayed at top of card. Aspect ratio 1:1 (square) |
| buttons | Array of action objects | Set of actions applicable to the current card. Maximum 6 |
| tap | Action object | This action will be activated when the user taps on the card itself |

### Video Card

Not supported in Teams.
A card that can play videos.
`https://docs.botframework.com/en-us/node/builder/chat-reference/classes/_botbuilder_d_.videocard.html`

## Card collections

Card collections are provided by the Bot Framework: `builder.AttachmentLayout.carousel` and `builder.AttachmentLayout.list`.  These collections can only contain Hero or Thumbnail cards.

### Carousel collection

`builder.AttachmentLayout.carousel`
The [carousel layout](https://docs.microsoft.com/en-us/bot-framework/dotnet/bot-builder-dotnet-add-rich-card-attachments) shows a carousel of cards, optionally with associated action buttons.

> [!NOTE]
> A carousel can display a maximum of 10 cards per message.

![Example of a carousel of cards](~/assets/images/cards/carousel.png)

Properties are the same as for the hero or thumbnail card.

### List collection

`builder.AttachmentLayout.list`
The list layout shows a vertically stacked list of cards, optionally with associated action buttons..

> [!NOTE]
> A list can display a maximum of 10 cards per message.

![Example of a list of cards](~/assets/images/cards/list.png)

Properties are the same as for the hero or thumbnail card.

> [!NOTE]
> Some combinations of list cards are not yet supported on iOS and Android.

## Card Actions

TBD
