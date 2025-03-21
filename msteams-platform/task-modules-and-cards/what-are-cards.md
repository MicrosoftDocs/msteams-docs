---
title: Types of Cards & their Usage
description: Learn about card types, cards specific to bots, connectors, and message extensions, Adaptive Cards overflow menu and Object ID, UPN in user mentions.
ms.localizationpriority: high
ms.topic: overview
ms.date: 01/08/2023
---

# Cards

[!INCLUDE [adaptive-card-redirect](../includes/adaptive-card-redirect.md)]

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

[!INCLUDE [deprecation-note](~/includes/deprecation-note.md)]

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

Typeahead search added as an input control in Adaptive Cards enable [dynamic search](cards/dynamic-search.md#dynamic-typeahead-search) experience from a dynamically loaded dataset. It also allows users to do a typeahead static search within a list with limited number of choices. The mobile and desktop clients support typeahead dynamic search experience.

### Dependent inputs in Adaptive Cards

You can design Adaptive Cards in Teams where the value of an input depends on the value of another. For example, consider an Adaptive Card with two `Input.ChoiceSet` dropdowns: one for selecting a country and another for selecting a specific city within that country. The first dropdown must filter the cities displayed in the second dropdown. This can be achieved by creating an `Input.ChoiceSet` dropdown with dynamic typeahead search that depends on one or more other inputs in the card. For more information, see [dependent inputs](cards/dynamic-search.md#dependent-inputs).

### Media elements in Adaptive Cards

Media elements in Adaptive Card provide enhanced media experience and increases engagement with the Adaptive Card. You can add media files such as audio or video clips, YouTube, Vimeo, or Dailymotion videos to your Adaptive Card. For more information, see [Media elements in Adaptive Card](cards/media-elements-in-adaptive-cards.md).

### Adaptive Cards and Incoming Webhooks

> [!NOTE]
>
> - All native Adaptive Card schema elements, except `Action.Submit`, are fully supported.
> - The supported actions are [**Action.OpenURL**](https://adaptivecards.microsoft.com/?topic=Action.OpenUrl), [**Action.ShowCard**](https://adaptivecards.microsoft.com/?topic=Action.ShowCard), [**Action.ToggleVisibility**](https://adaptivecards.microsoft.com/?topic=Action.ToggleVisibility), and [**Action.Execute**](/adaptive-cards/authoring-cards/universal-action-model#actionexecute).

Adaptive Cards with Incoming Webhooks enable you to use the rich and flexible capabilities of Adaptive Cards. It sends data using Incoming Webhooks in Teams from their web service.

### CodeBlock in Adaptive Cards

Share code snippets as richly formatted Adaptive Cards in Teams chats, channels, and meetings with the `CodeBlock` element. Adaptive Cards with the `CodeBlock` element make the code snippet easy to read as the indentation, numbering, and syntax highlighting match the programming language. For more information, see [CodeBlock in Adaptive Cards](cards/cards-format.md#codeblock-in-adaptive-cards).

### Adaptive Card responsive layout

You must design your Adaptive Cards to look great on any device to provide an enhanced user experience across chat, channels, and meeting chat. Adaptive Card responsive layout helps you to design cards with different layouts that target different card widths. For more information, see [Adaptive Card responsive layout](cards/cards-format.md#adaptive-card-responsive-layout).

### Borders and rounded corners

You can add borders to the `Container`, `ColumnSet`, `Column`, and `Table` elements in Adaptive Cards to delineate different sections of the card. You can add rounded corners to the `Container`, `ColumnSet`, `Column`, `Table`, and `Image` elements in Adaptive Cards to make the card design look modern and visually appealing. For more information, see [borders and rounded corners in Adaptive Cards](cards/cards-format.md#borders-and-rounded-corners-in-adaptive-cards).

### Scrollable containers

A container with many elements might lead to a long, unreadable card. Use the `maxHeight` property to define the maximum height of the container. When the container has a maximum height and its content exceeds that height, a vertical scrollbar appears. For more information, see [scrollable containers in Adaptive Cards](cards/cards-format.md#scrollable-containers-in-adaptive-cards).

### Compound button

Compound button is a special type of button with an icon, title, and description. You can add a Compound button using the `CompoundButton` element. This element enables you to replicate the appearance of [prompt starters](../bots/how-to/conversations/prompt-suggestions.md#prompt-starters) in an Adaptive Card.  For more information, see [Compound button in Adaptive Cards](cards/cards-format.md#compound-button-in-adaptive-cards).

### Fluent icons

Adaptive Cards support adding icons from the [Fluent icon](https://www.figma.com/community/file/836835755999342788) library using the `Icon` element. For more information, see [icons in Adaptive Card](cards/cards-format.md#icons-in-adaptive-card).

### Star ratings

You can add a star rating input to your Adaptive Card using the `Input.Rating` element. You can also include a read-only star rating using the `Rating` element. For more information, see [ratings in Adaptive Cards](cards/cards-format.md#ratings-in-adaptive-cards).

### Conditional enablement of action buttons

You can use the `conditionallyEnabled` property to disable action buttons until the user changes the value of at least one of the required inputs. This property can only be used with `Action.Submit` and `Action.Execute` actions. For more information, see [conditional enablement of action buttons](cards/cards-actions.md#conditional-enablement-of-action-buttons).

## Overflow menu on Adaptive Cards

Adaptive Card in Teams supports overflow menu. You can populate an overflow menu for all the secondary actions in an Adaptive Card.

<a name='support-for-azure-ad-object-id-and-upn-in-user-mention'></a>

## Support for Microsoft Entra Object ID and UPN in user mention

Bots with Adaptive Cards support user mention IDs, such as Microsoft Entra Object ID and User Principle Name (UPN) in addition to the existing IDs. Incoming Webhooks start to support user mention in Adaptive Card with the Microsoft Entra Object ID and UPN.

## Charts in Adaptive Cards

[!INCLUDE [<User Mention>](../includes/bots/user-mention.md)]

## Container layouts in Adaptive Cards

You can design responsive containers for different Adaptive Card widths with the `Layout.Stack`, `Layout.Flow`, and `Layout.AreaGrid` layouts. For more information, see [Container layouts](container-layouts.md).

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
