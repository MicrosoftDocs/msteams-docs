---
title: Configure & Customize Bot Settings
author: surbhigupta
description: Learn to set up and reconfigure bot settings directly within the channel or group chat post-installation. Code sample (.NET, Node.js).
ms.topic: conceptual
ms.author: surbhigupta
ms.localizationpriority: high
ms.date: 11/13/2024
---

# Bot configuration experience

The bot configuration experience simplifies the process of setting up and adjusting bot settings directly within a channel or group chat after installation. This enhances operational efficiency from the start by eliminating the need for repeated user interventions. Users can customize the bot to fit their specific workflows and preferences during installation and reconfigure settings as needed to adapt to changing requirements, ensuring the bot remains relevant and valuable.

For example, a bot that tracks and shares news topics or monitors GitHub repositories can initially be set up to match user workflows. Later, it can be easily reconfigured to respond to new topics or repositories directly from the group chat, streamlining content management and interaction without leaving the Teams environment. This flexible configuration experience significantly enhances user experience and productivity by integrating bots seamlessly into daily operations.

Here's an example, where a user adds the bot to a group chat and then configures it to align with their specific requirements. The user then reconfigures the bot to change the status.

**Configure**

:::image type="content" source="../../assets/images/bots/configuration-bot.gif" alt-text="Graphic shows the process of configuring a bot into a Teams channel.":::

**Reconfigure**

:::image type="content" source="../../assets/images/bots/reconfiguration-mention-bot.gif" alt-text="Screenshot shows the configuration option for the bot in the message compose area.":::

## Build bot configuration experience

> [!NOTE]
> Bot configuration experience is supported only in channel or group chat.

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

When a user installs the bot in channel or group chat, the `fetchTask` property in the app manifest file initiates either `config/fetch` or `config/submit` as defined in the `teamsBot.js` file.

If you set the `fetchTask` property in the app manifest to:

* **false**: The bot doesn't fetch a dialog or an Adaptive Card. Instead, the bot must provide a static dialog or card that is used when the bot is invoked. For more information, see [dialogs](../../task-modules-and-cards/what-are-task-modules.md).

* **true**: The bot initiates either `config/fetch` or `config/submit` as defined. When the bot is invoked, you can return an Adaptive Card or a dialog depending on the context provided in [channelData and userdata](../../messaging-extensions/how-to/action-commands/create-task-module.md#payload-activity-properties-when-a-dialog-is-invoked-from-a-group-chat).

The following table lists the response type associated with the invoke requests:

|Invoke request |Response type |
| --- | --- |
| `config/fetch` | `Type: "continue"` or `Type = "auth"` |
| `config/submit` | `Type: "continue"` or `Type: "message"` |

* `type: "continue"`: `type: "continue"` is used to define a continuation of a dialog or Adaptive Card within a bot configuration. When the type is set to `continue`, it indicates that the bot is expecting further interaction from the user to continue with the configuration process.

   The `adaptiveCardForContinue` is a custom function that returns the JSON for an Adaptive Card to be used in different stages of a bot’s workflow. These functions are used to return Adaptive Cards for different scenarios based on the user’s interaction with the bot.

   When the user submits the configuration, the `config/submit` invoke is triggered. It reads the user's input and returns a different Adaptive Card. You can also update the bot configuration to return a [dialog](../../task-modules-and-cards/what-are-task-modules.md).

  # [C#](#tab/teams-bot-sdk1)

   [Sample code reference](https://github.com/OfficeDev/Microsoft-Teams-Samples/blob/main/samples/bot-configuration-app/csharp/Bot%20configuration/Bots/TeamsBot.cs#L78)

   ```csharp
   protected override Task<ConfigResponseBase>OnTeamsConfigFetchAsync(ITurnContext<IInvokeActivity> turnContext, JObject configData, CancellationToken cancellationToken)
   {
      ConfigResponseBase response = adaptiveCardForContinue();
      return Task.FromResult(response);
   }
   ```

  # [JavaScript](#tab/JS1)

   [Sample code reference](https://github.com/OfficeDev/Microsoft-Teams-Samples/blob/main/samples/bot-configuration-app/nodejs/teamsBot.js#L52)

   ```javascript
   async handleTeamsConfigFetch(_context, _configData) {
      let response = {};
      const adaptiveCard = CardFactory.adaptiveCard(this.adaptiveCardForContinue());
      response = {
         config: {
            value: {
               card: adaptiveCard,
               height: 500,
               width: 600,
               title: 'test card',
            },
            type: 'continue',
         },
      };
      return response;
   }
   ```

---

* `type: "auth"`: You can also request the user to authenticate as a response to `config/fetch` request. The `type: "auth"` configuration prompts the user to sign in through a specified URL, which must be linked to a valid authentication page that can be opened in a browser. Authentication is essential for scenarios where the bot requires the user to be authenticated. It ensures that the user’s identity is verified, maintaining security, and personalized experiences within the bot’s functionality.

   > [!NOTE]
   > For `type: "auth"` only third party authentication is supported. Single sign-on (SSO) isn't supported. For more information on third party authentication, see [add authentication.](../../messaging-extensions/how-to/add-authentication.md)

  # [C#](#tab/teams-bot-sdk2)

   [Sample code reference](https://github.com/OfficeDev/Microsoft-Teams-Samples/blob/main/samples/bot-configuration-app-auth/csharp/Bot%20configuration/Bots/TeamsBot.cs#L78)

   ```csharp
   protected override Task<ConfigResponseBase>OnTeamsConfigFetchAsync(ITurnContext<IInvokeActivity> turnContext, JObject configData, CancellationToken cancellationToken)
   {
      ConfigResponseBase response = new ConfigResponse<BotConfigAuth> {
         Config = new BotConfigAuth {
            SuggestedActions = new SuggestedActions {
               Actions = new List<CardAction> {
                  new CardAction {
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

   [Sample code reference](https://github.com/OfficeDev/Microsoft-Teams-Samples/blob/main/samples/bot-configuration-app-auth/nodejs/teamsBot.js#L51)

   ```javascript
   async handleTeamsConfigFetch(_context, _configData) {
      let response = {};
      response = {
         config: {
            type: "auth",
            suggestedActions: {
               actions: [{
                  type: "openUrl",
                  value: "https://example.com/auth",
                  title: "Sign in to this app"
               }]
            },
        },
      };
      return response;
   }
   ```

---

* `type="message"`: When the type is set to message, it indicates that the bot is sending a simple message back to the user, indicating the end of the interaction or providing information without requiring further input.

  # [C#](#tab/teams-bot-sdk3)

   [Sample code reference](https://github.com/OfficeDev/Microsoft-Teams-Samples/blob/main/samples/bot-configuration-app-auth/csharp/Bot%20configuration/Bots/TeamsBot.cs#L102-L114)

   ```csharp
   protected override Task<ConfigResponseBase> OnTeamsConfigSubmitAsync(ITurnContext<IInvokeActivity> turnContext, JObject configData, CancellationToken cancellationToken)
   {
      ConfigResponseBase response = new ConfigResponse<TaskModuleResponseBase>
      {
         Config = new TaskModuleMessageResponse
         {
            Type = "message",
            Value = "You have chosen to finish setting up bot"
         }
      };
      return Task.FromResult(response);
   }
   ```

  # [JavaScript](#tab/JS3)

   [Sample code reference](https://github.com/OfficeDev/Microsoft-Teams-Samples/blob/main/samples/bot-configuration-app-auth/nodejs/teamsBot.js#L72-L83)

   ```javascript
   async handleTeamsConfigSubmit(context, _configData) {
      let response = {};
      response = {
         config: {
            type: 'message',
            value: 'You have chosen to finish setting up bot',
         },
      }
      return response;
   }
   ```

---

When a user reconfigures the bot, the `fetchTask` property in the app manifest file initiates `config/fetch` in the bot logic. The user can reconfigure the bot settings post-installation in two ways:

* @mention the bot in the message compose area. Select the **Settings** option that appears above the message compose area. A dialog appears, update, or changes the bot's configuration settings in the dialog.

   :::image type="content" source="../../assets/images/bots/reconfiguration-mention-bot.gif" alt-text="Screenshot shows the configuration option for the bot in the message compose area.":::

* Hover over the bot, the bot profile card appears. To update or change the bot's configuration settings, select the settings icon in the bot profile card.

   :::image type="content" source="../../assets/images/bots/reconfiguration-hover.gif" alt-text="Screenshot shows the configuration option for the bot in a Teams group chat.":::

## Best practices

* If you want to have an individual channel-level configuration of your bot, ensure that you track the configuration as per the channel. Configuration data isn't stored and the invoke payload includes the sufficient [channelData](../../messaging-extensions/how-to/action-commands/create-task-module.md#payload-activity-properties-when-a-dialog-is-invoked-from-a-group-chat).

* Provide a clear and user-friendly dialog that prompts the user to enter the required information for the bot to operate properly, such as a URL, an area path, or a dashboard link.

* Avoid sending multiple notifications or requests for configuration after the installation, as it might confuse the users.

## Code sample

| **Sample name** | **Description** |**.NET** |**Node.js** |**Manifest**|
|-----------------|-----------------|----------------|----------------|
| Bot configuration app | This sample code describes the configuration and reconfiguration for bots in team and group chat with `continue` and `message` response types. |[View](https://github.com/OfficeDev/Microsoft-Teams-Samples/tree/main/samples/bot-configuration-app/csharp)|[View](https://github.com/OfficeDev/Microsoft-Teams-Samples/tree/main/samples/bot-configuration-app/nodejs)|[View](https://github.com/OfficeDev/Microsoft-Teams-Samples/tree/main/samples/bot-configuration-app/csharp/demo-manifest)|
| Bot configuration app with auth | This sample code describes the configuration and reconfiguration for bots in team and group chat with `auth` and `message` response types. |[View](https://github.com/OfficeDev/Microsoft-Teams-Samples/tree/main/samples/bot-configuration-app-auth/csharp)|[View](https://github.com/OfficeDev/Microsoft-Teams-Samples/tree/main/samples/bot-configuration-app-auth/nodejs)|[View](https://github.com/OfficeDev/Microsoft-Teams-Samples/tree/main/samples/bot-configuration-app-auth/csharp/demo-manifest)|

## Step-by-step guide

Follow the [step-by-step guide](../../qsg-bot-configuration-experience.yml) to configure your bot during installation or after installation from the team or group chat where the bot is installed.

## See also

* [Build bots for Teams](../what-are-bots.md)
* [Adaptive Cards](../../task-modules-and-cards/what-are-cards.md#adaptive-cards)
