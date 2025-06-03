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

Teams AI library simplifies building intelligent Microsoft Teams applications with AI components. It offers APIs for data access and custom UI creation. You integrate prompt management and safety moderation easily, and create bots using OpenAI or Azure OpenAI for an AI-driven experience.

## Initial setup

Teams AI library builds on top of the Bot Framework SDK and uses its fundamentals to extend the SDK's capabilities. As part of the initial setup, import the Bot Framework SDK functionalities. The adapter class that handles connectivity with the channels imports from [Bot Framework SDK](/azure/bot-service/bot-builder-basics?view=azure-bot-service-4.0&preserve-view=true#the-bot-adapter).

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
// Note: Some classes expect a BotAdapter and some expect a BotFrameworkHttpAdapter, so
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
import path from 'path';
import { config } from 'dotenv';

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

Create AI components within an existing bot app or within a new Bot Framework app. The components include:

* **OpenAIModel**: Provides access to the OpenAI API or any other service following the OpenAI REST format. Compatible with both OpenAI and Azure OpenAI language models.
* **Prompt manager**: Handles prompt creation. It calls functions and injects code into the prompt. It automatically copies conversation state and user state into the prompt.
* **ActionPlanner**: Acts as the main component calling your Large Language Model (LLM). It provides features to enhance and customize your model and generates and executes plans based on the user's input and available actions.

# [.NET](#tab/dotnet2)

[Sample code reference](https://github.com/microsoft/teams-ai/blob/main/dotnet/samples/04.ai.c.actionMapping.lightBot/Program.cs#L33)

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

The application object manages the conversation and user state of your bot automatically.

* **Storage**: Create a storage provider to store the conversation and user state for your bot.
* **Application**: Register actions or activity handlers in the `Application` class, which contains all the bot logic and required information.

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

The `TurnStateFactory` enables creation of a custom state class for your app to store additional information or logic. Override default properties like user input, bot output, or conversation history. Create a class that extends the default turn state and pass a function that creates an instance of your class into the app constructor.

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

The `MemoryStorage()` function stores your bot's state. The `Application` class replaces the Teams Activity Handler class. You configure your `ai` by adding the planner, moderator, prompt manager, default prompt, and history. The `ai` object passes into the `Application` and receives both the AI components and the default prompt defined earlier.

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

A vector data source simplifies adding retrieval-augmented generation (RAG) to any prompt. Register a named data source with the planner and specify it in the prompt's `config.json` file to augment the prompt. This setup allows AI to inject relevant information from external sources such as vector databases or cognitive search into the prompt.

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

An Embedding is a vector generated by an LLM that represents text by capturing its semantic meaning in a compact form. Use embeddings in tasks like text classification, sentiment analysis, and search. The model for generating embeddings differs from the foundational LLMs. For instance, OpenAI's text-embedding-ada-002 model returns a list of 1536 numbers representing the input text. Store these embeddings in a vector database. In a custom engine agent, implement the RAG pattern by retrieving relevant data from the vector database and augmenting the prompt with this information.

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
     * This parameter designates the root folder for all local indexes and the index itself
     * exists in a subfolder under this folder.
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

        // Add documents until tokens limit is reached
        let length = 0;
        let output = '';
        let connector = '';
        for (const result of results) {
            // Start a new document entry
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

            // Append document to output
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

Prompts are text blocks used to create conversational experiences such as starting conversations, asking questions, and generating responses. A new object-based prompt system divides prompts into sections, with each section having its own token budget that stays fixed or proportionally adjusts to the remaining tokens. You generate prompts for both the Text Completion and Chat Completion style APIs.

Follow these guidelines to create effective prompts:

* Provide clear instructions, examples, or both.
* Ensure data quality with sufficient examples and proper proofreading. The model sometimes interprets spelling mistakes as intentional.
* Adjust prompt settings using `temperature` and `top_p` to control output randomness. A higher temperature (e.g., 0.8) produces more random output, whereas a lower temperature (e.g., 0.2) yields focused and deterministic responses.

Within a folder named prompts, create the required files:

* `skprompt.txt`: Contains the prompts text and supports template variables and functions.
* `config.json`: Contains the prompt model settings to ensure bot responses meet your requirements.

[Sample code reference](https://github.com/microsoft/teams-ai/blob/main/js/samples/03.ai-concepts/c.actionMapping.lightBot/src/prompts/tools/config.json)

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
        "augmentation_type": "sequence",
        "data_sources": {
            "teams-ai": 1200
        }
    }
}
```

### Query parameters

The following table lists the query parameters:

| **Value**              | **Description**                                                                                                                                                                                                                                                                                                                                                |
|------------------------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `model`                | ID of the model to use.                                                                                                                                                                                                                                                                                                                                        |
| `completion_type`      | The type of completion to use for your model. The model returns one or more predicted completions along with probabilities for alternative tokens. Supported options are `chat` and `text`. Default is `chat`.                                                                                                                                           |
| `include_history`      | Boolean value indicating whether to include conversation history. Each prompt manages its own conversation history to ensure clarity for the model.                                                                                                                                                                                                          |
| `include_input`        | Boolean value that indicates whether to include the user's input in the prompt.                                                                                                                                                                                                                                                                              |
| `max_input_tokens`     | The maximum number of tokens allowed for input. The maximum tokens supported is 4000.                                                                                                                                                                                                                                                                          |
| `max_tokens`           | The maximum number of tokens to generate during completion. The sum of prompt token count and `max_tokens` cannot exceed the model's context length.                                                                                                                                                                                                           |
| `temperature`          | Sampling temperature that varies between 0 and 2. A higher value (e.g., 0.8) produces more random output, while a lower value (e.g., 0.2) makes the output more focused and deterministic.                                                                                                                                                              |
| `top_p`                | Alternative to temperature sampling, called nucleus sampling. A value such as 0.1 means the model considers only the tokens that make up the top 10% of the probability mass.                                                                                                                                                                             |
| `presence_penalty`     | A number between -2.0 and 2.0. Positive values penalize new tokens based on whether they appear in the text so far, thereby increasing the likelihood to cover new topics.                                                                                                                                                                               |
| `frequency_penalty`    | A number between -2.0 and 2.0. Positive values penalize new tokens based on their frequency in the text so far, reducing the likelihood of repeating the same line verbatim.                                                                                                                                                                          |
| `stop_sequences`       | Up to four sequences at which the API stops generating further tokens; these sequences are not included in the returned text.                                                                                                                                                                                                                                 |
| `augmentation_type`    | The type of augmentation. Supported values include `sequence`, `monologue`, and `tools`.                                                                                                                                                                                                                                                                      |

### Prompt management

Prompt management adjusts the size and content of prompts based on the token budget and data sources. For instance, for a bot with a 4000-token limit that allocates 2800 tokens for input and 1000 tokens for output, the system manages the context window to remain within 3800 tokens. It starts with 100 tokens of text, adds 1200 tokens from data sources, and allocates the remaining tokens to conversation history and input. This process ensures that the model never exceeds 2800 tokens for input.

### Prompt actions

Plans allow the model to perform actions or respond to the user. Create a schema for the plan and add a list of supported actions. The OpenAI endpoint determines the necessary actions, extracts entities, and passes them as arguments for the action call.

Example prompt snippet:

```text
The following is a conversation with an AI assistant.
The assistant can turn a light on or off.

context:
The lights are currently {{getLightStatus}}.
```

### Prompt template

A prompt template is a powerful method to define and compose AI functions using plain text. Use natural language to generate responses, extract information, invoke other prompts, or perform any text-based task.

Support features include:

* ``{{function}}``: Calls a registered function and inserts its returned string.
* ``{{$input}}``: Inserts the message text from state.temp.input.
* ``{{$state.[property]}}``: Inserts a state property.

Teams parses the template and executes the embedded logic, integrating AI into your apps with minimal effort and maximum flexibility.

## Actions

Actions handle events triggered by AI components.

The built-in action handlers `FlaggedInputAction` and `FlaggedOutputAction` process moderator flags. When the moderator flags an incoming message, it redirects to the `FlaggedInputAction` handler, and `context.sendActivity` sends a message informing the user about the flag. To stop further processing, include `AI.StopCommandName` in the action.

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

Action handlers help users achieve their goals as defined by user intents. Register the actions in the prompt configuration first and then create a handler for each action, including unknown actions.

In an example light bot, actions include `LightsOn`, `LightsOff`, and `Pause`. Each action returns a string response. If the bot needs to return a time value, the framework parses the time and converts it to a number automatically. The `PauseParameters` property ensures the returned time remains in number format without pausing the prompt.

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
        // Parse entities returned by the model. Expect "time" to represent milliseconds.
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

Using sequence, monologue, or tools augmentation prevents the model from hallucinating invalid function names, action names, or parameters. Create an actions file to:

* Define actions for prompt augmentation.
* Indicate when to perform actions.

Sequence augmentation suits multi-step or complex tasks, while monologue augmentation fits tasks that require natural language understanding, flexibility, and creativity.

In an example light bot, the `actions.json` file contains a list of all the actions the bot performs:

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

Parameters:

* `name`: Name of the action (required).
* `description`: A description of the action (optional).
* `parameters`: A JSON schema object listing the required parameters.

A feedback loop allows the model to validate, correct, or refine its responses. For a `sequence` augmentation, disable looping using either:

* Setting `allow_looping?` to `false` in the `AIOptions` definition.
* Setting `max_repair_attempts` to `0` in the index.ts file.

#### Manage history

Use `MaxHistoryMessages` and `MaxConversationHistoryTokens` arguments to let the AI library manage conversation history automatically.

### Feedback loop

A feedback loop monitors and improves the bot's interactions, ensuring more effective and user-friendly performance. The loop includes:

* **Repair Loop**: Activates when the model's response is inadequate. The conversation history forks, allowing the system to try alternative solutions without affecting the main conversation.
* **Validation**: Verifies the corrected response and reinserts it into the conversation if validated.
* **Learn from Mistakes**: The model learns from correct examples to avoid repeating errors.
* **Handle Complex Commands**: The model adapts to become better at managing complex commands over time.

## Upgrade your conventional bot to custom engine agent

If you already have a bot on Teams, upgrade it to a custom engine agent that supports streaming, citations, and AI labels. This upgrade aligns your bot with the conversational AI UX paradigm and creates a consistent experience with declarative agents.

> [!NOTE]
>
> Custom engine agent isn't supported in Python.

To upgrade your bot to a custom engine agent, complete these tasks:

| To-Do List                                      | Supporting docs                                                                                                                                                                                                                                             |
|-------------------------------------------------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Update the AI SDK versions                      | • For JavaScript, update the version to [v1.6.1](https://www.npmjs.com/package/@microsoft/teams-ai). <br> • For C#, update the version to [v1.8.1](https://www.nuget.org/packages/Microsoft.Teams.AI/1.8.1).                                           |
| Enable streaming for bot                        | [Stream bot messages](../../streaming-ux.md)                                                                                                                                                                                                               |
| Use AI labels to identify messages as AI-generated | [AI labels](../bot-messages-ai-generated-content.md#ai-label)                                                                                                                                                                                              |
| Use citations to refer to source through in-text citations and references | [Citations](../bot-messages-ai-generated-content.md#citations)                                                                                                                                                                                               |

## Add support for Microsoft 365 Copilot Chat

Add support for custom engine agents in Microsoft 365 Copilot Chat. You also preview support for asynchronous patterns, including follow-up messages and long-running tasks. For more information, see [asynchronous patterns](/microsoft-365-copilot/extensibility/ux-custom-engine-agent).

To enable support for Microsoft 365 Copilot Chat, insert the following into your app manifest:

1. Add the `copilotAgents` property with the `customEngineAgents` sub-property into your [app manifest](../../../resources/schema/manifest-schema-dev-preview.md#customengineagents):

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

2. In your app manifest, set the `scopes` to `personal` for both `bots` and `commandLists`:

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
          ]
        }
    ],
    ```

> [!NOTE]
>
> * Microsoft 365 Copilot Chat adds an AI-generated label to every response from your custom engine agent.
> * For bots built with Microsoft 365 Agents Toolkit (previously Teams Toolkit), follow the [step-by-step guide](../../../Teams-AI-library-tutorial.yml) to add support.
> * For single-sign on (SSO) authentication in your custom engine agent, see [update Microsoft Entra app registration for SSO](../../../m365-apps/extend-m365-teams-personal-tab.md#update-microsoft-entra-app-registration-for-sso). Note that SSO authentication for custom engine agents isn't supported for the Outlook client.

## Elevate your conventional bot to use AI

Elevate your conventional bot by adding an AI layer to enable AI-powered features. The code snippet demonstrates how to incorporate AI components into a bot. In this example, the bot uses the Bot Framework adapter to handle incoming requests and then processes them through the AI layer using the `app` object.

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
    // Route received request to adapter for processing
    await adapter.process(req, res as any, async (context) => {
        // Dispatch to application for routing
        await app.run(context);
    });
});
```

## Migrate your bot to use Teams AI library

If you created your bot app using the Bot Framework SDK, switch to Teams AI library to access advanced AI features. This migration provides benefits such as:

* An advanced AI system for creating complex Teams applications powered by LLM.
* Integrated user authentication, simplifying setup.
* Leverage existing Bot Framework SDK tools and concepts for easier migration.
* Support for the latest tools and APIs in the LLM space.

In Teams AI library, the `Application` object replaces the traditional `ActivityHandler` object. This object supports a simpler, fluent style of bot authoring compared to the inheritance-based `ActivityHandler` class. It embeds built-in support for:

* Invoking Teams AI library’s system to create LLM-powered bots.
* Configuring user authentication for accessing third-party user data.

Select one of the following migration guides based on your bot's language:

| Migrate a Bot Framework SDK app ... | To use Teams AI library ... |
| ----------------------------------- | --------------------------- |
| A bot app built using JavaScript    | [Migrate](https://github.com/microsoft/teams-ai/blob/b34bbd14e9d13aed140686e4f91dbb673982b1cf/getting-started/MIGRATION/01.JS.md) |
| A bot app built using C#              | [Migrate](https://github.com/microsoft/teams-ai/blob/b34bbd14e9d13aed140686e4f91dbb673982b1cf/getting-started/MIGRATION/02.DOTNET.md) |
| A bot app using Python              | [Migrate](https://github.com/microsoft/teams-ai/blob/b34bbd14e9d13aed140686e4f91dbb673982b1cf/getting-started/MIGRATION/03.PYTHON.md) |

## Code sample

| **Sample name**              | **Description**                                                                                         | **.NET**                                                                                                                        | **Node.js**                                                                                                                     |
| ---------------------------- | ------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------- |
| Action mapping lightbot      | Demonstrates how LightBot interprets user intent to control a light bot effectively.                    | [View](https://github.com/microsoft/teams-ai/tree/main/dotnet/samples/04.ai.c.actionMapping.lightBot)                           | [View](https://github.com/microsoft/teams-ai/tree/main/js/samples/03.ai-concepts/c.actionMapping-lightBot)                       |

## Next step

Choose one of the following options:

> [!div class="nextstepaction"]
> If you want to try creating a scenario-based custom engine agent using Agents Toolkit and Teams AI library, select:  
> [Advanced step-by-step guide](../../../sbs-Teams-AI.yml)
>
> [!div class="nextstepaction"]
> If you want to learn about the core capabilities of Teams AI library, select:  
> [Understand Teams AI library](how-conversation-ai-core-capabilities.md)