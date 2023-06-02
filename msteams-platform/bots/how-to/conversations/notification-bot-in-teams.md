---
title: Notification bot in Teams
author: surbhigupta
description: Learn how a notification bot works in Teams, and to customize notification behavior.
ms.topic: conceptual
ms.author: surbhigupta
ms.localizationpriority: high
---

# Notification bot in Teams

Microsoft Teams Toolkit enables you to build applications that capture events and send them as notifications to a personal, group chat, or a channel in Teams. You can send notifications as plain text or [Adaptive Cards](../../../task-modules-and-cards/cards/cards-reference.md). The notification bot template creates an app that sends a message to Teams with Adaptive Cards triggered by HTTP post request.

The app template is built using the TeamsFx SDK, which provides a simple set of functions over Microsoft Bot Framework to implement your requirement. For example, in a scenario where a travel agency builds an app in Teams for their customers to keep them up-to-date with the weather forecast. In the following diagram you can see a Teams app that sends notification to the travelers about the destination weather forecast:

:::image type="content" source="../../../assets/images/notification-bot/notification-new-scenario-diagram.png" alt-text="weather forecast sample notification scenario" lightbox="../../../assets/images/notification-bot/notification-new-scenario-diagram.png":::

You can create notification bot in other scenarios, such as a notification can be sent in teams DevOps channel if there's a build failure.

**Advantages**

* Facilitates notifications to a personal, group chat, and in a channel, using APIs from TeamsFx SDK.
* Enhances user experience by customizing notification with an Adaptive Card.
* Provides multiple mechanisms to trigger notifications such as HTTP and schedule timer trigger with Azure Functions.

> [!NOTE]
> Bot application needs to be installed with the corresponding scope before sending notification.

[Back to top](#notification-bot-in-teams)

## Notification based on events

Bot Framework SDK provides the functionality to proactively message in Teams. TeamsFx SDK provides the functionality to manage bot's conversation references when a bot event is triggered. TeamsFx SDK recognizes the following bot events:

|**Event**  |**Behavior**  |
|---------|---------|
|The first time you install a bot to a person, group, or Team.     |Add the target conversation reference to the storage.         |
|When the bot is uninstalled from a person, group, or Team.     |Remove the target conversation reference from the storage.         |
|When the team installed by bot is deleted.     |Remove the target conversation reference from the storage.         |
|When the team installed by bot is restored.     |Add the target conversation reference to the storage.         |
|When the bot sends messages.     |When the target conversation reference doesn't exist, add it to the storage.         |

:::image type="content" source="../../../assets/images/notification-bot/notification-new-event.png" alt-text="new notification event sample":::

When you send notifications, TeamsFx SDK creates a new conversation from the selected conversation reference, and then sends a message. For advanced usage, you can directly access the conversation reference to execute your own bot logic:

# [TypeScript](#tab/ts)

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

# [C#](#tab/csharp)

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

[Back to top](#notification-bot-in-teams)

## Notification bot installation

A notification bot needs to be installed into a team, or a group chat, or as personal app, depending on the required scope. You need to select the installation target before adding the bot to your app.

:::image type="content" source="../../../assets/images/notification-bot/notification-installation-scope.png" alt-text="add installation scope":::

For more install options, see [configure default install options](../../../concepts/deploy-and-publish/apps-publish-overview.md#configure-default-install-options).
For uninstalling, see [remove an app from Teams](https://support.microsoft.com/en-us/office/remove-an-app-from-teams-0bc48d54-e572-463c-a7b7-71bfdc0e4a9d).

[Back to top](#notification-bot-in-teams)

## Customize notification

You can make the following customizations to extend the notification template to fit your business need:

* [Customize the trigger point from event source](#customize-the-trigger-point-from-event-source)
* [Customize the notification content](#customize-the-notification-content)
* [Customize where notifications are sent](#customize-where-notifications-are-sent)

### Customize the trigger point from event source

You can customize the following triggers:

* `Restify` based notification

   When HTTP request is sent to `src/index.js` entry point, the default implementation sends an Adaptive Card to Teams. You can customize this event by modifying `src/index.js`. A typical implementation can call an API to retrieve events, data, or both that can send an Adaptive Card as required. You can perform the following to add more triggers:

  * Create a new routing: `server.post("/api/new-trigger", ...)`.
  * Add timer trigger(s) from widely used npm packages, such as [cron](https://www.npmjs.com/package/cron), [node-schedule](https://www.npmjs.com/package/node-schedule), or from other packages.

    > [!NOTE]
    > By default Teams Toolkit scaffolds a single `restify` entry point in `src/index.js`.

* Azure Functions based notification:

  * When you select timer `trigger`, the default implemented Azure Function timer trigger `src/timerTrigger.ts` sends an Adaptive Card every 30 seconds. You can edit the file `*Trigger/function.json` to customize the `schedule` property. For more information, see [Azure Function documentation](/azure/azure-functions/functions-bindings-timer?tabs=python-v2%2Cin-process&pivots=programming-language-javascript#ncrontab-expressions)

    :::image type="content" source="../../../assets/images/notification-bot/notification-timer-triggered.png" alt-text="sample of timer triggered notification":::

  * When you select `http` trigger, the HTTP request triggers the notification, and the default implementation sends an Adaptive Card to Teams.  You can change this event by customizing `src/*Trigger.ts`. This implementation can call an API to retrieve events, data, or both, which can send an Adaptive Card as required.

    :::image type="content" source="../../../assets/images/notification-bot/notification-http-triggered.png" alt-text="sample of HTTP triggered notification":::

* Azure Function triggers:

  * `Event Hub` trigger to send notifications when an event is pushed to Azure Event Hub.

  * `Cosmos DB` trigger to send notifications when a Cosmos document is created or updated.

For more information on support triggers, see [Azure Functions support triggers](/azure/azure-functions/functions-triggers-bindings?tabs=javascript#supported-bindings).

### Customize the notification content

The file `src/adaptiveCards/notification-default.json` defines the default Adaptive Card. You can use the [Adaptive Card designer](https://adaptivecards.io/designer/) to help visually design your Adaptive Card UI. The `src/cardModels.ts` defines a data structure that is used to load data for the Adaptive Card. The binding between the card model and the Adaptive Card is done by matching name such as `CardData.title` maps to `${title}` in the Adaptive Card. You can add, edit, or remove properties and their bindings to customize the Adaptive Card as required.

You can also add new cards if needed. For more information on how to build different types of Adaptive Cards with a list or table of dynamic contents using `ColumnSet` and `FactSet`, see [Adaptive Card notification sample](<https://github.com/OfficeDev/TeamsFx-Samples/tree/v3/adaptive-card-notification>).

### Customize where notifications are sent

You can customize sending the notification to the following targets:

* Notifications to a personal chat:

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

  ```C#
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

* Notifications to a group chat:

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

* Notifications to a channel:

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

* Notifications to a specific channel:

  ```TypeScript

  // find the first channel when the predicate is true.
  const channel = await notificationApp.notification.findChannel(c => Promise.resolve(c.info.name === "MyChannelName"));

  // send adaptive card to the specific channel.
  await channel?.sendAdaptiveCard(...);

   ```

   > [!NOTE]
   > To prevent an undefined output, ensure that you install the bot app in the **General** channel of a Team.

* Notifications to a specific person:

  ```TypeScript

  // find the first person when the predicate is true.
  const member = await notificationApp.notification.findMember(m => Promise.resolve(m.account.name === "Bob"));

  // send adaptive card to the specific person. 
  await member?.sendAdaptiveCard(...);

   ```

   > [!NOTE]
   > To prevent an undefined output and a missing notification, you need to include the specific person in notification installation scope.

[Back to top](#notification-bot-in-teams)

## Customize initialization

You need to create `ConversationBot` to send notification.

> [!NOTE]
> The code is generated in project.

# [JavaScript/TypeScript](#tab/jsts)

```JS/TS
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

# [C#](#tab/csharp1)

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

[Back to top](#notification-bot-in-teams)

## Customize adapter

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

[Back to top](#notification-bot-in-teams)

## Add storage

Storage can be used to implement notification connections. You can add your own storage with the help of following code sample:

# [TypeScript](#tab/ts4)

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

# [C#](#tab/csharp2)

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

* `.notification.localstore.json` if running locally.
* `${process.env.TEMP}/.notification.localstore.json`, if `process.env.RUNNING_ON_AZURE` is set to 1.

The `NotificationTargetStorage` is different from Bot Framework SDK's [custom storage](/azure/bot-service/bot-builder-custom-storage). The notification storage requires `read`, `write`, `delete`, `list` functionalities but Bot Framework SDK's storage has `read`, `write`, `delete`, and doesn’t have `list` functionality.

For sample implementation to use Azure blob storage, see [add notification storage implementation sample](https://github.com/OfficeDev/TeamsFx-Samples/blob/v3/adaptive-card-notification/src/storage/blobsStorage.ts).

> [!NOTE]
>
> * It's recommended to use your own shared storage for production environment.
> * If you implement your own Bot Framework SDK's storage, for example, `botbuilder-azure-blobs.BlobsStorage`, you need to implement another storage for notification. You can share the same Blob Connection String with different containers.

[Back to top](#notification-bot-in-teams)

## Add authentication for notification API

If you select HTTP trigger, the scaffolded notification API doesn't have authentication or authorization enabled. Ensure that you add authentication or authorization for the API before using it for production. You can perform one of the following actions:

* Use an API key. You can use [function access keys](/azure/azure-functions/security-concepts?tabs=v4#function-access-keys), if you select Azure Functions to host your notification bot.

* Use an access token issued by Azure Active Directory (Azure AD). For more information, see [Configure SSO for your bot in Azure AD](../authentication/bot-sso-register-aad.md).

There can be more authentication or authorization solutions for an API, you can select as required.

[Back to top](#notification-bot-in-teams)

## Connect to existing APIs

If you don't have the required SDK, and want to invoke external APIs in your code. The **Teams: Connect to an API** command in Microsoft Visual Studio Code Teams Toolkit extension, or **teamsfx add api-connection** command in TeamsFx CLI can be used to bootstrap code to call target APIs. For more information, see [Integrate existing third-party APIs](../../../toolkit/add-API-connection.md).

### Teams bot application or Teams Incoming Webhook

TeamsFx supports two ways to help you send notifications from your system to Teams:

* Create a Teams bot app.
* Create Teams Incoming Webhook.

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

### Incoming Webhook notification

Incoming Webhooks help in posting messages from apps to Teams. If Incoming Webhooks are enabled for a Team in any channel, it exposes the HTTPS endpoint, which accepts correctly formatted JSON and inserts the messages into that channel. For example, you can create an Incoming Webhook in your DevOps channel, configure your build, and simultaneously deploy and monitor services to send alerts.
TeamsFx provides you with an [Incoming Webhook notification sample](https://github.com/OfficeDev/TeamsFx-Samples/tree/v3/incoming-webhook-notification) that helps you:

* [Create an Incoming Webhook](../../../webhooks-and-connectors/how-to/add-incoming-webhook.md) in Teams.
* Send notifications using Incoming Webhooks with Adaptive Cards.

[Back to top](#notification-bot-in-teams)

## FAQ

<br>

<details>

<summary><b>Why is the notification installations empty even though the bot app is installed in Teams?</b></summary>

Teams sends an event only at the first installation. If the bot app is already installed before your notification bot service is launched, either the installation event didn't reach the bot service or is omitted.

You can resolve this issue in the following ways:

* Send a message to your personal bot or mention your bot in group chat, or channel, which helps you to reach the bot service again with correct installation information.
* Uninstall the bot app from Teams then redebug or relaunch it. You can resend the installation event to bot service.

Notification target connections are stored in the persistence storage. If you're using the default local file storage, all installations are stored under `.notification.localstore.json`.

> [!NOTE]
> For more information to add your own storage, see [add storage](#add-storage).

<br>

</details>

<details>

<summary><b>Why Bad Request or Bad Argument error occurs when sending notification?</b></summary>

If the notification installation doesn't match the bot ID or password, you can get a **Failed to decrypt conversation ID** error. One possible cause for this error is that the bot ID or password is changed due to cleaning local state or re-provisioning.

You can resolve this issue by cleaning your notification storage. After cleaning, notify in Teams to reinstall your bot, and ensure that the new installation is up-to-date. Each stored notification installation is bound with one bot. If you're able to check your notification storage, its bot field should match the bot you're running such as the bot ID with the same GUID.

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

  The command and response adds the ability for your bot to capture the commands sent in a Teams message and respond with Adaptive Cards. See the steps to [add command and response](command-bot-in-teams.md#add-command-and-response).

<br>

</details>

<details>

<summary><b>How to extend my notification bot by adding workflow bot Adaptive Card actions?</b></summary>

You can extend your notification bot by defining actions and use workflow bot to return an Adaptive Card in response to the action. To add an Adaptive Card in notification bot, see the steps to [add card action](workflow-bot-in-teams.md#add-card-actions).

<br>

</details>

[Back to top](#notification-bot-in-teams)

## Step-by-step guide

Follow the [step-by-step](../../../sbs-gs-notificationbot.yml) guide to build Teams notification bot.

## See also

* [Conversation basics](conversation-basics.md)
* [Build bots for Teams](../../what-are-bots.md)
* [Build your first bot app using JavaScript](../../../sbs-gs-bot.yml)
* [Proactive messages](send-proactive-messages.md)
* [Adaptive Cards](../../../task-modules-and-cards/cards/cards-reference.md#adaptive-card)
* [TeamsFx SDK](../../../toolkit/TeamsFx-SDK.md)
* [Bot Framework SDK](/azure/bot-service/bot-builder-basics)
* [Send proactive installation messages](../../../graph-api/proactive-bots-and-messages/graph-proactive-bots-and-messages.md)
