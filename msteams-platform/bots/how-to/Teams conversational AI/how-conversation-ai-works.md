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

## Capabilities

With the Teams Conversational AI SDK, building apps for Teams is drastically simpler, with rich natural language capabilities out of the box that brings any app experience into the conversation.

1. [Simple Teams-Centric Component Scaffolding](#simple-teams-centric-component-scaffolding)
1. [Natural Language Modeling](#natural-language-modeling)
1. [Prompt Engineering](#prompt-engineering)
1. [Topic Filtering](#topic-filtering)
1. [Predictive Engine for Mapping Intents to Actions](#predictive-engine-for-mapping-intents-to-actions)
1. [Conversational Session History](#conversational-session-history)
1. [Localization](#localization)
1. [LLM Modularity](#llm-modularity)
1. [Responsible AI](#responsible-ai)

### Simple Teams-Centric Component Scaffolding

The Conversational AI SDK simplifies the Teams app model to focus on the extension needed vs the protocol required. Previously, if a developer intended to build a message extension, they would need to learn primitive conversational protocols, that is , *member addition*, *channel creation*, and so on. With the new SDK, developers can leverage pre-built templates, and simply add their business logic to this scaffold. From there, you can easily add modules like bots, message extensions, Adaptive Cards, link unfurling, etc.  

### Natural Language Modeling

The Conversational AI SDK is built with GPT-powered language models from day zero, alleviating the need for developers to take on the complex and expensive task of writing this themselves. This makes building AI-powered Teams apps easier, more compliant, and consistently usable than ever before. Developers can focus on their own business logic and leave the AI-powered, Teams-centric language modeling to us.

This means bots can run in-context and immediately assist when they recognize a user intent map to one of their app actions, boosting the conversation without requiring users to explicitly talk to the bot using a small set of registered actions.

### Prompt Engineering

 With prompt engineering bots can be personalized, customized and tailor-made to meet user needs. For instance, if the user’s intent is identified as content generation, developers can add prompts like “style content as a meme generator with a persuasive & sarcastic tone”.

### Topic Filtering

Bots can channel focus to their own business logic with custom topic filters:

### Predictive Engine for Mapping Intents to Actions  

A simple interface for actions and predictions allows bots to react when they have high confidence for taking action. Ambient presence lets bots learn intent, use prompts based on business logic, and generate responses. For example, if a user has been out of office and needs to quickly summarize a thread, the SDK understands the intent as summarization, allows prompts to make summarizations over a period of time, potentially focused on the user’s manager, and provides actions to summarize chat content for users to consume.

### Conversational Session History

The Conversational AI SDK remembers context across messages, so an utterance for: “Retrieving the latest support tickets for Jane Doe” can be followed up with: “Now give me the latest activity on the first one” and the SDK returns the correct intents and entities for Jane Doe’s first ticket.

### Localization

Since the SDK is backed by GPT, localization is free out of the box. User utterances in any language are consistently translated to intents, entities, and resultant actions that apps understand, without the need to build and maintain localization records.

### LLM Modularity

Though the SDK is built to use Open AI’s GPT model, developers have the flexibility to swap in any large language model (LLM) of their choosing, without changing a line of bot logic.

### Responsible AI

Since the launch of ChatGPT, the internet is filled with examples of the dark side of AI. The SDK allows developers to create ethical and responsible conversational apps by:

* Moderation hooks, which can be used to regulate bot responses against any moderation API.
* Conversation sweeping, which helps developers monitor conversations and intervene when the conversation goes astray through proactive detection and remediation.
* Feedback loops, which allow developers to evaluate the performance of the bot for high quality conversations and fine-tune their experience for improvement.

In summary, the Conversational AI SDK offers wide support from low code to complex scenarios. The SDK extends capabilities with AI constructs to build natural language modeling, scenario-specific user intent, personalization, and automated, context-aware conversations.

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

The following is a conversation with an AI assistant. The assistant can manage lists and supports the following commands:

* DO <action> <optional entities>
* SAY <response>

The following actions are supported:

* addItem list="<list name>" item="<text>"
* removeItem list="<list name>" item="<text>"
* findItem list="<list name>" item="<text>"
* summarizeLists

All entities are required parameters to actions

Current list names:

```
{{conversation.listNames}}
```

Conversation history:

```
{{conversation.history}}
```

Current query:

```
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
