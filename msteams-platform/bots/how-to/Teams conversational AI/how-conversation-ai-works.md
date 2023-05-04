---
title: Teams AI core capabilities
description: In this article, learn how to create an app using Teams conversational IA and it's capabilities.
ms.localizationpriority: medium
ms.topic: overview
ms.author: surbhigupta
---

# Teams AI core capabilities

This SDK is designed to help you build bots that can interact with Teams and Microsoft 365 apps. It is built on top of the Bot Framework SDK to make it easier to build Teams and Microsoft 365-interacting bots.

The SDK also facilitates the creation of bots that uses an OpenAI API key to provide an AI-driven conversational experience, or the same using Azure Foundry.

## Message-extension query

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

Overview  
The Conversational AI SDK is a powerful tool for developers to leverage natural language processing and create rich conversational apps for Microsoft Teams. This SDK supports JavaScript for //Build 2023 and will include C# support by Ignite 2023. It is designed to simplify the process of building bots that can interact with Microsoft Teams, and facilitates the migration of existing bots. The SDK supports the migration of messaging capabilities, Message Extension (ME) capabilities and Adaptive Cards capabilities to the new format. It is also possible to upgrade existing Teams apps with these features.

Leverage the Conversational AI SDK to interface with LLMs, facilitate natural language processing, and map to your app’s skills. Those same skills will function in Business Chat.  

Developers CTA via SDK:

New rich conversational app: Use SDK to interface with LLM with simplified access to Teams capabilities.

Criteria: JavaScript/TypeScript
Conversational Capabilities: Bots, ME, AC  
  
Upgrade your existing Teams app  - This is a bit more nuanced. We will review each capability in the sections below and find the associated method required for upgrading.  

` Developers creating bots for Microsoft Teams were using the BotBuilder SDK directly. New AI SDK is designed to facilitate the construction of bots that can interact with Microsoft Teams. While one of the key features of this SDK is the AI support that customers can utilize, the initial objectives of the team may simply be to upgrade their current bot without AI. Once upgraded the bot can simply connect to AI/LLM available in the SDK.

These instructions are applicable to both non-AI and AI bot migration.

Teams’ apps capabilities which the bot may be using:

Sending/Receiving Message – Migration supported.  

Message Extension (ME) capabilities – Migration supported.  

Adaptive Cards capabilities – Migration supported.

Dialogue management - Migration not supported.

In the section below we will explain in detail each of the capabilities and their path to migration. We will using the samples from the AI SDK repo for explaining the method of migration.  

Sending/Receiving Message
Example : EchoBot
Replace BotActivityHandler and ApplicationTurnState with this Application and DefaultTurnState Note that here, DefaultTurnState is constructed to include ConversationState.

Line 72 shows use of 'Application' class

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

The rest of the code, including server.post and await app.run(context) stays the same.

That's it!

Run your bot (with ngrok) and sideload your manifest to test.

Shape

Message Extensions

The original ME sample will eventually be updated to M365messageExtensions

In the previous Teams SDK format, developers needed to set up the Message Extensions query handler like so:

Previous Message Extension query setup (The rest of the handler continues)

Now, the app class has messageExtensions features to make creating the handler(s) simpler.  
Context is TurnContext and state is DefaultTurnState passed in from the bot.  
The third parameter, in this case query, is the data passed from ME interaction.

// Imported from earlier example

import { MessagingExtensionAttachment } from "botbuilder";

import { Application } from "botbuilder-m365";

// ME query Listener

app.messageExtensions.query("searchCmd", async (context, state, query) => {

  const searchQuery = query.parameters.queryText;

  // Other handling

  // e.g. Create search / action cards

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

  // e.g. Create search / action cards

  // item is the card/item the user selected

  return {

    //... 

  }

}

 Adaptive Cards capabilities

Similar to Message extensions example above, app.AdaptiveCards is the handler for producing Adaptive Cards.

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

Dialogue management system  

Developer using dialogue management system will not be able to upgrade existing SDK to new SDK. If needed, we can review and offer support on case by case basis. We are actively working on supporting these however, direct migration will not be supported by //Build.  
Details of dialogue management system: Reference
