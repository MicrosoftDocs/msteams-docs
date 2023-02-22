---
title: Add code to enable SSO for your Adaptive Cards Universal Actions
description: In this module, learn about how to enable SSO for your Adaptive Cards Universal Actions.
author: v-sdhakshina
ms.topic: conceptual
ms.localizationpriority: medium
---

# Add code to enable SSO for your Adaptive Cards Universal Actions

Authentication steps for single sign-on (SSO) are similar to that of a bot in Teams. Following are the steps to achieve SSO in Adaptive Cards Universal Action.

> [!NOTE]
> To implement SSO flow, you must have an one-on-one chat declared for your bot in the app manifest. When a user invokes the SSO flow via the Adaptive Card `Action.Execute` protocol, the user is prompted to install the app in a personal scope if it isn't installed already.

## Add code to handle an access token

Your bot is configured in Azure Active Directory (Azure AD) for access token and now you update the code to handle the access token for Adaptive Cards Universal Actions in bot.

If there's a cached token, the bot uses the same token. If there's no token available, the Adaptive Card sends an invoke response to the bot service and the bot service creates an OAuth card with the following values that includes a `tokenExchangeResource` to designate an SSO operation:

```JSON
{
"statusCode": 401,
"type": "application/vnd.microsoft.activity.loginRequest",
"value": {
   "text": "Please sign-in",
   "connectionName": "<configured-connection-name>",
   "tokenExchangeResource": {
      "id": "<unique-indentifier>",
      "uri": "<application-or-resource-identifier>",
      "providerId": "<optional-provider-identifier>"
   },
   "buttons": [
      {
      "title": "Sign-In",
         "text": "Sign-In",
         "type": "signin",
         "value": "<sign-in-URL>"
      }
   ]
}
}
```

Invoke response is delivered to the Teams client, which uses the `tokenExchangeResource` value and the client token to obtain an on-behalf-of token or exchangeable token from the Azure AD.

The SSO fails when the Teams clients ignore the `tokenExchangeResource` value for any reason, including invalid values, errors retrieving exchangeable tokens, or not supporting the Azure AD. Then the Teams client triggers the nominal sign-in or OAuth flow. It's highly recommended that you provide a sign-in URL in the above response so that the OAuth flow works.

## Consent dialog for getting access token

If the app user is using an Adaptive Card for the first time and user consent is required, the following dialog appears:

   :::image type="content" source="../../../assets/images/authentication/consent-sso-ac.png" alt-text="Screenshot shows you the consent dialog box.":::

When the user selects **View and accept**, the existing Azure AD permission consent view is launched to show all the permissions and continue with the authentication flow.

## Add code to receive the token

The following are the steps to receive token:

1. Teams client sends the original `adaptiveCard/action` again to the bot along with the token as follows:

    ```javascript
    {
    "type": "invoke",
    "name": "adaptiveCard/action"
    "value": {
    "action": {
       "id": "abc123",
       "type": "Action.Execute",
       "verb": "saveCommand",
       "data": {
          "firstName": "Jeff",
          "lastName": "Derstadt"
       }
    },
    "authentication": {
       "id": "8769-xyz",
       "connectionName": "oauthConnection",
       "token": "...single sign-on token..."
    }
    }
    }
    ```

    The following is the code snippet to receive invoke activity in the bot service:

    ```csharp
            protected override async Task<InvokeResponse> OnInvokeActivityAsync(ITurnContext<IInvokeActivity> turnContext, 
         CancellationToken cancellationToken)
            {
              JObject value = JsonConvert.DeserializeObject<JObject>
              (turnContext.Activity.Value.ToString());
              JObject authentication = null;
              if (value["authentication"] != null)
              {
              authentication = JsonConvert.DeserializeObject<JObject>(value["authentication"].ToString());
              }
            }
    ```

1. Teams client sends an invoke request to the bot. The bot receives the app users consent and uses their identity to help the token exchange process with the bot framework token service and Azure AD. The bot framework token service delivers the app users access token to the bot.
   * Bot service ignore the access token if the value is incorrect.
   * Bot service that experience an error while performing token exchange must respond with an error or a second sign-in request that doesn't include SSO information. If responding with an error, the error must be:

        ```javascript
         {
          "statusCode" = 412,
          "type" = "application/vnd.microsoft.error.preconditionFailed",
          "value" = {
            "code" = "412",
            "message" = "authentication token expired"    }
            }
        ```

   * When SSO fails, the Teams client shows a sign-in button in the card footer to initiate nominal sign-in flow.

1. The bot uses the access token on behalf of the user to perform its actions.
1. The bot returns a non-error response to the Teams client, either a card or a message.

> [!NOTE]
> To handle the access token in case the app user logs out, see [handle app user log out](../../../bots/how-to/authentication/bot-sso-code.md#handle-app-user-log-out).

## Code sample

| **Sample name** | **Description** | **C#** | **Node.js** |
| --- | --- | --- | --- | --- |
| SSO for your Adaptive Cards Universal Actions | This sample code demonstrates how to enable SSO authentication for your Adaptive Cards Universal Actions in bot. | [View](https://github.com/OfficeDev/Microsoft-Teams-Samples/tree/main/samples/bot-sso-adaptivecard/csharp) | [View](https://github.com/OfficeDev/Microsoft-Teams-Samples/tree/main/samples/bot-sso-adaptivecard/nodejs) |

## See also

* [Work with Universal Actions for Adaptive Cards](Work-with-Universal-Actions-for-Adaptive-Cards.md)
* [Enable SSO for your bot app](../../../bots/how-to/authentication/bot-sso-overview.md)
* [Update app manifest for SSO and preview your app](../../../bots/how-to/authentication/bot-sso-manifest.md)
