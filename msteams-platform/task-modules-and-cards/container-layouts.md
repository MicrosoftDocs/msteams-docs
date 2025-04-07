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

> [!IMPORTANT]
>
> This documentation is considered legacy. For comprehensive information and resources related to container layouts in Adaptive Cards, visit the [Adaptive Cards documentation hub](https://adaptivecards.microsoft.com/?topic=container-layouts).
>
> :::image type="content" source="../assets/images/adaptive-cards/new-adaptive-card-hub.png" alt-text="Screenshot shows the home page of the Microsoft Adaptive Cards website.":::
>
> The Adaptive Cards documentation hub offers complete and latest reference documentation, an updated Adaptive Card Designer, built-in JSON examples, design best practices, and a detailed release history of Adaptive Card features. For more information, see [introducing the Adaptive Cards documentation hub and new Adaptive Cards updates](https://devblogs.microsoft.com/microsoft365dev/introducing-the-adaptive-cards-documentation-hub-and-new-adaptive-cards-updates/#:~:text=Explore%20the%20latest%20adaptive%20card%20features%20and%20samples,productivity%E2%80%94all%20seamlessly%20integrated%20into%20your%20users%E2%80%99%20daily%20workflows.).

Containers such as `Container`, `Column`, `TableCell`, or an Adaptive Card itself support three different types of layouts:

* [Layout.Stack](#layoutstack) stacks elements on top of each other and is the default layout.
* [Layout.Flow](#layoutflow) spreads elements horizontally and wraps them across multiple rows, as needed.
* [Layout.AreaGrid](#layoutareagrid) divides the container into named `areas` in to which elements can be placed through the `grid.area` property which can be set on any element.

## Layout.Stack

A layout that stacks elements on top of each other. `Layout.Stack` is the default layout used by an Adaptive Card and all containers.

Here are the properties of the `Layout.Stack` layout:

| Name | Required | Type | Description |
|----|----|----|----|
| `type` | ✔️ | String | Must be `Layout.Stack`. |
| `targetWidth` | | String | Controls the card width for which the layout must be used. If `targetWidth` isn't specified, the element is rendered at all card widths. Using `targetWidth` makes it possible to author responsive cards that adapt their layout to the available horizontal space.<br>For more information, see [Adaptive Card responsive layout](cards/cards-format.md#adaptive-card-responsive-layout).<br>Allowed values: `VeryNarrow`, `Narrow`, `Standard`, `Wide`, `atLeast:VeryNarrow`, `atMost:VeryNarrow`, `atLeast:Narrow`, `atMost:Narrow`, `atLeast:Standard`, `atMost:Standard`, `atLeast:Wide`, `atMost:Wide` |

## Layout.Flow

A layout that spreads elements horizontally and wraps them across multiple rows, as needed.

Use `Layout.Flow` to lay out lists of elements such as images without having to worry about the amount of horizontal space available. The width and alignment of elements can be tuned as desired. Each row automatically gets the appropriate height, and spacing between columns and rows is configurable and automatically enforced.

### Examples

#### Top-left alignment

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

#### Horizontally and vertically centered

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

#### Always fill the available space on each row

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
> Don't use the `maxItemWidth` property with `itemFit: fill`. By definition, `maxItemWidth` prevents items from exceeding a certain width, which is incompatible with filling the remaining available space on a row by slightly enlarging each element in that row. Use the `itemWidth` property instead.

Here are the properties of the `Layout.Stack` layout:

| Name | Type | Default | Description |
|-----------|------|----------|-------------|
| `type` | String |  | Must be `Layout.Stack`. |
| `columnSpacing` | String | "Default" | The space between items.<br>Allowed values: `None`, `ExtraSmall`, `Small`, `Default`, `Medium`, `Large`, `ExtraLarge`, `Padding` |
| `horizontalItemsAlignment` | String| "Center" | Controls how the content of the container must be horizontally aligned.<br>Allowed values: `Left`, `Center`, `Right` |
| `itemFit` | String | "Fit" | Controls how item must fit inside the container.<br>Allowed values: `Fit`, `Fill` |
| `itemWidth` | String | | The width, in pixels, of each item, in the `<number>px` format. Mustn't be used if `maxItemWidth` or `minItemWidth`, or both are set.<br>Allowed values: `<number>px` |
| `maxItemWidth` | String | | The maximum width, in pixels, of each item, in the `<number>px` format. Mustn't be used if `itemWidth` is set.<br>Allowed values: `<number>px` |
| `minItemWidth` | String | 0 | The minimum width, in pixels, of each item, in the `<number>px` format. Mustn't be used if `itemWidth` is set.<br>Allowed values: `<number>px` |
| `rowSpacing` | String | `Default` | The space between rows of items.<br>Allowed values: `None`, `ExtraSmall`, `Small`, `Default`, `Medium`, `Large`, `ExtraLarge`, `Padding` |
| `targetWidth` | String | | Controls for which card width the layout must be used. If `targetWidth` isn't specified, the element is rendered at all card widths. Using `targetWidth` makes it possible to author responsive cards that adapt their layout to the available horizontal space.<br>For more information, see [Adaptive Card responsive layout](cards/cards-format.md#adaptive-card-responsive-layout).<br>Allowed values: `VeryNarrow`, `Narrow`, `Standard`, `Wide`, `atLeast:VeryNarrow`, `atMost:VeryNarrow`, `atLeast:Narrow`, `atMost:Narrow`, `atLeast:Standard`, `atMost:Standard`, `atLeast:Wide`, `atMost:Wide` |
| `verticalItemsAlignment` | String | `Top` | Controls how the content of the container must be vertically aligned.<br>Allowed values: `Top`, `Center`, `Bottom` |

## Layout.AreaGrid

A layout that divides a container into named areas into which elements can be placed.

Use `Layout.AreaGrid` to organize elements in an Adaptive Card, `Container`, `Column`, or `TableCell` into a grid. `Layout.AreaGrid` is useful for designing responsive cards: define multiple `Layout.AreaGrid` layouts on a single container and target them at different card widths to automatically switch from one layout to another at runtime according to the available width. To assign an element in the container to a specific area in the grid, its `grid.area` property must be set.

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

Here are the properties of the `Layout.AreaGrid` layout:

| Name | Type | Default | Description |
|-----------|------|----------|-------------|
| `type` | String |  | Must be `Layout.AreaGrid`. |
| `areas` | Array of objects |  | The areas in the grid layout. <br> Allowed values: `GridArea` |
| `columns` | Array of numbers or strings |  | The columns in the grid layout, defined as a percentage of the available width or in pixels using the `<number>px` format. |
| `columnSpacing` | String | `Default` | The space between columns. <br> Allowed values: `None`, `ExtraSmall`, `Small`, `Default`, `Medium`, `Large`, `ExtraLarge`, `Padding`. |
| `rowSpacing` | String | `Default` | The space between rows. <br> Allowed values: `None`, `ExtraSmall`, `Small`, `Default`, `Medium`, `Large`, `ExtraLarge`, `Padding`.|
| `targetWidth` | String | | Controls for which card width the layout must be used. Mustn't be used if `itemWidth` is set. If `targetWidth` isn't specified, the element is rendered at all card widths. Using `targetWidth` makes it possible to author responsive cards that adapt their layout to the available horizontal space.<br>For more information, see [Adaptive Card responsive layout](cards/cards-format.md#adaptive-card-responsive-layout).<br> Allowed values: `VeryNarrow`, `Narrow`, `Standard`, `Wide`, `atLeast:VeryNarrow`, `atMost:VeryNarrow`, `atLeast:Narrow`, `atMost:Narrow`, `atLeast:Standard`, `atMost:Standard`, `atLeast:Wide`, `atMost:Wide` |

### GridArea

Defines an area in a `Layout.AreaGrid` layout.

Here are the properties of the `GridArea` array:

| Name | Type | Default | Description |
|----|----|----|----|
| `columns` | Number | 1 | The start column index of the area. Column indices start at 1. |
| `columnSpan` | Number | 1 | Defines how many columns the area must span. |
| `name` | String | | The name of the area. To place an element in this area, set its `grid.area` property to match the name of the area. |
| `row` | Number | 1 | The start row index of the area. Row indices start at 1. |
| `rowSpan` | Number | 1 | Defines how many rows the area must span. |

## Using Container layouts to implement responsive layout

Container layouts can be used to implement responsive layouts, as it's possible to associate multiple layouts with a single container, each dedicated to a specific card width. At runtime, the appropriate layout is automatically used to arrange elements in the available width.

For example, if you want to define a card with a typical layout where:

* There's an image on the left
* Text on the right of the image

However, the text must appear below the image when there isn't enough horizontal space.

This can be done using `Layout.AreaGrid`:

# [Card](#tab/card)

:::image type="content" source="../assets/images/adaptive-cards/adaptive-card-container.png" alt-text="Screenshot shows an Adaptive Card in different layouts.":::

# [Payload](#tab/payload)

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

---

### How it works

Here, the `layouts` property is defined on the whole card:

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
  * If the width of the card is less than `standard`, use the default layout, `Layout.Stack`.
* The grid layout has at least one column that must use 60% of the available space. The grid might have other columns (depending on how `areas` are defined) but because they aren't defined, they each share an equal portion of the remaining space.
* Two areas are defined:
  * One for the image, which maps to the first column and first row of the grid.
  * One for the text, which covers the second column and first row.

> [!TIP]
> Specifying the `layouts` property is not required. When no explicit layout is specified, the container will use a `Layout.Stack` layout.

The elements in the card's body are assigned a grid area through the `grid.area` property:

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

## Code sample

| Name | Description |.Node.js | .NET |
|---|---|---|---|
| Cards Formatting | This sample app demonstrates the various container layouts in Adaptive Cards. | [View](https://github.com/OfficeDev/Microsoft-Teams-Samples/tree/main/samples/bot-formatting-cards/nodejs) | [View](https://github.com/OfficeDev/Microsoft-Teams-Samples/tree/main/samples/bot-formatting-cards/csharp) |

## See also

* [Adaptive Card responsive layout](cards/cards-format.md#adaptive-card-responsive-layout)
* [Schema Explorer](https://adaptivecards.microsoft.com/?topic=AdaptiveCard)
