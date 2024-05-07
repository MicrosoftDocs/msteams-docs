---
title: Interoperability between bot and tab
description: In this article, learn about interoperability between bot and tab.
ms.localizationpriority: medium
ms.topic: coceptual
ms.author: v-npaladugu
author: surbhigupta
ms.date: 05/02/2024
---

# Interoperability of bot with tab

The user problem is that bots aren't context-aware and accessible in the user's workflow. Users want to use intelligent assistants within the context of their tasks, but they often have to switch surfaces or lose context to interact with Teams bots. Users expect bots to understand and command the surfaces they're hosted in, such as personal tabs, collaboration stages, and meeting stages.
The user scenarios include building a telemetry dashboard, designing a video game, meeting to discuss product design, and creating a project plan. User scenarios involve interactive workflows that require bots to assist with complex, time-consuming, or mundane tasks. User story involves using different apps and bots in a meeting context.

The current experience is that bots have their own tab or are limited to the chat panel. Current experience of bots in Teams isn't optimal for interactive scenarios, as users have to leave their current app context to interact with the bot, or the bot can't access or affect the app surface at all.

## Understanding how bots and tabs work 

Before going too deep into the proposed architecture for connecting bots and tabs together, it's helpful to understand how bots and tabs work within their own silos. 

### Bots 

The bot framework allows apps to receive and send messages from a server. It leverages Microsoft Entra ID registrations that are referenced in the Teams app manifest. When a Teams user sends a message to that bot (for example, via @mention from a group context) then the bot receives that message through some handler function the developer defines in their server. 

Here is a simplified diagram showing how this works: 

:::image type="content" source="~/assets/images/bots/how-bot-work.png" alt-text="Sequence diagram that explains how bots work.":::

This simple bi-directional interaction pattern is great for building conversational experiences. It also extends to other types of actions, such as a user clicking a Submit action from an adaptive card (rather than sending a message). 

### Tabs

Where bots are great for conversational experiences through chat, tabs allow a developer to embed their web applications directly into Teams. This is great for more customized interactions between the user and an app, such as modifying a collaborative document or filling out a web-based form. Using the @microsoft/teams-js NPM package, an app can communicate with the Teams client using a secure messaging channel called window post messages. Because the app is loaded as a website, that app can communicate with backends using standard JavaScript APIs. This could be using simple HTTP requests, web sockets, etc. 

Web applications can be architected in several ways, some of which might be more prepared for bidirectionality than others. For example, many API requests might be a one-off thing, such as "give me a list of tasks to display." Once those tasks are received, they won't update until the app explicitly re-requests the data. However, like how Teams has an open line of communication with the server to receive incoming messages, other applications might keep an active connection open with their own server. This is especially common for real-time collaborative apps. To use the task example, a collaborative task list might receive task updates via a web socket connection so that multiple different users/clients are always up to date with the latest updates. 

Here is a common architecture for bidirectional interactions between server and client in web applications today: 

:::image type="content" source="~/assets/images/bots/how-tab-work.png" alt-text="Sequence diagram that explains how tabs work.":::

Now you might be thinking that this looks like the bot workflow above, which is because it is. The main difference is that Teams services serve as a middle layer between the bot and the Teams client. This same similarity will serve as the foundation for how to connect these two different platform capabilities together. 

## Interoperability between bot and tab 

For simplicity, we will be assuming that the tab app server and the bot backend are on the same server. However, there's no reason why the same couldn't apply if the servers are separate, such as through a micro-service architecture. The important thing is that the server has a way of sending updates that the bot receives and relaying that to the tab client. We will be using web sockets for this paper, but other strategies exist, such as polling the server for updates repeatedly from the client. We also will assume that the app has a consistent user identifier for both the bot and the tab, and that the user is authenticated in both contexts, such as through SSO. 

Note: there may be ways to do this without SSO, such as via a custom auth provider where a user must log in from both the tab and bot. However, we strongly recommend using SSO to create a unified login between the tab and the bot. This helps the experience feel more seamlessly integrated, which is imperative for this sort of copilot-like integration. 

First, let's take the scenario where a user sends a message to the bot asking it to do some change in the tab (for example, show me the latest MAU metrics for X feature). 

:::image type="content" source="~/assets/images/bots/user-bot-tab.png" alt-text="Sequence diagram that explains the communication flow between user, bot, and tab.":::

As you can see from this diagram, when a user sends the bot a message, the bot server is doing two things: responding to the user via a bot message and using a web socket connection to process the change in the tab application. While technically you could choose to not respond at all, it's probably good practice to send a confirmation message of some sort (for example, "Sure! I made this change. Let me know if you need anything else!").  

In this example, the socket connection with the tab can be retrieved through the userId. In a collaborative context (for example, meeting stage), you may also want to use "{userId}-{threadId}" <-> socket connection mapping, though your implementation may vary. For example, collaborative document apps like a whiteboard may use documentId <-> socket connection mappings, opting to edit the document for all users viewing that document. As such, it's important to clearly define what mapping you expect to use for each tab surface. 

Similarly, the tab app itself could be used to trigger a Teams message be sent, as shown in the below diagram: 

:::image type="content" source="~/assets/images/bots/tab-bot-user.png" alt-text="Sequence diagram that explains the communication flow between tab, bot, and user.":::

Note that while this scenario works well for personal apps, for collaborative contexts (for example, meeting stage), the threadId may need to be sent to the app server from the tab using the teams-js SDK. That would ensure that the app sends the message to the right context, rather than to the user's personal conversation with the bot. 

Put together, apps have a robust way to unify bots and tab applications seamlessly together.

## Sharing app state with the bot 

One powerful scenario that we haven't yet discussed is how a bot might have awareness into the local application state of the user. If a user says, "What am I looking at?" to a bot, a bot may not know what content the user has opened in the tab application, and thus couldn't give an informed answer. Fortunately, it's straightforward for an app developer to do through the architecture discussed above.  

With an active web socket connection, or through simple REST APIs, the tab can easily send application state data to a server, which the server would then store/cache for later. For example, if a user opens a modal in the app and a new form is presented, the app could send some metadata to the server. Assuming the data was mapped appropriately (for example, "userId-threadId" <-> app state), when a user then sent the bot a message that data could be retrieved from memory/storage and handled accordingly (for example, fed into a prompt for an LLM). 

:::image type="content" source="~/assets/images/bots/bot-state.png" alt-text="Sequence diagram that explains the communication flow between tab and bot.":::