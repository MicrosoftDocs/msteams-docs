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

## Incoming webhook

Incoming webhook allows any external apps to share content in Teams channels. These webhooks are used as tracking and notifying tools. They provide a unique URL, to which you send a JSON payload with a message in card format. Cards are user interface (UI) containers that include content and actions related to a single topic. Teams uses cards within the following three capabilities:

* Bots
* Messaging extensions
* Connectors

## Key features of incoming webhook

The following table provides the features and description of incoming webhook:

| Features | Description |
| ------- | ----------- |
|Actionable messaging support|Actionable message cards are supported in all Office 365 groups including Teams. If you choose to send messages through cards, you must use the actionable message card format. For more information, see [legacy actionable message card reference](/outlook/actionable-messages/message-card-reference) and [message card playground](https://messagecardplayground.azurewebsites.net).|
|Independent HTTPS messaging support|Cards provide information in a clear and consistent way. Any tool or framework that can send HTTPS POST requests, can send messages to Teams through an incoming webhook.|
|Markdown support|All text fields in actionable messaging cards support basic Markdown. Do not use HTML markup in your cards. HTML is ignored and treated as plain text.|
|Scoped configuration|Incoming webhook are scoped and configured at the channel level.|
|Secure resource definitions|Messages are formatted as JSON payloads. This declarative messaging structure prevents insertion of malicious code.|

> [!NOTE]
> Teams bots, messaging extensions, incoming webhook, and the Bot Framework support Adaptive Cards, an open cross-card platform framework. Currently, [Teams connectors](../../webhooks-and-connectors/how-to/connectors-creating.md) do not support Adaptive Cards. However, it is possible to create a [flow](https://flow.microsoft.com/blog/microsoft-flow-in-microsoft-teams/) that posts Adaptive Cards to a Teams channel.

## Create an incoming webhook

**To add an incoming webhook to a Teams channel**

1. Navigate to the channel where you want to add the webhook and select &#8226;&#8226;&#8226; **More options** from the top navigation bar.
1. Choose **Connectors** from the drop-down menu.

    ![Choose Connector](~/assets/images/connectors.png)

1. Search for **Incoming Webhook** and select **Add**.
1. Select **Configure**, provide a name, and optionally, upload an image for your webhook.

    ![Configure button](~/assets/images/configure.png)

1. The dialog window presents a unique URL that maps to the channel. Copy and save the webhook URL, to send information to Microsoft Teams.

    ![Unique URL](~/assets/images/url.png)

1. Select **Done**. The webhook is available in the team channel.

> [!NOTE]
> In Teams, select **Settings** > **Member permissions** > **Allow members to create, update, and remove connectors**, so that any team member can add, modify, or delete a connector.

## Delete an incoming webhook

**To delete an incoming webhook from a Teams channel**

1. Navigate to the channel. 
1. Select &#8226;&#8226;&#8226; **More options** from the top navigation bar.
1. Choose **Connectors** from the drop-down menu.
1. On the left, under **Manage**, choose **Configured**.
1. Select the **number Configured** to see a list of your current connectors.

    ![Configured webhook](~/assets/images/configured.png)

1. Select **Manage** next to the connector that you want to delete.

    ![Manage webhook](~/assets/images/manage.png)

1. Select **Remove**.

    ![Remove webhook](~/assets/images/remove.png)

The **Remove Configuration** dialog box appears.

![Remove Configuration](~/assets/images/removeconfiguration.png)

8. Prior to selecting the **Remove**, complete the dialog box fields and checkboxes. 

    ![Final Remove](~/assets/images/finalremove.png)

The webhook is deleted from the team channel.

## Distribution of webhook and connector

* [Set up an incoming webhook](#create-an-incoming-webhook) directly for your team.
* Add a [configuration page](connectors-creating.md#integrate-the-configuration-experience) and [publish your incoming webhook](connectors-creating.md#publish-connectors-for-the-organization) in a O365 Connector.
* Package and publish your Connector as part of your [AppSource](~/concepts/deploy-and-publish/office-store-guidance.md) submission.

## See also

* [Create an outgoing webhook](~/webhooks-and-connectors/how-to/add-outgoing-webhook.md)
* [Send messages to webhooks and connectors](~/webhooks-and-connectors/how-to/connectors-using.md)
