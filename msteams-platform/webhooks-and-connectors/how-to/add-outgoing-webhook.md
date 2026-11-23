---
title: Create an Outgoing Webhook
description: Learn how to create Outgoing Webhook in Microsoft Teams, its key features and code sample (.NET, Node.js) to create custom bots to be used in Teams.
ms.topic: article
ms.localizationpriority: high
ms.owner: hantony
ms.date: 06/23/2026
---

# Create Outgoing Webhooks

An Outgoing Webhook receives messages from a Teams channel when users **@mention** it. It forwards those messages to an external web service, which can respond with rich messages that include cards and images.

<!--- TBD: Edit this article.
* Admonitions/alerts may be overused in this article. Check once.
* An important alert at the end of this table does not make sense. Also, it has a code snippet inside it.
* Some screenshots like teamschannel.png may be redundant. Check once.
* Some headings use title case. We use sentence case for titles.
* Check for markdownlint errors. 
* Try using &nbsp; to add spaces in codeblocks for indentation and remove the hard tabs.
* Table with just a row is not really needed. Provide the content without tabulating it.
--->

## Key features of Outgoing Webhooks

The following table provides the features and description of Outgoing Webhooks:

| Features | Description |
| ------- | ----------- |
| Scoped configuration| Webhooks are scoped at the team level. Mandatory setup process for each adds an Outgoing Webhook. |
| Reactive messaging| Users must use **@mention** for the webhook to receive messages. The users can only message an Outgoing Webhook in public channels and not within the personal or private scope. |
|Standard HTTP message exchange|Responses appear in the same chain as the original request message and can include any Bot Framework message content. For example, rich text, images, cards, and emojis. Although Outgoing Webhooks can use cards, they can't use any card actions except for `openURL`.|
| Teams API method support|Outgoing Webhooks sends an HTTP POST to a web service and gets a response. They can't access any other APIs, such as retrieve the roster or list of channels in a team.|

## Create Outgoing Webhooks

Create Outgoing Webhooks and add custom bots to Teams. To create an Outgoing Webhook, follow these steps:

1. Select **Teams** from the left pane.

    :::image type="content" source="../../assets/images/teamschannel-select.png" alt-text="Screenshot shows the left pane with the Teams icon.":::

1. In the **Teams** page, select the required team to create an Outgoing Webhook and select &#8226;&#8226;&#8226;.
1. Select **Manage team** from the dropdown menu.

    :::image type="content" source="../../assets/images/outgoingwebhook-manage-team.png" alt-text="Screenshot shows the manage Teams option in a Teams channel.":::

1. Select **Apps** on the channel page.

    :::image type="content" source="../../assets/images/outgoing-webhook.png" alt-text="Screenshot shows the apps tab on a Teams channel.":::

1. Under **Upload an app**, select **Create an outgoing webhook**.

    :::image type="content" source="../../assets/images/create-an-outgoing-webhook.png" alt-text="Screenshot shows the select create outgoing webhook option."lightbox="../../assets/images/create-an-outgoing-webhook.png":::

1. Type the following details in the **Create an outgoing webhook** page:

    * **Name**: The webhook title and **@mention** tab.
    * **Callback URL**: The HTTPS endpoint that accepts JSON payloads and receives POST requests from Teams.
    * **Description**: A detailed string that appears in the profile card and the team-level app dashboard.
    * **Profile picture**: An app icon for your webhook, which is optional.

1. Select **Create**. The Outgoing Webhook is added to the team's channel.

    :::image type="content" source="../../assets/images/create-outgoingwebhook.png" alt-text="Screenshot shows the create button in the create an outgoing webhook window.":::

A [Hash-based Message Authentication Code (HMAC)](https://security.stackexchange.com/questions/20129/how-and-when-do-i-use-hmac/20301) dialogue appears. It's a security token used to authenticate calls between Teams and the designated outside service. The HMAC security token doesn't expire and is unique for each configuration.

> [!NOTE]
> The Outgoing Webhook is available to the team's users, only if the URL is valid and the server and client authentication tokens are equal. For example, an HMAC handshake.

The following scenario provides the details to add an Outgoing Webhook:

* Scenario: Push change status notifications on a Teams channel database server to your app.
* Example: You have a custom app built for your org (LOB app) that tracks all CRUD (create, read, update, and delete) operations. These operations are made to the employee records by Teams channel HR users across a Microsoft 365 tenancy.

# [URL JSON payload](#tab/urljsonpayload)

**Create a URL on your app's server to accept and process a POST request with a JSON payload**

Your service receives messages in a standard Azure bot service messaging schema. The Bot Framework connector is a RESTful service that empowers to process the interchange of JSON formatted messages through HTTPS protocols as documented in the [Azure Bot Service API](/bot-framework/rest-api/bot-framework-rest-connector-api-reference). Alternatively, you can follow the Teams SDK to process and parse messages. For more information, see [overview of Azure Bot Service](/azure/bot-service/bot-service-overview-introduction).

Outgoing Webhooks are scoped to the `team` level and are visible to all the team members. Users need to **@mention** the name of the Outgoing Webhook to invoke it in the channel.

# [Verify HMAC token](#tab/verifyhmactoken)

**Create a method to verify the Outgoing Webhook HMAC token**

Using example of inbound message and ID: "contoso" of SigningKeyDictionary of {"contoso", "vqF0En+Z0ucuRTM/01o2GuhMH3hKKk/N2bOmlM31zaA=" }.

Use the value "HMAC 03TCao0i55H1eVKUusZOTZRjtvYTs+mO41mPL+R1e1U=" in the authorization of request header.

To ensure that your service is receiving calls only from actual Teams clients, Teams provides an HMAC code in the HTTP `hmac` authorization header. Always include the code in your authentication protocol.

Your code must always validate the HMAC signature included in the request as follows:

* Generate the HMAC token from the request body of the message. There are standard libraries to do this on most platform, such as [Crypto](https://nodejs.org/api/crypto.html#crypto_crypto) for Node.js. Microsoft Teams uses standard SHA256 HMAC cryptography. You must convert the body to a byte array in UTF8.
* Base64-decode the security token provided by Teams when you registered the Outgoing Webhook and use the resulting bytes as the HMAC key. See [create an Outgoing Webhook](#create-outgoing-webhooks).
* Base64-encode the computed hash.
* Compare the Base64-encoded hash with the signature after the `HMAC` scheme in the HTTP `Authorization` header. Use a constant-time comparison.

:::row:::
:::column:::

# [C#](#tab/hmac-dotnet)

```csharp
public static AuthResponse Validate(AuthenticationHeaderValue authenticationHeaderValue, string messageContent, string claimedSenderId)
{
    //...
    string providedHmacValue = authenticationHeaderValue.Parameter;
    string calculatedHmacValue = null;
    try
    {
        byte[] serializedPayloadBytes = Encoding.UTF8.GetBytes(messageContent);
 
        byte[] keyBytes = Convert.FromBase64String(signingKey);
        using (HMACSHA256 hmacSHA256 = new HMACSHA256(keyBytes))
        {
            byte[] hashBytes = hmacSHA256.ComputeHash(serializedPayloadBytes);
            calculatedHmacValue = Convert.ToBase64String(hashBytes);
        }
 
        if (string.Equals(providedHmacValue, calculatedHmacValue))
        {
            return new AuthResponse(true, null);
        }
        else
        {
            string errorMessage = string.Format(
                "AuthHeaderValueMismatch. Expected:'{0}' Provided:'{1}'",
                calculatedHmacValue,
                providedHmacValue);
 
            return new AuthResponse(false, errorMessage);
        }
    }
    catch (Exception ex)
    {
        Trace.TraceError("Exception occurred while verifying HMAC on the incoming request. Exception: {0}", ex);
        return new AuthResponse(false, "Exception thrown while verifying MAC on incoming request.");
    }
}
```

# [TypeScript](#tab/hmac-typescript)

Use the built-in Node.js `crypto` module. Pass the HTTP `Authorization` header, the unmodified request body as a `Buffer`, and the Base64-encoded security token as `signingKey`. Validate the signature before parsing the JSON body. If validation fails, reject the request with HTTP `401 Unauthorized` and don't process the message.

```typescript
import { createHmac, timingSafeEqual } from "node:crypto";

function validateHmac(
    authorizationHeader: string | undefined,
    rawBody: Buffer,
    signingKey: string
): void {
    const match = /^HMAC (.+)$/i.exec(authorizationHeader ?? "");
    if (!match) {
        throw new Error("Missing or invalid HMAC Authorization header.");
    }

    const keyBytes = Buffer.from(signingKey, "base64");
    const calculatedHmac = createHmac("sha256", keyBytes)
        .update(rawBody)
        .digest("base64");
    const expected = Buffer.from(calculatedHmac, "utf8");
    const provided = Buffer.from(match[1], "utf8");

    if (provided.length !== expected.length ||
        !timingSafeEqual(provided, expected)) {
        throw new Error("HMAC signature validation failed.");
    }
}
```

# [Python](#tab/hmac-python)

Use the Python standard library. Pass the HTTP `Authorization` header, the unmodified request body as `bytes`, and the Base64-encoded security token as `signing_key`. Validate the signature before parsing the JSON body. If validation fails, reject the request with HTTP `401 Unauthorized` and don't process the message.

```python
import base64
import hashlib
import hmac
from typing import Optional


def validate_hmac(
    authorization_header: Optional[str],
    raw_body: bytes,
    signing_key: str,
) -> None:
    scheme, separator, signature = (authorization_header or "").partition(" ")
    if scheme.lower() != "hmac" or not separator or not signature:
        raise ValueError("Missing or invalid HMAC Authorization header.")

    key_bytes = base64.b64decode(signing_key, validate=True)
    calculated_hmac = hmac.new(key_bytes, raw_body, hashlib.sha256).digest()
    expected = base64.b64encode(calculated_hmac)
    provided = signature.encode("utf-8")

    if not hmac.compare_digest(provided, expected):
        raise ValueError("HMAC signature validation failed.")
```

---

:::column-end:::
:::row-end:::

# [Method to respond](#tab/methodtorespond)

**Create a method to send a success or failure response**

Responses from your Outgoing Webhooks appear in the same reply chain as the original message. When the user performs a query, Teams issues a synchronous HTTP request to your service and your code gets five seconds to respond to the message before the connection times out and terminates.

### Example response

```json
{
    "type": "message",
    "text": "This is a reply!"
}
```

---

### Use Adaptive Cards with Outgoing Webhooks

You can send Adaptive Card, Hero card, and text messages as attachment with an Outgoing Webhook.
Cards support formatting. For more information, see [format cards with Markdown](~/task-modules-and-cards/cards/cards-format.md?tabs=adaptive-md%2Cconnector-html#format-cards-with-markdown).
Adaptive Card in Outgoing Webhooks supports only `openURL` card actions.

The following codes are examples of an Adaptive Card response:

# [C#/.NET](#tab/dotnet)

[Sample code reference](https://github.com/OfficeDev/Microsoft-Teams-Samples/blob/main/samples/TeamsSDK/Archived/outgoing-webhook/csharp/Controllers/SampleController.cs#L20)

```csharp

// This method is to read the request body content
string content;
using (var reader = new StreamReader(Request.Body))
    {
        content = await reader.ReadToEndAsync();
    }

var Card = new AdaptiveCard(new AdaptiveSchemaVersion("1.4"))
{
    Body = new List<AdaptiveElement>()
    {
        new AdaptiveTextBlock(){Text= $"Request sent by: {incomingActivity.From.Name}"},
        new AdaptiveImage(){Url=new Uri("https://c.s-microsoft.com/en-us/CMSImages/DesktopContent-04_UPDATED.png?version=43c80870-99dd-7fb1-48c0-59aced085ab6")},
        new AdaptiveTextBlock(){Text="Sample image for Adaptive Card.."}
    }
};

var attachment = new Attachment()
{
    ContentType = AdaptiveCard.ContentType,
    Content = Card
};

var sampleResponseActivity = new Activity
{
    Attachments = new [] { attachment }
};

return sampleResponseActivity;
```

# [TypeScript/Node.js](#tab/typescript)

[Sample code reference](https://github.com/OfficeDev/Microsoft-Teams-Samples/blob/main/samples/TeamsSDK/Archived/outgoing-webhook/nodejs/app.js#L30)

```typescript
var receivedMsg = JSON.parse(payload);
var responseMsg = JSON.stringify({
    "type": "message",
    "attachments": [
        {
            "contentType": "application/vnd.microsoft.card.adaptive",
            "contentUrl": null,
            "content": {
                "type": "AdaptiveCard",
                "version": "1.4",
                "body": [
                    {
                        "type": "TextBlock",
                        "text": "Request sent by: " + receivedMsg.from.name
                    },
                    {
                        "type": "Image",
                        "url": "https://c.s-microsoft.com/en-us/CMSImages/DesktopContent-04_UPDATED.png?version=43c80870-99dd-7fb1-48c0-59aced085ab6"
                    },
                    {
                        "type": "TextBlock",
                        "text": "Sample image for Adaptive Card."
                    }
                ]
            },
            "name": null,
            "thumbnailUrl": null
        }
    ]
});
```

# [Python](#tab/python)

```python
received_msg = json.loads(payload)
response_msg = json.dumps({
    "type": "message",
    "attachments": [
        {
            "contentType": "application/vnd.microsoft.card.adaptive",
            "contentUrl": None,
            "content": {
                "type": "AdaptiveCard",
                "version": "1.4",
                "body": [
                    {
                        "type": "TextBlock",
                        "text": f"Request sent by: {received_msg['from']['name']}"
                    },
                    {
                        "type": "Image",
                        "url": "https://c.s-microsoft.com/en-us/CMSImages/DesktopContent-04_UPDATED.png?version=43c80870-99dd-7fb1-48c0-59aced085ab6"
                    },
                    {
                        "type": "TextBlock",
                        "text": "Sample image for Adaptive Card."
                    }
                ]
            },
            "name": None,
            "thumbnailUrl": None
        }
    ]
})
```

# [JSON](#tab/json)

```json
{
 "type": "message",
 "attachments": [
  {
   "contentType": "application/vnd.microsoft.card.adaptive",
   "content": {
    "type": "AdaptiveCard",
    "version": "1.4",
    "body": [
     {
      "type": "TextBlock",
      "text": "Request sent by: Megan"
     },
     {
      "type": "Image",
      "url": "https://c.s-microsoft.com/en-us/CMSImages/DesktopContent-04_UPDATED.png?version=43c80870-99dd-7fb1-48c0-59aced085ab6"
     },
     {
      "type": "TextBlock",
      "text": "Sample image for Adaptive Card.."
     }
    ]
   }
  }
 ]
}
```

---

## See also

* [Webhooks and connectors](../what-are-webhooks-and-connectors.md)
* [Create and send messages](connectors-using.md)
* [Create Incoming Webhooks](~/webhooks-and-connectors/how-to/add-incoming-webhook.md)
* [Create connectors for Microsoft 365 Groups](~/webhooks-and-connectors/how-to/connectors-creating.md)
* [Adaptive Cards](../../task-modules-and-cards/what-are-cards.md#adaptive-cards)
