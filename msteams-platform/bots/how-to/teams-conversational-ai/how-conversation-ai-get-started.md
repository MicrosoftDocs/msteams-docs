---
title: Use Teams AI Library to Build Apps/Bots
description: Learn how to create an app using Teams AI library with AI component, storage, register data source, migrate bot, prompts, and actions.
ms.localizationpriority: medium
ms.topic: overview
ms.author: surbhigupta
ms.date: 02/06/2025
ms.owner: angovil
---

# Build with Teams AI Library

Teams AI library simplifies building intelligent Microsoft Teams applications with AI components. It offers APIs for data access and custom UI creation. You can easily integrate prompt management and safety moderation and create bots using OpenAI or Azure OpenAI for an AI-driven experience.

## Initial Setup

Teams AI library is built on top of the Bot Framework SDK and uses its fundamentals to extend the Bot Framework's capabilities. As part of the initial setup, it's important to import the Bot Framework SDK functionalities. The adapter class that handles connectivity with the channels is imported from [Bot Framework SDK](/azure/bot-service/bot-builder-basics?view=azure-bot-service-4.0&preserve-view=true#the-bot-adapter).

---

# [.NET](#tab/dotnet1)

For .NET developers, refer to the sample code for setting up the Teams AI library with a Bot Framework adapter and dependency injection via ASP.NET Core.

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

---

# [JavaScript](#tab/javascript4)

For JavaScript developers, the sample code below demonstrates how to set up the Teams AI library using the Bot Framework CloudAdapter. This code initializes the adapter with required authentication details.

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

---

# [Python](#tab/python4)

For Python developers, the sample code below shows how to set up the Teams AI library as part of your bot's configuration. This sample configures the application with TeamsAdapter and custom state.

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

### Import Teams AI Library

Import all the classes from `@microsoft/teams-ai` to build your bot and leverage Teams AI library capabilities. This example shows the required imports to access AI components, prompt management, and data source support.

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

---

## Create AI Components

You can create AI components in an existing bot app or in a new Bot Framework app. Below are the key components:

- **OpenAIModel**: Provides a way to access the OpenAI API or any other service that adheres to the OpenAI REST format. It's compatible with both OpenAI and Azure OpenAI language models.
- **Prompt Manager**: Handles prompt creation by copying conversation state and user state from your code and injecting them into prompts automatically.
- **ActionPlanner**: Acts as the main component calling your Large Language Model (LLM). It generates and executes plans based on the user's input and available actions.

---

# [.NET](#tab/dotnet2)

This .NET sample illustrates how to create AI components including model initialization, prompt manager with function registration, and action planner.

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

---

# [JavaScript](#tab/javascript1)

The following JavaScript example demonstrates how to initialize AI components using `OpenAIModel`, `PromptManager`, and `ActionPlanner`.

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

---

# [Python](#tab/python1)

In Python, use the following code snippet to set up AI components. This sample shows how to select the proper configuration based on the keys provided and initialize the OpenAIModel.

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

## Define Storage and Application

The `Application` object automatically manages the conversation and user state of your bot. Two key components in this section are:

- **Storage**: The storage provider stores conversation and user state.
- **Application**: The `Application` class registers actions or activity handlers for the app and contains all the required bot logic.

---

# [.NET](#tab/dotnet3)

This .NET sample demonstrates how to define storage and configure the application using dependency injection. The `TurnStateFactory` allows creating a custom state class for storing extra information.

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

---

# [JavaScript](#tab/javascript3)

In the JavaScript sample below, the bot's state is defined using `MemoryStorage`, and the `Application` class is configured with the AI components.

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

*Note:* The `MemoryStorage()` function stores your bot's state. The `Application` class replaces the Teams Activity Handler class. You configure your `ai` by adding the planner, moderator, prompt manager, default prompt, and history. The resulting `ai` object is then passed into the `Application`, allowing the app to utilize the defined AI components.

---

# [Python](#tab/python3)

This Python example shows how to configure storage and the application using TeamsAdapter and AI options.

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

## Register Data Sources

A vector data source simplifies adding Retrieval-Augmented Generation (RAG) to any prompt. Register a named data source with the planner and specify it in the prompt's `config.json` file to augment the prompt. This supports injecting relevant external information from vector databases or cognitive search into the prompt.

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

An embedding is a vector generated by an LLM that represents text by capturing its semantic meaning in a compact form. Embeddings are useful for text classification, sentiment analysis, and search operations. For example, OpenAI's **text-embedding-ada-002** model returns a list of 1536 numbers representing the input text, which are stored in a vector database. In a custom engine agent, the RAG pattern can be implemented by querying the vector database and augmenting the prompt with relevant information.

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

---

## Prompts

Prompts are text pieces that guide the conversational experience. They are crucial for starting interactions, posing questions, and generating responses. The new object-based prompt system divides prompts into sections with distinct token budgets, which can be fixed or proportional to the remaining tokens. Prompts can be created for both Text Completion and Chat Completion style APIs.

### Guidelines for Creating Effective Prompts

- Provide clear instructions, examples, or both.
- Ensure high-quality data with proofread examples.
- Adjust settings like `temperature` and `top_p` to control randomness or determinism.
  - **Higher temperature (e.g., 0.8):** More random output.
  - **Lower temperature (e.g., 0.2):** More deterministic and focused responses.

Create a folder named `prompts` and add the prompt files:

- **skprompt.txt:** Contains the prompt text and supports template variables and functions.
- **config.json:** Contains the prompt model settings to ensure the bot's responses meet your requirements.

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
       "augmentation_type": "sequence",
       "data_sources": {
            "teams-ai": 1200
       }
   }
}
```

### Query Parameters

The table below summarizes the query parameters:

| **Value**             | **Description**                                                                                                                                                                                                                                                                   |
| --------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `model`               | ID of the model to use.                                                                                                                                                                                                                                                           |
| `completion_type`     | The type of completion to use. Given a prompt, the model returns one or more predicted completions along with alternative token probabilities. Supported options: `chat` and `text`. Default: `chat`.                                                                    |
| `include_history`     | Boolean value. If set to true, includes a separate conversation history for each prompt to prevent confusion.                                                                                                                                                                      |
| `include_input`       | Boolean value. If true, includes the user's input in the prompt.                                                                                                                                                                                                                 |
| `max_input_tokens`    | The maximum number of tokens for the input. Maximum tokens supported is 4000.                                                                                                                                                                                                    |
| `max_tokens`          | The maximum number of tokens to generate. The sum of prompt and output tokens must not exceed the model's context length.                                                                                                                                                           |
| `temperature`         | Sampling temperature between 0 and 2. Higher values (e.g., 0.8) result in more randomness, while lower values (e.g., 0.2) yield more focused responses.                                                                                                                      |
| `top_p`               | An alternative sampling method (nucleus sampling) where the model considers only the tokens with cumulative probability `top_p`. For example, 0.1 means using tokens within the top 10% probability mass.                                                                   |
| `presence_penalty`    | A number between -2.0 and 2.0. Positive values discourage repetition by penalizing tokens that have already appeared, encouraging the generation of new topics.                                                                                                               |
| `frequency_penalty`   | A number between -2.0 and 2.0. Positive values discourage repeating the same line by penalizing frequencies of existing tokens.                                                                                                                                                   |
| `stop_sequences`      | Up to four sequences where the API stops generating additional tokens. The returned text will not include the stop sequence.                                                                                                                                                     |
| `augmentation_type`   | Type of augmentation. Supported options: `sequence`, `monologue`, and `tools`.                                                                                                                                                                                                  |

### Prompt Management

Prompt management automatically adjusts the size and content of prompts based on token budgets and data sources. For example, with a 4,000-token limit (2,800 for input and 1,000 for output), the model allocates:
- 100 tokens for base prompt text.
- 1,200 tokens for data sources.
- The remaining tokens to conversation history and input.

This ensures the total tokens remain within the limit.

### Prompt Actions

Prompt actions allow the model to perform tasks or respond to the user. You can create a schema with a list of supported actions. The OpenAI endpoint identifies actions, extracts entities, and passes arguments to the action handler.

Example prompt snippet:

```text
The following is a conversation with an AI assistant.
The assistant can turn a light on or off.

context:
The lights are currently {{getLightStatus}}.
```

### Prompt Template

A prompt template lets you define and compose AI functions using plain text. With this syntax, you can:
- Create natural language prompts
- Generate responses
- Extract information
- Invoke additional prompts

Key template features include:

- ``{{function}}``: Calls a registered function and inserts its return string.
- ``{{$input}}``: Inserts the message text (sourced from state.temp.input).
- ``{{$state.[property]}}``: Inserts state properties.

---

## Actions

Actions handle events triggered by AI components. Built-in actions such as `FlaggedInputAction` and `FlaggedOutputAction` handle moderator flags:
- **Flagged Input:** Redirects to `FlaggedInputAction` and sends a flag alert to the user.
- **Flagged Output:** Uses `FlaggedOutputAction` to govern sensitive output.

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

Action handlers allow the bot to execute operations based on user intent. First, register the actions in the prompt definition, then register a handler for each action (including unknown actions).

Below is an example of a light bot with three actions: `LightsOn`, `LightsOff`, and `Pause`. The action handler returns a string response. For time values, the `PauseParameters` field ensures the time is returned as a number.

---

# [.NET](#tab/dotnet4)

This .NET example demonstrates how to define action handlers for various light control functions.

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
```

---

# [JavaScript](#tab/javascript2)

The JavaScript example below registers action handlers for controlling the light bot.

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

---

# [Python](#tab/python2)

In Python, the following code registers action handlers for lights control operations.

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

- Define actions for prompt augmentation.
- Indicate when to perform actions.

Sequence augmentation is ideal for multi-step or complex tasks, while monologue augmentation suits scenarios that require natural language understanding, flexibility, and creativity.

Below is an example `actions.json` file for a light bot:

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

* `name`: Name of the action. (Required.)  
* `description`: Description of the action. (Optional.)  
* `parameters`: JSON schema of the required parameters.

---

### Feedback Loop

A feedback loop helps monitor and improve the bot’s interactions. Key components include:

- **Repair Loop**: Activates if the model's response is inadequate. It uses a forked conversation history to test different solutions.
- **Validation**: Validates the revised response before reintegrating it into the main conversation.
- **Learning**: The model learns from correct examples to reduce future errors.
- **Handling Complex Commands**: Over time, the model refines its handling of complex commands through feedback.

---

#### Manage History

Use `MaxHistoryMessages` and `MaxConversationHistoryTokens` to let the AI library automatically manage conversation history.

---

## Upgrade Your Conventional Bot to Custom Engine Agent

If you already have a Teams bot built with conventional methods, you can upgrade it to a custom engine agent. This upgrade supports streaming, citations, and AI labels to align with modern conversational AI experiences.

> [!NOTE]
>
> Custom engine agent isn't supported in Python.

To upgrade your bot, follow this checklist:

| To-Do List                                                   | Supporting Docs                                                                                                                                                                                                                                              |
| ------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Update the AI SDK versions                                   | • For JavaScript: update to [v1.6.1](https://www.npmjs.com/package/@microsoft/teams-ai) <br> • For C#: update to [v1.8.1](https://www.nuget.org/packages/Microsoft.Teams.AI/1.8.1)                                                             |
| Enable streaming for bot.                                    | [Stream bot messages](../../streaming-ux.md)                                                                                                                                                                                                                  |
| Use AI labels to identify the message as AI-generated.       | [AI labels](../bot-messages-ai-generated-content.md#ai-label)                                                                                                                                                                                                |
| Use citations to refer to the source of bot messages.        | [Citations](../bot-messages-ai-generated-content.md#citations)                                                                                                                                                                                               |

---

## Add Support for Microsoft 365 Copilot Chat

You can add support for custom engine agents in Microsoft 365 Copilot Chat. This version also supports asynchronous patterns (e.g., follow-up messages, long-running tasks). For more details, see [asynchronous patterns](/microsoft-365-copilot/extensibility/ux-custom-engine-agent).

To enable support, update your app manifest as follows:

1. Add the `copilotAgents` property with `customEngineAgents` in your [app manifest](../../../resources/schema/manifest-schema-dev-preview.md#customengineagents):

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
          ] 
        } 
    ],
    ```

> [!NOTE]
>
> * Microsoft 365 Copilot Chat automatically adds an AI-generated label to every response from the custom engine agent.
> * If you built your conventional bot using Teams Toolkit and want to add support for Microsoft 365 Copilot Chat, follow the [step-by-step guide](../../../Teams-AI-library-tutorial.yml).
> * For single-sign on (SSO) authentication in your custom engine agent, see [update Microsoft Entra app registration for SSO](../../../m365-apps/extend-m365-teams-personal-tab.md#update-microsoft-entra-app-registration-for-sso). Note that SSO isn't supported for custom engine agents in the Outlook client.

---

## Elevate Your Conventional Bot to Use AI

You can add an AI layer to your existing bot, enabling advanced interactive features. The snippet below shows how to integrate AI components using the Bot Framework adapter and the Teams AI library.

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
    // Route the incoming request to the adapter
    await adapter.process(req, res as any, async (context) => {
        // Dispatch to application for routing
        await app.run(context);
    });
});
```

---

## Migrate Your Bot to Use Teams AI Library

If your bot app is built with the Bot Framework SDK, you can migrate to the Teams AI library to utilize advanced AI features such as:
- A robust AI system for creating complex Teams apps powered by LLM.
- Integrated user authentication.
- Support for the latest LLM tools and APIs.

The `Application` object in Teams AI library replaces the traditional `ActivityHandler` for a simpler, fluent development style.

Use one of the following migration guides:

| Migrate a Bot Framework SDK App ... | To Use Teams AI Library ... |
| ----------------------------------- | --------------------------- |
| A bot app built using JavaScript    | [Migrate](https://github.com/microsoft/teams-ai/blob/b34bbd14e9d13aed140686e4f91dbb673982b1cf/getting-started/MIGRATION/01.JS.md) |
| A bot app built using C#            | [Migrate](https://github.com/microsoft/teams-ai/blob/b34bbd14e9d13aed140686e4f91dbb673982b1cf/getting-started/MIGRATION/02.DOTNET.md) |
| A bot app using Python              | [Migrate](https://github.com/microsoft/teams-ai/blob/b34bbd14e9d13aed140686e4f91dbb673982b1cf/getting-started/MIGRATION/03.PYTHON.md) |

---

## Code Sample Overview

| **Sample Name**           | **Description**                                                                               | **.NET**                                                                                 | **Node.js**                                                                            |
| ------------------------- | --------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------- |
| Action Mapping Lightbot   | Demonstrates how the LightBot interprets user intent to control light functions effectively.  | [View](https://github.com/microsoft/teams-ai/tree/main/dotnet/samples/04.ai.c.actionMapping.lightBot) | [View](https://github.com/microsoft/teams-ai/tree/main/js/samples/03.ai-concepts/c.actionMapping-lightBot) |

---

## Next Step

Choose one of the following:

> [!div class="nextstepaction"]
> If you want to try creating a scenario-based custom engine agent using Teams Toolkit and Teams AI library, select the following:  
> [Advanced step-by-step guide](../../../sbs-Teams-AI.yml)
>
> [!div class="nextstepaction"]
> If you're interested in understanding the core capabilities of Teams AI library, select the following:  
> [Understand Teams AI library](how-conversation-ai-core-capabilities.md)
