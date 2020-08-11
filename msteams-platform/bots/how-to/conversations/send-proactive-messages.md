---
title: Send proactive messages
author: clearab
description: How to send proactive messages with your Microsoft Teams bot.
ms.topic: overview
ms.author: anclear
---
# Send proactive messages

[!INCLUDE [v4 to v3 pointer](~/includes/v4-to-v3-pointer-bots.md)]

A proactive message is any message sent by a bot that is not in direct response to a request from a user. This can include messages like:

* Welcome messages
* Notifications
* Scheduled messages

In order for your bot to send a proactive message, it must have access to the user, group chat, or team that you wish to send the message to. For a group chat or team, this means the app that contains your bot must first be installed to that location. You can [Proactively install your app using Graph](#proactively-install-your-app-using-graph) in a team if necessary, or use an [app policy](/microsoftteams/teams-custom-app-policies-and-settings) to push apps out to teams and users in your tenant. For users, your app either needs to be installed for that user, or your user needs to be part of a team where your app is installed.

Sending a proactive message is different than sending a regular message in that you won't have an active `turnContext` to use to reply to. You may also need to create the conversation (for example a new one-to-one chat, or a new conversation thread in a channel) before sending the message. You cannot create a new group chat or a new channel in a team with proactive messaging.

At a high level the steps you'll need to complete to send a proactive message are:

1. [Get the user ID or team/channel ID](#get-the-user-id-or-teamchannel-id) (if needed).
1. [Create the conversation or conversation thread](#create-the-conversation) (if needed).
1. [Get the conversation ID](#get-the-conversation-id) to send the message to.
1. [Send the message](#send-the-message).

The code snippets in the [example](#example) section below are for creating a one-to-one conversation, see the [references](#references) section for links to complete working samples for both one-to-once conversations and group/channels.

## Get the user ID or team/channel ID

If you need to create a new conversation or conversation thread in a channel you'll first need the right ID to create the conversation in. You can receive/retrieve this ID in multiple ways:

1. When your app is installed in any particular context, you'll receive a [`onMembersAdded` Activity](~/bots/how-to/conversation/subscribe-to-conversation-events.md).
1. When a new user is added to a context your app is installed in, you'll also receive a [`onMembersAdded` Activity](~/bots/how-to/conversation/subscribe-to-conversation-events.md).
1. You can retrieve the [list of channels](~/bots/how-to/get-teams-context.md) in a team your app is installed in.
1. You can retrieve the [list of members](~/bots/how-to/get-teams-context.md) of a team your app is installed in.
1. Every Activity your bot receives will contain the necessary information.

Regardless of how you gain the information, you'll need to store the 'tenantId' and either the `userId` or `channelId` in order to create a new conversation. You can also use the `teamId` to create a new conversation thread in the general/default channel of a team.

The `userId` is unique to the combination of your bot Id and a particular user, you cannot re-use them between bots. The `channelId` is global, however your bot _must_ be installed in the team before you can send a proactive message to a channel.

## Create the conversation

Once you have the user/channel information, you'll need to create the conversation if it doesn't already exist (or you don't know the `conversationId`). You should only ever create the conversation once; make sure you store the `conversationId` value or `conversationReference` object to use in the future.

## Get the conversation ID

Once the conversation has been created, you will use either the `conversationReference` object or the `conversationId` and the `tenantId` to send the message. You can get this Id by either creating the conversation, or storing it from any Activity sent to you from that context. Make sure you're storing this Id.

## Send the message

Now that you have the right addressing information, you can send your message. If you're using the SDK you'll do so using the `continueConversation` method, with a direct API call you'll use the `conversationId` and `tenantId`. You'll need to set the `conversationParameters` correctly to successfully send your message - see the [examples](#examples) below or use one of the samples listed in the [references](#references) section.

## Best practices for proactive messaging

Sending proactive messages to users can be a very effective way to communicate with your users. However, from their perspective this message can appear to come to them completely unprompted, and in the case of welcome messages will be the first time they've interacted with your app. As such, it is very important to use this functionality sparingly (don't spam your users), and to provide them with enough information to let them understand why they are being messaged.

### Welcome messages

When using proactive messaging to send a welcome message to a user you must keep in mind that for most people receiving the message they will have no context for why they are receiving it. This is also the first time they will have interacted with your app; it is your opportunity to create a good first impression. The best welcome messages will include:

* **Why are they receiving this message.** It should be very clear to the user why they are receiving the message. If your bot was installed in a channel and you sent a welcome message to all users, let them know what channel it was installed in and potentially who installed it.
* **What do you offer.** What can they do with your app? What value can you bring to them?
* **What should they do next.** Invite them to try out a command, or interact with your app in some way.

Remember, poor welcome messages can lead to users blocking your bot. You should spend plenty of time crafting your welcome messages, and iterate on them if they are not having the desired effect.

### Notification messages

When using proactive messaging to send notifications you need to make sure your users have a clear path to take common actions based on your notification, and a clear understanding of why the notification occurred. Good notification messages will generally include:

* **What happened.** A clear indication of what happened to cause the notification.
* **What it happened to.** It should be clear what item/thing was updated to cause the notification.
* **Who did it.** Who took the action that caused the notification to be sent.
* **What they can do about it.** Make it easy for your users to take actions based on your notifications.
* **How they can opt out.** You need to provide a path for users to opt out of additional notifications.

## Proactively install your app using Graph

> [!Note]
> Proactively installing apps using the Microsoft Graph is currently in beta.

Occasionally it may be necessary to proactively message users that have not installed or interacted with your app previously. For example, you want to use the [company communicator](~/samples/app-templates.md#company-communicator) to send messages to your entire organization. For this scenario you can use the Graph API to proactively install your app for your users, then cache the necessary values from the `conversationUpdate` event your app will receive upon install.

You can only install apps that are in your organizational app catalogue, or the Teams app store.

See [Install apps for users](/graph/teams-proactive-messaging) in the Graph documentation for complete details. There is also a [sample in .NET](https://github.com/microsoftgraph/contoso-airlines-teams-sample/blob/283523d45f5ce416111dfc34b8e49728b5012739/project/Models/GraphService.cs#L176).

## Example

# [C#/.NET](#tab/dotnet)

```csharp
private async Task MessageAllMembersAsync(ITurnContext<IMessageActivity> turnContext, CancellationToken cancellationToken)
{
    var teamsChannelId = turnContext.Activity.TeamsGetChannelId();
    var serviceUrl = turnContext.Activity.ServiceUrl;
    var credentials = new MicrosoftAppCredentials(_appId, _appPassword);
    ConversationReference conversationReference = null;

    //Get the set of member IDs to send the message to
    var members = await GetPagedMembers(turnContext, cancellationToken);

    foreach (var teamMember in members)
    {
        var proactiveMessage = MessageFactory.Text($"Hello {teamMember.GivenName} {teamMember.Surname}. I'm a Teams conversation bot.");

        var conversationParameters = new ConversationParameters
        {
            IsGroup = false,
            Bot = turnContext.Activity.Recipient,
            Members = new ChannelAccount[] { teamMember },
            TenantId = turnContext.Activity.Conversation.TenantId,
        };
        //create the new one-to-one conversations
        await ((BotFrameworkAdapter)turnContext.Adapter).CreateConversationAsync(
            teamsChannelId,
            serviceUrl,
            credentials,
            conversationParameters,
            async (t1, c1) =>
            {
                //Get the conversationReference
                conversationReference = t1.Activity.GetConversationReference();
                //Send the proactive message
                await ((BotFrameworkAdapter)turnContext.Adapter).ContinueConversationAsync(
                    _appId,
                    conversationReference,
                    async (t2, c2) =>
                    {
                        await t2.SendActivityAsync(proactiveMessage, c2);
                    },
                    cancellationToken);
            },
            cancellationToken);
    }

    await turnContext.SendActivityAsync(MessageFactory.Text("All messages have been sent."), cancellationToken);
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

## References

The official proactive messaging samples are listed below.

|    | Sample Name           | Description                                                                      | .NET    | JavaScript   | Python  |
|:--:|:----------------------|:---------------------------------------------------------------------------------|:--------|:-------------|:--------|
|57|Teams Conversation Basics  | Demonstrates basics of conversations in Teams, including sending one-to-one proactive messages.|[.NET&nbsp;Core](https://github.com/microsoft/BotBuilder-Samples/blob/master/samples/csharp_dotnetcore/57.teams-conversation-bot)|[JavaScript](https://github.com/microsoft/BotBuilder-Samples/tree/master/samples/javascript_nodejs/57.teams-conversation-bot) | [Python](https://github.com/microsoft/BotBuilder-Samples/blob/master/samples/python/57.teams-conversation-bot)|
|58|Start new thread in a channel     | Demonstrates creating a new thread in a channel. |[.NET&nbsp;Core](https://github.com/microsoft/BotBuilder-Samples/blob/master/samples/csharp_dotnetcore/58.teams-start-new-thread-in-channel)|[JavaScript](https://github.com/microsoft/BotBuilder-Samples/blob/master/samples/javascript_nodejs/58.teams-start-new-thread-in-channel)|[Python](https://github.com/microsoft/BotBuilder-Samples/blob/master/samples/python/58.teams-start-thread-in-channel) |

The sample below demonstrates the minimal amount of information needed to send a proactive message (without using a `conversationReference` object). This sample can be useful if you're using REST API calls directly, or haven't been storing full `conversationReference` objects.

* [Teams Proactive Messaging](https://github.com/clearab/teamsProactiveMessaging)
