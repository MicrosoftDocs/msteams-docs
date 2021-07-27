---
title: Dynamic search in Adaptive Cards 
author: Rajeshwari-v
description: Describes dynamic type-ahead search with Input.ChoiceSet control in Adaptive Cards 
ms.topic: conceptual
localization_priority: Normal
ms.author: surbhigupta
---

# Dynamic search in Adaptive Cards  

Dynamic search is useful in scenarios where the users have to search from a dynamically loaded huge data set. You can use dynamic search to overcome the drawback of static search within the specified values in the Adaptive Card payload. You can enable type-ahead control for `Input.ChoiceSet` in Adaptive Cards to incorporate the dynamic search experience. This feature allows users to do type- ahead search from a remote database and enhances the search experience.
 
## Understand how dynamic search works

The following flow diagram explains the dynamic search process: 

![Dynamic type-ahead search](../../assets/images/cards/dynamic-type-ahead-search-flow.png)

## Mobile and desktop experience

# [Mobile](#tab/mobile)

Android and iOS supports dynamic search in Adaptive Cards. The following image illustrates mobile experience of dynamic search:

![Mobile experience](../../assets/images/cards/mobile-type-ahead-search.png)


# [Desktop](#tab/desktop)

[Placeholder for desktop experience]


---

## Implement dynamic search

You can input a choice from a given set of choices using `Input.ChoiceSet` in Adaptive Cards. You can add type-ahead control to `Input.ChoiceSet` to implement dynamic search with Adaptive Cards.

### Update schema

The following properties are the new additions to the [Input.ChoiceSet](https://adaptivecards.io/explorer/Input.ChoiceSet.html) schema to enable type-ahead search:

| Property	| Type | Required | Description |
|-----------|------|----------|-------------|
| style | Compact <br/> Expanded <br/> Filtered | No | Add **filtered** style to the list of supported validations for static typeahead.|
| choices.data | Data.Query | No | Enables dynamic type-ahead as the user types, by fetching a remote set of choices from a backend. |

### Data.Query definition

The following table describes the properties of data:

| Property	| Type | Required | Description |
|-----------|------|----------|-------------|
| type | Data.Query	| Yes |	Specifies that it's a Data.Query object.|
| dataset | String | Yes | Specifies the type of data that is fetched dynamically. |
| value	| String | No | Populated for the invoke request to the bot with the input the user provided to the `ChoiceSet`. |
| count	| Number | No | It's populated for the invoke request to the bot to specify how many elements must be returned. The bot ignores it, if the users want to send a different amount. | 
| skip | Number | No | It's populated for the invoke request to the bot to indicate that users want to paginate and skip ahead in the list. |

## Advantages

* The user can enter the input that fetches the list of choices from a remote backend dynamically.
* The user can view, select, and clear a single item or multiple items from the input choice set drop- down menu.
* The users must authenticate if they need to sign in before taking an action on the Adaptive Card.
* You can add images and text as part of the different input choices in dynamically fetched items.

## Limitations

* The scope of dynamic search is limited to `Input.ChoiceSet` component of Adaptive Cards only.
* You can specify text and images as part of the list of dynamically fetched items only. You can't give rich card experiences with dynamic search. 
