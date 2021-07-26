---
title: Type ahead search in Adaptive Cards 
author: Rajeshwari-v
description: Describes type ahead search with input choice set control in Adaptive Cards 
ms.topic: conceptual
localization_priority: Normal
ms.author: surbhigupta
---

# Type ahead search in Adaptive Cards  

Input.ChoiceSet control in Adaptive Cards allow users to input a choice from a given set of choices. You can enable type ahead search feature for input choice set control in Adaptive Cards to enhance the search experience within a large dataset. This feature allows users to do the following types of searches based on the input choices:

* Static search: Search within the specified values in the Adaptive Card payload.
* Dynamic search: Type ahead search from a remote database.

## Advantages

* The user can enter the input that fetches the list of choices from a remote backend dynamically. 
* The user can view, select, and clear a single item or multiple items from the input choice set drop down menu. 
* The users must be able to authenticate if they need to sign in before taking an action on the Adaptive Card.
* You can add images and text as part of the different input choices in dynamically fetched items.

## Understand dynamic type ahead search

Type ahead search is useful in many scenarios.

The following flow diagram explains type ahead search process:

![Dynamic type ahead search](../../assets/images/cards/dynamic-type-ahead-search-flow.png)

## Update schema

The following properties are the new additions to the [Input.ChoiceSet](https://adaptivecards.io/explorer/Input.ChoiceSet.html) schema to enable type ahead search:

| Property	| Type | Required | Description |
|-----------|------|----------|-------------|
| style | Compact <br/> Expanded <br/> Filtered | No | Add **filtered** style to the list of supported validations for static typeahead.|
| choices.data | Data.Query | No | Enables dynamic type ahead as the user types, by fetching a remote set of choices from a backend. |

### Data.Query definition

| Property	| Type | Required | Description |
|-----------|------|----------|-------------|
| type | Data.Query	| Yes |	Specifies that it is a Data.Query object.|
| dataset | String | Yes | Specifies the type of data that is fetched dynamically. |
| value	| String | No | Populated for the invoke request to the bot with the input the user provided to the `ChoiceSet`. |
| count	| Number | No | It is populated for the invoke request to the bot to specify how many elements must be returned. The bot ignores it, if the users want to send a different amount. | 
| skip | Number | No | It is populated for the invoke request to the bot to indicate that users want to paginate and skip ahead in the list. |

## Mobile and desktop experience

# [Mobile](#tab/mobile)

 The following image illustrates mobile experience of type ahead search:

![Mobile experience](../../assets/images/cards/mobile-type-ahead-search.png)


# [Desktop](#tab/desktop)




---

