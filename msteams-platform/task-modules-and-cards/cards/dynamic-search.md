---
title: Search Types & Usage in Adaptive Cards
author: Rajeshwari-v
description: Learn how to use Input.ChoiceSet to implement static and dynamic typeahead search and dependent dropdowns in Adaptive Cards.
ms.topic: conceptual
ms.localizationpriority: medium
ms.author: surbhigupta
ms.date: 05/25/2023
---

# Typeahead search in Adaptive Cards

Typeahead search functionality in Adaptive Cards gives an enhanced search experience on `Input.ChoiceSet` component. It provides a list of choices to enter text in the search field. You can incorporate typeahead search with Adaptive Cards to search and select data.

You can use typeahead search for the following searches:

* [Static search](#static-typeahead-search)
* [Dynamic search](#dynamic-typeahead-search)

## Static typeahead search

Static typeahead search allows users to search from values specified within `Input.ChoiceSet` in the Adaptive Card payload. Static typeahead search can be used to show multiple choices to the user. The payload size in static search increases with number of choices specified in the payload.
As user starts entering the texts, the choices are filtered, which partially match the input. The dropdown list highlights the input characters that match the search.

The following image demonstrates static typeahead search:

![Graphical representation demonstrates the static typehead search.](~/assets/images/Cards/static-typeahead-search.gif)

## Dynamic typeahead search

Dynamic typeahead search is useful to search and select data from large data sets. The data sets are loaded dynamically from the dataset specified in the card payload. The typeahead functionality helps to filter out the choices as the user types.

# [Desktop](#tab/desktop)

:::image type="content" source="../../assets/images/Cards/dynamic-typeahead-search-desktop.png" alt-text="Dynamic typeahead search":::

:::image type="content" source="../../assets/images/Cards/dynamic-typeahead-search-desktop-2.png" alt-text="Dynamic typeahead search 2":::

# [Mobile](#tab/mobile)

Android and iOS mobile clients support typeahead search in Adaptive Cards.

**Scenario**

John is a store employee who works at an Xbox retail store. The store uses a bot to take new purchase requests from customers. A customer can search from the thousands of games available. Typeahead search in Adaptive Cards is used to search and select customers' choices.

**To use typeahead search in Adaptive Cards**

1. User A opens the store bot.
1. User A sends a command to the bot for a **New customer request**. The bot responds with the Adaptive Card that has `Input.ChoiceSet` component.
1. User A uses typeahead search to search and select the information based on the customer's choice.

The following image illustrates mobile experience of typeahead search:

![Graphical representation demonstrates the static typehead search.](~/assets/images/Cards/static-typeahead-search.gif)

---

> [!NOTE]
> You can't get rich card experiences with dynamic search, such as query-based message extensions.

## Implement typeahead search

`Input.ChoiceSet` is one of the important input components in Adaptive Cards. You can add a typeahead search control to `Input.ChoiceSet` component to implement typeahead search. You can search and select the required information with the following selections:

* Dropdown, such as expanded selection.
* Radio button, such as single selection.
* Checkboxes, such as multiple selections.

> [!NOTE]
>
> * The `Input.ChoiceSet` control is based on the style and `isMultiSelect` properties.
> * To use dynamic typeahead search in group chat, the user must add `groupchat` scope to the bot installation scope in the app manifest and install it to that particular group chat.
> * The number of options in the dropdown is limited to 15.

### Schema properties

The following properties are the new additions to the [`Input.ChoiceSet`](https://adaptivecards.io/explorer/Input.ChoiceSet.html) schema to enable typeahead search:

| Property| Type | Required | Description |
|-----------|------|----------|-------------|
| style | Compact <br/> Expanded <br/> Filtered | No | Adds filtered style to the list of supported validations for static typeahead. |
| choices.data | Data.Query | No | Enables dynamic typeahead as the user types, by fetching a remote set of choices from a backend. |
| value | String | No | The initial choice (or set of choices) that must be selected. For multi-select, specify a comma-separated string of values. |

### Data.Query definition

| Property| Type | Required | Description |
|-----------|------|----------|-------------|
| type | Data.Query | Yes | Specifies that it's a Data.Query object. |
| dataset | String | Yes | Specifies the type of data that is fetched dynamically. |
| value | String | No | Populates for the invoke request to the bot with the input that the user provided to the `ChoiceSet`. |
| count | Number | No | Populates for the invoke request to the bot to specify the number of elements that must be returned. The bot ignores it if the users want to send a different amount. |
| skip | Number | No | Populates for the invoke request to the bot to indicate that users want to paginate and move ahead in the list. |

### Example

The example payload which contains static and dynamic typeahead search with single and multi select options as follows:

```json
{
  "type": "AdaptiveCard",
  "body": [
    {
      "columns": [
        {
          "width": "1",
          "items": [
            {
              "size": null,
              "url": "https://urlp.asm.skype.com/v1/url/content?url=https%3a%2f%2fi.imgur.com%2fhdOYxT8.png",
              "height": "auto",
              "type": "Image"
            }
          ],
          "type": "Column"
        },
        {
          "width": "2",
          "items": [
            {
              "size": "extraLarge",
              "text": "Game Purchase",
              "weight": "bolder",
              "wrap": true,
              "type": "TextBlock"
            }
          ],
          "type": "Column"
        }
      ],
      "type": "ColumnSet"
    },
    {
      "text": "Please fill out the below form to send a game purchase request.",
      "wrap": true,
      "type": "TextBlock"
    },
    {
      "columns": [
        {
          "width": "auto",
          "items": [
            {
              "text": "Game: ",
              "wrap": true,
              "height": "stretch",
              "type": "TextBlock"
            }
          ],
          "type": "Column"
        }
      ],
      "type": "ColumnSet"
    },
    {
      "columns": [
        {
          "width": "stretch",
          "items": [
            {
              "choices": [
                {
                  "title": "Call of Duty",
                  "value": "call_of_duty"
                },
                {
                  "title": "Death's Door",
                  "value": "deaths_door"
                },
                {
                  "title": "Grand Theft Auto V",
                  "value": "grand_theft"
                },
                {
                  "title": "Minecraft",
                  "value": "minecraft"
                }
              ],
              "style": "filtered",
              "placeholder": "Search for a game",
              "id": "choiceGameSingle",
              "type": "Input.ChoiceSet"
            }
          ],
          "type": "Column"
        }
      ],
      "type": "ColumnSet"
    },
    {
      "columns": [
        {
          "width": "auto",
          "items": [
            {
              "text": "Multi-Game: ",
              "wrap": true,
              "height": "stretch",
              "type": "TextBlock"
            }
          ],
          "type": "Column"
        }
      ],
      "type": "ColumnSet"
    },
    {
      "columns": [
        {
          "width": "stretch",
          "items": [
            {
              "choices": [
                {
                  "title": "Static Option 1",
                  "value": "static_option_1"
                },
                {
                  "title": "Static Option 2",
                  "value": "static_option_2"
                },
                {
                  "title": "Static Option 3",
                  "value": "static_option_3"
                }
              ],
              "value": "Static_option_2",
              "isMultiSelect": true,
              "style": "filtered",
              "choices.data": {
                "type": "Data.Query",
                "dataset": "xbox"
              },
              "id": "choiceGameMulti",
              "type": "Input.ChoiceSet"
            }
          ],
          "type": "Column"
        }
      ],
      "type": "ColumnSet"
    },
    {
      "columns": [
        {
          "width": "auto",
          "items": [
            {
              "text": "Needed by: ",
              "wrap": true,
              "height": "stretch",
              "type": "TextBlock"
            }
          ],
          "type": "Column"
        },
        {
          "width": "stretch",
          "items": [
            {
              "id": "choiceDate",
              "type": "Input.Date"
            }
          ],
          "type": "Column"
        }
      ],
      "type": "ColumnSet"
    },
    {
      "text": "Buy and download digital games and content directly from your Xbox console, Windows 10 PC, or at Xbox.com.",
      "wrap": true,
      "type": "TextBlock"
    },
    {
      "text": "Earn points for what you already do on Xbox, then redeem your points on real rewards. Play more, get rewarded. Start earning today.",
      "wrap": true,
      "type": "TextBlock"
    }
  ],
  "actions": [
    {
      "data": {
        "msteams": {
          "type": "invoke",
          "value": {
            "type": "task/submit"
          }
        }
      },
      "title": "Request Purchase",
      "type": "Action.Submit"
    }
  ],
  "$schema": "http://adaptivecards.io/schemas/adaptive-card.json",
  "version": "1.2"
}
```

## Code snippets for invoke request and response

### Invoke request

```json
{
    "name": "application/search",
    "type": "invoke",
    "value": {
        "queryText": "fluentui",
        "queryOptions": {
            "skip": 0,
            "top": 15
        },
        "dataset": "npm"
    },
    "locale": "en-US",
    "localTimezone": "America/Los_Angeles",
    // …. other fields
}
```

### Response

#### [C#](#tab/csharp)

```csharp
protected override async Task<InvokeResponse> OnInvokeActivityAsync(ITurnContext<IInvokeActivity> turnContext, CancellationToken cancellationToken)
{
    if (turnContext.Activity.Name == "application/search")
    {
 var packages = new[] {
   new { title = "A very extensive set of extension methods", value = "FluentAssertions" },
   new { title = "Fluent UI Library", value = "FluentUI" }};

 var searchResponseData = new
 {
     type = "application/vnd.microsoft.search.searchResponse",
     value = new
     {
  results = packages
     }
 };
 var jsonString = JsonConvert.SerializeObject(searchResponseData);
 JObject jsonData = JObject.Parse(jsonString);
 return new InvokeResponse()
 {
     Status = 200,
     Body = jsonData
 };
    }

    return null;
}
```

#### [Node.js](#tab/nodejs)

```nodejs
  async onInvokeActivity(context) {
    if (context._activity.name == 'application/search') {
      // let searchQuery = context._activity.value.queryText;  // This can be used to filter the results
      var successResult = {
        status: 200,
        body: {
          "type": "application/vnd.microsoft.search.searchResponse",
          "value": {
            "results": [
              {
                "value": "FluentAssertions",
                "title": "A very extensive set of extension methods"
              },
              {
                "value": "FluentUI",
                "title": "Fluent UI Library"
              }
            ]
          }
        }
      }

      return successResult;

    }
  }
```

#### [JSON](#tab/json)

```json
{
    "status": 200,
    "body" : {
        "type": "application/vnd.microsoft.search.searchResponse",
        "value": {
           "results": [
                {
                    "value": "FluentAssertions",
                    "title": "A very extensive set of extension methods."
                },
                {
                    "value": "FluentUI",
                    "title": "Fluent UI Library"
                }
            ]
        }
    }
}
```

---

## Dependent dropdowns

> [!NOTE]
>
> * Dependent dropdowns require Adaptive Card schema version 1.6 or later.
> * Dependent dropdowns aren't available in [Government Community Cloud (GCC), GCC High, and Department of Defense (DOD)](~/concepts/app-fundamentals-overview.md#government-community-cloud) environments.

Dependent dropdowns are dropdown lists where the values in one dropdown list depend on the selection made in another dropdown list. Dependent dropdowns are useful for filtering out options based on a previous choice. You can design Adaptive Cards in Teams that contain dependent dropdown lists with dynamic typeahead search.

For example, when you have two dropdown lists in an Adaptive Card: one for selecting a country and another for selecting a specific city within that country.

**Placeholder for GIF**

:::image type="content" source="../../assets/images/adaptive-cards/ac-dependent-dropdown-usa.jpg" alt-text="Screenshot shows a dependent dropdown with USA and its states.":::

If a user selects **USA** as the country in the first dropdown list, the second dropdown list must display the various states in the USA, such as **CA**, **FL**, and **TX**. If the user changes the selection from **USA** to **India**, the values in the second dropdown must be reset, and a new list of states in India must be displayed.

However, the input values in the elements of an Adaptive Card are independent of each other. Hence, when a user changes the input value in one element, Teams doesn't send the input values of the other elements to the bot. In the example, when the user changes the country name from USA to India, the action can cause the following two issues:

* You can validate the input data in the card only when the user submits the entire form. If the validation fails, the bot displays an error message. In the example, the validation fails because the selected country is India, but the states displayed belong to the USA.

* For large datasets, if you don't have appropriate filters, the latency of the search query increases as the bot has to search and retrieve the appropriate value from a huge chunk of the dataset. In the example, the bot has to search for city names from the list of all available countries in the dataset.

Hence, to implement dependent dropdowns, ensure that when a user changes a value in a dropdown, the updated input values of all dependent elements are sent to the bot, and the dropdown’s input value is reset.

### Implement dependent dropdowns

You can implement dependent dropdowns where one input value (of any type) is associated with a dropdown list with dynamic typeahead search, and acts as a filter for the dropdown list's input values. The following diagram illustrates how the user, Adaptive Card, the host, and the bot interact in a dependent dropdown:

**Placeholder image**

:::image type="content" source="../../assets/images/adaptive-cards/dependent-dropdown-flow.png" alt-text="Screenshot shows how a user, an Adaptive Card, a host, and a bot interact in a dependent dropdown.":::

* When a user changes an input value in a field, the existing input value in the dropdown list might become invalid. Define the `Action.ResetInputs` property to reset the values in the dropdown list and trigger a data query request to the bot. For more information about the `Action.ResetInputs` property, see [Action.ResetInputs](cards-actions.md#actionresetinputs).

* To associate the input value with the dropdown list, define the `associatedInputs` property under the `Data.Query` object of the dropdown list. To ensure that the data query request sent to the bot contains the updated input values of all the elements in the card, set the value of `associatedInputs` to `auto`.

* The bot uses these values to filter the list in the second dropdown and dynamically retrieve the associated dataset. This enables the user to pick a new input value from the dropdown list.

The following JSON payload shows how to implement dependent dropdowns using the `associatedInputs` and `Action.ResetInputs` properties:

**Placeholder**

```json
{
    "type": "AdaptiveCard",
    "$schema": "https://adaptivecards.io/schemas/adaptive-card.json",
    "version": "1.6",
    "body": [
        {
            "type": "Input.ChoiceSet",
            "choices": [
                {
                    "title": "Choice 1",
                    "value": "Choice 1"
                },
                {
                    "title": "Choice 2",
                    "value": "Choice 2"
                }
            ],
            "placeholder": "Placeholder text",
            "id": "main",
            "label": "Main input - changing its value will reset all the other inputs",
            "valueChangedAction": {
                "type": "Action.ResetInputs",
                "targetInputIds": [
                    "text",
                    "multiline",
                    "date",
                    "time",
                    "number",
                    "compact",
                    "expanded",
                    "toggle"
                ]
            }
        },
        {
            "type": "Input.Text",
            "placeholder": "Placeholder text",
            "label": "Input.Text",
            "id": "text",
            "separator": true,
            "spacing": "ExtraLarge"
        },
        {
            "type": "Input.Text",
            "placeholder": "Placeholder text",
            "label": "Multiline Input.Text",
            "id": "multiline",
            "isMultiline": true
        },
        {
            "type": "Input.Date",
            "label": "Input.Date",
            "id": "date"
        },
        {
            "type": "Input.Time",
            "label": "Input.Time",
            "id": "time"
        },
        {
            "type": "Input.Number",
            "placeholder": "Placeholder text",
            "label": "Input.Number",
            "id": "number"
        },
        {
            "type": "Input.ChoiceSet",
            "choices": [
                {
                    "title": "Choice 1",
                    "value": "Choice 1"
                },
                {
                    "title": "Choice 2",
                    "value": "Choice 2"
                }
            ],
            "placeholder": "Placeholder text",
            "label": "Compact Input.ChoiceSet",
            "id": "compact"
        },
        {
            "type": "Input.ChoiceSet",
            "choices": [
                {
                    "title": "Choice 1",
                    "value": "Choice 1"
                },
                {
                    "title": "Choice 2",
                    "value": "Choice 2"
                }
            ],
            "placeholder": "Placeholder text",
            "label": "Expanded Input.ChoiceSet",
            "id": "expanded"
        },
        {
            "type": "Input.Toggle",
            "title": "New Input.Toggle",
            "label": "Input.Toggle",
            "id": "toggle"
        }
    ]
}
```

| Property| Type | Required | Description |
|---|---|---|---|
| `associatedInputs` | String | No | Specifies the inputs that are associated with the `Data.Query` object. When a `Data.Query` is executed, the values of the associated inputs are sent to the bot, allowing it to filter values based on the user's input. Allowed values: "auto", "none" |

## Code sample

|**Sample name** | **Description** | **.NET** | **Node.js** | **Manifest**
|----------------|-----------------|--------------|----------------|----------------|
| Typeahead search control on Adaptive Cards | The sample shows how to use static and dynamic typeahead search control in Adaptive Cards. | [View](https://github.com/OfficeDev/Microsoft-Teams-Samples/tree/main/samples/bot-type-ahead-search-adaptive-cards/csharp) | [View](https://github.com/OfficeDev/Microsoft-Teams-Samples/tree/main/samples/bot-type-ahead-search-adaptive-cards/nodejs) | [View](https://github.com/OfficeDev/Microsoft-Teams-Samples/tree/main/samples/bot-type-ahead-search-adaptive-cards/csharp/demo-manifest/Typeahead-search-adaptive-cards.zip)

## See also

* [Cards and dialogs](../cards-and-task-modules.md)
* [Universal Actions for Adaptive Cards](Universal-actions-for-adaptive-cards/Overview.md)
* [Media elements in Adaptive Card](media-elements-in-adaptive-cards.md)
