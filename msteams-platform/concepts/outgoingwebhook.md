---
title: Outgoing webhooks
description: Describes how to create and use outgoing webhooks in Microsoft Teams
keywords: teams bots custom
---

# Outgoing webhooks in Microsoft Teams

If you've integrated with outgoing webhooks or slash commands in other chat platforms, you can now easily bring those integrations over to Microsoft Teams via Custom Bots.  Custom bots are an easy way of extending your team with Teams interactivity without having to go through the full process of creating a bot via the Microsoft Bot Framework.  You can use them for custom workflows and commands, such as kicking off a build or checking the latest set of livesite issues. With outgoing webhooks, too, you have effective way of ensuring your service is accessible only by authorized users, as the shared secret used by your outgoing webhook will only be scoped to the team in which it has been added.

## Creating an outgoing webhook

To create an outgoing webhook, click View Team and then navigate to the Bots tab.

![View team](~/assets/images/ManageTeam.png)

Click on the Create a outgoing webhook link at the bottom of the page.
 
![Create a outgoing webhook entry point](~/assets/images/createwebhook.png)

In the dialog, you can configure how your bot appears in channels:
* **Name** is what will show up as the bot’s title and is also how users will @mention the bot
* **Callback URL** is the endpoint that will receive messages from Teams
* **Description** is a detailed string that what will show up in the profile card and in the team-level App dashboard
* **Avatar** is the optional display picture of the outgoing webhook

![Create a outgoing webhook dialog](~/assets/images/outgoingwebhook.png)
 
Upon clicking Create, the outgoing webhook will be available in the team – it will not be available in any other team. The next dialog will then display the shared secret that you can use to authenticate calls from Microsoft Teams. **Make sure to copy this value in a secure location. You will not be able to retrieve it again without recreating the outgoing webhook.**
 
![outgoing webhook shared secret](~/assets/images/congratulationsoutgoingwebhook.png)

## Interacting with the outgoing webhook

Once you add a outgoing webhook to the team, it looks and behaves just like a regular bot, so it’s easy for users to interact with them. They listen to messages that @mention the bot name and can respond with rich messages, including images and cards.

## Receiving and replying to messages

### Receiving messages

Your service will receive messages in the standard Microsoft bot messaging schema, as documented in the [API reference](https://docs.microsoft.com/en-us/bot-framework/rest-api/bot-framework-rest-connector-api-reference) for the Microsoft Bot Framework.

You can optionally use the existing Bot Framework client SDKs to simplify parsing and handling messages.

Currently, users must mention the outgoing webhook for it to receive messages.

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
    "entities": [{
        "type": "mention",
        "mentioned": {
            "id": "28:c9e8c047-2a74-40a2-b28a-b162d5f5327c", 
            "name": "MyWebHook"
        },
        "text": "<at>MyWebHook</at>"
    }, {
        "type": "mention",
        "mentioned": {
            "id": "29:1jnFbZYs0qXMLH-O4S9-sDLNc3NVEIMWMnC-q0tVdEa-8BRosfojI35QdNoB-yW8iutWLJzHUm_mqEZSSU8si0Q",
            "name": "Larry Brown"
        },
        "text": "<at>Larry Brown</at>"
    }, {
        "type": "clientInfo",
        "locale": "en-US",
        "country": "US",
        "platform": "Windows"
    }],
    "channelData": {
        "teamsChannelId": "19:253b1f341670408fb6fe51050b6e5ceb@thread.skype",
        "teamsTeamId": "19:712c61d0ef384e5fa681ba90ca943398@thread.skype"
    } 
}
```

### Authenticating the caller

You should always authenticate that Microsoft Teams is the service calling your URL. To guarantee the legitimacy of the client, Microsoft Teams provides the HMAC in the HTTP `hmac` header.

Your code should always verify the HMAC signature included in the request:
1.	Generate the hmac from the request body of the message. There are standard libraries on most platforms. Microsoft Teams uses standard SHA256 HMAC cryptography. You will need to convert the body to a byte array in UTF8.
2.	To compute the hash, provide the byte array of the shared secret.
3.	Convert the hash to a string using UTF8 encoding.
4.	Compare the string value of the generated hash with the value provided in the HTTP request.

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

### Sending a reply

As with regular bots, replies from your outgoing webhook will appear in the same reply chain as the original message. You can send a reply message that takes advantage of any of the Bot Framework’s activities, including rich cards and image attachments.

Your outgoing webhook will need to reply asynchronously to the HTTP request from Microsoft Teams. It will have 5 seconds to reply to the message before the connection is terminated.

#### Example reply message

```json
{
    "type": "message",
    "text": "This is a reply!"
}
```

## Limitations

* Custom bots do not have access to non-messaging APIs, such as team roster membership.
* Custom bots cannot post into channels asynchronously; that is, not as a reply to a user message.
* Although outgoing webhooks can use rich cards, they cannot leverage button actions like `imBack` or `invoke`.

## Sample Custom bot 

For sample code illustrating a outgoing webhook, see our sample on GitHub: [OfficeDev/microsoft-teams-sample-custombot](https://github.com/OfficeDev/microsoft-teams-sample-custombot)

## Turn your outgoing webhook into an app for Microsoft Teams

If you’re ready to share your outgoing webhook with others or make it publicly available, you can submit your bot to Microsoft Teams for consideration in the bot gallery. See the [Microsoft Teams Developer Preview interest form](https://aka.ms/microsoftteamsdeveloperpreviewinterestform) to learn more.
