---
title:  Proactive messaging for bots
description: In this module, learn how to use proactive messaging for bots and best practices for proactive messaging in Microsoft Teams
ms.topic: conceptual
ms.localizationpriority: medium
---
# Proactive messaging for bots

[!include[v3-to-v4-SDK-pointer](~/includes/v3-to-v4-pointer-bots.md)]

A proactive message is a message that is sent by a bot to start a conversation. You may want your bot to start a conversation for a number of reasons, including:

* Welcome messages for personal bot conversations.
* Poll responses.
* External event notifications.

Sending a message to start a new conversation thread is different than sending a message in response to an existing conversation. When your bot starts a new conversation, there's no pre-existing conversation to post the message to. To send a proactive message, you need to:

1. [Decide what you're going to say](#best-practices-for-proactive-messaging)
1. [Obtain the user's unique ID and tenant ID](#obtain-necessary-user-information)
1. [Send the message](#examples)

When creating proactive messages you **must** call `MicrosoftAppCredentials.TrustServiceUrl`, and pass in the service URL before creating the `ConnectorClient` used to send the message. If you don't, a `401: Unauthorized` response is received by your app. For more information, see [the samples below](#examples-for-creating-a-channel-conversation).

## Best practices for proactive messaging

Sending proactive messages is an effective way to communicate with your users. However, from the user's perspective, the message appears unprompted. If there's a welcome message, it will be the first time that they’ve interacted with your app. It's important to use this functionality and provide the complete information to the user to understand the purpose of this message.

Proactive messages generally fall into one of two categories, welcome messages or notifications.

### Welcome messages

When using proactive messaging to send a welcome message to a user, ensure that from the user's perspective, the message appears unprompted. If there's a welcome message, it will be the first time that they’ve interacted with your app. The best welcome messages will include:

* **Why they are receiving this message**: It should be clear to the user why they're receiving this message. If your bot was installed in a channel and you sent a welcome message to all users, let them know what channel it was installed in and potentially who installed it.
* **What do you offer**: What can they do with your app? What value can you bring to them?
* **What should they do next**: Invite them to try out a command, or interact with your app in some way.

### Notification messages

When using proactive messaging to send notifications you need to make sure your users have a clear path to take common actions based on your notification, and a clear understanding of why the notification occurred. Good notification messages will generally include:

* **What happened**: A clear indication of what happened to cause the notification.
* **What it happened to**: It should be clear what item/thing was updated to cause the notification.
* **Who did it**: Who took the action that caused the notification to be sent?
* **What they can do about it**: Make it easy for your users to take actions based on your notifications.
* **How they can opt out**: Provide a path for users to opt out of additional notifications.

## Obtain necessary user information

Bots can create new conversations with an individual Microsoft Teams user by obtaining the user's *unique ID* and *tenant ID.* You can obtain these values using one of the following methods:

* By [fetching the team roster](~/resources/bot-v3/bots-context.md#fetch-the-team-roster) from a channel your app is installed.
* By caching them when a user [interacts with your bot in a channel](~/resources/bot-v3/bot-conversations/bots-conv-channel.md).
* When a user is [@mentioned in a channel conversation](~/resources/bot-v3/bot-conversations/bots-conv-channel.md#-mentions) the bot is a part of.
* By caching them when you [receive the `conversationUpdate`](~/resources/bot-v3/bots-notifications.md#team-member-or-bot-addition) event when your app is installed in a personal scope, or new members are added to a channel or group chat that.

### Proactively install your app using Graph

> [!NOTE]
> Proactively installing apps using graph is currently in beta.

Occasionally it may be necessary to proactively message users that haven't installed or interacted with your app previously. For example, you want to use the [company communicator](~/samples/app-templates.md#company-communicator) to send messages to your entire organization. For this scenario, you can use the Graph API to proactively install your app for your users, then cache the necessary values from the `conversationUpdate` event your app will receive upon install.

You can only install apps that are in your organizational app catalogue, or the Teams app store.

See [Install apps for users](/graph/api/userteamwork-post-installedapps?view=graph-rest-1.0&tabs=http&preserve-view=true) in the Graph documentation for complete details. There's also a [sample in .NET](https://github.com/microsoftgraph/contoso-airlines-teams-sample/blob/283523d45f5ce416111dfc34b8e49728b5012739/project/Models/GraphService.cs#L176).

## Examples

Be sure that you authenticate and have a [bearer token](/azure/bot-service/rest-api/bot-framework-rest-connector-authentication#bot-to-connector) before creating a new conversation using the REST API.

```http
POST {Service URL of your bot}/v3/conversations
```

```json

{
  "bot": {
    "id": "c38eda0f-e780-49ae-86f0-afb644203cf8",
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

Provide `id` as your bot app ID and `name` as your bot name. You can get the `members` `id` from your bots `TurnContext` object such as `turnContext.Activity.From.Id`. Similarly, `id` of tenant, from your bots `TurnContext` object such as `turnContext.Activity.ChannelData.Tenant.Id`.

You must supply the user ID and the tenant ID. If the call succeeds, the API returns with the following response object.

```json
{
    "id":"a:1qhNLqpUtmuI6U35gzjsJn7uRnCkW8NiZALHfN8AMxdbprS1uta2aT-jytfIlsZR3UZeg3TsIONNInBHsdjzj3PtfHuhkxxvS1jZZ61UAbw8fIdXcNSJyTJm7YvHFOgxo"

}
```

This ID is the personal chat's unique conversation ID. Store this value and reuse it for future interactions with the user.

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

## Creating a channel conversation

Your team-added bot can post into a channel to create a new reply chain. If you're using the Node.js Teams SDK, use `startReplyChain()`, which gives you a fully populated address with the correct activity ID and conversation ID. If you're using C#, see the example below.

Alternatively, you can use the REST API and issue a POST request to [`/conversations`](/azure/bot-service/rest-api/bot-framework-rest-connector-send-and-receive-messages?#start-a-conversation) resource.

### Examples for creating a channel conversation

# [C#](#tab/csharp)

The .NET example is from [this sample](https://github.com/OfficeDev/Microsoft-Teams-Samples/blob/main/samples/app-complete-sample/csharp/src/dialogs/examples/teams/ProactiveMsgTo1to1Dialog.cs)

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

# [Node.js](#tab/nodejs)

```Javascript
export async function startReplyChain(chatConnector: builder.ChatConnector, message: builder.Message, channelId: string): Promise<builder.IChatConnectorAddress> {
    let activity = message.toMessage();

    // Build request
    let options: request.Options = {
        method: "POST",
        // We use urlJoin to concatenate urls. url.resolve should not be used here,
        // since it resolves urls as hrefs are resolved, which could result in losing
        // the last fragment of the serviceUrl
        url: urlJoin((activity.address as any).serviceUrl, "/v3/conversations"),
        body: {
            isGroup: true,
            activity: activity,
            channelData: {
                teamsChannelId: channelId,
            },
        },
        json: true,
    };

    let response = await sendRequestWithAccessToken(chatConnector, options);
    if (response && response.hasOwnProperty("id")) {
        let address = createAddressFromResponse(activity.address, response) as any;
        if (address.user) {
            delete address.user;
        }
        if (address.correlationId) {
            delete address.correlationId;
        }
        return address;
    } else {
        throw new Error("Failed to start reply chain: no conversation ID returned.");
    }
}
```
# [HTTP](#tab/http)

```http
POST {Service URL of your bot}/v3/conversations

```

```json

{
    "activity": {
        "type": "message",
        "text": "new conversation"
    },
    "bot": {
        "id": "{{botID}}",
        "name": "{{botName}}"
    },
    "channelData":{
      "teamsChannelId":"{{teamID}}",
      "teamsTeamId":"{{teamID}}",
      "channel":{"id":"{{teamID}}"},
      "team":{"id":"{{teamID}}"},
      "tenant":{"id": "{{tenantID}}"}
    },
    "isGroup": true,
    "tenantId": "{{tenantID}}"
}
```

You can get the `{Service URL of your bot}` from `TurnContext` object like `turnContext.Activity.ServiceURL` parameter.

You can get the `channelData` from `TurnContext` object  like `turnContext.Activity.TeamsChannelData` parameter.

Provide `id` as your bot app ID and `name` as your bot name. Similarly, `id` of tenant, from your bots `TurnContext` object such as `turnContext.Activity.ChannelData.Tenant.Id`.

Similarly, you can provide the `teamID` for `teamsChannelId`, `teamsTeamId`, `channel`, `team` in `channelData` section which sends the message to general channel of team.

If the call succeeds, the API returns with the following response object:

```json
{
    "id": "{{conversationID}}",
    "activityId": "{{activityID}}"
}
```

---

## See also

[Bot Framework samples](https://github.com/OfficeDev/Microsoft-Teams-Samples/blob/main/README.md).
