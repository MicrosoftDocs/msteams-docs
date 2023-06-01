---
title: Workflow bot in Teams
author: surbhigupta
description: Learn how to send a response to card action in Teams workflow bot, add more card actions and customize action responses.
ms.topic: conceptual
ms.author: v-bvishnu
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

You can create a workflow bot to respond to the Adaptive Card triggered by users. Adaptive Card action handler powered by TeamsFx SDK can execute the Adaptive Card universal action `Action.Execute` triggered by users. In response to this respective card action in the conversation, the Adaptive Card action handler sends another Adaptive Card.

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

For more information on initialization customization, see [Customize initialization](command-bot-in-teams.md#customize-initialization)

## Customize installation

A Teams bot needs to be installed into a team, or a group chat, or as personal app, depending on the required scope. You need to select the installation target before adding the bot to your app.

* For more install options, see [configure default install options](../../../concepts/deploy-and-publish/apps-publish-overview.md#configure-default-install-options).

:::image type="content" source="../../../assets/images/notification-bot/notification-installation-scope.png" alt-text="add installation scope":::

* For more uninstall options, see [uninstall options](https://support.microsoft.com/office/remove-an-app-from-teams-0bc48d54-e572-463c-a7b7-71bfdc0e4a9d)

## Add card actions

To add card actions with JavaScript and TypeScript, follow these steps:

<br>

<details>

<summary><b>1. Add an action to your Adaptive Card</b></summary>

You can add a new action (button) to an Adaptive Card by defining it in the JSON file, such as add a new `Action.Execute`.

The following is a sample universal action type `Action.Execute`:

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

When the action is invoked in Teams, **verb** property is required, so that the TeamsFx conversation SDK can invoke the corresponding action handler. For more information on action to your Adaptive Card, see [Universal Actions](../../../task-modules-and-cards/cards/Universal-actions-for-adaptive-cards/Overview.md#universal-actions).

> [!NOTE]
> Ensure to provide a global unique string for the **verb** property, when you're using a general string that might cause a collision with other bot. This can avoid unexpected behavior.

</details>

<br/>

<details>

<summary><b>2. Respond with new Adaptive Card</b></summary>

You can return a new Adaptive Card for each action invoked to display the response to end user. You need to create a new file, `doSomethingResponse.json` as a response for the `doSomething` action with the following content:

```json
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

* For JS/TS: Create the Adaptive Card file in `src/adaptiveCards/` folder.
* For C#: Create the Adaptive Card file in `Resources/` folder.

> [!NOTE]
> You can design your card layout according to your business need. See, [adaptive Card designer](https://adaptivecards.io/designer/).

</details>

<br/>

<details>

<summary><b>3. Add action handler</b></summary>

You can handle a new action invoked by Adaptive Card with TeamsFx SDK's class `TeamsFxAdaptiveCardActionHandler`. You need to customize the action in this step, such as calling an API, processing data, or any other action as per your business need.

</br>

# [JavaScript](#tab/JS)

You can create a new file `/src/cardActions/doSomethingActionHandler.js(ts)`:

```javascript
    const { AdaptiveCards } = require("@microsoft/adaptivecards-tools");
    const { AdaptiveCardResponse, InvokeResponseFactory } = require("@microsoft/teamsfx");
    const responseCard = require("../adaptiveCards/doSomethingResponse.json");

    class DoSomethingActionHandler { 
    triggerVerb = "doSomething";

        async handleActionInvoked(context, message) { 
            const responseCardJson = AdaptiveCards.declare(responseCard).render(actionData);
            return InvokeResponseFactory.adaptiveCard(responseCardJson);
        }
    }

     module.exports = {

       DoSomethingActionHandler,
    }
```

# [TypeScript](#tab/TS)

You can create a new file `bot/src/cardActions/doSomethingActionHandler.ts`:

```typescript
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

# [C#](#tab/CS)

You can handle a new `Action.Execute` action invoked by implement with TeamsFx SDK's interface `IAdaptiveCardActionHandler`. You need to customize the action in this step, such as calling an API, processing data, or any other action as per your business need.

The following is an example of action handler:

You can create a new file `/CardActions/DoSomethingActionHandler.cs`

```csharp
using MyBotApp.Models;
using AdaptiveCards.Templating;
using Microsoft.Bot.Builder;
using Microsoft.TeamsFx.Conversation;
using Newtonsoft.Json;

namespace MyBotApp.CardActions
{
    public class DoStuffActionHandler : IAdaptiveCardActionHandler
    {
        private readonly string _responseCardFilePath = Path.Combine(".", "Resources", "doSomethingActionResponse.json");

        /// <summary>
        /// A global unique string associated with the `Action.Execute` action.
        /// The value should be the same as the `verb` property which you define in your adaptive card JSON.
        /// </summary>
        public string TriggerVerb => "doSomething";

        /// <summary>
        /// Indicate how your action response card is sent in the conversation.
        /// By default, the response card can only be updated for the interactor who trigger the action.
        /// </summary>
        public AdaptiveCardResponse AdaptiveCardResponse => AdaptiveCardResponse.ReplaceForInteractor;

        public async Task<InvokeResponse> HandleActionInvokedAsync(ITurnContext turnContext, object actionData, CancellationToken cancellationToken = default)
        {
            // Read adaptive card template
            var cardTemplate = await File.ReadAllTextAsync(_responseCardFilePath, cancellationToken);

            // Render adaptive card content
            var cardContent = new AdaptiveCardTemplate(cardTemplate).Expand
            (
                new HelloWorldModel
                {
                    Title = "Hello World Bot",
                    Body = $"Congratulations! Your {TriggerVerb} action is processed successfully!",
                }
            );

            // Send invoke response with adaptive card
            return InvokeResponseFactory.AdaptiveCard(JsonConvert.DeserializeObject(cardContent));
        }
    }
}
```

---

> [!NOTE]
>
> * `triggerVerb` is the **verb** property of your action.
> * `actionData` is the data associated with the action, which may include dynamic user input, or some contextual data provided in the data property of your action.
> * If an Adaptive Card is returned, the existing card is replaced with it by default.
> * To customize the action response card sent in Teams chat. For more information, see [Customize the action response](#customize-the-action-response).

</details>
</br>

<details>

<summary><b>4. Register the action handler</b></summary>

You need to configure each Adaptive Card action in the `conversationBot` that enables the conversational flow of the workflow bot template.

The following steps help you to register the action handler:

# [JavaScript/TypeScript](#tab/JS2)

   ```initialize.js(ts)
         const { BotBuilderCloudAdapter } = require("@microsoft/teamsfx");
         const ConversationBot  = BotBuilderCloudAdapter.ConversationBot;
           
         const conversationBot = new ConversationBot({ 
        ... 
        cardAction: { 
          enabled: true, 
          actions: [ 
            new DoStuffActionHandler(),
            new DoSomethingActionHandler()    // newly added doSomething card action handler
          ], 
        } 
      });
   ```

# [C#](#tab/CS2)

```csharp
...
builder.Services.AddSingleton<DoStuffActionHandler>();
builder.Services.AddSingleton<DoSomethingActionHandler>();      // Register new action handler to the service container
builder.Services.AddSingleton(sp =>
{
    var options = new ConversationOptions()
    {
        Adapter = sp.GetService<CloudAdapter>(),
        ...
        CardAction = new CardActionOptions()
        {
            Actions = new List<IAdaptiveCardActionHandler>
            {
                sp.GetService<DoStuffActionHandler>(),
                sp.GetService<DoSomethingActionHandler>(),     // Register new action handler to ConversationBot
            }
        }
        ...
    };

    return new ConversationBot(options);
});
```

---

</details>

</br>

## Customize the action response

You can use the `adaptiveCardResponse` property in handler to customize how the bot sends the Adaptive Card to users. Following are the three options to customize:

* The current card replaces the response card where the button is defined for the interactor that triggers the action. The users in the conversation can still view the original action card `AdaptiveCardResponse.ReplaceForInteractor`. This is the default behavior.

   :::image type="content" source="../../../assets/images/sbs-workflow-bot/replace-for-interactor.gif" alt-text="Grpahical interface that shows how to customize the bot to send adaptive card.":::

* The response card is replaced by the action card for all users in the chat, and they can view the response card `AdaptiveCardResponse.ReplaceForAll`.

   :::image type="content" source="../../../assets/images/sbs-workflow-bot/replace-for-all.gif" alt-text="Grpahical interface that shows action card for all with the acknowledge button.":::

* The response card is sent as a separate message in the conversation that can't replace the action card. All users in the chat can view the response card `AdaptiveCardResponse.NewForAll`.

   :::image type="content" source="../../../assets/images/sbs-workflow-bot/new-for-all.gif" alt-text="Grpahical interface that shows response card sent for all as new.":::

### Respond with text message

You can also respond with text messages instead of using Adaptive Card for card action response, using `InvokeResponseFactory.textMessage`:

```
async handleActionInvoked(context: TurnContext, actionData: any): Promise<InvokeResponse> {
    return InvokeResponseFactory.textMessage("This is a sample card action response!");
}
```

You can see the following response message in Teams:

:::image type="content" source="../../../assets/images/sbs-workflow-bot/sample-card-action-response.png" alt-text="sample card response displayed.":::

### Respond with error messages

When you want to return an error response message to the client, you can apply `InvokeResponseFactory.errorResponse` to build your invoke response. The following image shows error message in Adaptive Card:

:::image type="content" source="../../../assets/images/sbs-workflow-bot/error-message-response.png" alt-text="error response message displayed.":::

> [!NOTE]
> For more information about the invoke response format, see [response format](/adaptive-cards/authoring-cards/universal-action-model)

### Customize Adaptive Card content

You can edit the file `src/adaptiveCards/helloworldCommand.json` to customize Adaptive Card to your preference. The file `src/cardModels.ts` defines a data structure used to fill data for the Adaptive Card.

The binding between the model and the Adaptive Card is done by matching name such as, `CardData.title` maps to `${title}` in Adaptive Card. You can add, edit, or remove properties, and their bindings to customize the Adaptive Card to your needs.

You can also add new cards, if needed for your application. To build different types of Adaptive Cards with a list or a table of dynamic content using `ColumnSet` and `FactSet`, see [TeamsFx-Samples](https://github.com/OfficeDev/TeamsFx-Samples/tree/ga/adaptive-card-notification).

## Auto-refresh to user-specific view

When Adaptive Cards are sent in a Teams channel or group chat, all users can see the same card content. With the new refresh model for Adaptive Cards universal action, users can have a user-specific view. The auto-refresh also facilitates scenarios such as approvals, poll creator controls, ticketing, incident management, and project management cards. The following diagram illustrates how to provide user-specific view with `refresh` model. For more inforamtion, see [Refresh model](../../../task-modules-and-cards/cards/Universal-actions-for-adaptive-cards/Work-with-Universal-Actions-for-Adaptive-Cards.md#refresh-model)

:::image type="content" source="../../../assets/images/sbs-workflow-bot/sbs-workflow-bot-base-card.gif" alt-text="Graphical interface that shows of a user specific auto-refresh model.":::

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

 The user-specific views are refreshed from a base card, when response card is refreshed from the base card, as illustrated in the [auto-refresh user-specific view](#auto-refresh-to-user-specific-view). You need to enable auto-refresh on the base card. There are two options to achieve:

* First option enables user-specific view refresh with SDK. The base card can be sent as a command response or a card action response. You can enable user-specific view refresh in `handleCommandReceived` of a command handler, or in `handleActionInvoked` of card action handler where the base card is returned. You can use `refresh(refreshVerb, userIds, data)` method from the `@microsoft/adaptivecards-tools` library to inject a refresh section into your base card. To define the refresh section, ensure that you provide the following properties:

  1. `userIds`: A set of user MRIs for those who can trigger auto-refresh. For more information on how to add in `userIds` list in refresh section of Adaptive Card, see [fetch the roster or user profile](../get-teams-context.md#fetch-the-roster-or-user-profile).
  1. `verb`: A string to identify the refresh action.
  1. `data`: An optional data to associate with the refresh action.

  In the following sample, a base card returns as command response that can auto-refresh to specific user, such as the command sender:

  ```
  import baseCard from "../adaptiveCards/baseCard.json";
  import { AdaptiveCards } from "@microsoft/adaptivecards-tools";

        export class HelloWorldCommandHandler implements TeamsFxBotCommandHandler {
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

</details>

</br>

<details>

<summary><b>2. Add user-specific Adaptive Card</b></summary>

You need to design the user-specific Adaptive Card to refresh a specific response card such as `responseCard.json` for `userA` shown in the diagram for [refresh behavior](#auto-refresh-to-user-specific-view).

* For TS/JS: Create the adaptive card file in `src/adaptiveCards/` folder.
* For C#: Create the adaptive card file in `Resources/` folder.

```responseCard.json

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

</details>

</br>

<details>

<summary><b>3. Add card action handler to refresh views</b></summary>

You can add handler that implements `TeamsFxAdaptiveCardActionHandler` to process the refresh invoke activity that is automatically triggered in Teams. You can create a new file `/src/cardActions/refreshActionHandler.js(ts)`:

# [JavaScript](#tab/JS3)

```Javascript
const { AdaptiveCards } = require("@microsoft/adaptivecards-tools");
const { AdaptiveCardResponse, InvokeResponseFactory } = require("@microsoft/teamsfx");
const responseCard = require("../adaptiveCards/refreshResponse.json");

class RefreshActionHandler {
  triggerVerb = "userViewRefresh";

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
module.exports = {
  RefreshActionHandler,
};
```

# [TypeScript](#tab/TS2)

```TypeScript
const { AdaptiveCards } = require("@microsoft/adaptivecards-tools");
const { AdaptiveCardResponse, InvokeResponseFactory } = require("@microsoft/teamsfx");
const responseCard = require("../adaptiveCards/refreshResponse.json");

export class RefreshActionHandler {
  triggerVerb = "userViewRefresh";

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

# [C#](#tab/CS3)

You can handle a new refresh action by implementing the TeamsFx SDK's interface `IAdaptiveCardActionHandler`. You need to customize the action in this step, such as calling an API, processing data, or any other action as per your business need.

You can create a new file `/CardActions/RefreshActionHandler.cs`:

```csharp
using MyBotApp.Models;
using AdaptiveCards.Templating;
using Microsoft.Bot.Builder;
using Microsoft.TeamsFx.Conversation;
using Newtonsoft.Json;

namespace MyBotApp.CardActions
{
    public class RefreshActionHandler : IAdaptiveCardActionHandler
    {
        private readonly string _responseCardFilePath = Path.Combine(".", "Resources", "refreshActionResponse.json");

        /// <summary>
        /// A global unique string associated with the `Action.Execute` action.
        /// The value should be the same as the `verb` property which you define in your adaptive card JSON.
        /// </summary>
        public string TriggerVerb => "userViewRefresh";

        /// <summary>
        /// Indicate how your action response card is sent in the conversation.
        /// By default, the response card can only be updated for the interactor who trigger the action.
        /// </summary>
        public AdaptiveCardResponse AdaptiveCardResponse => AdaptiveCardResponse.ReplaceForInteractor;

        public async Task<InvokeResponse> HandleActionInvokedAsync(ITurnContext turnContext, object actionData, CancellationToken cancellationToken = default)
        {
            // Read adaptive card template
            var cardTemplate = await File.ReadAllTextAsync(_responseCardFilePath, cancellationToken);

            // Render adaptive card content
            var cardContent = new AdaptiveCardTemplate(cardTemplate).Expand
            (
                new HelloWorldModel
                {
                    Title = "Hello World Bot",
                    Body = $"Congratulations! You're refreshed to a user-specific view!",
                }
            );

            // Send invoke response with adaptive card
            return InvokeResponseFactory.AdaptiveCard(JsonConvert.DeserializeObject(cardContent));
        }
    }
}
```

---

</details>

</br>

<details>

<summary><b>4. Register the action handler</b></summary>

You can register the refresh action handler in `bot/src/internal/initialize.js(ts)` with the following code:

# [JavaScript/Typescript](#tab/JS4)

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

# [C#](#tab/CS4)

```csharp
...
builder.Services.AddSingleton<DoStuffActionHandler>();
builder.Services.AddSingleton<RefreshActionHandler>();      // Register new action handler to the service container
builder.Services.AddSingleton(sp =>
{
    var options = new ConversationOptions()
    {
        Adapter = sp.GetService<CloudAdapter>(),
        ...
        CardAction = new CardActionOptions()
        {
            Actions = new List<IAdaptiveCardActionHandler>
            {
                sp.GetService<DoStuffActionHandler>(),
                sp.GetService<RefreshActionHandler>(),     // Register new action handler to ConversationBot
            }
        }
        ...
    };

    return new ConversationBot(options);
});
```

---

</details>

### Access Microsoft Graph

If you're responding to a command that needs to access Microsoft Graph data of an already signed in Teams user, you can do so by single sign-on (SSO) with their Teams user token. Read more about how Teams Toolkit can help you to [add single sign-on to Teams app](../../../toolkit/add-single-sign-on.md).

### Connect to existing APIs

You need to often connect to existing APIs for retrieving data to send to Teams. Teams Toolkit makes it easy for you to configure and manage authentication for existing APIs. For more information, see how to [integrate existing third party APIs](../../../toolkit/add-API-connection.md).

## FAQ

</br>

<details>

<summary><b>How to extend workflow bot with notifications?</b></summary>

Notifications add the ability in your app to send Adaptive Cards in response to external events. For example, when a message is posted to an `Event Hub`, your app can respond with an Adaptive Card to Teams.

To add the notification feature:

1. Go to `bot\src\internal\initialize.js(ts)`
1. Update your `conversationBot` initialization to enable notification feature:

    ```initialize.js(ts)
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

1. Add a sample notification triggered by an HTTP request, add the sample code in `bot\src\index.js(ts)`:

    ```initialize.js(ts)
    server.post("/api/notification", async (req, res) => {
      for (const target of await conversationBot.notification.installations()) {
        await target.sendMessage("This is a sample notification message");
      }
    
      res.json({});
    }); 
    
    ```

1. Uninstall your previous bot installation from Teams, and press **F5** to start your application.
1. Send a notification to the bot installation targets (channel/group chat/personal chat) by using your favorite tool to send an HTTP POST request to `https://localhost:3978/api/notification`. For more information, see [Notification bot in Teams](notification-bot-in-teams.md).

</details>

</br>

<details>

<summary><b>How to extend workflow bot with command and response?</b></summary>

The default workflow bot comes with command and response. For more information to extend workflow bot with command and response, see [add command and response](command-bot-in-teams.md#add-command-and-response).

</details>

</br>

## Step-by-step guide

Follow the [step-by-step](../../../sbs-gs-workflow-bot.yml) guide to build Teams workflow bot.

## See also

* [Build bots for Teams](../../what-are-bots.md)
* [Build your first bot app using JavaScript](../../../sbs-gs-bot.yml)
* [Build notification bot with JavaScript](../../../sbs-gs-notificationbot.yml)
* [Adaptive Cards](../../../task-modules-and-cards/what-are-cards.md#adaptive-cards)
* [Conversation basics](conversation-basics.md)
