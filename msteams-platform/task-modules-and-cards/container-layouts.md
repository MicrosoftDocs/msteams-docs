---
title: Container Layouts in Adaptive Cards
author: surbhigupta
description: Learn about container layouts in Adaptive Cards, including Layout.Flow, Layout.AreaGrid, and Layout.Stack, to create responsive and flexible card designs.
ms.localizationpriority: medium
ms.topic: overview
ms.author: v-sdhakshina
ms.date: 11/07/2024
---

# Container layouts

By default, elements in containers such as `Container`, `Column`, `TableCell`, or an Adaptive Card itself are laid out in a top-to-bottom stack. This type of layout is appropriate for many scenarios, but sometimes it's a bit constraining. To split the horizontal space of a card into different areas, one would typically use the `ColumnSet` element which, while powerful, comes with its set of challenges and gotchas.

Adaptive Cards support two types of layouts that can be applied to any container:

* `Layout.Flow` which spreads elements horizontally and wraps them across multiple rows, as needed,
* `Layout.AreaGrid` which divides the container into named `areas` in to which elements can be placed via the `grid.area` property which can be set on any element. To assign an element in the container to a specific area in the grid, its `grid.area` property should be set.

An explicit `Layout.Stack` layout is also available.

## Layout.Stack

A layout that stacks elements on top of each other. `Layout.Stack` is the default layout used by `AdaptiveCard` and all containers.

Here are the properties of the `Layout.Stack` layout:

| Name | Required | Type | Description |
|----|----|----|----|
| `type` | ✔️ | String | Must be `Layout.Stack`. |
| `targetWidth` | | String | Controls the card width for which the layout should be used.<br>Valid values: `VeryNarrow`, `Narrow`, `Standard`, `Wide`, `atLeast:VeryNarrow`, `atMost:VeryNarrow`, `atLeast:Narrow`, `atMost:Narrow`, `atLeast:Standard`, `atMost:Standard`, `atLeast:Wide`, `atMost:Wide` |

## Layout.Flow

A layout that spreads elements horizontally and wraps them across multiple rows, as needed.

Use `Layout.Flow` to layout lists of elements such as images without having to worry about the amount of horizontal space available. The width and alignment of elements can be tuned as desired. Each row automatically gets the appropriate height, and spacing between columns and rows is configurable and automatically enforced.

### Examples

* **Top-left alignment**

# [Card](#tab/card)

:::image type="content" source="../assets/images/adaptive-cards/adaptive-card-flow-top-left.png" alt-text="Screenshot shows an Adaptive Card container layout with elements stacked top-left.":::

# [Payload](#tab/payload)

```json
{
    "type": "AdaptiveCard",
    "$schema": "https://adaptivecards.io/schemas/adaptive-card.json",
    "version": "1.5",
    "layouts": [
        {
            "type": "Layout.Flow",
            "maxItemWidth": "130px",
            "horizontalItemsAlignment": "Left"
        }
    ],
    "body": [
        {
            "type": "Image",
            "url": "images/guitar1.jpeg",
            "style": "RoundedCorners"
        },
        {
            "type": "Image",
            "url": "images/adaptivecards1.jpeg",
            "style": "RoundedCorners"
        },
        {
            "type": "Image",
            "url": "images/cup1.jpeg",
            "style": "RoundedCorners"
        },
        {
            "type": "Image",
            "url": "images/developer1.jpeg",
            "style": "RoundedCorners"
        },
        {
            "type": "Image",
            "url": "images/painting1.jpeg",
            "style": "RoundedCorners"
        }
    ]
}
```

---

* **Horizontally and vertically centered**

# [Card](#tab/card)

:::image type="content" source="../assets/images/adaptive-cards/adaptive-card-flow-center.png" alt-text="Screenshot shows an Adaptive Card with a horizontally and vertically centered container layout.":::

# [Payload](#tab/payload)

```json
{
    "type": "AdaptiveCard",
    "$schema": "https://adaptivecards.io/schemas/adaptive-card.json",
    "version": "1.5",
    "layouts": [
        {
            "type": "Layout.Flow",
            "maxItemWidth": "80px",
            "horizontalItemsAlignment": "center",
            "verticalItemsAlignment": "center"
        }
    ],
    "body": [
        {
            "type": "Image",
            "url": "images/guitar1.jpeg",
            "style": "RoundedCorners"
        },
        {
            "type": "Image",
            "url": "images/adaptivecards1.jpeg",
            "style": "RoundedCorners"
        },
        {
            "type": "Image",
            "url": "images/painting1.jpeg",
            "style": "RoundedCorners"
        },
        {
            "type": "Image",
            "url": "images/cup1.jpeg",
            "style": "RoundedCorners"
        }
    ]
}

```

---

* **Always fill the available space on each row**

# [Card](#tab/card)

:::image type="content" source="../assets/images/adaptive-cards/adaptive-card-flow-fill.png" alt-text="Screenshot shows an Adaptive Card with a filled container layout.":::

# [Payload](#tab/payload)

```json
{
    "type": "AdaptiveCard",
    "version": "1.5",
    "layouts": [
        {
            "type": "Layout.Flow",
            "itemWidth": "150px",
            "itemFit": "Fill",
            "horizontalItemsAlignment": "Left"
        }
    ],
    "body": [
        {
            "type": "Image",
            "url": "images/guitar1.jpeg",
            "style": "RoundedCorners"
        },
        {
            "type": "Image",
            "url": "images/adaptivecards1.jpeg",
            "style": "RoundedCorners"
        },
        {
            "type": "Image",
            "url": "images/painting1.jpeg",
            "style": "RoundedCorners"
        },
        {
            "type": "Image",
            "url": "images/guitar2.jpeg",
            "style": "RoundedCorners"
        }
    ]
}

```

---

> [!TIP]
> Don't use the `maxItemWidth` property with `"itemFit": "fill"`. By definition, `maxItemWidth` prevents items from exceeding a certain width, which is incompatible with filling the remaining available space on a row by slightly enlarging each element in that row. Use the `itemWidth` property instead.

### Schema

| Name | Type | Default | Description |
|-----------|------|----------|-------------|
| type | string |  | Must be **Layout.Stack**. |
| columnSpacing | string | "Default" | The space between items. <br> Valid values: `"None"`, `"ExtraSmall"`, `"Small"`, `"Default"`, `"Medium"`, `"Large"`, `"ExtraLarge"`, `"Padding"`.|
| horizontalItemsAlignment | string| "Center" | Controls how the content of the container should be horizontally aligned. <br> Valid values: `"Left"`, `"Center"`, `"Right"`. |
| itemFit | string | "Fit" | Controls how item should fit inside the container. <br> Valid values: `"Fit"`, `"Fill"`. |
| itemWidth | string | | The width, in pixels, of each item, in the `<number>px` format. Should not be used if maxItemWidth and/or minItemWidth are set. <br> Valid values: `"<number>px"` |
| maxItemWidth | string | | The maximum width, in pixels, of each item, in the `<number>px` format. Should not be used if itemWidth is set. <br> Valid values: `"<number>px"` |
| minItemWidth | string | 0 | The minimum width, in pixels, of each item, in the `<number>px` format. Should not be used if itemWidth is set.<br>Valid values: `"<number>px"` |
| rowSpacing | string | "Default" | The space between rows of items. <br> Valid values: `"None"`, `"ExtraSmall"`, `"Small"`, `"Default"`, `"Medium"`, `"Large"`, `"ExtraLarge"`, `"Padding"` |
| targetWidth | string | | Controls for which card width the layout should be used. <br> Valid values: `"VeryNarrow"`, `"Narrow"`, `"Standard"`, `"Wide"`, `"atLeast:VeryNarrow"`, `"atMost:VeryNarrow"`, `"atLeast:Narrow"`, `"atMost:Narrow"`, `"atLeast:Standard"`, `"atMost:Standard"`, `"atLeast:Wide"`, `"atMost:Wide"` |
| verticalItemsAlignment | string | "Top" | Controls how the content of the container should be vertically aligned. <br> Valid values: `"Top"`, `"Center"`, `"Bottom"` |

## Layout.AreaGrid

A layout that divides a container into named areas into which elements can be placed.

Use `Layout.AreaGrid` to easily organize elements in a container (be it the Adaptive Card itself, a `Container`, a `Column` or a `TableCell`) into a grid. `Layout.AreaGrid` is particularly useful for easily designing responsive cards: define multiple `Layout.AreaGrid` layouts on a single container and target them at different card widths to automatically switch from one layout to another at runtime according to the available width.

### Example

# [Card](#tab/card)

:::image type="content" source="../assets/images/adaptive-cards/adaptive-card-area-grid.png" alt-text="Screenshot shows an Adaptive Card container with an area grid layout.":::

# [Payload](#tab/payload)

```json
{
    "type": "AdaptiveCard",
    "version": "1.5",
    "layouts": [
                {
            "type": "Layout.AreaGrid",
            "targetWidth": "atLeast:Standard",
            "columns": [ 20, 40 ],
            "areas": [
                {
                    "name": "area1",
                    "columnSpan": 2
                },
                {
                    "name": "area2",
                    "column": 3
                },
                {
                    "name": "area3",
                    "row": 2
                },
                {
                    "name": "area4",
                    "column": 2,
                    "row": 2
                },
                {
                    "name": "area5",
                    "column": 3,
                    "row": 2
                }
            ]
        },
        {
            "type": "Layout.AreaGrid",
            "targetWidth": "atLeast:narrow",
            "columns": [
                50
            ],
            "areas": [
                {
                    "name": "area1",
                    "columnSpan": 2
                },
                {
                    "name": "area2",
                    "row": 2
                },
                {
                    "name": "area3",
                    "row": 2,
                    "column": 2
                },
                {
                    "name": "area4",
                    "row": 3
                },
                {
                    "name": "area5",
                    "row": 3,
                    "column": 2
                }
            ]
        }
    ],
    "body": [
        {
            "type": "Container",
            "grid.area": "area1",
            "style": "emphasis",
            "showBorder": true,
            "roundedCorners": true,
            "items": [
                {
                    "type": "TextBlock",
                    "text": "Area 1",
                    "wrap": true
                },
                {
                    "type": "TextBlock",
                    "text": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
                    "wrap": true
                }
            ]
        },
        {
            "type": "Container",
            "grid.area": "area2",
            "style": "good",
            "showBorder": true,
            "roundedCorners": true,
            "items": [
                {
                    "type": "TextBlock",
                    "text": "Area 2",
                    "wrap": true
                }
            ],
            "height": "stretch"
        },
        {
            "type": "Container",
            "grid.area": "area3",
            "style": "accent",
            "showBorder": true,
            "roundedCorners": true,
            "items": [
                {
                    "type": "TextBlock",
                    "text": "Area 3",
                    "wrap": true
                }
            ]
        },
        {
            "type": "Container",
            "grid.area": "area4",
            "style": "attention",
            "showBorder": true,
            "roundedCorners": true,
            "items": [
                {
                    "type": "TextBlock",
                    "text": "Area 4",
                    "wrap": true
                }
            ]
        },
        {
            "type": "Container",
            "grid.area": "area5",
            "style": "warning",
            "showBorder": true,
            "roundedCorners": true,
            "items": [
                {
                    "type": "TextBlock",
                    "text": "Area 5",
                    "wrap": true
                }
            ]
        }
    ]
}
```

---

### Schema

| Name | Type | Default | Description |
|-----------|------|----------|-------------|
| type | `string` |  | Must be **Layout.AreaGrid**. |
| areas | Array of `object` |  | The areas in the grid layout. <br> Valid values: `"GridArea"` |
| columns | Array of `number` `string` |  | The columns in the grid layout, defined as a percentage of the available width or in pixels using the `<number>px` format. |
| columnSpacing | `string` | `"Default"` | The space between columns. <br> Valid values: `"None"`, `"ExtraSmall"`, `"Small"`, `"Default"`, `"Medium"`, `"Large"`, `"ExtraLarge"`, `"Padding"`. |
| rowSpacing | `string` | `"Default"` | The space between rows. <br> Valid values: `"None"`, `"ExtraSmall"`, `"Small"`, `"Default"`, `"Medium"`, `"Large"`, `"ExtraLarge"`, `"Padding"`.|
| targetWidth | `string` | | Controls for which card width the layout should be used. Should not be used if `itemWidth` is set. <br> Valid values: `"VeryNarrow"`, `"Narrow"`, `"Standard"`, `"Wide"`, `"atLeast:VeryNarrow"`, `"atMost:VeryNarrow"`, `"atLeast:Narrow"`, `"atMost:Narrow"`, `"atLeast:Standard"`, `"atMost:Standard"`, `"atLeast:Wide"`, `"atMost:Wide"` |

### GridArea

Defines an area in a `Layout.AreaGrid` layout.

#### Schema

| Name | Type | Default | Description |
|-----------|------|----------|-------------|
| columns | `number` | 1 | The start column index of the area. Column indices start at 1. |
| columnSpan | `number` | 1 | Defines how many columns the area should span. |
| name | `string` | | The name of the area. To place an element in this area, set its `grid.area` property to match the name of the area. |
| row | `number` | 1 | The start row index of the area. Row indices start at 1. |
| rowSpan | `number` | 1 | Defines how many rows the area should span. |

## Using Container layouts to implement responsive layout

Container layouts can be used to easily implement responsive layouts, as it's possible to associate multiple layouts with a single container, each dedicated to a specific card width. At runtime, the appropriate layout is automatically used to optimally arrange elements given the available width.

Let's say we want to define a card with a typical layout:

* An image on the left,
* And some text on the right of the image.

But, we want the text to show below the image when there isn't enough horizontal space.

This can be done easily using `Layout.AreaGrid`:

:::image type="content" source="../assets/images/adaptive-cards/adaptive-card-container.png" alt-text="Screenshot shows an Adaptive Card in different layouts.":::

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

* Organize elements in the card in a grid layout only when the width of the card is at least `standard` (which corresponds to the typical width of a card in a Teams chat, for example).
  * If the width of the card is less than `standard`, use the default layout, namely `Layout.Stack`
* The grid layout has at least one column that should use 60% of the available space. The grid might have other columns (depending on how `areas` are defined) but because they aren't explicitly defined they each share an equal portion of the remaining space.
* Two areas are defined:
  * One for the image, which implicitly maps to the first column and first row of the grid.
  * One for the text, which will cover the second column and first row.

Notice how elements in the card's body are assigned a grid area through the `grid.area` property:

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

* [Adaptive Card responsive layout](cards/cards-format.md#adaptive-card-responsive-layout)
* [Schema Explorer](https://adaptivecards.io/explorer/AdaptiveCard.html)
