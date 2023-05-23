---
title: Teams AI library capabilities
description: In this article, learn more about Teams AI library capabilities, bot logic and message extension query.
ms.localizationpriority: medium
ms.topic: overview
ms.author: surbhigupta
---

# Teams AI library capabilities

> [!NOTE]
>
> Teams AI library is available only in [public developer preview](~/resources/dev-preview/developer-preview-intro.md).

Teams AI library supports JavaScript and is designed to simplify the process of building bots that can interact with Microsoft Teams, and facilitates the migration of existing bots. The AI library supports the migration of messaging capabilities, Message extension (ME) capabilities, and Adaptive Cards capabilities to the new format. It's also possible to upgrade existing Teams apps with these features.

Earlier, you were using BotBuilder SDK directly to create bots for Microsoft Teams. Teams AI library is designed to facilitate the construction of bots that can interact with Microsoft Teams. While one of the key features of Teams AI library is the AI support that customers can utilize, the initial objective might be to upgrade their current bot without AI. After you upgrade, the bot can connect to AI or large language model (LLM) available in the AI library.

Teams AI library supports the following capabilities:

* [Send or receive message](#send-or-receive-message)

* [Message extension (ME) capabilities](#message-extensions)

* [Adaptive Cards capabilities](#adaptive-cards-capabilities)

 You need to use the AI library to scaffold bot and Adaptive Card handlers to the source file.

In the following section, we've used  the samples from the [AI library](https://github.com/microsoft/teams-ai/tree/main) to explain each capability and their path to migration:

## Send or receive message

Replace `BotActivityHandler` and `ApplicationTurnState` with this `Application` and `DefaultTurnState`. `DefaultTurnState` is constructed to include `ConversationState`.

Example: [EchoBot](https://github.com/microsoft/teams-ai/tree/main/js/samples/01.messaging.a.echoBot)

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

## Message extensions

In the previous Teams SDK format, you needed to set up the Message extensions query handler like:

Now, the app class has `messageExtensions` features to simply creating the handlers:

* `context`: TurnContext
* `state`: DefaultTurnState
* `query`: The data passed from message extension interaction

Example: [Message extension search command](https://github.com/microsoft/teams-ai/tree/main/js/samples/02.messageExtensions.a.searchCommand)

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

## Adaptive Cards capabilities

The `app.AdaptiveCards` handler is the handler for producing Adaptive Cards.

[Code sample](https://github.com/microsoft/teams-ai/tree/main/js/samples/03.adaptiveCards.a.typeAheadBot)

[Sample code reference](https://github.com/microsoft/teams-ai/blob/main/js/samples/03.adaptiveCards.a.typeAheadBot/src/index.ts#L92)

```javascript

// Listen for messages that trigger returning an adaptive card
app.message(/dynamic/i, async (context, _state) => {
    const attachment = createDynamicSearchCard();
    await context.sendActivity({ attachments: [attachment] });
});

app.message(/static/i, async (context, _state) => {
    const attachment = createStaticSearchCard();
    await context.sendActivity({ attachments: [attachment] });
});

// Listener for action.submit on cards from the user

interface SubmitData {
    choiceSelect?: string;
}

// Listen for submit buttons
app.adaptiveCards.actionSubmit('DynamicSubmit', async (context, _state, data: SubmitData) => {
    await context.sendActivity(`Dynamically selected option is: ${data.choiceSelect}`);
});

app.adaptiveCards.actionSubmit('StaticSubmit', async (context, _state, data: SubmitData) => {
    await context.sendActivity(`Statically selected option is: ${data.choiceSelect}`);
});
```

## Core capabilities

## Bot logic for handling an action

 The Bot responds to the user's input with the action `lights on` to turn the lights on.

The following example illustrates how Teams AI library makes it possible to manage the bot logic for handling an action `LightsOn` or `LightsOff` and connect it to the prompt used with OpenAI:

Example: [Light bot](https://github.com/microsoft/teams-ai/tree/main/js/samples/04.ai.c.actionMapping.lightBot)

[Sample code reference](https://github.com/microsoft/teams-ai/blob/main/js/samples/04.ai.c.actionMapping.lightBot/src/index.ts#L80)

```typescript

// Create AI components
const planner = new OpenAIPlanner<ApplicationTurnState>({
    apiKey: process.env.OpenAIKey,
    defaultModel: 'gpt-3.5-turbo',
    logRequests: true
});
const promptManager = new DefaultPromptManager<ApplicationTurnState>(path.join(__dirname, '../src/prompts'));


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

### Message extension query

The Teams AI library offers you a more intuitive approach to create handlers for various message-extension query commands when compared to previous iterations of Teams Bot Framework SDK. The new SDK works alongside the existing Teams Bot Framework SDK.

The following is an example of how you can structure their code to handle a message-extension query for the `searchCmd` command.

Example: [Message extension search command](https://github.com/microsoft/teams-ai/tree/main/js/samples/02.messageExtensions.a.searchCommand)

[Sample code reference](https://github.com/microsoft/teams-ai/blob/main/js/samples/02.messageExtensions.a.searchCommand/src/index.ts#L76)

```typescript

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

## Intents to actions

A simple interface for actions and predictions allows bots to react when they have high confidence for taking action. Ambient presence lets bots learn intent, use prompts based on business logic, and generate responses.

Thanks to our AI library, the prompt needs only to outline the actions supported by the bot, and supply a few-shot examples of how to employ those actions. Conversation history helps with a natural dialogue between the user and bot, such as *add cereal to groceries list*, followed by *also add coffee*, which should indicate that coffee is to be added to the groceries list.

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

The bot logic is simplified to provide handlers for actions such as `addItem`, `removeItem` and , `findItem`. This clear delineation between actions and the prompts that instruct the AI on how to execute them is an incredibly potent tool.

Example: [List bot](https://github.com/microsoft/teams-ai/tree/main/js/samples/04.ai.d.chainedActions.listBot)

[Sample code reference](https://github.com/microsoft/teams-ai/blob/main/js/samples/04.ai.d.chainedActions.listBot/src/index.ts#L149)

```typescript
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

## Next step

> [!div class="nextstepaction"]
> [Get started with Teams AI library](how-conversation-ai-get-started.md)
