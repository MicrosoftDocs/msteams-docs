---
title: Use Teams AI Library to Build Apps/Bots
description: Learn how to create an app using Teams AI library with AI component, storage, register data source, migrate bot, prompts, and actions.
ms.localizationpriority: medium
ms.topic: overview
ms.author: surbhigupta
ms.date: 02/06/2025
ms.owner: angovil
---

# Build with Teams AI library

The Teams AI library simplifies building intelligent Microsoft Teams applications with AI components. It offers APIs for data access, custom UI creation, prompt management, and safety moderation. You can easily create bots using OpenAI or Azure OpenAI to deliver an AI-driven experience.

## Initial setup

Teams AI library is built on top of the Bot Framework SDK. It extends the capabilities of the Bot Framework by importing core functionalities. As part of the initial setup, import the Bot Framework SDK components. The adapter class that handles connectivity with the channels is imported from [Bot Framework SDK](/azure/bot-service/bot-builder-basics?view=azure-bot-service-4.0&preserve-view=true#the-bot-adapter).

# [.NET](#tab/dotnet1)

[Sample code reference](https://github.com/microsoft/teams-ai/blob/main/dotnet/samples/04.ai.a.teamsChefBot/Program.cs)

### .NET Code: Initial Configuration and Adapter Setup

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

### JavaScript Code: Adapter Setup and Bot Framework Authentication

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

### Python Code: Adapter and Application Setup

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

Import all the classes from `@microsoft/teams-ai` to build your bot and use the Teams AI library capabilities.

[Sample code reference](https://github.com/microsoft/teams-ai/blob/main/js/samples/04.ai-apps/a.teamsChefBot/src/index.ts#L13)

### JavaScript Code: Importing Teams AI Library

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

You can create AI components in an existing bot app or in a new Bot Framework app. The main components include:

* **OpenAIModel**: Provides access to the OpenAI API—or any service following the OpenAI REST format. It works with both OpenAI and Azure OpenAI language models.
* **Prompt Manager**: Manages prompt creation. It inserts functions, conversation state, and user state into the prompt automatically.
* **ActionPlanner**: Calls your Large Language Model (LLM) and includes features for enhancing and customizing your model. This component generates and executes plans based on user input and available actions.

# [.NET](#tab/dotnet2)

[Sample code reference](https://github.com/microsoft/teams-ai/blob/main/dotnet/samples/04.ai.c.actionMapping.lightBot/Program.cs#L33).

### .NET Code: Creating AI Components

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

### JavaScript Code: Creating AI Components

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

### Python Code: Creating AI Components

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

The application object automatically manages the conversation and user state of your bot. It includes:

* **Storage**: A storage provider stores the conversation and user state.
* **Application**: The `Application` class registers actions or activity handlers for the app. It contains all the necessary information and bot logic.

# [.NET](#tab/dotnet3)

[Sample code reference](https://github.com/microsoft/teams-ai/blob/main/dotnet/samples/04.ai.c.actionMapping.lightBot/Program.cs#L99)

### .NET Code: Defining Storage and Application

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

The `TurnStateFactory` property lets you create a custom state class to store additional information or logic. Extend the default turn state by creating a class that includes additional properties (like user input, bot output, or conversation history) and pass a function that creates an instance of your class to the app constructor.

# [JavaScript](#tab/javascript3)

[Sample code reference](https://github.com/microsoft/teams-ai/blob/main/js/samples/03.ai-concepts/c.actionMapping-lightBot/src/index.ts#L112)

### JavaScript Code: Defining Storage and Application

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

Here, the `MemoryStorage()` function stores the bot’s state. The `Application` class replaces the Teams Activity Handler class. You can pass the AI configuration (planner, moderator, prompt manager, default prompt, and history) via the `ai` property.

# [Python](#tab/python3)

[Sample code reference](https://github.com/microsoft/teams-ai/blob/main/python/samples/04.ai.c.actionMapping.lightBot/src/bot.py#L52C1-L62C2)

### Python Code: Defining Storage and Application

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

A vector data source simplifies adding Retrieval-Augmented Generation (RAG) to any prompt. Register a named data source with the planner and specify it in the prompt's `config.json` file to augment the prompt. This allows the AI to inject relevant information from external sources (such as vector databases or cognitive search) into the prompt.

[Sample code reference](https://github.com/microsoft/teams-ai/blob/main/js/samples/04.ai-apps/a.teamsChefBot/src/index.ts#L118)

### JavaScript Code: Registering a Data Source with the Planner

```typescript
// Register your data source with planner
planner.prompts.addDataSource(new VectraDataSource({
    name: 'teams-ai',
    apiKey:  process.env.OPENAI_API_KEY!,
    indexFolder: path.join(__dirname, '../index'),
}));
```

### Embeddings

An embedding is a vector generated by an LLM to represent text, capturing its semantic meaning. Embeddings are used in text classification, sentiment analysis, search, and more. For example, OpenAI's `text-embedding-ada-002` model returns a list of 1536 numbers that represent the input text. These embeddings are stored in a vector database. In a custom engine agent, the RAG pattern can retrieve relevant data from the vector database and augment the prompt.

<br/>
<details> 
  <summary>Example: VectraDataSource and OpenAIEmbeddings</summary>

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

            // Append doc to output
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

Prompts are text segments used to create conversational experiences, such as initiating conversations, asking questions, and generating responses. The new object-based prompt system divides prompts into sections, each with its own token budget (either fixed or proportional to the remaining tokens). Prompts can be generated for both the Text Completion and Chat Completion style APIs.

Follow these guidelines to create effective prompts:

* Provide clear instructions and examples.
* Ensure high-quality, proofread data with sufficient examples.
* Adjust prompt settings using `temperature` and `top_p` to control the model’s output. Higher values (e.g., 0.8) yield random outputs; lower values (e.g., 0.2) create focused, deterministic responses.

To implement prompts:

1. Create a folder named `prompts`.
2. Define the prompt templates and settings in dedicated files:
   * `skprompt.txt`: Contains the prompt text with support for template variables and functions.
   * `config.json`: Contains the prompt model settings ensuring the bot's responses meet your requirements.

[Sample code reference](https://github.com/microsoft/teams-ai/blob/main/js/samples/03.ai-concepts/c.actionMapping-lightBot/src/prompts/tools/config.json)

### Example: `config.json` for Prompt Settings

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

The following table details the query parameters:

| **Value**               | **Description**                                                                                                                                                                                                                                                                                                             |
|-------------------------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `model`                 | ID of the model to use.                                                                                                                                                                                                                                                                                                     |
| `completion_type`       | The type of completion to use. The model returns one or more predicted completions and probability of alternative tokens. Supported options: `chat` and `text`. Default: `chat`.                                                                                                                                    |
| `include_history`       | Boolean value. Indicates whether to include history. Each prompt gets its own conversation history to avoid confusion.                                                                                                                                                                                                      |
| `include_input`         | Boolean value. If set to true, the user's input is included in the prompt.                                                                                                                                                                                                                                                |
| `max_input_tokens`      | Maximum number of tokens allowed for input. (Max supported tokens: 4000)                                                                                                                                                                                                                                                    |
| `max_tokens`            | Maximum number of tokens to generate. The sum of prompt tokens and `max_tokens` must not exceed the model's context length.                                                                                                                                                                                                  |
| `temperature`           | Sampling temperature (range: 0 to 2). Higher values (e.g., 0.8) yield more random output; lower values (e.g., 0.2) generate focused output.                                                                                                                                                                             |
| `top_p`                 | Alternative for sampling with temperature, known as nucleus sampling. For instance, a value of 0.1 means only tokens in the top 10% probability mass are considered.                                                                                                                                                 |
| `presence_penalty`      | Number between -2.0 and 2.0. Positive values penalize new tokens based on whether they appear in the text, encouraging discussion of new topics.                                                                                                                                                                          |
| `frequency_penalty`     | Number between -2.0 and 2.0. Positive values penalize tokens based on their frequency, reducing the likelihood of repetition.                                                                                                                                                                                               |
| `stop_sequences`        | Up to four sequences where the API stops generating tokens. The returned text does not include the stop sequences.                                                                                                                                                                                                         |
| `augmentation_type`     | The type of augmentation. Supported values are `sequence`, `monologue`, and `tools`.                                                                                                                                                                                                                                      |

### Prompt management

Prompt management dynamically adjusts prompt size and content based on the token budget and available data sources. For example, for a bot with a 4,000-token limit (2,800 for input and 1,000 for output), the model reserves tokens for conversation history, input, and any augmented data from external sources.

### Prompt actions

Prompt actions allow the model to perform actions or respond to user input. You can create a schema listing supported actions with corresponding parameters. The OpenAI endpoint extracts entities and passes them as arguments to the action handler.

For example:

```text
The following is a conversation with an AI assistant.
The assistant can turn a light on or off.

context:
The lights are currently {{getLightStatus}}.
```

### Prompt template

A prompt template defines and composes AI functions using plain text. It allows you to:

* Create natural language prompts.
* Generate responses.
* Extract information.
* Invoke other prompts.

The language supports embedding variables and functions using curly braces `{{...}}`. Some key expressions include:

* ``{{function}}``: Calls a registered function and inserts its return value.
* ``{{$input}}``: Inserts the user's message text, obtained from `state.temp.input`.
* ``{{$state.[property]}}``: Inserts state properties.

## Actions

Actions handle events triggered by AI components. The built-in `FlaggedInputAction` and `FlaggedOutputAction` handle moderator flags. When a message is flagged, the bot notifies the user via `context.sendActivity`. To stop the action, return `AI.StopCommandName`.

[Sample code reference](https://github.com/microsoft/teams-ai/blob/main/js/samples/04.ai-apps/a.teamsChefBot/src/index.ts#L132)

### JavaScript Code: Registering Flagged Input and Output Actions

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

Action handlers help the bot perform specific tasks. First, register actions in your prompt and then implement a handler for each action, including unknown actions.

In the following light bot example, the actions include `LightsOn`, `LightsOff`, and `Pause`. Each action handler returns a `string`. For actions returning time (e.g., pause duration), the `PauseParameters` property ensures the time is in number format.

# [.NET](#tab/dotnet4)

[Sample code reference](https://github.com/microsoft/teams-ai/blob/main/dotnet/samples/04.ai.c.actionMapping.lightBot/LightBotActions.cs)

### .NET Code: Action Handlers for LightBot

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

### JavaScript Code: Action Handlers for LightBot

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

### Python Code: Action Handlers for LightBot

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

For example, in a light bot, the `actions.json` file might list actions like this:

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

* `name`: Name of the action (required).
* `description`: Description of the action (optional).
* `parameters`: A JSON schema defining the required parameters.

A feedback loop helps validate, correct, and refine the bot’s interactions. For `sequence` augmentation, disable looping by either setting `allow_looping?` to `false` in `AIOptions` or setting `max_repair_attempts` to `0` in your implementation.

#### Manage history

Use the `MaxHistoryMessages` and `MaxConversationHistoryTokens` settings to allow the AI library to automatically manage conversation history.

### Feedback loop

A feedback loop monitors and improves bot interactions. It includes:

* **Repair Loop**: Forks the conversation history when a response is inadequate to try alternate solutions.
* **Validation**: Verifies the corrected response before merging it back into the conversation.
* **Learning**: Adjusts the bot's performance based on correct behavior examples.
* **Complex Commands Handling**: Enhances the model's ability to process complex commands over time.

## Upgrade your conventional bot to custom engine agent

If you already have a bot on Teams, you can upgrade it to a custom engine agent that supports streaming, citations, and AI labels. This upgrade aligns your bot with the conversational AI UX paradigm and provides a consistent experience with declarative agents.

> [!NOTE]
>
> * Custom engine agents are supported only in personal chats, group chats, and meetings.
> * Custom engine agent support for Microsoft 365 Copilot Chat is available only in [public developer preview](../../../resources/dev-preview/developer-preview-intro.md).
> * Custom engine agent isn't supported in Python.

Upgrade steps:

| To-Do List                                      | Supporting docs |
| ------------------------------------------------|-----------------|
| Update the AI SDK versions                      | • For JavaScript, update to [v1.6.1](https://www.npmjs.com/package/@microsoft/teams-ai).<br>• For C#, update to [v1.8.1](https://www.nuget.org/packages/Microsoft.Teams.AI/1.8.1). |
| Enable streaming for the bot.                   | [Stream bot messages](../../streaming-ux.md) |
| Use AI labels to indicate AI-generated messages.| [AI labels](../bot-messages-ai-generated-content.md#ai-label)|
| Use citations for source references.            | [Citations](../bot-messages-ai-generated-content.md#citations)|

## Add support for Microsoft 365 Copilot Chat

You can add support for custom engine agents in Microsoft 365 Copilot Chat. This includes support for asynchronous patterns such as follow-up messages and long-running tasks. For more details, see [asynchronous patterns](/microsoft-365-copilot/extensibility/ux-custom-engine-agent).

To support Microsoft 365 Copilot Chat, update your app manifest:

1. Add the `copilotAgents` property with a sub-property `customEngineAgents` to your [app manifest](../../../resources/schema/manifest-schema-dev-preview.md#customengineagents):

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
    
2. Set the `scopes` to `personal` for `bots` and `commandLists` in your app manifest:

    ```json
    "bots": [ 
        { 
          "botId": "<Bot-Id-Guid>", 
          "scopes": [
              "personal",
              "team",
              "groupChat"
          ], 
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
> * Microsoft 365 Copilot Chat adds an AI-generated label to every custom engine agent response.
> * For bots built with Microsoft 365 Agents Toolkit (formerly Teams Toolkit) wanting to support Microsoft 365 Copilot Chat, follow the [step-by-step guide](../../../Teams-AI-library-tutorial.yml).
> * Single-sign on (SSO) for custom engine agents is available but not supported for Outlook client. See [update Microsoft Entra app registration for SSO](../../../m365-apps/extend-m365-teams-personal-tab.md#update-microsoft-entra-app-registration-for-sso).

## Elevate your conventional bot to use AI

You can update your existing conventional bot to be powered by AI. Adding an AI layer enhances your bot with LLM-driven features. Below is an example of integrating the AI layer using the Bot Framework adapter and the `app` object.

### JavaScript Code: Elevating a Conventional Bot to Use AI

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

If you built your bot using the Bot Framework SDK, you can migrate to the Teams AI library to unlock advanced AI features. Migrating offers these benefits:

* Advanced AI system for building complex Teams applications powered by LLM.
* Integrated user authentication for accessing third-party user data.
* Leverages familiar Bot Framework SDK tools and concepts.
* Supports the latest LLM tools and APIs.

Choose the relevant migration guide for your bot's language:

| Migrate a Bot Framework SDK app ... | To use Teams AI library ... |
| ------------------------------------|-----------------------------|
| A bot app built using JavaScript    | [Migrate](https://github.com/microsoft/teams-ai/blob/b34bbd14e9d13aed140686e4f91dbb673982b1cf/getting-started/MIGRATION/01.JS.md) |
| A bot app built using C#             | [Migrate](https://github.com/microsoft/teams-ai/blob/b34bbd14e9d13aed140686e4f91dbb673982b1cf/getting-started/MIGRATION/02.DOTNET.md) |
| A bot app using Python               | [Migrate](https://github.com/microsoft/teams-ai/blob/b34bbd14e9d13aed140686e4f91dbb673982b1cf/getting-started/MIGRATION/03.PYTHON.md) |

## Code sample

| **Sample name**                | **Description**                                                                                     | **.NET**                                                                                                    | **Node.js**                                                                                                     |
|--------------------------------|-----------------------------------------------------------------------------------------------------|-------------------------------------------------------------------------------------------------------------|-----------------------------------------------------------------------------------------------------------------|
| Action mapping lightbot        | Demonstrates how LightBot understands user intent and controls the light bot based on commands.      | [View](https://github.com/microsoft/teams-ai/tree/main/dotnet/samples/04.ai.c.actionMapping.lightBot)       | [View](https://github.com/microsoft/teams-ai/tree/main/js/samples/03.ai-concepts/c.actionMapping-lightBot)         |

## Next step

> [!div class="nextstepaction"]
> If you want to try creating a scenario-based custom engine agent using the Agents Toolkit and Teams AI library, select the following: <br>
> [Advanced step-by-step guide](../../../sbs-Teams-AI.yml)
>
> [!div class="nextstepaction"]
> If you want to learn about the core capabilities of Teams AI library, select the following: <br>
> [Understand Teams AI library](how-conversation-ai-core-capabilities.md)
