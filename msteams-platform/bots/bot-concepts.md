---
title: Activity Handlers and Bot Logic
description: Learn about bot events and activity handlers for messages, channels, teams, members, mentions, auth, and card actions.
ms.topic: conceptual
ms.localizationpriority: medium
ms.author: surbhigupta
ms.date: 10/03/2024
---

# Manage user interactions

A bot's interactions can be using text, speech, images, or video. It processes the user's input to understand their request and evaluates the input to perform relevant tasks. A bot may request information or enable access to services, and responds to the user.

To develop a bot app that meets your needs, it's important to get to know the Teams activity handler and bot logic.

## Organizing Conversational Logic

The activity handler plays a crucial role in organizing the conversational logic for your bot. In the context of Teams bots, activities are managed through two main components: Teams activity handlers and the bot's logic.

- **Teams Activity Handlers**:
  Teams activity handlers extend the functionality of standard bots by adding support for Teams-specific events and interactions. These events can include channel creation, team member additions, and other actions unique to the Teams environment. By utilizing Teams activity handlers, bots can provide a more integrated and seamless user experience within the Teams platform.

- **Bot Logic**:
  The bot object, which houses the bot’s conversational logic, is responsible for making decisions based on user input. It exposes a turn handler, which is the method that accepts incoming activities from the bot adapter. The bot logic ensures that each turn of the conversation is handled appropriately, contributing to the bot's overall coherence and effectiveness.

These two components work together to create a smooth and engaging conversational experience. The activity handler processes what the user says, while the bot logic figures out the best response. Together, they enable:

- Understanding the context of the conversation
- Personalizing interactions
- Retrieving information efficiently
- Maintaining an adaptive conversational flow

By understanding the activity handler and bot logic, you can design and implement smart, user-friendly conversational AI and non-AI bot solutions.

## Teams activity handler

At the heart of a bots’ functionality lies the activity handler, a component that is pivotal in managing and processing user interactions. It is derived from Microsoft Bot Framework's activity handler. It routes all Teams activities before allowing any non-Teams specific activities to be handled. It acts as an intermediary between the user's input and the bot's response, and enables the bot to respond accordingly.

The key functions that an activity handler facilitates for AI and non-AI bots include:

- Receiving incoming messages from the user.
- Retrieving specific or key data from the user input.
- Identifying the user intent through Natural Language Processing (NLP) for AI bots.
- Maintaining conversation context and state.
- Generating bot response based on user input and intent.

Activity handler enables:

- Improved user experience
- Better efficiency
- Enhanced accuracy
- Scalabilty
- Flexibility

When a bot for Teams receives an activity, it's routed to the activity handlers. All activities are routed through one base handler called the turn handler. The turn handler calls the required activity handler to manage any activity received. The Teams bot is derived from `TeamsActivityHandler` class, which is derived from the Bot Framework's `ActivityHandler` class.

> [!NOTE]
> If the bot activity takes more than 15 seconds to process, Teams sends a retry request to bot endpoint. You might see duplicate requests in your bot.

# [C#](#tab/csharp)

Bots are created using the Bot Framework. If the bots receive a message activity, then the turn handler receives a notification of that incoming activity. The turn handler then sends the incoming activity to the `OnMessageActivityAsync` activity handler. In Teams, this functionality remains the same. If the bot receives a conversation update activity, then the turn handler receives a notification of that incoming activity and sends the incoming activity to `OnConversationUpdateActivityAsync`. The Teams activity handler first checks for any Teams specific events. If no events are found, it then passes them along to the Bot Framework's activity handler.

In the Teams activity handler class, there are two primary Teams activity handlers, `OnConversationUpdateActivityAsync` and `OnInvokeActivityAsync`. `OnConversationUpdateActivityAsync` routes all conversation update activities and `OnInvokeActivityAsync` routes all Teams invoke activities.

To implement your logic for Teams specific activity handlers, you must override the methods in your bot as shown in the [bot logic](#bot-logic) section. There's no base implementation for these handlers. Therefore, add the logic that you want in your override.

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

## Bot logic

## Next step

## See also
