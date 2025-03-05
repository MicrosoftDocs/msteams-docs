---
title: Use Teams AI Library to Build Apps/Bots
description: Learn how to create an app using Teams AI library with AI component, storage, register data source, migrate bot, prompts, and actions.
ms.localizationpriority: medium
ms.topic: overview
ms.author: surbhigupta
ms.date: 02/06/2025
---

# Build with Teams AI library

Teams AI library simplifies building intelligent Microsoft Teams applications with AI components. It offers APIs for data access and custom UI creation. You can easily integrate prompt management and safety moderation, and create bots using OpenAI or Azure OpenAI for an AI-driven experience.

## Initial setup

Teams AI library is built on top of the Bot Framework SDK and uses its fundamentals to offer an extension to the Bot Framework SDK capabilities. As part of the initial setup, it's important to import the Bot Framework SDK functionalities. The adapter class that handles connectivity with the channels is imported from [Bot Framework SDK](/azure/bot-service/bot-builder-basics?view=azure-bot-service-4.0&preserve-view=true#the-bot-adapter).

# [.NET](#tab/dotnet1)

[Sample code reference](https://github.com/microsoft/teams-ai/blob/main/dotnet/samples/04.ai.a.teamsChefBot/Program.cs)

```csharp
using Microsoft.Teams.AI;
using Microsoft.Bot.Builder;
using Microsoft.Bot.Builder.Integration.AspNet.Core;
using Microsoft.Bot.Connector.Authentication;
using Microsoft.TeamsFx.Conversation;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers();
builder.Services.AddHttpClient("WebClient", client => client.Timeout = TimeSpan.FromSeconds(600));
builder.Services.AddHttpContextAccessor();

// Prepare Configuration for ConfigurationBotFrameworkAuthentication
var config = builder.Configuration.Get<ConfigOptions>();
builder.Configuration["MicrosoftAppType"] = "MultiTenant";
builder.Configuration["MicrosoftAppId"] = config.BOT_ID;
builder.Configuration["MicrosoftAppPassword"] = config.BOT_PASSWORD;

// Create the Bot Framework Authentication to be used with the Bot Adapter.
builder.Services.AddSingleton<BotFrameworkAuthentication, ConfigurationBotFrameworkAuthentication>();

// Create the Cloud Adapter with error handling enabled.
// Note: some classes expect a BotAdapter and some expect a BotFrameworkHttpAdapter, so
// register the same adapter instance for all types.
builder.Services.AddSingleton<CloudAdapter, AdapterWithErrorHandler>();
builder.Services.AddSingleton<IBotFrameworkHttpAdapter>(sp => sp.GetService<CloudAdapter>());
builder.Services.AddSingleton<BotAdapter>(sp => sp.GetService<CloudAdapter>());
```

# [JavaScript](#tab/javascript4)

[Sample code reference](https://github.com/microsoft/teams-ai/blob/main/js/samples/04.ai-apps/a.teamsChefBot/src/index.ts#L9)

```javascript
// Import required bot services.
// See https://aka.ms/bot-services to learn more about the different parts of a bot.
import {
    CloudAdapter,
    ConfigurationBotFrameworkAuthentication,
    ConfigurationServiceClientCredentialFactory,
    MemoryStorage,
    TurnContext
} from 'botbuilder';

// Read botFilePath and botFileSecret from .env file.
const ENV_FILE = path.join(__dirname, '..', '.env');
config({ path: ENV_FILE });

const botFrameworkAuthentication = new ConfigurationBotFrameworkAuthentication(
    {},
    new ConfigurationServiceClientCredentialFactory({
        MicrosoftAppId: process.env.BOT_ID,
        MicrosoftAppPassword: process.env.BOT_PASSWORD,
        MicrosoftAppType: 'MultiTenant'
    })
);

// Create adapter.
// See https://aka.ms/about-bot-adapter to learn more about how bots work.
const adapter = new CloudAdapter(botFrameworkAuthentication);

```

# [Python](#tab/python4)

[Sample code reference](https://github.com/microsoft/teams-ai/blob/main/python/samples/01.messaging.a.echoBot/src/bot.py#L8C1-L23C2)

```python
import sys
import traceback

from botbuilder.core import TurnContext
from teams import Application, ApplicationOptions, TeamsAdapter
from teams.state import TurnState

from config import Config

config = Config()
app = Application[TurnState](
    ApplicationOptions(
        bot_app_id=config.APP_ID,
        adapter=TeamsAdapter(config),
    )
)
```

---

### Import Teams AI library

Import all the classes from `@microsoft/teams-ai` to build your bot and use Teams AI library capabilities.

[Sample code reference](https://github.com/microsoft/teams-ai/blob/main/js/samples/04.ai-apps/a.teamsChefBot/src/index.ts#L13)

```javascript
// import Teams AI library
import {
    AI,
    Application,
    ActionPlanner,
    OpenAIModerator,
    OpenAIModel,
    PromptManager,
    TurnState
} from '@microsoft/teams-ai';
import { addResponseFormatter } from './responseFormatter';
import { VectraDataSource } from './VectraDataSource';
```

## Create AI components

Create AI components in an existing bot app or in a new Bot Framework app:

* **OpenAIModel**: The OpenAIModel class provides a way to access the OpenAI API or any other service, which adheres to the OpenAI REST format. It's compatible with both OpenAI and Azure OpenAI language models.

* **Prompt manager**: The prompt manager handles prompt creation. It calls functions and injects  from your code into the prompt. It copies the conversation state and the user state into the prompt for you automatically.

* **ActionPlanner**: The ActionPlanner is the main component calling your Large Language Model (LLM) and includes several features to enhance and customize your model. It's responsible for generating and executing plans based on the user's input and the available actions.

# [.NET](#tab/dotnet2)

[Sample code reference](https://github.com/microsoft/teams-ai/blob/main/dotnet/samples/04.ai.c.actionMapping.lightBot/Program.cs#L33).

```csharp
    // Create model
    
    OpenAIModel? model = null;
    
    if (!string.IsNullOrEmpty(config.OpenAI?.ApiKey))
    {
        model = new(new OpenAIModelOptions(config.OpenAI.ApiKey, "gpt-3.5-turbo"));
    }
    else if (!string.IsNullOrEmpty(config.Azure?.OpenAIApiKey) && !string.IsNullOrEmpty(config.Azure.OpenAIEndpoint))
    {
        model = new(new AzureOpenAIModelOptions(
            config.Azure.OpenAIApiKey,
            "gpt-35-turbo",
            config.Azure.OpenAIEndpoint
        ));
    }
    
    if (model == null)
    {
        throw new Exception("please configure settings for either OpenAI or Azure");
    }

    // Create prompt manager
    PromptManager prompts = new(new()
    {
        PromptFolder = "./Prompts",
    });

    // Add function to be referenced in the prompt template

    prompts.AddFunction("getLightStatus", async (context, memory, functions, tokenizer, args) =>
    {
        bool lightsOn = (bool)(memory.GetValue("conversation.lightsOn") ?? false);
        return await Task.FromResult(lightsOn ? "on" : "off");
    });

    // Create ActionPlanner
    ActionPlanner<AppState> planner = new(
        options: new(
            model: model,
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

```

# [JavaScript](#tab/javascript1)

[Sample code reference](https://github.com/microsoft/teams-ai/blob/main/js/samples/03.ai-concepts/c.actionMapping-lightBot/src/index.ts#L86)

```javascript
/// Create AI components
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
    defaultPrompt: 'chat',
});

```

# [Python](#tab/python1)

[Sample code reference](https://github.com/microsoft/teams-ai/blob/main/python/samples/04.ai.c.actionMapping.lightBot/src/bot.py#L35)

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

## Define storage and application

The application object automatically manages the conversation and user state of your bot.

* **Storage**: Create a storage provider to store the conversation and the user state for your bot.

* **Application**: Register actions or activity handlers for the app in the `Application` class, which has all the information and bot logic required for your app.

# [.NET](#tab/dotnet3)

[Sample code reference](https://github.com/microsoft/teams-ai/blob/main/dotnet/samples/04.ai.c.actionMapping.lightBot/Program.cs#L99)

```csharp
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
```

`TurnStateFactory` allows you to create a custom state class for your app to store extra information or logic for your bot. You can override default properties like user input, bot output, or conversation history. To use it, create a class that extends the default turn state and pass a function that creates an instance of your class to the app constructor.

# [JavaScript](#tab/javascript3)

[Sample code reference](https://github.com/microsoft/teams-ai/blob/main/js/samples/03.ai-concepts/c.actionMapping-lightBot/src/index.ts#L112)

```javascript
// Define storage and application
const storage = new MemoryStorage();
const app = new Application<ApplicationTurnState>({
    storage,
    ai: {
        planner,
        // moderator
    }
});
```

The `MemoryStorage()` function stores your bot's state. The `Application` class replaces the Teams Activity Handler class. You can configure your `ai` by adding the planner, moderator, prompt manager, default prompt, and history. The `ai` object is then passed into the `Application`, which receives the AI components and the default prompt defined earlier.

# [Python](#tab/python3)

[Sample code reference](https://github.com/microsoft/teams-ai/blob/main/python/samples/04.ai.c.actionMapping.lightBot/src/bot.py#L52C1-L62C2)

```python
storage = MemoryStorage()
app = Application[AppTurnState](
    ApplicationOptions(
        bot_app_id=config.APP_ID,
        storage=storage,
        adapter=TeamsAdapter(config),
        ai=AIOptions(planner=ActionPlanner(
            ActionPlannerOptions(model=model, prompts=prompts, default_prompt="sequence")
        )),
    )
)
```

---

## Register data sources

A vector data source simplifies adding RAG to any prompt. Register a named data source with the planner and specify it in the prompt's `config.json` file to augment the prompt. This allows AI to inject relevant information from external sources such as vector databases or cognitive search into the prompt.

[Sample code reference](https://github.com/microsoft/teams-ai/blob/main/js/samples/04.ai-apps/a.teamsChefBot/src/index.ts#L118)

```typescript
// Register your data source with planner
planner.prompts.addDataSource(new VectraDataSource({
    name: 'teams-ai',
    apiKey:  process.env.OPENAI_API_KEY!,
    indexFolder: path.join(__dirname, '../index'),
}));
```

### Embeddings

An Embedding is a vector generated by an LLM that represents text, capturing its semantic meaning in a compact form. It's used in tasks like text classification, sentiment analysis, and search. The model for generating Embeddings is different from the foundational LLMs. OpenAI's **text-embedding-ada-002** model, for example, returns a list of 1536 numbers representing the input text. These embeddings are stored in a vector database. In a custom engine agent, the RAG pattern can be implemented by retrieving relevant data from the vector database and augmenting the prompt with this information.

<br/>
<details> <summary> The following is an example of a VectraDataSource and OpenAIEmbeddings:</summary>

```typescript
import { DataSource, Memory, RenderedPromptSection, Tokenizer } from '@microsoft/teams-ai';
import { OpenAIEmbeddings, LocalDocumentIndex } from 'vectra';
import * as path from 'path';
import { TurnContext } from 'botbuilder';

/**
 * Options for creating a `VectraDataSource`.
 */
export interface VectraDataSourceOptions {
    /**
     * Name of the data source and local index.
     */
    name: string;

    /**
     * OpenAI API key to use for generating embeddings.
     */
    apiKey: string;

    /**
     * Path to the folder containing the local index.
     * @remarks
     * This should be the root folder for all local indexes and the index itself
     * needs to be in a subfolder under this folder.
     */
    indexFolder: string;

    /**
     * Optional. Maximum number of documents to return.
     * @remarks
     * Defaults to `5`.
     */
    maxDocuments?: number;

    /**
     * Optional. Maximum number of chunks to return per document.
     * @remarks
     * Defaults to `50`.
     */
    maxChunks?: number;

    /**
     * Optional. Maximum number of tokens to return per document.
     * @remarks
     * Defaults to `600`.
     */
    maxTokensPerDocument?: number;
}

/**
 * A data source that uses a local Vectra index to inject text snippets into a prompt.
 */
export class VectraDataSource implements DataSource {
    private readonly _options: VectraDataSourceOptions;
    private readonly _index: LocalDocumentIndex;

    /**
     * Name of the data source.
     * @remarks
     * This is also the name of the local Vectra index.
     */
    public readonly name: string;

    /**
     * Creates a new `VectraDataSource` instance.
     * @param options Options for creating the data source.
     */
    public constructor(options: VectraDataSourceOptions) {
        this._options = options;
        this.name = options.name;

        // Create embeddings model
        const embeddings = new OpenAIEmbeddings({
            model: 'text-embedding-ada-002',
            apiKey: options.apiKey,
        });

        // Create local index
        this._index = new LocalDocumentIndex({
            embeddings,
            folderPath: path.join(options.indexFolder, options.name),
        });
    }

    /**
     * Renders the data source as a string of text.
     * @param context Turn context for the current turn of conversation with the user.
     * @param memory An interface for accessing state values.
     * @param tokenizer Tokenizer to use when rendering the data source.
     * @param maxTokens Maximum number of tokens allowed to be rendered.
     */
    public async renderData(context: TurnContext, memory: Memory, tokenizer: Tokenizer, maxTokens: number): Promise<RenderedPromptSection<string>> {
        // Query index
        const query = memory.getValue('temp.input') as string;
        const results = await this._index.queryDocuments(query, {
            maxDocuments: this._options.maxDocuments ?? 5,
            maxChunks: this._options.maxChunks ?? 50,
        });

        // Add documents until you run out of tokens
        let length = 0;
        let output = '';
        let connector = '';
        for (const result of results) {
            // Start a new doc
            let doc = `${connector}url: ${result.uri}\n`;
            let docLength = tokenizer.encode(doc).length;
            const remainingTokens = maxTokens - (length + docLength);
            if (remainingTokens <= 0) {
                break;
            }

            // Render document section
            const sections = await result.renderSections(Math.min(remainingTokens, this._options.maxTokensPerDocument ?? 600), 1);
            docLength += sections[0].tokenCount;
            doc += sections[0].text;

            // Append do to output
            output += doc;
            length += docLength;
            connector = '\n\n';
        }

        return { output, length, tooLong: length > maxTokens };
    }

}
```

</details>

## Prompts

Prompts are text pieces used to create conversational experiences, such as starting conversations, asking questions, and generating responses. They simplify the process of creating engaging interactions. A new object-based prompt system divides prompts into sections, each with its own token budget, which can either be a fixed set or proportional to the remaining tokens. You can generate prompts for both the Text Completion and Chat Completion style APIs.

To create effective prompts, follow these guidelines:

* Provide instructions, examples, or both.
* Ensure quality data with enough examples and proofread them. While the model can identify spelling errors, it might assume intentionality in spelling mistakes, affecting responses.
* Adjust prompt settings using `temperature` and `top_p` to control the model's response. Higher temperature such as 0.8 makes output random, while lower such as 0.2 makes it focused and deterministic.

Create a folder called prompts and define your prompts there. When the user interacts with the bot using a text prompt, it responds with a text completion. Create the following files in the prompts folder:

* `skprompt.txt`: Contains the prompts text and supports template variables and functions.
* `config.json`: Contains the prompt model settings that ensure bot responses align with your requirements

   [Sample code reference](https://github.com/microsoft/teams-ai/blob/main/js/samples/03.ai-concepts/c.actionMapping-lightBot/src/prompts/tools/config.json)

    ```json
     {
        "schema": 1.1,
        "description": "A bot that can turn the lights on and off",
        "type": "completion",
        "completion": {
            "model": "gpt-3.5-turbo",
            "completion_type": "chat",
            "include_history": true,
            "include_input": true,
            "max_input_tokens": 2800,
            "max_tokens": 1000,
            "temperature": 0.2,
            "top_p": 0.0,
            "presence_penalty": 0.6,
            "frequency_penalty": 0.0,
            "stop_sequences": []
        },
        "augmentation": {
            "augmentation_type": "sequence"
            "data_sources": {
                 "teams-ai": 1200
         }
        }
      }
    ```

### Query parameters

The following table includes the query parameters:

|**Value**  |**Description**  |
|---------|---------|
|`model`|ID of the model to use.|
|`completion_type`|The type of completion you would like to use for your model. Given a prompt, the model returns one or more predicted completions along with the probabilities of alternative tokens at each position. <br> Supported options: `chat` and `text`. <br> Default: `chat`.|
|`include_history`| Boolean value. If you want to include history. Each prompt gets its own separate conversation history to make sure that the model doesn't get confused.|
|`include_input`|Boolean value. If you want to include user's input in the prompt. |
|`max_input_tokens`|The maximum number of tokens for input. Maximum tokens supported is 4000.|
|`max_tokens` | The maximum number of tokens to generate in the completion. The token count of your prompt plus `max_tokens` can't exceed the model's context length. |
|`temperature` | Sampling temperature to use between 0 and 2. A higher value such as 0.8 makes the output more random, while a lower value such as 0.2 makes it more focused and deterministic.        |
|`top_p`    |An alternative to sampling with temperature, called nucleus sampling, where the model considers the results of the tokens with `top_p` probability mass. Therefore, 0.1 means only the tokens comprising the top 10% probability mass are considered.         |
|`presence_penalty`     |  Number between -2.0 and 2.0. Positive values penalize new tokens based on whether they appear in the text so far, increasing the model's likelihood to talk about new topics.       |
|`frequency_penalty`     |Number between -2.0 and 2.0. Positive values penalize new tokens based on their existing frequency in the text so far, decreasing the model's likelihood to repeat the same line verbatim.         |
|`stop_sequences`     |  Up to four sequences where the API stops generating further tokens. The returned text won't contain the stop sequence. |
|`augmentation_type`| The type of augmentation. Supported values are `sequence`, `monologue`, and `tools`.|

### Prompt management

Prompt management adjusts the size and content of prompts based on the token budget and data sources. For a bot with a 4,000-token limit, where 2,800 tokens are for input and 1,000 tokens are for output, the model manages the context window to stay within 3,800 tokens. It starts with 100 tokens of text and adds 1,200 tokens from data sources. It allocates the remaining 1,500 tokens to conversation history and input and ensures the model never exceeds 2,800 tokens.

### Prompt actions

Plans let the model perform actions or respond to the user. You can create a schema of the plan and add a list of actions that you support to perform an action and pass arguments. The OpenAI endpoint determines the necessary actions, extracts entities, and passes them as arguments to the action call.

```text
The following is a conversation with an AI assistant.
The assistant can turn a light on or off.

context:
The lights are currently {{getLightStatus}}.
  ```

### Prompt template

A prompt template is a simple and powerful way to define and compose AI functions using plain text. You can create natural language prompts, generate responses, extract information, invoke other prompts, or perform any text-based task.

The language supports features that allow you to include variables, call external functions, and pass parameters to functions. You don't need to write any code or import any external libraries, just use the curly braces {{...}} to embed expressions in your prompts. Teams parses your template and executes the logic behind it. This way, you can easily integrate AI into your apps with minimal effort and maximum flexibility.

* ``{{function}}``:  Calls a registered function and inserts its return value string.​

* ``{{$input}}``:  Inserts the message text. It gets its value from state.temp.input.

* ``{{$state.[property]}}``: Inserts state properties.

## Actions

Actions handle events triggered by AI components.

`FlaggedInputAction` and `FlaggedOutputAction` are the built-in action handlers to handle the moderator flags. If the moderator flags an incoming message input, the moderator redirects to the `FlaggedInputAction` handler and the `context.sendActivity` sends a message to the user about the flag. If you want to stop the action, you must add `AI.StopCommandName`.

[Sample code reference](https://github.com/microsoft/teams-ai/blob/main/js/samples/04.ai-apps/a.teamsChefBot/src/index.ts#L132)

```typescript
// Register other AI actions
app.ai.action(
    AI.FlaggedInputActionName,
    async (context: TurnContext, state: ApplicationTurnState, data: Record<string, any>) => {
        await context.sendActivity(`I'm sorry your message was flagged: ${JSON.stringify(data)}`);
        return AI.StopCommandName;
    }
);

app.ai.action(AI.FlaggedOutputActionName, async (context: TurnContext, state: ApplicationTurnState, data: any) => {
    await context.sendActivity(`I'm not allowed to talk about such things.`);
    return AI.StopCommandName;
});
```

### Register Action Handlers

Action handlers help users achieve the goals, which are shared in the user intents. One of the key aspects in action handlers is that you must first register the actions in the prompts and then register a handler for each action listed in the prompt, including the unknown actions.

In the following example of a light bot, we have the `LightsOn`, `LightsOff`, and `Pause` action. Every time an action is called, you return a `string`. If you require the bot to return time, you don't need to parse the time and convert it to a number. The `PauseParameters` property ensures that it returns time in number format without pausing the prompt.

# [.NET](#tab/dotnet4)

[Sample code reference](https://github.com/microsoft/teams-ai/blob/main/dotnet/samples/04.ai.c.actionMapping.lightBot/LightBotActions.cs)

```csharp
public class LightBotActions
    {
        [Action("LightsOn")]
        public async Task<string> LightsOn([ActionTurnContext] ITurnContext turnContext, [ActionTurnState] AppState turnState)
        {
            turnState.Conversation!.LightsOn = true;
            await turnContext.SendActivityAsync(MessageFactory.Text("[lights on]"));
            return "the lights are now on";
        }

        [Action("LightsOff")]
        public async Task<string> LightsOff([ActionTurnContext] ITurnContext turnContext, [ActionTurnState] AppState turnState)
        {
            turnState.Conversation!.LightsOn = false;
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

        [Action("LightStatus")]
        public async Task<string> LightStatus([ActionTurnContext] ITurnContext turnContext, [ActionTurnState] AppState turnState)
        {
            await turnContext.SendActivityAsync(ResponseGenerator.LightStatus(turnState.Conversation!.LightsOn));
            return turnState.Conversation!.LightsOn ? "the lights are on" : "the lights are off";
        }

        [Action(AIConstants.UnknownActionName)]
        public async Task<string> UnknownAction([ActionTurnContext] TurnContext turnContext, [ActionName] string action)
        {
            await turnContext.SendActivityAsync(ResponseGenerator.UnknownAction(action ?? "Unknown"));
            return "unknown action";
        }
    }
}

```

# [JavaScript](#tab/javascript2)

[Sample code reference](https://github.com/microsoft/teams-ai/blob/main/js/samples/03.ai-concepts/c.actionMapping-lightBot/src/index.ts#L126)

```javascript
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

# [Python](#tab/python2)

[Sample code reference](https://github.com/microsoft/teams-ai/blob/main/python/samples/04.ai.c.actionMapping.lightBot/src/bot.py#L85C1-L113C26)

```python
@app.ai.action("LightsOn")
async def on_lights_on(
    context: ActionTurnContext[Dict[str, Any]],
    state: AppTurnState,
):
    state.conversation.lights_on = True
    await context.send_activity("[lights on]")
    return "the lights are now on"


@app.ai.action("LightsOff")
async def on_lights_off(
    context: ActionTurnContext[Dict[str, Any]],
    state: AppTurnState,
):
    state.conversation.lights_on = False
    await context.send_activity("[lights off]")
    return "the lights are now off"


@app.ai.action("Pause")
async def on_pause(
    context: ActionTurnContext[Dict[str, Any]],
    _state: AppTurnState,
):
    time_ms = int(context.data["time"]) if context.data["time"] else 1000
    await context.send_activity(f"[pausing for {time_ms / 1000} seconds]")
    time.sleep(time_ms / 1000)
    return "done pausing"
```

---

Using sequence, monologue, or tools augmentation prevents the model from hallucinating invalid function names, action names, or parameters. Create an actions file to:

* Define actions for prompt augmentation.
* Indicate when to perform actions.

Sequence augmentation is ideal for multi-step or complex tasks, while monologue augmentation suits tasks needing natural language understanding, flexibility, and creativity.

In the following example of a light bot, the `actions.json` file has a list of all the actions the bot can perform:

```json
[
    {
        "name": "LightsOn",
        "description": "Turns on the lights"
    },
    {
        "name": "LightsOff",
        "description": "Turns off the lights"
    },
    {
        "name": "Pause",
        "description": "Delays for a period of time",
        "parameters": {
            "type": "object",
            "properties": {
                "time": {
                    "type": "number",
                    "description": "The amount of time to delay in milliseconds"
                }
            },
            "required": [
                "time"
            ]
        }
    }
]
```

* `name`: Name of the action. Required.
* `description`: Description of the action. Optional.
* `parameters`: Add a JSON schema object of the required parameters.

 Feedback loop is a model's response to validate, correct, or refine the answer to your question. If you're using a  `sequence` augmentation, you can disable looping to guard against any accidental looping in the following ways:

* You can set `allow_looping?` to `false` in the `AIOptions` definition.
* You can set `max_repair_attempts` to `0` in the `index.ts` file.

#### Manage history

You can use the `MaxHistoryMessages` and `MaxConversationHistoryTokens` arguments to allow the AI library to automatically manage your history.

### Feedback loop

A feedback loop helps monitor and improve the bot’s interactions, leading to more effective and user-friendly applications. Feedback is used to adjust and enhance the bot to meet user needs and expectations. A feedback loop includes:

* **Repair Loop**: Triggers if the model's response is inadequate. The conversation history forks, allowing the system to try different solutions without affecting the main conversation.
* **Validation**: Verifies the corrected response and reinserts it into the main conversation if the response is validated successfully.
* **Learn from Mistakes**: The model learns from correct behavior examples to avoid similar mistakes in the future.
* **Handle Complex Commands**: The model becomes capable of handling more complex commands after learning from its mistakes.

## Upgrade your conventional bot to custom engine agent

If you already have a bot on Teams, you can upgrade your existing bots to custom engine agent that support streaming, citations, and AI labels. This is required for the agent to align with the conversational AI UX paradigm and provide a consistent experience with declarative agents.

> [!NOTE]
> Custom engine agent support for Microsoft 365 Copilot chat is available only in [public developer preview](../../../resources/dev-preview/developer-preview-intro.md).

Here is the required to-do list to upgrade your bot to custom engine agent:

| To-Do List | Supporting docs |
| ---- | ---- |
| Update the AI SDK versions |  • If you are using JavaScript, update the version to [v1.6.1](https://www.npmjs.com/package/@microsoft/teams-ai).  <br> • If you are using Csharp, update the version to [v1.8.1](https://www.nuget.org/packages/Microsoft.Teams.AI/1.8.1). <br> • If you are using Python, update the version to [v1.5.0](https://pypi.org/project/teams-ai/1.5.0/). |
| Enable streaming for bot. | [Stream bot messages](../../streaming-ux.md) |
| Use AI labels to identify that the message was generated using AI. | [AI labels](../bot-messages-ai-generated-content.md#ai-label)|
| Use citations to refer to the source of the bot message through in-text citations and references.| [Citations](../bot-messages-ai-generated-content.md#citations)|

If you want your custom engine agent to support Microsoft 365 Copilot chat, add the following into your app manifest:

1. Add the app manifest property `copilotAgents` and its sub property `customEngineAgents` into your app manifest:

    ```json
    "copilotAgents": { 
        "customEngineAgents": [ 
          { 
            "type": "bot", 
            "id": "<Bot-Id-Guid>" 
          } 
        ] 
      }
    
    ```

1. In your app manifest, set the `scopes` as `personal`:

    ```json
    "bots": [ 
        { 
          "botId": "<Bot-Id-Guid>", 
          "scopes": ["groupChat"], 
          "commandLists": [ 
            { 
              "scopes": ["personal"], 
              "commands": [ 
                { 
                  "title": "Sample prompt title", 
                  "description": "Description of sample prompt" 
                } 
              ] 
            }, 
            { 
              "scopes": ["personal"], 
              "commands": [ 
                { 
                  "title": "Sample prompt title", 
                  "description": "Description of sample prompt" 
                } 
              ] 
            } 
          ], 
        } 
      ], 
    
    ```

> [!NOTE]
>
> * Microsoft 365 Copilot chat adds an AI-generated label to every response that the custom engine agent sends.
> * If you have built your conventional bot using Teams Toolkit and you want to add support for Microsoft 365 Copilot chat, follow the [step-by-step guide](../../../Teams-AI-library-tutorial.yml).

## Elevate your conventional bot to use AI

You can elevate your existing conventional bot to be powered by AI. After you build your bot, you can add an AI layer to enable AI-powered features for your bot.

The following code snippet demonstrates how you can add AI components to a bot. In this example, the bot uses the Bot framework adapter to handle incoming requests and then runs the AI layer using the `app` object.

```JavaScript
// Create AI components
const model = new OpenAIModel({
    // OpenAI Support
    apiKey: process.env.OPENAI_KEY!,
    defaultModel: 'gpt-4o',

    // Azure OpenAI Support
    azureApiKey: process.env.AZURE_OPENAI_KEY!,
    azureDefaultDeployment: 'gpt-4o',
    azureEndpoint: process.env.AZURE_OPENAI_ENDPOINT!,
    azureApiVersion: '2023-03-15-preview',

    // Request logging
    logRequests: true
});

const prompts = new PromptManager({
    promptsFolder: path.join(__dirname, '../src/prompts')
});

// Define a prompt function for getting the current status of the lights
prompts.addFunction('getLightStatus', async (context: TurnContext, memory: Memory) => {
    return memory.getValue('conversation.lightsOn') ? 'on' : 'off';
});

const planner = new ActionPlanner({
    model,
    prompts,
    defaultPrompt: 'tools'
});

// Define storage and application
const storage = new MemoryStorage();
const app = new Application<ApplicationTurnState>({
    storage,
    ai: {
        planner
    }
});

app.ai.action('LightStatus', async (context: TurnContext, state: ApplicationTurnState) => {
    const status = state.conversation.lightsOn ? 'on' : 'off';
    return `the lights are ${status}`;
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

// Listen for incoming server requests.
server.post('/api/messages', async (req, res) => {
    // Route received a request to adapter for processing
    await adapter.process(req, res as any, async (context) => {
        // Dispatch to application for routing
        await app.run(context);
    });
});
```

## Migrate your bot to use Teams AI library

If you created your bot app with Bot Framework SDK, you can switch to Teams AI library to use its advanced AI features. This migration provides the following benefits:

* Advanced AI system for creating complex Teams applications powered by LLM.
* User authentication is integrated into the library, making setup easier.
* Built on Bot Framework SDK tools and concepts, enabling the existing knowledge to be transferable.
* Supports the latest tools and APIs in the LLM space.

In Teams AI library, the `Application` object replaces the traditional `ActivityHandler` object, supporting a simpler, fluent style of bot authoring compared to the inheritance-based `ActivityHandler` class. It includes built-in support for:

* Calling into Teams AI library's system for creating bots that use LLM and other AI capabilities.
* Configuring user authentication for accessing third-party user data.

Use one of the following to migrate your bot app to use Teams AI library:

| Migrate a Bot Framework SDK app ... | To use Teams AI library ... |
| --- | --- |
| A bot app built using JavaScript | [Migrate](https://github.com/microsoft/teams-ai/blob/b34bbd14e9d13aed140686e4f91dbb673982b1cf/getting-started/MIGRATION/01.JS.md) |
| A bot app built using C# | [Migrate](https://github.com/microsoft/teams-ai/blob/b34bbd14e9d13aed140686e4f91dbb673982b1cf/getting-started/MIGRATION/02.DOTNET.md) |
| A bot app using Python | [Migrate](https://github.com/microsoft/teams-ai/blob/b34bbd14e9d13aed140686e4f91dbb673982b1cf/getting-started/MIGRATION/03.PYTHON.md) |

## Code sample

| **Sample name** | **Description** |**.NET** |**Node.js** |
| --- | --- | --- | --- |
| Action mapping lightbot | This example showcases how the LightBot understands user intent, accurately interpreting commands to effortlessly control light bot. | [View](https://github.com/microsoft/teams-ai/tree/main/dotnet/samples/04.ai.c.actionMapping.lightBot) | [View](https://github.com/microsoft/teams-ai/tree/main/js/samples/03.ai-concepts/c.actionMapping-lightBot)

## Next step

Choose one of the following as a next step:

> [!div class="nextstepaction"]
> If you want to try creating a scenario based custom engine agent using Teams Toolkit and Teams AI library, select the following: <br>
> [Advanced step-by-step guide](../../../sbs-Teams-AI.yml)
>
> [!div class="nextstepaction"]
> If you want to learn about the core capabilities of Teams AI library, select the following: <br>
> [Understand Teams AI library](how-conversation-ai-core-capabilities.md)
