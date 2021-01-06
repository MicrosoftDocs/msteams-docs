---
title: Bot basics
author: clearab
description: Understand the basics of bots in Teams.
ms.topic: conceptual
ms.author: anclear
---
# Bot basics

This document provides an introduction to bots in Microsoft Teams that builds on the article [How bots work](https://aka.ms/how-bots-work) in the core [Bot Framework documentation](https://aka.ms/azure-bot-service-docs). You may find that article, and other articles in the *Concepts* section, useful.

In bots developed for Teams, the primary difference is in how the activities are handled. The Teams activity handler derives from the Microsoft Bot Framework's activity handler. It routes all Teams activities before allowing any non-Teams specific activities to be handled.

## Teams Activity handlers

When a bot for Teams receives an activity, it passes it on to its *activity handlers*. Under the covers, there's one base handler called the *turn handler*, through which all activities are routed. The *turn handler* calls the required activity handler to handle whatever type of activity was received. Where a bot designed for Teams differs is that it is derived from `TeamsActivityHandler` class that is derived from the Bot Framework's `ActivityHandler` class.

# [C#](#tab/csharp)

Bots are created using the Bot Framework, if these bots receives a message activity, then the turn handler receives a notification of that incoming activity. The turn handler then sends the incoming activity to the `OnMessageActivityAsync` activity handler. In Teams, this functionality remains the same. If the bot receives a conversation update activity, then the turn handler receives a notification of that incoming activity and sends the incoming activity to `OnConversationUpdateActivityAsync`. The Teams activity handler will first check for any Teams specific events. If no events are found, it will then pass them along to the Bot Framework's activity handler.

In the Teams activity handler class, there are two primary Teams activity handlers, `OnConversationUpdateActivityAsync` and `OnInvokeActivityAsync`. `OnConversationUpdateActivityAsync` routes all conversation update activities and `OnInvokeActivityAsync` routes all Teams invoke activities.

To implement your logic for Teams specific activity handlers, you need to override these methods in your bot as shown in the [Bot logic](#bot-logic) section. There is no base implementation for these handlers, therefore, you need to add the logic that you want in your override.

# [JavaScript](#tab/javascript)

Bots are created using the Bot Framework, if these bots receives a message activity, then the turn handler receives a notification of that incoming activity. The turn handler then sends the incoming activity to the `onMessage` activity handler. In Teams, this functionality remains the same. If the bot receives a conversation update activity, then the turn handler receives a notification of that incoming activity and sends the incoming activity to `dispatchConversationUpdateActivity`. The Teams activity handler will first check for any Teams specific events. If no events are found, it will then pass them along to the Bot Framework's activity handler.

In the Teams activity handler class, there are two primary Teams activity handlers, `dispatchConversationUpdateActivity` and `onInvokeActivity`. `dispatchConversationUpdateActivity` routes all conversation update Activities, and `onInvokeActivity` routes all Teams invoke activities.

To implement your logic for Teams specific activity handlers, you need to override these methods in your bot as shown in the [Bot logic](#bot-logic) section. Define your bot logic for these handlers, then **be sure to call `next()` at the end**. By calling `next()` you ensure that the next handler runs.

# [Python](#tab/python)

Bots are created using the Bot Framework, if these bots receive a message activity, then the turn handler receives a notification of that incoming activity. The turn handler then sends the incoming activity to the `on_message_activity` activity handler. In Teams, this functionality remains the same. If the bot receives a conversation update activity, then the turn handler receives a notification of that incoming activity and sends the incoming activity to `on_conversation_update_activity`. The Teams activity handler will first check for any Teams specific events. If no events are found, it will then pass them along to the Bot Framework's activity handler.

In the Teams activity handler class, there are two primary Teams activity handlers, `on_conversation_update_activity` and `on_invoke_activity`. `on_conversation_update_activity` routes all conversation update activities and `on_invoke_activity` routes all Teams invoke activities.

To implement your logic for Teams specific activity handlers, you need to override these methods in your bot as shown in the [Bot logic](#bot-logic) section. There is no base implementation for these handlers, therefore, you need to add the logic that you want in your override.

---

## Bot logic

The bot logic processes incoming activities from one or more of your bot channels and in response generates outgoing activities.  This is still true of bots derived from the Teams activity handler class, which first checks for Teams activities. It then passes all other activities to the Bot Framework's activity handler.

# [C#](#tab/csharp)

#### Core Bot Framework handlers

>[!NOTE]
> Except for the *added* and *removed* members' activities, all of the activity handlers described in this section continue to work as they do with a non-Teams bot.

Activity handlers are different in context of a team, where the new member is added to the team instead of a message thread.

The list of handlers defined in `ActivityHandler` include the following:

| Event | Handler | Description |
| :-- | :-- | :-- |
| Any activity type received | `OnTurnAsync` | Calls one of the other handlers, based on the type of activity received. |
| Message activity received | `OnMessageActivityAsync` | Overrides this to handle a `Message` activity. |
| Conversation update activity received | `OnConversationUpdateActivityAsync` | On a `ConversationUpdate` activity, calls a handler if members other than the bot joined or left the conversation. |
| Non-bot members joined the conversation | `OnMembersAddedAsync` | Overrides this to handle members joining a conversation. |
| Non-bot members left the conversation | `OnMembersRemovedAsync` | Overrides this to handle members leaving a conversation. |
| Event activity received | `OnEventActivityAsync` | Calls a handler specific to the event type, on an `Event` activity. |
| Token-response event activity received | `OnTokenResponseEventAsync` | Overrides this to handle token response events. |
| Non-token-response event activity received | `OnEventAsync` | Overrides this to handle other types of events. |
| Other activity type received | `OnUnrecognizedActivityTypeAsync` | Overrides this to handle any activity type otherwise unhandled. |

#### Teams-specific handlers

The `TeamsActivityHandler` extends the list of handlers in the Core Bot Framework handlers section to include the following:

| Event | Handler | Description |
| :-- | :-- | :-- |
| channelCreated | `OnTeamsChannelCreatedAsync` | Overrides this to handle a Teams channel being created. For more information, see [Channel created](https://aka.ms/azure-bot-subscribe-to-conversation-events#channel-created) in [Conversation update events](https://aka.ms/azure-bot-subscribe-to-conversation-events). |
| channelDeleted | `OnTeamsChannelDeletedAsync` | Overrides this to handle a Teams channel being deleted. For more information, see [Channel deleted](https://aka.ms/azure-bot-subscribe-to-conversation-events#channel-deleted) in [Conversation update events](https://aka.ms/azure-bot-subscribe-to-conversation-events).|
| channelRenamed | `OnTeamsChannelRenamedAsync` | Overrides this to handle a Teams channel being renamed. For more information, see [Channel renamed](https://aka.ms/azure-bot-subscribe-to-conversation-events#channel-renamed) in [Conversation update events](https://aka.ms/azure-bot-subscribe-to-conversation-events).|
| teamRenamed | `OnTeamsTeamRenamedAsync` | `return Task.CompletedTask;` Overrides this to handle a Teams Team being Renamed. For more information, see [Team renamed](https://aka.ms/azure-bot-subscribe-to-conversation-events#team-renamed) in [Conversation update events](https://aka.ms/azure-bot-subscribe-to-conversation-events).|
| MembersAdded | `OnTeamsMembersAddedAsync` | Calls the `OnMembersAddedAsync` method in `ActivityHandler`. Override this to handle members joining a team. For more information, see [Team members added](https://aka.ms/azure-bot-subscribe-to-conversation-events#team-members-added) in [Conversation update events](https://aka.ms/azure-bot-subscribe-to-conversation-events).|
| MembersRemoved | `OnTeamsMembersRemovedAsync` | Calls the `OnMembersRemovedAsync` method in `ActivityHandler`. Override this to handle members leaving a team. For more information, see [Team members removed](https://aka.ms/azure-bot-subscribe-to-conversation-events#team-members-removed) in [Conversation update events](https://aka.ms/azure-bot-subscribe-to-conversation-events).|

#### Teams invoke activities

The list of Teams activity handlers called from the `OnInvokeActivityAsync` Teams activity handler include the following:

| Invoke types                    | Handler                              | Description                                                  |
| :-----------------------------  | :----------------------------------- | :----------------------------------------------------------- |
| CardAction.Invoke               | `OnTeamsCardActionInvokeAsync`       | Is invoked when a card action invoke activity is received from the connector. |
| fileConsent/invoke              | `OnTeamsFileConsentAcceptAsync`      | Is invoked when a file consent card is accepted by the user. |
| fileConsent/invoke              | `OnTeamsFileConsentAsync`            | Is invoked when a file consent card activity is received from the connector. |
| fileConsent/invoke              | `OnTeamsFileConsentDeclineAsync`     | Is invoked when a file consent card is declined by the user. |
| actionableMessage/executeAction | `OnTeamsO365ConnectorCardActionAsync` | Is invoked when a O365 Connector Card Action activity is received from the connector. |
| signin/verifyState              | `OnTeamsSigninVerifyStateAsync`      | Is invoked when a signIn verify state activity is received from the connector. |
| task/fetch                      | `OnTeamsTaskModuleFetchAsync`        | Overrides this in a derived class to provide logic for when a task module is fetched. |
| task/submit                     | `OnTeamsTaskModuleSubmitAsync`       | Overrides this in a derived class to provide logic for when a task module is submitted. |

The invoke activities listed in this section are for conversational bots in Teams. The Bot Framework SDK also supports invoke activities specific to messaging extensions. For more information see [What are messaging extensions](https://aka.ms/azure-bot-what-are-messaging-extensions).

# [JavaScript](#tab/javascript)

#### Core Bot Framework handlers

>[!NOTE]
> Except for the *added* and *removed* members' activities, all of the activity handlers described in this section continue to work as they do with a non-Teams bot.

Activity handlers are different in context of a team, where the new member is added to the team instead of a message thread.

The list of handlers defined in `ActivityHandler` include the following:

| Event | Handler | Description |
| :-- | :-- | :-- |
| Any activity type received | `onTurn` | Calls one of the other handlers, based on the type of activity received. |
| Message activity received | `onMessage` | Provides a function for this to handle a `Message` activity. |
| Conversation update activity received | `onConversationUpdate` | Calls a handler if members other than the bot joined or left the conversation, on a `ConversationUpdate` activity. |
| Non-bot members joined the conversation | `onMembersAdded` | Provides a function for this to handle members joining a conversation. |
| Non-bot members left the conversation | `onMembersRemoved` | Provides a function for this to handle members leaving a conversation. |
| Event activity received | `onEvent` | Calls a handler specific to the event type, on an `Event` activity. |
| Token-response event activity received | `onTokenResponseEvent` | Provides a function for this to handle token response events. |
| Other activity type received | `onUnrecognizedActivityType` | Provides a function for this to handle any activity type otherwise unhandled. |
| Activity handlers have completed | `onDialog` | Provides a function for this to handle any processing that should be done at the end of a turn after the rest of your activity handlers have completed. |

#### Teams-specific handlers

The `TeamsActivityHandler` extends the list of handlers in the Core Bot Framework handlers section to include the following:

| Event | Handler | Description |
| :-- | :-- | :-- |
| channelCreated | `OnTeamsChannelCreatedAsync` | Overrides this to handle a Teams channel being created. For more information, see [Channel created](https://aka.ms/azure-bot-subscribe-to-conversation-events#channel-created) in [Conversation update events](https://aka.ms/azure-bot-subscribe-to-conversation-events). |
| channelDeleted | `OnTeamsChannelDeletedAsync` | Overrides this to handle a Teams channel being deleted. For more information, see [Channel deleted](https://aka.ms/azure-bot-subscribe-to-conversation-events#channel-deleted) in [Conversation update events](https://aka.ms/azure-bot-subscribe-to-conversation-events).|
| channelRenamed | `OnTeamsChannelRenamedAsync` | Overrides this to handle a Teams channel being renamed. For more information, see [Channel renamed](https://aka.ms/azure-bot-subscribe-to-conversation-events#channel-renamed) in [Conversation update events](https://aka.ms/azure-bot-subscribe-to-conversation-events). |
| teamRenamed | `OnTeamsTeamRenamedAsync` | `return Task.CompletedTask;` Overrides this to handle a Teams team being renamed. For more information, see [Team renamed](https://aka.ms/azure-bot-subscribe-to-conversation-events#team-renamed) in [Conversation update events](https://aka.ms/azure-bot-subscribe-to-conversation-events). |
| MembersAdded | `OnTeamsMembersAddedAsync` | Calls the `OnMembersAddedAsync` method in `ActivityHandler`. Overrides this to handle members joining a team. For more information, see [Team members added](https://aka.ms/azure-bot-subscribe-to-conversation-events#team-members-added) in [Conversation update events](https://aka.ms/azure-bot-subscribe-to-conversation-events). |
| MembersRemoved | `OnTeamsMembersRemovedAsync` | Calls the `OnMembersRemovedAsync` method in `ActivityHandler`. Overrides this to handle members leaving a team. For more information, see [Team members removed](https://aka.ms/azure-bot-subscribe-to-conversation-events#team-members-removed) in [Conversation update events](https://aka.ms/azure-bot-subscribe-to-conversation-events). |

#### Teams invoke activities

The list of Teams activity handlers called from the `onInvokeActivity` Teams activity handler include the following:

| Invoke types                    | Handler                              | Description                                                  |
| :-----------------------------  | :----------------------------------- | :----------------------------------------------------------- |
| CardAction.Invoke               | `handleTeamsCardActionInvoke`       | Is invoked when a card action invoke activity is received from the connector. |
| fileConsent/invoke              | `handleTeamsFileConsentAccept`      | Is invoked when a file consent card is accepted by the user. |
| fileConsent/invoke              | `handleTeamsFileConsent`            | Is invoked when a file consent card activity is received from the connector. |
| fileConsent/invoke              | `handleTeamsFileConsentDecline`     | Is invoked when a file consent card is declined by the user. |
| actionableMessage/executeAction | `handleTeamsO365ConnectorCardAction` | Is invoked when a O365 Connector Card Action activity is received from the connector. |
| signin/verifyState              | `handleTeamsSigninVerifyState`      | Is invoked when a signIn verify state activity is received from the connector. |
| task/fetch                      | `handleTeamsTaskModuleFetch`        | Overrides this in a derived class to provide logic for when a task module is fetched. |
| task/submit                     | `handleTeamsTaskModuleSubmit`       | Overrides this in a derived class to provide logic for when a task module is submitted. |

The invoke activities listed in this section are for conversational bots in Teams. The Bot Framework SDK also supports invoke activities specific to messaging extensions. For more information, see [What are messaging extensions](https://aka.ms/azure-bot-what-are-messaging-extensions).

# [Python](#tab/python)

#### Core Bot Framework handlers

>[!NOTE]
> Except for the *added* and *removed* members' activities, all of the activity handlers described in this section continue to work as they do with a non-Teams bot.

Activity handlers are different in context of a team, where the new member is added to the team instead of a message thread.

The list of handlers defined in `ActivityHandler` include the following:

| Event | Handler | Description |
| :-- | :-- | :-- |
| Any activity type received | `on_turn` | Calls one of the other handlers, based on the type of activity received. |
| Message activity received | `on_message_activity` | Overrides this to handle a `Message` activity. |
| Conversation update activity received | `on_conversation_update_activity` | Calls a handler if members other than the bot join or leave the conversation. |
| Non-bot members joined the conversation | `on_members_added_activity` | Overrides this to handle members joining a conversation. |
| Non-bot members left the conversation | `on_members_removed_activity` | Overrides this to handle members leaving a conversation. |
| Event activity received | `on_event_activity` | Calls a handler specific to the type of event. |
| Token-response event activity received | `on_token_response_event` | Overrides this to handle token response events. |
| Non-token-response event activity received | `on_event` | Overrides this to handle other types of events. |
| Other activity types received | `on_unrecognized_activity_type` | Overrides this to handle any type of activity that is not handled. |

#### Teams-specific handlers

The `TeamsActivityHandler` extends the list of handlers from the Core Bot Framework handlers section to include the following:

| Event | Handler | Description |
| :-- | :-- | :-- |
| channelCreated | `on_teams_channel_created` | Overrides this to handle a Teams channel being created. For more information, see [Channel created](https://aka.ms/azure-bot-subscribe-to-conversation-events#channel-created) in [Conversation update events](https://aka.ms/azure-bot-subscribe-to-conversation-events). |
| channelDeleted | `on_teams_channel_deleted` | Overrides this to handle a Teams channel being deleted. For more information, see [Channel deleted](https://aka.ms/azure-bot-subscribe-to-conversation-events#channel-deleted) in [Conversation update events](https://aka.ms/azure-bot-subscribe-to-conversation-events).|
| channelRenamed | `on_teams_channel_renamed` | Overrides this to handle a Teams channel being renamed. For more information, see [Channel renamed](https://aka.ms/azure-bot-subscribe-to-conversation-events#channel-renamed) in [Conversation update events](https://aka.ms/azure-bot-subscribe-to-conversation-events).|
| teamRenamed | `on_teams_team_renamed` | `return Task.CompletedTask;` Overrides this to handle a Teams team being renamed. For more information, see [Team renamed](https://aka.ms/azure-bot-subscribe-to-conversation-events#team-renamed) in [Conversation update events](https://aka.ms/azure-bot-subscribe-to-conversation-events).|
| MembersAdded | `on_teams_members_added` | Calls the `OnMembersAddedAsync` method in `ActivityHandler`. Overrides this to handle members joining a team. For more information, see [Team members added](https://aka.ms/azure-bot-subscribe-to-conversation-events#team-members-added) in [Conversation update events](https://aka.ms/azure-bot-subscribe-to-conversation-events).|
| MembersRemoved | `on_teams_members_removed` | Calls the `OnMembersRemovedAsync` method in `ActivityHandler`. Overrides this to handle members leaving a team. For more information, see [Team members removed](https://aka.ms/azure-bot-subscribe-to-conversation-events#team-members-removed) in [Conversation update events](https://aka.ms/azure-bot-subscribe-to-conversation-events).|

#### Teams invoke activities

The list of Teams activity handlers called from the `on_invoke_activity` Teams activity handler include the following:

| Invoke types                    | Handler                              | Description                                                  |
| :-----------------------------  | :----------------------------------- | :----------------------------------------------------------- |
| CardAction.Invoke               | `on_teams_card_action_invoke`       | Is invoked when a card action invoke activity is received from the connector. |
| fileConsent/invoke              | `on_teams_file_consent_accept`      | Is invoked when a file consent card is accepted by the user. |
| fileConsent/invoke              | `on_teams_file_consent`            | Is invoked when a file consent card activity is received from the connector. |
| fileConsent/invoke              | `on_teams_file_consent_decline`     | Is invoked when a file consent card is declined by the user. |
| actionableMessage/executeAction | `on_teams_o365_connector_card_action` | Is invoked when a O365 Connector Card Action activity is received from the connector. |
| signin/verifyState              | `on_teams_signin_verify_state`      | Is invoked when a signIn verify state activity is received from the connector. |
| task/fetch                      | `on_teams_task_module_fetch`        | Overrides this in a derived class to provide logic for when a task module is fetched. |
| task/submit                     | `on_teams_task_module_submit`       | Overrides this in a derived class to provide logic for when a task module is submitted. |

The invoke activities listed in this section are for conversational bots in Teams. The Bot Framework SDK also supports invoke activities specific to messaging extensions. For more information, see [What are messaging extensions](https://aka.ms/azure-bot-what-are-messaging-extensions).

---
