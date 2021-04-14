---
title: Add custom bots to Microsoft Teams with outgoing webhooks
description: describes how to add an outgoing webhook
ms.topic: conceptual
ms.author: lajanuar
keywords: teams tabs outgoing webhook actionable message verify webhook
---
# Add custom bots to Teams with outgoing webhooks

## Outgoing webhooks in Teams

Webhooks are an eminent way for Teams to integrate with external apps. A webhook is essentially a POST request sent to a callback URL. Outgoing webhooks permit users to send messages to your web service without going through the full process of creating bots through the [Microsoft Bot Framework](https://dev.botframework.com/).

Outgoing webhook sends data from Teams to any chosen service capable of accepting a JSON payload. After adding the outgoing webhooks to a team, it acts as a bot and looks for messages in channels using **\@mention**. It sends notifications to external web services and responds with rich messages, which include cards and images.

## Outgoing webhook key features

| Feature | Description |
| ------- | ----------- |
| Scoped configuration| Webhooks are scoped at the team level. You must go through the setup process for each team where you want to add your outgoing webhook. |
| Reactive messaging| Users must use @mention for the webhook to receive messages. Currently, users can only message an outgoing webhook in public channels and not within the personal or private scope. |
|Standard HTTP message exchange|Responses appear in the same chain as the original request message and can include any bot framework message content, for example, rich text, images, cards, and emojis. Although outgoing webhooks can use cards, they cannot use any card actions except for `openURL`.|
| Teams API method support|Outgoing webhook sends an HTTP POST to a web service and process a response back. They cannot access any other APIs like retrieve the roster or list of channels in a team.|

## Create actionable messages

The connector cards include three visible buttons on the card. Each button is defined in the `potentialAction` property of the message by using `ActionCard` actions. Each `ActionCard` contains an input type; a text field, a date picker, or a multi-choice list. Each `ActionCard` action has an associated action, for example, `HttpPOST`.

Connector cards support three types of actions:

| Action | Description |
| ------- | ----------- |
| `ActionCard` |Presents one or more input types and associated actions.|
| `HttpPOST` | Sends a POST request to a URL. |
| `OpenUri` |  Opens a URI in a separate browser or app, optionally targets different URIs based on operating systems.|

The `ActionCard` action supports three input types:

| Input type | Description |
| ------- | ----------- |
| `TextInput` | A single-line or multiline text field with an optional length limit. |
| `DateInput` | A date selector with an optional time selector. |
| `MultichoiceInput` | A specified list of choices, offering either a single selection or multiple selections.|

`MultichoiceInput` supports a `style` property that controls the display of a fully expanded list. The default value of `style` depends on the `isMultiSelect` value.

| `isMultiSelect` value  | `style` default value  |
| --- | --- |
| `false` or not specified | The default style is `compact`|
| `true` | The default style is `expanded` |

> [!NOTE]
> * Enter both `"isMultiSelect": true` and `"style": true`, if you want the multi-select list to be displayed in a compact style.
> * Selecting `compact` for the `style` property in Teams is the same as selecting `normal` for the `style` property in Microsoft Outlook.
> * Webhooks support only Office 365 message back cards and adaptive cards.

For all other details about connector card actions, see **[Actions](/outlook/actionable-messages/card-reference#actions)** in the actionable message card reference.

## Add outgoing webhooks to your app

**Scenario**: Push change status notifications on a Teams channel database server to your app.  
**Example**: You have a line-of-business app that tracks all CRUD operations made to employee records by Teams channel HR users across an Office 365 tenancy.

### 1. Create a URL on your app's server to accept and process a POST request with a JSON payload

Your service receives messages in a standard Azure bot service messaging schema. The bot framework connector is a RESTful service that empowers your service to process the interchange of JSON formatted messages through HTTPS protocols as documented in the [Azure Bot Service API](/bot-framework/rest-api/bot-framework-rest-connector-api-reference). Alternatively, you can follow the [Microsoft Bot Framework SDK] to process and parse messages. See also [About Azure Bot Service](/azure/bot-service/bot-service-overview-introduction).

Outgoing webhooks are scoped to the `team` level and are visible to all the team members. Just like a bot, users need to **\@mention** the name of the outgoing webhook to invoke it in the channel.

### 2. Create a method to verify the outgoing webhook HMAC token

#### HMAC signature for testing with code example

Using example of inbound message and id: "contoso" of SigningKeyDictionary of {"contoso", "vqF0En+Z0ucuRTM/01o2GuhMH3hKKk/N2bOmlM31zaA=" }.

Use the value "HMAC 03TCao0i55H1eVKUusZOTZRjtvYTs+mO41mPL+R1e1U=" in the authorization of request header.

To ensure that your service is receiving calls only from actual Teams clients, Teams provides an HMAC code in the HTTP `hmac` header. Always included the code in your authentication protocol.

Your code must always validate the HMAC signature included in the request:

* Generate the HMAC token from the request body of the message. There are standard libraries to do this on most platforms (see [Crypto](https://nodejs.org/api/crypto.html#crypto_crypto) for Node.js or see [Teams Webhook Sample](https://github.com/OfficeDev/microsoft-teams-sample-outgoing-webhook/blob/23eb61da5a18634d51c5247944843da9abed01b6/WebhookSampleBot/Models/AuthProvider.cs) for C\#). Microsoft Teams uses standard SHA256 HMAC cryptography. You need to convert the body to a byte array in UTF8.
* Compute the hash from the byte array of the security token **provided by Teams** when you registered the outgoing webhook in the Teams client]. See [Create an outgoing webhook](#create-an-outgoing-webhook).
* Convert the hash to a string using UTF-8 encoding.
* Compare the string value of the generated hash with the value provided in the HTTP request.

### 3. Create a method to send a success or failure response

Responses from your outgoing webhooks appear in the same reply chain as the original message. When the user performs a query, Microsoft Teams issues a synchronous HTTP request to your service and your code gets five seconds to respond to the message before the connection times out and terminates.

### Example response

```json
{
    "type": "message",
    "text": "This is a reply!"
}
```

## Create an outgoing webhook

1. Select the appropriate team and choose **Manage team** from the (&#8226;&#8226;&#8226;) drop-down menu.
1. Choose the **Apps** tab from the navigation bar.
1. From the window's lower right corner select **Create an outgoing webhook**.
1. In the resulting popup window complete the required fields:

>* **Name** - The webhook title and @mention tap.
>* **Callback URL** - The HTTPS endpoint that accepts JSON payloads and receives POST requests from Teams.
>* **Description** - A detailed string that appear in the profile card and the team-level App dashboard.
>* **Profile Picture** an optional app icon for your webhook.
>* Select the **Create** button from the lower right corner of the pop-up window and the outgoing webhook are added to the current team's channels.
>* The next dialog window displays an [Hash-based Message Authentication Code (HMAC)](https://security.stackexchange.com/questions/20129/how-and-when-do-i-use-hmac/20301) security token that is used to authenticate calls between Teams and the designated outside service.
>* The outgoing webhook is available to the team's users, only if the URL is valid and the server and client authentication tokens are equal for example, an HMAC handshake.

## Code sample
|**Sample name** | **Description** | **.NET** | **Node.js** |
|----------------|------------------|--------|----------------|
| Outgoing webhooks	| Samples to create **Custom Bots** to be used in Microsoft Teams.|	[View](https://github.com/OfficeDev/Microsoft-Teams-Samples/tree/main/samples/outgoing-webhook/csharp) | [View](https://github.com/OfficeDev/Microsoft-Teams-Samples/tree/main/samples/outgoing-webhook/nodejs)|

