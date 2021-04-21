---
title: Create an incoming webhook
author: laujan
description: how to add incoming webhook to Teams app
keywords: teams tabs outgoing webhook
localization_priority: Normal
ms.topic: conceptual
ms.author: lajanuar
---
# Create an incoming webhook and post external requests to Microsoft Teams

## Teams incoming webhooks

 Incoming webhooks are connector that provide a simple way for an external app to share messages in Teams. These webhooks are often used as tracking and notification tools. Incoming webhooks provide a unique URL to which you send a JSON payload with the message that you want to POST, typically in a card format. Cards are User Interface (UI) containers that contain content and actions related to a single topic and are a way to present message data in a consistent way. Teams uses cards within three capabilities:

* Bots
* Messaging extensions
* Connectors

## Key features incoming webhook

| Feature | Description |
| ------- | ----------- |
|Scoped Configuration|Incoming webhooks are scoped and configured at the channel level. Outgoing webhooks are scoped and configured at the team level.|
|Secure resource definitions|Messages are formatted as JSON payloads. This declarative messaging structure prevents the injection of malicious code as there is no code execution on the client.|
|Actionable messaging support|If you choose to send messages through cards, you must use the **actionable message card** format. Actionable message cards are supported in all Office 365 groups including Teams. Here are links to the [Legacy actionable message card reference](/outlook/actionable-messages/message-card-reference) and the [Message card playground](https://messagecardplayground.azurewebsites.net).|
|Independent HTTPS messaging support| Cards are a great way to present information in a clear and consistent way. Any tool or framework that can send HTTPS POST requests can send messages to Teams through an incoming webhook.|
|Markdown support|All text fields in actionable messaging cards support basic Markdown. **Don't use HTML markup in your cards**. HTML is ignored and treated as plain text.|

> [!Note]
> Teams bots, messaging extensions, incoming webhooks, and the Bot Framework support Adaptive Cards, an open cross-card platform framework. [Teams connectors](../../webhooks-and-connectors/how-to/connectors-creating.md) do not currently support Adaptive Cards. However, it is possible to create a [flow](https://flow.microsoft.com/blog/microsoft-flow-in-microsoft-teams/) that posts Adaptive Cards to a Teams channel.

> [!VIDEO https://www.youtube-nocookie.com/embed/y5pbJI43Zvg&t=204s]

## Add an incoming webhook to a Teams channel

> [!Important]  
> If your team's **Settings** > **Member permissions** > **Allow members to create, update, and remove connectors** is selected, any team member can add, modify, or delete a connector.

1. Navigate to the channel where you want to add the webhook and select (&#8226;&#8226;&#8226;) **More Options** from the top navigation bar.
1. Choose **Connectors** from the drop-down menu and search for **Incoming Webhook**.
1. Select the **Configure** button, provide a name, and, optionally, upload an image avatar for your webhook.
1. The dialog window presents a unique URL that maps to the channel. Copy and save the URL as you need to provide it to the outside service.
1. Select the **Done** button. The webhook is available in the team channel.

## Remove an incoming webhook from a Teams channel

1. Navigate to the channel where the webhook was added and select (&#8226;&#8226;&#8226;) **More Options** from the top navigation bar.
1. Choose **Connectors** from the drop-down menu.
1. On the left, under **Manage**, choose **Configured**.
1. Select the **number Configured** to see a list of your current connectors.
1. Select **Manage** next to the connector that you want to delete.
1. Select the **Remove** button and you are presented with a **Remove Configuration** dialog box.
1. Optionally, complete the dialog box fields and checkboxes prior to selecting the **Remove** button. The webhook must be deleted from the team channel.

## Distribution

You have three options for distributing your incoming webhook:

* Set up an incoming webhook directly for your team.
* Add a configuration page and wrap your incoming webhook in a [O365 Connector](~/webhooks-and-connectors/how-to/connectors-creating.md)
* Package and publish your Connector as part of your [AppSource](~/concepts/deploy-and-publish/office-store-guidance.md) submission.

## Learn more

* [Sending messages to Connectors and Webhooks](~/webhooks-and-connectors/how-to/connectors-using.md)
