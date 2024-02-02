---
title: Bot configuration experience
author: surbhigupta
description: Learn about bot configuration experience.
ms.topic: conceptual
ms.author: surbhigupta
ms.localizationpriority: high
---

# Bot configuration experience

> [!NOTE]
>
> * Bot configuration experience is available in [public developer preview](../../resources/dev-preview/developer-preview-intro.md).
> * Bot configuration experience is supported in channel or group chat scopes only.

You can create a bot to enable the bot configuration settings for the user during the bot installation and also from the channel or group chat scope after the bot is installed.

In the following graphic, the bot is installed in a group chat. When the user hovers over the bot, an Adaptive Card appears. The user can select the settings icon in the Adaptive Card to update or change the bot's configuration settings:

:::image type="content" source="../../assets/images/bots/configurationbot.gif" alt-text="Screenshot shows the configuration option for the bot in a Teams group chat.":::

## Enable bot configuration experience

To enable the bot configuration settings from a channel or group chat scope, follow these steps:

1. [Update app manifest](#update-app-manifest)
1. [Configure your bot](#configure-your-bot)

### Update app manifest

You must configure the `fetchTask` property under `bots.configuration` object in the app manifest (previously called Teams app manifest) file as follows:

```json
"bots": [
    {
      "botId": "${{AAD_APP_CLIENT_ID}}",
     "needsChannelSelector": false,
      "scopes": [
        "personal",
        "team",
        "groupChat"
      ],
      "configuration":{
        "groupChat":{
          "fetchTask": true
        },
        "team":{
          "fetchTask": true
        }
      },
      "isNotificationOnly": false
    }
  ],
```

For more information, see [public developer preview app manifest schema](../../resources/schema/manifest-schema-dev-preview.md#botsconfiguration).

### Configure your bot

You can enable the configuration settings for your bot using the following methods:

* For JS:

  * `onInvokeActivity`

  * `handleTeamsConfigFetch` and `handleTeamsConfigSubmit`

* For C#:

  * `OnTeamsConfigFetchAsync`
  
  * `OnTeamsConfigSubmitAsync`

  * `onInvokeActivity`

#### Javascript code snippets

The following code snippets shows an example of `onInvokeActivity` and `handleTeamsConfigFetch`, `handleTeamsConfigSubmit`:

# [JS1](#tab/bot-framework-js)

This method handles specific invoke activities associated with fetching and submitting configurations. Upon receiving an invoke activity, the bot examines the activity's name to identify the operation type. If the activity is a `config/fetch` request, the bot produces a configuration response for authentication. On the other hand, if the activity is a `config/submit` request, the bot generates a Task Module Continue response that includes an Adaptive Card for additional interaction. This methodical approach enables the bot to respond suitably to various configuration-related requests.

```javascript
protected override async Task<InvokeResponse> OnInvokeActivityAsync(ITurnContext<IInvokeActivity> turnContext, CancellationToken cancellationToken)
{
    if (turnContext.Activity.Name == "config/fetch")
    {
        var response = new ConfigResponse<BotConfigAuth>
        {
            Config = new BotConfigAuth
            {
                SuggestedActions = new SuggestedActions
                {
                    Actions = new List<CardAction>
                    {
                        new CardAction
                        {
                            Type = "bot config type",
                            Title = "bot config title",
                            Image = "https://static-asm.secure.skypeassets.com/pes/v1/emoticons/win10/views/default_40",
                             Value = "bot config value"
                        }
                    }
                },
                Type = "auth"
            }

        };
        
        return new InvokeResponse { Status = 200, Body = response };

    }
    else if (turnContext.Activity.Name == "config/submit")
    {
        AdaptiveCard card = new AdaptiveCard("1.2")
        {
            Body = new List<AdaptiveElement>()
        };
        
        card.Body.Add(new AdaptiveContainer
        {
            Items = new List<AdaptiveElement>
            {
                new AdaptiveTextBlock
                {
                    Size = AdaptiveTextSize.Large,
                    Text = "bot config test",
                    Type = "TextBlock"
                }
            }
        });

        var response = new ConfigResponse<TaskModuleResponseBase>
        {
            Config = new TaskModuleContinueResponse
            {
                Value = new TaskModuleTaskInfo
                {
                    Height = 123,
                    Width = 456,
                    Title = "test title",
                    Card = new Attachment
                    {
                        ContentType = AdaptiveCard.ContentType,
                        Content = card
                    }
                },
                Type = "continue"
            }
        };

        return new InvokeResponse { Status = 200, Body = response };
    }

    return null;
}
```

# [JS2](#tab/teams-bot-sdk-js)

`OnInvokeActivityAsync` method in a bot application, which is designed to handle specific invoke activities related to fetching and submitting configurations. When an invoke activity is received, the bot checks the activity’s name to determine the type of operation. If the activity is a `config/submit` request, the bot generates a TaskModuleMessageResponse with a message. On the other hand, if the activity is a `config/fetch` request, the bot creates a `TaskModuleContinueResponse` containing an Adaptive Card for further interaction.

```javascript
protected override async Task<InvokeResponse> OnInvokeActivityAsync(ITurnContext<IInvokeActivity> turnContext, CancellationToken cancellationToken)
{
    if (turnContext.Activity.Name == "config/submit")
    {
        var response = new ConfigResponse<TaskModuleResponseBase>
        {
            Config = new TaskModuleMessageResponse
            {
                Value = "this is a message"
            }
        };
        return new InvokeResponse { Status = 200, Body = response };

    }
    else if (turnContext.Activity.Name == "config/fetch")
    {
        AdaptiveCard card = new AdaptiveCard("1.2")
        {
            Body = new List<AdaptiveElement>()
        };
        
        card.Body.Add(
            new AdaptiveContainer
            {
                Items = new List<AdaptiveElement>
                {
                    new AdaptiveTextBlock
                    {
                        Size = AdaptiveTextSize.Large,
                        Text = "bot config test",
                        Type = "TextBlock"
                    }
                }
            });
        
        // Construct a task module response with the task module URL and any data to be passed to the task module

        var response = new ConfigResponse<TaskModuleResponseBase>
        {
            Config = new TaskModuleContinueResponse
            {
                Value = new TaskModuleTaskInfo
                {
                    Height = 123,
                    Width = 456,
                    Title = "test title",
                    Card = new Attachment
                    {
                        ContentType = AdaptiveCard.ContentType,
                        Content = card
                    }
                },
                Type = "continue"
            }
        };

        return new InvokeResponse { Status = 200, Body = response };
    }

    return null;
}
```

---

#### C# code snippets

The following code snippets shows an example of:

| **Sample name** | **Method** |
|-----------------|-----------------|
|C# 1|`OnTeamsConfigFetchAsync`|
|C# 2|`OnTeamsConfigSubmitAsync`|
|C# 3|`OnInvokeActivityAsync`: For `config/fetch`, use `config/auth`; for `config/submit`, use `config/continue`.|
|C# 4|`OnInvokeActivityAsync`: For `config/fetch`, use `config/continue`; for `config/submit`, use `config/message`.|

# [C# 1](#tab/teams-bot-sdk2)

Method 1: `OnTeamsConfigFetchAsync` and `OnTeamsConfigSubmitAsync` methods are engineered to manage particular invoke activities associated with fetching and submitting configurations. The `OnTeamsConfigFetchAsync` method produces a configuration response for authentication upon receiving a configuration fetch request. It forms a `BotConfigAuth` object with suggested actions and delivers this response. Conversely, the `OnTeamsConfigSubmitAsync` method deals with configuration submit requests. It creates a `TaskModuleMessageResponse` with a test message and returns this response.

```csharp
protected override Task<ConfigResponseBase> OnTeamsConfigFetchAsync(ITurnContext<IInvokeActivity> turnContext, JObject configData, CancellationToken cancellationToken)
{
 
    ConfigResponseBase response = new ConfigResponse<BotConfigAuth>
    {
        Config = new BotConfigAuth
        {
            SuggestedActions = new SuggestedActions
            {
                Actions = new List<CardAction>
                {
                    new CardAction
                    {
                        Type = "bot config type",
                        Title = "bot config title",
                        Image = "https://static-asm.secure.skypeassets.com/pes/v1/emoticons/win10/views/default_40",
                        Value = "bot config value"
                    }
                }
            },
            Type = "auth"
        }
    };
 
    return Task.FromResult(response);
}
 
protected override Task<ConfigResponseBase> OnTeamsConfigSubmitAsync(ITurnContext<IInvokeActivity> turnContext, JObject configData, CancellationToken cancellationToken)
{
    ConfigResponseBase response = new ConfigResponse<TaskModuleResponseBase>
    {
        Config = new TaskModuleMessageResponse
        {
            Value = "test message"
        }
    };
 
    return Task.FromResult(response);
}
```

# [C# 2](#tab/teams-bot-sdk)

Method 2: `OnTeamsConfigFetchAsync` and `OnTeamsConfigSubmitAsync` methods are specifically designed to manage invoke activities associated with fetching and submitting configurations on Microsoft Teams. Each method invokes the `createConfigContinueResponse` function, generating a `TaskModuleContinueResponse` that includes an Adaptive Card. This card is built with a text block that displays the text bot config test. The `TaskModuleContinueResponse` is subsequently returned as the response for both fetch and submit operations.

```csharp
protected override Task<ConfigResponseBase> OnTeamsConfigFetchAsync(ITurnContext<IInvokeActivity> turnContext, JObject configData, CancellationToken cancellationToken)
{
    ConfigResponseBase response = createConfigContinueResponse();
    return Task.FromResult(response);
}
 
protected override Task<ConfigResponseBase> OnTeamsConfigSubmitAsync(ITurnContext<IInvokeActivity> turnContext, JObject configData, CancellationToken cancellationToken)
{
    ConfigResponseBase response = createConfigContinueResponse();
    return Task.FromResult(response);
}
 
private ConfigResponseBase createConfigContinueResponse()
{
    AdaptiveCard card = new AdaptiveCard("1.2")
    {
        Body = new List<AdaptiveElement>()
    };
 
    card.Body.Add(
        new AdaptiveContainer
        {
            Items = new List<AdaptiveElement>
            {
                new AdaptiveTextBlock
                {
                    Size = AdaptiveTextSize.Large,
                    Text = "bot config test",
                    Type = "TextBlock"
                }
            }
        });
 
    ConfigResponseBase response = new ConfigResponse<TaskModuleResponseBase>
    {
        Config = new TaskModuleContinueResponse
        {
            Value = new TaskModuleTaskInfo
            {
                Height = 123,
                Width = 456,
                Title = "test title",
                Card = new Attachment
                {
                    ContentType = AdaptiveCard.ContentType,
                    Content = card
                }
            },
            Type = "continue"
        }
    };
 
    return response;
}
```

# [C# 3](#tab/teams-bot-sdk3)

Method 1: The `OnInvokeActivityAsync` method manages incoming invoke activities for a bot application. It accepts a `turnContext` object, which represents the activity, and a `cancellationToken` for asynchronous operations. The method determines the requested operation type by examining the activity’s name. If the name is `config/fetch`, the bot forms a `ConfigResponse<BotConfigAuth>` object that includes bot configuration details and returns it as an `InvokeResponse` with a 200 status code. If the name is `config/submit`, the bot generates a `ConfigResponse<TaskModuleResponseBase>` that encapsulates the necessary configuration details in an Adaptive Card and also returns it with a 200 status code.

```csharp
protected override async Task<InvokeResponse> OnInvokeActivityAsync(ITurnContext<IInvokeActivity> turnContext, CancellationToken cancellationToken)
{
    if (turnContext.Activity.Name == "config/fetch")
    {
        var response = new ConfigResponse<BotConfigAuth>
        {
            Config = new BotConfigAuth
            {
                SuggestedActions = new SuggestedActions
                {
                    Actions = new List<CardAction>
                    {
                        new CardAction
                        {
                            Type = "bot config type",
                            Title = "bot config title",
                            Image = "https://static-asm.secure.skypeassets.com/pes/v1/emoticons/win10/views/default_40",
                             Value = "bot config value"
                        }
                    }
                },
                Type = "auth"
            }

        };
        
        return new InvokeResponse { Status = 200, Body = response };

    }
    else if (turnContext.Activity.Name == "config/submit")
    {
        AdaptiveCard card = new AdaptiveCard("1.2")
        {
            Body = new List<AdaptiveElement>()
        };
        
        card.Body.Add(new AdaptiveContainer
        {
            Items = new List<AdaptiveElement>
            {
                new AdaptiveTextBlock
                {
                    Size = AdaptiveTextSize.Large,
                    Text = "bot config test",
                    Type = "TextBlock"
                }
            }
        });

        var response = new ConfigResponse<TaskModuleResponseBase>
        {
            Config = new TaskModuleContinueResponse
            {
                Value = new TaskModuleTaskInfo
                {
                    Height = 123,
                    Width = 456,
                    Title = "test title",
                    Card = new Attachment
                    {
                        ContentType = AdaptiveCard.ContentType,
                        Content = card
                    }
                },
                Type = "continue"
            }
        };

        return new InvokeResponse { Status = 200, Body = response };
    }

    return null;
}
```

# [C# 4](#tab/teams-bot-sdk4)

Method 2: The `OnInvokeActivityAsync` method, which is tasked with managing incoming invoke activities in a bot application. It begins by inspecting the name of the incoming activity using `turnContext.Activity.Name`. If the activity name is `config/submit`, it formulates a `ConfigResponse<TaskModuleResponseBase>` that includes a simple message response and returns it as an `InvokeResponse` with a status code of 200. Alternatively, if the activity name is `config/fetch`, it constructs an AdaptiveCard to symbolize configuration data and encapsulates it within a `ConfigResponse<TaskModuleResponseBase>`. This response comprises details such as card content, dimensions, and title, and is returned with a status code of 200. If the incoming activity’s name doesn’t match either `config/submit` or `config/fetch`, the method returns null, indicating that the activity does not necessitate a specific action.

```csharp
protected override async Task<InvokeResponse> OnInvokeActivityAsync(ITurnContext<IInvokeActivity> turnContext, CancellationToken cancellationToken)
{
    if (turnContext.Activity.Name == "config/submit")
    {
        var response = new ConfigResponse<TaskModuleResponseBase>
        {
            Config = new TaskModuleMessageResponse
            {
                Value = "this is a message"
            }
        };
        return new InvokeResponse { Status = 200, Body = response };

    }
    else if (turnContext.Activity.Name == "config/fetch")
    {
        AdaptiveCard card = new AdaptiveCard("1.2")
        {
            Body = new List<AdaptiveElement>()
        };
        
        card.Body.Add(
            new AdaptiveContainer
            {
                Items = new List<AdaptiveElement>
                {
                    new AdaptiveTextBlock
                    {
                        Size = AdaptiveTextSize.Large,
                        Text = "bot config test",
                        Type = "TextBlock"
                    }
                }
            });
        
        // Construct a task module response with the task module URL and any data to be passed to the task module

        var response = new ConfigResponse<TaskModuleResponseBase>
        {
            Config = new TaskModuleContinueResponse
            {
                Value = new TaskModuleTaskInfo
                {
                    Height = 123,
                    Width = 456,
                    Title = "test title",
                    Card = new Attachment
                    {
                        ContentType = AdaptiveCard.ContentType,
                        Content = card
                    }
                },
                Type = "continue"
            }
        };

        return new InvokeResponse { Status = 200, Body = response };
    }

    return null;
}
```

---

## Bot configuration experience in Teams

After you've created a bot to enable the bot configuration settings from a team or group chat scope, the user can configure and reconfigure the bot in Teams.

To configure the bot, follow these steps:

1. Go to **Microsoft Teams**.

1. Select **Apps**.

1. From the Teams store, select a bot app you want to install.

1. From the dropdown next to **Add**, select **Add to a team** or **Add to a chat**.

   :::image type="content" source="../../assets/images/bots/group-chat-add-Bot.png" alt-text="Screenshot shows add your bot to chat.":::

1. Enter the name of a chat in the search field.

   :::image type="content" source="../../assets/images/bots/add-bot-to-chat.png" alt-text="Screenshot shows bot added to a chat.":::

1. Select **Set up a bot**.

   :::image type="content" source="../../assets/images/bots/set-up-a-bot.png" alt-text="Screenshot shows set up a bot in chat.":::

   The bot is installed in the chat.

### Reconfigure the bot

To reconfigure the bot, follow these steps:

1. Go to the chat and **@mention** the bot in the message compose area and select **Send**.

   :::image type="content" source="../../assets/images/bots/mention-bot.png" alt-text="Screenshot shows the interaction of bot.":::

1. When you hover over the bot from the conversation, an Adaptive Card appears. Select the **Settings** icon in the Adaptive Card.

   :::image type="content" source="../../assets/images/bots/bot-adaptive-card-interaction.png" alt-text="Screenshot shows the Adaptive Card with settings icon.":::

   A bot configuration Adaptive Card appears.

1. Reconfigure the bot settings and select **Submit**.

   :::image type="content" source="../../assets/images/bots/reconfigure-bot-settings.png" alt-text="Screenshot shows the Adaptive Card with settings icon to reconfigure.":::

   The bot sends a response message.

## Code sample

| **Sample name** | **Description** |**Node.js** |
|-----------------|-----------------|----------------|
| Bot configuration experience | This sample code describes the configuration and reconfiguration for bots in team and group chat. |[View](https://github.com/OfficeDev/Microsoft-Teams-Samples/tree/main/samples/bot-configuration-app/nodejs)|

## Step-by-step guide

Follow the [step-by-step guide](../../qsg-bot-configuration-experience.yml) to configure your bot during installation or after installation from the team or group chat where the bot is installed.

## See also

* [Build bots for Teams](../what-are-bots.md)
* [Adaptive Cards](../../task-modules-and-cards/what-are-cards.md#adaptive-cards)
