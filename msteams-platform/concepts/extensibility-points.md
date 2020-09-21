---
title: Entry points for Teams apps
author: heath-hamilton
description: Describes how and where people use your app in Teams.
ms.topic: conceptual
ms.author: lajanuar
ms.date: 09/22/2020
---
# Entry points for Teams apps

The Teams platform provides a flexible set of entry points where people can discover and use your app. Your app can be as simple as embedding an existing website in a personal tab or a multi-faceted app that users interact with across several entry points.

The most successful apps feel native to Teams, so it's important to carefully plan your app's entry points.

## Teams, channels, and group chats

Teams, channels, and group chats are collaboration spaces. Apps that use these entry points are available to all members and typically focus on additional workflows or unlocking new social interactions.

Here's how Teams app capabilities are commonly used in collaborative contexts:

* [**Tabs**](~/tabs/what-are-tabs.md) provide a full-screen embedded web experience configured for the team, channel, or group chat. All members interact with the same web-based content, so a stateless single page app experience is typical.

* [**Messaging extensions**](~/messaging-extensions/what-are-messaging-extensions.md) are shortcuts for inserting external content into a conversation or taking action on messages without leaving Teams. Link unfurling provides rich content when sharing content from a common URL.

* [**Bots**](~/bots/what-are-bots.md) interact with members of the conversation through chat and responding to events (like adding a new member or renaming a channel). Conversations with a bot in these contexts are visible to all members of the team, channel, or group, so bot conversations should be relevant to everyone.

* [**Webhooks and connectors**](~/webhooks-and-connectors/what-are-webhooks-and-connectors.md) allow an external service to post messages into a conversation and users to send messages to a service.

* [**Microsoft Graph REST API**](https://docs.microsoft.com/graph/teams-concept-overview) for getting data about teams, channels, and group chats to help automate and manage Teams processes.

## Personal apps

[Personal apps](~/concepts/design/personal-apps.md) focus on interactions with a single user. The experience in this context is unique to each user. Users can pin personal apps to the left navigation rail for quick access.

Here's how Teams capabilities are commonly used in personal contexts:

* [**Bots**](~/bots/what-are-bots.md) have one-on-one conversations with a user. Bots that require multi-turn conversations or provide notifications relevant only to a specific user are best suited in personal contexts.

* [**Tabs**](~/tabs/what-are-tabs.md) provide a full-screen embedded web experience that's meaningful to individual users.

## UI components

Apps typically exhibit one or more standard Teams UI components. Building out your app using these components leads to rich experiences that feel native to Teams users.

### Cards

[Cards](~/task-modules-and-cards/what-are-cards.md) are UI containers defined by JSON that can contain formatted text, media, controls (like dropdowns and radio buttons) and buttons that trigger an action.

Card actions can send payloads to your app's API, open a link, initiate authentication flows, or send messages to conversations. The Teams platform supports multiple cards, including Adaptive Cards, hero cards, thumbnail cards, and more. You can combine card collections and display in a list or carousel.

### Task modules

[Task modules](~/task-modules-and-cards/what-are-task-modules.md) provide modal experiences in Teams. They are especially useful for initiating workflows, collecting user input, or displaying rich information such as videos or Power BI dashboards. In task modules, you can run custom front-end code, display an `<iframe>` widget, or show an Adaptive Card.

When considering how you want to build your app, remember that modals are natural for users to enter information or complete tasks compared to a tab or a conversation-based bot experience.

### Deep links

Your app can create [URL deep links](~/concepts/build-and-test/deep-links.md) to help navigate your user through your app, and the Teams client. You can create a deep link for most entities within Teams, and some (like a new meeting request) allow you to pre-populate information using query strings in the URL.

For example, your conversational bot could send a message to a channel with a deep link to a task module that results in a card being sent as a one-to-one message to a user, that in turn contains a deep link to create a new meeting with a specific user at a certain date/time. Use deep links to connect across the various extension points available to your app, keeping your user in the correct context at all times.

### Web-based content

[Web-based content](~/tabs/how-to/create-tab-pages/content-page.md) is a webpage you host that can be embedded in a tab or task module.
