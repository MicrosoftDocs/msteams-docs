---
title: Typeahead search in Adaptive Cards 
author: Rajeshwari-v
description: Describes typeahead search with Input.ChoiceSet control in Adaptive Cards 
ms.topic: conceptual
localization_priority: Normal
ms.author: surbhigupta
---

# Typeahead search in Adaptive Cards  

> [!NOTE]
> Currently, this feature is available in [public developer preview](~/resources/dev-preview/developer-preview-intro.md) only.

Typeahead search functionality in Adaptive Cards gives an enhanced search experience on input choiceset component. It provides a list of choices to enter text in the search field. You can incorporate typeahead search with Adaptive Cards to search and select data.      

You can use typeahead search for the following searches: 

* [Static search](#static-typeahead-search)
* [Dynamic search](#dynamic-typeahead-search)

**Typeahead search process**

You can enter texts in the text box of typeahead enabled Adaptive Card to start the search. The search request goes to the bot as an invoke. The bot sends the response to the chat service. The response is validated and rendered.

The following image demonstrates the typeahead search process: 

![Typeahead search](../../assets/images/cards/dynamic-type-ahead-search-flow.png)

## Static typeahead search

Static typeahead search allows users to search from values specified within input.choiceset in the Adaptive Card payload. Static Type ahead search can be used to show a few choices to the user. The payload size in static search increases with number of choices specified in the payload.
As user starts entering the texts, the choices are filtered down to choices that partially match the input. The dropdown list highlights the input characters that match the search.     

The following image demonstrates static typeahead search:

[Placeholder for gif image]
 
## Dynamic typeahead search

Dynamic typeahead search is useful to search and select data from large data sets. The data sets are loaded dynamically from the dataset specified in the card payload. The type ahead functionality helps to filter out the choices as the user types. 

# [Desktop](#tab/desktop)

[Placeholder for desktop experience]

# [Mobile](#tab/mobile)

Android and iOS mobile clients support typeahead search in Adaptive Cards. 
 
**Example Scenario**

John is a store employee who works at an Xbox retail store. The store uses a bot to take new purchase requests from customers. A customer can search from the thousands of games available. Typeahead search in Adaptive Card is used to search and select customers' choices.

**To use typeahead search in Adaptive Cards**

1. User A opens the store bot.
1. User A sends a command to the bot for a **New customer request**. The bot responds with the Adaptive Card that has `Input.ChoiceSet` component.
1. User A uses typeahead search to search and select the information based on the customer's choice. 

The following image illustrates mobile experience of typeahead search:       

[Placeholder for gif image]

---

> [!NOTE] 
> You can't get rich card experiences with dynamic search, such as query based messaging extensions. 

## Implement typeahead search

`Input.ChoiceSet` is one of the important input components in Adaptive Cards. You can add a typeahead search control to `Input.ChoiceSet` component to implement typeahead search. You can search and select the required information with the following selections:       

* Dropdown, such as expanded selection.
* Radio button, such as single selection.
* Check boxes, such as multiple selections.

> [!NOTE]
> The Input.ChoiceSet control is based on the style and isMultiSelect properties.

### Schema properties

The following properties are the new additions to the [Input.ChoiceSet](https://adaptivecards.io/explorer/Input.ChoiceSet.html) schema to enable typeahead search:

| Property	| Type | Required | Description |
|-----------|------|----------|-------------|
| style | Compact <br/> Expanded <br/> Filtered | No | Adds filtered style to the list of supported validations for static type-ahead.|
| choices.data | Data.Query | No | Enables dynamic type-ahead as the user types, by fetching a remote set of choices from a backend. |

### Data.Query definition

| Property	| Type | Required | Description |
|-----------|------|----------|-------------|
| type | Data.Query	| Yes |	Specifies that it's a Data.Query object.|
| dataset | String | Yes | Specifies the type of data that is fetched dynamically. |
| value	| String | No | Populates for the invoke request to the bot with the input that the user provided to the `ChoiceSet`. |
| count	| Number | No | Populates for the invoke request to the bot to specify the number of elements that must be returned. The bot ignores it, if the users want to send a different amount. | 
| skip | Number | No | Populates for the invoke request to the bot to indicate that users want to paginate and move ahead in the list. |



