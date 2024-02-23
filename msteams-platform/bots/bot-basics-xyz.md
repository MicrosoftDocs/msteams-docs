---
title: Event-driven conversations with activity handlers
author: surbhigupta
description: Learn about Microsoft Teams events, activity handlers and invoke activities for bot messages, channels, teams, members, mentions, auth, card actions using Microsoft Bot Framework SDK.
ms.topic: conceptual
ms.localizationpriority: medium
ms.author: v-npaladugu
ms.date: 01/22/2023
zone_pivot_groups: bot-handler-activities
---

# Event-driven conversations with activity handlers

Events and handlers are two related concepts in a bot workflow. An event in bot workflow depicts an activity that triggers the bot to perform a certain action or task, which are invoke activities.

Activity handlers are functions or methods that contain the bot logic for how the bot should handle different types of events. For example, when a user reacts to the bot message, that is an event. The bot has a handler for message events, which defines what the bot should do or say in response to the user’s action.

:::image type="content" source="../assets/images/bots/bot-event-activity-flowchart.png" alt-text="Diagram that shows the flow of the event flow from activity handlers to bot logic." lightbox="../assets/images/bots/bot-event-activity-flowchart.png":::

To create a event-driven conversations, you need to define the handlers that the bot will use when the event is occured. You can also add invoke activity to the handler logic. An invoke activity is a way of updating the bot to run another activity as part of the current conversation. This can help the bot to modularize its logic and reuse existing activities for different events.

In this article, you’ll get to know about different events and the activity handlers associated with those events. If you would like to know about invoke activities, select invoke activities at the start of this article.

::: zone pivot="conversation-event"

# [Receive events](#tab/events)

## Events with activity handlers

In this article, you’ll get to know about different events and the activity handlers associated with those events. If you would like to know about invoke activities, select invoke activities at the start of this article.

Each activity type, or subtype, signifies a unique conversational event. Internally, the bot's turn handler, which is responsible for managing the flow of conversation, triggers the specific activity handler based on the received activity type.

For example, when the bot receives a message activity, the turn handler identifies this incoming activity and forwards it to the `onMessageActivity` handler. As a developer, you place your logic for managing and responding to messages in this `onMessageActivity` handler.

```javascript
this.onMessageActivity(async (context, next) => {
    // Your logic here
    await next();
});
```

Following are the two primary Teams activity handlers:

* `OnConversationUpdateActivityAsync`: Routes all the conversation update activities.
* `OnInvokeActivityAsync`: Routes all Teams [invoke activities](#invoke-activity).

Following are the different type of conversation events:

* [Conversation events](#conversation-update-events)
* [Channel events](#channel-events)
* [Members events](#members-event)
* [Team events](#team-events)
* [Installation events](#installation-events)
* [Message events](#message-events)

## Conversation update events

You can use conversation update events to provide better notifications and effective bot actions. You can add new events any time and your bot begins to receive them. You must design your bot to receive unexpected events. If you are using the Bot Framework SDK, your bot automatically responds with a `200 - OK` to any events you choose not to handle.

A bot receives a `conversationUpdate` event in either of the following cases:

* When bot has been added to a conversation.
* Other members are added to or removed from a conversation.
* Conversation metadata has changed.

The `conversationUpdate` event is sent to your bot when it receives information on membership updates for teams where it has been added. It also receives an update when it has been added for the first time for personal conversations.

## Channel events

| Action taken        | EventType         | Method called              | Description                | Scope |
| ------------------- | ----------------- | -------------------------- | -------------------------- | ----- |
| **Channel created**     | channelCreated    | OnTeamsChannelCreatedAsync | The `channelCreated` event is sent to your bot whenever a new channel is created in a team where your bot is installed. | Team |

1. The following code shows an example of channel created event:

   # [C#](#tab/dotnet16)
   1. The
      * [SDK reference](/dotnet/api/microsoft.bot.builder.teams.teamsactivityhandler.onteamschannelcreatedasync?view=botbuilder-dotnet-stable&preserve-view=true)
      * [Sample code reference](https://github.com/OfficeDev/Microsoft-Teams-Samples/blob/main/samples/bot-conversation/csharp/Bots/TeamsConversationBot.cs#L335)

        ```csharp
        protected override async Task OnTeamsChannelCreatedAsync(ChannelInfo channelInfo, TeamInfo teamInfo, ITurnContext<IConversationUpdateActivity> turnContext, CancellationToken cancellationToken)
        {
            var heroCard = new HeroCard(text: $"{channelInfo.Name} is the Channel created");
            // Sends an activity to the sender of the incoming activity.
            await turnContext.SendActivityAsync(MessageFactory.Attachment(heroCard.ToAttachment()), cancellationToken);
        }

        ```

   # [TypeScript](#tab/typescript16)

     <!-- From sample: botbuilder-js\libraries\botbuilder\tests\teams\conversationUpdate\src\conversationUpdateBot.ts -->

     * [SDK reference](/javascript/api/botbuilder/teamsactivityhandler?view=botbuilder-ts-latest#botbuilder-teamsactivityhandler-onteamschannelcreatedevent&preserve-view=true)

     ```typescript
     export class MyBot extends TeamsActivityHandler {
        constructor() {
            super();
            this.onTeamsChannelCreatedEvent(async (channelInfo: ChannelInfo, teamInfo: TeamInfo, turnContext: TurnContext, next: () => Promise<void>): Promise<void> => {
                const card = CardFactory.heroCard('Channel Created', `${channelInfo.name} is the Channel created`);
                const message = MessageFactory.attachment(card);
                // Sends a message activity to the sender of the incoming activity.
                await turnContext.sendActivity(message);
                await next();
            });
        }
     }

     ```

   # [JSON](#tab/json16)

        ```json
        {
            "type": "conversationUpdate",
            "timestamp": "2017-02-23T19:34:07.478Z",
            "localTimestamp": "2017-02-23T12:34:07.478-07:00",
            "id": "f:dd6ec311",
            "channelId": "msteams",
            "serviceUrl": "https://smba.trafficmanager.net/amer-client-ss.msg/",
            "from": {
                "id": "29:1wR7IdIRIoerMIWbewMi75JA3scaMuxvFon9eRQW2Nix5loMDo0362st2IaRVRirPZBv1WdXT8TIFWWmlQCizZQ"
            },
            "conversation": {
                "isGroup": true,
                "conversationType": "channel",
                "id": "19:efa9296d959346209fea44151c742e73@thread.skype"
            },
            "recipient": {
                "id": "28:f5d48856-5b42-41a0-8c3a-c5f944b679b0",
                "name": "SongsuggesterBot"
            },
            "channelData": {
                "channel": {
                    "id": "19:6d97d816470f481dbcda38244b98689a@thread.skype",
                    "name": "FunDiscussions"
                },
                "team": {
                    "id": "19:efa9296d959346209fea44151c742e73@thread.skype"
                },
                "eventType": "channelCreated",
                "tenant": {
                    "id": "72f988bf-86f1-41af-91ab-2d7cd011db47"
                }
            }
        }
        ```

   # [Python](#tab/python16)

     * [SDK reference](/python/api/botbuilder-core/botbuilder.core.teams.teamsactivityhandler?view=botbuilder-py-latest#botbuilder-core-teams-teamsactivityhandler-on-teams-channel-created&preserve-view=true)

        ```python
        async def on_teams_channel_created(
        self, channel_info: ChannelInfo, team_info: TeamInfo, turn_context: TurnContext
        ):
        # Sends a message activity to the sender of the incoming activity.
        return await turn_context.send_activity(
        MessageFactory.text(
        "The new channel is {channel_info.name}. The channel id is {channel_info.id}"
        )
        )
        ```
    ---

 | Action taken        | EventType         | Method called              | Description                | Scope |
 | ------------------- | ----------------- | -------------------------- | -------------------------- | ----- |
 | **Channel renamed**     | channelRenamed    | OnTeamsChannelRenamedAsync | The `channelRenamed` event is sent to your bot whenever a channel is renamed in a team where your bot is installed. | Team |

---
# [Invoke activities](#tab/activities)

 In this article, you’ll get to know about different invoke activities. If you would like to know about different events with activity handlers, select conversation events at the start of this article.
 An invoke activity is a type of activity that is sent to a bot when a user performs an action, such as clicking a button or tapping a card. Invoke activities are used to send a pre-defined payload back to the bot, which can then be used to trigger specific actions or responses. Invoke activities are typically used to send back confirmations, item selections, and to provide feedback or input to the bot.
---

::: zone-end

::: zone pivot="invoke-activity"

## Invoke activity

In this article, you’ll get to know about different invoke activities. If you would like to know about different events with activity handlers, select conversation events at the start of this article.

An invoke activity is a type of activity that is sent to a bot when a user performs an action, such as clicking a button or tapping a card. Invoke activities are used to send a pre-defined payload back to the bot, which can then be used to trigger specific actions or responses. Invoke activities are typically used to send back confirmations, item selections, and to provide feedback or input to the bot.

# [C#](#tab/dotnet15)

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

# [JavaScript](#tab/javascript15)

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

# [Python](#tab/python15)

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

---

The invoke activities listed in this section are for conversational bots in Teams. The Bot Framework SDK also supports invoke activities specific to message extensions. For more information, see [what are message extensions](../messaging-extensions/what-are-messaging-extensions.md).

::: zone-end

## Handling errors in events

When a bot encounters an error while handling different events or activities, don't send messages that have no meaningful context to the conversation as shown in the following screenshot:

:::image type="content" source="~/assets/images/handling-error.png" alt-text="Screenshot shows you the error message response in bot conversation.":::

In the development phase, it's always helpful to send meaningful messages in conversations, which provide additional details about a specific error for better debugging. However, in the production environment, you must log the errors or events to Azure Application Insights. For more information, see [add telemetry to your bot](https://aka.ms/bottelemetry).
