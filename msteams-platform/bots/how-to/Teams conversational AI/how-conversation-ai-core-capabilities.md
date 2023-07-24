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

Teams AI library supports .NET and is designed to simplify the process of building bots that can interact with Microsoft Teams, and facilitates the migration of existing bots. The AI library supports the migration of messaging capabilities, Message extension (ME) capabilities, and Adaptive Cards capabilities to the new format. It's also possible to upgrade existing Teams apps with these features.

Earlier, you were using BotBuilder SDK directly to create bots for Microsoft Teams. Teams AI library is designed to facilitate the construction of bots that can interact with Microsoft Teams. While one of the key features of Teams AI library is the AI support that customers can utilize, the initial objective might be to upgrade their current bot without AI. After you upgrade, the bot can connect to AI or large language model (LLM) available in the AI library.

The general rule is to use [New activity handler class but similar to Old activity handling method](#new-activity-handler-class-old-activity-handling-method)

Teams AI library supports the following capabilities:

* [Send or receive message](#send-or-receive-message)

* [Message extension (ME) capabilities](#message-extensions)

* [Adaptive Cards capabilities](#adaptive-cards-capabilities)

 You need to use the AI library to scaffold bot and Adaptive Card handlers to the source file.

In the following section, we've used the .NET samples from the [AI library](https://github.com/microsoft/teams-ai/tree/DOTNET) to explain each capability and the path to migration:

## New activity handler class, Old activity handling method

In the BotFramework SDK the Bot class extended the `TeamsActivityHandler` class. In Teams AI you will replace that with the `Application<TurnState, TurnStateManager>` class.

_Old:_

```C#
public class EchoBot : TeamsActivityHandler { }
```

_New:_

```C#
public class EchoBot : Application<TurnState, TurnStateManager>
{
    public EchoBot(ApplicationOptions<TurnState, TurnStateManager> options) : base(options) {}
}
```

The `TurnState` and `TurnStateManager` are classes that make up the turn state infrastructure. The generic types in the `Application` class allow users to customize the shape of the turn state.

The activity handling method is the same for both `TeamsActivityHandler` and `Application` class, except for a few nuances.

### New turn state parameter

_Old:_

```C#
protected virtual Task OnMessageActivityAsync(ITurnContext<IMessageActivity> turnContext, CancellationToken cancellationToken);
```

_New:_

```C#
protected virtual Task OnMessageActivityAsync(ITurnContext<IMessageActivity> turnContext, TState turnState, CancellationToken cancellationToken);
```

#### Dropped the `Teams` prefix

_Old:_

```C#
protected virtual Task OnTeamsChannelCreatedAsync(ChannelInfo channelInfo, TeamInfo teamInfo, ITurnContext<IConversationUpdateActivity> turnContext, TState turnState, CancellationToken cancellationToken);
```

_New:_

```C#
protected virtual Task OnChannelCreatedAsync(ChannelInfo channelInfo, TeamInfo teamInfo, ITurnContext<IConversationUpdateActivity> turnContext, TState turnState, CancellationToken cancellationToken);
```

#### Reordering parameters for consistency

_Old:_

```C#
protected virtual Task<SearchInvokeResponse> OnSearchInvokeAsync(ITurnContext<IInvokeActivity> turnContext, SearchInvokeValue invokeValue, CancellationToken cancellationToken);
```

_New:_

```C#
protected virtual Task<SearchInvokeResponse> OnSearchInvokeAsync(SearchInvokeValue invokeValue, ITurnContext<IInvokeActivity> turnContext, TState turnState, CancellationToken cancellationToken);
```

For every activity handler method in the BotFramework SDK users can replace it with a correspond method in the `Application` class.

## Send or receive message

Replace `TeamsActivityHandler` with the `Application<TurnState, TurnStateManager>`, and handle incoming messages by overriding `OnMessageActivityAsync` method.

Example: [EchoBot](https://github.com/microsoft/teams-ai/blob/DOTNET/dotnet/samples/01.messaging.echoBot)

```C#
public class TeamsEchoBot : Application<AppState, AppStateManager>
{
    public TeamsEchoBot(ApplicationOptions<AppState, AppStateManager> options) : base(options)
    {
    }

    // Handle incoming activities by overriding the corresponding activity handler method.
    protected override async Task OnMessageActivityAsync(ITurnContext<IMessageActivity> turnContext, AppState turnState, CancellationToken cancellationToken)
    {
        // Work with the input activity
        // For example, get input from turnContext.Activity and send response via turnContext.SendActivityAsync

        // string text = turnContext.Activity.Text.Trim();
        // await turnContext.SendActivityAsync(...);
    }
}
```

## Message extensions

Replace `TeamsActivityHandler` with the `Application<TurnState, TurnStateManager>`, and set up the Message extensions query handler by overriding `OnMessagingExtensionQueryAsync` and `OnMessagingExtensionSelectItemAsync` methods.

[Code sample](https://github.com/microsoft/teams-ai/blob/DOTNET/dotnet/samples/02.messageExtensions.a.searchCommand)

```C#
public class SearchCommandMessageExtension : Application<TurnState, TurnStateManager>
{
    public SearchCommandMessageExtension(ApplicationOptions<TurnState, TurnStateManager> options) : base(options)
    {
    }

    protected override async Task<MessagingExtensionResponse> OnMessagingExtensionQueryAsync(MessagingExtensionQuery query, ITurnContext<IInvokeActivity> turnContext, TurnState turnState, CancellationToken cancellationToken)
    {
        string text = query?.Parameters?[0]?.Value as string ?? string.Empty;
        // Work with the search query
        // For example, create search/action cards

        // Return results
        return new MessagingExtensionResponse
        {
            ComposeExtension = new MessagingExtensionResult
            {
                Type = "result",
                AttachmentLayout = "list",
                Attachments = attachments
            }
        };
    }

    protected override async Task<MessagingExtensionResponse> OnMessagingExtensionSelectItemAsync(JObject query, ITurnContext<IInvokeActivity> turnContext, TurnState turnState, CancellationToken cancellationToken)
    {
        // Generate detailed result
        // query.ToObject<Package>();

        // Return results
        return new MessagingExtensionResponse
        {
            ComposeExtension = new MessagingExtensionResult
            {
                Type = "result",
                AttachmentLayout = "list",
                Attachments = new List<MessagingExtensionAttachment> { attachment }
            }
        };
    }
}
```

## Adaptive Cards capabilities

Replace `TeamsActivityHandler` with the `Application<TurnState, TurnStateManager>`, and set up the Adaptive Card action handler by overriding `OnMessageActivityAsync` or `On*ExecuteAsync` or `On*InvokeAsync` or `On*SubmitAsync` methods.

[Code sample](https://github.com/microsoft/teams-ai/blob/DOTNET/dotnet/samples/03.adaptiveCards.a.typeAheadBot)

```C#
public class TypeAheadBotApplication : Application<TurnState, TurnStateManager>
{
    public TypeAheadBotApplication(ApplicationOptions<TurnState, TurnStateManager> options) : base(options) 
    {
    }

    protected override async Task OnMessageActivityAsync(ITurnContext<IMessageActivity> turnContext, TurnState turnState, CancellationToken cancellationToken)
    {
        // handling input messages or Adaptive Card Action.Submit events
        // turnContext.Activity.Type, turnContext.Activity.Value, ...
    }

    protected override async Task<SearchInvokeResponse> OnSearchInvokeAsync(SearchInvokeValue invokeValue, ITurnContext<IInvokeActivity> turnContext, TurnState turnState, CancellationToken cancellationToken)
    {
        string queryText = invokeValue.QueryText;
        // Work with the search query
        // For example, create search/action cards

        // Return result
        return new SearchInvokeResponse
        {
            StatusCode = 200,
            Type = "application/vnd.microsoft.search.searchResponse",
            Value = responseValue
        };
    }
}
```

## Core capabilities

### AI actions

The Bot responds to the user's input with the action `LightsOn` to turn the lights on.

The following example illustrates how Teams AI library makes it possible to manage the bot logic for handling an action `LightsOn` or `LightsOff` and connect it to the prompt used with OpenAI:

Example: [Light bot](https://github.com/microsoft/teams-ai/blob/DOTNET/dotnet/samples/04.ai.c.actionMapping.lightBot)

```C#
/// file: LightBotActions.cs
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
                    await turnContext.SendActivityAsync(MessageFactory.Text($"[pausing for {timeInt/1000} seconds]"));
                    await Task.Delay(timeInt);
                }
            }
        }

        return true;
    }

    [Action("LightStatus")]
    public async Task<bool> LightStatus([ActionTurnContext] ITurnContext turnContext, [ActionTurnState] AppState turnState)
    {
        await turnContext.SendActivityAsync(ResponseGenerator.LightStatus(turnState.Conversation!.LightsOn));
        return false;
    }

    [Action(DefaultActionTypes.UnknownActionName)]
    public async Task<bool> UnknownAction([ActionTurnContext] TurnContext turnContext, [ActionName] string action)
    {
        await turnContext.SendActivityAsync(ResponseGenerator.UnknownAction(action ?? "Unknown"));
        return false;
    }
}

/// file: TeamsLightBot.cs
public class TeamsLightBot : Application<AppState, AppStateManager>
{
    public TeamsLightBot(ApplicationOptions<AppState, AppStateManager> options) : base(options)
    {
        // Registering action handlers that will be hooked up to the planner.
        AI.ImportActions(new LightBotActions());
    }
}
```

### Intents to actions

A simple interface for actions and predictions allows bots to react when they have high confidence for taking action. Ambient presence lets bots learn intent, use prompts based on business logic, and generate responses.

Thanks to our AI library, the prompt needs only to outline the actions supported by the bot, and supply a few-shot examples of how to employ those actions. Conversation history helps with a natural dialogue between the user and bot, such as _add cereal to groceries list_, followed by _also add coffee_, which should indicate that coffee is to be added to the groceries list.

Prompt supports dynamic variables and function calls:

* Add your own variable to `AI.Prompt.Variables`, then it can be referenced in prompt as `{{$variable}}`.
* Add your own function call via `AI.Prompt.AddFunction`, then it can be referenced in prompt as `{{function}}`.
* Variables `{{$input}}`, `{{$output}}` and `{{$history}}` are built-in variables that automatically resolved from `TurnState.Temp``.

## Next step

> [!div class="nextstepaction"]
> [Get started with Teams AI library](how-conversation-ai-get-started.md)
