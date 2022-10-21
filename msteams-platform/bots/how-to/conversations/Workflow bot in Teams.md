---
title: Workflow bot in Teams
description: Learn how to send a response to card action in Teams workflow bot, add more card actions and customize action responses.
ms.topic: conceptual
ms.author: surbhigupta
ms.localizationpriority: high
---

# Workflow bot in Teams

A workflow bot can be installed into a team, group chat, or as personal app, depending on different scopes. The default command logic simply returns an Adaptive Card. You can customize this logic with your business requirement. Often this might require you to call your existing APIs. Users can create a workflow bot to respond to Adaptive Card that is triggered by end users. Adaptive Card action handler provides one or more buttons in the card to ask for user's input by calling APIs that sends another Adaptive Card in conversation to respond to the respective card action.

> [!NOTE]
> You can choose the installation target when adding the app. For more install options see [Distribute your Teams app](../../../concepts/deploy-and-publish/apps-publish-overview.md).

## Card action handler

To simplify the development, the TeamsFx SDK provides an Adaptive Card action handler (`TeamsFxAdaptiveCardActionHandler`) to let you focus only on the development of business requirement to respond to the card action without learning the Bot Framework.

The following diagram illustrates how to respond to an Adaptive Card action with TeamsFx SDK:

:::image type="content" source="../../../assets/images/sbs-workflow-bot/sbs-workflow-bot-card-action-handler-diag.png" alt-text="workflow bot card action handler diagram" lightbox="../../../assets/images/sbs-workflow-bot/sbs-workflow-bot-card-action-handler-diag.png":::

* `Action Card`: The card where you define your action that users can invoke (click button).
* `Card Action Handler`: Triggered when users invoke the corresponding card action (its `triggerVerb` is same as the `verb` property in adaptive card action). It can send a response card to respond to the action.
* `Response Card`: The card to respond to the action when user invokes it from the action card.

To handle card actions with TeamsFx SDK, each card action handler should implement `TeamsFxAdaptiveCardActionHandler` interface. This is the interface definition for `TeamsFxAdaptiveCardActionHandler`:

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

## Add card action

Steps you can follow to add card actions:

1. [Add an action to your Adaptive Card](#add-an-action-to-your-adaptive-card)
1. [Add Adaptive Card for action response](#add-adaptive-card-for-action-response)
1. [Add action handler](#add-action-handler)
1. [Register the action handler](#register-the-action-handler)

### Add an action to your Adaptive Card

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
> Verb property is required here so that the TeamsFx conversation SDK can invoke the corresponding action handler when the action is invoked in Teams. When you're using a general string that might cause a collision with other bot actions, then ensure to provide a global unique string for the verb property, else you can experience unexpected behavior.

### Add Adaptive Card for action response

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

### Add action handler

Add action handler to implement `TeamsFxAdaptiveCardActionHandler` to process the logic when corresponding action is executed.

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

### Register the action handler

To register the action handler, follow these steps:

1. Go to `bot/src/internal/initialize.js(ts)`;
1. Update your `conversationBot` initialization to enable cardAction feature and add the handler to actions array:

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

* The response card will be replaced by the current one (the card where the button is defined) for the interactor that triggers the action. Users in the conversation still view the original action card `AdaptiveCardResponse.ReplaceForInteractor`. This is the default behavior.

   :::image type="content" source="../../../assets/images/sbs-workflow-bot/replace-for-interactor.gif" alt-text="Customize how the bot sends adaptive card" lightbox="../../../assets/images/sbs-workflow-bot/replace-for-interactor.gif":::

* The response card will be replaced by the Action Card for all users in the chat, and they can view this response card `AdaptiveCardResponse.ReplaceForAll`.

   :::image type="content" source="../../../assets/images/sbs-workflow-bot/replace-for-all.gif" alt-text="Replaced the action card for all" lightbox="../../../assets/images/sbs-workflow-bot/replace-for-all.gif":::

* The response card will be sent as a separate message in the conversation that won't replace the action card. And all users in the chat can view this response card `AdaptiveCardResponse.NewForAll`.

   :::image type="content" source="../../../assets/images/sbs-workflow-bot/new-for-all.gif" alt-text="Response card sent for all as new." lightbox="../../../assets/images/sbs-workflow-bot/new-for-all.gif":::

### Respond with text message

You can also respond with text messages instead of using adaptive card for card action response, using `InvokeResponseFactory.textMessage`:

```
async handleActionInvoked(context: TurnContext, actionData: any): Promise<InvokeResponse> {
    return InvokeResponseFactory.textMessage("This is a sample card action response!");
}
```

You can see the following response message in Teams:

:::image type="content" source="../../../assets/images/sbs-workflow-bot/sample-card-action-response.png" alt-text="sample card response displayed":::

### Respond with error messages

When you want to return error response message to the client, then you can apply the `InvokeResponseFactory.errorResponse` to build your invoke response, for example:

:::image type="content" source="../../../assets/images/sbs-workflow-bot/error-message-response.png" alt-text="error response message displayed":::

> [!NOTE]
> For more information about the invoke response format, see [Response format](/adaptive-cards/authoring-cards/universal-action-model).

### Customize Adaptive Card content

You can edit the file `src/adaptiveCards/helloworldCommand.json` to customize Adaptive Card to your preference. The file `src/cardModels.ts` defines a data structure that is used to fill data for the Adaptive Card.

The binding between the model and the Adaptive Card is done by matching name (for example, `CardData.title` maps to `${title}` in Adaptive Card). You can add, edit, or remove properties and their bindings to customize the Adaptive Card to your needs.

You can also add new cards if appropriate for your application. How to build different types of Adaptive Cards with a list or a table of dynamic contents using `ColumnSet` and `FactSet`, see [TeamsFx-Samples](https://github.com/OfficeDev/TeamsFx-Samples/tree/ga/adaptive-card-notification).

## Auto-refresh to user-specific view

Earlier when Adaptive Cards were sent in a Teams channel or group chat, all users could see the same card content. Now, with the new refresh model for Adaptive Cards universal action, users can have a user specific view. The auto refresh feature also facilitates scenarios like approvals, poll creator controls, ticketing, incident management, and project management cards. The following diagram illustrates how to provide user-specific view with `refresh` model:

:::image type="content" source="../../../assets/images/sbs-workflow-bot/user-specific-view-autoreferesh.png" alt-text="Diagramatic view of user specific autorefresh model" lightbox="../../../assets/images/sbs-workflow-bot/user-specific-view-autoreferesh.png":::

* `Base Card`: The bot sends a message with the base version of the card. This base card can be sent as a bot notification, command response, or any other card action response. All members of the conversation can view the same response. The base card will be automatically refreshed to the user defined `userId` in the `refresh` property of the base card.

* `Refresh behavior`: After the user views the message, then Teams clients automatically triggers a refresh after a minute of the last refresh response. The user-specific view handler will be invoked to return a card view (`Response Card`) for specific user (`UserA`). Also for other users in the conversation, and all still view the base card.

The following gif image illustrates how user-specific view displays in Teams:

:::image type="content" source="../../../assets/images/sbs-workflow-bot/user-specific-views.gif" alt-text="User-specific view in teams displayed" lightbox="../../../assets/images/sbs-workflow-bot/user-specific-views.gif":::

### Steps to add user-specific view

Below are the steps to implement this pattern with TeamsFx SDK:

1. [Enable refresh in base Adaptive Card](#enable-refresh-in-base-adaptive-card)
1. [Add use-specific Adaptive Cards](#add-user-specific-adaptive-cards)
1. [Add card action handler to refresh views](#add-card-action-handler-to-refresh-views)
1. [Register action handler](#register-the-action-handler-1)

#### Enable refresh in base Adaptive Card

As illustrated above, user-specific views are refreshed from a base card, for example, the card2 is refreshed from card1. So you need to enable auto-refresh on the base card, such as  the card1. There are two options to achieve this:

* Enable user-specific view refresh with SDK. The base card can be sent as a command response or a card action response. So you can enable user-specific view refresh in a `handleCommandReceived` of a command handler, or in a `handleActionInvoked` of card action handler where the base card is returned.

Below is a sample that returns a base card as command response that can auto-refresh to specific user, such as the command sender. You can use the `refresh(refreshVerb, userIds, data)` method from the `@microsoft/adaptivecards-tools` library to inject a refresh section into your base card. Ensure that you provide the following info to define the refresh section:

  - * `userIds`: A set of user MRIs for those who can trigger auto refresh. For more information on how to add in `userIds` list in refresh section of Adaptive Card, see [Fetch roster or user profile](../get-teams-context.md).
  - * `verb`: A string to identify the refresh action.
  - * `data`: An optional data to associate with the refresh action.

    ```
        import baseCard from "../adaptiveCards/baseCard.json";
        import { AdaptiveCards } from "@microsoft/adaptivecards-tools";

        export class MyCommandHandler1 implements TeamsFxBotCommandHandler {
        triggerPatterns: TriggerPatterns = "helloWorld";

        async handleCommandReceived(context: TurnContext, message: CommandMessage): 
        Promise<string | Partial<Activity> | void> {
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

**Option 2**: Enable user-specific view to refresh your Adaptive Card.

Here's a sample refresh action defined in `baseCard.json`:

```
{ 
  "type": "AdaptiveCard", 
  "refresh": { 
    "action": { 
      "type": "Action.Execute", 
      "title": "Refresh", 
      "verb": "userViewRefresh" ,
      "data": { 
        "key": "value" 
      }
    }, 
    "userIds": [ 
      "${userID}" 
    ] 
  }, 
  "body": [ 
    ... 
  ], 
  ... 
}
```

You need to replace `${userID}` with user MRI in code, when rendering your card content.

#### Add user-specific Adaptive Cards

You need to design the user-specific Adaptive Card to refresh specific users such as  `responseCard.json` for user A in above sample. To get started, you can create a `responseCard.json` with the following content, and put it in `bot/src/adaptiveCards` folder:

```
{
  "type": "AdaptiveCard",
  "body": [
    {
      "type": "TextBlock",
      "size": "Medium",
      "weight": "Bolder",
      "text": "This is a user-specific view"
    }
  ],
  "$schema": "http://adaptivecards.io/schemas/adaptive-card.json",
  "version": "1.4"
}
```

#### Add card action handler to refresh views

Add handler that implements `TeamsFxAdaptiveCardActionHandler` to process the refresh invoke activity that is automatically triggered in Teams.

```
import responseCard from "../adaptiveCards/responseCard.json"; 

export class Handler1 implements TeamsFxBotCardActionHandler { 
    triggerVerb: string = "userViewRefresh";
 
    async handleActionInvoked(context: TurnContext, actionData: any): Promise<InvokeResponse> {
      /**
       * If you have multiple userIds defined in your refresh action, for example: userIds: [ "<UserA>", "<userB>" ] ,
       * and you can return different card response for those users respectively with the following code sample.
        
        const currentUserId = context.activity.from.id;
        switch (currentUserId) {
          case "<userA's id>":
            const card1 = AdaptiveCards.declare(card1).render(actionData);
            return InvokeResponseFactory.adaptiveCard(card1);
          case "<userB's id>":
            const card1 = AdaptiveCards.declare(card2).render(actionData);
            return InvokeResponseFactory.adaptiveCard(card2);
        }
     */
      const responseCardJson = AdaptiveCards.declare(responseCard).render(actionData);
      return InvokeResponseFactory.adaptiveCard(responseCardJson);
    } 
}
```

#### Register the action handler

Register the refresh action handler in `bot/src/internal/initialize.js(ts)`:

```
export const commandBot = new ConversationBot({ 
  ... 
  cardAction: { 
    enabled: true, 
    actions: [ 
      new Handler1() 
    ], 
  } 
})
```

### Access Microsoft Graph

If you're responding to a command that needs access to Microsoft Graph, you can use single sign-on (SSO) to use the logged-in Teams user token to access their Microsoft Graph data. Read more about how Teams Toolkit can help you to [add single sign-on to Teams app](../../../toolkit/add-single-sign-on.md).

### Connect to existing APIs

You need to often connect to existing APIs for retrieving data to send to Teams. Teams Toolkit makes it easy for you to configure and manage authentication for existing APIs. For more information, see how to [integrate existing third party APIs](../../../toolkit/add-API-connection.md).

## Frequently asked questions

### How to extend workflow bot with notification feature?

The notification feature adds the ability for your application to send Adaptive Cards in response to external events. For example, when a message is posted to Event Hub, your application can respond and send an appropriate Adaptive Card to Teams.

To add the notification feature:

1. Go to `bot\src\internal\initialize.js(ts)`

1. Update your `conversationBot` initialization to enable notification feature:

   ```
   const conversationBot = new ConversationBot({ 
     ... 
     cardAction: { 
       enabled: true, 
       actions: [ 
         new Handler1() 
       ], 
     },
     notification: {
       enabled: true
     } 
   });
   ```

1. To quickly add a sample notification triggered by HTTP request, you can add the following sample code in `bot\src\index.js(ts)`:

   ```
      server.post("/api/notification", async (req, res) => {

     for (const target of await conversationBot.notification.installations()) {
       await target.sendMessage("This is a sample notification message");
     }

     res.json({});
   });
   ```

1. Uninstall your previous bot installation from Teams, and select `F5` to start your application.

1. Send a notification to the bot installation targets (channel/group chat/personal chat) by using your favorite tool to send HTTP POST request to `https://localhost:3978/api/notification`.

### How to extend workflow bot with command and response feature?

The default workflow bot comes with command and response, see [how to add more command and response](https://github.com/OfficeDev/TeamsFx/wiki/Respond-to-chat-commands-in-Teams#How-to-add-more-command-and-response).

## Next step

> [!div class="nextstepaction"]
> [Placeholder for workflow bot SBS]

## See also

* [Placeholder for workflow bot SBS]
* [**Teams proactive messaging code samples**](https://github.com/OfficeDev/Microsoft-Teams-Samples/tree/main/samples/bot-proactive-messaging/csharp)
* [Send proactive notifications to users](/azure/bot-service/bot-builder-howto-proactive-message)
* [Build your first bot app using JavaScript](../../../sbs-gs-bot.yml)
* [Build notification bot with JavaScript to send a proactive message](../../../sbs-gs-notificationbot.yml)
