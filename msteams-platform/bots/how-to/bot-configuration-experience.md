---
title: Bot configuration experience
author: surbhigupta
description: Learn about bot configuration experience
ms.topic: conceptual
ms.author: surbhigupta
ms.localizationpriority: high
---

# Bot configuration experience

Bot configuration helps you to enable the bot configuration settings for the user during installation and reconfigure the bot from the channel or group chat scope after the bot is installed. Bot configuration experience is supported in channel or group chat only.

Let's consider a scenario where a user installs a bot only to discover that the default settings don't align with their workflow.By implementing bot configuration, you can empower users to tailor bot settings according to their preferences.

Here's an example of a user who adds a bot to a channel and sets up the bot so that it is configured to user's specific needs, in this case selecting the project folder. The user then reconfigures the bot to point to a different folder.

|Configure|Reconfigure|
|---------|-----------|
|:::image type="content" source="../../assets/images/bots/configuration.gif" alt-text="Congifgure bot"::: | :::image type="content" source="../../assets/images/bots/reconfiguration.gif" alt-text="bot config"::: |

Bot configuration allows users to customize the behavior of the bot and ensures that interactions align with their workflow and preferences. Personalized experiences lead to higher user engagement, encourage frequent interactions, and drive engagement metrics such as monthly active users (MAU) rates. Bot configuration offers adaptability, which allows users to reconfigure bot settings as their requirements change, ensuring that the bot continues to provide value and relevance in the long term.

## How it works>

When you plan to implement bot configuration, you must ensure that you're able to configure a bot on first installation and reconfigure it at any time. The configuration is supported for bots in channel scope within a team, and group chat. The experience can also be leveraged by users to be channel specific.

User installs bot in a personal, group, or team the bot is installed in the respective scope. If the bot configuration property is defined in the manifest, the configuration is initiated according to the manifest, else a welcome card is diplayed in the specific scope. If the manifest property is not defined, a non-configurable card is displayed.

If a user wants to reconfigure the bot via the bot command or a bot card, again bot configuration property is defined in the manifest is triggered.

## Enable bot configuration experience

To enable the bot configuration settings for users during installation and post-installation, follow these steps:

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

If you set the `fetchTask` property in the app manifest to:

* **false**: The bot doesn't fetch a dialog or an Adaptive Card. Instead, the bot must provide a static dialog or card that is used when the bot is invoked. For more information, see [dialogs.](../../task-modules-and-cards/what-are-task-modules.md)

* **true**: The bot initiates `ConfigFetch` to fetch content. When invoking the bot, you can return an Adaptive Card or a dialog depending on the context provided in [channelData and userdata](../../messaging-extensions/how-to/action-commands/create-task-module.md#payload-activity-properties-when-a-dialog-is-invoked-from-a-group-chat).

   Bot can respond to `ConfigFetch` request in two ways:

   1. `type: "continue"`: `type: "continue"` is used to define a continuation of a dialog or Adaptive Card within a bot configuration. When the type is set to `continue`, it indicates that the bot is expecting further interaction from the user to continue with the configuration process.

      The `adaptiveCardForContinue` and `adaptiveCardForSubmit` are custom functions that return the JSON for an Adaptive Card to be used in different stages of a bot’s workflow. These functions are used to return Adaptive Cards for different scenarios based on the user’s interaction with the bot.

      When the type is set to message, it indicates that the bot is sending a simple message back to the user, indicating the end of the interaction or providing information without requiring further input.

      # [C#](#tab/teams-bot-sdk5) SDK reference

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

   1. `type: auth`: You can also request the user to authenticate as a response to `config/continue` request.  The `type: "auth"` configuration prompts the user to sign in through a specified URL, which must be linked to a valid authentication page that can be opened in a browser. Authentication is essential for scenarios where the bot requires the user to be authenticated. It ensures that the user’s identity is verified, maintaining security, and personalized experiences within the bot’s functionality. For more information, see [add authentication.](../../messaging-extensions/how-to/add-authentication.md)

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

## Bot configuration experience in Teams

After you've created and published the bot in Microsoft Teams Store, the user can follow these steps:

**To configure the bot during installation**

1. Go to **Microsoft Teams**.

1. Select **Apps**.

1. From Teams Store, select a bot app that you want to install.

1. From the dropdown next to **Add**, select **Add to a team** or **Add to a chat**.

   :::image type="content" source="../../assets/images/bots/group-chat-add-Bot.png" alt-text="Screenshot shows add your bot to chat.":::

1. Enter the name of a team or channel in the search field.

   :::image type="content" source="../../assets/images/bots/add-bot-to-chat.png" alt-text="Screenshot shows bot added to a chat.":::

1. Select **Set up a bot**.

   :::image type="content" source="../../assets/images/bots/set-up-a-bot.png" alt-text="Screenshot shows set up a bot option in a chat.":::

   The bot is installed in the chat.

**To reconfigure the bot**

You can reconfigure the bot post-installation in two ways:

* @mention the bot in the message compose area. Select the **Settings** option that appears above the message compose area. A bot profile card appears, update, or change the bot's configuration settings in the profile card.

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
