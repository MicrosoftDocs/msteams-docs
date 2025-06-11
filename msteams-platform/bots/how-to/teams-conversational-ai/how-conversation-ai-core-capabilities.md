---
title: Core Capabilities of Teams AI Library
description: In this article, learn more about Teams AI library capabilities, bot logic, Adaptive Cards capabilities, and message extension query.
ms.localizationpriority: medium
ms.topic: overview
ms.author: surbhigupta
ms.date: 02/26/2025
ms.owner: angovil
---

# Understand Teams AI Library

Teams AI library supports JavaScript and simplifies building bots that can interact with Microsoft Teams. It facilitates the migration of existing bots to leverage AI-powered features. The library supports migrating messaging, message extension, and Adaptive Cards capabilities to the new format. You can also upgrade your existing Teams apps with these modern capabilities.

Previously, you may have used the BotBuilder SDK to create bots for Teams. The Teams AI library simplifies this process while adding AI support. You might initially upgrade your bot without AI, and later connect it to AI or Large Language Models (LLMs) available in the library.

With Teams AI library, you can focus on:

- Understanding the role of [`activity handler`](#activity-handlers) in conversation management.
- Designing [`bot logic`](#bot-logic-for-handling-an-action) for intelligent responses.
- Integrating Natural Language Processing (NLP) for translating user [`intents to actions`](#intents-to-actions).

## Activity Handlers

Teams AI library supports the following activity handlers:

- [Send or receive message](#send-or-receive-message)
- [Message extension (ME) capabilities](#message-extensions)
- [Adaptive Cards capabilities](#adaptive-cards-capabilities)

You need to use the AI library to scaffold bot and Adaptive Card handlers into your source file. The subsequent sections use samples from the [AI library](https://github.com/microsoft/teams-ai/tree/main) to explain each capability and outline the migration path.

### Send or Receive Message

This sample demonstrates how the app listens for user messages, deletes the conversation state on command, tracks the message count in a conversation, and echoes back the user's message with the updated count.

#### .NET Sample

- [Code sample](https://github.com/microsoft/teams-ai/tree/main/dotnet/samples/01.messaging.echoBot)
- [Sample code reference](https://github.com/microsoft/teams-ai/blob/main/dotnet/samples/01.messaging.echoBot/Program.cs#L49)

```csharp
 // Listen for user to say "/reset" and then delete conversation state
    app.OnMessage("/reset", ActivityHandlers.ResetMessageHandler);

    // Listen for ANY message to be received. MUST BE AFTER ANY OTHER MESSAGE HANDLERS
    app.OnActivity(ActivityTypes.Message, ActivityHandlers.MessageHandler);

    return app;
```

#### JavaScript Sample

- [Code sample](https://github.com/microsoft/teams-ai/tree/main/js/samples/01.getting-started/a.echoBot)
- [Sample code reference](https://github.com/microsoft/teams-ai/blob/main/js/samples/01.getting-started/a.echoBot/src/index.ts#L74)

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

#### Python Sample

- [Code sample](https://github.com/microsoft/teams-ai/tree/main/python/samples/01.messaging.a.echoBot)
- [Sample code reference](https://github.com/microsoft/teams-ai/blob/main/python/samples/01.messaging.a.echoBot/src/bot.py#L25)

```python
@app.activity("message")
async def on_message(context: TurnContext, _state: TurnState):
    await context.send_activity(f"you said: {context.activity.text}")
    return True
```

---

### Message Extensions

For Message Extension queries, extend the Bot Framework SDK’s `TeamsActivityHandler` to listen and respond to search actions and item taps. The sample below demonstrates formatting search results as Hero Cards, which display package information in the messaging extension.

#### .NET Sample

- [Code sample](https://github.com/microsoft/teams-ai/tree/main/dotnet/samples/02.messageExtensions.a.searchCommand)
- [Sample code reference](https://github.com/microsoft/teams-ai/blob/main/dotnet/samples/02.messageExtensions.a.searchCommand/Program.cs#L47)
- [Search results reference](https://github.com/microsoft/teams-ai/blob/main/dotnet/samples/02.messageExtensions.a.searchCommand/ActivityHandlers.cs#L39)

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

#### JavaScript Sample

The app class uses `messageExtensions` features to simplify creating handlers.

- `context`: `TurnContext`
- `state`: `TurnState`
- `query`: contains the data from the message extension interaction

- [Code sample](https://github.com/microsoft/teams-ai/tree/main/js/samples/02.teams-features/a.messageExtensions.searchCommand)
- [Sample code reference](https://github.com/microsoft/teams-ai/blob/main/js/samples/02.teams-features/a.messageExtensions.searchCommand/src/index.ts#L79)

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

Similarly, set up the `selectItem` listener as:

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

#### Python Sample

- [Code sample](https://github.com/microsoft/teams-ai/tree/main/python/samples/02.messageExtensions.a.searchCommand)
- [Sample code reference](https://github.com/microsoft/teams-ai/blob/main/python/samples/02.messageExtensions.a.searchCommand/src/bot.py#L44)

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

### Adaptive Cards Capabilities

Register Adaptive Card action handlers using the `app.adaptiveCards` property. The sample below shows how the app listens for messages containing `static` or `dynamic` keywords. It returns an Adaptive Card using either `StaticMessageHandler()` or `DynamicMessageHandler()`. The app also handles queries from dynamic search cards and submit button actions.

#### .NET Sample

- [Code sample](https://github.com/microsoft/teams-ai/tree/main/dotnet/samples/03.adaptiveCards.a.typeAheadBot)
- [Sample code reference](https://github.com/microsoft/teams-ai/blob/main/dotnet/samples/03.adaptiveCards.a.typeAheadBot/Program.cs#L52)

```csharp
// Listen for messages that trigger returning an Adaptive Card
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

#### JavaScript Sample

- [Code sample](https://github.com/microsoft/teams-ai/tree/main/js/samples/02.teams-features/b.adaptiveCards.typeAheadBot)
- [Sample code reference](https://github.com/microsoft/teams-ai/blob/main/js/samples/02.teams-features/b.adaptiveCards.typeAheadBot/src/index.ts#L86)

```javascript
// Listen for messages that trigger returning an Adaptive Card
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

#### Python Sample

- [Code sample](https://github.com/microsoft/teams-ai/tree/main/python/samples/03.adaptiveCards.a.typeAheadBot)
- [Sample code reference](https://github.com/microsoft/teams-ai/blob/main/python/samples/03.adaptiveCards.a.typeAheadBot/src/bot.py#L39C1-L78C1)

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

## Bot Logic for Handling an Action

This section demonstrates how the bot manages the action `LightsOn` (or `LightsOff`) using Teams AI library. The bot logic integrates with OpenAI prompts to generate intelligent responses based on user commands. In this sample, when the user requests to turn the lights on, the bot updates its state and sends a confirmation message.

#### .NET Sample

- [Code sample](https://github.com/microsoft/teams-ai/tree/main/dotnet/samples/04.ai.c.actionMapping.lightBot)
- [Sample code reference](https://github.com/microsoft/teams-ai/blob/main/dotnet/samples/04.ai.c.actionMapping.lightBot/Program.cs#L33)
- [Actions sample code reference](https://github.com/microsoft/teams-ai/blob/main/dotnet/samples/04.ai.c.actionMapping.lightBot/LightBotActions.cs#L10)

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

#### JavaScript Sample

- [Code sample](https://github.com/microsoft/teams-ai/tree/main/js/samples/03.ai-concepts/c.actionMapping-lightBot)
- [Sample code reference](https://github.com/microsoft/teams-ai/blob/main/js/samples/03.ai-concepts/c.actionMapping-lightBot/src/index.ts#L87)

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

#### Python Sample

- [Code sample](https://github.com/microsoft/teams-ai/tree/main/python/samples/04.ai.c.actionMapping.lightBot)
- [Sample code reference](https://github.com/microsoft/teams-ai/blob/main/python/samples/04.ai.c.actionMapping.lightBot/src/bot.py#L35)

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

### Message Extension Query

Teams AI library provides an intuitive way to handle message extension query commands alongside the Teams Bot Framework SDK. The sample below shows how to structure code for handling a message extension query for the `searchCmd` command.

#### .NET Sample

- [Code sample](https://github.com/microsoft/teams-ai/tree/main/dotnet/samples/02.messageExtensions.a.searchCommand)
- [Search actions sample code reference](https://github.com/microsoft/teams-ai/blob/main/dotnet/samples/02.messageExtensions.a.searchCommand/Program.cs#L47)
- [Search results sample code reference](https://github.com/microsoft/teams-ai/blob/main/dotnet/samples/02.messageExtensions.a.searchCommand/ActivityHandlers.cs#L39)

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

#### JavaScript Sample

- [Code sample](https://github.com/microsoft/teams-ai/tree/main/js/samples/02.teams-features/a.messageExtensions.searchCommand)
- [Sample code reference](https://github.com/microsoft/teams-ai/blob/main/js/samples/02.teams-features/a.messageExtensions.searchCommand/src/index.ts#L78)

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

#### Python Sample

- [Code sample](https://github.com/microsoft/teams-ai/tree/main/python/samples/02.messageExtensions.a.searchCommand)
- [Sample code reference](https://github.com/microsoft/teams-ai/blob/main/python/samples/02.messageExtensions.a.searchCommand/src/bot.py#L44)

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

## Intents to Actions

This section illustrates how a simple interface for actions and predictions allows bots to react confidently. Ambient presence helps bots learn intent, use prompts based on business logic, and generate responses. The prompt outlines the bot's actions and provides examples.

Conversation history enables natural dialogue. For example, the sequence *add cereal to groceries list* followed by *also add coffee* indicates that coffee should be added to the list.

Below is a conversation demonstrating bot logic. The AI assistant can manage lists and recognizes the following commands:

- DO `<action> <optional entities>`
- SAY `<response>`

Supported actions include:

- `addItem list="<list name>" item="<text>"`
- `removeItem list="<list name>" item="<text>"`
- `summarizeLists`

All entities are required parameters.

- Current list names:

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
    Human: do we have milk
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

- Conversation history:

    ```
    {{conversation.(history}} 
    ```

- Current query:

    ```
    Human: {{activity.text}} 
    ```

- Current list names:

    ```javascript
    {{conversation.listNames}}
    ```

- AI: The bot logic is streamlined to include handlers for actions such as `addItem` and `removeItem`. This clear distinction between actions and prompts empowers the AI to execute operations while guiding user interactions.

#### .NET Sample

- [Code sample](https://github.com/microsoft/teams-ai/tree/main/dotnet/samples/04.ai.d.chainedActions.listBot)
- [Sample code reference](https://github.com/microsoft/teams-ai/blob/main/dotnet/samples/04.ai.d.chainedActions.listBot/ListBotActions.cs#L40)

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

#### JavaScript Sample

- [Code sample](https://github.com/microsoft/teams-ai/tree/main/js/samples/03.ai-concepts/d.chainedActions-listBot)
- [Sample code reference](https://github.com/microsoft/teams-ai/blob/main/js/samples/03.ai-concepts/d.chainedActions-listBot/src/index.ts#L161)

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

#### Python Sample

- [Code sample](https://github.com/microsoft/teams-ai/tree/main/python/samples/04.ai.d.chainedActions.listBot)
- [Sample code reference](https://github.com/microsoft/teams-ai/blob/main/python/samples/04.ai.d.chainedActions.listBot/src/bot.py#L96C1-L123C57)

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

## Next Step

> [!div class="nextstepaction"]
> [Build a custom engine agent](../../../Teams-AI-library-tutorial.yml)