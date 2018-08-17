---
title: Outgoing webhooks
description: Describes how to create and use outgoing webhooks in Microsoft Teams
keywords: teams bots custom
ms.date: 08/15/2018
---
# Outgoing webhooks in Microsoft Teams

If you've worked with outgoing webhooks or slash commands in other chat platforms, you can now bring what you have developed over to Microsoft Teams via outgoing webhooks. Outgoing webhooks are an easy way of extending your team without having to go through the full process of creating a bot via the Microsoft Bot Framework. You can use them for custom workflows and commands such as kicking off a build or checking the latest set of livesite issues.

You also have an effective way of ensuring that your service is accessible only by authorized users, as the security token used by your outgoing webhook will only be scoped to the team in which it has been added.

## Creating an outgoing webhook

To create an outgoing webhook, click **Manage team** and then navigate to the **Bots** tab.

![View team](~/assets/images/ManageTeam.png)

Click on the **Create an outgoing webhook** link at the bottom of the page.
 
![Create a outgoing webhook entry point](~/assets/images/createwebhook.png)

In the **Create an outgoing webhook** dialog, you can configure how your outgoing webhook appears in channels:

* **Name** is what will show up as the bot’s title and is also how users will @mention the bot
* **Callback URL** is the endpoint that will receive messages from Teams
* **Description** is a detailed string that what will show up in the profile card and in the team-level App dashboard
* **Profile Picture** is the optional display picture of the outgoing webhook.

![Create an outgoing webhook dialog](~/assets/images/outgoingwebhook.png)

Click **Create** and the outgoing webhook will be made available in the current team. It will not be available in any other team. The next dialog will display a security token that you will use to authenticate calls from Microsoft Teams.

**Make sure to copy this value in a secure location. You will not be able to retrieve it again and will have to recreate the outgoing webhook.**

![outgoing webhook security token](~/assets/images/congratulationsoutgoingwebhook.png)

## Interacting with the outgoing webhook

Once you add an outgoing webhook to the team, it looks and behaves just like a bot, so it’s easy for users to interact with. It listens for messages using **@mention** with the webhook name and can respond with rich messages, including images and cards.

## Receiving and responding to messages

### Receiving messages

Your service will receive messages in the standard Microsoft bot messaging schema, as documented in the [API reference](https://docs.microsoft.com/en-us/bot-framework/rest-api/bot-framework-rest-connector-api-reference) for the Microsoft Bot Framework.

You can optionally use the existing Bot Framework client SDKs to simplify parsing and handling messages.

Users must **@mention** the outgoing webhook for it to receive messages.

#### Example inbound message

```json
{
    "type": "message",
    "id": "1485983408511",
    "timestamp": "2017-02-01T21:10:07.437Z",
    "localTimestamp": "2017-02-01T14:10:07.437-07:00",
    "serviceUrl": "https://smba.trafficmanager.net/amer-client-ss.msg/",
    "channelId": "msteams",
    "from": {
        "id": "29:1XJKJMvc5GBtc2JwZq0oj8tHZmzrQgFmB39ATiQWA85gQtHieVkHilBZ9XHoq9j7Zaqt7CZ-NJWi7me2kHTL3Bw",
        "name": "Tim Jones"
    },
    "conversation": {
        "id": "19:253b1f341670408fb6fe51050b6e5ceb@thread.skype;messageid=1485983194839"
    },
    "recipient": {
        "id": "null",
        "name": "null"
    },
    "textFormat": "plain",
    "text": "<at>MyCustomBot</at> Hello <at>Larry Brown</at>",
    "attachments": [{
        "contentType": "text/html",
        "content": "<div><span contenteditable=\"false\" itemscope=\"\" itemtype=\"http://schema.skype.com/Mention\" itemid=\"0\">MyWebHook </span> Hello <span contenteditable=\"false\" itemscope=\"\" itemtype=\"http://schema.skype.com/Mention\" itemid=\"1\">Larry Brown </span></div>"
    }],
    "entities": [
      {
        "type": "mention",
        "mentioned": {
            "id": "28:c9e8c047-2a74-40a2-b28a-b162d5f5327c", 
            "name": "MyWebHook"
        },
        "text": "<at>MyWebHook</at>"
      },
      {
        "type": "mention",
        "mentioned": {
            "id": "29:1jnFbZYs0qXMLH-O4S9-sDLNc3NVEIMWMnC-q0tVdEa-8BRosfojI35QdNoB-yW8iutWLJzHUm_mqEZSSU8si0Q",
            "name": "Larry Brown"
        },
        "text": "<at>Larry Brown</at>"
      },
      { 
        "locale": "en-US",
        "country": "US",
        "platform": "Windows",
        "timezone": "America/Los_Angeles",
        "type": "clientInfo"
      }
    ],
    "channelData": {
        "teamsChannelId": "19:253b1f341670408fb6fe51050b6e5ceb@thread.skype",
        "teamsTeamId": "19:712c61d0ef384e5fa681ba90ca943398@thread.skype"
    } 
}
```

### Authenticating the caller

Your service should always authenticate clients. To guarantee the legitimacy of the client, Microsoft Teams provides the HMAC in the HTTP `hmac` header.

Your code should always verify the HMAC signature included in the request:

1. Generate the hmac from the request body of the message. There are standard libraries to do this on most platforms. Microsoft Teams uses standard SHA256 HMAC cryptography. You will need to convert the body to a byte array in UTF8.
2. To compute the hash, provide the byte array of the security token provided by Microsoft Teams when you registered the outgoing webhook.
3. Convert the hash to a string using UTF8 encoding.
4. Compare the string value of the generated hash with the value provided in the HTTP request.

#### Code example (C#)
```csharp
    /// <summary>
    /// Encapsulates auth results.
    /// </summary>
    public class AuthResponse
    {
        /// <summary>
        /// Initializes a new instance of the <see cref="AuthResponse"/> class.
        /// </summary>
        /// <param name="authSuccessful">if set to <c>true</c> then [authentication was successful].</param>
        /// <param name="errorMessage">The error message.</param>
        public AuthResponse(bool authSuccessful, string errorMessage)
        {
            this.AuthSuccessful = authSuccessful;
            this.ErrorMessage = errorMessage;
        }

        /// <summary>
        /// Gets a value indicating whether [authentication successful].
        /// </summary>
        /// <value>
        /// <c>true</c> if [authentication successful]; otherwise, <c>false</c>.
        /// </value>
        public bool AuthSuccessful { get; private set; }

        /// <summary>
        /// Gets the error message.
        /// </summary>
        /// <value>
        /// The error message.
        /// </value>
        public string ErrorMessage { get; private set; }
    }

    /// <summary>
    /// Provides authentication results.
    /// </summary>
    public class AuthProvider
    {
        /// <summary>
        /// A dictionary for storing signing keys. Here, the look up key is based on the value of the query parameter 'id'.
        /// The signing keys must be valid 256 bit base64 encoded strings that are provided during outgoing webhook registration in MS Teams client.
        /// </summary>
        private static readonly Dictionary<string, string> SigningKeyDictionary = new Dictionary<string, string>()
            {
                {"contoso", "vqF0En+Z0ucuRTM/01o2GuhMH3hKKk/N2bOmlM31zaA=" },
                {"fabrikam", "QgyNSToQjf4p6+YzDpjKks1/tXeJQ7FhVHqRwTnugVI=" }
            };

        /// <summary>
        /// Validates the specified authentication header value.
        /// </summary>
        /// <param name="httpRequestMessage">The HTTP request message.</param>
        /// <returns>
        /// Response containing result of validation.
        /// </returns>
        public static async Task<AuthResponse> Validate(HttpRequestMessage httpRequestMessage)
        {
            string messageContent = await httpRequestMessage.Content.ReadAsStringAsync();
            AuthenticationHeaderValue authenticationHeaderValue = httpRequestMessage.Headers.Authorization;

            // It is up to the outgoing webhook owner to decide how to pass in the lookup id for the signing key.
            // Here, we have used the query parameter "id" as an example.
            string claimedSenderId = HttpUtility.ParseQueryString(httpRequestMessage.RequestUri.Query).Get("id");

            if (string.IsNullOrEmpty(claimedSenderId))
            {
                return new AuthResponse(false, "Id not present on request.");
            }

            if (authenticationHeaderValue == null)
            {
                return new AuthResponse(false, "Authentication header not present on request.");
            }

            if (!string.Equals("HMAC", authenticationHeaderValue.Scheme))
            {
                return new AuthResponse(false, "Incorrect authorization header scheme.");
            }

            claimedSenderId = claimedSenderId.ToLower();
            string signingKey = null;
            if (!AuthProvider.SigningKeyDictionary.TryGetValue(claimedSenderId, out signingKey))
            {
                return new AuthResponse(false, string.Format("Signing key for {0} is not configured", claimedSenderId));
            }

            // Reject all empty messages
            if (string.IsNullOrEmpty(messageContent))
            {
                return new AuthResponse(false, "Unable to validate authentication header for messages with empty body.");
            }

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
                Trace.TraceError("Exception occcured while verifying HMAC on the incoming request. Exception: {0}", ex);
                return new AuthResponse(false, "Exception thrown while verifying MAC on incoming request.");
            }
        }
    }
```

### Responding to a message

Responses from your outgoing webhook will appear in the same reply chain as the original message. You can send a response message that takes advantage of any of the Bot Framework’s activities, including cards and image attachments.

Your outgoing webhook will need to respond to the HTTP request from Microsoft Teams. It will have 5 seconds to respond to the message before the connection is terminated.

#### Example response

```json
{
    "type": "message",
    "text": "This is a reply!"
}
```

## Limitations

* Outgoing webhooks do not have access to non-messaging APIs, such as team roster membership.
* Outgoing webhooks cannot post into channels [proactively](~/concepts/bots/bot-conversations/bots-conv-proactive).
* Although outgoing webhooks can use cards, they cannot use button actions like `imBack` or `invoke`.

## Samples for Outgoing webhook

For sample code illustrating an outgoing webhook, see these samples on GitHub:

### Node.js
[OfficeDev/msteams-samples-outgoing-webhook-nodejs](https://github.com/OfficeDev/msteams-samples-outgoing-webhook-nodejs)

### C#
[OfficeDev/microsoft-teams-sample-outgoing-webhook](https://github.com/OfficeDev/microsoft-teams-sample-outgoing-webhook)
