---
title: Workflow bot in Teams
description: Learn how to send a response to card action in Teams workflow bot, add more card actions and customize action responses.
ms.topic: conceptual
ms.author: surbhigupta
ms.localizationpriority: high
---

# Workflow bot in Teams

A workflow bot can be installed into a team, group chat, or as personal app, depending on different scopes. The default command logic simply returns a hard-coded Adaptive Card. You can customize this logic with your business logic. Often your business logic might require you to call your existing APIs. Users can create a workflow bot to respond to Adaptive Card that is triggered by end users. Adaptive Card action handler provides one or more buttons in the card to ask for user's input by calling APIs that sends another Adaptive Card in conversation to respond to the respective card action.

> [!NOTE]
> You can choose the installation target when adding the app. For more install options see [Distribute your Teams app](../../../concepts/deploy-and-publish/apps-publish-overview.md).

## Card Action Handler

To simplify the development, the TeamsFx SDK provides an adaptive card action handler (`TeamsFxAdaptiveCardActionHandler`) to let you focus only on the development of business logic to respond to the card action without learning the Bot Framework.

The following diagram illustrates how to respond to an Adaptive Card action with TeamsFx SDK:

:::image type="content" source="../../../assets/images/sbs-workflow-bot/sbs-workflow-bot-card-action-handler-diag.png" alt-text="workflow bot card action handler diagram" lightbox="../../../assets/images/sbs-workflow-bot/sbs-workflow-bot-card-action-handler-diag.png":::

* `Action Card`: The card where you define your action that users can invoke (click button).
* `Card Action Handler`: Triggered when users invoke the corresponding card action (its `triggerVerb` is same as the `verb` property in adaptive card action). It can send a response card to respond to the action.
* `Response Card`: The card to respond to the action when user invokes it from the action card.

To handle card actions with TeamsFx SDK, each card action handler should implement `TeamsFxAdaptiveCardActionHandler` interface. Below is the interface definition for `TeamsFxAdaptiveCardActionHandler`:

``` Export interface

TeamsFxAdaptiveCardActionHandler 
{
    /**
     * The verb defined in adaptive card action that can trigger this handler.
     */
    triggerVerb: string;

    /**
     * Specify the behavior for how the card response will be sent in Teams conversation.
     * The default value is `AdaptiveCardResponse.ReplaceForInteractor`, which means the card
     * response will replace the current one only for the interactor.
     */
    adaptiveCardResponse?: AdaptiveCardResponse;
    
    /**
     * The handler function that will be invoked when the action is fired.
     * @param context The turn context.
     * @param actionData The contextual data that associated with the action.
     */
    handleActionInvoked(context: TurnContext, actionData: any): Promise<InvokeResponse>;
}
```

## Customize initialization

The default initialization is located in `bot/src/internal/initialize.js(ts)`.

You can update the initialization logic to:

1. Set `options.adapter` to use your own `BotFrameworkAdapter`.
1. Set `options.command.commands` to include more command handlers.
1. Set `options.cardAction.actions` to include more action handlers.
1. Set `options.{feature}.enabled` to enable more `ConversationBot` functionality.

For more information on initialization customization, see [additional initialization customization](https://github.com/OfficeDev/TeamsFx/wiki/Respond-to-chat-commands-in-Teams#customize-initialization)

## Add more card action

You can follow the below steps to add more card actions.

1. [Add an action to your Adaptive Card](#step-1-add-an-action-to-your-adaptive-card)
1. [Add Adaptive Card for action response](#step-2-add-adaptive-card-for-action-response)
1. [Add action handler](#step-3-add-action-handler)
1. [Register the action handler](#step-4-register-the-action-handler)

### Step 1: Add an action to your Adaptive Card

User universal action, `Action.Execute` defines your action in an Adaptive Card, which can be rendered as a button in the card. Here's a sample `Action.Execute` action:

```Action.Execute

{ 
  "type": "AdaptiveCard", 
  "body": [
    ...
    {
      "type": "ActionSet",
      "actions": [
        {
          "type": "Action.Execute",
          "title": "DoStuff",
          "verb": "doStuff" 
        }
      ]
    }
  ]
  ... 
}
```

> [!NOTE]
> Verb property is required here so that the TeamsFx conversation SDK can invoke the corresponding action handler when the action is invoked in Teams. Ensure to provide a global unique string for the verb property, else you can experience unexpected behavior, if you're using a general string that might cause a collision with other bot actions.

### Step 2: Add Adaptive Card for action response

You can return a new adaptive card for each action invoke to display the response to end user. You can use [adaptive card designer](https://adaptivecards.io/designer/) to design your card layout according to your business needs.

To get-started, you can just create a sample card (`responseCard.json`) with the following content, and put it in `bot/src/adaptiveCards` folder:

```
{
  "type": "AdaptiveCard",
  "body": [
    {
      "type": "TextBlock",
      "size": "Medium",
      "weight": "Bolder",
      "text": "This is a sample action response."
    }
  ],
  "$schema": "http://adaptivecards.io/schemas/adaptive-card.json",
  "version": "1.4"
}
```

### Step 3: Add action handler

Add handler to implement `TeamsFxAdaptiveCardActionHandler` to process the logic when corresponding action is executed.

* The `triggerVerb` is the verb property of your action.
* The `actionData` is the data associated with the action, which may include dynamic user input or some contextual data provided in the data property of your action.
* If an Adaptive Card is returned, then the existing card will be replaced with it by default.

    ```
   import { AdaptiveCards } from "@microsoft/adaptivecards-tools";
   import { TurnContext, InvokeResponse } from "botbuilder";
   import { TeamsFxAdaptiveCardActionHandler, InvokeResponseFactory } from "@microsoft/teamsfx";
   import responseCard from "../adaptiveCards/responseCard.json";

   export class Handler1 implements TeamsFxAdaptiveCardActionHandler { 
       triggerVerb = "doStuff";

       async handleActionInvoked(context: TurnContext, actionData: any): Promise<InvokeResponse> { 
        const responseCardJson = AdaptiveCards.declare(responseCard).render(actionData);
        return InvokeResponseFactory.adaptiveCard(responseCardJson);
    }

}
    ```

   > [!NOTE]
   > You can follow this section to customize the card action handler according to your business need.

### Step 4: Register the action handler

To register the action handler, follow the steps below:

1. Go to bot/src/internal/initialize.js(ts);
1. Update your conversationBot initialization to enable cardAction feature and add the handler to actions array:

   ```
   export const conversationBot = new ConversationBot({
     ...
     cardAction: {
       enabled: true,
       actions: [
         new Handler1()
       ],
     }
   });
   ```

   > [!NOTE]
   > For more code snippets and details, see [Respond to card actions in Teams](https://github.com/OfficeDev/TeamsFx/wiki/Respond-to-card-actions-in-Teams)

## Customize the action response

You can use the `adaptiveCardResponse` property in handler to customize how the bot sends the Adaptive Card to users. There are three options to customize:

1. `AdaptiveCardResponse.ReplaceForInteractor`: This is the default behavior. The response card will be replaced the current one (the card where the button is defined) for the interactor who triggers the action. Users in the conversation still view the original action card.

   :::image type="content" source="../../../assets/images/sbs-workflow-bot/replace-for-interactor.gif" alt-text="Customize how the bot sends adaptive card" lightbox="../../../assets/images/sbs-workflow-bot/replace-for-interactor.gif":::

1. `AdaptiveCardResponse.ReplaceForAll`: The response card will be replaced by the Action Card for all users in the chat, and they can view this response card.

   :::image type="content" source="../../../assets/images/sbs-workflow-bot/replace-for-all.gif" alt-text="Replaced the action card for all" lightbox="../../../assets/images/sbs-workflow-bot/replace-for-all.gif":::

1. `AdaptiveCardResponse.NewForAll`: The response card will be sent as a separate message in the conversation that won't replace the action card. And all users in the chat can view this response card.

   :::image type="content" source="../../../assets/images/sbs-workflow-bot/new-for-all.gif" alt-text="Response card sent for all as new." lightbox="../../../assets/images/sbs-workflow-bot/new-for-all.gif":::

### Respond with text message

You can also respond with text messages instead of using adaptive card for card action response, using `InvokeResponseFactory.textMessage`:

```
async handleActionInvoked(context: TurnContext, actionData: any): Promise<InvokeResponse> {
    return InvokeResponseFactory.textMessage("This is a sample card action response!");
}
```

You can see the below response message in Teams:

:::image type="content" source="../../../assets/images/sbs-workflow-bot/sample-card-action-response.png" alt-text="sample card response displayed":::

### Respond with error messages

When you want to return error response message to the client, then you can apply the `InvokeResponseFactory.errorResponse` to build your invoke response, for example:

:::image type="content" source="../../../assets/images/sbs-workflow-bot/error-message-response.png" alt-text="error response message displayed":::

> [!NOTE]
> For more information about the invoke response format, see [Response format](/adaptive-cards/authoring-cards/universal-action-model).

### Customize adaptive card content

You can edit the file `src/adaptiveCards/helloworldCommand.json` to customize the Adaptive Card to your preference. The file `src/cardModels.ts` defines a data structure that is used to fill data for the Adaptive Card.

The binding between the model and the Adaptive Card is done by matching name (for example, CardData.title maps to `${title}` in the Adaptive Card). You can add, edit, or remove properties and their bindings to customize the Adaptive Card to your needs.

You can also add new cards if appropriate for your application. How to build different types of adaptive cards with a list or a table of dynamic contents using `ColumnSet` and `FactSet`, see [TeamsFx-Samples](https://github.com/OfficeDev/TeamsFx-Samples/tree/ga/adaptive-card-notification).

## Auto-refresh to user-specific view

Earlier when Adaptive Cards were sent in a Teams channel or group chat, all users could see the same card content. Now, with the new refresh model for Adaptive Cards universal action, users can view user specific view. The auto refresh feature also facilitates scenarios like approvals, poll creator controls, ticketing, incident management, and project management cards. The following diagram illustrated how to provide user-specific view with `refresh` model:

:::image type="content" source="../../../assets/images/sbs-workflow-bot/user-specific-view-autoreferesh.png" alt-text="Diagramatic view of user specific autorefresh model" lightbox="../../../assets/images/sbs-workflow-bot/user-specific-view-autoreferesh.png":::

* `Base Card`: The bot sends a message with the base version of the card. This base card can be sent as a bot notification, command response, or any other card action response. All members of the conversation can view the same response. The base card will be automatically refreshed to the user defined `userId` in the `refresh` property of the base card.

* `Refresh behavior`: After the user views the message then Teams clients automatically triggers a refresh after a minute of the last refresh response. The user-specific view handler will be invoked to return a card view (`Response Card`) for specific user (`UserA`). And for other users in the conversation, they still view the base card.

The following gif image illustrates how user-specific view displays in Teams:

:::image type="content" source="../../../assets/images/sbs-workflow-bot/user-specific-views.gif" alt-text="User-specific view in teams displayed" lightbox="../../../assets/images/sbs-workflow-bot/user-specific-views.gif":::

### Steps to add user-specific view

Below are the steps to implement this pattern with TeamsFx SDK:

1. [Enable refresh in a base adaptive card](#step-1-enable-refresh-in-a-base-adaptive-card)
1. Add use-specific Adaptive Cards
1. Add card action handler to refresh views
1. Register action handler

### Step 1:  Enable refresh in a base adaptive card

As illustrated above, user-specific views are refreshed from a base card, for example, the card2 is refreshed from card1. So you need to enable auto-refresh on the base card, for example,  the card1. There are two options to achieve this:

* Option 1: Enable user-specific view refresh with SDK. The base card can be sent as a command response or a card action response. So you can enable user-specific view refresh in a `handleCommandReceived` of a command handler, or in a `handleActionInvoked` of card action handler where the base card is returned.

Below is a sample that returns a case card as command response that can auto-refresh to specific user, for example,  the command sender. You can use the `refresh(refreshVerb, userIds, data)` method from the `@microsoft/adaptivecards-tools` library to inject a refresh section into your base card. Ensure that you provide the following info to define the refresh section:

* `userIds`: A set of user MRIs for those who can trigger auto refresh. For more information on how to add in userIds list in refresh section of Adaptive Card, see [Fetch roster or user profile](../get-teams-context.md).
`verb`: A string to identify the refresh action.
`data`: An optional data to associate with the refresh action.

   ```
       import baseCard from "../adaptiveCards/baseCard.json";

import { AdaptiveCards } from "@microsoft/adaptivecards-tools";

export class MyCommandHandler1 implements TeamsFxBotCommandHandler {
  triggerPatterns: TriggerPatterns = "helloWorld";

  async handleCommandReceived(
    context: TurnContext,
    message: CommandMessage
  ): Promise<string | Partial<Activity> | void> {
    const refreshVerb = "userViewRefresh";        // verb to identify the refresh action
    const userIds = [ context.activity.from.id ]; // users who will be refreshed
    const data = { key: "value"};                 // optional data associated with the action

    const responseCard = AdaptiveCards
        .declare(baseCard)
        .refresh(refreshVerb, userIds, data)
        .render(cardData);
    
    return MessageFactory.attachment(CardFactory.adaptiveCard(responseCard));
  }
}
   ```
