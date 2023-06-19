---
title: Workflow bot in Teams
author: surbhigupta
description: Learn how to send a response to card action in Teams workflow bot, add more card actions and customize action responses.
ms.topic: conceptual
ms.author: v-amprasad
ms.localizationpriority: high
---

# Workflow bot in Teams

A workflow bot allows users to interact with an Adaptive Card. Adaptive Card action handler enables the Adaptive card to converse in Teams app. You can create a workflow bot in multiple scenarios for your users to enhance the user experience, such as incident management, ticketing, approval workflow, and project management cards. You can create and assign a work item with workflow bot and sync the content to Azure DevOps or Jira system.

A workflow bot can be installed into a team, group chat, or as personal app, depending on different scopes. The default command logic returns an Adaptive Card. You can customize this logic with your business requirement. For the customization, you need to call your existing APIs.

**Advantages**:

* Automates business processes and repetitive workflows without leaving the context of conversations.
* Supports users with sequential workflow through various cards progressively, without sending additional cards.
* Provides up-to-date user-specific views.
* Simplifies programming model with TeamsFx SDK.

   > [!NOTE]
   > You can select the capability that you want to install, when adding the app. For more information, see [configure default install options](../../../concepts/deploy-and-publish/apps-publish-overview.md#configure-default-install-options).

You can create a workflow bot to respond to the Adaptive Card triggered by users. Adaptive Card action handler powered by TeamsFx SDK can execute the Adaptive Card universal action `Action.Execute` triggered by users. In response to this respective card action in the conversation another Adaptive Card is sent by the Adaptive card action handler.

:::image type="content" source="../../../assets/images/sbs-workflow-bot/sbs-workflow-bot-final-output.png" alt-text="Workflow bot final output with a button" lightbox="../../../assets/images/sbs-workflow-bot/sbs-workflow-bot-final-output.png" :::

## Card action handler

To simplify the creation of a workflow bot, the TeamsFx SDK provides an Adaptive Card action handler `TeamsFxAdaptiveCardActionHandler`. You can focus only on the development of workflow bot to respond to the card action without learning the Bot Framework.

The following diagram illustrates how to respond to an Adaptive Card action with TeamsFx SDK:

:::image type="content" source="../../../assets/images/sbs-workflow-bot/sbs-workflow-bot-action-card.png" alt-text="workflow bot card action handler diagram" lightbox="../../../assets/images/sbs-workflow-bot/sbs-workflow-bot-action-card.png":::

1. **Action card**: The card where you define your action that users can invoke, for example the `DoStuff`.
1. **Card action handler**: Triggered when users invoke the corresponding card action, its `triggerVerb` is same as the `verb` property in Adaptive Card action. It can send a response card to respond to the action.
1. **Response card**: The card that responds to the action when user invokes it from the action card.

To handle card actions with TeamsFx SDK, each card action handler must implement the `TeamsFxAdaptiveCardActionHandler` interface. This is the interface definition for `TeamsFxAdaptiveCardActionHandler`:

``` Export interface
-
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

You can initialize the workflow bot with your own adapter or customize after initialization. The default initialization is located in `bot/src/internal/initialize.js(ts)`.

You can update the initialization logic to:

1. Set `options.adapter` to use your own `BotFrameworkAdapter`.
1. Set `options.command.commands` to include multiple command handlers.
1. Set `options.cardAction.actions` to include multiple action handlers.
1. Set `options.{feature}.enabled` to enable multiple `ConversationBot` functionality.

For more information on initialization customization, see [additional initialization customization](https://github.com/OfficeDev/TeamsFx/wiki/Respond-to-chat-commands-in-Teams#customize-initialization)

## Add card actions

To add card actions with JavaScript and TypeScript, you can perform the following:

<br>

<details>

<summary><b>1. Add an action to your Adaptive Card</b></summary>

You can add a new action (button) to an Adaptive Card by defining it in the JSON file, such as add a new `DoSomething` action to the `src/adaptiveCards/helloworldCommandResponse.json` file. This is a sample action type `Action.Execute`:

```helloworldCommandResponse.json
{ 
  "type": "AdaptiveCard", 
  "body": [
    ...
    {
      "type": "ActionSet",
      "actions": [
        {
          "type": "Action.Execute",
          "title": "DoSomething",
          "verb": "doSomething" 
        }
      ]
    },
    ...
  ]
}
```

When the action is invoked in Teams, verb property is required, so that the TeamsFx conversation SDK can invoke the corresponding action handler.

> [!NOTE]
> Ensure to provide a global unique string for the verb property, when you're using a general string that might cause a collision with other bot. This can avoid unexpected behavior.

<br>

</details>

<details>

<summary><b>2. Respond with new Adaptive Card</b></summary>

You can return a new Adaptive Card for each action invoked to display the response to end user. You need to create a new file, `bot/src/adaptiveCards/doSomethingResponse.json` as a response for the `doSomething` action with the following content:

```
{
  "type": "AdaptiveCard",
  "body": [
    {
      "type": "TextBlock",
      "size": "Medium",
      "weight": "Bolder",
      "text": "A sample response to DoSomething."
    }
  ],
  "$schema": "http://adaptivecards.io/schemas/adaptive-card.json",
  "version": "1.4"
}
```

> [!NOTE]
> You can design your card layout according to your business need. See, [adaptive Card designer](https://adaptivecards.io/designer/).

<br>

</details>

<details>

<summary><b>3. Add action handler</b></summary>

You can handle a new action invoked by Adaptive Card with TeamsFx SDK's class `TeamsFxAdaptiveCardActionHandler`. You need to customize the action in this step, such as calling an API, processing data, or any other action as per your business need.

### [JavaScript](#tab/JS)

You can create a new file `bot/src/cardActions/doSomethingActionHandler.js`:

```doSomethingActionHandler.js
    const { AdaptiveCards } = require("@microsoft/adaptivecards-tools");
    const { AdaptiveCardResponse, InvokeResponseFactory } = require("@microsoft/teamsfx");
    const responseCard = require("../adaptiveCards/doSomethingResponse.json");

    class DoSomethingActionHandler { 
    triggerVerb = "doStuff";

        async handleActionInvoked(context, message) { 
            const responseCardJson = AdaptiveCards.declare(responseCard).render(actionData);
            return InvokeResponseFactory.adaptiveCard(responseCardJson);
        }
    }

     module.exports = {

       DoSomethingActionHandler,
    }
```

### [TypeScript](#tab/TS)

You can create a new file `bot/src/cardActions/doSomethingActionHandler.ts`:

```doSomethingActionHandler.ts
    const { AdaptiveCards } = require("@microsoft/adaptivecards-tools");
    const { AdaptiveCardResponse, InvokeResponseFactory } = require("@microsoft/teamsfx");
    const responseCard = require("../adaptiveCards/doSomethingResponse.json");

    export class DoSomethingActionHandler {
        triggerVerb = "doSomething";

        async handleActionInvoked(context, message) { 
            const responseCardJson = AdaptiveCards.declare(responseCard).render(actionData);
            return InvokeResponseFactory.adaptiveCard(responseCardJson);
        } 
    }
```

---

The following is an example of action handler:

* `triggerVerb` is the verb property of your action.
* `actionData` is the data associated with the action, which may include dynamic user input, or some contextual data provided in the data property of your action.
* If an Adaptive Card is returned, the existing card is replaced with it by default.

<br>

</details>

<details>

<summary><b>4. Register the action handler</b></summary>

You need to configure each new card action in the `conversationBot` that enables the conversational flow of the workflow bot template. You can navigate to `bot/src/internal/initialize.js(ts)` file and update the `actions` array of the `cardAction` property.

The following steps help you to register the action handler:

1. You can open file `bot/src/internal/initialize.js(ts)`.
1. You need to update your `conversationBot` initialization, to enable `cardAction` feature and add the handler to actions array:

   ```initialize.js(ts)
         const conversationBot = new ConversationBot({ 
        ... 
        cardAction: { 
          enabled: true, 
          actions: [ 
            new DoStuffActionHandler(),
            new DoSomethingActionHandler() 
          ], 
        } 
      });
   ```

   > [!NOTE]
   > To learn more about extending the Workflow bot template, see [respond to card actions in Teams](https://github.com/OfficeDev/TeamsFx/wiki/Respond-to-card-actions-in-Teams)

<br>

</details>

## Customize the action response

You can use the `adaptiveCardResponse` property in handler to customize how the bot sends the Adaptive Card to users. Following are the three options to customize:

* The response card is replaced by the current card where the button is defined for the interactor that triggers the action. The users in the conversation can still view the original action card `AdaptiveCardResponse.ReplaceForInteractor`. This is the default behavior.

   :::image type="content" source="../../../assets/images/sbs-workflow-bot/replace-for-interactor.png" alt-text="Customize how the bot sends adaptive card" lightbox="../../../assets/images/sbs-workflow-bot/replace-for-interactor.png":::

* The response card is replaced by the action card for all users in the chat, and they can view the response card `AdaptiveCardResponse.ReplaceForAll`.

   :::image type="content" source="../../../assets/images/sbs-workflow-bot/replace-for-all1.png" alt-text="Replaced the action card for all with the acknowledge button" lightbox="../../../assets/images/sbs-workflow-bot/replace-for-all1.png":::

   :::image type="content" source="../../../assets/images/sbs-workflow-bot/replace-for-all2.png" alt-text="Replaced the action card for all" lightbox="../../../assets/images/sbs-workflow-bot/replace-for-all2.png":::

* The response card is sent as a separate message in the conversation that can't replace the action card. All users in the chat can view the response card `AdaptiveCardResponse.NewForAll`.

   :::image type="content" source="../../../assets/images/sbs-workflow-bot/new-for-all.png" alt-text="Response card sent for all as new" lightbox="../../../assets/images/sbs-workflow-bot/new-for-all.png":::

### Respond with text message

You can also respond with text messages instead of using Adaptive Card for card action response, using `InvokeResponseFactory.textMessage`:

```
async handleActionInvoked(context: TurnContext, actionData: any): Promise<InvokeResponse> {
    return InvokeResponseFactory.textMessage("This is a sample card action response!");
}
```

You can see the following response message in Teams:

:::image type="content" source="../../../assets/images/sbs-workflow-bot/sample-card-action-response.png" alt-text="sample card response displayed":::

### Respond with error messages

When you want to return an error response message to the client, you can apply `InvokeResponseFactory.errorResponse` to build your invoke response. The following image shows error message in Adaptive Card:

:::image type="content" source="../../../assets/images/sbs-workflow-bot/error-message-response.png" alt-text="error response message displayed":::

> [!NOTE]
> For more information about the invoke response format, see [response format](/adaptive-cards/authoring-cards/universal-action-model?branch=pr-en-us-7193).

### Customize Adaptive Card content

You can edit the file `src/adaptiveCards/helloworldCommand.json` to customize Adaptive Card to your preference. The file `src/cardModels.ts` defines a data structure used to fill data for the Adaptive Card.

The binding between the model and the Adaptive Card is done by matching name such as, `CardData.title` maps to `${title}` in Adaptive Card. You can add, edit, or remove properties, and their bindings to customize the Adaptive Card to your needs.

You can also add new cards, if needed for your application. To build different types of Adaptive Cards with a list or a table of dynamic content using `ColumnSet` and `FactSet`, see [TeamsFx-Samples](https://github.com/OfficeDev/TeamsFx-Samples/tree/ga/adaptive-card-notification).

## Auto-refresh to user-specific view

When Adaptive Cards are sent in a Teams channel or group chat, all users can see the same card content. With the new refresh model for Adaptive Cards universal action, users can have a user-specific view. The auto-refresh also facilitates scenarios such as approvals, poll creator controls, ticketing, incident management, and project management cards. The following diagram illustrates how to provide user-specific view with `refresh` model:

:::image type="content" source="../../../assets/images/sbs-workflow-bot/sbs-workflow-bot-base-card.png" alt-text="Diagramatic view of user specific auto-refresh model" lightbox="../../../assets/images/sbs-workflow-bot/sbs-workflow-bot-base-card.png":::

1. **Base card**: The bot sends a message with the base version of the card. This base card can be sent as a bot notification, command response, or any other card action response. All members of the conversation can view the same response. The base card is automatically refreshed to the user defined `userId` in the `refresh` property of the base card.

1. **Refresh behavior**: After the user views the message, Teams client automatically triggers a refresh a minute after the last refresh response. The user-specific view handler is invoked to return a card view `Response Card` for specific user `UserA`. Other users in the conversation can still view the base card.

The following image illustrates how user-specific view is displayed in Teams:

:::image type="content" source="../../../assets/images/sbs-workflow-bot/user-specific-views.png" alt-text="User-specific view in teams displayed" lightbox="../../../assets/images/sbs-workflow-bot/user-specific-views.png":::

### Add user-specific view

The following steps help you to add user-specific view with TeamsFx SDK:

<br>

</details>

<details>

<summary><b>1. Enable refresh in base Adaptive Card</b></summary>

 The user-specific views are refreshed from a base card, when response card is refreshed from the base card, as illustrated in the [auto-refresh user-specific view](#auto-refresh-to-user-specific-view). You need to enable auto-refresh on the base card. There are two options to achieve this:

* First option enables user-specific view refresh with SDK. The base card can be sent as a command response or a card action response. You can enable user-specific view refresh in `handleCommandReceived` of a command handler, or in `handleActionInvoked` of card action handler where the base card is returned. You can use `refresh(refreshVerb, userIds, data)` method from the `@microsoft/adaptivecards-tools` library to inject a refresh section into your base card. To define the refresh section, ensure that you provide the following:

  1. `userIds`: A set of user MRIs for those who can trigger auto-refresh. For more information on how to add in `userIds` list in refresh section of Adaptive Card, see [fetch the roster or user profile](../get-teams-context.md#fetch-the-roster-or-user-profile).
  1. `verb`: A string to identify the refresh action.
  1. `data`: An optional data to associate with the refresh action.

  In the following sample, a base card returns as command response that can auto-refresh to specific user, such as the command sender:

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

* Second option enables user-specific view to refresh your Adaptive Card. This is a sample refresh action defined in `baseCard.json`:

  ```baseCard.json

-
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

  You need to replace `${userID}` with user MRI in code, while rendering your card content.

<br>

</details>

<details>

<summary><b>2. Add user-specific Adaptive Card</b></summary>

You need to design the user-specific Adaptive Card to refresh a specific response card such as `responseCard.json` for `userA` shown in the diagram for [refresh behavior](#auto-refresh-to-user-specific-view). To get started, you can create a `responseCard.json` with the following content, and save it in `bot/src/adaptiveCards` folder:

```responseCard.json
-
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

<br>

</details>

<details>

<summary><b>3. Add card action handler to refresh views</b></summary>

You can add handler that implements `TeamsFxAdaptiveCardActionHandler` to process the refresh invoke activity that is automatically triggered in Teams:

```TypeScript
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

<br>

</details>

<details>

<summary><b>4. Register the action handler</b></summary>

You can register the refresh action handler in `bot/src/internal/initialize.js(ts)` with the following code:

```initialize.js(ts)
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

<br>

</details>

### Access Microsoft Graph

If you're responding to a command that needs to access Microsoft Graph data of an already signed in Teams user, you can do so by single sign-on (SSO) with their Teams user token. Read more about how Teams Toolkit can help you to [add single sign-on to Teams app](../../../toolkit/add-single-sign-on.md).

### Connect to existing APIs

You need to often connect to existing APIs for retrieving data to send to Teams. Teams Toolkit makes it easy for you to configure and manage authentication for existing APIs. For more information, see how to [integrate existing third party APIs](../../../toolkit/add-API-connection.md).

## FAQ

<br>

<details>

<summary><b>How to extend workflow bot with notifications?</b></summary>

Notifications add the ability in your app to send Adaptive Cards in response to external events. For example, when a message is posted to an Event Hub, your app can respond with an Adaptive Card as required. How to extend workflow bot with notifications, see [customize notifications](notification-bot-in-teams.md#customize-notification).

<br>

</details>

<details>

<summary><b>How to extend workflow bot with command and response?</b></summary>

The default workflow bot comes with command and response. For more information to extend workflow bot with command and response, see [add command and response](command-bot-in-teams.md#add-command-and-response).

<br>

</details>

## Step-by-step guide

Follow the [step-by-step](../../../sbs-gs-workflow-bot.yml) guide to build Teams workflow bot.

## See also

* [Build bots for Teams](../../what-are-bots.md)
* [Build your first bot app using JavaScript](../../../sbs-gs-bot.yml)
* [Build notification bot with JavaScript](../../../sbs-gs-notificationbot.yml)
* [Adaptive Cards](../../../task-modules-and-cards/what-are-cards.md#adaptive-cards)
* [Conversation basics](conversation-basics.md)
