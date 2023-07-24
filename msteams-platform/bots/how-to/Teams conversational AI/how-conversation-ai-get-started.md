---
title: Get started with Teams AI library
description: In this article, learn how to create an app using Teams AI library and its capabilities.
ms.localizationpriority: medium
ms.topic: overview
ms.author: surbhigupta
---

# Get started with Teams AI library

> [!NOTE]
>
> Teams AI library is available only in [public developer preview](~/resources/dev-preview/developer-preview-intro.md).

Teams AI library streamlines the process to build intelligent Microsoft Teams applications by using the AI components. It provides APIs to access and manipulate data, as well as a range of controls and components to create custom user interfaces.

You can easily integrate Teams AI library, prompt management, and safety moderation into your apps and enhance the user experience. It also facilitates the creation of bots that uses an OpenAI API key or Azure OpenAI to provide an AI-driven conversational experience.

## Initial setup

Teams AI library is built on top of the Bot Framework SDK and uses its fundamentals to offer an extension to the Bot Framework SDK capabilities. As part of initial setup, it's important to import the Bot Framework SDK functionalities.

> [!NOTE]
> The adapter class that handles connectivity with the channels is imported from [Bot Framework SDK](/azure/bot-service/bot-builder-basics?view=azure-bot-service-4.0#the-bot-adapter&preserve-view=true).

[Sample code reference](https://github.com/microsoft/teams-ai/blob/d127f765b6a4a2689f5e6602070d025063f52794/dotnet/samples/04.ai.a.teamsChefBot/Program.cs#L2C2-L4)

```csharp
// Import required bot services.
// See https://aka.ms/bot-services to learn more about the different parts of a bot.
using Microsoft.Bot.Builder;
using Microsoft.Bot.Builder.Integration.AspNet.Core;
using Microsoft.Bot.Connector.Authentication;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers();
builder.Services.AddHttpClient("WebClient", client => client.Timeout = TimeSpan.FromSeconds(600));
builder.Services.AddHttpContextAccessor();

var config = builder.Configuration.Get<ConfigOptions>()!;
builder.Configuration["MicrosoftAppType"] = "MultiTenant";
builder.Configuration["MicrosoftAppId"] = config.BOT_ID;
builder.Configuration["MicrosoftAppPassword"] = config.BOT_PASSWORD;
builder.Services.AddSingleton<BotFrameworkAuthentication, ConfigurationBotFrameworkAuthentication>();

// Create adapter.
// See https://aka.ms/about-bot-adapter to learn more about how bots work.
builder.Services.AddSingleton<CloudAdapter, AdapterWithErrorHandler>();
builder.Services.AddSingleton<IBotFrameworkHttpAdapter>(sp => sp.GetService<CloudAdapter>()!);
builder.Services.AddSingleton<BotAdapter>(sp => sp.GetService<CloudAdapter>()!);
```

### Import Teams AI library

Import all the classes from `Microsoft.TeamsAI` to build your bot and use the Teams AI library capabilities.

[Sample code reference](https://github.com/microsoft/teams-ai/blob/d127f765b6a4a2689f5e6602070d025063f52794/dotnet/samples/04.ai.a.teamsChefBot/Program.cs#L5-L10)

```csharp
///// Teams AI library /////

// import Teams AI library
using Microsoft.TeamsAI;
using Microsoft.TeamsAI.AI.Moderator;
using Microsoft.TeamsAI.AI.Planner;
using Microsoft.TeamsAI.AI.Prompt;
using Microsoft.TeamsAI.State;
```

## Create AI components

Add AI capabilities to your existing app or a new Bot Framework app.

**Planner**: OpenAI planner is the main component that calls the large language model (LLM) OpenAI or Azure OpenAI. The OpenAI API is powered by a diverse set of models with different capabilities. You can also make limited customizations to our original base models for your specific use case.

**Prompt manager**: The prompt manager manages prompt creation. It calls functions and injects from your code into the prompt. It copies the conversation state and the user state into the prompt for you automatically.

**Moderator**: A moderator adds safety moderation to the input and output. It allows you to identify the user input, flag prompt injection techniques, review the output from the bot, and run it through a business logic for filtering to ensure that the bot complies with OpenAI's usage policies. You can either moderate the input or the output, or both. OpenAI moderator is the default moderator.

[Sample code reference](https://github.com/microsoft/teams-ai/blob/d127f765b6a4a2689f5e6602070d025063f52794/dotnet/samples/04.ai.a.teamsChefBot/Program.cs#L42-L53)

```csharp
// Create AI components
builder.Services.AddSingleton<OpenAIPlannerOptions>(_ => new OpenAIPlannerOptions(config.OpenAI.ApiKey, "text-davinci-003"));
builder.Services.AddSingleton<OpenAIModeratorOptions>(_ => new OpenAIModeratorOptions(config.OpenAI.ApiKey, ModerationType.Both));

ILoggerFactory loggerFactory = sp.GetService<ILoggerFactory>()!;

IPlanner<TurnState> planner = new OpenAIPlanner<TurnState>(sp.GetService<OpenAIPlannerOptions>()!, loggerFactory.CreateLogger<OpenAIPlanner<TurnState>>());
IModerator<TurnState> moderator = new OpenAIModerator<TurnState>(sp.GetService<OpenAIModeratorOptions>()!, loggerFactory.CreateLogger<OpenAIModerator<TurnState>>());
IPromptManager<TurnState> promptManager = new PromptManager<TurnState>("./Prompts");
```

The `defaultModel` type `text-davinci-003` can perform any language task with better quality, longer output, and consistent instruction.

## Define storage and application

The application object automatically manages the conversation and user state of your bot.

- **Storage**: Create a storage provider to store the conversation and the user state for your bot.

- **Application**: The application class has all the information and bot logic required for an app. You can register actions or activity handlers for the app in this class.

[Sample code reference](https://github.com/microsoft/teams-ai/blob/DOTNET/dotnet/samples/04.e.twentyQuestions/Program.cs#L46-L83)

```csharp
// Define storage and application
builder.Services.AddSingleton<IStorage, MemoryStorage>();

builder.Services.AddTransient<IBot, TeamsChefBotApplication>(sp =>
{
    ApplicationOptions<TurnState, TurnStateManager> applicationOptions = new ApplicationOptions<TurnState, TurnStateManager>()
    {
        AI = new AIOptions<TurnState>(planner, promptManager)
        {
            Moderator = moderator,
            Prompt = "Chat",
            History = new AIHistoryOptions()
            {
                AssistantHistoryType = AssistantHistoryType.Text
            }
        },
        Storage = sp.GetService<IStorage>()
    };

    return new TeamsChefBotApplication(applicationOptions);
});
```

The `MemoryStorage` stores all the state for your bot. The `Application` class replaces the Teams Activity Handler class. You can configure your `AI` by adding the planner, moderator, prompt manager, default prompt and history. The `AI` object is passed into the `Application`, which receives the AI components and the default prompt defined earlier.

## Prompt

Prompts are pieces of text that can be used to create conversational experiences. Prompts are used to start conversations, ask questions, and generate responses. The use of prompts helps reduce the complexity of creating conversational experiences and make them more engaging for the user.

The following are a few guidelines to create prompts:

- Provide instructions, examples, or both.
- Provide quality data. Ensure that there are enough examples and proofread your examples. The model is usually smart enough to see through basic spelling mistakes and give you a response, but it also might assume that the input is intentional and it might affect the response.
- Check your prompt settings. The temperature and top_p settings control how deterministic the model is in generating a response. Higher value such as 0.8 makes the output random, while lower value such as 0.2 makes the output focused and deterministic.

Create a folder called prompts and define your prompts in the folder. When the user interacts with the bot by entering a text prompt, the bot responds with a text completion.

- `skprompt.txt`: Contains the prompts text and supports template variables and functions. Define all your text prompts in the `skprompt.txt` file.
- `config.json`: Contains the prompt model settings. Provide the right configuration to ensure bot responses are aligned with your requirement. Configure `max_tokens`, `temperature`, and other properties to pass into OpenAI or Azure OpenAI.

[Sample code reference](https://github.com/microsoft/teams-ai/blob/DOTNET/dotnet/samples/04.ai.a.teamsChefBot/Prompts/Chat/config.json)

```json
{
  "schema": 1,
  "description": "Chat with Teams Chef",
  "type": "completion",
  "completion": {
    "max_tokens": 150,
    "temperature": 0.9,
    "top_p": 0.0,
    "presence_penalty": 0.6,
    "frequency_penalty": 0.0,
    "stop_sequences": ["Human:", "AI:"]
  }
}
```

### Query parameters

The following table includes the query parameters:

| **Value**           | **Description**                                                                                                                                                                                                                                     |
| ------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `max_tokens`        | The maximum number of tokens to generate in the completion. The token count of your prompt plus max_tokens can't exceed the model's context length.                                                                                                 |
| `temperature`       | What sampling temperature to use, between 0 and 2. Higher values like 0.8 makes the output more random, while lower values like 0.2 makes it more focused and deterministic.                                                                        |
| `top_p`             | An alternative to sampling with temperature, called nucleus sampling, where the model considers the results of the tokens with top_p probability mass. Therefore, 0.1 means only the tokens comprising the top 10% probability mass are considered. |
| `presence_penalty`  | Number between -2.0 and 2.0. Positive values penalize new tokens based on whether they appear in the text so far, increasing the model's likelihood to talk about new topics.                                                                       |
| `frequency_penalty` | Number between -2.0 and 2.0. Positive values penalize new tokens based on their existing frequency in the text so far, decreasing the model's likelihood to repeat the same line verbatim.                                                          |
| `stop_sequences`    | Up to four sequences where the API stops generating further tokens. The returned text won't contain the stop sequence.                                                                                                                              |

### Prompt actions

Plans let the model perform actions or respond to the user. You can create a schema of the plan and add a list of actions that you support to perform an action and pass arguments. The OpenAI endpoint figures out the actions required to be used, extracts all the entities, and passes those as arguments to the action call.

```text
The following is a conversation with an AI assistant, its name is Teams Chef.
Teams Chef is an expert in Microsoft Teams apps development and the Human is junior developer learning Microsoft Teams development for the first time.
Teams Chef should always reply by explaining new concepts in simple terms using cooking as parallel concepts.
Teams Chef should always greet the human, ask them their name, and then guide the junior developer in his journey to build new apps for Microsoft Teams.

{{$history}}
Human: {{$input}}
TeamsChef:
```

### Prompt template

Prompt template is a simple and powerful way to define and compose AI functions using plain text. You can use prompt template to create natural language prompts, generate responses, extract information, invoke other prompts, or perform any other task that can be expressed with text.

The language supports features that allow you to include variables, call external functions, and pass parameters to functions. You don't need to write any code or import any external libraries, just use the curly braces {{...}} to embed expressions in your prompts. Teams parses your template and execute the logic behind it. This way, you can easily integrate AI into your apps with minimal effort and maximum flexibility.

- `{{function}}`: Calls a registered function and inserts its return value string.​

- `{{$input}}`: Inserts the message text. It gets it's value from state.temp.input.

- `{{$history}}`: Inserts the conversation history.​ It gets it's value from state.temp.history

- `{{$state.[property]}}`: Inserts state properties.

## Actions

Actions handle events triggered by AI components.

`FlaggedInputAction` and `FlaggedOutputAction` are the built-in action handlers to handle the moderator flags. If the moderator flags an incoming message input, the moderator redirects to the `FlaggedInputAction` handler and the `turnContext.SendActivityAsync` sends a message to the user about the flag.

[Sample code reference](https://github.com/microsoft/teams-ai/blob/DOTNET/dotnet/samples/04.ai.a.teamsChefBot/TeamsChefBotApplication.cs#L33-L49)

```csharp
internal class TeamsChefBotActions
{
    [Action(DefaultActionTypes.FlaggedInputActionName)]
    public async Task<bool> FlaggedInputAction([ActionTurnContext] ITurnContext turnContext, [ActionEntities] Dictionary<string, object> entities)
    {
        string entitiesJsonString = JsonSerializer.Serialize(entities);
        await turnContext.SendActivityAsync($"I'm sorry your message was flagged: {entitiesJsonString}");
        return false;
    }

    [Action(DefaultActionTypes.FlaggedOutputActionName)]
    public async Task<bool> FlaggedOutputAction([ActionTurnContext] ITurnContext turnContext)
    {
        await turnContext.SendActivityAsync("I'm not allowed to talk about such things.");
        return false;
    }
}
```

### Register Action Handlers

Action handlers help users achieve the goals, which is shared in the user intents.

One of the key aspects in action handlers is that you must first register the actions in the prompts and then help user achieve the goal.

You must register a handler for each action listed in the prompt and also add a handler to deal with unknown actions.

In the following example of a light bot, we have the `LightsOn`, `LightsOff`, and `Pause` action. Every time an action is called, you return `true` or `false`. ​Returning `false` from a handler prevents the planner from running additional `DO` or `SAY` commands. When the bot receives an unknown action, we're telling the bot to terminate the action.

[Sample code reference](https://github.com/microsoft/teams-ai/blob/DOTNET/dotnet/samples/04.ai.c.actionMapping.lightBot/LightBotActions.cs#L7-L58)

```csharp
// Define action handlers
public class LightBotActions
{
    [Action("LightsOn")]
    public async Task<bool> LightsOn([ActionTurnContext] ITurnContext turnContext, [ActionTurnState] AppState turnState)
    {
        turnState.Conversation!.LightsOn = true;
        await turnContext.SendActivityAsync(MessageFactory.Text("[lights on]"));
        return true;
    }

    [Action("LightsOff")]
    public async Task<bool> LightsOff([ActionTurnContext] ITurnContext turnContext, [ActionTurnState] AppState turnState)
    {
        turnState.Conversation!.LightsOn = false;
        await turnContext.SendActivityAsync(MessageFactory.Text("[lights off]"));
        return true;
    }

    [Action("Pause")]
    public async Task<bool> LightsOff([ActionTurnContext] ITurnContext turnContext, [ActionEntities] Dictionary<string, object> entities)
    {
        if (entities.TryGetValue("time", out object time))
        {
            if (time is string timeString)
            {
                if (int.TryParse(timeString, out int timeInt))
                {
                    await turnContext.SendActivityAsync(MessageFactory.Text($"[pausing for {timeInt / 1000} seconds]"));
                    await Task.Delay(timeInt);
                }
            }
        }

        return true;
    }

    [Action(DefaultActionTypes.UnknownActionName)]
    public async Task<bool> UnknownAction([ActionTurnContext] TurnContext turnContext, [ActionName] string action)
    {
        await turnContext.SendActivityAsync(ResponseGenerator.UnknownAction(action ?? "Unknown"));
        return false;
    }
}

// Register action handlers
public class TeamsLightBot : Application<AppState, AppStateManager>
{
    public TeamsLightBot(ApplicationOptions<AppState, AppStateManager> options) : base(options)
    {
        AI.ImportActions(new LightBotActions());
    }
}
```

## Next step

> [!div class="nextstepaction"] > [Teams AI library quick start guide](conversation-ai-quick-start.md)
