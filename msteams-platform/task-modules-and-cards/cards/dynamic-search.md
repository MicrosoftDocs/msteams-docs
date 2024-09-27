---
title: Search Types & Usage in Adaptive Cards
author: Rajeshwari-v
description: In this module, learn how to use Input.ChoiceSet to implement static and dynamic typeahead search and dependent dropdowns in Adaptive Cards.
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
| `associatedInputs` | String | No | Specifies the input values associated with the `Data.Query` object. Allowed values: `auto`, `none` |

When you define the `associatedInputs` property under the `Data.Query` object, Teams includes the values of the all input values in the card in the data query request sent to the bot. This action allows the bot to use those values as search filters to refine dynamic typeahead search. For more information, see [dependent dropdowns](#dependent-dropdowns).

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
> Dependent dropdowns aren't available in [Government Community Cloud (GCC), GCC High, and Department of Defense (DOD)](~/concepts/app-fundamentals-overview.md#government-community-cloud) environments.

Dependent dropdowns are dropdown lists where the options in a list depend on the value of another input field. Dependent dropdowns make Adaptive Cards more intuitive by limiting options to relevant choices and preventing invalid data entries. You can design Adaptive Cards in Teams that contain dependent dropdowns with dynamic typeahead search.

For example, consider an Adaptive Card with two dropdown lists: one for selecting a country and another for selecting a specific city within that country. The first dropdown list filters the cities shown in the second dropdown list.

If a user selects **USA** as the country in the first dropdown list, the second dropdown list displays the various states in the USA, such as **CA**, **FL**, and **TX**. If the user changes the selection from **USA** to **India**, the values in the second dropdown are reset, and a new list of states in India is displayed.

**Placeholder for GIF**

# [Desktop](#tab/desktop)

:::image type="content" source="../../assets/images/adaptive-cards/ac-dependent-dropdown-usa.jpg" alt-text="Screenshot shows a dependent dropdown with USA and its states.":::

# [Mobile](#tab/mobile)

:::image type="content" source="../../assets/images/adaptive-cards/ac-dependent-dropdown-usa.jpg" alt-text="Screenshot shows a dependent dropdown with USA and its states.":::

---

### How dependent dropdowns work

The following diagram illustrates how the user, Adaptive Card, the host, and the bot interact in a dependent dropdown:

:::image type="content" source="../../assets/images/adaptive-cards/dependent-dropdown-flow.png" alt-text="Screenshot shows how a user, an Adaptive Card, a host, and a bot interact in a dependent dropdown." lightbox="../../assets/images/adaptive-cards/dependent-dropdown-flow.png":::

1. When a user changes an input value, the existing input value in the dependent dropdown becomes invalid. Define the [`Action.ResetInputs`](#actionresetinputs) property in your card's payload. This action ensures that Teams resets the values in the dropdown list and triggers a data query request to the bot.

1. The input values in the elements of an Adaptive Card are independent. Hence, Teams doesn't send the input values of the other elements in the data query request to the bot. Define the [`associatedInputs`](#associatedinputs) property under the `Data.Query` object of the dropdown list. This action ensures that the updated input values of all elements are sent to the bot.

1. The bot uses these values to filter the list in the dropdown and dynamically retrieve the associated dataset. This enables the user to pick a new input value from the dropdown list.

### Implement dependent dropdowns

You can build dependent dropdowns where one input value (of any type) is associated with a dropdown list with dynamic typeahead search. Ensure that you define the `Action.ResetInputs` and `associatedInputs` properties in the card's payload.

#### Action.ResetInputs

The `Action.ResetInputs` property resets the values of the inputs in an Adaptive Card. By default, the `Action.ResetInputs` property resets the values of all the inputs in an Adaptive Card. If you must reset particular input values, define the IDs of the elements containing those values in the `targetInputIds` property.

| Property| Type | Required | Description |
|---|---|---|---|
| `valueChangedAction` | Action.ResetInputs | No | Contains the `Action.ResetInputs` property |
| `Action.ResetInputs` | String | No | Resets the input values |
| `targetInputIds` | Array of strings | No | Defines the IDs of the input values to be reset |

#### associatedInputs

The `associatedInputs` property ensures that Teams includes the input values of all elements in a card when a data query request is sent to the bot. You must define the `associatedInputs` property under the `Data.Query` object of the `Input.ChoiceSet` control. If you set the value of the property to `auto`, Teams includes the input values of all elements in a card in the data query request sent to the bot. If you set the value of the property to `none`, Teams includes no input values in the data query request sent to the bot.

| Property| Type | Required | Description |
|---|---|---|---|
| `associatedInputs` | String | No | Specifies the inputs that are associated with the `Data.Query` object. Allowed values: `auto`, `none` |

The following JSON payload shows how to implement dependent dropdowns using the `associatedInputs` and `Action.ResetInputs` properties:

**To be validated**

```json
{
  "type": "AdaptiveCard",
  "$schema": "http://adaptivecards.io/schemas/adaptive-card.json",
  "version": "1.6",
  "body": [
    {
      "columns": [
        {
          "width": "auto",
          "items": [
            {
              "size": "extraLarge",
              "text": "Country Picker",
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
      "text": "Pick a country/region",
      "wrap": true,
      "type": "TextBlock"
    },
    {
      "columns": [
        {
          "width": "auto",
          "items": [
            {
              "text": "Select country/region",
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
                  "title": "USA",
                  "value": "usa"
                },
                {
                  "title": "India",
                  "value": "india"
                },
                {
                  "title": "China",
                  "value": "china"
                }
              ],
              "style": "filtered",
              "placeholder": "Search for a country/region",
              "id": "choiceCountry",
              "type": "Input.ChoiceSet"
            }
          ],
          "type": "Column",
          "valueChangedAction": {
          "type": "Action.ResetInputs",
          "targetInputIds": [
              "choiceCity"
          ]
        }
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
              "text": "Select city/cities",
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
                "dataset": "countries",
                "associatedInputs": "auto"
              },
              "id": "choiceCity",
              "type": "Input.ChoiceSet"
            }
          ],
          "type": "Column"
        }
      ],
      "type": "ColumnSet"
    },
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
      "title": "Confirm selection",
      "type": "Action.Submit"
    }
  ]
}
```

The following code snippet shows an example of a bot invoke request for the card payload:

```json
{
    "name": "application/search",
    "type": "invoke",
    "value": {
        "queryText": "india",
        "queryOptions": {
            "skip": 0,
            "top": 15
        },
        "dataset": "countries",
        "data": [
          {
            "inputId": "choiceCountry",
            "inputValue": "<value of the input>"
          },
          {
            "inputId": "choiceCity",
            "inputValue": "<value of the input>"
          }
        ]
    },
    "locale": "en-US",
    "localTimezone": "America/Los_Angeles"
    // …. other fields
}
```

## Code sample

|**Sample name** | **Description** | **.NET** | **Node.js** | **Manifest**
|----------------|-----------------|--------------|----------------|----------------|
| Typeahead search control on Adaptive Cards | The sample shows how to use static and dynamic typeahead search control in Adaptive Cards. | [View](https://github.com/OfficeDev/Microsoft-Teams-Samples/tree/main/samples/bot-type-ahead-search-adaptive-cards/csharp) | [View](https://github.com/OfficeDev/Microsoft-Teams-Samples/tree/main/samples/bot-type-ahead-search-adaptive-cards/nodejs) | [View](https://github.com/OfficeDev/Microsoft-Teams-Samples/tree/main/samples/bot-type-ahead-search-adaptive-cards/csharp/demo-manifest/Typeahead-search-adaptive-cards.zip)

## See also

* [Cards and dialogs](../cards-and-task-modules.md)
* [Universal Actions for Adaptive Cards](Universal-actions-for-adaptive-cards/Overview.md)
* [Media elements in Adaptive Card](media-elements-in-adaptive-cards.md)
