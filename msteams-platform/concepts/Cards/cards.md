---
title: Introducing cards
description: Describes cards and how they are used in bots, connectors and messaging extensions
keywords: connectors bots cards messaging
ms.date: 03/29/2018
---
# Cards

A *card* is a user-interface (UI) container for short or related pieces of information. Cards can have multiple properties and attachments. Cards can include buttons which can trigger [Card actions](~/concepts/cards/cards-actions).

## Adaptive cards

[Adaptive cards](~/concepts/cards/cards-reference?branch=Harysh-Adaptive-cards#adaptive-card) are a new cross product specification for cards in Microsoft products including Bots, Cortana, Outlook, and Windows. They are the recommended card type for new Teams development. For general information from the Adaptive cards team see [Adaptive Cards Overview](https://docs.microsoft.com/en-us/adaptive-cards). You can use adaptive cards anywhere you can use existing Hero cards, Office365 cards, and Thumbnail cards.

In addition to Adaptive Cards, Teams supports two other types of cards:

* Connector Cards, used as part of Office 365 connectors.
* Simple cards from the bot framework, such as the thumbnail and hero cards.

These card types are described more fully in the [Teams Card Reference](~/concepts/cards/cards-reference).

Teams uses cards in three different places:

* Connectors
* Bots
* Messaging extensions

## Cards in Connectors

Cards were first defined as part of Outlook and Office 365, and are used as part of Office 365 Connectors. Like many Office 365 applications, Teams supports Connectors. You can learn more about Connectors in [Office 365 Connectors for Microsoft Teams](~/concepts/connectors/connectors), and find the specification for cards in connectors in [Actionable message card reference](https://docs.microsoft.com/en-us/outlook/actionable-messages/card-reference).

Any card used by any Office 365 Connector will work in Teams as part of a Connector in Teams. Support is detailed in [Access existing Office 365 Connectors from Microsoft Teams](~/concepts/connectors/connectors#access-existing-office-365-connectors-from-microsoft-teams). These cards are called *connector cards* in Teams.

## Cards in Bots

The Microsoft Bot Framework extended the cards specification by adding a set of predefined cards that bots could use as part of bot messages. Teams supports bots using the Bot Framework but it supports a slightly different set of these cards. General information on cards in Bot Framework can be found in [Add rich card attachments to messages](https://docs.microsoft.com/en-us/bot-framework/nodejs/bot-builder-nodejs-send-rich-cards). These cards are called *simple cards* in Teams.

Bots in Teams can use any type of card: simple, connector or adaptive. Cards that are supported by bots in Teams are detailed in [Teams Card Reference](~/concepts/cards/cards-reference).

## Cards in Messaging Extensions

[Messaging Extensions](~/concepts/messaging-extensions) can also return a card. Messaging extensions can use any type of card: simple, connector or adaptive. These cards are found in the [Teams Card Reference](~/concepts/cards/cards-reference).

## Card reference

All cards used by Teams are listed in the [Teams Card Reference](~/concepts/cards/cards-reference). This reference also describes differences between Bot Framework cards and cards in Teams.
