---
title: Charts in Adaptive Cards
description: Learn how to create charts in Adaptive Cards including donut, gauge, vertical bar, horizontal bar, line, and pie charts.
ms.topic: conceptual
ms.author: surbhigupta
ms.date: 11/07/2024
---

# Charts in Adaptive Cards

You can visually represent data through charts in Adaptive Cards. The following types of charts are available in Adaptive Cards:

* [Donut Chart](#donut-chart)
* [Gauge Chart](#gauge-chart)
* [Horizontal Bar Chart](#horizontal-bar-chart)
* [Stacked Horizontal Bar Chart](#stacked-horizontal-bar-chart)
* [Line Chart](#line-chart)
* [Pie Chart](#pie-chart)
* [Vertical Bar Chart](#vertical-bar-chart)
* [Stacked Vertical Bar Chart](#stacked-vertical-bar-chart)

## Donut Chart

You can use the `Chart.Donut` element to add a donut chart in an Adaptive Card. You can use donut charts to represent market share, budget allocation, or sales distribution figures.

:::image type="content" source="../../assets/images/adaptive-cards/adaptive-card-donut-chart.png" alt-text="Screenshot shows a donut chart in an Adaptive Card.":::

```json
{
  "type": "AdaptiveCard",
  "version": "1.5",
  "body": [
    {
      "type": "Chart.Donut",
      "data": [
        {
          "legend": "Pear",
          "value": 59
        },
        {
          "legend": "Banana",
          "value": 292
        },
        {
          "legend": "Apple",
          "value": 143
        },
        {
          "legend": "Peach",
          "value": 98
        },
        {
          "legend": "Kiwi",
          "value": 179
        },
        {
          "legend": "Grapefruit",
          "value": 50
        },
        {
          "legend": "Orange",
          "value": 212
        },
        {
          "legend": "Cantaloupe",
          "value": 68
        }
      ]
    }
  ]
}
```

### Chart.Donut schema

| Property | Required | Type | Description |
|----|----|----|----|
| `type` | ✔️ | String | Must be `Chart.Donut`. |
| `colorSet` | | String | The name of the set of colors to use to render the chart. Refer to chart color schema for more details. |
| `data` | ✔️ | Array of objects | The data to display in the chart. For more information, see [data schema](#data-schema). |
| `fallback` | | Object or String | An alternate element to render if this element is unsupported or if the host application doesn't support all the capabilities specified in the `requires` property.<br>Supported values: `Container`, `ActionSet`, `ColumnSet`, `Media`, `RichTextBlock`, `Table`, `TextBlock`, `FactSet`, `ImageSet`, `Image`, `Input.Text`, `Input.Date`, `Input.Time`, `Input.Number`, `Input.Toggle`, `Input.ChoiceSet`, `Input.Rating`, `Rating`, `CompoundButton`, `Icon`, `Chart.Donut`, `Chart.Pie`, `Chart.VerticalBar.Grouped`, `Chart.VerticalBar`, `Chart.HorizontalBar`, `Chart.HorizontalBar.Stacked`, `Chart.Line`, `Chart.Gauge`, `CodeBlock`, `drop` |
| `grid.area` | | String | The area of a `Layout.AreaGrid` layout in which an element should be displayed. |
| `height` | | String | Specifies the height of the element. When set to `stretch`, the element uses the remaining vertical space in its container.<br>Supported values: `auto`, `stretch`<br>Default value: `auto` |
| `horizontalAlignment` | | String | Determines how the element should be horizontally aligned.<br>Supported values: `Left`, `Center`, `Right` |
| `id` | | String | A unique identifier for the input element. |
| `isVisible` | | Boolean | Determines if the element is visible.<br>Default value: `true` |
| `lang` | | String | The locale associated with the input element. |
| `requires` | | Object | A list of capabilities the element requires the host application to support. If the host application doesn't support at least one of the listed capabilities, the element isn't rendered or its fallback is rendered, if provided.<br>Supported values: `HostCapabilities` |
| `separator` | | Boolean | Determines whether a separator line should be displayed above the element to visually separate it from the previous element. No separator is displayed for the first element in a container, even if this property is set to `true`.<br>Default value: `false` |
| `spacing` | | String | Specifies the amount of space between this element and the previous one. No space is added for the first element in a container.<br>Supported values: `None`, `ExtraSmall`, `Small`, `Default`, `Medium`, `Large`, `ExtraLarge`, `Padding`<br>Default value: `Default` |
| `targetWidth` | | String | Specifies the card width for which the element should be displayed. If `targetWidth` isn't specified, the element is rendered at all card widths.<br>Supported values: `VeryNarrow`, `Narrow`, `Standard`, `Wide`, `atLeast:VeryNarrow`, `atMost:VeryNarrow`, `atLeast:Narrow`, `atMost:Narrow`, `atLeast:Standard`, `atMost:Standard`, `atLeast:Wide`, `atMost:Wide` |
| `title` | | String | The title of the chart. |

#### data schema

| Property | Required | Type | Description |
|----|----|----|----|
|`color` | | String | The color to use for the data point.<br>Supported values: `good`, `warning`, `attention`,
"neutral"
,
"categoricalRed"
,
"categoricalPurple"
,
"categoricalLavender"
,
"categoricalBlue"
,
"categoricalLightBlue"
,
"categoricalTeal"
,
"categoricalGreen"
,
"categoricalLime"
,
"categoricalMarigold"
,
"sequential1"
,
"sequential2"
,
"sequential3"
,
"sequential4"
,
"sequential5"
,
"sequential6"
,
"sequential7"
,
"sequential8"
,
"divergingBlue"
,
"divergingLightBlue"
,
"divergingCyan"
,
"divergingTeal"
,
"divergingYellow"
,
"divergingPeach"
,
"divergingLightRed"
,
"divergingRed"
,
"divergingMaroon"
,
"divergingGray" |

## Gauge Chart

## Horizontal Bar Chart

## Stacked Horizontal Bar Chart

## Line Chart

## Pie Chart

## Vertical Bar Chart

## Stacked Vertical Bar Chart
