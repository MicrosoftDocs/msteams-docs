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
* [Grouped Vertical Bar Chart](#grouped-vertical-bar-chart)

## Donut Chart

You can use the `Chart.Donut` element to add a donut chart in an Adaptive Card. You can use donut charts to represent market share, budget allocation, or sales distribution figures.

:::image type="content" source="../../assets/images/adaptive-cards/charts/donut-chart.png" alt-text="Screenshot shows a donut chart in an Adaptive Card.":::

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
|`color` | | String | The color to use for the data point.<br>Supported values: `good`, `warning`, `attention`,`good`,`warning`,`attention`,`neutral`,`categoricalRed`,`categoricalPurple`,`categoricalLavender`,`categoricalBlue`,`categoricalLightBlue`,`categoricalTeal`,`categoricalGreen`,`categoricalLime`,`categoricalMarigold`,`sequential1`,`sequential2`,`sequential3`,`sequential4`,`sequential5`,`sequential6`,`sequential7`,`sequential8`,`divergingBlue`,`divergingLightBlue`,`divergingCyan`,`divergingTeal`,`divergingYellow`,`divergingPeach`,`divergingLightRed`,`divergingRed`,`divergingMaroon`,`divergingGray``divergingGray`|

## Gauge Chart

:::image type="content" source="../../assets/images/adaptive-cards/charts/guage-chart.png" alt-text="Screenshot shows a guage chart in an Adaptive Card.":::

```json
{
  "type": "AdaptiveCard",
  "version": "1.5",
  "body": [
    {
      "type": "TextBlock",
      "text": "Basic",
      "size": "extraLarge"
    },
    {
      "type": "Chart.Gauge",
      "value": 50,
      "segments": [
        {
          "legend": "Low risk",
          "size": 33,
          "color": "good"
        },
        {
          "legend": "Medium risk",
          "size": 34,
          "color": "warning"
        },
        {
          "legend": "High risk",
          "size": 33,
          "color": "attention"
        }
      ]
    },
    {
      "type": "TextBlock",
      "text": "Single value",
      "size": "extraLarge",
      "spacing": "large",
      "separator": true
    },
    {
      "type": "Chart.Gauge",
      "value": 35,
      "valueFormat": "fraction",
      "segments": [
        {
          "legend": "Used",
          "size": 35
        },
        {
          "legend": "Unused",
          "size": 65,
          "color": "neutral"
        }
      ]
    }
  ]
}

```

### Chart.Gauage schema

| Property | Required | Type | Description |
|----|----|----|----|
| `type` | ✔️ | String | Must be `Chart.Guage`. |
| `colorSet` | | String | The name of the set of colors to use to render the chart. Refer to chart color schema for more details. |
| `fallback` | | Object or String | An alternate element to render if this element is unsupported or if the host application doesn't support all the capabilities specified in the `requires` property.<br>Supported values: `Container`, `ActionSet`, `ColumnSet`, `Media`, `RichTextBlock`, `Table`, `TextBlock`, `FactSet`, `ImageSet`, `Image`, `Input.Text`, `Input.Date`, `Input.Time`, `Input.Number`, `Input.Toggle`, `Input.ChoiceSet`, `Input.Rating`, `Rating`, `CompoundButton`, `Icon`, `Chart.Donut`, `Chart.Pie`, `Chart.VerticalBar.Grouped`, `Chart.VerticalBar`, `Chart.HorizontalBar`, `Chart.HorizontalBar.Stacked`, `Chart.Line`, `Chart.Gauge`, `CodeBlock`, `drop` |
| `grid.area` | | String | The area of a `Layout.AreaGrid` layout in which an element should be displayed. |
| `height` | | String | Specifies the height of the element. When set to `stretch`, the element uses the remaining vertical space in its container.<br>Supported values: `auto`, `stretch`<br>Default value: `auto` |
| `horizontalAlignment` | | String | Determines how the element should be horizontally aligned.<br>Supported values: `Left`, `Center`, `Right` |
| `id` | | String | A unique identifier for the input element. |
| `isVisible` | | Boolean | Determines if the element is visible.<br>Default value: `true` |
| `lang` | | String | The locale associated with the input element. |
| `max` | | Number | The maximum value of the gauge. |
| `min` | | Number | The minimum value of the gauge. |
| `requires` | | Object | A list of capabilities the element requires the host application to support. If the host application doesn't support at least one of the listed capabilities, the element isn't rendered or its fallback is rendered, if provided.<br>Supported values: `HostCapabilities` |
| `segments` | | Array of Object | The segments to display in the gauge. <br>Supported value: `GaugeChartLegend`|
| `separator` | | Boolean | Determines whether a separator line should be displayed above the element to visually separate it from the previous element. No separator is displayed for the first element in a container, even if this property is set to `true`.<br>Default value: `false` |
| `showLegend` | | Boolean | Determines if the legend should be displayed.<br>Default value: `true` |
| `showMinMax` | | Boolean | Determines if the min/max values should be displayed.<br>Default value: `true` |
| `spacing` | | String | Specifies the amount of space between this element and the previous one. No space is added for the first element in a container.<br>Supported values: `None`, `ExtraSmall`, `Small`, `Default`, `Medium`, `Large`, `ExtraLarge`, `Padding`<br>Default value: `Default` |
| `subLabel` | | String | The sub-label of the gauge. |
| `targetWidth` | | String | Specifies the card width for which the element should be displayed. If `targetWidth` isn't specified, the element is rendered at all card widths. Using targetWidth makes it possible to author responsive cards that adapt their layout to the available horizontal space. <br>Supported values: `VeryNarrow`, `Narrow`, `Standard`, `Wide`, `atLeast:VeryNarrow`, `atMost:VeryNarrow`, `atLeast:Narrow`, `atMost:Narrow`, `atLeast:Standard`, `atMost:Standard`, `atLeast:Wide`, `atMost:Wide` |
| `title` | | String | The title of the chart. |
| `value` | | Number | The value of the gauge.<br>Default value: 0|
| `valueFormat` | | String | The format used to display the gauge's value.<br>Supported values: `Percentage`, `Fraction`<br>Default value: `Percentage` |

## Horizontal Bar Chart

:::image type="content" source="../../assets/images/adaptive-cards/charts/horizontalbar-chart.png" alt-text="Screenshot shows a horizontal bar chart in an Adaptive Card.":::

```json
{
  "type": "AdaptiveCard",
  "version": "1.5",
  "body": [
    {
      "type": "TextBlock",
      "text": "Standard with displayMode = AbsoluteWithAxis",
      "size": "large"
    },
    {
      "type": "Chart.HorizontalBar",
      "title": "Sample",
      "xAxisTitle": "Days",
      "yAxisTitle": "Sales",
      "colorSet": "diverging",
      "data": [
        {
          "x": "Pear",
          "y": 59
        },
        {
          "x": "Banana",
          "y": 292
        },
        {
          "x": "Apple",
          "y": 143
        },
        {
          "x": "Peach",
          "y": 98
        },
        {
          "x": "Kiwi",
          "y": 179
        },
        {
          "x": "Grapefruit",
          "y": 20
        }
      ]
    },
    {
      "type": "TextBlock",
      "text": "Standard with displayMode = AbsoluteNoAxis",
      "size": "large",
      "spacing": "large",
      "separator": true
    },
    {
      "type": "Chart.HorizontalBar",
      "title": "Sample",
      "displayMode": "AbsoluteNoAxis",
      "data": [
        {
          "x": "Pear",
          "y": 59
        },
        {
          "x": "Banana",
          "y": 292
        },
        {
          "x": "Apple",
          "y": 143
        },
        {
          "x": "Peach",
          "y": 98
        },
        {
          "x": "Kiwi",
          "y": 179
        },
        {
          "x": "Grapefruit",
          "y": 20
        }
      ]
    },
    {
      "type": "TextBlock",
      "text": "Standard with displayMode = PartToWhole",
      "size": "large",
      "spacing": "large",
      "separator": true
    },
    {
      "type": "TextBlock",
      "text": "Learning - Have you defined your goal for today's Day of learning"
    },
    {
      "type": "Chart.HorizontalBar",
      "title": "Sample",
      "displayMode": "PartToWhole",
      "color": "categoricalPurple",
      "data": [
        {
          "x": "Yes, I have defined my day of learning goal",
          "y": 15
        },
        {
          "x": "No, I haven't yet had time to do it",
          "y": 24
        },
        {
          "x": "I am not interested in learning",
          "y": 2
        }
      ]
    }
  ]
}

```
### Chart.HorizontalBar schema

| Property | Required | Type | Description |
|----|----|----|----|
| `type` | ✔️ | String | Must be `Chart.HorizontalBar`. |
| `color` | | String | The color to use for all data points. Refer to chart color schema for more details. <br>Supported values:`good`,`warning`,`attention`,`neutral`,`categoricalRed`,`categoricalPurple`,`categoricalLavender`,`categoricalBlue`,`categoricalLightBlue`,`categoricalTeal`,`categoricalGreen`,`categoricalLime`,`categoricalMarigold`,`sequential1`,`sequential2`,`sequential3`,`sequential4`,`sequential5`,`sequential6`,`sequential7`,`sequential8`,`divergingBlue`,`divergingLightBlue`,`divergingCyan`,`divergingTeal`,`divergingYellow`,`divergingPeach`,`divergingLightRed`,`divergingRed`,`divergingMaroon`,`divergingGray``divergingGray`|
| `colorSet` | | String | The name of the set of colors to use to render the chart. Refer to chart color schema for more details. |
| `data` | | Array of Object | The data points in the chart.<br>Supported value: `HorizontalBarChartDataValue` |
| `displayMode` | | String | Determines how the chart should be visually laid out. <br>Supported values: `AbsoluteWithAxis`,`AbsoluteNoAxis`,`PartToWhole` <br>Default value: `AbsoluteWithAxis` |
| `fallback` | | Object or String | An alternate element to render if this element is unsupported or if the host application doesn't support all the capabilities specified in the `requires` property.<br>Supported values: `Container`, `ActionSet`, `ColumnSet`, `Media`, `RichTextBlock`, `Table`, `TextBlock`, `FactSet`, `ImageSet`, `Image`, `Input.Text`, `Input.Date`, `Input.Time`, `Input.Number`, `Input.Toggle`, `Input.ChoiceSet`, `Input.Rating`, `Rating`, `CompoundButton`, `Icon`, `Chart.Donut`, `Chart.Pie`, `Chart.VerticalBar.Grouped`, `Chart.VerticalBar`, `Chart.HorizontalBar`, `Chart.HorizontalBar.Stacked`, `Chart.Line`, `Chart.Gauge`, `CodeBlock`, `drop` |
| `grid.area` | | String | The area of a `Layout.AreaGrid` layout in which an element should be displayed. |
| `height` | | String | Specifies the height of the element. When set to `stretch`, the element uses the remaining vertical space in its container.<br>Supported values: `auto`, `stretch`<br>Default value: `auto` |
| `horizontalAlignment` | | String | Determines how the element should be horizontally aligned.<br>Supported values: `Left`, `Center`, `Right` |
| `id` | | String | A unique identifier for the input element or action. |
| `isVisible` | | Boolean | Determines if the element is visible.<br>Default value: `true` |
| `lang` | | String | The locale associated with the input element. |
| `requires` | | Object | A list of capabilities the element requires the host application to support. If the host application doesn't support at least one of the listed capabilities, the element isn't rendered or its fallback is rendered, if provided.<br>Supported value: `HostCapabilities` |
| `separator` | | Boolean | Determines whether a separator line should be displayed above the element to visually separate it from the previous element. No separator is displayed for the first element in a container, even if this property is set to `true`.<br>Default value: `false`|
| `spacing` | | String | Specifies the amount of space between this element and the previous one. No space is added for the first element in a container.<br>Supported values: `None`, `ExtraSmall`, `Small`, `Default`, `Medium`, `Large`, `ExtraLarge`, `Padding`<br>Default value: `Default` |
| `targetWidth` | | String | Specifies the card width for which the element should be displayed. If `targetWidth` isn't specified, the element is rendered at all card widths. Using targetWidth makes it possible to author responsive cards that adapt their layout to the available horizontal space. <br>Supported values: `VeryNarrow`, `Narrow`, `Standard`, `Wide`, `atLeast:VeryNarrow`, `atMost:VeryNarrow`, `atLeast:Narrow`, `atMost:Narrow`, `atLeast:Standard`, `atMost:Standard`, `atLeast:Wide`, `atMost:Wide` |
| `title` | | String | The title of the chart. |
| `xAxisTitle` | | String | The title of the x axis.|
| `yAxisTitle` | | String | The title of the y axis. |

## Stacked Horizontal Bar Chart

:::image type="content" source="../../assets/images/adaptive-cards/charts/horizontalbar-stacked-chart.png" alt-text="Screenshot shows a stacked horizontal bar chart in an Adaptive Card.":::

```json
{
  "type": "AdaptiveCard",
  "version": "1.5",
  "body": [
    {
      "type": "Chart.HorizontalBar.Stacked",
      "title": "Sample",
      "data": [
        {
          "title": "Outlook",
          "data": [
            {
              "legend": "2023-05-01",
              "value": 24,
              "color": "good"
            },
            {
              "legend": "2023-05-02",
              "value": 27,
              "color": "warning"
            },
            {
              "legend": "2023-05-03",
              "value": 18,
              "color": "attention"
            }
          ]
        },
        {
          "title": "Teams",
          "data": [
            {
              "legend": "2023-05-01",
              "value": 9,
              "color": "good"
            },
            {
              "legend": "2023-05-02",
              "value": 100,
              "color": "warning"
            },
            {
              "legend": "2023-05-03",
              "value": 22,
              "color": "attention"
            }
          ]
        }
      ]
    }
  ]
}

```
### Chart.HorizontalBar.Stacked  schema

| Property | Required | Type | Description |
|----|----|----|----|
| `type` | ✔️ | String | Must be `Chart.HorizontalBar.Stacked`. |
| `color` | | String | The color to use for all data points. Refer to chart color schema for more details. <br>Supported values:`good`,`warning`,`attention`,`neutral`,`categoricalRed`,`categoricalPurple`,`categoricalLavender`,`categoricalBlue`,`categoricalLightBlue`,`categoricalTeal`,`categoricalGreen`,`categoricalLime`,`categoricalMarigold`,`sequential1`,`sequential2`,`sequential3`,`sequential4`,`sequential5`,`sequential6`,`sequential7`,`sequential8`,`divergingBlue`,`divergingLightBlue`,`divergingCyan`,`divergingTeal`,`divergingYellow`,`divergingPeach`,`divergingLightRed`,`divergingRed`,`divergingMaroon`,`divergingGray``divergingGray`|
| `colorSet` | | String | The name of the set of colors to use to render the chart. Refer to chart color schema for more details. |
| `data` | | Array of Object | The data points in the chart.<br>Supported value: `HorizontalBarChartDataValue` |
| `fallback` | | Object or String | An alternate element to render if this element is unsupported or if the host application doesn't support all the capabilities specified in the `requires` property.<br>Supported values: `Container`, `ActionSet`, `ColumnSet`, `Media`, `RichTextBlock`, `Table`, `TextBlock`, `FactSet`, `ImageSet`, `Image`, `Input.Text`, `Input.Date`, `Input.Time`, `Input.Number`, `Input.Toggle`, `Input.ChoiceSet`, `Input.Rating`, `Rating`, `CompoundButton`, `Icon`, `Chart.Donut`, `Chart.Pie`, `Chart.VerticalBar.Grouped`, `Chart.VerticalBar`, `Chart.HorizontalBar`, `Chart.HorizontalBar.Stacked`, `Chart.Line`, `Chart.Gauge`, `CodeBlock`, `drop` |
| `grid.area` | | String | The area of a `Layout.AreaGrid` layout in which an element should be displayed. |
| `height` | | String | Specifies the height of the element. When set to `stretch`, the element uses the remaining vertical space in its container.<br>Supported values: `auto`, `stretch`<br>Default value: `auto` |
| `horizontalAlignment` | | String | Determines how the element should be horizontally aligned.<br>Supported values: `Left`, `Center`, `Right` |
| `id` | | String | A unique identifier for the input element or action. |
| `isVisible` | | Boolean | Determines if the element is visible.<br>Default value: `true` |
| `lang` | | String | The locale associated with the input element. |
| `requires` | | Object | A list of capabilities the element requires the host application to support. If the host application doesn't support at least one of the listed capabilities, the element isn't rendered or its fallback is rendered, if provided.<br>Supported value: `HostCapabilities` |
| `separator` | | Boolean | Determines whether a separator line should be displayed above the element to visually separate it from the previous element. No separator is displayed for the first element in a container, even if this property is set to `true`.<br>Default value: `false`|
| `spacing` | | String | Specifies the amount of space between this element and the previous one. No space is added for the first element in a container.<br>Supported values: `None`, `ExtraSmall`, `Small`, `Default`, `Medium`, `Large`, `ExtraLarge`, `Padding`<br>Default value: `Default` |
| `targetWidth` | | String | Specifies the card width for which the element should be displayed. If `targetWidth` isn't specified, the element is rendered at all card widths. Using targetWidth makes it possible to author responsive cards that adapt their layout to the available horizontal space. <br>Supported values: `VeryNarrow`, `Narrow`, `Standard`, `Wide`, `atLeast:VeryNarrow`, `atMost:VeryNarrow`, `atLeast:Narrow`, `atMost:Narrow`, `atLeast:Standard`, `atMost:Standard`, `atLeast:Wide`, `atMost:Wide` |
| `title` | | String | The title of the chart. |
| `xAxisTitle` | | String | The title of the x axis.|
| `yAxisTitle` | | String | The title of the y axis. |

## Line Chart

:::image type="content" source="../../assets/images/adaptive-cards/charts/line-chart.png" alt-text="Screenshot shows a line chart in an Adaptive Card.":::

```json
{
  "type": "AdaptiveCard",
  "version": "1.5",
  "body": [
    {
      "type": "Chart.Line",
      "title": "Sample",
      "xAxisTitle": "Days",
      "yAxisTitle": "Sales",
      "colorSet": "categorical",
      "data": [
        {
          "legend": "Outlook",
          "values": [
            {
              "x": "2023-05-01",
              "y": 99
            },
            {
              "x": "2023-05-02",
              "y": 6
            },
            {
              "x": "2023-05-03",
              "y": 63
            },
            {
              "x": "2023-05-04",
              "y": 64
            },
            {
              "x": "2023-05-05",
              "y": 63
            },
            {
              "x": "2023-05-06",
              "y": 78
            }
          ]
        },
        {
          "legend": "Teams",
          "values": [
            {
              "x": "2023-05-01",
              "y": 12
            },
            {
              "x": "2023-05-02",
              "y": 82
            },
            {
              "x": "2023-05-03",
              "y": 12
            },
            {
              "x": "2023-05-04",
              "y": 33
            },
            {
              "x": "2023-05-05",
              "y": 1
            },
            {
              "x": "2023-05-06",
              "y": 80
            }
          ]
        },
        {
          "legend": "Office",
          "values": [
            {
              "x": "2023-05-01",
              "y": 66
            },
            {
              "x": "2023-05-02",
              "y": 93
            },
            {
              "x": "2023-05-03",
              "y": 65
            },
            {
              "x": "2023-05-04",
              "y": 13
            },
            {
              "x": "2023-05-05",
              "y": 90
            },
            {
              "x": "2023-05-06",
              "y": 48
            }
          ]
        },
        {
          "legend": "Windows",
          "values": [
            {
              "x": "2023-05-01",
              "y": 9
            },
            {
              "x": "2023-05-02",
              "y": 19
            },
            {
              "x": "2023-05-03",
              "y": 0
            },
            {
              "x": "2023-05-04",
              "y": 61
            },
            {
              "x": "2023-05-05",
              "y": 21
            },
            {
              "x": "2023-05-06",
              "y": 72
            }
          ]
        },
        {
          "legend": "Exchange",
          "values": [
            {
              "x": "2023-05-01",
              "y": 35
            },
            {
              "x": "2023-05-02",
              "y": 11
            },
            {
              "x": "2023-05-03",
              "y": 91
            },
            {
              "x": "2023-05-04",
              "y": 97
            },
            {
              "x": "2023-05-05",
              "y": 97
            },
            {
              "x": "2023-05-06",
              "y": 45
            }
          ]
        },
        {
          "legend": "SharePoint",
          "values": [
            {
              "x": "2023-05-01",
              "y": 26
            },
            {
              "x": "2023-05-02",
              "y": 99
            },
            {
              "x": "2023-05-03",
              "y": 16
            },
            {
              "x": "2023-05-04",
              "y": 26
            },
            {
              "x": "2023-05-05",
              "y": 91
            },
            {
              "x": "2023-05-06",
              "y": 22
            }
          ]
        },
        {
          "legend": "Copilot",
          "values": [
            {
              "x": "2023-05-01",
              "y": 96
            },
            {
              "x": "2023-05-02",
              "y": 37
            },
            {
              "x": "2023-05-03",
              "y": 27
            },
            {
              "x": "2023-05-04",
              "y": 5
            },
            {
              "x": "2023-05-05",
              "y": 45
            },
            {
              "x": "2023-05-06",
              "y": 59
            }
          ]
        }
      ]
    }
  ]
}
```
### Chart.Line schema

| Property | Required | Type | Description |
|----|----|----|----|
| `type` | ✔️ | String | Must be `Chart.Line`. |
| `color` | | String | The color to use for all data points. Refer to chart color schema for more details. <br>Supported values:`good`,`warning`,`attention`,`neutral`,`categoricalRed`,`categoricalPurple`,`categoricalLavender`,`categoricalBlue`,`categoricalLightBlue`,`categoricalTeal`,`categoricalGreen`,`categoricalLime`,`categoricalMarigold`,`sequential1`,`sequential2`,`sequential3`,`sequential4`,`sequential5`,`sequential6`,`sequential7`,`sequential8`,`divergingBlue`,`divergingLightBlue`,`divergingCyan`,`divergingTeal`,`divergingYellow`,`divergingPeach`,`divergingLightRed`,`divergingRed`,`divergingMaroon`,`divergingGray``divergingGray`|
| `colorSet` | | String | The name of the set of colors to use to render the chart. Refer to chart color schema for more details. |
| `data` | | Array of Object | The data points in the chart.<br>Supported value: `HorizontalBarChartDataValue` |
| `fallback` | | Object or String | An alternate element to render if this element is unsupported or if the host application doesn't support all the capabilities specified in the `requires` property.<br>Supported values: `Container`, `ActionSet`, `ColumnSet`, `Media`, `RichTextBlock`, `Table`, `TextBlock`, `FactSet`, `ImageSet`, `Image`, `Input.Text`, `Input.Date`, `Input.Time`, `Input.Number`, `Input.Toggle`, `Input.ChoiceSet`, `Input.Rating`, `Rating`, `CompoundButton`, `Icon`, `Chart.Donut`, `Chart.Pie`, `Chart.VerticalBar.Grouped`, `Chart.VerticalBar`, `Chart.HorizontalBar`, `Chart.HorizontalBar.Stacked`, `Chart.Line`, `Chart.Gauge`, `CodeBlock`, `drop` |
| `grid.area` | | String | The area of a `Layout.AreaGrid` layout in which an element should be displayed. |
| `height` | | String | Specifies the height of the element. When set to `stretch`, the element uses the remaining vertical space in its container.<br>Supported values: `auto`, `stretch`<br>Default value: `auto` |
| `horizontalAlignment` | | String | Determines how the element should be horizontally aligned.<br>Supported values: `Left`, `Center`, `Right` |
| `id` | | String | A unique identifier for the input element or action. |
| `isVisible` | | Boolean | Determines if the element is visible.<br>Default value: `true` |
| `lang` | | String | The locale associated with the input element. |
| `requires` | | Object | A list of capabilities the element requires the host application to support. If the host application doesn't support at least one of the listed capabilities, the element isn't rendered or its fallback is rendered, if provided.<br>Supported value: `HostCapabilities` |
| `separator` | | Boolean | Determines whether a separator line should be displayed above the element to visually separate it from the previous element. No separator is displayed for the first element in a container, even if this property is set to `true`.<br>Default value: `false`|
| `spacing` | | String | Specifies the amount of space between this element and the previous one. No space is added for the first element in a container.<br>Supported values: `None`, `ExtraSmall`, `Small`, `Default`, `Medium`, `Large`, `ExtraLarge`, `Padding`<br>Default value: `Default` |
| `targetWidth` | | String | Specifies the card width for which the element should be displayed. If `targetWidth` isn't specified, the element is rendered at all card widths. Using targetWidth makes it possible to author responsive cards that adapt their layout to the available horizontal space. <br>Supported values: `VeryNarrow`, `Narrow`, `Standard`, `Wide`, `atLeast:VeryNarrow`, `atMost:VeryNarrow`, `atLeast:Narrow`, `atMost:Narrow`, `atLeast:Standard`, `atMost:Standard`, `atLeast:Wide`, `atMost:Wide` |
| `title` | | String | The title of the chart. |
| `xAxisTitle` | | String | The title of the x axis.|
| `yAxisTitle` | | String | The title of the y axis. |

## Pie Chart

:::image type="content" source="../../assets/images/adaptive-cards/charts/pie-chart.png" alt-text="Screenshot shows a pie chart in an Adaptive Card.":::

```json
{
  "type": "AdaptiveCard",
  "version": "1.5",
  "body": [
    {
      "type": "Chart.Pie",
      "colorSet": "categorical",
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
### Chart.Pie schema

| Property | Required | Type | Description |
|----|----|----|----|
| `type` | ✔️ | String | Must be `Chart.Pie`.|
| `colorSet` | | String | The name of the set of colors to use to render the chart. Refer to chart color schema for more details. |
| `data` | | Array of Object | The data to display in the chart. <br>Supported value: `DonutChartData` |
| `fallback` | | Object or String | An alternate element to render if this element is unsupported or if the host application doesn't support all the capabilities specified in the `requires` property.<br>Supported values: `Container`, `ActionSet`, `ColumnSet`, `Media`, `RichTextBlock`, `Table`, `TextBlock`, `FactSet`, `ImageSet`, `Image`, `Input.Text`, `Input.Date`, `Input.Time`, `Input.Number`, `Input.Toggle`, `Input.ChoiceSet`, `Input.Rating`, `Rating`, `CompoundButton`, `Icon`, `Chart.Donut`, `Chart.Pie`, `Chart.VerticalBar.Grouped`, `Chart.VerticalBar`, `Chart.HorizontalBar`, `Chart.HorizontalBar.Stacked`, `Chart.Line`, `Chart.Gauge`, `CodeBlock`, `drop` |
| `grid.area` | | String | The area of a `Layout.AreaGrid` layout in which an element should be displayed. |
| `height` | | String | Specifies the height of the element. When set to `stretch`, the element uses the remaining vertical space in its container.<br>Supported values: `auto`, `stretch`<br>Default value: `auto` |
| `horizontalAlignment` | | String | Determines how the element should be horizontally aligned.<br>Supported values: `Left`, `Center`, `Right` |
| `id` | | String | A unique identifier for the input element or action. |
| `isVisible` | | Boolean | Determines if the element is visible.<br>Default value: `true` |
| `lang` | | String | The locale associated with the input element. |
| `requires` | | Object | A list of capabilities the element requires the host application to support. If the host application doesn't support at least one of the listed capabilities, the element isn't rendered or its fallback is rendered, if provided.<br>Supported value: `HostCapabilities` |
| `separator` | | Boolean | Determines whether a separator line should be displayed above the element to visually separate it from the previous element. No separator is displayed for the first element in a container, even if this property is set to `true`.<br>Default value: `false`|
| `spacing` | | String | Specifies the amount of space between this element and the previous one. No space is added for the first element in a container.<br>Supported values: `None`, `ExtraSmall`, `Small`, `Default`, `Medium`, `Large`, `ExtraLarge`, `Padding`<br>Default value: `Default` |
| `targetWidth` | | String | Specifies the card width for which the element should be displayed. If `targetWidth` isn't specified, the element is rendered at all card widths. Using targetWidth makes it possible to author responsive cards that adapt their layout to the available horizontal space. <br>Supported values: `VeryNarrow`, `Narrow`, `Standard`, `Wide`, `atLeast:VeryNarrow`, `atMost:VeryNarrow`, `atLeast:Narrow`, `atMost:Narrow`, `atLeast:Standard`, `atMost:Standard`, `atLeast:Wide`, `atMost:Wide` |
| `title` | | String | The title of the chart. |

## Vertical Bar Chart

:::image type="content" source="../../assets/images/adaptive-cards/charts/verticalbar-chart.png" alt-text="Screenshot shows a vertical bar chart in an Adaptive Card.":::

```json
{
  "type": "AdaptiveCard",
  "version": "1.5",
  "body": [
    {
      "type": "Chart.VerticalBar",
      "title": "Sample",
      "xAxisTitle": "Days",
      "yAxisTitle": "Sales",
      "colorSet": "categorical",
      "data": [
        {
          "x": "Pear",
          "y": 59
        },
        {
          "x": "Banana",
          "y": 292
        },
        {
          "x": "Apple",
          "y": 143
        },
        {
          "x": "Peach",
          "y": 98
        },
        {
          "x": "Kiwi",
          "y": 179
        },
        {
          "x": "Grapefruit",
          "y": 20
        },
        {
          "x": "Orange",
          "y": 212
        },
        {
          "x": "Cantaloupe",
          "y": 68
        },
        {
          "x": "Grape",
          "y": 102
        },
        {
          "x": "Tangerine",
          "y": 38
        }
      ]
    }
  ]
}
```
### Chart.Vertical Bar schema

| Property | Required | Type | Description |
|----|----|----|----|
| `type` | ✔️ | String | Must be `Chart.VerticalBar`. |
| `color` | | String | The color to use for all data points. Refer to chart color schema for more details. <br>Supported values:`good`,`warning`,`attention`,`neutral`,`categoricalRed`,`categoricalPurple`,`categoricalLavender`,`categoricalBlue`,`categoricalLightBlue`,`categoricalTeal`,`categoricalGreen`,`categoricalLime`,`categoricalMarigold`,`sequential1`,`sequential2`,`sequential3`,`sequential4`,`sequential5`,`sequential6`,`sequential7`,`sequential8`,`divergingBlue`,`divergingLightBlue`,`divergingCyan`,`divergingTeal`,`divergingYellow`,`divergingPeach`,`divergingLightRed`,`divergingRed`,`divergingMaroon`,`divergingGray``divergingGray`|
| `colorSet` | | String | The name of the set of colors to use to render the chart. Refer to chart color schema for more details. |
| `data` | | Array of Object | The data points in the chart.<br>Supported value: `HorizontalBarChartDataValue` |
| `fallback` | | Object or String | An alternate element to render if this element is unsupported or if the host application doesn't support all the capabilities specified in the `requires` property.<br>Supported values: `Container`, `ActionSet`, `ColumnSet`, `Media`, `RichTextBlock`, `Table`, `TextBlock`, `FactSet`, `ImageSet`, `Image`, `Input.Text`, `Input.Date`, `Input.Time`, `Input.Number`, `Input.Toggle`, `Input.ChoiceSet`, `Input.Rating`, `Rating`, `CompoundButton`, `Icon`, `Chart.Donut`, `Chart.Pie`, `Chart.VerticalBar.Grouped`, `Chart.VerticalBar`, `Chart.HorizontalBar`, `Chart.HorizontalBar.Stacked`, `Chart.Line`, `Chart.Gauge`, `CodeBlock`, `drop` |
| `grid.area` | | String | The area of a `Layout.AreaGrid` layout in which an element should be displayed. |
| `height` | | String | Specifies the height of the element. When set to `stretch`, the element uses the remaining vertical space in its container.<br>Supported values: `auto`, `stretch`<br>Default value: `auto` |
| `horizontalAlignment` | | String | Determines how the element should be horizontally aligned.<br>Supported values: `Left`, `Center`, `Right` |
| `id` | | String | A unique identifier for the input element or action. |
| `isVisible` | | Boolean | Determines if the element is visible.<br>Default value: `true` |
| `lang` | | String | The locale associated with the input element. |
| `requires` | | Object | A list of capabilities the element requires the host application to support. If the host application doesn't support at least one of the listed capabilities, the element isn't rendered or its fallback is rendered, if provided.<br>Supported value: `HostCapabilities` |
| `separator` | | Boolean | Determines whether a separator line should be displayed above the element to visually separate it from the previous element. No separator is displayed for the first element in a container, even if this property is set to `true`.<br>Default value: `false`|
| `showBarValues` | | Boolean | Controls if the bar values should be displayed.<br>Default value: `false` |
| `spacing` | | String | Specifies the amount of space between this element and the previous one. No space is added for the first element in a container.<br>Supported values: `None`, `ExtraSmall`, `Small`, `Default`, `Medium`, `Large`, `ExtraLarge`, `Padding`<br>Default value: `Default` |
| `targetWidth` | | String | Specifies the card width for which the element should be displayed. If `targetWidth` isn't specified, the element is rendered at all card widths. Using targetWidth makes it possible to author responsive cards that adapt their layout to the available horizontal space. <br>Supported values: `VeryNarrow`, `Narrow`, `Standard`, `Wide`, `atLeast:VeryNarrow`, `atMost:VeryNarrow`, `atLeast:Narrow`, `atMost:Narrow`, `atLeast:Standard`, `atMost:Standard`, `atLeast:Wide`, `atMost:Wide` |
| `title` | | String | The title of the chart. |
| `xAxisTitle` | | String | The title of the x axis.|
| `yAxisTitle` | | String | The title of the y axis. |

## Grouped Vertical Bar Chart

:::image type="content" source="../../assets/images/adaptive-cards/charts/verticalbar-grouped-chart.png" alt-text="Screenshot shows a grouped vertical bar chart in an Adaptive Card.":::

```json
{
  "type": "AdaptiveCard",
  "version": "1.5",
  "body": [
    {
      "type": "TextBlock",
      "text": "Grouped",
      "size": "large",
      "separator": true,
      "spacing": "large"
    },
    {
      "type": "Chart.VerticalBar.Grouped",
      "title": "Sample",
      "xAxisTitle": "Days",
      "yAxisTitle": "Sales",
      "colorSet": "diverging",
      "data": [
        {
          "legend": "Outlook",
          "values": [
            {
              "x": "2023-05-01",
              "y": 24
            },
            {
              "x": "2023-05-02",
              "y": 27
            },
            {
              "x": "2023-05-03",
              "y": 18
            },
            {
              "x": "2023-05-04",
              "y": 30
            },
            {
              "x": "2023-05-05",
              "y": 20
            },
            {
              "x": "2023-05-06",
              "y": 35
            },
            {
              "x": "2023-05-07",
              "y": 40
            },
            {
              "x": "2023-05-08",
              "y": 45
            }
          ]
        },
        {
          "legend": "Teams",
          "values": [
            {
              "x": "2023-05-01",
              "y": 9
            },
            {
              "x": "2023-05-02",
              "y": 100
            },
            {
              "x": "2023-05-03",
              "y": 22
            },
            {
              "x": "2023-05-04",
              "y": 40
            },
            {
              "x": "2023-05-05",
              "y": 30
            },
            {
              "x": "2023-05-06",
              "y": 45
            },
            {
              "x": "2023-05-07",
              "y": 50
            },
            {
              "x": "2023-05-08",
              "y": 55
            }
          ]
        },
        {
          "legend": "Office",
          "values": [
            {
              "x": "2023-05-01",
              "y": 10
            },
            {
              "x": "2023-05-02",
              "y": 20
            },
            {
              "x": "2023-05-03",
              "y": 30
            },
            {
              "x": "2023-05-04",
              "y": 40
            },
            {
              "x": "2023-05-05",
              "y": 50
            },
            {
              "x": "2023-05-06",
              "y": 60
            },
            {
              "x": "2023-05-07",
              "y": 70
            },
            {
              "x": "2023-05-08",
              "y": 80
            }
          ]
        },
        {
          "legend": "Windows",
          "values": [
            {
              "x": "2023-05-01",
              "y": 10
            },
            {
              "x": "2023-05-02",
              "y": 20
            },
            {
              "x": "2023-05-03",
              "y": 30
            },
            {
              "x": "2023-05-04",
              "y": 40
            },
            {
              "x": "2023-05-05",
              "y": 50
            },
            {
              "x": "2023-05-06",
              "y": 60
            },
            {
              "x": "2023-05-07",
              "y": 70
            },
            {
              "x": "2023-05-08",
              "y": 80
            }
          ]
        }
      ]
    },
    {
      "type": "TextBlock",
      "text": "Stacked",
      "size": "large",
      "separator": true,
      "spacing": "large"
    },
    {
      "type": "Chart.VerticalBar.Grouped",
      "stacked": true,
      "title": "Sample",
      "xAxisTitle": "Days",
      "yAxisTitle": "Sales",
      "data": [
        {
          "legend": "Outlook",
          "values": [
            {
              "x": "2023-05-01",
              "y": 24
            },
            {
              "x": "2023-05-02",
              "y": 27
            },
            {
              "x": "2023-05-03",
              "y": 18
            },
            {
              "x": "2023-05-04",
              "y": 30
            },
            {
              "x": "2023-05-05",
              "y": 20
            },
            {
              "x": "2023-05-06",
              "y": 35
            },
            {
              "x": "2023-05-07",
              "y": 40
            },
            {
              "x": "2023-05-08",
              "y": 45
            }
          ]
        },
        {
          "legend": "Teams",
          "values": [
            {
              "x": "2023-05-01",
              "y": 9
            },
            {
              "x": "2023-05-02",
              "y": 100
            },
            {
              "x": "2023-05-03",
              "y": 22
            },
            {
              "x": "2023-05-04",
              "y": 40
            },
            {
              "x": "2023-05-05",
              "y": 30
            },
            {
              "x": "2023-05-06",
              "y": 45
            },
            {
              "x": "2023-05-07",
              "y": 50
            },
            {
              "x": "2023-05-08",
              "y": 55
            }
          ]
        },
        {
          "legend": "Office",
          "values": [
            {
              "x": "2023-05-01",
              "y": 10
            },
            {
              "x": "2023-05-02",
              "y": 20
            },
            {
              "x": "2023-05-03",
              "y": 30
            },
            {
              "x": "2023-05-04",
              "y": 40
            },
            {
              "x": "2023-05-05",
              "y": 50
            },
            {
              "x": "2023-05-06",
              "y": 60
            },
            {
              "x": "2023-05-07",
              "y": 70
            },
            {
              "x": "2023-05-08",
              "y": 80
            }
          ]
        },
        {
          "legend": "Windows",
          "values": [
            {
              "x": "2023-05-01",
              "y": 10
            },
            {
              "x": "2023-05-02",
              "y": 20
            },
            {
              "x": "2023-05-03",
              "y": 30
            },
            {
              "x": "2023-05-04",
              "y": 40
            },
            {
              "x": "2023-05-05",
              "y": 50
            },
            {
              "x": "2023-05-06",
              "y": 60
            },
            {
              "x": "2023-05-07",
              "y": 70
            },
            {
              "x": "2023-05-08",
              "y": 80
            }
          ]
        }
      ]
    }
  ]
}
```
### Chart.VerticalBar.Grouped schema

| Property | Required | Type | Description |
|----|----|----|----|
| `type` | ✔️ | String | Must be `Chart.VerticalBar.Grouped`. |
| `color` | | String | The color to use for all data points. Refer to chart color schema for more details. <br>Supported values:`good`,`warning`,`attention`,`neutral`,`categoricalRed`,`categoricalPurple`,`categoricalLavender`,`categoricalBlue`,`categoricalLightBlue`,`categoricalTeal`,`categoricalGreen`,`categoricalLime`,`categoricalMarigold`,`sequential1`,`sequential2`,`sequential3`,`sequential4`,`sequential5`,`sequential6`,`sequential7`,`sequential8`,`divergingBlue`,`divergingLightBlue`,`divergingCyan`,`divergingTeal`,`divergingYellow`,`divergingPeach`,`divergingLightRed`,`divergingRed`,`divergingMaroon`,`divergingGray``divergingGray`|
| `colorSet` | | String | The name of the set of colors to use to render the chart. Refer to chart color schema for more details. |
| `data` | | Array of Object | The data points in the chart.<br>Supported value: `HorizontalBarChartDataValue` |
| `fallback` | | Object or String | An alternate element to render if this element is unsupported or if the host application doesn't support all the capabilities specified in the `requires` property.<br>Supported values: `Container`, `ActionSet`, `ColumnSet`, `Media`, `RichTextBlock`, `Table`, `TextBlock`, `FactSet`, `ImageSet`, `Image`, `Input.Text`, `Input.Date`, `Input.Time`, `Input.Number`, `Input.Toggle`, `Input.ChoiceSet`, `Input.Rating`, `Rating`, `CompoundButton`, `Icon`, `Chart.Donut`, `Chart.Pie`, `Chart.VerticalBar.Grouped`, `Chart.VerticalBar`, `Chart.HorizontalBar`, `Chart.HorizontalBar.Stacked`, `Chart.Line`, `Chart.Gauge`, `CodeBlock`, `drop` |
| `grid.area` | | String | The area of a `Layout.AreaGrid` layout in which an element should be displayed. |
| `height` | | String | Specifies the height of the element. When set to `stretch`, the element uses the remaining vertical space in its container.<br>Supported values: `auto`, `stretch`<br>Default value: `auto` |
| `horizontalAlignment` | | String | Determines how the element should be horizontally aligned.<br>Supported values: `Left`, `Center`, `Right` |
| `id` | | String | A unique identifier for the input element or action. |
| `isVisible` | | Boolean | Determines if the element is visible.<br>Default value: `true` |
| `lang` | | String | The locale associated with the input element. |
| `requires` | | Object | A list of capabilities the element requires the host application to support. If the host application doesn't support at least one of the listed capabilities, the element isn't rendered or its fallback is rendered, if provided.<br>Supported value: `HostCapabilities` |
| `separator` | | Boolean | Determines whether a separator line should be displayed above the element to visually separate it from the previous element. No separator is displayed for the first element in a container, even if this property is set to `true`.<br>Default value: `false`|
| `showBarValues` | | Boolean | Controls if the bar values should be displayed.<br>Default value: `false` |
| `spacing` | | String | Specifies the amount of space between this element and the previous one. No space is added for the first element in a container.<br>Supported values: `None`, `ExtraSmall`, `Small`, `Default`, `Medium`, `Large`, `ExtraLarge`, `Padding`<br>Default value: `Default` |
| `targetWidth` | | String | Specifies the card width for which the element should be displayed. If `targetWidth` isn't specified, the element is rendered at all card widths. Using targetWidth makes it possible to author responsive cards that adapt their layout to the available horizontal space. <br>Supported values: `VeryNarrow`, `Narrow`, `Standard`, `Wide`, `atLeast:VeryNarrow`, `atMost:VeryNarrow`, `atLeast:Narrow`, `atMost:Narrow`, `atLeast:Standard`, `atMost:Standard`, `atLeast:Wide`, `atMost:Wide` |
| `title` | | String | The title of the chart. |
| `xAxisTitle` | | String | The title of the x axis.|
| `yAxisTitle` | | String | The title of the y axis. |

