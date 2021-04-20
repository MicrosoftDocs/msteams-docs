---
title: Send proactive messages
description: Describes how to send proactive messages with your Microsoft Teams bot.
ms.topic: conceptual
ms.author: anclear
localization_priority: Normal
Keywords: send a message get user ID channel ID conversation ID
---
# Send proactive messages

[!INCLUDE [v4 to v3 pointer](~/includes/v4-to-v3-pointer-bots.md)]

A proactive message is any message sent by a bot that is not in response to a request from a user. This can include messages, such as:

* Welcome messages
* Notifications
* Scheduled messages

For your bot to send a proactive message to a user, group chat, or team, it must have access to send the message. For a group chat or team, the app that contains your bot must be first installed in that location. You can [proactively install your app using Microsoft Graph](#proactively-install-your-app-using-graph) in a team, if required, or use an [app policy](/microsoftteams/teams-custom-app-policies-and-settings) to push apps out to teams and users in your tenant. For users, your app either must be installed for the user or your user must be part of a team where your app is installed.

Sending a proactive message is different from sending a regular message. There is no active `turnContext` to use for a reply. You must create the conversation before sending the message. For example, a new one-to-one chat or a new conversation thread in a channel. You cannot create a new group chat or a new channel in a team with proactive messaging.

**To send a proactive message**

1. [Get the user ID, team ID, or channel ID](#get-the-user-id-team-id-or-channel-id), if required.
1. [Create the conversation](#create-the-conversation), if required.
1. [Get the conversation ID](#get-the-conversation-id).
1. [Send the message](#send-the-message).

For using proactive messages effectively, see [best practices for proactive messaging](#best-practices-for-proactive-messaging). For certain scenarios, you must [proactively install your app using Graph](#proactively-install-your-app-using-graph). The code snippets in the [samples](#samples) section are for creating a one-to-one conversation. For complete working samples for both one-to-one conversations and groups or channels, see [code sample](#code-sample).

## Get the user ID, team ID or channel ID

To create a new conversation or conversation thread in a channel, you must have the correct ID. You can receive or retrieve this ID using any of the following:

* When your app is installed in any particular context, you receive an [`onMembersAdded` activity](~/bots/how-to/conversations/subscribe-to-conversation-events.md).
* When a new user is added to a context where your app is installed, you receive an [`onMembersAdded` activity](~/bots/how-to/conversations/subscribe-to-conversation-events.md).
* You can retrieve the [list of channels](~/bots/how-to/get-teams-context.md) in a team where your app is installed.
* You can retrieve the [list of members](~/bots/how-to/get-teams-context.md) of a team where your app is installed.
* Every activity your bot receives must contain the required information.

Regardless of how you get the information, you must store the `tenantId` and either the `userId` or `channelId` to create a new conversation. You can also use the `teamId` to create a new conversation thread in the general or default channel of a team.

The `userId` is unique to your bot ID and a particular user. You cannot reuse the `userId` between bots. The `channelId` is global. However, your bot must be installed in the team before you can send a proactive message to a channel.

After you have the user or channel information, you must create the conversation.

## Create the conversation

You must create the conversation if it does not exist or you do not know the `conversationId`. You must only create the conversation once and store the `conversationId` value or `conversationReference` object.

After the conversation is created, you must get the conversation ID.

## Get the conversation ID

Use either the `conversationReference` object or `conversationId` and `tenantId` to send the message. You can get this ID by either creating the conversation or storing it from any activity sent to you from that context. Store this ID for reference.

After you get the appropriate address information, you can send your message.

## Send the message

If you are using the SDK, you must use the `continueConversation` method, and the `conversationId` and `tenantId` to make a direct API call to send the message. You must set the `conversationParameters` correctly to successfully send your message.

Now that you have sent the proactive message, you must follow these best practices while sending proactive messages for better information exchange between users and the bot.

## Best practices for proactive messaging

Sending proactive messages to users is a very effective way to communicate with your users. However, from their perspective, this message can appear completely unprompted, and in the case of welcome messages, it is the first time they have interacted with your app. Therefore, it is very important to use proactive messaging sparingly, not spam your users, and provide enough information to let users understand why they are receiving the messages.

### Welcome messages

When proactive messaging is used to send a welcome message to a user, there is no context for why the users receive the message. This is also the first time users interact with your app. It is an opportunity to create a good first impression. The best welcome messages must include:

* Why a user is receiving the message: It must be very clear to the user why they are receiving the message. If your bot was installed in a channel and you sent a welcome message to all users, let them know what channel it was installed in and who installed it.
* What do you offer: Users must be able to identify what they can do with your app and what value can you bring to them.
* What should they do next: Invite users to try out a command, or interact with your app.

Poor welcome messages can lead to users blocking your bot. Write to the point and clear welcome messages. Iterate on the welcome messages if they are not having the desired effect.

### Notification messages

To send notifications using proactive messaging, ensure your users have a clear path to take common actions based on your notification. Ensure users have a clear understanding of why they have received a notification. Good notification messages generally include the following:

* What happened: A clear indication of what happened to cause the notification.
* What was the result: It must be clear what item was updated to cause the notification.
* Who or what triggered it: Who or what took action that caused the notification to be sent.
* What can users do in response: Make it easy for your users to take actions based on your notifications.
* How can users opt-out: You must provide a path for users to opt-out of additional notifications.

To send messages to a large group of users, for example to your organization, proactively install your app using Graph.

### Scheduled messages

When using proactive messaging to send scheduled messages to users, verify that your time zone is updated to their time zone. This ensures that the messages are delivered to the users at the relevant time. Schedule messages generally include:

* **Why is the user receiving the message**: Make it easy for your users to understand the reason for which they are receiving the message.
* **What can user do next**: Users can take the required action based on the message content.

## Proactively install your app using Graph

> [!Note]
> Proactively installing apps using Graph is currently in beta.

Proactively message users that have previously not installed or interacted with your app. For example, you want to use the [company communicator](~/samples/app-templates.md#company-communicator) to send messages to your entire organization. In this case, you can use the Graph API to proactively install your app for your users. Cache the necessary values from the `conversationUpdate` event your app receives upon installation.

You can only install apps that are in your organizational app catalog or the Teams App Store.

See [install apps for users](/graph/api/userteamwork-post-installedapps) in the Graph documentation and [proactive bot installation and messaging in Teams with Graph](../../../graph-api/proactive-bots-and-messages/graph-proactive-bots-and-messages.md). There is also a [Microsoft .NET framework sample](https://github.com/microsoftgraph/contoso-airlines-teams-sample/blob/283523d45f5ce416111dfc34b8e49728b5012739/project/Models/GraphService.cs#L176) on the GitHub platform.

## Samples

The following code shows a simple code sample that proactively installs your app using Graph:

# [C#](#tab/dotnet)

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
            await ((BotAdapter)_adapter).ContinueConversationAsync(_appId, conversationReference, BotCallback, default(CancellationToken));
        }
        
        // Let the caller know proactive messages have been sent
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
        await turnContext.SendActivityAsync("proactive hello");
    }
}
```

# [TypeScript](#tab/typescript)

```javascript

async messageAllMembersAsync(context) {
    const members = await this.getPagedMembers(context);

    members.forEach(async (teamMember) => {
        const message = MessageFactory.text('Hello ${ teamMember.givenName } ${ teamMember.surname }. I\'m a Teams conversation bot.');

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

    await context.sendActivity(MessageFactory.text('All messages have been sent.'));
}
```

# [Python](#tab/python)

```python
async def _message_all_members(self, turn_context: TurnContext):
    team_members = await self._get_paged_members(turn_context)

    for member in team_members:
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

    await turn_context.send_activity(
        MessageFactory.text("All messages have been sent")
    )

```

# [JSON](#tab/json)

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

The following table provides a simple code sample that incorporate basic conversation flow into a Teams application and how to create a new conversation thread in a channel in Teams:

| Sample name           | Description                                                                      | .NET    | Node.js   | Python  |
|:----------------------|:---------------------------------------------------------------------------------|:--------|:-------------|:--------|
|Teams conversation basics  | Demonstrates basics of conversations in Teams, including sending one-to-one proactive messages.|[View](https://github.com/microsoft/BotBuilder-Samples/blob/master/samples/csharp_dotnetcore/57.teams-conversation-bot)|[View](https://github.com/microsoft/BotBuilder-Samples/tree/master/samples/javascript_nodejs/57.teams-conversation-bot) | [View](https://github.com/microsoft/BotBuilder-Samples/blob/master/samples/python/57.teams-conversation-bot)|
|Start new thread in a channel     | Demonstrates creating a new thread in a channel. |[View](https://github.com/microsoft/BotBuilder-Samples/blob/master/samples/csharp_dotnetcore/58.teams-start-new-thread-in-channel)|[View](https://github.com/microsoft/BotBuilder-Samples/blob/master/samples/javascript_nodejs/58.teams-start-new-thread-in-channel)|[View](https://github.com/microsoft/BotBuilder-Samples/blob/master/samples/python/58.teams-start-thread-in-channel) |

### Additional code sample

> [!div class="nextstepaction"]
> [Teams proactive messaging code samples](/samples/officedev/msteams-samples-proactive-messaging/msteams-samples-proactive-messaging/)

## Next step

> [!div class="nextstepaction"]
> [Format your bot messages](~/bots/how-to/format-your-bot-messages.md)
