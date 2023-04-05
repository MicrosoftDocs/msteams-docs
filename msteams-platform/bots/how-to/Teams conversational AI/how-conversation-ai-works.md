---
title: Teams AI core capabilities
description: In this article, learn how to create an app using Teams conversational IA and it's capabilities.
ms.localizationpriority: medium
ms.topic: overview
ms.author: surbhigupta
---

# Teams AI core capabilities

This SDK is designed to help you build bots that can interact with Teams and Microsoft 365 apps. It is built on top of the Bot Framework SDK to make it easier to build Teams and M365-interacting bots.

The SDK also facilitates the creation of bots that uses an OpenAI API key to provide an AI-driven conversational experience, or the same using Azure Foundry.

To get started, Set up migration guide and start GPT setup guide

1. [Set up migration guide](https://github.com/microsoft/botbuilder-m365/blob/main/getting-started/00.MIGRATION.md)
1. [Start GPT setup guide](https://github.com/microsoft/botbuilder-m365/blob/main/getting-started/01.GPT-SETUP.md)

## Message-extension query

The Teams Conversational AI SDK offers bot developers a more intuitive approach to creating handlers for various message-extension query commands when compared to previous iterations of Teams Bot Framework SDK. The new SDK works alongside the existing Teams Bot Framework SDK and does not replace it.

The following is an example of how a bot developer can structure their code to handle a message-extension query for the "searchCmd" command.

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

The code is for a simple bot that can turn lights on or off. We present a more complex bot for management of lists a little bit later in this document. The Bot responds to the user's input with the action "[lights on]" to turn the lights-on. This scenario was markedly more challenging to address before the GPT Language Model.

This example illustrates how the SDK makes it possible to neatly manage the bot logic for handling an action – LightsOn/LightsOff and connect it to the prompt used with GPT:

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

With our SDK, the bot logic is simplified to merely providing handlers for actions such as addItem, removeItem, findItem, and so on. This clear delineation between actions and the prompts that instruct the AI on how to execute them is an incredibly potent tool.

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
