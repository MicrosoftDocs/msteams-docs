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

When a user installs the bot in a team or group chat scope, the `fetchTask` property in the app manifest file initiates `config/fetch` defined in the `teamsBot.js` file. The bot responds with an Adaptive Card and the user provides relevant information in the Adaptive Card and selects **Submit**. After the user selects **Submit**, a `config/submit` is returned to the bot and the bot configuration is complete.

You can use `config/fetch` and `config/submit` properties in the `teamsBot.js` file to enable the bot configuration experience in a team or group chat.

* Invoke `config/fetch`: You must invoke `config/fetch` task to start the bot configuration flow and define the bot response as required.

  In the following example, when the bot receives `config/fetch` invoke activity, the bot responds with an Adaptive Card:

    ```javascript
    if (context._activity.name == "config/fetch") {
      const adaptiveCard = CardFactory.adaptiveCard(this.adaptiveCardForDynamicSearch());
      try {
          return {
              status: 200,
              body: {
                  config: {
                      type: 'continue',
                      value: {
                          card: adaptiveCard,
                          height: 400,
                          title: 'Task module fetch response',
                          width: 300
                      }
                  }
              }
          }
      } catch (e) {
          console.log(e);
      }
    }
    ```

* Invoke `config/submit`: You must invoke the `config/submit` task for the bot to respond to the user's input.
  In the following example, when the bot receives the `config/submit` invoke activity, the bot responds with an Adaptive Card or a message:

    ```javascript
    if (context._activity.name == "config/submit") {
    
      const choice = context._activity.value.data.choiceselect.split(" ")[0];
      chosenFlow = choice;
    
      if (choice === "static_option_2") {
          const adaptiveCard = CardFactory.adaptiveCard(this.adaptiveCardForStaticSearch());
    
          return {
              status: 200,
              body: {
                  config: {
                      type: 'continue',
                      value: {
                          card: adaptiveCard,
                          height: 400,
                          title: 'Task module submit response',
                          width: 300
                      }
                  }
              }
          }
      }
      else {
    
          try {
              return {
                  status: 200,
                  body: {
                      config: {
                          type: 'message',
                          value: "end"
                      }
                  }
              }
          }
    ```

## Code snippets

The following code provides an example of a bot configuration experience:

### [C#](#tab/dotnet1)

If the Name is "config/fetch", it creates a ConfigResponse object with a `BotConfigAuth` object. This object contains a list of suggested actions for the bot, each represented as a `CardAction`. The `ConfigResponse` is then returned as the body of an `InvokeResponse` with a status code of 200.

If the Name is "config/submit", it creates an AdaptiveCard with a single `AdaptiveTextBlock` element. This card is then used to create a `TaskModuleContinueResponse`, which is returned as the body of an `InvokeResponse` with a status code of 200.

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

### [C#](#tab/dotnet2)

If the Name is "config/submit", it creates a `ConfigResponse` object with a `TaskModuleMessageResponse` object. This object contains a message string. The `ConfigResponse` is then returned as the body of an `InvokeResponse` with a status code of 200.

If the Name is "config/fetch", it creates an AdaptiveCard with a single `AdaptiveTextBlock` element. This card is then used to create a `TaskModuleContinueResponse`, which is returned as the body of an `InvokeResponse` with a status code of 200.

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

### [JS](#tab/js1)

If the command is "card", it creates a configuration object with suggested actions for the bot.
If the command is "message", it creates an Adaptive Card with a single TextBlock element. This card is then used to create a configuration object.

```javascript
// extending both handlers

    async handleTeamsConfigFetch(_context, configData) {
        let response = {};
        switch (configData.command) {
            case 'card':
                {
                    response.config = {
                        suggestedActions: {
                            actions: [
                                {
                                    type: 'bot config auth',
                                    title: 'bot config title',
                                    image:
                                        'https://static-asm.secure.skypeassets.com/pes/v1/emoticons/win10/views/default_40',
                                    value: 'bot config auth value',
                                },
                            ],
                        },
                        type: 'auth',
                    };
                }
                break;
            case 'message':
                {
                    const cardJson = {
                        type: 'AdaptiveCard',
                        version: '1.4',

                        body: [
                            {
                                type: 'TextBlock',
                                text: 'Bot Config Fetch',
                            },
                        ],
                    };
                    const card = CardFactory.adaptiveCard(cardJson);

                    response = {
                        config: {
                            value: {
                                height: 200,
                                width: 200,
                                title: 'test card fetch',
                                card,
                            },
                            type: 'continue',
                        },
                    };
                }
                break;
            default:
                console.log('no default');
        }

        return response;
    }

    async handleTeamsConfigSubmit(_context, configData) {
        let response = {};
        switch (configData.command) {
            case 'card':
                {
                    const cardJson = {
                        type: 'AdaptiveCard',
                        version: '1.4',

                        body: [
                            {
                                type: 'TextBlock',
                                text: 'Bot Config Submit',
                            },
                        ],
                    };
                    const card = CardFactory.adaptiveCard(cardJson);

                    response = {
                        config: {
                            value: {
                                height: 200,
                                width: 200,
                                title: 'test card submit',
                                card,
                            },
                            type: 'continue',
                        },
                    };
                }
                break;
            case 'message':
                {
                    response = {
                        config: {
                            value: 'config submit text',
                            type: 'message',
                        },
                    };
                }
                break;
            default:
                console.log('no default');
                break;
        }

        return response;
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
