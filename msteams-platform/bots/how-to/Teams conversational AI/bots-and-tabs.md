---
title: Synchronized bots and tabs
description: In this article, learn about interoperability between bot and tab.
ms.localizationpriority: medium
ms.topic: coceptual
ms.author: v-npaladugu
author: surbhigupta
ms.date: 05/02/2024
---

# Synchronized bots and tabs

Bots and tabs are two capabilities of Microsoft Teams that can be used together to create a more engaging and interactive user experience. Bots are great way for conversational experiences through chat, while tabs allow you to embed web applications directly into Teams. Tabs and bots can be combined to create more customized interactions between the user and an app, such as modifying a collaborative document or filling out a web-based form.

> [!NOTE]
> We recommend building bots using AI library for integrating bots and tabs.

By integrating bots and tabs, you can create custom copilot like experience in Teams. For example, a user can send a message to the bot asking it to do some change in the tab. The bot can respond with a confirmation message while also using a web socket connection to process the change in the tab application.

:::image type="content" source="~/assets/images/bots/sync-bot-tab.gif" alt-text="Example for bot message updating the tab." lightbox="~/assets/images/bots/sync-bot-tab.gif":::

This allows for a seamless integration between the tabs and bots, providing a more engaging and interactive experience for the user.

## Understand how bots  and tabs work

Before understanding the architecture for connecting bots and tabs together, it's helpful to understand how bots and tabs work within their own space. 

:::row:::
:::column span="2":::

### Bots

The bot framework allows apps to receive and send messages from a server through Microsoft Entra ID registration that is specified in the app manifest. When a user sends a message to the bot, the bot receives the message through handler functions defined in your server. 

:::image type="content" source="~/assets/images/bots/how-bot-work.png" alt-text="Sequence diagram that explains how bots work." lightbox="~/assets/images/bots/how-bot-work.png":::

This bi-directional interaction pattern is used for building conversational experiences and can be extended to other types of actions, such as a user selecting a Submit button in an Adaptive Card. 

:::column-end:::

:::column span="2":::

### Tabs

Tabs allow you to embed your web applications directly into Teams this allows customized interactions between the user and an app. When a user makes a change in the tab, it processes the change through some of the handler functions that are defined in your server.

:::image type="content" source="~/assets/images/bots/how-tab-work.png" alt-text="Sequence diagram that explains how tabs work." lightbox="~/assets/images/bots/how-tab-work.png":::

Through `@microsoft/teams-js NPM` package, tab can communicate with Teams using a secure messaging channel called window post messages and tab can communicate with backend using standard JavaScript APIs, HTTP requests, web sockets, and so on.

:::column-end:::

:::row-end:::

## Integration of bots and tabs

Teams maintains a constant connection with the server to get new messages, and other apps might do the same with their own servers. This is typical for apps that allow real-time collaboration. For example, a shared task list might use a web socket connection to sync tasks across different users or devices.

This gives apps a powerful way to integrate bots and tabs smoothly. The key aspects for interoperability between bot and tab are authentication and real time communication.

:::row:::
:::column span="":::

#### Authentication

Apps must have a consistent user identifier for both bot and tab, and that the user is authenticated in both contexts, such as through [Microsoft Entra ID](~/concepts/authentication/authentication.md). 

Though there might be different ways authentication without Microsoft Entra ID, such as through a custom authentication provider, where a user must sign-in from both the tab and bot. Microsoft Entra ID helps the user experience more seamlessly integrated, which is imperative for this sort of Copilot like integration.

:::column-end:::

:::column span="":::

#### Real time communication

For interoperability between bot and tab consider that the tab app and the bot backend are operating on the same server. However, the same could be applied if the servers are separate, such as through a micro-service architecture. 

Servers have a way of sending updates that the bot receives and routing it to the tab client. This article explains this scenario using web sockets. There are other ways as well to route the updates, such as polling the server for updates repeatedly from the client. 

:::column-end:::

:::row-end:::

> [!Note]
> We strongly recommend using Microsoft Entra ID to create a unified authentication between bot and tab.

Syncing

You can make bots and tabs work together in two ways, either by updating the tab through a bot message or updating the bot through a change in the tab.

# [Update the tab through bot message](#tab/update-the-tab-through-bot-message)

Let's consider the scenario where a user sends a message to the bot asking it to do some change in the tab. For example, users of an analytics platform might ask a bot, what are my latest usage metrics?.

:::image type="content" source="~/assets/images/bots/user-bot-tab.png" alt-text="Sequence diagram that explains the communication flow between user, bot, and tab." lightbox="~/assets/images/bots/user-bot-tab.png":::

As shown in the above flow chart, when a user sends a message to your bot, your server responds to the user through a bot message. In parallel, your bot server sends data through the same web socket connection that your tab application is using. When your tab receives that data, you can then process and display the update to your user.

In this example, the socket connection with the tab can be retrieved through the `userId`. In a collaborative context, such as meeting stage, you might also want to use `userId` and `threadId` for socket connection mapping. Collaborative document apps might use `documentId` for socket connection mappings, opting to edit the document for all users viewing that document. As such, it's important to clearly define what mapping you expect to use for each tab surface. 

# [Update the bot through change in the tab](#tab/update-the-bot-through-change-in-the-tab)

The tab app itself could be used to trigger a bot message, as shown in the following diagram: 

:::image type="content" source="~/assets/images/bots/tab-bot-user.png" alt-text="Sequence diagram that explains the communication flow between tab, bot, and user." lightbox="~/assets/images/bots/tab-bot-user.png":::

As we understand from the above flow chart, when a user makes a change in the tab, the tab server is responding to the user and using a web socket connection to process the change in the tab application.

In this example, the socket connection with the bot can be retrieved through the `threadId`. In a collaborative context, such as meeting stage, you might also want to use `userId` and `threadId` for socket connection mapping. Collaborative document apps might use `documentId` for socket connection mappings, opting to edit the document for all users viewing that document. As such, it's important to clearly define what mapping you expect to use for each tab surface.

> [!NOTE]
> This scenario works well for personal apps, for collaborative contexts such as, meeting stage, the `threadId` might need to be sent to the app server from the tab using the `teams-js` SDK. That would ensure that the app sends the message to the right context, rather than to the user's personal conversation with the bot.

---

## Get `threadId`

Tabs and bots have different ways of getting the `threadId`. This section will teach you how to get the `threadId` for use in your socket connection mapping in your bot and tab applications.

##### Get `threadId` for your bot

Follow this example to get the `threadId` from an incoming bot message in using the Teams AI library:

# [C#](#tab/csharp)

```csharp

  [Action("SomeAction")]
  public string SomeAction([ActionTurnContext] ITurnContext turnContext, [ActionTurnState] ListState turnState, [ActionParameters] Dictionary<string, object> parameters)
  {
      ArgumentNullException.ThrowIfNull(turnContext);
      ArgumentNullException.ThrowIfNull(turnState);
      ArgumentNullException.ThrowIfNull(parameters);

      var threadId = GetTeamsThreadId(turnContext.Activity);
      // TODO: get your active web socket connection mapped to threadId
      // TODO: send event through web socket

      return "item added. think about your next action";
  }

  private string GetTeamsThreadId(Activity activity)
  {
    // If not in a personal scope, the threadId will be included in the activity
    if (activity.Conversation.ConversationType != "personal")
    {
        return activity.Conversation.Id;
    }

    // Verify that the user has a valid aadObjectId
    var userAadId = activity.From.AadObjectId;
    if (string.IsNullOrEmpty(userAadId))
    {
        throw new Exception("Invalid AAD id for user");
    }

    // When in a personal scope, we need to construct the threadId manually
    // This assumes your bot AAD clientId is named BOT_ID in your environment variables
    var botId = Environment.GetEnvironmentVariable("BOT_ID");
    if (string.IsNullOrEmpty(botId))
    {
        throw new Exception("BOT_ID environment variable not set");
    }

    return $"19:{userAadId}_{botId}@unq.gbl.spaces";
  }

```

# [JavaScript](#tab/javascript)

```javascript

bot.ai.action(
  "SomeAction",
  async (context, state, paramaters) => {
    const threadId = getTeamsThreadId(context.activity);
    // TODO: get your active web socket connection mapped to threadId
    // TODO: send event through
    return "Sure thing! What else can I help you with?";
  }
);

/**
 * Utility function to get the relevant threadId for a given bot activity.
 * Needed because "personal" conversation types (1:1 chat between your user and bot)
 * will have a conversation.id that are different than the Teams threadId.
 */
function getTeamsThreadId(activity) {
  // If not in a personal scope, the threadId will be included in the activity
  if (activity.conversation.conversationType !== "personal") {
    return activity.conversation.id;
  }
  // Verify that the user has a valid aadObjectId
  const userAadId = activity.from.aadObjectId;
  if (!userAadId) {
    throw new Error("Invalid AAD id for user");
  }
  // When in a personal scope, we need to construct the threadId manually
  // This assumes your bot AAD clientId is named BOT_ID in your .env file
  return `19:${userAadId}_${process.env.BOT_ID}@unq.gbl.spaces`;
}

```

# [TypeScript](#tab/typescript)

```typescript

import { TurnState } from "@microsoft/teams-ai";
import { Activity, TurnContext } from "botbuilder";

// ... rest of bot setup

bot.ai.action(
  "SomeAction",
  async (context: TurnContext, state: ApplicationTurnState, paramaters: Record<string, any>) => {
    const threadId = getTeamsThreadId(context.activity);
    // TODO: get your active web socket connection mapped to threadId
    // TODO: send event through web socket
    return "Sure thing! What else can I help you with?";
  }
);

/**
 * Utility function to get the relevant threadId for a given bot activity.
 * Needed because "personal" conversation types (1:1 chat between your user and bot)
 * will have a `conversation.id` that are different than the Teams `threadId`.
 */
function getTeamsThreadId(activity: Activity): string {
  // If not in a personal scope, the threadId will be included in the activity
  if (activity.conversation.conversationType !== "personal") {
    return activity.conversation.id;
  }
  // Verify that the user has a valid aadObjectId
  const userAadId = activity.from.aadObjectId;
  if (!userAadId) {
    throw new Error("Invalid AAD id for user");
  }
  // When in a personal scope, we need to construct the threadId manually
  // This assumes your bot AAD clientId is named BOT_ID in your .env file
  return `19:${userAadId}_${process.env.BOT_ID}@unq.gbl.spaces`;
}

```
---

##### Get `threadId` for your tab

Follow this example to get the `threadId` from your tab application, using the `@microsoft/teams-js` npm package:

# [JavaScript](#tab/javascript1)

```javascript

import { app } from "@microsoft/teams-js";

// Get tab context
const context = await app.getContext();
// Get Teams AAD userId for current user
// NOTE: this is not an asserted value...better to use `authentication.getAuthToken()` and parse the `oid` claim
const userAadId = context.user?.id;
// Get threadId, if known
const threadId =
  context.chat?.id
  ?? context.channel?.id
  // Personal apps do not return chat.id, must construct manually
  ?? `19:${userAadId}_${process.env.BOT_ID}@unq.gbl.spaces`;

// TODO: connect to web socket / PubSub room mapped to threadId

```

# [TypeScript](#tab/typescript1)

```typescript

import { app } from "@microsoft/teams-js";

// Get tab context
const context = await app.getContext();
// Get Teams AAD userId for current user
// NOTE: this is not an asserted value...better to use `authentication.getAuthToken()` and parse the `oid` claim
const userAadId = context.user?.id;
// Get threadId, if known
const threadId =
  context.chat?.id
  ?? context.channel?.id
  // Personal apps do not return chat.id, must construct manually
  ?? `19:${userAadId}_${process.env.BOT_ID}@unq.gbl.spaces`;

// TODO: connect to web socket / PubSub room mapped to threadId

```

---

## Sharing app state

As discussed earlier, with an active web socket connection or through the REST APIs, the tab can send application state data to a server, which the server would then store or cache for later use.

For example, if a user opens a new form in the app as a modal, the app can send metadata to the server. Considering the data was mapped appropriately, `userId` or `threadId` to the app state then the data can be retrieved from memory or storage and handled accordingly, such as, feed the data into a prompt for a large language model (LLM).

:::image type="content" source="~/assets/images/bots/bot-state.png" alt-text="Sequence diagram that explains the communication flow between tab and bot." lightbox="~/assets/images/bots/bot-state.png":::

## See also

[Combine bots with tabs](~/resources/bot-v3/bots-with-tabs.md)