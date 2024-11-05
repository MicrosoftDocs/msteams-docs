---
title: Container Layouts
author: surbhigupta
description: Learn about container layouts in Adaptive Cards, including Layout.Flow, Layout.AreaGrid, and Layout.Stack, to create responsive and flexible card designs.
ms.localizationpriority: medium
ms.topic: overview
ms.author: v-sdhakshina
ms.date: 11/07/2024
---

# Container layouts

By default, elements in containers (such as Container, Column, TableCell or the AdaptiveCard itself) are laid out in a top-to-bottom stack. This type of layout is appropriate for many scenarios, but sometimes it is a bit constraining. To split the horizontal space of a card into different areas, one would typically use the ColumnSet element which, while powerful, comes with its set of challenges and gotchas.

Adaptive Cards now support two additional layout types that can be applied to any container:

* `Layout.Flow` which spreads elements horizontally and wraps them across multiple rows, as needed,
* `Layout.AreaGrid` which divides the container into named `areasinto` which elements can be placed via the `grid.area` property which can be set on any element.

An explicit Layout.Stack layout is also available.

## Implement responsive layout using container layouts

Container layouts can be used to easily implement responsive layouts, as it is possible to associate multiple layouts with a single container, each dedicated to a specific card width. At runtime, the appropriate layout is automatically used to optimally arrange elements given the available width. Let's take an example.

Let's say we want to define a card with a typical layout:

* An image on the left,
* And some text on the right of the image
But, we want the text to show below the image when there is not enough horizontal space.

This can be done very easily using `Layout.AreaGrid`:

```json
{
    "type": "AdaptiveCard",
    "version": "1.5",
    "layouts": [
        {
            "type": "Layout.AreaGrid",
            "targetWidth": "atLeast:standard",
            "columns": [
                60
            ],
            "areas": [
                {
                    "name": "imageArea"
                },
                {
                    "name": "textArea",
                    "column": 2
                }
            ]
        }
    ],
    "body": [
        {
            "type": "Image",
            "url": "images/adaptivecards1.jpeg",
            "grid.area": "imageArea",
            "style": "RoundedCorners",
            "targetWidth": "atLeast:narrow"
        },
        {
            "type": "Container",
            "grid.area": "textArea",
            "items": [
                {
                    "type": "TextBlock",
                    "text": "Adaptive Cards",
                    "wrap": true,
                    "size": "ExtraLarge",
                    "weight": "Bolder"
                },
                {
                    "type": "TextBlock",
                    "text": "The simple, lightweight card format to power your ideas.",
                    "wrap": true
                }
            ]
        }
    ]
}
```

## How does it work?

Notice the `layouts` property defined on the whole card:

```json
{
    "type": "Layout.AreaGrid",
    "targetWidth": "atLeast:standard",
    "columns": [
        60
    ],
    "areas": [
        {
            "name": "image"
        },
        {
            "name": "text",
            "column": 2
        }
    ]
}
```

Which means:

* Organize elements in the card in a grid layout only when the width of the card is at least "standard" (which corresponds to the typical width of a card in a Teams chat, for example).
  * If the width of the card is less than "standard", use the default layout, namely `Layout.Stack`
* The grid layout has at least one column that should use 60% of the available space. The grid may have other columns (depending on how areas are defined) but because they are not explicitly defined they will each share an equal portion of the remaining space.
* Two areas are defined:
  * One for the image, which implicitly maps to the first column and first row of the grid.
  * One for the text, which will cover the second column and first row.

Now notice how elements in the card's body are assigned a grid area via the `grid.area` property:

```json
{
    "type": "Container",
    "grid.area": "textArea", // The text container is assigned to the textArea
    "items": [
      ...
    ]
}
```

```json
{
    "type": "Image",
    "url": "...",
    "grid.area": "imageArea", // The Image is assigned to the imageArea
    "style": "RoundedCorners",
    "targetWidth": "atLeast:narrow" // Also notice the image is set to not display at all at the "very narrow" width
}
```

## See also
