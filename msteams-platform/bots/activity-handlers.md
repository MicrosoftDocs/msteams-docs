---
title: Activity handlers in a bot app
author: surbhigupta
description: Description for bot activity handlers
ms.topic: overview
ms.localizationpriority: high
ms-author: surbhigupta
ms.date: 01/29/2023
---

# Activity handlers

[From updated content in PR #10369]

An invoke event is sent to a user from the bot when a user performs an action, such as selecting a button or tapping a card. Invoke activities are used to send a pre-defined payload back to the bot, which can then be used to trigger specific actions or responses, such as following:

* Send back confirmations
* Select items
* Provide feedback or input to the bot

When an event occurs, invoke activity handlers can identify the activity and forward it to the bot logic for processing. By incorporating an invoke activity into the handler logic, your bot can process the event and respond to the user based on the payload of the invoke activity.

The following table outlines which communication concept to use:

|Comunication flow| Concept| Description |
|---|---| --- |
| User **->** Bot| [Event activity handler](~/bots/how-to/conversations/bot-events.md#event-activity-handlers) |Event activity handlers are used when you want your bot to be notified when a user performs an event.|
| User **<->** Bot| [Invoke activity handler + Invoke activities](~/bots/how-to/conversations/bot-invoke-activity.md)| Invoke activity handlers are used when you want your bot to be notified when a user performs an event and respond back to the user based on the event through invoke activities.|

Teams activity handler is derived from [Bot Framework's activity handler](~/bots/how-to/conversations/bot-events.md#bot-framework-activity-handler). The two primary Teams activity handlers are as follows:

* `OnConversationUpdateActivityAsync`: Routes all the [conversation update activities](~/bots/how-to/conversations/bot-events.md).
* `OnInvokeActivityAsync`: Routes all Teams invoke activities.

[TBA: Comments from Li Ma]
---

This document builds on the article on [how bots work](/azure/bot-service/bot-builder-basics?view=azure-bot-service-4.0&preserve-view=true) in the core [Bot Framework documentation](/azure/bot-service/?view=azure-bot-service-4.0&preserve-view=true). The primary difference between bots developed for Microsoft Teams and the core Bot Framework is in the features provided in Teams.

An activity handler is used to organize the conversational logic for your bot. Activities are handled in two ways using Teams activity handlers and bot logic. The Teams activity handler adds support for Teams-specific events and interactions. The bot object contains the conversational reasoning or logic for a turn and exposes a turn handler, which is the method that can accept incoming activities from the bot adapter.

## Teams activity handlers

Teams activity handler is derived from Microsoft Bot Framework's activity handler. It routes all Teams activities before allowing any non-Teams specific activities to be handled.

When a bot for Teams receives an activity, it's routed to the activity handlers. All activities are routed through one base handler called the turn handler. The turn handler calls the required activity handler to manage any activity received. The Teams bot is derived from `TeamsActivityHandler` class, which is derived from the Bot Framework's `ActivityHandler` class.

> [!NOTE]
> If the bot activity takes more than 15 seconds to process, Teams send a retry request to bot endpoint. Hence, you'll see duplicate requests in your bot.

## Invoke activity handler for bot events

An invoke event is sent to a user from the bot when a user performs an action, such as selecting a button or tapping a card. Invoke activities are used to send a pre-defined payload back to the bot, which can then be used to trigger specific actions or responses, such as following:

* Send back confirmations
* Select items
* Provide feedback or input to the bot

When an event occurs, invoke activity handlers can identify the activity and forward it to the bot logic for processing. By incorporating an invoke activity into the handler logic, your bot can process the event and respond to the user based on the payload of the invoke activity.
<!--
|Comunication flow| Concept| Description |
|---|---| --- |
| User **->** Bot| [Event activity handler](~/bots/how-to/conversations/bot-events.md) |Event activity handlers are used when you want your bot to be notified when a user performs an event.|
| User **<->** Bot| [Invoke activity handler + Invoke activities](~/bots/how-to/conversations/bot-invoke-activity.md)| Invoke activity handlers are used when you want your bot to be notified when a user performs an event and respond back to the user based on the event through invoke activities.|

Teams activity handler is derived from [Bot Framework's activity handler](~/bots/how-to/conversations/bot-events.md#bot-framework-activity-handler). The two primary Teams activity handlers are as follows:

* `OnConversationUpdateActivityAsync`: Routes all the [conversation update activities](~/bots/how-to/conversations/bot-events.md).
* `OnInvokeActivityAsync`: Routes all Teams invoke activities.

The invoke activities listed in this article are applicable for conversational bots in Teams.
-->
[TBD: Update for code snippets]

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
