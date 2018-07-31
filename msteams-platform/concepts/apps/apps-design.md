---
title: Design apps for Microsoft Teams
description: Describes how to design a great app
keywords: teams apps design
ms.date: 01/02/2018
---
# Design apps for Microsoft Teams

You can extend Microsoft Teams by developing an app that provides content and services. A single app can provide one or more *capabilities*. Deciding which capabilities to offer depends on what you want to do.

For example, your users might want personal views of a planning app just a click away. Or they might need to look up a customer-support ticket and add it directly to a conversation. Or perhaps receive real-time notifications about events in a business system. Or get assistance in scheduling an event for a group, translate a message into another language, or track incoming social-media messages and respond directly from Teams.

Your app can provide content and services in channels, which enable groups of people to work collaboratively, or in personal or group chats&mdash;or both. (The term we use for services in channels is *team scope*; for chats, *personal scope*.)

## Map your scenario to Teams capabilities

After you decide what your app should do, you can map those activities to capabilities in Teams:

*  For simple information display or interaction with web-based data, consider using [**tabs**](~/concepts/tabs/tabs-overview). Your tabs can be as simple as documents or notes or as rich as dashboards with data visualization, or design canvases.
*  For natural-language questions and lightweight tasks, consider using [**bots**](~/concepts/bots/bots-overview). Your bots might monitor and control build systems, schedule meetings or travel, or quickly gather information from team members. Notification-only bots can push relevant information directly to a specific user in a channel or a direct message.
*  To look up information and insert it directly into a conversation, consider using [**messaging extensions**](~/concepts/compose-extensions). With messaging extensions, you enable users to insert text, links, pictures, videos, and other rich media without switching to another app.

## Leverage what you've already built

The following table provides a few ideas about bringing resources you've already created into Microsoft Teams.

| If I have an existing&hellip; | In Microsoft Teams it can be a&hellip; |
| --- | --- |
| Web app | [Tab](~/concepts/tabs/tabs-overview) |
| Bot built with Bot Framework | [Bot](~/concepts/bots/bots-overview) (and a [Messaging extension](~/concepts/compose-extensions), if you'd like)
| Office 365 Connector | [Connector](~/concepts/connectors) |
| Web service (to look up information) | [Messaging extension](~/concepts/compose-extensions) |
| Outgoing webhook | [Custom bot](~/concepts/custom-bot) |
