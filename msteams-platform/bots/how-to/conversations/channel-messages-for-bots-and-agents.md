---
title: Get All Channel and Chat Messages
description: Enable agents to receive all conversation messages without being @mentioned using RSC permissions. Read on webApplicationInfo or authorization section in manifest.
ms.topic: article
ms.localizationpriority: medium
ms.date: 09/11/2026
---

# Enable agents to receive all chat messages

By default, agents receive channel and chat messages only when they're @mentioned. You can configure Resource-specific consent (RSC) permissions in the app manifest to allow an agent to receive all channel and chat messages without being @mentioned.

When an agent receives all messages, it can use the broader conversation context to respond without requiring an @mention. A conversation owner can consent to this access when the app is installed or upgraded. For more information, see [RSC permissions](../../../graph-api/rsc/resource-specific-consent.md).

> [!NOTE]
> This capability is supported in Microsoft Teams commercial environments, [Government Community Cloud (GCC), GCC High, Department of Defense (DoD)](../../../concepts/cloud-overview.md#teams-app-capabilities), and [Teams operated by 21Vianet](../../../concepts/sovereign-cloud.md) environments.

## Enable agents to receive all channel or chat messages

The RSC permissions are extended to agents, and with user consent and app installation, these permissions:

- Allow a specified graph application to get all messages in channels and chats, respectively.
- Enable an agent defined in the app manifest to receive all conversations messages without being @mentioned in relevant contexts, where the following permissions apply:

  - `ChannelMessage.Read.Group`
  - `ChatMessage.Read.Chat`

To enable agents or agents to receive all messages:

- [Filter at mention messages](#filter-at-mention-messages)
- [Use Graph REST APIs to access all messages](#use-graph-rest-apis-to-access-all-messages)

### Filter at mention messages

You can enable the developer to filter agent messages and process only the messages that @mention the agents or the agent. This can be useful for several reasons:

- **Ensure contextual relevance**: Messages that are directed to the agent are likely to have higher relevance for the users of the agent. It helps the app to respond accurately and to engage in meaningful responses.
- **Better agent performance**: Filtering messages can reduce the need for unnecessary processing for the agent. Processing contextually irrelevant messages can be avoided to improve the agent performance. It can also keep the agent or the user from responding to irrelevant messages or triggering unnecessary actions.
- **Enhance user experience**: Users are more likely to engage with the agent if it responds only when it's addressed. The developer can create a seamless and intuitive user experience.
- **Efficient message handling**: Filtering relevant message enables the agent to handle larger volume of conversations and make it more useful and relatable.

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

## Use RSC permissions to enhance AI agents in Teams

You can use RSC permissions in AI agents to request access to specific resources like mail, calendar, or files. Instead of broad permissions, RSC allows permissions specific to the context of a resource at a granular level. You must determine the resources that your AI agent needs access to within Microsoft Teams or Microsoft 365. Use RSC permissions to:

- Read messages in Teams channels.
- Access user's details or data.
- Access shared documents.

For example, use RSC permissions for an AI agent to manage channel content.

| Use case | How RSC permission in the AI agent can help |
| --- | --- |
| **Context**: A team leader needs their team to collaborate on an upcoming project. <br><br> **Goal**: To ensure only relevant and approved content is included in the channel conversation. | **Solution**: Use an agent to manage conversation content. The agent can use the following RSC permissions: <br> • `ChannelMessage.Read.All` <br> • `ChannelMessage.Delete.All` <br> • `ChannelMessage.Send` <br><br> **Expected outcome**: <br> • Filter irrelevant content <br> • Receive timely updates <br> • Conversation is organized |

## Update app manifest

For your agent to receive all conversation messages, specify the relevant RSC permission strings in the `authorization.permissions.resourceSpecific` property of your app manifest. For more information, see [app manifest schema](/microsoft-365/extensibility/schema/root-authorization-permissions).

Here's an app manifest example followed by a sample code snippet:

:::image type="content" source="../../../assets/images/bots/RSC/appmanifest_2.png" alt-text="Screenshot shows the changes to be made in the app manifest.":::

In this code example:

- **webApplicationInfo.id**: Your Microsoft Entra app ID. The app ID can be the same as your bot ID.
- **webApplicationInfo.resource**: Any string. The resource field has no operation in RSC. However, it must be added with a value to avoid error response.
- **authorization.permissions.resourceSpecific**: RSC permissions for your app with either or both `ChannelMessage.Read.Group` and `ChatMessage.Read.Chat` specified. For more information, see [resource-specific permissions](../../../graph-api/rsc/resource-specific-consent.md#supported-rsc-permissions).

<details>
<summary>Select to view a <b>sample code snippet</b> for app manifest version 1.12 or later</summary>

The following code snippet provides an example of how you can declare RSC permissions in the app manifest:

```json
{
    "$schema": "https://developer.microsoft.com/json-schemas/teams/v1.21/MicrosoftTeams.schema.json",
    "manifestVersion": "1.21",
    "version": "1.0.0",
    "id": "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx",
    "packageName": "com.contoso.rscechobot",
    "developer": {
        "name": "Contoso",
        "websiteUrl": "https://www.contoso.com",
        "privacyUrl": "https://www.contoso.com/privacy",
        "termsOfUseUrl": "https://www.contoso.com/tos"
    },
    "icons": {
        "color": "color.png",
        "outline": "outline.png"
    },
    "name": {
        "short": "RscEchoBot",
        "full": "Echo bot with RSC configured for all conversation messages"
    },
    "description": {
        "short": "Echo bot with RSC configured for all channel and chat messages",
        "full": "Echo bot configured with all channel and chat messages RSC permission in manifest"
    },
    "accentColor": "#FFFFFF",
    "staticTabs": [
        {
            "entityId": "conversations",
            "scopes": [
                "personal"
            ]
        },
        {
            "entityId": "about",
            "scopes": [
                "personal"
            ]
        }
    ],
    "webApplicationInfo": {
        "id": "07338883-af76-47b3-86e4-2603c50be638",
        "resource": "https://AnyString"
    },
    "authorization": {
        "permissions": {
            "resourceSpecific": [
                {
                    "type": "Application",
                    "name": "ChannelMessage.Read.Group"
                },
                {
                    "type": "Application",
                    "name": "ChatMessage.Read.Chat"
                }
            ]
        }
    },
    "bots": [
        {
            "botId": "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx",
            "scopes": [
                "personal",
                "team",
                "groupchat"
            ],
            "supportsFiles": false,
            "isNotificationOnly": false
        }
    ],
    "permissions": [
        "identity",
        "messageTeamMembers"
    ],
    "validDomains": []
}
```

</details>
---

## Update app description for agents

To pass the Microsoft Teams Store approval, the app description must include how the agent app uses the data it reads:

- The `ChannelMessage.Read.Group` and `ChatMessage.Read.Chat` need not be used by agents to extract large amounts of customer data.
- The ability for agents to receive all messages in chats using `ChatMessage.Read.Chat` is only enabled after a re-installation or new installation into a chat:

  - If you have an app that's using the `ChatMessage.Read.Chat` for Graph scenarios, then test the app and modify the app before the feature is [generally available](https://www.microsoft.com/microsoft-365/roadmap?filters=&searchterms=receive%2Call%2Cgroup%2Cchat%2Cmessages).
  - If you don't want your app to receive all chat messages, use the [code snippet](#filter-at-mention-messages) for filtering the @mention messages only.
  - If no action is taken, your agent receives all the messages after the new installation.

- Note that `ChatMessage.Read.Chat` allows the app to read chat messages, without a signed-in user. For more information, see [RSC permissions](/graph/permissions-reference).
- The app reads only the information that's necessary for its core functions.
- The app uses data relevant to the specific business needs that it addresses to increase productivity and collaboration.

For more information, see [app descriptions](../../../concepts/deploy-and-publish/appsource/prepare/teams-store-validation-guidelines.md#app-descriptions).

## Code snippets

The following code provides an example of the RSC permissions:

# [C#](#tab/dotnet)

- [SDK reference](/dotnet/api/microsoft.bot.builder.activityhandler.onmessageactivityasync?view=botbuilder-dotnet-stable&preserve-view=true)
- [Sample code reference](https://github.com/OfficeDev/Microsoft-Teams-Samples/blob/main/samples/TeamsJS/meetings-token-app/csharp/Bots/TokenBot.cs#L52)

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

# [Node.js](#tab/nodejs)

- [SDK reference](/javascript/api/botbuilder/teamsactivityhandler?view=botbuilder-ts-latest#botbuilder-teamsactivityhandler-onmessage&preserve-view=true)
- [Sample code reference](https://github.com/OfficeDev/Microsoft-Teams-Samples/blob/main/samples/TeamsSDK/Archived/app-localization/nodejs/server/bot/botActivityHandler.js#L25)

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

# [Python](#tab/python)

- [SDK reference](/python/api/botbuilder-core/botbuilder.core.turncontext?view=botbuilder-py-latest&preserve-view=true#botbuilder-core-turncontext-send-activity)
- [Sample code reference](https://github.com/OfficeDev/Microsoft-Teams-Samples/blob/main/samples/TeamsSDK/Archived/bot-receive-channel-messages-withRSC/python/bots/botActivityHandler.py#L34)

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

---

## Code sample

| Sample name | Description | .NET | Node.js | Python | App manifest |
| --- | --- | --- | --- | --- |
|Channel messages with RSC permissions| This sample app shows how an agent can receive all channel messages with RSC without being @mentioned.|[View](https://github.com/OfficeDev/Microsoft-Teams-Samples/tree/main/samples/TeamsSDK/Archived/bot-receive-channel-messages-withRSC/csharp) |[View](https://github.com/OfficeDev/Microsoft-Teams-Samples/tree/main/samples/TeamsSDK/Archived/bot-receive-channel-messages-withRSC/nodejs) | [View](https://github.com/OfficeDev/Microsoft-Teams-Samples/tree/main/samples/TeamsSDK/Archived/bot-receive-channel-messages-withRSC/python) | [View](https://github.com/OfficeDev/Microsoft-Teams-Samples/blob/main/samples/TeamsSDK/Archived/bot-receive-channel-messages-withRSC/csharp/demo-manifest/Bot-RSC.zip) |

## See also

- [Send and receive messages](../../build-conversational-capability.md)
- [Resource-specific consent for your Teams app](../../../graph-api/rsc/resource-specific-consent.md)
- [Test resource-specific consent permissions in Teams](../../../graph-api/rsc/test-resource-specific-consent.md)
- [Upload your app in Teams](../../../concepts/deploy-and-publish/apps-upload.md)
- [List replies to messages in a channel](/graph/api/chatmessage-list-replies?view=graph-rest-1.0&tabs=http&preserve-view=true)
