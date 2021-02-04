---
title: send proactive messages
description: describes how to send proactive messages with your Microsoft Teams bot.
ms.topic: overview
ms.author: anclear
Keywords: send a message get user ID channel ID conversation ID
---
# Send proactive messages

[!INCLUDE [v4 to v3 pointer](~/includes/v4-to-v3-pointer-bots.md)]

A proactive message is any message sent by a bot that is not in direct response to a request from a user. This can include messages like:

* Welcome messages
* Notifications
* Scheduled messages

For your bot to send a proactive message, it must have access to the user, group chat, or team that you want to send the message to. For a group chat or team, this means the app that contains your bot must be installed to that location first. You can [proactively install your app using Graph](#proactively-install-your-app-using-graph) in a team, if required or use an [app policy](/microsoftteams/teams-custom-app-policies-and-settings) to push apps out to teams and users in your tenant. For users, your app either must be installed for the user or your user must be part of a team where your app is installed.

Sending a proactive message is different than sending a regular message. In that, there is no active `turnContext` to use for a reply. You may also need to create the conversation before sending the message. For example, a new one-to-one chat or a new conversation thread in a channel. You cannot create a new group chat or a new channel in a team with proactive messaging.

At a high level the steps you'll need to complete to send a proactive message are:

1. [Get the user ID or team/channel ID](#get-the-user-id-or-teamchannel-id) (if needed).
1. [Create the conversation or conversation thread](#create-the-conversation) (if needed).
1. [Get the conversation ID](#get-the-conversation-id).
1. [Send the message](#send-the-message).

The code snippets in the [examples](#examples) section are for creating a one-to-one conversation. For links to complete working samples for both one-to-one conversations and group or channels , see [code samples](#code-samples).

## Get the user ID or team/channel ID

To create a new conversation or conversation thread in a channel, you need the correct ID. You can receive or retrieve this ID in multiple ways:

1. When your app is installed in any particular context, you'll receive a [`onMembersAdded` Activity](~/bots/how-to/conversations/subscribe-to-conversation-events.md).
1. When a new user is added to a context where your app is installed, you'll receive a [`onMembersAdded` Activity](~/bots/how-to/conversations/subscribe-to-conversation-events.md).
1. You can retrieve the [list of channels](~/bots/how-to/get-teams-context.md) in a team your app is installed.
1. You can retrieve the [list of members](~/bots/how-to/get-teams-context.md) of a team your app is installed.
1. Every Activity your bot receives must contain the required information.

Regardless of how you gain the information, you'll need to store the `tenantId` and either the `userId` or `channelId` to create a new conversation. You can also use the `teamId` to create a new conversation thread in the general or default channel of a team.

The `userId` is unique to your bot Id and a particular user, you cannot re-use them between bots. The `channelId` is global, however, your bot must be installed in the team before you can send a proactive message to a channel.

## Create the conversation

After you have the user or channel information, you need to create the conversation if it doesn't already exist or you don't know the `conversationId`. You must only create the conversation once and make sure you store the `conversationId` value or `conversationReference` object to use in the future.

## Get the conversation ID

After the conversation is created, use either the `conversationReference` object or `conversationId` and `tenantId` to send the message. You can get this ID by either creating the conversation or storing it from any Activity sent to you from that context. Make certain that you store this ID.

## Send the message

Now that you have the right address information, you can send your message. If you're using the SDK, you'll do so using the `continueConversation` method, and the `conversationId` and `tenantId` to make a direct API call. You must set the `conversationParameters` correctly to successfully send your message. See the [examples](#examples) section or use one of the samples listed in the [code samples](#code-samples) section.

## Best practices for proactive messaging

Sending proactive messages to users is a very effective way to communicate with your users. However, from their perspective, this message can appear completely unprompted, and in the case of welcome messages, it is the first time they have interacted with your app. Therefore, it is very important to use this functionality sparingly, don't spam your users, and to provide enough information to let users understand why they are being messaged.

### Welcome messages

When using proactive messaging to send a welcome message to a user you must keep in mind that, for most people receiving the message, there is no context for why they are receiving it. This is also the first time they have interacted with your app. It is your opportunity to create a good first impression. The best welcome messages must include:

* **Why a user is receiving the message.** It must be very clear to the user why they are receiving the message. If your bot was installed in a channel and you sent a welcome message to all users, let them know what channel it was installed in and potentially who installed it.
* **What do you offer.** What can they do with your app? What value can you bring to them?
* **What should they do next.** Invite them to try out a command, or interact with your app in some way.

Remember, poor welcome messages can lead to users blocking your bot. Spend plenty of time crafting your welcome messages, and iterate on them if they are not having the desired effect.

### Notification messages

When using proactive messaging to send notifications you must ensure your users have a clear path to take common actions based on your notification and a clear understanding of why the notification occurred. Good notification messages generally include:

* **What happened.** A clear indication of what happened to cause the notification.
* **What was the result.** It must be clear what item or thing was updated to cause the notification.
* **Who/what triggered it.** Who or what took action that caused the notification to be sent.
* **What can users do in response.** Make it easy for your users to take actions based on your notifications.
* **How can users opt out.** You must provide a path for users to opt out of additional notifications.

## Proactively install your app using Graph

> [!Note]
> Proactively installing apps using the Microsoft Graph is currently in beta.

Occasionally it may be necessary to proactively message users that have not installed or interacted with your app previously. For example, you want to use the [company communicator](~/samples/app-templates.md#company-communicator) to send messages to your entire organization. For this scenario you can use the Graph API to proactively install your app for your users, then cache the necessary values from the `conversationUpdate` event your app receives upon installation.

You can only install apps that are in your organizational app catalog or the Teams app store.

See [Install apps for users](/graph/api/userteamwork-post-installedapps) in the Graph documentation and [Proactive bot installation and messaging in Teams with Microsoft Graph](../../../graph-api/proactive-bots-and-messages/graph-proactive-bots-and-messages.md). There is also a [Microsoft .NET framework sample](https://github.com/microsoftgraph/contoso-airlines-teams-sample/blob/283523d45f5ce416111dfc34b8e49728b5012739/project/Models/GraphService.cs#L176) on the GitHub platform.

## Examples

# [C#/.NET](#tab/dotnet)

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

# [TypeScript/Node.js](#tab/typescript)

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

You must supply the user ID and the tenant ID. If the call succeeds, the API returns with the following response object.

```json
{
  "id":"a:1qhNLqpUtmuI6U35gzjsJn7uRnCkW8NiZALHfN8AMxdbprS1uta2aT-jytfIlsZR3UZeg3TsIONNInBHsdjzj3PtfHuhkxxvS1jZZ61UAbw8fIdXcNSJyTJm7YvHFOgxo"
}
```

---

## Code samples

The official proactive messaging samples are as follows:

| Sample Name           | Description                                                                      | .NET    | JavaScript   | Python  |
|:----------------------|:---------------------------------------------------------------------------------|:--------|:-------------|:--------|
|Teams Conversation Basics  | Demonstrates basics of conversations in Teams, including sending one-to-one proactive messages.|[.NET&nbsp;Core](https://github.com/microsoft/BotBuilder-Samples/blob/master/samples/csharp_dotnetcore/57.teams-conversation-bot)|[JavaScript](https://github.com/microsoft/BotBuilder-Samples/tree/master/samples/javascript_nodejs/57.teams-conversation-bot) | [Python](https://github.com/microsoft/BotBuilder-Samples/blob/master/samples/python/57.teams-conversation-bot)|
|Start new thread in a channel     | Demonstrates creating a new thread in a channel. |[.NET&nbsp;Core](https://github.com/microsoft/BotBuilder-Samples/blob/master/samples/csharp_dotnetcore/58.teams-start-new-thread-in-channel)|[JavaScript](https://github.com/microsoft/BotBuilder-Samples/blob/master/samples/javascript_nodejs/58.teams-start-new-thread-in-channel)|[Python](https://github.com/microsoft/BotBuilder-Samples/blob/master/samples/python/58.teams-start-thread-in-channel) |

## View additional code samples
>
> [!div class="nextstepaction"]
> [**Teams proactive messaging code samples**](/samples/officedev/msteams-samples-proactive-messaging/msteams-samples-proactive-messaging/)
>
