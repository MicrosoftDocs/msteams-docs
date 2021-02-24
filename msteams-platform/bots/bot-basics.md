---
title: Bot basics
author: clearab
description: Understand the basics of bots in Teams.
ms.topic: conceptual
ms.author: anclear
---
# Bot basics

This document provides an introduction to bots in Microsoft Teams that builds on the article [how bots work](https://aka.ms/how-bots-work) in the core [Bot Framework documentation](https://aka.ms/azure-bot-service-docs). The primary difference between bots developed for Microsoft Teams and the core Bot Framework is in the features provided in Teams.

To organize the conversational logic for your bot, an activity handler is used. Activities are handled in two ways using Teams activity handlers and bot logic. The Teams activity handler adds support for Microsoft Teams-specific events and interactions. The bot object contains the conversational reasoning or logic for a turn and exposes a turn handler, which is the method that can accept incoming activities from the bot adapter.

## Teams activity handlers

Teams activity handler is derived from Microsoft Bot Framework's activity handler. It routes all Teams activities before allowing any non-Teams specific activities to be handled.

When a bot for Teams receives an activity, it is directed to the *activity handlers*. All activities are routed through one base handler called the turn handler. The turn handler calls the required activity handler to manage any activity received. The Teams bot is derived from `TeamsActivityHandler` class, which is derived from the Bot Framework's `ActivityHandler` class.

# [C#](#tab/csharp)

Bots are created using the Bot Framework. If the bots receive a message activity, then the turn handler receives a notification of that incoming activity. The turn handler then sends the incoming activity to the `OnMessageActivityAsync` activity handler. In Teams, this functionality remains the same. If the bot receives a conversation update activity, then the turn handler receives a notification of that incoming activity and sends the incoming activity to `OnConversationUpdateActivityAsync`. The Teams activity handler first checks for any Teams specific events. If no events are found, it then passes them along to the Bot Framework's activity handler.

In the Teams activity handler class, there are two primary Teams activity handlers, `OnConversationUpdateActivityAsync` and `OnInvokeActivityAsync`. `OnConversationUpdateActivityAsync` routes all conversation update activities and `OnInvokeActivityAsync` routes all Teams invoke activities.

To implement your logic for Teams specific activity handlers, you must override the methods in your bot as shown in the [Bot logic](#bot-logic) section. There is no base implementation for these handlers, therefore, you must add the logic that you want in your override.

# [JavaScript](#tab/javascript)

Bots are created using the Bot Framework. If the bots receive a message activity, then the turn handler receives a notification of that incoming activity. The turn handler then sends the incoming activity to the `onMessage` activity handler. In Teams, this functionality remains the same. If the bot receives a conversation update activity, then the turn handler receives a notification of that incoming activity and sends the incoming activity to `dispatchConversationUpdateActivity`. The Teams activity handler first checks for any Teams specific events. If no events are found, it then passes them along to the Bot Framework's activity handler.

In the Teams activity handler class, there are two primary Teams activity handlers, `dispatchConversationUpdateActivity` and `onInvokeActivity`. `dispatchConversationUpdateActivity` routes all conversation update activities and `onInvokeActivity` routes all Teams invoke activities.

To implement your logic for Teams specific activity handlers, you must override the methods in your bot as shown in the [Bot logic](#bot-logic) section. Define your bot logic for these handlers, then **be sure to call `next()` at the end**. By calling `next()` you ensure that the next handler runs.

# [Python](#tab/python)

Bots are created using the Bot Framework. If the bots receive a message activity, then the turn handler receives a notification of that incoming activity. The turn handler then sends the incoming activity to the `on_message_activity` activity handler. In Teams, this functionality remains the same. If the bot receives a conversation update activity, then the turn handler receives a notification of that incoming activity and sends the incoming activity to `on_conversation_update_activity`. The Teams activity handler first checks for any Teams specific events. If no events are found, it then passes them along to the Bot Framework's activity handler.

In the Teams activity handler class, there are two primary Teams activity handlers, `on_conversation_update_activity` and `on_invoke_activity`. `on_conversation_update_activity` routes all conversation update activities and `on_invoke_activity` routes all Teams invoke activities.

To implement your logic for Teams specific activity handlers, you must override the methods in your bot as shown in the [Bot logic](#bot-logic) section. There is no base implementation for these handlers, therefore, you must add the logic that you want in your override.

---

## Bot logic

The bot logic processes incoming activities from one or more of your bot channels and in response generates outgoing activities. This is still true of bots derived from the Teams activity handler class, which first checks for Teams activities. After checking for Teams activities, it passes all other activities to the Bot Framework's activity handler.

# [C#](#tab/csharp)

#### Core Bot Framework handlers

>[!NOTE]
> Except for the **added** and **removed** members' activities, all the activity handlers described in this section continue to work as they do with a non-Teams bot.

Activity handlers are different in context of a team, where a new member is added to the team instead of a message thread.

The list of handlers defined in `ActivityHandler` include the following:

| Event | Handler | Description |
| :-- | :-- | :-- |
| Any activity type received | `OnTurnAsync` | This method calls one of the other handlers, based on the type of activity received. |
| Message activity received | `OnMessageActivityAsync` | This method can be overridden to handle a `Message` activity. |
| Conversation update activity received | `OnConversationUpdateActivityAsync` | This method calls a handler if members other than the bot joined or left the conversation, on a `ConversationUpdate` activity. |
| Non-bot members joined the conversation | `OnMembersAddedAsync` | This method can be overridden to handle members joining a conversation. |
| Non-bot members left the conversation | `OnMembersRemovedAsync` | This method can be overridden to handle members leaving a conversation. |
| Event activity received | `OnEventActivityAsync` | This method calls a handler specific to the event type, on an `Event` activity. |
| Token-response event activity received | `OnTokenResponseEventAsync` | This method can be overridden to handle token response events. |
| Non-token-response event activity received | `OnEventAsync` | This method can be overridden to handle other types of events. |
| Other activity type received | `OnUnrecognizedActivityTypeAsync` | This method can be overridden to handle any activity type otherwise unhandled. |

#### Teams specific activity handlers

The `TeamsActivityHandler` extends the list of handlers in the Core Bot Framework handlers section to include the following:

| Event | Handler | Description |
| :-- | :-- | :-- |
| channelCreated | `OnTeamsChannelCreatedAsync` | This method can be overridden to handle a Teams channel being created. For more information, see [Channel created](https://aka.ms/azure-bot-subscribe-to-conversation-events#channel-created) in [Conversation update events](https://aka.ms/azure-bot-subscribe-to-conversation-events). |
| channelDeleted | `OnTeamsChannelDeletedAsync` | This method can be overridden to handle a Teams channel being deleted. For more information, see [Channel deleted](https://aka.ms/azure-bot-subscribe-to-conversation-events#channel-deleted) in [Conversation update events](https://aka.ms/azure-bot-subscribe-to-conversation-events).|
| channelRenamed | `OnTeamsChannelRenamedAsync` | This method can be overridden to handle a Teams channel being renamed. For more information, see [Channel renamed](https://aka.ms/azure-bot-subscribe-to-conversation-events#channel-renamed) in [Conversation update events](https://aka.ms/azure-bot-subscribe-to-conversation-events).|
| teamRenamed | `OnTeamsTeamRenamedAsync` | `return Task.CompletedTask;` This method can be overridden to handle a Teams team being renamed. For more information, see [Team renamed](https://aka.ms/azure-bot-subscribe-to-conversation-events#team-renamed) in [Conversation update events](https://aka.ms/azure-bot-subscribe-to-conversation-events).|
| MembersAdded | `OnTeamsMembersAddedAsync` | This method calls the `OnMembersAddedAsync` method in `ActivityHandler`. The method can be overridden to handle members joining a team. For more information, see [Team members added](https://aka.ms/azure-bot-subscribe-to-conversation-events#team-members-added) in [Conversation update events](https://aka.ms/azure-bot-subscribe-to-conversation-events).|
| MembersRemoved | `OnTeamsMembersRemovedAsync` | This method calls the `OnMembersRemovedAsync` method in `ActivityHandler`. The method can be overridden to handle members leaving a team. For more information, see [Team members removed](https://aka.ms/azure-bot-subscribe-to-conversation-events#team-members-removed) in [Conversation update events](https://aka.ms/azure-bot-subscribe-to-conversation-events).|

#### Teams invoke activities

The list of Teams activity handlers called from the `OnInvokeActivityAsync` Teams activity handler include the following:

| Invoke types                    | Handler                              | Description                                                  |
| :-----------------------------  | :----------------------------------- | :----------------------------------------------------------- |
| CardAction.Invoke               | `OnTeamsCardActionInvokeAsync`       | This method is invoked when a card action invoke activity is received from the connector. |
| fileConsent/invoke              | `OnTeamsFileConsentAcceptAsync`      | This method is invoked when a file consent card is accepted by the user. |
| fileConsent/invoke              | `OnTeamsFileConsentAsync`            | This method is invoked when a file consent card activity is received from the connector. |
| fileConsent/invoke              | `OnTeamsFileConsentDeclineAsync`     | This method is invoked when a file consent card is declined by the user. |
| actionableMessage/executeAction | `OnTeamsO365ConnectorCardActionAsync` | This method is invoked when a O365 connector card action activity is received from the connector. |
| signin/verifyState              | `OnTeamsSigninVerifyStateAsync`      | This method is invoked when a signIn verify state activity is received from the connector. |
| task/fetch                      | `OnTeamsTaskModuleFetchAsync`        | This method can be overridden in a derived class to provide logic when a task module is fetched. |
| task/submit                     | `OnTeamsTaskModuleSubmitAsync`       | This method can be overridden in a derived class to provide logic when a task module is submitted. |

The invoke activities listed in this section are for conversational bots in Teams. The Bot Framework SDK also supports invoke activities specific to messaging extensions. For more information, see [What are messaging extensions](https://aka.ms/azure-bot-what-are-messaging-extensions).

# [JavaScript](#tab/javascript)

#### Core Bot Framework handlers

>[!NOTE]
> Except for the **added** and **removed** members' activities, all the activity handlers described in this section continue to work as they do with a non-Teams bot.

Activity handlers are different in context of a team, where the new member is added to the team instead of a message thread.

The list of handlers defined in `ActivityHandler` include the following:

| Event | Handler | Description |
| :-- | :-- | :-- |
| Any activity type received | `onTurn` | This method calls one of the other handlers, based on the type of activity received. |
| Message activity received | `onMessage` | This method helps to handle a `Message` activity. |
| Conversation update activity received | `onConversationUpdate` | This method calls a handler if members other than the bot joined or left the conversation, on a `ConversationUpdate` activity. |
| Non-bot members joined the conversation | `onMembersAdded` | This method helps to handle members joining a conversation. |
| Non-bot members left the conversation | `onMembersRemoved` | This method helps to handle members leaving a conversation. |
| Event activity received | `onEvent` | This method calls a handler specific to the event type, on an `Event` activity. |
| Token-response event activity received | `onTokenResponseEvent` | This method helps to handle token response events. |
| Other activity type received | `onUnrecognizedActivityType` | This method helps to handle any activity type otherwise unhandled. |

#### Teams specific activity handlers

The `TeamsActivityHandler` extends the list of handlers in the Core Bot Framework handlers section to include the following:

| Event | Handler | Description |
| :-- | :-- | :-- |
| channelCreated | `OnTeamsChannelCreatedAsync` | This method can be overridden to handle a Teams channel being created. For more information, see [Channel created](https://aka.ms/azure-bot-subscribe-to-conversation-events#channel-created) in [Conversation update events](https://aka.ms/azure-bot-subscribe-to-conversation-events). |
| channelDeleted | `OnTeamsChannelDeletedAsync` | This method can be overridden to handle a Teams channel being deleted. For more information, see [Channel deleted](https://aka.ms/azure-bot-subscribe-to-conversation-events#channel-deleted) in [Conversation update events](https://aka.ms/azure-bot-subscribe-to-conversation-events).|
| channelRenamed | `OnTeamsChannelRenamedAsync` | This method can be overridden to handle a Teams channel being renamed. For more information, see [Channel renamed](https://aka.ms/azure-bot-subscribe-to-conversation-events#channel-renamed) in [Conversation update events](https://aka.ms/azure-bot-subscribe-to-conversation-events). |
| teamRenamed | `OnTeamsTeamRenamedAsync` | `return Task.CompletedTask;` This method can be overridden to handle a Teams team being renamed. For more information, see [Team renamed](https://aka.ms/azure-bot-subscribe-to-conversation-events#team-renamed) in [Conversation update events](https://aka.ms/azure-bot-subscribe-to-conversation-events). |
| MembersAdded | `OnTeamsMembersAddedAsync` | This method calls the `OnMembersAddedAsync` method in `ActivityHandler`. The method can be overridden to handle members joining a team. For more information, see [Team members added](https://aka.ms/azure-bot-subscribe-to-conversation-events#team-members-added) in [Conversation update events](https://aka.ms/azure-bot-subscribe-to-conversation-events). |
| MembersRemoved | `OnTeamsMembersRemovedAsync` | This method calls the `OnMembersRemovedAsync` method in `ActivityHandler`. The method can be overridden to handle members leaving a team. For more information, see [Team members removed](https://aka.ms/azure-bot-subscribe-to-conversation-events#team-members-removed) in [Conversation update events](https://aka.ms/azure-bot-subscribe-to-conversation-events). |

#### Teams invoke activities

The list of Teams activity handlers called from the `onInvokeActivity` Teams activity handler include the following:

| Invoke types                    | Handler                              | Description                                                  |
| :-----------------------------  | :----------------------------------- | :----------------------------------------------------------- |
| CardAction.Invoke               | `handleTeamsCardActionInvoke`       | This method is invoked when a card action invoke activity is received from the connector. |
| fileConsent/invoke              | `handleTeamsFileConsentAccept`      | This method is invoked when a file consent card is accepted by the user. |
| fileConsent/invoke              | `handleTeamsFileConsent`            | This method is invoked when a file consent card activity is received from the connector. |
| fileConsent/invoke              | `handleTeamsFileConsentDecline`     | This method is invoked when a file consent card is declined by the user. |
| actionableMessage/executeAction | `handleTeamsO365ConnectorCardAction` | This method is invoked when a O365 connector card action activity is received from the connector. |
| signin/verifyState              | `handleTeamsSigninVerifyState`      | This method is invoked when a signIn verify state activity is received from the connector. |
| task/fetch                      | `handleTeamsTaskModuleFetch`        | This method can be overridden in a derived class to provide logic when a task module is fetched. |
| task/submit                     | `handleTeamsTaskModuleSubmit`       | This method can be overridden in a derived class to provide logic when a task module is submitted. |

The invoke activities listed in this section are for conversational bots in Teams. The Bot Framework SDK also supports invoke activities specific to messaging extensions. For more information, see [What are messaging extensions](https://aka.ms/azure-bot-what-are-messaging-extensions).

# [Python](#tab/python)

#### Core Bot Framework handlers

>[!NOTE]
> Except for the **added** and **removed** members' activities, all the activity handlers described in this section continue to work as they do with a non-Teams bot.

Activity handlers are different in context of a team, where the new member is added to the team instead of a message thread.

The list of handlers defined in `ActivityHandler` include the following:

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
| Other activity types received | `on_unrecognized_activity_type` | This method can be overridden to handle any type of activity that is not handled. |

#### Teams specific activity handlers

The `TeamsActivityHandler` extends the list of handlers from the Core Bot Framework handlers section to include the following:

| Event | Handler | Description |
| :-- | :-- | :-- |
| channelCreated | `on_teams_channel_created` | This method can be overridden to handle a Teams channel being created. For more information, see [Channel created](https://aka.ms/azure-bot-subscribe-to-conversation-events#channel-created) in [Conversation update events](https://aka.ms/azure-bot-subscribe-to-conversation-events). |
| channelDeleted | `on_teams_channel_deleted` | This method can be overridden to handle a Teams channel being deleted. For more information, see [Channel deleted](https://aka.ms/azure-bot-subscribe-to-conversation-events#channel-deleted) in [Conversation update events](https://aka.ms/azure-bot-subscribe-to-conversation-events).|
| channelRenamed | `on_teams_channel_renamed` | This method can be overridden to handle a Teams channel being renamed. For more information, see [Channel renamed](https://aka.ms/azure-bot-subscribe-to-conversation-events#channel-renamed) in [Conversation update events](https://aka.ms/azure-bot-subscribe-to-conversation-events).|
| teamRenamed | `on_teams_team_renamed` | `return Task.CompletedTask;` This method can be overridden to handle a Teams team being renamed. For more information, see [Team renamed](https://aka.ms/azure-bot-subscribe-to-conversation-events#team-renamed) in [Conversation update events](https://aka.ms/azure-bot-subscribe-to-conversation-events).|
| MembersAdded | `on_teams_members_added` | This method calls the `OnMembersAddedAsync` method in `ActivityHandler`. The method can be overridden to handle members joining a team. For more information, see [Team members added](https://aka.ms/azure-bot-subscribe-to-conversation-events#team-members-added) in [Conversation update events](https://aka.ms/azure-bot-subscribe-to-conversation-events).|
| MembersRemoved | `on_teams_members_removed` | This method calls the `OnMembersRemovedAsync` method in `ActivityHandler`. The method can be overridden to handle members leaving a team. For more information, see [Team members removed](https://aka.ms/azure-bot-subscribe-to-conversation-events#team-members-removed) in [Conversation update events](https://aka.ms/azure-bot-subscribe-to-conversation-events).|

#### Teams invoke activities

The list of Teams activity handlers called from the `on_invoke_activity` Teams activity handler include the following:

| Invoke types                    | Handler                              | Description                                                  |
| :-----------------------------  | :----------------------------------- | :----------------------------------------------------------- |
| CardAction.Invoke               | `on_teams_card_action_invoke`       | This method is invoked when a card action invoke activity is received from the connector. |
| fileConsent/invoke              | `on_teams_file_consent_accept`      | This method is invoked when a file consent card is accepted by the user. |
| fileConsent/invoke              | `on_teams_file_consent`            | This method is invoked when a file consent card activity is received from the connector. |
| fileConsent/invoke              | `on_teams_file_consent_decline`     | This method is invoked when a file consent card is declined by the user. |
| actionableMessage/executeAction | `on_teams_o365_connector_card_action` | This method is invoked when a O365 connector card action activity is received from the connector. |
| signin/verifyState              | `on_teams_signin_verify_state`      | This method is invoked when a signIn verify state activity is received from the connector. |
| task/fetch                      | `on_teams_task_module_fetch`        | This method can be overridden in a derived class to provide logic when a task module is fetched. |
| task/submit                     | `on_teams_task_module_submit`       | This method can be overridden in a derived class to provide logic when a task module is submitted. |

The invoke activities listed in this section are for conversational bots in Teams. The Bot Framework SDK also supports invoke activities specific to messaging extensions. For more information, see [What are messaging extensions](https://aka.ms/azure-bot-what-are-messaging-extensions).

---

## Next step

> [!div class="nextstepaction"]
> [Conversation basics](~/bots/how-to/conversations/conversation-basics.md)
