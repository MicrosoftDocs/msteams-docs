---
title: Extensible points in the Teams client
author: clearab
description: Understand the extensibility points available to your app in the Microsoft Teams client.
ms.topic: conceptual
ms.author: anclear
---
# Extensible points in the Teams client

An app built on the Microsoft Teams Platform  extends the Microsoft Teams client (web, mobile, and desktop) with web services you host. The Teams Platform provides a rich and flexible set of extensibility points, UI constructs, and APIs for you to take advantage of while building your app. Your app can be as simple as embedding your existing website within a tab for your team, or a fully featured, multi-faceted app engaging your users across the entire breadth of the Teams client. You may choose to integrate an existing app, or create a new experience built entirely for Teams.

There are multiple places where the Microsoft Teams client can be extended to allow users to interact with your app. Depending on your scenario you may choose to focus on a single extension point (like a personal conversational bot), or combine multiple extension points.

## Teams, channels and group chats

Teams, channels and group chats allow multiple people to collaborate. Apps in this context make themselves available to all members of the group or conversation, typically focusing on enabling additional collaborative workflows or unlocking new social interactions. Your app will have access to APIs allowing it to get information about the members in the conversation, the channels in a team, and metadata about the team or conversation.

They can be extended with:

* [**Conversational bots**](~/bots/what-are-bots.md) interacting with members of the conversation through chat, and responding to events (like a new member being added, or a channel being renamed). All conversations with a bot in this context are visible to all members of the channel or group, so you'll need to ensure the conversation is relevant to everyone.

* [**Configurable Tabs**](~/tabs/what-are-tabs.md) providing a full-screen embedded web experience configured for the channel or group chat it is installed in. All members will interact on the same shared web-app, so a stateless single page app experience is typical.

* [**Webhooks and Connectors**](~/webhooks-and-connectors/what-are-webhooks-and-connectors.md) enabling external services to post messages to the conversation, and your users to send messages to your service. You can take advantage of cards and card actions to to create rich, actionable messages.

### Personal apps

[Personal apps](~/concepts/design/personal-apps.md) are the portion of your Teams app focusing on interactions with a single user. The experience is unique to each individual user. This portion of your app can be pinned to the left-navigation rail - enabling one-click access for your users.

They can contain:

* [**Conversational bots**](~/bots/what-are-bots.md) having a one-to-one conversation with the user. Because this is a private conversation, if your app needs to have a multi-turn conversation, or provide a notification relevant only to a single user, it is typically best to have that interaction in a personal app.

* [**Personal Tabs**](~/tabs/what-are-tabs.md) providing a full-screen embedded web experience.

## Messages

Messages are the heart of collaboration in Teams. With a [**messaging extension action command**](~/messaging-extensions/what-are-messaging-extensions.md), your app can allow users to invoke your app's API from a message, sending the contents of the message to your app for processing or action. Your app can respond by presenting a form (a task module) to the user to collect more information, sending a reply to the original message, or sending a message directly to the user.

## Writing messages

Your app can help users craft more effective messages by enabling them to search, or take action, in an external system, and insert the results in a rich, structured format complete with actionable buttons.

There are three ways your app can help users create better messages:

* [**Messaging Extension - search commands**](~/messaging-extensions/what-are-messaging-extensions.md) allowing them to quickly search an external system, preview the results of that search, then insert the result into the chat as a rich card.

* [**Messaging Extension - link unfurling**](~/messaging-extensions/what-are-messaging-extensions.md) allows your app to monitor web domains you're interested in. When a URL containing that domain is pasted into the compose message box, your app's API will be invoked, allowing you to add a rich card to the message with additional information about the item being linked to.

* [**Messaging Extension - action commands**](~/messaging-extensions/what-are-messaging-extensions.md) present your user with a modal form (a task module), submit the results of the form to your app, then either insert a message into the conversation directly, or create part of a message the user can edit before sending to the conversation.

## User Interface (UI) elements

In addition to extensibility points, the Microsoft Teams Platform provides flexible UI elements for apps to take advantage of. These elements allow you to create rich experiences that feel native to the Teams client.

### Cards & card actions

[Cards](~/task-modules-and-cards/what-are-cards.md) are user-interface containers defined by schematized JSON, that can contain multiple properties and attachments. They can contain formatted text, media, controls (like drop-down boxes and radio buttons), and buttons that trigger card actions. Card actions can send payloads to your app's API, open a link, initiate authentication flows, or send messages to conversations. The Microsoft Teams Platform supports multiple types of cards including Adaptive Cards, Hero Cards, Thumbnail Cards and more. They can be combined into Card Collections and displayed in a list or carousel.

### Task modules

[Task modules](~/task-modules-and-cards/what-are-task-modules.md) allow you to create modal popup experiences in your Teams application. Inside the popup you can run your own custom HTML/JavaScript code, show an `<iframe>` widget such as a YouTube or Microsoft Stream video, or display an Adaptive card. They are especially useful for initiating and completing tasks or displaying rich information like videos or Power BI dashboards. A popup experience is often more natural for users initiating and completing tasks compared to a tab or a conversation-based bot experience.

### Deep links

Your app can create [URL deep links](~/concepts/build-and-test/deep-links.md) to help navigate your user through your app, and the Teams client. You can create a deeplink for most entities within Teams, and some (like a new meeting request) allow you to pre-populate information using query strings in the URL. For example, your conversational bot could send a message to a channel with a deeplink to a task module that results in a card being sent as a one-to-one message to a user, that in turn contains a deeplink to create a new meeting with a specific user at a certain date/time. Use deep links to connect across the various extension points available to your app, keeping your user in the correct context at all times.

### Web content pages

A [web content page](~/tabs/how-to/create-tab-pages/content-page.md) is a webpage you host that can be embedded in a tab or a task module. To enable your webpage to be embedded in a Microsoft Teams client it must:

* Be hosted on an HTTPS.
* Be able to be embedded in an `<iframe>` by the Teams client.
* Include the Microsoft Teams JavaScript client SDK, and invoke the SDK's `initialize()` method on page load.
