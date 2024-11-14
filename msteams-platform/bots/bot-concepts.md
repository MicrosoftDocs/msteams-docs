---
title: Activity Handlers and Bot Logic
description: Learn about bot events and activity handlers for messages, channels, teams, members, mentions, auth, and card actions.
ms.topic: conceptual
ms.localizationpriority: medium
ms.author: surbhigupta
ms.date: 10/03/2024
---

# Understand bot concepts

A bot's interactions can be using text, speech, images, or video. It processes the user's input to understand their request and evaluates the input to perform relevant tasks. A bot may request information or enable access to services, and responds to the user.

## Bot scopes

Bots in Microsoft Teams can be part of a one-to-one conversation, a group chat, or a channel in a team. Each scope provides unique opportunities and challenges for your conversational bot.

| In a channel | In a group chat | In a one-to-one chat |
| :-- | :-- | :-- |
| Massive reach | Fewer members | Traditional way |
| Concise individual interactions | @mention to bot | Q&A bots |
| @mention to bot | Similar to channel | Bots that tell jokes and take notes |

### In a channel

Channels contain threaded conversations between multiple people even up to 2000. This potentially gives your bot massive reach, but individual interactions must be concise. Traditional multi-turn interactions don't work. Instead, you must look to use interactive cards or dialogs (referred as task modules in TeamsJS v1.x), or move the conversation to a one-to-one conversation to collect lots of information. Your bot only has access to messages where it's `@mentioned`. You can retrieve additional messages from the conversation using Microsoft Graph and organization-level permissions.

Bots work better in a channel in the following cases:

* Notifications, where you provide an interactive card for users to take additional information.
* Feedback scenarios, such as polls and surveys.
* Single request or response cycle resolves interactions and the results are useful for multiple members of the conversation.
* Social or fun bots, where you get an awesome cat image, randomly pick a winner, and so on.

### In a group chat

Group chats are non-threaded conversations between three or more people. They tend to have fewer members than a channel and are more transient. Similar to a channel, your bot only has access to messages where it's `@mentioned` directly.

Bots that work better in a channel also work better in a group chat.

### In a one-to-one chat

One-to-one chat is a traditional way for a conversational bot to interact with a user. A few examples of one-to-one conversational bots are:

* Q&A bots
* bots that initiate workflows in other systems.
* bots that tell jokes.
* bots that take notes.
Before creating one-to-one chatbots, consider whether a conversation-based interface is the best way to present your functionality.

## Activity handler and bot logic

To create a bot app that meets your needs, understanding Microsoft Teams activity handler and bot logic is essential. These two key components work together to organize conversational logic.

* [Teams activity handler](#teams-activity-handler):
  Teams activity handlers extend the functionality of standard bots by adding support for Teams-specific events and interactions. These events can include channel creation, team member additions, and other actions unique to the Teams environment. By utilizing Teams activity handlers, bots can provide a more integrated and seamless user experience within the Teams platform.

* [Bot logic](#bot-logic):
  The bot object, which houses the bot’s conversational logic, is responsible for making decisions based on user input. It exposes a turn handler, which is the method that accepts incoming activities from the bot adapter. The bot logic ensures that each turn of the conversation is handled appropriately, contributing to the bot's overall coherence and effectiveness.

These two components work together to create an engaging conversational experience. The activity handler processes what the user says, while the bot logic figures out the best response. Together, they enable:

* Understanding the context of the conversation
* Personalizing interactions
* Retrieving information efficiently
* Maintaining an adaptive conversational flow

By understanding the activity handler and bot logic, you can design and implement smart, user-friendly conversational AI and conventional bot solutions.

### Teams activity handler

The activity handler is the core of a bot's functionality, managing and processing user interactions. It's based on the Microsoft Bot Framework's activity handler and routes all Teams activities before handling any non-Teams specific ones. It acts as an intermediary between the user's input and the bot's response:

* Receives incoming messages.
* Retrieves key data from user input.
* Identifies user intent using Natural Language Processing (NLP).
* Maintains conversation context and state.
* Generates responses based on user input and intent.

The activity handler improves user experience, efficiency, accuracy, scalability, and flexibility.

When a Teams bot gets an activity, it's routed through the activity handlers. All activities go through a base handler called the turn handler, which then calls the appropriate activity handler. The Teams bot is derived from the `TeamsActivityHandler` class, which comes from the Bot Framework's `ActivityHandler` class.

> [!NOTE]
> If a bot activity takes more than 15 seconds to process, Teams sends a retry request to the bot endpoint, so you might see duplicate requests.

# [C#](#tab/csharp)

Bots are built using the Bot Framework. When a bot gets a message, the turn handler is notified and sends it to the `OnMessageActivityAsync` handler. This works the same way in Teams. If the bot gets a conversation update, the turn handler sends it to `OnConversationUpdateActivityAsync`. The Teams activity handler first looks for any Teams-specific events. If there aren't any, it passes them to the Bot Framework's activity handler.

In the Teams activity handler class, there are two primary Teams activity handlers:

* `OnConversationUpdateActivityAsync` routes all conversation update activities.
* `OnInvokeActivityAsync` routes all Teams invoke activities.

To implement your logic for Teams specific activity handlers, you must override the methods in your bot as shown in the [bot logic](#bot-logic) section. There's no base implementation for these handlers. Therefore, add the logic that you want in your override.

To set up your logic for Teams-specific activity handlers, you must override the methods in your bot as shown in the [bot logic](#bot-logic) section. There's no default implementation for these handlers, so just add the logic you want in your override.

The code snippets for Teams activity handlers:

`OnTeamsChannelCreatedAsync`

```csharp

protected override Task OnTeamsChannelCreatedAsync(ChannelInfo channelInfo, TeamInfo teamInfo, ITurnContext<IConversationUpdateActivity> turnContext, CancellationToken cancellationToken)
        {
            // Code logic here
        }
```

`OnTeamsChannelDeletedAsync`

```csharp

protected override Task OnTeamsChannelDeletedAsync(ChannelInfo channelInfo, TeamInfo teamInfo, ITurnContext<IConversationUpdateActivity> turnContext, CancellationToken cancellationToken)
        {
            // Code logic here
        }
```

`OnTeamsChannelRenamedAsync`

```csharp

protected override Task OnTeamsChannelRenamedAsync(ChannelInfo channelInfo, TeamInfo teamInfo, ITurnContext<IConversationUpdateActivity> turnContext, CancellationToken cancellationToken)
  {
   // Code logic here
  }
```

`OnTeamsTeamRenamedAsync`

```csharp

protected override Task OnTeamsTeamRenamedAsync(TeamInfo teamInfo, ITurnContext<IConversationUpdateActivity> turnContext, CancellationToken cancellationToken)
  {
   // Code logic here
  }
```

`OnTeamsMembersAddedAsync`

```csharp

protected override Task OnTeamsMembersAddedAsync(IList<TeamsChannelAccount> teamsMembersAdded, TeamInfo teamInfo, ITurnContext<IConversationUpdateActivity> turnContext, CancellationToken cancellationToken)
  {
   // Code logic here
  }
```

`OnTeamsMembersRemovedAsync`

```csharp

protected override Task OnTeamsMembersRemovedAsync(IList<TeamsChannelAccount> teamsMembersRemoved, TeamInfo teamInfo, ITurnContext<IConversationUpdateActivity> turnContext, CancellationToken cancellationToken);
  {
   // Code logic here
  }
```

`OnTeamsMessageEditAsync`

```csharp
protected override async Task OnTeamsMessageEditAsync(ITurnContext<IMessageUpdateActivity> turnContext, CancellationToken cancellationToken)
  { 
   // Code logic here 
  } 
```

`OnTeamsMessageUndeleteAsync`

```csharp
protected override async Task OnTeamsMessageUndeleteAsync(ITurnContext<IMessageUpdateActivity> turnContext, CancellationToken cancellationToken)
  { 
   // Code logic here 
  } 
```

`OnTeamsMessageSoftDeleteAsync`

```csharp
 protected override async Task OnTeamsMessageSoftDeleteAsync(ITurnContext<IMessageDeleteActivity> turnContext, CancellationToken cancellationToken)
  { 
   // Code logic here 
  } 
```

# [JavaScript](#tab/javascript)

Bots are created using the Bot Framework. If the bots receive a message activity, then the turn handler receives a notification of that incoming activity. The turn handler then sends the incoming activity to the `onMessage` activity handler. In Teams, this functionality remains the same. If the bot receives a conversation update activity, then the turn handler receives a notification of that incoming activity and sends the incoming activity to `dispatchConversationUpdateActivity`. The Teams activity handler first checks for any Teams specific events. If no events are found, it then passes them along to the Bot Framework's activity handler.

In the Teams activity handler class, there are two primary Teams activity handlers, `dispatchConversationUpdateActivity` and `onInvokeActivity`. `dispatchConversationUpdateActivity` routes all conversation update activities and `onInvokeActivity` routes all Teams invoke activities.

To implement your logic for Teams specific activity handlers, you must override the methods in your bot as shown in the [bot logic](#bot-logic) section. Define your bot logic for these handlers, then be sure to call `next()` at the end. By calling `next()`, you ensure that the next handler runs.

The code snippets for Teams activity handlers:

`onTeamsChannelCreated`

```javascript

onTeamsChannelCreated(async (channelInfo, teamInfo, context, next) => {
       // code for handling
        await next()
    });
```

`onTeamsChannelDeleted`

```javascript

onTeamsChannelDeleted(async (channelInfo, teamInfo, context, next) => {
       // code for handling
       await next()
    });
```

`onTeamsChannelRenamed`

```javascript

onTeamsChannelRenamed(async (channelInfo, teamInfo, context, next) => {
       // code for handling
       await next()
    });
```

`onTeamsTeamRenamed`

```javascript

onTeamsTeamRenamedAsync(async (teamInfo, context, next) => {
       // code for handling
       await next()
    });
```

`onTeamsMembersAdded`

```javascript

onTeamsMembersAdded(async (membersAdded, teamInfo, context, next) => {
       // code for handling
    await next();
    });
```

`onTeamsMembersRemoved`

```javascript

onTeamsMembersRemoved(async (membersRemoved, teamInfo, context, next) => {
       // code for handling
    await next();
    });
```

# [Python](#tab/python)

Bots are created using the Bot Framework. If the bots receive a message activity, then the turn handler receives a notification of that incoming activity. The turn handler then sends the incoming activity to the `on_message_activity` activity handler. In Teams, this functionality remains the same. If the bot receives a conversation update activity, then the turn handler receives a notification of that incoming activity and sends the incoming activity to `on_conversation_update_activity`. The Teams activity handler first checks for any Teams specific events. If no events are found, it then passes them along to the Bot Framework's activity handler.

In the Teams activity handler class, there are two primary Teams activity handlers, `on_conversation_update_activity` and `on_invoke_activity`. `on_conversation_update_activity` routes all conversation update activities and `on_invoke_activity` routes all Teams invoke activities.

To implement your logic for Teams specific activity handlers, you must override the methods in your bot as shown in the [bot logic](#bot-logic) section. There's no base implementation for these handlers. Therefore, add the logic that you want in your override.

---

#### Example of bot activity handler

The following code provides an example of a bot activity for a channel team scope:

# [C#](#tab/dotnet)

* [SDK reference](/dotnet/api/microsoft.bot.builder.activityhandler.onmessageactivityasync?view=botbuilder-dotnet-stable&preserve-view=true)

* [Sample code reference](https://github.com/OfficeDev/Microsoft-Teams-Samples/blob/main/samples/app-localization/csharp/Localization/Bots/LocalizerBot.cs#L20)

```csharp

protected override async Task OnMessageActivityAsync(ITurnContext<IMessageActivity> turnContext, CancellationToken cancellationToken)
{
    var mention = new Mention
    {
        Mentioned = turnContext.Activity.From,
        // EncodeName: Converts the name to a valid XML name.
        Text = $"<at>{XmlConvert.EncodeName(turnContext.Activity.From.Name)}</at>",
    };
    
    // MessageFactory.Text(): Specifies the type of text data in a message attachment.
    var replyActivity = MessageFactory.Text($"Hello {mention.Text}.");
    replyActivity.Entities = new List<Entity> { mention };

    // Sends a message activity to the sender of the incoming activity.
    await turnContext.SendActivityAsync(replyActivity, cancellationToken);
}

```

# [Node.js](#tab/nodejs)

* [SDK reference](/javascript/api/botbuilder-core/activityhandler?view=botbuilder-ts-latest&preserve-view=true#botbuilder-core-activityhandler-onmessage)

* [Sample code reference](https://github.com/OfficeDev/Microsoft-Teams-Samples/blob/main/samples/app-localization/nodejs/server/bot/botActivityHandler.js#L25)

```javascript

this.onMessage(async (turnContext, next) => {
    const mention = {
        mentioned: turnContext.activity.from,

        // TextEncoder().encode(): Encodes the supplied characters.
        text: `<at>${ new TextEncoder().encode(turnContext.activity.from.name) }</at>`,
    } as Mention;

    // MessageFactory.text(): Specifies the type of text data in a message attachment.
    const replyActivity = MessageFactory.text(`Hello ${mention.text}`);
    replyActivity.entities = [mention];

    await turnContext.sendActivity(replyActivity);

    // By calling next() you ensure that the next BotHandler is run.
    await next();
});

```

---

The following code provides an example of bot activity for a one-to-one chat:

# [C#](#tab/dotnet)

* [SDK reference](/dotnet/api/microsoft.bot.schema.activityextensions.removerecipientmention?view=botbuilder-dotnet-stable&preserve-view=true)

* [Sample code reference](https://github.com/OfficeDev/Microsoft-Teams-Samples/blob/main/samples/app-hello-world/csharp/Microsoft.Teams.Samples.HelloWorld.Web/Bots/MessageExtension.cs#L19)

```csharp

// Handle message activity
protected override async Task OnMessageActivityAsync(ITurnContext<IMessageActivity> turnContext, CancellationToken cancellationToken)
{
    // Remove recipient mention text from Text property.
    // Use with caution because this function is altering the text on the Activity.
    turnContext.Activity.RemoveRecipientMention();
    var text = turnContext.Activity.Text.Trim().ToLower();

    // Sends a message activity to the sender of the incoming activity.
    await turnContext.SendActivityAsync(MessageFactory.Text($"Your message is {text}."), cancellationToken);
}
```

# [Node.js](#tab/nodejs)

* [SDK reference](/javascript/api/botbuilder-core/turncontext?view=botbuilder-ts-latest&preserve-view=true#botbuilder-core-turncontext-sendactivity)
* [Sample code reference](https://github.com/OfficeDev/Microsoft-Teams-Samples/blob/main/samples/bot-receive-channel-messages-withRSC/nodejs/server/bot/botActivityHandler.js#L20)

```javascript
this.onMessage(async (context, next) => {
    // MessageFactory.text(): Specifies the type of text data in a message attachment.
    await context.sendActivity(MessageFactory.text("Your message is: " + context.activity.text));
    await next();
});
```

---

### Bot logic

Bot logic incorporates the fundamental rules and decision-making frameworks that dictate a bot's actions and interactions. It outlines how the bot interprets user input, formulates responses, and participates in conversations.

In Teams, the bot logic processes incoming activities from one or more of your bot channels and in response generates outgoing activities. It's still true of bots derived from the Teams activity handler class, which first checks for Teams activities. After checking for Teams activities, it passes all other activities to the Bot Framework's activity handler.

# [C#](#tab/csharp)

#### Core Bot Framework handlers

>[!NOTE]
>
>* Except for the **added** and **removed** members' activities, all the activity handlers described in this section continue to work as they do with a non-Teams bot.
>* `onInstallationUpdateActivityAsync()` method is used to get Teams Locale while adding the bot to Teams.

Activity handlers are different in context of a team, where a new member is added to the team instead of a message thread.

The list of handlers defined in `ActivityHandler` includes the following events:

| Event | Handler | Description |
| :-- | :-- | :-- |
| Any activity type received | `OnTurnAsync` | This method calls one of the other handlers, based on the type of activity received. |
| Message activity received | `OnMessageActivityAsync` | You can override this method to handle a `Message` activity. |
| Message update activity received | `OnMessageUpdateActivityAsync` | You can override this method to handle a message update activity. |
| Message delete activity received | `OnMessageDeleteActivityAsync` | You can override this method to handle a message delete activity. |
| Conversation update activity received | `OnConversationUpdateActivityAsync` | This method calls a handler if members other than the bot joined or left the conversation, on a `ConversationUpdate` activity. |
| Non-bot members joined the conversation | `OnMembersAddedAsync` | This method can be overridden to handle members joining a conversation. |
| Non-bot members left the conversation | `OnMembersRemovedAsync` | This method can be overridden to handle members leaving a conversation. |
| Event activity received | `OnEventActivityAsync` | This method calls a handler specific to the event type, on an `Event` activity. |
| Token-response event activity received | `OnTokenResponseEventAsync` | This method can be overridden to handle token response events. |
| Non-token-response event activity received | `OnEventAsync` | This method can be overridden to handle other types of events. |
| Other activity type received | `OnUnrecognizedActivityTypeAsync` | This method can be overridden to handle any activity type otherwise unhandled. |

#### Teams specific activity handlers

The `TeamsActivityHandler` extends the list of handlers in the core Bot Framework handlers section to include the following events:

| Event | Handler | Description |
| :-- | :-- | :-- |
| channelCreated | `OnTeamsChannelCreatedAsync` | This method can be overridden to handle a Teams channel being created. For more information, see [channel created](https://aka.ms/azure-bot-subscribe-to-conversation-events#channel-created) in [Conversation update events](how-to/conversations/subscribe-to-conversation-events.md#conversation-update-events). |
| channelDeleted | `OnTeamsChannelDeletedAsync` | This method can be overridden to handle a Teams channel being deleted. For more information, see [channel deleted](https://aka.ms/azure-bot-subscribe-to-conversation-events#channel-deleted) in [Conversation update events](how-to/conversations/subscribe-to-conversation-events.md#conversation-update-events).|
| channelRenamed | `OnTeamsChannelRenamedAsync` | This method can be overridden to handle a Teams channel being renamed. For more information, see [channel renamed](https://aka.ms/azure-bot-subscribe-to-conversation-events#channel-renamed) in [Conversation update events](how-to/conversations/subscribe-to-conversation-events.md#conversation-update-events).|
| teamRenamed | `OnTeamsTeamRenamedAsync` | `return Task.CompletedTask;` This method can be overridden to handle a Teams team being renamed. For more information, see [team renamed](https://aka.ms/azure-bot-subscribe-to-conversation-events#team-renamed) in [Conversation update events](how-to/conversations/subscribe-to-conversation-events.md#conversation-update-events).|
| MembersAdded | `OnTeamsMembersAddedAsync` | This method calls the `OnMembersAddedAsync` method in `ActivityHandler`. The method can be overridden to handle members joining a team. For more information, see [team members added](how-to/conversations/subscribe-to-conversation-events.md#members-added) in [Conversation update events](how-to/conversations/subscribe-to-conversation-events.md#conversation-update-events).|
| MembersRemoved | `OnTeamsMembersRemovedAsync` | This method calls the `OnMembersRemovedAsync` method in `ActivityHandler`. The method can be overridden to handle members leaving a team. For more information, see [team members removed](how-to/conversations/subscribe-to-conversation-events.md#members-removed) in [Conversation update events](how-to/conversations/subscribe-to-conversation-events.md#conversation-update-events).|
| messageEdit | `OnTeamsMessageEditAsync` | You can override this method to handle a Teams message edit event. |
| messageUndelete | `OnTeamsMessageUndeleteAsync` | You can override this method to handle a Teams message undelete event. |
| messageSoftDelete | `OnTeamsMessageSoftDeleteAsync` | You can override this method to handle a Teams message soft delete event. |

#### Teams invoke activities

The list of Teams activity handlers called from the `OnInvokeActivityAsync` Teams activity handler includes the following invoke types:

| Invoke types                    | Handler                              | Description                                                  |
| :-----------------------------  | :----------------------------------- | :----------------------------------------------------------- |
| CardAction.Invoke               | `OnTeamsCardActionInvokeAsync`       | When the connector receives a card action invoke activity, this method is invoked. |
| fileConsent/invoke              | `OnTeamsFileConsentAcceptAsync`      | When a user accepts a file consent card, this method is invoked. |
| fileConsent/invoke              | `OnTeamsFileConsentAsync`            | When the connector receives a file consent card activity, this method is invoked. |
| fileConsent/invoke              | `OnTeamsFileConsentDeclineAsync`     | When a user declines a file consent card, this method is invoked. |
| actionableMessage/executeAction | `OnTeamsO365ConnectorCardActionAsync` | When the connector receives a connector card for Microsoft 365 Groups action activity, this method is invoked. |
| signin/verifyState              | `OnTeamsSigninVerifyStateAsync`      | When the connector receives a `signIn` verify state activity, this method is invoked. |
| task/fetch                      | `OnTeamsTaskModuleFetchAsync`        | You can override this method in a derived class to provide logic when a dialog (referred as task module in TeamsJS v1.x) is fetched. |
| task/submit                     | `OnTeamsTaskModuleSubmitAsync`       | You can override this method in a derived class to provide logic when a dialog is submitted. |

The Invoke activities listed in this section are for conversational bots in Teams. The Bot Framework SDK also supports invoke activities specific to message extensions. For more information, see [what are message extensions](../messaging-extensions/what-are-messaging-extensions.md).

# [JavaScript](#tab/javascript)

#### Core Bot Framework handlers

>[!NOTE]
> Except for the **added** and **removed** members' activities, all the activity handlers described in this section continue to work as they do with a non-Teams bot.

Activity handlers are different in context of a team, where the new member is added to the team instead of a message thread.

The list of handlers defined in `ActivityHandler` includes the following events:

| Event | Handler | Description |
| :-- | :-- | :-- |
| Any activity type received | `onTurn` | This method calls one of the other handlers, based on the type of activity received. |
| Message activity received | `onMessage` | This method helps to handle a `Message` activity. |
| Message update activity received  | `onMessageUpdate` | This method calls a handler if a message is updated. |
| Message delete activity received | `onMessageDelete` | This method calls a handler if a message is deleted. |
| Conversation update activity received | `onConversationUpdate` | This method calls a handler if members other than the bot joined or left the conversation, on a `ConversationUpdate` activity. |
| Non-bot members joined the conversation | `onMembersAdded` | This method helps to handle members joining a conversation. |
| Non-bot members left the conversation | `onMembersRemoved` | This method helps to handle members leaving a conversation. |
| Event activity received | `onEvent` | This method calls a handler specific to the event type, on an `Event` activity. |
| Token-response event activity received | `onTokenResponseEvent` | This method helps to handle token response events. |
| Other activity type received | `onUnrecognizedActivityType` | This method helps to handle any activity type otherwise unhandled. |
| message edit | `onTeamsMessageEditEvent` | You can override this method to handle when a message in a conversation is edited. |
| message undelete | `onTeamsMessageUndeleteEvent` | You can override this method to handle when a deleted message in a conversation is undeleted. For example, when the user decides to undo a deleted message. |
| message soft delete | `onTeamsMessageSoftDeleteEvent` | You can override this method to handle when a message in a conversation is soft deleted. |

#### Teams specific activity handlers

The `TeamsActivityHandler` extends the list of handlers in the core Bot Framework handlers section to include the following events:

| Event | Handler | Description |
| :-- | :-- | :-- |
| channelCreated | `onTeamsChannelCreated` | This method can be overridden to handle a Teams channel being created. For more information, see [channel created](https://aka.ms/azure-bot-subscribe-to-conversation-events#channel-created) in [Conversation update events](how-to/conversations/subscribe-to-conversation-events.md#conversation-update-events). |
| channelDeleted | `onTeamsChannelDeleted` | This method can be overridden to handle a Teams channel being deleted. For more information, see [channel deleted](https://aka.ms/azure-bot-subscribe-to-conversation-events#channel-deleted) in [Conversation update events](how-to/conversations/subscribe-to-conversation-events.md#conversation-update-events).|
| channelRenamed | `onTeamsChannelRenamed` | This method can be overridden to handle a Teams channel being renamed. For more information, see [channel renamed](https://aka.ms/azure-bot-subscribe-to-conversation-events#channel-renamed) in [Conversation update events](how-to/conversations/subscribe-to-conversation-events.md#conversation-update-events). |
| teamRenamed | `onTeamsTeamRenamed` | `return Task.CompletedTask;` This method can be overridden to handle a Teams team being renamed. For more information, see [team renamed](https://aka.ms/azure-bot-subscribe-to-conversation-events#team-renamed) in [Conversation update events](how-to/conversations/subscribe-to-conversation-events.md#conversation-update-events). |
| MembersAdded | `onTeamsMembersAdded` | This method calls the `OnMembersAddedAsync` method in `ActivityHandler`. The method can be overridden to handle members joining a team. For more information, see [team members added](how-to/conversations/subscribe-to-conversation-events.md#members-added) in [Conversation update events](how-to/conversations/subscribe-to-conversation-events.md#conversation-update-events). |
| MembersRemoved | `onTeamsMembersRemoved` | This method calls the `OnMembersRemovedAsync` method in `ActivityHandler`. The method can be overridden to handle members leaving a team. For more information, see [team members removed](how-to/conversations/subscribe-to-conversation-events.md#members-removed) in [Conversation update events](how-to/conversations/subscribe-to-conversation-events.md#conversation-update-events). |

#### Teams invoke activities

The following table provides the list of Teams activity handlers called from the `onInvokeActivity` Teams activity handler:

| Invoke types                    | Handler                              | Description                                                  |
| :-----------------------------  | :----------------------------------- | :----------------------------------------------------------- |
| CardAction.Invoke               | `handleTeamsCardActionInvoke`       | This method is invoked when a card action invoke activity is received from the connector. |
| fileConsent/invoke              | `handleTeamsFileConsentAccept`      | This method is invoked when the user accepts a file consent card. |
| fileConsent/invoke              | `handleTeamsFileConsent`            | This method is invoked when a file consent card activity is received from the connector. |
| fileConsent/invoke              | `handleTeamsFileConsentDecline`     | This method is invoked when the user declines a file consent card. |
| actionableMessage/executeAction | `handleTeamsO365ConnectorCardAction` | This method is invoked when a connector card for Microsoft 365 Groups action activity is received from the connector. |
| signin/verifyState              | `handleTeamsSigninVerifyState`      | This method is invoked when a `signIn` verify state activity is received from the connector. |
| task/fetch                      | `handleTeamsTaskModuleFetch`        | This method can be overridden in a derived class to provide logic when a dialog is fetched. |
| task/submit                     | `handleTeamsTaskModuleSubmit`       | This method can be overridden in a derived class to provide logic when a dialog is submitted. |

The invoke activities listed in this section are for conversational bots in Teams. The Bot Framework SDK also supports invoke activities specific to message extensions. For more information, see [what are message extensions](../messaging-extensions/what-are-messaging-extensions.md).

# [Python](#tab/python)

#### Core Bot Framework handlers

>[!NOTE]
> Except for the **added** and **removed** members' activities, all the activity handlers described in this section continue to work as they do with a non-Teams bot.

Activity handlers are different in context of a team, where the new member is added to the team instead of a message thread.

The list of handlers defined in `ActivityHandler` includes the following events:

| Event | Handler | Description |
| :-- | :-- | :-- |
| Any activity type received | `on_turn` | This method calls one of the other handlers, based on the type of activity received. |
| Message activity received | `on_message_activity` | This method can be overridden to handle a `Message` activity. |
| Conversation update activity received | `on_conversation_update_activity` | This method calls a handler if members other than the bot join or leave the conversation. |
| Non-bot members joined the conversation | `on_members_added_activity` | This method can be overridden to handle members joining a conversation. |
| Non-bot members left the conversation | `on_members_removed_activity` | This method can be overridden to handle members leaving a conversation. |
| Event activity received | `on_event_activity` | This method calls a handler specific to the type of event. |
| Token-response event activity received | `on_token_response_event` | This method can be overridden to handle token response events. |
| Non-token-response event activity received | `on_event` | This method can be overridden to handle other types of events. |
| Other activity types received | `on_unrecognized_activity_type` | This method can be overridden to handle any type of activity that isn't handled. |

#### Teams specific activity handlers

The `TeamsActivityHandler` extends the list of handlers from the core Bot Framework handlers section to include the following events:

| Event | Handler | Description |
| :-- | :-- | :-- |
| channelCreated | `on_teams_channel_created` | This method can be overridden to handle a Teams channel being created. For more information, see [channel created](https://aka.ms/azure-bot-subscribe-to-conversation-events#channel-created) in [Conversation update events](how-to/conversations/subscribe-to-conversation-events.md#conversation-update-events). |
| channelDeleted | `on_teams_channel_deleted` | This method can be overridden to handle a Teams channel being deleted. For more information, see [channel deleted](https://aka.ms/azure-bot-subscribe-to-conversation-events#channel-deleted) in [Conversation update events](how-to/conversations/subscribe-to-conversation-events.md#conversation-update-events).|
| channelRenamed | `on_teams_channel_renamed` | This method can be overridden to handle a Teams channel being renamed. For more information, see [channel renamed](https://aka.ms/azure-bot-subscribe-to-conversation-events#channel-renamed) in [Conversation update events](how-to/conversations/subscribe-to-conversation-events.md#conversation-update-events).|
| teamRenamed | `on_teams_team_renamed` | This method can be overridden to handle a Teams team being renamed. For more information, see [team renamed](https://aka.ms/azure-bot-subscribe-to-conversation-events#team-renamed) in [Conversation update events](how-to/conversations/subscribe-to-conversation-events.md#conversation-update-events).|
| MembersAdded | `on_teams_members_added` | This method calls the `OnMembersAddedAsync` method in `ActivityHandler`. The method can be overridden to handle members joining a team. For more information, see [team members added](how-to/conversations/subscribe-to-conversation-events.md#members-added) in [Conversation update events](how-to/conversations/subscribe-to-conversation-events.md#conversation-update-events).|
| MembersRemoved | `on_teams_members_removed` | This method calls the `OnMembersRemovedAsync` method in `ActivityHandler`. The method can be overridden to handle members leaving a team. For more information, see [team members removed](how-to/conversations/subscribe-to-conversation-events.md#members-removed) in [Conversation update events](how-to/conversations/subscribe-to-conversation-events.md#conversation-update-events).|

#### Teams invoke activities

The list of Teams activity handlers called from the `on_invoke_activity` Teams activity handler includes the following invoke types:

| Invoke types                    | Handler                              | Description                                                  |
| :-----------------------------  | :----------------------------------- | :----------------------------------------------------------- |
| CardAction.Invoke               | `on_teams_card_action_invoke`       | This method is invoked when a card action invoke activity is received from the connector. |
| fileConsent/invoke              | `on_teams_file_consent_accept`      | This method is invoked when the user accepts a file consent card. |
| fileConsent/invoke              | `on_teams_file_consent`            | This method is invoked when a file consent card activity is received from the connector. |
| fileConsent/invoke              | `on_teams_file_consent_decline`     | This method is invoked when the user declines a file consent card. |
| actionableMessage/executeAction | `on_teams_o365_connector_card_action` | This method is invoked when a connector card for Microsoft 365 Groups action activity is received from the connector. |
| signin/verifyState              | `on_teams_signin_verify_state`      | This method is invoked when a `signIn` verify state activity is received from the connector. |
| task/fetch                      | `on_teams_task_module_fetch`        | This method can be overridden in a derived class to provide logic when a dialog is fetched. |
| task/submit                     | `on_teams_task_module_submit`       | This method can be overridden in a derived class to provide logic when a dialog is submitted. |

The invoke activities listed in this section are for conversational bots in Teams. The Bot Framework SDK also supports invoke activities specific to message extensions. For more information, see [what are message extensions](../messaging-extensions/what-are-messaging-extensions.md).

---

---

Now that you've familiarized yourself with bot activity handlers, let us see how bots behave differently depending on the conversation and the messages it receives or sends.

## Recommendations

An extensive dialog between your bot and the user is a slow and complex way to get a task completed. A bot that supports excessive commands, especially a broad range of commands, isn't successful or viewed positively by users.

* **Avoid multi-turn experiences in chat**
  An extensive dialog requires the developer to maintain state. To exit this state, a user must either time out or select **Cancel**. Also, the process is tedious. For example, see the following conversation scenario:

    USER: Schedule a meeting with Megan.

    BOT: I’ve found 200 results, include a first and last name.

    USER: Schedule a meeting with Megan Bowen.

    BOT: OK, what time would you like to meet with Megan Bowen?

    USER: 1:00 pm.

    BOT: On which day?

* **Support six or less frequent commands**
  As there are only six visible commands in the current bot menu, anything more is unlikely to be used with any frequency. Bots that go deep into a specific area rather than trying to be a broad assistant work and fare better.

* **Optimize size of knowledgebase for quicker interaction**
  One of the disadvantages of bots is that it's difficult to maintain a large retrieval knowledge base with unranked responses. Bots are best suited for short, quick interactions, and not sifting through long lists looking for an answer.

## Explore other bot features

## Code sample

|Sample name | Description | .NET | Node.js | Python|
|----------------|-----------------|--------------|----------------|-------|
| Teams conversation bot | This sample app shows how to use different bot conversation events available in Bot Framework v4. |[View](https://github.com/OfficeDev/Microsoft-Teams-Samples/tree/main/samples/bot-conversation/csharp)|[View](https://github.com/OfficeDev/Microsoft-Teams-Samples/tree/main/samples/bot-conversation/nodejs)|[View](https://github.com/OfficeDev/Microsoft-Teams-Samples/tree/main/samples/bot-conversation/python)|
| Bot samples | Set of Bot Framework v4 samples. | [View](https://github.com/OfficeDev/Microsoft-Teams-Samples#bots-samples-using-the-v4-sdk) |[View](https://github.com/OfficeDev/Microsoft-Teams-Samples#bots-samples-using-the-v4-sdk)|[View](https://github.com/OfficeDev/Microsoft-Teams-Samples#bots-samples-using-the-v4-sdk)|

## Next step

## See also
