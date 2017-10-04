# Add a bot menu in Microsoft Teams

To aid discovery and to help educate users about your bot’s functionality, you can now add menus that surface whenever the user interacts with your bot. The menu will show the command text and also provide help text, such as a usage example or description of the command’s purpose.

![Screenshot of bot menu](images/Bot/bot-menus-bot-menu-sample.png)

When a user selects a menu item, the command string is inserted into the text box to aid in user completion of the bot message.

## App manifest

To create a bot menu, add a new [`commandLists`](schema.md#bots-commandlists) object to your app manifest under the bot section. You can declare individual menus with separate commands for 1:1 chat (`scopes`: `personal`) and channels (`scopes`: `team`). Each menu supports up to 10 commands.

### Manifest excerpt - single menu for both scopes

```json
{
  ...
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

### Manifest excerpt - separate menu per scope

```json
{
  ...
  "bots":[
    {
      "botId":"[Microsoft app ID for your bot]",
      "scopes": [
        "personal",
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
            "personal"
          ],
          "commands":[
            {
            "title":"help",
            "description":"Displays this help message for 1:1 chat"
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

* Keep it simple: The bot menu is meant to present the key 3&ndash;5 capabilities or commands of your bot.

* Keep it short: Menu options shouldn’t be extremely long and complex natural language statements&mdash;they should be simple commands.

* Always available: Bot menu actions/commands should be always invokable, regardless of the state of the conversation or the dialog the bot is in.
