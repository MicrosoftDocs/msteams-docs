---
title: Type ahead search in Adaptive Cards 
author: Rajeshwari-v
description: Describes type ahead search with input choice set control in Adaptive Cards 
ms.topic: conceptual
localization_priority: Normal
ms.author: surbhigupta
---

# Type ahead search in Adaptive Cards  

Input.ChoiceSet control in Adaptive Card is an important and most widely used component. You can incorporate type ahead control feature for input choice set in Adaptive Cards to enhance the search experience from large dataset. It allows users to select data from a searchable select menu that loads data dynamically. This feature allows users to do the following searches:

* Static search: Search within the specified values in the Adaptive Card payload.
* Dynamic search: Type ahead search within a remote database.

## Advantages

* The input can fetch the list of choices from a remote backend as the user types dynamically.
* User can view, select, and clear single or multiple items from the input choice set drop down menu. 
* User can authenticate if they needs to sign in before taking an action on the Adaptive Card.
* You can add images and text as part of the different input choices in dynamically fetched items.

## Scenarios

## Flow diagram to understand the dynamic type ahead search

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

