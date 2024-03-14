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
> Bot configuration experience is supported in channel or group chat scopes only.

In the dynamic domain of conversational AI and bot development, comprehensive configuration options are key to seamless user interactions. It's important to arm developers with the tools they need to effectively manage and personalize their bots in environments such as Microsoft Teams. 

This article explores how to implement bot configuration functionalities using the Microsoft Bot Framework SDK. We examine two types of methods: universally applicable ones and those specific to Microsoft Teams. Understanding these methods allows developers to tailor bot configurations to meet unique needs while ensuring cross-platform compatibility. By leveraging these methods, developers can create complex bot configurations that enhance user engagement and efficiency, whether across multiple platforms or specifically within the Microsoft Teams framework. 

Build a bot that provides bot configuration settings for users during the bot's installation process and within the channel or group chat scope after the bot's deployment.

There are two ways to initiate bot configuration settings:

1. @mention the bot in the message compose area.

   :::image type="content" source="../../assets/images/bots/mention-bot-in-compose-area.png" alt-text="Screenshot shows the configuration option for the bot in the message compose area.":::

1. When the user hovers over the bot, an Adaptive Card appears. The user can select the settings icon in the Adaptive Card to update or change the bot's configuration settings.

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

For more information, see [app manifest schema](../../resources/schema/manifest-schema.md#botsconfiguration).

### Configure your bot

When a user installs the bot in a team or group chat scope, the `fetchTask` property in the app manifest file initiates `config/fetch` or `config/submit`. The bot responds with an Adaptive Card, when the user provides relevant information in the Adaptive Card and selects Submit, `config/submit` or `config/continue` is returned to the bot and the bot configuration is complete.

You can use the following methods to enable configuration settings for a bot:

1. Non-Teams Methods:

   1. `OnInvokeActivity`: The `OnInvokeActivity` method is a fundamental component of the Bot Framework SDK. It enables developers to handle incoming activities that are not recognized by any other method in the bot's logic. This method provides flexibility for handling a wide range of activities, including user interactions, within the bot's conversation flow.

   1. `OnInvokeActivityAsync`: `OnInvokeActivityAsync` serves as an asynchronous counterpart to `OnInvokeActivity`. It allows developers to handle incoming activities asynchronously, making it suitable for long-running or asynchronous tasks. This method enhances responsiveness and scalability in bot applications by offloading processing tasks to asynchronous operations.

1. Teams-Specific Methods:

   1. `HandleTeamsConfig`: This method offers granular control over configuration-related activities within the bot's logic. Developers can use `HandleTeamsConfig` to implement custom logic or additional processing when handling configuration events in Microsoft Teams. This fine-tuned approach ensures bots adapt seamlessly to dynamic configuration changes within the Teams environment.

   1. `OnTeamsConfig:`: Similar to `HandleTeamsConfig`, `OnTeamsConfig` is tailored for Microsoft Teams bot development. Specifically designed for Microsoft Teams bot development, the `OnTeamsConfig` method facilitates the handling of configuration-related activities within the bot. It is part of the TeamsActivityHandler class provided by the Bot Framework SDK for Teams. This method empowers developers to respond to configuration events, such as user-initiated bot configurations or updates to bot settings within the Teams platform.

#### Non-Teams method

The following code snippets shows an example of Non-Teams method for JS and C#:

# [Javascript](#tab/JS1)

The `onInvokeActivity` function simplifies the handling of invoke activities. For `config/fetch`, it uses `adaptiveCardForContinue()` to create an Adaptive Card and returns a 200 status response with the card included. For `config/submit`, it checks the choice variable; if it’s `continue`, it calls `adaptiveCardForSubmit()` for an Adaptive Card and returns a 200 status response with the card. Else, it returns a 200 status response with a completion message.

```javascript
async onInvokeActivity(context) {
  if (context._activity.name == "config/fetch"){
    const adaptiveCard = CardFactory.adaptiveCard(this.adaptiveCardForContinue());
    try {  
      return {
        status: 200,
        body:{
          config: {
            type: 'continue',
            value: {
              card: adaptiveCard,
              height: 400,
              title: 'Config continue response',
              width: 300
            }
          }
        }
      }     
    }
    catch (e) {
      console.log(e);
    }    
  }

  if (context._activity.name == "config/submit"){
    const choice = context._activity.value.data.choiceselect;
    if(choice==="continue"){
      const adaptiveCard = CardFactory.adaptiveCard(this.adaptiveCardForSubmit());              
      return {
        status: 200,
        body:{
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
    } else {
      try {         
        return {
          status: 200,
          body:{
            config: {
              type: 'message',
              value: "end"
            }
          }
        }
      } catch (e) {
        console.log(e);
      }
    }
    return await super.onInvokeActivity(context);
  }
}

adaptiveCardForContinue = () => ({
  "$schema": "http://adaptivecards.io/schemas/adaptive-card.json",
  "version": "1.2",
  "type": "AdaptiveCard",
  "body": [
    {
      "text": "Please choose bot set up option",
      "wrap": true,
      "type": "TextBlock"
    },
    {
      "columns": [
        {
          "width": "auto",
          "items": [
            {
              "text": "Option: ",
              "wrap": true,
              "height": "stretch",
              "type": "TextBlock"
            }
          ],
          "type": "Column"
        }
      ],
      "type": "ColumnSet"
    },
    {
      "columns": [
        {
          "width": "stretch",
          "items": [
            {
              "choices": [
                {
                  "title": "Continue with more options",
                  "value": "continue"
                },
                {
                  "title": "Finish setting up bot",
                  "value": "finish"
                }
              ],
              "style": "filtered",
              "placeholder": "Search for an option",
              "id": "choiceselect",
              "type": "Input.ChoiceSet"
            }
          ],
          "type": "Column"
        }
      ],
      "type": "ColumnSet"
    }
  ],
  "actions": [
    {
      "type": "Action.Submit",
      "id": "submit",
      "title": "Submit"
    }
  ]
});

adaptiveCardForSubmit= () => ({
  "$schema": "http://adaptivecards.io/schemas/adaptive-card.json",
  "version": "1.2",
  "type": "AdaptiveCard",
  "body": [
    {
      "text": "Please hit submit to continue setting up bot",
      "wrap": true,
      "type": "TextBlock"
    }
  ],
  "actions": [
    {
      "type": "Action.Submit",
      "id": "submitdynamic",
      "title": "Submit"
    }
  ]
});
```

# [C#](#tab/teams-bot-sdk1)

The `onInvokeActivityAsync` method is designed to handle different types of invoke activities. Such as:

1. For activities related to configuration or fetching information, the method utilizes `config/auth`; whereas for submission-related activities, it employs `config/continue`.

1. For activities related to configuration or fetching information, the method utilizes `config/continue`; whereas for submission-related activities, it employs `config/message`.

   # [C# 1](#tab/teams-bot-sdk2)

      The `OnInvokeActivityAsync` method simplifies handling of invoke activities in a bot. It uses a `turnContext` object to represent the activity and a `cancellationToken` for async tasks. For `config/fetch`, it creates a `ConfigResponse<BotConfigAuth>` with bot details and returns a 200 status `InvokeResponse`. For `config/submit`, it forms a `ConfigResponse<TaskModuleResponseBase>` with configuration details in an Adaptive Card and returns a 200 status code.

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
                                  type: "openUrl",
                                  value: "https://example.com/auth",
                                  title: "Sign in to this app"
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

   # [C# 2](#tab/teams-bot-sdk3)

      The `OnInvokeActivityAsync` method efficiently manages invoke activities in a bot application. It checks the activity’s name using `turnContext.Activity.Name`. For `config/submit`, it creates a `ConfigResponse<TaskModuleResponseBase>` with a message response and returns a 200 status `InvokeResponse`. For `config/fetch`, it builds an AdaptiveCard for configuration data, wrapped in a `ConfigResponse<TaskModuleResponseBase>` with card details, and returns a 200 status. If the activity name isn't either `config/submit` or `config/fetch`, it returns null.

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

---

#### Teams-specific method

The following code snippets shows an example of Teams-specific method for JS and C#:

# [Javascript](#tab/JS2)

`handleTeamsConfigFetch` and `handleTeamsConfigSubmit`: The `handleTeamsConfigFetch` method generates an Adaptive Card labeled `Bot Config Fetch` and offers two response alternatives an `auth` response, which suggests an action to launch a URL for authentication, and a `continue` response, which presents an Adaptive Card. The `handleTeamsConfigSubmit` method deals with the user's selection from the Adaptive Card and responds appropriately.

```javascript
async handleTeamsConfigFetch(_context, _configData) {
    let response = {};
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
    /*
    Option 1: You can add a "config/auth" response as below code
    Note: The URL in value must be linked to a valid auth URL which can be opened in a browser. This code is only representative and not a working example.
    */
    /*response = {
        config: {
            type: "auth",
            suggestedActions: {
                actions: [
                    {
                        type: "openUrl",
                        value: "https://example.com/auth",
                        title: "Sign in to this app"
                    }]
            },
        },
    };*/

    /*
      Option 2: You can add a "config/continue" response as below code
      */
    const adaptiveCard = CardFactory.adaptiveCard(this.adaptiveCardForContinue());
    response = {
        config: {
            value: {
                card: adaptiveCard,
                height: 200,
                width: 200,
                title: 'test card',
            },
            type: 'continue',
        },
    };
    return response;
}

async handleTeamsConfigSubmit(context, _configData) {
    let response = {};
    const choice = context._activity.value.data.choiceselect;
    if (choice === "continue") {
        const adaptiveCard = CardFactory.adaptiveCard(this.adaptiveCardForSubmit());
        response = {
            config: {
                type: 'continue',
                value: {
                    card: adaptiveCard,
                    height: 200,
                    width: 200,
                    title: 'Task module submit response',
                }
            },
        };
        return response;
    } else {
        response = {
            config: {
                type: 'message',
                value: 'You have chosen to finish setting up bot',
            },
        };
        return response;
    }
}
```

The provided code snippets create two Adaptive Cards for setting up a bot in Teams. The `adaptiveCardForContinue` function makes a card that lets the user choose a setup option, either to `Continue with more options` or `Finish setting up bot`. Users can search for options with `Search for an option`. The card has a `Submit` button.

The `adaptiveCardForSubmit` function also makes an Adaptive Card. This one asks the user to submit to move forward with setting up the bot. It includes a `Submit` button.


```javascript

adaptiveCardForContinue = () => ({
  "$schema": "http://adaptivecards.io/schemas/adaptive-card.json",
  "version": "1.2",
  "type": "AdaptiveCard",
  "body": [
    {
      "text": "Please choose bot set up option",
      "wrap": true,
      "type": "TextBlock"
    },
    {
      "columns": [
        {
          "width": "auto",
          "items": [
            {
              "text": "Option: ",
              "wrap": true,
              "height": "stretch",
              "type": "TextBlock"
            }
          ],
          "type": "Column"
        }
      ],
      "type": "ColumnSet"
    },
    {
      "columns": [
        {
          "width": "stretch",
          "items": [
            {
              "choices": [
                {
                  "title": "Continue with more options",
                  "value": "continue"
                },
                {
                  "title": "Finish setting up bot",
                  "value": "finish"
                }
              ],
              "style": "filtered",
              "placeholder": "Search for an option",
              "id": "choiceselect",
              "type": "Input.ChoiceSet"
            }
          ],
          "type": "Column"
        }
      ],
      "type": "ColumnSet"
    }
  ],
  "actions": [
    {
      "type": "Action.Submit",
      "id": "submit",
      "title": "Submit"
    }
  ]
});

adaptiveCardForSubmit = () => ({
  "$schema": "http://adaptivecards.io/schemas/adaptive-card.json",
  "version": "1.2",
  "type": "AdaptiveCard",
  "body": [
    {
      "text": "Please hit submit to continue setting up bot",
      "wrap": true,
      "type": "TextBlock"
    }
  ],
  "actions": [
    {
      "type": "Action.Submit",
      "id": "submitdynamic",
      "title": "Submit"
    }
  ]
});

```

# [C#](#tab/JS3)

#### C# code snippets

1. `OnTeamsConfigFetchAsync`
1. `OnTeamsConfigSubmitAsync`

   # [C# 1](#tab/teams-bot-sdk4)

      `OnTeamsConfigFetchAsync` and `OnTeamsConfigSubmitAsync` are designed to handle specific types of invoke activities for bot configurations in Teams. `OnTeamsConfigFetchAsync` responds to configuration fetch requests with a `BotConfigAuth` object that includes suggested actions. `OnTeamsConfigSubmitAsync` responds to configuration submit requests with a `TaskModuleMessageResponse` that contains a test message. Both methods help manage bot configurations by responding to different requests.

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
                              type: "openUrl",
                              value: "https://example.com/auth",
                              title: "Sign in to this app"
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

   # [C# 2](#tab/teams-bot-sdk5)

      `OnTeamsConfigFetchAsync` and `OnTeamsConfigSubmitAsync` methods are made for specific tasks in Teams related to bot configurations. They both use the `createConfigContinueResponse` function to make a `TaskModuleContinueResponse`. This response includes an Adaptive Card with a text block saying `bot config test`. This `TaskModuleContinueResponse` is then given back as the answer for both fetching and submitting configurations.

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
     ---

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
