---
title: Webhooks and connectors
author: clearab
description: Understand how webhooks and connectors can connect your web services to the Teams client.
localization_priority: Normal
ms.topic: overview
ms.author: anclear
---

# Webhooks and connectors

Webhooks and connectors are simple ways to connect your web services to channels and teams in Microsoft Teams.
A webhook is a user-defined HTTP callback that notifies you about any action that has taken place in Microsoft Teams channel. It is a way for an app to get real-time data.
Connectors are inbound webhooks that give you a URL with which you can post messages anytime in a specified channel.

## Incoming webhooks

Incoming webhooks aids in posting messages from apps to Teams. If incoming webhooks are enabled for a team in any channel, you expose an HTTPS endpoint that accepts correctly formatted JSON and inserts messages into that channel. Webhooks are a quick and easy way to connect a channel to your service and are best used for scenarios that are unique to a particular team. For example, you can create an incoming webhook in your DevOps channel and configure your build, simultaneously deploy and monitor services to send alerts.

For more information, see [create an incoming webhook](~/webhooks-and-connectors/how-to/add-incoming-webhook.md).

## Outgoing webhooks

With outgoing webhooks you can send text messages from a channel to your web services. After configuring the outgoing webhooks, users can @mention your outgoing webhook and send a message to your service. Your service can respond to the message with text or a card.

Outgoing webhooks are configured on a per-team basis and cannot be included as part of a normal Teams app. They are best suited for completing team-specific workloads that do not require lot of information to be collected or exchanged.

For more information, see [create an outgoing webhook](~/webhooks-and-connectors/how-to/add-outgoing-webhook.md).

## Office 365 Connectors

You can create a custom configuration page for your incoming webhook and package them as part of a Teams app with Office 365 connectors. You can then distribute that app to the app store. You send messages primarily using Office 365 Connector cards and add a limited set of card actions to them. A good example of this is a weather connector, where users can choose a location and time of day to receive updates about the weather. Office 365 Connectors are configured on a channel level but are installed at a team level.

For more information, see [create an Office 365 Connector](~/webhooks-and-connectors/how-to/connectors-creating.md).

Webhooks and connectors
> [!VIDEO https://www.youtube-nocookie.com/embed/EqodWkS5PYM]

## See also
