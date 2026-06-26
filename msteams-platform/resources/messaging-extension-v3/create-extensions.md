---
title: Action-based Message Extensions
description: Learn how to create and configure action-based message extensions for Microsoft Teams using Teams SDK to allow users to trigger external services.
ms.localizationpriority: medium
ms.topic: how-to
ms.date: 05/13/2026
ms.owner: slamba
---
# Initiate actions with message extensions

Action-based message extensions allow your users to trigger actions in external services while in Teams.

:::image type="content" source="../../assets/images/compose-extensions/ceexample.png" alt-text="The screenshot is an example that shows the message extension card.":::

[!include[Common content for creating extensions](~/includes/messaging-extensions/messaging-extensions-common.md)]

## Action type message extensions

To initiate actions from a message extension, set the `type` parameter to `action`. A single message extension can have up to 10 different commands and include multiple search-based and action-based commands.

### Complete app manifest example

The following code is an example of a manifest with a search and a create command:

```json
{
  "$schema": "https://developer.microsoft.com/json-schemas/teams/v1.8/MicrosoftTeams.schema.json",
  "manifestVersion": "1.5",
  "version": "1.0",
  "id": "57a3c29f-1fc5-4d97-a142-35bb662b7b23",
  "developer": {
    "name": "John Developer",
    "websiteUrl": "http://todobotservice.azurewebsites.net/",
    "privacyUrl": "http://todobotservice.azurewebsites.net/privacy",
    "termsOfUseUrl": "http://todobotservice.azurewebsites.net/termsofuse"
  },
  "name": {
    "short": "To Do",
    "full": "To Do"
  },
  "description": {
    "short": "Find or create a new task in To Do",
    "full": "Find or create a new task in To Do"
  },
  "icons": {
    "outline": "todo-outline.jpg",
    "color": "todo-color.jpg"
  },
  "accentColor": "#ff6a00",
  "composeExtensions": [
    {
      "botId": "57a3c29f-1fc5-4d97-a142-35bb662b7b23",
      "canUpdateConfiguration": true,
      "commands": [
        {
          "id": "searchCmd",
          "description": "Search you Todo's",
          "title": "Search",
          "initialRun": true,
          "context": ["commandBox", "compose"],
          "parameters": [
            {
              "name": "searchKeyword",
              "description": "Enter your search keywords",
              "title": "Keywords"
            }
          ]
        },
        {
          "id": "addTodo",
          "description": "Create a To Do item",
          "title": "Create To Do",
          "type": "action",
          "context": ["commandBox", "message", "compose"],
          "parameters": [
            {
              "name": "Name",
              "description": "To Do Title",
              "title": "Title",
              "inputType": "text"
            },
            {
              "name": "Description",
              "description": "Description of the task",
              "title": "Description",
              "inputType": "textarea"
            },
            {
              "name": "Date",
              "description": "Due date for the task",
              "title": "Date",
              "inputType": "date"
            }
          ]
        },
        {
          "id": "reassignTodo",
          "description": "Reassign a todo item",
          "title": "Reassign a todo item",
          "type": "action",
          "fetchTask": false,
          "parameters": [
            {
              "name": "Name",
              "title": "Title"
              "inputType": "text"
            }
          ]
        }
      ]
    }
  ],
  "permissions": [
    "identity",
    "messageTeamMembers"
  ],
  "validDomains": [
    "todobotservice.azurewebsites.net",
    "*.todobotservice.azurewebsites.net"
  ]
}
```

### Initiate actions from messages

You can initiate actions from the compose message area and also from a message using your message extension, which allows you to send the message contents to your bot for processing. You can optionally respond to that message using the method described in [Responding to submit](#responding-to-submit). The response is included as a reply to the message, which users can edit before submitting.

Users can access message extension from **Take action** option of the overflow `...` menu, as shown in the following image:

:::image type="content" source="../../assets/images/compose-extensions/MessageExtensions_MessageAction.png" alt-text="Screenshot describes how to initiate an action from a message.":::

To enable your message extension to work from a message, add the `context` parameter to your message extension's `commands` object in your app manifest as in the following example. Valid strings for the `context` array are `"message"`, `"commandBox"`, and `"compose"`. The default value is `["compose", "commandBox"]`. See the [define commands](#define-commands) section for complete details on the `context` parameter:

```json
"composeExtensions": [
  {
    "botId": "57a3c29f-1fc5-4d97-a142-35bb662b7b23",
    "canUpdateConfiguration": true,
    "commands": [
      {
        "id": "reassignTodo",
        "description": "Reassign a todo item",
        "title": "Create To Do",
        "type": "Action",
        "context": ["message"],
        "fetchTask": true
    }]
    ...

```

The following code is an example of the `value` object containing the message details that is sent as part of the `composeExtensions` request to your bot:

```json
{
  "name": "composeExtension/submitAction",
  "type": "invoke",
...
  "value": {
    "commandId": "setReminder",
    "commandContext": "message",
    "messagePayload": {
      "id": "1111111111",
      "replyToId": null,
      "createdDateTime": "2019-02-25T21:29:36.065Z",
      "lastModifiedDateTime": null,
      "deleted": false,
      "subject": "Message subject",
      "summary": null,
      "importance": "normal",
      "locale": "en-us",
      "body": {
        "contentType": "html",
        "content": "this is the message"
    },
      "from": {
        "device": null,
        "conversation": null,
        "user": {
          "userIdentityType": "aadUser",
          "id": "wxyz12ab8-ab12-cd34-ef56-098abc123876",
          "displayName": "Jamie Smythe"
        },
        "application": null
      },
      "reactions": [
        {
          "reactionType": "like",
          "createdDateTime": "2019-02-25T22:40:40.806Z",
          "user": {
            "device": null,
            "conversation": null,
            "user": {
              "userIdentityType": "aadUser",
              "id": "qrst12346-ab12-cd34-ef56-098abc123876",
              "displayName": "Jim Brown"
            },
            "application": null
          }
        }
      ],
      "mentions": [
        {
          "id": 0,
          "mentionText": "Sarah",
          "mentioned": {
            "device": null,
            "conversation": null,
            "user": {
              "userIdentityType": "aadUser",
              "id": "ab12345678-ab12-cd34-ef56-098abc123876",
              "displayName": "Sarah"
            },
            "application": null
          }
        }
      ]
    }
  ...
```

### Test via uploading

You can test your message extension by uploading your app. For more information, see [Uploading your app in a team](~/concepts/deploy-and-publish/apps-upload.md).

To open your message extension, go to any of your chats or channels. Select the **More options** (**&#8943;**) button in the compose box and choose your message extension.

## Collecting input from users

There are three ways to collect information from a user in Teams.

### Static parameter list

In this method, all you need to do is define a static list of parameters in the manifest as shown in the "Create To Do" command. To use this method, ensure `fetchTask` is set to `false` and that you define your parameters in the manifest.

When a user chooses a command with static parameters, Teams generates a form in a task module with the defined parameters in the manifest. On hitting Submit, a `composeExtensions/submitAction` is sent to the bot. For more information on the expected set of responses, see [Responding to submit](#responding-to-submit).

### Dynamic input using an Adaptive Card

In this method, your service can define a custom Adaptive Card to collect the user input. For this approach, set the `fetchTask` parameter to `true` in the manifest. If you set `fetchTask` to `true`, any static parameters defined for the command are ignored.

In this method, your service receives a `composeExtensions/fetchTask` event and responds with an Adaptive Card based [task module response](~/task-modules-and-cards/task-modules/invoking-task-modules.md#dialoginfo-object). Following is a sample response with an Adaptive Card:

```json
{
    "task": {
        "type": "continue",
        "value": {
            "card": {
                "contentType": "application/vnd.microsoft.card.adaptive",
                "content": {
                    "body": [
                        {
                            "type": "TextBlock",
                            "text": "Please enter the following information:"
                        },
                        {
                            "type": "TextBlock",
                            "text": "Name"
                        },
                        {
                            "type": "Input.Text",
                            "spacing": "None",
                            "title": "New Input.Toggle",
                            "placeholder": "Placeholder text"
                        },
                        {
                            "type": "TextBlock",
                            "text": "Date of birth"
                        },
                        {
                            "type": "Input.Date",
                            "spacing": "None",
                            "title": "New Input.Toggle"
                        }
                    ],
                    "type": "AdaptiveCard",
                    "$schema": "http://adaptivecards.io/schemas/adaptive-card.json",
                    "version": "1.0"
                }
            }
        }
    }
}
```

The bot can also respond with an auth/config response if the user needs to authenticate or configure the extension before getting the user input.

### Dynamic input using a web view

In this method, your service can show an `<iframe>` based widget to show any custom UI and collect user input. For this approach, set the `fetchTask` parameter to `true` in the manifest.

Just like in the Adaptive Card flow, your service sends a `fetchTask` event and responds with a URL based [task module response](~/task-modules-and-cards/task-modules/invoking-task-modules.md#dialoginfo-object). Following is a sample response with an Adaptive Card:

```json
{
    "task": {
        "value": {
            "url": "http://mywebapp.com/input"
        },
        "type": "continue"
    }
}
```

### Request to install your conversational bot

If your app contains a conversation bot, ensure it's installed in the conversation before loading your task module to get more context for your task module. For example, you might need to fetch the roster to populate a people picker control, or the list of channels in a team.

To facilitate this flow, when your message extension first receives the `composeExtensions/fetchTask` invoke, check to see if your bot is installed in the current context. You can get this, by attempting the get roster call. For example, if your bot isn't installed, you return an Adaptive Card with an action that requests the user to install your bot. The user needs to have permission to install apps in that location. If they can’t install, the message prompts to contact the administrator.

Here's an example of the response:

```json
{
  "type": "AdaptiveCard",
  "body": [
    {
      "type": "TextBlock",
      "text": "Looks like you haven't used Disco in this team/chat"
    }
  ],
  "actions": [
    {
      "type": "Action.Submit",
      "title": "Continue",
      "data": {
        "msteams": {
          "justInTimeInstall": true
        }
      }
    }
  ],
  "version": "1.0"
}
```

Once the user completes the installation, your bot receives another invoke message with `name = composeExtensions/submitAction` and `value.data.msteams.justInTimeInstall = true`.

Here's an example of the invoke:

```json
{
  "value": {
    "commandId": "giveKudos",
    "commandContext": "compose",
    "context": {
      "theme": "default"
    },
    "data": {
      "msteams": {
        "justInTimeInstall": true
      }
    }
  },
  "conversation": {
    "id": "19:7705841b240044b297123ad7f9c99217@thread.skype"
  },
  "name": "composeExtension/submitAction",
  "imdisplayname": "Bob Smith"
}
```

Respond to the invoke with the same task response that you have responded with, if the bot was installed.

## Responding to submit

Once a user completes entering their input, bot receives a `composeExtensions/submitAction` event with the command ID and parameter values set.

These are the different expected responses to a `submitAction`.

### Task module response

Task module response is used when your extension needs to chain dialogs together to get more information. The response is same as `fetchTask` mentioned earlier.

### Compose extensions auth/config response

Compose extensions auth/config response is used when your extension needs to either authenticate or configure to continue. For more information, see [authentication section](~/resources/messaging-extension-v3/search-extensions.md#authentication) in the search section.

### Compose extensions result response

Compose extensions result response is used to insert a card into the compose box as a result of the command. It's the same response that's used in the search command, but it's limited to one card or one result in the array.

```json
{
  "composeExtension": {
    "type": "result",
    "attachmentLayout": "list",
    "preview": {
          "contentType": "application/vnd.microsoft.card.thumbnail",
          "content": {
            "title": "85069: Create a cool app",
            "images": [
              {
                "url": "https://placekitten.com/200/200"
              }
            ]
          }
        },
    "attachments": [
      {  
        "contentType": "application/vnd.microsoft.teams.card.o365connector",
        "content": {
          "sections": [
            {
              "activityTitle": "[85069]: Create a cool app",
              "activityImage": "https://placekitten.com/200/200"
            },
            {
              "title": "Details",
              "facts": [
                {
                  "name": "Assigned to:",
                  "value": "[Larry Brown](mailto:larryb@example.com)"
                },
                {
                  "name": "State:",
                  "value": "Active"
                }
              ]
            }
          ]
        }
      }
    ]
  }
}
```

### Respond with an Adaptive Card message sent from a bot

Respond to the submit action by inserting a message with an Adaptive Card into the channel with a bot. Your user can preview the message before submitting it, and potentially edit/interact with it as well. This can be useful in scenarios where you need to gather information from your users before creating an Adaptive Card response. The following scenario shows how you can use this flow to configure a poll without including the configuration steps in the channel message.

1. The user selects the message extension to trigger the task module.
1. The user uses the task module to configure the poll.
1. After you submit the configuration task module, the app uses the information provided in the task module to craft an Adaptive Card and sends it as a `botMessagePreview` response to the client.
1. The user can then preview the Adaptive Card message before the bot inserts it into the channel. If the bot isn't already a member of the channel, clicking `Send` adds the bot.
1. Interacting with the Adaptive Card changes the message before sending it.
1. Once the user selects `Send`, the bot posts the message to the channel.

> [!NOTE]
>
> * The `activityPreview` must contain a `message` activity with exactly one Adaptive Card attachment.
> * Outlook doesn't support to respond with an Adaptive Card message sent from a bot.

To enable this flow your task module should respond as in the following example, which presents the preview message to the user:

```json
{
  "composeExtension": {
    "type": "botMessagePreview",
    "activityPreview": {
      "type": "message",
      "attachments":  [
        {
          "contentType": "application/vnd.microsoft.card.adaptive",
          "content": << Card Payload >>
        }
      ]
    }
  }
}
```

Your message extension needs to respond to two new types of interactions, `value.botMessagePreviewAction = "send"` and `value.botMessagePreviewAction = "edit"`. The following code is an example of the `value` object you need to process:

```json
{
  "name": "composeExtension/submitAction",
  "type": "invoke",
  "conversation": { "id": "19:c366b75791784100b6e8b515fd55b063@thread.skype" },
  "imdisplayname": "Pranav Smith",
  ...
  "value": {
    "botMessagePreviewAction": "send" | "edit",
    "botActivityPreview": [
      {
        "type": "message/card",
        "attachments": [
          {
            "content":
              {
                "type": "AdaptiveCard",
                "body": [{<<card payload>>}]
              },
            "contentType" : "application/vnd.microsoft.card.adaptive"
          }
        ],
        "context": { "theme": "default" }
      }
    ],
  }
}
```

When responding to the `edit` request, you must respond with a `task` response with the values populated with the information that the user submitted. When responding to the `send` request, you should send a message to the channel containing the finalized Adaptive Card.

# [TypeScript/Node.js](#tab/typescript)

* [Sample code reference](https://github.com/OfficeDev/Microsoft-Teams-Samples/tree/main/samples/TeamsSDK/bot-message-extensions/nodejs/bot-message-extensions)

```typescript

import { cardAttachment, MessagingExtensionActionResponse } from '@microsoft/teams.api'
import { App } from '@microsoft/teams.apps'
import { AdaptiveCard, TextBlock, TextInput, SubmitAction } from '@microsoft/teams.cards'

const app = new App()

// Handle composeExtension/fetchTask — present the task module

app.on('message.ext.open', async ({ activity }) => {
    const card = new AdaptiveCard(
        new TextBlock('Please enter the following information:', { size: 'Large' }),
        new TextBlock('Card Message:'),
        new TextInput({ id: 'cardMessage', placeholder: 'Card message goes here.' }),
        new SubmitAction({ title: 'Submit' })
    )

    return {
        task: {
            type: 'continue' as const,
            value: {
                title: 'Task Module',
                card: cardAttachment('adaptive', card),
            },
        },
    }
})


// Handle composeExtension/submitAction — process submission

app.on('message.ext.submit', async ({ activity, send }) => {
    const action = activity.value


    // Handle botMessagePreview send action

    if (action.botMessagePreviewAction === 'send') {
        const cardAttach = action.botActivityPreview?.[0]?.attachments?.[0]
        if (cardAttach) {
            await send({ type: 'message', attachments: [cardAttach] })
        }
        return {}
    }


    // Handle botMessagePreview edit action

    if (action.botMessagePreviewAction === 'edit') {
        const card = new AdaptiveCard(
            new TextBlock('Please enter the following information:', { size: 'Large' }),
            new TextBlock('Card Message:'),
            new TextInput({ id: 'cardMessage', placeholder: 'Card message goes here.' }),
            new SubmitAction({ title: 'Submit' })
        )

        return {
            task: {
                type: 'continue' as const,
                value: {
                    title: 'Card Preview',
                    card: cardAttachment('adaptive', card),
                },
            },
        }
    }


    // Initial submission — return a botMessagePreview

    const text = (action.data as Record<string, string>)?.cardMessage || ''


    const previewCard = new AdaptiveCard(
        new TextBlock('This card will be inserted into the conversation by the bot.', {
            size: 'Large',
            wrap: true,
        }),
        new TextBlock('The text below is what you provided.'),
        new TextBlock(text)
    )


    return {
        composeExtension: {
            type: 'botMessagePreview' as const,
            activityPreview: {
                type: 'message',
                attachments: [cardAttachment('adaptive', previewCard)],
            },
        },
    } satisfies MessagingExtensionActionResponse
})


app.start().catch(console.error)
```

# [C#/.NET](#tab/dotnet)

* [Sample code reference](https://github.com/OfficeDev/Microsoft-Teams-Samples/tree/main/samples/TeamsSDK/bot-message-extensions/dotnet/bot-message-extensions)

```csharp

using Microsoft.Teams.Apps;
using Microsoft.Teams.Apps.Activities.Invokes;
using Microsoft.Teams.Api;
using Microsoft.Teams.Api.Activities;
using Microsoft.Teams.Api.TaskModules;
using Microsoft.Teams.Cards;
using Microsoft.Teams.Plugins.AspNetCore.Extensions;
using MsgExt = Microsoft.Teams.Api.MessageExtensions;
using Newtonsoft.Json.Linq;
using AdaptiveCard = Microsoft.Teams.Cards.AdaptiveCard;

var builder = WebApplication.CreateBuilder(args);
builder.AddTeams();
var app = builder.Build();
var teams = app.UseTeams();

// Handle composeExtension/fetchTask — present the task module to the user
teams.OnFetchTask(async (ctx) =>
{
    var card = new AdaptiveCard()
    {
        Version = Microsoft.Teams.Cards.Version.Version1_4,
        Body =
        [
            new TextBlock("Please enter the following information:") { Size = TextSize.Large },
            new TextBlock("Card Message:"),
            new TextInput() { Id = "cardMessage", Placeholder = "Card message goes here." }
        ],
        Actions =
        [
            new SubmitAction() { Title = "Submit" }
        ]
    };


    var taskInfo = new TaskInfo
    {
        Title = "Task Module",
        Card = new Attachment(ContentType.AdaptiveCard) { Content = card }
    };


    return new MsgExt.ActionResponse
    {
        Task = new ContinueTask(taskInfo)
    };

});

// Handle composeExtension/submitAction — process submission and return bot message preview
teams.OnSubmitAction(async (ctx) =>
{
    var action = ctx.Activity.Value;


    // Handle botMessagePreview send action

    if (action.BotMessagePreviewAction == MsgExt.MessagePreviewAction.Send)
    {
        // Send the card to the channel

        var previewActivity = action.BotActivityPreview?.FirstOrDefault();

        if (previewActivity is MessageActivity previewMsg && previewMsg.Attachments?.Any() == true)
        {
            await ctx.Send(new MessageActivity
            {
                Attachments = previewMsg.Attachments
            });
        }

        return new MsgExt.ActionResponse();
    }


    // Handle botMessagePreview edit action
    if (action.BotMessagePreviewAction == MsgExt.MessagePreviewAction.Edit)
    {
        var editCard = new AdaptiveCard()
        {
            Version = Microsoft.Teams.Cards.Version.Version1_4,
            Body =
            [
                new TextBlock("Please enter the following information:") { Size = TextSize.Large },
                new TextBlock("Card Message:"),
                new TextInput() { Id = "cardMessage", Placeholder = "Card message goes here." }
            ],
            Actions =
            [
                new SubmitAction() { Title = "Submit" }
            ]
        };


        return new MsgExt.ActionResponse
        {
            Task = new ContinueTask(new TaskInfo
            {
                Title = "Card Preview",
                Card = new Attachment(ContentType.AdaptiveCard) { Content = editCard }
            })
        };
    }

    // Initial submission — build a preview card and return botMessagePreview

    var data = action.Data as JObject;

    var text = data?["cardMessage"]?.ToString() ?? "";

    var previewCard = new AdaptiveCard()
    {
        Version = Microsoft.Teams.Cards.Version.Version1_4,
        Body =
        [
            new TextBlock("This card will be inserted into the conversation by the bot.") { Size = TextSize.Large, Wrap = true },
            new TextBlock("The text below is what you provided."),
            new TextBlock(text)
        ]
    };


    return new MsgExt.ActionResponse
    {
        ComposeExtension = new MsgExt.Result
        {
            Type = MsgExt.ResultType.BotMessagePreview,
            ActivityPreview = new MessageActivity
            {
                Attachments =
                [
                    new Attachment(ContentType.AdaptiveCard) { Content = previewCard }
                ]
            }
        }
    };
});

app.Run();
```

# [Python](#tab/python)

* [Sample code reference](https://github.com/OfficeDev/Microsoft-Teams-Samples/tree/main/samples/TeamsSDK/bot-message-extensions/python/bot-message-extensions)

```python

import asyncio
from dotenv import load_dotenv
from microsoft_teams.api import (
    MessageExtensionFetchTaskInvokeActivity,
    MessageExtensionSubmitActionInvokeActivity,
    MessagingExtensionActionInvokeResponse,
    MessagingExtensionResult,
    MessagingExtensionResultType,
    TaskModuleContinueResponse,
    CardTaskModuleTaskInfo,
    MessageActivity,
    Account,
    ConversationAccount,
    card_attachment,
    AdaptiveCardAttachment,
)

from microsoft_teams.apps import ActivityContext, App
from microsoft_teams.cards import AdaptiveCard, TextBlock, TextInput, SubmitAction

load_dotenv()
app = App()


@app.on_message_ext_open
async def handle_fetch_task(ctx: ActivityContext[MessageExtensionFetchTaskInvokeActivity]):
    """Handle composeExtension/fetchTask - present the task module to the user."""

    card = AdaptiveCard(
        body=[
            TextBlock(text="Please enter the following information:", size="Large"),
            TextBlock(text="Card Message:"),
            TextInput(id="cardMessage", placeholder="Card message goes here."),
        ],
        actions=[SubmitAction(title="Submit")],
    )


    return MessagingExtensionActionInvokeResponse(
        task=TaskModuleContinueResponse(
            value=CardTaskModuleTaskInfo(
                title="Task Module",
                card=card_attachment(AdaptiveCardAttachment(content=card)),
            )
        )
    )


@app.on_message_ext_submit
async def handle_submit_action(ctx: ActivityContext[MessageExtensionSubmitActionInvokeActivity]):
    """Handle composeExtension/submitAction - process submission and bot message preview."""

    action = ctx.activity.value


    # Handle botMessagePreview send action

    if action.bot_message_preview_action == "send":

        card_attach = None

        if action.bot_activity_preview:
            preview_activity = action.bot_activity_preview[0]

            if hasattr(preview_activity, "attachments") and preview_activity.attachments:
                card_attach = preview_activity.attachments[0]

        if card_attach:
            from microsoft_teams.api import MessageActivityInput

            await ctx.send(MessageActivityInput(text="", attachments=[card_attach]))

        return MessagingExtensionActionInvokeResponse()


    # Handle botMessagePreview edit action

    if action.bot_message_preview_action == "edit":

        card = AdaptiveCard(
            body=[
                TextBlock(text="Please enter the following information:", size="Large"),
                TextBlock(text="Card Message:"),
                TextInput(id="cardMessage", placeholder="Card message goes here."),
            ],
            actions=[SubmitAction(title="Submit")],
        )

        return MessagingExtensionActionInvokeResponse(
            task=TaskModuleContinueResponse(
                value=CardTaskModuleTaskInfo(
                    title="Card Preview",
                    card=card_attachment(AdaptiveCardAttachment(content=card)),
                )
            )
        )


    # Initial submission - build a preview card and return botMessagePreview

    text = (action.data or {}).get("cardMessage", "")


    preview_card = AdaptiveCard(
        body=[
            TextBlock(
                text="This card will be inserted into the conversation by the bot.",
                size="Large",
                wrap=True,
            ),
            TextBlock(text="The text below is what you provided."),
            TextBlock(text=text),
        ]
    )


    return MessagingExtensionActionInvokeResponse(
        compose_extension=MessagingExtensionResult(
            type=MessagingExtensionResultType.BOT_MESSAGE_PREVIEW,
            activity_preview=MessageActivity(
                type="message",
                id="preview",
                from_=Account(id="bot", name="Bot"),
                conversation=ConversationAccount(id="conv"),
                recipient=Account(id="user", name="User"),
                attachments=[
                    card_attachment(AdaptiveCardAttachment(content=preview_card))
                ],
            ),
        )
    )


if __name__ == "__main__":
    asyncio.run(app.start())
```

---

## See also

* [Teams SDK samples](https://github.com/OfficeDev/Microsoft-Teams-Samples/blob/main/README.md)
* [Teams CLI](https://microsoft.github.io/teams-sdk/cli/)
* [Agents Skills](https://microsoft.github.io/teams-sdk/developer-tools/agent-skills)
