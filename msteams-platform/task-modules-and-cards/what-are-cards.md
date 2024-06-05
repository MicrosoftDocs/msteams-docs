---
title: Cards
description: In this module, learn what are cards and how they're used in bots, connectors, and message extensions.
ms.localizationpriority: high
ms.topic: overview
ms.date: 01/08/2023
---

# Cards

A card is a user interface (UI) container for short or related pieces of information. Cards can have multiple properties and attachments and can include buttons, which trigger [card actions](~/task-modules-and-cards/cards/cards-actions.md). Using cards, you can organize information into groups and give users the opportunity to interact with specific parts of the information.

The bots for Microsoft Teams support the following types of cards:

- Adaptive Card
- Hero card
- List card
- Connector card for Microsoft 365 Groups
- Receipt card
- Sign in card
- Thumbnail card
- Card collections
- Overflow menu on Adaptive Cards

You can add rich text formatting to your cards using either Markdown or HTML, depending on the card type. Cards used by bots and message extensions in Teams, add and respond to these card actions, `openUrl`, `messageBack`, `imBack`, `invoke`, and `signin`.

Teams uses cards in three different places:

- Connectors
- Bots
- Message extensions

## Cards in connectors

Cards were first defined as part of Outlook and Microsoft 365 and are now used as part of connectors for Microsoft 365 Groups. Like many Microsoft 365 applications, Teams supports connectors. For more information, see [create connectors for Microsoft 365 Groups](../webhooks-and-connectors/how-to/connectors-creating.md). You can find the specification for cards in connectors in [actionable message card reference](/outlook/actionable-messages/card-reference).

## Cards in bots

The Microsoft Bot Framework extends the cards specification by adding a set of predefined cards that bots can use as part of bot messages. Teams supports bots using the Bot Framework, but it supports a different set of these cards. General information on cards in Bot Framework can be found in [add rich card attachments to messages](/bot-framework/nodejs/bot-builder-nodejs-send-rich-cards). These cards are called simple cards in Teams.

Bots in Teams can use simple cards, connector cards, or Adaptive Cards. [Types of cards](~/task-modules-and-cards/cards/cards-reference.md) provides information on cards, supported by bots in Teams.

## Cards in message extensions

[Message extensions](~/messaging-extensions/what-are-messaging-extensions.md) can also return a card. Message extensions can use simple cards, connector cards, or Adaptive Cards. These cards are found in [types of cards](~/task-modules-and-cards/cards/cards-reference.md).

## Types of cards

All cards used by Teams are listed in [types of cards](~/task-modules-and-cards/cards/cards-reference.md). This reference also describes differences between Bot Framework cards and cards in Teams.

## Adaptive Cards

[Adaptive Cards](~/task-modules-and-cards/cards/cards-reference.md#adaptive-card) are a new cross product specification for cards in Microsoft products including bots, Cortana, Outlook, and Windows. They're the recommended card type for new Teams development. For general information from the Adaptive Cards team, see [Adaptive Cards overview](/adaptive-cards). You can use Adaptive Cards anywhere you use existing hero cards, Microsoft 365 cards, and thumbnail cards.

In addition to Adaptive Cards, Teams supports two other types of cards:

- Connector cards: Used as part of connectors for Microsoft 365 Groups.
- Simple cards: Used from the Bot Framework, such as the thumbnail and hero cards.

### People Picker in Adaptive Cards

[People Picker](cards/people-picker.md#people-picker-in-adaptive-cards) added as an input control in Adaptive Cards enable search and selection of people. You can use it in chats, channels, dialogs (referred as task modules in TeamsJS v1.x), and tabs. The mobile and desktop clients support People Picker, which provides an inline typing experience.

### People icon in an Adaptive Card

[People icon in an Adaptive Card](cards/cards-format.md#people-icon-in-an-adaptive-card) helps users to view the images of users in the Adaptive Card in Teams. You can view the image of a single user or multiple users. People icon is supported in Teams mobile and desktop clients.

### Typeahead search in Adaptive Cards  

Typeahead search added as an input control in Adaptive Cards enable [dynamic search](~/task-modules-and-cards/cards/dynamic-search.md) experience from a dynamically loaded dataset. It also allows users to do a typeahead static search within a list with limited number of choices. The mobile and desktop clients support typeahead dynamic search experience.

### Media elements in Adaptive Cards

Media elements in Adaptive Card provide enhanced media experience and increases engagement with the Adaptive Card. You can add media files such as audio or video clips to your Adaptive Card. For more information, see [Media elements in Adaptive Card](cards/media-elements-in-adaptive-cards.md).

### Adaptive Cards and Incoming Webhooks

> [!NOTE]
>
> - All native Adaptive Card schema elements, except `Action.Submit`, are fully supported.
> - The supported actions are [**Action.OpenURL**](https://adaptivecards.io/explorer/Action.OpenUrl.html), [**Action.ShowCard**](https://adaptivecards.io/explorer/Action.ShowCard.html), [**Action.ToggleVisibility**](https://adaptivecards.io/explorer/Action.ToggleVisibility.html), and [**Action.Execute**](/adaptive-cards/authoring-cards/universal-action-model#actionexecute).

Adaptive Cards with Incoming Webhooks enable you to use the rich and flexible capabilities of Adaptive Cards. It sends data using Incoming Webhooks in Teams from their web service.

### CodeBlock in Adaptive Cards

Share code snippets as richly formatted Adaptive Cards in Teams chats, channels, and meetings with the `CodeBlock` element. Adaptive Cards with the `CodeBlock` element make the code snippet easy to read as the indentation, numbering, and syntax highlighting match the programming language. For more information, see [CodeBlock in Adaptive Cards](cards/cards-format.md#codeblock-in-adaptive-cards).

### Adaptive Card responsive layout

You must design your Adaptive Cards to look great on any device to provide an enhanced user experience across chat, channels, and meeting chat. Adaptive Card responsive layout helps you to design cards with different layouts that target different card widths. For more information, see [Adaptive Card responsive layout](cards/cards-format.md#adaptive-card-responsive-layout).

## Overflow menu on Adaptive Cards

Adaptive Card in Teams supports overflow menu. You can populate an overflow menu for all the secondary actions in an Adaptive Card.

<a name='support-for-azure-ad-object-id-and-upn-in-user-mention'></a>

## Support for Microsoft Entra Object ID and UPN in user mention

Bots with Adaptive Cards support user mention IDs, such as Microsoft Entra Object ID and User Principle Name (UPN) in addition to the existing IDs. Incoming Webhooks start to support user mention in Adaptive Card with the Microsoft Entra Object ID and UPN.

## Next step

> [!div class="nextstepaction"]
> [Types of cards](~/task-modules-and-cards/cards/cards-reference.md)

## See also

- [Cards and dialogs](cards-and-task-modules.md)
- [Format cards in Teams](~/task-modules-and-cards/cards/cards-format.md)
- [Design Card](../concepts/design/design-teams-app-basic-ui-components.md#card)
- [Design Adaptive Cards](~/task-modules-and-cards/cards/design-effective-cards.md)
- [Adaptive Cards in bots](../bots/how-to/conversations/conversation-messages.md#adaptive-cards)
- [Card actions](cards/cards-actions.md)
