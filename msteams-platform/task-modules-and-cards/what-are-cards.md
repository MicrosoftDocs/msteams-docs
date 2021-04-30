---
title: Introducing cards
description: Describes cards and how they are used in bots, connectors and messaging extensions
localization_priority: Normal
keywords: connectors bots cards messaging
ms.topic: overview
---

# Cards

A card is a user interface (UI) container for short or related pieces of information. Cards can have multiple properties and attachments and can include buttons, which triggers [card actions](~/task-modules-and-cards/cards/cards-actions.md). Using cards, you can organize information into groups and give users the opportunity to interact with specific parts of the information.

You can add rich text formatting to your cards using either Markdown or HTML, depending on the card type. Cards used by bots and messaging extensions in Microsoft Teams, add and respond to these card actions, `openUrl`, `messageBack`, `imBack`, `invoke`, and `signin`. Cards reference include Adaptive Card, hero card, list card, Office 365 connector card, receipt card, signin card, thumbnail card, and card collections and these cards are supported in bots for Teams.

Teams uses cards in three different places:

* Connectors
* Bots
* Messaging extensions

## Cards in connectors

Cards were first defined as part of Outlook and Office 365 and are now used as part of Office 365 connectors. Like many Office 365 applications, Teams supports connectors. Learn more about connectors in [Office 365 connectors for Teams](~/webhooks-and-connectors/what-are-webhooks-and-connectors.md). You can find the specification for cards in connectors in [actionable message card reference](/outlook/actionable-messages/card-reference).

> [!NOTE]
> * All native adaptive card schema elements, except `Action.Submit`, are fully supported.
> * The supported actions are [**Action.OpenURL**](https://adaptivecards.io/explorer/Action.OpenUrl.html), [**Action.ShowCard**](https://adaptivecards.io/explorer/Action.ShowCard.html), [**Action.ToggleVisibility**](https://adaptivecards.io/explorer/Action.ToggleVisibility.html) and [**Action.Execute**](https://docs.microsoft.com/adaptive-cards/authoring-cards/universal-action-model#actionexecute).

## Cards in bots

The Microsoft Bot Framework extends the cards specification by adding a set of predefined cards that bots can use as part of bot messages. Teams supports bots using the Bot Framework, but it supports a different set of these cards. General information on cards in Bot Framework can be found in [add rich card attachments to messages](/bot-framework/nodejs/bot-builder-nodejs-send-rich-cards). These cards are called simple cards in Teams.

Bots in Teams can use simple cards, connector cards, or Adaptive Cards. Cards that are supported by bots in Teams are detailed in [Teams card reference](~/task-modules-and-cards/cards/cards-reference.md).

## Cards in messaging extensions

[Messaging extensions](~/messaging-extensions/what-are-messaging-extensions.md) can also return a card. Messaging extensions can use simple cards, connector cards, or Adaptive Cards. These cards are found in the [Teams card reference](~/task-modules-and-cards/cards/cards-reference.md).

## Card reference

All cards used by Teams are listed in the [Teams card reference](~/task-modules-and-cards/cards/cards-reference.md). This reference also describes differences between Bot Framework cards and cards in Teams.

## Adaptive Cards

> [!VIDEO https://www.youtube-nocookie.com/embed/J12lKt717Ws]

[Adaptive Cards](~/task-modules-and-cards/cards/cards-reference.md#adaptive-card) are a new cross product specification for cards in Microsoft products including bots, Cortana, Outlook, and Windows. They are the recommended card type for new Teams development. For general information from the Adaptive Cards team, see [Adaptive Cards overview](/adaptive-cards). You can use Adaptive Cards anywhere you use existing hero cards, Office 365 cards, and thumbnail cards.

In addition to Adaptive Cards, Teams supports two other types of cards:

* Connector cards: Used as part of Office 365 connectors.
* Simple cards: Used from the Bot Framework, such as the thumbnail and hero cards.

### Adaptive Cards and incoming webhooks

> [!VIDEO https://www.youtube-nocookie.com/embed/y5pbJI43Zvg]

> [!NOTE]
> * All native Adaptive Card schema elements, except `Action.Submit`, are fully supported.
> * The supported actions are [`Action.OpenURL`](https://adaptivecards.io/explorer/Action.OpenUrl.html), [`Action.ShowCard`](https://adaptivecards.io/explorer/Action.ShowCard.html), and [`Action.ToggleVisibility`](https://adaptivecards.io/explorer/Action.ToggleVisibility.html).

Adaptive Cards with incoming webhooks enables you to use the rich and flexible capabilities of Adaptive Cards. It sends data using incoming webhooks in Teams from their web service.

## See also

* [Format cards in Teams](~/task-modules-and-cards/cards/cards-format.md)
* [Card actions](~/task-modules-and-cards/cards/cards-actions.md)
* [Design Adaptive Cards](~/task-modules-and-cards/cards/design-effective-cards.md)
