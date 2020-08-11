---
title: Introducing cards
description: Describes cards and how they are used in bots, connectors and messaging extensions
keywords: connectors bots cards messaging
---
# Cards

A *card* is a user-interface (UI) container for short or related pieces of information. Cards can have multiple properties and attachments. Cards can include buttons which can trigger [Card actions](~/task-modules-and-cards/cards/cards-actions.md).

## Adaptive cards

[Adaptive cards](~/task-modules-and-cards/cards/cards-reference.md#adaptive-card) are a new cross product specification for cards in Microsoft products including Bots, Cortana, Outlook, and Windows. They are the recommended card type for new Teams development. For general information from the Adaptive cards team see [Adaptive Cards Overview](/adaptive-cards). You can use adaptive cards anywhere you can use existing Hero cards, Office365 cards, and Thumbnail cards.

In addition to Adaptive Cards, Teams supports two other types of cards:

* Connector Cards, used as part of Office 365 connectors.
* Simple cards from the bot framework, such as the thumbnail and hero cards.

These card types are described more fully in the [Teams Card Reference](~/task-modules-and-cards/cards/cards-reference.md).

Teams uses cards in three different places:

* Connectors
* Bots
* Messaging extensions

## Adaptive cards and incoming webhooks

> [!NOTE]
> Adaptive cards are supported in incoming webhooks as part of the [public developer preview program](../resources/dev-preview/developer-preview-intro.md). Public previews are available for early-access and feedback. Although the release is stable and has undergone extensive testing, it is not intended for use in production.
>
> ✔ Within the developer preview, all native adaptive card schema elements, except `Action.Submit`, are fully supported.
>
> ✔ The supported Actions are [**Action.OpenURL**](https://adaptivecards.io/explorer/Action.OpenUrl.html), [**Action.ShowCard**](https://adaptivecards.io/explorer/Action.ShowCard.html), and [**Action.ToggleVisibility**](https://adaptivecards.io/explorer/Action.ToggleVisibility.html).

## Cards in Connectors

Cards were first defined as part of Outlook and Office 365, and are used as part of Office 365 Connectors. Like many Office 365 applications, Teams supports Connectors. You can learn more about Connectors in [Office 365 Connectors for Microsoft Teams](~/webhooks-and-connectors/what-are-webhooks-and-connectors.md), and find the specification for cards in connectors in [Actionable message card reference](/outlook/actionable-messages/card-reference).

## Cards in Bots

The Microsoft Bot Framework extended the cards specification by adding a set of predefined cards that bots could use as part of bot messages. Teams supports bots using the Bot Framework but it supports a slightly different set of these cards. General information on cards in Bot Framework can be found in [Add rich card attachments to messages](/bot-framework/nodejs/bot-builder-nodejs-send-rich-cards). These cards are called *simple cards* in Teams.

Bots in Teams can use any type of card: simple, connector or adaptive. Cards that are supported by bots in Teams are detailed in [Teams Card Reference](~/task-modules-and-cards/cards/cards-reference.md).  

## Cards in Messaging Extensions

[Messaging Extensions](~/messaging-extensions/what-are-messaging-extensions.md) can also return a card. Messaging extensions can use any type of card: simple, connector or adaptive. These cards are found in the [Teams Card Reference](~/task-modules-and-cards/cards/cards-reference.md).

## Card reference

All cards used by Teams are listed in the [Teams Card Reference](~/task-modules-and-cards/cards/cards-reference.md). This reference also describes differences between Bot Framework cards and cards in Teams.
