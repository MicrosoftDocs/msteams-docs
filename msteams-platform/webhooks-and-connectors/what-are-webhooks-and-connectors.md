---
title: What are webhooks and connectors?
author: clearab
description: Understand how webhooks and connectors can connect your web services to the Teams client.
ms.topic: overview
ms.author: anclear
---
# What are webhooks and connectors?

Webhooks and connectors are a simple way to connect your web services to channels and teams inside Microsoft Teams. 

## Outgoing webhooks

Outgoing webhooks allow your users to send text messages from a channel to your web services. Once configured, your users will be able to @mention your outgoing webhook and send a message to your service. Your service will have five seconds to send a response to the message, potentially containing text or a card.

Outgoing webhooks are configured on a per-team basis, cannot be included as part of a normal Teams app. They are best suited for completing team-specific workloads that don't require large amounts of information to be collected or exchanged.

See [Create an outgoing webhook](~/webhooks-and-connectors/how-to/add-outgoing-webhook.md).

## Connectors

Connectors allow users to subscribe to receive notifications and messages from your web services. They expose an HTTPS endpoint for your service to post messages to - typically in the form of cards.

### Incoming webhooks

Incoming webhooks are the simplest type of connector. For any channel in team (if they are enabled for that team) you can choose to expose an HTTPS endpoint that will accept correctly formatted JSON and insert messages into that channel. They are a quick and easy way to connect a channel to your service, and are best used for scenarios that are unique to a particular team. For example, you could create an incoming webhook in your DevOps channel and configure your build, deployment and monitoring services to send alerts.

See [Create an incoming webhook](~/webhooks-and-connectors/how-to/add-incoming-webhook.md).

### Office 365 Connectors

Office 365 Connectors allow you to create a custom configuration page for your incoming webhook, and package them as part of a Teams app. You can then distribute that app more broadly, or even to our app store. You send messages primarily using Office 365 Connector cards, and have the ability to add a limited set of card actions to them as well. A good example of this is a weather connector that allows users to choose a location and time of day to receive updates about tomorrow's weather. They are configured on a channel level, but are installed at a team level.

See [Create an Office 365 Connector](~/webhooks-and-connectors/how-to/connectors-creating.md).
