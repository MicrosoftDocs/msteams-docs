---
title: Teams AI library capabilities
description: In this article, learn more about Teams AI library capabilities, bot logic and message extension query.
ms.localizationpriority: medium
ms.topic: overview
ms.author: surbhigupta
---

# Teams AI library capabilities

Teams AI library supports JavaScript and is designed to simplify the process of building bots that can interact with Microsoft Teams, and facilitates the migration of existing bots. The AI library supports the migration of messaging capabilities, Message Extension (ME) capabilities and Adaptive Cards capabilities to the new format. It's also possible to upgrade existing Teams apps with these features.

Developers creating bots for Microsoft Teams were using the BotBuilder SDK directly. Teams AI library is designed to facilitate the construction of bots that can interact with Microsoft Teams. While one of the key features of this SDK is the AI support that customers can utilize, the initial objectives of the team may simply be to upgrade their current bot without AI. Once upgraded, the bot can connect to AI or LLM available in the SDK.

Teams AI library supports the following capabilities:

* Sending or Receiving Message.  

* Message Extension (ME) capabilities.  

* Adaptive Cards capabilities.

 You need to use the AI library to scaffold bot and adaptive card handlers to the source file.

In the following section, we'll explain each capability and their path to migration. We'll using the samples from the [AI library](https://github.com/microsoft/teams-ai/tree/main) to explain the method of migration.  

### Sending or receiving Message

Example: EchoBot

Replace `BotActivityHandler` and `ApplicationTurnState` with this `Application` and `DefaultTurnState`. `DefaultTurnState` is constructed to include `ConversationState`.

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

The `app.AdaptiveCards` handler is the handler for producing Adaptive Cards.

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

The Teams AI library offers bot developers a more intuitive approach to create handlers for various message-extension query commands when compared to previous iterations of Teams Bot Framework SDK. The new SDK works alongside the existing Teams Bot Framework SDK.

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

A simple interface for actions and predictions allows bots to react when they have high confidence for taking action. Ambient presence lets bots learn intent, use prompts based on business logic, and generate responses.

Thanks to our AI library, the prompt need only outline the actions supported by the bot, and supply a few-shot examples of how to employ those actions. We also use conversation-history to enable a more natural dialogue between the user and bot, such as *add cereal to groceries list*, followed by *also add coffee*, which should indicate that coffee is to be added to the groceries list.

All entities are required parameters to actions.

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

The bot logic is simplified to provide handlers for actions such as addItem, removeItem and , findItem. This clear delineation between actions and the prompts that instruct the AI on how to execute them is an incredibly potent tool.

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
