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

Typeahead search functionality gives an enhanced search experience. It provides a list of possible choices as you enter the text in the search field. You can incorporate type-ahead search with Adaptive Cards to search and select data.      

You can use typeahead search for following searches: 

* [Static search](#static-typeahead-search)
* [Dynamic search](#dynamic-typeahead-search)

The advantages of typeahead search are as follows:

* You can get the list of choices from a remote backend dynamically.
* You can view, select, and, remove single or multiple choices from the input choice set dropdown list.
* You can add images and text as part of the different input choices.
 
**Typeahead search process**

1. You can enter texts in the text box of typeahead enabled Adaptive Card to start the search. 
1. The search request goes to the bot as an invoke. The bot sends the response to the chat service.
1. The response is validated and rendered.

The following image demonstrates the typeahead search process: 

![Typeahead search](../../assets/images/cards/dynamic-type-ahead-search-flow.png)

## Static typeahead search

Static typeahead search is the search within the specified values in the Adaptive Card payload. The payload size in static search increases with number of choices. In static typeahead search, instead of a regular dropdown, a textbox with a dropdown like arrow is rendered on the right. The arrow indicates that this is a `ChoiceSet`.
As you start entering the texts, the choices are filtered down to choices that partially match the the input. The matching part of the input is highlighted in the dropdown. When the choice list ends, one choice is visible without drop down arrow.

## Dynamic typeahead search

Dynamic typeahead search is useful to search and select data from large data sets. The data sets are loaded dynamically from the remote backend. 

# [Desktop](#tab/desktop)

[Placeholder for desktop experience]

# [Mobile](#tab/mobile)

Android and iOS mobile clients support typeahead search in Adaptive Cards. 
 
**Search with a product catalog scenario example**

User A is a store employee who works at an online or offline platform for selling glasses. The store uses a bot to take new requests from customers. Typeahead search in Adaptive Card is used to search and select customers' choices.

**To use typeahead search in Adaptive Cards**

1. User A opens the store bot.
1. User A sends a command to the bot for a **New customer request**. The bot responds with the Adaptive Card that has `Input.ChoiceSet` component.
1. User A uses typeahead search to search and select the information based on the customer's choice. 

The `Input.ChoiceSet` component contains the following fields: 

|Field name|Type |Examples of values|
|----------|-------|-----------------|
|Select Product category |	Static | Sunglasses, Spectacles, Sports wear. |
|Select Brand|	Dynamic (fetched from server) |	Brands x, y, z. |
|Select Product	|Dynamic (fetched from server) | Different Models available. For example, Model A, Model B, Model C. |
|Select Color | Dynamic (fetched from server) |	Various color options. |      

The following image illustrates mobile experience of typeahead search:       

<img src="~/assets/images/cards/mobile-type-ahead-search.png" alt="Mobile experience" width="400"/>

---

## Implement typeahead search

`Input.ChoiceSet` is one of the important input components in Adaptive Cards. You can add a typeahead search control to `Input.ChoiceSet` component to implement typeahead search. You can search and select the required information with the following selections:       

* Dropdown, such as expanded selection.
* Radio button, such as single selection.
* Check boxes, such as multiple selections.

> [!NOTE]
> The Input.ChoiceSet control is based on the style and isMultiSelect properties.

### Update schema

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



