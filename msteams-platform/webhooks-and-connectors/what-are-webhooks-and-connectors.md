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
A webhook is a user-defined HTTP callback that notifies about any action that has taken place in Microsoft Teams channel. It is a way for an app to get real-time data.
Connectors are inbound webhooks that provide a URL to post messages anytime in a specified channel.

## Incoming webhooks

Incoming webhooks aid in posting messages from apps to Teams. If incoming webhooks are enabled for a team in any channel, you expose an HTTPS endpoint that accepts correctly formatted JSON and inserts messages into that channel. Webhooks are a quick and easy way to connect a channel to service and are best used for scenarios that are unique to a particular team. For example, you can create an incoming webhook in your DevOps channel and configure your build, simultaneously deploy and monitor services to send alerts.

For more information, see [create an incoming webhook](~/webhooks-and-connectors/how-to/add-incoming-webhook.md).

## Outgoing webhooks

With outgoing webhooks you can send text messages from a channel to your web services. After configuring the outgoing webhooks, users can @mention outgoing webhook and send a message to your service. Your service can respond to the message with text or a card.

Outgoing webhooks are configured on a per-team basis and cannot be included as part of a normal Teams app. They are best suited for completing team-specific workloads that do not require huge data transfer.

For more information, see [create an outgoing webhook](~/webhooks-and-connectors/how-to/add-outgoing-webhook.md).

## Office 365 Connectors

You can create a custom configuration page for your incoming webhook and package them as part of a Teams app with Office 365 connectors. You can distribute the app to the app store. You can send messages primarily using Office 365 Connector cards and add a limited set of card actions to them. For example, In a weather connector, users can choose a location and time to receive updates about the weather. Office 365 Connectors are configured on a channel level, but are installed at a team level.

For more information, see [create an Office 365 Connector](~/webhooks-and-connectors/how-to/connectors-creating.md).

## Send messages to connectors and webhooks

With Office 365 and incoming webhooks, you can send messages by posting a JSON payload to the webhook URL. JSON connector message is provided to create cards with rich inputs. You can create actionable messages and set up a custom incoming webhook. The following article highlights the steps to post messages to the webhook using cURL and PowerShell. For more information on sending Adaptive Cards and testing your connectors, see [send messages to connectors and webhooks](../webhooks-and-connectors/how-to/connectors-using.md).

## See also

* Adaptive cards and incoming webhooks in [build cards](../task-modules-and-cards/what-are-cards.md).

* Connect web services to Microsoft Teams with webhooks and Office 365 connectors.

 > [!VIDEO https://www.youtube-nocookie.com/embed/EqodWkS5PYM]