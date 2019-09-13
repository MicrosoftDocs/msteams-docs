---
title: Add a custom bot to Microsoft Teams with outgoing webhooks
author: laujan
description: 
keywords: teams tabs outgoing webhook*
ms.topic: conceptual
ms.author: laujan
---
# Add a custom bot to Microsoft Teams with outgoing webhooks

## What are outgoing webhooks in Teams?

Webhooks are a great way for Teams to integrate with external apps. A webhook is essentially a POST request sent to a callback URL. Webhooks implement event reactions by providing a real-time mechanism for a server-side application to notify a client-side application when a new event has occurred. In sum, they provide live data updates without wasted resources, i.e., API constant polling. Technically, webhooks can carry more than a JSON payload, but they are primarily a callback mechanism and should act as a signal for a change in state.

In Teams, outgoing webhooks are also known as “custom bots” and provide a lightweight way to extend your team channel without having to go through the full process of creating bots via the Microsoft Bot Framework. Outgoing webhooks post data from Teams to any chosen service capable of accepting a JSON payload. Once an outgoing webhook is added to a team, it acts like bot, listening in channels for messages using **@mention**, sending notifications to external apps, and responding with rich messages that can include cards and images.

## Outgoing webhook key features

| Feature | Description |
| ------- | ----------- |
| Scoped Configuration| Webhooks are scoped at the team level and only to the team to which it has been added (incoming webhooks are scoped and configured at the channel level). For now users are only able to @mention with outgoing webhooks in public channels, not personal or private scope|
| Reactive Messaging| Users must use @mention the webhook's name for it to receive messages. Currently users can only message an outgoing webhook in public channels and not within the personal or private scope |
|Webhook response content|Responses will appear in the same reply chain as the original message and can include any Bot Framework message content (rich text, images, cards, and emojis). Note: Although outgoing webhooks can use cards, they cannot use the [card actions](https://docs.microsoft.com/en-us/microsoftteams/platform/concepts/cards/cards-actions) used by bots and messaging extensions.|
| Teams API method support|In Teams, outgoing webhooks send an HTTP POST to a web service and process a response back. They do not have access to [Teams RESTful API](https://docs.microsoft.com/en-us/graph/api/resources/teams-api-overview?view=graph-rest-1.0) GET request resources.|
|Cross-team access| Once an outgoing webhook is added to a specific team, users will not be able to chat with it automatically from other teams. However, a webhook can be set up in another team that integrates with the same service. You’ll need to go through the setup process each time you want to add your webhook to a new team.|

## Adding outgoing webhook processing to your app

**Scenario**: Push change notifications on a Teams channel database server to your app.
**Example**: You have a line-of-business app that tracks all CRUD operations made to employee records by Teams channel HR users across an Office 365 tenancy.

>1. Create a URL on your app's server to accept and process a POST request with a JSON payload.

Your service will receive messages in the standard Azure bot service messaging schema. The Bot Framework connector is a RESTful service that enables your service to process the interchange of JSON formatted messages via HTTPS protocols as documented in the [Azure Bot Service API](/bot-framework/rest-api/bot-framework-rest-connector-api-reference).Alternatively, you can follow the [Microsoft Bot Framework SDK] to process and parse messages. *See also*  [About Azure Bot Service](azure/bot-service/bot-service-overview-introduction?view=azure-bot-service-4.0) and [Have a conversation with a Microsoft Teams bot](../bots/bot-conversations/bots-conversations).

Outgoing webhooks are scoped to `teams` channel conversations and are visible to all members of the channel. In channel conversations, users ae required to @mention the name of the outgoing webhook to invoke it in the channel.

>2. Write a method to verify outgoing webhook HMAC token.

To verify that your service is receiving calls only from actual Teams clients, Teams provides an [HMAC Code](https://security.stackexchange.com/questions/20129/how-and-when-do-i-use-hmac/20301) in the HTTP `hmac` header that should always be  included in your authentication protocol as follows:

Your code should always verify the HMAC signature included in the request:

* *Generate* the HMAC token from the request body of the message. There are standard libraries to do this on most platforms (for Node.js, see: [Crypto](https://nodejs.org/api/crypto.html#crypto_crypto) or for C#, see:[Teams Webhook Sample](https://github.com/OfficeDev/microsoft-teams-sample-outgoing-webhook/blob/23eb61da5a18634d51c5247944843da9abed01b6/WebhookSampleBot/Models/AuthProvider.cs)). Microsoft Teams uses standard SHA256 HMAC cryptography . You will need to convert the body to a byte array in UTF8.
* *Compute* the hash from the byte array of the security token **provided by Teams** when you registered the outgoing webhook in the Teams client] (see [Create an outgoing webhook](#Create-an-outgoing-webhook) below).
* *Convert* the hash to a string using UTF-8 encoding.
* *Compare* the string value of the generated hash with the value provided in the HTTP request.

>3. Write a method to send back a success or failure response.

Responses from your outgoing webhook will appear in the same reply chain as the original message. When the user performs a query, Microsoft Teams issues a synchronous HTTP request to your service and your code will have 5 seconds to respond to the message before the connection times out and terminates.

### Example response

```json
{
    "type": "message",
    "text": "This is a reply!"
}
```

## Create an outgoing webhook

1. Select the appropriate team and select **Manage team** from the (&#8226;&#8226;&#8226;) drop-down menu.
1. Choose the **Apps** tab from the navigation bar.
1. From the window's lower right corner select **Create an outgoing webhook**.
1. In the resulting popup window complete the required fields:

* **Name** - The webhook title and @mention tap.
* **Callback URL** - The HTTPS endpoint that accepts JSON payloads and will receive POST requests from Teams.
* **Description** - A detailed string that will appear in the profile card and the team-level App dashboard.
* **Profile Picture** (optional) an app icon for your webhook.
* Select the **Create** button from lower right corner of the pop-up window and the outgoing webhook will be added to the current team's channels.
* The next dialog window will display an [Hash-based Message Authentication Code (HMAC)](https://security.stackexchange.com/questions/20129/how-and-when-do-i-use-hmac/20301) security token that will be used to authenticate calls between Teams and the designated outside service.
* If the URL is valid and the server and client authentication tokens are equal (i.e., an HMAC handshake), the outgoing webhook will be available to the team's users.

## Code samples

You can view outgoing webhook code samples on GitHub:

### Node.js

[OfficeDev/msteams-samples-outgoing-webhook-nodejs](https://github.com/OfficeDev/msteams-samples-outgoing-webhook-nodejs)

### C\#

[OfficeDev/microsoft-teams-sample-outgoing-webhook](https://github.com/OfficeDev/microsoft-teams-sample-outgoing-webhook)

## Learn More

[Incoming Webhooks](foo.md)
[Connectors](foo.md)
