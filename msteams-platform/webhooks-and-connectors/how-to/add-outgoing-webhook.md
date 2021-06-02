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

## Outgoing webhook

The outgoing webhooks acts as a bot and searches for messages in channels using **@mention**. They send notifications to external web services and responds with rich messages, which include cards and images, without going through the entire process of creating bots through the [Microsoft Bot Framework](https://dev.botframework.com/).

## Key features of outgoing webhook

The following table provides the features and description of outgoing webhooks:

| Features | Description |
| ------- | ----------- |
| Scoped configuration| Webhooks are scoped at the team level. Mandatory setup process for each add an outgoing webhook. |
| Reactive messaging| Users must use @mention for the webhook to receive messages. Currently, users can only message an outgoing webhook in public channels and not within the personal or private scope. |
|Standard HTTP message exchange|Responses appear in the same chain as the original request message and can include any Bot Framework message content, for example, rich text, images, cards, and emojis. Although outgoing webhooks can use cards, they cannot use any card actions except for `openURL`.|
| Teams API method support|Outgoing webhooks sends an HTTP POST to a web service and gets a response. They cannot access any other APIs like retrieve the roster or list of channels in a team.|

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

6. Select **Create**. The outgoing webhook is added to the current team's channel.

    ![create outgoing webhook](~/assets/images/outgoingwebhook.png)

A [Hash-based Message Authentication Code (HMAC)](https://security.stackexchange.com/questions/20129/how-and-when-do-i-use-hmac/20301) dialogue box appears. It is a security token used to authenticate calls between Teams and the designated outside service.

>[!NOTE]
> The outgoing webhook is available to the team's users, only if the URL is valid and the server and client authentication tokens are equal for example, an HMAC handshake.

The following scenario provides the details to add an outgoing webhook:

* Scenario: Push change status notifications on a Teams channel database server to your app.
* Example: You have a line-of-business app that tracks all CRUD (create, read, update, delete) operations made to employee records by Teams channel HR users across an Office 365 tenancy.

# [URL JSON payload](#tab/urljsonpayload)
**Create a URL on your app's server to accept and process a POST request with a JSON payload**

Your service receives messages in a standard Azure bot service messaging schema. The Bot Framework connector is a RESTful service that empowers to process the interchange of JSON formatted messages through HTTPS protocols as documented in the [Azure Bot Service API](/bot-framework/rest-api/bot-framework-rest-connector-api-reference). Alternatively, you can follow the [Microsoft Bot Framework SDK] to process and parse messages. For more information see [overview of Azure Bot Service](/azure/bot-service/bot-service-overview-introduction).

Outgoing webhooks are scoped to the `team` level and are visible to all the team members. Just like a bot, users need to **\@mention** the name of the outgoing webhook to invoke it in the channel.

# [Verify HMAC token](#tab/verifyhmactoken)
**Create a method to verify the outgoing webhook HMAC token**

Using example of inbound message and ID: "contoso" of SigningKeyDictionary of {"contoso", "vqF0En+Z0ucuRTM/01o2GuhMH3hKKk/N2bOmlM31zaA=" }.

Use the value "HMAC 03TCao0i55H1eVKUusZOTZRjtvYTs+mO41mPL+R1e1U=" in the authorization of request header.

To ensure that your service is receiving calls only from actual Teams clients, Teams provides an HMAC code in the HTTP `hmac` authorization header. Always include the code in your authentication protocol.

Your code must always validate the HMAC signature included in the request as follows:

* Generate the HMAC token from the request body of the message. There are standard libraries to do this on most platforms (see [Crypto](https://nodejs.org/api/crypto.html#crypto_crypto) for Node.js or see [Teams webhook sample](https://github.com/OfficeDev/microsoft-teams-sample-outgoing-webhook/blob/23eb61da5a18634d51c5247944843da9abed01b6/WebhookSampleBot/Models/AuthProvider.cs) for C\#). Microsoft Teams uses standard SHA256 HMAC cryptography. You need to convert the body to a byte array in UTF8.
* Compute the hash from the byte array of the security token provided by Teams when you registered the outgoing webhook in the Teams client. See [create an outgoing webhook](~/webhooks-and-connectors/how-to/add-outgoing-webhook.md).
* Convert the hash to a string using UTF-8 encoding.
* Compare the string value of the generated hash with the value provided in the HTTP request.

# [Method to respond](#tab/methodtorespond)
**Create a method to send a success or failure response**

Responses from your outgoing webhooks appear in the same reply chain as the original message. When the user performs a query, Microsoft Teams issues a synchronous HTTP request to your service and your code gets five seconds to respond to the message before the connection times out and terminates.

### Example response

```json
{
    "type": "message",
    "text": "This is a reply!"
}
```

---

## Code sample

|**Sample name** | **Description** | **.NET** | **Node.js** |
|----------------|------------------|--------|----------------|
| Outgoing webhooks	| Samples to create custom bots to be used in Microsoft Teams.|	[View](https://github.com/OfficeDev/Microsoft-Teams-Samples/tree/main/samples/outgoing-webhook/csharp) | [View](https://github.com/OfficeDev/Microsoft-Teams-Samples/tree/main/samples/outgoing-webhook/nodejs)|

## See also
* [Create an incoming webhook](~/webhooks-and-connectors/how-to/add-incoming-webhook.md)
* [Create an Office 365 Connector](~/webhooks-and-connectors/how-to/connectors-creating.md)
* [Send messages to connectors and webhooks](~/webhooks-and-connectors/how-to/connectors-using.md)