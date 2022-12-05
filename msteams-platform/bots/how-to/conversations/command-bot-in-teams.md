---
title: Notification bot in Teams
author: surbhigupta
description: Learn how a command bot works in Teams, and to add command and responses.
ms.topic: conceptual
ms.author: v-amprasad
ms.localizationpriority: high
---

# Command bot in Teams

Microsoft Teams allows you to automate simple and repetitive tasks in a conversation. You can build a command bot that can respond to simple commands sent in chats with Adaptive Cards. You can create a command bot template in Teams that responds to chat commands by displaying UI using an Adaptive Card. This enables users to send messages in Teams and your app can provide a response as required.

The command bot template is built using the TeamsFx SDK, which provides a simple set of functions over the Microsoft Bot Framework to implement the scenario. Command bot can be used in different scenarios such as checking ticket status, and retrieve help information.

:::image type="content" source="../../../assets/images/command-bot-teams/commandbot-flowchart1.png" alt-text="creating command bot app with adaptive card flow chart" lightbox="../../../assets/images/command-bot-teams/commandbot-flowchart1.png":::

**Advantages**

* Automates simple and repetitive tasks with a chat command.
* Simplifies programming model with TeamsFx SDK, built on Bot Framework SDK.
* Supports regular expressions for processing commands.

## Command bot installation

A command bot needs to be installed into a team, or a group chat, or as personal app, depending on the required scope. You need to select the installation target before adding the bot to your app.

:::image type="content" source="../../../assets/images/command-bot-teams/commandbot-installation.png" alt-text="installation option selection":::

For more install options, see [configure default install options](../../../concepts/deploy-and-publish/apps-publish-overview.md#configure-default-install-options).

## Command and response

The TeamsFx command and response bots are built using the Bot Framework SDK. The Bot Framework SDK provides built-in message handler to handle the incoming message activity, which requires you to understand the concept of Bot Framework such as the event-driven conversation model. TeamsFx SDK provides command-response abstraction layer to let the users focus on handling the command request according to the business need, without learning the Bot Framework SDK.

TeamsFx SDK pulls Bot Framework middleware to handle the integration with the underlying activity handlers. If the received message text matches the command pattern provided in a `TeamsFxBotCommandHandler` instance, the middleware handles the incoming message activity and invokes the corresponding `handlerCommandReceived` function. After this process, the middleware calls `context.sendActivity` to send the command response returned from the `handlerCommandReceived` function to the user.

## Customize initialization

You can initialize with your own adapter or customize after initialization.

```js(ts)

   // Create your own adapter
   const adapter = new BotFrameworkAdapter(...);

   // Customize your adapter, e.g., error handling
   adapter.onTurnError = ...

   const bot = new ConversationBot({
       // use your own adapter
       adapter: adapter;
       ...
   });

   // Or, customize later
   bot.adapter.onTurnError = ...

```

## Add command and response

You can perform the following steps to add command and responses:

<br>

<details>

<summary><b>1. Add a command definition in manifest</b></summary>

You can edit the manifest template file `templates\appPackage\manifest.template.json` to include:

* The command title that user types in the message compose area to trigger the command.
* The description for the command.

  :::image type="content" source="../../../assets/images/command-bot-teams/commandbot-add-command-definition.png" alt-text="add a command definition in manifest code sample" lightbox="../../../assets/images/command-bot-teams/commandbot-add-command-definition.png":::

<br>
</details>

<details>

<summary><b>2. Respond with an Adaptive Card</b></summary>

You can define your card in its JSON format to respond with an Adaptive Card. Following is a code sample to create a new file `src/adaptiveCards/doSomethingCommandResponse.json`:

  ```JSON
      {
             "type": "AdaptiveCard",    
             "body": [
                 {
                     "type": "TextBlock",
                     "size": "Medium",
                     "weight": "Bolder",
                     "text": "Your doSomething Command is added!"
                 },
           {
                     "type": "TextBlock",
                     "text": "Congratulations! Your hello world bot now includes a new DoSomething Command",
                     "wrap": true
           }
        ],
        "$schema": "http://adaptivecards.io/schemas/adaptive-card.json",
        "version": "1.4"
      }
  ```

You can use the [Adaptive Card Designer](https://adaptivecards.io/designer/) to help visually design your Adaptive Card UI.

* You can respond with plain text, or with an Adaptive Card.
* To send an Adaptive card with dynamic data, see this [section](#how-to-build-command-and-response-using-adaptive-card-with-dynamic-content).

<br>

</details>

<details>

<summary><b>3. Handle the command</b></summary>

TeamsFx SDK provides a convenient class `TeamsFxBotCommandHandler`, to handle when a command is triggered from Teams conversation message. Create a new file, `bot/src/doSomethingCommandHandler.ts`:

   ```TypeScript
                import { Activity, CardFactory, MessageFactory, TurnContext } from "botbuilder";
                import { CommandMessage, TeamsFxBotCommandHandler, TriggerPatterns, MessageBuilder, } from "@microsoft/teamsfx";
                import doSomethingCard  from "./adaptiveCards/doSomethingCommandResponse.json";
                import { AdaptiveCards } from "@microsoft/adaptivecards-tools";
                import { CardData } from "./cardModels";

                export class DoSomethingCommandHandler implements TeamsFxBotCommandHandler {
                    triggerPatterns: TriggerPatterns = "doSomething";

                    async handleCommandReceived(
                        context: TurnContext,
                        message: CommandMessage
                    ): Promise<string | Partial<Activity>> {
                        // verify the command arguments which are received from the client if needed.
                        console.log(`Bot received message: ${message.text}`);

                        const cardData: CardData = {
                          title: "doSomething command is added",
                          body: "Congratulations! You have responded to doSomething command",
                       };

                       const cardJson = AdaptiveCards.declare(doSomethingCard).render(cardData);
                       return MessageFactory.attachment(CardFactory.adaptiveCard(cardJson));
                 }    
              }

   ```

You can customize the command, including calling an API, processing data, or any other command    .

<br>

</details>

<details>

<summary><b>4. Register the new command</b></summary>

Open `bot\src\internal\initialize.ts` and update the call to `ConversationBot` constructor to include your newly added command handlers.

 ```TypeScript
       export const commandBot = new ConversationBot({
           // The bot id and password to create BotFrameworkAdapter.
           // See https://aka.ms/about-bot-adapter to learn more about adapters.
           adapterConfig: {
              appId: process.env.BOT_ID,
              appPassword: process.env.BOT_PASSWORD,
           },
           command: {
               enabled: true,
               commands: [ new HelloWorldCommandHandler(), new xxxCommandHandler() ],
           },
      });
 ```

Each new command needs to be configured in the `ConversationBot`, which initiates the conversational flow of the command bot template. In the `bot/src/internal/initialize.ts` file, update the commands array of the command property:

```TypeScript
      import { HelloWorldCommandHandler } from "../helloworldCommandHandler";
      import { DoSomethingCommandHandler } from "../doSomethingCommandHandler";
      import { ConversationBot } from "@microsoft/teamsfx";

      const commandBot = new ConversationBot({
          //...
          command: {
              enabled: true,
              commands: [ 
                  new HelloWorldCommandHandler(), 
                  new DoSomethingCommandHandler() ],
      },
   });
```

By completing the steps of adding a new command and response into your bot app, you can press F5 to debug locally with the command-response bot. Otherwise you can provision and deploy commands to deploy the change to Azure.
<br>

</details>

## Extend command bot with other bot scenarios

Command bot is compatible with other bot scenarios such as notification bot and workflow bot.

### Add notifications to your command bot

Notifications add the ability for your app to send Adaptive Cards in response to external events. You can follow the [Placeholder for notification bot steps] to add the notifications to your command bot. For more information on notification bot, see [Placeholder for notification bot in teams].

### Add workflow to your command bot

Adaptive Cards can be updated by user action to allow the user to progress through a series of cards that require their input. You can define the actions and use a bot to return an Adaptive Card in response to the user action. The actions can be linked into sequential workflows. You can follow the [steps to add the workflow card actions](workflow-bot-in-teams.md#add-card-actions) to your command bot. For more information on workflow bot, see [workflow bot in teams](workflow-bot-in-teams.md).

## Customize trigger pattern

The default pattern to trigger a command is through a defined keyword. You can also collect and process additional information retrieved from the trigger keyword. In addition to keyword match, you can also define your trigger pattern with [regular expressions](https://regex101.com/) and match against `message.text` with more controls.

You can find any capture group in `message.matches`, when using regular expressions. For example if user inputs `reboot myMachine`, `message.matches[1]`, it captures `myMachine`. The following example uses regular expression to capture strings after `reboot`:

```

   class HelloWorldCommandHandler {
     triggerPatterns = /^reboot (.*?)$/i; //"helloWorld";
     async handleCommandReceived(context, message) {
       console.log(`Bot received message: ${message.text}`);
       const machineName = message.matches[1];
       console.log(machineName);
       // Render your adaptive card for reply message
       const cardData = {
         title: "Your Hello World Bot is Running",
         body: "Congratulations! Your hello world bot is running. Click the button below to trigger an action.",
       };
       const cardJson = AdaptiveCards.declare(helloWorldCard).render(cardData);
       return MessageFactory.attachment(CardFactory.adaptiveCard(cardJson));
     }
   }

   module.exports = {
     HelloWorldCommandHandler,
   }

```

### How to build command and response using Adaptive card with dynamic content?

Adaptive Card provides [template language](/adaptive-cards/templating/) to allow users to use dynamic content with the same template. For example, you can use the Adaptive Card to provide a list of items such as to-do list, assigned bugs and other similar lists that can vary according to users. You can perform the following steps to build command and response using Adaptive Card with dynamic content:

1. Add your Adaptive Card template JSON file under `bot/adaptiveCards` folder.
1. Import the card template in your code file, where the command handler exists such as `myCommandHandler.ts`.
1. Model your card data.
1. Use `MessageBuilder.attachAdaptiveCard` in the template with dynamic card data.

You can also add new cards, if required for your application. For more information on how to build different types of Adaptive Cards with a list, or a table of dynamic contents using `ColumnSet`, and `FactSet`, see [sample](https://github.com/OfficeDev/TeamsFx-Samples/tree/ga/adaptive-card-notification).

### Access Microsoft Graph

If you're responding to a command that needs to access Microsoft Graph data of an already signed in Teams user, you can do so by single sign-on (SSO) with their Teams user token. Read more about how Teams Toolkit can help you to add [single sign-on to Teams app](../../../toolkit/add-single-sign-on.md).

### Connect to existing APIs

If you don't have the required SDK, and need to invoke external APIs in your code. The `Teams: Connect to an API` command in Microsoft Visual Studio Code Teams Toolkit extension, or `teamsfx add api-connection` command in TeamsFx CLI can be used to bootstrap code to call target APIs. For more information, see [connect to existing API](../../../toolkit/add-API-connection.md).

## FAQ

<br>

<details>

<summary><b>How to extend my command and response bot to support notification?</b></summary>

Perform the following steps to extend your notification bot to support command and response:

1. Open file `bot\src\internal\initialize.ts(js)`, update your `conversationBot` initialization to enable command and response:

   :::image type="content" source="../../../assets/images/command-bot-teams/commandbot-support-command-response.png" alt-text="extend command and response to support notification":::

1. Follow the [instructions](../../../sbs-gs-notificationbot.yml) to send notification to the bot installation target such as personal, or a group chat or channel. You can add the following sample code in `bot\src\index.ts(js)` to include a sample notification triggered by HTTP request:

   ```ts(js)
      server.post("/api/notification", async (req, res) => {
        for (const target of await commandBot.notification.installations()) {
          await target.sendMessage("This is a sample notification message");
        }

        res.json({});
      });
    
   ```

1. You need to uninstall your previous bot from Teams, and select F5 to start your application.

1. You can now send a notification to the bot installation targets such as personal, or  group chat, or channel to send HTTP POST request to the target URL `https://localhost:3978/api/notification`.

<br>

</details>

<details>

<summary><b>How to extend my command bot to support Adaptive Card actions?</b></summary>

For more information on how to add Adaptive Card actions to command bot, see [add card actions](workflow-bot-in-teams.md#add-card-actions).

<br>

</details>

## See Also

* [Conversation basics](conversation-basics.md)
* [Build bots for Teams](../../what-are-bots.md)
* [Build your first bot app using JavaScript](../../../sbs-gs-bot.yml)
* [Build command bot with JavaScript](../../../sbs-gs-commandbot.yml)
* [Proactive messages](send-proactive-messages.md)
* [Adaptive Cards](../../../task-modules-and-cards/cards/cards-reference.md#adaptive-card)
* [TeamsFx SDK](../../../toolkit/TeamsFx-SDK.md)
* [Bot Framework SDK](/azure/bot-service/bot-builder-basics)
* [Bot Framework middleware](/azure/bot-service/bot-builder-concept-middleware)
* [Bot activity handlers](../../bot-basics.md)
* [Event-driven conversations using an activity handler](/microsoftteams/platform/bots/bot-basics?branch=pr-en-us-7494&tabs=csharp#teams-activity-handlers)
