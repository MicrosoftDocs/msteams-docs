---
title: Conversation AI quick start guide
author: surbhigupta
description:  In this module, learn how to quickly try the Teams conversational AI SDK.
ms.topic: conceptual
ms.localizationpriority: high
ms.author: v-ypalikila
ms.date: 04/07/2022
---

# Conversation AI quick start guide

Get started with Teams conversation AI SDK using the SantaBot sample. It's designed to quickly run a Teams conversation AI SDK based Santa bot sample on your computer's localhost.

## Set up your development environment

To get started, install:

* Microsoft Teams is installed and you have an account.
* NodeJS (version 16.x).
* ngrok or equivalent tunnelling solution.
* OpenAI key for leveraging GPT.

## Build and run the santaBot sample app

1. Go to the [sample](https://github.com/microsoft/botbuilder-m365/tree/main/js/samples/04.ai.a.naturalLanguage.santaBot).

1. Clone the repository to test the sample app.

   ```bash
   git clone <https://github.com/Microsoft/botbuilder-m365.git>
   ```

1. Run the following command to go to the botbuilder-m365 app folder:

   ```bash
   cd botbuilder-m365/js
   ```

1. Run the following command to install the dependency package:

   ```bash
   yarn install
   ```

1. Run the following command to build the package:

   ```bash
   yarn build
   ```

   > [!NOTE]
   > If you already ran `yarn install` and `yarn build` in the `js` folder, you are ready to get started with ngrok. Otherwise, you need to run `yarn install` and `yarn build` in the js folder.

1. Run the following command to go to the santaBot app folder:

   ```bash
   cd samples/js/samples/04.ai.naturalLanguage.santaBot
   ```

1. Run ngrok tunneling service and point to port 3978.

   ```bash
   ngrok http --host-header=rewrite 3978
   ```

1. Create [Bot Framework registration](/azure/bot-service/bot-service-quickstart-registration) resource in Azure.
   1. Use the current https URL you were given by running ngrok. Append with the path /api/messages used by this sample.
   1. Ensure that you've enabled the Teams Channel
   1. If you don't have an Azure account you can use this Bot Framework registration.

1. Update the .env configuration for the bot to use the Microsoft App Id and App Password from the Bot Framework registration.

   > [!NOTE]
   >
   > * The App Password is referred to as the **client secret** in the azure portal and you can always create a new client secret anytime.

   ```text
    MicrosoftAppId=<your bot's ID>
    MicrosoftAppPassword=<your bot's secret>
    OPENAI_API_KEY=<your OpenAI key>
   ```

1. Go to manifest.json in cloned repository.

1. Open manifest.json in Visual Studio and set `YOUR-MICROSOFT-APP-OR-BOT-ID` to Microsoft App ID.

1. Create a .zip file with the following files that are present in the Manifest folder:
   * manifest.json
   * icon-outline.png
   * icon-color.png

1. Run the following command to start the dependency package:

   ```bash
   yarn start
   ```

1. Sideload the app manifest .zip file in Teams and add the app to your meeting.
1. Invoke the bot using @ mention in Teams chat and talk to it in plain language.

   The bot uses the text-davinci-003 model to chat with Teams users and respond in a polite and respectful manner, staying within the scope of the conversation.

## Get started with Teams conversational AI

The Teams AI SDK simplifies the process of creating and powering bots with AI capabilities. It provides APIs to access and manipulate data, as well as a range of controls and components to create custom user interfaces.

### Pick your capabilities

Next step is to pick the capabilities needed. You need to use the SDK to scaffold bot and adaptive card handlers to the source file.

**Bot handler**: Add it to the main activity manager file. Once you've configured your Open AI API, you need to create a Bot Activity Handler class. This class will contain all the logic for handling user requests and responding with the appropriate response.

```javascript
import { 
CloudAdapter, 
ConfigurationBotFrameworkAuthentication, ConfigurationBotFrameworkAuthenticationOptions, 
MemoryStorage, 
ActivityTypes } from 'botbuilder';

const adapter = new CloudAdapter(botFrameworkAuthentication);
```

### Create AI Components

You can take your existing or a new bot framework app and add AI capabilities.

**Planner**: Open AI planner is the main component that calls the LLM Open AI or Azure Open AI.

**Prompt manager**: The prompt manager manages prompt creation. It calls functions and injects  from your code into the prompt. It can copy conversation state user state into the prompt for you automatically.

**Moderator**: A moderator adds safety moderation to the bots input and output. allows you to look at what the user is trying to say to the model, and you can flag prompt injection techniques, review what's coming out of the LLM and run it through a business logic for filtering and ensure that the bot's not saying things that you don't want it to say. You can either moderate the input or the output, or both. Open AI moderator is the default moderator.

```javascript
// Create AI components
const planner = new OpenAIPlanner({
    apiKey: process.env.OpenAIKey!,
    defaultModel: 'text-davinci-003',
    logRequests: true
});
const moderator = new OpenAIModerator({
    apiKey: process.env.OpenAIKey!,
    moderate: 'both'
});
// You can also modify this to out the `chatGPT` prompt.
const promptManager = new DefaultPromptManager(path.join(__dirname, '../src/prompts/chat'));

```

### Define storage and application

The application object automatically manages the conversation and user state of your bot.

* Storage: Create a storage provider to store conversation and user state for your bot. The `MemoryStorage()` function stores all the state for your bot.
* Application: The application class replaces the ActivityHandler class in a typical BotFramework bot. You can configure your ai by adding the planner, moderator, prompt manager, default prompt and history.

```javascript
// Define storage and application
const storage = new MemoryStorage();
const app = new Application<ApplicationTurnState>({
    storage,
    ai: {
        planner,
        moderator,
        promptManager,
        prompt: 'skprompt',
        history: {
            assistantHistoryType: 'text'
        }
    }
});
```

### Prompt

Prompts are pieces of text that can be used to create conversational experiences. They're used to start conversations, ask questions, and generate responses. They can be used to create natural language experiences for chatbots, virtual assistants, and other conversational user interfaces. The use of prompts can help reduce the complexity of creating conversational experiences and make them more engaging for the user.

Create a folder called prompts, and define your prompts in the folder.

* skprompt.txt: Define all your text prompts. Contains the prompts text and supports template variables and functions.
  
* config.json: Provide the right configuration to ensure bot responses are aligned with your business requirement. Configure `max_tokens`, `temperature`, and other properties to pass into open AI or Azure AI. Contains the prompts model settings.

   ```json
   {
    "schema": 1,
    "description": "Chat with Santa Clause",
    "type": "completion",
    "completion": {
      "max_tokens": 150,
      "temperature": 0.9,
      "top_p": 0.0,
      "presence_penalty": 0.6,
      "frequency_penalty": 0.0,
      "stop_sequences": [
        "Human:",
        "AI:"
      ]
    }
   }
   ```

#### Prompt actions

Plans let the model perform actions or say things to the user. You can create a schema of the plan and add a list of actions that you support. It can perform an action and pass arguments. GPT can  figure out what actions it wants to use and then extract all the entities and pass those in as arguments to the action call.

```text
    The following is a conversation with an AI assistant. 
    The AI is Santa Clause and the Human is a child meeting Santa for the first time. 
    The AI should always reply the way Santa would. 
    The AI should always greet the human the way Santa would, ask them their name, and then what they would like for Christmas.
    
    {{$history}}
    Human: {{$input}}
    AI:
  ```

#### Prompt Template

You can add functions to call a callback and return any kind of data you want.

* {{function}}:  Calls a registered function and inserts its value.​

* {{$input}}:  Inserts the message text.​

* {{$history}}: Inserts the conversation history.​

* {{$< scope >. < property >}}: Inserts state properties.

### Actions

Actions handle events triggered by AI components.

`FlaggedInputAction` and `FlaggedOutputAction` are the built-in action handlers to handle the moderator flags. If the moderator flags an incoming message input, the moderator redirects to the `FlaggedInputAction` handler and `context.sendActivity` sends a message to the user about the flag.

```javascript
app.ai.action(AI.FlaggedInputActionName, async (context: TurnContext, state: TurnState, data: TData) => {
    await context.sendActivity(`I'm sorry your message was flagged: ${JSON.stringify(data)}`);
    return false;
});

app.ai.action(AI.FlaggedOutputActionName, async (context: TurnContext, state: ApplicationTurnState, data: TData) => {
    await context.sendActivity(`I'm not allowed to talk about such things.`);
    return false;
});
```

#### Register Action Handlers

Action handlers help users achieve the goals which is shared in the user intents.

One of the key aspects in action handlers is that you must first register the actions in the prompts and then help user achieve the goal.

You must register a handler for each action listed in the prompt and also add a handler to deal with unknown actions.

In the following example of a light bot, we have the `LightsOn`, `LightsOff` and `Pause`  action. Every time an action is called, you return true or false. ​Returning false from a handler prevents the planner from running additional DO or SAY commands. When the bot receives an unknown action, we're telling the bot to terminate the action.

```javascript
// Register action handlers
app.ai.action('LightsOn', async (context: TurnContext, state: ApplicationTurnState) => {
    state.conversation.value.lightsOn = true;
    await context.sendActivity(`[lights on]`);
    return true;
});

app.ai.action('LightsOff', async (context: TurnContext, state: ApplicationTurnState) => {
    state.conversation.value.lightsOn = false;
    await context.sendActivity(`[lights off]`);
    return true;
});

app.ai.action('Pause', async (context: TurnContext, state: ApplicationTurnState, data: TData) => {
    const time = data.time ? parseInt(data.time) : 1000;
    await context.sendActivity(`[pausing for ${time / 1000} seconds]`);
    await new Promise((resolve) => setTimeout(resolve, time));
    return true;
});

// Register a handler to handle unknown actions that might be predicted
app.ai.action(
    AI.UnknownActionName,
    async (context: TurnContext, state: ApplicationTurnState, data: TData, action: string | undefined) => {
        await context.sendActivity(responses.unknownAction(action || 'unknown'));
        return false;
    }
);
```
