---
title: Webhooks and connectors overview
author: clearab
description: Understand how webhooks and connectors can connect your web services to the Teams client.
ms.topic: overview
ms.author: anclear
---
# Webhooks and connectors

Webhooks and connectors are a simple way to connect your web services to channels and teams in Microsoft Teams.

## Outgoing webhooks

With outgoing webhooks users can send text messages from a channel to your web services. After configuring the outgoing webhooks, users are able to @mention your outgoing webhook and send a message to your service. Your service can have five seconds to respond to the message with text or a card.

Outgoing webhooks are configured on a per-team basis and cannot be included as part of a normal Teams app. They are best suited for completing team-specific workloads that do not require large amounts of information to be collected or exchanged.

See [Create an outgoing webhook](~/webhooks-and-connectors/how-to/add-outgoing-webhook.md).

## Connectors

Connectors permit users to subscribe for notifications and messages from your web services. They expose an HTTPS endpoint for your service to post messages typically in the form of cards.

## Incoming webhooks

Incoming webhooks are the simplest type of connectors. If incoming webhooks are enabled for a team in any channel, you expose an HTTPS endpoint that accepts correctly formatted JSON and inserts messages into that channel. Webhooks are a quick and easy way to connect a channel to your service and are best used for scenarios that are unique to a particular team. For example, you could create an incoming webhook in your DevOps channel and configure your build, simultaneously deploy and monitor services to send alerts.

See [Create an incoming webhook](~/webhooks-and-connectors/how-to/add-incoming-webhook.md). Add video incoming webhooks

## Office 365 Connectors

Office 365 Connectors help you to create a custom configuration page for your incoming webhook and package them as part of a Teams app. You can then distribute that app more broadly or even to our app store. You send messages primarily using Office 365 Connector cards and have the ability to add a limited set of card actions to them as well. A good example of this is a weather connector, where users can choose a location and time of day to receive updates about tomorrow's weather. They are configured on a channel level but are installed at a team level.

See [Create an Office 365 Connector](~/webhooks-and-connectors/how-to/connectors-creating.md).

Webhook and connectors
> [!VIDEO https://www.youtube-nocookie.com/embed/EqodWkS5PYM]