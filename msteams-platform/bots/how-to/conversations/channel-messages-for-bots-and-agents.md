---
title: Get All Channel and Chat Messages
description: Enable agents to receive all conversation messages without being @mentioned using RSC permissions. Read on webApplicationInfo or authorization section in manifest.
ms.topic: article
ms.localizationpriority: medium
ms.date: 09/24/2026
zone_pivot_groups: teams-sdk-languages
---

# Enable agents to receive all chat messages

By default, agents receive channel and chat messages only when they're @mentioned. To receive all channel or chat messages without an @mention, add the appropriate Resource-specific consent (RSC) permission to your app:

* `ChannelMessage.Read.Group`: Receive all messages in the channels of the team where the app is installed.
* `ChatMessage.Read.Chat`: Receive all messages in the group chat where the app is installed.

A conversation owner can consent to this access when the app is installed or upgraded. For more information, see [RSC permissions](../../../graph-api/rsc/resource-specific-consent.md).

> [!NOTE]
> This capability is supported in Microsoft Teams commercial environments, [Government Community Cloud (GCC), GCC High, Department of Defense (DoD)](../../../concepts/cloud-overview.md#teams-app-capabilities), and [Teams operated by 21Vianet](../../../concepts/sovereign-cloud.md) environments.

## Update app manifest

For your agent to receive all conversation messages, specify the relevant RSC permission strings in the `authorization.permissions.resourceSpecific` property of your app manifest. For mor  e information, see [app manifest schema](/microsoft-365/extensibility/schema/root-authorization-permissions).

The following code snippet provides an example of how you can declare RSC permissions in the app manifest:

```json
{
"webApplicationInfo": {
  "id": "<MICROSOFT-ENTRA-APP-ID>",
  "resource": "https://RscBasedStoreApp"
},
"authorization": {
  "permissions": {
    "resourceSpecific": [
      {
        "name": "ChannelMessage.Read.Group",
        "type": "Application"
      },
      {
        "name": "ChatMessage.Read.Chat",
        "type": "Application"
        }
    ]
  }
}
```

In this code example:

* **webApplicationInfo.id**: Your Microsoft Entra app ID. The app ID can be the same as your bot ID.
* **webApplicationInfo.resource**: Any string. The resource field has no operation in RSC. However, it must be added with a value to avoid error response.
* **authorization.permissions.resourceSpecific**: RSC permissions for your app with either or both `ChannelMessage.Read.Group` and `ChatMessage.Read.Chat` specified. For more information, see [resource-specific permissions](../../../graph-api/rsc/resource-specific-consent.md#supported-rsc-permissions).

### Update permissions in Developer Portal

To configure the RSC permissions without editing the manifest directly:

1. Sign in to [Developer Portal for Teams](https://dev.teams.microsoft.com/).
1. Select **Apps**, and then select your app.
1. If your app isn't listed, select **Import app** and import its app package.
1. Under **Configure**, select **Permissions**.
1. Under **Team permissions**, add `ChannelMessage.Read.Group` to receive channel messages.
1. Under **Chat/Meeting permissions**, add `ChatMessage.Read.Chat` to receive group chat messages.
1. Select **Save**.
1. Download the updated app package.

After you update the permissions, install or upgrade the app in the target team or group chat. The team or chat owner grants the requested RSC permissions during installation.

## Filter at mention messages

You can enable the developer to filter agent messages and process only the messages that @mention the agents or the agent. This can be useful for several reasons:

* **Ensure contextual relevance**: Messages that are directed to the agent are likely to have higher relevance for the users of the agent. It helps the app to respond accurately and to engage in meaningful responses.
* **Better agent performance**: Filtering messages can reduce the need for unnecessary processing for the agent. Processing contextually irrelevant messages can be avoided to improve the agent performance. It can also keep the agent or the user from responding to irrelevant messages or triggering unnecessary actions.
* **Enhance user experience**: Users are more likely to engage with the agent if it responds only when it's addressed. The developer can create a seamless and intuitive user experience.
* **Efficient message handling**: Filtering relevant message enables the agent to handle larger volume of conversations and make it more useful and relatable.

Here's an example of using RSC permissions to filter @mention messages:

```csharp
// When ChannelMessage.Read.Group or ChatMessage.Read.Chat RSC is in the app manifest, this method is called even when agent is not @mentioned.
// This code snippet allows the agent to ignore all messages that do not @mention the agent.
teams.OnMessage(async (context, cancellationToken) =>
{
// Ignore the message if agent was not mentioned.
// Remove this if block to process all messages received by the agent.
if (!context.Activity.GetMentions().Any(mention => mention.Mentioned.Id.Equals(context.Activity.Recipient.Id, StringComparison.OrdinalIgnoreCase)))
{
return;
}

// Sends an activity to the sender of the incoming activity.
await context.SendAsync(
    "Using RSC the agent can receive messages across channels or chats in team without being @mentioned.",
    cancellationToken);
});
```

Developers can create more efficient and user-friendly conversational interfaces in the agents.

### Use Graph REST APIs to access all messages

Services that need access to all Teams message data must use the Graph REST APIs to access archived data in channels and chats. The agent must use the `ChannelMessage.Read.Group` and `ChatMessage.Read.Chat` RSC permissions appropriately to build and enhance engaging experience for users.

For more information about updating RSC permissions in app description, see [Update app description for bots or agents](#update-app-description-for-agents).

## Update app description for agents

To pass the Microsoft Teams Store approval, the app description must include how the agent app uses the data it reads:

* The `ChannelMessage.Read.Group` and `ChatMessage.Read.Chat` need not be used by agents to extract large amounts of customer data.
* The ability for agents to receive all messages in chats using `ChatMessage.Read.Chat` is only enabled after a re-installation or new installation into a chat:

  * If you have an app that's using the `ChatMessage.Read.Chat` for Graph scenarios, then test the app and modify the app before the feature is [generally available](https://www.microsoft.com/microsoft-365/roadmap?filters=&searchterms=receive%2Call%2Cgroup%2Cchat%2Cmessages).
  * If you don't want your app to receive all chat messages, use the [code snippet](#filter-at-mention-messages) for filtering the @mention messages only.
  * If no action is taken, your agent receives all the messages after the new installation.

* Note that `ChatMessage.Read.Chat` allows the app to read chat messages, without a signed-in user. For more information, see [RSC permissions](/graph/permissions-reference).
* The app reads only the information that's necessary for its core functions.
* The app uses data relevant to the specific business needs that it addresses to increase productivity and collaboration.

For more information, see [app descriptions](../../../concepts/deploy-and-publish/appsource/prepare/teams-store-validation-guidelines.md#app-descriptions).

## Code snippets

The following code provides an example of the RSC permissions:

::: zone pivot="teams-sdk-csharp"

```csharp

// Handle when a message is addressed to the agent.
// When rsc is enabled the method will be called even when agent is addressed without being @mentioned.
teams.OnMessage(async (context, cancellationToken) =>
{
await context.SendAsync(
"Using RSC, the agent can receive messages across channels or chats in a team without being @mentioned.",
cancellationToken); 
});

```

::: zone-end

::: zone pivot="teams-sdk-typescript"

```typescript
import { App } from '@microsoft/teams.apps';

const app = new App();

// Handle when a message is addressed to the agent.
// When RSC is enabled this runs even when the agent is addressed without being @mentioned.
app.on('message', async ({ send }) => {
  await send('Using RSC the agent can receive messages across channels or chats in team without being @mentioned.');
});

app.start().catch(console.error);

```

::: zone-end

::: zone pivot="teams-sdk-python"

```python

from microsoft_teams.api.activities import ConversationUpdateActivity
from microsoft_teams.apps import ActivityContext


# Event handler for when new members are added to a team
@app.on_conversation_update
async def on_members_added(ctx: ActivityContext[ConversationUpdateActivity]) -> None:
    # Welcome message for new members
    welcome_text = "Hello and welcome! With this sample, your agent can receive user messages across standard channels in a team without being @mentioned."

    for member in ctx.activity.members_added or []:
        # Ensure the agent does not send a welcome message to itself
        if member.id != ctx.activity.recipient.id:
            await ctx.send(welcome_text)

```

::: zone-end

## Code sample

| Sample name | Description | .NET | Node.js | Python | App manifest |
| --- | --- | --- | --- | --- |
|Channel messages with RSC permissions| This sample app shows how an agent can receive all channel messages with RSC without being @mentioned.|[View](https://github.com/OfficeDev/Microsoft-Teams-Samples/tree/main/samples/TeamsSDK/Archived/bot-receive-channel-messages-withRSC/csharp) |[View](https://github.com/OfficeDev/Microsoft-Teams-Samples/tree/main/samples/TeamsSDK/Archived/bot-receive-channel-messages-withRSC/nodejs) | [View](https://github.com/OfficeDev/Microsoft-Teams-Samples/tree/main/samples/TeamsSDK/Archived/bot-receive-channel-messages-withRSC/python) | [View](https://github.com/OfficeDev/Microsoft-Teams-Samples/blob/main/samples/TeamsSDK/Archived/bot-receive-channel-messages-withRSC/csharp/demo-manifest/Bot-RSC.zip) |

## See also

* [Send and receive messages](../../build-conversational-capability.md)
* [Resource-specific consent for your Teams app](../../../graph-api/rsc/resource-specific-consent.md)
* [Test resource-specific consent permissions in Teams](../../../graph-api/rsc/test-resource-specific-consent.md)
* [Upload your app in Teams](../../../concepts/deploy-and-publish/apps-upload.md)
* [List replies to messages in a channel](/graph/api/chatmessage-list-replies?view=graph-rest-1.0&tabs=http&preserve-view=true)
