---
title: Add a bot menu
description: In this module, learn how to add a bot menu in Microsoft Teams and create menus for bots in Microsoft Teams
ms.topic: how-to
ms.localizationpriority: medium
ms.date: 05/20/2019
---
# Add a bot menu in Microsoft Teams

[!include[v3-to-v4-SDK-pointer](~/includes/v3-to-v4-pointer-bots.md)]

To aid discovery and to help educate users about your bot’s functionality, you can now add menus that surface whenever the user interacts with your bot. The menu will show the command text and also provide help text, such as a usage example or description of the command’s purpose.

![Screenshot of bot menu](~/assets/images/bots/bot-menus-bot-menu-sample.png)

When a user selects a menu item, the command string is inserted into the text box to aid in user completion of the bot message.

## Bot menu support on Teams mobile app

> [!NOTE]
> Bot menus are not displayed on mobile devices.

## App manifest

To create a bot menu, add a new [`commandLists`](~/resources/schema/manifest-schema.md#botscommandlists) object to your app manifest under the bot section. You can declare individual menus with separate commands for each scope your bot supports (`personal`, `groupChat`, or `team`) Each menu supports up to 10 commands.

### Manifest excerpt - Single menu for both scopes

```json
{
  ⋮
  "bots":[
    {
      "botId":"[Microsoft App ID for your bot]",
      "scopes": [
        "personal",
        "team"
      ],
      "commandLists":[
        {
          "scopes":[
            "team",
            "personal"
          ],
          "commands":[
            {
              "title":"Help",
              "description":"Displays this help message"
            },
            {
              "title":"Search Flights",
              "description":"Search flights from Seattle to Phoenix May 2-5 departing after 3pm"
            },
            {
              "title":"Search Hotels",
              "description":"Search hotels in Portland tonight"
            },
            {
              "title":"Best Time to Fly",
              "description":"Best time to fly to London for a 5 day trip this summer"
            }
          ]
        }
      ]
    }
  ],
  ...
}
```

### Manifest excerpt - Separate menu per scope

```json
{
  ...
  "bots":[
    {
      "botId":"[Microsoft app ID for your bot]",
      "scopes": [
        "groupChat",
        "team"
      ],
      "commandLists":[
        {
          "scopes":[
            "team"
          ],
          "commands":[
            {
            "title":"help",
            "description":"Displays this help message for channels"
            }
          ]
        },
        {
          "scopes":[
            "groupChat"
          ],
          "commands":[
            {
            "title":"help",
            "description":"Displays this help message for group chat"
            }
          ]
        }
      ]
    }
  ],
  ...
}
```

## Best practices

* Keep it simple: The bot menu is meant to present the key capabilities of your bot.
* Keep it short: Menu options shouldn’t be extremely long and complex natural language statements - they should be simple commands.
* Always available: Bot menu actions/commands should be always invokable, regardless of the state of the conversation or the dialog the bot is in.
