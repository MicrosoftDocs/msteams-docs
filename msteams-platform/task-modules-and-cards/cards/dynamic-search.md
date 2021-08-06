---
title: Type-ahead search in Adaptive Cards 
author: Rajeshwari-v
description: Describes static and dynamic type-ahead search with Input.ChoiceSet control in Adaptive Cards 
ms.topic: conceptual
localization_priority: Normal
ms.author: surbhigupta
---

# Type-ahead search in Adaptive Cards  

Type-ahead search in Adaptive Cards allows you to search and select data from a huge data set. In this case, a searchable select menu loads data dynamically as the user searches. Type-ahead search in Adaptive Cards enhances the search experience and allows you to perform the following searches:

* Static search: Search and select within the specified values from the Adaptive Card payload.
* Dynamic search: Search and select within a huge data set loaded dynamically from the remote backend.

Static search becomes challenging with more choices. In such cases, the dynamic search is useful to search and select choices from a dynamically loaded database. In Adaptive Cards, `Input.ChoiceSet` is one of the important components which is useful to create a form. You can use the form to enter the customer's choices and send them to the bot. 

## Advantages

* The user can enter the input that fetches the list of choices from a remote backend dynamically.
* The user can view, select, and clear a single item or multiple items from the input choice set drop-down menu.
* The users must authenticate if they need to sign in before taking an action on the Adaptive Card.
* You can add images and text as part of the different input choices in dynamically fetched items.

## Limitations

* The scope of type-ahead search is limited to `Input.ChoiceSet` component of Adaptive Cards only.
* You can specify text and images as part of the list of dynamically fetched items only. 
* You can't give rich card experiences with dynamic search. 
 
## Understand how type-ahead search works

The following flow diagram explains the type-ahead search process: 

![Type-ahead search](../../assets/images/cards/dynamic-type-ahead-search-flow.png)

## Desktop and mobile experience

# [Desktop](#tab/desktop)

[Placeholder for desktop experience]

# [Mobile](#tab/mobile)

Android and iOS mobile clients support type-ahead search in Adaptive Cards. 
 
### Search with a product catalog scenario example:

User A is a store employee who works at an online or offline platform for buying glasses. User A's company uses a bot that is used to take new requests from customers. User A needs to enter the products in the form based on the customer's request. User A uses `Input.choiceSet` component in the **new customer order** Adaptive Card to enter the customer's request. The order goes to the headquarters and is shipped to store or to the customer’s address.      
1. User A opens the XYZ bot.
1. User A sends a command to the bot for a **New customer request**.
1. Bot responds with an Adaptive Card that has an `Input.ChoiceSet` component.
1. User A enters the fields of the form based on the customer's choice. `Input.ChoiceSet` component contains the following fields: 

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

`Input.ChoiceSet` is one of the important input components in Adaptive Cards. You can add a type-ahead search control to `Input.ChoiceSet` component to implement type-ahead search, which is useful to create a form. The input control includes the following selections:       
* Dropdown, such as an expanded selection.
* Radio button, such as a single selection.
* Check boxes, such as multiple selections.     
You can search and select the required data from the menu. You can use the form to enter the customer's choices and send `invoke` request to the bot.

### Update schema

The following properties are the new additions to the [Input.ChoiceSet](https://adaptivecards.io/explorer/Input.ChoiceSet.html) schema to enable dynamic search:

| Property	| Type | Required | Description |
|-----------|------|----------|-------------|
| style | Compact <br/> Expanded <br/> Filtered | No | Adds **filtered** style to the list of supported validations for static type-ahead.|
| choices.data | Data.Query | No | Enables dynamic type-ahead as the user types, by fetching a remote set of choices from a backend. |

### Data.Query definition

| Property	| Type | Required | Description |
|-----------|------|----------|-------------|
| type | Data.Query	| Yes |	Specifies that it's a Data.Query object.|
| dataset | String | Yes | Specifies the type of data that is fetched dynamically. |
| value	| String | No | Populates for the invoke request to the bot with the input that the user provided to the `ChoiceSet`. |
| count	| Number | No | Populates for the invoke request to the bot to specify the number of elements that must be returned. The bot ignores it, if the users want to send a different amount. | 
| skip | Number | No | Populates for the invoke request to the bot to indicate that users want to paginate and move ahead in the list. |

You can implement type-ahead search in Adaptive Cards to handle search scenarios efficiently.