---
title: Interoperability between bot and tab
description: In this article, learn about interoperability between bot and tab.
ms.localizationpriority: medium
ms.topic: coceptual
ms.author: v-npaladugu
author: surbhigupta
ms.date: 05/02/2024
---

# Interoperability of bots and tabs

Bots and tabs are two capabilities of Microsoft Teams that can be used together to create a more engaging and interactive user experience. Bots are great way for conversational experiences through chat, while tabs allow a developer to embed their web applications directly into Teams. Tabs and bots can be combined to create more customized interactions between the user and an app, such as modifying a collaborative document or filling out a web-based form.

By combining bots and tabs, you can create a custom Copilot-like experience in Teams. For example, a user can send a message to the bot asking it to do some change in the tab, and the bot can respond with a confirmation message while also using a web socket connection to process the change in the tab application. This allows for a seamless integration between the tabs and bots, providing a more engaging and interactive experience for the user.

## Understand how bots and tabs work 

Before understanding the architecture for connecting bots and tabs together, it's helpful to understand how bots and tabs work within their own space. 

:::row:::
:::column span="":::

### Bots

The bot framework allows apps to receive and send messages from a server through Microsoft Entra ID registration that is specified in the app manifest (previously called Teams app manifest). When a user sends a message to the bot, the bot receives the message through some of the handler function that are defined in your server. 

:::image type="content" source="~/assets/images/bots/how-bot-work.png" alt-text="Sequence diagram that explains how bots work." lightbox="~/assets/images/bots/how-bot-work.png":::

This bi-directional interaction pattern is used for building conversational experiences and can be extended to other types of actions, such as a user selecting a Submit button in an Adaptive Card. 

:::column-end:::

:::column span="":::

### Tabs

Tabs allows you to embed your web applications directly into Teams. This allows customized interactions between the user and an app, such as modifying a collaborative document or filling out a web-based form. 

:::image type="content" source="~/assets/images/bots/how-tab-work.png" alt-text="Sequence diagram that explains how tabs work." lightbox="~/assets/images/bots/how-tab-work.png":::

Using the `@microsoft/teams-js NPM` package, an app can communicate with the Teams using a secure messaging channel called window post messages. Because the app is loaded as a website, that app can communicate with backends using standard JavaScript APIs, HTTP requests, web sockets, and so on. 

:::column-end:::

:::row-end:::

## Interoperability between bot and tab

Web applications can be architected in several ways, some of which might be more prepared for bi-directionality than others. For example, many API requests might be a one-off thing, such as "give me a list of tasks to display." Once those tasks are received, they won't update until the app explicitly re-requests the data. However, like how Teams has an open line of communication with the server to receive incoming messages, other applications might keep an active connection open with their own server. This is especially common for real-time collaborative apps. To use the task example, a collaborative task list might receive task updates via a web socket connection so that multiple different users/clients are always up to date with the latest updates. 

Put together, apps have a robust way to unify bots and tab applications seamlessly together.

### Server

For interoperability between bot and tab consider that the tab app and the bot backend are operating on the same server. However, the same could be applied if the servers are separate, such as through a micro-service architecture. 

Servers has a way of sending updates that the bot receives and routing it to the tab client. This article explain this scenario using web sockets. There are other ways as well to route the updates, such as polling the server for updates repeatedly from the client. 

### Authentication

Apps must have a consistent user identifier for both the bot and the tab, and that the user is authenticated in both contexts, such as through [single sign-on (SSO)](~/concepts/authentication/authentication.md). 

Thpugh there might be different ways authentication without SSO, such as through a custom authentication provider, where a user must log in from both the tab and bot. SSO helps the user experience more seamlessly integrated, which is imperative for this sort of copilot-like integration.

> [!Note]
> We strongly recommend using SSO to create a unified login between the tab and the bot. 

### Bot message updating the tab

Let's consider the scenario where a user sends a message to the bot asking it to do some change in the tab (for example, show me the latest MAU metrics for X feature). 

:::image type="content" source="~/assets/images/bots/user-bot-tab.png" alt-text="Sequence diagram that explains the communication flow between user, bot, and tab.":::

As we understand from the above diagram, when a user sends a message to the bot, the bot server is responding to the user through a bot message and using a web socket connection to process the change in the tab application. 

In this example, the socket connection with the tab can be retrieved through the `userId`. In a collaborative context, such as meeting stage, you might also want to use `userId` and `threadId` for socket connection mapping. Collaborative document apps might use `documentId` for socket connection mappings, opting to edit the document for all users viewing that document. As such, it's important to clearly define what mapping you expect to use for each tab surface. 

### Tab app change is notified in bot message

The tab app itself could be used to trigger a bot message, as shown in the below diagram: 

:::image type="content" source="~/assets/images/bots/tab-bot-user.png" alt-text="Sequence diagram that explains the communication flow between tab, bot, and user.":::

> [!NOTE]
> This scenario works well for personal apps, for collaborative contexts such as, meeting stage, the `threadId` might need to be sent to the app server from the tab using the `teams-js` SDK. That would ensure that the app sends the message to the right context, rather than to the user's personal conversation with the bot. 


## Sharing app state with the bot 

If a user asks the bot, **What am I looking at?**, a bot might not know what content the user is viewing in the tab application, and couldn't respond with an informed answer. Fortunately, it's straightforward for an app developer to do through the architecture discussed above.

One powerful scenario that we haven't yet discussed is how a bot might have awareness into the local application state of the user.

With an active web socket connection, or through simple REST APIs, the tab can easily send application state data to a server, which the server would then store/cache for later. For example, if a user opens a modal in the app and a new form is presented, the app could send some metadata to the server. Assuming the data was mapped appropriately (for example, "userId-threadId" <-> app state), when a user then sent the bot a message that data could be retrieved from memory/storage and handled accordingly (for example, fed into a prompt for an LLM). 

:::image type="content" source="~/assets/images/bots/bot-state.png" alt-text="Sequence diagram that explains the communication flow between tab and bot.":::