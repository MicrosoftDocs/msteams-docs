---
title: Send notifications with a Bot
description: Learn about sending notifications using a bot app
ms.topic: conceptual
ms.localizationpriority: medium
ms.author: surbhigupta
ms.date: 10/03/2024
---

# Send notifications

With the notification capability in bots, you can send alerts, updates, or messages to users through various channels, ensuring timely communication. Utilizing bots for notifications offers several benefits, including enhanced user engagement, timely communication, increased conversation, improved customer experience, and reduced response time.

Notifications can be triggered by user interactions, system updates, data changes, error messages or alerts, reminders and follow-ups, or personalized recommendations. The article covers the following types of notifications:

- Interactive notifications
- Proactive notifications
- Scheduled notifications
- Event-driven notifications

By integrating notification capabilities, bots can effectively communicate with users, providing a seamless and interactive experience.

## Interactive notifications

Microsoft Teams Toolkit enables you to build applications that capture events and send them as interactive notifications to a personal, group chat, or a channel in Microsoft Teams. You can send notifications as plain text or [Adaptive Cards](../task-modules-and-cards/cards/cards-reference.md). The notification bot template creates an app that sends a message to Teams with Adaptive Cards triggered by HTTP post request.

The app template is built using the TeamsFx SDK, which provides a simple set of functions over Microsoft Bot Framework to implement your requirement. For example, a travel agency builds an app in Teams for their users to keep them up-to-date with the weather forecast. In the following flowchart, a Teams app notifies about the weather forecast to the users using an Adaptive Card:

:::image type="content" source="../assets/images/notification-bot/notification-new-scenario-diagram.png" alt-text="Image shows a weather forecast sample notification scenario" lightbox="../assets/images/notification-bot/notification-new-scenario-diagram.png":::

You can send a bot notification in the following scenarios:

- You want to notify everyone in a channel or chat about the same or related content​.
- Highly customizable UI in a Card​.
- Need quick response, include media content, or action buttons​.
- Send scheduled notifications​.
- Light up double badges on both Activity and Chat, Channel or App​.
- Add template in source code​.
- Handling localization manually.

**Advantages**

- Facilitates notifications to a personal, group chat, and in a channel, using APIs from TeamsFx SDK.
- Enhances user experience by customizing notification with an Adaptive Card.
- Provides multiple mechanisms to trigger notifications such as HTTP and schedule timer trigger with Azure Functions.

- A notification card easily integrates with a bot and provides a consistent user experience within the Bot app.​

> [!NOTE]
> Bot application needs to be installed with the corresponding scope before sending notification.

[Back to top](#interactive-notifications)

### Notification based on events

Bot Framework SDK provides the functionality to proactively message in Teams. TeamsFx SDK provides the functionality to manage bot's conversation references when a bot event is triggered. TeamsFx SDK recognizes the following bot events:

| **Event** | **Behavior** |
| --- | --- |
| The first time you install a bot to a person, group, or Team. | Add the target conversation reference to the storage. |
| When the bot is uninstalled from a person, group, or Team. | Remove the target conversation reference from the storage. |
| When the team installed by bot is deleted. | Remove the target conversation reference from the storage. |
| When the team installed by bot is restored. | Add the target conversation reference to the storage. |
| When the bot sends messages. | When the target conversation reference doesn't exist, add it to the storage. |

:::image type="content" source="../assets/images/notification-bot/notification-new-event.png" alt-text="Image shows a new notification event sample":::

When you send notifications, TeamsFx SDK creates a new conversation from the selected conversation reference, and then sends a message. For advanced usage, you can directly access the conversation reference to execute your own bot logic:

# [TypeScript](#tab/ts1)

```TypeScript
// list all installation targets
for (const target of await notificationApp.notification.installations()) {
    // call Bot Framework's adapter.continueConversationAsync()
    await target.adapter.continueConversationAsync(
        target.botAppId,
        target.conversationReference,
        async (context) => {
            // your own bot logic
            await context...
        }
    );
}
```

# [C#](#tab/csharp1)

```C#
   // list all installation targets
    foreach (var target in await _conversation.Notification.GetInstallationsAsync()) {
    // call Bot Framework's adapter.ContinueConversationAsync()
    await target.Adapter.ContinueConversationAsync(
        target.BotAppId,
        target.ConversationReference,
        async (context, ctx) =>
        {
            // your own bot logic
            await context...
        },
        cancellationToken);
}
```

---

[Back to top](#interactive-notifications)

### Notification bot installation

A notification bot needs to be installed into a team, or a group chat, or as personal app, depending on the required scope. You need to select the installation target before adding the bot to your app.

:::image type="content" source="../assets/images/notification-bot/notification-installation-scope.png" alt-text="Screenshows show how to add installation scope":::

For more install options, see [configure default install options](../concepts/deploy-and-publish/apps-publish-overview.md#configure-default-install-options).
For uninstalling, see [remove an app from Teams](https://support.microsoft.com/en-us/office/remove-an-app-from-teams-0bc48d54-e572-463c-a7b7-71bfdc0e4a9d).

[Back to top](#interactive-notifications)

### Customize notification

You can make the following customizations to extend the notification template to fit your business need:

- [Customize the trigger point from event source](#customize-the-trigger-point-from-event-source)
- [Customize the notification content](#customize-the-notification-content)
- [Customize where notifications are sent](#customize-where-notifications-are-sent)

#### Customize the trigger point from event source

You can customize the following triggers:

- `Restify` based notification:

  - When an HTTP request is sent to `src/index.js` entry point, the default implementation sends an Adaptive Card to Teams. You can customize this event by modifying `src/index.js`. A typical implementation can call an API to retrieve events, data, or both that can send an Adaptive Card as required. You can perform the following to add more triggers:

    - Create a new routing: `server.post("/api/new-trigger", ...)`.
    - Add timer trigger(s) from widely used npm packages, such as [cron](https://www.npmjs.com/package/cron), [node-schedule](https://www.npmjs.com/package/node-schedule), or from other packages.

    > [!NOTE]
    > By default Teams Toolkit scaffolds a single `restify` entry point in `src/index.js`.

- Azure Functions based notification:

  - When you select `timer` trigger, the default implemented Azure Function timer trigger `src/timerTrigger.ts` sends an Adaptive Card every 30 seconds. You can edit the file `*Trigger/function.json` to customize the `schedule` property. For more information, see [Azure Function documentation](/azure/azure-functions/functions-bindings-timer?tabs=python-v2%2Cin-process&pivots=programming-language-javascript#ncrontab-expressions).

    :::image type="content" source="../assets/images/notification-bot/notification-timer-triggered.png" alt-text="Sample of timer triggered notification":::

  - When you select `http` trigger, the HTTP request triggers the notification, and the default implementation sends an Adaptive Card to Teams. You can change this event by customizing `src/*Trigger.ts`. This implementation can call an API to retrieve events, data, or both, which can send an Adaptive Card as required.

    :::image type="content" source="../assets/images/notification-bot/notification-http-triggered.png" alt-text="sample of HTTP triggered notification":::

- Azure Function triggers:

  - `Event Hub` trigger to send notifications when an event is pushed to Azure Event Hub.

  - `Cosmos DB` trigger to send notifications when a Cosmos document is created or updated.

For more information on support triggers, see [Azure Functions support triggers](/azure/azure-functions/functions-triggers-bindings?tabs=javascript#supported-bindings).

#### Customize the notification content

The file `src/adaptiveCards/notification-default.json` defines the default Adaptive Card. You can use the [Adaptive Card designer](https://adaptivecards.io/designer/) to help visually design your Adaptive Card UI. The `src/cardModels.ts` defines a data structure that is used to load data for the Adaptive Card. The binding between the card model and the Adaptive Card is done by matching name such as `CardData.title` maps to `${title}` in the Adaptive Card. You can add, edit, or remove properties and their bindings to customize the Adaptive Card as required.

You can also add new cards if needed. For more information on how to build different types of Adaptive Cards with a list or table of dynamic contents using `ColumnSet` and `FactSet`, see [Adaptive Card notification sample](https://github.com/OfficeDev/TeamsFx-Samples/tree/v3/adaptive-card-notification).

#### Customize where notifications are sent

You can customize sending the notification to the following targets:

- Notifications to a personal chat:

  # [TypeScript](#tab/ts2)

    ```TypeScript
    // list all installation targets
    for (const target of await notificationApp.notification.installations()) {
        // "Person" means this bot is installed as Personal app
        if (target.type === "Person") {
            // Directly notify the individual person
            await target.sendAdaptiveCard(...);
        }
    }
    ```

  # [C#](#tab/csharp2)

    ```C#
    // list all installation targets
    foreach (var target in await _conversation.Notification.GetInstallationsAsync()) {
        // "Person" means this bot is installed as Personal app
        if (target.Type == NotificationTargetType.Person)
        {
            // Directly notify the individual person
            await target.SendAdaptiveCard(...);
        }
    }
    ```

---

- Notifications to a group chat:

  # [TypeScript](#tab/ts3)

    ```TypeScript
    // list all installation targets
    for (const target of await notificationApp.notification.installations()) {
        // "Group" means this bot is installed to a Group Chat
        if (target.type === "Group") {
            // Directly notify the Group Chat
            await target.sendAdaptiveCard(...);

                // List all members in the Group Chat then notify each member
                const members = await target.members();
                for (const member of members) {
                    await member.sendAdaptiveCard(...);
                }
            }
        
    }
    ```

  # [C#](#tab/csharp3)

    ```C#
    // list all installation targets
    foreach (var target in await _conversation.Notification.GetInstallationsAsync()) {
        // "Group" means this bot is installed to a Group Chat
        if (target.Type == NotificationTargetType.Group)
        {
            // Directly notify the Group Chat
            await target.SendAdaptiveCard(...);
        // List all members in the Group Chat then notify each member
            var members = await target.GetMembersAsync();
            foreach (var member in members) {
                await member.SendAdaptiveCard(...);
            }
        }
    }
    ```

---

- Notifications to a channel:

  # [TypeScript](#tab/ts4)

    ```TypeScript
    // list all installation targets
    for (const target of await notificationApp.notification.installations()) {
        // "Channel" means this bot is installed to a Team (default to notify General channel)
        if (target.type === "Channel") {
            // Directly notify the Team (to the default General channel)
            await target.sendAdaptiveCard(...);

            // List all members in the Team then notify each member
            const members = await target.members();
            for (const member of members) {
                await member.sendAdaptiveCard(...);
            }

            // List all channels in the Team then notify each channel
            const channels = await target.channels();
            for (const channel of channels) {
                await channel.sendAdaptiveCard(...);
            }
        }
    }
    ```

  # [C#](#tab/csharp4)

    ```C#
    // list all installation targets
    foreach (var target in await _conversation.Notification.GetInstallationsAsync()) {
        // "Channel" means this bot is installed to a Team (default to notify General channel)
        if (target.Type == NotificationTargetType.Channel)
        {
            // Directly notify the Team (to the default General channel)
            await target.SendAdaptiveCard(...);

            // List all members in the Team then notify each member
            var members = await target.GetMembersAsync();
            foreach (var member in members) {
                await member.SendAdaptiveCard(...);
            }

            // List all channels in the Team then notify each channel
            var channels = await target.GetChannelsAsync();
            foreach (var channel in channels) {
                await channel.SendAdaptiveCard(...);
            }
        }
    }
    ```

---

- Notifications to a specific channel:

     ```TypeScript
     // find the first channel when the predicate is true.
     const channel = await notificationApp.notification.findChannel(c => Promise.resolve(c.info.name === "MyChannelName"));
    
     // send adaptive card to the specific channel.
     await channel?.sendAdaptiveCard(...);
     ```

   > [!NOTE]
   > To prevent an undefined output, ensure that you install the bot app in the **General** channel of a Team.

- Notifications to a specific person:

     ```TypeScript
     // find the first person when the predicate is true.
     const member = await notificationApp.notification.findMember(m => Promise.resolve(m.account.name === "Bob"));
    
     // send adaptive card to the specific person. 
     await member?.sendAdaptiveCard(...);
     ```

     > [!NOTE]
     > To prevent an undefined output and a missing notification, you need to include the specific person in notification installation scope.

 [Back to top](#interactive-notifications)

### Customize initialization

You need to create `ConversationBot` to send notification.

> [!NOTE]
> The code is generated in project.

# [JavaScript/TypeScript](#tab/jsts)

```JavaScript / TypeScript
/** Javascript/Typescript: src/internal/initialize.*s **/
const notificationApp = new ConversationBot({
    // The bot id and password to create CloudAdapter.
    // See https://aka.ms/about-bot-adapter to learn more about adapters.
    adapterConfig: {
        MicrosoftAppId: config.botId,
        MicrosoftAppPassword: config.botPassword,
        MicrosoftAppType: "MultiTenant",
    },
    // Enable notification
    notification: {
        enabled: true,
    },
});
```

# [C#](#tab/csharp5)

```C#
/** .NET: Program.cs or Startup.cs **/
// Create the Conversation with notification feature enabled.
builder.Services.AddSingleton(sp =>
{
    var options = new ConversationOptions()
    {
        // To use your own CloudAdapter
        Adapter = sp.GetService<CloudAdapter>(),
        Notification = new NotificationOptions
        {
            BotAppId = builder.Configuration["MicrosoftAppId"],
        },
    };

    return new ConversationBot(options);
});
```

---

[Back to top](#interactive-notifications)

### Customize adapter

You can customize by creating your own adapter, or customize the adapter after initialization. Following is the code sample for creating your adapter:

```Typescript
// Create your own adapter
const adapter = new CloudAdapter(...);

// Customize your adapter, e.g., error handling
adapter.onTurnError = ...

const notificationApp = new ConversationBot({
    // use your own adapter
    adapter: adapter;
    ...
});

// Or, customize later
notificationApp.adapter.onTurnError = ...
```

[Back to top](#interactive-notifications)

### Add storage

Storage can be used to implement notification connections. You can add your own storage with the help of following code sample:

# [TypeScript](#tab/ts5)

```Typescript
// implement your own storage
class MyStorage implements NotificationTargetStorage {...}
const myStorage = new MyStorage(...);

// initialize ConversationBot with notification enabled and customized storage
const notificationApp = new ConversationBot({
    // The bot id and password to create CloudAdapter.
    // See https://aka.ms/about-bot-adapter to learn more about adapters.
    adapterConfig: {
        MicrosoftAppId: config.botId,
        MicrosoftAppPassword: config.botPassword,
        MicrosoftAppType: "MultiTenant",
    },
    // Enable notification
    notification: {
        enabled: true,
        storage: myStorage,
    },
});
```

# [C#](#tab/csharp6)

```C#
// implement your own storage
public class MyStorage : INotificationTargetStorage {...}

// initialize ConversationBot with notification enabled and customized storage
builder.Services.AddSingleton(sp =>
{
    var options = new ConversationOptions()
    {
        Adapter = sp.GetService<CloudAdapter>(),
        Notification = new NotificationOptions
        {
            BotAppId = builder.Configuration["MicrosoftAppId"],
            // Use your own storage
            Storage = new MyStorage(),
        },
    };

    return new ConversationBot(options);
});
```

---

If storage isn't provided, you can use a default local file storage, which stores notification connections into:

- `.notification.localstore.json` if running locally.
- `${process.env.TEMP}/.notification.localstore.json`, if `process.env.RUNNING_ON_AZURE` is set to 1.

If you're using the default local file storage, Azure web app and Azure Functions clean up the local file during a restart or redeploy. You can also uninstall the bot from Teams, then install it to again add connections to the storage.

The `NotificationTargetStorage` is different from Bot Framework SDK's [custom storage](/azure/bot-service/bot-builder-custom-storage). The notification storage requires `read`, `write`, `delete`, and `list` functionalities but Bot Framework SDK's storage has `read`, `write`, and `delete` functionalities and doesn’t have the `list` functionality.

For more information about Azure blob storage, see the [notification storage implementation sample](https://github.com/OfficeDev/TeamsFx-Samples/blob/v3/adaptive-card-notification/src/store/blobStore.ts).

> [!NOTE]
>
> - It's recommended to use your own shared storage for production environment.
> - If you implement your own Bot Framework SDK's storage, for example, `botbuilder-azure-blobs.BlobsStorage`, you need to implement another storage for notification. You can share the same Blob Connection String with different containers.

[Back to top](#interactive-notifications)

### Add authentication for notification API

If you select HTTP trigger, the scaffolded notification API doesn't have authentication or authorization enabled. Ensure that you add authentication or authorization for the API before using it for production. You can perform one of the following actions:

- Use an API key. You can use [function access keys](/azure/azure-functions/security-concepts?tabs=v4#function-access-keys), if you select Azure Functions to host your notification bot.

- Use an access token issued by Microsoft Entra ID. For more information, see [configure your app in Microsoft Entra ID](how-to/authentication/bot-sso-register-aad.md).

There can be more authentication or authorization solutions for an API, you can select as required.

[Back to top](#interactive-notifications)

### Connect to existing APIs

If you don't have the required SDK and want to invoke external APIs in your code, the **Teams: Connect to an API** command in Microsoft Visual Studio Code Teams Toolkit extension, or the  **teamsfx add api-connection** command in TeamsFx CLI can be used to bootstrap code to call target APIs. For more information, see [integrate existing third-party APIs](../toolkit/add-API-connection.md).

#### Teams bot application or Teams Incoming Webhook

TeamsFx supports two ways to help you send notifications from your system to Teams:

- Create a Teams bot app.
- Create Teams Incoming Webhook.

In the following table, you can see the comparison of the two different ways:

|&nbsp;   |Teams bot app  |Teams Incoming Webhook  |
|---------|---------|---------|
|Message individual person    | ✔️ | ❌ |
|Message group chat     | ✔️ | ❌ |
|Message public channel     | ✔️ | ✔️ |
|Message private channel     | ❌ | ✔️ |
|Send card message     | ✔️ | ✔️ |
|Send welcome message     | ✔️ | ❌ |
|Retrieve Teams context     | ✔️ | ❌ |
|Require installation steps in Teams     | ✔️ | ❌ |
|Require Azure resource     |Azure Bot Service         | ❌ |

#### Incoming Webhook notification

Incoming Webhooks help in posting messages from apps to Teams. If Incoming Webhooks are enabled for a Team in any channel, it exposes the HTTPS endpoint, which accepts correctly formatted JSON and inserts the messages into that channel. For example, you can create an Incoming Webhook in your DevOps channel, configure your build, and simultaneously deploy and monitor services to send alerts.
TeamsFx provides you with an [Incoming Webhook notification sample](https://github.com/OfficeDev/TeamsFx-Samples/tree/v3/incoming-webhook-notification) that helps you to:

- [Create Incoming Webhooks](../webhooks-and-connectors/how-to/add-incoming-webhook.md) in Teams.
- Send notifications using Incoming Webhooks with Adaptive Cards.

[Back to top](#interactive-notifications)

#### Send activity feed notifications

If you want to send activity feed notifications for your app, you can use the activity feed notification APIs in Microsoft Graph. For more information, see [Send activity feed notifications to users in Microsoft Teams](../tabs/send-activity-feed-notification.md).

## FAQ

<br>

<details>

<summary><b>Why is the notification installations empty even though the bot app is installed in Teams?</b></summary>

Teams sends an event only at the first installation. If the bot app is already installed before your notification bot service is launched, either the installation event didn't reach the bot service or is omitted.

You can resolve this issue in the following ways:

- Send a message to your personal bot or mention your bot in group chat or channel, which helps you to reach the bot service again with correct installation information.
- Uninstall the bot app from Teams then redebug or relaunch it. You can resend the installation event to bot service.

Notification target connections are stored in the persistence storage. If you're using the default local file storage, all installations are stored under `.notification.localstore.json`.

> [!NOTE]
> For more information to add your own storage, see [add storage](#add-storage).

<br>

</details>

<details>

<summary><b>Why Bad Request or Bad Argument error occurs when sending notification?</b></summary>

If the notification installation doesn't match the bot ID or password, you can get a **Failed to decrypt conversation ID** error. One possible cause for this error is that the bot ID or password is changed due to cleaning local state or reprovisioning.

You can resolve this issue by cleaning your notification storage. After cleaning, notify in Teams to reinstall your bot, and ensure that the new installation is up to date. Each stored notification installation is bound with one bot. If you're able to check your notification storage, its bot field should match the bot you're running such as the bot ID with the same GUID.

> [!NOTE]
> In case of local storage the default location is `.notification.localstore.json`.

<br>

</details>

<details>

<summary><b>Why notification target is lost after restarting or redeploying the bot app?</b></summary>

Notification target connections are stored in the persistence storage. If you're using the default local file storage, Azure web app and Azure Functions clean up the local file during a restart or redeploy. You can also uninstall the bot from Teams, then install it to again add connections to the storage. It's recommended to use your own shared storage for production environment.

<br>

</details>

<details>

<summary><b>Why is undefined error returned when using the API `findChannel`()?</b></summary>

You can encounter an undefined error, when the bot app is installed into other channels instead of the `General` channel. To fix this error, you can uninstall the bot app from Teams and redebug and relaunch it. After you've redebug and relaunched, ensure that the bot app is installed into the `General` channel.

<br>

</details>

<details>

<summary><b>Can I know all the targets where my bot is installed in and out of the notification project?</b></summary>

There are [Microsoft Graph APIs](/graph/api/team-list-installedapps) to list apps installed in a team, group, or chat. If necessary, iterate your team, group, or chat into an installed app to be targeted. In the notification project, it uses persistence storage to store installation targets. For more information, see [notification based on events](#notification-based-on-events).

<br>

</details>

<details>

<summary><b>How to customize the Azurite listening ports?</b></summary>

If Azurite exits due to port in use, you can [specify another listening port](/azure/storage/common/storage-use-azurite?tabs=visual-studio#blob-listening-port-configuration) and update the [connection string](/azure/storage/common/storage-use-azurite?tabs=visual-studio#http-connection-strings) of `AzureWebJobsStorage` in `local.settings.json`.

<br>

</details>

<details>

<summary><b>How to extend my notification bot to support command and response?</b></summary>

1. Go to `bot\src\internal\initialize.ts(js)` and update your `conversationBot` initialization to enable the notification feature:

    :::image type="content" source="../assets/images/notification-bot/notification-bot-enable.png" alt-text="Conversation bot initialization to enable notification feature." lightbox="../assets/images/notification-bot/notification-bot-enable.png":::

2. To add command to your bot, follow the instructions in [command bot in Teams](how-to/conversations/command-bot-in-teams.md).

<br>

</details>

<details>

<summary><b>How to extend my notification bot by adding workflow bot Adaptive Card actions?</b></summary>

The Adaptive Card action handler feature enables the app to respond to Adaptive Card actions that are triggered by end users to complete a sequential workflow. An Adaptive Card provides one or more buttons in the card to ask for user's input such as calling some APIs. The Adaptive Card then sends another Adaptive Card in the conversation to respond to the card action.

For more information on how to add adaptive card actions to command bot, see [workflow bot in Teams](how-to/conversations/workflow-bot-in-teams.md).

<br>

</details>

[Back to top](#interactive-notifications)

## Step-by-step guide

Follow the [step-by-step](../sbs-gs-notificationbot.yml) guide to build Teams notification bot.

## Proactive messages

[!INCLUDE [v4 to v3 pointer](~/includes/v4-to-v3-pointer-bots.md)]

A proactive message is any message sent by a bot that isn't in response to a request from a user. This message can include content, such as:

- Welcome messages
- Notifications
- Scheduled messages

> [!IMPORTANT]
>
> - To send proactive message, it's recommended to start with [building notification bot with JavaScript](../../../sbs-gs-notificationbot.yml) or [incoming webhook notification sample](https://github.com/OfficeDev/TeamsFx-Samples/tree/dev/incoming-webhook-notification). To get started, download [Teams Toolkit](https://marketplace.visualstudio.com/items?itemName=TeamsDevApp.ms-teams-vscode-extension) explore. For more information, see [Teams Toolkit documents](../../../toolkit/teams-toolkit-fundamentals.md).
>
> - Bots are available in [Government Community Cloud (GCC), GCC-High, and Department of Defense (DOD)](~/concepts/app-fundamentals-overview.md#government-community-cloud) environments. For proactive messages the bots must use the following end points for government cloud environments: <br> - GCC: `https://smba.infra.gcc.teams.microsoft.com/teams`<br> - GCCH: `https://smba.infra.gov.teams.microsoft.us/teams` <br> - DOD: `https://smba.infra.dod.teams.microsoft.us/teams`

To send a proactive message to a user, a group chat, or a team, your bot must have the requisite access to send the message. For a group chat or team, the app that contains your bot must be first installed in that location.

You can [proactively install your app using Microsoft Graph](#proactively-install-your-app-using-graph) in a team, if necessary, or use a [custom app policy](/microsoftteams/teams-custom-app-policies-and-settings) to install an app in your teams and for organization's users. For certain scenarios, you must [proactively install your app using Graph](#proactively-install-your-app-using-graph). For a user to receive proactive messages, install the app for the user or make the user a part of a team in which the app is installed.

Sending a proactive message is different from sending a regular message. There's no active `turnContext` to use for a reply. You must create the conversation before sending the message. For example, a new one-on-one chat or a new conversation thread in a channel. You can't create a new group chat or a new channel in a team with proactive messaging.

To send a proactive message, follow these steps:

1. [Get the Microsoft Entra user ID, user ID, team ID, or channel ID](#get-the-user-aad-id-user-id-team-id-or-channel-id), if necessary.
1. [Create the conversation](#create-the-conversation), if necessary.
1. [Get the conversation ID](#get-the-conversation-id).
1. [Send the message](#send-the-message).

The code snippets in the [samples](#samples) section are to create a one-on-one conversation. For links to samples for both one-on-one conversations and group or channels messages, see [code sample](#code-sample). To use proactive messages effectively, see [best practices for proactive messaging](#best-practices-for-proactive-messaging).

<a name='get-the-user-aad-id-user-id-team-id-or-channel-id'></a>

## Get the Microsoft Entra user ID, user ID, team ID, or channel ID

You can create a new conversation with a user or a conversation thread in a channel and you must have the correct ID. You can receive or retrieve this ID using any of the following ways:

- When your app is installed in a particular context, you receive an [`onMembersAdded` activity](~/bots/how-to/conversations/subscribe-to-conversation-events.md).
- When a new user is added to a context where your app is installed, you receive an [`onMembersAdded` activity](~/bots/how-to/conversations/subscribe-to-conversation-events.md).
- Every event that the bot receives contains the required information, which you can get from the bot context (TurnContext object).
- You can retrieve the [list of channels](~/bots/how-to/get-teams-context.md) in a team where your app is installed.
- You can retrieve the [list of members](~/bots/how-to/get-teams-context.md) of a team where your app is installed.

Regardless of how you get the information, store the `tenantId` and then store either the `userId`, or `channelId` to create a new conversation. You can also use the `teamId` to create a new conversation thread in the general or default channel of a team. Ensure that the bot is installed in the team before you can send a proactive message to a channel.

- The `aadObjectId` is unique to the user and can be retrieved using the [graph API](/graph/api/user-list) to create a new conversation in personal chat. Ensure that the bot is installed in the personal scope before you can send a proactive message. If the bot isn't installed in a personal scope when sending a proactive message using the `aadObjectId`, the bot returns a `403` error with `ForbiddenOperationException` message.

- The `userId` is unique to your bot ID and a particular user. You can't reuse the `userId` between bots.

- The `channelId` is global.

Create the conversation, after you have the user or channel information.

> [!NOTE]
> Sending proactive messages using `aadObjectId` is supported only in personal scope.

## Create the conversation

You can create the conversation if it doesn't exist or you don't know the `conversationId`. Create the conversation only once and store the `conversationId` value or `conversationReference` object.

To [create the conversation](/azure/bot-service/rest-api/bot-framework-rest-connector-api-reference#create-conversation), you need a `aadObjectId` or `userId`, `tenantId`, and `serviceUrl`.

For `serviceUrl`, use the value from an incoming activity triggering the flow or one of the global service URLs. If the `serviceUrl` isn't available from an incoming activity triggering the proactive scenario, use the following global URL endpoints:

- Public: `https://smba.trafficmanager.net/teams/`
- GCC: `https://smba.infra.gcc.teams.microsoft.com/teams`
- GCCH: `https://smba.infra.gov.teams.microsoft.us/teams`
- DOD: `https://smba.infra.dod.teams.microsoft.us/teams`

For a code sample, see the call `CreateConversationAsync` in the [**sample**](https://github.com/OfficeDev/Microsoft-Teams-Samples/blob/main/samples/bot-conversation/csharp/Bots/TeamsConversationBot.cs).

You can get the conversation when the app is installed for the first time. After the conversation is created, [get the conversation ID](#get-the-conversation-id). The `conversationId` is available in the conversation update events.

The conversation ID is unique for each bot within a specific channel, even in a multitenant environment. This ID ensures that the bot's messages are directed to the appropriate channel and doesn't interrupt with other bots or channels within the same or across different organizations.

If you don't have the `conversationId`, you can [proactively install your app using Graph](#proactively-install-your-app-using-graph) to get the `conversationId`.

## Get the conversation ID

Use either the `conversationReference` object or `conversationId` and `tenantId` to send the message. You can get this ID by either creating the conversation or storing it from any activity sent to you from that context. Store this ID for reference.

After you get the appropriate address information, you can send your message.

## Send the message

Now that you have the right address information, you can send your message. If you're using the SDK, you must use the `continueConversation` method, and the `conversationId` and `tenantId` to make a direct API call. To send your message, set the `conversationParameters`. See the [samples](#samples) section or use one of the samples listed in the [code sample](#code-sample) section.

> [!NOTE]
> Teams doesn't support sending proactive messages using email or User Principal Name (UPN).

Now that you've sent the proactive message, you must follow these best practices while sending proactive messages for better information exchange between users and the bot.

See the following video to learn how to send proactive message from bots:

<br>

> [!VIDEO https://www.microsoft.com/en-us/videoplayer/embed/RE4NHyk]
<br>

### Understand who blocked, muted, or uninstalled a bot

As a developer, you can create a report to understand which users in your organization have blocked, muted, or uninstalled a bot. This information may help your organization's admins to broadcast org-wide messages or drive app usage.

Using Teams, you can send a proactive message to the bot to verify if a user has blocked or uninstalled a bot. If the bot is blocked or uninstalled, Teams returns a `403` response code with a `subCode: MessageWritesBlocked`. This response indicates that the message sent by the bot isn't delivered to the user.

The response code is sent on a per-user basis and includes the identity of the user. You can compile the response codes for each user alongside their identity to create a report of all users who have blocked the bot.

An example of a 403 response code is below.

```http

HTTP/1.1 403 Forbidden

Cache-Control: no-store, must-revalidate, no-cache

 Pragma: no-cache

 Content-Length: 196

 Content-Type: application/json; charset=utf-8

 Server: Microsoft-HTTPAPI/2.0

 Strict-Transport-Security: max-age=31536000; includeSubDomains

 MS-CV: NXZpLk030UGsuHjPdwyhLw.5.0

 ContextId: tcid=0,server=msgapi-canary-eus2-0,cv=NXZpLk030UGsuHjPdwyhLw.5.0

 Date: Tue, 29 Mar 2022 17:34:33 GMT

{"errorCode":209,"message":"{\r\n  \"subCode\": \"MessageWritesBlocked\",\r\n  \"details\": \"Thread is blocked from message writes.\",\r\n  \"errorCode\": null,\r\n  \"errorSubCode\": null\r\n}"}
```

## Best practices for proactive messaging

Sending proactive messages to the users is an effective way to communicate with your users. However, from the user's perspective, the message appears unprompted. If there's a welcome message, it marks their first interaction with your app. It's important to use this functionality and provide the complete information to the user to understand the purpose of this message.

### Welcome messages

When proactive messaging is used to send a welcome message to a user, there's no context for why the user receives the message. Also, this is the first interaction of the user with your app. It's an opportunity to create a good first impression. A good user experience ensures better adoption of the app. Poor welcome messages can lead the users to block your app. Write a clear welcome message and iterate on the welcome message if it isn't having the desired effect.

A good welcome message can include the following:

- Reason for the message - It must be clear to the user why they're receiving the message. If your bot was installed in a channel and you sent a welcome message to all users, then let them know what channel it was installed in and who installed it.

- Your offer - Users must be able to identify what they can do with your app and what value can you bring to them.

- Next steps - Users should understand the next steps. For example, invite users to try out a command or interact with your app.

### Notification messages

To send notifications using proactive messaging, ensure your users have a clear path to take common actions based on your notification. If user actions are required in a tab app, use activity feed notifications instead of a bot. Ensure users have a clear understanding of why they've received a notification. Good notification messages generally include the following items:

- What happened? A clear indication of what happened to cause the notification.

- What was the result? It must be clear, what item is updated to get the notification.

- Who or what triggered it? Who or what took action, which caused the notification to be sent.

- What can users do in response? Make it easy for your users to take actions based on your notifications.

- How can users opt-out? You must provide a path for users to opt-out of more notifications.

To send messages to a large group of users, for example to your organization, proactively install your app using Graph.

To update or delete a proactive message sent by a notification only bot:

1. Keep track of the sent messages by storing their message IDs or conversation references when sending the proactive message.

1. Use `UpdateActivityAsync` or `DeleteActivityAsync` methods to update or delete the original message.

### Scheduled messages

When using proactive messaging to send scheduled messages to users, verify that your time zone is updated to their time zone. This ensures that the messages are delivered to the users at the relevant time. Schedule messages generally include:

- Why is the user receiving the message? Make it easy for your users to understand the reason for which they're receiving the message.

- What can user do next? Users can take the required action based on the message content.

## Proactively install your app using Graph

Proactively message users that have previously not installed or interacted with your app. For example, you want to use the [company communicator](~/samples/app-templates.md#company-communicator) to send messages to your entire organization. In this case, you can use the Graph API to proactively install your app for your users. Cache the necessary values from the `conversationUpdate` event your app receives upon installation.

You can only install apps that are in your organizational app catalog or the Microsoft Teams Store.

See [install apps for users](/graph/api/userteamwork-post-installedapps) in the Graph documentation and [proactive bot installation and messaging in Teams with Graph](../../../graph-api/proactive-bots-and-messages/graph-proactive-bots-and-messages.md). There's also a [Microsoft .NET framework sample](https://github.com/microsoftgraph/contoso-airlines-teams-sample/blob/283523d45f5ce416111dfc34b8e49728b5012739/project/Models/GraphService.cs#L176) on the GitHub platform.

### Examples

Ensure that you authenticate and have a [bearer token](/azure/bot-service/rest-api/bot-framework-rest-connector-authentication?view=azure-bot-service-4.0&preserve-view=true&tabs=multitenant) before creating a new conversation using the REST API. The following are REST API to create a conversation in different contexts:

- [REST API to create a conversation in a one-on-one chat](../../../resources/bot-v3/bot-conversations/bots-conv-proactive.md#examples).
- [REST API to create a conversation in a channel](../../../resources/bot-v3/bot-conversations/bots-conv-proactive.md#examples-for-creating-a-channel-conversation).
- REST API to Update message in conversation: To update an existing activity within a conversation, include the conversationId and activityId in the request endpoint. To complete this scenario, you must cache the activity ID returned by the original post call.

    ```http
    PUT {Service URL of your bot}/v3/conversations/{conversationId}/activities/{activityId}
    ```

    ```json
    
    {
        "type": "message",
        "text": "This message has been updated"
    }
    ```

    To update an existing activity within a conversation, include the `conversationId` and `activityId` in the request endpoint. To complete this scenario, you must cache the `activity ID` returned by the original post call.
    If the call succeeds, the API returns with the following response object.

    ```json
    {
        "id": "{{activityID}}"
    }
    ```

## Samples

The following code shows how to send proactive messages:

# [C#](#tab/dotnet)

- [SDK reference](/dotnet/api/microsoft.bot.builder.cloudadapterbase.continueconversationasync?view=botbuilder-dotnet-stable&preserve-view=true#microsoft-bot-builder-cloudadapterbase-continueconversationasync(system-string-microsoft-bot-schema-activity-microsoft-bot-builder-botcallbackhandler-system-threading-cancellationtoken))
- [Sample code reference](https://github.com/OfficeDev/Microsoft-Teams-Samples/blob/main/samples/graph-meeting-notification/csharp/MeetingNotification/Controllers/NotificationController.cs#L112)

```csharp
[Route("api/notify")]
[ApiController]
public class NotifyController : ControllerBase
{
    private readonly IBotFrameworkHttpAdapter _adapter;
    private readonly string _appId;
    private readonly ConcurrentDictionary<string, ConversationReference> _conversationReferences;

    public NotifyController(IBotFrameworkHttpAdapter adapter, IConfiguration configuration, ConcurrentDictionary<string, ConversationReference> conversationReferences)
    {
        _adapter = adapter;
        _conversationReferences = conversationReferences;
        _appId = configuration["MicrosoftAppId"] ?? string.Empty;
    }

    public async Task<IActionResult> Get()
    {
        foreach (var conversationReference in _conversationReferences.Values)
        {
            var newReference = new ConversationReference()
            {
                Bot = new ChannelAccount()
                {
                    Id = conversationReference.Bot.Id
                },
                Conversation = new ConversationAccount()
                {
                    Id = conversationReference.Conversation.Id
                },
                ServiceUrl = conversationReference.ServiceUrl,
            };

            // Sends a proactive message from the bot to a conversation.
            await ((BotAdapter)_adapter).ContinueConversationAsync(_appId, newReference, BotCallback, default(CancellationToken));
        }
        
        // Let the caller know proactive messages have been sent.
        return new ContentResult()
        {
            Content = "<html><body><h1>Proactive messages have been sent.</h1></body></html>",
            ContentType = "text/html",
            StatusCode = (int)HttpStatusCode.OK,
        };
    }

    private async Task BotCallback(ITurnContext turnContext, CancellationToken cancellationToken)
    {
        // If you encounter permission-related errors when sending this message, see
        // https://learn.microsoft.com/en-us/azure/bot-service/bot-builder-howto-proactive-message?view=azure-bot-service-4.0&tabs=csharp#avoiding-401-unauthorized-errors
        // Sends an activity to the sender of the incoming activity.
        await turnContext.SendActivityAsync("proactive hello");
    }
}
```

Example of a code snippet to demonstrate creating conversation reference.

```csharp
 var newReference = new ConversationReference()
        {
            Bot = new ChannelAccount()
            {
                Id = conversationReference.Bot.Id
            },
            Conversation = new ConversationAccount()
            {
                Id = conversationReference.Conversation.Id
            },
            ServiceUrl = conversationReference.ServiceUrl,
        };
```

# [JavaScript](#tab/javascript)

- [SDK reference](/javascript/api/botbuilder-core/turncontext?view=botbuilder-ts-latest&preserve-view=true#botbuilder-core-turncontext-getconversationreference)
- [Sample code reference](https://github.com/OfficeDev/Microsoft-Teams-Samples/blob/main/samples/graph-proactive-installation/nodejs/bots/proactiveBot.js#L59)

```javascript

async SendNotificationToAllUsersAsync(context) {
     const TeamMembers = await TeamsInfo.getPagedMembers(context);
     let Sent_msg_Cout = TeamMembers.members.length;
     TeamMembers.members.map(async member => {
         const ref = TurnContext.getConversationReference(context.activity);
         ref.user = member;
         await context.adapter.createConversation(ref, async (context) => {
             const ref = TurnContext.getConversationReference(context.activity);
             await context.adapter.continueConversation(ref, async (context) => {
                 await context.sendActivity("Proactive hello.");
             });
         });
     });
    await context.sendActivity(MessageFactory.text("Message sent:" + Sent_msg_Cout));
}

```

# [Python](#tab/python)

- [SDK reference](/python/api/botbuilder-core/botbuilder.core.botframeworkadapter?view=botbuilder-py-latest&preserve-view=true#botbuilder-core-botframeworkadapter-create-conversation)
- [Sample code reference](https://github.com/OfficeDev/Microsoft-Teams-Samples/blob/main/samples/bot-conversation/python/bots/teams_conversation_bot.py#L200)

```python
# Send message to all members.
async def _message_all_members(self, turn_context: TurnContext):
    team_members = await self._get_paged_members(turn_context)

    for member in team_members:
        # A conversation reference for the conversation that contains this activity.
        conversation_reference = TurnContext.get_conversation_reference(
            turn_context.activity
        )

        conversation_parameters = ConversationParameters(
            is_group=False,
            bot=turn_context.activity.recipient,
            members=[member],
            tenant_id=turn_context.activity.conversation.tenant_id,
        )

        async def get_ref(tc1):
            conversation_reference_inner = TurnContext.get_conversation_reference(
                tc1.activity
            )
            return await tc1.adapter.continue_conversation(
                conversation_reference_inner, send_message, self._app_id
            )

        async def send_message(tc2: TurnContext):
            return await tc2.send_activity(
                f"Hello {member.name}. I'm a Teams conversation bot."
            )

        await turn_context.adapter.create_conversation(
            conversation_reference, get_ref, conversation_parameters
        )

    # Sends an activity to the sender of the incoming activity.
    await turn_context.send_activity(
        MessageFactory.text("All messages have been sent")
    )

```

# [JSON](#tab/json)

```json
POST /v3/conversations
{
  "bot": {
    "id": "28:10j12ou0d812-2o1098-c1mjojzldxcj-1098028n ",
    "name": "The Bot"
  },
  "members": [
    {
      "id": "29:012d20j1cjo20211"
    }
  ],
  "channelData": {
    "tenant": {
      "id": "197231joe-1209j01821-012kdjoj"
    }
  }
}
```

You must supply the user ID and the tenant ID. If the call succeeds, the API returns the following response object:

```json
{
  "id":"a:1qhNLqpUtmuI6U35gzjsJn7uRnCkW8NiZALHfN8AMxdbprS1uta2aT-jytfIlsZR3UZeg3TsIONNInBHsdjzj3PtfHuhkxxvS1jZZ61UAbw8fIdXcNSJyTJm7YvHFOgxo"
}
```

---

## Code sample

The following table provides a simple code sample that incorporates basic conversation flow into a Teams application and how to create a new conversation thread in a channel in Teams:

| **Sample Name** | **Description** | **.NET** | **Node.js** | **Python** | **Manifest**
|---------------|--------------|--------|-------------|--------|--------|
| Teams Conversation Basics  | This sample app shows how to use different bot conversation events available in bot framework v4 for personal and teams scope.| [View](https://github.com/OfficeDev/Microsoft-Teams-Samples/tree/main/samples/bot-conversation/csharp) | [View](https://github.com/OfficeDev/Microsoft-Teams-Samples/tree/main/samples/bot-conversation/nodejs) | [View](https://github.com/OfficeDev/Microsoft-Teams-Samples/tree/main/samples/bot-conversation/python) | [View](https://github.com/OfficeDev/Microsoft-Teams-Samples/blob/main/samples/bot-conversation/csharp/demo-manifest/bot-conversation.zip)
| Start new thread in a channel | This sample shows how to start a thread in a specific Team's channel using Bot Framework v4. | [View](https://github.com/OfficeDev/Microsoft-Teams-Samples/tree/main/samples/bot-initiate-thread-in-channel/csharp) | [View](https://github.com/OfficeDev/Microsoft-Teams-Samples/tree/main/samples/bot-initiate-thread-in-channel/nodejs) | [View](https://github.com/OfficeDev/Microsoft-Teams-Samples/tree/main/samples/bot-initiate-thread-in-channel/python) | [View](https://github.com/OfficeDev/Microsoft-Teams-Samples/blob/main/samples/bot-initiate-thread-in-channel/csharp/demo-manifest/bot-initiate-thread-in-channel.zip) |
| Proactive installation of app and sending proactive notifications | This sample shows how you can use proactive installation of app for users and send proactive notifications by calling Microsoft Graph APIs. | [View](https://github.com/OfficeDev/Microsoft-Teams-Samples/tree/main/samples/graph-proactive-installation/csharp) | [View](https://github.com/OfficeDev/Microsoft-Teams-Samples/tree/main/samples/graph-proactive-installation/nodejs) | NA | [View](https://github.com/OfficeDev/Microsoft-Teams-Samples/blob/main/samples/graph-proactive-installation/csharp/demo-manifest/graph-proactive-installation.zip)
| Proactive Messaging | This is a sample that shows how to save user's conversation reference information to send proactive reminder message using Bots. | [View](https://github.com/OfficeDev/Microsoft-Teams-Samples/tree/main/samples/bot-conversation/csharp) | [View](https://github.com/OfficeDev/Microsoft-Teams-Samples/tree/main/samples/bot-proactive-messaging-teamsfx) | NA |

> [!div class="nextstepaction"]
> [More code sample of proactive messaging](/samples/officedev/msteams-samples-proactive-messaging/msteams-samples-proactive-messaging/)
