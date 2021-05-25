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
A webhook is a user-defined HTTP callback that notifies users about any action that has taken place in Microsoft Teams channel. It is a way for an app to get real-time data.
Connectors are incoming webhooks that provide a URL to post messages anytime in a specified channel.

## Outgoing webhooks

Webhooks help Teams to integrate with external apps. With outgoing webhooks you can send text messages from a channel to the web services. After configuring the outgoing webhooks, users can @mention outgoing webhook and send a message to web services. The service responds within five seconds to the message with text or a card.

> [!NOTE]
> Outgoing webhooks are configured on a per-team basis and cannot be included as part of a normal Teams app.

## Connectors

Connectors allow users to subscribe to receive notifications and messages from the web services. They expose HTTPS endpoint for the service to post messages to the users, typically in the form of cards.

### Incoming webhooks

Incoming webhooks aid in posting messages from apps to Teams. If incoming webhooks are enabled for a team in any channel, it exposes HTTPS endpoint, which accepts correctly formatted JSON and inserts the messages into that channel. You can create an incoming webhook in your DevOps channel, configure your build, and simultaneously deploy and monitor services to send alerts.

### Office 365 Connectors

Office 365 Connectors allow you to create a custom configuration page for your incoming webhook, and package them as part of a Teams app. You send messages primarily using Office 365 Connector cards, and have the ability to add a limited set of card actions to them as well. For example, a weather connector that allows users to choose a location and time of day, to receive updates about tomorrow's weather. They are configured on a channel level, but are installed at a team level.

> [!NOTE]
> You can distribute the Office 365 Connector Teams app to our AppStore.
## Send messages to connectors and webhooks

With Office 365 and incoming webhooks, you can send messages by posting a JSON payload to the webhook URL. JSON connector message is provided to create cards with rich inputs. You can create actionable messages and set up a custom incoming webhook.

## See also

* [Create an incoming webhook](~/webhooks-and-connectors/how-to/add-incoming-webhook.md)
* [Create an Office 365 Connector](~/webhooks-and-connectors/how-to/connectors-creating.md)
* [Send messages to connectors and webhooks](../webhooks-and-connectors/how-to/connectors-using.md)

## Next step

> [!div class="nextstepaction"]
> [Create an outgoing webhook](~/webhooks-and-connectors/how-to/add-outgoing-webhook.md)