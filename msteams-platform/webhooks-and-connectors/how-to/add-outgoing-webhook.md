---
title: Add custom bots to Microsoft Teams with outgoing webhooks
author: laujan
description: how to add an outgoing webhook
keywords: teams tabs outgoing webhook*
ms.topic: conceptual
ms.author: lajanuar
---
# Add custom bots to Microsoft Teams with outgoing webhooks

## What are outgoing webhooks in Teams?

Webhooks are a great way for Teams to integrate with external apps. A webhook is essentially a POST request sent to a callback URL. In Teams, outgoing webhooks provide a simple way to allow users to send messages to your web service without having to go through the full process of creating bots via the [Microsoft Bot Framework](https://dev.botframework.com/). Outgoing webhooks post data from Teams to any chosen service capable of accepting a JSON payload. Once an outgoing webhook is added to a team, it acts like bot, listening in channels for messages using **\@mention**, sending notifications to external web services, and responding with rich messages that can include cards and images.

## Outgoing webhook key features

| Feature | Description |
| ------- | ----------- |
| Scoped Configuration| Webhooks are scoped at the team level. You’ll need to go through the setup process for each team you want to add your outgoing webhook to. |
| Reactive Messaging| Users must use @mention for the webhook to receive messages. Currently users can only message an outgoing webhook in public channels and not within the personal or private scope |
|Standard HTTP message exchange|Responses will appear in the same chain as the original request message and can include any Bot Framework message content (rich text, images, cards, and emojis). **Note**: Although outgoing webhooks can use cards, they cannot use any card actions except for `openURL`.|
| Teams API method support|In Teams, outgoing webhooks send an HTTP POST to a web service and process a response back. They cannot access any other APIs like retrieve the roster or list of channels in a team.|

## Creating actionable messages

The example in the preceding section includes three visible buttons on the card. Each button is defined in the `potentialAction` property of the message by using `ActionCard` actions. Each `ActionCard` contains an input type; a text field, a date picker, or a multi-choice list. Each `ActionCard` action has an associated action, for example, `HttpPOST`.

Connector cards support three types of actions:

| **Action** | **Description** |
|-------- |------------- |
|`ActionCard`| Presents one or more input types and associated actions.|
|`HttpPOST` | Sends a POST request to a URL. |
|`OpenUri`| Opens a URI in a separate browser or app, optionally targets different URIs based on operating systems. |

The `ActionCard` action supports three input types:

- `TextInput` A single-line or multiline text field with an optional length limit.
- `DateInput` A date selector with an optional time selector.
- `MultichoiceInput` An enumerated list of choices, offering either a single selection or multiple selections.

`MultichoiceInput` supports a `style` property that controls whether the list initially appears fully expanded. The default value of `style` depends on the value of `isMultiSelect`.

| `isMultiSelect` | `style` default |
| --- | --- |
| `false` or not specified | `compact` |
| `true` | `expanded` |

Specify both `"isMultiSelect": true` and `"style": true` if you want the multi-select list to be displayed in a compact style.

> [!NOTE]
> * Specifying `compact` for the `style` property in Microsoft Teams is the same as specifying `normal` for the `style` property in Microsoft Outlook.
> * Webhooks support only Office 365 (message back) cards and adaptive cards.

For all other details about connector card actions, see **[Actions]**(/outlook/actionable-messages/card-reference#actions) in the actionable message card reference.

## Adding outgoing webhook processing to your app

**Scenario**: Push change status notifications on a Teams channel database server to your app.  
**Example**: You have a line-of-business app that tracks all CRUD operations made to employee records by Teams channel HR users across an Office 365 tenancy.

### 1. Create a URL on your app's server to accept and process a POST request with a JSON payload

Your service will receive messages in the standard Azure bot service messaging schema. The Bot Framework connector is a RESTful service that enables your service to process the interchange of JSON formatted messages via HTTPS protocols as documented in the [Azure Bot Service API](/bot-framework/rest-api/bot-framework-rest-connector-api-reference). Alternatively, you can follow the [Microsoft Bot Framework SDK] to process and parse messages. *See also*  [About Azure Bot Service](/azure/bot-service/bot-service-overview-introduction?view=azure-bot-service-4.0).

Outgoing webhooks are scoped to the `team` level and are visible to all members of the team. Just like a bot, users are required to **\@mention** the name of the outgoing webhook to invoke it in the channel.

### 2. Create a method to verify the outgoing webhook HMAC token

#### HMAC signature for testing with code example

Using example of inbound message and id : "contoso" of  SigningKeyDictionary of {"contoso", "vqF0En+Z0ucuRTM/01o2GuhMH3hKKk/N2bOmlM31zaA=" }.

Use the value "HMAC 03TCao0i55H1eVKUusZOTZRjtvYTs+mO41mPL+R1e1U=" in the authorization of request header.

To ensure that your service is receiving calls only from actual Teams clients, Teams provides an HMAC Code in the HTTP `hmac` header that should always be  included in your authentication protocol.

Your code should always validate the HMAC signature included in the request:

* *Generate* the HMAC token from the request body of the message. There are standard libraries to do this on most platforms (*see* [Crypto](https://nodejs.org/api/crypto.html#crypto_crypto) for Node.js or  *see* [Teams Webhook Sample](https://github.com/OfficeDev/microsoft-teams-sample-outgoing-webhook/blob/23eb61da5a18634d51c5247944843da9abed01b6/WebhookSampleBot/Models/AuthProvider.cs) for C\#). Microsoft Teams uses standard SHA256 HMAC cryptography . You will need to convert the body to a byte array in UTF8.
* *Compute* the hash from the byte array of the security token **provided by Teams** when you registered the outgoing webhook in the Teams client]. *See* [Create an outgoing webhook](#create-an-outgoing-webhook), below.
* *Convert* the hash to a string using UTF-8 encoding.
* *Compare* the string value of the generated hash with the value provided in the HTTP request.

### 3. Create a method to send a success or failure response

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

>* **Name** - The webhook title and @mention tap.
>* **Callback URL** - The HTTPS endpoint that accepts JSON payloads and will receive POST requests from Teams.
>* **Description** - A detailed string that will appear in the profile card and the team-level App dashboard.
>* **Profile Picture** (optional) an app icon for your webhook.
>* Select the **Create** button from lower right corner of the pop-up window and the outgoing webhook will be added to the current team's channels.
>* The next dialog window will display an [Hash-based Message Authentication Code (HMAC)](https://security.stackexchange.com/questions/20129/how-and-when-do-i-use-hmac/20301) security token that will be used to authenticate calls between Teams and the designated outside service.
>* If the URL is valid and the server and client authentication tokens are equal (i.e., an HMAC handshake), the outgoing webhook will be available to the team's users.

## Code samples

You can view outgoing webhook code samples on GitHub:

### Node.js

[OfficeDev/msteams-samples-outgoing-webhook-nodejs](https://github.com/OfficeDev/msteams-samples-outgoing-webhook-nodejs)

### C\#

[OfficeDev/microsoft-teams-sample-outgoing-webhook](https://github.com/OfficeDev/microsoft-teams-sample-outgoing-webhook)
