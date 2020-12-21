---
title: Bot basics
author: clearab
description: Understand the basics of bots in Teams.
ms.topic: conceptual
ms.author: anclear
---
# Bot basics

This document provides an introduction to bots in Teams that builds on the article [How bots work](https://aka.ms/how-bots-work) in the core [Bot Framework documentation](https://aka.ms/azure-bot-service-docs). You will find that article and the other articles in the *Concepts* section useful.

The primary difference in bots developed for Microsoft Teams is in how activities are handled. The Microsoft Teams activity handler derives from the Bot Framework's activity handler to route all Teams activities before allowing any non-Teams specific activities to be handled.

## Teams Activity handlers

When a bot for Microsoft Teams receives an activity, it passes it on to its *activity handlers*. Under the covers, there's one base handler called the *turn handler*, through which all activities are routed. The *turn handler* calls the required activity handler to handle whatever type of activity was received. Where a bot designed for Microsoft Teams differs is that it is derived from `TeamsActivityHandler` class that is derived from the Bot Framework's `ActivityHandler` class.

# [C#](#tab/csharp)

As with any bot created using the Microsoft Bot Framework, if the bot receives a message activity, the turn handler sees that incoming activity. It then sends it to the `OnMessageActivityAsync` activity handler. In Teams, this functionality remains the same. If the bot receives a conversation update activity, the turn handler sees that incoming activity. It then sends it to the `OnConversationUpdateActivityAsync`. The *Teams* activity handler will first check for any Teams specific events. If no events are found, it will then pass it along to the Bot Framework's activity handler.

In the Teams activity handler class, there are two primary Teams activity handlers, `OnConversationUpdateActivityAsync` and `OnInvokeActivityAsync`. `OnConversationUpdateActivityAsync` routes all conversation update activities and `OnInvokeActivityAsync` routes all Teams invoke activities.

To implement your logic for Teams specific activity handlers, you will override these methods in your bot as shown in the [Bot logic](#bot-logic) section. There is no base implementation for these handlers, therefore, you need to add the logic that you want in your override.

# [JavaScript](#tab/javascript)

As with any bot created using the Microsoft Bot Framework, if the bot receives a message activity, the turn handler sees that incoming activity. It then sends it to the `onMessage` activity handler. In Teams, this functionality remains the same. If the bot receives a conversation update activity, the turn handler sees that incoming activity. It then sends it to the `dispatchConversationUpdateActivity`. The *Teams* activity handler will first check for any Teams specific events. If no events are found, it will then pass it along to the Bot Frameworks activity handler.

In the Teams activity handler class, there are two primary Teams activity handlers, `dispatchConversationUpdateActivity` and `onInvokeActivity`. `dispatchConversationUpdateActivity` routes all conversation update Activities and `onInvokeActivity` routes all Teams invoke activities.

To implement your logic for Teams specific activity handlers, you will override these methods in your bot as shown in the [Bot logic](#bot-logic) section. For each of these handlers, define your bot logic, then **be sure to call `next()` at the end**. By calling `next()` you ensure that the next handler runs.

# [Python](#tab/python)

As with any bot created using the Microsoft Bot Framework, if it receives a message activity, the turn handler sees that incoming activity. It then sends it to the `on_message_activity` activity handler. In Teams, this functionality remains the same. If the bot receives a conversation update activity, the turn handler sees that incoming activity. It then sends it to the `on_conversation_update_activity`. The *Teams* activity handler will first check for any Teams specific events. If no events are found, it will then pass them along to the Bot Framework's activity handler.

In the Teams activity handler class, there are two primary Teams activity handlers, `on_conversation_update_activity` and `on_invoke_activity`. `on_conversation_update_activity` routes all conversation update activities and `on_invoke_activity` routes all Teams invoke activities.

To implement your logic for Teams specific activity handlers, you will override these methods in your bot as shown in the [Bot logic](#bot-logic) section. There is no base implementation for these handlers, therefore, you need to add the logic that you want in your override.

---

## Bot logic

The bot logic processes incoming activities from one or more of your bot channels and in response generates outgoing activities.  This is still true of bots derived from the Teams activity handler class, which first checks for Teams activities. It then passes all other activities to the Bot Framework's activity handler.

# [C#](#tab/csharp)

#### Core Bot Framework handlers

All of the activity handlers described in the table will continue to work as they do with a non-Teams bot, except for *added* and *removed* members' activities. Activity handlers will be different in the context of a team, where the new member is added to the team as opposed to a message thread.

Following are the handlers defined in `ActivityHandler`:

| Event | Handler | Description |
| :-- | :-- | :-- |
| Any activity type received | `OnTurnAsync` | Calls one of the other handlers, based on the type of activity received. |
| Message activity received | `OnMessageActivityAsync` | Override this to handle a `Message` activity. |
| Conversation update activity received | `OnConversationUpdateActivityAsync` | On a `ConversationUpdate` activity, calls a handler if members other than the bot joined or left the conversation. |
| Non-bot members joined the conversation | `OnMembersAddedAsync` | Override this to handle members joining a conversation. |
| Non-bot members left the conversation | `OnMembersRemovedAsync` | Override this to handle members leaving a conversation. |
| Event activity received | `OnEventActivityAsync` | On an `Event` activity, calls a handler specific to the event type. |
| Token-response event activity received | `OnTokenResponseEventAsync` | Override this to handle token response events. |
| Non-token-response event activity received | `OnEventAsync` | Override this to handle other types of events. |
| Other activity type received | `OnUnrecognizedActivityTypeAsync` | Override this to handle any activity type otherwise unhandled. |

#### Teams-specific handlers

The `TeamsActivityHandler` extends the list of handlers in the [Core Bot Framework handlers](#core-bot-framework-handlers) section to include the following:

| Event | Handler | Description |
| :-- | :-- | :-- |
| channelCreated | `OnTeamsChannelCreatedAsync` | Override this to handle a Teams channel being created. For more information, see [Channel created](https://aka.ms/azure-bot-subscribe-to-conversation-events#channel-created) in [Conversation update events](https://aka.ms/azure-bot-subscribe-to-conversation-events). |
| channelDeleted | `OnTeamsChannelDeletedAsync` | Override this to handle a Teams channel being deleted. For more information, see [Channel deleted](https://aka.ms/azure-bot-subscribe-to-conversation-events#channel-deleted) in [Conversation update events](https://aka.ms/azure-bot-subscribe-to-conversation-events).|
| channelRenamed | `OnTeamsChannelRenamedAsync` | Override this to handle a Teams channel being renamed. For more information, see [Channel renamed](https://aka.ms/azure-bot-subscribe-to-conversation-events#channel-renamed) in [Conversation update events](https://aka.ms/azure-bot-subscribe-to-conversation-events).|
| teamRenamed | `OnTeamsTeamRenamedAsync` | `return Task.CompletedTask;` Override this to handle a Teams team being renamed. For more information, see [Team renamed](https://aka.ms/azure-bot-subscribe-to-conversation-events#team-renamed) in [Conversation update events](https://aka.ms/azure-bot-subscribe-to-conversation-events).|
| MembersAdded | `OnTeamsMembersAddedAsync` | Calls the `OnMembersAddedAsync` method in `ActivityHandler`. Override this to handle members joining a team. For more information, see [Team member added](https://aka.ms/azure-bot-subscribe-to-conversation-events#team-members-added) in [Conversation update events](https://aka.ms/azure-bot-subscribe-to-conversation-events).|
| MembersRemoved | `OnTeamsMembersRemovedAsync` | Calls the `OnMembersRemovedAsync` method in `ActivityHandler`. Override this to handle members leaving a team. For more information, see [Team member removed](https://aka.ms/azure-bot-subscribe-to-conversation-events#team-members-removed) in [Conversation update events](https://aka.ms/azure-bot-subscribe-to-conversation-events).|

#### Teams invoke activities

Here is a list of all of the Teams activity handlers called from the `OnInvokeActivityAsync` _Teams_ activity handler:

| Invoke types                    | Handler                              | Description                                                  |
| :-----------------------------  | :----------------------------------- | :----------------------------------------------------------- |
| CardAction.Invoke               | `OnTeamsCardActionInvokeAsync`       | Teams card action invoke. |
| fileConsent/invoke              | `OnTeamsFileConsentAcceptAsync`      | Teams file consent accept. |
| fileConsent/invoke              | `OnTeamsFileConsentAsync`            | Teams file consent. |
| fileConsent/invoke              | `OnTeamsFileConsentDeclineAsync`     | Teams file consent. |
| actionableMessage/executeAction | `OnTeamsO365ConnectorCardActionAsync` | Teams O365 connector card action. |
| signin/verifyState              | `OnTeamsSigninVerifyStateAsync`      | Teams sign in verify state. |
| task/fetch                      | `OnTeamsTaskModuleFetchAsync`        | Teams task module fetch. |
| task/submit                     | `OnTeamsTaskModuleSubmitAsync`       | Teams task module submit. |

The invoke activities listed in the [Teams invoke activities](#teams-invoke-activities) section are for conversational bots in Teams. The Bot Framework SDK also supports invoke activities specific to messaging extensions. For more information, see [What are messaging extensions](https://aka.ms/azure-bot-what-are-messaging-extensions).

# [JavaScript](#tab/javascript)

All of the activity handlers described in this section will continue to work as they do with a non-Teams bot, except for *added* and *removed* members' activities. Activity handlers will be different in the context of a team, where the new member is added to the team as opposed to a message thread.

#### Core Bot Framework handlers

Following are the handlers defined in `ActivityHandler`.

| Event | Handler | Description |
| :-- | :-- | :-- |
| Any activity type received | `onTurn` | Calls one of the other handlers, based on the type of activity received. |
| Message activity received | `onMessage` | Provide a function for this to handle a `Message` activity. |
| Conversation update activity received | `onConversationUpdate` | On a `ConversationUpdate` activity, calls a handler if members other than the bot joined or left the conversation. |
| Non-bot members joined the conversation | `onMembersAdded` | Provide a function for this to handle members joining a conversation. |
| Non-bot members left the conversation | `onMembersRemoved` | Provide a function for this to handle members leaving a conversation. |
| Event activity received | `onEvent` | On an `Event` activity, calls a handler specific to the event type. |
| Token-response event activity received | `onTokenResponseEvent` | Provide a function for this to handle token response events. |
| Other activity type received | `onUnrecognizedActivityType` | Provide a function for this to handle any activity type otherwise unhandled. |
| Activity handlers have completed | `onDialog` | Provide a function for this to handle any processing that should be done at the end of a turn, after the rest of your activity handlers have completed. |

#### Teams-specific handlers

The `TeamsActivityHandler` extends the list of handlers in the Core Bot Framework handlers section to include the following:

| Event | Handler | Description |
| :-- | :-- | :-- |
| channelCreated | `OnTeamsChannelCreatedAsync` | Override this to handle a Teams channel being created. For more information, see [Channel created](https://aka.ms/azure-bot-subscribe-to-conversation-events#channel-created) in [Conversation update events](https://aka.ms/azure-bot-subscribe-to-conversation-events). |
| channelDeleted | `OnTeamsChannelDeletedAsync` | Override this to handle a Teams channel being deleted. For more information, see [Channel deleted](https://aka.ms/azure-bot-subscribe-to-conversation-events#channel-deleted) in [Conversation update events](https://aka.ms/azure-bot-subscribe-to-conversation-events).|
| channelRenamed | `OnTeamsChannelRenamedAsync` | Override this to handle a Teams channel being renamed. For more information, see [Channel renamed](https://aka.ms/azure-bot-subscribe-to-conversation-events#channel-renamed) in [Conversation update events](https://aka.ms/azure-bot-subscribe-to-conversation-events). |
| teamRenamed | `OnTeamsTeamRenamedAsync` | `return Task.CompletedTask;` Override this to handle a Teams team being renamed. For more information, see [Team renamed](https://aka.ms/azure-bot-subscribe-to-conversation-events#team-renamed) in [Conversation update events](https://aka.ms/azure-bot-subscribe-to-conversation-events). |
| MembersAdded | `OnTeamsMembersAddedAsync` | Calls the `OnMembersAddedAsync` method in `ActivityHandler`. Override this to handle members joining a team. For more information, see [Team member added](https://aka.ms/azure-bot-subscribe-to-conversation-events#team-members-added) in [Conversation update events](https://aka.ms/azure-bot-subscribe-to-conversation-events). |
| MembersRemoved | `OnTeamsMembersRemovedAsync` | Calls the `OnMembersRemovedAsync` method in `ActivityHandler`. Override this to handle members leaving a team. For more information, see [Team member removed](https://aka.ms/azure-bot-subscribe-to-conversation-events#team-members-removed) in [Conversation update events](https://aka.ms/azure-bot-subscribe-to-conversation-events). |

#### Teams invoke activities

Here is a list of all of the Teams activity handlers called from the `onInvokeActivity` _Teams_ activity handler:

| Invoke types                    | Handler                              | Description                                                  |
| :-----------------------------  | :----------------------------------- | :----------------------------------------------------------- |
| CardAction.Invoke               | `handleTeamsCardActionInvoke`       | Teams card action invoke. |
| fileConsent/invoke              | `handleTeamsFileConsentAccept`      | Teams file consent accept. |
| fileConsent/invoke              | `handleTeamsFileConsent`            | Teams file consent. |
| fileConsent/invoke              | `handleTeamsFileConsentDecline`     | Teams file consent. |
| actionableMessage/executeAction | `handleTeamsO365ConnectorCardAction` | Teams O365 connector card action. |
| signin/verifyState              | `handleTeamsSigninVerifyState`      | Teams sign in verify state. |
| task/fetch                      | `handleTeamsTaskModuleFetch`        | Teams task module fetch. |
| task/submit                     | `handleTeamsTaskModuleSubmit`       | Teams task module submit. |

The invoke activities listed in the Teams invoke activities section are for conversational bots in Teams. The Bot Framework SDK also supports invoke activities specific to messaging extensions. For more information, see [What are messaging extensions](https://aka.ms/azure-bot-what-are-messaging-extensions).

# [Python](#tab/python)

#### Core Bot Framework handlers

All of the activity handlers described in this section will continue to work as they do with a non-Teams bot, except for *added* and *removed* members' activities. Activity handlers will be different in the context of a team, where the new member is added to the team as opposed to a message thread.

Here is a list of the handlers defined in `ActivityHandler`:

| Event | Handler | Description |
| :-- | :-- | :-- |
| Any activity type received | `on_turn` | Calls one of the other handlers, based on the type of activity received. |
| Message activity received | `on_message_activity` | Override this to handle a `Message` activity. |
| Conversation update activity received | `on_conversation_update_activity` | On a `ConversationUpdate` activity, calls a handler if members other than the bot joined or left the conversation. |
| Non-bot members joined the conversation | `on_members_added_activity` | Override this to handle members joining a conversation. |
| Non-bot members left the conversation | `on_members_removed_activity` | Override this to handle members leaving a conversation. |
| Event activity received | `on_event_activity` | On an `Event` activity, calls a handler specific to the event type. |
| Token-response event activity received | `on_token_response_event` | Override this to handle token response events. |
| Non-token-response event activity received | `on_event` | Override this to handle other types of events. |
| Other activity type received | `on_unrecognized_activity_type` | Override this to handle any activity type otherwise unhandled. |

#### Teams-specific handlers

The `TeamsActivityHandler` extends the list of handlers from the Core Bot Framework handlers section to include the following:

| Event | Handler | Description |
| :-- | :-- | :-- |
| channelCreated | `on_teams_channel_created` | Override this to handle a Teams channel being created. For more information, see [Channel created](https://aka.ms/azure-bot-subscribe-to-conversation-events#channel-created) in [Conversation update events](https://aka.ms/azure-bot-subscribe-to-conversation-events). |
| channelDeleted | `on_teams_channel_deleted` | Override this to handle a Teams channel being deleted. For more information, see [Channel deleted](https://aka.ms/azure-bot-subscribe-to-conversation-events#channel-deleted) in [Conversation update events](https://aka.ms/azure-bot-subscribe-to-conversation-events).|
| channelRenamed | `on_teams_channel_renamed` | Override this to handle a Teams channel being renamed. For more information, see [Channel renamed](https://aka.ms/azure-bot-subscribe-to-conversation-events#channel-renamed) in [Conversation update events](https://aka.ms/azure-bot-subscribe-to-conversation-events).|
| teamRenamed | `on_teams_team_renamed` | `return Task.CompletedTask;` Override this to handle a Teams team being renamed. For more information, see [Team renamed](https://aka.ms/azure-bot-subscribe-to-conversation-events#team-renamed) in [Conversation update events](https://aka.ms/azure-bot-subscribe-to-conversation-events).|
| MembersAdded | `on_teams_members_added` | Calls the `OnMembersAddedAsync` method in `ActivityHandler`. Override this to handle members joining a team. For more information, see [Team member added](https://aka.ms/azure-bot-subscribe-to-conversation-events#Team-Member-Added) in [Conversation update events](https://aka.ms/azure-bot-subscribe-to-conversation-events).|
| MembersRemoved | `on_teams_members_removed` | Calls the `OnMembersRemovedAsync` method in `ActivityHandler`. Override this to handle members leaving a team. For more information, see [Team member removed](https://aka.ms/azure-bot-subscribe-to-conversation-events#Team-Member-Removed) in [Conversation update events](https://aka.ms/azure-bot-subscribe-to-conversation-events).|

#### Teams invoke activities

Here is a list of all of the Teams activity handlers called from the `OnInvokeActivityAsync` _Teams_ activity handler:

| Invoke types                    | Handler                              | Description                                                  |
| :-----------------------------  | :----------------------------------- | :----------------------------------------------------------- |
| CardAction.Invoke               | `on_teams_card_action_invoke`       | Teams card action invoke. |
| fileConsent/invoke              | `on_teams_file_consent_accept`      | Teams file consent accept. |
| fileConsent/invoke              | `on_teams_file_consent`            | Teams file consent. |
| fileConsent/invoke              | `on_teams_file_consent_decline`     | Teams file consent. |
| actionableMessage/executeAction | `on_teams_o365_connector_card_action` | Teams O365 connector card action. |
| signin/verifyState              | `on_teams_signin_verify_state`      | Teams sign in verify state. |
| task/fetch                      | `on_teams_task_module_fetch`        | Teams task module fetch. |
| task/submit                     | `on_teams_task_module_submit`       | Teams task module submit. |

The invoke activities listed in the Teams invoke activities section are for conversational bots in Teams. The Bot Framework SDK also supports invoke activities specific to messaging extensions. For more information, see [What are messaging extensions](https://aka.ms/azure-bot-what-are-messaging-extensions).

---
