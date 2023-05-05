---
title: Teams AI core capabilities
description: In this article, learn how to create an app using Teams conversational IA and its capabilities.
ms.localizationpriority: medium
ms.topic: overview
ms.author: surbhigupta
---

# Get started with Teams conversational AI

The Teams AI SDK simplifies the process of creating and powering bots with AI capabilities. It provides APIs to access and manipulate data, as well as a range of controls and components to create custom user interfaces.

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

## Pick your capabilities

Next step is to pick the capabilities needed. You need to use the SDK to scaffold bot and adaptive card handlers to the source file.

Teams conversational AI Library supports JavaScript and is designed to simplify the process of building bots that can interact with Microsoft Teams, and facilitates the migration of existing bots. The SDK supports the migration of messaging capabilities, Message Extension (ME) capabilities and Adaptive Cards capabilities to the new format. It's also possible to upgrade existing Teams apps with these features.

Developers creating bots for Microsoft Teams were using the BotBuilder SDK directly. New AI SDK is designed to facilitate the construction of bots that can interact with Microsoft Teams. While one of the key features of this SDK is the AI support that customers can utilize, the initial objectives of the team may simply be to upgrade their current bot without AI. Once upgraded the bot can simply connect to AI/LLM available in the SDK.

The following app capabilities are supported by Teams conversational AI:

* Sending or Receiving Message – Migration supported.  

* Message Extension (ME) capabilities – Migration supported.  

* Adaptive Cards capabilities – Migration supported.

In the section below we'll explain in detail each of the capabilities and their path to migration. We'll using the samples from the AI SDK repo for explaining the method of migration.  

### Sending or receiving Message

Example: EchoBot

Replace BotActivityHandler and ApplicationTurnState with this Application and DefaultTurnState Note that here, DefaultTurnState is constructed to include ConversationState.

```javascript

// Assumption is that the bot/app is named “app” or “bot”
    import { Application, DefaultTurnState } from "botbuilder-m365";

interface ConversationState {

  count: number;

}

// DefaultTurnState: Conversation State, UserState, TurnState (or TempState)

type ApplicationTurnState = DefaultTurnState<ConversationState>;

// Previous:

// const bot = BotActivityHandler();

const app =

  new Application() <

  ApplicationTurnState >

  {

    storage 

  };

```

The rest of the code, including server.post and await app.run(context) stays the same.

## Message Extensions

The original ME sample will eventually be updated to M365messageExtensions.

In the previous Teams SDK format, developers needed to set up the Message Extensions query handler like:

Now, the app class has messageExtensions features to make creating the handler(s) simpler:

* `context` = TurnContext
* `state` = DefaultTurnState
* `query`= The data passed from ME interaction

```javascript
// Imported from earlier example

import { MessagingExtensionAttachment } from "botbuilder";

import { Application } from "botbuilder-m365";

// ME query Listener

app.messageExtensions.query("searchCmd", async (context, state, query) => {

  const searchQuery = query.parameters.queryText;

  // Other handling

  // For examples, Create search / action cards

  // Return results

  return {

    attachmentLayout: "", 

    attachments: results, 

    type: "result" 

  };

});

Similarly, selectItem listener would be set up as:

app.messageExtensions.selectItem(async (context, state, item) => {

  // Other handling

  // For example, Create search / action cards

  // item is the card/item the user selected

  return {

    //... 

  }

}
```

### Adaptive Cards capabilities

Similar to Message extensions example above, app.AdaptiveCards is the handler for producing Adaptive Cards.

```javascript
// Listener for messages from the user that trigger an adaptive card

app.message(/searchQuery/i, async (context, state) => {

  const attachment = createAdaptiveCard();

  await context.sendActivity({ attachments: [attachment] });

});

// Listener for action.submit on cards from the user

interface SubmitData {

  choiceSelect: string;

}

// Listen for submit actions from the user

app.adaptiveCards.actionSubmit("ChoiceSubmit", async (context, state, data: SubmitData) => {

  await context.sendActivity(`Submitted option is: ${data.choiceSelect}`);

});
```

## Core capabilities

### Message-extension query

The Teams Conversational AI SDK offers bot developers a more intuitive approach to create handlers for various message-extension query commands when compared to previous iterations of Teams Bot Framework SDK. The new SDK works alongside the existing Teams Bot Framework SDK.

The following is an example of how a bot developer can structure their code to handle a message-extension query for the `searchCmd` command.

```csharp
// Listen for search actions
app.messageExtensions.query('searchCmd', async (context, state, query) => {
    const searchQuery = query.parameters.queryText ?? '';
    const count = query.count ?? 10;
    const response = await axios.get(
        `http://registry.npmjs.com/-/v1/search?${new URLSearchParams({
            size: count.toString(),
            text: searchQuery
        }).toString()}`
    );


    // Format search results
    const results: MessagingExtensionAttachment[] = [];
    response?.data?.objects?.forEach((obj: any) => results.push(createNpmSearchResultCard(obj.package)));


    // Return results as a list
    return {
        attachmentLayout: 'list',
        attachments: results,
        type: 'result'
    };
});

And here’s how they can return a card when a message-extension result is selected.

// Listen for item tap
app.messageExtensions.selectItem(async (context, state, item) => {
    // Generate detailed result
    const card = createNpmPackageCard(item);


    // Return results
    return {
        attachmentLayout: 'list',
        attachments: [card],
        type: 'result'
    };
});

```

## Bot logic for handling an action

 The Bot responds to the user's input with the action `lights on` to turn the lights-on.

The following example illustrates how the SDK makes it possible to manage the bot logic for handling an action `LightsOn` or `LightsOff` and connect it to the prompt used with GPT:

```csharp
// Create prediction engine
const planner = new OpenAIPlanner({
    configuration: {
        apiKey: process.env.OPENAI_API_KEY
    },
    prompt: path.join(__dirname, '../src/prompt.txt'),
    promptConfig: {
        model: 'gpt-3.5-turbo',
        temperature: 0.7,
        max_tokens: 2048,
        top_p: 1,
        frequency_penalty: 0,
        presence_penalty: 0.6
    },
    logRequests: true
});


// Define storage and application
const storage = new MemoryStorage();
const app = new Application<ApplicationTurnState>({
    storage,
    planner
});


// Register action handlers
app.ai.action('LightsOn', async (context, state) => {
    state.conversation.value.lightsOn = true;
    await context.sendActivity(`[lights on]`);
    return true;
});


app.ai.action('LightsOff', async (context, state) => {
    state.conversation.value.lightsOn = false;
    await context.sendActivity(`[lights off]`);
    return true;
});


app.ai.action('Pause', async (context, state, data) => {
    const time = data.time ? parseInt(data.time) : 1000;
    await context.sendActivity(`[pausing for ${time / 1000} seconds]`);
    await new Promise((resolve) => setTimeout(resolve, time));
    return true;
});


app.ai.action('LightStatus', async (context, state) => {
    // Send the user a static response with the status of the lights.
    const response = responses.lightStatus(state.conversation.value.lightsOn);
    await context.sendActivity(response);


    // Since we might be prompting the user with a followup question, we need to do
    // some surgery on the {{conversation.history}} to append a THEN SAY command. This
    // lets the model know we just asked the user a question and it can predict the
    // next action based on their response.
    ConversationHistory.appendToLastLine(state, ` THEN SAY ${response}`);


    // End the current chain since we've manually just prompted the user for input.
    return false;
});


// Register a handler to handle unknown actions that might be predicted
app.ai.action(AI.UnknownActionName, async (context, state, data, action) => {
    await context.sendActivity(responses.unknownAction(action));
    return false;
});


// Register a handler to deal with a user asking something off topic
app.ai.action(AI.OffTopicActionName, async (context, state) => {
    await context.sendActivity(responses.offTopic());
    return false;
});

```

## Intents to actions

The most compelling example to prove the efficacy of the clean separation of intents to actions provided by our SDK is to analyze the source code for ListBot, which highlights how to construct a bot for list management, including the ability to add and remove items.

Thanks to our SDK, the prompt need only outline the actions supported by the bot, and supply a few-shot examples of how to employ those actions. We also use conversation-history to enable a more natural dialogue between the user and bot, such as "add cereal to groceries list", followed by "also add coffee", which should indicate that coffee is to be added to the groceries list.

All entities are required parameters to actions

Current list names:

```javascript
{{conversation.listNames}}
```

Conversation history:

```javascript
{{conversation.history}}
```

Current query:

```javascript
Human: {{activity.text}}
```

## AI

The bot logic is simplified to merely providing handlers for actions such as addItem, removeItem, findItem, and so on. This clear delineation between actions and the prompts that instruct the AI on how to execute them is an incredibly potent tool.

```csharp
app.ai.action('addItem', async (context, state, data: EntityData) => {
    const items = getItems(state, data.list);
    items.push(data.item);
    setItems(state, data.list, items);
    return true;
});


app.ai.action('removeItem', async (context, state, data: EntityData) => {
    const items = getItems(state, data.list);
    const index = items.indexOf(data.item);
    if (index >= 0) {
        items.splice(index, 1);
        setItems(state, data.list, items);
        return true;
    } else {
        await context.sendActivity(responses.itemNotFound(data.list, data.item));


        // End the current chain
        return false;
    }
});

app.ai.action('findItem', async (context, state, data: EntityData) => {
    const items = getItems(state, data.list);
    const index = items.indexOf(data.item);
    if (index >= 0) {
        await context.sendActivity(responses.itemFound(data.list, data.item));
    } else {
        await context.sendActivity(responses.itemNotFound(data.list, data.item));
    }


    // End the current chain
    return false;
});
```
