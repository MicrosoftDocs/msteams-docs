---
title: Send proactive messages
description: Learn how to send proactive messages with your Teams bot using the Teams SDK (Teams AI Library)
ms.topic: article
ms.owner: nickwalk
ms.author: nickwalk
ms.localizationpriority: high
ms.date: 06/30/2026
---
# Proactive messages

A proactive message is any message sent by a bot that isn't in response to a request from a user. This message can include content, such as:

* Welcome messages
* Notifications
* Scheduled messages

To send a proactive message to a user, a group chat, or a team, your bot must have the requisite access to send the message. For a group chat or team, the app that contains your bot must be first installed in that location.

You can [proactively install your app using Microsoft Graph](#proactively-install-your-app-using-graph) in a team, if necessary, or use a [custom app policy](/microsoftteams/teams-custom-app-policies-and-settings) to install an app in your teams and for organization's users. For certain scenarios, you must proactively install your app using Graph. For a user to receive proactive messages, install the app for the user or make the user a part of a team in which the app is installed.

Sending a proactive message is different from sending a regular message. Proactive messages are sent via app.Send() outside an activity handler. The SDK creates the conversation automatically when you call app.Send(). You need a `conversationId`, the SDK resolves the service URL automatically. For example, a new one-on-one chat or a new conversation thread in a channel. You can't create a new group chat or a new channel in a team with proactive messaging.

To send a proactive message, follow these steps:

1. [Get the Microsoft Entra user ID, user ID, team ID, or channel ID](#get-the-user-aad-id-user-id-team-id-or-channel-id), if necessary.
1. [Create the conversation](#create-the-conversation), if necessary.
1. [Get the conversation ID](#get-the-conversation-id).
1. [Send the message](#send-the-message).

The code snippets in the [samples](#samples) section are to create a one-on-one conversation. For links to samples for both one-on-one conversations and group or channels messages, see [code samples](#code-samples). To use proactive messages effectively, see [best practices for proactive messaging](#best-practices-for-proactive-messaging).

<a name='get-the-user-aad-id-user-id-team-id-or-channel-id'></a>

## Get the Microsoft Entra user ID, user ID, team ID, or channel ID

You can create a new conversation with a user or a conversation thread in a channel and you must have the correct ID. You can receive or retrieve this ID using any of the following ways:

* When your app is installed in a particular context, you receive an [`onMembersAdded` activity](~/bots/how-to/conversations/subscribe-to-conversation-events.md).
* When a new user is added to a context where your app is installed, you receive an `onMembersAdded` activity.
* Every event that the bot receives contains the required information, which you can get from the bot context (activity context).
* You can retrieve the [list of channels](~/bots/how-to/get-teams-context.md) in a team where your app is installed.
* You can retrieve the [list of members](~/bots/how-to/get-teams-context.md) of a team where your app is installed.

Regardless of how you get the information, store the `tenantId` and then store either the `userId`, or `channelId` to create a new conversation. You can also use the `teamId` to create a new conversation thread in the general or default channel of a team. Ensure that the bot is installed in the team before you can send a proactive message to a channel.

* The `aadObjectId` is unique to the user and can be retrieved using the [graph API](/graph/api/user-list) to create a new conversation in personal chat. Ensure that the bot is installed in the personal scope before you can send a proactive message. If the bot isn't installed in a personal scope when sending a proactive message using the `aadObjectId`, the bot returns a `403` error with `ForbiddenOperationException` message.

* The `userId` is unique to your bot ID and a particular user. You can't reuse the `userId` between bots.

* The `channelId` is global.

Create the conversation, after you have the user or channel information.

> [!NOTE]
> Sending proactive messages using `aadObjectId` is supported only in personal scope.

## Create the conversation

> [!NOTE]
> If your bot has `supportsSessions: true` in the manifest and is installed for the user, calling the create conversation API creates a new session instead of a regular 1:1 conversation. The returned conversation ID is session-specific. For more information, see [Structure conversations with sessions](agent-sessions.md).

You can create the conversation if it doesn't exist or if you don't know the `conversationId`. Create the conversation only once, and store the resulting `conversationId` for future proactive messages.

To create the conversation, you need a `aadObjectId` or `userId`, `tenantId`, and `serviceUrl`.

>[!NOTE]
> To create the conversation, pass the `aadObjetId` value in the `Id` parameter.

For `serviceUrl`, use the value from an incoming activity triggering the flow or one of the global service URLs. If the `serviceUrl` isn't available from an incoming activity triggering the proactive scenario, use the following global URL endpoints:

* Public: `https://smba.trafficmanager.net/teams/`
* GCC: `https://smba.infra.gcc.teams.microsoft.com/teams`
* GCC High: `https://smba.infra.gov.teams.microsoft.us/teams`
* DoD: `https://smba.infra.dod.teams.microsoft.us/teams`

> [!WARNING]
>
> * These URLs are for proactive messages only. Avoid hardcoding them. Instead, use `serviceUrl` from the incoming activity or conversation reference. If it's unavailable, use global URLs based on region and cloud.
>
> * For any reply to messages, use `serviceURL` from the incoming request. For more information, see [Activity.ServiceUrl](/dotnet/api/microsoft.bot.schema.activity.serviceurl?view=botbuilder-dotnet-stable&preserve-view=true) property.

You can get the conversation when the app is installed for the first time. After the conversation is created, [get the conversation ID](#get-the-conversation-id). The `conversationId` is available in the conversation update events.

The conversation ID is unique for each bot within a specific channel, even in a multitenant environment. This ID ensures that the bot's messages are directed to the appropriate channel and doesn't interrupt with other bots or channels within the same or across different organizations.

If you don't have the `conversationId`, you can [proactively install your app using Graph](#proactively-install-your-app-using-graph) to get the `conversationId`.

## Get the conversation ID

Use either the `conversationReference` object or `conversationId` and `tenantId` to send the message. You can get this ID by either creating the conversation or storing it from any activity sent to you from that context. Store this ID for reference.

After you get the appropriate address information, you can send your message.

## Send the message

Now that you have the right address information, you can send your message. If you're using the SDK, you must use the `app.Send()` method, and the `conversationId` to make a direct API call. To send your message, set the `conversationParameters`. See the [samples](#samples) section or use one of the samples listed in the [code samples](#code-samples) section.

To proactively send a message as a reply to a thread in a channel, use `app.Reply()` with both the conversation ID and the ID of the thread's root message.

> [!NOTE]
> Teams doesn't support sending proactive messages using email or User Principal Name (UPN).

Now that you've sent the proactive message, you must follow these best practices while sending proactive messages for better information exchange between users and the bot.

### Understand who blocked, muted, or uninstalled a bot

As a developer, you can create a report to understand which users in your organization have blocked, muted, or uninstalled a bot. This information might help your organization's admins to broadcast org-wide messages or drive app usage.

Using Teams, you can send a proactive message to the bot to verify if a user has blocked or uninstalled a bot. If the bot is blocked or uninstalled, Teams returns a `403` response code with a `subCode: MessageWritesBlocked`. This response indicates that the message sent by the bot isn't delivered to the user.

The response code is sent on a per-user basis and includes the identity of the user. You can compile the response codes for each user alongside their identity to create a report of all users who have blocked the bot.

The following code sample is an example of a 403 response code:

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

{"errorCode":209,"message":"{\n  \"subCode\": \"MessageWritesBlocked\",\n  \"details\": \"Thread is blocked from message writes.\",\n  \"errorCode\": null,\n  \"errorSubCode\": null\n}"}
```

## Best practices for proactive messaging

Sending proactive messages to the users is an effective way to communicate with your users. However, from the user's perspective, the message appears unprompted. If there's a welcome message, it marks their first interaction with your app. It's important to use this functionality and provide the complete information to the user to understand the purpose of this message.

### Welcome messages

When proactive messaging is used to send a welcome message to a user, there's no context for why the user receives the message. Also, this is the first interaction of the user with your app. It's an opportunity to create a good first impression. A good user experience ensures better adoption of the app. Poor welcome messages can lead the users to block your app. Write a clear welcome message and iterate on the welcome message if it isn't having the desired effect.

A good welcome message can include the following information:

* Reason for the message - It must be clear to the user why they're receiving the message. If your bot was installed in a channel and you sent a welcome message to all users, then let them know what channel it was installed in and who installed it.

* Your offer - Users must be able to identify what they can do with your app and what value can you bring to them.

* Next steps - Users should understand the next steps. For example, invite users to try out a command or interact with your app.

### Notification messages

To send notifications using proactive messaging, ensure your users have a clear path to take common actions based on your notification. If user actions are required in a tab app, use activity feed notifications instead of a bot. Ensure users have a clear understanding of why they've received a notification. Good notification messages include the following items:

* What happened? A clear indication of what happened to cause the notification.

* What was the result? It must be clear, what item is updated to get the notification.

* Who or what triggered it? Who or what took action which caused the notification to be sent.

* What can users do in response? Make it easy for your users to take actions based on your notifications.

* How can users opt-out? You must provide a path for users to opt-out of more notifications.

To send messages to a large group of users, for example to your organization, proactively install your app using Graph.

To update or delete a proactive message sent by a notification only bot:

1. Keep track of the sent messages by storing their message IDs or conversation references when sending the proactive message.

1. Use `context.Api.Conversations.Activities.UpdateAsync(conversationId, activityId, updatedActivity)` or `context.Api.Conversations.Activities.DeleteAsync(conversationId, activityId)` methods to update or delete the original message.

### Scheduled messages

When using proactive messaging to send scheduled messages to users, verify that your time zone is updated to their time zone. This ensures that the messages are delivered to the users at the relevant time. Schedule messages include:

* Why is the user receiving the message? Make it easy for your users to understand the reason for which they're receiving the message.

* What can user do next? Users can take the required action based on the message content.

## Proactively install your app using Graph

You can use the Graph API to proactively install your app for your users. Cache the necessary values from the `conversationUpdate` event your app receives upon installation.

You can only install apps that are in your organizational app catalog or the Microsoft Teams Store.

See [install apps for users](/graph/api/userteamwork-post-installedapps) in the Graph documentation and [proactive bot installation and messaging in Teams with Graph](../../../graph-api/proactive-bots-and-messages/graph-proactive-bots-and-messages.md).

### Examples

Ensure that you authenticate and have a [bearer token](/azure/bot-service/rest-api/bot-framework-rest-connector-authentication?view=azure-bot-service-4.0&preserve-view=true&tabs=multitenant) before creating a new conversation using the REST API. The following are REST API to create a conversation in different contexts:

* [REST API to create a conversation in a one-on-one chat](../../../resources/bot-v3/bot-conversations/bots-conv-proactive.md#examples).
* [REST API to create a conversation in a channel](../../../resources/bot-v3/bot-conversations/bots-conv-proactive.md#examples-for-creating-a-channel-conversation).
* REST API to Update message in conversation: To update an existing activity within a conversation, include the conversationId and activityId in the request endpoint. To complete this scenario, you must cache the activity ID returned by the original post call.

    ```http
    PUT {Service URL of your bot}/v3/conversations/{conversationId}/activities/{activityId}
    ```

    ```json
    
    {
        "type": "message",
        "text": "This message has been updated"
    }
    ```

    To update an existing activity within a conversation, include the `conversationId` and `activityId` in the request endpoint. To complete this scenario, you must cache the `activity ID` returned by the original post call.
    If the call succeeds, the API returns with the following response object.

    ```json
    {
        "id": "{{activityID}}"
    }
    ```

## Samples

The following code shows how to send proactive messages using the Teams SDK (Teams AI Library):

# [C#](#tab/dotnet)

```csharp
// Save the conversation ID and schedule a proactive reminder on install
teams.OnInstall(async (context, cancellationToken) =>
{
    context.Storage.Set(context.Activity.From.AadObjectId!, context.Activity.Conversation.Id);
    await context.Send("Hi! I am going to remind you to say something to me soon!", cancellationToken);
    notificationQueue.AddReminder(context.Activity.From.AadObjectId!, Notifications.SendProactive, 10_000);
});
 
// Send proactive message using stored conversation ID
public static class Notifications
{
    public static async Task SendProactive(string userId)
    {
        var conversationId = (string?)storage.Get(userId);
        if (conversationId is null) return;
        await app.Send(conversationId, "Hey! It's been a while. How are you?");
    }
}

```

# [TypeScript](#tab/typescript)

```typescript

// This would be some persistent storage
const myConversationIdStorage = new Map<string, string>();
 
// Save the conversation ID on app install
app.on('install.add', async ({ activity, send }) => {
  myConversationIdStorage.set(activity.from.aadObjectId!, activity.conversation.id);
  await send('Hi! I am going to remind you to say something to me soon!');
  notificationQueue.addReminder(activity.from.aadObjectId!, sendProactiveNotification, 10_000);
});
 
// Send proactive message using stored conversation ID
const sendProactiveNotification = async (userId: string) => {
  const conversationId = myConversationIdStorage.get(userId);
  if (!conversationId) {
    return;
  }
  const activity = new MessageActivity('Hey! It\'s been a while. How are you?');
  await app.send(conversationId, activity);
};
```

# [Python](#tab/python)

```python
# This would be some persistent storage
storage = dict[str, str]()

# Save the conversation_id when the app is installed
@app.on_install_add
async def handle_install_add(ctx: ActivityContext[InstalledActivity]):
    storage[ctx.activity.from_.aad_object_id] = ctx.activity.conversation.id
    await ctx.send("Hi! I am going to remind you to say something to me soon!")
    notification_queue.add_reminder(ctx.activity.from_.aad_object_id, send_proactive_notification, 60000)

# Send proactive message using stored conversation ID
async def send_proactive_notification(user_id: str):
    conversation_id = storage.get(user_id, "")
    if not conversation_id:
        return
    activity = MessageActivityInput(text="Hey! It's been a while. How are you?")
    await app.send(conversation_id, activity)

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

## Code samples

The following table provides code samples that incorporate basic conversation flow and proactive messaging into a Teams application using the Teams SDK:

| **Sample Name** | **Description** | **.NET** | **Node.js** | **Python** | **Manifest**
|---------------|--------------|--------|-------------|--------|--------|
| Teams Conversation Basics  | This sample app shows how to use different bot conversation events available in Teams SDK v2 for personal and teams scope.| [View](https://github.com/OfficeDev/Microsoft-Teams-Samples/tree/main/samples/TeamsSDK/bot-quickstart/dotnet/bot-quickstart) | [View](https://github.com/OfficeDev/Microsoft-Teams-Samples/tree/main/samples/TeamsSDK/bot-quickstart/nodejs/bot-quickstart) | [View](https://github.com/OfficeDev/Microsoft-Teams-Samples/tree/main/samples/TeamsSDK/bot-quickstart/python/bot-quickstart) | [View](https://github.com/OfficeDev/Microsoft-Teams-Samples/blob/main/samples/bot-conversation/csharp/demo-manifest/bot-conversation.zip) |

## Next steps

> [!div class="nextstepaction"]
> [Format your bot messages](~/bots/how-to/format-your-bot-messages.md)

## See also

* [Channel and group chat conversations with a bot](~/bots/how-to/conversations/channel-and-group-conversations.md)
* [Structure conversations with sessions](agent-sessions.md)
