---
title: Get All Channel and Chat Messages for Bot and Agents
author: surbhigupta12
description: Enable bots to receive all conversation messages without being @mentioned using RSC permissions. Read on webApplicationInfo or authorization section in manifest.
ms.topic: conceptual
ms.localizationpriority: medium
ms.date: 01/23/2025
---

# Receive all messages for bots and agents

> [!NOTE]
>
>While RSC permissions are supported for existing bot apps, we recommend [migrating to agents](../teams-conversational-ai/how-conversation-ai-get-started.md#migrate-your-bot-to-use-teams-ai-library). For new apps, build [agents](/microsoft-365-copilot/extensibility/overview-custom-engine-agent?toc=/microsoftteams/platform/toc.json&bc=/microsoftteams/platform/breadcrumb/toc.json) from scratch and use RSC permissions to enhance the experience.

Receiving all messages, even without @mentions, enhances bots and agents by providing better context, allowing proactive responses, personalized interactions, and faster issue resolution. The Resource-specific Consent (RSC) permissions model of Microsoft Teams Graph APIs improves performance and ensures timely responses.

Developers can customize bot behavior to fit specific needs by specifying permissions in the app manifest. Conversation owners can consent for a bot to receive all messages in channels and chats without @mentions. Consent can be granted during the app installation or upgrade process. For more information, see [RSC permissions](../../../graph-api/rsc/resource-specific-consent.md).

**Note**: Bots that receive all conversation messages with RSC are supported in [Government Community Cloud (GCC), GCC High, Department of Defense (DoD)](../../../concepts/cloud-overview.md#teams-app-capabilities), and [Teams operated by 21Vianet](../../../concepts/sovereign-cloud.md) environments.

## Enable bots to receive all channel or chat messages

The RSC permissions are extended to bots and agents, and with user consent and app installation, these permissions:

- Allow a specified graph application to get all messages in channels and chats, respectively.
- Enable a bot defined in the app manifest to receive all conversations messages without being @mentioned in relevant contexts, where the following permissions apply:

  - `ChannelMessage.Read.Group`
  - `ChatMessage.Read.Chat`

To enable bots or agents to receive all messages:

- [Filter at mention messages](#filter-at-mention-messages)
- [Use Graph REST APIs to access all messages](#use-graph-rest-apis-to-access-all-messages)

### Filter at mention messages

You can enable the developer to filter bot messages and process only the messages that @mention the bots or the agent. This can be useful for several reasons:

- **Ensure contextual relevance**: Messages that are directed to the bot are likely to have higher relevance for the users of the bot or the agent. It helps the app to respond accurately and to engage in meaningful responses.
- **Better bot performance**: Filtering messages can reduce the need for unnecessary processing for the bot or the agent. Processing contextually irrelevant messages can be avoided to improve the bot performance. It can also keep the bot, the agent, or the user from responding to irrelevant messages or triggering unnecessary actions.
- **Enhance user experience**: Users are more likely to engage with the bot if it responds only when it's addressed. The developer can create a seamless and intuitive user experience.
- **Efficient message handling**: Filtering relevant message enables the bot or the agent to handle larger volume of conversations and make it more useful and relatable.

Here's an example of using RSC permissions to filter @mention messages:

```csharp
// When ChannelMessage.Read.Group or ChatMessage.Read.Chat RSC is in the app manifest, this method is called even when bot is not @mentioned.
// This code snippet allows the bot to ignore all messages that do not @mention the bot.
protected override async Task OnMessageActivityAsync(ITurnContext<IMessageActivity> turnContext, CancellationToken cancellationToken)
{
        // Ignore the message if bot was not mentioned. 
        // Remove this if block to process all messages received by the bot.
        if (!turnContext.Activity.GetMentions().Any(mention => mention.Mentioned.Id.Equals(turnContext.Activity.Recipient.Id, StringComparison.OrdinalIgnoreCase)))
        {
            return;
        }
        // Sends an activity to the sender of the incoming activity.
        await turnContext.SendActivityAsync(MessageFactory.Text("Using RSC the bot can receive messages across channels or chats in team without being @mentioned."));
}
```

Developers can create more efficient and user-friendly conversational interfaces in the bots and agents.

### Use Graph REST APIs to access all messages

Services that need access to all Teams message data must use the Graph REST APIs to access archived data in channels and chats. The bot or the agent must use the `ChannelMessage.Read.Group` and `ChatMessage.Read.Chat` RSC permissions appropriately to build and enhance engaging experience for users.

For more information about updating RSC permissions in app description, see [Update app description for bots or agents](#update-app-description-for-bots-or-agents).

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

For your bot or agent to receive all conversation messages, specify the relevant RSC permission strings in the `authorization.permissions.resourceSpecific` property of your app manifest. For more information, see [app manifest schema](../../../resources/schema/manifest-schema.md).

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

## Upload a custom app in a conversation

After you've updated the app manifest with the required RSC permissions, follow these steps to upload your custom app to Teams.

# [Channel messages](#tab/channel)

The following steps guide you to upload and validate a bot that receives all channel messages in a Team without being @mentioned:

1. Select or create a team.
1. Select &#x25CF;&#x25CF;&#x25CF; from the left pane. The dropdown menu appears.
1. Select **Manage team** from the dropdown menu.

   :::image type="content" source="Media/managing-team.png" alt-text="Screenshot shows the managing team option in Teams application.":::

1. Select **Apps**. Multiple apps appear.

1. Select **Upload a custom app** from the lower right corner.

      :::image type="content" source="Media/uploading-custom-app.png" alt-text="Screenshot shows the Upload a custom app option.":::

1. Select **Open**.

      :::image type="content" source="Media/select-apppackage.png" alt-text="Screenshot shows the open dialog box to select the app package." lightbox="Media/select-apppackage.png":::

1. Select **Add** from the app details pop-up, to add the app to your selected team.

      :::image type="content" source="Media/adding-bot.png" alt-text="Screenshot shows the Add button to add the app to a team." lightbox="Media/adding-bot.png":::

1. Select a channel and enter a message in the channel for your app.

    The bot or agent receives the message without being @mentioned.

      :::image type="content" source="Media/bot-receiving-message.png" alt-text="Screenshot shows a bot receiving message in a channel." lightbox="Media/bot-receiving-message.png":::

# [Chat messages](#tab/chat)

The following steps guide you to upload and validate a bot that receives all chat messages in a chat without being @mentioned:

1. Select or create a group chat.
1. Select the ellipses &#x25CF;&#x25CF;&#x25CF; from the group chat. The dropdown menu appears.
1. Select **Manage apps** from the dropdown menu.

   :::image type="content" source="../../../assets/images/bots/chats-manage-apps-entry.png" alt-text="Screenshot shows the Manage apps option from the dropdown menu of a Teams chat." lightbox="../../../assets/images/bots/chats-manage-apps-entry.png":::

1. Select **Upload a custom app** from the lower right corner of **Manage apps**.

   :::image type="content" source="../../../assets/images/bots/Chats_Manage_Apps_Page.png" alt-text="Screenshot shows the Upload an app option." lightbox="../../../assets/images/bots/Chats_Manage_Apps_Page.png":::

1. Select the app package from the **Open** dialog box.
1. Select **Open**.

   :::image type="content" source="../../../assets/images/bots/Chats_Sideload_App_FilePicker.png" alt-text= "Screenshot shows the window where the app package is selected.":::

1. Select **Add** from the app details pop-up to add the bot to your selected group chat.

   :::image type="content" source="../../../assets/images/bots/Chats_Install_Dialog.png" alt-text="Screenshot shows the addition of the bot to the group chat.":::

1. Enter a message in the group chat for your bot.

   :::image type="content" source="../../../assets/images/bots/Bot_ReceiveMessage.png" alt-text="Screenshot shows the bot replying to a message.":::

   The bot receives the message without being @mentioned.

   :::image type="content" source="../../../assets/images/bots/Bot_NoMention.png" alt-text="Screenshot shows the bot replying to a message without @mention.":::

---

## Update app description for bots or agents

To pass the Microsoft Teams Store approval, the app description must include how the bot or the agent app uses the data it reads:

- The `ChannelMessage.Read.Group` and `ChatMessage.Read.Chat` need not be used by bots to extract large amounts of customer data.
- The ability for bots to receive all messages in chats using `ChatMessage.Read.Chat` is only enabled after a re-installation or new installation into a chat:

  - If you have an app that's using the `ChatMessage.Read.Chat` for Graph scenarios, then test the app following the steps in [upload a custom app in a conversation](#upload-a-custom-app-in-a-conversation) and modify the app before the feature is [generally available](https://www.microsoft.com/microsoft-365/roadmap?filters=&searchterms=receive%2Call%2Cgroup%2Cchat%2Cmessages).
  - If you don't want your app to receive all chat messages, use the [code snippet](#filter-at-mention-messages) for filtering the @mention messages only.
  - If no action is taken, your bot receives all the messages after the new installation.

- Note that `ChatMessage.Read.Chat` allows the app to read chat messages, without a signed-in user. For more information, see [RSC permissions](/graph/permissions-reference).
- The app reads only the information that's necessary for its core functions.
- The app uses data relevant to the specific business needs that it addresses to increase productivity and collaboration.

For more information, see [app descriptions](../../../concepts/deploy-and-publish/appsource/prepare/teams-store-validation-guidelines.md#app-descriptions).

## Code snippets

The following code provides an example of the RSC permissions:

# [C#](#tab/dotnet)

- [SDK reference](/dotnet/api/microsoft.bot.builder.activityhandler.onmessageactivityasync?view=botbuilder-dotnet-stable&preserve-view=true)
- [Sample code reference](https://github.com/OfficeDev/Microsoft-Teams-Samples/blob/main/samples/meetings-token-app/csharp/Bots/TokenBot.cs#L52)

```csharp

// Handle when a message is addressed to the bot.
// When rsc is enabled the method will be called even when bot is addressed without being @mentioned.
protected override async Task OnMessageActivityAsync(ITurnContext<IMessageActivity> turnContext, CancellationToken cancellationToken)
{
        // Sends an activity to the sender of the incoming activity.
         await turnContext.SendActivityAsync(MessageFactory.Text("Using RSC the bot can receive messages across channels or chats in a team without being @mentioned."));
}

```

# [Node.js](#tab/nodejs)

- [SDK reference](/javascript/api/botbuilder/teamsactivityhandler?view=botbuilder-ts-latest#botbuilder-teamsactivityhandler-onmessage&preserve-view=true)
- [Sample code reference](https://github.com/OfficeDev/Microsoft-Teams-Samples/blob/main/samples/app-localization/nodejs/server/bot/botActivityHandler.js#L25)

```javascript

// Handle when a message is addressed to the bot.
// When rsc is enabled the method will be called even when bot is addressed without being @mentioned.

this.onMessage(async (context, next) => {
    // Sends a message activity to the sender of the incoming activity.
   await context.sendActivity(MessageFactory.text("Using RSC the bot can receive messages across channels or chats in team without being @mentioned."))
   await next();
});

```

# [Python](#tab/python)

- [SDK reference](/python/api/botbuilder-core/botbuilder.core.turncontext?view=botbuilder-py-latest&preserve-view=true#botbuilder-core-turncontext-send-activity)
- [Sample code reference](https://github.com/OfficeDev/Microsoft-Teams-Samples/blob/main/samples/bot-receive-channel-messages-withRSC/python/bots/botActivityHandler.py#L34)

```python

 # Event handler for when new members are added to a team
    async def on_teams_members_added(
        self,
        teams_members_added: list[TeamsChannelAccount],  # List of new members added
        team_info: TeamInfo,  # Information about the team
        turn_context: TurnContext,  # Context for the current turn
    ):
        # Welcome message for new members
        welcome_text = "Hello and welcome! With this sample, your bot can receive user messages across standard channels in a team without being @mentioned."
        
        for member in teams_members_added:
            # Ensure the bot does not send a welcome message to itself
            if member.id != turn_context.activity.recipient.id:
                await turn_context.send_activity(MessageFactory.text(welcome_text))

```

---

## Code sample

| Sample name | Description | .NET | Node.js | Python | App manifest |
| --- | --- | --- | --- | --- |
|Channel messages with RSC permissions| This sample app shows how a bot can receive all channel messages with RSC without being @mentioned.|[View](https://github.com/OfficeDev/Microsoft-Teams-Samples/tree/main/samples/bot-receive-channel-messages-withRSC/csharp) |[View](https://github.com/OfficeDev/Microsoft-Teams-Samples/tree/main/samples/bot-receive-channel-messages-withRSC/nodejs) | [View](https://github.com/OfficeDev/Microsoft-Teams-Samples/tree/main/samples/bot-receive-channel-messages-withRSC/python) | [View](https://github.com/OfficeDev/Microsoft-Teams-Samples/blob/main/samples/bot-receive-channel-messages-withRSC/csharp/demo-manifest/Bot-RSC.zip) |

## See also

- [Send and receive messages](../../build-conversational-capability.md)
- [Resource-specific consent for your Teams app](../../../graph-api/rsc/resource-specific-consent.md)
- [Test resource-specific consent permissions in Teams](../../../graph-api/rsc/test-resource-specific-consent.md)
- [Upload your app in Teams](../../../concepts/deploy-and-publish/apps-upload.md)
- [List replies to messages in a channel](/graph/api/chatmessage-list-replies?view=graph-rest-1.0&tabs=http&preserve-view=true)
