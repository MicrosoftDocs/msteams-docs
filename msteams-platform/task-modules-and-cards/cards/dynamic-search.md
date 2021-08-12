---
title: Type-ahead search in Adaptive Cards 
author: Rajeshwari-v
description: Describes static and dynamic type-ahead search with Input.ChoiceSet control in Adaptive Cards 
ms.topic: conceptual
localization_priority: Normal
ms.author: surbhigupta
---

# Type-ahead search in Adaptive Cards  

> [!NOTE]
> Currently, this feature is available in [public developer preview](~/resources/dev-preview/developer-preview-intro.md) only.

Type-ahead search in Adaptive Cards enhances your search experience. You can search and select data from data sets. You can use either static or dynamic search, the details are as follows:

* Static search: Search and select within the specified values from the Adaptive Card payload.
* Dynamic search: Search and select within data set loaded dynamically from the remote backend.

The payload size in static search increases with number of choices. To overcome such challenge, the dynamic search is useful to search and select choices from a dynamically loaded database. 

## Advantages

* You can get the list of choices from a remote backend dynamically.
* You can view, select, and remove a single item or multiple items from the input choice set drop-down menu.
* You can add images and text as part of the different input choices in dynamically fetched items.

## Limitations

* You can only use `Input.ChoiceSet` component of Adaptive Cards.
* You can only specify text and images as part of the list of dynamically fetched items. 
* You can't get rich card experiences with dynamic search, such as query based messaging extensions. 
 
## Understand how type-ahead search works

You can enter text in type-ahead search in Adaptive Card that supports dynamic search. The type-ahead search process starts. The following image demonstrates the process: 

![Type-ahead search](../../assets/images/cards/dynamic-type-ahead-search-flow.png)

## Desktop and mobile experience

# [Desktop](#tab/desktop)

[Placeholder for desktop experience]

# [Mobile](#tab/mobile)

Android and iOS mobile clients support type-ahead search in Adaptive Cards. 
 
### Search with a product catalog scenario example:

User A is a store employee who works at an online or offline platform for selling glasses. The store uses a bot to take new requests from customers. Type-ahead search in Adaptive Card is used to search and select customers' choices.

**To use type-ahead search in Adaptive Cards**

1. User A opens the store bot.
1. User A sends a command to the bot for a **New customer request**. The bot responds with the Adaptive Card that has `Input.ChoiceSet` component.
1. User A uses type-ahead search to search and select the information based on the customer's choice. 

The `Input.ChoiceSet` component contains the following fields: 

|Field name|Type |Examples of values|
|----------|-------|-----------------|
|Select Product category|	Static|	Sunglasses, Spectacles, Sports wear.| 
|Select Brand|	Dynamic (fetched from server) |	Brands x, y, z. |
|Select Product	|Dynamic (fetched from server) | Different Models available. For example, Model A, Model B, Model C. |
|Select Color | Dynamic (fetched from server) |	Various color options. |      

The following image illustrates mobile experience of dynamic search:       

<img src="~/assets/images/cards/mobile-type-ahead-search.png" alt="Mobile experience" width="400"/>

---

## Implement type-ahead search

`Input.ChoiceSet` is one of the important input components in Adaptive Cards. You can add a type-ahead search control to `Input.ChoiceSet` component to implement type-ahead search. You can search and select the required information with the following selections:       

* Dropdown, such as expanded selection.
* Radio button, such as single selection.
* Check boxes, such as multiple selections. 

### Update schema

The following properties are the new additions to the [Input.ChoiceSet](https://adaptivecards.io/explorer/Input.ChoiceSet.html) schema to enable dynamic search:

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

You can implement type-ahead search in Adaptive Cards to search and select data efficiently.