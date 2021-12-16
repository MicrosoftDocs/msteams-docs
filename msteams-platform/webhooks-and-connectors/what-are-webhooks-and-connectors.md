---
title: Webhooks and connectors
author: v-rpatkur
description: Understand how webhooks and connectors can connect your web services to the Teams client.
ms.localizationpriority: medium
ms.topic: overview
ms.author: surbhigupta
---

# Webhooks and connectors

Webhooks and connectors help to connect the web services to channels and teams in Microsoft Teams. Using webhooks and connectors, you can create a simple bot for basic interaction, such as creating a workflow or other simple commands. They are available only in the team where you create them and are intended for simple processes specific to your company's workflow. It also allow an external service to post messages into a conversation and users to send messages to a service.

## Webhooks

Webhooks are user defined HTTP callback that notifies users about any action that has taken place in the Microsoft Teams channel. It is a way for an app to get real time data. The following are the two different types of Webhooks:

### Outgoing Webhooks

With Outgoing Webhooks, you can send text messages from a channel to the web services. After configuring the Outgoing Webhooks, users can @mention Outgoing Webhook and send a message to web services. The service responds within to the message either in the form of text or a card.

> [!NOTE]
> Outgoing Webhooks are configured on a per team basis and cannot be included as part of a Teams app.

### Incoming Webhooks

Incoming Webhooks help in posting messages from apps to Teams. If Incoming Webhooks are enabled for a team in any channel, it exposes the HTTPS endpoint, which accepts formatted JSON and inserts the messages into that channel. For example, you can create an Incoming Webhook in your DevOps channel, configure your build, and simultaneously deploy and monitor services to send alerts.

## Connectors

Connectors allow users to subscribe to receive notifications and messages from the web services. They expose the HTTPS endpoint for the service to post messages to Teams channels, typically in the form of cards.

### Office 365 Connectors

Office 365 Connectors allow you to create a custom configuration page for your Incoming Webhook and package them as part of a Teams app. You send messages primarily using Office 365 Connector cards and have the ability to add a limited set of card actions to them. For example, a weather connector that allows users to select a location and a time of day, to receive updates about tomorrow's weather. They are configured on a channel level but are installed at a team level.

> [!NOTE]
> You can distribute the Office 365 Connector Teams app to our AppStore.

## Create and send messages

Actionable messages allow users to take action without leaving their email client, increasing user engagement. With Office 365 connectors and Incoming Webhooks, you can send messages by posting a JSON payload to the webhook URL.

## Next step

> [!div class="nextstepaction"]
> [Create an Outgoing Webhook](~/webhooks-and-connectors/how-to/add-outgoing-webhook.md)

## See also

* [Create an Incoming Webhook](~/webhooks-and-connectors/how-to/add-incoming-webhook.md)
* [Create an Office 365 Connector](~/webhooks-and-connectors/how-to/connectors-creating.md)
* [Create and send messages](~/webhooks-and-connectors/how-to/connectors-using.md)
