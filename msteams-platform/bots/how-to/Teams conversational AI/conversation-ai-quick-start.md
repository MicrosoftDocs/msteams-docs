---
title: Conversation AI quick start guide
author: surbhigupta
description:  In this module, learn how to quickly try the Teams conversational AI SDK.
ms.topic: conceptual
ms.localizationpriority: high
ms.author: v-ypalikila
ms.date: 04/07/2022
---

<!-- # Getting started

The Teams AI SDK simplifies the process of creating and powering bots with AI capabilities. It provides APIs to access and manipulate data, as well as a range of controls and components to create custom user interfaces. With the PredictionEngine (Open AI plugin), developers can easily add AI capabilities to their Teams applications.

## Pre-requisites

Before you get started, you must be familiar with the following steps:

1. [Set up migration guide](https://github.com/microsoft/botbuilder-m365/blob/main/getting-started/00.MIGRATION.md)
1. [Start GPT setup guide](https://github.com/microsoft/botbuilder-m365/blob/main/getting-started/01.GPT-SETUP.md)
1. [API-REFERENCE](https://github.com/microsoft/botbuilder-m365/blob/main/getting-started/02.API-REFERENCE.md)
1. [PROMPT-INJECTION](https://github.com/microsoft/botbuilder-m365/blob/main/getting-started/PROMPT-INJECTION.md)

This document is intended to help Teams developers to GPTify their bots and spark creativity.

1. Setup the SDK
1. Teams-ify: Pick your capabilities
1. Prompt engineering: Add AI instructions
1. Topic filters: Pick the subject(s)
1. Actions: Execute the right command(s)
1. Responsible AI: Ethical way to use GPT

## Setup the SDK

To get started, you must first create an application package. To do this, you'll need to use the App Studio tool in the Microsoft Teams app. This will allow you to create an application package that contains all the necessary files and scaffolding needed to run your app in Teams.

To get started import the AI SDK package into your source file. This will add SDK’s new Application class to your app and configure it with an OpenAI powered prediction engine and the state storage provider of your choice:

```javascript
import { Application, OpenAIPredictionEngine } from 'botbuilder-m365';
import { MemoryStorage } from 'botbuilder';
// Create OpenAI prediction engine
const predictionEngine = new OpenAIPredictionEngine({ 
// Configure your OpenAI API key 
configuration: { apiKey: process.env.OPENAI_API_KEY }, 
// Configure prompt & promptConfig 
// Configure topicFilter & topicFilterConfig
}); 
// Create storage provider used to persist state
const storage = new MemoryStorage();
 // Create application class
const app = new Application({ 
predictionEngine, 
storage
});
```

## Teams-ify: Pick your capabilities

Next step is to pick the capabilities needed. Developers will need to use the SDK to scaffold bot and adaptive card handlers to the source file.

**Card handler** – Add it to the cards folder in the source folder

```javascript
Import {Attachment, Cardfactory} from ‘botbuilder’;
export function yourfunctionname(): Attachment {
return Cardfactory.adaptivecard{
//code logic
}

```

**Bot handler** – Add it to the main activity manager file. Once you've configured your Open AI API, you need to create a Bot Activity Handler class. This class will contain all the logic for handling user requests and responding with the appropriate response.

```javascript
import { 
CloudAdapter, 
ConfigurationBotFrameworkAuthentication, ConfigurationBotFrameworkAuthenticationOptions, 
MemoryStorage, 
ActivityTypes } from 'botbuilder';

const adapter = new CloudAdapter(botFrameworkAuthentication);
```

## Prompt engineering: Add AI instructions

Prompts are pieces of text that can be used to create conversational experiences. They're used to start conversations, ask questions, and generate responses. They can be used to create natural language experiences for chatbots, virtual assistants, and other conversational user interfaces. The use of prompts can help reduce the complexity of creating conversational experiences and make them more engaging for the user.

The Teams AI SDK provides developers with access to OpenAI's machine learning capabilities through the PredictionEngine plugin. This is the default AI plugin that comes with the SDK, but developers can also create their own plugin or connector to use an alternative plugin.

Add the prompt details via the PredictionEngine initializer (refer step #1).

This is where you need to provide the right configuration to ensure bot responses are aligned with your business requirement.

* Model = Davinci003: This is the name of the LLM model for responses

* Temperature: This is how creative or deterministic the bot will be when responding

* Maximum Tokens: Bot response length supported.

* Top P: This is how many of the choice’s bot can remember and use when responding

* Frequency Penalty: This is a special rule that helps the bot avoid crafting responses that sound too similar to other it has made.

* Presence Penalty: This is another special rule that helps the bot avoid making responses that sound like earlier responses.

```javascript
//define the prompt
prompt: path.join(__dirname, '../src/prompt.txt'), 
promptConfig: { model: 'text-davinci-003', 
temperature: 0.0, 
max_tokens: 2048, 
top_p: 1, 
frequency_penalty: 0, 
presence_penalty: 0.6, 
stop: [' Human:', ' AI:'] }, 

```

Once the prompt initialized, you need to add the details in the prompt.txt to provide the functional outline for the bot. Using prompt.txt, bot understands which how it operates and what actions it can perform.
The following is a conversation with AI assistant.

The following actions are supported:

* CreateWI
* AssignWI
* UpdateWI
* TriageWI

All entities are required parameters to actions.

## Topic filters: Pick the subject(s)

The topic filter for the DevOps bot is an important feature that allows it to respond to specific topics, such as bugs or work items. By applying the topic filter, the bot can focus its attention on the topics that are most important to the user. This makes it easier for the user to find the information they need quickly and efficiently, as the app will not be distracted by topics that aren't relevant to their needs. Additionally, the topic filter helps to ensure that the bot provides accurate and up-to-date information by filtering out irrelevant topics.

Teams AI SDK offers topic filtering services via the PredictionEngine.

In step 3, the prompt was added to the PredictionEngine initializer. Now, the topic filter configuration details should also be added in the same way.

```javascript
//initialize the topic filter here
topicFilter: path.join(__dirname, '../src/topicFilter.txt'), 
topicFilterConfig: { 
model: 'text-davinci-003', 
temperature: 0.0, 
max_tokens: 128, 
top_p: 1, 
frequency_penalty: 0, 
presence_penalty: 0.0, 
stop: [' Human:', ' AI:'] 
}, });
```

Once the topic filter is initialized, you need to add details to the topicfilter.txt file. This will provide the bot with an outline of the conversation it should follow, including what topics it should respond to and what it should ignore.

AI can only respond to work item or bug related queries.
Bugs are a type of work item.
Humans can chat with AI for the following tasks.

* Greet the AI
* Ask for help
* Answer question asked by AI
* Ask AI to perform certain task it's capable of

Conversation History:

```javascript
// load the conversation history
{{conversation.history}}
```

Current message:

```javascript
//add the user query to the conversation
Human: {{activity.text}}
```

Think about the topic of this message. Is the human allowed to chat with the AI about this? Just answer yes or no.

## Actions: Execute the right command(s)

This is the place where everything comes together. In step #2 we defined in prompt that Dev bot can perform four actions of:

1. CreateWI
1. TriageWI
1. AssignWI
1. UpdateWI

These actions need to be registered in the source file. These actions are required for the bot to execute when AI finds an intent match from the user conversation, it needs to find the relevant action to be executed (refer #2 prompt on how the mapping is defined).  

The following is the code sample for actions in the main app handler:

```javascript
CreateWI {
generate_WI_title(conversation.history.title)
Generate_WI_desc(conversation.history.summary
Create_ticket()
}

//AssignWI {
Find_user(Conversation.history.suggesteduser)
Update_WI(WI#,find_user)

}

//UpdateWI(WI#) {
WI_update_action = find_update_field(conversation.history.updateaction)
Update_WI(WI#, WI_update_action)

//TriageWI {
WI_priority = find_WI_priority(conversation.history.newpriority)
Update_WI(WI#, WI_priority)
}
```
-->

# Get started with Teams conversational AI

The Teams AI SDK simplifies the process of creating and powering bots with AI capabilities. It provides APIs to access and manipulate data, as well as a range of controls and components to create custom user interfaces.

## Pick your capabilities

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

## Create AI Components

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

## Define storage and application

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

## Prompt

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

### Prompt actions

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

### Prompt Template

You can add functions to call a callback and return any kind of data you want.

* {{function}}:  Calls a registered function and inserts its value.​

* {{$input}}:  Inserts the message text.​

* {{$history}}: Inserts the conversation history.​

* {{$< scope >. < property >}}: Inserts state properties.

## Actions

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

### Register Action Handlers

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
