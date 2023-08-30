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
> * Bot configuration experience is available in [public developer preview for Teams](../../resources/dev-preview/developer-preview-intro.md).
> * Bot configuration is supported in channel or group chat scopes.

You can configure your bot during installation or you can also configure the bot after installation from the channel or group chat where the bot is installed. The bot configuration experience helps the user to configure their bot without uninstalling the same.

In the following image, the bot is installed in a group chat and when the users hover over the bot an Adaptive Card appears. The user can select the settings icon in the Adaptive Card to update or change the bot's configuration:

:::image type="content" source="../../assets/images/messaging-extension/bot-configuration-experience.PNG" alt-text="Screenshot shows the configuration option for the bot in a Teams group chat.":::

## Enable bot configuration experience

To enable the bot configuration experience, follow these steps:

* [Update app manifest schema](#update-app-manifest-schema)
* [Configure your bot](#configure-your-bot)

### Update app manifest schema

You must configure the `fetchTask` under `bots.configuration` property in the app manifest (previously called Teams app manifest) as follows:

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

### Configure your bot

When a user installs the bot in a team or group chat scope, the `fetchTask` property in the app manifest file initiates `config/fetch` defined in the teamsBot.js. The bot responds with an Adaptive Card and the user provides relevant information in the Adaptive Card and select **Submit**. After the user selects **Submit**, a `config/submit` is returned to the bot.

You can use `config/fetch` and `config/submit` properties in the `teamsBot.js` file to enable the bot configuration experience in a team or group chat.

* Invoke `config/fetch`: Invoke `config/fetch` task to start the bot configuration flow and define the bot response as required.

  In the following example, when an `config/fetch` invoke activity is received from the bot, the bot responds with an Adaptive Card:

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

* Invoke `config/submit`: Invoke the `config/submit` task for the bot to respond to the user's input.
  In the following example, when an `config/submit` invoke activity is received from the bot, the bot responds with an Adaptive Card or a message:

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

## See also

[Build bots for Teams](../what-are-bots.md)
[Adaptive Cards](../../task-modules-and-cards/what-are-cards.md#adaptive-cards)
