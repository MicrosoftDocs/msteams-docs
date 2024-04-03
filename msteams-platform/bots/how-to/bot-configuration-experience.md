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

Bot configuration in Microsoft Teams, which allows you to create bots that can be configured at the time of installation in channel or group chat scopes. Bot configuration is intended to solve the problem of bots that require context or settings to operate properly, such as bots that integrate with external services such as JIRA, ADO, or Power BI. By using the bot configuration, you can provide a task module that prompts the user to enter the required information, such as a URL, an area path, or a dashboard link, before the bot can start working. This way, the bot can avoid sending multiple notifications or requests for configuration after the installation, which can be annoying or confusing for the users.

The article will explain how to use the Teams SDK method for implementing bot configuration, along with a scenario and best practices for its use.

Consider a situation where a user installs a bot, only to discover that the default settings don't align with their workflow. If the bot lacks configuration capabilities, users might feel limited by its preset behavior, resulting in decreased engagement and usage. However, by incorporating bot configuration, developers empower users to tailor bot settings according to their preferences and needs, thereby enhancing user satisfaction and interaction with the bot.

The following graphic explains a streamlined process for integrating a bot into a Teams channel.

   :::image type="content" source="../../assets/images/bots/scenario.gif" alt-text="Graphic shows the process for integrating a bot into a Teams channel.":::

| Steps | Description |
| --- | --- |
| 1 | The user selects **Add to a channel** from the dropdown menu.|
| 2 | Enter the name of a channel in the search field.|
| 3 | Select the channel.|
| 4| Configure the bot app, you need to set up the task module to initiate a notification or communication to the developer endpoint. This endpoint is defined in the manifest. Follow these steps to provide the necessary settings.|
| 5| After the setup phase, the app sends a welcome Adaptive Card to the channel. This message is visible to all users, enabling any user in the channel to configure the app without restrictions. If a conflict arises, the system considers the most recently saved settings.|
| 6| Select Settings to launch a task module.|

## Key features

* Personalized user experience: Bot configuration allows users to customize bot behaviour. This ensures that the interactions align with their workflow and preferences.

* Increased engagement: Personalized experiences lead to higher user engagement. Configured bots are more likely to meet user expectations, encouraging frequent interactions and driving up engagement metrics such as monthly active users (MAU) rates.

* Adaptability: User needs change over time, bots must adapt to meet these evolving requirements. Bot configuration allows users to reconfigure settings as their requirements change, ensuring the bot continues to provide value and relevance in the long term.

When you're creating a bot for Teams, it’s important to make sure users have a smooth experience and provision control to personalize their bots in places like Teams. The ability to configure bots post-installation within Teams allows developers to fine-tune bot functionality according to user requirements even after deployment. You can use methods from the Teams SDK to implement bot configuration features that enhance user engagement and productivity.

The article will explain how to use the Teams SDK method to implement the bot configuration feature, and provide some scenarios and best practices for using it.

## Enable bot configuration experience

Let's build a bot that provides bot configuration settings for users during the bot's installation process and within the channel or group chat scope post-installation.

To enable the bot configuration settings follow these steps:

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

When a user installs the bot in a team or group chat scope:

1. If the `fetchTask: false` property in the app manifest. The bot responds to the invoke request with a `task` object that contains either a `taskInfo` object with the Adaptive Card or web URL, or a simple string message.

1. If the `fetchTask: true` property in the app manifest file initiates `config/fetch` or `config/submit`. The bot responds with an task module or Adaptive Card, when the user provides relevant information in the Adaptive Card and selects Submit, `config/submit` or `config/continue` is returned to the bot and the bot configuration is complete.

  Upon receiving the initial `config/fetch` request, you've the option to respond with either:

  1. `config/continue`: The bot’s capability to handle configuration fetch requests by presenting an Adaptive Card to the user. This card, titled `test card`, is designed with specified dimensions and is meant to facilitate the continuation of the bot setup process.

  Upon submission of the configuration data, the `handleTeamsConfigSubmit` function evaluates the user’s choice. If the user selects `continue`, another Adaptive Card is generated by the `adaptiveCardForSubmit` method. This card is intended for the task module submit response, maintaining the same dimensions and providing a seamless continuation of the setup process.

     # [JavaScript](#tab/JS2)

      * [Code sample](https://github.com/OfficeDev/Microsoft-Teams-Samples/tree/main/samples/bot-configuration-app/nodejs)

      * [Sample code reference](https://github.com/OfficeDev/Microsoft-Teams-Samples/blob/main/samples/bot-configuration-app/nodejs/teamsBot.js#L83)

      ```javascript
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
      ``` 

     # [C# 2](#tab/teams-bot-sdk5)

      * [Code sample](https://github.com/OfficeDev/Microsoft-Teams-Samples/tree/main/samples/bot-configuration-app/csharp)

      * [Sample code reference](https://github.com/OfficeDev/Microsoft-Teams-Samples/blob/main/samples/bot-configuration-app/csharp/Bot%20configuration/Bots/TeamsBot.cs#L168)

       ```csharp
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
       ```
    ---

  1. `config/auth`: The config object is set to the type `auth`, which suggests an action for the user to open a URL for authentication purposes. The action provided is to `Sign in to this app`, with a placeholder URL that should be replaced with a valid authentication link. This setup is essential for scenarios where the bot requires the user to be authenticated before they can proceed with further interactions or access certain features. It make sures that the user’s identity is verified, maintaining security and personalized experiences within the bot’s functionality.

     # [JavaScript](#tab/JS2)

      * [Code sample](https://github.com/OfficeDev/Microsoft-Teams-Samples/tree/main/samples/bot-configuration-app/nodejs)

      * [Sample code reference](https://github.com/OfficeDev/Microsoft-Teams-Samples/blob/main/samples/bot-configuration-app/nodejs/teamsBot.js#L69C7-L80C6)

      ```javascript
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
      ```

     # [C# 1](#tab/teams-bot-sdk4)

      * [Code sample](https://github.com/OfficeDev/Microsoft-Teams-Samples/tree/main/samples/bot-configuration-app/csharp)

      * [Sample code reference](https://github.com/OfficeDev/Microsoft-Teams-Samples/blob/main/samples/bot-configuration-app/csharp/Bot%20configuration/Bots/TeamsBot.cs#L84)

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
       ```

    ---

## Bot configuration experience in Teams

After you've created and published the bot in Teams store, the user can configure and reconfigure the bot in Teams.

There are two ways to initiate bot configuration settings post-installation:

1. @mention the bot in the message compose area.

   :::image type="content" source="../../assets/images/bots/mention-bot-in-compose-area.gif" alt-text="Screenshot shows the configuration option for the bot in the message compose area.":::

1. When the user hovers over the bot, the bot profile card appears. The user can select the settings icon in the bot profile card to update or change the bot's configuration settings.

   :::image type="content" source="../../assets/images/bots/configurationbot.gif" alt-text="Screenshot shows the configuration option for the bot in a Teams group chat.":::

To configure the bot, follow these steps:

1. Go to **Microsoft Teams**.

1. Select **Apps**.

1. From Teams store, select a bot app you want to install.

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

   The bot sends a response message and now the bot is configured.

   :::image type="content" source="../../assets/images/bots/setting-up-bot.png" alt-text="Screenshot shows the bot configuration set up is complete.":::

## Code sample

| **Sample name** | **Description** |**Node.js** |
|-----------------|-----------------|----------------|
| Bot configuration experience | This sample code describes the configuration and reconfiguration for bots in team and group chat. |[View](https://github.com/OfficeDev/Microsoft-Teams-Samples/tree/main/samples/bot-configuration-app/nodejs)|

## Step-by-step guide

Follow the [step-by-step guide](../../qsg-bot-configuration-experience.yml) to configure your bot during installation or after installation from the team or group chat where the bot is installed.

## See also

* [Build bots for Teams](../what-are-bots.md)
* [Adaptive Cards](../../task-modules-and-cards/what-are-cards.md#adaptive-cards)
