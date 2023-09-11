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

After a bot is installed either in channel or group chat scope, the `fetchTask` property in the app manifest file initiates `config/fetch` defined in the `teamsBot.js` file. The bot responds with an Adaptive Card and the user provides relevant information in the Adaptive Card. On submitting a `config/submit` is returned to the bot and the bot configuration is complete.

In the following image, the bot is installed in a group chat. When the user hovers over the bot, an Adaptive Card appears. The user can select the settings icon in the Adaptive Card to update or change the bot's configuration settings:

:::image type="content" source="../../assets/images/bots/configurationbot.gif" alt-text="Screenshot shows the configuration option for the bot in a Teams group chat.":::

## Enable bot configuration experience

To enable the bot configuration settings from a channel or group chat scope, follow these steps:

1. [Update app manifest schema](#update-app-manifest-schema)
1. [Configure your bot](#configure-your-bot)

### Update app manifest schema

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

## Bot configuration experience in Teams

After you've created a bot to enable the bot configuration settings from a team or group chat scope, the user can configure and reconfigure the bot in Teams.

To configure the bot, follow these steps:

1. Go to **Microsoft Teams**.

1. Select **Apps**.

1. From the Teams store, select a bot app you want to install.

1. From the dropdown next to **Add**, select **Add to a team**, **Add to a chat**, or **Add to a meeting**.

   :::image type="content" source="../../assets/images/bots/group-chat-add-Bot.png" alt-text="Screenshot shows add your bot to chat.":::

1. Enter the name of a person or chat in the search field.

   :::image type="content" source="../../assets/images/bots/add-bot-to-chat.png" alt-text="Screenshot shows bot added to a chat.":::

1. Select **Set up a bot**.

   :::image type="content" source="../../assets/images/bots/set-up-a-bot.png" alt-text="Screenshot shows set up a bot in chat.":::

   The bot is installed in the chat.

To reconfigure the bot, follow these steps:

1. Go to the chat and **@mention** the bot in the message compose area and select **Send**.

   :::image type="content" source="../../assets/images/bots/mention-bot.png" alt-text="Screenshot shows the interaction of bot.":::

1. When you hover over the bot from the conversation, an Adaptive Card appears. Select the **Settings** icon in the Adaptive Card.

   :::image type="content" source="../../assets/images/bots/bot-adaptive-card-interaction.png" alt-text="Screenshot shows the Adaptive Card with settings icon.":::

   A bot configuration Adaptive Card appears.

1. Reconfigure the bot settings and select **Submit**.

   :::image type="content" source="../../assets/images/bots/reconfigure-bot-settings.png" alt-text="Screenshot shows the Adaptive Card with settings icon to reconfigure.":::

   The bot sends a response message.

   :::image type="content" source="../../assets/images/bots/configurable-card-reponse-message.png" alt-text="Screenshot shows Adaptive Card with response message.":::

## See also

* [Build bots for Teams](../what-are-bots.md)
* [Adaptive Cards](../../task-modules-and-cards/what-are-cards.md#adaptive-cards)
