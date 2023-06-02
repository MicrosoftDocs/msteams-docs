---
title: Command bot in Teams
author: surbhigupta
description: Learn how a command bot works in Teams, and to add command and responses.
ms.topic: conceptual
ms.author: surbhigupta
ms.localizationpriority: high
---

# Command bot in Teams

Microsoft Teams allows you to automate simple and repetitive tasks in a conversation. You can build a command bot that can respond to simple commands sent in chats with Adaptive Cards. You can create a command bot template in Teams Toolkit that responds to chat commands by displaying UI using an Adaptive Card. This enables users to send messages in Teams and your app can provide a response as required.

The command bot template is built using the TeamsFx SDK, which provides a simple set of functions over the Microsoft Bot Framework to implement the scenario. Command bot can be used in different scenarios such as checking ticket status, and retrieve help information.

:::image type="content" source="../../../assets/images/command-bot-teams/commandbot-flowchart1.png" alt-text="Screenshot of creating command bot app with adaptive card flow chart." lightbox="../../../assets/images/command-bot-teams/commandbot-flowchart1.png":::

**Advantages**

* Automates simple and repetitive tasks with a chat command.
* Simplifies programming model with TeamsFx SDK, built on Bot Framework SDK.
* Supports regular expressions for processing commands.

## Command bot installation

A command bot needs to be installed into a team, or a group chat, or as personal app, depending on the required scope. You need to select the installation target before adding the bot to your app.

:::image type="content" source="../../../assets/images/command-bot-teams/commandbot-installation.png" alt-text="installation option selection":::

For more install options, see [configure default install options](../../../concepts/deploy-and-publish/apps-publish-overview.md#configure-default-install-options).
For uninstalling, see [remove an app from Teams](https://support.microsoft.com/en-us/office/remove-an-app-from-teams-0bc48d54-e572-463c-a7b7-71bfdc0e4a9d).

## Command and response

The TeamsFx command and response bots are built using the [Bot Framework SDK](/azure/bot-service/bot-builder-basics). The Bot Framework SDK provides [built-in message handler](../../bot-basics.md#teams-activity-handlers) to handle the incoming message activity, which requires you to understand the concept of Bot Framework such as the [event-driven conversation model](/azure/bot-service/bot-activity-handler-concept). TeamsFx SDK provides command-response abstraction layer to let the users focus on handling the command request according to the business need, without learning the Bot Framework SDK.

TeamsFx SDK pulls [Bot Framework middleware](/azure/bot-service/bot-builder-concept-middleware) to handle the integration with the underlying activity handlers. If the received message text matches the command pattern provided in a `TeamsFxBotCommandHandler` instance, the middleware handles the incoming message activity and invokes the corresponding `handlerCommandReceived` function. After this process, the middleware calls `context.sendActivity` to send the command response returned from the `handlerCommandReceived` function to the user.

## Customize initialization

You need to create `ConversationBot` to respond to the command in chat. You can initialize with your own adapter or customize after initialization.

# [JavaScript/TypeScript](#tab/jsts1)

```js(ts)

/** JavaScript/TypeScript: src/internal/initialize.js(ts) **/
const commandApp = new ConversationBot({
  // The bot id and password to create CloudAdapter.
  // See https://aka.ms/about-bot-adapter to learn more about adapters.
  adapterConfig: {
    MicrosoftAppId: config.botId,
    MicrosoftAppPassword: config.botPassword,
    MicrosoftAppType: "MultiTenant",
  },
  command: {
    enabled: true,
    commands: [new HelloWorldCommandHandler()],
  },
});

```

# [C#](#tab/csharp1)

```csharp

builder.Services.AddSingleton<HelloWorldCommandHandler>();
builder.Services.AddSingleton(sp =>
{
    var options = new ConversationOptions()
    {
        Adapter = sp.GetService<CloudAdapter>(),
        Command = new CommandOptions()
        {
            Commands = new List<ITeamsCommandHandler> { sp.GetService<HelloWorldCommandHandler>() }
        }
    };

    return new ConversationBot(options);
});

```

---

## Customize adapter

```Typescript

// Create your own adapter
const adapter = new CloudAdapter(...);

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

You can edit the manifest template file `appPackage\manifest.json` to include the `doSomething` command with its title and description in the `commands` array:

```JSON
"commandLists": [
  {
    "commands": [
        {
            "title": "helloWorld",
            "description": "A helloworld command to send a welcome message"
        },
        {
            "title": "doSomething",
            "description": "A sample do something command"
        }
    ]
  }
]
```

<br>
</details>

<details>

<summary><b>2. Respond with an Adaptive Card</b></summary>

You can define your card in its JSON format to respond with an Adaptive Card. Following is a code sample to create a new file:

* For JavaScript/TypeScript: `src/adaptiveCards/doSomethingCommandResponse.json`
* For .NET: `Resources/DoSomethingCommandResponse.json`

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

Respond with plain text, or with an Adaptive Card. You can use the [Adaptive Card Designer](https://adaptivecards.io/designer/) to help visually design your Adaptive Card UI. For more information on how to send an Adaptive card with dynamic data, see [build command and response using Adaptive card](#how-to-build-command-and-response-using-adaptive-card-with-dynamic-content).

<br>

</details>

<details>

<summary><b>3. Handle the command</b></summary>

TeamsFx SDK provides a convenient class `TeamsFxBotCommandHandler`, to handle when a command is triggered from Teams conversation message. Create a new file, `src/doSomethingCommandHandler.js(ts)`:

# [JavaScript](#tab/js)

```javascript
const doSomethingCard = require("./adaptiveCards/doSomethingCommandResponse.json");
const { AdaptiveCards } = require("@microsoft/adaptivecards-tools");
const { CardFactory, MessageFactory } = require("botbuilder");

class DoSomethingCommandHandler {
  triggerPatterns = "doSomething";

  async handleCommandReceived(context, message) {
    // verify the command arguments which are received from the client if needed.
    console.log(`App received message: ${message.text}`);

    const cardData = {
      title: "doSomething command is added",
      body: "Congratulations! You have responded to doSomething command",
    };

    const cardJson = AdaptiveCards.declare(doSomethingCard).render(cardData);
    return MessageFactory.attachment(CardFactory.adaptiveCard(cardJson));
  }
}

module.exports = {
  DoSomethingCommandHandler,
};

```

# [TypeScript/](#tab/ts)

 ```TypeScript
/** TypeScript **/
import { Activity, CardFactory, MessageFactory, TurnContext } from "botbuilder";
import {
  CommandMessage,
  TeamsFxBotCommandHandler,
  TriggerPatterns,
  MessageBuilder,
} from "@microsoft/teamsfx";
import doSomethingCard from "./adaptiveCards/doSomethingCommandResponse.json";
import { AdaptiveCards } from "@microsoft/adaptivecards-tools";
import { CardData } from "./cardModels";

export class DoSomethingCommandHandler implements TeamsFxBotCommandHandler {
  triggerPatterns: TriggerPatterns = "doSomething";

  async handleCommandReceived(
    context: TurnContext,
    message: CommandMessage
  ): Promise<string | Partial<Activity>> {
    // verify the command arguments which are received from the client if needed.
    console.log(`App received message: ${message.text}`);

    const cardData: CardData = {
      title: "doSomething command is added",
      body: "Congratulations! You have responded to doSomething command",
    };

    const cardJson = AdaptiveCards.declare(doSomethingCard).render(cardData);
    return MessageFactory.attachment(CardFactory.adaptiveCard(cardJson));
  }
}

```

# [C#](#tab/csharp2)

The TeamsFx .NET SDK provides an interface `ITeamsCommandHandler` for command handler to handle when a command is triggered from Teams conversation message. Create a new file `Commands/DoSomethingCommandHandler.cs`:

```csharp
using MyCommandApp.Models;
using AdaptiveCards.Templating;
using Microsoft.Bot.Builder;
using Microsoft.Bot.Schema;
using Microsoft.TeamsFx.Conversation;
using Newtonsoft.Json;

namespace MyCommandApp.Commands
{
    public class DoSomethingCommandHandler : ITeamsCommandHandler
    {
        private readonly ILogger<HelloWorldCommandHandler> _logger;
        private readonly string _adaptiveCardFilePath = Path.Combine(".", "Resources", "DoSomethingCommandResponse.json");

        public IEnumerable<ITriggerPattern> TriggerPatterns => new List<ITriggerPattern>
        {
            new RegExpTrigger("doSomething")
        };

        public HelloWorldCommandHandler(ILogger<HelloWorldCommandHandler> logger)
        {
            _logger = logger;
        }

        public async Task<ICommandResponse> HandleCommandAsync(ITurnContext turnContext, CommandMessage message, CancellationToken cancellationToken = default)
        {
            _logger?.LogInformation($"App received message: {message.Text}");

            // Read adaptive card template
            var cardTemplate = await File.ReadAllTextAsync(_adaptiveCardFilePath, cancellationToken);

            // Render adaptive card content
            var cardContent = new AdaptiveCardTemplate(cardTemplate).Expand
            (
                new HelloWorldModel
                {
                    title: "doSomething command is added",
                    body: "Congratulations! You have responded to doSomething command",
                }
            );

            // Build attachment
            var activity = MessageFactory.Attachment
            (
                new Attachment
                {
                    ContentType = "application/vnd.microsoft.card.adaptive",
                    Content = JsonConvert.DeserializeObject(cardContent),
                }
            );

            // send response
            return new ActivityCommandResponse(activity);
        }
    }
}

```

---
You can customize the command, including calling an API, processing data, or any other command    .
<br>

</details>

<details>

<summary><b>4. Register the new command</b></summary>

Each new command needs to be configured in the `ConversationBot`, which initiates the conversational flow of the command bot template. In the `src/internal/initialize.ts` file, update the commands array of the command property:

# [JavaScript/TypeScript](#tab/jsts2)

```TypeScript
/** Update ConversationBot  in src/internal/initialize.js(ts) **/
const commandApp = new ConversationBot({
  //...
  command: {
    enabled: true,
    commands: [ 
      new HelloWorldCommandHandler(),
      new DoSomethingCommandHandler()], // newly added command handler
  },
});
```

# [C#](#tab/csharp3)

```csharp
/** Update ConversationBot in Program.cs **/
builder.Services.AddSingleton<HelloWorldCommandHandler>();
builder.Services.AddSingleton<DoSomethingCommandHandler>(); // Add doSomething command handler to serrvice container
builder.Services.AddSingleton(sp =>
{
    var options = new ConversationOptions()
    {
        Adapter = sp.GetService<CloudAdapter>(),
        Command = new CommandOptions()
        {
            Commands = new List<ITeamsCommandHandler>
            { 
                sp.GetService<HelloWorldCommandHandler>(),
                sp.GetService<DoSomethingCommandHandler>(),  // Register doSomething command handler to ConversationBot
            }
        }
    };

    return new ConversationBot(options);
});
```

---

By completing the steps of adding a new command and response into your bot app, you can press F5 to debug locally with the command-response bot. Otherwise you can provision and deploy commands to deploy the change to Azure.
<br>

</details>

## Customize trigger pattern

The default pattern to trigger a command is through a defined keyword. You can also collect and process additional information retrieved from the trigger keyword. In addition to keyword match, you can also define your trigger pattern with [regular expressions](https://regex101.com/) and match against `message.text` with more controls.

You can find any capture group in `message.matches`, when using regular expressions. For example if user inputs `reboot myMachine`, `message.matches[1]`, it captures `myMachine`. The following example uses regular expression to capture strings after `reboot`:

```

class HelloWorldCommandHandler {
  triggerPatterns = /^reboot (.*?)$/i; //"reboot myDevMachine";
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

```

### How to build command and response using Adaptive card with dynamic content?

Adaptive Card provides [template language](/adaptive-cards/templating/) to allow users to use dynamic content with the same template. For example, you can use the Adaptive Card to provide a list of items such as to-do list, assigned bugs and other similar lists that can vary according to users. You can perform the following steps to build command and response using Adaptive Card with dynamic content:

1. Add your Adaptive Card template JSON file under `bot/adaptiveCards` folder.
1. Import the card template in your code file, where the command handler exists such as `myCommandHandler.ts`.
1. Model your card data.
1. Use `MessageBuilder.attachAdaptiveCard` in the template with dynamic card data.

You can also add new cards for your application if necessary. For more information on how to build different types of Adaptive Cards with a list, or a table of dynamic contents using `ColumnSet`, and `FactSet`, see [sample](https://github.com/OfficeDev/TeamsFx-Samples/tree/ga/adaptive-card-notification).

### Access Microsoft Graph

If you're responding to a command that needs to access Microsoft Graph data of an already signed in Teams user, you can do so by single sign-on (SSO) with their Teams user token. Read more about how Teams Toolkit can help you to add [single sign-on to Teams app](../../../toolkit/add-single-sign-on.md).

### Connect to existing APIs

If you don't have the required SDK, and need to invoke external APIs in your code. The **Teams: Connect to an API** command in Microsoft Visual Studio Code Teams Toolkit extension, or **teamsfx add api-connection** command in TeamsFx CLI can be used to bootstrap code to call target APIs. For more information, see [configure API connection](../../../toolkit/add-API-connection.md#).

## FAQ

<br>

<details>

<summary><b>How to extend my command and response to support notifications?</b></summary>

1. Go to `bot\src\internal\initialize.ts(js)` and update your `conversationBot` initialization to enable notification feature:

:::image type="content" source="../../../assets/images/command-bot-teams/notification-enable.png" alt-text="Conversation bot initialization to enable notification feature." lightbox="../../../assets/images/command-bot-teams/notification-enable.png":::

2. Follow the [instructions](notification-bot-in-teams.md) to send notification to the bot installation target (channel/group chat/personal chat). You can add the following sample code in `bot\src\index.ts(js)` to add a sample notification triggered by an HTTP request:

```js
server.post("/api/notification", async (req, res) => {
  for (const target of await commandBot.notification.installations()) {
    await target.sendMessage("This is a sample notification message");
  }

  res.json({});
});

```

3. Uninstall your previous bot installation from Teams, and re-run local debug to test your bot notification.
4. Send a notification to the bot installation targets (channel/group chat/personal chat) by using an HTTP POST request with target URL `<https://localhost:3978/api/notification>`.

For more information about notification feature such as send notification with adaptive card and add more triggers, see [Notification bot in Teams](notification-bot-in-teams.md).

<br>

</details>

<details>

<summary><b>How to extend my command bot by adding workflow bot Adaptive Card actions?</b></summary>

The Adaptive Card action handler feature enables the app to respond to adaptive card actions that triggered by end users to complete a sequential workflow. An Adaptive Card provides one or more buttons in the card to ask for user's input such as calling some APIs. The Adaptive Card then send another Adaptive Card in conversation to response to the card action.

For more information on how to add adaptive card actions to command bot, see [Workflow bot in Teams](workflow-bot-in-teams.md).

<br>

</details>

## Step-by-step guide

Follow the [step-by-step](../../../sbs-gs-commandbot.yml) guide to build Teams Command bot.

## See also

* [Conversation basics](conversation-basics.md)
* [Build bots for Teams](../../what-are-bots.md)
* [Build your first bot app using JavaScript](../../../sbs-gs-bot.yml)
* [Proactive messages](send-proactive-messages.md)
* [Adaptive Cards](../../../task-modules-and-cards/cards/cards-reference.md#adaptive-card)
* [TeamsFx SDK](../../../toolkit/TeamsFx-SDK.md)
* [Bot Framework SDK](/azure/bot-service/bot-builder-basics)
* [Bot Framework middleware](/azure/bot-service/bot-builder-concept-middleware)
* [Bot activity handlers](../../bot-basics.md)
* [Event-driven conversations using an activity handler](/microsoftteams/platform/bots/bot-basics?branch=pr-en-us-7494&tabs=csharp#teams-activity-handlers)
