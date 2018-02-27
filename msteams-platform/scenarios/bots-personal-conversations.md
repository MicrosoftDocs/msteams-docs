---
title: 1-on-1 conversations with bots
description: Describes the end-to-end scenario of having a 1-on-1 conversation with a bot in Microsoft Teams
keywords: teams scenarios 1on1 1to1 conversation bot
---

# Interact one-on-one (1:1) with a Microsoft Teams bot

Microsoft Teams allows users to engage in direct conversations with bots built on the [Microsoft Bot Framework](https://docs.botframework.com/en-us/). Users can find bots in the Discover Apps gallery and add them to their Teams experience for 1:1 conversations. Team owners and users with the appropriate permissions can also add bots as full team members (see [Interact in a team channel](~/scenarios/bots-channel-conversations)), which not only makes them available in that team's channels, but for 1:1 chat for all of those users as well.

## Designing a great personal (1:1) bot

A great bot in Microsoft Teams helps users get the information they need, all within the context of the Teams experience. One-on-one conversations with a bot are private exchanges between a bot and its user; they're a great way to provide information specific and relevant to that user in the personal context. Whereas a bot in a channel might provide information specific to a team or channel, a bot in 1:1 is really a dialog between your service and the individual.

Depending on the experience you want to create, the bot might be entirely relevant in both scopes (personal and team)&mdash;and, in fact, no significant extra work is required to enable your bot to work in both. In Microsoft Teams, there is no expectation that your bot function in all contexts, but you should ensure that your bot makes sense, _and_ provides user value, in whichever scope you choose to support.

## Starting a 1:1 conversation

Bots can create new conversations with an individual Microsoft Teams user, as long as your bot has user information obtained through previous addition in a personal or team scope. This information enables your bot to proactively notify them. For instance, if your bot was added to a team, it could query the team roster and send users individual messages in private 1:1 chats, or a user could @mention another user to trigger the bot to send that user a direct message.

You can create the 1:1 chat with a user as long as you have the user’s unique ID and tenant ID. Typically, this information is obtained from a team context, either by [fetching the team roster](~/concepts/bots/bots-context#fetching-the-team-roster) or when a user [interacts with your bot in a channel](~/scenarios/bots-channel-conversations). For bots already added to the user's personal scope, you might already have cached user information via the `conversationUpdate` event (see [Bot or user added to a team](~/concepts/bots/bots-notifications#team-member-or-bot-addition)).

Because your bot is able to proactively message users, you should use this capability sparingly and consider the user experience. Be sure not to spam end users and to send only the minimum amount of information and number of messages needed to complete your scenario.

#### API request

> [!NOTE]
> Be sure that you authenticate and have a bearer token before creating a new conversation using the REST API.

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

This ID is the 1:1 chat's unique conversation ID. Please store this value and reuse it for future interactions with the user.

#### .NET example

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
await client.Conversations.SendToConversationAsync(newActivity);
```

#### Node.js example

This example uses the [botbuilder-teams](https://www.npmjs.com/package/botbuilder-teams) npm package.

```js
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

## Best practice: Welcome messages in 1:1 conversations

For bots that are added directly by a user, and not already part of any of the user's teams, it is a best practice to send a welcome message to the General channel to introduce the bot to all users of the team and tell a bit about its functionality. To do this, ensure that your bot responds to the `conversationUpdate` message, with the `teamsAddMembers` eventType in the `channelData` object.

Your bot should proactively send a welcome message to a 1:1 chat the first time (and only the first time) a user initiates a 1:1 chat with your bot. (This recommendation does not apply to first-time contacts in a channel.)

>For more best practices, see our [design guidelines](~/resources/design/overview).
