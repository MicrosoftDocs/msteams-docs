---
title: Notification bot in Teams
author: surbhigupta
description: Learn how a notification bot works in Teams, and to customize notification behavior.
ms.topic: conceptual
ms.author: v-amprasad
ms.localizationpriority: high
---

# Notification bot in Teams

Notification bot in Microsoft Teams enables you to build applications that captures the events and send them as notifications to an individual, chat, group, or channel in Teams. You can send notifications as plain text or [Adaptive Cards](../../../task-modules-and-cards/cards/cards-reference.md#adaptive-card).

:::image type="content" source="../../../assets/images/notification-bot/notification-new-event.png" alt-text="new notification event sample":::

**Advantages**
[Placeholder for advantages]

## Notification based on events

Bot Framework SDK provides the functionality to [proactively message in Teams](send-proactive-messages.md). TeamsFx SDK provides the functionality to manage bot's conversation references when bot event is triggered. TeamsFx SDK recognizes following bot events:

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

```.NET
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

## Customize notification

Following are the customizations you can make to extend the notification template to fit your business requirements.

<br>

<details>

<summary><b>1. Customize the trigger point from event source</b></summary>

   1. `Restify` based notification

      When a HTTP request is sent to `src/index.js` entry point, the default implementation sends an Adaptive Card to Teams. You can customize this event by modifying `src/index.js`. A typical implementation might call an API to retrieve events, data, or both, which can send an Adaptive Card as required. You can also add additional triggers by:

       * Creating a new routing: `server.post("/api/new-trigger", ...)`.
       * Adding Timer trigger(s) from widely used npm packages such as [cron](https://www.npmjs.com/package/cron), [node-schedule](https://www.npmjs.com/package/node-schedule), or from other packages.

         > [!NOTE]
         > By default Teams Toolkit scaffolds a single `restify` entry point in `src/index.js`.

   1. Azure Functions based notification

       * When you select timer trigger, the default implemented Azure function timer trigger (`src/timerTrigger.ts`) sends an Adaptive Card every 30 seconds. You can edit the file `*Trigger/function.json` to customize the `schedule` property. For more information, see [Azure function documentation](/azure/azure-functions/functions-bindings-timer?tabs=in-process&pivots=programming-language-javascript).

       * When you select `http` trigger, it's hit by a HTTP request, and the default implementation sends an Adaptive Card to Teams.  You can change this event by customizing `src/*Trigger.ts`. This implementation can call an API to retrieve events, data, or both, which can send an Adaptive Card as required.
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

```.NET
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

```.NET
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

```.NET
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

```
/** .NET **/
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

## Create storage

You can select to create your own storage. This storage can be used to implement notification connections. You can use the following code sample for creating your own storage:

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

If storage is not provided, you can use a default local file storage, which stores notification connections into:

* `.notification.localstore.json` if running locally.
* `${process.env.TEMP}/.notification.localstore.json`, if `process.env.RUNNING_ON_AZURE` is set to "1".
For sample implementation to use Azure blob storage, see [add notification storage implementation sample](https://github.com/OfficeDev/TeamsFx-Samples/blob/ga/adaptive-card-notification/bot/src/storage/blobsStorage.ts).

> [!NOTE]
> It's recommended that you use your own shared storage for production environment.

## Add authentication for notification API

If you choose HTTP trigger, the scaffolded notification API doesn't have authentication or authorization enabled. Ensure you add authentication or authorization for this API before using it for production. You can do so in the following ways:

* Use an API key. If you select Azure functions to host your notification bot, it provides [function access keys](/azure/azure-functions/security-concepts?tabs=v4#function-access-keys) that you can use.

* Use an access token issued by Azure Active Directory.

There can be more authentication or authorization solutions for an API. You can choose as required.

## Connect to existing APIs

If you don't have the required SDK, and want to invoke external APIs in your code. The "Teams: Connect to an API" command in Microsoft Visual Studio Code Teams Toolkit extension, or "teamsfx add api-connection" command in TeamsFx CLI can be used to bootstrap code to call target APIs. For more information, see [connect to existing API](../../../toolkit/add-API-connection.md#steps-to-connect-to-api) document.
