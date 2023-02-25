---
title: Send proactive messages
description: Learn how to send proactive messages with your Teams bot, install your app using Microsoft Graph, and check code samples based on Bot Framework SDK v4.
ms.topic: conceptual
ms.author: surbhigupta
ms.localizationpriority: high
---
# Proactive messages

[!INCLUDE [v4 to v3 pointer](~/includes/v4-to-v3-pointer-bots.md)]

A proactive message is any message sent by a bot that isn't in response to a request from a user. This message can include content, such as:

* Welcome messages
* Notifications
* Scheduled messages

> [!IMPORTANT]
>
> * To send proactive message, it's recommended to start with [building notification bot with JavaScript](../../../sbs-gs-notificationbot.yml) or [incoming webhook notification sample](https://github.com/OfficeDev/TeamsFx-Samples/tree/dev/incoming-webhook-notification). To get started, download [Teams Toolkit](https://marketplace.visualstudio.com/items?itemName=TeamsDevApp.ms-teams-vscode-extension) explore. For more information, see [Teams Toolkit documents](../../../toolkit/teams-toolkit-fundamentals.md).
>
> * Currently, bots are available in Government Community Cloud (GCC) and GCC-High but not in Department of Defense (DOD). For proactive messages the bots should use the following end points for government cloud environments: <br> - GCC: `https://smba.infra.gcc.teams.microsoft.com/gcc`<br> - GCCH: `https://smba.infra.gov.teams.microsoft.us/gcch`

To send a proactive message to a user, a group chat, or a team, your bot must have the requisite access to send the message. For a group chat or team, the app that contains your bot must be first installed in that location.

You can [proactively install your app using Microsoft Graph](#proactively-install-your-app-using-graph) in a team, if necessary, or use a [custom app policy](/microsoftteams/teams-custom-app-policies-and-settings) to install an app in your teams and for organization's users. For certain scenarios, you must [proactively install your app using Graph](#proactively-install-your-app-using-graph). For a user to receive proactive messages, install the app for the user or make the user a part of a team in which the app is installed.

Sending a proactive message is different from sending a regular message. There's no active `turnContext` to use for a reply. You must create the conversation before sending the message. For example, a new one-to-one chat or a new conversation thread in a channel. You can't create a new group chat or a new channel in a team with proactive messaging.

To send a proactive message, follow these steps:

1. [Get the user ID, team ID, or channel ID](#get-the-user-id-team-id-or-channel-id), if necessary.
1. [Create the conversation](#create-the-conversation), if necessary.
1. [Get the conversation ID](#get-the-conversation-id).
1. [Send the message](#send-the-message).

The code snippets in the [samples](#samples) section are to create a one-to-one conversation. For links to samples for both one-to-one conversations and group or channels messages, see [code sample](#code-sample). To use proactive messages effectively, see [best practices for proactive messaging](#best-practices-for-proactive-messaging).

## Get the user ID, team ID, or channel ID

You can create a new conversation with a user or a conversation thread in a channel and you must have the correct ID. You can receive or retrieve this ID using any of the following ways:

* When your app is installed in a particular context, you receive an [`onMembersAdded` activity](~/bots/how-to/conversations/subscribe-to-conversation-events.md).
* When a new user is added to a context where your app is installed, you receive an [`onMembersAdded` activity](~/bots/how-to/conversations/subscribe-to-conversation-events.md).
* Every event that the bot receives contains the required information, which you can get from the bot context (TurnContext object).
* You can retrieve the [list of channels](~/bots/how-to/get-teams-context.md) in a team where your app is installed.
* You can retrieve the [list of members](~/bots/how-to/get-teams-context.md) of a team where your app is installed.

Regardless of how you get the information, store the `tenantId` and either the `userId` or `channelId` to create a new conversation. You can also use the `teamId` to create a new conversation thread in the general or default channel of a team.

The `userId` is unique to your bot ID and a particular user. You can't reuse the `userId` between bots. The `channelId` is global. However, install the bot in the team before you can send a proactive message to a channel.

Create the conversation, after you have the user or channel information.

## Create the conversation

You can create the conversation if it doesn't exist or you don't know the `conversationId`. Create the conversation only once and store the `conversationId` value or `conversationReference` object.

To create the conversation, you need a `userId`, `tenantId`, and `serviceUrl`.

For `serviceUrl`, use the value from an incoming activity triggering the flow or one of the global service URLs. If the `serviceUrl` isn't available from an incoming activity triggering the proactive scenario, use the following global URL endpoints:

* Public: `https://smba.trafficmanager.net/teams/`
* GCC: `https://smba.infra.gcc.teams.microsoft.com/gcc`
* GCCH: `https://smba.infra.gov.teams.microsoft.us/gcch`

For a code sample, see the call `CreateConversationAsync` in the [**sample**](https://github.com/OfficeDev/Microsoft-Teams-Samples/blob/main/samples/bot-conversation/csharp/Bots/TeamsConversationBot.cs).

You can get the conversation when the app is installed for the first time. After the conversation is created, [get the conversation ID](#get-the-conversation-id). The `conversationId` is available in the conversation update events.

If you don't have the `conversationId`, you can [proactively install your app using Graph](#proactively-install-your-app-using-graph) to get the `conversationId`.

## Get the conversation ID

Use either the `conversationReference` object or `conversationId` and `tenantId` to send the message. You can get this ID by either creating the conversation or storing it from any activity sent to you from that context. Store this ID for reference.

After you get the appropriate address information, you can send your message.

## Send the message

Now that you have the right address information, you can send your message. If you're using the SDK, you must use the `continueConversation` method, and the `conversationId` and `tenantId` to make a direct API call. To send your message, set the `conversationParameters`. See the [samples](#samples) section or use one of the samples listed in the [code sample](#code-sample) section.

> [!NOTE]
> Teams doesn't support sending proactive messages using email or User Principal Name (UPN).

Now that you've sent the proactive message, you must follow these best practices while sending proactive messages for better information exchange between users and the bot.

See the following video to learn how to send proactive message from bots:

<br>

> [!VIDEO https://www.microsoft.com/en-us/videoplayer/embed/RE4NHyk]
<br>

### Understand who blocked, muted, or uninstalled a bot

As a developer, you can create a report to understand which users in your organization have blocked, muted, or uninstalled a bot. This information may help your organization's admins to broadcast org-wide messages or drive app usage.

Using Teams, you can send a proactive message to the bot to verify if a user has blocked or uninstalled a bot. If the bot is blocked or uninstalled, Teams returns a `403` response code with a `subCode: MessageWritesBlocked`. This response indicates that the message sent by the bot isn't delivered to the user.

The response code is sent on a per-user basis and includes the identity of the user. You can compile the response codes for each user alongside their identity to create a report of all users who have blocked the bot.

An example of a 403 response code is below.

```http

HTTP/1.1 403 Forbidden

Cache-Control: no-store, must-revalidate, no-cache

 Pragma: no-cache

 Content-Length: 196

 Content-Type: application/json; charset=utf-8

 Server: Microsoft-HTTPAPI/2.0

 Strict-Transport-Security: max-age=31536000; includeSubDomains

 MS-CV: NXZpLk030UGsuHjPdwyhLw.5.0

 ContextId: tcid=0,server=msgapi-canary-eus2-0,cv=NXZpLk030UGsuHjPdwyhLw.5.0

 Date: Tue, 29 Mar 2022 17:34:33 GMT

{"errorCode":209,"message":"{\r\n  \"subCode\": \"MessageWritesBlocked\",\r\n  \"details\": \"Thread is blocked from message writes.\",\r\n  \"errorCode\": null,\r\n  \"errorSubCode\": null\r\n}"}
```

## Best practices for proactive messaging

Sending proactive messages to the users is an effective way to communicate with your users. However, from the user's perspective, the message appears unprompted. If there's a welcome message, it will be the first time that they’ve interacted with your app. It's important to use this functionality and provide the complete information to the user to understand the purpose of this message.

### Welcome messages

When proactive messaging is used to send a welcome message to a user, there's no context for why the user receives the message. Also, this is the first interaction of the user with your app. It's an opportunity to create a good first impression. A good user experience ensures better adoption of the app. Poor welcome messages can lead the users to block your app. Write a clear welcome message and iterate on the welcome message if it isn't having the desired effect.

A good welcome message can include the following:

* Reason for the message - It must be clear to the user why they're receiving the message. If your bot was installed in a channel and you sent a welcome message to all users, then let them know what channel it was installed in and who installed it.

* Your offer - Users must be able to identify what they can do with your app and what value can you bring to them.

* Next steps - Users should understand the next steps. For example, invite users to try out a command or interact with your app.

### Notification messages

To send notifications using proactive messaging, ensure your users have a clear path to take common actions based on your notification. Ensure users have a clear understanding of why they've received a notification. Good notification messages generally include the following items:

* What happened? A clear indication of what happened to cause the notification.

* What was the result? It must be clear, what item is updated to get the notification.

* Who or what triggered it? Who or what took action, which caused the notification to be sent.

* What can users do in response? Make it easy for your users to take actions based on your notifications.

* How can users opt-out? You must provide a path for users to opt-out of more notifications.

To send messages to a large group of users, for example to your organization, proactively install your app using Graph.

### Scheduled messages

When using proactive messaging to send scheduled messages to users, verify that your time zone is updated to their time zone. This ensures that the messages are delivered to the users at the relevant time. Schedule messages generally include:

* Why is the user receiving the message? Make it easy for your users to understand the reason for which they're receiving the message.

* What can user do next? Users can take the required action based on the message content.

## Proactively install your app using Graph

Proactively message users that have previously not installed or interacted with your app. For example, you want to use the [company communicator](~/samples/app-templates.md#company-communicator) to send messages to your entire organization. In this case, you can use the Graph API to proactively install your app for your users. Cache the necessary values from the `conversationUpdate` event your app receives upon installation.

You can only install apps that are in your organizational app catalog or the Teams App Store.

See [install apps for users](/graph/api/userteamwork-post-installedapps) in the Graph documentation and [proactive bot installation and messaging in Teams with Graph](../../../graph-api/proactive-bots-and-messages/graph-proactive-bots-and-messages.md). There's also a [Microsoft .NET framework sample](https://github.com/microsoftgraph/contoso-airlines-teams-sample/blob/283523d45f5ce416111dfc34b8e49728b5012739/project/Models/GraphService.cs#L176) on the GitHub platform.

## Samples

The following code shows how to send proactive messages:

# [C#](#tab/dotnet)

* [SDK reference](/dotnet/api/microsoft.bot.builder.cloudadapterbase.continueconversationasync?view=botbuilder-dotnet-stable#microsoft-bot-builder-cloudadapterbase-continueconversationasync(system-string-microsoft-bot-schema-activity-microsoft-bot-builder-botcallbackhandler-system-threading-cancellationtoken)&preserve-view=true)
* [Sample code reference](https://github.com/OfficeDev/Microsoft-Teams-Samples/blob/main/samples/graph-meeting-notification/csharp/MeetingNotification/Controllers/NotificationController.cs#L112)

```csharp
[Route("api/notify")]
[ApiController]
public class NotifyController : ControllerBase
{
    private readonly IBotFrameworkHttpAdapter _adapter;
    private readonly string _appId;
    private readonly ConcurrentDictionary<string, ConversationReference> _conversationReferences;

    public NotifyController(IBotFrameworkHttpAdapter adapter, IConfiguration configuration, ConcurrentDictionary<string, ConversationReference> conversationReferences)
    {
        _adapter = adapter;
        _conversationReferences = conversationReferences;
        _appId = configuration["MicrosoftAppId"] ?? string.Empty;
    }

    public async Task<IActionResult> Get()
    {
        foreach (var conversationReference in _conversationReferences.Values)
        {
            var newReference = new ConversationReference()
            {
                Bot = new ChannelAccount()
                {
                    Id = conversationReference.Bot.Id
                },
                Conversation = new ConversationAccount()
                {
                    Id = conversationReference.Conversation.Id
                },
                ServiceUrl = conversationReference.ServiceUrl,
            };

            // Sends a proactive message from the bot to a conversation.
            await ((BotAdapter)_adapter).ContinueConversationAsync(_appId, newReference, BotCallback, default(CancellationToken));
        }
        
        // Let the caller know proactive messages have been sent.
        return new ContentResult()
        {
            Content = "<html><body><h1>Proactive messages have been sent.</h1></body></html>",
            ContentType = "text/html",
            StatusCode = (int)HttpStatusCode.OK,
        };
    }

    private async Task BotCallback(ITurnContext turnContext, CancellationToken cancellationToken)
    {
        // If you encounter permission-related errors when sending this message, see
        // https://aka.ms/BotTrustServiceUrl
        // Sends an activity to the sender of the incoming activity.
        await turnContext.SendActivityAsync("proactive hello");
    }
}
```

Example of a code snippet to demonstrate creating conversation reference.

```csharp
 var newReference = new ConversationReference()
        {
            Bot = new ChannelAccount()
            {
                Id = conversationReference.Bot.Id
            },
            Conversation = new ConversationAccount()
            {
                Id = conversationReference.Conversation.Id
            },
            ServiceUrl = conversationReference.ServiceUrl,
        };
```

# [TypeScript](#tab/typescript)
* [SDK reference](/javascript/api/botbuilder-core/turncontext?view=botbuilder-ts-latest#botbuilder-core-turncontext-getconversationreference&preserve-view=true)
* [Sample code reference](https://github.com/OfficeDev/Microsoft-Teams-Samples/blob/main/samples/graph-proactive-installation/nodejs/bots/proactiveBot.js#L59)

```javascript

async messageAllMembersAsync(context) {
    const members = await this.getPagedMembers(context);

    members.forEach(async (teamMember) => {
        const message = MessageFactory.text('Hello ${ teamMember.givenName } ${ teamMember.surname }. I\'m a Teams conversation bot.');
        // A conversation reference for the conversation that contains this activity.
        var ref = TurnContext.getConversationReference(context.activity);
        ref.user = teamMember;

        await context.adapter.createConversation(ref,
            async (t1) => {
                const ref2 = TurnContext.getConversationReference(t1.activity);
                await t1.adapter.continueConversation(ref2, async (t2) => {
                    await t2.sendActivity(message);
                });
            });
    });
    // Sends an activity to the sender of the incoming activity.
    await context.sendActivity(MessageFactory.text('All messages have been sent.'));
}

```

# [Python](#tab/python)
* [SDK reference](/python/api/botbuilder-core/botbuilder.core.botframeworkadapter?view=botbuilder-py-latest#botbuilder-core-botframeworkadapter-create-conversation&preserve-view=true)
* [Sample code reference](https://github.com/OfficeDev/Microsoft-Teams-Samples/blob/main/samples/bot-conversation/python/bots/teams_conversation_bot.py#L200)

```python
# Send message to all members.
async def _message_all_members(self, turn_context: TurnContext):
    team_members = await self._get_paged_members(turn_context)

    for member in team_members:
        # A conversation reference for the conversation that contains this activity.
        conversation_reference = TurnContext.get_conversation_reference(
            turn_context.activity
        )

        conversation_parameters = ConversationParameters(
            is_group=False,
            bot=turn_context.activity.recipient,
            members=[member],
            tenant_id=turn_context.activity.conversation.tenant_id,
        )

        async def get_ref(tc1):
            conversation_reference_inner = TurnContext.get_conversation_reference(
                tc1.activity
            )
            return await tc1.adapter.continue_conversation(
                conversation_reference_inner, send_message, self._app_id
            )

        async def send_message(tc2: TurnContext):
            return await tc2.send_activity(
                f"Hello {member.name}. I'm a Teams conversation bot."
            )

        await turn_context.adapter.create_conversation(
            conversation_reference, get_ref, conversation_parameters
        )

    # Sends an activity to the sender of the incoming activity.
    await turn_context.send_activity(
        MessageFactory.text("All messages have been sent")
    )

```

# [JSON](#tab/json)

[SDK reference](/microsoftteams/platform/bots/how-to/conversations/send-proactive-messages?tabs=json)

```json
POST /v3/conversations
{
  "bot": {
    "id": "28:10j12ou0d812-2o1098-c1mjojzldxcj-1098028n ",
    "name": "The Bot"
  },
  "members": [
    {
      "id": "29:012d20j1cjo20211"
    }
  ],
  "channelData": {
    "tenant": {
      "id": "197231joe-1209j01821-012kdjoj"
    }
  }
}
```

You must supply the user ID and the tenant ID. If the call succeeds, the API returns the following response object:

```json
{
  "id":"a:1qhNLqpUtmuI6U35gzjsJn7uRnCkW8NiZALHfN8AMxdbprS1uta2aT-jytfIlsZR3UZeg3TsIONNInBHsdjzj3PtfHuhkxxvS1jZZ61UAbw8fIdXcNSJyTJm7YvHFOgxo"
}
```

---

## Code sample

The following table provides a simple code sample that incorporates basic conversation flow into a Teams application and how to create a new conversation thread in a channel in Teams:

| **Sample Name** | **Description** | **.NET** | **Node.js** | **Python** | **Manifest**
|---------------|--------------|--------|-------------|--------|--------|
| Teams Conversation Basics  | Sample app which demonstrates use of different bot conversation events available in bot framework v4 for personal and teams scope.| [View](https://github.com/OfficeDev/Microsoft-Teams-Samples/tree/main/samples/bot-conversation/csharp) | [View](https://github.com/OfficeDev/Microsoft-Teams-Samples/tree/main/samples/bot-conversation/nodejs) | [View](https://github.com/OfficeDev/Microsoft-Teams-Samples/tree/main/samples/bot-conversation/python) | [View](https://github.com/OfficeDev/Microsoft-Teams-Samples/tree/main/samples/bot-conversation/csharp/demo-manifest)
| Start new thread in a channel | Sample app which demonstrate how to start a thread in a specific Team's channel using Bot Framework v4. | [View](https://github.com/OfficeDev/Microsoft-Teams-Samples/tree/main/samples/bot-initiate-thread-in-channel/csharp) | [View](https://github.com/OfficeDev/Microsoft-Teams-Samples/tree/main/samples/bot-initiate-thread-in-channel/nodejs) | [View](https://github.com/OfficeDev/Microsoft-Teams-Samples/tree/main/samples/bot-initiate-thread-in-channel/python) | [View](https://github.com/OfficeDev/Microsoft-Teams-Samples/tree/main/samples/bot-initiate-thread-in-channel/csharp/demo-manifest) |
| Proactive installation of app and sending proactive notifications | This sample shows how you can use proactive installation of app for users and send proactive notifications by calling Microsoft Graph APIs. | [View](https://github.com/OfficeDev/Microsoft-Teams-Samples/tree/main/samples/graph-proactive-installation/csharp) | [View](https://github.com/OfficeDev/Microsoft-Teams-Samples/tree/main/samples/graph-proactive-installation/nodejs) | NA | [View](https://github.com/OfficeDev/Microsoft-Teams-Samples/tree/main/samples/graph-proactive-installation/csharp/demo-manifest)
| Proactive Messaging | This is a sample that shows how to save user's conversation reference information to send proactive reminder message using Bots. | NA | [View](https://github.com/OfficeDev/Microsoft-Teams-Samples/tree/main/samples/bot-proactive-messaging-teamsfx) | NA |

> [!div class="nextstepaction"]
> [More code sample of proactive messaging](/samples/officedev/msteams-samples-proactive-messaging/msteams-samples-proactive-messaging/)

## Next step

> [!div class="nextstepaction"]
> [Format your bot messages](~/bots/how-to/format-your-bot-messages.md)

## See also

* [**Teams proactive messaging code samples**](https://github.com/OfficeDev/Microsoft-Teams-Samples/tree/main/samples/bot-proactive-messaging/csharp)
* [Channel and group chat conversations with a bot](~/bots/how-to/conversations/channel-and-group-conversations.md)
* [Respond to the task module submit action](~/messaging-extensions/how-to/action-commands/respond-to-task-module-submit.md)
* [Send proactive notifications to users](/azure/bot-service/bot-builder-howto-proactive-message)
* [Build your first bot app using JavaScript](../../../sbs-gs-bot.yml)
* [Build notification bot with JavaScript to send a proactive message](../../../sbs-gs-notificationbot.yml)
* [TurnContext](/javascript/api/botbuilder-core/turncontext?view=botbuilder-ts-latest"&preserve-view=true")
