---
title: Create an Incoming Webhook
author: laujan
description: In this module, learn how to add Incoming Webhook to Teams app and post any external requests to Teams using it
ms.localizationpriority: high
ms.topic: conceptual
ms.author: lajanuar
---

# Create an Incoming Webhook

An Incoming Webhook lets external applications to share content in Microsoft Teams channels. The webhooks are used as tools to track and notify. The webhooks provide a unique URL, to send a JSON payload with a message in card format. Cards are user interface containers that include content and actions related to a single topic. You can use cards in the following capabilities:

* Bots
* Message extensions
* Connectors

## Key features of an Incoming Webhook

The following table provides the features and description of an Incoming Webhook:

| Features | Description |
| -------- | ----------- |
|Adaptive Cards using an Incoming Webhook | Adaptive Cards can be sent through Incoming Webhooks. For more information, see [Send Adaptive Cards using Incoming Webhooks](../../webhooks-and-connectors/how-to/connectors-using.md#send-adaptive-cards-using-an-incoming-webhook).|
|Actionable messaging support|Actionable message cards are supported in all Office 365 groups including Teams. If you send messages through cards, you must use the actionable message card format. For more information, see [legacy actionable message card reference](/outlook/actionable-messages/message-card-reference) and [message card playground](https://messagecardplayground.azurewebsites.net).|
|Independent HTTPS messaging support|Cards provide information clearly and consistently. Any tool or framework that can send HTTPS POST requests can send messages to Teams through an Incoming Webhook.|
|Markdown support|All text fields in actionable messaging cards support basic Markdown. Do not use HTML markup in your cards. HTML is ignored and treated as plain text.|
|Scoped configuration|Incoming Webhook is scoped and configured at the channel level.|
|Secure resource definitions|Messages are formatted as JSON payloads. This declarative messaging structure prevents the insertion of malicious code.|

<!--- TBD: A note should be short and eye-catching. No need to put a list item inside a Note or any admonition for that matter. Re-write the below list item.
--->

> [!NOTE]
>
> * Teams bots, message extensions, Incoming Webhook, and the Bot Framework support Adaptive Cards. Adaptive Cards is an open cross card platform framework that is used in all platforms such as Windows, Android, iOS, and so on. Currently, [Teams connectors](../../webhooks-and-connectors/how-to/connectors-creating.md) don't support Adaptive Cards. However, it is possible to create a [flow](https://flow.microsoft.com/blog/microsoft-flow-in-microsoft-teams/) that posts Adaptive Cards to a Teams channel.
> * For more information on cards and webhooks, see [Adaptive cards and Incoming Webhooks](~/task-modules-and-cards/what-are-cards.md#adaptive-cards-and-incoming-webhooks).

## Create an Incoming Webhook

To add an Incoming Webhook to a Teams channel, follow these steps:

1. Open the channel in which you want to add the webhook and select &#8226;&#8226;&#8226; **More options** from the top navigation bar.
1. Select **Connectors** from the dropdown menu:

    ![Select Connector](~/assets/images/connectors.png)

1. Search for **Incoming Webhook** and select **Add**.
1. Select **Configure**, provide a name, and upload an image for your webhook if necessary:

    ![Configure button](~/assets/images/configure.png)

1. Copy and save the unique webhook URL present in the dialog window. The URL maps to the channel and you can use it to send information to Teams. Select **Done**.

    ![Unique URL](~/assets/images/url.png)

The webhook is available in the Teams channel.

You can create and send actionable messages through Incoming Webhook or Office 365 Connector. For more information, see [Create and send messages](~/webhooks-and-connectors/how-to/connectors-using.md).

> [!NOTE]
> In Teams, select **Settings** > **Member permissions** > **Allow members to create, update, and remove connectors**, so that any team member can add, modify, or delete a connector.

## Remove an Incoming Webhook

To remove an Incoming Webhook from a Teams channel, follow these steps:

1. Open the channel and select &#8226;&#8226;&#8226; **More options** from the top navigation bar.
1. Select **Connectors** from the dropdown menu.
1. Select **Configured** under **Manage**.
1. Select the **<*1*> Configured** to see a list of your current connectors:

    ![Configured webhook](~/assets/images/configured.png)

1. Select **Manage** for the connector that you want to remove:

    ![Manage webhook](~/assets/images/manage.png)

1. Select **Remove** to view the **Remove Configuration** dialog box.

    ![Remove Configuration](~/assets/images/removeconfiguration.png)

1. Complete the dialog box fields and checkboxes and select **Remove**.

    ![Final Remove](~/assets/images/finalremove.png)

## See also

* [Create an Outgoing Webhook](~/webhooks-and-connectors/how-to/add-outgoing-webhook.md)
* [Create an Office 365 Connector](~/webhooks-and-connectors/how-to/connectors-creating.md)
* [Create and send messages](~/webhooks-and-connectors/how-to/connectors-using.md)
* [Share to Teams from web apps](~/concepts/build-and-test/share-to-teams-from-web-apps.md)
* [Integrate web apps](~/samples/integrate-web-apps-overview.md)
