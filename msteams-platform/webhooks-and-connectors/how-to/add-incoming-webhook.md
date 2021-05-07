---
title: Create an incoming webhook
author: laujan
description: describes how to add incoming webhook to Teams app and post external requests to Teams with incoming webhooks
keywords: teams tabs outgoing webhook
localization_priority: Normal
ms.topic: conceptual
ms.author: lajanuar
---

# Create an incoming webhook to the Teams app

This article provides details on adding and removing incoming webhooks in Microsoft Teams.

## Incoming webhooks

Incoming webhooks are special type of Connector in Teams that provide a simple way for an external app to share content in team channels. These webhooks are often used as tracking and notification tools. Incoming webhooks provide a unique URL to which you send a JSON payload with the message that you want to POST, typically in a card format. Cards are user interface (UI) containers that include content and actions related to a single topic and are a way to present message data in a consistent way. Teams uses cards within the following three capabilities:

* Bots
* Messaging extensions
* Connectors

## Key features of incoming webhooks

The following table provides feature and description of webhooks:

| Feature | Description |
| ------- | ----------- |
|Scoped configuration|Incoming webhooks are scoped and configured at the channel level. Outgoing webhooks are scoped and configured at the team level.|
|Secure resource definitions|Messages are formatted as JSON payloads. This declarative messaging structure prevents insertion of malicious code as there is no code execution on the client.|
|Actionable messaging support|If you choose to send messages through cards, you must use the actionable message card format. Actionable message cards are supported in all Office 365 groups including Teams. Here are links to the [legacy actionable message card reference](/outlook/actionable-messages/message-card-reference) and the [message card playground](https://messagecardplayground.azurewebsites.net).|
|Independent HTTPS messaging support| Cards are a great way to present information in a clear and consistent way. Any tool or framework that can send HTTPS POST requests can send messages to Teams through an incoming webhook.|
|Markdown support|All text fields in actionable messaging cards support basic Markdown. Do not use HTML markup in your cards. HTML is ignored and treated as plain text.|

> [!NOTE]
> Teams bots, messaging extensions, incoming webhooks, and the Bot Framework support Adaptive Cards, an open cross-card platform framework. [Teams connectors](../../webhooks-and-connectors/how-to/connectors-creating.md) do not currently support Adaptive Cards. However, it is possible to create a [flow](https://flow.microsoft.com/blog/microsoft-flow-in-microsoft-teams/) that posts Adaptive Cards to a Teams channel.

> [!VIDEO https://www.youtube-nocookie.com/embed/y5pbJI43Zvg&t=204s]

## Add an incoming webhook

> [!IMPORTANT]
> If your team's **Settings** > **Member permissions** > **Allow members to create, update, and remove connectors** is selected, any team member can add, modify, or delete a connector.

Perform the following steps to add an incoming webhook to a Teams channel.

1. Navigate to the channel where you want to add the webhook and select &#8226;&#8226;&#8226; **More options** from the top navigation bar.
1. Choose **Connectors** from the drop-down menu, search for **Incoming Webhook**, and select **Add**.

    ![Choose Connector](~/assets/images/connectors.png)

1. Select **Configure**, provide a name, and optionally, upload an image for your webhook. The dialog window presents a unique URL that maps to the channel.

    ![Configure button](~/assets/images/configure.png)

1. Copy and save the URL to provide it to the outside services.

    ![Unique URL](~/assets/images/url.png)

1. Select **Done**. The webhook is available in the team channel.

## Remove an incoming webhook

Perform the following steps to remove an incoming webhook from a Teams channel.

1. Navigate to the channel. 
1. Select &#8226;&#8226;&#8226; **More options** from the top navigation bar.
1. Choose **Connectors** from the drop-down menu.
1. On the left, under **Manage**, choose **Configured**.
1. Select the **number Configured** to see a list of your current connectors.
1. Select **Manage** next to the connector that you want to delete.
1. Select the **Remove** button. The **Remove Configuration** dialog box appears. 
1. Optionally, complete the dialog box fields and checkboxes prior to selecting the **Remove** button.
1. The webhook is deleted from the team channel.

## Distribution

You have three options for distributing your incoming webhook:

* Set up an incoming webhook directly for your team.
* Add a configuration page and wrap your incoming webhook in a [O365 Connector](~/webhooks-and-connectors/how-to/connectors-creating.md)
* Package and publish your Connector as part of your [AppSource](~/concepts/deploy-and-publish/office-store-guidance.md) submission.

## See also

* [create an outgoing webhook](~/webhooks-and-connectors/how-to/add-outgoing-webhook.md)
* [Send messages to webhooks and connectors](~/webhooks-and-connectors/how-to/connectors-using.md)
