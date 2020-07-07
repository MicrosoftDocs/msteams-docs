---
title: What are connectors?
author: clearab
description: Understand how webhooks and connectors can connect your web services to the Teams client.
ms.topic: overview
ms.author: anclear
---
# What are connectors?

Connectors (and webhooks) are a simple way to connect your web services to channels and teams inside Microsoft Teams.

Connectors allow users to subscribe to receive notifications and messages from your web services. They expose an HTTPS endpoint for your service to post messages to - typically in the form of cards.

## Incoming webhooks

Incoming webhooks are a the simplest type of connector and a quick and easy way to connect a team's channel to an external service. For any channel (if enabled for that team), you can expose an HTTPS endpoint that accepts correctly formatted JSON and insert messages into the channel.

See [Create an incoming webhook](~/webhooks-and-connectors/how-to/add-incoming-webhook.md).

### User scenarios

Incoming webhooks are best for scenarios unique to a particular team. For example, you could create an incoming webhook in your DevOps channel and configure your build, deployment, and monitoring services to send alerts.

## Outgoing webhooks

Outgoing webhooks allow your users to send text messages from a channel to your web services. Once configured, your users will be able to @mention your outgoing webhook and send a message to your service. Your service has five seconds to send a response to the message, potentially containing text or a card.

Outgoing webhooks are configured on a per-team basis and can't be included as part of a normal Teams app.

See [Create an outgoing webhook](~/webhooks-and-connectors/how-to/add-outgoing-webhook.md).

### User scenarios

Outgoing webhooks are best suited for completing team-specific workflows that don't require collecting or exchanging large amounts of information.

## Office 365 Connectors

An Office 365 Connector allows you to create a custom configuration page for your incoming webhook and package it as part of a Teams app. You can then distribute that app more broadly or even to our app store. You send messages primarily using Office 365 Connector cards and have the ability to add a limited set of card actions to them as well. They are configured on the channel level but installed at the team level.

See [Create an Office 365 Connector](~/webhooks-and-connectors/how-to/connectors-creating.md).

### User scenarios

A weather connector that lets you choose a location and time of day to receive updates about tomorrow's forecast.

## Learn more

* Link to planning
* Link to designing
* Link to building
* Link to deploying
