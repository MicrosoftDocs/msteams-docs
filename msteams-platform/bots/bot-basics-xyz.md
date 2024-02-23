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

   # [New API](#tab/new-api2)

   1. To get started, you must update the source code in the following files:

      |File  |Contents |
      |---------|---------|
      |`repair.cs` | The main file of a function in Azure Functions. Defines an Azure Function that retrieves and filters repair records based on a query parameter from an HTTP GET request, and returns the results as a JSON response.|
      |`RepairData.cs`|The data source for the repair API. Contains a method that returns a hardcoded list of car repair tasks. |
      |`Models/RepairModel.cs`|Defines a data model that represents a repair task with properties such as ID, Title, Description, AssignedTo, Date, and Image.|
      |`appPackage/apiSpecificationFiles/repair.yml` |  A file that describes the structure and behavior of the repair API.|
      |`appPackage/responseTemplates/repair.json` |  A generated Adaptive Card that used to render API response.|

   1. After you've updated the source code, in the debug dropdown menu, select **Dev Tunnels (no active tunnel)** > **Create a Tunnel...**.

      :::image type="content" source="../assets/images/Copilot/bot-based-VS-dev-tunnel.png" alt-text="Screenshot shows the create a tunnel option in Visual Studio.":::

   1. Select the account to create the tunnel. The supported account types are Azure, Microsoft Account (MSA), and GitHub.
      1. **Name**: Enter a name for the tunnel.
      1. **Tunnel Type**: Select **Persistent** or **Temporary**.
      1. **Access**: Select **Public**.
      1. Select **OK**. Visual Studio displays a confirmation message that a tunnel is created.

       The tunnel you've created is listed under **Dev Tunnels**.

   1. Go to **Solution Explorer** and select your project.
   1. Right-click the menu and select **Teams Toolkit** > **Prepare Teams App Dependencies**.

      If prompted, sign in with a Microsoft 365 account. A message appears that the app is successfully prepared.

   1. Select the **F5** key or select **Debug** > **Start Debugging**. Visual Studio launches a Teams web client.

   # [OpenAPI Description](#tab/openapi-specification2)

   1. Enter OpenAPI specification URL or select **Browse..** to upload a file from your local machine.
   1. Select the dropdown and select the APIs from the list.
   1. Select **Create**. The project is scaffolded and you can find API specification, manifest, and response template files in the **appPackage** folder.
   1. Go to **Solution Explorer** and select your project.
   1. Right-click the menu and select **Teams Toolkit** > **Provision in the Cloud**.

      :::image type="content" source="../assets/images/Copilot/api-based-VS-provision-cloud.png" alt-text="Screenshot shows the Provision in the Cloud option under Teams Toolkit in Visual Studio.":::

      If prompted, sign in with a Microsoft 365 account. A message appears that the app is successfully prepared.

   1. Right-click your project and select **Teams Toolkit** > **Preview in** > **Teams**.
   1. Select the **manifest.json** file and select **Open**. Visual Studio launches a Teams web client.

    ---

1. Go to a chat and select **Actions and apps**.

 ---
# [Invoke activities](#tab/activities)

 In this article, you’ll get to know about different invoke activities. If you would like to know about different events with activity handlers, select conversation events at the start of this article.
 An invoke activity is a type of activity that is sent to a bot when a user performs an action, such as clicking a button or tapping a card. Invoke activities are used to send a pre-defined payload back to the bot, which can then be used to trigger specific actions or responses. Invoke activities are typically used to send back confirmations, item selections, and to provide feedback or input to the bot.

---
::: zone pivot="conversation-event"
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
