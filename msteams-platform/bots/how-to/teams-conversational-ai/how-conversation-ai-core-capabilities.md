---
title: Core Capabilities of Teams AI Library
description: In this article, learn more about Teams AI library capabilities, bot logic, Adaptive Cards capabilities, and message extension query.
ms.localizationpriority: medium
ms.topic: overview
ms.author: surbhigupta
ms.date: 05/24/2023
---

# Teams AI library capabilities

Teams AI library supports JavaScript and is designed to simplify the process of building bots that can interact with Microsoft Teams, and facilitates the migration of existing bots. The AI library supports the migration of messaging capabilities, Message extension (ME) capabilities, and Adaptive Cards capabilities to the new format. It's also possible to upgrade existing Teams apps with these features.

Earlier, you were using BotBuilder SDK directly to create bots for Microsoft Teams. Teams AI library is designed to facilitate the construction of bots that can interact with Microsoft Teams. While one of the key features of Teams AI library is the AI support that customers can utilize, the initial objective might be to upgrade their current bot without AI. After you upgrade, the bot can connect to AI or Large Language Models (LLMs) available in the AI library.

Teams AI library supports the following capabilities:

* [Send or receive message](#send-or-receive-message)

* [Message extension (ME) capabilities](#message-extensions)

* [Adaptive Cards capabilities](#adaptive-cards-capabilities)

 You need to use the AI library to scaffold bot and Adaptive Card handlers to the source file.

In the following section, we've used  the samples from the [AI library](https://github.com/microsoft/teams-ai/tree/main) to explain each capability and the path to migration:

## Send or receive message

You can send and receive messages using the Bot Framework. The app listens for the user to send a message, and when it receives this message, it deletes the conversation state and sends a message back to the user. The app also keeps track of the number of messages received in a conversation and echoes back the user’s message with a count of messages received so far.

# [.NET](#tab/dotnet6)

* [Code sample](https://github.com/microsoft/teams-ai/tree/main/dotnet/samples/01.messaging.echoBot)

* [Sample code reference](https://github.com/microsoft/teams-ai/blob/main/dotnet/samples/01.messaging.echoBot/Program.cs#L49)

```csharp
 // Listen for user to say "/reset" and then delete conversation state
    app.OnMessage("/reset", ActivityHandlers.ResetMessageHandler);

    // Listen for ANY message to be received. MUST BE AFTER ANY OTHER MESSAGE HANDLERS
    app.OnActivity(ActivityTypes.Message, ActivityHandlers.MessageHandler);

    return app;
```

# [JavaScript](#tab/javascript6)

* [Code sample](https://github.com/microsoft/teams-ai/tree/main/js/samples/01.getting-started/a.echoBot)

* [Sample code reference](https://github.com/microsoft/teams-ai/blob/main/js/samples/01.getting-started/a.echoBot/src/index.ts#L74)

```typescript
// Listen for user to say '/reset' and then delete conversation state
app.message('/reset', async (context: TurnContext, state: ApplicationTurnState) => {
    state.deleteConversationState();
    await context.sendActivity(`Ok I've deleted the current conversation state.`);
});

// Listen for ANY message to be received. MUST BE AFTER ANY OTHER MESSAGE HANDLERS
app.activity(ActivityTypes.Message, async (context: TurnContext, state: ApplicationTurnState) => {
    // Increment count state
    let count = state.conversation.count ?? 0;
    state.conversation.count = ++count;

    // Echo back users request
    await context.sendActivity(`[${count}] you said: ${context.activity.text}`);
});
```

# [Python](#tab/python6)

* [Code sample](https://github.com/microsoft/teams-ai/tree/main/python/samples/01.messaging.a.echoBot)

* [Sample code reference](https://github.com/microsoft/teams-ai/blob/main/python/samples/01.messaging.a.echoBot/src/bot.py#L25)

```python
@app.activity("message")
async def on_message(context: TurnContext, _state: TurnState):
    await context.send_activity(f"you said: {context.activity.text}")
    return True
```

---

## Message extensions

In the Bot Framework SDK's `TeamsActivityHandler`, you needed to set up the Message extensions query handler by extending handler methods. The app listens for search actions and item taps, and formats the search results as a list of HeroCards displaying package information. The result is used to display the search results in the messaging extension.

# [.NET](#tab/dotnet5)

* [Code sample](https://github.com/microsoft/teams-ai/tree/main/dotnet/samples/02.messageExtensions.a.searchCommand)

* [Sample code reference](https://github.com/microsoft/teams-ai/blob/main/dotnet/samples/02.messageExtensions.a.searchCommand/Program.cs#L47)

* [Search results reference](https://github.com/microsoft/teams-ai/blob/main/dotnet/samples/02.messageExtensions.a.searchCommand/ActivityHandlers.cs#L39)

```csharp
// Listen for search actions
    app.MessageExtensions.OnQuery("searchCmd", activityHandlers.QueryHandler);
    // Listen for item tap
    app.MessageExtensions.OnSelectItem(activityHandlers.SelectItemHandler);

    return app;

 // Format search results in ActivityHandlers.cs

            List<MessagingExtensionAttachment> attachments = packages.Select(package => new MessagingExtensionAttachment
            {
                ContentType = HeroCard.ContentType,
                Content = new HeroCard
                {
                    Title = package.Id,
                    Text = package.Description
                },
                Preview = new HeroCard
                {
                    Title = package.Id,
                    Text = package.Description,
                    Tap = new CardAction
                    {
                        Type = "invoke",
                        Value = package
                    }
                }.ToAttachment()
            }).ToList();

            // Return results as a list

            return new MessagingExtensionResult
            {
                Type = "result",
                AttachmentLayout = "list",
                Attachments = attachments
            };

```

# [JavaScript](#tab/javascript5)

Now, the app class has `messageExtensions` features to simplify creating the handlers:

* `context`: `TurnContext`
* `state`: `TurnState`
* `query`: The data passed from message extension interaction

* [Code sample](https://github.com/microsoft/teams-ai/tree/main/js/samples/02.teams-features/a.messageExtensions.searchCommand)

* [Sample code reference](https://github.com/microsoft/teams-ai/blob/main/js/samples/02.teams-features/a.messageExtensions.searchCommand/src/index.ts#L79)

```javascript
import { MessagingExtensionAttachment } from "botbuilder";
import axios from 'axios';
import { Application } from `@microsoft/teams-ai`;

// Listen for search actions
app.messageExtensions.query('searchCmd', async (context: TurnContext, state: TurnState, query) => {
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
```

Similarly, `selectItem` listener would be set up as:

```typescript
app.messageExtensions.selectItem(async (context: TurnContext, state: TurnState, item) => {
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

# [Python](#tab/python5)

* [Code sample](https://github.com/microsoft/teams-ai/tree/main/python/samples/02.messageExtensions.a.searchCommand)

* [Sample code reference](https://github.com/microsoft/teams-ai/blob/main/python/samples/02.messageExtensions.a.searchCommand/src/bot.py#L44)

```python
@app.message_extensions.query("searchCmd")
async def search_command(
    _context: TurnContext, _state: AppTurnState, query: MessagingExtensionQuery
) -> MessagingExtensionResult:
    query_dict = query.as_dict()
    search_query = ""
    if query_dict["parameters"] is not None and len(query_dict["parameters"]) > 0:
        for parameter in query_dict["parameters"]:
            if parameter["name"] == "queryText":
                search_query = parameter["value"]
                break
    count = query_dict["query_options"]["count"] if query_dict["query_options"]["count"] else 10
    url = "http://registry.npmjs.com/-/v1/search?"
    params = {"size": count, "text": search_query}

    async with aiohttp.ClientSession() as session:
        async with session.get(url, params=params) as response:
            res = await response.json()

            results: List[MessagingExtensionAttachment] = []

            for obj in res["objects"]:
                results.append(create_npm_search_result_card(result=obj["package"]))

            return MessagingExtensionResult(
                attachment_layout="list", attachments=results, type="result"
            )
```

---

## Adaptive Cards capabilities

You can register Adaptive Card action handlers using the `app.adaptiveCards` property. The app listens for messages containing the keywords `static` or `dynamic` and returns an Adaptive Card using the `StaticMessageHandler` or `DynamicMessageHandler` methods. The app also listens for queries from a dynamic search card, submit buttons on the Adaptive Cards.

# [.NET](#tab/dotnet4)

* [Code sample](https://github.com/microsoft/teams-ai/tree/main/dotnet/samples/03.adaptiveCards.a.typeAheadBot)

* [Sample code reference](https://github.com/microsoft/teams-ai/blob/main/dotnet/samples/03.adaptiveCards.a.typeAheadBot/Program.cs#L52)

```csharp
// Listen for messages that trigger returning an adaptive card
    app.OnMessage(new Regex(@"static", RegexOptions.IgnoreCase), activityHandlers.StaticMessageHandler);
    app.OnMessage(new Regex(@"dynamic", RegexOptions.IgnoreCase), activityHandlers.DynamicMessageHandler);

    // Listen for query from dynamic search card
    app.AdaptiveCards.OnSearch("nugetpackages", activityHandlers.SearchHandler);
    // Listen for submit buttons
    app.AdaptiveCards.OnActionSubmit("StaticSubmit", activityHandlers.StaticSubmitHandler);
    app.AdaptiveCards.OnActionSubmit("DynamicSubmit", activityHandlers.DynamicSubmitHandler);

    // Listen for ANY message to be received. MUST BE AFTER ANY OTHER HANDLERS
    app.OnActivity(ActivityTypes.Message, activityHandlers.MessageHandler);

    return app;
```

# [JavaScript](#tab/javascript4)

* [Code sample](https://github.com/microsoft/teams-ai/tree/main/js/samples/02.teams-features/b.adaptiveCards.typeAheadBot)

* [Sample code reference](https://github.com/microsoft/teams-ai/blob/main/js/samples/02.teams-features/b.adaptiveCards.typeAheadBot/src/index.ts#L86)

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

# [Python](#tab/python4)

* [Code sample](https://github.com/microsoft/teams-ai/tree/main/python/samples/03.adaptiveCards.a.typeAheadBot)

* [Sample code reference](https://github.com/microsoft/teams-ai/blob/main/python/samples/03.adaptiveCards.a.typeAheadBot/src/bot.py#L39C1-L78C1)

```python
@app.message(re.compile(r"static", re.IGNORECASE))
async def static_card(context: TurnContext, _state: AppTurnState) -> bool:
    attachment = create_static_search_card()
    await context.send_activity(Activity(attachments=[attachment]))
    return True

@app.adaptive_cards.action_submit("StaticSubmit")
async def on_static_submit(context: TurnContext, _state: AppTurnState, data) -> None:
    await context.send_activity(f'Statically selected option is: {data["choiceSelect"]}')

@app.adaptive_cards.action_submit("DynamicSubmit")
async def on_dynamic_submit(context: TurnContext, _state: AppTurnState, data) -> None:
    await context.send_activity(f'Dynamically selected option is: {data["choiceSelect"]}')

@app.message(re.compile(r"dynamic", re.IGNORECASE))
async def dynamic_card(context: TurnContext, _state: AppTurnState) -> bool:
    attachment = create_dynamic_search_card()
    await context.send_activity(Activity(attachments=[attachment]))
    return True
```

---

## Core capabilities

## Bot logic for handling an action

The Bot responds to the user's input with the action `LightsOn` to turn the lights on.

The following example illustrates how Teams AI library makes it possible to manage the bot logic for handling an action `LightsOn` or `LightsOff` and connect it to the prompt used with OpenAI:

# [.NET](#tab/dotnet3)

* [Code sample](https://github.com/microsoft/teams-ai/tree/main/dotnet/samples/04.ai.c.actionMapping.lightBot)

* [Sample code reference](https://github.com/microsoft/teams-ai/blob/main/dotnet/samples/04.ai.c.actionMapping.lightBot/Program.cs#L33)

* [Actions sample code reference](https://github.com/microsoft/teams-ai/blob/main/dotnet/samples/04.ai.c.actionMapping.lightBot/LightBotActions.cs#L10)

```csharp
/ Create AI Model
if (!string.IsNullOrEmpty(config.OpenAI?.ApiKey))
{
    builder.Services.AddSingleton<OpenAIModel>(sp => new(
        new OpenAIModelOptions(config.OpenAI.ApiKey, "gpt-3.5-turbo")
        {
            LogRequests = true
        },
        sp.GetService<ILoggerFactory>()
    ));
}
else if (!string.IsNullOrEmpty(config.Azure?.OpenAIApiKey) && !string.IsNullOrEmpty(config.Azure.OpenAIEndpoint))
{
    builder.Services.AddSingleton<OpenAIModel>(sp => new(
        new AzureOpenAIModelOptions(
            config.Azure.OpenAIApiKey,
            "gpt-35-turbo",
            config.Azure.OpenAIEndpoint
        )
        {
            LogRequests = true
        },
        sp.GetService<ILoggerFactory>()
    ));
}
else
{
    throw new Exception("please configure settings for either OpenAI or Azure");
}

// Create the bot as transient. In this case the ASP Controller is expecting an IBot.
builder.Services.AddTransient<IBot>(sp =>
{
    // Create loggers
    ILoggerFactory loggerFactory = sp.GetService<ILoggerFactory>()!;

    // Create Prompt Manager
    PromptManager prompts = new(new()
    {
        PromptFolder = "./Prompts"
    });

    // Adds function to be referenced in the prompt template
    prompts.AddFunction("getLightStatus", async (context, memory, functions, tokenizer, args) =>
    {
        bool lightsOn = (bool)(memory.GetValue("conversation.lightsOn") ?? false);
        return await Task.FromResult(lightsOn ? "on" : "off");
    });

    // Create ActionPlanner
    ActionPlanner<AppState> planner = new(
        options: new(
            model: sp.GetService<OpenAIModel>()!,
            prompts: prompts,
            defaultPrompt: async (context, state, planner) =>
            {
                PromptTemplate template = prompts.GetPrompt("sequence");
                return await Task.FromResult(template);
            }
        )
        { LogRepairs = true },
        loggerFactory: loggerFactory
    );

    return new TeamsLightBot(new()
    {
        Storage = sp.GetService<IStorage>(),
        AI = new(planner),
        LoggerFactory = loggerFactory,
        TurnStateFactory = () =>
        {
            return new AppState();
        }
    });
});

// LightBotActions defined in LightBotActions.cs
    
[Action("LightsOn")]
        public async Task<string> LightsOn([ActionTurnContext] ITurnContext turnContext, [ActionTurnState] AppState turnState)
        {
            turnState.Conversation.LightsOn = true;
            await turnContext.SendActivityAsync(MessageFactory.Text("[lights on]"));
            return "the lights are now on";
        }

        [Action("LightsOff")]
        public async Task<string> LightsOff([ActionTurnContext] ITurnContext turnContext, [ActionTurnState] AppState turnState)
        {
            turnState.Conversation.LightsOn = false;
            await turnContext.SendActivityAsync(MessageFactory.Text("[lights off]"));
            return "the lights are now off";
        }

        [Action("Pause")]
        public async Task<string> LightsOff([ActionTurnContext] ITurnContext turnContext, [ActionParameters] Dictionary<string, object> args)
        {
            // Try to parse entities returned by the model.
            // Expecting "time" to be a number of milliseconds to pause.
            if (args.TryGetValue("time", out object? time))
            {
                if (time != null && time is string timeString)
                {
                    if (int.TryParse(timeString, out int timeInt))
                    {
                        await turnContext.SendActivityAsync(MessageFactory.Text($"[pausing for {timeInt / 1000} seconds]"));
                        await Task.Delay(timeInt);
                    }
                }
            }

            return "done pausing";
        }

```

# [JavaScript](#tab/javascript3)

* [Code sample](https://github.com/microsoft/teams-ai/tree/main/js/samples/03.ai-concepts/c.actionMapping-lightBot)

* [Sample code reference](https://github.com/microsoft/teams-ai/blob/main/js/samples/03.ai-concepts/c.actionMapping-lightBot/src/index.ts#L87)

```typescript

// Create AI components
const model = new OpenAIModel({
    // OpenAI Support
    apiKey: process.env.OPENAI_KEY!,
    defaultModel: 'gpt-3.5-turbo',

    // Azure OpenAI Support
    azureApiKey: process.env.AZURE_OPENAI_KEY!,
    azureDefaultDeployment: 'gpt-3.5-turbo',
    azureEndpoint: process.env.AZURE_OPENAI_ENDPOINT!,
    azureApiVersion: '2023-03-15-preview',

    // Request logging
    logRequests: true
});

const prompts = new PromptManager({
    promptsFolder: path.join(__dirname, '../src/prompts')
});

const planner = new ActionPlanner({
    model,
    prompts,
    defaultPrompt: 'sequence',
});

// Define storage and application
const storage = new MemoryStorage();
const app = new Application<ApplicationTurnState>({
    storage,
    ai: {
        planner
    }
});

// Define a prompt function for getting the current status of the lights
planner.prompts.addFunction('getLightStatus', async (context: TurnContext, memory: Memory) => {
    return memory.getValue('conversation.lightsOn') ? 'on' : 'off';
});

// Register action handlers
app.ai.action('LightsOn', async (context: TurnContext, state: ApplicationTurnState) => {
    state.conversation.lightsOn = true;
    await context.sendActivity(`[lights on]`);
    return `the lights are now on`;
});

app.ai.action('LightsOff', async (context: TurnContext, state: ApplicationTurnState) => {
    state.conversation.lightsOn = false;
    await context.sendActivity(`[lights off]`);
    return `the lights are now off`;
});

interface PauseParameters {
    time: number;
}

app.ai.action('Pause', async (context: TurnContext, state: ApplicationTurnState, parameters: PauseParameters) => {
    await context.sendActivity(`[pausing for ${parameters.time / 1000} seconds]`);
    await new Promise((resolve) => setTimeout(resolve, parameters.time));
    return `done pausing`;
});

```

# [Python](#tab/python3)

* [Code sample](https://github.com/microsoft/teams-ai/tree/main/python/samples/04.ai.c.actionMapping.lightBot)

* [Sample code reference](https://github.com/microsoft/teams-ai/blob/main/python/samples/04.ai.c.actionMapping.lightBot/src/bot.py#L35)

```python
# Create AI components
model: OpenAIModel

if config.OPENAI_KEY:
    model = OpenAIModel(
        OpenAIModelOptions(api_key=config.OPENAI_KEY, default_model="gpt-3.5-turbo")
    )
elif config.AZURE_OPENAI_KEY and config.AZURE_OPENAI_ENDPOINT:
    model = OpenAIModel(
        AzureOpenAIModelOptions(
            api_key=config.AZURE_OPENAI_KEY,
            default_model="gpt-35-turbo",
            api_version="2023-03-15-preview",
            endpoint=config.AZURE_OPENAI_ENDPOINT,
        )
    )
```

---

### Message extension query

The Teams AI library offers you a more intuitive approach to create handlers for various message-extension query commands when compared to previous iterations of Teams Bot Framework SDK. The new SDK works alongside the existing Teams Bot Framework SDK.

The following is an example of how you can structure their code to handle a message-extension query for the `searchCmd` command.

# [.NET](#tab/dotnet2)

* [Code sample](https://github.com/microsoft/teams-ai/tree/main/dotnet/samples/02.messageExtensions.a.searchCommand)

* [Search actions sample code reference](https://github.com/microsoft/teams-ai/blob/main/dotnet/samples/02.messageExtensions.a.searchCommand/Program.cs#L47)

* [Search results sample code reference](https://github.com/microsoft/teams-ai/blob/main/dotnet/samples/02.messageExtensions.a.searchCommand/ActivityHandlers.cs#L39)

```csharp
// Listen for search actions
    app.MessageExtensions.OnQuery("searchCmd", activityHandlers.QueryHandler);
    // Listen for item tap
    app.MessageExtensions.OnSelectItem(activityHandlers.SelectItemHandler);

    return app;

 // Format search results
            List<MessagingExtensionAttachment> attachments = packages.Select(package => new MessagingExtensionAttachment
            {
                ContentType = HeroCard.ContentType,
                Content = new HeroCard
                {
                    Title = package.Id,
                    Text = package.Description
                },
                Preview = new HeroCard
                {
                    Title = package.Id,
                    Text = package.Description,
                    Tap = new CardAction
                    {
                        Type = "invoke",
                        Value = package
                    }
                }.ToAttachment()
            }).ToList();

            return new MessagingExtensionResult
            {
                Type = "result",
                AttachmentLayout = "list",
                Attachments = attachments
            };
```

# [JavaScript](#tab/javascript2)

* [Code sample](https://github.com/microsoft/teams-ai/tree/main/js/samples/02.teams-features/a.messageExtensions.searchCommand)

* [Sample code reference](https://github.com/microsoft/teams-ai/blob/main/js/samples/02.teams-features/a.messageExtensions.searchCommand/src/index.ts#L78)

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

# [Python](#tab/python2)

* [Code sample](https://github.com/microsoft/teams-ai/tree/main/python/samples/02.messageExtensions.a.searchCommand)

* [Sample code reference](https://github.com/microsoft/teams-ai/blob/main/python/samples/02.messageExtensions.a.searchCommand/src/bot.py#L44)

```python
@app.message_extensions.query("searchCmd")
async def search_command(
    _context: TurnContext, _state: AppTurnState, query: MessagingExtensionQuery
) -> MessagingExtensionResult:
    query_dict = query.as_dict()
    search_query = ""
    if query_dict["parameters"] is not None and len(query_dict["parameters"]) > 0:
        for parameter in query_dict["parameters"]:
            if parameter["name"] == "queryText":
                search_query = parameter["value"]
                break
    count = query_dict["query_options"]["count"] if query_dict["query_options"]["count"] else 10
    url = "http://registry.npmjs.com/-/v1/search?"
    params = {"size": count, "text": search_query}

    async with aiohttp.ClientSession() as session:
        async with session.get(url, params=params) as response:
            res = await response.json()

            results: List[MessagingExtensionAttachment] = []

            for obj in res["objects"]:
                results.append(create_npm_search_result_card(result=obj["package"]))

            return MessagingExtensionResult(
                attachment_layout="list", attachments=results, type="result"
            )


# Listen for item tap
@app.message_extensions.select_item()
async def select_item(_context: TurnContext, _state: AppTurnState, item: Any):
    card = create_npm_package_card(item)

    return MessagingExtensionResult(attachment_layout="list", attachments=[card], type="result")
```

---

## Intents to actions

A simple interface for actions and predictions allows bots to react when they have high confidence for taking action. Ambient presence lets bots learn intent, use prompts based on business logic, and generate responses.

Thanks to our AI library, the prompt needs only to outline the actions supported by the bot, and supply a few-shot example of how to employ those actions. Conversation history helps with a natural dialogue between the user and bot, such as *add cereal to groceries list*, followed by *also add coffee*, which should indicate that coffee is to be added to the groceries list.

The following is a conversation with an AI assistant. The AI assistant is capable of managing lists and recognizes the following commands:

* DO `<action> <optional entities>`
* SAY `<response>`

The following actions are supported:

* `addItem list="<list name>" item="<text>"`
* `removeItem list="<list name>" item="<text>"`
* `summarizeLists`

All entities are required parameters to actions.

* Current list names:

    ```
    {{conversation.listNames}} 
    ```

    ```text

    Examples:  

    Human: remind me to buy milk
    AI: DO addItem list="groceries" item="milk" THEN SAY Ok I added milk to your groceries list
    Human: we already have milk
    AI: DO removeItem list="groceries" item="milk" THEN SAY Ok I removed milk from your groceries list
    Human: buy ingredients to make margaritas
    AI: DO addItem list="groceries" item="tequila" THEN DO addItem list="groceries" item="orange liqueur" THEN DO addItem list="groceries" item="lime juice" THEN SAY Ok I added tequila, orange liqueur, and lime juice to your groceries list
    Human: do we have have milk
    AI: DO findItem list="groceries" item="milk"
    Human: what's in my grocery list
    AI: DO summarizeLists  
    Human: what's the contents of all my lists?
    AI: DO summarizeLists
    Human: show me all lists but change the title to Beach Party
    AI: DO summarizeLists
    Human: show me all lists as a card and sort the lists alphabetically
    AI: DO summarizeLists

    ```

* Conversation history:

    ```
    {{conversation.(history}} 
    ```

* Current query:

    ```
    Human: {{activity.text}} 
    ```

* Current list names:

    ```javascript
    {{conversation.listNames}}
    ```

* AI: The bot logic is streamlined to include handlers for actions such as `addItem` and `removeItem`. This distinct separation between actions and the prompts guiding the AI on how to execute the actions and prompts serves as a powerful tool.

# [.NET](#tab/dotnet1)

* [Code sample](https://github.com/microsoft/teams-ai/tree/main/dotnet/samples/04.ai.d.chainedActions.listBot)

* [Sample code reference](https://github.com/microsoft/teams-ai/blob/main/dotnet/samples/04.ai.d.chainedActions.listBot/ListBotActions.cs#L40)

```csharp
        [Action("AddItem")]
        public string AddItem([ActionTurnState] ListState turnState, [ActionParameters] Dictionary<string, object> parameters)
        {
            ArgumentNullException.ThrowIfNull(turnState);
            ArgumentNullException.ThrowIfNull(parameters);

            string listName = GetParameterString(parameters, "list");
            string item = GetParameterString(parameters, "item");

            IList<string> items = GetItems(turnState, listName);
            items.Add(item);
            SetItems(turnState, listName, items);

            return "item added. think about your next action";
        }

        [Action("RemoveItem")]
        public async Task<string> RemoveItem([ActionTurnContext] ITurnContext turnContext, [ActionTurnState] ListState turnState, [ActionParameters] Dictionary<string, object> parameters)
        {
            ArgumentNullException.ThrowIfNull(turnContext);
            ArgumentNullException.ThrowIfNull(turnState);
            ArgumentNullException.ThrowIfNull(parameters);

            string listName = GetParameterString(parameters, "list");
            string item = GetParameterString(parameters, "item");

            IList<string> items = GetItems(turnState, listName);

            if (!items.Contains(item))
            {
                await turnContext.SendActivityAsync(ResponseBuilder.ItemNotFound(listName, item)).ConfigureAwait(false);
                return "item not found. think about your next action";
            }

            items.Remove(item);
            SetItems(turnState, listName, items);
            return "item removed. think about your next action";
        }
```

# [JavaScript](#tab/javascript1)

* [Code sample](https://github.com/microsoft/teams-ai/tree/main/js/samples/03.ai-concepts/d.chainedActions-listBot)

* [Sample code reference](https://github.com/microsoft/teams-ai/blob/main/js/samples/03.ai-concepts/d.chainedActions-listBot/src/index.ts#L161)

```typescript
    app.ai.action('addItems', async (context: TurnContext, state: ApplicationTurnState, parameters: ListAndItems) => {
    const items = getItems(state, parameters.list);
    items.push(...(parameters.items ?? []));
    setItems(state, parameters.list, items);
    return `items added. think about your next action`;
    });

    app.ai.action('removeItems', async (context: TurnContext, state: ApplicationTurnState, parameters: ListAndItems) => {
        const items = getItems(state, parameters.list);
        (parameters.items ?? []).forEach((item: string) => {
            const index = items.indexOf(item);
            if (index >= 0) {
                items.splice(index, 1);
            }
        });
        setItems(state, parameters.list, items);
        return `items removed. think about your next action`;
    });
```

# [Python](#tab/python1)

* [Code sample](https://github.com/microsoft/teams-ai/tree/main/python/samples/04.ai.d.chainedActions.listBot)

* [Sample code reference](https://github.com/microsoft/teams-ai/blob/main/python/samples/04.ai.d.chainedActions.listBot/src/bot.py#L96C1-L123C57)

```python
@app.ai.action("addItems")
async def on_add_items(
    context: ActionTurnContext[Dict[str, Any]],
    state: AppTurnState,
):
    parameters = ListAndItems.from_dict(context.data, infer_missing=True)
    state.ensure_list_exists(parameters.list)
    items = state.conversation.lists[parameters.list]
    if parameters.items is not None:
        for item in parameters.items:
            items.append(item)
        state.conversation.lists[parameters.list] = items
    return "items added. think about your next action"

@app.ai.action("removeItems")
async def on_remove_items(
    context: ActionTurnContext[Dict[str, Any]],
    state: AppTurnState,
):
    parameters = ListAndItems.from_dict(context.data, infer_missing=True)
    state.ensure_list_exists(parameters.list)
    items = state.conversation.lists[parameters.list]
    if parameters.items is not None and len(parameters.items) > 0:
        for item in parameters.items:
            if item in items:
                items.remove(item)
        state.conversation.lists[parameters.list] = items
    return "items removed. think about your next action"
```

---

## Next step

> [!div class="nextstepaction"]
> [Get started with Teams AI library](how-conversation-ai-get-started.md)
