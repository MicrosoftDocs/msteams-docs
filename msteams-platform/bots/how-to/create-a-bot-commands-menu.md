---
title: Create a command menu for your bot
author: clearab
description: How to create a command menu for your Microsoft Teams bot
ms.topic: overview, command menu
ms.author: anclear
---
# Bot command menus

[!INCLUDE [pre-release-label](~/includes/v4-to-v3-pointer-bots.md)]

> [!Note]
> Bot menus won't appear on mobile clients.

Add command menu for your bot allows you to define a set of core commands your bot can always respond to. The list of commands is presented to the user above the compose message area when they are conversing with your bot. Selecting a command from the list will insert the command string into the compose message box, then all users need to do is select **Send**.

![Bot command menu](./conversations/media/bot-menu-sample.png)

## Create a command menu for your bot

Command menus are defined in your app manifest. You can either use App Studio to help you create them, or add them manually.

### Creating a command menu for your bot using App Studio

The instructions here assume that you'll be editing an existing app manifest. The steps for adding a command menu are the same, whether you're creating a new manifest or editing an existing one.

1. Open App Studio from the ... overflow menu on the left navigation rail. If you don't have App Studio available you can download it. See [Installing App Studio](https://aka.ms/teams-app-studio#installing-app-studio) for more information on using App Studio.

    ![App Studio](./conversations/media/AppStudio.png)

2. Once in App Studio, select the **Manifest editor** tab.

3. In the left column of the manifest editor view in the **Capabilities** section, select **Bots**.

4. In the right column of the manifest editor view in the **Commands** section, select the **Add** button.

    ![App Studio Command Menu Add button](./conversations/media/AppStudio-CommandMenu-Add.png)

5. The **New Command** screen appears. Enter the **Command text** that you want to have appear as the menu command, and the **Help text** that you want to have appear directly under the command text in the menu. This should be a brief explanation of the purpose of the command.

6. Next, select the scope(s) where you want this command menu to appear, then select the **Save** button.

    ![App Studio Command Menu Add button](./conversations/media/AppStudio-NewCommandMenu.png)

### Creating a command menu for your bot by editing **Manifest.json**

Another valid approach for creating a command menu is to create it directly in the manifest file while developing your bot source code. Here are a few things to keep in mind when using this approach:

1. Each menu supports up to 10 commands.

2. You can create a single command menu that will work in all scopes.

3. You can create a different command menu for each scope

#### Manifest example - single menu for both scopes

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

#### Manifest example - menu for each scope

```json
{
  ...
  "bots":[
    {
      "botId":"<Microsoft app ID for your bot>",
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

## Handling menu commands in your bot code

Bots in a group or channel respond only when they are mentioned ("@botname") in a message. As a result, every message received by a bot when in a group or channel scope will contain its own name in the message text returned. You need to ensure your message parsing handles that before handling the command being returned.

> **Note** For handling the commands in code, they are sent to your bot as a regular message. So you need to handle them as you would do for any other message from your users. They are purely a UI treatment that inserts pre-configured text into the text box. The user must then send that text as they would do for any other message.

# [C#/.NET](#tab/dotnet)

You can parse out the **\@Mention** portion of the message text using a static method provided with the Microsoft Bot Framework — a method of the `Activity` class named `RemoveRecipientMention`.

```csharp
var modifiedText = turnContext.Activity.RemoveRecipientMention();
```

# [JavaScript/Node.js](#tab/javascript)

You can parse out the **\@Mention** portion of the message text using a static method provided with the Microsoft Bot Framework — a method of the `TurnContext` class named `removeMentionText`.

```javascript
const modifiedText = TurnContext.removeMentionText(turnContext.activity, turnContext.activity.recipient.id);
```

# [Python](#tab/python)


You can parse out the **@Mention** portion of the message text using a static method provided with the Microsoft Bot Framework — a method of the `TurnContext` class named `remove_recipient_mention`.

```python
modified_text = TurnContext.remove_recipient_mention(turn_context.activity)
```

* * *

## Command menu best practices

* **Keep it simple**: The bot menu is meant to present the key capabilities of your bot.
* **Keep it short**: Menu options shouldn’t be extremely long and complex natural language statements — they should be simple commands.
* **Keep it invokable**: Bot menu actions/commands should always be available, regardless of the state of the conversation or the dialog the bot is in.

> **Note** If you remove any commands from your manifest, you will need to redeploy your app for the changes to take effect. In general, any changes to the manifest require this.
