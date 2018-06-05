---
title: Proactive messages
description: Describes bots can start a conversation in Microsoft Teams
keywords: teams scenarios proactive messaging conversation bot
ms.date: 03/29/2018
---
# Proactive messaging for bots

A proactive message is a message that is sent by a bot to start a conversation. You may want your bot to start a conversation for a number of reasons, including:

- Welcome messages for personal bot conversations
- Poll responses
- External event notifications

Sending a message to start a new conversation thread   is different than sending a message in response to an existing conversation: when your bot starts a new a conversation, there is no pre-existing conversation to post the message to.

## Starting a personal conversations

Bots can create new conversations with an individual Microsoft Teams user as long as your bot has user information obtained through previous addition in a personal or team scope. This information enables your bot to proactively notify them. For instance, if your bot was added to a team, it could query the team roster and send users individual messages in personal chats, or a user could @mention another user to trigger the bot to send that user a direct message.

You need the user’s *unique ID* and *tenant ID* to send a proactive message. Typically, these are   obtained from a team context, either by [fetching the team roster](~/concepts/bots/bots-context#fetching-the-team-roster) or when a user [interacts with your bot in a channel](~/concepts/bots/bot-conversations/bots-conv-channel). For bots that have already been added to the user's personal scope, you might have cached user information via the `conversationUpdate` event (see [Bot or user added to a team](~/concepts/bots/bots-notifications#team-member-or-bot-addition)).

You should use this capability sparingly and consider the user experience. Be sure not to spam end users and to send only the minimum amount of information and number of messages needed to complete your scenario.

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

bot.beginDialog(address, '/');
```

### Creating a channel conversation

Your team-added bot can post into a channel to create a reply chain. With the Bot Builder SDK, call [`CreateConversation`](https://docs.microsoft.com/en-us/bot-framework/dotnet/bot-builder-dotnet-connector#start-a-conversation) for .NET or use [proactive messages](https://docs.microsoft.com/en-us/bot-framework/nodejs/bot-builder-nodejs-proactive-messages) (`bot.send` and `bot.beginDialog`) in Node.js.

Alternatively, you can issue a POST request to the [`/conversations/{conversationId}/activities/`](https://docs.microsoft.com/en-us/bot-framework/rest-api/bot-framework-rest-connector-send-and-receive-messages#send-message) resource.

#### .NET example

```csharp
var channelData = new TeamsChannelData { Channel = new ChannelInfo(yourChannelId) };
IMessageActivity newMessage = Activity.CreateMessageActivity();
newMessage.Type = ActivityTypes.Message;
newMessage.Text = "Hello, on a new thread";
ConversationParameters conversationParams = new ConversationParameters(
    isGroup: true,
    bot: null,
    members: null,
    topicName: "Test Conversation",
    activity: (Activity)newMessage,
    channelData: channelData);
var result = await connector.Conversations.CreateConversationAsync(conversationParams);
```