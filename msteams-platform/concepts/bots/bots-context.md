---
title: Get context for your bot
description: Describes how to get context for bots in Microsoft Teams
keywords: teams bots context
ms.date: 02/27/2018
---
# Get context for your Microsoft Teams bot

Your bot can access additional context about the team or chat, such as user profile. This information can be used to enrich your bot's functionality and provide a more personalized experience.

> [!NOTE]
> These Microsoft Teams&ndash;specific bot APIs are best accessed through our extensions for the Bot Builder SDK. For C#/.NET, download our [Microsoft.Bot.Connector.Teams](https://www.nuget.org/packages/Microsoft.Bot.Connector.Teams) NuGet package. For Node.js development, you can install the [botbuilder-teams](https://www.npmjs.com/package/botbuilder-teams) npm package. Both SDKs target the Bot Builder v 3.x.

## Fetching the team roster

>**New:** You no longer need to include the tenant ID in the `X-MsTeamsTenantId` HTTP request header.

Your bot can query for the list of team members and their basic profiles, which includes Teams user IDs and Azure Active Directory  (Azure AD) information such as name and objectId. You can use this information to correlate user identities; for example, to check whether a user logged into a tab through Azure AD credentials is a member of the team.

#### REST API example

You can directly issue a GET request on [`/conversations/{teamId}/members/`](https://docs.microsoft.com/en-us/bot-framework/rest-api/bot-framework-rest-connector-api-reference#get-conversation-members), using the value of `serviceUrl` as the endpoint.

Currently, the only source for `teamId` is a message from the team context&mdash;either a message from a user or the message that your bot receives when it is added to a team (see [Bot or user added to a team](~/concepts/bots/bots-notifications#bot-or-user-added-to-a-team)).

> [!NOTE]
> Be aware that the value of `serviceUrl` tends to be stable but can change. When a new message arrives, your bot should verify its stored value of `serviceUrl`.

```json
GET /v3/conversations/19:ja0cu120i1jod12j@skype.net/members

Response body
[{
    "id": "29:1GcS4EyB_oSI8A88XmWBN7NJFyMqe3QGnJdgLfFGkJnVelzRGos0bPbpsfJjcbAD22bmKc4GMbrY2g4JDrrA8vM06X1-cHHle4zOE6U4ttcc",
    "objectId": "9d3e08f9-a7ae-43aa-a4d3-de3f319a8a9c",
    "givenName": "Larry",
    "surname": "Brown",
    "email": "Larry.Brown@fabrikam.com",
    "userPrincipalName": "labrown@fabrikam.com"
}, {
    "id": "29:1bSnHZ7Js2STWrgk6ScEErLk1Lp2zQuD5H2qQ960rtvstKp8tKLl-3r8b6DoW0QxZimuTxk_kupZ1DBMpvIQQUAZL-PNj0EORDvRZXy8kvWk",
    "objectId": "76b0b09f-d410-48fd-993e-84da521a597b",
    "givenName": "John",
    "surname": "Patterson",
    "email": "johnp@fabrikam.com",
    "userPrincipalName": "johnp@fabrikam.com"
}, {
    "id": "29:1URzNQM1x1PNMr1D7L5_lFe6qF6gEfAbkdG8_BUxOW2mTKryQqEZtBTqDt10-MghkzjYDuUj4KG6nvg5lFAyjOLiGJ4jzhb99WrnI7XKriCs",
    "objectId": "6b7b3b2a-2c4b-4175-8582-41c9e685c1b5",
    "givenName": "Rick",
    "surname": "Stevens",
    "email": "Rick.Stevens@fabrikam.com",
    "userPrincipalName": "rstevens@fabrikam.com"
}]
```

#### .NET example

Call `GetTeamsConversationMembersAsync` using `Conversation.Id` to return a list of user IDs.

```csharp
// Fetch the members in the current conversation
var connector = new ConnectorClient(new Uri(context.Activity.ServiceUrl));
var members = await connector.Conversations.GetTeamsConversationMembersAsync(context.Activity.Conversation.Id);

// Concatenate information about all members into a string
var sb = new StringBuilder();
foreach (var member in members)
{
    sb.AppendFormat(
        "GivenName = {0}, TeamsMemberId = {1}",
        member.Name, member.Id);

    sb.AppendLine();
}

// Post the member info back into the conversation
await context.PostAsync($"People in this conversation: {sb.ToString()}");
```

> [!NOTE]
> The `GetTeamsConversationMembersAsync(teamId, tenantId)` override is now obsolete. If your code uses this override, update it to use `IConversations.GetConversationMembersAsync(conversationId)` and use `AsTeamsChannelAccount` to get the extended properties, for example:
>```csharp
>var members = await connector.Conversations.GetConversationMembersAsync(message.Conversation.Id);
>foreach (var member in members.AsTeamsChannelAccounts())
>{
>  [...]
>}
>```

#### Node.js/TypeScript example

The following example uses the [Microsoft Teams extensions for the Bot Builder SDK for Node.js](https://www.npmjs.com/package/botbuilder-teams).

```typescript

[...]
import * as builder from "botbuilder";
[...]

var conversationId = session.message.address.conversation.id;
  connector.fetchMembers(
    (<builder.IChatConnectorAddress>session.message.address).serviceUrl,
    conversationId,
    (err, result) => {
      if (err) {
        session.endDialog('There is some error');
      }
      else {
        session.endDialog('%s', JSON.stringify(result));
      }
    }
);
```

## Fetching user profile in personal chat

You can also make the same API call for any personal chat to obtain the profile information of the user chatting with your bot.

The API call and SDK methods are identical to fetching the team roster, as is the response object. The only difference is that you pass the personal `conversationId` instead of the `teamId`.

## Fetching the list of channels in a team

Your bot can query the list of channels in a team.

> [!NOTE]
>* Currently, the name of the default General channel is returned as `null` to allow for localization.
>* The channel ID for the General channel always matches the team ID.

#### REST API example

You can directly issue a GET request on `/teams/{teamId}/conversations/`, using the value of `serviceUrl` as the endpoint.

Currently, the only source for `teamId` is a message from the team context&mdash;either a message from a user or the message that your bot receives when it is added to a team (see [Bot or user added to a team](~/concepts/bots/bots-notifications#bot-or-user-added-to-a-team)).

> [!NOTE]
> Be aware that the value of `serviceUrl` tends to be stable but can change. When a new message arrives, your bot should verify its stored value of `serviceUrl`.

```json
GET /v3/teams/19%3A033451497ea84fcc83d17ed7fb08a1b6%40thread.skype/conversations

Response body
{
    "conversations": [{
        "id": "19:033451497ea84fcc83d17ed7fb08a1b6@thread.skype",
        "name": null
    }, {
        "id": "19:cc25e4aae50746ecbb11473bba24c70a@thread.skype",
        "name": "Materials"
    }, {
        "id": "19:b7b84cba410c406ba671dbbf5e0a3519@thread.skype",
        "name": "Design"
    }, {
        "id": "19:fc5db2aed489454e8f8c06829ed6c986@thread.skype",
        "name": "Marketing"
    }]
}
```

#### .NET example

The following example uses the `FetchChannelList` call from the [Microsoft Teams extensions for the Bot Builder SDK for .NET](https://www.nuget.org/packages/Microsoft.Bot.Connector.Teams):

```csharp
ConversationList channels = client.GetTeamsConnectorClient().Teams.FetchChannelList(activity.GetChannelData<TeamsChannelData>().Team.Id);
```

#### Node.js example

The following example uses `fetchChannelList` call from the [Microsoft Teams extensions for the Bot Builder SDK for Node.js](https://www.npmjs.com/package/botbuilder-teams).

```javascript
var teamId = session.message.sourceEvent.team.id;
  connector.fetchChannelList(
    (session.message.address).serviceUrl,
    teamId,
    (err, result) => {
      if (err) {
        session.endDialog('There is an error');
      }
      else {
        session.endDialog('%s', JSON.stringify(result));
      }
    }
);
```
