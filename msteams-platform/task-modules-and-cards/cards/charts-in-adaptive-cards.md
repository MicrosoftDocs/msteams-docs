---
title: Charts in Adaptive Cards
description: Learn how to create charts in Adaptive Cards including donut, gauge, vertical bar, horizontal bar, line, and pie charts.
ms.topic: conceptual
ms.author: surbhigupta
ms.date: 11/07/2024
---

# Charts in Adaptive Cards

You can visually represent data through charts in Adaptive Cards. You can use charts for performance dashboards, budget allocations, project management, customer insights, and more.

## Donut chart

You can use the `Chart.Donut` element to add a donut chart in an Adaptive Card.

# [Card](#tab/card1)

:::image type="content" source="../../assets/images/adaptive-cards/charts/donut-chart.png" alt-text="Screenshot shows a donut chart in an Adaptive Card.":::

# [Payload](#tab/payload1)

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

---

Here are the properties of the `Chart.Donut` element:

| Property | Required | Type | Description |
|----|----|----|----|
| `type` | ✔️ | String | Must be `Chart.Donut`. |
| `colorSet` | | String | The name of the set of colors to use to render the chart. |
| `data` | ✔️ | Array of objects | The data to display in the chart. |
| `fallback` | | Object or String | An alternate element to render if this type of element is unsupported or if the host application doesn't support all the capabilities specified in the `requires` property.<br>Allowed values: `Container`, `ActionSet`, `ColumnSet`, `Media`, `RichTextBlock`, `Table`, `TextBlock`, `FactSet`, `ImageSet`, `Image`, `Input.Text`, `Input.Date`, `Input.Time`, `Input.Number`, `Input.Toggle`, `Input.ChoiceSet`, `Input.Rating`, `Rating`, `CompoundButton`, `Icon`, `Chart.Donut`, `Chart.Pie`, `Chart.VerticalBar.Grouped`, `Chart.VerticalBar`, `Chart.HorizontalBar`, `Chart.HorizontalBar.Stacked`, `Chart.Line`, `Chart.Gauge`, `CodeBlock`, `drop` |
| `grid.area` | | String | The area of a `Layout.AreaGrid` layout in which an element must be displayed. |
| `height` | | String | The height of the element. When set to `stretch`, the element uses the remaining vertical space in its container.<br>Allowed values: `auto`, `stretch`<br>Default value: `auto` |
| `horizontalAlignment` | | String | Controls how the element must be horizontally aligned.<br>Allowed values: `Left`, `Center`, `Right` |
| `id` | | String | A unique identifier for the element or action. |
| `isVisible` | | Boolean | Controls the visibility of the element.<br>Default value: `true` |
| `lang` | | String | The locale associated with the input element. |
| `requires` | | Object | A list of capabilities the element requires the host application to support. If the host application doesn't support at least one of the listed capabilities, the element isn't rendered or its fallback is rendered, if provided.<br>Allowed values: `HostCapabilities` |
| `separator` | | Boolean | Controls whether a separator line must be displayed above the element to visually separate it from the previous element. No separator is displayed for the first element in a container, even if this property is set to `true`.<br>Default value: `false` |
| `spacing` | | String | Controls the amount of space between this element and the previous one. No space is added for the first element in a container.<br>Allowed values: `None`, `Small`, `Default`, `Medium`, `Large`, `ExtraLarge`, `Padding`<br>Default value: `Default` |
| `targetWidth` | | String | Controls the card width for which the element must be displayed. If `targetWidth` isn't specified, the element is rendered at all card widths. Using `targetWidth` makes it possible to author responsive cards that adapt their layout to the available horizontal space.<br>For more information, see [Adaptive Card responsive layout](cards-format.md#adaptive-card-responsive-layout).<br>Allowed values: `VeryNarrow`, `Narrow`, `Standard`, `Wide`, `atLeast:VeryNarrow`, `atMost:VeryNarrow`, `atLeast:Narrow`, `atMost:Narrow`, `atLeast:Standard`, `atMost:Standard`, `atLeast:Wide`, `atMost:Wide` |
| `title` | | String | The title of the chart. |

Here are the properties of the `data` array:

| Property | Required | Type | Description |
|----|----|----|----|
| `color` | | String | The color to use for the data point.<br>Allowed values: `good`, `warning`, `attention`, `neutral`, `categoricalRed`, `categoricalPurple`, `categoricalLavender`, `categoricalBlue`, `categoricalLightBlue`, `categoricalTeal`, `categoricalGreen`, `categoricalLime`, `categoricalMarigold`, `sequential1`, `sequential2`, `sequential3`, `sequential4`, `sequential5`, `sequential6`, `sequential7`, `sequential8`, `divergingBlue`, `divergingLightBlue`, `divergingCyan`, `divergingTeal`, `divergingYellow`, `divergingPeach`, `divergingLightRed`, `divergingRed`, `divergingMaroon`, `divergingGray` |
| `legend` | | String | The legend of the chart. |
| `value` | | Number | The value associated with the data point. |

## Gauge chart

You can use the `Chart.Gauge` element to add a gauge chart in an Adaptive Card.

# [Card](#tab/card2)

:::image type="content" source="../../assets/images/adaptive-cards/charts/guage-chart.png" alt-text="Screenshot shows a gauge chart in an Adaptive Card.":::

# [Payload](#tab/payload2)

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

---

Here are the properties of the `Chart.Gauge` element:

| Property | Required | Type | Description |
|----|----|----|----|
| `type` | ✔️ | String | Must be `Chart.Gauge`. |
| `colorSet` | | String | The name of the set of colors to use to render the chart. |
| `fallback` | | Object or String | An alternate element to render if this type of element is unsupported or if the host application doesn't support all the capabilities specified in the `requires` property.<br>Allowed values: `Container`, `ActionSet`, `ColumnSet`, `Media`, `RichTextBlock`, `Table`, `TextBlock`, `FactSet`, `ImageSet`, `Image`, `Input.Text`, `Input.Date`, `Input.Time`, `Input.Number`, `Input.Toggle`, `Input.ChoiceSet`, `Input.Rating`, `Rating`, `CompoundButton`, `Icon`, `Chart.Donut`, `Chart.Pie`, `Chart.VerticalBar.Grouped`, `Chart.VerticalBar`, `Chart.HorizontalBar`, `Chart.HorizontalBar.Stacked`, `Chart.Line`, `Chart.Gauge`, `CodeBlock`, `drop` |
| `grid.area` | | String | The area of a `Layout.AreaGrid` layout in which an element must be displayed. |
| `height` | | String | The height of the element. When set to `stretch`, the element uses the remaining vertical space in its container.<br>Allowed values: `auto`, `stretch`<br>Default value: `auto` |
| `horizontalAlignment` | | String | Controls how the element must be horizontally aligned.<br>Allowed values: `Left`, `Center`, `Right` |
| `id` | | String | A unique identifier for the input element. |
| `isVisible` | | Boolean | Controls if the element is visible.<br>Default value: `true` |
| `lang` | | String | The locale associated with the input element. |
| `max` | | Number | The maximum value of the gauge. |
| `min` | | Number | The minimum value of the gauge. |
| `requires` | | Object | A list of capabilities the element requires the host application to support. If the host application doesn't support at least one of the listed capabilities, the element isn't rendered or its fallback is rendered, if provided.<br>Allowed values: `HostCapabilities` |
| `segments` | | Array of objects | The segments to display in the gauge. |
| `separator` | | Boolean | Controls whether a separator line must be displayed above the element to visually separate it from the previous element. No separator is displayed for the first element in a container, even if this property is set to `true`.<br>Default value: `false` |
| `showLegend` | | Boolean | Controls if the legend must be displayed.<br>Default value: `true` |
| `showMinMax` | | Boolean | Controls if the min or max values must be displayed.<br>Default value: `true` |
| `spacing` | | String | Controls the amount of space between this element and the previous one. No space is added for the first element in a container.<br>Allowed values: `None`, `Small`, `Default`, `Medium`, `Large`, `ExtraLarge`, `Padding`<br>Default value: `Default` |
| `subLabel` | | String | The sub-label of the gauge. |
| `targetWidth` | | String | Controls the card width for which the element must be displayed. If `targetWidth` isn't specified, the element is rendered at all card widths. Using `targetWidth` makes it possible to author responsive cards that adapt their layout to the available horizontal space.<br>For more information, see [Adaptive Card responsive layout](cards-format.md#adaptive-card-responsive-layout).<br>Allowed values: `VeryNarrow`, `Narrow`, `Standard`, `Wide`, `atLeast:VeryNarrow`, `atMost:VeryNarrow`, `atLeast:Narrow`, `atMost:Narrow`, `atLeast:Standard`, `atMost:Standard`, `atLeast:Wide`, `atMost:Wide` |
| `title` | | String | The title of the chart. |
| `value` | | Number | The value of the gauge.<br>Default value: 0 |
| `valueFormat` | | String | The format used to display the gauge's value.<br>Allowed values: `Percentage`, `Fraction`<br>Default value: `Percentage` |

Here are the properties of the `segments` array:

| Property | Required | Type | Description |
|----|----|----|----|
| `color` | | String | The color to use for the segment.<br>Allowed values: `good`, `warning`, `attention`, `neutral`, `categoricalRed`, `categoricalPurple`, `categoricalLavender`, `categoricalBlue`, `categoricalLightBlue`, `categoricalTeal`, `categoricalGreen`, `categoricalLime`, `categoricalMarigold`, `sequential1`, `sequential2`, `sequential3`, `sequential4`, `sequential5`, `sequential6`, `sequential7`, `sequential8`, `divergingBlue`, `divergingLightBlue`, `divergingCyan`, `divergingTeal`, `divergingYellow`, `divergingPeach`, `divergingLightRed`, `divergingRed`, `divergingMaroon`, `divergingGray` |
| `legend` | | String | The legend text associated with the segment. |
| `value` | | Number | The size of the segment.<br>Default value: `0` |

## Grouped vertical bar chart

You can use the `Chart.VerticalBar.Grouped` element to add a grouped or a stacked vertical bar chart in an Adaptive Card.

# [Card](#tab/card3)

:::image type="content" source="../../assets/images/adaptive-cards/charts/guage-chart.png" alt-text="Screenshot shows a gauge chart in an Adaptive Card.":::

# [Payload](#tab/payload3)

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

---

Here are the properties of the `Chart.VerticalBar.Grouped` element:

| Property | Required | Type | Description |
|----|----|----|----|
| `type` | ✔️ | String | Must be `Chart.VerticalBar.Grouped`. |
| `color` | | String | The color to use for all data points.<br>Allowed values: `good`, `warning`, `attention`, `neutral`, `categoricalRed`, `categoricalPurple`, `categoricalLavender`, `categoricalBlue`, `categoricalLightBlue`, `categoricalTeal`, `categoricalGreen`, `categoricalLime`, `categoricalMarigold`, `sequential1`, `sequential2`, `sequential3`, `sequential4`, `sequential5`, `sequential6`, `sequential7`, `sequential8`, `divergingBlue`, `divergingLightBlue`, `divergingCyan`, `divergingTeal`, `divergingYellow`, `divergingPeach`, `divergingLightRed`, `divergingRed`, `divergingMaroon`, `divergingGray` |
| `colorSet` | | String | The name of the set of colors to use to render the chart. |
| `data` | | Array of objects | The data points in the chart. |
| `fallback` | | Object or String | An alternate element to render if this element is unsupported or if the host application doesn't support all the capabilities specified in the `requires` property.<br>Allowed values: `Container`, `ActionSet`, `ColumnSet`, `Media`, `RichTextBlock`, `Table`, `TextBlock`, `FactSet`, `ImageSet`, `Image`, `Input.Text`, `Input.Date`, `Input.Time`, `Input.Number`, `Input.Toggle`, `Input.ChoiceSet`, `Input.Rating`, `Rating`, `CompoundButton`, `Icon`, `Chart.Donut`, `Chart.Pie`, `Chart.VerticalBar.Grouped`, `Chart.VerticalBar`, `Chart.HorizontalBar`, `Chart.HorizontalBar.Stacked`, `Chart.Line`, `Chart.Gauge`, `CodeBlock`, `drop` |
| `grid.area` | | String | The area of a `Layout.AreaGrid` layout in which an element must be displayed. |
| `height` | | String | Controls the height of the element. When set to `stretch`, the element uses the remaining vertical space in its container.<br>Allowed values: `auto`, `stretch`<br>Default value: `auto` |
| `horizontalAlignment` | | String | Controls how the element must be horizontally aligned.<br>Allowed values: `Left`, `Center`, `Right` |
| `id` | | String | A unique identifier for the input element or action. |
| `isVisible` | | Boolean | Controls if the element is visible.<br>Default value: `true` |
| `lang` | | String | The locale associated with the input element. |
| `requires` | | Object | A list of capabilities the element requires the host application to support. If the host application doesn't support at least one of the listed capabilities, the element isn't rendered or its fallback is rendered, if provided.<br>Supported value: `HostCapabilities` |
| `separator` | | Boolean | Controls whether a separator line must be displayed above the element to visually separate it from the previous element. No separator is displayed for the first element in a container, even if this property is set to `true`.<br>Default value: `false`|
| `showBarValues` | | Boolean | Controls if the bar values must be displayed.<br>Default value: `false` |
| `spacing` | | String | Controls the amount of space between this element and the previous one. No space is added for the first element in a container.<br>Allowed values: `None`, `Small`, `Default`, `Medium`, `Large`, `ExtraLarge`, `Padding`<br>Default value: `Default` |
| `targetWidth` | | String | Controls the card width for which the element must be displayed. If `targetWidth` isn't specified, the element is rendered at all card widths. Using `targetWidth` makes it possible to author responsive cards that adapt their layout to the available horizontal space.<br>For more information, see [Adaptive Card responsive layout](cards-format.md#adaptive-card-responsive-layout).<br>Allowed values: `VeryNarrow`, `Narrow`, `Standard`, `Wide`, `atLeast:VeryNarrow`, `atMost:VeryNarrow`, `atLeast:Narrow`, `atMost:Narrow`, `atLeast:Standard`, `atMost:Standard`, `atLeast:Wide`, `atMost:Wide` |
| `title` | | String | The title of the chart. |
| `xAxisTitle` | | String | The title of the x axis.|
| `yAxisTitle` | | String | The title of the y axis. |

Here are the properties of the `data` array:

| Property | Required | Type | Description |
|----|----|----|----|
| `color` | | String | The color to use for the data point.<br>Allowed values: `good`, `warning`, `attention`, `neutral`, `categoricalRed`, `categoricalPurple`, `categoricalLavender`, `categoricalBlue`, `categoricalLightBlue`, `categoricalTeal`, `categoricalGreen`, `categoricalLime`, `categoricalMarigold`, `sequential1`, `sequential2`, `sequential3`, `sequential4`, `sequential5`, `sequential6`, `sequential7`, `sequential8`, `divergingBlue`, `divergingLightBlue`, `divergingCyan`, `divergingTeal`, `divergingYellow`, `divergingPeach`, `divergingLightRed`, `divergingRed`, `divergingMaroon`, `divergingGray` |
| `legend` | | String | The legend of the chart. |
| `values` | | Number | The data points in the series. |

Here are the properties of `values`:

| Property | Required | Type | Description |
|----|----|----|----|
| `x` | | String | The x axis value of the data point. |
| `y` | | Number | The y axis value of the data point. |

## Horizontal bar chart

You can use the `Chart.HorizontalBar` element to add a horizontal bar chart in an Adaptive Card.

# [Card](#tab/card4)

:::image type="content" source="../../assets/images/adaptive-cards/charts/horizontalbar-chart.png" alt-text="Screenshot shows a horizontal bar chart in an Adaptive Card.":::

# [Payload](#tab/payload4)

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

---

Here are the properties of the `Chart.HorizontalBar` element:

| Property | Required | Type | Description |
|----|----|----|----|
| `type` | ✔️ | String | Must be `Chart.HorizontalBar`. |
| `color` | | String | The color to use for all data points.<br>Allowed values:`good`,`warning`,`attention`,`neutral`,`categoricalRed`,`categoricalPurple`,`categoricalLavender`,`categoricalBlue`,`categoricalLightBlue`,`categoricalTeal`,`categoricalGreen`,`categoricalLime`,`categoricalMarigold`,`sequential1`,`sequential2`,`sequential3`,`sequential4`,`sequential5`,`sequential6`,`sequential7`,`sequential8`,`divergingBlue`,`divergingLightBlue`,`divergingCyan`,`divergingTeal`,`divergingYellow`,`divergingPeach`,`divergingLightRed`,`divergingRed`,`divergingMaroon`,`divergingGray` |
| `colorSet` | | String | The name of the set of colors to use to render the chart. |
| `data` | | Array of objects | The data points in the chart. |
| `displayMode` | | String | Controls how the chart must be visually laid out. <br>Allowed values: `AbsoluteWithAxis`,`AbsoluteNoAxis`,`PartToWhole` <br>Default value: `AbsoluteWithAxis` |
| `fallback` | | Object or String | An alternate element to render if this element is unsupported or if the host application doesn't support all the capabilities specified in the `requires` property.<br>Allowed values: `Container`, `ActionSet`, `ColumnSet`, `Media`, `RichTextBlock`, `Table`, `TextBlock`, `FactSet`, `ImageSet`, `Image`, `Input.Text`, `Input.Date`, `Input.Time`, `Input.Number`, `Input.Toggle`, `Input.ChoiceSet`, `Input.Rating`, `Rating`, `CompoundButton`, `Icon`, `Chart.Donut`, `Chart.Pie`, `Chart.VerticalBar.Grouped`, `Chart.VerticalBar`, `Chart.HorizontalBar`, `Chart.HorizontalBar.Stacked`, `Chart.Line`, `Chart.Gauge`, `CodeBlock`, `drop` |
| `grid.area` | | String | The area of a `Layout.AreaGrid` layout in which an element must be displayed. |
| `height` | | String | Controls the height of the element. When set to `stretch`, the element uses the remaining vertical space in its container.<br>Allowed values: `auto`, `stretch`<br>Default value: `auto` |
| `horizontalAlignment` | | String | Controls how the element must be horizontally aligned.<br>Allowed values: `Left`, `Center`, `Right` |
| `id` | | String | A unique identifier for the input element or action. |
| `isVisible` | | Boolean | Controls if the element is visible.<br>Default value: `true` |
| `lang` | | String | The locale associated with the input element. |
| `requires` | | Object | A list of capabilities the element requires the host application to support. If the host application doesn't support at least one of the listed capabilities, the element isn't rendered or its fallback is rendered, if provided.<br>Supported value: `HostCapabilities` |
| `separator` | | Boolean | Controls whether a separator line must be displayed above the element to visually separate it from the previous element. No separator is displayed for the first element in a container, even if this property is set to `true`.<br>Default value: `false`|
| `spacing` | | String | Controls the amount of space between this element and the previous one. No space is added for the first element in a container.<br>Allowed values: `None`, `Small`, `Default`, `Medium`, `Large`, `ExtraLarge`, `Padding`<br>Default value: `Default` |
| `targetWidth` | | String | Controls the card width for which the element must be displayed. If `targetWidth` isn't specified, the element is rendered at all card widths. Using `targetWidth` makes it possible to author responsive cards that adapt their layout to the available horizontal space.<br>For more information, see [Adaptive Card responsive layout](cards-format.md#adaptive-card-responsive-layout).<br>Allowed values: `VeryNarrow`, `Narrow`, `Standard`, `Wide`, `atLeast:VeryNarrow`, `atMost:VeryNarrow`, `atLeast:Narrow`, `atMost:Narrow`, `atLeast:Standard`, `atMost:Standard`, `atLeast:Wide`, `atMost:Wide` |
| `title` | | String | The title of the chart. |
| `xAxisTitle` | | String | The title of the x axis.|
| `yAxisTitle` | | String | The title of the y axis. |

Here are the properties of the `data` array:

| Property | Required | Type | Description |
|----|----|----|----|
| `color` | | String | The color to use for the data point.<br>Allowed values: `good`, `warning`, `attention`, `neutral`, `categoricalRed`, `categoricalPurple`, `categoricalLavender`, `categoricalBlue`, `categoricalLightBlue`, `categoricalTeal`, `categoricalGreen`, `categoricalLime`, `categoricalMarigold`, `sequential1`, `sequential2`, `sequential3`, `sequential4`, `sequential5`, `sequential6`, `sequential7`, `sequential8`, `divergingBlue`, `divergingLightBlue`, `divergingCyan`, `divergingTeal`, `divergingYellow`, `divergingPeach`, `divergingLightRed`, `divergingRed`, `divergingMaroon`, `divergingGray` |
| `x` | | String | The x axis value of the data point. |
| `y` | | Number | The y axis value of the data point. |

## Line chart

You can use the `Chart.Line` element to add a line chart in an Adaptive Card.

# [Card](#tab/card5)

:::image type="content" source="../../assets/images/adaptive-cards/charts/line-chart.png" alt-text="Screenshot shows a line chart in an Adaptive Card.":::

# [Payload](#tab/payload5)

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

---

Here are the properties of the `Chart.Line` element:

| Property | Required | Type | Description |
|----|----|----|----|
| `type` | ✔️ | String | Must be `Chart.Line`. |
| `color` | | String | The color to use for all data points. <br>Allowed values:`good`,`warning`,`attention`,`neutral`,`categoricalRed`,`categoricalPurple`,`categoricalLavender`,`categoricalBlue`,`categoricalLightBlue`,`categoricalTeal`,`categoricalGreen`,`categoricalLime`,`categoricalMarigold`,`sequential1`,`sequential2`,`sequential3`,`sequential4`,`sequential5`,`sequential6`,`sequential7`,`sequential8`,`divergingBlue`,`divergingLightBlue`,`divergingCyan`,`divergingTeal`,`divergingYellow`,`divergingPeach`,`divergingLightRed`,`divergingRed`,`divergingMaroon`,`divergingGray` |
| `colorSet` | | String | The name of the set of colors to use to render the chart. |
| `data` | | Array of objects | The data points in the chart. |
| `fallback` | | Object or String | An alternate element to render if this element is unsupported or if the host application doesn't support all the capabilities specified in the `requires` property.<br>Allowed values: `Container`, `ActionSet`, `ColumnSet`, `Media`, `RichTextBlock`, `Table`, `TextBlock`, `FactSet`, `ImageSet`, `Image`, `Input.Text`, `Input.Date`, `Input.Time`, `Input.Number`, `Input.Toggle`, `Input.ChoiceSet`, `Input.Rating`, `Rating`, `CompoundButton`, `Icon`, `Chart.Donut`, `Chart.Pie`, `Chart.VerticalBar.Grouped`, `Chart.VerticalBar`, `Chart.HorizontalBar`, `Chart.HorizontalBar.Stacked`, `Chart.Line`, `Chart.Gauge`, `CodeBlock`, `drop` |
| `grid.area` | | String | The area of a `Layout.AreaGrid` layout in which an element must be displayed. |
| `height` | | String | Controls the height of the element. When set to `stretch`, the element uses the remaining vertical space in its container.<br>Allowed values: `auto`, `stretch`<br>Default value: `auto` |
| `horizontalAlignment` | | String | Controls how the element must be horizontally aligned.<br>Allowed values: `Left`, `Center`, `Right` |
| `id` | | String | A unique identifier for the input element or action. |
| `isVisible` | | Boolean | Controls if the element is visible.<br>Default value: `true` |
| `lang` | | String | The locale associated with the input element. |
| `requires` | | Object | A list of capabilities the element requires the host application to support. If the host application doesn't support at least one of the listed capabilities, the element isn't rendered or its fallback is rendered, if provided.<br>Supported value: `HostCapabilities` |
| `separator` | | Boolean | Controls whether a separator line must be displayed above the element to visually separate it from the previous element. No separator is displayed for the first element in a container, even if this property is set to `true`.<br>Default value: `false`|
| `spacing` | | String | Controls the amount of space between this element and the previous one. No space is added for the first element in a container.<br>Allowed values: `None`, `Small`, `Default`, `Medium`, `Large`, `ExtraLarge`, `Padding`<br>Default value: `Default` |
| `targetWidth` | | String | Controls the card width for which the element must be displayed. If `targetWidth` isn't specified, the element is rendered at all card widths. Using `targetWidth` makes it possible to author responsive cards that adapt their layout to the available horizontal space.<br>For more information, see [Adaptive Card responsive layout](cards-format.md#adaptive-card-responsive-layout).<br>Allowed values: `VeryNarrow`, `Narrow`, `Standard`, `Wide`, `atLeast:VeryNarrow`, `atMost:VeryNarrow`, `atLeast:Narrow`, `atMost:Narrow`, `atLeast:Standard`, `atMost:Standard`, `atLeast:Wide`, `atMost:Wide` |
| `title` | | String | The title of the chart. |
| `xAxisTitle` | | String | The title of the x axis.|
| `yAxisTitle` | | String | The title of the y axis. |

Here are the properties of the `data` array:

| Property | Required | Type | Description |
|----|----|----|----|
| `color` | | String | The color to use for the data point.<br>Allowed values: `good`, `warning`, `attention`, `neutral`, `categoricalRed`, `categoricalPurple`, `categoricalLavender`, `categoricalBlue`, `categoricalLightBlue`, `categoricalTeal`, `categoricalGreen`, `categoricalLime`, `categoricalMarigold`, `sequential1`, `sequential2`, `sequential3`, `sequential4`, `sequential5`, `sequential6`, `sequential7`, `sequential8`, `divergingBlue`, `divergingLightBlue`, `divergingCyan`, `divergingTeal`, `divergingYellow`, `divergingPeach`, `divergingLightRed`, `divergingRed`, `divergingMaroon`, `divergingGray` |
| `legend` | | String | The legend of the chart. |
| `values` | | Array of objects | The data points in the series. |

Here are the properties of `values`:

| Property | Required | Type | Description |
|----|----|----|----|
| `x` | | One of number or string | The x axis value of the data point. |
| `y` | | Number | The y axis value of the data point. |

## Pie chart

You can use the `Chart.Pie` element to add a pie chart in an Adaptive Card.

# [Card](#tab/card6)

:::image type="content" source="../../assets/images/adaptive-cards/charts/pie-chart.png" alt-text="Screenshot shows a pie chart in an Adaptive Card.":::

# [Payload](#tab/payload6)

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

---

Here are the properties of the `Chart.Pie` element:

| Property | Required | Type | Description |
|----|----|----|----|
| `type` | ✔️ | String | Must be `Chart.Pie`. |
| `colorSet` | | String | The name of the set of colors to use to render the chart. |
| `data` | | Array of objects | The data to display in the chart. |
| `fallback` | | Object or String | An alternate element to render if this element is unsupported or if the host application doesn't support all the capabilities specified in the `requires` property.<br>Allowed values: `Container`, `ActionSet`, `ColumnSet`, `Media`, `RichTextBlock`, `Table`, `TextBlock`, `FactSet`, `ImageSet`, `Image`, `Input.Text`, `Input.Date`, `Input.Time`, `Input.Number`, `Input.Toggle`, `Input.ChoiceSet`, `Input.Rating`, `Rating`, `CompoundButton`, `Icon`, `Chart.Donut`, `Chart.Pie`, `Chart.VerticalBar.Grouped`, `Chart.VerticalBar`, `Chart.HorizontalBar`, `Chart.HorizontalBar.Stacked`, `Chart.Line`, `Chart.Gauge`, `CodeBlock`, `drop` |
| `grid.area` | | String | The area of a `Layout.AreaGrid` layout in which an element must be displayed. |
| `height` | | String | Controls the height of the element. When set to `stretch`, the element uses the remaining vertical space in its container.<br>Allowed values: `auto`, `stretch`<br>Default value: `auto` |
| `horizontalAlignment` | | String | Controls how the element must be horizontally aligned.<br>Allowed values: `Left`, `Center`, `Right` |
| `id` | | String | A unique identifier for the input element or action. |
| `isVisible` | | Boolean | Controls if the element is visible.<br>Default value: `true` |
| `lang` | | String | The locale associated with the input element. |
| `requires` | | Object | A list of capabilities the element requires the host application to support. If the host application doesn't support at least one of the listed capabilities, the element isn't rendered or its fallback is rendered, if provided.<br>Supported value: `HostCapabilities` |
| `separator` | | Boolean | Controls whether a separator line must be displayed above the element to visually separate it from the previous element. No separator is displayed for the first element in a container, even if this property is set to `true`.<br>Default value: `false`|
| `spacing` | | String | Controls the amount of space between this element and the previous one. No space is added for the first element in a container.<br>Allowed values: `None`, `Small`, `Default`, `Medium`, `Large`, `ExtraLarge`, `Padding`<br>Default value: `Default` |
| `targetWidth` | | String | Controls the card width for which the element must be displayed. If `targetWidth` isn't specified, the element is rendered at all card widths. Using `targetWidth` makes it possible to author responsive cards that adapt their layout to the available horizontal space.<br>For more information, see [Adaptive Card responsive layout](cards-format.md#adaptive-card-responsive-layout).<br>Allowed values: `VeryNarrow`, `Narrow`, `Standard`, `Wide`, `atLeast:VeryNarrow`, `atMost:VeryNarrow`, `atLeast:Narrow`, `atMost:Narrow`, `atLeast:Standard`, `atMost:Standard`, `atLeast:Wide`, `atMost:Wide` |
| `title` | | String | The title of the chart. |

Here are the properties of the `data` array:

| Property | Required | Type | Description |
|----|----|----|----|
| `color` | | String | The color to use for the data point.<br>Allowed values: `good`, `warning`, `attention`, `neutral`, `categoricalRed`, `categoricalPurple`, `categoricalLavender`, `categoricalBlue`, `categoricalLightBlue`, `categoricalTeal`, `categoricalGreen`, `categoricalLime`, `categoricalMarigold`, `sequential1`, `sequential2`, `sequential3`, `sequential4`, `sequential5`, `sequential6`, `sequential7`, `sequential8`, `divergingBlue`, `divergingLightBlue`, `divergingCyan`, `divergingTeal`, `divergingYellow`, `divergingPeach`, `divergingLightRed`, `divergingRed`, `divergingMaroon`, `divergingGray` |
| `legend` | | String | The legend of the chart. |
| `value` | | Number | The value associated with the data point. |

## Stacked horizontal bar chart

You can use the `Chart.HorizontalBar.Stacked` element to add a stacked horizontal bar chart in an Adaptive Card.

# [Card](#tab/card7)

:::image type="content" source="../../assets/images/adaptive-cards/charts/horizontalbar-stacked-chart.png" alt-text="Screenshot shows a stacked horizontal bar chart in an Adaptive Card.":::

# [Payload](#tab/payload7)

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

---

Here are the properties of the `Chart.HorizontalBar.Stacked` element:

| Property | Required | Type | Description |
|----|----|----|----|
| `type` | ✔️ | String | Must be `Chart.HorizontalBar.Stacked`. |
| `color` | | String | The color to use for all data points.<br>Allowed values: `good`, `warning`, `attention`, `neutral`, `categoricalRed`, `categoricalPurple`, `categoricalLavender`, `categoricalBlue`, `categoricalLightBlue`, `categoricalTeal`, `categoricalGreen`, `categoricalLime`, `categoricalMarigold`, `sequential1`, `sequential2`, `sequential3`, `sequential4`, `sequential5`, `sequential6`, `sequential7`, `sequential8`, `divergingBlue`, `divergingLightBlue`, `divergingCyan`, `divergingTeal`, `divergingYellow`, `divergingPeach`, `divergingLightRed`, `divergingRed`, `divergingMaroon`, `divergingGray` |
| `colorSet` | | String | The name of the set of colors to use to render the chart. |
| `data` | | Array of objects | The data points in the chart. |
| `fallback` | | Object or String | An alternate element to render if this element is unsupported or if the host application doesn't support all the capabilities specified in the `requires` property.<br>Allowed values: `Container`, `ActionSet`, `ColumnSet`, `Media`, `RichTextBlock`, `Table`, `TextBlock`, `FactSet`, `ImageSet`, `Image`, `Input.Text`, `Input.Date`, `Input.Time`, `Input.Number`, `Input.Toggle`, `Input.ChoiceSet`, `Input.Rating`, `Rating`, `CompoundButton`, `Icon`, `Chart.Donut`, `Chart.Pie`, `Chart.VerticalBar.Grouped`, `Chart.VerticalBar`, `Chart.HorizontalBar`, `Chart.HorizontalBar.Stacked`, `Chart.Line`, `Chart.Gauge`, `CodeBlock`, `drop` |
| `grid.area` | | String | The area of a `Layout.AreaGrid` layout in which an element must be displayed. |
| `height` | | String | Controls the height of the element. When set to `stretch`, the element uses the remaining vertical space in its container.<br>Allowed values: `auto`, `stretch`<br>Default value: `auto` |
| `horizontalAlignment` | | String | Controls how the element must be horizontally aligned.<br>Allowed values: `Left`, `Center`, `Right` |
| `id` | | String | A unique identifier for the input element or action. |
| `isVisible` | | Boolean | Controls if the element is visible.<br>Default value: `true` |
| `lang` | | String | The locale associated with the input element. |
| `requires` | | Object | A list of capabilities the element requires the host application to support. If the host application doesn't support at least one of the listed capabilities, the element isn't rendered or its fallback is rendered, if provided.<br>Supported value: `HostCapabilities` |
| `separator` | | Boolean | Controls whether a separator line must be displayed above the element to visually separate it from the previous element. No separator is displayed for the first element in a container, even if this property is set to `true`.<br>Default value: `false`|
| `spacing` | | String | Controls the amount of space between this element and the previous one. No space is added for the first element in a container.<br>Allowed values: `None`, `Small`, `Default`, `Medium`, `Large`, `ExtraLarge`, `Padding`<br>Default value: `Default` |
| `targetWidth` | | String | Controls the card width for which the element must be displayed. If `targetWidth` isn't specified, the element is rendered at all card widths. Using `targetWidth` makes it possible to author responsive cards that adapt their layout to the available horizontal space.<br>For more information, see [Adaptive Card responsive layout](cards-format.md#adaptive-card-responsive-layout).<br>Allowed values: `VeryNarrow`, `Narrow`, `Standard`, `Wide`, `atLeast:VeryNarrow`, `atMost:VeryNarrow`, `atLeast:Narrow`, `atMost:Narrow`, `atLeast:Standard`, `atMost:Standard`, `atLeast:Wide`, `atMost:Wide` |
| `title` | | String | The title of the chart. |
| `xAxisTitle` | | String | The title of the x axis.|
| `yAxisTitle` | | String | The title of the y axis. |

Here are the properties of the `data` array:

| Property | Required | Type | Description |
|----|----|----|----|
| `data` | | Array of objects | The data points in the series. |
| `title` | | String | The title of the series. |

Here are the properties of the nested `data` array:

| Property | Required | Type | Description |
|----|----|----|----|
| `color` | | String | The color to use for the data point.<br>Allowed values: `good`, `warning`, `attention`, `neutral`, `categoricalRed`, `categoricalPurple`, `categoricalLavender`, `categoricalBlue`, `categoricalLightBlue`, `categoricalTeal`, `categoricalGreen`, `categoricalLime`, `categoricalMarigold`, `sequential1`, `sequential2`, `sequential3`, `sequential4`, `sequential5`, `sequential6`, `sequential7`, `sequential8`, `divergingBlue`, `divergingLightBlue`, `divergingCyan`, `divergingTeal`, `divergingYellow`, `divergingPeach`, `divergingLightRed`, `divergingRed`, `divergingMaroon`, `divergingGray` |
| `legend` | | String | The legend associated with the data point. |
| `value` | | Number | The value of the data point. |

## Vertical bar chart

You can use the `Chart.VerticalBar` element to add a vertical bar chart in an Adaptive Card.

# [Card](#tab/card8)

:::image type="content" source="../../assets/images/adaptive-cards/charts/verticalbar-chart.png" alt-text="Screenshot shows a vertical bar chart in an Adaptive Card.":::

# [Payload](#tab/payload8)

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

---

Here are the properties of the `Chart.VerticalBar` element:

| Property | Required | Type | Description |
|----|----|----|----|
| `type` | ✔️ | String | Must be `Chart.VerticalBar`. |
| `color` | | String | The color to use for all data points. <br>Allowed values:`good`,`warning`,`attention`,`neutral`,`categoricalRed`,`categoricalPurple`,`categoricalLavender`,`categoricalBlue`,`categoricalLightBlue`,`categoricalTeal`,`categoricalGreen`,`categoricalLime`,`categoricalMarigold`,`sequential1`,`sequential2`,`sequential3`,`sequential4`,`sequential5`,`sequential6`,`sequential7`,`sequential8`,`divergingBlue`,`divergingLightBlue`,`divergingCyan`,`divergingTeal`,`divergingYellow`,`divergingPeach`,`divergingLightRed`,`divergingRed`,`divergingMaroon`,`divergingGray` |
| `colorSet` | | String | The name of the set of colors to use to render the chart. |
| `data` | | Array of objects | The data points in the chart. |
| `fallback` | | Object or String | An alternate element to render if this element is unsupported or if the host application doesn't support all the capabilities specified in the `requires` property.<br>Allowed values: `Container`, `ActionSet`, `ColumnSet`, `Media`, `RichTextBlock`, `Table`, `TextBlock`, `FactSet`, `ImageSet`, `Image`, `Input.Text`, `Input.Date`, `Input.Time`, `Input.Number`, `Input.Toggle`, `Input.ChoiceSet`, `Input.Rating`, `Rating`, `CompoundButton`, `Icon`, `Chart.Donut`, `Chart.Pie`, `Chart.VerticalBar.Grouped`, `Chart.VerticalBar`, `Chart.HorizontalBar`, `Chart.HorizontalBar.Stacked`, `Chart.Line`, `Chart.Gauge`, `CodeBlock`, `drop` |
| `grid.area` | | String | The area of a `Layout.AreaGrid` layout in which an element must be displayed. |
| `height` | | String | Controls the height of the element. When set to `stretch`, the element uses the remaining vertical space in its container.<br>Allowed values: `auto`, `stretch`<br>Default value: `auto` |
| `horizontalAlignment` | | String | Controls how the element must be horizontally aligned.<br>Allowed values: `Left`, `Center`, `Right` |
| `id` | | String | A unique identifier for the input element or action. |
| `isVisible` | | Boolean | Controls if the element is visible.<br>Default value: `true` |
| `lang` | | String | The locale associated with the input element. |
| `requires` | | Object | A list of capabilities the element requires the host application to support. If the host application doesn't support at least one of the listed capabilities, the element isn't rendered or its fallback is rendered, if provided.<br>Supported value: `HostCapabilities` |
| `separator` | | Boolean | Controls whether a separator line must be displayed above the element to visually separate it from the previous element. No separator is displayed for the first element in a container, even if this property is set to `true`.<br>Default value: `false`|
| `showBarValues` | | Boolean | Controls if the bar values must be displayed.<br>Default value: `false` |
| `spacing` | | String | Controls the amount of space between this element and the previous one. No space is added for the first element in a container.<br>Allowed values: `None`, `Small`, `Default`, `Medium`, `Large`, `ExtraLarge`, `Padding`<br>Default value: `Default` |
| `targetWidth` | | String | Controls the card width for which the element must be displayed. If `targetWidth` isn't specified, the element is rendered at all card widths. Using `targetWidth` makes it possible to author responsive cards that adapt their layout to the available horizontal space.<br>For more information, see [Adaptive Card responsive layout](cards-format.md#adaptive-card-responsive-layout).<br>Allowed values: `VeryNarrow`, `Narrow`, `Standard`, `Wide`, `atLeast:VeryNarrow`, `atMost:VeryNarrow`, `atLeast:Narrow`, `atMost:Narrow`, `atLeast:Standard`, `atMost:Standard`, `atLeast:Wide`, `atMost:Wide` |
| `title` | | String | The title of the chart. |
| `xAxisTitle` | | String | The title of the x axis.|
| `yAxisTitle` | | String | The title of the y axis. |

Here are the properties of the `data` array:

| Property | Required | Type | Description |
|----|----|----|----|
| `color` | | String | The color to use for the data point.<br>Allowed values: `good`, `warning`, `attention`, `neutral`, `categoricalRed`, `categoricalPurple`, `categoricalLavender`, `categoricalBlue`, `categoricalLightBlue`, `categoricalTeal`, `categoricalGreen`, `categoricalLime`, `categoricalMarigold`, `sequential1`, `sequential2`, `sequential3`, `sequential4`, `sequential5`, `sequential6`, `sequential7`, `sequential8`, `divergingBlue`, `divergingLightBlue`, `divergingCyan`, `divergingTeal`, `divergingYellow`, `divergingPeach`, `divergingLightRed`, `divergingRed`, `divergingMaroon`, `divergingGray` |
| `x` | | One of number or string | The x axis value of the data point. |
| `y` | | Number | The y axis value of the data point. |

## Code sample

|**Sample name** | **Description** | **Node.js** | **NET** |
|----|----|----|----|----|
| Chart in Adaptive Cards | The sample demonstrates the various types of charts in Adaptive Cards. | [View](https://github.com/OfficeDev/Microsoft-Teams-Samples/tree/main/) | [View](https://github.com/OfficeDev/Microsoft-Teams-Samples/tree/main/) |

## See also

* [Cards and dialogs](../cards-and-task-modules.md)
* [Adaptive Card responsive layout](cards-format.md#adaptive-card-responsive-layout)
