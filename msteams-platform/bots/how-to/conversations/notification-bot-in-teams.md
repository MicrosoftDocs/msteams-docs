---
title: Notification bot in Teams
author: surbhigupta
description: Learn how a notification bot works in Teams, and to customize notification behavior.
ms.topic: conceptual
ms.author: v-amprasad
ms.localizationpriority: high
---

# Notification bot in Teams

Microsoft Teams Toolkit enables you to build applications that capture events and send them as notifications to an individual, chat, group, or channel in Teams. You can send notifications as plain text or [Adaptive Cards](../../../task-modules-and-cards/cards/cards-reference.md#adaptive-card). The notification bot template creates an app that sends a message to Teams with Adaptive Cards triggered by HTTP post request. The app template is built using the TeamsFx SDK, which provides a simple set of functions over the Microsoft Bot Framework to implement this scenario. You can create notification bot in multiple scenarios, such as notification can be sent in teams DevOps channel if there is a build failure. When creating a pull request, a review request link can be sent as a notification to the reviewer.

:::image type="content" source="../../../assets/images/notification-bot/notification-new-event.png" alt-text="new notification event sample":::

**Advantages**

1. Ease of sending notifications to personal chat, group chat, and in a channel using user friendly API from TeamsFx SDK.
1. Enriching notifications by customizing them with an Adaptive Card.
1. Multiple mechanisms to trigger notifications such as HTTP and Timer Trigger with Azure functions.

**Limitation**

Notification bot's only major limitation is that the bot application needs to be installed with the corresponding scope before sending notification.

## Notification based on events

Bot Framework SDK provides the functionality to [proactively message in Teams](send-proactive-messages.md). TeamsFx SDK provides the functionality to manage bot's conversation references when a bot event is triggered. TeamsFx SDK recognizes following bot events:

|**Event**  |**Behavior**  |
|---------|---------|
|The first time you install a bot to a person, group, or Team.     |You need to add the target conversation reference to the storage.         |
|When the bot is uninstalled from a person, group, or Team.     |You need to remove the target conversation reference from the storage.         |
|When the team, which is installed by bot is deleted.     |You need to remove the target conversation reference from the storage.         |
|When the team, which is installed by bot is restored.     |You need to add the target conversation reference to the storage.         |
|When the bot messages.     |You need to add the target conversation reference to the storage, if it doesn't exist.         |

When you send notifications, TeamsFx SDK creates a new conversation from the selected conversation reference and sends a message. For advanced usage, you can directly access the conversation reference to execute your own bot logic:

# [TypeScript](#tab/ts)

```TypeScript
   // list all installation targets
for (const target of await bot.notification.installations()) {
    // call Bot Framework's adapter.continueConversation()
    await target.adapter.continueConversation(target.conversationReference, async (context) => {
        // your own bot logic
        await context...
    });
}
```

# [C#/.NET](#tab/dotnet)

```C#/.NET
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

## Notification bot installation

A notification bot needs to be installed into a team, or a group chat, or as personal app, depending on the required scope. You can select the installation target before adding the bot to your App.

:::image type="content" source="../../../assets/images/notification-bot/notification-installation-scope.png" alt-text="add installation scope":::

> [!NOTE]
> For more install options, see [configure default install options](../../../concepts/deploy-and-publish/apps-publish-overview.md#configure-default-install-options)

## Customize notification

Following are the customizations you can make to extend the notification template to fit your business requirements.

<br>

<details>

<summary><b>1. Customize the trigger point from event source</b></summary>

   1. `Restify` based notification

      When HTTP request is sent to `src/index.js` entry point, the default implementation sends an Adaptive Card to Teams. You can customize this event by modifying `src/index.js`. A typical implementation might call an API to retrieve events, data, or both, which can send an Adaptive Card as required. You can also add additional triggers by:

       * Creating a new routing: `server.post("/api/new-trigger", ...)`.
       * Adding Timer trigger(s) from widely used npm packages such as [cron](https://www.npmjs.com/package/cron), [node-schedule](https://www.npmjs.com/package/node-schedule), or from other packages.

         > [!NOTE]
         > By default Teams Toolkit scaffolds a single `restify` entry point in `src/index.js`.

   1. Azure Functions based notification

       * When you select timer trigger, the default implemented Azure function timer trigger (`src/timerTrigger.ts`) sends an Adaptive Card every 30 seconds. You can edit the file `*Trigger/function.json` to customize the `schedule` property. For more information, see [Azure function documentation](/azure/azure-functions/functions-bindings-timer?tabs=in-process&pivots=programming-language-javascript).

       * When you select `http` trigger, it's hit by HTTP request, and the default implementation sends an Adaptive Card to Teams.  You can change this event by customizing `src/*Trigger.ts`. This implementation can call an API to retrieve events, data, or both, which can send an Adaptive Card as required.
       You can also add Azure function triggers, such as:

       * `Event Hub` trigger to send notifications when an event is pushed to Azure Event Hub.

       * `Cosmos DB` trigger to send notifications when a Cosmos document is created or updated.

         > [!NOTE]
         > For more information on support triggers, see [Azure functions support triggers](/azure/azure-functions/functions-triggers-bindings?tabs=javascript).

<br>
</details>

<details>

<summary><b>2. Customize the notification content</b></summary>

The file `src/adaptiveCards/notification-default.json` defines the default Adaptive Card. You can use the [Adaptive Card designer](https://adaptivecards.io/designer/) to help visually design your Adaptive Card UI. `src/cardModels.ts` defines a data structure that is used to load data for the Adaptive Card. The binding between the model and the Adaptive Card is done by name matching such as `CardData.title` maps to `${title}` in the Adaptive Card. You can add, edit, or remove properties and their bindings to customize the Adaptive Card as required.

You can also add new cards if needed. How to build different types of Adaptive Cards with a list or table of dynamic contents using `ColumnSet` and `FactSet`, see [Adaptive Card notification sample](<https://github.com/OfficeDev/TeamsFx-Samples/tree/ga/adaptive-card-notification>).

<br>

</details>

<details>

<summary><b>3. Customize where notifications are sent</b></summary>

* Notifications to a channel:

# [TypeScript](#tab/ts1)

```TypeScript
               // list all installation targets
            for (const target of await bot.notification.   installations()) {
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

# [C#/.NET](#tab/dotnet1)

```C#/.NET
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

* Notifications to a group chat:

# [TypeScript](#tab/ts2)

```TypeScript
            // list all installation targets
            for (const target of await bot.notification.installations()) {
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

# [C#/.NET](#tab/dotnet2)

```C#/.NET
           // list all installation targets
           foreach (var target in await _conversation.Notification.GetInstallationsAsync())     {
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

* Notifications to a personal chat:

# [TypeScript](#tab/ts3)

  ```TypeScript
       // list all installation targets
       for (const target of await bot.notification.installations()) {
           // "Person" means this bot is installed as Personal app
           if (target.type === "Person") {
              // Directly notify the individual person
               await target.sendAdaptiveCard(...);
           }
       }
  ```

# [C#/.NET](#tab/dotnet3)

```C#/.NET
        // list all installation targets
        foreach (var target in await _conversation.Notification.GetInstallationsAsync()) {
        // "Person" means this bot is installed as Personal   app
           if (target.Type == NotificationTargetType.Person)
       {
          // Directly notify the individual person
          await target.SendAdaptiveCard(...);
       }
     }
  ```

---

* Notifications to a specific channel:

  ```TypeScript
         // find the first channel when the predicate is true.
         const channel = await bot.notification.findChannel(c => Promise.resolve(c.info.name === "MyChannelName"));

        // send adaptive card to the specific channel. 
        await channel?.sendAdaptiveCard(...);
   ```

   > [!NOTE]
   > To prevent an undefined output, ensure that you install the bot app in the 'General' channel of a Team.

* Notifications to a specific person:

  ```TypeScript

        // find the first person when the predicate is true.
        const member = await bot.notification.findMember(m => Promise.resolve(m.account.name === "Bob"));

        // send adaptive card to the specific person. 
        await member?.sendAdaptiveCard(...);
   ```

   > [!NOTE]
   > To prevent an undefined output and a missing notification, you need to include the specific person in notification installation scope.

<br>

</details>

## Customize initialization

You need to create `ConversationBot` to send notification.

> [!NOTE]
> Code is generated in the project.

# [JavaScript/TypeScript](#tab/jsts)

```JS/TS
/** Javascript/Typescript: bot/src/internal/initialize.*s **/
const bot = new ConversationBot({
    // The bot id and password to create BotFrameworkAdapter.
    // See https://aka.ms/about-bot-adapter to learn more about adapters.
    adapterConfig: {
        appId: process.env.BOT_ID,
        appPassword: process.env.BOT_PASSWORD,
    },
    // Enable notification
    notification: {
        enabled: true,
    },
});
```

# [C#/.NET](#tab/dotnet4)

```C#/.NET
/** .NET: Program.cs or Startup.cs **/
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

## Customize adapter

You can customize by creating your own adapter or customize the adapter after initialization. Following are the code sample for creating your adapter:

```Typescript

  // Create your own adapter
const adapter = new BotFrameworkAdapter(...);

// Customize your adapter, e.g., error handling
adapter.onTurnError = ...

const bot = new ConversationBot({
    // use your own adapter
    adapter: adapter;
    ...
});

// Or, customize later
bot.adapter.onTurnError = ...

```

## Add storage

Storage can be used to implement notification connections. You can add your own storage by the following code sample:

# [TypeScript](#tab/ts4)

```Typescript
   // implement your own storage
class MyStorage implements NotificationTargetStorage {...}
const myStorage = new MyStorage(...);

// initialize ConversationBot with notification enabled and customized storage
const bot = new ConversationBot({
    // The bot id and password to create BotFrameworkAdapter.
    // See https://aka.ms/about-bot-adapter to learn more about adapters.
    adapterConfig: {
        appId: process.env.BOT_ID,
        appPassword: process.env.BOT_PASSWORD,
    },
    // Enable notification
    notification: {
        enabled: true,
        storage: myStorage,
    },
});


```

# [C#/.NET](#tab/dotnet5)

```C#/.NET

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

* `.notification.localstore.json` if running locally.
* `${process.env.TEMP}/.notification.localstore.json`, if `process.env.RUNNING_ON_AZURE` is set to "1".

For sample implementation to use Azure blob storage, see [add notification storage implementation sample](https://github.com/OfficeDev/TeamsFx-Samples/blob/ga/adaptive-card-notification/bot/src/storage/blobsStorage.ts).

> [!NOTE]
> Using your own shared storage for production environment is recommended.

## Add authentication for notification API

If you select HTTP trigger, the scaffolded notification API doesn't have authentication or authorization enabled. Ensure that you add an authentication or authorization for this API before using it for production. You can perform this in the following ways:

* Use an API key. If you select Azure functions to host your notification bot, it provides [function access keys](/azure/azure-functions/security-concepts?tabs=v4#function-access-keys) that you can use.

* Use an access token issued by Azure Active Directory.

There can be more authentication or authorization solutions for an API. You can select as required.

## Connect to existing APIs

If you don't have the required SDK, and want to invoke external APIs in your code. The "Teams: Connect to an API" command in Microsoft Visual Studio Code Teams Toolkit extension, or "teamsfx add api-connection" command in TeamsFx CLI can be used to bootstrap code to call target APIs. For more information, see [connect to existing API](../../../toolkit/add-API-connection.md#steps-to-connect-to-api) document.

### Teams bot application or Teams Incoming Webhook

TeamsFx supports two ways to help you send notifications from your system to Teams by creating a Teams Bot Application or Teams Incoming Webhook.

In the following table you can see the comparison of the two different ways:

|         |Teams bot app  |Teams Incoming Webhook  |
|---------|---------|---------|
|Able to message individual person    |Yes      |No       |
|Able to message group chat     |Yes         |         |
|Able to message public channel     |Yes         |Yes         |
|Able to message private channel     |No       |Yes       |
|Able to send card message     |Yes       |Yes         |
|Able to send welcome message     |Yes      |No         |
|Able to retrieve Teams context     |Yes       |No       |
|Require installation step on Teams     |Yes         |No         |
|Require Azure resource     |Azure Bot Service         | No       |

### Incoming Webhook notification

Incoming Webhooks help in posting messages from apps to Teams. If Incoming Webhooks are enabled for a team in any channel, it exposes the HTTPS endpoint, which accepts correctly formatted JSON and inserts the messages into that channel. For example, you can create an Incoming Webhook in your DevOps channel, configure your build, and simultaneously deploy and monitor services to send alerts.
TeamsFx provides you with an [Incoming Webhook Notification Sample](https://github.com/OfficeDev/TeamsFx-Samples/tree/ga/incoming-webhook-notification#getting-started-with-incoming-webhook-notification-sample) that helps you:

* How to create an incoming webhook in Teams.
* How to send notifications using incoming webhooks with adaptive cards.

### FAQ

<br>

<details>

<summary><b>1. Why is the notification installations empty even though the bot app is installed in Teams?</b></summary>

Teams sends an event only at the first installation, so if the bot app is already installed before your notification bot service is launched, the installation event is omitted or didn't reach the bot service.

You can resolve this by the following ways:

* Send a message to your personal bot or mention your bot in GroupChat or Channel. This helps you to reach the bot service again with correct installation information.
* Uninstall the bot app from Teams then redebug or relaunch it again. You can resend the installation event to bot service.
Notification target connections are stored in the persistence storage. If you're using the default local file storage, all installations will be stored under `bot/.notification.localstore.json`.

> [!NOTE]
> For more information to add your own storage, see [add storage](#add-storage).

<br>

</details>

<details>

<summary><b>2.Why `BadRequest` or `BadArgument` error occurs when sending notification?</b></summary>

If the notification installation doesn't match the bot ID or password that is running, you can get a "Failed to decrypt conversation ID" error. One possible cause for this is the bot ID or password is changed due to cleaning local state or reprovisioning. You can resolve this by cleaning your notification storage. After cleaning notify to reinstall your bot in Teams to ensure that the new installation is up-to-date. Each stored notification installation is bound with one bot. If you're able to check your notification storage, its bot field should match the bot you're running such as the bot ID having the same GUID.

> [!NOTE]
> In case of local storage the default location is `.notification.localstore.json`.

<br>

</details>

<details>

<summary><b>3. Why notification target is lost after restarting or redeploying the bot app?</b></summary>

Notification target connections are stored in the persistence storage. If you're using the default local file storage, Azure Web App and Azure Functions will clean up the local file during a restart or redeploy. You can also uninstall the bot from Teams, then reinstall it to add connections again to the storage. Using your own shared storage for production environment is recommended.

<br>

</details>

<details>

<summary><b>4. Why is undefined returned when using the API `findChannel()`?</b></summary>

You can encounter an undefined error, when the bot app is installed into other channels instead of the General channel. To fix this error you can uninstall the bot app from Teams and redebug and relaunch it again. Ensure that the bot app is installed into the `General` channel after you've redebug and relaunched.

<br>

</details>

<details>

<summary><b>5. Can I know all the targets my bot is installed in and out of the notification project?</b></summary>

There are Microsoft Graph APIs to list apps installed in a team, group or chat. If required you need to iterate your team, group or chat into an installed app to be targeted. In the notification project, it uses persistence storage to store installation targets. For more information, see [notification based on events](#notification-based-on-events).

<br>

</details>

<details>

<summary><b>6. How to customize the azurite listening ports?</b></summary>

If azurite exits due to port in use, you can specify another listening port and update the connection string of `AzureWebJobsStorage` in `bot/local.settings.json`

<br>

</details>

<details>

<summary><b>7. How to extend my notification bot to support command and response?</b></summary>

Perform the following steps to extend my notification bot to support command and response:

1. Open file bot\src\internal\initialize.ts(js), update your conversationBot initialization to enable command and response:

:::image type="content" source="../../../assets/images/notification-bot/notification-support-command-response.png" alt-text="add support command and response":::

1. How to add command and response to your bot, see the [instructions](https://github.com/OfficeDev/TeamsFx/wiki/Respond-to-chat-commands-in-Teams#How-to-add-more-command-and-response).

<br>

</details>

<details>

<summary><b>8. How to extend my notification bot to support adaptive card actions?</b></summary>

To add adaptive card actions in notification bot, see the following [steps](workflow-bot-in-teams.md#add-card-actions).

<br>

</details>

## See also

* [Build bots for Teams](../../what-are-bots.md)
* [Build your first bot app using JavaScript](../../../sbs-gs-bot.yml)
* [Build notification bot with JavaScript](../../../sbs-gs-notificationbot.yml)
* [Adaptive Cards](../../../task-modules-and-cards/what-are-cards.md#adaptive-cards)
* [Conversation basics](conversation-basics.md)
