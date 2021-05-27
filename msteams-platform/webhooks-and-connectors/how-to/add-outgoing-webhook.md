---
title: Create an outgoing webhook
author: laujan
description: describes how to create an outgoing webhook
ms.topic: conceptual
localization_priority: Normal
ms.author: lajanuar
keywords: teams tabs outgoing webhook actionable message verify webhook
---

# Create an outgoing webhook

The outgoing webhooks acts as a bot and searches for messages in channels using **@mention**. They send notifications to external web services and responds with rich messages, which include cards and images, without going through the entire process of creating bots through the [Microsoft Bot Framework](https://dev.botframework.com/).

## Key features of outgoing webhooks

The following table provides the features and description of outgoing webhooks:

| Features | Description |
| ------- | ----------- |
| Scoped configuration| Webhooks are scoped at the team level. Setup process for each team to add outgoing webhook. |
| Reactive messaging| Users must use @mention for the webhook to receive messages. Currently, users can only message an outgoing webhook in public channels and not within the personal or private scope. |
|Standard HTTP message exchange|Responses appear in the same chain as the original request message and can include any Bot Framework message content, for example, rich text, images, cards, and emojis. Although outgoing webhooks can use cards, they cannot use any card actions except for `openURL`.|
| Teams API method support|Outgoing webhooks sends an HTTP POST to a web service and gets a response. They cannot access any other APIs like retrieve the roster or list of channels in a team.|

## Code sample

|**Sample name** | **Description** | **.NET** | **Node.js** |
|----------------|------------------|--------|----------------|
| Outgoing webhooks	| Samples to create custom bots to be used in Microsoft Teams.|	[View](https://github.com/OfficeDev/Microsoft-Teams-Samples/tree/main/samples/outgoing-webhook/csharp) | [View](https://github.com/OfficeDev/Microsoft-Teams-Samples/tree/main/samples/outgoing-webhook/nodejs)|

## Create an outgoing webhook

Create outgoing webhooks and add custom bots to Teams.

**To create an outgoing webhook**

1. Select **Teams** from the left pane. The **Teams** page appears.

    ![Teams channel](~/assets/images/teamschannel.png)

2. In the **Teams** page, select the required team to create an outgoing webhook and select the &#8226;&#8226;&#8226;. In the drop-down menu, select **Manage team**.

    ![Create outgoing webhook](~/assets/images/outgoingwebhook1.png)

3. Select the **Apps** tab on the channel page.

    ![Create an outgoing webhook](~/assets/images/outgoingwebhook2.png)

4. Select **Create an outgoing webhook** at the bottom of the page.

    ![Create outgoing webhooks](~/assets/images/outgoingwebhook3.png)

5. Type the following details in the **Create an outgoing webhook** page:

    * **Name**: The webhook title and @mention tab.
    * **Callback URL**: The HTTPS endpoint that accepts JSON payloads and receives POST requests from Teams.
    * **Description**: A detailed string that appear in the profile card and the team-level App dashboard.
    * **Profile Picture**: An app icon for your webhook, which is optional.

    ![create outgoing webhook](~/assets/images/outgoingwebhook.png)

6. Select **Create**. The outgoing webhook is added to the current team's channel.

A [Hash-based Message Authentication Code (HMAC)](https://security.stackexchange.com/questions/20129/how-and-when-do-i-use-hmac/20301) dialogue box appears. It is a security token used to authenticate calls between Teams and the designated outside service.

>[!NOTE]
> The outgoing webhook is available to the team's users, only if the URL is valid and the server and client authentication tokens are equal for example, an HMAC handshake.
## See also
* [create an incoming webhook](~/webhooks-and-connectors/how-to/add-incoming-webhook.md)
* [create an Office 365 Connector](~/webhooks-and-connectors/how-to/connectors-creating.md)
* [Send messages to connectors and webhooks](~/webhooks-and-connectors/how-to/connectors-using.md)