---
title: Determining your Teams app contexts
author: heath-hamilton
description: In planning your Teams app, you must decide if the app will be used in collaborative spaces, personal spaces, or both.
---
# Getting to know Teams UI conventions

Apps typically exhibit one or more standard Teams UI conventions. Building out your app's capabilities using these conventions leads to rich experiences that feel native to Teams users.

## Cards

[Cards](~/task-modules-and-cards/what-are-cards.md) are UI containers defined by schematized JSON that can contain multiple properties and attachments. They can contain formatted text, media, controls (like dropdown boxes and radio buttons) and buttons that trigger card actions.

Card actions can send payloads to your app's API, open a link, initiate authentication flows, or send messages to conversations. The Teams platform supports multiple types of cards, including Adaptive Cards, hero cards, thumbnail cards, and more. You can combine card collections and displayed in a list or carousel.

## Task modules

[Task modules](~/task-modules-and-cards/what-are-task-modules.md) provide modal popup experiences in Teams. They are especially useful for initiating workflows, collecting user input, or displaying rich information such as videos or Power BI dashboards. In task modules, you can run custom front-end code, display an `<iframe>` widget, or show an Adaptive Card.

When considering how you want to build your app, remember that modals are natural for users to enter information or complete tasks compared to a tab or a conversation-based bot experience.

## Deep links

Your app can create [URL deep links](~/concepts/build-and-test/deep-links.md) to help navigate your user through your app, and the Teams client. You can create a deeplink for most entities within Teams, and some (like a new meeting request) allow you to pre-populate information using query strings in the URL. 

For example, your conversational bot could send a message to a channel with a deeplink to a task module that results in a card being sent as a one-to-one message to a user, that in turn contains a deeplink to create a new meeting with a specific user at a certain date/time. Use deep links to connect across the various extension points available to your app, keeping your user in the correct context at all times.

## Web-based content

[Web-based content](~/tabs/how-to/create-tab-pages/content-page.md) is a webpage you host that can be embedded in a tab or task module. To embed your webpage in the Teams client, it must:

* Include `HTTPS` in the URL.
* Be embedded in an `<iframe>`.
* Include the Microsoft Teams JavaScript client SDK and invoke the SDK's `initialize()` method on page load.

## Next steps

* [Designing your app](../../tabs/design/tabs.md)
