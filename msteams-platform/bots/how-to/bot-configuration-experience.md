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


Bot configuration in Microsoft Teams helps you to streamline the setup process for bots that need specific information to function correctly, such as integration with external services. Asking for configuration details after installation can be disruptive and provide unpleasant experience to the user. Bot configuration allows you to input necessary information like URLs or dashboard links right when you install the bot by enhancing the user experience by eliminating the need for additional configuration steps.

Let's consider a situation where a user installs a bot, only to discover that the default settings don't align with their workflow. If the bot lacks configuration capabilities, users might feel limited by its preset behavior, resulting in decreased engagement and usage. However, by incorporating bot configuration, you can empower users to tailor bot settings according to their preferences and needs, by enhancing user satisfaction and interaction with the bot.

The following graphic explains a streamlined process for integrating a bot into a Teams channel.

   :::image type="content" source="../../assets/images/bots/scenario.gif" alt-text="Graphic shows the process for integrating a bot into a Teams channel.":::

| Steps | Description |
| --- | --- |
|Configure bot during installation||
| 1 | The user selects **Add to a team** from the dropdown menu.|
| 2 | Enter the name of a channel in the search field.|
| 3 | Select **Add**.|
| 4 | Bot is added to the channel.|
| 5 | After the setup phase, the app sends a welcome Adaptive Card to the channel. This message is visible to all users, enabling any user in the channel to configure the app without restrictions. If a conflict arises, the system considers the most recently saved settings.|
| 6 | Bot is configured.|
|Reconfigure bot post-installation||
| 7 | Select **Settings** from the **Apps** section to reconfigure the bot.|
| 8 | You can also trigger the reconfiguration settings of the bot by @mentioning the bot in the message compose area.|

## Key features

* Personalized user experience: Bot configuration allows users to customize the behavior of the bot and ensures that interactions align with their workflow and preferences.

* Increased engagement: Personalized experiences lead to higher user engagement. Configured bots are more likely to meet user expectations, encouraging frequent interactions and driving up engagement metrics such as monthly active users (MAU) rates.

* Adaptability: User needs change over time, bots must adapt to meet these evolving requirements. Bot configuration allows users to reconfigure settings as their requirements change, ensuring the bot continues to provide value and relevance in the long term.

When you're creating a bot for Teams, it’s important to make sure users have a smooth experience and provision control to personalize their bots. The ability to configure bots post-installation within Teams allows users to fine-tune bot functionality according to user requirements even after deployment. You can use methods from the Teams SDK to implement bot configuration features that enhance user engagement and productivity.


## Enable bot configuration experience

Let's build a bot that provides configuration settings for users both during the bot's installation and post-installation.

To enable the bot configuration settings, follow these steps:

1. [Update app manifest](#update-app-manifest)

1. [Configure your bot](#configure-your-bot)

### Update app manifest

You must update the `fetchTask` property under `bots.configuration` object in the app manifest (previously called Teams app manifest) file as follows:

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

1. If the `fetchTask` parameter is set to **false** in the app manifest, the bot won't fetch a task module or an adaptive card. Instead, the bot user must provide a static task module or card that is used when the bot is invoked. For more information, see [task module.](../../task-modules-and-cards/what-are-task-modules.md)

When a user installs the bot in a team or group chat scope, the `fetchTask: true` property in the app manifest file initiates `config/fetch` or `config/submit`.

1. If the `fetchTask` parameter is set to **true** in the app manifest, the bot initiates `ConfigFetch` to fetch content. When invoking the bot, you've the option to return an Adaptive Card or a task module, depending on the context provided in channelData and userdata. For more information, see [create and send dialogs.](../../messaging-extensions/how-to/action-commands/create-task-module.md)

   In response to the `ConfigFetch` request, you've two options:

   1. `config/continue`: The bot’s capability to handle configuration fetch requests by presenting an Adaptive Card to the user that allows them to make a choice about the bot’s setup. If the user selects `Continue with more options`, the bot will present another adaptive card for further interaction. This creates an Adaptive Card using the `adaptiveCardForContinue` method and sets the response type to `continue`, which continues the interaction.

      # [C#](#tab/teams-bot-sdk5)

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
      ---
        
        The `adaptiveCardForContinue` function creates an Adaptive Card that is shown when the user is expected to continue with a task or action. This card can contain information or options that the user needs to interact with to proceed further.

        The `adaptiveCardForSubmit` function creates an Adaptive Card that is displayed when the user has completed a task or action and is ready to submit their input or decision. This card can provide a summary of the user’s selections or input and prompt them to confirm their submission.

        You can also send a message back to the user instead of an Adaptive Card. The `type: 'message'` property specifies that the response should be a message, and the value property contains the text of the message to be displayed.

        # [C#](#tab/teams-bot-sdk6)

        * [Code sample](https://github.com/OfficeDev/Microsoft-Teams-Samples/tree/main/samples/bot-configuration-app/csharp)

        * [Sample code reference](https://github.com/OfficeDev/Microsoft-Teams-Samples/blob/main/samples/bot-configuration-app/csharp/Bot%20configuration/Bots/TeamsBot.cs#L131)

         ```csharp
         ConfigResponseBase response = new ConfigResponse<TaskModuleResponseBase>
                {
                    Config = new TaskModuleMessageResponse
                    {
                        Type = "message",
                        Value = "You have chosen to finish setting up bot"
                    }
                };

                return Task.FromResult(response);
         ```

        # [JavaScript](#tab/JS5)

        * [Code sample](https://github.com/OfficeDev/Microsoft-Teams-Samples/tree/main/samples/bot-configuration-app/nodejs)

        * [Sample code reference](https://github.com/OfficeDev/Microsoft-Teams-Samples/blob/main/samples/bot-configuration-app/nodejs/teamsBot.js#L120)

         ```javascript
            {
            response = {
               config: {
                 type: 'message',
                 value: 'You have chosen to finish setting up bot',
               },
            }
            return response;
         ``` 
      ---

   1. `config/auth`: You can also request the user to authenticate as a response to `config/continue` request.  The `type: "auth"` configuration prompts the user to sign in through a specified URL, which should be linked to a valid authentication page that can be opened in a browser. Authentication is essential for scenarios where the bot requires the user to be authenticated before they can proceed with further interactions or access certain features. It makes sure that the user’s identity is verified, maintaining security and personalized experiences within the bot’s functionality. For more information, see [add authentication.](../../messaging-extensions/how-to/add-authentication.md)

      # [C#](#tab/teams-bot-sdk4)

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

      # [JavaScript](#tab/JS3)

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
      ---

#### Sequence diagram for invokes

The following sequence diagram provides a clear perspective on message exchanges and task executions required to prepare the bot for use:

   :::image type="content" source="../../assets/images/bots/sequence-diagram.png" alt-text="Screenshot shows the sequence diagram for invokes."lightbox="../../assets/images/bots/sequence-diagram.png":::

## Bot configuration experience in Teams

After you've created and published the bot in Teams Store, the user can configure and reconfigure the bot in Teams.

Configure the bot during installation, follow these steps:

1. Go to **Microsoft Teams**.

1. Select **Apps**.

1. From the Teams Store, select a bot app you want to install.

1. From the dropdown next to **Add**, select **Add to a team** or **Add to a chat**.

   :::image type="content" source="../../assets/images/bots/group-chat-add-Bot.png" alt-text="Screenshot shows add your bot to chat.":::

1. Enter the name of a chat in the search field.

   :::image type="content" source="../../assets/images/bots/add-bot-to-chat.png" alt-text="Screenshot shows bot added to a chat.":::

1. Select **Set up a bot**.

   :::image type="content" source="../../assets/images/bots/set-up-a-bot.png" alt-text="Screenshot shows set up a bot in chat.":::

   The bot is installed in the chat.

### Reconfigure the bot

You can reconfigure the bot post-installation in two ways:

1. @mention the bot in the message compose area. Select the **Settings** option that appears above the message compose area. A bot profile card appears, update, or change the bot's configuration settings in the profile card.

   :::image type="content" source="../../assets/images/bots/mention-bot-in-compose-area.gif" alt-text="Screenshot shows the configuration option for the bot in the message compose area.":::

1. Hover over the bot, the bot profile card appears. Select the settings icon in the bot profile card to update or change the bot's configuration settings.

   :::image type="content" source="../../assets/images/bots/configurationbot.gif" alt-text="Screenshot shows the configuration option for the bot in a Teams group chat.":::

## Best practices

* Provide a clear and user-friendly task module that prompts the user to enter the required information for the bot to operate properly, such as a URL, an area path, or a dashboard link.

* Avoid sending multiple notifications or requests for configuration after the installation, as it might confuse the users.

## Code sample

| **Sample name** | **Description** |**.NET** |**Node.js** |
|-----------------|-----------------|----------------|
| Bot configuration experience | This sample code describes the configuration and reconfiguration for bots in team and group chat. |[View](https://github.com/OfficeDev/Microsoft-Teams-Samples/tree/main/samples/bot-configuration-app/csharp)|[View](https://github.com/OfficeDev/Microsoft-Teams-Samples/tree/main/samples/bot-configuration-app/nodejs)|

## Step-by-step guide

Follow the [step-by-step guide](../../qsg-bot-configuration-experience.yml) to configure your bot during installation or after installation from the team or group chat where the bot is installed.

## See also

* [Build bots for Teams](../what-are-bots.md)
* [Adaptive Cards](../../task-modules-and-cards/what-are-cards.md#adaptive-cards)
