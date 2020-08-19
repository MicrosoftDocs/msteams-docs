---
title: Determining your Teams app scope
author: heath-hamilton
description: In planning your Teams app, you must decide if the app will be used in collaborative spaces, personal spaces, or both.
---
# Determining your app scope

People use Teams apps in collaborative and personal spaces. How your app behaves can differ if someone is using it with others or just one-on-one.

## Teams, channels, and group chats

Teams, channels, and group chats are collaboration spaces. Apps in these contexts are available to all members and typically focus on additional workflows or unlocking new social interactions.

Here's how Teams app capabilities are commonly used in collaborative contexts:

* [**Bots**](~/bots/what-are-bots.md) interact with members of the conversation through chat and responding to events (like adding a new member or renaming a channel). Conversations with a bot in these contexts are visible to all members of the team, channel, or group, so bot conversations should be relevant to everyone.

* [**Tabs**](~/tabs/what-are-tabs.md) provide a full-screen embedded web experience configured for the team, channel, or group chat. All members interact with the same web-based content, so a stateless single page app experience is typical.

* [**Connectors**](~/webhooks-and-connectors/what-are-webhooks-and-connectors.md) allow an external service to post messages into a conversation and users to send messages to a service.

* [**Messaging extensions**](~/messaging-extensions/what-are-messaging-extensions.md) are shortcuts that help people craft rich and interactive messages. Messages are the heart of collaboration in Teams. With messaging extensions, users can craft more effective messages by sharing complex content in a card, initiating workflows, or requesting input from others in the conversation.

* [**Microsoft Graph REST API**](../graph-api/rsc/resource-specific-consent.md) for getting data about teams, channels, and group chats to help automate and manage Teams processes.

## Personal apps

[Personal apps](~/concepts/design/personal-apps.md) focus on interactions with a single user. The experience in this context is unique to each user. Users can pin personal apps to the left navigation rail for quick access.

Here's how Teams capabilities are commonly used in personal contexts:

* [**Bots**](~/bots/what-are-bots.md) have one-on-one conversations with a user. Bots that require multi-turn conversations or provide notifications relevant only to a specific user are best suited in personal contexts.

* [**Tabs**](~/tabs/what-are-tabs.md) provide a full-screen embedded web experience that's meaningful to individual users.
