---
title: Workflow bots in Teams
description: Learn how to send a response to card action in Teams workflow bot, add more card actions and customize action responses.
ms.topic: conceptual
ms.author: surbhigupta
ms.localizationpriority: high
---

# Workflow bots in Teams

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

:::image type="content" source="../../../assets/images/sbs-workflow-bot/replace-for-interactor.gif" alt-text="Customize how the bot sends adaptive card":::
