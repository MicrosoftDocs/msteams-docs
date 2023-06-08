---
title: Create a command menu for your bot
author: surbhigupta
description: Learn how to create and handle a command menu for your Microsoft Teams bot, and best practices. Know how to remove commands from your manifest.
ms.topic: how-to
ms.localizationpriority: medium
ms.author: anclear
---

# Create a commands menu

> [!NOTE]
> It's recommended that you'd create a command bot by following the step-by-step guide to [Build command bot with JavaScript](../../sbs-gs-commandbot.yml) using the new generation development tool for Teams. For more information about Teams Toolkit, see [Teams Toolkit Overview for Visual Studio Code](../../toolkit/teams-toolkit-fundamentals.md) and [Teams Toolkit overview for Visual Studio](../../toolkit/teams-toolkit-overview-visual-studio.md).

[!INCLUDE [pre-release-label](~/includes/v4-to-v3-pointer-bots.md)]

To define a set of core commands that your bot can respond to, you can add a command menu with a drop-down list of commands for your bot. The list of commands is presented to the users in the compose message area when they are in conversation with your bot. Select a command from the list to insert the command string into the compose message box and select **Send**.

# [Desktop](#tab/desktop)

:::image type="content" source="conversations/Media/bot-menu-sample.png" alt-text="Bot-command-menu":::

# [Mobile](#tab/mobile)

:::image type="content" source="conversations/Media/mobile-bot-menu-sample.png" alt-text="Mobile-bot-command-menu":::

* * *

## Create a command menu for your bot

Command menus are defined in your app manifest. You can either use **Developer Portal** to create them or add them manually in the app manifest.

### Create a command menu for your bot using Developer Portal

A prerequisite to create a command menu for your bot is that you must edit an existing app manifest. The steps to add a command menu are the same, whether you create a new manifest or edit an existing one.

To create a command menu for your bot using Developer Portal:

1. Open Teams and select **Apps** from the left pane. In the **Apps** page, search for **Developer Portal**, and then select **Open**.

   :::image type="content" source="../../assets/images/tdp/add-dev-portal.png" alt-text="Screenshot shows how to add Developer Portal in Teams client.":::
  
1. In **Developer Portal**, select the **Apps** tab. If you don't have an existing app package, you can create or import an existing app. For more information, see [Developer Portal for Teams](../../concepts/build-and-test/teams-developer-portal.md).

1. Select **Apps** tab, select **App features** from the left pane, and then select **Bots**.

1. Select **Add a command** under **Commands** section.

   :::image type="content" source="../../assets/images/tdp/add-a-bot-command.png" alt-text="Screenshot shows how to add a command for your bot in Developer Portal.":::

1. Enter the **Command** that appears as the command menu for your bot.

1. Enter the **Description** that appears under the command text in the menu. **Description** must be a brief explanation of the purpose of the command.

1. Select the **Scope** check box and then select **Add**.
   This defines where the command menu must appear.

   :::image type="content" source="../../assets/images/tdp/bot-command.png" alt-text="Screenshot shows how to add a command, description and scopes for your bot.":::

### Create a command menu for your bot by editing Manifest.json

Another way to create a command menu is to create it directly in the manifest file while developing your bot source code. To use this method, follow these points:

* Each menu supports up to ten commands.
* Create a single command menu that works in all scopes.
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

You must handle menu commands in your bot code as you handle any message from users. You can handle menu commands in your bot code by parsing out the **\@Mention** portion of the message text.

## Handle menu commands in your bot code

Bots in a group or channel respond only when they are mentioned `@botname` in a message. Every message received by a bot when in a group or channel scope contains its name in the message text. Before handling the command being returned, your message parsing must handle the message received by a bot with its name.

> [!NOTE]
> To handle the commands in code, they are sent to your bot as a regular message. You must handle them as you would handle any other message from your users. The commands in code insert pre-configured text into the text box. The user must then send that text as they do for any other message.

# [C#](#tab/dotnet)

* [SDK reference](/dotnet/api/microsoft.bot.schema.activityextensions.removerecipientmention?view=botbuilder-dotnet-stable#microsoft-bot-schema-activityextensions-removerecipientmention(microsoft-bot-schema-imessageactivity)&preserve-view=true)

* [Sample code reference](https://github.com/OfficeDev/Microsoft-Teams-Samples/blob/main/samples/app-hello-world/csharp/Microsoft.Teams.Samples.HelloWorld.Web/Bots/MessageExtension.cs#L19)

You can parse out the **\@Mention** portion of the message text using a static method provided with the Microsoft Bot Framework. It is a method of the `Activity` class named `RemoveRecipientMention`.

The C# code to parse out the **\@Mention** portion of the message text is as follows:

```csharp
// Remove recipient mention text from Text property.
// Use with caution because this function is altering the text on the Activity.
var modifiedText = turnContext.Activity.RemoveRecipientMention();
```

# [JavaScript](#tab/javascript)

* [SDK reference](/javascript/api/botbuilder-core/turncontext?view=botbuilder-ts-latest#botbuilder-core-turncontext-removementiontext&preserve-view=true)

* [Sample code reference](https://github.com/OfficeDev/Microsoft-Teams-Samples/blob/main/samples/bot-people-picker-adaptive-card/nodejs/bots/teamsBot.js#L21)

You can parse out the **\@Mention** portion of the message text using a static method provided with the Bot Framework. It is a method of the `TurnContext` class named `removeMentionText`.

The JavaScript code to parse out the **\@Mention** portion of the message text is as follows:

```javascript
// Remove mention text from Text property, this function is altering the text on the Activity.
const modifiedText = TurnContext.removeMentionText(turnContext.activity, turnContext.activity.recipient.id);
```

# [Python](#tab/python)

* [SDK reference](/python/api/botbuilder-core/botbuilder.core.turncontext?view=botbuilder-py-latest#botbuilder-core-turncontext-remove-recipient-mention&preserve-view=true)

* [Sample code reference](https://github.com/OfficeDev/Microsoft-Teams-Samples/blob/main/samples/bot-conversation/python/bots/teams_conversation_bot.py#L34)

You can parse out the **@Mention** portion of the message text using a static method provided with the Bot Framework. It is a method of the `TurnContext` class named `remove_recipient_mention`.

The Python code to parse out the **\@Mention** portion of the message text is as follows:

```python
# Remove recipient mention text from Text property, this function is altering the text on the Activity.
modified_text = TurnContext.remove_recipient_mention(turn_context.activity)
```

* * *

To enable smooth functioning of your bot code, there are few best practices that you must follow.

## Command menu best practices

Following are the command menu best practices:

* Keep it simple: The bot menu is meant to present the key capabilities of your bot.
* Keep it short: Menu options must not be long and must not be complex natural language statements. They must be simple commands.
* Keep it invocable: Bot menu actions or commands must always be available, regardless of the state of the conversation or the dialog (task module) the bot is in.

> [!NOTE]
> If you remove any commands from your manifest, you must redeploy your app to implement the changes. In general, any changes to the manifest require you to redeploy your app.

## Next step

> [!div class="nextstepaction"]
> [Channel and group chat conversations with a bot](conversations/channel-and-group-conversations.md)

## See also

* [Build bots for Teams](../what-are-bots.md)
* [App manifest schema for Teams](../../resources/schema/manifest-schema.md)
* [Messages in bot conversations](conversations/conversation-messages.md)
* [Adaptive Cards for bot developers](/adaptive-cards/getting-started/bots)
