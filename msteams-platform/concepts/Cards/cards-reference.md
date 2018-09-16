---
title: Cards Reference
description: Describes all the cards and card actions available to bots in Teams
keywords: bots cards reference
ms.date: 09/07/2018
---
# Cards Reference

The cards listed in this section are supported in bots for Teams. These cards are based on cards defined by the Bot Framework, but Teams does not support all Bot Framework cards and has added some of its own. Differences are called out in the references below.

## Card examples

You can find information on how to use cards in the documentation for the Bot Builder SDK. Code samples are in the Microsoft/BotBuilder-Samples repository on GitHub.

* .NET
  * [Add cards as attachments to messages](https://docs.microsoft.com/en-us/bot-framework/dotnet/bot-builder-dotnet-add-rich-card-attachments)
  * [Cards sample code](https://github.com/Microsoft/BotBuilder-Samples/tree/master/CSharp/cards-RichCards)
* Node.js
  * [Add cards as attachments to messages](https://docs.microsoft.com/en-us/bot-framework/nodejs/bot-builder-nodejs-send-rich-cards)
  * [Cards sample code](https://github.com/Microsoft/BotBuilder-Samples/tree/master/Node/cards-RichCards)

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

See the topic [Card Actions](~/concepts/cards/cards-actions) for more information.

### Card Formatting

See the topic [Card Formatting](~/concepts/cards/cards-format) for more information on text formatting in cards.



## Adaptive card

A customizable card that can contain any combination of text, speech, images, buttons, and input fields.

### Support

| Bots in Teams | Messaging Extensions  | Connectors | Bot Framework |
| --- | --- | --- | --- |
| ✔ | ✔ | ✖ | ✔ |
|

### Example

![Example of a adaptive card card](~/assets/images/cards/adaptivecard.png)

#### For more information

* [Adaptive Cards Overview](https://docs.microsoft.com/en-us/adaptive-cards/)
* [Adaptive card actions in Teams](~/concepts/cards/cards-actions#adaptive-card-actions)

### Example

```json
{
  "contentType": "application/vnd.microsoft.card.adaptive",
  "content": {
    "$schema": "http://adaptivecards.io/schemas/adaptive-card.json",
    "type": "AdaptiveCard",
    "version": "1.0",
    "body": [
      {
        "type": "Container",
        "items": [
          {
            "type": "TextBlock",
            "text": "Publish Adaptive Card schema",
            "weight": "bolder",
            "size": "medium"
          },
          {
            "type": "ColumnSet",
            "columns": [
              {
                "type": "Column",
                "width": "auto",
                "items": [
                  {
                    "type": "Image",
                    "url": "https://pbs.twimg.com/profile_images/3647943215/d7f12830b3c17a5a9e4afcc370e3a37e_400x400.jpeg",
                    "size": "small",
                    "style": "person"
                  }
                ]
              },
              {
                "type": "Column",
                "width": "stretch",
                "items": [
                  {
                    "type": "TextBlock",
                    "text": "Matt Hidinger",
                    "weight": "bolder",
                    "wrap": true
                  },
                  {
                    "type": "TextBlock",
                    "spacing": "none",
                    "text": "Created {{DATE(2017-02-14T06:08:39Z, SHORT)}}",
                    "isSubtle": true,
                    "wrap": true
                  }
                ]
              }
            ]
          }
        ]
      },
      {
        "type": "Container",
        "items": [
          {
            "type": "TextBlock",
            "text": "Now that we have defined the main rules and features of the format, we need to produce a schema and publish it to GitHub. The schema will be the starting point of our reference documentation.",
            "wrap": true
          },
          {
            "type": "FactSet",
            "facts": [
              {
                "title": "Board:",
                "value": "Adaptive Card"
              },
              {
                "title": "List:",
                "value": "Backlog"
              },
              {
                "title": "Assigned to:",
                "value": "Matt Hidinger"
              },
              {
                "title": "Due date:",
                "value": "Not set"
              }
            ]
          }
        ]
      }
    ],
    "actions": [
      {
        "type": "Action.ShowCard",
        "title": "Set due date",
        "card": {
          "type": "AdaptiveCard",
          "body": [
            {
              "type": "Input.Date",
              "id": "dueDate"
            }
          ],
          "actions": [
            {
              "type": "Action.Submit",
              "title": "OK"
            }
          ]
        }
      },
      {
        "type": "Action.ShowCard",
        "title": "Comment",
        "card": {
          "type": "AdaptiveCard",
          "body": [
            {
              "type": "Input.Text",
              "id": "comment",
              "isMultiline": true,
              "placeholder": "Enter your comment"
            }
          ],
          "actions": [
            {
              "type": "Action.Submit",
              "title": "OK"
            }
          ]
        }
      }
    ]
  }  
}
```

## Hero card

A card that typically contains a single large image, one or more buttons, and text.

### Support

| Bots in Teams | Messaging Extensions  | Connectors | Bot Framework |
| --- | --- | --- | --- |
| ✔ | ✔ | ✖ | ✔ |
|

### Example

![Example of a hero card](~/assets/images/cards/hero.png)

### Properties

| Property | Type  | Description |
| --- | --- | --- |
| title | Rich text | Title of the card. Maximum 2 lines; formatting not currently supported |
| subtitle | Rich text | Subtitle of the card. Maximum 2 lines; formatting not currently supported |
| text | Rich text | Text appears just below the subtitle; see [Card formatting](~/concepts/cards/cards-format) for formatting options |
| images | Array of images | Image displayed at top of card. Aspect ratio 16:9 |
| buttons | Array of action objects | Set of actions applicable to the current card. Maximum 6 |
| tap | Action object | This action will be activated when the user taps on the card itself |
|

### Example

```json
{
   "contentType": "application/vnd.microsoft.card.hero",
   "content": {
     "title": "Seattle Center Monorail",
     "subtitle": "Seattle Center Monorail",
     "text": "The Seattle Center Monorail is an elevated train line between Seattle Center (near the Space Needle) and downtown Seattle. It was built for the 1962 World's Fair. Its original two trains, completed in 1961, are still in service.",
     "images": [
       {
         "url":"https://upload.wikimedia.org/wikipedia/commons/thumb/4/49/Seattle_monorail01_2008-02-25.jpg/1024px-Seattle_monorail01_2008-02-25.jpg"
       }
     ],
    "buttons": [
      {
         "type": "openUrl",
         "title": "Official website",
         "value": "https://www.seattlemonorail.com"
       },
      {
        "type": "openUrl",
        "title": "Wikipeda page",
        "value": "https://en.wikipedia.org/wiki/Seattle_Center_Monorail"
       }
     ]
   }
}

```

### For more information

Bot Framework reference:

* [Hero card Node](https://docs.botframework.com/en-us/node/builder/chat-reference/classes/_botbuilder_d_.herocard.html)
* [Hero card C#](https://docs.botframework.com/en-us/csharp/builder/sdkreference/attachments.html#herocard)

## List card

The list card has been added by Teams to provide functions beyond what the list collection can provide. The list card provides a scrolling list of items.

### Support

| Bots in Teams | Messaging Extensions  | Connectors | Bot Framework |
| --- | --- | --- | --- |
| ✔ | ✖ | ✖ |✖ |
|

### Properties

| Property | Type  | Description |
| --- | --- | --- |
| title | Rich text | Title of the card. Maximum 2 lines; formatting not currently supported |
| items | Array of list items  ||
| buttons | Array of action objects | Set of actions applicable to the current card. Maximum 6. Does not render on mobile. |
|

### Example

```json
{
  "contentType": "application/vnd.microsoft.teams.card.list",
  "content": {
    "title": "Card title",
    "items": [
      {
        "type": "file",
        "id": "https://contoso.sharepoint.com/teams/new/Shared%20Documents/Report.xslx",
        "title": "Report",
        "subtitle": "teams > new > design",
        "tap": {
          "type": "imBack",
          "value": "editOnline https://contoso.sharepoint.com/teams/new/Shared%20Documents/Report.xlsx"
        }
      },
      {
        "type": "resultItem",
        "icon": "https://cdn2.iconfinder.com/data/icons/social-icons-33/128/Trello-128.png",
        "title": "Trello title",
        "subtitle": "A Trello subtitle",
        "tap": {
          "type": "openUrl",
          "value": "http://trello.com"
        }
      },
      {
        "type": "section",
        "title": "Manager"
      },
      {
        "type": "person",
        "id": "JohnDoe@contoso.com",
        "title": "John Doe",
        "subtitle": "Manager",
        "tap": {
          "type": "imBack",
          "value": "whois JohnDoe@contoso.com"
        }
      }
    ],
    "buttons": [
      {
        "type": "imBack",
        "title": "Select",
        "value": "whois"
      }
    ]
  }
}
```

## Office 365 connector card

Supported in Teams, not in Bot Framework.

The Office 365 Connector card provides a flexible layout with multiple sections, fields, images, and actions. This card encapsulates a connector card so that it can be used by bots. See the notes section for differences between connector cards and the O365 card.

### Support

| Bots in Teams | Messaging Extensions  | Connectors | Bot Framework |
| --- | --- | --- | --- |
| ✔ | ✔ | ✔ | ✖ |
|

### Properties

| Property | Type  | Description |
| --- | --- | --- |
| title | Rich text | Title of the card. Maximum 2 lines; formatting not currently supported |
| summary | Rich text | Summary of the card. Maximum 2 lines; formatting not currently supported |
| text | Rich text | Text appears just below the subtitle; see [Card formatting](~/concepts/cards/cards-format) for formatting options |
| themeColor | HEX string | color that overrides the accentColor provided from the application manifest |

### Notes

Office 365 Connector cards function properly on Microsoft Teams including [ActionCard actions](https://docs.microsoft.com/en-us/outlook/actionable-messages/card-reference#actioncard-action).

One important difference between using Connector cards from a Connector and using Connector cards in your bot is the handling of card actions.

* For a Connector, the endpoint receives the card payload via HTTP POST.
* For a bot, the `HttpPOST` action triggers an `invoke` activity that sends only the action ID and body to the bot.

To use Connector cards in your bot, we recommend using the `O365ConnectorCard` class in the [Teams extensions for the Bot Builder SDK](~/get-started/code#microsoft-teams-extensions-for-the-bot-builder-sdk) for .NET or Node.js. You can simplify handling of the `HttpPOST` action by using the `onO365ConnectorCardAction` method.

Each Connector card can display a maximum of 10 sections; each section can contain a maximum of 5 images and 5 actions.

> [!NOTE]
> Any additional sections, images, or actions in a message do not appear.

All text fields support Markdown and HTML formatting. You can control which sections use Markdown or HTML by setting the `markdown` property in a message. By default, `markdown` is set to `true`; if you want to use HTML instead, set `markdown` to `false`.

If you specify the `themeColor` property, it overrides the `accentColor` property in the app manifest.

To specify the rendering style for `activityImage`, you can set `activityImageType` as follows.

| Value | Description |
| --- | --- |
| `avatar` | Default; `activityImage` will be cropped as a circle |
| `article` | `activityImage` will be displayed as a rectangle and retain its aspect ratio |

For all other details about Connector card properties, see the [Actionable message card reference](https://docs.microsoft.com/en-us/outlook/actionable-messages/card-reference). The only Connector card properties that Microsoft Teams does not currently support are as follows:

* `heroImage`
* `hideOriginalBody`
* `startGroup`

### Example

```json
{
  "contentType": "application/vnd.microsoft.teams.card.o365connector",
  "content": {
    "@type": "MessageCard",
    "@context": "http://schema.org/extensions",
    "summary": "John Doe commented on Trello",
    "title": "Project Tango",
    "sections": [
        {
            "activityTitle": "John Doe commented",
            "activitySubtitle": "On Project Tango",
            "activityText": "\"Here are the designs\"",
            "activityImage": "http://connectorsdemo.azurewebsites.net/images/MSC12_Oscar_002.jpg"
        },
        {
            "title": "Details",
            "facts": [
                {
                    "name": "Labels",
                    "value": "Designs, redlines"
                },
                {
                    "name": "Due date",
                    "value": "Dec 7, 2016"
                },
                {
                    "name": "Attachments",
                    "value": "[final.jpg](http://connectorsdemo.azurewebsites.net/images/WIN14_Jan_04.jpg)"
                }
            ]
        },
        {
            "title": "Images",
            "images": [
                {
                    "image":"http://connectorsdemo.azurewebsites.net/images/MicrosoftSurface_024_Cafe_OH-06315_VS_R1c.jpg"
                },
                {
                    "image":"http://connectorsdemo.azurewebsites.net/images/WIN12_Scene_01.jpg"
                },
                {
                    "image":"http://connectorsdemo.azurewebsites.net/images/WIN12_Anthony_02.jpg"
                }
            ]
        }
    ],
    "potentialAction": [
        {
            "@context": "http://schema.org",
            "@type": "ViewAction",
            "name": "View in Trello",
            "target": [
                "https://trello.com/c/1101/"
            ]
        }
    ]
  }
}
```

### Using the O365 Connector card

If you are using .NET and C# or Node.js, you can use the `O365ConnectorCard` class in the [Microsoft Teams extensions for the Bot Builder SDK](~/get-started/code#microsoft-teams-extensions-for-the-bot-builder-sdk) to send Connector cards from your bot.

## Receipt card

Supported in Teams.

A card that enables a bot to provide a receipt to the user. It typically contains the list of items to include on the receipt, tax and total information, and other text.

### Support

| Bots in Teams | Messaging Extensions  | Connectors | Bot Framework |
| --- | --- | --- | --- |
| ✔ | ✔ | ✖ | ✔ |
|

### For more information

Bot Framework reference:

* [Receipt card Node](https://docs.botframework.com/en-us/node/builder/chat-reference/classes/_botbuilder_d_.receiptcard.html)
* [Receipt card C#](https://docs.botframework.com/en-us/csharp/builder/sdkreference/d0/df9/class_microsoft_1_1_bot_1_1_connector_1_1_receipt_card.html)

## Signin card

A card that enables a bot to request that a user sign in. Supported in Teams in a slightly different form than is found in the Bot Framework. See Notes for more details.

### Support

| Bots in Teams | Messaging Extensions  | Connectors | Bot Framework |
| --- | --- | --- | --- |
| ✔ | ✖ | ✖ | ✔ |
|

### Notes
The signin card in Teams is similar to the signin card in the bot framework with the exception that the signin card in Teams only supports two actions: `signin` and `openUrl`.

The *signin action* can be used from any card in Teams, not just the signin card. See the topic [Microsoft Teams authentication flow for bots](~/concepts/authentication/auth-flow-bot) for more details on authentication.

### For more information

Bot Framework reference:

* [Signin card Node](https://docs.botframework.com/en-us/node/builder/chat-reference/classes/_botbuilder_d_.signincard.html)
* [Signin card C#](https://docs.botframework.com/en-us/csharp/builder/sdkreference/dc/d03/class_microsoft_1_1_bot_1_1_connector_1_1_signin_card.html)

## Thumbnail card

A card that typically contains a single thumbnail image, one or more buttons, and text.

### Support

| Bots in Teams | Messaging Extensions  | Connectors | Bot Framework |
| --- | --- | --- | --- |
| ✔ | ✔ | ✖ | ✔ |
|

![Example of a thumbnail card](~/assets/images/cards/thumbnail.png)

### Properties

| Property | Type  | Description |
| --- | --- | --- |
| title | Rich text | Title of the card. Maximum 2 lines; formatting not currently supported |
| subtitle | Rich text | Subtitle of the card. Maximum 2 lines; formatting not currently supported |
| text | Rich text | Text appears just below the subtitle; see [Card formatting](~/concepts/cards/cards-format) for formatting options |
| images | Array of images | Image displayed at top of card. Aspect ratio 1:1 (square) |
| buttons | Array of action objects | Set of actions applicable to the current card. Maximum 6 |
| tap | Action object | This action will be activated when the user taps on the card itself |
|

### JSON Example

```json
{
  "contentType": "application/vnd.microsoft.card.thumbnail",
  "content": {
    "title": "Bender",
    "subtitle": "tale of a robot who dared to love",
    "text": "Bender Bending Rodríguez is a main character in the animated television series Futurama. He was created by series creators Matt Groening and David X. Cohen, and is voiced by John DiMaggio",
    "images": [
      {
        "url": "https://upload.wikimedia.org/wikipedia/en/a/a6/Bender_Rodriguez.png",
        "alt": "Bender Rodríguez"
      }
    ],
    "buttons": [
      {
        "type": "imBack",
        "title": "Thumbs Up",
        "image": "http://moopz.com/assets_c/2012/06/emoji-thumbs-up-150-thumb-autox125-140616.jpg",
        "value": "I like it"
      },
      {
        "type": "imBack",
        "title": "Thumbs Down",
        "image": "http://yourfaceisstupid.com/wp-content/uploads/2014/08/thumbs-down.png",
        "value": "I don't like it"
      },
      {
        "type": "openUrl",
        "title": "I feel lucky",
        "image": "http://thumb9.shutterstock.com/photos/thumb_large/683806/148441982.jpg",
        "value": "https://www.bing.com/images/search?q=bender&qpvt=bender&qpvt=bender&qpvt=bender&FORM=IGRE"
      }
    ],
    "tap": {
      "type": "imBack",
      "value": "Tapped it!"
    }
  }
}
```

### For more information

Bot Framework reference:

* [Thumbnail card Node](https://docs.botframework.com/en-us/node/builder/chat-reference/classes/_botbuilder_d_.thumbnailcard.html)
* [Thumbnail card C#](https://docs.botframework.com/en-us/csharp/builder/sdkreference/attachments.html#thumbnailcard)

## Card collections

Card collections are supported in Teams.

Card collections are provided by the Bot Framework: `builder.AttachmentLayout.carousel` and `builder.AttachmentLayout.list`. These collections can only contain Hero or Thumbnail cards.

## Carousel collection

The [carousel layout](https://docs.microsoft.com/en-us/bot-framework/dotnet/bot-builder-dotnet-add-rich-card-attachments) shows a carousel of cards, optionally with associated action buttons.

### Support

| Bots in Teams | Messaging Extensions  | Connectors | Bot Framework |
| --- | --- | --- | --- |
| ✔ | ✔ | ✖ | ✔ |
|

> [!NOTE]
> A carousel can display a maximum of 10 cards per message.

### Example

![Example of a carousel of cards](~/assets/images/cards/carousel.png)

Properties are the same as for the hero or thumbnail card.

### Syntax

`builder.AttachmentLayout.carousel`

## List collection

### Support

The list layout shows a vertically stacked list of cards, optionally with associated action buttons.

| Bots in Teams | Messaging Extensions  | Connectors | Bot Framework |
| --- | --- | --- | --- |
| ✔ | ✔ | ✖ | ✔ |
|

### Example

![Example of a list of cards](~/assets/images/cards/list.png)

Properties are the same as for the hero or thumbnail card.

A list can display a maximum of 10 cards per message.

> [!NOTE]
> Some combinations of list cards are not yet supported on iOS and Android.

### Syntax

`builder.AttachmentLayout.list`

## Cards not supported in Teams

The following cards are implemented by the Bot Framework, but are NOT supported by Teams.

## Animation card

Not supported in Teams.

A card that can play animated GIFs or short videos.

### Support

| Bots in Teams | Messaging Extensions  | Connectors | Bot Framework |
| --- | --- | --- | --- |
| ✖ | ✖ | ✖ | ✔ |
|

### For more information

Bot Framework reference:

* [Animation card Node](https://docs.botframework.com/en-us/node/builder/chat-reference/classes/_botbuilder_d_.animationcard.html)
* [Animation card C#](https://docs.botframework.com/en-us/csharp/builder/sdkreference/d9/d78/class_microsoft_1_1_bot_1_1_connector_1_1_animation_card.html)

## Audio card

Not supported in Teams.

A card that can play an audio file.

### Support

| Bots in Teams | Messaging Extensions  | Connectors | Bot Framework |
| --- | --- | --- | --- |
| ✖ | ✖ | ✖ | ✔ |
|

### For more information

Bot Framework reference:

* [Audio card Node](https://docs.botframework.com/en-us/node/builder/chat-reference/classes/_botbuilder_d_.audiocard.html)
* [Audio card C#](https://docs.botframework.com/en-us/csharp/builder/sdkreference/db/d71/class_microsoft_1_1_bot_1_1_connector_1_1_audio_card.html)

## Video card

Not supported in Teams.

A card that can play videos.

### Support

| Bots in Teams | Messaging Extensions  | Connectors | Bot Framework |
| --- | --- | --- | --- |
| ✖ | ✖ | ✖ | ✔ |
|

### For more information

Bot Framework reference:

* [Video card Node](https://docs.botframework.com/en-us/node/builder/chat-reference/classes/_botbuilder_d_.videocard.html)
* [Video card C#](https://docs.botframework.com/en-us/csharp/builder/sdkreference/d6/da6/class_microsoft_1_1_bot_1_1_connector_1_1_video_card.html)
