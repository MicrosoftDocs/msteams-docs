---
title: What are webhooks and connectors?
author: clearab
description: Understand how webhooks and connectors can connect your web services to the Teams client.
ms.topic: overview
ms.author: anclear
---
# What are webhooks and connectors?

Webhooks and connectors are a simple way to connect your web services to teams and teams and channels in Microsoft Teams.

Connectors allow users to subscribe to receive notifications and messages from your web services. They expose an HTTPS endpoint for your service to post messages to - typically in the form of cards.

## Incoming webhooks

Incoming webhooks are the simplest type of connector and a quick and easy way to connect a team's channel to an external service. For any channel (if enabled for that team), you can expose an HTTPS endpoint that accepts correctly formatted JSON and insert messages into the channel.

See [Create an incoming webhook](~/webhooks-and-connectors/how-to/add-incoming-webhook.md).

### User scenarios

Incoming webhooks are best for scenarios unique to a particular team. For example, you could create an incoming webhook in your DevOps channel and configure your build, deployment, and monitoring services to send alerts.

## Office 365 Connectors

An Office 365 Connector allows you to create a custom configuration page for your incoming webhook and package it as part of a Teams app. You can then distribute that app more broadly or even to our app store. You send messages primarily using Office 365 Connector cards that can also have a limited set of card actions. They are configured on the channel level but installed at the team level.

See [Create an Office 365 Connector](~/webhooks-and-connectors/how-to/connectors-creating.md).

### User scenarios

A weather connector that lets you choose a location and time of day to receive updates about tomorrow's forecast.

## Outgoing webhooks

Outgoing webhooks allow your users to send text messages from a channel to your web services. Once configured, users can @mention your app and send a message to your external service. Your service has five seconds to send a response to the message, potentially containing text or a card.

Outgoing webhooks are configured on a per-team basis and can't be included as part of a normal Teams app.

See [Create an outgoing webhook](~/webhooks-and-connectors/how-to/add-outgoing-webhook.md).

### User scenarios

Outgoing webhooks are best suited for completing team-specific workflows that don't require collecting or exchanging large amounts of information.

## Learn more

* [Planning your app](../concepts/extensibility-points.md)
* [Designing your app](../designing-your-app/designing-overview.md)
* [Building your app](../concepts/building-an-app.md)
* [Publishing your app](../concepts/deploy-and-publish/overview.md)
