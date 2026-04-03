---
title: Create a command menu for your bot
description: Learn how to create and handle a command menu for your Microsoft Teams bot, and best practices. Know how to remove commands from your manifest.
ms.topic: how-to
ms.localizationpriority: medium
ms.author: anclear
ms.owner: ginobuzz
ms.date: 04/03/2026
---

# Create a commands menu

> [!NOTE]
> We’ve enhanced the command menu experience as prompt starters. We recommend you to refer to [prompt starters](~/bots/how-to/conversations/prompt-suggestions.md).

To define a set of core commands that your bot can respond to, you can add a command menu with a dropdown list of commands for your bot. The list of commands is presented to the users in the compose message area when they are in conversation with your bot. Select a command from the list to insert the command string into the compose message box and select **Send**.

# [Desktop](#tab/desktop)

:::image type="content" source="conversations/Media/bot-menu-sample.png" alt-text="Bot-command-menu":::

# [Mobile](#tab/mobile)

:::image type="content" source="conversations/Media/mobile-bot-menu-sample.png" alt-text="Mobile-bot-command-menu":::

* * *

## Create a command menu for your bot

> [!NOTE]
> It's recommended that you create a command bot by following the [Teams SDK quickstart](/microsoftteams/platform/teams-sdk/getting-started/quickstart) and reviewing the [code basics](/microsoftteams/platform/teams-sdk/getting-started/code-basics). For more information about Microsoft 365 Agents Toolkit (previously known as Teams Toolkit), see [Agents Toolkit overview for Visual Studio Code](../../toolkit/agents-toolkit-fundamentals.md) and [Agents Toolkit overview for Visual Studio](../../toolkit/toolkit-v4/agents-toolkit-fundamentals-vs.md).

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

   :::image type="content" source="../../assets/images/tdp/bot-command.png" alt-text="Screenshot shows how to add a command, description, and scopes for your bot.":::

### Create a command menu for your bot by editing Manifest.json

Another way to create a command menu is to create it directly in the manifest file while developing your bot source code. To use this method, follow these points:

* Each menu supports up to 10 commands.
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

You must handle menu commands in your bot code as you handle any message from users.

## Handle menu commands in your bot code

In the Teams SDK, incoming messages are routed through an activity handler. You register a message handler using `app.on('message', ...)` (TypeScript), `app.OnMessage(...)` (C#), or `@app.on_message` (Python), and the message text is available directly via `activity.text`. The SDK's activity router handles message delivery across all scopes (personal, group chat, and channel), so you don't need to manually parse or strip bot mentions from the message text.

> [!NOTE]
> To handle the commands in code, they are sent to your bot as a regular message. You must handle them as you would handle any other message from your users. The commands in code insert pre-configured text into the text box. The user must then send that text as they do for any other message.

# [C#](#tab/dotnet)

* [Sample code reference](https://github.com/OfficeDev/Microsoft-Teams-Samples/tree/abc97268bf41536509383283114c3a33684f0568/samples/bot-quickstart/dotnet/bot-quickstart)

```csharp
// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.

using Microsoft.Teams.Plugins.AspNetCore.Extensions;
using Microsoft.Teams.Apps;
using Microsoft.Teams.Apps.Activities;
using Microsoft.Teams.Api.Activities;
using Microsoft.Teams.Api.Clients;

// Initialize Teams App - automatically uses CLIENT_ID and CLIENT_SECRET from environment variables
var builder = WebApplication.CreateBuilder(args);
builder.AddTeams();
var webApp = builder.Build();
var teamsApp = webApp.UseTeams(true);

// Handle conversation update events (when bot is added or members join)
teamsApp.OnConversationUpdate(async context =>
{
    var membersAdded = context.Activity.MembersAdded;
    if (membersAdded != null)
    {
        foreach (var member in membersAdded)
        {
            // Check if bot was added to the conversation
            if (member.Id == context.Activity.Recipient?.Id)
            {
                await SendWelcomeMessage(context);
            }
        }
    }
});

// Handles incoming messages and routes to appropriate functions based on message content
teamsApp.OnMessage(async context =>
{
    // Get message text and normalize it
    var text = (context.Activity.Text ?? "").Trim().ToLower();

    // Handle mention me command
    if (text.Contains("mentionme") || text.Contains("mention me"))
    {
        await MentionUser(context);
    }
    // Handle whoami command
    else if (text.Contains("whoami"))
    {
        await GetSingleMember(context);
    }
    // Handle welcome command
    else if (text.Contains("welcome"))
    {
        await SendWelcomeMessage(context);
    }
    // Echo greeting messages
    else if (text.Contains("hi") || text.Contains("hello"))
    {
        await EchoMessage(context, text);
    }
    else
    {
        await SendWelcomeMessage(context);
    }
});

// Sends a welcome message
async Task SendWelcomeMessage<T>(IContext<T> context) where T : IActivity
{
    await context.Send("Welcome to the Teams Quickstart Bot!");
}

// Echo back the user's message
async Task EchoMessage(IContext<MessageActivity> context, string text)
{
    await context.Send($"**Echo :** {text}");
}

// Retrieves and displays information about the current user
async Task GetSingleMember(IContext<MessageActivity> context)
{
    await context.Send($"You are: {context.Activity.From.Name}");
}

// Mention a user in a message
async Task MentionUser(IContext<MessageActivity> context)
{
    var member = context.Activity.From;
    var mentionText = $"<at>{member.Name}</at>";
    var activity = new MessageActivity()
        .WithText($"Hello {mentionText}")
        .AddMention(member, addText: false);

    await context.Send(activity);
}

// Starts the Teams bot application and listens for incoming requests
webApp.Run();
```

# [TypeScript](#tab/typescript)

* [Sample code reference](https://github.com/OfficeDev/Microsoft-Teams-Samples/tree/abc97268bf41536509383283114c3a33684f0568/samples/bot-quickstart/nodejs/bot-quickstart)

```javascript
// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.

import { App, IActivityContext } from '@microsoft/teams.apps';
import { TeamsChannelAccount, IMessageActivity } from '@microsoft/teams.api';

// Initialize Teams App - automatically uses CLIENT_ID and CLIENT_SECRET from environment variables
// Note: .env file is only required when running on Teams (not needed for local development with devtools)
const app = new App();

// Handle conversation update events (when bot is added or members join)
app.on('conversationUpdate', async (context) => {
    const { activity } = context;
    const membersAdded = (activity as any).membersAdded || [];

    for (const member of membersAdded) {
        // Check if bot was added to the conversation
        if (member.id === activity.recipient.id) {
            await sendWelcomeMessage(context);
        }
    }
});

// Handles incoming messages and routes to appropriate functions based on message content
app.on('message', async (context) => {
    const { activity } = context;

    // Get message text and normalize it
    const messageActivity = activity as IMessageActivity;
    let text = (messageActivity.text || '').trim().toLowerCase();

    // Handle mention me command
    if (text.includes('mentionme') || text.includes('mention me')) {
        await mentionUser(context);
    }
    // Handle whoami command
    else if (text.includes('whoami')) {
        await getSingleMember(context);
    }
    // Handle welcome command
    else if (text.includes('welcome')) {
        await sendWelcomeMessage(context);
    }
    // Handle greeting messages
    else if (text.includes('hi') || text.includes('hello')) {
        await echoMessage(context, text);
    }
    // Default: echo back any other message
    else if (text) {
        await echoMessage(context, text);
    }
});

// Sends a welcome message
async function sendWelcomeMessage(context: IActivityContext): Promise<void> {
    await context.send({
        type: 'message',
        text: 'Welcome to the Teams Quickstart Bot!'
    });
}

// Echo back the user's message
async function echoMessage(context: IActivityContext, text: string): Promise<void> {
    await context.send({
        type: 'message',
        text: `**Echo:** ${text}`
    });
}

// Retrieves and displays information about the current user
async function getSingleMember(context: IActivityContext): Promise<void> {
    const { activity } = context;
    const conversationId = activity.conversation.id;
    const userId = activity.from.id;

    try {
        const member: TeamsChannelAccount = await context.api.conversations.members(conversationId).getById(userId);
        await context.send({
            type: 'message',
            text: `You are: ${member.name}`
        });
    } catch (error) {
        console.error('Error getting member:', error);
    }
}

// Mention a user in a message
async function mentionUser(context: IActivityContext): Promise<void> {
    const { activity } = context;
    const conversationId = activity.conversation.id;
    const userId = activity.from.id;

    try {
        const member: TeamsChannelAccount = await context.api.conversations.members(conversationId).getById(userId);

        // Create a text message with user mention
        const mentionText = `<at>${member.name}</at>`;
        await context.send({
            type: 'message',
            text: `Hello ${mentionText}`,
            entities: [
                {
                    type: 'mention',
                    text: mentionText,
                    mentioned: {
                        id: userId,
                        name: member.name,
                        role: 'user'
                    }
                }
            ]
        });
    } catch (error) {
        console.error('Error mentioning user:', error);
    }
}

// Starts the Teams bot application and listens for incoming requests
app.start().catch(console.error);
```

# [Python](#tab/python)

* [Sample code reference](https://github.com/OfficeDev/Microsoft-Teams-Samples/tree/abc97268bf41536509383283114c3a33684f0568/samples/bot-quickstart/python/bot-quickstart)

```python
# Copyright (c) Microsoft Corporation. All rights reserved.
# Licensed under the MIT License.

import asyncio

from dotenv import load_dotenv
from microsoft_teams.api import MessageActivity, MessageActivityInput
from microsoft_teams.apps import ActivityContext, App

# Load environment variables
load_dotenv()

# Initialize Teams App - automatically uses CLIENT_ID and CLIENT_SECRET from environment variables
# Note: .env file is only required when running on Teams (not needed for local development with devtools)
app = App()

async def send_welcome_message(ctx: ActivityContext) -> None:
    """Sends a welcome message with available commands."""
    welcome_message = (
        "Welcome to the Teams Quickstart Bot!"
    )
    await ctx.send(MessageActivityInput(text=welcome_message))


async def echo_message(ctx: ActivityContext, text: str) -> None:
    """Echo back the user's message."""
    await ctx.send(MessageActivityInput(text=f"**Echo:** {text}"))


async def get_single_member(ctx: ActivityContext[MessageActivity]) -> None:
    """Retrieves and displays information about the current user."""
    try:
        conversationId = ctx.activity.conversation.id
        userId = ctx.activity.from_.id
        user = await ctx.api.conversations.members(conversationId).get(userId)
        await ctx.send(MessageActivityInput(text=f"You are: {user.name}"))
    except Exception as error:
        print(f"Error getting member: {error}")


async def mention_user(ctx: ActivityContext[MessageActivity]) -> None:
    """Mention a user in a message."""
    try:

        conversationId = ctx.activity.conversation.id
        userId = ctx.activity.from_.id

        # Get user info directly from the activity
        user = await ctx.api.conversations.members(conversationId).get(userId)
        
        # Create a text message with user mention
        mention_text = f"<at>{user.name}</at>"
        await ctx.send(MessageActivityInput(
            text=f"Hello {mention_text}",
            entities=[
                {
                    "type": "mention",
                    "text": mention_text,
                    "mentioned": {
                        "id": userId,
                        "name": user.name,
                        "role": "user"
                    }
                }
            ]
        ))
    except Exception as error:
        print(f"Error mentioning user: {error}")


@app.on_conversation_update
async def handle_conversation_update(ctx: ActivityContext) -> None:
    """Handle conversation update events (when bot is added or members join)."""
    members_added = getattr(ctx.activity, 'members_added', [])
    
    for member in members_added:
        # Check if bot was added to the conversation
        if member.id == ctx.activity.recipient.id:
            await send_welcome_message(ctx)


@app.on_message
async def handle_message(ctx: ActivityContext[MessageActivity]) -> None:
    """Handles incoming messages and routes to appropriate functions based on message content."""
    # Get message text and normalize it
    text = (ctx.activity.text or "").strip().lower()
        
    # Handle mention me command
    if "mentionme" in text or "mention me" in text:
        await mention_user(ctx)
    # Handle whoami command
    elif "whoami" in text:
        await get_single_member(ctx)
    # Handle welcome command
    elif 'welcome' in text:
        await send_welcome_message(ctx)
    # Handle hi/hello - echo back
    elif "hi" in text or "hello" in text:
        await echo_message(ctx, text)


# Starts the Teams bot application and listens for incoming requests
if __name__ == "__main__":
    asyncio.run(app.start())
```

* * *

To enable smooth functioning of your bot code, there are few best practices that you must follow.

## Command menu best practices

Following are the command menu best practices:

* Keep it simple: The bot menu is meant to present the key capabilities of your bot.
* Keep it short: Menu options must not be long and must not be complex natural language statements. They must be simple commands.
* Keep it invokable: Bot menu actions or commands must always be available, regardless of the state of the conversation or the dialog the bot is in.

> [!NOTE]
> If you remove any commands from your manifest, you must redeploy your app to implement the changes. In general, any changes to the manifest require you to redeploy your app.

## Next step

> [!div class="nextstepaction"]
> [Channel and group chat conversations with a bot](conversations/channel-and-group-conversations.md)

## See also

* [Build bots for Teams](../what-are-bots.md)
* [App manifest schema for Teams](/microsoft-365/extensibility/schema/)
* [Messages in bot conversations](conversations/conversation-messages.md)
* [Adaptive Cards for bot developers](/adaptive-cards/getting-started/bots)
