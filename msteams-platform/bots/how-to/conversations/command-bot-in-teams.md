---
title: Notification bot in Teams
author: surbhigupta
description: Learn how a command bot works in Teams, and to add command and responses.
ms.topic: conceptual
ms.author: v-amprasad
ms.localizationpriority: high
---

# Command bot in Teams

Microsoft Teams allows you to automate simple and repetitive tasks inside a conversation. You can build a command bot that can respond to simple commands sent in chats with adaptive cards. You can create a command bot template in Teams that responds to chat commands by displaying UI using an Adaptive Card. This enables users to type in simple messages in Teams and your application can provide a response based on the contents of the message as required.

The command bot template is built using the TeamsFx SDK, which provides a simple set of functions over the Microsoft Bot Framework to implement the scenario. You can build the command bot in different scenarios such as ...

[Placeholder for command bot infographic image]

**Advantages**
[Placeholder for advantages of command bot]

## Command bot installation

A command bot needs to be installed into a team, or a group chat, or as personal app, depending on the required scope. You need to select the installation target before adding the bot to your App.

:::image type="content" source="../../../assets/images/command-bot-teams/commandbot-installation.png" alt-text="installation option selection":::

> [!NOTE]
> For more install options, see [configure default install options](../../../concepts/deploy-and-publish/apps-publish-overview.md#configure-default-install-options)

## Command and response

The TeamsFx command and response bots are built using the [Bot Framework SDK](/azure/bot-service/bot-builder-basics). The Bot Framework SDK provides [built-in message handler](/microsoftteams/platform/bots/bot-basics?branch=pr-en-us-7494&tabs=csharp#teams-activity-handlers) to handle the incoming message activity, which requires you to understand the concept of Bot Framework such as the [event-driven conversation model](/azure/bot-service/bot-activity-handler-concept). TeamsFx SDK provides command-response abstraction layer to let the users focus on handling the command request according to the business requirement, without learning the Bot Framework SDK.

TeamsFx SDK pulls [Bot Framework middleware](/azure/bot-service/bot-builder-concept-middleware) to handle the integration with the underlying activity handlers. If the received message text matches the command pattern provided in a `TeamsFxBotCommandHandler` instance, the middleware handles the incoming message activity and invokes the corresponding `handlerCommandReceived` function. After this process, the middleware calls `context.sendActivity` to send the command response returned from the `handlerCommandReceived` function to the user.

## Customize initialization

You can initialize with your own adapter or customize after initialization.

```

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
* The command description for the command.

  :::image type="content" source="../../../assets/images/command-bot-teams/commandbot-add-command-definition.png" alt-text="add a command definition in manifest code sample":::

<br>
</details>

<details>

<summary><b>2. Respond with an Adaptive Card</b></summary>

You can build your response data in text format, or perform the following steps to use an Adaptive Card to apply rich content in Teams:

* Prepare your Adaptive Card content in a JSON file such as `myCard.json` under the `bot/adaptiveCards` folder. Following is a sample Adaptive Card with JSON payload:

  ```JASON
        {
            "type": "AdaptiveCard",
            "body": [
            {
                "type": "TextBlock",
                "size": "Medium",
                "weight": "Bolder",
                "text": "Your Hello World Bot is Running"
            },
            {
                "type": "TextBlock",
                "text": "Congratulations! Your hello world bot is running. Click the documentation below to learn more about Bots and the Teams Toolkit.",
                "wrap": true
            }
            ],
            "actions": [
            {
                "type": "Action.OpenUrl",
                "title": "Bot Framework Docs",
                "url": "https://docs.microsoft.com/en-us/azure/bot-service/?view=azure-bot-service-4.0"
            },
            {
                "type": "Action.OpenUrl",
                "title": "Teams Toolkit Docs",
                "url": "https://aka.ms/teamsfx-docs"
            }
            ],
            "$schema": "http://adaptivecards.io/schemas/adaptive-card.json",
            "version": "1.4"
        }
  ```

* Import your card content into your code file where your command handler exists: `import myCard from "./adaptiveCards/myCard.json"`.

* In your `handleCommandReceived` API, use `MessageBuilder.attachAdaptiveCardWithoutData` or `MessageBuilder.attachAdaptiveCard` to build a bot message activity with the Adaptive Card and return the message. `return MessageBuilder.attachAdaptiveCardWithoutData(myCard);`.

> [!NOTE]
> If you need to send an Adaptive Card with dynamic data, see [placeholder for link to the section in the doc].

<br>

</details>

<details>

<summary><b>3. Handle the command</b></summary>

To handle the command, perform the following steps:

1. Add a .ts/.js file such as `xxxCommandHandler.ts` under `bot/src` to handle your bot command, and include the following boilerplate code to get-started:

   ```
      import { Activity, TurnContext } from "botbuilder";
      import { CommandMessage, TeamsFxBotCommandHandler, TriggerPatterns } from "@microsoft/teamsfx";
      import { MessageBuilder } from "@microsoft/teamsfx";

      export class xxxCommandHandler implements TeamsFxBotCommandHandler {
          triggerPatterns: TriggerPatterns = "<string or RegExp pattern to trigger the command>";

          async handleCommandReceived(
             context: TurnContext,
             message: CommandMessage
          ): Promise<string | Partial<Activity>> {
             // verify the command arguments which are received from the client if needed.
             console.log(`Bot received message: ${message.text}`);

             // do something to process your command and return message activity as the response.
             // You can leverage `MessageBuilder` utilities from the `@microsoft/teamsfx` SDK 
             // to facilitate building message with cards supported in Teams.
         }    
       }

   ```

1. Provide the `triggerPatterns` that can trigger this command handler. Usually it's the command name defined in your manifest, or you can use RegExp to handle a complex command such as with some options in the command message.

1. Implement `handleCommandReceived` to handle the command and return a response that will be used to notify the end users.

   * If needed you can retrieve useful information for the conversation from the `context` parameter.

   * If needed parse command input:

     * `message.text`: the use input message
     * `message.matches`: the capture groups, if you use the RegExp for `triggerPatterns` to trigger the command.

<br>

</details>

<details>

<summary><b>4. Register the new command</b></summary>

Open `bot\src\internal\initialize.ts` and update the call to `ConversationBot` constructor to include your new added command handlers.

 ```
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

Additionally, you can use `registerCommand`, or `registerCommands` API from your `ConversationBot` instance to incrementally add your command(s) to a command bot.

```
    // register a single command
    commandBot.command.registerCommand(new xxxCommandHandler());

    // register a set of commands
    commandBot.command.registerCommands([
        new xxxCommandHandler(),
        new yyyCommandHandler()
    ]);
```

By completing the steps of adding a new command and response into your bot app, you can press F5 to local debug with the command-response bot. Otherwise use provision and deploy command to deploy the change to Azure.
