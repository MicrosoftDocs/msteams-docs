---
title: Bot configuration experience
author: surbhigupta
description: Learn about bot configuration experience.
ms.topic: conceptual
ms.author: surbhigupta
ms.localizationpriority: high
---

> [!Note]
> Dev preview note to be added.
> Bot configuration is supported in channel, personal, and group chat scopes.

# Bot configuration experience

When you install a bot in Teams you can configure your bot during installation or you can also configure the bot after installation from the installed scope. Users can change the bots configuration to install the bot in a different context from a team, channel, or chat without uninstalling the bot.

In the following image the bot is installed in a group chat and when the users hover over the bot an Adaptive Card appears. The user can select the settings icon in the Adaptive Card to update or change the bot's configuration:

:::image type="content" source="../../assets/images/messaging-extension/bot-configuration-experience.PNG" alt-text="Screenshot shows the configuration option for the bot in a Teams group chat.":::

## Enable app manifest settings for bot configuration experience

To enable the bot configuration experience, you must configure the `fetchTask` under bots.configuration property in the app manifest (previously called Teams app manifest) as follows:

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

## Configure your bot

To configure a bot configuration experience.

You can configure your bot to enable the configuration experience in the team or group chat

You can use `config/fetch` and `config/submit` properties to enable the bot configuration experience in a team or group chat.

Use the following methods in `teamsBot.js` file to trigger the app.

*

When a users installs the bot in a team or group chat scope, the `fetchTask` property in the app manifest file initiates `config/fetch` defined in the teamsBot.js. The bot responds with an Adaptive Card and the user provides relevant information in the Adaptive Card and select **Submit**. After the user selects **Submit**, a `config/submit` is returned to the bot.

Following is an example of `config/fetch`:

## Config/fetch

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

## Config/continue - not required.   config/submit

```json
Config/continue 

{​ 

  "responseType": "config", 

  "config": {​ 

    "type": "continue", 

    "value": {​ 

      "title": "Task module title", 

      "height": 500, 

      "width": "medium", 

      "card": {​ 

        "$schema": "http://adaptivecards.io/schemas/adaptive-card.json", 

        "type": "AdaptiveCard", 

        "version": "1.0", 

        "body": [ 

          {​ 

            "type": "Input.Text", 

            "placeholder": "FormField1", 

            "id": "FormField1" 

          }​, 

          {​ 

            "type": "Input.Text", 

            "placeholder": "FormField2", 

            "id": "FormField2" 

          }​, 

          {​ 

            "type": "Input.Text", 

            "placeholder": "FormField3", 

            "id": "FormField3" 

          }​, 

          {​ 

            "type": "ActionSet", 

            "actions": [ 

              {​ 

                "type": "Action.Submit", 

                "title": "Action.Submit", 

                "id": "submitAction" 

              }​ 

            ] 

          }​ 

        ] 

      }​ 

    }​ 

  }​ 

}​ 
```

To configure the bot

Upon installation in either team or groupChat scope, the fetchTask initiates a config/fetch. The bot responds with an adaptive card. On submitting details, a config/submit is returned to the bot, which handles the response appropriately.

## See also
