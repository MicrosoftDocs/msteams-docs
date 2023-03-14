---
title: Designing Adaptive Cards for your app
description: In this module, learn how to design Adaptive Cards for your Teams app and get the Microsoft Teams UI Kit.
ms.localizationpriority: high
ms.topic: conceptual
---
# Designing Adaptive Cards for your Microsoft Teams app

An Adaptive Card contains a freeform body of card elements and optional set of actions. Adaptive Cards are actionable snippets of content that you can add to a conversation through a bot or message extension. Using text, graphics, and buttons, these cards provide rich communication to your audience.

The Adaptive Card framework is used across many Microsoft products, including Teams. You can send cards inside messages to users via bots or message extensions. Users can also take actions on cards when present.

:::image type="content" source="../../assets/images/adaptive-cards/adaptive-card-overview.png" alt-text="Overview example of an Adaptive Card.":::

## Microsoft Teams UI Kit

You can find more comprehensive design guidelines for Adaptive Cards in Teams, including elements that you can grab and modify as needed, in the Microsoft Teams UI Kit. The UI kit also covers essential topics such as theming, accessibility, and responsive sizing.

> [!div class="nextstepaction"]
> [Get the Microsoft Teams UI Kit (Figma)](https://www.figma.com/community/file/916836509871353159)

## Adaptive Cards designer

You also can start designing your Adaptive Cards directly in the browser.

> [!div class="nextstepaction"]
> [Try the Adaptive Cards designer](https://adaptivecards.io/designer/)

## Types of Adaptive Cards

### Hero

Our largest card. Use for sharing articles or scenarios where an image tells most of the story.

#### Mobile

:::image type="content" source="../../assets/images/adaptive-cards/mobile-hero-card.png" alt-text="Example shows an Adaptive Card hero card on mobile.":::

#### Desktop

:::image type="content" source="../../assets/images/adaptive-cards/hero-card.png" alt-text="Example shows an Adaptive Card hero card.":::

### Thumbnail

Use for sending a simple actionable message.

#### Mobile

:::image type="content" source="../../assets/images/adaptive-cards/mobile-thumbnail-card.png" alt-text="Example shows an Adaptive Card thumbnail card on mobile.":::

#### Desktop

:::image type="content" source="../../assets/images/adaptive-cards/thumbnail-card.png" alt-text="Example shows an Adaptive Card thumbnail card.":::

### List

Use in scenarios where you want the user to pick an item from a list, but the items don’t need a lot of explanations.

#### Mobile

:::image type="content" source="../../assets/images/adaptive-cards/mobile-list-card.png" alt-text="Example shows an Adaptive Card list card on mobile.":::

#### Desktop

:::image type="content" source="../../assets/images/adaptive-cards/list-card.png" alt-text="Example shows an Adaptive Card list card.":::

### Digest

Use for news digests and round-up posts. Note: We recommend the thumbnail card for a single update or news item.

#### Mobile

:::image type="content" source="../../assets/images/adaptive-cards/mobile-digest-card.png" alt-text="Example shows an Adaptive Card digest card on mobile.":::

#### Desktop

:::image type="content" source="../../assets/images/adaptive-cards/digest-card.png" alt-text="Example shows an Adaptive Card digest card.":::

### Media

Use when you want to combine text and media, like audio or video.

#### Mobile

:::image type="content" source="../../assets/images/adaptive-cards/mobile-media-card.png" alt-text="Example shows an Adaptive Card media card on mobile.":::

#### Desktop

:::image type="content" source="../../assets/images/adaptive-cards/media-card.png" alt-text="Example shows an Adaptive Card media card.":::

### People

Best used when you to efficiently convey who's involved with a task.

#### Mobile

:::image type="content" source="../../assets/images/adaptive-cards/mobile-people-card.png" alt-text="Example shows an Adaptive Card people card on mobile.":::

#### Desktop

:::image type="content" source="../../assets/images/adaptive-cards/people-card.png" alt-text="Example shows an Adaptive Card people card.":::

### Request ticket

Use to get quick inputs from a user to automatically create a task or ticket.

#### Mobile

:::image type="content" source="../../assets/images/adaptive-cards/mobile-request-ticket-card.png" alt-text="Example shows an Adaptive Card request ticket card on mobile.":::

#### Desktop

:::image type="content" source="../../assets/images/adaptive-cards/request-ticket-card.png" alt-text="Example shows an Adaptive Card request ticket card.":::

### ImageSet

Use to send multiple image thumbnails.

#### Mobile

:::image type="content" source="../../assets/images/adaptive-cards/mobile-image-set-card.png" alt-text="Example shows an Adaptive Card image set card on mobile.":::

#### Desktop

:::image type="content" source="../../assets/images/adaptive-cards/image-set-card.png" alt-text="Example shows an Adaptive Card image set card.":::

### ActionSet

Use when you want to the user to select a button, then gather addition user input from the same card.

#### Mobile

:::image type="content" source="../../assets/images/adaptive-cards/mobile-action-set-card.png" alt-text="Example shows an Adaptive Card action set card on mobile.":::

#### Desktop

:::image type="content" source="../../assets/images/adaptive-cards/action-set-card.png" alt-text="Example shows an Adaptive Card action set card.":::

### ChoiceSet

Use to gather multiple inputs from the user.

#### Mobile

:::image type="content" source="../../assets/images/adaptive-cards/mobile-choice-set-card.png" alt-text="Example shows an Adaptive Card choice set card on mobile.":::

#### Desktop

:::image type="content" source="../../assets/images/adaptive-cards/choice-set-card.png" alt-text="Example shows an Adaptive Card choice set card.":::

## Anatomy

Adaptive Cards have a lot of flexibilities. But at minimum, we strongly suggest including the following components in every card.

#### Mobile

:::image type="content" source="../../assets/images/adaptive-cards/mobile-anatomy.png" alt-text="Example shows Adaptive Card anatomy on mobile.":::

|Counter|Description|
|----------|-----------|
|A|**Header**: Make your headers clear and concise.|
|B|**Body copy**: Convey details that are either too long or not important enough to include in the header.|
|C|**Primary actions**: As a best practice, include 1-3 primary actions. You can have up to six.|

#### Desktop

:::image type="content" source="../../assets/images/adaptive-cards/anatomy.png" alt-text="EExample shows Adaptive Card anatomy.":::

|Counter|Description|
|----------|-----------|
|A|**Header**: Make your headers clear and concise.|
|B|**Body copy**: Convey details that are either too long or not important enough to include in the header.|
|C|**Primary actions**: As a best practice, include 1-3 primary actions. You can have up to six.|

## Best practices

Cards designed for a narrow screen scale well on wider screens (the opposite isn't true). You should also assume users won't only view your cards on desktop.

### Column layouts

Use [`ColumnSet`](https://adaptivecards.io/explorer/ColumnSet.html) to format your card content into a table or grid. There are several options for formatting column width. These guidelines help you understand when to use each one.

* `"width": "auto"`: Sizes each column in the `ColumnSet` to fit whatever app content you include in that column.
  * **Do**: Use when you have content of varying width and don't need to prioritize a specific column.
  * **Do**: For each `TextBlock`, set `"wrap": true` since text doesn't wrap by default.
  * **Don't**: Set `"width": "auto"` for every column container. For example, if you have an input and button side by side, the button might get cut off on some screens. Instead, set `auto` for the column with buttons and other content that must always be completely visible.
* `"width": "stretch"`: Sizes columns based on the available `ColumnSet` width. When multiple columns use the `"stretch"` value, they equally share the available width.
  * **Do**: Use with one column if all your other columns have a static width. For example, you have thumbnail images in one column that are all 50 pixels wide.
* `"width": "<number>"`: Sizes columns using a proportion of the available `ColumnSet` width. For example, if you set three columns with `"width": "1"`, `"width": "4"`, and `"width": "5"`, the columns will take up 10, 40, and 50 percent of the available width.
* `"width": "<number>px"`: Sizes columns to a specific pixel width. This approach is useful when creating tables.
  * **Do**: Use when the width of what you're displaying doesn't need to change (for example, numbers and percentages).
  * **Don't**: Accidentally exceed the width of what the card can display. Remember, available screen width depends on the device. Teams mobile also doesn't support horizontal scrolling like Teams desktop.

#### Example: Knowing when to stretch columns

# [Design](#tab/design)

**Do**: In this screen, there are two columns at the bottom of the card. The input component width is set to `stretch`, while the **Select** button width is set to `auto`. This ensures the button remains completely in view.

:::image type="content" source="~/assets/images/adaptive-cards/design-width-auto-do.png" alt-text="The screenshot shows how to set column width for Adaptive Cards.":::

**Don't**: In this screen, both columns have `width` set to `auto`. This causes the **Select** button on the right to be cut off slightly compared to the input.

:::image type="content" source="~/assets/images/adaptive-cards/design-width-auto-dont.png" alt-text="The screenshot shows how not to set column width in Adaptive Cards.":::

# [Code](#tab/code)

Here's the code for implementing the design example you should follow.

```json
{
  "$schema": "http://adaptivecards.io/schemas/adaptive-card.json",
  "type": "AdaptiveCard",
  "version": "1.2",
  "body": [
    {
      "type": "TextBlock",
      "text": "I wasn't able to identify the type of expense. Select from the list:",
      "wrap": true,
      "id": "typePrompt",
      "spacing": "Medium",
      "size": "Medium"
    },
    {
      "type": "ActionSet",
      "actions": [
        {
          "type": "Action.Submit",
          "title": "Phone Bill",
          "data": {
            "msteams": {
              "type": "messageBack",
              "displayText": "Phone Bill",
              "action": "Phone Bill"
            },
            "action": "Phone Bill"
          }
        },
        {
          "type": "Action.Submit",
          "title": "Taxi and Other Transportation",
          "data": {
            "msteams": {
              "type": "messageBack",
              "displayText": "Taxi and Other Transportation",
              "action": "Taxi and Other Transportation"
            },
            "action": "Taxi and Other Transportation"
          }
        },
        {
          "type": "Action.Submit",
          "title": "Entertainment_misc",
          "data": {
            "msteams": {
              "type": "messageBack",
              "displayText": "Entertainment_misc",
              "action": "Entertainment_misc"
            },
            "action": "Entertainment_misc"
          }
        },
        {
          "type": "Action.Submit",
          "title": "Car Rental",
          "data": {
            "msteams": {
              "type": "messageBack",
              "displayText": "Car Rental",
              "action": "Car Rental"
            },
            "action": "Car Rental"
          }
        },
        {
          "type": "Action.Submit",
          "title": "Airfare",
          "data": {
            "msteams": {
              "type": "messageBack",
              "displayText": "Airfare",
              "action": "Airfare"
            },
            "action": "Airfare"
          }
        }
      ],
      "spacing": "Medium"
    },
    {
      "type": "TextBlock",
      "text": "     ",
      "wrap": true
    },
    {
      "type": "ColumnSet",
      "columns": [
        {
          "type": "Column",
          "width": "stretch",
          "items": [
            {
              "type": "Input.ChoiceSet",
              "choices": [
                {
                  "title": "Meals",
                  "value": "Meals"
                },
                {
                  "title": "Parking/Tolls",
                  "value": "Parking/Tolls"
                },
                {
                  "title": "Accomodation",
                  "value": "Accomodation"
                },
                {
                  "title": "Fuel-Gas/Petrol/Diesel",
                  "value": "Fuel-Gas/Petrol/Diesel"
                },
                {
                  "title": "Hotel",
                  "value": "Hotel"
                },
                {
                  "title": "Meals - Employees Only",
                  "value": "Meals - Employees Only"
                },
                {
                  "title": "Accomodations",
                  "value": "Accomodations"
                },
                {
                  "title": "Misc.Expenses",
                  "value": "Misc.Expenses"
                },
                {
                  "title": "Please Categorize",
                  "value": "Please Categorize"
                }
              ],
              "placeholder": "All",
              "id": "expenseTypes",
              "value": "Meals - Employees Only"
            }
          ]
        },
        {
          "type": "Column",
          "width": "auto",
          "items": [
            {
              "type": "ActionSet",
              "actions": [
                {
                  "type": "Action.Submit",
                  "title": "Select",
                  "data": {
                    "msteams": {
                      "type": "messageBack",
                      "displayText": "Select",
                      "action": "applyType"
                    },
                    "action": "applyType"
                  }
                }
              ]
            }
          ]
        }
      ],
      "spacing": "ExtraLarge"
    }
  ]
}
```

---

#### Example: Using fewer columns

**Do**: Layouts tend to display better on mobile with fewer columns.

:::image type="content" source="~/assets/images/adaptive-cards/design-column-amount-do.png" alt-text="The screenshot shows the right number of columns in Adaptive Cards.":::

**Don't**: Using too many columns can clutter your card content on mobile.

:::image type="content" source="~/assets/images/adaptive-cards/design-column-amount-dont.png" alt-text="The screenshot shows how to many columns can negatively affect Adaptive Card layout.":::

#### Example: Fixed width has its place

# [Design](#tab/design)

When the the size of something you're displaying doesn't need to change, set you columns to a specific pixel width. This example shows the left column sized at 50 pixels, while the descriptions next to the thumbnails stretch the length of the card.

:::image type="content" source="~/assets/images/adaptive-cards/design-width-auto-do.png" alt-text="The screenshot shows how to set column width in Adaptive Cards.":::

# [Code](#tab/code)

Here's the code for implementing the design example.

```json
{
  "type": "AdaptiveCard",
  "version": "1.0",
  "body": [
    {
      "type": "TextBlock",
      "text": "Pick up where you left off?",
      "weight": "bolder"
    },
    {
      "type": "ColumnSet",
      "spacing": "medium",
      "columns": [
        {
          "type": "Column",
          "width": "50px",
          "items": [
            {
              "type": "Image",
              "url": "https://unsplash.it/80?image=1083",
              "size": "medium"
            }
          ]
        },
        {
          "type": "Column",
          "width": "stretch",
          "items": [
            {
              "type": "TextBlock",
              "text": "Silver Star Mountain Range"
            },
            {
              "type": "TextBlock",
              "text": "Maps",
              "isSubtle": true,
              "spacing": "none"
            }
          ]
        }
      ],
      "selectAction": {
        "type": "Action.OpenUrl",
        "url": "https://www.msn.com"
      }
    },
    {
      "type": "ColumnSet",
      "columns": [
        {
          "type": "Column",
          "width": "50px",
          "items": [
            {
              "type": "Image",
              "url": "https://unsplash.it/80?image=1082",
              "size": "medium"
            }
          ]
        },
        {
          "type": "Column",
          "width": "stretch",
          "style": "emphasis",
          "items": [
            {
              "type": "TextBlock",
              "text": "Kitchen Remodel for Homes"
            },
            {
              "type": "TextBlock",
              "text": "With EMPHASIS",
              "isSubtle": true,
              "spacing": "none"
            }
          ]
        }
      ],
      "selectAction": {
        "type": "Action.OpenUrl",
        "url": "https://www.AdaptiveCards.io"
      }
    },
    {
      "type": "ColumnSet",
      "columns": [
        {
          "type": "Column",
          "width": "50px",
          "items": [
            {
              "type": "Image",
              "url": "https://unsplash.it/80?image=1080",
              "size": "medium"
            }
          ]
        },
        {
          "type": "Column",
          "width": "stretch",
          "items": [
            {
              "type": "TextBlock",
              "text": "The Witcher: A Series"
            },
            {
              "type": "TextBlock",
              "text": "Netflix",
              "isSubtle": true,
              "spacing": "none"
            }
          ]
        }
      ],
      "selectAction": {
        "type": "Action.OpenUrl",
        "url": "https://www.outlook.com"
      }
    }
  ],
  "actions": [
    {
      "type": "Action.OpenUrl",
      "title": "Resume all",
      "url": "ms-cortana:resume-all"
    },
    {
      "type": "Action.OpenUrl",
      "title": "More activities",
      "url": "ms-cortana:more-activities"
    }
  ]
}
```

---

### Text

Whether you're using [`TextBlock`](https://adaptivecards.io/explorer/TextBlock.html), [`ColumnSet`](https://adaptivecards.io/explorer/ColumnSet.html), or [`Input.ChoiceSet`](https://adaptivecards.io/explorer/Input.ChoiceSet.html), set the `wrap` property to `true` so your card text doesn't truncate on mobile.

#### Example: Making sure text don't truncate

# [Design](#tab/design)

**Do**: In this screen, the card has a `wrap` property set to `true`. This allows the text to fit to any screen size.

:::image type="content" source="~/assets/images/adaptive-cards/design-text-wrap-true.png" alt-text="The screenshot shows how to wrap text in Adaptive Cards.":::

**Don't**: In this screen, the card doesn't use the `wrap` property, so the text cuts off on a mobile screen.

:::image type="content" source="~/assets/images/adaptive-cards/design-text-wrap-false.png" alt-text="The screenshot shows what can happen if you don't wrap text in Adaptive Cards.":::

# [Code](#tab/code)

Here's the code for implementing the design example you should follow.

```json
{
  "$schema": "http://adaptivecards.io/schemas/adaptive-card.json",
  "type": "AdaptiveCard",
  "version": "1.0",
  "body": [
    {
      "type": "TextBlock",
      "text": "What cuisine do you want?"
    },
    {
      "type": "Input.ChoiceSet",
      "id": "myColor",
      "style": "compact",
      "isMultiSelect": false,
      "value": "1",
      "choices": [
        {
          "title": "Chineese",
          "value": "1"
        },
        {
          "title": "Indian",
          "value": "2"
        },
        {
          "title": "Italian",
          "value": "3"
        }
      ]
    },
    {
      "type": "TextBlock",
      "text": "Select the dishes that you like?"
    },
    {
      "type": "Input.ChoiceSet",
      "id": "myColor2",
      "style": "expanded",
      "wrap" : true,
      "isMultiSelect": false,
      "value": "1",
      "choices": [
        {
          "title": "Cauliflower with potatoes sautéed with garam masala",
          "wrap" : true,
          "value": "1"
        },
        {
          "title": "Patties of potato mixed with some vegetables fried",
          "wrap" : true,
          "value": "2"
        },
        {
          "title": "Green capsicum with potatoes sautéed with cumin seeds",
          "wrap" : true,
          "value": "3"
        }
      ]
    }
  ]
}
```

---

### Containers

A `Container` allows you to group a set of related elements together.

* **Do**: Use the `style` property to emphasize a container.
* **Do**: Use the `selectAction` property to associate an action with the other elements in the container.
* **Do**: Use the `Action.ToggleVisibility` property to make a group of elements collapsible.
* **Don't**: Use containers for any reason other than previously mentioned.

### Images

Follow these guidelines when including images in your cards.

* **Do**: Design images for high DPI screens to avoid pixelation. It's better to display a 100x100-pixel image at 50x50 pixels than the other way around.
* **Do**: If you need to control the exact size of your images, use the `width` and `height` properties.
* **Don't**: Include padding with your images. This typically introduces undesirable spacing and layout issues.
* Regarding background color:
  * **Do**: Use transparent backgrounds so that your images adapt to any Teams theme.
  * **Don't**: Include a fixed background color unless a specific color must be visible to your users.
  * **Don't**: Add a background color to a `TextBlock` that hurts readability. For example, if your background is dark, use a lighter text color and vice versa.

### Actions

:::row:::
   :::column span="":::
:::image type="content" source="../../assets/images/adaptive-cards/actions-do.png" alt-text="The screenshot shows best practice about how you should include only a small set of actions on an Adaptive Card.":::

#### Do: Use up to six primary actions

While Adaptive Cards can support six primary actions, most cards don’t need that. Actions should be clear, concise, and straight forward. Less is more.

   :::column-end:::
   :::column span="":::
:::image type="content" source="../../assets/images/adaptive-cards/actions-dont.png" alt-text="The screenshot shows best practice about how not to overwhelm users with too many actions on an Adaptive Card.":::

#### Don't: Use more than six primary actions

Adaptive Cards should present quick, actionable content. Too many actions can overwhelm a user.

   :::column-end:::
:::row-end:::

### Frequency

:::image type="content" source="../../assets/images/adaptive-cards/frequency-do.png" alt-text="The screenshot shows best practice about Adaptive Card frequency.":::

#### Do: Be concise

It's easy to send multiple cards into a conversation, but once cards scroll out of view, they become less useful. Try to limit yourself to the essentials. This is especially true in a channel where users have less tolerance for what they perceive as "noise".

## See also

* [Cards and task modules](~/task-modules-and-cards/cards-and-task-modules.md)
* [Cards and task modules supported in Teams bot](~/task-modules-and-cards/what-are-task-modules.md)
* [Work with Universal Actions for Adaptive Cards](~/task-modules-and-cards/cards/universal-actions-for-adaptive-cards/work-with-universal-actions-for-adaptive-cards.md)
* [Respond to the task module submit action](~/messaging-extensions/how-to/action-commands/respond-to-task-module-submit.md)
* [User Specific Views](~/task-modules-and-cards/cards/universal-actions-for-adaptive-cards/user-specific-views.md)
