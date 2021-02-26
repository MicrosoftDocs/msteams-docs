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
> Bot menus do not appear on mobile clients.

To define a set of core commands that your bot can respond to, you can add a command menu with a drop-down list of commands for your bot. The list of commands is presented to the user in the compose message area when they are in conversation with your bot. Select a command from the list to insert the command string into the compose message box and select **Send**.

![Bot command menu](./conversations/media/bot-menu-sample.png)

This document covers the following:

* [Create a command menu for your bot](#create-a-command-menu-for-your-bot)
* [Handle menu commands in your bot code](#handle-menu-commands-in-your-bot-code)
* [Command menu best practices](#command-menu-best-practices)

## Create a command menu for your bot

Command menus are defined in your app manifest. You can either use App Studio to create them, or add them manually in the app manifest.

### Create a command menu for your bot using App Studio

A prerequisite to create a command menu for your bot is that you must edit an existing app manifest. The steps for adding a command menu are the same, whether you're creating a new manifest or editing an existing one.

**To create a command menu for your bot using App Studio**

1. Open **App Studio** from the **...** More added apps menu on the leftmost pane. If you do not have App Studio, you can download it. For more information, see [installing App Studio](~/concepts/build-and-test/app-studio-overview.md#installing-app-studio).

    ![App Studio](./conversations/media/AppStudio.png)

2. In App Studio, select the **Manifest editor** tab. For more information on creating an app package, see [update an app package](~/tutorials/get-started-dotnet-app-studio.md#use-app-studio-to-update-the-app-package).

3. In the left pane of the **Manifest editor** and in the **Capabilities** section, select **Bots**.

4. In the right pane of the **Manifest editor** and in the **Commands** section, select **Add**.

    ![App Studio Command Menu Add button](./conversations/media/AppStudio-CommandMenu-Add.png)

5. The **New Command** screen appears. Enter the **Command text** that must appear as the command menu for your bot. Enter the **Help text** that must appear under the command text in the menu. **Help text** must be a brief explanation of the purpose of the command.

6. Select the **Scope** check box(es) to select where this command menu must appear and select **Save**.

    ![App Studio Command Menu Add button](./conversations/media/AppStudio-NewCommandMenu.png)

### Create a command menu for your bot by editing **Manifest.json**

Another way to create a command menu is to create it directly in the manifest file while developing your bot source code. When using this method, follow these points:

* Each menu supports up to 10 commands.
* Create a single command menu that will work in all scopes.
* Create a different command menu for each scope.

#### Manifest example for single menu for both scopes

The manifest example code for single menu for both scopes is as follows:

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

#### Manifest example for the menu for each scope

The manifest example code for the menu for each scope is as follows:

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

## Handle menu commands in your bot code

Bots in a group or channel respond only when they are mentioned `@botname` in a message. Every message received by a bot when in a group or channel scope contains its own name in the message text returned. Your message parsing must handle the message received by a bot with its own name before handling the command being returned.

> [!NOTE]
> To handle the commands in code, they are sent to your bot as a regular message. You must handle them as you would handle any other message from your users. The commands in code insert pre-configured text into the text box. The user must then send that text as they would do for any other message.

# [C#/.NET](#tab/dotnet)

You can parse out the **\@Mention** portion of the message text using a static method provided with the Microsoft Bot Framework. It is a method of the `Activity` class named `RemoveRecipientMention`.

The C# code to parse out the **\@Mention** portion of the message text is as follows:

```csharp
var modifiedText = turnContext.Activity.RemoveRecipientMention();
```

# [JavaScript/Node.js](#tab/javascript)

You can parse out the **\@Mention** portion of the message text using a static method provided with the Microsoft Bot Framework. It is a method of the `TurnContext` class named `removeMentionText`.

The JavaScript code to parse out the **\@Mention** portion of the message text is as follows:

```javascript
const modifiedText = TurnContext.removeMentionText(turnContext.activity, turnContext.activity.recipient.id);
```

# [Python](#tab/python)

You can parse out the **@Mention** portion of the message text using a static method provided with the Microsoft Bot Framework. It is a method of the `TurnContext` class named `remove_recipient_mention`.

The Python code to parse out the **\@Mention** portion of the message text is as follows:

```python
modified_text = TurnContext.remove_recipient_mention(turn_context.activity)
```

* * *

## Command menu best practices

* **Keep it simple**: The bot menu is meant to present the key capabilities of your bot.
* **Keep it short**: Menu options must not be long and must not be complex natural language statements. They should be simple commands.
* **Keep it invokable**: Bot menu actions or commands must always be available, regardless of the state of the conversation or the dialog the bot is in.

> [!NOTE]
> If you remove any commands from your manifest, you must redeploy your app to implement the changes. In general, any changes to the manifest require you to redeploy your app.

## Next step

> [!div class="nextstepaction"]
> [Channel and group conversations](~/bots/how-to/conversations/channel-and-group-conversations.md)
