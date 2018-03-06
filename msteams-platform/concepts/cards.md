---
title: Introducing cards
description: Describes cards and how they are used in bots, connectors and messaging extensions
keywords: connectors bots cards messaging
ms.date: 03/06/18
---
# Cards

A *card* is a user-interface (UI) container for short or related pieces of information. Cards can have multiple properties and attachments.

## Cards in Connectors

*Cards* were first defined as part of Outlook and Office 365, and are used as part of Office 365 Connectors. Like many Office 365 applications, Teams supports Connectors. You can learn more about Connectors in [Office 365 Connectors for Microsoft Teams](~/concepts/connectors), and find the specification for cards in connectors in [Actionable message card reference](https://docs.microsoft.com/en-us/outlook/actionable-messages/card-reference).

Any card used by any O365 Connector should work in Teams as part of a connector in Teams.

## Cards in Bots

The Microsoft Bot Framework extends the *Cards* specification by adding a set of predefined cards that bots can use to communicate as part of bot messages. Teams supports bots using the Bot Framework and supports a slightly different set of these cards. See [Add bots to Microsoft Teams apps](~/concepts/bots-overview) to see how Teams uses bots. General information on cards in Bot Framework can be found in [Add rich card attachments to messages](https://docs.microsoft.com/en-us/bot-framework/nodejs/bot-builder-nodejs-send-rich-cards).

The subset of Bot Framework cards that Teams supports is detailed in [Teams Card Reference](~/concepts/cards-reference).  These cards can not be used in connectors.

Teams bots also support an [O365 Connector Card...](~/concepts/cards-refernce...) which encapsulates any card used in Office 365 Connectors.

## Cards in Messaging Extensions

[Messaging Extensions](~/concepts/messaging-extensions) can also return a card. These cards follow the Office 365 Connectors guidelines, but don't include the cards from the bot framework.
