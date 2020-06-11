---
title: Send proactive messages
author: clearab
description: How to send proactive messages with your Microsoft Teams bot.
ms.topic: overview
ms.author: anclear
---
# Send proactive messages

> [!Note]
> The code samples in this article make use of the v3 Bot Framework SDK, and v3 Teams Bot Builder SDK extensions. Conceptually, the information applies when using the v4 versions of the SDK, but the code is slightly different.

A proactive message is a message that is sent by a bot to start a conversation. You may want your bot to start a conversation for a number of reasons, including:

* Welcome messages for personal bot conversations
* Poll responses
* External event notifications

Sending a message to start a new conversation thread is different than sending a message in response to an existing conversation: when your bot starts a new a conversation, there is no pre-existing conversation to post the message to. In order to send a proactive message you need to:

1. [Decide what you're going to say](#best-practices-for-proactive-messaging)
1. [Obtain the user's unique Id and tenant Id](#obtain-necessary-user-information)
1. [Send the message](#examples)

When creating proactive messages you **must** call `MicrosoftAppCredentials.TrustServiceUrl`, and pass in the service URL before creating the [`ConnectorClient`](/azure/bot-service/dotnet/bot-builder-dotnet-connector) you will use to send the message. If you do not, your app will receive a `401: Unauthorized` response.

> [!Tip]
> For more details on setting up the `ConnectorClient` for .NET clients, see the [Send and receive activities](/azure/bot-service/dotnet/bot-builder-dotnet-connector#create-a-connector-client) topic
>
> More examples for sending proactive messages can be found in the Azure Bot Service [.NET](/azure/bot-service/dotnet/bot-builder-dotnet-proactive-messages) and [Node.js](/azure/bot-service/nodejs/bot-builder-nodejs-proactive-messages) documentation

## Best practices for proactive messaging

Sending proactive messages to users can be a very effective way to communicate with your users. However, from their perspective this message can appear to come to them completely unprompted, and in the case of welcome messages will be the first time they've interacted with your app. As such, it is very important to use this functionality sparingly (don't spam your users), and to provide them with enough information to let them understand why they are being messaged.

Proactive messages generally fall into one of two categories, welcome messages or notifications.

### Welcome messages

When using proactive messaging to send a welcome message to a user you must keep in mind that for most people receiving the message they will have no context for why they are receiving it. This is also the first time they will have interacted with your app; it is your opportunity to create a good first impression. The best welcome messages will include:

* **Why are they receiving this message.** It should be very clear to the user why they are receiving the message. If your bot was installed in a channel and you sent a welcome message to all users, let them know what channel it was installed in and potentially who installed it.
* **What do you offer.** What can they do with your app? What value can you bring to them?
* **What should they do next.** Invite them to try out a command, or interact with your app in some way.

### Notification messages

When using proactive messaging to send notifications you need to make sure your users have a clear path to take common actions based on your notification, and a clear understanding of why the notification occurred. Good notification messages will generally include:

* **What happened.** A clear indication of what happened to cause the notification.
* **What it happened to.** It should be clear what item/thing was updated to cause the notification.
* **Who did it.** Who took the action that caused the notification to be sent.
* **What they can do about it.** Make it easy for your users to take actions based on your notifications.
* **How they can opt out.** You need to provide a path for users to opt out of additional notifications.

## Obtain necessary user information

Bots can create new conversations with an individual Microsoft Teams user by obtaining the user's *unique ID* and *tenant ID.* You can obtain these values using one of the following methods:

* By [fetching the team roster](../get-teams-context.md#fetching-the-roster-or-user-profile) from a channel your app is installed in.
* By caching them when a user [interacts with your bot in a channel](./channel-and-group-conversations.md).
* When a users is [@mentioned in a channel conversation](./channel-and-group-conversations.md#retrieving-mentions) the bot is a part of.
* By caching them when you [receive the `conversationUpdate`](./subscribe-to-conversation-events.md#team-members-added) event when your app is installed in a personal scope, or new members are added to a channel or group chat that

### Proactively install your app using Graph

> [!Note]
> Proactively installing apps using graph is currently in beta.

Occasionally it may be necessary to proactively message users that have not installed or interacted with your app previously. For example, you want to use the [company communicator](~/samples/app-templates.md#company-communicator) to send messages to your entire organization. For this scenario you can use the Graph API to proactively install your app for your users, then cache the necessary values from the `conversationUpdate` event your app will receive upon install.

You can only install apps that are in your organizational app catalogue, or the Teams app store.

See [Install apps for users](/graph/teams-proactive-messaging) in the Graph documentation for complete details. There is also a [sample in .NET](https://github.com/microsoftgraph/contoso-airlines-teams-sample/blob/283523d45f5ce416111dfc34b8e49728b5012739/project/Models/GraphService.cs#L176).

## Examples

Be sure that you authenticate and have a bearer token before creating a new conversation using the REST API. The `members.id` field in the object below is unique to the combination of your bot and a user. You cannot obtain it via any other method than those outlined above.

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

This ID is the personal chat's unique conversation ID. Please store this value and reuse it for future interactions with the user.

# [C#/.NET](#tab/dotnet)

This example uses the [Microsoft.Bot.Connector.Teams](https://www.nuget.org/packages/Microsoft.Bot.Connector.Teams) NuGet package. In this example, `client` is a `ConnectorClient` instance that has already been created and authenticated as described in [Send and receive activities](/azure/bot-service/dotnet/bot-builder-dotnet-connector)

```csharp
// Create or get existing chat conversation with user
var response = client.Conversations.CreateOrGetDirectConversation(activity.Recipient, activity.From, activity.GetTenantId());

// Construct the message to post to conversation
Activity newActivity = new Activity()
{
    Text = "Hello",
    Type = ActivityTypes.Message,
    Conversation = new ConversationAccount
    {
        Id = response.Id
    },
};

// Post the message to chat conversation with user
await client.Conversations.SendToConversationAsync(newActivity, response.Id);
```

# [JavaScript](#tab/javascript)

*See also* [Bot Framework samples](https://github.com/Microsoft/BotBuilder-Samples/blob/master/README.md).

```javascript
var address =
{
    channelId: 'msteams',
    user: { id: userId },
    channelData: {
        tenant: {
            id: tenantId
        }
    },
    bot:
    {
        id: appId,
        name: appName
    },
    serviceUrl: session.message.address.serviceUrl,
    useAuth: true
}

var msg = new builder.Message().address(address);
msg.text('Hello, this is a notification');
bot.send(msg);
```

# [Python](#tab/python)

```python
async def _send_proactive_message():
  for conversation_reference in CONVERSATION_REFERENCES.values():
    return await ADAPTER.continue_conversation(APP_ID, conversation_reference,
      lambda turn_context: turn_context.send_activity("proactive hello")
    )

```

---

## Creating a channel conversation

Your team-added bot can post into a channel to create a new reply chain. If you're using the Node.js Teams SDK, use `startReplyChain()` which gives you a fully-populated address with the correct activity id and conversation id. If you are using C#, see the example below.

Alternatively, you can use the REST API and issue a POST request to [`/conversations`](https://docs.microsoft.com/azure/bot-service/rest-api/bot-framework-rest-connector-send-and-receive-messages?#start-a-conversation) resource.

# [C#/.NET](#tab/dotnet)

The following code snippet is from [this sample](https://github.com/OfficeDev/microsoft-teams-sample-complete-csharp/blob/32c39268d60078ef54f21fb3c6f42d122b97da22/template-bot-master-csharp/src/dialogs/examples/teams/ProactiveMsgTo1to1Dialog.cs).

```csharp
using Microsoft.Bot.Builder.Dialogs;
using Microsoft.Bot.Connector;
using Microsoft.Bot.Connector.Teams.Models;
using Microsoft.Teams.TemplateBotCSharp.Properties;
using System;
using System.Threading.Tasks;

namespace Microsoft.Teams.TemplateBotCSharp.Dialogs
{
    [Serializable]
    public class ProactiveMsgTo1to1Dialog : IDialog<object>
    {
        public async Task StartAsync(IDialogContext context)
        {
            if (context == null)
            {
                throw new ArgumentNullException(nameof(context));
            }

            var channelData = context.Activity.GetChannelData<TeamsChannelData>();
            var message = Activity.CreateMessageActivity();
            message.Text = "Hello World";

            var conversationParameters = new ConversationParameters
            {
                  IsGroup = true,
                  ChannelData = new TeamsChannelData
                  {
                      Channel = new ChannelInfo(channelData.Channel.Id),
                  },
                  Activity = (Activity) message
            };

            MicrosoftAppCredentials.TrustServiceUrl(serviceUrl, DateTime.MaxValue);
            var connectorClient = new ConnectorClient(new Uri(activity.ServiceUrl));
            var response = await connectorClient.Conversations.CreateConversationAsync(conversationParameters);

            context.Done<object>(null);
        }
    }
}
```

# [JavaScript](#tab/javascript)

The following code snippet is from [teamsConversationBot.js](https://github.com/microsoft/BotBuilder-Samples/blob/master/samples/javascript_nodejs/57.teams-conversation-bot/bots/teamsConversationBot.js).

[!code-javascript[messageAllMembersAsync](~/../botbuilder-samples/samples/javascript_nodejs/57.teams-conversation-bot/bots/teamsConversationBot.js?range=115-134&highlight=13-15)]

# [Python](#tab/python)

[!code-python[message-all-members](~/../botbuilder-samples/samples/python/57.teams-conversation-bot/bots/teams_conversation_bot.py?range=101-135)]

---
