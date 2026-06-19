---
title: Send a Personal Welcome Message
description: Learn how to retrieve the conversation chatId and send a 1:1 personal welcome message to a user after proactively installing your Teams bot.
ms.localizationpriority: medium
author: nickwalk
ms.topic: how-to
ms.owner: vishachadha
ms.date: 06/19/2026
---

# Send a personal welcome message

After [proactively installing your bot](graph-proactive-bots-and-messages.md) for a user using Microsoft Graph, you can send them a 1:1 personal welcome message. This involves retrieving the conversation `chatId` for the user and then sending the message using the Teams SDK.

## Retrieve the conversation `chatId`

When your app is installed for the user, the bot receives an **install** activity. Use the `OnInstall` handler (C#) or `install.add` event (Node.js/Python) in the [Teams SDK](/microsoftteams/platform/teams-sdk/essentials/sending-messages/proactive-messaging) to capture the `conversationId` needed to send the proactive message.

**Microsoft Graph page reference:** [Get chat](/graph/api/chat-get?view=graph-rest-v1.0&tabs=http&preserve-view=true)

1. You must have your app's `{teamsAppInstallationId}`. If you don't have it, use the following:

    **HTTP GET** request:

    ```http
    GET https://graph.microsoft.com/v1.0/users/{user-id}/teamwork/installedApps?$expand=teamsApp&$filter=teamsApp/id eq '{teamsAppId}'
    ```

    The **id** property of the response is the `teamsAppInstallationId`.

1. Make the following request to fetch the `chatId`:

    **HTTP GET** request (permission—`TeamsAppInstallation.ReadWriteSelfForUser.All`):  

    ```http
    GET https://graph.microsoft.com/v1.0/users/{user-id}/teamwork/installedApps/{teamsAppInstallationId}/chat
    ```

    The **id** property of the response is the `chatId`.

    You can also retrieve the `chatId` with the following request but it requires the broader `Chat.Read.All` permission:

    **HTTP GET** request (permission—`Chat.Read.All`):

    ```http
    GET https://graph.microsoft.com/v1.0/users/{user-id}/chats?$filter=installedApps/any(a:a/teamsApp/id eq '{teamsAppId}')
    ```

## Send proactive messages

Your bot can [send proactive messages](../../bots/how-to/conversations/send-proactive-messages.md) after the bot has been added for a user or a team, and has received all the user information.

## Code snippets

The following code provides an example of sending proactive messages:

# [C#](#tab/dotnet)

* [SDK reference](/microsoftteams/platform/teams-sdk/essentials/sending-messages/proactive-messaging?tabs=minimal&pivots=csharp)
* [Sample code reference](https://github.com/OfficeDev/Microsoft-Teams-Samples/blob/main/samples/graph-meeting-notification/csharp/MeetingNotification/Controllers/NotificationController.cs#L112)

```csharp
using Microsoft.Teams.Api; 
using Microsoft.Teams.Apps; 
// ...

// Store conversation IDs (e.g., during install event) 
var conversationStorage = new Dictionary<string, string>(); 
app.OnInstall(async context => 
{ 
    var userId = context.Activity.From.AadObjectId; 
    var conversationId = context.Activity.Conversation.Id; 
    conversationStorage[userId] = conversationId; 
    await context.Send("Hi! I will send you proactive notifications."); 
}); 

// Send proactive message from anywhere 
public static async Task SendProactiveNotification(string userId) 
{ 
    var conversationId = conversationStorage.GetValueOrDefault(userId); 
    if (conversationId is null) return; 
    await app.Send(conversationId, "Proactive hello."); 
} 
```

# [TypeScript](#tab/typescript)

* [SDK reference](/microsoftteams/platform/teams-sdk/essentials/sending-messages/proactive-messaging?tabs=minimal&pivots=typescript)
* [Sample code reference](https://github.com/OfficeDev/Microsoft-Teams-Samples/blob/main/samples/bot-initiate-thread-in-channel/nodejs/bots/teamsStartNewThreadInChannel.js#L20)

```typescript
import { MessageActivity } from '@microsoft/teams.api'; 
import { App } from '@microsoft/teams.apps';
// ...

// Store conversation IDs 
const conversationStorage = new Map<string, string>(); 

// Capture conversation ID when app is installed 
app.on('install.add', async ({ activity, send }) => { 
  conversationStorage.set(activity.from.aadObjectId!, activity.conversation.id); 
  await send('Hi! I will send you proactive notifications.'); 
}); 

// Send proactive message from anywhere 
const sendProactiveNotification = async (userId: string) => { 
  const conversationId = conversationStorage.get(userId); 
  if (!conversationId) return; 
  const activity = new MessageActivity('Proactive hello.'); 
  await app.send(conversationId, activity); 
};
```

# [Python](#tab/python)

* [SDK reference](/microsoftteams/platform/teams-sdk/essentials/sending-messages/proactive-messaging?tabs=minimal&pivots=python)

```python
from microsoft_teams.api import InstalledActivity, MessageActivityInput
from microsoft_teams.apps import ActivityContext
# ...

# Store conversation IDs 
conversation_storage: dict[str, str] = {} 

@app.on_install_add 
async def handle_install(ctx): 
    user_id = ctx.activity.from_.aad_object_id 
    conversation_storage[user_id] = ctx.activity.conversation.id 
    await ctx.send("Hi! I will send you proactive notifications.") 

# Send proactive message from anywhere 
async def send_proactive_notification(user_id: str): 
    conversation_id = conversation_storage.get(user_id, "") 
    if not conversation_id: 
        return 
    activity = MessageActivityInput(text="Proactive hello.") 
    await app.send(conversation_id, activity) 
```

---

## See also

* [Proactively install your bot for users using Microsoft Graph](graph-proactive-bots-and-messages.md)
* [Proactive messaging with Teams SDK](/microsoftteams/platform/teams-sdk/essentials/sending-messages/proactive-messaging)
* [Send proactive messages](../../bots/how-to/conversations/send-proactive-messages.md)
* [Manage app setup policies in Microsoft Teams](/microsoftteams/teams-app-setup-policies#create-a-custom-app-setup-policy)
* [Microsoft Teams service limits](/graph/throttling-limits#microsoft-teams-service-limits)
