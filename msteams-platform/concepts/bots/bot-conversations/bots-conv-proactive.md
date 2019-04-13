---
title: Proactive messages
description: Describes bots can start a conversation in Microsoft Teams
keywords: teams scenarios proactive messaging conversation bot
ms.date: 03/04/2019
---
# Proactive messaging for bots

A proactive message is a message that is sent by a bot to start a conversation. You may want your bot to start a conversation for a number of reasons, including:

- Welcome messages for personal bot conversations
- Poll responses
- External event notifications

Sending a message to start a new conversation thread   is different than sending a message in response to an existing conversation: when your bot starts a new a conversation, there is no pre-existing conversation to post the message to.

## Starting personal conversations

Bots can create new conversations with an individual Microsoft Teams user as long as your bot has user information obtained through previous addition in a personal or team scope. This information enables your bot to proactively notify them. For instance, if your bot was added to a team, it could query the team roster and send users individual messages in personal chats, or a user could @mention another user to trigger the bot to send that user a direct message.

You need the user’s *unique ID* and *tenant ID* to send a proactive message. Typically, these are   obtained from a team context, either by [fetching the team roster](~/concepts/bots/bots-context.md#fetching-the-team-roster) or when a user [interacts with your bot in a channel](~/concepts/bots/bot-conversations/bots-conv-channel.md). For bots that have already been added to the user's personal scope, you might have cached user information via the `conversationUpdate` event (see [Bot or user added to a team](~/concepts/bots/bots-notifications.md#team-member-or-bot-addition)).

You should use this capability sparingly and consider the user experience. Be sure not to spam end users and to send only the minimum amount of information and number of messages needed to complete your scenario. As a best practice, we also recommend indicating to the user why he or she is receiving the message. For instance, it may be due to action taken by another user in a common team. Here is an example of this practice from Karma:

![Example of providing a reason for a proactive message](~/assets/images/bots/karma-proactive-message.png)

### Example

Be sure that you authenticate and have a bearer token before creating a new conversation using the REST API.

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

### Using .NET

This example uses the [Microsoft.Bot.Connector.Teams](https://www.nuget.org/packages/Microsoft.Bot.Connector.Teams) NuGet package.

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

### Using Node.js

This example uses the [botbuilder-teams](https://www.npmjs.com/package/botbuilder-teams) npm package.

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

### Creating a channel conversation

Your team-added bot can post into a channel to create a reply chain. If you're using the Node.js Teams SDK, use `startReplyChain()` which gives you a fully-populated address with the correct activity id and conversation id. If you are using C#, see the example below.

In the past it was recommended to use `bot.beginDialog` which could cause the following problems:

- You would not be able to append to that reply chain since the conversation id is incorrect
- If the dialog sent multiple messages (or requires multiple turns) that would create separate reply chains in the channel.

This is no longer recommended.

Alternatively, you can use the REST API and issue a POST request to [`/conversations`](https://docs.microsoft.com/en-us/azure/bot-service/rest-api/bot-framework-rest-connector-send-and-receive-messages?#start-a-conversation) resource.

#### .NET example (from [this sample](https://github.com/OfficeDev/microsoft-teams-sample-complete-csharp/blob/32c39268d60078ef54f21fb3c6f42d122b97da22/template-bot-master-csharp/src/dialogs/examples/teams/ProactiveMsgTo1to1Dialog.cs))

```csharp
using Microsoft.Bot.Builder.Dialogs;
using Microsoft.Bot.Connector;
using Microsoft.Bot.Connector.Teams.Models;
using Microsoft.Teams.TemplateBotCSharp.Properties;
using System;
using System.Threading.Tasks;

namespace Microsoft.Teams.TemplateBotCSharp.Dialogs
{
    /// <summary>
    /// This is Proactive Message Dialog Class. Main purpose of this class is to show the Send Proactive Message Example
    /// </summary>
    [Serializable]
    public class ProactiveMsgTo1to1Dialog : IDialog<object>
    {
        public async Task StartAsync(IDialogContext context)
        {
            if (context == null)
            {
                throw new ArgumentNullException(nameof(context));
            }

            //Set the Last Dialog in Conversation Data
            context.UserData.SetValue(Strings.LastDialogKey, Strings.LastDialogSend1on1Dialog);

            var userId = context.Activity.From.Id;
            var botId = context.Activity.Recipient.Id;
            var botName = context.Activity.Recipient.Name;

            var channelData = context.Activity.GetChannelData<TeamsChannelData>();
            var connectorClient = new ConnectorClient(new Uri(context.Activity.ServiceUrl));

            var parameters = new ConversationParameters
            {
                Bot = new ChannelAccount(botId, botName),
                Members = new ChannelAccount[] { new ChannelAccount(userId) },
                ChannelData = new TeamsChannelData
                {
                    Tenant = channelData.Tenant
                }
            };

            var conversationResource = await connectorClient.Conversations.CreateConversationAsync(parameters);

            var message = Activity.CreateMessageActivity();
            message.From = new ChannelAccount(botId, botName);
            message.Conversation = new ConversationAccount(id: conversationResource.Id.ToString());
            message.Text = Strings.Send1on1Prompt;

            await connectorClient.Conversations.SendToConversationAsync((Activity)message);

            context.Done<object>(null);
        }
    }
}
```
