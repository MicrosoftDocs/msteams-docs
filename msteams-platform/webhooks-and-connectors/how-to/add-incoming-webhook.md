---
title: Create an Incoming Webhook
author: laujan
description: describes how to add Incoming Webhook to Teams app and post external requests to Teams with incoming webhooks
keywords: teams tabs outgoing webhook
ms.localizationpriority: medium
ms.topic: conceptual
ms.author: lajanuar
---

# Create Incoming Webhook

Incoming Webhook allows any external apps to share content in Teams channels. These webhooks are used as tracking and notifying tools. They provide a unique URL, to which you send a JSON payload with a message in card format. Cards are user interface containers that include content and actions related to a single topic. Teams use cards within the following capabilities:

* Bots
* Messaging extensions
* Connectors

## Key features of Incoming Webhook

The following table provides the features and description of Incoming Webhook:

| Features | Description |
| ------- | ----------- |
|Adaptive Cards using an Incoming Webhook|Adaptive Cards can be sent through Incoming Webhooks. For more information, see [Send Adaptive Cards using Incoming Webhooks](../../webhooks-and-connectors/how-to/connectors-using.md#send-adaptive-cards-using-an-incoming-webhook).|
|Actionable messaging support|Actionable message cards are supported in all Office 365 groups including Teams. If you send messages through cards, you must use the actionable message card format. For more information, see [legacy actionable message card reference](/outlook/actionable-messages/message-card-reference) and [message card playground](https://messagecardplayground.azurewebsites.net).|
|Independent HTTPS messaging support|Cards provide information clearly and consistently. Any tool or framework that can send HTTPS POST requests can send messages to Teams through an Incoming Webhook.|
|Markdown support|All text fields in actionable messaging cards support basic Markdown. Do not use HTML markup in your cards. HTML is ignored and treated as plain text.|
|Scoped configuration|Incoming Webhook is scoped and configured at the channel level.|
|Secure resource definitions|Messages are formatted as JSON payloads. This declarative messaging structure prevents the insertion of malicious code.|

> [!NOTE]
> * Teams bots, messaging extensions, Incoming Webhook, and the Bot Framework support Adaptive Cards. Adaptive Cards is an open cross card platform framework that can be used in all platforms such as Windows, Android, iOS, and so on. Currently, [Teams connectors](../../webhooks-and-connectors/how-to/connectors-creating.md) don't support Adaptive Cards. However, it is possible to create a [flow](https://flow.microsoft.com/blog/microsoft-flow-in-microsoft-teams/) that posts Adaptive Cards to a Teams channel.
> * For more information on cards and webhooks, see [Adaptive cards and Incoming Webhooks](~/task-modules-and-cards/what-are-cards.md#adaptive-cards-and-incoming-webhooks).

## Create Incoming Webhook

**To add an Incoming Webhook to a Teams channel**

1. Go to the channel where you want to add the webhook and select &#8226;&#8226;&#8226; **More options** from the top navigation bar.
1. Select **Connectors** from the dropdown menu:

    ![Select Connector](~/assets/images/connectors.png)

1. Search for **Incoming Webhook** and select **Add**.
1. Select **Configure**, provide a name, and upload an image for your webhook if required:

    ![Configure button](~/assets/images/configure.png)

1. The dialog window presents a unique URL that maps to the channel. Copy and save the webhook URL, to send information to Microsoft Teams and select **Done**:

    ![Unique URL](~/assets/images/url.png)

The webhook is available in the Teams channel.

> [!NOTE]
> In Teams, select **Settings** > **Member permissions** > **Allow members to create, update, and remove connectors**, so that any team member can add, modify, or delete a connector.

## Remove Incoming Webhook

**To remove an Incoming Webhook from a Teams channel**

1. Go to the channel.
1. Select &#8226;&#8226;&#8226; **More options** from the top navigation bar.
1. Select **Connectors** from the dropdown menu.
1. On the left, under **Manage**, select **Configured**.
1. Select the **<*1*> Configured** to see a list of your current connectors:

    ![Configured webhook](~/assets/images/configured.png)

1. Select **Manage** next to the connector that you want to remove:

    ![Manage webhook](~/assets/images/manage.png)

1. Select **Remove**:

    ![Remove webhook](~/assets/images/remove.png)

    The **Remove Configuration** dialog box appears:

    ![Remove Configuration](~/assets/images/removeconfiguration.png)

1. Complete the dialog box fields and checkboxes and select **Remove**:

    ![Final Remove](~/assets/images/finalremove.png)

    The webhook is removed from the Teams channel.

## See also

* [Create an Outgoing Webhook](~/webhooks-and-connectors/how-to/add-outgoing-webhook.md)
* [Create an Office 365 Connector](~/webhooks-and-connectors/how-to/connectors-creating.md)
* [Create and send messages](~/webhooks-and-connectors/how-to/connectors-using.md)
* [Create Share-to-Teams button](../../concepts/build-and-test/share-to-teams.md#create-share-to-teams-button)
* [Integrate web apps](~/samples/integrate-web-apps-overview.md)
