---
title: Create actionable messages
author: surbhigupta12
description: describes how to create actionable messages
ms.topic: conceptual
localization_priority: Normal
ms.author: surbhigupta12
keywords: teams tabs actionable message verify webhook

---

# Create actionable messages using outgoing webhooks

Actionable messages help users to respond to a notification from other web services without leaving the current page. They are sent through connector cards. The connector cards has three visible buttons on the card. Each button is defined in the `potentialAction` property of the message by using `ActionCard` actions. Each `ActionCard` contains an input type, a text field, a date picker, or a multi-choice list and an associated action, for example, `HttpPOST`.

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

`MultichoiceInput` supports a `style` property that controls the display of a fully expanded list.

The default value of `style` depends on the `isMultiSelect` value:

| `isMultiSelect` value  | `style` default value  |
| --- | --- |
| `false` or not specified | The default style is `compact`.|
| `true` | The default style is `expanded`. |

> [!NOTE]
> * To display multi-select list in a compact style, enter `"isMultiSelect": true` and `"style": true`.
> * Selecting `compact` for the `style` property in Teams is the same as selecting `normal` for the `style` property in Microsoft Outlook.
> * Webhooks support only Office 365 message back cards and Adaptive Cards.

For more information about connector card actions, see [Actions](/outlook/actionable-messages/card-reference#actions).

## Scenario to add outgoing webhooks to your app

Following is the scenario and example of adding outgoing webhooks to your app:

* Scenario: Push change status notifications on a Teams channel database server to your app.
* Example: You have a line-of-business app that tracks all CRUD (create, read, update, delete) operations made to employee records by Teams channel HR users across an Office 365 tenancy.

# [URL JSON payload](#tab/urljsonpayload)
**Create a URL on your app's server to accept and process a POST request with a JSON payload**

Your service receives messages in a standard Azure bot service messaging schema. The Bot Framework connector is a RESTful service that empowers your service to process the interchange of JSON formatted messages through HTTPS protocols as documented in the [Azure Bot Service API](/bot-framework/rest-api/bot-framework-rest-connector-api-reference). Alternatively, you can follow the [Microsoft Bot Framework SDK] to process and parse messages. For more information see [overview of Azure Bot Service](/azure/bot-service/bot-service-overview-introduction).

Outgoing webhooks are scoped to the `team` level and are visible to all the team members. Just like a bot, users need to **\@mention** the name of the outgoing webhook to invoke it in the channel.

# [Verify HMAC token](#tab/verifyhmactoken)
**Create a method to verify the outgoing webhook HMAC token**
#### HMAC signature for testing with code example

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
## See also

* [Create an incoming webhook](~/webhooks-and-connectors/how-to/add-incoming-webhook.md)
* [Create an Office 365 Connector](~/webhooks-and-connectors/how-to/connectors-creating.md)
* [Send messages to connectors and webhooks](~/webhooks-and-connectors/how-to/connectors-using.md)
* [Get started with actionable messages in Office 365](/outlook/actionable-messages/get-started.md)
* Actionable message in Outlook video
> [!VIDEO https://www.youtube-nocookie.com/embed/gBEFSlHLAcg&t] 

