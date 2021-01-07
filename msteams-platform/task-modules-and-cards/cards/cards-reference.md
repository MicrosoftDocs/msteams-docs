---
title: Cards Reference
description: Describes all the cards and card actions available to bots in Teams
keywords: bots cards reference
---
# Cards Reference

The cards listed in this section are supported in bots for Teams. They are based on cards defined by the Bot Framework, but Teams does not support all Bot Framework cards and has added some of its own. Differences are called out in the references below.

## Card examples

You can find additional information on how to use cards in the documentation for the Bot Builder SDK (v3). There are also code samples available in the Microsoft/BotBuilder-Samples repository on GitHub.

* .NET
  * [Add cards as attachments to messages](/bot-framework/dotnet/bot-builder-dotnet-add-rich-card-attachments)
  * [Cards sample code (Bot Builder v3)](https://github.com/Microsoft/BotBuilder-Samples/tree/v3-sdk-samples/CSharp/cards-RichCards)
* Node.js
  * [Add cards as attachments to messages](/bot-framework/nodejs/bot-builder-nodejs-send-rich-cards)
  * [Cards sample code (Bot Builder v3)](https://github.com/Microsoft/BotBuilder-Samples/tree/v3-sdk-samples/Node/cards-RichCards)

## Types of cards

This table shows the types of cards available to you.

| Card Type | Description |
| --- | --- |
| [Adaptive Card](#adaptive-card) | Highly customizable card that can contain any combination of text, speech, images, buttons and input fields. |
| [Hero Card](#hero-card) | Typically contains a single large image, one or more buttons, and a small amount of text. |
| [List Card](#list-card) | A scrolling list of items. |
| [Office 365 Connector Card](#office-365-connector-card) | Flexible layout with multiple sections, fields, images and actions. |
| [Receipt Card](#receipt-card) | Provides a receipt to the user. |
| [Signin Card](#signin-card) | Enables a bot to request that a user sign in. |
| [Thumbnail Card](#thumbnail-card) | Typically contains a single thumbnail image, some short text, and one or more buttons. |
| [Card Collections](#card-collections) | Used to return multiple items in a single response |

## Common properties for all cards

### Inline card images

Your card can contain an inline image by including a link to your publicly available image. For performance purposes we highly recommend you host your image on a public content-delivery network (CDN).

Images are scaled up or down in size while maintaining the aspect ratio to cover the image area, and then cropped from center to achieve the appropriate aspect ratio for the card.

Images must be at most 1024×1024 in PNG, JPEG, or GIF format; animated GIF is not officially supported.

| Property | Type  | Description |
| --- | --- | --- |
| url | URL | HTTPS URL to the image |
| alt | String | Accessible description of the image |

### Buttons

Buttons are shown stacked at the bottom of the card. Button text is always on a single line and will be truncated if the text exceeds the button width. Any additional buttons beyond the maximum number supported by the card will not be shown.

See [Card Actions](~/task-modules-and-cards/cards/cards-actions.md) for more information.

### Card Formatting

See [Card Formatting](~/task-modules-and-cards/cards/cards-format.md) for more information on text formatting in cards.

## Adaptive card

A customizable card that can contain any combination of text, speech, images, buttons, and input fields. *See* [Adaptive Cards v1.2.0](https://github.com/microsoft/AdaptiveCards/releases/tag/v1.2.0).

### Support for Adaptive cards

| Bots in Teams | Messaging Extensions  | Connectors | Bot Framework |
| --- | --- | --- | --- |
| ✔ | ✔ | ✖ | ✔ |
|

> [!NOTE]
> Media elements are currently not supported in Adaptive cards v1.2 on the Teams platform.

### Example Adaptive card

![Example of a adaptive card card](~/assets/images/cards/adaptivecard.png)

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

#### For more information on Adaptive cards

* [Adaptive Cards Overview](/adaptive-cards/)
* [Adaptive card actions in Teams](~/task-modules-and-cards/cards/cards-actions.md#adaptive-cards-actions)

## Hero card

A card that typically contains a single large image, one or more buttons and text.

### Support for Hero cards

| Bots in Teams | Messaging Extensions  | Connectors | Bot Framework |
| --- | --- | --- | --- |
| ✔ | ✔ | ✖ | ✔ |
|

### Properties of a Hero card

| Property | Type  | Description |
| --- | --- | --- |
| title | Rich text | Title of the card. Maximum 2 lines. |
| subtitle | Rich text | Subtitle of the card. Maximum 2 lines.|
| text | Rich text | Text appears just below the subtitle; see [Card formatting](~/task-modules-and-cards/cards/cards-format.md) for formatting options |
| images | Array of images | Image displayed at top of card. Aspect ratio 16:9 |
| buttons | Array of action objects | Set of actions applicable to the current card. Maximum 6 |
| tap | Action object | This action will be activated when the user taps on the card itself |
|

### Example Hero card

![Example of a hero card](~/assets/images/cards/hero.png)

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

### For more information on Hero cards

Bot Framework reference:

* [Hero card Node](https://docs.microsoft.com/javascript/api/botframework-schema/herocard)
* [Hero card C#](https://docs.microsoft.com/dotnet/api/microsoft.bot.connector.herocard?view=botbuilder-dotnet-3.0&preserve-view=true)

## List card

The list card has been added by Teams to provide functions beyond what the list collection can provide. The list card provides a scrolling list of items.

### Support for List cards

| Bots in Teams | Messaging Extensions  | Connectors | Bot Framework |
| --- | --- | --- | --- |
| ✔ | ✖ | ✖ |✔ |
|

### Properties of a List card

| Property | Type  | Description |
| --- | --- | --- |
| title | Rich text | Title of the card. Maximum 2 lines.|
| items | Array of list items  ||
| buttons | Array of action objects | Set of actions applicable to the current card. Maximum 6. |

### Example List card

```json
{
  "contentType": "application/vnd.microsoft.teams.card.list",
  "content": {
    "title": "Card title",
    "items": [
      {
        "type": "file",
        "id": "https://contoso.sharepoint.com/teams/new/Shared%20Documents/Report.xlsx",
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

### Support for Office 365 connector cards

| Bots in Teams | Messaging Extensions  | Connectors | Bot Framework |
| --- | --- | --- | --- |
| ✔ | ✔ | ✔ | ✖ |
|

### Properties of the Office 365 connector card

| Property | Type  | Description |
| --- | --- | --- |
| title | Rich text | Title of the card. Maximum 2 lines. |
| summary | Rich text | Summary of the card. Maximum 2 lines. |
| text | Rich text | Text appears just below the subtitle; see [Card formatting](~/task-modules-and-cards/cards/cards-format.md) for formatting options |
| themeColor | HEX string | color that overrides the accentColor provided from the application manifest |

### Notes on the Office 365 connector card

Office 365 Connector cards function properly on Microsoft Teams, including [ActionCard actions](/outlook/actionable-messages/card-reference#actioncard-action).

One important difference between using Connector cards from a Connector and using Connector cards in your bot is the handling of card actions.

* For a Connector, the endpoint receives the card payload via HTTP POST.
* For a bot, the `HttpPOST` action triggers an `invoke` activity that sends only the action ID and body to the bot.

Each Connector card can display a maximum of 10 sections, and each section can contain a maximum of 5 images and 5 actions.

> [!NOTE]
> Any additional sections, images, or actions in a message will not appear.

All text fields support Markdown and HTML. You can control which sections use Markdown or HTML by setting the `markdown` property in a message. By default, `markdown` is set to `true`; if you want to use HTML instead, set `markdown` to `false`.

If you specify the `themeColor` property, it overrides the `accentColor` property in the app manifest.

To specify the rendering style for `activityImage`, you can set `activityImageType` as follows.

| Value | Description |
| --- | --- |
| `avatar` | Default; `activityImage` will be cropped as a circle |
| `article` | `activityImage` will be displayed as a rectangle and retain its aspect ratio |

For all other details about Connector card properties, see the [Actionable message card reference](/outlook/actionable-messages/card-reference). The only Connector card properties that Microsoft Teams does not currently support are as follows:

* `heroImage`
* `hideOriginalBody`
* `startGroup` (always treated as `true` in Teams)
* `originator`
* `correlationId`

### Example Office 365 connector card

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

## Receipt card

Supported in Teams.

A card that enables a bot to provide a receipt to the user. It typically contains the list of items to include on the receipt, tax and total information, and other text.

### Support for Receipts cards

| Bots in Teams | Messaging Extensions  | Connectors | Bot Framework |
| --- | --- | --- | --- |
| ✔ | ✔ | ✖ | ✔ |
|

### For more information on Receipt cards

Bot Framework reference:

* [Receipt card Node](https://docs.microsoft.com/javascript/api/botframework-schema/receiptcard?view=botbuilder-ts-latest&preserve-view=true)
* [Receipt card C#](https://docs.microsoft.com/dotnet/api/microsoft.bot.connector.receiptcard?view=botbuilder-dotnet-3.0&preserve-view=true)

## Signin card

A card that enables a bot to request that a user sign in. Supported in Teams in a slightly different form than is found in the Bot Framework. The signin card in Teams is similar to the signin card in the bot framework with the exception that the signin card in Teams only supports two actions: `signin` and `openUrl`.

The *signin action* can be used from any card in Teams, not just the signin card. See the topic [Microsoft Teams authentication flow for bots](~/bots/how-to/authentication/auth-flow-bot.md) for more details on authentication.

### Support for Signin cards

| Bots in Teams | Messaging Extensions  | Connectors | Bot Framework |
| --- | --- | --- | --- |
| ✔ | ✖ | ✖ | ✔ |
|

### For more information on Signin cards

Bot Framework reference:

* [Signin card Node](/javascript/api/botframework-schema/signincard?view=botbuilder-ts-latest&preserve-view=true)
* [Signin card C#](/dotnet/api/microsoft.bot.connector.signincard?view=botbuilder-dotnet-3.0&preserve-view=true)

## Thumbnail card

A card that typically contains a single thumbnail image, one or more buttons, and text.

### Support for Thumbnail cards

| Bots in Teams | Messaging Extensions  | Connectors | Bot Framework |
| --- | --- | --- | --- |
| ✔ | ✔ | ✖ | ✔ |
|

![Example of a thumbnail card](~/assets/images/cards/thumbnail.png)

### Properties of a Thumbnail card

| Property | Type  | Description |
| --- | --- | --- |
| title | Rich text | Title of the card. Maximum 2 lines.|
| subtitle | Rich text | Subtitle of the card. Maximum 2 lines.|
| text | Rich text | Text appears just below the subtitle; see [Card formatting](~/task-modules-and-cards/cards/cards-format.md) for formatting options |
| images | Array of images | Image displayed at top of card. Aspect ratio 1:1 (square) |
| buttons | Array of action objects | Set of actions applicable to the current card. Maximum 6 |
| tap | Action object | This action will be activated when the user taps on the card itself |
|

### Example Thumbnail card

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

* [Thumbnail card Node](https://docs.microsoft.com/javascript/api/botframework-schema/thumbnailcard?view=botbuilder-ts-latest&preserve-view=true)
* [Thumbnail card C#](https://docs.microsoft.com/dotnet/api/microsoft.bot.connector.thumbnailcard?view=botbuilder-dotnet-3.0&preserve-view=true)

## Card collections

Card collections are supported in Teams.

Card collections: `builder.AttachmentLayout.carousel` and `builder.AttachmentLayout.list`. These collections can contain Adaptive, Hero, or Thumbnail cards.

## Carousel collection

The [carousel layout](/azure/bot-service/dotnet/bot-builder-dotnet-add-rich-card-attachments?view=azure-bot-service-3.0&preserve-view=true) shows a carousel of cards, optionally with associated action buttons.

### Support for Carousel collections

| Bots in Teams | Messaging Extensions  | Connectors | Bot Framework |
| --- | --- | --- | --- |
| ✔ | ✖ | ✖ | ✔ |
|

> [!NOTE]
> A carousel can display a maximum of 10 cards per message.

### Properties of a Carousel card

Properties are the same as for the hero or thumbnail card.

### Example Carousel collection

![Example of a carousel of cards](~/assets/images/cards/carousel.png)

```json
{
 "attachmentLayout": "carousel",
 "attachments":[
    {
      "contentType": "application/vnd.microsoft.card.adaptive",
      "content": {
        "type": "AdaptiveCard",
        "version": "1.0",
        "body": [
          {
            "type": "Container",
            "items": [
              {
                "type": "TextBlock",
                "size": "extraLarge",
                "weight": "bolder",
                "text": "Welcome to Employee Connect",
                "height": "stretch"
              },
              {
                "type": "TextBlock",
                "size": "medium",
                "weight": "bolder",
                "text": "Add events to your calendar",
                "height": "stretch"
              },
              {
                "type": "TextBlock",
                "weight": "bolder",
                "text": "The bot can send \r\rnotification to remind \r\ryou about the latest \r\revents and trainings.",
                "wrap": true,
                "height": "stretch"
              },
              {
                "type": "ColumnSet",
                "columns": [
                  {
                    "type": "Column",
                    "items": [],
                    "height": "stretch"
                  }
                ]
              },
              {
                "type": "ColumnSet",
                "columns": [
                  {
                    "type": "Column",
                    "items": [],
                    "height": "stretch"
                  }
                ]
              }
            ]
          }
        ],
        "actions": [
          {
            "type": "Action.Submit",
            "title": "Let's get started"
          }
        ]
      }
    },
    {
      "contentType": "application/vnd.microsoft.card.adaptive",
      "content": {
        "type": "AdaptiveCard",
        "version": "1.2",
        "body": [
          {
            "type": "Container",
            "items": [
              {
                "type": "TextBlock",
                "size": "large",
                "weight": "bolder",
                "text": "Employee connect"
              },
              {
                "type": "TextBlock",
                "text": "The bot can send notifications \r\rto remind you about the latest \r\r events and trainings",
                "wrap": true,
                "maxWidth": 2
              },
              {
                "type": "ColumnSet",
                "columns": [
                  {
                    "type": "Column",
                    "items": [],
                    "height": "stretch"
                  }
                ]
              },
              {
                "type": "ColumnSet",
                "columns": [
                  {
                    "type": "Column",
                    "items": [],
                    "height": "stretch"
                  }
                ]
              }
            ]
          }
        ],
        "actions": [
          {
            "type": "Action.Submit",
            "title": "Let's get started"
          }
        ]
      }
    },
    {
      "contentType": "application/vnd.microsoft.card.adaptive",
      "content": {
        "type": "AdaptiveCard",
        "version": "1.0",
        "body": [
          {
            "type": "Container",
            "items": [
              {
                "type": "TextBlock",
                "size": "large",
                "weight": "bolder",
                "text": "Employee Connect final"
              },
              {
                "type": "TextBlock",
                "weight": "bolder",
                "text": "Create and manage your tasks",
                "wrap": true
              },
              {
                "type": "TextBlock",
                "text": "The app identifies all your pending tasks \r\r and helps you manage everything at \r\r one place.",
                "wrap": true
              },
              {
                "type": "TextBlock",
                "weight": "bolder",
                "text": "Try these commands \r\r- Pending Submissions \r\r- Pending Approvals- My Tools",
                "wrap": true,
                "height": "stretch"
              }
            ]
          }
        ],
        "actions": [
          {
            "type": "Action.Submit",
            "title": "Let's get started"
          }
        ]
      }
    }
  ]
}
```

### Syntax for Carousel collections

`"builder.AttachmentLayoutTypes.Carousel"`

## List collection

### Support for List collections

The list layout shows a vertically stacked list of cards, optionally with associated action buttons.

| Bots in Teams | Messaging Extensions  | Connectors | Bot Framework |
| --- | --- | --- | --- |
| ✔ | ✔ | ✖ | ✔ |
|

### Example List collection

![Example of a list of cards](~/assets/images/cards/list.png)

Properties are the same as for the hero or thumbnail card.

A list can display a maximum of 10 cards per message.

> [!NOTE]
> Some combinations of list cards are not yet supported on iOS and Android.

### Syntax for List collections

`builder.AttachmentLayout.list`

## Cards not supported in Teams

The following cards are implemented by the Bot Framework, but are NOT supported by Teams.

* Animation cards
* Audio cards
* Video cards
