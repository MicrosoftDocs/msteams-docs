---
title: Bot activity handlers
author: surbhigupta
description: Learn about Microsoft Teams events and activity handlers for messages, channels, teams, members, mentions, auth, card actions using Microsoft Bot Framework SDK.
ms.topic: conceptual
ms.localizationpriority: medium
ms.author: anclear
---

# Bot activity handlers

This document builds on the article on [how bots work](/azure/bot-service/bot-builder-basics?view=azure-bot-service-4.0&preserve-view=true) in the core [Bot Framework documentation](/azure/bot-service/?view=azure-bot-service-4.0&preserve-view=true). The primary difference between bots developed for Microsoft Teams and the core Bot Framework is in the features provided in Teams.

An activity handler is used to organize the conversational logic for your bot. Activities are handled in two ways using Teams activity handlers and bot logic. The Teams activity handler adds support for Teams-specific events and interactions. The bot object contains the conversational reasoning or logic for a turn and exposes a turn handler, which is the method that can accept incoming activities from the bot adapter.

## Teams activity handlers

Teams activity handler is derived from Microsoft Bot Framework's activity handler. It routes all Teams activities before allowing any non-Teams specific activities to be handled.

When a bot for Teams receives an activity, it's routed to the activity handlers. All activities are routed through one base handler called the turn handler. The turn handler calls the required activity handler to manage any activity received. The Teams bot is derived from `TeamsActivityHandler` class, which is derived from the Bot Framework's `ActivityHandler` class.

> [!NOTE]
> If the bot activity takes more than 15 seconds to process, Teams send a retry request to bot endpoint. Hence, you'll see duplicate requests in your bot.

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

In the Teams activity handler class, there are two primary Teams activity handlers, `on_conversation_update_activity` and `on_invoke_activity`. `on_conversation_update_activity` routes all conversation update activities and `on_invoke_activity` routes all Teams invokes activities.

To implement your logic for Teams specific activity handlers, you must override the methods in your bot as shown in the [bot logic](#bot-logic) section. There's no base implementation for these handlers. Therefore, add the logic that you want in your override.

---

## Bot logic

The bot logic processes incoming activities from one or more of your bot channels and in response generates outgoing activities. It's still true of bots derived from the Teams activity handler class, which first checks for Teams activities. After checking for Teams activities, it passes all other activities to the Bot Framework's activity handler.

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
| Non-bot members joined the conversation | `OnMembersAddedAsync` | You can override this method to handle members joining a conversation. |
| Non-bot members left the conversation | `OnMembersRemovedAsync` | You can override this method to handle members leaving a conversation. |
| Event activity received | `OnEventActivityAsync` | This method calls a handler specific to the event type, on an `Event` activity. |
| Token-response event activity received | `OnTokenResponseEventAsync` | You can override this method to handle token response events. |
| Non-token-response event activity received | `OnEventAsync` | You can override this method to handle other types of events. |
| Other activity type received | `OnUnrecognizedActivityTypeAsync` | You can override this method to handle any activity type otherwise unhandled. |

#### Teams specific activity handlers

The `TeamsActivityHandler` extends the list of handlers in the core Bot Framework handlers section to include the following events:

| Event | Handler | Description |
| :-- | :-- | :-- |
| channelCreated | `OnTeamsChannelCreatedAsync` | You can override this method to handle a Teams channel being created. For more information, see [channel created](https://aka.ms/azure-bot-subscribe-to-conversation-events#channel-created) in [conversation update events](https://aka.ms/azure-bot-subscribe-to-conversation-events). |
| channelDeleted | `OnTeamsChannelDeletedAsync` | You can override this method to handle a Teams channel being deleted. For more information, see [channel deleted](https://aka.ms/azure-bot-subscribe-to-conversation-events#channel-deleted) in [conversation update events](https://aka.ms/azure-bot-subscribe-to-conversation-events).|
| channelRenamed | `OnTeamsChannelRenamedAsync` | You can override this method to handle a Teams channel being renamed. For more information, see [channel renamed](https://aka.ms/azure-bot-subscribe-to-conversation-events#channel-renamed) in [conversation update events](https://aka.ms/azure-bot-subscribe-to-conversation-events).|
| teamRenamed | `OnTeamsTeamRenamedAsync` | `return Task.CompletedTask;` You can override this method to handle a Teams team being renamed. For more information, see [team renamed](https://aka.ms/azure-bot-subscribe-to-conversation-events#team-renamed) in [conversation update events](https://aka.ms/azure-bot-subscribe-to-conversation-events).|
| MembersAdded | `OnTeamsMembersAddedAsync` | This method calls the `OnMembersAddedAsync` method in `ActivityHandler`. You can override this method to handle members joining a team. For more information, see [team members added](https://aka.ms/azure-bot-subscribe-to-conversation-events#team-members-added) in [conversation update events](https://aka.ms/azure-bot-subscribe-to-conversation-events).|
| MembersRemoved | `OnTeamsMembersRemovedAsync` | This method calls the `OnMembersRemovedAsync` method in `ActivityHandler`. You can override this method to handle members leaving a team. For more information, see [team members removed](https://aka.ms/azure-bot-subscribe-to-conversation-events#team-members-removed) in [conversation update events](https://aka.ms/azure-bot-subscribe-to-conversation-events).|
| messageEdit | `OnTeamsMessageEditAsync` | You can override this method to handle a Teams message edit event. |
| messageUndelete | `OnTeamsMessageUndeleteAsync` | You can override this method to handle a Teams message undelete event. |
| messageSoftDelete | `OnTeamsMessageSoftDeleteAsync` | You can override this method to handle a Teams message soft delete event. |

#### Teams invoke activities

The list of Teams activity handlers called from the `OnInvokeActivityAsync` Teams activity handler includes the following invoke types:

| Invoke types                    | Handler                              | Description                                                  |
| :-----------------------------  | :----------------------------------- | :----------------------------------------------------------- |
| CardAction.Invoke               | `OnTeamsCardActionInvokeAsync`       | This method is invoked when a card action invoke activity is received from the connector. |
| fileConsent/invoke              | `OnTeamsFileConsentAcceptAsync`      | This method is invoked when a file consent card is accepted by the user. |
| fileConsent/invoke              | `OnTeamsFileConsentAsync`            | This method is invoked when a file consent card activity is received from the connector. |
| fileConsent/invoke              | `OnTeamsFileConsentDeclineAsync`     | This method is invoked when a file consent card is declined by the user. |
| actionableMessage/executeAction | `OnTeamsO365ConnectorCardActionAsync` | This method is invoked when a connector card for Microsoft 365 Groups action activity is received from the connector. |
| signin/verifyState              | `OnTeamsSigninVerifyStateAsync`      | This method is invoked when a signIn verify state activity is received from the connector. |
| task/fetch                      | `OnTeamsTaskModuleFetchAsync`        | You can override this method in a derived class to provide logic when a task module is fetched. |
| task/submit                     | `OnTeamsTaskModuleSubmitAsync`       | You can override this method in a derived class to provide logic when a task module is submitted. |

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

#### Teams specific activity handlers

The `TeamsActivityHandler` extends the list of handlers in the core Bot Framework handlers section to include the following events:

| Event | Handler | Description |
| :-- | :-- | :-- |
| channelCreated | `OnTeamsChannelCreatedAsync` | You can override this method to handle a Teams channel being created. For more information, see [channel created](https://aka.ms/azure-bot-subscribe-to-conversation-events#channel-created) in [conversation update events](https://aka.ms/azure-bot-subscribe-to-conversation-events). |
| channelDeleted | `OnTeamsChannelDeletedAsync` | You can override this method to handle a Teams channel being deleted. For more information, see [channel deleted](https://aka.ms/azure-bot-subscribe-to-conversation-events#channel-deleted) in [conversation update events](https://aka.ms/azure-bot-subscribe-to-conversation-events).|
| channelRenamed | `OnTeamsChannelRenamedAsync` | You can override this method to handle a Teams channel being renamed. For more information, see [channel renamed](https://aka.ms/azure-bot-subscribe-to-conversation-events#channel-renamed) in [conversation update events](https://aka.ms/azure-bot-subscribe-to-conversation-events). |
| teamRenamed | `OnTeamsTeamRenamedAsync` | `return Task.CompletedTask;` You can override this method to handle a Teams team being renamed. For more information, see [team renamed](https://aka.ms/azure-bot-subscribe-to-conversation-events#team-renamed) in [conversation update events](https://aka.ms/azure-bot-subscribe-to-conversation-events). |
| MembersAdded | `OnTeamsMembersAddedAsync` | This method calls the `OnMembersAddedAsync` method in `ActivityHandler`. You can override this method to handle members joining a team. For more information, see [team members added](https://aka.ms/azure-bot-subscribe-to-conversation-events#team-members-added) in [conversation update events](https://aka.ms/azure-bot-subscribe-to-conversation-events). |
| MembersRemoved | `OnTeamsMembersRemovedAsync` | This method calls the `OnMembersRemovedAsync` method in `ActivityHandler`. You can override this method to handle members leaving a team. For more information, see [team members removed](https://aka.ms/azure-bot-subscribe-to-conversation-events#team-members-removed) in [conversation update events](https://aka.ms/azure-bot-subscribe-to-conversation-events). |
| message edit | `onTeamsMessageEditEvent` | You can override this method to handle when a message in a conversation is edited. |
| message undelete | `onTeamsMessageUndeleteEvent` | You can override this method to handle when a deleted message in a conversation is undeleted. For example, when the user decides to undo a deleted message. |
| message soft delete | `onTeamsMessageSoftDeleteEvent` | You can override this method to handle when a message in a conversation is soft deleted. |

#### Teams invoke activities

The list of Teams activity handlers called from the `onInvokeActivity` Teams activity handler includes the following:

| Invoke types                    | Handler                              | Description                                                  |
| :-----------------------------  | :----------------------------------- | :----------------------------------------------------------- |
| CardAction.Invoke               | `handleTeamsCardActionInvoke`       | This method is invoked when a card action invoke activity is received from the connector. |
| fileConsent/invoke              | `handleTeamsFileConsentAccept`      | This method is invoked when a file consent card is accepted by the user. |
| fileConsent/invoke              | `handleTeamsFileConsent`            | This method is invoked when a file consent card activity is received from the connector. |
| fileConsent/invoke              | `handleTeamsFileConsentDecline`     | This method is invoked when a file consent card is declined by the user. |
| actionableMessage/executeAction | `handleTeamsO365ConnectorCardAction` | This method is invoked when a connector card for Microsoft 365 Groups action activity is received from the connector. |
| signin/verifyState              | `handleTeamsSigninVerifyState`      | This method is invoked when a signIn verify state activity is received from the connector. |
| task/fetch                      | `handleTeamsTaskModuleFetch`        | You can override this method in a derived class to provide logic when a task module is fetched. |
| task/submit                     | `handleTeamsTaskModuleSubmit`       | You can override this method in a derived class to provide logic when a task module is submitted. |

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
| Message activity received | `on_message_activity` | You can override this method to handle a `Message` activity. |
| Conversation update activity received | `on_conversation_update_activity` | This method calls a handler if members other than the bot join or leave the conversation. |
| Non-bot members joined the conversation | `on_members_added_activity` | You can override this method to handle members joining a conversation. |
| Non-bot members left the conversation | `on_members_removed_activity` | You can override this method to handle members leaving a conversation. |
| Event activity received | `on_event_activity` | This method calls a handler specific to the type of event. |
| Token-response event activity received | `on_token_response_event` | You can override this method to handle token response events. |
| Non-token-response event activity received | `on_event` | You can override this method to handle other types of events. |
| Other activity types received | `on_unrecognized_activity_type` | You can override this method to handle any type of activity that isn't handled. |

#### Teams specific activity handlers

The `TeamsActivityHandler` extends the list of handlers from the core Bot Framework handlers section to include the following events:

| Event | Handler | Description |
| :-- | :-- | :-- |
| channelCreated | `on_teams_channel_created` | You can override this method to handle a Teams channel being created. For more information, see [channel created](https://aka.ms/azure-bot-subscribe-to-conversation-events#channel-created) in [conversation update events](https://aka.ms/azure-bot-subscribe-to-conversation-events). |
| channelDeleted | `on_teams_channel_deleted` | You can override this method to handle a Teams channel being deleted. For more information, see [channel deleted](https://aka.ms/azure-bot-subscribe-to-conversation-events#channel-deleted) in [conversation update events](https://aka.ms/azure-bot-subscribe-to-conversation-events).|
| channelRenamed | `on_teams_channel_renamed` | You can override this method to handle a Teams channel being renamed. For more information, see [channel renamed](https://aka.ms/azure-bot-subscribe-to-conversation-events#channel-renamed) in [conversation update events](https://aka.ms/azure-bot-subscribe-to-conversation-events).|
| teamRenamed | `on_teams_team_renamed` | `return Task.CompletedTask;` You can override this method to handle a Teams team being renamed. For more information, see [team renamed](https://aka.ms/azure-bot-subscribe-to-conversation-events#team-renamed) in [conversation update events](https://aka.ms/azure-bot-subscribe-to-conversation-events).|
| MembersAdded | `on_teams_members_added` | This method calls the `OnMembersAddedAsync` method in `ActivityHandler`. You can override this method to handle members joining a team. For more information, see [team members added](https://aka.ms/azure-bot-subscribe-to-conversation-events#team-members-added) in [conversation update events](https://aka.ms/azure-bot-subscribe-to-conversation-events).|
| MembersRemoved | `on_teams_members_removed` | This method calls the `OnMembersRemovedAsync` method in `ActivityHandler`. You can override this method to handle members leaving a team. For more information, see [team members removed](https://aka.ms/azure-bot-subscribe-to-conversation-events#team-members-removed) in [conversation update events](https://aka.ms/azure-bot-subscribe-to-conversation-events).|

#### Teams invoke activities

The list of Teams activity handlers called from the `on_invoke_activity` Teams activity handler includes the following invoke types:

| Invoke types                    | Handler                              | Description                                                  |
| :-----------------------------  | :----------------------------------- | :----------------------------------------------------------- |
| CardAction.Invoke               | `on_teams_card_action_invoke`       | This method is invoked when a card action invoke activity is received from the connector. |
| fileConsent/invoke              | `on_teams_file_consent_accept`      | This method is invoked when a file consent card is accepted by the user. |
| fileConsent/invoke              | `on_teams_file_consent`            | This method is invoked when a file consent card activity is received from the connector. |
| fileConsent/invoke              | `on_teams_file_consent_decline`     | This method is invoked when a file consent card is declined by the user. |
| actionableMessage/executeAction | `on_teams_o365_connector_card_action` | This method is invoked when a connector card for Microsoft 365 Groups action activity is received from the connector. |
| signin/verifyState              | `on_teams_signin_verify_state`      | This method is invoked when a signIn verify state activity is received from the connector. |
| task/fetch                      | `on_teams_task_module_fetch`        | You can override this method in a derived class to provide logic when a task module is fetched. |
| task/submit                     | `on_teams_task_module_submit`       | You can override this method in a derived class to provide logic when a task module is submitted. |

The invoke activities listed in this section are for conversational bots in Teams. The Bot Framework SDK also supports invoke activities specific to message extensions. For more information, see w[hat are message extensions](../messaging-extensions/what-are-messaging-extensions.md).

---

---

Now that you've familiarized yourself with bot activity handlers, let us see how bots behave differently depending on the conversation and the messages it receives or sends.

## Next step

> [!div class="nextstepaction"]
> [Conversation basics](~/bots/how-to/conversations/conversation-basics.md)

## See also

* [Build bots for Teams](what-are-bots.md)
* [Teams JavaScript client SDK](../tabs/how-to/using-teams-client-sdk.md)
* [App manifest schema for Teams](../resources/schema/manifest-schema.md)
* [API reference for the Bot Framework Connector service](/azure/bot-service/rest-api/bot-framework-rest-connector-api-reference)
* [Get Teams specific context for your bot](how-to/get-teams-context.md)
* [Messages in bot conversations](how-to/conversations/conversation-messages.md)
