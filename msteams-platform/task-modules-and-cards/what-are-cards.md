---
title: Display app content with cards
description: Learn about how you can use cards to display content for your Microsoft Teams app.
keywords: connectors bots cards messaging
---
# Display content for your Microsoft Teams app with cards

A *card* is a UI container for short or related pieces of content. Cards can have multiple properties and attachments, and include buttons that trigger specific [actions](~/task-modules-and-cards/cards/cards-actions.md).

## Card frameworks

There are several ...

[Adaptive Cards](~/task-modules-and-cards/cards/cards-reference.md#adaptive-card) are an open card exchange format that allows you to exchange UI content in a common and consistent way across Microsoft products and are the recommended card type for Teams. For more information, see the [Adaptive Cards documentation](/adaptive-cards).

In addition to Adaptive Cards, Teams supports two other types of cards:

* Connector Cards, used as part of Office 365 connectors.
* Simple cards from the bot framework, such as the thumbnail and hero cards.

These card types are described more fully in the [Teams card reference](~/task-modules-and-cards/cards/cards-reference.md).

## Supported capabilities

You can use cards with three core capabilities in Teams:

* Connectors
* Bots
* Messaging extensions

## Adaptive Cards and incoming webhooks

> [!NOTE]
>
> ✔ All native adaptive card schema elements, except `Action.Submit`, are fully supported.
>
> ✔ The supported actions are [**Action.OpenURL**](https://adaptivecards.io/explorer/Action.OpenUrl.html), [**Action.ShowCard**](https://adaptivecards.io/explorer/Action.ShowCard.html), and [**Action.ToggleVisibility**](https://adaptivecards.io/explorer/Action.ToggleVisibility.html).

## Cards and connectors

Cards were first defined as part of Outlook and Office 365, and are used as part of Office 365 Connectors. Like many Office 365 applications, Teams supports Connectors. You can learn more about Connectors in [Office 365 Connectors for Microsoft Teams](~/webhooks-and-connectors/what-are-webhooks-and-connectors.md), and find the specification for cards in connectors in [Actionable message card reference](/outlook/actionable-messages/card-reference).

## Cards and bots

The Microsoft Bot Framework extended the cards specification by adding a set of predefined cards that bots could use as part of bot messages. Teams supports bots using the Bot Framework but it supports a slightly different set of these cards. General information on cards in Bot Framework can be found in [Add rich card attachments to messages](/bot-framework/nodejs/bot-builder-nodejs-send-rich-cards). These cards are called *simple cards* in Teams.

Bots in Teams can use any type of card: simple, connector or adaptive. Cards that are supported by bots in Teams are detailed in [Teams Card Reference](~/task-modules-and-cards/cards/cards-reference.md).  

## Cards and messaging extensions

[Messaging Extensions](~/messaging-extensions/what-are-messaging-extensions.md) can also return a card. Messaging extensions can use any type of card: simple, connector or adaptive. These cards are found in the [Teams Card Reference](~/task-modules-and-cards/cards/cards-reference.md).

## Card reference

All cards used by Teams are listed in the [Teams Card Reference](~/task-modules-and-cards/cards/cards-reference.md). This reference also describes differences between Bot Framework cards and cards in Teams.
