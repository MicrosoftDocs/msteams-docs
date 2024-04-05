---
title: Bot configuration experience
author: surbhigupta
description: Learn about bot configuration experience
ms.topic: conceptual
ms.author: surbhigupta
ms.localizationpriority: high
---

# Bot configuration experience

Bot configuration helps you to enable the bot configuration settings for users to configure the bot during insallation and reconfigure the bot from the channel or group chat scope where the bot is installed. Bot configuration experience is supported in channel or group chat only.

Let's consider a scenario where a user installs a bot where the default settings don't align with their workflow. By implementing bot configuration, you can empower users to tailor bot settings according to their preferences. Here's an example of a user adding a bot to a channel and configuring the bot to their specific needs, in this case selecting the project folder. The user then reconfigures the bot to point to a different folder.

**Configure**

:::image type="content" source="../../assets/images/bots/configuration.gif" alt-text="Congifgure bot":::

**Reconfigure**

:::image type="content" source="../../assets/images/bots/reconfiguration.gif" alt-text="bot config":::

## Why build bot configuration experience?

Bot configuration allows users to customize the behavior of the bot and ensures that interactions align with their workflow and preferences. Personalized experiences lead to higher user engagement, encourage frequent interactions, and drive engagement metrics for your bot such as monthly active users (MAU) rates. Bot configuration offers adaptability, which allows users to reconfigure bot settings as their requirements change, ensuring that the bot continues to provide value and relevance in the long term.

## Build bot configuration experience

When you build the bot configuration experience, you must ensure that the user must be able to configure a bot on first installation and reconfigure it at any time.

To build the bot configuration experience, follow these steps:

1. [Update app manifest](#update-app-manifest)

1. [Configure your bot](#configure-your-bot)

### Update app manifest

In the app manifest (previously called Teams app manifest) file, update the `fetchTask` property under the `bots.configuration` object as follows:

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

When a user installs the bot in a team or group chat scope, the `fetchTask` property in the app manifest file initiates `ConfigFetch` defined in the teamsBot.js file.

If you set the `fetchTask` property in the app manifest to:

* **false**: The bot doesn't fetch a dialog or an Adaptive Card. Instead, the bot must provide a static dialog or card that is used when the bot is invoked. For more information, see [dialogs.](../../task-modules-and-cards/what-are-task-modules.md)

* **true**: The bot initiates `ConfigFetch` to fetch content. When invoking the bot, you can return an Adaptive Card or a dialog depending on the context provided in [channelData and userdata](../../messaging-extensions/how-to/action-commands/create-task-module.md#payload-activity-properties-when-a-dialog-is-invoked-from-a-group-chat).

   Bot can respond to `ConfigFetch` request in two ways:

   1. `type: "continue"`: `type: "continue"` is used to define a continuation of a dialog or Adaptive Card within a bot configuration. When the type is set to `continue`, it indicates that the bot is expecting further interaction from the user to continue with the configuration process.

      The `adaptiveCardForContinue` and `adaptiveCardForSubmit` are custom functions that return the JSON for an Adaptive Card to be used in different stages of a bot’s workflow. These functions are used to return Adaptive Cards for different scenarios based on the user’s interaction with the bot.

      When the user submits the configuration, the `OnTeamsConfigSubmitAsync` method is triggered.  It reads the user's input and returns a different Adaptive Card. You can also update the bot configuration to return a [dialogs](../../task-modules-and-cards/what-are-task-modules.md).

      # [C#](#tab/teams-bot-sdk1)

      * [SDK reference](/dotnet/api/microsoft.bot.builder.activityhandler.onmessageactivityasync?view=botbuilder-dotnet-stable)

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

      # [JavaScript](#tab/JS1)

      * [SDK Reference]

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

   1. `type: auth`: You can also request the user to authenticate as a response to `ConfigFetch` request. The `type: "auth"` configuration prompts the user to sign in through a specified URL, which must be linked to a valid authentication page that can be opened in a browser. Authentication is essential for scenarios where the bot requires the user to be authenticated. It ensures that the user’s identity is verified, maintaining security, and personalized experiences within the bot’s functionality. For more information, see [add authentication.](../../messaging-extensions/how-to/add-authentication.md)

      # [C#](#tab/teams-bot-sdk2)

      * [SDK Reference]

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

      # [JavaScript](#tab/JS2)

      * [SDK Reference]

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


   1. `type="message"`: When the type is set to message, it indicates that the bot is sending a simple message back to the user, indicating the end of the interaction or providing information without requiring further input.

      # [C#](#tab/teams-bot-sdk3)

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

      # [JavaScript](#tab/JS3)

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

When a user reconfigures the bot, the `fetchTask` property in the app manifest file initiates `ConfigFetch` in the bot logic. The user can reconfigure the bot seetings post-installation in two ways:

* @mention the bot in the message compose area. Select the **Settings** option that appears above the message compose area. A dialog appears, update, or change the bot's configuration settings in the dialog.

   :::image type="content" source="../../assets/images/bots/mention-bot-in-compose-area.gif" alt-text="Screenshot shows the configuration option for the bot in the message compose area.":::

* Hover over the bot, the bot profile card appears. To update or change the bot's configuration settings, select the settings icon in the bot profile card.

   :::image type="content" source="../../assets/images/bots/configurationbot.gif" alt-text="Screenshot shows the configuration option for the bot in a Teams group chat.":::



## Best practices

* Provide a clear and user-friendly dialog that prompts the user to enter the required information for the bot to operate properly, such as a URL, an area path, or a dashboard link.

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
