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

The Teams AI library simplifies building intelligent Microsoft Teams applications by integrating AI components. It provides APIs for accessing data and creating custom UIs. You can also easily integrate prompt management, safety moderation, and build bots using OpenAI or Azure OpenAI for an AI-driven experience.

## Initial setup

The Teams AI library is built on top of the Bot Framework SDK and extends its capabilities. As part of the initial setup, import the necessary Bot Framework SDK functionalities. The adapter class that handles connectivity with the channels is imported from [Bot Framework SDK](/azure/bot-service/bot-builder-basics?view=azure-bot-service-4.0&preserve-view=true#the-bot-adapter).

# [.NET](#tab/dotnet1)

For a complete .NET sample, see the sample code reference [here](https://github.com/microsoft/teams-ai/blob/main/dotnet/samples/04.ai.a.teamsChefBot/Program.cs).

### .NET Initial Setup Code

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

For a JavaScript sample, see the sample code reference [here](https://github.com/microsoft/teams-ai/blob/main/js/samples/04.ai-apps/a.teamsChefBot/src/index.ts#L9).

### JavaScript Initial Setup Code

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

For a Python sample, see the sample code reference [here](https://github.com/microsoft/teams-ai/blob/main/python/samples/01.messaging.a.echoBot/src/bot.py#L8C1-L23C2).

### Python Initial Setup Code

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

### Import Teams AI Library

Import all the classes from `@microsoft/teams-ai` to build your bot and leverage the Teams AI library features.

[Sample code reference](https://github.com/microsoft/teams-ai/blob/main/js/samples/04.ai-apps/a.teamsChefBot/src/index.ts#L13)

### JavaScript Teams AI Library Import

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

## Create AI Components

Integrate AI components in an existing bot or create a new Bot Framework app by following these steps:

- **OpenAIModel**: Provides methods to access the OpenAI API or another service that adheres to the OpenAI REST format. It works with both OpenAI and Azure OpenAI language models.
- **Prompt Manager**: Manages prompt creation by copying conversation and user states automatically and integrating your code functions into prompts.
- **ActionPlanner**: The key component that calls your large language model (LLM). It generates and executes a plan based on user input and available actions.

# [.NET](#tab/dotnet2)

Review the .NET sample code reference [here](https://github.com/microsoft/teams-ai/blob/main/dotnet/samples/04.ai.c.actionMapping.lightBot/Program.cs#L33).

### .NET AI Components Code

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

For a JavaScript sample reference, check [here](https://github.com/microsoft/teams-ai/blob/main/js/samples/03.ai-concepts/c.actionMapping-lightBot/src/index.ts#L86).

### JavaScript AI Components Code

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

For a Python sample reference, check [here](https://github.com/microsoft/teams-ai/blob/main/python/samples/04.ai.c.actionMapping.lightBot/src/bot.py#L35).

### Python AI Components Code

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

## Define Storage and Application

The application object automatically manages the conversation and user state for your bot.

- **Storage**: Create a storage provider to store conversation and user states.
- **Application**: Use the `Application` class to register actions or activity handlers which include all the necessary bot logic.

# [.NET](#tab/dotnet3)

For a .NET sample, see the reference [here](https://github.com/microsoft/teams-ai/blob/main/dotnet/samples/04.ai.c.actionMapping.lightBot/Program.cs#L99).

### .NET Storage & Application Setup

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

Here, `TurnStateFactory` lets you create a custom state class for storing additional information or logic. Create a class extending the default turn state, and pass a function that creates an instance of your class to the app constructor.

# [JavaScript](#tab/javascript3)

For a JavaScript sample, see the reference [here](https://github.com/microsoft/teams-ai/blob/main/js/samples/03.ai-concepts/c.actionMapping-lightBot/src/index.ts#L112).

### JavaScript Storage & Application Setup

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

The `MemoryStorage()` function stores your bot's state. The `Application` class replaces the traditional Teams Activity Handler. The AI configuration includes the planner, moderator, prompt manager, default prompt, and history, then passes them into the `Application`.

# [Python](#tab/python3)

For a Python sample, see the reference [here](https://github.com/microsoft/teams-ai/blob/main/python/samples/04.ai.c.actionMapping.lightBot/src/bot.py#L52C1-L62C2).

### Python Storage & Application Setup

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

## Register Data Sources

A vector data source simplifies adding Retrieval Augmented Generation (RAG) to any prompt. Register a named data source with the planner and specify it in the prompt's `config.json` file to augment the prompt. This enables AI to inject relevant data from external sources (e.g., vector databases or cognitive search) into the prompt.

[Sample code reference](https://github.com/microsoft/teams-ai/blob/main/js/samples/04.ai-apps/a.teamsChefBot/src/index.ts#L118)

### JavaScript Data Source Registration

```typescript
// Register your data source with planner
planner.prompts.addDataSource(new VectraDataSource({
    name: 'teams-ai',
    apiKey:  process.env.OPENAI_API_KEY!,
    indexFolder: path.join(__dirname, '../index'),
}));
```

### Embeddings

An embedding is a vector generated by an LLM that captures a text's semantic meaning in a compact format. Embeddings are useful for text classification, sentiment analysis, and search tasks. For instance, OpenAI's **text-embedding-ada-002** model produces a list of 1536 numbers representing the input text. These embeddings are stored in a vector database and can be used to implement the RAG pattern by retrieving relevant data to augment the prompt.

<details>
  <summary>The following is an example of a VectraDataSource and OpenAIEmbeddings:</summary>

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

Prompts are text snippets used to create engaging conversational experiences. They can serve as conversation starters, question providers, or response generators. The new object-based prompt system segments prompts into parts—each with its own token budget, which can either be fixed or proportional to the tokens remaining. This system supports both Text Completion and Chat Completion style APIs.

### Guidelines for Creating Effective Prompts

- Provide clear instructions, examples, or both.
- Use quality data and proofread your examples. While the model can recognize spelling errors, it might interpret them as intentional, affecting responses.
- Adjust parameters like `temperature` and `top_p` to fine-tune the model's output. For example, a higher temperature (e.g., 0.8) makes the output more random, while a lower value (e.g., 0.2) yields focused and deterministic responses.

Create a folder named `prompts` and define your prompt files as follows:

- `skprompt.txt`: Contains the prompt text and supports template variables and functions.
- `config.json`: Contains the prompt model settings to ensure the bot responses meet your requirements.

[Sample code reference](https://github.com/microsoft/teams-ai/blob/main/js/samples/03.ai-concepts/c.actionMapping-lightBot/src/prompts/tools/config.json)

### Sample Prompt Configuration (config.json)

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

### Query Parameters

| **Value**                | **Description**                                                                                                                                                                                                                                                                               |
|--------------------------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `model`                  | ID of the model to use.                                                                                                                                                                                                                                                                       |
| `completion_type`        | The type of completion you want. It can return multiple predicted completions with probabilities. Supported options are `chat` and `text`. Default: `chat`.                                                                                                                              |
| `include_history`        | Boolean value. Include conversation history to maintain context. Each prompt gets a separate conversation history to avoid confusion.                                                                                                                                                          |
| `include_input`          | Boolean value. Include the user's input in the prompt.                                                                                                                                                                                                                                      |
| `max_input_tokens`       | The maximum number of tokens allowed for input. The maximum limit is 4000 tokens.                                                                                                                                                                                                             |
| `max_tokens`             | The maximum number of tokens to generate in the completion. The sum of prompt tokens and `max_tokens` cannot exceed the model's context length.                                                                                                                                                |
| `temperature`            | A sampling temperature between 0 and 2. Higher values (e.g., 0.8) produce more random outputs, while lower values (e.g., 0.2) produce more focused outputs.                                                                                                                             |
| `top_p`                  | An alternative to temperature, this parameter applies nucleus sampling. For example, 0.1 means only the tokens in the top 10% probability mass are considered.                                                                                                                           |
| `presence_penalty`       | A number between -2.0 and 2.0 that penalizes new tokens based on their presence in the text so far, encouraging the model to discuss new topics.                                                                                                                                             |
| `frequency_penalty`      | A number between -2.0 and 2.0 that penalizes repeated tokens, reducing the chance of verbatim repetition.                                                                                                                                                                                     |
| `stop_sequences`         | Up to four sequences where the API stops generating additional tokens. The final text will not include these stop sequences.                                                                                                                                                                   |
| `augmentation_type`      | The type of augmentation used. Supported values are `sequence`, `monologue`, and `tools`.                                                                                                                                                                                                     |

### Prompt Management

Prompt management automatically adjusts prompt size and content based on token constraints and additional data sources. For instance, in a scenario with a 4,000-token limit—2,800 tokens for input and 1,000 tokens for output—the model balances the prompt by starting with a base text, adding around 1,200 tokens from data sources, and reserving the remaining tokens for conversation history and user input.

### Prompt Actions

Prompt actions allow the model to perform actions or respond to the user. You can define a plan schema with a list of supported actions that carry arguments. The OpenAI endpoint determines which actions to perform, extracts entities, and passes them as parameters.

Example prompt snippet:

```text
The following is a conversation with an AI assistant.
The assistant can turn a light on or off.

context:
The lights are currently {{getLightStatus}}.
```

### Prompt Template

A prompt template is a powerful method to define and compose AI functions using plain text. Templates allow you to:

- Create natural language prompts
- Generate responses
- Extract information
- Invoke other prompts
- Execute text-based tasks

The syntax supports embedding variables and calling external functions using curly braces `{{...}}`. Key tokens include:

- ``{{function}}``: Calls a registered function and inserts its return value.
- ``{{$input}}``: Inserts the user’s input, derived from `state.temp.input`.
- ``{{$state.[property]}}``: Inserts values from state properties.

## Actions

Actions process events triggered by AI components.

There are built-in action handlers such as `FlaggedInputAction` and `FlaggedOutputAction` to handle moderator flags. When the moderator flags an incoming message, it redirects to `FlaggedInputAction` where `context.sendActivity` notifies the user. To halt the action, return `AI.StopCommandName`.

[Sample code reference](https://github.com/microsoft/teams-ai/blob/main/js/samples/04.ai-apps/a.teamsChefBot/src/index.ts#L132)

### JavaScript Example: Action Handlers for Flagged Input/Output

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

Action handlers help users achieve their goals by executing shared user intents. First, register actions in your prompt, then provide a handler for each action, including any unknown actions. For example, in a light bot:

- `LightsOn`: Turns the lights on.
- `LightsOff`: Turns the lights off.
- `Pause`: Pauses for a specified duration. The `PauseParameters` ensure the time is returned as a number.

# [.NET](#tab/dotnet4)

For a .NET example of action handlers, refer to [this sample](https://github.com/microsoft/teams-ai/blob/main/dotnet/samples/04.ai.c.actionMapping.lightBot/LightBotActions.cs).

### .NET Action Handlers Code

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

For a JavaScript example of action handlers, see [this sample](https://github.com/microsoft/teams-ai/blob/main/js/samples/03.ai-concepts/c.actionMapping-lightBot/src/index.ts#L126).

### JavaScript Action Handlers Code

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

For a Python example of action handlers, see [this sample](https://github.com/microsoft/teams-ai/blob/main/python/samples/04.ai.c.actionMapping.lightBot/src/bot.py#L85C1-L113C26).

### Python Action Handlers Code

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

Using sequence, monologue, or tools augmentation helps prevent hallucinations of invalid function names, actions, or parameters. Create an actions file to:

- Define actions for prompt augmentation.
- Specify when to perform actions.

For multi-step or complex tasks, sequence augmentation is ideal. For tasks requiring natural language understanding and creativity, monologue augmentation is more suitable.

Below is an example of an `actions.json` file for a light bot:

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

- `name`: Action name (required).
- `description`: Action description (optional).
- `parameters`: A JSON schema object defining required parameters.

### Feedback Loop

A feedback loop validates, corrects, and refines the AI’s responses, leading to more effective interactions. Key aspects include:

- **Repair Loop**: Forks the conversation history if the model's response is inadequate, allowing alternative solutions without affecting the main conversation.
- **Validation**: Confirms the corrected response and reinserts it into the main conversation upon success.
- **Learning from Mistakes**: Helps the model avoid repeating errors in the future.
- **Handling Complex Commands**: Improves the model's ability to manage intricate instructions after learning from corrections.

#### Manage History

Use `MaxHistoryMessages` and `MaxConversationHistoryTokens` to have the AI library automatically manage conversation history.

### Feedback Loop Options

For sequence augmentation, disable looping by:
- Setting `allow_looping?` to `false` in the `AIOptions` definition.
- Setting `max_repair_attempts` to `0` in the `index.ts` file.

## Upgrade Your Conventional Bot to a Custom Engine Agent

If you have an existing Teams bot, you can upgrade it to a custom engine agent that supports streaming, citations, and AI labels. This aligns the bot with the conversational AI UX paradigm to provide a consistent experience with declarative agents.

> [!NOTE]
>
> Custom engine agents are not supported in Python.

Here’s the checklist to upgrade your bot:

| To-Do List                                                         | Supporting docs                                                                                                                                                                                                                           |
|--------------------------------------------------------------------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Update the AI SDK versions                                           | • For JavaScript, update to [v1.6.1](https://www.npmjs.com/package/@microsoft/teams-ai). <br> • For C#, update to [v1.8.1](https://www.nuget.org/packages/Microsoft.Teams.AI/1.8.1).                                            |
| Enable streaming for the bot                                          | [Stream bot messages](../../streaming-ux.md)                                                                                                                                                                                              |
| Use AI labels to indicate that the message is AI-generated            | [AI labels](../bot-messages-ai-generated-content.md#ai-label)                                                                                                                                                                            |
| Use citations to confirm the source of the bot message (via in-text citations and references) | [Citations](../bot-messages-ai-generated-content.md#citations)                                                                                                                                                                           |

## Add Support for Microsoft 365 Copilot Chat

You can add support for custom engine agents in Microsoft 365 Copilot Chat. You can also preview asynchronous patterns, including follow-up messages and long-running tasks. See [asynchronous patterns](/microsoft-365-copilot/extensibility/ux-custom-engine-agent) for more details.

To support Microsoft 365 Copilot Chat, update your app manifest as follows:

1. Add the `copilotAgents` property with the sub-property `customEngineAgents` to your [app manifest](../../../resources/schema/manifest-schema-dev-preview.md#customengineagents):

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

2. In your app manifest, set the `scopes` to `personal` for `bots` and `commandLists`:

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
> * Microsoft 365 Copilot Chat adds an AI-generated label to every response from the custom engine agent.
> * If your existing bot was built using the Microsoft 365 Agents Toolkit (formerly Teams Toolkit) and you want to support Microsoft 365 Copilot Chat, follow the [step-by-step guide](../../../Teams-AI-library-tutorial.yml).
> * For single-sign-on (SSO) authentication with a custom engine agent, see [update Microsoft Entra app registration for SSO](../../../m365-apps/extend-m365-teams-personal-tab.md#update-microsoft-entra-app-registration-for-sso). Note that SSO for custom engine agents is not supported on the Outlook client.

## Elevate Your Conventional Bot to Use AI

Convert your existing conventional bot to use AI by integrating an AI layer. The following sample demonstrates how to add AI components to a standard Bot Framework adapter-based bot.

### JavaScript Example: Elevating a Bot with AI

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

## Migrate Your Bot to Use Teams AI Library

If you built your bot app using the Bot Framework SDK, you can switch to the Teams AI library to gain advanced AI features. Benefits include:

- A robust AI system for complex Teams applications powered by LLM.
- Simplified user authentication integrated through the library.
- Transferable skills from the Bot Framework SDK.
- Support for the latest LLM tools and APIs.

Choose the appropriate migration guide for your platform:

| Migrate a Bot Framework SDK app ...         | To use Teams AI library ...                                                                                                                                                                          |
|---------------------------------------------|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| A bot app built using JavaScript            | [Migrate](https://github.com/microsoft/teams-ai/blob/b34bbd14e9d13aed140686e4f91dbb673982b1cf/getting-started/MIGRATION/01.JS.md)                                                                       |
| A bot app built using C#                      | [Migrate](https://github.com/microsoft/teams-ai/blob/b34bbd14e9d13aed140686e4f91dbb673982b1cf/getting-started/MIGRATION/02.DOTNET.md)                                                                   |
| A bot app using Python                        | [Migrate](https://github.com/microsoft/teams-ai/blob/b34bbd14e9d13aed140686e4f91dbb673982b1cf/getting-started/MIGRATION/03.PYTHON.md)                                                                   |

## Code sample

| **Sample name**               | **Description**                                                                              | **.NET**                                                                                                   | **Node.js**                                                                                      |
|-------------------------------|----------------------------------------------------------------------------------------------|------------------------------------------------------------------------------------------------------------|--------------------------------------------------------------------------------------------------|
| Action mapping lightbot       | This example showcases how LightBot interprets user intent to effectively control the lights. | [View](https://github.com/microsoft/teams-ai/tree/main/dotnet/samples/04.ai.c.actionMapping.lightBot)       | [View](https://github.com/microsoft/teams-ai/tree/main/js/samples/03.ai-concepts/c.actionMapping-lightBot) |

## Next Step

Choose one of the following as your next step:

> [!div class="nextstepaction"]
> If you want to try creating a scenario-based custom engine agent using the Agents Toolkit and Teams AI library, choose: <br>
> [Advanced step-by-step guide](../../../sbs-Teams-AI.yml)
>
> [!div class="nextstepaction"]
> If you want to learn about the core capabilities of the Teams AI library, choose: <br>
> [Understand Teams AI library](how-conversation-ai-core-capabilities.md)
